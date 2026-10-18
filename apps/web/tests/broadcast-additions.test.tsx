import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { TECHNIQUES, matchesSearch } from '@vibe-dictionary/catalog';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';
import { BROADCAST_ADDITION_DEMOS } from '../src/components/demos/broadcast';
import { WordHighlightSubtitlesDemo } from '../src/components/demos/broadcast/WordHighlightSubtitlesDemo';
import { EndCreditRollDemo } from '../src/components/demos/broadcast/EndCreditRollDemo';
import { GreenDifferenceKeyDemo } from '../src/components/demos/broadcast/GreenDifferenceKeyDemo';
import { CornerPictureInPictureDemo } from '../src/components/demos/broadcast/CornerPictureInPictureDemo';
import { BroadcastColorBarsDemo } from '../src/components/demos/broadcast/BroadcastColorBarsDemo';
import { DipToBlackDemo } from '../src/components/demos/broadcast/DipToBlackDemo';
import { FaceBlurMaskDemo } from '../src/components/demos/broadcast/FaceBlurMaskDemo';
import { CinematicLetterboxDemo } from '../src/components/demos/broadcast/CinematicLetterboxDemo';
import { AlphaChannelViewDemo } from '../src/components/demos/broadcast/AlphaChannelViewDemo';
import { FreezeFrameHoldDemo } from '../src/components/demos/broadcast/FreezeFrameHoldDemo';
import { LocaleProvider, useLocale } from '../src/i18n/LocaleContext';

test('broadcast controls keep their state and mounted artwork while all dynamic text switches live between Korean and English', t => {
  let tree!: ReturnType<typeof create>;
  let changeLocale!: ReturnType<typeof useLocale>['setLocale'];
  function CaptureLocale() { changeLocale = useLocale().setLocale; return null; }
  act(() => { tree = create(<LocaleProvider initialLocale="ko"><CaptureLocale /><WordHighlightSubtitlesDemo /><EndCreditRollDemo /><GreenDifferenceKeyDemo /><CornerPictureInPictureDemo /><BroadcastColorBarsDemo /><DipToBlackDemo /><FaceBlurMaskDemo /><CinematicLetterboxDemo /><AlphaChannelViewDemo /><FreezeFrameHoldDemo /></LocaleProvider>); });
  t.after(() => { act(() => tree.unmount()); });
  const caption = tree.root.findByType(WordHighlightSubtitlesDemo);
  const credits = tree.root.findByType(EndCreditRollDemo);
  const key = tree.root.findByType(GreenDifferenceKeyDemo);
  const pip = tree.root.findByType(CornerPictureInPictureDemo);
  const dip = tree.root.findByType(DipToBlackDemo);
  const face = tree.root.findByType(FaceBlurMaskDemo);
  const letterbox = tree.root.findByType(CinematicLetterboxDemo);
  const alpha = tree.root.findByType(AlphaChannelViewDemo);
  const hold = tree.root.findByType(FreezeFrameHoldDemo);
  const captionWords = caption.findAllByProps({ className: 'bc-caption-word' });
  const creditRows = credits.findAllByProps({ className: 'bc-credit-row' });
  const inputs = [key, dip, face, letterbox, hold].map(demo => demo.findByType('input'));
  const values = [1, 50, 77, 30, 55];
  const buttons = tree.root.findAllByType('button');
  const scenes = tree.root.findAllByProps({ role: 'img' });
  const source = alpha.findByProps({ className: 'bc-alpha-source' });
  const car = hold.findByProps({ className: 'bc-hold-car' });
  const inset = pip.findByProps({ className: 'bc-pip-inset' });
  act(() => {
    caption.findByType('button').props.onClick();
    credits.findByType('button').props.onClick();
    pip.findAllByType('button')[0].props.onClick();
    alpha.findAllByType('button')[1].props.onClick();
    face.findByType('button').props.onClick();
    inputs.forEach((input, index) => input.props.onChange({ currentTarget: { value: String(values[index]) } }));
  });
  const alphaFilter = source.props.filter;
  const heldTransform = car.props.transform;
  act(() => changeLocale('en'));
  assert.doesNotMatch(JSON.stringify(tree.toJSON()), /[가-힣ㄱ-ㅎㅏ-ㅣ]/u);
  assert.equal(caption.findByType('button').props['aria-label'], 'Resume subtitle highlighting');
  assert.equal(credits.findByType('button').props['aria-label'], 'Resume credit roll');
  assert.deepEqual(captionWords.map(word => word.children.join('')), ['We', 'make', 'tomorrow', 'a', 'little', 'clearer']);
  assert.deepEqual(credits.findAllByType('dt').map(role => role.children.join('')), ['Direction', 'Camera', 'Lighting', 'Editing', 'Music']);
  assert.match(face.findByProps({ className: 'bc-face-scene' }).props['aria-label'], /removed.*77%/);
  assert.match(dip.findByType('svg').props['aria-label'], /Complete black/);
  assert.match(hold.findByType('input').props['aria-valuetext'], /55%, mid-frame hold/);
  assert.match(letterbox.findByType('input').props['aria-valuetext'], /to 1/);
  assert.equal(key.findByType('input').props['aria-valuetext'], 'Key strength 1');
  for (const locale of ['ko', 'en', 'ko'] as const) {
    act(() => changeLocale(locale));
    assert.deepEqual(inputs.map(input => input.props.value), values);
    assert.deepEqual(tree.root.findAllByType('button'), buttons);
    assert.deepEqual(tree.root.findAllByProps({ role: 'img' }), scenes);
    assert.deepEqual(caption.findAllByProps({ className: 'bc-caption-word' }), captionWords);
    assert.deepEqual(credits.findAllByProps({ className: 'bc-credit-row' }), creditRows);
    assert.equal(caption.findByProps({ className: 'bc-caption-frame' }).props['data-paused'], true);
    assert.equal(credits.findByProps({ className: 'bc-credit-frame' }).props['data-paused'], true);
    assert.equal(alpha.findByProps({ className: 'bc-alpha-source' }), source);
    assert.equal(source.props.filter, alphaFilter);
    assert.equal(hold.findByProps({ className: 'bc-hold-car' }), car);
    assert.equal(car.props.transform, heldTransform);
    assert.equal(pip.findByProps({ className: 'bc-pip-inset' }), inset);
    assert.deepEqual(inset.props.style, { left: '6%', top: '6%' });
    assert.equal(face.findByProps({ className: 'bc-face-mask' }).props.opacity, 0);
    assert.deepEqual(pip.findAllByType('button').map(button => button.props['aria-pressed']), [true, false, false, false]);
    assert.deepEqual(alpha.findAllByType('button').map(button => button.props['aria-pressed']), [false, true]);
  }
  assert.equal(caption.findByType('button').props['aria-label'], '자막 강조 재개');
  assert.equal(credits.findByType('button').props['aria-label'], '크레딧 롤 재개');
});

test('freeze-frame holds the whole source pose while timeline advances, then resumes continuously and reverses with stable DOM', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><FreezeFrameHoldDemo /><FreezeFrameHoldDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const demos = tree.root.findAllByType(FreezeFrameHoldDemo);
  const scenes = demos.map(demo => demo.findByType('svg'));
  const inputs = demos.map(demo => demo.findByType('input'));
  const car = scenes[0].findByProps({ className: 'bc-hold-car' });
  const backdrop = scenes[0].findByProps({ className: 'bc-hold-backdrop' });
  const wheels = car.findAllByProps({ className: 'bc-hold-wheel' });
  const frozenPose = [car.props.transform, ...wheels.map(wheel => wheel.props.transform)];
  const road = backdrop.findByProps({ className: 'bc-hold-road' });
  assert.notEqual(scenes[0].props.id, scenes[1].props.id);
  assert.deepEqual(inputs.map(input => input.props.value), [50, 50]);
  for (let index = 0; index < 2; index++) assert.equal(inputs[index].props['aria-controls'], scenes[index].props.id);
  const samples = new Map<number, number>();
  for (const value of [...Array.from({ length: 101 }, (_, index) => index), 100, 60, 40, 39, 61, 50, 0]) {
    act(() => inputs[0].props.onChange({ currentTarget: { value: String(value) } }));
    const distance = Number(car.props.transform.match(/^translate\(([-.\d]+) 0\)$/)[1]);
    samples.set(value, distance);
    assert.ok(10.5 + distance >= 10.5 && 89.5 + distance <= 253.5, 'stroke-inclusive vehicle bounds remain inside stage');
    for (const [index, wheel] of wheels.entries()) {
      const match = wheel.props.transform.match(/^rotate\(([-.\d]+) (\d+) 107\)$/);
      const angle = Number(match[1]);
      assert.equal(Number(match[2]), index === 0 ? 28 : 72);
      assert.ok(Math.abs(angle * Math.PI / 180 * 17.5 - distance) < 1e-10, 'wheel rotation must use the same held source pose');
      const tire = wheel.findByProps({ className: 'bc-hold-tire' });
      assert.equal(tire.props.cy + tire.props.r + 1.5, 124.5);
    }
    if (value >= 40 && value <= 60) {
      assert.deepEqual([car.props.transform, ...wheels.map(wheel => wheel.props.transform)], frozenPose);
      assert.match(inputs[0].props['aria-valuetext'], /중간 프레임 홀드/);
    }
    assert.equal(inputs[1].props.value, 50);
    assert.equal(scenes[0].findByProps({ className: 'bc-hold-car' }), car);
    assert.equal(scenes[0].findByProps({ className: 'bc-hold-backdrop' }), backdrop);
    assert.equal(backdrop.findByProps({ className: 'bc-hold-road' }), road);
    assert.deepEqual(car.findAllByProps({ className: 'bc-hold-wheel' }), wheels);
    assert.equal(demos[0].findByType('input'), inputs[0]);
  }
  for (const [value, distance] of [[0, 0], [20, 41], [40, 82], [60, 82], [80, 123], [100, 164]]) {
    assert.ok(Math.abs(samples.get(value)! - distance) < 1e-10);
  }
  assert.ok(Math.abs(samples.get(40)! - samples.get(39)! - 2.05) < 1e-10);
  assert.ok(Math.abs(samples.get(61)! - samples.get(60)! - 2.05) < 1e-10);
});

test('freeze-frame hold segment uniquely resolves from public broadcast catalog and Korean/English search', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'vd-freeze-frame-hold');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'broadcast');
  assert.equal(BROADCAST_ADDITION_DEMOS[item.id], FreezeFrameHoldDemo);
  for (const query of ['프리즈 프레임', '정지 프레임 삽입', '타임 리매핑', 'FREEZE FRAME', 'hold segment']) assert.ok(matchesSearch(item, query));
  assert.ok(matchesSearch(item, '프리즈 프레임 존재하지않는검색어'), 'two of three terms meet the ranked-search threshold');
  assert.ok(!matchesSearch(item, '존재하지않는검색어'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={item.id} />); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(FreezeFrameHoldDemo).length, 1);
});

test('alpha view extracts actual input alpha independent of RGB, excludes checkerboard and preserves source/control DOM on reselection', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><AlphaChannelViewDemo /><AlphaChannelViewDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const demos = tree.root.findAllByType(AlphaChannelViewDemo);
  const scenes = demos.map(demo => demo.findByType('svg'));
  const sources = scenes.map(scene => scene.findByProps({ className: 'bc-alpha-source' }));
  const backdrop = scenes[0].findByProps({ className: 'bc-alpha-backdrop' });
  const filters = scenes.map(scene => scene.findByType('filter'));
  const buttons = demos[0].findAllByType('button');
  const shapes = sources[0].children;
  const shapeSnapshots = shapes.map(shape => ({ ...(shape as { props: object }).props }));
  const matrix = filters[0].findByType('feColorMatrix').props.values.split(' ').map(Number);
  assert.notEqual(scenes[0].props.id, scenes[1].props.id);
  assert.notEqual(filters[0].props.id, filters[1].props.id);
  assert.equal(filters[0].props.colorInterpolationFilters, 'sRGB');
  assert.deepEqual([filters[0].props.x, filters[0].props.y, filters[0].props.width, filters[0].props.height], [0, 0, 264, 144]);
  for (const alpha of [0, 0.25, 0.5, 0.75, 1]) {
    for (const rgb of [[1, 0, 0], [0, 1, 0], [0, 0, 1], [0.1, 0.4, 0.8]]) {
      const pixel = [...rgb, alpha, 1];
      const result = [0, 1, 2, 3].map(row => matrix.slice(row * 5, row * 5 + 5).reduce((sum: number, coefficient: number, column: number) => sum + coefficient * pixel[column], 0));
      assert.deepEqual(result, [alpha, alpha, alpha, 1], 'alpha must become opaque grayscale, not RGB luminance');
    }
  }
  assert.equal(sources[0].findByType('circle').props.fill, 'none', 'ring center has real alpha zero');
  assert.equal(sources[0].findAllByType('rect')[0].props.opacity, 0.5);
  assert.deepEqual(scenes[0].findByType('linearGradient').findAllByType('stop').map(stop => stop.props.stopOpacity), [1, 0]);
  assert.equal(backdrop.props.filter, undefined);
  assert.ok(!sources[0].children.includes(backdrop), 'checkerboard must not be part of source alpha');
  for (const button of buttons) assert.equal(button.props['aria-controls'], scenes[0].props.id);
  assert.deepEqual(buttons.map(button => button.props['aria-pressed']), [true, false]);
  for (const selected of [1, 1, 0, 1, 0, 0]) {
    act(() => buttons[selected].props.onClick());
    assert.equal(sources[0].props.filter, selected === 1 ? `url(#${filters[0].props.id})` : undefined);
    assert.equal(sources[1].props.filter, undefined);
    assert.deepEqual(buttons.map(button => button.props['aria-pressed']), [selected === 0, selected === 1]);
    assert.equal(scenes[0].findByProps({ className: 'bc-alpha-source' }), sources[0]);
    assert.deepEqual(sources[0].children, shapes);
    assert.deepEqual(sources[0].children.map(shape => ({ ...(shape as { props: object }).props })), shapeSnapshots);
    assert.equal(scenes[0].findByProps({ className: 'bc-alpha-backdrop' }), backdrop);
    assert.deepEqual(demos[0].findAllByType('button'), buttons);
  }
  assert.equal(scenes[0].findAllByType('button').length, 0);
});

test('alpha channel view has one searchable broadcast catalog entry and actual registered demo', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'vd-alpha-channel-view');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'broadcast');
  assert.equal(BROADCAST_ADDITION_DEMOS[item.id], AlphaChannelViewDemo);
  for (const query of ['알파 채널', '투명도 매트', '합성 채널', 'ALPHA CHANNEL', 'alpha matte view']) assert.ok(matchesSearch(item, query));
  assert.ok(matchesSearch(item, '알파 채널 존재하지않는검색어'), 'two of three terms meet the ranked-search threshold');
  assert.ok(!matchesSearch(item, '존재하지않는검색어'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={item.id} />); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(AlphaChannelViewDemo).length, 1);
});

test('letterbox keeps the source fixed while symmetric opaque bars preserve centered target-ratio geometry through every input', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><CinematicLetterboxDemo /><CinematicLetterboxDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const demos = tree.root.findAllByType(CinematicLetterboxDemo);
  const scenes = demos.map(demo => demo.findByType('svg'));
  const inputs = demos.map(demo => demo.findByType('input'));
  const landscape = scenes[0].findByProps({ className: 'bc-letterbox-landscape' });
  const sourceShapes = landscape.findAll(node => node.type === 'path' || node.type === 'circle');
  const sourceSnapshot = sourceShapes.map(node => ({ ...node.props }));
  const matte = scenes[0].findByProps({ className: 'bc-letterbox-matte' });
  const bars = matte.findAllByType('rect');
  assert.notEqual(scenes[0].props.id, scenes[1].props.id);
  assert.equal(scenes[0].props.viewBox, '0 0 264 148.5');
  assert.equal(matte.props.fill, '#000');
  assert.equal(matte.props.opacity, undefined);
  assert.deepEqual(inputs.map(input => input.props.value), [100, 100]);
  for (let index = 0; index < 2; index++) assert.equal(inputs[index].props['aria-controls'], scenes[index].props.id);
  for (const value of [...Array.from({ length: 101 }, (_, index) => index), 100, 25, 75, 0, 50, 100]) {
    act(() => inputs[0].props.onChange({ currentTarget: { value: String(value) } }));
    const [top, bottom] = bars.map(bar => bar.props);
    assert.equal(top.x, 0); assert.equal(bottom.x, 0);
    assert.equal(top.width, 264); assert.equal(bottom.width, 264);
    assert.equal(top.y, 0);
    assert.equal(top.height, bottom.height);
    assert.ok(Math.abs(bottom.y + bottom.height - 148.5) < 1e-12);
    assert.ok(top.height >= 0 && top.height < 148.5 / 2);
    const openingHeight = bottom.y - top.height;
    assert.ok(Math.abs((top.height + bottom.y) / 2 - 74.25) < 1e-12, 'opening stays centered');
    for (const width of [199, 239, 264]) {
      const scale = width / 264;
      assert.ok(Math.abs(width / (openingHeight * scale) - (16 / 9 + (2.35 - 16 / 9) * value / 100)) < 1e-12);
    }
    if (value === 0) { assert.equal(top.height, 0); assert.equal(bottom.y, 148.5); }
    if (value === 100) assert.ok(Math.abs(264 / openingHeight - 2.35) < 1e-12);
    assert.equal(landscape.props.transform, undefined);
    assert.equal(landscape.props.style, undefined);
    assert.deepEqual(sourceShapes.map(node => node.props), sourceSnapshot, 'source artwork never translates, scales or changes geometry');
    assert.equal(scenes[0].findByProps({ className: 'bc-letterbox-landscape' }), landscape);
    assert.deepEqual(matte.findAllByType('rect'), bars);
    assert.equal(demos[0].findByType('input'), inputs[0]);
    assert.equal(inputs[1].props.value, 100);
  }
});

test('cinematic letterbox is uniquely searchable in public broadcast catalog and maps to its actual demo', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'vd-cinematic-letterbox');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'broadcast');
  assert.equal(BROADCAST_ADDITION_DEMOS[item.id], CinematicLetterboxDemo);
  for (const query of ['레터박스', '시네마 매트', '검정 띠', 'LETTERBOX', 'cinematic matte']) assert.ok(matchesSearch(item, query));
  assert.ok(!matchesSearch(item, '레터박스 존재하지않는검색어'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={item.id} />); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(CinematicLetterboxDemo).length, 1);
});

test('face-local blur uses the actual source through a clipped filter and stays attached during position and mask changes', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><FaceBlurMaskDemo /><FaceBlurMaskDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const demos = tree.root.findAllByType(FaceBlurMaskDemo);
  const scenes = demos.map(demo => demo.findByProps({ className: 'bc-face-scene' }));
  const inputs = demos.map(demo => demo.findByType('input'));
  const buttons = demos.map(demo => demo.findByType('button'));
  const moving = scenes[0].findByProps({ className: 'bc-face-moving' });
  const mask = moving.findByProps({ className: 'bc-face-mask' });
  const uses = moving.findAllByType('use');
  const source = scenes[0].findByType('defs').findByType('g');
  const filter = scenes[0].findByType('filter');
  const clip = scenes[0].findByType('clipPath');
  assert.notEqual(scenes[0].props.id, scenes[1].props.id);
  assert.equal(filter.findByType('feGaussianBlur').props.stdDeviation, 6);
  assert.equal(filter.props.colorInterpolationFilters, 'sRGB');
  assert.equal(uses[0].props.href, `#${source.props.id}`);
  assert.equal(uses[1].props.href, uses[0].props.href, 'blur must sample the original artwork, not a replacement color overlay');
  assert.equal(uses[0].props.filter, undefined);
  assert.equal(uses[1].props.filter, `url(#${filter.props.id})`);
  assert.equal(mask.props.clipPath, `url(#${clip.props.id})`);
  assert.equal(mask.findByType('use'), uses[1], 'filter precedes clipping in the compositing tree');
  assert.equal(moving.children[0], uses[0]);
  assert.equal(moving.children[1], mask, 'mask and source must share a single moving coordinate system');
  assert.equal(clip.props.clipPathUnits, 'userSpaceOnUse');
  assert.deepEqual([inputs[0].props.min, inputs[0].props.max, inputs[0].props.step, inputs[0].props.value], [0, 100, 1, 50]);
  assert.equal(mask.props.opacity, 1);
  for (let index = 0; index < 2; index++) {
    assert.equal(inputs[index].props['aria-controls'], scenes[index].props.id);
    assert.equal(buttons[index].props['aria-controls'], scenes[index].props.id);
    assert.equal(scenes[index].findAllByType('button').length, 0);
    assert.equal(scenes[index].findAllByType('input').length, 0);
  }
  for (const value of [...Array.from({ length: 101 }, (_, index) => index), 100, 0, 75, 25, 50]) {
    act(() => inputs[0].props.onChange({ currentTarget: { value: String(value) } }));
    const x = Number(moving.props.transform.match(/^translate\(([-.\d]+) 0\)$/)[1]);
    assert.ok(96 + x >= 36 && 168 + x <= 228, 'whole figure stays within scene at every allowed position');
    if (value === 0) assert.equal(x, -60);
    if (value === 50) assert.equal(x, 0);
    if (value === 100) assert.equal(x, 60);
    assert.equal(mask.props.opacity, 1);
    assert.equal(inputs[1].props.value, 50);
    assert.equal(scenes[0].findByProps({ className: 'bc-face-moving' }), moving);
    assert.deepEqual(moving.findAllByType('use'), uses);
  }
  for (const masked of [false, true, false, true]) {
    act(() => buttons[0].props.onClick());
    assert.equal(mask.props.opacity, Number(masked));
    assert.equal(buttons[0].props['aria-pressed'], masked);
    assert.equal(buttons[1].props['aria-pressed'], true);
    assert.equal(inputs[0].props.value, 50);
    assert.equal(demos[0].findByType('button'), buttons[0]);
    assert.equal(demos[0].findByType('input'), inputs[0]);
    assert.deepEqual(moving.findAllByType('use'), uses);
  }
});

test('face blur mask has a single public broadcast entry with Korean and English search and actual demo mapping', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'vd-face-blur-mask');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'broadcast');
  assert.equal(BROADCAST_ADDITION_DEMOS[item.id], FaceBlurMaskDemo);
  for (const query of ['얼굴 블러', '얼굴 가림', '피사체 마스킹', 'FACE BLUR', 'privacy mask']) assert.ok(matchesSearch(item, query));
  assert.ok(matchesSearch(item, '얼굴 블러 존재하지않는검색어'), 'two of three terms meet the ranked-search threshold');
  assert.ok(!matchesSearch(item, '존재하지않는검색어'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={item.id} />); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(FaceBlurMaskDemo).length, 1);
});

test('dip to black passes through opaque black without crossfading scenes, reverses exactly and isolates instances', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><DipToBlackDemo /><DipToBlackDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const demos = tree.root.findAllByType(DipToBlackDemo);
  const scenes = demos.map(demo => demo.findByType('svg'));
  const inputs = demos.map(demo => demo.findByType('input'));
  const coast = scenes[0].findByProps({ className: 'bc-dip-coast' });
  const city = scenes[0].findByProps({ className: 'bc-dip-city' });
  const black = scenes[0].findByProps({ fill: '#000' });
  assert.notEqual(scenes[0].props.id, scenes[1].props.id);
  assert.equal(black.props.d, 'M0 0h264v144H0z', 'opaque black must cover the entire scene throughout');
  assert.equal(black.props.opacity, undefined);
  assert.equal(black.props['aria-hidden'], undefined);
  assert.equal(scenes[0].findByProps({ 'aria-hidden': 'true' }).children[0], black);
  assert.deepEqual(inputs.map(input => input.props.value), [0, 0]);
  assert.deepEqual([inputs[0].props.min, inputs[0].props.max, inputs[0].props.step], [0, 100, 1]);
  for (let index = 0; index < 2; index++) assert.equal(inputs[index].props['aria-controls'], scenes[index].props.id);
  // Test every allowed sample as well as rapid forward/reverse retargeting near the black midpoint.
  for (const value of [...Array.from({ length: 101 }, (_, index) => index), 75, 25, 50, 49, 51, 50, 100, 0]) {
    act(() => inputs[0].props.onChange({ currentTarget: { value: String(value) } }));
    assert.equal(inputs[0].props.value, value);
    assert.equal(inputs[1].props.value, 0);
    const a = coast.props.opacity;
    const b = city.props.opacity;
    assert.ok(a >= 0 && a <= 1 && b >= 0 && b <= 1);
    assert.equal(a * b, 0, 'two scenes must never be visible together');
    if (value < 50) { assert.ok(Math.abs(a - (50 - value) / 50) < 1e-12); assert.equal(b, 0); }
    else if (value > 50) { assert.equal(a, 0); assert.ok(Math.abs(b - (value - 50) / 50) < 1e-12); }
    else { assert.equal(a, 0); assert.equal(b, 0); assert.match(scenes[0].props['aria-label'], /완전한 검정/); }
    assert.match(inputs[0].props['aria-valuetext'], new RegExp(`^${value}%`));
    assert.equal(demos[0].findByType('input'), inputs[0]);
    assert.equal(demos[0].findByType('svg'), scenes[0]);
    assert.equal(scenes[0].findByProps({ className: 'bc-dip-coast' }), coast);
    assert.equal(scenes[0].findByProps({ className: 'bc-dip-city' }), city);
    assert.equal(scenes[0].findByProps({ fill: '#000' }), black);
  }
});

test('dip to black resolves one public broadcast technique through search and the actual registered demo', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'vd-dip-to-black');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'broadcast');
  assert.equal(BROADCAST_ADDITION_DEMOS[item.id], DipToBlackDemo);
  for (const query of ['블랙 경유', '딥 투 블랙', '암전 전환', 'DIP TO BLACK', 'fade through black']) assert.ok(matchesSearch(item, query));
  assert.ok(matchesSearch(item, '블랙 경유 존재하지않는검색어'), 'two of three terms meet the ranked-search threshold');
  assert.ok(!matchesSearch(item, '존재하지않는검색어'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={item.id} />); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(DipToBlackDemo).length, 1);
});

test('broadcast color bars tile the entire pattern without gaps, preserve distinct RGB references and avoid fake controls', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<BroadcastColorBarsDemo />); });
  t.after(() => { act(() => tree.unmount()); });
  const svg = tree.root.findByType('svg');
  const visual = svg.findByType('g');
  const patches = visual.findAllByType('rect');
  assert.equal(svg.props.role, 'img');
  assert.equal(visual.props['aria-hidden'], 'true');
  assert.equal(tree.root.findAllByType('button').length, 0);
  assert.equal(tree.root.findAllByType('input').length, 0);
  for (const sampleY of [0, 50, 99, 100, 110, 119, 120, 140, 159]) {
    const row = patches.filter(patch => patch.props.y <= sampleY && patch.props.y + patch.props.height > sampleY).sort((a, b) => a.props.x - b.props.x);
    let edge = 0;
    for (const patch of row) {
      assert.equal(patch.props.x, edge);
      assert.ok(patch.props.width > 0);
      edge += patch.props.width;
    }
    assert.equal(edge, 280);
  }
  const primary = patches.filter(patch => patch.props.y === 0);
  const colors = primary.map(patch => [1, 3, 5].map(offset => parseInt(patch.props.fill.slice(offset, offset + 2), 16)));
  assert.equal(colors.length, 7);
  assert.equal(new Set(colors.map(color => color.join(','))).size, 7);
  for (const color of colors) {
    assert.ok(color.every(channel => channel === 0 || channel === 191));
    assert.ok(color.some(channel => channel === 191));
  }
  const shadowSteps = patches.filter(patch => patch.props.y === 120 && patch.props.x >= 220).map(patch => parseInt(patch.props.fill.slice(1, 3), 16));
  assert.ok(shadowSteps[0] < shadowSteps[1] && shadowSteps[1] < shadowSteps[2]);
});

test('broadcast color bars are searchable as a unique public broadcast entry and resolve to the actual static artwork', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'vd-broadcast-color-bars');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'broadcast');
  assert.equal(BROADCAST_ADDITION_DEMOS[item.id], BroadcastColorBarsDemo);
  for (const query of ['컬러바', '방송 테스트카드', 'COLOR BARS', 'test card']) assert.ok(matchesSearch(item, query));
  assert.ok(!matchesSearch(item, '컬러바 존재하지않는검색어'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={item.id} />); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(BroadcastColorBarsDemo).length, 1);
});

test('picture in picture selects exactly one safe corner without replacing either view, controls or another instance', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><CornerPictureInPictureDemo /><CornerPictureInPictureDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const demos = tree.root.findAllByType(CornerPictureInPictureDemo);
  const scenes = demos.map(demo => demo.findByProps({ role: 'img' }));
  const main = scenes[0].findByProps({ className: 'bc-pip-main' });
  const inset = scenes[0].findByProps({ className: 'bc-pip-inset' });
  const buttons = demos[0].findAllByType('button');
  assert.notEqual(scenes[0].props.id, scenes[1].props.id);
  assert.deepEqual(buttons.map(button => button.props['aria-pressed']), [false, false, false, true]);
  for (const button of buttons) assert.equal(button.props['aria-controls'], scenes[0].props.id);
  assert.equal(scenes[0].findAllByType('button').length, 0);
  for (const [index, label, left, top] of [[0, '왼쪽 위', '6%', '6%'], [1, '오른쪽 위', '60%', '6%'], [2, '왼쪽 아래', '6%', '60%'], [3, '오른쪽 아래', '60%', '60%'], [3, '오른쪽 아래', '60%', '60%']] as const) {
    act(() => buttons[index].props.onClick());
    assert.deepEqual(buttons.map(button => button.props['aria-pressed']), buttons.map((_, buttonIndex) => buttonIndex === index));
    assert.deepEqual(inset.props.style, { left, top });
    assert.ok(parseFloat(left) + 34 <= 94 && parseFloat(top) + 34 <= 94);
    assert.ok(scenes[0].props['aria-label'].includes(label));
    assert.equal(scenes[0].findByProps({ className: 'bc-pip-main' }), main);
    assert.equal(scenes[0].findByProps({ className: 'bc-pip-inset' }), inset);
    assert.deepEqual(demos[0].findAllByType('button'), buttons);
    assert.deepEqual(scenes[1].findByProps({ className: 'bc-pip-inset' }).props.style, { left: '60%', top: '60%' });
  }
});

test('corner picture in picture is searchable once in the public broadcast catalog and renders its actual demo', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'vd-corner-picture-in-picture');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'broadcast');
  assert.equal(BROADCAST_ADDITION_DEMOS[item.id], CornerPictureInPictureDemo);
  for (const query of ['픽처 인 픽처', '화면 속 화면', 'PiP', 'PICTURE IN PICTURE']) assert.ok(matchesSearch(item, query));
  assert.ok(matchesSearch(item, '픽처 인 픽처 존재하지않는검색어'), 'three of four terms meet the ranked-search threshold');
  assert.ok(!matchesSearch(item, '존재하지않는검색어'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={item.id} />); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(CornerPictureInPictureDemo).length, 1);
});

test('green color difference removes only green dominance and preserves the original opaque subject while native input stays stable', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><GreenDifferenceKeyDemo /><GreenDifferenceKeyDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const scenes = tree.root.findAllByType('svg');
  const filters = scenes.map(scene => scene.findByType('filter'));
  const matrices = scenes.map(scene => scene.findByType('feColorMatrix'));
  const inputs = tree.root.findAllByType('input');
  const sources = scenes.map(scene => scene.findByProps({ className: 'bc-key-source' }));
  const backdrop = scenes[0].findByProps({ className: 'bc-key-backdrop' });
  assert.notEqual(filters[0].props.id, filters[1].props.id);
  for (let index = 0; index < 2; index++) {
    assert.equal(sources[index].props.filter, `url(#${filters[index].props.id})`);
    assert.equal(inputs[index].props['aria-controls'], scenes[index].props.id);
    assert.equal(filters[index].props.colorInterpolationFilters, 'sRGB');
  }
  const originalColors = ['#22c55e', '#6d28d9', '#b6836d', '#d2a185', '#35251e'];
  assert.deepEqual(sources[0].children.map(node => (node as { props: { fill: string } }).props.fill), originalColors);
  for (const [value, backgroundAlpha] of [[0, 1], [1, .4784313725], [3, 0], [4, 0], [0, 1]] as const) {
    act(() => inputs[0].props.onChange({ currentTarget: { value: String(value) } }));
    assert.equal(inputs[0].props.value, value);
    assert.equal(inputs[1].props.value, 3);
    assert.equal(tree.root.findAllByType('input')[0], inputs[0]);
    assert.equal(scenes[0].findByProps({ className: 'bc-key-source' }), sources[0]);
    assert.equal(scenes[0].findByProps({ className: 'bc-key-backdrop' }), backdrop);
    assert.equal(scenes[0].findByType('feColorMatrix'), matrices[0]);
    const values = matrices[0].props.values.split(' ').map(Number);
    for (const [colorIndex, hex] of originalColors.entries()) {
      const channels = [1, 3, 5].map(offset => parseInt(hex.slice(offset, offset + 2), 16) / 255);
      const pixel = [...channels, 1, 1];
      const output = [0, 1, 2, 3].map(row => Math.min(1, Math.max(0, values.slice(row * 5, row * 5 + 5).reduce((total: number, coefficient: number, column: number) => total + coefficient * pixel[column], 0))));
      assert.deepEqual(output.slice(0, 3), channels);
      assert.ok(Math.abs(output[3] - (colorIndex === 0 ? backgroundAlpha : 1)) < 1e-8);
    }
  }
  assert.equal(backdrop.props.filter, undefined);
});

test('green difference key has one searchable broadcast entry connected through the public catalog and actual demo', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'vd-green-difference-key');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'broadcast');
  assert.equal(BROADCAST_ADDITION_DEMOS[item.id], GreenDifferenceKeyDemo);
  for (const query of ['그린스크린', '크로마키', '색차 키잉', 'GREEN SCREEN', 'chroma key']) assert.ok(matchesSearch(item, query));
  assert.ok(!matchesSearch(item, '그린스크린 존재하지않는검색어'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={item.id} />); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(GreenDifferenceKeyDemo).length, 1);
});

test('credit roll keeps all accessible role/name pairs mounted while pausing independently with unique control linkage', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><EndCreditRollDemo /><EndCreditRollDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const frames = tree.root.findAllByProps({ className: 'bc-credit-frame' });
  const viewports = tree.root.findAllByProps({ role: 'region' });
  const tracks = tree.root.findAllByType('dl');
  const buttons = tree.root.findAllByType('button');
  assert.notEqual(viewports[0].props.id, viewports[1].props.id);
  for (let index = 0; index < 2; index++) {
    assert.equal(buttons[index].props['aria-controls'], viewports[index].props.id);
    assert.equal(viewports[index].props['aria-hidden'], undefined);
    assert.equal(tracks[index].props['aria-hidden'], undefined);
    assert.deepEqual(tracks[index].findAllByType('dt').map(node => node.children.join('')), ['연출', '촬영', '조명', '편집', '음악']);
    assert.deepEqual(tracks[index].findAllByType('dd').map(node => node.children.join('')), ['김하늘', '이서준', '박지우', '정다은', '윤도현']);
  }
  const rows = tracks[0].findAllByProps({ className: 'bc-credit-row' });
  for (const paused of [true, false, true, false]) {
    act(() => buttons[0].props.onClick());
    assert.equal(frames[0].props['data-paused'], paused);
    assert.equal(frames[1].props['data-paused'], false);
    assert.equal(buttons[0].props['aria-label'], paused ? '크레딧 롤 재개' : '크레딧 롤 일시정지');
    assert.equal(tree.root.findAllByType('button')[0], buttons[0]);
    assert.equal(tree.root.findAllByType('dl')[0], tracks[0]);
    assert.deepEqual(tracks[0].findAllByProps({ className: 'bc-credit-row' }), rows);
  }
});

test('credit roll resolves from public catalog Korean/English searches to the actual registered demo', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'vd-end-credit-roll');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'broadcast');
  assert.equal(BROADCAST_ADDITION_DEMOS[item.id], EndCreditRollDemo);
  for (const query of ['엔딩 크레딧', '제작진 자막', 'ROLLING CREDITS', 'End Credit Roll']) assert.ok(matchesSearch(item, query));
  assert.ok(!matchesSearch(item, '크레딧 존재하지않는검색어'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={item.id} />); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(EndCreditRollDemo).length, 1);
});

test('word-highlight captions pause in place, resume on the same DOM and isolate simultaneous instances', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><WordHighlightSubtitlesDemo /><WordHighlightSubtitlesDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const frames = tree.root.findAllByProps({ className: 'bc-caption-frame' });
  const scenes = tree.root.findAllByProps({ role: 'img' });
  const buttons = tree.root.findAllByType('button');
  const words = scenes[0].findAllByProps({ className: 'bc-caption-word' });
  assert.notEqual(scenes[0].props.id, scenes[1].props.id);
  assert.equal(buttons[0].props['aria-controls'], scenes[0].props.id);
  assert.equal(buttons[1].props['aria-controls'], scenes[1].props.id);
  assert.equal(buttons[0].props['aria-label'], '자막 강조 일시정지');
  assert.deepEqual(frames.map(frame => frame.props['data-paused']), [false, false]);
  for (const paused of [true, false, true, false]) {
    act(() => buttons[0].props.onClick());
    assert.equal(frames[0].props['data-paused'], paused);
    assert.equal(frames[1].props['data-paused'], false);
    assert.equal(buttons[0].props['aria-label'], paused ? '자막 강조 재개' : '자막 강조 일시정지');
    assert.equal(tree.root.findAllByType('button')[0], buttons[0]);
    assert.equal(tree.root.findAllByProps({ role: 'img' })[0], scenes[0]);
    assert.deepEqual(scenes[0].findAllByProps({ className: 'bc-caption-word' }), words);
  }
  assert.match(scenes[0].props['aria-label'], /우리가 만드는 내일은 조금 더 선명해집니다/);
  assert.equal(scenes[0].findAllByType('button').length, 0, 'the image role must not swallow its control');
});

test('word-highlight captions are registered under a distinct broadcast technique and Korean/English search', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'vd-word-highlight-subtitles');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'broadcast');
  assert.equal(BROADCAST_ADDITION_DEMOS[item.id], WordHighlightSubtitlesDemo);
  for (const query of ['단어 강조 자막', '워드 하이라이트', 'WORD HIGHLIGHT', 'karaoke captions']) assert.ok(matchesSearch(item, query));
  assert.ok(matchesSearch(item, '단어 강조 존재하지않는검색어'), 'two of three terms meet the ranked-search threshold');
  assert.ok(!matchesSearch(item, '존재하지않는검색어'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={item.id} />); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(WordHighlightSubtitlesDemo).length, 1);
});
