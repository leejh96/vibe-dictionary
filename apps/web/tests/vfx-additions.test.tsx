import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { TECHNIQUES, matchesSearch } from '@vibe-dictionary/catalog';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';
import { VenetianBlindsDemo } from '../src/components/demos/vfx/VenetianBlindsDemo';
import { RadialWipeDemo } from '../src/components/demos/vfx/RadialWipeDemo';
import { BlockDissolveDemo } from '../src/components/demos/vfx/BlockDissolveDemo';
import { LumaWipeDemo } from '../src/components/demos/vfx/LumaWipeDemo';
import { LensFlareDemo } from '../src/components/demos/vfx/LensFlareDemo';
import { HighlightBloomDemo } from '../src/components/demos/vfx/HighlightBloomDemo';
import { EdgeDetectDemo } from '../src/components/demos/vfx/EdgeDetectDemo';
import { PosterizeDemo } from '../src/components/demos/vfx/PosterizeDemo';
import { DirectionalBlurDemo } from '../src/components/demos/vfx/DirectionalBlurDemo';
import { VignetteDemo } from '../src/components/demos/vfx/VignetteDemo';
import { LocaleProvider, useLocale } from '../src/i18n/LocaleContext';

test('all VFX range controls switch language live without resetting values or replacing scene and control nodes', t => {
  let setLocale!: ReturnType<typeof useLocale>['setLocale'];
  function LocaleControl() {
    setLocale = useLocale().setLocale;
    return null;
  }
  let tree!: ReturnType<typeof create>;
  act(() => {
    tree = create(<LocaleProvider initialLocale="ko"><LocaleControl />
      <VignetteDemo /><DirectionalBlurDemo /><PosterizeDemo /><EdgeDetectDemo /><HighlightBloomDemo />
      <LensFlareDemo /><LumaWipeDemo /><BlockDissolveDemo /><RadialWipeDemo /><VenetianBlindsDemo />
    </LocaleProvider>);
  });
  t.after(() => { act(() => tree.unmount()); });
  const inputs = tree.root.findAllByType('input');
  const scenes = tree.root.findAllByType('svg');
  const values = [17, 83, 7, 42, 91, 216, 31, 67, 25, 89];
  act(() => inputs.forEach((input, index) => input.props.onChange({ currentTarget: { value: String(values[index]) } })));
  const controlledShapes = scenes.map(scene => scene.findAll(node => ['filter', 'mask', 'clipPath', 'radialGradient', 'linearGradient', 'path', 'circle', 'rect', 'ellipse', 'g'].includes(String(node.type))));
  const expectedEnglish = ['Feathered vignette strength', 'Horizontal directional blur strength', 'Posterize color levels per channel', 'Laplacian edge detection blend', 'Highlight bloom strength', 'Lens flare light source horizontal position', 'Luma wipe scene transition progress', 'Block dissolve scene transition progress', 'Clockwise scene transition progress', 'Blinds scene transition progress'];
  act(() => setLocale('en'));
  inputs.forEach((input, index) => {
    assert.equal(tree.root.findAllByType('input')[index], input);
    assert.equal(tree.root.findAllByType('svg')[index], scenes[index]);
    assert.equal(input.props.value, values[index]);
    assert.equal(input.props['aria-label'], expectedEnglish[index]);
    assert.equal(input.props['aria-controls'], scenes[index].props.id);
    assert.doesNotMatch(scenes[index].props['aria-label'], /[가-힣]/u);
    assert.deepEqual(scenes[index].findAll(node => ['filter', 'mask', 'clipPath', 'radialGradient', 'linearGradient', 'path', 'circle', 'rect', 'ellipse', 'g'].includes(String(node.type))), controlledShapes[index]);
  });
  assert.equal(inputs[2].props['aria-valuetext'], '7 levels per channel');
  assert.equal(inputs[5].props['aria-valuetext'], '100% horizontal position');
  act(() => setLocale('ko'));
  assert.equal(inputs[2].props['aria-valuetext'], '채널당 7단계');
  assert.equal(inputs[5].props['aria-valuetext'], '가로 100% 위치');
  inputs.forEach((input, index) => assert.equal(input.props.value, values[index]));
});

test('vignette darkens symmetric edges while preserving the transparent center and unchanged source through reverse and rapid scrubbing', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><VignetteDemo /><VignetteDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const scenes = tree.root.findAllByType('svg');
  const inputs = tree.root.findAllByType('input');
  const gradients = scenes.map(scene => scene.findByType('radialGradient'));
  const overlays = scenes.map(scene => scene.findByProps({ className: 'vfx-vignette-falloff' }));
  const source = scenes[0].findByProps({ className: 'vfx-vignette-source' });
  const lighthouse = source.findByProps({ className: 'vfx-vignette-lighthouse' });
  const originalShapes = source.findAll(node => typeof node.props.fill === 'string');
  const originalColors = originalShapes.map(shape => shape.props.fill);
  assert.notEqual(gradients[0].props.id, gradients[1].props.id);
  for (let index = 0; index < scenes.length; index++) {
    assert.equal(inputs[index].props['aria-controls'], scenes[index].props.id);
    assert.equal(overlays[index].props.fill, `url(#${gradients[index].props.id})`);
    assert.equal(gradients[index].props.gradientUnits, 'objectBoundingBox');
    assert.equal(overlays[index].props.width, 264);
    assert.equal(overlays[index].props.height, 144);
    assert.equal(source.props.opacity, undefined, 'the artwork itself must not globally fade');
  }
  const stops = gradients[0].findAllByType('stop');
  assert.ok(stops.every(stop => stop.props.stopColor === '#000'));
  assert.deepEqual(stops.map(stop => [stop.props.offset, stop.props.stopOpacity]), [[0, 0], [.4, 0], [1, .9]]);
  assert.equal(gradients[0].props.cx, .5);
  assert.equal(gradients[0].props.cy, .5);
  const attenuation = (x: number, y: number) => {
    const rho = Math.hypot(x / 264 - gradients[0].props.cx, y / 144 - gradients[0].props.cy) / gradients[0].props.r;
    const inner = stops[1].props.offset;
    return overlays[0].props.opacity * stops[2].props.stopOpacity * Math.max(0, Math.min(1, (rho - inner) / (stops[2].props.offset - inner)));
  };
  for (const strength of [0, 50, 100, 13, 94, 60]) {
    act(() => inputs[0].props.onChange({ currentTarget: { value: String(strength) } }));
    assert.equal(overlays[0].props.opacity, strength / 100);
    assert.equal(attenuation(132, 72), 0, 'center stays exactly unchanged');
    assert.equal(attenuation(132, 33), 0, 'lighthouse roof remains inside the protected center');
    assert.equal(attenuation(132, 112), 0, 'lighthouse base remains inside the protected center');
    for (const [x, y] of [[0, 0], [264, 0], [0, 144], [264, 144]]) assert.ok(Math.abs(attenuation(x, y) - strength / 100 * .9) < 1e-12);
    assert.ok(attenuation(10, 72) <= attenuation(0, 72), 'falloff grows continuously toward the edge');
    assert.equal(attenuation(0, 72), attenuation(264, 72));
    assert.equal(attenuation(132, 0), attenuation(132, 144));
    assert.equal(tree.root.findAllByType('input')[0], inputs[0]);
    assert.equal(tree.root.findAllByType('svg')[0], scenes[0]);
    assert.equal(scenes[0].findByProps({ className: 'vfx-vignette-source' }), source);
    assert.equal(source.findByProps({ className: 'vfx-vignette-lighthouse' }), lighthouse);
    assert.equal(scenes[0].findByProps({ className: 'vfx-vignette-falloff' }), overlays[0]);
    assert.equal(scenes[0].findByType('radialGradient'), gradients[0]);
    const currentShapes = source.findAll(node => typeof node.props.fill === 'string');
    currentShapes.forEach((shape, index) => {
      assert.equal(shape, originalShapes[index]);
      assert.equal(shape.props.fill, originalColors[index]);
    });
    assert.equal(inputs[0].props['aria-valuetext'], `${strength}%`);
    assert.equal(inputs[1].props.value, 60);
    assert.equal(overlays[1].props.opacity, .6);
  }
});

test('vignette publishes one VFX entry searchable by both names and maps to the actual radial falloff', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'mg-feathered-vignette');
  assert.equal(entries.length, 1);
  assert.equal(entries[0].domain, 'motion');
  assert.equal(entries[0].category, 'vfx');
  for (const query of ['페더 비네팅', '가장자리 감광', 'FEATHERED VIGNETTE', 'edge darkening']) assert.ok(matchesSearch(entries[0], query));
  assert.ok(!matchesSearch(entries[0], '비네팅 존재하지않는검색어'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={entries[0].id} />); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(VignetteDemo).length, 1);
  assert.equal(tree.root.findByType('input').props.value, 60);
});

test('directional blur filters source color and alpha only horizontally with reversible strength and isolated instances', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><DirectionalBlurDemo /><DirectionalBlurDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const scenes = tree.root.findAllByType('svg');
  const inputs = tree.root.findAllByType('input');
  const filters = scenes.map(scene => scene.findByType('filter'));
  const source = scenes[0].findByProps({ className: 'vfx-directional-source' });
  const blur = filters[0].findByType('feGaussianBlur');
  const originals = source.children;
  assert.notEqual(filters[0].props.id, filters[1].props.id);
  for (let index = 0; index < scenes.length; index++) {
    assert.equal(inputs[index].props['aria-controls'], scenes[index].props.id);
    assert.equal(scenes[index].findByProps({ className: 'vfx-directional-source' }).props.filter, `url(#${filters[index].props.id})`);
    assert.equal(filters[index].props.colorInterpolationFilters, 'sRGB');
  }
  assert.equal(blur.props.in, 'SourceGraphic', 'blur actual source colors and alpha rather than a prepainted halo or alpha-only silhouette');
  assert.equal(filters[0].findAllByType('feComposite').length, 0, 'the original must not be re-added like bloom');
  const ring = source.findByType('circle');
  const bars = source.findAllByType('rect');
  const bounds = [
    ...bars.map(bar => [bar.props.x, bar.props.y, bar.props.x + bar.props.width, bar.props.y + bar.props.height]),
    [ring.props.cx - ring.props.r - ring.props.strokeWidth / 2, ring.props.cy - ring.props.r - ring.props.strokeWidth / 2, ring.props.cx + ring.props.r + ring.props.strokeWidth / 2, ring.props.cy + ring.props.r + ring.props.strokeWidth / 2],
  ];
  assert.deepEqual([Math.min(...bounds.map(bound => bound[0])), Math.min(...bounds.map(bound => bound[1])), Math.max(...bounds.map(bound => bound[2])), Math.max(...bounds.map(bound => bound[3]))], [72, 42, 192, 102]);
  for (const value of [0, 50, 100, 9, 96, 0, 50]) {
    act(() => inputs[0].props.onChange({ currentTarget: { value: String(value) } }));
    const [sigmaX, sigmaY] = blur.props.stdDeviation.split(' ').map(Number);
    assert.equal(sigmaX, value * .12);
    assert.equal(sigmaY, 0, 'a zero vertical deviation must remain zero at every strength');
    for (const [left, top, right, bottom] of bounds) {
      assert.ok(left - 3 * sigmaX >= filters[0].props.x && right + 3 * sigmaX <= filters[0].props.width, 'three-sigma horizontal spread stays in the filter frame');
      assert.ok(top >= 0 && bottom <= 144, 'vertical bounds remain unchanged');
    }
    assert.equal(tree.root.findAllByType('input')[0], inputs[0]);
    assert.equal(tree.root.findAllByType('svg')[0], scenes[0]);
    assert.equal(scenes[0].findByProps({ className: 'vfx-directional-source' }), source);
    assert.equal(filters[0].findByType('feGaussianBlur'), blur);
    source.children.forEach((shape, index) => assert.equal(shape, originals[index]));
    assert.equal(inputs[0].props['aria-valuetext'], `${value}%`);
    assert.equal(inputs[1].props.value, 50);
    assert.equal(filters[1].findByType('feGaussianBlur').props.stdDeviation, '6 0');
  }
});

test('directional blur is one distinct searchable VFX item with an actual anisotropic filter mapping', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'mg-horizontal-directional-blur');
  assert.equal(entries.length, 1);
  assert.equal(entries[0].domain, 'motion');
  assert.equal(entries[0].category, 'vfx');
  for (const query of ['방향성 블러', '일축 가우시안', 'HORIZONTAL DIRECTIONAL BLUR', 'anisotropic blur']) assert.ok(matchesSearch(entries[0], query));
  assert.ok(!matchesSearch(entries[0], '블러 존재하지않는검색어'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={entries[0].id} />); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(DirectionalBlurDemo).length, 1);
  assert.equal(tree.root.findByType('input').props.value, 50);
});

test('posterize independently quantizes RGB to nearest levels, preserves alpha and source geometry during reverse and rapid input', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><PosterizeDemo /><PosterizeDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const scenes = tree.root.findAllByType('svg');
  const inputs = tree.root.findAllByType('input');
  const filters = scenes.map(scene => scene.findByType('filter'));
  const source = scenes[0].findByProps({ className: 'vfx-posterize-source' });
  const sphere = source.findByType('circle');
  const initialStops = scenes[0].findAllByType('stop');
  const originalColors = initialStops.map(stop => stop.props.stopColor);
  const functions = ['feFuncR', 'feFuncG', 'feFuncB'].map(channel => filters[0].findByType(channel));
  const initialTable = functions[0].props.tableValues;
  assert.notEqual(filters[0].props.id, filters[1].props.id);
  for (let index = 0; index < scenes.length; index++) {
    assert.equal(inputs[index].props['aria-controls'], scenes[index].props.id);
    assert.equal(scenes[index].findByProps({ className: 'vfx-posterize-source' }).props.filter, `url(#${filters[index].props.id})`);
    const gradients = scenes[index].findAll(node => node.type === 'linearGradient' || node.type === 'radialGradient');
    const references = scenes[index].findByProps({ className: 'vfx-posterize-source' }).findAll(node => typeof node.props.fill === 'string' && node.props.fill.startsWith('url('));
    assert.deepEqual(references.map(node => node.props.fill), gradients.map(node => `url(#${node.props.id})`));
    assert.equal(filters[index].props.colorInterpolationFilters, 'sRGB');
    assert.equal(filters[index].findByType('feFuncA').props.type, 'identity');
  }
  for (const levels of [2, 3, 8, 5, 2, 7, 4]) {
    act(() => inputs[0].props.onChange({ currentTarget: { value: String(levels) } }));
    const table = functions[0].props.tableValues.split(' ').map(Number);
    const map = (color: number) => table[Math.min(table.length - 1, Math.floor(color * table.length))];
    assert.equal(new Set(table).size, levels);
    assert.equal(map(0), 0);
    assert.equal(map(1), 1);
    for (const color of [.01, .124, .24, .33, .49, .51, .76, .875, .99]) {
      assert.ok(Math.abs(map(color) - Math.round(color * (levels - 1)) / (levels - 1)) < 1e-12, 'discrete bins must select the nearest channel level');
    }
    for (const channel of functions) {
      assert.equal(channel.props.type, 'discrete');
      assert.equal(channel.props.tableValues, functions[0].props.tableValues);
    }
    assert.equal(tree.root.findAllByType('input')[0], inputs[0]);
    assert.equal(tree.root.findAllByType('svg')[0], scenes[0]);
    assert.equal(scenes[0].findByProps({ className: 'vfx-posterize-source' }), source);
    assert.equal(source.findByType('circle'), sphere);
    assert.equal(sphere.props.r, 42);
    assert.equal(filters[0].findByType('feFuncR'), functions[0]);
    assert.deepEqual(scenes[0].findAllByType('stop').map(stop => stop.props.stopColor), originalColors);
    assert.equal(scenes[0].findAllByType('stop')[0], initialStops[0]);
    assert.equal(inputs[0].props['aria-valuetext'], `채널당 ${levels}단계`);
    assert.equal(inputs[1].props.value, 4);
    assert.equal(filters[1].findByType('feFuncR').props.tableValues, initialTable);
  }
});

test('posterize publishes once with distinct searchable VFX metadata and a real mapped filter', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'mg-channel-posterize');
  assert.equal(entries.length, 1);
  assert.equal(entries[0].domain, 'motion');
  assert.equal(entries[0].category, 'vfx');
  for (const query of ['포스터라이즈', '채널 양자화', 'RGB CHANNEL POSTERIZATION', 'posterize']) assert.ok(matchesSearch(entries[0], query));
  assert.ok(!matchesSearch(entries[0], '포스터라이즈 존재하지않는검색어'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={entries[0].id} />); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(PosterizeDemo).length, 1);
  assert.equal(tree.root.findByType('input').props.value, 4);
});

test('edge detection computes neighborhood contrast and reversibly blends the same opaque source without affecting another instance', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><EdgeDetectDemo /><EdgeDetectDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const scenes = tree.root.findAllByType('svg');
  const inputs = tree.root.findAllByType('input');
  const filters = scenes.map(scene => scene.findByType('filter'));
  const source = scenes[0].findByProps({ className: 'vfx-edge-source' });
  const kernel = filters[0].findByType('feConvolveMatrix');
  const composite = filters[0].findByType('feComposite');
  assert.notEqual(filters[0].props.id, filters[1].props.id);
  for (let index = 0; index < scenes.length; index++) {
    assert.equal(inputs[index].props['aria-controls'], scenes[index].props.id);
    assert.equal(scenes[index].findByProps({ className: 'vfx-edge-source' }).props.filter, `url(#${filters[index].props.id})`);
    assert.equal(filters[index].props.colorInterpolationFilters, 'sRGB');
  }
  const matrix = filters[0].findByType('feColorMatrix').props.values.trim().split(/\s+/).map(Number);
  const brightness = (rgb: number[]) => matrix[0] * rgb[0] + matrix[1] * rgb[1] + matrix[2] * rgb[2];
  assert.ok(Math.abs(brightness([1, 1, 1]) - 1) < 1e-9);
  assert.ok(brightness([0, 1, 0]) > brightness([1, 0, 0]));
  assert.deepEqual(matrix.slice(15), [0, 0, 0, 1, 0]);
  const weights = kernel.props.kernelMatrix.split(' ').map(Number);
  const response = (pixels: number[]) => Math.max(0, Math.min(1, weights.reduce((sum: number, weight: number, index: number) => sum + weight * pixels[index], 0) / kernel.props.divisor + kernel.props.bias));
  assert.equal(response(Array(9).fill(.5)), 0, 'a uniform area must disappear from the edge result');
  assert.equal(response([0, 0, 0, 0, 1, 0, 0, 0, 0]), 1, 'a brighter center must be detected');
  assert.equal(response([1, 1, 1, 1, 0, 1, 1, 1, 1]), 0, 'the negative response is clipped instead of pretending to be absolute edge detection');
  assert.equal(kernel.props.preserveAlpha, true, 'opaque background must remain opaque when the zero-sum kernel removes its color');
  assert.equal(kernel.props.edgeMode, 'duplicate');
  assert.equal(source.findAllByType('rect')[0].props.width, 264);
  assert.equal(source.findAllByType('rect')[0].props.height, 144);
  assert.equal(source.findAll(node => node.props.stroke !== undefined).length, 0, 'source uses filled shapes, not pre-drawn outlines');
  for (const value of [0, 50, 100, 12, 98, 75]) {
    act(() => inputs[0].props.onChange({ currentTarget: { value: String(value) } }));
    assert.equal(tree.root.findAllByType('input')[0], inputs[0]);
    assert.equal(tree.root.findAllByType('svg')[0], scenes[0]);
    assert.equal(scenes[0].findByProps({ className: 'vfx-edge-source' }), source);
    assert.equal(filters[0].findByType('feConvolveMatrix'), kernel);
    assert.equal(filters[0].findByType('feComposite'), composite);
    assert.equal(composite.props.k1, 0);
    assert.equal(composite.props.k2, 1 - value / 100);
    assert.equal(composite.props.k3, value / 100);
    assert.equal(composite.props.k4, 0);
    assert.equal(inputs[0].props['aria-valuetext'], `${value}%`);
    assert.equal(inputs[1].props.value, 75);
    assert.equal(filters[1].findByType('feComposite').props.k3, .75);
  }
});

test('edge detection publishes one searchable VFX entry and maps to its actual filter scene', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'mg-laplacian-edge-detect');
  assert.equal(entries.length, 1);
  assert.equal(entries[0].domain, 'motion');
  assert.equal(entries[0].category, 'vfx');
  for (const query of ['윤곽 검출', '라플라시안', 'LAPLACIAN EDGE DETECTION', 'find edges']) assert.ok(matchesSearch(entries[0], query));
  assert.ok(!matchesSearch(entries[0], '윤곽 존재하지않는검색어'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={entries[0].id} />); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(EdgeDetectDemo).length, 1);
  assert.equal(tree.root.findByType('input').props.value, 75);
});

test('bloom extracts only bright source pixels, preserves alpha edges and adds blurred highlights without changing the original geometry', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><HighlightBloomDemo /><HighlightBloomDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const scenes = tree.root.findAllByType('svg');
  const inputs = tree.root.findAllByType('input');
  const filters = scenes.map(scene => scene.findByType('filter'));
  const sources = scenes.map(scene => scene.findByProps({ className: 'vfx-bloom-source' }));
  assert.notEqual(filters[0].props.id, filters[1].props.id);
  for (let index = 0; index < scenes.length; index++) {
    assert.equal(inputs[index].props['aria-controls'], scenes[index].props.id);
    assert.equal(sources[index].props.filter, `url(#${filters[index].props.id})`);
    assert.equal(filters[index].props.colorInterpolationFilters, 'sRGB');
  }
  const matrix = filters[0].findByType('feColorMatrix');
  const row = matrix.props.values.trim().split(/\s+/).map(Number).slice(15);
  const alpha = (r: number, g: number, b: number, a = 1) => Math.max(0, Math.min(1, row[0] * r + row[1] * g + row[2] * b + row[3] * a + row[4]));
  assert.equal(alpha(1, 1, 1), 1);
  assert.ok(Math.abs(alpha(1, 1, 1, .2) - .2) < 1e-9, 'highlight extraction must not inflate transparent edge opacity');
  assert.equal(alpha(49 / 255, 90 / 255, 112 / 255), 0, 'dim source decorations must not contribute glow');
  assert.ok(alpha(207 / 255, 250 / 255, 254 / 255) > .8, 'bright cyan source must contribute glow');
  const blur = filters[0].findByType('feGaussianBlur');
  const composite = filters[0].findByType('feComposite');
  assert.equal(matrix.props.in, 'SourceGraphic');
  assert.equal(blur.props.in, matrix.props.result);
  assert.equal(composite.props.in2, blur.props.result);
  assert.equal(composite.props.in, 'SourceGraphic');
  assert.equal(composite.props.operator, 'arithmetic');
  assert.equal(composite.props.k2, 1);
  const originalShapes = sources[0].findAll(node => ['path', 'circle', 'rect'].includes(String(node.type)));
  for (const [value, radius, weight] of [[0, 0, 0], [50, 3, 1], [100, 6, 2], [65, 3.9, 1.3]] as const) {
    act(() => inputs[0].props.onChange({ currentTarget: { value: String(value) } }));
    assert.equal(tree.root.findAllByType('input')[0], inputs[0]);
    assert.equal(scenes[0].findByProps({ className: 'vfx-bloom-source' }), sources[0]);
    assert.deepEqual(sources[0].findAll(node => ['path', 'circle', 'rect'].includes(String(node.type))), originalShapes);
    assert.equal(blur.props.stdDeviation, radius);
    assert.equal(composite.props.k3, weight);
    assert.equal(inputs[0].props['aria-valuetext'], `${value}%`);
    assert.equal(inputs[1].props.value, 65);
    assert.equal(filters[1].findByType('feGaussianBlur').props.stdDeviation, 3.9);
  }
});

test('bloom publishes unique VFX metadata and searchable names resolving to the actual effect', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'mg-highlight-bloom');
  assert.equal(entries.length, 1);
  assert.equal(entries[0].domain, 'motion');
  assert.equal(entries[0].category, 'vfx');
  for (const query of ['하이라이트 블룸', '밝은 픽셀 추출', 'HIGHLIGHT BLOOM']) assert.ok(matchesSearch(entries[0], query));
  assert.ok(!matchesSearch(entries[0], '블룸 존재하지않는검색어'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={entries[0].id} />); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(HighlightBloomDemo).length, 1);
  assert.equal(tree.root.findByType('input').props.value, 65);
});

test('lens flare ghosts stay on the reflected optical axis and follow the source without losing the same input or shapes', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><LensFlareDemo /><LensFlareDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const scenes = tree.root.findAllByType('svg');
  const inputs = tree.root.findAllByType('input');
  const sources = scenes.map(scene => scene.findByProps({ className: 'vfx-flare-source' }));
  const ghosts = scenes.map(scene => scene.findByProps({ className: 'vfx-flare-ghosts' }).findAllByType('circle'));
  const firstInitial = ghosts[0].map(ghost => [ghost.props.cx, ghost.props.cy]);
  const haloIds = scenes.map(scene => scene.findByType('radialGradient').props.id);
  assert.notEqual(haloIds[0], haloIds[1]);
  for (let index = 0; index < scenes.length; index++) {
    assert.equal(inputs[index].props['aria-controls'], scenes[index].props.id);
    assert.equal(sources[index].findByProps({ r: 31 }).props.fill, `url(#${haloIds[index]})`);
    assert.equal(sources[index].findByProps({ className: 'vfx-flare-streak' }).props.stroke, `url(#${scenes[index].findByType('linearGradient').props.id})`);
  }
  for (const sourceX of [48, 132, 216, 72]) {
    act(() => inputs[0].props.onChange({ currentTarget: { value: String(sourceX) } }));
    assert.equal(tree.root.findAllByType('input')[0], inputs[0]);
    assert.equal(scenes[0].findByProps({ className: 'vfx-flare-source' }), sources[0]);
    assert.equal(sources[0].props.transform, `translate(${sourceX} 44)`);
    const current = scenes[0].findByProps({ className: 'vfx-flare-ghosts' }).findAllByType('circle');
    current.forEach((ghost, index) => {
      assert.equal(ghost, ghosts[0][index]);
      const { cx, cy, r } = ghost.props;
      assert.ok(Math.abs((cx - 132) * -28 - (cy - 72) * (sourceX - 132)) < 1e-9, 'each ghost stays collinear with source and optical center');
      assert.ok((cx - 132) * (sourceX - 132) <= 0, 'ghost is on the opposite side of the optical center');
      assert.ok(cx - r >= 0 && cx + r <= 264 && cy - r >= 0 && cy + r <= 144);
    });
    assert.equal(ghosts[0][1].props.cx, 264 - sourceX);
    assert.equal(ghosts[0][1].props.cy, 100);
    assert.equal(inputs[1].props.value, 72);
    assert.deepEqual(ghosts[1].map(ghost => [ghost.props.cx, ghost.props.cy]), firstInitial);
  }
  assert.deepEqual(ghosts[0].map(ghost => [ghost.props.cx, ghost.props.cy]), firstInitial);
  assert.equal(inputs[0].props['aria-valuetext'], '가로 14% 위치');
});

test('lens flare publishes unique VFX metadata and searchable Korean and English names with the actual mapped demo', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'mg-optical-lens-flare');
  assert.equal(entries.length, 1);
  assert.equal(entries[0].domain, 'motion');
  assert.equal(entries[0].category, 'vfx');
  for (const query of ['렌즈 플레어', '광원 고스트', 'OPTICAL LENS FLARE']) assert.ok(matchesSearch(entries[0], query));
  assert.ok(!matchesSearch(entries[0], '플레어 존재하지않는검색어'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={entries[0].id} />); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(LensFlareDemo).length, 1);
  assert.equal(tree.root.findByType('input').props.value, 72);
});

test('luma wipe converts actual fixed grayscale source to ordered opacity and keeps all mask references local', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><LumaWipeDemo /><LumaWipeDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const scenes = tree.root.findAllByType('svg');
  const inputs = tree.root.findAllByType('input');
  const masks = scenes.map(scene => scene.findByType('mask'));
  const filters = scenes.map(scene => scene.findByType('filter'));
  const matrices = filters.map(filter => filter.findByType('feColorMatrix'));
  assert.notEqual(masks[0].props.id, masks[1].props.id);
  assert.notEqual(filters[0].props.id, filters[1].props.id);
  const arch = scenes[0].findByProps({ className: 'vfx-luma-arch' });
  const coast = scenes[0].findByProps({ className: 'vfx-luma-coast' });
  for (let index = 0; index < scenes.length; index++) {
    assert.equal(inputs[index].props['aria-controls'], scenes[index].props.id);
    assert.equal(scenes[index].findByProps({ className: 'vfx-luma-arch' }).props.mask, `url(#${masks[index].props.id})`);
    assert.equal(scenes[index].findByProps({ className: 'vfx-luma-coast' }).props.mask, undefined);
    assert.equal(masks[index].props.style.maskType, 'alpha');
    assert.equal(masks[index].findByType('g').props.filter, `url(#${filters[index].props.id})`);
    const gradients = scenes[index].findAllByType('linearGradient');
    const references = [masks[index].findByType('rect'), masks[index].findByType('path')].map(shape => shape.props.fill);
    assert.deepEqual(references, gradients.map(gradient => `url(#${gradient.props.id})`));
    assert.equal(filters[index].props.colorInterpolationFilters, 'sRGB');
  }
  const initial = matrices[0].props.values;
  const alpha = (gray: number) => {
    const row = matrices[0].props.values.trim().split(/\s+/).map(Number).slice(15);
    return Math.max(0, Math.min(1, row[0] * gray + row[1] * gray + row[2] * gray + row[3] + row[4]));
  };
  for (const [value, expected] of [[0, [1, 1, 1, 1, 1]], [50, [0, 0, 0, 1, 1]], [100, [0, 0, 0, 0, 0]]] as const) {
    act(() => inputs[0].props.onChange({ currentTarget: { value: String(value) } }));
    assert.deepEqual([0, .25, .5, .75, 1].map(alpha), expected);
    assert.equal(tree.root.findAllByType('input')[0], inputs[0]);
    assert.equal(filters[0].findByType('feColorMatrix'), matrices[0]);
    assert.equal(scenes[0].findByProps({ className: 'vfx-luma-arch' }), arch);
    assert.equal(scenes[0].findByProps({ className: 'vfx-luma-coast' }), coast);
    assert.equal(inputs[0].props['aria-valuetext'], `${value}%`);
    assert.equal(inputs[1].props.value, 50);
    assert.equal(matrices[1].props.values, initial);
  }
  act(() => inputs[0].props.onChange({ currentTarget: { value: '50' } }));
  assert.equal(matrices[0].props.values, initial);
  assert.ok(alpha(.53) > 0 && alpha(.53) < 1, 'the transition edge must preserve partial opacity');
});

test('luma wipe publishes unique metadata and resolves Korean and English search to the mapped component', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'mg-luma-gradient-wipe');
  assert.equal(entries.length, 1);
  assert.equal(entries[0].domain, 'motion');
  assert.equal(entries[0].category, 'vfx');
  for (const query of ['루마 와이프', '밝기 지도 전환', 'LUMA GRADIENT WIPE']) assert.ok(matchesSearch(entries[0], query));
  assert.ok(!matchesSearch(entries[0], '루마 존재하지않는검색어'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={entries[0].id} />); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(LumaWipeDemo).length, 1);
  assert.equal(tree.root.findByType('input').props.value, 50);
});

test('block dissolve covers the entire frame and removes a stable nested set without moving the scenes or controls', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><BlockDissolveDemo /><BlockDissolveDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const scenes = tree.root.findAllByType('svg');
  const inputs = tree.root.findAllByType('input');
  const clips = scenes.map(scene => scene.findByType('clipPath'));
  const cells = clips.map(clip => clip.findAllByType('rect'));
  const poster = scenes[0].findByProps({ className: 'vfx-block-poster' });
  const planet = scenes[0].findByProps({ className: 'vfx-block-planet' });
  assert.equal(cells[0].length, 66);
  assert.notEqual(clips[0].props.id, clips[1].props.id);
  assert.equal(poster.props.clipPath, `url(#${clips[0].props.id})`);
  assert.equal(planet.props.clipPath, undefined);
  assert.equal(inputs[0].props['aria-controls'], scenes[0].props.id);
  const initial = cells[0].map(cell => cell.props.width);
  let priorVisible = new Set(Array.from({ length: 66 }, (_, index) => index));
  for (const [value, count] of [[0, 66], [25, 50], [50, 33], [75, 17], [100, 0]] as const) {
    act(() => inputs[0].props.onChange({ currentTarget: { value: String(value) } }));
    const visible = new Set<number>();
    cells[0].forEach((cell, index) => {
      assert.equal(clips[0].findAllByType('rect')[index], cell);
      assert.equal(cell.props.x, index % 11 * 24);
      assert.equal(cell.props.y, Math.floor(index / 11) * 24);
      assert.equal(cell.props.height, 24);
      assert.equal(cell.props.shapeRendering, 'crispEdges', 'scaled adjoining clip blocks must share sharp edges instead of translucent antialias seams');
      assert.ok(cell.props.width === 0 || cell.props.width === 24);
      if (cell.props.width === 24) visible.add(index);
    });
    assert.equal(visible.size, count);
    for (const index of visible) assert.ok(priorVisible.has(index), 'increasing progress must not restore removed blocks');
    priorVisible = visible;
    assert.equal(tree.root.findAllByType('input')[0], inputs[0]);
    assert.equal(inputs[0].props['aria-valuetext'], `${value}%`);
    assert.equal(scenes[0].findByProps({ className: 'vfx-block-poster' }), poster);
    assert.equal(scenes[0].findByProps({ className: 'vfx-block-planet' }), planet);
    assert.equal(inputs[1].props.value, 50);
    assert.deepEqual(cells[1].map(cell => cell.props.width), initial);
  }
  act(() => inputs[0].props.onChange({ currentTarget: { value: '50' } }));
  assert.deepEqual(cells[0].map(cell => cell.props.width), initial);
});

test('block dissolve publishes unique VFX metadata and resolves Korean and English search to its real demo', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'mg-block-dissolve-transition');
  assert.equal(entries.length, 1);
  assert.equal(entries[0].domain, 'motion');
  assert.equal(entries[0].category, 'vfx');
  for (const query of ['블록 디졸브', '픽셀 장면', 'BLOCK DISSOLVE']) assert.ok(matchesSearch(entries[0], query));
  assert.ok(!matchesSearch(entries[0], '디졸브 존재하지않는검색어'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={entries[0].id} />); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(BlockDissolveDemo).length, 1);
  assert.equal(tree.root.findByType('input').props.value, 50);
});

test('radial wipe removes clockwise quadrants while preserving both scenes, local references and the native input', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><RadialWipeDemo /><RadialWipeDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const scenes = tree.root.findAllByType('svg');
  const inputs = tree.root.findAllByType('input');
  const clips = scenes.map(scene => scene.findByType('clipPath'));
  const paths = clips.map(clip => clip.findByType('path'));
  assert.notEqual(clips[0].props.id, clips[1].props.id);
  for (let index = 0; index < scenes.length; index++) {
    assert.equal(inputs[index].props['aria-controls'], scenes[index].props.id);
    assert.equal(scenes[index].findByProps({ className: 'vfx-city-day' }).props.clipPath, `url(#${clips[index].props.id})`);
    assert.equal(scenes[index].findByProps({ className: 'vfx-city-night' }).props.clipPath, undefined);
    const definitions = new Set(scenes[index].findAllByType('path').map(path => path.props.id).filter(Boolean));
    for (const use of scenes[index].findAllByType('use')) assert.ok(definitions.has(use.props.href.slice(1)));
  }
  const night = scenes[0].findByProps({ className: 'vfx-city-night' });
  const day = scenes[0].findByProps({ className: 'vfx-city-day' });
  const initialPath = paths[0].props.d;
  for (const [value, expected] of [
    [0, 'M0 0H264V144H0Z'],
    [25, 'M132 72L432.000 72.000A300 300 0 1 1 132 -228Z'],
    [50, 'M132 72L132.000 372.000A300 300 0 0 1 132 -228Z'],
    [75, 'M132 72L-168.000 72.000A300 300 0 0 1 132 -228Z'],
    [100, ''], [35, initialPath],
  ] as const) {
    act(() => inputs[0].props.onChange({ currentTarget: { value: String(value) } }));
    assert.equal(tree.root.findAllByType('input')[0], inputs[0]);
    assert.equal(inputs[0].props['aria-valuetext'], `${value}%`);
    assert.equal(clips[0].findByType('path'), paths[0]);
    assert.equal(paths[0].props.d, expected);
    assert.equal(scenes[0].findByProps({ className: 'vfx-city-night' }), night);
    assert.equal(scenes[0].findByProps({ className: 'vfx-city-day' }), day);
    assert.equal(inputs[1].props.value, 35);
    assert.equal(paths[1].props.d, initialPath);
  }
});

test('radial wipe has a unique VFX catalog entry searchable in both languages and resolves to its component', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'mg-clockwise-radial-wipe');
  assert.equal(entries.length, 1);
  assert.equal(entries[0].domain, 'motion');
  assert.equal(entries[0].category, 'vfx');
  for (const query of ['시계 방향 전환', '부채꼴 장면', 'RADIAL WIPE', 'clock wipe']) assert.ok(matchesSearch(entries[0], query));
  assert.ok(!matchesSearch(entries[0], '래디얼 존재하지않는검색어'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={entries[0].id} />); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(RadialWipeDemo).length, 1);
  assert.equal(tree.root.findByType('input').props.value, 35);
});

test('blinds publish once in the VFX catalog and resolve from Korean and English search to the actual scene', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'mg-venetian-blinds-transition');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'motion');
  assert.equal(item.category, 'vfx');
  for (const query of ['블라인드 전환', '수평 와이프', 'VENETIAN BLINDS']) {
    assert.ok(matchesSearch(item, query), `search must find the technique with ${query}`);
  }
  assert.ok(!matchesSearch(item, '블라인드 존재하지않는검색어'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={item.id} />); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(VenetianBlindsDemo).length, 1);
  assert.equal(tree.root.findByType('input').props.value, 45);
  assert.equal(tree.root.findByType('svg').props['aria-label'], '수평 블라인드 사이로 사막에서 산악 풍경으로 바뀌는 장면');
});

test('blinds uncover a complete second landscape with local clips and reversible native scrubbing', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><VenetianBlindsDemo /><VenetianBlindsDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const scenes = tree.root.findAllByType('svg');
  const inputs = tree.root.findAllByType('input');
  const clips = scenes.map(scene => scene.findByType('clipPath'));
  assert.notEqual(clips[0].props.id, clips[1].props.id);
  for (let index = 0; index < scenes.length; index++) {
    assert.equal(inputs[index].props['aria-controls'], scenes[index].props.id);
    assert.equal(inputs[index].props.type, 'range');
    assert.equal(scenes[index].findByProps({ className: 'vfx-warm-landscape' }).props.clipPath, `url(#${clips[index].props.id})`);
    assert.equal(scenes[index].findByProps({ className: 'vfx-cold-landscape' }).props.clipPath, undefined);
    assert.equal(clips[index].findAllByType('rect').length, 8);
  }
  const warm = scenes[0].findByProps({ className: 'vfx-warm-landscape' });
  const cold = scenes[0].findByProps({ className: 'vfx-cold-landscape' });
  for (const [value, height] of [[0, 18], [50, 9], [100, 0], [45, 9.9]] as const) {
    act(() => inputs[0].props.onChange({ currentTarget: { value: String(value) } }));
    assert.equal(tree.root.findAllByType('input')[0], inputs[0]);
    assert.equal(inputs[0].props.value, value);
    assert.equal(inputs[0].props['aria-valuetext'], `${value}%`);
    assert.equal(tree.root.findAllByType('svg')[0], scenes[0]);
    assert.equal(scenes[0].findByProps({ className: 'vfx-warm-landscape' }), warm);
    assert.equal(scenes[0].findByProps({ className: 'vfx-cold-landscape' }), cold);
    const slats = clips[0].findAllByType('rect');
    slats.forEach((slat, index) => {
      assert.equal(slat.props.y, index * 18);
      assert.equal(slat.props.height, height);
    });
    assert.equal(inputs[1].props.value, 45);
    assert.equal(clips[1].findAllByType('rect')[0].props.height, 9.9);
  }
});
