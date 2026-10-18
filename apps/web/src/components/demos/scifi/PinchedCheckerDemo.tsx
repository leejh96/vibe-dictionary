import { useLocale } from '../../../i18n/LocaleContext';

const COLUMN_EDGES = [16, 42, 65, 85, 102, 114, 122, 128, 132, 136, 142, 150, 162, 179, 199, 222, 248];

export function PinchedCheckerDemo() {
  const { t } = useLocale();
  return <div className="scifi-demo">
    <svg className="sf-opart-checker" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.scifi.checkerImage')}>
      <g aria-hidden="true" shapeRendering="crispEdges">
        <rect className="sf-checker-paper" x={16} y={16} width={232} height={112} />
        <g className="sf-checker-ink">
          {Array.from({ length: 8 }, (_, row) => COLUMN_EDGES.slice(0, -1).map((x, column) => (row + column) % 2 === 0
            ? <rect key={`${row}-${column}`} x={x} y={16 + row * 14} width={COLUMN_EDGES[column + 1] - x} height={14} />
            : null))}
        </g>
      </g>
    </svg>
  </div>;
}
