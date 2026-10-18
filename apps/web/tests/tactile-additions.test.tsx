import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { TECHNIQUES, matchesSearch } from '@vibe-dictionary/catalog';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';
import { PlainWeaveDemo } from '../src/components/demos/tactile/PlainWeaveDemo';
import { KnotWoodDemo } from '../src/components/demos/tactile/KnotWoodDemo';
import { BrushedMetalDemo } from '../src/components/demos/tactile/BrushedMetalDemo';
import { PebbledLeatherDemo } from '../src/components/demos/tactile/PebbledLeatherDemo';
import { TerrazzoDemo } from '../src/components/demos/tactile/TerrazzoDemo';
import { CorrugatedCardboardDemo } from '../src/components/demos/tactile/CorrugatedCardboardDemo';
import { CrackleCeramicDemo } from '../src/components/demos/tactile/CrackleCeramicDemo';
import { MarbleVeinDemo } from '../src/components/demos/tactile/MarbleVeinDemo';
import { WoolFeltDemo } from '../src/components/demos/tactile/WoolFeltDemo';
import { StockinetteKnitDemo } from '../src/components/demos/tactile/StockinetteKnitDemo';
import { LocaleProvider, useLocale } from '../src/i18n/LocaleContext';
import { TACTILE_ADDITION_DEMOS } from '../src/components/demos/tactile';

test('all tactile materials switch accessible names live without remounting or changing the static artwork', t => {
  let setLocale!: ReturnType<typeof useLocale>['setLocale'];
  function Materials() {
    setLocale = useLocale().setLocale;
    return <>{Object.entries(TACTILE_ADDITION_DEMOS).map(([id, Demo]) => <Demo key={id} />)}</>;
  }
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<LocaleProvider initialLocale="ko"><Materials /></LocaleProvider>); });
  t.after(() => { act(() => tree.unmount()); });
  const artwork = () => tree.root.findAll(node => typeof node.type === 'string').map(node => {
    const { children: _children, 'aria-label': _label, ...props } = node.props;
    return { type: node.type, props };
  });
  const initialArtwork = artwork();
  const initialNames = tree.root.findAllByType('svg').map(scene => scene.props['aria-label']);
  assert.equal(initialNames.length, 10);
  assert.ok(initialNames.every(name => /[가-힣]/u.test(name)));
  act(() => setLocale('en'));
  const englishNames = tree.root.findAllByType('svg').map(scene => scene.props['aria-label']);
  assert.ok(englishNames.every(name => name.length > 20 && !/[가-힣]/u.test(name)));
  assert.match(englishNames[0], /stockinette knit/i);
  assert.match(englishNames[9], /warp and weft/i);
  assert.deepEqual(artwork(), initialArtwork, 'language changes preserve SVG paint/clip IDs, geometry and colours');
  for (const tag of ['button', 'input', 'animate', 'text']) assert.equal(tree.root.findAllByType(tag).length, 0);
  act(() => setLocale('ko'));
  assert.deepEqual(tree.root.findAllByType('svg').map(scene => scene.props['aria-label']), initialNames);
  assert.deepEqual(artwork(), initialArtwork);
});

test('stockinette knit aligns recessed loop heads behind rounded V fronts with an isolated swatch clip', t => {
  const item = TECHNIQUES.find(entry => entry.id === 'st-stockinette-knit-surface');
  assert.ok(item);
  assert.equal(item.domain, 'style');
  assert.equal(item.category, 'tactile');
  for (const query of ['스톡키네트', '편직', 'stockinette']) assert.ok(matchesSearch(item, query));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><StockinetteKnitDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(StockinetteKnitDemo).length, 2);
  const scenes = tree.root.findAllByType('svg');
  assert.notEqual(scenes[0].findByType('clipPath').props.id, scenes[1].findByType('clipPath').props.id);
  for (const scene of scenes) {
    assert.equal(scene.props.role, 'img');
    assert.match(scene.props['aria-label'], /V자 코.+니트/);
    const clip = scene.findByType('clipPath');
    const face = scene.findByProps({ fill: '#b28f59' });
    for (const property of ['x', 'y', 'width', 'height', 'rx']) assert.equal(face.props[property], clip.findByType('rect').props[property]);
    const clipped = scene.findByProps({ clipPath: `url(#${clip.props.id})` });
    assert.equal(clipped.props.fill, 'none');
    const [heads, fronts] = clipped.children.filter(child => typeof child !== 'string');
    assert.ok(heads && fronts && typeof heads !== 'string' && typeof fronts !== 'string');
    const headPositions = heads.children.map(child => typeof child !== 'string' && child.props.transform);
    const frontPositions = fronts.children.map(child => typeof child !== 'string' && child.props.transform);
    assert.deepEqual(frontPositions, headPositions, 'the front loops cover matching recessed heads rather than an unrelated pattern');
    assert.ok(frontPositions.length > 40);
    for (const path of clipped.findAllByType('path')) {
      assert.match(path.props.d, /C/);
      assert.ok(!/[Zz]/.test(path.props.d));
      assert.equal(path.props.filter, undefined);
    }
    assert.ok(fronts.findAllByType('path').some(path => Number(path.props.strokeWidth) > 4));
    for (const tag of ['button', 'input', 'filter', 'animate', 'text', 'image']) assert.equal(scene.findAllByType(tag).length, 0);
  }
});

test('compressed felt maps to mixed-direction short fibres clipped into a dense nonwoven face', t => {
  const item = TECHNIQUES.find(entry => entry.id === 'st-compressed-wool-felt');
  assert.ok(item);
  assert.equal(item.domain, 'style');
  assert.equal(item.category, 'tactile');
  for (const query of ['펠트', '부직포', 'wool felt']) assert.ok(matchesSearch(item, query));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><WoolFeltDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(WoolFeltDemo).length, 2);
  const scenes = tree.root.findAllByType('svg');
  assert.notEqual(scenes[0].findByType('clipPath').props.id, scenes[1].findByType('clipPath').props.id);
  for (const scene of scenes) {
    assert.equal(scene.props.role, 'img');
    assert.match(scene.props['aria-label'], /섬유.+펠트/);
    const clip = scene.findByType('clipPath');
    const tone = scene.findByType('radialGradient');
    const face = scene.findByProps({ fill: `url(#${tone.props.id})` });
    for (const property of ['cx', 'cy', 'rx', 'ry']) assert.equal(face.props[property], clip.findByType('ellipse').props[property]);
    const clipped = scene.findByProps({ clipPath: `url(#${clip.props.id})` });
    assert.equal(clipped.props.fill, 'none');
    const fibres = clipped.findAllByType('path');
    assert.ok(fibres.length > 100);
    assert.equal(new Set(fibres.map(fibre => fibre.props.transform)).size, fibres.length);
    assert.ok(new Set(fibres.map(fibre => fibre.props.stroke)).size > 1);
    const angles = fibres.map(fibre => Number(fibre.props.transform.match(/rotate\(([^)]+)\)/)[1]));
    for (let start = 0; start < 180; start += 45) assert.ok(angles.some(angle => angle >= start && angle < start + 45));
    for (const fibre of fibres) {
      assert.match(fibre.props.d, /Q.+T/);
      assert.ok(!/[Zz]/.test(fibre.props.d));
      assert.equal(fibre.props.filter, undefined);
    }
    for (const tag of ['button', 'input', 'filter', 'animate', 'text', 'pattern', 'image']) assert.equal(scene.findAllByType(tag).length, 0);
  }
});

test('white marble maps to continuous clipped veins with local matrix and cloud paints', t => {
  const item = TECHNIQUES.find(entry => entry.id === 'st-white-marble-veining');
  assert.ok(item);
  assert.equal(item.domain, 'style');
  assert.equal(item.category, 'tactile');
  for (const query of ['대리석', '베이닝', 'marble']) assert.ok(matchesSearch(item, query));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><MarbleVeinDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(MarbleVeinDemo).length, 2);
  const scenes = tree.root.findAllByType('svg');
  const allIds = scenes.flatMap(scene => scene.findAll(node => typeof node.type === 'string' && node.props.id).map(node => node.props.id));
  assert.equal(new Set(allIds).size, allIds.length);
  for (const scene of scenes) {
    assert.equal(scene.props.role, 'img');
    assert.match(scene.props['aria-label'], /회색 석맥.+대리석/);
    const clip = scene.findByType('clipPath');
    const face = scene.findAllByType('rect').find(rect => rect.props.fill?.includes('marble-matrix'));
    assert.ok(face);
    for (const property of ['x', 'y', 'width', 'height', 'rx']) assert.equal(face.props[property], clip.findByType('rect').props[property]);
    const clipped = scene.findByProps({ clipPath: `url(#${clip.props.id})` });
    const bands = clipped.findAllByType('path').filter(path => path.props.fill);
    assert.ok(bands.length >= 2);
    for (const band of bands) {
      assert.match(band.props.d, /C/);
      assert.match(band.props.d, /Z$/);
      assert.ok(Number(band.props.opacity) < .5);
      assert.equal(band.props.stroke, undefined);
    }
    assert.ok(clipped.findAllByType('path').some(path => path.props.strokeWidth && !path.props.fill));
    const localIds = new Set(scene.findAll(node => typeof node.type === 'string' && node.props.id).map(node => node.props.id));
    const references = scene.findAll(node => typeof node.type === 'string' && typeof node.props.fill === 'string' && node.props.fill.startsWith('url(#'));
    for (const node of references) assert.ok(localIds.has(node.props.fill.slice(5, -1)));
    for (const tag of ['button', 'input', 'filter', 'animate', 'text', 'pattern']) assert.equal(scene.findAllByType(tag).length, 0);
  }
});

test('crackle ceramic keeps thin unfilled fractures and reflections within an instance-local glaze face', t => {
  const item = TECHNIQUES.find(entry => entry.id === 'st-crackle-ceramic-glaze');
  assert.ok(item);
  assert.equal(item.domain, 'style');
  assert.equal(item.category, 'tactile');
  for (const query of ['빙렬', '유약', 'crackle glaze']) assert.ok(matchesSearch(item, query));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><CrackleCeramicDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(CrackleCeramicDemo).length, 2);
  const scenes = tree.root.findAllByType('svg');
  const ids = scenes.flatMap(scene => scene.findAll(node => typeof node.type === 'string' && node.props.id).map(node => node.props.id));
  assert.equal(new Set(ids).size, ids.length);
  for (const scene of scenes) {
    assert.equal(scene.props.role, 'img');
    assert.match(scene.props['aria-label'], /빙렬.+도자기/);
    const clip = scene.findByType('clipPath');
    const face = scene.findAllByType('ellipse').find(ellipse => ellipse.props.fill?.includes('ceramic-glaze'));
    assert.ok(face);
    for (const property of ['cx', 'cy', 'rx', 'ry']) assert.equal(face.props[property], clip.findByType('ellipse').props[property]);
    const clipped = scene.findByProps({ clipPath: `url(#${clip.props.id})` });
    assert.equal(clipped.props.fill, 'none');
    const cracks = clipped.findAllByType('path').filter(path => path.props.stroke === '#426e5e');
    assert.ok(cracks.length >= 2);
    for (const crack of cracks) {
      assert.ok(Number(crack.props.strokeWidth) < 1);
      assert.equal(crack.props.fill, undefined);
      assert.ok(!/[Zz]/.test(crack.props.d));
    }
    const localIds = new Set(scene.findAll(node => typeof node.type === 'string' && node.props.id).map(node => node.props.id));
    const references = scene.findAll(node => typeof node.type === 'string' && typeof node.props.fill === 'string' && node.props.fill.startsWith('url(#'));
    for (const node of references) assert.ok(localIds.has(node.props.fill.slice(5, -1)));
    assert.ok(clipped.findAllByType('ellipse').some(ellipse => ellipse.props.fill?.includes('ceramic-reflection')));
    for (const tag of ['button', 'input', 'filter', 'animate', 'text', 'pattern']) assert.equal(scene.findAllByType(tag).length, 0);
  }
});

test('corrugated cardboard resolves with isolated local paints and connected open wave edges', t => {
  const item = TECHNIQUES.find(entry => entry.id === 'st-corrugated-cardboard');
  assert.ok(item);
  assert.equal(item.domain, 'style');
  assert.equal(item.category, 'tactile');
  for (const query of ['골판지', '골심', 'corrugated cardboard']) assert.ok(matchesSearch(item, query));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><CorrugatedCardboardDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(CorrugatedCardboardDemo).length, 2);
  const scenes = tree.root.findAllByType('svg');
  const allIds = scenes.flatMap(scene => scene.findAllByType('linearGradient').map(paint => paint.props.id));
  assert.equal(new Set(allIds).size, allIds.length);
  for (const scene of scenes) {
    assert.equal(scene.props.role, 'img');
    assert.match(scene.props['aria-label'], /표면지.+물결형 골심/);
    const ids = new Set(scene.findAllByType('linearGradient').map(paint => paint.props.id));
    const painted = scene.findAllByType('path').filter(path => path.props.fill?.startsWith('url(#'));
    for (const path of painted) assert.ok(ids.has(path.props.fill.slice(5, -1)));
    const edges = scene.findAllByType('path').filter(path => path.props.stroke === '#e4bd87');
    assert.ok(edges.length >= 6);
    let previousEnd: number[] | undefined;
    for (const edge of edges) {
      const coordinates = edge.props.d.match(/-?\d+(?:\.\d+)?/g).map(Number);
      const start = coordinates.slice(0, 2);
      const end = coordinates.slice(-2);
      assert.ok(!edge.props.d.endsWith('Z'), 'open wave edges retain air gaps rather than closed tubes');
      assert.ok(coordinates.filter((_: number, index: number) => index % 2).some((y: number) => y < start[1]));
      if (previousEnd) assert.deepEqual(start, previousEnd, 'adjacent waves form one continuous paper edge');
      previousEnd = end;
    }
    for (const tag of ['button', 'input', 'filter', 'animate', 'text']) assert.equal(scene.findAllByType(tag).length, 0);
  }
});

test('terrazzo maps to flat multicolour aggregate clipped into the same matrix face', t => {
  const item = TECHNIQUES.find(entry => entry.id === 'st-terrazzo-aggregate-surface');
  assert.ok(item);
  assert.equal(item.domain, 'style');
  assert.equal(item.category, 'tactile');
  for (const query of ['테라조', '골재', 'terrazzo']) assert.ok(matchesSearch(item, query));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><TerrazzoDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(TerrazzoDemo).length, 2);
  const scenes = tree.root.findAllByType('svg');
  assert.notEqual(scenes[0].findByType('clipPath').props.id, scenes[1].findByType('clipPath').props.id);
  for (const scene of scenes) {
    assert.equal(scene.props.role, 'img');
    assert.match(scene.props['aria-label'], /바탕재.+골재/);
    const clip = scene.findByType('clipPath');
    const clipped = scene.findByProps({ clipPath: `url(#${clip.props.id})` });
    const face = scene.findByProps({ fill: '#e4dbc9' });
    for (const property of ['x', 'y', 'width', 'height', 'rx']) assert.equal(face.props[property], clip.findByType('rect').props[property]);
    const groups = clipped.findAllByType('path');
    assert.ok(new Set(groups.map(group => group.props.fill)).size >= 3);
    const chips = groups.flatMap(group => group.props.d.split(/\s+(?=M)/));
    assert.ok(chips.length > 20);
    assert.equal(new Set(chips).size, chips.length);
    for (const chip of chips) assert.match(chip, /^M[\d\s]+(?:L[\d\s]+){2,4}Z$/);
    for (const group of groups) {
      assert.equal(group.props.stroke, undefined);
      assert.equal(group.props.filter, undefined);
    }
    assert.equal(scene.findAllByType('pattern').length, 0);
    assert.equal(scene.findAllByType('filter').length, 0);
    assert.equal(scene.findAllByType('button').length, 0);
  }
});

test('pebbled leather is mapped and layers irregular raised cells with an inset running stitch', t => {
  const item = TECHNIQUES.find(entry => entry.id === 'st-pebbled-leather');
  assert.ok(item);
  assert.equal(item.domain, 'style');
  assert.equal(item.category, 'tactile');
  for (const query of ['페블 그레인', '가죽 질감', 'pebbled leather']) assert.ok(matchesSearch(item, query));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><PebbledLeatherDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(PebbledLeatherDemo).length, 2);
  const scenes = tree.root.findAllByType('svg');
  const ids = scenes.flatMap(scene => scene.findAll(node => typeof node.type === 'string' && Boolean(node.props.id)).map(node => node.props.id));
  assert.equal(new Set(ids).size, ids.length);
  for (const scene of scenes) {
    assert.equal(scene.props.role, 'img');
    assert.match(scene.props['aria-label'], /가죽 요철/);
    const pattern = scene.findByType('pattern');
    const tone = scene.findByType('linearGradient');
    assert.equal(pattern.props.patternUnits, 'userSpaceOnUse');
    const pebbles = pattern.findByType('g');
    assert.equal(pebbles.props.fill, `url(#${tone.props.id})`);
    const paths = pebbles.findAllByType('path');
    assert.ok(paths.length >= 3);
    assert.equal(new Set(paths.map(path => path.props.transform)).size, paths.length);
    const centers = paths.map(path => path.props.transform.match(/^translate\(([-.\d]+) ([-.\d]+)\)/).slice(1).map(Number));
    assert.ok(new Set(centers.map(([x]) => x)).size > 8);
    assert.ok(new Set(centers.map(([, y]) => y)).size > 8);
    assert.ok(new Set(paths.map(path => path.props.transform.match(/scale\([^)]+\)/)[0])).size > 3);
    assert.ok(new Set(paths.map(path => path.props.transform.match(/rotate\([^)]+\)/)[0])).size > 3);
    for (const path of paths) assert.match(path.props.d, /^M.+C.+Z$/);
    assert.ok(tone.findAllByType('stop').every(stop => Number(stop.props.stopOpacity) < .6));
    const body = scene.findByProps({ fill: `url(#${pattern.props.id})` });
    const stitch = scene.findAllByType('rect').find(rect => rect.props.strokeDasharray);
    assert.ok(stitch);
    assert.equal(stitch.props.strokeLinecap, 'round');
    assert.ok(Number(stitch.props.x) > Number(body.props.x) && Number(stitch.props.y) > Number(body.props.y));
    assert.ok(Number(stitch.props.x) + Number(stitch.props.width) < Number(body.props.x) + Number(body.props.width));
    assert.ok(Number(stitch.props.y) + Number(stitch.props.height) < Number(body.props.y) + Number(body.props.height));
    assert.equal(scene.findAllByType('button').length, 0);
    assert.equal(scene.findAllByType('filter').length, 0);
  }
});

test('brushed metal keeps directional scoring over its reflective face with isolated SVG paints', t => {
  const item = TECHNIQUES.find(entry => entry.id === 'st-brushed-metal-surface');
  assert.ok(item);
  assert.equal(item.domain, 'style');
  assert.equal(item.category, 'tactile');
  for (const query of ['브러시드 메탈', '헤어라인 금속', 'brushed metal']) assert.ok(matchesSearch(item, query));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><BrushedMetalDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(BrushedMetalDemo).length, 2);
  const scenes = tree.root.findAllByType('svg');
  const ids = scenes.flatMap(scene => scene.findAll(node => typeof node.type === 'string' && Boolean(node.props.id)).map(node => node.props.id));
  assert.equal(new Set(ids).size, ids.length);
  for (const scene of scenes) {
    assert.equal(scene.props.role, 'img');
    assert.match(scene.props['aria-label'], /수평 연마결/);
    const pattern = scene.findByType('pattern');
    assert.equal(pattern.props.patternUnits, 'userSpaceOnUse');
    const lines = pattern.findAllByType('line');
    assert.ok(lines.length >= 3);
    assert.ok(new Set(lines.map(line => line.props.y1)).size > 1);
    for (const line of lines) {
      assert.equal(line.props.y1, line.props.y2);
      assert.ok(Number(line.props.x2) > Number(line.props.x1));
      assert.ok(Number(line.props.x1) >= 0 && Number(line.props.x2) <= Number(pattern.props.width));
    }
    const tone = scene.findByType('linearGradient');
    assert.ok(tone.findAllByType('stop').length > 3);
    const face = scene.findByProps({ fill: `url(#${tone.props.id})` });
    const scoring = scene.findByProps({ fill: `url(#${pattern.props.id})` });
    for (const property of ['x', 'y', 'width', 'height', 'rx']) assert.equal(face.props[property], scoring.props[property]);
    assert.equal(scene.findAllByType('button').length, 0);
    assert.equal(scene.findAllByType('filter').length, 0);
  }
});

test('knotty wood is discoverable, mapped and keeps grain inside an instance-local panel face', t => {
  const item = TECHNIQUES.find(entry => entry.id === 'st-knotty-wood-grain');
  assert.ok(item);
  assert.equal(item.domain, 'style');
  assert.equal(item.category, 'tactile');
  for (const query of ['나뭇결', '옹이', 'wood grain']) assert.ok(matchesSearch(item, query));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><KnotWoodDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(KnotWoodDemo).length, 2);
  const scenes = tree.root.findAllByType('svg');
  const ids = scenes.flatMap(scene => scene.findAll(node => typeof node.type === 'string' && Boolean(node.props.id)).map(node => node.props.id));
  assert.equal(new Set(ids).size, ids.length);
  for (const scene of scenes) {
    assert.equal(scene.props.role, 'img');
    assert.match(scene.props['aria-label'], /옹이/);
    const clip = scene.findByType('clipPath');
    const tone = scene.findByType('linearGradient');
    const clipped = scene.findByProps({ clipPath: `url(#${clip.props.id})` });
    const face = scene.findByProps({ fill: `url(#${tone.props.id})` });
    for (const property of ['x', 'y', 'width', 'height', 'rx']) assert.equal(face.props[property], clip.findByType('rect').props[property]);
    const rings = clipped.findAllByType('ellipse');
    assert.ok(rings.length >= 2);
    for (let i = 0; i < rings.length; i++) {
      assert.ok(Number(rings[i].props.rx) > Number(rings[i].props.ry) * 2);
      if (i) {
        assert.equal(rings[i].props.cx, rings[0].props.cx);
        assert.equal(rings[i].props.cy, rings[0].props.cy);
        assert.ok(Number(rings[i].props.rx) < Number(rings[i - 1].props.rx));
        assert.ok(Number(rings[i].props.ry) < Number(rings[i - 1].props.ry));
      }
    }
    const grain = clipped.findAllByType('g')[0];
    assert.ok(grain.findAllByType('path').length >= 8);
    assert.ok(clipped.findAllByType('path').some(path => /Z$/i.test(path.props.d)));
    assert.equal(scene.findAllByType('button').length, 0);
    assert.equal(scene.findAllByType('filter').length, 0);
  }
});

test('plain-weave textile is discoverable and resolves to the static textile demonstration', t => {
  const item = TECHNIQUES.find(entry => entry.id === 'st-plain-weave-textile');
  assert.ok(item);
  assert.equal(item.domain, 'style');
  assert.equal(item.category, 'tactile');
  for (const query of ['평직', '직물 질감', '날실 씨실']) assert.ok(matchesSearch(item, query));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={item.id} />); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(PlainWeaveDemo).length, 1);
  const scene = tree.root.findByType('svg');
  assert.equal(scene.props.role, 'img');
  assert.match(scene.props['aria-label'], /날실과 씨실/);
  assert.equal(scene.findAllByType('g').at(-1)?.props['aria-hidden'], 'true');
  assert.equal(tree.root.findAllByType('button').length, 0);
  assert.equal(tree.root.findAllByType('input').length, 0);
});

test('plain-weave crossings alternate the visible thread and keep local SVG references isolated', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><PlainWeaveDemo /><PlainWeaveDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const scenes = tree.root.findAllByType('svg');
  const ids = scenes.map(scene => scene.findAll(node => typeof node.type === 'string' && Boolean(node.props.id)).map(node => node.props.id));
  assert.equal(new Set(ids.flat()).size, ids.flat().length);
  for (const scene of scenes) {
    const localIds = new Set(scene.findAll(node => typeof node.type === 'string' && Boolean(node.props.id)).map(node => node.props.id));
    const references = scene.findAll(node => typeof node.type === 'string' && typeof node.props.fill === 'string' && node.props.fill.startsWith('url(#'));
    for (const node of references) assert.ok(localIds.has(node.props.fill.slice(5, -1)));
    const pattern = scene.findByType('pattern');
    assert.equal(pattern.props.patternUnits, 'userSpaceOnUse');
    const groups = pattern.findAllByType('g');
    const visibleThread = (x: number, y: number) => groups.flatMap(group => group.findAllByType('rect').map(rect => ({ rect, fill: group.props.fill })))
      .filter(({ rect }) => x >= Number(rect.props.x) && x < Number(rect.props.x) + Number(rect.props.width) && y >= Number(rect.props.y) && y < Number(rect.props.y) + Number(rect.props.height))
      .at(-1)?.fill;
    const warp = groups[0].props.fill;
    const weft = groups[1].props.fill;
    assert.notEqual(warp, weft);
    const width = Number(pattern.props.width);
    const height = Number(pattern.props.height);
    assert.deepEqual([
      visibleThread(width / 4, height / 4), visibleThread(width * 3 / 4, height / 4),
      visibleThread(width / 4, height * 3 / 4), visibleThread(width * 3 / 4, height * 3 / 4),
    ], [weft, warp, warp, weft]);
  }
});
