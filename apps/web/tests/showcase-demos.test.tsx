import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { TECHNIQUES, getTechniqueText, searchTechniques } from '@vibe-dictionary/catalog';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';
import { LocaleProvider, useLocale } from '../src/i18n/LocaleContext';

const ids = ['mg-lenticular-strip-poster', 'st-fluted-glass-panel', 'polaroid-photo-develop', 'sticker-corner-peel', 'accordion-image-gallery'];

test('new designs can be found by Korean and English names with complete prompts', () => {
  for (const id of ids) {
    const item = TECHNIQUES.find(item => item.id === id)!;
    assert.ok(item);
    for (const locale of ['ko', 'en'] as const) {
      const localized = getTechniqueText(item, locale);
      assert.equal(searchTechniques({ query: localized.title })[0]?.item.id, id);
      assert.ok(localized.promptSnippet.length > 300);
    }
  }
});

test('gallery keeps exactly one expanded panel and preserves selection when language changes', t => {
  let changeLocale!: ReturnType<typeof useLocale>['setLocale'];
  function Probe() { changeLocale = useLocale().setLocale; return <InteractiveDemo techniqueId="accordion-image-gallery" />; }
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<LocaleProvider><Probe /></LocaleProvider>); });
  t.after(() => act(() => tree.unmount()));
  const buttons = () => tree.root.findAllByType('button');
  assert.deepEqual(buttons().map(button => button.props['aria-pressed']), [true, false, false]);
  act(() => buttons()[2].props.onClick());
  assert.deepEqual(buttons().map(button => button.props.style.flexGrow), [1, 1, 4]);
  act(() => changeLocale('en'));
  assert.equal(buttons()[2].props['aria-label'], 'Ocean');
  assert.deepEqual(buttons().map(button => button.props['aria-pressed']), [false, false, true]);
  act(() => buttons()[0].props.onClick());
  assert.deepEqual(buttons().map(button => button.props.style.flexGrow), [4, 1, 1]);
});

test('sticker pin toggles without changing a second instance', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId="sticker-corner-peel" /><InteractiveDemo techniqueId="sticker-corner-peel" /></>); });
  t.after(() => act(() => tree.unmount()));
  const buttons = tree.root.findAllByType('button');
  act(() => buttons[0].props.onClick());
  assert.equal(buttons[0].props['aria-pressed'], true);
  assert.equal(buttons[1].props['aria-pressed'], false);
  act(() => buttons[0].props.onClick());
  assert.equal(buttons[0].props['data-peeled'], false);
});

test('lenticular clips are isolated when multiple cards mount', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InteractiveDemo techniqueId={ids[0]} /><InteractiveDemo techniqueId={ids[0]} /></>); });
  t.after(() => act(() => tree.unmount()));
  const clips = tree.root.findAllByType('clipPath');
  assert.notEqual(clips[0].props.id, clips[1].props.id);
  for (const svg of tree.root.findAllByType('svg')) {
    const clip = svg.findByType('clipPath');
    assert.equal(clip.findAllByType('rect').length, 28);
    assert.equal(svg.findByType('g').props.clipPath, `url(#${clip.props.id})`);
  }
});
