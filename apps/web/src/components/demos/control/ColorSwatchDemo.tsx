import { useId, useState } from 'react';
import { Palette } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

export function ColorSwatchDemo() {
  const { t } = useLocale();
  const [color, setColor] = useState('#8b5cf6');
  const id = useId();
  return <div className="control-demo"><div className="ct-color-frame">
    <label className="ct-control-label" htmlFor={id}><Palette size={16} aria-hidden="true" />{t('demo.additions.control.accentColor')}</label>
    <div className="ct-color-row">
      <input className="ct-color-input" type="color" id={id} value={color} onInput={event => setColor(event.currentTarget.value)} />
      <output className="ct-color-value" htmlFor={id} aria-hidden="true">{color.toUpperCase()}</output>
    </div>
  </div></div>;
}
