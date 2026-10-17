import assert from 'node:assert/strict';
import test, { type TestContext } from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { useClipboard } from '../src/hooks/useClipboard';
import { PROMPT_CART_STORAGE_KEY, usePromptCart } from '../src/hooks/usePromptCart';
import { TECHNIQUES } from '../src/data/techniques';
import { TechniqueCard } from '../src/components/TechniqueCard';
import { PromptCartDrawer } from '../src/components/PromptCartDrawer';

function replaceGlobal(t: TestContext, name: string, value: unknown) {
  const original = Object.getOwnPropertyDescriptor(globalThis, name);
  Object.defineProperty(globalThis, name, { configurable: true, value });
  t.after(() => {
    if (original) Object.defineProperty(globalThis, name, original);
    else Reflect.deleteProperty(globalThis, name);
  });
}

function mountHook<T, P>(hook: (props: P) => T, initialProps: P) {
  let current: T;
  function Probe({ value }: { value: P }) {
    current = hook(value);
    return null;
  }
  let tree: ReturnType<typeof create>;
  act(() => { tree = create(<Probe value={initialProps} />); });
  return {
    get current() { return current!; },
    update(value: P) { act(() => tree.update(<Probe value={value} />)); },
    unmount() { act(() => tree.unmount()); },
  };
}

function memoryStorage(initial?: string) {
  const values = new Map<string, string>();
  if (initial !== undefined) values.set(PROMPT_CART_STORAGE_KEY, initial);
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => { values.set(key, value); },
  };
}

test('copy reports success only after the clipboard promise resolves', async (t) => {
  let finish!: () => void;
  const copied: string[] = [];
  replaceGlobal(t, 'navigator', { clipboard: { writeText: (text: string) => {
    copied.push(text);
    return new Promise<void>((resolve) => { finish = resolve; });
  } } });
  const hook = mountHook((text: string) => useClipboard(text), '프롬프트 원문');
  t.after(() => hook.unmount());
  let pending!: Promise<void>;
  await act(async () => { pending = hook.current.copy(); });
  assert.equal(hook.current.status, 'copying');
  await act(async () => { finish(); await pending; });
  assert.equal(hook.current.status, 'copied');
  assert.deepEqual(copied, ['프롬프트 원문']);
});

test('permission rejection and an unavailable clipboard report failure; retry can succeed', async (t) => {
  let deny = true;
  const navigatorStub = { clipboard: { writeText: async () => {
    if (deny) throw new Error('NotAllowedError');
  } } };
  replaceGlobal(t, 'navigator', navigatorStub);
  const hook = mountHook((text: string) => useClipboard(text), 'copy me');
  t.after(() => hook.unmount());
  await act(async () => { await hook.current.copy(); });
  assert.equal(hook.current.status, 'error');
  deny = false;
  await act(async () => { await hook.current.copy(); });
  assert.equal(hook.current.status, 'copied');
  Reflect.deleteProperty(navigatorStub, 'clipboard');
  await act(async () => { await hook.current.copy(); });
  assert.equal(hook.current.status, 'error');
});

test('changing prompt invalidates an outstanding copy result and a previous success label', async (t) => {
  let finish!: () => void;
  replaceGlobal(t, 'navigator', { clipboard: { writeText: () => new Promise<void>((resolve) => {
    finish = resolve;
  }) } });
  const hook = mountHook((text: string) => useClipboard(text), 'old');
  t.after(() => hook.unmount());
  let pending!: Promise<void>;
  await act(async () => { pending = hook.current.copy(); });
  hook.update('new');
  await act(async () => { finish(); await pending; });
  assert.equal(hook.current.status, 'idle');
  await act(async () => { pending = hook.current.copy(); });
  await act(async () => { finish(); await pending; });
  assert.equal(hook.current.status, 'copied');
  hook.update('newer');
  assert.equal(hook.current.status, 'idle');
});

test('cart order, context, removal and clearing survive a fresh mount', (t) => {
  const storage = memoryStorage();
  replaceGlobal(t, 'localStorage', storage);
  let hook = mountHook(() => usePromptCart(), undefined);
  act(() => {
    hook.current.setCart([TECHNIQUES[4], TECHNIQUES[0]]);
    hook.current.setContextNote('랜딩페이지 메인 버튼');
  });
  assert.deepEqual(JSON.parse(storage.getItem(PROMPT_CART_STORAGE_KEY)!), {
    cartIds: [TECHNIQUES[4].id, TECHNIQUES[0].id], contextNote: '랜딩페이지 메인 버튼',
  });
  hook.unmount();
  hook = mountHook(() => usePromptCart(), undefined);
  assert.deepEqual(hook.current.cart, [TECHNIQUES[4], TECHNIQUES[0]]);
  assert.equal(hook.current.contextNote, '랜딩페이지 메인 버튼');
  act(() => hook.current.setCart((cart) => cart.filter((item) => item.id !== TECHNIQUES[4].id)));
  hook.unmount();
  hook = mountHook(() => usePromptCart(), undefined);
  assert.deepEqual(hook.current.cart, [TECHNIQUES[0]]);
  act(() => hook.current.setCart([]));
  hook.unmount();
  hook = mountHook(() => usePromptCart(), undefined);
  assert.deepEqual(hook.current.cart, []);
  assert.equal(hook.current.contextNote, '랜딩페이지 메인 버튼');
  hook.unmount();
});

test('corrupt storage cannot crash the app or inject stale technique content', (t) => {
  const storage = memoryStorage();
  replaceGlobal(t, 'localStorage', storage);
  for (const raw of ['{broken', 'null', '[]', '{"cartIds":42,"contextNote":"x"}', '{"cartIds":[1],"contextNote":"x"}']) {
    storage.setItem(PROMPT_CART_STORAGE_KEY, raw);
    const hook = mountHook(() => usePromptCart(), undefined);
    assert.deepEqual(hook.current.cart, []);
    assert.equal(hook.current.contextNote, '');
    hook.unmount();
  }
  storage.setItem(PROMPT_CART_STORAGE_KEY, JSON.stringify({
    cartIds: ['removed-technique', TECHNIQUES[0].id, TECHNIQUES[0].id],
    contextNote: '한글 메모', cart: [{ id: TECHNIQUES[0].id, promptSnippet: 'untrusted' }],
  }));
  const hook = mountHook(() => usePromptCart(), undefined);
  assert.deepEqual(hook.current.cart, [TECHNIQUES[0]]);
  assert.equal(hook.current.contextNote, '한글 메모');
  hook.unmount();
});

test('blocked storage keeps the composer usable and warns that persistence failed', (t) => {
  replaceGlobal(t, 'localStorage', {
    getItem() { throw new Error('SecurityError'); },
    setItem() { throw new Error('QuotaExceededError'); },
  });
  const hook = mountHook(() => usePromptCart(), undefined);
  t.after(() => hook.unmount());
  act(() => {
    hook.current.setCart([TECHNIQUES[0]]);
    hook.current.setContextNote('입력 유지');
  });
  assert.deepEqual(hook.current.cart, [TECHNIQUES[0]]);
  assert.equal(hook.current.contextNote, '입력 유지');
  assert.match(hook.current.storageError!, /저장할 수 없습니다/);
});

test('quota failure leaves prior saved state intact and the next successful edit clears the warning', (t) => {
  const storage = memoryStorage();
  const write = storage.setItem;
  replaceGlobal(t, 'localStorage', storage);
  const hook = mountHook(() => usePromptCart(), undefined);
  t.after(() => hook.unmount());
  act(() => hook.current.setContextNote('저장된 메모'));
  storage.setItem = () => { throw new Error('QuotaExceededError'); };
  act(() => hook.current.setContextNote('저장 실패 메모'));
  assert.equal(JSON.parse(storage.getItem(PROMPT_CART_STORAGE_KEY)!).contextNote, '저장된 메모');
  assert.notEqual(hook.current.storageError, null);
  storage.setItem = write;
  act(() => hook.current.setContextNote('다시 저장한 메모'));
  assert.equal(hook.current.storageError, null);
  assert.equal(JSON.parse(storage.getItem(PROMPT_CART_STORAGE_KEY)!).contextNote, '다시 저장한 메모');
});

function renderedText(node: { children: unknown[] } | string | number): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  return node.children.map((child) => renderedText(child as typeof node)).join('');
}

test('card and composer visibly report a failed copy without displaying success', async (t) => {
  replaceGlobal(t, 'navigator', { clipboard: { writeText: async () => { throw new Error('denied'); } } });
  for (const component of [
    <TechniqueCard item={TECHNIQUES[0]} isSelected={false} onToggleCart={() => {}} />,
    <PromptCartDrawer cart={[TECHNIQUES[0]]} contextNote="대시보드" onContextNoteChange={() => {}}
      storageError={null} isOpen onOpenChange={() => {}} onRemoveItem={() => {}} onClearCart={() => {}} />,
  ]) {
    let tree!: ReturnType<typeof create>;
    act(() => { tree = create(component); });
    const button = tree.root.findAllByType('button').find((node) => /프롬프트.*복사/.test(renderedText(node)))!;
    await act(async () => { await button.props.onClick(); });
    assert.match(renderedText(tree.root.findByProps({ role: 'alert' })), /복사하지 못했습니다/);
    assert.doesNotMatch(renderedText(tree.root), /복사됨!|복사 완료!/);
    assert.equal(button.props.disabled, false);
    act(() => tree.unmount());
  }
});

test('an empty composer disables copying and does not touch the clipboard', (t) => {
  let copies = 0;
  replaceGlobal(t, 'navigator', { clipboard: { writeText: async () => { copies += 1; } } });
  let tree!: ReturnType<typeof create>;
  act(() => {
    tree = create(<PromptCartDrawer cart={[]} contextNote="랜딩페이지" onContextNoteChange={() => {}}
      storageError={null} isOpen onOpenChange={() => {}} onRemoveItem={() => {}} onClearCart={() => {}} />);
  });
  const button = tree.root.findAllByType('button').find((node) => /프롬프트 전체 복사/.test(renderedText(node)))!;
  assert.equal(button.props.disabled, true);
  act(() => button.props.onClick());
  assert.equal(copies, 0);
  act(() => tree.unmount());
});

test('an absent or whitespace-only common target blocks copying at the button and handler', (t) => {
  let copies = 0;
  replaceGlobal(t, 'navigator', { clipboard: { writeText: async () => { copies += 1; } } });
  for (const contextNote of ['', '   ', '\t\n', '\u3000']) {
    let tree!: ReturnType<typeof create>;
    act(() => {
      tree = create(<PromptCartDrawer cart={[TECHNIQUES[0]]} contextNote={contextNote} onContextNoteChange={() => {}}
        storageError={null} isOpen onOpenChange={() => {}} onRemoveItem={() => {}} onClearCart={() => {}} />);
    });
    const button = tree.root.findAllByType('button').find((node) => /프롬프트 전체 복사/.test(renderedText(node)))!;
    assert.equal(button.props.disabled, true);
    assert.equal(tree.root.findByType('input').props['aria-invalid'], true);
    assert.match(renderedText(tree.root.findByProps({ id: 'prompt-target-help' })), /입력해야 복사/);
    assert.doesNotMatch(renderedText(tree.root.findByType('pre')), /공통 적용 대상:/);
    act(() => button.props.onClick());
    assert.equal(copies, 0);
    act(() => tree.unmount());
  }
});

test('entering a common target allows all selected styles and copies their scoped prompt in order', async (t) => {
  const copied: string[] = [];
  replaceGlobal(t, 'navigator', { clipboard: { writeText: async (text: string) => { copied.push(text); } } });
  const selected = ['st-neo-brutalism', 'st-linear-dark-minimal'].map((id) => TECHNIQUES.find((item) => item.id === id)!);
  function Composer() {
    const [contextNote, setContextNote] = React.useState('');
    return <PromptCartDrawer cart={selected} contextNote={contextNote} onContextNoteChange={setContextNote}
      storageError={null} isOpen onOpenChange={() => {}} onRemoveItem={() => {}} onClearCart={() => {}} />;
  }
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<Composer />); });
  t.after(() => { act(() => tree.unmount()); });
  const copyButton = () => tree.root.findAllByType('button').find((node) => /프롬프트 전체 복사|복사 완료/.test(renderedText(node)))!;
  act(() => tree.root.findByType('input').props.onChange({ target: { value: '  랜딩페이지 가격 카드  ' } }));
  assert.equal(copyButton().props.disabled, false);
  assert.equal(tree.root.findByType('input').props['aria-invalid'], false);
  const preview = renderedText(tree.root.findByType('pre'));
  assert.match(preview, /공통 적용 대상: 랜딩페이지 가격 카드\n/);
  assert.match(preview, /선택한 모든 기법은 위 대상 안에서만/);
  assert.match(preview, /대상 밖의 화면이나 컴포넌트는 변경하지/);
  assert.ok(preview.indexOf(selected[0].promptSnippet) < preview.indexOf(selected[1].promptSnippet));
  await act(async () => { copyButton().props.onClick(); });
  assert.deepEqual(copied, [preview]);
  assert.match(renderedText(copyButton()), /복사 완료/);
  act(() => tree.root.findByType('input').props.onChange({ target: { value: ' ' } }));
  assert.equal(copyButton().props.disabled, true);
  assert.doesNotMatch(renderedText(copyButton()), /복사 완료/);
  act(() => copyButton().props.onClick());
  assert.equal(copied.length, 1);
});
