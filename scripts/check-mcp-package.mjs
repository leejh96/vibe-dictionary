import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdir, mkdtemp, readFile, realpath, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { TECHNIQUES, getTechniqueText } from '../packages/catalog/src/index.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(await readFile(join(root, 'apps/mcp/package.json'), 'utf8'));
// Use npm's JS entry point, avoiding shell-dependent quoting on Windows.
const npmCli = process.env.npm_execpath;
assert.ok(npmCli, 'Run with npm run check:package');
function npm(args, cwd = root) {
  return execFileSync(process.execPath, [npmCli, ...args], {
    cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'],
  });
}

assert.equal(manifest.name, '@keke1933/vibe-dictionary-mcp');
assert.equal(manifest.private, undefined);
assert.deepEqual(Object.keys(manifest.dependencies).sort(), ['@modelcontextprotocol/sdk', 'zod']);
assert.equal(manifest.license, 'MIT');
assert.equal(manifest.publishConfig.access, 'public');
assert.equal(manifest.repository.url, 'git+https://github.com/leejh96/vibe-dictionary.git');
assert.equal(manifest.repository.directory, 'apps/mcp');
assert.equal(await readFile(join(root, 'apps/mcp/LICENSE'), 'utf8'), await readFile(join(root, 'LICENSE'), 'utf8'));

const outputDir = process.argv[2] ? resolve(process.argv[2]) : await mkdtemp(join(tmpdir(), 'vibe-mcp-pack-'));
await mkdir(outputDir, { recursive: true });
const [packed] = JSON.parse(npm([
  'pack', '--workspace', manifest.name, '--ignore-scripts', '--json', '--pack-destination', outputDir,
]));
assert.equal(packed.name, manifest.name);
assert.equal(packed.version, manifest.version);
assert.equal(packed.filename, `keke1933-vibe-dictionary-mcp-${manifest.version}.tgz`);
assert.deepEqual(packed.files.map(({ path }) => path).sort(), ['LICENSE', 'README.md', 'dist/index.js', 'package.json']);
const tarball = join(outputDir, packed.filename);

const temporaryRoot = await realpath(tmpdir());
const isolatedDir = await mkdtemp(join(temporaryRoot, 'vibe-mcp-install-'));
const client = new Client({ name: 'npm-package-check', version: '1.0.0' });
let stderr = '';
try {
  npm(['install', '--prefix', isolatedDir, '--no-audit', '--no-fund', '--registry=https://registry.npmjs.org/', tarball]);
  const runtimeAudit = JSON.parse(npm(['audit', '--omit=dev', '--json', '--registry=https://registry.npmjs.org/'], isolatedDir));
  assert.equal(runtimeAudit.metadata.vulnerabilities.total, 0);
  const installed = join(isolatedDir, 'node_modules/@keke1933/vibe-dictionary-mcp');
  assert.deepEqual(JSON.parse(await readFile(join(installed, 'package.json'), 'utf8')), manifest);
  assert.equal(await readFile(join(installed, 'LICENSE'), 'utf8'), await readFile(join(root, 'LICENSE'), 'utf8'));
  const transport = new StdioClientTransport({
    command: process.execPath, args: [join(installed, 'dist/index.js')], cwd: isolatedDir, stderr: 'pipe',
  });
  transport.stderr?.on('data', (chunk) => { stderr += chunk.toString(); });
  await client.connect(transport);
  assert.deepEqual(client.getServerVersion(), { name: manifest.name, version: manifest.version });
  const { tools } = await client.listTools();
  assert.deepEqual(tools.map(({ name }) => name).sort(), ['get_technique', 'search_techniques']);
  const ids = [];
  let offset = 0;
  do {
    const page = await client.callTool({ name: 'search_techniques', arguments: { offset, limit: 50 } });
    assert.notEqual(page.isError, true);
    ids.push(...page.structuredContent.items.map(({ id }) => id));
    offset = page.structuredContent.nextOffset;
  } while (offset !== null);
  assert.deepEqual(ids, TECHNIQUES.map(({ id }) => id));
  for (const item of TECHNIQUES) {
    const detail = await client.callTool({ name: 'get_technique', arguments: { id: item.id } });
    assert.notEqual(detail.isError, true);
    for (const [key, value] of Object.entries(item)) assert.deepEqual(detail.structuredContent[key], value);
    const english = await client.callTool({ name: 'get_technique', arguments: { id: item.id, locale: 'en' } });
    assert.notEqual(english.isError, true);
    assert.equal(english.structuredContent.promptSnippet, getTechniqueText(item, 'en').promptSnippet);
    assert.equal(english.structuredContent.locale, 'en');
  }
  const ranked = await client.callTool({ name: 'search_techniques', arguments: { query: '마우스를 올리면 버튼이 자석처럼 따라오는 디자인', target: 'button', trigger: 'pointer-move', locale: 'en', limit: 5 } });
  assert.notEqual(ranked.isError, true);
  assert.equal(ranked.structuredContent.items[0].id, 'magnetic-hover');
  assert.equal(ranked.structuredContent.items[0].locale, 'en');
  assert.ok(!('promptSnippet' in ranked.structuredContent.items[0]));
  assert.equal(stderr, '');
  console.log(JSON.stringify({ tarball, name: packed.name, version: packed.version, files: packed.files.map(({ path }) => path), catalogCount: ids.length, isolatedInstall: true, englishPrompts: ids.length, rankedSearch: true, runtimeVulnerabilities: runtimeAudit.metadata.vulnerabilities.total, integrity: packed.integrity }, null, 2));
} finally {
  await client.close();
  const cleanupPath = await realpath(isolatedDir);
  assert.equal(dirname(cleanupPath), temporaryRoot);
  assert.ok(basename(cleanupPath).startsWith('vibe-mcp-install-'));
  await rm(cleanupPath, { recursive: true, force: true });
}
