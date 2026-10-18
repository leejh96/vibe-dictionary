import { useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function SlicedTypeDemo() {
  const { t } = useLocale();
  const [replay, setReplay] = useState(0);

  return <div className="kinetic-demo">
    <button type="button" className="kt-slice-button" aria-label={t('demo.additions.kinetic.sliceReplay')} onClick={() => setReplay(value => value + 1)}>
      <span key={replay} className="kt-slice-stack" aria-hidden="true">{[0, 1, 2, 3].map(index => <span key={index} className="kt-text-slice" style={{ clipPath: `inset(${index * 25}% 0 ${75 - index * 25}% 0)`, animationDelay: `${index * 70}ms`, '--kt-from-x': `${index % 2 ? 36 : -36}px`, '--kt-from-skew': `${index % 2 ? 12 : -12}deg` } as React.CSSProperties}>{t('demo.additions.kinetic.createSample')}</span>)}</span>
    </button>
  </div>;
}
