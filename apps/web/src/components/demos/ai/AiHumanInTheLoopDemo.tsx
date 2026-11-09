import { useState } from 'react';
import { Check, X, ShieldAlert } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

export function AiHumanInTheLoopDemo() {
  const { t } = useLocale();
  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');

  return (
    <div className="w-full min-h-[180px] flex flex-col justify-center items-center p-3 sm:p-4 text-xs select-none">
      <div className="w-full max-w-sm rounded-2xl border border-amber-300 dark:border-amber-800/80 bg-white dark:bg-slate-900 p-4 shadow-sm flex flex-col gap-3">
        {/* Header with Title and Risk Badge */}
        <div className="flex items-center justify-between pb-2 border-b border-amber-100 dark:border-amber-950/60">
          <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100">
            <span className="p-1 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
              <ShieldAlert className="w-3.5 h-3.5" />
            </span>
            <span className="truncate">{t('demo.ai.hitl.title')}</span>
          </div>

          <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-[10px] font-bold tracking-wide uppercase">
            {t('demo.ai.hitl.riskBadge')}
          </span>
        </div>

        {/* Command info box */}
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500">
            {t('demo.ai.hitl.commandLabel')}
          </span>
          <code className="block p-1.5 rounded-md bg-slate-900 text-emerald-400 font-mono text-[11px] overflow-x-auto">
            {t('demo.ai.hitl.commandValue')}
          </code>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal pt-1">
            {t('demo.ai.hitl.warningText')}
          </p>
        </div>

        {/* Action Controls or Status Banner */}
        {status === 'pending' ? (
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setStatus('rejected')}
              className="flex-1 py-1.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors cursor-pointer text-center"
            >
              {t('demo.ai.hitl.rejectButton')}
            </button>
            <button
              type="button"
              onClick={() => setStatus('approved')}
              className="flex-1 py-1.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-xs shadow-rose-600/30 transition-colors cursor-pointer text-center"
            >
              {t('demo.ai.hitl.approveButton')}
            </button>
          </div>
        ) : status === 'approved' ? (
          <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold">
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              <span>{t('demo.ai.hitl.approvedNotice')}</span>
            </div>
            <button
              type="button"
              onClick={() => setStatus('pending')}
              className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 font-normal underline cursor-pointer ml-1"
            >
              {t('demo.ai.hitl.restoreAction')}
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-[11px] font-semibold">
            <div className="flex items-center gap-1.5">
              <X className="w-3.5 h-3.5" />
              <span>{t('demo.ai.hitl.rejectedNotice')}</span>
            </div>
            <button
              type="button"
              onClick={() => setStatus('pending')}
              className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 font-normal underline cursor-pointer ml-1"
            >
              {t('demo.ai.hitl.restoreAction')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
