import { useDemoNumber } from '../../../hooks/useDemoAutoplay';
import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

const GHOSTS = [[.4, 8], [1, 17], [1.2, 11]] as const;

export function LensFlareDemo() {
  const { t } = useLocale();
  const id = useId();
  const [sourceX, setSourceX] = useDemoNumber(72, 48, 216, 1);
  return <div className="vfx-demo">
    <svg id={`${id}-scene`} className="vfx-scene vfx-flare-scene" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.vfx.flare.scene')}>
      <defs>
        <radialGradient id={`${id}-halo`}>
          <stop offset="0" stopColor="var(--vfx-flare-light)" stopOpacity={.9} />
          <stop offset=".15" stopColor="var(--vfx-flare-light)" stopOpacity={.55} />
          <stop offset="1" stopColor="var(--vfx-flare-light)" stopOpacity={0} />
        </radialGradient>
        <linearGradient id={`${id}-streak`} gradientUnits="userSpaceOnUse" x1={-64} y1={0} x2={64} y2={0}>
          <stop offset="0" stopColor="var(--vfx-flare-light)" stopOpacity={0} />
          <stop offset=".5" stopColor="var(--vfx-flare-light)" />
          <stop offset="1" stopColor="var(--vfx-flare-light)" stopOpacity={0} />
        </linearGradient>
      </defs>
      <g className="vfx-flare-ghosts" aria-hidden="true">
        {GHOSTS.map(([factor, radius], index) => <circle key={index} className="vfx-flare-ghost" cx={132 + (132 - sourceX) * factor} cy={72 + (72 - 44) * factor} r={radius} />)}
      </g>
      <g className="vfx-flare-source" transform={`translate(${sourceX} 44)`} aria-hidden="true">
        <circle r={31} fill={`url(#${id}-halo)`} />
        <path d="M-64 0H64" stroke={`url(#${id}-streak)`} className="vfx-flare-streak" />
        <path d="M-8 0H8M0-8V8" className="vfx-flare-star" />
        <circle r={3.5} className="vfx-flare-core" />
      </g>
    </svg>
    <label className="vfx-range-control">
      <span>{t('demo.additions.vfx.flare.label')}</span>
      <input type="range" min={48} max={216} step={1} value={sourceX} aria-label={t('demo.additions.vfx.flare.input')} aria-valuetext={t('demo.additions.vfx.flare.value', { value: Math.round((sourceX - 48) / 168 * 100) })} aria-controls={`${id}-scene`} onChange={event => setSourceX(Number(event.currentTarget.value))} />
    </label>
  </div>;
}
