import { useLocale } from '../../../i18n/LocaleContext';
import { useId, useState } from 'react';
import { FileText } from 'lucide-react';

const FILES = ['demo.additions.scroll.briefFile', 'demo.additions.scroll.sketchFile', 'demo.additions.scroll.paletteFile', 'demo.additions.scroll.illustrationFile', 'demo.additions.scroll.brandFile', 'demo.additions.scroll.releaseFile', 'demo.additions.scroll.imageFile', 'demo.additions.scroll.styleFile'] as const;

export function StableScrollbarGutterDemo() {
  const { t } = useLocale();
  const id = useId();
  const [showAll, setShowAll] = useState(false);

  return <div className="scroll-demo"><div className="sc-gutter-frame">
    <label className="sc-gutter-control"><input type="checkbox" checked={showAll} aria-label={t('demo.additions.scroll.showFullFiles')} aria-controls={id}
      onChange={event => setShowAll(event.currentTarget.checked)} />{t('demo.additions.scroll.fullList')}</label>
    <div id={id} className="sc-pane-viewport sc-gutter-viewport" role="region" aria-label={t('demo.additions.scroll.stableFileList')} tabIndex={0}>
      <ul className="sc-document-list sc-gutter-list">{FILES.slice(0, showAll ? FILES.length : 2).map(file => <li key={file}>
        <FileText size={18} aria-hidden="true" /><span>{t(file)}</span>
      </li>)}</ul>
    </div>
  </div></div>;
}
