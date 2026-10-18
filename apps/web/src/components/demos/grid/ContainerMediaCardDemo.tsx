import { useId, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function ContainerMediaCardDemo() {
  const { t } = useLocale();
  const [width, setWidth] = useState(100);
  const id = useId();

  return <div className="grid-demo gr-context-demo">
    <div className="gr-context-scene">
      <div id={id} className="gr-context-container" style={{ width: `${width}%` }}>
        <article className="gr-context-card">
          <svg className="gr-context-art" viewBox="0 0 120 72" preserveAspectRatio="xMidYMid slice" role="img" aria-label={t('demo.additions.grid.mountainArt')}>
            <circle cx="87" cy="21" r="9" opacity=".65" />
            <path d="M0 72V47L34 17l41 55Z" opacity=".2" />
            <path d="M20 72 76 30l44 34v8Z" opacity=".4" />
          </svg>
          <div className="gr-context-copy"><h4>{t('demo.additions.grid.forestJournal')}</h4><p>{t('demo.additions.grid.walkPhotographs')}</p></div>
        </article>
      </div>
    </div>
    <label className="gr-width-control">{t('demo.additions.grid.width')}<input type="range" min={55} max={100} step={1} value={width} aria-label={t('demo.additions.grid.cardContainerWidth')} aria-valuetext={t('demo.additions.grid.percentValue', { value: width })} aria-controls={id} onChange={event => setWidth(Number(event.currentTarget.value))} /></label>
  </div>;
}
