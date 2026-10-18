import { useLocale } from '../../../i18n/LocaleContext';

export function OrthographicViewsDemo() {
  const { t } = useLocale();
  return <div className="scifi-demo">
    <svg className="sf-orthographic-views" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.scifi.orthographicImage')}>
      <g aria-hidden="true">
        <g className="sf-ortho-projectors">
          <path d="M28 50V84M78 50V84M112 50V112M78 84H174M112 112H174M112 126H174" />
          <path d="M112 18H206V84M112 50H174V84" />
          <path className="sf-ortho-miter" d="M174 50L206 18" />
        </g>
        <g className="sf-ortho-outlines" data-view="top">
          <rect x={28} y={18} width={84} height={32} />
          <path d="M78 18V50" />
          <circle className="sf-ortho-aperture" cx={95} cy={34} r={7} />
        </g>
        <g className="sf-ortho-outlines" data-view="front">
          <polygon points="28,126 28,84 78,84 78,112 112,112 112,126" />
          <g className="sf-ortho-hidden">
            {[88, 102].map(x => <line key={x} x1={x} x2={x} y1={112} y2={126} />)}
          </g>
        </g>
        <g className="sf-ortho-outlines" data-view="right">
          <rect x={174} y={84} width={32} height={42} />
          <path d="M174 112H206" />
          <g className="sf-ortho-hidden">
            {[183, 197].map(x => <line key={x} x1={x} x2={x} y1={112} y2={126} />)}
          </g>
        </g>
        <path className="sf-ortho-centers" d="M95 14V54M84 34H106M95 108V130M190 108V130" />
      </g>
    </svg>
  </div>;
}
