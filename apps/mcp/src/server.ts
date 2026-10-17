import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import * as z from 'zod/v4';
import {
  TECHNIQUES, DOMAIN_CATEGORIES, DOMAIN_NAMES, TARGETS, TRIGGERS,
  searchTechniques, getTechniqueText, getSearchMetadata, type TechniqueItem, type Locale,
} from '@vibe-dictionary/catalog';
import packageInfo from '../package.json';

const localeSchema = z.enum(['ko', 'en']).default('ko').describe('Output language; search matches both languages regardless of locale.');
const domainSchema = z.enum(['ui', 'motion', 'layout', 'style', 'video']);
const categoryIds = [...new Set(Object.values(DOMAIN_CATEGORIES).flatMap(categories => categories.map(({ id }) => id)))].filter(id => id !== 'all');
const categorySchema = z.enum(categoryIds as [string, ...string[]]);
const targetSchema = z.enum(TARGETS);
const triggerSchema = z.enum(TRIGGERS);
const matchFieldSchema = z.enum(['title', 'alias', 'keyword', 'useCase', 'target', 'trigger', 'summary', 'prompt']);
const summaryShape = {
  id: z.string(), domain: domainSchema, domainLabel: z.string(), category: categorySchema,
  title: z.string(), titleKo: z.string(), titleEn: z.string(), locale: z.enum(['ko', 'en']),
  summary: z.string(), vibeTag: z.string(), targets: z.array(targetSchema),
  triggers: z.array(triggerSchema), useCases: z.array(z.string()),
};
const readOnlyAnnotations = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false };
function summarize(item: TechniqueItem, locale: Locale) {
  const text = getTechniqueText(item, locale);
  const metadata = getSearchMetadata(item);
  return {
    id: item.id, domain: item.domain, domainLabel: DOMAIN_NAMES[locale][item.domain], category: item.category,
    title: text.title, titleKo: item.titleKo, titleEn: item.titleEn, locale,
    summary: text.summary, vibeTag: text.vibeTag, targets: metadata.targets,
    triggers: metadata.triggers, useCases: metadata.useCases[locale],
  };
}
function result<T extends Record<string, unknown>>(output: T) {
  return { content: [{ type: 'text' as const, text: JSON.stringify(output) }], structuredContent: output };
}
export function createServer() {
  const server = new McpServer({ name: packageInfo.name, version: packageInfo.version }, {
    instructions: 'Find UI, graphics, layout, style and video techniques. Search for a few candidates, compare summaries, useCases and matchedOn fields, then get_technique by exact ID only for the selected prompts. Search is bilingual weighted keyword/alias matching, not semantic AI search. Extract concrete effects and targets from a request; omit uncertain filters. Use target/trigger filters only for required demo inputs. If results are poor, reformulate or ask for clarification; scores are not probabilities and no result is guaranteed suitable. locale selects output language independently of search language. These read-only tools return reference data only.',
  });
  server.registerTool('search_techniques', {
    title: 'Search techniques / 기법 검색',
    description: 'Search Korean/English names, aliases and use cases. Prefer concrete effect words; query may contain multiple words, with partial matches ranked by coverage and field importance. Names and aliases outrank prompts. Use domain/category and optional target/trigger to narrow required properties. Start with limit 5. Nonempty queries return relevance order with score (not confidence) and matchedOn field names; empty query browses catalog order. Responses exclude full prompts. locale defaults to ko; use en for English output. An empty result means reformulate, broaden filters or ask the user. Some demos simulate scroll/drag/audio using clicks/timers; check triggers and the original prompt.',
    inputSchema: {
      query: z.string().max(500).default('').describe('Concrete effect words, aliases or use situation; omit to browse.'),
      domain: domainSchema.optional(), category: categorySchema.optional(),
      target: targetSchema.optional().describe('Required target type, e.g. button or card.'),
      trigger: triggerSchema.optional().describe('Required implemented demo input, e.g. pointer-move, click or drag.'),
      locale: localeSchema,
      limit: z.number().int().min(1).max(50).default(20).describe('Page size, maximum 50; use 5 for initial candidates.'),
      offset: z.number().int().min(0).max(Number.MAX_SAFE_INTEGER).default(0),
    },
    outputSchema: {
      total: z.number().int(), offset: z.number().int(), nextOffset: z.number().int().nullable(),
      items: z.array(z.object({ ...summaryShape, score: z.number(), matchedOn: z.array(matchFieldSchema) })),
    }, annotations: readOnlyAnnotations,
  }, async ({ query, domain, category, target, trigger, locale, limit, offset }) => {
    const matches = searchTechniques({ query, domain, category: category as TechniqueItem['category'] | undefined, target, trigger });
    const items = matches.slice(offset, offset + limit).map(({ item, score, matchedOn }) => ({
      ...summarize(item, locale), score, matchedOn: matchedOn.map(match => match.field),
    }));
    return result({ total: matches.length, offset, nextOffset: offset + items.length < matches.length ? offset + items.length : null, items });
  });
  server.registerTool('get_technique', {
    title: 'Get technique prompt / 기법 원문 조회',
    description: 'Get one technique by exact ID from search_techniques, with the original reference prompt in the selected locale (ko default, en supported), aliases and use cases. Translation preserves inputs, timings and demo limitations. titleKo/titleEn retain both canonical names for compatibility. Returns reference text only; does not execute it or modify files. Unknown IDs return an error; search again.',
    inputSchema: { id: z.string().trim().min(1).max(200), locale: localeSchema },
    outputSchema: { ...summaryShape, aliases: z.array(z.string()), vibeKeywords: z.array(z.string()), promptSnippet: z.string() },
    annotations: readOnlyAnnotations,
  }, async ({ id, locale }) => {
    const item = TECHNIQUES.find(candidate => candidate.id === id);
    if (!item) return { isError: true, content: [{ type: 'text' as const, text: locale === 'en'
      ? 'Technique ID not found. Use search_techniques to find a valid ID.'
      : '기법 ID를 찾을 수 없습니다. search_techniques로 유효한 ID를 확인해 주세요.' }] };
    const text = getTechniqueText(item, locale);
    return result({ ...summarize(item, locale), aliases: getSearchMetadata(item).aliases[locale], vibeKeywords: text.vibeKeywords, promptSnippet: text.promptSnippet });
  });
  return server;
}
