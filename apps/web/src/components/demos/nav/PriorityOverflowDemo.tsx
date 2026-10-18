import { useLocale } from '../../../i18n/LocaleContext';

import { useId, useRef, useState } from 'react';
import { Ellipsis, FileText } from 'lucide-react';
import { useOutsidePointerDismiss } from '../../../hooks/useOutsidePointerDismiss';

const PAGES = [
  { name: 'demo.additions.nav.priority.home', documents: ['demo.additions.nav.priority.news', 'demo.additions.nav.priority.start'] },
  { name: 'demo.additions.nav.priority.docs', documents: ['demo.additions.nav.priority.install', 'demo.additions.nav.priority.api'] },
  { name: 'demo.additions.nav.priority.demos', documents: ['demo.additions.nav.priority.input', 'demo.additions.nav.priority.motion'] },
  { name: 'demo.additions.nav.priority.setup', documents: ['demo.additions.nav.priority.display', 'demo.additions.nav.priority.keyboard'] },
] as const;

export function PriorityOverflowDemo() {
  const { t } = useLocale();
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useOutsidePointerDismiss(open, root, () => setOpen(false));

  function closeAndFocus() { setOpen(false); trigger.current?.focus(); }

  function destination(index: number, overflow: boolean) {
    return <button type="button" aria-controls={`${id}-page`} aria-current={active === index ? 'page' : undefined} onClick={() => { setActive(index); setOpen(false); if (overflow) trigger.current?.focus(); }}>{t(PAGES[index].name)}</button>;
  }

  return <div className="nav-demo"><div className="nd-priority-shell"><div ref={root} className="nd-priority-frame" onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }} onKeyDown={event => { if (event.key === 'Escape' && open) { event.preventDefault(); closeAndFocus(); } }}>
    <nav aria-label={t('demo.additions.nav.priority.navigation')}><ul className="nd-priority-items">
      {PAGES.map(({ name }, index) => <li key={name} data-overflow={index > 1}>{destination(index, false)}</li>)}
      <li className="nd-priority-more"><button ref={trigger} type="button" className="nd-priority-toggle" data-current={active > 1} aria-label={active > 1 ? t('demo.additions.nav.priority.current', { destination: t(PAGES[active].name) }) : t('demo.additions.nav.priority.more')} aria-expanded={open} aria-controls={`${id}-overflow`} onClick={() => setOpen(value => !value)}><Ellipsis size={20} aria-hidden="true" /></button><ul id={`${id}-overflow`} className="nd-priority-menu" hidden={!open}>{PAGES.slice(2).map(({ name }, index) => <li key={name}>{destination(index + 2, true)}</li>)}</ul></li>
    </ul></nav>
    <ul id={`${id}-page`} className="nd-paginated-list nd-history-documents" aria-label={t('demo.additions.nav.priority.documents', { destination: t(PAGES[active].name) })} aria-live="polite" aria-atomic="true">{PAGES[active].documents.map(name => <li key={name}><FileText size={18} aria-hidden="true" /><span>{t(name)}</span></li>)}</ul>
  </div></div></div>;
}
