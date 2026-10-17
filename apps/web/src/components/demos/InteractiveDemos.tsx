import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Sparkles,
  Check,
  Heart,
  Loader2,
  Bell,
  ChevronDown,
  MoveHorizontal,
  Flame,
  Zap,
  Rocket,
} from 'lucide-react';

interface DemoProps {
  techniqueId: string;
}

export const InteractiveDemo: React.FC<DemoProps> = ({ techniqueId }) => {
  switch (techniqueId) {
    /* ==================== DOMAIN 1: UI 인터랙션 (32종) ==================== */
    case 'magnetic-hover':
      return <MagneticHoverDemo />;
    case 'shimmer-sweep':
      return <ShimmerSweepDemo />;
    case 'ripple-click':
      return <RippleClickDemo />;
    case 'neon-glow-pulse':
      return <NeonGlowPulseDemo />;
    case 'liquid-slide-fill':
      return <LiquidSlideFillDemo />;
    case 'card-flip-3d':
      return <CardFlipDemo />;
    case 'tilt-3d-card':
      return <Tilt3DCardDemo />;
    case 'glassmorphism-card':
      return <GlassmorphismDemo />;
    case 'spotlight-border-card':
      return <SpotlightBorderCardDemo />;
    case 'stacked-card-cycle':
      return <StackedCardCycleDemo />;
    case 'spring-bounce-modal':
      return <SpringBounceDemo />;
    case 'staggered-list':
      return <StaggeredListDemo />;
    case 'smooth-accordion':
      return <SmoothAccordionDemo />;
    case 'morphing-state-button':
      return <MorphingStateButtonDemo />;
    case 'floating-levitation':
      return <FloatingLevitationDemo />;
    case 'typewriter-streaming':
      return <TypewriterDemo />;
    case 'scramble-decode-text':
      return <ScrambleDecodeDemo />;
    case 'gradient-flow-text':
      return <GradientFlowTextDemo />;
    case 'slot-number-ticker':
      return <SlotNumberTickerDemo />;
    case 'marker-highlight-draw':
      return <MarkerHighlightDrawDemo />;
    case 'confetti-burst':
      return <ConfettiBurstDemo />;
    case 'error-shake-tooltip':
      return <ErrorShakeDemo />;
    case 'heart-like-burst':
      return <HeartLikeBurstDemo />;
    case 'toast-slide-stack':
      return <ToastSlideStackDemo />;
    case 'sliding-pill-tabs':
      return <SlidingPillTabsDemo />;
    case 'infinite-marquee':
      return <InfiniteMarqueeDemo />;
    case 'skeleton-shimmer':
      return <SkeletonShimmerDemo />;
    case 'spotlight-focus':
      return <SpotlightFocusDemo />;
    case 'before-after-slider':
      return <BeforeAfterSliderDemo />;
    case 'drag-snap-slot':
      return <DragSnapSlotDemo />;
    case 'elastic-toggle-switch':
      return <ElasticToggleSwitchDemo />;
    case 'combo-gauge-pop':
      return <ComboGaugeDemo />;
    case 'gooey-menu-fab':
      return <GooeyMenuFabDemo />;
    case 'otp-pin-focus-bounce':
      return <OtpPinFocusBounceDemo />;
    case 'hold-to-confirm-ring':
      return <HoldToConfirmRingDemo />;
    case 'peek-password-lamp':
      return <PeekPasswordLampDemo />;

    /* ==================== DOMAIN 2: 그래픽 & 모션 연출 (26종) ==================== */
    case 'mg-squash-stretch':
      return <MgSquashStretchDemo />;
    case 'mg-anticipation':
      return <MgAnticipationDemo />;
    case 'mg-follow-trail':
      return <MgFollowTrailDemo />;
    case 'mg-easing-curves':
      return <MgEasingCurvesDemo />;
    case 'mg-svg-line-draw':
      return <MgSvgLineDrawDemo />;
    case 'mg-liquid-blob-morph':
      return <MgLiquidBlobMorphDemo />;
    case 'mg-gooey-metaball':
      return <MgGooeyMetaballDemo />;
    case 'mg-orbit-rotation':
      return <MgOrbitRotationDemo />;
    case 'mg-kinetic-wave-text':
      return <MgKineticWaveTextDemo />;
    case 'mg-3d-text-roller':
      return <Mg3DTextRollerDemo />;
    case 'mg-neon-sign-flicker':
      return <MgNeonSignFlickerDemo />;
    case 'mg-parallax-depth':
      return <MgParallaxDepthDemo />;
    case 'mg-rack-focus-blur':
      return <MgRackFocusBlurDemo />;
    case 'mg-ken-burns-pan':
      return <MgKenBurnsPanDemo />;
    case 'mg-isometric-explode':
      return <MgIsometricExplodeDemo />;
    case 'mg-iris-circle-wipe':
      return <MgIrisCircleWipeDemo />;
    case 'mg-rgb-chromatic-glitch':
      return <MgRgbChromaticGlitchDemo />;
    case 'mg-speed-lines-streak':
      return <MgSpeedLinesStreakDemo />;
    case 'mg-aurora-mesh':
      return <MgAuroraMeshDemo />;
    case 'mg-particle-network':
      return <MgParticleNetworkDemo />;
    case 'mg-dot-matrix-grid':
      return <MgDotMatrixGridDemo />;
    case 'mg-god-ray-beam':
      return <MgGodRayBeamDemo />;
    case 'mg-radar-sonar-sweep':
      return <MgRadarSonarSweepDemo />;
    case 'mg-morphing-grid-wave':
      return <MgMorphingGridWaveDemo />;
    case 'mg-prism-rainbow-refraction':
      return <MgPrismRainbowRefractionDemo />;
    case 'mg-gravity-newton-cradle':
      return <MgGravityNewtonCradleDemo />;

    /* ==================== DOMAIN 3: 레이아웃 & 공간 구조 (20종) ==================== */
    case 'ly-bento-grid':
      return <LyBentoGridDemo />;
    case 'ly-masonry-waterfall':
      return <LyMasonryWaterfallDemo />;
    case 'ly-editorial-asymmetric':
      return <LyEditorialAsymmetricDemo />;
    case 'ly-honeycomb-hex':
      return <LyHoneycombHexDemo />;
    case 'ly-sticky-scrolltelling':
      return <LyStickyScrolltellingDemo />;
    case 'ly-fullpage-snap':
      return <LyFullpageSnapDemo />;
    case 'ly-horizontal-showcase':
      return <LyHorizontalShowcaseDemo />;
    case 'ly-curtain-reveal':
      return <LyCurtainRevealDemo />;
    case 'ly-macos-dock':
      return <LyMacosDockDemo />;
    case 'ly-command-palette':
      return <LyCommandPaletteDemo />;
    case 'ly-dynamic-island-nav':
      return <LyDynamicIslandNavDemo />;
    case 'ly-radial-pie-menu':
      return <LyRadialPieMenuDemo />;
    case 'ly-bottom-sheet':
      return <LyBottomSheetDemo />;
    case 'ly-master-detail-split':
      return <LyMasterDetailSplitDemo />;
    case 'ly-kanban-board':
      return <LyKanbanBoardDemo />;
    case 'ly-heatmap-grid':
      return <LyHeatmapGridDemo />;
    case 'ly-floating-toc-spy':
      return <LyFloatingTocSpyDemo />;
    case 'ly-collapsible-rail-sidebar':
      return <LyCollapsibleRailSidebarDemo />;
    case 'ly-breadcrumb-folder-drill':
      return <LyBreadcrumbFolderDrillDemo />;
    case 'ly-resizable-split-pane':
      return <LyResizableSplitPaneDemo />;

    /* ==================== DOMAIN 4: 디자인 스타일 & 테마 (20종) ==================== */
    case 'st-neo-brutalism':
      return <StNeoBrutalismDemo />;
    case 'st-liquid-acrylic':
      return <StLiquidAcrylicDemo />;
    case 'st-linear-dark-minimal':
      return <StLinearDarkMinimalDemo />;
    case 'st-matte-film-grain':
      return <StMatteFilmGrainDemo />;
    case 'st-neumorphism-soft':
      return <StNeumorphismSoftDemo />;
    case 'st-claymorphism-3d':
      return <StClaymorphism3DDemo />;
    case 'st-skeuomorphism-tactile':
      return <StSkeuomorphismTactileDemo />;
    case 'st-paper-cutout-layer':
      return <StPaperCutoutLayerDemo />;
    case 'st-8bit-pixel-retro':
      return <St8BitPixelRetroDemo />;
    case 'st-win95-retro-os':
      return <StWin95RetroOsDemo />;
    case 'st-crt-scanline-terminal':
      return <StCrtScanlineTerminalDemo />;
    case 'st-synthwave-sunset-grid':
      return <StSynthwaveSunsetGridDemo />;
    case 'st-scifi-hud-chamfer':
      return <StScifiHudChamferDemo />;
    case 'st-architect-blueprint':
      return <StArchitectBlueprintDemo />;
    case 'st-swiss-editorial-grid':
      return <StSwissEditorialGridDemo />;
    case 'st-comic-halftone-pop':
      return <StComicHalftonePopDemo />;
    case 'st-holographic-foil-card':
      return <StHolographicFoilCardDemo />;
    case 'st-receipt-thermal-mono':
      return <StReceiptThermalMonoDemo />;
    case 'st-vaporwave-y2k-chrome':
      return <StVaporwaveY2kChromeDemo />;
    case 'st-cyberpunk-neon-glitch':
      return <StCyberpunkNeonGlitchDemo />;

    /* ==================== DOMAIN 5: 모션 영상 & 쇼릴 (20종) ==================== */
    case 'vd-saas-launch-reel':
      return <VdSaasLaunchReelDemo />;
    case 'vd-device-3d-spin':
      return <VdDevice3DSpinDemo />;
    case 'vd-app-walkthrough-zoom':
      return <VdAppWalkthroughZoomDemo />;
    case 'vd-split-promo-reel':
      return <VdSplitPromoReelDemo />;
    case 'vd-glitch-cut-reel':
      return <VdGlitchCutReelDemo />;
    case 'vd-stomp-beat-typo':
      return <VdStompBeatTypoDemo />;
    case 'vd-highlight-swipe-reveal':
      return <VdHighlightSwipeRevealDemo />;
    case 'vd-countdown-energetic-intro':
      return <VdCountdownEnergeticIntroDemo />;
    case 'vd-chat-story-sequence':
      return <VdChatStorySequenceDemo />;
    case 'vd-slot-jackpot-headline':
      return <VdSlotJackpotHeadlineDemo />;
    case 'vd-animated-bar-race':
      return <VdAnimatedBarRaceDemo />;
    case 'vd-kpi-counter-explosion':
      return <VdKpiCounterExplosionDemo />;
    case 'vd-node-flow-pipeline':
      return <VdNodeFlowPipelineDemo />;
    case 'vd-circular-ring-dashboard':
      return <VdCircularRingDashboardDemo />;
    case 'vd-funnel-conversion-drop':
      return <VdFunnelConversionDropDemo />;
    case 'vd-lower-third-banner':
      return <VdLowerThirdBannerDemo />;
    case 'vd-diagonal-shutter-wipe':
      return <VdDiagonalShutterWipeDemo />;
    case 'vd-logo-stinger-outro':
      return <VdLogoStingerOutroDemo />;
    case 'vd-audio-spectrum-visualizer':
      return <VdAudioSpectrumVisualizerDemo />;
    case 'vd-breaking-news-ticker':
      return <VdBreakingNewsTickerDemo />;

    default:
      return null;
  }
};

/* ============================================================================
 * DOMAIN 1: UI 인터랙션 데모 (32종)
 * ============================================================================ */

const MagneticHoverDemo: React.FC = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isTracking, setIsTracking] = useState(false);
  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setIsTracking(true);
        setOffset({
          x: (e.clientX - (rect.left + rect.width / 2)) * 0.42,
          y: (e.clientY - (rect.top + rect.height / 2)) * 0.42,
        });
      }}
      onMouseLeave={() => {
        setIsTracking(false);
        setOffset({ x: 0, y: 0 });
      }}
      className="w-full h-40 flex flex-col items-center justify-center cursor-pointer select-none"
    >
      <button
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          transition:
            isTracking
              ? 'transform 0.05s ease-out'
              : 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
        className="px-5 py-2.5 rounded-full bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/35"
      >
        마우스를 이리저리 움직여보세요 🧲
      </button>
    </div>
  );
};

const ShimmerSweepDemo: React.FC = () => {
  const [boostKey, setBoostKey] = useState(0);
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center select-none">
      <button
        key={boostKey}
        onClick={() => setBoostKey((k) => k + 1)}
        className="relative overflow-hidden px-6 py-3 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-indigo-600 border border-indigo-400/50 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 active:scale-95 transition-transform"
      >
        <span className="relative z-10 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-300" />
          Shimmer Sweep Button
        </span>
        <span className="pointer-events-none absolute top-0 bottom-0 left-0 w-20 bg-linear-to-r from-transparent via-white/55 to-transparent animate-shimmer-sweep" />
      </button>
    </div>
  );
};

const RippleClickDemo: React.FC = () => {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now() + Math.random();
    setRipples((prev) => [
      ...prev,
      { id, x: e.clientX - rect.left, y: e.clientY - rect.top },
    ]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 650);
  };

  return (
    <div className="w-full h-40 flex items-center justify-center select-none">
      <button
        onClick={handleClick}
        className="relative overflow-hidden px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-md active:scale-[0.98] transition-transform"
      >
        <span className="relative z-10">클릭한 곳에서 물결이 퍼집니다 💧</span>
        {ripples.map((r) => (
          <span
            key={r.id}
            style={{ left: r.x, top: r.y }}
            className="pointer-events-none absolute w-4 h-4 rounded-full bg-white/45 animate-ripple-expand"
          />
        ))}
      </button>
    </div>
  );
};

const NeonGlowPulseDemo: React.FC = () => {
  const [active, setActive] = useState(true);
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center select-none">
      <button
        onClick={() => setActive(!active)}
        className={`px-6 py-2.5 rounded-xl font-bold text-xs border transition-all duration-300 ${
          active
            ? 'bg-cyan-950/90 border-cyan-300 text-cyan-200 animate-neon-breathe'
            : 'bg-slate-900 border-slate-700 text-slate-500'
        }`}
      >
        ⚡ {active ? 'NEON PULSE ON' : 'NEON OFF (클릭)'}
      </button>
    </div>
  );
};

const LiquidSlideFillDemo: React.FC = () => {
  const [filled, setFilled] = useState(false);
  return (
    <div className="w-full h-40 flex items-center justify-center select-none">
      <button
        onClick={() => setFilled(!filled)}
        onMouseEnter={() => setFilled(true)}
        onMouseLeave={() => setFilled(false)}
        className={`relative overflow-hidden px-6 py-2.5 rounded-xl border border-emerald-400 font-bold text-xs transition-colors duration-300 ${
          filled ? 'text-slate-950' : 'text-emerald-300'
        }`}
      >
        <span className="relative z-10">마우스 올리기 / 클릭 →</span>
        <span
          className={`absolute inset-0 bg-emerald-400 transition-transform duration-300 ease-out ${
            filled ? 'translate-x-0' : '-translate-x-full'
          }`}
        />
      </button>
    </div>
  );
};

const CardFlipDemo: React.FC = () => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="w-full h-40 flex items-center justify-center select-none">
      <div
        onClick={() => setFlipped(!flipped)}
        className="w-52 h-28 perspective-1000 cursor-pointer"
      >
        <div
          className={`relative w-full h-full duration-500 preserve-3d transition-transform ${
            flipped ? 'rotate-y-180' : ''
          }`}
        >
          <div className="absolute inset-0 backface-hidden rounded-xl bg-linear-to-br from-indigo-600 to-violet-700 p-3.5 flex flex-col justify-between border border-indigo-400/40 shadow-lg">
            <span className="text-[10px] font-bold text-indigo-200">FRONT SIDE</span>
            <p className="text-xs font-extrabold text-white">클릭해 카드 뒤집기 ↻</p>
          </div>
          <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl bg-linear-to-br from-emerald-600 to-teal-700 p-3.5 flex flex-col justify-between border border-emerald-400/40 shadow-lg">
            <span className="text-[10px] font-bold text-emerald-100">BACK SIDE</span>
            <p className="text-xs font-extrabold text-white">뒷면 정보 노출 ✨ (다시 클릭)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Tilt3DCardDemo: React.FC = () => {
  const [rot, setRot] = useState({ x: 0, y: 0, gx: 50, gy: 50 });
  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const x = (py - 0.5) * -28;
        const y = (px - 0.5) * 28;
        setRot({ x, y, gx: px * 100, gy: py * 100 });
      }}
      onMouseLeave={() => setRot({ x: 0, y: 0, gx: 50, gy: 50 })}
      className="w-full h-40 flex items-center justify-center cursor-pointer select-none"
    >
      <div
        style={{
          transform: `perspective(550px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
          transition: rot.x === 0 ? 'transform 0.4s ease-out' : 'transform 0.04s linear',
        }}
        className="relative overflow-hidden w-52 h-24 rounded-xl bg-linear-to-tr from-fuchsia-600 via-indigo-600 to-cyan-500 p-3.5 shadow-xl border border-white/25 flex flex-col justify-between"
      >
        <div
          style={{
            background: `radial-gradient(circle at ${rot.gx}% ${rot.gy}%, rgba(255,255,255,0.35), transparent 60%)`,
          }}
          className="pointer-events-none absolute inset-0"
        />
        <span className="relative z-10 text-[10px] font-mono text-white/80">3D TILT</span>
        <span className="relative z-10 text-xs font-black text-white">
          마우스 따라 입체로 기울어짐
        </span>
      </div>
    </div>
  );
};

const GlassmorphismDemo: React.FC = () => {
  return (
    <div className="relative w-full h-40 flex items-center justify-center overflow-hidden select-none">
      <div className="w-16 h-16 rounded-full bg-pink-500 blur-md absolute animate-glass-orb-1" />
      <div className="w-16 h-16 rounded-full bg-cyan-400 blur-md absolute animate-glass-orb-2" />
      <div className="relative z-10 w-52 h-24 rounded-2xl bg-white/10 backdrop-blur-md border border-white/25 shadow-xl p-3.5 flex flex-col justify-between">
        <span className="text-[10px] font-mono text-white/80">FROSTED GLASS</span>
        <span className="text-xs font-bold text-white">배경 빛이 은은히 비치는 유리</span>
      </div>
    </div>
  );
};

const SpotlightBorderCardDemo: React.FC = () => {
  const [pos, setPos] = useState({ x: 100, y: 45 });
  return (
    <div className="w-full h-40 flex items-center justify-center select-none">
      <div
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }}
        style={{
          background: `radial-gradient(120px circle at ${pos.x}px ${pos.y}px, rgba(129,140,248,0.42), rgba(15,23,42,0.95) 80%)`,
        }}
        className="w-56 h-24 rounded-xl border border-indigo-400/40 p-3.5 flex flex-col justify-between cursor-pointer"
      >
        <span className="text-[10px] font-mono text-indigo-300">RADIAL SPOTLIGHT</span>
        <span className="text-xs font-bold text-white">카드 위에서 마우스를 움직여보세요</span>
      </div>
    </div>
  );
};

const StackedCardCycleDemo: React.FC = () => {
  const [cards, setCards] = useState([
    { id: 1, label: '1번 카드 (클릭해 넘기기)', color: 'from-indigo-600 to-purple-600' },
    { id: 2, label: '2번 카드 (클릭해 넘기기)', color: 'from-emerald-600 to-teal-600' },
    { id: 3, label: '3번 카드 (클릭해 넘기기)', color: 'from-rose-600 to-orange-500' },
  ]);

  return (
    <div
      onClick={() => setCards((prev) => [...prev.slice(1), prev[0]])}
      className="relative w-full h-40 flex items-center justify-center pt-3 cursor-pointer select-none"
    >
      {cards.map((c, idx) => (
        <div
          key={c.id}
          style={{
            transform: `translateY(${idx * -9}px) scale(${1 - idx * 0.07})`,
            zIndex: 10 - idx,
            opacity: 1 - idx * 0.25,
          }}
          className={`absolute w-52 h-24 rounded-xl bg-linear-to-r ${c.color} p-3.5 shadow-lg border border-white/20 flex flex-col justify-between transition-all duration-300`}
        >
          <span className="text-[10px] font-mono text-white/80">STACKED DECK</span>
          <span className="text-xs font-black text-white">{c.label}</span>
        </div>
      ))}
    </div>
  );
};

const SpringBounceDemo: React.FC = () => {
  const [popKey, setPopKey] = useState(1);
  return (
    <div
      onClick={() => setPopKey((k) => k + 1)}
      className="w-full h-40 flex flex-col items-center justify-center cursor-pointer select-none"
    >
      <div
        key={popKey}
        className="animate-spring-pop bg-linear-to-br from-amber-400 to-orange-500 text-slate-950 px-5 py-2.5 rounded-2xl shadow-lg font-black text-xs"
      >
        🎉 통통 튀는 바운스!
      </div>
      <span className="mt-2.5 text-[10px] text-slate-400">클릭하면 다시 튕깁니다</span>
    </div>
  );
};

const StaggeredListDemo: React.FC = () => {
  const [replayKey, setReplayKey] = useState(0);
  return (
    <div
      onClick={() => setReplayKey((k) => k + 1)}
      className="w-full h-40 flex flex-col justify-center px-6 pt-5 cursor-pointer select-none"
    >
      <div key={replayKey} className="space-y-1.5">
        {['1. 첫 번째 카드 등장', '2. 두 번째 카드 등장', '3. 세 번째 카드 등장'].map((label, i) => (
          <div
            key={i}
            style={{
              animation: `stagger-up 0.42s cubic-bezier(0.16, 1, 0.3, 1) ${i * 100}ms backwards`,
            }}
            className="bg-slate-800/90 border border-slate-700 rounded-lg px-3 py-1 text-[11px] text-slate-200 flex items-center justify-between"
          >
            <span>{label}</span>
            <span className="text-[10px] text-indigo-400 font-mono">+{i * 100}ms</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes stagger-up {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

const SmoothAccordionDemo: React.FC = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className="w-full h-40 flex items-center justify-center px-5 select-none">
      <div
        onClick={() => setOpen(!open)}
        className="w-full rounded-xl bg-slate-900 border border-slate-700 p-3 cursor-pointer"
      >
        <div className="flex items-center justify-between text-xs font-bold text-white">
          <span>클릭해서 스르륵 접기 / 펼치기</span>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </div>
        <div
          className={`grid transition-all duration-300 ease-out ${
            open ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden text-[11px] text-indigo-300">
            높이가 끊기지 않고 부드럽게 열리고 닫힙니다.
          </div>
        </div>
      </div>
    </div>
  );
};

const MorphingStateButtonDemo: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const trigger = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (status !== 'idle') {
      setStatus('idle');
      return;
    }
    setStatus('loading');
    timerRef.current = setTimeout(() => setStatus('done'), 850);
  };

  return (
    <div className="w-full h-40 flex flex-col items-center justify-center select-none">
      <button
        onClick={trigger}
        className={`h-10 rounded-full font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-300 ${
          status === 'idle'
            ? 'w-36 bg-indigo-600 text-white'
            : status === 'loading'
            ? 'w-10 bg-slate-800 text-indigo-400 border border-indigo-500/40'
            : 'w-32 bg-emerald-500 text-slate-950'
        }`}
      >
        {status === 'idle' && <span>클릭해 상태 변형</span>}
        {status === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
        {status === 'done' && (
          <>
            <Check className="w-4 h-4" />
            <span>완료! (재클릭)</span>
          </>
        )}
      </button>
    </div>
  );
};

const FloatingLevitationDemo: React.FC = () => {
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center select-none">
      <div className="animate-float-bob w-12 h-12 rounded-2xl bg-linear-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg">
        <Zap className="w-6 h-6 text-slate-950 fill-current" />
      </div>
      <div className="mt-3 w-10 h-1.5 rounded-full bg-indigo-400/50 blur-[2px] animate-shadow-breathe" />
    </div>
  );
};

const TypewriterDemo: React.FC = () => {
  const text = '타자기처럼 한 글자씩 다다닥 출력됩니다.';
  const [displayed, setDisplayed] = useState('');
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(t);
    }, 55);
    return () => clearInterval(t);
  }, [runId]);

  return (
    <div
      onClick={() => setRunId((r) => r + 1)}
      className="w-full h-40 flex flex-col items-center justify-center px-5 cursor-pointer select-none"
    >
      <div className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-3 font-mono text-xs text-emerald-300">
        {displayed}
        <span className="inline-block w-1.5 h-3.5 ml-0.5 align-middle bg-emerald-400 animate-pulse" />
      </div>
      <span className="mt-2 text-[10px] text-slate-400">클릭 시 다시 타이핑</span>
    </div>
  );
};

const ScrambleDecodeDemo: React.FC = () => {
  const target = 'VIBE DICTIONARY';
  const chars = '!<>-_\\/[]{}—=+*^?#01';
  const [output, setOutput] = useState(target);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    let frame = 0;
    const timer = setInterval(() => {
      frame += 1;
      const next = target
        .split('')
        .map((ch, idx) => {
          if (ch === ' ') return ' ';
          if (frame > idx * 2) return ch;
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');
      setOutput(next);
      if (frame > target.length * 2) clearInterval(timer);
    }, 35);
    return () => clearInterval(timer);
  }, [trigger]);

  return (
    <div
      onClick={() => setTrigger((t) => t + 1)}
      onMouseEnter={() => setTrigger((t) => t + 1)}
      className="w-full h-40 flex flex-col items-center justify-center cursor-pointer select-none"
    >
      <span className="font-mono text-sm font-black tracking-widest text-cyan-300 bg-slate-900 border border-cyan-500/30 px-4 py-2 rounded-xl">
        {output}
      </span>
      <span className="mt-2 text-[10px] text-slate-400">마우스 올리기 / 클릭 시 해독</span>
    </div>
  );
};

const GradientFlowTextDemo: React.FC = () => {
  return (
    <div className="w-full h-40 flex items-center justify-center select-none px-4">
      <span
        style={{
          backgroundImage:
            'linear-gradient(90deg, #818cf8, #f472b6, #fbbf24, #34d399, #818cf8)',
        }}
        className="text-xl font-black bg-clip-text text-transparent animate-gradient-flow"
      >
        Aurora Flowing Text
      </span>
    </div>
  );
};

const SlotNumberTickerDemo: React.FC = () => {
  const [target, setTarget] = useState(2480);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const start = val;
    const diff = target - start;
    const duration = 650;
    const startTime = performance.now();
    let rafId = 0;

    const step = (now: number) => {
      const p = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(Math.round(start + diff * eased));
      if (p < 1) {
        rafId = requestAnimationFrame(step);
      }
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [target]);

  return (
    <div
      onClick={() => setTarget((t) => t + Math.floor(Math.random() * 1200 + 400))}
      className="w-full h-40 flex flex-col items-center justify-center cursor-pointer select-none"
    >
      <span className="text-2xl font-mono font-black text-white">
        {val.toLocaleString()}
      </span>
      <span className="mt-2 text-[10px] text-indigo-300 bg-indigo-950/70 px-2.5 py-0.5 rounded-full">
        클릭하면 숫자가 드르륵 올라갑니다
      </span>
    </div>
  );
};

const MarkerHighlightDrawDemo: React.FC = () => {
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 200);
    return () => clearTimeout(t);
  }, []);

  const replay = () => {
    setDrawn(false);
    setTimeout(() => setDrawn(true), 120);
  };

  return (
    <div
      onClick={replay}
      className="w-full h-40 flex flex-col items-center justify-center cursor-pointer select-none px-4"
    >
      <p className="text-xs font-bold text-slate-200">
        문장 속{' '}
        <span
          style={{
            backgroundImage:
              'linear-gradient(120deg, rgba(250,204,21,0.45) 0%, rgba(250,204,21,0.45) 100%)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: drawn ? '100% 85%' : '0% 85%',
            backgroundPosition: '0 90%',
            transition: drawn
              ? 'background-size 0.55s cubic-bezier(0.16, 1, 0.3, 1)'
              : 'none',
          }}
          className="px-1 text-amber-200"
        >
          핵심 키워드에 형광펜
        </span>{' '}
        드로잉
      </p>
      <span className="mt-2.5 text-[10px] text-slate-400">클릭 시 다시 슥 긋기</span>
    </div>
  );
};

const ConfettiBurstDemo: React.FC = () => {
  const [burstKey, setBurstKey] = useState(0);
  const [active, setActive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const fire = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setBurstKey((k) => k + 1);
    setActive(true);
    timerRef.current = setTimeout(() => setActive(false), 900);
  };

  const particles = [
    { dx: '-70px', dy: '-55px', color: 'bg-amber-400' },
    { dx: '-30px', dy: '-75px', color: 'bg-rose-400' },
    { dx: '0px', dy: '-80px', color: 'bg-emerald-400' },
    { dx: '35px', dy: '-70px', color: 'bg-cyan-400' },
    { dx: '70px', dy: '-55px', color: 'bg-pink-400' },
    { dx: '-80px', dy: '10px', color: 'bg-sky-400' },
    { dx: '80px', dy: '10px', color: 'bg-purple-400' },
    { dx: '-50px', dy: '50px', color: 'bg-lime-400' },
    { dx: '50px', dy: '50px', color: 'bg-yellow-300' },
  ];

  return (
    <div className="relative w-full h-40 flex items-center justify-center overflow-hidden select-none">
      {active && (
        <div
          key={burstKey}
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          {particles.map((p, i) => (
            <span
              key={i}
              className={`w-2.5 h-2.5 rounded-xs ${p.color} absolute`}
              style={{ animation: `c-fly-${i} 0.78s ease-out forwards` }}
            />
          ))}
          <style>{`
            ${particles
              .map(
                (p, i) => `
              @keyframes c-fly-${i} {
                0% { transform: translate(0,0) scale(0.4); opacity: 1; }
                100% { transform: translate(${p.dx}, ${p.dy}) scale(1.15) rotate(120deg); opacity: 0; }
              }
            `
              )
              .join('\n')}
          `}</style>
        </div>
      )}
      <button
        onClick={fire}
        className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs shadow-lg active:scale-95 transition-transform"
      >
        🎉 폭죽 터뜨리기 (클릭)
      </button>
    </div>
  );
};

const ErrorShakeDemo: React.FC = () => {
  const [shaking, setShaking] = useState(false);
  const [showTip, setShowTip] = useState(true);

  const trigger = () => {
    setShaking(false);
    setTimeout(() => {
      setShaking(true);
      setShowTip(true);
    }, 15);
  };

  return (
    <div className="w-full h-40 flex flex-col items-center justify-center px-6 pt-5 select-none">
      {showTip && (
        <div className="mb-2 animate-float-bob bg-amber-400 text-slate-950 text-[10px] font-extrabold px-2.5 py-1 rounded-md shadow-sm">
          ⚠️ 값을 다시 확인해 주세요!
        </div>
      )}
      <div
        onClick={trigger}
        className={`w-full rounded-xl bg-slate-900 border-2 px-3.5 py-2 flex items-center justify-between cursor-pointer ${
          shaking
            ? 'animate-error-shake border-rose-500 bg-rose-950/30'
            : 'border-slate-700 hover:border-rose-500/60'
        }`}
      >
        <span className="text-xs font-mono text-rose-300">Invalid Input</span>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-rose-500/20 text-rose-300">
          클릭해 진동
        </span>
      </div>
    </div>
  );
};

const HeartLikeBurstDemo: React.FC = () => {
  const [burstId, setBurstId] = useState(1);
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center select-none">
      <button
        onClick={() => setBurstId((id) => id + 1)}
        className="relative w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center"
      >
        <span
          key={`ring-${burstId}`}
          className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-rose-500 animate-heart-ring"
        />
        <Heart
          key={`heart-${burstId}`}
          className="w-6 h-6 text-rose-500 fill-rose-500 animate-spring-pop"
        />
      </button>
      <span className="mt-2 text-[10px] text-slate-400">하트를 클릭해 보세요</span>
    </div>
  );
};

const ToastSlideStackDemo: React.FC = () => {
  const [toasts, setToasts] = useState([{ id: 1, text: '저장이 완료되었습니다.' }]);

  const pushToast = () => {
    const nextId = Date.now();
    setToasts((prev) => [
      ...prev.slice(-1),
      { id: nextId, text: `새 알림 도착 #${(nextId % 90) + 10}` },
    ]);
  };

  return (
    <div
      onClick={pushToast}
      className="w-full h-40 flex flex-col justify-between pt-9 pb-3 px-4 cursor-pointer select-none"
    >
      <span className="text-[10px] text-indigo-300 bg-indigo-950/70 px-2.5 py-0.5 rounded-full w-fit mx-auto">
        + 클릭해서 토스트 알림 띄우기
      </span>
      <div className="space-y-1">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="animate-toast-slide-up w-full bg-slate-900 border border-indigo-500/40 rounded-xl px-3 py-1.5 shadow-lg flex items-center gap-2"
          >
            <Bell className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="text-xs font-bold text-white">{t.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const SlidingPillTabsDemo: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const tabs = ['홈', '트렌드', '설정'];
  return (
    <div className="w-full h-40 flex items-center justify-center px-5 select-none">
      <div className="relative grid grid-cols-3 bg-slate-900 p-1 rounded-xl border border-slate-800 w-full max-w-[230px]">
        <div
          style={{ transform: `translateX(${activeIdx * 100}%)` }}
          className="absolute top-1 bottom-1 left-1 w-[calc(33.333%-2.6px)] rounded-lg bg-indigo-600 transition-transform duration-300 ease-out"
        />
        {tabs.map((t, i) => (
          <button
            key={t}
            onClick={() => setActiveIdx(i)}
            className={`relative z-10 py-1.5 text-xs font-bold transition-colors ${
              activeIdx === i ? 'text-white' : 'text-slate-400'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
};

const InfiniteMarqueeDemo: React.FC = () => {
  const items = ['REACT', 'MOTION', 'TAILWIND', 'SPRING', '3D UI', 'VIBE'];
  return (
    <div className="w-full h-40 flex items-center overflow-hidden select-none">
      <div className="flex w-max animate-marquee-left gap-2">
        {[...items, ...items].map((tag, i) => (
          <span
            key={i}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-indigo-300"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const SkeletonShimmerDemo: React.FC = () => {
  return (
    <div className="w-full h-40 flex items-center justify-center px-6 select-none">
      <div className="relative overflow-hidden w-full bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-800 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-3/4 rounded-sm bg-slate-800" />
          <div className="h-2.5 w-1/2 rounded-sm bg-slate-800/80" />
        </div>
        <div className="pointer-events-none absolute inset-0 w-1/2 bg-linear-to-r from-transparent via-white/10 to-transparent animate-shimmer-sweep" />
      </div>
    </div>
  );
};

const SpotlightFocusDemo: React.FC = () => {
  const [focusIdx, setFocusIdx] = useState(1);
  return (
    <div className="w-full h-40 flex items-center justify-center px-6 pt-5 select-none">
      <div className="w-full space-y-1.5">
        {['1. 상단 메뉴 영역', '2. 포커스된 핵심 영역 (클릭)', '3. 하단 정보 영역'].map(
          (label, i) => (
            <div
              key={i}
              onClick={() => setFocusIdx((i + 1) % 3)}
              className={`cursor-pointer rounded-lg px-3 py-1 text-[11px] font-bold transition-all duration-300 ${
                focusIdx === i
                  ? 'bg-slate-800 text-white ring-2 ring-amber-400 scale-[1.02]'
                  : 'bg-slate-900/50 text-slate-500 opacity-30 blur-[0.4px]'
              }`}
            >
              {label}
            </div>
          )
        )}
      </div>
    </div>
  );
};

const BeforeAfterSliderDemo: React.FC = () => {
  const [pos, setPos] = useState(55);
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center px-6 select-none">
      <div className="relative w-full h-24 rounded-xl overflow-hidden border border-slate-700">
        <div className="absolute inset-0 bg-linear-to-r from-indigo-600 to-cyan-500 flex items-center justify-end pr-4 text-xs font-black text-white">
          AFTER ✨
        </div>
        <div
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          className="absolute inset-0 bg-slate-900 flex items-center pl-4 text-xs font-black text-slate-400"
        >
          BEFORE
        </div>
        <div
          style={{ left: `${pos}%` }}
          className="absolute top-0 bottom-0 w-0.5 bg-white flex items-center justify-center"
        >
          <div className="w-6 h-6 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-md">
            <MoveHorizontal className="w-3.5 h-3.5" />
          </div>
        </div>
        <input
          type="range"
          min={10}
          max={90}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
        />
      </div>
    </div>
  );
};

const DragSnapSlotDemo: React.FC = () => {
  const [selected, setSelected] = useState('Motion');
  const chips = ['Motion', '3D UI', 'Spring'];
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center px-5 select-none gap-2.5">
      <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2">
        <span className="text-xs text-slate-400">장착 슬롯:</span>
        <span
          key={selected}
          className="px-3 py-0.5 rounded-lg text-xs font-bold border-2 border-emerald-400 bg-emerald-500/20 text-emerald-300 animate-spring-pop"
        >
          ⚡ {selected}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        {chips.map((c) => (
          <button
            key={c}
            onClick={() => setSelected(c)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all ${
              selected === c
                ? 'bg-indigo-600 text-white border-indigo-400'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
};

const ElasticToggleSwitchDemo: React.FC = () => {
  const [on, setOn] = useState(true);
  const [stretching, setStretching] = useState(false);

  const toggle = () => {
    setStretching(true);
    setOn(!on);
    setTimeout(() => setStretching(false), 220);
  };

  return (
    <div className="w-full h-40 flex flex-col items-center justify-center select-none">
      <button
        onClick={toggle}
        className={`w-16 h-9 rounded-full p-1 transition-colors duration-300 ${
          on ? 'bg-indigo-500' : 'bg-slate-800 border border-slate-700'
        }`}
      >
        <div
          style={{
            transition: 'transform 0.42s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transform: `${on ? 'translateX(28px)' : 'translateX(0px)'} ${
              stretching ? 'scaleX(1.25)' : 'scaleX(1)'
            }`,
          }}
          className="w-7 h-7 rounded-full bg-white shadow-md"
        />
      </button>
      <span className="mt-2 text-[10px] text-slate-400">클릭 시 탄성 스위치 전환</span>
    </div>
  );
};

const ComboGaugeDemo: React.FC = () => {
  const [count, setCount] = useState(3);
  const pct = ((count % 5) + 1) * 20;
  return (
    <div
      onClick={() => setCount((c) => c + 1)}
      className="w-full h-40 flex flex-col items-center justify-center px-6 pt-4 cursor-pointer select-none"
    >
      <div className="flex items-center justify-between w-full mb-2">
        <span
          key={count}
          className="animate-combo-pop inline-flex items-center gap-1 bg-orange-500 text-slate-950 font-black text-xs px-2.5 py-0.5 rounded-full"
        >
          <Flame className="w-3.5 h-3.5 fill-current" /> COMBO x{count}
        </span>
        <span className="text-xs font-mono font-bold text-emerald-400">{pct}%</span>
      </div>
      <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
        <div
          style={{ width: `${pct}%` }}
          className="h-full bg-linear-to-r from-indigo-500 to-emerald-400 transition-all duration-300"
        />
      </div>
      <span className="mt-2 text-[10px] text-slate-400">클릭해 게이지 채우기</span>
    </div>
  );
};

/* ============================================================================
 * DOMAIN 2: 🎬 그래픽 & 모션 연출 데모 (22종)
 * ============================================================================ */

/* 1. 스쿼시 앤 스트레치 */
const MgSquashStretchDemo: React.FC = () => {
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center select-none pt-6">
      <div className="w-10 h-10 rounded-full bg-linear-to-b from-amber-300 to-orange-500 shadow-lg shadow-orange-500/30 animate-squash-bounce" />
      <div className="mt-[18px] w-16 h-1.5 rounded-full bg-slate-700/80" />
      <span className="mt-2 text-[10px] text-slate-400">충돌 시 납작 ➔ 도약 시 길쭉</span>
    </div>
  );
};

/* 2. 앤티시페이션 (예비 동작) */
const MgAnticipationDemo: React.FC = () => {
  const [runKey, setRunKey] = useState(0);
  return (
    <div
      onClick={() => setRunKey((k) => k + 1)}
      className="w-full h-40 flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden"
    >
      <div
        key={runKey}
        className="animate-anticipation-launch w-12 h-10 rounded-xl bg-linear-to-r from-rose-500 to-amber-400 flex items-center justify-center shadow-lg"
      >
        <Rocket className="w-5 h-5 text-slate-950 rotate-45" />
      </div>
      <span className="mt-4 text-[10px] text-slate-400">뒤로 움츠렸다가 앞으로 폭발 발사</span>
    </div>
  );
};

/* 3. 팔로우 스루 & 딜레이 트레일 */
const MgFollowTrailDemo: React.FC = () => {
  const [right, setRight] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setRight((r) => !r), 1400);
    return () => clearInterval(t);
  }, []);

  const delays = [0, 55, 110, 165];

  return (
    <div
      onClick={() => setRight(!right)}
      className="relative w-full h-40 flex flex-col items-center justify-center cursor-pointer select-none"
    >
      <div className="relative w-48 h-12 flex items-center justify-center">
        {delays
          .slice()
          .reverse()
          .map((d, revIdx) => {
            const idx = delays.length - 1 - revIdx;
            const size = 34 - idx * 6;
            return (
              <div
                key={idx}
                style={{
                  width: size,
                  height: size,
                  transition: `transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) ${d}ms`,
                  transform: `translateX(${right ? '62px' : '-62px'})`,
                  opacity: 1 - idx * 0.22,
                }}
                className="absolute rounded-full bg-linear-to-tr from-indigo-500 to-cyan-300 shadow-md"
              />
            );
          })}
      </div>
      <span className="mt-2 text-[10px] text-slate-400">선두 뒤를 시차 두고 따라오는 잔상 꼬리</span>
    </div>
  );
};

/* 4. 이징 속도 곡선 비교 */
const MgEasingCurvesDemo: React.FC = () => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => !a), 1600);
    return () => clearInterval(t);
  }, []);

  const tracks = [
    { name: 'Linear', easing: 'linear', color: 'bg-slate-400' },
    { name: 'Ease-Out', easing: 'cubic-bezier(0.16, 1, 0.3, 1)', color: 'bg-cyan-400' },
    { name: 'Spring', easing: 'cubic-bezier(0.34, 1.30, 0.64, 1)', color: 'bg-amber-400' },
  ];

  return (
    <div
      onClick={() => setActive(!active)}
      className="w-full h-40 flex flex-col justify-center px-6 pt-5 gap-2 cursor-pointer select-none"
    >
      {tracks.map((tr) => (
        <div key={tr.name} className="flex items-center gap-2">
          <span className="w-14 text-[10px] font-mono text-slate-400">{tr.name}</span>
          <div className="relative flex-1 h-5 bg-slate-900 rounded-full border border-slate-800 flex items-center overflow-hidden">
            <div
              style={{
                transition: `left 0.9s ${tr.easing}`,
                left: active ? 'calc(100% - 22px)' : '8px',
              }}
              className={`absolute w-3.5 h-3.5 rounded-full ${tr.color}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

/* 5. SVG 패스 라인 드로잉 */
const MgSvgLineDrawDemo: React.FC = () => {
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center pt-4 select-none">
      <svg className="w-20 h-20" viewBox="0 0 100 100">
        <path
          d="M50 10 L63 36 L92 40 L71 60 L76 89 L50 75 L24 89 L29 60 L8 40 L37 36 Z"
          pathLength="1"
          stroke="#818cf8"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-svg-draw"
        />
      </svg>
      <span className="mt-1 text-[10px] text-slate-400">SVG 선이 시작점부터 끝점까지 그려짐</span>
    </div>
  );
};

/* 6. 리퀴드 블롭 모핑 */
const MgLiquidBlobMorphDemo: React.FC = () => {
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center pt-4 select-none">
      <div className="w-20 h-20 bg-linear-to-tr from-fuchsia-500 via-indigo-500 to-cyan-400 shadow-lg shadow-indigo-500/30 animate-liquid-morph" />
      <span className="mt-2.5 text-[10px] text-slate-400">물방울처럼 곡률이 계속 변형됨</span>
    </div>
  );
};

/* 7. 구이 메타볼 퓨전 (SVG Gooey Filter) */
const MgGooeyMetaballDemo: React.FC = () => {
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center pt-4 select-none">
      <svg className="hidden">
        <defs>
          <filter id="gooey-demo-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div
        style={{ filter: 'url(#gooey-demo-filter)' }}
        className="relative w-44 h-20 flex items-center justify-center"
      >
        <div className="w-11 h-11 rounded-full bg-cyan-400 absolute animate-metaball-left" />
        <div className="w-11 h-11 rounded-full bg-indigo-500 absolute animate-metaball-right" />
      </div>
      <span className="mt-1 text-[10px] text-slate-400">두 물방울이 끈적하게 합체·분리</span>
    </div>
  );
};

/* 8. 플래니터리 오빗 궤도 회전 */
const MgOrbitRotationDemo: React.FC = () => {
  return (
    <div className="w-full h-40 flex items-center justify-center pt-5 select-none">
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* 중앙 코어 */}
        <div className="w-5 h-5 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50" />
        {/* 내부 궤도 */}
        <div className="absolute w-14 h-14 rounded-full border border-dashed border-indigo-400/40 animate-orbit-spin">
          <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-sm" />
        </div>
        {/* 외부 역방향 궤도 */}
        <div className="absolute inset-0.5 rounded-full border border-slate-700 animate-orbit-reverse">
          <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-pink-400 shadow-sm" />
        </div>
      </div>
    </div>
  );
};

/* 9. 키네틱 웨이브 텍스트 */
const MgKineticWaveTextDemo: React.FC = () => {
  const chars = 'KINETIC WAVE'.split('');
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center select-none">
      <div className="flex items-center justify-center gap-0.5 text-lg font-black text-white">
        {chars.map((ch, idx) => (
          <span
            key={idx}
            style={{ animationDelay: `${idx * 75}ms` }}
            className="inline-block animate-kinetic-wave"
          >
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        ))}
      </div>
      <span className="mt-3 text-[10px] text-slate-400">글자 단위로 쪼개져 파도처럼 출렁임</span>
    </div>
  );
};

/* 10. 버티컬 키네틱 텍스트 롤러 */
const Mg3DTextRollerDemo: React.FC = () => {
  const words = ['MOTION', 'GRAPHICS', 'CINEMA', 'INTERACTION'];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % words.length), 1400);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      onClick={() => setIdx((i) => (i + 1) % words.length)}
      className="w-full h-40 flex flex-col items-center justify-center cursor-pointer select-none"
    >
      <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
        <span>CREATE</span>
        <div className="h-7 overflow-hidden bg-slate-900 border border-indigo-500/40 rounded-lg px-2.5">
          <div
            style={{
              transform: `translateY(-${idx * 28}px)`,
              transition: 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {words.map((w) => (
              <div
                key={w}
                className="h-7 flex items-center justify-center font-mono text-sm font-black text-indigo-300"
              >
                {w}
              </div>
            ))}
          </div>
        </div>
      </div>
      <span className="mt-2.5 text-[10px] text-slate-400">슬롯 롤러처럼 단어가 회전 교체</span>
    </div>
  );
};

/* 11. 네온 사인 플리커 점등 */
const MgNeonSignFlickerDemo: React.FC = () => {
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center select-none">
      <div className="px-4 py-2 rounded-xl bg-slate-950 border border-rose-500/30 font-mono text-lg font-black tracking-widest text-rose-400">
        <span>OPEN </span>
        <span className="animate-neon-flicker text-rose-300">24H</span>
      </div>
      <span className="mt-2.5 text-[10px] text-slate-400">네온관이 파르르 깜빡이며 점등</span>
    </div>
  );
};

/* 12. 2.5D 멀티레이어 패럴랙스 */
const MgParallaxDepthDemo: React.FC = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({
          x: (e.clientX - (rect.left + rect.width / 2)) / 6,
          y: (e.clientY - (rect.top + rect.height / 2)) / 6,
        });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      className="relative w-full h-40 flex items-center justify-center overflow-hidden cursor-pointer select-none"
    >
      {/* 배경 레이어 (느림) */}
      <div
        style={{ transform: `translate(${pos.x * 0.4}px, ${pos.y * 0.4}px)` }}
        className="w-40 h-20 rounded-xl bg-slate-900 border border-slate-800 flex items-start justify-end p-2 transition-transform duration-75"
      >
        <span className="text-[9px] text-slate-500 font-mono">BG (0.4x)</span>
      </div>
      {/* 중경 레이어 (중간) */}
      <div
        style={{ transform: `translate(${pos.x * 1.1}px, ${pos.y * 1.1}px)` }}
        className="absolute w-28 h-14 rounded-xl bg-indigo-950/90 border border-indigo-500/40 flex items-start justify-end p-1.5 shadow-lg transition-transform duration-75"
      >
        <span className="text-[9px] text-indigo-300 font-mono">MID (1.1x)</span>
      </div>
      {/* 전경 레이어 (빠름) */}
      <div
        style={{ transform: `translate(${pos.x * 2.1}px, ${pos.y * 2.1}px)` }}
        className="absolute px-3 py-1.5 rounded-lg bg-cyan-400 text-slate-950 font-black text-xs shadow-xl transition-transform duration-75"
      >
        FG (2.1x)
      </div>
    </div>
  );
};

/* 13. 카메라 랙 포커스 (초점 심도 전환) */
const MgRackFocusBlurDemo: React.FC = () => {
  const [focusFront, setFocusFront] = useState(true);
  return (
    <div
      onClick={() => setFocusFront(!focusFront)}
      className="relative w-full h-40 flex items-center justify-center cursor-pointer select-none px-6 pt-5"
    >
      {/* 배경 피사체 (상단 배지와 겹치지 않도록 top-10 및 z-10 이하로 배치) */}
      <div
        className={`absolute right-7 top-10 px-3.5 py-2 rounded-xl bg-violet-600 text-white font-bold text-xs transition-all duration-500 ${
          !focusFront
            ? 'blur-0 scale-105 opacity-100 z-10 ring-2 ring-violet-300 shadow-xl'
            : 'blur-xs scale-90 opacity-45 z-0'
        }`}
      >
        🏔️ 배경 피사체 (Back)
      </div>
      {/* 전경 피사체 */}
      <div
        className={`absolute left-7 bottom-4 px-3.5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs transition-all duration-500 ${
          focusFront
            ? 'blur-0 scale-105 opacity-100 z-10 ring-2 ring-emerald-200 shadow-xl'
            : 'blur-xs scale-90 opacity-45 z-0'
        }`}
      >
        📷 전경 피사체 (클릭 전환)
      </div>
    </div>
  );
};

/* 14. 시네마틱 켄 번즈 (줌 & 패닝) */
const MgKenBurnsPanDemo: React.FC = () => {
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center select-none px-6">
      <div className="relative w-52 h-24 rounded-xl overflow-hidden border border-slate-700">
        <div className="w-full h-full bg-linear-to-br from-indigo-900 via-purple-900 to-amber-700 animate-ken-burns flex items-center justify-center">
          <div className="text-center">
            <span className="text-[10px] font-mono text-amber-200 block">CAMERA PAN & ZOOM</span>
            <span className="text-xs font-black text-white">Ken Burns Effect</span>
          </div>
        </div>
        {/* 카메라 뷰파인더 가이드 */}
        <div className="pointer-events-none absolute inset-2 border border-white/25 rounded-sm flex items-start justify-between p-1">
          <span className="text-[8px] font-mono text-rose-400">● REC</span>
        </div>
      </div>
    </div>
  );
};

/* 15. 아이소메트릭 레이어 익스플로드 */
const MgIsometricExplodeDemo: React.FC = () => {
  const [exploded, setExploded] = useState(true);
  const layers = [
    { label: 'L1', color: 'bg-slate-800/95 border-slate-500 text-slate-300' },
    { label: 'L2', color: 'bg-indigo-600/85 border-indigo-300 text-white' },
    { label: 'L3', color: 'bg-cyan-400/90 border-white text-slate-950' },
  ];
  return (
    <div
      onClick={() => setExploded(!exploded)}
      onMouseEnter={() => setExploded(true)}
      onMouseLeave={() => setExploded(false)}
      className="w-full h-40 flex flex-col items-center justify-center pt-4 cursor-pointer select-none"
    >
      <div className="relative w-24 h-20 flex items-center justify-center perspective-1000 preserve-3d">
        {layers.map((layer, i) => {
          const offsetY = exploded ? (1 - i) * 18 : (1 - i) * 5;
          return (
            <div
              key={layer.label}
              style={{
                transform: `translateY(${offsetY}px) rotateX(55deg) rotateZ(-35deg)`,
                transition: 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
                zIndex: i + 1,
              }}
              className={`absolute w-16 h-16 rounded-xl border ${layer.color} shadow-lg flex items-end justify-end p-1.5 text-[9px] font-mono font-black`}
            >
              {layer.label}
            </div>
          );
        })}
      </div>
      <span className="mt-2 text-[10px] text-slate-400">마우스 오버 / 클릭 시 입체 층 분리</span>
    </div>
  );
};

/* 16. 서큘러 아이리스 와이프 전환 */
const MgIrisCircleWipeDemo: React.FC = () => {
  const [closed, setClosed] = useState(false);
  return (
    <div
      onClick={() => setClosed(!closed)}
      className="w-full h-40 flex flex-col items-center justify-center cursor-pointer select-none px-6"
    >
      <div className="relative w-52 h-24 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 flex items-center justify-center">
        <span className="text-xs font-bold text-slate-400">SCENE #2 (클릭해 열기)</span>
        <div
          style={{
            clipPath: closed ? 'circle(0% at 50% 50%)' : 'circle(120% at 50% 50%)',
            transition: 'clip-path 0.65s cubic-bezier(0.65, 0, 0.35, 1)',
          }}
          className="absolute inset-0 bg-linear-to-r from-indigo-600 to-emerald-500 flex items-center justify-center"
        >
          <span className="text-xs font-black text-white">SCENE #1 (클릭해 조리개 닫기)</span>
        </div>
      </div>
    </div>
  );
};

/* 17. RGB 색수차 글리치 */
const MgRgbChromaticGlitchDemo: React.FC = () => {
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center select-none">
      <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800">
        <span className="font-mono text-lg font-black tracking-wider text-white inline-block animate-rgb-glitch">
          CYBER GLITCH
        </span>
      </div>
      <span className="mt-2.5 text-[10px] text-slate-400">Red·Cyan 채널 분리 및 디지털 노이즈</span>
    </div>
  );
};

/* 18. 스피드 라인 & 모션 스트리크 */
const MgSpeedLinesStreakDemo: React.FC = () => {
  const lines = [
    { top: '20%', delay: '0ms', width: 'w-20' },
    { top: '38%', delay: '220ms', width: 'w-28' },
    { top: '58%', delay: '110ms', width: 'w-16' },
    { top: '78%', delay: '360ms', width: 'w-24' },
  ];

  return (
    <div className="relative w-full h-40 flex items-center justify-center overflow-hidden select-none">
      {lines.map((l, i) => (
        <span
          key={i}
          style={{ top: l.top, animationDelay: l.delay }}
          className={`pointer-events-none absolute left-0 h-0.5 ${l.width} bg-linear-to-r from-transparent via-cyan-400 to-white animate-speed-streak`}
        />
      ))}
      <div className="relative z-10 px-4 py-1.5 rounded-full bg-indigo-600 text-white font-black text-xs italic shadow-lg">
        ⚡ HYPER SPEED
      </div>
    </div>
  );
};

/* 19. 오로라 메쉬 그라데이션 */
const MgAuroraMeshDemo: React.FC = () => {
  return (
    <div className="relative w-full h-40 flex items-center justify-center overflow-hidden select-none bg-slate-950">
      <div className="w-32 h-32 rounded-full bg-indigo-500/60 blur-2xl absolute animate-aurora-1" />
      <div className="w-32 h-32 rounded-full bg-emerald-400/50 blur-2xl absolute animate-aurora-2" />
      <div className="w-28 h-28 rounded-full bg-fuchsia-500/50 blur-2xl absolute animate-glass-orb-1" />
      <span className="relative z-10 text-xs font-black tracking-wider text-white/90 bg-slate-950/40 backdrop-blur-xs px-3 py-1 rounded-full border border-white/15">
        AURORA MESH
      </span>
    </div>
  );
};

/* 20. 컨스텔레이션 파티클 네트워크 */
const MgParticleNetworkDemo: React.FC = () => {
  const [hoverIdx, setHoverIdx] = useState<number>(2);
  const nodes = [
    { x: 25, y: 28 },
    { x: 65, y: 22 },
    { x: 48, y: 55 },
    { x: 82, y: 65 },
    { x: 20, y: 74 },
  ];
  const edges = [
    [0, 1],
    [0, 2],
    [1, 2],
    [1, 3],
    [2, 3],
    [2, 4],
    [0, 4],
  ];

  return (
    <div
      onClick={() => setHoverIdx((h) => (h + 1) % nodes.length)}
      className="relative w-full h-40 flex items-center justify-center cursor-pointer select-none"
    >
      <svg className="w-56 h-32" viewBox="0 0 100 100">
        {edges.map(([a, b], i) => {
          const isHighlighted = a === hoverIdx || b === hoverIdx;
          return (
            <line
              key={i}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              stroke={isHighlighted ? '#38bdf8' : '#334155'}
              strokeWidth={isHighlighted ? '1.8' : '1'}
            />
          );
        })}
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={i === hoverIdx ? 4.5 : 3}
            fill={i === hoverIdx ? '#38bdf8' : '#818cf8'}
            onMouseEnter={() => setHoverIdx(i)}
          />
        ))}
      </svg>
    </div>
  );
};

/* 21. 인터랙티브 도트 매트릭스 그리드 */
const MgDotMatrixGridDemo: React.FC = () => {
  const [activeCol, setActiveCol] = useState(4);
  const cols = 9;
  const rows = 4;

  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const col = Math.floor(((e.clientX - rect.left) / rect.width) * cols);
        setActiveCol(Math.max(0, Math.min(cols - 1, col)));
      }}
      className="w-full h-40 flex flex-col items-center justify-center cursor-pointer select-none"
    >
      <div className="grid grid-cols-9 gap-2.5 p-3">
        {Array.from({ length: rows * cols }).map((_, idx) => {
          const c = idx % cols;
          const dist = Math.abs(c - activeCol);
          const active = dist <= 1;
          return (
            <span
              key={idx}
              style={{
                transform: active ? `scale(${dist === 0 ? 1.8 : 1.35})` : 'scale(1)',
              }}
              className={`w-2 h-2 rounded-full transition-all duration-150 ${
                dist === 0
                  ? 'bg-cyan-400 shadow-xs shadow-cyan-400'
                  : dist === 1
                  ? 'bg-indigo-400'
                  : 'bg-slate-800'
              }`}
            />
          );
        })}
      </div>
      <span className="mt-1 text-[10px] text-slate-400">마우스를 좌우로 움직여보세요</span>
    </div>
  );
};

/* 22. 볼류메트릭 스포트라이트 빔 (God Rays) */
const MgGodRayBeamDemo: React.FC = () => {
  return (
    <div className="relative w-full h-40 flex flex-col items-center justify-center overflow-hidden select-none bg-slate-950">
      <div
        style={{
          background:
            'conic-gradient(from 155deg at 50% 0%, transparent 0deg, rgba(56,189,248,0.35) 25deg, transparent 50deg)',
        }}
        className="pointer-events-none absolute -top-6 w-64 h-48 blur-md animate-beam-sway"
      />
      <span className="relative z-10 text-xs font-black tracking-widest text-cyan-200 mt-4">
        VOLUMETRIC BEAM
      </span>
      <span className="relative z-10 mt-1 text-[10px] text-slate-400">
        상단에서 쏟아지는 입체 빛기둥
      </span>
    </div>
  );
};

/* ============================================================================
 * DOMAIN 3: 레이아웃 & 공간 구조 데모 (16종)
 * ============================================================================ */

/* 1. 벤토 그리드 (Bento Grid) */
const LyBentoGridDemo: React.FC = () => {
  const [activeTile, setActiveTile] = useState(0);
  return (
    <div className="w-full h-40 flex items-center justify-center px-5 pt-6 select-none">
      <div className="w-full h-24 grid grid-cols-4 grid-rows-2 gap-1.5">
        <div
          onClick={() => setActiveTile(0)}
          className={`col-span-2 row-span-2 rounded-xl p-2.5 flex flex-col justify-between cursor-pointer border transition-all ${
            activeTile === 0
              ? 'bg-indigo-600/30 border-indigo-400 text-white'
              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
          }`}
        >
          <span className="text-[9px] font-mono text-indigo-300">2x2 MAIN</span>
          <span className="text-xs font-extrabold">Bento Hero</span>
        </div>
        <div
          onClick={() => setActiveTile(1)}
          className={`col-span-2 row-span-1 rounded-xl px-2.5 py-1 flex items-center justify-between cursor-pointer border transition-all ${
            activeTile === 1
              ? 'bg-emerald-600/30 border-emerald-400 text-white'
              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
          }`}
        >
          <span className="text-[10px] font-bold">Wide Tile</span>
          <span className="text-[9px] font-mono text-emerald-300">2x1</span>
        </div>
        <div
          onClick={() => setActiveTile(2)}
          className={`col-span-1 row-span-1 rounded-xl flex items-center justify-center cursor-pointer border text-[10px] font-bold transition-all ${
            activeTile === 2
              ? 'bg-amber-500/30 border-amber-400 text-amber-200'
              : 'bg-slate-900 border-slate-800 text-slate-400'
          }`}
        >
          1x1
        </div>
        <div
          onClick={() => setActiveTile(3)}
          className={`col-span-1 row-span-1 rounded-xl flex items-center justify-center cursor-pointer border text-[10px] font-bold transition-all ${
            activeTile === 3
              ? 'bg-pink-500/30 border-pink-400 text-pink-200'
              : 'bg-slate-900 border-slate-800 text-slate-400'
          }`}
        >
          1x1
        </div>
      </div>
    </div>
  );
};

/* 2. 메이슨리 폭포수 그리드 (Masonry Waterfall) */
const LyMasonryWaterfallDemo: React.FC = () => {
  const [shuffled, setShuffled] = useState(false);
  return (
    <div
      onClick={() => setShuffled(!shuffled)}
      className="w-full h-40 flex flex-col items-center justify-center px-6 pt-5 cursor-pointer select-none"
    >
      <div className="w-full grid grid-cols-3 gap-1.5 items-start">
        <div className="space-y-1.5">
          <div className={`${shuffled ? 'h-8' : 'h-12'} rounded-lg bg-indigo-500/30 border border-indigo-500/50 transition-all duration-300 flex items-center justify-center text-[9px] font-mono text-indigo-200`}>H1</div>
          <div className={`${shuffled ? 'h-12' : 'h-7'} rounded-lg bg-slate-800 border border-slate-700 transition-all duration-300 flex items-center justify-center text-[9px] font-mono text-slate-400`}>H2</div>
        </div>
        <div className="space-y-1.5">
          <div className={`${shuffled ? 'h-12' : 'h-7'} rounded-lg bg-slate-800 border border-slate-700 transition-all duration-300 flex items-center justify-center text-[9px] font-mono text-slate-400`}>H3</div>
          <div className={`${shuffled ? 'h-8' : 'h-12'} rounded-lg bg-cyan-500/30 border border-cyan-500/50 transition-all duration-300 flex items-center justify-center text-[9px] font-mono text-cyan-200`}>H4</div>
        </div>
        <div className="space-y-1.5">
          <div className={`${shuffled ? 'h-10' : 'h-11'} rounded-lg bg-fuchsia-500/30 border border-fuchsia-500/50 transition-all duration-300 flex items-center justify-center text-[9px] font-mono text-fuchsia-200`}>H5</div>
          <div className={`${shuffled ? 'h-11' : 'h-9'} rounded-lg bg-slate-800 border border-slate-700 transition-all duration-300 flex items-center justify-center text-[9px] font-mono text-slate-400`}>H6</div>
        </div>
      </div>
      <span className="mt-1.5 text-[10px] text-slate-400">클릭 시 높이 단차 재배치</span>
    </div>
  );
};

/* 3. 매거진 비대칭 오버랩 (Asymmetric Editorial) */
const LyEditorialAsymmetricDemo: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setHovered(!hovered)}
      className="relative w-full h-40 flex items-center justify-center px-6 pt-4 cursor-pointer select-none"
    >
      <div
        className={`w-36 h-24 rounded-xl bg-linear-to-br from-rose-500/40 to-indigo-600/40 border border-white/20 mr-10 transition-transform duration-300 ${
          hovered ? '-translate-x-2 scale-105' : ''
        }`}
      />
      <div
        className={`absolute right-7 bottom-5 w-32 rounded-lg bg-slate-900/95 border border-amber-400/50 p-2.5 shadow-xl transition-transform duration-300 ${
          hovered ? 'translate-x-1 -translate-y-1' : ''
        }`}
      >
        <span className="text-[9px] font-mono text-amber-300">ISSUE 04</span>
        <p className="text-xs font-black text-white leading-tight">EDITORIAL OVERLAP</p>
      </div>
    </div>
  );
};

/* 4. 허니컴 육각형 타일 (Honeycomb Grid) - 라이트/다크 모드 고대비 벡터 타일 */
const LyHoneycombHexDemo: React.FC = () => {
  const [selected, setSelected] = useState(2);
  const hexes = [
    { id: 0, label: 'AI', role: 'CORE' },
    { id: 1, label: 'UI', role: 'VIEW' },
    { id: 2, label: 'VFX', role: 'ANIM' },
    { id: 3, label: '3D', role: 'MESH' },
    { id: 4, label: 'CSS', role: 'STYLE' },
  ];

  const row1 = hexes.slice(0, 3);
  const row2 = hexes.slice(3, 5);

  const renderHex = (item: (typeof hexes)[0]) => {
    const active = selected === item.id;
    return (
      <div
        key={item.id}
        role="button"
        tabIndex={0}
        onClick={() => setSelected(item.id)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setSelected(item.id);
          }
        }}
        aria-label={`${item.label} 육각형 셀`}
        style={{
          outline: 'none',
          border: 'none',
          WebkitTapHighlightColor: 'transparent',
          boxShadow: 'none',
        }}
        className={`relative w-12 h-14 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 select-none group border-0 border-none outline-hidden focus:outline-hidden focus-visible:outline-hidden ring-0 focus:ring-0 focus-visible:ring-0 ${
          active
            ? 'scale-110 z-20 drop-shadow-[0_6px_14px_rgba(245,158,11,0.45)]'
            : 'hover:scale-105 z-10 drop-shadow-[0_2px_5px_rgba(15,23,42,0.12)] dark:drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]'
        }`}
      >
        <svg
          viewBox="0 0 100 115"
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        >
          <polygon
            points="50,4 96,31 96,84 50,111 4,84 4,31"
            className={`transition-colors duration-200 ${
              active
                ? 'fill-amber-400 dark:fill-amber-400 stroke-amber-500 dark:stroke-amber-300 stroke-3'
                : 'fill-white dark:fill-slate-900 stroke-slate-300 dark:stroke-slate-700 stroke-2 group-hover:stroke-indigo-500 dark:group-hover:stroke-indigo-400 group-hover:fill-indigo-50/70 dark:group-hover:fill-slate-800'
            }`}
          />
        </svg>

        <span
          className={`relative z-10 text-[11px] font-black tracking-tight leading-none transition-colors pointer-events-none ${
            active
              ? 'text-slate-950'
              : 'text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-white'
          }`}
        >
          {item.label}
        </span>
        <span
          className={`relative z-10 text-[7px] font-extrabold tracking-widest mt-0.5 leading-none transition-colors pointer-events-none ${
            active
              ? 'text-slate-900/80 font-bold'
              : 'text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 dark:group-hover:text-slate-300'
          }`}
        >
          {item.role}
        </span>
      </div>
    );
  };

  return (
    <div className="w-full h-40 flex flex-col items-center justify-center pt-1 select-none">
      <div className="flex flex-col items-center">
        {/* 상단 1열 (3셀) */}
        <div className="flex items-center gap-2">
          {row1.map(renderHex)}
        </div>
        {/* 하단 2열 (2셀, 상단 1열의 골짜기에 맞물리는 오프셋) */}
        <div className="flex items-center gap-2 -mt-3.5">
          {row2.map(renderHex)}
        </div>
      </div>
      <span className="mt-3 text-[10px] text-slate-500 dark:text-slate-400 font-medium">
        육각형 셀을 클릭해 보세요
      </span>
    </div>
  );
};

/* 5. 스티키 스크롤텔링 (Sticky Scrolltelling) */
const LyStickyScrolltellingDemo: React.FC = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { title: 'Step 01', color: 'from-indigo-500 to-cyan-400' },
    { title: 'Step 02', color: 'from-emerald-500 to-teal-400' },
    { title: 'Step 03', color: 'from-rose-500 to-amber-400' },
  ];
  return (
    <div
      onClick={() => setStep((s) => (s + 1) % steps.length)}
      className="w-full h-40 flex items-center justify-center px-5 pt-6 cursor-pointer select-none"
    >
      <div className="w-full h-24 rounded-xl bg-slate-900 border border-slate-800 p-2 grid grid-cols-2 gap-2.5 items-center">
        {/* 좌측 고정(Sticky) 비주얼 */}
        <div
          className={`h-full rounded-lg bg-linear-to-br ${steps[step].color} flex flex-col items-center justify-center text-slate-950 font-black text-xs transition-all duration-300`}
        >
          <span className="text-[9px] font-mono opacity-75">STICKY LEFT</span>
          <span>{steps[step].title}</span>
        </div>
        {/* 우측 스크롤 스토리 */}
        <div className="space-y-1">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                i === step
                  ? 'bg-indigo-600/30 border border-indigo-400 text-white'
                  : 'bg-slate-950 text-slate-500'
              }`}
            >
              {s.title} 스크롤 단락
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* 6. 풀페이지 스냅 섹션 (Full-Page Scroll Snap) */
const LyFullpageSnapDemo: React.FC = () => {
  const [page, setPage] = useState(0);
  const colors = ['bg-indigo-600/30 border-indigo-400', 'bg-emerald-600/30 border-emerald-400', 'bg-rose-600/30 border-rose-400'];
  return (
    <div
      onClick={() => setPage((p) => (p + 1) % 3)}
      className="w-full h-40 flex items-center justify-center px-6 pt-5 cursor-pointer select-none"
    >
      <div className="relative w-full h-24 rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
        <div
          style={{ transform: `translateY(-${page * 96}px)` }}
          className="transition-transform duration-500 ease-out"
        >
          {[0, 1, 2].map((idx) => (
            <div
              key={idx}
              className={`h-24 flex flex-col items-center justify-center border-l-4 ${colors[idx]}`}
            >
              <span className="text-xs font-black text-white">SECTION 0{idx + 1}</span>
              <span className="text-[10px] text-slate-400">클릭 시 다음 섹션으로 철컥 스냅</span>
            </div>
          ))}
        </div>
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex flex-col gap-1">
          {[0, 1, 2].map((idx) => (
            <span
              key={idx}
              className={`w-1.5 h-1.5 rounded-full ${page === idx ? 'bg-white' : 'bg-slate-600'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/* 7. 가로 스크롤 쇼케이스 (Horizontal Scroll Showcase) */
const LyHorizontalShowcaseDemo: React.FC = () => {
  const [idx, setIdx] = useState(0);
  return (
    <div
      onClick={() => setIdx((i) => (i + 1) % 4)}
      className="w-full h-40 flex flex-col items-center justify-center px-5 pt-3 cursor-pointer select-none"
    >
      <div className="w-full overflow-hidden rounded-xl bg-slate-900 border border-slate-800 p-2">
        <div
          style={{ transform: `translateX(-${idx * 76}px)` }}
          className="flex gap-2 transition-transform duration-500 ease-out"
        >
          {['CARD 01', 'CARD 02', 'CARD 03', 'CARD 04'].map((c, i) => (
            <div
              key={c}
              className={`shrink-0 w-24 h-16 rounded-lg border flex flex-col items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                i === idx
                  ? 'bg-indigo-600 text-white border-indigo-400 shadow-md scale-[1.02]'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              <span>{c}</span>
              <span
                className={`text-[9px] ${
                  i === idx ? 'text-indigo-100 font-semibold' : 'text-indigo-400/80'
                }`}
              >
                스냅 슬라이드
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-2">
        {[0, 1, 2, 3].map((dot) => (
          <span
            key={dot}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              dot === idx
                ? 'w-4 bg-indigo-500'
                : 'w-1.5 bg-slate-400/40 dark:bg-slate-700'
            }`}
          />
        ))}
        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 ml-1">
          {idx + 1} / 4
        </span>
      </div>
    </div>
  );
};

/* 8. 언더빌 커튼 리빌 푸터 (Curtain Reveal) */
const LyCurtainRevealDemo: React.FC = () => {
  const [lifted, setLifted] = useState(false);
  return (
    <div
      onClick={() => setLifted(!lifted)}
      className="w-full h-40 flex items-center justify-center px-6 pt-6 cursor-pointer select-none"
    >
      <div className="relative w-full h-24 rounded-xl overflow-hidden border border-slate-800 bg-indigo-950 flex items-end justify-center p-2">
        {/* 바닥에 깔린 고정 레이어 */}
        <div className="text-center">
          <span className="text-[10px] font-mono text-indigo-300">FIXED FOOTER LAYER</span>
          <p className="text-xs font-black text-white">숨겨진 하단 푸터 등장 ✨</p>
        </div>
        {/* 위를 덮은 본문 커튼 */}
        <div
          className={`absolute inset-0 bg-slate-900 border-b border-slate-700 flex flex-col items-center justify-center transition-transform duration-500 ${
            lifted ? '-translate-y-12' : 'translate-y-0'
          }`}
        >
          <span className="text-xs font-bold text-slate-200">
            {lifted ? '커튼 닫기 ↓ (클릭)' : '본문 커튼 들어올리기 ↑ (클릭)'}
          </span>
        </div>
      </div>
    </div>
  );
};

/* 9. 맥OS 독 매그니피케이션 바 (macOS Dock Magnification) */
const LyMacosDockDemo: React.FC = () => {
  const [hoverIdx, setHoverIdx] = useState<number | null>(2);
  const icons = ['🏠', '🔍', '⚡', '🎨', '🚀'];
  return (
    <div
      onMouseLeave={() => setHoverIdx(2)}
      className="w-full h-40 flex flex-col items-center justify-center pt-4 select-none"
    >
      <div className="flex items-end gap-2 px-3.5 py-2 rounded-2xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md h-14">
        {icons.map((ic, i) => {
          const dist = hoverIdx === null ? 99 : Math.abs(hoverIdx - i);
          const scale = dist === 0 ? 1.45 : dist === 1 ? 1.18 : 1;
          return (
            <button
              key={i}
              onMouseEnter={() => setHoverIdx(i)}
              onClick={() => setHoverIdx(i)}
              style={{ transform: `scale(${scale}) translateY(${dist === 0 ? '-4px' : '0px'})` }}
              className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-sm transition-transform duration-150 origin-bottom"
            >
              {ic}
            </button>
          );
        })}
      </div>
      <span className="mt-2.5 text-[10px] text-slate-400">아이콘 위에 마우스를 올려보세요</span>
    </div>
  );
};

/* 10. 커맨드 팔레트 스포트라이트 (Command Palette Cmd+K) */
const LyCommandPaletteDemo: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const cmds = ['⚡ 새 프로젝트 생성', '🎨 다크 테마 전환', '📋 프롬프트 전체 복사'];
  return (
    <div className="w-full h-40 flex items-center justify-center px-6 pt-6 select-none">
      <div className="w-full rounded-xl bg-white dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden">
        <div className="px-3 py-1.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
          <span>🔍 Type a command...</span>
          <kbd className="px-1.5 py-0.5 rounded-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[9px] border border-slate-200 dark:border-transparent">⌘K</kbd>
        </div>
        <div className="p-1 space-y-0.5">
          {cmds.map((cmd, i) => (
            <div
              key={cmd}
              onClick={() => setSelectedIdx(i)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer flex items-center justify-between transition-colors ${
                selectedIdx === i
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>{cmd}</span>
              {selectedIdx === i && <span className="text-[9px] font-mono">↵</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* 11. 다이나믹 아일랜드 캡슐 바 (Dynamic Island Capsule) */
const LyDynamicIslandNavDemo: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center pt-4 select-none">
      <div
        onClick={() => setExpanded(!expanded)}
        className={`bg-white dark:bg-black border border-slate-200/90 dark:border-slate-700/80 shadow-lg shadow-indigo-950/5 dark:shadow-2xl cursor-pointer transition-all duration-300 overflow-hidden flex flex-col justify-center ${
          expanded
            ? 'w-56 h-20 rounded-3xl px-4 py-2'
            : 'w-32 h-9 rounded-full px-3'
        }`}
      >
        <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
          <span className="flex items-center gap-1.5 text-slate-900 dark:text-white">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-black tracking-tight text-slate-900 dark:text-white">
              {expanded ? 'Now Playing' : 'Island'}
            </span>
          </span>
          <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-300 font-bold">
            {expanded ? '접기' : '클릭'}
          </span>
        </div>
        {expanded && (
          <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-600 dark:text-slate-200 border-t border-slate-100 dark:border-slate-800/80 pt-1.5">
            <span className="text-slate-700 dark:text-slate-200 font-medium">🎵 Vibe Synth Track</span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white font-bold shadow-xs">
              LIVE
            </span>
          </div>
        )}
      </div>
      <span className="mt-2 text-[10px] text-slate-500 dark:text-slate-400">캡슐을 클릭해 확장/축소</span>
    </div>
  );
};

/* 12. 원형 파이 메뉴 (Radial Pie Menu) */
const LyRadialPieMenuDemo: React.FC = () => {
  const [open, setOpen] = useState(true);
  const items = [
    { icon: '🎨', x: -38, y: -28 },
    { icon: '⚡', x: 38, y: -28 },
    { icon: '🚀', x: 38, y: 28 },
    { icon: '✨', x: -38, y: 28 },
  ];
  return (
    <div className="relative w-full h-40 flex items-center justify-center pt-5 select-none">
      {items.map((it, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => setOpen(!open)}
          style={{
            transform: open
              ? `translate(${it.x}px, ${it.y}px) scale(1)`
              : 'translate(0px, 0px) scale(0.2)',
            opacity: open ? 1 : 0,
            transitionDelay: open ? `${idx * 35}ms` : '0ms',
          }}
          className="absolute w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-indigo-400/50 flex items-center justify-center text-xs text-slate-700 dark:text-white transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer shadow-md hover:bg-indigo-50 dark:hover:bg-slate-700"
        >
          {it.icon}
        </button>
      ))}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="파이 메뉴 열기/닫기"
        className="relative z-10 w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg border border-indigo-400/40 cursor-pointer"
      >
        <svg
          viewBox="0 0 20 20"
          className={`w-4 h-4 stroke-current stroke-[2.4] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            open ? 'rotate-45' : 'rotate-0'
          }`}
        >
          <line x1="10" y1="3.5" x2="10" y2="16.5" strokeLinecap="round" />
          <line x1="3.5" y1="10" x2="16.5" y2="10" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
};

/* 13. 바텀 시트 드로어 (Draggable Bottom Sheet) */
const LyBottomSheetDemo: React.FC = () => {
  const [snap, setSnap] = useState<'half' | 'full'>('half');
  return (
    <div
      onClick={() => setSnap(snap === 'half' ? 'full' : 'half')}
      className="w-full h-40 flex items-end justify-center px-8 pt-8 cursor-pointer select-none"
    >
      <div
        className={`w-full rounded-t-2xl bg-white dark:bg-slate-900 border-t border-x border-slate-200 dark:border-slate-700 px-3.5 pt-2 transition-all duration-300 shadow-lg ${
          snap === 'full' ? 'h-24' : 'h-14'
        }`}
      >
        <div className="w-8 h-1 rounded-full bg-slate-300 dark:bg-slate-600 mx-auto mb-1.5" />
        <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
          <span>Bottom Sheet ({snap.toUpperCase()})</span>
          <span className="text-[10px] text-indigo-600 dark:text-indigo-400">클릭해 높이 전환</span>
        </div>
        {snap === 'full' && (
          <p className="mt-1.5 text-[11px] text-slate-600 dark:text-slate-400">
            핸들바를 잡고 올린 것처럼 상세 컨텐츠가 펼쳐집니다.
          </p>
        )}
      </div>
    </div>
  );
};

/* 14. 마스터-디테일 스플릿 뷰 (Master-Detail Split View) */
const LyMasterDetailSplitDemo: React.FC = () => {
  const [activeId, setActiveId] = useState(0);
  const items = [
    { name: 'Inbox #1', desc: '첫 번째 상세 데이터 프리뷰' },
    { name: 'Inbox #2', desc: '두 번째 항목 즉시 렌더링' },
    { name: 'Inbox #3', desc: '세 번째 리포트 상세 보기' },
  ];
  return (
    <div className="w-full h-40 flex items-center justify-center px-5 pt-6 select-none">
      <div className="w-full h-24 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 grid grid-cols-5 overflow-hidden shadow-xs">
        <div className="col-span-2 border-r border-slate-200 dark:border-slate-800 p-1.5 space-y-0.5">
          {items.map((it, idx) => (
            <button
              key={it.name}
              onClick={() => setActiveId(idx)}
              className={`w-full text-left px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                activeId === idx
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {it.name}
            </button>
          ))}
        </div>
        <div className="col-span-3 p-2.5 flex flex-col justify-center">
          <span className="text-[9px] font-mono text-indigo-600 dark:text-indigo-400">DETAIL VIEW</span>
          <p className="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5">{items[activeId].name}</p>
          <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5">{items[activeId].desc}</p>
        </div>
      </div>
    </div>
  );
};

/* 15. 칸반 보드 컬럼 (Kanban Board Columns) */
const LyKanbanBoardDemo: React.FC = () => {
  const [col, setCol] = useState<0 | 1 | 2>(1);
  const cols = ['TODO', 'DOING', 'DONE'];
  return (
    <div
      onClick={() => setCol(((col + 1) % 3) as 0 | 1 | 2)}
      className="w-full h-40 flex flex-col items-center justify-center px-5 pt-5 cursor-pointer select-none"
    >
      <div className="w-full grid grid-cols-3 gap-1.5">
        {cols.map((title, i) => (
          <div key={title} className="rounded-lg bg-slate-900 border border-slate-800 p-2 h-20">
            <div className="text-[9px] font-mono text-slate-400 mb-1">{title}</div>
            {col === i ? (
              <div className="rounded-sm bg-indigo-600/30 border border-indigo-400 p-1 text-[10px] font-bold text-white animate-spring-pop">
                태스크 카드 →
              </div>
            ) : (
              <div className="h-6 rounded-sm border border-dashed border-slate-800" />
            )}
          </div>
        ))}
      </div>
      <span className="mt-1.5 text-[10px] text-slate-400">클릭해 카드를 다음 컬럼으로 이동</span>
    </div>
  );
};

/* 16. 잔디 히트맵 매트릭스 (Contribution Heatmap Grid) */
const LyHeatmapGridDemo: React.FC = () => {
  const [seed, setSeed] = useState(1);
  const levels = [
    'bg-slate-800',
    'bg-emerald-900/70',
    'bg-emerald-700/80',
    'bg-emerald-500',
    'bg-emerald-300',
  ];
  return (
    <div
      onClick={() => setSeed((s) => s + 1)}
      className="w-full h-40 flex flex-col items-center justify-center pt-4 cursor-pointer select-none"
    >
      <div className="grid grid-cols-10 gap-1 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
        {Array.from({ length: 40 }).map((_, idx) => {
          const lv = (idx * 7 + seed * 3) % 5;
          return <span key={idx} className={`w-3 h-3 rounded-[3px] ${levels[lv]}`} />;
        })}
      </div>
      <span className="mt-2 text-[10px] text-slate-400">클릭 시 잔디 밀도 패턴 변경 🌱</span>
    </div>
  );
};

/* ============================================================================
 * DOMAIN 4: 디자인 스타일 & 테마 데모 (16종)
 * ============================================================================ */

/* 1. 네오 브루탈리즘 (Neo-Brutalism) */
const StNeoBrutalismDemo: React.FC = () => {
  const [pressed, setPressed] = useState(false);
  return (
    <div className="w-full h-40 flex items-center justify-center bg-amber-300/95 select-none">
      <button
        onClick={() => setPressed(!pressed)}
        style={{
          boxShadow: pressed ? '1px 1px 0px #000' : '5px 5px 0px #000',
          transform: pressed ? 'translate(4px, 4px)' : 'translate(0px, 0px)',
        }}
        className="px-5 py-2.5 bg-pink-400 border-[3px] border-black text-black font-black text-xs tracking-wide transition-all duration-100"
      >
        NEO-BRUTAL CLICK!
      </button>
    </div>
  );
};

/* 2. 리퀴드 아크릴 글래스 (Liquid Acrylic Glass) */
const StLiquidAcrylicDemo: React.FC = () => {
  return (
    <div className="relative w-full h-40 flex items-center justify-center overflow-hidden select-none">
      <div className="w-24 h-24 rounded-full bg-fuchsia-500/70 blur-xl absolute -left-2 animate-aurora-1" />
      <div className="w-24 h-24 rounded-full bg-cyan-400/70 blur-xl absolute right-2 animate-aurora-2" />
      <div className="relative z-10 w-52 h-24 rounded-2xl bg-linear-to-b from-white/20 to-white/5 backdrop-blur-xl border border-white/30 shadow-2xl p-3.5 flex flex-col justify-between">
        <span className="text-[10px] font-mono text-white/90">LIQUID ACRYLIC</span>
        <span className="text-xs font-extrabold text-white">영롱한 다중 굴절 아크릴</span>
      </div>
    </div>
  );
};

/* 3. 리니어풍 다크 미니멀 (Linear-Style Dark Minimal) */
const StLinearDarkMinimalDemo: React.FC = () => {
  return (
    <div className="w-full h-40 flex items-center justify-center bg-[#090A0F] px-6 pt-5 select-none">
      <div className="relative w-full h-24 rounded-xl bg-[#12131A] border border-white/10 p-3.5 flex flex-col justify-between overflow-hidden">
        <div className="pointer-events-none absolute top-0 left-6 right-6 h-px bg-linear-to-r from-transparent via-indigo-400/80 to-transparent" />
        <span className="text-[10px] font-mono text-slate-400">1PX TOP HAIRLINE</span>
        <span className="text-xs font-bold bg-linear-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Linear Precision Dark UI
        </span>
      </div>
    </div>
  );
};

/* 4. 매트 필름 그레인 텍스처 (Matte Film Grain) */
const StMatteFilmGrainDemo: React.FC = () => {
  return (
    <div className="relative w-full h-40 flex items-center justify-center bg-stone-900 overflow-hidden select-none">
      <div
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.14) 1px, transparent 0)',
          backgroundSize: '6px 6px',
        }}
        className="pointer-events-none absolute inset-0 opacity-60"
      />
      <div className="relative z-10 px-5 py-3 rounded-xl bg-stone-800/90 border border-stone-600/50 text-center">
        <span className="text-[10px] font-mono text-amber-200/80">ANALOG FILM GRAIN</span>
        <p className="text-xs font-bold text-stone-100 mt-0.5">차분한 매트 노이즈 질감</p>
      </div>
    </div>
  );
};

/* 5. 뉴모피즘 소프트 엠보싱 (Neumorphism Soft UI) */
const StNeumorphismSoftDemo: React.FC = () => {
  const [inset, setInset] = useState(false);
  return (
    <div className="w-full h-40 flex items-center justify-center bg-slate-800 select-none">
      <button
        onClick={() => setInset(!inset)}
        style={{
          boxShadow: inset
            ? 'inset 5px 5px 10px #0f172a, inset -5px -5px 10px #334155'
            : '6px 6px 12px #0f172a, -6px -6px 12px #334155',
        }}
        className="px-6 py-3 rounded-2xl bg-slate-800 text-xs font-extrabold text-slate-200 transition-all"
      >
        {inset ? '음각 눌림 (클릭)' : '양각 돌출 (클릭)'}
      </button>
    </div>
  );
};

/* 6. 클레이모피즘 3D 점토 (Claymorphism 3D) */
const StClaymorphism3DDemo: React.FC = () => {
  const [bounce, setBounce] = useState(false);
  return (
    <div className="w-full h-40 flex items-center justify-center select-none">
      <div
        onClick={() => setBounce(!bounce)}
        style={{
          boxShadow:
            '0 12px 20px rgba(0,0,0,0.45), inset -6px -6px 12px rgba(79,70,229,0.7), inset 6px 6px 12px rgba(255,255,255,0.45)',
        }}
        className={`px-6 py-3.5 rounded-[24px] bg-indigo-400 text-slate-950 font-black text-xs cursor-pointer transition-transform ${
          bounce ? 'scale-95' : 'hover:scale-105'
        }`}
      >
        🎈 말랑폭신 3D 클레이 카드
      </div>
    </div>
  );
};

/* 7. 스큐어모피즘 리얼 촉감 스위치 (Tactile Skeuomorphism) */
const StSkeuomorphismTactileDemo: React.FC = () => {
  const [on, setOn] = useState(true);
  return (
    <div className="w-full h-40 flex items-center justify-center select-none">
      <button
        onClick={() => setOn(!on)}
        style={{
          boxShadow: on
            ? 'inset 0 2px 5px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.15)'
            : '0 6px 10px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.35)',
        }}
        className={`px-6 py-3 rounded-xl border border-slate-700 bg-linear-to-b from-slate-700 to-slate-900 flex items-center gap-2.5 transition-all ${
          on ? 'translate-y-0.5' : ''
        }`}
      >
        <span
          className={`w-2.5 h-2.5 rounded-full ${
            on
              ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
              : 'bg-slate-600'
          }`}
        />
        <span className="text-xs font-mono font-bold text-slate-200">
          {on ? 'HARDWARE ON' : 'HARDWARE OFF'}
        </span>
      </button>
    </div>
  );
};

/* 8. 페이퍼 컷아웃 레이어 (Paper Cutout Collage) */
const StPaperCutoutLayerDemo: React.FC = () => {
  return (
    <div className="w-full h-40 flex items-center justify-center pt-3 select-none">
      <div className="relative w-48 h-24 flex items-center justify-center">
        <div className="absolute inset-0 rounded-xl bg-amber-400 rotate-[-4deg] shadow-md" />
        <div className="absolute inset-0 rounded-xl bg-rose-500 rotate-3 shadow-md" />
        <div className="relative z-10 w-full h-full rounded-xl bg-slate-900 border-2 border-white/80 flex flex-col items-center justify-center shadow-lg">
          <span className="text-xs font-black text-white">PAPER CUTOUT</span>
          <span className="text-[10px] text-amber-300">겹겹이 오려 붙인 종이 단차</span>
        </div>
      </div>
    </div>
  );
};

/* 9. 8비트 픽셀 아케이드 레트로 (8-Bit Pixel Retro) */
const St8BitPixelRetroDemo: React.FC = () => {
  const [coins, setCoins] = useState(99);
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center bg-slate-950 select-none">
      <button
        onClick={() => setCoins((c) => c + 1)}
        style={{ boxShadow: '4px 4px 0px #1e1b4b' }}
        className="px-4 py-2 bg-emerald-400 border-2 border-white text-slate-950 font-mono font-black text-xs active:translate-y-0.5"
      >
        👾 INSERT COIN: {coins}
      </button>
      <span className="mt-2 font-mono text-[10px] text-amber-300">PRESS START (클릭)</span>
    </div>
  );
};

/* 10. 윈도우95 클래식 데스크탑 (Win95 Classic OS) */
const StWin95RetroOsDemo: React.FC = () => {
  return (
    <div className="w-full h-40 flex items-center justify-center bg-[#008080] px-6 pt-4 select-none">
      <div
        style={{
          borderTop: '2px solid #ffffff',
          borderLeft: '2px solid #ffffff',
          borderRight: '2px solid #000000',
          borderBottom: '2px solid #000000',
        }}
        className="w-56 bg-[#c0c0c0] p-1 text-black"
      >
        <div className="bg-[#000080] text-white px-2 py-0.5 text-[10px] font-bold flex items-center justify-between">
          <span>Vibe95.exe</span>
          <span className="bg-[#c0c0c0] text-black px-1 font-mono text-[9px]">×</span>
        </div>
        <div className="p-2.5 text-center">
          <p className="text-[11px] font-bold">Classic 3D Bevel Window</p>
        </div>
      </div>
    </div>
  );
};

/* 11. CRT 브라운관 그린 터미널 (CRT Scanline Terminal) */
const StCrtScanlineTerminalDemo: React.FC = () => {
  return (
    <div className="relative w-full h-40 flex flex-col items-center justify-center bg-[#041208] overflow-hidden select-none">
      <div
        style={{
          background:
            'repeating-linear-gradient(0deg, rgba(0,0,0,0.38) 0px, rgba(0,0,0,0.38) 1px, transparent 1px, transparent 3px)',
        }}
        className="pointer-events-none absolute inset-0 z-10"
      />
      <div className="font-mono text-xs font-bold text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]">
        &gt; SYSTEM READY_
      </div>
      <span className="mt-1 font-mono text-[10px] text-emerald-600">CRT SCANLINE OVERLAY</span>
    </div>
  );
};

/* 12. 신스웨이브 선셋 그리드 (Synthwave 80s Grid) */
const StSynthwaveSunsetGridDemo: React.FC = () => {
  return (
    <div className="relative w-full h-40 flex flex-col items-center justify-end overflow-hidden bg-linear-to-b from-[#1a052e] via-[#3b0764] to-[#be185d] select-none pb-3">
      <div className="w-12 h-12 rounded-full bg-linear-to-b from-amber-300 to-rose-500 mb-2 shadow-[0_0_20px_#f43f5e]" />
      <div
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(244,114,182,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(244,114,182,0.4) 1px, transparent 1px)',
          backgroundSize: '16px 10px',
          transform: 'perspective(120px) rotateX(55deg)',
        }}
        className="w-full h-14 border-t border-pink-400"
      />
      <span className="relative z-10 text-[10px] font-mono font-black tracking-widest text-cyan-300">
        SYNTHWAVE 1984
      </span>
    </div>
  );
};

/* 13. SF 사이버네틱 HUD 프레임 (Sci-Fi Chamfered HUD) */
const StScifiHudChamferDemo: React.FC = () => {
  const chamferClip =
    'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)';
  return (
    <div className="w-full h-40 flex items-center justify-center px-6 pt-4 select-none">
      <div
        style={{ clipPath: chamferClip }}
        className="w-56 h-24 p-[1.5px] bg-cyan-400/80 shadow-[0_0_16px_rgba(34,211,238,0.25)]"
      >
        <div
          style={{ clipPath: chamferClip }}
          className="w-full h-full bg-slate-950/90 p-3.5 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-[9px] font-mono text-cyan-300">
            <span>SYS.HUD // 45° CHAMFER</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              ONLINE
            </span>
          </div>
          <div className="text-xs font-black tracking-wider text-white">
            TACTICAL FRAME UI
          </div>
        </div>
      </div>
    </div>
  );
};

/* 14. 엔지니어링 블루프린트 도면 (Architectural Blueprint) */
const StArchitectBlueprintDemo: React.FC = () => {
  return (
    <div
      style={{
        backgroundImage:
          'linear-gradient(rgba(56,189,248,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.18) 1px, transparent 1px)',
        backgroundSize: '14px 14px',
      }}
      className="w-full h-40 flex items-center justify-center bg-[#0a2540] px-6 select-none"
    >
      <div className="relative border border-dashed border-sky-300/80 px-5 py-3 text-center">
        <span className="absolute -top-2 left-2 bg-[#0a2540] px-1 text-[9px] font-mono text-sky-300">
          240px × 96px
        </span>
        <p className="font-mono text-xs font-bold text-white">CAD BLUEPRINT</p>
      </div>
    </div>
  );
};

/* 15. 스위스 국제 타이포그래피 그리드 (Swiss International Grid) */
const StSwissEditorialGridDemo: React.FC = () => {
  return (
    <div className="w-full h-40 flex items-center justify-center bg-stone-100 text-stone-950 px-6 pt-6 select-none">
      <div className="w-full h-24 border-2 border-stone-950 grid grid-cols-3">
        <div className="border-r-2 border-stone-950 bg-red-600 text-white p-2 flex flex-col justify-between">
          <span className="text-[9px] font-mono font-bold">01</span>
          <span className="text-sm font-black">SWISS</span>
        </div>
        <div className="col-span-2 p-2 flex flex-col justify-between">
          <span className="text-[9px] font-mono uppercase tracking-widest">
             Grid System 1957
          </span>
          <p className="text-xs font-black leading-tight">
            노출된 격자선과 대담한 타이포 비례
          </p>
        </div>
      </div>
    </div>
  );
};

/* 16. 코믹스 팝아트 망점 (Comic Halftone Pop-Art) */
const StComicHalftonePopDemo: React.FC = () => {
  const [bang, setBang] = useState(false);
  return (
    <div
      onClick={() => setBang(!bang)}
      style={{
        backgroundImage: 'radial-gradient(#f43f5e 1.5px, transparent 1.5px)',
        backgroundSize: '8px 8px',
      }}
      className="w-full h-40 flex items-center justify-center bg-amber-300 cursor-pointer select-none"
    >
      <div
        style={{ boxShadow: '5px 5px 0px #000' }}
        className={`px-5 py-2 bg-white border-[3px] border-black text-black font-black text-sm transition-transform ${
          bang ? 'rotate-3 scale-110' : '-rotate-3'
        }`}
      >
        {bang ? '💥 POW!!' : '💬 BAM! (클릭)'}
      </div>
    </div>
  );
};

/* ============================================================================
 * DOMAIN 5: 🎞️ 모션 영상 & 쇼릴 데모 (16종)
 * ============================================================================ */

/* 1. SaaS 프로덕트 런칭 쇼릴 (3-Scene Sequence) */
const VdSaasLaunchReelDemo: React.FC = () => {
  const [scene, setScene] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      setScene((s) => (s + 1) % 3);
    }, 1600);
    return () => clearTimeout(id);
  }, [scene]);

  return (
    <div
      onClick={() => setScene((s) => (s + 1) % 3)}
      className="w-full h-40 relative overflow-hidden flex flex-col items-center justify-center pt-5 pb-3 px-5 cursor-pointer select-none bg-linear-to-br from-slate-950 via-indigo-950/60 to-slate-950"
    >
      {scene === 0 && (
        <div className="animate-spring-pop text-center space-y-1">
          <span className="text-[9px] font-mono text-indigo-400 tracking-widest uppercase">
            SCENE 01 · INTRO
          </span>
          <div className="text-base font-black text-white tracking-tight">
            Workflow, <span className="text-indigo-400">Reimagined.</span>
          </div>
        </div>
      )}

      {scene === 1 && (
        <div className="animate-spring-pop w-48 bg-slate-900/95 border border-indigo-500/50 rounded-xl p-2.5 shadow-xl shadow-indigo-500/20 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold text-indigo-300">AI Dashboard</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded-sm bg-emerald-500/20 text-emerald-300 font-bold">
              +142%
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <div className="h-7 rounded-sm bg-indigo-500/30 border border-indigo-400/40" />
            <div className="h-7 rounded-sm bg-violet-500/30 border border-violet-400/40" />
            <div className="h-7 rounded-sm bg-cyan-500/30 border border-cyan-400/40" />
          </div>
        </div>
      )}

      {scene === 2 && (
        <div className="animate-spring-pop flex flex-col items-center gap-1.5">
          <div className="px-3.5 py-1.5 rounded-full bg-indigo-600 text-white text-xs font-black shadow-lg shadow-indigo-500/40 flex items-center gap-1.5">
            <Rocket className="w-3.5 h-3.5" />
            <span>Start Free Today ➔</span>
          </div>
          <span className="text-[9px] font-mono text-slate-400">vibe.app</span>
        </div>
      )}

      {/* 하단 씬 타임라인 인디케이터 */}
      <div className="absolute bottom-2.5 flex items-center gap-1.5">
        {[0, 1, 2].map((idx) => (
          <span
            key={idx}
            className={`h-1 rounded-full transition-all duration-300 ${
              scene === idx ? 'w-6 bg-indigo-400' : 'w-2 bg-slate-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

/* 2. 3D 디바이스 목업 투어 */
const VdDevice3DSpinDemo: React.FC = () => {
  const [front, setFront] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setFront((f) => !f);
    }, 1800);
    return () => clearTimeout(id);
  }, [front]);

  return (
    <div
      onClick={() => setFront((f) => !f)}
      className="w-full h-40 flex items-center justify-center pt-5 cursor-pointer select-none perspective-1000"
    >
      <div
        style={{
          transform: front
            ? 'rotateY(0deg) rotateX(0deg) scale(1.04)'
            : 'rotateY(-28deg) rotateX(14deg) scale(0.94)',
        }}
        className="w-36 h-24 rounded-xl bg-slate-900 border-2 border-slate-700 p-2 shadow-2xl transition-transform duration-700 preserve-3d relative"
      >
        <div className="w-8 h-1 rounded-full bg-slate-700 mx-auto mb-1.5" />
        <div className="space-y-1.5">
          <div className="h-3 w-2/3 rounded-sm bg-slate-800" />
          <div
            style={{
              transform: front ? 'translateZ(26px) scale(1.06)' : 'translateZ(0px)',
            }}
            className="p-1.5 rounded-lg bg-linear-to-r from-indigo-600 to-violet-600 text-white text-[10px] font-extrabold shadow-lg transition-transform duration-700 flex items-center justify-between"
          >
            <span>✨ 결제 승인 완료</span>
            <Check className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

/* 3. 인터랙티브 커서 줌 워크스루 */
const VdAppWalkthroughZoomDemo: React.FC = () => {
  const [step, setStep] = useState(0); // 0: 이동전, 1: 타겟 줌인+클릭, 2: 완료 후 복귀

  useEffect(() => {
    const id = setTimeout(() => {
      setStep((s) => (s + 1) % 3);
    }, 1400);
    return () => clearTimeout(id);
  }, [step]);

  return (
    <div
      onClick={() => setStep((s) => (s + 1) % 3)}
      className="w-full h-40 overflow-hidden flex items-center justify-center pt-5 cursor-pointer select-none"
    >
      <div
        style={{
          transform: step === 1 ? 'scale(1.48) translate(-16px, 4px)' : 'scale(1)',
        }}
        className="relative w-48 h-24 rounded-xl bg-slate-900 border border-slate-800 p-3 flex items-center justify-between transition-transform duration-500"
      >
        <div className="space-y-1">
          <div className="w-16 h-2 rounded-sm bg-slate-700" />
          <div className="w-12 h-2 rounded-sm bg-slate-800" />
        </div>

        <div className="relative">
          {step === 1 && (
            <span className="absolute inset-0 rounded-lg border-2 border-amber-400 animate-ping pointer-events-none" />
          )}
          <div
            className={`px-2.5 py-1.5 rounded-lg text-[10px] font-extrabold transition-all ${
              step >= 1
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/40 scale-105'
                : 'bg-indigo-600 text-white'
            }`}
          >
            {step >= 1 ? '✓ 배포됨' : 'Deploy'}
          </div>
        </div>

        {/* 가상 마우스 포인터 */}
        <div
          style={{
            transform:
              step === 0
                ? 'translate(24px, 54px)'
                : step === 1
                ? 'translate(136px, 42px) scale(0.85)'
                : 'translate(148px, 52px)',
          }}
          className="absolute left-0 top-0 pointer-events-none transition-transform duration-500 z-10"
        >
          <div className="w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-white shadow-md" />
        </div>
      </div>
    </div>
  );
};

/* 4. 멀티 스크린 스플릿 쇼릴 (3단계: 교차 진입 -> 정렬 -> 타이틀 오버레이) */
const VdSplitPromoReelDemo: React.FC = () => {
  const [stage, setStage] = useState(1); // 0: 분리 교차, 1: 3분할 정렬, 2: 타이틀 합체

  useEffect(() => {
    const id = setTimeout(() => {
      setStage((s) => (s + 1) % 3);
    }, 1300);
    return () => clearTimeout(id);
  }, [stage]);

  const cols = [
    {
      label: 'DESIGN',
      bg: 'bg-indigo-600',
      offset: stage === 0 ? '-translate-y-full' : 'translate-y-0',
    },
    {
      label: 'MOTION',
      bg: 'bg-violet-600',
      offset: stage === 0 ? 'translate-y-full' : 'translate-y-0',
    },
    {
      label: 'LAUNCH',
      bg: 'bg-cyan-600',
      offset: stage === 0 ? '-translate-y-full' : 'translate-y-0',
    },
  ];

  return (
    <div
      onClick={() => setStage((s) => (s + 1) % 3)}
      className="w-full h-40 flex items-center justify-center pt-5 px-6 cursor-pointer select-none overflow-hidden"
    >
      <div className="relative w-full h-24 grid grid-cols-3 gap-1.5 overflow-hidden rounded-xl p-1.5 bg-slate-900 border border-slate-800">
        {cols.map((c) => (
          <div
            key={c.label}
            className={`${c.bg} ${c.offset} ${
              stage === 2 ? 'opacity-0' : 'opacity-100'
            } rounded-lg flex items-center justify-center text-[10px] font-black text-white tracking-wider transition-all duration-300`}
          >
            {c.label}
          </div>
        ))}
        {stage === 2 && (
          <div className="absolute inset-0 z-10 bg-slate-950 flex flex-col items-center justify-center gap-1.5 rounded-xl border border-indigo-500/50 shadow-xl">
            <div className="animate-spring-pop flex flex-col items-center gap-1">
              <span className="px-3.5 py-1.5 rounded-full bg-indigo-600 text-white text-xs font-black tracking-tight shadow-lg flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                ALL-IN-ONE REEL
              </span>
              <span className="text-[9px] font-mono font-bold text-indigo-400 tracking-wider">
                UNIFIED MASTER CUT
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* 5. 스톰프 비트 타이포그래피 (상단 배지 가독성을 해치지 않는 16:9 와이드 프레임 내 배경 반전 + 타격 모션) */
const VdStompBeatTypoDemo: React.FC = () => {
  const beats = [
    { word: 'THINK.', bg: 'bg-slate-900 border-slate-700', text: 'text-white' },
    { word: 'BUILD.', bg: 'bg-indigo-600 border-indigo-400', text: 'text-white' },
    { word: 'SHIP.', bg: 'bg-amber-400 border-amber-300', text: 'text-slate-950' },
    { word: 'FAST ⚡', bg: 'bg-white border-white', text: 'text-slate-950' },
  ];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      setIdx((i) => (i + 1) % beats.length);
    }, 750);
    return () => clearTimeout(id);
  }, [idx, beats.length]);

  const cur = beats[idx];

  return (
    <div
      onClick={() => setIdx((i) => (i + 1) % beats.length)}
      className="w-full h-40 flex items-center justify-center pt-5 px-6 cursor-pointer select-none"
    >
      <div
        className={`w-48 h-24 rounded-xl border flex items-center justify-center overflow-hidden shadow-xl transition-colors duration-100 ${cur.bg}`}
      >
        <span
          key={cur.word}
          className={`text-2xl font-black tracking-tighter animate-stomp-hit ${cur.text}`}
        >
          {cur.word}
        </span>
      </div>
    </div>
  );
};

/* 6. 하이라이트 마커 스와이프 씬 (단방향 좌➔우 스와이프 리빌, 역방향 후진 버그 수정) */
const VdHighlightSwipeRevealDemo: React.FC = () => {
  // phase 0: 왼쪽 대기(숨김), phase 1: 마커 바가 덮음, phase 2: 오른쪽으로 빠지며 텍스트 리빌
  const [phase, setPhase] = useState(2);

  useEffect(() => {
    const delays = [120, 420, 1600];
    const id = setTimeout(() => {
      setPhase((p) => (p + 1) % 3);
    }, delays[phase]);
    return () => clearTimeout(id);
  }, [phase]);

  return (
    <div
      onClick={() => setPhase(0)}
      className="w-full h-40 flex flex-col items-center justify-center gap-2 pt-5 cursor-pointer select-none"
    >
      <div className="relative overflow-hidden rounded-lg px-4 py-1.5 bg-slate-900 border border-slate-800">
        <span
          className={`text-sm font-black tracking-tight text-white transition-opacity duration-150 ${
            phase >= 2 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          10x Faster Video Prompts
        </span>
        <div
          style={{
            transform:
              phase === 0
                ? 'translateX(-102%)'
                : phase === 1
                ? 'translateX(0%)'
                : 'translateX(102%)',
          }}
          className={`absolute inset-0 bg-linear-to-r from-indigo-500 via-fuchsia-500 to-amber-400 ${
            phase === 0 ? 'transition-none' : 'transition-transform duration-300 ease-out'
          }`}
        />
      </div>

      <div className="flex gap-1.5">
        {['#Remotion', '#AfterEffects', '#Showreel'].map((t, i) => (
          <span
            key={t}
            style={{ transitionDelay: phase === 2 ? `${i * 90}ms` : '0ms' }}
            className={`text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono transition-all duration-300 ${
              phase === 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5'
            }`}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

/* 7. 에너지틱 카운트다운 오프닝 */
const VdCountdownEnergeticIntroDemo: React.FC = () => {
  const steps = ['3', '2', '1', 'LIVE!'];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      setIdx((i) => (i + 1) % steps.length);
    }, idx === 3 ? 1300 : 800);
    return () => clearTimeout(id);
  }, [idx, steps.length]);

  const isLive = idx === 3;

  return (
    <div
      onClick={() => setIdx((i) => (i + 1) % steps.length)}
      className="w-full h-40 flex items-center justify-center pt-5 cursor-pointer select-none"
    >
      <div className="relative w-20 h-20 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-500/60 animate-orbit-spin" />
        <div
          key={`ring-${idx}`}
          className="absolute inset-1 rounded-full border border-indigo-400/50 animate-heart-ring pointer-events-none"
        />
        <div
          key={steps[idx]}
          className={`animate-spring-pop font-black ${
            isLive
              ? 'px-3 py-1 rounded-full bg-rose-500 text-white text-xs tracking-wider shadow-lg shadow-rose-500/40'
              : 'text-2xl text-white font-mono'
          }`}
        >
          {steps[idx]}
        </div>
      </div>
    </div>
  );
};

/* 8. 메신저 대화 빌드업 씬 (고정 높이 스테이지로 말풍선 추가 시 상하 점프 현상 제거) */
const VdChatStorySequenceDemo: React.FC = () => {
  const [step, setStep] = useState(2);

  useEffect(() => {
    const id = setTimeout(() => {
      setStep((s) => (s + 1) % 3);
    }, 1300);
    return () => clearTimeout(id);
  }, [step]);

  return (
    <div
      onClick={() => setStep((s) => (s + 1) % 3)}
      className="w-full h-40 flex items-center justify-center px-6 pt-5 cursor-pointer select-none"
    >
      <div className="w-full max-w-[220px] h-20 flex flex-col justify-start gap-2">
        {/* Step 0+: 사용자 질문 말풍선 (상단 고정) */}
        <div
          key={step === 0 ? 'q-pop' : 'q-stay'}
          className={`self-end px-3 py-1 rounded-2xl rounded-br-sm bg-indigo-600 text-white text-[11px] font-bold shadow-md ${
            step === 0 ? 'animate-spring-pop' : ''
          }`}
        >
          "런칭 쇼릴 영상 만들어줘"
        </div>

        {/* Step 1: 타이핑 인디케이터 */}
        {step === 1 && (
          <div className="self-start px-3 py-1.5 rounded-2xl rounded-bl-sm bg-slate-800 text-slate-300 text-[11px] font-mono flex items-center gap-1 animate-spring-pop">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" />
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:120ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:240ms]" />
          </div>
        )}

        {/* Step 2: 완성 카드 응답 */}
        {step === 2 && (
          <div className="self-start px-3 py-1.5 rounded-xl bg-slate-900 border border-emerald-500/50 text-emerald-300 text-[11px] font-bold flex items-center gap-1.5 animate-spring-pop shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>1080p 모션 시퀀스 완성!</span>
          </div>
        )}
      </div>
    </div>
  );
};

/* 9. 다이내믹 차트 성장 시퀀스 */
const VdAnimatedBarRaceDemo: React.FC = () => {
  const [active, setActive] = useState(true);
  const heights = [28, 42, 58, 76, 100];

  useEffect(() => {
    const id = setTimeout(() => {
      setActive((a) => !a);
    }, active ? 2000 : 700);
    return () => clearTimeout(id);
  }, [active]);

  return (
    <div
      onClick={() => setActive((a) => !a)}
      className="w-full h-40 flex flex-col items-center justify-end pb-4 pt-8 px-8 cursor-pointer select-none"
    >
      <div className="w-full flex items-end justify-between gap-2.5 h-24 border-b border-slate-800 px-2">
        {heights.map((h, i) => (
          <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
            {i === 4 && active && (
              <span className="mb-1 px-1.5 py-0.5 rounded-sm bg-emerald-500 text-slate-950 text-[9px] font-black animate-spring-pop whitespace-nowrap">
                +340%
              </span>
            )}
            <div
              style={{
                height: active ? `${h}%` : '12%',
                transitionDelay: active ? `${i * 75}ms` : '0ms',
              }}
              className={`w-full rounded-t-md transition-all duration-500 ${
                i === 4
                  ? 'bg-linear-to-t from-indigo-600 to-emerald-400'
                  : 'bg-slate-700'
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

/* 10. KPI 메트릭 리빌 시퀀스 (자동 재생 루프 + 실제 숫자 카운트업 롤링 구현) */
const VdKpiCounterExplosionDemo: React.FC = () => {
  const [progress, setProgress] = useState(1); // 0 ~ 1
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    let rafId = 0;
    const start = performance.now();
    const duration = 900;

    setProgress(0);
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased);
      if (p < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };
    rafId = requestAnimationFrame(tick);

    const loopTimer = setTimeout(() => {
      setCycle((c) => c + 1);
    }, 2800);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(loopTimer);
    };
  }, [cycle]);

  const metrics = [
    {
      label: 'Uptime',
      val: `${(99.9 * progress).toFixed(1)}%`,
      pct: Math.round(92 * progress),
      color: 'text-emerald-400',
    },
    {
      label: 'Speed',
      val: `${(12.4 * progress).toFixed(1)}x`,
      pct: Math.round(82 * progress),
      color: 'text-indigo-400',
    },
    {
      label: 'Latency',
      val: `${(0.18 * progress).toFixed(2)}s`,
      pct: Math.round(74 * progress),
      color: 'text-amber-400',
    },
  ];

  return (
    <div
      onClick={() => setCycle((c) => c + 1)}
      className="w-full h-40 flex items-center justify-center gap-2 px-4 pt-5 cursor-pointer select-none"
    >
      {metrics.map((m) => (
        <div
          key={m.label}
          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-2.5 shadow-md"
        >
          <div className="text-[9px] text-slate-400 font-semibold">{m.label}</div>
          <div className={`text-sm font-black font-mono mt-0.5 ${m.color}`}>
            {m.val}
          </div>
          <div className="w-full h-1 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
            <div
              style={{ width: `${m.pct}%` }}
              className="h-full bg-indigo-500 rounded-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

/* 11. 데이터 파이프라인 플로우 씬 (단방향 좌➔우 광선 패킷 이동, 역주행 버그 수정) */
const VdNodeFlowPipelineDemo: React.FC = () => {
  // step 0: Input(좌), step 1: AI Core(중), step 2: Render(우), step 3: 순간 리셋 대기
  const [step, setStep] = useState(0);
  const nodes = ['Input', 'AI Core', 'Render'];

  useEffect(() => {
    const delay = step === 3 ? 80 : 950;
    const id = setTimeout(() => {
      setStep((s) => (s + 1) % 4);
    }, delay);
    return () => clearTimeout(id);
  }, [step]);

  const activeNode = step === 3 ? 0 : step;
  const packetLeft =
    step === 0 || step === 3 ? '12%' : step === 1 ? '48%' : '82%';

  return (
    <div
      onClick={() => setStep((s) => (s + 1) % 3)}
      className="w-full h-40 flex items-center justify-center px-6 pt-5 cursor-pointer select-none"
    >
      <div className="flex items-center w-full justify-between relative">
        <div className="absolute left-6 right-6 h-0.5 bg-slate-800 top-1/2 -translate-y-1/2" />
        <div
          style={{ left: packetLeft }}
          className={`w-6 h-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/80 absolute top-1/2 -translate-y-1/2 ${
            step === 3 || step === 0
              ? 'transition-none opacity-0'
              : 'transition-all duration-500 opacity-100'
          }`}
        />

        {nodes.map((label, i) => {
          const isLit = activeNode === i;
          return (
            <div
              key={label}
              className={`relative z-10 px-3 py-2 rounded-xl border text-[10px] font-extrabold transition-all duration-300 ${
                isLit
                  ? 'bg-indigo-600 text-white border-cyan-400 shadow-lg shadow-indigo-500/40 scale-110'
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* 12. 멀티 링 게이지 인포그래픽 (자동 충전 루프 애니메이션 추가) */
const VdCircularRingDashboardDemo: React.FC = () => {
  const [filled, setFilled] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => {
      setFilled((f) => !f);
    }, filled ? 2200 : 750);
    return () => clearTimeout(id);
  }, [filled]);

  return (
    <div
      onClick={() => setFilled((f) => !f)}
      className="w-full h-40 flex items-center justify-center gap-4 pt-5 cursor-pointer select-none"
    >
      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
        {/* 외곽 링 */}
        <circle cx="40" cy="40" r="32" stroke="#1e293b" strokeWidth="6" fill="none" />
        <circle
          cx="40"
          cy="40"
          r="32"
          stroke="#6366f1"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="201"
          strokeDashoffset={filled ? '24' : '201'}
          className="transition-all duration-700"
        />
        {/* 중간 링 */}
        <circle cx="40" cy="40" r="23" stroke="#1e293b" strokeWidth="6" fill="none" />
        <circle
          cx="40"
          cy="40"
          r="23"
          stroke="#10b981"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="145"
          strokeDashoffset={filled ? '32' : '145'}
          className="transition-all duration-700 delay-75"
        />
        {/* 내부 링 */}
        <circle cx="40" cy="40" r="14" stroke="#1e293b" strokeWidth="6" fill="none" />
        <circle
          cx="40"
          cy="40"
          r="14"
          stroke="#f59e0b"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="88"
          strokeDashoffset={filled ? '28' : '88'}
          className="transition-all duration-700 delay-150"
        />
      </svg>

      <div className="space-y-1 text-[10px] font-mono">
        <div className="text-indigo-400 font-bold">
          ● Reach {filled ? '88%' : '0%'}
        </div>
        <div className="text-emerald-400 font-bold">
          ● Conv {filled ? '78%' : '0%'}
        </div>
        <div className="text-amber-400 font-bold">
          ● Ret {filled ? '68%' : '0%'}
        </div>
      </div>
    </div>
  );
};

/* 13. 모던 로어써드 방송 자막 (Broadcast Lower Third) */
const VdLowerThirdBannerDemo: React.FC = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => {
      setVisible((v) => !v);
    }, visible ? 2200 : 850);
    return () => clearTimeout(id);
  }, [visible]);

  return (
    <div
      onClick={() => setVisible((v) => !v)}
      className="w-full h-40 flex items-end justify-start pb-5 pl-6 pt-6 cursor-pointer select-none bg-linear-to-tr from-slate-950 via-slate-900 to-slate-950"
    >
      <div className="flex items-stretch gap-2">
        <div
          className={`w-1.5 rounded-full bg-indigo-500 transition-transform duration-300 origin-bottom ${
            visible ? 'scale-y-100' : 'scale-y-0'
          }`}
        />
        <div className="overflow-hidden space-y-1">
          <div
            className={`px-3 py-1 bg-white text-slate-950 text-xs font-black tracking-tight rounded-r-lg transition-transform duration-500 ${
              visible ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            ALEX KIM · Product Lead
          </div>
          <div
            className={`px-2.5 py-0.5 bg-indigo-600 text-white text-[10px] font-bold rounded-r-md w-fit transition-transform duration-500 delay-100 ${
              visible ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            KEYNOTE 2026 LIVE
          </div>
        </div>
      </div>
    </div>
  );
};

/* 14. 다이어고널 멀티 와이프 전환 (3겹 슬라이스 + 역방향 복귀 시 transition-none 처리 + 자동 전환) */
const VdDiagonalShutterWipeDemo: React.FC = () => {
  const [sceneB, setSceneB] = useState(false);
  // phase: 'idle' (좌측 대기, transition-none) | 'wiping' (우측 끝으로 이동, transition-transform)
  const [phase, setPhase] = useState<'idle' | 'wiping'>('idle');
  const timersRef = useRef<number[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
  };

  const triggerWipe = useCallback(() => {
    clearTimers();
    setPhase('wiping');
    const t1 = window.setTimeout(() => setSceneB((b) => !b), 280);
    const t2 = window.setTimeout(() => setPhase('idle'), 720);
    timersRef.current.push(t1, t2);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      triggerWipe();
    }, 2600);
    return () => {
      window.clearInterval(interval);
      clearTimers();
    };
  }, [triggerWipe]);

  const layers = [
    { color: 'bg-indigo-600', delay: '0ms' },
    { color: 'bg-fuchsia-500', delay: '70ms' },
    { color: 'bg-cyan-400', delay: '140ms' },
  ];

  return (
    <div
      onClick={triggerWipe}
      className={`w-full h-40 relative overflow-hidden flex items-center justify-center pt-5 cursor-pointer select-none transition-colors ${
        sceneB ? 'bg-indigo-950/80' : 'bg-slate-950'
      }`}
    >
      <div className="text-center">
        <span className="text-[10px] font-mono text-indigo-400 block">
          {sceneB ? 'SCENE 02 · ON AIR' : 'SCENE 01 · INTRO'}
        </span>
        <span className="text-sm font-black text-white">
          {sceneB ? '🚀 NEXT CHAPTER' : '🎬 STINGER WIPE'}
        </span>
      </div>

      {/* 3겹 대각선 와이프 슬라이스 (복귀 시 transition-none으로 역방향 후진 방지) */}
      {layers.map((layer) => (
        <div
          key={layer.color}
          style={{
            transform:
              phase === 'wiping'
                ? 'translateX(150%) skewX(-18deg)'
                : 'translateX(-150%) skewX(-18deg)',
            transitionDelay: phase === 'wiping' ? layer.delay : '0ms',
          }}
          className={`absolute inset-y-0 -left-12 w-full ${layer.color} pointer-events-none ${
            phase === 'wiping' ? 'transition-transform duration-500 ease-in-out' : 'transition-none'
          }`}
        />
      ))}
    </div>
  );
};

/* 15. 네온 로고 스팅어 아웃트로 (광선 충돌 ➔ 충격파 링 ➔ 로고 & 자간 확장 3단계 시퀀스) */
const VdLogoStingerOutroDemo: React.FC = () => {
  const [stage, setStage] = useState(2); // 0: 좌우 광선 진입, 1: 충돌 쇼크웨이브, 2: 로고 완성

  useEffect(() => {
    const delays = [450, 500, 1800];
    const id = setTimeout(() => {
      setStage((s) => (s + 1) % 3);
    }, delays[stage]);
    return () => clearTimeout(id);
  }, [stage]);

  return (
    <div
      onClick={() => setStage(0)}
      className="w-full h-40 relative overflow-hidden flex flex-col items-center justify-center pt-5 cursor-pointer select-none"
    >
      {/* Stage 0: 좌우에서 중앙으로 날아오는 네온 광선 */}
      <div
        style={{
          transform: stage === 0 ? 'translateX(-42px) scaleX(1)' : 'translateX(0px) scaleX(0.2)',
          opacity: stage === 0 ? 1 : 0,
        }}
        className="absolute h-1 w-20 rounded-full bg-linear-to-r from-transparent to-cyan-400 transition-all duration-300 pointer-events-none"
      />
      <div
        style={{
          transform: stage === 0 ? 'translateX(42px) scaleX(1)' : 'translateX(0px) scaleX(0.2)',
          opacity: stage === 0 ? 1 : 0,
        }}
        className="absolute h-1 w-20 rounded-full bg-linear-to-l from-transparent to-fuchsia-400 transition-all duration-300 pointer-events-none"
      />

      {/* Stage 1: 중앙 충돌 쇼크웨이브 링 */}
      {stage >= 1 && (
        <div
          key={`wave-${stage}`}
          className="absolute w-14 h-14 rounded-full border-2 border-cyan-400/80 animate-heart-ring pointer-events-none"
        />
      )}

      {/* Stage 1~2: 중앙 로고 리빌 및 자간 확장 */}
      <div
        className={`relative z-10 flex flex-col items-center gap-1.5 transition-all duration-500 ${
          stage >= 1 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}
      >
        <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-xl shadow-indigo-500/40 border border-white/20">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <span
          className={`text-[10px] font-black text-white uppercase transition-all duration-500 ${
            stage === 2 ? 'tracking-[0.26em]' : 'tracking-tight'
          }`}
        >
          VIBE STUDIO
        </span>
      </div>
    </div>
  );
};

/* 16. 오디오 스펙트럼 비주얼라이저 (실제 주파수 바 상하 율동 + 실시간 재생 타임코드 진행) */
const VdAudioSpectrumVisualizerDemo: React.FC = () => {
  const [playing, setPlaying] = useState(true);
  const [seconds, setSeconds] = useState(84);
  const bars = [45, 75, 95, 60, 85, 100, 70, 50, 90, 100, 65, 80, 55, 78, 60, 42];

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setSeconds((s) => (s >= 225 ? 0 : s + 1));
    }, 1000);
    return () => clearInterval(id);
  }, [playing]);

  const fmt = (sec: number) => {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div
      onClick={() => setPlaying((p) => !p)}
      className="w-full h-40 flex flex-col items-center justify-center gap-2.5 pt-6 px-6 cursor-pointer select-none"
    >
      <div className="flex items-end justify-center gap-1 h-14 w-full max-w-[190px]">
        {bars.map((h, i) => (
          <div
            key={i}
            style={{
              height: `${h}%`,
              animationDelay: `${(i % 5) * 130}ms`,
              animationDuration: `${650 + (i % 4) * 140}ms`,
              animationPlayState: playing ? 'running' : 'paused',
            }}
            className={`flex-1 rounded-full bg-linear-to-t from-indigo-600 via-violet-500 to-cyan-400 origin-bottom animate-spectrum-bar transition-opacity duration-200 ${
              playing ? 'opacity-100' : 'opacity-70'
            }`}
          />
        ))}
      </div>

      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
        <span
          className={`px-1.5 py-0.5 rounded font-bold ${
            playing
              ? 'bg-rose-500/20 text-rose-400'
              : 'bg-slate-800 text-slate-400'
          }`}
        >
          {playing ? '● AUDIO ON' : '❚❚ PAUSED'}
        </span>
        <span>{fmt(seconds)} / 03:45</span>
      </div>
    </div>
  );
};

/* ============================================================================
 * EXPANDED DEMOS (+20종: 각 도메인별 4종 추가)
 * ============================================================================ */

/* [UI +1] 구이 플로팅 액션 버튼 (Spring Speed-Dial FAB) */
const GooeyMenuFabDemo: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const actions = [
    { id: 'rocket', label: '런칭', icon: Rocket, dx: -52, dy: -18, color: 'from-indigo-500 to-blue-500' },
    { id: 'sparkles', label: 'AI 생성', icon: Sparkles, dx: 0, dy: -48, color: 'from-violet-500 to-fuchsia-500' },
    { id: 'flame', label: '부스트', icon: Flame, dx: 52, dy: -18, color: 'from-amber-500 to-rose-500' },
  ];

  return (
    <div className="w-full h-40 flex flex-col items-center justify-end pb-2.5 pt-7 select-none relative">
      {/* 메인 버튼(반지름 20px)과 서브 버튼(반지름 17px)의 중심점을 동일하게 맞춘 컨테이너 */}
      <div className="relative flex items-end justify-center h-[88px] w-48 pb-0.5">
        {actions.map((act, idx) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              type="button"
              onClick={() => setSelected(act.label)}
              style={{
                transform: open
                  ? `translate(${act.dx}px, ${act.dy}px) scale(1)`
                  : 'translate(0px, 0px) scale(0.3)',
                transitionDelay: open ? `${idx * 45}ms` : '0ms',
              }}
              className={`absolute bottom-[5px] w-[34px] h-[34px] rounded-full bg-linear-to-br ${act.color} text-white flex items-center justify-center shadow-lg border border-white/25 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer ${
                open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
              title={act.label}
            >
              <Icon className="w-3.5 h-3.5" />
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label="플로팅 메뉴 열기/닫기"
          className="relative z-10 w-10 h-10 rounded-full bg-linear-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center shadow-xl shadow-indigo-500/40 border border-white/25 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] active:scale-90 cursor-pointer"
        >
          <svg
            viewBox="0 0 20 20"
            className={`w-4 h-4 stroke-current stroke-[2.4] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              open ? 'rotate-45' : 'rotate-0'
            }`}
          >
            <line x1="10" y1="3.5" x2="10" y2="16.5" strokeLinecap="round" />
            <line x1="3.5" y1="10" x2="16.5" y2="10" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <span className="mt-1 text-[10px] font-medium text-slate-400">
        {selected ? `${selected} 액션 선택됨 ✨` : open ? '아이콘 또는 × 버튼을 눌러보세요' : '+ 버튼을 눌러 메뉴 펼치기'}
      </span>
    </div>
  );
};

/* [UI +2] OTP 핀 코드 바운스 인풋 */
const OtpPinFocusBounceDemo: React.FC = () => {
  const [digits, setDigits] = useState<string[]>(['4', '8', '2', '9', '', '']);
  const [activeIdx, setActiveIdx] = useState<number>(4);
  const [bounceIdx, setBounceIdx] = useState<number | null>(null);
  const timersRef = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const handleDigitClick = (idx: number) => {
    clearTimers();
    const nextNum = String(Math.floor(Math.random() * 9) + 1);
    setDigits((prev) => {
      const copy = [...prev];
      copy[idx] = nextNum;
      return copy;
    });
    setBounceIdx(idx);
    setActiveIdx(Math.min(5, idx + 1));
    const tid = window.setTimeout(() => setBounceIdx(null), 260);
    timersRef.current.push(tid);
  };

  const handleAutoFill = () => {
    clearTimers();
    const pool = ['7', '3', '9', '1', '5', '8'];
    setDigits(['', '', '', '', '', '']);
    setActiveIdx(0);
    pool.forEach((d, i) => {
      const tid = window.setTimeout(() => {
        setDigits((prev) => {
          const copy = [...prev];
          copy[i] = d;
          return copy;
        });
        setActiveIdx(Math.min(5, i + 1));
        setBounceIdx(i);
      }, i * 110);
      timersRef.current.push(tid);
    });
    const endTid = window.setTimeout(() => setBounceIdx(null), pool.length * 110 + 240);
    timersRef.current.push(endTid);
  };

  const isComplete = digits.every((d) => d !== '');

  return (
    <div className="w-full h-40 flex flex-col items-center justify-center gap-2.5 pt-6 px-4 select-none">
      <div className="flex items-center gap-1.5">
        {digits.map((d, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleDigitClick(i)}
            className={`w-7 h-9 rounded-lg font-mono text-xs font-black flex items-center justify-center border transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer ${
              bounceIdx === i ? 'scale-125 -translate-y-1' : 'scale-100 translate-y-0'
            } ${
              isComplete
                ? 'bg-emerald-500/15 border-emerald-400/70 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                : activeIdx === i
                  ? 'bg-indigo-500/20 border-indigo-400 text-white ring-2 ring-indigo-500/30'
                  : d
                    ? 'bg-slate-800/90 border-slate-600 text-slate-100'
                    : 'bg-slate-900/80 border-slate-700/80 text-slate-500'
            }`}
          >
            {d || '·'}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-[10px] font-semibold ${isComplete ? 'text-emerald-500 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}`}>
          {isComplete ? '✓ 6자리 인증 완료!' : '칸을 누르거나 연속 입력을 실행하세요'}
        </span>
        <button
          type="button"
          onClick={handleAutoFill}
          className="px-2 py-0.5 rounded-sm bg-indigo-50 hover:bg-indigo-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-[9px] font-bold text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-slate-700 cursor-pointer transition-colors"
        >
          연속 입력 재생
        </button>
      </div>
    </div>
  );
};

/* [UI +3] 홀드 투 컨펌 (Hold-to-Confirm Progress Button) */
const HoldToConfirmRingDemo: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [holding, setHolding] = useState(false);

  useEffect(() => {
    if (!holding || confirmed) return;
    const id = setInterval(() => {
      setProgress((p) => Math.min(100, p + 5));
    }, 35);
    return () => clearInterval(id);
  }, [holding, confirmed]);

  useEffect(() => {
    if (progress >= 100 && !confirmed) {
      setConfirmed(true);
      setHolding(false);
    }
  }, [progress, confirmed]);

  useEffect(() => {
    if (holding || confirmed || progress === 0) return;
    const id = setInterval(() => {
      setProgress((p) => Math.max(0, p - 10));
    }, 25);
    return () => clearInterval(id);
  }, [holding, confirmed, progress]);

  const reset = () => {
    setConfirmed(false);
    setProgress(0);
    setHolding(false);
  };

  return (
    <div className="w-full h-40 flex flex-col items-center justify-center gap-2.5 pt-6 select-none">
      {confirmed ? (
        <button
          type="button"
          onClick={reset}
          className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-400/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 animate-spring-pop cursor-pointer"
        >
          <Check className="w-3.5 h-3.5" /> 배포 승인 완료 (초기화)
        </button>
      ) : (
        <button
          type="button"
          onPointerDown={() => setHolding(true)}
          onPointerUp={() => setHolding(false)}
          onPointerLeave={() => setHolding(false)}
          className={`relative overflow-hidden px-4 py-2 rounded-xl border text-xs font-bold transition-transform duration-150 cursor-pointer ${
            holding
              ? 'scale-95 border-rose-400 text-white shadow-lg shadow-rose-500/25'
              : 'scale-100 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 hover:border-rose-400 dark:hover:border-rose-500/50 shadow-xs'
          }`}
        >
          <span
            style={{ width: `${progress}%` }}
            className="absolute inset-y-0 left-0 bg-linear-to-r from-rose-600 via-amber-500 to-emerald-500 transition-[width] duration-75"
          />
          <span className="relative z-10 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            {holding ? `길게 누르는 중... ${progress}%` : '길게 눌러 프로덕션 배포'}
          </span>
        </button>
      )}
      <span className="text-[10px] text-slate-400">
        {confirmed ? '클릭하면 다시 테스트할 수 있습니다' : '버튼을 꾹 누르고 있으면 게이지가 차오릅니다'}
      </span>
    </div>
  );
};

/* [UI +4] 스포트라이트 패스워드 피크 (Flashlight Password Peek) */
const PeekPasswordLampDemo: React.FC = () => {
  const [lampOn, setLampOn] = useState(true);
  const secret = 'Vibe#2026!';

  return (
    <div className="w-full h-40 flex flex-col items-center justify-center gap-2.5 pt-6 px-6 select-none">
      <div className="relative w-full max-w-[215px] h-10 rounded-xl bg-slate-950 border border-slate-700/80 flex items-center px-3 overflow-hidden shadow-inner">
        {/* 손전등 원뿔형 빛줄기 오버레이 */}
        <div
          style={{
            clipPath: 'polygon(100% 50%, 0% -18%, 0% 118%)',
          }}
          className={`absolute inset-y-0 left-2 right-9 bg-linear-to-l from-amber-300/40 via-amber-200/15 to-transparent pointer-events-none transition-all duration-300 origin-right ${
            lampOn ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}
        />

        <div className="relative z-10 flex items-center justify-between w-full">
          <div className="flex items-center font-mono text-xs font-bold">
            {secret.split('').map((ch, idx) => (
              <span
                key={idx}
                style={{ transitionDelay: `${(secret.length - 1 - idx) * 18}ms` }}
                className={`inline-block w-[11px] text-center transition-all duration-200 ${
                  lampOn
                    ? 'text-amber-200 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]'
                    : 'text-slate-500'
                }`}
              >
                {lampOn ? ch : '•'}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setLampOn((v) => !v)}
            className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-bold transition-all cursor-pointer ${
              lampOn
                ? 'bg-amber-400 text-slate-950 shadow-[0_0_12px_rgba(251,191,36,0.8)]'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
            title="손전등 토글"
          >
            🔦
          </button>
        </div>
      </div>
      <span className="text-[10px] text-slate-400">
        우측 손전등(🔦)을 눌러 비밀번호 조명을 켜고 꺼보세요
      </span>
    </div>
  );
};

/* [그래픽 +1] 소나 레이더 스윕 스캐너 (Sonar Radar Sweep Scanner) */
const MgRadarSonarSweepDemo: React.FC = () => {
  const [angle, setAngle] = useState(0);
  const [fast, setFast] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setAngle((a) => (a + (fast ? 10 : 6)) % 360);
    }, 40);
    return () => clearInterval(id);
  }, [fast]);

  const blips = [
    { x: 68, y: 28, deg: 45 },
    { x: 74, y: 70, deg: 135 },
    { x: 26, y: 66, deg: 220 },
  ];

  return (
    <div
      onClick={() => setFast((f) => !f)}
      className="w-full h-40 flex items-center justify-center pt-5 cursor-pointer select-none"
    >
      <div className="relative w-24 h-24 rounded-full bg-emerald-950/60 border border-emerald-500/45 overflow-hidden flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.18)]">
        {/* 동심원 & 십자선 */}
        <div className="absolute w-16 h-16 rounded-full border border-emerald-500/25 pointer-events-none" />
        <div className="absolute w-8 h-8 rounded-full border border-emerald-500/25 pointer-events-none" />
        <div className="absolute inset-x-0 h-px bg-emerald-500/20 pointer-events-none" />
        <div className="absolute inset-y-0 w-px bg-emerald-500/20 pointer-events-none" />

        {/* 회전 스캔 콘 + 리딩 레이저 라인 */}
        <div
          style={{
            transform: `rotate(${angle}deg)`,
            background: 'conic-gradient(from 0deg, transparent 70%, rgba(16, 185, 129, 0.55) 100%)',
          }}
          className="absolute inset-0 rounded-full pointer-events-none"
        >
          <div className="absolute left-1/2 top-0 w-0.5 h-1/2 -translate-x-1/2 bg-emerald-300 shadow-[0_0_8px_#6ee7b7]" />
        </div>

        {/* 탐지 타겟 블립 */}
        {blips.map((b, i) => {
          const diff = (angle - b.deg + 360) % 360;
          const active = diff < 105;
          return (
            <span
              key={i}
              style={{ left: `${b.x}%`, top: `${b.y}%` }}
              className={`absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-150 ${
                active
                  ? 'bg-emerald-300 scale-125 shadow-[0_0_8px_#34d399]'
                  : 'bg-emerald-500/25 scale-75'
              }`}
            />
          );
        })}

        <div className="w-1.5 h-1.5 rounded-full bg-emerald-300 shadow-[0_0_6px_#34d399] z-10" />
      </div>
    </div>
  );
};

/* [그래픽 +2] 스태거드 그리드 타일 웨이브 (Staggered Grid Tile Wave) */
const MgMorphingGridWaveDemo: React.FC = () => {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setTick((t) => (t + 1) % 8);
    }, 260);
    return () => clearInterval(id);
  }, []);

  const rows = 3;
  const cols = 6;

  return (
    <div
      onClick={() => setTick((t) => (t + 1) % 8)}
      className="w-full h-40 flex flex-col items-center justify-center gap-2 pt-5 cursor-pointer select-none"
    >
      <div className="grid grid-cols-6 gap-1.5">
        {Array.from({ length: rows * cols }).map((_, idx) => {
          const r = Math.floor(idx / cols);
          const c = idx % cols;
          const diag = r + c;
          const isWavePeak = diag === tick || diag === (tick + 1) % 8;
          return (
            <div
              key={idx}
              className={`w-5 h-5 rounded-md transition-all duration-300 ${
                isWavePeak
                  ? 'bg-linear-to-br from-cyan-400 to-indigo-500 scale-110 -translate-y-1 shadow-[0_0_10px_rgba(34,211,238,0.5)]'
                  : 'bg-slate-800/80 border border-slate-700/60 scale-90 opacity-60'
              }`}
            />
          );
        })}
      </div>
      <span className="text-[9px] font-mono text-cyan-300/80">DIAGONAL WAVE (ROW + COL)</span>
    </div>
  );
};

/* [그래픽 +3] 프리즘 광선 분산 효과 (Optical Prism Light Dispersion) */
const MgPrismRainbowRefractionDemo: React.FC = () => {
  const [wide, setWide] = useState(true);
  const spectrum = [
    { color: '#f43f5e', yEnd: 18 },
    { color: '#fbbf24', yEnd: 30 },
    { color: '#34d399', yEnd: 42 },
    { color: '#22d3ee', yEnd: 54 },
    { color: '#818cf8', yEnd: 66 },
    { color: '#e879f9', yEnd: 78 },
  ];

  return (
    <div
      onClick={() => setWide((w) => !w)}
      className="w-full h-40 flex flex-col items-center justify-center pt-5 px-4 cursor-pointer select-none"
    >
      <svg viewBox="0 0 220 92" className="w-full max-w-[220px] h-24 overflow-visible">
        <defs>
          <linearGradient id="prismGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.38)" />
            <stop offset="50%" stopColor="rgba(56,189,248,0.18)" />
            <stop offset="100%" stopColor="rgba(99,102,241,0.32)" />
          </linearGradient>
        </defs>

        {/* 좌측 백색 입사 광선 (좌하단 ➔ 프리즘 좌측 빗변) */}
        <line
          x1="8"
          y1="62"
          x2="92"
          y2="46"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
          className="drop-shadow-[0_0_6px_#ffffff]"
        />

        {/* 프리즘 내부 굴절 브릿지 광선 */}
        <polygon
          points="92,46 126,38 130,56"
          fill="rgba(255,255,255,0.35)"
        />

        {/* 우측 6색 무지개 스펙트럼 분산 빔 */}
        {spectrum.map((ray, i) => {
          const targetY = wide ? ray.yEnd : 48 + (ray.yEnd - 48) * 0.45;
          return (
            <line
              key={i}
              x1="127"
              y1={42 + i * 2.2}
              x2="212"
              y2={targetY}
              stroke={ray.color}
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeOpacity="0.9"
              className="transition-all duration-500"
              style={{ filter: `drop-shadow(0 0 5px ${ray.color})` }}
            />
          );
        })}

        {/* 중앙 삼각 유리 프리즘 (세 변 모두 선명한 유리 테두리 렌더링) */}
        <polygon
          points="110,12 76,78 144,78"
          fill="url(#prismGlassGrad)"
          stroke="rgba(255,255,255,0.65)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

/* [그래픽 +4] 뉴턴의 요람 물리 진자 (Newton's Cradle Momentum Pendulum) */
const MgGravityNewtonCradleDemo: React.FC = () => {
  // 0: 좌측 스윙 아웃 -> 1: 중앙 충돌 -> 2: 우측 스윙 아웃 -> 3: 중앙 충돌
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => ((s + 1) % 4) as 0 | 1 | 2 | 3);
    }, 320);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      onClick={() => setStep((s) => ((s + 1) % 4) as 0 | 1 | 2 | 3)}
      className="w-full h-40 flex flex-col items-center justify-center pt-5 cursor-pointer select-none"
    >
      {/* 상단 고정 지지대 */}
      <div className="w-28 h-1 rounded-full bg-slate-600 shadow-sm" />
      <div className="flex items-start justify-center">
        {[0, 1, 2, 3, 4].map((i) => {
          const isLeft = i === 0;
          const isRight = i === 4;
          const deg = isLeft && step === 0 ? 34 : isRight && step === 2 ? -34 : 0;
          const isSwingingOut = (isLeft && step === 0) || (isRight && step === 2);

          return (
            <div
              key={i}
              style={{
                transform: `rotate(${deg}deg)`,
                transformOrigin: 'top center',
                transitionTimingFunction: isSwingingOut
                  ? 'cubic-bezier(0.215, 0.61, 0.355, 1)'
                  : 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
              }}
              className="flex flex-col items-center transition-transform duration-300"
            >
              <div className="w-px h-10 bg-slate-500/80" />
              <div
                className={`w-4 h-4 rounded-full bg-linear-to-br transition-shadow duration-200 ${
                  isSwingingOut
                    ? 'from-cyan-300 via-indigo-400 to-slate-700 shadow-[0_0_10px_rgba(56,189,248,0.65)]'
                    : 'from-slate-200 via-slate-400 to-slate-700'
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* [레이아웃 +1] 스크롤스파이 플로팅 목차 (Scrollspy Floating TOC) */
const LyFloatingTocSpyDemo: React.FC = () => {
  const [activeSec, setActiveSec] = useState(0);
  const sections = [
    { title: '1. 개요', desc: '아키텍처 핵심 레이어 구조' },
    { title: '2. 설치', desc: '패키지 및 환경변수 세팅' },
    { title: '3. 배포', desc: '엣지 네트워크 무중단 배포' },
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setActiveSec((s) => (s + 1) % sections.length);
    }, 1800);
    return () => clearInterval(id);
  }, [sections.length]);

  return (
    <div className="w-full h-40 flex items-center justify-center pt-5 px-4 select-none">
      <div className="w-full max-w-[230px] h-24 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 p-2.5 flex items-center gap-2.5 shadow-xs">
        {/* 좌측 스크롤 연동 문서 뷰포트 */}
        <div className="flex-1 h-full bg-slate-50 dark:bg-slate-950/80 rounded-lg border border-slate-200/80 dark:border-slate-800 overflow-hidden relative">
          <div
            style={{ transform: `translateY(-${activeSec * 100}%)` }}
            className="h-full transition-transform duration-500 ease-out"
          >
            {sections.map((sec, idx) => (
              <div key={sec.title} className="h-full p-2 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-indigo-700 dark:text-indigo-300">{sec.title}</span>
                  <span className="text-[8px] font-mono text-slate-400 dark:text-slate-500">0{idx + 1}/03</span>
                </div>
                <p className="text-[9px] text-slate-700 dark:text-slate-300 leading-tight">{sec.desc}</p>
                <div className="w-full h-1 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div
                    style={{ width: `${((idx + 1) / sections.length) * 100}%` }}
                    className="h-full bg-indigo-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 우측 Sticky Scrollspy TOC (정확한 22px 행 높이 동기화) */}
        <div className="w-20 relative pl-2.5 border-l border-slate-200 dark:border-slate-800 flex flex-col">
          <div
            style={{ transform: `translateY(${activeSec * 22}px)` }}
            className="absolute left-[-1.5px] top-[3px] w-0.5 h-4 bg-indigo-500 rounded-full transition-transform duration-300 shadow-[0_0_6px_#818cf8]"
          />
          {sections.map((sec, idx) => (
            <button
              key={sec.title}
              type="button"
              onClick={() => setActiveSec(idx)}
              className={`h-[22px] flex items-center text-left text-[9px] truncate transition-colors cursor-pointer ${
                activeSec === idx
                  ? 'text-indigo-600 dark:text-indigo-300 font-bold'
                  : 'text-slate-600 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-slate-300'
              }`}
            >
              {sec.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* [레이아웃 +2] 접이식 미니 레일 사이드바 (Collapsible Icon-Rail Sidebar) */
const LyCollapsibleRailSidebarDemo: React.FC = () => {
  const [expanded, setExpanded] = useState(true);
  const [activeNav, setActiveNav] = useState(0);
  const navs = [
    { icon: '🏠', label: '대시보드' },
    { icon: '📊', label: '애널리틱스' },
    { icon: '⚡', label: '자동화 워크' },
  ];

  return (
    <div className="w-full h-40 flex items-center justify-center pt-5 px-4 select-none">
      <div className="w-full max-w-[230px] h-24 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 overflow-hidden flex shadow-xs">
        {/* 접이식 레일 사이드바 */}
        <div
          className={`h-full bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 p-1.5 flex flex-col justify-between transition-[width] duration-300 ${
            expanded ? 'w-28' : 'w-9'
          }`}
        >
          <div className="space-y-1">
            {navs.map((item, idx) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setActiveNav(idx)}
                className={`w-full h-5 rounded-md flex items-center gap-1.5 px-1.5 text-[9px] transition-colors cursor-pointer ${
                  activeNav === idx
                    ? 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/70 dark:hover:bg-slate-900'
                }`}
              >
                <span className="shrink-0 text-[10px]">{item.icon}</span>
                {expanded && <span className="truncate">{item.label}</span>}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="w-full h-4 rounded-sm bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-[8px] font-mono text-slate-600 dark:text-slate-400 flex items-center justify-center cursor-pointer border border-slate-200/80 dark:border-transparent transition-colors"
          >
            {expanded ? '« 레일 축소' : '»'}
          </button>
        </div>

        {/* 우측 메인 콘텐츠 */}
        <div className="flex-1 p-2.5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-900 dark:text-white">{navs[activeNav].label}</span>
            <span className="text-[8px] px-1.5 py-0.5 rounded-sm bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 font-mono border border-indigo-100 dark:border-transparent">
              {expanded ? '220px' : '56px'}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="h-9 rounded-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 p-1.5">
              <div className="w-8 h-1.5 rounded-sm bg-indigo-500/60 mb-1" />
              <div className="w-12 h-2 rounded-sm bg-slate-300 dark:bg-slate-600/60" />
            </div>
            <div className="h-9 rounded-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 p-1.5">
              <div className="w-8 h-1.5 rounded-sm bg-emerald-500/60 mb-1" />
              <div className="w-10 h-2 rounded-sm bg-slate-300 dark:bg-slate-600/60" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* [레이아웃 +3] 드릴다운 브레드크럼 파인더 (Drill-Down Breadcrumb Explorer) */
const LyBreadcrumbFolderDrillDemo: React.FC = () => {
  const [path, setPath] = useState<string[]>(['root', 'src', 'ui']);
  const [selectedFile, setSelectedFile] = useState<string>('Button.tsx');

  const folderMap: Record<string, string[]> = {
    root: ['src/', 'public/', 'README.md'],
    src: ['ui/', 'hooks/', 'App.tsx'],
    public: ['logo.svg', 'favicon.svg', 'robots.txt'],
    ui: ['Button.tsx', 'Modal.tsx', 'Card.tsx'],
    hooks: ['useTheme.ts', 'useToast.ts', 'index.ts'],
  };

  const currentFolder = path[path.length - 1];
  const currentItems = folderMap[currentFolder] || folderMap.root;

  return (
    <div className="w-full h-40 flex items-center justify-center pt-5 px-4 select-none">
      <div className="w-full max-w-[230px] h-24 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 p-2.5 flex flex-col justify-between shadow-xs">
        {/* 상단 브레드크럼 경로 바 */}
        <div className="flex items-center justify-between gap-1 text-[9px] font-mono bg-slate-50 dark:bg-slate-950 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-0.5 truncate">
            {path.map((seg, idx) => (
              <React.Fragment key={`${seg}-${idx}`}>
                {idx > 0 && <span className="text-slate-400 dark:text-slate-600">/</span>}
                <button
                  type="button"
                  onClick={() => setPath((prev) => prev.slice(0, idx + 1))}
                  className={`px-1 rounded transition-colors cursor-pointer ${
                    idx === path.length - 1
                      ? 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white'
                  }`}
                >
                  {seg}
                </button>
              </React.Fragment>
            ))}
          </div>
          <span className="text-[8px] text-emerald-600 dark:text-emerald-400 font-bold truncate max-w-[64px]">{selectedFile}</span>
        </div>

        {/* 하단 현재 계층 아이템 목록 (모든 폴더·파일 클릭 반응) */}
        <div className="grid grid-cols-3 gap-1.5">
          {currentItems.map((item) => {
            const isFolder = item.endsWith('/');
            const cleanName = item.replace(/\/$/, '');
            const isSelected = !isFolder && selectedFile === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => {
                  if (isFolder) {
                    setPath((prev) => [...prev, cleanName]);
                  } else {
                    setSelectedFile(item);
                  }
                }}
                className={`h-10 rounded-lg border flex flex-col items-center justify-center gap-0.5 text-[9px] transition-all active:scale-95 cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-50 border-indigo-400 text-indigo-700 dark:bg-indigo-500/20 dark:border-indigo-400/70 dark:text-indigo-200 font-bold shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 dark:bg-slate-800/80 dark:hover:bg-slate-800 dark:border-slate-700/60 dark:text-slate-200'
                }`}
              >
                <span className="text-[11px]">{isFolder ? '📁' : '📄'}</span>
                <span className="truncate max-w-[58px]">{item}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* [레이아웃 +4] 리사이저블 스플릿 패인 (Resizable Dual Split Pane) */
const LyResizableSplitPaneDemo: React.FC = () => {
  const [leftRatio, setLeftRatio] = useState(45);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pct = ((clientX - rect.left) / rect.width) * 100;
      setLeftRatio(Math.min(75, Math.max(25, Math.round(pct))));
    },
    []
  );

  return (
    <div className="w-full h-40 flex flex-col items-center justify-center gap-1.5 pt-5 px-4 select-none">
      <div
        ref={containerRef}
        onPointerMove={(e) => {
          if (dragging) handleMove(e.clientX);
        }}
        onPointerUp={() => setDragging(false)}
        onPointerLeave={() => setDragging(false)}
        className="w-full max-w-[230px] h-20 rounded-xl bg-slate-900 border border-slate-700/80 overflow-hidden flex"
      >
        {/* 좌측 Code 패인 */}
        <div
          style={{ width: `${leftRatio}%` }}
          className="h-full bg-slate-950 p-2 flex flex-col justify-between overflow-hidden"
        >
          <span className="text-[8px] font-mono text-indigo-400">EDITOR ({leftRatio}%)</span>
          <div className="space-y-1">
            <div className="w-4/5 h-1.5 rounded-sm bg-indigo-500/40" />
            <div className="w-3/5 h-1.5 rounded-sm bg-slate-700" />
          </div>
        </div>

        {/* 중앙 드래그 가터 핸들 */}
        <div
          onPointerDown={() => setDragging(true)}
          onClick={() => setLeftRatio((r) => (r === 45 ? 65 : r === 65 ? 30 : 45))}
          className="w-2 h-full bg-slate-800 hover:bg-indigo-500 active:bg-indigo-400 flex items-center justify-center cursor-col-resize transition-colors shrink-0"
          title="좌우로 드래그하거나 클릭하세요"
        >
          <MoveHorizontal className="w-2.5 h-2.5 text-slate-300" />
        </div>

        {/* 우측 Preview 패인 */}
        <div className="flex-1 h-full bg-slate-900 p-2 flex flex-col justify-between overflow-hidden">
          <span className="text-[8px] font-mono text-emerald-400">PREVIEW ({100 - leftRatio}%)</span>
          <div className="w-full h-7 rounded-sm bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-[8px] font-bold text-emerald-300">
            LIVE VIEW
          </div>
        </div>
      </div>
      <span className="text-[9px] text-slate-400">중앙 분할선을 좌우로 드래그하거나 클릭해 보세요</span>
    </div>
  );
};

/* [스타일 +1] 홀로그래픽 포일 이리데슨트 (Holographic Foil Iridescent Style) */
const StHolographicFoilCardDemo: React.FC = () => {
  const [angle, setAngle] = useState(125);

  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        setAngle(Math.round(90 + pct * 140));
      }}
      onClick={() => setAngle((a) => (a + 45) % 360)}
      className="w-full h-40 flex items-center justify-center pt-5 px-5 cursor-pointer select-none"
    >
      <div
        style={{
          backgroundImage: `linear-gradient(${angle}deg, #ff0080 0%, #7928ca 28%, #00e5ff 58%, #00ff88 85%, #fde047 100%)`,
        }}
        className="relative w-full max-w-[205px] h-24 rounded-2xl p-[1.5px] shadow-[0_0_24px_rgba(0,229,255,0.25)] transition-all duration-200 overflow-hidden"
      >
        <div
          style={{
            backgroundImage: `linear-gradient(${angle}deg, rgba(255,0,128,0.32), rgba(0,229,255,0.32), rgba(0,255,136,0.28), rgba(253,224,71,0.32))`,
          }}
          className="w-full h-full rounded-[14px] bg-slate-950/80 backdrop-blur-md p-3 flex flex-col justify-between relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="px-1.5 py-0.5 rounded-sm bg-white/15 border border-white/30 text-[8px] font-black text-white tracking-wider">
              ✦ HOLO FOIL
            </span>
            <span className="text-[9px] font-mono text-cyan-200">#001 SSR</span>
          </div>
          <div>
            <div className="text-xs font-black text-white drop-shadow-sm">IRIDESCENT PRISM</div>
            <div className="text-[9px] text-white/80">마우스를 움직여 광택 각도 조절</div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* [스타일 +2] 서멀 영수증 & 바코드 티켓 (Thermal Receipt & Barcode Ticket) */
const StReceiptThermalMonoDemo: React.FC = () => {
  const [stamped, setStamped] = useState(true);
  const bars = [2, 1, 3, 1, 2, 1, 4, 1, 2, 2, 1, 3, 1, 2, 1, 3, 2, 1];

  return (
    <div
      onClick={() => setStamped((s) => !s)}
      className="w-full h-40 flex items-center justify-center pt-5 px-5 cursor-pointer select-none"
    >
      <div className="relative w-full max-w-[195px] bg-[#faf8f5] text-zinc-900 rounded-xs px-3 py-2 font-mono shadow-lg border-y-2 border-dashed border-zinc-400">
        <div className="flex items-center justify-between text-[9px] font-bold border-b border-dashed border-zinc-400 pb-1">
          <span>VIBE MART #042</span>
          <span>2026-10-17</span>
        </div>
        <div className="py-1 space-y-0.5 text-[9px]">
          <div className="flex justify-between">
            <span>1x UI PROMPT PACK</span>
            <span className="font-bold">$24.00</span>
          </div>
          <div className="flex justify-between text-zinc-600">
            <span>1x MOTION REEL</span>
            <span className="font-bold">$18.00</span>
          </div>
        </div>
        {/* 바코드 영역 */}
        <div className="pt-1 border-t border-dashed border-zinc-400 flex items-center justify-between">
          <div className="flex items-center gap-[1.5px] h-3.5">
            {bars.map((w, i) => (
              <span
                key={i}
                style={{ width: `${w * 1.5}px` }}
                className="h-full bg-zinc-900 inline-block"
              />
            ))}
          </div>
          <span
            className={`px-1 py-0.5 text-[8px] font-black border ${
              stamped ? 'border-rose-600 text-rose-600 -rotate-6' : 'border-zinc-500 text-zinc-500'
            } transition-transform`}
          >
            {stamped ? 'PAID ✓' : 'RECEIPT'}
          </span>
        </div>
      </div>
    </div>
  );
};

/* [스타일 +3] Y2K 애시드 크롬 & 파스텔 윈도우 (Y2K Metallic Chrome & Pastel UI) */
const StVaporwaveY2kChromeDemo: React.FC = () => {
  const [liked, setLiked] = useState(true);

  return (
    <div
      onClick={() => setLiked((l) => !l)}
      className="w-full h-40 flex items-center justify-center pt-5 px-5 cursor-pointer select-none"
    >
      <div className="w-full max-w-[205px] rounded-xl border-2 border-white bg-linear-to-br from-pink-200 via-fuchsia-100 to-sky-200 p-2 shadow-[0_4px_16px_rgba(244,114,182,0.35)] text-slate-900">
        {/* Y2K 메탈릭 크롬 상단 바 */}
        <div
          style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #cbd5e1 48%, #64748b 52%, #f1f5f9 100%)',
          }}
          className="rounded-lg px-2 py-0.5 border border-slate-400 flex items-center justify-between text-[9px] font-black text-slate-800 mb-1.5"
        >
          <span>✦ CYBER_GIRL_2000.EXE</span>
          <span className="text-pink-600">♥</span>
        </div>

        <div className="flex items-center justify-between px-1 py-1">
          <div>
            <div className="text-[11px] font-black tracking-tight text-fuchsia-900">
              AESTHETIC CHROME ✧
            </div>
            <div className="text-[9px] font-semibold text-sky-800">Track 01 · Bubblegum Pop</div>
          </div>
          <span
            style={{
              background: 'linear-gradient(180deg, #f8fafc 0%, #94a3b8 50%, #e2e8f0 100%)',
            }}
            className="px-2 py-1 rounded-full border border-slate-500 text-[9px] font-black text-slate-900 shadow-xs"
          >
            {liked ? '★ PLAY' : '☆ CUE'}
          </span>
        </div>
      </div>
    </div>
  );
};

/* [스타일 +4] 사이버펑크 하이볼티지 네온 (Cyberpunk High-Voltage Neon UI) */
const StCyberpunkNeonGlitchDemo: React.FC = () => {
  const [overdrive, setOverdrive] = useState(true);

  return (
    <div
      onClick={() => setOverdrive((o) => !o)}
      className="w-full h-40 flex items-center justify-center pt-5 px-5 cursor-pointer select-none"
    >
      <div
        style={{
          clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
        }}
        className="w-full max-w-[205px] bg-[#facc15] text-zinc-950 p-2.5 relative shadow-[0_0_20px_rgba(250,204,21,0.3)] border-l-4 border-cyan-400"
      >
        <div className="flex items-center justify-between mb-1">
          <span className="bg-zinc-950 text-[#00f0ff] text-[8px] font-mono font-black px-1.5 py-0.5 tracking-wider">
            NC-2077 // SYS
          </span>
          <span className="text-[8px] font-mono font-black text-zinc-900">VOLTAGE: 99.4V</span>
        </div>

        <div className="text-xs font-black tracking-tight uppercase leading-tight">
          {overdrive ? '⚡ NEON OVERDRIVE' : '⚠️ BREACH PROTOCOL'}
        </div>

        {/* 하단 해저드 스트라이프 바 */}
        <div
          style={{
            backgroundImage:
              'repeating-linear-gradient(-45deg, #09090b 0px, #09090b 5px, #facc15 5px, #facc15 10px)',
          }}
          className="mt-2 h-2 w-full rounded-xs border border-zinc-950"
        />
      </div>
    </div>
  );
};

/* [모션 영상 +1] 사이버 글리치 컷 티저 릴 (Glitch Cut Spec Teaser Reel) */
const VdGlitchCutReelDemo: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [glitching, setGlitching] = useState(false);

  const specs = [
    { tag: 'SCENE 01 // DISPLAY', title: '240Hz OLED', accent: 'text-cyan-300 border-cyan-400/50' },
    { tag: 'SCENE 02 // SPEED', title: '0.03ms GTG', accent: 'text-rose-300 border-rose-400/50' },
    { tag: 'SCENE 03 // CORE', title: 'NEURAL AI+', accent: 'text-amber-300 border-amber-400/50' },
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setGlitching(true);
      setTimeout(() => {
        setIdx((i) => (i + 1) % specs.length);
      }, 90);
      setTimeout(() => {
        setGlitching(false);
      }, 220);
    }, 1500);
    return () => clearInterval(id);
  }, [specs.length]);

  const cur = specs[idx];

  return (
    <div
      onClick={() => {
        setGlitching(true);
        setIdx((i) => (i + 1) % specs.length);
        setTimeout(() => setGlitching(false), 200);
      }}
      className="w-full h-40 flex items-center justify-center pt-5 px-5 cursor-pointer select-none"
    >
      <div
        className={`relative w-full max-w-[215px] h-24 rounded-xl bg-slate-950 border px-3 py-2.5 flex flex-col justify-between overflow-hidden transition-transform duration-75 ${
          cur.accent
        } ${glitching ? 'translate-x-1 -skew-x-6 shadow-[-4px_0_#ff0055,4px_0_#00e5ff]' : 'skew-x-0'}`}
      >
        {glitching && (
          <div className="absolute inset-x-0 top-1/2 h-3 bg-cyan-400/30 mix-blend-screen pointer-events-none" />
        )}
        <div className="flex items-center justify-between text-[8px] font-mono text-slate-400">
          <span>{cur.tag}</span>
          <span className="text-rose-400 font-bold">● REC</span>
        </div>
        <div className="text-base font-black tracking-wider text-white font-mono">
          {cur.title}
        </div>
        <div className="flex gap-1">
          {specs.map((_, i) => (
            <span
              key={i}
              className={`h-1 flex-1 rounded-full ${i === idx ? 'bg-cyan-400' : 'bg-slate-800'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/* [모션 영상 +2] 슬롯 릴 잭팟 헤드라인 씬 (Slot Reel Jackpot Headline Scene) */
const VdSlotJackpotHeadlineDemo: React.FC = () => {
  const [step, setStep] = useState(3);
  const reels = [
    ['SHIP', 'BUILD', 'CREATE'],
    ['2X', '5X', '10X'],
    ['BETTER', 'SMARTER', 'FASTER'],
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s >= 4 ? 0 : s + 1));
    }, 680);
    return () => clearInterval(id);
  }, []);

  const locked = step >= 3;

  return (
    <div
      onClick={() => setStep(0)}
      className="w-full h-40 flex flex-col items-center justify-center gap-2 pt-5 px-4 cursor-pointer select-none"
    >
      <div
        className={`flex items-center gap-1.5 p-2 rounded-xl border transition-all duration-300 ${
          locked
            ? 'bg-emerald-950/30 border-emerald-400/70 shadow-[0_0_20px_rgba(16,185,129,0.25)]'
            : 'bg-slate-900 border-slate-700'
        }`}
      >
        {reels.map((words, rIdx) => {
          const isStopped = step > rIdx;
          const wordIdx = isStopped ? 2 : (step + rIdx) % 3;
          return (
            <div
              key={rIdx}
              className="w-16 h-9 rounded-lg bg-slate-950 border border-slate-800 overflow-hidden relative"
            >
              <div
                style={{
                  transform: `translateY(-${wordIdx * 36}px)`,
                }}
                className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              >
                {words.map((w) => (
                  <div
                    key={w}
                    className={`h-9 flex items-center justify-center text-[10px] font-black tracking-tight ${
                      isStopped ? 'text-emerald-300' : 'text-slate-400'
                    }`}
                  >
                    {w}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <span className="text-[9px] font-mono text-slate-400">
        {locked ? '★ JACKPOT: CREATE 10X FASTER' : 'ROLLING HEADLINE REELS...'}
      </span>
    </div>
  );
};

/* [모션 영상 +3] 컨버전 퍼널 단계별 리빌 씬 (Conversion Funnel Stage Reveal) */
const VdFunnelConversionDropDemo: React.FC = () => {
  const [stage, setStage] = useState(3);
  const steps = [
    { label: 'VISITORS', val: '100%', width: 'w-44', color: 'from-indigo-500 to-blue-500' },
    { label: 'SIGN UPS', val: '58%', width: 'w-32', color: 'from-violet-500 to-indigo-500' },
    { label: 'PRO PAID', val: '28.4%', width: 'w-24', color: 'from-emerald-400 to-teal-500' },
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setStage((s) => (s >= 4 ? 1 : s + 1));
    }, 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      onClick={() => setStage(1)}
      className="w-full h-40 flex flex-col items-center justify-center gap-1.5 pt-5 px-4 cursor-pointer select-none"
    >
      {steps.map((st, idx) => {
        const visible = stage > idx;
        return (
          <div
            key={st.label}
            className={`${st.width} h-5 rounded-md bg-linear-to-r ${st.color} px-2.5 flex items-center justify-between text-[9px] font-bold text-white shadow transition-all duration-300 ${
              visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-15 scale-90 -translate-y-1'
            }`}
          >
            <span>{st.label}</span>
            <span className="font-mono">{st.val}</span>
          </div>
        );
      })}
      <div
        className={`mt-0.5 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-[9px] font-mono font-bold text-emerald-300 transition-all duration-300 ${
          stage >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
      >
        ▲ FINAL CVR +28.4%
      </div>
    </div>
  );
};

/* [모션 영상 +4] 브레이킹 뉴스 속보 & 티커 씬 (Breaking News Broadcast Overlay) */
const VdBreakingNewsTickerDemo: React.FC = () => {
  const [headIdx, setHeadIdx] = useState(0);
  const headlines = [
    'AI 바이브 사전 122종 인터랙션 돌파',
    '클릭 한 번으로 모션 영상 프롬프트 복사',
    '실시간 라이브 데모 프리뷰 전면 가동',
  ];
  const tickerText =
    '[속보] UI 36 · 그래픽 26 · 레이아웃 20 · 스타일 20 · 모션 영상 20 총 122종 바이브 수록 완료   •   ';

  useEffect(() => {
    const id = setInterval(() => {
      setHeadIdx((h) => (h + 1) % headlines.length);
    }, 2000);
    return () => clearInterval(id);
  }, [headlines.length]);

  return (
    <div
      onClick={() => setHeadIdx((h) => (h + 1) % headlines.length)}
      className="w-full h-40 flex items-center justify-center pt-5 px-4 cursor-pointer select-none"
    >
      <div className="w-full max-w-[225px] rounded-xl bg-slate-950 border border-rose-500/40 overflow-hidden shadow-lg">
        {/* 상단 BREAKING LIVE 헤더 */}
        <div className="bg-linear-to-r from-rose-600 to-red-700 px-2.5 py-1 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            <span className="text-[9px] font-black tracking-wider text-white">BREAKING NEWS</span>
          </div>
          <span className="text-[8px] font-mono text-rose-100">LIVE 24H</span>
        </div>

        {/* 중앙 수직 슬라이드 교체형 속보 헤드라인 */}
        <div className="px-2.5 py-2 bg-slate-900 overflow-hidden">
          <div
            key={headIdx}
            className="text-[10px] font-bold text-white truncate animate-toast-slide-up"
          >
            {headlines[headIdx]}
          </div>
        </div>

        {/* 하단 무한 루프 뉴스 자막 티커 (.animate-marquee-left 2배 트랙) */}
        <div className="bg-amber-400 text-slate-950 py-0.5 overflow-hidden whitespace-nowrap">
          <div className="flex w-max animate-marquee-left text-[8px] font-mono font-black">
            <span className="px-2">{tickerText}</span>
            <span className="px-2">{tickerText}</span>
          </div>
        </div>
      </div>
    </div>
  );
};


