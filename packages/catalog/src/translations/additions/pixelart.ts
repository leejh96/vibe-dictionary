import type { TechniqueTranslation } from '../../localization';

export const PIXELART_TRANSLATIONS: Record<string, TechniqueTranslation> = {
  /* 1. Sprites */
  'px-sprite-walk-cycle': {
    summary: 'A 6-frame walk cycle sprite technique on a fixed 48x48 integer pixel grid with moonlit rim lighting and scrubber controls',
    vibeTag: 'Walking with purposeful strides on a 4-directional pixel grid under night moonlight with billowing cloak',
    vibeKeywords: ['Walk cycle', 'Sprite animation', 'Pixel adventurer', 'Moonlit walk', 'Pixel character', 'Dot walk'],
    promptSnippet:
      'Create a pixel art sprite walk cycle animation under moonlight in the designated container. The core requirement is a 6-frame cycle covering contact, down and pass positions with moonlit specular highlights on a fixed 48x48 integer pixel grid. In a flex center area with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 20px padding, place an SVG with viewBox 0 0 264 144, width 264px (max 100%), height auto, and shape-rendering crispEdges. The SVG has 12px rounded corners, overflow hidden, and a #090d16 night sky background where an adventurer with cloak walks past a crescent moon and pine trees. Provide 0.15s interval playback, a frame scrubber slider, and a walking direction flip toggle. Render with native integer rectangle paths without external images or fonts, and maintain manual slider scrubbing under reduced motion.',
  },
  'px-flame-spirit-idle': {
    summary: 'A floating flame elemental sprite featuring 3 concentric color bands and ascending integer ember sparks',
    vibeTag: 'Floating and flickering with 3 concentric color bands from incandescent core to trailing embers',
    vibeKeywords: ['Flame spirit', 'Floating idle motion', 'Ember particles', 'Pixel effect', 'Dot flame', 'Fire wisp'],
    promptSnippet:
      'Create a hovering, flickering flame spirit pixel sprite in the designated container. The core requirement is an organic idle loop built from 3 concentric color bands (incandescent core, orange body, deep crimson rim) and rising integer ember particles. In a flex center container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 20px padding, place an SVG with viewBox 0 0 264 144, width 264px (max 100%), height auto, and shape-rendering crispEdges. Inside a 48x48 bounding box, loop a 4-frame flicker cycle at 0.12s intervals and provide a wind sway slider to adjust flame tip deflection and particle velocity. Preserve 12px rounded corners, a dark stage, and crisp stepped pixel contours without blur filters.',
  },
  'px-item-silhouette-set': {
    summary: 'A 4-item fantasy RPG icon set on a 24x24 integer grid verifying distinct silhouettes, 1px contour contrast and palette breakdown',
    vibeTag: 'Instantly recognizable outer profiles with 1px dark contour for crystal ore, potion, key and chest',
    vibeKeywords: ['Item silhouette', 'Dot item', '1px dark contour', 'RPG icons', 'Shape identification', 'Pixel gear'],
    promptSnippet:
      'Create a set of 4 fantasy RPG item sprites with distinct silhouettes and 1px outer contours in the designated container. The core requirement is ensuring crystal ore, elixir flask, magic key and treasure chest each possess immediately recognizable profiles inside a 24x24 integer grid. In a flex center area with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 20px padding, render an SVG with viewBox 0 0 264 144, width 264px (max 100%), height auto, and shape-rendering crispEdges. Provide toggle buttons to instantly switch between dark silhouette shadow mode and full palette mode, along with 12px rounded corners and pedestal display mounts. Ensure 1px dark contour contrast for readability on both light and dark backgrounds.',
  },
  'px-character-portrait-angles': {
    summary: 'A 3-directional character bust portrait on a 48x48 grid comparing front, 3/4 angle and profile perspectives with consistent proportions',
    vibeTag: 'Maintaining pixel hair clusters and facial proportions across front, 3/4 and profile yaw turns',
    vibeKeywords: ['3-directional portrait', 'Character portrait', 'Pixel bust', 'Angle switcher', 'Dot face', 'Dialog portrait'],
    promptSnippet:
      'Create a 3-directional pixel character bust portrait for RPG dialog boxes in the designated container. The core requirement is maintaining hair cluster and helmet proportions as the viewpoint turns between 0-degree front, 45-degree three-quarter, and 90-degree profile views on a 48x48 integer pixel grid. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 20px padding, render an SVG with viewBox 0 0 264 144, width 264px (max 100%), height auto, and shape-rendering crispEdges. Support 3 buttons to switch viewpoints and toggles for neutral, smile and determined expressions. Preserve 12px rounded corners and ornamental portrait borders while shading with integer pixel clusters without subpixel interpolation.',
  },

  /* 2. Environments */
  'px-parallax-mountain-depth': {
    summary: 'A multi-plane pixel mountain parallax scene shifting moon, far peaks, mid ridge and foreground rocks at integer layer speeds',
    vibeTag: 'Unfolding panoramic depth with integer speed ratios from distant moon and purple peaks to foreground pine ridge',
    vibeKeywords: ['Pixel parallax', 'Dot mountain', 'Multi-layer depth', 'Integer parallax scroll', 'Scenic depth', 'Parallax landscape'],
    promptSnippet:
      'Create a multi-layer pixel parallax mountain landscape with depth in the designated container. The core requirement is shifting 4 discrete layers (night sky moon and stars, distant purple peaks, mid pine ridge, foreground rocks and fence) at differential speeds of 0.1, 0.3, 0.6, and 1.0. Inside a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 20px padding, place an SVG with viewBox 0 0 264 144, width 264px (max 100%), height auto, and shape-rendering crispEdges. Support horizontal camera panning from 0 to 100 via slider, rounding layer coordinates with Math.round to prevent subpixel antialiasing blur. Maintain 12px rounded corners, a dark frame, and an auto-glide toggle button.',
  },
  'px-sunset-river-reflection': {
    summary: 'A sunset river landscape with 5 dithered sky bands, horizon sun disk and alternating scanline water ripple reflections',
    vibeTag: 'Glinting golden pixel reflection columns rippling across river waters beneath sunset gradient bands',
    vibeKeywords: ['Sunset reflection', 'River reflection', 'Dusk horizon', 'Pixel river', 'Water shimmer', 'Dot sunset'],
    promptSnippet:
      'Create a pixel art sunset landscape with river reflection in the designated container. The core requirement is a sunset sky composed of 5 gradient color bands from dusk violet to gold, paired with alternating horizontal scanline wavelets reflecting the horizon sun disk. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 20px padding, place an SVG with viewBox 0 0 264 144, width 264px (max 100%), height auto, and shape-rendering crispEdges. Alternate ripple sparkle pixels at 0.1s intervals, and provide a sun elevation slider to adjust the reflection column width and atmospheric hues. Preserve 12px rounded corners and crisp dithering bands.',
  },
  'px-rainy-neon-alley': {
    summary: 'A cyberpunk alley scene combining 65-degree diagonal rain streaks, expanding puddle rings and flickering cyan/magenta neon signs',
    vibeTag: 'Neon signs flickering between dark brick facades as diagonal pixel rain streaks trigger expanding puddle ripples',
    vibeKeywords: ['Neon alley', 'Pixel rain', 'Rain streak reflection', 'Cyberpunk alley', 'Dot puddle', 'Alley neon'],
    promptSnippet:
      'Create a rainy cyberpunk neon alley pixel art landscape in the designated container. The core requirement is rendering 65-degree angled diagonal integer rain streaks between dark brick silhouettes, generating expanding pixel ripple rings upon puddle impact. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 20px padding, place an SVG with viewBox 0 0 264 144, width 264px (max 100%), height auto, and shape-rendering crispEdges. Neon signs in cyan and magenta flicker gently at 0.08s intervals, with a rain intensity slider to select clear, drizzle or downpour. Maintain 12px rounded corners and asphalt neon reflections.',
  },
  'px-isometric-terrace-citadel': {
    summary: 'A 2:1 dimetric isometric pixel citadel featuring tiered stone courtyards, garden terraces, stairs and directional 3-tone lighting',
    vibeTag: '3D depth sculpted with 2:1 dimetric blocks, garden terraces and staircases',
    vibeKeywords: ['Isometric citadel', '2:1 dimetric blocks', 'Terrace garden', 'Dot architecture', 'Axonometric pixel', 'Quarter view citadel'],
    promptSnippet:
      'Create an isometric citadel pixel art scene using a 2:1 dimetric projection in the designated container. The core requirement is building 3 tiered elevation levels (foundation courtyard, terrace garden, tower keep) with 2 horizontal pixels per 1 vertical pixel. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 20px padding, place an SVG with viewBox 0 0 264 144, width 264px (max 100%), height auto, and shape-rendering crispEdges. Maintain a 3-tone directional lighting model with bright top faces, midtone left walls, and shaded right walls, with level slice controls to toggle tier visibility. Preserve 12px rounded corners and masonry details.',
  },

  /* 3. Tiles & Patterns */
  'px-autotile-terrain-bitmask': {
    summary: 'A 4-directional 4-bit neighbor autotiling grid calculating and applying 16 terrain border configurations in real time',
    vibeTag: 'Evaluating 4-way neighbor connections with 4-bit bitmasks to merge edges and corners automatically',
    vibeKeywords: ['Autotile', 'Terrain bitmask', 'Tileset autojoin', 'Dot terrain', 'Tile corners', 'Neighbor bitmask'],
    promptSnippet:
      'Create a 4-directional autotiling terrain system with 4-bit neighbor bitmask logic in the designated container. The core requirement is updating a 5x4 tile grid of 36x24px cells where clicking cells paints or erases grass, calculating adjacent neighbor bits to select from 16 border tile shapes in real time. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 20px padding, render an SVG with viewBox 0 0 264 144, width 264px (max 100%), height auto, and shape-rendering crispEdges. Accurately evaluate outer corners, straight edges, and isolated islands with clear and island preset buttons. Preserve 12px rounded corners and 44px touch targets.',
  },
  'px-dither-gradient-ramp': {
    summary: 'An ordered Bayer matrix and checkerboard dithering ramp achieving smooth shading across 4 fixed palette colors without banding',
    vibeTag: 'Checkerboard and Bayer patterns rendering smooth curved shading over a strict 4-color palette',
    vibeKeywords: ['Dither ramp', 'Bayer matrix', 'Checkerboard shading', '4-color palette', 'Dot gradient', 'Ordered dithering'],
    promptSnippet:
      'Create an illuminated pixel sphere and gradient ramp using a restricted 4-color palette and ordered dithering in the designated container. The core requirement is transitioning between shadow, midtone, light and highlight using 2x2 checkerboard and 4x4 Bayer matrix dot patterns to avoid banding. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 20px padding, place an SVG with viewBox 0 0 264 144, width 264px (max 100%), height auto, and shape-rendering crispEdges. Provide toggles for 3 pattern modes (checkerboard, Bayer, posterized flat steps) and a light angle slider. Preserve 12px rounded corners and crisp tonal gradations.',
  },
  'px-seamless-pattern-repeat': {
    summary: 'A 40x36 logical brick tile shown in a 3x3 preview with a horizontal offset for checking seams',
    vibeTag: 'Edge pixels aligning with 1-pixel precision so boundary seams disappear across a 3x3 repetition grid',
    vibeKeywords: ['Seamless pattern', 'Seamless tile', 'Pixel wallpaper', 'Dot texture', 'Toroidal wrap', 'Pattern seaming'],
    promptSnippet:
      'Create an infinitely repeating seamless dungeon stone pixel pattern in the designated container. The core requirement is aligning edge pixels based on a 40x36px logical tile between a 2x scaled (80x72px) master tile on the left and a 3x3 repeating preview grid (120x108px) on the right with zero seam artifacts. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 20px padding, render an SVG with viewBox 0 0 264 144, width 264px (max 100%), height auto, and shape-rendering crispEdges. With seam highlighting enabled, draw a red dashed outline on the master tile and green borders around the repeated tiles. The horizontal offset ranges from 0 to 40px. At 40px the pattern completes one cycle and looks the same as at 0px. Preserve 12px rounded corners.',
  },
  'px-palette-swap-texture': {
    summary: 'An indexed color palette swap technique remapping 5 tone indices across 4 distinct thematic lookups without altering geometry',
    vibeTag: 'Transforming heraldic shield surfaces into forest, magma, frost and void themes by swapping 5-color lookups',
    vibeKeywords: ['Palette swap', 'Indexed color', 'LUT lookup', 'Dot texture swap', 'Surface material switch', 'Palette remap'],
    promptSnippet:
      'Create a pixel art palette swapping texture system that transforms surfaces by remapping indexed colors in the designated container. The core requirement is maintaining a knight heraldic shield on fixed integer coordinates while remapping its 5 color indices across 4 curated lookup tables (Forest, Magma, Frost, Void). In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 20px padding, render an SVG with viewBox 0 0 264 144, width 264px (max 100%), height auto, and shape-rendering crispEdges. Clicking preset buttons replaces the color table instantly without reallocating vector geometry. Preserve 12px rounded corners.',
  },

  /* 4. Game UI */
  'px-hud-health-shield-bar': {
    summary: 'An action RPG health HUD combining half-heart increments, diamond shield pips, dedicated-slot feedback numbers and low-health alarms',
    vibeTag: 'Segmented hearts and diamond shields shuddering under impact with floating damage numbers and danger flash alarms',
    vibeKeywords: ['Health HUD', 'Dot hearts', 'Shield bar', 'Pixel health bar', 'Damage feedback', 'RPG status bar'],
    promptSnippet:
      'Create an action RPG pixel HUD with hearts and shields in the designated container. The core requirement is laying out 5 segmented hearts and 4 diamond shield pips where damage depletes shields first before consuming hearts in half-unit increments. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 20px padding, place an SVG with viewBox 0 0 264 144, width 264px (max 100%), height auto, and shape-rendering crispEdges alongside action buttons. Show feedback for 25 damage, 50 damage, 35 heal and shield recharge in a dedicated area above the icons. Clear it 0.9 seconds after the last action. Shake only for damage and omit shaking when reduced motion is enabled. Show a red warning border when 3 or fewer half-heart units remain. Keep the 12px rounded corners.',
  },
  'px-inventory-grid-selector': {
    summary: 'A 4x3 RPG backpack grid selector with beveled slots, animated corner brackets, 16x16 item icons and live stat summary panels',
    vibeTag: 'Corner bracket cursors navigating slots to display pixel icons, rarity frames and stats in the inspect panel',
    vibeKeywords: ['Inventory grid', 'Item slots', 'Cursor selection bracket', 'RPG backpack', 'Dot inventory', 'Equipment grid'],
    promptSnippet:
      'Create a pixel art inventory grid system with slot navigation and an inspect detail card in the designated container. The core requirement is laying out a 4x3 beveled slot grid holding 16x16 item icons (ore, potion, rune key, chest) with a corner bracket cursor updating the stats inspect card upon selection. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 20px padding, place an SVG with viewBox 0 0 264 144, width 264px (max 100%), height auto, and shape-rendering crispEdges. Support mouse clicks and keyboard arrow key navigation with next slot and first slot select buttons. Preserve 12px rounded corners.',
  },
  'px-rpg-dialog-typewriter': {
    summary: 'A retro RPG dialog box with an aligned speaker portrait and dialogue, an optional typewriter effect and a control for replaying the current line',
    vibeTag: 'Dialogue appearing character by character beside a speaker portrait in a stone frame',
    vibeKeywords: ['RPG dialog', 'Dialog box', 'Typewriter dialog', 'Stone frame', 'Dot text box', 'Speaker portrait'],
    promptSnippet:
      'Create a retro 16-bit pixel RPG dialog box in the designated container. Use a stone frame up to 264px wide with 12px rounded corners and gold rivets. Vertically center the speaker label and dialogue as a group beside the 54px square portrait. Size the frame to its contents and padding. Fit the hat and beard inside the portrait border, and wrap dialogue to the available width. Show the first line immediately. Add a Next line button with a static arrow that cycles through three lines. Turning on the separate Typewriter effect control starts the current line over and reveals one character every 60ms. Move the speaker’s mouth only while text appears. Enable Replay line only while the effect is on. Show the full line immediately when reduced motion is enabled.',
  },
  'px-minimap-radar': {
    summary: 'A 24x24 dungeon minimap with directional movement, field-of-view fog-of-war reveals, player cone markers and radar pulses',
    vibeTag: 'Clearing fog of war along field-of-view cones to reveal corridors, player coordinates and treasure blips in real time',
    vibeKeywords: ['Pixel minimap', 'Fog of war', 'Dot radar', 'Dungeon map', 'Field of view', 'Minimap radar'],
    promptSnippet:
      'Create a pixel dungeon minimap with fog of war and field-of-view cones in the designated container. The core requirement is mapping walls and corridors on a 24x24 integer grid where moving the yellow player blip clears unexplored fog and reveals gold treasure chest dots. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 20px padding, place an SVG with viewBox 0 0 264 144, width 264px (max 100%), height auto, and shape-rendering crispEdges. Provide directional navigation buttons, a fog-of-war toggle, and an expanding sonar radar ping effect. Preserve 12px rounded corners.',
  },

  /* 5. Effects */
  'px-integer-grid-explosion': {
    summary: 'A 6-frame arcade impact explosion on a 32x32 integer grid progressing from flash dot to fireball teeth, smoke rings and ash embers',
    vibeTag: 'Shattering from an incandescent spark into jagged fireballs, smoke rings and dispersing embers across 6 arcade frames',
    vibeKeywords: ['Pixel explosion', 'Grid explosion', '6-frame explosion', 'Dot fireball', 'Arcade explosion', 'Impact smoke'],
    promptSnippet:
      'Create an arcade-style 6-frame pixel explosion animation in the designated container. The core requirement is an integer keyframe sequence on a 32x32 grid advancing from a central spark dot to an expanding fireball, smoke donut ring, and dispersing 1px ember sparks. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 20px padding, place an SVG with viewBox 0 0 264 144, width 264px (max 100%), height auto, and shape-rendering crispEdges. Provide an explosion trigger button at 0.08s frame timing, a frame scrubber slider, and an impact screen shake toggle. Preserve 12px rounded corners.',
  },
  'px-slash-afterimage-trail': {
    summary: 'A dynamic katana slash arc with 4 stepped afterimage ghost silhouettes decaying in opacity and hue to convey striking velocity',
    vibeTag: '4 stepped afterimage ghosts decaying in opacity and cyan-to-navy hues along blade slash arcs',
    vibeKeywords: ['Slash trail', 'Afterimage trail', 'Sword arc', 'Stepped afterimage', 'Dot slash', 'Speed trail'],
    promptSnippet:
      'Create a sword slash arc and afterimage effect in pixel art in the designated container. The core requirement is trailing a central white cutting edge with 4 stepped afterimage pixel bands that decay in opacity from cyan and azure to deep navy. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 20px padding, place an SVG with viewBox 0 0 264 144, width 264px (max 100%), height auto, and shape-rendering crispEdges. Provide a 0.25s slash trigger button, a slider for afterimage count, and slash angle buttons. Preserve 12px rounded corners and discrete stepped ghost contours.',
  },
  'px-sparkle-gemstone-shine': {
    summary: 'A faceted gemstone with a diagonal highlight clipped to its outline and a separate sparkle action',
    vibeTag: 'Moving a diagonal highlight inside the gemstone and triggering a separate four-point sparkle',
    vibeKeywords: ['Gemstone glint', 'Faceted jewel', 'Dot gemstone', 'Cross star sparkle', 'Shine sweep', 'Facet reflection'],
    promptSnippet:
      'Create a faceted pixel gemstone in the designated container. Draw its colored faces and a diagonal highlight in an SVG with viewBox 0 0 264 144. Clip the highlight to the gemstone outline. Provide a shine-position slider from 0 to 40 with an initial value of 20. The Sparkle button shows a four-point star above the gemstone for 0.5 seconds independently of the shine position. Offer ruby, emerald and sapphire color choices, with ruby selected initially. Give the SVG a maximum width of 264px and 12px rounded corners.',
  },
  'px-mosaic-pixel-wipe-transition': {
    summary: 'A 10-step pixel mosaic transition scaling block sizes from 1px to 32px to obscure Scene A and reconstruct Scene B in reverse',
    vibeTag: 'Pixelating the scene into giant mosaic blocks before sharpening back into a detailed moonlit cavern',
    vibeKeywords: ['Mosaic transition', 'Pixel mosaic wipe', 'Resolution wipe', 'Dot scene transition', 'Block dissolve', 'Pixelation transition'],
    promptSnippet:
      'Create a pixel mosaic transition effect that quantizes resolution step by step in the designated container. The core requirement is dissolving a sunlit meadow scene into giant blocks scaling from 1px to 32px before reconstructing a moonlit cavern scene over a 10-step sequence. In a container with 100% width, min-height 188px, and top 44px, left/right 16px, bottom 20px padding, place an SVG with viewBox 0 0 264 144, width 264px (max 100%), height auto, and shape-rendering crispEdges. Provide a 0.5s auto-transition button, a step scrubber slider from 0 to 10, and a manual Scene A/B swap toggle. Preserve 12px rounded corners.',
  },
};
