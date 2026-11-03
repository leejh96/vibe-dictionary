import type { RefObject } from 'react';
import { useLocale } from '../../i18n/LocaleContext';

interface KnowledgeFiltersProps {
  query: string;
  onQueryChange: (query: string) => void;
  selectedDomain: string;
  onDomainChange: (domain: string) => void;
  domains: { key: string; label: string; count: number }[];
  total: number;
  searchRef: RefObject<HTMLInputElement>;
}

export function KnowledgeFilters({ query, onQueryChange, selectedDomain, onDomainChange, domains, total, searchRef }: KnowledgeFiltersProps) {
  const { t } = useLocale();
  const filters = [{ key: 'all', label: t('knowledge.allDomains'), count: total }, ...domains];
  return <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
    <input ref={searchRef} type="search" value={query} onChange={event => onQueryChange(event.target.value)} aria-label={t('knowledge.search')} placeholder={t('knowledge.searchPlaceholder')} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-950" />
    <div role="group" aria-label={t('knowledge.domainFilter')} className="flex flex-wrap items-center gap-1.5 pt-1">
      {filters.map(domain => {
        const active = selectedDomain === domain.key;
        return <button
          key={domain.key}
          type="button"
          aria-pressed={active}
          onClick={() => onDomainChange(active ? 'all' : domain.key)}
          className={`cursor-pointer rounded-xl border px-3 py-1.5 text-xs font-bold transition-colors ${active
            ? 'border-indigo-600 bg-indigo-600 text-white'
            : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-white'}`}
        >{domain.label} ({domain.count})</button>;
      })}
    </div>
  </section>;
}
