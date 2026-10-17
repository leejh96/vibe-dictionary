import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import {
  Wand2,
  Layers,
  Film,
  LayoutGrid,
  Palette,
  Clapperboard,
  ArrowUpToLine,
  ChevronDown,
} from 'lucide-react';
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

/* 사전 모양 커스텀 로고 아이콘 (favicon.svg와 동일한 아이덴티티) */
const DictionaryLogo: React.FC = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    className="w-8 h-8 shrink-0 drop-shadow-sm transition-transform duration-200 group-hover:scale-105"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="logoBgGrad" x1="6" y1="6" x2="58" y2="58" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#6366F1" />
        <stop offset="55%" stopColor="#4F46E5" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
      <linearGradient id="logoPageGrad" x1="16" y1="14" x2="48" y2="50" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#E0E7FF" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="56" height="56" rx="16" fill="url(#logoBgGrad)" />
    <path
      d="M16 17C16 14.7909 17.7909 13 20 13H45C47.2091 13 49 14.7909 49 17V47C49 49.2091 47.2091 51 45 51H20C17.7909 51 16 49.2091 16 47V17Z"
      fill="#312E81"
      fillOpacity="0.55"
    />
    <path
      d="M18 16C18 14.3431 19.3431 13 21 13H44C45.6569 13 47 14.3431 47 16V44C47 45.6569 45.6569 47 44 47H21C19.3431 47 18 45.6569 18 44V16Z"
      fill="url(#logoPageGrad)"
    />
    <path d="M23 13V47" stroke="#A5B4FC" strokeWidth="2" />
    <path
      d="M18 44C18 42.3431 19.3431 41 21 41H47V46C47 47.6569 45.6569 49 44 49H21C19.3431 49 18 47.6569 18 46V44Z"
      fill="#C7D2FE"
    />
    <path d="M21 45H44" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M37 13H43V25L40 22.5L37 25V13Z" fill="#F43F5E" />
    <path
      d="M28.5 23L32.5 34L36.5 23"
      stroke="#4338CA"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M41.5 28L42.7 30.8L45.5 32L42.7 33.2L41.5 36L40.3 33.2L37.5 32L40.3 30.8L41.5 28Z"
      fill="#F59E0B"
    />
  </svg>
);

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

  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(true);
  const gridRef = useRef<HTMLDivElement>(null);

  const counts = useMemo(
    () => ({
      ui: TECHNIQUES.filter((t) => t.domain === 'ui').length,
      motion: TECHNIQUES.filter((t) => t.domain === 'motion').length,
      layout: TECHNIQUES.filter((t) => t.domain === 'layout').length,
      style: TECHNIQUES.filter((t) => t.domain === 'style').length,
      video: TECHNIQUES.filter((t) => t.domain === 'video').length,
    }),
    []
  );

  /* Vibe Dictionary 로고 클릭 시 홈(초기 상태 + 최상단 스크롤)으로 이동 */
  const handleGoHome = () => {
    setActiveDomain('ui');
    setSelectedCategory('all');
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  /* 스크롤 위치 감지 (상단 이동 / 한 뎁스 아래 이동 활성화 여부) */
  const updateScrollState = useCallback(() => {
    const scrollTop = window.scrollY;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    setCanScrollUp(scrollTop > 80);
    setCanScrollDown(maxScroll - scrollTop > 20);
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      window.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState, filteredTechniques.length, activeDomain, selectedCategory]);

  const lastTargetYRef = useRef(0);
  const lastStepTimeRef = useRef(0);

  /* 한번에 최상단으로 올라가는 핸들러 */
  const handleScrollToTop = () => {
    lastTargetYRef.current = 0;
    lastStepTimeRef.current = 0;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* 한 뎁스(다음 카드 행)씩 정확히 맞춰 스크롤을 내리는 핸들러 */
  const handleScrollDownStep = () => {
    const HEADER_OFFSET = 72;
    const now = performance.now();
    // 연속 클릭 시 이전 smooth 스크롤 목표 위치를 기준으로 다음 행 계산
    const baseY =
      now - lastStepTimeRef.current < 500
        ? Math.max(window.scrollY, lastTargetYRef.current)
        : window.scrollY;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

    if (gridRef.current) {
      const children = Array.from(gridRef.current.children) as HTMLElement[];
      const rowTargetYs: number[] = [];

      for (const el of children) {
        const top = Math.round(
          el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
        );
        if (!rowTargetYs.some((y) => Math.abs(y - top) < 24)) {
          rowTargetYs.push(top);
        }
      }

      rowTargetYs.sort((a, b) => a - b);

      // 최상단(baseY < 30)에서는 첫 번째 카드 행이 이미 화면에 다 보이므로 두 번째 행을 우선 타겟팅
      const candidates =
        baseY < 30 && rowTargetYs.length > 1 && rowTargetYs[0] < 240
          ? rowTargetYs.slice(1)
          : rowTargetYs;

      const nextRowY = candidates.find((y) => y > baseY + 24);
      if (nextRowY !== undefined) {
        const target = Math.min(nextRowY, maxScroll);
        lastTargetYRef.current = target;
        lastStepTimeRef.current = now;
        window.scrollTo({
          top: target,
          behavior: 'smooth',
        });
        return;
      }
    }

    const fallbackTarget = Math.min(
      baseY + Math.round(window.innerHeight * 0.65),
      maxScroll
    );
    lastTargetYRef.current = fallbackTarget;
    lastStepTimeRef.current = now;
    window.scrollTo({
      top: fallbackTarget,
      behavior: 'smooth',
    });
  };

  /* 다른 도메인에 검색 결과가 있는지 확인 (현재 탭 결과가 0개일 때 안내용) */
  const otherDomainMatches = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const domainIds: DomainType[] = ['ui', 'motion', 'layout', 'style', 'video'];
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
    { id: 'video', label: DOMAIN_LABELS.video, count: counts.video, icon: <Clapperboard className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* 상단 헤더 + 5대 대분류 도메인 스위처 */}
      <header className="border-b border-slate-900 bg-slate-950/90 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* 사전 모양 로고 + 홈 이동 버튼 */}
          <button
            type="button"
            onClick={handleGoHome}
            title="홈으로 이동 (필터 초기화 및 맨 위로)"
            className="group flex items-center gap-2.5 text-left focus:outline-none rounded-xl pr-2 py-0.5 transition-opacity hover:opacity-95"
          >
            <DictionaryLogo />
            <span className="text-base font-black tracking-tight text-white group-hover:text-indigo-300 transition-colors">
              Vibe Dictionary
            </span>
          </button>

          {/* 5대 대분류 도메인 탭: [UI] [그래픽] [레이아웃] [스타일] [모션 영상] */}
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
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
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

      {/* 우측 하단 플로팅 스크롤 컨트롤 (맨 위로 / 한 뎁스 아래로) */}
      <div
        className={`fixed right-5 z-40 flex flex-col gap-2 transition-all duration-300 ${
          cart.length > 0 ? 'bottom-20' : 'bottom-5'
        }`}
      >
        <button
          type="button"
          onClick={handleScrollToTop}
          disabled={!canScrollUp}
          title="한번에 맨 위로 이동"
          aria-label="한번에 맨 위로 이동"
          className={`w-11 h-11 rounded-2xl border flex flex-col items-center justify-center gap-0.5 shadow-xl backdrop-blur-md transition-all ${
            canScrollUp
              ? 'bg-slate-900/90 hover:bg-indigo-600 text-slate-200 hover:text-white border-slate-700/80 hover:border-indigo-500 cursor-pointer'
              : 'bg-slate-900/40 text-slate-600 border-slate-800/50 cursor-not-allowed opacity-60'
          }`}
        >
          <ArrowUpToLine className="w-4 h-4" />
          <span className="text-[9px] font-extrabold leading-none">TOP</span>
        </button>

        <button
          type="button"
          onClick={handleScrollDownStep}
          disabled={!canScrollDown}
          title="한 뎁스(다음 줄) 아래로 스크롤"
          aria-label="한 뎁스 아래로 스크롤"
          className={`w-11 h-11 rounded-2xl border flex flex-col items-center justify-center gap-0.5 shadow-xl backdrop-blur-md transition-all ${
            canScrollDown
              ? 'bg-slate-900/90 hover:bg-indigo-600 text-slate-200 hover:text-white border-slate-700/80 hover:border-indigo-500 cursor-pointer'
              : 'bg-slate-900/40 text-slate-600 border-slate-800/50 cursor-not-allowed opacity-60'
          }`}
        >
          <ChevronDown className="w-4 h-4" />
          <span className="text-[9px] font-extrabold leading-none">1단</span>
        </button>
      </div>

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
