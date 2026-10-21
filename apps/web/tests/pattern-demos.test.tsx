import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';
import { TECHNIQUES, getTechniqueText, searchTechniques } from '@vibe-dictionary/catalog';

test('lightbox switches images, clamps pan, handles swipe cancellation, and closes through Escape', t => {
  let tree!: ReturnType<typeof create>;
  let focused = false;
  act(() => { tree = create(<InteractiveDemo techniqueId="zoom-lightbox-gallery" />, { createNodeMock: element => element.props.className === 'pd-gallery' ? { querySelector: () => ({ focus() { focused = true; } }) } : null }); });
  t.after(() => act(() => tree.unmount()));
  const button = (name: string) => tree.root.findByProps({ 'aria-label': name });
  act(() => button('사막 이미지 열기').props.onClick());
  assert.equal(tree.root.findByProps({ className: 'pd-image-name' }).children.join(''), '사막');
  act(() => button('이미지 확대·축소').props.onClick());
  assert.equal(button('이미지 확대·축소').props['aria-pressed'], true);
  const art = () => tree.root.findAll(node => node.props['data-demo-input'])[0];
  const target = { setPointerCapture() {}, releasePointerCapture() {} };
  const pointer = (clientX: number, clientY = 0, pointerId = 1) => ({ clientX, clientY, pointerId, isPrimary: true, button: 0, currentTarget: target });
  act(() => art().props.onPointerDown(pointer(0)));
  act(() => art().props.onPointerMove(pointer(500, -500)));
  assert.equal(art().findAllByType('div')[1].props.style.transform, 'translate(35px, -20px) scale(1.65)');
  act(() => art().props.onPointerCancel());
  act(() => art().props.onPointerMove(pointer(-500)));
  assert.equal(art().findAllByType('div')[1].props.style.transform, 'translate(35px, -20px) scale(1.65)');
  act(() => button('다음 이미지').props.onClick());
  assert.equal(tree.root.findByProps({ className: 'pd-image-name' }).children.join(''), '능선');
  assert.equal(button('이미지 확대·축소').props['aria-pressed'], false);
  act(() => art().props.onPointerDown(pointer(100)));
  act(() => art().props.onPointerUp(pointer(0)));
  assert.equal(tree.root.findByProps({ className: 'pd-image-name' }).children.join(''), '해안');
  act(() => tree.root.findByProps({ className: 'pd-gallery' }).props.onKeyDown({ key: 'Escape' }));
  assert.equal(tree.root.findAllByProps({ className: 'pd-lightbox' }).length, 0);
  assert.equal(focused, true);
});

test('inline editing trims saved names, rejects blank input, and cancels drafts without changing the saved name', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId="inline-edit-field" />); });
  t.after(() => act(() => tree.unmount()));
  const button = (name: string) => tree.root.findByProps({ 'aria-label': name });
  const change = (value: string) => act(() => tree.root.findByType('input').props.onChange({ target: { value } }));
  const submit = () => act(() => tree.root.findByType('form').props.onSubmit({ preventDefault() {} }));
  act(() => button('프로젝트 이름 편집').props.onClick());
  change('   '); assert.equal(button('이름 저장').props.disabled, true);
  submit(); assert.equal(tree.root.findAllByType('input').length, 1);
  change('  나의 여행  '); submit();
  assert.equal(button('프로젝트 이름 편집').findByType('strong').children.join(''), '나의 여행');
  act(() => button('프로젝트 이름 편집').props.onClick());
  change('버릴 이름');
  act(() => button('편집 취소').props.onClick());
  assert.equal(button('프로젝트 이름 편집').findByType('strong').children.join(''), '나의 여행');
  act(() => button('프로젝트 이름 편집').props.onClick());
  change('다른 이름');
  act(() => tree.root.findByType('input').props.onKeyDown({ key: 'Escape' }));
  assert.equal(button('프로젝트 이름 편집').findByType('strong').children.join(''), '나의 여행');
});

test('selection formatting applies only to the real selected substring without mutating React-owned DOM', t => {
  const node = {};
  const makeRange = () => {
    let prefix = false;
    return { startContainer: node, startOffset: 3,
      cloneRange: () => makeRange(), selectNodeContents() { prefix = true; }, setEnd() {},
      toString: () => prefix ? '좋은 ' : '디자인',
      getBoundingClientRect: () => ({ left: 20, top: 50, width: 30 }),
    };
  };
  let cleared = false;
  let collapsed = false;
  const owner = new EventTarget();
  const previous = Object.getOwnPropertyDescriptor(globalThis, 'window');
  const previousDocument = Object.getOwnPropertyDescriptor(globalThis, 'document');
  Object.defineProperty(globalThis, 'document', { configurable: true, value: owner });
  Object.defineProperty(globalThis, 'window', { configurable: true, value: { getSelection: () => ({
    isCollapsed: collapsed, anchorNode: node, focusNode: node, getRangeAt: makeRange, removeAllRanges() { cleared = true; },
  }) } });
  t.after(() => { if (previous) Object.defineProperty(globalThis, 'window', previous); else Reflect.deleteProperty(globalThis, 'window'); });
  t.after(() => { if (previousDocument) Object.defineProperty(globalThis, 'document', previousDocument); else Reflect.deleteProperty(globalThis, 'document'); });
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId="selection-bubble-toolbar" />, { createNodeMock: element => {
    if (element.type === 'p') return { contains: (candidate: unknown) => candidate === node };
    if (element.props.className === 'pd-selection') return { getBoundingClientRect: () => ({ left: 0, top: 0, width: 200 }) };
    return null;
  } }); });
  t.after(() => act(() => tree.unmount()));
  act(() => tree.root.findByProps({ className: 'pd-selection' }).props.onPointerUp());
  assert.equal(tree.root.findByProps({ role: 'toolbar' }).props.hidden, false);
  act(() => { collapsed = true; owner.dispatchEvent(new Event('selectionchange')); });
  assert.equal(tree.root.findByProps({ role: 'toolbar' }).props.hidden, true, 'clearing selection outside the paragraph closes the toolbar');
  act(() => { collapsed = false; tree.root.findByProps({ className: 'pd-selection' }).props.onPointerUp(); });
  act(() => tree.root.findByType('button').props.onClick());
  assert.equal(tree.root.findByType('strong').children.join(''), '디자인');
  assert.equal(cleared, true);
  assert.equal(tree.root.findByProps({ role: 'toolbar' }).props.hidden, true);
});

test('hover preview stays open while focus moves inside and supports touch toggles and Escape', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId="rich-hover-preview" />); });
  t.after(() => act(() => tree.unmount()));
  const button = () => tree.root.findByType('button');
  const surface = () => tree.root.findByProps({ className: 'pd-hover-surface' });
  act(() => button().props.onPointerDown());
  act(() => button().props.onFocus());
  act(() => button().props.onClick({ detail: 1 }));
  assert.equal(button().props['aria-expanded'], true, 'first touch opens despite focus preceding click');
  act(() => surface().props.onBlur({ currentTarget: { contains: () => true } }));
  assert.equal(button().props['aria-expanded'], true);
  act(() => button().props.onPointerDown());
  act(() => button().props.onClick({ detail: 1 }));
  assert.equal(button().props['aria-expanded'], false);
  act(() => surface().props.onMouseEnter());
  act(() => button().props.onKeyDown({ key: 'Escape' }));
  assert.equal(button().props['aria-expanded'], false);
});

test('all five new patterns have Korean and English queries, distinct prompts, and accurate simulation limits', () => {
  const queries = [
    ['zoom-lightbox-gallery', '라이트박스', 'lightbox gallery'],
    ['selection-bubble-toolbar', '버블 메뉴', 'selection toolbar'],
    ['ly-collapsing-scroll-header', '스크롤 압축 헤더', 'collapsing app bar'],
    ['rich-hover-preview', '프로필 미리보기', 'hover card'],
    ['inline-edit-field', '인라인 편집', 'inline edit'],
  ];
  for (const [id, ko, en] of queries) {
    const item = TECHNIQUES.find(item => item.id === id)!;
    assert.ok(item);
    for (const query of [ko, en]) assert.equal(searchTechniques({ query })[0]?.item.id, id);
    if (id === 'ly-collapsing-scroll-header') {
      assert.match(getTechniqueText(item, 'en').promptSnippet, /8 seconds/);
      assert.match(item.promptSnippet, /8초/);
    } else {
      assert.doesNotMatch(getTechniqueText(item, 'en').promptSnippet, /8-second|8 seconds/);
      assert.doesNotMatch(item.promptSnippet, /8초/);
    }
  }
});
