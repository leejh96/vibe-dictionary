import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function CutoutMaskDemo() {
  const { t } = useLocale();
  const id = useId();
  return <div className="graphic-demo">
    <svg className="gd-mask-canvas" viewBox="0 0 240 112" role="img" aria-label={t('demo.additions.graphic.cutoutImage')}>
      <defs>
        <linearGradient id={`${id}-fill`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--gd-ink)" /><stop offset="100%" stopColor="var(--gd-secondary)" />
        </linearGradient>
        <mask id={`${id}-mask`} maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" x={0} y={0} width={240} height={112} style={{ maskType: 'luminance' }}>
          <rect width={240} height={112} fill="white" />
          <circle className="gd-mask-hole" cx={120} cy={56} r={28} fill="black" />
        </mask>
      </defs>
      <rect x={40} y={14} width={160} height={84} rx={20} fill={`url(#${id}-fill)`} mask={`url(#${id}-mask)`} />
    </svg>
  </div>;
}
