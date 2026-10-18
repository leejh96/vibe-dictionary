import { useId, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

type Point = [number, number, number];
const FACADES = [
  { id: 'left', left: -5.2, right: -3.2, height: 4.5, z: 11 },
  { id: 'right', left: 3.2, right: 5.2, height: 5.4, z: 11 },
  { id: 'tower', left: -2.6, right: 2.6, height: 8, z: 8 },
];

export function LensShiftDemo() {
  const { t } = useLocale();
  const [shifted, setShifted] = useState(false);
  const sceneId = useId();
  // Both projections frame world point (0, 4, 8) at (132, 74).
  const pitch = shifted ? 0 : Math.atan(2.6 / 8);
  const offset = shifted ? 110 * 2.6 / 8 : 0;
  const horizon = 74 + offset + 110 * Math.tan(pitch);
  const project = ([x, y, z]: Point) => {
    const depth = (y - 1.4) * Math.sin(pitch) + z * Math.cos(pitch);
    const vertical = (y - 1.4) * Math.cos(pitch) - z * Math.sin(pitch);
    return `${132 + 110 * x / depth},${74 + offset - 110 * vertical / depth}`;
  };

  return (
    <div className="camera-demo ca-shift-demo">
      <svg id={sceneId} className="ca-shift-scene" viewBox="0 0 264 148" role="img" aria-label={t(shifted ? 'demo.additions.camera.shiftScene' : 'demo.additions.camera.tiltFacade')}>
        <g aria-hidden="true">
          <rect className="ca-shift-ground" x="0" y={horizon} width="264" height={148 - horizon} />
          <path className="ca-shift-horizon" d={`M0 ${horizon}H264`} />
          <g className="ca-shift-grid">
            {[-6, -3, 0, 3, 6].map(x => <path key={x} d={`M${project([x, 0, 4])}L${project([x, 0, 16])}`} />)}
          </g>
          {FACADES.map(({ id, left, right, height, z }) => <polygon key={id} data-facade={id} className={`ca-shift-facade ca-shift-${id}`} points={([[left, 0, z], [right, 0, z], [right, height, z], [left, height, z]] as Point[]).map(project).join(' ')} />)}
          <g className="ca-shift-windows">
            {[1, 2, 3, 4, 5, 6, 7].map(y => <path key={y} d={`M${project([-2.6, y, 8])}L${project([2.6, y, 8])}`} />)}
            {[-1.3, 0, 1.3].map(x => <path key={x} d={`M${project([x, 0, 8])}L${project([x, 8, 8])}`} />)}
          </g>
        </g>
      </svg>
      <div className="ca-shift-control" role="group" aria-label={t('demo.additions.camera.framingMode')}>
        {[false, true].map(value => <button type="button" key={String(value)} aria-pressed={shifted === value} aria-controls={sceneId} onClick={() => setShifted(value)}>{t(value ? 'demo.additions.camera.lensShift' : 'demo.additions.camera.standardTilt')}</button>)}
      </div>
    </div>
  );
}
