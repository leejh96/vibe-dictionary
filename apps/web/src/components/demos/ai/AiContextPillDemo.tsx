import { useState } from 'react';
import { Plus, RotateCcw, FileText, Database } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

interface ContextDoc {
  id: string;
  nameKey: 'demo.ai.contextPill.docApi' | 'demo.ai.contextPill.docPrompt' | 'demo.ai.contextPill.docGuide' | 'demo.ai.contextPill.docSchema';
  tokens: number;
}

const DEFAULT_DOCS: ContextDoc[] = [
  { id: 'api', nameKey: 'demo.ai.contextPill.docApi', tokens: 1200 },
  { id: 'prompt', nameKey: 'demo.ai.contextPill.docPrompt', tokens: 400 },
  { id: 'guide', nameKey: 'demo.ai.contextPill.docGuide', tokens: 800 },
];

const EXTRA_DOCS: ContextDoc[] = [
  { id: 'schema', nameKey: 'demo.ai.contextPill.docSchema', tokens: 1500 },
  { id: 'api2', nameKey: 'demo.ai.contextPill.docApi', tokens: 1200 },
  { id: 'guide2', nameKey: 'demo.ai.contextPill.docGuide', tokens: 800 },
];

const TOTAL_TOKEN_LIMIT = 8000;

export function AiContextPillDemo() {
  const { t } = useLocale();
  const [docs, setDocs] = useState<ContextDoc[]>(DEFAULT_DOCS);

  const currentTokens = docs.reduce((acc, doc) => acc + doc.tokens, 0);
  const percent = Math.min(Math.round((currentTokens / TOTAL_TOKEN_LIMIT) * 100), 100);

  const getGaugeColor = () => {
    if (percent < 70) return 'bg-emerald-500';
    if (percent < 90) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const handleAdd = () => {
    const nextDoc = EXTRA_DOCS.find((d) => !docs.some((existing) => existing.id === d.id));
    if (nextDoc) {
      setDocs((prev) => [...prev, nextDoc]);
    } else {
      setDocs((prev) => [
        ...prev,
        { id: `doc-${Date.now()}`, nameKey: 'demo.ai.contextPill.docGuide', tokens: 800 },
      ]);
    }
  };

  const handleRemove = (id: string) => {
    setDocs((prev) => prev.filter((d) => d.id !== id));
  };

  const handleReset = () => {
    setDocs(DEFAULT_DOCS);
  };

  return (
    <div className="w-full min-h-[180px] flex flex-col justify-center items-center p-3 sm:p-4 text-xs select-none">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm flex flex-col gap-3">
        {/* Header & Controls */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-100">
            <Database className="w-4 h-4 text-indigo-500" />
            <span>{t('sample.ai.contextPill.contextWindow')}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleAdd}
              className="flex items-center gap-1 px-2 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-[11px] font-semibold transition-colors cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              <span>{t('demo.ai.contextPill.addDoc')}</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              title={t('demo.ai.contextPill.reset')}
              aria-label={t('demo.ai.contextPill.reset')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Document Tags */}
        <div className="flex flex-wrap gap-1.5 min-h-[50px] items-start content-start">
          {docs.map((doc) => {
            const docName = t(doc.nameKey);
            return (
              <span
                key={doc.id}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-[11px] font-medium border border-slate-200/60 dark:border-slate-700/60 transition-all"
              >
                <FileText className="w-3 h-3 text-slate-400 shrink-0" />
                <span className="truncate max-w-[130px]">{docName}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(doc.id)}
                  aria-label={t('demo.ai.contextPill.removeDoc', { name: docName })}
                  className="ml-0.5 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 cursor-pointer font-bold leading-none"
                >
                  ×
                </button>
              </span>
            );
          })}
        </div>

        {/* Token Progress Bar & Stats */}
        <div className="space-y-1.5 pt-1 border-t border-slate-100 dark:border-slate-800/60">
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
            <span>
              {t('demo.ai.contextPill.usageLabel', {
                current: currentTokens.toLocaleString(),
                total: TOTAL_TOKEN_LIMIT.toLocaleString(),
                percent,
              })}
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${getGaugeColor()}`}
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
