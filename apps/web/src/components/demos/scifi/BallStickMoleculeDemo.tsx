import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

const VERTICES = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]];
const YAW = .18, PITCH = .12, SCALE = 39;
const ATOMS = [
  { element: 'C', x: 132, y: 72, z: 0, radius: 20 },
  ...VERTICES.map(([x, y, z]) => {
    const horizontal = x * Math.cos(YAW) + z * Math.sin(YAW);
    const depth = -x * Math.sin(YAW) + z * Math.cos(YAW);
    return {
      element: 'H', x: 132 + horizontal * SCALE,
      y: 72 - (y * Math.cos(PITCH) - depth * Math.sin(PITCH)) * SCALE,
      z: (y * Math.sin(PITCH) + depth * Math.cos(PITCH)) * SCALE, radius: 12,
    };
  }),
].sort((a, b) => a.z - b.z);

export function BallStickMoleculeDemo() {
  const { t } = useLocale();
  const id = useId();
  return <div className="scifi-demo">
    <svg className="sf-ball-stick" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.scifi.moleculeImage')}>
      <defs>
        <radialGradient id={`${id}-carbon`} cx="30%" cy="25%" r="75%">
          <stop offset="0" stopColor="#9eb6c5" />
          <stop offset=".45" stopColor="#466376" />
          <stop offset="1" stopColor="#172f40" />
        </radialGradient>
        <radialGradient id={`${id}-hydrogen`} cx="30%" cy="25%" r="75%">
          <stop offset="0" stopColor="#fff" />
          <stop offset=".5" stopColor="#e7f0f5" />
          <stop offset="1" stopColor="#9db3c1" />
        </radialGradient>
      </defs>
      <g aria-hidden="true">
        {ATOMS.filter(atom => atom.element === 'H').map(atom => <g key={atom.z} className="sf-molecule-bond">
          <line x1={132} y1={72} x2={atom.x} y2={atom.y} />
          <line className="sf-molecule-bond-light" x1={132} y1={72} x2={atom.x} y2={atom.y} />
        </g>)}
        {ATOMS.map(atom => <circle key={atom.z} data-element={atom.element} data-depth={atom.z}
          className={`sf-molecule-atom sf-molecule-${atom.element === 'C' ? 'carbon' : 'hydrogen'}`}
          cx={atom.x} cy={atom.y} r={atom.radius} fill={`url(#${id}-${atom.element === 'C' ? 'carbon' : 'hydrogen'})`} />)}
      </g>
    </svg>
  </div>;
}
