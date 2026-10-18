import { useId, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

const CORNERS = [
  { label: 'demo.additions.broadcast.pipTopLeft', left: 6, top: 6 },
  { label: 'demo.additions.broadcast.pipTopRight', left: 60, top: 6 },
  { label: 'demo.additions.broadcast.pipBottomLeft', left: 6, top: 60 },
  { label: 'demo.additions.broadcast.pipBottomRight', left: 60, top: 60 },
] as const;

export function CornerPictureInPictureDemo() {
  const { t } = useLocale();
  const sceneId = useId();
  const [selected, setSelected] = useState(3);
  const corner = CORNERS[selected];

  return <div className="broadcast-demo bc-pip-demo">
    <div className="bc-pip-scene" id={sceneId} role="img" aria-label={t('demo.additions.broadcast.pipScene', { position: t(corner.label) })}>
      <svg className="bc-pip-main" viewBox="0 0 264 144" aria-hidden="true">
        <path className="bc-pip-sky" d="M0 0h264v144H0z" />
        <circle className="bc-pip-sun" cx={193} cy={31} r={17} />
        <path className="bc-pip-far" d="M0 118 70 42l61 62 52-37 81 52v25H0z" />
        <path className="bc-pip-snow" d="m48 66 22-24 24 25-16-5-7 10-8-11z" />
        <path className="bc-pip-near" d="m0 131 48-26 43 16 46-36 48 34 38-12 41 21v16H0z" />
      </svg>
      <svg className="bc-pip-inset" style={{ left: `${corner.left}%`, top: `${corner.top}%` }} viewBox="0 0 100 55" aria-hidden="true">
        <path className="bc-pip-wall" d="M0 0h100v55H0z" />
        <path className="bc-pip-shirt" d="M28 55V41c0-12 9-17 22-17s22 5 22 17v14z" />
        <path fill="#c89178" d="M46 21h8v10h-8z" />
        <ellipse fill="#dfb39a" cx={50} cy={16} rx={9} ry={12} />
        <path fill="#332b34" d="M41 17C37 6 43 0 50 0c10 0 14 8 9 18l-3-10-10 3z" />
      </svg>
    </div>
    <div className="bc-pip-controls" role="group" aria-label={t('demo.additions.broadcast.pipGroup')}>
      {CORNERS.map((position, index) => <button type="button" key={position.label} aria-label={t('demo.additions.broadcast.pipPlace', { position: t(position.label) })} aria-pressed={selected === index} aria-controls={sceneId} onClick={() => setSelected(index)}>
        <svg width={26} height={20} viewBox="0 0 26 20" aria-hidden="true"><rect x={1} y={1} width={24} height={18} rx={2} fill="none" stroke="currentColor" /><rect x={position.left === 6 ? 4 : 14} y={position.top === 6 ? 4 : 10} width={8} height={6} rx={1} fill="currentColor" /></svg>
      </button>)}
    </div>
  </div>;
}
