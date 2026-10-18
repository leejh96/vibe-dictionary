import { useLocale } from '../../../i18n/LocaleContext';
const SUMMARY = { low: 10, q1: 25, median: 50, q3: 75, high: 90 };
const STATISTICS = [
  { label: 'demo.additions.infographic.boxplot.max', value: SUMMARY.high },
  { label: 'demo.additions.infographic.boxplot.q3', value: SUMMARY.q3 },
  { label: 'demo.additions.infographic.boxplot.median', value: SUMMARY.median },
  { label: 'demo.additions.infographic.boxplot.q1', value: SUMMARY.q1 },
  { label: 'demo.additions.infographic.boxplot.min', value: SUMMARY.low },
] as const;

export function BoxPlotSummaryDemo() {
  const { t } = useLocale();
  return (
    <div className="infographic-demo">
      <div className="ig-boxplot" role="img" aria-label={t('demo.additions.infographic.boxplot.chart', SUMMARY)}>
        <div className="ig-boxplot-axis" aria-hidden="true"><span>100</span><span>50</span><span>0</span></div>
        <div className="ig-boxplot-plot" aria-hidden="true">
          <span className="ig-boxplot-whisker" style={{ bottom: `${SUMMARY.low}%`, height: `${SUMMARY.high - SUMMARY.low}%` }} />
          <span className="ig-boxplot-box" style={{ bottom: `${SUMMARY.q1}%`, height: `${SUMMARY.q3 - SUMMARY.q1}%` }} />
          <span className="ig-boxplot-median" style={{ bottom: `${SUMMARY.median}%` }} />
          {STATISTICS.map(statistic => <span className="ig-boxplot-statistic" key={statistic.label} style={{ bottom: `${statistic.value}%` }}><span>{t(statistic.label)}</span><span>{statistic.value}</span></span>)}
        </div>
      </div>
    </div>
  );
}
