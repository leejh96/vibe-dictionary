import { useId, useRef, useState } from 'react';
import { Info, LockKeyhole } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';
import { useOutsidePointerDismiss } from '../../../hooks/useOutsidePointerDismiss';

export function AnchoredPopoverDemo() {
  const { t } = useLocale();
  const [open, setOpen] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const noteId = useId();
  useOutsidePointerDismiss(open, root, () => setOpen(false));
  return <div className="motion-demo">
    <div className="md-anchor-frame" ref={root} data-open={open} onKeyDown={event => {
      if (open && event.key === 'Escape') { event.stopPropagation(); setOpen(false); trigger.current?.focus(); }
    }}>
      <div className="md-anchor-note" id={noteId} aria-hidden={!open}>
        <LockKeyhole size={18} aria-hidden="true" /><strong>{t('demo.additions.motion.readOnly')}</strong>
      </div>
      <button type="button" className="md-icon-button md-anchor-trigger" ref={trigger} aria-label={t('demo.additions.motion.viewAccess')} aria-expanded={open} aria-controls={noteId} aria-describedby={open ? noteId : undefined} onClick={() => setOpen(value => !value)}><Info size={20} aria-hidden="true" /></button>
    </div>
  </div>;
}
