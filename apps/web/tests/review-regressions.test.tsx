import assert from 'node:assert/strict';
import test, { type TestContext } from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { TECHNIQUES, getTechniqueText } from '@vibe-dictionary/catalog';
import { DemoAutoplay, useDemoAutoplayRunning } from '../src/hooks/useDemoAutoplay';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';
import { LocaleProvider } from '../src/i18n/LocaleContext';

function fixture(t: TestContext, id: string, reduced = false) {
  t.mock.timers.enable({ apis: ['setTimeout', 'setInterval'] });
  const restores: (() => void)[] = [];
  const replace = (name: string, value: unknown) => {
    const original = Object.getOwnPropertyDescriptor(globalThis, name);
    Object.defineProperty(globalThis, name, { configurable: true, value });
    restores.push(() => { if (original) Object.defineProperty(globalThis, name, original); else Reflect.deleteProperty(globalThis, name); });
  };
  const mediaCallbacks = new Set<() => void>(), visibilityCallbacks = new Set<() => void>();
  const media = { matches: reduced, addEventListener: (_: string, cb: () => void) => mediaCallbacks.add(cb), removeEventListener: (_: string, cb: () => void) => mediaCallbacks.delete(cb) };
  const doc = { hidden: false, addEventListener: (_: string, cb: () => void) => visibilityCallbacks.add(cb), removeEventListener: (_: string, cb: () => void) => visibilityCallbacks.delete(cb) };
  const observers: ((entries: { isIntersecting: boolean }[]) => void)[] = [];
  const frames = new Map<number, FrameRequestCallback>();
  const pendingTimers = new Set<unknown>();
  let frameId = 0, now = 0;
  t.mock.method(performance, 'now', () => now);
  const schedule = globalThis.setTimeout, interval = globalThis.setInterval;
  const cancel = globalThis.clearTimeout, cancelInterval = globalThis.clearInterval;
  t.mock.method(globalThis, 'setTimeout', (callback: () => void, delay: number) => {
    const handle = schedule(() => { pendingTimers.delete(handle); callback(); }, delay);
    pendingTimers.add(handle); return handle;
  });
  t.mock.method(globalThis, 'setInterval', (callback: () => void, delay: number) => {
    const handle = interval(callback, delay); pendingTimers.add(handle); return handle;
  });
  t.mock.method(globalThis, 'clearTimeout', (handle: ReturnType<typeof setTimeout>) => { pendingTimers.delete(handle); cancel(handle); });
  t.mock.method(globalThis, 'clearInterval', (handle: ReturnType<typeof setInterval>) => { pendingTimers.delete(handle); cancelInterval(handle); });
  const raf = (cb: FrameRequestCallback) => { frames.set(++frameId, cb); return frameId; };
  const cancelFrame = (id: number) => frames.delete(id);
  replace('window', { matchMedia: () => media, requestAnimationFrame: raf, cancelAnimationFrame: cancelFrame, setTimeout, clearTimeout, setInterval, clearInterval });
  replace('document', doc);
  replace('requestAnimationFrame', raf); replace('cancelAnimationFrame', cancelFrame);
  replace('IntersectionObserver', class { constructor(cb: typeof observers[number]) { observers.push(cb); } observe() {} disconnect() {} });
  const animations: { paused: boolean; cancelled: boolean; rates: number[] }[] = [];
  let running = false;
  function Probe() { running = useDemoAutoplayRunning(); return null; }
  let tree!: ReturnType<typeof create>;
  act(() => {
    tree = create(<DemoAutoplay><Probe /><InteractiveDemo techniqueId={id} /></DemoAutoplay>, { createNodeMock: el => {
      if (el.props.className === 'demo-preview') return { contains: () => false, querySelectorAll: () => [] };
      if (['pd-pendulum', 'pd-inertia-rotor'].includes(el.props.className)) return { animate() {
        const record = { paused: false, cancelled: false, rates: [] as number[] }; animations.push(record);
        return { play() { record.paused = false; }, pause() { record.paused = true; }, cancel() { record.cancelled = true; }, updatePlaybackRate(rate: number) { record.rates.push(rate); } };
      } };
      return null;
    } });
  });
  t.after(() => {
    act(() => tree.unmount());
    assert.equal(frames.size, 0, 'unmount releases all frames');
    assert.equal(pendingTimers.size, 0, 'unmount releases all timers');
    assert.ok(animations.every(animation => animation.cancelled));
    restores.reverse().forEach(restore => restore());
  });
  const frame = () => act(() => { const pending = [...frames.values()]; frames.clear(); pending.forEach(cb => cb(now)); });
  return { tree, frames, pendingTimers, animations,
    get running() { return running; },
    scene() { const json = tree.toJSON(); assert.ok(json && !Array.isArray(json)); return JSON.stringify(json.children); },
    visible(value: boolean) { act(() => observers.forEach(cb => cb([{ isIntersecting: value }]))); },
    hide(value: boolean) { act(() => { doc.hidden = value; visibilityCallbacks.forEach(cb => cb()); }); },
    reduce(value: boolean) { act(() => { media.matches = value; mediaCallbacks.forEach(cb => cb()); }); },
    advance(ms: number) {
      frame(); const end = now + ms;
      while (now < end) { const step = Math.min(40, end - now); now += step; act(() => t.mock.timers.tick(step)); frame(); }
    },
    clickOwn() { const target = tree.root.findAll(node => typeof node.type === 'string' && node.props['data-demo-control'] !== undefined && typeof node.props.onClick === 'function')[0]; act(() => target.props.onClick()); },
  };
}

const ownClocks = [
  ['mg-3d-text-roller', 1500], ['mg-follow-trail', 1500], ['mg-easing-curves', 1700],
  ['mg-radar-sonar-sweep', 400], ['mg-morphing-grid-wave', 300], ['mg-gravity-newton-cradle', 350],
  ['vd-saas-launch-reel', 1700], ['vd-device-3d-spin', 1900], ['vd-app-walkthrough-zoom', 1500],
  ['vd-split-promo-reel', 1400], ['vd-stomp-beat-typo', 800], ['vd-highlight-swipe-reveal', 1700],
  ['vd-countdown-energetic-intro', 900], ['vd-chat-story-sequence', 1400],
  ['vd-animated-bar-race', 2100], ['vd-kpi-counter-explosion', 1000], ['vd-node-flow-pipeline', 1000],
  ['vd-lower-third-banner', 2300], ['vd-diagonal-shutter-wipe', 2700], ['vd-logo-stinger-outro', 1900],
  ['vd-glitch-cut-reel', 1700], ['vd-slot-jackpot-headline', 800], ['vd-funnel-conversion-drop', 1000],
  ['vd-breaking-news-ticker', 2100], ['ly-floating-toc-spy', 1900], ['vd-audio-spectrum-visualizer', 1100],
] as const;

for (const [id, delay] of ownClocks) test(`${id}: starts after visibility, stops without work and resumes`, t => {
  const f = fixture(t, id);
  const changesWithinCycle = () => {
    const before = f.scene();
    for (let elapsed = 0; elapsed < delay * 2 + 1600; elapsed += 40) {
      f.advance(40);
      if (f.scene() !== before) return true;
    }
    return false;
  };
  assert.equal(f.running, false); assert.equal(f.pendingTimers.size, 0);
  f.visible(true); assert.equal(f.running, true);
  assert.ok(changesWithinCycle(), 'own clock starts after initial false → true');
  for (const gate of [f.hide, (hidden: boolean) => f.visible(!hidden), f.reduce]) {
    gate(true); assert.equal(f.running, false);
    const stopped = f.scene(); assert.equal(f.pendingTimers.size, 0); assert.equal(f.frames.size, 0);
    f.advance(delay + 1000); assert.equal(f.scene(), stopped);
    gate(false); assert.equal(f.running, true);
    assert.ok(changesWithinCycle(), 'own clock resumes');
  }
});

for (const id of ['typewriter-streaming', 'scramble-decode-text', 'slot-number-ticker']) test(`${id}: manual replay cannot bypass a later stop`, t => {
  const f = fixture(t, id); f.visible(true); f.advance(5000); f.clickOwn(); f.advance(80);
  for (const gate of [f.reduce, f.hide]) {
    gate(true); const final = f.scene();
    assert.equal(f.frames.size, 0); assert.equal(f.pendingTimers.size, 0);
    f.advance(300); assert.equal(f.scene(), final);
    f.clickOwn(); assert.equal(f.frames.size, 0); assert.equal(f.pendingTimers.size, 0);
    gate(false); f.advance(2000);
  }
});

for (const id of ['marker-highlight-draw', 'vd-circular-ring-dashboard']) test(`${id}: its auxiliary timer is cancelled on stop`, t => {
  const f = fixture(t, id); f.visible(true);
  assert.ok(f.pendingTimers.size > 0);
  f.hide(true); assert.equal(f.pendingTimers.size, 0);
  const stopped = f.scene(); f.advance(3000); assert.equal(f.scene(), stopped);
  f.hide(false); assert.ok(f.pendingTimers.size > 0);
});

test('glitch stop also discards the pending spec swap and delayed glitch exit', t => {
  const f = fixture(t, 'vd-glitch-cut-reel'); f.visible(true); f.advance(1520);
  assert.ok(f.pendingTimers.size > 1);
  f.hide(true); assert.equal(f.pendingTimers.size, 0);
  const stopped = f.scene(); f.advance(500); assert.equal(f.scene(), stopped);
});

test('marker starts its initial draw after visibility and stopped replay creates no timer', t => {
  const f = fixture(t, 'marker-highlight-draw'); f.visible(true);
  const highlight = () => f.tree.root.findAll(node => node.props.style?.backgroundSize)[0].props.style.backgroundSize;
  assert.equal(highlight(), '0% 85%');
  f.advance(200); assert.equal(highlight(), '100% 85%');
  f.hide(true); f.clickOwn(); assert.equal(f.pendingTimers.size, 0);
  assert.equal(highlight(), '100% 85%');
  f.hide(false); assert.equal(highlight(), '0% 85%');
  f.advance(200); assert.equal(highlight(), '100% 85%');
});

test('ring dashboard keeps its 2200/750ms clock across the common four-second step', t => {
  const f = fixture(t, 'vd-circular-ring-dashboard'); f.visible(true);
  const outerRing = () => f.tree.root.findAllByType('circle').find(node => node.props.strokeDasharray === '201')!.props.strokeDashoffset;
  assert.equal(outerRing(), '24');
  f.advance(2200); assert.equal(outerRing(), '201');
  f.advance(760); assert.equal(outerRing(), '24');
  f.advance(1040); assert.equal(outerRing(), '24', 'common four-second phase must not flip the independent clock');
  f.advance(1140); assert.equal(outerRing(), '24');
  f.advance(40); assert.equal(outerRing(), '201');
});

for (const id of ['mg-length-controlled-pendulum', 'mg-angular-momentum-spin']) test(`${id}: reduced motion at mount can be lifted without losing pause or phase`, t => {
  const f = fixture(t, id, true); f.visible(true); assert.equal(f.animations.length, 0);
  f.reduce(false); assert.equal(f.animations.length, 1); assert.equal(f.animations[0].paused, false);
  const animation = f.animations[0];
  for (const gate of [f.hide, (hidden: boolean) => f.visible(!hidden), f.reduce]) {
    gate(true); assert.equal(animation.paused, true); assert.equal(animation.cancelled, false);
    gate(false); assert.equal(animation.paused, false); assert.equal(f.animations.length, 1);
  }
  const button = f.tree.root.findByType('button');
  act(() => button.props.onClick()); assert.equal(animation.paused, true);
  f.hide(true); f.hide(false); assert.equal(animation.paused, true);
  act(() => button.props.onClick()); assert.equal(animation.paused, false);
});

test('horizontal timeline reaches both ends at all audited card widths and restarts', t => {
  const f = fixture(t, 'ly-horizontal-timeline-track'); f.visible(true);
  const track = () => f.tree.root.findAll(node => node.props.className === 'cx-row' && node.props.style?.width === 580)[0];
  const translation = (viewport: number) => {
    const { left = '0%', transform, width } = track().props.style;
    const [, value, unit] = transform.match(/translateX\(([-\d.]+)(%|px)\)/)!;
    return parseFloat(left) / 100 * viewport + Number(value) * (unit === '%' ? width / 100 : 1);
  };
  for (const card of [223, 280, 360]) assert.equal(translation(Math.min(card - 26, 300) - 28), 0);
  f.advance(4000);
  for (const card of [223, 280, 360]) {
    const viewport = Math.min(card - 26, 300) - 28;
    assert.equal(translation(viewport) + track().props.style.width, viewport, `${card}px: right edge fits inner viewport`);
  }
  act(() => f.tree.root.findByProps({ className: 'demo-preview' }).props.onClickCapture({ detail: 1, target: { closest: () => null }, preventDefault() {}, stopPropagation() {} }));
  assert.equal(translation(169), 0);
});

test('dot-grid name reports its selected column in both languages and tracks keyboard/pointer input', () => {
  for (const locale of ['ko', 'en'] as const) {
    let tree!: ReturnType<typeof create>;
    act(() => { tree = create(<LocaleProvider initialLocale={locale}><InteractiveDemo techniqueId="mg-dot-matrix-grid" /></LocaleProvider>); });
    try {
      const control = () => tree.root.findByProps({ role: 'button' });
      assert.match(control().props['aria-label'], locale === 'ko' ? /9열 중 5열/ : /column 5 of 9/);
      act(() => control().props.onKeyDown({ key: 'ArrowRight', preventDefault() {} }));
      assert.match(control().props['aria-label'], locale === 'ko' ? /9열 중 6열/ : /column 6 of 9/);
      const pointer = tree.root.findAll(node => typeof node.props.onMouseMove === 'function')[0];
      act(() => pointer.props.onMouseMove({ clientX: 10, currentTarget: { getBoundingClientRect: () => ({ left: 0, width: 180 }) } }));
      assert.match(control().props['aria-label'], locale === 'ko' ? /9열 중 1열/ : /column 1 of 9/);
    } finally { act(() => tree.unmount()); }
  }
});

test('catalog copy describes the implemented click interactions', () => {
  const board = TECHNIQUES.find(item => item.id === 'mg-marble-board')!;
  const sheet = TECHNIQUES.find(item => item.id === 'ly-bottom-sheet')!;
  assert.doesNotMatch(board.summary, /게이지바 타이밍/);
  for (const locale of ['ko', 'en'] as const) assert.doesNotMatch(getTechniqueText(sheet, locale).title, /드래거블|draggable/i);
});
