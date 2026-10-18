import { useId, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

const DIGITS = ['abcdef', 'bc', 'abdeg', 'abcdg', 'bcfg', 'acdfg', 'acdefg', 'abc', 'abcdefg', 'abcdfg'];
const SEGMENTS = [
  ['a', '10,0 52,0 57,5 52,10 10,10 5,5'],
  ['b', '59,7 64,12 64,42 59,47 54,42 54,12'],
  ['c', '59,53 64,58 64,88 59,93 54,88 54,58'],
  ['d', '10,90 52,90 57,95 52,100 10,100 5,95'],
  ['e', '5,53 10,58 10,88 5,93 0,88 0,58'],
  ['f', '5,7 10,12 10,42 5,47 0,42 0,12'],
  ['g', '10,45 52,45 57,50 52,55 10,55 5,50'],
] as const;

export function SevenSegmentLedDemo() {
  const { t } = useLocale();
  const [digit, setDigit] = useState(8);
  const id = useId();

  return <div className="retro-demo rt-led-demo">
    <svg id={id} className="rt-led-art" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.retro.ledArtwork', { digit })}>
      <g aria-hidden="true">
        <rect x="58" y="8" width="148" height="128" rx="10" fill="#3b2c24" stroke="#79553d" />
        <rect x="71" y="16" width="122" height="112" rx="6" fill="#140c08" />
        <g transform="translate(100 22)">
          {SEGMENTS.map(([segment, points]) => <polygon key={segment} points={points} className="rt-led-segment" data-segment={segment} data-lit={DIGITS[digit].includes(segment)} />)}
        </g>
      </g>
    </svg>
    <label className="rt-led-control">{t('demo.additions.retro.digit')}<input type="range" min="0" max="9" step="1" value={digit} aria-label={t('demo.additions.retro.ledInput')} aria-controls={id} onChange={event => setDigit(event.currentTarget.valueAsNumber)} /></label>
  </div>;
}
