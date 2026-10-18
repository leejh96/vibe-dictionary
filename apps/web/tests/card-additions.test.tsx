import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { SelectableCardDemo, ProductSwatchDemo, FoldoutCardDemo, MediaActionCardDemo } from '../src/components/demos/card/CardDemos';
import { SwipeActionCardDemo } from '../src/components/demos/card/SwipeActionCard';
import { TECHNIQUES, matchesSearch } from '@vibe-dictionary/catalog';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';
import { LocaleProvider, useLocale } from '../src/i18n/LocaleContext';

test('card category adds exactly ten unique searchable techniques with mapped demos and no helper captions', () => {
  const originalIds = new Set(['card-flip-3d', 'tilt-3d-card', 'glassmorphism-card', 'spotlight-border-card', 'stacked-card-cycle']);
  const additions = TECHNIQUES.filter(item => item.category === 'card' && !originalIds.has(item.id));
  assert.equal(additions.length, 10);
  assert.equal(new Set(TECHNIQUES.map(item => item.id)).size, TECHNIQUES.length);
  for (const item of additions) {
    assert.ok(item.promptSnippet.trim());
    assert.ok(matchesSearch(item, item.titleKo));
    let tree!: ReturnType<typeof create>;
    act(() => { tree = create(<InteractiveDemo techniqueId={item.id} />); });
    assert.notEqual(tree.toJSON(), null, `${item.id} must resolve to a demo`);
    assert.equal(tree.root.findAllByType('p').length, 0);
    assert.equal(tree.root.findAllByProps({ role: 'status' }).length, 0);
    act(() => tree.unmount());
  }
});

test('swipe card clamps movement, snaps at the midpoint and cancels back to its starting position', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<SwipeActionCardDemo />); });
  t.after(() => { act(() => tree.unmount()); });
  const front = () => tree.root.findByProps({ className: 'cd-swipe-front' });
  const save = () => tree.root.findByProps({ className: 'cd-swipe-save' });
  const target = { setPointerCapture() {}, hasPointerCapture: () => true, releasePointerCapture() {} };
  const event = (clientX: number) => ({ button: 0, isPrimary: true, pointerId: 1, clientX, currentTarget: target });
  assert.equal(save().props.disabled, true);
  act(() => front().props.onPointerDown(event(100)));
  act(() => front().props.onPointerMove(event(80)));
  act(() => front().props.onPointerUp(event(80)));
  assert.equal(front().props['aria-expanded'], false);
  act(() => front().props.onClick({ detail: 1 }));
  assert.equal(front().props['aria-expanded'], false);
  act(() => front().props.onPointerDown(event(100)));
  act(() => front().props.onPointerMove(event(-100)));
  assert.equal(front().props.style.transform, 'translateX(-64px)');
  act(() => front().props.onPointerUp(event(65)));
  act(() => front().props.onClick({ detail: 1 }));
  assert.equal(front().props['aria-expanded'], true);
  assert.equal(save().props.disabled, false);
  act(() => save().props.onClick());
  assert.equal(save().props['aria-pressed'], true);
  act(() => front().props.onPointerDown(event(0)));
  act(() => front().props.onPointerMove(event(100)));
  act(() => front().props.onPointerCancel(event(100)));
  act(() => front().props.onClick({ detail: 1 }));
  assert.equal(front().props.style.transform, 'translateX(-64px)');
  act(() => front().props.onKeyDown({ key: 'Escape', preventDefault() {} }));
  assert.equal(save().props.disabled, true);
  assert.equal(save().props.tabIndex, -1);
  assert.equal(save().props['aria-pressed'], true);
  act(() => front().props.onPointerDown(event(100)));
  act(() => front().props.onPointerMove(event(40)));
  act(() => front().props.onLostPointerCapture(event(40)));
  act(() => front().props.onClick({ detail: 1 }));
  assert.equal(front().props['aria-expanded'], false);
  act(() => front().props.onPointerDown(event(100)));
  act(() => front().props.onPointerMove({ ...event(0), pointerId: 2 }));
  assert.equal(front().props.style.transform, 'translateX(0px)');
  act(() => front().props.onPointerMove(event(0)));
  act(() => front().props.onKeyDown({ key: 'Escape', preventDefault() {}, currentTarget: target }));
  act(() => front().props.onPointerUp(event(0)));
  act(() => front().props.onClick({ detail: 1 }));
  assert.equal(front().props['aria-expanded'], false);
});

test('media card actions toggle independently without adding a result caption', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<MediaActionCardDemo />); });
  t.after(() => { act(() => tree.unmount()); });
  const buttons = () => tree.root.findAllByType('button');
  assert.deepEqual(buttons().map(b => b.props['aria-pressed']), [false, false]);
  act(() => buttons()[0].props.onClick());
  assert.deepEqual(buttons().map(b => b.props['aria-pressed']), [true, false]);
  act(() => buttons()[1].props.onClick());
  assert.deepEqual(buttons().map(b => b.props['aria-pressed']), [true, true]);
  act(() => buttons()[0].props.onClick());
  assert.deepEqual(buttons().map(b => b.props['aria-pressed']), [false, true]);
  assert.equal(tree.root.findAllByProps({ role: 'status' }).length, 0);
  assert.equal(tree.root.findAllByType('p').length, 0);
});

test('foldout card exposes its image only while expanded and closes on repeated input', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<FoldoutCardDemo />); });
  t.after(() => { act(() => tree.unmount()); });
  const button = () => tree.root.findByType('button');
  const page = () => tree.root.findByProps({ role: 'img' });
  assert.equal(button().props['aria-controls'], page().props.id);
  assert.equal(button().props['aria-expanded'], false);
  assert.equal(page().props['aria-hidden'], true);
  act(() => button().props.onClick());
  assert.equal(button().props['aria-expanded'], true);
  assert.equal(page().props['aria-hidden'], false);
  act(() => button().props.onClick());
  assert.equal(button().props['aria-expanded'], false);
  assert.equal(page().props['aria-hidden'], true);
});

test('product swatches update object color and visible selection together', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<ProductSwatchDemo />); });
  t.after(() => { act(() => tree.unmount()); });
  const buttons = () => tree.root.findAllByType('button');
  assert.deepEqual(buttons().map(b => b.props['aria-pressed']), [true, false, false]);
  act(() => buttons()[1].props.onClick());
  assert.deepEqual(buttons().map(b => b.props['aria-pressed']), [false, true, false]);
  assert.equal(tree.root.findByProps({ className: 'cd-detail' }).children.join(''), '코랄');
  assert.ok(tree.root.findByProps({ className: 'cd-product-card cd-tone-rust' }));
});

test('radio cards keep exactly one selection and isolate group names', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><SelectableCardDemo /><SelectableCardDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const radios = () => tree.root.findAllByType('input');
  assert.deepEqual(radios().map(r => r.props.checked), [true, false, true, false]);
  assert.equal(radios()[0].props.name, radios()[1].props.name);
  assert.notEqual(radios()[0].props.name, radios()[2].props.name);
  act(() => radios()[1].props.onChange());
  assert.deepEqual(radios().map(r => r.props.checked), [false, true, true, false]);
  act(() => radios()[1].props.onChange());
  assert.deepEqual(radios().map(r => r.props.checked), [false, true, true, false]);
  assert.equal(tree.root.findAllByProps({ role: 'status' }).length, 0);
});

test('card language switching translates selected labels and actions while preserving controls', t => {
  let setLocale!: ReturnType<typeof useLocale>['setLocale'];
  function DemoGroup() {
    setLocale = useLocale().setLocale;
    return <><ProductSwatchDemo /><SelectableCardDemo /><MediaActionCardDemo /><FoldoutCardDemo /><SwipeActionCardDemo /></>;
  }
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<LocaleProvider initialLocale="ko"><DemoGroup /></LocaleProvider>); });
  t.after(() => { act(() => tree.unmount()); });
  const swatches = () => tree.root.findAllByProps({ className: 'cd-swatch cd-tone-rust' });
  const radio = () => tree.root.findAllByType('input');
  const fold = () => tree.root.findByProps({ className: 'cd-fold-card' });
  const front = () => tree.root.findByProps({ className: 'cd-swipe-front' });
  const save = () => tree.root.findByProps({ className: 'cd-swipe-save' });
  const media = () => tree.root.findByProps({ className: 'cd-media-actions' }).findAllByType('button');
  const radioName = radio()[0].props.name;
  const foldContentId = fold().props['aria-controls'];
  const swipeActionId = front().props['aria-controls'];
  act(() => {
    swatches()[0].props.onClick();
    radio()[1].props.onChange();
    media()[0].props.onClick();
    media()[1].props.onClick();
    fold().props.onClick();
    front().props.onClick({ detail: 0 });
  });
  act(() => save().props.onClick());
  act(() => setLocale('en'));
  assert.equal(swatches()[0].props['aria-label'], 'Coral');
  assert.equal(swatches()[0].props['aria-pressed'], true);
  assert.equal(tree.root.findByProps({ className: 'cd-product-heading' }).findByProps({ className: 'cd-detail' }).children.join(''), 'Coral');
  assert.deepEqual(radio().map(r => r.props.checked), [false, true]);
  assert.equal(radio()[0].props.name, radioName);
  assert.deepEqual(tree.root.findByProps({ className: 'cd-plan-grid' }).findAllByType('strong').map(node => node.children.join('')), ['Personal', 'Team']);
  assert.deepEqual(media().map(button => button.props['aria-label']), ['Save collection', 'Like collection']);
  assert.deepEqual(media().map(button => button.props['aria-pressed']), [true, true]);
  assert.equal(fold().props['aria-expanded'], true);
  assert.equal(fold().props['aria-label'], 'Fold travel album');
  assert.equal(fold().props['aria-controls'], foldContentId);
  assert.equal(front().props['aria-expanded'], true);
  assert.equal(front().props['aria-label'], 'Open or close reading list actions');
  assert.equal(front().props['aria-controls'], swipeActionId);
  assert.equal(front().props.style.transform, 'translateX(-64px)');
  assert.equal(save().props['aria-pressed'], true);
  assert.equal(save().props['aria-label'], 'Save reading list');
  act(() => setLocale('ko'));
  assert.equal(swatches()[0].props['aria-label'], '코랄');
  assert.equal(swatches()[0].props['aria-pressed'], true);
  assert.deepEqual(radio().map(r => r.props.checked), [false, true]);
  assert.equal(fold().props['aria-expanded'], true);
  assert.equal(fold().props['aria-label'], '여행 앨범 접기');
  assert.equal(save().props['aria-pressed'], true);
});
