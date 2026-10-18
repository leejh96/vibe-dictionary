import { useId, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function SubgridCardsDemo() {
  const { t } = useLocale();
  const [aligned, setAligned] = useState(true);
  const id = useId();

  return <div className="grid-demo gr-subgrid-demo">
    <div id={id} className="gr-subgrid-cards" data-aligned={aligned} role="group" aria-label={t('demo.additions.grid.documentCards')}>
      <article className="gr-subgrid-card">
        <h4>{t('demo.additions.grid.notesTitle')}</h4>
        <p>{t('demo.additions.grid.notesBody')}</p>
        <span className="gr-document-tag">{t('demo.additions.grid.personal')}</span>
      </article>
      <article className="gr-subgrid-card">
        <h4>{t('demo.additions.grid.projectArchive')}</h4>
        <p>{t('demo.additions.grid.archiveBody')}</p>
        <span className="gr-document-tag">{t('demo.additions.grid.shared')}</span>
      </article>
    </div>
    <label className="gr-alignment-control"><input type="checkbox" checked={aligned} aria-label={t('demo.additions.grid.alignCardRows')} aria-controls={id} onChange={event => setAligned(event.currentTarget.checked)} />{t('demo.additions.grid.alignRows')}</label>
  </div>;
}
