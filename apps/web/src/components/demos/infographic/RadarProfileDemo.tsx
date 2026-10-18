import { useLocale } from '../../../i18n/LocaleContext';
const RADIUS = 50;
const AXES = ([
  { label: 'demo.additions.infographic.radar.speed', value: 80, placement: 'top' },
  { label: 'demo.additions.infographic.radar.quality', value: 60, placement: 'right' },
  { label: 'demo.additions.infographic.radar.ease', value: 90, placement: 'bottom' },
  { label: 'demo.additions.infographic.radar.efficiency', value: 70, placement: 'bottom' },
  { label: 'demo.additions.infographic.radar.support', value: 50, placement: 'left' },
] as const).map((axis, index, axes) => {
  const angle = -Math.PI / 2 + index / axes.length * Math.PI * 2;
  const dx = Math.cos(angle) * RADIUS;
  const dy = Math.sin(angle) * RADIUS;
  return { ...axis, dx, dy, x: 68 + dx * axis.value / 100, y: 68 + dy * axis.value / 100 };
});

export function RadarProfileDemo() {
  const { t } = useLocale();
  return (
    <div className="infographic-demo">
      <div className="ig-radar-profile" role="img" aria-label={t('demo.additions.infographic.radar.chart', { speed: AXES[0].value, quality: AXES[1].value, ease: AXES[2].value, efficiency: AXES[3].value, support: AXES[4].value })}>
        <div aria-hidden="true">
          <svg viewBox="0 0 136 136" focusable="false">
            {[50, 100].map(level => <polygon className="ig-radar-profile-grid" key={level} points={AXES.map(axis => `${68 + axis.dx * level / 100},${68 + axis.dy * level / 100}`).join(' ')} />)}
            {AXES.map(axis => <line className="ig-radar-profile-grid" key={axis.label} x1={68} y1={68} x2={68 + axis.dx} y2={68 + axis.dy} />)}
            <polygon className="ig-radar-profile-shape" points={AXES.map(axis => `${axis.x},${axis.y}`).join(' ')} />
            {AXES.map(axis => <circle className="ig-radar-profile-mark" key={axis.label} cx={axis.x} cy={axis.y} r={3} />)}
          </svg>
          {[0, 50, 100].map(tick => <span className="ig-radar-profile-tick" key={tick} style={{ top: `${92 - RADIUS * tick / 100}px` }}>{tick}</span>)}
          {AXES.map(axis => <span className={`ig-radar-profile-label ig-radar-profile-${axis.placement}`} key={axis.label} style={{ left: `calc(50% + ${axis.dx}px)`, top: `${92 + axis.dy}px` }}><span>{t(axis.label)}</span><span className="ig-radar-profile-value">{axis.value}</span></span>)}
        </div>
      </div>
    </div>
  );
}
