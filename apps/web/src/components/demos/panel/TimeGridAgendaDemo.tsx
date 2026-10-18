import { useId, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

const DAYS = [
  { date: '2026-10-19', label: 'demo.additions.panel.oct19', events: [{ id: 'review', name: 'demo.additions.panel.review', start: 9, end: 10 }, { id: 'feedback', name: 'demo.additions.panel.feedback', start: 11, end: 12 }] },
  { date: '2026-10-20', label: 'demo.additions.panel.oct20', events: [{ id: 'prototype', name: 'demo.additions.panel.prototype', start: 10, end: 12 }] },
  { date: '2026-10-21', label: 'demo.additions.panel.oct21', events: [{ id: 'icons', name: 'demo.additions.panel.iconWork', start: 9, end: 11 }, { id: 'share', name: 'demo.additions.panel.share', start: 11, end: 12 }] },
] as const;

const timeText = (hour: number) => `${String(hour).padStart(2, '0')}:00`;

export function TimeGridAgendaDemo() {
  const { t } = useLocale();
  const [dayIndex, setDayIndex] = useState(0);
  const id = useId();
  const day = DAYS[dayIndex];

  return <div className="panel-demo">
    <div className="pn-agenda-frame">
      <div className="pn-agenda-navigation">
        <button type="button" aria-label={t('demo.additions.panel.previousDay')} aria-controls={id} aria-disabled={dayIndex === 0} onClick={() => setDayIndex(previous => Math.max(0, previous - 1))}><ChevronLeft size={16} aria-hidden="true" /></button>
        <time dateTime={day.date} aria-live="polite" aria-atomic="true">{t(day.label)}</time>
        <button type="button" aria-label={t('demo.additions.panel.nextDay')} aria-controls={id} aria-disabled={dayIndex === DAYS.length - 1} onClick={() => setDayIndex(previous => Math.min(DAYS.length - 1, previous + 1))}><ChevronRight size={16} aria-hidden="true" /></button>
      </div>
      <div className="pn-agenda-body">
        <div className="pn-agenda-hours">{[9, 10, 11, 12].map((hour, index) => <time key={hour} style={{ top: `${index * 44}px` }} dateTime={`${day.date}T${timeText(hour)}`}>{timeText(hour)}</time>)}</div>
        <ol id={id} className="pn-agenda-events" aria-label={t('demo.additions.panel.dayAgenda', { date: t(day.label) })}>{day.events.map(event => <li key={event.id} style={{ top: `${(event.start - 9) * 44 + 2}px`, height: `${(event.end - event.start) * 44 - 4}px` }}>
          <strong>{t(event.name)}</strong>
          <span><time dateTime={`${day.date}T${timeText(event.start)}`}>{timeText(event.start)}</time>–<time dateTime={`${day.date}T${timeText(event.end)}`}>{timeText(event.end)}</time></span>
        </li>)}</ol>
      </div>
    </div>
  </div>;
}
