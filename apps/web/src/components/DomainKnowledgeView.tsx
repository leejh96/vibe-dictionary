import { useEffect, useRef, useState } from 'react';
import { DOMAIN_KNOWLEDGE } from '@vibe-dictionary/catalog';
import { useLocale } from '../i18n/LocaleContext';
import { useDomainKnowledgeSearch } from '../hooks/useDomainKnowledgeSearch';
import { KnowledgeDetail } from './knowledge/KnowledgeDetail';
import { KnowledgeFilters } from './knowledge/KnowledgeFilters';
import type { DomainKnowledgeViewProps } from './knowledge/types';

export function DomainKnowledgeView({ onViewTechnique }: DomainKnowledgeViewProps) {
  const { locale, t } = useLocale();
  const [query, setQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const hasOpenedDetail = useRef(false);
  const selected = DOMAIN_KNOWLEDGE.find(item => item.id === selectedId);
  const { searchedItems, domains } = useDomainKnowledgeSearch(query, locale);
  const items = selectedDomain === 'all'
    ? searchedItems
    : searchedItems.filter(item => item.text.ko.domain === selectedDomain);

  useEffect(() => {
    if (selectedId === null && hasOpenedDetail.current) searchRef.current?.focus();
  }, [selectedId]);

  if (selected) return <KnowledgeDetail item={selected} onBack={() => setSelectedId(null)} onViewTechnique={onViewTechnique} />;

  return <div className="space-y-5">
    <KnowledgeFilters query={query} onQueryChange={setQuery} selectedDomain={selectedDomain} onDomainChange={setSelectedDomain} domains={domains} total={searchedItems.length} searchRef={searchRef} />
    <header><h1 className="text-xl font-extrabold">{t('knowledge.heading')}</h1><p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t('knowledge.intro')}</p></header>
    {items.length === 0 ? <p role="status" className="rounded-xl bg-white p-6 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-300">{t('knowledge.empty')}</p> : <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{items.map(item => <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><span className="text-xs font-bold text-indigo-600 dark:text-indigo-300">{item.text[locale].domain}</span><h2 className="mt-2 text-base font-extrabold">{item.text[locale].title}</h2><p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.text[locale].summary}</p><button type="button" onClick={() => { hasOpenedDetail.current = true; setSelectedId(item.id); }} className="mt-4 cursor-pointer text-sm font-bold text-indigo-600 dark:text-indigo-300">{t('knowledge.open')} →</button></article>)}</div>}
  </div>;
}
