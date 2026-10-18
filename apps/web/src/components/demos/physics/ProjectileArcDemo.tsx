import { useLocale } from '../../../i18n/LocaleContext';
import { useId, useLayoutEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';

const SPEED = 300;
const GRAVITY = 500;

export function ProjectileArcDemo() {
  const { t } = useLocale();
  const [angle, setAngle] = useState(45);
  const [shot, setShot] = useState(0);
  const ball = useRef<SVGGElement>(null);
  const id = useId();
  const radians = angle * Math.PI / 180;
  const vx = SPEED * Math.cos(radians);
  const vy = SPEED * Math.sin(radians);
  const flightTime = 2 * vy / GRAVITY;
  const range = vx * flightTime;

  useLayoutEffect(() => {
    const node = ball.current;
    if (!shot || !node || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || typeof node.animate !== 'function') return;
    const frames = Array.from({ length: 41 }, (_, index) => {
      const time = flightTime * index / 40;
      const y = index === 40 ? 0 : -vy * time + GRAVITY * time * time / 2;
      return { offset: index / 40, transform: `translate(${vx * time}px, ${y}px)` };
    });
    const animation = node.animate(frames, { duration: flightTime * 1000, easing: 'linear', fill: 'backwards' });
    return () => animation.cancel();
  }, [shot, vx, vy, flightTime]);

  return <div className="physics-demo">
    <div className="pd-scene">
      <svg id={id} className="pd-svg" viewBox="0 0 264 144" preserveAspectRatio="none" role="img" aria-label={t('demo.additions.physics.projectileScene')}>
        <path className="pd-rail" d="M20 114H244" />
        <path className="pd-flight-path" d={`M32 108Q${32 + range / 2} ${108 - vy * flightTime / 2} ${32 + range} 108`} />
        <circle className="pd-landing" cx={32 + range} cy={108} r={3} />
        <g ref={ball} className="pd-projectile" style={{ transform: `translate(${shot ? range : 0}px, 0px)` }}><circle cx={32} cy={108} r={6} /><circle cx={30} cy={106} r={1.5} /></g>
      </svg>
    </div>
    <div className="pd-action-controls">
      <label className="pd-range-control">{t('demo.additions.physics.angle')}<input className="pd-range" type="range" aria-label={t('demo.additions.physics.launchAngle')} aria-valuetext={t('demo.additions.physics.degrees', { value: angle })} aria-controls={id} min={25} max={65} step={1} value={angle} onChange={event => { setAngle(Number(event.currentTarget.value)); setShot(0); }} /></label>
      <button type="button" className="pd-action pd-compact-action" aria-label={t('demo.additions.physics.launchProjectile')} aria-controls={id} onClick={() => setShot(current => current + 1)}><Play size={16} aria-hidden="true" />{t('demo.additions.physics.launch')}</button>
    </div>
  </div>;
}
