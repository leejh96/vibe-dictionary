import { useLocale } from '../../../i18n/LocaleContext';
import type { CSSProperties } from 'react';

const PAIRS = [
  { label: 'demo.additions.infographic.dumbbell.north', before: 25, after: 65 },
  { label: 'demo.additions.infographic.dumbbell.mid', before: 45, after: 60 },
  { label: 'demo.additions.infographic.dumbbell.south', before: 70, after: 40 },
] as const;

export function DumbbellChangeDemo() {
  const { t } = useLocale();
  return (
    <div className="infographic-demo">
      <div className="ig-dumbbell" role="img" aria-label={t('demo.additions.infographic.dumbbell.chart')}>
        <div className="ig-dumbbell-legend" aria-hidden="true"><span><i />{t('demo.additions.infographic.dumbbell.before')}</span><span><i />{t('demo.additions.infographic.dumbbell.after')}</span></div>
        <div aria-hidden="true">
          {PAIRS.map((pair, index) => (
            <div className="ig-dumbbell-row" key={pair.label}>
              <span>{t(pair.label)}</span>
              <div className="ig-dumbbell-track" style={{ '--ig-before': `${pair.before}%`, '--ig-after': `${pair.after}%`, '--ig-pair-delay': `${index * 200}ms` } as CSSProperties}>
                <span className="ig-dumbbell-link" style={{ left: `${Math.min(pair.before, pair.after)}%`, width: `${Math.abs(pair.after - pair.before)}%`, transformOrigin: pair.after >= pair.before ? 'left center' : 'right center' }} />
                <span className="ig-dumbbell-before"><i /><span>{pair.before}</span></span>
                <span className="ig-dumbbell-after"><i /><span>{pair.after}</span></span>
              </div>
            </div>
          ))}
        </div>
        <div className="ig-dumbbell-axis" aria-hidden="true"><span>0</span><span>50</span><span>100</span></div>
      </div>
    </div>
  );
}
