import { useId, useState } from 'react';
import { Eye, FileText, RotateCcw } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

export function SkeletonContentDemo() {
  const { t } = useLocale();
  const [ready, setReady] = useState(false);
  const id = useId();
  const Icon = ready ? RotateCcw : Eye;
  return <div className="layout-demo ld-loader-demo"><div className="ld-skeleton-frame">
    <div className="ld-ready-card" id={id} role="group" aria-label={t('demo.additions.layout.notePreview')} aria-busy={!ready} data-ready={ready}>
      <div className="ld-skeleton-layer" aria-hidden="true"><span className="ld-skeleton-avatar" /><span className="ld-skeleton-lines"><span /><span /></span></div>
      <div className="ld-ready-content" aria-hidden={!ready}><span className="ld-note-icon"><FileText size={24} aria-hidden="true" /></span><span className="ld-note-copy"><strong>{t('demo.additions.layout.weeklyNotes')}</strong><span>{t('demo.additions.layout.designCollection')}</span></span></div>
    </div>
    <button type="button" className="ld-skeleton-toggle" aria-controls={id} aria-label={t(ready ? 'demo.additions.layout.showLoading' : 'demo.additions.layout.showContent')} onClick={() => setReady(value => !value)}><Icon size={18} aria-hidden="true" /></button>
  </div></div>;
}
