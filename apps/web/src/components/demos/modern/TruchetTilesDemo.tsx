import { useLocale } from '../../../i18n/LocaleContext';

const TILE_ARCS = 'M0 28A28 28 0 0 0 28 0M28 56A28 28 0 0 1 56 28';
const ORIENTATIONS = [0, 1, 0, 0, 1, 0, 1, 1];

export function TruchetTilesDemo() {
  const { t } = useLocale();
  return (
    <div className="modern-demo">
      <svg className="md-truchet-art" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.modern.truchet.image')}>
        <g aria-hidden="true" transform="translate(20 16)" fill="none" stroke="currentColor" strokeWidth={14} strokeLinecap="butt">
          {ORIENTATIONS.map((quarterTurns, index) => (
            <g key={index} transform={`translate(${index % 4 * 56} ${Math.floor(index / 4) * 56}) rotate(${quarterTurns * 90} 28 28)`}>
              <path d={TILE_ARCS} />
              <path d={TILE_ARCS} stroke="var(--md-truchet-accent)" strokeWidth={6} />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
