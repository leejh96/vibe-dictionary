import { useId, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function GooeyWordDemo() {
  const { t } = useLocale();
  const [progress, setProgress] = useState(0);
  const id = useId();
  const fraction = progress / 100;

  return <div className="kinetic-demo kt-gooey-demo">
    <svg id={id} className="kt-gooey-scene" viewBox="0 0 264 104" role="img" aria-label={t('demo.additions.kinetic.gooeyScene')}>
      <defs>
        <filter id={`${id}-threshold`} filterUnits="userSpaceOnUse" x={-40} y={-40} width={344} height={184} colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7" />
        </filter>
        {[1 - fraction, fraction].map((amount, index) => <filter key={index} id={`${id}-blur-${index}`} filterUnits="userSpaceOnUse" x={-40} y={-40} width={344} height={184} colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation={amount ? Math.min(8 / amount - 8, 40) : 40} />
        </filter>)}
      </defs>
      <g filter={`url(#${id}-threshold)`} aria-hidden="true">
        {(['demo.additions.kinetic.vibeSample', 'demo.additions.kinetic.waveSample'] as const).map((wordKey, index) => <text key={wordKey} x={132} y={76} textAnchor="middle" filter={`url(#${id}-blur-${index})`} opacity={Math.pow(index ? fraction : 1 - fraction, .4)}>{t(wordKey)}</text>)}
      </g>
    </svg>
    <label className="kt-position-control">{t('demo.additions.kinetic.morphLabel')}<input type="range" min={0} max={100} step={1} value={progress} aria-label={t('demo.additions.kinetic.morphProgress')} aria-valuetext={t('demo.additions.kinetic.percent', { value: progress })} aria-controls={id} onChange={event => setProgress(Number(event.currentTarget.value))} /></label>
  </div>;
}
