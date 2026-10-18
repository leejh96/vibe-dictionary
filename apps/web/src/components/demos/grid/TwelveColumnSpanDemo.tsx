import { useId, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function TwelveColumnSpanDemo() {
  const { t } = useLocale();
  const [span, setSpan] = useState(7);
  const id = useId();

  return <div className="grid-demo gr-span-demo">
    <div className="gr-span-scene">
      <div id={id} className="gr-span-grid" role="img" aria-label={t('demo.additions.grid.spanLayout', { span })}>
        <svg className="gr-span-tile gr-span-primary" style={{ gridColumn: `span ${span}` }} viewBox="0 0 80 40" aria-hidden="true"><path d="m26 28 10-14 10 14Zm12 0 10-10 9 10Z" /><circle cx="53" cy="13" r="3" /></svg>
        <svg className="gr-span-tile" style={{ gridColumn: `span ${12 - span}` }} viewBox="0 0 80 40" aria-hidden="true"><path d="M28 12h24M28 20h24M28 28h15" /></svg>
        <svg className="gr-span-tile gr-span-support" viewBox="0 0 80 40" aria-hidden="true"><circle cx="40" cy="20" r="8" /></svg>
        <svg className="gr-span-tile gr-span-support" viewBox="0 0 80 40" aria-hidden="true"><rect x="32" y="12" width="16" height="16" rx="2" /></svg>
        <svg className="gr-span-tile gr-span-support" viewBox="0 0 80 40" aria-hidden="true"><path d="m40 11 10 18H30Z" /></svg>
        {Array.from({ length: 12 }, (_, index) => <span key={index} className="gr-span-guide" aria-hidden="true" />)}
      </div>
    </div>
    <label className="gr-width-control">{t('demo.additions.grid.primaryWidth')}<input type="range" min={4} max={8} step={1} value={span} aria-label={t('demo.additions.grid.primaryColumnWidth')} aria-valuetext={t('demo.additions.grid.columnValue', { span })} aria-controls={id} onChange={event => setSpan(Number(event.currentTarget.value))} /></label>
  </div>;
}
