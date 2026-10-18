import assert from 'node:assert/strict';
import test, { type TestContext } from 'node:test';
import React from 'react';
import { act, create, type ReactTestInstance } from 'react-test-renderer';
import { TECHNIQUES, getTechniqueText } from '@vibe-dictionary/catalog';
import { LocaleProvider, useLocale, LOCALE_STORAGE_KEY } from '../src/i18n/LocaleContext';
import { translateMessage } from '../src/i18n/messages';
import { LanguageSwitcher } from '../src/components/LanguageSwitcher';
import { TechniqueCard } from '../src/components/TechniqueCard';
import { PromptCartDrawer } from '../src/components/PromptCartDrawer';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';
import { usePromptCart, PROMPT_CART_STORAGE_KEY } from '../src/hooks/usePromptCart';

function replace(t: TestContext, key: string, value: unknown) {
  const original = Object.getOwnPropertyDescriptor(globalThis, key);
  Object.defineProperty(globalThis, key, { configurable: true, value });
  t.after(() => { if (original) Object.defineProperty(globalThis, key, original); else Reflect.deleteProperty(globalThis, key); });
}
function text(node: ReactTestInstance | string): string { return typeof node === 'string' ? node : node.children.map(child => text(child as ReactTestInstance | string)).join(''); }
function storage() {
  const values = new Map<string, string>();
  return { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => { values.set(key, value); } };
}
function LanguageControl() {
  const { locale, setLocale } = useLocale();
  return <select value={locale} onChange={event => setLocale(event.target.value as 'ko' | 'en')} />;
}

test('language changes survive remount, preserve cart IDs and target, and tolerate unavailable storage', t => {
  const saved = storage();
  replace(t, 'localStorage', saved);
  let current!: ReturnType<typeof usePromptCart>;
  function Probe() { current = usePromptCart(); return <LanguageControl />; }
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<LocaleProvider><Probe /></LocaleProvider>); });
  act(() => { current.setCart([TECHNIQUES[0]]); current.setContextNote('랜딩페이지 CTA'); });
  const originalCart = saved.getItem(PROMPT_CART_STORAGE_KEY);
  act(() => tree.root.findByType('select').props.onChange({ target: { value: 'en' } }));
  assert.equal(saved.getItem(LOCALE_STORAGE_KEY), 'en');
  assert.equal(saved.getItem(PROMPT_CART_STORAGE_KEY), originalCart);
  assert.equal(current.contextNote, '랜딩페이지 CTA');
  act(() => tree.unmount());
  act(() => { tree = create(<LocaleProvider><Probe /></LocaleProvider>); });
  assert.equal(tree.root.findByType('select').props.value, 'en');
  assert.equal(current.cart[0].id, TECHNIQUES[0].id);
  assert.equal(current.contextNote, '랜딩페이지 CTA');
  act(() => tree.unmount());
  replace(t, 'localStorage', { getItem() { throw Error('blocked'); }, setItem() { throw Error('blocked'); } });
  act(() => { tree = create(<LocaleProvider><LanguageControl /></LocaleProvider>); });
  assert.equal(tree.root.findByType('select').props.value, 'ko');
  act(() => tree.root.findByType('select').props.onChange({ target: { value: 'en' } }));
  assert.equal(tree.root.findByType('select').props.value, 'en');
  act(() => tree.unmount());
});

test('switching a card language copies the selected original and invalidates a pending result', async t => {
  replace(t, 'localStorage', storage());
  const copies: string[] = [];
  let finish!: () => void;
  replace(t, 'navigator', { clipboard: { writeText(value: string) { copies.push(value); return new Promise<void>(resolve => { finish = resolve; }); } } });
  const item = TECHNIQUES[0];
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<LocaleProvider><LanguageControl /><TechniqueCard item={item} isSelected={false} onToggleCart={() => {}} /></LocaleProvider>); });
  t.after(() => act(() => tree.unmount()));
  let button = tree.root.findAllByType('button').find(node => text(node) === '프롬프트 복사')!;
  await act(async () => { button.props.onClick(); });
  const finishKorean = finish;
  act(() => tree.root.findByType('select').props.onChange({ target: { value: 'en' } }));
  await act(async () => { finishKorean(); });
  assert.equal(tree.root.findByType('h3').children.join(''), item.titleEn);
  assert.equal(tree.root.findAllByType('button').some(node => text(node) === 'Copied!'), false);
  button = tree.root.findAllByType('button').find(node => text(node) === 'Copy prompt')!;
  await act(async () => { button.props.onClick(); });
  await act(async () => { finish(); });
  assert.equal(copies[0], `[${item.titleKo} / ${item.titleEn}]\n${item.promptSnippet}`);
  assert.equal(copies[1], `[${item.titleEn}]\n${getTechniqueText(item, 'en').promptSnippet}`);
  assert.ok(tree.root.findAllByType('button').some(node => text(node) === 'Copied!'));
});

test('English composer keeps selection order, target scope and blank-target guard', async t => {
  replace(t, 'localStorage', storage());
  const copied: string[] = [];
  replace(t, 'navigator', { clipboard: { writeText: async (value: string) => { copied.push(value); } } });
  const cart = [TECHNIQUES[4], TECHNIQUES[0]];
  function Composer() {
    const [target, setTarget] = React.useState('');
    return <PromptCartDrawer cart={cart} contextNote={target} onContextNoteChange={setTarget} storageError={null} isOpen onOpenChange={() => {}} onRemoveItem={() => {}} onClearCart={() => {}} />;
  }
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<LocaleProvider initialLocale="en"><Composer /></LocaleProvider>); });
  t.after(() => act(() => tree.unmount()));
  const copyButton = () => tree.root.findAllByType('button').find(node => /Copy combined prompt|Copied!/.test(text(node)))!;
  for (const value of ['', '   ']) {
    act(() => tree.root.findByType('input').props.onChange({ target: { value } }));
    assert.equal(copyButton().props.disabled, true);
    act(() => copyButton().props.onClick());
  }
  assert.equal(copied.length, 0);
  act(() => tree.root.findByType('input').props.onChange({ target: { value: '  landing-page CTA  ' } }));
  const preview = text(tree.root.findByType('pre'));
  assert.match(preview, /Shared target: landing-page CTA/);
  assert.match(preview, /only within the target/);
  assert.match(preview, /Preserve existing behavior unrelated/);
  assert.ok(preview.indexOf(getTechniqueText(cart[0], 'en').promptSnippet) < preview.indexOf(getTechniqueText(cart[1], 'en').promptSnippet));
  assert.doesNotMatch(preview, /[가-힣]/);
  await act(async () => { copyButton().props.onClick(); });
  assert.deepEqual(copied, [preview]);
});

test('every demo renders in English through initial, click and timer states', t => {
  replace(t, 'localStorage', storage());
  t.mock.timers.enable({ apis: ['setTimeout', 'setInterval'] });
  replace(t, 'window', { setTimeout, clearTimeout, setInterval, clearInterval });
  replace(t, 'requestAnimationFrame', () => 1);
  replace(t, 'cancelAnimationFrame', () => {});
  for (const item of TECHNIQUES) {
    let tree!: ReturnType<typeof create>;
    act(() => { tree = create(<LocaleProvider initialLocale="en"><InteractiveDemo techniqueId={item.id} /></LocaleProvider>); });
    try {
      const assertEnglish = () => assert.doesNotMatch(JSON.stringify(tree.toJSON()), /[가-힣]/, item.id);
      assertEnglish();
      const click = tree.root.findAll(node => typeof node.type === 'string' && typeof node.props.onClick === 'function')[0];
      if (click) {
        act(() => click.props.onClick({ stopPropagation() {}, preventDefault() {}, clientX: 50, clientY: 30, currentTarget: { getBoundingClientRect: () => ({ left: 0, top: 0, width: 200, height: 100 }) } }));
        assertEnglish();
      }
      for (let i = 0; i < 3; i++) { act(() => t.mock.timers.tick(1100)); assertEnglish(); }
    } finally { act(() => tree.unmount()); }
  }
});

test('dynamic demo messages translate placeholders without changing arbitrary user text', () => {
  assert.equal(translateMessage('en', 'demo.toast.newNotification', { number: 42 }), 'New notification #42');
  assert.equal(translateMessage('en', 'demo.hold.progress', { percent: 55 }), 'Holding... 55%');
  assert.equal(translateMessage('en', 'search.noResults', { query: '랜딩페이지 CTA' }), 'No results for "랜딩페이지 CTA" in this section.');
});



test('language menu selects and persists a language, then closes and restores focus', t => {
  const saved = storage();
  replace(t, 'localStorage', saved);
  let focused = '';
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<LocaleProvider><LanguageSwitcher /></LocaleProvider>, {
    createNodeMock: element => ({ focus() { focused = element.props['aria-label']; } }),
  }); });
  t.after(() => act(() => tree.unmount()));
  const trigger = () => tree.root.findByProps({ 'aria-haspopup': 'menu' });
  assert.equal(tree.root.findAllByType('select').length, 0);
  assert.equal(trigger().props['aria-expanded'], false);
  assert.equal(tree.root.findAllByProps({ role: 'menu' }).length, 0);
  act(() => trigger().props.onClick());
  assert.equal(focused, '한국어');
  assert.equal(tree.root.findByProps({ role: 'menuitemradio', 'aria-label': '한국어' }).props['aria-checked'], true);
  act(() => tree.root.findByProps({ role: 'menuitemradio', 'aria-label': 'English' }).props.onClick());
  assert.equal(saved.getItem(LOCALE_STORAGE_KEY), 'en');
  assert.equal(trigger().props['aria-expanded'], false);
  assert.equal(focused, '언어 선택: 한국어');
  assert.match(trigger().props['aria-label'], /Language: English/);
  act(() => trigger().props.onClick());
  assert.equal(focused, 'English');
  assert.equal(tree.root.findByProps({ role: 'menuitemradio', 'aria-label': 'English' }).props['aria-checked'], true);
});

test('language menu supports arrow navigation, Escape, Tab, outside clicks and focus exit', t => {
  replace(t, 'localStorage', storage());
  const listeners = new Map<string, (event: unknown) => void>();
  replace(t, 'document', { documentElement: {}, addEventListener: (name: string, fn: (event: unknown) => void) => listeners.set(name, fn),
    removeEventListener: (name: string) => listeners.delete(name) });
  const nodes = new Set<unknown>();
  let focused: unknown;
  let focusedLabel = '';
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<LocaleProvider><LanguageSwitcher /></LocaleProvider>, {
    createNodeMock: element => {
      const node = { focus() { focused = node; focusedLabel = element.props['aria-label']; }, contains: (target: unknown) => nodes.has(target) };
      nodes.add(node);
      return node;
    },
  }); });
  t.after(() => act(() => tree.unmount()));
  const trigger = () => tree.root.findByProps({ 'aria-haspopup': 'menu' });
  const key = (value: string) => { act(() => tree.root.findByProps({ role: 'menu' }).props.onKeyDown({ key: value, target: focused, preventDefault() {} })); };
  act(() => trigger().props.onKeyDown({ key: 'ArrowUp', preventDefault() {} }));
  assert.equal(focusedLabel, 'English');
  key('ArrowDown'); assert.equal(focusedLabel, '한국어');
  key('End'); assert.equal(focusedLabel, 'English');
  key('Home'); assert.equal(focusedLabel, '한국어');
  key('Escape'); assert.equal(trigger().props['aria-expanded'], false);
  assert.equal(focusedLabel, '언어 선택: 한국어');
  assert.equal(listeners.has('pointerdown'), false);
  act(() => trigger().props.onClick());
  act(() => listeners.get('pointerdown')!({ target: focused }));
  assert.equal(trigger().props['aria-expanded'], true);
  act(() => listeners.get('pointerdown')!({ target: {} }));
  assert.equal(trigger().props['aria-expanded'], false);
  act(() => trigger().props.onClick());
  key('Tab'); assert.equal(trigger().props['aria-expanded'], false);
  act(() => trigger().props.onClick());
  const root = tree.root.findAllByType('div').find(node => node.props.onBlur)!;
  act(() => root.props.onBlur({ currentTarget: { contains: () => false }, relatedTarget: {} }));
  assert.equal(trigger().props['aria-expanded'], false);
});

test('stateful demo copy changes language without resetting card order, notifications or selection', t => {
  replace(t, 'localStorage', storage());
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<LocaleProvider><LanguageControl /><InteractiveDemo techniqueId="stacked-card-cycle" /><InteractiveDemo techniqueId="toast-slide-stack" /><InteractiveDemo techniqueId="gooey-menu-fab" /></LocaleProvider>); });
  t.after(() => act(() => tree.unmount()));
  const deck = tree.root.findAll(node => node.props.className === 'relative w-full h-40 flex items-center justify-center pt-3 cursor-pointer select-none')[0];
  act(() => deck.props.onClick());
  const toast = tree.root.findAll(node => typeof node.type === 'string' && node.props.className === 'w-full h-40 flex flex-col justify-between pt-9 pb-3 px-4 cursor-pointer select-none')[0];
  act(() => toast.props.onClick());
  const action = tree.root.findAllByType('button').find(node => node.props.title === '런칭')!;
  act(() => action.props.onClick());
  assert.match(text(tree.root), /런칭 액션 선택됨/);
  act(() => tree.root.findByType('select').props.onChange({ target: { value: 'en' } }));
  const english = text(tree.root);
  assert.doesNotMatch(english, /[가-힣]/);
  assert.match(english, /New notification #\d+/);
  assert.match(english, /Launch action selected/);
  assert.ok(english.indexOf('Card 2 (click to cycle)') < english.indexOf('Card 3 (click to cycle)'));
  assert.ok(english.indexOf('Card 3 (click to cycle)') < english.indexOf('Card 1 (click to cycle)'));
  act(() => tree.root.findByType('select').props.onChange({ target: { value: 'ko' } }));
  assert.match(text(tree.root), /런칭 액션 선택됨/);
  assert.match(text(tree.root), /새 알림 도착 #\d+/);
});
