import { useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function ProductTypeFramingDemo() {
  const { t } = useLocale();
  const [replay, setReplay] = useState(0);

  return <div className="kinetic-ad-demo">
    <button type="button" className="ka-product-button" aria-label={t('demo.additions.kineticAd.productReplay')} onClick={() => setReplay(value => value + 1)}>
      <svg className="ka-product-scene" viewBox="0 0 264 148" aria-hidden="true">
        <g key={replay}>
          <g className="ka-product-copy">
            <text className="ka-product-stay" x="91" y="85" textAnchor="end">{t('demo.additions.kineticAd.sampleStay')}</text>
            <text className="ka-product-fresh" x="173" y="85">{t('demo.additions.kineticAd.sampleFresh')}</text>
          </g>
          <g className="ka-product-can">
            <g transform="rotate(7 132 76)">
              <path className="ka-can-body" d="M110 29Q132 24 154 29L158 118Q132 129 106 118Z" />
              <ellipse className="ka-can-top" cx="132" cy="29" rx="22" ry="5" />
              <ellipse className="ka-can-tab" cx="132" cy="29" rx="7" ry="2.5" />
              <text className="ka-can-brand" x="132" y="70" textAnchor="middle">{t('demo.additions.kineticAd.sampleZest')}</text>
              <circle className="ka-can-citrus" cx="132" cy="97" r="14" />
              <path className="ka-can-segments" d="M132 84V110M119 97H145M123 88L141 106M123 106L141 88" />
              <path className="ka-can-seam" d="M108 116Q132 123 156 116" />
            </g>
          </g>
        </g>
      </svg>
    </button>
  </div>;
}
