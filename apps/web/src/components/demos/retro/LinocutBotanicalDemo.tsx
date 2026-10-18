import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function LinocutBotanicalDemo() {
  const { t } = useLocale();
  const maskId = `linocut-carving-${useId()}`;

  return <div className="retro-demo">
    <svg className="rt-linocut-art" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.retro.linocutArtwork')}>
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="264" height="144" style={{ maskType: 'luminance' }}>
          <path d="M0 0H264V144H0Z" fill="#fff" />
          <path fill="#000" d="M128 94C111 80 94 58 82 38C91 63 108 86 128 98Z M114 83L91 75L110 79Z M106 73L88 64L103 69Z M98 61L84 49L96 57Z M118 85L118 67L121 82Z M108 72L106 54L111 70Z M98 58L93 43L101 56Z M136 99C151 79 170 60 183 51C166 69 150 87 139 102Z M150 87L169 83L153 90Z M159 77L176 69L162 80Z M169 65L183 57L172 68Z M151 85L150 70L155 82Z M162 74L163 60L165 71Z M131 59L132 24L135 56Z M132 43L122 33L132 39Z M133 50L144 38L135 47Z M132 53L121 43L132 49Z" />
        </mask>
      </defs>
      <g aria-hidden="true" fill="#243b35" mask={`url(#${maskId})`}>
        <path d="M132 94C101 105 71 59 76 29C106 30 133 57 132 94Z M132 99C140 72 162 46 188 43C188 77 174 106 132 99Z M132 66C112 52 115 29 132 16C150 28 154 50 132 66Z" />
        <path d="M130 128C137 102 130 83 132 59" fill="none" stroke="#243b35" strokeWidth="7" strokeLinecap="round" />
      </g>
    </svg>
  </div>;
}
