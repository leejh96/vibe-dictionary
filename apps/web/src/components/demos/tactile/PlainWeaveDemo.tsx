import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function PlainWeaveDemo() {
  const { t } = useLocale();
  const id = useId();

  return (
    <div className="tactile-demo">
      <svg className="tt-weave-art" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.tactile.weaveDescription')}>
        <defs>
          <linearGradient id={`${id}-warp`} x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#365b48" />
            <stop offset=".4" stopColor="#83a88b" />
            <stop offset="1" stopColor="#456e53" />
          </linearGradient>
          <linearGradient id={`${id}-weft`} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#365b48" />
            <stop offset=".4" stopColor="#83a88b" />
            <stop offset="1" stopColor="#456e53" />
          </linearGradient>
          <pattern id={`${id}-weave`} patternUnits="userSpaceOnUse" width="12" height="12">
            <rect width="12" height="12" fill="#2d4939" />
            <g fill={`url(#${id}-warp)`}>
              <rect x=".5" y="0" width="5" height="12" />
              <rect x="6.5" y="0" width="5" height="12" />
            </g>
            <g fill={`url(#${id}-weft)`}>
              <rect x="0" y=".5" width="12" height="5" />
              <rect x="0" y="6.5" width="12" height="5" />
            </g>
            <g fill={`url(#${id}-warp)`}>
              <rect x="6.5" y="0" width="5" height="6" />
              <rect x=".5" y="6" width="5" height="6" />
            </g>
          </pattern>
        </defs>
        <g aria-hidden="true">
          <rect x="18" y="15" width="228" height="120" rx="9" fill="#152c2250" />
          <rect x="18" y="12" width="228" height="120" rx="9" fill={`url(#${id}-weave)`} stroke="#244231" strokeWidth=".8" />
          <rect x="25" y="19" width="214" height="106" rx="5" fill="none" stroke="#244231" strokeWidth="1.8" />
          <rect x="25" y="19" width="214" height="106" rx="5" fill="none" stroke="#d8d8ae" strokeWidth="1" strokeDasharray="3 3" />
        </g>
      </svg>
    </div>
  );
}
