import { useLocale } from '../../../i18n/LocaleContext';

type Point = [number, number];

function snowflakeOutline() {
  const radius = 57;
  let points: Point[] = [
    [132, 72 - radius],
    [132 + Math.sqrt(3) * radius / 2, 72 + radius / 2],
    [132 - Math.sqrt(3) * radius / 2, 72 + radius / 2],
  ];
  for (let iteration = 0; iteration < 3; iteration++) {
    points = points.flatMap((start, index, current): Point[] => {
      const end = current[(index + 1) % current.length];
      const dx = end[0] - start[0], dy = end[1] - start[1];
      return [
        start,
        [start[0] + dx / 3, start[1] + dy / 3],
        [(start[0] + end[0]) / 2 + dy * Math.sqrt(3) / 6, (start[1] + end[1]) / 2 - dx * Math.sqrt(3) / 6],
        [start[0] + 2 * dx / 3, start[1] + 2 * dy / 3],
      ];
    });
  }
  return points.map(point => point.join(',')).join(' ');
}

const OUTLINE = snowflakeOutline();

export function KochSnowflakeDemo() {
  const { t } = useLocale();
  return <div className="scifi-demo">
    <svg className="sf-koch-snowflake" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.scifi.kochImage')}>
      <g aria-hidden="true">
        <polygon className="sf-koch-outline" points={OUTLINE} />
      </g>
    </svg>
  </div>;
}
