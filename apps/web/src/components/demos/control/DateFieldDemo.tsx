import { useId } from 'react';
import { CalendarDays } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

export function DateFieldDemo() {
  const { t } = useLocale();
  const id = useId();
  return <div className="control-demo"><div className="ct-date-frame">
    <label className="ct-control-label" htmlFor={id}><CalendarDays size={16} aria-hidden="true" />{t('demo.additions.control.date')}</label>
    <input className="ct-date-input" type="date" id={id} defaultValue="2026-10-18" />
  </div></div>;
}
