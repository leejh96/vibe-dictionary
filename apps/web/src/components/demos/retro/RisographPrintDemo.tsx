import { useId, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function RisographPrintDemo() {
  const { t } = useLocale();
  const [offset, setOffset] = useState(3);
  const id = useId();
  const sceneId = `riso-scene-${id}`;
  const pearId = `riso-pear-${id}`;
  const dotsId = `riso-dots-${id}`;

  return <div className="retro-demo rt-riso-demo">
    <svg id={sceneId} className="rt-riso-art" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.retro.risographArtwork', { right: offset, up: offset / 2 })}>
      <defs>
        <path id={pearId} d="M132 32C113 30 120 54 105 67C83 86 87 116 108 123C123 129 141 125 155 124C182 123 189 96 170 77C154 62 153 34 132 32Z" />
        <pattern id={dotsId} width="3" height="3" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r=".65" fill="#2583a6" />
        </pattern>
      </defs>
      <g aria-hidden="true">
        <path d="M0 0H264V144H0Z" fill="#fff5df" />
        <use href={`#${pearId}`} fill="#f06a69" />
        <g className="rt-riso-blue-plate" transform={`translate(${offset} ${-offset / 2})`}>
          <use href={`#${pearId}`} fill={`url(#${dotsId})`} stroke="#2583a6" strokeWidth="3" />
          <path d="M132 32Q130 23 141 17M135 29Q153 11 161 23Q151 36 135 29Z" fill="none" stroke="#2583a6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
    </svg>
    <label className="rt-riso-control">{t('demo.additions.retro.plateOffset')}<input type="range" min="0" max="8" step="1" value={offset} aria-label={t('demo.additions.retro.risographInput')} aria-valuetext={t('demo.additions.retro.plateOffsetValue', { right: offset, up: offset / 2 })} aria-controls={sceneId} onChange={event => setOffset(event.currentTarget.valueAsNumber)} /></label>
  </div>;
}
