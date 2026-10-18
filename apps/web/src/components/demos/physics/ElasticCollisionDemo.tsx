import { useLocale } from '../../../i18n/LocaleContext';
import { useId, useLayoutEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';

const SPEED = 120;
const AFTER_TIME = .4;

export function ElasticCollisionDemo() {
  const { t } = useLocale();
  const [massRatio, setMassRatio] = useState(100);
  const [collision, setCollision] = useState(0);
  const first = useRef<SVGGElement>(null);
  const second = useRef<SVGGElement>(null);
  const id = useId();
  const ratio = massRatio / 100;
  const targetWidth = 24 * ratio;
  const approach = 156 - targetWidth / 2 - 12 - 40;
  const approachTime = approach / SPEED;
  const duration = approachTime + AFTER_TIME;
  const firstEnd = approach + SPEED * (1 - ratio) / (1 + ratio) * AFTER_TIME;
  const secondEnd = 2 * SPEED / (1 + ratio) * AFTER_TIME;

  useLayoutEffect(() => {
    const a = first.current;
    const b = second.current;
    if (!collision || !a || !b || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || typeof a.animate !== 'function' || typeof b.animate !== 'function') return;
    const impact = approachTime / duration;
    const options: KeyframeAnimationOptions = { duration: duration * 1000, easing: 'linear', fill: 'backwards' };
    const firstAnimation = a.animate([{ offset: 0, transform: 'translateX(0px)' }, { offset: impact, transform: `translateX(${approach}px)` }, { offset: 1, transform: `translateX(${firstEnd}px)` }], options);
    const secondAnimation = b.animate([{ offset: 0, transform: 'translateX(0px)' }, { offset: impact, transform: 'translateX(0px)' }, { offset: 1, transform: `translateX(${secondEnd}px)` }], options);
    return () => { firstAnimation.cancel(); secondAnimation.cancel(); };
  }, [collision, approach, approachTime, duration, firstEnd, secondEnd]);

  return <div className="physics-demo">
    <div className="pd-scene">
      <svg id={id} className="pd-svg" viewBox="0 0 264 144" preserveAspectRatio="none" role="img" aria-label={t('demo.additions.physics.collisionScene')}>
        <path className="pd-rail" d="M24 100H244" />
        <g ref={first} className="pd-collision-first" style={{ transform: `translateX(${collision ? firstEnd : 0}px)` }}><rect x={28} y={76} width={24} height={24} rx={6} /><path d="M36 84H44M36 92H44" /></g>
        <g ref={second} className="pd-collision-target" style={{ transform: `translateX(${collision ? secondEnd : 0}px)` }}><rect x={156 - targetWidth / 2} y={76} width={targetWidth} height={24} rx={6} /><circle cx={156} cy={88} r={3} fill="currentColor" /></g>
      </svg>
    </div>
    <div className="pd-action-controls">
      <label className="pd-range-control">{t('demo.additions.physics.mass')}<input className="pd-range" type="range" aria-label={t('demo.additions.physics.massRatio')} aria-valuetext={t('demo.additions.physics.times', { value: ratio })} aria-controls={id} min={50} max={300} step={25} value={massRatio} onChange={event => { setMassRatio(Number(event.currentTarget.value)); setCollision(0); }} /></label>
      <button type="button" className="pd-action pd-compact-action" aria-label={t('demo.additions.physics.playCollision')} aria-controls={id} onClick={() => setCollision(current => current + 1)}><Play size={16} aria-hidden="true" />{t('demo.additions.physics.collide')}</button>
    </div>
  </div>;
}
