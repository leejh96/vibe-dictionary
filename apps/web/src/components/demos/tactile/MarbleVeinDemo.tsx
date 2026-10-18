import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function MarbleVeinDemo() {
  const { t } = useLocale();
  const id = useId();

  return (
    <div className="tactile-demo">
      <svg className="tt-marble-art" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.tactile.marbleDescription')}>
        <defs>
          <linearGradient id={`${id}-marble-matrix`} x1="0" y1="0" x2=".75" y2="1">
            <stop stopColor="#f5f5f1" />
            <stop offset=".45" stopColor="#e8ecea" />
            <stop offset=".7" stopColor="#fbfaf5" />
            <stop offset="1" stopColor="#dce2e0" />
          </linearGradient>
          <radialGradient id={`${id}-marble-cloud`}>
            <stop stopColor="#87979b" stopOpacity=".16" />
            <stop offset="1" stopColor="#87979b" stopOpacity="0" />
          </radialGradient>
          <clipPath id={`${id}-marble-face`}>
            <rect x="18" y="12" width="228" height="116" rx="8" />
          </clipPath>
        </defs>
        <g aria-hidden="true">
          <rect x="18" y="18" width="228" height="116" rx="8" fill="#a3aaa6" />
          <rect x="18" y="12" width="228" height="116" rx="8" fill={`url(#${id}-marble-matrix)`} />
          <g clipPath={`url(#${id}-marble-face)`}>
            <g fill={`url(#${id}-marble-cloud)`}>
              <ellipse cx="69" cy="45" rx="80" ry="35" transform="rotate(-28 69 45)" />
              <ellipse cx="173" cy="101" rx="88" ry="28" transform="rotate(-29 173 101)" />
            </g>
            <path d="M5 109C39 82 52 103 77 79C101 57 109 63 127 43C150 18 165 34 180 4H204C184 48 155 39 137 64C117 91 104 82 91 104C67 130 43 110 5 142Z" fill="#8c999d" opacity=".12" />
            <path d="M7 119C38 95 52 111 80 87C101 69 103 74 128 50C149 31 160 42 184 8L194 8C173 46 151 40 132 59C109 82 100 79 87 96C58 121 40 105 7 132Z" fill="#77858a" opacity=".3" />
            <path d="M135 142C154 113 170 115 185 102C205 85 227 94 261 63V80C233 101 211 98 193 110C173 125 159 123 150 142Z" fill="#819095" opacity=".22" />
            <path d="M128 52C123 40 124 20 112 8L119 8C129 26 125 40 131 51Z M161 36C185 30 198 48 224 49C198 53 187 38 158 39Z M81 90C92 99 90 114 105 133L98 133C88 115 88 105 78 94Z" fill="#7b898d" opacity=".24" />
            <g fill="none" stroke="#69797e" strokeLinecap="round">
              <path d="M15 125C42 102 58 113 83 91S108 78 129 55S160 37 190 8" strokeWidth=".85" opacity=".58" />
              <path d="M145 137C158 117 178 116 189 105S228 94 252 74 M129 55C124 39 126 25 116 8 M82 92C92 106 89 113 102 131" strokeWidth=".55" opacity=".45" />
              <path d="M18 52C39 38 53 45 64 30S91 21 104 10 M197 99C201 89 195 79 206 69 M157 38C175 35 182 43 199 46" strokeWidth=".5" opacity=".28" />
            </g>
          </g>
          <rect x="18" y="12" width="228" height="116" rx="8" fill="none" stroke="#c1cbc6" strokeWidth=".8" />
          <path d="M26 13H238" fill="none" stroke="#fff" strokeWidth="1" opacity=".9" />
          <path d="M27 130H237" fill="none" stroke="#c5cdc7" strokeWidth=".8" />
        </g>
      </svg>
    </div>
  );
}
