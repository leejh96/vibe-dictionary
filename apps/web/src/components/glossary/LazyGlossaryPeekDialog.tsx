import { Component, lazy, Suspense, type ReactNode, type RefObject } from 'react';
import { useLocale } from '../../i18n/LocaleContext';

const GlossaryPeekDialog = lazy(() => import('./GlossaryPeekDialog').then(module => ({ default: module.GlossaryPeekDialog })));

export interface LazyGlossaryPeekDialogProps {
  termId: string | null;
  onClose: () => void;
  returnFocusRef?: RefObject<HTMLElement | null>;
  onOpenInGlossary?: (termId: string) => void;
}

export class GlossaryPeekLoadBoundary extends Component<{ children: ReactNode; onClose: () => void; resetKey: string }, { failed: boolean; prevKey: string }> {
  state = { failed: false, prevKey: this.props.resetKey };

  static getDerivedStateFromProps(props: { resetKey: string }, state: { failed: boolean; prevKey: string }) {
    return props.resetKey !== state.prevKey ? { failed: false, prevKey: props.resetKey } : null;
  }

  static getDerivedStateFromError() { return { failed: true }; }

  render() {
    return this.state.failed ? <GlossaryPeekLoadError onClose={this.props.onClose} /> : this.props.children;
  }
}

function GlossaryPeekLoadError({ onClose }: { onClose: () => void }) {
  const { t } = useLocale();
  return (
    <div role="alert" className="fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-2xl border border-rose-200 bg-white px-4 py-3 text-xs shadow-xl dark:border-rose-900 dark:bg-slate-900">
      <p className="font-semibold text-rose-700 dark:text-rose-300">{t('glossary.peekLoadError')}</p>
      <button
        type="button"
        onClick={onClose}
        className="cursor-pointer rounded-lg border border-slate-200 px-2.5 py-1 font-bold text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        {t('glossary.closePeek')}
      </button>
    </div>
  );
}

export function LazyGlossaryPeekDialog({ termId, onClose, returnFocusRef, onOpenInGlossary }: LazyGlossaryPeekDialogProps) {
  const { t } = useLocale();
  if (!termId) return null;

  return (
    <GlossaryPeekLoadBoundary onClose={onClose} resetKey={termId}>
      <Suspense fallback={
        <div role="status" aria-live="polite" className="fixed bottom-4 right-4 z-50 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
          {t('glossary.peekLoading')}
        </div>
      }>
        <GlossaryPeekDialog
          termId={termId}
          onClose={onClose}
          returnFocusRef={returnFocusRef}
          onOpenInGlossary={onOpenInGlossary}
        />
      </Suspense>
    </GlossaryPeekLoadBoundary>
  );
}
