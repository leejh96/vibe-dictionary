import { useState } from 'react';
import { Lightbulb, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

export function AiThinkingAccordionDemo() {
  const { t } = useLocale();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full min-h-[180px] flex flex-col justify-center items-center p-3 sm:p-4 text-xs select-none">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 shadow-sm flex flex-col gap-2.5">
        {/* Thinking Accordion Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          title={isOpen ? t('demo.ai.thinking.toggleHide') : t('demo.ai.thinking.toggleShow')}
          className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800/60 transition-all cursor-pointer text-left"
        >
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Lightbulb className="w-3.5 h-3.5" />
            </span>
            <span className="font-bold text-xs text-slate-800 dark:text-slate-200">
              {t('demo.ai.thinking.header')}
            </span>
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          </div>

          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Collapsible Steps Timeline */}
        {isOpen && (
          <div className="px-3 py-2 rounded-xl bg-slate-50/50 dark:bg-slate-950/30 border border-slate-100 dark:border-slate-800/30 flex flex-col gap-2 text-[11px] text-slate-500 dark:text-slate-400 animate-in fade-in duration-150">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>{t('demo.ai.thinking.step1')}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>{t('demo.ai.thinking.step2')}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>{t('demo.ai.thinking.step3')}</span>
            </div>
          </div>
        )}

        {/* Final Synthesized Output */}
        <div className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100/80 dark:border-indigo-900/40 text-slate-700 dark:text-slate-200 text-xs leading-relaxed">
          {t('demo.ai.thinking.finalAnswer')}
        </div>
      </div>
    </div>
  );
}
