import { COLLECTION_IDS } from './helpers/collection';
import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { TECHNIQUES, matchesSearch } from '@vibe-dictionary/catalog';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';
import { IntrinsicGridDemo } from '../src/components/demos/grid/IntrinsicGridDemo';
import { SubgridCardsDemo } from '../src/components/demos/grid/SubgridCardsDemo';
import { DenseMosaicDemo } from '../src/components/demos/grid/DenseMosaicDemo';
import { ContainerMediaCardDemo } from '../src/components/demos/grid/ContainerMediaCardDemo';
import { NamedAreasWorkspaceDemo } from '../src/components/demos/grid/NamedAreasWorkspaceDemo';
import { FullBleedEditorialDemo } from '../src/components/demos/grid/FullBleedEditorialDemo';
import { AspectRatioGalleryDemo } from '../src/components/demos/grid/AspectRatioGalleryDemo';
import { TwelveColumnSpanDemo } from '../src/components/demos/grid/TwelveColumnSpanDemo';
import { IntrinsicLabelGridDemo } from '../src/components/demos/grid/IntrinsicLabelGridDemo';
import { MixedTypeBaselineDemo } from '../src/components/demos/grid/MixedTypeBaselineDemo';
import { GRID_ADDITION_DEMOS } from '../src/components/demos/grid';
import { LocaleProvider, useLocale } from '../src/i18n/LocaleContext';

test('mixed-type metric grid preserves readable metrics and native control while changing only baseline alignment per instance', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><MixedTypeBaselineDemo /><MixedTypeBaselineDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [group, otherGroup] = tree.root.findAll(item => item.props?.role === 'group');
  const [checkbox, otherCheckbox] = tree.root.findAllByType('input');
  const metrics = group.findAllByType('p');
  const content = () => metrics.map(metric => [metric.findByType('strong').children.join(''), metric.findByType('span').children.join('')]);
  assert.deepEqual(content(), [['12', '팀원'], ['24', '문서'], ['8', '작업']]);
  assert.equal(checkbox.props.type, 'checkbox');
  assert.equal(checkbox.props['aria-label'], '지표 숫자 첫 글자 기준선 맞춤');
  assert.equal(checkbox.props['aria-controls'], group.props.id);
  assert.notEqual(group.props.id, otherGroup.props.id);
  for (const checked of [false, true, false, true]) {
    act(() => checkbox.props.onChange({ currentTarget: { checked } }));
    assert.equal(group.props['data-aligned'], checked);
    assert.equal(checkbox.props.checked, checked);
    assert.equal(otherGroup.props['data-aligned'], true);
    assert.equal(otherCheckbox.props.checked, true);
    assert.deepEqual(content(), [['12', '팀원'], ['24', '문서'], ['8', '작업']]);
    assert.deepEqual(group.findAllByType('p'), metrics);
    assert.equal(tree.root.findAllByType('input')[0], checkbox);
  }
});

test('intrinsic label grid changes semantic term text while preserving its paired values and other independent lists', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><IntrinsicLabelGridDemo /><IntrinsicLabelGridDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [list, otherList] = tree.root.findAllByType('dl');
  const [select, otherSelect] = tree.root.findAllByType('select');
  const terms = list.findAllByType('dt');
  const definitions = list.findAllByType('dd');
  assert.deepEqual(terms.map(term => term.children.join('')), ['이름', '위치', '담당']);
  assert.deepEqual(definitions.map(value => value.children.join('')), ['정원 스튜디오', '서울 성수동', '디자인팀']);
  assert.equal(select.props['aria-controls'], list.props.id);
  assert.notEqual(list.props.id, otherList.props.id);
  assert.equal(select.props['aria-label'], '공간 정보 첫 항목명');
  for (const [value, text] of [['project', '프로젝트 이름'], ['spaceProject', '공간 프로젝트 이름'], ['name', '이름']]) {
    act(() => select.props.onChange({ currentTarget: { value } }));
    assert.equal(terms[0].children.join(''), text);
    assert.equal(select.props.value, value);
    assert.deepEqual(terms.slice(1).map(term => term.children.join('')), ['위치', '담당']);
    assert.deepEqual(definitions.map(definition => definition.children.join('')), ['정원 스튜디오', '서울 성수동', '디자인팀']);
    assert.equal(otherList.findAllByType('dt')[0].children.join(''), '이름');
    assert.equal(otherSelect.props.value, 'name');
    assert.equal(tree.root.findAllByType('select')[0], select);
    assert.deepEqual(list.findAllByType('dt'), terms);
    assert.deepEqual(list.findAllByType('dd'), definitions);
  }
});

test('twelve-column spans partition the same twelve tracks without independent widths or replacement controls', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><TwelveColumnSpanDemo /><TwelveColumnSpanDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [grid, otherGrid] = tree.root.findAll(item => item.props?.role === 'img');
  const [input, otherInput] = tree.root.findAllByType('input');
  const tiles = grid.findAllByType('svg');
  assert.equal(tiles.length, 5);
  assert.equal(grid.findAllByType('span').length, 12);
  assert.ok(tiles.every(tile => tile.props['aria-hidden'] === 'true'));
  assert.equal(input.props['aria-controls'], grid.props.id);
  assert.notEqual(grid.props.id, otherGrid.props.id);
  assert.deepEqual([input.props.type, input.props.min, input.props.max, input.props.step, input.props.value], ['range', 4, 8, 1, 7]);
  for (const value of [4, 5, 6, 7, 8]) {
    act(() => input.props.onChange({ currentTarget: { value: String(value) } }));
    const spans = tiles.slice(0, 2).map(tile => Number(tile.props.style.gridColumn.split(' ')[1]));
    assert.equal(spans[0], value);
    assert.equal(spans[0] + spans[1], 12);
    assert.equal(input.props['aria-valuetext'], `전체 12열 중 ${value}열`);
    assert.equal(otherInput.props.value, 7);
    assert.equal(otherGrid.findAllByType('svg')[0].props.style.gridColumn, 'span 7');
    assert.equal(tree.root.findAllByType('input')[0], input);
    assert.deepEqual(grid.findAllByType('svg'), tiles);
  }
});

test('ratio gallery retains real image sources and intrinsic dimensions while a native select changes only the shared crop ratio', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><AspectRatioGalleryDemo /><AspectRatioGalleryDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [gallery, otherGallery] = tree.root.findAll(item => item.props?.role === 'group');
  const [select, otherSelect] = tree.root.findAllByType('select');
  const images = gallery.findAllByType('img');
  const sources = images.map(image => image.props.src);
  assert.deepEqual(images.map(image => [image.props.width, image.props.height]), [[160, 90], [90, 120], [120, 120]]);
  assert.deepEqual(images.map(image => image.props.alt), ['나무와 해가 있는 숲', '나뭇잎을 꽂은 화병', '모래 해변과 푸른 바다']);
  assert.equal(new Set(sources).size, 3);
  assert.ok(sources.every(source => source.endsWith('.svg')));
  assert.equal(select.props['aria-controls'], gallery.props.id);
  assert.equal(select.props['aria-label'], '갤러리 썸네일 비율');
  assert.notEqual(gallery.props.id, otherGallery.props.id);
  assert.deepEqual(select.findAllByType('option').map(option => option.props.value), ['1 / 1', '4 / 3', '4 / 5']);
  assert.equal(select.props.value, '4 / 3');
  for (const value of ['1 / 1', '4 / 5', '4 / 3']) {
    act(() => select.props.onChange({ currentTarget: { value } }));
    assert.deepEqual(gallery.props.style, { '--gr-thumb-ratio': value });
    assert.equal(otherGallery.props.style['--gr-thumb-ratio'], '4 / 3');
    assert.equal(otherSelect.props.value, '4 / 3');
    assert.equal(tree.root.findAllByType('select')[0], select);
    assert.deepEqual(gallery.findAllByType('img'), images);
    assert.deepEqual(images.map(image => image.props.src), sources);
  }
});

test('full bleed article changes only the reading track while preserving the full-width image and native control', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><FullBleedEditorialDemo /><FullBleedEditorialDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [article, otherArticle] = tree.root.findAllByType('article');
  const [input, otherInput] = tree.root.findAllByType('input');
  const art = article.findByType('svg');
  assert.equal(input.props['aria-controls'], article.props.id);
  assert.notEqual(article.props.id, otherArticle.props.id);
  assert.deepEqual([input.props.type, input.props.min, input.props.max, input.props.step, input.props.value], ['range', 50, 85, 1, 70]);
  assert.equal(input.props['aria-label'], '기사 본문 너비');
  assert.equal(article.findByType('h4').children.join(''), '골목의 발견');
  assert.equal(article.findByType('p').children.join(''), '익숙한 길의 새로운 장면.');
  assert.equal(art.props.role, 'img');
  assert.equal(art.props['aria-label'], '지붕이 이어진 골목 풍경');
  for (const value of [50, 85, 70]) {
    act(() => input.props.onChange({ currentTarget: { value: String(value) } }));
    assert.deepEqual(article.props.style, { '--gr-reading-width': `${value}%` });
    assert.equal(input.props['aria-valuetext'], `${value}%`);
    assert.equal(otherArticle.props.style['--gr-reading-width'], '70%');
    assert.equal(otherInput.props.value, 70);
    assert.equal(article.findByType('svg'), art);
    assert.equal(tree.root.findAllByType('input')[0], input);
  }
});

test('named-area workspace removes navigation from layout while preserving all decorative regions and native controls', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><NamedAreasWorkspaceDemo /><NamedAreasWorkspaceDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [frame, otherFrame] = tree.root.findAll(item => item.props?.role === 'img');
  const [checkbox, otherCheckbox] = tree.root.findAllByType('input');
  const navigation = frame.findByProps({ className: 'gr-area-nav' });
  const regions = frame.findAll(item => item.type === 'div' && item.props['aria-hidden'] === 'true');
  assert.equal(regions.length, 4);
  assert.equal(frame.findAllByType('button').length, 0);
  assert.equal(frame.findAllByType('a').length, 0);
  assert.equal(checkbox.props.type, 'checkbox');
  assert.equal(checkbox.props['aria-label'], '작업 화면 탐색 영역 표시');
  assert.equal(checkbox.props['aria-controls'], frame.props.id);
  assert.notEqual(frame.props.id, otherFrame.props.id);
  for (const checked of [false, true, false, true]) {
    act(() => checkbox.props.onChange({ currentTarget: { checked } }));
    assert.equal(frame.props['data-navigation'], checked);
    assert.equal(navigation.props.hidden, !checked);
    assert.equal(frame.props['aria-label'], `탐색 영역이 ${checked ? '있는' : '없는'} 작업 화면 레이아웃`);
    assert.equal(checkbox.props.checked, checked);
    assert.equal(otherFrame.props['data-navigation'], true);
    assert.equal(otherCheckbox.props.checked, true);
    assert.equal(tree.root.findAllByType('input')[0], checkbox);
    assert.deepEqual(frame.findAll(item => item.type === 'div' && item.props['aria-hidden'] === 'true'), regions);
  }
});

test('container media card adjusts its query container rather than replacing the card or maintaining a fake layout mode', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><ContainerMediaCardDemo /><ContainerMediaCardDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [input, otherInput] = tree.root.findAllByType('input');
  const container = tree.root.findByProps({ id: input.props['aria-controls'] });
  const otherContainer = tree.root.findByProps({ id: otherInput.props['aria-controls'] });
  const card = container.findByType('article');
  const art = card.findByType('svg');
  assert.notEqual(container.props.id, otherContainer.props.id);
  assert.deepEqual([input.props.type, input.props.min, input.props.max, input.props.step, input.props.value], ['range', 55, 100, 1, 100]);
  assert.equal(input.props['aria-label'], '콘텐츠 카드 컨테이너 너비');
  assert.equal(art.props.role, 'img');
  assert.equal(art.props['aria-label'], '산과 해가 겹친 풍경');
  assert.equal(card.findByType('h4').children.join(''), '숲의 기록');
  assert.equal(card.findByType('p').children.join(''), '산책 사진집');
  for (const value of [55, 83, 84, 100]) {
    act(() => input.props.onChange({ currentTarget: { value: String(value) } }));
    assert.deepEqual(container.props.style, { width: `${value}%` });
    assert.equal(input.props['aria-valuetext'], `${value}%`);
    assert.equal(otherContainer.props.style.width, '100%');
    assert.equal(otherInput.props.value, 100);
    assert.equal(tree.root.findAllByType('input')[0], input);
    assert.equal(container.findByType('article'), card);
    assert.equal(card.findByType('svg'), art);
  }
});

test('dense mosaic preserves decorative source order and native focus target while changing only its packing mode', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><DenseMosaicDemo /><DenseMosaicDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [mosaic, otherMosaic] = tree.root.findAll(item => item.props?.role === 'img');
  const [checkbox, otherCheckbox] = tree.root.findAllByType('input');
  const tiles = mosaic.findAllByType('svg');
  assert.equal(tiles.length, 6);
  assert.deepEqual(tiles.map(tile => tile.props['data-wide'] === 'true'), [true, true, false, false, true, false]);
  assert.ok(tiles.every(tile => tile.props['aria-hidden'] === 'true' && tile.props.tabIndex === undefined && tile.props.onClick === undefined));
  assert.equal(checkbox.props.type, 'checkbox');
  assert.equal(checkbox.props['aria-label'], '그리드 빈칸 채우기');
  assert.equal(checkbox.props['aria-controls'], mosaic.props.id);
  assert.notEqual(mosaic.props.id, otherMosaic.props.id);
  assert.equal(mosaic.props['data-dense'], true);
  for (const checked of [false, true, false, true]) {
    act(() => checkbox.props.onChange({ currentTarget: { checked } }));
    assert.equal(mosaic.props['data-dense'], checked);
    assert.equal(checkbox.props.checked, checked);
    assert.equal(otherMosaic.props['data-dense'], true);
    assert.equal(otherCheckbox.props.checked, true);
    assert.equal(tree.root.findAllByType('input')[0], checkbox);
    assert.deepEqual(mosaic.findAllByType('svg'), tiles);
  }
});

test('subgrid cards toggle actual shared-track mode without replacing content or affecting other instances', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><SubgridCardsDemo /><SubgridCardsDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [group, otherGroup] = tree.root.findAll(item => item.props?.role === 'group');
  const [checkbox, otherCheckbox] = tree.root.findAllByType('input');
  const cards = group.findAllByType('article');
  const content = cards.map(card => [card.findByType('h4').children.join(''), card.findByType('p').children.join(''), card.findByType('span').children.join('')]);
  assert.deepEqual(content, [['노트', '생각을 담는 공간', '개인'], ['프로젝트 아카이브', '자료와 아이디어를 함께 모아두는 공간', '공유']]);
  assert.equal(checkbox.props.type, 'checkbox');
  assert.equal(checkbox.props['aria-label'], '카드 내부 행 맞춤');
  assert.equal(checkbox.props['aria-controls'], group.props.id);
  assert.notEqual(group.props.id, otherGroup.props.id);
  assert.equal(group.props['data-aligned'], true);
  for (const checked of [false, true, false, true]) {
    act(() => checkbox.props.onChange({ currentTarget: { checked } }));
    assert.equal(group.props['data-aligned'], checked);
    assert.equal(checkbox.props.checked, checked);
    assert.equal(otherGroup.props['data-aligned'], true);
    assert.equal(otherCheckbox.props.checked, true);
    assert.equal(tree.root.findAllByType('input')[0], checkbox);
    assert.deepEqual(group.findAllByType('article'), cards);
    assert.deepEqual(cards.map(card => [card.findByType('h4').children.join(''), card.findByType('p').children.join(''), card.findByType('span').children.join('')]), content);
  }
});

test('intrinsic grid changes actual container width while preserving order, controls and independent instances', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><IntrinsicGridDemo /><IntrinsicGridDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [list, otherList] = tree.root.findAllByType('ul');
  const [input, otherInput] = tree.root.findAllByType('input');
  const tiles = list.findAllByType('li');
  assert.deepEqual(tiles.map(tile => tile.props['aria-label']), ['사진', '음악', '문서']);
  assert.equal(input.props['aria-controls'], list.props.id);
  assert.notEqual(list.props.id, otherList.props.id);
  assert.deepEqual([input.props.type, input.props.min, input.props.max, input.props.step, input.props.value], ['range', 45, 100, 1, 100]);
  for (const value of [45, 70, 100]) {
    act(() => input.props.onChange({ currentTarget: { value: String(value) } }));
    assert.equal(list.props.style.width, `${value}%`);
    assert.equal(input.props['aria-valuetext'], `${value}%`);
    assert.equal(otherList.props.style.width, '100%');
    assert.equal(otherInput.props.value, 100);
    assert.equal(tree.root.findAllByType('input')[0], input);
    assert.deepEqual(list.findAllByType('li'), tiles);
  }
});

test('grid additions have unique searchable catalog entries and exact demo mappings', t => {
  const originals = new Set(['ly-bento-grid', 'ly-masonry-waterfall', 'ly-editorial-asymmetric', 'ly-honeycomb-hex']);
  const additions = TECHNIQUES.filter(item => !COLLECTION_IDS.has(item.id) && item.category === 'grid' && !originals.has(item.id) && item.id !== 'accordion-image-gallery'); // Covered in showcase-demos.
  assert.deepEqual(additions.map(item => item.id).sort(), Object.keys(GRID_ADDITION_DEMOS).sort());
  for (const item of additions) {
    assert.equal(item.domain, 'layout');
    assert.equal(TECHNIQUES.filter(candidate => candidate.id === item.id).length, 1);
    assert.ok(matchesSearch(item, item.titleEn));
    assert.ok(item.promptSnippet.length > 100);
    let tree!: ReturnType<typeof create>;
    act(() => { tree = create(<InteractiveDemo techniqueId={item.id} />); });
    t.after(() => { act(() => tree.unmount()); });
    assert.equal(tree.root.findAllByType(GRID_ADDITION_DEMOS[item.id]).length, 1);
  }
});

test('grid demos switch visible and accessible text live while retaining native input state and content nodes', t => {
  let switchLocale!: ReturnType<typeof useLocale>['setLocale'];
  function Harness() {
    switchLocale = useLocale().setLocale;
    return <><MixedTypeBaselineDemo /><IntrinsicLabelGridDemo /><TwelveColumnSpanDemo /><AspectRatioGalleryDemo /><FullBleedEditorialDemo /><NamedAreasWorkspaceDemo /><ContainerMediaCardDemo /><DenseMosaicDemo /><SubgridCardsDemo /><IntrinsicGridDemo /></>;
  }
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<LocaleProvider initialLocale="ko"><Harness /></LocaleProvider>); });
  t.after(() => { act(() => tree.unmount()); });
  const inputs = tree.root.findAllByType('input');
  const selects = tree.root.findAllByType('select');
  const [baseline, span, articleWidth, navigation, cardWidth, dense, subgrid, intrinsicWidth] = inputs;
  act(() => {
    baseline.props.onChange({ currentTarget: { checked: false } });
    selects[0].props.onChange({ currentTarget: { value: 'spaceProject' } });
    span.props.onChange({ currentTarget: { value: '4' } });
    selects[1].props.onChange({ currentTarget: { value: '4 / 5' } });
    articleWidth.props.onChange({ currentTarget: { value: '50' } });
    navigation.props.onChange({ currentTarget: { checked: false } });
    cardWidth.props.onChange({ currentTarget: { value: '55' } });
    dense.props.onChange({ currentTarget: { checked: false } });
    subgrid.props.onChange({ currentTarget: { checked: false } });
    intrinsicWidth.props.onChange({ currentTarget: { value: '45' } });
  });
  const list = tree.root.findByType('dl');
  const firstTerm = list.findAllByType('dt')[0];
  const images = tree.root.findAllByType('img');
  const sources = images.map(image => image.props.src);
  const articles = tree.root.findAllByType('article');
  const ids = inputs.map(input => input.props['aria-controls']);
  act(() => switchLocale('en'));
  assert.equal(firstTerm.children.join(''), 'Space project name');
  assert.deepEqual(selects[0].findAllByType('option').map(option => option.children.join('')), ['Name', 'Project name', 'Space project name']);
  assert.equal(selects[1].findAllByType('option')[2].children.join(''), 'Portrait');
  assert.equal(selects[0].props['aria-label'], 'First term in space information');
  assert.equal(span.props['aria-valuetext'], '4 of 12 columns');
  assert.equal(baseline.props['aria-label'], 'Align metric numbers on their first text baseline');
  assert.equal(tree.root.findByProps({ className: 'gr-area-frame' }).props['aria-label'], 'Workspace layout without navigation');
  assert.deepEqual(tree.root.findByProps({ className: 'gr-baseline-grid' }).findAllByType('span').map(label => label.children.join('')), ['Members', 'Docs', 'Tasks']);
  assert.deepEqual(images.map(image => image.props.alt), ['Forest with trees and sun', 'Vase with leafy branches', 'Sandy beach and blue sea']);
  assert.equal(tree.root.findByProps({ className: 'gr-bleed-grid' }).findByType('h4').children.join(''), 'Discovering the alley');
  assert.equal(tree.root.findByProps({ className: 'gr-context-card' }).findByType('h4').children.join(''), 'Forest journal');
  assert.equal(tree.root.findByProps({ className: 'gr-subgrid-cards' }).findAllByType('h4')[1].children.join(''), 'Project archive');
  assert.deepEqual(tree.root.findByType('ul').findAllByType('li').map(item => item.props['aria-label']), ['Photos', 'Music', 'Documents']);
  assert.deepEqual(inputs.map(input => input.props.type === 'checkbox' ? input.props.checked : input.props.value), [false, 4, 50, false, 55, false, false, 45]);
  assert.deepEqual(selects.map(select => select.props.value), ['spaceProject', '4 / 5']);
  assert.deepEqual(inputs.map(input => input.props['aria-controls']), ids);
  assert.deepEqual(tree.root.findAllByType('input'), inputs);
  assert.deepEqual(tree.root.findAllByType('select'), selects);
  assert.deepEqual(tree.root.findAllByType('article'), articles);
  assert.deepEqual(images.map(image => image.props.src), sources);
  assert.equal(tree.root.findByType('dl').findAllByType('dt')[0], firstTerm);
  act(() => switchLocale('ko'));
  assert.equal(firstTerm.children.join(''), '공간 프로젝트 이름');
  assert.equal(span.props['aria-valuetext'], '전체 12열 중 4열');
  assert.equal(tree.root.findByProps({ className: 'gr-area-frame' }).props['aria-label'], '탐색 영역이 없는 작업 화면 레이아웃');
  assert.deepEqual(inputs.map(input => input.props.type === 'checkbox' ? input.props.checked : input.props.value), [false, 4, 50, false, 55, false, false, 45]);
});
