import { COLLECTION_IDS } from './helpers/collection';
import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { TECHNIQUES, matchesSearch } from '@vibe-dictionary/catalog';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';
import { BlendLightsDemo } from '../src/components/demos/shader/BlendLightsDemo';
import { DisplacementLinesDemo } from '../src/components/demos/shader/DisplacementLinesDemo';
import { PointLightSurfaceDemo } from '../src/components/demos/shader/PointLightSurfaceDemo';
import { MoireFieldDemo } from '../src/components/demos/shader/MoireFieldDemo';
import { DitherGradientDemo } from '../src/components/demos/shader/DitherGradientDemo';
import { ProjectedShadowDemo } from '../src/components/demos/shader/ProjectedShadowDemo';
import { VoronoiCellsDemo } from '../src/components/demos/shader/VoronoiCellsDemo';
import { LocaleProvider, useLocale } from '../src/i18n/LocaleContext';

test('shader locale switches translate labels while preserving adjusted inputs, blending and SVG instances', t => {
  let tree!: ReturnType<typeof create>;
  let changeLocale!: ReturnType<typeof useLocale>['setLocale'];
  function LocaleControl() {
    changeLocale = useLocale().setLocale;
    return null;
  }
  act(() => { tree = create(<LocaleProvider initialLocale="ko"><LocaleControl /><VoronoiCellsDemo /><ProjectedShadowDemo /><MoireFieldDemo /><PointLightSurfaceDemo /><DisplacementLinesDemo /><BlendLightsDemo /></LocaleProvider>); });
  t.after(() => { act(() => tree.unmount()); });
  const inputs = tree.root.findAllByType('input');
  const values = [180, 90, 48, 252, 32];
  const scenes = tree.root.findAllByProps({ role: 'img' });
  const button = tree.root.findByType('button');
  const filters = tree.root.findAllByType('filter');
  const circles = tree.root.findAllByType('circle');
  act(() => {
    inputs.forEach((input, index) => input.props.onChange({ currentTarget: { value: String(values[index]) } }));
    button.props.onClick();
    changeLocale('en');
  });
  assert.deepEqual(inputs.map(input => input.props.value), values);
  assert.deepEqual(inputs.map(input => input.props['aria-label']), ['Voronoi center horizontal position', 'Occluder horizontal position', 'Ring center offset', 'Surface light horizontal position', 'Line displacement strength']);
  assert.equal(button.props['aria-label'], 'Light blending');
  assert.equal(button.props['aria-pressed'], false);
  assert.ok(button.children.includes('Blend'));
  assert.deepEqual(tree.root.findAllByProps({ role: 'img' }), scenes);
  assert.deepEqual(tree.root.findAllByType('input'), inputs);
  assert.deepEqual(tree.root.findAllByType('filter'), filters);
  assert.deepEqual(tree.root.findAllByType('circle'), circles);
  scenes.forEach(scene => assert.doesNotMatch(scene.props['aria-label'], /[가-힣]/u));
  act(() => changeLocale('ko'));
  assert.deepEqual(inputs.map(input => input.props.value), values);
  assert.equal(button.props['aria-label'], '조명 혼색');
  assert.equal(button.props['aria-pressed'], false);
  assert.ok(button.children.includes('혼색'));
});

test('voronoi cells partition the scene by nearest site and update only their own instance without replacing controls', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><VoronoiCellsDemo /><VoronoiCellsDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const scenes = tree.root.findAllByType('svg');
  const inputs = tree.root.findAllByType('input');
  const cells = scenes[0].findAllByType('polygon');
  const sites = scenes[0].findAllByType('circle');
  const otherPoints = scenes[1].findAllByType('polygon').map(cell => cell.props.points);
  assert.notEqual(scenes[0].props.id, scenes[1].props.id);
  scenes.forEach((scene, i) => assert.equal(inputs[i].props['aria-controls'], scene.props.id));
  const initialPoints = cells.map(cell => cell.props.points);
  for (const value of ['112', '132', '180']) {
    act(() => inputs[0].props.onChange({ currentTarget: { value } }));
    assert.equal(sites.at(-1)?.props.cx, Number(value));
    let area = 0;
    cells.forEach((cell, i) => {
      const points: number[][] = cell.props.points.split(' ').map((point: string) => point.split(',').map(Number));
      assert.ok(points.length >= 3);
      points.forEach(([x, y], j) => {
        assert.ok(Number.isFinite(x) && Number.isFinite(y) && x >= -1e-7 && x <= 264 + 1e-7 && y >= -1e-7 && y <= 144 + 1e-7);
        const ownDistance = (x - sites[i].props.cx) ** 2 + (y - sites[i].props.cy) ** 2;
        sites.forEach(site => assert.ok(ownDistance <= (x - site.props.cx) ** 2 + (y - site.props.cy) ** 2 + 1e-7, 'every cell vertex must be nearest to its own site'));
        const next = points[(j + 1) % points.length];
        area += (x * next[1] - next[0] * y) / 2;
      });
    });
    assert.ok(Math.abs(area - 264 * 144) < 1e-6, 'the complete partition must cover the scene');
    if (value !== '132') assert.notDeepEqual(cells.map(cell => cell.props.points), initialPoints);
    assert.deepEqual(scenes[1].findAllByType('polygon').map(cell => cell.props.points), otherPoints);
    assert.equal(tree.root.findAllByType('input')[0], inputs[0]);
    assert.deepEqual(scenes[0].findAllByType('polygon'), cells);
    assert.deepEqual(scenes[0].findAllByType('circle'), sites);
  }
});

test('shadow edges stay collinear with the fixed light and blocker while instances and controls remain isolated', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><ProjectedShadowDemo /><ProjectedShadowDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const scenes = tree.root.findAllByType('svg');
  const inputs = tree.root.findAllByType('input');
  const masks = scenes.map(scene => scene.findByType('mask'));
  const lights = scenes.map(scene => scene.findByType('radialGradient'));
  assert.equal(new Set([...masks, ...lights].map(node => node.props.id)).size, 4);
  scenes.forEach((scene, i) => {
    assert.equal(inputs[i].props['aria-controls'], scene.props.id);
    const litArea = scene.findAllByType('rect').find(rect => rect.props.mask);
    assert.equal(litArea?.props.mask, `url(#${masks[i].props.id})`);
    assert.equal(litArea?.props.fill, `url(#${lights[i].props.id})`);
  });
  const initialOther = masks[1].findByType('polygon').props.points;
  for (const value of ['90', '132', '174']) {
    act(() => inputs[0].props.onChange({ currentTarget: { value } }));
    const points = masks[0].findByType('polygon').props.points.split(' ').map((point: string) => point.split(',').map(Number));
    for (const [near, far] of [[points[0], points[3]], [points[1], points[2]]]) {
      assert.ok(Math.abs((near[0] - 132) * (far[1] - 12) - (far[0] - 132) * (near[1] - 12)) < 1e-8);
    }
    assert.equal(points[0][0] + 22, Number(value));
    assert.equal(points[1][0] - 22, Number(value));
    const blockedBottomX = value === '90' ? 80 : value === '174' ? 184 : 132;
    assert.ok(points[3][0] < blockedBottomX && blockedBottomX < points[2][0], 'the thick blocker must shadow the ray passing through its lower inner corner');
    assert.equal(masks[1].findByType('polygon').props.points, initialOther);
    assert.equal(tree.root.findAllByType('input')[0], inputs[0]);
    assert.deepEqual(tree.root.findAllByType('radialGradient'), lights);
  }
});

test('dither instances keep their gradient and filter references local across rerenders', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><DitherGradientDemo /><DitherGradientDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const scenes = tree.root.findAllByType('svg');
  const filters = scenes.map(scene => scene.findByType('filter'));
  const ramps = scenes.map(scene => scene.findByType('linearGradient'));
  assert.equal(new Set([...filters, ...ramps].map(node => node.props.id)).size, 4);
  scenes.forEach((scene, i) => {
    const rect = scene.findByType('rect');
    assert.equal(rect.props.fill, `url(#${ramps[i].props.id})`);
    assert.equal(rect.props.filter, `url(#${filters[i].props.id})`);
  });
  const noise = filters.map(filter => filter.findByType('feTurbulence'));
  act(() => tree.update(<><DitherGradientDemo /><DitherGradientDemo /></>));
  assert.deepEqual(tree.root.findAllByType('filter'), filters);
  assert.deepEqual(tree.root.findAllByType('feTurbulence'), noise);
});

test('moire changes only its own second pattern offset and keeps the native input and pattern nodes', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><MoireFieldDemo /><MoireFieldDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const scenes = tree.root.findAllByType('div').filter(node => node.props.role === 'img');
  const inputs = tree.root.findAllByType('input');
  const rings = scenes.map(scene => scene.findAllByType('span'));
  assert.notEqual(scenes[0].props.id, scenes[1].props.id);
  for (let i = 0; i < 2; i++) {
    assert.equal(inputs[i].props['aria-controls'], scenes[i].props.id);
    assert.equal(rings[i][1].props.style.transform, 'translateX(24px)');
  }
  for (const value of ['0', '48']) {
    act(() => inputs[0].props.onChange({ currentTarget: { value } }));
    assert.equal(rings[0][1].props.style.transform, `translateX(${value}px)`);
    assert.equal(rings[0][0].props.style, undefined);
    assert.equal(rings[1][1].props.style.transform, 'translateX(24px)');
    assert.equal(tree.root.findAllByType('input')[0], inputs[0]);
    assert.deepEqual(scenes[0].findAllByType('span'), rings[0]);
  }
});

test('point lighting moves only its own light while keeping the noise map and local filter stable', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><PointLightSurfaceDemo /><PointLightSurfaceDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const scenes = tree.root.findAllByType('svg');
  const inputs = tree.root.findAllByType('input');
  const filters = scenes.map(scene => scene.findByType('filter'));
  assert.notEqual(filters[0].props.id, filters[1].props.id);
  const noise = filters[0].findByType('feTurbulence');
  for (let i = 0; i < 2; i++) {
    assert.equal(scenes[i].findByType('rect').props.filter, `url(#${filters[i].props.id})`);
    assert.equal(inputs[i].props['aria-controls'], scenes[i].props.id);
    assert.equal(filters[i].findByType('fePointLight').props.x, 132);
  }
  for (const value of ['12', '252']) {
    act(() => inputs[0].props.onChange({ currentTarget: { value } }));
    assert.equal(filters[0].findByType('fePointLight').props.x, Number(value));
    assert.equal(filters[1].findByType('fePointLight').props.x, 132);
    assert.equal(filters[0].findByType('feTurbulence'), noise);
    assert.equal(tree.root.findAllByType('input')[0], inputs[0]);
  }
});

test('line displacement keeps filter references local and updates strength without replacing geometry', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><DisplacementLinesDemo /><DisplacementLinesDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const scenes = tree.root.findAllByType('svg');
  const inputs = tree.root.findAllByType('input');
  const filters = scenes.map(scene => scene.findByType('filter'));
  assert.notEqual(filters[0].props.id, filters[1].props.id);
  for (let i = 0; i < 2; i++) {
    assert.equal(scenes[i].findByType('g').props.filter, `url(#${filters[i].props.id})`);
    assert.equal(inputs[i].props['aria-controls'], scenes[i].props.id);
    assert.equal(filters[i].findByType('feDisplacementMap').props.scale, 18);
  }
  const geometry = scenes[0].findAllByType('path');
  for (const value of ['0', '32']) {
    act(() => inputs[0].props.onChange({ currentTarget: { value } }));
    assert.equal(filters[0].findByType('feDisplacementMap').props.scale, Number(value));
    assert.equal(filters[1].findByType('feDisplacementMap').props.scale, 18);
    assert.equal(tree.root.findAllByType('input')[0], inputs[0]);
    assert.deepEqual(scenes[0].findAllByType('path'), geometry);
  }
});

test('blend lights toggle only their own compositing state while preserving their control and geometry', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><BlendLightsDemo /><BlendLightsDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const scenes = tree.root.findAllByType('svg').filter(svg => svg.props.role === 'img');
  const controls = tree.root.findAllByType('button');
  assert.notEqual(scenes[0].props.id, scenes[1].props.id);
  assert.equal(controls[0].props['aria-controls'], scenes[0].props.id);
  const circles = scenes[0].findAllByType('circle');
  assert.equal(controls[0].props['aria-pressed'], true);
  act(() => controls[0].props.onClick());
  assert.equal(scenes[0].props['data-blended'], false);
  assert.equal(controls[0].props['aria-pressed'], false);
  assert.equal(scenes[1].props['data-blended'], true);
  assert.equal(tree.root.findAllByType('button')[0], controls[0]);
  assert.deepEqual(scenes[0].findAllByType('circle'), circles);
  act(() => controls[0].props.onClick());
  assert.equal(scenes[0].props['data-blended'], true);
  assert.equal(controls[0].props['aria-label'], '조명 혼색');
});

test('new background techniques have unique searchable metadata, mapped scenes and no helper captions', () => {
  const originals = new Set(['mg-aurora-mesh', 'mg-particle-network', 'mg-dot-matrix-grid', 'mg-god-ray-beam', 'mg-radar-sonar-sweep', 'mg-black-hole-accretion-disk']); // Signature addition covered in showcase-demos.
  const additions = TECHNIQUES.filter(item => !COLLECTION_IDS.has(item.id) && item.category === 'shader' && !originals.has(item.id));
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
