import { useId, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

const CAPTION_LINES = [['demo.additions.broadcast.captionWord1', 'demo.additions.broadcast.captionWord2', 'demo.additions.broadcast.captionWord3'], ['demo.additions.broadcast.captionWord4', 'demo.additions.broadcast.captionWord5', 'demo.additions.broadcast.captionWord6']] as const;

export function WordHighlightSubtitlesDemo() {
  const { t } = useLocale();
  const sceneId = useId();
  const [paused, setPaused] = useState(false);
  const Icon = paused ? Play : Pause;

  return <div className="broadcast-demo">
    <div className="bc-caption-frame" data-paused={paused}>
      <div id={sceneId} className="bc-caption-scene" role="img" aria-label={t('demo.additions.broadcast.captionScene')}>
        <svg viewBox="0 0 264 144" className="bc-caption-portrait" aria-hidden="true">
          <path className="bc-caption-wall" d="M0 0h264v144H0z" />
          <path className="bc-caption-window" d="M12 0h56v92H12zM76 0h4v92h-4z" />
          <path className="bc-caption-shirt" d="M84 144V87c0-22 19-35 48-35s48 13 48 35v57z" />
          <path className="bc-caption-neck" d="M122 43h20v18c-6 8-14 8-20 0z" />
          <ellipse className="bc-caption-face" cx={132} cy={32} rx={19} ry={24} />
          <path className="bc-caption-hair" d="M113 31c-5-17 2-28 18-28 18 0 25 14 19 29l-5-15-22 5z" />
        </svg>
        <div className="bc-caption-copy" aria-hidden="true">
          {CAPTION_LINES.map((line, lineIndex) => <div className="bc-caption-line" key={lineIndex}>
            {line.map((word, wordIndex) => <span className="bc-caption-word" key={word} style={{ animationDelay: `${(lineIndex * 3 + wordIndex) * 600}ms` }}>{t(word)}</span>)}
          </div>)}
        </div>
      </div>
      <button type="button" className="bc-caption-control" aria-label={t(paused ? 'demo.additions.broadcast.captionResume' : 'demo.additions.broadcast.captionPause')} aria-controls={sceneId} onClick={() => setPaused(value => !value)}>
        <Icon size={18} aria-hidden="true" />
      </button>
    </div>
  </div>;
}
