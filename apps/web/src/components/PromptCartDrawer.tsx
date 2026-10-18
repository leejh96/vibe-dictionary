import { useLocale } from '../i18n/LocaleContext';
import React, { useMemo } from 'react';
import { X, Copy, Check, Trash2, Wand2 } from 'lucide-react';
import { TechniqueItem, DOMAIN_LABELS, DOMAIN_NAMES, getTechniqueText } from '@vibe-dictionary/catalog';
import { useClipboard } from '../hooks/useClipboard';

interface PromptCartDrawerProps {
  cart: TechniqueItem[];
  contextNote: string;
  onContextNoteChange: (note: string) => void;
  storageError: 'composer.storageError' | null;
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
  const { t, locale } = useLocale();
  const applicationTarget = contextNote.trim();
  const targetMissing = applicationTarget.length === 0;
  const copyBlocked = cart.length === 0 || targetMissing;

  const combinedPrompt = useMemo(() => {
    if (cart.length === 0) {
      return t("composer.chooseTechniques");
    }

    if (!applicationTarget) {
      return t("composer.enterTarget");
    }

    const header = t('composer.scope', { target: applicationTarget });

    const list = cart
      .map(
        (item, idx) =>
          locale === 'ko'
            ? `${idx + 1}. **[${DOMAIN_NAMES[locale][item.domain]}] ${item.titleKo} (${item.titleEn})**\n   - ${item.promptSnippet}`
            : `${idx + 1}. **[${DOMAIN_NAMES.en[item.domain]}] ${item.titleEn}**\n   - ${getTechniqueText(item, locale).promptSnippet}`
      )
      .join('\n\n');

    return `${header}\n${list}`;
  }, [cart, applicationTarget, locale, t]);

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
            <span>{t("composer.name")}</span>
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
                <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">{t("composer.heading", { count: cart.length })}
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
                  {t(storageError)}
                </p>
              )}
              {/* 선택한 기법 칩 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{t("composer.selected")}</span>
                  {cart.length > 0 && (
                    <button
                      onClick={onClearCart}
                      className="text-[11px] text-rose-500 dark:text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />{t("actions.clear")}</button>
                  )}
                </div>

                {cart.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-400 dark:text-slate-500 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">{t("composer.empty")}</div>
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
                        <strong className="font-bold">{getTechniqueText(item, locale).title}</strong>
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
                <label htmlFor="prompt-application-target" className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">{t("composer.targetLabel")}</label>
                <input
                  id="prompt-application-target"
                  type="text"
                  required
                  aria-invalid={targetMissing}
                  aria-describedby="prompt-target-help"
                  value={contextNote}
                  onChange={(e) => onContextNoteChange(e.target.value)}
                  placeholder={t("composer.targetPlaceholder")}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-hidden focus:border-indigo-500"
                />
                <p id="prompt-target-help" role="status" className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                  {targetMissing ? t("composer.targetRequired") : t("composer.targetHelp")}
                </p>
              </div>

              {/* 생성된 프롬프트 */}
              <div>
                <span className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">{t("composer.previewLabel")}</span>
                <pre className="w-full max-h-80 overflow-y-auto p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 font-mono whitespace-pre-wrap leading-relaxed">
                  {combinedPrompt}
                </pre>
              </div>
            </div>

            {/* 하단 복사 버튼 */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80">
              {copyStatus === 'error' && (
                <p role="alert" className="mb-2 text-xs text-rose-600 dark:text-rose-400">{t("composer.copyError")}</p>
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
                    <Check className="w-4 h-4" />{t("actions.copyComplete")}</>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    {copyStatus === 'copying' ? t("actions.copying") : t("composer.copy")}
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
