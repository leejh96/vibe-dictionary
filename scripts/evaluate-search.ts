import { searchTechniques } from '../packages/catalog/src/index';
import { SEARCH_EVALUATION, NO_RESULT_QUERIES } from '../packages/catalog/tests/search-evaluation';

export function evaluateSearch() {
  const rows = SEARCH_EVALUATION.map(({ query, expected }) => {
    const results = searchTechniques({ query });
    const rank = results.findIndex(result => (expected as readonly string[]).includes(result.item.id)) + 1;
    return { query, expected, rank, top3: results.slice(0, 3).map(result => result.item.id), noResults: results.length === 0 };
  });
  return {
    samples: rows.length,
    top1: rows.filter(row => row.rank === 1).length / rows.length,
    top3: rows.filter(row => row.rank > 0 && row.rank <= 3).length / rows.length,
    noResults: rows.filter(row => row.noResults).length / rows.length,
    negatives: NO_RESULT_QUERIES.map(query => ({ query, count: searchTechniques({ query }).length })),
    rows,
  };
}
console.log(JSON.stringify(evaluateSearch(), null, 2));
