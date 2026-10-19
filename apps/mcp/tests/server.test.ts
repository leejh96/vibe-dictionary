import assert from 'node:assert/strict';
import { mkdtemp, rmdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { TECHNIQUES, searchTechniques, getTechniqueText } from '@vibe-dictionary/catalog';
import packageInfo from '../package.json';

const entry = fileURLToPath(new URL('../dist/index.js', import.meta.url));

test('built stdio server provides only read-only catalog and prompt retrieval', async (t) => {
  const cwd = await mkdtemp(join(tmpdir(), 'vibe mcp test '));
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [entry],
    cwd,
    stderr: 'pipe',
  });
  let stderr = '';
  transport.stderr?.on('data', (chunk: Buffer) => { stderr += chunk.toString(); });
  const client = new Client({ name: 'vibe-dictionary-test', version: '1.0.0' });
  t.after(async () => {
    await client.close();
    await rmdir(cwd);
  });
  await client.connect(transport);

  async function call(name: string, args: Record<string, unknown> = {}) {
    const response = await client.callTool({ name, arguments: args });
    assert.notEqual(response.isError, true, JSON.stringify(response));
    assert.ok(response.structuredContent);
    const content = response.content as Array<{ type: string; text?: string }>;
    assert.equal(content[0].type, 'text');
    assert.deepEqual(JSON.parse(content[0].text!), response.structuredContent);
    return response.structuredContent as Record<string, any>;
  }

  await t.test('initialization, tool discovery and annotations', async () => {
    assert.deepEqual(client.getServerVersion(), { name: packageInfo.name, version: packageInfo.version });
    const { tools } = await client.listTools();
    assert.deepEqual(tools.map(({ name }) => name).sort(), ['get_technique', 'search_techniques']);
    for (const tool of tools) {
      assert.ok(tool.inputSchema);
      assert.ok(tool.outputSchema);
      assert.deepEqual(tool.annotations, {
        readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false,
      });
    }
    const capabilities = client.getServerCapabilities()!;
    assert.equal(capabilities.resources, undefined);
    assert.equal(capabilities.prompts, undefined);
  });

  await t.test('default browsing is bounded and excludes full prompts', async () => {
    const output = await call('search_techniques');
    assert.equal(output.total, TECHNIQUES.length);
    assert.equal(output.items.length, 20);
    assert.equal(output.nextOffset, 20);
    assert.ok(output.items.every((item: object) => !('promptSnippet' in item)));
    const blank = await call('search_techniques', { query: '  \t ' });
    assert.deepEqual(blank, output);
  });

  await t.test('pagination returns every catalog ID once in catalog order', async () => {
    const ids: string[] = [];
    let offset: number | null = 0;
    while (offset !== null) {
      const page = await call('search_techniques', { offset, limit: 50 });
      ids.push(...page.items.map((item: { id: string }) => item.id));
      offset = page.nextOffset;
    }
    assert.deepEqual(ids, TECHNIQUES.map(({ id }) => id));
    assert.equal(new Set(ids).size, ids.length);
    const pastEnd = await call('search_techniques', { offset: TECHNIQUES.length + 1 });
    assert.deepEqual(pastEnd.items, []);
    assert.equal(pastEnd.nextOffset, null);
  });

  await t.test('Korean, English, multiple tokens, filters and no matches', async () => {
    for (const query of ['마그네틱', 'MAGNETIC', '마그네틱 버튼', '0.45초', '존재하지않는효과12345']) {
      const output = await call('search_techniques', { query, limit: 50 });
      const expected = searchTechniques({ query }).map(({ item }) => item);
      assert.equal(output.total, expected.length);
      assert.deepEqual(output.items.map((item: { id: string }) => item.id), expected.slice(0, 50).map(({ id }) => id));
    }
    assert.equal((await call('search_techniques', { query: '마그네틱' })).items[0].id, 'magnetic-hover');
    const filtered = await call('search_techniques', { domain: 'ui', category: 'hover', limit: 50 });
    const expected = TECHNIQUES.filter((item) => item.domain === 'ui' && item.category === 'hover');
    assert.deepEqual(filtered.items.map((item: { id: string }) => item.id), expected.map(({ id }) => id));
    const incompatible = await call('search_techniques', { domain: 'video', category: 'hover' });
    assert.equal(incompatible.total, 0);
    assert.deepEqual(incompatible.items, []);
  });

  await t.test('every original prompt and metadata are preserved verbatim', async () => {
    for (const item of TECHNIQUES) {
      const output = await call('get_technique', { id: item.id });
      for (const [key, value] of Object.entries(item)) assert.deepEqual(output[key], value);
    }
  });

  await t.test('natural language inflections retrieve the expected techniques over stdio', async () => {
    for (const [query, id] of [
      ['a card that flips when clicked', 'card-flip-3d'],
      ['a banner scrolling continuously', 'infinite-marquee'],
      ['얼굴만 흐리게 가리는', 'vd-face-blur-mask'],
    ]) {
      const output = await call('search_techniques', { query, locale: 'en', limit: 3 });
      assert.ok(output.items.some((item: { id: string }) => item.id === id), query);
      assert.ok(output.items.every((item: object) => !('promptSnippet' in item)));
    }
  });

  await t.test('bilingual ranked search, metadata filters and English prompts work through stdio', async () => {
    const page = await call('search_techniques', { query: '마우스를 올리면 버튼이 자석처럼 따라오는 디자인', locale: 'en', target: 'button', trigger: 'pointer-move', limit: 5 });
    assert.equal(page.items[0].id, 'magnetic-hover');
    assert.equal(page.items[0].locale, 'en');
    assert.ok(page.items[0].matchedOn.includes('alias'));
    assert.ok(page.items.every((item: Record<string, unknown>) => !('promptSnippet' in item)));
    assert.doesNotMatch(page.items[0].summary + page.items[0].useCases.join(' '), /[가-힣]/);
    const first = await call('search_techniques', { query: 'card', locale: 'en', limit: 2 });
    const next = await call('search_techniques', { query: 'card', locale: 'en', limit: 2, offset: first.nextOffset });
    const expected = searchTechniques({ query: 'card' }).slice(0, 4).map(({ item }) => item.id);
    assert.deepEqual([...first.items, ...next.items].map(item => item.id), expected);
    for (const item of TECHNIQUES) {
      const detail = await call('get_technique', { id: item.id, locale: 'en' });
      assert.equal(detail.promptSnippet, getTechniqueText(item, 'en').promptSnippet);
      assert.equal(detail.locale, 'en');
      assert.equal(detail.title, item.titleEn);
      assert.doesNotMatch(detail.promptSnippet, /[가-힣]/);
    }
  });

  await t.test('unknown IDs and invalid inputs fail without breaking the connection', async () => {
    for (const [name, args] of [
      ['get_technique', { id: 'does-not-exist' }],
      ['get_technique', { id: '   ' }],
      ['get_technique', {}],
      ['search_techniques', { domain: 'invalid' }],
      ['search_techniques', { category: 'invalid' }],
      ['search_techniques', { limit: 51 }],
      ['search_techniques', { limit: 0 }],
      ['search_techniques', { offset: -1 }],
      ['search_techniques', { offset: 1.5 }],
      ['search_techniques', { query: 'x'.repeat(501) }],
      ['search_techniques', { locale: 'fr' }],
      ['search_techniques', { target: 'unknown' }],
      ['search_techniques', { trigger: 'scroll' }],
      ['get_technique', { id: 'magnetic-hover', locale: 'fr' }],
    ] as const) {
      const response = await client.callTool({ name, arguments: args });
      assert.equal(response.isError, true, JSON.stringify({ name, args, response }));
    }
    const recovered = await call('get_technique', { id: ' magnetic-hover ' });
    assert.equal(recovered.id, 'magnetic-hover');
    assert.equal(stderr, '');
  });
});
