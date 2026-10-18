import { useId, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function IntersectionClipDemo() {
  const { t } = useLocale();
  const [overlap, setOverlap] = useState(50);
  const id = useId();
  const cx = 168 - overlap * .48;
  return <div className="graphic-demo gd-intersection-demo">
    <svg className="gd-intersection-canvas" viewBox="0 0 240 112" role="img" aria-label={t('demo.additions.graphic.intersectionImage')}>
      <defs><clipPath id={id} clipPathUnits="userSpaceOnUse"><circle cx={cx} cy={56} r={36} /></clipPath></defs>
      <circle className="gd-intersection-fill" cx={96} cy={56} r={36} clipPath={`url(#${id})`} />
      <g className="gd-intersection-outlines"><circle cx={96} cy={56} r={36} /><circle cx={cx} cy={56} r={36} /></g>
    </svg>
    <div className="gd-range-controls"><label>{t('demo.additions.graphic.overlap')}<input className="gd-range" type="range" aria-label={t('demo.additions.graphic.overlapInput')} min={0} max={100} step={1} value={overlap} onChange={event => setOverlap(Number(event.currentTarget.value))} /></label></div>
  </div>;
}
