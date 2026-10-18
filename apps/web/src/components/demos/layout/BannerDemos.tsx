import { Sparkles } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

export function FoldedRibbonDemo() {
  const { t } = useLocale();
  return <div className="layout-demo"><div className="ld-ribbon-card">
    <span className="ld-edge-ribbon"><span>{t('demo.additions.layout.news')}</span></span>
    <Sparkles size={24} aria-hidden="true" /><strong>{t('demo.additions.layout.collection')}</strong>
  </div></div>;
}

export function StickyAnnouncementDemo() {
  const { t } = useLocale();
  return <div className="layout-demo"><div className="ld-announcement-frame">
    <div className="ld-announcement-scroll" role="region" aria-label={t('demo.additions.layout.programList')} tabIndex={0}>
      <div className="ld-sticky-announcement"><Sparkles size={16} aria-hidden="true" /><strong>{t('demo.additions.layout.weekPicks')}</strong></div>
      <ul className="ld-program-list">{(['demo.additions.layout.lightExhibition', 'demo.additions.layout.summerPerformance', 'demo.additions.layout.weekendWorkshop', 'demo.additions.layout.spaceWalk', 'demo.additions.layout.smallConcert'] as const).map(name => <li key={name}>{t(name)}</li>)}</ul>
    </div>
  </div></div>;
}
