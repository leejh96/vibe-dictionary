import { useLocale } from '../../../i18n/LocaleContext';
import { useId } from 'react';

const COLLECTIONS = [
  { name: 'demo.additions.scroll.forestPosters', kind: 'forest', posters: ['demo.additions.scroll.sunlitForest', 'demo.additions.scroll.mistyForest', 'demo.additions.scroll.eveningForest'] },
  { name: 'demo.additions.scroll.seaPosters', kind: 'sea', posters: ['demo.additions.scroll.morningSea', 'demo.additions.scroll.wavySea', 'demo.additions.scroll.sunsetSea'] },
] as const;

export function NestedCollectionsDemo() {
  const { t } = useLocale();
  const id = useId();

  return <div className="scroll-demo"><div className="sc-collection-frame">
    <div className="sc-collection-viewport" role="region" aria-label={t('demo.additions.scroll.posterCollection')} tabIndex={0}>
      {COLLECTIONS.map((collection, group) => <section key={collection.name}>
        <h3 className="sc-shelf-heading" id={`${id}-shelf-${group}`}>{t(collection.name)}</h3>
        <div className="sc-shelf-viewport" role="region" aria-labelledby={`${id}-shelf-${group}`} tabIndex={0}>
          <ul className="sc-shelf-list">{collection.posters.map((name, index) => <li key={name}>
            <svg className="sc-shelf-art" viewBox="0 0 100 92" role="img" aria-label={t(name)}>
              <g aria-hidden="true">
                <rect x="5" y="5" width="90" height="82" rx="5" />
                <circle cx={70 - index * 16} cy={24 + index * 4} r="10" />
                {collection.kind === 'forest'
                  ? <path d="M12 70 32 28 52 70ZM42 78 64 34 86 78Z" fill="var(--sc-accent)" opacity={0.5 + index * 0.15} />
                  : <g className="sc-shelf-waves" opacity={0.55 + index * 0.15}><path d="M10 52Q30 36 50 52T90 52M10 65Q30 49 50 65T90 65M10 78Q30 62 50 78T90 78" /></g>}
              </g>
            </svg>
          </li>)}</ul>
        </div>
      </section>)}
    </div>
  </div></div>;
}
