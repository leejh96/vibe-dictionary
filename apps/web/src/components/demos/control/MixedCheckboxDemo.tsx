import { useId, useLayoutEffect, useRef, useState } from 'react';
import { Check, Minus } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

const OPTIONS = ['demo.additions.control.colorOption', 'demo.additions.control.typeOption', 'demo.additions.control.layoutOption'] as const;
type Option = typeof OPTIONS[number];

export function MixedCheckboxDemo() {
  const { t } = useLocale();
  const [selected, setSelected] = useState<readonly Option[]>([OPTIONS[0]]);
  const id = useId();
  const master = useRef<HTMLInputElement>(null);
  const all = selected.length === OPTIONS.length;
  const mixed = selected.length > 0 && !all;
  useLayoutEffect(() => { if (master.current) master.current.indeterminate = mixed; }, [mixed]);
  return <div className="control-demo"><fieldset className="ct-checkbox-group">
    <legend className="sr-only">{t('demo.additions.control.designOptions')}</legend>
    {(['demo.additions.control.selectAll', ...OPTIONS] as const).map((name, index) => {
      const isMaster = index === 0;
      const Icon = isMaster && mixed ? Minus : Check;
      return <label className="ct-check-row" htmlFor={`${id}-${index}`} key={name}>
        <span className="ct-check-box"><input className="ct-checkbox-input" type="checkbox" id={`${id}-${index}`} ref={isMaster ? master : undefined} checked={isMaster ? all : selected.includes(OPTIONS[index - 1])} onChange={event => {
          const checked = event.target.checked;
          setSelected(current => isMaster ? checked ? OPTIONS : [] : checked ? [...current, OPTIONS[index - 1]] : current.filter(option => option !== name));
        }} /><Icon size={14} aria-hidden="true" /></span><span>{t(name)}</span>
      </label>;
    })}
  </fieldset></div>;
}
