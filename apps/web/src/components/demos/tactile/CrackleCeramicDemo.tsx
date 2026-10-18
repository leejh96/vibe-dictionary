import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

const CRACKS = 'M31 52L53 43L73 47L88 36L110 43L130 32L151 40L173 34L190 47L213 43L231 58 M25 81L46 72L63 82L83 70L104 80L123 68L143 77L163 65L184 77L204 68L233 84 M41 104L61 99L77 110L96 98L117 110L136 97L157 108L177 96L199 107L222 99 M53 43L46 72 M73 47L83 70 M110 43L104 80 M151 40L143 77 M190 47L184 77 M213 43L204 68 M46 72L61 99 M83 70L77 110 M104 80L96 98 M143 77L136 97 M184 77L177 96 M204 68L222 99 M53 43L48 20 M88 36L86 20 M130 32L129 20 M173 34L180 18 M213 43L224 24 M61 99L55 123 M96 98L101 126 M136 97L128 129 M177 96L181 125 M222 99L230 122';
const FINE_CRACKS = 'M73 47L67 60L46 72 M110 43L124 52L123 68 M151 40L165 49L163 65 M63 82L68 94L61 99 M104 80L118 89L136 97 M143 77L157 87L177 96 M190 47L198 57L204 68 M199 107L203 117';

export function CrackleCeramicDemo() {
  const { t } = useLocale();
  const id = useId();

  return (
    <div className="tactile-demo">
      <svg className="tt-ceramic-art" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.tactile.ceramicDescription')}>
        <defs>
          <linearGradient id={`${id}-ceramic-rim`} x1="0" y1="0" x2=".2" y2="1">
            <stop stopColor="#d7e8d5" />
            <stop offset=".5" stopColor="#98bdab" />
            <stop offset="1" stopColor="#4f816e" />
          </linearGradient>
          <radialGradient id={`${id}-ceramic-glaze`} cx=".56" cy=".68" r=".7">
            <stop stopColor="#c8dfd0" />
            <stop offset=".7" stopColor="#90baaa" />
            <stop offset="1" stopColor="#568b7a" />
          </radialGradient>
          <radialGradient id={`${id}-ceramic-reflection`}>
            <stop stopColor="#fffdf0" stopOpacity=".55" />
            <stop offset="1" stopColor="#fffdf0" stopOpacity="0" />
          </radialGradient>
          <clipPath id={`${id}-ceramic-face`}>
            <ellipse cx="132" cy="72" rx="98" ry="42" />
          </clipPath>
        </defs>
        <g aria-hidden="true">
          <ellipse cx="134" cy="125" rx="89" ry="8" fill="#274d3820" />
          <ellipse cx="132" cy="78" rx="110" ry="48" fill="#9c896b" />
          <ellipse cx="132" cy="73" rx="110" ry="51" fill={`url(#${id}-ceramic-rim)`} stroke="#73957c" strokeWidth=".8" />
          <ellipse cx="132" cy="72" rx="98" ry="42" fill={`url(#${id}-ceramic-glaze)`} />
          <g clipPath={`url(#${id}-ceramic-face)`} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d={CRACKS} stroke="#426e5e" strokeWidth=".7" opacity=".54" />
            <path d={FINE_CRACKS} stroke="#426e5e" strokeWidth=".4" opacity=".32" />
            <ellipse cx="101" cy="53" rx="45" ry="20" fill={`url(#${id}-ceramic-reflection)`} />
            <path d="M54 55C64 36 100 31 128 33" stroke="#f4fae9" strokeWidth="1.8" opacity=".62" />
          </g>
          <ellipse cx="132" cy="72" rx="105" ry="47" fill="none" stroke="#e6f2db" strokeWidth=".8" opacity=".7" />
          <path d="M37 96C77 132 193 132 229 96" fill="none" stroke="#39705d" strokeWidth="1" opacity=".5" />
        </g>
      </svg>
    </div>
  );
}
