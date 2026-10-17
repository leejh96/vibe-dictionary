import React, { useEffect, useRef, useState } from 'react';
import { Copy, Check, Plus, CheckCircle2, Code2 } from 'lucide-react';
import { TechniqueItem, CATEGORY_LABEL_MAP } from '../data/techniques';
import { InteractiveDemo } from './demos/InteractiveDemos';

interface TechniqueCardProps {
  item: TechniqueItem;
  isSelected: boolean;
  onToggleCart: (item: TechniqueItem) => void;
}

export const TechniqueCard: React.FC<TechniqueCardProps> = ({
  item,
  isSelected,
  onToggleCart,
}) => {
  const [copied, setCopied] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const demoContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = demoContainerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const latest = entries[entries.length - 1];
        if (latest) {
          setIsInView(latest.isIntersecting);
        }
      },
      { rootMargin: '200px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const categoryLabel = CATEGORY_LABEL_MAP[item.category] ?? item.category;

  const handleCopy = () => {
    const text = `[${item.titleKo} / ${item.titleEn}]\n${item.promptSnippet}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <article
      className={`group rounded-2xl border transition-all duration-200 flex flex-col overflow-hidden ${
        isSelected
          ? 'bg-slate-900 border-indigo-500 ring-1 ring-indigo-500/40'
          : 'bg-slate-900/50 border-slate-800/90 hover:border-slate-700'
      }`}
    >
      {/* 1. 상단 인터랙티브 데모 캔버스 */}
      <div
        ref={demoContainerRef}
        className="relative bg-slate-950/90 border-b border-slate-800/70"
      >
        <span className="absolute top-2.5 left-3 z-20 text-[10px] font-semibold text-slate-400 bg-slate-900/90 border border-slate-800 px-2 py-0.5 rounded-md">
          {categoryLabel}
        </span>

        <button
          onClick={() => setShowPrompt(!showPrompt)}
          title="프롬프트 문구 보기"
          className={`absolute top-2.5 right-3 z-20 px-2 py-1 rounded-lg border text-[10px] font-bold flex items-center gap-1 transition-colors ${
            showPrompt
              ? 'bg-indigo-600 text-white border-indigo-500'
              : 'bg-slate-900/90 text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          <Code2 className="w-3 h-3" />
          <span>{showPrompt ? '데모 보기' : '프롬프트'}</span>
        </button>

        {showPrompt ? (
          <div className="h-40 p-4 pt-10 flex items-center bg-slate-950 text-xs font-mono text-indigo-200 leading-relaxed overflow-y-auto break-keep">
            {item.promptSnippet}
          </div>
        ) : isInView ? (
          <InteractiveDemo techniqueId={item.id} />
        ) : (
          <div className="w-full h-40 bg-slate-950/90" aria-hidden="true" />
        )}
      </div>

      {/* 2. 하단 정보 영역 (말줄임표 없이 전체 텍스트 노출) */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div className="space-y-1 break-keep">
          <div className="text-xs font-semibold text-amber-400">
            "{item.vibeTag}"
          </div>
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <h3 className="text-base font-extrabold text-white">
              {item.titleKo}
            </h3>
            <span className="text-xs font-mono text-indigo-400/90">
              {item.titleEn}
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed pt-0.5">
            {item.summary}
          </p>
        </div>

        {/* 하단 액션 버튼 바 */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-800/70">
          <button
            onClick={handleCopy}
            className="flex-1 h-8 px-3 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 text-xs font-bold text-slate-300 flex items-center justify-center gap-1.5 transition-colors"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span>{copied ? '복사됨!' : '프롬프트 복사'}</span>
          </button>

          <button
            onClick={() => onToggleCart(item)}
            className={`flex-1 h-8 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
              isSelected
                ? 'bg-indigo-500/15 border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/25'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            {isSelected ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>담김 (빼기)</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 text-slate-400" />
                <span>조합기에 담기</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
