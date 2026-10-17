import type { TechniqueItem } from './techniques';

export function matchesSearch(item: TechniqueItem, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  const searchableText = [
    item.titleKo,
    item.titleEn,
    item.vibeTag,
    item.summary,
    item.promptSnippet,
    ...item.vibeKeywords,
  ].join(' ').toLowerCase();

  return q.split(/\s+/).every((token) => searchableText.includes(token));
}
