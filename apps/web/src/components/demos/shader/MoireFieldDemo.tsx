import { useId, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function MoireFieldDemo() {
  const { t } = useLocale();
  const [offset, setOffset] = useState(24);
  const id = useId();
  return <div className="shader-demo sd-moire-demo">
    <div id={id} className="sd-scene" role="img" aria-label={t('demo.additions.shader.moireScene')}>
      <span className="sd-moire-rings" aria-hidden="true" />
      <span className="sd-moire-rings" aria-hidden="true" style={{ transform: `translateX(${offset}px)` }} />
    </div>
    <label className="sd-range-control">{t('demo.additions.shader.offset')}<input className="sd-range" type="range" aria-label={t('demo.additions.shader.moireOffset')} aria-controls={id} min={0} max={48} step={1} value={offset} onChange={event => setOffset(Number(event.currentTarget.value))} /></label>
  </div>;
}
