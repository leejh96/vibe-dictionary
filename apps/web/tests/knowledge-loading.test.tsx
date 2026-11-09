import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { DOMAIN_KNOWLEDGE } from '@vibe-dictionary/catalog';
import { KnowledgeLoadBoundary, LazyDomainKnowledgeView } from '../src/components/LazyDomainKnowledgeView';
import { useDomainKnowledgeSearch } from '../src/hooks/useDomainKnowledgeSearch';
import { LocaleProvider } from '../src/i18n/LocaleContext';

test('knowledge view shows loading before resolving the complete catalog', async () => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<LazyDomainKnowledgeView onViewTechnique={() => {}} />); });
  try {
    assert.match(tree.root.findByProps({ role: 'status' }).children.join(''), /불러오는 중/);
    await act(async () => { await import('../src/components/DomainKnowledgeView'); });
    assert.equal(tree.root.findAllByType('article').length, DOMAIN_KNOWLEDGE.length);
  } finally { act(() => tree.unmount()); }
});

test('knowledge load failure offers localized feedback and page reload', t => {
  const original = Object.getOwnPropertyDescriptor(globalThis, 'window');
  let reloads = 0;
  Object.defineProperty(globalThis, 'window', { configurable: true, value: { location: { reload: () => { reloads++; } } } });
  t.after(() => { if (original) Object.defineProperty(globalThis, 'window', original); else Reflect.deleteProperty(globalThis, 'window'); });
  t.mock.method(console, 'error', () => {});
  function Failure(): React.ReactNode { throw new Error('chunk unavailable'); }
  for (const locale of ['ko', 'en'] as const) {
    let tree!: ReturnType<typeof create>;
    act(() => { tree = create(<LocaleProvider initialLocale={locale}><KnowledgeLoadBoundary><Failure /></KnowledgeLoadBoundary></LocaleProvider>); });
    try {
      assert.match(tree.root.findByProps({ role: 'alert' }).findByType('p').children.join(''), locale === 'ko' ? /불러오지 못했습니다/ : /Could not load/);
      act(() => tree.root.findByType('button').props.onClick());
    } finally { act(() => tree.unmount()); }
  }
  assert.equal(reloads, 2);
});

test('knowledge search reuses results across other renders and counts domains in either locale', () => {
  let latest!: ReturnType<typeof useDomainKnowledgeSearch>;
  function Probe({ query, locale }: { query: string; locale: 'ko' | 'en' }) {
    latest = useDomainKnowledgeSearch(query, locale);
    return null;
  }
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<Probe query="교육" locale="ko" />); });
  try {
    const previous = latest;
    assert.equal(latest.searchedItems.length, 5);
    assert.equal(latest.domains.find(domain => domain.key === '교육')?.count, 5);
    act(() => tree.update(<Probe query="교육" locale="en" />));
    assert.equal(latest.searchedItems, previous.searchedItems);
    assert.equal(latest.domains.find(domain => domain.key === '교육')?.label, 'Education');
    act(() => tree.update(<Probe query="no-match-123" locale="en" />));
    assert.equal(latest.searchedItems.length, 0);
    assert.equal(latest.domains.length, 21);
    assert.ok(latest.domains.every(domain => domain.count === 0));
  } finally { act(() => tree.unmount()); }
});
