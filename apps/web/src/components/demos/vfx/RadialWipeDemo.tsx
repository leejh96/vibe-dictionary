import { useId, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function RadialWipeDemo() {
  const { t } = useLocale();
  const id = useId();
  const [progress, setProgress] = useState(35);
  const angle = progress / 100 * Math.PI * 2;
  const edgeX = (132 + Math.sin(angle) * 300).toFixed(3);
  const edgeY = (72 - Math.cos(angle) * 300).toFixed(3);
  const remaining = progress === 0 ? 'M0 0H264V144H0Z' : progress === 100 ? ''
    : `M132 72L${edgeX} ${edgeY}A300 300 0 ${progress < 50 ? 1 : 0} 1 132 -228Z`;

  return <div className="vfx-demo">
    <svg id={`${id}-scene`} className="vfx-scene" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.vfx.radial.scene')}>
      <defs>
        <clipPath id={`${id}-wipe`} clipPathUnits="userSpaceOnUse"><path d={remaining} /></clipPath>
        <path id={`${id}-skyline`} d="M0 144V91H22V65H52V105H76V47H108V83H135V69H159V104H185V58H219V89H244V75H264V144Z" />
        <path id={`${id}-windows`} d="M32 78h9m-9 13h9m44-30h14m-14 14h14m-14 14h14m44-7h9m-9 13h9m47-23h14m-14 14h14m-14 14h14m40-10h9" />
      </defs>
      <g className="vfx-city-night" aria-hidden="true">
        <rect width={264} height={144} className="vfx-city-sky" />
        <circle cx={48} cy={30} r={14} className="vfx-city-moon" />
        <path d="M110 20h3m48 13h3m58-13h3m-85 18h3" className="vfx-city-stars" />
        <use href={`#${id}-skyline`} className="vfx-city-buildings" />
        <use href={`#${id}-windows`} className="vfx-city-windows" />
      </g>
      <g className="vfx-city-day" clipPath={`url(#${id}-wipe)`} aria-hidden="true">
        <rect width={264} height={144} className="vfx-city-sky" />
        <circle cx={192} cy={31} r={20} className="vfx-city-sun" />
        <use href={`#${id}-skyline`} className="vfx-city-buildings" />
        <use href={`#${id}-windows`} className="vfx-city-windows" />
      </g>
    </svg>
    <label className="vfx-range-control">
      <span>{t('demo.additions.vfx.radial.label')}</span>
      <input type="range" min={0} max={100} step={1} value={progress} aria-label={t('demo.additions.vfx.radial.input')} aria-valuetext={t('demo.additions.vfx.percent', { value: progress })} aria-controls={`${id}-scene`} onChange={event => setProgress(Number(event.currentTarget.value))} />
    </label>
  </div>;
}
