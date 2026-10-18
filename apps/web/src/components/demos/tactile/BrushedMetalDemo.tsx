import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function BrushedMetalDemo() {
  const { t } = useLocale();
  const id = useId();

  return (
    <div className="tactile-demo">
      <svg className="tt-metal-art" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.tactile.metalDescription')}>
        <defs>
          <linearGradient id={`${id}-metal-tone`} x1="0" y1="0" x2="1" y2=".18">
            <stop stopColor="#7c8791" />
            <stop offset=".18" stopColor="#d4dade" />
            <stop offset=".3" stopColor="#adb7be" />
            <stop offset=".48" stopColor="#f1f4f5" />
            <stop offset=".58" stopColor="#d3d9dd" />
            <stop offset=".8" stopColor="#919ca6" />
            <stop offset="1" stopColor="#c3cbd1" />
          </linearGradient>
          <pattern id={`${id}-metal-brush`} patternUnits="userSpaceOnUse" width="72" height="12" strokeWidth=".45">
            <g stroke="#263746" opacity=".14">
              <line x1="0" y1="1" x2="50" y2="1" />
              <line x1="12" y1="5" x2="72" y2="5" />
              <line x1="0" y1="9" x2="34" y2="9" />
            </g>
            <g stroke="#fff" opacity=".32">
              <line x1="10" y1="2" x2="62" y2="2" />
              <line x1="0" y1="7" x2="48" y2="7" />
            </g>
          </pattern>
        </defs>
        <g aria-hidden="true">
          <rect x="20" y="127" width="224" height="7" rx="6" fill="#14233030" />
          <rect x="18" y="14" width="228" height="116" rx="10" fill="#596570" />
          <rect x="20" y="12" width="224" height="114" rx="8" fill={`url(#${id}-metal-tone)`} stroke="#e3e9ed" strokeWidth=".8" />
          <rect x="20" y="12" width="224" height="114" rx="8" fill={`url(#${id}-metal-brush)`} />
          <rect x="22" y="14" width="220" height="110" rx="6" fill="none" stroke="#ffffff70" strokeWidth=".7" />
          <path d="M28 14H236" fill="none" stroke="#fff" strokeWidth=".8" opacity=".7" />
          <path d="M28 124H236" fill="none" stroke="#56636e" strokeWidth=".7" />
        </g>
      </svg>
    </div>
  );
}
