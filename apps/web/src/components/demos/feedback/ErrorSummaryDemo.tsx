import { useId, useLayoutEffect, useRef, useState } from 'react';
import { Check, CircleAlert } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

type Errors = { name: '' | 'demo.additions.feedback.nameRequired'; email: '' | 'demo.additions.feedback.emailRequired' | 'demo.additions.feedback.emailFormat' };

export function ErrorSummaryDemo() {
  const { t } = useLocale();
  const id = useId();
  const nameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const summary = useRef<HTMLDivElement>(null);
  const focusSummary = useRef(false);
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState<Errors>({ name: '', email: '' });
  const hasErrors = Boolean(errors.name || errors.email);
  const validate = (): Errors => ({
    name: nameInput.current?.validity.valid ? '' : 'demo.additions.feedback.nameRequired',
    email: emailInput.current?.validity.valid ? '' : emailInput.current?.value ? 'demo.additions.feedback.emailFormat' : 'demo.additions.feedback.emailRequired',
  });
  useLayoutEffect(() => {
    if (focusSummary.current) {
      focusSummary.current = false;
      if (hasErrors) summary.current?.focus();
    }
  }, [errors]);
  return <div className="feedback-demo"><form className="fd-summary-form" noValidate onChange={() => { if (checked) setErrors(validate()); }} onSubmit={event => {
    event.preventDefault();
    focusSummary.current = true;
    setChecked(true);
    setErrors(validate());
  }}>
    {hasErrors && <div className="fd-error-summary" ref={summary} tabIndex={-1} role="alert" aria-labelledby={`${id}-summary-title`}>
      <strong id={`${id}-summary-title`}><CircleAlert size={16} aria-hidden="true" />{t('demo.additions.feedback.checkNeeded')}</strong>
      <ul>{errors.name && <li><a href={`#${id}-name`} onClick={event => { event.preventDefault(); nameInput.current?.focus(); }}>{t(errors.name)}</a></li>}{errors.email && <li><a href={`#${id}-email`} onClick={event => { event.preventDefault(); emailInput.current?.focus(); }}>{t(errors.email)}</a></li>}</ul>
    </div>}
    <div><label className="fd-label" htmlFor={`${id}-name`}>{t('demo.additions.feedback.name')}</label><input className="fd-input fd-summary-input" id={`${id}-name`} ref={nameInput} required autoComplete="off" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? `${id}-name-error` : undefined} />{errors.name && <p className="fd-summary-error" id={`${id}-name-error`}>{t(errors.name)}</p>}</div>
    <div><label className="fd-label" htmlFor={`${id}-email`}>{t('demo.additions.feedback.email')}</label><input className="fd-input fd-summary-input" id={`${id}-email`} ref={emailInput} type="email" required autoComplete="off" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? `${id}-email-error` : undefined} />{errors.email && <p className="fd-summary-error" id={`${id}-email-error`}>{t(errors.email)}</p>}</div>
    <button type="submit" className="fd-summary-submit" data-valid={checked && !hasErrors}>{checked && !hasErrors && <Check size={16} aria-hidden="true" />}{t('demo.additions.feedback.checkInputs')}</button>
  </form></div>;
}
