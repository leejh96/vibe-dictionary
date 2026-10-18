import { useLocale } from '../i18n/LocaleContext';
import type { MessageKey } from '../i18n/messages';
import React, { useState, useEffect } from 'react';
import { Search, X, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import {
  DomainType,
  CategoryType,
  DOMAIN_CATEGORIES, CATEGORY_NAMES_EN,
} from '@vibe-dictionary/catalog';

interface FilterBarProps {
  activeDomain: DomainType;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedCategory: CategoryType | 'all';
  onCategoryChange: (val: CategoryType | 'all') => void;
  onSelectChip: (chip: string) => void;
  vibeChips: string[];
  categoryCounts: Record<string, number>;
  totalCount: number;
}

const DOMAIN_PLACEHOLDERS = {
  ui: "search.placeholder.ui",
  motion: "search.placeholder.motion",
  layout: "search.placeholder.layout",
  style: "search.placeholder.style",
  video: "search.placeholder.video",
} as const satisfies Record<DomainType, MessageKey>;

const MAX_VISIBLE_CATEGORIES = 8;
const MAX_VISIBLE_CHIPS = 10;

export const FilterBar: React.FC<FilterBarProps> = ({
  activeDomain,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onSelectChip,
  vibeChips,
  categoryCounts,
  totalCount,
}) => {
  const { t, locale } = useLocale();
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);
  const [isChipsExpanded, setIsChipsExpanded] = useState(false);

  // 도메인이나 카테고리가 바뀌면 접힌 상태로 초기화
  useEffect(() => {
    setIsCategoriesExpanded(false);
    setIsChipsExpanded(false);
  }, [activeDomain]);

  useEffect(() => {
    setIsChipsExpanded(false);
  }, [selectedCategory]);

  const categories = DOMAIN_CATEGORIES[activeDomain].map(category => ({ ...category, label: locale === 'en' ? CATEGORY_NAMES_EN[category.id] : category.label }));

  const hasActiveFilter = selectedCategory !== 'all' || searchQuery.trim() !== '';

  // 카테고리 노출 목록 계산 (접혀 있을 때 선택된 카테고리가 숨겨진 범위에 있으면 포함)
  const shouldTruncateCategories = categories.length > MAX_VISIBLE_CATEGORIES;
  const visibleCategories =
    !shouldTruncateCategories || isCategoriesExpanded
      ? categories
      : (() => {
          const sliced = categories.slice(0, MAX_VISIBLE_CATEGORIES);
          const selectedInSliced = sliced.some((c) => c.id === selectedCategory);
          if (!selectedInSliced && selectedCategory !== 'all') {
            const activeCat = categories.find((c) => c.id === selectedCategory);
            if (activeCat) {
              return [...sliced.slice(0, MAX_VISIBLE_CATEGORIES - 1), activeCat];
            }
          }
          return sliced;
        })();
  const hiddenCategoryCount = categories.length - visibleCategories.length;

  // 추천 키워드 노출 목록 계산 (접혀 있을 때 선택된 칩이 숨겨진 범위에 있으면 포함)
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const shouldTruncateChips = vibeChips.length > MAX_VISIBLE_CHIPS;
  const visibleChips =
    !shouldTruncateChips || isChipsExpanded
      ? vibeChips
      : (() => {
          const sliced = vibeChips.slice(0, MAX_VISIBLE_CHIPS);
          const activeInSliced = sliced.some(
            (chip) => chip.toLowerCase() === normalizedQuery
          );
          if (!activeInSliced && normalizedQuery !== '') {
            const activeChip = vibeChips.find(
              (chip) => chip.toLowerCase() === normalizedQuery
            );
            if (activeChip) {
              return [...sliced.slice(0, MAX_VISIBLE_CHIPS - 1), activeChip];
            }
          }
          return sliced;
        })();
  const hiddenChipCount = vibeChips.length - visibleChips.length;

  return (
    <section className="space-y-3 bg-white dark:bg-slate-900/40 border border-slate-200/90 dark:border-slate-800/80 rounded-2xl p-4 shadow-xs dark:shadow-none transition-colors duration-200">
      {/* 1단: 고정 폭이 보장되는 독립 검색창 + 결과 개수/초기화 */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t(DOMAIN_PLACEHOLDERS[activeDomain])}
            className="w-full pl-10 pr-9 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:border-indigo-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              title={t("search.clear")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 shrink-0">
          {hasActiveFilter && (
            <button
              onClick={() => {
                onCategoryChange('all');
                onSearchChange('');
              }}
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{t("search.resetFilters")}</span>
            </button>
          )}
          <span className="text-xs text-slate-600 dark:text-slate-400 font-mono px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80">{t("search.showing", { count: totalCount })}</span>
        </div>
      </div>

      {/* 2단: 도메인별 하위 카테고리 필터 탭 (8개 초과 시 더보기/접기 지원) */}
      <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
        {visibleCategories.map((cat) => {
          const active = selectedCategory === cat.id;
          const count = categoryCounts[cat.id] ?? 0;
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 border transition-all ${
                active
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs shadow-indigo-500/20'
                  : 'bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-300 border-slate-200/90 dark:border-slate-800 hover:text-indigo-600 dark:hover:text-white hover:border-indigo-300 dark:hover:border-slate-700 hover:bg-indigo-50/50 dark:hover:bg-slate-900'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                  active
                    ? 'bg-white/20 text-white font-extrabold'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}

        {shouldTruncateCategories && (
          <button
            onClick={() => setIsCategoriesExpanded((prev) => !prev)}
            className="px-2.5 py-1.5 rounded-xl text-[11px] font-bold bg-indigo-50 dark:bg-slate-900/90 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 hover:bg-indigo-100/80 dark:hover:bg-indigo-950/50 hover:border-indigo-300 dark:hover:border-indigo-500/60 flex items-center gap-1 transition-all"
          >
            {isCategoriesExpanded ? (
              <>
                <span>{t("actions.collapse")}</span>
                <ChevronUp className="w-3 h-3" />
              </>
            ) : (
              <>
                <span>{t("search.more", { count: hiddenCategoryCount })}</span>
                <ChevronDown className="w-3 h-3" />
              </>
            )}
          </button>
        )}
      </div>

      {/* 3단: 빠른 느낌 키워드 칩 (10개 초과 시 +N개 더보기 / 접기 토글) */}
      <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-slate-200/80 dark:border-slate-800/60">
        <span className="text-[11px] font-semibold text-slate-500 mr-1">{t("search.suggested")}<span className="font-mono text-slate-400 dark:text-slate-600">({vibeChips.length})</span>:
        </span>
        {visibleChips.map((chip) => {
          const active = normalizedQuery === chip.toLowerCase();
          return (
            <button
              key={chip}
              onClick={() => onSelectChip(active ? '' : chip)}
              className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                active
                  ? 'bg-indigo-600/15 dark:bg-indigo-600/30 text-indigo-700 dark:text-indigo-200 border-indigo-500 font-bold'
                  : 'bg-white dark:bg-slate-950/70 text-slate-600 dark:text-slate-400 border-slate-200/90 dark:border-slate-800/80 hover:text-indigo-600 dark:hover:text-slate-200 hover:border-indigo-300 dark:hover:border-slate-700 hover:bg-indigo-50/50 dark:hover:bg-slate-900'
              }`}
            >
              #{chip}
            </button>
          );
        })}

        {shouldTruncateChips && (
          <button
            onClick={() => setIsChipsExpanded((prev) => !prev)}
            className="text-[11px] px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 hover:bg-indigo-100/80 dark:hover:bg-indigo-900/50 hover:border-indigo-300 dark:hover:border-indigo-400 font-semibold flex items-center gap-1 transition-all"
          >
            {isChipsExpanded ? (
              <>
                <span>{t("actions.collapse")}</span>
                <ChevronUp className="w-3 h-3" />
              </>
            ) : (
              <>
                <span>{t("search.more", { count: hiddenChipCount })}</span>
                <ChevronDown className="w-3 h-3" />
              </>
            )}
          </button>
        )}
      </div>
    </section>
  );
};
