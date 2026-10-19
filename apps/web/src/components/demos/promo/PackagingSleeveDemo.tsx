import { useDemoNumber } from '../../../hooks/useDemoAutoplay';
import { useLocale } from '../../../i18n/LocaleContext';
import { useId } from 'react';

export function PackagingSleeveDemo() {
  const { t } = useLocale();
  const [progress, setProgress] = useDemoNumber(0, 0, 100, 1);
  const sceneId = useId();
  const offset = progress * .57;

  return (
    <div className="promo-demo pr-sleeve-demo">
      <svg id={sceneId} className="pr-sleeve-scene" viewBox="0 0 264 148" role="img" aria-label={t('demo.additions.promo.sleeve.scene')}>
        <g aria-hidden="true">
          <ellipse className="pr-sleeve-shadow" cx="132" cy="122" rx="112" ry="8" />
          <g className="pr-sleeve-tray" transform={`translate(${offset} 0)`}>
            <path className="pr-sleeve-tray-edge" d="M80 44L90 34H184V108L174 118H80Z" />
            <rect className="pr-sleeve-tray-face" x="80" y="44" width="94" height="74" rx="2" />
            <rect className="pr-sleeve-insert" x="85" y="49" width="84" height="64" rx="3" />
            <g className="pr-sleeve-product">
              <rect className="pr-sleeve-bottle" x="110" y="65" width="34" height="40" rx="5" />
              <path className="pr-sleeve-liquid" d="M114 80H140V98Q140 101 137 101H117Q114 101 114 98Z" />
              <path className="pr-sleeve-glint" d="M115 71V93" />
              <rect className="pr-sleeve-cap" x="116" y="55" width="22" height="13" rx="2" />
              <path className="pr-sleeve-cap-line" d="M120 58V64M125 58V64M130 58V64M135 58V64" />
            </g>
          </g>
          <g className="pr-sleeve-cover" transform={`translate(${-offset} 0)`}>
            <path className="pr-sleeve-top" d="M78 38L88 28H192L182 38Z" />
            <path className="pr-sleeve-side" d="M182 38L192 28V104L182 114Z" />
            <rect className="pr-sleeve-face" x="78" y="38" width="104" height="76" />
            <circle className="pr-sleeve-emblem" cx="130" cy="76" r="18" />
            <path className="pr-sleeve-emblem" d="M112 76H148M130 58V94" />
          </g>
        </g>
      </svg>
      <input className="pr-sleeve-progress" type="range" min="0" max="100" step="1" value={progress}
        aria-label={t('demo.additions.promo.sleeve.progress')} aria-controls={sceneId}
        aria-valuetext={progress === 0 ? t('demo.additions.promo.sleeve.closed') : progress === 100 ? t('demo.additions.promo.sleeve.revealed') : t('demo.additions.promo.sleeve.open', { percent: progress })}
        onChange={event => setProgress(Number(event.currentTarget.value))} />
    </div>
  );
}
