import { useId, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

export function FaceBlurMaskDemo() {
  const { t } = useLocale();
  const id = useId();
  const [position, setPosition] = useState(50);
  const [masked, setMasked] = useState(true);
  const Icon = masked ? EyeOff : Eye;

  return <div className="broadcast-demo bc-face-demo">
    <svg id={id} className="bc-face-scene" viewBox="0 0 264 144" role="img" aria-label={t(masked ? 'demo.additions.broadcast.faceApplied' : 'demo.additions.broadcast.faceRemoved', { position })}>
      <defs>
        <filter id={`${id}-blur`} filterUnits="userSpaceOnUse" x={84} y={0} width={96} height={144} colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation={6} />
        </filter>
        <clipPath id={`${id}-face`} clipPathUnits="userSpaceOnUse"><ellipse cx={132} cy={49} rx={25} ry={30} /></clipPath>
        <g id={`${id}-subject`}>
          <path className="bc-face-jacket" d="M96 144v-40c0-18 15-27 36-27s36 9 36 27v40z" />
          <path className="bc-face-seam" d="m117 81 15 24 15-24m-15 24v39" />
          <path fill="#b8846d" d="M124 66h16v17c-5 7-11 7-16 0z" />
          <ellipse fill="#dca98c" cx={132} cy={49} rx={22} ry={27} />
          <path fill="#38303a" d="M110 48c-6-21 4-34 22-34 21 0 29 16 22 34l-7-16-16 5-13-5z" />
          <g fill="#45313a">
            <circle cx={124} cy={49} r={2.8} /><circle cx={141} cy={49} r={2.8} />
          </g>
          <path fill="none" stroke="#875548" strokeWidth={2} strokeLinecap="round" d="M132 51v8h3m-9 7q6 4 12 0" />
        </g>
      </defs>
      <g aria-hidden="true">
        <path className="bc-face-wall" d="M0 0h264v144H0z" />
        <path className="bc-face-window" d="M18 15h67v71H18zM200 15h46v71h-46z" />
        <path className="bc-face-mullion" d="M51 15v71M18 53h67m138-38v71m-23-33h46" />
        <path className="bc-face-floor" d="M0 109h264v35H0z" />
        <g className="bc-face-moving" transform={`translate(${(position - 50) * 1.2} 0)`}>
          <use href={`#${id}-subject`} />
          <g className="bc-face-mask" clipPath={`url(#${id}-face)`} opacity={masked ? 1 : 0}>
            <use href={`#${id}-subject`} filter={`url(#${id}-blur)`} />
          </g>
        </g>
      </g>
    </svg>
    <div className="bc-face-controls">
      <label className="bc-face-position">
        <span>{t('demo.additions.broadcast.faceLabel')}</span>
        <input type="range" min={0} max={100} step={1} value={position} aria-label={t('demo.additions.broadcast.faceInput')} aria-valuetext={t('demo.additions.broadcast.faceValue', { position })} aria-controls={id} onChange={event => setPosition(Number(event.currentTarget.value))} />
      </label>
      <button type="button" className="bc-face-toggle" aria-label={t('demo.additions.broadcast.faceToggle')} aria-pressed={masked} aria-controls={id} onClick={() => setMasked(value => !value)}><Icon size={18} aria-hidden="true" /></button>
    </div>
  </div>;
}
