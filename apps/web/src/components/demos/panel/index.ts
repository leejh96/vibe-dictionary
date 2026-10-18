import type { ComponentType } from 'react';
import { SortableTableDemo } from './SortableTableDemo';
import { PropertyInspectorDemo } from './PropertyInspectorDemo';
import { ExpandableRowsDemo } from './ExpandableRowsDemo';
import { ActivityTimelineDemo } from './ActivityTimelineDemo';
import { CodeDiffDemo } from './CodeDiffDemo';
import { JsonTreeDemo } from './JsonTreeDemo';
import { TimeGridAgendaDemo } from './TimeGridAgendaDemo';
import { ComparisonMatrixDemo } from './ComparisonMatrixDemo';
import { FileViewModeDemo } from './FileViewModeDemo';
import { DualListTransferDemo } from './DualListTransferDemo';

export const PANEL_ADDITION_DEMOS: Record<string, ComponentType> = {
  'ly-dual-list-transfer': DualListTransferDemo,
  'ly-sortable-data-table': SortableTableDemo,
  'ly-selection-property-inspector': PropertyInspectorDemo,
  'ly-expandable-data-rows': ExpandableRowsDemo,
  'ly-activity-timeline': ActivityTimelineDemo,
  'ly-context-code-diff': CodeDiffDemo,
  'ly-json-structure-tree': JsonTreeDemo,
  'ly-time-grid-agenda': TimeGridAgendaDemo,
  'ly-transposable-comparison-matrix': ComparisonMatrixDemo,
  'ly-file-list-grid-view': FileViewModeDemo,
};
