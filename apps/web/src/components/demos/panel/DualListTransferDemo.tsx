import { useLocale } from '../../../i18n/LocaleContext';
import { useId, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const INITIAL_ITEMS = [
  { id: 'cover', name: 'demo.additions.panel.cover' as const, included: false, checked: false },
  { id: 'icon', name: 'demo.additions.panel.icon' as const, included: false, checked: false },
  { id: 'logo', name: 'demo.additions.panel.logo' as const, included: true, checked: false },
];

export function DualListTransferDemo() {
  const { t } = useLocale();
  const [items, setItems] = useState(INITIAL_ITEMS);
  const id = useId();
  const canInclude = items.some(item => !item.included && item.checked);
  const canReturn = items.some(item => item.included && item.checked);
  const move = (included: boolean) => setItems(current => {
    if (!current.some(item => item.included !== included && item.checked)) return current;
    return current.map(item => item.included !== included && item.checked ? { ...item, included, checked: false } : item);
  });

  return <div className="panel-demo">
    <div className="pn-transfer-frame">
      {[false, true].map(included => <section className="pn-transfer-pane" key={String(included)} aria-labelledby={`${id}-${included}-label`}>
        <strong id={`${id}-${included}-label`} className="pn-transfer-label">{t(included ? 'demo.additions.panel.included' : 'demo.additions.panel.pending')}</strong>
        <ul id={`${id}-${included}-list`} className="pn-transfer-items" aria-labelledby={`${id}-${included}-label`}>
          {items.filter(item => item.included === included).map(item => <li key={item.id}>
            <label><input type="checkbox" checked={item.checked} onChange={event => {
              const checked = event.currentTarget.checked;
              setItems(current => current.map(value => value.id === item.id ? { ...value, checked } : value));
            }} /><span>{t(item.name)}</span></label>
          </li>)}
        </ul>
      </section>)}
      <div className="pn-transfer-controls">
        <button type="button" aria-label={t('demo.additions.panel.includeSelected')} aria-disabled={!canInclude} aria-controls={`${id}-false-list ${id}-true-list`} onClick={() => move(true)}><ChevronRight size={18} aria-hidden="true" /></button>
        <button type="button" aria-label={t('demo.additions.panel.returnSelected')} aria-disabled={!canReturn} aria-controls={`${id}-false-list ${id}-true-list`} onClick={() => move(false)}><ChevronLeft size={18} aria-hidden="true" /></button>
      </div>
    </div>
  </div>;
}
