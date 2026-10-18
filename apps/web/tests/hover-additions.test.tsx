import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { TECHNIQUES, matchesSearch } from '@vibe-dictionary/catalog';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';
import { LocaleProvider, useLocale } from '../src/i18n/LocaleContext';
import { SplitActionDemo, IconExpandDemo, OutlineTraceDemo, RollingLabelDemo, MenuIconMorphDemo, DepthPressDemo, UnderlineTravelDemo, CornerBracketDemo, BorderBeamDemo, LetterStaggerDemo } from '../src/components/demos/hover/HoverDemos';

test('live language switching preserves split selection, open options and pressed icon state', t => {
  let switchLocale!: ReturnType<typeof useLocale>['setLocale'];
  function Controls() { switchLocale = useLocale().setLocale; return null; }
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<LocaleProvider initialLocale="ko"><Controls /><SplitActionDemo /><MenuIconMorphDemo /></LocaleProvider>); });
  t.after(() => { act(() => tree.unmount()); });
  const split = () => tree.root.findByType(SplitActionDemo);
  const toggle = () => split().findByProps({ className: 'hd-button hd-primary split-toggle' });
  const primary = () => split().findByProps({ className: 'hd-button hd-primary' });
  const icon = () => tree.root.findByType(MenuIconMorphDemo).findByType('button');
  act(() => toggle().props.onClick());
  act(() => split().findAllByType('button').at(-1)!.props.onClick());
  act(() => toggle().props.onClick());
  act(() => icon().props.onClick());
  act(() => switchLocale('en'));
  assert.equal(primary().children.join(''), 'Export SVG');
  assert.equal(toggle().props['aria-label'], 'Choose export format');
  assert.equal(toggle().props['aria-expanded'], true);
  assert.equal(icon().props['aria-pressed'], true);
  assert.equal(icon().props['aria-label'], 'Toggle menu icon');
  assert.equal(split().findByProps({ className: 'split-options' }).props['aria-label'], 'Export formats');
  act(() => split().findAllByType('button')[2].props.onClick());
  assert.equal(primary().children.join(''), 'Export PNG');
  assert.equal(toggle().props['aria-expanded'], false);
  act(() => switchLocale('ko'));
  assert.equal(primary().children.join(''), 'PNG 내보내기');
  assert.equal(icon().props['aria-pressed'], true);
  assert.equal(icon().props['aria-label'], '메뉴 아이콘 전환');
});

test('all ten hover additions render English labels and accessible names', () => {
  for (const Demo of [SplitActionDemo, IconExpandDemo, OutlineTraceDemo, RollingLabelDemo, MenuIconMorphDemo, DepthPressDemo, UnderlineTravelDemo, CornerBracketDemo, BorderBeamDemo, LetterStaggerDemo]) {
    let tree!: ReturnType<typeof create>;
    act(() => { tree = create(<LocaleProvider initialLocale="en"><Demo /></LocaleProvider>); });
    assert.doesNotMatch(JSON.stringify(tree.toJSON()), /[가-힣]/u);
    const button = tree.root.findAllByType('button')[0];
    assert.ok(button.props['aria-label'] || button.children.length);
    act(() => tree.unmount());
  }
});

test('menu icon toggles its accessible pressed state in both directions', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<MenuIconMorphDemo />); });
  t.after(() => { act(() => tree.unmount()); });
  const button = () => tree.root.findByType('button');
  assert.equal(button().props['aria-pressed'], false);
  act(() => button().props.onClick());
  assert.equal(button().props['aria-pressed'], true);
  act(() => button().props.onClick());
  assert.equal(button().props['aria-pressed'], false);
});

test('rolling label accessible name includes both visible states', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<RollingLabelDemo />); });
  t.after(() => { act(() => tree.unmount()); });
  const name = tree.root.findByType('button').props['aria-label'];
  for (const line of tree.root.findByProps({ className: 'hd-roll-track' }).findAllByType('span').slice(1)) {
    assert.ok(name.includes(line.children.join('')));
  }
});

test('outline trace normalizes SVG length and keeps the action accessible', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<OutlineTraceDemo />); });
  t.after(() => { act(() => tree.unmount()); });
  assert.equal(tree.root.findByType('rect').props.pathLength, '1');
  for (const svg of tree.root.findAllByType('svg')) assert.equal(svg.props['aria-hidden'], 'true');
});

test('expanding icon keeps an accessible action name while its visual label is collapsed', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<IconExpandDemo />); });
  t.after(() => { act(() => tree.unmount()); });
  const button = tree.root.findByType('button');
  assert.equal(button.props['aria-label'], '프로젝트 열기');
});

test('split action selects the button format, closes and handles dismissal', t => {
  const original = Object.getOwnPropertyDescriptor(globalThis, 'document');
  const listeners = new Map<string, (e: unknown) => void>();
  Object.defineProperty(globalThis, 'document', { configurable: true, value: {
    addEventListener: (name: string, fn: (e: unknown) => void) => listeners.set(name, fn),
    removeEventListener: (name: string) => listeners.delete(name),
  } });
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<SplitActionDemo />); });
  t.after(() => { act(() => tree.unmount()); if (original) Object.defineProperty(globalThis, 'document', original); else Reflect.deleteProperty(globalThis, 'document'); });
  const toggle = () => tree.root.findByProps({ 'aria-label': '내보내기 형식 선택' });
  assert.equal(toggle().findByType('svg').props['aria-hidden'], 'true');
  assert.equal(toggle().findByType('svg').props.focusable, 'false');
  act(() => toggle().props.onClick());
  assert.equal(toggle().props['aria-expanded'], true);
  act(() => tree.root.findAllByType('button').at(-1)!.props.onClick());
  assert.equal(toggle().props['aria-expanded'], false);
  assert.equal(tree.root.findAllByType('button')[0].children.join(''), 'SVG 내보내기');
  act(() => toggle().props.onClick());
  act(() => tree.root.findByProps({ className: 'hover-demo hd-split-demo' }).props.onKeyDown({ key: 'Escape' }));
  assert.equal(toggle().props['aria-expanded'], false);
  act(() => toggle().props.onClick());
  act(() => listeners.get('pointerdown')!({ target: {} }));
  assert.equal(toggle().props['aria-expanded'], false);
  assert.equal(listeners.size, 0);
});

test('added scenes contain only design controls without helper captions or execution counters', () => {
  for (const Demo of [SplitActionDemo, IconExpandDemo, OutlineTraceDemo, RollingLabelDemo, MenuIconMorphDemo, DepthPressDemo, UnderlineTravelDemo, CornerBracketDemo, BorderBeamDemo, LetterStaggerDemo]) {
    let tree!: ReturnType<typeof create>;
    act(() => { tree = create(<Demo />); });
    assert.equal(tree.root.findAllByType('p').length, 0);
    assert.equal(tree.root.findAllByProps({ role: 'status' }).length, 0);
    act(() => tree.unmount());
  }
});

test('added hover techniques are searchable and have unique ids and prompts', () => {
  assert.equal(new Set(TECHNIQUES.map(item => item.id)).size, TECHNIQUES.length);
  const item = TECHNIQUES.find(item => item.id === 'split-action-button')!;
  assert.ok(matchesSearch(item, '분할 버튼'));
  assert.ok(item.promptSnippet.includes('실제 파일 생성이나 다운로드는 하지 않아'));
});

test('hover category adds exactly ten techniques with a rendered demo and searchable prompt metadata', () => {
  const originalIds = new Set(['magnetic-hover', 'shimmer-sweep', 'ripple-click', 'neon-glow-pulse', 'liquid-slide-fill']);
  const additions = TECHNIQUES.filter(item => item.category === 'hover' && !originalIds.has(item.id));
  assert.equal(additions.length, 10);
  for (const item of additions) {
    assert.ok(item.promptSnippet.trim());
    assert.ok(matchesSearch(item, item.titleKo));
    let tree!: ReturnType<typeof create>;
    act(() => { tree = create(<InteractiveDemo techniqueId={item.id} />); });
    assert.notEqual(tree.toJSON(), null, `${item.id} must resolve to a demo`);
    act(() => tree.unmount());
  }
});
