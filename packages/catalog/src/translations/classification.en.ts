import type { CategoryType, DomainType } from '../techniques';

export const DOMAIN_LABELS_EN: Record<DomainType, string> = { ui: 'UI', motion: 'Graphics', layout: 'Layout', style: 'Style', video: 'Motion video' };

export const CATEGORY_NAMES_EN: Record<CategoryType | 'all', string> = {
  all: 'All', hover: 'Buttons & hover', card: 'Cards & 3D', motion: 'Entrances & transitions',
  text: 'Text & counters', feedback: 'Feedback & notifications', layout: 'Tabs, banners & loaders',
  control: 'Sliders & toggles', graphic: 'Shapes, SVG & morphing', shader: 'Backgrounds, particles & light',
  physics: 'Motion principles', kinetic: 'Kinetic typography', camera: 'Space & camera (2.5D)', vfx: 'Transitions & VFX',
  grid: 'Grids & card layouts', scroll: 'Scrolling & page transitions', nav: 'Navigation & menus', panel: 'Panels, boards & data',
  modern: 'Modern', tactile: 'Depth & texture', retro: 'Retro, pixel & CRT', scifi: 'Sci-fi, blueprints & pop art',
  promo: 'Launches & showreels', kinetic_ad: 'Typography & rhythm', infographic: 'Data & charts', broadcast: 'Broadcast & titles',
};
