import { useMemo } from 'react';
import { DOMAIN_KNOWLEDGE, searchDomainKnowledge, type Locale } from '@vibe-dictionary/catalog';

const domainTexts = [...new Map(DOMAIN_KNOWLEDGE.map(item => [item.text.ko.domain, item.text])).values()];

export function useDomainKnowledgeSearch(query: string, locale: Locale) {
  const searchedItems = useMemo(() => searchDomainKnowledge(query), [query]);
  const counts = useMemo(() => {
    const result = new Map<string, number>();
    for (const item of searchedItems) {
      const domain = item.text.ko.domain;
      result.set(domain, (result.get(domain) ?? 0) + 1);
    }
    return result;
  }, [searchedItems]);
  const domains = useMemo(() => domainTexts.map(text => ({
    key: text.ko.domain, label: text[locale].domain, count: counts.get(text.ko.domain) ?? 0,
  })), [counts, locale]);
  return { searchedItems, domains };
}
