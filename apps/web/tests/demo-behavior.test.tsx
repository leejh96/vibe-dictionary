import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';

test('demo stages omit appended helper captions while keeping their design content and controls', () => {
  for (const id of ['spring-bounce-modal', 'staggered-list', 'elastic-toggle-switch', 'gooey-menu-fab', 'mg-god-ray-beam', 'st-crt-scanline-terminal']) {
    let tree!: ReturnType<typeof create>;
    act(() => { tree = create(<InteractiveDemo techniqueId={id} />); });
    try {
      const stage = tree.root.findAllByType('div')[0];
      const captions = stage.children.filter(child => typeof child !== 'string' && child.type === 'span');
      assert.equal(captions.length, 0, `${id} must not append a text caption`);
      assert.ok(stage.children.length > 0, `${id} keeps its visual design`);
      if (id === 'gooey-menu-fab') {
        const toggle = tree.root.findByProps({ 'aria-label': '플로팅 메뉴 열기/닫기' });
        act(() => toggle.props.onClick());
        assert.ok(toggle.findByType('svg').props.className.includes('rotate-0'));
        act(() => toggle.props.onClick());
        assert.ok(toggle.findByType('svg').props.className.includes('rotate-45'));
      }
    } finally { act(() => tree.unmount()); }
  }
});

test('3D card flip supports Enter and Space with a matching accessible pressed state', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId="card-flip-3d" />); });
  t.after(() => act(() => tree.unmount()));
  const card = () => tree.root.findByProps({ role: 'button' });
  assert.equal(card().props.tabIndex, 0);
  assert.equal(card().props['aria-pressed'], false);
  let prevented = 0;
  for (const key of ['Enter', ' ', 'Escape']) {
    act(() => card().props.onKeyDown({ key, preventDefault() { prevented++; } }));
    assert.equal(card().props['aria-pressed'], key === 'Enter');
  }
  assert.equal(prevented, 2);
});

test('ripple and error-shake delays are cancelled when a filtered demo unmounts', t => {
  const pending = new Set<object>();
  t.mock.method(globalThis, 'setTimeout', () => { const timer = {}; pending.add(timer); return timer; });
  t.mock.method(globalThis, 'clearTimeout', (timer: object) => { pending.delete(timer); });
  for (const id of ['ripple-click', 'error-shake-tooltip']) {
    let tree!: ReturnType<typeof create>;
    act(() => { tree = create(<InteractiveDemo techniqueId={id} />); });
    const action = tree.root.findAll(node => typeof node.type === 'string' && typeof node.props.onClick === 'function')[0];
    act(() => action.props.onClick({ clientX: 20, clientY: 20, currentTarget: { getBoundingClientRect: () => ({ left: 0, top: 0 }) } }));
    assert.equal(pending.size, 1, id);
    act(() => tree.unmount());
    assert.equal(pending.size, 0, id);
  }
});

test('magnetic tracking stays fast on vertical movement and at the center; only leaving uses spring return', (t) => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId="magnetic-hover" />); });
  t.after(() => { act(() => tree.unmount()); });
  const area = tree.root.findByType('div');
  const button = () => tree.root.findByType('button');
  const move = (clientX: number, clientY: number) => {
    act(() => area.props.onMouseMove({
      clientX, clientY,
      currentTarget: { getBoundingClientRect: () => ({ left: 20, top: 10, width: 200, height: 160 }) },
    }));
  };

  // Center is (120, 90). A zero X offset is still tracking, not a mouse leave.
  move(120, 130);
  assert.equal(button().props.style.transform, 'translate(0px, 16.8px)');
  assert.equal(button().props.style.transition, 'transform 0.05s ease-out');
  move(120, 90);
  assert.equal(button().props.style.transform, 'translate(0px, 0px)');
  assert.equal(button().props.style.transition, 'transform 0.05s ease-out');
  move(150, 110);
  assert.equal(button().props.style.transform, 'translate(12.6px, 8.4px)');
  assert.equal(button().props.style.transition, 'transform 0.05s ease-out');

  act(() => area.props.onMouseLeave());
  assert.equal(button().props.style.transform, 'translate(0px, 0px)');
  assert.equal(button().props.style.transition, 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)');
  move(120, 50);
  assert.equal(button().props.style.transform, 'translate(0px, -16.8px)');
  assert.equal(button().props.style.transition, 'transform 0.05s ease-out');
});
