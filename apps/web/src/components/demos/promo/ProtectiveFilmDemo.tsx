import { useDemoNumber } from '../../../hooks/useDemoAutoplay';
import { useLocale } from '../../../i18n/LocaleContext';
import { useId } from 'react';

export function ProtectiveFilmDemo() {
  const { t } = useLocale();
  const [progress, setProgress] = useDemoNumber(0, 0, 100, 1);
  const id = useId();
  const peeled = Math.min(1, progress / 90);
  const foldY = 122 - 52 * peeled;
  const freeY = foldY - 52 * peeled * .65;
  const radius = Math.min(5, 52 * peeled * .3);
  const lift = Math.max(0, progress - 90) * 1.6;

  return (
    <div className="promo-demo pr-film-demo">
      <svg id={`${id}-scene`} className="pr-film-scene" viewBox="0 0 264 148" role="img" aria-label={t('demo.additions.promo.film.scene')}>
        <defs>
          <clipPath id={`${id}-screen`}><rect x="56" y="70" width="152" height="52" rx="4" /></clipPath>
          <linearGradient id={`${id}-curl`} x1="0" y1={foldY - radius} x2="0" y2={foldY + radius} gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#fdfce9" /><stop offset=".5" stopColor="#94a39d" /><stop offset="1" stopColor="#f6f5dc" />
          </linearGradient>
        </defs>
        <g aria-hidden="true">
          <ellipse className="pr-film-shadow" cx="132" cy="131" rx="88" ry="6" />
          <g className="pr-film-device">
            <rect className="pr-film-body" x="48" y="62" width="168" height="66" rx="9" />
            <rect className="pr-film-rim" x="50" y="64" width="164" height="62" rx="7" />
            <circle className="pr-film-camera" cx="53" cy="96" r="1.5" />
            <g clipPath={`url(#${id}-screen)`}>
              <rect className="pr-film-display" x="56" y="70" width="152" height="52" />
              <circle className="pr-film-sun" cx="176" cy="87" r="10" />
              <path className="pr-film-far-hill" d="M56 106Q93 76 129 100T208 99V122H56Z" />
              <path className="pr-film-near-hill" d="M56 116Q102 94 142 110T208 108V122H56Z" />
            </g>
          </g>
          <g className="pr-film-sheet" transform={`translate(0 ${-lift})`}>
            {peeled < 1 && <rect className="pr-film-adhered" x="56" y="70" width="152" height={foldY - 70} clipPath={`url(#${id}-screen)`} />}
            {peeled > 0 && <>
              <path className="pr-film-back" d={`M56 ${foldY}Q132 ${foldY + 2 * radius} 208 ${foldY}L208 ${freeY}Q132 ${freeY - 3 * peeled} 56 ${freeY}Z`} />
              <path className="pr-film-curl" fill={`url(#${id}-curl)`} d={`M56 ${foldY}Q132 ${foldY + 2 * radius} 208 ${foldY}L208 ${foldY - radius}Q132 ${foldY + radius} 56 ${foldY - radius}Z`} />
            </>}
          </g>
        </g>
      </svg>
      <input className="pr-film-progress" type="range" min="0" max="100" step="1" value={progress}
        aria-label={t('demo.additions.promo.film.progress')} aria-controls={`${id}-scene`}
        aria-valuetext={progress === 0 ? t('demo.additions.promo.film.attached') : progress === 100 ? t('demo.additions.promo.film.separated') : progress >= 90 ? t('demo.additions.promo.film.lifting') : t('demo.additions.promo.film.peeled', { percent: Math.round(peeled * 100) })}
        onChange={event => setProgress(Number(event.currentTarget.value))} />
    </div>
  );
}
