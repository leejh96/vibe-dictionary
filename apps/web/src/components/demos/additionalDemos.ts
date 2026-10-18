import type { ComponentType } from 'react';
import { GRID_ADDITION_DEMOS } from './grid';
import { NAV_ADDITION_DEMOS } from './nav';
import { PANEL_ADDITION_DEMOS } from './panel';
import { MODERN_ADDITION_DEMOS } from './modern';
import { CAMERA_ADDITION_DEMOS } from './camera';
import { VFX_ADDITION_DEMOS } from './vfx';
import { SCROLL_ADDITION_DEMOS } from './scroll';
import { TACTILE_ADDITION_DEMOS } from './tactile';
import { RETRO_ADDITION_DEMOS } from './retro';
import { SCIFI_ADDITION_DEMOS } from './scifi';
import { PROMO_ADDITION_DEMOS } from './promo';
import { KINETIC_AD_ADDITION_DEMOS } from './kinetic_ad';
import { INFOGRAPHIC_ADDITION_DEMOS } from './infographic';
import { BROADCAST_ADDITION_DEMOS } from './broadcast';

export const ADDITIONAL_DEMOS = new Map<string, ComponentType>([
  ...Object.entries(GRID_ADDITION_DEMOS),
  ...Object.entries(NAV_ADDITION_DEMOS),
  ...Object.entries(PANEL_ADDITION_DEMOS),
  ...Object.entries(MODERN_ADDITION_DEMOS),
  ...Object.entries(CAMERA_ADDITION_DEMOS),
  ...Object.entries(VFX_ADDITION_DEMOS),
  ...Object.entries(SCROLL_ADDITION_DEMOS),
  ...Object.entries(TACTILE_ADDITION_DEMOS),
  ...Object.entries(RETRO_ADDITION_DEMOS),
  ...Object.entries(SCIFI_ADDITION_DEMOS),
  ...Object.entries(PROMO_ADDITION_DEMOS),
  ...Object.entries(KINETIC_AD_ADDITION_DEMOS),
  ...Object.entries(INFOGRAPHIC_ADDITION_DEMOS),
  ...Object.entries(BROADCAST_ADDITION_DEMOS),
]);
