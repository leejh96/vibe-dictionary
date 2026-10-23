import { COLLECTION_IDS } from './helpers/collection';
import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { ReorderListDemo } from '../src/components/demos/motion/ReorderListDemo';
import { ReflowPanelDemo } from '../src/components/demos/motion/ReflowPanelDemo';
import { ExitCollapseDemo } from '../src/components/demos/motion/ExitCollapseDemo';
import { AnchoredPopoverDemo } from '../src/components/demos/motion/AnchoredPopoverDemo';
import { DirectionalStepDemo, CrossfadeSceneDemo, BlurFocusRevealDemo, MaskedRiseDemo, SharedElementExpandDemo, TransportMorphDemo } from '../src/components/demos/motion/MotionDemos';
import { TECHNIQUES, matchesSearch } from '@vibe-dictionary/catalog';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';
import { LocaleProvider, useLocale } from '../src/i18n/LocaleContext';

test('anchored popover dismisses outside and on Escape, preserves focus and cleans up listeners', t => {
  const originalDocument = Object.getOwnPropertyDescriptor(globalThis, 'document');
  const listeners = new Set<(event: unknown) => void>();
  const inside = {};
  Object.defineProperty(globalThis, 'document', { configurable: true, value: {
    addEventListener: (_: string, listener: (event: unknown) => void) => listeners.add(listener),
    removeEventListener: (_: string, listener: (event: unknown) => void) => listeners.delete(listener),
  } });
  let focuses = 0;
  let tree!: ReturnType<typeof create>;
  t.after(() => {
    act(() => tree.unmount());
    assert.equal(listeners.size, 0);
    if (originalDocument) Object.defineProperty(globalThis, 'document', originalDocument); else Reflect.deleteProperty(globalThis, 'document');
  });
  act(() => { tree = create(<AnchoredPopoverDemo />, { createNodeMock: element => element.type === 'button' ? { focus: () => { focuses++; } } : { contains: (target: unknown) => target === inside } }); });
  const trigger = () => tree.root.findByType('button');
  const note = () => tree.root.findByProps({ className: 'md-anchor-note' });
  assert.equal(trigger().props['aria-controls'], note().props.id);
  assert.equal(trigger().props['aria-describedby'], note().props.id);
  assert.equal(note().props['aria-hidden'], false);
  act(() => [...listeners][0]({ target: inside }));
  assert.equal(trigger().props['aria-expanded'], true);
  act(() => [...listeners][0]({ target: {} }));
  assert.equal(trigger().props['aria-expanded'], false);
  assert.equal(trigger().props['aria-describedby'], undefined);
  assert.equal(note().props['aria-hidden'], true);
  assert.equal(listeners.size, 0);
  act(() => trigger().props.onClick());
  act(() => tree.root.findByProps({ className: 'md-anchor-frame' }).props.onKeyDown({ key: 'Escape', stopPropagation() {} }));
  assert.equal(trigger().props['aria-expanded'], false);
  assert.equal(focuses, 1);
  act(() => trigger().props.onClick());
  assert.equal(listeners.size, 1);
});

for (const reduced of [false, true]) test(`exit presence respects reduced motion=${reduced}, restores focus and cancels pending removal`, t => {
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
  Object.defineProperty(globalThis, 'window', { configurable: true, value: { matchMedia: () => ({ matches: reduced }) } });
  let nextHandle = 0;
  const pending = new Map<number, () => void>();
  const focuses: string[] = [];
  t.mock.method(globalThis, 'setTimeout', (callback: () => void) => { pending.set(++nextHandle, callback); return nextHandle as unknown as ReturnType<typeof setTimeout>; });
  t.mock.method(globalThis, 'clearTimeout', (handle: ReturnType<typeof setTimeout>) => { pending.delete(Number(handle)); });
  let tree!: ReturnType<typeof create>;
  t.after(() => {
    act(() => tree.unmount());
    if (originalWindow) Object.defineProperty(globalThis, 'window', originalWindow); else Reflect.deleteProperty(globalThis, 'window');
    assert.equal(pending.size, 0);
  });
  act(() => { tree = create(<ExitCollapseDemo />, { createNodeMock: element => ({ focus: () => { focuses.push(element.type === 'li' ? 'remaining' : 'close'); } }) }); });
  const close = () => tree.root.findByProps({ 'aria-label': '팀 미팅 닫기' });
  act(() => close().props.onClick());
  assert.deepEqual(focuses, ['remaining']);
  assert.equal(pending.size, reduced ? 0 : 1);
  if (!reduced) {
    assert.equal(close().props['aria-disabled'], true);
    act(() => close().props.onClick());
    assert.equal(pending.size, 1);
    const [handle, callback] = [...pending][0];
    pending.delete(handle);
    act(() => callback());
  }
  assert.equal(tree.root.findAllByProps({ 'aria-label': '팀 미팅 닫기' }).length, 0);
  act(() => tree.root.findByProps({ className: 'md-dismiss-undo' }).props.onClick());
  assert.equal(close().props['aria-disabled'], false);
  assert.deepEqual(focuses, ['remaining', 'close']);
  act(() => close().props.onClick());
});

test('transport morph toggles its pressed state while keeping the same accessible action name', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<TransportMorphDemo />); });
  t.after(() => { act(() => tree.unmount()); });
  const button = () => tree.root.findByType('button');
  const label = button().props['aria-label'];
  assert.equal(button().props['aria-pressed'], false);
  act(() => button().props.onClick());
  assert.equal(button().props['aria-pressed'], true);
  assert.equal(button().props['aria-label'], label);
  act(() => button().props.onClick());
  assert.equal(button().props['aria-pressed'], false);
});

test('reflow panel gates hidden options, selects a view and returns focus on dismissal', t => {
  let focuses = 0;
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<ReflowPanelDemo />, { createNodeMock: () => ({ focus: () => { focuses++; } }) }); });
  t.after(() => { act(() => tree.unmount()); });
  const trigger = () => tree.root.findByProps({ 'aria-label': '문서 보기 패널' });
  const panel = () => tree.root.findByProps({ className: 'md-push-panel' });
  const options = () => tree.root.findAllByProps({ className: 'md-push-option' });
  assert.equal(trigger().props['aria-controls'], panel().props.id);
  assert.equal(panel().props['aria-hidden'], true);
  assert.ok(options().every(b => b.props.disabled && b.props.tabIndex === -1));
  act(() => trigger().props.onClick());
  assert.equal(panel().props['aria-hidden'], false);
  act(() => options()[1].props.onClick());
  assert.equal(tree.root.findByType('strong').children.join(''), '저장 문서');
  assert.equal(trigger().props['aria-expanded'], false);
  assert.equal(focuses, 1);
  act(() => trigger().props.onClick());
  assert.deepEqual(options().map(b => b.props['aria-pressed']), [false, true]);
  act(() => tree.root.findByProps({ className: 'md-push-frame' }).props.onKeyDown({ key: 'Escape', stopPropagation() {} }));
  assert.equal(trigger().props['aria-expanded'], false);
  assert.equal(focuses, 2);
});

test('shared element expansion preserves the cover and toggles both directions', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<SharedElementExpandDemo />); });
  t.after(() => { act(() => tree.unmount()); });
  const button = tree.root.findByType('button');
  const cover = tree.root.findByProps({ className: 'md-shared-cover' });
  assert.equal(button.props['aria-pressed'], false);
  act(() => button.props.onClick());
  assert.equal(button.props['aria-pressed'], true);
  assert.equal(button.props['data-expanded'], true);
  assert.equal(tree.root.findByProps({ className: 'md-shared-cover' }), cover);
  act(() => button.props.onClick());
  assert.equal(button.props['aria-pressed'], false);
  assert.equal(button.props['data-expanded'], false);
});

test('added motion techniques have searchable prompts, mapped demos and no helper captions', () => {
  const originalIds = new Set(['spring-bounce-modal', 'staggered-list', 'smooth-accordion', 'morphing-state-button', 'floating-levitation']);
  const additions = TECHNIQUES.filter(item => !COLLECTION_IDS.has(item.id) && item.category === 'motion' && !originalIds.has(item.id));
  assert.equal(additions.length, 11);
  assert.equal(new Set(TECHNIQUES.map(item => item.id)).size, TECHNIQUES.length);
  for (const item of additions) {
    assert.ok(item.promptSnippet.trim());
    assert.ok(matchesSearch(item, item.titleKo));
    let tree!: ReturnType<typeof create>;
    act(() => { tree = create(<InteractiveDemo techniqueId={item.id} />); });
    assert.notEqual(tree.toJSON(), null, `${item.id} must resolve to a demo`);
    assert.equal(tree.root.findAllByType('p').length, 0);
    assert.equal(tree.root.findAllByProps({ role: 'status' }).length, 0);
    act(() => tree.unmount());
  }
});

test('entrance replays replace only their animated object while preserving the focusable control', t => {
  for (const Demo of [BlurFocusRevealDemo, MaskedRiseDemo]) {
    let tree!: ReturnType<typeof create>;
    act(() => { tree = create(<Demo />); });
    t.after(() => { act(() => tree.unmount()); });
    const button = tree.root.findByType('button');
    const initialObject = tree.root.findByProps({ className: 'md-replay-object' });
    act(() => button.props.onClick());
    assert.equal(tree.root.findByType('button'), button);
    assert.notEqual(tree.root.findByProps({ className: 'md-replay-object' }), initialObject);
    assert.equal(tree.root.findAllByType('p').length, 0);
  }
});

test('crossfade keeps two stable layers and exposes the current scene on repeated inputs', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<CrossfadeSceneDemo />); });
  t.after(() => { act(() => tree.unmount()); });
  const layers = () => tree.root.findAll(node => typeof node.props.className === 'string' && node.props.className.startsWith('md-scene-layer'));
  const button = () => tree.root.findByType('button');
  assert.deepEqual(layers().map(l => l.props['aria-hidden']), [false, true]);
  assert.ok(button().props['aria-label'].includes('파도'));
  act(() => button().props.onClick());
  assert.deepEqual(layers().map(l => l.props['aria-hidden']), [true, false]);
  assert.ok(button().props['aria-label'].includes('숲'));
  act(() => button().props.onClick());
  assert.deepEqual(layers().map(l => l.props['aria-hidden']), [false, true]);
  assert.equal(layers().length, 2);
});

test('directional steps guard both ends and expose only the active panel', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<DirectionalStepDemo />); });
  t.after(() => { act(() => tree.unmount()); });
  const buttons = () => tree.root.findAllByType('button');
  const panels = () => tree.root.findAllByProps({ className: 'md-step-panel' });
  assert.deepEqual(buttons().map(b => b.props['aria-disabled']), [true, false]);
  act(() => buttons()[0].props.onClick());
  assert.deepEqual(panels().map(p => p.props['aria-hidden']), [false, true, true]);
  act(() => buttons()[1].props.onClick());
  assert.deepEqual(panels().map(p => p.props['aria-hidden']), [true, false, true]);
  act(() => buttons()[1].props.onClick());
  act(() => buttons()[1].props.onClick());
  assert.equal(tree.root.findByProps({ className: 'md-step-track' }).props.style.transform, 'translateX(-200%)');
  assert.deepEqual(buttons().map(b => b.props['aria-disabled']), [false, true]);
  act(() => buttons()[0].props.onClick());
  assert.deepEqual(panels().map(p => p.props['aria-hidden']), [true, false, true]);
});

for (const mode of ['animated', 'reduced-motion', 'unsupported-api']) test(`FLIP ${mode} preserves the new order and cleans up element animations`, t => {
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
  Object.defineProperty(globalThis, 'window', { configurable: true, value: { matchMedia: () => ({ matches: mode === 'reduced-motion' }) } });
  let moved = false;
  const before = { plan: 0, design: 30, build: 60 };
  const after = { design: 0, build: 30, plan: 60 };
  const animations: { id: string; frames: { transform: string }[]; canceled: boolean }[] = [];
  let tree!: ReturnType<typeof create>;
  t.after(() => {
    act(() => tree.unmount());
    if (originalWindow) Object.defineProperty(globalThis, 'window', originalWindow);
    else Reflect.deleteProperty(globalThis, 'window');
    assert.ok(animations.every(animation => animation.canceled));
  });
  act(() => { tree = create(<ReorderListDemo />, { createNodeMock: element => {
    if (element.type !== 'li') return null;
    const id = element.props['data-item-id'] as keyof typeof before;
    return {
      getBoundingClientRect: () => ({ top: (moved ? after : before)[id] }),
      animate: mode === 'unsupported-api' ? undefined : (frames: { transform: string }[]) => {
        const animation = { id, frames, canceled: false };
        animations.push(animation);
        return { cancel: () => { animation.canceled = true; } };
      },
    };
  } }); });
  act(() => { tree.root.findByType('button').props.onClick(); moved = true; });
  assert.equal(animations.length, mode === 'animated' ? 3 : 0);
  assert.deepEqual(tree.root.findAllByType('li').map(item => item.props['data-item-id']), ['design', 'build', 'plan']);
  for (const animation of animations) {
    assert.equal(animation.frames[0].transform, `translateY(${before[animation.id as keyof typeof before] - after[animation.id as keyof typeof after]}px)`);
    assert.equal(animation.frames[1].transform, 'translateY(0)');
  }
});

test('FLIP list cycles stable item IDs and returns to the original order without adding captions', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<ReorderListDemo />); });
  t.after(() => { act(() => tree.unmount()); });
  const order = () => tree.root.findAllByType('li').map(item => item.props['data-item-id']);
  const cycle = () => { act(() => tree.root.findByType('button').props.onClick()); };
  assert.deepEqual(order(), ['plan', 'design', 'build']);
  cycle();
  assert.deepEqual(order(), ['design', 'build', 'plan']);
  cycle(); cycle();
  assert.deepEqual(order(), ['plan', 'design', 'build']);
  assert.equal(tree.root.findAllByType('p').length, 0);
  assert.equal(tree.root.findAllByProps({ role: 'status' }).length, 0);
});

test('motion language switching translates active views, scenes and ordered items without resetting controls or replacing animated objects', t => {
  let setLocale!: ReturnType<typeof useLocale>['setLocale'];
  function LanguageControl() { setLocale = useLocale().setLocale; return null; }
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<LocaleProvider initialLocale="ko"><LanguageControl /><ReflowPanelDemo /><CrossfadeSceneDemo /><DirectionalStepDemo /><SharedElementExpandDemo /><TransportMorphDemo /><ReorderListDemo /><BlurFocusRevealDemo /><MaskedRiseDemo /><AnchoredPopoverDemo /></LocaleProvider>); });
  t.after(() => { act(() => tree.unmount()); });
  const reflow = tree.root.findByType(ReflowPanelDemo);
  const scene = tree.root.findByType(CrossfadeSceneDemo);
  const steps = tree.root.findByType(DirectionalStepDemo);
  const shared = tree.root.findByType(SharedElementExpandDemo);
  const transport = tree.root.findByType(TransportMorphDemo);
  const reorder = tree.root.findByType(ReorderListDemo);
  const anchor = tree.root.findByType(AnchoredPopoverDemo);
  act(() => reflow.findAllByType('button')[0].props.onClick());
  act(() => reflow.findAllByProps({ className: 'md-push-option' })[1].props.onClick());
  act(() => reflow.findAllByType('button')[0].props.onClick());
  act(() => scene.findByType('button').props.onClick());
  act(() => steps.findAllByType('button')[1].props.onClick());
  act(() => shared.findByType('button').props.onClick());
  act(() => transport.findByType('button').props.onClick());
  act(() => reorder.findByType('button').props.onClick());
  act(() => anchor.findByType('button').props.onClick());
  const cover = shared.findByProps({ className: 'md-shared-cover' });
  const sceneLayers = scene.findAll(node => typeof node.props.className === 'string' && node.props.className.startsWith('md-scene-layer'));
  const orderedNodes = reorder.findAllByType('li');
  const entranceObjects = [BlurFocusRevealDemo, MaskedRiseDemo].map(Demo => tree.root.findByType(Demo).findByProps({ className: 'md-replay-object' }));
  act(() => setLocale('en'));
  assert.equal(reflow.findByType('strong').children.join(''), 'Saved documents');
  assert.equal(reflow.findAllByType('button')[0].props['aria-expanded'], true);
  assert.deepEqual(reflow.findAllByProps({ className: 'md-push-option' }).map(button => button.props['aria-pressed']), [false, true]);
  assert.equal(scene.findByType('button').props['aria-label'], 'Switch collection scene: Forest');
  assert.deepEqual(sceneLayers.map(layer => layer.props['aria-hidden']), [true, false]);
  assert.deepEqual(scene.findAll(node => typeof node.props.className === 'string' && node.props.className.startsWith('md-scene-layer')), sceneLayers);
  assert.equal(steps.findByProps({ className: 'md-step-track' }).props.style.transform, 'translateX(-100%)');
  assert.deepEqual(steps.findAllByType('strong').map(node => node.children.join('')), ['Structure', 'Style', 'Review']);
  assert.equal(shared.findByProps({ className: 'md-shared-cover' }), cover);
  assert.equal(shared.findByType('button').props['aria-pressed'], true);
  assert.equal(transport.findByType('button').props['aria-pressed'], true);
  assert.equal(transport.findByType('button').props['aria-label'], 'Toggle play/pause icon');
  assert.deepEqual(reorder.findAllByType('li'), orderedNodes);
  assert.deepEqual(reorder.findAllByType('li').map(node => node.props['data-item-id']), ['design', 'build', 'plan']);
  assert.deepEqual(reorder.findAllByType('li').map(node => node.children.slice(1).join('')), ['Design', 'Development', 'Planning']);
  assert.equal(anchor.findByType('button').props['aria-expanded'], false);
  assert.equal(anchor.findByType('strong').children.join(''), 'Read only');
  for (const [index, Demo] of [BlurFocusRevealDemo, MaskedRiseDemo].entries()) {
    assert.equal(tree.root.findByType(Demo).findByProps({ className: 'md-replay-object' }), entranceObjects[index]);
    assert.doesNotMatch(tree.root.findByType(Demo).findByType('button').props['aria-label'], /[가-힣]/u);
  }
  act(() => setLocale('ko'));
  assert.equal(reflow.findByType('strong').children.join(''), '저장 문서');
  assert.equal(scene.findByType('button').props['aria-label'], '컬렉션 장면 전환: 숲');
  assert.deepEqual(reorder.findAllByType('li').map(node => node.props['data-item-id']), ['design', 'build', 'plan']);
});

test('switching language during exit keeps the existing removal timer and translates Undo after removal', t => {
  let setLocale!: ReturnType<typeof useLocale>['setLocale'];
  function LanguageControl() { setLocale = useLocale().setLocale; return null; }
  let nextHandle = 0;
  const pending = new Map<number, () => void>();
  t.mock.method(globalThis, 'setTimeout', (callback: () => void) => { pending.set(++nextHandle, callback); return nextHandle as unknown as ReturnType<typeof setTimeout>; });
  t.mock.method(globalThis, 'clearTimeout', (handle: ReturnType<typeof setTimeout>) => { pending.delete(Number(handle)); });
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<LocaleProvider initialLocale="ko"><LanguageControl /><ExitCollapseDemo /></LocaleProvider>); });
  t.after(() => { act(() => tree.unmount()); assert.equal(pending.size, 0); });
  const close = tree.root.findByProps({ className: 'md-dismiss-close' });
  act(() => close.props.onClick());
  assert.equal(pending.size, 1);
  const timer = [...pending][0];
  act(() => setLocale('en'));
  assert.equal(tree.root.findByProps({ className: 'md-dismiss-close' }), close);
  assert.equal(close.props['aria-disabled'], true);
  assert.equal(close.props['aria-label'], 'Close Team meeting');
  assert.deepEqual([...pending][0], timer);
  assert.equal(tree.root.findByProps({ className: 'md-dismiss-stay' }).children.join(''), 'Project cleanup');
  pending.delete(timer[0]);
  act(() => timer[1]());
  assert.equal(tree.root.findAllByProps({ className: 'md-dismiss-close' }).length, 0);
  assert.equal(tree.root.findByProps({ className: 'md-dismiss-undo' }).children.slice(1).join(''), 'Undo');
  act(() => setLocale('ko'));
  act(() => tree.root.findByProps({ className: 'md-dismiss-undo' }).props.onClick());
  assert.equal(tree.root.findByProps({ className: 'md-dismiss-close' }).props['aria-label'], '팀 미팅 닫기');
});
