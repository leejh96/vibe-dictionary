import { Check, CircleAlert, Copy, LoaderCircle } from 'lucide-react';
import { useClipboard } from '../../../hooks/useClipboard';
import { useLocale } from '../../../i18n/LocaleContext';

export function ClipboardFeedbackDemo() {
  const { t } = useLocale();
  const command = t('demo.additions.feedback.buildCommand');
  const { status, copy } = useClipboard(command);
  const Icon = status === 'copied' ? Check : status === 'error' ? CircleAlert : status === 'copying' ? LoaderCircle : Copy;
  const label = t(status === 'copied' ? 'demo.additions.feedback.copiedBuild' : status === 'error' ? 'demo.additions.feedback.copyFailed' : status === 'copying' ? 'demo.additions.feedback.copyingBuild' : 'demo.additions.feedback.copyBuild');
  return <div className="feedback-demo fd-copy-demo"><div className="fd-copy-field">
    <code className="fd-copy-code">{command}</code>
    <button type="button" className="fd-copy-button" data-status={status} aria-label={label} aria-busy={status === 'copying'} aria-disabled={status === 'copying'} onClick={copy}><Icon size={18} aria-hidden="true" /></button>
    <span className="sr-only" role="status">{status === 'copied' ? t('demo.additions.feedback.copySuccessStatus') : status === 'error' ? t('demo.additions.feedback.copyFailureStatus') : ''}</span>
  </div></div>;
}
