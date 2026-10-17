import React, { useState, useMemo } from 'react';
import { Sparkles, Wand2 } from 'lucide-react';
import { TECHNIQUES, TechniqueItem, CategoryType } from './data/techniques';
import { FilterBar } from './components/FilterBar';
import { TechniqueCard } from './components/TechniqueCard';
import { PromptCartDrawer } from './components/PromptCartDrawer';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>('all');
  const [cart, setCart] = useState<TechniqueItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredTechniques = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return TECHNIQUES.filter((item) => {
      const matchCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      if (!q) return matchCategory;

      const searchableText = [
        item.titleKo,
        item.titleEn,
        item.vibeTag,
        item.summary,
        ...item.vibeKeywords,
      ]
        .join(' ')
        .toLowerCase();

      return matchCategory && searchableText.includes(q);
    });
  }, [searchQuery, selectedCategory]);

  const handleToggleCart = (item: TechniqueItem) => {
    setCart((prev) =>
      prev.some((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item]
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* 심플 헤더 */}
      <header className="border-b border-slate-900 bg-slate-950/90 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-base font-black tracking-tight text-white">
              Vibe Dictionary
            </h1>
            <span className="hidden sm:inline-block text-xs text-slate-500">
              보고 고르는 UI · 모션 사전
            </span>
          </div>

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
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          totalCount={filteredTechniques.length}
        />

        {filteredTechniques.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <p className="text-sm font-bold text-slate-400">
              "{searchQuery}" 검색 결과가 없습니다.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-xs text-indigo-400 underline"
            >
              필터 초기화
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

export default App;
