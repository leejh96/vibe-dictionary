import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { TECHNIQUES, matchesSearch } from '@vibe-dictionary/catalog';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';
import { MarbleBoardDemo } from '../src/components/demos/physics/MarbleBoardDemo';
import { LocaleProvider, useLocale } from '../src/i18n/LocaleContext';

test('Marble board game is registered, searchable, and renders in InteractiveDemo', () => {
  const item = TECHNIQUES.find(t => t.id === 'mg-marble-board');
  assert.ok(item, 'mg-marble-board must be in catalog');
  assert.equal(item.category, 'physics');
  assert.equal(item.domain, 'motion');
  assert.ok(matchesSearch(item, '보드게임'));
  assert.ok(matchesSearch(item, '주사위'));
  assert.ok(matchesSearch(item, 'dice'));
  assert.ok(matchesSearch(item, '쌍주사위'));

  let tree!: ReturnType<typeof create>;
  act(() => {
    tree = create(<InteractiveDemo techniqueId="mg-marble-board" />);
  });
  assert.notEqual(tree.toJSON(), null);
  assert.equal(tree.root.findAllByType(MarbleBoardDemo).length, 1);
  assert.equal(tree.root.findAll(node => node.props.className?.split(' ').includes('mb-tile')).length, 10);
  assert.equal(tree.root.findAll(node => node.props.className?.includes('mb-dice-cube')).length, 2);
  assert.equal(tree.root.findAll(node => node.props.className?.split(' ').includes('mb-pawn')).length, 1);
  assert.equal(tree.root.findAll(node => node.props.className?.includes('mb-gauge-bar')).length, 1);
  act(() => tree.unmount());
});

test('Marble board game interacts on click, updates pawn/dice, and supports locale switching', () => {
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
        <MarbleBoardDemo />
      </LocaleProvider>
    );
  });

  const button = () => tree.root.findByType('button');
  const cubes = () => tree.root.findAllByProps({ className: 'mb-dice-cube' });
  const statusText = () => tree.root.findByProps({ className: 'mb-status-text' });
  const gaugeLabel = () => tree.root.findByProps({ className: 'mb-gauge-label' });

  assert.equal(button().props['aria-label'], '캐주얼 보드게임 인터랙티브 시연');
  assert.equal(cubes().length, 2);
  const initialTransform0 = cubes()[0].props.style.transform;

  // Trigger roll
  act(() => {
    button().props.onClick();
  });

  // During rolling, button is disabled
  assert.equal(button().props.disabled, true);
  assert.notEqual(cubes()[0].props.style.transform, initialTransform0, 'Dice cube rotation must update');
  assert.match(gaugeLabel().children.join(''), /컨트롤 게이지 \d+%/);

  // Switch locale to English
  act(() => {
    setLocale('en');
  });

  assert.equal(button().props['aria-label'], 'Casual Board Game Interactive Demo');
  assert.match(gaugeLabel().children.join(''), /Control Gauge \d+%/);
  assert.doesNotMatch(JSON.stringify(tree.toJSON()), /[가-힣]/u, 'English view must not leak Korean copy');

  // Switch back to Korean
  act(() => {
    setLocale('ko');
  });
  assert.equal(button().props['aria-label'], '캐주얼 보드게임 인터랙티브 시연');

  act(() => tree.unmount());
});
