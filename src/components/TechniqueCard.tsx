import React, { useState } from 'react';
import { Copy, Check, Plus, Trash2, Code2, GraduationCap, ArrowRight } from 'lucide-react';
import { TechniqueItem, SITUATION_CATEGORIES } from '../data/techniques';
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
  const [copiedSingle, setCopiedSingle] = useState(false);
  const [showPromptPreview, setShowPromptPreview] = useState(false);

  const handleCopySingle = () => {
    const textToCopy = `[기법 명칭]: ${item.titleKo} (${item.titleEn})\n[바이브코딩 프롬프트 지침]: ${item.promptSnippet}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedSingle(true);
    setTimeout(() => setCopiedSingle(false), 1800);
  };

  return (
    <article
      className={`group rounded-2xl border transition-all duration-200 flex flex-col overflow-hidden ${
        isSelected
          ? 'bg-slate-900/95 border-indigo-500 ring-2 ring-indigo-500/30 shadow-xl shadow-indigo-500/10'
          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 shadow-lg'
      }`}
    >
      {/* 1. 상단 라이브 인터랙티브 데모 스테이지 */}
      <div className="relative bg-slate-950/90 border-b border-slate-800/80">
        <div className="absolute top-2.5 left-3 z-20 flex items-center gap-1.5 flex-wrap">
          {item.situations.map((sitId) => {
            const meta = SITUATION_CATEGORIES.find((c) => c.id === sitId);
            if (!meta) return null;
            return (
              <span
                key={sitId}
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${meta.badgeClass}`}
              >
                {meta.emoji} {meta.label}
              </span>
            );
          })}
        </div>

        <InteractiveDemo techniqueId={item.id} />
      </div>

      {/* 2. 중단: 일상어 느낌 ➔ 전문 용어 매핑 */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* 일상 표현 ➔ 전문 용어 브릿지 배지 */}
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 bg-amber-950/50 border border-amber-700/40 px-2.5 py-1 rounded-lg">
            <span>💬 "{item.vibePhrase}"</span>
            <ArrowRight className="w-3 h-3 text-amber-400 shrink-0" />
            <span className="text-white font-bold">전문 용어</span>
          </div>

          {/* 정식 국/영문 기법 명칭 */}
          <div>
            <h3 className="text-lg font-extrabold text-white tracking-tight">
              {item.titleKo}
            </h3>
            <p className="text-xs font-mono text-indigo-400 font-medium">
              {item.titleEn}
            </p>
          </div>

          {/* 쉬운 설명 */}
          <p className="text-xs text-slate-300 leading-relaxed">
            {item.plainDescription}
          </p>

          {/* 코딩 교육 효과 */}
          <div className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-3 flex items-start gap-2">
            <GraduationCap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-300 leading-relaxed">
              <strong className="text-emerald-300">교육 효과: </strong>
              {item.whyItWorks}
            </p>
          </div>

          {/* 의성어/느낌 검색 키워드 태그 */}
          <div className="flex items-center gap-1 flex-wrap pt-1">
            {item.vibeKeywords.map((kw) => (
              <span
                key={kw}
                className="text-[10px] text-slate-400 bg-slate-800/70 px-2 py-0.5 rounded"
              >
                #{kw}
              </span>
            ))}
          </div>
        </div>

        {/* 3. 하단: 프롬프트 미리보기 토글 및 장바구니/단건 복사 버튼 */}
        <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
          <button
            onClick={() => setShowPromptPreview(!showPromptPreview)}
            className="w-full flex items-center justify-between text-[11px] font-semibold text-slate-400 hover:text-indigo-300 py-1 transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" />
              AI에게 전달될 바이브 프롬프트 문구 {showPromptPreview ? '닫기' : '미리보기'}
            </span>
            <span>{showPromptPreview ? '▲' : '▼'}</span>
          </button>

          {showPromptPreview && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-2 text-xs">
              <p className="text-indigo-200 leading-relaxed font-mono text-[11px]">
                "{item.promptSnippet}"
              </p>
              <div className="text-[10px] font-mono text-slate-500 border-t border-slate-800 pt-1.5">
                💡 핵심 속성: {item.codeHint}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySingle}
              className="flex-1 py-2.5 px-3 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-xs font-bold text-slate-200 flex items-center justify-center gap-1.5 transition-all"
            >
              {copiedSingle ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">복사 완료!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>이 기법만 복사</span>
                </>
              )}
            </button>

            <button
              onClick={() => onToggleCart(item)}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                isSelected
                  ? 'bg-rose-500/20 border border-rose-500/50 text-rose-200 hover:bg-rose-500/30'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/25'
              }`}
            >
              {isSelected ? (
                <>
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>장바구니 빼기</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>장바구니 담기</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
