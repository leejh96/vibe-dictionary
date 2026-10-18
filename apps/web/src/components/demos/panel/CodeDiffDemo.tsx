import { useLocale } from '../../../i18n/LocaleContext';
import { useId, useState } from 'react';
import { AlignLeft, Minus, Plus } from 'lucide-react';

const LINES = [
  { id: 'open', kind: 'context', text: '.card {' },
  { id: 'before', kind: 'removed', text: '  gap: 8px;' },
  { id: 'after', kind: 'added', text: '  gap: 12px;' },
  { id: 'close', kind: 'context', text: '}' },
] as const;

export function CodeDiffDemo() {
  const { t } = useLocale();
  const [showContext, setShowContext] = useState(true);
  const id = useId();

  return <div className="panel-demo">
    <div className="pn-diff-frame">
      <button className="pn-diff-context" type="button" aria-pressed={showContext} aria-controls={id} onClick={() => setShowContext(previous => !previous)}><AlignLeft size={16} aria-hidden="true" />{t('demo.additions.panel.showContext')}</button>
      <pre id={id} className="pn-diff-content" role="region" aria-label={t('demo.additions.panel.codeChanges')}><code>{LINES.filter(line => showContext || line.kind !== 'context').map(line => {
        const Tag = line.kind === 'removed' ? 'del' : line.kind === 'added' ? 'ins' : 'span';
        return <span key={line.id} className="pn-diff-line" data-kind={line.kind}>
          <span className="pn-diff-sign" aria-hidden="true">{line.kind === 'removed' ? <Minus size={12} /> : line.kind === 'added' ? <Plus size={12} /> : null}</span>
          {line.kind !== 'context' && <span className="sr-only">{t(line.kind === 'removed' ? 'demo.additions.panel.removedPrefix' : 'demo.additions.panel.addedPrefix')}</span>}
          <Tag>{line.text}</Tag>
        </span>;
      })}</code></pre>
    </div>
  </div>;
}
