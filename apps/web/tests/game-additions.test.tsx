import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create, type ReactTestInstance } from 'react-test-renderer';
import { TECHNIQUES } from '@vibe-dictionary/catalog';
import { GAME_ADDITION_DEMOS } from '../src/components/demos/game';
import { LocaleProvider } from '../src/i18n/LocaleContext';

function text(node: ReactTestInstance | string | number): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  return node.children.map((child) => text(child as ReactTestInstance | string | number)).join('');
}

test('all 10 game additions are present in TECHNIQUES with unique IDs and categories', () => {
  const gameItems = TECHNIQUES.filter((t) => t.domain === 'game');
  assert.equal(gameItems.length, 10);
  assert.equal(new Set(gameItems.map((t) => t.id)).size, 10);

  const expectedCategories = ['game_hud', 'game_feel', 'game_progression', 'game_lobby'];
  for (const item of gameItems) {
    assert.ok(expectedCategories.includes(item.category), `${item.id} has invalid category ${item.category}`);
    assert.ok(item.titleKo.trim());
    assert.ok(item.titleEn.trim());
    assert.ok(item.vibeKeywords.length > 0);
  }
});

test('every game technique ID renders cleanly in both locales without Korean leakage in English', () => {
  const gameItems = TECHNIQUES.filter((t) => t.domain === 'game');
  for (const item of gameItems) {
    const Component = GAME_ADDITION_DEMOS[item.id];
    assert.ok(Component, `Missing demo component for ${item.id}`);

    for (const locale of ['ko', 'en'] as const) {
      let tree!: ReturnType<typeof create>;
      act(() => {
        tree = create(
          <LocaleProvider initialLocale={locale}>
            <Component />
          </LocaleProvider>
        );
      });
      try {
        assert.ok(tree.root);
        if (locale === 'en') {
          assert.doesNotMatch(JSON.stringify(tree.toJSON()), /[가-힣]/, `${item.id} leaked Korean in EN`);
        }
      } finally {
        act(() => tree.unmount());
      }
    }
  }
});

test('game-delayed-health-bar absorbs shield first, reveals low-HP warning, and resets cleanly', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const Component = GAME_ADDITION_DEMOS['game-delayed-health-bar'];
  let tree!: ReturnType<typeof create>;
  act(() => {
    tree = create(
      <LocaleProvider initialLocale="ko">
        <Component />
      </LocaleProvider>
    );
  });
  t.after(() => act(() => tree.unmount()));

  const heavyBtn = () => tree.root.findAllByType('button').find((b) => text(b) === '강타 -35')!;
  const resetBtn = () => tree.root.findByProps({ 'aria-label': '초기화' });
  const hpBar = () => tree.root.findByProps({ 'aria-label': '체력 게이지' });
  const shieldBar = () => tree.root.findByProps({ 'aria-label': '보호막 게이지' });

  assert.equal(shieldBar().props['aria-valuenow'], 40);
  assert.equal(hpBar().props['aria-valuenow'], 100);

  act(() => heavyBtn().props.onClick());
  assert.equal(shieldBar().props['aria-valuenow'], 5);
  assert.equal(hpBar().props['aria-valuenow'], 100);

  act(() => heavyBtn().props.onClick());
  assert.equal(shieldBar().props['aria-valuenow'], 0);
  assert.equal(hpBar().props['aria-valuenow'], 70);

  act(() => heavyBtn().props.onClick());
  act(() => heavyBtn().props.onClick());
  assert.equal(hpBar().props['aria-valuenow'], 0);
  assert.ok(text(tree.root).includes('위험: 저체력'));

  act(() => t.mock.timers.tick(250));
  act(() => resetBtn().props.onClick());
  assert.equal(shieldBar().props['aria-valuenow'], 40);
  assert.equal(hpBar().props['aria-valuenow'], 100);
});

test('game-radial-weapon-wheel supports arrow key cycling and stable polar hover/click selection', () => {
  const Component = GAME_ADDITION_DEMOS['game-radial-weapon-wheel'];
  const wheelRect = { left: 0, top: 0, right: 116, bottom: 116, width: 116, height: 116 };
  let tree!: ReturnType<typeof create>;
  act(() => {
    tree = create(
      <LocaleProvider initialLocale="en">
        <Component />
      </LocaleProvider>,
      {
        createNodeMock: (element) =>
          element.type === 'div' && element.props['data-radial-wheel'] === 'true'
            ? { getBoundingClientRect: () => wheelRect }
            : null,
      }
    );
  });

  const group = tree.root.findByProps({ role: 'group' });
  const wheel = tree.root.findByProps({ 'data-radial-wheel': 'true' });
  const bowButton = () => tree.root.findByProps({ 'aria-label': 'Bow' });
  const bowPosBefore = { left: bowButton().props.style.left, top: bowButton().props.style.top };

  assert.ok(text(tree.root).includes('1. Sword'));
  act(() => group.props.onKeyDown({ key: 'ArrowRight', preventDefault() {} }));
  assert.ok(text(tree.root).includes('2. Bow'));
  act(() => group.props.onKeyDown({ key: 'ArrowLeft', preventDefault() {} }));
  assert.ok(text(tree.root).includes('1. Sword'));

  // Helper: point at (angle deg from 12 o'clock clockwise, radius r from wheel center (58,58))
  const atPolar = (deg: number, r: number) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return { clientX: 58 + r * Math.cos(rad), clientY: 58 + r * Math.sin(rad) };
  };

  // Hovering sector 2 (90 deg -> Bow) previews Bow without shifting the button hitbox coordinates
  act(() => wheel.props.onMouseMove(atPolar(90, 38)));
  assert.ok(text(tree.root).includes('2. Bow'));
  assert.equal(bowButton().props.style.left, bowPosBefore.left);
  assert.equal(bowButton().props.style.top, bowPosBefore.top);

  // Moving 2 deg past the 120 deg sector 2/3 boundary stays on Bow due to 3 deg hysteresis
  act(() => wheel.props.onMouseMove(atPolar(122, 38)));
  assert.ok(text(tree.root).includes('2. Bow'));

  // Crossing cleanly past 123 deg switches preview to Staff (sector 3), and clicking selects it
  act(() => wheel.props.onMouseMove(atPolar(125, 38)));
  assert.ok(text(tree.root).includes('3. Staff'));
  act(() => wheel.props.onClick(atPolar(125, 38)));
  assert.ok(text(tree.root).includes('3. Staff'));

  // Leaving wheel preserves selected item and center deadzone clears hover back to selected
  act(() => wheel.props.onMouseMove(atPolar(30, 38)));
  assert.ok(text(tree.root).includes('1. Sword'));
  act(() => wheel.props.onMouseLeave());
  assert.ok(text(tree.root).includes('3. Staff'));

  act(() => tree.unmount());
});

test('game-damage-number-pop separates concurrent popups into distinct lanes and cleans up after 750ms', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const Component = GAME_ADDITION_DEMOS['game-damage-number-pop'];
  let tree!: ReturnType<typeof create>;
  act(() => {
    tree = create(
      <LocaleProvider initialLocale="en">
        <Component />
      </LocaleProvider>
    );
  });
  t.after(() => act(() => tree.unmount()));

  const hitBtn = () => tree.root.findAllByType('button').find((b) => text(b) === 'Normal Hit')!;
  const critBtn = () => tree.root.findAllByType('button').find((b) => text(b) === 'Critical')!;
  const weakBtn = () => tree.root.findAllByType('button').find((b) => text(b) === 'Weak Point')!;
  const activePopups = () => tree.root.findAllByProps({ 'data-damage-popup': 'true' });

  // Initial static preview is shown before first hit
  assert.equal(activePopups().length, 1);

  // Rapidly trigger 5 hits; at most 4 distinct lanes remain active without any duplicate lane overlap
  act(() => hitBtn().props.onClick());
  act(() => critBtn().props.onClick());
  act(() => weakBtn().props.onClick());
  act(() => critBtn().props.onClick());
  act(() => hitBtn().props.onClick());

  const currentPopups = activePopups();
  assert.equal(currentPopups.length, 4);
  const lanes = currentPopups.map((node) => node.props['data-lane']);
  assert.equal(new Set(lanes).size, 4);
  assert.ok(text(tree.root).includes('Total DMG: 1998'));

  act(() => t.mock.timers.tick(760));
  assert.equal(activePopups().length, 0);
});

test('game-boss-phase-bar switches phases across 66% and 33% thresholds', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const Component = GAME_ADDITION_DEMOS['game-boss-phase-bar'];
  let tree!: ReturnType<typeof create>;
  act(() => {
    tree = create(
      <LocaleProvider initialLocale="en">
        <Component />
      </LocaleProvider>
    );
  });
  t.after(() => act(() => tree.unmount()));

  const heavyBtn = () => tree.root.findAllByType('button').find((b) => text(b) === 'Heavy -35')!;
  assert.ok(text(tree.root).includes('Phase 1'));

  act(() => heavyBtn().props.onClick());
  assert.ok(text(tree.root).includes('Phase 2'));
  assert.ok(text(tree.root).includes('Phase 2 Shift!'));

  act(() => t.mock.timers.tick(500));
  act(() => heavyBtn().props.onClick());
  assert.ok(text(tree.root).includes('Phase 3'));
  assert.ok(text(tree.root).includes('STAGGERED!'));
});

test('game-skill-tree-node enforces parent dependencies and refunds SP on reset', () => {
  const Component = GAME_ADDITION_DEMOS['game-skill-tree-node'];
  let tree!: ReturnType<typeof create>;
  act(() => {
    tree = create(
      <LocaleProvider initialLocale="en">
        <Component />
      </LocaleProvider>
    );
  });

  const findNode = (labelPrefix: string) =>
    tree.root.findAllByType('button').find((b) => (b.props['aria-label'] ?? '').startsWith(labelPrefix))!;

  assert.equal(findNode('Gale Strike').props.disabled, false);
  assert.equal(findNode('Flash Dash').props.disabled, true);
  assert.ok(text(tree.root).includes('3 SP'));

  act(() => findNode('Gale Strike').props.onClick());
  assert.equal(findNode('Flash Dash').props.disabled, false);
  assert.ok(text(tree.root).includes('2 SP'));

  const resetBtn = tree.root.findAllByType('button').find((b) => text(b).includes('Reset'))!;
  act(() => resetBtn.props.onClick());
  assert.equal(findNode('Flash Dash').props.disabled, true);
  assert.ok(text(tree.root).includes('3 SP'));

  act(() => tree.unmount());
});

test('game-matchmaking-ready-check transitions through ready check and confirmation', (t) => {
  t.mock.timers.enable({ apis: ['setInterval'] });
  const Component = GAME_ADDITION_DEMOS['game-matchmaking-ready-check'];
  let tree!: ReturnType<typeof create>;
  act(() => {
    tree = create(
      <LocaleProvider initialLocale="en">
        <Component />
      </LocaleProvider>
    );
  });
  t.after(() => act(() => tree.unmount()));

  const simBtn = tree.root.findAllByType('button').find((b) => text(b) === 'Simulate Match Found')!;
  act(() => simBtn.props.onClick());
  assert.ok(text(tree.root).includes('Players Ready: 3/4'));

  const acceptBtn = tree.root.findAllByType('button').find((b) => text(b).includes('Accept'))!;
  act(() => acceptBtn.props.onClick());
  assert.ok(text(tree.root).includes('Match Confirmed (4/4)'));
});

test('game-save-slot-manager requires two-step confirmation for occupied slots and saves empty slots directly', () => {
  const Component = GAME_ADDITION_DEMOS['game-save-slot-manager'];
  let tree!: ReturnType<typeof create>;
  act(() => {
    tree = create(
      <LocaleProvider initialLocale="ko">
        <Component />
      </LocaleProvider>
    );
  });

  const saveButtons = () => tree.root.findAllByType('button').filter((b) => text(b) === '저장');
  const loadButtons = () => tree.root.findAllByType('button').filter((b) => text(b) === '불러오기');
  assert.equal(loadButtons()[2].props.disabled, true);

  // Occupied slot 2 requires confirmation
  act(() => saveButtons()[1].props.onClick());
  assert.ok(text(tree.root).includes('덮어쓰기 확인'));
  const confirmBtn = tree.root.findAllByType('button').find((b) => text(b) === '덮어쓰기 확인')!;
  act(() => confirmBtn.props.onClick());
  assert.ok(text(tree.root).includes('저장했습니다.'));

  // Empty slot 3 saves directly and enables Load
  act(() => saveButtons()[2].props.onClick());
  assert.equal(loadButtons()[2].props.disabled, false);

  act(() => tree.unmount());
});
