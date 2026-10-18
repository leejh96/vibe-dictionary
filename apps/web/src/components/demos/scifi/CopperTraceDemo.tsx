import { useLocale } from '../../../i18n/LocaleContext';

const SIDE_TRACES = ['M96 52H82L66 36H48', 'M96 64H70L54 48H38', 'M96 76H66L54 88H38', 'M96 88H84L64 108H48'];
const VIAS = [[48, 36], [38, 48], [38, 88], [48, 108], [216, 36], [226, 48], [226, 88], [216, 108], [98, 22], [166, 22], [98, 122], [166, 122]];

export function CopperTraceDemo() {
  const { t } = useLocale();
  return <div className="scifi-demo">
    <svg className="sf-copper-board" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.scifi.copperImage')}>
      <g aria-hidden="true">
        <rect className="sf-pcb-surface" x={18} y={12} width={228} height={120} rx={8} />
        <g className="sf-pcb-tracks">
          {SIDE_TRACES.map(path => <path key={path} d={path} />)}
          <g transform="translate(264 0) scale(-1 1)">{SIDE_TRACES.map(path => <path key={path} d={path} />)}</g>
          <path d="M120 36V32L110 22H98M144 36V32L154 22H166M120 108V112L110 122H98M144 108V112L154 122H166" />
        </g>
        <g className="sf-pcb-pins">
          {[50, 62, 74, 86].map(y => <g key={y}><rect x={96} y={y} width={8} height={4} /><rect x={160} y={y} width={8} height={4} /></g>)}
          {[118, 142].map(x => <g key={x}><rect x={x} y={36} width={4} height={8} /><rect x={x} y={100} width={4} height={8} /></g>)}
        </g>
        <rect className="sf-pcb-chip" x={104} y={44} width={56} height={56} rx={3} />
        <rect className="sf-pcb-chip-inset" x={112} y={52} width={40} height={40} rx={1} />
        <circle className="sf-pcb-orientation" cx={118} cy={58} r={2} />
        <g className="sf-pcb-vias">{VIAS.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r={3} />)}</g>
        <g className="sf-pcb-holes">{[[30, 24], [234, 24], [30, 120], [234, 120]].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r={3} />)}</g>
      </g>
    </svg>
  </div>;
}
