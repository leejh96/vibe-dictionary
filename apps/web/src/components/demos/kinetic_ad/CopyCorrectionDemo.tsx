import { useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function CopyCorrectionDemo() {
  const { t } = useLocale();
  const [replay, setReplay] = useState(0);

  return <div className="kinetic-ad-demo">
    <button type="button" className="ka-correction-button" aria-label={t('demo.additions.kineticAd.correctionReplay')} onClick={() => setReplay(value => value + 1)}>
      <svg className="ka-correction-scene" viewBox="0 0 264 148" aria-hidden="true">
        <g key={replay}>
          <text className="ka-correction-old" x="132" y="88" textAnchor="middle">{t('demo.additions.kineticAd.sampleSmall')}</text>
          <text className="ka-correction-base" x="132" y="127" textAnchor="middle">{t('demo.additions.kineticAd.sampleIdeas')}</text>
          <path className="ka-correction-line" d="M52 74L207 69L58 84L204 78" pathLength="1" />
          <g className="ka-correction-insert">
            <g transform="rotate(-5 132 32)">
              <text className="ka-correction-new" x="132" y="42" textAnchor="middle">{t('demo.additions.kineticAd.sampleBold')}</text>
            </g>
            <path className="ka-correction-caret" d="M121 55L132 47L143 55" />
          </g>
        </g>
      </svg>
    </button>
  </div>;
}
