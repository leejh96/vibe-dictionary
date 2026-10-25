import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { TECHNIQUES, getTechniqueText, searchTechniques } from '@vibe-dictionary/catalog';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';
import { LocaleProvider, useLocale } from '../src/i18n/LocaleContext';

const ids = ['mg-lenticular-strip-poster', 'st-fluted-glass-panel', 'polaroid-photo-develop', 'sticker-corner-peel', 'accordion-image-gallery'];
const signatureIds = [
  'envelope-invitation-reveal',
  'cylinder-card-carousel',
  'liquid-wave-progress-orb',
  'mg-glass-shatter-transition',
  'mg-black-hole-accretion-disk',
  'mg-infinite-zoom-frames',
  'mg-ink-wash-enso-stroke',
  'st-mother-of-pearl-inlay',
  'st-thermal-imaging-view',
  'vd-crt-power-off',
];

test('new designs can be found by Korean and English names with complete prompts', () => {
  for (const id of [...ids, ...signatureIds]) {
    const item = TECHNIQUES.find(item => item.id === id)!;
    assert.ok(item);
    for (const locale of ['ko', 'en'] as const) {
      const localized = getTechniqueText(item, locale);
      assert.equal(searchTechniques({ query: localized.title })[0]?.item.id, id);
      assert.ok(localized.promptSnippet.length > 300);
    }
  }
});

test('signature additions render mapped scenes without helper captions and isolate SVG ids', () => {
  assert.equal(signatureIds.length, 10);
  for (const id of signatureIds) {
    let tree!: ReturnType<typeof create>;
    act(() => { tree = create(<><InteractiveDemo techniqueId={id} /><InteractiveDemo techniqueId={id} /></>); });
    assert.notEqual(tree.toJSON(), null, `${id} must resolve to a demo`);
    assert.equal(tree.root.findAllByType('p').length, 0);
    assert.equal(tree.root.findAllByType('h3').length, 0);
    const svgIds = tree.root.findAll(node => typeof node.type === 'string' && typeof node.props.id === 'string').map(node => node.props.id);
    assert.equal(svgIds.length, new Set(svgIds).size, `${id} must isolate element ids across instances`);
    act(() => tree.unmount());
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
