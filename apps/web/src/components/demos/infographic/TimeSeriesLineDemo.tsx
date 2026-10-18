import { useLocale } from '../../../i18n/LocaleContext';
const MEASUREMENTS = [
  { minute: 540, label: 'demo.additions.infographic.timeSeries.hour09', value: 20 },
  { minute: 600, label: 'demo.additions.infographic.timeSeries.hour10', value: 60 },
  { minute: 720, label: 'demo.additions.infographic.timeSeries.hour12', value: 35 },
  { minute: 900, label: 'demo.additions.infographic.timeSeries.hour15', value: 85 },
] as const;
const START = MEASUREMENTS[0].minute;
const DURATION = MEASUREMENTS[MEASUREMENTS.length - 1].minute - START;
const POINTS = MEASUREMENTS.map(measurement => ({ ...measurement, x: (measurement.minute - START) / DURATION * 100 }));
const PATH = POINTS.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x} ${100 - point.value}`).join(' ');

export function TimeSeriesLineDemo() {
  const { t } = useLocale();
  return (
    <div className="infographic-demo">
      <div className="ig-time-line" role="img" aria-label={t('demo.additions.infographic.timeSeries.chart', { description: MEASUREMENTS.map(measurement => t('demo.additions.infographic.timeSeries.measurement', { time: t(measurement.label), count: measurement.value })).join(', ') })}>
        <div className="ig-time-line-content" aria-hidden="true">
          <span className="ig-time-line-unit">{t('demo.additions.infographic.timeSeries.unit')}</span>
          <div className="ig-time-line-y-axis"><span>100</span><span>50</span><span>0</span></div>
          <div className="ig-time-line-plot">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false"><path d={PATH} fill="none" stroke="currentColor" strokeWidth={2.5} strokeDasharray="none" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" /></svg>
            {POINTS.map(point => <span className="ig-time-line-point" key={point.minute} style={{ left: `${point.x}%`, bottom: `${point.value}%` }}><i /><span>{point.value}</span></span>)}
          </div>
          <div className="ig-time-line-x-axis"><span>{t('demo.additions.infographic.timeSeries.hour09')}</span><span>{t('demo.additions.infographic.timeSeries.hour12')}</span><span>{t('demo.additions.infographic.timeSeries.hour15')}</span></div>
        </div>
      </div>
    </div>
  );
}
