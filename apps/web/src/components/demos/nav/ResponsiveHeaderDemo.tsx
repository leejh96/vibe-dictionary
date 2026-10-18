import { useLocale } from '../../../i18n/LocaleContext';

import { useId, useRef, useState } from 'react';
import { Menu, Shapes, X } from 'lucide-react';

const SECTIONS = ['demo.additions.nav.header.work', 'demo.additions.nav.header.about', 'demo.additions.nav.header.contact'] as const;

export function ResponsiveHeaderDemo() {
  const { t } = useLocale();
  const [active, setActive] = useState(0);
  const id = useId();
  const disclosure = useRef<HTMLDetailsElement>(null);

  function closeMenu(returnFocus: boolean) {
    if (!disclosure.current) return;
    disclosure.current.open = false;
    if (returnFocus) disclosure.current.querySelector('summary')?.focus();
  }

  function items(compact: boolean) {
    return SECTIONS.map((label, index) => <li key={label}><button type="button" aria-controls={`${id}-page`} aria-current={active === index ? 'page' : undefined} onClick={() => { setActive(index); if (compact) closeMenu(true); }}>{t(label)}</button></li>);
  }

  return <div className="nav-demo"><div className="nd-header-shell"><div className="nd-header-frame">
    <header className="nd-responsive-header">
      <span className="nd-header-brand" role="img" aria-label={t('demo.additions.nav.header.studio')}><Shapes size={20} aria-hidden="true" /></span>
      <nav className="nd-header-wide" aria-label={t('demo.additions.nav.header.navigation')}><ul>{items(false)}</ul></nav>
      <details className="nd-header-compact" ref={disclosure} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) closeMenu(false); }} onKeyDown={event => { if (event.key === 'Escape' && event.currentTarget.open) { event.preventDefault(); closeMenu(true); } }}>
        <summary aria-controls={`${id}-menu`}><Menu className="nd-header-menu-icon" size={20} aria-hidden="true" /><X className="nd-header-close-icon" size={20} aria-hidden="true" /><span className="sr-only">{t('demo.additions.nav.header.menu')}</span></summary>
        <nav aria-label={t('demo.additions.nav.header.navigation')}><ul id={`${id}-menu`}>{items(true)}</ul></nav>
      </details>
    </header>
    <div className="nd-header-page" id={`${id}-page`} role="region" aria-label={t('demo.additions.nav.header.page', { destination: t(SECTIONS[active]) })}>
      <svg viewBox="0 0 240 120" role="img" aria-label={t((['demo.additions.nav.header.workArtwork', 'demo.additions.nav.header.aboutArtwork', 'demo.additions.nav.header.contactArtwork'] as const)[active])}>
        <g aria-hidden="true">
          {active === 0 ? [0, 1, 2].map(index => <g key={index} transform={`translate(${index * 80},0)`}><rect x="4" y="12" width="72" height="96" rx="9" /><path d={`M12 ${82 - index * 12}L36 40L68 92M16 24H46`} /></g>) : active === 1 ? <><circle cx="62" cy="54" r="28" /><path d="M36 98C36 72 88 72 88 98M116 34H220M116 56H196M116 78H212" /></> : <><rect x="30" y="24" width="180" height="76" rx="12" /><path d="M32 30L120 74L208 30M34 94L90 60M206 94L150 60" /></>}
        </g>
      </svg>
    </div>
  </div></div></div>;
}
