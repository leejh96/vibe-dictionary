import { useEffect, useRef, useState } from 'react';
import { Target } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

type DamageKind = 'normal' | 'crit' | 'weak';

interface FloatingPopup {
  id: number;
  kind: DamageKind;
  lane: number;
  isPreview?: boolean;
}

const LANE_POSITIONS = [16, 84, 38, 62] as const;

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

const DAMAGE_CONFIG: Record<
  DamageKind,
  { amount: number; valueKey: 'sample.game.damage.valNormal' | 'sample.game.damage.valCrit' | 'sample.game.damage.valWeak' }
> = {
  normal: { amount: 124, valueKey: 'sample.game.damage.valNormal' },
  crit: { amount: 480, valueKey: 'sample.game.damage.valCrit' },
  weak: { amount: 310, valueKey: 'sample.game.damage.valWeak' },
};

export function GameDamageNumberPopDemo() {
  const { t } = useLocale();
  const [popups, setPopups] = useState<FloatingPopup[]>([
    { id: 1, kind: 'crit', lane: 1, isPreview: true },
  ]);
  const [totalDamage, setTotalDamage] = useState(480);
  const [flashing, setFlashing] = useState(false);
  const [shaking, setShaking] = useState(false);
  const nextIdRef = useRef(2);
  const laneCursorRef = useRef(0);
  const timersRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      for (const timer of timers) clearTimeout(timer);
      timers.clear();
    };
  }, []);

  const schedule = (fn: () => void, ms: number) => {
    const handle = setTimeout(() => {
      timersRef.current.delete(handle);
      fn();
    }, ms);
    timersRef.current.add(handle);
  };

  const triggerHit = (kind: DamageKind) => {
    const id = nextIdRef.current++;
    const lane = laneCursorRef.current % LANE_POSITIONS.length;
    laneCursorRef.current += 1;

    setPopups((prev) => [
      ...prev.filter((item) => !item.isPreview && item.lane !== lane),
      { id, kind, lane },
    ]);
    setTotalDamage((prev) => prev + DAMAGE_CONFIG[kind].amount);

    setFlashing(true);
    schedule(() => setFlashing(false), 70);

    if (!prefersReducedMotion()) {
      setShaking(true);
      schedule(() => setShaking(false), 140);
    }

    schedule(() => {
      setPopups((prev) => prev.filter((item) => item.id !== id));
    }, 750);
  };

  return (
    <div className="w-full min-h-[180px] flex flex-col justify-center items-center pt-11 pb-3 px-3 sm:pt-12 sm:pb-4 sm:px-4 text-xs select-none">
      <div className="w-full max-w-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 shadow-sm flex flex-col gap-2.5">
        {/* Header Row */}
        <div className="flex items-center justify-between gap-2">
          <p className="font-bold text-slate-800 dark:text-slate-100 truncate">
            {t('demo.game.damage.targetTitle')}
          </p>
          <span className="shrink-0 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {t('demo.game.damage.totalLabel')}: {totalDamage}
          </span>
        </div>

        {/* Dedicated Popups + Target Stage */}
        <div className="relative h-[88px] w-full rounded-xl bg-slate-100 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800 overflow-hidden">
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none">
            <div
              style={{ transform: shaking ? 'translateX(4px)' : 'translateX(0px)' }}
              className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-75 ${
                flashing
                  ? 'bg-rose-500 text-white border-rose-400 brightness-125 scale-105'
                  : 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Target aria-hidden="true" className="w-5 h-5" />
            </div>
          </div>

          <div className="absolute inset-0 pointer-events-none" aria-live="polite">
            {popups.map((popup) => (
              <div
                key={popup.id}
                data-damage-popup="true"
                data-lane={popup.lane}
                style={
                  popup.isPreview
                    ? { left: '78%', bottom: '34px', transform: 'translate(-50%, 0)' }
                    : { left: `${LANE_POSITIONS[popup.lane]}%`, bottom: '14px' }
                }
                className={`absolute flex flex-col items-center whitespace-nowrap leading-tight font-mono font-black ${
                  popup.isPreview ? '' : 'game-damage-popup'
                } ${
                  popup.kind === 'crit'
                    ? 'text-lg text-amber-500 dark:text-amber-400 drop-shadow-xs'
                    : popup.kind === 'weak'
                    ? 'text-base text-sky-600 dark:text-sky-400'
                    : 'text-sm text-slate-800 dark:text-slate-100'
                }`}
              >
                {popup.kind === 'crit' && (
                  <span className="text-[9px] tracking-wider leading-none">{t('demo.game.damage.critTag')}</span>
                )}
                {popup.kind === 'weak' && (
                  <span className="text-[9px] tracking-wider leading-none">{t('demo.game.damage.weakTag')}</span>
                )}
                <span>{t(DAMAGE_CONFIG[popup.kind].valueKey)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trigger Buttons */}
        <div className="grid grid-cols-3 gap-1.5">
          <button
            type="button"
            onClick={() => triggerHit('normal')}
            className="min-h-7 px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-[11px] hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            {t('demo.game.damage.hit')}
          </button>
          <button
            type="button"
            onClick={() => triggerHit('crit')}
            className="min-h-7 px-2 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-[11px] transition-colors cursor-pointer"
          >
            {t('demo.game.damage.crit')}
          </button>
          <button
            type="button"
            onClick={() => triggerHit('weak')}
            className="min-h-7 px-2 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-[11px] transition-colors cursor-pointer"
          >
            {t('demo.game.damage.weak')}
          </button>
        </div>
      </div>
    </div>
  );
}
