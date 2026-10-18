import { useLocale } from '../../../i18n/LocaleContext';

import { useId, useState } from 'react';
import { ArrowLeft, ArrowRight, FileText } from 'lucide-react';

const PAGES = [
  { name: 'demo.additions.nav.history.home', documents: ['demo.additions.nav.history.introduction', 'demo.additions.nav.history.news'] },
  { name: 'demo.additions.nav.history.design', documents: ['demo.additions.nav.history.color', 'demo.additions.nav.history.icons'] },
  { name: 'demo.additions.nav.history.development', documents: ['demo.additions.nav.history.install', 'demo.additions.nav.history.api'] },
] as const;

export function VisitHistoryDemo() {
  const { t } = useLocale();
  const [history, setHistory] = useState({ entries: [0], cursor: 0 });
  const id = useId();
  const active = history.entries[history.cursor];
  const page = PAGES[active];

  function travel(direction: -1 | 1) {
    setHistory(current => {
      const cursor = current.cursor + direction;
      return cursor < 0 || cursor >= current.entries.length ? current : { ...current, cursor };
    });
  }

  function visit(destination: number) {
    setHistory(current => current.entries[current.cursor] === destination ? current : {
      entries: [...current.entries.slice(0, current.cursor + 1), destination], cursor: current.cursor + 1,
    });
  }

  return <div className="nav-demo"><div className="nd-history-frame">
    <div className="nd-history-bar" role="group" aria-label={t('demo.additions.nav.history.navigation')}>
      <button type="button" aria-label={t('demo.additions.nav.history.back')} aria-controls={id} aria-disabled={history.cursor === 0} onClick={() => travel(-1)}><ArrowLeft size={18} aria-hidden="true" /></button>
      <button type="button" aria-label={t('demo.additions.nav.history.forward')} aria-controls={id} aria-disabled={history.cursor === history.entries.length - 1} onClick={() => travel(1)}><ArrowRight size={18} aria-hidden="true" /></button>
      <span aria-live="polite" aria-atomic="true">{t(page.name)}</span>
    </div>
    <ul id={id} className="nd-paginated-list nd-history-documents" aria-label={t('demo.additions.nav.history.documents', { destination: t(page.name) })}>
      {page.documents.map(name => <li key={name}><FileText size={18} aria-hidden="true" /><span>{t(name)}</span></li>)}
    </ul>
    <nav className="nd-history-links" aria-label={t('demo.additions.nav.history.spaces')}><ul>{PAGES.map(({ name }, index) => <li key={name}><button type="button" aria-controls={id} aria-current={active === index ? 'page' : undefined} onClick={() => visit(index)}>{t(name)}</button></li>)}</ul></nav>
  </div></div>;
}
