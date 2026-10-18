import { useId, useRef, useState } from 'react';
import { Bookmark, FileText, Menu, X } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

const VIEWS = [{ id: 'recent', labelKey: 'demo.additions.motion.recent' as const, titleKey: 'demo.additions.motion.recentDocuments' as const, Icon: FileText }, { id: 'saved', labelKey: 'demo.additions.motion.saved' as const, titleKey: 'demo.additions.motion.savedDocuments' as const, Icon: Bookmark }];

export function ReflowPanelDemo() {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(VIEWS[0]);
  const panelId = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const TriggerIcon = open ? X : Menu;
  const ViewIcon = view.Icon;
  const close = () => { setOpen(false); trigger.current?.focus(); };
  return <div className="motion-demo">
    <div className="md-push-frame" data-open={open} onKeyDown={event => { if (open && event.key === 'Escape') { event.stopPropagation(); close(); } }}>
      <div className="md-push-content">
        <div className="md-push-summary"><ViewIcon size={26} aria-hidden="true" /><strong>{t(view.titleKey)}</strong></div>
        <button type="button" className="md-icon-button" ref={trigger} aria-label={t('demo.additions.motion.documentPanel')} aria-expanded={open} aria-controls={panelId} onClick={() => setOpen(value => !value)}><TriggerIcon size={18} aria-hidden="true" /></button>
      </div>
      <div className="md-push-panel" id={panelId} role="group" aria-label={t('demo.additions.motion.documentViews')} aria-hidden={!open}>
        {VIEWS.map(option => <button type="button" key={option.id} className="md-push-option" aria-pressed={view.id === option.id} disabled={!open} tabIndex={open ? 0 : -1} onClick={() => { setView(option); close(); }}>{t(option.labelKey)}</button>)}
      </div>
    </div>
  </div>;
}
