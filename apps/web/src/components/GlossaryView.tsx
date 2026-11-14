import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import type { GlossaryCategory } from '@vibe-dictionary/catalog';
import { useLocale } from '../i18n/LocaleContext';
import { useGlossarySearch } from '../hooks/useGlossarySearch';
import { GlossaryFilters, GLOSSARY_CATEGORY_KEYS } from './glossary/GlossaryFilters';
import { GlossaryTermDetail } from './glossary/GlossaryTermDetail';
import type { GlossaryViewProps } from './glossary/types';

export function GlossaryView({
  headerHeight = 0,
  onViewTechnique,
  onViewDomainKnowledge,
  targetRequest,
}: GlossaryViewProps) {
  const { locale, t } = useLocale();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GlossaryCategory | 'all'>('all');
  const [selectedId, setSelectedId] = useState<string | null>(() => targetRequest?.id ?? null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const activeButtonRef = useRef<HTMLButtonElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const detailHeadingRef = useRef<HTMLHeadingElement>(null);
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
  const activeId = activeTerm?.id;

  useLayoutEffect(() => {
    const list = listRef.current;
    const button = activeButtonRef.current;
    if (!list || !button) return;

    const listTop = list.getBoundingClientRect().top + list.clientTop;
    const listBottom = listTop + list.clientHeight;
    const { top, bottom } = button.getBoundingClientRect();
    if (top < listTop) {
      list.scrollTop += top - listTop;
    } else if (bottom > listBottom) {
      list.scrollTop += bottom - listBottom;
    }
  }, [activeId, query, selectedCategory, locale]);

  const handleSelectTerm = (id: string) => {
    setSelectedId(id);
    const heading = detailHeadingRef.current;
    if (!heading) return;

    const { top, bottom } = heading.getBoundingClientRect();
    if (top < headerHeight || bottom > window.innerHeight) {
      detailRef.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
    }
  };

  const handleClearSearch = () => {
    setQuery('');
    if (items.length === 0 && selectedCategory !== 'all') {
      setSelectedCategory('all');
    }
    searchRef.current?.focus();
  };

  return (
    <div
      className="@container min-w-0 space-y-5"
      style={{ '--glossary-pane-top': `calc(${headerHeight}px + 1rem)` } as CSSProperties}
    >
      <h1 className="text-xl font-extrabold text-slate-900 dark:text-white [overflow-wrap:anywhere]">
        {t('glossary.heading')}
      </h1>

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
        <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-4 @2xl:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] @2xl:gap-5 @4xl:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
          <div
            ref={listRef}
            role="region"
            aria-label={t('glossary.listLabel')}
            className="prompt-scroll max-h-[min(12rem,35dvh)] min-w-0 space-y-0.5 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:shadow-none @2xl:sticky @2xl:top-(--glossary-pane-top) @2xl:max-h-[min(42rem,max(6rem,calc(100dvh_-_var(--glossary-pane-top)_-_1rem)))] @2xl:overscroll-y-contain"
          >
            {items.map((item) => {
              const isSelected = activeTerm?.id === item.id;
              const primaryName = item.name[locale];
              return (
                <button
                  key={item.id}
                  ref={isSelected ? activeButtonRef : undefined}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => handleSelectTerm(item.id)}
                  className={`min-h-11 w-full min-w-0 cursor-pointer rounded-lg px-3 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-inset ${
                    isSelected
                      ? 'bg-indigo-50 dark:bg-indigo-950/70'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/70'
                  }`}
                >
                  <span className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 [overflow-wrap:anywhere]">
                    {t(GLOSSARY_CATEGORY_KEYS[item.category])}
                  </span>
                  <span className={`block text-sm font-bold [overflow-wrap:anywhere] ${isSelected ? 'text-indigo-700 dark:text-indigo-200' : 'text-slate-900 dark:text-white'}`}>
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

          <div ref={detailRef} className="min-w-0 scroll-mt-(--glossary-pane-top)">
            {activeTerm ? (
              <GlossaryTermDetail
                term={activeTerm}
                headingRef={detailHeadingRef}
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
