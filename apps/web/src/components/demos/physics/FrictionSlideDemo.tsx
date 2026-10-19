import { useDemoPulse } from '../../../hooks/useDemoAutoplay';
import { useLocale } from '../../../i18n/LocaleContext';
import { useId, useLayoutEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';

const SPEED = 180;
const HATCH = Array.from({ length: 13 }, (_, index) => `M${32 + index * 16} 100l-4 6`).join(' ');

export function FrictionSlideDemo() {
  const { t } = useLocale();
  const [friction, setFriction] = useState(50);
  const [push, setPush] = useState(0);
  useDemoPulse(() => setPush(value => value + 1));
  const mass = useRef<SVGGElement>(null);
  const id = useId();
  const deceleration = friction / 100 * 500;
  const duration = SPEED / deceleration;
  const distance = SPEED * duration / 2;

  useLayoutEffect(() => {
    const node = mass.current;
    if (!push || !node || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || typeof node.animate !== 'function') return;
    const frames = Array.from({ length: 41 }, (_, index) => {
      const time = duration * index / 40;
      return { offset: index / 40, transform: `translateX(${SPEED * time - deceleration * time * time / 2}px)` };
    });
    const animation = node.animate(frames, { duration: duration * 1000, easing: 'linear', fill: 'backwards' });
    return () => animation.cancel();
  }, [push, deceleration, duration]);

  return <div className="physics-demo">
    <div className="pd-scene">
      <svg id={id} className="pd-svg" viewBox="0 0 264 144" preserveAspectRatio="none" role="img" aria-label={t('demo.additions.physics.frictionScene')}>
        <path className="pd-rail" d="M24 100H240" />
        <path className="pd-friction-hatch" d={HATCH} />
        <path className="pd-equilibrium" d={`M${40 + distance} 68V100`} />
        <g ref={mass} className="pd-friction-mass" style={{ transform: `translateX(${push ? distance : 0}px)` }}><rect x={28} y={76} width={24} height={24} rx={6} /><path d="M34 88H46M42 84L46 88L42 92" /></g>
      </svg>
    </div>
    <div className="pd-action-controls">
      <label className="pd-range-control">{t('demo.additions.physics.friction')}<input className="pd-range" type="range" aria-label={t('demo.additions.physics.frictionCoefficient')} aria-valuetext={`${friction / 100}`} aria-controls={id} min={20} max={80} step={1} value={friction} onChange={event => { setFriction(Number(event.currentTarget.value)); setPush(0); }} /></label>
      <button type="button" className="pd-action pd-compact-action" aria-label={t('demo.additions.physics.pushBlock')} aria-controls={id} onClick={() => setPush(current => current + 1)}><Play size={16} aria-hidden="true" />{t('demo.additions.physics.push')}</button>
    </div>
  </div>;
}
