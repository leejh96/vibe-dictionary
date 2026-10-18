import { useLayoutEffect, useRef, useState } from 'react';
import { RotateCw } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

const INITIAL_ITEMS = [
  { id: 'plan', labelKey: 'demo.additions.motion.planning' as const },
  { id: 'design', labelKey: 'demo.additions.motion.design' as const },
  { id: 'build', labelKey: 'demo.additions.motion.development' as const },
];

export function ReorderListDemo() {
  const { t } = useLocale();
  const [items, setItems] = useState(INITIAL_ITEMS);
  const nodes = useRef(new Map<string, HTMLLIElement>());
  const previousTops = useRef(new Map<string, number>());

  useLayoutEffect(() => {
    const previous = previousTops.current;
    previousTops.current = new Map();
    if (!previous.size || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const animations: Animation[] = [];
    for (const [id, node] of nodes.current) {
      const top = previous.get(id);
      if (top === undefined || typeof node.animate !== 'function') continue;
      const delta = top - node.getBoundingClientRect().top;
      if (delta) animations.push(node.animate([
        { transform: `translateY(${delta}px)` }, { transform: 'translateY(0)' },
      ], { duration: 320, easing: 'cubic-bezier(.2,.8,.2,1)' }));
    }
    return () => animations.forEach(animation => animation.cancel());
  }, [items]);

  const reorder = () => {
    previousTops.current = new Map([...nodes.current].map(([id, node]) => [id, node.getBoundingClientRect().top]));
    setItems(current => [...current.slice(1), current[0]]);
  };

  return <div className="motion-demo">
    <div className="md-sort-group">
      <ul className="md-sort-list" aria-label={t('demo.additions.motion.workSteps')} aria-live="polite">
        {items.map(item => <li key={item.id} data-item-id={item.id} ref={node => { if (node) nodes.current.set(item.id, node); else nodes.current.delete(item.id); }}><span className="md-list-mark" aria-hidden="true" />{t(item.labelKey)}</li>)}
      </ul>
      <button type="button" className="md-icon-button" aria-label={t('demo.additions.motion.cycleWorkList')} onClick={reorder}><RotateCw size={18} aria-hidden="true" /></button>
    </div>
  </div>;
}
