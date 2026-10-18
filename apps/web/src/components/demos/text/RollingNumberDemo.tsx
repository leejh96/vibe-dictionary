import { useState } from 'react';
import type { CSSProperties } from 'react';
import { Minus, Plus } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

export function RollingNumberDemo() {
  const { t } = useLocale();
  const [number, setNumber] = useState({ value: 199, previous: 199, direction: 1 });
  const change = (direction: number) => setNumber(current => {
    const value = Math.max(0, Math.min(999, current.value + direction));
    return value === current.value ? current : { value, previous: current.value, direction };
  });
  const previous = String(number.previous).padStart(3, '0');
  return <div className="text-demo">
    <div className="td-number-group">
      <button type="button" className="td-icon-button" aria-label={t('demo.additions.text.decreaseNumber')} aria-disabled={number.value === 0} onClick={() => change(-1)}><Minus size={18} aria-hidden="true" /></button>
      <span className="td-number" aria-live="polite" aria-atomic="true">
        <span className="sr-only">{number.value}</span>
        <span className="td-number-visual" aria-hidden="true">{String(number.value).padStart(3, '0').split('').map((digit, index) => <span className="td-digit-window" key={index}>
          {previous[index] === digit ? <span>{digit}</span> : <span key={number.value} className="td-digit-pair" style={{ '--digit-direction': number.direction } as CSSProperties}><span className="td-digit-out">{previous[index]}</span><span className="td-digit-in">{digit}</span></span>}
        </span>)}</span>
      </span>
      <button type="button" className="td-icon-button" aria-label={t('demo.additions.text.increaseNumber')} aria-disabled={number.value === 999} onClick={() => change(1)}><Plus size={18} aria-hidden="true" /></button>
    </div>
  </div>;
}
