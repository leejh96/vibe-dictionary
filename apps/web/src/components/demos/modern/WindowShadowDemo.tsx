import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function WindowShadowDemo() {
  const { t } = useLocale();
  const id = useId();
  return (
    <div className="modern-demo">
      <svg className="md-window-art" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.modern.window.image')}>
        <defs>
          <filter id={`${id}-shadow`} filterUnits="userSpaceOnUse" x={-40} y={-40} width={344} height={224} colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation={3.5} />
          </filter>
          <linearGradient id={`${id}-light`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop stopColor="var(--md-window-glow)" />
            <stop offset="1" stopColor="var(--md-window-glow)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <g aria-hidden="true">
          <rect className="md-window-paper" x={28} y={22} width={208} height={100} rx={3} fill="var(--md-window-paper)" />
          <g fill="var(--md-window-leaf)">
            <path d="M127 85C104 87 95 73 99 61C117 61 126 70 127 85ZM139 66C137 46 150 34 166 34C164 51 153 63 139 66ZM119 100C100 102 88 91 88 78C105 78 116 87 119 100ZM128 84C145 71 160 75 168 85C153 97 139 97 128 84Z" />
            <path d="M113 113C121 88 139 67 157 43" fill="none" stroke="var(--md-window-leaf)" strokeWidth={2} strokeLinecap="round" />
          </g>
          <rect className="md-window-light" width={264} height={144} fill={`url(#${id}-light)`} />
          <g className="md-window-shadow" filter={`url(#${id}-shadow)`} fill="var(--md-window-shadow)">
            <g transform="rotate(-24 132 72)">
              {[32, 108, 184].map(x => <rect key={x} x={x} y={-58} width={12} height={260} />)}
              <rect x={-40} y={50} width={344} height={9} />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
