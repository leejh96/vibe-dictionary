import { BASE_EN_MESSAGES } from './base.messages';
import { SIGNATURE_EN_MESSAGES } from './demos/signature.messages';
import { COLLECTION_UI_EN_MESSAGES } from './demos/collection-ui.messages';
import { COLLECTION_MOTION_EN_MESSAGES } from './demos/collection-motion.messages';
import { COLLECTION_LAYOUT_EN_MESSAGES } from './demos/collection-layout.messages';
import { COLLECTION_STYLE_EN_MESSAGES } from './demos/collection-style.messages';
import { COLLECTION_VIDEO_EN_MESSAGES } from './demos/collection-video.messages';
import { SHOWCASE_EN_MESSAGES } from './demos/showcase.messages';
import { GRAPHIC_STUDIO_EN_MESSAGES } from './demos/graphic-studio.messages';
import { WORKFLOWS_EN_MESSAGES } from './demos/workflows.messages';
import { PATTERNS_EN_MESSAGES } from './demos/patterns.messages';
import { BROADCAST_EN_MESSAGES } from './demos/broadcast.messages';
import { CAMERA_EN_MESSAGES } from './demos/camera.messages';
import { CARD_EN_MESSAGES } from './demos/card.messages';
import { CONTROL_EN_MESSAGES } from './demos/control.messages';
import { FEEDBACK_EN_MESSAGES } from './demos/feedback.messages';
import { GRAPHIC_EN_MESSAGES } from './demos/graphic.messages';
import { GRID_EN_MESSAGES } from './demos/grid.messages';
import { HOVER_EN_MESSAGES } from './demos/hover.messages';
import { INFOGRAPHIC_EN_MESSAGES } from './demos/infographic.messages';
import { KINETIC_EN_MESSAGES } from './demos/kinetic.messages';
import { KINETIC_AD_EN_MESSAGES } from './demos/kinetic_ad.messages';
import { LAYOUT_EN_MESSAGES } from './demos/layout.messages';
import { MODERN_EN_MESSAGES } from './demos/modern.messages';
import { MOTION_EN_MESSAGES } from './demos/motion.messages';
import { NAV_EN_MESSAGES } from './demos/nav.messages';
import { PANEL_EN_MESSAGES } from './demos/panel.messages';
import { PHYSICS_EN_MESSAGES } from './demos/physics.messages';
import { PROMO_EN_MESSAGES } from './demos/promo.messages';
import { RETRO_EN_MESSAGES } from './demos/retro.messages';
import { SCIFI_EN_MESSAGES } from './demos/scifi.messages';
import { SCROLL_EN_MESSAGES } from './demos/scroll.messages';
import { SHADER_EN_MESSAGES } from './demos/shader.messages';
import { TACTILE_EN_MESSAGES } from './demos/tactile.messages';
import { TEXT_EN_MESSAGES } from './demos/text.messages';
import { VFX_EN_MESSAGES } from './demos/vfx.messages';
import type { MessageKey } from './messages.ko';

export const EN_MESSAGES = {
  ...SIGNATURE_EN_MESSAGES,
  ...COLLECTION_UI_EN_MESSAGES,
  ...COLLECTION_MOTION_EN_MESSAGES,
  ...COLLECTION_LAYOUT_EN_MESSAGES,
  ...COLLECTION_STYLE_EN_MESSAGES,
  ...COLLECTION_VIDEO_EN_MESSAGES,
  ...WORKFLOWS_EN_MESSAGES,
  ...SHOWCASE_EN_MESSAGES,
  ...GRAPHIC_STUDIO_EN_MESSAGES,
  ...PATTERNS_EN_MESSAGES,
  ...BROADCAST_EN_MESSAGES,
  ...CAMERA_EN_MESSAGES,
  ...CARD_EN_MESSAGES,
  ...CONTROL_EN_MESSAGES,
  ...FEEDBACK_EN_MESSAGES,
  ...GRAPHIC_EN_MESSAGES,
  ...GRID_EN_MESSAGES,
  ...HOVER_EN_MESSAGES,
  ...INFOGRAPHIC_EN_MESSAGES,
  ...KINETIC_EN_MESSAGES,
  ...KINETIC_AD_EN_MESSAGES,
  ...LAYOUT_EN_MESSAGES,
  ...MODERN_EN_MESSAGES,
  ...MOTION_EN_MESSAGES,
  ...NAV_EN_MESSAGES,
  ...PANEL_EN_MESSAGES,
  ...PHYSICS_EN_MESSAGES,
  ...PROMO_EN_MESSAGES,
  ...RETRO_EN_MESSAGES,
  ...SCIFI_EN_MESSAGES,
  ...SCROLL_EN_MESSAGES,
  ...SHADER_EN_MESSAGES,
  ...TACTILE_EN_MESSAGES,
  ...TEXT_EN_MESSAGES,
  ...VFX_EN_MESSAGES,
  ...BASE_EN_MESSAGES,
} satisfies Record<MessageKey, string>;
