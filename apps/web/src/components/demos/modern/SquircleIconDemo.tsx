import { Sparkles } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

export function SquircleIconDemo() {
  const { t } = useLocale();
  return (
    <div className="modern-demo">
      <div className="md-squircle-icon" role="img" aria-label={t('demo.additions.modern.squircle.image')}>
        <div className="md-squircle-inset" aria-hidden="true">
          <Sparkles size={42} strokeWidth={1.6} />
        </div>
      </div>
    </div>
  );
}
