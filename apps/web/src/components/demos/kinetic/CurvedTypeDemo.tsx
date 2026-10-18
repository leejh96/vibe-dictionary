import { useId, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function CurvedTypeDemo() {
  const { t } = useLocale();
  const [bend, setBend] = useState(40);
  const id = useId();

  return <div className="kinetic-demo kt-curve-demo">
    <svg id={id} className="kt-curve-scene" viewBox="0 0 264 104" role="img" aria-label={t('demo.additions.kinetic.curvedScene')}>
      <g aria-hidden="true">
        <path id={`${id}-path`} className="kt-curve-guide" d={`M18 62 Q132 ${62 - bend} 246 62`} />
        <text textAnchor="middle"><textPath href={`#${id}-path`} startOffset="50%">{t('demo.additions.kinetic.curvedSample')}</textPath></text>
      </g>
    </svg>
    <label className="kt-position-control">{t('demo.additions.kinetic.curveLabel')}<input type="range" min={-60} max={60} step={1} value={bend} aria-label={t('demo.additions.kinetic.baselineCurvature')} aria-valuetext={bend === 0 ? t('demo.additions.kinetic.straight') : t(bend > 0 ? 'demo.additions.kinetic.bendUp' : 'demo.additions.kinetic.bendDown', { value: Math.abs(bend) })} aria-controls={id} onChange={event => setBend(Number(event.currentTarget.value))} /></label>
  </div>;
}
