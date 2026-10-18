import { useId, useRef, useState } from 'react';
import { Settings2 } from 'lucide-react';
import { useOutsidePointerDismiss } from '../../../hooks/useOutsidePointerDismiss';
import { useLocale } from '../../../i18n/LocaleContext';

export function TooltipDemo() {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const focused = useRef(false);
  const tooltipId = useId();
  useOutsidePointerDismiss(open, root, () => setOpen(false));
  return <div className="feedback-demo">
    <div className="fd-tooltip-frame" ref={root} data-open={open} onPointerLeave={() => { if (!focused.current) setOpen(false); }} onKeyDown={event => { if (event.key === 'Escape') setOpen(false); }}>
      <div role="tooltip" className="fd-tooltip-bubble" id={tooltipId} aria-hidden={!open}>{t('demo.additions.feedback.tooltipCopy')}</div>
      <button type="button" className="fd-tooltip-button" aria-label={t('demo.additions.feedback.displaySettings')} aria-describedby={open ? tooltipId : undefined}
        onPointerEnter={event => { if (event.pointerType === 'mouse') setOpen(true); }}
        onFocus={() => { focused.current = true; setOpen(true); }} onBlur={() => { focused.current = false; setOpen(false); }} onClick={() => setOpen(true)}><Settings2 size={20} aria-hidden="true" /></button>
    </div>
  </div>;
}
