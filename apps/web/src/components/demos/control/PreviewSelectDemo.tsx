import { useId, useState } from 'react';
import { ChevronDown, Type } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

export function PreviewSelectDemo() {
  const { t } = useLocale();
  const [size, setSize] = useState(28);
  const id = useId();
  return <div className="control-demo"><div className="ct-select-frame">
    <label className="ct-control-label" htmlFor={id}><Type size={16} aria-hidden="true" />{t('demo.additions.control.fontSize')}</label>
    <div className="ct-select-layout">
      <div className="ct-select-field"><select className="ct-native-select" id={id} value={size} onChange={event => setSize(Number(event.target.value))}>
        <option value={20}>{t('demo.additions.control.smallSize', { size: 20 })}</option><option value={28}>{t('demo.additions.control.mediumSize', { size: 28 })}</option><option value={36}>{t('demo.additions.control.largeSize', { size: 36 })}</option>
      </select><ChevronDown size={18} aria-hidden="true" /></div>
      <span className="ct-size-preview" aria-hidden="true" style={{ fontSize: size }}>{t('demo.additions.control.fontSample')}</span>
    </div>
  </div></div>;
}
