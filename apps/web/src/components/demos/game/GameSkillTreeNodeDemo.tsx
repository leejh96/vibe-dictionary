import { useState } from 'react';
import { Lock, Check, RotateCcw } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

interface SkillNode {
  id: string;
  labelKey: 'demo.game.skillTree.nodeRoot' | 'demo.game.skillTree.nodeSwift' | 'demo.game.skillTree.nodeGuard' | 'demo.game.skillTree.nodeDash' | 'demo.game.skillTree.nodeUltimate';
  parentId: string | null;
  x: number;
  y: number;
}

const NODES: SkillNode[] = [
  { id: 'root', labelKey: 'demo.game.skillTree.nodeRoot', parentId: null, x: 50, y: 18 },
  { id: 'swift', labelKey: 'demo.game.skillTree.nodeSwift', parentId: 'root', x: 25, y: 50 },
  { id: 'guard', labelKey: 'demo.game.skillTree.nodeGuard', parentId: 'root', x: 75, y: 50 },
  { id: 'dash', labelKey: 'demo.game.skillTree.nodeDash', parentId: 'swift', x: 25, y: 82 },
  { id: 'ultimate', labelKey: 'demo.game.skillTree.nodeUltimate', parentId: 'guard', x: 75, y: 82 },
];

const INITIAL_SP = 3;

export function GameSkillTreeNodeDemo() {
  const { t } = useLocale();
  const [unlocked, setUnlocked] = useState<string[]>(['root']);
  const remainingSp = INITIAL_SP - (unlocked.length - 1);

  const canUnlock = (node: SkillNode) =>
    !unlocked.includes(node.id) &&
    remainingSp > 0 &&
    (node.parentId === null || unlocked.includes(node.parentId));

  const handleUnlock = (node: SkillNode) => {
    if (!canUnlock(node)) return;
    setUnlocked((prev) => [...prev, node.id]);
  };

  const handleReset = () => {
    setUnlocked(['root']);
  };

  return (
    <div className="w-full min-h-[180px] flex flex-col justify-center items-center pt-11 pb-3 px-3 sm:pt-12 sm:pb-4 sm:px-4 text-xs select-none">
      <div className="w-full max-w-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-sm flex flex-col gap-2">
        {/* Header */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
              {t('demo.game.skillTree.spLabel')}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 font-mono font-extrabold text-[11px] text-indigo-700 dark:text-indigo-300">
              {t('demo.game.skillTree.spValue', { count: remainingSp })}
            </span>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="min-h-6 px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-[10px] font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer flex items-center gap-1"
          >
            <RotateCcw aria-hidden="true" className="w-3 h-3" />
            <span>{t('demo.game.skillTree.resetBtn')}</span>
          </button>
        </div>

        {/* SVG Graph + Nodes */}
        <div className="relative h-36 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
            {NODES.filter((n) => n.parentId !== null).map((node) => {
              const parent = NODES.find((p) => p.id === node.parentId)!;
              const isEdgeActive = unlocked.includes(node.id) && unlocked.includes(parent.id);
              return (
                <line
                  key={node.id}
                  x1={parent.x}
                  y1={parent.y}
                  x2={node.x}
                  y2={node.y}
                  stroke={isEdgeActive ? '#6366f1' : '#94a3b8'}
                  strokeWidth={isEdgeActive ? 1.8 : 1}
                  strokeDasharray={isEdgeActive ? undefined : '2 2'}
                  className="transition-all duration-150"
                />
              );
            })}
          </svg>

          {NODES.map((node) => {
            const isUnlocked = unlocked.includes(node.id);
            const isAvailable = canUnlock(node);
            const statusText = isUnlocked
              ? t('demo.game.skillTree.statusUnlocked')
              : isAvailable
              ? t('demo.game.skillTree.statusAvailable')
              : t('demo.game.skillTree.statusLocked');

            return (
              <button
                key={node.id}
                type="button"
                disabled={!isAvailable}
                onClick={() => handleUnlock(node)}
                aria-label={`${t(node.labelKey)} (${statusText})`}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 min-h-7 px-2 py-1 rounded-lg border text-[10px] font-bold flex items-center gap-1 whitespace-nowrap transition-all duration-150 ${
                  isUnlocked
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-xs'
                    : isAvailable
                    ? 'bg-white dark:bg-slate-900 border-emerald-500 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 cursor-pointer ring-2 ring-emerald-500/25'
                    : 'bg-slate-100 dark:bg-slate-800/80 border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                }`}
              >
                {isUnlocked ? (
                  <Check aria-hidden="true" className="w-3 h-3 shrink-0" />
                ) : !isAvailable ? (
                  <Lock aria-hidden="true" className="w-3 h-3 shrink-0" />
                ) : null}
                <span>{t(node.labelKey)}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
