import { useLocale } from '../../../i18n/LocaleContext';

import { useId, useState } from 'react';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';

const PAGES = [
  ['demo.additions.nav.pagination.start', 'demo.additions.nav.pagination.design'],
  ['demo.additions.nav.pagination.color', 'demo.additions.nav.pagination.type'],
  ['demo.additions.nav.pagination.icons', 'demo.additions.nav.pagination.components'],
] as const;

export function PaginatedListDemo() {
  const { t } = useLocale();
  const [page, setPage] = useState(0);
  const id = useId();

  return <div className="nav-demo"><div className="nd-pagination-shell">
    <ul id={id} className="nd-paginated-list" aria-label={t('demo.additions.nav.pagination.documents', { page: page + 1 })} aria-live="polite" aria-atomic="true">
      {PAGES[page].map(name => <li key={name}><FileText size={18} aria-hidden="true" /><span>{t(name)}</span></li>)}
    </ul>
    <nav className="nd-pagination" aria-label={t('demo.additions.nav.pagination.navigation')}>
      <button type="button" aria-label={t('demo.additions.nav.pagination.previous')} aria-controls={id} disabled={page === 0} onClick={() => setPage(value => Math.max(0, value - 1))}><ChevronLeft size={18} aria-hidden="true" /></button>
      <ol>{PAGES.map((_, index) => <li key={index} data-current={page === index}><button type="button" aria-label={t('demo.additions.nav.pagination.page', { page: index + 1 })} aria-controls={id} aria-current={page === index ? 'page' : undefined} onClick={() => setPage(index)}>{index + 1}</button></li>)}</ol>
      <button type="button" aria-label={t('demo.additions.nav.pagination.next')} aria-controls={id} disabled={page === PAGES.length - 1} onClick={() => setPage(value => Math.min(PAGES.length - 1, value + 1))}><ChevronRight size={18} aria-hidden="true" /></button>
    </nav>
  </div></div>;
}
