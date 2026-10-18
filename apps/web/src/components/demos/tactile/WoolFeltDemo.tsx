import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

const FIBRES = Array.from({ length: 520 }, (_, index) => ({
  transform: `translate(${18 + (index * 67) % 229} ${14 + (index * index * 17 + index * 29) % 113}) rotate(${(index * 137.508) % 180}) scale(${.65 + (index % 7) * .09})`,
  color: ['#d2cec2', '#404a40', '#a7aa9c'][index % 3],
  opacity: [.42, .36, .58][index % 3],
}));

export function WoolFeltDemo() {
  const { t } = useLocale();
  const id = useId();

  return (
    <div className="tactile-demo">
      <svg className="tt-felt-art" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.tactile.feltDescription')}>
        <defs>
          <radialGradient id={`${id}-felt-body`} cx=".38" cy=".3" r=".85">
            <stop stopColor="#94958a" />
            <stop offset="1" stopColor="#7c8276" />
          </radialGradient>
          <clipPath id={`${id}-felt-face`}>
            <ellipse cx="132" cy="70" rx="107" ry="51" />
          </clipPath>
        </defs>
        <g aria-hidden="true">
          <ellipse cx="134" cy="127" rx="94" ry="7" fill="#35402c20" />
          <ellipse cx="132" cy="79" rx="107" ry="51" fill="#61695c" />
          <ellipse cx="132" cy="70" rx="107" ry="51" fill={`url(#${id}-felt-body)`} stroke="#707767" strokeWidth=".6" />
          <g clipPath={`url(#${id}-felt-face)`} fill="none" strokeWidth=".75" strokeLinecap="round">
            {FIBRES.map(({ transform, color, opacity }, index) => (
              <path key={index} d="M-3 0Q-1-1.7 1 0T4 .3" transform={transform} stroke={color} opacity={opacity} />
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}
