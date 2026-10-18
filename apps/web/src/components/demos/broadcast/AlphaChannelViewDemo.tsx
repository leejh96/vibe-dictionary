import { useId, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function AlphaChannelViewDemo() {
  const { t } = useLocale();
  const id = useId();
  const [alphaView, setAlphaView] = useState(false);

  return <div className="broadcast-demo bc-alpha-demo">
    <svg id={id} className="bc-alpha-scene" viewBox="0 0 264 144" role="img" aria-label={t(alphaView ? 'demo.additions.broadcast.alphaScene' : 'demo.additions.broadcast.alphaColorScene')}>
      <defs>
        <pattern id={`${id}-grid`} width={16} height={16} patternUnits="userSpaceOnUse">
          <rect className="bc-alpha-grid-base" width={16} height={16} />
          <path className="bc-alpha-grid-check" d="M0 0h8v8H0zm8 8h8v8H8z" />
        </pattern>
        <linearGradient id={`${id}-fade`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f7c66b" stopOpacity={1} />
          <stop offset="100%" stopColor="#f7c66b" stopOpacity={0} />
        </linearGradient>
        <filter id={`${id}-alpha`} filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" x={0} y={0} width={264} height={144} colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 1" />
        </filter>
      </defs>
      <g aria-hidden="true">
        <path className="bc-alpha-backdrop" fill={`url(#${id}-grid)`} d="M0 0h264v144H0z" />
        <g className="bc-alpha-source" filter={alphaView ? `url(#${id}-alpha)` : undefined}>
          <circle cx={78} cy={72} r={32} fill="none" stroke="#f17d62" strokeWidth={22} />
          <rect x={96} y={62} width={72} height={48} rx={12} fill="#6476d9" opacity={0.5} />
          <rect x={143} y={39} width={88} height={66} rx={33} fill={`url(#${id}-fade)`} />
        </g>
      </g>
    </svg>
    <div className="bc-alpha-controls" role="group" aria-label={t('demo.additions.broadcast.alphaGroup')}>
      {[false, true].map(alpha => <button type="button" key={String(alpha)} aria-label={t(alpha ? 'demo.additions.broadcast.alphaView' : 'demo.additions.broadcast.alphaColorView')} aria-pressed={alphaView === alpha} aria-controls={id} onClick={() => setAlphaView(alpha)}>{t(alpha ? 'demo.additions.broadcast.alphaLabel' : 'demo.additions.broadcast.alphaColorLabel')}</button>)}
    </div>
  </div>;
}
