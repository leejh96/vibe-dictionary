import { useId, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function CharacterBudgetDemo() {
  const { t } = useLocale();
  const [value, setValue] = useState('');
  const id = useId();
  const remaining = 40 - Array.from(value).length;
  return <div className="feedback-demo"><div className="fd-field">
    <label className="fd-label" htmlFor={id}>{t('demo.additions.feedback.memo')}</label>
    <textarea id={id} className="fd-budget-input" value={value} placeholder={t('demo.additions.feedback.memoPlaceholder')} aria-invalid={remaining < 0} aria-describedby={`${id}-budget`} onChange={event => setValue(event.target.value)} />
    <span id={`${id}-budget`} className="fd-budget-count" data-over={remaining < 0}>{remaining < 0 ? t('demo.additions.feedback.overLimit', { count: -remaining }) : t('demo.additions.feedback.remaining', { count: remaining })}</span>
  </div></div>;
}
