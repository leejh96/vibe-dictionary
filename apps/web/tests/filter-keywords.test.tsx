import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create, type ReactTestInstance } from 'react-test-renderer';
import { TECHNIQUES, getTechniqueText } from '@vibe-dictionary/catalog';
import { FilterBar } from '../src/components/FilterBar';
import { LocaleProvider } from '../src/i18n/LocaleContext';
const text = (node: ReactTestInstance | string): string => typeof node === 'string' ? node : node.children.map(child => text(child as ReactTestInstance | string)).join('');

test('selected keyword remains visible when suggestions collapse in either language', () => {
  for (const locale of ['ko', 'en'] as const) {
    const items = TECHNIQUES.filter(item => item.domain === 'ui').slice(0, 12);
    const chips = items.map(item => getTechniqueText(item, locale).vibeKeywords[0]);
    const selected = chips[11];
    let clicked = '';
    let tree!: ReturnType<typeof create>;
    act(() => { tree = create(<LocaleProvider initialLocale={locale}><FilterBar activeDomain="ui" selectedCategory="all" searchQuery={selected}
      onSearchChange={() => {}} onCategoryChange={() => {}} onSelectChip={value => { clicked = value; }} vibeChips={chips} categoryCounts={{}} totalCount={items.length} /></LocaleProvider>); });
    const buttons = () => tree.root.findAllByType('button');
    assert.equal(buttons().filter(node => text(node).startsWith('#')).length, 10);
    assert.ok(buttons().some(node => text(node) === `#${selected}`));
    act(() => buttons().find(node => /^\+2/.test(text(node)))!.props.onClick());
    assert.equal(buttons().filter(node => text(node).startsWith('#')).length, 12);
    act(() => buttons().find(node => /접기|Collapse/.test(text(node)))!.props.onClick());
    assert.equal(buttons().filter(node => text(node).startsWith('#')).length, 10);
    act(() => buttons().find(node => text(node) === `#${selected}`)!.props.onClick());
    assert.equal(clicked, '', 'selecting the active chip clears the query');
    act(() => buttons().find(node => text(node) === `#${chips[0]}`)!.props.onClick());
    assert.equal(clicked, chips[0]);
    act(() => tree.unmount());
  }
});
