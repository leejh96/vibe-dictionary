import { useId, useRef, useState } from 'react';
import { Minus, Package, Plus } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

export function QuantityStepperDemo() {
  const { t } = useLocale();
  const [value, setValue] = useState('3');
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const atMinimum = value !== '' && Number(value) <= 0;
  const atMaximum = value !== '' && Number(value) >= 9;
  const step = (direction: -1 | 1) => {
    if (!input.current || (direction < 0 ? atMinimum : atMaximum)) return;
    if (direction > 0) input.current.stepUp();
    else input.current.stepDown();
    setValue(input.current.value);
  };
  return <div className="control-demo"><div className="ct-step-frame">
    <label className="ct-control-label" htmlFor={id}><Package size={16} aria-hidden="true" />{t('demo.additions.control.quantity')}</label>
    <div className="ct-step-controls">
      <button className="ct-icon-button" type="button" aria-label={t('demo.additions.control.decreaseQuantity')} aria-controls={id} aria-disabled={atMinimum} onClick={() => step(-1)}><Minus size={18} aria-hidden="true" /></button>
      <input className="ct-step-input" ref={input} id={id} type="number" inputMode="numeric" min={0} max={9} step={1} value={value} onChange={event => setValue(event.target.value)} />
      <button className="ct-icon-button" type="button" aria-label={t('demo.additions.control.increaseQuantity')} aria-controls={id} aria-disabled={atMaximum} onClick={() => step(1)}><Plus size={18} aria-hidden="true" /></button>
    </div>
  </div></div>;
}
