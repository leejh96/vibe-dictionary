import type { ComponentType } from 'react';
import { BillingComparisonDemo, FacetedFilterDemo, BulkActionBarDemo, UndoSnackbarDemo, OnboardingChecklistDemo } from '../patterns/WorkflowDemos';
import { HalftoneShadingDemo, VoxelLandscapeDemo, RibbonWeaveDemo, GuillocheCurveDemo, GradientRibbonDemo } from '../graphic/GraphicStudioDemos';
import { LightboxGalleryDemo, SelectionToolbarDemo, CollapsingHeaderDemo, HoverPreviewDemo, InlineEditDemo } from '../patterns/PatternDemos';
import { SwipeActionCardDemo } from '../card/SwipeActionCard';
import { ReorderListDemo } from '../motion/ReorderListDemo';
import { ReflowPanelDemo } from '../motion/ReflowPanelDemo';
import { ExitCollapseDemo } from '../motion/ExitCollapseDemo';
import { AnchoredPopoverDemo } from '../motion/AnchoredPopoverDemo';
import { RollingNumberDemo } from '../text/RollingNumberDemo';
import { SplitFlapTextDemo } from '../text/SplitFlapTextDemo';
import { SearchHighlightDemo } from '../text/SearchHighlightDemo';
import { InlineValidationDemo } from '../feedback/InlineValidationDemo';
import { NotificationBadgeDemo, StarRatingDemo } from '../feedback/FeedbackDemos';
import { TooltipDemo } from '../feedback/TooltipDemo';
import { DismissibleBannerDemo } from '../feedback/DismissibleBannerDemo';
import { InlineConfirmDemo } from '../feedback/InlineConfirmDemo';
import { ClipboardFeedbackDemo } from '../feedback/ClipboardFeedbackDemo';
import { EmptySearchDemo } from '../feedback/EmptySearchDemo';
import { CharacterBudgetDemo } from '../feedback/CharacterBudgetDemo';
import { ErrorSummaryDemo } from '../feedback/ErrorSummaryDemo';
import { UnderlineTabsDemo, VerticalTabsDemo } from '../layout/ContentTabsDemos';
import { IndeterminateLinearDemo, CircularSweepDemo, DotWaveDemo } from '../layout/LoadingDemos';
import { ManualBannerDemo } from '../layout/ManualBannerDemo';
import { SkeletonContentDemo } from '../layout/SkeletonContentDemo';
import { FoldedRibbonDemo, StickyAnnouncementDemo } from '../layout/BannerDemos';
import { ClosableTabsDemo } from '../layout/ClosableTabsDemo';
import { ValueBubbleSliderDemo } from '../control/ValueBubbleSliderDemo';
import { MixedCheckboxDemo } from '../control/MixedCheckboxDemo';
import { PreviewSelectDemo } from '../control/PreviewSelectDemo';
import { QuantityStepperDemo } from '../control/QuantityStepperDemo';
import { TokenInputDemo } from '../control/TokenInputDemo';
import { DualRangeDemo } from '../control/DualRangeDemo';
import { ColorSwatchDemo } from '../control/ColorSwatchDemo';
import { FilePickerDemo } from '../control/FilePickerDemo';
import { SearchComboboxDemo } from '../control/SearchComboboxDemo';
import { DateFieldDemo } from '../control/DateFieldDemo';
import { MotionPathDemo } from '../graphic/MotionPathDemo';
import { PolygonMorphDemo, MarchingAntsDemo } from '../graphic/GraphicDemos';
import { CutoutMaskDemo } from '../graphic/CutoutMaskDemo';
import { ConnectorMarkerDemo } from '../graphic/ConnectorMarkerDemo';
import { RosetteDemo } from '../graphic/RosetteDemo';
import { HatchFillDemo } from '../graphic/HatchFillDemo';
import { FixedStrokeZoomDemo } from '../graphic/FixedStrokeZoomDemo';
import { BezierEditorDemo } from '../graphic/BezierEditorDemo';
import { IntersectionClipDemo } from '../graphic/IntersectionClipDemo';
import { FadedGridDemo, MeteorShowerDemo, RisingLightParticlesDemo } from '../shader/ShaderDemos';
import { BlendLightsDemo } from '../shader/BlendLightsDemo';
import { DisplacementLinesDemo } from '../shader/DisplacementLinesDemo';
import { PointLightSurfaceDemo } from '../shader/PointLightSurfaceDemo';
import { MoireFieldDemo } from '../shader/MoireFieldDemo';
import { DitherGradientDemo } from '../shader/DitherGradientDemo';
import { ProjectedShadowDemo } from '../shader/ProjectedShadowDemo';
import { VoronoiCellsDemo } from '../shader/VoronoiCellsDemo';
import { DampedSpringDemo } from '../physics/DampedSpringDemo';
import { ProjectileArcDemo } from '../physics/ProjectileArcDemo';
import { PendulumPeriodDemo } from '../physics/PendulumPeriodDemo';
import { RestitutionBounceDemo } from '../physics/RestitutionBounceDemo';
import { FrictionSlideDemo } from '../physics/FrictionSlideDemo';
import { ElasticCollisionDemo } from '../physics/ElasticCollisionDemo';
import { RollingWheelDemo } from '../physics/RollingWheelDemo';
import { VariableInertiaDemo } from '../physics/VariableInertiaDemo';
import { PulleyConstraintDemo } from '../physics/PulleyConstraintDemo';
import { WaveSuperpositionDemo } from '../physics/WaveSuperpositionDemo';
import { DiceRoll3DDemo } from '../physics/DiceRoll3DDemo';
import { MarbleBoardDemo } from '../physics/MarbleBoardDemo';
import { TreasureChest3DDemo } from '../physics/TreasureChest3DDemo';
import { LuckyWheel3DDemo } from '../physics/LuckyWheel3DDemo';
import { SlicedTypeDemo } from '../kinetic/SlicedTypeDemo';
import { ProximityTypeDemo } from '../kinetic/ProximityTypeDemo';
import { CylinderTypeDemo } from '../kinetic/CylinderTypeDemo';
import { GooeyWordDemo } from '../kinetic/GooeyWordDemo';
import { CurvedTypeDemo } from '../kinetic/CurvedTypeDemo';
import { ScatterTypeDemo } from '../kinetic/ScatterTypeDemo';
import { ExtrudedTypeDemo } from '../kinetic/ExtrudedTypeDemo';
import { HingedTypeDemo } from '../kinetic/HingedTypeDemo';
import { DissolveTypeDemo } from '../kinetic/DissolveTypeDemo';
import { ReflectionTypeDemo } from '../kinetic/ReflectionTypeDemo';
import { OutlineFillTextDemo, WordMaskHeadlineDemo, CircularTextDemo, ClampedTextDemo, SpoilerTextDemo, StrokeLetteringDemo, DropCapTextDemo } from '../text/TextDemos';
import { DirectionalStepDemo, CrossfadeSceneDemo, BlurFocusRevealDemo, MaskedRiseDemo, SharedElementExpandDemo, TransportMorphDemo } from '../motion/MotionDemos';
import { SelectableCardDemo, ProductSwatchDemo, LiftShadowCardDemo, FoldoutCardDemo, ImageZoomCardDemo, ExpandableDetailCardDemo, MediaActionCardDemo, FolderPeekCardDemo, ProfileFanCardDemo } from '../card/CardDemos';
import { SplitActionDemo, IconExpandDemo, OutlineTraceDemo, RollingLabelDemo, DepthPressDemo, UnderlineTravelDemo, CornerBracketDemo, MenuIconMorphDemo, BorderBeamDemo, LetterStaggerDemo } from '../hover/HoverDemos';
import { LenticularPosterDemo, FlutedGlassDemo, PolaroidDevelopDemo, StickerPeelDemo, AccordionGalleryDemo } from '../patterns/ShowcaseDemos';
import { EnvelopeInviteDemo, CylinderCarouselDemo, LiquidProgressDemo, GlassShatterDemo, BlackHoleDemo, InfiniteZoomDemo, InkEnsoDemo, PearlInlayDemo, ThermalViewDemo, CrtPowerOffDemo } from '../patterns/SignatureDemos';
import { MagneticHoverDemo, ShimmerSweepDemo, RippleClickDemo, NeonGlowPulseDemo, LiquidSlideFillDemo, CardFlipDemo, Tilt3DCardDemo, GlassmorphismDemo, SpotlightBorderCardDemo, StackedCardCycleDemo, SpringBounceDemo, StaggeredListDemo, SmoothAccordionDemo, MorphingStateButtonDemo, FloatingLevitationDemo, TypewriterDemo, ScrambleDecodeDemo, GradientFlowTextDemo, SlotNumberTickerDemo, MarkerHighlightDrawDemo, ConfettiBurstDemo, ErrorShakeDemo, HeartLikeBurstDemo, ToastSlideStackDemo, SlidingPillTabsDemo, InfiniteMarqueeDemo, SkeletonShimmerDemo, SpotlightFocusDemo, BeforeAfterSliderDemo, DragSnapSlotDemo, ElasticToggleSwitchDemo, ComboGaugeDemo, MgSquashStretchDemo, MgAnticipationDemo, MgFollowTrailDemo, MgEasingCurvesDemo, MgSvgLineDrawDemo, MgLiquidBlobMorphDemo, MgGooeyMetaballDemo, MgOrbitRotationDemo, MgKineticWaveTextDemo, Mg3DTextRollerDemo, MgNeonSignFlickerDemo, MgParallaxDepthDemo, MgRackFocusBlurDemo, MgKenBurnsPanDemo, MgIsometricExplodeDemo, MgIrisCircleWipeDemo, MgRgbChromaticGlitchDemo, MgSpeedLinesStreakDemo, MgAuroraMeshDemo, MgParticleNetworkDemo, MgDotMatrixGridDemo, MgGodRayBeamDemo, LyBentoGridDemo, LyMasonryWaterfallDemo, LyEditorialAsymmetricDemo, LyHoneycombHexDemo, LyStickyScrolltellingDemo, LyFullpageSnapDemo, LyHorizontalShowcaseDemo, LyCurtainRevealDemo, LyMacosDockDemo, LyCommandPaletteDemo, LyDynamicIslandNavDemo, LyRadialPieMenuDemo, LyBottomSheetDemo, LyMasterDetailSplitDemo, LyKanbanBoardDemo, LyHeatmapGridDemo, StNeoBrutalismDemo, StLiquidAcrylicDemo, StLinearDarkMinimalDemo, StMatteFilmGrainDemo, StNeumorphismSoftDemo, StClaymorphism3DDemo, StSkeuomorphismTactileDemo, StPaperCutoutLayerDemo, St8BitPixelRetroDemo, StWin95RetroOsDemo, StCrtScanlineTerminalDemo, StSynthwaveSunsetGridDemo, StScifiHudChamferDemo, StArchitectBlueprintDemo, StSwissEditorialGridDemo, StComicHalftonePopDemo, VdSaasLaunchReelDemo, VdDevice3DSpinDemo, VdAppWalkthroughZoomDemo, VdSplitPromoReelDemo, VdStompBeatTypoDemo, VdHighlightSwipeRevealDemo, VdCountdownEnergeticIntroDemo, VdChatStorySequenceDemo, VdAnimatedBarRaceDemo, VdKpiCounterExplosionDemo, VdNodeFlowPipelineDemo, VdCircularRingDashboardDemo, VdLowerThirdBannerDemo, VdDiagonalShutterWipeDemo, VdLogoStingerOutroDemo, VdAudioSpectrumVisualizerDemo, GooeyMenuFabDemo, OtpPinFocusBounceDemo, HoldToConfirmRingDemo, PeekPasswordLampDemo, MgRadarSonarSweepDemo, MgMorphingGridWaveDemo, MgPrismRainbowRefractionDemo, MgGravityNewtonCradleDemo, LyFloatingTocSpyDemo, LyCollapsibleRailSidebarDemo, LyBreadcrumbFolderDrillDemo, LyResizableSplitPaneDemo, StHolographicFoilCardDemo, StReceiptThermalMonoDemo, StVaporwaveY2kChromeDemo, StCyberpunkNeonGlitchDemo, VdGlitchCutReelDemo, VdSlotJackpotHeadlineDemo, VdFunnelConversionDropDemo, VdBreakingNewsTickerDemo } from './BaseDemos';

export const BASE_DEMOS: Record<string, ComponentType> = {
  'envelope-invitation-reveal': EnvelopeInviteDemo,
  'cylinder-card-carousel': CylinderCarouselDemo,
  'liquid-wave-progress-orb': LiquidProgressDemo,
  'mg-glass-shatter-transition': GlassShatterDemo,
  'mg-black-hole-accretion-disk': BlackHoleDemo,
  'mg-infinite-zoom-frames': InfiniteZoomDemo,
  'mg-ink-wash-enso-stroke': InkEnsoDemo,
  'st-mother-of-pearl-inlay': PearlInlayDemo,
  'st-thermal-imaging-view': ThermalViewDemo,
  'vd-crt-power-off': CrtPowerOffDemo,
  'mg-lenticular-strip-poster': LenticularPosterDemo,
  'st-fluted-glass-panel': FlutedGlassDemo,
  'polaroid-photo-develop': PolaroidDevelopDemo,
  'sticker-corner-peel': StickerPeelDemo,
  'accordion-image-gallery': AccordionGalleryDemo,
  'mg-halftone-dot-shading': HalftoneShadingDemo,
  'mg-isometric-voxel-landscape': VoxelLandscapeDemo,
  'mg-ribbon-over-under-weave': RibbonWeaveDemo,
  'mg-guilloche-curve-engraving': GuillocheCurveDemo,
  'mg-gradient-stroke-ribbon': GradientRibbonDemo,
  'billing-cycle-pricing-card': BillingComparisonDemo,
  'faceted-filter-chips': FacetedFilterDemo,
  'bulk-selection-action-bar': BulkActionBarDemo,
  'undo-delete-snackbar': UndoSnackbarDemo,
  'onboarding-progress-checklist': OnboardingChecklistDemo,
  'zoom-lightbox-gallery': LightboxGalleryDemo,
  'selection-bubble-toolbar': SelectionToolbarDemo,
  'ly-collapsing-scroll-header': CollapsingHeaderDemo,
  'rich-hover-preview': HoverPreviewDemo,
  'inline-edit-field': InlineEditDemo,
  'mg-noise-dissolve-type': DissolveTypeDemo,
  'mg-ripple-reflection-type': ReflectionTypeDemo,
  'mg-hinged-opening-type': HingedTypeDemo,
  'mg-layered-type-extrusion': ExtrudedTypeDemo,
  'mg-scattered-letter-assembly': ScatterTypeDemo,
  'mg-curved-type-baseline': CurvedTypeDemo,
  'mg-gooey-word-morph': GooeyWordDemo,
  'mg-cylinder-type-rotation': CylinderTypeDemo,
  'mg-proximity-variable-type': ProximityTypeDemo,
  'mg-sliced-type-assembly': SlicedTypeDemo,
  'mg-phase-wave-superposition': WaveSuperpositionDemo,
  'mg-fixed-pulley-constraint': PulleyConstraintDemo,
  'mg-angular-momentum-spin': VariableInertiaDemo,
  'mg-no-slip-rolling-wheel': RollingWheelDemo,
  'mg-mass-ratio-elastic-collision': ElasticCollisionDemo,
  'mg-kinetic-friction-slide': FrictionSlideDemo,
  'mg-restitution-bounce-drop': RestitutionBounceDemo,
  'mg-length-controlled-pendulum': PendulumPeriodDemo,
  'mg-gravity-projectile-arc': ProjectileArcDemo,
  'mg-damped-spring-release': DampedSpringDemo,
  'mg-dice-roll-3d': DiceRoll3DDemo,
  'mg-marble-board': MarbleBoardDemo,
  'mg-treasure-chest-3d': TreasureChest3DDemo,
  'mg-lucky-wheel-3d': LuckyWheel3DDemo,
  'mg-voronoi-cell-field': VoronoiCellsDemo,
  'mg-occluder-projected-shadow': ProjectedShadowDemo,
  'mg-binary-dither-gradient': DitherGradientDemo,
  'mg-moire-ring-interference': MoireFieldDemo,
  'mg-rising-light-particles': RisingLightParticlesDemo,
  'mg-point-lit-noise-surface': PointLightSurfaceDemo,
  'mg-turbulence-line-displacement': DisplacementLinesDemo,
  'mg-theme-blend-lights': BlendLightsDemo,
  'mg-diagonal-meteor-shower': MeteorShowerDemo,
  'mg-faded-line-grid': FadedGridDemo,
  'mg-intersection-clip': IntersectionClipDemo,
  'mg-quadratic-bezier-editor': BezierEditorDemo,
  'mg-fixed-stroke-zoom': FixedStrokeZoomDemo,
  'mg-hatched-pattern-fill': HatchFillDemo,
  'mg-marching-ants-outline': MarchingAntsDemo,
  'mg-radial-rosette-repetition': RosetteDemo,
  'mg-directed-connector-markers': ConnectorMarkerDemo,
  'mg-luminance-cutout-mask': CutoutMaskDemo,
  'mg-geometric-polygon-morph': PolygonMorphDemo,
  'mg-bezier-motion-path': MotionPathDemo,
  'native-date-field': DateFieldDemo,
  'manual-search-combobox': SearchComboboxDemo,
  'native-file-attachment': FilePickerDemo,
  'native-color-swatch-field': ColorSwatchDemo,
  'constrained-dual-range-slider': DualRangeDemo,
  'dismissible-token-input': TokenInputDemo,
  'native-quantity-stepper': QuantityStepperDemo,
  'preview-linked-native-select': PreviewSelectDemo,
  'mixed-state-checkbox-group': MixedCheckboxDemo,
  'value-bubble-range-slider': ValueBubbleSliderDemo,
  'closable-document-tabs': ClosableTabsDemo,
  'sticky-announcement-banner': StickyAnnouncementDemo,
  'folded-edge-ribbon': FoldedRibbonDemo,
  'vertical-rail-tabs': VerticalTabsDemo,
  'dot-wave-waiting-bubble': DotWaveDemo,
  'stable-skeleton-content': SkeletonContentDemo,
  'manual-banner-carousel': ManualBannerDemo,
  'circular-sweep-spinner': CircularSweepDemo,
  'indeterminate-linear-loader': IndeterminateLinearDemo,
  'underline-content-tabs': UnderlineTabsDemo,
  'linked-form-error-summary': ErrorSummaryDemo,
  'character-budget-feedback': CharacterBudgetDemo,
  'recoverable-search-empty-state': EmptySearchDemo,
  'inline-copy-feedback': ClipboardFeedbackDemo,
  'inline-delete-confirmation': InlineConfirmDemo,
  'dismissible-inline-banner': DismissibleBannerDemo,
  'native-star-rating': StarRatingDemo,
  'hover-focus-tooltip': TooltipDemo,
  'unread-notification-badge': NotificationBadgeDemo,
  'inline-email-validation': InlineValidationDemo,
  'editorial-drop-cap': DropCapTextDemo,
  'svg-stroke-lettering': StrokeLetteringDemo,
  'search-match-highlight': SearchHighlightDemo,
  'inline-spoiler-text': SpoilerTextDemo,
  'clamped-read-more-text': ClampedTextDemo,
  'split-flap-typography': SplitFlapTextDemo,
  'circular-path-text': CircularTextDemo,
  'word-mask-headline': WordMaskHeadlineDemo,
  'outline-fill-text': OutlineFillTextDemo,
  'per-digit-rolling-counter': RollingNumberDemo,
  'anchored-scale-popover': AnchoredPopoverDemo,
  'flip-reorder-list': ReorderListDemo,
  'directional-step-transition': DirectionalStepDemo,
  'crossfade-scene-transition': CrossfadeSceneDemo,
  'blur-focus-reveal': BlurFocusRevealDemo,
  'masked-rise-entrance': MaskedRiseDemo,
  'shared-element-expand': SharedElementExpandDemo,
  'reflow-side-panel': ReflowPanelDemo,
  'transport-icon-morph': TransportMorphDemo,
  'exit-collapse-presence': ExitCollapseDemo,
  'image-crop-zoom-card': ImageZoomCardDemo,
  'expandable-detail-card': ExpandableDetailCardDemo,
  'media-action-overlay-card': MediaActionCardDemo,
  'folder-peek-card': FolderPeekCardDemo,
  'swipe-action-card': SwipeActionCardDemo,
  'profile-fanout-card': ProfileFanCardDemo,
  'hinged-foldout-card': FoldoutCardDemo,
  'lift-shadow-card': LiftShadowCardDemo,
  'product-swatch-card': ProductSwatchDemo,
  'selectable-plan-card': SelectableCardDemo,
  'letter-stagger-button': LetterStaggerDemo,
  'border-beam-button': BorderBeamDemo,
  'menu-icon-morph': MenuIconMorphDemo,
  'corner-bracket-button': CornerBracketDemo,
  'underline-travel-button': UnderlineTravelDemo,
  'depth-press-button': DepthPressDemo,
  'rolling-label-button': RollingLabelDemo,
  'outline-trace-button': OutlineTraceDemo,
  'icon-expand-button': IconExpandDemo,
  'split-action-button': SplitActionDemo,
  'magnetic-hover': MagneticHoverDemo,
  'shimmer-sweep': ShimmerSweepDemo,
  'ripple-click': RippleClickDemo,
  'neon-glow-pulse': NeonGlowPulseDemo,
  'liquid-slide-fill': LiquidSlideFillDemo,
  'card-flip-3d': CardFlipDemo,
  'tilt-3d-card': Tilt3DCardDemo,
  'glassmorphism-card': GlassmorphismDemo,
  'spotlight-border-card': SpotlightBorderCardDemo,
  'stacked-card-cycle': StackedCardCycleDemo,
  'spring-bounce-modal': SpringBounceDemo,
  'staggered-list': StaggeredListDemo,
  'smooth-accordion': SmoothAccordionDemo,
  'morphing-state-button': MorphingStateButtonDemo,
  'floating-levitation': FloatingLevitationDemo,
  'typewriter-streaming': TypewriterDemo,
  'scramble-decode-text': ScrambleDecodeDemo,
  'gradient-flow-text': GradientFlowTextDemo,
  'slot-number-ticker': SlotNumberTickerDemo,
  'marker-highlight-draw': MarkerHighlightDrawDemo,
  'confetti-burst': ConfettiBurstDemo,
  'error-shake-tooltip': ErrorShakeDemo,
  'heart-like-burst': HeartLikeBurstDemo,
  'toast-slide-stack': ToastSlideStackDemo,
  'sliding-pill-tabs': SlidingPillTabsDemo,
  'infinite-marquee': InfiniteMarqueeDemo,
  'skeleton-shimmer': SkeletonShimmerDemo,
  'spotlight-focus': SpotlightFocusDemo,
  'before-after-slider': BeforeAfterSliderDemo,
  'drag-snap-slot': DragSnapSlotDemo,
  'elastic-toggle-switch': ElasticToggleSwitchDemo,
  'combo-gauge-pop': ComboGaugeDemo,
  'gooey-menu-fab': GooeyMenuFabDemo,
  'otp-pin-focus-bounce': OtpPinFocusBounceDemo,
  'hold-to-confirm-ring': HoldToConfirmRingDemo,
  'peek-password-lamp': PeekPasswordLampDemo,
  'mg-squash-stretch': MgSquashStretchDemo,
  'mg-anticipation': MgAnticipationDemo,
  'mg-follow-trail': MgFollowTrailDemo,
  'mg-easing-curves': MgEasingCurvesDemo,
  'mg-svg-line-draw': MgSvgLineDrawDemo,
  'mg-liquid-blob-morph': MgLiquidBlobMorphDemo,
  'mg-gooey-metaball': MgGooeyMetaballDemo,
  'mg-orbit-rotation': MgOrbitRotationDemo,
  'mg-kinetic-wave-text': MgKineticWaveTextDemo,
  'mg-3d-text-roller': Mg3DTextRollerDemo,
  'mg-neon-sign-flicker': MgNeonSignFlickerDemo,
  'mg-parallax-depth': MgParallaxDepthDemo,
  'mg-rack-focus-blur': MgRackFocusBlurDemo,
  'mg-ken-burns-pan': MgKenBurnsPanDemo,
  'mg-isometric-explode': MgIsometricExplodeDemo,
  'mg-iris-circle-wipe': MgIrisCircleWipeDemo,
  'mg-rgb-chromatic-glitch': MgRgbChromaticGlitchDemo,
  'mg-speed-lines-streak': MgSpeedLinesStreakDemo,
  'mg-aurora-mesh': MgAuroraMeshDemo,
  'mg-particle-network': MgParticleNetworkDemo,
  'mg-dot-matrix-grid': MgDotMatrixGridDemo,
  'mg-god-ray-beam': MgGodRayBeamDemo,
  'mg-radar-sonar-sweep': MgRadarSonarSweepDemo,
  'mg-morphing-grid-wave': MgMorphingGridWaveDemo,
  'mg-prism-rainbow-refraction': MgPrismRainbowRefractionDemo,
  'mg-gravity-newton-cradle': MgGravityNewtonCradleDemo,
  'ly-bento-grid': LyBentoGridDemo,
  'ly-masonry-waterfall': LyMasonryWaterfallDemo,
  'ly-editorial-asymmetric': LyEditorialAsymmetricDemo,
  'ly-honeycomb-hex': LyHoneycombHexDemo,
  'ly-sticky-scrolltelling': LyStickyScrolltellingDemo,
  'ly-fullpage-snap': LyFullpageSnapDemo,
  'ly-horizontal-showcase': LyHorizontalShowcaseDemo,
  'ly-curtain-reveal': LyCurtainRevealDemo,
  'ly-macos-dock': LyMacosDockDemo,
  'ly-command-palette': LyCommandPaletteDemo,
  'ly-dynamic-island-nav': LyDynamicIslandNavDemo,
  'ly-radial-pie-menu': LyRadialPieMenuDemo,
  'ly-bottom-sheet': LyBottomSheetDemo,
  'ly-master-detail-split': LyMasterDetailSplitDemo,
  'ly-kanban-board': LyKanbanBoardDemo,
  'ly-heatmap-grid': LyHeatmapGridDemo,
  'ly-floating-toc-spy': LyFloatingTocSpyDemo,
  'ly-collapsible-rail-sidebar': LyCollapsibleRailSidebarDemo,
  'ly-breadcrumb-folder-drill': LyBreadcrumbFolderDrillDemo,
  'ly-resizable-split-pane': LyResizableSplitPaneDemo,
  'st-neo-brutalism': StNeoBrutalismDemo,
  'st-liquid-acrylic': StLiquidAcrylicDemo,
  'st-linear-dark-minimal': StLinearDarkMinimalDemo,
  'st-matte-film-grain': StMatteFilmGrainDemo,
  'st-neumorphism-soft': StNeumorphismSoftDemo,
  'st-claymorphism-3d': StClaymorphism3DDemo,
  'st-skeuomorphism-tactile': StSkeuomorphismTactileDemo,
  'st-paper-cutout-layer': StPaperCutoutLayerDemo,
  'st-8bit-pixel-retro': St8BitPixelRetroDemo,
  'st-win95-retro-os': StWin95RetroOsDemo,
  'st-crt-scanline-terminal': StCrtScanlineTerminalDemo,
  'st-synthwave-sunset-grid': StSynthwaveSunsetGridDemo,
  'st-scifi-hud-chamfer': StScifiHudChamferDemo,
  'st-architect-blueprint': StArchitectBlueprintDemo,
  'st-swiss-editorial-grid': StSwissEditorialGridDemo,
  'st-comic-halftone-pop': StComicHalftonePopDemo,
  'st-holographic-foil-card': StHolographicFoilCardDemo,
  'st-receipt-thermal-mono': StReceiptThermalMonoDemo,
  'st-vaporwave-y2k-chrome': StVaporwaveY2kChromeDemo,
  'st-cyberpunk-neon-glitch': StCyberpunkNeonGlitchDemo,
  'vd-saas-launch-reel': VdSaasLaunchReelDemo,
  'vd-device-3d-spin': VdDevice3DSpinDemo,
  'vd-app-walkthrough-zoom': VdAppWalkthroughZoomDemo,
  'vd-split-promo-reel': VdSplitPromoReelDemo,
  'vd-glitch-cut-reel': VdGlitchCutReelDemo,
  'vd-stomp-beat-typo': VdStompBeatTypoDemo,
  'vd-highlight-swipe-reveal': VdHighlightSwipeRevealDemo,
  'vd-countdown-energetic-intro': VdCountdownEnergeticIntroDemo,
  'vd-chat-story-sequence': VdChatStorySequenceDemo,
  'vd-slot-jackpot-headline': VdSlotJackpotHeadlineDemo,
  'vd-animated-bar-race': VdAnimatedBarRaceDemo,
  'vd-kpi-counter-explosion': VdKpiCounterExplosionDemo,
  'vd-node-flow-pipeline': VdNodeFlowPipelineDemo,
  'vd-circular-ring-dashboard': VdCircularRingDashboardDemo,
  'vd-funnel-conversion-drop': VdFunnelConversionDropDemo,
  'vd-lower-third-banner': VdLowerThirdBannerDemo,
  'vd-diagonal-shutter-wipe': VdDiagonalShutterWipeDemo,
  'vd-logo-stinger-outro': VdLogoStingerOutroDemo,
  'vd-audio-spectrum-visualizer': VdAudioSpectrumVisualizerDemo,
  'vd-breaking-news-ticker': VdBreakingNewsTickerDemo,
};
