import { useId, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

type Point = [number, number, number];
const GRID = [-3, -2, -1, 0, 1, 2, 3];
const PANELS = [{ id: 'far', x: 1.8, z: -2 }, { id: 'near', x: -1.8, z: 2 }];

export function ProjectionModeDemo() {
  const { t } = useLocale();
  const [orthographic, setOrthographic] = useState(false);
  const sceneId = useId();
  const elevation = 20 * Math.PI / 180;
  const project = ([x, y, z]: Point) => {
    const depth = 9 - y * Math.sin(elevation) - z * Math.cos(elevation);
    const scale = orthographic ? 210 / 9 : 210 / depth;
    return `${132 + x * scale},${74 - (y * Math.cos(elevation) - z * Math.sin(elevation)) * scale}`;
  };

  return (
    <div className="camera-demo ca-projection-demo">
      <svg id={sceneId} className="ca-projection-scene" viewBox="0 0 264 148" role="img" aria-label={t(orthographic ? 'demo.additions.camera.orthographicScene' : 'demo.additions.camera.perspectiveScene')}>
        <g aria-hidden="true">
          <polygon className="ca-projection-floor" points={([[-3, -1.2, 3], [3, -1.2, 3], [3, -1.2, -3], [-3, -1.2, -3]] as Point[]).map(project).join(' ')} />
          {GRID.map(value => <g key={value} className="ca-projection-grid">
            <path data-axis="depth" d={`M${project([value, -1.2, -3])}L${project([value, -1.2, 3])}`} />
            <path data-axis="width" d={`M${project([-3, -1.2, value])}L${project([3, -1.2, value])}`} />
          </g>)}
          {PANELS.map(panel => <g key={panel.id} data-panel={panel.id} className={`ca-projection-panel ca-projection-${panel.id}`}>
            <polygon points={([[panel.x - .75, -1.2, panel.z], [panel.x + .75, -1.2, panel.z], [panel.x + .75, 1.2, panel.z], [panel.x - .75, 1.2, panel.z]] as Point[]).map(project).join(' ')} />
            <path d={`M${project([panel.x - .3, -.3, panel.z])}L${project([panel.x + .3, .3, panel.z])}M${project([panel.x - .3, .3, panel.z])}L${project([panel.x + .3, -.3, panel.z])}`} />
          </g>)}
        </g>
      </svg>
      <div className="ca-projection-control" role="group" aria-label={t('demo.additions.camera.projectionMode')}>
        {[false, true].map(value => <button type="button" key={String(value)} aria-pressed={orthographic === value} aria-controls={sceneId} onClick={() => setOrthographic(value)}>{t(value ? 'demo.additions.camera.orthographic' : 'demo.additions.camera.perspective')}</button>)}
      </div>
    </div>
  );
}
