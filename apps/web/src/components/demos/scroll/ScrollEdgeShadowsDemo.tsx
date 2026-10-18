import { useLocale } from '../../../i18n/LocaleContext';
import { FileText } from 'lucide-react';

const DOCUMENTS = ['demo.additions.scroll.briefFile', 'demo.additions.scroll.styleGuideFile', 'demo.additions.scroll.componentsFile', 'demo.additions.scroll.illustrationFile', 'demo.additions.scroll.brandFile', 'demo.additions.scroll.releaseFile'] as const;

export function ScrollEdgeShadowsDemo() {
  const { t } = useLocale();
  return <div className="scroll-demo">
    <div className="sc-shadow-frame"><div className="sc-shadow-viewport" role="region" aria-label={t('demo.additions.scroll.documentList')} tabIndex={0}>
      <ul className="sc-document-list">{DOCUMENTS.map(name => <li key={name}>
        <FileText size={18} aria-hidden="true" /><span>{t(name)}</span>
      </li>)}</ul>
    </div></div>
  </div>;
}
