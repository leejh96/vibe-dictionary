import { useLocale } from '../../../i18n/LocaleContext';

export function SerifBrandDemo() {
  const { t } = useLocale();
  return (
    <div className="modern-demo">
      <svg className="md-serif-art" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.modern.serif.image')}>
        <g aria-hidden="true">
          <text x={132} y={83} textAnchor="middle" textLength={216} lengthAdjust="spacing">{t('demo.additions.modern.serif.wordmark')}</text>
          <path d="M24 108H240" fill="none" stroke="currentColor" strokeWidth={.8} opacity={.35} />
        </g>
      </svg>
    </div>
  );
}
