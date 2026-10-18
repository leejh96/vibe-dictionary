import { useId, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function VenetianBlindsDemo() {
  const { t } = useLocale();
  const id = useId();
  const [progress, setProgress] = useState(45);
  return <div className="vfx-demo">
    <svg id={`${id}-scene`} className="vfx-scene" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.vfx.blinds.scene')}>
      <defs>
        <clipPath id={`${id}-blinds`} clipPathUnits="userSpaceOnUse">
          {Array.from({ length: 8 }, (_, index) => <rect key={index} x={0} y={index * 18} width={264} height={18 * (1 - progress / 100)} />)}
        </clipPath>
      </defs>
      <g className="vfx-cold-landscape" aria-hidden="true">
        <rect width={264} height={144} className="vfx-cold-sky" />
        <circle cx={208} cy={32} r={15} className="vfx-moon" />
        <path d="M0 119 69 37 122 98 173 51 264 123V144H0Z" className="vfx-far-mountain" />
        <path d="m48 62 21-25 21 24-20-6Z M157 69l16-18 20 16-19-5Z" className="vfx-snow" />
        <path d="M0 144V116L49 95 98 125 150 90 204 120 264 94V144Z" className="vfx-near-mountain" />
      </g>
      <g className="vfx-warm-landscape" clipPath={`url(#${id}-blinds)`} aria-hidden="true">
        <rect width={264} height={144} className="vfx-warm-sky" />
        <circle cx={72} cy={43} r={23} className="vfx-sun" />
        <path d="M0 93Q53 49 125 91T264 76V144H0Z" className="vfx-far-dune" />
        <path d="M0 116Q63 89 121 119T264 107V144H0Z" className="vfx-near-dune" />
        <path d="M190 115V83m0 16h-9V88m9 19h9V94" className="vfx-cactus" />
      </g>
    </svg>
    <label className="vfx-range-control">
      <span>{t('demo.additions.vfx.blinds.label')}</span>
      <input type="range" min={0} max={100} step={1} value={progress} aria-label={t('demo.additions.vfx.blinds.input')} aria-valuetext={t('demo.additions.vfx.percent', { value: progress })} aria-controls={`${id}-scene`} onChange={event => setProgress(Number(event.currentTarget.value))} />
    </label>
  </div>;
}
