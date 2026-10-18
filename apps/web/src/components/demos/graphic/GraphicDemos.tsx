import { useLocale } from '../../../i18n/LocaleContext';

export function PolygonMorphDemo() {
  const { t } = useLocale();
  return <div className="graphic-demo">
    <div className="gd-polygon-morph" role="img" aria-label={t('demo.additions.graphic.polygonImage')} />
  </div>;
}

export function MarchingAntsDemo() {
  const { t } = useLocale();
  return <div className="graphic-demo">
    <svg className="gd-ants-canvas" viewBox="0 0 240 112" role="img" aria-label={t('demo.additions.graphic.antsImage')}>
      <g className="gd-ants-art"><circle cx={104} cy={56} r={22} /><rect x={116} y={37} width={38} height={38} rx={8} transform="rotate(15 135 56)" /></g>
      <rect className="gd-ants-outline" x={36} y={14} width={168} height={84} rx={12} />
    </svg>
  </div>;
}
