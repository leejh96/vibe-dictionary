import type { TechniqueTranslation } from '../../localization';

export const PIXELART_EXPANSION_TRANSLATIONS: Record<string, TechniqueTranslation> = {
  /* ============================================================================
   * 1. Sprites (6 additions)
   * ============================================================================ */
  'px-blacksmith-hammer-strike': {
    summary: 'A 4-frame blacksmith forge sprite on a 48x48 integer grid covering overhead windup, anvil impact, 8-spark rebound, and recovery',
    vibeTag: 'Raising a heavy smithing hammer above a glowing forge and striking heated steel to scatter integer spark particles',
    vibeKeywords: ['Blacksmith forge', 'Hammer strike frames', 'Anvil sparks', 'Pixel smithy', 'Attack windup recovery', 'Forge animation'],
    promptSnippet:
      'Create a blacksmith hammer forge strike pixel sprite in the designated container. The core requirement is a 4-frame cycle on a 48x48 integer pixel grid covering frame 0 overhead windup, frame 1 anvil impact (+2px anvil shake), frame 2 rebound with 8 spark particles, and frame 3 recovery. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 16px padding, place an SVG with viewBox 0 0 264 144, width 264px, 12px rounded corners, and shape-rendering crispEdges. Start initially at spark rebound frame 2, and provide a 0.14s play/pause toggle, a steel orange vs rune cyan heat toggle, and a 0 to 3 frame scrubber slider. Disable automatic playback and preserve manual slider scrubbing under reduced motion.',
  },
  'px-jump-arc-poses': {
    summary: 'A 5-phase platformer jump sequence linking crouch anticipation, launch stretch, apex hang-time, descent, landing dust, and shadow scale',
    vibeTag: 'Tracing a 5-step parabolic jump arc from crouch anticipation to billowing apex hang-time and landing dust puffs',
    vibeKeywords: ['Jump arc poses', 'Anticipation crouch', 'Apex hang-time', 'Landing dust', 'Platformer jump', 'Parabolic sprite'],
    promptSnippet:
      'Create a 5-phase platformer character jump pose pixel sprite in the designated container. The core requirement is coordinating frame 0 anticipation crouch, frame 1 upward launch stretch, frame 2 apex hang-time (height 34px or low-gravity 46px), frame 3 descent fall, and frame 4 landing cushion with dust puffs and ground shadow scaling. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 16px padding, place an SVG with viewBox 0 0 264 144, width 264px, 12px rounded corners, and shape-rendering crispEdges. Start initially at apex frame 2, and provide a 0.16s play/pause toggle, a normal gravity (34px) vs lunar low-gravity (46px) button, and a 0 to 4 phase slider.',
  },
  'px-dragon-wing-stroke': {
    summary: 'A hovering wyvern sprite where 4-frame membrane wing strokes drive counter-reactive vertical body bounce and ember breath',
    vibeTag: 'Sweeping articulated dragon wing membranes up and down with counter-reactive torso bounce and fiery breath aura',
    vibeKeywords: ['Dragon wingbeat', 'Wyvern flight loop', 'Wing membrane frames', 'Boss monster sprite', 'Hover counter-bounce', 'Pixel dragon'],
    promptSnippet:
      'Create a hovering dragon wing stroke pixel sprite over a volcanic canyon in the designated container. The core requirement is a 4-frame cycle (frame 0 upstroke peak, frame 1 power downstroke with updraft lines, frame 2 lowest tuck, frame 3 recovery fold) where the body counter-bounces vertically. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 16px padding, place an SVG with viewBox 0 0 264 144, width 264px, 12px rounded corners, and shape-rendering crispEdges. Start initially at frame 0 with flame aura enabled, and provide a 0.15s wingbeat play/pause toggle, a flame breath aura toggle, and a 0 to 3 frame slider.',
  },
  'px-slime-squash-stretch': {
    summary: 'A volume-preserving jelly slime monster deforming between 60x18 squash and 24x48 vertical stretch while shifting its inner nucleus',
    vibeTag: 'Bouncing with conserved pixel volume from a flattened 60px wide puddle to an elongated 48px tall leap',
    vibeKeywords: ['Slime squash', 'Volume preservation', 'Jelly monster bounce', 'Squash and stretch', 'Dot slime', 'Elastic deformation'],
    promptSnippet:
      'Create a volume-preserving pixel slime squash and stretch demo in the designated container. The core requirement is preserving approximate area across 5 deformation steps from step -2 extreme squash (width 60px, height 18px) through step 0 neutral rest (width 40px, height 30px) to step +2 extreme stretch (width 24px, height 48px) while shifting the inner core and specular highlights. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 16px padding, place an SVG with viewBox 0 0 264 144, width 264px, 12px rounded corners, and shape-rendering crispEdges. Start at deformation step 0, and provide a 0.13s elastic bounce toggle, an Emerald vs Arcane Purple element toggle, and a -2 to 2 deformation slider.',
  },
  'px-modular-robot-loadout': {
    summary: 'A 48x48 modular mech sprite attaching radar antenna, jetpack booster, and plasma shield accessories onto fixed hardpoint sockets',
    vibeTag: 'Locking radar antenna, jetpack thrusters, and plasma shield modules onto fixed pixel mech hardpoints',
    vibeKeywords: ['Modular robot', 'Part customization', 'Pixel mech loadout', 'Hardpoint attachment', 'Equipment layering', 'Sprite paperdoll'],
    promptSnippet:
      'Create a modular pixel robot accessory loadout system in the designated container. The core requirement is attaching a head radar antenna, back jetpack booster, and right-arm plasma shield onto fixed hardpoint sockets on a 48x48 integer pixel mech chassis without misalignment. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 16px padding, place an SVG with viewBox 0 0 264 144, width 264px, 12px rounded corners, and shape-rendering crispEdges. Start with the antenna and jetpack enabled in Titan Blue paint, and provide 3 individual module toggle buttons plus 3 chassis paint preset buttons (Titan Blue, Industrial Yellow, Stealth Crimson).',
  },
  'px-directional-archer-draw': {
    summary: 'A directional ranger sprite combining 0-degree, +45-degree upward, and -30-degree downward stepped bow aim with 4 draw and release steps',
    vibeTag: 'Aligning stepped pixel bow geometry, nocked arrows, and release trajectories across +45-degree, 0-degree, and -30-degree targets',
    vibeKeywords: ['Archer bow draw', 'Directional aiming', 'Bowstring tension frames', 'Arrow release streak', 'Pixel ranger', 'Aim angle sprite'],
    promptSnippet:
      'Create a directional pixel archer sprite controlling aim angle and bowstring tension in the designated container. The core requirement is pivoting the stepped integer bow, nocked arrow, and release trajectory toward +45-degree upward, 0-degree level, and -30-degree downward targets while keeping the feet planted, paired with 4 draw steps (0 ready, 1 half draw, 2 full draw, 3 arrow release streak). In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 16px padding, place an SVG with viewBox 0 0 264 144, width 264px, 12px rounded corners, and shape-rendering crispEdges. Start at 0-degree aim and step 2 full draw, and provide 3 angle buttons (+45°, 0°, -30°) plus a 0 to 3 draw slider.',
  },

  /* ============================================================================
   * 2. Environments (6 additions)
   * ============================================================================ */
  'px-snow-village-accumulation': {
    summary: 'A winter village scene linking continuously wrapping snowfall flurries (0 to 36 flakes) with stepped snowdrift thickness (0 to 8px)',
    vibeTag: 'Blanketing warm-lit timber cottage roofs and pine branches in thickening pixel snowdrifts as snowfall intensifies',
    vibeKeywords: ['Snow village accumulation', 'Snowfall density', 'Winter cottages', 'Roof snowdrifts', 'Pixel winter scene', 'Flurry simulation'],
    promptSnippet:
      'Create a snow village pixel landscape where snowfall density and roof accumulation are linked in the designated container. The core requirement is scaling both continuously wrapping falling snowflakes (over a 126px vertical loop) and stepped snowdrift thickness (0px to 8px) on roofs and pines across level 0 clear frost (0 flakes, timer paused), level 1 light flurry (12 flakes, 2px snow), level 2 heavy snow (24 flakes, 5px snow), and level 3 blizzard (36 flakes, 8px snow). In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 16px padding, place an SVG with viewBox 0 0 264 144, width 264px, 12px rounded corners, and shape-rendering crispEdges. Start at accumulation level 2 with warm cottage lights on, and provide a 0.12s snowfall toggle, a window lantern toggle, and a 0 to 3 accumulation slider.',
  },
  'px-aurora-tundra-bands': {
    summary: 'An arctic tundra nightscape shifting 28 vertical pixel aurora curtain columns in a sinusoidal wave with frozen lake reflections',
    vibeTag: 'Rippling emerald and violet vertical pixel aurora curtains across polar night skies and frozen glacier waters',
    vibeKeywords: ['Aurora tundra', 'Northern lights curtain', 'Glacier lake reflection', 'Polar night scene', 'Vertical band shift', 'Pixel aurora'],
    promptSnippet:
      'Create an arctic tundra pixel landscape with rippling aurora curtains in the designated container. The core requirement is shifting 28 vertical pixel columns in a stepped sinusoidal wave across phases 0 to 11 while mirroring the glow on the frozen lake below. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 16px padding, place an SVG with viewBox 0 0 264 144, width 264px, 12px rounded corners, and shape-rendering crispEdges. Start at phase 3, and provide a 0.14s wave play/pause toggle, a Green-Violet vs Cyan-Magenta spectrum button, and a 0 to 11 phase slider.',
  },
  'px-underwater-ruin-caustics': {
    summary: 'A sunken temple environment casting animated diagonal water-surface caustic light bands and rising bubble chains across stone columns',
    vibeTag: 'Intersecting cyan caustic light shafts from rippling ocean waves across sunken temple pillars and seabed ruins',
    vibeKeywords: ['Underwater caustics', 'Sunken temple ruins', 'Refracted water light', 'Rising pixel bubbles', 'Deep sea scene', 'Ocean light shafts'],
    promptSnippet:
      'Create an underwater ruin pixel landscape illuminated by surface caustic light in the designated container. The core requirement is animating diagonal caustic light bands refracted from surface waves across stone temple pillars and the seabed at 0.15s intervals alongside rising bubble chains. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 16px padding, place an SVG with viewBox 0 0 264 144, width 264px, 12px rounded corners, and shape-rendering crispEdges. Start at caustic intensity 2 with glowing coral enabled, and provide a wave play/pause toggle, a bioluminescent coral toggle, and a 1 to 3 intensity slider.',
  },
  'px-windmill-wheat-breeze': {
    summary: 'A pastoral hill scene synchronizing 4-phase (8-position) windmill sail rotation speed and 24 golden wheat stalk bending waves to breeze strength',
    vibeTag: 'Turning latticed windmill sails and rippling golden wheat stalks in harmony with the pastoral breeze',
    vibeKeywords: ['Windmill wheat field', 'Golden wheat wave', 'Rotating windmill sails', 'Pastoral hill scene', 'Wind sway environment', 'Pixel countryside'],
    promptSnippet:
      'Create a windmill hill and golden wheat field pixel landscape responding to wind in the designated container. The core requirement is rotating the 4-blade windmill through 4 rotational phases (8 quantized sail positions) at wind-scaled intervals (0.20s, 0.14s, 0.09s for levels 1 to 3, stopping at 0) while bending 24 foreground wheat stalks proportionally. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 16px padding, place an SVG with viewBox 0 0 264 144, width 264px, 12px rounded corners, and shape-rendering crispEdges. Start at breeze level 2 (0.14s cadence) under a noon sky, and provide a wind play/pause toggle, a Noon vs Dusk sky toggle, and a 0 to 3 breeze strength slider.',
  },
  'px-lava-channel-flow': {
    summary: 'A volcanic cavern scene moving incandescent magma chevrons and dark cooling basalt crust tiles along a channel and lava waterfall',
    vibeTag: 'Streaming incandescent magma and dark cooling crust plates down a basalt cavern channel and waterfall',
    vibeKeywords: ['Lava channel flow', 'Volcanic magma river', 'Cooling basalt crust', 'Lava waterfall', 'Cavern environment', 'Pixel magma'],
    promptSnippet:
      'Create a volcanic lava channel and magma waterfall pixel landscape in the designated container. The core requirement is grading the channel from an incandescent yellow-white core to crimson edges while advancing dark cooling crust tiles down the channel and waterfall across flow phases 0 to 5. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 16px padding, place an SVG with viewBox 0 0 264 144, width 264px, 12px rounded corners, and shape-rendering crispEdges. Start at flow phase 2, and provide a 0.13s magma flow play/pause toggle, a cooling crust density toggle, and a 0 to 5 flow phase slider.',
  },
  'px-forest-canopy-shafts': {
    summary: 'An ancient woodland scene tilting diagonal dithered sunbeam shafts (-20 to 20 degrees) and matching illuminated moss patches on the floor',
    vibeTag: 'Piercing dense oak canopy gaps with angled golden sunbeam shafts that light up mossy forest shrine stones',
    vibeKeywords: ['Forest canopy shafts', 'Woodland god rays', 'Canopy light gaps', 'Mossy forest shrine', 'Pollen mote shimmer', 'Pixel sunbeams'],
    promptSnippet:
      'Create an ancient forest pixel landscape with sunbeam light shafts piercing the canopy in the designated container. The core requirement is tilting the diagonal light shafts via a sun angle slider (-20 to 20 in steps of 5) while shifting the illuminated moss patches on the forest floor to match. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 16px padding, place an SVG with viewBox 0 0 264 144, width 264px, 12px rounded corners, and shape-rendering crispEdges. Start at 0-degree angle and 3-shaft mode, and provide 3-shaft, 5-shaft, and shrine-focus preset buttons, a pollen shimmer toggle, and a -20 to 20 sun angle slider.',
  },

  /* ============================================================================
   * 3. Tiles & Patterns (6 additions)
   * ============================================================================ */
  'px-dual-grid-shore-corners': {
    summary: 'A half-tile offset 3x3 dual-grid shoreline over a 4x4 vertex grid joining seamless interior grass and drawing sand only on water boundaries',
    vibeTag: 'Offsetting the render grid by half a tile to resolve smooth coastal corners from 4 terrain vertex bits',
    vibeKeywords: ['Dual-grid shoreline', 'Half-tile offset grid', 'Shoreline corner tiles', '4-bit vertex mask', 'Autotile alternative', 'Pixel coast tiles'],
    promptSnippet:
      'Create a half-tile offset Dual-Grid shoreline tile system in the designated container. The core requirement is overlaying a 3x3 rendered dual grid shifted by half a tile over a 4x4 logical terrain vertex grid (grass land vs water), reading each tile’s 4 corner bits (0 to 15) to join adjacent land quadrants with seamless green grass while drawing yellow sand beaches, sea foam, and diagonal saddle bridges (masks 5 and 10) only along water boundaries. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 16px padding, place an SVG with viewBox 0 0 264 144, width 264px, 12px rounded corners, and shape-rendering crispEdges. Provide Bay, Saddle, and Atoll terrain preset buttons, a dual-grid guide overlay toggle, and a wave foam step button.',
  },
  'px-wang-edge-color-tiles': {
    summary: 'A 3x3 2-edge Wang tile board matching North, East, South, and West edge color codes across neighboring dungeon canal tiles',
    vibeTag: 'Matching North, East, South, and West 2-color edge codes across adjacent tiles for seamless dungeon canals',
    vibeKeywords: ['Wang edge tiles', 'Edge color matching', 'Aperiodic tiling', 'Dungeon canal tiles', 'Edge bitmask', 'Seamless tile joints'],
    promptSnippet:
      'Create a 2-edge color matching Wang Tiles board in the designated container. The core requirement is a 3x3 tile grid where each tile’s North (1), East (2), South (4), and West (8) edges carry a gold canal (1) or blue stone (0) code, and toggling edges on the center tile immediately updates neighboring shared edges to stay matched. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 16px padding, place an SVG with viewBox 0 0 264 144, width 264px, 12px rounded corners, and shape-rendering crispEdges. Provide North, East, and South/West edge toggle buttons, a 4-edge bowtie guide toggle, and a reset layout button.',
  },
  'px-seeded-brick-variants': {
    summary: 'An 8x5 staggered castle wall tilemap using mixed deterministic seed-and-coordinate hashing to scatter cracked, mossy, and recessed dark bricks',
    vibeTag: 'Breaking grid repetition with deterministic coordinate hashes that scatter cracked, mossy, and recessed dark bricks',
    vibeKeywords: ['Seeded brick variants', 'Coordinate hash tiles', 'Dungeon wall variation', 'Mossy cracked bricks', 'Anti-repetition tiles', 'Procedural tilemap'],
    promptSnippet:
      'Create a seeded hash brick variant tile system in the designated container. The core requirement is using a mixed deterministic integer coordinate-and-seed hash across an 8x5 staggered castle wall grid so Seeds #1, #2, and #3 visibly redistribute plain, cracked, mossy, and recessed dark bricks while identical seed and density values reproduce identical patterns. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 16px padding, place an SVG with viewBox 0 0 264 144, width 264px, 12px rounded corners, and shape-rendering crispEdges. Provide Seed 1, 2, and 3 buttons, a seeded vs uniform comparison toggle, and a variant density slider (0 to 100% in steps of 25, initial 50%).',
  },
  'px-nine-slice-pixel-frame': {
    summary: 'A 9-slice RPG window frame preserving unstretched 12x12px corner rivets while tiling top, bottom, left, and right border segments',
    vibeTag: 'Resizing RPG dialog frames across width and height while keeping 12x12px gold-riveted corners at crisp 1:1 scale',
    vibeKeywords: ['9-slice pixel frame', 'Nine-patch window', 'Corner-preserving resize', 'RPG window border', 'Scalable tile frame', 'UI slice guide'],
    promptSnippet:
      'Create a distortion-free 9-Slice pixel frame resize demo in the designated container. The core requirement is keeping the four 12x12px gold-riveted corner blocks at 1:1 integer scale while expanding only the edges and center across widths (108px, 168px, 228px) and heights (48px to 108px in 12px steps). In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 16px padding, place an SVG with viewBox 0 0 264 144, width 264px, 12px rounded corners, and shape-rendering crispEdges. Start at width 168px, height 84px with 9-slice guides on, and provide 3 width preset buttons, a slice guide toggle, and a height slider (48 to 108).',
  },
  'px-conveyor-elbow-orientation': {
    summary: 'An industrial conveyor tile system rotating the central elbow turntable to reroute roller chevrons and traveling cargo crates',
    vibeTag: 'Rotating the corner elbow turntable tile to redirect conveyor roller arrows and energy crate cargo paths',
    vibeKeywords: ['Conveyor elbow tile', 'Belt direction switch', 'Factory tileset', 'Cargo routing track', 'Roller animation', 'Turntable tile'],
    promptSnippet:
      'Create a factory conveyor belt and corner elbow orientation tile demo in the designated container. The core requirement is switching the central elbow tile between right-down corner, down-left corner, and straight pass-through so roller chevrons and the traveling energy crate (steps 0 to 7) immediately follow the selected exit. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 16px padding, place an SVG with viewBox 0 0 264 144, width 264px, 12px rounded corners, and shape-rendering crispEdges. Start at right-down corner and step 3, and provide an elbow rotate button, a forward/reverse toggle, a 0.14s belt run toggle, and a 0 to 7 position slider.',
  },
  'px-one-way-platform-collision': {
    summary: 'A platformer scaffold tile visualizing its 2px top-only collision edge across upward pass-through, top landing, and down-jump drop modes',
    vibeTag: 'Passing freely upward through wooden scaffold tiles before locking cleanly onto the 2px top collision lip on descent',
    vibeKeywords: ['One-way platform tile', 'Top collision edge', 'Pass-through scaffold', 'Down-jump drop', 'Platformer terrain', 'Hitbox raycast'],
    promptSnippet:
      'Create a platformer One-Way platform top collision edge demo in the designated container. The core requirement is visualizing the 2px top collision lip to compare upward pass-through (Δy < 0), top-surface landing (Δy >= 0), and down-jump drop-through across steps 0 to 5. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 16px padding, place an SVG with viewBox 0 0 264 144, width 264px, 12px rounded corners, and shape-rendering crispEdges. Start in top-landing mode at step 3 with the collision line overlay enabled, and provide 3 trajectory mode buttons, a collision line toggle, and a 0 to 5 trajectory step slider.',
  },

  /* ============================================================================
   * 4. Game UI (6 additions)
   * ============================================================================ */
  'px-quest-tracker-states': {
    summary: 'A pinned RPG quest tracker HUD updating Relic Key, Altar Seal, and Boss Clear objective checkboxes, progress gauge, and chest unlock',
    vibeTag: 'Checking off quest objectives to fill the progress gauge and pop open the golden reward chest at 3/3 completion',
    vibeKeywords: ['Quest tracker UI', 'Objective checklist', 'Mission progress bar', 'RPG quest log', 'Reward unlock feedback', 'HUD tracker'],
    promptSnippet:
      'Create a pixel RPG quest tracker HUD that monitors objective states in the designated container. The core requirement is displaying 3 objective rows (1. Relic Key, 2. Altar Seal, 3. Boss Clear) and a top progress bar, unlocking the golden reward chest and COMPLETE banner when all 3 objectives reach 3/3. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 16px padding, place an SVG with viewBox 0 0 264 144, width 264px, 12px rounded corners, and shape-rendering crispEdges. Start at 2/3 with objectives 1 and 2 completed, and provide 3 objective toggle buttons, a pin highlight toggle, and a reset button.',
  },
  'px-radial-spell-hotbar-cooldown': {
    summary: 'A 4-slot action RPG spell hotbar with distinct pixel spell glyphs, independent per-slot radial cooldown sweeps, percentage readouts, and ready borders',
    vibeTag: 'Sweeping a dark clockwise radial mask across 4 distinct pixel spell icons with per-slot cooldown percentages and ready frames',
    vibeKeywords: ['Spell hotbar cooldown', 'Radial cooldown sweep', 'Skill slot bar', 'Cooldown timer overlay', 'Action RPG hotbar', 'Pixel skill icons'],
    promptSnippet:
      'Create a 4-slot pixel spell hotbar with independent per-slot radial cooldown sweeps in the designated container. The core requirement is giving Q, W, E, and R distinct pixel spell glyphs (Fireball, Frost Lance, Arcane Nova, Thunder Strike) and independent cooldown states (0 to 100% in 10% steps) on a shared 0.12s cadence so casting or recasting resets only the selected slot to 100% without delaying or migrating already running slots, overlaying a dark clockwise sector mask and percentage readout, and illuminating a gold READY border at 0%. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 16px padding, place an SVG with viewBox 0 0 264 144, width 264px, 12px rounded corners, and shape-rendering crispEdges. Start with slot W selected (Q 0%, W 60%, E 30%, R 0%), and provide a cast button that ticks the selected slot from 100% to 0% every 0.12s, a slot cycle button, and a 0 to 100% cooldown slider for manual percentage preview of the selected slot.',
  },
  'px-turn-order-timeline': {
    summary: 'A 4-unit tactical RPG initiative timeline using one displayed queue where Next Turn rotates the active unit to the tail and haste buffs reprioritize the waiting units (#2 to #4) by speed (SPD)',
    vibeTag: 'Advancing unit portrait tokens along an initiative rail and overtaking waiting slots when speed buffs activate',
    vibeKeywords: ['Turn order timeline', 'Initiative bar', 'Turn-based combat UI', 'Speed buff reorder', 'Unit queue rail', 'Tactical RPG HUD'],
    promptSnippet:
      'Create a 4-unit turn-based RPG initiative timeline bar in the designated container. The core requirement is maintaining one displayed queue of 4 unit cards (Rogue SPD 18, Hero SPD 16, Mage SPD 14, Boss SPD 11) along the top rail as the single source of truth: clicking Next Turn rotates that displayed queue so slot #2 becomes the new active #1 unit and the previous #1 unit moves to the tail (#4), while toggling Mage Haste (SPD 14 to 22) keeps the current #1 unit anchored and reprioritizes the waiting units (#2 to #4) by descending SPD. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 16px padding, place an SVG with viewBox 0 0 264 144, width 264px, 12px rounded corners, and shape-rendering crispEdges. Provide a Next Turn button, a Mage haste buff toggle, an SPD readout toggle, and a reset order button.',
  },
  'px-branching-dialogue-choices': {
    summary: 'A branching dialogue decision tree UI comparing 3 response choices (+15/-5/+25 affinity), confirmation state, and compact route tags',
    vibeTag: 'Selecting between Bold Charge, Bribe Cipher, and Forge Pact dialogue branches to preview affinity shifts and route tags',
    vibeKeywords: ['Branching dialogue choices', 'Decision tree UI', 'Affinity meter shift', 'RPG dialogue branches', 'Outcome preview', 'Choice confirmation'],
    promptSnippet:
      'Create a branching pixel dialogue choice UI where selections shift story paths and affinity stats in the designated container. Distinct from typewriter text, the core requirement is comparing Gate Warden Kael’s prompt and 3 instant response choices (1. Bold Charge +15, 2. Bribe Cipher -5, 3. Forge Pact +25) alongside a live affinity gauge and compact route tags (BREACH ROUTE, STEALTH ROUTE, ALLIANCE ROUTE) that fit cleanly inside the dialogue panel. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 16px padding, place an SVG with viewBox 0 0 264 144, width 264px, 12px rounded corners, and shape-rendering crispEdges. Start with choice 1 Bold Charge selected, and provide 3 choice buttons, a confirm/change decision toggle, and an outcome route tag toggle.',
  },
  'px-equipment-stat-comparison': {
    summary: 'An RPG equipment inspect panel comparing Iron Sword baseline stats (32/28/15) against 3 candidates with signed deltas and gain/loss arrows',
    vibeTag: 'Contrasting equipped and candidate weapons with crisp green upward gain arrows and red downward stat deltas',
    vibeKeywords: ['Equipment stat comparison', 'Stat delta arrows', 'Weapon swap preview', 'RPG loadout compare', 'Delta readout UI', 'Pixel stat bars'],
    promptSnippet:
      'Create a pixel equipment stat comparison window contrasting equipped and candidate weapons in the designated container. The core requirement is comparing the baseline weapon (Iron Sword: ATK 32, SPD 28, CRIT 15) against 3 candidates (Sunblade 46/22/30, Shadow Dagger 26/44/45, Titan Greatsword 58/12/20) with green signed +delta ▲ indicators for gains, red -delta ▼ for losses, and gray 0 = when equipped. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 16px padding, place an SVG with viewBox 0 0 264 144, width 264px, 12px rounded corners, and shape-rendering crispEdges. Start with Sunblade selected, and provide 3 candidate buttons plus an equip/restore baseline toggle.',
  },
  'px-collectible-badge-grid': {
    summary: 'A 3x2 achievement badge codex grid rendering pixel padlock silhouettes on locked slots and 6 distinct pixel crests on unlocked slots',
    vibeTag: 'Unlocking padlocked silhouette slots into 6 distinct golden-framed pixel crest badges as the codex completion bar fills',
    vibeKeywords: ['Collectible badge grid', 'Trophy collection UI', 'Badge unlock states', 'Completion progress bar', 'Pixel crest emblems', 'Achievement codex'],
    promptSnippet:
      'Create a 3x2 grid collectible pixel achievement badge codex UI in the designated container. The core requirement is rendering locked slots with a pixel padlock silhouette (shackle, body, and keyhole) and unlocked slots with 6 distinct pixel badge glyphs (Flame, Trident, Wing, Shield, Star, Crown) and gold borders while syncing the top progress bar (initially 4/6) and right inspect panel. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 16px padding, place an SVG with viewBox 0 0 264 144, width 264px, 12px rounded corners, and shape-rendering crispEdges. Provide a Next Badge button, a toggle lock/unlock button for the selected badge, an Unlock All (6/6) button, and a Reset Default (4/6) button.',
  },

  /* ============================================================================
   * 5. Effects & Animation (6 additions)
   * ============================================================================ */
  'px-teleport-dissolve-reform': {
    summary: 'A deterministic warp effect dissolving the character on Pad A (0 to 3), beaming across with no body at 4, and reforming on Pad B (5 to 8)',
    vibeTag: 'Dissolving a pixel mage into cyan vertical scanline beams through a stable mask on Pad A and reforming on Pad B',
    vibeKeywords: ['Teleport pixel dissolve', 'Warp reform effect', 'Scanline mask transition', 'Teleportation beam', 'Pixel summon vfx', 'Stable dither mask'],
    promptSnippet:
      'Create a teleport pixel dissolve and reform effect using a deterministic mask in the designated container. The core requirement is dissolving the character on left Pad A (x=68) across phases 0 to 3, showing only the vertical transfer beam with no character body on either pad at phase 4, and reforming on right Pad B (x=196) across phases 5 to 8 without random jitter. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 16px padding, place an SVG with viewBox 0 0 264 144, width 264px, 12px rounded corners, and shape-rendering crispEdges. Start at phase 3, and provide a Warp button that advances once from 0 to 8 at 0.1s intervals, a Pad A/B instant swap button, and a 0 to 8 phase slider.',
  },
  'px-stepped-lightning-chain': {
    summary: 'An orthogonal and 45-degree stepped pixel lightning discharge chaining from a Tesla coil across 1 to 3 rune pylons with impact sparks',
    vibeTag: 'Jumping orthogonal and 45-degree stepped cyan-white lightning arcs across 3 rune pylons with contact spark crosses',
    vibeKeywords: ['Stepped chain lightning', 'Chain lightning arc', 'Pixel electric discharge', 'Rune pylon strike', 'Dot lightning vfx', 'Stepped bolt path'],
    promptSnippet:
      'Create a stepped pixel Chain Lightning effect in the designated container. The core requirement is chaining orthogonal and 45-degree stepped lightning bolts with a cyan outer glow and white core from a left coil across up to 3 rune pylons with cross impact sparks. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 16px padding, place an SVG with viewBox 0 0 264 144, width 264px, 12px rounded corners, and shape-rendering crispEdges. Start with 3 chained targets, and provide a 0.11s discharge loop toggle cycling 4 arc path variants, a waveform step button, and a 1 to 3 target bounce slider.',
  },
  'px-directional-crt-glitch': {
    summary: 'A scanline slice CRT glitch effect offsetting 6 clipped emblem bands and separating red and cyan channels along horizontal or vertical axes',
    vibeTag: 'Shearing a pixel cyber emblem across 6 scanline slice bands with red and cyan chromatic aberration offsets',
    vibeKeywords: ['Directional CRT glitch', 'Scanline chromatic split', 'Pixel screen noise', 'RGB channel split', 'Digital slice distortion', 'Glitch vfx'],
    promptSnippet:
      'Create a directional CRT scanline slice glitch effect in the designated container. The core requirement is splitting a central pixel emblem into 6 clipped slice bands and applying integer pixel offsets plus red (#f43f5e) and cyan (#06b6d4) channel separation across intensity levels 0 to 4 and horizontal or vertical axes. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 16px padding, place an SVG with viewBox 0 0 264 144, width 264px, 12px rounded corners, and shape-rendering crispEdges. Start at intensity 2 in horizontal mode, and provide a 0.12s glitch burst toggle, a horizontal/vertical axis button, and a 0 to 4 intensity slider.',
  },
  'px-ground-shockwave-rings': {
    summary: 'An isometric ground slam impact propagating dual concentric pixel shockwave rings and lifting floor stone tiles along the wave crest',
    vibeTag: 'Propagating stepped concentric shockwave rings and heaving floor cobblestones outward from a warhammer slam',
    vibeKeywords: ['Ground shockwave rings', 'Boss slam impact', 'Concentric pixel wave', 'Heaving floor tiles', 'Dot impact ring', 'Arena shockwave'],
    promptSnippet:
      'Create a pixel concentric ground shockwave ring effect triggered by a heavy slam in the designated container. The core requirement is expanding gold and orange isometric rings from the impact center across frames 0 to 6 while lifting floor cobblestone blocks vertically as the wave crest passes. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 16px padding, place an SVG with viewBox 0 0 264 144, width 264px, 12px rounded corners, and shape-rendering crispEdges. Start at mid-expansion frame 3 with tile heave enabled, and provide a Slam button that plays once to frame 6 at 0.09s intervals, a rock heave toggle, and a 0 to 6 frame slider.',
  },
  'px-ice-freeze-thaw-spread': {
    summary: 'A bidirectional frost transition spreading octagonal ice tiles and crystal columns from a central stone fountain across Manhattan radius 0 to maximum spread radius 5',
    vibeTag: 'Spreading octagonal frost crystal frontiers and rising ice columns outward from a courtyard stone fountain before thawing to water',
    vibeKeywords: ['Ice freeze spread', 'Frost nova transition', 'Freeze and thaw vfx', 'Ice crystal spires', 'Pixel frost magic', 'Octagonal frost ring'],
    promptSnippet:
      'Create a pixel ice freeze and thaw spread transition effect in the designated container. The core requirement is expanding or receding octagonal frost tiles and rising ice crystal columns around a central stone fountain at cell (4,2) on a 9x5 grid from Manhattan radius 0 liquid water up to maximum spread radius 5 (where the central fountain fully freezes while the four corner cells at Manhattan distance 6 remain outside radius 5). In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 16px padding, place an SVG with viewBox 0 0 264 144, width 264px, 12px rounded corners, and shape-rendering crispEdges. Start at half-frozen radius 3, and provide a Freeze button advancing to radius 5 at 0.11s intervals, a Thaw button receding to radius 0, and a 0 to 5 frost radius slider.',
  },
  'px-pixel-portal-swirl': {
    summary: 'A time-bounded pixel dimensional portal rotating 4 stepped spiral arms while an 8-rune archway indicator counts down to collapse',
    vibeTag: 'Swirling a 4-arm stepped pixel vortex inside an obsidian arch until the 8 archway runes extinguish and seal the rift',
    vibeKeywords: ['Pixel portal swirl', 'Time-bounded vortex', 'Spiral portal vfx', 'Rune timer gauge', 'Dimensional rift', 'Dot warp gate'],
    promptSnippet:
      'Create a time-bounded pixel dimensional portal swirl effect in the designated container. The core requirement is rotating 4 stepped pixel spiral arms inside an obsidian archway while an 8-rune indicator along the archway pillars extinguishes one rune per step (8 - step lit) and collapses into a sealed rift at step 8. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 16px padding, place an SVG with viewBox 0 0 264 144, width 264px, 12px rounded corners, and shape-rendering crispEdges. Start at active step 2 (6 lit runes) in Void Purple, and provide an Open Portal button advancing from 0 to 8 at 0.12s intervals before stopping, a Void Purple vs Rift Emerald palette toggle, and a 0 to 8 timeline slider.',
  },
};
