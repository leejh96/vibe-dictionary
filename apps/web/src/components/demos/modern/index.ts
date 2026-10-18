import type { ComponentType } from 'react';
import { SquircleIconDemo } from './SquircleIconDemo';
import { DuotoneArtDemo } from './DuotoneArtDemo';
import { ExpressiveGroupDemo } from './ExpressiveGroupDemo';
import { StickerCollageDemo } from './StickerCollageDemo';
import { AsciiArtDemo } from './AsciiArtDemo';
import { RoughSketchDemo } from './RoughSketchDemo';
import { WindowShadowDemo } from './WindowShadowDemo';
import { SerifBrandDemo } from './SerifBrandDemo';
import { TruchetTilesDemo } from './TruchetTilesDemo';
import { LowPolyPearDemo } from './LowPolyPearDemo';

export const MODERN_ADDITION_DEMOS: Record<string, ComponentType> = {
  'st-low-poly-faceted-pear': LowPolyPearDemo,
  'st-connected-truchet-tiles': TruchetTilesDemo,
  'st-serif-negative-space-brand': SerifBrandDemo,
  'st-window-shadow-overlay': WindowShadowDemo,
  'st-rough-sketch-wireframe': RoughSketchDemo,
  'st-ascii-luminance-art': AsciiArtDemo,
  'st-die-cut-sticker-collage': StickerCollageDemo,
  'st-expressive-connected-group': ExpressiveGroupDemo,
  'st-duotone-tone-map': DuotoneArtDemo,
  'st-squircle-icon-surface': SquircleIconDemo,
};
