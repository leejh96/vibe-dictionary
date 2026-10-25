import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import postcss from 'postcss';
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

test('envelope keeps the same invitation through repeated toggles and a language change', t => {
  let changeLocale!: ReturnType<typeof useLocale>['setLocale'];
  function Probe() {
    changeLocale = useLocale().setLocale;
    return <><InteractiveDemo techniqueId="envelope-invitation-reveal" /><InteractiveDemo techniqueId="envelope-invitation-reveal" /></>;
  }
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<LocaleProvider><Probe /></LocaleProvider>); });
  t.after(() => act(() => tree.unmount()));
  const buttons = () => tree.root.findAllByType('button');
  const invitation = () => buttons()[0].findByProps({ className: 'sg-env-letter' });
  const initialInvitation = invitation();
  assert.equal(initialInvitation.parent, buttons()[0], 'the invitation must share the pocket and interior stacking context without a clipping slot');
  assert.deepEqual(buttons().map(button => button.props['aria-pressed']), [false, false]);
  for (const open of [true, false, true, false, true]) {
    act(() => buttons()[0].props.onClick());
    assert.deepEqual(buttons().map(button => button.props['aria-pressed']), [open, false]);
    assert.equal(buttons()[0].props['data-open'], open);
    assert.equal(invitation(), initialInvitation, 'opening and closing must not remount the invitation');
  }
  act(() => changeLocale('en'));
  assert.deepEqual(buttons().map(button => button.props['aria-pressed']), [true, false]);
  assert.equal(buttons()[0].props['aria-label'], 'Toggle invitation envelope');
  assert.equal(invitation(), initialInvitation);
  assert.equal(invitation().findByProps({ className: 'sg-env-title' }).children[0], "You're invited");
  act(() => buttons()[0].props.onClick());
  assert.equal(buttons()[0].props['aria-pressed'], false);
  assert.equal(invitation(), initialInvitation);
});

test('envelope keeps its invitation between the pocket and interior and extracts it within the preview', () => {
  const styles = postcss.parse(readFileSync(new URL('../src/components/demos/patterns/signature.css', import.meta.url), 'utf8'));
  const declaration = (selector: string, property: string) => {
    let value = '';
    styles.walkRules(selector, rule => { rule.walkDecls(property, decl => { value = decl.value; }); });
    assert.notEqual(value, '', `${selector} must define ${property}`);
    return value;
  };
  const pixels = (selector: string, property: string) => {
    const value = declaration(selector, property);
    assert.match(value, /^-?[\d.]+px$/);
    return Number.parseFloat(value);
  };
  const translation = declaration(".sg-envelope[data-open='true'] .sg-env-letter", 'transform').match(/^translateY\((-?[\d.]+)px\)$/);
  assert.ok(translation);
  assert.equal(declaration('.sg-envelope', 'isolation'), 'isolate');
  const pocketLayer = Number(declaration('.sg-env-pocket', 'z-index'));
  const letterLayer = Number(declaration('.sg-env-letter', 'z-index'));
  const interiorLayer = Number(declaration('.sg-env-back', 'z-index'));
  const innerFlapLayer = Number(declaration('.sg-env-flap-back', 'z-index'));
  assert.ok(pocketLayer > letterLayer && letterLayer > interiorLayer && letterLayer > innerFlapLayer, 'front pocket > invitation > interior and inner flap');
  styles.walkRules(rule => {
    if (!rule.selector.includes(".sg-envelope[data-open='true']")) return;
    rule.walkDecls('z-index', () => assert.fail('opening must not swap the fixed layer order'));
  });
  const closedTop = pixels('.sg-env-letter', 'top');
  assert.ok(closedTop >= 0 && closedTop + pixels('.sg-env-letter', 'height') <= pixels('.sg-envelope', 'height'), 'the closed invitation must remain inside the envelope');
  const letterTop = closedTop + Number(translation[1]);
  const letterBottom = letterTop + pixels('.sg-env-letter', 'height');
  assert.ok(letterBottom < 0, 'the entire open invitation must sit above the envelope, including its pocket');
  const envelopeTop = pixels('.sg-envelope-stage', 'height') - pixels('.sg-envelope-stage', 'padding-bottom') - pixels('.sg-envelope', 'height');
  assert.ok(envelopeTop + letterTop >= 0, 'the fully extracted invitation must not be clipped by the preview');
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
