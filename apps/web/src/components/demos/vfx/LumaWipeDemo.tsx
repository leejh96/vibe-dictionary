import { useId, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function LumaWipeDemo() {
  const { t } = useLocale();
  const id = useId();
  const [progress, setProgress] = useState(50);
  return <div className="vfx-demo">
    <svg id={`${id}-scene`} className="vfx-scene" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.vfx.luma.scene')}>
      <defs>
        <linearGradient id={`${id}-ramp`} gradientUnits="userSpaceOnUse" x1={0} y1={0} x2={264} y2={144}>
          <stop offset="0" stopColor="#000" /><stop offset="1" stopColor="#fff" />
        </linearGradient>
        <linearGradient id={`${id}-reverse`} gradientUnits="userSpaceOnUse" x1={0} y1={0} x2={264} y2={144}>
          <stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#000" />
        </linearGradient>
        <filter id={`${id}-threshold`} filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" x={0} y={0} width={264} height={144} colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values={`0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  24 0 0 0 ${1 - progress / 100 * 26}`} />
        </filter>
        <mask id={`${id}-luma`} maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" x={0} y={0} width={264} height={144} style={{ maskType: 'alpha' }}>
          <g filter={`url(#${id}-threshold)`}>
            <rect width={264} height={144} fill={`url(#${id}-ramp)`} />
            <path d="M-12 100C58 28 144 130 276 22V66C151 174 70 72-12 144Z" fill={`url(#${id}-reverse)`} />
          </g>
        </mask>
      </defs>
      <g className="vfx-luma-coast" aria-hidden="true">
        <rect width={264} height={144} className="vfx-block-cool-sky" />
        <circle cx={199} cy={34} r={19} className="vfx-luma-sun" />
        <path d="M0 83Q52 57 104 84T208 84T312 84V144H0Z" className="vfx-luma-far-water" />
        <path d="M0 115Q58 78 116 112T232 111T312 112V144H0Z" className="vfx-luma-near-water" />
        <path d="M23 101q20-8 37-3m102 29q17 5 36-2" className="vfx-luma-foam" />
      </g>
      <g className="vfx-luma-arch" mask={`url(#${id}-luma)`} aria-hidden="true">
        <rect width={264} height={144} className="vfx-warm-sky" />
        <path d="M78 144V62a54 54 0 0 1 108 0v82Z" className="vfx-luma-outer-arch" />
        <path d="M106 144V64a26 26 0 0 1 52 0v80Z" className="vfx-luma-inner-arch" />
        <circle cx={40} cy={35} r={12} className="vfx-luma-small-disc" />
        <path d="M206 98h33m-25 13h25m-17 13h17" className="vfx-luma-lines" />
      </g>
    </svg>
    <label className="vfx-range-control">
      <span>{t('demo.additions.vfx.luma.label')}</span>
      <input type="range" min={0} max={100} step={1} value={progress} aria-label={t('demo.additions.vfx.luma.input')} aria-valuetext={t('demo.additions.vfx.percent', { value: progress })} aria-controls={`${id}-scene`} onChange={event => setProgress(Number(event.currentTarget.value))} />
    </label>
  </div>;
}
