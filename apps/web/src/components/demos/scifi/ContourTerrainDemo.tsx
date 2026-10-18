import { useLocale } from '../../../i18n/LocaleContext';

const CONTOUR = 'M-94 3C-91-12-67-19-45-14C-28-29-3-29 10-19C24-28 58-20 59-9C88-10 105 8 84 19C67 31 38 23 22 29C-4 40-26 24-41 25C-64 32-91 21-94 3Z';

export function ContourTerrainDemo() {
  const { t } = useLocale();
  return <div className="scifi-demo">
    <svg className="sf-contour-terrain" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.scifi.terrainImage')}>
      <g aria-hidden="true" strokeLinejoin="round">
        <path className="sf-terrain-platform" d="M20 100L132 64L244 100L132 136Z" />
        <g className="sf-terrain-base" fill="none">
          <path d="M20 100V106L132 142L244 106V100M132 136V142" />
          <path d="M99 130L132 140L165 130M26 105L40 109" />
        </g>
        <path className="sf-terrain-guides" d="M38 73V106M154 99V129M216 89V109" />
        <g className="sf-terrain-levels" fill="none">
          {Array.from({ length: 7 }, (_, index) => <path key={index} d={CONTOUR} transform={`translate(132 ${70 - index * 7}) scale(${1 - index * .115})`} opacity={.48 + index * .075} />)}
        </g>
      </g>
    </svg>
  </div>;
}
