import { useMemo } from 'react';
import {
  GLOSSARY_CATEGORIES,
  searchGlossaryTerms,
  type GlossaryCategory,
} from '@vibe-dictionary/catalog';

export function useGlossarySearch(query: string) {
  const searchedItems = useMemo(() => searchGlossaryTerms(query), [query]);

  const counts = useMemo(() => {
    const result = new Map<GlossaryCategory, number>();
    for (const item of searchedItems) {
      result.set(item.category, (result.get(item.category) ?? 0) + 1);
    }
    return result;
  }, [searchedItems]);

  const categories = useMemo(
    () =>
      GLOSSARY_CATEGORIES.map((category) => ({
        key: category,
        count: counts.get(category) ?? 0,
      })),
    [counts]
  );

  return { searchedItems, categories };
}
