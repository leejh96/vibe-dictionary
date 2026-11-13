import { useEffect, useId, useRef, type RefObject } from 'react';
import { ArrowUpRight, BookMarked, Check, Copy, X } from 'lucide-react';
import { getGlossaryTerm } from '@vibe-dictionary/catalog';
import { useClipboard } from '../../hooks/useClipboard';
import { useLocale } from '../../i18n/LocaleContext';
import { GLOSSARY_CATEGORY_KEYS } from './GlossaryFilters';

interface GlossaryPeekDialogProps {
  termId: string;
  onClose: () => void;
  returnFocusRef?: RefObject<HTMLElement | null>;
  onOpenInGlossary?: (termId: string) => void;
}

export function GlossaryPeekDialog({
  termId,
  onClose,
  returnFocusRef,
  onOpenInGlossary,
}: GlossaryPeekDialogProps) {
  const { locale, t } = useLocale();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const headingId = useId();
  const term = getGlossaryTerm(termId);
  const termText = term?.text[locale];
  const { status, copy } = useClipboard(termText?.promptSnippet ?? '');

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus =
      typeof document === 'undefined' ? null : (document.activeElement as HTMLElement | null);
    dialog?.showModal?.();
    closeButtonRef.current?.focus?.();
    const triggerToRestore = returnFocusRef?.current;
    return () => {
      dialog?.close?.();
      const target = triggerToRestore ?? previousFocus;
      if (target && (!('isConnected' in target) || target.isConnected)) {
        target.focus?.();
      }
    };
  }, [termId, returnFocusRef]);

  const aliases = term ? term.aliases[locale] : [];

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={headingId}
      aria-modal="true"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          onClose();
          return;
        }
        if (event.key !== 'Tab') return;
        const controls = Array.from(
          event.currentTarget.querySelectorAll<HTMLElement>(
            'button:not(:disabled), a[href], input:not(:disabled), [tabindex="0"]'
          )
        );
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && event.target === first && last) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && event.target === last && first) {
          event.preventDefault();
          first.focus();
        }
      }}
      className="fixed inset-0 z-50 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto border-0 bg-slate-900/50 p-2 backdrop-blur-xs open:flex open:flex-col open:items-center dark:bg-black/75 sm:p-4"
    >
      <div className="my-auto flex max-h-[calc(100dvh-1rem)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-2xl dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 sm:max-h-[calc(100dvh-2rem)]">
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-800 sm:px-5 sm:py-4">
          <div className="min-w-0 flex-1 space-y-1">
            {term && (
              <span className="inline-flex max-w-full items-center gap-1 rounded-md bg-indigo-50 px-2 py-0.5 text-[11px] font-bold text-indigo-700 [overflow-wrap:anywhere] dark:bg-indigo-950 dark:text-indigo-200">
                <BookMarked aria-hidden="true" className="h-3 w-3 shrink-0" />
                <span>{t(GLOSSARY_CATEGORY_KEYS[term.category])}</span>
              </span>
            )}
            <h2 id={headingId} className="min-w-0 text-base font-extrabold text-slate-900 [overflow-wrap:anywhere] dark:text-white">
              {termText ? termText.name : t('glossary.termNotFound')}
            </h2>
            {locale === 'ko' && term && termText && term.name.en !== termText.name && (
              <p lang="en" className="min-w-0 text-xs font-mono font-semibold text-indigo-600 [overflow-wrap:anywhere] dark:text-indigo-400">
                {term.name.en}
              </p>
            )}
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={t('glossary.closePeek')}
            className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white sm:h-9 sm:w-9"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>

        {term && termText ? (
          <div
            role="region"
            aria-labelledby={headingId}
            tabIndex={0}
            className="prompt-scroll min-h-0 flex-1 space-y-3.5 overflow-y-auto p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500 sm:space-y-4 sm:p-5"
          >
            {aliases.length > 0 && (
              <div className="flex min-w-0 flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  {t('glossary.aliasesLabel')}
                </span>
                {aliases.map((alias) => (
                  <span
                    key={alias}
                    className="max-w-full rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] text-slate-700 [overflow-wrap:anywhere] dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                  >
                    {alias}
                  </span>
                ))}
              </div>
            )}

            <section className="min-w-0 space-y-1">
              <h3 className="text-xs font-extrabold text-slate-700 dark:text-slate-200">
                {t('glossary.definitionLabel')}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 [overflow-wrap:anywhere] dark:text-slate-300">
                {termText.definition}
              </p>
            </section>

            <section className="min-w-0 space-y-1">
              <h3 className="text-xs font-extrabold text-slate-700 dark:text-slate-200">
                {t('glossary.exampleLabel')}
              </h3>
              <p className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-relaxed text-slate-700 [overflow-wrap:anywhere] dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                {termText.example}
              </p>
            </section>

            <section className="min-w-0 space-y-2">
              <h3 className="text-xs font-extrabold text-slate-700 dark:text-slate-200">
                {t('glossary.promptLabel')}
              </h3>
              <p className="whitespace-pre-wrap rounded-xl border border-indigo-100 bg-indigo-50/70 p-3 text-xs font-mono leading-relaxed text-indigo-950 [overflow-wrap:anywhere] dark:border-indigo-950 dark:bg-slate-950 dark:text-indigo-200">
                {termText.promptSnippet}
              </p>
            </section>
          </div>
        ) : (
          <div className="min-h-0 flex-1 overflow-y-auto p-4 text-sm text-slate-600 [overflow-wrap:anywhere] dark:text-slate-300 sm:p-5">
            {t('glossary.termNotFound')}
          </div>
        )}

        {term && (termText || onOpenInGlossary) && (
          <div className="shrink-0 space-y-2 border-t border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/80 sm:px-5 sm:py-3.5">
            {status === 'error' && (
              <p role="alert" className="min-w-0 text-xs text-rose-600 [overflow-wrap:anywhere] dark:text-rose-400">
                {t('glossary.copyError')}
              </p>
            )}
            <div className="flex flex-wrap items-center justify-between gap-2">
              {termText && (
                <button
                  type="button"
                  disabled={status === 'copying'}
                  onClick={() => void copy()}
                  className="inline-flex min-h-11 max-w-full cursor-pointer items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-9"
                >
                  {status === 'copied' ? (
                    <Check aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                  ) : (
                    <Copy aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                  )}
                  <span className="[overflow-wrap:anywhere]">
                    {t(
                      status === 'copied'
                        ? 'glossary.copied'
                        : status === 'copying'
                          ? 'glossary.copying'
                          : 'glossary.copyPrompt'
                    )}
                  </span>
                </button>
              )}

              {onOpenInGlossary && (
                <button
                  type="button"
                  onClick={() => onOpenInGlossary(term.id)}
                  className="ml-auto inline-flex min-h-11 max-w-full cursor-pointer items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-indigo-600 transition-colors hover:border-indigo-300 hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-indigo-300 dark:hover:bg-slate-800 sm:min-h-9"
                >
                  <span className="[overflow-wrap:anywhere]">{t('glossary.openInGlossary')}</span>
                  <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
}
