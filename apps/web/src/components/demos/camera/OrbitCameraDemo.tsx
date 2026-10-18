import { useId, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

type Point = [number, number, number];
const FACES: { id: string; normal: Point; offset: number; vertices: Point[]; mark?: Point[] }[] = [
  { id: 'front', normal: [0, 0, 1], offset: 1.1, vertices: [[-1.1, -1.2, 1.1], [1.1, -1.2, 1.1], [1.1, 1.2, 1.1], [-1.1, 1.2, 1.1]], mark: [[-.55, .5, 1.1], [.55, .5, 1.1], [.55, .15, 1.1], [-.55, .15, 1.1]] },
  { id: 'right', normal: [1, 0, 0], offset: 1.1, vertices: [[1.1, -1.2, 1.1], [1.1, -1.2, -1.1], [1.1, 1.2, -1.1], [1.1, 1.2, 1.1]] },
  { id: 'back', normal: [0, 0, -1], offset: 1.1, vertices: [[1.1, -1.2, -1.1], [-1.1, -1.2, -1.1], [-1.1, 1.2, -1.1], [1.1, 1.2, -1.1]], mark: [[0, .6, -1.1], [.45, .15, -1.1], [0, -.3, -1.1], [-.45, .15, -1.1]] },
  { id: 'left', normal: [-1, 0, 0], offset: 1.1, vertices: [[-1.1, -1.2, -1.1], [-1.1, -1.2, 1.1], [-1.1, 1.2, 1.1], [-1.1, 1.2, -1.1]] },
  { id: 'top', normal: [0, 1, 0], offset: 1.2, vertices: [[-1.1, 1.2, 1.1], [1.1, 1.2, 1.1], [1.1, 1.2, -1.1], [-1.1, 1.2, -1.1]] },
];

export function OrbitCameraDemo() {
  const { t } = useLocale();
  const [angle, setAngle] = useState(30);
  const sceneId = useId();
  const yaw = angle * Math.PI / 180;
  const elevation = 20 * Math.PI / 180;
  const direction: Point = [Math.sin(yaw) * Math.cos(elevation), Math.sin(elevation), Math.cos(yaw) * Math.cos(elevation)];
  const project = ([x, y, z]: Point) => {
    const depth = 6 - (x * direction[0] + y * direction[1] + z * direction[2]);
    const horizontal = x * Math.cos(yaw) - z * Math.sin(yaw);
    const vertical = -x * Math.sin(yaw) * Math.sin(elevation) + y * Math.cos(elevation) - z * Math.cos(yaw) * Math.sin(elevation);
    return `${132 + 210 * horizontal / depth},${74 - 210 * vertical / depth}`;
  };
  const visible = FACES.filter(face => face.normal.reduce((dot, value, index) => dot + value * direction[index] * 6, 0) > face.offset + 1e-9);

  return (
    <div className="camera-demo ca-orbit-demo">
      <svg id={sceneId} className="ca-orbit-scene" viewBox="0 0 264 148" role="img" aria-label={t('demo.additions.camera.orbitScene')}>
        <g aria-hidden="true">
          {visible.map(face => (
            <g key={face.id} data-face={face.id}>
              <polygon className={`ca-orbit-face ca-orbit-${face.id}`} points={face.vertices.map(project).join(' ')} />
              {face.mark && <polygon className="ca-orbit-mark" points={face.mark.map(project).join(' ')} />}
            </g>
          ))}
        </g>
      </svg>
      <div className="ca-orbit-control">
        <span aria-hidden="true">↶</span>
        <input type="range" min="-180" max="180" step="1" value={angle} aria-label={t('demo.additions.camera.orbitControl')} aria-valuetext={t('demo.additions.camera.orbitDegrees', { value: angle })} aria-controls={sceneId} onChange={event => setAngle(Number(event.currentTarget.value))} />
        <span aria-hidden="true">↷</span>
      </div>
    </div>
  );
}
