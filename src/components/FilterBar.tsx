import React from 'react';
import { Search, X, Sparkles } from 'lucide-react';
import { SITUATION_CATEGORIES, QUICK_VIBE_CHIPS, SituationType } from '../data/techniques';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedSituation: SituationType | 'all';
  onSituationChange: (val: SituationType | 'all') => void;
  totalCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedSituation,
  onSituationChange,
  totalCount,
}) => {
  return (
    <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl backdrop-blur-sm space-y-5">
      {/* 1. 느낌 / 의성어·의태어 검색 영역 */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            전문 용어를 몰라도 괜찮아요! 느낌·의성어·의태어로 검색해 보세요
          </label>
          <span className="text-xs text-slate-400">
            검색 결과 <strong className="text-white">{totalCount}</strong>개 기법
          </span>
        </div>

        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="예: '통통 튀는', '착 달라붙는', '부르르 떨리는', '촤르륵', '팡 터지는', '형광펜'..."
            className="w-full pl-12 pr-10 py-3.5 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
              title="검색어 지우기"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 빠른 느낌 태그 칩 */}
        <div className="mt-3 flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-slate-400 mr-1">자주 찾는 느낌:</span>
          {QUICK_VIBE_CHIPS.map((chip) => {
            const active = searchQuery === chip;
            return (
              <button
                key={chip}
                onClick={() => onSearchChange(active ? '' : chip)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                  active
                    ? 'bg-indigo-600 text-white border-indigo-400 font-bold shadow-sm shadow-indigo-500/30'
                    : 'bg-slate-950/70 text-slate-300 border-slate-800 hover:border-indigo-500/50 hover:text-indigo-200'
                }`}
              >
                "{chip}"
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. 코딩 교육 상황별 탭 필터 */}
      <div className="pt-3 border-t border-slate-800/80">
        <div className="text-xs font-bold text-slate-400 mb-2.5">
          콘텐츠의 어떤 순간에 넣을 연출인가요? (상황별 추천 필터)
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {SITUATION_CATEGORIES.map((cat) => {
            const isSelected = selectedSituation === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSituationChange(cat.id)}
                className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-indigo-600/20 border-indigo-500 text-white ring-1 ring-indigo-400/50 shadow-md'
                    : 'bg-slate-950/60 border-slate-800/90 text-slate-300 hover:bg-slate-800/50 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5 text-sm font-bold">
                  <span>{cat.emoji}</span>
                  <span>{cat.label}</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-400 line-clamp-1">
                  {cat.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
