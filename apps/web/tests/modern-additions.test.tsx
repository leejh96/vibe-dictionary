import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { TECHNIQUES, matchesSearch } from '@vibe-dictionary/catalog';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';
import { SquircleIconDemo } from '../src/components/demos/modern/SquircleIconDemo';
import { DuotoneArtDemo } from '../src/components/demos/modern/DuotoneArtDemo';
import { ExpressiveGroupDemo } from '../src/components/demos/modern/ExpressiveGroupDemo';
import { StickerCollageDemo } from '../src/components/demos/modern/StickerCollageDemo';
import { AsciiArtDemo } from '../src/components/demos/modern/AsciiArtDemo';
import { RoughSketchDemo } from '../src/components/demos/modern/RoughSketchDemo';
import { WindowShadowDemo } from '../src/components/demos/modern/WindowShadowDemo';
import { SerifBrandDemo } from '../src/components/demos/modern/SerifBrandDemo';
import { TruchetTilesDemo } from '../src/components/demos/modern/TruchetTilesDemo';
import { LowPolyPearDemo } from '../src/components/demos/modern/LowPolyPearDemo';
import { LocaleProvider, useLocale } from '../src/i18n/LocaleContext';

test('expressive alignment keeps selection, preview identity and other instances while live-switching languages', t => {
  let changeLocale!: ReturnType<typeof useLocale>['setLocale'];
  function Demos() {
    changeLocale = useLocale().setLocale;
    return <><ExpressiveGroupDemo /><ExpressiveGroupDemo /></>;
  }
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<LocaleProvider initialLocale="ko"><Demos /></LocaleProvider>); });
  t.after(() => { act(() => tree.unmount()); });
  const [first, other] = tree.root.findAllByType(ExpressiveGroupDemo);
  const preview = first.findByProps({ role: 'img' });
  const buttons = first.findAllByType('button');
  const previewId = preview.props.id;
  act(() => buttons[2].props.onClick());
  assert.equal(preview.props['aria-label'], '오른쪽 정렬된 네 줄 미리보기');
  act(() => changeLocale('en'));
  assert.equal(first.findByProps({ role: 'img' }), preview);
  assert.equal(preview.props.id, previewId);
  assert.equal(preview.props['aria-label'], 'Four-line preview aligned right');
  assert.equal(preview.props.style.alignItems, 'flex-end');
  assert.equal(first.findByProps({ role: 'group' }).props['aria-label'], 'Text alignment');
  assert.deepEqual(buttons.map(button => button.props['aria-pressed']), [false, false, true]);
  assert.deepEqual(buttons.map(button => button.props['aria-label']), ['Left alignment', 'Center alignment', 'Right alignment']);
  assert.deepEqual(buttons.map(button => button.findByType('span').children.join('')), ['Left', 'Center', 'Right']);
  for (const [index, button] of buttons.entries()) {
    assert.equal(first.findAllByType('button')[index], button);
    assert.equal(button.props['aria-controls'], previewId);
  }
  assert.equal(other.findByProps({ role: 'img' }).props.style.alignItems, 'flex-start');
  assert.equal(other.findByProps({ role: 'img' }).props['aria-label'], 'Four-line preview aligned left');
  act(() => { buttons[1].props.onClick(); changeLocale('ko'); });
  assert.equal(preview.props.style.alignItems, 'center');
  assert.equal(preview.props['aria-label'], '가운데 정렬된 네 줄 미리보기');
  assert.equal(buttons[1].findByType('span').children.join(''), '가운데');
});

test('low-poly facets form one closed triangulated surface without internal holes or overlapping area', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<LowPolyPearDemo />); });
  t.after(() => { act(() => tree.unmount()); });
  const facets = tree.root.findByProps({ className: 'md-lowpoly-facets' }).findAllByType('polygon');
  const edges = new Map<string, number>();
  let totalArea = 0;
  for (const facet of facets) {
    const vertices = facet.props.points.split(' ').map((point: string) => point.split(',').map(Number)) as number[][];
    assert.equal(vertices.length, 3);
    const [[ax, ay], [bx, by], [cx, cy]] = vertices;
    const twiceArea = Math.abs((bx - ax) * (cy - ay) - (by - ay) * (cx - ax));
    assert.ok(twiceArea > 0);
    totalArea += twiceArea / 2;
    for (let index = 0; index < 3; index++) {
      const edge = [vertices[index].join(','), vertices[(index + 1) % 3].join(',')].sort().join(' ');
      edges.set(edge, (edges.get(edge) ?? 0) + 1);
    }
  }
  const boundary = [[131,29],[146,34],[153,54],[171,78],[178,99],[165,119],[135,127],[108,120],[89,101],[95,79],[111,57],[117,38]];
  const boundaryEdges = boundary.map((point, index) => [point.join(','), boundary[(index + 1) % boundary.length].join(',')].sort().join(' '));
  assert.deepEqual([...edges].filter(([, count]) => count === 1).map(([edge]) => edge).sort(), boundaryEdges.sort());
  assert.ok([...edges.values()].every(count => count === 1 || count === 2));
  const silhouetteArea = Math.abs(boundary.reduce((sum, [x, y], index) => {
    const next = boundary[(index + 1) % boundary.length];
    return sum + x * next[1] - y * next[0];
  }, 0)) / 2;
  assert.equal(totalArea, silhouetteArea);
});

test('window overlay keeps its static blur and light references local to each image instance', t => {
  const item = TECHNIQUES.find(entry => entry.id === 'st-window-shadow-overlay');
  assert.ok(item);
  assert.ok(matchesSearch(item, '창틀 그림자'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><WindowShadowDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(WindowShadowDemo).length, 2);
  const [first, other] = tree.root.findAllByType('svg');
  for (const scene of [first, other]) {
    assert.equal(scene.props.role, 'img');
    const filter = scene.findByType('filter');
    const light = scene.findByType('linearGradient');
    assert.equal(filter.props.filterUnits, 'userSpaceOnUse');
    assert.ok(filter.findByType('feGaussianBlur').props.stdDeviation > 0);
    assert.equal(scene.findByProps({ className: 'md-window-shadow' }).props.filter, `url(#${filter.props.id})`);
    assert.equal(scene.findByProps({ className: 'md-window-light' }).props.fill, `url(#${light.props.id})`);
  }
  assert.notEqual(first.findByType('filter').props.id, other.findByType('filter').props.id);
  assert.notEqual(first.findByType('linearGradient').props.id, other.findByType('linearGradient').props.id);
  assert.equal(tree.root.findAllByType('button').length, 0);
});

test('ASCII illustration keeps printable fixed rows, several shade densities and a round rather than cell-stretched silhouette', t => {
  const item = TECHNIQUES.find(entry => entry.id === 'st-ascii-luminance-art');
  assert.ok(item);
  assert.ok(matchesSearch(item, '아스키 아트'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={item.id} />); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(AsciiArtDemo).length, 1);
  const svg = tree.root.findByType('svg');
  assert.equal(svg.props.role, 'img');
  assert.equal(svg.findByType('g').props['aria-hidden'], 'true');
  const rows = svg.findAllByType('text').map(row => row.children.join(''));
  assert.equal(rows.length, 16);
  for (const row of rows) {
    assert.equal(row.length, 48);
    assert.match(row, /^[ .:\-=+*#%@]+$/);
  }
  const occupied = rows.flatMap((row, y) => [...row].flatMap((character, x) => character === ' ' ? [] : [{ x, y }]));
  const width = (Math.max(...occupied.map(cell => cell.x)) - Math.min(...occupied.map(cell => cell.x)) + 1) * 5;
  const height = (Math.max(...occupied.map(cell => cell.y)) - Math.min(...occupied.map(cell => cell.y)) + 1) * 8;
  assert.ok(width / height > .95 && width / height < 1.05);
  assert.ok(new Set(rows.join('').replaceAll(' ', '')).size >= 5);
  const counts = rows.map(row => row.replaceAll(' ', '').length);
  assert.deepEqual(counts, [...counts].reverse());
  assert.ok(counts[7] > counts[2]);
});

test('expressive connected buttons keep one selection and update their own stable alignment preview', t => {
  const item = TECHNIQUES.find(entry => entry.id === 'st-expressive-connected-group');
  assert.ok(item);
  assert.ok(matchesSearch(item, '익스프레시브'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><ExpressiveGroupDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const demos = tree.root.findAllByType(ExpressiveGroupDemo);
  const [first, other] = demos.map(demo => demo.findByProps({ role: 'img' }));
  const buttons = demos[0].findAllByType('button');
  assert.notEqual(first.props.id, other.props.id);
  assert.deepEqual(buttons.map(button => button.props['aria-pressed']), [true, false, false]);
  for (const button of buttons) assert.equal(button.props['aria-controls'], first.props.id);
  for (const [index, align] of [[2, 'flex-end'], [1, 'center'], [0, 'flex-start']] as const) {
    act(() => buttons[index].props.onClick());
    assert.deepEqual(buttons.map(button => button.props['aria-pressed']), buttons.map((_, buttonIndex) => buttonIndex === index));
    assert.equal(first.props.style.alignItems, align);
    assert.equal(other.props.style.alignItems, 'flex-start');
  }
  act(() => { buttons[2].props.onClick(); buttons[1].props.onClick(); buttons[1].props.onClick(); });
  assert.equal(first.props.style.alignItems, 'center');
  assert.equal(first.props['aria-label'], '가운데 정렬된 네 줄 미리보기');
  assert.equal(demos[0].findByProps({ role: 'img' }), first);
  assert.equal(demos[0].findAllByType('button')[1], buttons[1]);
});

test('duotone maps black and white to its two inks and isolates every local SVG reference', t => {
  const item = TECHNIQUES.find(entry => entry.id === 'st-duotone-tone-map');
  assert.ok(item);
  assert.ok(matchesSearch(item, '듀오톤'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><DuotoneArtDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(DuotoneArtDemo).length, 2);
  const [scene, other] = tree.root.findAllByType('svg');
  const filter = scene.findByType('filter');
  const transfer = scene.findByType('feComponentTransfer');
  assert.notEqual(filter.props.id, other.findByType('filter').props.id);
  assert.equal(scene.findByType('g').props.filter, `url(#${filter.props.id})`);
  assert.equal(scene.findByType('feColorMatrix').props.type, 'saturate');
  assert.equal(scene.findByType('feColorMatrix').props.values, '0');
  const endpoints = ['feFuncR', 'feFuncG', 'feFuncB'].map(channel => transfer.findByType(channel).props.tableValues.split(' ').map(Number));
  assert.deepEqual(endpoints.map(values => Math.round(values[0] * 255)), [49, 46, 129]);
  assert.deepEqual(endpoints.map(values => Math.round(values[1] * 255)), [254, 240, 138]);
  assert.equal(transfer.findAllByType('feFuncA').length, 0);
  assert.equal(scene.findByType('circle').props.fill, `url(#${scene.findByType('radialGradient').props.id})`);
  assert.equal(scene.findByProps({ fill: `url(#${scene.findByType('linearGradient').props.id})` }).type, 'path');
});

for (const [id, Component, keyword, name] of [
  ['st-low-poly-faceted-pear', LowPolyPearDemo, '로우폴리', '삼각 면의 밝기가 바뀌며 입체감을 만드는 로우폴리 배 일러스트'],
  ['st-squircle-icon-surface', SquircleIconDemo, '슈퍼엘립스', '매끄러운 스쿼클 윤곽과 안쪽 테두리의 보라색 앱 아이콘'],
  ['st-die-cut-sticker-collage', StickerCollageDemo, '스티커 콜라주', '흰색 다이컷 테두리의 별·번개·하트가 겹친 스티커 콜라주'],
  ['st-rough-sketch-wireframe', RoughSketchDemo, '손그림 윤곽', '조금씩 어긋난 두 벌의 곡선으로 그린 스케치 카드와 체크 표시'],
  ['st-serif-negative-space-brand', SerifBrandDemo, '세리프 브랜딩', '넓은 여백과 자간으로 배치한 MUSE 세리프 브랜드 문자'],
  ['st-connected-truchet-tiles', TruchetTilesDemo, '트루셰 타일', '타일 경계의 중점에서 이어져 고리와 굽은 길을 만드는 트루셰 곡선 패턴'],
] as const) test(`${id} is searchable and resolves to an accessible static demo`, t => {
  const entries = TECHNIQUES.filter(item => item.id === id);
  assert.equal(entries.length, 1);
  assert.equal(entries[0].domain, 'style');
  assert.equal(entries[0].category, 'modern');
  assert.ok(matchesSearch(entries[0], keyword));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={entries[0].id} />); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(Component).length, 1);
  assert.equal(tree.root.findByProps({ role: 'img' }).props['aria-label'], name);
  assert.equal(tree.root.findAllByType('button').length, 0);
});
