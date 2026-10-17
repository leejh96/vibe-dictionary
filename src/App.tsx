import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import {
  Wand2,
  Layers,
  Film,
  LayoutGrid,
  Palette,
  Clapperboard,
  ArrowUpToLine,
  ArrowDownToLine,
  ChevronUp,
  ChevronDown,
  Sun,
  Moon,
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
import { usePromptCart } from './hooks/usePromptCart';

const THEME_STORAGE_KEY = 'vibe-dictionary-theme';
type ThemeMode = 'dark' | 'light';

/* 사전 모양 커스텀 로고 아이콘 (favicon.svg와 동일한 아이덴티티) */
const DictionaryLogo: React.FC = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    className="w-8 h-8 shrink-0 drop-shadow-xs transition-transform duration-200 group-hover:scale-105"
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
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {
      // localStorage 접근 불가 환경 대비 기본값 유지
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const [activeDomain, setActiveDomain] = useState<DomainType>('ui');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>('all');
  const { cart, setCart, contextNote, setContextNote, storageError } = usePromptCart();
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

  /* 바이브 코딩 사전 로고 클릭 시 홈(초기 상태 + 최상단 스크롤)으로 이동 */
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

  /* 스크롤 가능한 거리를 기준으로 이동 버튼 활성화 (소수점 오차 1px 허용) */
  const updateScrollState = useCallback(() => {
    const scrollTop = window.scrollY;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    setCanScrollUp(scrollTop > 1);
    setCanScrollDown(maxScroll - scrollTop > 1);
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

  /* 한번에 최하단으로 내려가는 핸들러 */
  const handleScrollToBottom = () => {
    lastTargetYRef.current = document.documentElement.scrollHeight;
    lastStepTimeRef.current = 0;
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  /* 한 뎁스(이전 카드 행)씩 정확히 맞춰 스크롤을 올리는 핸들러 */
  const handleScrollUpStep = () => {
    const HEADER_OFFSET = 72;
    const now = performance.now();
    // 연속 클릭 시 이전 smooth 스크롤 목표 위치를 기준으로 이전 행 계산
    const baseY =
      now - lastStepTimeRef.current < 500
        ? Math.min(window.scrollY, lastTargetYRef.current)
        : window.scrollY;

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

      // 현재 baseY보다 작은(이전) 행들 중 가장 큰 값(즉 바로 직전 행)
      const prevRowY = [...rowTargetYs].reverse().find((y) => y < baseY - 24);
      if (prevRowY !== undefined) {
        const target = Math.max(0, prevRowY);
        lastTargetYRef.current = target;
        lastStepTimeRef.current = now;
        window.scrollTo({
          top: target,
          behavior: 'smooth',
        });
        return;
      }
    }

    const fallbackTarget = Math.max(
      0,
      baseY - Math.round(window.innerHeight * 0.65)
    );
    lastTargetYRef.current = fallbackTarget;
    lastStepTimeRef.current = now;
    window.scrollTo({
      top: fallbackTarget,
      behavior: 'smooth',
    });
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

  /* 5대 대분류 도메인 탭 렌더러 (데스크탑 및 모바일/태블릿 반응형 공유) */
  const renderDomainTabs = (className?: string) => (
    <div
      className={`items-center bg-indigo-50/80 dark:bg-slate-900 p-1 rounded-xl border border-indigo-100 dark:border-slate-800 transition-colors ${className}`}
    >
      {domainTabs.map((tab) => {
        const isActive = activeDomain === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleDomainSwitch(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
              isActive
                ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-500/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-indigo-700 dark:hover:text-slate-200'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                isActive
                  ? 'bg-indigo-800/80 text-indigo-100'
                  : 'bg-white/90 dark:bg-slate-800 text-indigo-600 dark:text-slate-400 border border-indigo-100/80 dark:border-transparent'
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="relative min-h-screen bg-linear-to-b from-indigo-50/70 via-slate-50 to-sky-50/60 dark:from-slate-950 dark:via-slate-950 dark:to-slate-950 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-20 transition-colors duration-200 overflow-x-hidden">
      {/* 라이트 모드 전용 상단 파스텔 오로라 앰비언트 조명 */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 h-80 overflow-hidden z-0 dark:hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-24 left-1/4 w-96 h-64 rounded-full bg-indigo-300/35 blur-3xl" />
        <div className="absolute -top-20 right-1/4 w-96 h-64 rounded-full bg-sky-300/30 blur-3xl" />
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-80 h-48 rounded-full bg-fuchsia-200/30 blur-3xl" />
      </div>

      {/* 상단 헤더 + 5대 대분류 도메인 스위처 */}
      <header className="border-b border-indigo-100/90 dark:border-slate-900 bg-white/85 dark:bg-slate-950/90 sticky top-0 z-30 backdrop-blur-md shadow-xs shadow-indigo-500/4 dark:shadow-none transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
          {/* 상단 1행: 로고 (좌측) + [데스크탑 전용] 대분류 탭 (중앙) + 프롬프트 조합기 (우측 고정) */}
          <div className="flex items-center justify-between gap-3">
            {/* 사전 모양 로고 + 홈 이동 버튼 */}
            <button
              type="button"
              onClick={handleGoHome}
              title="홈으로 이동 (필터 초기화 및 맨 위로)"
              className="group flex items-center gap-2.5 text-left focus:outline-hidden rounded-xl pr-2 py-0.5 transition-opacity hover:opacity-95 shrink-0 cursor-pointer"
            >
              <DictionaryLogo />
              <span className="text-base font-black tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                바이브 코딩 사전
              </span>
            </button>

            {/* [데스크탑 전용 (lg 이상)]: 5대 대분류 탭 (단일 행 중앙/우측 배치) */}
            {renderDomainTabs('hidden lg:flex shrink-0')}

            {/* 프롬프트 조합기 열기 버튼 (우측 상단 항시 고정, 절대 다음 줄로 밀리지 않음) */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-indigo-50/90 hover:bg-indigo-100/80 dark:bg-slate-900 dark:hover:bg-slate-800 border border-indigo-200/80 dark:border-slate-800 text-xs font-bold text-indigo-900 dark:text-slate-200 flex items-center gap-1.5 transition-colors shadow-xs shadow-indigo-500/5 dark:shadow-none shrink-0 cursor-pointer active:scale-95"
            >
              <Wand2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>조합기</span>
              <span className="px-1.5 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-mono font-extrabold">
                {cart.length}
              </span>
            </button>
          </div>

          {/* [모바일/태블릿 전용 (lg 미만)]: 5대 대분류 탭 독립 가로 스크롤 행 */}
          {renderDomainTabs('flex lg:hidden overflow-x-auto mt-2 scrollbar-none')}
        </div>
      </header>

      {/* 메인 갤러리 */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-5 space-y-5">
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
          <div className="py-16 text-center space-y-3 bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/60 rounded-2xl shadow-xs dark:shadow-none">
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
              현재 영역에 "{searchQuery}" 검색 결과가 없습니다.
            </p>

            {otherDomainMatches.length > 0 && (
              <div className="flex items-center justify-center gap-2 flex-wrap pt-1">
                <span className="text-xs text-slate-500 dark:text-slate-400">
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
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 underline font-semibold"
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

      {/* 우측 하단 플로팅 그룹: [테마 전환 알약] + [4단 스크롤 캡슐] (너비 w-12(48px) 완벽 통일) */}
      <div
        className={`fixed right-5 z-40 flex flex-col items-center gap-2.5 transition-all duration-300 w-12 ${
          cart.length > 0 ? 'bottom-20' : 'bottom-5'
        }`}
      >
        {/* 1. 독립 테마 전환 알약 버튼 (카드를 보면서 즉각적인 비주얼 무드 비교) */}
        <button
          type="button"
          onClick={handleToggleTheme}
          title={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
          aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
          className="w-12 h-12 rounded-2xl flex flex-col items-center justify-center gap-0.5 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-950/10 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-indigo-500/10 cursor-pointer active:scale-95 transition-all"
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-4 h-4 text-amber-400" />
              <span className="text-[8px] font-extrabold leading-none text-amber-400">
                LIGHT
              </span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-indigo-600" />
              <span className="text-[8px] font-extrabold leading-none text-indigo-600">
                DARK
              </span>
            </>
          )}
        </button>

        {/* 2. 순수 스크롤 내비게이션 전용 4단 일체형 캡슐 */}
        <div className="w-12 flex flex-col items-center bg-white/95 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-950/10 p-1">
          {/* 1. 맨 위로 스크롤 (TOP) */}
          <button
            type="button"
            onClick={handleScrollToTop}
            disabled={!canScrollUp}
            title="한번에 맨 위로 이동 (TOP)"
            aria-label="한번에 맨 위로 이동"
            className={`w-full h-10 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all ${
              canScrollUp
                ? 'hover:bg-indigo-600 text-slate-700 dark:text-slate-200 hover:text-white cursor-pointer active:scale-95'
                : 'text-slate-300 dark:text-slate-700 cursor-not-allowed opacity-40'
            }`}
          >
            <ArrowUpToLine className="w-3.5 h-3.5" />
            <span className="text-[9px] font-extrabold leading-none">TOP</span>
          </button>

          <div className="w-6 h-px bg-slate-200/80 dark:bg-slate-800/80 my-0.5" />

          {/* 2. 한 줄 위로 스크롤 (UP) */}
          <button
            type="button"
            onClick={handleScrollUpStep}
            disabled={!canScrollUp}
            title="한 줄(한 뎁스) 위로 스크롤 (UP)"
            aria-label="한 줄 위로 스크롤"
            className={`w-full h-10 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all ${
              canScrollUp
                ? 'hover:bg-indigo-600 text-slate-700 dark:text-slate-200 hover:text-white cursor-pointer active:scale-95'
                : 'text-slate-300 dark:text-slate-700 cursor-not-allowed opacity-40'
            }`}
          >
            <ChevronUp className="w-3.5 h-3.5" />
            <span className="text-[9px] font-extrabold leading-none">UP</span>
          </button>

          <div className="w-6 h-px bg-slate-200/80 dark:bg-slate-800/80 my-0.5" />

          {/* 3. 한 줄 아래로 스크롤 (DOWN) */}
          <button
            type="button"
            onClick={handleScrollDownStep}
            disabled={!canScrollDown}
            title="한 줄(한 뎁스) 아래로 스크롤 (DOWN)"
            aria-label="한 줄 아래로 스크롤"
            className={`w-full h-10 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all ${
              canScrollDown
                ? 'hover:bg-indigo-600 text-slate-700 dark:text-slate-200 hover:text-white cursor-pointer active:scale-95'
                : 'text-slate-300 dark:text-slate-700 cursor-not-allowed opacity-40'
            }`}
          >
            <ChevronDown className="w-3.5 h-3.5" />
            <span className="text-[9px] font-extrabold leading-none">DOWN</span>
          </button>

          <div className="w-6 h-px bg-slate-200/80 dark:bg-slate-800/80 my-0.5" />

          {/* 4. 맨 끝(최하단)으로 스크롤 (BOTTOM) */}
          <button
            type="button"
            onClick={handleScrollToBottom}
            disabled={!canScrollDown}
            title="한번에 맨 아래로 이동 (BOTTOM)"
            aria-label="한번에 맨 아래로 이동"
            className={`w-full h-10 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all ${
              canScrollDown
                ? 'hover:bg-indigo-600 text-slate-700 dark:text-slate-200 hover:text-white cursor-pointer active:scale-95'
                : 'text-slate-300 dark:text-slate-700 cursor-not-allowed opacity-40'
            }`}
          >
            <ArrowDownToLine className="w-3.5 h-3.5" />
            <span className="text-[7.5px] font-extrabold leading-none tracking-normal whitespace-nowrap">
              BOTTOM
            </span>
          </button>
        </div>
      </div>

      <PromptCartDrawer
        cart={cart}
        contextNote={contextNote}
        onContextNoteChange={setContextNote}
        storageError={storageError}
        isOpen={isCartOpen}
        onOpenChange={setIsCartOpen}
        onRemoveItem={(id) => setCart((prev) => prev.filter((i) => i.id !== id))}
        onClearCart={() => setCart([])}
      />
    </div>
  );
}
