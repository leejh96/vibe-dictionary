import { useLocale } from '../../../i18n/LocaleContext';

const SHELL = 'M44 34H220A18 38 0 0 1 220 110H44A18 38 0 0 1 44 34Z';

export function XrayDeviceDemo() {
  const { t } = useLocale();
  return <div className="scifi-demo">
    <svg className="sf-xray-device" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.scifi.xrayImage')}>
      <g aria-hidden="true" strokeLinejoin="round">
        <path d={SHELL} fill="currentColor" fillOpacity={.05} />
        <g className="sf-xray-structure">
          {[72, 180].map(x => <rect key={x} x={x} y={48} width={12} height={48} rx={4} fillOpacity={.1} />)}
          <rect x={56} y={68} width={154} height={8} rx={4} fillOpacity={.22} />
          <g className="sf-xray-coils">
            {[100, 112, 124, 136, 148, 160].map(x => <ellipse key={x} cx={x} cy={72} rx={10} ry={25} fillOpacity={.05} />)}
          </g>
          <ellipse cx={205} cy={72} rx={7} ry={14} fillOpacity={.16} />
        </g>
        <path className="sf-xray-shell" d={SHELL} />
        <g className="sf-xray-seams">
          <ellipse cx={44} cy={72} rx={18} ry={38} />
          <ellipse cx={220} cy={72} rx={18} ry={38} />
          <path d="M44 34V110M220 34V110" />
        </g>
      </g>
    </svg>
  </div>;
}
