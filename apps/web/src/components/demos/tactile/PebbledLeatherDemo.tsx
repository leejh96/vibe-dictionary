import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

const PEBBLE_PATH = 'M-4-1C-3-4 1-4 4-2C6 0 3 3 0 3C-3 4-5 2-4-1Z';
const LEATHER_PEBBLES = [
  [1, 1, .9, .8, 15], [9, 3, .8, .9, -20], [17, 0, 1.05, .85, 40],
  [25, 3, .9, 1.05, -10], [34, 1, .85, .8, 25], [43, 2, .95, .9, -25],
  [4, 9, 1.05, .9, -30], [13, 11, .85, 1.1, 15], [22, 8, 1, .8, -10],
  [30, 10, .8, .95, 35], [39, 9, 1.05, .85, -15], [47, 10, .9, 1, 20],
  [0, 17, .85, 1.05, 20], [9, 18, 1.05, .8, -15], [18, 16, .9, .95, 30],
  [27, 19, .85, 1.1, -35], [36, 17, 1.05, .85, 10], [44, 18, .9, .95, -20],
  [5, 25, 1, .9, 30], [14, 27, .85, 1.05, -15], [23, 24, 1.05, .85, 25],
  [31, 26, .8, 1.1, -20], [40, 25, 1.05, .9, 15], [48, 26, .85, 1, -30],
].flatMap(([x, y, sx, sy, angle]) => {
  const xs = x < 5 ? [x, x + 48] : x > 43 ? [x, x - 48] : [x];
  const ys = y < 5 ? [y, y + 32] : [y];
  return xs.flatMap(px => ys.map(py => `translate(${px} ${py}) rotate(${angle}) scale(${sx} ${sy})`));
});

export function PebbledLeatherDemo() {
  const { t } = useLocale();
  const id = useId();

  return (
    <div className="tactile-demo">
      <svg className="tt-leather-art" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.tactile.leatherDescription')}>
        <defs>
          <linearGradient id={`${id}-leather-pebble`} x1="0" y1="0" x2=".2" y2="1">
            <stop stopColor="#b17a50" stopOpacity=".45" />
            <stop offset=".35" stopColor="#a66c43" stopOpacity=".45" />
            <stop offset="1" stopColor="#854b2a" stopOpacity=".45" />
          </linearGradient>
          <pattern id={`${id}-leather-grain`} patternUnits="userSpaceOnUse" width="48" height="32" patternTransform="rotate(17)">
            <rect width="48" height="32" fill="#754124" />
            <g fill={`url(#${id}-leather-pebble)`} stroke="#62331d" strokeWidth=".3" strokeOpacity=".35">
              {LEATHER_PEBBLES.map(transform => <path key={transform} d={PEBBLE_PATH} transform={transform} />)}
            </g>
          </pattern>
        </defs>
        <g aria-hidden="true">
          <rect x="20" y="16" width="224" height="116" rx="16" fill="#45261550" />
          <rect x="20" y="12" width="224" height="116" rx="16" fill={`url(#${id}-leather-grain)`} stroke="#63361f" strokeWidth="2" />
          <rect x="24" y="16" width="216" height="108" rx="12" fill="none" stroke="#b17c51" strokeWidth=".8" />
          <rect x="29" y="21" width="206" height="98" rx="8" fill="none" stroke="#62331d" strokeWidth="2.8" />
          <rect x="29" y="21" width="206" height="98" rx="8" fill="none" stroke="#e0bb8f" strokeWidth="1.25" strokeDasharray="4 3" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}
