import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function ConnectorMarkerDemo() {
  const { t } = useLocale();
  const id = useId();
  return <div className="graphic-demo">
    <svg className="gd-connector-canvas" viewBox="0 0 240 112" role="img" aria-label={t('demo.additions.graphic.connectorImage')}>
      <defs><marker id={id} viewBox="0 0 10 10" refX={10} refY={5} markerWidth={10} markerHeight={10} markerUnits="userSpaceOnUse" orient="auto">
        <path className="gd-connector-head" d="M0 0 10 5 0 10 3 5Z" />
      </marker></defs>
      <g className="gd-connector-lines">
        <path d="M52 56 Q110 56 186 24" markerEnd={`url(#${id})`} />
        <path d="M52 56 Q110 56 186 88" markerEnd={`url(#${id})`} />
      </g>
      <circle className="gd-connector-hub" cx={40} cy={56} r={12} />
      <g className="gd-connector-leaves"><circle cx={200} cy={18} r={12} /><circle cx={200} cy={94} r={12} /></g>
    </svg>
  </div>;
}
