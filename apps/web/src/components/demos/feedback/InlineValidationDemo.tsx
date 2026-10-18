import { useId, useState } from 'react';
import { Check, CircleAlert } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

export function InlineValidationDemo() {
  const { t } = useLocale();
  const [field, setField] = useState({ value: '', checked: false, valid: false });
  const inputId = useId();
  const errorId = `${inputId}-error`;
  const error = field.checked && !field.valid ? t(field.value ? 'demo.additions.feedback.emailFormat' : 'demo.additions.feedback.emailRequired') : '';
  return <div className="feedback-demo">
    <div className="fd-field">
      <label className="fd-label" htmlFor={inputId}>{t('demo.additions.feedback.email')}</label>
      <div className="fd-input-wrap" data-valid={field.checked && field.valid}>
        <input className="fd-input" id={inputId} type="email" required autoComplete="off" spellCheck={false} value={field.value} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined}
          onChange={event => { const { value, validity } = event.currentTarget; setField(current => ({ ...current, value, valid: validity.valid })); }}
          onBlur={event => { const valid = event.currentTarget.validity.valid; setField(current => ({ ...current, checked: true, valid })); }} />
        {field.checked && (error ? <CircleAlert className="fd-field-icon fd-danger" size={16} aria-hidden="true" /> : <Check className="fd-field-icon fd-success" size={16} aria-hidden="true" />)}
      </div>
      {error && <p id={errorId} className="fd-error" role="alert">{error}</p>}
    </div>
  </div>;
}
