import { useLocale } from '../../../i18n/LocaleContext';
import { useDemoAutoplayRunning } from '../../../hooks/useDemoAutoplay';
import { useId, useLayoutEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

const INITIAL_RADIUS = 32;
const CORE_INERTIA = 200;

export function VariableInertiaDemo() {
  const { t } = useLocale();
  const [radius, setRadius] = useState(INITIAL_RADIUS);
  const [playing, setPlaying] = useState(true);
  const autoRunning = useDemoAutoplayRunning();
  const rotor = useRef<SVGGElement>(null);
  const motion = useRef<Animation | null>(null);
  const id = useId();

  useLayoutEffect(() => () => {
    motion.current?.cancel();
    motion.current = null;
  }, []);

  useLayoutEffect(() => {
    const node = rotor.current;
    if (autoRunning && !motion.current && typeof node?.animate === 'function') {
      motion.current = node.animate([{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }], { duration: 4000, iterations: Infinity, easing: 'linear' });
    }
    motion.current?.updatePlaybackRate((CORE_INERTIA + 2 * INITIAL_RADIUS ** 2) / (CORE_INERTIA + 2 * radius ** 2));
    if (playing && autoRunning) motion.current?.play(); else motion.current?.pause();
  }, [playing, autoRunning, radius]);

  return <div className="physics-demo">
    <div className="pd-scene">
      <svg id={id} className="pd-svg" viewBox="0 0 264 144" preserveAspectRatio="none" role="img" aria-label={t('demo.additions.physics.inertiaScene')}>
        <circle className="pd-equilibrium" cx={132} cy={72} r={54} />
        <g transform="translate(132 72)">
          <g ref={rotor} className="pd-inertia-rotor">
            <path d={`M${-radius} 0H${radius}`} />
            <circle className="pd-inertia-weight" cx={-radius} r={8} />
            <circle className="pd-inertia-weight" cx={radius} r={8} fillOpacity={.45} />
            <circle cx={-radius - 2} cy={-2} r={2} fill="var(--pd-surface)" opacity={.7} />
            <circle className="pd-inertia-hub" r={10} />
          </g>
        </g>
      </svg>
    </div>
    <div className="pd-icon-controls">
      <label className="pd-range-control">{t('demo.additions.physics.distance')}<input className="pd-range" type="range" aria-label={t('demo.additions.physics.massDistance')} aria-controls={id} min={20} max={44} step={1} value={radius} onChange={event => setRadius(Number(event.currentTarget.value))} /></label>
      <button type="button" className="pd-action pd-icon-action" aria-label={t(playing ? 'demo.additions.physics.pauseMass' : 'demo.additions.physics.playMass')} aria-controls={id} onClick={() => setPlaying(current => !current)}>{playing ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}</button>
    </div>
  </div>;
}
