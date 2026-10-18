import type { ComponentType } from 'react';
import { CondensationPackshotDemo } from './CondensationPackshotDemo';
import { HelicalCapDemo } from './HelicalCapDemo';
import { AtomizerSprayDemo } from './AtomizerSprayDemo';
import { ProtectiveFilmDemo } from './ProtectiveFilmDemo';
import { BeveragePourDemo } from './BeveragePourDemo';
import { PackagingSleeveDemo } from './PackagingSleeveDemo';
import { StopMotionFlatlayDemo } from './StopMotionFlatlayDemo';
import { ProductCalloutDemo } from './ProductCalloutDemo';
import { CinemagraphDemo } from './CinemagraphDemo';
import { ProductSectionDemo } from './ProductSectionDemo';

export const PROMO_ADDITION_DEMOS: Record<string, ComponentType> = {
  'vd-condensation-packshot': CondensationPackshotDemo,
  'vd-helical-cap-unscrew': HelicalCapDemo,
  'vd-fragrance-atomizer-spray': AtomizerSprayDemo,
  'vd-protective-film-peel': ProtectiveFilmDemo,
  'vd-beverage-pour-shot': BeveragePourDemo,
  'vd-packaging-sleeve-reveal': PackagingSleeveDemo,
  'vd-stop-motion-flatlay': StopMotionFlatlayDemo,
  'vd-product-feature-callout': ProductCalloutDemo,
  'vd-selective-motion-cinemagraph': CinemagraphDemo,
  'vd-product-cross-section': ProductSectionDemo,
};
