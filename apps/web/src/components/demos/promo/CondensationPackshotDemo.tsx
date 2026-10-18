import { useLocale } from '../../../i18n/LocaleContext';
import { useId } from 'react';

const CAN_PATH = 'M88 29Q132 20 176 29L173 122Q132 135 91 122Z';
const BEADS = [
  [100, 44, 2.2], [116, 43, 1.3], [138, 42, 2.5], [160, 44, 1.7],
  [109, 53, 3.5], [128, 51, 1.6], [150, 54, 2.8], [168, 55, 1.2],
  [98, 65, 1.7], [119, 64, 2.5], [139, 64, 1.2], [159, 66, 3.4],
  [108, 75, 1.3], [125, 74, 3.2], [145, 76, 2.5], [169, 77, 1.8],
  [98, 87, 2.8], [114, 86, 1.5], [133, 87, 3.7], [155, 88, 1.4], [166, 93, 2.6],
  [107, 98, 3.1], [123, 101, 1.4], [145, 100, 2.2],
  [97, 110, 1.2], [117, 113, 3.4], [135, 113, 1.9], [157, 111, 3.1],
  [105, 120, 1.8], [147, 121, 1.4], [166, 121, 1.2],
];

export function CondensationPackshotDemo() {
  const { t } = useLocale();
  const id = useId();

  return (
    <div className="promo-demo pr-dew-demo">
      <svg className="pr-dew-scene" viewBox="0 0 264 148" role="img" aria-label={t('demo.additions.promo.dew.scene')}>
        <defs>
          <linearGradient id={`${id}-paint`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#3d8b76" /><stop offset=".35" stopColor="#95c9a6" /><stop offset=".7" stopColor="#72b59a" /><stop offset="1" stopColor="#286f5b" />
          </linearGradient>
          <radialGradient id={`${id}-water`} cx="30%" cy="25%" r="85%">
            <stop offset="0" stopColor="#ffffff" stopOpacity=".34" /><stop offset=".5" stopColor="#ffffff" stopOpacity=".04" /><stop offset="1" stopColor="#08392e" stopOpacity=".3" />
          </radialGradient>
          <clipPath id={`${id}-body`}><path d={CAN_PATH} /></clipPath>
          <g id={`${id}-surface`}>
            <path className="pr-dew-can" fill={`url(#${id}-paint)`} d={CAN_PATH} />
            <g clipPath={`url(#${id}-body)`}>
              <path className="pr-dew-band" d="M88 56L176 72V88L88 72Z" />
              <circle className="pr-dew-citrus" cx="132" cy="84" r="19" />
              <circle className="pr-dew-pith" cx="132" cy="84" r="15" />
              <path className="pr-dew-segments" d="M132 69V99M117 84H147M121 73L143 95M121 95L143 73" />
            </g>
          </g>
          {BEADS.map(([x, y, radius], index) => <clipPath key={index} id={`${id}-drop-${index}`}>
            <ellipse cx={x} cy={y} rx={radius} ry={radius * 1.12} />
          </clipPath>)}
        </defs>
        <g aria-hidden="true">
          <ellipse className="pr-dew-ground" cx="132" cy="135" rx="62" ry="6" />
          <use className="pr-dew-product" href={`#${id}-surface`} />
          <ellipse className="pr-dew-lid" cx="132" cy="29" rx="44" ry="6" />
          <ellipse className="pr-dew-lid-ring" cx="132" cy="29" rx="38" ry="3.5" />
          <ellipse className="pr-dew-tab" cx="132" cy="29" rx="10" ry="2.5" />
          <path className="pr-dew-base-rim" d="M94 122Q132 132 170 122" />
          {BEADS.map(([x, y, radius], index) => <g key={index} className="pr-dew-bead">
            <ellipse className="pr-dew-contact" cx={x + .7} cy={y + .9} rx={radius} ry={radius * 1.12} />
            <g className="pr-dew-refraction" clipPath={`url(#${id}-drop-${index})`}>
              <use href={`#${id}-surface`} transform={`translate(${x} ${y}) scale(1.7) translate(${-x} ${-y})`} />
            </g>
            <ellipse className="pr-dew-water" fill={`url(#${id}-water)`} cx={x} cy={y} rx={radius} ry={radius * 1.12} />
            <ellipse className="pr-dew-glint" cx={x - radius * .28} cy={y - radius * .37} rx={radius * .25} ry={radius * .15} />
          </g>)}
        </g>
      </svg>
    </div>
  );
}
