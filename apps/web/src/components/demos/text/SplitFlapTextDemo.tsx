import { useDemoPulse } from '../../../hooks/useDemoAutoplay';
import { Fragment, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

const WORD_KEYS = ['demo.additions.text.flapNew', 'demo.additions.text.flapNow', 'demo.additions.text.flapYes'] as const;

function FlapHalf({ className, letter }: { className: string; letter: string }) {
  return <span className={className}><span className="td-flap-glyph">{letter}</span></span>;
}

export function SplitFlapTextDemo() {
  const { t } = useLocale();
  const [word, setWord] = useState({ index: 0, previous: 0 });
  useDemoPulse(() => setWord(current => ({ index: (current.index + 1) % WORD_KEYS.length, previous: current.index })));
  const currentWord = t(WORD_KEYS[word.index]);
  const previousWord = t(WORD_KEYS[word.previous]);
  return <div className="text-demo">
    <button type="button" className="td-flap-button" aria-label={t('demo.additions.text.switchFlapWord', { word: currentWord })} onClick={() => setWord(current => ({ index: (current.index + 1) % WORD_KEYS.length, previous: current.index }))}>
      {Array.from(currentWord).map((letter, index) => {
        const old = previousWord[index];
        const changed = old !== letter;
        return <span className="td-flap-cell" aria-hidden="true" key={index}>
          <FlapHalf className="td-flap-half td-flap-top" letter={letter} />
          <FlapHalf className="td-flap-half td-flap-bottom" letter={changed ? old : letter} />
          {changed && <Fragment key={word.index}>
            <FlapHalf className="td-flap-half td-flap-leaf-top" letter={old} />
            <FlapHalf className="td-flap-half td-flap-leaf-bottom" letter={letter} />
          </Fragment>}
        </span>;
      })}
    </button>
  </div>;
}
