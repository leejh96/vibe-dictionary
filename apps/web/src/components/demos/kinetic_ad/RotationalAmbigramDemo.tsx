import { useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function RotationalAmbigramDemo() {
  const { t } = useLocale();
  const [turned, setTurned] = useState(false);

  return <div className="kinetic-ad-demo">
    <button type="button" className="ka-ambigram-button" aria-label={t('demo.additions.kineticAd.ambigramToggle')} aria-pressed={turned} onClick={() => setTurned(value => !value)}>
      <svg className="ka-ambigram-scene" viewBox="0 0 264 148" aria-hidden="true" data-turned={turned}>
        <g transform="translate(132 74)">
          <g className="ka-ambigram-word" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M-62 20V-20L-40 20V-20M40 20V-20L62 20V-20" />
            <rect x="-28" y="-20" width="22" height="40" rx="11" />
            <rect x="6" y="-20" width="22" height="40" rx="11" />
          </g>
        </g>
      </svg>
    </button>
  </div>;
}
