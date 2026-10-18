import type { ComponentType } from 'react';
import { WaterfallContributionDemo } from './WaterfallContributionDemo';
import { DumbbellChangeDemo } from './DumbbellChangeDemo';
import { HistogramRebinDemo } from './HistogramRebinDemo';
import { BoxPlotSummaryDemo } from './BoxPlotSummaryDemo';
import { TreemapAreaDemo } from './TreemapAreaDemo';
import { ScatterplotCoordinateDemo } from './ScatterplotCoordinateDemo';
import { PercentStackedCompositionDemo } from './PercentStackedCompositionDemo';
import { TimeSeriesLineDemo } from './TimeSeriesLineDemo';
import { SankeyFlowDemo } from './SankeyFlowDemo';
import { RadarProfileDemo } from './RadarProfileDemo';

export const INFOGRAPHIC_ADDITION_DEMOS: Record<string, ComponentType> = {
  'vd-waterfall-contribution-reveal': WaterfallContributionDemo,
  'vd-dumbbell-paired-change': DumbbellChangeDemo,
  'vd-histogram-rebin-transition': HistogramRebinDemo,
  'vd-boxplot-five-number-reveal': BoxPlotSummaryDemo,
  'vd-treemap-hierarchy-area': TreemapAreaDemo,
  'vd-scatterplot-coordinate-reveal': ScatterplotCoordinateDemo,
  'vd-percent-stacked-composition': PercentStackedCompositionDemo,
  'vd-time-series-line-draw': TimeSeriesLineDemo,
  'vd-sankey-flow-conservation': SankeyFlowDemo,
  'vd-radar-profile-reveal': RadarProfileDemo,
};
