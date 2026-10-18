import type { CSSProperties } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

const TILT = .95;
const SEGMENTS = 96;

function ribbonPoint(angle: number, width: number) {
  const radius = 1.8 + width * Math.cos(angle / 2);
  const x = radius * Math.cos(angle), y = radius * Math.sin(angle), z = width * Math.sin(angle / 2);
  return {
    x: 132 + x * 41,
    y: 72 + (y * Math.cos(TILT) - z * Math.sin(TILT)) * 41,
    depth: y * Math.sin(TILT) + z * Math.cos(TILT),
  };
}

const SECTIONS = Array.from({ length: SEGMENTS }, (_, index) =>
  [-.55, .55].map(width => ribbonPoint(index / SEGMENTS * Math.PI * 2, width)),
);
const PATCHES = SECTIONS.map((start, index) => {
  const end = index === SEGMENTS - 1 ? [SECTIONS[0][1], SECTIONS[0][0]] : SECTIONS[index + 1];
  const points = [start[0], start[1], end[1], end[0]];
  const angle = (index + .5) / SEGMENTS * Math.PI * 2;
  const shade = Math.abs(Math.sin(angle) * Math.sin(angle / 2) * Math.sin(TILT) - Math.cos(angle / 2) * Math.cos(TILT));
  return {
    index, depth: points.reduce((sum, point) => sum + point.depth, 0) / 4,
    points: points.map(point => `${point.x},${point.y}`).join(' '),
    edge: `M${start[0].x} ${start[0].y}L${end[0].x} ${end[0].y}M${start[1].x} ${start[1].y}L${end[1].x} ${end[1].y}`,
    style: { '--sf-mobius-light': `${42 + shade * 30}%`, '--sf-mobius-dark': `${25 + shade * 29}%` } as CSSProperties,
  };
}).sort((a, b) => a.depth - b.depth);

export function MobiusRibbonDemo() {
  const { t } = useLocale();
  return <div className="scifi-demo">
    <svg className="sf-mobius-ribbon" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.scifi.mobiusImage')}>
      <g aria-hidden="true">
        {PATCHES.map(patch => <g key={patch.index} data-segment={patch.index} data-depth={patch.depth} style={patch.style}>
          <polygon className="sf-mobius-face" points={patch.points} />
          <path className="sf-mobius-edge" d={patch.edge} />
        </g>)}
      </g>
    </svg>
  </div>;
}
