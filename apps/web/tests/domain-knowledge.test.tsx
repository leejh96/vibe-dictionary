import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create, type ReactTestInstance } from 'react-test-renderer';
import { DOMAIN_KNOWLEDGE, TECHNIQUES } from '@vibe-dictionary/catalog';
import { DomainKnowledgeView } from '../src/components/DomainKnowledgeView';
import { DictionaryNavigation } from '../src/components/DictionaryNavigation';
import { LocaleProvider, useLocale } from '../src/i18n/LocaleContext';

function text(node: ReactTestInstance | string): string {
  return typeof node === 'string' ? node : node.children.map(child => text(child as ReactTestInstance | string)).join('');
}
function LanguageControl() {
  const { setLocale } = useLocale();
  return <button onClick={() => setLocale('en')}>English</button>;
}

test('dictionary navigation reflects and changes the selected section', () => {
  let selected = '';
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<LocaleProvider initialLocale="ko"><DictionaryNavigation selected="design" onSelect={value => { selected = value; }} /></LocaleProvider>); });
  const buttons = tree.root.findByType('nav').findAllByType('button');
  assert.deepEqual(buttons.map(text), ['도메인 지식', '디자인·인터랙션']);
  assert.equal(buttons[0].props['aria-pressed'], false);
  assert.equal(buttons[1].props['aria-pressed'], true);
  act(() => buttons[0].props.onClick());
  assert.equal(selected, 'knowledge');
  act(() => tree.unmount());
});

test('knowledge search, detail, localization and related design selection', () => {
  const selected: string[] = [];
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<LocaleProvider initialLocale="ko"><LanguageControl /><DomainKnowledgeView onViewTechnique={item => selected.push(item.id)} /></LocaleProvider>); });
  const search = () => tree.root.findByType('input');
  act(() => search().props.onChange({ target: { value: 'education' } }));
  assert.ok(text(tree.root).includes(DOMAIN_KNOWLEDGE[0].text.ko.title));
  act(() => search().props.onChange({ target: { value: 'unknown' } }));
  assert.ok(text(tree.root).includes('검색 결과가 없습니다.'));
  for (const [index, item] of DOMAIN_KNOWLEDGE.entries()) {
    act(() => search().props.onChange({ target: { value: item.text.en.domain } }));
    act(() => tree.root.findAllByType('button').find(button => /내용 살펴보기|View details/.test(text(button)))!.props.onClick());
    if (index === 0) {
      assert.ok(text(tree.root).includes(item.text.ko.questions[0]));
      assert.ok(text(tree.root).includes(item.text.ko.workflow[0].name));
      assert.ok(text(tree.root).includes(item.text.ko.pitfalls[0].description));
    }
    assert.equal(tree.root.findAllByType('a').length, item.sources.length);
    act(() => tree.root.findAllByType('button').find(button => text(button) === 'English')!.props.onClick());
    assert.ok(text(tree.root).includes(item.text.en.title));
    assert.ok(text(tree.root).includes(item.text.en.questions[0]));
    assert.ok(text(tree.root).includes(item.text.en.workflow[0].name));
    assert.ok(text(tree.root).includes(item.text.en.pitfalls[0].description));
    act(() => tree.root.findAllByType('button').find(button => text(button).includes('View design technique'))!.props.onClick());
    assert.equal(selected[index], item.text.en.relatedDesigns[0].id);
    assert.ok(TECHNIQUES.some(technique => technique.id === selected[index]));
    act(() => tree.root.findAllByType('button').find(button => text(button).includes('Domain knowledge list'))!.props.onClick());
    assert.ok(text(tree.root).includes(item.text.en.title));
  }
  act(() => tree.unmount());
});

test('domain list finds service aliases and workflow phrases in either display language', () => {
  for (const locale of ['ko', 'en'] as const) {
    let tree!: ReturnType<typeof create>;
    act(() => { tree = create(<LocaleProvider initialLocale={locale}><DomainKnowledgeView onViewTechnique={() => {}} /></LocaleProvider>); });
    try {
      for (const [query, domain] of [['LMS', '교육'], ['지각 제출', '교육'], ['회원전용', '커뮤니티'], ['report review', '커뮤니티']]) {
        act(() => tree.root.findByType('input').props.onChange({ target: { value: query } }));
        const expected = DOMAIN_KNOWLEDGE.find(item => item.text.ko.domain === domain)!;
        assert.deepEqual(tree.root.findAllByType('h2').map(text), [expected.text[locale].title], query);
      }
      act(() => tree.root.findByType('input').props.onChange({ target: { value: '교육 암호화폐 자동매매' } }));
      assert.equal(tree.root.findAllByType('article').length, 0);
      assert.equal(tree.root.findAllByProps({ role: 'status' }).length, 1);
    } finally { act(() => tree.unmount()); }
  }
});

test('reference prompt copy reports clipboard success and failure', async t => {
  const original = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
  let rejectCopy = false;
  const copied: string[] = [];
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { clipboard: { writeText: async (value: string) => {
    if (rejectCopy) throw new Error('denied');
    copied.push(value);
  } } } });
  t.after(() => { if (original) Object.defineProperty(globalThis, 'navigator', original); else Reflect.deleteProperty(globalThis, 'navigator'); });
  for (const item of DOMAIN_KNOWLEDGE) {
    for (const locale of ['ko', 'en'] as const) {
      let tree!: ReturnType<typeof create>;
      act(() => { tree = create(<LocaleProvider initialLocale={locale}><DomainKnowledgeView onViewTechnique={() => {}} /></LocaleProvider>); });
      try {
        act(() => tree.root.findByType('input').props.onChange({ target: { value: item.text.en.domain } }));
        act(() => tree.root.findAllByType('button').find(button => /내용 살펴보기|View details/.test(text(button)))!.props.onClick());
        rejectCopy = false;
        await act(async () => { await tree.root.findAllByType('button').find(button => /^(프롬프트 복사|Copy prompt)$/.test(text(button)))!.props.onClick(); });
        assert.equal(copied.at(-1), item.text[locale].promptSnippet);
        assert.ok(text(tree.root).includes(locale === 'ko' ? '복사 완료' : 'Copied'));
        rejectCopy = true;
        await act(async () => { await tree.root.findAllByType('button').find(button => /^(복사 완료|Copied)$/.test(text(button)))!.props.onClick(); });
        assert.ok(text(tree.root).includes(locale === 'ko' ? '복사하지 못했습니다.' : 'Could not copy.'));
      } finally { act(() => tree.unmount()); }
    }
  }
});
