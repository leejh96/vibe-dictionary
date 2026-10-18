import { useLocale } from '../../../i18n/LocaleContext';

import { useId, useState } from 'react';
import { Bookmark, Images, UserRound } from 'lucide-react';

const DESTINATIONS = [
  { label: 'demo.additions.nav.bottom.gallery', Icon: Images },
  { label: 'demo.additions.nav.bottom.saved', Icon: Bookmark },
  { label: 'demo.additions.nav.bottom.profile', Icon: UserRound },
] as const;

export function BottomNavigationDemo() {
  const { t } = useLocale();
  const [active, setActive] = useState(0);
  const id = useId();

  return <div className="nav-demo"><div className="nd-bottom-frame">
    <div id={id} className="nd-bottom-page" role="region" aria-label={t('demo.additions.nav.bottom.page', { destination: t(DESTINATIONS[active].label) })}>
      <svg className="nd-bottom-art" viewBox="0 0 240 88" role="img" aria-label={t((['demo.additions.nav.bottom.galleryArtwork', 'demo.additions.nav.bottom.savedArtwork', 'demo.additions.nav.bottom.profileArtwork'] as const)[active])}>
        <g aria-hidden="true">
          {active === 0 ? [0, 1, 2, 3].map(index => <g key={index} transform={`translate(${index * 60},0)`}><rect x="3" y="8" width="54" height="72" rx="9" /><circle cx="41" cy="25" r="6" /><path d="M8 66L24 43L35 55L44 43L53 66Z" /></g>) : active === 1 ? [0, 1].map(index => <g key={index} transform={`translate(0,${index * 42})`}><rect x="6" y="4" width="228" height="36" rx="8" /><path d="M18 12H38V32L28 26L18 32Z" /><path d="M52 17H206M52 27H160" /></g>) : <><circle cx="54" cy="44" r="32" /><circle cx="54" cy="35" r="10" /><path d="M35 65C35 46 73 46 73 65M104 24H216M104 44H192M104 64H204" /></>}
        </g>
      </svg>
    </div>
    <nav className="nd-bottom-nav" aria-label={t('demo.additions.nav.bottom.navigation')}><ul>
      {DESTINATIONS.map(({ label, Icon }, index) => <li key={label}><button type="button" aria-controls={id} aria-current={active === index ? 'page' : undefined} onClick={() => setActive(index)}><span className="nd-bottom-icon"><Icon size={20} aria-hidden="true" /></span><span>{t(label)}</span></button></li>)}
    </ul></nav>
  </div></div>;
}
