import { BASE_SEARCH_METADATA } from './search-metadata/additions/base';
import { SIGNATURE_SEARCH_METADATA } from './search-metadata/additions/signature';
import { UI_COLLECTION_SEARCH } from './search-metadata/additions/collection-ui';
import { MOTION_COLLECTION_SEARCH } from './search-metadata/additions/collection-motion';
import { LAYOUT_COLLECTION_SEARCH } from './search-metadata/additions/collection-layout';
import { STYLE_COLLECTION_SEARCH } from './search-metadata/additions/collection-style';
import { VIDEO_COLLECTION_SEARCH } from './search-metadata/additions/collection-video';
import { SHOWCASE_SEARCH_METADATA } from './search-metadata/additions/showcase';
import { GRAPHIC_STUDIO_SEARCH_METADATA } from './search-metadata/additions/graphic-studio';
import { WORKFLOW_SEARCH_METADATA } from './search-metadata/additions/workflows';
import { PATTERN_SEARCH_METADATA } from './search-metadata/additions/patterns';
import { BROADCAST_SEARCH_METADATA } from './search-metadata/additions/broadcast';
import { CAMERA_SEARCH_METADATA } from './search-metadata/additions/camera';
import { CARD_SEARCH_METADATA } from './search-metadata/additions/card';
import { CONTROL_SEARCH_METADATA } from './search-metadata/additions/control';
import { FEEDBACK_SEARCH_METADATA } from './search-metadata/additions/feedback';
import { GRAPHIC_SEARCH_METADATA } from './search-metadata/additions/graphic';
import { GRID_SEARCH_METADATA } from './search-metadata/additions/grid';
import { HOVER_SEARCH_METADATA } from './search-metadata/additions/hover';
import { INFOGRAPHIC_SEARCH_METADATA } from './search-metadata/additions/infographic';
import { KINETIC_SEARCH_METADATA } from './search-metadata/additions/kinetic';
import { KINETIC_AD_SEARCH_METADATA } from './search-metadata/additions/kinetic_ad';
import { LAYOUT_SEARCH_METADATA } from './search-metadata/additions/layout';
import { MODERN_SEARCH_METADATA } from './search-metadata/additions/modern';
import { MOTION_SEARCH_METADATA } from './search-metadata/additions/motion';
import { NAV_SEARCH_METADATA } from './search-metadata/additions/nav';
import { PANEL_SEARCH_METADATA } from './search-metadata/additions/panel';
import { PHYSICS_SEARCH_METADATA } from './search-metadata/additions/physics';
import { PROMO_SEARCH_METADATA } from './search-metadata/additions/promo';
import { RETRO_SEARCH_METADATA } from './search-metadata/additions/retro';
import { SCIFI_SEARCH_METADATA } from './search-metadata/additions/scifi';
import { SCROLL_SEARCH_METADATA } from './search-metadata/additions/scroll';
import { SHADER_SEARCH_METADATA } from './search-metadata/additions/shader';
import { TACTILE_SEARCH_METADATA } from './search-metadata/additions/tactile';
import { TEXT_SEARCH_METADATA } from './search-metadata/additions/text';
import { VFX_SEARCH_METADATA } from './search-metadata/additions/vfx';
import type { TechniqueItem } from './techniques';
import type { Locale } from './localization';

export const TARGETS = ['button', 'card', 'text', 'list', 'background', 'shape', 'scene', 'navigation', 'panel', 'input', 'chart', 'logo', 'image'] as const;
export type SearchTarget = typeof TARGETS[number];
export const TRIGGERS = ['pointer-move', 'hover', 'click', 'hold', 'drag', 'input', 'auto', 'static'] as const;
export type SearchTrigger = typeof TRIGGERS[number];
export interface SearchMetadata {
  targets: SearchTarget[];
  triggers: SearchTrigger[];
  useCases: Record<Locale, string[]>;
  aliases: Record<Locale, string[]>;
}
// Describe the implemented demo, including its actual input, rather than features suggested by a title.
export const SEARCH_METADATA: Record<string, SearchMetadata> = {
  ...SIGNATURE_SEARCH_METADATA,
  ...UI_COLLECTION_SEARCH,
  ...MOTION_COLLECTION_SEARCH,
  ...LAYOUT_COLLECTION_SEARCH,
  ...STYLE_COLLECTION_SEARCH,
  ...VIDEO_COLLECTION_SEARCH,
  ...WORKFLOW_SEARCH_METADATA,
  ...SHOWCASE_SEARCH_METADATA,
  ...GRAPHIC_STUDIO_SEARCH_METADATA,
  ...PATTERN_SEARCH_METADATA,
  ...BROADCAST_SEARCH_METADATA,
  ...CAMERA_SEARCH_METADATA,
  ...CARD_SEARCH_METADATA,
  ...CONTROL_SEARCH_METADATA,
  ...FEEDBACK_SEARCH_METADATA,
  ...GRAPHIC_SEARCH_METADATA,
  ...GRID_SEARCH_METADATA,
  ...HOVER_SEARCH_METADATA,
  ...INFOGRAPHIC_SEARCH_METADATA,
  ...KINETIC_SEARCH_METADATA,
  ...KINETIC_AD_SEARCH_METADATA,
  ...LAYOUT_SEARCH_METADATA,
  ...MODERN_SEARCH_METADATA,
  ...MOTION_SEARCH_METADATA,
  ...NAV_SEARCH_METADATA,
  ...PANEL_SEARCH_METADATA,
  ...PHYSICS_SEARCH_METADATA,
  ...PROMO_SEARCH_METADATA,
  ...RETRO_SEARCH_METADATA,
  ...SCIFI_SEARCH_METADATA,
  ...SCROLL_SEARCH_METADATA,
  ...SHADER_SEARCH_METADATA,
  ...TACTILE_SEARCH_METADATA,
  ...TEXT_SEARCH_METADATA,
  ...VFX_SEARCH_METADATA,
  ...BASE_SEARCH_METADATA,
};
export function getSearchMetadata(item: TechniqueItem): SearchMetadata {
  return SEARCH_METADATA[item.id] ?? { targets: [], triggers: [], aliases: { ko: [], en: [] }, useCases: { ko: [], en: [] } };
}
