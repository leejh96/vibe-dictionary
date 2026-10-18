import { useLocale } from '../../../i18n/LocaleContext';
import { useId } from 'react';

const COLOR_GROUPS = [
  { name: 'demo.additions.scroll.warm', colors: [['demo.additions.scroll.coral', '#F97360'], ['demo.additions.scroll.amber', '#F5AD36'], ['demo.additions.scroll.rose', '#E85A8A'], ['demo.additions.scroll.terracotta', '#BB7055']] },
  { name: 'demo.additions.scroll.cool', colors: [['demo.additions.scroll.sky', '#52A7E8'], ['demo.additions.scroll.mint', '#46B89B'], ['demo.additions.scroll.lavender', '#9984D7'], ['demo.additions.scroll.indigo', '#6068C9']] },
  { name: 'demo.additions.scroll.neutral', colors: [['demo.additions.scroll.ivory', '#EDE9DF'], ['demo.additions.scroll.mist', '#B8C0CA'], ['demo.additions.scroll.slate', '#64748B'], ['demo.additions.scroll.charcoal', '#334155']] },
] as const;

export function StickyGroupHeadersDemo() {
  const { t } = useLocale();
  const id = useId();

  return <div className="scroll-demo">
    <div className="sc-group-frame"><div className="sc-group-viewport" role="region" aria-label={t('demo.additions.scroll.swatchList')} tabIndex={0}>
      {COLOR_GROUPS.map((group, index) => <section className="sc-color-group" aria-labelledby={`${id}-group-${index}`} key={group.name}>
        <h3 id={`${id}-group-${index}`} className="sc-group-heading">{t(group.name)}</h3>
        <ul className="sc-color-list">
          {group.colors.map(([name, value]) => <li key={name}>
            <span className="sc-color-swatch" style={{ backgroundColor: value }} aria-hidden="true" />
            <span className="sc-color-name">{t(name)}</span>
            <code>{value}</code>
          </li>)}
        </ul>
      </section>)}
    </div></div>
  </div>;
}
