import { useDemoNumber } from '../../../hooks/useDemoAutoplay';
import { useLocale } from '../../../i18n/LocaleContext';
import { useId } from 'react';

export function PulleyConstraintDemo() {
  const { t } = useLocale();
  const [offset, setOffset] = useDemoNumber(0, -24, 24);
  const id = useId();
  const left = 92 - offset;
  const right = 92 + offset;

  return <div className="physics-demo">
    <div className="pd-scene">
      <svg id={id} className="pd-svg" viewBox="0 0 264 144" preserveAspectRatio="none" role="img" aria-label={t('demo.additions.physics.pulleyScene')}>
        <path className="pd-rail" d="M120 4H144M132 4V32" />
        <g transform="translate(132 32)">
          <g className="pd-pulley-wheel" style={{ transform: `rotate(${offset / 24 * 180 / Math.PI}deg)` }}>
            <circle className="pd-wheel-rim" r={22} />
            <path d="M0 -16V16M-16 0H16" />
            <circle r={3} fill="currentColor" /><circle cy={-16} r={2.5} fill="currentColor" />
          </g>
        </g>
        <path className="pd-pulley-rope" d={`M108 ${left}V32A24 24 0 0 1 156 32V${right}`} />
        <g className="pd-pulley-loads"><rect x={96} y={left} width={24} height={16} rx={4} /><rect x={144} y={right} width={24} height={16} rx={4} fillOpacity={.55} /></g>
      </svg>
    </div>
    <label className="pd-range-control pd-standalone-control">{t('demo.additions.physics.position')}<input className="pd-range" type="range" aria-label={t('demo.additions.physics.pulleyPosition')} aria-controls={id} min={-24} max={24} step={1} value={offset} onChange={event => setOffset(Number(event.currentTarget.value))} /></label>
  </div>;
}
