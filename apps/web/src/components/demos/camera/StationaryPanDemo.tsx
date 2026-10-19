import { useDemoNumber } from '../../../hooks/useDemoAutoplay';
import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type Point = [number, number, number];
const MONUMENTS = [
  { id: 'center', x: 0, z: 10, height: 1.7 },
  { id: 'left', x: -3.2, z: 8, height: 1.5 },
  { id: 'right', x: 3.2, z: 8, height: 1.8 },
];
const GRID = [-6, -4, -2, 0, 2, 4, 6];

export function StationaryPanDemo() {
  const { t } = useLocale();
  const [pan, setPan] = useDemoNumber(0, -20, 20, 1);
  const sceneId = useId();
  const yaw = pan * Math.PI / 180;
  const pitch = 12 * Math.PI / 180;
  const horizon = 74 - 230 * Math.tan(pitch);
  const project = ([x, y, z]: Point) => {
    const across = x * Math.cos(yaw) - z * Math.sin(yaw);
    const ahead = x * Math.sin(yaw) + z * Math.cos(yaw);
    const depth = ahead * Math.cos(pitch) - (y - 2) * Math.sin(pitch);
    const vertical = ahead * Math.sin(pitch) + (y - 2) * Math.cos(pitch);
    return `${132 + 230 * across / depth},${74 - 230 * vertical / depth}`;
  };

  return (
    <div className="camera-demo ca-pan-demo">
      <svg id={sceneId} className="ca-pan-scene" viewBox="0 0 264 148" role="img" aria-label={t('demo.additions.camera.panScene')}>
        <g aria-hidden="true">
          <rect className="ca-pan-ground" x="0" y={horizon} width="264" height={148 - horizon} />
          <path className="ca-pan-horizon" d={`M0 ${horizon}H264`} />
          <g className="ca-pan-grid">
            {GRID.map(x => <path key={x} data-axis="depth" d={`M${project([x, 0, 4])}L${project([x, 0, 14])}`} />)}
            {[4, 6, 8, 10, 12, 14].map(z => <path key={z} d={`M${project([-6, 0, z])}L${project([6, 0, z])}`} />)}
          </g>
          {MONUMENTS.map(({ id, x, z, height }) => {
            const front: Point[] = [[x - .7, 0, z - .65], [x + .7, 0, z - .65], [x + .7, height, z - .65], [x - .7, height, z - .65]];
            const top: Point[] = [[x - .7, height, z - .65], [x + .7, height, z - .65], [x + .7, height, z + .65], [x - .7, height, z + .65]];
            const sideX = x < 0 ? x + .7 : x - .7;
            const side: Point[] = [[sideX, 0, z - .65], [sideX, 0, z + .65], [sideX, height, z + .65], [sideX, height, z - .65]];
            return <g key={id} data-monument={id} className={`ca-pan-monument ca-pan-${id}`}>
              <polygon data-face="front" points={front.map(project).join(' ')} />
              {x !== 0 && <polygon data-face="side" points={side.map(project).join(' ')} />}
              <polygon data-face="top" points={top.map(project).join(' ')} />
            </g>;
          })}
        </g>
      </svg>
      <div className="ca-pan-control">
        <ArrowLeft size={16} aria-hidden="true" />
        <input type="range" min="-20" max="20" step="1" value={pan} aria-label={t('demo.additions.camera.panControl')} aria-valuetext={pan === 0 ? t('demo.additions.camera.forward') : t(pan < 0 ? 'demo.additions.camera.leftDegrees' : 'demo.additions.camera.rightDegrees', { value: Math.abs(pan) })} aria-controls={sceneId} onChange={event => setPan(Number(event.currentTarget.value))} />
        <ArrowRight size={16} aria-hidden="true" />
      </div>
    </div>
  );
}
