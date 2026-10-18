import { useLocale } from '../../../i18n/LocaleContext';
const TASKS = [
  ['demo.additions.scroll.poster', 'demo.additions.scroll.jiyun', '10.18', 'demo.additions.scroll.review'],
  ['demo.additions.scroll.thumbnail', 'demo.additions.scroll.minsu', '10.19', 'demo.additions.scroll.production'],
  ['demo.additions.scroll.banner', 'demo.additions.scroll.seoyeon', '10.20', 'demo.additions.scroll.draft'],
  ['demo.additions.scroll.cover', 'demo.additions.scroll.dohyun', '10.21', 'demo.additions.scroll.review'],
  ['demo.additions.scroll.invitation', 'demo.additions.scroll.jiyun', '10.22', 'demo.additions.scroll.production'],
] as const;

export function FrozenTableDemo() {
  const { t } = useLocale();
  return <div className="scroll-demo">
    <div className="sc-matrix-frame"><div className="sc-matrix-viewport" role="region" aria-label={t('demo.additions.scroll.scheduleRegion')} tabIndex={0}>
      <table className="sc-frozen-table" aria-label={t('demo.additions.scroll.scheduleTable')}>
        <thead><tr>{(['demo.additions.scroll.task', 'demo.additions.scroll.owner', 'demo.additions.scroll.due', 'demo.additions.scroll.stage'] as const).map(name => <th scope="col" key={name}>{t(name)}</th>)}</tr></thead>
        <tbody>{TASKS.map(([task, owner, due, status]) => <tr key={task}>
          <th scope="row">{t(task)}</th><td>{t(owner)}</td><td>{due}</td><td>{t(status)}</td>
        </tr>)}</tbody>
      </table>
    </div></div>
  </div>;
}
