import { useDemoToggle } from '../../../hooks/useDemoAutoplay';
import { } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function DifferenceBlendTypeDemo() {
  const { t } = useLocale();
  const [right, setRight] = useDemoToggle(false);

  return <div className="kinetic-ad-demo">
    <button type="button" className="ka-inversion-button" aria-label={t('demo.additions.kineticAd.inversionToggle')} aria-pressed={right} onClick={() => setRight(value => !value)}>
      <svg className="ka-inversion-scene" viewBox="0 0 264 148" aria-hidden="true" data-right={right}>
        <rect className="ka-inversion-canvas" width="264" height="148" />
        <rect className="ka-inversion-band" x="8" width="72" height="148" />
        <text className="ka-inversion-word" x="132" y="96" textAnchor="middle">{t('demo.additions.kineticAd.sampleBold')}</text>
      </svg>
    </button>
  </div>;
}
