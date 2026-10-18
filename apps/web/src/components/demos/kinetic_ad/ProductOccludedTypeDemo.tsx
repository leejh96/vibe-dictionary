import { useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function ProductOccludedTypeDemo() {
  const { t } = useLocale();
  const [replay, setReplay] = useState(0);

  return <div className="kinetic-ad-demo">
    <button type="button" className="ka-occluded-button" aria-label={t('demo.additions.kineticAd.occludedReplay')} onClick={() => setReplay(value => value + 1)}>
      <svg className="ka-occluded-scene" viewBox="0 0 264 148" aria-hidden="true">
        <text key={replay} className="ka-occluded-copy" x="132" y="43" textAnchor="middle">{t('demo.additions.kineticAd.sampleMove')}</text>
        <g className="ka-occluding-shoe">
          <path className="ka-shoe-upper" d="M56 89L63 65Q79 74 90 61L112 73L141 84L179 91Q202 91 210 105L211 113L57 113Q46 106 56 89Z" />
          <path className="ka-shoe-panel" d="M63 65L79 91L103 103L58 107Q50 104 56 89Z" />
          <path className="ka-shoe-sole" d="M52 106Q103 118 212 106L217 116Q136 132 56 119Z" />
          <path className="ka-shoe-laces" d="M99 77L113 70M109 83L124 77M119 89L135 83M130 95L146 89" />
          <path className="ka-shoe-stitch" d="M154 96Q173 102 193 102M66 118L66 122M84 120L84 125M102 122L102 127M120 123L120 127M138 123L138 127M156 122L156 126M174 120L174 124M192 118L192 121" />
        </g>
      </svg>
    </button>
  </div>;
}
