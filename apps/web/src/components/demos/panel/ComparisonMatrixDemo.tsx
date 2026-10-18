import { useLocale } from '../../../i18n/LocaleContext';
import { useId, useState } from 'react';
import { ArrowLeftRight, Check, Minus } from 'lucide-react';

const COMPARISON = {
  features: ['demo.additions.panel.share', 'demo.additions.panel.export', 'demo.additions.panel.history'],
  plans: ['demo.additions.panel.basic', 'demo.additions.panel.pro'],
  cells: [[true, true], [false, true], [false, true]],
} as const;

export function ComparisonMatrixDemo() {
  const { t } = useLocale();
  const [transposed, setTransposed] = useState(false);
  const id = useId();
  const columns = transposed ? COMPARISON.features : COMPARISON.plans;
  const rows = transposed ? COMPARISON.plans : COMPARISON.features;

  return <div className="panel-demo">
    <div className="pn-matrix-frame">
      <button className="pn-matrix-transpose" type="button" aria-label={t('demo.additions.panel.swapComparisonAxes')} aria-pressed={transposed} aria-controls={id} onClick={() => setTransposed(previous => !previous)}><ArrowLeftRight size={16} aria-hidden="true" />{t('demo.additions.panel.swapAxes')}</button>
      <table id={id} className="pn-matrix-table" aria-label={t('demo.additions.panel.planComparison')}>
        <thead><tr><th scope="col">{t(transposed ? 'demo.additions.panel.plan' : 'demo.additions.panel.feature')}</th>{columns.map(column => <th key={column} scope="col">{t(column)}</th>)}</tr></thead>
        <tbody>{rows.map((row, rowIndex) => <tr key={row}>
          <th scope="row">{t(row)}</th>
          {columns.map((column, columnIndex) => {
            const included = transposed ? COMPARISON.cells[columnIndex][rowIndex] : COMPARISON.cells[rowIndex][columnIndex];
            const Icon = included ? Check : Minus;
            return <td key={column}><span className="pn-matrix-value" data-included={included}><Icon size={16} aria-hidden="true" /><span className="sr-only">{t(included ? 'demo.additions.panel.included' : 'demo.additions.panel.notIncluded')}</span></span></td>;
          })}
        </tr>)}</tbody>
      </table>
    </div>
  </div>;
}
