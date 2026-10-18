import { useLocale } from '../../../i18n/LocaleContext';

import { useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { ChevronRight, FileText, Folder } from 'lucide-react';

const NODES = [
  { id: 'project', label: 'demo.additions.nav.tree.project', parent: null },
  { id: 'readme', label: 'demo.additions.nav.tree.readme', parent: 'project' },
  { id: 'styles', label: 'demo.additions.nav.tree.styles', parent: 'project' },
  { id: 'archive', label: 'demo.additions.nav.tree.archive', parent: null },
  { id: 'previous', label: 'demo.additions.nav.tree.previous', parent: 'archive' },
] as const;
type TreeNode = typeof NODES[number];

export function KeyboardTreeDemo() {
  const { t } = useLocale();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ project: true, archive: false });
  const [active, setActive] = useState('project');
  const id = useId();
  const root = useRef<HTMLUListElement>(null);
  const visible = NODES.filter(node => node.parent === null || expanded[node.parent]);

  function focus(nodeId: string) {
    setActive(nodeId);
    root.current?.querySelector<HTMLButtonElement>(`[data-node="${nodeId}"]`)?.focus();
  }

  function keyDown(event: KeyboardEvent<HTMLButtonElement>, node: TreeNode) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const index = visible.findIndex(item => item.id === node.id);
    const children = NODES.filter(item => item.parent === node.id);
    let next: string | undefined;
    switch (event.key) {
      case 'ArrowDown': next = visible[Math.min(visible.length - 1, index + 1)].id; break;
      case 'ArrowUp': next = visible[Math.max(0, index - 1)].id; break;
      case 'Home': next = visible[0].id; break;
      case 'End': next = visible[visible.length - 1].id; break;
      case 'ArrowRight':
        if (children.length && !expanded[node.id]) setExpanded(value => ({ ...value, [node.id]: true }));
        else next = children[0]?.id;
        break;
      case 'ArrowLeft':
        if (children.length && expanded[node.id]) setExpanded(value => ({ ...value, [node.id]: false }));
        else next = node.parent ?? undefined;
        break;
      default: return;
    }
    event.preventDefault();
    if (next) focus(next);
  }

  function item(node: TreeNode) {
    const children = NODES.filter(child => child.parent === node.id);
    const siblings = NODES.filter(sibling => sibling.parent === node.parent);
    const folder = children.length > 0;
    return <button type="button" role="treeitem" data-node={node.id} aria-selected={active === node.id} aria-expanded={folder ? expanded[node.id] : undefined} aria-owns={folder ? `${id}-${node.id}` : undefined} aria-level={node.parent ? 2 : 1} aria-setsize={siblings.length} aria-posinset={siblings.findIndex(sibling => sibling.id === node.id) + 1} tabIndex={active === node.id ? 0 : -1} onFocus={() => setActive(node.id)} onClick={() => { setActive(node.id); if (folder) setExpanded(value => ({ ...value, [node.id]: !value[node.id] })); }} onKeyDown={event => keyDown(event, node)}>
      {folder ? <><ChevronRight className="nd-tree-caret" size={14} aria-hidden="true" /><Folder size={16} aria-hidden="true" /></> : <FileText size={16} aria-hidden="true" />}<span>{t(node.label)}</span>
    </button>;
  }

  return <div className="nav-demo"><div className="nd-tree-frame"><ul ref={root} className="nd-file-tree" role="tree" aria-label={t('demo.additions.nav.tree.navigation')}>
    {NODES.filter(node => node.parent === null).map(folder => <li role="none" key={folder.id}>{item(folder)}<ul id={`${id}-${folder.id}`} className="nd-tree-group" role="group" hidden={!expanded[folder.id]}>{NODES.filter(node => node.parent === folder.id).map(node => <li role="none" key={node.id}>{item(node)}</li>)}</ul></li>)}
  </ul></div></div>;
}
