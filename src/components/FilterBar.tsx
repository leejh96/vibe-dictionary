import React, { useState, useEffect } from 'react';
import { Search, X, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import {
  DomainType,
  CategoryType,
  DOMAIN_CATEGORIES,
} from '../data/techniques';

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

const DOMAIN_PLACEHOLDERS: Record<DomainType, string> = {
  ui: 'UI 느낌·용어 검색 (예: 자석 버튼, 3D 카드, 통통 튀는, 유리...)',
  motion: '그래픽 기법 검색 (예: 오로라 배경, 별자리 선 연결, 물방울 합체, 글리치...)',
  layout: '레이아웃 검색 (예: 도시락 격자, 맥북 독바, 핀터레스트, 칸반 보드...)',
  style: '디자인 스타일 검색 (예: 네오 브루탈리즘, 클레이 3D, 픽셀 레트로, 윈도우95...)',
};

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

  const categories = DOMAIN_CATEGORIES[activeDomain];

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
    <section className="space-y-3 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4">
      {/* 1단: 고정 폭이 보장되는 독립 검색창 + 결과 개수/초기화 */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={DOMAIN_PLACEHOLDERS[activeDomain]}
            className="w-full pl-10 pr-9 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              title="검색어 지우기"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
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
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-slate-300 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>필터 초기화</span>
            </button>
          )}
          <span className="text-xs text-slate-400 font-mono px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800/80">
            표시 <strong className="text-indigo-400 font-bold">{totalCount}</strong>개
          </span>
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
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                active
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'bg-slate-950 text-slate-300 border border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  active
                    ? 'bg-slate-900/15 text-slate-900 font-extrabold'
                    : 'bg-slate-900 text-slate-500'
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
            className="px-2.5 py-1.5 rounded-xl text-[11px] font-bold bg-slate-900/90 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-950/50 hover:border-indigo-500/60 flex items-center gap-1 transition-all"
          >
            {isCategoriesExpanded ? (
              <>
                <span>접기</span>
                <ChevronUp className="w-3 h-3" />
              </>
            ) : (
              <>
                <span>+{hiddenCategoryCount}개 더보기</span>
                <ChevronDown className="w-3 h-3" />
              </>
            )}
          </button>
        )}
      </div>

      {/* 3단: 빠른 느낌 키워드 칩 (10개 초과 시 +N개 더보기 / 접기 토글) */}
      <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-slate-800/60">
        <span className="text-[11px] font-semibold text-slate-500 mr-1">
          추천 키워드 <span className="font-mono text-slate-600">({vibeChips.length})</span>:
        </span>
        {visibleChips.map((chip) => {
          const active = normalizedQuery === chip.toLowerCase();
          return (
            <button
              key={chip}
              onClick={() => onSelectChip(active ? '' : chip)}
              className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                active
                  ? 'bg-indigo-600/30 text-indigo-200 border-indigo-500 font-bold'
                  : 'bg-slate-950/70 text-slate-400 border-slate-800/80 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              #{chip}
            </button>
          );
        })}

        {shouldTruncateChips && (
          <button
            onClick={() => setIsChipsExpanded((prev) => !prev)}
            className="text-[11px] px-2.5 py-1 rounded-lg bg-indigo-950/40 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-900/50 hover:border-indigo-400 font-semibold flex items-center gap-1 transition-all"
          >
            {isChipsExpanded ? (
              <>
                <span>접기</span>
                <ChevronUp className="w-3 h-3" />
              </>
            ) : (
              <>
                <span>+{hiddenChipCount}개 더보기</span>
                <ChevronDown className="w-3 h-3" />
              </>
            )}
          </button>
        )}
      </div>
    </section>
  );
};
