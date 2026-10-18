import { useLayoutEffect, useRef, useState } from 'react';
import { BellPlus, TriangleAlert, X } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

export function DismissibleBannerDemo() {
  const { t } = useLocale();
  const [visible, setVisible] = useState(true);
  const closeButton = useRef<HTMLButtonElement>(null);
  const restoreButton = useRef<HTMLButtonElement>(null);
  const changed = useRef(false);
  useLayoutEffect(() => {
    if (changed.current) (visible ? closeButton.current : restoreButton.current)?.focus();
  }, [visible]);
  const toggle = () => { changed.current = true; setVisible(value => !value); };
  return <div className="feedback-demo fd-banner-demo">
    <div className="fd-banner-frame">{visible ? <div className="fd-inline-banner">
      <TriangleAlert size={20} aria-hidden="true" />
      <p className="fd-banner-copy" role="status">{t('demo.additions.feedback.bannerCopy')}</p>
      <button type="button" className="fd-banner-close" ref={closeButton} aria-label={t('demo.additions.feedback.dismissNotice')} onClick={toggle}><X size={16} aria-hidden="true" /></button>
    </div> : <button type="button" className="fd-banner-restore" ref={restoreButton} aria-label={t('demo.additions.feedback.restoreNotice')} onClick={toggle}><BellPlus size={20} aria-hidden="true" /></button>}</div>
  </div>;
}
