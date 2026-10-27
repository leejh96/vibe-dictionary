import { useEffect, useRef, useState } from 'react';
import { DOMAIN_KNOWLEDGE, TECHNIQUES, getTechniqueText, searchDomainKnowledge, type DomainKnowledge, type TechniqueItem } from '@vibe-dictionary/catalog';
import { useClipboard } from '../hooks/useClipboard';
import { useLocale } from '../i18n/LocaleContext';

interface DomainKnowledgeViewProps {
  onViewTechnique: (item: TechniqueItem) => void;
}

function KnowledgeDetail({ item, onBack, onViewTechnique }: { item: DomainKnowledge; onBack: () => void } & DomainKnowledgeViewProps) {
  const { locale, t } = useLocale();
  const text = item.text[locale];
  const { status, copy } = useClipboard(text.promptSnippet);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => { headingRef.current?.focus(); }, [item.id]);

  return (
    <div className="space-y-4">
      <button type="button" onClick={onBack} className="cursor-pointer text-sm font-bold text-indigo-600 dark:text-indigo-300">← {t('knowledge.back')}</button>
      <article className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <header>
          <span className="rounded-lg bg-indigo-50 px-2 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-200">{text.domain}</span>
          <h1 ref={headingRef} tabIndex={-1} className="mt-3 text-xl font-extrabold">{text.title}</h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{text.overview}</p>
        </header>
        <section><h2 className="mb-3 text-sm font-extrabold">{t('knowledge.concepts')}</h2>
          <dl className="space-y-3">{text.concepts.map(concept => <div key={concept.name} className="rounded-xl bg-slate-50 p-3 dark:bg-slate-950"><dt className="text-sm font-bold">{concept.name}</dt><dd className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{concept.description}</dd></div>)}</dl>
        </section>
        <section><h2 className="mb-3 text-sm font-extrabold">{t('knowledge.workflow')}</h2>
          <ol className="list-decimal space-y-3 pl-5 marker:font-bold marker:text-indigo-600 dark:marker:text-indigo-300">{text.workflow.map(step => <li key={step.name} className="pl-1 text-sm"><h3 className="font-bold">{step.name}</h3><p className="mt-1 leading-relaxed text-slate-600 dark:text-slate-300">{step.description}</p></li>)}</ol>
        </section>
        <section><h2 className="mb-3 text-sm font-extrabold">{t('knowledge.pitfalls')}</h2>
          <dl className="space-y-3">{text.pitfalls.map(pitfall => <div key={pitfall.name} className="rounded-xl border border-amber-200 bg-amber-50/60 p-3 dark:border-amber-900 dark:bg-amber-950/20"><dt className="text-sm font-bold">{pitfall.name}</dt><dd className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{pitfall.description}</dd></div>)}</dl>
        </section>
        <section><h2 className="mb-3 text-sm font-extrabold">{t('knowledge.questions')}</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{text.questions.map(question => <li key={question}>{question}</li>)}</ul>
        </section>
        <section><h2 className="mb-2 text-sm font-extrabold">{t('knowledge.example')}</h2><p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{text.example}</p></section>
        <section><h2 className="mb-3 text-sm font-extrabold">{t('knowledge.related')}</h2>
          <div className="grid gap-3 sm:grid-cols-2">{text.relatedDesigns.map(related => {
            const technique = TECHNIQUES.find(candidate => candidate.id === related.id);
            if (!technique) return null;
            return <div key={related.id} className="rounded-xl border border-slate-200 p-3 dark:border-slate-800"><h3 className="text-sm font-bold">{getTechniqueText(technique, locale).title}</h3><p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">{related.reason}</p><button type="button" onClick={() => onViewTechnique(technique)} className="mt-3 cursor-pointer text-xs font-bold text-indigo-600 dark:text-indigo-300">{t('knowledge.viewDesign')} →</button></div>;
          })}</div>
        </section>
        <section><h2 className="mb-2 text-sm font-extrabold">{t('knowledge.prompt')}</h2><p className="whitespace-pre-wrap rounded-xl bg-slate-50 p-3 text-sm leading-relaxed text-slate-700 dark:bg-slate-950 dark:text-slate-300">{text.promptSnippet}</p>
          <button type="button" disabled={status === 'copying'} onClick={copy} className="mt-3 cursor-pointer rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">{t(status === 'copied' ? 'knowledge.copied' : status === 'copying' ? 'knowledge.copying' : 'knowledge.copy')}</button>
          <p role="status" className="mt-2 text-xs text-red-600 dark:text-red-300">{status === 'error' ? t('knowledge.copyError') : ''}</p>
        </section>
        <section><h2 className="mb-2 text-sm font-extrabold">{t('knowledge.sources')}</h2><ul className="space-y-2">{item.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer" className="text-sm text-indigo-600 underline dark:text-indigo-300">{source.title}</a></li>)}</ul></section>
      </article>
    </div>
  );
}

export function DomainKnowledgeView({ onViewTechnique }: DomainKnowledgeViewProps) {
  const { locale, t } = useLocale();
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const hasOpenedDetail = useRef(false);
  const selected = DOMAIN_KNOWLEDGE.find(item => item.id === selectedId);
  const items = searchDomainKnowledge(query);

  useEffect(() => {
    if (selectedId === null && hasOpenedDetail.current) searchRef.current?.focus();
  }, [selectedId]);

  if (selected) return <KnowledgeDetail item={selected} onBack={() => setSelectedId(null)} onViewTechnique={onViewTechnique} />;

  return <div className="space-y-5">
    <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <input ref={searchRef} type="search" value={query} onChange={event => setQuery(event.target.value)} aria-label={t('knowledge.search')} placeholder={t('knowledge.searchPlaceholder')} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-950" />
    </section>
    <header><h1 className="text-xl font-extrabold">{t('knowledge.heading')}</h1><p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t('knowledge.intro')}</p></header>
    {items.length === 0 ? <p role="status" className="rounded-xl bg-white p-6 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-300">{t('knowledge.empty')}</p> : <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{items.map(item => <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><span className="text-xs font-bold text-indigo-600 dark:text-indigo-300">{item.text[locale].domain}</span><h2 className="mt-2 text-base font-extrabold">{item.text[locale].title}</h2><p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.text[locale].summary}</p><button type="button" onClick={() => { hasOpenedDetail.current = true; setSelectedId(item.id); }} className="mt-4 cursor-pointer text-sm font-bold text-indigo-600 dark:text-indigo-300">{t('knowledge.open')} →</button></article>)}</div>}
  </div>;
}
