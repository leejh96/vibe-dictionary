import { useState } from 'react';
import { ExternalLink, Globe } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

export function AiSourceCitationDemo() {
  const { t } = useLocale();
  const [activeCitation, setActiveCitation] = useState<1 | 2 | null>(1);

  const citations = {
    1: {
      title: t('demo.ai.citation.citation1Title'),
      domain: t('demo.ai.citation.citation1Domain'),
      snippet: t('demo.ai.citation.citation1Snippet'),
    },
    2: {
      title: t('demo.ai.citation.citation2Title'),
      domain: t('demo.ai.citation.citation2Domain'),
      snippet: t('demo.ai.citation.citation2Snippet'),
    },
  };

  const current = activeCitation ? citations[activeCitation] : null;

  return (
    <div className="w-full min-h-[180px] flex flex-col justify-center items-center p-3 sm:p-4 text-xs select-none">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm flex flex-col gap-3">
        {/* Main Answer text with inline citation chips */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/60 text-slate-800 dark:text-slate-200 text-xs sm:text-[13px] leading-relaxed">
          <span>{t('demo.ai.citation.part1')}</span>
          <button
            type="button"
            onMouseEnter={() => setActiveCitation(1)}
            onClick={() => setActiveCitation(1)}
            title={t('demo.ai.citation.sourcePopup', { title: citations[1].title })}
            className={`inline-flex items-center justify-center px-1.5 py-0.5 ml-1 text-[11px] font-mono font-bold rounded-md transition-all cursor-pointer ${
              activeCitation === 1
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200'
            }`}
          >
            [1]
          </button>
          <span>{t('demo.ai.citation.part2')}</span>
          <button
            type="button"
            onMouseEnter={() => setActiveCitation(2)}
            onClick={() => setActiveCitation(2)}
            title={t('demo.ai.citation.sourcePopup', { title: citations[2].title })}
            className={`inline-flex items-center justify-center px-1.5 py-0.5 ml-1 text-[11px] font-mono font-bold rounded-md transition-all cursor-pointer ${
              activeCitation === 2
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200'
            }`}
          >
            [2]
          </button>
        </div>

        {/* Floating Source Citation Card Preview */}
        {current && (
          <div className="p-3 rounded-xl border border-indigo-200/80 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/30 flex flex-col gap-1.5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 font-bold text-xs text-indigo-700 dark:text-indigo-300 min-w-0">
                <Globe className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{current.title}</span>
              </div>
              <span className="flex items-center gap-0.5 text-[10px] font-mono text-slate-400 dark:text-slate-500 shrink-0">
                <span>{current.domain}</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </span>
            </div>

            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal line-clamp-2">
              {current.snippet}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
