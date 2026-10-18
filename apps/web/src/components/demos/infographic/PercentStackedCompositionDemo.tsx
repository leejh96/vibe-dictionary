import { useLocale } from '../../../i18n/LocaleContext';
import type { CSSProperties } from 'react';

const CHANNELS = ['demo.additions.infographic.percent.direct', 'demo.additions.infographic.percent.search', 'demo.additions.infographic.percent.referral'] as const;
const MONTHS = ([
  { label: 'demo.additions.infographic.percent.january', counts: [60, 100, 40] },
  { label: 'demo.additions.infographic.percent.february', counts: [160, 140, 100] },
  { label: 'demo.additions.infographic.percent.march', counts: [60, 135, 105] },
] as const).map(month => ({ ...month, total: month.counts.reduce((sum, value) => sum + value, 0) }));

export function PercentStackedCompositionDemo() {
  const { t } = useLocale();
  return (
    <div className="infographic-demo">
      <div className="ig-percent-stack" role="img" aria-label={t('demo.additions.infographic.percent.chart', { description: MONTHS.map(month => t('demo.additions.infographic.percent.month', { label: t(month.label), total: month.total, channels: month.counts.map((count, index) => t('demo.additions.infographic.percent.channel', { label: t(CHANNELS[index]), count, percent: count / month.total * 100 })).join(', ') })).join('; ') })}>
        <div aria-hidden="true">
          <div className="ig-percent-stack-legend">{CHANNELS.map((channel, index) => <span key={channel}><i className={`ig-percent-stack-tone-${index}`} />{t(channel)}</span>)}</div>
          <div className="ig-percent-stack-rows">
            {MONTHS.map((month, index) => <div className="ig-percent-stack-row" key={month.label} style={{ '--ig-percent-stack-delay': `${index * 160}ms`, '--ig-percent-stack-label-delay': `${600 + index * 160}ms` } as CSSProperties}>
              <span>{t(month.label)}</span>
              <div className="ig-percent-stack-track"><div className="ig-percent-stack-bar">
                {month.counts.map((count, channelIndex) => {
                  const percent = count / month.total * 100;
                  return <span className={`ig-percent-stack-segment ig-percent-stack-tone-${channelIndex}`} key={CHANNELS[channelIndex]} style={{ width: `${percent}%` }}><span>{percent}%</span></span>;
                })}
              </div></div>
            </div>)}
          </div>
          <div className="ig-percent-stack-axis"><span>0</span><span>50</span><span>100%</span></div>
        </div>
      </div>
    </div>
  );
}
