import { useLocale } from '../../../i18n/LocaleContext';
import type { CSSProperties } from 'react';

const GROUPS = ([
  { label: 'demo.additions.infographic.treemap.product', children: [{ label: 'demo.additions.infographic.treemap.web', value: 40 }, { label: 'demo.additions.infographic.treemap.app', value: 20 }] },
  { label: 'demo.additions.infographic.treemap.support', children: [{ label: 'demo.additions.infographic.treemap.docs', value: 25 }, { label: 'demo.additions.infographic.treemap.tools', value: 15 }] },
] as const).map(group => ({ ...group, total: group.children.reduce((sum, leaf) => sum + leaf.value, 0) }));
const TOTAL = GROUPS.reduce((sum, group) => sum + group.total, 0);

export function TreemapAreaDemo() {
  const { t } = useLocale();
  return (
    <div className="infographic-demo">
      <div className="ig-treemap" role="img" aria-label={t('demo.additions.infographic.treemap.chart', { total: TOTAL, description: GROUPS.map(group => t('demo.additions.infographic.treemap.group', { label: t(group.label), value: group.total, children: group.children.map(leaf => t('demo.additions.infographic.treemap.item', { label: t(leaf.label), value: leaf.value })).join(', ') })).join('; ') })}>
        <div className="ig-treemap-groups" aria-hidden="true">
          {GROUPS.map((group, groupIndex) => {
            return <div className="ig-treemap-group" key={group.label} style={{ width: `${group.total / TOTAL * 100}%` }}>
              <div className="ig-treemap-heading"><span>{t(group.label)}</span><span>{group.total}</span></div>
              <div className="ig-treemap-branch">
                {group.children.map((leaf, leafIndex) => <div className="ig-treemap-leaf" key={leaf.label} style={{ height: `${leaf.value / group.total * 100}%`, '--ig-treemap-delay': `${(groupIndex * 2 + leafIndex) * 120}ms` } as CSSProperties}><span>{t(leaf.label)}</span><span>{leaf.value}</span></div>)}
              </div>
            </div>;
          })}
        </div>
      </div>
    </div>
  );
}
