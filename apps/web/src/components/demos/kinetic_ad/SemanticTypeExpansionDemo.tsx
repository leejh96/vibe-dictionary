import { useState, type CSSProperties } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function SemanticTypeExpansionDemo() {
  const { t } = useLocale();
  const [expanded, setExpanded] = useState(false);

  return <div className="kinetic-ad-demo">
    <button type="button" className="ka-expansion-button" aria-label={t('demo.additions.kineticAd.expansionToggle')} aria-pressed={expanded} onClick={() => setExpanded(value => !value)}>
      <svg className="ka-expansion-scene" viewBox="0 0 264 148" aria-hidden="true" data-expanded={expanded} style={{ '--ka-expand-progress': expanded ? 1 : 0 } as CSSProperties}>
        <g className="ka-expansion-word">
          <path d="M24 100V48L41 72L58 48V100" />
          <rect className="ka-expansion-o" x="74" y="48" height="52" rx="18" />
          <g className="ka-expansion-following">
            <path d="M126 100V48H141Q155 48 155 61Q155 74 141 74H126M141 74L158 100" />
            <path d="M198 48H174V100H198M174 74H194" />
          </g>
        </g>
      </svg>
    </button>
  </div>;
}
