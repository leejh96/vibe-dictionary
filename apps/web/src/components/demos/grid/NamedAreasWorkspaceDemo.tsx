import { useId, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';
import { FileText, Folder, Image } from 'lucide-react';

export function NamedAreasWorkspaceDemo() {
  const { t } = useLocale();
  const [navigation, setNavigation] = useState(true);
  const id = useId();

  return <div className="grid-demo gr-area-demo">
    <div className="gr-area-container">
      <div id={id} className="gr-area-frame" data-navigation={navigation} role="img" aria-label={t(navigation ? 'demo.additions.grid.workspaceWithNavigation' : 'demo.additions.grid.workspaceWithoutNavigation')}>
        <div className="gr-area-header" aria-hidden="true"><span /><span /><span /></div>
        <div className="gr-area-nav" hidden={!navigation} aria-hidden="true"><Folder size={16} /><Image size={16} /><FileText size={16} /></div>
        <div className="gr-area-main" aria-hidden="true"><svg viewBox="0 0 120 64" preserveAspectRatio="none"><path d="M8 48H112M8 32H112M8 16H112" opacity=".15" /><path d="m8 44 20-9 20 5 20-23 20 8 24-14" /></svg></div>
        <div className="gr-area-footer" aria-hidden="true"><span /><span /></div>
      </div>
    </div>
    <label className="gr-navigation-control"><input type="checkbox" checked={navigation} aria-label={t('demo.additions.grid.showNavigation')} aria-controls={id} onChange={event => setNavigation(event.currentTarget.checked)} />{t('demo.additions.grid.navigation')}</label>
  </div>;
}
