import { useLocale } from '../../../i18n/LocaleContext';
import { useId, useLayoutEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

const SWING = Array.from({ length: 61 }, (_, index) => ({ offset: index / 60, transform: `rotate(${14 * Math.cos(2 * Math.PI * index / 60)}deg)` }));

export function PendulumPeriodDemo() {
  const { t } = useLocale();
  const [length, setLength] = useState(64);
  const [playing, setPlaying] = useState(true);
  const pendulum = useRef<SVGGElement>(null);
  const motion = useRef<Animation | null>(null);
  const id = useId();

  useLayoutEffect(() => {
    const node = pendulum.current;
    if (!node || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || typeof node.animate !== 'function') return;
    const animation = node.animate(SWING, { duration: 2 * Math.PI * Math.sqrt(length / 500) * 1000, iterations: Infinity, easing: 'linear', fill: 'both' });
    motion.current = animation;
    return () => { animation.cancel(); motion.current = null; };
  }, [length]);

  useLayoutEffect(() => {
    if (playing) motion.current?.play(); else motion.current?.pause();
  }, [playing, length]);

  return <div className="physics-demo">
    <div className="pd-scene">
      <svg id={id} className="pd-svg" viewBox="0 0 264 144" preserveAspectRatio="none" role="img" aria-label={t('demo.additions.physics.pendulumScene')}>
        <path className="pd-rail" d="M100 18H164M132 18V24" />
        <path className="pd-equilibrium" d="M132 24V124" />
        <g ref={pendulum} className="pd-pendulum">
          <path d={`M132 24V${24 + length}`} />
          <circle className="pd-pendulum-bob" cx={132} cy={24 + length} r={8} />
          <circle className="pd-pendulum-shine" cx={130} cy={22 + length} r={2} />
        </g>
        <circle className="pd-pendulum-bob" cx={132} cy={24} r={3} />
      </svg>
    </div>
    <div className="pd-icon-controls">
      <label className="pd-range-control">{t('demo.additions.physics.length')}<input className="pd-range" type="range" aria-label={t('demo.additions.physics.pendulumLength')} aria-controls={id} min={40} max={88} step={1} value={length} onChange={event => setLength(Number(event.currentTarget.value))} /></label>
      <button type="button" className="pd-action pd-icon-action" aria-label={t(playing ? 'demo.additions.physics.pausePendulum' : 'demo.additions.physics.playPendulum')} aria-controls={id} onClick={() => setPlaying(current => !current)}>{playing ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}</button>
    </div>
  </div>;
}
