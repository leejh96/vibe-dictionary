import { DOMAIN_LABELS_EN } from './translations/classification.en';
import { DOMAIN_LABELS, type TechniqueItem, type DomainType } from './techniques';
import { ENGLISH_TECHNIQUES } from './translations/en';

export const LOCALES = ['ko', 'en'] as const;
export type Locale = typeof LOCALES[number];
export interface TechniqueText {
  title: string;
  summary: string;
  vibeTag: string;
  vibeKeywords: string[];
  promptSnippet: string;
}
export type TechniqueTranslation = Omit<TechniqueText, 'title'>;

export function getTechniqueText(item: TechniqueItem, locale: Locale = 'ko'): TechniqueText {
  if (locale === 'en') {
    const translation = ENGLISH_TECHNIQUES[item.id];
    if (translation) return { title: item.titleEn, ...translation };
  }
  return { title: item.titleKo, summary: item.summary, vibeTag: item.vibeTag,
    vibeKeywords: item.vibeKeywords, promptSnippet: item.promptSnippet };
}

export const DOMAIN_NAMES: Record<Locale, Record<DomainType, string>> = {
  ko: DOMAIN_LABELS,
  en: DOMAIN_LABELS_EN,
};
export { CATEGORY_NAMES_EN } from './translations/classification.en';
