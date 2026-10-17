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
} from 'lucide-react';

interface DemoProps {
  techniqueId: string;
}

export const InteractiveDemo: React.FC<DemoProps> = ({ techniqueId }) => {
  switch (techniqueId) {
    /* 1. 버튼·호버 */
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

    /* 2. 카드·3D */
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

    /* 3. 등장·모션 */
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

    /* 4. 텍스트·타이포 */
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

    /* 5. 피드백·파티클 */
    case 'confetti-burst':
      return <ConfettiBurstDemo />;
    case 'error-shake-tooltip':
      return <ErrorShakeDemo />;
    case 'heart-like-burst':
      return <HeartLikeBurstDemo />;
    case 'toast-slide-stack':
      return <ToastSlideStackDemo />;

    /* 6. 레이아웃·배너 */
    case 'sliding-pill-tabs':
      return <SlidingPillTabsDemo />;
    case 'infinite-marquee':
      return <InfiniteMarqueeDemo />;
    case 'skeleton-shimmer':
      return <SkeletonShimmerDemo />;
    case 'spotlight-focus':
      return <SpotlightFocusDemo />;

    /* 7. 조작·인터랙션 */
    case 'before-after-slider':
      return <BeforeAfterSliderDemo />;
    case 'drag-snap-slot':
      return <DragSnapSlotDemo />;
    case 'elastic-toggle-switch':
      return <ElasticToggleSwitchDemo />;
    case 'combo-gauge-pop':
      return <ComboGaugeDemo />;

    default:
      return null;
  }
};

/* ==================== 1. 버튼·호버 ==================== */

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
        {/* 대각선 시머 광택 줄기 */}
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

/* ==================== 2. 카드·3D ==================== */

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
      {/* 뒤에서 계속 움직이는 컬러 오브젝트 */}
      <div className="w-16 h-16 rounded-full bg-pink-500 blur-md absolute animate-glass-orb-1" />
      <div className="w-16 h-16 rounded-full bg-cyan-400 blur-md absolute animate-glass-orb-2" />
      {/* 반투명 프로스티드 유리 카드 */}
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

/* ==================== 3. 등장·모션 ==================== */

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

/* ==================== 4. 텍스트·타이포 ==================== */

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

/* ==================== 5. 피드백·파티클 ==================== */

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
  const [liked, setLiked] = useState(true);

  const handleClick = () => {
    setLiked(true);
    setBurstId((id) => id + 1);
  };

  return (
    <div className="w-full h-40 flex flex-col items-center justify-center select-none">
      <button
        onClick={handleClick}
        className="relative w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center"
      >
        <span
          key={`ring-${burstId}`}
          className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-rose-500 animate-heart-ring"
        />
        <Heart
          key={`heart-${burstId}`}
          className={`w-6 h-6 ${
            liked
              ? 'text-rose-500 fill-rose-500 animate-spring-pop'
              : 'text-slate-500'
          }`}
        />
      </button>
      <span className="mt-2 text-[10px] text-slate-400">하트를 클릭해 보세요</span>
    </div>
  );
};

const ToastSlideStackDemo: React.FC = () => {
  const [toasts, setToasts] = useState([
    { id: 1, text: '저장이 완료되었습니다.' },
  ]);

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

/* ==================== 6. 레이아웃·배너 ==================== */

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
        {/* 스켈레톤 위를 가로지르는 진짜 쉬머 광택 */}
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

/* ==================== 7. 조작·인터랙션 ==================== */

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
