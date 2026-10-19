import { useDemoToggle } from '../../../hooks/useDemoAutoplay';
import type { CSSProperties } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

const POSES = [[30, 38, -22], [70, 86, 13], [104, 34, -12], [140, 86, 8], [176, 36, 18], [208, 84, -16], [238, 40, 24]];

export function ScatterTypeDemo() {
  const { t } = useLocale();
  const [scattered, setScattered] = useDemoToggle(false);

  return <div className="kinetic-demo">
    <button type="button" className="kt-scatter-button" aria-label={t('demo.additions.kinetic.scatterToggle')} aria-pressed={scattered} onClick={() => setScattered(value => !value)}>
      <svg viewBox="0 0 264 104" aria-hidden="true">
        {t('demo.additions.kinetic.exploreSample').split('').map((letter, index) => {
          const [x, y, angle] = scattered ? POSES[index] : [48 + index * 28, 58, 0];
          return <text key={index} className="kt-scatter-letter" textAnchor="middle" style={{ transform: `translate(${x}px, ${y}px) rotate(${angle}deg)`, '--kt-delay': `${index * 35}ms` } as CSSProperties}>{letter}</text>;
        })}
      </svg>
    </button>
  </div>;
}
