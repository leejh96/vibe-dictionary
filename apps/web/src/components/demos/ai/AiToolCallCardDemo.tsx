import { useState, useEffect, useRef } from 'react';
import { Wrench, Check, RotateCcw, ChevronDown, Loader2 } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

export function AiToolCallCardDemo() {
  const { t } = useLocale();
  const [status, setStatus] = useState<'running' | 'success'>('success');
  const [isOpen, setIsOpen] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleRerun = () => {
    setStatus('running');
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setStatus('success');
    }, 1200);
  };

  return (
    <div className="w-full min-h-[180px] flex flex-col justify-center items-center pt-11 pb-3 px-3 sm:pt-12 sm:pb-4 sm:px-4 text-xs select-none">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden flex flex-col">
        {/* Card Header */}
        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-100 dark:border-slate-800/60">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <Wrench className="w-3.5 h-3.5" />
            </span>
            <span className="font-mono font-bold text-xs text-slate-800 dark:text-slate-100">
              {t('demo.ai.toolCall.toolName')}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {status === 'running' ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-[11px] font-semibold text-blue-600 dark:text-blue-300">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>{t('demo.ai.toolCall.runningStatus')}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-[11px] font-semibold text-emerald-600 dark:text-emerald-300">
                <Check className="w-3 h-3" />
                <span>{t('demo.ai.toolCall.successStatus')}</span>
              </span>
            )}

            <button
              type="button"
              onClick={handleRerun}
              disabled={status === 'running'}
              title={t('demo.ai.toolCall.rerunTool')}
              aria-label={t('demo.ai.toolCall.rerunTool')}
              className={`p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors ${
                status === 'running' ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Accordion toggle button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between px-3 py-1.5 bg-slate-100/50 dark:bg-slate-950/30 text-[11px] font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
        >
          <span>{t('demo.ai.toolCall.argsHeader')} & {t('demo.ai.toolCall.resultsHeader')}</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Card Body */}
        {isOpen && (
          <div className="p-3 flex flex-col gap-2 font-mono text-[11px] bg-slate-50/30 dark:bg-slate-950/20">
            <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300">
              <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-sans font-bold mb-0.5">
                {t('demo.ai.toolCall.argsHeader')}
              </span>
              <code>{t('demo.ai.toolCall.argsQuery')}</code>
            </div>

            <div className="p-2 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300">
              <span className="text-emerald-600 dark:text-emerald-400 block text-[10px] uppercase font-sans font-bold mb-0.5">
                {t('demo.ai.toolCall.resultsHeader')}
              </span>
              <code>{t('demo.ai.toolCall.resultSummary')}</code>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
