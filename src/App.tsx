import React, { useState, useMemo } from 'react';
import { Sparkles, Wand2, Layers, Film, LayoutGrid, Palette } from 'lucide-react';
import {
  TECHNIQUES,
  TechniqueItem,
  CategoryType,
  DomainType,
  DOMAIN_LABELS,
} from './data/techniques';
import { FilterBar } from './components/FilterBar';
import { TechniqueCard } from './components/TechniqueCard';
import { PromptCartDrawer } from './components/PromptCartDrawer';

function matchesSearch(item: TechniqueItem, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  const searchableText = [
    item.titleKo,
    item.titleEn,
    item.vibeTag,
    item.summary,
    item.promptSnippet,
    ...item.vibeKeywords,
  ]
    .join(' ')
    .toLowerCase();

  const tokens = q.split(/\s+/).filter(Boolean);
  return tokens.every((token) => searchableText.includes(token));
}

export default function App() {
  const [activeDomain, setActiveDomain] = useState<DomainType>('ui');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>('all');
  const [cart, setCart] = useState<TechniqueItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const counts = useMemo(
    () => ({
      ui: TECHNIQUES.filter((t) => t.domain === 'ui').length,
      motion: TECHNIQUES.filter((t) => t.domain === 'motion').length,
      layout: TECHNIQUES.filter((t) => t.domain === 'layout').length,
      style: TECHNIQUES.filter((t) => t.domain === 'style').length,
    }),
    []
  );

  const handleDomainSwitch = (domain: DomainType) => {
    setActiveDomain(domain);
    setSelectedCategory('all');
    setSearchQuery('');
  };

  /* 현재 선택된 카테고리('전체' 포함)의 기법 수와 1:1로 일치하는 추천 키워드 칩 생성 */
  const currentVibeChips = useMemo(() => {
    const items = TECHNIQUES.filter(
      (item) =>
        item.domain === activeDomain &&
        (selectedCategory === 'all' || item.category === selectedCategory)
    );
    return items.map((item) => item.vibeKeywords[0] ?? item.titleKo);
  }, [activeDomain, selectedCategory]);

  /* 카테고리 탭 변경 시: 이전 카테고리의 키워드 칩 등이 걸려 있으면 검색어를 비워 해당 카테고리 전체가 보이도록 처리 */
  const handleCategoryChange = (category: CategoryType | 'all') => {
    setSelectedCategory(category);
    if (searchQuery.trim()) {
      setSearchQuery('');
    }
  };

  /* 추천 키워드 칩 클릭 시: 현재 선택된 카테고리를 유지한 채 해당 키워드로만 필터링 */
  const handleSelectChip = (chip: string) => {
    setSearchQuery(chip);
  };

  /* 현재 도메인의 각 하위 카테고리별 고정 총 기법 수 계산 */
  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = { all: 0 };
    for (const item of TECHNIQUES) {
      if (item.domain !== activeDomain) continue;
      map.all += 1;
      map[item.category] = (map[item.category] ?? 0) + 1;
    }
    return map;
  }, [activeDomain]);

  const filteredTechniques = useMemo(() => {
    return TECHNIQUES.filter((item) => {
      if (item.domain !== activeDomain) return false;

      const matchCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      return matchCategory && matchesSearch(item, searchQuery);
    });
  }, [activeDomain, searchQuery, selectedCategory]);

  /* 다른 도메인에 검색 결과가 있는지 확인 (현재 탭 결과가 0개일 때 안내용) */
  const otherDomainMatches = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const domainIds: DomainType[] = ['ui', 'motion', 'layout', 'style'];
    return domainIds
      .filter((id) => id !== activeDomain)
      .map((id) => ({
        id,
        label: DOMAIN_LABELS[id],
        count: TECHNIQUES.filter(
          (t) => t.domain === id && matchesSearch(t, searchQuery)
        ).length,
      }))
      .filter((d) => d.count > 0);
  }, [activeDomain, searchQuery]);

  const handleToggleCart = (item: TechniqueItem) => {
    setCart((prev) =>
      prev.some((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item]
    );
  };

  const domainTabs: { id: DomainType; label: string; count: number; icon: React.ReactNode }[] = [
    { id: 'ui', label: DOMAIN_LABELS.ui, count: counts.ui, icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'motion', label: DOMAIN_LABELS.motion, count: counts.motion, icon: <Film className="w-3.5 h-3.5" /> },
    { id: 'layout', label: DOMAIN_LABELS.layout, count: counts.layout, icon: <LayoutGrid className="w-3.5 h-3.5" /> },
    { id: 'style', label: DOMAIN_LABELS.style, count: counts.style, icon: <Palette className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* 상단 헤더 + 4대 대분류 도메인 스위처 */}
      <header className="border-b border-slate-900 bg-slate-950/90 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* 로고 */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-base font-black tracking-tight text-white">
              Vibe Dictionary
            </h1>
          </div>

          {/* 4대 대분류 도메인 탭: [UI] [그래픽] [레이아웃] [스타일] */}
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 overflow-x-auto max-w-full">
            {domainTabs.map((tab) => {
              const isActive = activeDomain === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleDomainSwitch(tab.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-extrabold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? 'bg-indigo-800/80 text-indigo-100'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 프롬프트 조합기 열기 버튼 */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 flex items-center gap-1.5 transition-colors"
          >
            <Wand2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>조합기</span>
            <span className="px-1.5 py-0.2 rounded-full bg-indigo-600 text-white text-[10px]">
              {cart.length}
            </span>
          </button>
        </div>
      </header>

      {/* 메인 갤러리 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 space-y-5">
        <FilterBar
          activeDomain={activeDomain}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          onSelectChip={handleSelectChip}
          vibeChips={currentVibeChips}
          categoryCounts={categoryCounts}
          totalCount={filteredTechniques.length}
        />

        {filteredTechniques.length === 0 ? (
          <div className="py-16 text-center space-y-3 bg-slate-900/30 border border-slate-800/60 rounded-2xl">
            <p className="text-sm font-bold text-slate-300">
              현재 영역에 "{searchQuery}" 검색 결과가 없습니다.
            </p>

            {otherDomainMatches.length > 0 && (
              <div className="flex items-center justify-center gap-2 flex-wrap pt-1">
                <span className="text-xs text-slate-400">
                  다른 영역에서 찾은 결과:
                </span>
                {otherDomainMatches.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => {
                      setActiveDomain(d.id);
                      setSelectedCategory('all');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors"
                  >
                    {d.label} 탭에서 보기 ({d.count}개)
                  </button>
                ))}
              </div>
            )}

            <div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-xs text-indigo-400 hover:text-indigo-300 underline"
              >
                필터 및 검색어 초기화
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTechniques.map((item) => (
              <TechniqueCard
                key={item.id}
                item={item}
                isSelected={cart.some((c) => c.id === item.id)}
                onToggleCart={handleToggleCart}
              />
            ))}
          </div>
        )}
      </main>

      <PromptCartDrawer
        cart={cart}
        isOpen={isCartOpen}
        onOpenChange={setIsCartOpen}
        onRemoveItem={(id) => setCart((prev) => prev.filter((i) => i.id !== id))}
        onClearCart={() => setCart([])}
      />
    </div>
  );
}
