import React, { useState, useMemo } from 'react';
import { X, Copy, Check, Trash2, Wand2 } from 'lucide-react';
import { TechniqueItem } from '../data/techniques';

interface PromptCartDrawerProps {
  cart: TechniqueItem[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const PromptCartDrawer: React.FC<PromptCartDrawerProps> = ({
  cart,
  isOpen,
  onOpenChange,
  onRemoveItem,
  onClearCart,
}) => {
  const [contextNote, setContextNote] = useState('');
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const combinedPrompt = useMemo(() => {
    if (cart.length === 0) {
      return '카탈로그에서 원하는 기법들을 [+ 담기]로 선택해 주세요.';
    }

    const header = contextNote.trim()
      ? `다음 화면/기능을 구현할 때 아래 UI·모션 기법들을 정확히 적용해 줘.\n- 적용 대상: ${contextNote.trim()}\n`
      : `화면/컴포넌트를 구현할 때 아래 선택한 UI·모션 기법들을 정확히 적용해 줘.\n`;

    const list = cart
      .map(
        (item, idx) =>
          `${idx + 1}. **${item.titleKo} (${item.titleEn})**\n   - ${item.promptSnippet}`
      )
      .join('\n\n');

    return `${header}\n${list}`;
  }, [cart, contextNote]);

  const handleCopyPrompt = () => {
    if (cart.length === 0) return;
    navigator.clipboard.writeText(combinedPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 1800);
  };

  return (
    <>
      {/* 우측 하단 플로팅 조합기 버튼 */}
      {cart.length > 0 && (
        <div className="fixed bottom-5 right-5 z-40">
          <button
            onClick={() => onOpenChange(true)}
            className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-2xl shadow-indigo-500/40 transition-all"
          >
            <Wand2 className="w-4 h-4" />
            <span>프롬프트 조합기</span>
            <span className="px-2 py-0.5 rounded-full bg-white text-slate-950 font-black text-[11px]">
              {cart.length}
            </span>
          </button>
        </div>
      )}

      {/* 슬라이드 드로어 */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl">
            {/* 헤더 */}
            <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-indigo-400" />
                <h2 className="text-sm font-extrabold text-white">
                  바이브 프롬프트 조합기 ({cart.length})
                </h2>
              </div>
              <button
                onClick={() => onOpenChange(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 본문 */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* 선택한 기법 칩 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400">
                    담은 기법
                  </span>
                  {cart.length > 0 && (
                    <button
                      onClick={onClearCart}
                      className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> 비우기
                    </button>
                  )}
                </div>

                {cart.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-xl">
                    선택된 기법이 없습니다.
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {cart.map((item) => (
                      <span
                        key={item.id}
                        className="inline-flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-200"
                      >
                        <strong className="font-bold">{item.titleKo}</strong>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-500 hover:text-rose-400"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 어디에 적용할지 한 줄 메모 (선택) */}
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5">
                  어디에 적용할까요? (선택사항)
                </label>
                <input
                  type="text"
                  value={contextNote}
                  onChange={(e) => setContextNote(e.target.value)}
                  placeholder="예: 랜딩페이지 메인 버튼, 대시보드 통계 카드, 결제 모달..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* 생성된 프롬프트 */}
              <div>
                <span className="block text-xs font-bold text-slate-400 mb-1.5">
                  조합된 프롬프트
                </span>
                <pre className="w-full max-h-80 overflow-y-auto p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed">
                  {combinedPrompt}
                </pre>
              </div>
            </div>

            {/* 하단 복사 버튼 */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/80">
              <button
                onClick={handleCopyPrompt}
                disabled={cart.length === 0}
                className={`w-full py-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all ${
                  cart.length === 0
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : copiedPrompt
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                }`}
              >
                {copiedPrompt ? (
                  <>
                    <Check className="w-4 h-4" />
                    복사 완료!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    프롬프트 전체 복사하기
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
