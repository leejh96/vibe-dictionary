import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { TECHNIQUES, matchesSearch } from '@vibe-dictionary/catalog';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';
import { DollyZoomDemo } from '../src/components/demos/camera/DollyZoomDemo';
import { OrbitCameraDemo } from '../src/components/demos/camera/OrbitCameraDemo';
import { DutchRollDemo } from '../src/components/demos/camera/DutchRollDemo';
import { ProjectionModeDemo } from '../src/components/demos/camera/ProjectionModeDemo';
import { StationaryPanDemo } from '../src/components/demos/camera/StationaryPanDemo';
import { VerticalTiltDemo } from '../src/components/demos/camera/VerticalTiltDemo';
import { LateralTruckDemo } from '../src/components/demos/camera/LateralTruckDemo';
import { PedestalRoofDemo } from '../src/components/demos/camera/PedestalRoofDemo';
import { LensShiftDemo } from '../src/components/demos/camera/LensShiftDemo';
import { RadialLensDemo } from '../src/components/demos/camera/RadialLensDemo';
import { LocaleProvider, useLocale } from '../src/i18n/LocaleContext';

test('camera language switches update accessible labels without changing controls, projection geometry or selected modes', t => {
  function LanguageSwitch() {
    const { locale, setLocale } = useLocale();
    return <button data-language-switch onClick={() => setLocale(locale === 'ko' ? 'en' : 'ko')} />;
  }
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<LocaleProvider initialLocale="ko"><LanguageSwitch /><RadialLensDemo /><LensShiftDemo /><PedestalRoofDemo /><LateralTruckDemo /><VerticalTiltDemo /><StationaryPanDemo /><ProjectionModeDemo /><DutchRollDemo /><DollyZoomDemo /><OrbitCameraDemo /></LocaleProvider>); });
  t.after(() => { act(() => tree.unmount()); });
  const ranges = [
    [RadialLensDemo, 60, 'Pincushion 60%'],
    [PedestalRoofDemo, 1.6, '1.6 · Above roof'],
    [LateralTruckDemo, 0, 'Center · Artwork hidden by pillar'],
    [VerticalTiltDemo, 25, 'Up 25 degrees'],
    [StationaryPanDemo, -20, 'Left 20 degrees'],
    [DutchRollDemo, 25, 'Right 25 degrees'],
    [DollyZoomDemo, 50, '50% · Between wide-angle and telephoto'],
    [OrbitCameraDemo, -90, '-90 degrees'],
  ] as const;
  const inputs = ranges.map(([Component, value]) => {
    const input = tree.root.findByType(Component).findByType('input');
    act(() => input.props.onChange({ currentTarget: { value: String(value) } }));
    return input;
  });
  const modes = [LensShiftDemo, ProjectionModeDemo].map(Component => {
    const buttons = tree.root.findByType(Component).findAllByType('button');
    act(() => buttons[1].props.onClick());
    return buttons;
  });
  const scenes = tree.root.findAllByType('svg');
  const geometry = () => scenes.map(scene => scene.findAll(node => typeof node.type === 'string').map(node => {
    const { d, points, x, y, width, height, cx, cy, r, rx, ry, transform } = node.props;
    return { type: node.type, d, points, x, y, width, height, cx, cy, r, rx, ry, transform };
  }));
  const before = geometry();
  const koreanValues = inputs.map(input => input.props['aria-valuetext']);
  act(() => tree.root.findByProps({ 'data-language-switch': true }).props.onClick());
  ranges.forEach(([Component, value, text], index) => {
    assert.equal(tree.root.findByType(Component).findByType('input'), inputs[index]);
    assert.equal(inputs[index].props.value, value);
    assert.equal(inputs[index].props['aria-valuetext'], text);
    assert.doesNotMatch(inputs[index].props['aria-label'], /[가-힣]/u);
  });
  for (const buttons of modes) assert.deepEqual(buttons.map(button => button.props['aria-pressed']), [false, true]);
  assert.equal(modes[0][1].children.join(''), 'Lens shift');
  assert.equal(modes[1][1].children.join(''), 'Orthographic');
  assert.deepEqual(geometry(), before);
  for (const scene of scenes) if (scene.props.role === 'img') assert.doesNotMatch(scene.props['aria-label'], /[가-힣]/u);
  assert.deepEqual(tree.root.findAllByType('svg'), scenes);
  act(() => tree.root.findByProps({ 'data-language-switch': true }).props.onClick());
  assert.deepEqual(inputs.map(input => input.props['aria-valuetext']), koreanValues);
  assert.deepEqual(geometry(), before);
  const reset = tree.root.findByType(DutchRollDemo).findByType('button');
  act(() => reset.props.onClick());
  assert.equal(inputs[5].props.value, 0);
  assert.equal(reset.props['aria-disabled'], true);
  assert.equal(reset.props.disabled, undefined);
});

test('radial lens distortion bends a shared lattice without folds, preserves optical center and reverses through an exact straight grid', t => {
  const item = TECHNIQUES.find(entry => entry.id === 'mg-radial-lens-distortion');
  assert.ok(item);
  assert.equal(item.domain, 'motion');
  assert.equal(item.category, 'camera');
  for (const keyword of ['배럴 왜곡', '핀쿠션 왜곡', 'radial lens']) assert.ok(matchesSearch(item, keyword));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><RadialLensDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [demo, other] = tree.root.findAllByType(RadialLensDemo);
  const input = demo.findByType('input');
  const scene = demo.findByProps({ className: 'ca-radial-scene' });
  const sheet = demo.findByProps({ className: 'ca-radial-sheet' });
  const columns = demo.findAll(node => typeof node.props['data-column'] === 'number');
  const rows = demo.findAll(node => typeof node.props['data-row'] === 'number');
  const points = (d: string) => [...d.matchAll(/[-\d.]+,[-\d.]+/g)].map(match => match[0].split(',').map(Number));
  const set = (value: number) => act(() => input.props.onChange({ currentTarget: { value: String(value) } }));
  assert.equal(input.props.value, -60);
  assert.equal(input.props.min, '-100');
  assert.equal(input.props.max, '100');
  assert.equal(input.props.step, '1');
  assert.equal(input.props['aria-controls'], scene.props.id);
  assert.notEqual(scene.props.id, other.findByProps({ className: 'ca-radial-scene' }).props.id);
  assert.equal(columns.length, 9);
  assert.equal(rows.length, 6);
  const initialSheet = sheet.props.d;
  const initialGrid = [...columns, ...rows].map(line => line.props.d);
  for (let strength = -100; strength <= 100; strength++) {
    set(strength);
    const verticals = columns.map(column => points(column.props.d));
    const horizontals = rows.map(row => points(row.props.d));
    const border = points(sheet.props.d);
    const borderSet = new Set(border.map(point => point.join(',')));
    assert.equal(border.length, 208);
    for (const line of [...verticals, ...horizontals]) {
      assert.ok(borderSet.has(line[0].join(',')) && borderSet.has(line[line.length - 1].join(',')), 'all lattice lines end on the same sampled sheet boundary');
      for (const [x, y] of line) assert.ok(Number.isFinite(x) && Number.isFinite(y) && x > 1.5 && x < 262.5 && y > 1.5 && y < 146.5, 'even strongest distortion and stroke remain contained');
    }
    for (let column = 0; column < columns.length; column++) {
      for (let row = 0; row < rows.length; row++) assert.deepEqual(verticals[column][row * 8], horizontals[row][column * 8], 'sampled curves must share every lattice intersection exactly');
      const mirrored = verticals[8 - column];
      verticals[column].forEach(([x, y], index) => {
        assert.ok(Math.abs(x + mirrored[index][0] - 264) < 1e-9);
        assert.equal(y, mirrored[index][1]);
      });
    }
    assert.deepEqual(verticals[4][20], [132, 74]);
    for (let index = 1; index < verticals[4].length; index++) assert.ok(verticals[4][index][1] > verticals[4][index - 1][1], 'radial mapping stays monotonic through the optical axis');
    for (let column = 0; column < 8; column++) for (let row = 0; row < 5; row++) {
      const cell = [verticals[column][row * 8], verticals[column + 1][row * 8], verticals[column + 1][(row + 1) * 8], verticals[column][(row + 1) * 8]];
      const area = cell.reduce((sum, [x, y], index) => sum + x * cell[(index + 1) % 4][1] - cell[(index + 1) % 4][0] * y, 0);
      assert.ok(area > 0, 'no cell can flip or collapse at an intermediate strength');
    }
    const right = verticals[8];
    const bow = right[20][0] - right[0][0];
    if (strength < 0) assert.ok(bow > 0, 'barrel border bows outward between its corners');
    if (strength > 0) assert.ok(bow < 0, 'pincushion corners expand farther than the border midpoint');
    const nearScale = Math.hypot(verticals[5][24][0] - 132, verticals[5][24][1] - 74) / Math.hypot(.25, .125);
    const farScale = Math.hypot(right[40][0] - 132, right[40][1] - 74) / Math.hypot(1, .625);
    if (strength < 0) assert.ok(farScale < nearScale);
    if (strength > 0) assert.ok(farScale > nearScale);
    if (strength === 0) {
      for (const line of verticals) assert.ok(line.every(([x]) => x === line[0][0]));
      for (const line of horizontals) assert.ok(line.every(([, y]) => y === line[0][1]));
      assert.equal(input.props['aria-valuetext'], '왜곡 없음');
    }
    assert.equal(other.findByType('input').props.value, -60);
  }
  assert.equal(input.props['aria-valuetext'], '핀쿠션 100%');
  for (const value of [-100, 100, 0, -60]) set(value);
  assert.equal(sheet.props.d, initialSheet);
  assert.deepEqual([...columns, ...rows].map(line => line.props.d), initialGrid);
  assert.equal(demo.findByProps({ className: 'ca-radial-sheet' }), sheet);
  assert.equal(demo.findByProps({ className: 'ca-radial-scene' }), scene);
  assert.equal(demo.findByType('input'), input);
});

test('lens shift preserves a common framing target while keeping verticals parallel and depth perspective intact', t => {
  const item = TECHNIQUES.find(entry => entry.id === 'mg-architectural-lens-shift');
  assert.ok(item);
  assert.equal(item.domain, 'motion');
  assert.equal(item.category, 'camera');
  for (const keyword of ['렌즈 시프트', '수직선 보정', 'lens shift']) assert.ok(matchesSearch(item, keyword));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><LensShiftDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [demo, other] = tree.root.findAllByType(LensShiftDemo);
  const scene = demo.findByProps({ className: 'ca-shift-scene' });
  const buttons = demo.findAllByType('button');
  const tower = demo.findByProps({ 'data-facade': 'tower' });
  const points = (value: string) => value.split(' ').map(point => point.split(',').map(Number));
  const segment = (value: string) => [...value.matchAll(/[-\d.]+/g)].map(match => Number(match[0]));
  const cross = (a: number[], b: number[], p: number[]) => (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]);
  const windows = demo.findByProps({ className: 'ca-shift-windows' }).findAllByType('path');
  const initialTower = tower.props.points;
  const initialWindows = windows.map(window => window.props.d);
  const initialGround = demo.findByProps({ className: 'ca-shift-ground' }).props.y;
  assert.deepEqual(buttons.map(button => button.props['aria-pressed']), [true, false]);
  assert.equal(buttons[0].props['aria-controls'], scene.props.id);
  assert.equal(buttons[1].props['aria-controls'], scene.props.id);
  assert.notEqual(scene.props.id, other.findByProps({ className: 'ca-shift-scene' }).props.id);
  assert.equal(demo.findByProps({ className: 'ca-shift-control' }).props['aria-label'], '건축 구도 방식');
  const assertWorld = () => {
    const p = points(tower.props.points);
    for (const face of demo.findAll(node => typeof node.props['data-facade'] === 'string')) {
      for (const [x, y] of points(face.props.points)) assert.ok(Number.isFinite(x) && Number.isFinite(y) && x > 0 && x < 264 && y > 0 && y < 148);
    }
    for (const window of windows.slice(0, 7)) {
      const [x1, y1, x2, y2] = segment(window.props.d);
      assert.ok(Math.abs(cross(p[0], p[3], [x1, y1])) < 1e-8);
      assert.ok(Math.abs(cross(p[1], p[2], [x2, y2])) < 1e-8);
    }
    for (const window of windows.slice(7)) {
      const [x1, y1, x2, y2] = segment(window.props.d);
      assert.ok(Math.abs(cross(p[0], p[1], [x1, y1])) < 1e-8);
      assert.ok(Math.abs(cross(p[3], p[2], [x2, y2])) < 1e-8);
    }
    const centerRow = segment(windows[3].props.d);
    assert.ok(Math.abs(centerRow[1] - 74) < 1e-9 && Math.abs(centerRow[3] - 74) < 1e-9, 'same world midheight stays at the same framing center');
    assert.ok(Math.abs((centerRow[0] + centerRow[2]) / 2 - 132) < 1e-9);
    const horizon = demo.findByProps({ className: 'ca-shift-ground' }).props.y;
    assert.ok(Math.abs(horizon - initialGround) < 1e-9, 'the matched framing leaves the same horizon');
    for (const ray of demo.findByProps({ className: 'ca-shift-grid' }).findAllByType('path')) {
      const [x1, y1, x2, y2] = segment(ray.props.d);
      assert.ok(y1 > y2 && y2 > horizon);
      assert.ok(Math.abs(cross([x1, y1], [x2, y2], [132, horizon])) < 1e-8, 'shifted projection must retain the floor depth vanishing point, unlike orthographic projection');
    }
  };
  assertWorld();
  const tilted = points(tower.props.points);
  assert.ok(tilted[2][0] - tilted[3][0] < tilted[1][0] - tilted[0][0], 'normal upward tilt narrows the crown');
  assert.ok(tilted[3][0] > tilted[0][0] && tilted[2][0] < tilted[1][0]);
  act(() => buttons[1].props.onClick());
  assert.deepEqual(buttons.map(button => button.props['aria-pressed']), [false, true]);
  assertWorld();
  const shifted = points(tower.props.points);
  assert.equal(shifted[0][0], shifted[3][0]);
  assert.equal(shifted[1][0], shifted[2][0]);
  const rows = windows.slice(0, 7).map(window => segment(window.props.d)[1]);
  for (let index = 2; index < rows.length; index++) assert.ok(Math.abs((rows[index] - rows[index - 1]) - (rows[1] - rows[0])) < 1e-9);
  assert.equal(scene.props['aria-label'], '카메라를 수평으로 유지한 수직 렌즈 시프트 건축 입면');
  assert.deepEqual(other.findAllByType('button').map(button => button.props['aria-pressed']), [true, false]);
  const shiftGeometry = tower.props.points;
  act(() => { buttons[1].props.onClick(); buttons[1].props.onClick(); });
  assert.equal(tower.props.points, shiftGeometry);
  for (const index of [0, 1, 0, 1, 0]) act(() => buttons[index].props.onClick());
  assert.equal(tower.props.points, initialTower);
  assert.deepEqual(windows.map(window => window.props.d), initialWindows);
  assert.equal(demo.findByProps({ className: 'ca-shift-scene' }), scene);
  assert.equal(demo.findByProps({ 'data-facade': 'tower' }), tower);
  assert.equal(demo.findAllByType('button')[1], buttons[1]);
});

test('pedestal elevation reveals only physically visible roof geometry while keeping level view, shared edges and ground contact', t => {
  const item = TECHNIQUES.find(entry => entry.id === 'mg-pedestal-roof-reveal');
  assert.ok(item);
  assert.equal(item.domain, 'motion');
  assert.equal(item.category, 'camera');
  for (const keyword of ['페데스탈', '카메라 상승', 'pedestal shot']) assert.ok(matchesSearch(item, keyword));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><PedestalRoofDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [demo, other] = tree.root.findAllByType(PedestalRoofDemo);
  const scene = demo.findByProps({ className: 'ca-pedestal-scene' });
  const input = demo.findByType('input');
  const front = demo.findByProps({ className: 'ca-pedestal-front' });
  const left = demo.findByProps({ className: 'ca-pedestal-left' });
  const points = (value: string) => value.trim().split(' ').map(point => point.split(',').map(Number));
  const polygon = (className: string) => points(demo.findByProps({ className }).props.points);
  const cross = (a: number[], b: number[], p: number[]) => (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]);
  const initialFront = front.props.points;
  const initialLeft = left.props.points;
  const initialWindows = demo.findByProps({ className: 'ca-pedestal-windows' }).findAllByType('polygon').map(window => window.props.points);
  const set = (value: number) => act(() => input.props.onChange({ currentTarget: { value: String(value) } }));
  assert.equal(input.props.value, .5);
  assert.equal(input.props.min, '0.5');
  assert.equal(input.props.max, '3.2');
  assert.equal(input.props.step, '0.1');
  assert.equal(input.props['aria-controls'], scene.props.id);
  assert.notEqual(scene.props.id, other.findByProps({ className: 'ca-pedestal-scene' }).props.id);
  assert.equal(demo.findByProps({ className: 'ca-pedestal-control' }).findAllByType('svg').length, 2);
  let previousRoofArea = 0;
  for (let tick = 5; tick <= 32; tick++) {
    const height = tick / 10;
    set(height);
    assert.equal(demo.findByProps({ className: 'ca-pedestal-horizon' }).props.d, 'M0 74H264');
    assert.equal(other.findByType('input').props.value, .5);
    for (const [node, initial] of [[front, initialFront], [left, initialLeft]] as const) {
      const current = points(node.props.points);
      const original = points(initial);
      current.forEach((point, index) => {
        assert.equal(point[0], original[index][0], 'raising a level camera cannot change the horizontal projection');
        assert.ok(point.every(Number.isFinite));
        assert.ok(point[0] > 0 && point[0] < 264 && point[1] > 0 && point[1] < 148, 'the entire building stays in frame');
      });
      assert.equal(current[0][0], current[3][0]);
      assert.equal(current[1][0], current[2][0]);
      assert.ok(Math.abs((current[0][1] - current[3][1]) - (original[0][1] - original[3][1])) < 1e-9, 'vertical edges retain length because depth and focal length are fixed');
    }
    assert.equal(front.props.points.split(' ').filter((point: string) => left.props.points.split(' ').includes(point)).length, 2);
    const gridLines = demo.findByProps({ className: 'ca-pedestal-grid' }).findAllByType('path').map(path => [...path.props.d.matchAll(/[-\d.]+/g)].map(match => Number(match[0])));
    const nearCorner = polygon('ca-pedestal-front')[0];
    for (const index of [2, 3]) {
      const [x1, y1, x2, y2] = gridLines[index];
      assert.ok(Math.abs(cross([x1, y1], [x2, y2], nearCorner)) < 1e-8, 'front corner stays at the same actual floor-grid intersection');
    }
    assert.equal(demo.findAllByProps({ className: 'ca-pedestal-roof' }).length, height > 1.5 ? 1 : 0);
    if (height > 1.5) {
      const roof = polygon('ca-pedestal-top');
      const area = Math.abs(roof.reduce((sum, point, index) => sum + point[0] * roof[(index + 1) % 4][1] - roof[(index + 1) % 4][0] * point[1], 0)) / 2;
      assert.ok(area > previousRoofArea, 'roof grows continuously from an edge as the camera crosses its height');
      previousRoofArea = area;
      for (const face of [front, left]) assert.equal(face.props.points.split(' ').filter((point: string) => demo.findByProps({ className: 'ca-pedestal-top' }).props.points.split(' ').includes(point)).length, 2);
      const ring = demo.findByProps({ className: 'ca-pedestal-ring' });
      assert.equal(ring.props.fillRule, 'evenodd');
      const ringPoints = [...ring.props.d.matchAll(/[-\d.]+,[-\d.]+/g)].map(match => match[0].split(',').map(Number));
      assert.equal(ringPoints.length, 64);
      for (const point of [...ringPoints, ...polygon('ca-pedestal-mark')]) {
        const signs = roof.map((corner, index) => cross(corner, roof[(index + 1) % 4], point));
        assert.ok(signs.every(sign => sign > 0) || signs.every(sign => sign < 0), 'the planar ring thickness and H must remain inside even the first thin visible roof');
      }
    }
  }
  const originalNearY = points(initialFront)[0][1];
  const nearTravel = polygon('ca-pedestal-front')[0][1] - originalNearY;
  const farTravel = polygon('ca-pedestal-left')[0][1] - points(initialLeft)[0][1];
  assert.ok(nearTravel > farTravel, 'different depths must not be replaced with a uniform vertical translate');
  assert.equal(input.props['aria-valuetext'], '3.2 · 지붕 위');
  for (const value of [1.5, 3.2, .5, 1.6, 1.4, .5]) set(value);
  assert.equal(front.props.points, initialFront);
  assert.equal(left.props.points, initialLeft);
  assert.deepEqual(demo.findByProps({ className: 'ca-pedestal-windows' }).findAllByType('polygon').map(window => window.props.points), initialWindows);
  assert.equal(demo.findByProps({ className: 'ca-pedestal-front' }), front);
  assert.equal(demo.findByProps({ className: 'ca-pedestal-scene' }), scene);
  assert.equal(demo.findByType('input'), input);
});

test('lateral trucking changes inverse-depth displacement and physical occlusion without rotating or resizing the world', t => {
  const item = TECHNIQUES.find(entry => entry.id === 'mg-lateral-camera-truck');
  assert.ok(item);
  assert.equal(item.domain, 'motion');
  assert.equal(item.category, 'camera');
  for (const keyword of ['트럭 샷', '카메라 수평 이동', 'trucking shot']) assert.ok(matchesSearch(item, keyword));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><LateralTruckDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [demo, other] = tree.root.findAllByType(LateralTruckDemo);
  const scene = demo.findByProps({ className: 'ca-truck-scene' });
  const input = demo.findByType('input');
  const art = demo.findByProps({ className: 'ca-truck-frame' });
  const pillar = demo.findByProps({ 'data-face': 'front' });
  const points = (node: typeof art) => node.props.points.split(' ').map((point: string) => point.split(',').map(Number));
  const bounds = (node: typeof art) => {
    const coordinates = points(node);
    return { left: Math.min(...coordinates.map((p: number[]) => p[0])), right: Math.max(...coordinates.map((p: number[]) => p[0])), top: Math.min(...coordinates.map((p: number[]) => p[1])), bottom: Math.max(...coordinates.map((p: number[]) => p[1])) };
  };
  const set = (value: number) => act(() => input.props.onChange({ currentTarget: { value: String(value) } }));
  assert.equal(input.props.value, -30);
  assert.equal(input.props.min, '-30');
  assert.equal(input.props.max, '30');
  assert.equal(input.props.step, '1');
  assert.equal(input.props['aria-controls'], scene.props.id);
  assert.notEqual(scene.props.id, other.findByProps({ className: 'ca-truck-scene' }).props.id);
  assert.equal(scene.props.role, 'img');
  assert.equal(demo.findByProps({ className: 'ca-truck-control' }).findAllByType('svg').length, 2);
  const initialArt = art.props.points;
  const initialPillar = pillar.props.points;
  const artSize = bounds(art);
  const pillarSize = bounds(pillar);
  const facePoints = () => demo.findAll(node => typeof node.props['data-face'] === 'string').flatMap(face => points(face));
  assert.ok(bounds(art).right < Math.min(...facePoints().map((p: number[]) => p[0])), 'left endpoint fully reveals artwork left of the entire pillar, including its side');
  const sceneChildren = scene.findByType('g').children;
  assert.ok(sceneChildren.indexOf(demo.findByProps({ className: 'ca-truck-art' })) < sceneChildren.indexOf(demo.findByProps({ className: 'ca-truck-pillar' })), 'opaque physical pillar must paint after the art');
  for (let value = -30; value <= 30; value++) {
    set(value);
    const a = bounds(art);
    const p = bounds(pillar);
    assert.ok(Math.abs((a.right - a.left) - (artSize.right - artSize.left)) < 1e-9);
    assert.ok(Math.abs((p.right - p.left) - (pillarSize.right - pillarSize.left)) < 1e-9);
    assert.equal(a.top, artSize.top);
    assert.equal(a.bottom, artSize.bottom);
    assert.equal(p.top, pillarSize.top);
    assert.equal(p.bottom, pillarSize.bottom);
    const artTravel = a.left - artSize.left;
    const pillarTravel = p.left - pillarSize.left;
    assert.ok(Math.abs(pillarTravel - artTravel * 2.5) < 1e-9, 'depth9 / depth3.6 determines relative displacement');
    const sides = demo.findAll(node => node.props['data-face'] === 'left' || node.props['data-face'] === 'right');
    assert.equal(sides.length, Math.abs(value / 10) > .65 ? 1 : 0);
    if (sides.length) {
      assert.equal(sides[0].props['data-face'], value < 0 ? 'left' : 'right');
      const shared = sides[0].props.points.split(' ').filter((point: string) => pillar.props.points.split(' ').includes(point));
      assert.equal(shared.length, 2, 'front and side share exact physical vertices');
    }
    for (const coordinate of facePoints().flat()) assert.ok(Number.isFinite(coordinate));
    assert.equal(demo.findByProps({ className: 'ca-truck-horizon' }).props.d, 'M0 74H264');
    assert.equal(other.findByType('input').props.value, -30);
    if (value === 0) {
      assert.ok(p.left < a.left && p.right > a.right && p.top < a.top && p.bottom > a.bottom, 'central pillar fully occludes the frame');
      assert.equal(input.props['aria-valuetext'], '중앙 · 작품이 기둥에 가려짐');
    }
  }
  assert.ok(bounds(art).left > Math.max(...facePoints().map((p: number[]) => p[0])), 'right endpoint fully reveals artwork right of the entire pillar');
  for (const value of [0, 29, -29, 30, -30]) set(value);
  assert.equal(art.props.points, initialArt);
  assert.equal(pillar.props.points, initialPillar);
  assert.equal(demo.findByProps({ className: 'ca-truck-frame' }), art);
  assert.equal(demo.findByProps({ className: 'ca-truck-scene' }), scene);
  assert.equal(demo.findByType('input'), input);
});

test('vertical tilt reveals the crown with a moving horizon and changing vertical convergence instead of translating a facade', t => {
  const item = TECHNIQUES.find(entry => entry.id === 'mg-vertical-camera-tilt');
  assert.ok(item);
  assert.equal(item.domain, 'motion');
  assert.equal(item.category, 'camera');
  for (const keyword of ['카메라 틸트', '틸트 업', 'tilt shot']) assert.ok(matchesSearch(item, keyword));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><VerticalTiltDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [demo, other] = tree.root.findAllByType(VerticalTiltDemo);
  const input = demo.findByType('input');
  const scene = demo.findByProps({ className: 'ca-tilt-scene' });
  const tower = demo.findByProps({ 'data-facade': 'tower' });
  const points = () => tower.props.points.split(' ').map((point: string) => point.split(',').map(Number));
  const intersection = (a: number[], b: number[], c: number[], d: number[]) => {
    const denominator = (a[0] - b[0]) * (c[1] - d[1]) - (a[1] - b[1]) * (c[0] - d[0]);
    return [
      ((a[0] * b[1] - a[1] * b[0]) * (c[0] - d[0]) - (a[0] - b[0]) * (c[0] * d[1] - c[1] * d[0])) / denominator,
      ((a[0] * b[1] - a[1] * b[0]) * (c[1] - d[1]) - (a[1] - b[1]) * (c[0] * d[1] - c[1] * d[0])) / denominator,
    ];
  };
  const initial = tower.props.points;
  assert.equal(input.props.value, 0);
  assert.ok(points()[2][1] < 0, 'the crown starts above the frame');
  assert.equal(input.props['aria-controls'], scene.props.id);
  assert.notEqual(scene.props.id, other.findByProps({ className: 'ca-tilt-scene' }).props.id);
  assert.equal(demo.findByProps({ className: 'ca-tilt-control' }).findAllByType('svg').length, 2);
  let previousHorizon = -Infinity;
  for (let angle = -10; angle <= 25; angle++) {
    act(() => input.props.onChange({ currentTarget: { value: String(angle) } }));
    const horizon = demo.findByProps({ className: 'ca-tilt-ground' }).props.y;
    assert.ok(horizon > previousHorizon);
    previousHorizon = horizon;
    const vertices = points();
    const bottomWidth = vertices[1][0] - vertices[0][0];
    const topWidth = vertices[2][0] - vertices[3][0];
    for (const line of demo.findByProps({ className: 'ca-tilt-windows' }).findAllByType('path').slice(0, 10)) {
      const [leftX, leftY, rightX, rightY] = line.props.d.match(/-?[\d.]+/g).map(Number);
      for (const [x, y, bottom, top] of [[leftX, leftY, vertices[0], vertices[3]], [rightX, rightY, vertices[1], vertices[2]]]) {
        assert.ok(Math.abs((x - bottom[0]) * (top[1] - bottom[1]) - (y - bottom[1]) * (top[0] - bottom[0])) < 1e-8, 'window rows must remain joined to the projected facade edges');
      }
    }
    if (angle === 0) assert.equal(bottomWidth, topWidth);
    else {
      const vp = intersection(vertices[0], vertices[3], vertices[1], vertices[2]);
      assert.ok(Math.abs(vp[0] - 132) < 1e-8);
      assert.ok(angle > 0 ? vp[1] < 0 && topWidth < bottomWidth : vp[1] > 148 && topWidth > bottomWidth);
    }
    const lines = demo.findAllByProps({ 'data-axis': 'depth' }).map(line => line.props.d.match(/-?[\d.]+/g).map(Number));
    const floorVp = intersection(lines[0].slice(0, 2), lines[0].slice(2), lines[4].slice(0, 2), lines[4].slice(2));
    assert.ok(Math.abs(floorVp[1] - horizon) < 1e-8, 'ground lines and horizon must use the same camera pitch');
    assert.equal(other.findByType('input').props.value, 0);
  }
  assert.ok(points()[2][1] > 0 && points()[2][1] < 148, 'tilting up reveals the crown');
  assert.ok(points()[0][1] > 148, 'the base leaves the bottom as the camera looks up');
  assert.equal(input.props['aria-valuetext'], '위로 25도');
  act(() => input.props.onChange({ currentTarget: { value: '0' } }));
  assert.equal(tower.props.points, initial);
  assert.equal(demo.findByProps({ 'data-facade': 'tower' }), tower);
  assert.equal(demo.findByProps({ className: 'ca-tilt-scene' }), scene);
  assert.equal(demo.findByType('input'), input);
});

test('stationary pan changes perspective rather than translating scenery while preserving its horizon, vertical vanishing point and visible faces', t => {
  const item = TECHNIQUES.find(entry => entry.id === 'mg-stationary-camera-pan');
  assert.ok(item);
  assert.equal(item.domain, 'motion');
  assert.equal(item.category, 'camera');
  for (const keyword of ['수평 팬', '카메라 팬', 'pan shot']) assert.ok(matchesSearch(item, keyword));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><StationaryPanDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [demo, other] = tree.root.findAllByType(StationaryPanDemo);
  const input = demo.findByType('input');
  const scene = demo.findByProps({ className: 'ca-pan-scene' });
  const control = demo.findByProps({ className: 'ca-pan-control' });
  const directionIcons = control.findAllByType('svg');
  assert.equal(directionIcons.length, 2);
  for (const icon of directionIcons) assert.equal(icon.props['aria-hidden'], 'true');
  assert.equal(control.findAllByType('span').length, 0);
  const monument = (id: string) => demo.findByProps({ 'data-monument': id });
  const points = (id: string, face = 'front') => monument(id).findByProps({ 'data-face': face }).props.points.split(' ').map((point: string) => point.split(',').map(Number));
  const initial = monument('center').findByProps({ 'data-face': 'front' }).props.points;
  const initialWidth = points('center')[1][0] - points('center')[0][0];
  const horizon = demo.findByProps({ className: 'ca-pan-horizon' }).props.d;
  const horizonY = demo.findByProps({ className: 'ca-pan-ground' }).props.y;
  const verticalVp = [132, 74 + 230 / Math.tan(12 * Math.PI / 180)];
  assert.equal(input.props.value, 0);
  assert.equal(input.props['aria-controls'], scene.props.id);
  assert.notEqual(scene.props.id, other.findByProps({ className: 'ca-pan-scene' }).props.id);
  for (let angle = -20; angle <= 20; angle++) {
    act(() => input.props.onChange({ currentTarget: { value: String(angle) } }));
    assert.equal(demo.findByProps({ className: 'ca-pan-horizon' }).props.d, horizon);
    const depthLines = demo.findAllByProps({ 'data-axis': 'depth' }).map(line => line.props.d.match(/-?[\d.]+/g).map(Number));
    const [x1, y1, x2, y2] = depthLines[0];
    const [x3, y3, x4, y4] = depthLines[depthLines.length - 1];
    const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    const intersectionY = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / denominator;
    assert.ok(Math.abs(intersectionY - horizonY) < 1e-8, 'the actual floor grid must meet the actual fixed horizon');
    for (const id of ['left', 'center', 'right']) {
      const faces = monument(id).findAllByType('polygon');
      assert.equal(faces.length, id === 'center' ? 2 : 3);
      const front = points(id);
      const top = points(id, 'top');
      assert.equal(front.filter((point: number[]) => top.some((other: number[]) => point.every((value, index) => value === other[index]))).length, 2);
      if (id !== 'center') {
        const side = points(id, 'side');
        for (const adjacent of [front, top]) assert.equal(side.filter((point: number[]) => adjacent.some((other: number[]) => point.every((value, index) => value === other[index]))).length, 2);
      }
      for (const [a, b] of [[front[0], front[3]], [front[1], front[2]]]) {
        const cross = (a[0] - verticalVp[0]) * (b[1] - verticalVp[1]) - (a[1] - verticalVp[1]) * (b[0] - verticalVp[0]);
        assert.ok(Math.abs(cross) < 1e-7, 'world verticals must retain the fixed-pitch vanishing point');
      }
      for (const face of faces) for (const coordinate of face.props.points.split(/[ ,]/).map(Number)) assert.ok(Number.isFinite(coordinate));
    }
    assert.equal(other.findByType('input').props.value, 0);
  }
  assert.ok(points('center').every((point: number[]) => point[0] < 132), 'a right pan moves the former central monument to the left');
  assert.ok(Math.abs((points('center')[1][0] - points('center')[0][0]) - initialWidth) > 1, 'a true yaw changes projected width, unlike a flat image translation');
  assert.equal(input.props['aria-valuetext'], '오른쪽 20도');
  act(() => input.props.onChange({ currentTarget: { value: '0' } }));
  assert.equal(monument('center').findByProps({ 'data-face': 'front' }).props.points, initial);
  assert.equal(input.props['aria-valuetext'], '정면');
  assert.equal(demo.findByProps({ className: 'ca-pan-scene' }), scene);
  assert.equal(demo.findByType('input'), input);
});

test('projection switch equalizes same-world panel edges and parallelizes depth lines without changing scene identity', t => {
  const item = TECHNIQUES.find(entry => entry.id === 'mg-projection-mode-switch');
  assert.ok(item);
  assert.equal(item.domain, 'motion');
  assert.equal(item.category, 'camera');
  for (const keyword of ['정투영', '직교 투영', 'orthographic']) assert.ok(matchesSearch(item, keyword));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><ProjectionModeDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [demo, other] = tree.root.findAllByType(ProjectionModeDemo);
  const scene = demo.findByType('svg');
  const buttons = demo.findAllByType('button');
  const panel = (name: string) => demo.findByProps({ 'data-panel': name }).findByType('polygon');
  const points = (name: string) => panel(name).props.points.split(' ').map((point: string) => point.split(',').map(Number));
  const edgeLengths = (name: string) => {
    const vertices = points(name);
    return vertices.map((point: number[], index: number) => {
      const next = vertices[(index + 1) % vertices.length];
      return Math.hypot(next[0] - point[0], next[1] - point[1]);
    });
  };
  const grid = () => demo.findAllByProps({ 'data-axis': 'depth' }).map(line => line.props.d.match(/-?[\d.]+/g).map(Number));
  const assertGroundContact = () => {
    const crossLines = demo.findAllByProps({ 'data-axis': 'width' }).map(line => line.props.d.match(/-?[\d.]+/g).map(Number));
    for (const [name, row] of [['near', 5], ['far', 1]] as const) {
      const [x1, y1, x2, y2] = crossLines[row];
      for (const [x, y] of points(name).slice(0, 2)) assert.ok(Math.abs((x - x1) * (y2 - y1) - (y - y1) * (x2 - x1)) < 1e-9, 'panel base must touch its ground grid row');
    }
    const allPoints = [...points('near'), ...points('far'), ...demo.findByProps({ className: 'ca-projection-floor' }).props.points.split(' ').map((point: string) => point.split(',').map(Number))];
    for (const [x, y] of allPoints) assert.ok(x > 0 && x < 264 && y > 0 && y < 148);
  };
  const initial = panel('near').props.points;
  const originalPanel = panel('near');
  assert.notEqual(scene.props.id, other.findByType('svg').props.id);
  assert.deepEqual(buttons.map(button => button.props['aria-pressed']), [true, false]);
  for (const button of buttons) assert.equal(button.props['aria-controls'], scene.props.id);
  assert.ok(edgeLengths('near')[0] > edgeLengths('far')[0]);
  assertGroundContact();
  const perspective = grid();
  assert.ok(Math.abs(perspective[0][0] - perspective[6][0]) < Math.abs(perspective[0][2] - perspective[6][2]), 'grid edges converge into depth under perspective');
  act(() => buttons[1].props.onClick());
  assert.deepEqual(buttons.map(button => button.props['aria-pressed']), [false, true]);
  edgeLengths('near').forEach((length: number, index: number) => assert.ok(Math.abs(length - edgeLengths('far')[index]) < 1e-9));
  assertGroundContact();
  const orthographic = grid();
  const first = [orthographic[0][2] - orthographic[0][0], orthographic[0][3] - orthographic[0][1]];
  for (const [x1, y1, x2, y2] of orthographic) assert.ok(Math.abs(first[0] * (y2 - y1) - first[1] * (x2 - x1)) < 1e-9);
  assert.equal(scene.props['aria-label'], '정투영으로 본 같은 크기의 앞뒤 패널과 바닥 격자');
  assert.deepEqual(other.findAllByType('button').map(button => button.props['aria-pressed']), [true, false]);
  act(() => { buttons[1].props.onClick(); buttons[1].props.onClick(); });
  assert.deepEqual(buttons.map(button => button.props['aria-pressed']), [false, true]);
  assert.equal(panel('near'), originalPanel);
  act(() => buttons[0].props.onClick());
  assert.equal(panel('near').props.points, initial);
  assert.equal(demo.findByType('svg'), scene);
  assert.equal(demo.findAllByType('button')[0], buttons[0]);
});

test('Dutch camera roll tilts the whole world opposite to the camera, covers every viewport corner and restores a fixed frame', t => {
  const item = TECHNIQUES.find(entry => entry.id === 'mg-dutch-camera-roll');
  assert.ok(item);
  assert.equal(item.domain, 'motion');
  assert.equal(item.category, 'camera');
  for (const keyword of ['더치 앵글', '카메라 롤', 'dutch angle']) assert.ok(matchesSearch(item, keyword));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><DutchRollDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [demo, other] = tree.root.findAllByType(DutchRollDemo);
  const scene = demo.findByProps({ className: 'ca-roll-scene' });
  const world = demo.findByProps({ className: 'ca-roll-world' });
  const frame = demo.findByProps({ className: 'ca-roll-viewfinder' });
  const input = demo.findByType('input');
  const reset = demo.findByType('button');
  const originalCity = world.findByProps({ className: 'ca-roll-city' }).props.d;
  const framePath = frame.props.d;
  assert.equal(input.props.value, 0);
  assert.equal(reset.props['aria-disabled'], true);
  assert.equal(reset.props['aria-controls'], scene.props.id);
  assert.equal(input.props['aria-controls'], scene.props.id);
  assert.notEqual(scene.props.id, other.findByProps({ className: 'ca-roll-scene' }).props.id);
  assert.equal(world.findByProps({ className: 'ca-roll-horizon' }).props.d, 'M-60 84H324');
  assert.ok(!world.findAllByType('path').includes(frame), 'the viewfinder must stay outside the rolled world');
  const background = world.findByProps({ className: 'ca-roll-sky' }).props;
  for (let roll = -25; roll <= 25; roll++) {
    act(() => input.props.onChange({ currentTarget: { value: String(roll) } }));
    assert.equal(reset.props['aria-disabled'], roll === 0);
    const rotation = Number(world.props.transform.match(/^rotate\(([-\d]+) 132 74\)$/)[1]);
    assert.equal(rotation, -roll || 0);
    // Invert the actual world transform and check that the source contains every visible corner.
    const radians = -rotation * Math.PI / 180;
    for (const [x, y] of [[0, 0], [264, 0], [0, 148], [264, 148]]) {
      const sourceX = 132 + (x - 132) * Math.cos(radians) - (y - 74) * Math.sin(radians);
      const sourceY = 74 + (x - 132) * Math.sin(radians) + (y - 74) * Math.cos(radians);
      assert.ok(sourceX > Number(background.x) && sourceX < Number(background.x) + Number(background.width));
      assert.ok(sourceY > Number(background.y) && sourceY < Number(background.y) + Number(background.height));
    }
    assert.equal(frame.props.d, framePath);
    assert.equal(frame.props.transform, undefined);
    assert.equal(scene.props.transform, undefined);
    assert.equal(world.findByProps({ className: 'ca-roll-city' }).props.d, originalCity);
    assert.equal(other.findByType('input').props.value, 0);
  }
  assert.equal(input.props['aria-valuetext'], '오른쪽 25도');
  act(() => reset.props.onClick());
  assert.equal(input.props.value, 0);
  assert.equal(input.props['aria-valuetext'], '0도 · 수평');
  assert.equal(world.props.transform, 'rotate(0 132 74)');
  assert.equal(reset.props['aria-disabled'], true);
  assert.equal(reset.props.disabled, undefined, 'returning to level must not disable the focused button');
  act(() => reset.props.onClick());
  assert.equal(input.props.value, 0);
  assert.equal(demo.findByType('button'), reset);
  assert.equal(demo.findByType('input'), input);
});

test('orbit camera reveals opposite physical faces with joined projected edges, a closed full turn and independent input', t => {
  const item = TECHNIQUES.find(entry => entry.id === 'mg-orbit-camera-view');
  assert.ok(item);
  assert.equal(item.category, 'camera');
  assert.equal(item.domain, 'motion');
  for (const keyword of ['오빗 카메라', '오비트', 'orbit camera']) assert.ok(matchesSearch(item, keyword));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><OrbitCameraDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [demo, other] = tree.root.findAllByType(OrbitCameraDemo);
  const input = demo.findByType('input');
  const scene = demo.findByType('svg');
  const faces = () => demo.findAll(node => typeof node.props['data-face'] === 'string');
  const names = () => faces().map(face => face.props['data-face']).sort();
  const points = (name: string) => faces().find(face => face.props['data-face'] === name)!.findAllByType('polygon')[0].props.points.split(' ');
  assert.equal(input.props.value, 30);
  assert.equal(input.props['aria-controls'], scene.props.id);
  assert.notEqual(scene.props.id, other.findByType('svg').props.id);
  assert.deepEqual(names(), ['front', 'right', 'top']);
  assert.equal(points('front').filter((point: string) => points('right').includes(point)).length, 2);
  assert.equal(points('front').filter((point: string) => points('top').includes(point)).length, 2);
  const initial = points('front');
  const edgeLengths = (coordinates: string[]) => {
    const points = coordinates.map(point => point.split(',').map(Number));
    const distance = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1]);
    return [distance(points[0], points[3]), distance(points[1], points[2])];
  };
  assert.ok(edgeLengths(initial)[1] > edgeLengths(initial)[0], 'the nearer edge must grow through perspective rather than a flat rotation');
  const setAngle = (value: number) => act(() => input.props.onChange({ currentTarget: { value: String(value) } }));
  setAngle(-30);
  assert.ok(edgeLengths(points('front'))[0] > edgeLengths(points('front'))[1]);
  for (const [angle, expected] of [[0, ['front', 'top']], [90, ['right', 'top']], [-90, ['left', 'top']], [180, ['back', 'top']]] as const) {
    setAngle(angle);
    assert.deepEqual(names(), [...expected].sort());
    assert.equal(input.props['aria-valuetext'], `${angle}도`);
    assert.equal(other.findByType('input').props.value, 30);
  }
  const back = points('back').map((point: string) => point.split(',').map(Number));
  setAngle(-180);
  points('back').forEach((point: string, index: number) => point.split(',').map(Number).forEach((coordinate: number, axis: number) => assert.ok(Math.abs(coordinate - back[index][axis]) < 1e-9)));
  setAngle(30);
  assert.deepEqual(points('front'), initial);
  for (let angle = -180; angle <= 180; angle += 5) {
    setAngle(angle);
    for (const face of faces()) for (const point of face.findAllByType('polygon')[0].props.points.split(' ')) {
      const [x, y] = point.split(',').map(Number);
      assert.ok(Number.isFinite(x) && x > 0 && x < 264);
      assert.ok(Number.isFinite(y) && y > 0 && y < 148);
    }
  }
});

test('dolly zoom is searchable in camera and resolves to its accessible interactive demo without replacing original techniques', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'mg-dolly-zoom-perspective');
  assert.equal(entries.length, 1);
  assert.equal(entries[0].domain, 'motion');
  assert.equal(entries[0].category, 'camera');
  for (const keyword of ['돌리 줌', '버티고', '원근 압축', 'dolly zoom']) assert.ok(matchesSearch(entries[0], keyword));
  for (const id of ['mg-parallax-depth', 'mg-rack-focus-blur', 'mg-ken-burns-pan', 'mg-isometric-explode']) {
    assert.equal(TECHNIQUES.filter(item => item.id === id && item.category === 'camera').length, 1);
  }
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={entries[0].id} />); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(DollyZoomDemo).length, 1);
  assert.equal(tree.root.findByProps({ role: 'img' }).props['aria-label'], '피사체 크기를 유지하며 배경 원근이 바뀌는 복도');
  const input = tree.root.findByType('input');
  assert.equal(input.props.type, 'range');
  assert.equal(input.props.min, '0');
  assert.equal(input.props.max, '100');
  assert.equal(input.props.step, '1');
  assert.equal(input.props['aria-label'], '돌리 줌 위치');
});

test('dolly zoom preserves subject geometry while farther corridor layers expand at different rates and reverses exactly', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><DollyZoomDemo /><DollyZoomDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [demo, other] = tree.root.findAllByType(DollyZoomDemo);
  const input = demo.findByType('input');
  const scene = demo.findByType('svg');
  const subject = demo.findByProps({ className: 'ca-dolly-subject' });
  const subjectGeometry = () => subject.findAllByType('path').map(path => path.props.d);
  const frames = () => demo.findAllByProps({ className: 'ca-dolly-frame' }).map(frame => ({ x: frame.props.x, y: frame.props.y, width: frame.props.width, height: frame.props.height }));
  const assertCorridorSeams = () => {
    const segments = [...demo.findByProps({ className: 'ca-dolly-rays' }).props.d.matchAll(/M(-?[\d.]+) (-?[\d.]+)L(-?[\d.]+) (-?[\d.]+)/g)].map(match => match.slice(1).map(Number));
    assert.equal(segments.length, 4);
    for (const frame of frames()) {
      const corners = [[frame.x, frame.y], [frame.x + frame.width, frame.y], [frame.x, frame.y + frame.height], [frame.x + frame.width, frame.y + frame.height]];
      corners.forEach(([x, y], index) => {
        const [startX, startY, endX, endY] = segments[index];
        const cross = (x - startX) * (endY - startY) - (y - startY) * (endX - startX);
        assert.ok(Math.abs(cross) < .000001, `frame corner ${index} must meet its corridor seam`);
      });
    }
  };
  const initialFrames = frames();
  const initialSubject = subjectGeometry();
  const initialHead = { ...subject.findByType('circle').props };
  assert.equal(input.props.value, 0);
  assert.equal(input.props['aria-valuetext'], '가까운 광각');
  assert.equal(input.props['aria-controls'], scene.props.id);
  assert.notEqual(scene.props.id, other.findByType('svg').props.id);
  assertCorridorSeams();
  for (const value of [50, 100]) {
    act(() => input.props.onChange({ currentTarget: { value: String(value) } }));
    if (value === 50) assert.equal(input.props['aria-valuetext'], '50% · 광각과 망원 사이');
    const updatedFrames = frames();
    assertCorridorSeams();
    assert.ok(updatedFrames.every((frame, index) => frame.width > initialFrames[index].width));
    const nearRatio = updatedFrames[0].width / initialFrames[0].width;
    const farRatio = updatedFrames[3].width / initialFrames[3].width;
    assert.ok(farRatio > nearRatio, 'background layers must not all use the same zoom scale');
    for (const frame of updatedFrames) {
      assert.equal(frame.x + frame.width / 2, 132);
      assert.equal(frame.y + frame.height / 2, 69);
    }
    assert.deepEqual(subjectGeometry(), initialSubject);
    assert.deepEqual(subject.findByType('circle').props, initialHead);
    assert.equal(subject.props.transform, undefined);
    assert.equal(other.findByType('input').props.value, 0);
  }
  assert.equal(input.props['aria-valuetext'], '먼 망원');
  act(() => input.props.onChange({ currentTarget: { value: '0' } }));
  assert.deepEqual(frames(), initialFrames);
  assert.equal(input.props['aria-valuetext'], '가까운 광각');
  assert.equal(demo.findByType('svg'), scene);
});
