import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { TECHNIQUES, matchesSearch } from '@vibe-dictionary/catalog';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';
import { TreasureChest3DDemo } from '../src/components/demos/physics/TreasureChest3DDemo';
import { LuckyWheel3DDemo } from '../src/components/demos/physics/LuckyWheel3DDemo';
import { DiceRoll3DDemo } from '../src/components/demos/physics/DiceRoll3DDemo';
import { MarbleBoardDemo } from '../src/components/demos/physics/MarbleBoardDemo';
import { LocaleProvider, useLocale } from '../src/i18n/LocaleContext';

test('all six announced dice values face upward in standalone dice and board rolls', t => {
  t.mock.timers.enable({ apis: ['setTimeout', 'setInterval'] });
  let random = 0;
  let now = 0;
  t.mock.method(Math, 'random', () => random);
  t.mock.method(Date, 'now', () => now);
  // Face normals before cube rotation: front, top, right, left, bottom, back.
  const normals = [[0, 0, 1], [0, -1, 0], [1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, 0, -1]];
  for (const [Demo, cubeClass, duration] of [
    [DiceRoll3DDemo, 'pd-dice-cube', 850],
    [MarbleBoardDemo, 'mb-dice-cube', 750],
  ] as const) {
    let tree!: ReturnType<typeof create>;
    act(() => { tree = create(<Demo />); });
    for (let value = 1; value <= 6; value++) {
      now = value <= 3 ? 0 : 700;
      random = Demo === DiceRoll3DDemo ? (value - .5) / 6 : ((value <= 3 ? value - 1 : value - 4) + .5) / 3;
      act(() => tree.root.findByType('button').props.onClick());
      assert.equal(tree.root.findByType('button').props.disabled, true);
      for (const cube of tree.root.findAllByProps({ className: cubeClass })) {
        const [, x, y] = cube.props.style.transform.match(/rotateX\(([-\d.]+)deg\) rotateY\(([-\d.]+)deg\)/);
        const rx = Number(x) * Math.PI / 180, ry = Number(y) * Math.PI / 180;
        const [nx, ny, nz] = normals[value - 1];
        const afterYz = -nx * Math.sin(ry) + nz * Math.cos(ry);
        const up = ny * Math.cos(rx) - afterYz * Math.sin(rx);
        assert.ok(Math.abs(up + 1) < 1e-9, `${cubeClass}: announced value ${value} must be on top`);
      }
      act(() => t.mock.timers.tick(duration));
      if (Demo === MarbleBoardDemo) {
        assert.equal(tree.root.findByType('button').props.disabled, true, 'board stays locked until pawn movement finishes');
        for (let step = 0; step < value * 2; step++) act(() => t.mock.timers.tick(160));
      } else act(() => t.mock.timers.tick(300));
      assert.equal(tree.root.findByType('button').props.disabled, false);
    }
    act(() => tree.unmount());
  }
});

test('board results translate during movement and landmark status follows the visible city level', t => {
  t.mock.timers.enable({ apis: ['setTimeout', 'setInterval'] });
  let now = 0;
  t.mock.method(Date, 'now', () => now);
  t.mock.method(Math, 'random', () => .4);
  let setLocale!: (locale: 'ko' | 'en') => void;
  function LanguageControl() { setLocale = useLocale().setLocale; return null; }
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<LocaleProvider initialLocale="ko"><LanguageControl /><MarbleBoardDemo /></LocaleProvider>); });
  const status = () => tree.root.findByProps({ className: 'mb-status-text' }).children.join('');
  const roll = (steps: number) => {
    act(() => tree.root.findByType('button').props.onClick());
    act(() => t.mock.timers.tick(750));
    for (let step = 0; step < steps; step++) act(() => t.mock.timers.tick(160));
  };
  assert.equal(tree.root.findByType('button').props.role, undefined, 'native board button must retain its button role');
  act(() => tree.root.findByType('button').props.onClick());
  act(() => t.mock.timers.tick(750));
  assert.equal(status(), '2 + 2 = 4칸 이동');
  act(() => setLocale('en'));
  assert.equal(status(), '2 + 2 = Move 4');
  for (let step = 0; step < 4; step++) act(() => t.mock.timers.tick(160));
  assert.equal(status(), 'ACQUIRED!', 'a roll started in Korean must land with the current English locale');
  act(() => setLocale('ko'));
  assert.equal(status(), '인수 완료!');
  now = 700; // 5 + 5 makes a full lap back to the same city.
  for (const [building, message] of [['🏢', '인수 완료!'], ['🏰', '랜드마크 건설!'], ['🏠', '인수 완료!']]) {
    roll(10);
    assert.equal(tree.root.findByProps({ className: 'mb-tile-building' }).children.join(''), building);
    assert.equal(status(), message);
  }
  act(() => tree.unmount());
});

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

test('lucky wheel waits for deceleration, aligns all eight rewards and permits another spin', t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  let random = 0;
  t.mock.method(Math, 'random', () => random);
  const rewards = ['다이아 100개', '골드 50,000', '777 잭팟', '황금 티켓', '보물상자', '보상 2배', '경험치 부스터', '럭키 박스'];
  for (let slot = 0; slot < 8; slot++) {
    // From initial slot 2, existing selection offsets 2..6 cover slots 4..0.
    // Subsequent spins cover the remaining targets without changing the reward distribution.
    let tree!: ReturnType<typeof create>;
    act(() => { tree = create(<LuckyWheel3DDemo />); });
    const button = () => tree.root.findByType('button');
    const disc = () => tree.root.findByProps({ className: 'lw-wheel-disc' });
    const status = () => tree.root.findAll(node => typeof node.type === 'string' && node.props.className?.split(' ').includes('lw-status-chip'))[0].children.join('');
    let currentSlot = 2;
    do {
      const offset = (slot - currentSlot + 8) % 8;
      const step = offset >= 2 && offset <= 6 ? offset : 2;
      random = (step - 2 + .1) / 5;
      const before = Number(disc().props.style.transform.match(/rotate\((.+)deg\)/)[1]);
      act(() => button().props.onClick());
      const target = Number(disc().props.style.transform.match(/rotate\((.+)deg\)/)[1]);
      assert.ok(target - before >= 1440, 'each spin completes at least four turns');
      act(() => button().props.onClick());
      assert.equal(Number(disc().props.style.transform.match(/rotate\((.+)deg\)/)[1]), target, 'rapid clicks cannot start another spin');
      act(() => t.mock.timers.tick(2400));
      assert.equal(button().props.disabled, true, 'reward remains pending while the 2.8s disc transition runs');
      assert.equal(status(), '회전 중…');
      act(() => t.mock.timers.tick(400));
      currentSlot = (currentSlot + step) % 8;
      assert.equal(button().props.disabled, false);
      assert.equal((target + currentSlot * 45) % 360, 0, 'the announced reward center must stop under the top pointer');
      assert.equal(status(), `${rewards[currentSlot]} 당첨!`);
    } while (currentSlot !== slot);
    act(() => t.mock.timers.tick(3000));
    assert.equal(status(), '🎯 룰렛 돌리기 (클릭)', 'reward badge expires without preventing another spin');
    act(() => tree.unmount());
  }
});
