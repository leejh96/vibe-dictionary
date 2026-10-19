import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { TECHNIQUES, matchesSearch } from '@vibe-dictionary/catalog';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';
import { DiceRoll3DDemo } from '../src/components/demos/physics/DiceRoll3DDemo';
import { LocaleProvider, useLocale } from '../src/i18n/LocaleContext';

test('3D dice roll is registered, searchable, and renders in InteractiveDemo without errors', () => {
  const item = TECHNIQUES.find(t => t.id === 'mg-dice-roll-3d');
  assert.ok(item, 'mg-dice-roll-3d must be in catalog');
  assert.equal(item.category, 'physics');
  assert.equal(item.domain, 'motion');
  assert.ok(matchesSearch(item, '주사위'));
  assert.ok(matchesSearch(item, 'dice'));

  let tree!: ReturnType<typeof create>;
  act(() => {
    tree = create(<InteractiveDemo techniqueId="mg-dice-roll-3d" />);
  });
  assert.notEqual(tree.toJSON(), null);
  assert.equal(tree.root.findAllByType(DiceRoll3DDemo).length, 1);
  assert.equal(tree.root.findAll(node => node.props.className?.includes('pd-dice-cube')).length, 1);
  assert.equal(tree.root.findAll(node => node.props.className?.includes('pd-dice-face')).length, 6);
  act(() => tree.unmount());
});

test('3D dice roll interacts on button click, updates values, and handles locale switching', () => {
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
        <DiceRoll3DDemo />
      </LocaleProvider>
    );
  });

  const button = () => tree.root.findByType('button');
  const resultText = () => tree.root.findByProps({ className: 'pd-dice-result-text' });
  const cube = () => tree.root.findByProps({ className: 'pd-dice-cube' });

  assert.equal(button().props['aria-label'], '주사위 던지기');
  assert.match(resultText().children.join(''), /눈금 \d/);
  const initialTransform = cube().props.style.transform;

  // Trigger roll
  act(() => {
    button().props.onClick();
  });

  // During roll, button shows rolling state and is disabled
  assert.equal(button().props.disabled, true);
  assert.match(button().children.join(''), /굴리는 중/);

  // Switch locale to English
  act(() => {
    setLocale('en');
  });

  assert.equal(button().props['aria-label'], 'Roll Dice');
  assert.match(resultText().children.join(''), /Value \d/);
  assert.doesNotMatch(JSON.stringify(tree.toJSON()), /[가-힣]/u, 'English view must not leak Korean copy');

  // Switch back to Korean
  act(() => {
    setLocale('ko');
  });
  assert.equal(button().props['aria-label'], '주사위 던지기');
  assert.match(resultText().children.join(''), /눈금 \d/);

  act(() => tree.unmount());
});
