import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { TECHNIQUES, matchesSearch } from '@vibe-dictionary/catalog';
import { LocaleProvider, useLocale } from '../src/i18n/LocaleContext';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';
import { WaterfallContributionDemo } from '../src/components/demos/infographic/WaterfallContributionDemo';
import { DumbbellChangeDemo } from '../src/components/demos/infographic/DumbbellChangeDemo';
import { HistogramRebinDemo } from '../src/components/demos/infographic/HistogramRebinDemo';
import { BoxPlotSummaryDemo } from '../src/components/demos/infographic/BoxPlotSummaryDemo';
import { TreemapAreaDemo } from '../src/components/demos/infographic/TreemapAreaDemo';
import { ScatterplotCoordinateDemo } from '../src/components/demos/infographic/ScatterplotCoordinateDemo';
import { PercentStackedCompositionDemo } from '../src/components/demos/infographic/PercentStackedCompositionDemo';
import { TimeSeriesLineDemo } from '../src/components/demos/infographic/TimeSeriesLineDemo';
import { SankeyFlowDemo } from '../src/components/demos/infographic/SankeyFlowDemo';
import { RadarProfileDemo } from '../src/components/demos/infographic/RadarProfileDemo';

test('waterfall shows continuous positive and negative contributions and anchors the net total at zero', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'vd-waterfall-contribution-reveal');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'infographic');
  assert.equal(item.titleKo, '워터폴 증감 누적 리빌');
  assert.equal(item.titleEn, 'Waterfall Contribution Reveal');
  for (const term of ['워터폴 차트', 'waterfall', '브리지 차트', '누적 증감']) assert.ok(matchesSearch(item, term));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={item.id} />); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(WaterfallContributionDemo).length, 1);
  const chart = tree.root.findByProps({ role: 'img' });
  assert.equal(chart.props['aria-label'], '워터폴 차트: 시작 80, 유입 +40, 비용 −30, 합계 90');
  const columns = tree.root.findAllByProps({ className: 'ig-waterfall-column' });
  const values = columns.map(column => Number(column.findByProps({ className: 'ig-waterfall-value' }).children.join('').replace('−', '-')));
  assert.equal(values[0] + values[1] + values[2], values[3]);
  const intervals = columns.map(column => {
    const bar = column.find(node => typeof node.props.className === 'string' && node.props.className.startsWith('ig-waterfall-bar '));
    const low = parseFloat(bar.props.style.bottom) * 1.2;
    return [low, low + parseFloat(bar.props.style.height) * 1.2];
  });
  const close = (actual: number, expected: number) => assert.ok(Math.abs(actual - expected) < .0001, `${actual} should equal ${expected}`);
  close(intervals[0][0], 0);
  close(intervals[1][0], intervals[0][1]);
  close(intervals[2][1], intervals[1][1]);
  close(intervals[3][0], 0);
  close(intervals[3][1], intervals[2][0]);
  close(intervals[3][1], values[3]);
  const connectors = tree.root.findAllByProps({ className: 'ig-waterfall-connector' });
  [80, 120, 90].forEach((total, index) => close(parseFloat(connectors[index].props.style.bottom) * 1.2, total));
  assert.deepEqual(columns.map(column => column.findByProps({ className: 'ig-waterfall-label' }).children.join('')), ['시작', '유입', '비용', '합계']);
  assert.equal(tree.root.findAllByType('button').length, 0);
});

test('histogram reassigns every raw sample into wider intervals without losing the upper boundary', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'vd-histogram-rebin-transition');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'infographic');
  assert.equal(item.titleKo, '히스토그램 구간 재집계');
  assert.equal(item.titleEn, 'Histogram Rebin Transition');
  for (const term of ['히스토그램', 'histogram', '구간 폭', '도수 분포']) assert.ok(matchesSearch(item, term));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={item.id} /><HistogramRebinDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const demos = tree.root.findAllByType(HistogramRebinDemo);
  assert.equal(demos.length, 2);
  const [chart, otherChart] = demos.map(demo => demo.findByProps({ role: 'img' }));
  assert.notEqual(chart.props.id, otherChart.props.id);
  const select = demos[0].findByType('select');
  assert.equal(select.props['aria-controls'], chart.props.id);
  assert.equal(demos[0].findByType('label').props.htmlFor, select.props.id);
  const read = () => demos[0].findAllByProps({ className: 'ig-histogram-bar' }).map(bar => {
    const count = Number(bar.find(node => node.type === 'span' && typeof node.children[0] === 'string').children.join(''));
    assert.ok(Math.abs(parseFloat(bar.props.style.height) * .12 - count) < .0001);
    return count;
  });
  assert.deepEqual(read(), [2, 4, 5, 5]);
  const initialBar = demos[0].findAllByProps({ className: 'ig-histogram-bar' })[0];
  act(() => select.props.onChange({ target: { value: '20' } }));
  assert.deepEqual(read(), [6, 10]);
  assert.equal(read().reduce((sum, count) => sum + count, 0), 16);
  assert.match(chart.props['aria-label'], /20 이상 40 이하 10개/);
  assert.deepEqual(demos[0].findByProps({ className: 'ig-histogram-value-axis' }).findAllByType('span').map(tick => tick.children.join('')), ['0', '20', '40']);
  assert.equal(demos[0].findAllByProps({ className: 'ig-histogram-bar' })[0], initialBar);
  assert.equal(demos[0].findByType('select'), select);
  assert.match(otherChart.props['aria-label'], /구간 폭 10/);
  act(() => select.props.onChange({ target: { value: '10' } }));
  assert.deepEqual(read(), [2, 4, 5, 5]);
  assert.equal(tree.root.findAllByType('button').length, 0);
});

test('dumbbell comparison keeps previous/current identity and joins both increasing and decreasing endpoint pairs', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'vd-dumbbell-paired-change');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'infographic');
  assert.equal(item.titleKo, '덤벨 쌍점 변화 모션');
  assert.equal(item.titleEn, 'Dumbbell Paired Change');
  for (const term of ['덤벨 차트', 'dumbbell', '이전 이후 비교']) assert.ok(matchesSearch(item, term));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={item.id} />); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(DumbbellChangeDemo).length, 1);
  assert.match(tree.root.findByProps({ role: 'img' }).props['aria-label'], /남부 이전 70 이후 40/);
  const rows = tree.root.findAllByProps({ className: 'ig-dumbbell-row' });
  assert.equal(rows.length, 3);
  let increases = 0;
  let decreases = 0;
  for (const row of rows) {
    const track = row.findByProps({ className: 'ig-dumbbell-track' });
    const before = Number(row.findByProps({ className: 'ig-dumbbell-before' }).find(node => node.type === 'span' && typeof node.children[0] === 'string').children.join(''));
    const after = Number(row.findByProps({ className: 'ig-dumbbell-after' }).find(node => node.type === 'span' && typeof node.children[0] === 'string').children.join(''));
    assert.equal(parseFloat(track.props.style['--ig-before']), before);
    assert.equal(parseFloat(track.props.style['--ig-after']), after);
    const link = row.findByProps({ className: 'ig-dumbbell-link' });
    const start = parseFloat(link.props.style.left);
    const end = start + parseFloat(link.props.style.width);
    assert.deepEqual([start, end].sort((a, b) => a - b), [before, after].sort((a, b) => a - b));
    assert.equal(link.props.style.transformOrigin, after > before ? 'left center' : 'right center');
    if (after > before) increases++; else decreases++;
  }
  assert.ok(increases > 0 && decreases > 0);
  assert.equal(tree.root.findAllByType('button').length, 0);
});

test('box plot encodes ordered five-number statistics with a quartile box, median and min-max whiskers', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'vd-boxplot-five-number-reveal');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'infographic');
  assert.equal(item.titleKo, '상자 수염 다섯 수치 리빌');
  assert.equal(item.titleEn, 'Box Plot Five-Number Reveal');
  for (const term of ['박스플롯', 'box plot', '상자 수염', '사분위수']) assert.ok(matchesSearch(item, term));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={item.id} />); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(BoxPlotSummaryDemo).length, 1);
  assert.match(tree.root.findByProps({ role: 'img' }).props['aria-label'], /수염은 최솟값과 최댓값을 연결/);
  const statistics = tree.root.findAllByProps({ className: 'ig-boxplot-statistic' }).map(node => {
    const values = node.findAll(node => node.type === 'span' && typeof node.children[0] === 'string').map(value => value.children.join(''));
    const number = Number(values[1]);
    assert.equal(parseFloat(node.props.style.bottom), number);
    return [values[0], number] as const;
  });
  assert.deepEqual(statistics, [['최대', 90], ['Q3', 75], ['중앙', 50], ['Q1', 25], ['최소', 10]]);
  const summary = Object.fromEntries(statistics);
  assert.ok(summary['최소'] < summary.Q1 && summary.Q1 < summary['중앙'] && summary['중앙'] < summary.Q3 && summary.Q3 < summary['최대']);
  const whisker = tree.root.findByProps({ className: 'ig-boxplot-whisker' }).props.style;
  const box = tree.root.findByProps({ className: 'ig-boxplot-box' }).props.style;
  assert.equal(parseFloat(whisker.bottom), summary['최소']);
  assert.equal(parseFloat(whisker.bottom) + parseFloat(whisker.height), summary['최대']);
  assert.equal(parseFloat(box.bottom), summary.Q1);
  assert.equal(parseFloat(box.bottom) + parseFloat(box.height), summary.Q3);
  assert.equal(parseFloat(tree.root.findByProps({ className: 'ig-boxplot-median' }).props.style.bottom), summary['중앙']);
  assert.equal(tree.root.findAllByType('button').length, 0);
  assert.equal(tree.root.findAllByType('input').length, 0);
});

test('treemap leaf areas encode their share of the whole while parent headings preserve hierarchy', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'vd-treemap-hierarchy-area');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'infographic');
  assert.equal(item.titleKo, '트리맵 계층 면적 리빌');
  assert.equal(item.titleEn, 'Treemap Hierarchy Area Reveal');
  for (const term of ['트리맵', 'treemap', '계층 면적']) assert.ok(matchesSearch(item, term));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={item.id} />); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(TreemapAreaDemo).length, 1);
  assert.match(tree.root.findByProps({ role: 'img' }).props['aria-label'], /제품 60, 웹 40, 앱 20; 지원 40, 문서 25, 도구 15/);
  const groups = tree.root.findAllByProps({ className: 'ig-treemap-group' });
  const areas: number[] = [];
  const values: number[] = [];
  for (const group of groups) {
    const width = parseFloat(group.props.style.width) / 100;
    const heading = group.findByProps({ className: 'ig-treemap-heading' });
    const subtotal = Number(heading.findAllByType('span')[1].children.join(''));
    const leaves = group.findAllByProps({ className: 'ig-treemap-leaf' });
    const counts = leaves.map(leaf => Number(leaf.findAllByType('span')[1].children.join('')));
    assert.equal(counts.reduce((sum, value) => sum + value, 0), subtotal);
    leaves.forEach((leaf, index) => {
      areas.push(width * parseFloat(leaf.props.style.height) / 100);
      values.push(counts[index]);
    });
  }
  assert.deepEqual(values, [40, 20, 25, 15]);
  const total = values.reduce((sum, value) => sum + value, 0);
  areas.forEach((area, index) => assert.ok(Math.abs(area - values[index] / total) < .000001));
  assert.ok(Math.abs(areas.reduce((sum, value) => sum + value, 0) - 1) < .000001);
  assert.equal(tree.root.findAllByType('button').length, 0);
});

test('scatterplot maps two independent numeric variables onto continuous axes without inventing a line', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'vd-scatterplot-coordinate-reveal');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'infographic');
  assert.equal(item.titleKo, '산점도 좌표 리빌');
  for (const term of ['산점도', 'scatterplot', 'scatter plot', '두 변수']) assert.ok(matchesSearch(item, term));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={item.id} />); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(ScatterplotCoordinateDemo).length, 1);
  const chart = tree.root.findByProps({ role: 'img' });
  const samples = [ ['A', 5, 20], ['B', 15, 55], ['C', 25, 35], ['D', 35, 75], ['E', 45, 50], ['F', 55, 90] ] as const;
  const points = tree.root.findAllByProps({ className: 'ig-scatterplot-point' });
  assert.equal(points.length, samples.length);
  points.forEach((point, index) => {
    const [label, minutes, score] = samples[index];
    assert.equal(point.find(node => node.type === 'span' && typeof node.children[0] === 'string').children.join(''), label);
    assert.ok(Math.abs(parseFloat(point.props.style.left) / 100 * 60 - minutes) < .000001);
    assert.equal(parseFloat(point.props.style.bottom), score);
    assert.ok(chart.props['aria-label'].includes(`${label} ${minutes}분 ${score}점`));
    assert.equal(point.findAllByType('i').length, 1);
  });
  assert.match(chart.props['aria-label'], /자체 예시/);
  assert.deepEqual(tree.root.findByProps({ className: 'ig-scatterplot-y-axis' }).children.map(node => typeof node === 'string' ? node : node.children.join('')), ['100', '50', '0']);
  assert.deepEqual(tree.root.findByProps({ className: 'ig-scatterplot-x-axis' }).children.map(node => typeof node === 'string' ? node : node.children.join('')), ['0', '30', '60']);
  assert.equal(tree.root.findByProps({ className: 'ig-scatterplot-y-title' }).children.join(''), '점수');
  assert.equal(tree.root.findByProps({ className: 'ig-scatterplot-x-title' }).children.join(''), '학습 시간(분)');
  assert.equal(tree.root.findAllByType('button').length, 0);
  assert.equal(tree.root.findAllByType('input').length, 0);
  assert.equal(tree.root.findAllByType('svg').length, 0);
});

test('percent stacks normalize distinct totals and preserve category order with complete 100 percent rows', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'vd-percent-stacked-composition');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'infographic');
  for (const term of ['100% 누적 막대', 'percent stacked bar', '구성비', '정규화 차트']) assert.ok(matchesSearch(item, term));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={item.id} />); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(PercentStackedCompositionDemo).length, 1);
  const chart = tree.root.findByProps({ role: 'img' });
  assert.match(chart.props['aria-label'], /자체 유입 경로 예시/);
  const input = [[60, 100, 40], [160, 140, 100], [60, 135, 105]];
  const rows = tree.root.findAllByProps({ className: 'ig-percent-stack-row' });
  assert.equal(rows.length, input.length);
  rows.forEach((row, month) => {
    const total = input[month].reduce((sum, count) => sum + count, 0);
    assert.ok(chart.props['aria-label'].includes(`${month + 1}월 전체 ${total}건`));
    const segments = row.findAll(node => typeof node.props.className === 'string' && node.props.className.startsWith('ig-percent-stack-segment '));
    assert.equal(segments.length, 3);
    let width = 0;
    segments.forEach((segment, channel) => {
      const percent = parseFloat(segment.props.style.width);
      width += percent;
      assert.equal(percent / 100 * total, input[month][channel]);
      assert.equal(segment.children[0].children.join(''), `${percent}%`);
      assert.equal(segment.props.className, `ig-percent-stack-segment ig-percent-stack-tone-${channel}`);
    });
    assert.equal(width, 100);
  });
  const legend = tree.root.findByProps({ className: 'ig-percent-stack-legend' });
  assert.deepEqual(legend.findAllByType('i').map(swatch => swatch.props.className), ['ig-percent-stack-tone-0', 'ig-percent-stack-tone-1', 'ig-percent-stack-tone-2']);
  assert.deepEqual(tree.root.findByProps({ className: 'ig-percent-stack-axis' }).findAllByType('span').map(tick => tick.children.join('')), ['0', '50', '100%']);
  assert.equal(tree.root.findAllByType('button').length, 0);
  assert.equal(tree.root.findAllByType('input').length, 0);
});

test('time series preserves unequal elapsed-time intervals and joins the exact measured values in order', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'vd-time-series-line-draw');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'infographic');
  for (const term of ['시계열', '꺾은선 차트', 'time series', 'line chart']) assert.ok(matchesSearch(item, term));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={item.id} />); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(TimeSeriesLineDemo).length, 1);
  const chart = tree.root.findByProps({ role: 'img' });
  assert.match(chart.props['aria-label'], /자체 예시/);
  const minutes = [540, 600, 720, 900];
  const values = [20, 60, 35, 85];
  const points = tree.root.findAllByProps({ className: 'ig-time-line-point' });
  assert.equal(points.length, minutes.length);
  const path = tree.root.findByType('path');
  const coordinates = [...path.props.d.matchAll(/[ML]([\d.]+) ([\d.]+)/g)].map(match => [Number(match[1]), Number(match[2])]);
  assert.equal(coordinates.length, minutes.length);
  points.forEach((point, index) => {
    const x = parseFloat(point.props.style.left);
    const y = parseFloat(point.props.style.bottom);
    assert.ok(Math.abs(x / 100 * 360 + 540 - minutes[index]) < .000001);
    assert.equal(y, values[index]);
    assert.deepEqual(coordinates[index], [x, 100 - y]);
    assert.equal(point.find(node => node.type === 'span' && typeof node.children[0] === 'string').children.join(''), String(values[index]));
  });
  assert.equal(path.props.pathLength, undefined);
  assert.equal(path.props.strokeDasharray, 'none');
  assert.equal(path.props.vectorEffect, 'non-scaling-stroke');
  assert.equal(path.props.fill, 'none');
  assert.equal(tree.root.findByType('svg').props.preserveAspectRatio, 'none');
  assert.deepEqual(tree.root.findByProps({ className: 'ig-time-line-x-axis' }).findAllByType('span').map(tick => tick.children.join('')), ['09시', '12시', '15시']);
  assert.equal(tree.root.findAllByType('button').length, 0);
  assert.equal(tree.root.findAllByType('input').length, 0);
});

test('sankey weighted ribbons conserve source and destination totals with contiguous noncrossing allocations', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'vd-sankey-flow-conservation');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'infographic');
  for (const term of ['생키 차트', 'sankey', '샌키 다이어그램', '수량 보존']) assert.ok(matchesSearch(item, term));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={item.id} />); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(SankeyFlowDemo).length, 1);
  const close = (actual: number, expected: number) => assert.ok(Math.abs(actual - expected) < .000001, `${actual} should equal ${expected}`);
  const chart = tree.root.findByProps({ role: 'img' });
  assert.match(chart.props['aria-label'], /자체 예시/);
  const expected = [{ from: '웹', to: '구매', value: 40 }, { from: '웹', to: '보류', value: 20 }, { from: '앱', to: '보류', value: 10 }, { from: '앱', to: '이탈', value: 30 }];
  const ribbons = tree.root.findAllByType('path').map((path, index) => {
    const n = path.props.d.match(/[\d.]+/g).map(Number);
    const result = { ...expected[index], sourceTop: n[1], targetTop: n[7], targetBottom: n[9], sourceBottom: n[15] };
    assert.deepEqual([n[3], n[5], n[11], n[13]], [result.sourceTop, result.targetTop, result.targetBottom, result.sourceBottom]);
    close(result.sourceBottom - result.sourceTop, result.value * 1.12);
    close(result.targetBottom - result.targetTop, result.value * 1.12);
    assert.ok(chart.props['aria-label'].includes(`${result.from}에서 ${result.to} ${result.value}건`));
    return result;
  });
  assert.equal(ribbons.length, expected.length);
  for (const t of [0, .1, .25, .5, .75, .9, 1]) {
    const progress = 3 * t * t - 2 * t * t * t;
    let previousBottom = 0;
    for (const flow of ribbons) {
      const top = flow.sourceTop + (flow.targetTop - flow.sourceTop) * progress;
      const bottom = flow.sourceBottom + (flow.targetBottom - flow.sourceBottom) * progress;
      close(bottom - top, flow.value * 1.12);
      assert.ok(top >= previousBottom - .000001, 'ribbons must not cross at intermediate curve positions');
      previousBottom = bottom;
    }
  }
  const nodes = tree.root.findAllByType('rect');
  [['웹', '앱'], ['구매', '보류', '이탈']].forEach((labels, side) => labels.forEach((label, index) => {
    const node = nodes[(side === 0 ? 0 : 2) + index];
    const flows = ribbons.filter(flow => (side === 0 ? flow.from : flow.to) === label);
    const total = flows.reduce((sum, flow) => sum + flow.value, 0);
    close(node.props.height, total * 1.12);
    let cursor = node.props.y;
    flows.forEach(flow => {
      close(side === 0 ? flow.sourceTop : flow.targetTop, cursor);
      cursor = side === 0 ? flow.sourceBottom : flow.targetBottom;
    });
    close(cursor, node.props.y + node.props.height);
  }));
  const labels = tree.root.findAllByProps({ className: 'ig-sankey-value' });
  assert.deepEqual(labels.map(label => Number(label.children.join(''))), [40, 20, 10, 30]);
  labels.forEach((label, index) => close(parseFloat(label.props.style.top), (ribbons[index].sourceTop + ribbons[index].targetBottom) / 2));
  labels.forEach((label, index) => {
    const center = parseFloat(label.props.style.top);
    assert.ok(center >= 8 && center <= 128);
    if (index > 0) assert.ok(center - parseFloat(labels[index - 1].props.style.top) >= 16);
  });
  assert.equal(tree.root.findAllByType('button').length, 0);
  assert.equal(tree.root.findAllByType('input').length, 0);
});

test('radar profile encodes each labeled score as distance on five equally angled common-scale axes', t => {
  const entries = TECHNIQUES.filter(item => item.id === 'vd-radar-profile-reveal');
  assert.equal(entries.length, 1);
  const item = entries[0];
  assert.equal(item.domain, 'video');
  assert.equal(item.category, 'infographic');
  for (const term of ['레이더 차트', 'radar chart', '스파이더 차트', '공통 척도']) assert.ok(matchesSearch(item, term));
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={item.id} />); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findAllByType(RadarProfileDemo).length, 1);
  const close = (actual: number, expected: number) => assert.ok(Math.abs(actual - expected) < .000001, `${actual} should equal ${expected}`);
  const chart = tree.root.findByProps({ role: 'img' });
  assert.match(chart.props['aria-label'], /자체 예시 점수/);
  assert.match(chart.props['aria-label'], /면적은 종합 점수를 뜻하지 않음/);
  const scores = [80, 60, 90, 70, 50];
  const labels = ['속도', '품질', '편의', '효율', '지원'];
  const markers = tree.root.findAllByType('circle');
  const spokes = tree.root.findAllByType('line');
  assert.equal(markers.length, 5);
  assert.equal(spokes.length, 5);
  const vertices = tree.root.findByProps({ className: 'ig-radar-profile-shape' }).props.points.split(' ').map((pair: string) => pair.split(',').map(Number));
  markers.forEach((marker, index) => {
    const dx = marker.props.cx - 68;
    const dy = marker.props.cy - 68;
    close(Math.hypot(dx, dy) / 50 * 100, scores[index]);
    const angle = -Math.PI / 2 + index * Math.PI * 2 / 5;
    close(dx / Math.hypot(dx, dy), Math.cos(angle));
    close(dy / Math.hypot(dx, dy), Math.sin(angle));
    assert.deepEqual(vertices[index], [marker.props.cx, marker.props.cy]);
    close(spokes[index].props.x2 - 68, dx / scores[index] * 100);
    close(spokes[index].props.y2 - 68, dy / scores[index] * 100);
    assert.ok(chart.props['aria-label'].includes(`${labels[index]} ${scores[index]}`));
  });
  const rings = tree.root.findAllByType('polygon').slice(0, 2);
  rings.forEach((ring, index) => ring.props.points.split(' ').forEach((pair: string) => {
    const [x, y] = pair.split(',').map(Number);
    close(Math.hypot(x - 68, y - 68), (index + 1) * 25);
  }));
  assert.deepEqual(tree.root.findAllByProps({ className: 'ig-radar-profile-value' }).map(value => Number(value.children.join(''))), scores);
  assert.deepEqual(tree.root.findAllByProps({ className: 'ig-radar-profile-tick' }).map(tick => Number(tick.children.join(''))), [0, 50, 100]);
  assert.equal(tree.root.findAllByType('button').length, 0);
  assert.equal(tree.root.findAllByType('input').length, 0);
});


test('infographic labels and accessible data switch live while selected histogram width and chart geometry survive', t => {
  let setLocale!: ReturnType<typeof useLocale>['setLocale'];
  function LanguageControl() {
    setLocale = useLocale().setLocale;
    return null;
  }
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<LocaleProvider initialLocale="ko"><LanguageControl />
    <WaterfallContributionDemo /><DumbbellChangeDemo /><HistogramRebinDemo /><BoxPlotSummaryDemo />
    <TreemapAreaDemo /><ScatterplotCoordinateDemo /><PercentStackedCompositionDemo /><TimeSeriesLineDemo />
    <SankeyFlowDemo /><RadarProfileDemo />
  </LocaleProvider>); });
  t.after(() => { act(() => tree.unmount()); });
  const select = tree.root.findByType('select');
  const chartId = select.props['aria-controls'];
  const controlId = select.props.id;
  act(() => select.props.onChange({ target: { value: '20' } }));
  const geometry = () => tree.root.findAll(node => typeof node.type === 'string' &&
    (node.props.style || ['path', 'circle', 'polygon', 'line', 'rect'].includes(node.type)))
    .map(node => ({ type: node.type, style: node.props.style, d: node.props.d, points: node.props.points,
      cx: node.props.cx, cy: node.props.cy, r: node.props.r, x: node.props.x, y: node.props.y,
      height: node.props.height, width: node.props.width, x1: node.props.x1, x2: node.props.x2,
      y1: node.props.y1, y2: node.props.y2 }));
  const beforeGeometry = geometry();
  const beforeDescriptions = tree.root.findAllByProps({ role: 'img' }).map(node => node.props['aria-label']);
  assert.equal(beforeDescriptions.length, 10);
  assert.ok(beforeDescriptions.every(label => /[가-힣]/u.test(label)));
  act(() => setLocale('en'));
  assert.doesNotMatch(JSON.stringify(tree.toJSON()), /[가-힣ㄱ-ㅎㅏ-ㅣ]/u);
  assert.deepEqual(geometry(), beforeGeometry);
  assert.equal(tree.root.findByType('select').props.value, 20);
  assert.equal(tree.root.findByType('select').props.id, controlId);
  assert.equal(tree.root.findByType('select').props['aria-controls'], chartId);
  assert.equal(tree.root.findByProps({ htmlFor: controlId }).findByType('span').children.join(''), 'Bin size');
  const histogram = tree.root.findByProps({ id: chartId });
  assert.match(histogram.props['aria-label'], /bin width 20, value range 0 to 40/);
  assert.match(histogram.props['aria-label'], /0 inclusive to 20 exclusive: 6 samples/);
  assert.match(histogram.props['aria-label'], /20 inclusive to 40 inclusive: 10 samples/);
  assert.deepEqual(tree.root.findAllByProps({ className: 'ig-waterfall-label' }).map(node => node.children.join('')), ['Start', 'Inflow', 'Cost', 'Total']);
  assert.match(tree.root.findByProps({ className: 'ig-radar-profile' }).props['aria-label'], /Speed 80, Quality 60, Ease 90, Efficiency 70, Support 50/);
  assert.match(tree.root.findByProps({ className: 'ig-sankey' }).props['aria-label'], /Web to Buy 40 visits, Web to Hold 20 visits, App to Hold 10 visits, App to Exit 30 visits/);
  act(() => setLocale('ko'));
  assert.deepEqual(tree.root.findAllByProps({ role: 'img' }).map(node => node.props['aria-label']), beforeDescriptions);
  assert.deepEqual(geometry(), beforeGeometry);
  assert.equal(tree.root.findByType('select').props.value, 20);
});
