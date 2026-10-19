import { useId, useLayoutEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Search } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

const FIELDS = [
  { id: 'type', labelKey: 'demo.additions.control.typography' },
  { id: 'color', labelKey: 'demo.additions.control.colorSystem' },
  { id: 'icon', labelKey: 'demo.additions.control.icons' },
] as const;

export function SearchComboboxDemo() {
  const { t } = useLocale();
  const [entry, setEntry] = useState<string | typeof FIELDS[number]>('');
  const value = typeof entry === 'string' ? entry : t(entry.labelKey);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const activeOption = useRef<HTMLLIElement>(null);
  const matches = FIELDS.filter(field => t(field.labelKey).includes(value.trim()));
  const expanded = open && matches.length > 0;
  const activeField = expanded ? matches.find(field => field.id === active) : undefined;
  useLayoutEffect(() => { activeOption.current?.scrollIntoView({ block: 'nearest' }); }, [active]);
  const close = () => { setOpen(false); setActive(null); };
  const choose = (field: typeof FIELDS[number]) => {
    setEntry(field);
    input.current?.focus();
    close();
  };
  return <div className="control-demo"><div className="ct-combo-frame">
    <label className="ct-control-label" htmlFor={id}><Search size={16} aria-hidden="true" />{t('demo.additions.control.designField')}</label>
    <div className="ct-combo-field">
      <input className="ct-combo-input" ref={input} id={id} role="combobox" autoComplete="off" spellCheck={false} placeholder={t('demo.additions.control.searchFields')} value={value}
        aria-autocomplete="list" aria-expanded={expanded} aria-controls={`${id}-list`} aria-activedescendant={activeField ? `${id}-${activeField.id}` : undefined}
        onFocus={() => setOpen(true)} onClick={() => setOpen(true)} onBlur={close}
        onChange={event => { setEntry(event.currentTarget.value); setActive(null); setOpen(true); }}
        onKeyDown={event => {
          if (event.nativeEvent.isComposing) return;
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            if (!matches.length || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
            event.preventDefault();
            const index = expanded ? matches.findIndex(field => field.id === active) : -1;
            const next = event.key === 'ArrowDown' ? Math.min(index + 1, matches.length - 1) : index < 0 ? matches.length - 1 : Math.max(index - 1, 0);
            setActive(matches[next].id);
            setOpen(true);
          } else if (event.key === 'Enter' && activeField) {
            event.preventDefault();
            choose(activeField);
          } else if (event.key === 'Escape' && open) {
            event.preventDefault();
            event.stopPropagation();
            close();
          } else if (event.key === 'Tab') close();
        }} />
      <ChevronDown size={18} aria-hidden="true" />
      <ul className="ct-combo-list" id={`${id}-list`} role="listbox" aria-label={t('demo.additions.control.fieldSuggestions')} hidden={!expanded}>
        {matches.map(field => <li data-demo-control key={field.id} id={`${id}-${field.id}`} role="option" aria-selected={activeField?.id === field.id}
          ref={activeField?.id === field.id ? activeOption : undefined}
          onPointerDown={event => { if (event.button === 0) event.preventDefault(); }} onClick={() => choose(field)}>
          <span>{t(field.labelKey)}</span><Check size={16} aria-hidden="true" />
        </li>)}
      </ul>
      {open && !matches.length && <div className="ct-combo-empty" role="status">{t('demo.additions.control.noSuggestions')}</div>}
    </div>
  </div></div>;
}
