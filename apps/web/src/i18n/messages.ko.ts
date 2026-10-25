import { BASE_KO_MESSAGES } from './base.messages';
import { SIGNATURE_KO_MESSAGES } from './demos/signature.messages';
import { COLLECTION_UI_KO_MESSAGES } from './demos/collection-ui.messages';
import { COLLECTION_MOTION_KO_MESSAGES } from './demos/collection-motion.messages';
import { COLLECTION_LAYOUT_KO_MESSAGES } from './demos/collection-layout.messages';
import { COLLECTION_STYLE_KO_MESSAGES } from './demos/collection-style.messages';
import { COLLECTION_VIDEO_KO_MESSAGES } from './demos/collection-video.messages';
import { SHOWCASE_KO_MESSAGES } from './demos/showcase.messages';
import { GRAPHIC_STUDIO_KO_MESSAGES } from './demos/graphic-studio.messages';
import { WORKFLOWS_KO_MESSAGES } from './demos/workflows.messages';
import { PATTERNS_KO_MESSAGES } from './demos/patterns.messages';
import { BROADCAST_KO_MESSAGES } from './demos/broadcast.messages';
import { CAMERA_KO_MESSAGES } from './demos/camera.messages';
import { CARD_KO_MESSAGES } from './demos/card.messages';
import { CONTROL_KO_MESSAGES } from './demos/control.messages';
import { FEEDBACK_KO_MESSAGES } from './demos/feedback.messages';
import { GRAPHIC_KO_MESSAGES } from './demos/graphic.messages';
import { GRID_KO_MESSAGES } from './demos/grid.messages';
import { HOVER_KO_MESSAGES } from './demos/hover.messages';
import { INFOGRAPHIC_KO_MESSAGES } from './demos/infographic.messages';
import { KINETIC_KO_MESSAGES } from './demos/kinetic.messages';
import { KINETIC_AD_KO_MESSAGES } from './demos/kinetic_ad.messages';
import { LAYOUT_KO_MESSAGES } from './demos/layout.messages';
import { MODERN_KO_MESSAGES } from './demos/modern.messages';
import { MOTION_KO_MESSAGES } from './demos/motion.messages';
import { NAV_KO_MESSAGES } from './demos/nav.messages';
import { PANEL_KO_MESSAGES } from './demos/panel.messages';
import { PHYSICS_KO_MESSAGES } from './demos/physics.messages';
import { PROMO_KO_MESSAGES } from './demos/promo.messages';
import { RETRO_KO_MESSAGES } from './demos/retro.messages';
import { SCIFI_KO_MESSAGES } from './demos/scifi.messages';
import { SCROLL_KO_MESSAGES } from './demos/scroll.messages';
import { SHADER_KO_MESSAGES } from './demos/shader.messages';
import { TACTILE_KO_MESSAGES } from './demos/tactile.messages';
import { TEXT_KO_MESSAGES } from './demos/text.messages';
import { VFX_KO_MESSAGES } from './demos/vfx.messages';
// Stable IDs are independent of display wording. Keep placeholder names in every locale.
export const KO_MESSAGES = {
  ...SIGNATURE_KO_MESSAGES,
  ...COLLECTION_UI_KO_MESSAGES,
  ...COLLECTION_MOTION_KO_MESSAGES,
  ...COLLECTION_LAYOUT_KO_MESSAGES,
  ...COLLECTION_STYLE_KO_MESSAGES,
  ...COLLECTION_VIDEO_KO_MESSAGES,
  ...WORKFLOWS_KO_MESSAGES,
  ...SHOWCASE_KO_MESSAGES,
  ...GRAPHIC_STUDIO_KO_MESSAGES,
  ...PATTERNS_KO_MESSAGES,
  ...BROADCAST_KO_MESSAGES,
  ...CAMERA_KO_MESSAGES,
  ...CARD_KO_MESSAGES,
  ...CONTROL_KO_MESSAGES,
  ...FEEDBACK_KO_MESSAGES,
  ...GRAPHIC_KO_MESSAGES,
  ...GRID_KO_MESSAGES,
  ...HOVER_KO_MESSAGES,
  ...INFOGRAPHIC_KO_MESSAGES,
  ...KINETIC_KO_MESSAGES,
  ...KINETIC_AD_KO_MESSAGES,
  ...LAYOUT_KO_MESSAGES,
  ...MODERN_KO_MESSAGES,
  ...MOTION_KO_MESSAGES,
  ...NAV_KO_MESSAGES,
  ...PANEL_KO_MESSAGES,
  ...PHYSICS_KO_MESSAGES,
  ...PROMO_KO_MESSAGES,
  ...RETRO_KO_MESSAGES,
  ...SCIFI_KO_MESSAGES,
  ...SCROLL_KO_MESSAGES,
  ...SHADER_KO_MESSAGES,
  ...TACTILE_KO_MESSAGES,
  ...TEXT_KO_MESSAGES,
  ...VFX_KO_MESSAGES,
  ...BASE_KO_MESSAGES,
} as const;

export type MessageKey = keyof typeof KO_MESSAGES;
