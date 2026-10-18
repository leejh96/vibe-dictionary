import { useId, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function CinematicLetterboxDemo() {
  const { t } = useLocale();
  const id = useId();
  const [progress, setProgress] = useState(100);
  const ratio = 16 / 9 + (2.35 - 16 / 9) * progress / 100;
  const barHeight = (148.5 - 264 / ratio) / 2;

  return <div className="broadcast-demo bc-letterbox-demo">
    <svg id={id} className="bc-letterbox-scene" viewBox="0 0 264 148.5" role="img" aria-label={t('demo.additions.broadcast.letterboxScene', { ratio: ratio.toFixed(2) })}>
      <g aria-hidden="true">
        <g className="bc-letterbox-landscape">
          <path className="bc-letterbox-sky" d="M0 0h264v148.5H0z" />
          <circle className="bc-letterbox-sun" cx={207} cy={44} r={17} />
          <path className="bc-letterbox-cloud" d="M22 14h49m-13 8h34m114-9h28" />
          <path className="bc-letterbox-far" d="m0 94 52-47 51 39 47-50 59 52 55-28v88.5H0z" />
          <path className="bc-letterbox-snow" d="m132 55 18-19 20 18-15-5-6 9-7-9z" />
          <path className="bc-letterbox-near" d="m0 110 53-25 58 15 58-25 47 19 48-9v63.5H0z" />
          <path className="bc-letterbox-river" d="M132 91h11l-12 19 37 16-18 22.5H99l40-20-28-16z" />
          <path className="bc-letterbox-bank" d="M0 148.5v-35l41 11 25 24.5zM201 148.5l21-34 42-6v40z" />
          <path className="bc-letterbox-trees" d="m25 113 8-18 8 18h-6v10h-4v-10zm25 13 9-21 9 21h-7v10h-4v-10zm176-12 8-19 8 19h-6v10h-4v-10z" />
        </g>
        <g className="bc-letterbox-matte" fill="#000">
          <rect x={0} y={0} width={264} height={barHeight} />
          <rect x={0} y={148.5 - barHeight} width={264} height={barHeight} />
        </g>
      </g>
    </svg>
    <label className="bc-letterbox-control">
      <span>{t('demo.additions.broadcast.letterboxLabel')}</span>
      <input type="range" min={0} max={100} step={1} value={progress} aria-label={t('demo.additions.broadcast.letterboxInput')} aria-valuetext={t('demo.additions.broadcast.letterboxValue', { ratio: ratio.toFixed(2) })} aria-controls={id} onChange={event => setProgress(Number(event.currentTarget.value))} />
    </label>
  </div>;
}
