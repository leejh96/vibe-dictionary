import { useDemoNumber } from '../../../hooks/useDemoAutoplay';
import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function PosterizeDemo() {
  const { t } = useLocale();
  const id = useId();
  const [levels, setLevels] = useDemoNumber(4, 2, 8, 1, 'steps');
  const table = Array.from({ length: 2 * (levels - 1) }, (_, index) => Math.round(index / 2) / (levels - 1)).join(' ');
  return <div className="vfx-demo">
    <svg id={`${id}-scene`} className="vfx-scene vfx-posterize-scene" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.vfx.posterize.scene')}>
      <defs>
        <linearGradient id={`${id}-sky`} x2="1" y2="1">
          <stop stopColor="#14364b" /><stop offset="1" stopColor="#67c7bc" />
        </linearGradient>
        <radialGradient id={`${id}-sphere`} cx="32%" cy="26%" r="78%">
          <stop stopColor="#fff1ce" /><stop offset=".35" stopColor="#ffae70" /><stop offset=".7" stopColor="#c84c6e" /><stop offset="1" stopColor="#44306f" />
        </radialGradient>
        <linearGradient id={`${id}-ribbon`} x2="1" y2="0">
          <stop stopColor="#a7b8ed" /><stop offset=".5" stopColor="#7772be" /><stop offset="1" stopColor="#ed8a87" />
        </linearGradient>
        <filter id={`${id}-posterize`} filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" x={0} y={0} width={264} height={144} colorInterpolationFilters="sRGB">
          <feComponentTransfer in="SourceGraphic">
            <feFuncR type="discrete" tableValues={table} />
            <feFuncG type="discrete" tableValues={table} />
            <feFuncB type="discrete" tableValues={table} />
            <feFuncA type="identity" />
          </feComponentTransfer>
        </filter>
      </defs>
      <g className="vfx-posterize-source" filter={`url(#${id}-posterize)`} aria-hidden="true">
        <rect width={264} height={144} fill={`url(#${id}-sky)`} />
        <ellipse cx={158} cy={112} rx={50} ry={6} fill="#14364b" fillOpacity={.35} />
        <circle cx={158} cy={61} r={42} fill={`url(#${id}-sphere)`} />
        <path d="M-12 123C50 82 93 156 151 112S236 74 277 112V154H-12Z" fill={`url(#${id}-ribbon)`} />
      </g>
    </svg>
    <label className="vfx-range-control">
      <span>{t('demo.additions.vfx.posterize.label')}</span>
      <input type="range" min={2} max={8} step={1} value={levels} aria-label={t('demo.additions.vfx.posterize.input')} aria-valuetext={t('demo.additions.vfx.posterize.value', { value: levels })} aria-controls={`${id}-scene`} onChange={event => setLevels(Number(event.currentTarget.value))} />
    </label>
  </div>;
}
