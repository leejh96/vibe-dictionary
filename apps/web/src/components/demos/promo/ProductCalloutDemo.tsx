import { useDemoNumber } from '../../../hooks/useDemoAutoplay';
import { useLocale } from '../../../i18n/LocaleContext';
import { useId } from 'react';

export function ProductCalloutDemo() {
  const { t } = useLocale();
  const [progress, setProgress] = useDemoNumber(0, 0, 100, 1);
  const sceneId = useId();
  const cameraX = 98 + progress * .48;
  const anchorX = cameraX + 30;

  return (
    <div className="promo-demo pr-callout-demo">
      <svg id={sceneId} className="pr-callout-scene" viewBox="0 0 264 148" role="img" aria-label={t('demo.additions.promo.callout.scene')}>
        <g aria-hidden="true">
          <g className="pr-callout-camera" transform={`translate(${cameraX} 86)`}>
            <ellipse className="pr-callout-shadow" cx="1" cy="36" rx="57" ry="7" />
            <path className="pr-callout-prism" d="M-28-26L-18-39H11L21-26Z" />
            <rect className="pr-callout-body" x="-52" y="-27" width="104" height="54" rx="7" />
            <path className="pr-callout-top-edge" d="M-45-19H45" />
            <rect className="pr-callout-grip" x="-52" y="-15" width="24" height="42" rx="6" />
            <path className="pr-callout-grip-lines" d="M-47-8V20M-42-8V20M-37-8V20" />
            <rect className="pr-callout-viewfinder" x="-14" y="-33" width="20" height="9" rx="2" />
            <circle className="pr-callout-lens-rim" cx="4" cy="0" r="24" />
            <circle className="pr-callout-lens-ring" cx="4" cy="0" r="18" />
            <circle className="pr-callout-glass" cx="4" cy="0" r="12" />
            <circle className="pr-callout-glint" cx="0" cy="-4" r="4" />
            <circle className="pr-callout-dial" cx="30" cy="-30" r="9" />
            <path className="pr-callout-dial-grooves" d="M26-36V-24M30-37V-23M34-36V-24" />
          </g>
          <polyline className="pr-callout-leader" points={`${anchorX},56 193,34 238,34`} />
          <circle className="pr-callout-marker-ring" cx={anchorX} cy="56" r="7" />
          <circle className="pr-callout-marker" cx={anchorX} cy="56" r="2.5" />
          <text className="pr-callout-label" x="198" y="26">{t('demo.additions.promo.callout.dial')}</text>
        </g>
      </svg>
      <input className="pr-callout-progress" type="range" min="0" max="100" step="1" value={progress}
        aria-label={t('demo.additions.promo.callout.position')} aria-controls={sceneId}
        aria-valuetext={progress === 0 ? t('demo.additions.promo.callout.left') : progress === 100 ? t('demo.additions.promo.callout.right') : t('demo.additions.promo.callout.percent', { percent: progress })}
        onChange={event => setProgress(Number(event.currentTarget.value))} />
    </div>
  );
}
