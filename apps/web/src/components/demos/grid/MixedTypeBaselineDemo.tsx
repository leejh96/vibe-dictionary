import { useId, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function MixedTypeBaselineDemo() {
  const { t } = useLocale();
  const [aligned, setAligned] = useState(true);
  const id = useId();

  return <div className="grid-demo gr-baseline-demo">
    <div className="gr-baseline-scene">
      <div id={id} className="gr-baseline-grid" data-aligned={aligned} role="group" aria-label={t('demo.additions.grid.metricsGroup')}>
        <p><strong>{t('demo.additions.grid.metricValue', { value: 12 })}</strong><span>{t('demo.additions.grid.metricMembers')}</span></p>
        <p><strong>{t('demo.additions.grid.metricValue', { value: 24 })}</strong><span>{t('demo.additions.grid.metricDocuments')}</span></p>
        <p><strong>{t('demo.additions.grid.metricValue', { value: 8 })}</strong><span>{t('demo.additions.grid.metricTasks')}</span></p>
      </div>
    </div>
    <label className="gr-alignment-control"><input type="checkbox" checked={aligned} aria-label={t('demo.additions.grid.alignMetricBaselines')} aria-controls={id} onChange={event => setAligned(event.currentTarget.checked)} />{t('demo.additions.grid.alignBaselines')}</label>
  </div>;
}
