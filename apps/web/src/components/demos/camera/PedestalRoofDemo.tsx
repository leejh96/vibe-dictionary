import { useDemoNumber } from '../../../hooks/useDemoAutoplay';
import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';
import { ArrowDown, ArrowUp } from 'lucide-react';

type Point = [number, number, number];
const FRONT: Point[] = [[-2, 0, -2], [2, 0, -2], [2, 1.5, -2], [-2, 1.5, -2]];
const LEFT: Point[] = [[-2, 0, 2], [-2, 0, -2], [-2, 1.5, -2], [-2, 1.5, 2]];
const ROOF: Point[] = [[-2, 1.5, -2], [2, 1.5, -2], [2, 1.5, 2], [-2, 1.5, 2]];
const HELIPAD: Point[][] = [1.2, 1.08].map(radius => Array.from({ length: 32 }, (_, index): Point => [Math.cos(index * Math.PI / 16) * radius, 1.5, Math.sin(index * Math.PI / 16) * radius]));
const H_MARK: Point[] = [[-.5, 1.5, -.65], [-.25, 1.5, -.65], [-.25, 1.5, -.12], [.25, 1.5, -.12], [.25, 1.5, -.65], [.5, 1.5, -.65], [.5, 1.5, .65], [.25, 1.5, .65], [.25, 1.5, .12], [-.25, 1.5, .12], [-.25, 1.5, .65], [-.5, 1.5, .65]];

export function PedestalRoofDemo() {
  const { t } = useLocale();
  const [height, setHeight] = useDemoNumber(.5, 0.5, 3.2, 0.1);
  const sceneId = useId();
  // Level camera at (-6, height, -8), with fixed forward (.6, 0, .8).
  const project = ([x, y, z]: Point) => {
    const depth = 10 + .6 * x + .8 * z;
    return `${132 + 155 * (.8 * x - .6 * z) / depth},${74 - 155 * (y - height) / depth}`;
  };

  return (
    <div className="camera-demo ca-pedestal-demo">
      <svg id={sceneId} className="ca-pedestal-scene" viewBox="0 0 264 148" role="img" aria-label={t('demo.additions.camera.pedestalScene')}>
        <g aria-hidden="true">
          <rect className="ca-pedestal-ground" x="0" y="74" width="264" height="74" />
          <path className="ca-pedestal-horizon" d="M0 74H264" />
          <g className="ca-pedestal-grid">
            {[-4, -2, 0, 2, 4].map(value => <g key={value}>
              <path d={`M${project([value, 0, -4])}L${project([value, 0, 4])}`} />
              <path d={`M${project([-4, 0, value])}L${project([4, 0, value])}`} />
            </g>)}
          </g>
          <polygon className="ca-pedestal-left" points={LEFT.map(project).join(' ')} />
          <polygon className="ca-pedestal-front" points={FRONT.map(project).join(' ')} />
          <g className="ca-pedestal-windows">
            {[-1.6, -.45, .7].map(x => <polygon key={x} points={([[x, .35, -2], [x + .9, .35, -2], [x + .9, 1.15, -2], [x, 1.15, -2]] as Point[]).map(project).join(' ')} />)}
          </g>
          {height > 1.5 && <g className="ca-pedestal-roof">
            <polygon className="ca-pedestal-top" points={ROOF.map(project).join(' ')} />
            <path className="ca-pedestal-ring" fillRule="evenodd" d={HELIPAD.map(ring => `M${ring.map(project).join('L')}Z`).join('')} />
            <polygon className="ca-pedestal-mark" points={H_MARK.map(project).join(' ')} />
          </g>}
        </g>
      </svg>
      <div className="ca-pedestal-control">
        <ArrowDown size={16} aria-hidden="true" />
        <input type="range" min="0.5" max="3.2" step="0.1" value={height} aria-label={t('demo.additions.camera.pedestalControl')} aria-valuetext={t(height < 1.5 ? 'demo.additions.camera.belowRoof' : height === 1.5 ? 'demo.additions.camera.levelRoof' : 'demo.additions.camera.aboveRoof', { height: height.toFixed(1) })} aria-controls={sceneId} onChange={event => setHeight(Number(event.currentTarget.value))} />
        <ArrowUp size={16} aria-hidden="true" />
      </div>
    </div>
  );
}
