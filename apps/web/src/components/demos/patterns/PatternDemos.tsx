import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Bold, Check, ChevronLeft, MessageCircle, Pencil, X, ZoomIn, ZoomOut } from 'lucide-react';
import { useDemoNumber } from '../../../hooks/useDemoAutoplay';
import { useLocale } from '../../../i18n/LocaleContext';

function Landscape({ index }: { index: number }) {
  return <svg viewBox="0 0 240 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="240" height="120" fill={['#bae6fd', '#ffedd5', '#ddd6fe'][index]} />
    <circle cx="174" cy="30" r="18" fill={['#fef08a', '#fb923c', '#f5f3ff'][index]} />
    <path d="M0 102 72 26 148 102 194 48 240 94V120H0Z" fill={['#0d9488', '#c2410c', '#7c3aed'][index]} />
    <path d="M0 100Q80 66 144 108T240 94V120H0Z" fill={['#164e63', '#78350f', '#312e81'][index]} />
    <path d="M12 110Q78 88 132 114" fill="none" stroke="#fff" strokeOpacity=".45" strokeWidth="3" />
  </svg>;
}

const INITIAL_IMAGE = { open: false, index: 0, zoom: false, x: 0, y: 0 };
export function LightboxGalleryDemo() {
  const { t } = useLocale();
  const [dragging, setDragging] = useState(false);
  const [view, setView] = useState(INITIAL_IMAGE);
  const drag = useRef<{ id: number; x: number; y: number; panX: number; panY: number } | null>(null);
  const gallery = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef(false);
  useLayoutEffect(() => {
    if (!view.open && restoreFocus.current) {
      restoreFocus.current = false;
      gallery.current?.querySelector<HTMLButtonElement>('[data-gallery-thumb]')?.focus({ preventScroll: true });
    }
  }, [view.open]);
  const close = () => { if (view.open) { restoreFocus.current = true; setView(INITIAL_IMAGE); } };
  const names = ['demo.patterns.coast', 'demo.patterns.dunes', 'demo.patterns.peaks'] as const;
  const move = (delta: number) => setView(current => ({ ...current, index: (current.index + delta + 3) % 3, zoom: false, x: 0, y: 0 }));
  return <div className="pattern-demo">
    <div className="pd-gallery" ref={gallery} onKeyDown={event => {
      if (event.key === 'Escape') close();
      if (view.open && ['ArrowLeft', 'ArrowRight'].includes(event.key)) { event.preventDefault(); move(event.key === 'ArrowLeft' ? -1 : 1); }
    }}>
      <div className="pd-thumbnails" hidden={view.open}>
        {names.map((key, index) => <button data-gallery-thumb type="button" key={key} aria-label={t('demo.patterns.openImage', { image: t(key) })} onClick={() => setView({ ...INITIAL_IMAGE, open: true, index })}><Landscape index={index} /><span>{t(key)}</span></button>)}
      </div>
      {view.open && <div className="pd-lightbox" role="group" aria-label={t('demo.patterns.viewer')}>
        <div className={`pd-lightbox-art ${view.zoom ? 'is-zoomed' : ''} ${dragging ? 'is-dragging' : ''}`} data-demo-control data-demo-input
          onPointerDown={event => {
            if (!event.isPrimary || event.button !== 0) return;
            setView(view); setDragging(true);
            drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, panX: view.x, panY: view.y };
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={event => {
            const start = drag.current;
            if (!start || start.id !== event.pointerId || !view.zoom) return;
            setView(current => ({ ...current, x: Math.max(-35, Math.min(35, start.panX + event.clientX - start.x)), y: Math.max(-20, Math.min(20, start.panY + event.clientY - start.y)) }));
          }}
          onPointerUp={event => {
            const start = drag.current; drag.current = null;
            if (!start || start.id !== event.pointerId) return;
            setView(current => current); setDragging(false);
            if (!view.zoom && Math.abs(event.clientX - start.x) > 35) move(event.clientX < start.x ? 1 : -1);
            event.currentTarget.releasePointerCapture(event.pointerId);
          }} onPointerCancel={() => { drag.current = null; setDragging(false); }} onLostPointerCapture={() => { drag.current = null; setDragging(false); }}>
          <div style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.zoom ? 1.65 : 1})` }}><Landscape index={view.index} /></div>
        </div>
        <span className="pd-image-name">{t(names[view.index])}</span>
        <div className="pd-gallery-tools">
          <button type="button" aria-label={t('demo.patterns.previousImage')} onClick={() => move(-1)}><ArrowLeft size={15} /></button>
          <button type="button" aria-label={t('demo.patterns.zoom')} aria-pressed={view.zoom} onClick={() => setView(current => ({ ...current, zoom: !current.zoom, x: 0, y: 0 }))}>{view.zoom ? <ZoomOut size={15} /> : <ZoomIn size={15} />}</button>
          <button type="button" aria-label={t('demo.patterns.nextImage')} onClick={() => move(1)}><ArrowRight size={15} /></button>
          <button type="button" aria-label={t('demo.patterns.closeImage')} onClick={close}><X size={15} /></button>
        </div>
      </div>}
    </div>
  </div>;
}

export function SelectionToolbarDemo() {
  const { t } = useLocale();
  const root = useRef<HTMLDivElement>(null);
  const paragraph = useRef<HTMLParagraphElement>(null);
  const selection = useRef<{ start: number; end: number } | null>(null);
  const [boldRange, setBoldRange] = useState<{ start: number; end: number } | null>(null);
  const [selecting, setSelecting] = useState(false);
  const [view, setView] = useState({ selected: false, bold: false, x: 50, y: 0 });
  const text = t('demo.patterns.selectionText');
  useEffect(() => {
    if (!selecting) return;
    const owner = document;
    const clearOutsideSelection = () => {
      const selected = window.getSelection();
      if (selected && !selected.isCollapsed && paragraph.current?.contains(selected.anchorNode) && paragraph.current.contains(selected.focusNode)) return;
      selection.current = null; setSelecting(false);
      setView(current => ({ ...current, selected: false }));
    };
    owner.addEventListener('selectionchange', clearOutsideSelection);
    return () => owner.removeEventListener('selectionchange', clearOutsideSelection);
  }, [selecting, setView]);
  const readSelection = () => {
    const selected = window.getSelection();
    if (!selected || selected.isCollapsed || !root.current || !paragraph.current?.contains(selected.anchorNode) || !paragraph.current.contains(selected.focusNode)) {
      selection.current = null; setSelecting(false); setView(current => ({ ...current, selected: false })); return;
    }
    const range = selected.getRangeAt(0).cloneRange();
    const rect = range.getBoundingClientRect(), bounds = root.current.getBoundingClientRect();
    const before = range.cloneRange(); before.selectNodeContents(paragraph.current); before.setEnd(range.startContainer, range.startOffset);
    selection.current = { start: before.toString().length, end: before.toString().length + range.toString().length };
    setSelecting(true);
    setView(current => ({ ...current, selected: true, x: Math.max(25, Math.min(75, (rect.left + rect.width / 2 - bounds.left) / bounds.width * 100)), y: Math.max(0, rect.top - bounds.top - 44) }));
  };
  return <div className="pattern-demo"><div className="pd-selection" ref={root} onPointerUp={readSelection} onKeyUp={readSelection}>
    <div className="pd-bubble" role="toolbar" aria-label={t('demo.patterns.selectionActions')} style={{ left: `${view.x}%`, top: view.y }} hidden={!view.selected} onPointerUp={event => event.stopPropagation()} onKeyUp={event => event.stopPropagation()}>
      <button type="button" aria-label={t('demo.patterns.bold')} aria-pressed={view.bold} onPointerDown={event => event.preventDefault()} onClick={() => {
        const range = selection.current;
        if (range) {
          setBoldRange(range);
          window.getSelection()?.removeAllRanges(); selection.current = null; setSelecting(false);
          setView(current => ({ ...current, bold: true, selected: false }));
        }
      }}><Bold size={16} /></button>
    </div>
    <p ref={paragraph} className="pd-selection-copy" data-demo-control data-demo-input>{boldRange ? <>{text.slice(0, boldRange.start)}<strong>{text.slice(boldRange.start, boldRange.end)}</strong>{text.slice(boldRange.end)}</> : text}</p>
    <span className="pd-document-lines" aria-hidden="true" />
  </div></div>;
}

export function CollapsingHeaderDemo() {
  const { t } = useLocale();
  const [progress, setProgress] = useDemoNumber(0, 0, 1);
  return <div className="pattern-demo"><button type="button" className="pd-header-frame" aria-label={t('demo.patterns.replayHeader')} data-demo-restart onClick={() => setProgress(0)}>
    <div className="pd-header-cover" style={{ transform: `translateY(${-progress * 48}px)`, opacity: 1 - progress * .8 }}><Landscape index={2} /></div>
    <div className="pd-header-content" style={{ transform: `translateY(${-progress * 28}px)` }} aria-hidden="true"><i /><i /><i /></div>
    <div className="pd-collapsing-header" style={{ height: 82 - progress * 44, color: progress < .5 ? '#fff' : 'var(--pd-ink)', backgroundColor: `color-mix(in srgb, var(--pd-surface) ${progress * 100}%, transparent)` }}>
      <ChevronLeft size={18} aria-hidden="true" /><strong style={{ fontSize: 23 - progress * 10, transform: `translate(${26 - progress * 2}px, ${40 - progress * 35}px)` }}>{t('demo.patterns.collection')}</strong>
    </div>
  </button></div>;
}

export function HoverPreviewDemo() {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const pointerOpen = useRef(false);
  return <div className="pattern-demo"><div className="pd-hover-surface" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
    <p>{t('demo.patterns.authorLead')} <button type="button" className="pd-person-link" aria-expanded={open} onPointerDown={() => { pointerOpen.current = open; }} onFocus={() => setOpen(true)} onKeyDown={event => { if (event.key === 'Escape') setOpen(false); }} onClick={event => setOpen(event.detail === 0 ? !open : !pointerOpen.current)}>{t('demo.patterns.author')}</button></p>
    <div className="pd-profile-preview" hidden={!open}>
      <div className="pd-profile-banner" /><span className="pd-avatar" aria-hidden="true" />
      <div><strong>{t('demo.patterns.author')}</strong><span>{t('demo.patterns.authorRole')}</span></div>
      <span className="pd-profile-stat"><MessageCircle size={13} aria-hidden="true" />{t('demo.patterns.authorBio')}</span>
    </div>
  </div></div>;
}

export function InlineEditDemo() {
  const { t } = useLocale();
  const [saved, setSaved] = useState<string | null>(null);
  const [view, setView] = useState({ editing: false, draft: '', done: false });
  const original = saved ?? t('demo.patterns.originalTitle');
  const commit = () => { if (view.draft.trim()) { setSaved(view.draft.trim()); setView(current => ({ ...current, editing: false, done: true })); } };
  return <div className="pattern-demo"><div className="pd-edit-card">
    <span className="pd-edit-label">{t('demo.patterns.projectName')}</span>
    {view.editing ? <form className="pd-edit-form" onSubmit={event => { event.preventDefault(); commit(); }}>
      <input aria-label={t('demo.patterns.projectName')} value={view.draft} onChange={event => setView(current => ({ ...current, draft: event.target.value }))} onKeyDown={event => { if (event.key === 'Escape') setView(current => ({ ...current, editing: false, done: false })); }} />
      <button type="submit" aria-label={t('demo.patterns.save')} disabled={!view.draft.trim()}><Check size={16} /></button>
      <button type="button" aria-label={t('demo.patterns.cancel')} onClick={() => setView(current => ({ ...current, editing: false, done: false }))}><X size={16} /></button>
    </form> : <button type="button" className="pd-edit-value" aria-label={t('demo.patterns.edit')} onClick={() => setView({ editing: true, draft: original, done: false })}><strong>{original}</strong>{view.done ? <Check size={15} className="pd-saved" /> : <Pencil size={15} />}</button>}
    <span className="pd-edit-rule" aria-hidden="true" />
  </div></div>;
}
