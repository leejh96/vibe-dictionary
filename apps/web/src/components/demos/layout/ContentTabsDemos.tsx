import { useId, useRef, useState } from 'react';
import { FileText } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

const TABS = ['demo.additions.layout.document', 'demo.additions.layout.colors'] as const;

function ContentTabs({ vertical = false }: { vertical?: boolean }) {
  const { t } = useLocale();
  const [active, setActive] = useState(0);
  const id = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  return <div className="layout-demo"><div className={`ld-tabs-frame${vertical ? ' ld-vertical-tabs' : ''}`}>
    <div className="ld-tablist" role="tablist" aria-label={t('demo.additions.layout.previewType')} aria-orientation={vertical ? 'vertical' : undefined}>{TABS.map((label, index) => <button type="button" role="tab" className="ld-underline-tab" id={`${id}-tab-${index}`} aria-controls={`${id}-panel-${index}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} key={label} ref={node => { buttons.current[index] = node; }} onFocus={() => setActive(index)} onClick={() => setActive(index)} onKeyDown={event => {
      const next = event.key === (vertical ? 'ArrowDown' : 'ArrowRight') ? (index + 1) % TABS.length : event.key === (vertical ? 'ArrowUp' : 'ArrowLeft') ? (index + TABS.length - 1) % TABS.length : event.key === 'Home' ? 0 : event.key === 'End' ? TABS.length - 1 : undefined;
      if (next === undefined) return;
      event.preventDefault();
      setActive(next);
      buttons.current[next]?.focus();
    }}>{t(label)}</button>)}</div>
    <div className="ld-tab-panel" role="tabpanel" id={`${id}-panel-0`} aria-labelledby={`${id}-tab-0`} tabIndex={0} hidden={active !== 0}><FileText size={24} aria-hidden="true" /><span>{t('demo.additions.layout.note')}</span></div>
    <div className="ld-tab-panel" role="tabpanel" id={`${id}-panel-1`} aria-labelledby={`${id}-tab-1`} tabIndex={0} hidden={active !== 1}><ul className="ld-tab-swatches">{(['demo.additions.layout.indigo', 'demo.additions.layout.mint', 'demo.additions.layout.amber'] as const).map((color, index) => <li key={color} data-color={index}><span className="sr-only">{t(color)}</span></li>)}</ul></div>
  </div></div>;
}

export function UnderlineTabsDemo() { return <ContentTabs />; }
export function VerticalTabsDemo() { return <ContentTabs vertical />; }
