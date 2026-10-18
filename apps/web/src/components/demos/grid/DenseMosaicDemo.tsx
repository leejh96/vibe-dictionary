import { useId, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function DenseMosaicDemo() {
  const { t } = useLocale();
  const [dense, setDense] = useState(true);
  const id = useId();

  return <div className="grid-demo gr-dense-demo">
    <div className="gr-dense-scene">
      <div id={id} className="gr-dense-grid" data-dense={dense} role="img" aria-label={t('demo.additions.grid.mosaicDescription')}>
        <svg className="gr-dense-tile" viewBox="0 0 80 32" data-wide="true" aria-hidden="true"><circle cx="40" cy="16" r="8" /><circle cx="40" cy="16" r="3" /></svg>
        <svg className="gr-dense-tile" viewBox="0 0 80 32" data-wide="true" aria-hidden="true"><path d="M26 24 42 8M38 24 54 8" /></svg>
        <svg className="gr-dense-tile" viewBox="0 0 80 32" aria-hidden="true"><path d="M32 22V14M40 22V8M48 22V11" /></svg>
        <svg className="gr-dense-tile" viewBox="0 0 80 32" aria-hidden="true"><path d="m40 6 10 10-10 10-10-10Z" /></svg>
        <svg className="gr-dense-tile" viewBox="0 0 80 32" data-wide="true" aria-hidden="true"><path d="M22 16q6-12 12 0t12 0 12 0" /></svg>
        <svg className="gr-dense-tile" viewBox="0 0 80 32" aria-hidden="true"><circle cx="30" cy="16" r="3" /><circle cx="40" cy="16" r="3" /><circle cx="50" cy="16" r="3" /></svg>
      </div>
    </div>
    <label className="gr-packing-control"><input type="checkbox" checked={dense} aria-label={t('demo.additions.grid.fillGridGaps')} aria-controls={id} onChange={event => setDense(event.currentTarget.checked)} />{t('demo.additions.grid.fillGaps')}</label>
  </div>;
}
