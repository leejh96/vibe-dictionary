import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

const LOOP_HEAD = 'M-6-3C-6-9 6-9 6-3';
const LOOP_FRONT = 'M-6-3C-7 2-3 8 0 12C3 8 7 2 6-3';
const STITCHES = Array.from({ length: 8 }, (_, row) =>
  Array.from({ length: 13 }, (_, column) => `translate(${14 + column * 20} ${14 + row * 16})`),
).flat();

export function StockinetteKnitDemo() {
  const { t } = useLocale();
  const id = useId();

  return (
    <div className="tactile-demo">
      <svg className="tt-knit-art" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.tactile.knitDescription')}>
        <defs>
          <clipPath id={`${id}-knit-face`}>
            <rect x="18" y="12" width="228" height="116" rx="8" />
          </clipPath>
        </defs>
        <g aria-hidden="true">
          <rect x="18" y="18" width="228" height="116" rx="8" fill="#8e6d3e" />
          <rect x="18" y="12" width="228" height="116" rx="8" fill="#b28f59" />
          <g clipPath={`url(#${id}-knit-face)`} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <g>
              {STITCHES.map(transform => (
                <g key={transform} transform={transform}>
                  <path d={LOOP_HEAD} stroke="#96703f" strokeWidth="6" opacity=".75" />
                  <path d={LOOP_HEAD} stroke="#c7a36e" strokeWidth="4.3" />
                </g>
              ))}
            </g>
            <g>
              {STITCHES.map(transform => (
                <g key={transform} transform={transform}>
                  <path d={LOOP_FRONT} stroke="#96703f" strokeWidth="6.6" />
                  <path d={LOOP_FRONT} stroke="#d8b986" strokeWidth="4.7" />
                  <path d={LOOP_FRONT} transform="translate(-.6 -.5)" stroke="#f6ddb2" strokeWidth="1" opacity=".7" />
                </g>
              ))}
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
