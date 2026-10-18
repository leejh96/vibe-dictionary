import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

const WOOD_GRAIN = [18, 28, 35, 46, 53, 63, 78, 87, 94, 105, 113, 124].map(y => {
  const bend = Math.sign(y - 70) * Math.max(0, 24 - Math.abs(y - 70) * .4);
  return `M18 ${y}C65 ${y + 3} 89 ${y - 2} 116 ${y + bend * .4}C139 ${y + bend} 181 ${y + bend} 205 ${y + bend * .35}S232 ${y + 1} 246 ${y}`;
});

export function KnotWoodDemo() {
  const { t } = useLocale();
  const id = useId();

  return (
    <div className="tactile-demo">
      <svg className="tt-wood-art" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.tactile.woodDescription')}>
        <defs>
          <linearGradient id={`${id}-wood-tone`} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#d8b477" />
            <stop offset=".45" stopColor="#ca9859" />
            <stop offset="1" stopColor="#b68143" />
          </linearGradient>
          <clipPath id={`${id}-wood-clip`}>
            <rect x="18" y="12" width="228" height="116" rx="8" />
          </clipPath>
        </defs>
        <g aria-hidden="true">
          <rect x="18" y="18" width="228" height="116" rx="8" fill="#80532e" />
          <rect x="18" y="12" width="228" height="116" rx="8" fill={`url(#${id}-wood-tone)`} />
          <g clipPath={`url(#${id}-wood-clip)`}>
            <g fill="none" stroke="#78491b" strokeWidth=".85" opacity=".55">
              {WOOD_GRAIN.map(path => <path key={path} d={path} />)}
              <ellipse cx="164" cy="70" rx="56" ry="20" />
              <ellipse cx="164" cy="70" rx="40" ry="14" />
              <ellipse cx="164" cy="70" rx="25" ry="8" />
            </g>
            <path d="M148 70C154 63 174 63 180 70C173 76 155 77 148 70Z" fill="#71461f" />
            <path d="M153 70Q164 66 175 70" fill="none" stroke="#b98b50" strokeWidth=".7" />
          </g>
          <rect x="18" y="12" width="228" height="116" rx="8" fill="none" stroke="#986832" strokeWidth="1" />
          <path d="M26 13H238" fill="none" stroke="#fff1cf" strokeWidth=".6" opacity=".65" />
        </g>
      </svg>
    </div>
  );
}
