import { useEffect, useRef, useState } from 'react';
import { Sword, Zap } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export function GameHitstopImpactFrameDemo() {
  const { t } = useLocale();
  const [hitstopEnabled, setHitstopEnabled] = useState(true);
  const [shakeEnabled, setShakeEnabled] = useState(true);
  const [phase, setPhase] = useState<'ready' | 'freeze' | 'recoil'>('ready');
  const [shakeX, setShakeX] = useState(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    for (const timer of timersRef.current) clearTimeout(timer);
    timersRef.current = [];
  };

  useEffect(() => clearTimers, []);

  const schedule = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
  };

  const handleStrike = () => {
    clearTimers();
    const freezeMs = hitstopEnabled ? 80 : 0;

    if (shakeEnabled && !prefersReducedMotion()) {
      setShakeX(6);
      schedule(() => setShakeX(-4), 40);
      schedule(() => setShakeX(2), 80);
      schedule(() => setShakeX(0), 120);
    } else {
      setShakeX(0);
    }

    if (freezeMs > 0) {
      setPhase('freeze');
      schedule(() => {
        setPhase('recoil');
        schedule(() => setPhase('ready'), 160);
      }, freezeMs);
    } else {
      setPhase('recoil');
      schedule(() => setPhase('ready'), 160);
    }
  };

  const stateKey =
    phase === 'freeze'
      ? 'demo.game.hitstop.stateFreeze'
      : phase === 'recoil'
      ? 'demo.game.hitstop.stateRecoil'
      : 'demo.game.hitstop.stateReady';

  return (
    <div className="w-full min-h-[180px] flex flex-col justify-center items-center pt-11 pb-3 px-3 sm:pt-12 sm:pb-4 sm:px-4 text-xs select-none">
      <div className="w-full max-w-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 shadow-sm flex flex-col gap-2.5">
        {/* Toggles */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-pressed={hitstopEnabled}
            onClick={() => setHitstopEnabled((prev) => !prev)}
            className={`flex-1 min-h-7 px-2 py-1 rounded-lg border text-[11px] font-bold transition-colors cursor-pointer ${
              hitstopEnabled
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
            }`}
          >
            {t('demo.game.hitstop.toggleHitstop')}
          </button>
          <button
            type="button"
            aria-pressed={shakeEnabled}
            onClick={() => setShakeEnabled((prev) => !prev)}
            className={`flex-1 min-h-7 px-2 py-1 rounded-lg border text-[11px] font-bold transition-colors cursor-pointer ${
              shakeEnabled
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
            }`}
          >
            {t('demo.game.hitstop.toggleShake')}
          </button>
        </div>

        {/* Impact Stage */}
        <div
          style={{ transform: `translateX(${shakeX}px)` }}
          className="h-16 rounded-xl bg-slate-100 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 px-4 flex items-center justify-between transition-transform duration-75 relative overflow-hidden"
        >
          <span
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-indigo-600 text-white font-bold text-[11px] transition-transform duration-100 ${
              phase === 'freeze'
                ? 'translate-x-8 scale-105'
                : phase === 'recoil'
                ? 'translate-x-2'
                : 'translate-x-0'
            }`}
          >
            <Sword aria-hidden="true" className="w-3.5 h-3.5" />
            <span>{t('demo.game.hitstop.attacker')}</span>
          </span>

          {phase === 'freeze' && (
            <span
              aria-hidden="true"
              className="w-8 h-8 rounded-full border-2 border-amber-400 bg-amber-400/20 flex items-center justify-center"
            >
              <Zap className="w-4 h-4 text-amber-400" />
            </span>
          )}

          <span
            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] border transition-all duration-100 ${
              phase === 'freeze'
                ? 'bg-amber-400 text-slate-950 border-amber-300 scale-110'
                : phase === 'recoil'
                ? 'bg-rose-500 text-white border-rose-400 translate-x-2'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700'
            }`}
          >
            {t('demo.game.hitstop.target')}
          </span>
        </div>

        {/* Strike Action & Readout */}
        <div className="flex items-center justify-between gap-2">
          <span role="status" className="text-[11px] font-mono font-semibold text-slate-600 dark:text-slate-300">
            {t(stateKey)}
          </span>
          <button
            type="button"
            onClick={handleStrike}
            className="min-h-7 px-3.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px] transition-colors cursor-pointer"
          >
            {t('demo.game.hitstop.strikeBtn')}
          </button>
        </div>
      </div>
    </div>
  );
}
