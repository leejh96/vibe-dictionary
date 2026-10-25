import { useDemoNumber, useDemoToggle, useDemoPulse, useDemoSample, useDemoAutoplayRunning } from '../../../hooks/useDemoAutoplay';
import { useLocale } from '../../../i18n/LocaleContext';
import React, { useState, useEffect, useRef, useCallback, useId } from 'react';
import { Sparkles, Check, Heart, Loader2, Bell, ChevronDown, MoveHorizontal, Flame, Zap, Rocket } from 'lucide-react';



/* ============================================================================
 * DOMAIN 1: UI 인터랙션 데모 (32종)
 * ============================================================================ */

export const MagneticHoverDemo: React.FC = () => {
  const { t } = useLocale();
  const [isTracking, setIsTracking] = useState(false);
  const [offset, setOffset] = useDemoSample({ x: 0, y: 0 }, phase => ({ x: Math.sin(phase * Math.PI * 2) * 35, y: Math.sin(phase * Math.PI * 4) * 16 }), isTracking);
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
      >{t("demo.moveYourMouseAround")}</button>
    </div>
  );
};


export const ShimmerSweepDemo: React.FC = () => {
  const { t } = useLocale();
  const [boostKey, setBoostKey] = useState(0);
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center select-none">
      <button
        key={boostKey}
        onClick={() => setBoostKey((k) => k + 1)}
        className="relative overflow-hidden px-6 py-3 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-indigo-600 border border-indigo-400/50 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 active:scale-95 transition-transform"
      >
        <span className="relative z-10 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-300" />{t("sample.shimmerSweep.shimmerSweepButton")}</span>
        <span className="pointer-events-none absolute top-0 bottom-0 left-0 w-20 bg-linear-to-r from-transparent via-white/55 to-transparent animate-shimmer-sweep" />
      </button>
    </div>
  );
};


export const RippleClickDemo: React.FC = () => {
  const { t } = useLocale();
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>());
  useEffect(() => () => { for (const timer of timers.current) clearTimeout(timer); timers.current.clear(); }, []);
  const addRipple = (x: number, y: number) => {
    const id = Date.now() + Math.random();
    setRipples(prev => [...prev, { id, x, y }]);
    const timer = setTimeout(() => { setRipples(prev => prev.filter(ripple => ripple.id !== id)); timers.current.delete(timer); }, 650);
    timers.current.add(timer);
  };
  useDemoPulse(() => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) addRipple(rect.width / 2, rect.height / 2);
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    addRipple(e.detail === 0 ? rect.width / 2 : e.clientX - rect.left, e.detail === 0 ? rect.height / 2 : e.clientY - rect.top);
  };

  return (
    <div className="w-full h-40 flex items-center justify-center select-none">
      <button
        ref={buttonRef}
        onClick={handleClick}
        className="relative overflow-hidden px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-md active:scale-[0.98] transition-transform"
      >
        <span className="relative z-10">{t("demo.ripplesSpreadFromYourClick")}</span>
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


export const NeonGlowPulseDemo: React.FC = () => {
  const { t } = useLocale();
  const [active, setActive] = useState(true);
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center select-none">
      <button
        type="button" aria-pressed={active} onClick={() => setActive(!active)}
        className={`px-6 py-2.5 rounded-xl font-bold text-xs border transition-all duration-300 ${
          active
            ? 'bg-cyan-950/90 border-cyan-300 text-cyan-200 animate-neon-breathe'
            : 'bg-slate-900 border-slate-700 text-slate-500'
        }`}
      >
        ⚡ {active ? t("sample.neonGlowPulse.neonPulseOn") : t("demo.neonOffClick")}
      </button>
    </div>
  );
};


export const LiquidSlideFillDemo: React.FC = () => {
  const { t } = useLocale();
  const [isHovering, setIsHovering] = useState(false);
  const [filled, setFilled] = useDemoToggle(false, isHovering);
  return (
    <div className="w-full h-40 flex items-center justify-center select-none">
      <button
        onClick={() => setFilled(!filled)}
        onMouseEnter={() => { setIsHovering(true); setFilled(true); }}
        onMouseLeave={() => { setIsHovering(false); setFilled(false); }}
        className={`relative overflow-hidden px-6 py-2.5 rounded-xl border border-emerald-400 font-bold text-xs transition-colors duration-300 ${
          filled ? 'text-slate-950' : 'text-emerald-300'
        }`}
      >
        <span className="relative z-10">{t("demo.hoverClick")}</span>
        <span
          className={`absolute inset-0 bg-emerald-400 transition-transform duration-300 ease-out ${
            filled ? 'translate-x-0' : '-translate-x-full'
          }`}
        />
      </button>
    </div>
  );
};


export const CardFlipDemo: React.FC = () => {
  const { t } = useLocale();
  const [flipped, setFlipped] = useDemoToggle(false);
  return (
    <div className="w-full h-40 flex items-center justify-center select-none">
      <div data-demo-control
        onClick={() => setFlipped(!flipped)}
        role="button" tabIndex={0} aria-pressed={flipped} aria-label={t('demo.clickToFlipTheCard')}
        onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setFlipped(value => !value); } }}
        className="w-52 h-28 perspective-1000 cursor-pointer focus-visible:outline-2 focus-visible:outline-indigo-400"
      >
        <div
          className={`relative w-full h-full duration-500 preserve-3d transition-transform ${
            flipped ? 'rotate-y-180' : ''
          }`}
        >
          <div className="absolute inset-0 backface-hidden rounded-xl bg-linear-to-br from-indigo-600 to-violet-700 p-3.5 flex flex-col justify-between border border-indigo-400/40 shadow-lg">
            <span className="text-[10px] font-bold text-indigo-200">{t("sample.cardFlip.frontSide")}</span>
            <p className="text-xs font-extrabold text-white">{t("demo.clickToFlipTheCard")}</p>
          </div>
          <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl bg-linear-to-br from-emerald-600 to-teal-700 p-3.5 flex flex-col justify-between border border-emerald-400/40 shadow-lg">
            <span className="text-[10px] font-bold text-emerald-100">{t("sample.cardFlip.backSide")}</span>
            <p className="text-xs font-extrabold text-white">{t("demo.backDetailsClickAgain")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export const Tilt3DCardDemo: React.FC = () => {
  const { t } = useLocale();
  const [isTracking, setIsTracking] = useState(false);
  const [rot, setRot] = useDemoSample({ x: 0, y: 0, gx: 50, gy: 50 }, phase => ({ x: Math.sin(phase * Math.PI * 2) * 10, y: Math.sin(phase * Math.PI * 4) * 10, gx: 50 + Math.sin(phase * Math.PI * 4) * 25, gy: 50 + Math.sin(phase * Math.PI * 2) * 25 }), isTracking);
  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const x = (py - 0.5) * -28;
        const y = (px - 0.5) * 28;
        setIsTracking(true);
        setRot({ x, y, gx: px * 100, gy: py * 100 });
      }}
      onMouseLeave={() => { setIsTracking(false); setRot({ x: 0, y: 0, gx: 50, gy: 50 }); }}
      className="w-full h-40 flex items-center justify-center cursor-pointer select-none"
    >
      <div
        style={{
          transform: `perspective(550px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
          transition: !isTracking ? 'transform 0.4s ease-out' : 'transform 0.04s linear',
        }}
        className="relative overflow-hidden w-52 h-24 rounded-xl bg-linear-to-tr from-fuchsia-600 via-indigo-600 to-cyan-500 p-3.5 shadow-xl border border-white/25 flex flex-col justify-between"
      >
        <div
          style={{
            background: `radial-gradient(circle at ${rot.gx}% ${rot.gy}%, rgba(255,255,255,0.35), transparent 60%)`,
          }}
          className="pointer-events-none absolute inset-0"
        />
        <span className="relative z-10 text-[10px] font-mono text-white/80">{t("sample.tilt3DCard.title")}</span>
        <span className="relative z-10 text-xs font-black text-white">{t("demo.tiltsIn3dWithYourCursor")}</span>
      </div>
    </div>
  );
};


export const GlassmorphismDemo: React.FC = () => {
  const { t } = useLocale();
  return (
    <div className="relative w-full h-40 flex items-center justify-center overflow-hidden select-none">
      <div className="w-16 h-16 rounded-full bg-pink-500 blur-md absolute animate-glass-orb-1" />
      <div className="w-16 h-16 rounded-full bg-cyan-400 blur-md absolute animate-glass-orb-2" />
      <div className="relative z-10 w-52 h-24 rounded-2xl bg-white/10 backdrop-blur-md border border-white/25 shadow-xl p-3.5 flex flex-col justify-between">
        <span className="text-[10px] font-mono text-white/80">{t("sample.glassmorphism.frostedGlass")}</span>
        <span className="text-xs font-bold text-white">{t("demo.glassWithSoftlyGlowingBackgroundLight")}</span>
      </div>
    </div>
  );
};


export const SpotlightBorderCardDemo: React.FC = () => {
  const { t } = useLocale();
  const [isTracking, setIsTracking] = useState(false);
  const [pos, setPos] = useDemoSample({ x: 100, y: 45 }, phase => ({ x: 100 + Math.sin(phase * Math.PI * 2) * 65, y: 45 + Math.sin(phase * Math.PI * 4) * 20 }), isTracking);
  return (
    <div className="w-full h-40 flex items-center justify-center select-none">
      <div
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setIsTracking(true);
          setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }}
        onMouseLeave={() => setIsTracking(false)}
        style={{
          background: `radial-gradient(120px circle at ${pos.x}px ${pos.y}px, rgba(129,140,248,0.42), rgba(15,23,42,0.95) 80%)`,
        }}
        className="w-56 h-24 rounded-xl border border-indigo-400/40 p-3.5 flex flex-col justify-between cursor-pointer"
      >
        <span className="text-[10px] font-mono text-indigo-300">{t("sample.spotlightBorderCard.radialSpotlight")}</span>
        <span className="text-xs font-bold text-white">{t("demo.moveYourMouseOverTheCard")}</span>
      </div>
    </div>
  );
};


export const StackedCardCycleDemo: React.FC = () => {
  const { t } = useLocale();
  const [cards, setCards] = useState([
    { id: 1, labelKey: "demo.card1ClickToCycle" as const, color: 'from-indigo-600 to-purple-600' },
    { id: 2, labelKey: "demo.card2ClickToCycle" as const, color: 'from-emerald-600 to-teal-600' },
    { id: 3, labelKey: "demo.card3ClickToCycle" as const, color: 'from-rose-600 to-orange-500' },
  ]);
  useDemoPulse(() => setCards(previous => [...previous.slice(1), previous[0]]));

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setCards((prev) => [...prev.slice(1), prev[0]])} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setCards((prev) => [...prev.slice(1), prev[0]]); } }}
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
          <span className="text-[10px] font-mono text-white/80">{t("sample.stackedCardCycle.stackedDeck")}</span>
          <span className="text-xs font-black text-white">{t(c.labelKey)}</span>
        </div>
      ))}
    </div>
  );
};


export const SpringBounceDemo: React.FC = () => {
  const { t } = useLocale();
  const [popKey, setPopKey] = useState(1);
  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setPopKey((k) => k + 1)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPopKey((k) => k + 1); } }}
      className="w-full h-40 flex flex-col items-center justify-center cursor-pointer select-none"
    >
      <div
        key={popKey}
        className="animate-spring-pop bg-linear-to-br from-amber-400 to-orange-500 text-slate-950 px-5 py-2.5 rounded-2xl shadow-lg font-black text-xs"
      >
        {t("demo.aSpringyBounce")}
      </div>
    </div>
  );
};


export const StaggeredListDemo: React.FC = () => {
  const { t } = useLocale();
  const [replayKey, setReplayKey] = useState(0);
  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setReplayKey((k) => k + 1)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setReplayKey((k) => k + 1); } }}
      className="w-full h-40 flex flex-col justify-center px-6 pt-5 cursor-pointer select-none"
    >
      <div key={replayKey} className="space-y-1.5">
        {[t("demo.stagger.firstItem"), t("demo.stagger.secondItem"), t("demo.stagger.thirdItem")].map((label, i) => (
          <div
            key={i}
            style={{
              animation: `stagger-up 0.42s cubic-bezier(0.16, 1, 0.3, 1) ${i * 100}ms backwards`,
            }}
            className="bg-slate-800/90 border border-slate-700 rounded-lg px-3 py-1 text-[11px] text-slate-200 flex items-center justify-between"
          >
            <span>{label}</span>
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


export const SmoothAccordionDemo: React.FC = () => { const panelId = useId();
  const { t } = useLocale();
  const [open, setOpen] = useDemoToggle(true);
  return (
    <div className="w-full h-40 flex items-center justify-center px-5 select-none">
      <div data-demo-control
        onClick={() => setOpen(!open)}
        role="button" tabIndex={0} aria-expanded={open} aria-controls={panelId} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(!open); } }}
        className="w-full rounded-xl bg-slate-900 border border-slate-700 p-3 cursor-pointer"
      >
        <div className="flex items-center justify-between text-xs font-bold text-white">
          <span>{t("demo.clickToCollapseExpand")}</span>
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
          <div id={panelId} aria-hidden={!open} className="overflow-hidden text-[11px] text-indigo-300">{t("demo.opensAndClosesWithASmooth")}</div>
        </div>
      </div>
    </div>
  );
};


export const MorphingStateButtonDemo: React.FC = () => {
  const { t } = useLocale();
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
  useDemoPulse(trigger);

  return (
    <div className="w-full h-40 flex flex-col items-center justify-center select-none">
      <button
        type="button" aria-busy={status === 'loading'} aria-label={status === 'loading' ? t('actions.copying') : undefined} onClick={trigger}
        className={`h-10 rounded-full font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-300 ${
          status === 'idle'
            ? 'w-36 bg-indigo-600 text-white'
            : status === 'loading'
            ? 'w-10 bg-slate-800 text-indigo-400 border border-indigo-500/40'
            : 'w-32 bg-emerald-500 text-slate-950'
        }`}
      >
        {status === 'idle' && <span>{t("demo.clickToChangeState")}</span>}
        {status === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
        {status === 'done' && (
          <>
            <Check className="w-4 h-4" />
            <span>{t("demo.doneClickAgain")}</span>
          </>
        )}
      </button>
    </div>
  );
};


export const FloatingLevitationDemo: React.FC = () => {
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center select-none">
      <div className="animate-float-bob w-12 h-12 rounded-2xl bg-linear-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg">
        <Zap className="w-6 h-6 text-slate-950 fill-current" />
      </div>
      <div className="mt-3 w-10 h-1.5 rounded-full bg-indigo-400/50 blur-[2px] animate-shadow-breathe" />
    </div>
  );
};


export const TypewriterDemo: React.FC = () => {
  const { t } = useLocale();
  const text = t("demo.textAppearsOneCharacterAtA");
  const [displayed, setDisplayed] = useState('');
  const [runId, setRunId] = useState(0);
  const autoRunning = useDemoAutoplayRunning();

  useEffect(() => {
    if (!autoRunning) { setDisplayed(text); return; }
    setDisplayed('');
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(t);
    }, 55);
    return () => clearInterval(t);
  }, [runId, text, autoRunning]);

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setRunId((r) => r + 1)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setRunId((r) => r + 1); } }}
      className="w-full h-40 flex flex-col items-center justify-center px-5 cursor-pointer select-none"
    >
      <div className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-3 font-mono text-xs text-emerald-300">
        {displayed}
        <span className="inline-block w-1.5 h-3.5 ml-0.5 align-middle bg-emerald-400 animate-pulse" />
      </div>
    </div>
  );
};


export const ScrambleDecodeDemo: React.FC = () => {
  const target = 'VIBE DICTIONARY';
  const chars = '!<>-_\\/[]{}—=+*^?#01';
  const [output, setOutput] = useState(target);
  const [trigger, setTrigger] = useState(0); const autoRunning = useDemoAutoplayRunning();

  useEffect(() => {
    if (!autoRunning) { setOutput(target); return; }
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
  }, [trigger, autoRunning]);

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setTrigger((t) => t + 1)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setTrigger((t) => t + 1); } }}
      className="w-full h-40 flex flex-col items-center justify-center cursor-pointer select-none"
    >
      <span className="font-mono text-sm font-black tracking-widest text-cyan-300 bg-slate-900 border border-cyan-500/30 px-4 py-2 rounded-xl">
        {output}
      </span>
    </div>
  );
};


export const GradientFlowTextDemo: React.FC = () => {
  const { t } = useLocale();
  return (
    <div className="w-full h-40 flex items-center justify-center select-none px-4">
      <span
        style={{
          backgroundImage:
            'linear-gradient(90deg, #6366f1, #ec4899, #d97706, #059669, #6366f1)',
        }}
        className="text-xl font-black bg-clip-text text-transparent animate-gradient-flow"
      >{t("sample.gradientFlowText.auroraFlowingText")}</span>
    </div>
  );
};


export const SlotNumberTickerDemo: React.FC = () => {
  const [target, setTarget] = useState(2480);
  const [val, setVal] = useState(0);
  const autoRunning = useDemoAutoplayRunning();

  useEffect(() => {
    if (!autoRunning) { setVal(target); return; }
    const start = val === target ? 0 : val;
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
  }, [target, autoRunning]);

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setTarget((t) => t + Math.floor(Math.random() * 1200 + 400))} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setTarget((t) => t + Math.floor(Math.random() * 1200 + 400)); } }}
      className="w-full h-40 flex flex-col items-center justify-center cursor-pointer select-none"
    >
      <span className="text-2xl font-mono font-black text-white">
        {val.toLocaleString()}
      </span>
    </div>
  );
};


export const MarkerHighlightDrawDemo: React.FC = () => { const autoRunning = useDemoAutoplayRunning();
  const { t } = useLocale();
  const [drawn, setDrawn] = useDemoToggle(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!autoRunning) { setDrawn(true); return; }
    setDrawn(false);
    timer.current = setTimeout(() => { timer.current = null; setDrawn(true); }, 200);
    return () => { if (timer.current !== null) clearTimeout(timer.current); timer.current = null; };
  }, [autoRunning]);

  const replay = () => {
    if (timer.current !== null) clearTimeout(timer.current);
    if (!autoRunning) { timer.current = null; setDrawn(true); return; }
    setDrawn(false);
    timer.current = setTimeout(() => { timer.current = null; setDrawn(true); }, 120);
  };

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={replay} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); replay(); } }}
      className="w-full h-40 flex flex-col items-center justify-center cursor-pointer select-none px-4"
    >
      <p className="text-xs font-bold text-slate-200">{t("demo.draw")}{' '}
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
          {t("demo.aHighlightBehindKeyWords")}
        </span>{' '}
        {t("demo.inASentence")}
      </p>
    </div>
  );
};


export const ConfettiBurstDemo: React.FC = () => {
  const { t } = useLocale();
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
  useDemoPulse(fire);

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
      >{t("demo.burstConfettiClick")}</button>
    </div>
  );
};


export const ErrorShakeDemo: React.FC = () => {
  const { t } = useLocale();
  const [shaking, setShaking] = useState(false);
  const [showTip, setShowTip] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timerRef.current !== null) clearTimeout(timerRef.current); }, []);

  const trigger = () => {
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    setShaking(false);
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      setShaking(true);
      setShowTip(true);
    }, 15);
  };

  return (
    <div className="w-full h-40 flex flex-col items-center justify-center px-6 pt-5 select-none">
      {showTip && (
        <div className="mb-2 animate-float-bob bg-amber-400 text-slate-950 text-[10px] font-extrabold px-2.5 py-1 rounded-md shadow-sm">{t("demo.pleaseCheckTheValue")}</div>
      )}
      <div data-demo-control
        role="button" tabIndex={0} onClick={trigger} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trigger(); } }}
        className={`w-full rounded-xl bg-slate-900 border-2 px-3.5 py-2 flex items-center justify-between cursor-pointer ${
          shaking
            ? 'animate-error-shake border-rose-500 bg-rose-950/30'
            : 'border-slate-700 hover:border-rose-500/60'
        }`}
      >
        <span className="text-xs font-mono text-rose-300">{t("sample.errorShake.invalidInput")}</span>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-rose-500/20 text-rose-300">{t("demo.clickToShake")}</span>
      </div>
    </div>
  );
};


export const HeartLikeBurstDemo: React.FC = () => { const { t } = useLocale();
  const [burstId, setBurstId] = useState(1);
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center select-none">
      <button
        type="button" aria-label={t('demo.clickTheHeart')} onClick={() => setBurstId((id) => id + 1)}
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
    </div>
  );
};


export const ToastSlideStackDemo: React.FC = () => {
  const { t } = useLocale();
  const [toasts, setToasts] = useState([{ id: 1, number: null as number | null }]);

  const pushToast = () => {
    setToasts((prev) => { const nextId = Math.max(Date.now(), (prev[prev.length - 1]?.id ?? 0) + 1); return [...prev.slice(-1), { id: nextId, number: (nextId % 90) + 10 }]; });
  };
  useDemoPulse(pushToast);

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={pushToast} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pushToast(); } }}
      className="w-full h-40 flex flex-col justify-end pt-9 pb-3 px-4 cursor-pointer select-none"
    >
      <div className="space-y-1">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="animate-toast-slide-up w-full bg-slate-900 border border-indigo-500/40 rounded-xl px-3 py-1.5 shadow-lg flex items-center gap-2"
          >
            <Bell className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="text-xs font-bold text-white">{toast.number === null ? t('demo.savedSuccessfully') : t('demo.toast.newNotification', { number: toast.number })}</span>
          </div>
        ))}
      </div>
    </div>
  );
};


export const SlidingPillTabsDemo: React.FC = () => {
  const { t } = useLocale();
  const [activeIdx, setActiveIdx] = useDemoNumber(0, 0, 2, 1, 'steps');
  const tabs = [t("demo.home"), t("demo.trending"), t("demo.settings")];
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


export const InfiniteMarqueeDemo: React.FC = () => { const { t } = useLocale();
  const items = [t("sample.infiniteMarquee.react"), t("sample.infiniteMarquee.motion"), t("sample.infiniteMarquee.tailwind"), t("sample.infiniteMarquee.spring"), t("sample.infiniteMarquee.ui3d"), t("sample.infiniteMarquee.vibe")];
  return (
    <div className="w-full h-40 flex items-center overflow-hidden select-none">
      <div className="flex w-max animate-marquee-left">
        {[0, 1].map((copyIdx) => (<div key={copyIdx} aria-hidden={copyIdx === 1 || undefined} className="flex shrink-0 items-center gap-2 pr-2">{items.map((tag, i) => (
          <span
            key={i}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-indigo-300"
          >
            #{tag}</span>))}</div>))}
      </div>
    </div>
  );
};


export const SkeletonShimmerDemo: React.FC = () => {
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


export const SpotlightFocusDemo: React.FC = () => {
  const { t } = useLocale();
  const [focusIdx, setFocusIdx] = useState(1);
  useDemoPulse(() => setFocusIdx(value => (value + 1) % 3));
  return (
    <div className="w-full h-40 flex items-center justify-center px-6 pt-5 select-none">
      <div className="w-full space-y-1.5">
        {[t("demo.focus.topMenu"), t("demo.focus.mainContent"), t("demo.focus.bottomInfo")].map(
          (label, i) => (
            <div data-demo-control
              key={i}
              role="button" tabIndex={0} aria-pressed={focusIdx === i} onClick={() => setFocusIdx((i + 1) % 3)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFocusIdx((i + 1) % 3); } }}
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


export const BeforeAfterSliderDemo: React.FC = () => {
  const { t } = useLocale();
  const [pos, setPos] = useDemoNumber(55, 10, 90, 1);
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center px-6 select-none">
      <div className="relative w-full h-24 rounded-xl overflow-hidden border border-slate-700">
        <div className="absolute inset-0 bg-linear-to-r from-indigo-600 to-cyan-500 flex items-center justify-end pr-4 text-xs font-black text-white">{t("sample.beforeAfterSlider.after")}</div>
        <div
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          className="absolute inset-0 bg-slate-900 flex items-center pl-4 text-xs font-black text-slate-400"
        >{t("sample.beforeAfterSlider.before")}</div>
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
          data-demo-scrubber aria-label={t('demo.beforeAfterSlider')}
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


export const DragSnapSlotDemo: React.FC = () => {
  const { t } = useLocale();
  const [selected, setSelected] = useState('Motion');
  const chips = ['Motion', '3D UI', 'Spring'];
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center px-5 select-none gap-2.5">
      <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2">
        <span className="text-xs text-slate-400">{t("demo.selectedSlot")}</span>
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


export const ElasticToggleSwitchDemo: React.FC = () => {
  const { t } = useLocale();
  const [on, setOn] = useDemoToggle(true);
  const [stretching, setStretching] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current !== null) clearTimeout(timer.current); }, []);

  const toggle = () => {
    setStretching(true);
    setOn(!on);
    if (timer.current !== null) clearTimeout(timer.current);
    timer.current = setTimeout(() => { timer.current = null; setStretching(false); }, 220);
  };

  return (
    <div className="w-full h-40 flex flex-col items-center justify-center select-none">
      <button
        type="button" role="switch" aria-label={t('demo.elasticSwitch')} aria-checked={on}
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
    </div>
  );
};


export const ComboGaugeDemo: React.FC = () => {
  const { t } = useLocale();
  const [count, setCount] = useState(3);
  useDemoPulse(() => setCount(value => value + 1));
  const pct = ((count % 5) + 1) * 20;
  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setCount((c) => c + 1)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setCount((c) => c + 1); } }}
      className="w-full h-40 flex flex-col items-center justify-center px-6 pt-4 cursor-pointer select-none"
    >
      <div className="flex items-center justify-between w-full mb-2">
        <span
          key={count}
          className="animate-combo-pop inline-flex items-center gap-1 bg-orange-500 text-slate-950 font-black text-xs px-2.5 py-0.5 rounded-full"
        >
          <Flame className="w-3.5 h-3.5 fill-current" />{t("sample.comboGauge.comboX")}{count}
        </span>
        <span className="text-xs font-mono font-bold text-emerald-400">{pct}%</span>
      </div>
      <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
        <div
          style={{ width: `${pct}%` }}
          className="h-full bg-linear-to-r from-indigo-500 to-emerald-400 transition-all duration-300"
        />
      </div>
    </div>
  );
};


/* ============================================================================
 * DOMAIN 2: 🎬 그래픽 & 모션 연출 데모 (22종)
 * ============================================================================ */

/* 1. 스쿼시 앤 스트레치 */
export const MgSquashStretchDemo: React.FC = () => {
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center select-none pt-6">
      <div className="w-10 h-10 rounded-full bg-linear-to-b from-amber-300 to-orange-500 shadow-lg shadow-orange-500/30 animate-squash-bounce" />
      <div className="mt-[18px] w-16 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600" />
    </div>
  );
};


/* 2. 앤티시페이션 (예비 동작) */
export const MgAnticipationDemo: React.FC = () => {
  const [runKey, setRunKey] = useState(0);
  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setRunKey((k) => k + 1)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setRunKey((k) => k + 1); } }}
      className="w-full h-40 flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden"
    >
      <div
        key={runKey}
        className="animate-anticipation-launch w-12 h-10 rounded-xl bg-linear-to-r from-rose-500 to-amber-400 flex items-center justify-center shadow-lg"
      >
        <Rocket className="w-5 h-5 text-slate-950 rotate-45" />
      </div>
    </div>
  );
};


/* 3. 팔로우 스루 & 딜레이 트레일 */
export const MgFollowTrailDemo: React.FC = () => {
  const [right, setRight] = useState(true); const autoRunning = useDemoAutoplayRunning();

  useEffect(() => {
    if (!autoRunning) return; const t = setInterval(() => setRight((r) => !r), 1400);
    return () => clearInterval(t);
  }, [autoRunning]);

  const delays = [0, 55, 110, 165];

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setRight(!right)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setRight(!right); } }}
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
    </div>
  );
};


/* 4. 이징 속도 곡선 비교 */
export const MgEasingCurvesDemo: React.FC = () => { const autoRunning = useDemoAutoplayRunning();
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (!autoRunning) return; const t = setInterval(() => setActive((a) => !a), 1600);
    return () => clearInterval(t);
  }, [autoRunning]);

  const tracks = [
    { name: 'Linear', easing: 'linear', color: 'bg-slate-400' },
    { name: 'Ease-Out', easing: 'cubic-bezier(0.16, 1, 0.3, 1)', color: 'bg-cyan-400' },
    { name: 'Spring', easing: 'cubic-bezier(0.34, 1.30, 0.64, 1)', color: 'bg-amber-400' },
  ];

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setActive(!active)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(!active); } }}
      className="w-full h-40 flex flex-col justify-center px-6 pt-5 gap-2 cursor-pointer select-none"
    >
      {tracks.map((track) => (
        <div key={track.name} className="flex items-center gap-2">
          <span className="w-14 text-[10px] font-mono text-slate-400">{track.name}</span>
          <div className="relative flex-1 h-5 bg-slate-900 rounded-full border border-slate-800 flex items-center overflow-hidden">
            <div
              style={{
                transition: `left 0.9s ${track.easing}`,
                left: active ? 'calc(100% - 22px)' : '8px',
              }}
              className={`absolute w-3.5 h-3.5 rounded-full ${track.color}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};


/* 5. SVG 패스 라인 드로잉 */
export const MgSvgLineDrawDemo: React.FC = () => {
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center pt-4 select-none">
      <svg className="w-20 h-20" viewBox="0 0 100 100">
        <path
          d="M50 10 L63 36 L92 40 L71 60 L76 89 L50 75 L24 89 L29 60 L8 40 L37 36 Z" fill="rgba(99, 102, 241, 0.25)"
          pathLength="1"
          stroke="#818cf8"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-svg-draw"
        />
      </svg>
    </div>
  );
};


/* 6. 리퀴드 블롭 모핑 */
export const MgLiquidBlobMorphDemo: React.FC = () => {
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center pt-4 select-none">
      <div className="w-20 h-20 bg-linear-to-tr from-fuchsia-500 via-indigo-500 to-cyan-400 shadow-lg shadow-indigo-500/30 animate-liquid-morph" />
    </div>
  );
};


/* 7. 구이 메타볼 퓨전 (SVG Gooey Filter) */
export const MgGooeyMetaballDemo: React.FC = () => {
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
    </div>
  );
};


/* 8. 플래니터리 오빗 궤도 회전 */
export const MgOrbitRotationDemo: React.FC = () => {
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
export const MgKineticWaveTextDemo: React.FC = () => {
  const { t } = useLocale(); const chars = t("sample.mgKineticWaveText.word").split('');
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
    </div>
  );
};


/* 10. 버티컬 키네틱 텍스트 롤러 */
export const Mg3DTextRollerDemo: React.FC = () => {
  const { t } = useLocale();
  const words = [t("sample.mg3DTextRoller.motion"), t("sample.mg3DTextRoller.graphics"), t("sample.mg3DTextRoller.cinema"), t("sample.mg3DTextRoller.interaction")]; const autoRunning = useDemoAutoplayRunning();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!autoRunning) return; const t = setInterval(() => setIdx((i) => (i + 1) % words.length), 1400);
    return () => clearInterval(t);
  }, [autoRunning]);

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setIdx((i) => (i + 1) % words.length)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIdx((i) => (i + 1) % words.length); } }}
      className="w-full h-40 flex flex-col items-center justify-center cursor-pointer select-none"
    >
      <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
        <span>{t("sample.mg3DTextRoller.create")}</span>
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
    </div>
  );
};


/* 11. 네온 사인 플리커 점등 */
export const MgNeonSignFlickerDemo: React.FC = () => {
  const { t } = useLocale();
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center select-none">
      <div className="px-4 py-2 rounded-xl bg-slate-950 border border-rose-500/30 font-mono text-lg font-black tracking-widest text-rose-400">
        <span>{t("sample.mgNeonSignFlicker.open")}</span>
        <span className="animate-neon-flicker text-rose-300">{t("sample.mgNeonSignFlicker.hours")}</span>
      </div>
    </div>
  );
};


/* 12. 2.5D 멀티레이어 패럴랙스 */
export const MgParallaxDepthDemo: React.FC = () => {
  const { t } = useLocale();
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
        <span className="text-[9px] text-slate-500 font-mono">{t("sample.mgParallaxDepth.bg04x")}</span>
      </div>
      {/* 중경 레이어 (중간) */}
      <div
        style={{ transform: `translate(${pos.x * 1.1}px, ${pos.y * 1.1}px)` }}
        className="absolute w-28 h-14 rounded-xl bg-indigo-950/90 border border-indigo-500/40 flex items-start justify-end p-1.5 shadow-lg transition-transform duration-75"
      >
        <span className="text-[9px] text-indigo-300 font-mono">{t("sample.mgParallaxDepth.mid11x")}</span>
      </div>
      {/* 전경 레이어 (빠름) */}
      <div
        style={{ transform: `translate(${pos.x * 2.1}px, ${pos.y * 2.1}px)` }}
        className="absolute px-3 py-1.5 rounded-lg bg-cyan-400 text-slate-950 font-black text-xs shadow-xl transition-transform duration-75"
      >{t("sample.mgParallaxDepth.fg21x")}</div>
    </div>
  );
};


/* 13. 카메라 랙 포커스 (초점 심도 전환) */
export const MgRackFocusBlurDemo: React.FC = () => {
  const { t } = useLocale();
  const [focusFront, setFocusFront] = useDemoToggle(true);
  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setFocusFront(!focusFront)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFocusFront(!focusFront); } }}
      className="relative w-full h-40 flex items-center justify-center cursor-pointer select-none px-6 pt-5"
    >
      {/* 배경 피사체 (상단 배지와 겹치지 않도록 top-10 및 z-10 이하로 배치) */}
      <div
        className={`absolute right-7 top-10 px-3.5 py-2 rounded-xl bg-violet-600 text-white font-bold text-xs transition-all duration-500 ${
          !focusFront
            ? 'blur-0 scale-105 opacity-100 z-10 ring-2 ring-violet-300 shadow-xl'
            : 'blur-xs scale-90 opacity-45 z-0'
        }`}
      >{t("demo.backgroundSubjectBack")}</div>
      {/* 전경 피사체 */}
      <div
        className={`absolute left-7 bottom-4 px-3.5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs transition-all duration-500 ${
          focusFront
            ? 'blur-0 scale-105 opacity-100 z-10 ring-2 ring-emerald-200 shadow-xl'
            : 'blur-xs scale-90 opacity-45 z-0'
        }`}
      >{t("demo.foregroundSubjectClickToSwitch")}</div>
    </div>
  );
};


/* 14. 시네마틱 켄 번즈 (줌 & 패닝) */
export const MgKenBurnsPanDemo: React.FC = () => {
  const { t } = useLocale();
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center select-none px-6">
      <div className="relative w-52 h-24 rounded-xl overflow-hidden border border-slate-700">
        <div className="w-full h-full bg-linear-to-br from-indigo-900 via-purple-900 to-amber-700 animate-ken-burns flex items-center justify-center">
          <div className="text-center">
            <span className="text-[10px] font-mono text-amber-200 block">{t("sample.mgKenBurnsPan.cameraPanZoom")}</span>
            <span className="text-xs font-black text-white">{t("sample.mgKenBurnsPan.kenBurnsEffect")}</span>
          </div>
        </div>
        {/* 카메라 뷰파인더 가이드 */}
        <div className="pointer-events-none absolute inset-2 border border-white/25 rounded-sm flex items-start justify-between p-1">
          <span className="text-[8px] font-mono text-rose-400">{t("sample.mgKenBurnsPan.rec")}</span>
        </div>
      </div>
    </div>
  );
};


/* 15. 아이소메트릭 레이어 익스플로드 */
export const MgIsometricExplodeDemo: React.FC = () => { const { t } = useLocale();
  const [isHovering, setIsHovering] = useState(false);
  const [exploded, setExploded] = useDemoToggle(true, isHovering);
  const layers = [
    { label: t("sample.mgIsometricExplode.l1"), color: 'bg-slate-800/95 border-slate-500 text-slate-300' },
    { label: t("sample.mgIsometricExplode.l2"), color: 'bg-indigo-600/85 border-indigo-300 text-white' },
    { label: t("sample.mgIsometricExplode.l3"), color: 'bg-cyan-400/90 border-white text-slate-950' },
  ];
  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setExploded(!exploded)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExploded(!exploded); } }}
      onMouseEnter={() => { setIsHovering(true); setExploded(true); }}
      onMouseLeave={() => { setIsHovering(false); setExploded(false); }}
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
    </div>
  );
};


/* 16. 서큘러 아이리스 와이프 전환 */
export const MgIrisCircleWipeDemo: React.FC = () => {
  const { t } = useLocale();
  const [closed, setClosed] = useDemoToggle(false);
  return (
    <button type="button" data-demo-control
      aria-label={t('demo.closeIrisAperture')} aria-pressed={closed}
      onClick={() => setClosed(!closed)}
      className="w-full h-40 flex flex-col items-center justify-center cursor-pointer select-none px-6 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-indigo-500"
    >
      <div className="relative w-52 h-24 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 flex items-center justify-center">
        <span className="text-xs font-bold text-slate-400">{t("demo.scene2ClickToOpen")}</span>
        <div
          style={{
            clipPath: closed ? 'circle(0% at 50% 50%)' : 'circle(120% at 50% 50%)',
            transition: 'clip-path 0.65s cubic-bezier(0.65, 0, 0.35, 1)',
          }}
          className="absolute inset-0 bg-linear-to-r from-indigo-600 to-emerald-500 flex items-center justify-center"
        >
          <span className="text-xs font-black text-white">{t("demo.scene1ClickToCloseIris")}</span>
        </div>
      </div>
    </button>
  );
};


/* 17. RGB 색수차 글리치 */
export const MgRgbChromaticGlitchDemo: React.FC = () => {
  const { t } = useLocale();
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center select-none">
      <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800">
        <span className="font-mono text-lg font-black tracking-wider text-white inline-block animate-rgb-glitch">{t("sample.mgRgbChromaticGlitch.cyberGlitch")}</span>
      </div>
    </div>
  );
};


/* 18. 스피드 라인 & 모션 스트리크 */
export const MgSpeedLinesStreakDemo: React.FC = () => {
  const { t } = useLocale();
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
      <div className="relative z-10 px-4 py-1.5 rounded-full bg-indigo-600 text-white font-black text-xs italic shadow-lg">{t("sample.mgSpeedLinesStreak.hyperSpeed")}</div>
    </div>
  );
};


/* 19. 오로라 메쉬 그라데이션 */
export const MgAuroraMeshDemo: React.FC = () => {
  const { t } = useLocale();
  return (
    <div className="relative w-full h-40 flex items-center justify-center overflow-hidden select-none bg-slate-950">
      <div className="w-32 h-32 rounded-full bg-indigo-500/60 blur-2xl absolute animate-aurora-1" />
      <div className="w-32 h-32 rounded-full bg-emerald-400/50 blur-2xl absolute animate-aurora-2" />
      <div className="w-28 h-28 rounded-full bg-fuchsia-500/50 blur-2xl absolute animate-glass-orb-1" />
      <span className="relative z-10 text-xs font-black tracking-wider text-white/90 bg-slate-950/40 backdrop-blur-xs px-3 py-1 rounded-full border border-white/15">{t("sample.mgAuroraMesh.auroraMesh")}</span>
    </div>
  );
};


/* 20. 컨스텔레이션 파티클 네트워크 */
export const MgParticleNetworkDemo: React.FC = () => {
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
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setHoverIdx((h) => (h + 1) % nodes.length)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setHoverIdx((h) => (h + 1) % nodes.length); } }}
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
export const MgDotMatrixGridDemo: React.FC = () => {
  const { t } = useLocale();
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
      <div role="button" tabIndex={0} aria-label={t('demo.dotMatrixColumn', { column: activeCol + 1, total: cols })} onKeyDown={(e) => { if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveCol((c) => (c + 1) % cols); } else if (e.key === 'ArrowLeft') { e.preventDefault(); setActiveCol((c) => (c + cols - 1) % cols); } }} className="grid grid-cols-9 gap-2.5 p-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
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
                  : 'bg-slate-300 dark:bg-slate-800'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};


/* 22. 볼류메트릭 스포트라이트 빔 (God Rays) */
export const MgGodRayBeamDemo: React.FC = () => {
  return (
    <div className="relative w-full h-40 flex flex-col items-center justify-center overflow-hidden select-none bg-slate-950">
      <div
        style={{
          background:
            'conic-gradient(from 155deg at 50% 0%, transparent 0deg, rgba(56,189,248,0.35) 25deg, transparent 50deg)',
        }}
        className="pointer-events-none absolute -top-6 w-64 h-48 blur-md animate-beam-sway"
      />
    </div>
  );
};


/* ============================================================================
 * DOMAIN 3: 레이아웃 & 공간 구조 데모 (16종)
 * ============================================================================ */

/* 1. 벤토 그리드 (Bento Grid) */
export const LyBentoGridDemo: React.FC = () => {
  const { t } = useLocale();
  const [activeTile, setActiveTile] = useState(0);
  return (
    <div className="w-full h-40 flex items-center justify-center px-5 pt-6 select-none">
      <div className="w-full h-24 grid grid-cols-4 grid-rows-2 gap-1.5">
        <div data-demo-control
          role="button" tabIndex={0} onClick={() => setActiveTile(0)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveTile(0); } }}
          className={`col-span-2 row-span-2 rounded-xl p-2.5 flex flex-col justify-between cursor-pointer border transition-all ${
            activeTile === 0
              ? 'bg-indigo-600/30 border-indigo-400 text-white'
              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
          }`}
        >
          <span className="text-[9px] font-mono text-indigo-300">{t("sample.lyBentoGrid.mainTile")}</span>
          <span className="text-xs font-extrabold">{t("sample.lyBentoGrid.bentoHero")}</span>
        </div>
        <div data-demo-control
          role="button" tabIndex={0} onClick={() => setActiveTile(1)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveTile(1); } }}
          className={`col-span-2 row-span-1 rounded-xl px-2.5 py-1 flex items-center justify-between cursor-pointer border transition-all ${
            activeTile === 1
              ? 'bg-emerald-600/30 border-emerald-400 text-white'
              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
          }`}
        >
          <span className="text-[10px] font-bold">{t("sample.lyBentoGrid.wideTile")}</span>
          <span className="text-[9px] font-mono text-emerald-300">{t("sample.lyBentoGrid.wideTile")}</span>
        </div>
        <div data-demo-control
          role="button" tabIndex={0} onClick={() => setActiveTile(2)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveTile(2); } }}
          className={`col-span-1 row-span-1 rounded-xl flex items-center justify-center cursor-pointer border text-[10px] font-bold transition-all ${
            activeTile === 2
              ? 'bg-amber-500/30 border-amber-400 text-amber-200'
              : 'bg-slate-900 border-slate-800 text-slate-400'
          }`}
        >{t("sample.lyBentoGrid.smallTile")}</div>
        <div data-demo-control
          role="button" tabIndex={0} onClick={() => setActiveTile(3)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveTile(3); } }}
          className={`col-span-1 row-span-1 rounded-xl flex items-center justify-center cursor-pointer border text-[10px] font-bold transition-all ${
            activeTile === 3
              ? 'bg-pink-500/30 border-pink-400 text-pink-200'
              : 'bg-slate-900 border-slate-800 text-slate-400'
          }`}
        >{t("sample.lyBentoGrid.smallTile")}</div>
      </div>
    </div>
  );
};


/* 2. 메이슨리 폭포수 그리드 (Masonry Waterfall) */
export const LyMasonryWaterfallDemo: React.FC = () => {
  const { t } = useLocale();
  const [shuffled, setShuffled] = useDemoToggle(false);
  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setShuffled(!shuffled)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setShuffled(!shuffled); } }}
      className="w-full h-40 flex flex-col items-center justify-center px-6 pt-5 cursor-pointer select-none"
    >
      <div className="w-full grid grid-cols-3 gap-1.5 items-start">
        <div className="space-y-1.5">
          <div className={`${shuffled ? 'h-8' : 'h-12'} rounded-lg bg-indigo-500/30 border border-indigo-500/50 transition-all duration-300 flex items-center justify-center text-[9px] font-mono text-indigo-200`}>{t("sample.lyMasonryWaterfall.h1")}</div>
          <div className={`${shuffled ? 'h-12' : 'h-7'} rounded-lg bg-slate-800 border border-slate-700 transition-all duration-300 flex items-center justify-center text-[9px] font-mono text-slate-400`}>{t("sample.lyMasonryWaterfall.h2")}</div>
        </div>
        <div className="space-y-1.5">
          <div className={`${shuffled ? 'h-12' : 'h-7'} rounded-lg bg-slate-800 border border-slate-700 transition-all duration-300 flex items-center justify-center text-[9px] font-mono text-slate-400`}>{t("sample.lyMasonryWaterfall.h3")}</div>
          <div className={`${shuffled ? 'h-8' : 'h-12'} rounded-lg bg-cyan-500/30 border border-cyan-500/50 transition-all duration-300 flex items-center justify-center text-[9px] font-mono text-cyan-200`}>{t("sample.lyMasonryWaterfall.h4")}</div>
        </div>
        <div className="space-y-1.5">
          <div className={`${shuffled ? 'h-10' : 'h-11'} rounded-lg bg-fuchsia-500/30 border border-fuchsia-500/50 transition-all duration-300 flex items-center justify-center text-[9px] font-mono font-bold text-fuchsia-800 dark:text-fuchsia-200`}>{t("sample.lyMasonryWaterfall.h5")}</div>
          <div className={`${shuffled ? 'h-11' : 'h-9'} rounded-lg bg-slate-800 border border-slate-700 transition-all duration-300 flex items-center justify-center text-[9px] font-mono text-slate-400`}>{t("sample.lyMasonryWaterfall.h6")}</div>
        </div>
      </div>
    </div>
  );
};


/* 3. 매거진 비대칭 오버랩 (Asymmetric Editorial) */
export const LyEditorialAsymmetricDemo: React.FC = () => {
  const { t } = useLocale();
  const [isHovering, setIsHovering] = useState(false);
  const [hovered, setHovered] = useDemoToggle(false, isHovering);
  return (
    <div data-demo-control
      onMouseEnter={() => { setIsHovering(true); setHovered(true); }}
      onMouseLeave={() => { setIsHovering(false); setHovered(false); }}
      role="button" tabIndex={0} onClick={() => setHovered(!hovered)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setHovered(!hovered); } }}
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
        <span className="text-[9px] font-mono text-amber-300">{t("sample.lyEditorialAsymmetric.issue04")}</span>
        <p className="text-xs font-black text-white leading-tight">{t("sample.lyEditorialAsymmetric.editorialOverlap")}</p>
      </div>
    </div>
  );
};


/* 4. 허니컴 육각형 타일 (Honeycomb Grid) - 라이트/다크 모드 고대비 벡터 타일 */
export const LyHoneycombHexDemo: React.FC = () => {
  const { t } = useLocale();
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
      <div data-demo-control
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
        aria-pressed={active} aria-label={t("demo.honeycomb.cellLabel", { name: item.label })}
        style={{
          /* outline preserved for focus-visible */
          border: 'none',
          WebkitTapHighlightColor: 'transparent',
          boxShadow: 'none',
        }}
        className={`relative w-12 h-14 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 select-none group border-0 border-none rounded-lg focus-visible:outline-2 focus-visible:outline-indigo-500 ${
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
    </div>
  );
};


/* 5. 스티키 스크롤텔링 (Sticky Scrolltelling) */
export const LyStickyScrolltellingDemo: React.FC = () => {
  const { t } = useLocale();
  const [step, setStep] = useDemoNumber(0, 0, 2, 1, 'steps');
  const steps = [
    { title: 'Step 01', color: 'from-indigo-500 to-cyan-400' },
    { title: 'Step 02', color: 'from-emerald-500 to-teal-400' },
    { title: 'Step 03', color: 'from-rose-500 to-amber-400' },
  ];
  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setStep((s) => (s + 1) % steps.length)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setStep((s) => (s + 1) % steps.length); } }}
      className="w-full h-40 flex items-center justify-center px-5 pt-6 cursor-pointer select-none"
    >
      <div className="w-full min-h-24 rounded-xl bg-slate-900 border border-slate-800 p-2 grid grid-cols-2 gap-2 items-center">
        {/* 좌측 고정(Sticky) 비주얼 */}
        <div
          className={`h-full rounded-lg bg-linear-to-br ${steps[step].color} flex flex-col items-center justify-center text-slate-950 font-black text-xs transition-all duration-300`}
        >
          <span className="text-[9px] font-mono opacity-75">{t("sample.lyStickyScrolltelling.stickyLeft")}</span>
          <span>{steps[step].title}</span>
        </div>
        {/* 우측 스크롤 스토리 */}
        <div className="space-y-1">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className={`px-1.5 py-0.5 rounded text-[9px] leading-tight font-bold transition-all ${
                i === step
                  ? 'bg-indigo-600/30 border border-indigo-400 text-white'
                  : 'bg-slate-950 text-slate-500'
              }`}
            >
              {t("demo.story.section", { title: s.title })}</div>
          ))}
        </div>
      </div>
    </div>
  );
};


/* 6. 풀페이지 스냅 섹션 (Full-Page Scroll Snap) */
export const LyFullpageSnapDemo: React.FC = () => {
  const { t } = useLocale();
  const [page, setPage] = useDemoNumber(0, 0, 2, 1, 'steps');
  const colors = ['bg-indigo-600/30 border-indigo-400', 'bg-emerald-600/30 border-emerald-400', 'bg-rose-600/30 border-rose-400'];
  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setPage((p) => (p + 1) % 3)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPage((p) => (p + 1) % 3); } }}
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
              <span className="text-xs font-black text-white">{t("sample.lyFullpageSnap.section0")}{idx + 1}</span>
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
export const LyHorizontalShowcaseDemo: React.FC = () => {
  const { t } = useLocale();
  const [idx, setIdx] = useDemoNumber(0, 0, 3, 1, 'steps');
  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setIdx((i) => (i + 1) % 4)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIdx((i) => (i + 1) % 4); } }}
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
              >{t("demo.snapSlide")}</span>
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
export const LyCurtainRevealDemo: React.FC = () => {
  const { t } = useLocale();
  const [lifted, setLifted] = useDemoToggle(false);
  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setLifted(!lifted)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLifted(!lifted); } }}
      className="w-full h-40 flex items-center justify-center px-6 pt-6 cursor-pointer select-none"
    >
      <div className="relative w-full h-24 rounded-xl overflow-hidden border border-slate-800 bg-indigo-950 flex items-end justify-center p-2">
        {/* 바닥에 깔린 고정 레이어 */}
        <div className="text-center">
          <span className="text-[10px] font-mono text-indigo-300">{t("sample.lyCurtainReveal.fixedFooterLayer")}</span>
          <p className="text-xs font-black text-white">{t("demo.aHiddenFooterIsRevealed")}</p>
        </div>
        {/* 위를 덮은 본문 커튼 */}
        <div
          className={`absolute inset-0 bg-slate-900 border-b border-slate-700 flex flex-col items-center justify-center transition-transform duration-500 ${
            lifted ? '-translate-y-12' : 'translate-y-0'
          }`}
        >
          <span className="text-xs font-bold text-slate-200">
            {lifted ? t("demo.closeCurtainClick") : t("demo.liftContentCurtainClick")}
          </span>
        </div>
      </div>
    </div>
  );
};


/* 9. 맥OS 독 매그니피케이션 바 (macOS Dock Magnification) */
export const LyMacosDockDemo: React.FC = () => {
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
    </div>
  );
};


/* 10. 커맨드 팔레트 스포트라이트 (Command Palette Cmd+K) */
export const LyCommandPaletteDemo: React.FC = () => {
  const { t } = useLocale();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const cmds = [t("demo.createProject"), t("demo.switchDarkTheme"), t("demo.copyFullPrompt")];
  return (
    <div className="w-full h-40 flex items-center justify-center px-6 pt-6 select-none">
      <div className="w-full rounded-xl bg-white dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden">
        <div className="px-3 py-1.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
          <span>{t("sample.lyCommandPalette.typeACommand")}</span>
          <kbd className="px-1.5 py-0.5 rounded-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[9px] border border-slate-200 dark:border-transparent">{t("sample.lyCommandPalette.k")}</kbd>
        </div>
        <div className="p-1 space-y-0.5">
          {cmds.map((cmd, i) => (
            <div data-demo-control
              key={cmd}
              role="button" tabIndex={0} onClick={() => setSelectedIdx(i)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedIdx(i); } }}
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
export const LyDynamicIslandNavDemo: React.FC = () => {
  const { t } = useLocale();
  const [expanded, setExpanded] = useDemoToggle(false);
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center pt-4 select-none">
      <div data-demo-control
        role="button" tabIndex={0} aria-expanded={expanded} onClick={() => setExpanded(!expanded)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpanded(!expanded); } }}
        className={`bg-white dark:bg-black border border-slate-200/90 dark:border-slate-700/80 shadow-lg shadow-indigo-950/5 dark:shadow-2xl cursor-pointer transition-all duration-300 overflow-hidden flex flex-col justify-center ${
          expanded
            ? 'w-56 max-w-[calc(100%-12px)] h-20 rounded-3xl px-4 py-2'
            : 'w-32 h-9 rounded-full px-3'
        }`}
      >
        <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
          <span className="flex items-center gap-1.5 text-slate-900 dark:text-white">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-black tracking-tight text-slate-900 dark:text-white">
              {expanded ? t("sample.lyDynamicIslandNav.nowPlaying") : t("sample.lyDynamicIslandNav.island")}
            </span>
          </span>
          <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-300 font-bold">
            {expanded ? t("actions.collapse") : t("demo.click")}
          </span>
        </div>
        {expanded && (
          <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-600 dark:text-slate-200 border-t border-slate-100 dark:border-slate-800/80 pt-1.5">
            <span className="text-slate-700 dark:text-slate-200 font-medium">{t("sample.lyDynamicIslandNav.vibeSynthTrack")}</span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white font-bold shadow-xs">{t("sample.lyDynamicIslandNav.live")}</span>
          </div>
        )}
      </div>
    </div>
  );
};


/* 12. 원형 파이 메뉴 (Radial Pie Menu) */
export const LyRadialPieMenuDemo: React.FC = () => { const triggerRef = useRef<HTMLButtonElement>(null);
  const { t } = useLocale();
  const [open, setOpen] = useDemoToggle(true);
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
          tabIndex={open ? 0 : -1} aria-hidden={!open} disabled={!open} onClick={() => { setOpen(false); triggerRef.current?.focus({ preventScroll: true }); }}
          style={{
            transform: open
              ? `translate(${it.x}px, ${it.y}px) scale(1)`
              : 'translate(0px, 0px) scale(0.2)',
            opacity: open ? 1 : 0,
            transitionDelay: open ? `${idx * 35}ms` : '0ms',
          }}
          className={`absolute w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-indigo-400/50 flex items-center justify-center text-xs text-slate-700 dark:text-white transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer shadow-md hover:bg-indigo-50 dark:hover:bg-slate-700 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
        >
          {it.icon}
        </button>
      ))}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        ref={triggerRef} aria-expanded={open} aria-label={t("demo.openClosePieMenu")}
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
export const LyBottomSheetDemo: React.FC = () => {
  const { t } = useLocale();
  const [snap, setSnap] = useState<'half' | 'full'>('half');
  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setSnap(snap === 'half' ? 'full' : 'half')} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSnap(snap === 'half' ? 'full' : 'half'); } }}
      className="w-full h-40 flex items-end justify-center px-8 pt-8 cursor-pointer select-none"
    >
      <div
        className={`w-full rounded-t-2xl bg-white dark:bg-slate-900 border-t border-x border-slate-200 dark:border-slate-700 px-3.5 pt-2 transition-all duration-300 shadow-lg ${
          snap === 'full' ? 'h-24' : 'h-14'
        }`}
      >
        <div className="w-8 h-1 rounded-full bg-slate-300 dark:bg-slate-600 mx-auto mb-1.5" />
        <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
          <span>{t("sample.lyBottomSheet.bottomSheet")}{snap.toUpperCase()})</span>
        </div>
        {snap === 'full' && (
          <p className="mt-1.5 text-[11px] text-slate-600 dark:text-slate-400">{t("demo.detailsExpandAsIfTheHandle")}</p>
        )}
      </div>
    </div>
  );
};


/* 14. 마스터-디테일 스플릿 뷰 (Master-Detail Split View) */
export const LyMasterDetailSplitDemo: React.FC = () => {
  const { t } = useLocale();
  const [activeId, setActiveId] = useState(0);
  const items = [
    { name: 'Inbox #1', desc: t("demo.detailPreviewForTheFirstItem") },
    { name: 'Inbox #2', desc: t("demo.instantDetailForTheSecondItem") },
    { name: 'Inbox #3', desc: t("demo.reportDetailsForTheThirdItem") },
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
          <span className="text-[9px] font-mono text-indigo-600 dark:text-indigo-400">{t("sample.lyMasterDetailSplit.detailView")}</span>
          <p className="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5">{items[activeId].name}</p>
          <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5">{items[activeId].desc}</p>
        </div>
      </div>
    </div>
  );
};


/* 15. 칸반 보드 컬럼 (Kanban Board Columns) */
export const LyKanbanBoardDemo: React.FC = () => {
  const { t } = useLocale();
  const [col, setCol] = useState<0 | 1 | 2>(1);
  const cols = ['TODO', 'DOING', 'DONE'];
  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setCol(((col + 1) % 3) as 0 | 1 | 2)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setCol(((col + 1) % 3) as 0 | 1 | 2); } }}
      className="w-full h-40 flex flex-col items-center justify-center px-5 pt-5 cursor-pointer select-none"
    >
      <div className="w-full grid grid-cols-3 gap-1.5">
        {cols.map((title, i) => (
          <div key={title} className="rounded-lg bg-slate-900 border border-slate-800 p-1.5 sm:p-2 h-20">
            <div className="text-[9px] font-mono text-slate-400 mb-1">{title}</div>
            {col === i ? (
              <div className="rounded-sm bg-indigo-600/30 border border-indigo-400 px-1 py-0.5 text-[9px] sm:text-[10px] leading-tight break-keep text-center font-bold text-white animate-spring-pop">{t("demo.taskCard")}</div>
            ) : (
              <div className="h-6 rounded-sm border border-dashed border-slate-800" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};


/* 16. 잔디 히트맵 매트릭스 (Contribution Heatmap Grid) */
export const LyHeatmapGridDemo: React.FC = () => {
  const [seed, setSeed] = useState(1);
  const levels = [
    'bg-slate-800',
    'bg-emerald-900/70',
    'bg-emerald-700/80',
    'bg-emerald-500',
    'bg-emerald-300',
  ];
  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setSeed((s) => s + 1)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSeed((s) => s + 1); } }}
      className="w-full h-40 flex flex-col items-center justify-center pt-4 cursor-pointer select-none"
    >
      <div className="grid grid-cols-10 gap-1 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
        {Array.from({ length: 40 }).map((_, idx) => {
          const lv = (idx * 7 + seed * 3) % 5;
          return <span key={idx} className={`w-3 h-3 rounded-[3px] ${levels[lv]}`} />;
        })}
      </div>
    </div>
  );
};


/* ============================================================================
 * DOMAIN 4: 디자인 스타일 & 테마 데모 (16종)
 * ============================================================================ */

/* 1. 네오 브루탈리즘 (Neo-Brutalism) */
export const StNeoBrutalismDemo: React.FC = () => {
  const { t } = useLocale();
  const [pressed, setPressed] = useDemoToggle(false);
  return (
    <div className="w-full h-40 flex items-center justify-center bg-amber-300/95 select-none">
      <button
        onClick={() => setPressed(!pressed)}
        style={{
          boxShadow: pressed ? '1px 1px 0px #000' : '5px 5px 0px #000',
          transform: pressed ? 'translate(4px, 4px)' : 'translate(0px, 0px)',
        }}
        className="px-5 py-2.5 bg-pink-400 border-[3px] border-black text-black font-black text-xs tracking-wide transition-all duration-100"
      >{t("sample.stNeoBrutalism.neoBrutalClick")}</button>
    </div>
  );
};


/* 2. 리퀴드 아크릴 글래스 (Liquid Acrylic Glass) */
export const StLiquidAcrylicDemo: React.FC = () => {
  const { t } = useLocale();
  return (
    <div className="relative w-full h-40 flex items-center justify-center overflow-hidden select-none">
      <div className="w-24 h-24 rounded-full bg-fuchsia-500/70 blur-xl absolute -left-2 animate-aurora-1" />
      <div className="w-24 h-24 rounded-full bg-cyan-400/70 blur-xl absolute right-2 animate-aurora-2" />
      <div className="relative z-10 w-52 h-24 rounded-2xl bg-linear-to-b from-white/20 to-white/5 backdrop-blur-xl border border-white/30 shadow-2xl p-3.5 flex flex-col justify-between">
        <span className="text-[10px] font-mono text-white/90">{t("sample.stLiquidAcrylic.liquidAcrylic")}</span>
        <span className="text-xs font-extrabold text-white">{t("demo.luminousTranslucentAcrylic")}</span>
      </div>
    </div>
  );
};


/* 3. 리니어풍 다크 미니멀 (Linear-Style Dark Minimal) */
export const StLinearDarkMinimalDemo: React.FC = () => {
  const { t } = useLocale();
  return (
    <div className="w-full h-40 flex items-center justify-center bg-[#090A0F] px-6 pt-5 select-none">
      <div className="relative w-full h-24 rounded-xl bg-[#12131A] border border-white/10 p-3.5 flex flex-col justify-between overflow-hidden">
        <div className="pointer-events-none absolute top-0 left-6 right-6 h-px bg-linear-to-r from-transparent via-indigo-400/80 to-transparent" />
        <span className="text-[10px] font-mono text-slate-400">{t("sample.stLinearDarkMinimal.hairline")}</span>
        <span className="text-xs font-bold bg-linear-to-r from-white to-slate-400 bg-clip-text text-transparent">{t("sample.stLinearDarkMinimal.linearPrecisionDarkUi")}</span>
      </div>
    </div>
  );
};


/* 4. 매트 필름 그레인 텍스처 (Matte Film Grain) */
export const StMatteFilmGrainDemo: React.FC = () => {
  const { t } = useLocale();
  return (
    <div className="relative w-full h-40 flex items-center justify-center bg-stone-900 overflow-hidden select-none">
      <div
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.13) 0.75px, transparent 0), radial-gradient(rgba(254,243,199,0.1) 0.75px, transparent 0), radial-gradient(rgba(0,0,0,0.28) 0.85px, transparent 0)',
          backgroundSize: '4px 4px, 5px 5px, 3px 3px', backgroundPosition: '0 0, 2px 1px, 1px 2px',
        }}
        className="pointer-events-none absolute inset-0 opacity-60"
      />
      <div className="relative z-10 px-5 py-3 rounded-xl bg-stone-800/90 border border-stone-600/50 text-center">
        <span className="text-[10px] font-mono text-amber-200/80">{t("sample.stMatteFilmGrain.analogFilmGrain")}</span>
        <p className="text-xs font-bold text-stone-100 mt-0.5">{t("demo.aSubtleMatteGrainTexture")}</p>
      </div>
    </div>
  );
};


/* 5. 뉴모피즘 소프트 엠보싱 (Neumorphism Soft UI) */
export const StNeumorphismSoftDemo: React.FC = () => {
  const { t } = useLocale();
  const [inset, setInset] = useDemoToggle(false);
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
        {inset ? t("demo.insetSurfaceClick") : t("demo.raisedSurfaceClick")}
      </button>
    </div>
  );
};


/* 6. 클레이모피즘 3D 점토 (Claymorphism 3D) */
export const StClaymorphism3DDemo: React.FC = () => {
  const { t } = useLocale();
  const [bounce, setBounce] = useDemoToggle(false);
  return (
    <div className="w-full h-40 flex items-center justify-center select-none">
      <div data-demo-control
        role="button" tabIndex={0} onClick={() => setBounce(!bounce)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setBounce(!bounce); } }}
        style={{
          boxShadow:
            '0 12px 20px rgba(0,0,0,0.45), inset -6px -6px 12px rgba(79,70,229,0.7), inset 6px 6px 12px rgba(255,255,255,0.45)',
        }}
        className={`px-6 py-3.5 rounded-[24px] bg-indigo-400 text-slate-950 font-black text-xs cursor-pointer transition-transform ${
          bounce ? 'scale-95' : 'hover:scale-105'
        }`}
      >{t("demo.aSoftPuffy3dClayCard")}</div>
    </div>
  );
};


/* 7. 스큐어모피즘 리얼 촉감 스위치 (Tactile Skeuomorphism) */
export const StSkeuomorphismTactileDemo: React.FC = () => {
  const { t } = useLocale();
  const [on, setOn] = useDemoToggle(true);
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
          {on ? t("sample.stSkeuomorphismTactile.hardwareOn") : t("sample.stSkeuomorphismTactile.hardwareOff")}
        </span>
      </button>
    </div>
  );
};


/* 8. 페이퍼 컷아웃 레이어 (Paper Cutout Collage) */
export const StPaperCutoutLayerDemo: React.FC = () => {
  const { t } = useLocale();
  return (
    <div className="w-full h-40 flex items-center justify-center pt-3 select-none">
      <div className="relative w-48 h-24 flex items-center justify-center">
        <div className="absolute inset-0 rounded-xl bg-amber-400 rotate-[-4deg] shadow-md" />
        <div className="absolute inset-0 rounded-xl bg-rose-500 rotate-3 shadow-md" />
        <div className="relative z-10 w-full h-full rounded-xl bg-slate-900 border-2 border-white/80 flex flex-col items-center justify-center shadow-lg">
          <span className="text-xs font-black text-white">{t("sample.stPaperCutoutLayer.paperCutout")}</span>
          <span className="text-[10px] text-amber-300">{t("demo.layersOfCutPaper")}</span>
        </div>
      </div>
    </div>
  );
};


/* 9. 8비트 픽셀 아케이드 레트로 (8-Bit Pixel Retro) */
export const St8BitPixelRetroDemo: React.FC = () => {
  const { t } = useLocale();
  const [coins, setCoins] = useState(99);
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center bg-slate-950 select-none">
      <button
        onClick={() => setCoins((c) => c + 1)}
        style={{ boxShadow: '4px 4px 0px #1e1b4b' }}
        className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-400 border-2 border-white text-slate-950 font-mono font-black text-xs active:translate-y-0.5"
      ><svg viewBox="0 0 8 8" aria-hidden="true" className="w-3.5 h-3.5 shrink-0" shapeRendering="crispEdges"><path d="M2 0h4v1h1v1h1v4H7v1H6v1H2V7H1V6H0V2h1V1h1V0z" fill="#f59e0b" /><path d="M3 2h2v4H3V2z" fill="#fef3c7" /></svg><span>{t("sample.st8BitPixelRetro.insertCoin")}{coins}</span>
      </button>
    </div>
  );
};


/* 10. 윈도우95 클래식 데스크탑 (Win95 Classic OS) */
export const StWin95RetroOsDemo: React.FC = () => {
  const { t } = useLocale();
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
          <span>{t("sample.stWin95RetroOs.vibe95Exe")}</span>
          <span className="bg-[#c0c0c0] text-black px-1 font-mono text-[9px]">×</span>
        </div>
        <div className="p-2.5 text-center">
          <p className="text-[11px] font-bold">{t("sample.stWin95RetroOs.classic3dBevelWindow")}</p>
        </div>
      </div>
    </div>
  );
};


/* 11. CRT 브라운관 그린 터미널 (CRT Scanline Terminal) */
export const StCrtScanlineTerminalDemo: React.FC = () => {
  const { t } = useLocale();
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
        {t("sample.stCrtScanlineTerminal.gtSystemReady")}
      </div>
    </div>
  );
};


/* 12. 신스웨이브 선셋 그리드 (Synthwave 80s Grid) */
export const StSynthwaveSunsetGridDemo: React.FC = () => {
  const { t } = useLocale();
  return (
    <div className="relative w-full h-40 flex flex-col items-center justify-end overflow-hidden bg-linear-to-b from-[#1a052e] via-[#3b0764] to-[#be185d] select-none pb-3">
      <div className="w-10 h-10 rounded-full bg-linear-to-b from-amber-300 to-rose-500 mb-1.5 shadow-[0_0_20px_#f43f5e]" />
      <div
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(244,114,182,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(244,114,182,0.4) 1px, transparent 1px)',
          backgroundSize: '16px 10px',
          transform: 'perspective(120px) rotateX(55deg)',
        }}
        className="w-full h-12 border-t border-pink-400"
      />
      <span className="relative z-10 text-[10px] font-mono font-black tracking-widest text-cyan-300">{t("sample.stSynthwaveSunsetGrid.synthwave1984")}</span>
    </div>
  );
};


/* 13. SF 사이버네틱 HUD 프레임 (Sci-Fi Chamfered HUD) */
export const StScifiHudChamferDemo: React.FC = () => {
  const { t } = useLocale();
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
            <span>{t("sample.stScifiHudChamfer.sysHud45Chamfer")}</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />{t("sample.stScifiHudChamfer.online")}</span>
          </div>
          <div className="text-xs font-black tracking-wider text-white">{t("sample.stScifiHudChamfer.tacticalFrameUi")}</div>
        </div>
      </div>
    </div>
  );
};


/* 14. 엔지니어링 블루프린트 도면 (Architectural Blueprint) */
export const StArchitectBlueprintDemo: React.FC = () => {
  const { t } = useLocale();
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
        <span className="absolute -top-2 left-2 bg-[#0a2540] px-1 text-[9px] font-mono text-sky-300">{t("sample.stArchitectBlueprint.dimensions")}</span>
        <p className="font-mono text-xs font-bold text-white">{t("sample.stArchitectBlueprint.cadBlueprint")}</p>
      </div>
    </div>
  );
};


/* 15. 스위스 국제 타이포그래피 그리드 (Swiss International Grid) */
export const StSwissEditorialGridDemo: React.FC = () => {
  const { t } = useLocale();
  return (
    <div className="w-full h-40 flex items-center justify-center bg-stone-100 text-stone-950 px-6 pt-6 select-none">
      <div className="w-full h-24 border-2 border-stone-950 grid grid-cols-3">
        <div className="border-r-2 border-stone-950 bg-red-600 text-white p-2 flex flex-col justify-between">
          <span className="text-[9px] font-mono font-bold">01</span>
          <span className="text-sm font-black">{t("sample.stSwissEditorialGrid.swiss")}</span>
        </div>
        <div className="col-span-2 p-2 flex flex-col justify-between">
          <span className="text-[9px] font-mono uppercase tracking-widest">{t("sample.stSwissEditorialGrid.gridSystem1957")}</span>
          <p className="text-xs font-black leading-tight break-keep">{t("demo.exposedGridLinesAndBoldTypography")}</p>
        </div>
      </div>
    </div>
  );
};


/* 16. 코믹스 팝아트 망점 (Comic Halftone Pop-Art) */
export const StComicHalftonePopDemo: React.FC = () => {
  const { t } = useLocale();
  const [bang, setBang] = useDemoToggle(false);
  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setBang(!bang)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setBang(!bang); } }}
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
        {bang ? t("sample.stComicHalftonePop.pow") : t("demo.bamClick")}
      </div>
    </div>
  );
};


/* ============================================================================
 * DOMAIN 5: 🎞️ 모션 영상 & 쇼릴 데모 (16종)
 * ============================================================================ */

/* 1. SaaS 프로덕트 런칭 쇼릴 (3-Scene Sequence) */
export const VdSaasLaunchReelDemo: React.FC = () => { const autoRunning = useDemoAutoplayRunning();
  const { t } = useLocale();
  const [scene, setScene] = useState(0);

  useEffect(() => {
    if (!autoRunning) return;
    const id = setTimeout(() => {
      setScene((s) => (s + 1) % 3);
    }, 1600);
    return () => clearTimeout(id);
  }, [scene, autoRunning]);

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setScene((s) => (s + 1) % 3)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setScene((s) => (s + 1) % 3); } }}
      className="w-full h-40 relative overflow-hidden flex flex-col items-center justify-center pt-5 pb-3 px-5 cursor-pointer select-none bg-linear-to-br from-slate-950 via-indigo-950/60 to-slate-950"
    >
      {scene === 0 && (
        <div className="animate-spring-pop text-center space-y-1">
          <span className="text-[9px] font-mono text-indigo-400 tracking-widest uppercase">{t("sample.vdSaasLaunchReel.scene01Intro")}</span>
          <div className="text-base font-black text-white tracking-tight">{t("sample.vdSaasLaunchReel.workflow")}<span className="text-indigo-400">{t("sample.vdSaasLaunchReel.reimagined")}</span>
          </div>
        </div>
      )}

      {scene === 1 && (
        <div className="animate-spring-pop w-48 bg-slate-900/95 border border-indigo-500/50 rounded-xl p-2.5 shadow-xl shadow-indigo-500/20 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold text-indigo-300">{t("sample.vdSaasLaunchReel.aiDashboard")}</span>
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
            <span>{t("sample.vdSaasLaunchReel.startFreeToday")}</span>
          </div>
          <span className="text-[9px] font-mono text-slate-400">{t("sample.vdSaasLaunchReel.vibeApp")}</span>
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
export const VdDevice3DSpinDemo: React.FC = () => {
  const { t } = useLocale();
  const [front, setFront] = useState(false); const autoRunning = useDemoAutoplayRunning();

  useEffect(() => {
    if (!autoRunning) return;
    const id = setTimeout(() => {
      setFront((f) => !f);
    }, 1800);
    return () => clearTimeout(id);
  }, [front, autoRunning]);

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setFront((f) => !f)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFront((f) => !f); } }}
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
        <span aria-hidden="true" className="absolute -right-[3px] top-5 w-[2px] h-4 rounded-r-xs bg-slate-500" /><div className="flex items-center justify-center gap-1 mb-1.5"><span className="w-1.5 h-1.5 rounded-full bg-slate-600" /><div className="w-8 h-1 rounded-full bg-slate-700" /></div>
        <div className="space-y-1.5">
          <div className="h-3 w-2/3 rounded-sm bg-slate-800" />
          <div
            style={{
              transform: front ? 'translateZ(26px) scale(1.06)' : 'translateZ(0px)',
            }}
            className="p-1.5 rounded-lg bg-linear-to-r from-indigo-600 to-violet-600 text-white text-[10px] font-extrabold shadow-lg transition-transform duration-700 flex items-center justify-between"
          >
            <span>{t("demo.paymentApproved")}</span>
            <Check className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
};


/* 3. 인터랙티브 커서 줌 워크스루 */
export const VdAppWalkthroughZoomDemo: React.FC = () => {
  const { t } = useLocale();
  const [step, setStep] = useState(0); const autoRunning = useDemoAutoplayRunning();

  useEffect(() => {
    if (!autoRunning) return;
    const id = setTimeout(() => {
      setStep((s) => (s + 1) % 3);
    }, 1400);
    return () => clearTimeout(id);
  }, [step, autoRunning]);

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setStep((s) => (s + 1) % 3)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setStep((s) => (s + 1) % 3); } }}
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
            {step >= 1 ? t("demo.deployed") : t("sample.vdAppWalkthroughZoom.deploy")}
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
export const VdSplitPromoReelDemo: React.FC = () => {
  const { t } = useLocale();
  const [stage, setStage] = useState(1); const autoRunning = useDemoAutoplayRunning();

  useEffect(() => {
    if (!autoRunning) return;
    const id = setTimeout(() => {
      setStage((s) => (s + 1) % 3);
    }, 1300);
    return () => clearTimeout(id);
  }, [stage, autoRunning]);

  const cols = [
    {
      label: t("sample.vdSplitPromoReel.design"),
      bg: 'bg-indigo-600',
      offset: stage === 0 ? '-translate-y-full' : 'translate-y-0',
    },
    {
      label: t("sample.vdSplitPromoReel.motion"),
      bg: 'bg-violet-600',
      offset: stage === 0 ? 'translate-y-full' : 'translate-y-0',
    },
    {
      label: t("sample.vdSplitPromoReel.launch"),
      bg: 'bg-cyan-600',
      offset: stage === 0 ? '-translate-y-full' : 'translate-y-0',
    },
  ];

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setStage((s) => (s + 1) % 3)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setStage((s) => (s + 1) % 3); } }}
      className="w-full h-40 flex items-center justify-center pt-5 px-6 cursor-pointer select-none overflow-hidden"
    >
      <div className="relative w-full h-24 grid grid-cols-3 gap-1.5 overflow-hidden rounded-xl p-1.5 bg-slate-900 border border-slate-800">
        {cols.map((c) => (
          <div
            key={c.label}
            className={`${c.bg} ${c.offset} ${
              stage === 2 ? 'opacity-20 scale-95' : 'opacity-100'
            } rounded-lg flex items-center justify-center text-[10px] font-black text-white tracking-wider transition-all duration-300`}
          >
            {c.label}
          </div>
        ))}
        {stage === 2 && (
          <div className="absolute inset-0 z-10 bg-slate-950 flex flex-col items-center justify-center gap-1.5 rounded-xl border border-indigo-500/50 shadow-xl">
            <div className="animate-spring-pop flex flex-col items-center gap-1">
              <span className="px-3.5 py-1.5 rounded-full bg-indigo-600 text-white text-xs font-black tracking-tight shadow-lg flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />{t("sample.vdSplitPromoReel.allInOneReel")}</span>
              <span className="text-[9px] font-mono font-bold text-indigo-400 tracking-wider">{t("sample.vdSplitPromoReel.unifiedMasterCut")}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


/* 5. 스톰프 비트 타이포그래피 (상단 배지 가독성을 해치지 않는 16:9 와이드 프레임 내 배경 반전 + 타격 모션) */
export const VdStompBeatTypoDemo: React.FC = () => { const { t } = useLocale(); const autoRunning = useDemoAutoplayRunning();
  const beats = [
    { word: t("sample.vdStompBeatTypo.think"), bg: 'bg-slate-900 border-slate-700', text: 'text-white' },
    { word: t("sample.vdStompBeatTypo.build"), bg: 'bg-indigo-600 border-indigo-400', text: 'text-white' },
    { word: t("sample.vdStompBeatTypo.ship"), bg: 'bg-amber-400 border-amber-300', text: 'text-slate-950' },
    { word: t("sample.vdStompBeatTypo.fast"), bg: 'bg-white border-white', text: 'text-slate-950' },
  ];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!autoRunning) return;
    const id = setTimeout(() => {
      setIdx((i) => (i + 1) % beats.length);
    }, 750);
    return () => clearTimeout(id);
  }, [idx, beats.length, autoRunning]);

  const cur = beats[idx];

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setIdx((i) => (i + 1) % beats.length)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIdx((i) => (i + 1) % beats.length); } }}
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
export const VdHighlightSwipeRevealDemo: React.FC = () => { const autoRunning = useDemoAutoplayRunning();
  const { t } = useLocale();
  // phase 0: 왼쪽 대기(숨김), phase 1: 마커 바가 덮음, phase 2: 오른쪽으로 빠지며 텍스트 리빌
  const [phase, setPhase] = useState(2);

  useEffect(() => {
    if (!autoRunning) return;
    const delays = [120, 420, 1600];
    const id = setTimeout(() => {
      setPhase((p) => (p + 1) % 3);
    }, delays[phase]);
    return () => clearTimeout(id);
  }, [phase, autoRunning]);

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setPhase(0)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPhase(0); } }}
      className="w-full h-40 flex flex-col items-center justify-center gap-2 pt-5 cursor-pointer select-none"
    >
      <div className="relative overflow-hidden rounded-lg px-4 py-1.5 bg-slate-900 border border-slate-800">
        <span
          className={`text-sm font-black tracking-tight text-white transition-opacity duration-150 ${
            phase >= 2 ? 'opacity-100' : 'opacity-0'
          }`}
        >{t("sample.vdHighlightSwipeReveal.headline")}</span>
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

      <div className="flex flex-wrap justify-center gap-1 px-3">
        {[t("sample.vdHighlightSwipeReveal.remotion"), t("sample.vdHighlightSwipeReveal.afterEffects"), t("sample.vdHighlightSwipeReveal.showreel")].map((t, i) => (
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
export const VdCountdownEnergeticIntroDemo: React.FC = () => {
  const { t } = useLocale(); const steps = ['3', '2', '1', t("sample.vdCountdownEnergeticIntro.live")]; const autoRunning = useDemoAutoplayRunning();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!autoRunning) return;
    const id = setTimeout(() => {
      setIdx((i) => (i + 1) % steps.length);
    }, idx === 3 ? 1300 : 800);
    return () => clearTimeout(id);
  }, [idx, steps.length, autoRunning]);

  const isLive = idx === 3;

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setIdx((i) => (i + 1) % steps.length)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIdx((i) => (i + 1) % steps.length); } }}
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
export const VdChatStorySequenceDemo: React.FC = () => { const autoRunning = useDemoAutoplayRunning();
  const { t } = useLocale();
  const [step, setStep] = useState(2);

  useEffect(() => {
    if (!autoRunning) return;
    const id = setTimeout(() => {
      setStep((s) => (s + 1) % 3);
    }, 1300);
    return () => clearTimeout(id);
  }, [step, autoRunning]);

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setStep((s) => (s + 1) % 3)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setStep((s) => (s + 1) % 3); } }}
      className="w-full h-40 flex items-center justify-center px-6 pt-5 cursor-pointer select-none"
    >
      <div className="w-full max-w-[220px] h-20 flex flex-col justify-start gap-2">
        {/* Step 0+: 사용자 질문 말풍선 (상단 고정) */}
        <div
          key={step === 0 ? 'q-pop' : 'q-stay'}
          className={`self-end px-3 py-1 rounded-2xl rounded-br-sm bg-indigo-600 text-white text-[11px] font-bold shadow-md ${
            step === 0 ? 'animate-spring-pop' : ''
          }`}
        >{t("demo.createALaunchShowreel")}</div>

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
            <span>{t("demo.chat.resultReady")}</span>
          </div>
        )}
      </div>
    </div>
  );
};


/* 9. 다이내믹 차트 성장 시퀀스 */
export const VdAnimatedBarRaceDemo: React.FC = () => { const autoRunning = useDemoAutoplayRunning();
  const [active, setActive] = useState(true);
  const heights = [28, 42, 58, 76, 100];

  useEffect(() => {
    if (!autoRunning) return;
    const id = setTimeout(() => {
      setActive((a) => !a);
    }, active ? 2000 : 700);
    return () => clearTimeout(id);
  }, [active, autoRunning]);

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setActive((a) => !a)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive((a) => !a); } }}
      className="w-full h-40 flex flex-col items-center justify-end pb-4 pt-8 px-8 cursor-pointer select-none"
    >
      <div className="w-full flex items-end justify-between gap-2.5 h-24 border-b border-slate-800 px-2">
        {heights.map((h, i) => (
          <div key={i} className="relative flex-1 flex flex-col items-center justify-end h-full">
            {i === 4 && active && (
              <span className="absolute -top-5 px-1.5 py-0.5 rounded-sm bg-emerald-500 text-slate-950 text-[9px] font-black animate-spring-pop whitespace-nowrap">
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
                  : 'bg-slate-300 dark:bg-slate-700'
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};


/* 10. KPI 메트릭 리빌 시퀀스 (자동 재생 루프 + 실제 숫자 카운트업 롤링 구현) */
export const VdKpiCounterExplosionDemo: React.FC = () => { const { t } = useLocale(); const autoRunning = useDemoAutoplayRunning();
  const [progress, setProgress] = useState(1); // 0 ~ 1
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    let rafId = 0;
    const start = performance.now();
    const duration = 900; if (!autoRunning) { setProgress(1); return; }

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
  }, [cycle, autoRunning]);

  const metrics = [
    {
      label: t("sample.vdKpiCounterExplosion.uptime"),
      val: `${(99.9 * progress).toFixed(1)}%`,
      pct: Math.round(92 * progress),
      color: 'text-emerald-400',
    },
    {
      label: t("sample.vdKpiCounterExplosion.speed"),
      val: `${(12.4 * progress).toFixed(1)}x`,
      pct: Math.round(82 * progress),
      color: 'text-indigo-400',
    },
    {
      label: t("sample.vdKpiCounterExplosion.latency"),
      val: `${(0.18 * progress).toFixed(2)}s`,
      pct: Math.round(74 * progress),
      color: 'text-amber-600 dark:text-amber-300',
    },
  ];

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setCycle((c) => c + 1)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setCycle((c) => c + 1); } }}
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
export const VdNodeFlowPipelineDemo: React.FC = () => {
  // step 0: Input(좌), step 1: AI Core(중), step 2: Render(우), step 3: 순간 리셋 대기
  const [step, setStep] = useState(0);
  const { t } = useLocale(); const nodes = [t("sample.vdNodeFlowPipeline.input"), t("sample.vdNodeFlowPipeline.aiCore"), t("sample.vdNodeFlowPipeline.render")]; const autoRunning = useDemoAutoplayRunning();

  useEffect(() => {
    if (!autoRunning) return;
    const delay = step === 3 ? 80 : 950;
    const id = setTimeout(() => {
      setStep((s) => (s + 1) % 4);
    }, delay);
    return () => clearTimeout(id);
  }, [step, autoRunning]);

  const activeNode = step === 3 ? 0 : step;
  const packetLeft =
    step === 0 || step === 3 ? '12%' : step === 1 ? '48%' : '82%';

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setStep((s) => (s + 1) % 3)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setStep((s) => (s + 1) % 3); } }}
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
export const VdCircularRingDashboardDemo: React.FC = () => { const autoRunning = useDemoAutoplayRunning();
  const { t } = useLocale();
  const [filled, setFilled] = useState(true);

  useEffect(() => {
    if (!autoRunning) return;
    const id = setTimeout(() => {
      setFilled((f) => !f);
    }, filled ? 2200 : 750);
    return () => clearTimeout(id);
  }, [filled, autoRunning]);

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setFilled((f) => !f)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFilled((f) => !f); } }}
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
        <div className="text-indigo-400 font-bold">{t("sample.vdCircularRingDashboard.reach")}{filled ? '88%' : '0%'}
        </div>
        <div className="text-emerald-400 font-bold">{t("sample.vdCircularRingDashboard.conv")}{filled ? '78%' : '0%'}
        </div>
        <div className="text-amber-400 font-bold">{t("sample.vdCircularRingDashboard.ret")}{filled ? '68%' : '0%'}
        </div>
      </div>
    </div>
  );
};


/* 13. 모던 로어써드 방송 자막 (Broadcast Lower Third) */
export const VdLowerThirdBannerDemo: React.FC = () => { const autoRunning = useDemoAutoplayRunning();
  const { t } = useLocale();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!autoRunning) return;
    const id = setTimeout(() => {
      setVisible((v) => !v);
    }, visible ? 2200 : 850);
    return () => clearTimeout(id);
  }, [visible, autoRunning]);

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setVisible((v) => !v)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setVisible((v) => !v); } }}
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
          >{t("sample.vdLowerThirdBanner.alexKimProductLead")}</div>
          <div
            className={`px-2.5 py-0.5 bg-indigo-600 text-white text-[10px] font-bold rounded-r-md w-fit transition-transform duration-500 delay-100 ${
              visible ? 'translate-x-0' : '-translate-x-full'
            }`}
          >{t("sample.vdLowerThirdBanner.keynote2026Live")}</div>
        </div>
      </div>
    </div>
  );
};


/* 14. 다이어고널 멀티 와이프 전환 (3겹 슬라이스 + 역방향 복귀 시 transition-none 처리 + 자동 전환) */
export const VdDiagonalShutterWipeDemo: React.FC = () => { const autoRunning = useDemoAutoplayRunning();
  const { t } = useLocale();
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
    if (!autoRunning) return () => clearTimers(); const interval = window.setInterval(() => {
      triggerWipe();
    }, 2600);
    return () => {
      window.clearInterval(interval);
      clearTimers();
    };
  }, [triggerWipe, autoRunning]);

  const layers = [
    { color: 'bg-indigo-600', delay: '0ms' },
    { color: 'bg-fuchsia-500', delay: '70ms' },
    { color: 'bg-cyan-400', delay: '140ms' },
  ];

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={triggerWipe} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); triggerWipe(); } }}
      className={`w-full h-40 relative overflow-hidden flex items-center justify-center pt-5 cursor-pointer select-none transition-colors ${
        sceneB ? 'bg-indigo-950/80' : 'bg-slate-950'
      }`}
    >
      <div className="text-center">
        <span className="text-[10px] font-mono text-indigo-400 block">
          {sceneB ? t("sample.vdDiagonalShutterWipe.scene02OnAir") : t("sample.vdDiagonalShutterWipe.scene01Intro")}
        </span>
        <span className="text-sm font-black text-white">
          {sceneB ? t("sample.vdDiagonalShutterWipe.nextChapter") : t("sample.vdDiagonalShutterWipe.stingerWipe")}
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
export const VdLogoStingerOutroDemo: React.FC = () => {
  const { t } = useLocale();
  const [stage, setStage] = useState(2); const autoRunning = useDemoAutoplayRunning();

  useEffect(() => {
    if (!autoRunning) return;
    const delays = [450, 500, 1800];
    const id = setTimeout(() => {
      setStage((s) => (s + 1) % 3);
    }, delays[stage]);
    return () => clearTimeout(id);
  }, [stage, autoRunning]);

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setStage(0)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setStage(0); } }}
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
        >{t("sample.vdLogoStingerOutro.vibeStudio")}</span>
      </div>
    </div>
  );
};


/* 16. 오디오 스펙트럼 비주얼라이저 (실제 주파수 바 상하 율동 + 실시간 재생 타임코드 진행) */
export const VdAudioSpectrumVisualizerDemo: React.FC = () => { const autoRunning = useDemoAutoplayRunning();
  const { t } = useLocale();
  const [playing, setPlaying] = useState(true);
  const [seconds, setSeconds] = useState(84);
  const bars = [45, 75, 95, 60, 85, 100, 70, 50, 90, 100, 65, 80, 55, 78, 60, 42];

  useEffect(() => {
    if (!playing || !autoRunning) return;
    const id = setInterval(() => {
      setSeconds((s) => (s >= 225 ? 0 : s + 1));
    }, 1000);
    return () => clearInterval(id);
  }, [playing, autoRunning]);

  const fmt = (sec: number) => {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setPlaying((p) => !p)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPlaying((p) => !p); } }}
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
          {playing ? t("sample.vdAudioSpectrumVisualizer.audioOn") : t("sample.vdAudioSpectrumVisualizer.paused")}
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
export const GooeyMenuFabDemo: React.FC = () => { const triggerRef = useRef<HTMLButtonElement>(null);
  const { t } = useLocale();
  const [open, setOpen] = useDemoToggle(true);
  const actions = [
    { id: 'rocket', label: t("demo.launch"), icon: Rocket, dx: -52, dy: -18, color: 'from-indigo-500 to-blue-500' },
    { id: 'sparkles', label: t("demo.aiGeneration"), icon: Sparkles, dx: 0, dy: -48, color: 'from-violet-500 to-fuchsia-500' },
    { id: 'flame', label: t("demo.boost"), icon: Flame, dx: 52, dy: -18, color: 'from-amber-500 to-rose-500' },
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
              style={{
                transform: open
                  ? `translate(${act.dx}px, ${act.dy}px) scale(1)`
                  : 'translate(0px, 0px) scale(0.3)',
                transitionDelay: open ? `${idx * 45}ms` : '0ms',
              }}
              className={`absolute bottom-[5px] w-[34px] h-[34px] rounded-full bg-linear-to-br ${act.color} text-white flex items-center justify-center shadow-lg border border-white/25 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer ${
                open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
              tabIndex={open ? 0 : -1} aria-hidden={!open} disabled={!open} aria-label={act.label} title={act.label} onClick={() => { setOpen(false); triggerRef.current?.focus({ preventScroll: true }); }}
            >
              <Icon className="w-3.5 h-3.5" />
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          ref={triggerRef} aria-expanded={open} aria-label={t("demo.openCloseFloatingMenu")}
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
    </div>
  );
};


/* [UI +2] OTP 핀 코드 바운스 인풋 */
export const OtpPinFocusBounceDemo: React.FC = () => {
  const { t } = useLocale();
  const [digits, setDigits] = useState<string[]>(['4', '8', '2', '9', '', '']);
  const [activeIdx, setActiveIdx] = useState(4);
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

  useDemoPulse(handleAutoFill);
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
        <button
          type="button"
          onClick={handleAutoFill}
          className="px-2 py-0.5 rounded-sm bg-indigo-50 hover:bg-indigo-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-[9px] font-bold text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-slate-700 cursor-pointer transition-colors"
        >{t("demo.playInputSequence")}</button>
      </div>
    </div>
  );
};


/* [UI +3] 홀드 투 컨펌 (Hold-to-Confirm Progress Button) */
export const HoldToConfirmRingDemo: React.FC = () => {
  const { t } = useLocale();
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
  useDemoPulse(() => { reset(); setHolding(true); });

  return (
    <div className="w-full h-40 flex flex-col items-center justify-center gap-2.5 pt-6 select-none">
      {confirmed ? (
        <button
          type="button"
          onClick={reset}
          className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-400/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 animate-spring-pop cursor-pointer"
        >
          <Check className="w-3.5 h-3.5" />{t("demo.deploymentApprovedReset")}</button>
      ) : (
        <button
          type="button"
          onPointerDown={() => setHolding(true)}
          onPointerUp={() => setHolding(false)}
          onPointerLeave={() => setHolding(false)} onBlur={() => setHolding(false)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setHolding(true); } }} onKeyUp={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setHolding(false); } }}
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
            {holding ? t("demo.hold.progress", { percent: progress }) : t("demo.holdToDeployToProduction")}
          </span>
        </button>
      )}
    </div>
  );
};


/* [UI +4] 스포트라이트 패스워드 피크 (Flashlight Password Peek) */
export const PeekPasswordLampDemo: React.FC = () => {
  const { t } = useLocale();
  const [lampOn, setLampOn] = useDemoToggle(true);
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
            title={t("demo.toggleFlashlight")}
          >
            🔦
          </button>
        </div>
      </div>
    </div>
  );
};


/* [그래픽 +1] 소나 레이더 스윕 스캐너 (Sonar Radar Sweep Scanner) */
export const MgRadarSonarSweepDemo: React.FC = () => { const autoRunning = useDemoAutoplayRunning();
  const [angle, setAngle] = useState(0);
  const [fast, setFast] = useState(false);

  useEffect(() => {
    if (!autoRunning) return;
    const id = setInterval(() => {
      setAngle((a) => (a + (fast ? 10 : 6)) % 360);
    }, 40);
    return () => clearInterval(id);
  }, [fast, autoRunning]);

  const blips = [
    { x: 68, y: 28, deg: 45 },
    { x: 74, y: 70, deg: 135 },
    { x: 26, y: 66, deg: 220 },
  ];

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setFast((f) => !f)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFast((f) => !f); } }}
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
export const MgMorphingGridWaveDemo: React.FC = () => { const autoRunning = useDemoAutoplayRunning();
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!autoRunning) return;
    const id = setInterval(() => {
      setTick((t) => (t + 1) % 8);
    }, 260);
    return () => clearInterval(id);
  }, [autoRunning]);

  const rows = 3;
  const cols = 6;

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setTick((t) => (t + 1) % 8)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setTick((t) => (t + 1) % 8); } }}
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
    </div>
  );
};


/* [그래픽 +3] 프리즘 광선 분산 효과 (Optical Prism Light Dispersion) */
export const MgPrismRainbowRefractionDemo: React.FC = () => {
  const [wide, setWide] = useDemoToggle(true);
  const spectrum = [
    { color: '#f43f5e', yEnd: 18 },
    { color: '#fbbf24', yEnd: 30 },
    { color: '#34d399', yEnd: 42 },
    { color: '#22d3ee', yEnd: 54 },
    { color: '#818cf8', yEnd: 66 },
    { color: '#e879f9', yEnd: 78 },
  ];

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setWide((w) => !w)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setWide((w) => !w); } }}
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
export const MgGravityNewtonCradleDemo: React.FC = () => { const autoRunning = useDemoAutoplayRunning();
  // 0: 좌측 스윙 아웃 -> 1: 중앙 충돌 -> 2: 우측 스윙 아웃 -> 3: 중앙 충돌
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);

  useEffect(() => {
    if (!autoRunning) return;
    const id = setInterval(() => {
      setStep((s) => ((s + 1) % 4) as 0 | 1 | 2 | 3);
    }, 320);
    return () => clearInterval(id);
  }, [autoRunning]);

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setStep((s) => ((s + 1) % 4) as 0 | 1 | 2 | 3)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setStep((s) => ((s + 1) % 4) as 0 | 1 | 2 | 3); } }}
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
export const LyFloatingTocSpyDemo: React.FC = () => { const autoRunning = useDemoAutoplayRunning();
  const { t } = useLocale();
  const [activeSec, setActiveSec] = useState(0);
  const sections = [
    { title: t("demo.toc.overview"), desc: t("demo.coreArchitectureLayers") },
    { title: t("demo.toc.installation"), desc: t("demo.packagesAndEnvironmentSetup") },
    { title: t("demo.toc.deployment"), desc: t("demo.zeroDowntimeEdgeDeployment") },
  ];

  useEffect(() => {
    if (!autoRunning) return;
    const id = setInterval(() => {
      setActiveSec((s) => (s + 1) % sections.length);
    }, 1800);
    return () => clearInterval(id);
  }, [sections.length, autoRunning]);

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
export const LyCollapsibleRailSidebarDemo: React.FC = () => {
  const { t } = useLocale();
  const [expanded, setExpanded] = useDemoToggle(true);
  const [activeNav, setActiveNav] = useState(0);
  const navs = [
    { icon: '🏠', label: t("demo.dashboard") },
    { icon: '📊', label: t("demo.analytics") },
    { icon: '⚡', label: t("demo.automations") },
  ];

  return (
    <div className="w-full h-40 flex items-center justify-center pt-5 px-4 select-none">
      <div className="w-full max-w-[230px] h-24 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 overflow-hidden flex shadow-xs">
        {/* 접이식 레일 사이드바 */}
        <div
          className={`h-full bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 p-1.5 flex flex-col justify-between transition-[width] duration-300 ${
            expanded ? 'w-24' : 'w-9'
          }`}
        >
          <div className="space-y-1">
            {navs.map((item, idx) => (
              <button
                key={item.label}
                type="button"
                aria-label={item.label} aria-current={activeNav === idx ? 'page' : undefined} onClick={() => setActiveNav(idx)}
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
            aria-expanded={expanded} aria-label={expanded ? t("demo.collapseRail") : t("demo.expandRail")} onClick={() => setExpanded((e) => !e)}
            className="w-full h-4 rounded-sm bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-[8px] font-mono text-slate-600 dark:text-slate-400 flex items-center justify-center cursor-pointer border border-slate-200/80 dark:border-transparent transition-colors"
          >
            {expanded ? t("demo.collapseRail") : '»'}
          </button>
        </div>

        {/* 우측 메인 콘텐츠 */}
        <div className="flex-1 min-w-0 p-2 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-900 dark:text-white truncate">{navs[activeNav].label}</span>
            <span className="text-[8px] px-1.5 py-0.5 rounded-sm bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 font-mono border border-indigo-100 dark:border-transparent">
              {expanded ? t("sample.lyCollapsibleRailSidebar.label220px") : t("sample.lyCollapsibleRailSidebar.label56px")}
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
export const LyBreadcrumbFolderDrillDemo: React.FC = () => {
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
export const LyResizableSplitPaneDemo: React.FC = () => {
  const { t } = useLocale();
  const [leftRatio, setLeftRatio] = useState(45);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false); const draggedRef = useRef(false);

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
          if (dragging) { draggedRef.current = true; handleMove(e.clientX); }
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
          <span className="text-[8px] font-mono text-indigo-400">{t("sample.lyResizableSplitPane.editor")}{leftRatio}%)</span>
          <div className="space-y-1">
            <div className="w-4/5 h-1.5 rounded-sm bg-indigo-500/40" />
            <div className="w-3/5 h-1.5 rounded-sm bg-slate-700" />
          </div>
        </div>

        {/* 중앙 드래그 가터 핸들 */}
        <div data-demo-control
          onPointerDown={() => { draggedRef.current = false; setDragging(true); }}
          role="separator" tabIndex={0} aria-orientation="vertical" aria-valuenow={leftRatio} aria-valuemin={25} aria-valuemax={75} aria-label={t("demo.dragLeftRightOrClick")} onClick={() => { if (draggedRef.current) { draggedRef.current = false; return; } setLeftRatio((r) => (r === 45 ? 65 : r === 65 ? 30 : 45)); }} onKeyDown={(e) => { if (e.key === 'ArrowLeft') { e.preventDefault(); setLeftRatio((r) => Math.max(25, r - 5)); } else if (e.key === 'ArrowRight') { e.preventDefault(); setLeftRatio((r) => Math.min(75, r + 5)); } else if (e.key === 'Home') { e.preventDefault(); setLeftRatio(25); } else if (e.key === 'End') { e.preventDefault(); setLeftRatio(75); } else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLeftRatio((r) => (r === 45 ? 65 : r === 65 ? 30 : 45)); } }}
          className="w-2 h-full bg-slate-800 hover:bg-indigo-500 active:bg-indigo-400 flex items-center justify-center cursor-col-resize transition-colors shrink-0"
          title={t("demo.dragLeftRightOrClick")}
        >
          <MoveHorizontal className="w-2.5 h-2.5 text-slate-300" />
        </div>

        {/* 우측 Preview 패인 */}
        <div className="flex-1 h-full bg-slate-900 p-2 flex flex-col justify-between overflow-hidden">
          <span className="text-[8px] font-mono text-emerald-400">{t("sample.lyResizableSplitPane.preview")}{100 - leftRatio}%)</span>
          <div className="w-full h-7 rounded-sm bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-[8px] font-bold text-emerald-300">{t("sample.lyResizableSplitPane.liveView")}</div>
        </div>
      </div>
    </div>
  );
};


/* [스타일 +1] 홀로그래픽 포일 이리데슨트 (Holographic Foil Iridescent Style) */
export const StHolographicFoilCardDemo: React.FC = () => {
  const { t } = useLocale();
  const [angle, setAngle] = useState(125);

  return (
    <div data-demo-control
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        setAngle(Math.round(90 + pct * 140));
      }}
      role="button" tabIndex={0} onClick={() => setAngle((a) => (a + 45) % 360)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setAngle((a) => (a + 45) % 360); } }}
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
            <span className="px-1.5 py-0.5 rounded-sm bg-white/15 border border-white/30 text-[8px] font-black text-white tracking-wider">{t("sample.stHolographicFoilCard.holoFoil")}</span>
            <span className="text-[9px] font-mono text-cyan-200">{t("sample.stHolographicFoilCard.edition")}</span>
          </div>
          <div>
            <div className="text-xs font-black text-white drop-shadow-sm">{t("sample.stHolographicFoilCard.iridescentPrism")}</div>
          </div>
        </div>
      </div>
    </div>
  );
};


/* [스타일 +2] 서멀 영수증 & 바코드 티켓 (Thermal Receipt & Barcode Ticket) */
export const StReceiptThermalMonoDemo: React.FC = () => {
  const { t } = useLocale();
  const [stamped, setStamped] = useDemoToggle(true);
  const bars = [2, 1, 3, 1, 2, 1, 4, 1, 2, 2, 1, 3, 1, 2, 1, 3, 2, 1];

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setStamped((s) => !s)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setStamped((s) => !s); } }}
      className="w-full h-40 flex items-center justify-center pt-5 px-5 cursor-pointer select-none"
    >
      <div className="relative w-full max-w-[195px] bg-[#faf8f5] text-zinc-900 rounded-xs px-3 py-2 font-mono shadow-lg border-y-2 border-dashed border-zinc-400">
        <div className="flex items-center justify-between text-[9px] font-bold border-b border-dashed border-zinc-400 pb-1">
          <span>{t("sample.stReceiptThermalMono.vibeMart042")}</span>
          <span>2026-10-17</span>
        </div>
        <div className="py-1 space-y-0.5 text-[9px]">
          <div className="flex justify-between">
            <span>{t("sample.stReceiptThermalMono.uiItem")}</span>
            <span className="font-bold">$24.00</span>
          </div>
          <div className="flex justify-between text-zinc-600">
            <span>{t("sample.stReceiptThermalMono.motionItem")}</span>
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
                className="h-full bg-[#18181b] inline-block"
              />
            ))}
          </div>
          <span
            className={`px-1 py-0.5 text-[8px] font-black border ${
              stamped ? 'border-rose-600 text-rose-600 -rotate-6' : 'border-zinc-500 text-zinc-500'
            } transition-transform`}
          >
            {stamped ? t("sample.stReceiptThermalMono.paid") : t("sample.stReceiptThermalMono.receipt")}
          </span>
        </div>
      </div>
    </div>
  );
};


/* [스타일 +3] Y2K 애시드 크롬 & 파스텔 윈도우 (Y2K Metallic Chrome & Pastel UI) */
export const StVaporwaveY2kChromeDemo: React.FC = () => {
  const { t } = useLocale();
  const [liked, setLiked] = useState(true);

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setLiked((l) => !l)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLiked((l) => !l); } }}
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
          <span>{t("sample.stVaporwaveY2kChrome.cyberGirl2000Exe")}</span>
          <span className="text-pink-600">♥</span>
        </div>

        <div className="flex items-center justify-between px-1 py-1">
          <div>
            <div className="text-[11px] font-black tracking-tight text-fuchsia-900">{t("sample.stVaporwaveY2kChrome.aestheticChrome")}</div>
            <div className="text-[9px] font-semibold text-sky-800">{t("sample.stVaporwaveY2kChrome.track01BubblegumPop")}</div>
          </div>
          <span
            style={{
              background: 'linear-gradient(180deg, #f8fafc 0%, #94a3b8 50%, #e2e8f0 100%)',
            }}
            className="px-2 py-1 rounded-full border border-slate-500 text-[9px] font-black text-slate-900 shadow-xs"
          >
            {liked ? t("sample.stVaporwaveY2kChrome.play") : t("sample.stVaporwaveY2kChrome.cue")}
          </span>
        </div>
      </div>
    </div>
  );
};


/* [스타일 +4] 사이버펑크 하이볼티지 네온 (Cyberpunk High-Voltage Neon UI) */
export const StCyberpunkNeonGlitchDemo: React.FC = () => {
  const { t } = useLocale();
  const [overdrive, setOverdrive] = useDemoToggle(true);

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setOverdrive((o) => !o)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOverdrive((o) => !o); } }}
      className="w-full h-40 flex items-center justify-center pt-5 px-5 cursor-pointer select-none"
    >
      <div
        style={{
          clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
        }}
        className="w-full max-w-[205px] bg-[#facc15] text-zinc-950 p-2.5 relative shadow-[0_0_20px_rgba(250,204,21,0.3)] border-l-4 border-cyan-400"
      >
        <div className="flex items-center justify-between mb-1">
          <span className="bg-zinc-950 text-[#00f0ff] text-[8px] font-mono font-black px-1.5 py-0.5 tracking-wider">{t("sample.stCyberpunkNeonGlitch.nc2077Sys")}</span>
          <span className="text-[8px] font-mono font-black text-zinc-900">{t("sample.stCyberpunkNeonGlitch.voltage994v")}</span>
        </div>

        <div className="text-xs font-black tracking-tight uppercase leading-tight">
          {overdrive ? t("sample.stCyberpunkNeonGlitch.neonOverdrive") : t("sample.stCyberpunkNeonGlitch.breachProtocol")}
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
export const VdGlitchCutReelDemo: React.FC = () => { const autoRunning = useDemoAutoplayRunning();
  const { t } = useLocale();
  const [idx, setIdx] = useState(0);
  const [glitching, setGlitching] = useState(false);
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>());
  const delay = (callback: () => void, milliseconds: number) => {
    const timer = setTimeout(() => { timers.current.delete(timer); callback(); }, milliseconds);
    timers.current.add(timer);
  };
  useEffect(() => () => { timers.current.forEach(clearTimeout); timers.current.clear(); }, []);

  const specs = [
    { tag: 'SCENE 01 // DISPLAY', title: '240Hz OLED', accent: 'text-cyan-300 border-cyan-400/50' },
    { tag: 'SCENE 02 // SPEED', title: '0.03ms GTG', accent: 'text-rose-300 border-rose-400/50' },
    { tag: 'SCENE 03 // CORE', title: 'NEURAL AI+', accent: 'text-amber-300 border-amber-400/50' },
  ];

  useEffect(() => {
    if (!autoRunning) { setGlitching(false); return; }
    const id = setInterval(() => {
      setGlitching(true);
      delay(() => {
        setIdx((i) => (i + 1) % specs.length);
      }, 90);
      delay(() => {
        setGlitching(false);
      }, 220);
    }, 1500);
    return () => { clearInterval(id); timers.current.forEach(clearTimeout); timers.current.clear(); };
  }, [specs.length, autoRunning]);

  const cur = specs[idx];

  return (
    <div data-demo-control
      role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setGlitching(true); setIdx((i) => (i + 1) % specs.length); delay(() => setGlitching(false), 200); } }} onClick={() => {
        setGlitching(true);
        setIdx((i) => (i + 1) % specs.length);
        delay(() => setGlitching(false), 200);
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
          <span className="text-rose-400 font-bold">{t("sample.mgKenBurnsPan.rec")}</span>
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
export const VdSlotJackpotHeadlineDemo: React.FC = () => { const autoRunning = useDemoAutoplayRunning();
  const { t } = useLocale();
  const [step, setStep] = useState(3);
  const reels = [
    ['SHIP', 'BUILD', 'CREATE'],
    ['2X', '5X', '10X'],
    ['BETTER', 'SMARTER', 'FASTER'],
  ];

  useEffect(() => {
    if (!autoRunning) return;
    const id = setInterval(() => {
      setStep((s) => (s >= 4 ? 0 : s + 1));
    }, 680);
    return () => clearInterval(id);
  }, [autoRunning]);

  const locked = step >= 3;

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setStep(0)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setStep(0); } }}
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
        {locked ? t("sample.vdSlotJackpotHeadline.jackpotCreate10xFaster") : t("sample.vdSlotJackpotHeadline.rollingHeadlineReels")}
      </span>
    </div>
  );
};


/* [모션 영상 +3] 컨버전 퍼널 단계별 리빌 씬 (Conversion Funnel Stage Reveal) */
export const VdFunnelConversionDropDemo: React.FC = () => { const autoRunning = useDemoAutoplayRunning();
  const { t } = useLocale();
  const [stage, setStage] = useState(3);
  const steps = [
    { label: t("sample.vdFunnelConversionDrop.visitors"), val: '100%', width: 'w-44', color: 'from-indigo-500 to-blue-500' },
    { label: t("sample.vdFunnelConversionDrop.signUps"), val: '58%', width: 'w-32', color: 'from-violet-500 to-indigo-500' },
    { label: t("sample.vdFunnelConversionDrop.proPaid"), val: '28.4%', width: 'w-24', color: 'from-emerald-400 to-teal-500' },
  ];

  useEffect(() => {
    if (!autoRunning) return;
    const id = setInterval(() => {
      setStage((s) => (s >= 4 ? 1 : s + 1));
    }, 900);
    return () => clearInterval(id);
  }, [autoRunning]);

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setStage(1)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setStage(1); } }}
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
      >{t("sample.vdFunnelConversionDrop.finalCvr284")}</div>
    </div>
  );
};


/* [모션 영상 +4] 브레이킹 뉴스 속보 & 티커 씬 (Breaking News Broadcast Overlay) */
export const VdBreakingNewsTickerDemo: React.FC = () => { const autoRunning = useDemoAutoplayRunning();
  const { t } = useLocale();
  const [headIdx, setHeadIdx] = useState(0);
  const headlines = [
    t("demo.vibeDictionaryReaches122Interactions"),
    t("demo.copyMotionVideoPromptsWithOne"),
    t("demo.liveInteractiveDemoPreviewsAreReady"),
  ];
  const tickerText =
    t("demo.newsUi36Graphics26Layout");

  useEffect(() => {
    if (!autoRunning) return;
    const id = setInterval(() => {
      setHeadIdx((h) => (h + 1) % headlines.length);
    }, 2000);
    return () => clearInterval(id);
  }, [headlines.length, autoRunning]);

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setHeadIdx((h) => (h + 1) % headlines.length)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setHeadIdx((h) => (h + 1) % headlines.length); } }}
      className="w-full h-40 flex items-center justify-center pt-5 px-4 cursor-pointer select-none"
    >
      <div className="w-full max-w-[225px] rounded-xl bg-slate-950 border border-rose-500/40 overflow-hidden shadow-lg">
        {/* 상단 BREAKING LIVE 헤더 */}
        <div className="bg-linear-to-r from-rose-600 to-red-700 px-2.5 py-1 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            <span className="text-[9px] font-black tracking-wider text-white">{t("sample.vdBreakingNewsTicker.breakingNews")}</span>
          </div>
          <span className="text-[8px] font-mono text-white/90">{t("sample.vdBreakingNewsTicker.live24h")}</span>
        </div>

        {/* 중앙 수직 슬라이드 교체형 속보 헤드라인 */}
        <div className="px-2.5 py-2 bg-slate-900 overflow-hidden">
          <div
            key={headIdx}
            className="text-[10px] leading-snug font-bold text-white line-clamp-2 animate-toast-slide-up"
          >
            {headlines[headIdx]}
          </div>
        </div>

        {/* 하단 무한 루프 뉴스 자막 티커 (.animate-marquee-left 2배 트랙) */}
        <div className="bg-amber-400 text-slate-950 py-0.5 overflow-hidden whitespace-nowrap">
          <div className="flex w-max animate-marquee-left text-[9px] font-mono font-black">
            <span className="px-2">{tickerText}</span>
            <span className="px-2">{tickerText}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
