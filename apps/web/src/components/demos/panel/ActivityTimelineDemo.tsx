import { useLocale } from '../../../i18n/LocaleContext';
import { useId, useState } from 'react';
import { ChevronDown, Circle } from 'lucide-react';

const ACTIVITY = [
  { id: 'cover', time: '10:24', text: 'demo.additions.panel.coverAdded' },
  { id: 'color', time: '10:05', text: 'demo.additions.panel.colorChanged' },
  { id: 'feedback', time: '09:42', text: 'demo.additions.panel.feedbackWritten' },
  { id: 'document', time: '09:10', text: 'demo.additions.panel.documentCreated' },
] as const;

export function ActivityTimelineDemo() {
  const { t } = useLocale();
  const [showEarlier, setShowEarlier] = useState(false);
  const id = useId();

  return <div className="panel-demo">
    <div className="pn-activity-frame">
      <ol id={id} className="pn-activity-list" aria-label={t('demo.additions.panel.activityHistory')} aria-live="polite" aria-relevant="additions">
        {ACTIVITY.slice(0, showEarlier ? ACTIVITY.length : 2).map(event => <li key={event.id}>
          <time dateTime={`2026-10-18T${event.time}`}>{event.time}</time>
          <span className="pn-activity-marker" aria-hidden="true"><Circle size={12} /></span>
          <span>{t(event.text)}</span>
        </li>)}
      </ol>
      <button className="pn-activity-earlier" type="button" aria-controls={id} aria-disabled={showEarlier} onClick={() => { if (!showEarlier) setShowEarlier(true); }}><ChevronDown size={16} aria-hidden="true" />{t('demo.additions.panel.earlierActivity')}</button>
    </div>
  </div>;
}
