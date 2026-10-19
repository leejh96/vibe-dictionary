import { useDemoPulse } from '../../../hooks/useDemoAutoplay';
import { useLocale } from '../../../i18n/LocaleContext';
import { useId, useLayoutEffect, useRef, useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';

const SAMPLES = Array.from({ length: 101 }, (_, index) => {
  const time = index * .04;
  return { offset: index / 100, displacement: index === 100 ? 0 : 60 * Math.exp(-2 * time) * (Math.cos(10 * time) + .2 * Math.sin(10 * time)) };
});

export function DampedSpringDemo() {
  const { t } = useLocale();
  const [release, setRelease] = useState(0);
  useDemoPulse(() => setRelease(value => value + 1));
  const mass = useRef<SVGGElement>(null);
  const coil = useRef<SVGGElement>(null);
  const id = useId();

  useLayoutEffect(() => {
    if (!release || !mass.current || !coil.current || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof mass.current.animate !== 'function' || typeof coil.current.animate !== 'function') return;
    const options: KeyframeAnimationOptions = { duration: 4000, easing: 'linear', fill: 'backwards' };
    const massAnimation = mass.current.animate(SAMPLES.map(({ offset, displacement }) => ({ offset, transform: `translateX(${displacement}px)` })), options);
    const coilAnimation = coil.current.animate(SAMPLES.map(({ offset, displacement }) => ({ offset, transform: `scaleX(${(90 + displacement) / 90})` })), options);
    return () => { massAnimation.cancel(); coilAnimation.cancel(); };
  }, [release]);

  return <div className="physics-demo">
    <div className="pd-scene">
      <svg id={id} className="pd-svg" viewBox="0 0 264 144" preserveAspectRatio="none" role="img" aria-label={t('demo.additions.physics.springScene')}>
        <path className="pd-rail" d="M24 88H240" />
        <path className="pd-equilibrium" d="M132 52V90" />
        <rect className="pd-anchor" x={24} y={50} width={6} height={42} rx={2} />
        <g ref={coil} className="pd-coil" style={{ transform: release ? 'scaleX(1)' : 'scaleX(1.6666666666666667)' }}><path d="M30 72H36L42 62 54 82 66 62 78 82 90 62 102 82 108 72H120" /></g>
        <g ref={mass} className="pd-mass" style={{ transform: release ? 'translateX(0)' : 'translateX(60px)' }}><rect x={120} y={60} width={24} height={24} rx={6} /><path d="M128 68H136M128 76H136" /></g>
      </svg>
    </div>
    <button type="button" className="pd-action" aria-controls={id} onClick={() => setRelease(current => current + 1)}>{release ? <RotateCcw size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}{t(release ? 'demo.additions.physics.releaseAgain' : 'demo.additions.physics.release')}</button>
  </div>;
}
