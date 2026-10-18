import { useLocale } from '../../../i18n/LocaleContext';
import { useId, useState } from 'react';

const SAMPLES = [4, 9, 12, 16, 17, 18, 21, 22, 23, 27, 28, 31, 34, 36, 38, 40];

export function HistogramRebinDemo() {
  const { t } = useLocale();
  const [binWidth, setBinWidth] = useState(10);
  const id = useId();
  const bins = Array.from({ length: 40 / binWidth }, (_, index) => ({ start: index * binWidth, count: 0 }));
  for (const value of SAMPLES) bins[Math.min(Math.floor(value / binWidth), bins.length - 1)].count++;
  const description = bins.map((bin, index) => t(index === bins.length - 1 ? 'demo.additions.infographic.histogram.lastBin' : 'demo.additions.infographic.histogram.bin', { start: bin.start, end: bin.start + binWidth, count: bin.count })).join(', ');

  return (
    <div className="infographic-demo ig-histogram-demo">
      <div id={`${id}-chart`} className="ig-histogram" role="img" aria-label={t('demo.additions.infographic.histogram.chart', { width: binWidth, description })}>
        <div className="ig-histogram-count-axis" aria-hidden="true"><span>12</span><span>6</span><span>0</span></div>
        <div className="ig-histogram-plot" aria-hidden="true" style={{ gridTemplateColumns: `repeat(${bins.length}, minmax(0, 1fr))` }}>
          {bins.map(bin => <div className="ig-histogram-bin" key={bin.start}>
            <span className="ig-histogram-bar" style={{ height: `${bin.count / 12 * 100}%` }}><span>{bin.count}</span></span>
          </div>)}
        </div>
        <div className="ig-histogram-value-axis" aria-hidden="true">{Array.from({ length: bins.length + 1 }, (_, index) => <span key={index * binWidth}>{index * binWidth}</span>)}</div>
      </div>
      <label className="ig-histogram-control" htmlFor={`${id}-width`}>
        <span>{t('demo.additions.infographic.histogram.width')}</span>
        <select id={`${id}-width`} aria-controls={`${id}-chart`} value={binWidth} onChange={event => setBinWidth(Number(event.target.value))}>
          <option value={10}>10</option><option value={20}>20</option>
        </select>
      </label>
    </div>
  );
}
