import { ArrowUpRight, Check, Copy } from 'lucide-react';
import {
  GLOSSARY_DOMAIN_TITLES,
  TECHNIQUES,
  getTechniqueText,
  type GlossaryTerm,
} from '@vibe-dictionary/catalog';
import { useClipboard } from '../../hooks/useClipboard';
import { useLocale } from '../../i18n/LocaleContext';
import { GLOSSARY_CATEGORY_KEYS } from './GlossaryFilters';

interface GlossaryTermDetailProps {
  term: GlossaryTerm;
  onViewTechnique: (techniqueId: string) => void;
  onViewDomainKnowledge: (domainId: string) => void;
}

export function GlossaryTermDetail({
  term,
  onViewTechnique,
  onViewDomainKnowledge,
}: GlossaryTermDetailProps) {
  const { locale, t } = useLocale();
  const termText = term.text[locale];
  const aliases = term.aliases[locale];
  const { status, copy } = useClipboard(termText.promptSnippet);

  const relatedTechniques = term.relatedTechniqueIds
    .map((id) => TECHNIQUES.find((candidate) => candidate.id === id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const relatedDomains = term.relatedDomainIds.flatMap((id) => {
    const title = GLOSSARY_DOMAIN_TITLES.get(id)?.[locale];
    return title ? [{ id, title }] : [];
  });

  return (
    <article className="@container min-w-0 space-y-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:shadow-none sm:p-6">
      <header className="min-w-0 space-y-2 border-b border-slate-100 pb-4 dark:border-slate-800">
        <span className="inline-block max-w-full rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700 [overflow-wrap:anywhere] dark:bg-indigo-950 dark:text-indigo-200">
          {t(GLOSSARY_CATEGORY_KEYS[term.category])}
        </span>
        <div className="flex min-w-0 flex-wrap items-baseline gap-x-2.5 gap-y-1">
          <h2 className="min-w-0 text-xl font-extrabold text-slate-900 [overflow-wrap:anywhere] dark:text-white">
            {termText.name}
          </h2>
          {locale === 'ko' && term.name.en !== termText.name && (
            <span lang="en" className="min-w-0 text-sm font-mono font-semibold text-indigo-600 [overflow-wrap:anywhere] dark:text-indigo-400">
              {term.name.en}
            </span>
          )}
        </div>
        {aliases.length > 0 && (
          <div className="flex min-w-0 flex-wrap items-center gap-1.5 pt-1">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              {t('glossary.aliasesLabel')}
            </span>
            {aliases.map((alias) => (
              <span
                key={alias}
                className="max-w-full rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-700 [overflow-wrap:anywhere] dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
              >
                {alias}
              </span>
            ))}
          </div>
        )}
      </header>

      <section className="min-w-0 space-y-1.5">
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
          {t('glossary.definitionLabel')}
        </h3>
        <p className="text-sm leading-relaxed text-slate-600 [overflow-wrap:anywhere] dark:text-slate-300">
          {termText.definition}
        </p>
      </section>

      <section className="min-w-0 space-y-1.5">
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
          {t('glossary.exampleLabel')}
        </h3>
        <p className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5 text-sm leading-relaxed text-slate-700 [overflow-wrap:anywhere] dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-300">
          {termText.example}
        </p>
      </section>

      <section className="min-w-0 space-y-2.5">
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
          {t('glossary.promptLabel')}
        </h3>
        <p className="whitespace-pre-wrap rounded-xl border border-indigo-100 bg-indigo-50/60 p-3.5 text-sm font-mono leading-relaxed text-indigo-950 [overflow-wrap:anywhere] dark:border-indigo-950 dark:bg-slate-950 dark:text-indigo-200">
          {termText.promptSnippet}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={status === 'copying'}
            onClick={() => void copy()}
            className="inline-flex min-h-11 max-w-full cursor-pointer items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus-visible:ring-offset-slate-900 sm:min-h-10"
          >
            {status === 'copied' ? (
              <Check aria-hidden="true" className="h-4 w-4 shrink-0" />
            ) : (
              <Copy aria-hidden="true" className="h-4 w-4 shrink-0" />
            )}
            <span className="[overflow-wrap:anywhere]">
              {t(
                status === 'copied'
                  ? 'glossary.copied'
                  : status === 'copying'
                    ? 'glossary.copying'
                    : 'glossary.copyPrompt'
              )}
            </span>
          </button>
          {status === 'error' && (
            <p role="alert" className="min-w-0 text-xs text-rose-600 [overflow-wrap:anywhere] dark:text-rose-400">
              {t('glossary.copyError')}
            </p>
          )}
        </div>
      </section>

      {(relatedTechniques.length > 0 || relatedDomains.length > 0) && (
        <div className="grid gap-4 border-t border-slate-100 pt-4 dark:border-slate-800 @xl:grid-cols-2">
          {relatedTechniques.length > 0 && (
            <section className="min-w-0 space-y-2">
              <h3 className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                {t('glossary.relatedTechniquesLabel')}
              </h3>
              <ul className="space-y-2">
                {relatedTechniques.map((technique) => {
                  const techText = getTechniqueText(technique, locale);
                  return (
                    <li key={technique.id}>
                      <button
                        type="button"
                        onClick={() => onViewTechnique(technique.id)}
                        className="flex min-h-11 w-full min-w-0 cursor-pointer flex-wrap items-center justify-between gap-x-2 gap-y-1 rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2 text-left text-xs font-bold text-slate-800 transition-colors hover:border-indigo-300 hover:bg-indigo-50/70 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-indigo-500/50 dark:hover:text-indigo-300"
                      >
                        <span className="min-w-0 flex-1 [overflow-wrap:anywhere]">{techText.title}</span>
                        <span className="ml-auto inline-flex shrink-0 items-center gap-0.5 text-indigo-600 dark:text-indigo-400">
                          <span>{t('glossary.viewTechnique')}</span>
                          <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {relatedDomains.length > 0 && (
            <section className="min-w-0 space-y-2">
              <h3 className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                {t('glossary.relatedDomainsLabel')}
              </h3>
              <ul className="space-y-2">
                {relatedDomains.map(({ id, title }) => (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => onViewDomainKnowledge(id)}
                      className="flex min-h-11 w-full min-w-0 cursor-pointer flex-wrap items-center justify-between gap-x-2 gap-y-1 rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2 text-left text-xs font-bold text-slate-800 transition-colors hover:border-indigo-300 hover:bg-indigo-50/70 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-indigo-500/50 dark:hover:text-indigo-300"
                    >
                      <span className="min-w-0 flex-1 [overflow-wrap:anywhere]">{title}</span>
                      <span className="ml-auto inline-flex shrink-0 items-center gap-0.5 text-indigo-600 dark:text-indigo-400">
                        <span>{t('glossary.viewDomain')}</span>
                        <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </article>
  );
}
