import { useId, useState, type CSSProperties } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';
import { useDemoNumber } from '../../../hooks/useDemoAutoplay';

export function LenticularPosterDemo() {
  const { t } = useLocale();
  const [reveal] = useDemoNumber(0, 0, 100);
  const id = useId();
  return <div className="sc-demo"><svg className="sc-art" viewBox="0 0 280 150" role="img" aria-label={t('demo.showcase.lenticular')}>
    <defs><clipPath id={id}>{Array.from({ length: 28 }, (_, i) => <rect key={i} x={i * 10} y="0" width={reveal / 10} height="150" />)}</clipPath></defs>
    <rect width="280" height="150" fill="#e9ff6b" />
    <circle cx="140" cy="75" r="55" fill="#22225a" /><circle cx="140" cy="75" r="28" fill="#e9ff6b" />
    <g clipPath={`url(#${id})`}><rect width="280" height="150" fill="#b6a0ff" /><path d="M140 16 155 57 201 57 164 84 179 130 140 102 101 130 116 84 79 57 125 57Z" fill="#4c226f" /></g>
    {Array.from({ length: 28 }, (_, i) => <path key={i} d={`M${i * 10} 0v150`} stroke="#fff" opacity=".18" />)}
  </svg></div>;
}

export function FlutedGlassDemo() {
  const { t } = useLocale();
  const [offset] = useDemoNumber(0, -45, 45);
  return <div className="sc-demo"><div className="sc-glass sc-art" role="img" aria-label={t('demo.showcase.glass')}>
    <div className="sc-glass-orb" style={{ transform: `translateX(${offset}px)` }} />
    <span className="sc-glass-type">{t('demo.showcase.glassWord')}</span>
    <div className="sc-flutes" aria-hidden="true" />
    <span className="sc-glass-caption">{t('demo.showcase.glassCaption')}</span>
  </div></div>;
}

export function PolaroidDevelopDemo() {
  const { t } = useLocale();
  const [progress] = useDemoNumber(0, 0, 100);
  const developed = Math.min(1, progress / 70);
  return <div className="sc-demo"><div className="sc-polaroid-stage sc-art">
    <div className="sc-photo" style={{ transform: `rotate(${-7 + developed * 4}deg)` }}>
      <div className="sc-photo-image" role="img" aria-label={t('demo.showcase.photo')}>
        <svg viewBox="0 0 160 88" aria-hidden="true"><rect width="160" height="88" fill="#ffc6a3" /><circle cx="113" cy="27" r="15" fill="#fff2b3" /><path d="M0 72 48 20 99 88H0Z" fill="#7372ac" /><path d="M40 88 104 42 160 76V88Z" fill="#373d71" /><path d="M0 78Q50 67 90 82T160 77V88H0Z" fill="#adc9c6" /></svg>
        <div className="sc-photo-cover" style={{ opacity: 1 - developed }} />
      </div>
      <span>{t('demo.showcase.memory')}</span>
    </div>
  </div></div>;
}

export function StickerPeelDemo() {
  const { t } = useLocale();
  const [peeled, setPeeled] = useState(false);
  return <div className="sc-demo"><div className="sc-sticker-stage sc-art">
    <button type="button" className="sc-sticker" aria-label={t('demo.showcase.peel')} aria-pressed={peeled} data-peeled={peeled}
      onClick={() => setPeeled(value => !value)}>
      <span className="sc-sticker-face"><span aria-hidden="true">✳</span>{t('demo.showcase.stickerWord')}</span>
      <span className="sc-sticker-fold" aria-hidden="true" />
    </button>
  </div></div>;
}

export function AccordionGalleryDemo() {
  const { t } = useLocale();
  const [selected, setSelected] = useState(0);
  const labels = ['demo.showcase.dawn', 'demo.showcase.dunes', 'demo.showcase.ocean'] as const;
  return <div className="sc-demo"><div className="sc-gallery sc-art" role="group" aria-label={t('demo.showcase.gallery')}>
    {labels.map((label, i) => <button key={label} type="button" className={`sc-gallery-panel sc-landscape-${i}`} aria-label={t(label)} aria-pressed={selected === i}
      style={{ flexGrow: selected === i ? 4 : 1 } as CSSProperties} onClick={() => setSelected(i)}>
      <span className="sc-gallery-sun" aria-hidden="true" /><span className="sc-gallery-hill" aria-hidden="true" />
      <span className="sc-gallery-label" style={{ opacity: selected === i ? 1 : 0 }}>{t(label)}</span>
    </button>)}
  </div></div>;
}
