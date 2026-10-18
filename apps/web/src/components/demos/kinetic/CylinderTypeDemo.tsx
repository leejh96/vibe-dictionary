import { useId, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

export function CylinderTypeDemo() {
  const { t } = useLocale();
  const [paused, setPaused] = useState(false);
  const id = useId();
  const Icon = paused ? Play : Pause;

  return <div className="kinetic-demo kt-cylinder-demo">
    <div id={id} className="kt-cylinder-scene" role="img" aria-label={t('demo.additions.kinetic.cylinderScene')}>
      <div className="kt-cylinder-tilt" aria-hidden="true">
        <div className="kt-cylinder-rotor" style={{ animationPlayState: paused ? 'paused' : 'running' }}>
          {t('demo.additions.kinetic.vibeSample').repeat(4).split('').map((letter, index) => <span key={index} className="kt-cylinder-letter" style={{ transform: `rotateY(${index * 22.5 - 33.75}deg) translateZ(68px)` }}>{letter}</span>)}
        </div>
      </div>
    </div>
    <button type="button" className="kt-cylinder-control" aria-label={t(paused ? 'demo.additions.kinetic.cylinderPlay' : 'demo.additions.kinetic.cylinderPause')} aria-controls={id} onClick={() => setPaused(value => !value)}><Icon size={18} aria-hidden="true" /></button>
  </div>;
}
