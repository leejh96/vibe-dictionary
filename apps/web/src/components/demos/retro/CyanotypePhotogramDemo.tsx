import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function CyanotypePhotogramDemo() {
  const { t } = useLocale();
  const id = useId();
  const keyId = `cyanotype-key-${id}`;
  const softEdgeId = `cyanotype-edge-${id}`;

  return <div className="retro-demo">
    <svg className="rt-cyanotype-art" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.retro.cyanotypeArtwork')}>
      <defs>
        <filter id={softEdgeId} x="-15%" y="-20%" width="130%" height="140%" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="1.3" />
        </filter>
        <g id={keyId} fill="#f1f3e5" transform="rotate(-27 132 72)">
          <path d="M100 72A24 24 0 1 1 52 72A24 24 0 1 1 100 72Z M87 72A11 11 0 1 1 65 72A11 11 0 1 1 87 72Z" fillRule="evenodd" />
          <path d="M97 65H193V78H184V92H172V82H160V78H97Z" />
        </g>
      </defs>
      <g aria-hidden="true">
        <path d="M16 15L54 13L88 16L125 12L165 15L207 13L247 17L250 43L247 73L251 102L247 129L208 131L167 128L128 132L87 129L49 132L15 128L12 99L15 71L12 43Z" fill="#164e87" />
        <circle cx="176" cy="57" r="32" fill="#c2dce8" fillOpacity=".28" stroke="#e6efeb" strokeOpacity=".7" strokeWidth="3" />
        <circle cx="176" cy="57" r="28" fill="none" stroke="#9cc2db" strokeOpacity=".65" strokeWidth="1" />
        <use href={`#${keyId}`} filter={`url(#${softEdgeId})`} opacity=".55" />
        <use href={`#${keyId}`} />
      </g>
    </svg>
  </div>;
}
