import { useLocale } from '../../../i18n/LocaleContext';

const SHADES = ' .:-=+*#%@';
const LIGHT_Z = Math.sqrt(.59);

// Sample in SVG units so rectangular character cells still form a round silhouette.
const ASCII_ROWS = Array.from({ length: 16 }, (_, row) => Array.from({ length: 48 }, (_, column) => {
  const x = (12 + (column + .5) * 5 - 132) / 54;
  const y = (8 + (row + .5) * 8 - 72) / 54;
  const radiusSquared = x * x + y * y;
  if (radiusSquared > 1) return ' ';
  const z = Math.sqrt(1 - radiusSquared);
  const light = .18 + .82 * Math.max(0, -.5 * x - .4 * y + LIGHT_Z * z);
  return SHADES[Math.round(Math.min(1, light) * (SHADES.length - 1))];
}).join(''));

export function AsciiArtDemo() {
  const { t } = useLocale();
  return (
    <div className="modern-demo">
      <svg className="md-ascii-art" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.modern.ascii.image')}>
        <g aria-hidden="true">
          {ASCII_ROWS.map((row, index) => <text key={index} x={12} y={16 + index * 8} textLength={240} lengthAdjust="spacingAndGlyphs" xmlSpace="preserve">{row}</text>)}
        </g>
      </svg>
    </div>
  );
}
