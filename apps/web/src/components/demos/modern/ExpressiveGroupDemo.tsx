import { useId, useState } from 'react';
import { AlignCenter, AlignLeft, AlignRight } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

const ALIGNMENTS = [
  { value: 'flex-start', labelKey: 'demo.additions.modern.alignment.left', actionKey: 'demo.additions.modern.alignment.leftAction', previewKey: 'demo.additions.modern.alignment.leftPreview', Icon: AlignLeft },
  { value: 'center', labelKey: 'demo.additions.modern.alignment.center', actionKey: 'demo.additions.modern.alignment.centerAction', previewKey: 'demo.additions.modern.alignment.centerPreview', Icon: AlignCenter },
  { value: 'flex-end', labelKey: 'demo.additions.modern.alignment.right', actionKey: 'demo.additions.modern.alignment.rightAction', previewKey: 'demo.additions.modern.alignment.rightPreview', Icon: AlignRight },
] as const;

export function ExpressiveGroupDemo() {
  const { t } = useLocale();
  const [selected, setSelected] = useState(0);
  const id = useId();
  return (
    <div className="modern-demo md-expressive-demo">
      <div id={id} className="md-alignment-preview" role="img" aria-label={t(ALIGNMENTS[selected].previewKey)} style={{ alignItems: ALIGNMENTS[selected].value }}>
        {[80, 100, 68, 90].map((width, index) => <span key={index} style={{ width: `${width}%` }} aria-hidden="true" />)}
      </div>
      <div className="md-expressive-group" role="group" aria-label={t('demo.additions.modern.alignment.group')}>
        {ALIGNMENTS.map(({ labelKey, actionKey, Icon }, index) => (
          <button type="button" key={labelKey} aria-label={t(actionKey)} aria-pressed={selected === index} aria-controls={id} onClick={() => setSelected(index)}>
            <Icon size={18} aria-hidden="true" />
            <span>{t(labelKey)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
