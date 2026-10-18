import { useLocale } from '../../../i18n/LocaleContext';
import type { CSSProperties } from 'react';

const COLUMNS = [
  { label: 'demo.additions.infographic.waterfall.start', value: '80', start: 0, end: 80, tone: 'total' },
  { label: 'demo.additions.infographic.waterfall.inflow', value: '+40', start: 80, end: 120, tone: 'increase' },
  { label: 'demo.additions.infographic.waterfall.cost', value: '−30', start: 120, end: 90, tone: 'decrease' },
  { label: 'demo.additions.infographic.waterfall.total', value: '90', start: 0, end: 90, tone: 'total' },
] as const;

export function WaterfallContributionDemo() {
  const { t } = useLocale();
  return (
    <div className="infographic-demo">
      <div className="ig-waterfall" role="img" aria-label={t('demo.additions.infographic.waterfall.chart')}>
        <div className="ig-waterfall-axis" aria-hidden="true">
          <span>120</span><span>60</span><span>0</span>
        </div>
        <div className="ig-waterfall-plot" aria-hidden="true">
          {COLUMNS.map((column, index) => (
            <div key={column.label} className="ig-waterfall-column" style={{ '--ig-delay': `${index * 260}ms` } as CSSProperties}>
              <span className={`ig-waterfall-bar ig-waterfall-${column.tone}`} style={{
                bottom: `${Math.min(column.start, column.end) / 120 * 100}%`,
                height: `${Math.abs(column.end - column.start) / 120 * 100}%`,
              }} />
              <span className="ig-waterfall-value" style={{ bottom: `calc(${Math.max(column.start, column.end) / 120 * 100}% + 4px)` }}>{column.value}</span>
              {index < COLUMNS.length - 1 && <span className="ig-waterfall-connector" style={{ bottom: `${column.end / 120 * 100}%` }} />}
              <span className="ig-waterfall-label">{t(column.label)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
