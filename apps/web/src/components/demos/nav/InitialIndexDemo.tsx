import { useLocale } from '../../../i18n/LocaleContext';

import { useId, useRef } from 'react';

const GROUPS = [
  { initial: 'demo.additions.nav.index.g', names: ['demo.additions.nav.index.garam', 'demo.additions.nav.index.goeun', 'demo.additions.nav.index.gureum'] },
  { initial: 'demo.additions.nav.index.n', names: ['demo.additions.nav.index.narae', 'demo.additions.nav.index.noeul', 'demo.additions.nav.index.nuri'] },
  { initial: 'demo.additions.nav.index.d', names: ['demo.additions.nav.index.daon', 'demo.additions.nav.index.dodam', 'demo.additions.nav.index.duri'] },
] as const;

export function InitialIndexDemo() {
  const { t } = useLocale();
  const id = useId();
  const viewport = useRef<HTMLDivElement>(null);

  function jump(index: number) {
    const root = viewport.current;
    const heading = root?.querySelectorAll('h4')[index];
    if (!root || !heading) return;
    const top = heading.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop;
    root.scrollTo({ top, behavior: 'instant' });
    heading.focus({ preventScroll: true });
  }

  return <div className="nav-demo"><div className="nd-index-shell">
    <nav aria-label={t('demo.additions.nav.index.navigation')}><ul className="nd-index-links">{GROUPS.map(({ initial }, index) => <li key={initial}><a href={`#${id}-${index}`} aria-label={t('demo.additions.nav.index.jump', { initial: t(initial) })} onClick={event => { event.preventDefault(); jump(index); }}>{t(initial)}</a></li>)}</ul></nav>
    <div className="nd-index-frame"><div ref={viewport} className="nd-index-viewport" role="region" aria-label={t('demo.additions.nav.index.region')} tabIndex={0}>
      {GROUPS.map(({ initial, names }, index) => <section key={initial} aria-labelledby={`${id}-${index}`}><h4 id={`${id}-${index}`} tabIndex={-1}>{t(initial)}</h4><ul>{names.map(name => <li key={name}>{t(name)}</li>)}</ul></section>)}
    </div></div>
  </div></div>;
}
