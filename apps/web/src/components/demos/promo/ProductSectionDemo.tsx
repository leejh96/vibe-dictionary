import { useDemoNumber } from '../../../hooks/useDemoAutoplay';
import { useLocale } from '../../../i18n/LocaleContext';
import { useId } from 'react';

const LAYERS = [
  { id: 'outer', radius: 44 },
  { id: 'mantle', radius: 34 },
  { id: 'core', radius: 20 },
];
const DIMPLES = [[-24, -24], [0, -28], [24, -24], [-34, -9], [-12, -8], [12, -8], [34, -9], [-34, 13], [-12, 14], [12, 14], [34, 13], [-22, 30], [0, 33], [22, 30]];

export function ProductSectionDemo() {
  const { t } = useLocale();
  const [depth, setDepth] = useDemoNumber(-42, -42, 42, 1);
  const id = useId();
  const sectionX = 72 + depth;
  const halfChord = Math.sqrt(44 ** 2 - depth ** 2);

  return (
    <div className="promo-demo pr-section-demo">
      <svg id={`${id}-scene`} className="pr-section-scene" viewBox="0 0 264 148" role="img" aria-label={t('demo.additions.promo.section.scene')}>
        <defs>
          <radialGradient id={`${id}-shell`} cx="30%" cy="26%" r="80%">
            <stop offset="0" stopColor="#fffef2" /><stop offset=".65" stopColor="#dfe2d3" /><stop offset="1" stopColor="#9ba697" />
          </radialGradient>
        </defs>
        <g aria-hidden="true">
          <ellipse className="pr-section-shadow" cx="72" cy="126" rx="43" ry="7" />
          <g className="pr-section-product">
            <circle className="pr-section-shell" cx="72" cy="74" r="44" fill={`url(#${id}-shell)`} />
            {DIMPLES.map(([x, y]) => <circle className="pr-section-dimple" key={`${x},${y}`} cx={72 + x} cy={74 + y} r="3" />)}
          </g>
          <path className="pr-section-direction" d="M129 68L135 74L129 80" />
          <g className="pr-section-cut">
            <path className="pr-section-chord" d={`M${sectionX} ${74 - halfChord}V${74 + halfChord}`} />
            <path className="pr-section-tip" d={`M${sectionX - 4} ${67 - halfChord}H${sectionX + 4}L${sectionX} ${73 - halfChord}Z`} />
          </g>
          <g className="pr-section-result">
            {LAYERS.map(layer => Math.abs(depth) < layer.radius && (
              <circle key={layer.id} className={`pr-section-layer pr-section-${layer.id}`} cx="194" cy="74" r={Math.sqrt(layer.radius ** 2 - depth ** 2)} />
            ))}
          </g>
        </g>
      </svg>
      <input className="pr-section-progress" type="range" min="-42" max="42" step="1" value={depth}
        aria-label={t('demo.additions.promo.section.position')} aria-controls={`${id}-scene`}
        aria-valuetext={depth === 0 ? t('demo.additions.promo.section.center') : depth < 0 ? t('demo.additions.promo.section.left', { depth: Math.abs(depth) }) : t('demo.additions.promo.section.right', { depth: Math.abs(depth) })}
        onChange={event => setDepth(Number(event.currentTarget.value))} />
    </div>
  );
}
