import { useLocale } from '../../../i18n/LocaleContext';
import { useState } from 'react';
import { flushSync } from 'react-dom';
import { FileText } from 'lucide-react';

const ROW_HEIGHT = 46;
const OVERSCAN_ROWS = 12;
const WINDOW_SIZE = 3 + OVERSCAN_ROWS * 2;
const FILES = Array.from({ length: 100 }, (_, index) => index + 1);

export function FixedRowVirtualScrollDemo() {
  const { t } = useLocale();
  const [start, setStart] = useState(0);
  const end = Math.min(FILES.length, start + WINDOW_SIZE);

  return <div className="scroll-demo"><div className="sc-virtual-frame">
    <div className="sc-pane-viewport sc-virtual-viewport" role="region" aria-label={t('demo.additions.scroll.noteScrollList')} tabIndex={0} onScroll={event => {
      const { scrollTop, clientHeight } = event.currentTarget;
      const top = Math.min(Math.max(0, scrollTop), Math.max(0, FILES.length * ROW_HEIGHT - clientHeight));
      const next = Math.max(0, Math.min(FILES.length - WINDOW_SIZE, Math.floor(top / ROW_HEIGHT) - OVERSCAN_ROWS));
      // Scroll events are continuous-priority work. Commit the bounded window
      // before returning, rather than letting native motion outrun React.
      if (next !== start) flushSync(() => setStart(next));
    }}>
      <div aria-hidden="true" style={{ height: start * ROW_HEIGHT }} />
      <ul className="sc-document-list" aria-label={t('demo.additions.scroll.noteFiles')}>
        {FILES.slice(start, end).map((file, index) => <li key={file} aria-setsize={FILES.length} aria-posinset={start + index + 1} style={{ height: ROW_HEIGHT, minHeight: ROW_HEIGHT }}>
          <FileText size={16} aria-hidden="true" /><span>{t('demo.additions.scroll.noteFile', { number: String(file).padStart(3, '0') })}</span>
        </li>)}
      </ul>
      <div aria-hidden="true" style={{ height: (FILES.length - end) * ROW_HEIGHT }} />
    </div>
  </div></div>;
}
