import { useId, useState, type CSSProperties } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

export function ValueBubbleSliderDemo() {
  const { t } = useLocale();
  const [value, setValue] = useState(50);
  const id = useId();
  const Icon = value === 0 ? VolumeX : Volume2;
  return <div className="control-demo"><div className="ct-range-frame" style={{ '--ct-fill': `${value}%` } as CSSProperties}>
    <label className="ct-control-label" htmlFor={id}><Icon size={16} aria-hidden="true" />{t('demo.additions.control.volume')}</label>
    <div className="ct-range-field">
      <output className="ct-value-bubble" htmlFor={id} aria-hidden="true" style={{ left: `calc(${value}% + ${10 - value / 5}px)` }}>{t('demo.additions.control.percentage', { value })}</output>
      <input className="ct-range-input" id={id} type="range" min={0} max={100} step={5} value={value} aria-valuetext={t('demo.additions.control.percentage', { value })} onChange={event => setValue(Number(event.target.value))} />
    </div>
  </div></div>;
}
