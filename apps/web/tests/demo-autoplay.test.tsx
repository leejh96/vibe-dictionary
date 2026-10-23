import assert from 'node:assert/strict';
import test, { type TestContext } from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { DemoAutoplay, useDemoNumber, useDemoToggle, useDemoPulse, useDemoSample } from '../src/hooks/useDemoAutoplay';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';
import { TechniqueCard } from '../src/components/TechniqueCard';
import { TECHNIQUES } from '@vibe-dictionary/catalog';
import { DEMO_PLAYBACK, DEMO_PLAYBACK_GROUPS } from '../src/components/demos/demoPlayback';
import { COLLECTION_IDS } from './helpers/collection';

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
  const root = { contains: () => false };
  let value = 0, discrete = 0, toggle = false, pulses = 0;
  function Probe() {
    [value] = useDemoNumber(0, -1, 1, .1);
    [discrete] = useDemoNumber(0, 0, 2, 1, 'steps');
    [toggle] = useDemoToggle(false);
    useDemoPulse(() => { pulses++; });
    return null;
  }
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<DemoAutoplay><Probe /></DemoAutoplay>, { createNodeMock: element => element.props.className === 'demo-preview' || element.props.className?.startsWith('demo-stage ') ? root : null }); });
  t.after(() => { act(() => tree.unmount()); restorers.reverse().forEach(restore => restore()); });
  return { tree, frames, observers,
    technique(id: string) {
      act(() => tree.update(<TechniqueCard key={id} item={TECHNIQUES.find(item => item.id === id)!} isSelected={false} onToggleCart={() => {}} />));
      act(() => observers.filter(observer => !observer.disconnected).forEach(observer => observer.callback([{ isIntersecting: true }])));
      act(() => observers.filter(observer => !observer.disconnected).forEach(observer => observer.callback([{ isIntersecting: true }])));
    },
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
      act(() => {
        tree.root.findByProps({ className: 'demo-preview' }).props.onClickCapture({ detail: 1,
        target: { closest: (value: string) => value.includes(selector) ? {} : null },
        preventDefault() { blocked = true; }, stopPropagation() { blocked = true; },
        });
      });
      act(() => { if (!blocked) node.props.onClick(); tree.root.findByProps({ className: 'demo-preview' }).props.onClick(); });
      assert.equal(blocked, false, 'gallery must deliver the click to the existing control');
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

for (const id of [...COLLECTION_IDS].filter(id => DEMO_PLAYBACK.get(id) === 'auto' && !['ly-sticky-stacked-cards', 'ly-footer-uncover-scroll'].includes(id))) {
  test(`${id} changes with the clock, restarts once and stops when hidden`, t => {
    const f = fixture(t);
    f.technique(id);
    const scene = () => JSON.stringify(f.tree.root.findByProps({ className: 'cx-demo' }).findAll(node => typeof node.type === 'string').map(node => ({ type: node.type, props: Object.fromEntries(Object.entries(node.props).filter(([key]) => key !== 'children')), text: node.children.filter(child => typeof child === 'string') }))).replace(/:r[\da-z]+:/gi, ':instance:');
    const initial = scene();
    f.tick(2500, 100);
    assert.notEqual(scene(), initial);
    assert.doesNotMatch(scene(), /NaN|Infinity/);
    f.click(); assert.equal(scene(), initial); assert.equal(f.frames.size, 1);
    f.hide(true); assert.equal(f.frames.size, 0);
    f.hide(false); assert.equal(f.frames.size, 1);
    f.reduce(true); assert.equal(f.frames.size, 0); assert.equal(scene(), initial);
    act(() => f.tree.unmount()); assert.equal(f.frames.size, 0);
  });
}

for (const id of ['mg-halftone-dot-shading', 'mg-isometric-voxel-landscape', 'mg-ribbon-over-under-weave', 'mg-guilloche-curve-engraving', 'mg-gradient-stroke-ribbon']) {
  test(`${id} animates without controls, restarts once and respects reduced motion`, t => {
    const f = fixture(t);
    f.technique(id);
    assert.equal(DEMO_PLAYBACK.get(id), 'auto');
    const geometry = () => {
      const svg = f.tree.root.findByProps({ className: 'gs-art' }).findByType('svg');
      return JSON.stringify({
        paths: svg.findAllByType('path').map(path => path.props.d),
        dots: svg.findAllByType('circle').map(dot => dot.props.r),
        covers: svg.findAllByType('rect').filter(rect => rect.props.height === 23).map(rect => [rect.props.x, rect.props.y]),
      });
    };
    const initial = geometry();
    f.tick(id.includes('weave') ? 4100 : 2000, 100);
    assert.notEqual(geometry(), initial);
    assert.doesNotMatch(geometry(), /NaN|Infinity/);
    f.click();
    assert.equal(geometry(), initial);
    assert.equal(f.frames.size, 1);
    f.tick(8000, 100);
    assert.equal(geometry(), initial);
    f.reduce(true);
    assert.equal(f.frames.size, 0);
    f.tick(2000);
    assert.equal(geometry(), initial);
    act(() => f.tree.unmount());
    assert.equal(f.frames.size, 0);
  });
}

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

test('clicking just before an automatic pulse cancels the old run and starts exactly once', t => {
  const f = fixture(t);
  let starts = 0, finishes = 0, cleanups = 0;
  function Replay() {
    const timer = React.useRef<ReturnType<typeof setTimeout>>();
    const start = () => { starts++; timer.current = setTimeout(() => finishes++, 600); };
    useDemoPulse(start);
    React.useEffect(() => () => { clearTimeout(timer.current); cleanups++; }, []);
    return <button onClick={start} />;
  }
  act(() => f.tree.update(<DemoAutoplay restartOnAction><Replay /></DemoAutoplay>));
  f.visible(true); f.tick(3990);
  assert.equal(starts, 1);
  let blocked = false;
  act(() => {
    f.tree.root.findByProps({ className: 'demo-preview' }).props.onClickCapture({ detail: 1,
      target: { closest: (selector: string) => selector.includes('button') ? {} : null },
      preventDefault() { blocked = true; }, stopPropagation() {},
    });
    if (!blocked) f.tree.root.findByType('button').props.onClick();
  });
  assert.equal(starts, 2, 'replacement starts once; the old handler is not also delivered');
  assert.equal(cleanups, 1);
  f.tick(20); assert.equal(starts, 2, 'old 4-second deadline cannot fire');
  f.timers(600); assert.equal(finishes, 1, 'previous delayed result was cancelled');
  f.tick(3980); assert.equal(starts, 3, 'next automatic action is relative to the click');
  assert.equal(f.frames.size, 1);
});

test('real controls rebase the automatic deadline without firing an extra pulse or losing their action', t => {
  const f = fixture(t);
  let value = 0, pulses = 0;
  function Control() {
    let setValue: React.Dispatch<React.SetStateAction<number>>;
    [value, setValue] = useDemoNumber(0, 0, 10, 1, 'steps');
    useDemoPulse(() => pulses++);
    return <button onClick={() => setValue(current => current - 1)} />;
  }
  act(() => f.tree.update(<DemoAutoplay><Control /></DemoAutoplay>));
  f.visible(true); f.tick(3990);
  assert.equal(value, 10); assert.equal(pulses, 1);
  f.controlClick(f.tree.root.findByType('button'), 'button');
  assert.equal(value, 9, 'functional action uses the currently displayed value');
  assert.equal(pulses, 1);
  f.tick(20); assert.equal(pulses, 1);
  f.tick(3980); assert.equal(pulses, 2);
});

test('changing callback identity does not rewind CSS animations during a parent render', t => {
  const f = fixture(t);
  let replays = 0;
  act(() => f.tree.update(<DemoAutoplay onReplay={() => replays++}><span /></DemoAutoplay>));
  f.visible(true); assert.equal(replays, 1);
  f.tick(1800);
  act(() => f.tree.update(<DemoAutoplay onReplay={() => replays++}><span /></DemoAutoplay>));
  assert.equal(replays, 1);
  f.tick(6200); assert.equal(replays, 2);
});

test('manual samples start from the displayed sample and are not ignored by autoplay', t => {
  const f = fixture(t);
  let displayed = 0;
  function Sample() {
    let setValue: React.Dispatch<React.SetStateAction<number>>;
    [displayed, setValue] = useDemoSample(0, phase => Math.floor(phase * 100));
    return <button onClick={() => setValue(current => current + 1)} />;
  }
  act(() => f.tree.update(<DemoAutoplay><Sample /></DemoAutoplay>));
  f.visible(true); f.tick(3200); assert.equal(displayed, 40);
  f.controlClick(f.tree.root.findByType('button'), 'button');
  assert.equal(displayed, 41);
  f.tick(3000); assert.equal(displayed, 41);
  f.tick(1000); assert.equal(displayed, 50);
});

test('automatic scroll scenes progress without a click or a scrollbar', t => {
  const f = fixture(t);
  f.visible(true);
  for (const id of ['ly-collapsing-scroll-header', 'ly-sticky-scrolltelling', 'ly-fullpage-snap', 'ly-horizontal-showcase', 'ly-curtain-reveal']) {
    f.technique(id);
    assert.equal(f.tree.root.findByType(DemoAutoplay).props.playback, 'auto');
    const before = JSON.stringify(f.tree.toJSON());
    assert.equal(f.tree.root.findAll(node => node.type === 'input' && node.props.type === 'range').length, 0, id);
    f.tick(3200);
    assert.notEqual(JSON.stringify(f.tree.toJSON()), before, `${id}: effect is visible without user input`);
    f.tick(2400);
    assert.notEqual(JSON.stringify(f.tree.toJSON()), before, `${id}: the automatic sequence progresses`);
  }
});

test('interactive inline editing keeps both unfocused drafts and saved values across multiple cycles', t => {
  const f = fixture(t);
  f.technique('inline-edit-field');
  act(() => f.tree.root.findByProps({ 'aria-label': '프로젝트 이름 편집' }).props.onClick());
  const input = f.tree.root.findByType('input');
  act(() => input.props.onChange({ target: { value: '직접 작성한 이름' } }));
  f.tick(24000);
  assert.equal(f.tree.root.findByType('input'), input);
  assert.equal(input.props.value, '직접 작성한 이름');
  act(() => f.tree.root.findByType('form').props.onSubmit({ preventDefault() {} }));
  f.tick(24000);
  assert.equal(f.tree.root.findByProps({ 'aria-label': '프로젝트 이름 편집' }).findByType('strong').children.join(''), '직접 작성한 이름');
  assert.equal(f.frames.size, 0);
});

test('every catalog technique has exactly one explicit preview policy', () => {
  const entries = Object.values(DEMO_PLAYBACK_GROUPS).flat();
  assert.equal(new Set(entries).size, entries.length, 'no duplicate or conflicting policies');
  assert.equal(DEMO_PLAYBACK.size, entries.length);
  assert.deepEqual([...entries].sort(), TECHNIQUES.map(item => item.id).sort());
});

test('interactive and static previews neither schedule automatic frames nor intercept clicks', t => {
  const f = fixture(t);
  for (const playback of ['interactive', 'static'] as const) {
    let replays = 0, clicks = 0;
    act(() => f.tree.update(<DemoAutoplay playback={playback} onReplay={() => replays++} restartOnAction><button onClick={() => clicks++} /></DemoAutoplay>));
    const preview = f.tree.root.findByProps({ className: 'demo-preview' });
    assert.equal(preview.props.onClickCapture, undefined);
    assert.equal(preview.props['data-demo-active'], undefined);
    act(() => f.tree.root.findByType('button').props.onClick());
    f.tick(24000);
    assert.equal(clicks, 1); assert.equal(replays, 0); assert.equal(f.frames.size, 0);
  }
});

test('interactive cards stay idle until real input, including former automatic state and pulse demos', t => {
  const f = fixture(t);
  for (const id of ['zoom-lightbox-gallery', 'selection-bubble-toolbar', 'rich-hover-preview', 'elastic-toggle-switch', 'sliding-pill-tabs', 'smooth-accordion', 'confetti-burst', 'otp-pin-focus-bounce', 'mg-lucky-wheel-3d', 'mg-projection-mode-switch', 'mg-quadratic-bezier-editor', 'ly-stable-scrollbar-gutter']) {
    f.technique(id);
    assert.equal(f.tree.root.findByType(DemoAutoplay).props.playback, 'interactive', id);
    const before = JSON.stringify(f.tree.toJSON());
    f.tick(24000); f.timers(24000);
    assert.equal(JSON.stringify(f.tree.toJSON()), before, `${id}: idle state must not change`);
    assert.equal(f.frames.size, 0, id);
  }
});

test('manual toggle and gallery state remain selected after input without common replay', t => {
  const f = fixture(t);
  for (const id of ['elastic-toggle-switch', 'card-flip-3d', 'sliding-pill-tabs', 'smooth-accordion', 'zoom-lightbox-gallery']) {
    f.technique(id);
    const before = JSON.stringify(f.tree.toJSON());
    const preview = f.tree.root.findByProps({ className: 'demo-preview' });
    const targets = preview.findAll(node => typeof node.type === 'string' && typeof node.props.onClick === 'function');
    const target = id === 'sliding-pill-tabs' ? targets[1] : targets[0];
    act(() => target.props.onClick());
    f.timers(300);
    const after = JSON.stringify(f.tree.toJSON());
    assert.notEqual(after, before, id);
    f.tick(24000); f.timers(24000);
    assert.equal(JSON.stringify(f.tree.toJSON()), after, id);
  }
});

test('reduced-motion replay actions still deliver the original manual click', t => {
  const f = fixture(t, true);
  let clicks = 0;
  act(() => f.tree.update(<DemoAutoplay restartOnAction><button onClick={() => clicks++} /></DemoAutoplay>));
  f.visible(true);
  f.controlClick(f.tree.root.findByType('button'), 'button');
  assert.equal(clicks, 1);
  assert.equal(f.frames.size, 0);
});
