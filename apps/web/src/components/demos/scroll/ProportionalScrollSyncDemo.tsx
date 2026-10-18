import { useLocale } from '../../../i18n/LocaleContext';
import { useId, useRef } from 'react';

const DOCUMENTS = [
  { name: 'demo.additions.scroll.summary', lines: ['demo.additions.scroll.thinkReader', 'demo.additions.scroll.resultFirst', 'demo.additions.scroll.oneThought', 'demo.additions.scroll.concreteWords', 'demo.additions.scroll.includeExceptions', 'demo.additions.scroll.readStart'] },
  { name: 'demo.additions.scroll.commentary', lines: ['demo.additions.scroll.identifyReader', 'demo.additions.scroll.findAction', 'demo.additions.scroll.keyResult', 'demo.additions.scroll.paragraphTopic', 'demo.additions.scroll.splitSentences', 'demo.additions.scroll.reduceAbstract', 'demo.additions.scroll.addExample', 'demo.additions.scroll.stateExceptions', 'demo.additions.scroll.readAloud'] },
] as const;

export function ProportionalScrollSyncDemo() {
  const { t } = useLocale();
  const id = useId();
  const panes = useRef<[HTMLDivElement | null, HTMLDivElement | null]>([null, null]);
  const driver = useRef<number | null>(null);

  function syncScroll(source: HTMLDivElement, target: HTMLDivElement | null) {
    if (!target) return;
    const sourceRange = source.scrollHeight - source.clientHeight;
    const fraction = sourceRange > 0 ? Math.min(1, Math.max(0, source.scrollTop / sourceRange)) : 0;
    const targetRange = Math.max(0, target.scrollHeight - target.clientHeight);
    const next = fraction * targetRange;
    // Native fractional scroll positions may round differently in the two panes.
    if (Math.abs(target.scrollTop - next) > 1 || ((fraction === 0 || fraction === 1) && target.scrollTop !== next)) {
      target.scrollTop = next;
    }
  }

  return <div className="scroll-demo"><div className="sc-dual-frame sc-sync-frame">
    {DOCUMENTS.map((document, index) => <div className="sc-dual-pane" key={document.name}>
      <h3 className="sc-dual-heading" id={`${id}-sync-${index}`}>{t(document.name)}</h3>
      <div className="sc-pane-viewport" role="region" aria-labelledby={`${id}-sync-${index}`} tabIndex={0}
        ref={element => { panes.current[index] = element; }}
        onFocus={() => { driver.current = index; }}
        onWheel={() => { driver.current = index; }}
        onPointerDown={() => { driver.current = index; }}
        onKeyDown={() => { driver.current = index; }}
        onScroll={event => {
          if (driver.current === null) driver.current = index;
          // Delayed peer events must never write back into an ongoing native scroll.
          if (driver.current === index) syncScroll(event.currentTarget, panes.current[1 - index]);
        }}>
        <ol className="sc-pane-list sc-sync-lines">{document.lines.map(line => <li key={line}>{t(line)}</li>)}</ol>
      </div>
    </div>)}
  </div></div>;
}
