import { DOMAIN_KNOWLEDGE, type DomainKnowledge } from './domain-knowledge';
import { KNOWLEDGE_SYNONYMS, KNOWLEDGE_STOP_WORDS } from './domain-knowledge/search-vocabulary';
import { createSearchTokenizer, normalizeSearchText, rankSearchEntries, type SearchTextEntry } from './search-ranking';

export type KnowledgeMatchField = 'domain' | 'title' | 'alias' | 'keyword' | 'useCase' | 'summary' | 'concept' | 'workflow' | 'pitfall' | 'question' | 'example';
export interface RankedDomainKnowledge {
  item: DomainKnowledge;
  score: number;
  matchedOn: { field: KnowledgeMatchField; value: string }[];
}

const tokens = createSearchTokenizer(KNOWLEDGE_SYNONYMS, KNOWLEDGE_STOP_WORDS);
const weights: Record<KnowledgeMatchField, number> = {
  domain: 35, title: 30, alias: 28, keyword: 20, useCase: 18, summary: 12,
  concept: 10, workflow: 8, pitfall: 8, question: 6, example: 3,
};
const index = new Map<DomainKnowledge, SearchTextEntry<KnowledgeMatchField>[]>();

function entries(item: DomainKnowledge): SearchTextEntry<KnowledgeMatchField>[] {
  const cached = index.get(item);
  if (cached) return cached;
  const texts = [item.text.ko, item.text.en];
  const fields: [KnowledgeMatchField, string[]][] = [
    ['domain', texts.map(text => text.domain)], ['title', [item.id, ...texts.map(text => text.title)]],
    ['alias', [...item.aliases.ko, ...item.aliases.en]], ['keyword', [...item.keywords.ko, ...item.keywords.en]],
    ['useCase', [...item.useCases.ko, ...item.useCases.en]], ['summary', texts.flatMap(text => [text.summary, text.overview])],
    ...(['concept', 'workflow', 'pitfall'] as const).map(field => [field, texts.flatMap(text =>
      (field === 'concept' ? text.concepts : field === 'workflow' ? text.workflow : text.pitfalls)
        .flatMap(point => [point.name, point.description]))] as [KnowledgeMatchField, string[]]),
    ['question', texts.flatMap(text => text.questions)], ['example', texts.map(text => text.example)],
  ];
  const result = fields.flatMap(([field, values]) => values.map(value => ({ field, value, tokens: new Set(tokens(value)) })));
  index.set(item, result);
  return result;
}

export function rankDomainKnowledge(query = ''): RankedDomainKnowledge[] {
  if (!query.trim()) return DOMAIN_KNOWLEDGE.map(item => ({ item, score: 0, matchedOn: [] }));
  const queryTokens = tokens(query);
  const normalizedQuery = normalizeSearchText(query);
  const results: RankedDomainKnowledge[] = [];
  for (const item of DOMAIN_KNOWLEDGE) {
    const allEntries = entries(item);
    const exact = allEntries.find(entry => normalizeSearchText(entry.value) === normalizedQuery);
    const result = rankSearchEntries(allEntries, queryTokens, weights, exact, exact?.field === 'domain' || exact?.field === 'title' ? 150 : 100);
    if (result) results.push({ item, ...result });
  }
  return results.sort((a, b) => b.score - a.score);
}

export function searchDomainKnowledge(query = ''): DomainKnowledge[] {
  return rankDomainKnowledge(query).map(({ item }) => item);
}
