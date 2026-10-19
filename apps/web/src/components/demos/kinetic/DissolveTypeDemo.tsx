import { useDemoNumber } from '../../../hooks/useDemoAutoplay';
import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function DissolveTypeDemo() {
  const { t } = useLocale();
  const [progress, setProgress] = useDemoNumber(50, 0, 100, 1);
  const id = useId();
  const filterId = `${id}-dissolve`;

  return <div className="kinetic-demo kt-dissolve-demo">
    <svg id={id} className="kt-dissolve-scene" viewBox="0 0 264 104" role="img" aria-label={t('demo.additions.kinetic.dissolveScene')}>
      <defs>
        <filter id={filterId} filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" x={0} y={0} width={264} height={104} colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency=".09 .13" numOctaves={2} seed={7} result="noise" />
          <feColorMatrix in="noise" type="matrix" values={`0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 24 0 0 0 ${1 - 26 * progress / 100}`} result="cutout" />
          <feComposite in="SourceGraphic" in2="cutout" operator="in" />
        </filter>
      </defs>
      <g aria-hidden="true" filter={`url(#${filterId})`}><text x={132} y={75.5} textAnchor="middle">{t('demo.additions.kinetic.dustSample')}</text></g>
    </svg>
    <label className="kt-position-control">{t('demo.additions.kinetic.dissolveLabel')}<input type="range" min={0} max={100} step={1} value={progress} aria-label={t('demo.additions.kinetic.dissolveProgress')} aria-valuetext={t('demo.additions.kinetic.percent', { value: progress })} aria-controls={id} onChange={event => setProgress(Number(event.currentTarget.value))} /></label>
  </div>;
}
