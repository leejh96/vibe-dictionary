import { useLocale } from '../../../i18n/LocaleContext';
import type { CSSProperties } from 'react';

const LINKS = [
  { from: 'demo.additions.infographic.sankey.web', to: 'demo.additions.infographic.sankey.buy', value: 40 },
  { from: 'demo.additions.infographic.sankey.web', to: 'demo.additions.infographic.sankey.hold', value: 20 },
  { from: 'demo.additions.infographic.sankey.app', to: 'demo.additions.infographic.sankey.hold', value: 10 },
  { from: 'demo.additions.infographic.sankey.app', to: 'demo.additions.infographic.sankey.exit', value: 30 },
] as const;
const SCALE = 1.12;
type NodeLabel = typeof LINKS[number]['from'] | typeof LINKS[number]['to'];
function layoutNodes(labels: NodeLabel[], side: 'from' | 'to', gap: number) {
  let cursor = 0;
  return labels.map(label => {
    const value = LINKS.filter(link => link[side] === label).reduce((sum, link) => sum + link.value, 0);
    const node = { label, value, y: cursor };
    cursor += value * SCALE + gap;
    return node;
  });
}
const SOURCES = layoutNodes(['demo.additions.infographic.sankey.web', 'demo.additions.infographic.sankey.app'], 'from', 24);
const TARGETS = layoutNodes(['demo.additions.infographic.sankey.buy', 'demo.additions.infographic.sankey.hold', 'demo.additions.infographic.sankey.exit'], 'to', 12);
const FLOWS = LINKS.map((link, index) => {
  const source = SOURCES.find(node => node.label === link.from)!;
  const target = TARGETS.find(node => node.label === link.to)!;
  const sourceY = source.y + LINKS.slice(0, index).filter(prior => prior.from === link.from).reduce((sum, prior) => sum + prior.value, 0) * SCALE;
  const targetY = target.y + LINKS.slice(0, index).filter(prior => prior.to === link.to).reduce((sum, prior) => sum + prior.value, 0) * SCALE;
  return { ...link, sourceY, targetY, height: link.value * SCALE };
});

export function SankeyFlowDemo() {
  const { t } = useLocale();
  return (
    <div className="infographic-demo">
      <div className="ig-sankey" role="img" aria-label={t('demo.additions.infographic.sankey.chart', { sources: SOURCES.map(node => t('demo.additions.infographic.sankey.node', { label: t(node.label), value: node.value })).join(', '), targets: TARGETS.map(node => t('demo.additions.infographic.sankey.node', { label: t(node.label), value: node.value })).join(', '), links: LINKS.map(link => t('demo.additions.infographic.sankey.link', { from: t(link.from), to: t(link.to), value: link.value })).join(', '), scale: SCALE, total: LINKS.reduce((sum, link) => sum + link.value, 0) })}>
        <div className="ig-sankey-layout" aria-hidden="true">
          <div className="ig-sankey-labels">{SOURCES.map(node => <span className="ig-sankey-node-label" key={node.label} style={{ top: `${node.y + node.value * SCALE / 2}px` }}><span>{t(node.label)}</span><span>{node.value}</span></span>)}</div>
          <div className="ig-sankey-plot">
            <svg viewBox="0 0 100 136" preserveAspectRatio="none" focusable="false">
              {FLOWS.map((flow, index) => <path className={`ig-sankey-flow ig-sankey-${flow.from === 'demo.additions.infographic.sankey.web' ? 'web' : 'app'}`} key={`${flow.from}-${flow.to}`} style={{ '--ig-sankey-delay': `${index * 100}ms` } as CSSProperties} d={`M6 ${flow.sourceY}C40 ${flow.sourceY} 60 ${flow.targetY} 94 ${flow.targetY}L94 ${flow.targetY + flow.height}C60 ${flow.targetY + flow.height} 40 ${flow.sourceY + flow.height} 6 ${flow.sourceY + flow.height}Z`} />)}
              {SOURCES.map((node, index) => <rect className={`ig-sankey-node ig-sankey-${index === 0 ? 'web' : 'app'}`} key={node.label} x={0} y={node.y} width={6} height={node.value * SCALE} />)}
              {TARGETS.map(node => <rect className="ig-sankey-node ig-sankey-target" key={node.label} x={94} y={node.y} width={6} height={node.value * SCALE} />)}
            </svg>
            {FLOWS.map(flow => <span className="ig-sankey-value" key={`${flow.from}-${flow.to}`} style={{ top: `${(flow.sourceY + flow.targetY + flow.height) / 2}px` }}>{flow.value}</span>)}
          </div>
          <div className="ig-sankey-labels">{TARGETS.map(node => <span className="ig-sankey-node-label" key={node.label} style={{ top: `${node.y + node.value * SCALE / 2}px` }}><span>{t(node.label)}</span><span>{node.value}</span></span>)}</div>
        </div>
      </div>
    </div>
  );
}
