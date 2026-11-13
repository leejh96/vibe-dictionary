import { Component, lazy, Suspense, type ReactNode } from 'react';
import { useLocale } from '../i18n/LocaleContext';
import type { GlossaryViewProps } from './glossary/types';

const GlossaryView = lazy(() => import('./GlossaryView').then(module => ({ default: module.GlossaryView })));

export class GlossaryLoadBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() { return { failed: true }; }

  render() { return this.state.failed ? <GlossaryLoadError /> : this.props.children; }
}

function GlossaryLoadError() {
  const { t } = useLocale();
  return (
    <div role="alert" className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <p className="text-sm text-slate-700 dark:text-slate-200">{t('glossary.loadError')}</p>
      <button
        type="button"
        className="cursor-pointer rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:hover:bg-slate-800"
        onClick={() => window.location.reload()}
      >
        {t('card.reloadPage')}
      </button>
    </div>
  );
}

export function LazyGlossaryView(props: GlossaryViewProps) {
  const { t } = useLocale();
  return (
    <GlossaryLoadBoundary>
      <Suspense fallback={<p role="status" className="p-6 text-sm text-slate-600 dark:text-slate-300">{t('glossary.loading')}</p>}>
        <GlossaryView {...props} />
      </Suspense>
    </GlossaryLoadBoundary>
  );
}
