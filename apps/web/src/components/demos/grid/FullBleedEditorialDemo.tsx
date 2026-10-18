import { useId, useState, type CSSProperties } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function FullBleedEditorialDemo() {
  const { t } = useLocale();
  const [width, setWidth] = useState(70);
  const id = useId();

  return <div className="grid-demo gr-bleed-demo">
    <div className="gr-bleed-scene">
      <article id={id} className="gr-bleed-grid" aria-label={t('demo.additions.grid.alleyArticle')} style={{ '--gr-reading-width': `${width}%` } as CSSProperties}>
        <h4>{t('demo.additions.grid.alleyTitle')}</h4>
        <svg className="gr-bleed-art" viewBox="0 0 264 64" preserveAspectRatio="xMidYMid slice" role="img" aria-label={t('demo.additions.grid.alleyArt')}>
          <circle cx="214" cy="17" r="9" opacity=".3" />
          <path d="M0 64V36l28-18 28 18v28ZM72 64V26l28-16 28 16v38ZM144 64V34l26-18 26 18v30ZM220 64V42l22-16 22 16v22Z" opacity=".35" />
          <path d="M22 46h12v18H22ZM94 36h12v28H94ZM164 44h12v20H164ZM237 49h10v15h-10Z" opacity=".25" />
        </svg>
        <p>{t('demo.additions.grid.alleyBody')}</p>
      </article>
    </div>
    <label className="gr-width-control">{t('demo.additions.grid.textWidthLabel')}<input type="range" min={50} max={85} step={1} value={width} aria-label={t('demo.additions.grid.articleTextWidth')} aria-valuetext={t('demo.additions.grid.percentValue', { value: width })} aria-controls={id} onChange={event => setWidth(Number(event.currentTarget.value))} /></label>
  </div>;
}
