import { useId, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function LandscapeFilledTypeDemo() {
  const { t } = useLocale();
  const clipId = `ka-landscape-${useId().replace(/:/g, '')}`;
  const [replay, setReplay] = useState(0);

  return <div className="kinetic-ad-demo">
    <button type="button" className="ka-landscape-button" aria-label={t('demo.additions.kineticAd.landscapeReplay')} onClick={() => setReplay(value => value + 1)}>
      <svg className="ka-landscape-scene" viewBox="0 0 264 148" aria-hidden="true">
        <defs>
          <clipPath id={clipId}>
            <text className="ka-landscape-word" x="132" y="101" textAnchor="middle">{t('demo.additions.kineticAd.sampleRoam')}</text>
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          <rect className="ka-landscape-sky" width="264" height="148" />
          <g key={replay} className="ka-landscape-pan">
            <circle className="ka-landscape-sun" cx="199" cy="57" r="15" />
            <path className="ka-landscape-far" d="M0 97L38 59L70 85L112 45L154 88L194 61L234 92L282 48L338 89V148H0Z" />
            <path className="ka-landscape-near" d="M0 115L43 91L78 108L129 79L169 108L220 85L269 111L308 83L338 102V148H0Z" />
          </g>
        </g>
        <text className="ka-landscape-word ka-landscape-outline" x="132" y="101" textAnchor="middle">{t('demo.additions.kineticAd.sampleRoam')}</text>
      </svg>
    </button>
  </div>;
}
