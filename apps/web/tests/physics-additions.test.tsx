import { COLLECTION_IDS } from './helpers/collection';
import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { TECHNIQUES, matchesSearch } from '@vibe-dictionary/catalog';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';
import { DampedSpringDemo } from '../src/components/demos/physics/DampedSpringDemo';
import { ProjectileArcDemo } from '../src/components/demos/physics/ProjectileArcDemo';
import { PendulumPeriodDemo } from '../src/components/demos/physics/PendulumPeriodDemo';
import { RestitutionBounceDemo } from '../src/components/demos/physics/RestitutionBounceDemo';
import { FrictionSlideDemo } from '../src/components/demos/physics/FrictionSlideDemo';
import { ElasticCollisionDemo } from '../src/components/demos/physics/ElasticCollisionDemo';
import { RollingWheelDemo } from '../src/components/demos/physics/RollingWheelDemo';
import { VariableInertiaDemo } from '../src/components/demos/physics/VariableInertiaDemo';
import { PulleyConstraintDemo } from '../src/components/demos/physics/PulleyConstraintDemo';
import { WaveSuperpositionDemo } from '../src/components/demos/physics/WaveSuperpositionDemo';

test('wave superposition adds displacement at every point and switches between constructive and destructive phases', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><WaveSuperpositionDemo /><WaveSuperpositionDemo /></>); });
  t.after(() => act(() => tree.unmount()));
  const inputs = tree.root.findAllByType('input');
  const scenes = tree.root.findAllByType('svg');
  const components = tree.root.findAllByProps({ className: 'pd-wave-component' });
  const sums = tree.root.findAllByProps({ className: 'pd-wave-sum' });
  const originalFirst = components[0].props.d;
  const originalOther = sums[1].props.d;
  const points = (path: string) => [...path.matchAll(/[ML]([\d.]+) ([\d.]+)/g)].map(match => ({ x: Number(match[1]), y: Number(match[2]) }));
  assert.notEqual(scenes[0].props.id, scenes[1].props.id);
  scenes.forEach((scene, i) => assert.equal(inputs[i].props['aria-controls'], scene.props.id));
  for (const [phase, amplitude, firstSecondDisplacement] of [[0, 16, 0], [90, 8 * Math.SQRT2, 8], [180, 0, 0], [270, 8 * Math.SQRT2, -8], [360, 16, 0]]) {
    act(() => inputs[0].props.onChange({ currentTarget: { value: String(phase) } }));
    const first = points(components[0].props.d);
    const second = points(components[1].props.d);
    const sum = points(sums[0].props.d);
    assert.equal(first.length, 97);
    assert.equal(second.length, 97);
    assert.equal(sum.length, 97);
    first.forEach((a, i) => {
      const b = second[i];
      const total = sum[i];
      assert.equal(a.x, b.x);
      assert.equal(a.x, total.x);
      assert.ok(a.x >= 16 && a.x <= 248 && total.y >= 96 && total.y <= 128);
      assert.ok(Math.abs((112 - total.y) - (28 - a.y) - (64 - b.y)) < 1e-8, 'the result must equal both displacements added at the same position');
    });
    assert.ok(Math.abs(Math.max(...sum.map(point => Math.abs(112 - point.y))) - amplitude) < 1e-8);
    assert.ok(Math.abs(64 - second[0].y - firstSecondDisplacement) < 1e-8, 'quarter phases must shift the second wave in the correct direction');
    assert.equal(inputs[0].props['aria-valuetext'], `${phase}도`);
    assert.equal(components[0].props.d, originalFirst);
    assert.equal(sums[1].props.d, originalOther);
    assert.equal(inputs[1].props.value, 0);
  }
  assert.equal(tree.root.findAllByType('input')[0], inputs[0]);
  assert.equal(tree.root.findAllByProps({ className: 'pd-wave-component' })[1], components[1]);
  assert.equal(tree.root.findAllByProps({ className: 'pd-wave-sum' })[0], sums[0]);
});

test('pulley keeps rope length and no-slip rotation while moving loads in opposite directions', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><PulleyConstraintDemo /><PulleyConstraintDemo /></>); });
  t.after(() => act(() => tree.unmount()));
  const inputs = tree.root.findAllByType('input');
  const scenes = tree.root.findAllByType('svg');
  const wheels = tree.root.findAllByProps({ className: 'pd-pulley-wheel' });
  const ropes = tree.root.findAllByProps({ className: 'pd-pulley-rope' });
  const loads = tree.root.findAllByProps({ className: 'pd-pulley-loads' });
  const blocks = loads[0].findAllByType('rect');
  assert.notEqual(scenes[0].props.id, scenes[1].props.id);
  scenes.forEach((scene, i) => assert.equal(inputs[i].props['aria-controls'], scene.props.id));
  assert.equal(wheels[0].props.style.transform, 'rotate(0deg)');
  for (const value of [-24, -12, 0, 12, 24]) {
    act(() => inputs[0].props.onChange({ currentTarget: { value: String(value) } }));
    const [left, right] = blocks.map(block => block.props.y);
    const ends = ropes[0].props.d.match(/^M([\d.]+) ([\d.]+)V32A24 24 0 0 1 ([\d.]+) 32V([\d.]+)$/);
    assert.ok(ends);
    assert.equal(Number(ends[1]), blocks[0].props.x + blocks[0].props.width / 2);
    assert.equal(Number(ends[3]), blocks[1].props.x + blocks[1].props.width / 2);
    assert.equal(Number(ends[2]), left);
    assert.equal(Number(ends[4]), right);
    assert.ok(Math.abs(Number(ends[2]) - 32 + Number(ends[4]) - 32 + Math.PI * 24 - (120 + 24 * Math.PI)) < 1e-8, 'the complete rope length must remain constant');
    const angle = Number(wheels[0].props.style.transform.slice(7, -4)) * Math.PI / 180;
    assert.ok(Math.abs(24 * angle - (right - 92)) < 1e-8, 'right downward travel must equal the clockwise rim arc length');
    assert.equal(right - 92, value);
    assert.ok(blocks.every(block => block.props.y >= 68 && block.props.y + block.props.height <= 132));
    assert.ok(Math.min(left, right) > 32 + 23, 'loads must stay clear of the wheel');
    assert.equal(ropes[1].props.d, 'M108 92V32A24 24 0 0 1 156 32V92');
    assert.equal(wheels[1].props.style.transform, 'rotate(0deg)');
  }
  assert.equal(tree.root.findAllByType('input')[0], inputs[0]);
  assert.equal(tree.root.findAllByProps({ className: 'pd-pulley-wheel' })[0], wheels[0]);
  assert.equal(tree.root.findAllByProps({ className: 'pd-pulley-rope' })[0], ropes[0]);
  assert.equal(loads[0].findAllByType('rect')[0], blocks[0]);
});

for (const mode of ['animated', 'reduced-motion', 'unsupported-api']) test(`inertia ${mode} preserves angular momentum on the same animation and keeps pause across changes`, t => {
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
  Object.defineProperty(globalThis, 'window', { configurable: true, value: { matchMedia: () => ({ matches: mode === 'reduced-motion' }) } });
  const animations: { frames: { transform: string }[]; options: { duration: number; iterations: number; easing: string }; rates: number[]; canceled: boolean; paused: boolean }[] = [];
  let tree!: ReturnType<typeof create>;
  t.after(() => {
    act(() => tree.unmount());
    if (originalWindow) Object.defineProperty(globalThis, 'window', originalWindow); else Reflect.deleteProperty(globalThis, 'window');
    assert.ok(animations.every(animation => animation.canceled));
  });
  act(() => { tree = create(<><VariableInertiaDemo /><VariableInertiaDemo /></>, { createNodeMock: element => element.props.className === 'pd-inertia-rotor' ? {
    animate: mode === 'unsupported-api' ? undefined : (frames: { transform: string }[], options: { duration: number; iterations: number; easing: string }) => {
      const animation = { frames, options, rates: [] as number[], canceled: false, paused: false };
      animations.push(animation);
      return { cancel: () => { animation.canceled = true; }, updatePlaybackRate: (rate: number) => { animation.rates.push(rate); }, play: () => { animation.paused = false; }, pause: () => { animation.paused = true; } };
    },
  } : null }); });
  const inputs = tree.root.findAllByType('input');
  const buttons = tree.root.findAllByType('button');
  const rotors = tree.root.findAllByProps({ className: 'pd-inertia-rotor' });
  const weights = rotors[0].findAllByProps({ className: 'pd-inertia-weight' });
  const scenes = tree.root.findAllByType('svg').filter(svg => svg.props.role === 'img');
  assert.notEqual(scenes[0].props.id, scenes[1].props.id);
  scenes.forEach((scene, i) => { assert.equal(inputs[i].props['aria-controls'], scene.props.id); assert.equal(buttons[i].props['aria-controls'], scene.props.id); });
  assert.equal(animations.length, mode === 'animated' ? 2 : 0);
  const first = animations[0];
  if (first) {
    assert.deepEqual(first.frames.map(frame => frame.transform), ['rotate(0deg)', 'rotate(360deg)']);
    assert.equal(first.options.duration, 4000);
    assert.equal(first.options.iterations, Infinity);
    assert.equal(first.options.easing, 'linear');
    assert.deepEqual(first.rates, [1]);
  }
  const rates: number[] = [];
  for (const radius of [20, 32, 44]) {
    act(() => inputs[0].props.onChange({ currentTarget: { value: String(radius) } }));
    assert.equal(weights[0].props.cx, -radius);
    assert.equal(weights[1].props.cx, radius);
    assert.equal(rotors[0].findByType('path').props.d, `M${-radius} 0H${radius}`);
    assert.ok(radius - weights[0].props.r > rotors[0].findByProps({ className: 'pd-inertia-hub' }).props.r, 'weights must not intersect the central hub');
    assert.ok(72 - radius - 8 > 0 && 72 + radius + 8 < 144, 'the entire rotating envelope must stay inside the scene');
    assert.equal(rotors[1].findByType('path').props.d, 'M-32 0H32');
    if (first) {
      const rate = first.rates.at(-1)!;
      rates.push(rate);
      assert.ok(Math.abs((200 + 2 * radius * radius) * rate - 2248) < 1e-8, 'I times the angular speed multiplier must stay constant');
      assert.equal(animations.length, 2, 'radius changes must update the existing animation instead of restarting it');
      assert.equal(first.canceled, false);
      assert.deepEqual(animations[1].rates, [1]);
    }
  }
  if (first) assert.ok(rates[0] > rates[1] && rates[1] > rates[2]);
  act(() => buttons[0].props.onClick());
  assert.equal(buttons[0].props['aria-label'], '추 회전 재생');
  act(() => inputs[0].props.onChange({ currentTarget: { value: '20' } }));
  assert.equal(buttons[0].props['aria-label'], '추 회전 재생');
  if (first) { assert.equal(first.paused, true); assert.equal(animations[1].paused, false); assert.equal(first.canceled, false); }
  act(() => buttons[0].props.onClick());
  assert.equal(buttons[0].props['aria-label'], '추 회전 일시정지');
  if (first) { assert.equal(first.paused, false); assert.equal(animations.length, 2); }
  assert.equal(tree.root.findAllByType('input')[0], inputs[0]);
  assert.equal(tree.root.findAllByType('button')[0], buttons[0]);
  assert.equal(tree.root.findAllByProps({ className: 'pd-inertia-rotor' })[0], rotors[0]);
  assert.equal(rotors[0].findAllByProps({ className: 'pd-inertia-weight' })[0], weights[0]);
});

for (const mode of ['animated', 'reduced-motion', 'unsupported-api']) test(`rolling ${mode} couples distance and angle without slip, resets radius and cleans up`, t => {
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
  Object.defineProperty(globalThis, 'window', { configurable: true, value: { matchMedia: () => ({ matches: mode === 'reduced-motion' }) } });
  const animations: { frames: { transform: string }[]; options: { duration: number; easing: string }; canceled: boolean }[] = [];
  let tree!: ReturnType<typeof create>;
  t.after(() => {
    act(() => tree.unmount());
    if (originalWindow) Object.defineProperty(globalThis, 'window', originalWindow); else Reflect.deleteProperty(globalThis, 'window');
    assert.ok(animations.every(animation => animation.canceled));
  });
  act(() => { tree = create(<><RollingWheelDemo /><RollingWheelDemo /></>, { createNodeMock: element => element.type === 'g' ? {
    animate: mode === 'unsupported-api' ? undefined : (frames: { transform: string }[], options: { duration: number; easing: string }) => {
      const animation = { frames, options, canceled: false };
      animations.push(animation);
      return { cancel: () => { animation.canceled = true; } };
    },
  } : null }); });
  const inputs = tree.root.findAllByType('input');
  const buttons = tree.root.findAllByType('button');
  const travel = tree.root.findAllByProps({ className: 'pd-rolling-travel' });
  const wheels = tree.root.findAllByProps({ className: 'pd-rolling-wheel' });
  const scenes = tree.root.findAllByType('svg').filter(svg => svg.props.role === 'img');
  assert.equal(animations.length, 0);
  assert.notEqual(scenes[0].props.id, scenes[1].props.id);
  scenes.forEach((scene, i) => { assert.equal(inputs[i].props['aria-controls'], scene.props.id); assert.equal(buttons[i].props['aria-controls'], scene.props.id); });
  const angles: number[] = [];
  for (const radius of [16, 22, 28]) {
    act(() => inputs[0].props.onChange({ currentTarget: { value: String(radius) } }));
    assert.equal(travel[0].props.style.transform, 'translateX(0px)');
    assert.equal(wheels[0].props.style.transform, 'rotate(0deg)');
    assert.ok(animations.every(animation => animation.canceled));
    const center = wheels[0].parent!.props.transform.match(/translate\((\d+) (\d+)\)/);
    const rim = wheels[0].findByProps({ className: 'pd-wheel-rim' });
    assert.equal(Number(center[2]) + rim.props.r + 1, 112, 'the outer stroked rim must remain tangent to the ground');
    assert.ok(Number(center[1]) - radius >= 20 && Number(center[1]) + 168 + radius <= 244);
    const before = animations.length;
    act(() => buttons[0].props.onClick());
    assert.equal(animations.length, before + (mode === 'animated' ? 2 : 0));
    assert.equal(travel[0].props.style.transform, 'translateX(168px)');
    const degrees = Number(wheels[0].props.style.transform.slice(7, -4));
    angles.push(degrees);
    assert.ok(Math.abs(radius * degrees * Math.PI / 180 - 168) < 1e-8, 'rotation arc length must match the traveled distance in every mode');
    assert.equal(travel[1].props.style.transform, 'translateX(0px)');
    assert.equal(wheels[1].props.style.transform, 'rotate(0deg)');
    if (mode === 'animated') {
      const [translation, rotation] = animations.slice(-2);
      assert.equal(translation.options.duration, 2000);
      assert.deepEqual(translation.options, rotation.options);
      assert.equal(translation.options.easing, 'linear');
      assert.deepEqual(translation.frames.map(frame => frame.transform), ['translateX(0px)', 'translateX(168px)']);
      assert.equal(rotation.frames[0].transform, 'rotate(0deg)');
      assert.equal(rotation.frames[1].transform, wheels[0].props.style.transform);
      const angularSpeed = degrees * Math.PI / 180 / (rotation.options.duration / 1000);
      assert.ok(Math.abs(84 - radius * angularSpeed) < 1e-8, 'the rim contact point must have zero ground-relative velocity');
    }
  }
  assert.ok(angles[0] > angles[1] && angles[1] > angles[2] && angles[0] > 360 && angles[2] < 360);
  const previous = animations.slice(-2);
  act(() => buttons[0].props.onClick());
  assert.ok(previous.every(animation => animation.canceled));
  assert.equal(tree.root.findAllByType('input')[0], inputs[0]);
  assert.equal(tree.root.findAllByType('button')[0], buttons[0]);
  assert.equal(tree.root.findAllByProps({ className: 'pd-rolling-travel' })[0], travel[0]);
  assert.equal(tree.root.findAllByProps({ className: 'pd-rolling-wheel' })[0], wheels[0]);
});

for (const mode of ['animated', 'reduced-motion', 'unsupported-api']) test(`collision ${mode} conserves momentum and energy, contacts edges and isolates cleanup`, t => {
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
  Object.defineProperty(globalThis, 'window', { configurable: true, value: { matchMedia: () => ({ matches: mode === 'reduced-motion' }) } });
  const animations: { target: string; frames: { offset: number; transform: string }[]; options: { duration: number }; canceled: boolean }[] = [];
  let tree!: ReturnType<typeof create>;
  t.after(() => {
    act(() => tree.unmount());
    if (originalWindow) Object.defineProperty(globalThis, 'window', originalWindow); else Reflect.deleteProperty(globalThis, 'window');
    assert.ok(animations.every(animation => animation.canceled));
  });
  act(() => { tree = create(<><ElasticCollisionDemo /><ElasticCollisionDemo /></>, { createNodeMock: element => element.type === 'g' ? {
    animate: mode === 'unsupported-api' ? undefined : (frames: { offset: number; transform: string }[], options: { duration: number }) => {
      const animation = { target: element.props.className, frames, options, canceled: false };
      animations.push(animation);
      return { cancel: () => { animation.canceled = true; } };
    },
  } : null }); });
  const inputs = tree.root.findAllByType('input');
  const buttons = tree.root.findAllByType('button');
  const first = tree.root.findAllByProps({ className: 'pd-collision-first' });
  const second = tree.root.findAllByProps({ className: 'pd-collision-target' });
  const scenes = tree.root.findAllByType('svg').filter(svg => svg.props.role === 'img');
  assert.equal(animations.length, 0);
  assert.notEqual(scenes[0].props.id, scenes[1].props.id);
  scenes.forEach((scene, i) => { assert.equal(inputs[i].props['aria-controls'], scene.props.id); assert.equal(buttons[i].props['aria-controls'], scene.props.id); });
  const speeds: number[] = [];
  for (const [value, expectedFirst, expectedSecond] of [[50, 114, 64], [100, 92, 48], [300, 44, 24]]) {
    act(() => inputs[0].props.onChange({ currentTarget: { value: String(value) } }));
    assert.equal(first[0].props.style.transform, 'translateX(0px)');
    assert.equal(second[0].props.style.transform, 'translateX(0px)');
    assert.ok(animations.every(animation => animation.canceled));
    const before = animations.length;
    act(() => buttons[0].props.onClick());
    assert.equal(animations.length, before + (mode === 'animated' ? 2 : 0));
    assert.equal(first[0].props.style.transform, `translateX(${expectedFirst}px)`);
    assert.equal(second[0].props.style.transform, `translateX(${expectedSecond}px)`);
    assert.equal(first[1].props.style.transform, 'translateX(0px)');
    assert.equal(second[1].props.style.transform, 'translateX(0px)');
    const target = second[0].findByType('rect').props;
    if (mode === 'animated') {
      const [a, b] = animations.slice(-2);
      assert.equal(a.options.duration, b.options.duration);
      assert.deepEqual(a.frames.map(frame => frame.offset), b.frames.map(frame => frame.offset));
      const x1 = a.frames.map(frame => Number(frame.transform.slice(11, -3)));
      const x2 = b.frames.map(frame => Number(frame.transform.slice(11, -3)));
      const seconds = a.options.duration / 1000;
      const impactTime = seconds * a.frames[1].offset;
      const afterTime = seconds - impactTime;
      const v1 = (x1[2] - x1[1]) / afterTime;
      const v2 = (x2[2] - x2[1]) / afterTime;
      const ratio = value / 100;
      speeds.push(v1);
      assert.ok(Math.abs(x1[1] / impactTime - 120) < 1e-8);
      assert.equal(x2[1], 0);
      assert.ok(Math.abs(28 + x1[1] + 24 - target.x) < 1e-8, 'the first right edge must meet the target left edge at impact');
      assert.ok(Math.abs(v1 + ratio * v2 - 120) < 1e-8, 'linear momentum must be conserved');
      assert.ok(Math.abs(v1 ** 2 + ratio * v2 ** 2 - 120 ** 2) < 1e-8, 'kinetic energy must be conserved');
      for (let i = 0; i < 3; i++) {
        assert.ok(28 + x1[i] >= 24 && 28 + x1[i] + 24 <= target.x + x2[i] + 1e-8);
        assert.ok(target.x + x2[i] + target.width <= 244);
      }
      assert.equal(first[0].props.style.transform, a.frames[2].transform);
      assert.equal(second[0].props.style.transform, b.frames[2].transform);
    }
  }
  if (mode === 'animated') assert.ok(speeds[0] > 0 && Math.abs(speeds[1]) < 1e-8 && speeds[2] < 0);
  const previous = animations.slice(-2);
  act(() => buttons[0].props.onClick());
  assert.ok(previous.every(animation => animation.canceled));
  assert.equal(tree.root.findAllByType('input')[0], inputs[0]);
  assert.equal(tree.root.findAllByType('button')[0], buttons[0]);
  assert.equal(tree.root.findAllByProps({ className: 'pd-collision-first' })[0], first[0]);
  assert.equal(tree.root.findAllByProps({ className: 'pd-collision-target' })[0], second[0]);
});

for (const mode of ['animated', 'reduced-motion', 'unsupported-api']) test(`friction ${mode} decelerates to its marked stop, resets changes and cancels playback`, t => {
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
  Object.defineProperty(globalThis, 'window', { configurable: true, value: { matchMedia: () => ({ matches: mode === 'reduced-motion' }) } });
  const animations: { frames: { offset: number; transform: string }[]; options: { duration: number }; canceled: boolean }[] = [];
  let tree!: ReturnType<typeof create>;
  t.after(() => {
    act(() => tree.unmount());
    if (originalWindow) Object.defineProperty(globalThis, 'window', originalWindow); else Reflect.deleteProperty(globalThis, 'window');
    assert.ok(animations.every(animation => animation.canceled));
  });
  act(() => { tree = create(<><FrictionSlideDemo /><FrictionSlideDemo /></>, { createNodeMock: element => element.props.className === 'pd-friction-mass' ? {
    animate: mode === 'unsupported-api' ? undefined : (frames: { offset: number; transform: string }[], options: { duration: number }) => {
      const animation = { frames, options, canceled: false };
      animations.push(animation);
      return { cancel: () => { animation.canceled = true; } };
    },
  } : null }); });
  const inputs = tree.root.findAllByType('input');
  const buttons = tree.root.findAllByType('button');
  const masses = tree.root.findAllByProps({ className: 'pd-friction-mass' });
  const scenes = tree.root.findAllByType('svg').filter(svg => svg.props.role === 'img');
  assert.equal(animations.length, 0);
  assert.notEqual(scenes[0].props.id, scenes[1].props.id);
  scenes.forEach((scene, i) => { assert.equal(inputs[i].props['aria-controls'], scene.props.id); assert.equal(buttons[i].props['aria-controls'], scene.props.id); });
  const distances: number[] = [];
  const durations: number[] = [];
  for (const coefficient of [20, 50, 80]) {
    act(() => inputs[0].props.onChange({ currentTarget: { value: String(coefficient) } }));
    assert.equal(masses[0].props.style.transform, 'translateX(0px)');
    assert.ok(animations.every(animation => animation.canceled));
    const before = animations.length;
    act(() => buttons[0].props.onClick());
    assert.equal(animations.length, before + (mode === 'animated' ? 1 : 0));
    assert.equal(masses[1].props.style.transform, 'translateX(0px)');
    const distance = Number(masses[0].props.style.transform.slice(11, -3));
    distances.push(distance);
    assert.ok(Math.abs(distance * coefficient / 100 - 32.4) < 1e-8, 'work against friction must dissipate the same initial energy');
    const marker = scenes[0].findByProps({ className: 'pd-equilibrium' }).props.d.match(/M([^ ]+)/)[1];
    assert.ok(Math.abs(Number(marker) - 40 - distance) < 1e-8);
    if (mode === 'animated') {
      const animation = animations.at(-1)!;
      durations.push(animation.options.duration);
      const xs = animation.frames.map(frame => Number(frame.transform.slice(11, -3)));
      const increments = xs.slice(1).map((x, i) => x - xs[i]);
      assert.equal(xs.length, 41);
      assert.equal(xs[0], 0);
      assert.ok(Math.abs(xs.at(-1)! - distance) < 1e-8);
      assert.ok(xs.every(x => x >= 0 && x <= 162 + 1e-8));
      assert.ok(increments.every((step, i) => step > 0 && (!i || step < increments[i - 1])), 'speed must decrease without reversing direction');
      assert.ok(Math.abs(increments.at(-1)! / increments[0] - 1 / 79) < 1e-8, 'the last sampled velocity should approach zero');
      assert.ok(Math.abs(animation.options.duration / 1000 * coefficient / 100 - .36) < 1e-8);
      for (let i = 2; i < xs.length; i++) assert.ok(Math.abs(xs[i] - 2 * xs[i - 1] + xs[i - 2] + coefficient / 100 * 500 * (animation.options.duration / 1000 / 40) ** 2) < 1e-8);
    }
  }
  assert.ok(distances[0] > distances[1] && distances[1] > distances[2]);
  if (mode === 'animated') assert.ok(durations[0] > durations[1] && durations[1] > durations[2]);
  const previous = animations.at(-1);
  act(() => buttons[0].props.onClick());
  if (previous) assert.equal(previous.canceled, true);
  assert.equal(tree.root.findAllByType('input')[0], inputs[0]);
  assert.equal(tree.root.findAllByType('button')[0], buttons[0]);
  assert.equal(tree.root.findAllByProps({ className: 'pd-friction-mass' })[0], masses[0]);
});

for (const mode of ['animated', 'reduced-motion', 'unsupported-api']) test(`bounce ${mode} loses rebound height by restitution squared and settles with cleanup`, t => {
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
  Object.defineProperty(globalThis, 'window', { configurable: true, value: { matchMedia: () => ({ matches: mode === 'reduced-motion' }) } });
  const animations: { frames: { offset: number; transform: string }[]; options: { duration: number }; canceled: boolean }[] = [];
  let tree!: ReturnType<typeof create>;
  t.after(() => {
    act(() => tree.unmount());
    if (originalWindow) Object.defineProperty(globalThis, 'window', originalWindow); else Reflect.deleteProperty(globalThis, 'window');
    assert.ok(animations.every(animation => animation.canceled));
  });
  act(() => { tree = create(<><RestitutionBounceDemo /><RestitutionBounceDemo /></>, { createNodeMock: element => element.props.className === 'pd-bounce-ball' ? {
    animate: mode === 'unsupported-api' ? undefined : (frames: { offset: number; transform: string }[], options: { duration: number }) => {
      const animation = { frames, options, canceled: false };
      animations.push(animation);
      return { cancel: () => { animation.canceled = true; } };
    },
  } : null }); });
  const inputs = tree.root.findAllByType('input');
  const buttons = tree.root.findAllByType('button');
  const balls = tree.root.findAllByProps({ className: 'pd-bounce-ball' });
  const scenes = tree.root.findAllByType('svg').filter(svg => svg.props.role === 'img');
  assert.equal(animations.length, 0);
  assert.notEqual(scenes[0].props.id, scenes[1].props.id);
  scenes.forEach((scene, i) => { assert.equal(inputs[i].props['aria-controls'], scene.props.id); assert.equal(buttons[i].props['aria-controls'], scene.props.id); });
  const durations: number[] = [];
  for (const value of [35, 65, 85]) {
    act(() => inputs[0].props.onChange({ currentTarget: { value: String(value) } }));
    assert.equal(balls[0].props.style.transform, 'translateY(0px)');
    assert.ok(animations.every(animation => animation.canceled));
    assert.equal(inputs[0].props['aria-valuetext'], String(value / 100));
    const before = animations.length;
    act(() => buttons[0].props.onClick());
    assert.equal(animations.length, before + (mode === 'animated' ? 1 : 0));
    assert.equal(balls[0].props.style.transform, 'translateY(80px)');
    assert.equal(balls[1].props.style.transform, 'translateY(0px)');
    if (mode === 'animated') {
      const animation = animations.at(-1)!;
      durations.push(animation.options.duration);
      const ys = animation.frames.map(frame => Number(frame.transform.slice(11, -3)));
      assert.equal(ys[0], 0);
      assert.equal(ys.at(-1), 80);
      assert.ok(ys.every(y => Number.isFinite(y) && y >= 0 && y <= 80));
      assert.equal(animation.frames[0].offset, 0);
      assert.equal(animation.frames.at(-1)!.offset, 1);
      assert.ok(animation.frames.every((frame, i) => !i || frame.offset > animation.frames[i - 1].offset));
      let height = 80;
      let previousDuration = Infinity;
      for (let start = 12; start < ys.length - 1; start += 12) {
        const peak = 80 - ys[start + 6];
        assert.ok(Math.abs(peak / height - (value / 100) ** 2) < 1e-8, 'each rebound height must lose the square of its speed ratio');
        assert.ok(peak >= .5);
        assert.equal(ys[start + 12], 80);
        const duration = animation.frames[start + 12].offset - animation.frames[start].offset;
        assert.ok(duration < previousDuration, 'successive rebound flight times must shrink');
        previousDuration = duration;
        height = peak;
      }
      assert.ok(height * (value / 100) ** 2 < .5, 'playback must stop before the next imperceptible bounce');
    }
  }
  if (mode === 'animated') assert.ok(durations[0] < durations[1] && durations[1] < durations[2]);
  const previous = animations.at(-1);
  act(() => buttons[0].props.onClick());
  if (previous) assert.equal(previous.canceled, true);
  assert.equal(tree.root.findAllByType('input')[0], inputs[0]);
  assert.equal(tree.root.findAllByType('button')[0], buttons[0]);
  assert.equal(tree.root.findAllByProps({ className: 'pd-bounce-ball' })[0], balls[0]);
});

for (const mode of ['animated', 'reduced-motion', 'unsupported-api']) test(`pendulum ${mode} changes its length-dependent period, preserves pause and cleans up`, t => {
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
  Object.defineProperty(globalThis, 'window', { configurable: true, value: { matchMedia: () => ({ matches: mode === 'reduced-motion' }) } });
  const animations: { frames: { offset: number; transform: string }[]; options: { duration: number; iterations: number }; canceled: boolean; paused: boolean }[] = [];
  let tree!: ReturnType<typeof create>;
  t.after(() => {
    act(() => tree.unmount());
    if (originalWindow) Object.defineProperty(globalThis, 'window', originalWindow); else Reflect.deleteProperty(globalThis, 'window');
    assert.ok(animations.every(animation => animation.canceled));
  });
  act(() => { tree = create(<><PendulumPeriodDemo /><PendulumPeriodDemo /></>, { createNodeMock: element => element.props.className === 'pd-pendulum' ? {
    animate: mode === 'unsupported-api' ? undefined : (frames: { offset: number; transform: string }[], options: { duration: number; iterations: number }) => {
      const animation = { frames, options, canceled: false, paused: false };
      animations.push(animation);
      return { cancel: () => { animation.canceled = true; }, play: () => { animation.paused = false; }, pause: () => { animation.paused = true; } };
    },
  } : null }); });
  const inputs = tree.root.findAllByType('input');
  const buttons = tree.root.findAllByType('button');
  const groups = tree.root.findAllByProps({ className: 'pd-pendulum' });
  const scenes = tree.root.findAllByType('svg').filter(svg => svg.props.role === 'img');
  assert.notEqual(scenes[0].props.id, scenes[1].props.id);
  scenes.forEach((scene, i) => { assert.equal(inputs[i].props['aria-controls'], scene.props.id); assert.equal(buttons[i].props['aria-controls'], scene.props.id); });
  assert.equal(animations.length, mode === 'animated' ? 2 : 0);
  const first = animations[0];
  if (first) {
    assert.equal(first.options.iterations, Infinity);
    const angles = first.frames.map(frame => Number(frame.transform.slice(7, -4)));
    assert.ok(Math.abs(angles[0] - 14) < 1e-8 && Math.abs(angles[30] + 14) < 1e-8 && Math.abs(angles[60] - 14) < 1e-8);
    assert.ok(angles.slice(0, 31).every((angle, i) => i === 0 || angle <= angles[i - 1]));
  }
  act(() => buttons[0].props.onClick());
  assert.equal(buttons[0].props['aria-label'], '진자 재생');
  if (first) { assert.equal(first.paused, true); assert.equal(animations[1].paused, false); }
  act(() => buttons[0].props.onClick());
  if (first) { assert.equal(first.paused, false); assert.equal(animations.length, 2); }
  act(() => buttons[0].props.onClick());
  const periods: number[] = [];
  let active = first;
  for (const length of [40, 88]) {
    const previous = active;
    act(() => inputs[0].props.onChange({ currentTarget: { value: String(length) } }));
    assert.equal(groups[0].findByType('path').props.d, `M132 24V${24 + length}`);
    assert.equal(groups[1].findByType('path').props.d, 'M132 24V88');
    assert.equal(buttons[0].props['aria-label'], '진자 재생');
    if (mode === 'animated') {
      const current = animations.at(-1)!;
      periods.push(current.options.duration);
      assert.equal(current.paused, true, 'length changes must keep the paused state');
      assert.equal(previous.canceled, true);
      assert.ok(Math.abs(500 * (current.options.duration / 1000 / (2 * Math.PI)) ** 2 - length) < 1e-8);
      active = current;
    }
  }
  if (mode === 'animated') assert.ok(periods[1] > periods[0]);
  assert.equal(tree.root.findAllByType('input')[0], inputs[0]);
  assert.equal(tree.root.findAllByType('button')[0], buttons[0]);
  assert.equal(tree.root.findAllByProps({ className: 'pd-pendulum' })[0], groups[0]);
});

for (const mode of ['animated', 'reduced-motion', 'unsupported-api']) test(`projectile ${mode} keeps ballistic motion, resets angle changes and cleans up playback`, t => {
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
  Object.defineProperty(globalThis, 'window', { configurable: true, value: { matchMedia: () => ({ matches: mode === 'reduced-motion' }) } });
  const animations: { frames: { offset: number; transform: string }[]; options: { duration: number }; canceled: boolean }[] = [];
  let tree!: ReturnType<typeof create>;
  t.after(() => {
    act(() => tree.unmount());
    if (originalWindow) Object.defineProperty(globalThis, 'window', originalWindow); else Reflect.deleteProperty(globalThis, 'window');
    assert.ok(animations.every(animation => animation.canceled));
  });
  act(() => { tree = create(<><ProjectileArcDemo /><ProjectileArcDemo /></>, { createNodeMock: element => element.props.className === 'pd-projectile' ? {
    animate: mode === 'unsupported-api' ? undefined : (frames: { offset: number; transform: string }[], options: { duration: number }) => {
      const animation = { frames, options, canceled: false };
      animations.push(animation);
      return { cancel: () => { animation.canceled = true; } };
    },
  } : null }); });
  const inputs = tree.root.findAllByType('input');
  const buttons = tree.root.findAllByType('button');
  const balls = tree.root.findAllByProps({ className: 'pd-projectile' });
  const scenes = tree.root.findAllByType('svg').filter(svg => svg.props.role === 'img');
  assert.equal(animations.length, 0);
  assert.notEqual(scenes[0].props.id, scenes[1].props.id);
  scenes.forEach((scene, i) => { assert.equal(inputs[i].props['aria-controls'], scene.props.id); assert.equal(buttons[i].props['aria-controls'], scene.props.id); });
  const ranges: number[] = [];
  const durations: number[] = [];
  for (const angle of [25, 45, 65]) {
    act(() => inputs[0].props.onChange({ currentTarget: { value: String(angle) } }));
    assert.equal(balls[0].props.style.transform, 'translate(0px, 0px)');
    assert.ok(animations.every(animation => animation.canceled), 'changing the angle must cancel the previous flight');
    const before = animations.length;
    act(() => buttons[0].props.onClick());
    assert.equal(animations.length, before + (mode === 'animated' ? 1 : 0));
    assert.equal(balls[1].props.style.transform, 'translate(0px, 0px)');
    const range = Number(balls[0].props.style.transform.match(/translate\(([^p]+)/)[1]);
    ranges.push(range);
    if (mode === 'animated') {
      const animation = animations.at(-1)!;
      const positions = animation.frames.map(frame => frame.transform.match(/-?[\d.]+(?:e[-+]?\d+)?/g)!.map(Number));
      durations.push(animation.options.duration);
      assert.equal(positions.length, 41);
      assert.deepEqual(positions[0], [0, 0]);
      assert.ok(Math.abs(positions.at(-1)![0] - range) < 1e-8);
      assert.equal(positions.at(-1)![1], 0);
      const step = positions[1][0] - positions[0][0];
      positions.forEach(([x, y], i) => {
        assert.ok(x >= 0 && x <= 180 + 1e-8 && y <= 1e-8 && y > -74);
        if (i > 0) assert.ok(Math.abs(x - positions[i - 1][0] - step) < 1e-8, 'horizontal velocity must remain constant');
        if (i > 1) assert.ok(Math.abs(y - 2 * positions[i - 1][1] + positions[i - 2][1] - 500 * (animation.options.duration / 1000 / 40) ** 2) < 1e-8, 'vertical acceleration must remain constant');
      });
      const path = scenes[0].findByProps({ className: 'pd-flight-path' }).props.d.match(/-?[\d.]+(?:e[-+]?\d+)?/g).map(Number);
      const midpoint = positions[20];
      assert.ok(Math.abs(32 + midpoint[0] - (path[0] + 2 * path[2] + path[4]) / 4) < 1e-8);
      assert.ok(Math.abs(108 + midpoint[1] - (path[1] + 2 * path[3] + path[5]) / 4) < 1e-8, 'preview and animated apex must match');
    }
  }
  assert.ok(Math.abs(ranges[0] - ranges[2]) < 1e-8);
  assert.ok(ranges[1] > ranges[0]);
  if (mode === 'animated') assert.ok(durations[0] < durations[1] && durations[1] < durations[2]);
  const previous = animations.at(-1);
  act(() => buttons[0].props.onClick());
  if (previous) assert.equal(previous.canceled, true);
  assert.equal(tree.root.findAllByType('input')[0], inputs[0]);
  assert.equal(tree.root.findAllByType('button')[0], buttons[0]);
  assert.equal(tree.root.findAllByProps({ className: 'pd-projectile' })[0], balls[0]);
});

for (const mode of ['animated', 'reduced-motion', 'unsupported-api']) test(`spring ${mode} settles both connected parts and cleans up replay and unmount`, t => {
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
  Object.defineProperty(globalThis, 'window', { configurable: true, value: { matchMedia: () => ({ matches: mode === 'reduced-motion' }) } });
  const animations: { target: string; frames: { offset: number; transform: string }[]; options: { duration: number }; canceled: boolean }[] = [];
  let tree!: ReturnType<typeof create>;
  t.after(() => {
    act(() => tree.unmount());
    if (originalWindow) Object.defineProperty(globalThis, 'window', originalWindow); else Reflect.deleteProperty(globalThis, 'window');
    assert.ok(animations.every(animation => animation.canceled));
  });
  act(() => { tree = create(<><DampedSpringDemo /><DampedSpringDemo /></>, { createNodeMock: element => element.type === 'g' ? {
    animate: mode === 'unsupported-api' ? undefined : (frames: { offset: number; transform: string }[], options: { duration: number }) => {
      const animation = { target: element.props.className, frames, options, canceled: false };
      animations.push(animation);
      return { cancel: () => { animation.canceled = true; } };
    },
  } : null }); });
  const buttons = tree.root.findAllByType('button');
  const scenes = tree.root.findAllByType('svg').filter(svg => svg.props.role === 'img');
  const masses = tree.root.findAllByProps({ className: 'pd-mass' });
  const coils = tree.root.findAllByProps({ className: 'pd-coil' });
  assert.equal(animations.length, 0, 'initial mount must wait for a release');
  assert.notEqual(scenes[0].props.id, scenes[1].props.id);
  scenes.forEach((scene, i) => assert.equal(buttons[i].props['aria-controls'], scene.props.id));
  assert.equal(masses[0].props.style.transform, 'translateX(60px)');
  act(() => buttons[0].props.onClick());
  assert.equal(masses[0].props.style.transform, 'translateX(0)');
  assert.equal(coils[0].props.style.transform, 'scaleX(1)');
  assert.equal(masses[1].props.style.transform, 'translateX(60px)');
  assert.equal(animations.length, mode === 'animated' ? 2 : 0);
  if (mode === 'animated') {
    const mass = animations.find(animation => animation.target === 'pd-mass')!;
    const coil = animations.find(animation => animation.target === 'pd-coil')!;
    const displacements = mass.frames.map(frame => Number(frame.transform.slice(11, -3)));
    assert.equal(mass.options.duration, 4000);
    assert.equal(displacements[0], 60);
    assert.equal(displacements.at(-1), 0);
    assert.ok(Math.min(...displacements) < -30, 'the mass must cross equilibrium before settling');
    assert.ok(displacements.slice(75).every(value => Math.abs(value) < .2), 'the late oscillations must decay');
    mass.frames.forEach((frame, i) => {
      assert.equal(frame.offset, coil.frames[i].offset);
      const scale = Number(coil.frames[i].transform.slice(7, -1));
      assert.ok(Math.abs(30 + 90 * scale - (120 + displacements[i])) < 1e-8, 'the coil endpoint must meet the mass throughout playback');
    });
  }
  act(() => buttons[0].props.onClick());
  assert.equal(animations.length, mode === 'animated' ? 4 : 0);
  assert.ok(animations.slice(0, 2).every(animation => animation.canceled));
  assert.equal(tree.root.findAllByType('button')[0], buttons[0]);
  assert.equal(tree.root.findAllByProps({ className: 'pd-mass' })[0], masses[0]);
  assert.equal(tree.root.findAllByProps({ className: 'pd-coil' })[0], coils[0]);
});

test('physics category adds exactly ten unique searchable techniques with mapped scenes and no helper captions', () => {
  const originals = new Set(['mg-squash-stretch', 'mg-anticipation', 'mg-follow-trail', 'mg-easing-curves', 'mg-gravity-newton-cradle', 'mg-dice-roll-3d', 'mg-marble-board', 'mg-treasure-chest-3d', 'mg-lucky-wheel-3d']);
  const additions = TECHNIQUES.filter(item => !COLLECTION_IDS.has(item.id) && item.category === 'physics' && !originals.has(item.id));
  assert.equal(additions.length, 10);
  assert.equal(new Set(TECHNIQUES.map(item => item.id)).size, TECHNIQUES.length);
  for (const item of additions) {
    assert.ok(matchesSearch(item, item.titleKo));
    assert.ok(item.promptSnippet.trim());
    let tree!: ReturnType<typeof create>;
    act(() => { tree = create(<InteractiveDemo techniqueId={item.id} />); });
    assert.notEqual(tree.toJSON(), null);
    assert.equal(tree.root.findAllByType('p').length, 0);
    assert.equal(tree.root.findAllByType('h3').length, 0);
    act(() => tree.unmount());
  }
});
import { LocaleProvider, useLocale } from '../src/i18n/LocaleContext';

test('physics language switching translates active controls without resetting values, drawings, playback or DOM', t => {
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
  Object.defineProperty(globalThis, 'window', { configurable: true, value: { matchMedia: () => ({ matches: false }) } });
  let setLocale!: ReturnType<typeof useLocale>['setLocale'];
  function LanguageControl() { setLocale = useLocale().setLocale; return null; }
  const animations: { canceled: boolean; paused: boolean }[] = [];
  let tree!: ReturnType<typeof create>;
  t.after(() => {
    act(() => tree.unmount());
    if (originalWindow) Object.defineProperty(globalThis, 'window', originalWindow); else Reflect.deleteProperty(globalThis, 'window');
    assert.ok(animations.every(animation => animation.canceled));
  });
  act(() => {
    tree = create(<LocaleProvider initialLocale="ko"><LanguageControl /><WaveSuperpositionDemo /><PulleyConstraintDemo /><VariableInertiaDemo /><RollingWheelDemo /><ElasticCollisionDemo /><FrictionSlideDemo /><RestitutionBounceDemo /><PendulumPeriodDemo /><ProjectileArcDemo /><DampedSpringDemo /></LocaleProvider>, {
      createNodeMock: element => element.type === 'g' ? {
        animate: () => {
          const animation = { canceled: false, paused: false };
          animations.push(animation);
          return { cancel: () => { animation.canceled = true; }, pause: () => { animation.paused = true; }, play: () => { animation.paused = false; }, updatePlaybackRate: () => {} };
        },
      } : null,
    });
  });
  const inputs = tree.root.findAllByType('input');
  const buttons = tree.root.findAllByType('button');
  const scenes = tree.root.findAllByType('svg').filter(svg => svg.props.role === 'img');
  const values = [90, 12, 40, 28, 200, 80, 85, 88, 65];
  act(() => inputs.forEach((input, i) => input.props.onChange({ currentTarget: { value: String(values[i]) } })));
  act(() => buttons.forEach(button => button.props.onClick()));
  const drawing = () => tree.root.findAll(node => node.type === 'g' || node.type === 'path').map(node => ({ transform: node.props.transform, style: node.props.style, d: node.props.d }));
  const beforeDrawing = drawing();
  const beforeAnimations = animations.map(animation => ({ ...animation }));
  const beforeIds = scenes.map(scene => scene.props.id);
  assert.equal(buttons[0].props['aria-label'], '추 회전 재생');
  assert.equal(buttons[5].props['aria-label'], '진자 재생');
  act(() => setLocale('en'));
  assert.deepEqual(inputs.map(input => input.props.value), values);
  assert.deepEqual(scenes.map(scene => scene.props.id), beforeIds);
  assert.deepEqual(drawing(), beforeDrawing);
  assert.deepEqual(animations, beforeAnimations, 'locale changes must not recreate, cancel, pause or restart playback');
  assert.equal(inputs[0].props['aria-label'], 'Second wave phase difference');
  assert.equal(inputs[0].props['aria-valuetext'], '90 degrees');
  assert.equal(inputs[4].props['aria-valuetext'], '2 times');
  assert.equal(inputs[8].props['aria-valuetext'], '65 degrees');
  assert.equal(buttons[0].props['aria-label'], 'Play mass rotation');
  assert.equal(buttons[5].props['aria-label'], 'Play pendulum');
  assert.equal(buttons[7].children.at(-1), 'Release again');
  assert.doesNotMatch(JSON.stringify(tree.toJSON()), /[가-힣]/u);
  assert.deepEqual(tree.root.findAllByType('input'), inputs);
  assert.deepEqual(tree.root.findAllByType('button'), buttons);
  act(() => setLocale('ko'));
  assert.equal(inputs[0].props['aria-valuetext'], '90도');
  assert.equal(inputs[4].props['aria-valuetext'], '2배');
  assert.equal(buttons[7].children.at(-1), '다시 놓기');
  assert.deepEqual(inputs.map(input => input.props.value), values);
  assert.deepEqual(drawing(), beforeDrawing);
  assert.deepEqual(animations, beforeAnimations);
});
