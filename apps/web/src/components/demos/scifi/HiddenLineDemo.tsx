import { useLocale } from '../../../i18n/LocaleContext';

export function HiddenLineDemo() {
  const { t } = useLocale();
  return <div className="scifi-demo">
    <svg className="sf-hidden-line" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.scifi.hiddenLineImage')}>
      <g aria-hidden="true">
        <g className="sf-drawing-visible">
          <path className="sf-drawing-left" d="M54 59L132 98V126L54 87Z" />
          <path className="sf-drawing-right" d="M132 98L210 59V87L132 126Z" />
          <path className="sf-drawing-top" d="M132 20L210 59L132 98L54 59Z" />
          <ellipse className="sf-drawing-aperture" cx={132} cy={59} rx={24} ry={12} />
        </g>
        <g className="sf-drawing-hidden">
          <path d="M108 59V87M156 59V87" />
          <ellipse cx={132} cy={87} rx={24} ry={12} />
        </g>
      </g>
    </svg>
  </div>;
}
