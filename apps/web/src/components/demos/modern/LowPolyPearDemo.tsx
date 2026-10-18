import { useLocale } from '../../../i18n/LocaleContext';

const FACETS = [
  ['131,29 146,34 132,55', 'light'],
  ['146,34 153,54 132,55', 'mid'],
  ['153,54 171,78 149,84', 'shade'],
  ['171,78 178,99 149,84', 'deep'],
  ['178,99 165,119 149,84', 'shade'],
  ['165,119 133,108 149,84', 'mid'],
  ['165,119 135,127 133,108', 'deep'],
  ['135,127 108,120 133,108', 'shade'],
  ['108,120 118,82 133,108', 'mid'],
  ['108,120 89,101 118,82', 'light'],
  ['89,101 95,79 118,82', 'glow'],
  ['95,79 111,57 118,82', 'light'],
  ['111,57 132,55 118,82', 'glow'],
  ['111,57 117,38 132,55', 'light'],
  ['117,38 131,29 132,55', 'glow'],
  ['132,55 149,84 118,82', 'light'],
  ['118,82 149,84 133,108', 'warm'],
  ['132,55 153,54 149,84', 'mid'],
] as const;

export function LowPolyPearDemo() {
  const { t } = useLocale();
  return (
    <div className="modern-demo">
      <svg className="md-lowpoly-art" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.modern.lowPoly.image')}>
        <g aria-hidden="true">
          <ellipse cx={134} cy={130} rx={48} ry={5} fill="var(--md-poly-shadow)" />
          <path d="M132 34Q131 21 140 13" fill="none" stroke="var(--md-poly-stem)" strokeWidth={4} strokeLinecap="round" />
          <path d="M140 32L171 13L163 32Z" fill="var(--md-poly-leaf-light)" />
          <path d="M140 32L171 13L149 23Z" fill="var(--md-poly-leaf-shade)" />
          <g className="md-lowpoly-facets" strokeLinejoin="round" strokeWidth={.35}>
            {FACETS.map(([points, tone]) => <polygon key={points} points={points} fill={`var(--md-poly-${tone})`} stroke={`var(--md-poly-${tone})`} />)}
          </g>
        </g>
      </svg>
    </div>
  );
}
