import { useId, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';
import { Layers } from 'lucide-react';

export function BlendLightsDemo() {
  const { t } = useLocale();
  const [blended, setBlended] = useState(true);
  const id = useId();
  return <div className="shader-demo sd-blend-demo">
    <div className="sd-scene sd-blend-scene">
      <svg id={id} className="sd-blend-lights" data-blended={blended} viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.shader.blendScene')}>
        <circle cx={112} cy={56} r={34} /><circle cx={152} cy={56} r={34} /><circle cx={132} cy={88} r={34} />
      </svg>
    </div>
    <button className="sd-blend-toggle" type="button" aria-label={t('demo.additions.shader.blendControl')} aria-controls={id} aria-pressed={blended} onClick={() => setBlended(value => !value)}><Layers size={18} aria-hidden="true" />{t('demo.additions.shader.blend')}</button>
  </div>;
}
