import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import * as z from 'zod/v4';
import { TECHNIQUES, DOMAIN_CATEGORIES, DOMAIN_LABELS, type TechniqueItem } from '../../../src/data/techniques';
import { matchesSearch } from '../../../src/data/search';
import packageInfo from '../package.json';

const domainSchema = z.enum(['ui', 'motion', 'layout', 'style', 'video']);
const categoryIds = [...new Set(Object.values(DOMAIN_CATEGORIES)
  .flatMap((categories) => categories.map(({ id }) => id)))]
  .filter((id) => id !== 'all');
const categorySchema = z.enum(categoryIds as [string, ...string[]]);
const summaryShape = {
  id: z.string(),
  domain: domainSchema,
  domainLabel: z.string(),
  category: categorySchema,
  titleKo: z.string(),
  titleEn: z.string(),
  summary: z.string(),
  vibeTag: z.string(),
};
const readOnlyAnnotations = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
};

function summarize(item: TechniqueItem) {
  return {
    id: item.id,
    domain: item.domain,
    domainLabel: DOMAIN_LABELS[item.domain],
    category: item.category,
    titleKo: item.titleKo,
    titleEn: item.titleEn,
    summary: item.summary,
    vibeTag: item.vibeTag,
  };
}

function result<T extends Record<string, unknown>>(output: T) {
  return {
    content: [{ type: 'text' as const, text: JSON.stringify(output) }],
    structuredContent: output,
  };
}

export function createServer() {
  const server = new McpServer(
    { name: packageInfo.name, version: packageInfo.version },
    {
      instructions: 'Search the Vibe Dictionary catalog for UI, graphics, layout, style and video effects. Use search_techniques for candidates, then get_technique with an exact ID for the original implementation prompt. Search is keyword-based, not semantic. These tools only return reference data; they do not modify files, implement UI or combine prompts.',
    }
  );

  server.registerTool('search_techniques', {
    title: '기법 목록·검색',
    description: 'List or search Vibe Dictionary techniques. Omit query to browse. Matches all whitespace-separated keywords across Korean/English titles, effect keywords, summaries and prompts, ignoring case. Use short keywords such as "마그네틱", "magnetic", "카드", "SVG" rather than a full request. Returns summaries without full prompts in catalog order; use get_technique for a prompt. Domains: ui=UI, motion=그래픽, layout=레이아웃, style=스타일, video=모션 영상.',
    inputSchema: {
      query: z.string().max(500).default('').describe('검색어. 비우면 전체 목록.'),
      domain: domainSchema.optional().describe('도메인 필터'),
      category: categorySchema.optional().describe('카테고리 ID 필터'),
      limit: z.number().int().min(1).max(50).default(20).describe('페이지 크기, 최대 50'),
      offset: z.number().int().min(0).max(Number.MAX_SAFE_INTEGER).default(0).describe('건너뛸 결과 수'),
    },
    outputSchema: {
      total: z.number().int(),
      offset: z.number().int(),
      nextOffset: z.number().int().nullable(),
      items: z.array(z.object(summaryShape)),
    },
    annotations: readOnlyAnnotations,
  }, async ({ query, domain, category, limit, offset }) => {
    const matches = TECHNIQUES.filter((item) =>
      (!domain || item.domain === domain)
      && (!category || item.category === category)
      && matchesSearch(item, query));
    const items = matches.slice(offset, offset + limit).map(summarize);
    return result({
      total: matches.length,
      offset,
      nextOffset: offset + items.length < matches.length ? offset + items.length : null,
      items,
    });
  });

  server.registerTool('get_technique', {
    title: '기법 상세·프롬프트 조회',
    description: 'Get one Vibe Dictionary technique by its exact ID returned by search_techniques, including the verbatim promptSnippet and effect keywords. Returns reference instructions only; does not execute them or modify any project. An unknown ID returns an error; search again for a valid ID.',
    inputSchema: {
      id: z.string().trim().min(1).max(200).describe('search_techniques에서 받은 정확한 기법 ID'),
    },
    outputSchema: {
      ...summaryShape,
      vibeKeywords: z.array(z.string()),
      promptSnippet: z.string(),
    },
    annotations: readOnlyAnnotations,
  }, async ({ id }) => {
    const item = TECHNIQUES.find((candidate) => candidate.id === id);
    if (!item) {
      return {
        isError: true,
        content: [{ type: 'text' as const, text: '기법 ID를 찾을 수 없습니다. search_techniques로 유효한 ID를 확인해 주세요.' }],
      };
    }
    return result({
      ...summarize(item),
      vibeKeywords: item.vibeKeywords,
      promptSnippet: item.promptSnippet,
    });
  });

  return server;
}
