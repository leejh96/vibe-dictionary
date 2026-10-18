import assert from 'node:assert/strict';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { validateMessages, inspectSource, checkI18n } from '../../../scripts/check-i18n';
import { translateMessage } from '../src/i18n/messages';

const root = fileURLToPath(new URL('../../../', import.meta.url));

test('dictionaries and all web sources satisfy the localization contract', () => {
  assert.deepEqual(checkI18n(root), []);
});

test('missing, extra, blank translations and placeholder drift fail the dictionary check', () => {
  const ko = { 'example.label': '수정된 한국어', 'example.count': '{count}개' };
  const en = { 'example.label': 'English wording', 'example.count': '{count} items' };
  assert.deepEqual(validateMessages(ko, en), []);
  assert.match(validateMessages(ko, { 'example.label': 'English' }).join('\n'), /missing en/);
  assert.match(validateMessages({ 'example.label': '원문' }, en).join('\n'), /missing ko/);
  assert.match(validateMessages(ko, { ...en, 'example.label': '  ' }).join('\n'), /empty en/);
  assert.match(validateMessages(ko, { ...en, 'example.count': '{total} items' }).join('\n'), /placeholder names differ/);
  assert.match(validateMessages(ko, { ...en, 'example.label': '번역하지 않은 원문' }).join('\n'), /Korean remains/);
});

test('source checks reject untranslated copy, unknown keys and the former source-text API', () => {
  for (const source of [
    "const copy = '번역 안 된 문구';",
    'const copy = `항목 ${count}개`;',
    'const view = <button>New action</button>;',
    'const view = <button title="New action" />;',
    'const view = <span>{active ? "Ready" : "Done"}</span>;',
    "t('unknown.message');",
    "tr('Old copy');",
  ]) assert.ok(inspectSource(source, 'fixture.tsx').length, source);
  assert.deepEqual(inspectSource('// 한국어 주석은 허용\nconst view = <button>{t("actions.copyPrompt")}</button>;', 'fixture.tsx'), []);
  assert.deepEqual(inspectSource('const view = <div className="font-bold" style={{ color: "red" }}>{userInput}</div>;', 'fixture.tsx'), []);
  assert.deepEqual(inspectSource('const view = <style>{`@keyframes fade { to { opacity: 1; } }`}</style>;', 'fixture.tsx'), []);
});

test('interpolation preserves arbitrary input and fails loudly for unknown keys or missing parameters', () => {
  const input = '랜딩 CTA {count} $& <button>';
  assert.equal(translateMessage('en', 'search.noResults', { query: input }), `No results for "${input}" in this section.`);
  assert.equal(translateMessage('ko', 'composer.heading', { count: 2 }), '바이브 프롬프트 조합기 (2)');
  assert.throws(() => Reflect.apply(translateMessage, null, ['en', 'unknown.message']), /Unknown translation key/);
  assert.throws(() => Reflect.apply(translateMessage, null, ['en', 'search.noResults']), /Missing translation parameter/);
});

test('TypeScript enforces keys, parameters and complete locale dictionaries across the app', () => {
  const configPath = fileURLToPath(new URL('../tsconfig.json', import.meta.url));
  const config = ts.readConfigFile(configPath, ts.sys.readFile);
  assert.equal(config.error, undefined);
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, fileURLToPath(new URL('../', import.meta.url)));
  const program = ts.createProgram([...parsed.fileNames, fileURLToPath(new URL('./types/i18n-contract.ts', import.meta.url))], { ...parsed.options, noEmit: true });
  const diagnostics = ts.getPreEmitDiagnostics(program);
  assert.equal(diagnostics.length, 0, ts.formatDiagnosticsWithColorAndContext(diagnostics, { getCurrentDirectory: () => root, getCanonicalFileName: file => file, getNewLine: () => '\n' }));
});
