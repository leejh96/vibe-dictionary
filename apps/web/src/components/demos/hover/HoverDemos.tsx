import { useId, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Play } from 'lucide-react';
import { useOutsidePointerDismiss } from '../../../hooks/useOutsidePointerDismiss';
import { useLocale } from '../../../i18n/LocaleContext';

function ActionPreview({ effect, label, children }: { effect: string; label: string; children: ReactNode }) {
  return <div className="hover-demo">
    <button type="button" aria-label={label} className={`hd-button ${effect}`}>{children}</button>
  </div>;
}

export function IconExpandDemo() {
  const { t } = useLocale();
  return <ActionPreview effect="hd-expand" label={t('demo.additions.hover.openProject')}><span aria-hidden="true"><ArrowUpRight size={20} /></span><span className="hd-expand-label">{t('demo.additions.hover.openProject')}</span></ActionPreview>;
}

export function OutlineTraceDemo() {
  const { t } = useLocale();
  return <ActionPreview effect="hd-trace" label={t('demo.additions.hover.viewCollection')}>
    <svg aria-hidden="true" viewBox="0 0 180 48" preserveAspectRatio="none"><rect x="1" y="1" width="178" height="46" rx="10" pathLength="1" /></svg>
    <span className="hd-inline-label">{t('demo.additions.hover.viewCollection')} <ArrowUpRight size={16} aria-hidden="true" /></span>
  </ActionPreview>;
}

export function RollingLabelDemo() {
  const { t } = useLocale();
  return <ActionPreview effect="hd-roll" label={t('demo.additions.hover.rollingName')}>
    <span className="hd-roll-window" aria-hidden="true"><span className="hd-roll-track"><span>{t('demo.additions.hover.nextStory')}</span><span>{t('demo.additions.hover.keepExploring')}</span></span></span>
    <ArrowUpRight size={18} aria-hidden="true" />
  </ActionPreview>;
}

export function DepthPressDemo() {
  const { t } = useLocale();
  return <ActionPreview effect="hd-depth hd-inline-label" label={t('demo.additions.hover.runPreview')}><Play size={16} aria-hidden="true" />{t('demo.additions.hover.runPreview')}</ActionPreview>;
}

export function UnderlineTravelDemo() {
  const { t } = useLocale();
  return <ActionPreview effect="hd-underline hd-inline-label" label={t('demo.additions.hover.exploreWork')}><span className="hd-underline-label">{t('demo.additions.hover.exploreWork')}</span><ArrowRight size={18} aria-hidden="true" /></ActionPreview>;
}

export function CornerBracketDemo() {
  const { t } = useLocale();
  return <ActionPreview effect="hd-brackets" label={t('demo.additions.hover.alignFrame')}>
    <svg aria-hidden="true" viewBox="0 0 180 52" preserveAspectRatio="none"><path d="M18 1H1V18 M162 1H179V18 M179 34V51H162 M18 51H1V34" /></svg>
    <span>{t('demo.additions.hover.alignFrame')}</span>
  </ActionPreview>;
}

export function MenuIconMorphDemo() {
  const { t } = useLocale();
  const [expanded, setExpanded] = useState(false);
  return <div className="hover-demo">
    <button type="button" className="hd-button hd-icon-morph" aria-label={t('demo.additions.hover.toggleMenuIcon')} aria-pressed={expanded} onClick={() => setExpanded(value => !value)}>
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path className="hd-menu-upper" d="M4 8H20" /><path className="hd-menu-lower" d="M4 16H20" /></svg>
    </button>
  </div>;
}

export function BorderBeamDemo() {
  const { t } = useLocale();
  return <ActionPreview effect="hd-beam" label={t('demo.additions.hover.getStarted')}><span className="hd-beam-content hd-inline-label">{t('demo.additions.hover.getStarted')}<ArrowRight size={16} aria-hidden="true" /></span></ActionPreview>;
}

export function LetterStaggerDemo() {
  const { t } = useLocale();
  const label = t('demo.additions.hover.newStart');
  return <ActionPreview effect="hd-letter-step" label={label}><span className="hd-letter-row" aria-hidden="true">{Array.from(label).map((letter, index) => <span key={index} style={{ transitionDelay: `${index * 25}ms` }}>{letter === ' ' ? '\u00a0' : letter}</span>)}</span></ActionPreview>;
}

export function SplitActionDemo() {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const [format, setFormat] = useState('PNG');
  const root = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const listId = useId();
  useOutsidePointerDismiss(open, root, () => setOpen(false));
  return <div className="hover-demo hd-split-demo" ref={root} onKeyDown={(event) => {
    if (open && event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
  }}>
    <div className="split-action">
      <button type="button" className="hd-button hd-primary">{t('demo.additions.hover.exportFormat', { format })}</button>
      <button type="button" className="hd-button hd-primary split-toggle" ref={toggle} aria-label={t('demo.additions.hover.chooseExportFormat')} aria-expanded={open} aria-controls={listId} onClick={() => setOpen(!open)}>
        <ChevronDown className="split-chevron" aria-hidden="true" focusable="false" />
      </button>
      {open && <div className="split-options" id={listId} aria-label={t('demo.additions.hover.exportFormats')}>
        {(['PNG', 'SVG'] as const).map(value => <button type="button" key={value} className="hd-button hd-inline-label" onClick={() => { setFormat(value); setOpen(false); toggle.current?.focus(); }}>{t(value === 'PNG' ? 'demo.additions.hover.formatPng' : 'demo.additions.hover.formatSvg')}{value === format && <Check size={14} aria-hidden="true" />}</button>)}
      </div>}
    </div>
  </div>;
}
