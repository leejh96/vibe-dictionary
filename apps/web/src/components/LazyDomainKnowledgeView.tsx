import { Component, lazy, Suspense, type ReactNode } from 'react';
import { useLocale } from '../i18n/LocaleContext';
import type { DomainKnowledgeViewProps } from './knowledge/types';

const KnowledgeView = lazy(() => import('./DomainKnowledgeView').then(module => ({ default: module.DomainKnowledgeView })));

export class KnowledgeLoadBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() { return { failed: true }; }

  render() { return this.state.failed ? <KnowledgeLoadError /> : this.props.children; }
}

function KnowledgeLoadError() {
  const { t } = useLocale();
  return <div role="alert" className="space-y-3 rounded-2xl bg-white p-6 dark:bg-slate-900">
      <p>{t('knowledge.loadError')}</p>
      <button type="button" className="cursor-pointer rounded-lg border px-3 py-2 text-sm font-bold" onClick={() => window.location.reload()}>{t('card.reloadPage')}</button>
    </div>;
}

export function LazyDomainKnowledgeView(props: DomainKnowledgeViewProps) {
  const { t } = useLocale();
  return <KnowledgeLoadBoundary>
    <Suspense fallback={<p role="status" className="p-6 text-sm">{t('knowledge.loading')}</p>}>
      <KnowledgeView {...props} />
    </Suspense>
  </KnowledgeLoadBoundary>;
}
