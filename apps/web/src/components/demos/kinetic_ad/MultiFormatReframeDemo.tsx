import { useDemoToggle } from '../../../hooks/useDemoAutoplay';
import { useId, type CSSProperties } from 'react';
import { RectangleHorizontal, RectangleVertical } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

export function MultiFormatReframeDemo() {
  const { t } = useLocale();
  const [portrait, setPortrait] = useDemoToggle(false);
  const sceneId = useId();

  return <div className="kinetic-ad-demo ka-reframe-demo">
    <svg id={sceneId} className="ka-reframe-scene" viewBox="0 0 264 180" role="img" data-format={portrait ? 'portrait' : 'wide'} style={{ '--ka-reframe-progress': portrait ? 1 : 0 } as CSSProperties} aria-label={t(portrait ? 'demo.additions.kineticAd.reframePortraitScene' : 'demo.additions.kineticAd.reframeWideScene')}>
      <g aria-hidden="true">
        <rect className="ka-reframe-canvas" x="0" y="0" rx="10" />
        <g className="ka-reframe-copy">
          <text className="ka-reframe-word">{t('demo.additions.kineticAd.sampleGo')}</text>
          <text className="ka-reframe-word">{t('demo.additions.kineticAd.sampleYour')}</text>
          <text className="ka-reframe-word">{t('demo.additions.kineticAd.sampleWay')}</text>
        </g>
        <g className="ka-reframe-product">
          <path className="ka-reframe-band" d="M-22 8V-7A22 22 0 0 1 22-7V8" />
          <rect className="ka-reframe-ear" x="-27" y="2" width="13" height="26" rx="5" />
          <rect className="ka-reframe-ear" x="14" y="2" width="13" height="26" rx="5" />
        </g>
      </g>
    </svg>
    <div className="ka-reframe-controls" role="group" aria-label={t('demo.additions.kineticAd.reframeGroup')}>
      <button type="button" aria-label={t('demo.additions.kineticAd.reframeWide')} aria-controls={sceneId} aria-pressed={!portrait} onClick={() => setPortrait(false)}><RectangleHorizontal size={20} aria-hidden="true" focusable="false" /></button>
      <button type="button" aria-label={t('demo.additions.kineticAd.reframePortrait')} aria-controls={sceneId} aria-pressed={portrait} onClick={() => setPortrait(true)}><RectangleVertical size={20} aria-hidden="true" focusable="false" /></button>
    </div>
  </div>;
}
