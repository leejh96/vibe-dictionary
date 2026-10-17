import React from 'react';
import { Search, X } from 'lucide-react';
import { CATEGORIES, QUICK_VIBE_CHIPS, CategoryType } from '../data/techniques';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedCategory: CategoryType | 'all';
  onCategoryChange: (val: CategoryType | 'all') => void;
  totalCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  totalCount,
}) => {
  return (
    <section className="space-y-3">
      {/* 상단: 검색창 + 카테고리 알약 탭 */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
        {/* 검색 인풋 */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="느낌이나 용어 검색 (예: 통통 튀는, 자석처럼, 3D, 유리...)"
            className="w-full pl-10 pr-9 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* 카테고리 캡슐 탭 */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  active
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'bg-slate-900 text-slate-400 border border-slate-800/80 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 하단: 빠른 느낌 칩 + 카운트 */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 flex-wrap">
          {QUICK_VIBE_CHIPS.map((chip) => {
            const active = searchQuery === chip;
            return (
              <button
                key={chip}
                onClick={() => onSearchChange(active ? '' : chip)}
                className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                  active
                    ? 'bg-indigo-600/30 text-indigo-200 border-indigo-500 font-bold'
                    : 'bg-slate-900/50 text-slate-400 border-slate-800/70 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {chip}
              </button>
            );
          })}
        </div>

        <span className="text-[11px] text-slate-500 font-mono">
          {totalCount}개 기법
        </span>
      </div>
    </section>
  );
};
