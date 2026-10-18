import { useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function TypeProductMatchCutDemo() {
  const { t } = useLocale();
  const [replay, setReplay] = useState(0);

  return <div className="kinetic-ad-demo">
    <button type="button" className="ka-match-button" aria-label={t('demo.additions.kineticAd.matchReplay')} onClick={() => setReplay(value => value + 1)}>
      <svg className="ka-match-scene" viewBox="0 0 264 148" aria-hidden="true">
        <g key={replay}>
          <text className="ka-match-intro" x="125" y="103" textAnchor="end">{t('demo.additions.kineticAd.sampleG')}</text>
          <g className="ka-match-payoff">
            <text x="18" y="65">{t('demo.additions.kineticAd.samplePure')}</text>
            <text x="18" y="100">{t('demo.additions.kineticAd.sampleJoy')}</text>
            <circle className="ka-match-pulp" cx="165" cy="74" r="25" />
            <path className="ka-match-segments" d="M165 51V97M142 74H188M149 58L181 90M149 90L181 58" />
            <circle className="ka-match-core" cx="165" cy="74" r="3" />
            <path className="ka-match-leaf" d="M179 47Q179 28 199 32Q199 47 179 47Z" />
          </g>
          <circle className="ka-match-anchor" cx="165" cy="74" r="26" />
        </g>
      </svg>
    </button>
  </div>;
}
