import { useId, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function FreezeFrameHoldDemo() {
  const { t } = useLocale();
  const id = useId();
  const [position, setPosition] = useState(50);
  const sourcePhase = position < 40 ? position * 1.25 : position <= 60 ? 50 : (position - 20) * 1.25;
  const distance = sourcePhase * 1.64;
  const wheelAngle = distance / 17.5 * 180 / Math.PI;
  const held = position >= 40 && position <= 60;

  return <div className="broadcast-demo bc-hold-demo">
    <svg id={id} className="bc-hold-scene" viewBox="0 0 264 144" role="img" aria-label={t(held ? 'demo.additions.broadcast.holdScene' : 'demo.additions.broadcast.holdMovingScene')}>
      <g aria-hidden="true">
        <g className="bc-hold-backdrop">
          <path className="bc-hold-sky" d="M0 0h264v144H0z" />
          <circle fill="#ffdc9d" cx={212} cy={32} r={15} />
          <path className="bc-hold-cloud" d="M21 29h38m-17 10h35m75-18h24" />
          <path className="bc-hold-hills" d="M0 102Q38 57 83 86t82-4 99 11v51H0z" />
          <path className="bc-hold-road" d="M0 124.5h264V144H0z" />
          <path className="bc-hold-lane" d="M4 135h30m14 0h30m14 0h30m14 0h30m14 0h30m14 0h30" />
        </g>
        <g className="bc-hold-car" transform={`translate(${distance} 0)`}>
          <path className="bc-hold-body" d="M12 105V86l10-5 12-20h27l18 20 9 5v19z" />
          <path className="bc-hold-window" d="m37 67-9 13h44L58 67z" />
          <path className="bc-hold-detail" d="M49 67v13m4 7v14m4-13h6" />
          <path fill="#ffedbf" d="M82 88h6v7h-6z" />
          <path fill="#e58780" d="M12 88h5v7h-5z" />
          {[28, 72].map(x => <g className="bc-hold-wheel" key={x} transform={`rotate(${wheelAngle} ${x} 107)`}>
            <circle className="bc-hold-tire" cx={x} cy={107} r={16} />
            <path className="bc-hold-spokes" d={`M${x - 12} 107h24M${x} 95v24`} />
            <circle className="bc-hold-hub" cx={x} cy={107} r={3} />
          </g>)}
        </g>
      </g>
    </svg>
    <label className="bc-hold-control">
      <span>{t('demo.additions.broadcast.holdLabel')}</span>
      <input type="range" min={0} max={100} step={1} value={position} aria-label={t('demo.additions.broadcast.holdInput')} aria-valuetext={t(held ? 'demo.additions.broadcast.holdValue' : 'demo.additions.broadcast.holdMovingValue', { position })} aria-controls={id} onChange={event => setPosition(Number(event.currentTarget.value))} />
    </label>
  </div>;
}
