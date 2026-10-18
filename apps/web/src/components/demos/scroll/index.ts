import type { ComponentType } from 'react';
import { StickyGroupHeadersDemo } from './StickyGroupHeadersDemo';
import { FrozenTableDemo } from './FrozenTableDemo';
import { ScrollEdgeShadowsDemo } from './ScrollEdgeShadowsDemo';
import { IndependentScrollPanesDemo } from './IndependentScrollPanesDemo';
import { NestedCollectionsDemo } from './NestedCollectionsDemo';
import { ReadingProgressDemo } from './ReadingProgressDemo';
import { ProportionalScrollSyncDemo } from './ProportionalScrollSyncDemo';
import { PrependScrollAnchorDemo } from './PrependScrollAnchorDemo';
import { FixedRowVirtualScrollDemo } from './FixedRowVirtualScrollDemo';
import { StableScrollbarGutterDemo } from './StableScrollbarGutterDemo';

export const SCROLL_ADDITION_DEMOS: Record<string, ComponentType> = {
  'ly-sticky-group-headers': StickyGroupHeadersDemo,
  'ly-frozen-table-axes': FrozenTableDemo,
  'ly-scroll-edge-shadows': ScrollEdgeShadowsDemo,
  'ly-independent-scroll-panes': IndependentScrollPanesDemo,
  'ly-nested-axis-collections': NestedCollectionsDemo,
  'ly-reading-scroll-progress': ReadingProgressDemo,
  'ly-proportional-scroll-sync': ProportionalScrollSyncDemo,
  'ly-prepend-scroll-anchor': PrependScrollAnchorDemo,
  'ly-fixed-row-virtual-scroll': FixedRowVirtualScrollDemo,
  'ly-stable-scrollbar-gutter': StableScrollbarGutterDemo,
};
