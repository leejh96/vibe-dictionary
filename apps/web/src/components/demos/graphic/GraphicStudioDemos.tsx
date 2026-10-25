import { useId, useMemo, type ReactNode } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';
import { useDemoNumber, useDemoToggle } from '../../../hooks/useDemoAutoplay';

function Studio({ children }: { children: ReactNode }) {
  return <div className="gs-demo"><div className="gs-art">{children}</div></div>;
}

export function HalftoneShadingDemo() {
  const { t } = useLocale();
  const [contrast] = useDemoNumber(55, 0, 100);
  return <Studio>
    <svg viewBox="0 0 260 132" role="img" aria-label={t('demo.studio.halftoneImage')}>
      {Array.from({ length: 21 * 11 }, (_, i) => {
        const x = 30 + (i % 21) * 10;
        const y = 16 + Math.floor(i / 21) * 10;
        const nx = (x - 130) / 96, ny = (y - 66) / 54;
        const distance = nx * nx + ny * ny;
        const light = Math.max(0, 1 - Math.hypot(nx + .35, ny + .4) / 1.8);
        const radius = distance > 1 ? .5 : .9 + Math.pow(1 - light, 1.9 - contrast / 70) * 3.6;
        return <circle key={i} cx={x} cy={y} r={radius} className={distance > 1 ? 'gs-dot-background' : 'gs-dot'} />;
      })}
    </svg>
  </Studio>;
}

export function VoxelLandscapeDemo() {
  const { t } = useLocale();
  const [height] = useDemoNumber(65, 0, 100);
  const cells = Array.from({ length: 36 }, (_, i) => ({ row: Math.floor(i / 6), col: i % 6 }))
    .sort((a, b) => a.row + a.col - b.row - b.col);
  return <Studio>
    <svg viewBox="0 0 260 132" role="img" aria-label={t('demo.studio.voxelImage')}>
      {cells.map(({ row, col }) => {
        const x = 130 + (col - row) * 17, y = 34 + (col + row) * 8;
        const h = 4 + height / 100 * (8 + 37 * Math.exp(-((col - 2.5) ** 2 + (row - 2.5) ** 2) / 4));
        const top = y - h;
        return <g key={`${row}-${col}`}>
          <path fill="#0f766e" d={`M${x - 17} ${top} L${x} ${top + 8} V${y + 8} L${x - 17} ${y} Z`} />
          <path fill="#0e7490" d={`M${x} ${top + 8} L${x + 17} ${top} V${y} L${x} ${y + 8} Z`} />
          <path fill={`hsl(${155 + h}, 70%, ${66 + h / 4}%)`} stroke="#e0fff6" strokeWidth=".6" d={`M${x} ${top - 8} L${x + 17} ${top} L${x} ${top + 8} L${x - 17} ${top} Z`} />
        </g>;
      })}
    </svg>
  </Studio>;
}

export function RibbonWeaveDemo() {
  const { t } = useLocale();
  const [reversed] = useDemoToggle(false);
  return <Studio>
    <svg viewBox="0 0 260 132" role="img" aria-label={t('demo.studio.weaveImage')}>
      <g transform="translate(130 66) rotate(-12) translate(-130 -66)">
        {[0, 1, 2, 3].map(i => <rect key={`v${i}`} x={81 + i * 27} y={9} width={17} height={114} rx={5} fill="#f59e0b" />)}
        {[0, 1, 2, 3].map(row => <g key={row}>
          <rect x={67} y={20 + row * 26} width={130} height={17} rx={5} fill="#7c3aed" />
          {[0, 1, 2, 3].filter(col => (row + col) % 2 === Number(reversed)).map(col => <g key={col}>
            <rect x={79 + col * 27} y={20 + row * 26} width={21} height={17} fill="#24103e" opacity=".35" />
            <rect x={81 + col * 27} y={17 + row * 26} width={17} height={23} fill="#fbbf24" />
            <path d={`M${84 + col * 27} ${20 + row * 26} v17`} stroke="#fef3c7" strokeWidth="1.5" opacity=".7" />
          </g>)}
        </g>)}
      </g>
    </svg>
  </Studio>;
}

export function GuillocheCurveDemo() {
  const { t } = useLocale();
  const [lobes] = useDemoNumber(9, 5, 14, 1, 'steps');
  const id = useId();
  const points = useMemo(() => Array.from({ length: 1441 }, (_, i) => {
    const angle = i / 1440 * Math.PI * 2;
    const radius = 41 + 16 * Math.cos(lobes * angle);
    return `${i ? 'L' : 'M'}${(130 + radius * 1.8 * Math.cos(angle)).toFixed(2)} ${(66 + radius * Math.sin(angle)).toFixed(2)}`;
  }).join(' ') + ' Z', [lobes]);
  return <Studio>
    <svg viewBox="0 0 260 132" role="img" aria-label={t('demo.studio.guillocheImage')}>
      <defs><linearGradient id={id}><stop stopColor="#0891b2" /><stop offset="1" stopColor="#a855f7" /></linearGradient></defs>
      {Array.from({ length: 9 }, (_, i) => <path key={i} d={points} transform={`translate(130 66) scale(${1 - i * .035}) rotate(${i * 1.5}) translate(-130 -66)`} fill="none" stroke={`url(#${id})`} strokeWidth=".65" opacity={1 - i * .055} />)}
    </svg>
  </Studio>;
}

export function GradientRibbonDemo() {
  const { t } = useLocale();
  const [bend] = useDemoNumber(60, 0, 100);
  const id = useId();
  const d = `M35 98 C${65 + bend / 3} ${98 - bend * 1.25}, ${185 - bend / 3} ${34 + bend * 1.25}, 225 34`;
  return <Studio>
    <svg viewBox="0 0 260 132" role="img" aria-label={t('demo.studio.ribbonImage')}>
      <defs><linearGradient id={id} gradientUnits="userSpaceOnUse" x1="35" y1="98" x2="225" y2="34"><stop stopColor="#22d3ee" /><stop offset=".5" stopColor="#8b5cf6" /><stop offset="1" stopColor="#f472b6" /></linearGradient></defs>
      <path d={d} transform="translate(0 7)" fill="none" stroke="#4c1d95" opacity=".18" strokeWidth="28" strokeLinecap="round" />
      <path className="gs-ribbon" d={d} fill="none" stroke={`url(#${id})`} strokeWidth="28" strokeLinecap="round" />
      <path d={d} transform="translate(0 -7)" fill="none" stroke="white" opacity=".5" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="35" cy="98" r="4" fill="#cffafe" /><circle cx="225" cy="34" r="4" fill="#fce7f3" />
    </svg>
  </Studio>;
}
