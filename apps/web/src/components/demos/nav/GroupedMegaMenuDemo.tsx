import { useLocale } from '../../../i18n/LocaleContext';

import { useId, useRef, useState } from 'react';
import { Blocks, ChevronDown, Palette, Rocket, Type } from 'lucide-react';
import { useOutsidePointerDismiss } from '../../../hooks/useOutsidePointerDismiss';

const GROUPS = [
  { name: 'demo.additions.nav.mega.design', items: [{ name: 'demo.additions.nav.mega.color', Icon: Palette }, { name: 'demo.additions.nav.mega.type', Icon: Type }] },
  { name: 'demo.additions.nav.mega.development', items: [{ name: 'demo.additions.nav.mega.structure', Icon: Blocks }, { name: 'demo.additions.nav.mega.deploy', Icon: Rocket }] },
] as const;
const ITEMS = [...GROUPS[0].items, ...GROUPS[1].items];

export function GroupedMegaMenuDemo() {
  const { t } = useLocale();
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState(0);
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useOutsidePointerDismiss(open, root, () => setOpen(false));

  function closeAndFocus() { setOpen(false); trigger.current?.focus(); }

  return <div className="nav-demo"><div ref={root} className="nd-mega-frame" onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }} onKeyDown={event => { if (event.key === 'Escape' && open) { event.preventDefault(); closeAndFocus(); } }}>
    <div className="nd-mega-bar"><button ref={trigger} type="button" aria-expanded={open} aria-controls={`${id}-menu`} onClick={() => setOpen(value => !value)}>{t('demo.additions.nav.mega.resources')}<ChevronDown size={16} aria-hidden="true" /></button></div>
    <nav id={`${id}-menu`} className="nd-mega-panel" aria-label={t('demo.additions.nav.mega.navigation')} hidden={!open}>
      {GROUPS.map((group, groupIndex) => <div key={group.name} role="group" aria-labelledby={`${id}-${groupIndex}`}><span className="nd-mega-group-name" id={`${id}-${groupIndex}`}>{t(group.name)}</span><ul>{group.items.map(({ name, Icon }, itemIndex) => {
        const index = groupIndex * 2 + itemIndex;
        return <li key={name}><button type="button" aria-controls={`${id}-page`} aria-current={selected === index ? 'page' : undefined} onClick={() => { setSelected(index); closeAndFocus(); }}><Icon size={16} aria-hidden="true" /><span>{t(name)}</span></button></li>;
      })}</ul></div>)}
    </nav>
    <div id={`${id}-page`} className="nd-mega-page" role="region" aria-label={t('demo.additions.nav.mega.resource', { destination: t(ITEMS[selected].name) })}>
      <svg viewBox="0 0 240 144" role="img" aria-label={t((['demo.additions.nav.mega.colorArtwork', 'demo.additions.nav.mega.typeArtwork', 'demo.additions.nav.mega.structureArtwork', 'demo.additions.nav.mega.deployArtwork'] as const)[selected])}><g aria-hidden="true">
        {selected === 0 ? [0, 1, 2, 3].map(index => <rect key={index} x={24 + index * 50} y="36" width="42" height="72" rx="12" opacity={.25 + index * .25} />) : selected === 1 ? <text x="120" y="98" textAnchor="middle">{t('demo.additions.nav.sample.aa')}</text> : selected === 2 ? <><path d="M120 58V84M52 84H188M52 84V98M188 84V98" /><rect x="90" y="20" width="60" height="38" rx="8" /><rect x="22" y="98" width="60" height="30" rx="8" /><rect x="158" y="98" width="60" height="30" rx="8" /></> : <><path d="M96 94L92 114L112 110M98 78C112 38 138 26 166 26C166 54 154 80 114 94ZM130 42L150 62M96 64L76 76L98 78M128 96L116 116L114 94" /><circle cx="142" cy="50" r="8" /></>}
      </g></svg>
    </div>
  </div></div>;
}
