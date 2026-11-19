import { useEffect, useRef, useState } from 'react';
import { Flame, RotateCcw, Zap } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

function getPhase(hp: number): 1 | 2 | 3 {
  if (hp > 66) return 1;
  if (hp > 33) return 2;
  return 3;
}

export function GameBossPhaseBarDemo() {
  const { t } = useLocale();
  const [hp, setHp] = useState(100);
  const [stagger, setStagger] = useState(25);
  const [phaseBanner, setPhaseBanner] = useState<1 | 2 | 3 | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const currentPhase = getPhase(hp);
  const isStaggered = stagger >= 100;

  const handleAttack = (dmg: number, staggerGain: number) => {
    const prevPhase = getPhase(hp);
    const nextHp = Math.max(0, hp - dmg);
    const nextPhase = getPhase(nextHp);
    const nextStagger = Math.min(100, stagger + staggerGain);
    setHp(nextHp);
    setStagger(nextStagger);

    if (nextPhase !== prevPhase && nextHp > 0) {
      setPhaseBanner(nextPhase);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setPhaseBanner(null);
      }, 500);
    }
  };

  const handleReset = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setHp(100);
    setStagger(25);
    setPhaseBanner(null);
  };

  return (
    <div className="w-full min-h-[180px] flex flex-col justify-center items-center pt-11 pb-3 px-3 sm:pt-12 sm:pb-4 sm:px-4 text-xs select-none">
      <div className="w-full max-w-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 shadow-sm flex flex-col gap-2.5">
        {/* Boss Title & Phase Badge */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <Flame aria-hidden="true" className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="font-extrabold text-slate-900 dark:text-slate-100 truncate">
              {t('demo.game.boss.name')}
            </span>
          </div>
          <span
            className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${
              currentPhase === 3
                ? 'bg-rose-100 dark:bg-rose-950 border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-300'
                : currentPhase === 2
                ? 'bg-amber-100 dark:bg-amber-950 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300'
                : 'bg-indigo-50 dark:bg-indigo-950 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300'
            }`}
          >
            {t('demo.game.boss.phaseLabel', { phase: currentPhase })}
          </span>
        </div>

        {/* Phase Shift Alert */}
        {phaseBanner !== null && (
          <div
            role="status"
            className="px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-400/50 text-amber-700 dark:text-amber-300 text-[11px] font-extrabold text-center"
          >
            {t('demo.game.boss.phaseShift', { phase: phaseBanner })}
          </div>
        )}

        {/* Main Boss HP Bar with 66% and 33% Notches */}
        <div className="space-y-1">
          <div className="relative h-3.5 w-full rounded-md bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div
              role="progressbar"
              aria-label={t('demo.game.boss.hpBarLabel')}
              aria-valuenow={hp}
              aria-valuemin={0}
              aria-valuemax={100}
              className="h-full bg-linear-to-r from-rose-600 to-rose-400 transition-[width] duration-200 ease-out"
              style={{ width: `${hp}%` }}
            />
            <span
              aria-hidden="true"
              className="absolute inset-y-0 w-0.5 bg-white/80 dark:bg-slate-950/80"
              style={{ left: '33%' }}
            />
            <span
              aria-hidden="true"
              className="absolute inset-y-0 w-0.5 bg-white/80 dark:bg-slate-950/80"
              style={{ left: '66%' }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400">
            <span>{hp}%</span>
            <span>66% · 33%</span>
          </div>
        </div>

        {/* Stagger / Poise Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] font-bold">
            <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400">
              <Zap aria-hidden="true" className="w-3 h-3" />
              <span>{isStaggered ? t('demo.game.boss.staggered') : t('demo.game.boss.staggerLabel')}</span>
            </span>
            <span className="font-mono text-slate-600 dark:text-slate-300">{stagger}%</span>
          </div>
          <div
            role="progressbar"
            aria-label={t('demo.game.boss.staggerBarLabel')}
            aria-valuenow={stagger}
            aria-valuemin={0}
            aria-valuemax={100}
            className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden"
          >
            <div
              className={`h-full transition-[width] duration-200 ${
                isStaggered ? 'bg-amber-400' : 'bg-amber-500'
              }`}
              style={{ width: `${stagger}%` }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 pt-0.5">
          <button
            type="button"
            onClick={() => handleAttack(20, 25)}
            disabled={hp === 0}
            className="flex-1 min-h-7 px-2 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-bold text-[11px] hover:bg-indigo-100 dark:hover:bg-indigo-900/70 disabled:opacity-40 transition-colors cursor-pointer"
          >
            {t('demo.game.boss.attack')}
          </button>
          <button
            type="button"
            onClick={() => handleAttack(35, 50)}
            disabled={hp === 0}
            className="flex-1 min-h-7 px-2 py-1 rounded-lg bg-rose-600 text-white font-bold text-[11px] hover:bg-rose-500 disabled:opacity-40 transition-colors cursor-pointer"
          >
            {t('demo.game.boss.heavy')}
          </button>
          <button
            type="button"
            onClick={handleReset}
            aria-label={t('demo.game.boss.reset')}
            title={t('demo.game.boss.reset')}
            className="min-h-7 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer flex items-center justify-center"
          >
            <RotateCcw aria-hidden="true" className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
