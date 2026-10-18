import { useRef, useState } from 'react';
import { FileText, Search, SearchX } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

const NOTES = ['demo.additions.feedback.walkingNote', 'demo.additions.feedback.lightJournal'] as const;

export function EmptySearchDemo() {
  const { t } = useLocale();
  const [editedQuery, setQuery] = useState<string | null>(null);
  const query = editedQuery ?? t('demo.additions.feedback.initialQuery');
  const input = useRef<HTMLInputElement>(null);
  const results = NOTES.filter(note => t(note).includes(query.trim()));
  return <div className="feedback-demo"><div className="fd-empty-frame">
    <div className="fd-empty-search"><Search size={16} aria-hidden="true" /><input ref={input} className="fd-input fd-empty-input" aria-label={t('demo.additions.feedback.searchNotes')} placeholder={t('demo.additions.feedback.searchNotes')} value={query} maxLength={40} autoComplete="off" spellCheck={false} onChange={event => setQuery(event.target.value)} /></div>
    <div className="fd-empty-results">{results.length ? <ul className="fd-empty-list">{results.map(note => <li key={note}><FileText size={16} aria-hidden="true" /><span>{t(note)}</span></li>)}</ul> : <div className="fd-empty-state">
      <SearchX size={24} aria-hidden="true" /><span role="status">{t('demo.additions.feedback.noResults')}</span>
      <button type="button" className="fd-empty-reset" onClick={() => { setQuery(''); input.current?.focus(); }}>{t('demo.additions.feedback.clearSearch')}</button>
    </div>}</div>
  </div></div>;
}
