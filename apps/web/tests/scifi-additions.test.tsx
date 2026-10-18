import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { TECHNIQUES, matchesSearch } from '@vibe-dictionary/catalog';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';
import { ContourTerrainDemo } from '../src/components/demos/scifi/ContourTerrainDemo';
import { XrayDeviceDemo } from '../src/components/demos/scifi/XrayDeviceDemo';
import { PinchedCheckerDemo } from '../src/components/demos/scifi/PinchedCheckerDemo';
import { CopperTraceDemo } from '../src/components/demos/scifi/CopperTraceDemo';
import { HiddenLineDemo } from '../src/components/demos/scifi/HiddenLineDemo';
import { ImpossibleTribarDemo } from '../src/components/demos/scifi/ImpossibleTribarDemo';
import { OrthographicViewsDemo } from '../src/components/demos/scifi/OrthographicViewsDemo';
import { BallStickMoleculeDemo } from '../src/components/demos/scifi/BallStickMoleculeDemo';
import { KochSnowflakeDemo } from '../src/components/demos/scifi/KochSnowflakeDemo';
import { MobiusRibbonDemo } from '../src/components/demos/scifi/MobiusRibbonDemo';
import { LocaleProvider, useLocale } from '../src/i18n/LocaleContext';

test('language switches update every static sci-fi image name while preserving geometry and gradient references', t => {
  let changeLocale!: (locale: 'ko' | 'en') => void;
  function LocaleControl() {
    changeLocale = useLocale().setLocale;
    return null;
  }
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<LocaleProvider initialLocale="ko">
    <LocaleControl />
    <MobiusRibbonDemo /><KochSnowflakeDemo /><BallStickMoleculeDemo /><OrthographicViewsDemo />
    <ImpossibleTribarDemo /><HiddenLineDemo /><CopperTraceDemo /><PinchedCheckerDemo />
    <XrayDeviceDemo /><ContourTerrainDemo />
  </LocaleProvider>); });
  t.after(() => { act(() => tree.unmount()); });
  const imageNames = () => tree.root.findAllByProps({ role: 'img' }).map(node => node.props['aria-label'] as string);
  const visualProps = () => tree.root.findAll(node => typeof node.type === 'string').map(node => {
    const { children: _children, 'aria-label': _imageName, ...props } = node.props;
    return [node.type, props];
  });
  const koreanNames = imageNames();
  const originalVisuals = visualProps();
  assert.equal(koreanNames.length, 10);
  assert.ok(koreanNames.every(name => /[가-힣]/u.test(name)));
  act(() => { changeLocale('en'); });
  assert.deepEqual(imageNames().map(name => /[가-힣]/u.test(name)), Array(10).fill(false));
  for (const [index, expected] of [/Möbius/, /Koch/, /Methane/, /Top, front and right/, /Penrose/, /concealed/, /copper traces/, /checkerboard/, /six coils/, /golden contour/].entries()) {
    assert.match(imageNames()[index], expected);
  }
  assert.deepEqual(visualProps(), originalVisuals, 'language changes preserve all SVG geometry, colors, IDs and references');
  act(() => { changeLocale('ko'); });
  assert.deepEqual(imageNames(), koreanNames);
  assert.deepEqual(visualProps(), originalVisuals);
});

for (const [id, Component, keywords, imageName] of [
  ['st-mobius-half-twist-ribbon', MobiusRibbonDemo, ['모비우스', 'möbius strip'], /반 바퀴.*뒤집혀.*하나의 경계.*모비우스/],
  ['st-koch-fractal-outline', KochSnowflakeDemo, ['코흐 곡선', 'koch snowflake'], /정삼각형.*세 번.*자기유사.*코흐/],
  ['st-tetrahedral-ball-stick', BallStickMoleculeDemo, ['분자 모형', 'molecular model'], /탄소.*정사면체.*수소.*메테인/],
  ['st-third-angle-multiview', OrthographicViewsDemo, ['정투상', 'third angle'], /상면.*정면.*우측면.*45도.*3면/],
  ['st-penrose-impossible-tribar', ImpossibleTribarDemo, ['불가능 도형', 'penrose'], /세 보.*앞뒤.*펜로즈/],
  ['st-hidden-line-isometric', HiddenLineDemo, ['은선', 'hidden line'], /구멍 입구.*실선.*구멍 벽.*파선/],
  ['st-pcb-copper-traces', CopperTraceDemo, ['회로 기판', 'copper traces'], /칩.*배선.*비아.*기판/],
  ['st-opart-pinched-checker', PinchedCheckerDemo, ['옵아트', 'pinched checkerboard'], /중앙.*열 폭.*체커보드/],
  ['st-xray-device-shell', XrayDeviceDemo, ['엑스레이', 'x-ray'], /외피.*축.*코일/],
  ['st-holographic-contour-terrain', ContourTerrainDemo, ['등고선', 'holographic terrain'], /등고선.*지형/],
] as const) test(`${id} resolves through the public catalog and registry as a truthful static image`, t => {
  const entries = TECHNIQUES.filter(entry => entry.id === id);
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'style');
  assert.equal(item.category, 'scifi');
  for (const keyword of keywords) assert.ok(matchesSearch(item, keyword));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={item.id} />); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(Component).length, 1);
  const images = tree.root.findAllByProps({ role: 'img' });
  assert.equal(images.length, 1);
  assert.match(images[0].props['aria-label'], imageName);
  assert.equal(tree.root.findAll(node => typeof node.type === 'string' && ['button', 'input', 'a', 'text'].includes(node.type)).length, 0);
  assert.equal(tree.root.findAll(node => node.props.tabIndex !== undefined || node.props.onClick !== undefined).length, 0);
});

test('impossible tribar faces tile its silhouette once while leaving the central aperture open', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<ImpossibleTribarDemo />); });
  t.after(() => { act(() => tree.unmount()); });
  const faces = tree.root.findAllByType('polygon').map(node =>
    (node.props.points as string).split(' ').map(pair => pair.split(',').map(Number)),
  );
  assert.equal(faces.length, 3);
  for (const face of faces) for (let i = 0; i < face.length; i++) {
    const [x, y] = face[i], [nextX, nextY] = face[(i + 1) % face.length];
    const dx = nextX - x, dy = nextY - y;
    assert.ok(Math.hypot(dx, dy) > 0, 'face edges have nonzero length');
    assert.ok(Math.abs(dy) < .01 || Math.abs(Math.abs(dy / dx) - Math.sqrt(3)) < .001,
      'every beam edge follows the shared horizontal or 60-degree isometric axes');
  }
  const outer = [[122, 12], [142, 12], [202, 115.92], [192, 133.24], [72, 133.24], [62, 115.92]];
  const aperture = [[132, 63.96], [152, 98.6], [112, 98.6]];
  const contains = (polygon: number[][], x: number, y: number) => {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const a = polygon[i], b = polygon[j];
      if ((a[1] > y) !== (b[1] > y) && x < (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]) + a[0]) inside = !inside;
    }
    return inside;
  };
  // Offset probes avoid testing the ambiguous ownership of shared boundary lines.
  for (let x = 60.37; x < 204; x += 2) for (let y = 10.23; y < 136; y += 2) {
    const expected = Number(contains(outer, x, y) && !contains(aperture, x, y));
    assert.equal(faces.filter(face => contains(face, x, y)).length, expected, `face coverage at ${x},${y}`);
  }
});

test('three orthographic views preserve shared dimensions and project the same vertical bore', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<OrthographicViewsDemo />); });
  t.after(() => { act(() => tree.unmount()); });
  const top = tree.root.findByProps({ 'data-view': 'top' });
  const front = tree.root.findByProps({ 'data-view': 'front' });
  const right = tree.root.findByProps({ 'data-view': 'right' });
  const plan = top.findByType('rect').props;
  const side = right.findByType('rect').props;
  const bore = top.findByType('circle').props;
  const outline = (front.findByType('polygon').props.points as string).split(' ').map(pair => pair.split(',').map(Number));
  const frontX = [...new Set(outline.map(point => point[0]))].sort((a, b) => a - b);
  const frontY = [...new Set(outline.map(point => point[1]))].sort((a, b) => a - b);
  assert.equal(frontX.length, 3, 'front silhouette has one raised step');
  assert.equal(frontY.length, 3);
  assert.equal(frontX[0], plan.x);
  assert.equal(frontX[2] - frontX[0], plan.width, 'top and front share width');
  assert.equal(frontY[0], side.y);
  assert.equal(frontY[2] - frontY[0], side.height, 'front and side share height');
  assert.equal(plan.height, side.width, 'plan depth maps to side width without distortion');
  assert.ok(plan.y + plan.height < frontY[0], 'top sits above front');
  assert.ok(side.x > frontX[2], 'right view sits to the right of front');
  assert.equal(top.findByType('path').props.d, `M${frontX[1]} ${plan.y}V${plan.y + plan.height}`);
  assert.equal(right.findByType('path').props.d, `M${side.x} ${frontY[1]}H${side.x + side.width}`);
  assert.ok(bore.cx - bore.r > frontX[1] && bore.cx + bore.r < frontX[2], 'bore stays inside low deck');
  for (const [view, walls] of [
    [front, [bore.cx - bore.r, bore.cx + bore.r]],
    [right, [side.x + plan.y + plan.height - bore.cy - bore.r, side.x + plan.y + plan.height - bore.cy + bore.r]],
  ] as const) {
    const lines = view.findAllByType('line');
    assert.deepEqual(lines.map(line => line.props.x1), walls);
    for (const line of lines) {
      assert.equal(line.props.x1, line.props.x2);
      assert.equal(line.props.y1, frontY[1]);
      assert.equal(line.props.y2, frontY[2]);
    }
  }
  const miter = tree.root.findByProps({ className: 'sf-ortho-miter' });
  const endpoints = (miter.props.d as string).match(/-?\d+(?:\.\d+)?/g)!.map(Number);
  assert.equal(endpoints[0], side.x);
  assert.equal(endpoints[1], plan.y + plan.height);
  assert.equal(endpoints[2], side.x + side.width);
  assert.equal(endpoints[3], plan.y);
  assert.equal(endpoints[2] - endpoints[0], endpoints[1] - endpoints[3], 'depth transfer stays at 45 degrees');
});

test('ball-and-stick atoms retain tetrahedral bond geometry, real joints and contained spheres', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<BallStickMoleculeDemo />); });
  t.after(() => { act(() => tree.unmount()); });
  const atoms = tree.root.findAllByType('circle').map(node => node.props);
  const carbon = atoms.filter(atom => atom['data-element'] === 'C');
  const hydrogen = atoms.filter(atom => atom['data-element'] === 'H');
  assert.equal(carbon.length, 1);
  assert.equal(hydrogen.length, 4);
  assert.deepEqual(atoms.map(atom => atom['data-depth']), atoms.map(atom => atom['data-depth']).sort((a, b) => a - b));
  const vectors = hydrogen.map(atom => [atom.cx - carbon[0].cx, carbon[0].cy - atom.cy, atom['data-depth'] - carbon[0]['data-depth']]);
  const length = (vector: number[]) => Math.hypot(...vector);
  for (const vector of vectors) assert.ok(Math.abs(length(vector) - length(vectors[0])) < 1e-9, 'all four C-H bonds have equal model length');
  for (let i = 0; i < vectors.length; i++) for (let j = i + 1; j < vectors.length; j++) {
    const cosine = vectors[i].reduce((sum, value, axis) => sum + value * vectors[j][axis], 0) / (length(vectors[i]) * length(vectors[j]));
    assert.ok(Math.abs(cosine + 1 / 3) < 1e-12, 'every model H-C-H angle is tetrahedral');
  }
  const bonds = tree.root.findAllByProps({ className: 'sf-molecule-bond' });
  assert.equal(bonds.length, 4);
  for (let i = 0; i < bonds.length; i++) for (const line of bonds[i].findAllByType('line')) {
    assert.equal(line.props.x1, carbon[0].cx);
    assert.equal(line.props.y1, carbon[0].cy);
    assert.equal(line.props.x2, hydrogen[i].cx);
    assert.equal(line.props.y2, hydrogen[i].cy);
  }
  for (const atom of atoms) {
    assert.ok(atom.cx - atom.r - .6 > 0 && atom.cx + atom.r + .6 < 264);
    assert.ok(atom.cy - atom.r - .6 > 0 && atom.cy + atom.r + .6 < 144);
  }
  for (let i = 0; i < atoms.length; i++) for (let j = i + 1; j < atoms.length; j++) {
    assert.ok(Math.hypot(atoms[i].cx - atoms[j].cx, atoms[i].cy - atoms[j].cy) > atoms[i].r + atoms[j].r + 1.2, 'projected spheres remain distinct');
  }
  const visual = tree.root.findByProps({ 'aria-hidden': 'true' });
  assert.ok(visual.children.slice(0, 4).every(node => typeof node !== 'string' && node.props.className === 'sf-molecule-bond'), 'opaque atoms paint over all stick centers');
});

test('separate molecule cards resolve gradients only within their own SVG instance', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><BallStickMoleculeDemo /><BallStickMoleculeDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const scenes = tree.root.findAllByType('svg');
  const ids = scenes.flatMap(scene => scene.findAllByType('radialGradient').map(node => node.props.id));
  assert.equal(ids.length, 4);
  assert.equal(new Set(ids).size, 4);
  for (const scene of scenes) {
    const localIds = new Set(scene.findAllByType('radialGradient').map(node => node.props.id));
    for (const atom of scene.findAllByType('circle')) assert.ok(localIds.has(atom.props.fill.slice(5, -1)));
  }
});

test('Koch outline has three outward replacement passes, equal edges and sixfold symmetry', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<KochSnowflakeDemo />); });
  t.after(() => { act(() => tree.unmount()); });
  const shape = tree.root.findByType('polygon');
  const points = (shape.props.points as string).split(' ').map(pair => pair.split(',').map(Number));
  assert.equal(points.length, 3 * 4 ** 3);
  const expectedEdge = 57 * Math.sqrt(3) / 3 ** 3;
  let twiceArea = 0;
  for (let i = 0; i < points.length; i++) {
    const [x, y] = points[i], [nextX, nextY] = points[(i + 1) % points.length];
    assert.ok(Math.abs(Math.hypot(nextX - x, nextY - y) - expectedEdge) < 1e-10, 'all edges, including closing edge, retain one-third scale per pass');
    assert.ok(x - .75 > 0 && x + .75 < 264 && y - .75 > 0 && y + .75 < 144, 'round-join stroke remains contained');
    twiceArea += x * nextY - y * nextX;
    const rotatedX = 132 + (x - 132) / 2 - (y - 72) * Math.sqrt(3) / 2;
    const rotatedY = 72 + (x - 132) * Math.sqrt(3) / 2 + (y - 72) / 2;
    assert.ok(points.some(point => Math.hypot(point[0] - rotatedX, point[1] - rotatedY) < 1e-8), 'each vertex has a corresponding vertex after 60-degree rotation');
  }
  const initialArea = 3 * Math.sqrt(3) * 57 ** 2 / 4;
  const areaRatio = 1 + (1 + 4 / 9 + (4 / 9) ** 2) / 3;
  assert.ok(Math.abs(twiceArea / 2 - initialArea * areaRatio) < 1e-8, 'outward bumps produce the finite three-pass area, not inward notches');
  assert.equal(tree.root.findAllByType('polygon').length, 1, 'one continuous outline supplies all detail');
});

test('Möbius patches close with reversed sides and one connected boundary', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<MobiusRibbonDemo />); });
  t.after(() => { act(() => tree.unmount()); });
  const painted = tree.root.findAll(node => node.props['data-segment'] !== undefined);
  assert.equal(painted.length, 96);
  assert.deepEqual(painted.map(node => node.props['data-depth']), painted.map(node => node.props['data-depth']).sort((a, b) => a - b), 'far patches paint before near patches');
  const patches = painted.slice().sort((a, b) => a.props['data-segment'] - b.props['data-segment']);
  const quads = patches.map(patch => (patch.findByType('polygon').props.points as string).split(' ').map(pair => pair.split(',').map(Number)));
  const key = (point: number[]) => point.map(value => value.toFixed(7)).join(',');
  const graph = new Map<string, Set<string>>();
  const link = (a: number[], b: number[]) => {
    const from = key(a), to = key(b);
    assert.notEqual(from, to, 'boundary pieces have nonzero length');
    if (!graph.has(from)) graph.set(from, new Set());
    if (!graph.has(to)) graph.set(to, new Set());
    graph.get(from)!.add(to);
    graph.get(to)!.add(from);
  };
  for (let i = 0; i < patches.length; i++) {
    const quad = quads[i];
    assert.equal(quad.length, 4);
    const next = quads[(i + 1) % quads.length];
    const swapped = i === patches.length - 1;
    assert.equal(key(quad[3]), key(next[swapped ? 1 : 0]));
    assert.equal(key(quad[2]), key(next[swapped ? 0 : 1]), 'final seam reverses the width direction');
    const path = patches[i].findByType('path');
    const edge = (path.props.d as string).match(/-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/gi)!.map(Number);
    assert.deepEqual(edge, [...quad[0], ...quad[3], ...quad[1], ...quad[2]], 'only longitudinal boundaries are drawn');
    link(quad[0], quad[3]);
    link(quad[1], quad[2]);
    for (const [x, y] of quad) assert.ok(x - .55 > 0 && x + .55 < 264 && y - .55 > 0 && y + .55 < 144, 'entire boundary stroke is inside the scene');
    const style = patches[i].props.style;
    const light = Number.parseFloat(style['--sf-mobius-light']);
    const dark = Number.parseFloat(style['--sf-mobius-dark']);
    assert.ok(light >= 42 && light <= 72 && dark >= 25 && dark <= 54, 'finite surface shades stay within both theme ranges');
  }
  assert.equal(graph.size, 192);
  for (const neighbors of graph.values()) assert.equal(neighbors.size, 2, 'each boundary vertex continues without a branch or gap');
  const visited = new Set<string>();
  const pending = [graph.keys().next().value!];
  while (pending.length) {
    const vertex = pending.pop()!;
    if (visited.has(vertex)) continue;
    visited.add(vertex);
    pending.push(...graph.get(vertex)!);
  }
  assert.equal(visited.size, graph.size, 'one boundary loop, rather than two ordinary-ring loops');
});
