import { useLocale } from '../../../i18n/LocaleContext';
import { useId } from 'react';

const PANES = [
  { name: 'demo.additions.scroll.drafts', items: ['demo.additions.scroll.coverFile', 'demo.additions.scroll.bodyFile', 'demo.additions.scroll.contentsFile', 'demo.additions.scroll.appendixFile', 'demo.additions.scroll.indexFile', 'demo.additions.scroll.backFile'] },
  { name: 'demo.additions.scroll.feedback', items: ['demo.additions.scroll.titleSpacing', 'demo.additions.scroll.contrast', 'demo.additions.scroll.iconSize', 'demo.additions.scroll.mobilePadding', 'demo.additions.scroll.lineHeight', 'demo.additions.scroll.imageRatio'] },
] as const;

export function IndependentScrollPanesDemo() {
  const { t } = useLocale();
  const id = useId();

  return <div className="scroll-demo"><div className="sc-dual-frame">
    {PANES.map((pane, index) => <div className="sc-dual-pane" key={pane.name}>
      <h3 className="sc-dual-heading" id={`${id}-pane-${index}`}>{t(pane.name)}</h3>
      <div className="sc-pane-viewport" role="region" aria-labelledby={`${id}-pane-${index}`} tabIndex={0}>
        <ul className="sc-pane-list">{pane.items.map(item => <li key={item}>{t(item)}</li>)}</ul>
      </div>
    </div>)}
  </div></div>;
}
