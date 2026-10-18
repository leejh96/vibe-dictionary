import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

const AGGREGATES = [
  { color: '#c38772', path: 'M20 14L35 16L30 29L19 25Z M78 11L94 15L88 25L79 23Z M137 29L151 25L158 38L145 43L134 36Z M214 17L231 22L226 35L211 30Z M57 51L67 44L76 56L68 67L55 61Z M107 72L124 67L130 79L116 86L105 81Z M184 59L198 54L205 67L194 73Z M21 99L36 94L43 110L28 119L19 112Z M152 111L163 100L177 109L170 124L157 126Z M221 102L239 96L247 109L233 119L221 116Z' },
  { color: '#9cae9f', path: 'M45 22L60 18L66 31L51 38L43 31Z M110 16L123 21L118 35L104 30Z M177 15L190 11L200 23L188 32L176 27Z M23 48L39 42L47 54L36 64L24 59Z M83 40L96 44L92 57L80 52Z M143 59L158 50L172 61L164 77L148 73Z M214 47L230 44L236 57L220 65L211 58Z M61 90L73 82L84 92L78 106L64 103Z M115 108L130 100L138 114L126 127L112 119Z M186 95L197 86L210 97L201 110L187 108Z' },
  { color: '#626966', path: 'M70 27L78 29L75 37L67 34Z M161 18L171 22L166 31L156 26Z M239 30L247 34L243 43L235 39Z M48 71L56 74L52 83L43 80Z M117 47L127 43L132 52L124 60L115 55Z M178 81L187 78L191 89L183 93Z M93 99L102 102L98 113L90 108Z M41 120L49 115L54 125L46 132Z M211 121L222 119L225 128L215 132Z M231 77L238 72L244 81L237 86Z' },
  { color: '#f7f2e7', path: 'M32 33L40 30L44 39L36 44Z M95 29L103 33L98 41L90 37Z M124 12L135 15L131 24L122 22Z M204 34L215 37L210 46L201 42Z M77 68L89 61L98 72L91 83L79 79Z M131 86L143 81L151 91L143 101L131 97Z M162 39L173 36L181 46L169 52L159 47Z M26 78L37 74L42 86L31 92L23 86Z M87 119L97 116L103 126L93 134L84 129Z M174 116L186 112L192 124L181 133L171 126Z' },
] as const;

export function TerrazzoDemo() {
  const { t } = useLocale();
  const id = useId();

  return (
    <div className="tactile-demo">
      <svg className="tt-terrazzo-art" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.tactile.terrazzoDescription')}>
        <defs>
          <clipPath id={`${id}-terrazzo-face`}>
            <rect x="18" y="12" width="228" height="116" rx="10" />
          </clipPath>
        </defs>
        <g aria-hidden="true">
          <rect x="18" y="18" width="228" height="116" rx="10" fill="#b6a993" />
          <rect x="18" y="12" width="228" height="116" rx="10" fill="#e4dbc9" />
          <g clipPath={`url(#${id}-terrazzo-face)`}>
            {AGGREGATES.map(({ color, path }) => <path key={color} d={path} fill={color} />)}
          </g>
          <rect x="18" y="12" width="228" height="116" rx="10" fill="none" stroke="#b9ac96" strokeWidth="1" />
          <path d="M28 13H236" fill="none" stroke="#fff8e9" strokeWidth=".8" opacity=".8" />
        </g>
      </svg>
    </div>
  );
}
