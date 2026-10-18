import type { CSSProperties } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function FadedGridDemo() {
  const { t } = useLocale();
  return <div className="shader-demo">
    <div className="sd-scene sd-faded-grid" role="img" aria-label={t('demo.additions.shader.gridScene')} />
  </div>;
}

export function MeteorShowerDemo() {
  const { t } = useLocale();
  return <div className="shader-demo">
    <div className="sd-scene sd-meteor-field" role="img" aria-label={t('demo.additions.shader.meteorScene')}>
      <span className="sd-meteor" aria-hidden="true" /><span className="sd-meteor" aria-hidden="true" /><span className="sd-meteor" aria-hidden="true" />
    </div>
  </div>;
}

export function RisingLightParticlesDemo() {
  const { t } = useLocale();
  return <div className="shader-demo">
    <div className="sd-scene" role="img" aria-label={t('demo.additions.shader.particlesScene')}>
      {Array.from({ length: 8 }, (_, index) => <span key={index} className="sd-rising-particle" aria-hidden="true" style={{ left: `${10 + index * 11}%`, '--sd-rest-y': `${15 + index * 23 % 70}%`, animationDuration: `${6 + index % 3}s`, animationDelay: `${-((index * 3) % 8) * .8}s` } as CSSProperties} />)}
    </div>
  </div>;
}
