import { useEffect, useState } from 'react';
import { Check, Clock, Search, Users, X } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

type QueueStage = 'idle' | 'searching' | 'ready_check' | 'confirmed' | 'cancelled';

export function GameMatchmakingReadyCheckDemo() {
  const { t } = useLocale();
  const [stage, setStage] = useState<QueueStage>('searching');
  const [elapsed, setElapsed] = useState(4);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (stage === 'searching') {
      const id = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(id);
    }
    if (stage === 'ready_check') {
      const id = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setStage('cancelled');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(id);
    }
    return undefined;
  }, [stage]);

  const startSearching = () => {
    setElapsed(0);
    setStage('searching');
  };

  const enterReadyCheck = () => {
    setCountdown(10);
    setStage('ready_check');
  };

  return (
    <div className="w-full min-h-[180px] flex flex-col justify-center items-center pt-11 pb-3 px-3 sm:pt-12 sm:pb-4 sm:px-4 text-xs select-none">
      <div className="w-full max-w-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 shadow-sm flex flex-col gap-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-700 dark:text-slate-300">
            <Users aria-hidden="true" className="w-3 h-3 text-indigo-500" />
            <span>{t('demo.game.match.roleLabel')}</span>
          </span>
          {stage === 'searching' && (
            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-indigo-600 dark:text-indigo-400">
              <Clock aria-hidden="true" className="w-3 h-3" />
              <span>{t('demo.game.match.elapsed', { seconds: elapsed })}</span>
            </span>
          )}
          {stage === 'ready_check' && (
            <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400">
              {t('demo.game.match.countdown', { seconds: countdown })}
            </span>
          )}
        </div>

        {stage === 'idle' && (
          <div className="flex items-center justify-between gap-2 pt-1">
            <p className="font-bold text-slate-800 dark:text-slate-100">{t('demo.game.match.idleTitle')}</p>
            <button
              type="button"
              onClick={startSearching}
              className="min-h-7 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] transition-colors cursor-pointer"
            >
              {t('demo.game.match.startBtn')}
            </button>
          </div>
        )}

        {stage === 'searching' && (
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-100">
              <Search aria-hidden="true" className="w-3.5 h-3.5 text-indigo-500" />
              <span>{t('demo.game.match.searchingTitle')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={enterReadyCheck}
                className="flex-1 min-h-7 px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] transition-colors cursor-pointer"
              >
                {t('demo.game.match.simulateFoundBtn')}
              </button>
              <button
                type="button"
                onClick={() => setStage('idle')}
                className="min-h-7 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-[11px] hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                {t('demo.game.match.cancelBtn')}
              </button>
            </div>
          </div>
        )}

        {stage === 'ready_check' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="font-extrabold text-amber-600 dark:text-amber-400">
                {t('demo.game.match.readyTitle')}
              </span>
              <span className="text-[10px] font-mono font-bold text-slate-600 dark:text-slate-300">
                {t('demo.game.match.playerStatus', { ready: 3 })}
              </span>
            </div>

            <div className="flex items-center gap-1.5" aria-hidden="true">
              {[true, true, true, false].map((ready, idx) => (
                <span
                  key={idx}
                  className={`flex-1 h-2 rounded-full ${
                    ready ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                />
              ))}
            </div>

            <div
              role="progressbar"
              aria-label={t('demo.game.match.readyTitle')}
              aria-valuenow={countdown}
              aria-valuemin={0}
              aria-valuemax={10}
              className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden"
            >
              <div
                className="h-full bg-amber-500 transition-[width] duration-200"
                style={{ width: `${countdown * 10}%` }}
              />
            </div>

            <div className="flex items-center gap-1.5 pt-0.5">
              <button
                type="button"
                onClick={() => setStage('confirmed')}
                className="flex-1 min-h-7 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition-colors cursor-pointer flex items-center justify-center gap-1"
              >
                <Check aria-hidden="true" className="w-3.5 h-3.5" />
                <span>{t('demo.game.match.acceptBtn')}</span>
              </button>
              <button
                type="button"
                onClick={() => setStage('cancelled')}
                className="flex-1 min-h-7 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-[11px] hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer flex items-center justify-center gap-1"
              >
                <X aria-hidden="true" className="w-3.5 h-3.5" />
                <span>{t('demo.game.match.declineBtn')}</span>
              </button>
            </div>
          </div>
        )}

        {(stage === 'confirmed' || stage === 'cancelled') && (
          <div className="flex items-center justify-between gap-2 pt-1">
            <span
              role="status"
              className={`font-bold text-[11px] ${
                stage === 'confirmed'
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-rose-600 dark:text-rose-400'
              }`}
            >
              {stage === 'confirmed' ? t('demo.game.match.confirmedTitle') : t('demo.game.match.cancelledTitle')}
            </span>
            <button
              type="button"
              onClick={startSearching}
              className="shrink-0 min-h-7 px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] transition-colors cursor-pointer"
            >
              {t('demo.game.match.requeueBtn')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
