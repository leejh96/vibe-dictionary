import assert from 'node:assert/strict';
import test, { type TestContext } from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import App from '../src/App';
import { DictionaryNavigation } from '../src/components/DictionaryNavigation';
import { PromptCartDrawer } from '../src/components/PromptCartDrawer';
import { TechniqueCard } from '../src/components/TechniqueCard';
import { LocaleProvider } from '../src/i18n/LocaleContext';

function replace(t: TestContext, key: string, value: unknown) {
  const original = Object.getOwnPropertyDescriptor(globalThis, key);
  Object.defineProperty(globalThis, key, { configurable: true, value });
  t.after(() => { if (original) Object.defineProperty(globalThis, key, original); else Reflect.deleteProperty(globalThis, key); });
}

test('section changes reset scroll immediately and navigation tracks header resizing', t => {
  const scrollCalls: ScrollToOptions[] = [];
  let height = 64;
  let resizeHeader = () => {};
  let tree: ReturnType<typeof create> | undefined;
  t.after(() => { if (tree) act(() => tree!.unmount()); });
  replace(t, 'window', { scrollY: 300, innerHeight: 800, addEventListener() {}, removeEventListener() {}, scrollTo: (options: ScrollToOptions) => scrollCalls.push(options) });
  replace(t, 'document', { documentElement: { classList: { toggle() {} }, scrollHeight: 2000 } });
  replace(t, 'localStorage', { getItem: () => null, setItem() {} });
  replace(t, 'IntersectionObserver', class { observe() {} disconnect() {} });
  replace(t, 'ResizeObserver', class {
    constructor(callback: () => void) { resizeHeader = callback; }
    observe() {}
    disconnect() {}
  });

  act(() => {
    tree = create(<LocaleProvider initialLocale="ko"><App /></LocaleProvider>, {
      createNodeMock: element => element.type === 'header' ? { getBoundingClientRect: () => ({ height }) } : null,
    });
  });
  const navigation = () => tree!.root.findByType(DictionaryNavigation);
  const composerTrigger = () => tree!.root.findAllByType('button').filter(button => /^조합기 \(/.test(button.props['aria-label'] ?? ''));
  const firstCard = tree!.root.findAllByType(TechniqueCard)[0];
  const selectedId = firstCard.props.item.id;
  act(() => firstCard.props.onToggleCart(firstCard.props.item));
  act(() => tree!.root.findByType(PromptCartDrawer).props.onContextNoteChange('학습 목록'));
  act(() => composerTrigger()[0].props.onClick());
  assert.equal(tree!.root.findByType(PromptCartDrawer).props.isOpen, true);
  assert.equal(composerTrigger()[0].props['aria-label'], '조합기 (1)');
  assert.equal(navigation().props.headerHeight, 64);
  act(() => navigation().props.onSelect('knowledge'));
  assert.deepEqual(scrollCalls, [{ top: 0, behavior: 'instant' }]);
  assert.equal(navigation().props.selected, 'knowledge');
  assert.equal(composerTrigger().length, 0);
  assert.equal(tree!.root.findAllByType(PromptCartDrawer).length, 0);
  act(() => navigation().props.onSelect('knowledge'));
  assert.equal(scrollCalls.length, 1);
  height = 108;
  act(() => resizeHeader());
  assert.equal(navigation().props.headerHeight, 108);
  act(() => navigation().props.onSelect('design'));
  assert.deepEqual(scrollCalls[1], { top: 0, behavior: 'instant' });
  assert.equal(navigation().props.selected, 'design');
  assert.equal(composerTrigger()[0].props['aria-label'], '조합기 (1)');
  const composer = tree!.root.findByType(PromptCartDrawer);
  assert.equal(composer.props.isOpen, false);
  assert.deepEqual(composer.props.cart.map((item: { id: string }) => item.id), [selectedId]);
  assert.equal(composer.props.contextNote, '학습 목록');
});
