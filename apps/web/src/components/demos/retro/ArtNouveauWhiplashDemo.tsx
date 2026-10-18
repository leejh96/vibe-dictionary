import { useLocale } from '../../../i18n/LocaleContext';

export function ArtNouveauWhiplashDemo() {
  const { t } = useLocale();
  return <div className="retro-demo">
    <svg className="rt-nouveau-art" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.retro.artNouveauArtwork')}>
      <g aria-hidden="true" stroke="#36564f" strokeLinecap="round" strokeLinejoin="round">
        <path d="M31 126C13 108 24 81 43 77C69 71 69 99 50 101C36 103 33 90 42 86C48 84 53 88 50 92M31 126C57 145 96 123 116 127C139 131 145 138 168 128C191 117 209 126 232 112M32 126C16 84 32 39 64 26C83 18 101 25 107 37" fill="none" strokeWidth="2.5" />
        <path d="M157 21C177 7 198 20 192 35C186 49 167 43 171 32C174 25 182 27 182 32M157 21C204 5 249 36 237 71C233 84 222 92 222 104C222 115 233 118 239 109M234 48C223 40 209 43 207 55" fill="none" strokeWidth="2" />
        <path d="M39 51C40 34 51 24 67 23C61 39 51 48 39 51ZM214 120C203 129 190 132 179 127C190 118 202 116 214 120Z" fill="#9eaf89" strokeWidth="1.4" />
        <path d="M30 121C23 81 38 42 66 31M163 128C191 112 213 124 232 107" fill="none" stroke="#ad794e" strokeWidth="1" />
        <g transform="translate(133 71) rotate(-18)" strokeWidth="1.6">
          <path d="M-3-6C-25-36-61-40-70-26C-79-9-43 4-3 6Z" fill="#e4c696" />
          <path d="M3-6C25-36 61-40 70-26C79-9 43 4 3 6Z" fill="#e4c696" />
          <path d="M-3 3C-25-9-51-4-54 11C-54 27-22 27-2 12Z" fill="#b7c3a4" />
          <path d="M3 3C25-9 51-4 54 11C54 27 22 27 2 12Z" fill="#b7c3a4" />
          <path d="M-3 1C-28-16-47-26-66-24M-25-12Q-33-24-49-30M-25-12Q-47-8-60-16M3 1C28-16 47-26 66-24M25-12Q33-24 49-30M25-12Q47-8 60-16M-3 9Q-26 9-49 14M-23 10L-34 21M3 9Q26 9 49 14M23 10L34 21" fill="none" strokeWidth="1" />
          <path d="M0-16C-7-13-6-2-3 8C-2 15-3 30 0 39C3 30 2 15 3 8C6-2 7-13 0-16Z" fill="#36564f" />
          <path d="M-2-15Q-10-25-7-28M2-15Q10-25 7-28" fill="none" strokeWidth="1.3" />
          <path d="M-2 14H2M-2 21H2M-1 28H1" stroke="#e4c696" strokeWidth="1" />
        </g>
      </g>
    </svg>
  </div>;
}
