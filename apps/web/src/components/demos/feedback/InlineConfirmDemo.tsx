import { useLayoutEffect, useRef, useState } from 'react';
import { FileText, RotateCcw, Trash2 } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

type Phase = 'idle' | 'confirm' | 'removed';

export function InlineConfirmDemo() {
  const { t } = useLocale();
  const [phase, setPhase] = useState<Phase>('idle');
  const deleteButton = useRef<HTMLButtonElement>(null);
  const cancelButton = useRef<HTMLButtonElement>(null);
  const restoreButton = useRef<HTMLButtonElement>(null);
  const changed = useRef(false);
  useLayoutEffect(() => {
    if (changed.current) (phase === 'confirm' ? cancelButton.current : phase === 'removed' ? restoreButton.current : deleteButton.current)?.focus();
  }, [phase]);
  const changePhase = (next: Phase) => { changed.current = true; setPhase(next); };
  return <div className="feedback-demo fd-confirm-demo" onKeyDown={event => { if (phase === 'confirm' && event.key === 'Escape') changePhase('idle'); }}>
    <div className="fd-confirm-frame">{phase === 'removed' ? <button type="button" className="fd-confirm-restore" aria-label={t('demo.additions.feedback.restoreDraft')} ref={restoreButton} onClick={() => changePhase('idle')}><RotateCcw size={18} aria-hidden="true" /></button> : <div className="fd-confirm-item" data-confirming={phase === 'confirm'}>
      <FileText size={20} aria-hidden="true" /><span className="fd-confirm-title">{t('demo.additions.feedback.draft')}</span>
      {phase === 'idle' ? <button type="button" className="fd-confirm-delete" aria-label={t('demo.additions.feedback.deleteDraft')} ref={deleteButton} onClick={() => changePhase('confirm')}><Trash2 size={18} aria-hidden="true" /></button> : <div className="fd-confirm-actions" role="group" aria-label={t('demo.additions.feedback.confirmDraftDeletion')}>
        <button type="button" className="fd-confirm-action" aria-label={t('demo.additions.feedback.cancelDeletion')} ref={cancelButton} onClick={() => changePhase('idle')}>{t('demo.additions.feedback.cancel')}</button>
        <button type="button" className="fd-confirm-action fd-confirm-danger" aria-label={t('demo.additions.feedback.confirmDraftDeletion')} onClick={() => changePhase('removed')}>{t('demo.additions.feedback.delete')}</button>
      </div>}
    </div>}</div>
  </div>;
}
