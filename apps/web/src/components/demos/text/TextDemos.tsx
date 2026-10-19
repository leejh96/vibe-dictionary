import { useDemoToggle } from '../../../hooks/useDemoAutoplay';
import { useId, useState } from 'react';
import { Minus, Pause, Play, Plus } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

export function DropCapTextDemo() {
  const { t } = useLocale();
  return <div className="text-demo td-dropcap-demo"><p className="td-dropcap-copy">{t('demo.additions.text.dropCapParagraph')}</p></div>;
}

const LETTER_STROKES = [
  'M24 18L44 62L64 18',
  'M86 18H106M96 18V62M86 62H106',
  'M128 62V18H143C164 18 164 40 143 40H128M143 40C168 40 168 62 143 62H128',
  'M216 18H184V62H216M184 40H210',
];

export function StrokeLetteringDemo() {
  const { t } = useLocale();
  const [replay, setReplay] = useState(0);
  return <div className="text-demo">
    <button type="button" className="td-lettering-button" aria-label={t('demo.additions.text.replayLettering')} onClick={() => setReplay(value => value + 1)}>
      <svg key={replay} className="td-lettering-svg" viewBox="0 0 240 80" aria-hidden="true" focusable="false">{LETTER_STROKES.map((path, index) => <path key={path} d={path} pathLength={1} style={{ animationDelay: `${index * 150}ms` }} />)}</svg>
    </button>
  </div>;
}

export function SpoilerTextDemo() {
  const { t } = useLocale();
  const [revealed, setRevealed] = useState(false);
  return <div className="text-demo">
    <div className="td-spoiler-line"><span>{t('demo.additions.text.nextTrip')}</span><button type="button" className="td-spoiler-button" data-revealed={revealed} aria-label={t(revealed ? 'demo.additions.text.hideDestination' : 'demo.additions.text.revealDestination')} onClick={() => setRevealed(value => !value)}><span className="td-spoiler-word" aria-hidden="true">{t('demo.additions.text.destination')}</span></button></div>
  </div>;
}

export function ClampedTextDemo() {
  const { t } = useLocale();
  const [expanded, setExpanded] = useState(false);
  const contentId = useId();
  const Icon = expanded ? Minus : Plus;
  return <div className="text-demo td-clamp-demo">
    <div className="td-clamp-frame">
      <p className="td-clamp-copy" id={contentId} data-expanded={expanded}>{t('demo.additions.text.clampedParagraph')}</p>
      <button type="button" className="td-clamp-toggle" aria-expanded={expanded} aria-controls={contentId} onClick={() => setExpanded(value => !value)}>{t(expanded ? 'demo.additions.text.collapseParagraph' : 'demo.additions.text.expandParagraph')}<Icon size={14} aria-hidden="true" /></button>
    </div>
  </div>;
}

export function OutlineFillTextDemo() {
  const { t } = useLocale();
  const [filled, setFilled] = useDemoToggle(false);
  return <div className="text-demo">
    <button type="button" className="td-outline-button" aria-label={t('demo.additions.text.toggleOutlineFill')} aria-pressed={filled} onClick={() => setFilled(value => !value)}>
      <span className="td-outline-word" data-word={t('demo.additions.text.outlineWord')} aria-hidden="true">{t('demo.additions.text.outlineWord')}</span>
    </button>
  </div>;
}

const HEADLINE_WORD_KEYS = ['demo.additions.text.headlineFirstWord', 'demo.additions.text.headlineSecondWord', 'demo.additions.text.headlineThirdWord', 'demo.additions.text.headlineFourthWord'] as const;

export function WordMaskHeadlineDemo() {
  const { t } = useLocale();
  const [replay, setReplay] = useState(0);
  return <div className="text-demo">
    <button type="button" className="td-headline-button" aria-label={t('demo.additions.text.replayHeadline')} onClick={() => setReplay(value => value + 1)}>
      <span key={replay} className="td-headline-visual" aria-hidden="true">{HEADLINE_WORD_KEYS.map((key, index) => <span className="td-word-mask" key={key}><span className="td-word-enter" style={{ animationDelay: `${index * 80}ms` }}>{t(key)}</span></span>)}</span>
    </button>
  </div>;
}

export function CircularTextDemo() {
  const { t } = useLocale();
  const [paused, setPaused] = useState(false);
  const pathId = useId();
  const Icon = paused ? Play : Pause;
  return <div className="text-demo td-circle-demo">
    <div className="td-circle-frame" data-paused={paused}>
      <svg className="td-circle-type" viewBox="0 0 120 120" aria-hidden="true">
        <defs><path id={pathId} d="M60 16a44 44 0 1 1 0 88a44 44 0 1 1 0-88Z" /></defs>
        <text textLength="270" lengthAdjust="spacing"><textPath href={`#${pathId}`} startOffset="1%">{t('demo.additions.text.circularPhrase')}</textPath></text>
      </svg>
      <button type="button" className="td-circle-toggle" aria-label={t(paused ? 'demo.additions.text.playCircularText' : 'demo.additions.text.pauseCircularText')} onClick={() => setPaused(value => !value)}><Icon size={18} aria-hidden="true" /></button>
    </div>
  </div>;
}
