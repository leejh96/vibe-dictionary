import { useDemoNumber } from '../../../hooks/useDemoAutoplay';
import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

const BLOCK_RANKS = [
  1, 3, 60, 50, 54, 0, 38, 55, 20, 29, 5,
  30, 46, 34, 13, 19, 53, 45, 28, 43, 11, 25,
  2, 31, 7, 61, 33, 56, 36, 37, 17, 35, 24,
  18, 41, 48, 15, 4, 63, 62, 47, 12, 52, 57,
  23, 51, 44, 26, 39, 6, 21, 59, 8, 64, 9,
  65, 49, 10, 27, 22, 14, 16, 40, 58, 32, 42,
];

export function BlockDissolveDemo() {
  const { t } = useLocale();
  const id = useId();
  const [progress, setProgress] = useDemoNumber(50, 0, 100, 1);
  const removed = Math.floor(progress * BLOCK_RANKS.length / 100);
  return <div className="vfx-demo">
    <svg id={`${id}-scene`} className="vfx-scene" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.vfx.block.scene')}>
      <defs>
        <clipPath id={`${id}-blocks`} clipPathUnits="userSpaceOnUse">
          {BLOCK_RANKS.map((rank, index) => <rect key={index} x={index % 11 * 24} y={Math.floor(index / 11) * 24} width={rank < removed ? 0 : 24} height={24} shapeRendering="crispEdges" />)}
        </clipPath>
      </defs>
      <g className="vfx-block-planet" aria-hidden="true">
        <rect width={264} height={144} className="vfx-block-cool-sky" />
        <circle cx={132} cy={72} r={38} className="vfx-block-world" />
        <path d="M105 50q24 20 52 4m-62 20q36 24 71 4m-57 20q21 11 42 2" className="vfx-block-bands" />
        <ellipse cx={132} cy={72} rx={74} ry={19} transform="rotate(-24 132 72)" className="vfx-block-orbit" />
        <circle cx={211} cy={33} r={5} className="vfx-block-satellite" />
        <circle cx={48} cy={110} r={3} className="vfx-block-satellite" />
      </g>
      <g className="vfx-block-poster" clipPath={`url(#${id}-blocks)`} aria-hidden="true">
        <rect width={264} height={144} className="vfx-warm-sky" />
        <path d="M-10 16 80 106m104-68 90 90M-10 44l62 62m160-68 62 62" className="vfx-block-rays" />
        <circle cx={132} cy={72} r={48} className="vfx-block-disc" />
        <circle cx={132} cy={72} r={28} className="vfx-block-core" />
      </g>
    </svg>
    <label className="vfx-range-control">
      <span>{t('demo.additions.vfx.block.label')}</span>
      <input type="range" min={0} max={100} step={1} value={progress} aria-label={t('demo.additions.vfx.block.input')} aria-valuetext={t('demo.additions.vfx.percent', { value: progress })} aria-controls={`${id}-scene`} onChange={event => setProgress(Number(event.currentTarget.value))} />
    </label>
  </div>;
}
