import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import ts from 'typescript';

test('TECHNIQUES only combines imported data arrays without inline technique definitions', () => {
  const source = ts.createSourceFile('techniques.ts', readFileSync(new URL('../src/techniques.ts', import.meta.url), 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const imported = new Set(source.statements.filter(ts.isImportDeclaration).flatMap(statement => {
    const bindings = statement.importClause?.namedBindings;
    return bindings && ts.isNamedImports(bindings) ? bindings.elements.map(binding => binding.name.text) : [];
  }));
  const declaration = source.statements.filter(ts.isVariableStatement).flatMap(statement => statement.declarationList.declarations).find(declaration => declaration.name.getText(source) === 'TECHNIQUES');
  assert.ok(declaration?.initializer && ts.isArrayLiteralExpression(declaration.initializer));
  assert.ok(declaration.initializer.elements.length > 0);
  for (const element of declaration.initializer.elements) {
    assert.ok(ts.isSpreadElement(element), 'define individual techniques in data modules');
    assert.ok(ts.isIdentifier(element.expression) && imported.has(element.expression.text), 'assemble the catalog from imported arrays');
  }
});
