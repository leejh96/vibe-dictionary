import { EN_BASE_TECHNIQUES } from './additions/base';
import { EN_SIGNATURE_TECHNIQUES } from './additions/signature';
import { EN_UI_COLLECTION } from './additions/collection-ui';
import { EN_MOTION_COLLECTION } from './additions/collection-motion';
import { EN_LAYOUT_COLLECTION } from './additions/collection-layout';
import { EN_STYLE_COLLECTION } from './additions/collection-style';
import { EN_VIDEO_COLLECTION } from './additions/collection-video';
import { EN_SHOWCASE_TECHNIQUES } from './additions/showcase';
import { EN_GRAPHIC_STUDIO_TECHNIQUES } from './additions/graphic-studio';
import { EN_WORKFLOW_TECHNIQUES } from './additions/workflows';
import { EN_BROADCAST_TECHNIQUES } from './additions/broadcast';
import { EN_CAMERA_TECHNIQUES } from './additions/camera';
import { EN_CARD_TECHNIQUES } from './additions/card';
import { EN_CONTROL_TECHNIQUES } from './additions/control';
import { EN_FEEDBACK_TECHNIQUES } from './additions/feedback';
import { EN_GRAPHIC_TECHNIQUES } from './additions/graphic';
import { EN_GRID_TECHNIQUES } from './additions/grid';
import { EN_HOVER_TECHNIQUES } from './additions/hover';
import { EN_INFOGRAPHIC_TECHNIQUES } from './additions/infographic';
import { EN_KINETIC_TECHNIQUES } from './additions/kinetic';
import { EN_KINETIC_AD_TECHNIQUES } from './additions/kinetic_ad';
import { EN_LAYOUT_TECHNIQUES } from './additions/layout';
import { EN_MODERN_TECHNIQUES } from './additions/modern';
import { EN_MOTION_TECHNIQUES } from './additions/motion';
import { EN_NAV_TECHNIQUES } from './additions/nav';
import { EN_PANEL_TECHNIQUES } from './additions/panel';
import { EN_PHYSICS_TECHNIQUES } from './additions/physics';
import { EN_PROMO_TECHNIQUES } from './additions/promo';
import { EN_RETRO_TECHNIQUES } from './additions/retro';
import { EN_SCIFI_TECHNIQUES } from './additions/scifi';
import { EN_SCROLL_TECHNIQUES } from './additions/scroll';
import { EN_SHADER_TECHNIQUES } from './additions/shader';
import { EN_TACTILE_TECHNIQUES } from './additions/tactile';
import { EN_TEXT_TECHNIQUES } from './additions/text';
import { EN_VFX_TECHNIQUES } from './additions/vfx';
import type { TechniqueTranslation } from '../localization';

import { EN_PATTERN_TECHNIQUES } from './additions/patterns';

export const ENGLISH_TECHNIQUES: Record<string, TechniqueTranslation> = {
  ...EN_SIGNATURE_TECHNIQUES,
  ...EN_UI_COLLECTION,
  ...EN_MOTION_COLLECTION,
  ...EN_LAYOUT_COLLECTION,
  ...EN_STYLE_COLLECTION,
  ...EN_VIDEO_COLLECTION,
  ...EN_WORKFLOW_TECHNIQUES,
  ...EN_SHOWCASE_TECHNIQUES,
  ...EN_GRAPHIC_STUDIO_TECHNIQUES,
  ...EN_PATTERN_TECHNIQUES,
  ...EN_BROADCAST_TECHNIQUES,
  ...EN_CAMERA_TECHNIQUES,
  ...EN_CARD_TECHNIQUES,
  ...EN_CONTROL_TECHNIQUES,
  ...EN_FEEDBACK_TECHNIQUES,
  ...EN_GRAPHIC_TECHNIQUES,
  ...EN_GRID_TECHNIQUES,
  ...EN_HOVER_TECHNIQUES,
  ...EN_INFOGRAPHIC_TECHNIQUES,
  ...EN_KINETIC_TECHNIQUES,
  ...EN_KINETIC_AD_TECHNIQUES,
  ...EN_LAYOUT_TECHNIQUES,
  ...EN_MODERN_TECHNIQUES,
  ...EN_MOTION_TECHNIQUES,
  ...EN_NAV_TECHNIQUES,
  ...EN_PANEL_TECHNIQUES,
  ...EN_PHYSICS_TECHNIQUES,
  ...EN_PROMO_TECHNIQUES,
  ...EN_RETRO_TECHNIQUES,
  ...EN_SCIFI_TECHNIQUES,
  ...EN_SCROLL_TECHNIQUES,
  ...EN_SHADER_TECHNIQUES,
  ...EN_TACTILE_TECHNIQUES,
  ...EN_TEXT_TECHNIQUES,
  ...EN_VFX_TECHNIQUES,
  ...EN_BASE_TECHNIQUES,
};
