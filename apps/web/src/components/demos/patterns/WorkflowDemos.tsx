import { useLayoutEffect, useRef, useState } from 'react';
import { Archive, Check, Layers, RotateCcw, Sparkles, Trash2, X } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

const documentKeys = ['demo.workflow.brief', 'demo.workflow.research', 'demo.workflow.assets'] as const;
const initialIds = [0, 1, 2];

export function BillingComparisonDemo() {
  const { t } = useLocale();
  const [annual, setAnnual] = useState(false);
  return <div className="wf-demo"><div className="wf-billing">
    <div className="wf-heading"><Sparkles size={15} aria-hidden="true" /><strong>{t('demo.workflow.studio')}</strong><span className="wf-badge">{t('demo.workflow.savePercent', { percent: 20 })}</span></div>
    <div className="wf-segment" role="group" aria-label={t('demo.workflow.billingCycle')}>
      <button type="button" aria-pressed={!annual} onClick={() => setAnnual(false)}>{t('demo.workflow.monthly')}</button>
      <button type="button" aria-pressed={annual} onClick={() => setAnnual(true)}>{t('demo.workflow.annual')}</button>
    </div>
    <div className="wf-price" aria-live="polite"><strong>{t('demo.workflow.price', { amount: annual ? 16 : 20 })}</strong><span>{t('demo.workflow.perMonth')}</span></div>
    <p>{annual ? t('demo.workflow.annualTotal', { total: 192, saved: 48 }) : t('demo.workflow.monthlyTotal', { total: 20 })}</p>
  </div></div>;
}

export function FacetedFilterDemo() {
  const { t } = useLocale();
  const [design, setDesign] = useState(false);
  const [ready, setReady] = useState(false);
  const records = [{ id: 0, design: true, ready: true }, { id: 1, design: false, ready: true }, { id: 2, design: true, ready: false }];
  const visible = records.filter(item => (!design || item.design) && (!ready || item.ready));
  return <div className="wf-demo"><div className="wf-panel">
    <div className="wf-heading"><strong>{t('demo.workflow.library')}</strong><span aria-live="polite">{t('demo.workflow.results', { count: visible.length })}</span></div>
    <div className="wf-filters" role="group" aria-label={t('demo.workflow.filters')}>
      <button type="button" aria-pressed={design} onClick={() => setDesign(!design)}>{t('demo.workflow.design')}{design && <X size={11} aria-hidden="true" />}</button>
      <button type="button" aria-pressed={ready} onClick={() => setReady(!ready)}>{t('demo.workflow.ready')}{ready && <X size={11} aria-hidden="true" />}</button>
      <button type="button" className="wf-reset" disabled={!design && !ready} onClick={() => { setDesign(false); setReady(false); }} aria-label={t('demo.workflow.resetFilters')}><RotateCcw size={13} /></button>
    </div>
    <div className="wf-results">{visible.map(item => <div className="wf-result" key={item.id}><Layers size={13} aria-hidden="true" /><span>{t(documentKeys[item.id])}</span><i className={item.ready ? 'wf-dot-ready' : 'wf-dot-draft'} aria-label={t(item.ready ? 'demo.workflow.ready' : 'demo.workflow.draft')} /></div>)}</div>
  </div></div>;
}

export function BulkActionBarDemo() {
  const { t } = useLocale();
  const [ids, setIds] = useState(initialIds);
  const [selected, setSelected] = useState<number[]>([]);
  const [archived, setArchived] = useState(0);
  const all = useRef<HTMLInputElement | null>(null);
  const reset = useRef<HTMLButtonElement>(null);
  const partial = selected.length > 0 && selected.length < ids.length;
  // Set the native mixed state on every commit, including list changes.
  const allRef = (node: HTMLInputElement | null) => { all.current = node; if (node) node.indeterminate = partial; };
  useLayoutEffect(() => {
    if (archived > 0) (all.current?.disabled ? reset.current : all.current)?.focus();
  }, [archived]);
  return <div className="wf-demo"><div className="wf-panel">
    <div className="wf-heading"><label className="wf-check"><input ref={allRef} type="checkbox" aria-label={t('demo.workflow.selectAll')} checked={ids.length > 0 && selected.length === ids.length} disabled={!ids.length} onChange={event => setSelected(event.target.checked ? [...ids] : [])} /><strong>{t('demo.workflow.documents')}</strong></label><button ref={reset} type="button" className="wf-reset" aria-label={t('demo.workflow.resetDocuments')} onClick={() => { setIds(initialIds); setSelected([]); setArchived(0); }}><RotateCcw size={13} /></button></div>
    <div className="wf-results">{ids.map(id => <label className="wf-result wf-check" key={id}><input type="checkbox" checked={selected.includes(id)} onChange={event => setSelected(current => event.target.checked ? [...current, id] : current.filter(value => value !== id))} /><span>{t(documentKeys[id])}</span></label>)}</div>
    <div className="wf-action-slot">{selected.length > 0 ? <div className="wf-action-bar"><span>{t('demo.workflow.selected', { count: selected.length })}</span><button type="button" onClick={() => { if (!selected.length) return; setIds(current => current.filter(id => !selected.includes(id))); setArchived(current => current + selected.length); setSelected([]); }}><Archive size={12} aria-hidden="true" />{t('demo.workflow.archive')}</button></div> : <span role="status">{archived ? t('demo.workflow.archived', { count: archived }) : t('demo.workflow.selectHint')}</span>}</div>
  </div></div>;
}

export function UndoSnackbarDemo() {
  const { t } = useLocale();
  const [ids, setIds] = useState(initialIds);
  const [removed, setRemoved] = useState<number | null>(null);
  const undoButton = useRef<HTMLButtonElement>(null);
  const resetButton = useRef<HTMLButtonElement>(null);
  useLayoutEffect(() => { if (removed !== null) undoButton.current?.focus(); }, [removed]);
  return <div className="wf-demo"><div className="wf-panel">
    <div className="wf-heading"><strong>{t('demo.workflow.documents')}</strong><button ref={resetButton} type="button" className="wf-reset" aria-label={t('demo.workflow.resetDocuments')} onClick={() => { setIds(initialIds); setRemoved(null); }}><RotateCcw size={13} /></button></div>
    <div className="wf-results">{ids.map(id => <div className="wf-result" key={id}><Layers size={13} aria-hidden="true" /><span>{t(documentKeys[id])}</span><button type="button" aria-label={t('demo.workflow.deleteDocument', { name: t(documentKeys[id]) })} onClick={() => { setIds(current => current.filter(value => value !== id)); setRemoved(id); }}><Trash2 size={13} /></button></div>)}</div>
    <div className="wf-action-slot">{removed !== null ? <div className="wf-snackbar"><span role="status">{t('demo.workflow.deleted', { name: t(documentKeys[removed]) })}</span><button type="button" ref={undoButton} onClick={() => { const id = removed; setIds(current => [...current, id].sort((a, b) => a - b)); setRemoved(null); resetButton.current?.focus(); }}>{t('demo.workflow.undo')}</button></div> : <span>{t('demo.workflow.undoHint')}</span>}</div>
  </div></div>;
}

export function OnboardingChecklistDemo() {
  const { t } = useLocale();
  const [done, setDone] = useState<number[]>([]);
  const steps = ['demo.workflow.profile', 'demo.workflow.invite', 'demo.workflow.firstProject'] as const;
  return <div className="wf-demo"><div className="wf-panel wf-onboarding">
    <div className="wf-heading"><strong>{t('demo.workflow.getStarted')}</strong><span className="wf-badge" aria-live="polite">{t('demo.workflow.completed', { count: done.length, total: steps.length })}</span></div>
    <progress value={done.length} max={steps.length} aria-label={t('demo.workflow.progress')} />
    <div className="wf-results">{steps.map((key, index) => <button type="button" className="wf-step" key={key} aria-pressed={done.includes(index)} onClick={() => setDone(current => current.includes(index) ? current.filter(value => value !== index) : [...current, index])}><span className="wf-step-icon" aria-hidden="true">{done.includes(index) ? <Check size={12} /> : index + 1}</span><span>{t(key)}</span></button>)}</div>
    <span className="wf-note" role="status">{t(done.length === steps.length ? 'demo.workflow.allDone' : 'demo.workflow.checklistHint')}</span>
  </div></div>;
}
