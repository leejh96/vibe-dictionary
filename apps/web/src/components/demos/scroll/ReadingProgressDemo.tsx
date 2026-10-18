import { useLocale } from '../../../i18n/LocaleContext';
import { useState } from 'react';

const SECTIONS = [
  ['demo.additions.scroll.purpose', 'demo.additions.scroll.readerFirst'],
  ['demo.additions.scroll.structure', 'demo.additions.scroll.oneTopic'],
  ['demo.additions.scroll.sentences', 'demo.additions.scroll.writeConcrete'],
  ['demo.additions.scroll.order', 'demo.additions.scroll.actionsFirst'],
  ['demo.additions.scroll.exceptions', 'demo.additions.scroll.keepConditions'],
  ['demo.additions.scroll.reviewHeading', 'demo.additions.scroll.reread'],
] as const;

export function ReadingProgressDemo() {
  const { t } = useLocale();
  const [position, setPosition] = useState(0);

  return <div className="scroll-demo"><div className="sc-reading-frame">
    <progress className="sc-reading-progress" aria-label={t('demo.additions.scroll.documentPosition')} max={100} value={position} />
    <div className="sc-reading-viewport" role="region" aria-label={t('demo.additions.scroll.editingPrinciples')} tabIndex={0} onScroll={event => {
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
      const range = scrollHeight - clientHeight;
      setPosition(range > 0 ? Math.round(Math.min(1, Math.max(0, scrollTop / range)) * 100) : 0);
    }}>
      <article>{SECTIONS.map(([title, content]) => <section className="sc-reading-section" key={title}>
        <h3>{t(title)}</h3><p>{t(content)}</p>
      </section>)}</article>
    </div>
  </div></div>;
}
