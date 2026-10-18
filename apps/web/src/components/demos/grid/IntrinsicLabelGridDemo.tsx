import { useId, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

const labelKeys = {
  name: 'demo.additions.grid.name',
  project: 'demo.additions.grid.projectName',
  spaceProject: 'demo.additions.grid.spaceProjectName',
} as const;
type LabelId = keyof typeof labelKeys;

export function IntrinsicLabelGridDemo() {
  const { t } = useLocale();
  const [label, setLabel] = useState<LabelId>('name');
  const id = useId();

  return <div className="grid-demo gr-label-demo">
    <div className="gr-label-scene">
      <dl id={id} className="gr-label-grid" aria-label={t('demo.additions.grid.spaceInformation')}>
        <dt>{t(labelKeys[label])}</dt><dd>{t('demo.additions.grid.gardenStudio')}</dd>
        <dt>{t('demo.additions.grid.location')}</dt><dd>{t('demo.additions.grid.seongsuLocation')}</dd>
        <dt>{t('demo.additions.grid.owner')}</dt><dd>{t('demo.additions.grid.designTeam')}</dd>
      </dl>
    </div>
    <label className="gr-width-control">{t('demo.additions.grid.label')}<select value={label} aria-label={t('demo.additions.grid.firstSpaceTerm')} aria-controls={id} onChange={event => setLabel(event.currentTarget.value as LabelId)}>
      {Object.entries(labelKeys).map(([value, key]) => <option key={value} value={value}>{t(key)}</option>)}
    </select></label>
  </div>;
}
