import { useDemoNumber } from '../../../hooks/useDemoAutoplay';
import { useLocale } from '../../../i18n/LocaleContext';
import { useId } from 'react';

const POSES = [
  [-42, 0, -15], [-30, -5, -10], [-18, -3, -5], [-6, -7, 0],
  [6, -2, 5], [18, -6, 10], [30, -3, 15], [42, 0, 20],
];

export function StopMotionFlatlayDemo() {
  const { t } = useLocale();
  const [progress, setProgress] = useDemoNumber(0, 0, 100, 1);
  const sceneId = useId();
  const frame = Math.min(7, Math.floor(progress * 8 / 100));
  const [x, y, rotation] = POSES[frame];

  return (
    <div className="promo-demo pr-stop-demo">
      <svg id={sceneId} className="pr-stop-scene" viewBox="0 0 264 148" role="img" aria-label={t('demo.additions.promo.stop.scene')}>
        <g aria-hidden="true">
          <path className="pr-stop-paper-shadow" d="M101 31L188 40L179 126L92 117Z" />
          <path className="pr-stop-paper" d="M99 28L186 37L177 123L90 114Z" />
          <path className="pr-stop-paper-fold" d="M97 105L179 114M99 109L178 118" />
          <g className="pr-stop-bean" transform={`translate(53 ${35 + frame % 2 * 2}) rotate(${frame * 11})`}>
            <ellipse rx="5" ry="8" /><path d="M0-6Q3 0 0 6" />
          </g>
          <g className="pr-stop-bean" transform={`translate(211 ${113 - frame % 2 * 2}) rotate(${-30 - frame * 11})`}>
            <ellipse rx="5" ry="8" /><path d="M0-6Q3 0 0 6" />
          </g>
          <g className="pr-stop-mug" transform={`translate(${132 + x} ${74 + y}) rotate(${rotation})`}>
            <ellipse className="pr-stop-shadow" cx="1" cy="4" rx="36" ry="33" />
            <circle className="pr-stop-saucer" r="34" />
            <circle className="pr-stop-saucer-ring" r="28" />
            <path className="pr-stop-handle" d="M22-10H31C45-10 45 10 31 10H22" />
            <circle className="pr-stop-cup" r="25" />
            <circle className="pr-stop-coffee" r="20" />
            <path className="pr-stop-latte" d="M0 13C-15 5-16-9-5-11C-2-12 0-9 0-5C0-9 2-12 5-11C16-9 15 5 0 13Z" />
            <path className="pr-stop-latte-stem" d="M0-4V10" />
          </g>
        </g>
      </svg>
      <input className="pr-stop-progress" type="range" min="0" max="100" step="1" value={progress}
        aria-label={t('demo.additions.promo.stop.progress')} aria-controls={sceneId}
        aria-valuetext={progress === 0 ? t('demo.additions.promo.stop.first') : progress === 100 ? t('demo.additions.promo.stop.last') : t('demo.additions.promo.stop.held', { percent: progress })}
        onChange={event => setProgress(Number(event.currentTarget.value))} />
    </div>
  );
}
