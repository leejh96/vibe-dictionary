import assert from 'node:assert/strict';
import test, { type TestContext } from 'node:test';
import React from 'react';
import { act, create, type ReactTestInstance } from 'react-test-renderer';
import { TECHNIQUES, getTechniqueText, searchTechniques } from '@vibe-dictionary/catalog';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';
import { LocaleProvider, useLocale } from '../src/i18n/LocaleContext';

function render(t: TestContext, id: string) {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId={id} />); });
  t.after(() => act(() => tree.unmount()));
  return tree;
}
function text(node: ReactTestInstance): string {
  return node.children.map(child => typeof child === 'string' ? child : text(child)).join('');
}
function click(node: ReactTestInstance) { act(() => node.props.onClick()); }
function check(node: ReactTestInstance, checked: boolean) { act(() => node.props.onChange({ target: { checked } })); }

test('billing updates the equivalent price and actual annual charge together and can switch back', t => {
  const tree = render(t, 'billing-cycle-pricing-card');
  const buttons = tree.root.findAllByType('button');
  assert.match(text(tree.root), /매월 \$20 청구/);
  click(buttons[1]);
  assert.equal(buttons[1].props['aria-pressed'], true);
  assert.equal(text(tree.root.findByProps({ className: 'wf-price' })), '$16/ 월');
  assert.match(text(tree.root), /연 \$192 청구 · 연 \$48 절약/);
  click(buttons[0]);
  assert.match(text(tree.root), /매월 \$20 청구/);
});

test('faceted filters intersect conditions, remove one condition, and reset the complete list', t => {
  const tree = render(t, 'faceted-filter-chips');
  const buttons = tree.root.findAllByType('button');
  const rows = () => tree.root.findAllByProps({ className: 'wf-result' }).map(text);
  assert.equal(buttons[2].props.disabled, true);
  click(buttons[0]); assert.deepEqual(rows(), ['브랜드 기획서', '아이콘 에셋']);
  click(buttons[1]); assert.deepEqual(rows(), ['브랜드 기획서']);
  click(buttons[0]); assert.deepEqual(rows(), ['브랜드 기획서', '사용자 조사']);
  click(buttons[2]); assert.equal(rows().length, 3);
});

test('bulk archive changes only selected rows and clears selection, including empty-list reset', t => {
  const tree = render(t, 'bulk-selection-action-bar');
  const inputs = () => tree.root.findAllByType('input');
  const archive = () => tree.root.findByProps({ className: 'wf-action-bar' }).findByType('button');
  check(inputs()[2], true);
  assert.equal(tree.root.findByProps({ className: 'wf-action-bar' }).findByType('span').children.join(''), '1개 선택');
  click(archive());
  assert.doesNotMatch(text(tree.root), /사용자 조사/);
  assert.match(text(tree.root), /1개 문서를 보관/);
  assert.ok(inputs().every(input => !input.props.checked));
  check(inputs()[0], true); click(archive());
  assert.equal(inputs().length, 1); assert.equal(inputs()[0].props.disabled, true);
  assert.match(text(tree.root), /3개 문서를 보관/);
  click(tree.root.findByProps({ 'aria-label': '문서 초기화' }));
  assert.equal(inputs().length, 4); assert.equal(inputs()[0].props.disabled, false);
});

test('native select-all exposes the mixed state and archive transfers focus to a remaining control', t => {
  let tree!: ReturnType<typeof create>;
  const focused: string[] = [];
  const checkbox = { indeterminate: false, disabled: false, focus: () => focused.push('all') };
  act(() => { tree = create(<InteractiveDemo techniqueId="bulk-selection-action-bar" />, { createNodeMock: element => {
    if (element.props['aria-label'] === '문서 전체 선택') { checkbox.disabled = element.props.disabled; return checkbox; }
    if (element.props['aria-label'] === '문서 초기화') return { focus: () => focused.push('reset') };
    return null;
  } }); });
  t.after(() => act(() => tree.unmount()));
  check(tree.root.findAllByType('input')[1], true);
  assert.equal(checkbox.indeterminate, true);
  click(tree.root.findByProps({ className: 'wf-action-bar' }).findByType('button'));
  assert.equal(checkbox.indeterminate, false);
  assert.equal(focused.at(-1), 'all');
  check(tree.root.findAllByType('input')[0], true);
  click(tree.root.findByProps({ className: 'wf-action-bar' }).findByType('button'));
  assert.equal(focused.at(-1), 'reset');
});

test('undo restores original ordering and only the last deleted item; reset restores every item', t => {
  const tree = render(t, 'undo-delete-snackbar');
  const remove = (name: string) => click(tree.root.findByProps({ 'aria-label': `${name} 삭제` }));
  const undo = () => click(tree.root.findByProps({ className: 'wf-snackbar' }).findByType('button'));
  const rows = () => tree.root.findAllByProps({ className: 'wf-result' }).map(text);
  remove('사용자 조사'); undo();
  assert.deepEqual(rows(), ['브랜드 기획서', '사용자 조사', '아이콘 에셋']);
  remove('브랜드 기획서'); remove('아이콘 에셋'); undo();
  assert.deepEqual(rows(), ['사용자 조사', '아이콘 에셋']);
  assert.equal(tree.root.findAllByProps({ className: 'wf-snackbar' }).length, 0);
  click(tree.root.findByProps({ 'aria-label': '문서 초기화' }));
  assert.deepEqual(rows(), ['브랜드 기획서', '사용자 조사', '아이콘 에셋']);
});

test('onboarding steps work out of order and unchecking a completed step reopens progress', t => {
  const tree = render(t, 'onboarding-progress-checklist');
  const steps = tree.root.findAllByType('button');
  click(steps[2]); assert.equal(tree.root.findByType('progress').props.value, 1);
  click(steps[0]); click(steps[1]);
  assert.equal(tree.root.findByType('progress').props.value, 3);
  assert.match(text(tree.root), /모든 준비를 마쳤어요/);
  click(steps[2]);
  assert.equal(tree.root.findByType('progress').props.value, 2);
  assert.doesNotMatch(text(tree.root), /모든 준비를 마쳤어요/);
});

test('all five workflows are discoverable in Korean and English with localized prompts', () => {
  for (const [id, ko, en] of [
    ['billing-cycle-pricing-card', '결제 주기 토글', 'billing cycle pricing'],
    ['faceted-filter-chips', '필터 칩', 'faceted filter chips'],
    ['bulk-selection-action-bar', '일괄 작업 바', 'bulk selection action bar'],
    ['undo-delete-snackbar', '실행 취소 스낵바', 'undo delete snackbar'],
    ['onboarding-progress-checklist', '온보딩 체크리스트', 'onboarding checklist'],
  ]) {
    const item = TECHNIQUES.find(item => item.id === id)!;
    assert.ok(item);
    for (const query of [ko, en]) assert.equal(searchTechniques({ query })[0]?.item.id, id);
    assert.doesNotMatch(getTechniqueText(item, 'en').promptSnippet, /[가-힣]/);
    assert.notEqual(getTechniqueText(item, 'en').promptSnippet, item.promptSnippet);
  }
});

test('switching language preserves each workflow state and translates its dynamic feedback', t => {
  let changeLocale!: ReturnType<typeof useLocale>['setLocale'];
  function Demos() {
    changeLocale = useLocale().setLocale;
    return <>{['billing-cycle-pricing-card', 'faceted-filter-chips', 'bulk-selection-action-bar', 'undo-delete-snackbar', 'onboarding-progress-checklist'].map(id => <InteractiveDemo key={id} techniqueId={id} />)}</>;
  }
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<LocaleProvider initialLocale="ko"><Demos /></LocaleProvider>); });
  t.after(() => act(() => tree.unmount()));
  const demos = tree.root.findAllByType(InteractiveDemo);
  click(demos[0].findAllByType('button')[1]);
  click(demos[1].findAllByType('button')[0]);
  check(demos[2].findAllByType('input')[1], true);
  click(demos[3].findByProps({ 'aria-label': '사용자 조사 삭제' }));
  click(demos[4].findAllByType('button')[2]);
  act(() => changeLocale('en'));
  assert.match(text(demos[0]), /\$192 billed yearly/);
  assert.match(text(demos[1]), /Results: 2/);
  assert.equal(demos[1].findAllByType('button')[0].props['aria-pressed'], true);
  assert.match(text(demos[2]), /1 selected/);
  assert.equal(demos[2].findAllByType('input')[1].props.checked, true);
  assert.match(text(demos[3]), /User research deleted/);
  assert.match(text(demos[4]), /1\/3 complete/);
  assert.equal(demos[4].findAllByType('button')[2].props['aria-pressed'], true);
});
