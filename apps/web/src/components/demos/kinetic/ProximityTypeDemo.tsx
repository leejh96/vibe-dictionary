import { useId, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function ProximityTypeDemo() {
  const { t } = useLocale();
  const [position, setPosition] = useState(50);
  const id = useId();

  return <div className="kinetic-demo kt-proximity-demo">
    <div id={id} className="kt-proximity-word" role="img" aria-label={t('demo.additions.kinetic.proximityScene')} onPointerMove={event => {
      if (event.pointerType === 'touch') return;
      const { left, width } = event.currentTarget.getBoundingClientRect();
      if (!width) return;
      setPosition(Math.round(Math.min(1, Math.max(0, (event.clientX - left) / width)) * 200) / 2);
    }}>
      {t('demo.additions.kinetic.vibeSample').split('').map((letter, index) => <span key={index} className="kt-proximity-letter" aria-hidden="true" style={{ fontWeight: 100 + 900 * Math.max(0, 1 - Math.abs(position - (index * 25 + 12.5)) / 25) }}>{letter}</span>)}
    </div>
    <label className="kt-position-control">{t('demo.additions.kinetic.positionLabel')}<input type="range" min={0} max={100} step={.5} value={position} aria-label={t('demo.additions.kinetic.emphasisPosition')} aria-valuetext={t('demo.additions.kinetic.percent', { value: position })} aria-controls={id} onChange={event => setPosition(Number(event.currentTarget.value))} /></label>
  </div>;
}
