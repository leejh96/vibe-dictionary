import React, { useState, useEffect } from 'react';
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

    /* ==================== DOMAIN 2: 모션 그래픽 & 연출 (18종) ==================== */
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

    /* ==================== DOMAIN 3: 레이아웃 & 공간 구조 (16종) ==================== */
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

    /* ==================== DOMAIN 4: 디자인 스타일 & 테마 (16종) ==================== */
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

    default:
      return null;
  }
};

/* ============================================================================
 * DOMAIN 1: UI 인터랙션 데모 (32종)
 * ============================================================================ */

const MagneticHoverDemo: React.FC = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setOffset({
          x: (e.clientX - (rect.left + rect.width / 2)) * 0.42,
          y: (e.clientY - (rect.top + rect.height / 2)) * 0.42,
        });
      }}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      className="w-full h-40 flex flex-col items-center justify-center cursor-pointer select-none"
    >
      <button
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          transition:
            offset.x === 0
              ? 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)'
              : 'transform 0.05s ease-out',
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
        className="relative overflow-hidden px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 border border-indigo-400/50 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 active:scale-95 transition-transform"
      >
        <span className="relative z-10 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-300" />
          Shimmer Sweep Button
        </span>
        <span className="pointer-events-none absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-transparent via-white/55 to-transparent animate-shimmer-sweep" />
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
          <div className="absolute inset-0 backface-hidden rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 p-3.5 flex flex-col justify-between border border-indigo-400/40 shadow-lg">
            <span className="text-[10px] font-bold text-indigo-200">FRONT SIDE</span>
            <p className="text-xs font-extrabold text-white">클릭해 카드 뒤집기 ↻</p>
          </div>
          <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 p-3.5 flex flex-col justify-between border border-emerald-400/40 shadow-lg">
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
        className="relative overflow-hidden w-52 h-24 rounded-xl bg-gradient-to-tr from-fuchsia-600 via-indigo-600 to-cyan-500 p-3.5 shadow-xl border border-white/25 flex flex-col justify-between"
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
          className={`absolute w-52 h-24 rounded-xl bg-gradient-to-r ${c.color} p-3.5 shadow-lg border border-white/20 flex flex-col justify-between transition-all duration-300`}
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
        className="animate-spring-pop bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 px-5 py-2.5 rounded-2xl shadow-lg font-black text-xs"
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
      className="w-full h-40 flex flex-col justify-center px-6 cursor-pointer select-none"
    >
      <div key={replayKey} className="space-y-1.5">
        {['1. 첫 번째 카드 등장', '2. 두 번째 카드 등장', '3. 세 번째 카드 등장'].map((label, i) => (
          <div
            key={i}
            style={{
              animation: `stagger-up 0.42s cubic-bezier(0.16, 1, 0.3, 1) ${i * 100}ms backwards`,
            }}
            className="bg-slate-800/90 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 flex items-center justify-between"
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

  const trigger = () => {
    if (status !== 'idle') {
      setStatus('idle');
      return;
    }
    setStatus('loading');
    setTimeout(() => setStatus('done'), 850);
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
      <div className="animate-float-bob w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg">
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

    const step = (now: number) => {
      const p = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(Math.round(start + diff * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
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

  const fire = () => {
    setBurstKey((k) => k + 1);
    setActive(true);
    setTimeout(() => setActive(false), 900);
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
              className={`w-2.5 h-2.5 rounded-sm ${p.color} absolute`}
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
    <div className="w-full h-40 flex flex-col items-center justify-center px-6 select-none">
      {showTip && (
        <div className="mb-2 animate-float-bob bg-amber-400 text-slate-950 text-[10px] font-extrabold px-2.5 py-1 rounded-md shadow">
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
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">
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
      className="w-full h-40 flex flex-col justify-between p-3.5 cursor-pointer select-none"
    >
      <span className="text-[10px] text-indigo-300 bg-indigo-950/70 px-2.5 py-0.5 rounded-full w-fit mx-auto">
        + 클릭해서 토스트 알림 띄우기
      </span>
      <div className="space-y-1.5">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="animate-toast-slide-up w-full bg-slate-900 border border-indigo-500/40 rounded-xl px-3 py-2 shadow-lg flex items-center gap-2"
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
          <div className="h-3 w-3/4 rounded bg-slate-800" />
          <div className="h-2.5 w-1/2 rounded bg-slate-800/80" />
        </div>
        <div className="pointer-events-none absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer-sweep" />
      </div>
    </div>
  );
};

const SpotlightFocusDemo: React.FC = () => {
  const [focusIdx, setFocusIdx] = useState(1);
  return (
    <div className="w-full h-40 flex items-center justify-center px-6 select-none">
      <div className="w-full space-y-1.5">
        {['1. 상단 메뉴 영역', '2. 포커스된 핵심 영역 (클릭)', '3. 하단 정보 영역'].map(
          (label, i) => (
            <div
              key={i}
              onClick={() => setFocusIdx((i + 1) % 3)}
              className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-bold transition-all duration-300 ${
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
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-cyan-500 flex items-center justify-end pr-4 text-xs font-black text-white">
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
      className="w-full h-40 flex flex-col items-center justify-center px-6 cursor-pointer select-none"
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
          className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300"
        />
      </div>
      <span className="mt-2 text-[10px] text-slate-400">클릭해 게이지 채우기</span>
    </div>
  );
};

/* ============================================================================
 * DOMAIN 2: 🎬 모션 그래픽 & 연출 데모 (18종)
 * ============================================================================ */

/* 1. 스쿼시 앤 스트레치 */
const MgSquashStretchDemo: React.FC = () => {
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center select-none pt-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-b from-amber-300 to-orange-500 shadow-lg shadow-orange-500/30 animate-squash-bounce" />
      <div className="mt-5 w-16 h-1.5 rounded-full bg-slate-700/80" />
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
        className="animate-anticipation-launch w-12 h-10 rounded-xl bg-gradient-to-r from-rose-500 to-amber-400 flex items-center justify-center shadow-lg"
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
                className="absolute rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-300 shadow-md"
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
    { name: 'Spring', easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', color: 'bg-amber-400' },
  ];

  return (
    <div
      onClick={() => setActive(!active)}
      className="w-full h-40 flex flex-col justify-center px-6 gap-2 cursor-pointer select-none"
    >
      {tracks.map((tr) => (
        <div key={tr.name} className="flex items-center gap-2">
          <span className="w-14 text-[10px] font-mono text-slate-400">{tr.name}</span>
          <div className="flex-1 h-5 bg-slate-900 rounded-full border border-slate-800 px-1 flex items-center">
            <div
              style={{
                transition: `transform 0.9s ${tr.easing}`,
                transform: active ? 'translateX(118px)' : 'translateX(0px)',
              }}
              className={`w-3.5 h-3.5 rounded-full ${tr.color}`}
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
    <div className="w-full h-40 flex flex-col items-center justify-center select-none">
      <svg className="w-20 h-20" viewBox="0 0 100 100">
        <path
          d="M50 10 L63 36 L92 40 L71 60 L76 89 L50 75 L24 89 L29 60 L8 40 L37 36 Z"
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
    <div className="w-full h-40 flex flex-col items-center justify-center select-none">
      <div className="w-20 h-20 bg-gradient-to-tr from-fuchsia-500 via-indigo-500 to-cyan-400 shadow-lg shadow-indigo-500/30 animate-liquid-morph" />
      <span className="mt-2.5 text-[10px] text-slate-400">물방울처럼 곡률이 계속 변형됨</span>
    </div>
  );
};

/* 7. 구이 메타볼 퓨전 (SVG Gooey Filter) */
const MgGooeyMetaballDemo: React.FC = () => {
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center select-none">
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
    <div className="w-full h-40 flex items-center justify-center select-none">
      <div className="relative w-28 h-28 flex items-center justify-center">
        {/* 중앙 코어 */}
        <div className="w-5 h-5 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50" />
        {/* 내부 궤도 */}
        <div className="absolute w-16 h-16 rounded-full border border-dashed border-indigo-400/40 animate-orbit-spin">
          <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow" />
        </div>
        {/* 외부 역방향 궤도 */}
        <div className="absolute w-26 h-26 inset-1 rounded-full border border-slate-700 animate-orbit-reverse">
          <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-pink-400 shadow" />
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
      className="relative w-full h-40 flex items-center justify-center cursor-pointer select-none px-6"
    >
      {/* 배경 피사체 */}
      <div
        className={`absolute right-8 top-5 px-3.5 py-2 rounded-xl bg-violet-600 text-white font-bold text-xs transition-all duration-500 ${
          !focusFront
            ? 'blur-0 scale-105 opacity-100 z-20 ring-2 ring-violet-300 shadow-xl'
            : 'blur-[4px] scale-90 opacity-45 z-10'
        }`}
      >
        🏔️ 배경 피사체 (Back)
      </div>
      {/* 전경 피사체 */}
      <div
        className={`absolute left-8 bottom-6 px-3.5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs transition-all duration-500 ${
          focusFront
            ? 'blur-0 scale-105 opacity-100 z-20 ring-2 ring-emerald-200 shadow-xl'
            : 'blur-[4px] scale-90 opacity-45 z-10'
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
        <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-amber-700 animate-ken-burns flex items-center justify-center">
          <div className="text-center">
            <span className="text-[10px] font-mono text-amber-200 block">CAMERA PAN & ZOOM</span>
            <span className="text-xs font-black text-white">Ken Burns Effect</span>
          </div>
        </div>
        {/* 카메라 뷰파인더 가이드 */}
        <div className="pointer-events-none absolute inset-2 border border-white/25 rounded flex items-start justify-between p-1">
          <span className="text-[8px] font-mono text-rose-400">● REC</span>
        </div>
      </div>
    </div>
  );
};

/* 15. 아이소메트릭 레이어 익스플로드 */
const MgIsometricExplodeDemo: React.FC = () => {
  const [exploded, setExploded] = useState(true);
  return (
    <div
      onClick={() => setExploded(!exploded)}
      onMouseEnter={() => setExploded(true)}
      onMouseLeave={() => setExploded(false)}
      className="w-full h-40 flex flex-col items-center justify-center cursor-pointer select-none"
    >
      <div className="relative w-24 h-20 flex items-center justify-center">
        {[
          { z: 0, color: 'bg-slate-800 border-slate-600' },
          { z: 1, color: 'bg-indigo-600/80 border-indigo-400' },
          { z: 2, color: 'bg-cyan-400/90 border-white' },
        ].map((layer, i) => (
          <div
            key={i}
            style={{
              transform: `rotateX(55deg) rotateZ(-35deg) translateZ(${
                exploded ? i * 22 : i * 4
              }px)`,
              transition: 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
            className={`absolute w-16 h-16 rounded-xl border ${layer.color} shadow-lg`}
          />
        ))}
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
          className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-emerald-500 flex items-center justify-center"
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
          className={`pointer-events-none absolute left-0 h-0.5 ${l.width} bg-gradient-to-r from-transparent via-cyan-400 to-white animate-speed-streak`}
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
      <span className="relative z-10 text-xs font-black tracking-wider text-white/90 bg-slate-950/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/15">
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
                  ? 'bg-cyan-400 shadow-sm shadow-cyan-400'
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
    <div className="w-full h-40 flex items-center justify-center px-5 select-none">
      <div className="w-full h-28 grid grid-cols-4 grid-rows-2 gap-1.5">
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
          className={`col-span-2 row-span-1 rounded-xl px-2.5 py-1.5 flex items-center justify-between cursor-pointer border transition-all ${
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
      className="w-full h-40 flex flex-col items-center justify-center px-6 cursor-pointer select-none"
    >
      <div className="w-full grid grid-cols-3 gap-1.5 items-start">
        <div className="space-y-1.5">
          <div className={`${shuffled ? 'h-9' : 'h-14'} rounded-lg bg-indigo-500/30 border border-indigo-500/50 transition-all duration-300 flex items-center justify-center text-[9px] font-mono text-indigo-200`}>H1</div>
          <div className={`${shuffled ? 'h-14' : 'h-8'} rounded-lg bg-slate-800 border border-slate-700 transition-all duration-300 flex items-center justify-center text-[9px] font-mono text-slate-400`}>H2</div>
        </div>
        <div className="space-y-1.5">
          <div className={`${shuffled ? 'h-14' : 'h-8'} rounded-lg bg-slate-800 border border-slate-700 transition-all duration-300 flex items-center justify-center text-[9px] font-mono text-slate-400`}>H3</div>
          <div className={`${shuffled ? 'h-9' : 'h-14'} rounded-lg bg-cyan-500/30 border border-cyan-500/50 transition-all duration-300 flex items-center justify-center text-[9px] font-mono text-cyan-200`}>H4</div>
        </div>
        <div className="space-y-1.5">
          <div className={`${shuffled ? 'h-11' : 'h-12'} rounded-lg bg-fuchsia-500/30 border border-fuchsia-500/50 transition-all duration-300 flex items-center justify-center text-[9px] font-mono text-fuchsia-200`}>H5</div>
          <div className={`${shuffled ? 'h-12' : 'h-10'} rounded-lg bg-slate-800 border border-slate-700 transition-all duration-300 flex items-center justify-center text-[9px] font-mono text-slate-400`}>H6</div>
        </div>
      </div>
      <span className="mt-2 text-[10px] text-slate-400">클릭 시 높이 단차 재배치</span>
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
      className="relative w-full h-40 flex items-center justify-center px-6 cursor-pointer select-none"
    >
      <div
        className={`w-36 h-24 rounded-xl bg-gradient-to-br from-rose-500/40 to-indigo-600/40 border border-white/20 mr-10 transition-transform duration-300 ${
          hovered ? '-translate-x-2 scale-105' : ''
        }`}
      />
      <div
        className={`absolute right-7 bottom-7 w-32 rounded-lg bg-slate-900/95 border border-amber-400/50 p-2.5 shadow-xl transition-transform duration-300 ${
          hovered ? 'translate-x-1 -translate-y-1' : ''
        }`}
      >
        <span className="text-[9px] font-mono text-amber-300">ISSUE 04</span>
        <p className="text-xs font-black text-white leading-tight">EDITORIAL OVERLAP</p>
      </div>
    </div>
  );
};

/* 4. 허니컴 육각형 타일 (Honeycomb Grid) */
const LyHoneycombHexDemo: React.FC = () => {
  const [selected, setSelected] = useState(2);
  const hexes = ['AI', 'UI', 'VFX', '3D', 'CSS'];
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center select-none">
      <div className="flex items-center gap-1.5">
        {hexes.map((label, idx) => {
          const isOdd = idx % 2 === 1;
          const active = selected === idx;
          return (
            <div
              key={label}
              onClick={() => setSelected(idx)}
              style={{
                clipPath: 'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)',
              }}
              className={`w-11 h-11 flex items-center justify-center text-[10px] font-black cursor-pointer transition-all ${
                isOdd ? 'translate-y-3' : '-translate-y-1'
              } ${
                active
                  ? 'bg-amber-400 text-slate-950 scale-110'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {label}
            </div>
          );
        })}
      </div>
      <span className="mt-5 text-[10px] text-slate-400">육각형 셀을 클릭해 보세요</span>
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
      className="w-full h-40 flex items-center justify-center px-5 cursor-pointer select-none"
    >
      <div className="w-full h-28 rounded-xl bg-slate-900 border border-slate-800 p-2.5 grid grid-cols-2 gap-2.5 items-center">
        {/* 좌측 고정(Sticky) 비주얼 */}
        <div
          className={`h-full rounded-lg bg-gradient-to-br ${steps[step].color} flex flex-col items-center justify-center text-slate-950 font-black text-xs transition-all duration-300`}
        >
          <span className="text-[9px] font-mono opacity-75">STICKY LEFT</span>
          <span>{steps[step].title}</span>
        </div>
        {/* 우측 스크롤 스토리 */}
        <div className="space-y-1">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${
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
      className="w-full h-40 flex items-center justify-center px-6 cursor-pointer select-none"
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
      onClick={() => setIdx((i) => (i + 1) % 3)}
      className="w-full h-40 flex flex-col items-center justify-center px-5 cursor-pointer select-none"
    >
      <div className="w-full overflow-hidden rounded-xl bg-slate-900 border border-slate-800 p-2.5">
        <div
          style={{ transform: `translateX(-${idx * 72}px)` }}
          className="flex gap-2 transition-transform duration-500 ease-out"
        >
          {['CARD 01', 'CARD 02', 'CARD 03', 'CARD 04'].map((c, i) => (
            <div
              key={c}
              className={`shrink-0 w-24 h-16 rounded-lg border flex flex-col items-center justify-center text-[10px] font-bold ${
                i === idx
                  ? 'bg-indigo-600/30 border-indigo-400 text-white'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              <span>{c}</span>
              <span className="text-[9px] text-indigo-300">→ 가로 이동</span>
            </div>
          ))}
        </div>
      </div>
      <span className="mt-2 text-[10px] text-slate-400">클릭해 가로 파노라마 트랙 이동</span>
    </div>
  );
};

/* 8. 언더빌 커튼 리빌 푸터 (Curtain Reveal) */
const LyCurtainRevealDemo: React.FC = () => {
  const [lifted, setLifted] = useState(false);
  return (
    <div
      onClick={() => setLifted(!lifted)}
      className="w-full h-40 flex items-center justify-center px-6 cursor-pointer select-none"
    >
      <div className="relative w-full h-28 rounded-xl overflow-hidden border border-slate-800 bg-indigo-950 flex items-end justify-center p-2.5">
        {/* 바닥에 깔린 고정 레이어 */}
        <div className="text-center">
          <span className="text-[10px] font-mono text-indigo-300">FIXED FOOTER LAYER</span>
          <p className="text-xs font-black text-white">숨겨진 하단 푸터 등장 ✨</p>
        </div>
        {/* 위를 덮은 본문 커튼 */}
        <div
          className={`absolute inset-0 bg-slate-900 border-b border-slate-700 flex flex-col items-center justify-center transition-transform duration-500 ${
            lifted ? '-translate-y-14' : 'translate-y-0'
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
      className="w-full h-40 flex flex-col items-center justify-center select-none"
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
      <span className="mt-3 text-[10px] text-slate-400">아이콘 위에 마우스를 올려보세요</span>
    </div>
  );
};

/* 10. 커맨드 팔레트 스포트라이트 (Command Palette Cmd+K) */
const LyCommandPaletteDemo: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const cmds = ['⚡ 새 프로젝트 생성', '🎨 다크 테마 전환', '📋 프롬프트 전체 복사'];
  return (
    <div className="w-full h-40 flex items-center justify-center px-6 select-none">
      <div className="w-full rounded-xl bg-slate-900/95 border border-slate-700 shadow-2xl overflow-hidden">
        <div className="px-3 py-1.5 border-b border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
          <span>🔍 Type a command...</span>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[9px]">⌘K</kbd>
        </div>
        <div className="p-1.5 space-y-1">
          {cmds.map((cmd, i) => (
            <div
              key={cmd}
              onClick={() => setSelectedIdx(i)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer flex items-center justify-between transition-colors ${
                selectedIdx === i
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:bg-slate-800'
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
    <div className="w-full h-40 flex flex-col items-center justify-center select-none">
      <div
        onClick={() => setExpanded(!expanded)}
        className={`bg-black border border-slate-700/80 shadow-xl cursor-pointer transition-all duration-300 overflow-hidden flex flex-col justify-center ${
          expanded
            ? 'w-56 h-24 rounded-3xl px-4 py-2.5'
            : 'w-32 h-9 rounded-full px-3'
        }`}
      >
        <div className="flex items-center justify-between text-xs font-bold text-white">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px]">{expanded ? 'Now Playing' : 'Island'}</span>
          </span>
          <span className="text-[10px] font-mono text-indigo-400">
            {expanded ? '접기' : '클릭'}
          </span>
        </div>
        {expanded && (
          <div className="mt-2 flex items-center justify-between text-[10px] text-slate-300 border-t border-slate-800 pt-1.5">
            <span>🎵 Vibe Synth Track</span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white font-bold">LIVE</span>
          </div>
        )}
      </div>
      <span className="mt-2.5 text-[10px] text-slate-400">캡슐을 클릭해 확장/축소</span>
    </div>
  );
};

/* 12. 원형 파이 메뉴 (Radial Pie Menu) */
const LyRadialPieMenuDemo: React.FC = () => {
  const [open, setOpen] = useState(true);
  const items = [
    { icon: '🎨', x: 0, y: -42 },
    { icon: '⚡', x: 42, y: 0 },
    { icon: '🚀', x: 0, y: 42 },
    { icon: '✨', x: -42, y: 0 },
  ];
  return (
    <div className="relative w-full h-40 flex items-center justify-center select-none">
      {items.map((it, idx) => (
        <button
          key={idx}
          onClick={() => setOpen(!open)}
          style={{
            transform: open
              ? `translate(${it.x}px, ${it.y}px) scale(1)`
              : 'translate(0px, 0px) scale(0.2)',
            opacity: open ? 1 : 0,
          }}
          className="absolute w-8 h-8 rounded-full bg-slate-800 border border-indigo-400/50 flex items-center justify-center text-xs transition-all duration-300"
        >
          {it.icon}
        </button>
      ))}
      <button
        onClick={() => setOpen(!open)}
        className="relative z-10 w-10 h-10 rounded-full bg-indigo-600 text-white font-black text-xs shadow-lg"
      >
        {open ? '×' : '+'}
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
      className="w-full h-40 flex items-end justify-center px-8 pt-4 cursor-pointer select-none"
    >
      <div
        className={`w-full rounded-t-2xl bg-slate-900 border-t border-x border-slate-700 px-3.5 pt-2 transition-all duration-300 ${
          snap === 'full' ? 'h-32' : 'h-16'
        }`}
      >
        <div className="w-8 h-1 rounded-full bg-slate-600 mx-auto mb-2" />
        <div className="flex items-center justify-between text-xs font-bold text-white">
          <span>Bottom Sheet ({snap.toUpperCase()})</span>
          <span className="text-[10px] text-indigo-400">클릭해 높이 전환</span>
        </div>
        {snap === 'full' && (
          <p className="mt-2 text-[11px] text-slate-400">
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
    <div className="w-full h-40 flex items-center justify-center px-5 select-none">
      <div className="w-full h-28 rounded-xl bg-slate-900 border border-slate-800 grid grid-cols-5 overflow-hidden">
        <div className="col-span-2 border-r border-slate-800 p-1.5 space-y-1">
          {items.map((it, idx) => (
            <button
              key={it.name}
              onClick={() => setActiveId(idx)}
              className={`w-full text-left px-2 py-1 rounded text-[10px] font-bold transition-colors ${
                activeId === idx
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              {it.name}
            </button>
          ))}
        </div>
        <div className="col-span-3 p-2.5 flex flex-col justify-center">
          <span className="text-[9px] font-mono text-indigo-400">DETAIL VIEW</span>
          <p className="text-xs font-extrabold text-white mt-0.5">{items[activeId].name}</p>
          <p className="text-[10px] text-slate-400 mt-1">{items[activeId].desc}</p>
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
      className="w-full h-40 flex flex-col items-center justify-center px-5 cursor-pointer select-none"
    >
      <div className="w-full grid grid-cols-3 gap-1.5">
        {cols.map((title, i) => (
          <div key={title} className="rounded-lg bg-slate-900 border border-slate-800 p-2 h-24">
            <div className="text-[9px] font-mono text-slate-400 mb-1.5">{title}</div>
            {col === i ? (
              <div className="rounded bg-indigo-600/30 border border-indigo-400 p-1.5 text-[10px] font-bold text-white animate-spring-pop">
                태스크 카드 →
              </div>
            ) : (
              <div className="h-7 rounded border border-dashed border-slate-800" />
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
      className="w-full h-40 flex flex-col items-center justify-center cursor-pointer select-none"
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
      <div className="relative z-10 w-52 h-24 rounded-2xl bg-gradient-to-b from-white/20 to-white/5 backdrop-blur-xl border border-white/30 shadow-2xl p-3.5 flex flex-col justify-between">
        <span className="text-[10px] font-mono text-white/90">LIQUID ACRYLIC</span>
        <span className="text-xs font-extrabold text-white">영롱한 다중 굴절 아크릴</span>
      </div>
    </div>
  );
};

/* 3. 리니어풍 다크 미니멀 (Linear-Style Dark Minimal) */
const StLinearDarkMinimalDemo: React.FC = () => {
  return (
    <div className="w-full h-40 flex items-center justify-center bg-[#090A0F] px-6 select-none">
      <div className="relative w-full h-24 rounded-xl bg-[#12131A] border border-white/10 p-3.5 flex flex-col justify-between overflow-hidden">
        <div className="pointer-events-none absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-indigo-400/80 to-transparent" />
        <span className="text-[10px] font-mono text-slate-400">1PX TOP HAIRLINE</span>
        <span className="text-xs font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
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
        className={`px-6 py-3 rounded-xl border border-slate-700 bg-gradient-to-b from-slate-700 to-slate-900 flex items-center gap-2.5 transition-all ${
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
    <div className="w-full h-40 flex items-center justify-center select-none">
      <div className="relative w-48 h-24 flex items-center justify-center">
        <div className="absolute inset-0 rounded-xl bg-amber-400 rotate-[-4deg] shadow-md" />
        <div className="absolute inset-0 rounded-xl bg-rose-500 rotate-[3deg] shadow-md" />
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
    <div className="w-full h-40 flex items-center justify-center bg-[#008080] px-6 select-none">
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
    <div className="relative w-full h-40 flex flex-col items-center justify-end overflow-hidden bg-gradient-to-b from-[#1a052e] via-[#3b0764] to-[#be185d] select-none pb-3">
      <div className="w-14 h-14 rounded-full bg-gradient-to-b from-amber-300 to-rose-500 mb-2 shadow-[0_0_20px_#f43f5e]" />
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
  return (
    <div className="w-full h-40 flex items-center justify-center px-6 select-none">
      <div
        style={{
          clipPath:
            'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)',
        }}
        className="w-56 h-24 bg-cyan-950/60 border border-cyan-400/70 p-3.5 flex flex-col justify-between"
      >
        <div className="flex items-center justify-between text-[9px] font-mono text-cyan-300">
          <span>SYS.HUD // 45° CHAMFER</span>
          <span>ONLINE</span>
        </div>
        <div className="text-xs font-black tracking-wider text-white">
          TACTICAL FRAME UI
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
    <div className="w-full h-40 flex items-center justify-center bg-stone-100 text-stone-950 px-6 select-none">
      <div className="w-full h-28 border-2 border-stone-950 grid grid-cols-3">
        <div className="border-r-2 border-stone-950 bg-red-600 text-white p-2 flex flex-col justify-between">
          <span className="text-[9px] font-mono font-bold">01</span>
          <span className="text-sm font-black">SWISS</span>
        </div>
        <div className="col-span-2 p-2.5 flex flex-col justify-between">
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


