import { useLocale } from '../../../i18n/LocaleContext';
import { useState } from 'react';
import { koreanTranslate } from '../../../i18n/messages';
import { ArrowDown, ArrowUp, ArrowUpDown, FileText } from 'lucide-react';

const FILES = [
  { id: 'guide', name: 'demo.additions.panel.guideFile', size: 240 },
  { id: 'sample', name: 'demo.additions.panel.sampleFile', size: 96 },
  { id: 'icon', name: 'demo.additions.panel.icon', size: 128 },
] as const;

type SortKey = 'name' | 'size';

export function SortableTableDemo() {
  const { t } = useLocale();
  const [sort, setSort] = useState<{ key: SortKey; ascending: boolean }>({ key: 'name', ascending: true });
  const rows = [...FILES].sort((a, b) => (sort.key === 'name' ? koreanTranslate(a.name).localeCompare(koreanTranslate(b.name), 'ko') : a.size - b.size) * (sort.ascending ? 1 : -1));

  return <div className="panel-demo">
    <div className="pn-table-frame">
      <table className="pn-sort-table" aria-label={t('demo.additions.panel.fileList')}>
        <thead><tr>{([['name', 'demo.additions.panel.nameColumn'], ['size', 'demo.additions.panel.sizeColumn']] as const).map(([key, label]) => {
          const active = sort.key === key;
          const Icon = active ? (sort.ascending ? ArrowUp : ArrowDown) : ArrowUpDown;
          return <th key={key} scope="col" aria-sort={active ? (sort.ascending ? 'ascending' : 'descending') : undefined}>
            <button type="button" aria-label={t(active && sort.ascending ? 'demo.additions.panel.sortDescending' : 'demo.additions.panel.sortAscending', { column: t(label) })} onClick={() => setSort(previous => ({ key, ascending: previous.key === key ? !previous.ascending : true }))}>
              {t(label)}<Icon size={14} aria-hidden="true" />
            </button>
          </th>;
        })}</tr></thead>
        <tbody>{rows.map(file => <tr key={file.id}>
          <td><span className="pn-file-name"><FileText size={16} aria-hidden="true" />{t(file.name)}</span></td>
          <td>{t('demo.additions.panel.kilobyteValue', { value: file.size })}</td>
        </tr>)}</tbody>
      </table>
    </div>
  </div>;
}
