import { useLocale } from '../../../i18n/LocaleContext';
import { useId, useLayoutEffect, useRef, useState } from 'react';
import { History } from 'lucide-react';

const RECORDS = [
  ['09:00', 'demo.additions.scroll.layoutRecord'], ['09:10', 'demo.additions.scroll.colorRecord'], ['09:20', 'demo.additions.scroll.iconRecord'], ['09:30', 'demo.additions.scroll.copyRecord'],
  ['09:40', 'demo.additions.scroll.imageRecord'], ['09:50', 'demo.additions.scroll.spacingRecord'], ['10:00', 'demo.additions.scroll.mobileRecord'], ['10:10', 'demo.additions.scroll.finalRecord'],
] as const;

export function PrependScrollAnchorDemo() {
  const { t } = useLocale();
  const id = useId();
  const [visibleCount, setVisibleCount] = useState(4);
  const viewport = useRef<HTMLDivElement | null>(null);
  const beforeInsert = useRef<{ height: number; top: number } | null>(null);
  const allLoaded = visibleCount === RECORDS.length;

  useLayoutEffect(() => {
    const node = viewport.current;
    const before = beforeInsert.current;
    if (!node || !before) return;
    node.scrollTop = before.top + node.scrollHeight - before.height;
    beforeInsert.current = null;
  }, [visibleCount]);

  return <div className="scroll-demo"><div className="sc-anchor-frame">
    <button className="sc-anchor-earlier" type="button" aria-controls={id} aria-disabled={allLoaded} onClick={() => {
      const node = viewport.current;
      if (allLoaded || !node) return;
      beforeInsert.current ??= {
        height: node.scrollHeight,
        top: Math.max(0, Math.min(node.scrollTop, node.scrollHeight - node.clientHeight)),
      };
      setVisibleCount(count => Math.min(RECORDS.length, count + 2));
    }}><History size={16} aria-hidden="true" />{t('demo.additions.scroll.earlierHistory')}</button>
    <div id={id} className="sc-pane-viewport sc-anchor-viewport" role="region" aria-label={t('demo.additions.scroll.editingHistory')} tabIndex={0} ref={viewport}>
      <ol className="sc-pane-list sc-anchor-list">{RECORDS.slice(-visibleCount).map(([time, text]) => <li key={time}>
        <time dateTime={`2026-10-18T${time}`}>{time}</time><span>{t(text)}</span>
      </li>)}</ol>
    </div>
  </div></div>;
}
