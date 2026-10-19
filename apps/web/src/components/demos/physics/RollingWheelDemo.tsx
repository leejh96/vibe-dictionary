import { useDemoPulse } from '../../../hooks/useDemoAutoplay';
import { useLocale } from '../../../i18n/LocaleContext';
import { useId, useLayoutEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';

const DISTANCE = 168;

export function RollingWheelDemo() {
  const { t } = useLocale();
  const [radius, setRadius] = useState(22);
  const [roll, setRoll] = useState(0);
  useDemoPulse(() => setRoll(value => value + 1));
  const travel = useRef<SVGGElement>(null);
  const wheel = useRef<SVGGElement>(null);
  const id = useId();
  const angle = DISTANCE / radius * 180 / Math.PI;

  useLayoutEffect(() => {
    const a = travel.current;
    const b = wheel.current;
    if (!roll || !a || !b || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || typeof a.animate !== 'function' || typeof b.animate !== 'function') return;
    const options: KeyframeAnimationOptions = { duration: 2000, easing: 'linear', fill: 'backwards' };
    const translation = a.animate([{ transform: 'translateX(0px)' }, { transform: `translateX(${DISTANCE}px)` }], options);
    const rotation = b.animate([{ transform: 'rotate(0deg)' }, { transform: `rotate(${angle}deg)` }], options);
    return () => { translation.cancel(); rotation.cancel(); };
  }, [roll, angle]);

  return <div className="physics-demo">
    <div className="pd-scene">
      <svg id={id} className="pd-svg" viewBox="0 0 264 144" preserveAspectRatio="none" role="img" aria-label={t('demo.additions.physics.rollingScene')}>
        <path className="pd-rail" d="M20 112H244" />
        <g ref={travel} className="pd-rolling-travel" style={{ transform: `translateX(${roll ? DISTANCE : 0}px)` }}>
          <g transform={`translate(48 ${112 - radius})`}>
            <g ref={wheel} className="pd-rolling-wheel" style={{ transform: `rotate(${roll ? angle : 0}deg)` }}>
              <circle className="pd-wheel-rim" r={radius - 1} />
              <path d={`M0 ${5 - radius}V${radius - 5}M${5 - radius} 0H${radius - 5}`} />
              <circle r={3} /><circle cy={4 - radius} r={3} />
            </g>
          </g>
        </g>
      </svg>
    </div>
    <div className="pd-action-controls">
      <label className="pd-range-control">{t('demo.additions.physics.radius')}<input className="pd-range" type="range" aria-label={t('demo.additions.physics.wheelRadius')} aria-controls={id} min={16} max={28} step={1} value={radius} onChange={event => { setRadius(Number(event.currentTarget.value)); setRoll(0); }} /></label>
      <button type="button" className="pd-action pd-compact-action" aria-label={t('demo.additions.physics.rollWheel')} aria-controls={id} onClick={() => setRoll(current => current + 1)}><Play size={16} aria-hidden="true" />{t('demo.additions.physics.roll')}</button>
    </div>
  </div>;
}
