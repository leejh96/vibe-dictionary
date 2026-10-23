import { COLLECTION_IDS } from './helpers/collection';
import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { TECHNIQUES, matchesSearch } from '@vibe-dictionary/catalog';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';
import { UnderlineTabsDemo, VerticalTabsDemo } from '../src/components/demos/layout/ContentTabsDemos';
import { IndeterminateLinearDemo, CircularSweepDemo } from '../src/components/demos/layout/LoadingDemos';
import { ManualBannerDemo } from '../src/components/demos/layout/ManualBannerDemo';
import { SkeletonContentDemo } from '../src/components/demos/layout/SkeletonContentDemo';
import { ClosableTabsDemo } from '../src/components/demos/layout/ClosableTabsDemo';
import { LocaleProvider, useLocale } from '../src/i18n/LocaleContext';

test('layout language switching preserves closed documents, active panels, carousel position and ready content', t => {
  let switchLocale!: ReturnType<typeof useLocale>['setLocale'];
  function LocaleControls() { switchLocale = useLocale().setLocale; return null; }
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<LocaleProvider initialLocale="ko"><LocaleControls /><ClosableTabsDemo /><VerticalTabsDemo /><UnderlineTabsDemo /><ManualBannerDemo /><SkeletonContentDemo /></LocaleProvider>); });
  t.after(() => { act(() => tree.unmount()); });
  const documentFrame = tree.root.findByProps({ className: 'ld-document-frame' });
  act(() => documentFrame.findByProps({ className: 'ld-document-close' }).props.onClick());
  const remainingDocument = documentFrame.findByProps({ role: 'tab' });
  const documentId = remainingDocument.props.id;
  const otherTabs = tree.root.findAllByProps({ role: 'tab' }).filter(tab => tab !== remainingDocument);
  act(() => { otherTabs[1].props.onClick(); otherTabs[3].props.onClick(); });
  const next = tree.root.findByProps({ 'aria-label': '다음 프로그램' });
  act(() => next.props.onClick());
  const skeletonButton = tree.root.findByProps({ className: 'ld-skeleton-toggle' });
  act(() => skeletonButton.props.onClick());
  act(() => switchLocale('en'));
  assert.equal(documentFrame.findAllByProps({ role: 'tab' }).length, 1);
  assert.equal(remainingDocument.props.id, documentId);
  assert.deepEqual(remainingDocument.children, ['Record']);
  assert.equal(documentFrame.findByProps({ className: 'ld-document-close' }).props['aria-label'], 'Close Record document');
  assert.ok(otherTabs[1].props['aria-selected']);
  assert.ok(otherTabs[3].props['aria-selected']);
  assert.deepEqual(otherTabs[1].children, ['Colors']);
  assert.equal(tree.root.findByProps({ className: 'ld-banner-track' }).props.style.transform, 'translateX(-100%)');
  assert.equal(next.props['aria-label'], 'Next program');
  assert.equal(tree.root.findAllByProps({ className: 'ld-banner-slide' })[1].findByType('strong').children[0], 'Summer performance');
  assert.equal(tree.root.findByProps({ className: 'ld-ready-card' }).props['aria-busy'], false);
  assert.equal(skeletonButton.props['aria-label'], 'Show loading appearance again');
  assert.doesNotMatch(JSON.stringify(tree.toJSON()), /[가-힣]/u);
  act(() => switchLocale('ko'));
  assert.deepEqual(remainingDocument.children, ['기록']);
  assert.ok(otherTabs[1].props['aria-selected']);
  assert.equal(skeletonButton.props['aria-label'], '로딩 모양 다시 보기');
  assert.equal(tree.root.findByProps({ className: 'ld-banner-track' }).props.style.transform, 'translateX(-100%)');
});

test('closable tabs transfer focus to the next or previous document, then restore without affecting another instance', t => {
  let tree!: ReturnType<typeof create>;
  const focused: string[] = [];
  act(() => { tree = create(<><ClosableTabsDemo /><ClosableTabsDemo /></>, { createNodeMock: element => element.type === 'button' ? { focus: () => focused.push(element.props.id ?? 'restore') } : null }); });
  t.after(() => { act(() => tree.unmount()); });
  const frames = tree.root.findAllByProps({ className: 'ld-document-frame' });
  const first = frames[0], other = frames[1];
  assert.equal(focused.length, 0);
  const originalTabs = first.findAllByProps({ role: 'tab' });
  assert.notEqual(originalTabs[0].props.id, other.findAllByProps({ role: 'tab' })[0].props.id);
  assert.equal(originalTabs[0].props['aria-controls'], first.findAllByProps({ role: 'tabpanel' })[0].props.id);
  let prevented = 0;
  const key = (tab: typeof originalTabs[0], value: string) => act(() => tab.props.onKeyDown({ key: value, preventDefault: () => prevented++ }));
  key(originalTabs[0], 'ArrowLeft');
  assert.equal(originalTabs[1].props['aria-selected'], true);
  key(originalTabs[1], 'Delete');
  assert.equal(first.findAllByProps({ role: 'tab' }).length, 1);
  assert.equal(first.findAllByProps({ role: 'tabpanel' }).length, 1);
  assert.equal(focused.at(-1), originalTabs[0].props.id);
  act(() => first.findByProps({ className: 'ld-document-close' }).props.onClick());
  assert.equal(first.findAllByProps({ role: 'tab' }).length, 0);
  assert.equal(focused.at(-1), 'restore');
  act(() => first.findByType('button').props.onClick());
  const restored = first.findAllByProps({ role: 'tab' });
  assert.equal(restored.length, 2);
  assert.equal(focused.at(-1), restored[0].props.id);
  key(restored[0], 'Delete');
  assert.equal(focused.at(-1), restored[1].props.id);
  assert.equal(first.findByProps({ role: 'tab' }).props['aria-selected'], true);
  assert.equal(other.findAllByProps({ role: 'tab' }).length, 2);
  assert.equal(prevented, 3);
});

test('vertical tabs use up and down for selection while leaving horizontal arrows unchanged', t => {
  let tree!: ReturnType<typeof create>;
  const focused: string[] = [];
  act(() => { tree = create(<VerticalTabsDemo />, { createNodeMock: element => element.type === 'button' ? { focus: () => focused.push(element.props.id) } : null }); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findByProps({ role: 'tablist' }).props['aria-orientation'], 'vertical');
  const [first, second] = tree.root.findAllByProps({ role: 'tab' });
  let prevented = 0;
  const key = (tab: typeof first, value: string) => act(() => tab.props.onKeyDown({ key: value, preventDefault: () => prevented++ }));
  key(first, 'ArrowUp');
  assert.equal(second.props['aria-selected'], true);
  assert.equal(focused.at(-1), second.props.id);
  key(second, 'ArrowDown');
  assert.equal(first.props['aria-selected'], true);
  key(first, 'End');
  key(second, 'Home');
  key(first, 'ArrowRight');
  assert.equal(prevented, 4);
  assert.equal(first.props['aria-selected'], true);
});

test('skeleton content changes busy and visibility states while keeping the same region and control', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><SkeletonContentDemo /><SkeletonContentDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [card, other] = tree.root.findAllByProps({ className: 'ld-ready-card' });
  const [button] = tree.root.findAllByType('button');
  const content = card.findByProps({ className: 'ld-ready-content' });
  assert.notEqual(card.props.id, other.props.id);
  assert.equal(button.props['aria-controls'], card.props.id);
  assert.equal(card.props['aria-busy'], true);
  assert.equal(content.props['aria-hidden'], true);
  act(() => button.props.onClick());
  assert.equal(card.props['aria-busy'], false);
  assert.equal(content.props['aria-hidden'], false);
  assert.equal(button.props['aria-label'], '로딩 모양 다시 보기');
  assert.equal(other.props['aria-busy'], true);
  act(() => button.props.onClick());
  assert.equal(card.props['aria-busy'], true);
  assert.equal(content.props['aria-hidden'], true);
  assert.equal(tree.root.findAllByType('button')[0], button);
  assert.equal(tree.root.findAllByProps({ className: 'ld-ready-card' })[0], card);
});

test('manual banner wraps both ways, preserves controls and applies every batched input with isolated slide names', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><ManualBannerDemo /><ManualBannerDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [first, other] = tree.root.findAllByProps({ className: 'ld-banner-frame' });
  const [previous, next] = first.findAllByType('button');
  const slides = first.findAllByProps({ className: 'ld-banner-slide' });
  const active = () => slides.findIndex(slide => slide.props['aria-hidden'] === false);
  assert.equal(active(), 0);
  assert.notEqual(slides[0].props['aria-labelledby'], other.findAllByProps({ className: 'ld-banner-slide' })[0].props['aria-labelledby']);
  assert.equal(slides[0].props['aria-labelledby'], slides[0].findByType('strong').props.id);
  act(() => previous.props.onClick());
  assert.equal(active(), 2);
  act(() => next.props.onClick());
  assert.equal(active(), 0);
  act(() => { next.props.onClick(); next.props.onClick(); next.props.onClick(); });
  assert.equal(active(), 0);
  act(() => next.props.onClick());
  assert.equal(active(), 1);
  assert.equal(first.findAllByProps({ 'data-active': true }).length, 1);
  assert.equal(first.findAllByType('button')[1], next);
  assert.equal(other.findAllByProps({ className: 'ld-banner-slide' })[0].props['aria-hidden'], false);
});

test('indeterminate loaders expose one named loading state without inventing a progress value', t => {
  for (const Demo of [IndeterminateLinearDemo, CircularSweepDemo]) {
    let tree!: ReturnType<typeof create>;
    act(() => { tree = create(<Demo />); });
    t.after(() => { act(() => tree.unmount()); });
    const bar = tree.root.findByProps({ role: 'progressbar' });
    assert.equal(bar.props['aria-label'], '콘텐츠 로딩 중');
    assert.equal(bar.props['aria-valuenow'], undefined);
    assert.ok(tree.root.findAllByProps({ 'aria-hidden': 'true' }).length > 0);
    assert.equal(tree.root.findAllByType('button').length, 0);
  }
});

test('content tabs link isolated panels, wrap keyboard focus and leave vertical arrows to the page', t => {
  let tree!: ReturnType<typeof create>;
  const focused: string[] = [];
  act(() => { tree = create(<><UnderlineTabsDemo /><UnderlineTabsDemo /></>, { createNodeMock: element => element.type === 'button' ? { focus: () => focused.push(element.props.id) } : null }); });
  t.after(() => { act(() => tree.unmount()); });
  const [first, second, other] = tree.root.findAllByProps({ role: 'tab' });
  const panels = tree.root.findAllByProps({ role: 'tabpanel' });
  assert.deepEqual([first.props['aria-selected'], second.props['aria-selected']], [true, false]);
  assert.deepEqual(panels.slice(0, 2).map(panel => panel.props.hidden), [false, true]);
  assert.equal(first.props['aria-controls'], panels[0].props.id);
  assert.equal(panels[1].props['aria-labelledby'], second.props.id);
  assert.notEqual(first.props.id, other.props.id);
  let prevented = 0;
  const key = (node: typeof first, value: string) => act(() => node.props.onKeyDown({ key: value, preventDefault: () => prevented++ }));
  key(first, 'ArrowLeft');
  assert.equal(second.props['aria-selected'], true);
  assert.equal(focused.at(-1), second.props.id);
  key(second, 'ArrowRight');
  assert.equal(first.props['aria-selected'], true);
  key(first, 'End');
  assert.equal(focused.at(-1), second.props.id);
  key(second, 'Home');
  assert.equal(focused.at(-1), first.props.id);
  key(first, 'ArrowDown');
  assert.equal(prevented, 4);
  act(() => second.props.onClick());
  assert.equal(first.props.tabIndex, -1);
  assert.equal(second.props.tabIndex, 0);
  assert.deepEqual(panels.slice(0, 2).map(panel => panel.props.hidden), [true, false]);
  assert.equal(other.props['aria-selected'], true);
});

test('new UI layout techniques have unique searchable metadata, mapped scenes and no helper captions', () => {
  const originals = new Set(['sliding-pill-tabs', 'infinite-marquee', 'skeleton-shimmer', 'spotlight-focus']);
  const additions = TECHNIQUES.filter(item => !COLLECTION_IDS.has(item.id) && item.category === 'layout' && !originals.has(item.id));
  assert.equal(additions.length, 11);
  assert.equal(new Set(TECHNIQUES.map(item => item.id)).size, TECHNIQUES.length);
  for (const item of additions) {
    assert.ok(matchesSearch(item, item.titleKo));
    assert.ok(item.promptSnippet.trim());
    let tree!: ReturnType<typeof create>;
    act(() => { tree = create(<InteractiveDemo techniqueId={item.id} />); });
    assert.notEqual(tree.toJSON(), null);
    assert.equal(tree.root.findAllByType('p').length, 0);
    assert.equal(tree.root.findAllByType('h3').length, 0);
    act(() => tree.unmount());
  }
});
