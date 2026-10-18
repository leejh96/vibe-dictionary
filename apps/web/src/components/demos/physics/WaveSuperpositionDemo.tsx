import { useLocale } from '../../../i18n/LocaleContext';
import { useId, useState } from 'react';

function wavePath(baseline: number, displacement: (angle: number) => number) {
  return Array.from({ length: 97 }, (_, index) => `${index ? 'L' : 'M'}${16 + 232 * index / 96} ${baseline - displacement(4 * Math.PI * index / 96)}`).join(' ');
}

const FIRST_WAVE = wavePath(28, angle => 8 * Math.sin(angle));

export function WaveSuperpositionDemo() {
  const { t } = useLocale();
  const [phase, setPhase] = useState(0);
  const id = useId();
  const radians = phase * Math.PI / 180;
  const second = wavePath(64, angle => 8 * Math.sin(angle + radians));
  const sum = wavePath(112, angle => 8 * Math.sin(angle) + 8 * Math.sin(angle + radians));

  return <div className="physics-demo">
    <div className="pd-scene">
      <svg id={id} className="pd-svg" viewBox="0 0 264 144" preserveAspectRatio="none" role="img" aria-label={t('demo.additions.physics.waveScene')}>
        <path className="pd-equilibrium" d="M16 28H248M16 64H248M16 112H248" />
        <path className="pd-wave-component" d={FIRST_WAVE} />
        <path className="pd-wave-component" d={second} />
        <path className="pd-wave-sum" d={sum} />
        <path className="pd-wave-operators" d="M5 46H11M8 43V49M5 86H11M5 90H11" aria-hidden="true" />
      </svg>
    </div>
    <label className="pd-range-control pd-standalone-control">{t('demo.additions.physics.phase')}<input className="pd-range" type="range" aria-label={t('demo.additions.physics.wavePhase')} aria-valuetext={t('demo.additions.physics.degrees', { value: phase })} aria-controls={id} min={0} max={360} step={5} value={phase} onChange={event => setPhase(Number(event.currentTarget.value))} /></label>
  </div>;
}
