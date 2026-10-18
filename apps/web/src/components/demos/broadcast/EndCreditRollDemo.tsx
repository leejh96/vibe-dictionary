import { useId, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

const CREDITS = [
  ['demo.additions.broadcast.creditDirection', 'demo.additions.broadcast.creditName1'],
  ['demo.additions.broadcast.creditCamera', 'demo.additions.broadcast.creditName2'],
  ['demo.additions.broadcast.creditLighting', 'demo.additions.broadcast.creditName3'],
  ['demo.additions.broadcast.creditEditing', 'demo.additions.broadcast.creditName4'],
  ['demo.additions.broadcast.creditMusic', 'demo.additions.broadcast.creditName5'],
] as const;

export function EndCreditRollDemo() {
  const { t } = useLocale();
  const viewportId = useId();
  const [paused, setPaused] = useState(false);
  const Icon = paused ? Play : Pause;

  return <div className="broadcast-demo">
    <div className="bc-credit-frame" data-paused={paused}>
      <div className="bc-credit-viewport" id={viewportId} role="region" aria-label={t('demo.additions.broadcast.creditScene')}>
        <dl className="bc-credit-track">
          {CREDITS.map(([role, name]) => <div className="bc-credit-row" key={role}><dt>{t(role)}</dt><dd>{t(name)}</dd></div>)}
        </dl>
      </div>
      <button type="button" className="bc-credit-control" aria-label={t(paused ? 'demo.additions.broadcast.creditResume' : 'demo.additions.broadcast.creditPause')} aria-controls={viewportId} onClick={() => setPaused(value => !value)}>
        <Icon size={18} aria-hidden="true" />
      </button>
    </div>
  </div>;
}
