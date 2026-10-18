import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function MemphisPatternDemo() {
  const { t } = useLocale();
  const stripesId = `memphis-stripes-${useId()}`;

  return <div className="retro-demo">
    <svg className="rt-memphis-art" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.retro.memphisArtwork')}>
      <defs>
        <pattern id={stripesId} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <rect width="8" height="8" fill="#c4b5fd" />
          <path d="M0 0V8" stroke="#292447" strokeWidth="3" />
        </pattern>
      </defs>
      <g aria-hidden="true">
        <circle cx="51" cy="51" r="29" fill="#fb7185" />
        <circle cx="62" cy="44" r="29" fill="none" stroke="#292447" strokeWidth="3" />
        <path d="M142 18L179 81H105Z" fill="#facc15" stroke="#292447" strokeWidth="3" strokeLinejoin="round" />
        <rect x="170" y="87" width="70" height="39" transform="rotate(-12 205 106.5)" fill={`url(#${stripesId})`} stroke="#292447" strokeWidth="3" />
        <path d="M27 117A24 24 0 0 1 75 117" fill="none" stroke="#2dd4bf" strokeWidth="15" />
        <path d="M197 30q7-14 14 0t14 0t14 0M94 112l9-10 9 10 9-10 9 10 9-10" fill="none" stroke="#292447" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="98" cy="29" r="4" fill="#292447" />
        <circle cx="151" cy="128" r="4" fill="#fb7185" />
        <path d="M24 79l8 6M224 62l-7 7" stroke="#292447" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  </div>;
}
