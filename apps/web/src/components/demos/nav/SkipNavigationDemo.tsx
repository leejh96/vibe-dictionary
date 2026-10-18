import { useId, useRef, useState } from 'react';
import { CornerDownRight } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

const ARTICLES = [
  { name: 'demo.additions.nav.skip.color', title: 'demo.additions.nav.skip.colorTitle', artwork: 'demo.additions.nav.skip.colorArtwork' },
  { name: 'demo.additions.nav.skip.type', title: 'demo.additions.nav.skip.typeTitle', artwork: 'demo.additions.nav.skip.typeArtwork' },
  { name: 'demo.additions.nav.skip.spacing', title: 'demo.additions.nav.skip.spacingTitle', artwork: 'demo.additions.nav.skip.spacingArtwork' },
] as const;

export function SkipNavigationDemo() {
  const { t } = useLocale();
  const [active, setActive] = useState(0);
  const id = useId();
  const heading = useRef<HTMLHeadingElement>(null);
  const article = ARTICLES[active];

  return <div className="nav-demo"><div className="nd-skip-frame">
    <div className="nd-skip-bar"><a className="nd-skip-link" href={`#${id}-content`} onClick={event => { event.preventDefault(); heading.current?.focus({ preventScroll: true }); }}><CornerDownRight size={18} aria-hidden="true" />{t('demo.additions.nav.skip.link')}</a></div>
    <nav className="nd-skip-nav" aria-label={t('demo.additions.nav.skip.navigation')}><ul>{ARTICLES.map(({ name }, index) => <li key={name}><button type="button" aria-current={active === index ? 'page' : undefined} aria-controls={`${id}-article`} onClick={() => setActive(index)}>{t(name)}</button></li>)}</ul></nav>
    <article id={`${id}-article`} className="nd-skip-article" aria-labelledby={`${id}-content`}>
      <h4 id={`${id}-content`} ref={heading} tabIndex={-1}>{t(article.title)}</h4>
      <svg viewBox="0 0 240 72" role="img" aria-label={t(article.artwork)}><g aria-hidden="true">
        {active === 0 ? <><circle cx="88" cy="36" r="29" opacity=".35" /><circle cx="120" cy="36" r="29" opacity=".6" /><circle cx="152" cy="36" r="29" opacity=".85" /></> : active === 1 ? <><text x="38" y="52" fontSize="26">{t('demo.additions.nav.sample.upperA')}</text><text x="94" y="52" fontSize="40">{t('demo.additions.nav.sample.lowerA')}</text><text x="158" y="52" fontSize="56">{t('demo.additions.nav.sample.upperA')}</text></> : [0, 1, 2, 3].map(index => <rect key={index} x={30 + index * 48} y="14" width="36" height="44" rx="7" opacity={.3 + index * .2} />)}
      </g></svg>
    </article>
  </div></div>;
}
