import { useEffect, useRef, useState } from 'react';
import { Sparkles, Star } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

type RarityTier = 'common' | 'rare' | 'epic' | 'legendary';

const RARITY_CONFIG: Record<
  RarityTier,
  {
    stars: number;
    tierKey: 'demo.game.loot.tierCommon' | 'demo.game.loot.tierRare' | 'demo.game.loot.tierEpic' | 'demo.game.loot.tierLegendary';
    itemKey: 'demo.game.loot.itemCommon' | 'demo.game.loot.itemRare' | 'demo.game.loot.itemEpic' | 'demo.game.loot.itemLegendary';
    stat1Key: 'demo.game.loot.statCommon1' | 'demo.game.loot.statRare1' | 'demo.game.loot.statEpic1' | 'demo.game.loot.statLegendary1';
    stat2Key: 'demo.game.loot.statCommon2' | 'demo.game.loot.statRare2' | 'demo.game.loot.statEpic2' | 'demo.game.loot.statLegendary2';
    frameClass: string;
    badgeClass: string;
    starClass: string;
  }
> = {
  common: {
    stars: 1,
    tierKey: 'demo.game.loot.tierCommon',
    itemKey: 'demo.game.loot.itemCommon',
    stat1Key: 'demo.game.loot.statCommon1',
    stat2Key: 'demo.game.loot.statCommon2',
    frameClass: 'border-slate-300 dark:border-slate-700',
    badgeClass: 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
    starClass: 'text-slate-400',
  },
  rare: {
    stars: 2,
    tierKey: 'demo.game.loot.tierRare',
    itemKey: 'demo.game.loot.itemRare',
    stat1Key: 'demo.game.loot.statRare1',
    stat2Key: 'demo.game.loot.statRare2',
    frameClass: 'border-sky-400 dark:border-sky-500 shadow-sky-500/15',
    badgeClass: 'bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300',
    starClass: 'text-sky-500',
  },
  epic: {
    stars: 3,
    tierKey: 'demo.game.loot.tierEpic',
    itemKey: 'demo.game.loot.itemEpic',
    stat1Key: 'demo.game.loot.statEpic1',
    stat2Key: 'demo.game.loot.statEpic2',
    frameClass: 'border-violet-500 dark:border-violet-400 shadow-violet-500/20',
    badgeClass: 'bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300',
    starClass: 'text-violet-500',
  },
  legendary: {
    stars: 4,
    tierKey: 'demo.game.loot.tierLegendary',
    itemKey: 'demo.game.loot.itemLegendary',
    stat1Key: 'demo.game.loot.statLegendary1',
    stat2Key: 'demo.game.loot.statLegendary2',
    frameClass: 'border-amber-400 dark:border-amber-400 shadow-amber-500/25',
    badgeClass: 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300',
    starClass: 'text-amber-500',
  },
};

export function GameLootRarityRevealDemo() {
  const { t } = useLocale();
  const [tier, setTier] = useState<RarityTier>('epic');
  const [revealing, setRevealing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const triggerReveal = (nextTier: RarityTier) => {
    setTier(nextTier);
    setRevealing(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setRevealing(false);
    }, 380);
  };

  const config = RARITY_CONFIG[tier];

  return (
    <div className="w-full min-h-[180px] flex flex-col justify-center items-center pt-11 pb-3 px-3 sm:pt-12 sm:pb-4 sm:px-4 text-xs select-none">
      <div className="w-full max-w-sm flex flex-col gap-2">
        {/* Tier Selector */}
        <div className="grid grid-cols-4 gap-1">
          {(['common', 'rare', 'epic', 'legendary'] as const).map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={tier === key}
              onClick={() => triggerReveal(key)}
              className={`min-h-6 px-1.5 py-1 rounded-lg text-[10px] font-bold transition-colors cursor-pointer ${
                tier === key
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {t(RARITY_CONFIG[key].tierKey)}
            </button>
          ))}
        </div>

        {/* Loot Card */}
        <div
          className={`relative overflow-hidden rounded-xl border-2 bg-white dark:bg-slate-900 p-3 shadow-md transition-all duration-300 ${
            config.frameClass
          } ${revealing ? 'scale-[1.02]' : 'scale-100'}`}
        >
          {revealing && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-white/40 dark:via-white/20 to-transparent translate-x-full transition-transform duration-[380ms]"
            />
          )}

          <div className="flex items-start justify-between gap-2">
            <div>
              <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold ${config.badgeClass}`}>
                {t(config.tierKey)}
              </span>
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">
                {t(config.itemKey)}
              </h4>
            </div>
            <div className="flex items-center gap-0.5 pt-0.5" aria-hidden="true">
              {Array.from({ length: config.stars }, (_, i) => (
                <Star key={i} className={`w-3.5 h-3.5 fill-current ${config.starClass}`} />
              ))}
            </div>
          </div>

          <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
            <div className="space-y-0.5 text-[11px] font-medium text-slate-600 dark:text-slate-300">
              <p>{t(config.stat1Key)}</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">{t(config.stat2Key)}</p>
            </div>
            <button
              type="button"
              onClick={() => triggerReveal(tier)}
              className="shrink-0 min-h-7 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-bold text-[11px] hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Sparkles aria-hidden="true" className="w-3 h-3" />
              <span>{t('demo.game.loot.revealBtn')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
