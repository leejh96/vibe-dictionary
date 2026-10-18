import { useId, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';
import { FileText, Image, Music2 } from 'lucide-react';

export function IntrinsicGridDemo() {
  const { t } = useLocale();
  const [width, setWidth] = useState(100);
  const id = useId();

  return <div className="grid-demo gr-intrinsic-demo">
    <div className="gr-intrinsic-scene">
      <ul id={id} className="gr-intrinsic-grid" aria-label={t('demo.additions.grid.autoFitContent')} style={{ width: `${width}%` }}>
        <li aria-label={t('demo.additions.grid.photos')}><Image size={22} aria-hidden="true" /></li>
        <li aria-label={t('demo.additions.grid.music')}><Music2 size={22} aria-hidden="true" /></li>
        <li aria-label={t('demo.additions.grid.documents')}><FileText size={22} aria-hidden="true" /></li>
      </ul>
    </div>
    <label className="gr-width-control">{t('demo.additions.grid.width')}<input type="range" min={45} max={100} step={1} value={width} aria-label={t('demo.additions.grid.gridContainerWidth')} aria-valuetext={t('demo.additions.grid.percentValue', { value: width })} aria-controls={id} onChange={event => setWidth(Number(event.currentTarget.value))} /></label>
  </div>;
}
