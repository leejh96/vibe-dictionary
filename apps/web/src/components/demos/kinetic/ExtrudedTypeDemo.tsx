import { useDemoNumber } from '../../../hooks/useDemoAutoplay';
import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function ExtrudedTypeDemo() {
  const { t } = useLocale();
  const [depth, setDepth] = useDemoNumber(8, 0, 16, 1, 'steps');
  const id = useId();
  const glyphId = `${id}-glyph`;

  return <div className="kinetic-demo kt-extrude-demo">
    <svg id={id} className="kt-extrude-scene" viewBox="0 0 264 104" role="img" aria-label={t('demo.additions.kinetic.extrusionScene')}>
      <defs><text id={glyphId} x={132} y={75.5} textAnchor="middle">{t('demo.additions.kinetic.typeSample')}</text></defs>
      <g aria-hidden="true" transform={`translate(${-depth / 2} ${-depth / 2})`}>
        {Array.from({ length: depth }, (_, index) => depth - index).map(layer => <use key={layer} className="kt-extrude-side" href={`#${glyphId}`} transform={`translate(${layer} ${layer})`} />)}
        <use className="kt-extrude-front" href={`#${glyphId}`} />
      </g>
    </svg>
    <label className="kt-position-control">{t('demo.additions.kinetic.depthLabel')}<input type="range" min={0} max={16} step={1} value={depth} aria-label={t('demo.additions.kinetic.extrusionDepth')} aria-valuetext={t('demo.additions.kinetic.level', { value: depth })} aria-controls={id} onChange={event => setDepth(Number(event.currentTarget.value))} /></label>
  </div>;
}
