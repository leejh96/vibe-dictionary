import React, { useState, useMemo } from 'react';
import { BookOpen, Sparkles, Wand2, Layers } from 'lucide-react';
import { TECHNIQUES, TechniqueItem, SituationType } from './data/techniques';
import { FilterBar } from './components/FilterBar';
import { TechniqueCard } from './components/TechniqueCard';
import { PromptCartDrawer } from './components/PromptCartDrawer';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSituation, setSelectedSituation] = useState<SituationType | 'all'>('all');
  const [cart, setCart] = useState<TechniqueItem[]>([
    TECHNIQUES[0], // 3D 카드 플립 기본 샘플
    TECHNIQUES[1], // 컨페티 파티클 버스트 기본 샘플
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredTechniques = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return TECHNIQUES.filter((item) => {
      const matchSituation =
        selectedSituation === 'all' || item.situations.includes(selectedSituation);

      if (!q) return matchSituation;

      const searchableText = [
        item.titleKo,
        item.titleEn,
        item.vibePhrase,
        item.plainDescription,
        item.whyItWorks,
        ...item.vibeKeywords,
      ]
        .join(' ')
        .toLowerCase();

      return matchSituation && searchableText.includes(q);
    });
  }, [searchQuery, selectedSituation]);

  const handleToggleCart = (item: TechniqueItem) => {
    setCart((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-24">
      {/* 상단 헤더 */}
      <header className="border-b border-slate-800/80 bg-slate-950/90 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black tracking-tight text-white">
                  보고 고르는 바이브 사전
                </h1>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  코딩 교육 콘텐츠 기획용
                </span>
              </div>
              <p className="text-xs text-slate-400">
                전문 UI·모션 용어를 몰라도 눈으로 보고 고르면 AI 바이브코딩 프롬프트로 번역해 드립니다.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-indigo-300 flex items-center gap-2 transition-colors"
            >
              <Wand2 className="w-4 h-4" />
              <span>선택한 기법 프롬프트 조합 ({cart.length})</span>
            </button>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 컨테이너 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* 3단계 사용 가이드 배너 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-3.5 flex items-center gap-3">
            <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 font-black text-xs flex items-center justify-center shrink-0">
              1
            </span>
            <div className="text-xs">
              <strong className="text-white block">느낌이나 상황으로 찾기</strong>
              <span className="text-slate-400">"통통 튀는", "정답 맞혔을 때"처럼 검색하세요.</span>
            </div>
          </div>
          <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-3.5 flex items-center gap-3">
            <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 font-black text-xs flex items-center justify-center shrink-0">
              2
            </span>
            <div className="text-xs">
              <strong className="text-white block">살아 움직이는 데모 직접 눌러보기</strong>
              <span className="text-slate-400">카드 안의 버튼을 직접 클릭·호버해 손맛을 확인하세요.</span>
            </div>
          </div>
          <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-3.5 flex items-center gap-3">
            <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 font-black text-xs flex items-center justify-center shrink-0">
              3
            </span>
            <div className="text-xs">
              <strong className="text-white block">장바구니에 담아 바이브 프롬프트 완성</strong>
              <span className="text-slate-400">교육 주제만 적으면 전문 용어가 포함된 프롬프트가 완성됩니다.</span>
            </div>
          </div>
        </div>

        {/* 검색 및 상황별 필터 바 */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedSituation={selectedSituation}
          onSituationChange={setSelectedSituation}
          totalCount={filteredTechniques.length}
        />

        {/* 기법 카드 그리드 */}
        {filteredTechniques.length === 0 ? (
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
            <Layers className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-slate-300">
              "{searchQuery}"에 해당하는 기법을 찾지 못했어요
            </h3>
            <p className="text-xs text-slate-400">
              '통통 튀는', '팡 터지는', '부르르', '착 달라붙는', '촤르륵' 같은 일상 표현으로 검색해 보거나 필터를 초기화해 보세요.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSituation('all');
              }}
              className="mt-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
            >
              전체 기법 다시 보기
            </button>
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

      {/* 프롬프트 장바구니 드로어 */}
      <PromptCartDrawer
        cart={cart}
        isOpen={isCartOpen}
        onOpenChange={setIsCartOpen}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />
    </div>
  );
}

export default App;
