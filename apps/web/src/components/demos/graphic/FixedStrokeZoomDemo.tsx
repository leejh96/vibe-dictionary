import { useId, useState } from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

export function FixedStrokeZoomDemo() {
  const { t } = useLocale();
  const [zoomed, setZoomed] = useState(false);
  const id = useId();
  const Icon = zoomed ? ZoomOut : ZoomIn;
  return <div className="graphic-demo gd-zoom-demo">
    <svg id={id} className="gd-zoom-canvas" viewBox="0 0 240 112" role="img" aria-label={t(zoomed ? 'demo.additions.graphic.zoomDoubleImage' : 'demo.additions.graphic.zoomNormalImage')}>
      <g transform={`translate(120 56) scale(${zoomed ? 2 : 1}) translate(-120 -56)`}>
        <path className="gd-zoom-face" d="M120 36 140 46 120 56 100 46Z" />
        <path className="gd-zoom-lines" vectorEffect="non-scaling-stroke" d="M120 36 140 46V66L120 76 100 66V46Z M100 46 120 56 140 46 M120 56V76" />
      </g>
    </svg>
    <button type="button" className="gd-zoom-button" aria-controls={id} onClick={() => setZoomed(value => !value)}>
      <Icon size={18} aria-hidden="true" />{t(zoomed ? 'demo.additions.graphic.originalSize' : 'demo.additions.graphic.zoomIn')}
    </button>
  </div>;
}
