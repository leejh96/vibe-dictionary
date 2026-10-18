import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { TECHNIQUES, matchesSearch } from '@vibe-dictionary/catalog';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';
import { SlicedTypeDemo } from '../src/components/demos/kinetic/SlicedTypeDemo';
import { ProximityTypeDemo } from '../src/components/demos/kinetic/ProximityTypeDemo';
import { CylinderTypeDemo } from '../src/components/demos/kinetic/CylinderTypeDemo';
import { GooeyWordDemo } from '../src/components/demos/kinetic/GooeyWordDemo';
import { CurvedTypeDemo } from '../src/components/demos/kinetic/CurvedTypeDemo';
import { ScatterTypeDemo } from '../src/components/demos/kinetic/ScatterTypeDemo';
import { ExtrudedTypeDemo } from '../src/components/demos/kinetic/ExtrudedTypeDemo';
import { HingedTypeDemo } from '../src/components/demos/kinetic/HingedTypeDemo';
import { DissolveTypeDemo } from '../src/components/demos/kinetic/DissolveTypeDemo';
import { ReflectionTypeDemo } from '../src/components/demos/kinetic/ReflectionTypeDemo';
import { LocaleProvider, useLocale } from '../src/i18n/LocaleContext';

test('ripple reflection keeps an unchanged original and a locally mirrored fading copy while only horizontal distortion varies', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><ReflectionTypeDemo /><ReflectionTypeDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [scene, otherScene] = tree.root.findAllByType('svg');
  const [input, otherInput] = tree.root.findAllByType('input');
  const [original, reflection] = scene.findAllByType('use');
  const glyph = scene.findByType('text');
  const filter = scene.findByType('filter');
  const mask = scene.findByType('mask');
  const gradient = scene.findByType('linearGradient');
  const displacement = scene.findByType('feDisplacementMap');
  const noise = scene.findByType('feTurbulence');
  const transfer = scene.findByType('feComponentTransfer');
  const alpha = scene.findByType('feFuncA');
  assert.equal(scene.props.role, 'img');
  assert.equal(original.parent!.props['aria-hidden'], 'true');
  assert.equal(original.props.href, `#${glyph.props.id}`);
  assert.equal(reflection.props.href, original.props.href);
  assert.equal(original.props.transform, undefined);
  assert.equal(original.parent!.props.filter, undefined);
  assert.equal(reflection.parent!.props.filter, `url(#${filter.props.id})`);
  assert.equal(reflection.parent!.parent!.props.mask, `url(#${mask.props.id})`);
  assert.equal(mask.findByType('rect').props.fill, `url(#${gradient.props.id})`);
  assert.equal(glyph.children.join(''), 'REFLECT');
  const ids = tree.root.findAll(node => typeof node.props?.id === 'string').map(node => node.props.id);
  assert.equal(ids.length, new Set(ids).size);
  const transform = reflection.props.transform.match(/-?\d+/g).map(Number);
  assert.equal(transform.length, 4);
  const reflectedY = (y: number) => transform[1] + transform[3] * y;
  const planeY = mask.props.y;
  assert.equal(reflectedY(planeY), planeY);
  assert.equal(reflectedY(glyph.props.y) - planeY, planeY - glyph.props.y);
  assert.ok(gradient.findAllByType('stop')[0].props.stopOpacity > gradient.findAllByType('stop')[1].props.stopOpacity);
  assert.equal(transfer.props.in, noise.props.result);
  assert.equal(displacement.props.in, 'SourceGraphic');
  assert.equal(displacement.props.in2, transfer.props.result);
  assert.equal(displacement.props.xChannelSelector, 'R');
  assert.equal(displacement.props.yChannelSelector, 'A');
  assert.equal(alpha.props.type, 'linear');
  for (const signal of [0, .25, .5, .75, 1]) assert.equal(alpha.props.slope * signal + alpha.props.intercept - .5, 0);
  assert.deepEqual([input.props.type, input.props.min, input.props.max, input.props.step, input.props.value], ['range', 0, 14, 1, 8]);
  assert.equal(input.props['aria-controls'], scene.props.id);
  assert.equal(input.props['aria-label'], '반사 잔물결 세기');
  for (const value of [0, 14, 8]) {
    act(() => input.props.onChange({ currentTarget: { value: String(value) } }));
    assert.equal(displacement.props.scale, value);
    assert.equal(input.props['aria-valuetext'], value === 0 ? '잔물결 없음' : `${value}단계`);
    assert.equal(otherInput.props.value, 8);
    assert.equal(otherScene.findByType('feDisplacementMap').props.scale, 8);
  }
  assert.equal(tree.root.findAllByType('input')[0], input);
  assert.equal(scene.findByType('feTurbulence'), noise);
  assert.equal(scene.findByType('text'), glyph);
  assert.equal(scene.findByType('mask'), mask);
  assert.equal(scene.findByType('filter'), filter);
  assert.ok(scene.findAllByType('use').every((node, index) => node === [original, reflection][index]));
});

test('noise dissolve removes monotonically with complete endpoints and restores its fixed local mask without replacing controls', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><DissolveTypeDemo /><DissolveTypeDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [scene, otherScene] = tree.root.findAllByType('svg');
  const [input, otherInput] = tree.root.findAllByType('input');
  const filter = scene.findByType('filter');
  const noise = scene.findByType('feTurbulence');
  const glyph = scene.findByType('text');
  const matrix = scene.findByType('feColorMatrix');
  const initialMatrix = matrix.props.values;
  const composite = scene.findByType('feComposite');
  assert.equal(input.props['aria-label'], '글자 디졸브 진행');
  assert.equal(input.props['aria-controls'], scene.props.id);
  assert.deepEqual([input.props.type, input.props.min, input.props.max, input.props.step, input.props.value], ['range', 0, 100, 1, 50]);
  assert.equal(scene.props.role, 'img');
  assert.equal(scene.findByType('g').props['aria-hidden'], 'true');
  assert.equal(scene.findByType('g').props.filter, `url(#${filter.props.id})`);
  assert.notEqual(scene.props.id, otherScene.props.id);
  assert.notEqual(filter.props.id, otherScene.findByType('filter').props.id);
  assert.equal(glyph.children.join(''), 'DUST');
  assert.equal(matrix.props.in, noise.props.result);
  assert.equal(composite.props.in, 'SourceGraphic');
  assert.equal(composite.props.in2, matrix.props.result);
  assert.equal(composite.props.operator, 'in');
  const samples = Array.from({ length: 11 }, (_, index) => index / 10);
  let previous = samples.map(() => 1);
  for (const value of [0, 25, 50, 75, 100]) {
    act(() => input.props.onChange({ currentTarget: { value: String(value) } }));
    const coefficients = matrix.props.values.split(' ').map(Number);
    const alphas = samples.map(red => Math.min(1, Math.max(0, coefficients[15] * red + coefficients[19])));
    assert.ok(alphas.every((alpha, index) => alpha <= previous[index]));
    if (value === 0) assert.ok(alphas.every(alpha => alpha === 1));
    if (value === 100) assert.ok(alphas.every(alpha => alpha === 0));
    previous = alphas;
    assert.equal(otherInput.props.value, 50);
    assert.equal(input.props['aria-valuetext'], `${value}%`);
  }
  act(() => input.props.onChange({ currentTarget: { value: '50' } }));
  assert.equal(matrix.props.values, initialMatrix);
  assert.equal(tree.root.findAllByType('input')[0], input);
  assert.equal(scene.findByType('feTurbulence'), noise);
  assert.equal(scene.findByType('filter'), filter);
  assert.equal(scene.findByType('text'), glyph);
});

test('hinged type opens the same original letters and returns independently without replacing its native control', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><HingedTypeDemo /><HingedTypeDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [button, otherButton] = tree.root.findAllByType('button');
  const visual = button.findByProps({ className: 'kt-hinge-word' });
  const letters = visual.findAllByProps({ className: 'kt-hinge-letter' });
  assert.equal(button.props.type, 'button');
  assert.equal(button.props['aria-label'], 'VIBE 글자 접힘 전환');
  assert.equal(visual.props['aria-hidden'], 'true');
  assert.equal(letters.map(letter => letter.children.join('')).join(''), 'VIBE');
  assert.ok(letters.every(letter => letter.props['data-letter'] === letter.children.join('')));
  assert.equal(button.props['aria-pressed'], false);
  act(() => button.props.onClick());
  assert.equal(button.props['aria-pressed'], true);
  assert.equal(button.props['data-open'], true);
  assert.equal(otherButton.props['aria-pressed'], false);
  act(() => { button.props.onClick(); button.props.onClick(); });
  assert.equal(button.props['aria-pressed'], true);
  act(() => button.props.onClick());
  assert.equal(button.props['aria-pressed'], false);
  assert.equal(button.props['data-open'], false);
  assert.equal(tree.root.findAllByType('button')[0], button);
  assert.equal(button.findByProps({ className: 'kt-hinge-word' }), visual);
  assert.ok(visual.findAllByProps({ className: 'kt-hinge-letter' }).every((letter, index) => letter === letters[index]));
});

test('extruded type builds ordered local glyph layers and returns to a single flat face with a stable native control', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><ExtrudedTypeDemo /><ExtrudedTypeDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [scene, otherScene] = tree.root.findAllByType('svg');
  const [input, otherInput] = tree.root.findAllByType('input');
  const glyph = scene.findByType('text');
  const front = scene.findByProps({ className: 'kt-extrude-front' });
  const visual = scene.findByType('g');
  assert.equal(scene.props.role, 'img');
  assert.equal(visual.props['aria-hidden'], 'true');
  assert.equal(input.props['aria-controls'], scene.props.id);
  assert.equal(input.props['aria-label'], '글자 압출 깊이');
  assert.deepEqual([input.props.type, input.props.min, input.props.max, input.props.step, input.props.value], ['range', 0, 16, 1, 8]);
  assert.notEqual(scene.props.id, otherScene.props.id);
  assert.notEqual(glyph.props.id, otherScene.findByType('text').props.id);
  assert.equal(glyph.children.join(''), 'TYPE');
  assert.equal(scene.findAllByType('text').length, 1);
  for (const value of [16, 0, 4, 8]) {
    act(() => input.props.onChange({ currentTarget: { value: String(value) } }));
    const faces = visual.findAllByType('use');
    const offsets = faces.slice(0, -1).map(face => face.props.transform.match(/\d+/g).map(Number));
    assert.equal(faces.length, value + 1);
    assert.ok(faces.every(face => face.props.href === `#${glyph.props.id}`));
    assert.deepEqual(offsets, Array.from({ length: value }, (_, index) => [value - index, value - index]));
    assert.equal(faces.at(-1), front);
    assert.equal(front.props.transform, undefined);
    assert.equal(visual.props.transform, `translate(${-value / 2} ${-value / 2})`);
    assert.equal(input.props['aria-valuetext'], `${value}단계`);
    assert.equal(otherInput.props.value, 8);
    assert.equal(otherScene.findAllByType('use').length, 9);
  }
  assert.equal(tree.root.findAllByType('input')[0], input);
  assert.equal(scene.findByType('text'), glyph);
  assert.equal(scene.findByType('g'), visual);
});

test('scattered letters preserve their order and control while independent layouts toggle and return exactly', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><ScatterTypeDemo /><ScatterTypeDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [button, otherButton] = tree.root.findAllByType('button');
  const letters = button.findAllByType('text');
  const assembled = letters.map(item => item.props.style.transform);
  assert.equal(button.props['aria-label'], 'EXPLORE 글자 분산 전환');
  assert.equal(button.props['aria-pressed'], false);
  assert.equal(button.findByType('svg').props['aria-hidden'], 'true');
  assert.equal(letters.map(item => item.children.join('')).join(''), 'EXPLORE');
  assert.equal(letters.length, 7);
  const positions = (): number[][] => letters.map(item => item.props.style.transform.match(/-?\d+(?:\.\d+)?/g).map(Number));
  assert.deepEqual(positions().map(([x, y, angle]) => [y, angle]), Array.from({ length: 7 }, () => [58, 0]));
  assert.ok(positions().every(([x], index, all) => !index || x - all[index - 1][0] === 28));
  act(() => button.props.onClick());
  assert.equal(button.props['aria-pressed'], true);
  assert.equal(otherButton.props['aria-pressed'], false);
  assert.ok(positions().every(([x, y, angle], index) => x > 0 && x < 264 && y > 0 && y < 104 && angle !== 0 && letters[index].props.style.transform !== assembled[index]));
  const delays = letters.map(item => parseInt(item.props.style['--kt-delay'], 10));
  assert.equal(delays[0], 0);
  assert.ok(delays.every((delay, index) => !index || delay - delays[index - 1] === 35));
  act(() => button.props.onClick());
  assert.deepEqual(letters.map(item => item.props.style.transform), assembled);
  act(() => { button.props.onClick(); button.props.onClick(); });
  assert.equal(button.props['aria-pressed'], false);
  assert.deepEqual(letters.map(item => item.props.style.transform), assembled);
  assert.equal(tree.root.findAllByType('button')[0], button);
  assert.ok(button.findAllByType('text').every((item, index) => item === letters[index]));
});

test('curved type keeps fixed endpoints and centered text on its own changing baseline without replacing controls', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><CurvedTypeDemo /><CurvedTypeDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [scene, otherScene] = tree.root.findAllByType('svg');
  const [input, otherInput] = tree.root.findAllByType('input');
  const path = scene.findByType('path');
  const textPath = scene.findByType('textPath');
  const otherPath = otherScene.findByType('path');
  const otherD = otherPath.props.d;
  assert.equal(scene.props.role, 'img');
  assert.equal(scene.findByType('g').props['aria-hidden'], 'true');
  assert.equal(input.props['aria-controls'], scene.props.id);
  assert.deepEqual([input.props.type, input.props.min, input.props.max, input.props.step, input.props.value], ['range', -60, 60, 1, 40]);
  assert.equal(input.props['aria-label'], '글자 기준선 곡률');
  assert.equal(textPath.props.href, `#${path.props.id}`);
  assert.notEqual(path.props.id, otherPath.props.id);
  assert.notEqual(scene.props.id, otherScene.props.id);
  assert.equal(textPath.props.startOffset, '50%');
  assert.equal(scene.findByType('text').props.textAnchor, 'middle');
  assert.equal(textPath.children.join(''), 'CURVED TYPE');
  for (const [value, centerY, description] of [[-60, 92, '아래로 60'], [0, 62, '직선'], [40, 42, '위로 40'], [60, 32, '위로 60']] as const) {
    act(() => input.props.onChange({ currentTarget: { value: String(value) } }));
    const points = path.props.d.match(/-?\d+(?:\.\d+)?/g).map(Number);
    assert.deepEqual([points[0], points[1], points[4], points[5]], [18, 62, 246, 62]);
    assert.equal((points[0] + 2 * points[2] + points[4]) / 4, 132);
    assert.equal((points[1] + 2 * points[3] + points[5]) / 4, centerY);
    assert.equal(input.props['aria-valuetext'], description);
    assert.equal(otherPath.props.d, otherD);
    assert.equal(otherInput.props.value, 40);
  }
  assert.equal(tree.root.findAllByType('input')[0], input);
  assert.equal(scene.findByType('path'), path);
  assert.equal(scene.findByType('textPath'), textPath);
});

test('gooey word morph keeps crisp endpoints and symmetric finite filters with isolated native controls', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><GooeyWordDemo /><GooeyWordDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [scene, otherScene] = tree.root.findAllByType('svg');
  const [input, otherInput] = tree.root.findAllByType('input');
  const letters = scene.findAllByType('text');
  const filters = scene.findAllByType('filter');
  const blur = () => scene.findAllByType('feGaussianBlur').map(item => item.props.stdDeviation);
  const alpha = () => letters.map(item => item.props.opacity);
  const matrix = scene.findByType('feColorMatrix').props.values.split(' ').map(Number);
  assert.equal(matrix.length, 20);
  const filtered = (pixel: number[]) => [0, 1, 2, 3].map(row => Math.min(1, Math.max(0, matrix.slice(row * 5, row * 5 + 4).reduce((sum: number, coefficient: number, column: number) => sum + coefficient * pixel[column], matrix[row * 5 + 4]))));
  assert.deepEqual(filtered([.2, .4, .8, 0]), [.2, .4, .8, 0]);
  assert.deepEqual(filtered([.2, .4, .8, .3]), [.2, .4, .8, 0]);
  assert.deepEqual(filtered([.2, .4, .8, .5]), [.2, .4, .8, 1]);
  assert.equal(scene.props.role, 'img');
  assert.equal(scene.findByType('g').props['aria-hidden'], 'true');
  assert.equal(input.props['aria-controls'], scene.props.id);
  assert.equal(input.props['aria-label'], '글자 모핑 진행');
  assert.deepEqual([input.props.type, input.props.min, input.props.max, input.props.step], ['range', 0, 100, 1]);
  assert.deepEqual(letters.map(item => item.children.join('')), ['VIBE', 'WAVE']);
  const ids = tree.root.findAllByType('filter').map(item => item.props.id);
  assert.equal(new Set(ids).size, 6);
  assert.notEqual(scene.props.id, otherScene.props.id);
  assert.equal(scene.findByType('g').props.filter, `url(#${filters[0].props.id})`);
  letters.forEach((item, index) => assert.equal(item.props.filter, `url(#${filters[index + 1].props.id})`));
  assert.deepEqual(blur(), [0, 40]);
  assert.deepEqual(alpha(), [1, 0]);
  act(() => input.props.onChange({ currentTarget: { value: '100' } }));
  assert.deepEqual(blur(), [40, 0]);
  assert.deepEqual(alpha(), [0, 1]);
  act(() => input.props.onChange({ currentTarget: { value: '50' } }));
  assert.deepEqual(blur(), [8, 8]);
  assert.equal(alpha()[0], alpha()[1]);
  assert.ok(alpha()[0] > .7 && alpha()[0] < .8);
  act(() => input.props.onChange({ currentTarget: { value: '25' } }));
  const quarterBlur = blur();
  const quarterAlpha = alpha();
  act(() => input.props.onChange({ currentTarget: { value: '75' } }));
  assert.deepEqual(blur(), quarterBlur.reverse());
  assert.deepEqual(alpha(), quarterAlpha.reverse());
  for (let value = 0; value <= 100; value++) {
    act(() => input.props.onChange({ currentTarget: { value: String(value) } }));
    assert.ok(blur().every(amount => Number.isFinite(amount) && amount >= 0 && amount <= 40));
    assert.ok(alpha().every(amount => amount >= 0 && amount <= 1));
  }
  assert.equal(otherInput.props.value, 0);
  assert.equal(input.props['aria-valuetext'], '100%');
  assert.equal(tree.root.findAllByType('input')[0], input);
  assert.ok(scene.findAllByType('text').every((item, index) => item === letters[index]));
  assert.ok(scene.findAllByType('filter').every((item, index) => item === filters[index]));
});

test('cylindrical type distributes a complete ring and pauses the same rotor without changing another instance', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><CylinderTypeDemo /><CylinderTypeDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [scene, otherScene] = tree.root.findAllByProps({ className: 'kt-cylinder-scene' });
  const [button] = tree.root.findAllByType('button');
  const rotor = scene.findByProps({ className: 'kt-cylinder-rotor' });
  const otherRotor = otherScene.findByProps({ className: 'kt-cylinder-rotor' });
  const letters = rotor.findAllByType('span');
  assert.equal(scene.props.role, 'img');
  assert.equal(scene.findByProps({ className: 'kt-cylinder-tilt' }).props['aria-hidden'], 'true');
  assert.equal(button.props['aria-controls'], scene.props.id);
  assert.notEqual(scene.props.id, otherScene.props.id);
  assert.equal(letters.length, 16);
  assert.equal(letters.map(letter => letter.children.join('')).join(''), 'VIBEVIBEVIBEVIBE');
  const angles = letters.map(letter => {
    const values = letter.props.style.transform.match(/rotateY\((-?[\d.]+)deg\) translateZ\(([\d.]+)px\)/);
    assert.ok(values);
    assert.equal(Number(values[2]), 68);
    return Number(values[1]);
  });
  const gaps = angles.map((angle, index) => (angles[(index + 1) % angles.length] - angle + 360) % 360);
  assert.ok(gaps.every(gap => gap === 360 / 16));
  assert.equal(rotor.props.style.animationPlayState, 'running');
  assert.equal(button.props['aria-label'], '원통 타이포 일시정지');
  act(() => button.props.onClick());
  assert.equal(rotor.props.style.animationPlayState, 'paused');
  assert.equal(button.props['aria-label'], '원통 타이포 재생');
  assert.equal(otherRotor.props.style.animationPlayState, 'running');
  act(() => { button.props.onClick(); button.props.onClick(); });
  assert.equal(rotor.props.style.animationPlayState, 'paused');
  act(() => button.props.onClick());
  assert.equal(rotor.props.style.animationPlayState, 'running');
  assert.equal(tree.root.findAllByType('button')[0], button);
  assert.equal(scene.findByProps({ className: 'kt-cylinder-rotor' }), rotor);
  assert.ok(rotor.findAllByType('span').every((letter, index) => letter === letters[index]));
});

test('proximity type follows native and pointer positions without moving cells, capturing touch or sharing instance state', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><ProximityTypeDemo /><ProximityTypeDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [scene, otherScene] = tree.root.findAllByProps({ className: 'kt-proximity-word' });
  const [input, otherInput] = tree.root.findAllByType('input');
  const letters = scene.findAllByType('span');
  const weights = () => letters.map(letter => letter.props.style.fontWeight);
  assert.equal(input.props['aria-controls'], scene.props.id);
  assert.notEqual(scene.props.id, otherScene.props.id);
  assert.equal(input.props.type, 'range');
  assert.deepEqual([input.props.min, input.props.max, input.props.step], [0, 100, .5]);
  assert.equal(letters.map(letter => letter.children.join('')).join(''), 'VIBE');
  assert.ok(letters.every(letter => letter.props['aria-hidden'] === 'true'));
  assert.deepEqual(weights(), [100, 550, 550, 100]);
  for (const [position, expected] of [[12.5, [1000, 100, 100, 100]], [25, [550, 550, 100, 100]], [87.5, [100, 100, 100, 1000]], [100, [100, 100, 100, 550]]] as const) {
    act(() => input.props.onChange({ currentTarget: { value: String(position) } }));
    assert.deepEqual(weights(), expected);
    assert.equal(input.props['aria-valuetext'], `${position}%`);
  }
  const pointer = (clientX: number, pointerType = 'mouse', width = 200) => scene.props.onPointerMove({ pointerType, clientX, currentTarget: { getBoundingClientRect: () => ({ left: 20, width }) } });
  act(() => pointer(45));
  assert.equal(input.props.value, 12.5);
  assert.deepEqual(weights(), [1000, 100, 100, 100]);
  act(() => pointer(145, 'touch'));
  assert.equal(input.props.value, 12.5);
  act(() => pointer(145, 'mouse', 0));
  assert.equal(input.props.value, 12.5);
  act(() => pointer(-100));
  assert.equal(input.props.value, 0);
  act(() => pointer(400));
  assert.equal(input.props.value, 100);
  act(() => pointer(100.3));
  assert.equal(input.props.value, 40);
  assert.equal(otherInput.props.value, 50);
  assert.equal(tree.root.findAllByType('input')[0], input);
  assert.equal(tree.root.findAllByProps({ className: 'kt-proximity-word' })[0], scene);
  assert.ok(scene.findAllByType('span').every((letter, index) => letter === letters[index]));
});

test('sliced type covers the whole word once and replays only its visual layers with a stable named control', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><SlicedTypeDemo /><SlicedTypeDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [button, otherButton] = tree.root.findAllByType('button');
  const visual = button.findByProps({ className: 'kt-slice-stack' });
  const otherVisual = otherButton.findByProps({ className: 'kt-slice-stack' });
  const slices = visual.findAllByProps({ className: 'kt-text-slice' });
  assert.equal(button.props['aria-label'], 'CREATE 슬라이스 타이포 재생');
  assert.equal(visual.props['aria-hidden'], 'true');
  assert.equal(slices.length, 4);
  assert.ok(slices.every(slice => slice.children.join('') === 'CREATE'));
  const bands = slices.map(slice => {
    const values = slice.props.style.clipPath.match(/inset\((\d+)% 0 (\d+)% 0\)/);
    assert.ok(values);
    return [Number(values[1]), 100 - Number(values[2])];
  });
  assert.equal(bands[0][0], 0);
  assert.equal(bands.at(-1)![1], 100);
  bands.forEach(([start, end], index) => {
    assert.ok(end > start);
    if (index) assert.equal(start, bands[index - 1][1]);
  });
  act(() => button.props.onClick());
  assert.notEqual(button.findByProps({ className: 'kt-slice-stack' }), visual);
  const replayed = button.findByProps({ className: 'kt-slice-stack' });
  act(() => { button.props.onClick(); button.props.onClick(); });
  assert.notEqual(button.findByProps({ className: 'kt-slice-stack' }), replayed);
  assert.equal(tree.root.findAllByType('button')[0], button);
  assert.equal(otherButton.findByProps({ className: 'kt-slice-stack' }), otherVisual);
});

test('new kinetic techniques have unique searchable metadata and their mapped interactive scenes', t => {
  const mapped = new Map([
    ['mg-ripple-reflection-type', ReflectionTypeDemo],
    ['mg-noise-dissolve-type', DissolveTypeDemo],
    ['mg-hinged-opening-type', HingedTypeDemo],
    ['mg-layered-type-extrusion', ExtrudedTypeDemo],
    ['mg-scattered-letter-assembly', ScatterTypeDemo],
    ['mg-curved-type-baseline', CurvedTypeDemo],
    ['mg-gooey-word-morph', GooeyWordDemo],
    ['mg-cylinder-type-rotation', CylinderTypeDemo],
    ['mg-proximity-variable-type', ProximityTypeDemo],
    ['mg-sliced-type-assembly', SlicedTypeDemo],
  ]);
  const originals = new Set(['mg-kinetic-wave-text', 'mg-3d-text-roller', 'mg-neon-sign-flicker']);
  const added = TECHNIQUES.filter(item => item.category === 'kinetic' && !originals.has(item.id));
  assert.deepEqual(added.map(item => item.id).sort(), [...mapped.keys()].sort());
  assert.equal(new Set(TECHNIQUES.map(item => item.id)).size, TECHNIQUES.length);
  for (const id of originals) assert.ok(TECHNIQUES.some(item => item.id === id && item.category === 'kinetic'));
  for (const item of added) {
    assert.equal(item.domain, 'motion');
    assert.equal(item.category, 'kinetic');
    for (const query of [item.titleKo, item.titleEn, ...item.vibeKeywords!]) assert.ok(matchesSearch(item, query));
    let tree!: ReturnType<typeof create>;
    act(() => { tree = create(<InteractiveDemo techniqueId={item.id} />); });
    t.after(() => { act(() => tree.unmount()); });
    assert.equal(tree.root.findAllByType(mapped.get(item.id)!).length, 1);
    assert.equal(tree.root.findAllByType('p').length, 0);
  }
});

test('kinetic language switching preserves chosen shapes, toggles, replay subtree and local glyph references', t => {
  let setLocale!: ReturnType<typeof useLocale>['setLocale'];
  function LocaleControl() {
    setLocale = useLocale().setLocale;
    return null;
  }
  let tree!: ReturnType<typeof create>;
  act(() => {
    tree = create(<LocaleProvider initialLocale="ko"><LocaleControl />
      <ReflectionTypeDemo /><DissolveTypeDemo /><HingedTypeDemo /><ExtrudedTypeDemo />
      <ScatterTypeDemo /><CurvedTypeDemo /><GooeyWordDemo /><CylinderTypeDemo />
      <ProximityTypeDemo /><SlicedTypeDemo />
    </LocaleProvider>);
  });
  t.after(() => { act(() => tree.unmount()); });
  const inputs = tree.root.findAllByType('input');
  const values = [0, 77, 12, -40, 65, 87.5];
  act(() => inputs.forEach((input, index) => input.props.onChange({ currentTarget: { value: String(values[index]) } })));
  const buttons = tree.root.findAllByType('button');
  act(() => buttons.forEach(button => button.props.onClick()));
  const scenes = tree.root.findAllByProps({ role: 'img' });
  const sceneIds = scenes.map(scene => scene.props.id);
  const letters = tree.root.findAllByType('text');
  const letterText = letters.map(letter => letter.children.join(''));
  const paths = tree.root.findAllByType('path');
  const pathShapes = paths.map(path => path.props.d);
  const rotor = tree.root.findByProps({ className: 'kt-cylinder-rotor' });
  const slice = tree.root.findByProps({ className: 'kt-slice-stack' });
  act(() => setLocale('en'));
  assert.deepEqual(inputs.map(input => input.props.value), values);
  assert.deepEqual(inputs.map(input => input.props['aria-label']), [
    'Reflection ripple strength', 'Letter dissolve progress', 'Letter extrusion depth',
    'Letter baseline curvature', 'Letter morph progress', 'Variable letter emphasis position',
  ]);
  assert.deepEqual(inputs.map(input => input.props['aria-valuetext']), ['No ripples', '77%', 'Level 12', 'Down by 40', '65%', '87.5%']);
  assert.deepEqual(buttons.map(button => button.props['aria-label']), [
    'Toggle VIBE letter folding', 'Toggle EXPLORE letter scattering', 'Play cylindrical typography', 'Replay CREATE sliced typography',
  ]);
  assert.equal(buttons[0].props['aria-pressed'], true);
  assert.equal(buttons[1].props['aria-pressed'], true);
  assert.equal(rotor.props.style.animationPlayState, 'paused');
  assert.equal(tree.root.findByProps({ className: 'kt-slice-stack' }), slice);
  assert.deepEqual(scenes.map(scene => scene.props.id), sceneIds);
  assert.deepEqual(tree.root.findAllByType('text'), letters);
  assert.deepEqual(letters.map(letter => letter.children.join('')), letterText);
  assert.deepEqual(paths.map(path => path.props.d), pathShapes);
  assert.ok(scenes.every(scene => !/[가-힣]/u.test(scene.props['aria-label'])));
  act(() => {
    inputs[0].props.onChange({ currentTarget: { value: '14' } });
    inputs[3].props.onChange({ currentTarget: { value: '60' } });
  });
  assert.equal(inputs[0].props['aria-valuetext'], 'Level 14');
  assert.equal(inputs[3].props['aria-valuetext'], 'Up by 60');
  act(() => setLocale('ko'));
  assert.equal(inputs[0].props['aria-valuetext'], '14단계');
  assert.equal(inputs[3].props['aria-valuetext'], '위로 60');
  assert.equal(buttons[2].props['aria-label'], '원통 타이포 재생');
  assert.equal(tree.root.findByProps({ className: 'kt-slice-stack' }), slice);
  assert.ok(tree.root.findAllByType('input').every((input, index) => input === inputs[index]));
});
