import { useId, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function HighlightBloomDemo() {
  const { t } = useLocale();
  const id = useId();
  const [strength, setStrength] = useState(65);
  return <div className="vfx-demo">
    <svg id={`${id}-scene`} className="vfx-scene vfx-bloom-scene" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.vfx.bloom.scene')}>
      <defs>
        <filter id={`${id}-bloom`} filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" x={0} y={0} width={264} height={144} colorInterpolationFilters="sRGB">
          <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  .5315 1.788 .1805 1 -2.5" result="highlights" />
          <feGaussianBlur in="highlights" stdDeviation={strength * .06} result="bloom" />
          <feComposite in="SourceGraphic" in2="bloom" operator="arithmetic" k1={0} k2={1} k3={strength * .02} k4={0} />
        </filter>
      </defs>
      <g className="vfx-bloom-source" filter={`url(#${id}-bloom)`} fill="none" strokeLinejoin="round" aria-hidden="true">
        <g className="vfx-bloom-dim" stroke="#315a70" strokeWidth={3}>
          <circle cx={52} cy={72} r={17} />
          <rect x={195} y={55} width={34} height={34} rx={4} />
        </g>
        <g className="vfx-bloom-bright" stroke="#cffafe" strokeWidth={6}>
          <path d="m132 29 36 21v44l-36 21-36-21V50Z" />
          <circle cx={132} cy={72} r={10} />
        </g>
      </g>
    </svg>
    <label className="vfx-range-control">
      <span>{t('demo.additions.vfx.bloom.label')}</span>
      <input type="range" min={0} max={100} step={1} value={strength} aria-label={t('demo.additions.vfx.bloom.input')} aria-valuetext={t('demo.additions.vfx.percent', { value: strength })} aria-controls={`${id}-scene`} onChange={event => setStrength(Number(event.currentTarget.value))} />
    </label>
  </div>;
}
