import { useId, useState, type CSSProperties } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

const images = [
  { src: new URL('./gallery/forest.svg', import.meta.url).href, altKey: 'demo.additions.grid.forestAlt', width: 160, height: 90 },
  { src: new URL('./gallery/vase.svg', import.meta.url).href, altKey: 'demo.additions.grid.vaseAlt', width: 90, height: 120 },
  { src: new URL('./gallery/coast.svg', import.meta.url).href, altKey: 'demo.additions.grid.coastAlt', width: 120, height: 120 },
] as const;

export function AspectRatioGalleryDemo() {
  const { t } = useLocale();
  const [ratio, setRatio] = useState('4 / 3');
  const id = useId();

  return <div className="grid-demo gr-gallery-demo">
    <div className="gr-gallery-scene">
      <div id={id} className="gr-ratio-gallery" role="group" aria-label={t('demo.additions.grid.ratioGallery')} style={{ '--gr-thumb-ratio': ratio } as CSSProperties}>
        {images.map(image => <img key={image.src} src={image.src} alt={t(image.altKey)} width={image.width} height={image.height} />)}
      </div>
    </div>
    <label className="gr-width-control">{t('demo.additions.grid.ratio')}<select value={ratio} aria-label={t('demo.additions.grid.galleryRatio')} aria-controls={id} onChange={event => setRatio(event.currentTarget.value)}>
      <option value="1 / 1">{t('demo.additions.grid.square')}</option><option value="4 / 3">{t('demo.additions.grid.landscape')}</option><option value="4 / 5">{t('demo.additions.grid.portrait')}</option>
    </select></label>
  </div>;
}
