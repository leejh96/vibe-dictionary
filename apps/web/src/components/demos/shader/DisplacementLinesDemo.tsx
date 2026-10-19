import { useDemoNumber } from '../../../hooks/useDemoAutoplay';
import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function DisplacementLinesDemo() {
  const { t } = useLocale();
  const [strength, setStrength] = useDemoNumber(18, 0, 32, 1);
  const id = useId();
  return <div className="shader-demo sd-displacement-demo">
    <div className="sd-scene">
      <svg id={`${id}-scene`} className="sd-displacement-svg" viewBox="0 0 264 144" preserveAspectRatio="none" role="img" aria-label={t('demo.additions.shader.displacementScene')}>
        <defs>
          <filter id={id} filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" x={-24} y={-24} width={312} height={192}>
            <feTurbulence type="fractalNoise" baseFrequency=".012 .028" numOctaves={2} seed={7} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={strength} xChannelSelector="R" yChannelSelector="G" />
            <feGaussianBlur stdDeviation={.3} />
          </filter>
        </defs>
        <g className="sd-displacement-lines" filter={`url(#${id})`}>
          {Array.from({ length: 12 }, (_, index) => <path key={index} d={`M-24 ${6 + index * 12}H288`} />)}
        </g>
      </svg>
    </div>
    <label className="sd-range-control">{t('demo.additions.shader.strength')}<input className="sd-range" type="range" aria-label={t('demo.additions.shader.displacementStrength')} aria-controls={`${id}-scene`} min={0} max={32} step={1} value={strength} onChange={event => setStrength(Number(event.currentTarget.value))} /></label>
  </div>;
}
