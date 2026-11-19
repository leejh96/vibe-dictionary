import { useEffect, useRef, useState } from 'react';
import { Heart, Shield, RotateCcw, AlertTriangle } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

const MAX_HP = 100;
const MAX_SHIELD = 40;

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export function GameDelayedHealthBarDemo() {
  const { t } = useLocale();
  const [hp, setHp] = useState(MAX_HP);
  const [shield, setShield] = useState(MAX_SHIELD);
  const [trailHp, setTrailHp] = useState(MAX_HP);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const scheduleTrailCatchup = (nextHp: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (prefersReducedMotion()) {
      setTrailHp(nextHp);
      return;
    }
    timerRef.current = setTimeout(() => {
      setTrailHp(nextHp);
    }, 220);
  };

  const applyDamage = (amount: number) => {
    const absorbed = Math.min(shield, amount);
    const nextShield = shield - absorbed;
    const overflow = amount - absorbed;
    const nextHp = Math.max(0, hp - overflow);
    setShield(nextShield);
    setHp(nextHp);
    if (nextHp < trailHp) {
      scheduleTrailCatchup(nextHp);
    } else {
      setTrailHp(nextHp);
    }
  };

  const applyHeal = (amount: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const nextHp = Math.min(MAX_HP, hp + amount);
    setHp(nextHp);
    setTrailHp(nextHp);
  };

  const handleReset = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setHp(MAX_HP);
    setShield(MAX_SHIELD);
    setTrailHp(MAX_HP);
  };

  const isLowHp = hp <= 25;
  const reducedMotion = prefersReducedMotion();
  const hpPercent = Math.round((hp / MAX_HP) * 100);
  const trailPercent = Math.round((Math.max(hp, trailHp) / MAX_HP) * 100);
  const shieldPercent = Math.round((shield / MAX_SHIELD) * 100);

  return (
    <div className="w-full min-h-[180px] flex flex-col justify-center items-center pt-11 pb-3 px-3 sm:pt-12 sm:pb-4 sm:px-4 text-xs select-none">
      <div
        className={`w-full max-w-sm rounded-xl border bg-white dark:bg-slate-900 p-3.5 shadow-sm flex flex-col gap-2.5 transition-colors duration-200 ${
          isLowHp
            ? `border-rose-500 dark:border-rose-500/90 ring-1 ring-rose-500/30 ${reducedMotion ? '' : 'animate-pulse'}`
            : 'border-slate-200 dark:border-slate-800'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-100">
            <Heart aria-hidden="true" className={`w-3.5 h-3.5 ${isLowHp ? 'text-rose-500' : 'text-emerald-500'}`} />
            <span>{t('demo.game.health.title')}</span>
          </div>
          {isLowHp && (
            <span
              role="status"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-800 text-[10px] font-extrabold text-rose-700 dark:text-rose-300"
            >
              <AlertTriangle aria-hidden="true" className="w-3 h-3" />
              <span>{t('demo.game.health.lowHpWarning')}</span>
            </span>
          )}
        </div>

        {/* Shield Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] font-mono font-bold text-sky-700 dark:text-sky-300">
            <span className="inline-flex items-center gap-1">
              <Shield aria-hidden="true" className="w-3 h-3" />
              <span>{t('sample.game.health.shieldLabel')}</span>
            </span>
            <span>{shield} / {MAX_SHIELD}</span>
          </div>
          <div
            role="progressbar"
            aria-label={t('demo.game.health.shieldBarLabel')}
            aria-valuenow={shield}
            aria-valuemin={0}
            aria-valuemax={MAX_SHIELD}
            className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden"
          >
            <div
              className="h-full bg-sky-500 transition-[width] duration-200 ease-out"
              style={{ width: `${shieldPercent}%` }}
            />
          </div>
        </div>

        {/* Delayed Trail HP Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-700 dark:text-slate-200">
            <span>{t('sample.game.health.hpLabel')}</span>
            <span>{hp} / {MAX_HP}</span>
          </div>
          <div
            role="progressbar"
            aria-label={t('demo.game.health.hpBarLabel')}
            aria-valuenow={hp}
            aria-valuemin={0}
            aria-valuemax={MAX_HP}
            className="relative h-3.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden"
          >
            {/* Trailing Ghost Bar */}
            <div
              className="absolute inset-y-0 left-0 bg-amber-400 dark:bg-amber-300 transition-[width] duration-[450ms] ease-out"
              style={{ width: `${trailPercent}%` }}
            />
            {/* Instant HP Bar */}
            <div
              className={`absolute inset-y-0 left-0 transition-[width] duration-75 ease-out ${
                isLowHp ? 'bg-rose-600' : 'bg-rose-500'
              }`}
              style={{ width: `${hpPercent}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-4 gap-1.5 pt-1">
          <button
            type="button"
            onClick={() => applyDamage(18)}
            className="min-h-7 px-2 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 font-bold text-[11px] hover:bg-rose-100 dark:hover:bg-rose-900/70 transition-colors cursor-pointer"
          >
            {t('demo.game.health.hit')}
          </button>
          <button
            type="button"
            onClick={() => applyDamage(35)}
            className="min-h-7 px-2 py-1 rounded-lg bg-rose-600 text-white font-bold text-[11px] hover:bg-rose-500 transition-colors cursor-pointer"
          >
            {t('demo.game.health.heavy')}
          </button>
          <button
            type="button"
            onClick={() => applyHeal(25)}
            className="min-h-7 px-2 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-bold text-[11px] hover:bg-emerald-100 dark:hover:bg-emerald-900/70 transition-colors cursor-pointer"
          >
            {t('demo.game.health.heal')}
          </button>
          <button
            type="button"
            onClick={handleReset}
            title={t('demo.game.health.reset')}
            aria-label={t('demo.game.health.reset')}
            className="min-h-7 px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-[11px] hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer flex items-center justify-center"
          >
            <RotateCcw aria-hidden="true" className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
