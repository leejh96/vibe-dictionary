import { useLocale } from '../../../i18n/LocaleContext';

import { useId, useRef, useState } from 'react';
import { Archive, ChevronRight, Folder, LayoutGrid, ListTodo } from 'lucide-react';

const PAGES = [
  { id: 'overview', label: 'demo.additions.nav.disclosure.overview', Icon: LayoutGrid },
  { id: 'tasks', label: 'demo.additions.nav.disclosure.tasks', Icon: ListTodo },
  { id: 'archive', label: 'demo.additions.nav.disclosure.archive', Icon: Archive },
] as const;

export function DisclosureSidebarDemo() {
  const { t } = useLocale();
  const [open, setOpen] = useState(true);
  const [page, setPage] = useState<string>('overview');
  const id = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const current = PAGES.find(item => item.id === page)!;

  function link(item: typeof PAGES[number]) {
    return <a href={`#${id}-page`} aria-current={page === item.id ? 'page' : undefined} onClick={event => { event.preventDefault(); setPage(item.id); }}>
      <item.Icon size={16} aria-hidden="true" /><span>{t(item.label)}</span>
    </a>;
  }

  return <div className="nav-demo"><div className="nd-disclosure-frame">
    <nav className="nd-disclosure-nav" aria-label={t('demo.additions.nav.disclosure.navigation')} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }} onKeyDown={event => {
      if (event.key === 'Escape' && open) { event.preventDefault(); setOpen(false); trigger.current?.focus(); }
    }}>
      <ul>
        <li><button ref={trigger} type="button" aria-expanded={open} aria-controls={`${id}-children`} onClick={() => setOpen(value => !value)}><Folder size={16} aria-hidden="true" /><span>{t('demo.additions.nav.disclosure.project')}</span><ChevronRight className="nd-disclosure-caret" size={14} aria-hidden="true" /></button>
          <ul id={`${id}-children`} hidden={!open}>{PAGES.slice(0, 2).map(item => <li key={item.id}>{link(item)}</li>)}</ul>
        </li>
        <li>{link(PAGES[2])}</li>
      </ul>
    </nav>
    <div className="nd-disclosure-page" id={`${id}-page`} role="region" aria-label={t('demo.additions.nav.disclosure.page', { destination: t(current.label) })}>
      <svg viewBox="0 0 112 144" aria-hidden="true" className={`nd-page-art nd-page-${page}`}>
        {page === 'overview' ? <><rect x="8" y="12" width="96" height="48" rx="8" /><rect x="8" y="70" width="43" height="60" rx="7" /><rect x="61" y="70" width="43" height="60" rx="7" /></> : page === 'tasks' ? [24, 68, 112].map(y => <g key={y}><rect x="8" y={y - 10} width="20" height="20" rx="5" /><path d={`M40 ${y - 4}H104 M40 ${y + 5}H80`} /></g>) : <><path d="M12 42H100V126H12Z M8 22H104V42H8Z" /><path d="M44 62H68" /></>}
      </svg>
    </div>
  </div></div>;
}
