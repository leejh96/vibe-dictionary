import { useDemoNumber } from '../../../hooks/useDemoAutoplay';
import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type Point = [number, number, number];

export function LateralTruckDemo() {
  const { t } = useLocale();
  const [position, setPosition] = useDemoNumber(-30, -30, 30, 1);
  const sceneId = useId();
  const cameraX = position / 10;
  const project = ([x, y, z]: Point) => `${132 + 160 * (x - cameraX) / z},${74 - 160 * (y - 1.4) / z}`;
  const panel = (left: number, right: number, bottom: number, top: number, z: number) =>
    ([[left, bottom, z], [right, bottom, z], [right, top, z], [left, top, z]] as Point[]).map(project).join(' ');
  const sideX = cameraX < 0 ? -.65 : .65;

  return (
    <div className="camera-demo ca-truck-demo">
      <svg id={sceneId} className="ca-truck-scene" viewBox="0 0 264 148" role="img" aria-label={t('demo.additions.camera.truckScene')}>
        <g aria-hidden="true">
          <rect className="ca-truck-ground" x="0" y="74" width="264" height="74" />
          <path className="ca-truck-horizon" d="M0 74H264" />
          <g className="ca-truck-grid">
            {[-8, -4, 0, 4, 8].map(x => <path key={x} d={`M${project([x, 0, 3])}L${project([x, 0, 14])}`} />)}
            {[4, 6, 9, 14].map(z => <path key={z} d={`M${project([-8, 0, z])}L${project([8, 0, z])}`} />)}
          </g>
          <g className="ca-truck-alcoves">
            {[-7, 4].map(left => <polygon key={left} points={panel(left, left + 3, 0, 4.5, 14)} />)}
          </g>
          <g className="ca-truck-art">
            <polygon className="ca-truck-frame" points={panel(-1.5, 1.5, 0, 3.4, 9)} />
            <polygon className="ca-truck-paper" points={panel(-1.3, 1.3, .2, 3.2, 9)} />
            <circle className="ca-truck-disc" cx={132 - 160 * cameraX / 9} cy={74 - 160 * .8 / 9} r={160 * .65 / 9} />
            <path className="ca-truck-art-line" d={`M${project([-1.3, .6, 9])}L${project([.5, 1.7, 9])}L${project([1.3, 1.1, 9])}`} />
          </g>
          <g className="ca-truck-pillar">
            {Math.abs(cameraX) > .65 && <polygon data-face={cameraX < 0 ? 'left' : 'right'} className="ca-truck-side" points={([[sideX, 0, 3.6], [sideX, 0, 4.4], [sideX, 3.3, 4.4], [sideX, 3.3, 3.6]] as Point[]).map(project).join(' ')} />}
            <polygon data-face="front" className="ca-truck-front" points={panel(-.65, .65, 0, 3.3, 3.6)} />
          </g>
        </g>
      </svg>
      <div className="ca-truck-control">
        <ArrowLeft size={16} aria-hidden="true" />
        <input type="range" min="-30" max="30" step="1" value={position} aria-label={t('demo.additions.camera.truckControl')} aria-valuetext={position === 0 ? t('demo.additions.camera.truckCenter') : t(position < 0 ? 'demo.additions.camera.truckLeft' : 'demo.additions.camera.truckRight', { value: Math.abs(position) })} aria-controls={sceneId} onChange={event => setPosition(Number(event.currentTarget.value))} />
        <ArrowRight size={16} aria-hidden="true" />
      </div>
    </div>
  );
}
