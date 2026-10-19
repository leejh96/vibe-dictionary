import assert from 'node:assert/strict';
import test, { type TestContext } from 'node:test';
import React, { useRef } from 'react';
import { act, create } from 'react-test-renderer';
import { useDemoReplay } from '../src/hooks/useDemoReplay';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';

function replace(t: TestContext, name: string, value: unknown) {
  const original = Object.getOwnPropertyDescriptor(globalThis, name);
  Object.defineProperty(globalThis, name, { configurable: true, value });
  t.after(() => {
    if (original) Object.defineProperty(globalThis, name, original);
    else Reflect.deleteProperty(globalThis, name);
  });
}

function fixture(t: TestContext) {
  const drawing = { closest: () => null };
  const control = { closest: () => ({}) };
  let reduced = false;
  let names = 'entrance, loop';
  let states = 'running';
  let live: unknown[] = [];
  const inside = new Set<unknown>([drawing, control]);
  const root = { contains: (target: unknown) => inside.has(target), getAnimations: () => live };
  const toolbar = { closest: () => null };
  replace(t, 'window', { matchMedia: () => ({ matches: reduced }) });
  replace(t, 'getComputedStyle', () => ({ animationName: names, animationPlayState: states }));
  function animation(name = 'entrance', state = 'finished', target = drawing) {
    let seeks = 0;
    let time = 900;
    return { animationName: name, playState: state, effect: { target, pseudoElement: null },
      get currentTime() { return time; }, set currentTime(value: number) { seeks++; time = value; },
      play() { throw Error('Do not override CSS animation-play-state'); }, get seeks() { return seeks; } };
  }
  let handlers!: ReturnType<typeof useDemoReplay>;
  function Probe({ enabled, id }: { enabled: boolean; id: string }) {
    const ref = useRef<HTMLDivElement>(null);
    handlers = useDemoReplay(ref, enabled, id);
    return <div ref={ref} />;
  }
  let tree!: ReturnType<typeof create>;
  const render = (enabled = true, id = 'demo') => {
    act(() => {
      if (tree) tree.update(<Probe enabled={enabled} id={id} />);
      else tree = create(<Probe enabled={enabled} id={id} />, { createNodeMock: () => ({ lastElementChild: root }) });
    });
  };
  t.after(() => { if (tree) act(() => tree.unmount()); });
  return { drawing, control, toolbar, inside, animation, render,
    setLive(value: unknown[]) { live = value; }, setReduced(value: boolean) { reduced = value; }, setNames(value: string) { names = value; },
    setStates(value: string) { states = value; },
    hover() { assert.equal('onPointerEnter' in handlers, false); },
    click(target: unknown = drawing) { handlers.onClick({ target } as never); },
    started() { handlers.onAnimationStartCapture(); } };
}

test('hover leaves animations running and click replays finished animations and loops', t => {
  const f = fixture(t);
  const entrance = f.animation();
  const loop = f.animation('loop', 'running');
  const transition = { currentTime: 250, play() { throw Error('Do not restart CSS transitions'); } };
  f.setLive([entrance, loop, transition]); f.render();
  f.setLive([loop]); // A backwards-only entrance no longer appears in getAnimations().
  f.hover();
  assert.equal(entrance.seeks, 0); assert.equal(loop.seeks, 0);
  f.click();
  assert.equal(entrance.currentTime, 0); assert.equal(entrance.seeks, 1);
  assert.equal(loop.currentTime, 0); assert.equal(loop.seeks, 1);
  f.click(); assert.equal(entrance.seeks, 2); assert.equal(loop.seeks, 2);
  assert.equal(transition.currentTime, 250);
});

test('native controls, toolbar clicks, and touch pointer entry do not trigger an extra replay', t => {
  const f = fixture(t); const animation = f.animation();
  f.setLive([animation]); f.render();
  f.click(f.control); f.click(f.toolbar); f.hover();
  assert.equal(animation.seeks, 0); assert.equal(animation.currentTime, 900);
  f.click(); assert.equal(animation.seeks, 1);
});

test('paused animations, removed animation styles, and reduced motion remain unchanged', t => {
  const f = fixture(t); const paused = f.animation('loop', 'paused'); const finished = f.animation();
  f.setLive([paused, finished]); f.render();
  f.setNames('loop'); f.click(); assert.equal(paused.seeks, 0); assert.equal(finished.seeks, 0);
  f.setNames('entrance, loop'); f.setReduced(true); f.click();
  assert.equal(paused.currentTime, 900); assert.equal(finished.currentTime, 900);
  f.setReduced(false); f.setStates('paused'); f.click();
  assert.equal(finished.currentTime, 900);
});

test('later animation starts are captured and replaced or detached animations are released', t => {
  const f = fixture(t); f.render();
  const old = f.animation(); f.setLive([old]); f.started(); f.setLive([]); f.click();
  assert.equal(old.seeks, 1);
  const next = f.animation(); f.setLive([next]); f.click();
  assert.equal(next.seeks, 1); assert.equal(old.seeks, 1);
  f.inside.delete(f.drawing); f.setLive([]); f.click();
  assert.equal(next.seeks, 1);
});

test('hiding a demo or changing its ID clears previously captured animations', t => {
  const f = fixture(t); const previous = f.animation();
  f.setLive([previous]); f.render(); f.setLive([]); f.render(false); f.click();
  f.render(true, 'other-demo'); f.click(); assert.equal(previous.seeks, 0);
});

test('typing and marker have no hover replay and click cancels older pending runs', t => {
  t.mock.timers.enable({ apis: ['setTimeout', 'setInterval'] });
  let typing!: ReturnType<typeof create>;
  act(() => { typing = create(<InteractiveDemo techniqueId="typewriter-streaming" />); });
  const typeArea = typing.root.findAllByType('div')[0];
  const typed = () => typing.root.findAllByType('div')[1].children.filter(child => typeof child === 'string').join('');
  act(() => t.mock.timers.tick(165)); assert.ok(typed().length > 0);
  assert.equal(typeArea.props.onMouseEnter, undefined);
  act(() => typeArea.props.onClick()); assert.equal(typed(), '');
  act(() => t.mock.timers.tick(55)); assert.equal(typed().length, 1);
  act(() => typing.unmount());

  let scramble!: ReturnType<typeof create>;
  act(() => { scramble = create(<InteractiveDemo techniqueId="scramble-decode-text" />); });
  assert.equal(scramble.root.findAllByType('div')[0].props.onMouseEnter, undefined);
  act(() => scramble.unmount());

  let marker!: ReturnType<typeof create>;
  act(() => { marker = create(<InteractiveDemo techniqueId="marker-highlight-draw" />); });
  const markerArea = marker.root.findAllByType('div')[0];
  const size = () => marker.root.findAllByType('span')[0].props.style.backgroundSize;
  assert.equal(markerArea.props.onMouseEnter, undefined);
  act(() => markerArea.props.onClick());
  act(() => t.mock.timers.tick(100));
  act(() => markerArea.props.onClick());
  act(() => t.mock.timers.tick(100)); assert.equal(size(), '0% 85%');
  act(() => t.mock.timers.tick(20)); assert.equal(size(), '100% 85%');
  act(() => markerArea.props.onClick());
  act(() => marker.unmount());
  act(() => t.mock.timers.tick(200));
});

test('a hover fill design keeps its own enter and leave interaction', () => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId="liquid-slide-fill" />); });
  try {
    const button = tree.root.findByType('button');
    const fill = () => button.findAllByType('span')[1].props.className;
    const initial = fill();
    act(() => button.props.onMouseEnter());
    assert.notEqual(fill(), initial);
    act(() => button.props.onMouseLeave());
    assert.equal(fill(), initial);
  } finally { act(() => tree.unmount()); }
});
