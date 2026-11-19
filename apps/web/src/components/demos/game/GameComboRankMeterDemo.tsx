import { useEffect, useState } from 'react';
import { Flame, RotateCcw } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

const RANKS = [
  { key: 'sample.game.combo.rankD', color: 'text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700' },
  { key: 'sample.game.combo.rankC', color: 'text-sky-600 dark:text-sky-300 bg-sky-50 dark:bg-sky-950 border-sky-300 dark:border-sky-700' },
  { key: 'sample.game.combo.rankB', color: 'text-emerald-600 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 border-emerald-300 dark:border-emerald-700' },
  { key: 'sample.game.combo.rankA', color: 'text-amber-600 dark:text-amber-300 bg-amber-50 dark:bg-amber-950 border-amber-300 dark:border-amber-700' },
  { key: 'sample.game.combo.rankS', color: 'text-rose-600 dark:text-rose-300 bg-rose-50 dark:bg-rose-950 border-rose-300 dark:border-rose-700' },
  { key: 'sample.game.combo.rankSs', color: 'text-fuchsia-600 dark:text-fuchsia-300 bg-fuchsia-50 dark:bg-fuchsia-950 border-fuchsia-300 dark:border-fuchsia-700' },
] as const;

export function GameComboRankMeterDemo() {
  const { t } = useLocale();
  const [combo, setCombo] = useState({ rankIndex: 3, hits: 14, decay: 35 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCombo((prev) => {
        if (prev.decay > 4) return { ...prev, decay: prev.decay - 4 };
        if (prev.rankIndex > 0) return { ...prev, rankIndex: prev.rankIndex - 1, decay: 100 };
        return { ...prev, decay: 0 };
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleBoost = (hitDelta: number, gaugeDelta: number) => {
    setCombo((prev) => {
      const nextGauge = prev.decay + gaugeDelta;
      if (nextGauge >= 100 && prev.rankIndex < RANKS.length - 1) {
        return { rankIndex: prev.rankIndex + 1, hits: prev.hits + hitDelta, decay: 75 };
      }
      return { ...prev, hits: prev.hits + hitDelta, decay: Math.min(100, nextGauge) };
    });
  };

  const handleReset = () => {
    setCombo({ rankIndex: 3, hits: 14, decay: 35 });
  };

  const activeRank = RANKS[combo.rankIndex];

  return (
    <div className="w-full min-h-[180px] flex flex-col justify-center items-center pt-11 pb-3 px-3 sm:pt-12 sm:pb-4 sm:px-4 text-xs select-none">
      <div className="w-full max-w-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 shadow-sm flex flex-col gap-3">
        {/* Rank & Hit Counter */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span
              className={`w-11 h-11 rounded-xl border-2 flex items-center justify-center text-lg font-black font-mono transition-colors ${activeRank.color}`}
            >
              {t(activeRank.key)}
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {t('demo.game.combo.title')}
              </p>
              <p className="text-sm font-black font-mono text-slate-900 dark:text-white">
                {t('demo.game.combo.hitsLabel', { count: combo.hits })}
              </p>
            </div>
          </div>

          <Flame aria-hidden="true" className={`w-5 h-5 ${combo.rankIndex >= 4 ? 'text-rose-500' : 'text-amber-500'}`} />
        </div>

        {/* Decay Meter */}
        <div className="space-y-1">
          <div
            role="progressbar"
            aria-label={t('demo.game.combo.decayLabel')}
            aria-valuenow={Math.round(combo.decay)}
            aria-valuemin={0}
            aria-valuemax={100}
            className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden"
          >
            <div
              className="h-full bg-linear-to-r from-amber-500 to-rose-500 transition-[width] duration-75 ease-linear"
              style={{ width: `${Math.max(0, Math.min(100, combo.decay))}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => handleBoost(1, 20)}
            className="flex-1 min-h-7 px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-[11px] hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            {t('demo.game.combo.hitBtn')}
          </button>
          <button
            type="button"
            onClick={() => handleBoost(3, 45)}
            className="flex-1 min-h-7 px-2 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] transition-colors cursor-pointer"
          >
            {t('demo.game.combo.chainBtn')}
          </button>
          <button
            type="button"
            onClick={handleReset}
            aria-label={t('demo.game.combo.resetBtn')}
            title={t('demo.game.combo.resetBtn')}
            className="min-h-7 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer flex items-center justify-center"
          >
            <RotateCcw aria-hidden="true" className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
