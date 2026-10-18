import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { TECHNIQUES, matchesSearch } from '@vibe-dictionary/catalog';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';
import { MemphisPatternDemo } from '../src/components/demos/retro/MemphisPatternDemo';
import { ArtDecoFrameDemo } from '../src/components/demos/retro/ArtDecoFrameDemo';
import { RisographPrintDemo } from '../src/components/demos/retro/RisographPrintDemo';
import { SevenSegmentLedDemo } from '../src/components/demos/retro/SevenSegmentLedDemo';
import { LinocutBotanicalDemo } from '../src/components/demos/retro/LinocutBotanicalDemo';
import { ArtNouveauWhiplashDemo } from '../src/components/demos/retro/ArtNouveauWhiplashDemo';
import { ConstructivistPosterDemo } from '../src/components/demos/retro/ConstructivistPosterDemo';
import { StencilBridgeLetteringDemo } from '../src/components/demos/retro/StencilBridgeLetteringDemo';
import { PsychedelicSwellDemo } from '../src/components/demos/retro/PsychedelicSwellDemo';
import { CyanotypePhotogramDemo } from '../src/components/demos/retro/CyanotypePhotogramDemo';
import { RETRO_ADDITION_DEMOS } from '../src/components/demos/retro';
import { LocaleProvider, useLocale } from '../src/i18n/LocaleContext';

test('retro artwork names switch languages while native slider values, nodes and original lettering remain intact', t => {
  let changeLocale!: ReturnType<typeof useLocale>['setLocale'];
  function LocaleControl() {
    changeLocale = useLocale().setLocale;
    return null;
  }
  let tree!: ReturnType<typeof create>;
  act(() => {
    tree = create(<LocaleProvider initialLocale="ko"><LocaleControl />{Object.entries(RETRO_ADDITION_DEMOS).map(([id, Demo]) => <Demo key={id} />)}</LocaleProvider>);
  });
  t.after(() => { act(() => tree.unmount()); });
  const inputs = tree.root.findAllByType('input');
  const scenes = tree.root.findAllByProps({ role: 'img' });
  const paths = tree.root.findAllByType('path');
  const originalPathData = paths.map(path => path.props.d);
  assert.equal(scenes.length, 10);
  act(() => {
    inputs[0].props.onChange({ currentTarget: { valueAsNumber: 8 } });
    inputs[1].props.onChange({ currentTarget: { valueAsNumber: 1 } });
  });
  act(() => changeLocale('en'));
  for (const scene of scenes) assert.doesNotMatch(scene.props['aria-label'], /[가-힣]/u);
  assert.equal(inputs[0].props['aria-label'], 'Risograph blue plate offset');
  assert.equal(inputs[0].props['aria-valuetext'], 'Right 8, up 4');
  assert.equal(inputs[1].props['aria-label'], 'Seven-segment display digit');
  assert.match(scenes[2].props['aria-label'], /right 8, up 4/);
  assert.equal(scenes[3].props['aria-label'], 'Orange seven-segment LED displaying digit 1');
  assert.deepEqual(inputs.map(input => input.props.value), [8, 1]);
  assert.deepEqual(tree.root.findAllByType('input'), inputs);
  assert.deepEqual(tree.root.findAllByProps({ role: 'img' }), scenes);
  assert.deepEqual(tree.root.findAllByType('path'), paths);
  assert.deepEqual(paths.map(path => path.props.d), originalPathData);
  assert.equal(tree.root.findByType('text').children.join(''), 'FORM');
  act(() => changeLocale('ko'));
  assert.equal(inputs[0].props['aria-valuetext'], '오른쪽 8, 위 4');
  assert.equal(scenes[3].props['aria-label'], '숫자 1을 표시하는 주황색 7세그먼트 LED');
  assert.deepEqual(inputs.map(input => input.props.value), [8, 1]);
  assert.deepEqual(tree.root.findAllByType('input'), inputs);
});

test('cyanotype public artwork keeps its key and soft contact filter local across instances', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'st-cyanotype-contact-photogram');
  assert.equal(entries.length, 1);
  const [item] = entries;
  assert.equal(item.domain, 'style');
  assert.equal(item.category, 'retro');
  assert.ok(matchesSearch(item, '시아노타입 접촉'));
  assert.ok(matchesSearch(item, 'Cyanotype photogram'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><CyanotypePhotogramDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const scenes = tree.root.findAllByType(CyanotypePhotogramDemo).map(demo => demo.findByProps({ role: 'img' }));
  assert.equal(scenes.length, 2);
  const localIds = scenes.map(scene => new Set(scene.findAll(node => typeof node.props.id === 'string').map(node => node.props.id)));
  assert.equal([...localIds[0]].some(id => localIds[1].has(id)), false);
  for (const [index, scene] of scenes.entries()) {
    assert.equal(scene.props['aria-label'], '손코팅한 청색 면에 열쇠의 흰 접촉 실루엣과 옅은 유리 원판이 남은 시아노타입 음화');
    for (const use of scene.findAllByType('use')) {
      assert.ok(localIds[index].has(use.props.href.slice(1)));
      assert.equal(localIds[1 - index].has(use.props.href.slice(1)), false);
      if (use.props.filter) assert.equal(use.props.filter, `url(#${scene.findByType('filter').props.id})`);
    }
  }
});

test('psychedelic searches resolve to the named original font-free swell artwork', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'st-psychedelic-swell-lettering');
  assert.equal(entries.length, 1);
  const [item] = entries;
  assert.equal(item.domain, 'style');
  assert.equal(item.category, 'retro');
  assert.ok(matchesSearch(item, '사이키델릭 스웰'));
  assert.ok(matchesSearch(item, 'Psychedelic swell'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={item.id} />); });
  t.after(() => { act(() => tree.unmount()); });
  const artwork = tree.root.findByType(PsychedelicSwellDemo);
  assert.equal(artwork.findByProps({ role: 'img' }).props['aria-label'], '보라 바탕 위 휘고 부푼 주황 WAVE 글자와 분홍 물결 띠의 사이키델릭 레터링');
  assert.equal(artwork.findAllByType('text').length, 0);
  assert.equal(artwork.findAllByType('button').length, 0);
  assert.equal(artwork.findAllByType('input').length, 0);
});

test('stencil and bridge terms resolve to the accessible original vector lettering', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'st-stencil-bridge-lettering');
  assert.equal(entries.length, 1);
  const [item] = entries;
  assert.equal(item.domain, 'style');
  assert.equal(item.category, 'retro');
  assert.ok(matchesSearch(item, '스텐실 브리지'));
  assert.ok(matchesSearch(item, 'Stencil bridge'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={item.id} />); });
  t.after(() => { act(() => tree.unmount()); });
  const artwork = tree.root.findByType(StencilBridgeLetteringDemo);
  assert.equal(artwork.findByProps({ role: 'img' }).props['aria-label'], 'B·O·D의 속공간을 바탕과 연결하는 브리지 틈을 남긴 BOLD 스텐실 레터링');
  assert.equal(artwork.findAllByType('text').length, 0);
  assert.equal(artwork.findAllByType('button').length, 0);
  assert.equal(artwork.findAllByType('input').length, 0);
});

test('Constructivism searches resolve to the public diagonal poster with its actual poster copy', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'st-constructivist-diagonal-poster');
  assert.equal(entries.length, 1);
  const [item] = entries;
  assert.equal(item.domain, 'style');
  assert.equal(item.category, 'retro');
  assert.ok(matchesSearch(item, '구성주의 포스터'));
  assert.ok(matchesSearch(item, 'Constructivism diagonal'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={item.id} />); });
  t.after(() => { act(() => tree.unmount()); });
  const artwork = tree.root.findByType(ConstructivistPosterDemo);
  assert.equal(artwork.findByProps({ role: 'img' }).props['aria-label'], '크림 종이 위 붉은 원과 검은 대각 띠의 FORM 활자를 조합한 구성주의 포스터');
  assert.equal(artwork.findByType('text').children.join(''), 'FORM');
  assert.equal(artwork.findAllByType('button').length, 0);
  assert.equal(artwork.findAllByType('input').length, 0);
});

test('Art Nouveau terms find the public static whiplash artwork through the demo registry', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'st-art-nouveau-whiplash-ornament');
  assert.equal(entries.length, 1);
  const [item] = entries;
  assert.equal(item.domain, 'style');
  assert.equal(item.category, 'retro');
  assert.ok(matchesSearch(item, '아르누보 휘플래시'));
  assert.ok(matchesSearch(item, 'Art Nouveau whiplash'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={item.id} />); });
  t.after(() => { act(() => tree.unmount()); });
  const artwork = tree.root.findByType(ArtNouveauWhiplashDemo);
  assert.equal(artwork.findByProps({ role: 'img' }).props['aria-label'], '비대칭 S곡선 장식 사이로 가늘고 긴 날개의 잠자리를 그린 아르누보 장식');
  assert.equal(artwork.findAllByType('button').length, 0);
  assert.equal(artwork.findAllByType('input').length, 0);
});

test('public Memphis entry resolves to its original artwork with isolated pattern references', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'st-memphis-geometric-pattern');
  assert.equal(entries.length, 1);
  const [item] = entries;
  assert.equal(item.domain, 'style');
  assert.equal(item.category, 'retro');
  assert.ok(matchesSearch(item, '멤피스 기하'));
  assert.ok(matchesSearch(item, 'Memphis pattern'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><MemphisPatternDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(MemphisPatternDemo).length, 2);
  const scenes = tree.root.findAllByProps({ role: 'img' });
  const ids = scenes.map(scene => scene.findByType('pattern').props.id);
  assert.notEqual(ids[0], ids[1]);
  for (const [index, scene] of scenes.entries()) {
    assert.ok(scene.props['aria-label'].includes('멤피스 패턴'));
    assert.equal(scene.findAll(node => node.props.fill === `url(#${ids[index]})`).length, 1);
    assert.equal(scene.findAll(node => node.props.fill === `url(#${ids[1 - index]})`).length, 0);
  }
});

test('linocut public artwork retains local negative-space mask references beside another instance', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'st-linocut-carved-botanical');
  assert.equal(entries.length, 1);
  const [item] = entries;
  assert.equal(item.domain, 'style');
  assert.equal(item.category, 'retro');
  assert.ok(matchesSearch(item, '리노컷 잎맥'));
  assert.ok(matchesSearch(item, 'Linocut carved'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><LinocutBotanicalDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const scenes = tree.root.findAllByType(LinocutBotanicalDemo).map(demo => demo.findByProps({ role: 'img' }));
  assert.equal(scenes.length, 2);
  const ids = scenes.map(scene => scene.findByType('mask').props.id);
  assert.notEqual(ids[0], ids[1]);
  for (const [index, scene] of scenes.entries()) {
    assert.equal(scene.props['aria-label'], '짙은 잎 실루엣 안의 잎맥을 종이색으로 파낸 리노컷 식물 판화');
    assert.equal(scene.findByType('g').props.mask, `url(#${ids[index]})`);
    assert.equal(scene.findByType('g').props['aria-hidden'], 'true');
    assert.equal(scene.findAll(node => node.props.mask === `url(#${ids[1 - index]})`).length, 0);
  }
});

test('seven-segment display switches fixed light positions without replacing or sharing its input', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'st-seven-segment-led');
  assert.equal(entries.length, 1);
  const [item] = entries;
  assert.equal(item.domain, 'style');
  assert.equal(item.category, 'retro');
  assert.ok(matchesSearch(item, '7세그먼트'));
  assert.ok(matchesSearch(item, 'Seven Segment LED'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><SevenSegmentLedDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [demo, other] = tree.root.findAllByType(SevenSegmentLedDemo);
  const input = demo.findByType('input');
  const scene = demo.findByProps({ role: 'img' });
  const pieces = demo.findAllByType('polygon');
  assert.equal(input.props.value, 8);
  assert.equal(pieces.filter(piece => piece.props['data-lit']).length, 7);
  assert.equal(input.props['aria-controls'], scene.props.id);
  assert.notEqual(scene.props.id, other.findByProps({ role: 'img' }).props.id);
  for (const [value, lit] of [[1, ['b', 'c']], [0, ['a', 'b', 'c', 'd', 'e', 'f']], [9, ['a', 'b', 'c', 'd', 'f', 'g']], [8, ['a', 'b', 'c', 'd', 'e', 'f', 'g']]] as const) {
    act(() => { input.props.onChange({ currentTarget: { valueAsNumber: value } }); });
    assert.deepEqual(pieces.filter(piece => piece.props['data-lit']).map(piece => piece.props['data-segment']), lit);
    assert.equal(scene.props['aria-label'], `숫자 ${value}을 표시하는 주황색 7세그먼트 LED`);
    assert.equal(other.findByType('input').props.value, 8);
  }
  assert.equal(demo.findByType('input'), input);
  assert.equal(demo.findByProps({ role: 'img' }), scene);
  assert.deepEqual(demo.findAllByType('polygon'), pieces);
});

test('Risograph registration moves only its own blue plate and returns to exact registration', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'st-risograph-ink-registration');
  assert.equal(entries.length, 1);
  const [item] = entries;
  assert.equal(item.domain, 'style');
  assert.equal(item.category, 'retro');
  assert.ok(matchesSearch(item, '리소그래프 색판'));
  assert.ok(matchesSearch(item, 'Risograph registration'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><RisographPrintDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [demo, other] = tree.root.findAllByType(RisographPrintDemo);
  const input = demo.findByType('input');
  const scene = demo.findByProps({ role: 'img' });
  const plate = demo.findByProps({ className: 'rt-riso-blue-plate' });
  const pink = scene.findByProps({ fill: '#f06a69' });
  const otherInput = other.findByType('input');
  assert.equal(input.props.value, 3);
  assert.equal(input.props['aria-controls'], scene.props.id);
  assert.notEqual(input.props['aria-controls'], otherInput.props['aria-controls']);
  const localIds = new Set(scene.findAll(node => typeof node.props.id === 'string').map(node => node.props.id));
  for (const shape of scene.findAllByType('use')) assert.ok(localIds.has(shape.props.href.slice(1)));
  assert.notEqual(scene.findByType('pattern').props.id, other.findByType('pattern').props.id);
  for (const [value, transform] of [[0, 'translate(0 0)'], [8, 'translate(8 -4)'], [3, 'translate(3 -1.5)'], [0, 'translate(0 0)']] as const) {
    act(() => { input.props.onChange({ currentTarget: { valueAsNumber: value } }); });
    assert.equal(plate.props.transform, transform);
    assert.equal(input.props.value, value);
    assert.equal(scene.props['aria-label'].includes(`오른쪽 ${value}`), true);
    assert.equal(otherInput.props.value, 3);
    assert.equal(pink.props.transform, undefined);
  }
  assert.equal(demo.findByType('input'), input);
  assert.equal(demo.findByProps({ role: 'img' }), scene);
  assert.equal(demo.findByProps({ className: 'rt-riso-blue-plate' }), plate);
});

test('public Art Deco entry is searchable and resolves to its named static original', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'st-art-deco-sunburst-frame');
  assert.equal(entries.length, 1);
  const [item] = entries;
  assert.equal(item.domain, 'style');
  assert.equal(item.category, 'retro');
  assert.ok(matchesSearch(item, '아르데코 프레임'));
  assert.ok(matchesSearch(item, 'Art Deco sunburst'));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={item.id} />); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(ArtDecoFrameDemo).length, 1);
  assert.equal(tree.root.findByProps({ role: 'img' }).props['aria-label'], '계단형 이중 테두리와 대칭 부챗살·마름모를 금빛 선으로 그린 아르데코 장식');
  assert.equal(tree.root.findAllByType('button').length, 0);
});
