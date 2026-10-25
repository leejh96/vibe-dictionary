import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import ts from 'typescript';
import { readdirSync } from 'node:fs';
import { TECHNIQUES } from '@vibe-dictionary/catalog';
import { DEMO_REGISTRY } from '../src/components/demos/demoRegistry';

test('the shared demo registry covers every catalog ID and dark stage exception', () => {
  const ids = [...DEMO_REGISTRY.keys()];
  assert.deepEqual([...ids].sort(), TECHNIQUES.map(item => item.id).sort(), 'missing or stale demo mapping');

  const card = ts.createSourceFile('TechniqueCard.tsx', readFileSync(new URL('../src/components/TechniqueCard.tsx', import.meta.url), 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const darkIds: string[] = [];
  function collect(node: ts.Node) {
    if (ts.isVariableDeclaration(node) && node.name.getText(card) === 'DARK_STAGE_IDS' && node.initializer && ts.isNewExpression(node.initializer)) {
      const list = node.initializer.arguments?.[0];
      assert.ok(list && ts.isArrayLiteralExpression(list));
      for (const entry of list.elements) {
        assert.ok(ts.isStringLiteral(entry));
        darkIds.push(entry.text);
      }
    }
    ts.forEachChild(node, collect);
  }
  collect(card);
  assert.ok(darkIds.length > 0);
  assert.equal(new Set(darkIds).size, darkIds.length);
  for (const id of darkIds) assert.ok(ids.includes(id), `stale dark stage: ${id}`);
});

test('custom clickable demo surfaces opt out of gallery restart', () => {
  const native = new Set(['button', 'input', 'select', 'textarea', 'a', 'summary']);
  let checked = 0;
  function scan(directory: URL) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = new URL(entry.name + (entry.isDirectory() ? '/' : ''), directory);
      if (entry.isDirectory()) { scan(path); continue; }
      if (!entry.name.endsWith('.tsx')) continue;
      const source = ts.createSourceFile(entry.name, readFileSync(path, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
      function visit(node: ts.Node) {
        if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
          const tag = node.tagName.getText(source);
          const names = node.attributes.properties.filter(ts.isJsxAttribute).map(attribute => attribute.name.getText(source));
          if (/^[a-z]/.test(tag) && !native.has(tag) && names.includes('onClick')) {
            assert.ok(names.includes('data-demo-control'), `${entry.name}: ${tag} must keep its own click behavior`);
            checked++;
          }
        }
        ts.forEachChild(node, visit);
      }
      visit(source);
    }
  }
  scan(new URL('../src/components/demos/', import.meta.url));
  assert.ok(checked > 0);
});
