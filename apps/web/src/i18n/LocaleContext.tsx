import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Locale } from '@vibe-dictionary/catalog';
import { koreanTranslate, translateMessage, type Translate } from './messages';

export const LOCALE_STORAGE_KEY = 'vibe-dictionary-locale';
const defaultContext = { locale: 'ko' as Locale, setLocale: (_locale: Locale) => {}, t: koreanTranslate };
const LocaleContext = createContext(defaultContext);
export function LocaleProvider({ children, initialLocale }: { children: React.ReactNode; initialLocale?: Locale }) {
  const [locale, setLocale] = useState<Locale>(() => {
    if (initialLocale) return initialLocale;
    try { return localStorage.getItem(LOCALE_STORAGE_KEY) === 'en' ? 'en' : 'ko'; } catch { return 'ko'; }
  });
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
      document.title = translateMessage(locale, 'app.name');
    }
    try { localStorage.setItem(LOCALE_STORAGE_KEY, locale); } catch { /* Language switching still works without storage. */ }
  }, [locale]);
  const value = useMemo(() => {
    const t: Translate = (key, ...args) => translateMessage(locale, key, ...args);
    return { locale, setLocale, t };
  }, [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
export function useLocale() { return useContext(LocaleContext); }
