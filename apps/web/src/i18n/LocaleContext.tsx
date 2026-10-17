import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { DOMAIN_CATEGORIES, DOMAIN_LABELS, CATEGORY_NAMES_EN, DOMAIN_NAMES, type Locale } from '@vibe-dictionary/catalog';
import { EN_MESSAGES } from './messages.en';

export const LOCALE_STORAGE_KEY = 'vibe-dictionary-locale';
const labels: Record<string, string> = Object.fromEntries([
  ...Object.values(DOMAIN_CATEGORIES).flat().map(category => [category.label, CATEGORY_NAMES_EN[category.id]]),
  ...Object.entries(DOMAIN_LABELS).map(([id, label]) => [label, DOMAIN_NAMES.en[id as keyof typeof DOMAIN_LABELS]]),
]);
const templates = Object.entries(EN_MESSAGES).filter(([key]) => /\{\d+\}/.test(key)).map(([key, value]) => ({
  pattern: new RegExp('^' + key.split(/\{\d+\}/).map(part => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('(.*?)') + '$'), value,
}));

export function translateValue<T>(value: T, locale: Locale): T {
  if (locale !== 'en') return value;
  if (Array.isArray(value)) return value.map(part => translateValue(part, locale)) as T;
  if (typeof value !== 'string') return value;
  if (Object.prototype.hasOwnProperty.call(labels, value)) return labels[value] as T;
  if (Object.prototype.hasOwnProperty.call(EN_MESSAGES, value)) return EN_MESSAGES[value] as T;
  for (const { pattern, value: message } of templates) {
    const match = value.match(pattern);
    if (match) return message.replace(/\{(\d+)\}/g, (_, i: string) => (EN_MESSAGES[match[Number(i) + 1]] ?? labels[match[Number(i) + 1]] ?? match[Number(i) + 1])) as T;
  }
  return value;
}
const defaultContext = { locale: 'ko' as Locale, setLocale: (_locale: Locale) => {}, tr: <T,>(value: T) => value };
const LocaleContext = createContext(defaultContext);
export function LocaleProvider({ children, initialLocale }: { children: React.ReactNode; initialLocale?: Locale }) {
  const [locale, setLocale] = useState<Locale>(() => {
    if (initialLocale) return initialLocale;
    try { return localStorage.getItem(LOCALE_STORAGE_KEY) === 'en' ? 'en' : 'ko'; } catch { return 'ko'; }
  });
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
      document.title = locale === 'en' ? 'Vibe Dictionary' : '바이브 코딩 사전';
    }
    try { localStorage.setItem(LOCALE_STORAGE_KEY, locale); } catch { /* Language switching still works without storage. */ }
  }, [locale]);
  const value = useMemo(() => ({ locale, setLocale, tr: <T,>(message: T) => translateValue(message, locale) }), [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
export function useLocale() { return useContext(LocaleContext); }
