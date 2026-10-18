import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function RosetteDemo() {
  const { t } = useLocale();
  const id = useId();
  return <div className="graphic-demo">
    <svg className="gd-rosette-canvas" viewBox="0 0 240 112" role="img" aria-label={t('demo.additions.graphic.rosetteImage')}>
      <defs><path id={id} d="M0-4 C-18-10-16-44 0-48 C16-44 18-10 0-4Z" /></defs>
      <g className="gd-rosette-petals" transform="translate(120 56)">
        {Array.from({ length: 12 }, (_, index) => <use key={index} href={`#${id}`} transform={`rotate(${index * 30})`} />)}
      </g>
      <circle className="gd-rosette-core" cx={120} cy={56} r={5} />
    </svg>
  </div>;
}
