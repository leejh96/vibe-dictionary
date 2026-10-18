import { useLocale } from '../../../i18n/LocaleContext';

export function IndeterminateLinearDemo() {
  const { t } = useLocale();
  return <div className="layout-demo ld-loader-demo"><div className="ld-indeterminate" role="progressbar" aria-label={t('demo.additions.layout.contentLoading')}>
    <span className="ld-indeterminate-segment" aria-hidden="true" /><span className="ld-indeterminate-segment" aria-hidden="true" />
  </div></div>;
}

export function CircularSweepDemo() {
  const { t } = useLocale();
  return <div className="layout-demo ld-loader-demo"><div className="ld-spinner" role="progressbar" aria-label={t('demo.additions.layout.contentLoading')}>
    <svg className="ld-spinner-wheel" width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
      <circle className="ld-spinner-track" cx="24" cy="24" r="18" fill="none" strokeWidth="4" />
      <circle className="ld-spinner-arc" cx="24" cy="24" r="18" fill="none" strokeWidth="4" strokeLinecap="round" pathLength="100" />
    </svg>
  </div></div>;
}

export function DotWaveDemo() {
  const { t } = useLocale();
  return <div className="layout-demo ld-loader-demo"><div className="ld-dot-bubble" role="status">
    <span className="sr-only">{t('demo.additions.layout.waitingResponse')}</span>
    {[0, 1, 2].map(index => <span className="ld-wave-dot" key={index} aria-hidden="true" style={{ animationDelay: `${index * 160}ms` }} />)}
  </div></div>;
}
