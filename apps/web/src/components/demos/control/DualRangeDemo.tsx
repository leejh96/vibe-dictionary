import { useId, useRef, useState, type CSSProperties } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

type Range = { lower: number; upper: number };
type Thumb = keyof Range;
const bounds = (range: Range, thumb: Thumb) => thumb === 'lower' ? [0, range.upper - 20] : [range.lower + 20, 100];

export function DualRangeDemo() {
  const { t } = useLocale();
  const [range, setRange] = useState<Range>({ lower: 20, upper: 80 });
  const id = useId();
  const inputs = useRef<Record<Thumb, HTMLInputElement | null>>({ lower: null, upper: null });
  const update = (thumb: Thumb, value: number | 'min' | 'max') => setRange(current => {
    const [minimum, maximum] = bounds(current, thumb);
    return { ...current, [thumb]: value === 'min' ? minimum : value === 'max' ? maximum : Math.max(minimum, Math.min(maximum, value)) };
  });
  return <div className="control-demo"><fieldset className="ct-dual-frame" style={{ '--ct-lower': `${range.lower}%`, '--ct-upper': `${range.upper}%` } as CSSProperties}>
    <legend className="ct-control-label ct-dual-legend"><SlidersHorizontal size={16} aria-hidden="true" />{t('demo.additions.control.range')}<output htmlFor={`${id}-lower ${id}-upper`} aria-hidden="true">{t('demo.additions.control.interval', { lower: range.lower, upper: range.upper })}</output></legend>
    <div className="ct-dual-field" onPointerDown={event => {
      if (event.target !== event.currentTarget || event.button !== 0 || event.isPrimary === false) return;
      const rect = event.currentTarget.getBoundingClientRect();
      if (rect.width <= 44) return;
      const value = Math.round((event.clientX - rect.left - 22) / (rect.width - 44) * 100 / 5) * 5;
      const thumb = Math.abs(value - range.lower) <= Math.abs(value - range.upper) ? 'lower' : 'upper';
      event.preventDefault();
      update(thumb, value);
      inputs.current[thumb]?.focus();
    }}>
      <div className="ct-dual-track" aria-hidden="true" />
      {(['lower', 'upper'] as const).map(thumb => {
        const [minimum, maximum] = bounds(range, thumb);
        return <input key={thumb} className="ct-dual-input" type="range" id={`${id}-${thumb}`} aria-label={t(thumb === 'lower' ? 'demo.additions.control.minimum' : 'demo.additions.control.maximum')} min={0} max={100} step={5} value={range[thumb]} aria-valuemin={minimum} aria-valuemax={maximum} ref={node => { inputs.current[thumb] = node; }} onChange={event => update(thumb, Number(event.target.value))} onKeyDown={event => {
          if (event.key !== 'Home' && event.key !== 'End') return;
          event.preventDefault();
          update(thumb, event.key === 'Home' ? 'min' : 'max');
        }} />;
      })}
    </div>
  </fieldset></div>;
}
