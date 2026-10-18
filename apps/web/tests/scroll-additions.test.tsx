import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { TECHNIQUES, matchesSearch } from '@vibe-dictionary/catalog';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';
import { SCROLL_ADDITION_DEMOS } from '../src/components/demos/scroll';
import { StickyGroupHeadersDemo } from '../src/components/demos/scroll/StickyGroupHeadersDemo';
import { FrozenTableDemo } from '../src/components/demos/scroll/FrozenTableDemo';
import { ScrollEdgeShadowsDemo } from '../src/components/demos/scroll/ScrollEdgeShadowsDemo';
import { IndependentScrollPanesDemo } from '../src/components/demos/scroll/IndependentScrollPanesDemo';
import { NestedCollectionsDemo } from '../src/components/demos/scroll/NestedCollectionsDemo';
import { ReadingProgressDemo } from '../src/components/demos/scroll/ReadingProgressDemo';
import { ProportionalScrollSyncDemo } from '../src/components/demos/scroll/ProportionalScrollSyncDemo';
import { PrependScrollAnchorDemo } from '../src/components/demos/scroll/PrependScrollAnchorDemo';
import { FixedRowVirtualScrollDemo } from '../src/components/demos/scroll/FixedRowVirtualScrollDemo';
import { StableScrollbarGutterDemo } from '../src/components/demos/scroll/StableScrollbarGutterDemo';
import { LocaleProvider, useLocale } from '../src/i18n/LocaleContext';

test('live language changes translate every scroll demo while retaining reading positions, loaded history, virtual rows and checkbox state', t => {
  function LanguageSwitch() {
    const { locale, setLocale } = useLocale();
    return <button data-locale-switch onClick={() => setLocale(locale === 'ko' ? 'en' : 'ko')}>Switch</button>;
  }
  let tree!: ReturnType<typeof create>;
  const anchorNode = {
    scrollTop: 0, clientHeight: 94,
    get scrollHeight() { return tree.root.findByType(PrependScrollAnchorDemo).findAllByType('li').length * 47; },
  };
  const syncNodes = [
    { scrollTop: 0, scrollHeight: 324, clientHeight: 108 },
    { scrollTop: 0, scrollHeight: 486, clientHeight: 108 },
  ];
  act(() => { tree = create(<LocaleProvider initialLocale="ko"><LanguageSwitch />
    <StickyGroupHeadersDemo /><FrozenTableDemo /><ScrollEdgeShadowsDemo /><IndependentScrollPanesDemo /><NestedCollectionsDemo />
    <ReadingProgressDemo /><ProportionalScrollSyncDemo /><PrependScrollAnchorDemo /><FixedRowVirtualScrollDemo /><StableScrollbarGutterDemo />
  </LocaleProvider>, { createNodeMock: element => {
    if (element.props.className === 'sc-pane-viewport sc-anchor-viewport') return anchorNode;
    if (element.props.className === 'sc-pane-viewport') return syncNodes[element.props['aria-labelledby'].endsWith('-0') ? 0 : 1];
    return null;
  } }); });
  t.after(() => { act(() => tree.unmount()); });
  const reading = tree.root.findByType(ReadingProgressDemo);
  const virtual = tree.root.findByType(FixedRowVirtualScrollDemo);
  const gutter = tree.root.findByType(StableScrollbarGutterDemo);
  const anchor = tree.root.findByType(PrependScrollAnchorDemo);
  const sync = tree.root.findByType(ProportionalScrollSyncDemo);
  const readingRegion = reading.findByProps({ role: 'region' });
  const virtualRegion = virtual.findByProps({ role: 'region' });
  const gutterRegion = gutter.findByProps({ role: 'region' });
  const checkbox = gutter.findByType('input');
  const initialGutterRow = gutter.findAllByType('li')[0];
  const historyButton = anchor.findByType('button');
  const [left, right] = sync.findAllByProps({ role: 'region' });
  act(() => {
    readingRegion.props.onScroll({ currentTarget: { scrollTop: 66, scrollHeight: 396, clientHeight: 132 } });
    virtualRegion.props.onScroll({ currentTarget: { scrollTop: 2300, clientHeight: 138 } });
    checkbox.props.onChange({ currentTarget: { checked: true } });
    historyButton.props.onClick();
    left.props.onWheel({});
    syncNodes[0].scrollTop = 108;
    left.props.onScroll({ currentTarget: syncNodes[0] });
  });
  const visibleHistoryRow = anchor.findAllByType('li')[2];
  const virtualRows = virtual.findAllByType('li');
  const positions = virtualRows.map(row => row.props['aria-posinset']);
  const assertState = () => {
    assert.equal(reading.findByType('progress').props.value, 25);
    assert.equal(reading.findByProps({ role: 'region' }), readingRegion);
    assert.equal(virtual.findByProps({ role: 'region' }), virtualRegion);
    assert.deepEqual(virtual.findAllByType('li').map(row => row.props['aria-posinset']), positions);
    assert.ok(virtualRows.every((row, index) => virtual.findAllByType('li')[index] === row));
    assert.equal(checkbox.props.checked, true);
    assert.equal(gutter.findByType('input'), checkbox);
    assert.equal(gutter.findByProps({ role: 'region' }), gutterRegion);
    assert.equal(gutter.findAllByType('li').length, 8);
    assert.equal(gutter.findAllByType('li')[0], initialGutterRow);
    assert.equal(anchor.findAllByType('li').length, 6);
    assert.equal(anchor.findAllByType('li')[2], visibleHistoryRow);
    assert.equal(anchor.findByType('button'), historyButton);
    assert.equal(anchorNode.scrollTop, 94);
    assert.deepEqual(sync.findAllByProps({ role: 'region' }), [left, right]);
  };
  assertState();
  act(() => tree.root.findByProps({ 'data-locale-switch': true }).props.onClick());
  assert.doesNotMatch(JSON.stringify(tree.toJSON()), /[가-힣]/u);
  assert.equal(virtualRows[0].findByType('span').children.join(''), 'Note-039.md');
  assert.equal(checkbox.props['aria-label'], 'Show full file list');
  assert.equal(visibleHistoryRow.findByType('span').children.join(''), 'Image placement');
  assertState();
  // Locale changes must not reset the active native scroll driver.
  syncNodes[0].scrollTop = 163;
  act(() => right.props.onScroll({ currentTarget: syncNodes[1] }));
  assert.equal(syncNodes[0].scrollTop, 163);
  act(() => left.props.onScroll({ currentTarget: syncNodes[0] }));
  assert.equal(syncNodes[1].scrollTop, 285.25);
  act(() => tree.root.findByProps({ 'data-locale-switch': true }).props.onClick());
  assert.equal(virtualRows[0].findByType('span').children.join(''), '노트-039.md');
  assert.equal(visibleHistoryRow.findByType('span').children.join(''), '이미지 배치');
  assertState();
});

test('grouped color content remains accessible in one native keyboard scroll region without capturing input', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><StickyGroupHeadersDemo /><StickyGroupHeadersDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [first, other] = tree.root.findAllByType(StickyGroupHeadersDemo);
  const region = first.findByProps({ role: 'region' });
  assert.equal(region.props.tabIndex, 0);
  assert.equal(region.props['aria-label'], '색상 견본 목록');
  for (const element of first.findAll(() => true)) {
    assert.equal(element.props.onWheel, undefined);
    assert.equal(element.props.onKeyDown, undefined);
    assert.equal(element.props.onClick, undefined);
  }
  const groups = region.findAllByType('section');
  assert.deepEqual(groups.map(group => group.findByType('h3').children.join('')), ['따뜻한 색', '차가운 색', '무채색']);
  const otherHeadings = other.findAllByType('h3');
  groups.forEach((group, index) => {
    const heading = group.findByType('h3');
    assert.equal(group.props['aria-labelledby'], heading.props.id);
    assert.notEqual(heading.props.id, otherHeadings[index].props.id);
    const rows = group.findByType('ul').findAllByType('li');
    assert.equal(rows.length, 4);
    rows.forEach(row => {
      const [swatch, name] = row.findAllByType('span');
      const color = row.findByType('code').children.join('');
      assert.equal(swatch.props['aria-hidden'], 'true');
      assert.equal(swatch.props.style.backgroundColor, color);
      assert.ok(name.children.join('').length > 0);
      assert.match(color, /^#[0-9A-F]{6}$/);
    });
  });
  assert.equal(first.findAllByType('button').length, 0);
  assert.equal(region.findAllByType('li').length, 12);
  assert.deepEqual(region.findAllByType('code').map(code => code.children.join('')), ['#F97360', '#F5AD36', '#E85A8A', '#BB7055', '#52A7E8', '#46B89B', '#9984D7', '#6068C9', '#EDE9DF', '#B8C0CA', '#64748B', '#334155']);
});

test('frozen axes retain native table header associations and all content in one keyboard scroll region', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<FrozenTableDemo />); });
  t.after(() => { act(() => tree.unmount()); });
  const region = tree.root.findByProps({ role: 'region' });
  assert.equal(region.props.tabIndex, 0);
  assert.equal(region.props['aria-label'], '제작 일정 스크롤 영역');
  const table = region.findByType('table');
  assert.equal(table.props['aria-label'], '콘텐츠 제작 일정');
  const columns = table.findByType('thead').findAllByType('th');
  assert.deepEqual(columns.map(cell => cell.children.join('')), ['작업', '담당', '마감', '단계']);
  assert.ok(columns.every(cell => cell.props.scope === 'col'));
  const rows = table.findByType('tbody').findAllByType('tr');
  assert.deepEqual(rows.map(row => row.findByType('th').children.join('')), ['포스터', '썸네일', '배너', '표지', '초대장']);
  assert.ok(rows.every(row => row.findByType('th').props.scope === 'row' && row.findAllByType('td').length === 3));
  assert.deepEqual(rows.at(-1)!.findAllByType('td').map(cell => cell.children.join('')), ['지윤', '10.22', '제작']);
  for (const element of tree.root.findAll(() => true)) {
    assert.equal(element.props.onWheel, undefined);
    assert.equal(element.props.onKeyDown, undefined);
    assert.equal(element.props.onClick, undefined);
  }
  assert.equal(tree.root.findAllByType('button').length, 0);
});

test('edge shadow documents preserve their complete readable list and native input without fake file actions', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<ScrollEdgeShadowsDemo />); });
  t.after(() => { act(() => tree.unmount()); });
  const region = tree.root.findByProps({ role: 'region' });
  assert.equal(region.props.tabIndex, 0);
  assert.equal(region.props['aria-label'], '디자인 문서 목록');
  const rows = region.findByType('ul').findAllByType('li');
  assert.deepEqual(rows.map(row => row.findByType('span').children.join('')), ['기획서.md', '스타일가이드.pdf', '컴포넌트.fig', '일러스트.svg', '브랜드.png', '배포노트.md']);
  assert.ok(rows.every(row => row.findByType('svg').props['aria-hidden'] === 'true'));
  for (const element of tree.root.findAll(() => true)) {
    assert.equal(element.props.onWheel, undefined);
    assert.equal(element.props.onKeyDown, undefined);
    assert.equal(element.props.onClick, undefined);
  }
  assert.equal(tree.root.findAllByType('button').length, 0);
  assert.equal(tree.root.findAllByType('a').length, 0);
});

test('split panes expose two separate native keyboard scroll targets and stable unique header relationships', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><IndependentScrollPanesDemo /><IndependentScrollPanesDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [first, other] = tree.root.findAllByType(IndependentScrollPanesDemo);
  const regions = first.findAllByProps({ role: 'region' });
  const headings = first.findAllByType('h3');
  assert.equal(regions.length, 2);
  assert.deepEqual(headings.map(heading => heading.children.join('')), ['시안', '의견']);
  const otherIds = other.findAllByType('h3').map(heading => heading.props.id);
  regions.forEach((region, index) => {
    assert.equal(region.props.tabIndex, 0);
    assert.equal(region.props['aria-labelledby'], headings[index].props.id);
    assert.ok(!otherIds.includes(headings[index].props.id));
    assert.equal(region.findAllByType('h3').length, 0);
    assert.equal(region.findByType('ul').findAllByType('li').length, 6);
  });
  assert.notEqual(regions[0].props['aria-labelledby'], regions[1].props['aria-labelledby']);
  assert.deepEqual(regions.map(region => region.findAllByType('li').at(-1)!.children.join('')), ['뒷면.fig', '이미지 비율']);
  for (const element of first.findAll(() => true)) {
    assert.equal(element.props.onScroll, undefined);
    assert.equal(element.props.onWheel, undefined);
    assert.equal(element.props.onKeyDown, undefined);
    assert.equal(element.props.onClick, undefined);
  }
  assert.equal(first.findAllByType('button').length, 0);
});

test('nested collections preserve native parent and shelf targets with complete accessible poster content', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><NestedCollectionsDemo /><NestedCollectionsDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [first, other] = tree.root.findAllByType(NestedCollectionsDemo);
  const parent = first.findByProps({ 'aria-label': '포스터 컬렉션' });
  assert.equal(parent.props.role, 'region');
  assert.equal(parent.props.tabIndex, 0);
  const sections = parent.findAllByType('section');
  assert.equal(sections.length, 2);
  assert.deepEqual(sections.map(section => section.findByType('h3').children.join('')), ['숲 포스터', '바다 포스터']);
  const otherIds = other.findAllByType('h3').map(heading => heading.props.id);
  sections.forEach(section => {
    const heading = section.findByType('h3');
    const shelf = section.findByProps({ role: 'region' });
    assert.equal(shelf.props.tabIndex, 0);
    assert.equal(shelf.props['aria-labelledby'], heading.props.id);
    assert.ok(!otherIds.includes(heading.props.id));
    assert.equal(shelf.findByType('ul').findAllByType('li').length, 3);
    const posters = shelf.findAllByType('svg');
    assert.ok(posters.every(poster => poster.props.role === 'img' && poster.props['aria-label'] && !poster.props['aria-hidden']));
  });
  assert.deepEqual(first.findAllByType('svg').map(poster => poster.props['aria-label']), ['햇살 숲', '안개 숲', '저녁 숲', '아침 바다', '물결 바다', '노을 바다']);
  for (const element of first.findAll(() => true)) {
    assert.equal(element.props.onScroll, undefined);
    assert.equal(element.props.onWheel, undefined);
    assert.equal(element.props.onKeyDown, undefined);
    assert.equal(element.props.onClick, undefined);
  }
  assert.equal(first.findAllByType('button').length, 0);
});

test('reading progress tracks real scroll range, clamps bounce, resets non-overflow and stays local without replacing content', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><ReadingProgressDemo /><ReadingProgressDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [first, other] = tree.root.findAllByType(ReadingProgressDemo);
  const region = first.findByProps({ role: 'region' });
  const progress = first.findByType('progress');
  const article = region.findByType('article');
  const sections = article.findAllByType('section');
  assert.equal(region.props.tabIndex, 0);
  assert.equal(region.props['aria-label'], '편집 원칙');
  assert.equal(progress.props['aria-label'], '문서 스크롤 위치');
  assert.equal(progress.props.max, 100);
  assert.equal(progress.props.value, 0);
  assert.deepEqual(sections.map(section => section.findByType('h3').children.join('')), ['목적', '구조', '문장', '순서', '예외', '검토']);
  const scroll = (scrollTop: number, scrollHeight = 396, clientHeight = 132) => act(() => region.props.onScroll({ currentTarget: { scrollTop, scrollHeight, clientHeight } }));
  scroll(66);
  assert.equal(progress.props.value, 25);
  scroll(132);
  assert.equal(progress.props.value, 50);
  scroll(264);
  assert.equal(progress.props.value, 100);
  scroll(400);
  assert.equal(progress.props.value, 100);
  scroll(-20);
  assert.equal(progress.props.value, 0);
  scroll(132, 264, 132);
  assert.equal(progress.props.value, 100);
  scroll(0, 132, 132);
  assert.equal(progress.props.value, 0);
  scroll(0, 100, 132);
  assert.equal(progress.props.value, 0);
  assert.equal(other.findByType('progress').props.value, 0);
  assert.equal(region.findByType('article'), article);
  assert.ok(article.findAllByType('section').every((section, index) => section === sections[index]));
  assert.equal(first.findByType('progress'), progress);
  assert.equal(region.props.onKeyDown, undefined);
  assert.equal(region.props.onWheel, undefined);
  assert.equal(first.findAllByType('button').length, 0);
});

test('linked documents synchronize both real scroll ranges, preserve endpoints and avoid fractional event feedback', t => {
  const nodes = Array.from({ length: 4 }, (_, index) => ({ scrollTop: 0, scrollHeight: index % 2 ? 486 : 324, clientHeight: 108, writes: 0 }));
  for (const node of nodes) {
    let top = 0;
    Object.defineProperty(node, 'scrollTop', { get: () => top, set: value => { top = value; node.writes++; } });
  }
  let nextNode = 0;
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><ProportionalScrollSyncDemo /><ProportionalScrollSyncDemo /></>, {
    createNodeMock: element => element.props.role === 'region' ? nodes[nextNode++] : null,
  }); });
  t.after(() => { act(() => tree.unmount()); });
  const [first, other] = tree.root.findAllByType(ProportionalScrollSyncDemo);
  const [left, right] = first.findAllByProps({ role: 'region' });
  const headings = first.findAllByType('h3');
  assert.deepEqual(headings.map(heading => heading.children.join('')), ['요약', '해설']);
  for (const [index, region] of [left, right].entries()) {
    assert.equal(region.props.tabIndex, 0);
    assert.equal(region.props['aria-labelledby'], headings[index].props.id);
    assert.ok(!other.findAllByType('h3').some(heading => heading.props.id === headings[index].props.id));
    assert.equal(typeof region.props.onWheel, 'function');
    assert.equal(typeof region.props.onKeyDown, 'function');
  }
  assert.deepEqual([left, right].map(region => region.findAllByType('li').length), [6, 9]);
  const list = left.findByType('ol');
  const scroll = (index: number, top: number) => {
    nodes[index].scrollTop = top;
    act(() => {
      [left, right][index].props.onWheel({ preventDefault: () => assert.fail('native input must remain uncancelled') });
      [left, right][index].props.onScroll({ currentTarget: nodes[index] });
    });
  };
  scroll(0, 108);
  assert.equal(nodes[1].scrollTop, 189);
  const leftWrites = nodes[0].writes;
  act(() => right.props.onScroll({ currentTarget: nodes[1] }));
  assert.equal(nodes[0].writes, leftWrites);
  scroll(1, 94.5);
  assert.equal(nodes[0].scrollTop, 54);
  scroll(1, 378);
  assert.equal(nodes[0].scrollTop, 216);
  scroll(0, 0);
  assert.equal(nodes[1].scrollTop, 0);
  scroll(0, 400);
  assert.equal(nodes[1].scrollTop, 378);
  scroll(0, -20);
  assert.equal(nodes[1].scrollTop, 0);
  nodes[1].scrollTop = 188.5;
  const rightWrites = nodes[1].writes;
  scroll(0, 108);
  assert.equal(nodes[1].writes, rightWrites);
  nodes[1].scrollTop = 377.5;
  scroll(0, 216);
  assert.equal(nodes[1].scrollTop, 378);
  nodes[1].scrollTop = .5;
  scroll(0, 0);
  assert.equal(nodes[1].scrollTop, 0);
  nodes[0].scrollHeight = 108;
  nodes[1].scrollTop = 200;
  scroll(0, 0);
  assert.equal(nodes[1].scrollTop, 0);
  nodes[0].scrollHeight = 324;
  nodes[1].scrollHeight = 100;
  scroll(0, 108);
  assert.equal(nodes[1].scrollTop, 0);
  assert.equal(nodes[2].scrollTop, 0);
  assert.equal(nodes[3].scrollTop, 0);
  assert.equal(left.findByType('ol'), list);
  assert.equal(first.findAllByType('button').length, 0);
});

test('delayed peer scroll events cannot cancel native End motion and real input hands control back immediately', async t => {
  const nodes = [
    { scrollTop: 0, scrollHeight: 324, clientHeight: 108 },
    { scrollTop: 0, scrollHeight: 486, clientHeight: 108 },
  ];
  let nextNode = 0;
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<ProportionalScrollSyncDemo />, {
    createNodeMock: element => element.props.role === 'region' ? nodes[nextNode++] : null,
  }); });
  t.after(() => { act(() => tree.unmount()); });
  const [left, right] = tree.root.findAllByProps({ role: 'region' });
  const nativeEvent = { preventDefault: () => assert.fail('default input was cancelled'), stopPropagation: () => assert.fail('page input was stopped') };
  const emitScroll = (index: number) => act(() => [left, right][index].props.onScroll({ currentTarget: nodes[index] }));

  act(() => { left.props.onFocus(nativeEvent); left.props.onKeyDown({ ...nativeEvent, key: 'End' }); });
  nodes[0].scrollTop = 108;
  emitScroll(0);
  assert.equal(nodes[1].scrollTop, 189);
  // The browser advances its native keyboard animation before delivering the
  // programmatically moved peer's queued scroll event in the next turn.
  await new Promise<void>(resolve => setImmediate(resolve));
  nodes[0].scrollTop = 163;
  emitScroll(1);
  assert.equal(nodes[0].scrollTop, 163);
  emitScroll(0);
  assert.equal(nodes[1].scrollTop, 285.25);
  await new Promise<void>(resolve => setImmediate(resolve));
  nodes[0].scrollTop = 216;
  emitScroll(1);
  assert.equal(nodes[0].scrollTop, 216);
  emitScroll(0);
  assert.equal(nodes[1].scrollTop, 378);

  // Wheel hand-off does not require moving keyboard focus to the other pane.
  act(() => right.props.onWheel(nativeEvent));
  nodes[1].scrollTop = 189;
  emitScroll(0);
  assert.equal(nodes[1].scrollTop, 189);
  emitScroll(1);
  assert.equal(nodes[0].scrollTop, 108);
  // A key in the still-focused original pane retakes control immediately.
  act(() => left.props.onKeyDown({ ...nativeEvent, key: 'Home' }));
  nodes[0].scrollTop = 0;
  emitScroll(1);
  assert.equal(nodes[0].scrollTop, 0);
  emitScroll(0);
  assert.equal(nodes[1].scrollTop, 0);

  act(() => right.props.onPointerDown(nativeEvent));
  nodes[1].scrollTop = 378;
  emitScroll(1);
  assert.equal(nodes[0].scrollTop, 216);
  act(() => left.props.onFocus(nativeEvent));
  nodes[0].scrollTop = 54;
  emitScroll(0);
  assert.equal(nodes[1].scrollTop, 94.5);
});

test('history prepend preserves the visible row at start, middle and end with stable content, focus target and bounded local data', t => {
  let tree!: ReturnType<typeof create>;
  let nextNode = 0;
  const nodes = [0, 47, 94].map((top, index) => ({
    scrollTop: top,
    clientHeight: 94,
    get scrollHeight() { return tree.root.findAllByType(PrependScrollAnchorDemo)[index].findAllByType('li').length * 47; },
  }));
  act(() => { tree = create(<><PrependScrollAnchorDemo /><PrependScrollAnchorDemo /><PrependScrollAnchorDemo /></>, {
    createNodeMock: element => element.props.role === 'region' ? nodes[nextNode++] : null,
  }); });
  t.after(() => { act(() => tree.unmount()); });
  const demos = tree.root.findAllByType(PrependScrollAnchorDemo);
  const ids = demos.map(demo => demo.findByProps({ role: 'region' }).props.id);
  assert.equal(new Set(ids).size, 3);
  for (const [index, demo] of demos.entries()) {
    const node = nodes[index];
    const startingTop = node.scrollTop;
    const region = demo.findByProps({ role: 'region' });
    const button = demo.findByType('button');
    const initialRows = region.findAllByType('li');
    assert.equal(region.props['aria-label'], '편집 작업 기록');
    assert.equal(region.props.tabIndex, 0);
    assert.equal(region.props.onWheel, undefined);
    assert.equal(region.props.onKeyDown, undefined);
    assert.equal(region.props.onScroll, undefined);
    assert.equal(button.props['aria-controls'], ids[index]);
    assert.equal(button.props['aria-disabled'], false);
    assert.equal(button.props.disabled, undefined);
    assert.deepEqual(initialRows.map(row => row.findByType('time').children.join('')), ['09:40', '09:50', '10:00', '10:10']);
    act(() => button.props.onClick());
    assert.equal(node.scrollTop, startingTop + 94);
    const afterFirst = region.findAllByType('li');
    assert.equal(afterFirst.length, 6);
    assert.ok(initialRows.every((row, rowIndex) => afterFirst[rowIndex + 2] === row));
    act(() => button.props.onClick());
    assert.equal(node.scrollTop, startingTop + 188);
    const afterSecond = region.findAllByType('li');
    assert.equal(afterSecond.length, 8);
    assert.ok(initialRows.every((row, rowIndex) => afterSecond[rowIndex + 4] === row));
    assert.equal(button.props['aria-disabled'], true);
    assert.equal(demo.findByType('button'), button);
    assert.equal(demo.findByProps({ role: 'region' }), region);
    assert.deepEqual(afterSecond.map(row => row.findByType('time').props.dateTime), ['09:00', '09:10', '09:20', '09:30', '09:40', '09:50', '10:00', '10:10'].map(time => `2026-10-18T${time}`));
    act(() => button.props.onClick());
    assert.equal(node.scrollTop, startingTop + 188);
    assert.equal(region.findAllByType('li').length, 8);
    if (index < 2) assert.equal(demos[index + 1].findAllByType('li').length, 4);
  }
});

test('batched earlier-history requests retain the first measured snapshot, clamp overscroll and use actual inserted height', t => {
  let tree!: ReturnType<typeof create>;
  const node = {
    scrollTop: 1000,
    clientHeight: 94,
    // Deliberately different from the scene row height: compensation must use
    // measured content growth, rather than a hardcoded per-click offset.
    get scrollHeight() { return tree.root.findAllByType('li').length * 53; },
  };
  act(() => { tree = create(<PrependScrollAnchorDemo />, { createNodeMock: element => element.props.role === 'region' ? node : null }); });
  t.after(() => { act(() => tree.unmount()); });
  const button = tree.root.findByType('button');
  act(() => { button.props.onClick(); button.props.onClick(); button.props.onClick(); });
  assert.equal(tree.root.findAllByType('li').length, 8);
  assert.equal(node.scrollTop, 4 * 53 - 94 + 4 * 53);
  assert.equal(button.props['aria-disabled'], true);
});

test('virtual notes retain the full extent and original positions while rendering only the rows covering native scroll windows', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><FixedRowVirtualScrollDemo /><FixedRowVirtualScrollDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [first, other] = tree.root.findAllByType(FixedRowVirtualScrollDemo);
  const region = first.findByProps({ role: 'region' });
  const list = first.findByType('ul');
  assert.equal(region.props['aria-label'], '노트 파일 스크롤 목록');
  assert.equal(region.props.tabIndex, 0);
  assert.equal(region.props.onWheel, undefined);
  assert.equal(region.props.onKeyDown, undefined);
  assert.equal(list.props['aria-label'], '노트 파일');
  const initialPositions = Array.from({ length: 27 }, (_, index) => index + 1);
  assert.deepEqual(list.findAllByType('li').map(row => row.props['aria-posinset']), initialPositions);

  const checkWindow = (requestedTop: number) => {
    const source = Object.freeze({ scrollTop: requestedTop, clientHeight: 138 });
    act(() => region.props.onScroll({ currentTarget: source }));
    const rows = list.findAllByType('li');
    const positions = rows.map(row => row.props['aria-posinset']);
    assert.equal(rows.length, 27);
    assert.equal(new Set(positions).size, 27);
    rows.forEach((row, index) => {
      assert.equal(row.props['aria-setsize'], 100);
      assert.equal(row.findByType('span').children.join(''), `노트-${String(positions[index]).padStart(3, '0')}.md`);
      assert.equal(row.findByType('svg').props['aria-hidden'], 'true');
      if (index) assert.equal(positions[index], positions[index - 1] + 1);
    });
    const spacers = region.findAll(node => node.type === 'div' && node.props['aria-hidden'] === 'true');
    assert.equal(spacers.length, 2);
    assert.equal(spacers[0].props.style.height + rows.reduce((sum, row) => sum + row.props.style.height, 0) + spacers[1].props.style.height, 4600);
    const top = Math.max(0, Math.min(4462, requestedTop));
    for (let visible = Math.floor(top / 46); visible < Math.min(100, Math.ceil((top + 138) / 46)); visible++) {
      assert.ok(positions.includes(visible + 1), `missing visible item ${visible + 1} at ${requestedTop}`);
    }
    assert.equal(first.findByProps({ role: 'region' }), region);
    assert.equal(first.findByType('ul'), list);
    assert.deepEqual(other.findAllByType('li').map(row => row.props['aria-posinset']), initialPositions);
  };
  for (const top of [460, 460.5, 2231, 4461.5, 4462, 10000, 0, -20, 4462, 0]) checkWindow(top);
  for (let row = 0; row < 100; row++) {
    checkWindow(row * 46 - .5);
    checkWindow(row * 46);
    checkWindow(row * 46 + .5);
  }
  checkWindow(4462);
  assert.deepEqual(list.findAllByType('li').map(row => row.props['aria-posinset']), Array.from({ length: 27 }, (_, index) => index + 74));
  checkWindow(0);
  assert.equal(first.findAllByType('button').length, 0);
  assert.equal(first.findAllByType('a').length, 0);
});

test('virtual overscan covers the observed native-End drift before the next scroll event, in both directions', async t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<FixedRowVirtualScrollDemo />); });
  t.after(() => { act(() => tree.unmount()); });
  const region = tree.root.findByProps({ role: 'region' });
  const scroll = (top: number) => act(() => region.props.onScroll({ currentTarget: Object.freeze({ scrollTop: top, clientHeight: 138 }) }));
  const assertCovered = (nativeTop: number) => {
    const positions = region.findAllByType('li').map(row => row.props['aria-posinset']);
    for (let row = Math.floor(nativeTop / 46); row < Math.ceil((nativeTop + 138) / 46); row++) {
      assert.ok(positions.includes(row + 1), `native viewport at ${nativeTop} has no rendered item ${row + 1}`);
    }
    assert.equal(positions.length, 27);
  };
  // Root recorded nativeTop3753 with stale rendered rows75..79. Those rows
  // came from a previous scroll sample in3450..3495. Do not emit a new event
  // before checking coverage of the browser's advanced viewport.
  scroll(3470);
  await new Promise<void>(resolve => setImmediate(resolve));
  assertCovered(3753);
  assertCovered(3167);
  scroll(3753);
  assertCovered(3753);
  scroll(2300);
  await new Promise<void>(resolve => setImmediate(resolve));
  assertCovered(2750);
  assertCovered(1850);
  for (const top of [4462, 0, 4462, 0]) {
    scroll(top);
    assertCovered(top);
  }
});

test('stable-gutter checkbox toggles actual short and full file content without replacing native scroll and focus targets', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><StableScrollbarGutterDemo /><StableScrollbarGutterDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [first, other] = tree.root.findAllByType(StableScrollbarGutterDemo);
  const input = first.findByType('input');
  const region = first.findByProps({ role: 'region' });
  const list = region.findByType('ul');
  const firstRows = list.findAllByType('li');
  assert.equal(input.props.type, 'checkbox');
  assert.equal(input.props.checked, false);
  assert.equal(input.props['aria-label'], '전체 파일 목록 표시');
  assert.equal(input.props['aria-controls'], region.props.id);
  assert.notEqual(region.props.id, other.findByProps({ role: 'region' }).props.id);
  assert.equal(first.findByType('label').findByType('input'), input);
  assert.equal(region.props['aria-label'], '정렬을 유지하는 파일 목록');
  assert.equal(region.props.tabIndex, 0);
  assert.deepEqual(firstRows.map(row => row.findByType('span').children.join('')), ['기획서.md', '스케치.svg']);
  for (const checked of [true, false, true, false, true]) {
    act(() => input.props.onChange({
      currentTarget: { checked },
      preventDefault: () => assert.fail('native input must remain uncancelled'),
      stopPropagation: () => assert.fail('page input must remain available'),
    }));
    assert.equal(input.props.checked, checked);
    const rows = list.findAllByType('li');
    assert.equal(rows.length, checked ? 8 : 2);
    assert.equal(rows[0], firstRows[0]);
    assert.equal(rows[1], firstRows[1]);
    assert.equal(first.findByType('input'), input);
    assert.equal(first.findByProps({ role: 'region' }), region);
    assert.equal(region.findByType('ul'), list);
    assert.equal(other.findByType('input').props.checked, false);
    assert.equal(other.findAllByType('li').length, 2);
  }
  assert.deepEqual(list.findAllByType('li').map(row => row.findByType('span').children.join('')), ['기획서.md', '스케치.svg', '팔레트.fig', '일러스트.svg', '브랜드.png', '배포노트.md', '이미지.webp', '스타일.css']);
  assert.ok(list.findAllByType('svg').every(icon => icon.props['aria-hidden'] === 'true'));
  for (const node of first.findAll(() => true)) {
    assert.equal(node.props.onWheel, undefined);
    assert.equal(node.props.onKeyDown, undefined);
    assert.equal(node.props.onScroll, undefined);
  }
  assert.equal(first.findAllByType('button').length, 0);
  assert.equal(first.findAllByType('a').length, 0);
});

test('scroll additions are unique searchable layout entries mapped to their native demos', t => {
  assert.ok(Object.keys(SCROLL_ADDITION_DEMOS).length > 0);
  for (const [id, Demo] of Object.entries(SCROLL_ADDITION_DEMOS)) {
    const entries = TECHNIQUES.filter(item => item.id === id);
    assert.equal(entries.length, 1);
    const entry = entries[0];
    assert.equal(entry.domain, 'layout');
    assert.equal(entry.category, 'scroll');
    assert.ok(matchesSearch(entry, entry.titleEn));
    assert.ok(matchesSearch(entry, entry.vibeKeywords[0]));
    let tree!: ReturnType<typeof create>;
    act(() => { tree = create(<InteractiveDemo techniqueId={id} />); });
    t.after(() => { act(() => tree.unmount()); });
    assert.equal(tree.root.findAllByType(Demo).length, 1);
    const regions = tree.root.findAllByProps({ role: 'region' });
    assert.ok(regions.length > 0);
    assert.ok(regions.every(region => region.props['aria-label'] || region.props['aria-labelledby']));
  }
});
