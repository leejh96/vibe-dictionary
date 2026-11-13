import { useId, type RefObject } from 'react';
import { Search, X } from 'lucide-react';
import type { GlossaryCategory } from '@vibe-dictionary/catalog';
import { useLocale } from '../../i18n/LocaleContext';

export const GLOSSARY_CATEGORY_KEYS = {
  ui: 'glossary.categoryUi',
  engineering: 'glossary.categoryEngineering',
  workflow: 'glossary.categoryWorkflow',
} as const satisfies Record<GlossaryCategory, 'glossary.categoryUi' | 'glossary.categoryEngineering' | 'glossary.categoryWorkflow'>;

interface GlossaryFiltersProps {
  query: string;
  onQueryChange: (query: string) => void;
  selectedCategory: GlossaryCategory | 'all';
  onCategoryChange: (category: GlossaryCategory | 'all') => void;
  categories: { key: GlossaryCategory; count: number }[];
  totalCount: number;
  filteredCount: number;
  searchRef: RefObject<HTMLInputElement>;
}

export function GlossaryFilters({
  query,
  onQueryChange,
  selectedCategory,
  onCategoryChange,
  categories,
  totalCount,
  filteredCount,
  searchRef,
}: GlossaryFiltersProps) {
  const { t } = useLocale();
  const searchInputId = useId();
  const categoryOptions: { key: GlossaryCategory | 'all'; label: string; count: number }[] = [
    { key: 'all', label: t('glossary.categoryAll'), count: totalCount },
    ...categories.map((category) => ({
      key: category.key,
      label: t(GLOSSARY_CATEGORY_KEYS[category.key]),
      count: category.count,
    })),
  ];

  return (
    <section className="min-w-0 space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 flex-1 space-y-1.5">
          <label
            htmlFor={searchInputId}
            className="block text-xs font-extrabold text-slate-700 dark:text-slate-200"
          >
            {t('glossary.searchLabel')}
          </label>
          <div className="relative min-w-0">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500"
            />
            <input
              id={searchInputId}
              ref={searchRef}
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder={t('glossary.searchPlaceholder')}
              className="w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-11 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
            />
            {query.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  onQueryChange('');
                  searchRef.current?.focus();
                }}
                aria-label={t('glossary.clearSearch')}
                title={t('glossary.clearSearch')}
                className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200/70 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <p
          role="status"
          aria-live="polite"
          className="max-w-full shrink-0 self-start rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-mono font-bold text-slate-700 [overflow-wrap:anywhere] dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 sm:self-auto"
        >
          {t('glossary.resultCount', { count: filteredCount })}
        </p>
      </div>

      <div
        role="group"
        aria-label={t('glossary.categoryFilter')}
        className="flex flex-wrap items-center gap-1.5 pt-1"
      >
        {categoryOptions.map((option) => {
          const active = selectedCategory === option.key;
          return (
            <button
              key={option.key}
              type="button"
              aria-pressed={active}
              onClick={() => onCategoryChange(active && option.key !== 'all' ? 'all' : option.key)}
              className={`inline-flex min-h-11 max-w-full cursor-pointer items-center rounded-xl border px-3 py-1.5 text-left text-xs font-bold transition-colors [overflow-wrap:anywhere] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 sm:min-h-9 ${
                active
                  ? 'border-indigo-600 bg-indigo-600 text-white'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-white'
              }`}
            >
              <span className="min-w-0">{option.label}</span>
              <span className="ml-1.5 shrink-0 font-mono text-[11px] opacity-85">{option.count}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
