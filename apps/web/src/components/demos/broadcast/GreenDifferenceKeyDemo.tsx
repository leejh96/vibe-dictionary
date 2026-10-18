import { useId, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function GreenDifferenceKeyDemo() {
  const { t } = useLocale();
  const id = useId();
  const [strength, setStrength] = useState(3);

  return <div className="broadcast-demo bc-key-demo">
    <svg id={id} className="bc-key-scene" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.broadcast.keyScene')}>
      <defs>
        <filter id={`${id}-key`} filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" x={0} y={0} width={264} height={144} colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values={`1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 ${strength / 2} ${-strength} ${strength / 2} 1 0`} />
        </filter>
      </defs>
      <g aria-hidden="true">
        <g className="bc-key-backdrop">
          <path className="bc-key-sky" d="M0 0h264v144H0z" />
          <circle className="bc-key-moon" cx={211} cy={29} r={15} />
          <path className="bc-key-far-city" d="M0 144V67h25V43h32v47h28V57h38v87zM169 144V55h27V74h22V40h29v51h17v53z" />
          <path className="bc-key-near-city" d="M0 144V99h37v-9h29v54zM195 144V98h24V87h45v57z" />
          <path className="bc-key-windows" d="M36 55h10m-10 12h10m147 5h10m25-20h10m-10 12h10m-10 12h10M12 110h10m207-7h10m-10 12h10" />
        </g>
        <g className="bc-key-source" filter={`url(#${id}-key)`}>
          <path fill="#22c55e" d="M0 0h264v144H0z" />
          <path fill="#6d28d9" d="M84 144V98c0-22 19-36 48-36s48 14 48 36v46z" />
          <path fill="#b6836d" d="M122 53h20v18c-6 8-14 8-20 0z" />
          <ellipse fill="#d2a185" cx={132} cy={42} rx={20} ry={25} />
          <path fill="#35251e" d="M112 43c-5-19 2-32 20-32 19 0 26 16 20 32l-7-17-22 6z" />
        </g>
      </g>
    </svg>
    <label className="bc-key-control">
      <span>{t('demo.additions.broadcast.keyLabel')}</span>
      <input type="range" min={0} max={4} step={0.1} value={strength} aria-label={t('demo.additions.broadcast.keyInput')} aria-valuetext={strength === 0 ? t('demo.additions.broadcast.keyOriginal') : t('demo.additions.broadcast.keyValue', { strength })} aria-controls={id} onChange={event => setStrength(Number(event.currentTarget.value))} />
    </label>
  </div>;
}
