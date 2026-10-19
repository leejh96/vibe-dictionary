import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { TECHNIQUES, matchesSearch } from '@vibe-dictionary/catalog';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';
import { TreasureChest3DDemo } from '../src/components/demos/physics/TreasureChest3DDemo';
import { LuckyWheel3DDemo } from '../src/components/demos/physics/LuckyWheel3DDemo';
import { LocaleProvider, useLocale } from '../src/i18n/LocaleContext';

test('3D Treasure Chest and Lucky Wheel are registered in catalog and searchable', () => {
  const chest = TECHNIQUES.find(t => t.id === 'mg-treasure-chest-3d');
  assert.ok(chest, 'mg-treasure-chest-3d must be registered');
  assert.equal(chest.category, 'physics');
  assert.equal(chest.domain, 'motion');
  assert.ok(matchesSearch(chest, '보물상자'));
  assert.ok(matchesSearch(chest, 'treasure'));
  assert.ok(matchesSearch(chest, '루팅'));
  assert.ok(matchesSearch(chest, '가챠'));

  const wheel = TECHNIQUES.find(t => t.id === 'mg-lucky-wheel-3d');
  assert.ok(wheel, 'mg-lucky-wheel-3d must be registered');
  assert.equal(wheel.category, 'physics');
  assert.equal(wheel.domain, 'motion');
  assert.ok(matchesSearch(wheel, '룰렛'));
  assert.ok(matchesSearch(wheel, 'roulette'));
  assert.ok(matchesSearch(wheel, 'wheel'));
  assert.ok(matchesSearch(wheel, '럭키'));
});

test('InteractiveDemo renders 3D Treasure Chest and handles open/close and locale switching', () => {
  let setLocale!: (locale: 'ko' | 'en') => void;
  function LanguageControl() {
    setLocale = useLocale().setLocale;
    return null;
  }

  let tree!: ReturnType<typeof create>;
  act(() => {
    tree = create(
      <LocaleProvider initialLocale="ko">
        <LanguageControl />
        <InteractiveDemo techniqueId="mg-treasure-chest-3d" />
      </LocaleProvider>
    );
  });

  assert.equal(tree.root.findAllByType(TreasureChest3DDemo).length, 1);
  const button = tree.root.findByType('button');
  assert.equal(button.props['aria-label'], '3D 보물상자 루팅 연출 시연');

  // Verify internal elements
  assert.equal(tree.root.findAll(n => n.props.className?.includes('tc-chest')).length, 1);
  assert.equal(tree.root.findAll(n => n.props.className?.includes('tc-lid-pivot')).length, 1);
  assert.equal(tree.root.findAll(n => n.props.className?.includes('tc-gem-wrapper')).length, 1);

  // Click to open
  act(() => {
    button.props.onClick();
  });

  const lidPivot = tree.root.find(n => n.props.className?.includes('tc-lid-pivot'));
  assert.ok(lidPivot.props.className?.includes('tc-lid-open'), 'Lid must be open after toggle');

  // Switch to English
  act(() => {
    setLocale('en');
  });

  assert.equal(button.props['aria-label'], '3D Treasure Chest Loot Demo');
  assert.doesNotMatch(JSON.stringify(tree.toJSON()), /[가-힣]/u, 'English view must not leak Korean copy');

  // Switch back to Korean
  act(() => {
    setLocale('ko');
  });
  assert.equal(button.props['aria-label'], '3D 보물상자 루팅 연출 시연');

  act(() => tree.unmount());
});

test('InteractiveDemo renders 3D Lucky Wheel and handles spin physics and locale switching', () => {
  let setLocale!: (locale: 'ko' | 'en') => void;
  function LanguageControl() {
    setLocale = useLocale().setLocale;
    return null;
  }

  let tree!: ReturnType<typeof create>;
  act(() => {
    tree = create(
      <LocaleProvider initialLocale="ko">
        <LanguageControl />
        <InteractiveDemo techniqueId="mg-lucky-wheel-3d" />
      </LocaleProvider>
    );
  });

  assert.equal(tree.root.findAllByType(LuckyWheel3DDemo).length, 1);
  const button = tree.root.findByType('button');
  assert.equal(button.props['aria-label'], '3D 럭키 휠 룰렛 시연');

  // Verify wheel disc, pointer, and center cap
  const disc = tree.root.find(n => n.props.className?.includes('lw-wheel-disc'));
  assert.ok(disc, 'Wheel disc must be rendered');
  const initialTransform = disc.props.style.transform;

  // Click to spin
  act(() => {
    button.props.onClick();
  });

  // During spinning, button is disabled
  assert.equal(button.props.disabled, true);
  assert.notEqual(disc.props.style.transform, initialTransform, 'Disc rotation must update');

  // Switch to English
  act(() => {
    setLocale('en');
  });

  assert.equal(button.props['aria-label'], '3D Lucky Wheel Roulette Demo');
  assert.doesNotMatch(JSON.stringify(tree.toJSON()), /[가-힣]/u, 'English view must not leak Korean copy');

  // Switch back to Korean
  act(() => {
    setLocale('ko');
  });
  assert.equal(button.props['aria-label'], '3D 럭키 휠 룰렛 시연');

  act(() => tree.unmount());
});
