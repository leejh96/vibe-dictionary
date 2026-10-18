import { useId, useLayoutEffect, useRef, useState } from 'react';
import { FileText, RotateCcw, X } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

const DOCUMENTS = ['demo.additions.layout.note', 'demo.additions.layout.record'] as const;
type DocumentKey = typeof DOCUMENTS[number];

export function ClosableTabsDemo() {
  const { t } = useLocale();
  const [workspace, setWorkspace] = useState<{ documents: readonly DocumentKey[]; active: DocumentKey | '' }>({ documents: DOCUMENTS, active: DOCUMENTS[0] });
  const { documents, active } = workspace;
  const id = useId();
  const buttons = useRef<Record<string, HTMLButtonElement | null>>({});
  const restoreButton = useRef<HTMLButtonElement>(null);
  const focusAfterChange = useRef(false);
  useLayoutEffect(() => {
    if (!focusAfterChange.current) return;
    focusAfterChange.current = false;
    (buttons.current[active] ?? restoreButton.current)?.focus();
  }, [workspace, active]);

  const select = (name: DocumentKey) => setWorkspace(current => current.active === name ? current : { ...current, active: name });
  const close = (name: DocumentKey | '') => {
    if (!name) return;
    focusAfterChange.current = true;
    setWorkspace(current => {
      const index = current.documents.indexOf(name);
      if (index < 0) return current;
      const remaining = current.documents.filter(document => document !== name);
      return { documents: remaining, active: remaining[Math.min(index, remaining.length - 1)] ?? '' };
    });
  };

  return <div className="layout-demo"><div className={`ld-document-frame${documents.length ? '' : ' ld-document-empty'}`}>
    {documents.length ? <>
      <div className="ld-document-toolbar">
        <div className="ld-tablist" role="tablist" aria-label={t('demo.additions.layout.openDocuments')}>{documents.map((name, index) => <button type="button" role="tab" className="ld-underline-tab" id={`${id}-tab-${name}`} aria-controls={`${id}-panel-${name}`} aria-selected={active === name} tabIndex={active === name ? 0 : -1} key={name} ref={node => { buttons.current[name] = node; }} onFocus={() => select(name)} onClick={() => select(name)} onKeyDown={event => {
          if (event.key === 'Delete') { event.preventDefault(); close(name); return; }
          const next = event.key === 'ArrowRight' ? (index + 1) % documents.length : event.key === 'ArrowLeft' ? (index + documents.length - 1) % documents.length : event.key === 'Home' ? 0 : event.key === 'End' ? documents.length - 1 : undefined;
          if (next === undefined) return;
          event.preventDefault();
          select(documents[next]);
          buttons.current[documents[next]]?.focus();
        }}>{t(name)}</button>)}</div>
        <button type="button" className="ld-document-close" aria-label={t('demo.additions.layout.closeDocument', { name: active ? t(active) : '' })} onClick={() => close(active)}><X size={18} aria-hidden="true" /></button>
      </div>
      {documents.map(name => <div className="ld-tab-panel" role="tabpanel" id={`${id}-panel-${name}`} aria-labelledby={`${id}-tab-${name}`} tabIndex={0} hidden={active !== name} key={name}><FileText size={24} aria-hidden="true" /><span>{t(name)}</span></div>)}
    </> : <button type="button" className="ld-document-close ld-document-restore" ref={restoreButton} onClick={() => {
      focusAfterChange.current = true;
      setWorkspace({ documents: DOCUMENTS, active: DOCUMENTS[0] });
    }}><RotateCcw size={16} aria-hidden="true" />{t('demo.additions.layout.restoreDocuments')}</button>}
  </div></div>;
}
