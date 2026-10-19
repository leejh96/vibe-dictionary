import { useDemoNumber } from '../../../hooks/useDemoAutoplay';
import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function DirectionalBlurDemo() {
  const { t } = useLocale();
  const id = useId();
  const [strength, setStrength] = useDemoNumber(50, 0, 100, 1);
  return <div className="vfx-demo">
    <svg id={`${id}-scene`} className="vfx-scene vfx-directional-scene" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.vfx.directional.scene')}>
      <defs>
        <filter id={`${id}-directional`} filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" x={0} y={0} width={264} height={144} colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation={`${strength * .12} 0`} />
        </filter>
      </defs>
      <g className="vfx-directional-source" filter={`url(#${id}-directional)`} aria-hidden="true">
        <rect x={72} y={42} width={14} height={60} rx={7} fill="#7dd3fc" />
        <circle cx={132} cy={72} r={21} fill="none" stroke="#fb923c" strokeWidth={16} />
        <rect x={178} y={52} width={14} height={40} rx={7} fill="#c4b5fd" />
      </g>
    </svg>
    <label className="vfx-range-control">
      <span>{t('demo.additions.vfx.directional.label')}</span>
      <input type="range" min={0} max={100} step={1} value={strength} aria-label={t('demo.additions.vfx.directional.input')} aria-valuetext={t('demo.additions.vfx.percent', { value: strength })} aria-controls={`${id}-scene`} onChange={event => setStrength(Number(event.currentTarget.value))} />
    </label>
  </div>;
}
