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
