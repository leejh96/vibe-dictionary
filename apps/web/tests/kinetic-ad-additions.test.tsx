import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { TECHNIQUES, matchesSearch } from '@vibe-dictionary/catalog';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';
import { ProductTypeFramingDemo } from '../src/components/demos/kinetic_ad/ProductTypeFramingDemo';
import { TypeProductMatchCutDemo } from '../src/components/demos/kinetic_ad/TypeProductMatchCutDemo';
import { CopyCorrectionDemo } from '../src/components/demos/kinetic_ad/CopyCorrectionDemo';
import { ProductOccludedTypeDemo } from '../src/components/demos/kinetic_ad/ProductOccludedTypeDemo';
import { MultiFormatReframeDemo } from '../src/components/demos/kinetic_ad/MultiFormatReframeDemo';
import { LandscapeFilledTypeDemo } from '../src/components/demos/kinetic_ad/LandscapeFilledTypeDemo';
import { SemanticTypeExpansionDemo } from '../src/components/demos/kinetic_ad/SemanticTypeExpansionDemo';
import { DifferenceBlendTypeDemo } from '../src/components/demos/kinetic_ad/DifferenceBlendTypeDemo';
import { RotationalAmbigramDemo } from '../src/components/demos/kinetic_ad/RotationalAmbigramDemo';
import { RebusGlyphMorphDemo } from '../src/components/demos/kinetic_ad/RebusGlyphMorphDemo';
import { LocaleProvider, useLocale } from '../src/i18n/LocaleContext';

test('kinetic advertisement language switches preserve active geometry, format targets and replay subtrees', t => {
  let setLocale!: ReturnType<typeof useLocale>['setLocale'];
  function LocaleControl() {
    setLocale = useLocale().setLocale;
    return null;
  }
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<LocaleProvider initialLocale="ko"><LocaleControl />
    <RebusGlyphMorphDemo /><RotationalAmbigramDemo /><DifferenceBlendTypeDemo /><SemanticTypeExpansionDemo />
    <LandscapeFilledTypeDemo /><MultiFormatReframeDemo /><ProductOccludedTypeDemo /><CopyCorrectionDemo />
    <TypeProductMatchCutDemo /><ProductTypeFramingDemo />
  </LocaleProvider>); });
  t.after(() => { act(() => tree.unmount()); });
  const buttons = tree.root.findAllByType('button');
  act(() => { for (const button of buttons) button.props.onClick(); });
  const scenes = tree.root.findAllByType('svg');
  const paths = tree.root.findAllByType('path');
  const texts = tree.root.findAllByType('text');
  const copy = texts.map(text => text.children.join(''));
  const contour = tree.root.findByProps({ className: 'ka-rebus-glyph' }).props.d;
  const landscape = tree.root.findByProps({ className: 'ka-landscape-pan' });
  const product = tree.root.findByType(ProductTypeFramingDemo).findByType('svg').findByType('g');
  const scene = tree.root.findByProps({ role: 'img' });
  const sceneId = scene.props.id;
  const checkState = () => {
    for (const className of ['ka-rebus-button', 'ka-ambigram-button', 'ka-inversion-button', 'ka-expansion-button']) {
      assert.equal(tree.root.findByProps({ className }).props['aria-pressed'], true);
    }
    assert.equal(scene.props['data-format'], 'portrait');
    assert.equal(scene.props.style['--ka-reframe-progress'], 1);
    assert.equal(tree.root.findByProps({ className: 'ka-expansion-scene' }).props.style['--ka-expand-progress'], 1);
    assert.equal(tree.root.findByProps({ className: 'ka-rebus-glyph' }).props.d, contour);
    assert.equal(tree.root.findByProps({ className: 'ka-landscape-pan' }), landscape);
    assert.equal(tree.root.findByType(ProductTypeFramingDemo).findByType('svg').findByType('g'), product);
    assert.equal(scene.props.id, sceneId);
    assert.deepEqual(tree.root.findAllByType('button'), buttons);
    assert.deepEqual(tree.root.findAllByType('svg'), scenes);
    assert.deepEqual(tree.root.findAllByType('path'), paths);
    assert.deepEqual(tree.root.findAllByType('text'), texts);
    assert.deepEqual(texts.map(text => text.children.join('')), copy);
  };
  act(() => setLocale('en'));
  checkState();
  assert.equal(buttons[0].props['aria-label'], 'Toggle the O in LOVE into a heart pictogram');
  assert.equal(scene.props['aria-label'], 'Portrait 9:16 GO YOUR WAY headphones advertisement');
  assert.equal(tree.root.findByProps({ role: 'group' }).props['aria-label'], 'Advertisement aspect ratio');
  for (const button of buttons) assert.doesNotMatch(button.props['aria-label'], /[가-힣]/u);
  act(() => setLocale('ko'));
  checkState();
  assert.equal(buttons[0].props['aria-label'], 'LOVE의 O를 하트 그림문자로 전환');
  assert.equal(scene.props['aria-label'], '세로 9대16의 GO YOUR WAY 헤드폰 광고');
});

test('rebus replaces one glyph contour while keeping the other letters, fallback and native toggle stable', t => {
  const entries = TECHNIQUES.filter(entry => entry.id === 'vd-rebus-glyph-morph');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'kinetic_ad');
  for (const keyword of ['그림문자 광고', 'rebus', '글자 심볼 치환']) assert.ok(matchesSearch(item, keyword));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><RebusGlyphMorphDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [first, other] = tree.root.findAllByType(RebusGlyphMorphDemo);
  assert.ok(first && other);
  const button = first.findByType('button');
  const scene = first.findByType('svg');
  const letters = first.findByProps({ className: 'ka-rebus-letters' });
  const glyph = first.findByProps({ className: 'ka-rebus-glyph' });
  const oval = glyph.props.style.d;
  assert.equal(button.props.type, 'button');
  assert.equal(button.props['aria-label'], 'LOVE의 O를 하트 그림문자로 전환');
  assert.equal(button.props['aria-pressed'], false);
  assert.equal(scene.props['aria-hidden'], 'true');
  for (const heart of [true, false, true, false, true]) {
    act(() => button.props.onClick());
    assert.equal(button.props['aria-pressed'], heart);
    assert.equal(scene.props['data-heart'], heart);
    assert.equal(glyph.props.style.d === oval, !heart);
    assert.equal(`path("${glyph.props.d}")`, glyph.props.style.d, 'unsupported CSS d still displays the selected contour through its SVG attribute');
  }
  assert.equal(first.findByType('button'), button);
  assert.equal(first.findByType('svg'), scene);
  assert.equal(first.findByProps({ className: 'ka-rebus-letters' }), letters);
  assert.equal(first.findByProps({ className: 'ka-rebus-glyph' }), glyph);
  assert.equal(first.findAllByType('path').length, 2);
  assert.equal(other.findByType('button').props['aria-pressed'], false);
  assert.equal(other.findByProps({ className: 'ka-rebus-glyph' }).props.style.d, oval);
});

test('rebus compatible cubic contours stay in the same separated letter slot across every interpolation', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<RebusGlyphMorphDemo />); });
  t.after(() => { act(() => tree.unmount()); });
  const glyph = tree.root.findByProps({ className: 'ka-rebus-glyph' });
  const oval = glyph.props.d as string;
  act(() => tree.root.findByType('button').props.onClick());
  const heart = (glyph.props.style.d as string).slice(6, -2);
  assert.deepEqual(oval.match(/[MCZ]/g), ['M', 'C', 'C', 'C', 'C', 'Z']);
  assert.deepEqual(heart.match(/[MCZ]/g), oval.match(/[MCZ]/g));
  const start = oval.match(/-?\d+(?:\.\d+)?/g)!.map(Number);
  const end = heart.match(/-?\d+(?:\.\d+)?/g)!.map(Number);
  assert.equal(start.length, end.length);
  const halfStroke = Number(glyph.parent?.props.strokeWidth) / 2;
  for (let step = 0; step <= 100; step++) {
    const points = start.map((value, index) => value + (end[index] - value) * step / 100);
    const xs = points.filter((_, index) => index % 2 === 0);
    const ys = points.filter((_, index) => index % 2 !== 0);
    assert.ok(Math.min(...xs) - halfStroke >= 59);
    assert.ok(Math.max(...xs) + halfStroke <= 125);
    assert.ok(Math.min(...ys) - halfStroke >= 40);
    assert.ok(Math.max(...ys) + halfStroke <= 103);
    assert.deepEqual(points.slice(-2), points.slice(0, 2), 'the four curves keep a closed contour');
  }
});

test('ambigram retargets a half turn independently without replacing the custom word or native toggle', t => {
  const entries = TECHNIQUES.filter(entry => entry.id === 'vd-rotational-ambigram');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'kinetic_ad');
  for (const keyword of ['앰비그램 광고', '회전 대칭 워드마크', 'NOON 로고']) assert.ok(matchesSearch(item, keyword));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><RotationalAmbigramDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [first, other] = tree.root.findAllByType(RotationalAmbigramDemo);
  assert.ok(first && other);
  const button = first.findByType('button');
  const scene = first.findByType('svg');
  const word = first.findByProps({ className: 'ka-ambigram-word' });
  const letters = word.children;
  assert.equal(button.props.type, 'button');
  assert.equal(button.props['aria-label'], 'NOON 워드마크 180도 회전');
  assert.equal(button.props['aria-pressed'], false);
  assert.equal(scene.props['aria-hidden'], 'true');
  assert.equal(word.parent?.props.transform, 'translate(132 74)');
  for (const turned of [true, false, true, false, true]) {
    act(() => button.props.onClick());
    assert.equal(button.props['aria-pressed'], turned);
    assert.equal(scene.props['data-turned'], turned);
  }
  assert.equal(first.findByType('button'), button);
  assert.equal(first.findByType('svg'), scene);
  assert.equal(first.findByProps({ className: 'ka-ambigram-word' }), word);
  assert.deepEqual(word.children, letters);
  assert.equal(other.findByType('button').props['aria-pressed'], false);
});

test('custom ambigram ink is half-turn invariant and its whole rotation fits the scene', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<RotationalAmbigramDemo />); });
  t.after(() => { act(() => tree.unmount()); });
  const word = tree.root.findByProps({ className: 'ka-ambigram-word' });
  const tokens: string[] = word.findByType('path').props.d.match(/[MLV]|-?\d+/g);
  const segments: number[][] = [];
  let current = [0, 0];
  while (tokens.length) {
    const command = tokens.shift();
    const next = command === 'V' ? [current[0], Number(tokens.shift())] : [Number(tokens.shift()), Number(tokens.shift())];
    if (command !== 'M') segments.push([...current, ...next]);
    current = next;
  }
  const canonical = (segment: number[]) => [segment.slice(0, 2).join(','), segment.slice(2).join(',')].sort().join('|');
  assert.deepEqual(segments.map(canonical).sort(), segments.map(segment => canonical(segment.map(value => -value))).sort());
  const rects = word.findAllByType('rect').map(rect => ({ x: Number(rect.props.x), y: Number(rect.props.y), width: Number(rect.props.width), height: Number(rect.props.height), rx: Number(rect.props.rx) }));
  const invertedRects = rects.map(rect => ({ ...rect, x: -rect.x - rect.width, y: -rect.y - rect.height }));
  assert.deepEqual(rects, invertedRects.reverse());
  const halfStroke = Number(word.props.strokeWidth) / 2;
  const xExtent = Math.max(...segments.flatMap(segment => [Math.abs(segment[0]), Math.abs(segment[2])]), ...rects.flatMap(rect => [Math.abs(rect.x), Math.abs(rect.x + rect.width)])) + halfStroke;
  const yExtent = Math.max(...segments.flatMap(segment => [Math.abs(segment[1]), Math.abs(segment[3])]), ...rects.flatMap(rect => [Math.abs(rect.y), Math.abs(rect.y + rect.height)])) + halfStroke;
  assert.ok(Math.hypot(xExtent, yExtent) < 69, 'all-angle stroke envelope leaves more than 5px vertical margin');
  assert.equal(rects[1].x - (rects[0].x + rects[0].width) - 2 * halfStroke, 6);
});

test('difference typography retains one fixed headline above the opaque canvas and independently toggled band', t => {
  const entries = TECHNIQUES.filter(entry => entry.id === 'vd-difference-blend-type');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'kinetic_ad');
  for (const keyword of ['배경 반전 타이포', '차이 블렌드 광고', 'difference 타이포']) assert.ok(matchesSearch(item, keyword));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><DifferenceBlendTypeDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [first, other] = tree.root.findAllByType(DifferenceBlendTypeDemo);
  assert.ok(first && other);
  const button = first.findByType('button');
  const scene = first.findByType('svg');
  const canvas = first.findByProps({ className: 'ka-inversion-canvas' });
  const band = first.findByProps({ className: 'ka-inversion-band' });
  const word = first.findByType('text');
  assert.equal(button.props.type, 'button');
  assert.equal(button.props['aria-label'], 'BOLD 반전 띠 오른쪽 위치');
  assert.equal(button.props['aria-pressed'], false);
  assert.equal(scene.props['aria-hidden'], 'true');
  assert.deepEqual(scene.children, [canvas, band, word]);
  assert.equal(word.children.join(''), 'BOLD');
  assert.equal(first.findAllByType('text').length, 1);
  assert.equal(first.findAllByType('mask').length, 0);
  assert.equal(first.findAllByType('clipPath').length, 0);
  for (const right of [true, false, true, false, true]) {
    act(() => button.props.onClick());
    assert.equal(button.props['aria-pressed'], right);
    assert.equal(scene.props['data-right'], right);
  }
  assert.equal(first.findByType('button'), button);
  assert.equal(first.findByType('svg'), scene);
  assert.deepEqual(scene.children, [canvas, band, word]);
  assert.equal(other.findByType('button').props['aria-pressed'], false);
  assert.equal(other.findByType('svg').props['data-right'], false);
});

test('semantic expansion retargets one progress value without replacing letter geometry or the native toggle', t => {
  const entries = TECHNIQUES.filter(entry => entry.id === 'vd-semantic-type-expansion');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'kinetic_ad');
  for (const keyword of ['의미 타이포 광고', '글자 폭 확장', '시맨틱 타이포']) assert.ok(matchesSearch(item, keyword));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><SemanticTypeExpansionDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [first, other] = tree.root.findAllByType(SemanticTypeExpansionDemo);
  assert.ok(first && other);
  const button = first.findByType('button');
  const scene = first.findByType('svg');
  const letters = [...first.findAllByType('path'), first.findByType('rect')];
  assert.equal(button.props.type, 'button');
  assert.equal(button.props['aria-label'], 'MORE의 O 글자 폭 확장');
  assert.equal(button.props['aria-pressed'], false);
  assert.equal(scene.props.style['--ka-expand-progress'], 0);
  assert.equal(scene.props['aria-hidden'], 'true');
  for (const expanded of [true, false, true, false, true]) {
    act(() => button.props.onClick());
    assert.equal(button.props['aria-pressed'], expanded);
    assert.equal(scene.props['data-expanded'], expanded);
    assert.equal(scene.props.style['--ka-expand-progress'], expanded ? 1 : 0);
  }
  assert.equal(first.findByType('button'), button);
  assert.equal(first.findByType('svg'), scene);
  assert.deepEqual([...first.findAllByType('path'), first.findByType('rect')], letters);
  assert.equal(other.findByType('button').props['aria-pressed'], false);
  assert.equal(other.findByType('svg').props.style['--ka-expand-progress'], 0);
});

test('landscape typography keeps a fixed unique letter matte while replay replaces only its own landscape', t => {
  const entries = TECHNIQUES.filter(entry => entry.id === 'vd-landscape-filled-type');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'kinetic_ad');
  for (const keyword of ['풍경 타이포 광고', '텍스트 매트', '글자 안 풍경']) assert.ok(matchesSearch(item, keyword));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><LandscapeFilledTypeDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [first, other] = tree.root.findAllByType(LandscapeFilledTypeDemo);
  assert.ok(first && other);
  const button = first.findByType('button');
  const svg = first.findByType('svg');
  const clip = first.findByType('clipPath');
  const outline = first.findByProps({ className: 'ka-landscape-word ka-landscape-outline' });
  const sky = first.findByType('rect');
  const pan = first.findByProps({ className: 'ka-landscape-pan' });
  const otherPan = other.findByProps({ className: 'ka-landscape-pan' });
  assert.equal(button.props.type, 'button');
  assert.equal(button.props['aria-label'], 'ROAM 글자 안의 풍경 이동 다시 재생');
  assert.equal(svg.props['aria-hidden'], 'true');
  assert.notEqual(clip.props.id, other.findByType('clipPath').props.id);
  const letter = clip.findByType('text');
  assert.equal(letter.children.join(''), 'ROAM');
  assert.equal(outline.children.join(''), 'ROAM');
  assert.deepEqual([letter.props.x, letter.props.y, letter.props.textAnchor], [outline.props.x, outline.props.y, outline.props.textAnchor]);
  assert.equal(pan.parent?.props.clipPath, `url(#${clip.props.id})`);
  assert.equal(sky.parent, pan.parent);
  for (let replay = 0; replay < 3; replay++) act(() => { button.props.onClick(); button.props.onClick(); });
  assert.notEqual(first.findByProps({ className: 'ka-landscape-pan' }), pan);
  assert.equal(other.findByProps({ className: 'ka-landscape-pan' }), otherPan);
  assert.equal(first.findByType('button'), button);
  assert.equal(first.findByType('svg'), svg);
  assert.equal(first.findByType('clipPath'), clip);
  assert.equal(first.findByType('rect'), sky);
  assert.equal(first.findByProps({ className: 'ka-landscape-word ka-landscape-outline' }), outline);
});

test('multi-format reframing keeps all copy and product nodes while mutually exclusive controls select independent format targets', t => {
  const entries = TECHNIQUES.filter(entry => entry.id === 'vd-multiformat-copy-reframe');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'kinetic_ad');
  assert.equal(item.titleKo, '가로·세로 카피 리프레이밍');
  assert.equal(item.titleEn, 'Multi-Format Copy Reframing');
  for (const keyword of ['멀티포맷 광고', '광고 비율 리프레이밍', '세로 광고 카피']) assert.ok(matchesSearch(item, keyword));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><MultiFormatReframeDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const demos = tree.root.findAllByType(MultiFormatReframeDemo);
  assert.equal(demos.length, 2);
  const [first, other] = demos;
  const scene = first.findByProps({ role: 'img' });
  const frame = first.findByProps({ className: 'ka-reframe-canvas' });
  const product = first.findByProps({ className: 'ka-reframe-product' });
  const words = first.findAllByType('text');
  const buttons = first.findAllByType('button');
  assert.notEqual(scene.props.id, other.findByProps({ role: 'img' }).props.id);
  assert.deepEqual(words.map(word => word.children.join('')), ['GO', 'YOUR', 'WAY']);
  assert.equal(scene.props.style['--ka-reframe-progress'], 0);
  assert.deepEqual(buttons.map(button => button.props['aria-pressed']), [true, false]);
  for (const button of buttons) {
    assert.equal(button.props.type, 'button');
    assert.equal(button.props['aria-controls'], scene.props.id);
    assert.equal(button.findByType('svg').props['aria-hidden'], 'true');
  }
  for (const portrait of [true, false, true, false, true]) {
    act(() => buttons[portrait ? 1 : 0].props.onClick());
    assert.equal(scene.props.style['--ka-reframe-progress'], portrait ? 1 : 0);
    assert.equal(scene.props['data-format'], portrait ? 'portrait' : 'wide');
  }
  assert.equal(scene.props['data-format'], 'portrait');
  assert.equal(scene.props.style['--ka-reframe-progress'], 1);
  assert.deepEqual(buttons.map(button => button.props['aria-pressed']), [false, true]);
  assert.equal(other.findByProps({ role: 'img' }).props['data-format'], 'wide');
  assert.equal(first.findByProps({ role: 'img' }), scene);
  assert.equal(first.findByProps({ className: 'ka-reframe-canvas' }), frame);
  assert.equal(first.findByProps({ className: 'ka-reframe-product' }), product);
  assert.deepEqual(first.findAllByType('text'), words);
  assert.deepEqual(first.findAllByType('button'), buttons);
  act(() => buttons[0].props.onClick());
  assert.equal(scene.props['data-format'], 'wide');
  assert.equal(scene.props.style['--ka-reframe-progress'], 0);
  assert.deepEqual(buttons.map(button => button.props['aria-pressed']), [true, false]);
});

test('product occlusion paints the fixed opaque shoe above the moving word and preserves it during replay', t => {
  const entries = TECHNIQUES.filter(entry => entry.id === 'vd-product-occluded-type');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'kinetic_ad');
  assert.equal(item.titleKo, '제품 뒤 통과 타이포');
  assert.equal(item.titleEn, 'Product-Occluded Typography');
  for (const keyword of ['제품 뒤 타이포', '오클루전 광고', '전경 가림 카피']) assert.ok(matchesSearch(item, keyword));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><ProductOccludedTypeDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const demos = tree.root.findAllByType(ProductOccludedTypeDemo);
  assert.equal(demos.length, 2);
  const [first, other] = demos;
  const button = first.findByType('button');
  const svg = first.findByType('svg');
  const copy = first.findByType('text');
  const product = first.findByProps({ className: 'ka-occluding-shoe' });
  const otherCopy = other.findByType('text');
  assert.equal(button.props.type, 'button');
  assert.equal(button.props['aria-label'], 'MOVE가 운동화 뒤를 통과하는 광고 다시 재생');
  assert.equal(svg.props['aria-hidden'], 'true');
  assert.deepEqual(svg.children, [copy, product]);
  assert.equal(copy.children.join(''), 'MOVE');
  assert.equal(product.findAllByType('text').length, 0);
  assert.equal(svg.findAllByType('mask').length, 0);
  act(() => { button.props.onClick(); button.props.onClick(); });
  assert.notEqual(first.findByType('text'), copy);
  assert.equal(first.findByProps({ className: 'ka-occluding-shoe' }), product);
  assert.equal(first.findByType('button'), button);
  assert.equal(first.findByType('svg'), svg);
  assert.equal(other.findByType('text'), otherCopy);
});

test('copy correction keeps the original copy under its marks and restarts independently through the public mapping', t => {
  const entries = TECHNIQUES.filter(entry => entry.id === 'vd-proofreader-copy-correction');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'kinetic_ad');
  assert.equal(item.titleKo, '교정 마크 카피 광고');
  assert.equal(item.titleEn, 'Proofreader Copy Correction');
  for (const keyword of ['교정 마크 광고', '취소선 카피', '광고 문구 교정']) assert.ok(matchesSearch(item, keyword));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><CopyCorrectionDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const demos = tree.root.findAllByType(CopyCorrectionDemo);
  assert.equal(demos.length, 2);
  const [first, other] = demos;
  const button = first.findByType('button');
  const svg = first.findByType('svg');
  const strike = first.findByProps({ className: 'ka-correction-line' });
  const insert = first.findByProps({ className: 'ka-correction-insert' });
  const old = first.findByProps({ className: 'ka-correction-old' });
  const otherStrike = other.findByProps({ className: 'ka-correction-line' });
  assert.equal(button.props.type, 'button');
  assert.equal(button.props['aria-label'], 'SMALL을 BOLD로 교정하는 광고 다시 재생');
  assert.equal(svg.props['aria-hidden'], 'true');
  assert.equal(Number(strike.props.pathLength), 1);
  assert.equal(old.children.join(''), 'SMALL');
  assert.equal(old.parent, strike.parent);
  assert.equal(insert.findByType('text').children.join(''), 'BOLD');
  assert.equal(first.findAllByProps({ className: 'ka-correction-line' }).length, 1);
  act(() => { button.props.onClick(); button.props.onClick(); });
  assert.equal(first.findByType('button'), button);
  assert.equal(first.findByType('svg'), svg);
  assert.notEqual(first.findByProps({ className: 'ka-correction-line' }), strike);
  assert.equal(other.findByProps({ className: 'ka-correction-line' }), otherStrike);
  assert.deepEqual(svg.findAllByType('text').map(text => text.children.join('')), ['SMALL', 'IDEAS', 'BOLD']);
});

test('type-to-product match keeps one geometric anchor and independently restarts only the visual cut', t => {
  const entries = TECHNIQUES.filter(entry => entry.id === 'vd-type-product-match-cut');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'kinetic_ad');
  assert.equal(item.titleKo, '타이포·제품 매치컷');
  assert.equal(item.titleEn, 'Type-to-Product Match Cut');
  for (const keyword of ['타이포 매치컷', '제품 형태 매칭', '그래픽 매치 광고']) assert.ok(matchesSearch(item, keyword));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><TypeProductMatchCutDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const demos = tree.root.findAllByType(TypeProductMatchCutDemo);
  assert.equal(demos.length, 2);
  const [first, other] = demos;
  const button = first.findByType('button');
  const svg = first.findByType('svg');
  const otherAnchor = other.findByProps({ className: 'ka-match-anchor' });
  const anchor = first.findByProps({ className: 'ka-match-anchor' });
  const pulp = first.findByProps({ className: 'ka-match-pulp' });
  assert.equal(button.props.type, 'button');
  assert.equal(button.props['aria-label'], 'GO에서 PURE JOY로 이어지는 타이포 제품 매치컷 다시 재생');
  assert.equal(svg.props['aria-hidden'], 'true');
  assert.equal(first.findAllByProps({ className: 'ka-match-anchor' }).length, 1);
  assert.deepEqual([anchor.props.cx, anchor.props.cy], [pulp.props.cx, pulp.props.cy]);
  assert.equal(Number(anchor.props.r), Number(pulp.props.r) + 1);
  assert.equal(anchor.parent, first.findByProps({ className: 'ka-match-intro' }).parent);
  assert.equal(anchor.parent, first.findByProps({ className: 'ka-match-payoff' }).parent);
  act(() => { button.props.onClick(); button.props.onClick(); });
  assert.equal(first.findByType('button'), button);
  assert.equal(first.findByType('svg'), svg);
  assert.notEqual(first.findByProps({ className: 'ka-match-anchor' }), anchor);
  assert.equal(other.findByProps({ className: 'ka-match-anchor' }), otherAnchor);
  assert.deepEqual(svg.findAllByType('text').map(text => text.children.join('')), ['G', 'PURE', 'JOY']);
});

test('product framing replay replaces only its own visual sequence and keeps the native control stable', t => {
  const entries = TECHNIQUES.filter(entry => entry.id === 'vd-product-type-framing');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'kinetic_ad');
  assert.equal(item.titleKo, '제품 중심 타이포 프레이밍');
  assert.equal(item.titleEn, 'Product-Centered Type Framing');
  for (const keyword of ['제품 타이포 광고', '제품 중심 락업', '네거티브 스페이스 광고']) assert.ok(matchesSearch(item, keyword));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><ProductTypeFramingDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const demos = tree.root.findAllByType(ProductTypeFramingDemo);
  assert.equal(demos.length, 2);
  const [first, other] = demos;
  const button = first.findByType('button');
  const scene = first.findByType('svg');
  const otherSequence = other.findByType('svg').findByType('g');
  let previousSequence = scene.findByType('g');
  assert.equal(button.props.type, 'button');
  assert.equal(button.props['aria-label'], 'STAY FRESH 제품 중심 타이포 광고 다시 재생');
  assert.equal(scene.props['aria-hidden'], 'true');
  for (let replay = 0; replay < 3; replay++) {
    act(() => { button.props.onClick(); button.props.onClick(); });
    const sequence = scene.findByType('g');
    assert.notEqual(sequence, previousSequence);
    assert.equal(first.findByType('button'), button);
    assert.equal(first.findByType('svg'), scene);
    assert.equal(other.findByType('svg').findByType('g'), otherSequence);
    assert.deepEqual(scene.findAllByType('text').map(text => text.children.join('')), ['STAY', 'FRESH', 'ZEST']);
    previousSequence = sequence;
  }
});
