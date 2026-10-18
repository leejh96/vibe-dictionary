import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function DitherGradientDemo() {
  const { t } = useLocale();
  const id = useId();
  return <div className="shader-demo">
    <div className="sd-scene">
      <svg className="sd-dither-svg" viewBox="0 0 264 144" preserveAspectRatio="none" role="img" aria-label={t('demo.additions.shader.ditherScene')}>
        <defs>
          <linearGradient id={`${id}-ramp`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#000" /><stop offset="100%" stopColor="#fff" />
          </linearGradient>
          <filter id={id} filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" x={0} y={0} width={264} height={144} colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency={.7} numOctaves={1} seed={11} result="rawNoise" />
            <feComponentTransfer in="rawNoise" result="noise">
              <feFuncR type="linear" slope={3} intercept={-1} /><feFuncA type="linear" slope={0} intercept={1} />
            </feComponentTransfer>
            <feComposite in="SourceGraphic" in2="noise" operator="arithmetic" k1={0} k2={1} k3={1} k4={-.5} result="mixed" />
            <feComponentTransfer in="mixed" result="threshold"><feFuncR type="discrete" tableValues="0 1" /></feComponentTransfer>
            <feColorMatrix in="threshold" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0" result="dots" />
            <feFlood className="sd-dither-ink" result="ink" />
            <feComposite in="ink" in2="dots" operator="in" />
          </filter>
        </defs>
        <rect width={264} height={144} fill={`url(#${id}-ramp)`} filter={`url(#${id})`} />
      </svg>
    </div>
  </div>;
}
