import assert from 'node:assert/strict';
import test from 'node:test';
import { TECHNIQUES, getTechniqueText, searchTechniques } from '../src/index';
import { SEARCH_EVALUATION, NO_RESULT_QUERIES } from './search-evaluation';

test('curated bilingual user phrases retrieve an accepted technique in the first three results', () => {
  let first = 0;
  for (const { query, expected } of SEARCH_EVALUATION) {
    for (const id of expected) assert.ok(TECHNIQUES.some(item => item.id === id));
    const top = searchTechniques({ query }).slice(0, 3).map(result => result.item.id);
    assert.ok(top.some(id => (expected as readonly string[]).includes(id)), `${query}: ${top.join(', ')}`);
    if ((expected as readonly string[]).includes(top[0])) first++;
  }
  assert.ok(first / SEARCH_EVALUATION.length >= .9);
  for (const query of NO_RESULT_QUERIES) assert.deepEqual(searchTechniques({ query }), []);
});

test('suggested first keywords are unique within each domain and retrieve their source in either language', () => {
  for (const locale of ['ko', 'en'] as const) {
    const seen = new Set<string>();
    for (const item of TECHNIQUES) {
      const localized = getTechniqueText(item, locale);
      const query = localized.vibeKeywords[0] ?? localized.title;
      const key = `${item.domain}:${query.trim().toLowerCase()}`;
      assert.ok(!seen.has(key), key);
      seen.add(key);
      assert.ok(searchTechniques({ query, domain: item.domain, category: item.category }).some(result => result.item.id === item.id), `${locale}: ${item.id}`);
    }
  }
});
