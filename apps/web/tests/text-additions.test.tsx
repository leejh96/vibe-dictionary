import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { RollingNumberDemo } from '../src/components/demos/text/RollingNumberDemo';
import { SplitFlapTextDemo } from '../src/components/demos/text/SplitFlapTextDemo';
import { SearchHighlightDemo } from '../src/components/demos/text/SearchHighlightDemo';
import { DropCapTextDemo, OutlineFillTextDemo, WordMaskHeadlineDemo, CircularTextDemo, ClampedTextDemo, SpoilerTextDemo, StrokeLetteringDemo } from '../src/components/demos/text/TextDemos';
import { LocaleProvider, useLocale } from '../src/i18n/LocaleContext';
import { TECHNIQUES, matchesSearch } from '@vibe-dictionary/catalog';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';

test('English text scenes render localized copy and default literal search matches', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<LocaleProvider initialLocale="en"><DropCapTextDemo /><StrokeLetteringDemo /><SearchHighlightDemo /><SpoilerTextDemo /><ClampedTextDemo /><SplitFlapTextDemo /><CircularTextDemo /><WordMaskHeadlineDemo /><OutlineFillTextDemo /><RollingNumberDemo /></LocaleProvider>); });
  t.after(() => { act(() => tree.unmount()); });
  assert.doesNotMatch(JSON.stringify(tree.toJSON()), /[가-힣]/u);
  assert.equal(tree.root.findByType('input').props.value, 'screen');
  assert.deepEqual(tree.root.findAllByType('mark').map(mark => mark.children.join('')), ['screen', 'screen']);
  assert.equal(tree.root.findByProps({ className: 'td-spoiler-button' }).props['aria-label'], 'Reveal the hidden destination');
  assert.equal(tree.root.findByProps({ className: 'td-clamp-toggle' }).children[0], 'Read more');
  assert.deepEqual(tree.root.findAllByProps({ className: 'td-word-enter' }).map(word => word.children.join('')), ['Small', 'changes', 'complete', 'experiences']);
});

test('live language changes retain text control states, DOM identity and raw search input', t => {
  let tree!: ReturnType<typeof create>;
  let setLocale!: ReturnType<typeof useLocale>['setLocale'];
  function LocaleControl() { setLocale = useLocale().setLocale; return null; }
  act(() => { tree = create(<LocaleProvider initialLocale="ko"><LocaleControl /><SearchHighlightDemo /><SpoilerTextDemo /><ClampedTextDemo /><SplitFlapTextDemo /><CircularTextDemo /><WordMaskHeadlineDemo /><OutlineFillTextDemo /><RollingNumberDemo /></LocaleProvider>); });
  t.after(() => { act(() => tree.unmount()); });
  const byClass = (className: string) => tree.root.findByProps({ className });
  const input = tree.root.findByType('input');
  const spoiler = byClass('td-spoiler-button');
  const clamp = byClass('td-clamp-toggle');
  const flap = byClass('td-flap-button');
  const circular = byClass('td-circle-toggle');
  const headline = byClass('td-headline-button');
  const outline = byClass('td-outline-button');
  act(() => {
    input.props.onChange({ target: { value: '화면 <raw>' } });
    spoiler.props.onClick(); clamp.props.onClick(); flap.props.onClick(); circular.props.onClick(); headline.props.onClick(); outline.props.onClick();
    tree.root.findByProps({ 'aria-label': '숫자 1 늘리기' }).props.onClick();
  });
  const paragraphId = byClass('td-clamp-copy').props.id;
  const svg = byClass('td-circle-type');
  const headlineVisual = byClass('td-headline-visual');
  act(() => setLocale('en'));
  assert.equal(tree.root.findByType('input'), input);
  assert.equal(input.props.value, '화면 <raw>');
  assert.equal(input.props['aria-label'], 'Text to find in the passage');
  assert.equal(tree.root.findAllByType('mark').length, 0);
  assert.equal(byClass('td-spoiler-button'), spoiler);
  assert.equal(spoiler.props['data-revealed'], true);
  assert.equal(spoiler.props['aria-label'], 'Hide Jeju again');
  assert.equal(clamp.props['aria-expanded'], true);
  assert.equal(clamp.children[0], 'Collapse');
  assert.equal(clamp.props['aria-controls'], paragraphId);
  assert.equal(flap.props['aria-label'], 'NOW: switch flap letters');
  assert.equal(byClass('td-circle-type'), svg);
  assert.equal(byClass('td-circle-frame').props['data-paused'], true);
  assert.equal(circular.props['aria-label'], 'Play CREATE EXPLORE circular text');
  assert.equal(byClass('td-headline-visual'), headlineVisual);
  assert.equal(headline.props['aria-label'], 'Replay Small changes complete experiences entrance');
  assert.equal(outline.props['aria-pressed'], true);
  assert.equal(byClass('sr-only').children.join(''), '200');
  act(() => byClass('td-find-clear').props.onClick());
  act(() => setLocale('ko'));
  assert.equal(input.props.value, '');
  assert.equal(byClass('td-find-clear').props.disabled, true);
  assert.equal(flap.props['aria-label'], 'NOW 플랩 글자 전환');
  assert.equal(clamp.props['aria-expanded'], true);
  assert.equal(byClass('sr-only').children.join(''), '200');
});

test('stroke lettering replays its normalized paths while preserving the named control', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<StrokeLetteringDemo />); });
  t.after(() => { act(() => tree.unmount()); });
  const button = tree.root.findByType('button');
  const svg = tree.root.findByType('svg');
  const paths = tree.root.findAllByType('path');
  assert.equal(button.props['aria-label'], 'VIBE 글자 그리기 재생');
  assert.equal(svg.props['aria-hidden'], 'true');
  assert.equal(svg.props.focusable, 'false');
  assert.equal(paths.length, 4);
  assert.ok(paths.every(path => path.props.pathLength === 1));
  assert.deepEqual(paths.map(path => path.props.style.animationDelay), ['0ms', '150ms', '300ms', '450ms']);
  act(() => button.props.onClick());
  assert.notEqual(tree.root.findByType('svg'), svg);
  assert.equal(tree.root.findByType('button'), button);
  const replayed = tree.root.findByType('svg');
  act(() => { button.props.onClick(); button.props.onClick(); });
  assert.notEqual(tree.root.findByType('svg'), replayed);
});

test('search highlight matches literal text, preserves the passage and clears back to its input', t => {
  let tree!: ReturnType<typeof create>;
  let focused = 0;
  act(() => { tree = create(<SearchHighlightDemo />, { createNodeMock: element => element.type === 'input' ? { focus: () => focused++ } : null }); });
  t.after(() => { act(() => tree.unmount()); });
  const input = tree.root.findByType('input');
  const clear = tree.root.findByType('button');
  const marks = () => tree.root.findAllByType('mark').map(mark => mark.children.join(''));
  const passage = () => tree.root.findByType('p').children.map(child => typeof child === 'string' ? child : child.children.join('')).join('');
  const originalText = passage();
  assert.deepEqual(marks(), ['화면', '화면']);
  for (const [query, expected] of [['작은', ['작은']], ['.', ['.', '.']], ['.*', []], ['[', []], ['<img>', []], ['', []]] as const) {
    act(() => input.props.onChange({ target: { value: query } }));
    assert.deepEqual(marks(), expected);
    assert.equal(passage(), originalText);
  }
  assert.equal(clear.props.disabled, true);
  act(() => input.props.onChange({ target: { value: '내용' } }));
  assert.equal(clear.props.disabled, false);
  act(() => clear.props.onClick());
  assert.equal(input.props.value, '');
  assert.equal(focused, 1);
  assert.equal(tree.root.findByType('input'), input);
});

test('spoiler reveals its word in the action name only after activation and isolates instances', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><SpoilerTextDemo /><SpoilerTextDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const buttons = tree.root.findAllByType('button');
  assert.equal(buttons[0].props['aria-label'], '가려진 목적지 보기');
  assert.equal(buttons[0].props['aria-pressed'], undefined);
  assert.equal(buttons[0].findByProps({ className: 'td-spoiler-word' }).props['aria-hidden'], 'true');
  act(() => buttons[0].props.onClick());
  assert.deepEqual(buttons.map(button => button.props['data-revealed']), [true, false]);
  assert.equal(buttons[0].props['aria-label'], '제주도 다시 가리기');
  assert.equal(tree.root.findAllByType('button')[0], buttons[0]);
  act(() => buttons[0].props.onClick());
  assert.equal(buttons[0].props['data-revealed'], false);
  assert.equal(buttons[0].props['aria-label'], '가려진 목적지 보기');
});

test('clamped text preserves the full paragraph and isolates expansion per instance', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><ClampedTextDemo /><ClampedTextDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const buttons = tree.root.findAllByType('button');
  const paragraphs = tree.root.findAllByType('p');
  const originalText = paragraphs[0].children.join('');
  assert.notEqual(paragraphs[0].props.id, paragraphs[1].props.id);
  assert.deepEqual(buttons.map(button => button.props['aria-controls']), paragraphs.map(p => p.props.id));
  assert.deepEqual(buttons.map(button => button.props['aria-expanded']), [false, false]);
  act(() => buttons[0].props.onClick());
  assert.deepEqual(paragraphs.map(p => p.props['data-expanded']), [true, false]);
  assert.equal(buttons[0].props['aria-expanded'], true);
  assert.equal(buttons[0].children[0], '접기');
  assert.equal(paragraphs[0].children.join(''), originalText);
  assert.equal(tree.root.findAllByType('button')[0], buttons[0]);
  act(() => buttons[0].props.onClick());
  assert.equal(paragraphs[0].props['data-expanded'], false);
  assert.equal(buttons[0].props['aria-expanded'], false);
  assert.equal(buttons[0].children[0], '더 보기');
});

test('split flap changes only different letters and cycles words with a stable control', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<SplitFlapTextDemo />); });
  t.after(() => { act(() => tree.unmount()); });
  const button = tree.root.findByType('button');
  const upperFlaps = () => tree.root.findAll(node => node.type === 'span' && node.props.className === 'td-flap-half td-flap-leaf-top');
  const glyphs = (className: string) => tree.root.findAll(node => node.type === 'span' && node.props.className === className).map(face => face.findByProps({ className: 'td-flap-glyph' }).children.join(''));
  assert.equal(button.props['aria-label'], 'NEW 플랩 글자 전환');
  assert.equal(upperFlaps().length, 0);
  act(() => button.props.onClick());
  assert.equal(button.props['aria-label'], 'NOW 플랩 글자 전환');
  assert.equal(upperFlaps().length, 1);
  assert.equal(upperFlaps()[0].findByProps({ className: 'td-flap-glyph' }).children.join(''), 'E');
  assert.deepEqual(glyphs('td-flap-half td-flap-top'), ['N', 'O', 'W']);
  assert.deepEqual(glyphs('td-flap-half td-flap-bottom'), ['N', 'E', 'W']);
  assert.deepEqual(glyphs('td-flap-half td-flap-leaf-bottom'), ['O']);
  const firstFlap = upperFlaps()[0];
  act(() => button.props.onClick());
  assert.equal(button.props['aria-label'], 'YES 플랩 글자 전환');
  assert.equal(upperFlaps().length, 3);
  act(() => button.props.onClick());
  assert.equal(button.props['aria-label'], 'NEW 플랩 글자 전환');
  assert.equal(tree.root.findByType('button'), button);
  assert.ok(tree.root.findAllByProps({ className: 'td-flap-cell' }).every(cell => cell.props['aria-hidden'] === 'true'));
  act(() => button.props.onClick());
  assert.equal(button.props['aria-label'], 'NOW 플랩 글자 전환');
  assert.notEqual(upperFlaps()[0], firstFlap);
});

test('circular text isolates path IDs and pauses the same SVG instead of restarting it', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><CircularTextDemo /><CircularTextDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const paths = tree.root.findAllByType('textPath');
  const ids = tree.root.findAllByType('path').map(path => path.props.id).filter(Boolean);
  assert.equal(new Set(ids).size, 2);
  assert.deepEqual(paths.map(path => path.props.href), ids.map(id => `#${id}`));
  const buttons = tree.root.findAllByType('button');
  const frames = () => tree.root.findAllByProps({ className: 'td-circle-frame' });
  const svg = tree.root.findAllByProps({ className: 'td-circle-type' })[0];
  assert.equal(buttons[0].props['aria-label'], 'CREATE EXPLORE 원형 글자 일시정지');
  act(() => buttons[0].props.onClick());
  assert.deepEqual(frames().map(frame => frame.props['data-paused']), [true, false]);
  assert.equal(buttons[0].props['aria-label'], 'CREATE EXPLORE 원형 글자 재생');
  assert.equal(tree.root.findAllByProps({ className: 'td-circle-type' })[0], svg);
  act(() => buttons[0].props.onClick());
  assert.equal(frames()[0].props['data-paused'], false);
});

test('word headline replays only its visual subtree with stable control and complete accessible content', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<WordMaskHeadlineDemo />); });
  t.after(() => { act(() => tree.unmount()); });
  const button = tree.root.findByType('button');
  const visual = () => tree.root.findByProps({ className: 'td-headline-visual' });
  const first = visual();
  assert.equal(button.props['aria-label'], '작은 변화로 완성하는 경험 등장 재생');
  assert.equal(first.props['aria-hidden'], 'true');
  assert.deepEqual(tree.root.findAllByProps({ className: 'td-word-enter' }).map(word => word.children.join('')), ['작은', '변화로', '완성하는', '경험']);
  assert.deepEqual(tree.root.findAllByProps({ className: 'td-word-enter' }).map(word => word.props.style.animationDelay), ['0ms', '80ms', '160ms', '240ms']);
  act(() => button.props.onClick());
  assert.notEqual(visual(), first);
  assert.equal(tree.root.findByType('button'), button);
});

test('outline fill toggles both ways while preserving its content, name and focusable button', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<OutlineFillTextDemo />); });
  t.after(() => { act(() => tree.unmount()); });
  const button = tree.root.findByType('button');
  const word = tree.root.findByProps({ className: 'td-outline-word' });
  assert.equal(button.props['aria-pressed'], false);
  assert.equal(button.props['aria-label'], 'CREATE 채움 전환');
  assert.equal(word.children.join(''), word.props['data-word']);
  assert.equal(word.props['aria-hidden'], 'true');
  act(() => button.props.onClick());
  assert.equal(button.props['aria-pressed'], true);
  assert.equal(tree.root.findByType('button'), button);
  act(() => button.props.onClick());
  assert.equal(button.props['aria-pressed'], false);
});

test('rolling digits carry and borrow, animate only changed places and guard both bounds', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<RollingNumberDemo />); });
  t.after(() => { act(() => tree.unmount()); });
  const minus = () => tree.root.findByProps({ 'aria-label': '숫자 1 줄이기' });
  const plus = () => tree.root.findByProps({ 'aria-label': '숫자 1 늘리기' });
  const value = () => Number(tree.root.findByProps({ className: 'sr-only' }).children.join(''));
  const pairs = () => tree.root.findAllByProps({ className: 'td-digit-pair' });
  assert.equal(value(), 199);
  act(() => plus().props.onClick());
  assert.equal(value(), 200);
  assert.equal(pairs().length, 3);
  assert.ok(pairs().every(pair => pair.props.style['--digit-direction'] === 1));
  act(() => plus().props.onClick());
  assert.equal(value(), 201);
  assert.equal(pairs().length, 1);
  act(() => minus().props.onClick());
  assert.equal(value(), 200);
  assert.equal(pairs()[0].props.style['--digit-direction'], -1);
  act(() => minus().props.onClick());
  assert.equal(value(), 199);
  assert.equal(pairs().length, 3);
  act(() => { for (let i = 0; i < 250; i++) minus().props.onClick(); });
  assert.equal(value(), 0);
  assert.equal(minus().props['aria-disabled'], true);
  act(() => { for (let i = 0; i < 1050; i++) plus().props.onClick(); });
  assert.equal(value(), 999);
  assert.equal(plus().props['aria-disabled'], true);
});

test('text additions including selection formatting are searchable and mapped without helper captions', () => {
  const originalIds = new Set(['typewriter-streaming', 'scramble-decode-text', 'gradient-flow-text', 'slot-number-ticker', 'marker-highlight-draw']);
  const additions = TECHNIQUES.filter(item => item.category === 'text' && !originalIds.has(item.id));
  assert.equal(additions.length, 11);
  assert.equal(new Set(TECHNIQUES.map(item => item.id)).size, TECHNIQUES.length);
  assert.equal(new Set(additions.map(item => item.promptSnippet)).size, 11);
  const contentParagraphs: Record<string, string> = {
    'selection-bubble-toolbar': 'pd-selection-copy',
    'clamped-read-more-text': 'td-clamp-copy',
    'search-match-highlight': 'td-find-copy',
    'editorial-drop-cap': 'td-dropcap-copy',
  };
  for (const item of additions) {
    assert.ok(item.promptSnippet.trim());
    assert.ok(matchesSearch(item, item.titleKo));
    let tree!: ReturnType<typeof create>;
    act(() => { tree = create(<InteractiveDemo techniqueId={item.id} />); });
    assert.notEqual(tree.toJSON(), null);
    const paragraphs = tree.root.findAllByType('p');
    const contentParagraph = contentParagraphs[item.id];
    assert.equal(paragraphs.length, contentParagraph ? 1 : 0);
    assert.ok(paragraphs.every(p => p.props.className === contentParagraph));
    assert.equal(tree.root.findAllByProps({ role: 'status' }).length, 0);
    act(() => tree.unmount());
  }
});
