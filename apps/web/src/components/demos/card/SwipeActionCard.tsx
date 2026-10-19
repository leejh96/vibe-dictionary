import { useDemoNumber } from '../../../hooks/useDemoAutoplay';
import { useId, useRef, useState } from 'react';
import { BookOpen, Bookmark, ChevronLeft } from 'lucide-react';
import type { PointerEvent } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

const REVEAL_WIDTH = 64;
const clampOffset = (value: number) => Math.max(-REVEAL_WIDTH, Math.min(0, value));

export function SwipeActionCardDemo() {
  const { t } = useLocale();
  const [offset, setOffset] = useDemoNumber(0, -64, 0);
  const [dragging, setDragging] = useState(false);
  const [saved, setSaved] = useState(false);
  const actionId = useId();
  const drag = useRef<{ pointerId: number; startX: number; startOffset: number } | null>(null);
  const suppressClick = useRef(false);
  const open = offset === -REVEAL_WIDTH;
  const cancelDrag = (event: PointerEvent<HTMLButtonElement>) => {
    if (!drag.current || drag.current.pointerId !== event.pointerId) return;
    setOffset(drag.current.startOffset);
    drag.current = null;
    suppressClick.current = true;
    setDragging(false);
  };
  const finishDrag = (event: PointerEvent<HTMLButtonElement>) => {
    const current = drag.current;
    if (!current || current.pointerId !== event.pointerId) return;
    const distance = event.clientX - current.startX;
    const next = clampOffset(current.startOffset + distance);
    suppressClick.current ||= Math.abs(distance) > 6;
    drag.current = null;
    setDragging(false);
    setOffset(next <= -REVEAL_WIDTH / 2 ? -REVEAL_WIDTH : 0);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  return <div className="card-demo">
    <div className="cd-swipe-card">
      <button type="button" className="cd-swipe-front" aria-label={t('demo.additions.card.toggleReadingActions')} aria-expanded={open} aria-controls={actionId} data-dragging={dragging} style={{ transform: `translateX(${offset}px)` }}
        onPointerDown={event => {
          if (event.button !== 0 || !event.isPrimary || drag.current) return;
          drag.current = { pointerId: event.pointerId, startX: event.clientX, startOffset: offset };
          suppressClick.current = false;
          setDragging(true);
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={event => {
          const current = drag.current;
          if (current?.pointerId !== event.pointerId) return;
          suppressClick.current ||= Math.abs(event.clientX - current.startX) > 6;
          setOffset(clampOffset(current.startOffset + event.clientX - current.startX));
        }}
        onPointerUp={finishDrag} onPointerCancel={cancelDrag} onLostPointerCapture={cancelDrag}
        onClick={event => {
          const suppress = suppressClick.current && event.detail !== 0;
          suppressClick.current = false;
          if (!suppress) setOffset(open ? 0 : -REVEAL_WIDTH);
        }}
        onKeyDown={event => {
          if (!['ArrowLeft', 'ArrowRight', 'Escape'].includes(event.key)) return;
          event.preventDefault();
          if (drag.current) {
            const { pointerId } = drag.current;
            drag.current = null;
            setDragging(false);
            suppressClick.current = true;
            if (event.currentTarget.hasPointerCapture(pointerId)) event.currentTarget.releasePointerCapture(pointerId);
          }
          setOffset(event.key === 'ArrowLeft' ? -REVEAL_WIDTH : 0);
        }}>
        <span className="cd-swipe-icon"><BookOpen size={23} aria-hidden="true" /></span><strong>{t('demo.additions.card.readingList')}</strong><ChevronLeft size={18} aria-hidden="true" />
      </button>
      <button type="button" className="cd-swipe-save" id={actionId} aria-label={t('demo.additions.card.saveReading')} aria-pressed={saved} aria-hidden={!open} disabled={!open} tabIndex={open ? 0 : -1} onClick={() => setSaved(value => !value)}><Bookmark size={20} fill={saved ? 'currentColor' : 'none'} aria-hidden="true" /></button>
    </div>
  </div>;
}
