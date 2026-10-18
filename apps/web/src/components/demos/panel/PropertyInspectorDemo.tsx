import { useLocale } from '../../../i18n/LocaleContext';
import { useId, useState } from 'react';

export function PropertyInspectorDemo() {
  const { t } = useLocale();
  const [selected, setSelected] = useState(0);
  const [radii, setRadii] = useState([8, 24]);
  const id = useId();
  const name = t('demo.additions.panel.objectName', { name: selected === 0 ? 'A' : 'B' });

  return <div className="panel-demo">
    <div className="pn-inspector-frame">
      <div className="pn-inspector-layout">
        <div className="pn-inspector-canvas" role="group" aria-label={t('demo.additions.panel.editableObjects')}>
          {radii.map((radius, index) => <button key={index} id={`${id}-object-${index}`} type="button" className="pn-inspector-object" style={{ borderRadius: `${radius}px` }} aria-label={t('demo.additions.panel.selectObject', { name: index === 0 ? 'A' : 'B' })} aria-pressed={selected === index} onClick={() => setSelected(index)} />)}
        </div>
        <div className="pn-inspector-properties" role="group" aria-label={t('demo.additions.panel.objectProperties', { name })}>
          <strong>{name}</strong>
          <label>{t('demo.additions.panel.corner')}<input type="range" min={0} max={24} step={1} value={radii[selected]} aria-label={t('demo.additions.panel.objectCorner', { name })} aria-valuetext={t('demo.additions.panel.pixelAccessible', { value: radii[selected] })} aria-controls={`${id}-object-${selected}`} onChange={event => {
            const value = Number(event.currentTarget.value);
            setRadii(previous => previous.map((radius, index) => index === selected ? value : radius));
          }} /></label>
        </div>
      </div>
    </div>
  </div>;
}
