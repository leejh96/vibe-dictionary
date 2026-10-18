import { DOMAIN_LABELS, type TechniqueItem, type DomainType, type CategoryType } from './techniques';
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
  en: { ui: 'UI', motion: 'Graphics', layout: 'Layout', style: 'Style', video: 'Motion video' },
};
export const CATEGORY_NAMES_EN: Record<CategoryType | 'all', string> = {
  all: 'All', hover: 'Buttons & hover', card: 'Cards & 3D', motion: 'Entrances & transitions',
  text: 'Text & counters', feedback: 'Feedback & notifications', layout: 'Tabs, banners & loaders',
  control: 'Sliders & toggles', graphic: 'Shapes, SVG & morphing', shader: 'Backgrounds, particles & light',
  physics: 'Motion principles', kinetic: 'Kinetic typography', camera: 'Space & camera (2.5D)', vfx: 'Transitions & VFX',
  grid: 'Grids & card layouts', scroll: 'Scrolling & page transitions', nav: 'Navigation & menus', panel: 'Panels, boards & data',
  modern: 'Modern', tactile: 'Depth & texture', retro: 'Retro, pixel & CRT', scifi: 'Sci-fi, blueprints & pop art',
  promo: 'Launches & showreels', kinetic_ad: 'Typography & rhythm', infographic: 'Data & charts', broadcast: 'Broadcast & titles',
};
