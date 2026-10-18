import { useId, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function PointLightSurfaceDemo() {
  const { t } = useLocale();
  const [lightX, setLightX] = useState(132);
  const id = useId();
  return <div className="shader-demo sd-surface-light-demo">
    <div className="sd-scene">
      <svg id={`${id}-scene`} className="sd-surface-light-svg" viewBox="0 0 264 144" preserveAspectRatio="none" role="img" aria-label={t('demo.additions.shader.surfaceScene')}>
        <defs>
          <filter id={id} filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" x={0} y={0} width={264} height={144}>
            <feTurbulence type="fractalNoise" baseFrequency=".025 .04" numOctaves={2} seed={5} />
            <feGaussianBlur stdDeviation={1} result="bumps" />
            <feSpecularLighting className="sd-surface-specular" in="bumps" surfaceScale={12} specularConstant={1.2} specularExponent={16} result="light">
              <fePointLight x={lightX} y={56} z={64} />
            </feSpecularLighting>
            <feComposite in="light" in2="SourceAlpha" operator="in" />
          </filter>
        </defs>
        <rect width={264} height={144} filter={`url(#${id})`} />
      </svg>
    </div>
    <label className="sd-range-control">{t('demo.additions.shader.light')}<input className="sd-range" type="range" aria-label={t('demo.additions.shader.surfacePosition')} aria-controls={`${id}-scene`} min={12} max={252} step={1} value={lightX} onChange={event => setLightX(Number(event.currentTarget.value))} /></label>
  </div>;
}
