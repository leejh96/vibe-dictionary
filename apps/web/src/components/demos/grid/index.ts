import type { ComponentType } from 'react';
import { IntrinsicGridDemo } from './IntrinsicGridDemo';
import { SubgridCardsDemo } from './SubgridCardsDemo';
import { DenseMosaicDemo } from './DenseMosaicDemo';
import { ContainerMediaCardDemo } from './ContainerMediaCardDemo';
import { NamedAreasWorkspaceDemo } from './NamedAreasWorkspaceDemo';
import { FullBleedEditorialDemo } from './FullBleedEditorialDemo';
import { AspectRatioGalleryDemo } from './AspectRatioGalleryDemo';
import { TwelveColumnSpanDemo } from './TwelveColumnSpanDemo';
import { IntrinsicLabelGridDemo } from './IntrinsicLabelGridDemo';
import { MixedTypeBaselineDemo } from './MixedTypeBaselineDemo';

export const GRID_ADDITION_DEMOS: Record<string, ComponentType> = {
  'ly-intrinsic-auto-fit': IntrinsicGridDemo,
  'ly-subgrid-aligned-cards': SubgridCardsDemo,
  'ly-dense-mosaic-packing': DenseMosaicDemo,
  'ly-container-query-media-card': ContainerMediaCardDemo,
  'ly-named-areas-workspace': NamedAreasWorkspaceDemo,
  'ly-full-bleed-editorial': FullBleedEditorialDemo,
  'ly-aspect-ratio-gallery': AspectRatioGalleryDemo,
  'ly-twelve-column-span': TwelveColumnSpanDemo,
  'ly-intrinsic-label-grid': IntrinsicLabelGridDemo,
  'ly-mixed-type-baseline-grid': MixedTypeBaselineDemo,
};
