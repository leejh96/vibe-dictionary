import { useLocale } from '../../../i18n/LocaleContext';

export function ConstructivistPosterDemo() {
  const { t } = useLocale();
  return <div className="retro-demo">
    <svg className="rt-constructivist-art" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.retro.constructivistArtwork')}>
      <g aria-hidden="true">
        <circle cx="78" cy="56" r="38" fill="#c73b2f" />
        <path d="M164 103L225 71L225 119L164 132Z" fill="#c73b2f" />
        <path d="M169 110L219 84M169 118L219 92" fill="none" stroke="#f4e8cf" strokeWidth="2" />
        <g transform="rotate(-24 132 72)">
          <path d="M42 54H222V93H42Z" fill="#252724" />
          <text x="132" y="82" textAnchor="middle" fill="#f4e8cf" fontFamily="Arial, sans-serif" fontSize="29" fontWeight="900" letterSpacing="4">{t('demo.additions.retro.posterSample')}</text>
          <path d="M50 46H195M69 101H214" fill="none" stroke="#252724" strokeWidth="2" />
        </g>
        <path d="M25 111H53M25 118H53M25 125H53" fill="none" stroke="#252724" strokeWidth="3" />
      </g>
    </svg>
  </div>;
}
