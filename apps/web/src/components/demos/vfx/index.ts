import type { ComponentType } from 'react';
import { VenetianBlindsDemo } from './VenetianBlindsDemo';
import { RadialWipeDemo } from './RadialWipeDemo';
import { BlockDissolveDemo } from './BlockDissolveDemo';
import { LumaWipeDemo } from './LumaWipeDemo';
import { LensFlareDemo } from './LensFlareDemo';
import { HighlightBloomDemo } from './HighlightBloomDemo';
import { EdgeDetectDemo } from './EdgeDetectDemo';
import { PosterizeDemo } from './PosterizeDemo';
import { DirectionalBlurDemo } from './DirectionalBlurDemo';
import { VignetteDemo } from './VignetteDemo';

export const VFX_ADDITION_DEMOS: Record<string, ComponentType> = {
  'mg-feathered-vignette': VignetteDemo,
  'mg-horizontal-directional-blur': DirectionalBlurDemo,
  'mg-channel-posterize': PosterizeDemo,
  'mg-laplacian-edge-detect': EdgeDetectDemo,
  'mg-venetian-blinds-transition': VenetianBlindsDemo,
  'mg-clockwise-radial-wipe': RadialWipeDemo,
  'mg-block-dissolve-transition': BlockDissolveDemo,
  'mg-luma-gradient-wipe': LumaWipeDemo,
  'mg-optical-lens-flare': LensFlareDemo,
  'mg-highlight-bloom': HighlightBloomDemo,
};
