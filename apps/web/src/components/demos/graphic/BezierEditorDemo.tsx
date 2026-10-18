import { useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, Math.round(value)));

export function BezierEditorDemo() {
  const { t } = useLocale();
  const [point, setPoint] = useState({ x: 120, y: 24 });
  const frame = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: number; offsetX: number; offsetY: number } | null>(null);
  const move = (event: PointerEvent<HTMLDivElement>) => {
    const current = drag.current;
    const rect = frame.current?.getBoundingClientRect();
    if (!current || current.id !== event.pointerId || !rect?.width || !rect.height) return;
    setPoint({
      x: clamp((event.clientX - rect.left) * 240 / rect.width - current.offsetX, 24, 216),
      y: clamp((event.clientY - rect.top) * 112 / rect.height - current.offsetY, 22, 90),
    });
  };
  const end = (event: PointerEvent<HTMLDivElement>) => {
    if (drag.current?.id !== event.pointerId) return;
    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  return <div className="graphic-demo gd-bezier-demo">
    <div ref={frame} className="gd-bezier-frame">
      <svg viewBox="0 0 240 112" role="img" aria-label={t('demo.additions.graphic.bezierImage')}>
        <path className="gd-bezier-guide" d={`M24 88 ${point.x} ${point.y} 216 24`} />
        <path className="gd-bezier-curve" d={`M24 88 Q${point.x} ${point.y} 216 24`} />
        <g className="gd-bezier-ends"><circle cx={24} cy={88} r={3} /><circle cx={216} cy={24} r={3} /></g>
      </svg>
      <div className="gd-bezier-handle" aria-hidden="true" style={{ left: `${point.x / 240 * 100}%`, top: `${point.y / 112 * 100}%` }}
        onPointerDown={event => {
          const rect = frame.current?.getBoundingClientRect();
          if (event.button !== 0 || !event.isPrimary || drag.current || !rect?.width || !rect.height) return;
          event.preventDefault();
          drag.current = { id: event.pointerId, offsetX: (event.clientX - rect.left) * 240 / rect.width - point.x, offsetY: (event.clientY - rect.top) * 112 / rect.height - point.y };
          event.currentTarget.setPointerCapture(event.pointerId);
        }} onPointerMove={move} onPointerUp={event => { move(event); end(event); }} onPointerCancel={end} onLostPointerCapture={end} />
    </div>
    <div className="gd-range-controls">
      <label>{t('demo.additions.graphic.horizontal')}<input className="gd-range" type="range" aria-label={t('demo.additions.graphic.controlHorizontal')} min={24} max={216} step={1} value={point.x} onChange={event => { const x = Number(event.currentTarget.value); setPoint(value => ({ ...value, x })); }} /></label>
      <label>{t('demo.additions.graphic.vertical')}<input className="gd-range" type="range" aria-label={t('demo.additions.graphic.controlVertical')} min={22} max={90} step={1} value={point.y} onChange={event => { const y = Number(event.currentTarget.value); setPoint(value => ({ ...value, y })); }} /></label>
    </div>
  </div>;
}
