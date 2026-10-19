import assert from 'node:assert/strict';
import test, { type TestContext } from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { DemoAutoplay, useDemoNumber, useDemoToggle, useDemoPulse } from '../src/hooks/useDemoAutoplay';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';

function fixture(t: TestContext, initiallyReduced = false) {
  t.mock.timers.enable({ apis: ['setInterval', 'setTimeout'] });
  const restorers: (() => void)[] = [];
  const restore = (name: string, value: unknown) => {
    const old = Object.getOwnPropertyDescriptor(globalThis, name);
    Object.defineProperty(globalThis, name, { configurable: true, value });
    restorers.push(() => { if (old) Object.defineProperty(globalThis, name, old); else Reflect.deleteProperty(globalThis, name); });
  };
  const media = { matches: initiallyReduced, addEventListener: (_: string, callback: () => void) => { mediaChanged = callback; }, removeEventListener: () => { mediaChanged = undefined; } };
  let mediaChanged: (() => void) | undefined;
  let visibilityChanged: (() => void) | undefined;
  const documentMock = { hidden: false, addEventListener: (_: string, callback: () => void) => { visibilityChanged = callback; }, removeEventListener: () => { visibilityChanged = undefined; } };
  const observers: { callback: (entries: { isIntersecting: boolean }[]) => void; disconnected: boolean }[] = [];
  const frames = new Map<number, FrameRequestCallback>();
  let frameId = 0, now = 0;
  restore('window', { matchMedia: () => media,
    setTimeout, clearTimeout,
    requestAnimationFrame: (callback: FrameRequestCallback) => { const id = ++frameId; frames.set(id, callback); return id; },
    cancelAnimationFrame: (id: number) => { frames.delete(id); },
  });
  const frame = () => act(() => {
    const pending = [...frames.values()]; frames.clear();
    pending.forEach(callback => callback(now));
  });
  restore('document', documentMock);
  restore('IntersectionObserver', class {
    record: typeof observers[number];
    constructor(callback: typeof observers[number]['callback']) { this.record = { callback, disconnected: false }; observers.push(this.record); }
    observe() {}
    disconnect() { this.record.disconnected = true; }
  });
  const root = {};
  let value = 0, discrete = 0, toggle = false, pulses = 0;
  function Probe() {
    [value] = useDemoNumber(0, -1, 1, .1);
    [discrete] = useDemoNumber(0, 0, 2, 1, 'steps');
    [toggle] = useDemoToggle(false);
    useDemoPulse(() => { pulses++; });
    return null;
  }
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<DemoAutoplay><Probe /></DemoAutoplay>, { createNodeMock: element => element.props.className === 'demo-preview' ? root : null }); });
  t.after(() => { act(() => tree.unmount()); restorers.reverse().forEach(restore => restore()); });
  return { tree, frames, observers,
    get value() { return value; }, get discrete() { return discrete; }, get toggle() { return toggle; }, get pulses() { return pulses; },
    visible(visible: boolean) { act(() => observers[0].callback([{ isIntersecting: visible }])); },
    tick(ms: number, frameMs = 16) {
      frame();
      const end = now + ms;
      while (now < end) { now = Math.min(now + frameMs, end); frame(); }
    },
    reduce(value: boolean) { act(() => { media.matches = value; mediaChanged?.(); }); },
    hide(value: boolean) { act(() => { documentMock.hidden = value; visibilityChanged?.(); }); },
    timers(ms: number) { act(() => t.mock.timers.tick(ms)); },
    hover() { assert.equal(tree.root.findByProps({ className: 'demo-preview' }).props.onPointerEnter, undefined); },
    click() { act(() => tree.root.findByProps({ className: 'demo-preview' }).props.onClickCapture({ detail: 1, target: { closest: () => null }, preventDefault() {}, stopPropagation() {} })); },
    controlClick(node: { props: { onClick: () => void } }, selector: string) {
      let blocked = false;
      act(() => tree.root.findByProps({ className: 'demo-preview' }).props.onClickCapture({ detail: 1,
        target: { closest: (value: string) => value.includes(selector) ? {} : null },
        preventDefault() { blocked = true; }, stopPropagation() { blocked = true; },
      }));
      assert.equal(blocked, false, 'gallery must deliver the click to the existing control');
      act(() => node.props.onClick());
    },
  };
}

test('autoplay continues across hover and restarts from the initial state only on click', t => {
  const f = fixture(t);
  assert.equal(f.frames.size, 0);
  f.tick(4000); assert.equal(f.value, 0); assert.equal(f.pulses, 0);
  f.visible(true); assert.equal(f.frames.size, 1);
  f.tick(2000); assert.equal(f.value, 1);
  f.hover(); assert.equal(f.value, 1);
  f.tick(2000); assert.equal(f.value, 0); assert.equal(f.toggle, true); assert.equal(f.pulses, 2);
  f.hover(); assert.equal(f.value, 0); assert.equal(f.toggle, true);
  f.tick(2000); assert.equal(f.value, -1);
  f.click(); assert.equal(f.value, 0); assert.equal(f.toggle, false);
  assert.equal(f.frames.size, 1);
  f.tick(8000); assert.equal(f.value, 0); assert.equal(f.toggle, false);
});

test('reduced motion, hidden tabs, offscreen cards and unmount release the preview frame', t => {
  const f = fixture(t, true);
  f.visible(true); assert.equal(f.frames.size, 0);
  f.tick(4000); assert.equal(f.toggle, false); assert.equal(f.pulses, 0);
  f.reduce(false); assert.equal(f.frames.size, 1);
  f.hide(true); assert.equal(f.frames.size, 0);
  f.hide(false); assert.equal(f.frames.size, 1);
  f.visible(false); assert.equal(f.frames.size, 0);
  f.visible(true); assert.equal(f.frames.size, 1);
  f.reduce(true); assert.equal(f.frames.size, 0);
  act(() => f.tree.unmount());
  assert.ok(f.observers.every(observer => observer.disconnected));
});

test('continuous motion advances between old 80ms ticks while discrete states stay integral', t => {
  const f = fixture(t);
  f.visible(true);
  f.tick(16); assert.equal(f.value, .008); assert.equal(f.discrete, 0);
  f.tick(16); assert.equal(f.value, .016);
  f.tick(968); assert.equal(f.value, .5); assert.equal(f.discrete, 1);
  f.hide(true); f.tick(10000); f.hide(false);
  f.tick(16); assert.equal(f.value, .508);
});

test('elapsed time keeps playback speed equal across display refresh rates', t => {
  const f = fixture(t);
  f.visible(true); f.tick(1232, 16);
  const slowDisplay = f.value;
  f.click(); f.tick(1232, 8);
  assert.equal(f.value, slowDisplay);
  act(() => f.tree.unmount());
  assert.equal(f.frames.size, 0);
});

test('gallery hover designs respond to native input while the autoplay clock keeps running', t => {
  const f = fixture(t);
  f.visible(true);
  act(() => f.tree.update(<DemoAutoplay><InteractiveDemo techniqueId="liquid-slide-fill" /></DemoAutoplay>));
  const button = () => f.tree.root.findByType('button');
  const fill = () => button().findAllByType('span')[1].props.className;
  assert.match(fill(), /-translate-x-full/);
  act(() => button().props.onMouseEnter());
  f.tick(2000);
  assert.doesNotMatch(fill(), /-translate-x-full/);
  act(() => button().props.onMouseLeave());
  assert.match(fill(), /-translate-x-full/);
  f.click();

  act(() => f.tree.update(<DemoAutoplay><InteractiveDemo techniqueId="magnetic-hover" /></DemoAutoplay>));
  const surface = () => f.tree.root.findAllByType('div').find(node => node.props.onMouseMove)!;
  act(() => surface().props.onMouseMove({ currentTarget: { getBoundingClientRect: () => ({ left: 0, top: 0, width: 200, height: 100 }) }, clientX: 200, clientY: 100 }));
  f.tick(2000);
  assert.equal(button().props.style.transform, 'translate(42px, 21px)');
  act(() => surface().props.onMouseLeave());
  assert.match(button().props.style.transform, /^translate\(35px,/);
});

test('projection buttons keep their original selection and SVG instance during autoplay', t => {
  const f = fixture(t);
  f.visible(true);
  act(() => f.tree.update(<DemoAutoplay><InteractiveDemo techniqueId="mg-projection-mode-switch" /></DemoAutoplay>));
  const buttons = () => f.tree.root.findAllByType('button');
  assert.equal(buttons().length, 2);
  const sceneId = f.tree.root.findByType('svg').props.id;
  for (const index of [1, 0, 1]) {
    f.controlClick(buttons()[index], 'button');
    assert.equal(buttons()[index].props['aria-pressed'], true);
    f.tick(320);
    assert.equal(buttons()[index].props['aria-pressed'], true);
    assert.equal(f.tree.root.findByType('svg').props.id, sceneId);
  }
});

test('iris click surface toggles its mask instead of restarting the gallery', t => {
  const f = fixture(t);
  f.visible(true);
  act(() => f.tree.update(<DemoAutoplay><InteractiveDemo techniqueId="mg-iris-circle-wipe" /></DemoAutoplay>));
  const surface = () => f.tree.root.findByType('button');
  const mask = () => f.tree.root.findAllByType('div').find(node => node.props.style?.clipPath)!.props.style.clipPath;
  for (const expected of ['circle(0% at 50% 50%)', 'circle(120% at 50% 50%)']) {
    assert.equal(surface().props['data-demo-control'], true);
    assert.equal(surface().props.type, 'button');
    assert.equal(surface().props['aria-label'], '아이리스 조리개 닫기');
    f.controlClick(surface(), '[data-demo-control]');
    assert.equal(mask(), expected);
    assert.equal(surface().props['aria-pressed'], expected.startsWith('circle(0%'));
    f.tick(650);
    assert.equal(mask(), expected);
  }
});

test('step buttons update the visible index through functional setters during autoplay', t => {
  const f = fixture(t);
  f.visible(true);
  act(() => f.tree.update(<DemoAutoplay><InteractiveDemo techniqueId="directional-step-transition" /></DemoAutoplay>));
  const buttons = () => f.tree.root.findAllByType('button');
  const transform = () => f.tree.root.findByProps({ className: 'md-step-track' }).props.style.transform;
  for (const [index, expected] of [[1, -100], [1, -200], [0, -100]]) {
    f.controlClick(buttons()[index], 'button');
    assert.equal(transform(), `translateX(${expected}%)`);
    f.tick(320);
    assert.equal(transform(), `translateX(${expected}%)`);
  }
});

test('OTP buttons preserve their timed input sequence and digit feedback in the gallery', t => {
  const f = fixture(t);
  f.visible(true);
  act(() => f.tree.update(<DemoAutoplay><InteractiveDemo techniqueId="otp-pin-focus-bounce" /></DemoAutoplay>));
  const buttons = () => f.tree.root.findAllByType('button');
  f.timers(660);
  assert.equal(buttons().slice(0, 6).map(button => button.children.join('')).join(''), '739158');
  f.controlClick(buttons()[6], 'button');
  assert.equal(buttons().slice(0, 6).map(button => button.children.join('')).join(''), '······');
  f.timers(220);
  assert.equal(buttons().slice(0, 3).map(button => button.children.join('')).join(''), '739');
  f.timers(440);
  f.controlClick(buttons()[0], 'button');
  const selected = buttons()[0].children.join('');
  assert.match(selected, /^[1-9]$/);
  f.tick(320);
  assert.equal(buttons()[0].children.join(''), selected);
});
