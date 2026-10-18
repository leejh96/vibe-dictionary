import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function DuotoneArtDemo() {
  const { t } = useLocale();
  const id = useId();
  return (
    <div className="modern-demo">
      <svg className="md-duotone-art" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.modern.duotone.image')}>
        <defs>
          <filter id={`${id}-duotone`} colorInterpolationFilters="sRGB">
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncR type="table" tableValues={`${49 / 255} ${254 / 255}`} />
              <feFuncG type="table" tableValues={`${46 / 255} ${240 / 255}`} />
              <feFuncB type="table" tableValues={`${129 / 255} ${138 / 255}`} />
            </feComponentTransfer>
          </filter>
          <radialGradient id={`${id}-sphere`} cx="32%" cy="25%" r="78%">
            <stop stopColor="#fff" />
            <stop offset=".6" stopColor="#9c9c9c" />
            <stop offset="1" stopColor="#242424" />
          </radialGradient>
          <linearGradient id={`${id}-dune`} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#dedede" />
            <stop offset="1" stopColor="#444" />
          </linearGradient>
        </defs>
        <g filter={`url(#${id}-duotone)`} aria-hidden="true">
          <path fill="#141414" d="M0 0h264v144H0z" />
          <circle cx="182" cy="49" r="38" fill={`url(#${id}-sphere)`} />
          <path d="M0 111C45 62 85 76 126 115C181 63 216 62 264 111V144H0Z" fill={`url(#${id}-dune)`} />
          <path d="M0 132C59 97 102 105 148 133C190 107 228 108 264 127V144H0Z" fill="#313131" />
        </g>
      </svg>
    </div>
  );
}
