import { useLocale } from '../../../i18n/LocaleContext';

const ROUTE = 'M16 90 C16 20 95 20 116 56 S214 100 224 22';

export function MotionPathDemo() {
  const { t } = useLocale();
  return <div className="graphic-demo">
    <svg className="gd-path-canvas" viewBox="0 0 240 112" role="img" aria-label={t('demo.additions.graphic.motionPathImage')}>
      <path className="gd-path-rail" d={ROUTE} />
      <circle className="gd-path-end" cx={16} cy={90} r={3} />
      <circle className="gd-path-end" cx={224} cy={22} r={3} />
      <g className="gd-path-marker" style={{ offsetPath: `path('${ROUTE}')` }}>
        <path d="M-8-6 8 0-8 6-4 0Z" />
      </g>
    </svg>
  </div>;
}
