import type { ComponentType } from 'react';
import { DisclosureSidebarDemo } from './DisclosureSidebarDemo';
import { PaginatedListDemo } from './PaginatedListDemo';
import { BottomNavigationDemo } from './BottomNavigationDemo';
import { ResponsiveHeaderDemo } from './ResponsiveHeaderDemo';
import { InitialIndexDemo } from './InitialIndexDemo';
import { VisitHistoryDemo } from './VisitHistoryDemo';
import { KeyboardTreeDemo } from './KeyboardTreeDemo';
import { GroupedMegaMenuDemo } from './GroupedMegaMenuDemo';
import { PriorityOverflowDemo } from './PriorityOverflowDemo';
import { SkipNavigationDemo } from './SkipNavigationDemo';

export const NAV_ADDITION_DEMOS: Record<string, ComponentType> = {
  'ly-disclosure-sidebar-nav': DisclosureSidebarDemo,
  'ly-paginated-document-list': PaginatedListDemo,
  'ly-bottom-destination-nav': BottomNavigationDemo,
  'ly-responsive-header-menu': ResponsiveHeaderDemo,
  'ly-initial-index-nav': InitialIndexDemo,
  'ly-visit-history-nav': VisitHistoryDemo,
  'ly-keyboard-file-tree': KeyboardTreeDemo,
  'ly-grouped-mega-navigation': GroupedMegaMenuDemo,
  'ly-priority-overflow-nav': PriorityOverflowDemo,
  'ly-skip-to-content-nav': SkipNavigationDemo,
};
