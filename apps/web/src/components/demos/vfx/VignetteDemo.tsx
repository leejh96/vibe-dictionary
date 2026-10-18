import { useId, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function VignetteDemo() {
  const { t } = useLocale();
  const id = useId();
  const [strength, setStrength] = useState(60);
  return <div className="vfx-demo">
    <svg id={`${id}-scene`} className="vfx-scene vfx-vignette-scene" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.vfx.vignette.scene')}>
      <defs>
        <radialGradient id={`${id}-falloff`} gradientUnits="objectBoundingBox" cx={.5} cy={.5} r={Math.SQRT1_2}>
          <stop offset={0} stopColor="#000" stopOpacity={0} />
          <stop offset={.4} stopColor="#000" stopOpacity={0} />
          <stop offset={1} stopColor="#000" stopOpacity={.9} />
        </radialGradient>
      </defs>
      <g className="vfx-vignette-source" aria-hidden="true">
        <rect width={264} height={144} fill="#d9e6df" />
        <circle cx={210} cy={32} r={16} fill="#f4c78b" />
        <path d="M0 78Q48 56 97 78T195 75T284 73V144H0Z" fill="#82afaa" />
        <path d="M0 88Q68 83 132 89T264 88V144H0Z" fill="#4e9297" />
        <path d="M74 130Q92 111 114 109H151Q177 115 194 130Z" fill="#315e55" />
        <g className="vfx-vignette-lighthouse">
          <rect x={119} y={56} width={26} height={56} fill="#f8edcf" />
          <path d="M119 70h26v11h-26Zm0 24h26v11h-26Z" fill="#b35247" />
          <rect x={129} y={100} width={7} height={12} rx={2} fill="#31545d" />
          <rect x={120} y={46} width={24} height={11} fill="#f5b765" stroke="#31545d" strokeWidth={2} />
          <circle cx={132} cy={51} r={3} fill="#fff0b0" />
          <path d="m115 46 17-13 17 13Z" fill="#b35247" />
        </g>
        <path d="M20 103h22m148-7h38M45 126h20m140-3h29" fill="none" stroke="#dcece3" strokeWidth={2} opacity={.55} strokeLinecap="round" />
      </g>
      <rect className="vfx-vignette-falloff" width={264} height={144} fill={`url(#${id}-falloff)`} opacity={strength / 100} aria-hidden="true" />
    </svg>
    <label className="vfx-range-control">
      <span>{t('demo.additions.vfx.vignette.label')}</span>
      <input type="range" min={0} max={100} step={1} value={strength} aria-label={t('demo.additions.vfx.vignette.input')} aria-valuetext={t('demo.additions.vfx.percent', { value: strength })} aria-controls={`${id}-scene`} onChange={event => setStrength(Number(event.currentTarget.value))} />
    </label>
  </div>;
}
