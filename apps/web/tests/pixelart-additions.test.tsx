import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { TECHNIQUES, searchTechniques, getTechniqueText } from '@vibe-dictionary/catalog';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';
import { PIXELART_DEMOS } from '../src/components/demos/pixelart';
import { LocaleProvider, useLocale } from '../src/i18n/LocaleContext';

test('pixel art catalog registers exactly 20 techniques evenly divided across 5 categories', () => {
  const pixelTechniques = TECHNIQUES.filter((item) => item.domain === 'pixelart');
  assert.equal(pixelTechniques.length, 20);

  const categories = ['sprites', 'environments', 'tiles', 'game_ui', 'effects'] as const;
  for (const cat of categories) {
    const items = pixelTechniques.filter((item) => item.category === cat);
    assert.equal(items.length, 4, `category ${cat} must have exactly 4 techniques`);
  }

  // All 20 IDs must be present in PIXELART_DEMOS including px-minimap-radar
  const demoIds = Object.keys(PIXELART_DEMOS);
  assert.equal(demoIds.length, 20);
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
  assert.equal(imgSvgs.length, 17, 'Non-interactive pixel art SVGs must expose role=img');
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
