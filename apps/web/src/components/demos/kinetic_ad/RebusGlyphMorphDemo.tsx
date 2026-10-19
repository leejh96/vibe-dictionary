import { useDemoToggle } from '../../../hooks/useDemoAutoplay';
import { type CSSProperties } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

const OVAL = 'M92 48C79.85 48 70 59.64 70 74C70 88.36 79.85 100 92 100C104.15 100 114 88.36 114 74C114 59.64 104.15 48 92 48Z';
const HEART = 'M92 61C78 43 62 58 71 75C76 85 86 94 92 100C98 94 108 85 113 75C122 58 106 43 92 61Z';

export function RebusGlyphMorphDemo() {
  const { t } = useLocale();
  const [heart, setHeart] = useDemoToggle(false);
  const contour = heart ? HEART : OVAL;

  return <div className="kinetic-ad-demo">
    <button type="button" className="ka-rebus-button" aria-label={t('demo.additions.kineticAd.rebusToggle')} aria-pressed={heart} onClick={() => setHeart(value => !value)}>
      <svg className="ka-rebus-scene" viewBox="0 0 264 148" aria-hidden="true" data-heart={heart}>
        <g transform="translate(9 0)" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
          <path className="ka-rebus-letters" d="M24 48V100H48M134 48L150 100L166 48M222 48H186V100H222M186 74H216" />
          <path className="ka-rebus-glyph" d={contour} style={{ d: `path("${contour}")` } as CSSProperties} />
        </g>
      </svg>
    </button>
  </div>;
}
