import React, { useMemo } from 'react';
import { X, Copy, Check, Trash2, Wand2 } from 'lucide-react';
import { TechniqueItem, DOMAIN_LABELS } from '@vibe-dictionary/catalog';
import { useClipboard } from '../hooks/useClipboard';

interface PromptCartDrawerProps {
  cart: TechniqueItem[];
  contextNote: string;
  onContextNoteChange: (note: string) => void;
  storageError: string | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const PromptCartDrawer: React.FC<PromptCartDrawerProps> = ({
  cart,
  contextNote,
  onContextNoteChange,
  storageError,
  isOpen,
  onOpenChange,
  onRemoveItem,
  onClearCart,
}) => {
  const applicationTarget = contextNote.trim();
  const targetMissing = applicationTarget.length === 0;
  const copyBlocked = cart.length === 0 || targetMissing;

  const combinedPrompt = useMemo(() => {
    if (cart.length === 0) {
      return '카탈로그에서 원하는 기법들을 [+ 조합기에 담기]로 선택해 주세요.';
    }

    if (!applicationTarget) {
      return '공통 적용 대상을 입력하면 조합된 프롬프트가 표시됩니다.';
    }

    const header = `아래 기법들을 다음 공통 적용 대상에 적용해 줘.\n- 공통 적용 대상: ${applicationTarget}\n- 적용 범위: 선택한 모든 기법은 위 대상 안에서만 구현해 줘. 각 기법에 나오는 버튼·카드·배경·화면 등의 표현도 위 대상 안의 해당 요소를 뜻해. 대상 밖의 화면이나 컴포넌트는 변경하지 말고, 요청한 기법과 관계없는 기존 동작은 유지해 줘.\n`;

    const list = cart
      .map(
        (item, idx) =>
          `${idx + 1}. **[${DOMAIN_LABELS[item.domain]}] ${item.titleKo} (${item.titleEn})**\n   - ${item.promptSnippet}`
      )
      .join('\n\n');

    return `${header}\n${list}`;
  }, [cart, applicationTarget]);

  const { status: copyStatus, copy } = useClipboard(combinedPrompt, 1800);
  const copiedPrompt = copyStatus === 'copied';

  const handleCopyPrompt = () => {
    if (copyBlocked) return;
    void copy();
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
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 dark:bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 h-full flex flex-col shadow-2xl transition-colors duration-200">
            {/* 헤더 */}
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  바이브 프롬프트 조합기 ({cart.length})
                </h2>
              </div>
              <button
                onClick={() => onOpenChange(false)}
                className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 본문 */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {storageError && (
                <p role="status" className="text-xs text-amber-700 dark:text-amber-300">
                  {storageError}
                </p>
              )}
              {/* 선택한 기법 칩 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                    담은 기법
                  </span>
                  {cart.length > 0 && (
                    <button
                      onClick={onClearCart}
                      className="text-[11px] text-rose-500 dark:text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> 비우기
                    </button>
                  )}
                </div>

                {cart.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-400 dark:text-slate-500 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                    선택된 기법이 없습니다.
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {cart.map((item) => (
                      <span
                        key={item.id}
                        className="inline-flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-800 dark:text-slate-200"
                      >
                        <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400">
                          [{DOMAIN_LABELS[item.domain]}]
                        </span>
                        <strong className="font-bold">{item.titleKo}</strong>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 모든 기법에 공통으로 적용할 대상 */}
              <div>
                <label htmlFor="prompt-application-target" className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                  공통 적용 대상 (필수)
                </label>
                <input
                  id="prompt-application-target"
                  type="text"
                  required
                  aria-invalid={targetMissing}
                  aria-describedby="prompt-target-help"
                  value={contextNote}
                  onChange={(e) => onContextNoteChange(e.target.value)}
                  placeholder="예: 랜딩페이지 메인 버튼, 대시보드 통계 카드, 결제 모달..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-hidden focus:border-indigo-500"
                />
                <p id="prompt-target-help" role="status" className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                  {targetMissing
                    ? '적용 대상을 입력해야 복사할 수 있습니다. 공백만 입력한 경우에도 복사가 차단됩니다.'
                    : '담은 모든 기법에 같은 적용 대상이 사용됩니다.'}
                </p>
              </div>

              {/* 생성된 프롬프트 */}
              <div>
                <span className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                  조합된 프롬프트
                </span>
                <pre className="w-full max-h-80 overflow-y-auto p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 font-mono whitespace-pre-wrap leading-relaxed">
                  {combinedPrompt}
                </pre>
              </div>
            </div>

            {/* 하단 복사 버튼 */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80">
              {copyStatus === 'error' && (
                <p role="alert" className="mb-2 text-xs text-rose-600 dark:text-rose-400">
                  복사하지 못했습니다. 다시 시도하거나 위 프롬프트를 선택해 직접 복사해 주세요.
                </p>
              )}
              <button
                onClick={handleCopyPrompt}
                disabled={copyBlocked || copyStatus === 'copying'}
                className={`w-full py-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all ${
                  copyBlocked
                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
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
                    {copyStatus === 'copying' ? '복사 중…' : '프롬프트 전체 복사하기'}
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
