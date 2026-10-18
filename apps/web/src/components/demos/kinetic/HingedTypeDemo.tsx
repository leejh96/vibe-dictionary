import { useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function HingedTypeDemo() {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);

  return <div className="kinetic-demo">
    <button type="button" className="kt-hinge-button" aria-label={t('demo.additions.kinetic.hingeToggle')} aria-pressed={open} data-open={open} onClick={() => setOpen(value => !value)}>
      <span className="kt-hinge-word" aria-hidden="true">
        {[...t('demo.additions.kinetic.vibeSample')].map((letter, index) => <span key={index} className="kt-hinge-letter" data-letter={letter}>{letter}</span>)}
      </span>
    </button>
  </div>;
}
