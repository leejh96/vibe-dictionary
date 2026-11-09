import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, GitBranch, MessageSquare } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

type MessageVersion = {
  titleKey: 'demo.ai.branch.v1Title' | 'demo.ai.branch.v2Title' | 'demo.ai.branch.v3Title' | 'demo.ai.branch.v4Title';
  contentKey: 'demo.ai.branch.v1Content' | 'demo.ai.branch.v2Content' | 'demo.ai.branch.v3Content' | 'demo.ai.branch.v4Content';
};

const INITIAL_VERSIONS: MessageVersion[] = [
  { titleKey: 'demo.ai.branch.v1Title', contentKey: 'demo.ai.branch.v1Content' },
  { titleKey: 'demo.ai.branch.v2Title', contentKey: 'demo.ai.branch.v2Content' },
  { titleKey: 'demo.ai.branch.v3Title', contentKey: 'demo.ai.branch.v3Content' },
];

export function AiMessageBranchDemo() {
  const { t } = useLocale();
  const [versions, setVersions] = useState<MessageVersion[]>(INITIAL_VERSIONS);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentVersion = versions[currentIndex] ?? versions[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, versions.length - 1));
  };

  const handleNewVersion = () => {
    if (versions.length < 4) {
      const updated = [
        ...versions,
        {
          titleKey: 'demo.ai.branch.v4Title',
          contentKey: 'demo.ai.branch.v4Content',
        } as MessageVersion,
      ];
      setVersions(updated);
      setCurrentIndex(updated.length - 1);
    }
  };

  return (
    <div className="w-full min-h-[180px] flex flex-col justify-center items-center p-3 sm:p-4 text-xs select-none">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm flex flex-col gap-3">
        {/* Header with Title and Add Version */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800/60">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-100">
            <span className="p-1 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <MessageSquare className="w-3.5 h-3.5" />
            </span>
            <span className="truncate max-w-[150px]">{t(currentVersion.titleKey)}</span>
          </div>

          {versions.length < 4 && (
            <button
              type="button"
              onClick={handleNewVersion}
              className="flex items-center gap-1 px-2 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 text-[11px] font-semibold transition-colors cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              <span>{t('demo.ai.branch.newVersion')}</span>
            </button>
          )}
        </div>

        {/* Message Content */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800/40 text-slate-700 dark:text-slate-200 text-xs leading-relaxed whitespace-pre-line min-h-[70px] flex items-center">
          {t(currentVersion.contentKey)}
        </div>

        {/* Bottom Pagination Switcher */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
            <GitBranch className="w-3.5 h-3.5 text-indigo-500" />
            <span>{t('sample.ai.branch.branchLabel')}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              title={t('demo.ai.branch.prev')}
              aria-label={t('demo.ai.branch.prev')}
              className={`p-1 rounded-md border border-slate-200 dark:border-slate-700 transition-colors ${
                currentIndex === 0
                  ? 'opacity-40 cursor-not-allowed text-slate-400'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <span className="text-[11px] font-mono font-bold text-slate-600 dark:text-slate-300 min-w-10 text-center">
              {t('demo.ai.branch.pageInfo', { current: currentIndex + 1, total: versions.length })}
            </span>

            <button
              type="button"
              onClick={handleNext}
              disabled={currentIndex === versions.length - 1}
              title={t('demo.ai.branch.next')}
              aria-label={t('demo.ai.branch.next')}
              className={`p-1 rounded-md border border-slate-200 dark:border-slate-700 transition-colors ${
                currentIndex === versions.length - 1
                  ? 'opacity-40 cursor-not-allowed text-slate-400'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer'
              }`}
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
