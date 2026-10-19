import { useDemoNumber } from '../../../hooks/useDemoAutoplay';
import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function EdgeDetectDemo() {
  const { t } = useLocale();
  const id = useId();
  const [strength, setStrength] = useDemoNumber(75, 0, 100, 1);
  const blend = strength / 100;
  return <div className="vfx-demo">
    <svg id={`${id}-scene`} className="vfx-scene vfx-edge-scene" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.vfx.edge.scene')}>
      <defs>
        <filter id={`${id}-edges`} filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" x={0} y={0} width={264} height={144} colorInterpolationFilters="sRGB">
          <feColorMatrix in="SourceGraphic" type="matrix" values=".2126 .7152 .0722 0 0  .2126 .7152 .0722 0 0  .2126 .7152 .0722 0 0  0 0 0 1 0" result="gray" />
          <feConvolveMatrix in="gray" order={3} kernelMatrix="-1 -1 -1 -1 8 -1 -1 -1 -1" divisor={1} bias={0} targetX={1} targetY={1} edgeMode="duplicate" preserveAlpha result="edges" />
          <feMorphology in="edges" operator="dilate" radius={.6} result="contours" />
          <feComposite in="SourceGraphic" in2="contours" operator="arithmetic" k1={0} k2={1 - blend} k3={blend} k4={0} />
        </filter>
      </defs>
      <g className="vfx-edge-source" filter={`url(#${id}-edges)`} aria-hidden="true">
        <rect width={264} height={144} fill="#14283a" />
        <circle cx={215} cy={31} r={12} fill="#ed967c" />
        <rect x={92} y={30} width={46} height={23} rx={7} fill="#7da7e8" />
        <rect x={64} y={44} width={136} height={64} rx={16} fill="#63c9c0" />
        <rect x={174} y={54} width={14} height={8} rx={2} fill="#f7dec3" />
        <circle cx={127} cy={76} r={26} fill="#f7dec3" />
        <circle cx={127} cy={76} r={17} fill="#485c8a" />
        <circle cx={122} cy={70} r={5} fill="#a5d8df" />
        <path d="M29 55h17v5H29Zm0 15h10v5H29Zm0 15h17v5H29Z" fill="#7da7e8" />
        <rect x={193} y={120} width={34} height={5} rx={2.5} fill="#ed967c" />
      </g>
    </svg>
    <label className="vfx-range-control">
      <span>{t('demo.additions.vfx.edge.label')}</span>
      <input type="range" min={0} max={100} step={1} value={strength} aria-label={t('demo.additions.vfx.edge.input')} aria-valuetext={t('demo.additions.vfx.percent', { value: strength })} aria-controls={`${id}-scene`} onChange={event => setStrength(Number(event.currentTarget.value))} />
    </label>
  </div>;
}
