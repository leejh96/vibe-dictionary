import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { TECHNIQUES, matchesSearch } from '@vibe-dictionary/catalog';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';
import { PackagingSleeveDemo } from '../src/components/demos/promo/PackagingSleeveDemo';
import { StopMotionFlatlayDemo } from '../src/components/demos/promo/StopMotionFlatlayDemo';
import { ProductCalloutDemo } from '../src/components/demos/promo/ProductCalloutDemo';
import { CinemagraphDemo } from '../src/components/demos/promo/CinemagraphDemo';
import { ProductSectionDemo } from '../src/components/demos/promo/ProductSectionDemo';
import { BeveragePourDemo } from '../src/components/demos/promo/BeveragePourDemo';
import { ProtectiveFilmDemo } from '../src/components/demos/promo/ProtectiveFilmDemo';
import { AtomizerSprayDemo } from '../src/components/demos/promo/AtomizerSprayDemo';
import { HelicalCapDemo } from '../src/components/demos/promo/HelicalCapDemo';
import { CondensationPackshotDemo } from '../src/components/demos/promo/CondensationPackshotDemo';
import { LocaleProvider, useLocale } from '../src/i18n/LocaleContext';

test('promo language switches preserve scrubbed geometry, native inputs and paused motion while translating dynamic labels', t => {
  let setLocale!: ReturnType<typeof useLocale>['setLocale'];
  function Controls() {
    setLocale = useLocale().setLocale;
    return null;
  }
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<LocaleProvider initialLocale="ko"><Controls /><PackagingSleeveDemo /><StopMotionFlatlayDemo /><ProductCalloutDemo /><ProductSectionDemo /><BeveragePourDemo /><ProtectiveFilmDemo /><AtomizerSprayDemo /><HelicalCapDemo /><CinemagraphDemo /><CondensationPackshotDemo /></LocaleProvider>); });
  t.after(() => { act(() => tree.unmount()); });
  const inputs = tree.root.findAllByType('input');
  const scenes = tree.root.findAllByType('svg');
  const pause = tree.root.findByType('button');
  act(() => pause.props.onClick());
  const geometry = () => scenes.map(scene => scene.findAll(node => typeof node.type === 'string').map(node => ({
    type: node.type,
    props: Object.fromEntries(Object.entries(node.props).filter(([key]) => !['children', 'aria-label', 'aria-valuetext'].includes(key))),
  })));
  for (const progress of [0, 25, 50, 90, 100, 25, 0]) {
    act(() => {
      setLocale('ko');
      inputs.forEach(input => input.props.onChange({ currentTarget: { value: String(input.props.min === '-42' ? Math.round(progress * .84 - 42) : progress) } }));
    });
    const before = geometry();
    const labels = inputs.map(input => input.props['aria-valuetext']);
    assert.ok(labels.every(label => /[가-힣]/u.test(label)));
    act(() => setLocale('en'));
    inputs.forEach((input, index) => {
      assert.equal(tree.root.findAllByType('input')[index], input, 'native range stays mounted with its numeric value');
      assert.equal(input.props.value, input.props.min === '-42' ? Math.round(progress * .84 - 42) : progress);
      assert.doesNotMatch(input.props['aria-label'] + input.props['aria-valuetext'], /[가-힣]/u);
      assert.notEqual(input.props['aria-valuetext'], labels[index]);
    });
    assert.deepEqual(geometry(), before, 'language cannot move, resize, restart or recolor any product shape');
    scenes.forEach((scene, index) => assert.equal(tree.root.findAllByType('svg')[index], scene));
    assert.equal(tree.root.findByType('text').children.join(''), 'Dial');
    assert.equal(tree.root.findByType('button'), pause);
    assert.equal(pause.props['aria-pressed'], true);
    assert.equal(pause.props['aria-label'], 'Pause candle cinemagraph');
    assert.equal(tree.root.findByProps({ className: 'pr-cine-flame' }).props.style.animationPlayState, 'paused');
  }
  act(() => setLocale('ko'));
  assert.equal(tree.root.findByType('text').children.join(''), '다이얼');
});

test('condensation beads magnify their own artwork about fixed centers with local clips and no fake controls', t => {
  const entries = TECHNIQUES.filter(entry => entry.id === 'vd-condensation-packshot');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'promo');
  assert.ok(matchesSearch(item, '결로'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><CondensationPackshotDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [first, second] = tree.root.findAllByType(CondensationPackshotDemo);
  const firstIds = new Set(first.findAll(node => typeof node.type === 'string' && !!node.props.id).map(node => node.props.id));
  const secondIds = new Set(second.findAll(node => typeof node.type === 'string' && !!node.props.id).map(node => node.props.id));
  assert.ok([...firstIds].every(id => !secondIds.has(id)), 'all definitions and clips are instance-local');
  assert.equal(first.findAllByType('input').length + first.findAllByType('button').length, 0, 'static packshot has no fake interaction');
  const artwork = first.findByProps({ className: 'pr-dew-product' }).props.href;
  assert.ok(firstIds.has(artwork.slice(1)));
  const beads = first.findAllByProps({ className: 'pr-dew-bead' });
  assert.ok(beads.length > 1);
  assert.ok(new Set(beads.map(bead => bead.findByProps({ className: 'pr-dew-water' }).props.rx)).size > 1);
  for (const bead of beads) {
    const water = bead.findByProps({ className: 'pr-dew-water' });
    const lens = bead.findByProps({ className: 'pr-dew-refraction' });
    const sample = lens.findByType('use');
    const clipId = lens.props.clipPath.match(/^url\(#(.+)\)$/)[1];
    assert.ok(firstIds.has(clipId));
    const mask = first.findByProps({ id: clipId }).findByType('ellipse');
    for (const coordinate of ['cx', 'cy', 'rx', 'ry']) assert.equal(mask.props[coordinate], water.props[coordinate]);
    assert.equal(sample.props.href, artwork, 'all droplets sample the same underlying package, never other droplets');
    const [x, y, scale, inverseX, inverseY] = sample.props.transform.match(/-?\d+(?:\.\d+)?/g).map(Number);
    assert.ok(scale > 1);
    assert.equal((water.props.cx + inverseX) * scale + x, water.props.cx, 'local magnification keeps the droplet center fixed');
    assert.equal((water.props.cy + inverseY) * scale + y, water.props.cy);
    assert.ok(water.props.cx - water.props.rx > 88 && water.props.cx + water.props.rx < 176);
    assert.ok(water.props.cy - water.props.ry > 35 && water.props.cy + water.props.ry < 130, 'beads stay beneath the dry lid and within the body bounds');
    const glint = bead.findByProps({ className: 'pr-dew-glint' });
    const outerX = (Math.abs(glint.props.cx - water.props.cx) + glint.props.rx) / water.props.rx;
    const outerY = (Math.abs(glint.props.cy - water.props.cy) + glint.props.ry) / water.props.ry;
    assert.ok(outerX ** 2 + outerY ** 2 < 1, 'highlight remains inside its bead');
  }
});

test('screw cap turns with a fixed pitch, hides rear marks, then lifts clear while the bottle and native input stay fixed', t => {
  const entries = TECHNIQUES.filter(entry => entry.id === 'vd-helical-cap-unscrew');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'promo');
  assert.ok(matchesSearch(item, '나사 캡'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><HelicalCapDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [first, other] = tree.root.findAllByType(HelicalCapDemo);
  const slider = first.findByType('input');
  const scene = first.findByType('svg');
  const cap = first.findByProps({ className: 'pr-screw-cap' });
  const bottle = first.findByProps({ className: 'pr-screw-bottle' });
  const geometry = () => bottle.findAll(node => typeof node.type === 'string').map(node => Object.fromEntries(Object.entries(node.props).filter(([name]) => name !== 'children')));
  const originalBottle = geometry();
  const change = (value: number) => act(() => slider.props.onChange({ currentTarget: { value: String(value) } }));
  const rise = () => -Number(cap.props.transform.match(/translate\(0 ([^)]+)\)/)[1]);
  assert.equal(slider.props['aria-controls'], scene.props.id);
  assert.notEqual(scene.props.id, other.findByType('svg').props.id);
  assert.equal(first.findByProps({ className: 'pr-screw-cap-side' }).props.fill, `url(#${first.findByType('linearGradient').props.id})`);
  assert.equal(first.findByProps({ className: 'pr-screw-thread' }).props.clipPath, `url(#${first.findByType('clipPath').props.id})`);
  assert.equal(slider.props.min, '0');
  assert.equal(slider.props.max, '100');
  assert.equal(slider.props.step, '1');
  const frames = new Map<number, unknown>();
  for (const progress of [0, 5, 10, 20, 30, 40, 45, 60, 79, 80, 81, 90, 100, 40, 5, 0, 100, 0]) {
    change(progress);
    const badge = first.findAllByProps({ className: 'pr-screw-badge' });
    if ([10, 20, 30, 60].includes(progress)) assert.equal(badge.length, 0, 'rear or edge-on badge must not show through the cap');
    if ([0, 40, 80, 100].includes(progress)) {
      assert.equal(badge.length, 1);
      assert.ok(Math.abs(badge[0].props.cx - 132) < 1e-9);
      assert.equal(badge[0].props.rx, 3);
    }
    if (progress === 40) assert.equal(rise(), 14, 'one complete revolution advances exactly one thread pitch');
    if (progress === 80) assert.equal(rise(), 28, 'two complete revolutions advance two pitches');
    const grooves = first.findByProps({ className: 'pr-screw-grooves' }).findAllByType('path');
    assert.ok(grooves.length > 0 && grooves.length <= 8);
    for (const groove of grooves) assert.ok(groove.props.strokeWidth > 0 && groove.props.strokeWidth <= 1);
    const frame = { cap: cap.props.transform, grooves: grooves.map(node => node.props), badge: badge.map(node => node.props) };
    if (frames.has(progress)) assert.deepEqual(frame, frames.get(progress));
    frames.set(progress, frame);
    assert.deepEqual(geometry(), originalBottle);
    assert.equal(first.findByType('input'), slider);
    assert.equal(first.findByType('svg'), scene);
    assert.equal(other.findByType('input').props.value, 0);
  }
  for (let progress = 0; progress <= 100; progress++) {
    change(progress);
    assert.ok(51 - rise() > 0 && 82 - rise() < 148, 'cap silhouette stays entirely in the scene through all intermediate frames');
  }
  const lip = first.findByProps({ className: 'pr-screw-lip' });
  const actualCapBottom = 82 - rise();
  const neckTop = Number(lip.props.cy) - Number(lip.props.ry);
  assert.equal(neckTop - actualCapBottom, 12, 'final cap is fully clear of the neck');
  assert.equal(slider.props['aria-valuetext'], '캡이 병과 완전히 분리됨');
});

test('atomizer spray emits from the held nozzle, lets released mist travel during pump return and restores scrubbed frames', t => {
  const entries = TECHNIQUES.filter(entry => entry.id === 'vd-fragrance-atomizer-spray');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'promo');
  assert.ok(matchesSearch(item, '향수 분사'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><AtomizerSprayDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [first, other] = tree.root.findAllByType(AtomizerSprayDemo);
  const slider = first.findByType('input');
  const scene = first.findByType('svg');
  const head = first.findByProps({ className: 'pr-spray-head' });
  const nozzle = first.findByProps({ className: 'pr-spray-nozzle' });
  const mist = first.findByProps({ className: 'pr-spray-mist' });
  const bottle = first.findByProps({ className: 'pr-spray-bottle' });
  const geometry = () => bottle.findAll(node => typeof node.type === 'string').map(node => Object.fromEntries(Object.entries(node.props).filter(([name]) => name !== 'children')));
  const originalBottle = geometry();
  const change = (value: number) => act(() => slider.props.onChange({ currentTarget: { value: String(value) } }));
  assert.equal(slider.props['aria-controls'], scene.props.id);
  assert.notEqual(scene.props.id, other.findByType('svg').props.id);
  assert.equal(slider.props.min, '0');
  assert.equal(slider.props.max, '100');
  assert.equal(slider.props.step, '1');
  const frames = new Map<number, unknown>();
  for (const progress of [0, 10, 20, 21, 35, 50, 55, 65, 75, 85, 86, 100, 35, 21, 0, 100, 0]) {
    change(progress);
    const droplets = mist.findAllByType('circle');
    if (progress <= 20 || progress >= 86) assert.equal(droplets.length, 0);
    else assert.ok(droplets.length > 0);
    if (progress >= 20 && progress <= 55) {
      assert.equal(head.props.transform, 'translate(0 6)');
      assert.equal(Number(nozzle.props.cy) + 6, 46, 'all emission begins at the actual depressed nozzle height');
    }
    for (const drop of droplets) {
      assert.ok(drop.props.cx > Number(nozzle.props.cx));
      assert.ok(drop.props.cx + drop.props.r < 264 && drop.props.cy - drop.props.r > 0 && drop.props.cy + drop.props.r < 148, 'mist remains inside the scene');
      assert.ok(drop.props.opacity > 0 && drop.props.opacity <= .55);
    }
    const frame = { head: head.props.transform, mist: droplets.map(drop => drop.props) };
    if (frames.has(progress)) assert.deepEqual(frame, frames.get(progress));
    frames.set(progress, frame);
    assert.deepEqual(geometry(), originalBottle);
    assert.equal(first.findByType('input'), slider);
    assert.equal(first.findByType('svg'), scene);
    assert.equal(other.findByType('input').props.value, 0);
  }
  change(55);
  const released = mist.findAllByType('circle').at(-1)!;
  const before = { x: released.props.cx, y: released.props.cy };
  change(65);
  assert.ok(mist.findAllByType('circle').includes(released), 'existing droplet node survives the pump return');
  assert.equal(head.props.transform, 'translate(0 3)');
  assert.ok(released.props.cx > before.x && released.props.cy > before.y, 'released lower-cone droplet moves outward/downward while nozzle rises');
  change(100);
  assert.equal(head.props.transform, 'translate(0 0)');
  assert.equal(slider.props['aria-valuetext'], '분무가 사라지고 펌프 복귀 완료');
});

test('protective film maintains connected curl geometry, fixed device and complete separation through forward and reverse input', t => {
  const entries = TECHNIQUES.filter(entry => entry.id === 'vd-protective-film-peel');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'promo');
  assert.ok(matchesSearch(item, '필름 벗기기'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><ProtectiveFilmDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [first, other] = tree.root.findAllByType(ProtectiveFilmDemo);
  const scene = first.findByType('svg');
  const slider = first.findByType('input');
  const sheet = first.findByProps({ className: 'pr-film-sheet' });
  const device = first.findByProps({ className: 'pr-film-device' });
  const geometry = () => device.findAll(node => typeof node.type === 'string').map(node => ({ type: node.type, props: Object.fromEntries(Object.entries(node.props).filter(([name]) => name !== 'children')) }));
  const originalDevice = geometry();
  assert.equal(slider.props['aria-controls'], scene.props.id);
  assert.notEqual(scene.props.id, other.findByType('svg').props.id);
  assert.notEqual(first.findByType('clipPath').props.id, other.findByType('clipPath').props.id);
  assert.equal(slider.props.min, '0');
  assert.equal(slider.props.max, '100');
  assert.equal(slider.props.step, '1');
  const frames = new Map<number, unknown>();
  for (const progress of [0, 1, 10, 45, 89, 90, 91, 95, 100, 45, 1, 0, 100, 0]) {
    act(() => slider.props.onChange({ currentTarget: { value: String(progress) } }));
    const adhered = first.findAllByProps({ className: 'pr-film-adhered' });
    const back = first.findAllByProps({ className: 'pr-film-back' });
    const curls = first.findAllByProps({ className: 'pr-film-curl' });
    assert.equal(adhered.length, progress < 90 ? 1 : 0);
    assert.equal(back.length, progress > 0 ? 1 : 0);
    assert.equal(curls.length, back.length);
    if (adhered.length) {
      assert.ok(adhered[0].props.height > 0 && adhered[0].props.height <= 52);
      assert.equal(adhered[0].props.clipPath, `url(#${first.findByType('clipPath').props.id})`);
    }
    if (back.length) {
      const backside = back[0].props.d.match(/-?\d+(?:\.\d+)?/g).map(Number);
      const curl = curls[0].props.d.match(/-?\d+(?:\.\d+)?/g).map(Number);
      assert.deepEqual(backside.slice(0, 6), curl.slice(0, 6), 'back face and curl share exactly the same fold curve');
      const foldY = backside[1];
      if (adhered.length) assert.equal(70 + adhered[0].props.height, foldY, 'adhered film joins the folding edge');
      assert.equal(curls[0].props.fill, `url(#${first.findByType('linearGradient').props.id})`);
      const lift = Number(sheet.props.transform.match(/translate\(0 ([^)]+)\)/)[1]);
      // Exact midpoint is the extremum of these symmetric quadratic edges.
      const lowestFold = (foldY + backside[3]) / 2 + lift;
      const highestFreeEdge = (backside[7] + backside[9]) / 2 + lift;
      assert.ok(highestFreeEdge > 0 && lowestFold < 148, 'whole sheet stays inside the scene');
      if (progress === 100) {
        assert.ok(lowestFold < 62, 'removed film is physically separated from the device top');
        assert.equal(slider.props['aria-valuetext'], '필름이 기기와 완전히 분리됨');
      }
    }
    const frame = { sheet: sheet.props.transform, adhered: adhered.map(node => node.props.height), back: back.map(node => node.props.d), curl: curls.map(node => node.props.d) };
    if (frames.has(progress)) assert.deepEqual(frame, frames.get(progress));
    frames.set(progress, frame);
    assert.deepEqual(geometry(), originalDevice);
    assert.equal(first.findByType('svg'), scene);
    assert.equal(first.findByType('input'), slider);
    assert.equal(other.findByType('input').props.value, 0);
  }
  assert.equal(first.findByProps({ className: 'pr-film-adhered' }).props.height, 52);
});

test('beverage pour stages preserve the mouth-to-surface connection, clipped fill, reverse frames and instance isolation', t => {
  const entries = TECHNIQUES.filter(entry => entry.id === 'vd-beverage-pour-shot');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'promo');
  assert.ok(matchesSearch(item, '음료 따르기'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><BeveragePourDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [first, other] = tree.root.findAllByType(BeveragePourDemo);
  const slider = first.findByType('input');
  const scene = first.findByType('svg');
  const bottle = first.findByProps({ className: 'pr-pour-bottle' });
  const glass = first.findByProps({ className: 'pr-pour-glass-outline' });
  const originalGlass = glass.props;
  assert.equal(slider.props['aria-controls'], scene.props.id);
  assert.notEqual(scene.props.id, other.findByType('svg').props.id);
  assert.equal(slider.props.min, '0');
  assert.equal(slider.props.max, '100');
  assert.equal(slider.props.step, '1');
  const frames = new Map<number, unknown>();
  for (const progress of [0, 8, 15, 16, 23, 50, 77, 84, 85, 92, 100, 50, 16, 0, 100, 0]) {
    act(() => slider.props.onChange({ currentTarget: { value: String(progress) } }));
    const stream = first.findAllByProps({ className: 'pr-pour-stream' });
    const fill = first.findAllByProps({ className: 'pr-pour-liquid' });
    assert.equal(stream.length, progress > 15 && progress < 85 ? 1 : 0);
    assert.equal(fill.length, progress > 15 ? 1 : 0);
    if (fill.length) {
      assert.equal(fill[0].props.clipPath, `url(#${first.findByType('clipPath').props.id})`);
      const surface = first.findByProps({ className: 'pr-pour-surface' });
      const liquid = first.findByProps({ className: 'pr-pour-tea' });
      assert.equal(surface.props.cy, liquid.props.y, 'liquid top and surface remain joined');
      assert.ok(surface.props.cy >= 80 && surface.props.cy < 120);
      if (stream.length) {
        const coords = stream[0].props.d.match(/-?\d+(?:\.\d+)?/g).map(Number);
        assert.deepEqual(coords.slice(0, 2), [115, 44], 'stream starts at the translated bottle pivot and mouth');
        assert.deepEqual(coords.slice(-2), [Number(surface.props.cx), surface.props.cy], 'stream reaches the current surface without a gap');
        assert.equal(bottle.props.transform, 'translate(-20 0) rotate(0 135 44)', 'bottle stays tipped during the active pour');
      }
    }
    const frame = { bottle: bottle.props.transform, stream: stream.map(node => node.props), fill: fill.map(node => node.findAllByType('rect').map(rect => rect.props)) };
    if (frames.has(progress)) assert.deepEqual(frame, frames.get(progress), 'reverse and rapid input restores the same visual state');
    frames.set(progress, frame);
    assert.deepEqual(glass.props, originalGlass);
    assert.equal(first.findByType('input'), slider);
    assert.equal(first.findByType('svg'), scene);
    assert.equal(other.findByType('input').props.value, 0);
  }
  assert.equal(bottle.props.transform, 'translate(-20 0) rotate(-60 135 44)');
  assert.equal(slider.props['aria-valuetext'], '병을 기울임 · 빈 잔');
});

test('pour bottle remains separated from the glass throughout both tilt intervals', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<BeveragePourDemo />); });
  t.after(() => { act(() => tree.unmount()); });
  const slider = tree.root.findByType('input');
  const bottle = tree.root.findByProps({ className: 'pr-pour-bottle' });
  for (let progress = 0; progress <= 100; progress++) {
    act(() => slider.props.onChange({ currentTarget: { value: String(progress) } }));
    const [offsetX, offsetY, degrees, pivotX, pivotY] = bottle.props.transform.match(/-?\d+(?:\.\d+)?/g).map(Number);
    const angle = degrees * Math.PI / 180;
    // This rectangle encloses the entire bottle silhouette, including its strokes.
    const corners = [[59, 19], [136, 19], [136, 65], [59, 65]].map(([x, y]) => ({
      x: offsetX + pivotX + (x - pivotX) * Math.cos(angle) - (y - pivotY) * Math.sin(angle),
      y: offsetY + pivotY + (x - pivotX) * Math.sin(angle) + (y - pivotY) * Math.cos(angle),
    }));
    const lowerHull = corners.filter(point => point.y >= 68);
    corners.forEach((point, index) => {
      const next = corners[(index + 1) % corners.length];
      if ((point.y < 68) !== (next.y < 68)) {
        lowerHull.push({ x: point.x + (next.x - point.x) * (68 - point.y) / (next.y - point.y), y: 68 });
      }
    });
    for (const point of lowerHull) {
      const glassLeft = 130 + (point.y - 68) * 7 / 56;
      assert.ok(point.x + 1 < glassLeft, `bottle clears the glass at progress ${progress}`);
    }
    assert.ok(corners.every(point => point.x > 0 && point.x < 264 && point.y > 0 && point.y < 148), 'whole bottle stays inside the scene');
  }
});

test('product sections obey sphere intersections and layer entry boundaries while the outer product stays fixed', t => {
  const entries = TECHNIQUES.filter(entry => entry.id === 'vd-product-cross-section');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'promo');
  assert.ok(matchesSearch(item, '제품 단면'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><ProductSectionDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [first, other] = tree.root.findAllByType(ProductSectionDemo);
  const slider = first.findByType('input');
  const scene = first.findByType('svg');
  const shell = first.findByProps({ className: 'pr-section-shell' });
  const originalShell = shell.props;
  assert.equal(slider.props['aria-controls'], scene.props.id);
  assert.notEqual(scene.props.id, other.findByType('svg').props.id);
  const gradient = first.findByType('radialGradient');
  assert.equal(shell.props.fill, `url(#${gradient.props.id})`);
  const change = (depth: number) => act(() => slider.props.onChange({ currentTarget: { value: String(depth) } }));
  const sections = () => first.findByProps({ className: 'pr-section-result' }).findAllByType('circle');
  for (const [depth, layers] of [[-42, 1], [-34, 1], [-33, 2], [-20, 2], [-19, 3], [0, 3], [19, 3], [20, 2], [33, 2], [34, 1], [42, 1], [-42, 1]]) {
    change(depth);
    const circles = sections();
    assert.equal(circles.length, layers);
    circles.forEach((circle, index) => {
      assert.ok(Math.abs(circle.props.r ** 2 + depth ** 2 - [44, 34, 20][index] ** 2) < 1e-9, 'section radius and depth satisfy the sphere equation');
      assert.ok(circle.props.r > 0 && circle.props.r <= 44);
    });
    assert.deepEqual(shell.props, originalShell);
    assert.equal(other.findByType('input').props.value, -42);
    assert.equal(first.findByType('input'), slider);
    assert.equal(first.findByType('svg'), scene);
  }
  change(-19);
  const left = sections().map(circle => circle.props.r);
  change(19);
  assert.deepEqual(sections().map(circle => circle.props.r), left);
  change(0);
  assert.deepEqual(sections().map(circle => circle.props.r), [44, 34, 20]);
  assert.equal(slider.props['aria-valuetext'], '공의 중앙 단면');
});

test('cinemagraph pause toggles the existing motion layer without remounting or altering its still life', t => {
  const entries = TECHNIQUES.filter(entry => entry.id === 'vd-selective-motion-cinemagraph');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'promo');
  assert.ok(matchesSearch(item, '시네마그래프'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><CinemagraphDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [first, other] = tree.root.findAllByType(CinemagraphDemo);
  const button = first.findByType('button');
  const flame = first.findByProps({ className: 'pr-cine-flame' });
  const still = first.findByProps({ className: 'pr-cine-still' });
  const stillGeometry = () => still.findAll(node => typeof node.type === 'string').map(node => ({
    type: node.type,
    attributes: Object.fromEntries(Object.entries(node.props).filter(([name]) => name !== 'children')),
  }));
  const originalStill = stillGeometry();
  assert.equal(button.props['aria-pressed'], false);
  assert.equal(flame.props.style.animationPlayState, 'running');
  for (const paused of [true, false, true, false]) {
    act(() => button.props.onClick());
    assert.equal(button.props['aria-pressed'], paused);
    assert.equal(flame.props.style.animationPlayState, paused ? 'paused' : 'running');
    assert.deepEqual(stillGeometry(), originalStill);
    assert.equal(first.findByType('button'), button);
    assert.equal(first.findByProps({ className: 'pr-cine-flame' }), flame);
    assert.equal(first.findByProps({ className: 'pr-cine-still' }), still);
    assert.equal(other.findByType('button').props['aria-pressed'], false);
  }
});

test('product callout keeps its leader on the moving physical dial while the feature label stays fixed', t => {
  const entries = TECHNIQUES.filter(entry => entry.id === 'vd-product-feature-callout');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'promo');
  assert.ok(matchesSearch(item, '제품 콜아웃'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><ProductCalloutDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [first, other] = tree.root.findAllByType(ProductCalloutDemo);
  const slider = first.findByType('input');
  const scene = first.findByType('svg');
  const camera = first.findByProps({ className: 'pr-callout-camera' });
  const dial = first.findByProps({ className: 'pr-callout-dial' });
  const marker = first.findByProps({ className: 'pr-callout-marker' });
  const ring = first.findByProps({ className: 'pr-callout-marker-ring' });
  const line = first.findByType('polyline');
  const label = first.findByType('text');
  const originalLabel = label.props;
  const initial = camera.props.transform;
  assert.equal(slider.props['aria-controls'], scene.props.id);
  assert.notEqual(scene.props.id, other.findByType('svg').props.id);
  for (const progress of [0, 25, 50, 100, 25, 0]) {
    act(() => slider.props.onChange({ currentTarget: { value: String(progress) } }));
    const [worldX, worldY] = camera.props.transform.match(/-?\d+(?:\.\d+)?/g).map(Number);
    const anchor = [worldX + Number(dial.props.cx), worldY + Number(dial.props.cy)];
    assert.deepEqual([marker.props.cx, Number(marker.props.cy)], anchor);
    assert.deepEqual([ring.props.cx, Number(ring.props.cy)], anchor);
    const [start, ...ends] = line.props.points.split(' ').map((point: string) => point.split(',').map(Number));
    assert.deepEqual(start, anchor);
    assert.deepEqual(ends, [[193, 34], [238, 34]]);
    assert.deepEqual(label.props, originalLabel);
    assert.equal(other.findByType('input').props.value, 0);
    assert.equal(first.findByType('input'), slider);
    assert.equal(first.findByType('svg'), scene);
    assert.ok(worldX - 57 > 0 && worldX + 58 < 264, 'product and its shadow remain inside the scene');
  }
  assert.equal(camera.props.transform, initial);
});

test('stop motion holds each pose, jumps at frame boundaries and restores it when scrubbed backwards', t => {
  const entries = TECHNIQUES.filter(entry => entry.id === 'vd-stop-motion-flatlay');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'promo');
  assert.ok(matchesSearch(item, '스톱모션'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><StopMotionFlatlayDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [first, other] = tree.root.findAllByType(StopMotionFlatlayDemo);
  const slider = first.findByType('input');
  const scene = first.findByType('svg');
  const mug = first.findByProps({ className: 'pr-stop-mug' });
  const transforms = () => [mug, ...first.findAllByProps({ className: 'pr-stop-bean' })].map(node => node.props.transform);
  const initial = transforms();
  assert.equal(slider.props.value, 0);
  assert.equal(slider.props['aria-controls'], scene.props.id);
  assert.notEqual(scene.props.id, other.findByType('svg').props.id);
  const change = (progress: number) => act(() => slider.props.onChange({ currentTarget: { value: String(progress) } }));
  change(12);
  assert.deepEqual(transforms(), initial, 'one range interval holds the identical scene');
  change(13);
  assert.notDeepEqual(transforms(), initial, 'the next interval selects a new stop-motion pose');
  const second = transforms();
  change(100);
  assert.equal(slider.props['aria-valuetext'], '오른쪽 마지막 포즈');
  assert.equal(mug.props.transform, 'translate(174 74) rotate(20)');
  change(13);
  assert.deepEqual(transforms(), second);
  const poses = new Set<string>();
  for (const progress of [0, 13, 25, 38, 50, 63, 75, 88]) {
    change(progress);
    const pose = transforms();
    poses.add(JSON.stringify(pose));
    change(progress + 11);
    assert.deepEqual(transforms(), pose, 'every frame interval has a held pose');
  }
  assert.equal(poses.size, 8);
  change(0);
  assert.deepEqual(transforms(), initial);
  assert.equal(other.findByType('input').props.value, 0);
  assert.equal(first.findByType('input'), slider);
  assert.equal(first.findByType('svg'), scene);
});

test('packaging reveal opens and recloses without changing product geometry or the other instance', t => {
  const entries = TECHNIQUES.filter(entry => entry.id === 'vd-packaging-sleeve-reveal');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'promo');
  assert.ok(matchesSearch(item, '언박싱'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><PackagingSleeveDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [first, other] = tree.root.findAllByType(PackagingSleeveDemo);
  const slider = first.findByType('input');
  const scene = first.findByType('svg');
  const tray = first.findByProps({ className: 'pr-sleeve-tray' });
  const sleeve = first.findByProps({ className: 'pr-sleeve-cover' });
  const product = first.findByProps({ className: 'pr-sleeve-product' });
  const originalProduct = JSON.stringify(product.findAllByType('rect').map(rect => rect.props));
  assert.equal(slider.props.type, 'range');
  assert.equal(slider.props.min, '0');
  assert.equal(slider.props.max, '100');
  assert.equal(slider.props.step, '1');
  assert.equal(slider.props['aria-controls'], scene.props.id);
  assert.notEqual(scene.props.id, other.findByType('svg').props.id);
  assert.equal(slider.props.value, 0);
  assert.equal(slider.props['aria-valuetext'], '포장이 닫힘');
  const coverFace = sleeve.findByType('rect').props;
  for (const { props } of product.findAllByType('rect')) {
    assert.ok(Number(props.x) >= Number(coverFace.x) && Number(props.x) + Number(props.width) <= Number(coverFace.x) + Number(coverFace.width));
    assert.ok(Number(props.y) >= Number(coverFace.y) && Number(props.y) + Number(props.height) <= Number(coverFace.y) + Number(coverFace.height));
  }
  assert.equal(scene.findByProps({ 'aria-hidden': 'true' }).children.at(-1), sleeve, 'opaque sleeve is painted over the bottle');

  for (const progress of [50, 100, 25, 0]) {
    act(() => slider.props.onChange({ currentTarget: { value: String(progress) } }));
    const trayX = Number(tray.props.transform.match(/translate\((\S+)/)[1]);
    const sleeveX = Number(sleeve.props.transform.match(/translate\((\S+)/)[1]);
    assert.equal(trayX, progress * .57);
    assert.equal(sleeveX + trayX, 0);
    assert.equal(slider.props.value, progress);
    assert.equal(other.findByType('input').props.value, 0);
    assert.equal(JSON.stringify(product.findAllByType('rect').map(rect => rect.props)), originalProduct);
    assert.equal(first.findByType('input'), slider);
    assert.equal(first.findByType('svg'), scene);
    if (progress === 100) {
      assert.ok(192 + sleeveX < 80 + trayX, 'the entire sleeve, including its side, clears the tray');
      assert.ok(78 + sleeveX > 0 && 184 + trayX < 264, 'both parts stay inside the scene');
      assert.equal(slider.props['aria-valuetext'], '슬리브가 빠지고 제품이 드러남');
    }
  }
  assert.equal(tray.props.transform, 'translate(0 0)');
  assert.equal(sleeve.props.transform, 'translate(0 0)');
  assert.equal(slider.props['aria-valuetext'], '포장이 닫힘');
});
