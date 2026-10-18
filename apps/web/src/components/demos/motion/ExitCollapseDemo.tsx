import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Undo2, X } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

export function ExitCollapseDemo() {
  const { t } = useLocale();
  const [phase, setPhase] = useState<'visible' | 'leaving' | 'removed'>('visible');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const remaining = useRef<HTMLLIElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const restoreFocus = useRef(false);
  useEffect(() => () => { if (timer.current !== null) clearTimeout(timer.current); }, []);
  useLayoutEffect(() => {
    if (phase === 'visible' && restoreFocus.current) { restoreFocus.current = false; closeButton.current?.focus(); }
  }, [phase]);
  const dismiss = () => {
    if (phase !== 'visible') return;
    remaining.current?.focus();
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setPhase('removed');
      return;
    }
    setPhase('leaving');
    timer.current = setTimeout(() => { timer.current = null; setPhase('removed'); }, 250);
  };
  return <div className="motion-demo">
    <div className="md-dismiss-frame">
      <ul className="md-dismiss-list" aria-label={t('demo.additions.motion.todayTasks')}>
        {phase !== 'removed' && <li className="md-dismiss-slot" data-leaving={phase === 'leaving'} aria-hidden={phase === 'leaving'}>
          <div className="md-dismiss-row"><strong>{t('demo.additions.motion.teamMeeting')}</strong><button type="button" className="md-dismiss-close" ref={closeButton} aria-label={t('demo.additions.motion.closeMeeting')} aria-disabled={phase === 'leaving'} tabIndex={phase === 'leaving' ? -1 : 0} onClick={dismiss}><X size={16} aria-hidden="true" /></button></div>
        </li>}
        <li className="md-dismiss-stay" ref={remaining} tabIndex={-1}>{t('demo.additions.motion.projectCleanup')}</li>
      </ul>
      {phase === 'removed' && <button type="button" className="md-dismiss-undo" onClick={() => { restoreFocus.current = true; setPhase('visible'); }}><Undo2 size={16} aria-hidden="true" />{t('demo.additions.motion.undo')}</button>}
    </div>
  </div>;
}
