import { useLocale } from '../../../i18n/LocaleContext';
import { useId, useState } from 'react';
import { FileCode2, FileImage, FileText, Grid2X2, List } from 'lucide-react';

const FILES = [
  { id: 'cover', name: 'demo.additions.panel.cover', format: 'demo.additions.panel.svg', Icon: FileImage },
  { id: 'poster', name: 'demo.additions.panel.poster', format: 'demo.additions.panel.png', Icon: FileImage },
  { id: 'guide', name: 'demo.additions.panel.guide', format: 'demo.additions.panel.pdf', Icon: FileText },
  { id: 'card', name: 'demo.additions.panel.card', format: 'demo.additions.panel.tsx', Icon: FileCode2 },
] as const;

export function FileViewModeDemo() {
  const { t } = useLocale();
  const [view, setView] = useState<'list' | 'grid'>('list');
  const id = useId();

  return <div className="panel-demo">
    <div className="pn-file-view-frame">
      <div className="pn-file-view-controls" role="group" aria-label={t('demo.additions.panel.fileViewMode')}>
        <button className="pn-file-view-mode" type="button" aria-label={t('demo.additions.panel.listView')} aria-pressed={view === 'list'} aria-controls={id} onClick={() => setView('list')}><List size={16} aria-hidden="true" />{t('demo.additions.panel.list')}</button>
        <button className="pn-file-view-mode" type="button" aria-label={t('demo.additions.panel.gridView')} aria-pressed={view === 'grid'} aria-controls={id} onClick={() => setView('grid')}><Grid2X2 size={16} aria-hidden="true" />{t('demo.additions.panel.grid')}</button>
      </div>
      <ul id={id} className="pn-file-view-items" data-view={view} aria-label={t('demo.additions.panel.designFiles')}>
        {FILES.map(file => <li key={file.id}><file.Icon size={32} aria-hidden="true" /><span className="pn-file-view-info"><strong>{t(file.name)}</strong><span>{t(file.format)}</span></span></li>)}
      </ul>
    </div>
  </div>;
}
