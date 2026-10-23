export type DemoPlayback = 'auto' | 'interactive' | 'static';

// Preview policy is per technique: search triggers describe the technique itself.
// Keep every catalog ID explicit; the coverage test rejects missing or duplicate entries.
export const DEMO_PLAYBACK_GROUPS = {
  auto: [
    'mg-lenticular-strip-poster', 'st-fluted-glass-panel', 'polaroid-photo-develop',
    'mg-halftone-dot-shading', 'mg-isometric-voxel-landscape', 'mg-ribbon-over-under-weave',
    'mg-guilloche-curve-engraving', 'mg-gradient-stroke-ribbon',
    // card
    'glassmorphism-card',
    // text
    'svg-stroke-lettering', 'split-flap-typography', 'circular-path-text',
    'word-mask-headline', 'typewriter-streaming', 'scramble-decode-text',
    'gradient-flow-text', 'slot-number-ticker', 'marker-highlight-draw',
    // scroll
    'ly-collapsing-scroll-header', 'ly-sticky-scrolltelling', 'ly-fullpage-snap',
    'ly-horizontal-showcase', 'ly-curtain-reveal', 'ly-floating-toc-spy',
    // scifi
    'st-scifi-hud-chamfer',
    // promo
    'vd-helical-cap-unscrew', 'vd-fragrance-atomizer-spray', 'vd-protective-film-peel',
    'vd-beverage-pour-shot', 'vd-product-cross-section', 'vd-selective-motion-cinemagraph',
    'vd-product-feature-callout', 'vd-stop-motion-flatlay', 'vd-packaging-sleeve-reveal',
    'vd-saas-launch-reel', 'vd-device-3d-spin', 'vd-app-walkthrough-zoom',
    'vd-split-promo-reel', 'vd-glitch-cut-reel',
    // kinetic_ad
    'vd-rebus-glyph-morph', 'vd-rotational-ambigram', 'vd-difference-blend-type',
    'vd-semantic-type-expansion', 'vd-landscape-filled-type', 'vd-multiformat-copy-reframe',
    'vd-product-occluded-type', 'vd-proofreader-copy-correction', 'vd-type-product-match-cut',
    'vd-product-type-framing', 'vd-stomp-beat-typo', 'vd-highlight-swipe-reveal',
    'vd-countdown-energetic-intro', 'vd-chat-story-sequence', 'vd-slot-jackpot-headline',
    // infographic
    'vd-waterfall-contribution-reveal', 'vd-dumbbell-paired-change', 'vd-boxplot-five-number-reveal',
    'vd-treemap-hierarchy-area', 'vd-scatterplot-coordinate-reveal', 'vd-percent-stacked-composition',
    'vd-time-series-line-draw', 'vd-sankey-flow-conservation', 'vd-radar-profile-reveal',
    'vd-animated-bar-race', 'vd-kpi-counter-explosion', 'vd-node-flow-pipeline',
    'vd-circular-ring-dashboard', 'vd-funnel-conversion-drop',
    // broadcast
    'vd-freeze-frame-hold', 'vd-cinematic-letterbox', 'vd-face-blur-mask',
    'vd-dip-to-black', 'vd-green-difference-key', 'vd-end-credit-roll',
    'vd-word-highlight-subtitles', 'vd-lower-third-banner', 'vd-diagonal-shutter-wipe',
    'vd-logo-stinger-outro', 'vd-audio-spectrum-visualizer', 'vd-breaking-news-ticker',
    // camera
    'mg-radial-lens-distortion', 'mg-architectural-lens-shift', 'mg-pedestal-roof-reveal',
    'mg-lateral-camera-truck', 'mg-vertical-camera-tilt', 'mg-stationary-camera-pan',
    'mg-dutch-camera-roll', 'mg-dolly-zoom-perspective', 'mg-orbit-camera-view',
    'mg-rack-focus-blur', 'mg-ken-burns-pan',
    // vfx
    'mg-feathered-vignette', 'mg-horizontal-directional-blur', 'mg-channel-posterize',
    'mg-laplacian-edge-detect', 'mg-highlight-bloom', 'mg-optical-lens-flare',
    'mg-luma-gradient-wipe', 'mg-block-dissolve-transition', 'mg-clockwise-radial-wipe',
    'mg-venetian-blinds-transition', 'mg-iris-circle-wipe', 'mg-rgb-chromatic-glitch',
    'mg-speed-lines-streak', 'mg-prism-rainbow-refraction',
    // modern
    'st-liquid-acrylic',
    // kinetic
    'mg-ripple-reflection-type', 'mg-noise-dissolve-type', 'mg-hinged-opening-type',
    'mg-layered-type-extrusion', 'mg-scattered-letter-assembly', 'mg-curved-type-baseline',
    'mg-gooey-word-morph', 'mg-cylinder-type-rotation', 'mg-sliced-type-assembly',
    'mg-kinetic-wave-text', 'mg-3d-text-roller', 'mg-neon-sign-flicker',
    // physics
    'mg-phase-wave-superposition', 'mg-fixed-pulley-constraint', 'mg-angular-momentum-spin',
    'mg-no-slip-rolling-wheel', 'mg-mass-ratio-elastic-collision', 'mg-kinetic-friction-slide',
    'mg-restitution-bounce-drop', 'mg-length-controlled-pendulum', 'mg-gravity-projectile-arc',
    'mg-damped-spring-release', 'mg-squash-stretch', 'mg-anticipation',
    'mg-follow-trail', 'mg-easing-curves', 'mg-gravity-newton-cradle',
    // shader
    'mg-voronoi-cell-field', 'mg-occluder-projected-shadow', 'mg-moire-ring-interference',
    'mg-rising-light-particles', 'mg-point-lit-noise-surface', 'mg-turbulence-line-displacement',
    'mg-diagonal-meteor-shower', 'mg-aurora-mesh', 'mg-god-ray-beam',
    'mg-radar-sonar-sweep',
    // graphic
    'mg-intersection-clip', 'mg-marching-ants-outline', 'mg-luminance-cutout-mask',
    'mg-geometric-polygon-morph', 'mg-bezier-motion-path', 'mg-svg-line-draw',
    'mg-liquid-blob-morph', 'mg-gooey-metaball', 'mg-orbit-rotation',
    'mg-morphing-grid-wave',
    // layout
    'dot-wave-waiting-bubble', 'stable-skeleton-content', 'circular-sweep-spinner',
    'indeterminate-linear-loader', 'infinite-marquee', 'skeleton-shimmer',
    // motion
    'masked-rise-entrance', 'blur-focus-reveal', 'spring-bounce-modal',
    'staggered-list', 'floating-levitation',
    // hover
    'shimmer-sweep', 'neon-glow-pulse',
  ],
  interactive: [
    'sticker-corner-peel', 'accordion-image-gallery',
    'billing-cycle-pricing-card', 'faceted-filter-chips', 'bulk-selection-action-bar',
    'undo-delete-snackbar', 'onboarding-progress-checklist',
    // card
    'zoom-lightbox-gallery', 'rich-hover-preview', 'profile-fanout-card',
    'swipe-action-card', 'folder-peek-card', 'media-action-overlay-card',
    'expandable-detail-card', 'image-crop-zoom-card', 'hinged-foldout-card',
    'lift-shadow-card', 'product-swatch-card', 'selectable-plan-card',
    'card-flip-3d', 'tilt-3d-card', 'spotlight-border-card',
    'stacked-card-cycle',
    // text
    'selection-bubble-toolbar', 'search-match-highlight', 'inline-spoiler-text',
    'clamped-read-more-text', 'outline-fill-text', 'per-digit-rolling-counter',
    // scroll
    'ly-sticky-group-headers', 'ly-frozen-table-axes', 'ly-scroll-edge-shadows',
    'ly-independent-scroll-panes', 'ly-nested-axis-collections', 'ly-reading-scroll-progress',
    'ly-proportional-scroll-sync', 'ly-prepend-scroll-anchor', 'ly-fixed-row-virtual-scroll',
    'ly-stable-scrollbar-gutter',
    // control
    'inline-edit-field', 'native-date-field', 'manual-search-combobox',
    'native-file-attachment', 'native-color-swatch-field', 'constrained-dual-range-slider',
    'dismissible-token-input', 'native-quantity-stepper', 'preview-linked-native-select',
    'mixed-state-checkbox-group', 'value-bubble-range-slider', 'before-after-slider',
    'drag-snap-slot', 'elastic-toggle-switch', 'combo-gauge-pop',
    'gooey-menu-fab', 'otp-pin-focus-bounce', 'peek-password-lamp',
    // tactile
    'st-neumorphism-soft', 'st-claymorphism-3d', 'st-skeuomorphism-tactile',
    // retro
    'st-risograph-ink-registration', 'st-seven-segment-led', 'st-8bit-pixel-retro',
    'st-receipt-thermal-mono', 'st-vaporwave-y2k-chrome',
    // scifi
    'st-comic-halftone-pop', 'st-cyberpunk-neon-glitch',
    // infographic
    'vd-histogram-rebin-transition',
    // broadcast
    'vd-alpha-channel-view', 'vd-corner-picture-in-picture',
    // camera
    'mg-projection-mode-switch', 'mg-parallax-depth', 'mg-isometric-explode',
    // grid
    'ly-mixed-type-baseline-grid', 'ly-intrinsic-label-grid', 'ly-twelve-column-span',
    'ly-aspect-ratio-gallery', 'ly-full-bleed-editorial', 'ly-named-areas-workspace',
    'ly-container-query-media-card', 'ly-dense-mosaic-packing', 'ly-subgrid-aligned-cards',
    'ly-intrinsic-auto-fit', 'ly-bento-grid', 'ly-masonry-waterfall',
    'ly-editorial-asymmetric', 'ly-honeycomb-hex',
    // nav
    'ly-skip-to-content-nav', 'ly-priority-overflow-nav', 'ly-grouped-mega-navigation',
    'ly-keyboard-file-tree', 'ly-visit-history-nav', 'ly-initial-index-nav',
    'ly-responsive-header-menu', 'ly-bottom-destination-nav', 'ly-paginated-document-list',
    'ly-disclosure-sidebar-nav', 'ly-macos-dock', 'ly-command-palette',
    'ly-dynamic-island-nav', 'ly-radial-pie-menu', 'ly-collapsible-rail-sidebar',
    'ly-breadcrumb-folder-drill',
    // panel
    'ly-dual-list-transfer', 'ly-file-list-grid-view', 'ly-transposable-comparison-matrix',
    'ly-time-grid-agenda', 'ly-json-structure-tree', 'ly-context-code-diff',
    'ly-activity-timeline', 'ly-expandable-data-rows', 'ly-selection-property-inspector',
    'ly-sortable-data-table', 'ly-bottom-sheet', 'ly-master-detail-split',
    'ly-kanban-board', 'ly-heatmap-grid', 'ly-resizable-split-pane',
    // modern
    'st-expressive-connected-group', 'st-neo-brutalism', 'st-holographic-foil-card',
    // kinetic
    'mg-proximity-variable-type',
    // physics
    'mg-dice-roll-3d', 'mg-marble-board', 'mg-treasure-chest-3d',
    'mg-lucky-wheel-3d',
    // shader
    'mg-theme-blend-lights', 'mg-particle-network', 'mg-dot-matrix-grid',
    // graphic
    'mg-quadratic-bezier-editor', 'mg-fixed-stroke-zoom',
    // layout
    'closable-document-tabs', 'vertical-rail-tabs', 'manual-banner-carousel',
    'underline-content-tabs', 'sliding-pill-tabs', 'spotlight-focus',
    // feedback
    'linked-form-error-summary', 'character-budget-feedback', 'recoverable-search-empty-state',
    'inline-copy-feedback', 'inline-delete-confirmation', 'dismissible-inline-banner',
    'native-star-rating', 'hover-focus-tooltip', 'unread-notification-badge',
    'inline-email-validation', 'confetti-burst', 'error-shake-tooltip',
    'heart-like-burst', 'toast-slide-stack', 'hold-to-confirm-ring',
    // motion
    'anchored-scale-popover', 'exit-collapse-presence', 'transport-icon-morph',
    'reflow-side-panel', 'shared-element-expand', 'crossfade-scene-transition',
    'directional-step-transition', 'flip-reorder-list', 'smooth-accordion',
    'morphing-state-button',
    // hover
    'letter-stagger-button', 'border-beam-button', 'menu-icon-morph',
    'corner-bracket-button', 'underline-travel-button', 'depth-press-button',
    'rolling-label-button', 'outline-trace-button', 'icon-expand-button',
    'split-action-button', 'magnetic-hover', 'ripple-click',
    'liquid-slide-fill',
  ],
  static: [
    // text
    'editorial-drop-cap',
    // tactile
    'st-stockinette-knit-surface', 'st-compressed-wool-felt', 'st-white-marble-veining',
    'st-crackle-ceramic-glaze', 'st-corrugated-cardboard', 'st-terrazzo-aggregate-surface',
    'st-pebbled-leather', 'st-brushed-metal-surface', 'st-knotty-wood-grain',
    'st-plain-weave-textile', 'st-paper-cutout-layer',
    // retro
    'st-memphis-geometric-pattern', 'st-art-deco-sunburst-frame', 'st-linocut-carved-botanical',
    'st-art-nouveau-whiplash-ornament', 'st-constructivist-diagonal-poster', 'st-stencil-bridge-lettering',
    'st-psychedelic-swell-lettering', 'st-cyanotype-contact-photogram', 'st-win95-retro-os',
    'st-crt-scanline-terminal', 'st-synthwave-sunset-grid',
    // scifi
    'st-mobius-half-twist-ribbon', 'st-koch-fractal-outline', 'st-tetrahedral-ball-stick',
    'st-third-angle-multiview', 'st-penrose-impossible-tribar', 'st-hidden-line-isometric',
    'st-pcb-copper-traces', 'st-opart-pinched-checker', 'st-xray-device-shell',
    'st-holographic-contour-terrain', 'st-architect-blueprint', 'st-swiss-editorial-grid',
    // promo
    'vd-condensation-packshot',
    // broadcast
    'vd-broadcast-color-bars',
    // modern
    'st-low-poly-faceted-pear', 'st-connected-truchet-tiles', 'st-serif-negative-space-brand',
    'st-window-shadow-overlay', 'st-rough-sketch-wireframe', 'st-ascii-luminance-art',
    'st-die-cut-sticker-collage', 'st-duotone-tone-map', 'st-squircle-icon-surface',
    'st-linear-dark-minimal', 'st-matte-film-grain',
    // shader
    'mg-binary-dither-gradient', 'mg-faded-line-grid',
    // graphic
    'mg-hatched-pattern-fill', 'mg-radial-rosette-repetition', 'mg-directed-connector-markers',
    // layout
    'sticky-announcement-banner', 'folded-edge-ribbon',
  ],
} as const;

export const DEMO_PLAYBACK: ReadonlyMap<string, DemoPlayback> = new Map(
  Object.entries(DEMO_PLAYBACK_GROUPS).flatMap(([mode, ids]) => ids.map(id => [id, mode as DemoPlayback])),
);
