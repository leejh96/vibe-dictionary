import { useDemoNumber } from '../../../hooks/useDemoAutoplay';
import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

const LIGHT = { x: 132, y: 12 };
const BLOCKER_Y = 60;
const BLOCKER_HEIGHT = 8;
const BOTTOM = 144;

function projectToBottom(edgeX: number, edgeY: number) {
  return LIGHT.x + (edgeX - LIGHT.x) * (BOTTOM - LIGHT.y) / (edgeY - LIGHT.y);
}

export function ProjectedShadowDemo() {
  const { t } = useLocale();
  const [blockerX, setBlockerX] = useDemoNumber(132, 90, 174, 1);
  const id = useId();
  const left = blockerX - 22;
  const right = blockerX + 22;
  const leftY = left > LIGHT.x ? BLOCKER_Y + BLOCKER_HEIGHT : BLOCKER_Y;
  const rightY = right < LIGHT.x ? BLOCKER_Y + BLOCKER_HEIGHT : BLOCKER_Y;
  return <div className="shader-demo sd-shadow-demo">
    <div className="sd-scene sd-shadow-scene">
      <svg id={`${id}-scene`} className="sd-shadow-svg" viewBox="0 0 264 144" preserveAspectRatio="none" role="img" aria-label={t('demo.additions.shader.shadowScene')}>
        <defs>
          <radialGradient id={`${id}-light`} gradientUnits="userSpaceOnUse" cx={LIGHT.x} cy={LIGHT.y} r={190}>
            <stop offset="0" stopColor="currentColor" stopOpacity={.8} /><stop offset=".35" stopColor="currentColor" stopOpacity={.35} /><stop offset="1" stopColor="currentColor" stopOpacity={0} />
          </radialGradient>
          <mask id={`${id}-shadow`} className="sd-shadow-mask" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" x={0} y={0} width={264} height={BOTTOM}>
            <rect width={264} height={BOTTOM} fill="#fff" />
            <polygon points={`${left},${leftY} ${right},${rightY} ${projectToBottom(right, rightY)},${BOTTOM} ${projectToBottom(left, leftY)},${BOTTOM}`} fill="#000" />
          </mask>
        </defs>
        <rect width={264} height={BOTTOM} fill={`url(#${id}-light)`} mask={`url(#${id}-shadow)`} />
        <circle cx={LIGHT.x} cy={LIGHT.y} r={9} fill="currentColor" opacity={.2} /><circle cx={LIGHT.x} cy={LIGHT.y} r={4} fill="currentColor" />
        <rect x={left} y={BLOCKER_Y} width={44} height={BLOCKER_HEIGHT} fill="currentColor" />
      </svg>
    </div>
    <label className="sd-range-control">{t('demo.additions.shader.position')}<input className="sd-range" type="range" aria-label={t('demo.additions.shader.shadowPosition')} aria-controls={`${id}-scene`} min={90} max={174} step={1} value={blockerX} onChange={event => setBlockerX(Number(event.currentTarget.value))} /></label>
  </div>;
}
