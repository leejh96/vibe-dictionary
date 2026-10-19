import { useDemoNumber } from '../../../hooks/useDemoAutoplay';
import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

type Point = [number, number];
const X_SAMPLES = Array.from({ length: 65 }, (_, index) => -1 + index / 32);
const Y_SAMPLES = Array.from({ length: 41 }, (_, index) => -.625 + index / 32);
const COLUMNS = [-1, -.75, -.5, -.25, 0, .25, .5, .75, 1];
const ROWS = [-.625, -.375, -.125, .125, .375, .625];
const BORDER: Point[] = [
  ...X_SAMPLES.map((x): Point => [x, -.625]),
  ...Y_SAMPLES.slice(1).map((y): Point => [1, y]),
  ...X_SAMPLES.slice(0, -1).reverse().map((x): Point => [x, .625]),
  ...Y_SAMPLES.slice(1, -1).reverse().map((y): Point => [-1, y]),
];

export function RadialLensDemo() {
  const { t } = useLocale();
  const [strength, setStrength] = useDemoNumber(-60, -100, 100, 1);
  const sceneId = useId();
  const coefficient = strength * .0022;
  const project = ([x, y]: Point) => {
    const scale = 1 + coefficient * (x * x + y * y);
    return `${132 + 80 * x * scale},${74 + 80 * y * scale}`;
  };

  return (
    <div className="camera-demo ca-radial-demo">
      <svg id={sceneId} className="ca-radial-scene" viewBox="0 0 264 148" role="img" aria-label={t('demo.additions.camera.radialScene')}>
        <g aria-hidden="true">
          <path className="ca-radial-sheet" d={`M${BORDER.map(project).join('L')}Z`} />
          <g className="ca-radial-grid">
            {COLUMNS.map(x => <path key={`x${x}`} data-column={x} d={`M${Y_SAMPLES.map(y => project([x, y])).join('L')}`} />)}
            {ROWS.map(y => <path key={`y${y}`} data-row={y} d={`M${X_SAMPLES.map(x => project([x, y])).join('L')}`} />)}
          </g>
          <circle className="ca-radial-center" cx="132" cy="74" r="3" />
        </g>
      </svg>
      <div className="ca-radial-control">
        <span aria-hidden="true">{t('demo.additions.camera.barrel')}</span>
        <input type="range" min="-100" max="100" step="1" value={strength} aria-label={t('demo.additions.camera.radialControl')} aria-valuetext={strength === 0 ? t('demo.additions.camera.undistorted') : t(strength < 0 ? 'demo.additions.camera.barrelValue' : 'demo.additions.camera.pincushionValue', { value: Math.abs(strength) })} aria-controls={sceneId} onChange={event => setStrength(Number(event.currentTarget.value))} />
        <span aria-hidden="true">{t('demo.additions.camera.pincushion')}</span>
      </div>
    </div>
  );
}
