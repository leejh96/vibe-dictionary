import { Fragment, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

export function SearchHighlightDemo() {
  const { t } = useLocale();
  const [queryInput, setQuery] = useState<string | null>(null);
  const query = queryInput ?? t('demo.additions.text.searchInitialQuery');
  const passage = t('demo.additions.text.searchPassage');
  const input = useRef<HTMLInputElement>(null);
  const parts = query ? passage.split(query) : [passage];
  return <div className="text-demo td-find-demo">
    <div className="td-find-frame">
      <div className="td-find-field">
        <Search size={16} aria-hidden="true" className="td-find-icon" />
        <input ref={input} aria-label={t('demo.additions.text.searchInput')} className="td-find-input" value={query} maxLength={24} autoComplete="off" spellCheck={false} onChange={event => setQuery(event.target.value)} />
        <button type="button" className="td-find-clear" aria-label={t('demo.additions.text.clearSearch')} disabled={!query} onClick={() => { setQuery(''); input.current?.focus(); }}><X size={16} aria-hidden="true" /></button>
      </div>
      <p className="td-find-copy">{parts.map((part, index) => <Fragment key={index}>{index > 0 && <mark>{query}</mark>}{part}</Fragment>)}</p>
    </div>
  </div>;
}
