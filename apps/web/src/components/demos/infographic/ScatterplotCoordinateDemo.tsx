import { useLocale } from '../../../i18n/LocaleContext';
import type { CSSProperties } from 'react';

const SAMPLES = [
  { label: 'demo.additions.infographic.scatterplot.sampleA', minutes: 5, score: 20 },
  { label: 'demo.additions.infographic.scatterplot.sampleB', minutes: 15, score: 55 },
  { label: 'demo.additions.infographic.scatterplot.sampleC', minutes: 25, score: 35 },
  { label: 'demo.additions.infographic.scatterplot.sampleD', minutes: 35, score: 75 },
  { label: 'demo.additions.infographic.scatterplot.sampleE', minutes: 45, score: 50 },
  { label: 'demo.additions.infographic.scatterplot.sampleF', minutes: 55, score: 90 },
] as const;

export function ScatterplotCoordinateDemo() {
  const { t } = useLocale();
  return (
    <div className="infographic-demo">
      <div className="ig-scatterplot" role="img" aria-label={t('demo.additions.infographic.scatterplot.chart', { description: SAMPLES.map(sample => t('demo.additions.infographic.scatterplot.item', { label: t(sample.label), minutes: sample.minutes, score: sample.score })).join(', ') })}>
        <div className="ig-scatterplot-content" aria-hidden="true">
          <span className="ig-scatterplot-y-title">{t('demo.additions.infographic.scatterplot.score')}</span>
          <div className="ig-scatterplot-y-axis"><span>100</span><span>50</span><span>0</span></div>
          <div className="ig-scatterplot-plot">
            {SAMPLES.map((sample, index) => <span className="ig-scatterplot-point" key={sample.label} style={{ left: `${sample.minutes / 60 * 100}%`, bottom: `${sample.score}%`, '--ig-scatterplot-delay': `${index * 120}ms` } as CSSProperties}>
              <i /><span>{t(sample.label)}</span>
            </span>)}
          </div>
          <div className="ig-scatterplot-x-axis"><span>0</span><span>30</span><span>60</span></div>
          <div className="ig-scatterplot-x-title">{t('demo.additions.infographic.scatterplot.time')}</div>
        </div>
      </div>
    </div>
  );
}
