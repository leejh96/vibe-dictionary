import { useDemoNumber } from '../../../hooks/useDemoAutoplay';
import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function ReflectionTypeDemo() {
  const { t } = useLocale();
  const [ripple, setRipple] = useDemoNumber(8, 0, 14, 1);
  const id = useId();
  const glyphId = `${id}-glyph`;
  const filterId = `${id}-ripple`;
  const fadeId = `${id}-fade`;
  const maskId = `${id}-mask`;

  return <div className="kinetic-demo kt-reflect-demo">
    <svg id={id} className="kt-reflect-scene" viewBox="0 0 264 104" role="img" aria-label={t('demo.additions.kinetic.reflectionScene')}>
      <defs>
        <text id={glyphId} x={132} y={38} textAnchor="middle">{t('demo.additions.kinetic.reflectSample')}</text>
        <linearGradient id={fadeId} gradientUnits="userSpaceOnUse" x1={0} y1={52} x2={0} y2={104}>
          <stop offset="0" stopColor="white" stopOpacity={.65} /><stop offset="1" stopColor="white" stopOpacity={0} />
        </linearGradient>
        <mask id={maskId} maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" x={0} y={52} width={264} height={52} style={{ maskType: 'alpha' }}>
          <rect x={0} y={52} width={264} height={52} fill={`url(#${fadeId})`} />
        </mask>
        <filter id={filterId} filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" x={-14} y={0} width={292} height={104} colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency=".005 .12" numOctaves={1} seed={5} result="noise" />
          <feComponentTransfer in="noise" result="wave"><feFuncA type="linear" slope={0} intercept={.5} /></feComponentTransfer>
          <feDisplacementMap in="SourceGraphic" in2="wave" scale={ripple} xChannelSelector="R" yChannelSelector="A" />
        </filter>
      </defs>
      <g aria-hidden="true">
        <use href={`#${glyphId}`} />
        <g mask={`url(#${maskId})`}><g filter={`url(#${filterId})`}><use href={`#${glyphId}`} transform="translate(0 104) scale(1 -1)" /></g></g>
      </g>
    </svg>
    <label className="kt-position-control">{t('demo.additions.kinetic.refractionLabel')}<input type="range" min={0} max={14} step={1} value={ripple} aria-label={t('demo.additions.kinetic.rippleStrength')} aria-valuetext={ripple === 0 ? t('demo.additions.kinetic.noRipples') : t('demo.additions.kinetic.level', { value: ripple })} aria-controls={id} onChange={event => setRipple(Number(event.currentTarget.value))} /></label>
  </div>;
}
