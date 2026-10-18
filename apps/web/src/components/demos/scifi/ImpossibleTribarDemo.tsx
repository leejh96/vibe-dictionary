import { useLocale } from '../../../i18n/LocaleContext';

export function ImpossibleTribarDemo() {
  const { t } = useLocale();
  return <div className="scifi-demo">
    <svg className="sf-impossible-tribar" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.scifi.tribarImage')}>
      <g aria-hidden="true" className="sf-tribar-faces">
        <polygon className="sf-tribar-light" points="142,12 202,115.92 192,133.24 142,46.64 132,63.96 112,98.6 92,98.6" />
        <polygon className="sf-tribar-mid" points="192,133.24 72,133.24 62,115.92 162,115.92 152,98.6 132,63.96 142,46.64" />
        <polygon className="sf-tribar-dark" points="62,115.92 122,12 142,12 92,98.6 112,98.6 152,98.6 162,115.92" />
      </g>
    </svg>
  </div>;
}
