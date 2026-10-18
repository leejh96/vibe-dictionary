import { useLocale } from '../../../i18n/LocaleContext';
import { useId, useState } from 'react';

export function BeveragePourDemo() {
  const { t } = useLocale();
  const [progress, setProgress] = useState(0);
  const sceneId = useId();
  const glassId = `${sceneId}-glass`;
  const fill = Math.max(0, Math.min(1, (progress - 15) / 70));
  const tilt = -60 * (1 - Math.min(1, progress / 15, (100 - progress) / 15));
  const surfaceY = 120 - fill * 40;
  const surfaceRadius = 21 + (120 - surfaceY) * .125;
  const streamWidth = 5 * Math.max(0, Math.min(1, (progress - 15) / 8, (85 - progress) / 8));

  return (
    <div className="promo-demo pr-pour-demo">
      <svg id={sceneId} className="pr-pour-scene" viewBox="0 0 264 148" role="img" aria-label={t('demo.additions.promo.pour.scene')}>
        <defs>
          <clipPath id={glassId}><path d="M134 72H188L183 120Q161 127 140 120Z" /></clipPath>
        </defs>
        <g aria-hidden="true">
          <ellipse className="pr-pour-shadow" cx="161" cy="129" rx="40" ry="6" />
          <path className="pr-pour-glass-back" d="M130 68H192L186 124Q161 133 137 124Z" />
          {fill > 0 && <g className="pr-pour-liquid" clipPath={`url(#${glassId})`}>
            <rect className="pr-pour-tea" x="130" y={surfaceY} width="64" height={128 - surfaceY} />
            <ellipse className="pr-pour-surface" cx="161" cy={surfaceY} rx={surfaceRadius} ry="3" />
          </g>}
          {streamWidth > 0 && <path className="pr-pour-stream" d={`M115 44C137 48 161 59 161 ${surfaceY}`} strokeWidth={streamWidth} />}
          <g className="pr-pour-bottle" transform={`translate(-20 0) rotate(${tilt} 135 44)`}>
            <path className="pr-pour-bottle-body" d="M60 23Q60 20 65 20H101Q109 20 115 32L118 36H127V48H118L115 52Q109 64 101 64H65Q60 64 60 60Z" />
            <path className="pr-pour-neck" d="M125 36H135V48H125Z" />
            <path className="pr-pour-lip" d="M135 36V48" />
            <rect className="pr-pour-label" x="72" y="27" width="28" height="30" rx="2" />
            <path className="pr-pour-leaf" d="M79 47C76 35 91 32 94 32C95 44 87 50 79 47Z" />
            <path className="pr-pour-vein" d="M78 49L91 36" />
            <path className="pr-pour-bottle-glint" d="M65 27V54" />
          </g>
          <path className="pr-pour-glass-outline" d="M130 68L137 124Q161 133 186 124L192 68M130 68Q161 76 192 68" />
          <path className="pr-pour-glass-glint" d="M136 79L141 115M184 80L180 113" />
        </g>
      </svg>
      <input className="pr-pour-progress" type="range" min="0" max="100" step="1" value={progress}
        aria-label={t('demo.additions.promo.pour.progress')} aria-controls={sceneId}
        aria-valuetext={progress <= 15 ? t('demo.additions.promo.pour.empty') : progress >= 85 ? t('demo.additions.promo.pour.filled') : t('demo.additions.promo.pour.filling', { percent: Math.round(fill * 100) })}
        onChange={event => setProgress(Number(event.currentTarget.value))} />
    </div>
  );
}
