import { useEffect, useRef, useState } from 'react';
import type { GlossaryCategory } from '@vibe-dictionary/catalog';
import { useLocale } from '../i18n/LocaleContext';
import { useGlossarySearch } from '../hooks/useGlossarySearch';
import { GlossaryFilters, GLOSSARY_CATEGORY_KEYS } from './glossary/GlossaryFilters';
import { GlossaryTermDetail } from './glossary/GlossaryTermDetail';
import type { GlossaryViewProps } from './glossary/types';

export function GlossaryView({
  onViewTechnique,
  onViewDomainKnowledge,
  targetRequest,
}: GlossaryViewProps) {
  const { locale, t } = useLocale();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GlossaryCategory | 'all'>('all');
  const [selectedId, setSelectedId] = useState<string | null>(() => targetRequest?.id ?? null);
  const searchRef = useRef<HTMLInputElement>(null);
  const lastRequestKeyRef = useRef<number | null>(targetRequest ? targetRequest.key : null);

  useEffect(() => {
    if (!targetRequest) return;
    if (lastRequestKeyRef.current === targetRequest.key) return;
    lastRequestKeyRef.current = targetRequest.key;
    setQuery('');
    setSelectedCategory('all');
    setSelectedId(targetRequest.id);
  }, [targetRequest]);

  const { searchedItems, categories } = useGlossarySearch(query);
  const items =
    selectedCategory === 'all'
      ? searchedItems
      : searchedItems.filter((item) => item.category === selectedCategory);

  const activeTerm =
    items.find((item) => item.id === selectedId) ?? items[0] ?? null;

  const handleClearSearch = () => {
    setQuery('');
    if (items.length === 0 && selectedCategory !== 'all') {
      setSelectedCategory('all');
    }
    searchRef.current?.focus();
  };

  return (
    <div className="@container min-w-0 space-y-5">
      <header className="min-w-0 space-y-1">
        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white [overflow-wrap:anywhere]">
          {t('glossary.heading')}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 [overflow-wrap:anywhere]">
          {t('glossary.intro')}
        </p>
      </header>

      <GlossaryFilters
        query={query}
        onQueryChange={setQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
        totalCount={searchedItems.length}
        filteredCount={items.length}
        searchRef={searchRef}
      />

      {items.length === 0 ? (
        <div
          role="status"
          className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900 sm:p-8"
        >
          <p className="text-sm font-bold text-slate-800 dark:text-slate-200 [overflow-wrap:anywhere]">
            {query.trim()
              ? t('glossary.emptyTitle', { query: query.trim() })
              : t('glossary.emptyCategory')}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 [overflow-wrap:anywhere]">
            {t('glossary.emptyHint')}
          </p>
          <div>
            <button
              type="button"
              onClick={handleClearSearch}
              className="inline-flex min-h-11 sm:min-h-9 max-w-full cursor-pointer items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 [overflow-wrap:anywhere]"
            >
              {query.trim() ? t('glossary.clearSearch') : t('search.resetFilters')}
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-5 @2xl:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] @4xl:grid-cols-[minmax(0,18.5rem)_minmax(0,1fr)]">
          <div
            role="region"
            aria-label={t('glossary.listLabel')}
            className="prompt-scroll max-h-[min(13rem,45dvh)] min-w-0 space-y-2 overflow-y-auto pr-1 @2xl:max-h-[clamp(11rem,65dvh,42rem)] @2xl:self-start"
          >
            {items.map((item) => {
              const isSelected = activeTerm?.id === item.id;
              const primaryName = item.name[locale];
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedId(item.id)}
                  className={`min-h-11 w-full min-w-0 cursor-pointer rounded-2xl border p-3.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50/80 shadow-xs dark:border-indigo-500/70 dark:bg-indigo-950/40'
                      : 'border-slate-200 bg-white hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700'
                  }`}
                >
                  <span className="inline-block max-w-full rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300 [overflow-wrap:anywhere]">
                    {t(GLOSSARY_CATEGORY_KEYS[item.category])}
                  </span>
                  <span className="mt-1.5 block font-extrabold text-sm text-slate-900 dark:text-white [overflow-wrap:anywhere]">
                    {primaryName}
                  </span>
                  {locale === 'ko' && item.name.en !== primaryName && (
                    <span lang="en" className="mt-0.5 block text-xs font-mono text-indigo-600 dark:text-indigo-400 [overflow-wrap:anywhere]">
                      {item.name.en}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="min-w-0">
            {activeTerm ? (
              <GlossaryTermDetail
                term={activeTerm}
                onViewTechnique={onViewTechnique}
                onViewDomainKnowledge={onViewDomainKnowledge}
              />
            ) : (
              <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 [overflow-wrap:anywhere]">
                {t('glossary.selectTermHint')}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
