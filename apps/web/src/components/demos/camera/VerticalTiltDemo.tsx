import { useDemoNumber } from '../../../hooks/useDemoAutoplay';
import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';
import { ArrowDown, ArrowUp } from 'lucide-react';

type Point = [number, number, number];
const FACADES = [
  { id: 'left', left: -3.3, right: -1.8, height: 3.4, z: 8.5 },
  { id: 'right', left: 1.8, right: 3.3, height: 4.1, z: 8.5 },
  { id: 'tower', left: -1.45, right: 1.45, height: 5.5, z: 6 },
];

export function VerticalTiltDemo() {
  const { t } = useLocale();
  const [tilt, setTilt] = useDemoNumber(0, -10, 25, 1);
  const sceneId = useId();
  const pitch = tilt * Math.PI / 180;
  const horizon = 74 + 140 * Math.tan(pitch);
  const project = ([x, y, z]: Point) => {
    const depth = (y - 1.5) * Math.sin(pitch) + z * Math.cos(pitch);
    const vertical = (y - 1.5) * Math.cos(pitch) - z * Math.sin(pitch);
    return `${132 + 140 * x / depth},${74 - 140 * vertical / depth}`;
  };

  return (
    <div className="camera-demo ca-tilt-demo">
      <svg id={sceneId} className="ca-tilt-scene" viewBox="0 0 264 148" role="img" aria-label={t('demo.additions.camera.tiltScene')}>
        <g aria-hidden="true">
          <rect className="ca-tilt-ground" x="0" y={horizon} width="264" height={148 - horizon} />
          <path className="ca-tilt-horizon" d={`M0 ${horizon}H264`} />
          <g className="ca-tilt-ground-grid">
            {[-4, -2, 0, 2, 4].map(x => <path key={x} data-axis="depth" d={`M${project([x, 0, 3])}L${project([x, 0, 12])}`} />)}
          </g>
          {FACADES.map(({ id, left, right, height, z }) => <polygon key={id} data-facade={id} className={`ca-tilt-facade ca-tilt-${id}`} points={([[left, 0, z], [right, 0, z], [right, height, z], [left, height, z]] as Point[]).map(project).join(' ')} />)}
          <g className="ca-tilt-windows">
            {[.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map(y => <path key={y} d={`M${project([-1.45, y, 6])}L${project([1.45, y, 6])}`} />)}
            {[-.75, 0, .75].map(x => <path key={x} d={`M${project([x, 0, 6])}L${project([x, 5.5, 6])}`} />)}
          </g>
        </g>
      </svg>
      <div className="ca-tilt-control">
        <ArrowDown size={16} aria-hidden="true" />
        <input type="range" min="-10" max="25" step="1" value={tilt} aria-label={t('demo.additions.camera.tiltControl')} aria-valuetext={tilt === 0 ? t('demo.additions.camera.level') : t(tilt < 0 ? 'demo.additions.camera.tiltDown' : 'demo.additions.camera.tiltUp', { value: Math.abs(tilt) })} aria-controls={sceneId} onChange={event => setTilt(Number(event.currentTarget.value))} />
        <ArrowUp size={16} aria-hidden="true" />
      </div>
    </div>
  );
}
