export const normalizeSearchText = (text: string) => text.normalize('NFKC').trim().toLowerCase();

export function createSearchTokenizer(synonyms: readonly (readonly string[])[], extraStopWords: readonly string[] = []) {
  const stopWords = new Set([
    ...'a an the to of in on at with for and or i my want please make create implement design effect this that me it is as can you add show using 디자인 효과 구현 구현해 구현해줘 만들어 만들어줘 해줘 주세요 줘 이 가 은 는 을 를 에 에서 으로 처럼 때 하면 되게 하게 살짝'.split(' '),
    ...extraStopWords,
  ]);
  const escapeRegex = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const aliases = synonyms.flatMap(group => group.map(alias => ({ alias: normalizeSearchText(alias), canonical: group[0] })))
    .sort((a, b) => b.alias.length - a.alias.length);
  const aliasMap = new Map(aliases.map(({ alias, canonical }) => [alias, canonical]));
  // Replace aliases once so a canonical term cannot be replaced by a later synonym.
  const aliasPattern = new RegExp(aliases.map(({ alias }) => /[a-z]/.test(alias)
    ? `(?<![a-z0-9])${escapeRegex(alias)}(?![a-z0-9])` : escapeRegex(alias)).join('|'), 'gu');
  return (text: string): string[] => {
    const canonical = normalizeSearchText(text).replace(aliasPattern, match => ` ${aliasMap.get(match)!} `);
    return [...new Set(canonical.split(/[^\p{L}\p{N}.%-]+/u)
      .filter(token => token && !stopWords.has(token)))];
  };
}

export interface SearchTextEntry<Field extends string> {
  field: Field;
  value: string;
  tokens: Set<string>;
}

export function rankSearchEntries<Field extends string>(
  entries: readonly SearchTextEntry<Field>[],
  queryTokens: readonly string[],
  weights: Record<Field, number>,
  exact?: SearchTextEntry<Field>,
  exactBonus = 100,
): { score: number; matchedOn: { field: Field; value: string }[] } | null {
  if (!queryTokens.length && !exact) return null;
  const matchedOn: { field: Field; value: string }[] = [];
  const best = new Map<string, number>();
  for (const entry of entries) {
    const matched = queryTokens.filter(token => entry.tokens.has(token));
    if (!matched.length) continue;
    for (const token of matched) best.set(token, Math.max(best.get(token) ?? 0, weights[entry.field]));
    if (!matchedOn.some(match => match.field === entry.field)) matchedOn.push({ field: entry.field, value: entry.value });
  }
  // Keep unknown terms in the denominator to reject mostly unrelated requests.
  if (!exact && best.size < Math.max(1, Math.ceil(queryTokens.length * 0.6))) return null;
  let score = [...best.values()].reduce((sum, weight) => sum + weight, 0);
  score += queryTokens.length ? Math.round(20 * best.size / queryTokens.length) : 0;
  if (exact) {
    score += exactBonus;
    if (!matchedOn.some(match => match.field === exact.field)) matchedOn.unshift({ field: exact.field, value: exact.value });
  }
  return { score, matchedOn: matchedOn.slice(0, 4) };
}
