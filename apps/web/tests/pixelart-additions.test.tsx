import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { TECHNIQUES, searchTechniques, getTechniqueText } from '@vibe-dictionary/catalog';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';
import { PIXELART_DEMOS } from '../src/components/demos/pixelart';
import { LocaleProvider, useLocale } from '../src/i18n/LocaleContext';

test('pixel art catalog registers exactly 50 techniques evenly divided across 5 categories', () => {
  const pixelTechniques = TECHNIQUES.filter((item) => item.domain === 'pixelart');
  assert.equal(pixelTechniques.length, 50);

  const categories = ['sprites', 'environments', 'tiles', 'game_ui', 'effects'] as const;
  for (const cat of categories) {
    const items = pixelTechniques.filter((item) => item.category === cat);
    assert.equal(items.length, 10, `category ${cat} must have exactly 10 techniques`);
  }

  // All 50 IDs must be present in PIXELART_DEMOS including px-minimap-radar
  const demoIds = Object.keys(PIXELART_DEMOS);
  assert.equal(demoIds.length, 50);
  assert.ok(demoIds.includes('px-minimap-radar'), 'px-minimap-radar must be registered');
  assert.ok(!demoIds.includes('px-minimap-radar-radar'), 'px-minimap-radar-radar must not exist');
  assert.deepEqual(pixelTechniques.map((item) => item.id).sort(), demoIds.sort());
});

test('pixel art demos render via InteractiveDemo and switch languages cleanly', (t) => {
  let changeLocale!: (locale: 'ko' | 'en') => void;
  function LocaleController() {
    changeLocale = useLocale().setLocale;
    return null;
  }

  let tree!: ReturnType<typeof create>;
  act(() => {
    tree = create(
      <LocaleProvider initialLocale="ko">
        <LocaleController />
        {Object.keys(PIXELART_DEMOS).map((id) => (
          <InteractiveDemo key={id} techniqueId={id} />
        ))}
      </LocaleProvider>
    );
  });
  t.after(() => {
    act(() => tree.unmount());
  });

  const imgSvgs = tree.root.findAllByType('svg').filter(svg => svg.props.role === 'img');
  const groupSvgs = tree.root.findAllByType('svg').filter(svg => svg.props.role === 'group');
  assert.equal(imgSvgs.length, 47, 'Non-interactive pixel art SVGs must expose role=img');
  assert.equal(groupSvgs.length, 2, 'Interactive SVGs (autotile & inventory) must expose accessible role=group');
  const svgs = [...imgSvgs, ...groupSvgs];
  const dialogSpeaker = tree.root.findByProps({ className: 'px-dialog-speaker' });
  assert.equal(dialogSpeaker.children[0], '장로 엘더');

  // In Korean: aria-labels contain Korean
  for (const svg of svgs) {
    assert.ok(svg.props['aria-label'] && svg.props['aria-label'].length > 0);
  }

  // Switch to English
  act(() => changeLocale('en'));
  assert.equal(dialogSpeaker.children[0], 'Elder Sage');

  // In English: aria-labels must not contain Korean characters
  for (const svg of svgs) {
    assert.doesNotMatch(svg.props['aria-label'], /[가-힣]/u);
  }

  // Switch back to Korean
  act(() => changeLocale('ko'));
});

test('all 20 pixel art techniques are searchable by title and first keyword in both languages', () => {
  const pixelTechniques = TECHNIQUES.filter((item) => item.domain === 'pixelart');

  for (const item of pixelTechniques) {
    for (const locale of ['ko', 'en'] as const) {
      const text = getTechniqueText(item, locale);
      const query = text.title;
      const results = searchTechniques({ query, domain: 'pixelart' });
      assert.ok(
        results.some((r) => r.item.id === item.id),
        `Technique ${item.id} not found by title query: ${query} in ${locale}`
      );

      const firstKw = text.vibeKeywords[0];
      assert.ok(firstKw, `Missing first keyword for ${item.id} in ${locale}`);
      const kwResults = searchTechniques({ query: firstKw, domain: 'pixelart', category: item.category });
      assert.ok(
        kwResults.some((r) => r.item.id === item.id),
        `Technique ${item.id} not found by keyword: ${firstKw} in ${locale}`
      );
    }
  }
});

test('interactive pixel art controls update actual states, visuals and accessibility attributes', (t) => {
  // 1. Walk cycle: direction flip and play/pause state assertions
  {
    let tree!: ReturnType<typeof create>;
    act(() => {
      tree = create(
        <LocaleProvider initialLocale="ko">
          <InteractiveDemo techniqueId="px-sprite-walk-cycle" />
        </LocaleProvider>
      );
    });
    const buttons = tree.root.findAllByType('button');
    assert.equal(buttons.length, 2);

    // Initial state: not playing, facing right
    assert.equal(buttons[0].props['aria-pressed'], false);
    assert.equal(buttons[1].props['aria-pressed'], true);

    // Toggle play
    act(() => buttons[0].props.onClick());
    assert.equal(buttons[0].props['aria-pressed'], true);

    // Toggle direction
    act(() => buttons[1].props.onClick());
    assert.equal(buttons[1].props['aria-pressed'], false);

    act(() => tree.unmount());
  }

  // 2. Item silhouette set: verifies actual path fill color changes between palette and silhouette
  {
    let tree!: ReturnType<typeof create>;
    act(() => {
      tree = create(
        <LocaleProvider initialLocale="ko">
          <InteractiveDemo techniqueId="px-item-silhouette-set" />
        </LocaleProvider>
      );
    });
    const buttons = tree.root.findAllByType('button');
    assert.equal(buttons.length, 2);

    // Initially in palette mode
    assert.equal(buttons[0].props['aria-pressed'], true);
    assert.equal(buttons[1].props['aria-pressed'], false);

    // Switch to silhouette
    act(() => buttons[1].props.onClick());
    assert.equal(buttons[0].props['aria-pressed'], false);
    assert.equal(buttons[1].props['aria-pressed'], true);

    // All 4 item silhouettes must have black fill in silhouette mode
    const paths = tree.root.findAllByType('path');
    const blackFills = paths.filter((p) => p.props.fill === '#000000');
    assert.ok(blackFills.length >= 4, 'All item icons must render black silhouettes');

    // Switch back to palette mode
    act(() => buttons[0].props.onClick());
    const colorFills = tree.root.findAllByType('polygon');
    assert.ok(colorFills.length >= 4, 'Palette polygons must be restored');

    act(() => tree.unmount());
  }

  // 3. Autotile grid: cell toggle, reset, preset, and keyboard navigation
  {
    let tree!: ReturnType<typeof create>;
    act(() => {
      tree = create(
        <LocaleProvider initialLocale="ko">
          <InteractiveDemo techniqueId="px-autotile-terrain-bitmask" />
        </LocaleProvider>
      );
    });
    const buttons = tree.root.findAllByType('button');
    assert.equal(buttons.length, 2);

    // Reset grid: clears all grass cells
    act(() => buttons[0].props.onClick());
    const cellButtons = tree.root.findAllByProps({ role: 'button' });
    const pressedCells = cellButtons.filter((c) => c.props['aria-pressed'] === true);
    assert.equal(pressedCells.length, 0, 'Reset must make all cells dirt');

    // Island preset: sets exactly 4 grass cells
    act(() => buttons[1].props.onClick());
    const islandCells = tree.root.findAllByProps({ role: 'button' }).filter((c) => c.props['aria-pressed'] === true);
    assert.equal(islandCells.length, 4, 'Island preset must activate exactly 4 cells');

    // Keyboard navigation on cell 0: Space toggles cell
    const firstCell = tree.root.findAllByProps({ role: 'button' })[0];
    act(() => firstCell.props.onKeyDown({ key: ' ', preventDefault: () => {} }));
    assert.equal(firstCell.props['aria-pressed'], true, 'Space key must toggle cell to grass');

    act(() => tree.unmount());
  }

  // 4. Health HUD: feedback replacement, position and expiry
  {
    t.mock.timers.enable({ apis: ['setTimeout'] });
    let tree!: ReturnType<typeof create>;
    act(() => {
      tree = create(
        <LocaleProvider initialLocale="ko">
          <InteractiveDemo techniqueId="px-hud-health-shield-bar" />
        </LocaleProvider>
      );
    });
    const buttons = tree.root.findAllByType('button');
    assert.equal(buttons.length, 4);

    // Damage -25
    act(() => buttons[0].props.onClick());
    let floatText = tree.root.findByType('text');
    assert.equal(floatText.children[0], '-25');
    assert.equal(floatText.props.x, '132');
    assert.equal(floatText.props.y, '18');

    act(() => t.mock.timers.tick(800));

    // Heal +35 replaces the damage message and resets its expiry.
    act(() => buttons[2].props.onClick());
    act(() => t.mock.timers.tick(800));
    floatText = tree.root.findByType('text');
    assert.equal(floatText.children[0], '+35');
    assert.equal(floatText.props.x, '132');
    assert.equal(floatText.props.y, '18');

    // Shield recharge
    act(() => buttons[3].props.onClick());
    floatText = tree.root.findByType('text');
    assert.equal(floatText.children[0], '실드 충전');
    assert.equal(floatText.props.x, '132');
    assert.equal(floatText.props.y, '18');

    act(() => t.mock.timers.tick(899));
    assert.equal(tree.root.findByType('text').children[0], '실드 충전');
    act(() => t.mock.timers.tick(1));
    assert.equal(tree.root.findAllByType('text').length, 0);
    act(() => tree.unmount());
    t.mock.timers.reset();
  }

  // 5. Explosion: initial representative keyframe (frame 2) and detonation trigger
  {
    let tree!: ReturnType<typeof create>;
    act(() => {
      tree = create(
        <LocaleProvider initialLocale="ko">
          <InteractiveDemo techniqueId="px-integer-grid-explosion" />
        </LocaleProvider>
      );
    });

    // Check slider initial value is 2 (representative fireball frame)
    const slider = tree.root.findByType('input');
    assert.equal(slider.props.value, 2, 'Explosion demo must start at representative keyframe 2');

    // Shake toggle
    const buttons = tree.root.findAllByType('button');
    assert.equal(buttons.length, 2);
    assert.equal(buttons[1].props['aria-pressed'], true);
    act(() => buttons[1].props.onClick());
    assert.equal(buttons[1].props['aria-pressed'], false);

    // Detonate resets frame to 0
    act(() => buttons[0].props.onClick());
    assert.equal(slider.props.value, 0, 'Detonate must restart from frame 0');

    act(() => tree.unmount());
  }

  // 6. Dither gradient ramp: pattern mode toggles
  {
    let tree!: ReturnType<typeof create>;
    act(() => {
      tree = create(
        <LocaleProvider initialLocale="ko">
          <InteractiveDemo techniqueId="px-dither-gradient-ramp" />
        </LocaleProvider>
      );
    });
    const buttons = tree.root.findAllByType('button');
    assert.equal(buttons.length, 3);

    // Initially Bayer
    assert.equal(buttons[0].props['aria-pressed'], true);
    assert.equal(buttons[1].props['aria-pressed'], false);

    // Switch to Checker
    act(() => buttons[1].props.onClick());
    assert.equal(buttons[0].props['aria-pressed'], false);
    assert.equal(buttons[1].props['aria-pressed'], true);

    // Switch to Poster
    act(() => buttons[2].props.onClick());
    assert.equal(buttons[2].props['aria-pressed'], true);

    act(() => tree.unmount());
  }

  // 7. Inventory grid: next slot, first slot, roving tabindex with Arrow keys and inspect detail
  {
    let tree!: ReturnType<typeof create>;
    act(() => {
      tree = create(
        <LocaleProvider initialLocale="ko">
          <InteractiveDemo techniqueId="px-inventory-grid-selector" />
        </LocaleProvider>
      );
    });
    const buttons = tree.root.findAllByType('button');
    assert.equal(buttons.length, 2);

    // Slot 0 inspect text contains item name
    const inspectTexts = tree.root.findAllByType('text');
    assert.ok(inspectTexts.some((t) => t.children.includes('수정 원석')));

    // Next slot -> slot 1 (생명 물약)
    act(() => buttons[0].props.onClick());
    const nextTexts = tree.root.findAllByType('text');
    assert.ok(nextTexts.some((t) => t.children.includes('생명 물약')));

    // Keyboard navigation: ArrowRight from slot 1 to slot 2 (마법 열쇠)
    const slotElements = tree.root.findAll((node) => node.props['role'] === 'button' && node.props['data-demo-control']);
    assert.equal(slotElements.length, 12);
    assert.equal(slotElements[1].props.tabIndex, 0);

    act(() => slotElements[1].props.onKeyDown({ key: 'ArrowRight', preventDefault: () => {} }));
    assert.equal(slotElements[2].props.tabIndex, 0);
    const keyTexts = tree.root.findAllByType('text');
    assert.ok(keyTexts.some((t) => t.children.includes('룬 열쇠')));

    // ArrowDown from slot 2 to slot 6 (row 1, col 2 -> empty)
    act(() => slotElements[2].props.onKeyDown({ key: 'ArrowDown', preventDefault: () => {} }));
    assert.equal(slotElements[6].props.tabIndex, 0);

    // Select first slot -> back to slot 0
    act(() => buttons[1].props.onClick());
    const resetTexts = tree.root.findAllByType('text');
    assert.ok(resetTexts.some((t) => t.children.includes('수정 원석')));

    act(() => tree.unmount());
  }

  // 7b. Autotile terrain bitmask: roving tabindex with Arrow keys and Space/Enter toggle
  {
    let tree!: ReturnType<typeof create>;
    act(() => {
      tree = create(
        <LocaleProvider initialLocale="ko">
          <InteractiveDemo techniqueId="px-autotile-terrain-bitmask" />
        </LocaleProvider>
      );
    });

    const cells = tree.root.findAll((node) => node.props['role'] === 'button' && node.props['data-demo-control']);
    assert.equal(cells.length, 20);

    // Initial focus on cell 0
    assert.equal(cells[0].props.tabIndex, 0);
    assert.equal(cells[1].props.tabIndex, -1);

    // ArrowRight moves focus to cell 1
    act(() => cells[0].props.onKeyDown({ key: 'ArrowRight', preventDefault: () => {} }));
    assert.equal(cells[1].props.tabIndex, 0);
    assert.equal(cells[0].props.tabIndex, -1);

    // Enter toggles cell 1
    const initialGrass = cells[1].props['aria-pressed'];
    act(() => cells[1].props.onKeyDown({ key: 'Enter', preventDefault: () => {} }));
    assert.equal(cells[1].props['aria-pressed'], !initialGrass);

    // ArrowDown moves focus to cell 6 (row 1, col 1)
    act(() => cells[1].props.onKeyDown({ key: 'ArrowDown', preventDefault: () => {} }));
    assert.equal(cells[6].props.tabIndex, 0);

    act(() => tree.unmount());
  }

  // 8. RPG dialog: line order, explicit typing mode, and replay availability
  {
    t.mock.timers.enable({ apis: ['setInterval'] });
    let tree!: ReturnType<typeof create>;
    act(() => {
      tree = create(
        <LocaleProvider initialLocale="ko">
          <InteractiveDemo techniqueId="px-rpg-dialog-typewriter" />
        </LocaleProvider>
      );
    });

    const [next, replay, toggle] = tree.root.findAllByType('button');
    const dialogue = () => tree.root.findByProps({ className: 'sr-only' }).children.join('');
    const hiddenText = () => tree.root.findByProps({ className: 'invisible' }).children.join('');
    assert.equal(tree.root.findByType('strong').children[0], '장로 엘더');
    assert.equal(toggle.props['aria-pressed'], false);
    assert.equal(replay.props.disabled, true);
    assert.equal(hiddenText(), '');

    assert.match(dialogue(), /성채/);
    act(() => next.props.onClick());
    assert.match(dialogue(), /와이번/);
    act(() => next.props.onClick());
    assert.match(dialogue(), /룬 열쇠/);
    act(() => next.props.onClick());
    assert.match(dialogue(), /성채/);

    act(() => toggle.props.onClick());
    assert.equal(toggle.props['aria-pressed'], true);
    assert.equal(replay.props.disabled, false);
    assert.equal(hiddenText(), dialogue());
    act(() => t.mock.timers.tick(60));
    assert.equal(hiddenText(), dialogue().slice(1));
    act(() => replay.props.onClick());
    assert.equal(hiddenText(), dialogue());
    act(() => toggle.props.onClick());
    assert.equal(hiddenText(), '');
    assert.equal(replay.props.disabled, true);

    act(() => tree.unmount());
    t.mock.timers.reset();
  }

  // 9. Mosaic wipe transition: step change, block quantization, and low DOM node count
  {
    let tree!: ReturnType<typeof create>;
    act(() => {
      tree = create(
        <LocaleProvider initialLocale="ko">
          <InteractiveDemo techniqueId="px-mosaic-pixel-wipe-transition" />
        </LocaleProvider>
      );
    });

    const buttons = tree.root.findAllByType('button');
    const slider = tree.root.findByType('input');

    // Step 0: Scene A (1px fine art)
    assert.equal(buttons[1].props['aria-pressed'], false);
    const pathsStep0 = tree.root.findAllByType('path');
    assert.ok(pathsStep0.length >= 5 && pathsStep0.length <= 20, `Step 0 paths count: ${pathsStep0.length}`);

    // Swap scenes to Step 10: Scene B (1px fine art)
    act(() => buttons[1].props.onClick());
    assert.equal(slider.props.value, 10);
    assert.equal(buttons[1].props['aria-pressed'], true);
    const pathsStep10 = tree.root.findAllByType('path');
    assert.ok(pathsStep10.length >= 4 && pathsStep10.length <= 20, `Step 10 paths count: ${pathsStep10.length}`);

    // Step 1: 2px quantization - MUST NOT generate thousands of rects
    act(() => slider.props.onChange({ currentTarget: { valueAsNumber: 1 } }));
    assert.equal(slider.props.value, 1);
    const rectsStep1 = tree.root.findAllByType('rect');
    assert.equal(rectsStep1.length, 0, 'Must not render thousands of rects in 2px frame');
    const pathsStep1 = tree.root.findAllByType('path');
    assert.ok(pathsStep1.length >= 5 && pathsStep1.length <= 20, `Step 1 paths count: ${pathsStep1.length}`);

    // Step 5: Giant 32px block quantization (Scene B border)
    act(() => slider.props.onChange({ currentTarget: { valueAsNumber: 5 } }));
    assert.equal(slider.props.value, 5);
    const pathsStep5 = tree.root.findAllByType('path');
    assert.ok(pathsStep5.length >= 4 && pathsStep5.length <= 20, `Step 5 paths count: ${pathsStep5.length}`);

    // Step 9: 2px quantization of Scene B
    act(() => slider.props.onChange({ currentTarget: { valueAsNumber: 9 } }));
    assert.equal(slider.props.value, 9);
    const pathsStep9 = tree.root.findAllByType('path');
    assert.ok(pathsStep9.length >= 4 && pathsStep9.length <= 20, `Step 9 paths count: ${pathsStep9.length}`);

    act(() => tree.unmount());
  }

  // 10. Position alignment, frame containment, SVG clipPath, and tile specifications
  {
    // A. Item silhouettes: centered containment in display frames
    {
      let tree!: ReturnType<typeof create>;
      act(() => {
        tree = create(
          <LocaleProvider initialLocale="ko">
            <InteractiveDemo techniqueId="px-item-silhouette-set" />
          </LocaleProvider>
        );
      });
      const groups = tree.root.findAllByType('g');
      const itemTransforms = groups.map((g) => g.props.transform).filter(Boolean);
      assert.ok(itemTransforms.includes('translate(16, 19)'), 'Ore must be centered at x=16, y=19');
      assert.ok(itemTransforms.includes('translate(74, 19)'), 'Potion must be centered at x=74, y=19');
      assert.ok(itemTransforms.includes('translate(134.5, 18)'), 'Key must be centered at x=134.5, y=18');
      assert.ok(itemTransforms.includes('translate(190, 21)'), 'Chest must be centered at x=190, y=21');
      act(() => tree.unmount());
    }

    // B. Inventory grid: unified 120px panel height, square 32px step, inside 2px bracket inset
    {
      let tree!: ReturnType<typeof create>;
      act(() => {
        tree = create(
          <LocaleProvider initialLocale="ko">
            <InteractiveDemo techniqueId="px-inventory-grid-selector" />
          </LocaleProvider>
        );
      });
      const rects = tree.root.findAllByType('rect');
      const panel120 = rects.filter((r) => r.props.height === '120');
      assert.equal(panel120.length, 2, 'Both left and right inventory panels must share 120px height');

      // Slot 0 gold bracket path must be inset inside cell (x=12+2=14, y=14+2=16, y+8=22)
      const bracketPaths = tree.root.findAllByType('path');
      const cornerBracket = bracketPaths.find((p) => p.props.d?.includes('M14 22 V16 H20'));
      assert.ok(cornerBracket, 'Selection corner bracket must be inset inside the 28x28 slot bounds (x=12+2=14, y=14+2=16)');
      act(() => tree.unmount());
    }

    // C. HUD health & shield bars: unified centerX=12 and step=26 pitch
    {
      let tree!: ReturnType<typeof create>;
      act(() => {
        tree = create(
          <LocaleProvider initialLocale="ko">
            <InteractiveDemo techniqueId="px-hud-health-shield-bar" />
          </LocaleProvider>
        );
      });
      const groups = tree.root.findAllByType('g');
      const transforms = groups.map((g) => g.props.transform).filter(Boolean);
      assert.ok(transforms.includes('translate(12, -18)'), 'Hearts row must center at x=12');
      assert.ok(transforms.includes('translate(12, 12)'), 'Shields row must center at x=12');
      act(() => tree.unmount());
    }

    // D. Seamless pattern repeat: 120x108 clip, 84x76 master frame, cycle label
    {
      let tree!: ReturnType<typeof create>;
      act(() => {
        tree = create(
          <LocaleProvider initialLocale="ko">
            <InteractiveDemo techniqueId="px-seamless-pattern-repeat" />
          </LocaleProvider>
        );
      });
      const clipRect = tree.root.findByType('clipPath').findByType('rect');
      assert.equal(clipRect.props.width, '120', '3-column repeat preview clip width must be 120');
      assert.equal(clipRect.props.height, '108', '3-row repeat preview clip height must be 108');

      const slider = tree.root.findByType('input');
      act(() => slider.props.onChange({ currentTarget: { valueAsNumber: 40 } }));
      const valSpan = tree.root.findByProps({ className: 'px-slider-val' });
      assert.ok(valSpan.children.some((c: any) => typeof c === 'string' && c.includes('1주기')), 'Max offset 40 must display 1-cycle indication');
      act(() => tree.unmount());
    }

    // E. Gemstone shine: clipPath reuse, sparkle non-toggle button, 3 color options
    {
      let tree!: ReturnType<typeof create>;
      act(() => {
        tree = create(
          <LocaleProvider initialLocale="ko">
            <InteractiveDemo techniqueId="px-sparkle-gemstone-shine" />
          </LocaleProvider>
        );
      });
      const clip = tree.root.findByType('clipPath');
      assert.ok(clip.props.id.startsWith('gem-clip-'), 'Gemstone must define dedicated instance clipPath');

      const buttons = tree.root.findAllByType('button');
      assert.equal(buttons.length, 4, 'Sparkle + 3 gem colors = 4 buttons');
      assert.equal(buttons[0].props['aria-pressed'], undefined, 'Sparkle one-shot button must not have aria-pressed');
      assert.equal(buttons[1].props['aria-pressed'], true, 'Ruby must be initial selected color');
      assert.equal(buttons[2].props['aria-pressed'], false);
      assert.equal(buttons[3].props['aria-pressed'], false);
      act(() => tree.unmount());
    }
  }
});

test('pixel art expansion demos enforce time-bounded lifecycles, unique SVG masks/clips, and interactive state updates', () => {
  // 1. Instance-unique SVG mask & clipPath isolation across multiple mounted instances
  {
    let tree!: ReturnType<typeof create>;
    act(() => {
      tree = create(
        <LocaleProvider initialLocale="ko">
          <InteractiveDemo techniqueId="px-teleport-dissolve-reform" />
          <InteractiveDemo techniqueId="px-teleport-dissolve-reform" />
          <InteractiveDemo techniqueId="px-radial-spell-hotbar-cooldown" />
          <InteractiveDemo techniqueId="px-radial-spell-hotbar-cooldown" />
          <InteractiveDemo techniqueId="px-directional-crt-glitch" />
          <InteractiveDemo techniqueId="px-directional-crt-glitch" />
        </LocaleProvider>
      );
    });

    const maskIds = tree.root.findAllByType('mask').map((m) => m.props.id as string);
    assert.equal(maskIds.length, 4, 'Two teleport instances must create 4 mask elements');
    assert.equal(new Set(maskIds).size, 4, 'Every teleport mask ID must be instance-unique');

    const clipIds = tree.root.findAllByType('clipPath').map((c) => c.props.id as string);
    assert.equal(new Set(clipIds).size, clipIds.length, 'Every hotbar and CRT glitch clipPath ID must be instance-unique');
    act(() => tree.unmount());
  }

  // 2. Time-bounded one-shot animations (teleport 0->8, shockwave 0->6, portal 0->8, radial cooldown 100->0, ice freeze/thaw)
  {
    const origSetInterval = globalThis.setInterval;
    const origClearInterval = globalThis.clearInterval;
    const activeTimers = new Map<number, () => void>();
    let nextTimerId = 1;

    globalThis.setInterval = ((cb: () => void) => {
      const id = nextTimerId++;
      activeTimers.set(id, cb);
      return id as unknown as ReturnType<typeof setInterval>;
    }) as typeof setInterval;
    globalThis.clearInterval = ((id: ReturnType<typeof setInterval>) => {
      activeTimers.delete(id as unknown as number);
    }) as typeof clearInterval;

    try {
      // Teleport dissolve/reform: trigger warp runs 0 -> 8 and stops
      let tpTree!: ReturnType<typeof create>;
      act(() => {
        tpTree = create(
          <LocaleProvider initialLocale="ko">
            <InteractiveDemo techniqueId="px-teleport-dissolve-reform" />
          </LocaleProvider>
        );
      });
      assert.equal(activeTimers.size, 0, 'Teleport starts idle at phase 3');
      const tpTriggerBtn = tpTree.root.findAllByType('button')[0]!;
      act(() => tpTriggerBtn.props.onClick());
      assert.equal(activeTimers.size, 1, 'Warp trigger starts exactly one timer');
      // Rapid replay does not leak overlapping timers
      act(() => tpTriggerBtn.props.onClick());
      assert.equal(activeTimers.size, 1, 'Rapid replay preserves single active timer');

      for (let step = 0; step < 10; step++) {
        act(() => {
          for (const cb of [...activeTimers.values()]) cb();
        });
      }
      const tpSlider = tpTree.root.findByType('input');
      assert.equal(tpSlider.props.value, 8, 'Teleport stops at terminal phase 8');
      assert.equal(activeTimers.size, 0, 'Teleport timer cleans up automatically at terminal phase 8');
      act(() => tpTree.unmount());

      // Portal swirl: lifecycle runs 0 -> 8 and stops
      let portalTree!: ReturnType<typeof create>;
      act(() => {
        portalTree = create(
          <LocaleProvider initialLocale="ko">
            <InteractiveDemo techniqueId="px-pixel-portal-swirl" />
          </LocaleProvider>
        );
      });
      const portalBtn = portalTree.root.findAllByType('button')[0]!;
      act(() => portalBtn.props.onClick());
      for (let step = 0; step < 10; step++) {
        act(() => {
          for (const cb of [...activeTimers.values()]) cb();
        });
      }
      assert.equal(portalTree.root.findByType('input').props.value, 8, 'Portal stops at collapsed stage 8');
      assert.equal(activeTimers.size, 0, 'Portal timer stops at stage 8');
      act(() => portalTree.unmount());

      // Radial hotbar cooldown: cast sweep runs 100 -> 0 and stops
      let hotbarTree!: ReturnType<typeof create>;
      act(() => {
        hotbarTree = create(
          <LocaleProvider initialLocale="ko">
            <InteractiveDemo techniqueId="px-radial-spell-hotbar-cooldown" />
          </LocaleProvider>
        );
      });
      const castBtn = hotbarTree.root.findAllByType('button')[0]!;
      act(() => castBtn.props.onClick());
      assert.equal(hotbarTree.root.findByType('input').props.value, 100);
      for (let step = 0; step < 12; step++) {
        act(() => {
          for (const cb of [...activeTimers.values()]) cb();
        });
      }
      assert.equal(hotbarTree.root.findByType('input').props.value, 0, 'Cooldown sweep stops at 0%');
      assert.equal(activeTimers.size, 0, 'Cooldown timer cleans up at 0%');
      act(() => hotbarTree.unmount());

      // Ice freeze/thaw spread: freeze advances to 5 and stops, thaw recedes to 0 and stops
      let iceTree!: ReturnType<typeof create>;
      act(() => {
        iceTree = create(
          <LocaleProvider initialLocale="ko">
            <InteractiveDemo techniqueId="px-ice-freeze-thaw-spread" />
          </LocaleProvider>
        );
      });
      const [freezeBtn, thawBtn] = iceTree.root.findAllByType('button');
      act(() => freezeBtn!.props.onClick());
      for (let step = 0; step < 5; step++) {
        act(() => {
          for (const cb of [...activeTimers.values()]) cb();
        });
      }
      assert.equal(iceTree.root.findByType('input').props.value, 5, 'Freeze spread reaches radius 5 and stops');
      assert.equal(activeTimers.size, 0);

      act(() => thawBtn!.props.onClick());
      for (let step = 0; step < 6; step++) {
        act(() => {
          for (const cb of [...activeTimers.values()]) cb();
        });
      }
      assert.equal(iceTree.root.findByType('input').props.value, 0, 'Thaw sweep recedes to radius 0 and stops');
      assert.equal(activeTimers.size, 0);
      act(() => iceTree.unmount());
    } finally {
      globalThis.setInterval = origSetInterval;
      globalThis.clearInterval = origClearInterval;
    }
  }

  // 3. Interactive controls in sprites, tiles, and game_ui expansion demos
  {
    let tree!: ReturnType<typeof create>;
    act(() => {
      tree = create(
        <LocaleProvider initialLocale="ko">
          <InteractiveDemo techniqueId="px-quest-tracker-states" />
        </LocaleProvider>
      );
    });
    const questButtons = tree.root.findAllByType('button');
    // Initially 2/3 objectives complete ([true, true, false])
    assert.equal(questButtons[0]!.props['aria-pressed'], true);
    assert.equal(questButtons[1]!.props['aria-pressed'], true);
    assert.equal(questButtons[2]!.props['aria-pressed'], false);

    // Complete 3rd objective -> 3/3 QUEST CLEAR!
    act(() => questButtons[2]!.props.onClick());
    assert.equal(questButtons[2]!.props['aria-pressed'], true);
    const texts = tree.root.findAllByType('text').map((n) => n.children.join(''));
    assert.ok(texts.includes('3/3'), 'Quest header must update to 3/3');
    assert.ok(texts.includes('QUEST CLEAR!'), 'Quest reward banner must unlock on 3/3');

    // Reset button restores 2/3 state
    act(() => questButtons[4]!.props.onClick());
    assert.equal(questButtons[2]!.props['aria-pressed'], false);
    act(() => tree.unmount());
  }

  // 4. Layout contract: all 22 sliders in the 30 expansion demos are wrapped inside <label class="px-slider-label">
  //    and active buttons use px-btn-active (never legacy px-btn--active)
  {
    const expansionIds = [
      'px-blacksmith-hammer-strike',
      'px-jump-arc-poses',
      'px-dragon-wing-stroke',
      'px-slime-squash-stretch',
      'px-modular-robot-loadout',
      'px-directional-archer-draw',
      'px-snow-village-accumulation',
      'px-aurora-tundra-bands',
      'px-underwater-ruin-caustics',
      'px-windmill-wheat-breeze',
      'px-lava-channel-flow',
      'px-forest-canopy-shafts',
      'px-dual-grid-shore-corners',
      'px-wang-edge-color-tiles',
      'px-seeded-brick-variants',
      'px-nine-slice-pixel-frame',
      'px-conveyor-elbow-orientation',
      'px-one-way-platform-collision',
      'px-quest-tracker-states',
      'px-radial-spell-hotbar-cooldown',
      'px-turn-order-timeline',
      'px-branching-dialogue-choices',
      'px-equipment-stat-comparison',
      'px-collectible-badge-grid',
      'px-teleport-dissolve-reform',
      'px-stepped-lightning-chain',
      'px-directional-crt-glitch',
      'px-ground-shockwave-rings',
      'px-ice-freeze-thaw-spread',
      'px-pixel-portal-swirl',
    ] as const;

    let sliderCount = 0;
    for (const id of expansionIds) {
      let tree!: ReturnType<typeof create>;
      act(() => {
        tree = create(
          <LocaleProvider initialLocale="en">
            <InteractiveDemo techniqueId={id} />
          </LocaleProvider>
        );
      });

      const buttons = tree.root.findAllByType('button');
      for (const btn of buttons) {
        const cls = String(btn.props.className ?? '');
        assert.ok(!cls.includes('px-btn--active'), `${id} button must not use legacy px-btn--active`);
      }

      const inputs = tree.root.findAllByType('input');
      for (const input of inputs) {
        sliderCount++;
        const parent = input.parent;
        assert.ok(
          parent && parent.type === 'label' && String(parent.props.className ?? '').includes('px-slider-label'),
          `${id} slider input must be wrapped directly inside <label className="px-slider-label">`
        );
        const nameSpan = parent.findAll(
          (n) => n.type === 'span' && String(n.props.className ?? '').includes('px-slider-name')
        );
        const valSpan = parent.findAll(
          (n) => n.type === 'span' && String(n.props.className ?? '').includes('px-slider-val')
        );
        assert.equal(nameSpan.length, 1, `${id} slider label must include .px-slider-name`);
        assert.equal(valSpan.length, 1, `${id} slider label must include .px-slider-val`);
      }

      act(() => tree.unmount());
    }
    assert.equal(sliderCount, 22, 'The 30 pixelart expansion demos must contain 22 sliders in total');
  }

  // 5. Observable behavior regressions (Windmill, Snow, Aurora, Archer, Shore, Bricks, Hotbar, Turn Order, Badges, Teleport, Ice, Portal)
  {
    const origSetInterval = globalThis.setInterval;
    const origClearInterval = globalThis.clearInterval;
    const activeTimers = new Map<number, () => void>();
    let nextTimerId = 100;

    globalThis.setInterval = ((cb: () => void) => {
      const id = nextTimerId++;
      activeTimers.set(id, cb);
      return id as unknown as ReturnType<typeof setInterval>;
    }) as typeof setInterval;
    globalThis.clearInterval = ((id: ReturnType<typeof setInterval>) => {
      activeTimers.delete(id as unknown as number);
    }) as typeof clearInterval;

    try {
      // 5a. Windmill rotates at default wind=2 across 4 blade phases and stops timer at wind=0
      let wmTree!: ReturnType<typeof create>;
      act(() => {
        wmTree = create(
          <LocaleProvider initialLocale="en">
            <InteractiveDemo techniqueId="px-windmill-wheat-breeze" />
          </LocaleProvider>
        );
      });
      const getBladePhase = () =>
        Number(
          wmTree.root.find((n) => n.type === 'g' && n.props['data-blade-phase'] !== undefined).props[
            'data-blade-phase'
          ]
        );
      assert.equal(getBladePhase(), 0, 'Windmill starts at blade phase 0');
      assert.equal(activeTimers.size, 1, 'Windmill runs timer at default wind=2');
      act(() => {
        for (const cb of [...activeTimers.values()]) cb();
      });
      assert.equal(getBladePhase(), 1, 'Windmill advances to blade phase 1 on tick at wind=2');
      const wmSlider = wmTree.root.findByType('input');
      act(() => wmSlider.props.onChange({ target: { value: '0' } }));
      assert.equal(activeTimers.size, 0, 'Windmill stops interval timer when wind=0');
      act(() => wmTree.unmount());

      // 5b. Snow pauses timer when snowLevel=0 and batches flakes into a single path
      let snowTree!: ReturnType<typeof create>;
      act(() => {
        snowTree = create(
          <LocaleProvider initialLocale="en">
            <InteractiveDemo techniqueId="px-snow-village-accumulation" />
          </LocaleProvider>
        );
      });
      const flakePaths = snowTree.root.findAll((n) => n.type === 'path' && n.props['data-snow-count'] === 24);
      assert.equal(flakePaths.length, 1, 'Snowflakes are batched into a single <path> with 24 flakes at level 2');
      assert.equal(activeTimers.size, 1, 'Snow timer runs at initial snowLevel=2');
      const snowSlider = snowTree.root.findByType('input');
      act(() => snowSlider.props.onChange({ target: { value: '0' } }));
      assert.equal(activeTimers.size, 0, 'Snow timer pauses when snowLevel=0');
      act(() => snowTree.unmount());

      // 5c. Archer visibly changes nocked arrow geometry across +45°, 0°, and -30°
      let archerTree!: ReturnType<typeof create>;
      act(() => {
        archerTree = create(
          <LocaleProvider initialLocale="en">
            <InteractiveDemo techniqueId="px-directional-archer-draw" />
          </LocaleProvider>
        );
      });
      const archerBtns = archerTree.root.findAllByType('button');
      const getNockedArrowSignature = () => {
        const g = archerTree.root.find((n) => n.type === 'g' && n.props['data-nocked-arrow'] !== undefined);
        return JSON.stringify(g.findAllByType('rect').map((r) => [r.props.x, r.props.y, r.props.width, r.props.height]));
      };
      const sig0 = getNockedArrowSignature();
      act(() => archerBtns[0]!.props.onClick()); // +45°
      const sig45 = getNockedArrowSignature();
      act(() => archerBtns[2]!.props.onClick()); // -30°
      const sigNeg30 = getNockedArrowSignature();
      assert.notEqual(sig0, sig45, 'Nocked arrow geometry must change between 0° and +45°');
      assert.notEqual(sig0, sigNeg30, 'Nocked arrow geometry must change between 0° and -30°');
      assert.notEqual(sig45, sigNeg30, 'Nocked arrow geometry must change between +45° and -30°');
      act(() => archerTree.unmount());

      // 5d. Dual-grid shore has zero yellow sand seams on all-land (mask 15) and renders saddle bridge on mask 5/10
      let shoreTree!: ReturnType<typeof create>;
      act(() => {
        shoreTree = create(
          <LocaleProvider initialLocale="en">
            <InteractiveDemo techniqueId="px-dual-grid-shore-corners" />
          </LocaleProvider>
        );
      });
      const mask15Tiles = shoreTree.root.findAll((n) => n.type === 'g' && n.props['data-shore-mask'] === 15);
      assert.ok(mask15Tiles.length > 0, 'Bay preset must include all-land (mask 15) tiles');
      for (const tile of mask15Tiles) {
        const sandRects = tile.findAll((n) => n.type === 'rect' && n.props.fill === '#fde047');
        assert.equal(sandRects.length, 0, 'All-land dual-grid tile (mask 15) must have zero yellow sand seams');
      }
      const shoreBtns = shoreTree.root.findAllByType('button');
      act(() => shoreBtns[1]!.props.onClick()); // Saddle preset
      const saddleTiles = shoreTree.root.findAll(
        (n) => n.type === 'g' && (n.props['data-shore-mask'] === 5 || n.props['data-shore-mask'] === 10)
      );
      assert.ok(saddleTiles.length > 0, 'Saddle preset must render diagonal saddle mask tiles');
      act(() => shoreTree.unmount());

      // 5e. Seeded brick variants visibly change spatial distribution across seeds 1, 2, and 3
      let brickTree!: ReturnType<typeof create>;
      act(() => {
        brickTree = create(
          <LocaleProvider initialLocale="en">
            <InteractiveDemo techniqueId="px-seeded-brick-variants" />
          </LocaleProvider>
        );
      });
      const brickBtns = brickTree.root.findAllByType('button');
      const getBrickSignature = () =>
        brickTree.root
          .findAll((n) => n.type === 'g' && n.props['data-brick-variant'] !== undefined)
          .map((n) => n.props['data-brick-variant'])
          .join(',');
      const seed1Sig = getBrickSignature();
      act(() => brickBtns[1]!.props.onClick()); // Seed #2
      const seed2Sig = getBrickSignature();
      act(() => brickBtns[2]!.props.onClick()); // Seed #3
      const seed3Sig = getBrickSignature();
      assert.notEqual(seed1Sig, seed2Sig, 'Seed 1 and Seed 2 must produce distinct brick variant layouts');
      assert.notEqual(seed2Sig, seed3Sig, 'Seed 2 and Seed 3 must produce distinct brick variant layouts');
      act(() => brickBtns[0]!.props.onClick()); // Back to Seed #1
      assert.equal(getBrickSignature(), seed1Sig, 'Identical seed and density must reproduce identical brick layout');
      act(() => brickTree.unmount());

      // 5f. Hotbar preserves per-slot cooldown & independent scheduler progression across repeated recasts on another slot
      let hbTree!: ReturnType<typeof create>;
      act(() => {
        hbTree = create(
          <LocaleProvider initialLocale="en">
            <InteractiveDemo techniqueId="px-radial-spell-hotbar-cooldown" />
          </LocaleProvider>
        );
      });
      const glyphs = hbTree.root
        .findAll((n) => n.type === 'g' && n.props['data-spell-glyph'] !== undefined)
        .map((n) => n.props['data-spell-glyph']);
      assert.deepEqual(glyphs, ['fireball', 'frost-lance', 'arcane-nova', 'thunder-strike']);
      const [hbCastBtn, hbSlotBtn] = hbTree.root.findAllByType('button');
      const hbSlider = hbTree.root.findByType('input');
      const getSlotCooldown = (key: string) =>
        hbTree.root.find((n) => n.type === 'g' && n.props['data-slot-key'] === key).props['data-slot-cooldown'];
      // Initially slot W (index 1) is 60%
      assert.equal(hbSlider.props.value, 60);
      // Start cast on W -> W=100% and running
      act(() => hbCastBtn!.props.onClick());
      assert.equal(hbSlider.props.value, 100);
      assert.equal(activeTimers.size, 1, 'Hotbar must use a single shared interval timer');
      const initialTimerKey = [...activeTimers.keys()][0];
      // Switch to slot E (index 2) -> slider shows E's 30% cooldown while W continues ticking
      act(() => hbSlotBtn!.props.onClick());
      assert.equal(hbSlider.props.value, 30, 'Switching to slot E must show E cooldown (30%), not migrate W cooldown');
      // Repeatedly cast E (9 clicks) with intervening simulated ticks: E restarts to 100% while W keeps progressing
      for (let click = 1; click <= 9; click++) {
        act(() => hbCastBtn!.props.onClick());
        assert.equal(activeTimers.size, 1, 'Recasting E must preserve the single interval without creating extra timers');
        assert.equal([...activeTimers.keys()][0], initialTimerKey, 'Recasting E must not tear down/restart the shared interval');
        assert.equal(getSlotCooldown('E'), 100, 'Recasting E resets slot E to 100%');
        act(() => {
          for (const cb of [...activeTimers.values()]) cb();
        });
        assert.equal(getSlotCooldown('W'), 100 - click * 10, `Slot W must progress to ${100 - click * 10}% after tick ${click}`);
        assert.equal(getSlotCooldown('E'), 90, 'Slot E ticks down to 90% on the shared interval');
      }
      // After 9 ticks W is at 10% and E is at 90%; one more tick finishes W (0%) while E reaches 80%
      act(() => {
        for (const cb of [...activeTimers.values()]) cb();
      });
      assert.equal(getSlotCooldown('W'), 0, 'Slot W reaches 0% after 10 ticks');
      assert.equal(getSlotCooldown('E'), 80, 'Slot E continues at 80% after W finishes');
      assert.equal(activeTimers.size, 1, 'Shared interval stays active while E is still running');
      // Finish remaining 8 ticks for E -> both W and E are at 0% and timer cleans up
      for (let i = 0; i < 8; i++) {
        act(() => {
          for (const cb of [...activeTimers.values()]) cb();
        });
      }
      assert.equal(getSlotCooldown('W'), 0);
      assert.equal(getSlotCooldown('E'), 0);
      assert.equal(activeTimers.size, 0, 'Shared interval must stop when both W and E finish');
      act(() => hbTree.unmount());

      // 5g. Turn order timeline keeps one displayed queue as source of truth across Next Turn rotations and Haste reprioritization
      let turnTree!: ReturnType<typeof create>;
      act(() => {
        turnTree = create(
          <LocaleProvider initialLocale="en">
            <InteractiveDemo techniqueId="px-turn-order-timeline" />
          </LocaleProvider>
        );
      });
      const [nextTurnBtn, hasteBtn, resetTurnBtn] = turnTree.root.findAllByType('button');
      const getQueueOrder = () =>
        turnTree.root
          .findAll((n) => n.type === 'g' && n.props['data-unit-id'] !== undefined)
          .map((n) => n.props['data-unit-id']);
      assert.deepEqual(getQueueOrder(), ['rogue', 'hero', 'mage', 'boss']);
      // Two normal Next actions: each rotates the displayed queue and activates the unit that was shown second
      act(() => nextTurnBtn!.props.onClick());
      assert.deepEqual(getQueueOrder(), ['hero', 'mage', 'boss', 'rogue']);
      act(() => nextTurnBtn!.props.onClick());
      assert.deepEqual(getQueueOrder(), ['mage', 'boss', 'rogue', 'hero']);
      // Reset; click Mage Haste -> active unit (rogue) stays stable at #1, waiting part reprioritizes mage to #2
      act(() => resetTurnBtn!.props.onClick());
      assert.deepEqual(getQueueOrder(), ['rogue', 'hero', 'mage', 'boss']);
      act(() => hasteBtn!.props.onClick());
      assert.deepEqual(getQueueOrder(), ['rogue', 'mage', 'hero', 'boss']);
      // Click Next -> activates mage (the unit that was shown second) and moves rogue to the tail
      act(() => nextTurnBtn!.props.onClick());
      assert.deepEqual(getQueueOrder(), ['mage', 'hero', 'boss', 'rogue']);
      act(() => turnTree.unmount());

      // 5h. Collectible badges render 6 distinct glyphs and padlock silhouettes (no '?' text)
      let badgeTree!: ReturnType<typeof create>;
      act(() => {
        badgeTree = create(
          <LocaleProvider initialLocale="en">
            <InteractiveDemo techniqueId="px-collectible-badge-grid" />
          </LocaleProvider>
        );
      });
      const padlocks = badgeTree.root.findAll((n) => n.type === 'g' && n.props['data-badge-lock'] === 'padlock');
      assert.equal(padlocks.length, 2, 'Initial 4/6 badge grid must render 2 padlock silhouettes');
      const badgeTexts = badgeTree.root.findAllByType('text').map((t) => t.children.join(''));
      assert.ok(!badgeTexts.includes('?'), 'Locked badges must use padlock silhouettes rather than ? text');
      const unlockAllBtn = badgeTree.root.findAllByType('button')[2]!;
      act(() => unlockAllBtn.props.onClick());
      const badgeGlyphs = badgeTree.root
        .findAll((n) => n.type === 'g' && n.props['data-badge-glyph'] !== undefined)
        .map((n) => n.props['data-badge-glyph']);
      assert.deepEqual(badgeGlyphs.slice(0, 6), ['flame', 'trident', 'wing', 'shield', 'star', 'crown']);
      act(() => badgeTree.unmount());

      // 5i. Teleport shows Pad A only at 0..3, neither body at 4, Pad B only at 5..8
      let tpCheckTree!: ReturnType<typeof create>;
      act(() => {
        tpCheckTree = create(
          <LocaleProvider initialLocale="en">
            <InteractiveDemo techniqueId="px-teleport-dissolve-reform" />
          </LocaleProvider>
        );
      });
      const getBodies = () =>
        tpCheckTree.root
          .findAll((n) => n.type === 'g' && n.props['data-pad-sprite'] !== undefined)
          .map((n) => n.props['data-pad-sprite']);
      // Initial phase 3 -> Pad A only
      assert.deepEqual(getBodies(), ['A'], 'At phase 3, character must only appear on Pad A');
      const tpPhaseSlider = tpCheckTree.root.findByType('input');
      act(() => tpPhaseSlider.props.onChange({ target: { value: '4' } }));
      assert.deepEqual(getBodies(), [], 'At phase 4, neither pad renders the character body');
      act(() => tpPhaseSlider.props.onChange({ target: { value: '5' } }));
      assert.deepEqual(getBodies(), ['B'], 'At phase 5, character must only appear on Pad B');
      act(() => tpCheckTree.unmount());

      // 5j. Ice frost renders center stone fountain and Portal renders 4 spiral arms + 8 archway runes
      let iceCheckTree!: ReturnType<typeof create>;
      let portalCheckTree!: ReturnType<typeof create>;
      act(() => {
        iceCheckTree = create(
          <LocaleProvider initialLocale="en">
            <InteractiveDemo techniqueId="px-ice-freeze-thaw-spread" />
          </LocaleProvider>
        );
        portalCheckTree = create(
          <LocaleProvider initialLocale="en">
            <InteractiveDemo techniqueId="px-pixel-portal-swirl" />
          </LocaleProvider>
        );
      });
      const fountains = iceCheckTree.root.findAll((n) => n.type === 'g' && n.props['data-ice-fountain'] === 'center');
      assert.equal(fountains.length, 1, 'Ice demo must render central stone fountain');
      const spiralArms = portalCheckTree.root.findAll((n) => n.type === 'path' && n.props['data-portal-arm'] !== undefined);
      assert.equal(spiralArms.length, 4, 'Portal demo must render 4 stepped spiral arms when open');
      const runes = portalCheckTree.root.findAll((n) => n.type === 'rect' && n.props['data-portal-rune'] !== undefined);
      assert.equal(runes.length, 8, 'Portal demo must render 8 archway rune indicators');
      const litRunes = runes.filter((r) => r.props['data-rune-lit'] === 'true');
      assert.equal(litRunes.length, 6, 'At initial step 2, 6 of 8 archway runes must be lit');
      act(() => {
        iceCheckTree.unmount();
        portalCheckTree.unmount();
      });

      // 5k. Rapid one-shot replay refreshes timer & resets to frame 0; manual scrub cancels running one-shot
      let shockTree!: ReturnType<typeof create>;
      act(() => {
        shockTree = create(
          <LocaleProvider initialLocale="en">
            <InteractiveDemo techniqueId="px-ground-shockwave-rings" />
          </LocaleProvider>
        );
      });
      const slamBtn = shockTree.root.findAllByType('button')[0]!;
      const shockSlider = shockTree.root.findByType('input');
      act(() => slamBtn.props.onClick());
      assert.equal(shockSlider.props.value, 0, 'Slam starts at frame 0');
      const firstTimerId = [...activeTimers.keys()][0]!;
      act(() => {
        for (const cb of [...activeTimers.values()]) cb();
      });
      assert.equal(shockSlider.props.value, 1, 'After 1 tick, shockwave is at frame 1');
      // Rapid replay midway resets frame to 0 and schedules a fresh interval timer (so frame 0 gets full interval)
      act(() => slamBtn.props.onClick());
      assert.equal(shockSlider.props.value, 0, 'Rapid replay resets shockwave to frame 0');
      assert.equal(activeTimers.size, 1, 'Still exactly one active timer after rapid replay');
      const secondTimerId = [...activeTimers.keys()][0]!;
      assert.notEqual(secondTimerId, firstTimerId, 'Rapid replay must refresh the interval timer');
      // Manual slider scrub cancels the running one-shot
      act(() => shockSlider.props.onChange({ target: { value: '4' } }));
      assert.equal(shockSlider.props.value, 4);
      assert.equal(activeTimers.size, 0, 'Manual slider scrub cancels running one-shot timer');
      act(() => shockTree.unmount());

      // 5l. Viewport IntersectionObserver gating pauses timer on exit and resumes on re-entry
      const origIO = globalThis.IntersectionObserver;
      let ioCallback: ((entries: Array<{ isIntersecting: boolean }>) => void) | null = null;
      globalThis.IntersectionObserver = class MockIO {
        constructor(cb: (entries: Array<{ isIntersecting: boolean }>) => void) {
          ioCallback = cb;
        }
        observe() {}
        disconnect() {}
      } as unknown as typeof IntersectionObserver;

      try {
        let smithTree!: ReturnType<typeof create>;
        act(() => {
          smithTree = create(
            <LocaleProvider initialLocale="en">
              <InteractiveDemo techniqueId="px-blacksmith-hammer-strike" />
            </LocaleProvider>,
            {
              createNodeMock: (element) => (element.type === 'div' ? {} : null),
            }
          );
        });
        assert.equal(activeTimers.size, 1, 'Blacksmith loop timer runs while visible');
        assert.ok(ioCallback !== null, 'IntersectionObserver must observe containerRef');
        act(() => {
          ioCallback!([{ isIntersecting: false }]);
        });
        assert.equal(activeTimers.size, 0, 'Viewport exit clears running interval timer');
        act(() => {
          ioCallback!([{ isIntersecting: true }]);
        });
        assert.equal(activeTimers.size, 1, 'Viewport re-entry resumes interval timer');
        act(() => smithTree.unmount());
        assert.equal(activeTimers.size, 0, 'Unmount cleans up interval timer');
      } finally {
        globalThis.IntersectionObserver = origIO;
      }
    } finally {
      globalThis.setInterval = origSetInterval;
      globalThis.clearInterval = origClearInterval;
    }
  }
});
