import { useEffect, useRef, useState } from 'react';
import { BookMarked } from 'lucide-react';
import {
  TECHNIQUES,
  getGlossaryLinksForDomain,
  getTechniqueText,
  type DomainKnowledge,
} from '@vibe-dictionary/catalog';
import { useClipboard } from '../../hooks/useClipboard';
import { useLocale } from '../../i18n/LocaleContext';
import { LazyGlossaryPeekDialog } from '../glossary/LazyGlossaryPeekDialog';
import type { DomainKnowledgeViewProps } from './types';

export function KnowledgeDetail({ item, onBack, onViewTechnique, onViewGlossaryTerm }: { item: DomainKnowledge; onBack: () => void } & DomainKnowledgeViewProps) {
  const { locale, t } = useLocale();
  const text = item.text[locale];
  const { status, copy } = useClipboard(text.promptSnippet);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const glossaryLinks = getGlossaryLinksForDomain(item.id, 2);
  const [peekTermId, setPeekTermId] = useState<string | null>(null);
  const peekTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => { headingRef.current?.focus(); }, [item.id]);

  return (
    <div className="space-y-4">
      <button type="button" onClick={onBack} className="cursor-pointer text-sm font-bold text-indigo-600 dark:text-indigo-300">← {t('knowledge.back')}</button>
      <article className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <header>
          <span className="rounded-lg bg-indigo-50 px-2 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-200">{text.domain}</span>
          <h1 ref={headingRef} tabIndex={-1} className="mt-3 text-xl font-extrabold">{text.title}</h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{text.overview}</p>
          {glossaryLinks.length > 0 && (
            <div className="mt-3 flex min-w-0 flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                {t('glossary.domainLinksLabel')}
              </span>
              {glossaryLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={(event) => {
                    peekTriggerRef.current = event.currentTarget;
                    setPeekTermId(link.id);
                  }}
                  aria-label={t('glossary.peekAriaLabel', { name: link.name[locale] })}
                  className="inline-flex min-h-11 max-w-full min-w-0 cursor-pointer items-center gap-1.5 rounded-lg border border-indigo-200/80 bg-indigo-50/70 px-2.5 py-1 text-left text-xs font-bold text-indigo-700 transition-colors hover:border-indigo-300 hover:bg-indigo-100/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950 dark:text-indigo-300 dark:hover:border-indigo-500/50 dark:hover:bg-slate-900 sm:min-h-8"
                >
                  <BookMarked aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                  <span className="min-w-0 [overflow-wrap:anywhere]">{link.name[locale]}</span>
                </button>
              ))}
            </div>
          )}
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
      <LazyGlossaryPeekDialog
        termId={peekTermId}
        onClose={() => setPeekTermId(null)}
        returnFocusRef={peekTriggerRef}
        onOpenInGlossary={onViewGlossaryTerm ? (termId) => {
          setPeekTermId(null);
          onViewGlossaryTerm(termId);
        } : undefined}
      />
    </div>
  );
}
