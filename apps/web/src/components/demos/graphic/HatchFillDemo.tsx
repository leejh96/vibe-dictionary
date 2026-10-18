import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function HatchFillDemo() {
  const { t } = useLocale();
  const id = useId();
  return <div className="graphic-demo">
    <svg className="gd-hatch-canvas" viewBox="0 0 240 112" role="img" aria-label={t('demo.additions.graphic.hatchImage')}>
      <defs>
        <pattern id={id} width={8} height={8} patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
          <rect className="gd-hatch-tile" width={8} height={8} />
          <path className="gd-hatch-lines" d="M-2 2 2-2 M0 8 8 0 M6 10 10 6" />
        </pattern>
      </defs>
      <g className="gd-hatch-shapes" fill={`url(#${id})`}>
        <circle cx={60} cy={56} r={36} />
        <rect x={112} y={20} width={104} height={72} rx={18} />
      </g>
    </svg>
  </div>;
}
