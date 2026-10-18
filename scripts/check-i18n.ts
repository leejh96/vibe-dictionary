import ts from 'typescript';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { KO_MESSAGES } from '../apps/web/src/i18n/messages.ko';
import { EN_MESSAGES } from '../apps/web/src/i18n/messages.en';

const placeholders = (text: string) => [...new Set([...text.matchAll(/\{([a-zA-Z]\w*)\}/g)].map(match => match[1]))].sort();
export function validateMessages(ko: Record<string, string>, en: Record<string, string>): string[] {
  const errors: string[] = [];
  for (const key of new Set([...Object.keys(ko), ...Object.keys(en)])) {
    if (!/^[a-z][a-zA-Z0-9]*(?:\.[a-z][a-zA-Z0-9]*)+$/.test(key)) errors.push(`${key}: use a stable dotted ID`);
    for (const [locale, messages] of [['ko', ko], ['en', en]] as const) {
      if (!Object.prototype.hasOwnProperty.call(messages, key)) errors.push(`${key}: missing ${locale} translation`);
      else if (typeof messages[key] !== 'string' || !messages[key].trim()) errors.push(`${key}: empty ${locale} translation`);
    }
    if (typeof ko[key] === 'string' && typeof en[key] === 'string' && JSON.stringify(placeholders(ko[key])) !== JSON.stringify(placeholders(en[key]))) errors.push(`${key}: placeholder names differ`);
  }
  // These are native-language names/captions shown identically in both menus.
  const nativeLabels = new Set(['language.koreanName', 'language.englishCaption']);
  for (const [key, text] of Object.entries(en)) {
    if (/[가-힣ㄱ-ㅎㅏ-ㅣ]/u.test(text) && !(nativeLabels.has(key) && text === ko[key])) errors.push(`${key}: Korean remains in English translation`);
  }
  return errors;
}

function visible(node: ts.Node, file: ts.SourceFile): boolean {
  let child = node;
  for (let parent = node.parent; parent; child = parent, parent = parent.parent) {
    if (ts.isJsxExpression(parent)) {
      if (ts.isJsxAttribute(parent.parent)) return ['title', 'aria-label', 'placeholder', 'alt'].includes(parent.parent.name.getText(file));
      return !(ts.isJsxElement(parent.parent) && parent.parent.openingElement.tagName.getText(file) === 'style');
    }
    if (ts.isConditionalExpression(parent)) {
      if (child === parent.condition) return false;
      continue;
    }
    if (ts.isBinaryExpression(parent) && ['||', '??', '+'].includes(parent.operatorToken.getText(file))) continue;
    if (ts.isParenthesizedExpression(parent) || ts.isArrayLiteralExpression(parent)) continue;
    return false;
  }
  return false;
}

// Comments are ignored by the AST. Catalog content is managed in its own ID-based package.
export function inspectSource(source: string, filename: string): string[] {
  const file = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, filename.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const errors: string[] = [];
  const report = (node: ts.Node, message: string) => {
    const location = file.getLineAndCharacterOfPosition(node.getStart(file));
    errors.push(`${filename}:${location.line + 1}:${location.character + 1}: ${message}`);
  };
  function visit(node: ts.Node) {
    const literal = ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node) || ts.isJsxText(node);
    if (literal && /[가-힣ㄱ-ㅎㅏ-ㅣ]/u.test(node.text)) report(node, 'Korean copy must live in messages.ko.ts and use t(key)');
    if (ts.isJsxText(node) && /[A-Za-z]/.test(node.text)) report(node, 'JSX text must use a message key (including invariant sample labels)');
    if (ts.isJsxAttribute(node) && ['title', 'aria-label', 'placeholder', 'alt'].includes(node.name.getText(file)) && node.initializer && ts.isStringLiteral(node.initializer) && /[A-Za-z]/.test(node.initializer.text)) report(node, 'UI text attribute must use t(key)');
    if (ts.isStringLiteralLike(node) && /[A-Za-z]/.test(node.text) && visible(node, file)) report(node, 'Rendered string must use t(key)');
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === 't' && node.arguments[0] && ts.isStringLiteralLike(node.arguments[0]) && !Object.prototype.hasOwnProperty.call(KO_MESSAGES, node.arguments[0].text)) report(node, 'Unknown translation key');
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === 'tr') report(node, 'Source-text translation is forbidden; use t(key, params)');
    ts.forEachChild(node, visit);
  }
  visit(file);
  return errors;
}

export function checkI18n(root: string): string[] {
  const errors = validateMessages(KO_MESSAGES, EN_MESSAGES);
  function walk(directory: string) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) walk(path);
      else if (/\.tsx?$/.test(entry.name)) {
        const dictionary = [join(root, 'apps/web/src/i18n/messages.ko.ts'), join(root, 'apps/web/src/i18n/messages.en.ts')].includes(path)
          || (dirname(path) === join(root, 'apps/web/src/i18n/demos') && entry.name.endsWith('.messages.ts'));
        if (!dictionary) errors.push(...inspectSource(readFileSync(path, 'utf8'), relative(root, path)));
      }
    }
  }
  walk(join(root, 'apps/web/src'));
  return errors;
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  const errors = checkI18n(root);
  if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
  else console.log(`i18n check passed: ${Object.keys(KO_MESSAGES).length} bilingual keys; no hardcoded Korean or JSX copy.`);
}
