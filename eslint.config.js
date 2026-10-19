import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  { ignores: ['**/dist/**', '**/node_modules/**', 'docs/local/**'] },
  {
    files: ['apps/**/*.{ts,tsx}', 'packages/**/*.ts', 'scripts/*.{ts,mjs}', '*.js'],
    languageOptions: { parser: tseslint.parser, parserOptions: { ecmaFeatures: { jsx: true } } },
    rules: {
      ...js.configs.recommended.rules,
      // TypeScript checks names and types; adopting lint must not rewrite existing style.
      'no-undef': 'off',
      'no-unused-vars': 'off',
    },
  },
];
