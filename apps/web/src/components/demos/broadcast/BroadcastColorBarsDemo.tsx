import { useLocale } from '../../../i18n/LocaleContext';

const COLOR_BARS = ['#bfbfbf', '#bfbf00', '#00bfbf', '#00bf00', '#bf00bf', '#bf0000', '#0000bf'];
const ALIGNMENT_BARS = ['#0000bf', '#111111', '#bf00bf', '#111111', '#00bfbf', '#111111', '#bfbfbf'];
const LOWER_PATCHES = [
  { x: 0, width: 50, color: '#002448' },
  { x: 50, width: 50, color: '#ffffff' },
  { x: 100, width: 50, color: '#34124a' },
  { x: 150, width: 70, color: '#101010' },
  { x: 220, width: 20, color: '#050505' },
  { x: 240, width: 20, color: '#121212' },
  { x: 260, width: 20, color: '#262626' },
];

export function BroadcastColorBarsDemo() {
  const { t } = useLocale();
  return <div className="broadcast-demo">
    <svg className="bc-bars-scene" viewBox="0 0 280 160" role="img" aria-label={t('demo.additions.broadcast.barsScene')}>
      <g aria-hidden="true" shapeRendering="crispEdges">
        {COLOR_BARS.map((color, index) => <rect key={`color-${index}`} x={index * 40} y={0} width={40} height={100} fill={color} />)}
        {ALIGNMENT_BARS.map((color, index) => <rect key={`alignment-${index}`} x={index * 40} y={100} width={40} height={20} fill={color} />)}
        {LOWER_PATCHES.map(({ x, width, color }) => <rect key={`patch-${x}`} x={x} y={120} width={width} height={40} fill={color} />)}
      </g>
    </svg>
  </div>;
}
