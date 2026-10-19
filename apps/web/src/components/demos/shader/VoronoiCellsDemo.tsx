import { useDemoNumber } from '../../../hooks/useDemoAutoplay';
import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

type Point = { x: number; y: number };

const FIXED_SITES: Point[] = [
  { x: 24, y: 26 }, { x: 88, y: 18 }, { x: 170, y: 22 }, { x: 238, y: 36 },
  { x: 30, y: 92 }, { x: 92, y: 82 }, { x: 218, y: 96 },
  { x: 58, y: 132 }, { x: 142, y: 126 }, { x: 244, y: 138 },
];

function cellFor(site: Point, sites: Point[]) {
  let polygon: Point[] = [{ x: 0, y: 0 }, { x: 264, y: 0 }, { x: 264, y: 144 }, { x: 0, y: 144 }];
  for (const other of sites) {
    if (other === site) continue;
    const dx = other.x - site.x;
    const dy = other.y - site.y;
    const boundary = (other.x ** 2 + other.y ** 2 - site.x ** 2 - site.y ** 2) / 2;
    const distance = (point: Point) => point.x * dx + point.y * dy - boundary;
    const clipped: Point[] = [];
    for (let i = 0; i < polygon.length; i++) {
      const start = polygon[i];
      const end = polygon[(i + 1) % polygon.length];
      const a = distance(start);
      const b = distance(end);
      if (a <= 0) clipped.push(start);
      if ((a <= 0) !== (b <= 0)) {
        const ratio = a / (a - b);
        clipped.push({ x: start.x + (end.x - start.x) * ratio, y: start.y + (end.y - start.y) * ratio });
      }
    }
    polygon = clipped;
  }
  return polygon.map(point => `${point.x},${point.y}`).join(' ');
}

export function VoronoiCellsDemo() {
  const { t } = useLocale();
  const [centerX, setCenterX] = useDemoNumber(132, 112, 180, 1);
  const id = useId();
  const sites = [...FIXED_SITES, { x: centerX, y: 70 }];
  return <div className="shader-demo sd-voronoi-demo">
    <div className="sd-scene">
      <svg id={id} className="sd-voronoi-svg" viewBox="0 0 264 144" preserveAspectRatio="none" role="img" aria-label={t('demo.additions.shader.voronoiScene')}>
        {sites.map((site, index) => <polygon key={index} points={cellFor(site, sites)} fill="currentColor" fillOpacity={index === FIXED_SITES.length ? .52 : .16 + index % 4 * .08} />)}
        {sites.map((site, index) => <circle key={index} cx={site.x} cy={site.y} r={index === FIXED_SITES.length ? 4 : 2} className={index === FIXED_SITES.length ? 'sd-voronoi-active' : 'sd-voronoi-site'} />)}
      </svg>
    </div>
    <label className="sd-range-control">{t('demo.additions.shader.position')}<input className="sd-range" type="range" aria-label={t('demo.additions.shader.voronoiPosition')} aria-controls={id} min={112} max={180} step={1} value={centerX} onChange={event => setCenterX(Number(event.currentTarget.value))} /></label>
  </div>;
}
