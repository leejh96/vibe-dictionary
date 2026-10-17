import React, { useEffect, useRef, useState } from 'react';
import { Copy, Check, Plus, CheckCircle2, Code2 } from 'lucide-react';
import { TechniqueItem, CATEGORY_LABEL_MAP } from '@vibe-dictionary/catalog';
import { InteractiveDemo } from './demos/InteractiveDemos';
import { useClipboard } from '../hooks/useClipboard';

/* 암실·야간 광원·네온·CRT·영상 쇼릴 등 어두운 배경이 기법의 핵심인 데모 ID 목록 */
const DARK_STAGE_IDS = new Set<string>([
  // UI 도메인
  'neon-glow-pulse',
  'glassmorphism-card',
  'spotlight-border-card',
  'spotlight-focus',
  'peek-password-lamp',
  'tilt-3d-card',
  'stacked-card-cycle',

  // 그래픽 & 모션 도메인
  'mg-neon-sign-flicker',
  'mg-rgb-chromatic-glitch',
  'mg-speed-lines-streak',
  'mg-aurora-mesh',
  'mg-particle-network',
  'mg-god-ray-beam',
  'mg-radar-sonar-sweep',
  'mg-prism-rainbow-refraction',
  'mg-ken-burns-pan',

  // 스타일 도메인
  'st-liquid-acrylic',
  'st-linear-dark-minimal',
  'st-matte-film-grain',
  'st-neumorphism-soft',
  'st-8bit-pixel-retro',
  'st-crt-scanline-terminal',
  'st-synthwave-sunset-grid',
  'st-scifi-hud-chamfer',
  'st-architect-blueprint',
  'st-cyberpunk-neon-glitch',
  'st-holographic-foil-card',

  // 모션 영상 도메인
  'vd-saas-launch-reel',
  'vd-glitch-cut-reel',
  'vd-lower-third-banner',
  'vd-diagonal-shutter-wipe',
]);

interface TechniqueCardProps {
  item: TechniqueItem;
  isSelected: boolean;
  onToggleCart: (item: TechniqueItem) => void;
}

export const TechniqueCard: React.FC<TechniqueCardProps> = ({
  item,
  isSelected,
  onToggleCart,
}) => {
  const { status: copyStatus, copy } = useClipboard(
    `[${item.titleKo} / ${item.titleEn}]\n${item.promptSnippet}`
  );
  const copied = copyStatus === 'copied';
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const demoContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = demoContainerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const latest = entries[entries.length - 1];
        if (latest) {
          setIsInView(latest.isIntersecting);
        }
      },
      { rootMargin: '200px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const categoryLabel = CATEGORY_LABEL_MAP[item.category] ?? item.category;
  const keepDarkStage = DARK_STAGE_IDS.has(item.id);

  return (
    <article
      className={`group rounded-2xl border transition-all duration-200 flex flex-col overflow-hidden ${
        isSelected
          ? 'bg-indigo-50/70 dark:bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/30 shadow-lg shadow-indigo-500/10'
          : 'bg-white dark:bg-slate-900/50 border-slate-200/90 dark:border-slate-800/90 hover:border-indigo-300 dark:hover:border-slate-700 shadow-[0_6px_24px_-6px_rgba(79,70,229,0.09)] hover:shadow-[0_12px_30px_-6px_rgba(79,70,229,0.16)] dark:shadow-none'
      }`}
    >
      {/* 1. 상단 인터랙티브 데모 캔버스 */}
      <div
        ref={demoContainerRef}
        className={`demo-stage relative border-b border-slate-200/80 dark:border-slate-800/70 ${
          keepDarkStage
            ? 'demo-keep-dark bg-slate-950 text-slate-100'
            : 'bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100'
        }`}
      >
        <span
          className={`absolute top-2.5 left-3 z-20 text-[10px] font-bold px-2 py-0.5 rounded-md border backdrop-blur-xs ${
            keepDarkStage
              ? 'text-slate-300 bg-slate-900/90 border-slate-800'
              : 'text-indigo-700 dark:text-slate-300 bg-white/90 dark:bg-slate-900/90 border-indigo-200/80 dark:border-slate-800 shadow-xs dark:shadow-none'
          }`}
        >
          {categoryLabel}
        </span>

        <button
          onClick={() => setShowPrompt(!showPrompt)}
          title="프롬프트 문구 보기"
          className={`absolute top-2.5 right-3 z-20 px-2 py-1 rounded-lg border text-[10px] font-bold flex items-center gap-1 transition-colors backdrop-blur-xs ${
            showPrompt
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
              : keepDarkStage
              ? 'bg-slate-900/90 text-slate-300 border-slate-800 hover:text-white'
              : 'bg-white/90 dark:bg-slate-900/90 text-slate-600 dark:text-slate-300 border-slate-200/90 dark:border-slate-800 hover:text-indigo-600 dark:hover:text-white shadow-xs dark:shadow-none'
          }`}
        >
          <Code2 className="w-3 h-3" />
          <span>{showPrompt ? '데모 보기' : '프롬프트'}</span>
        </button>

        {showPrompt ? (
          <div className="h-40 p-4 pt-10 flex items-center bg-indigo-50/90 dark:bg-slate-950 text-xs font-mono text-indigo-950 dark:text-indigo-200 leading-relaxed overflow-y-auto break-keep">
            {item.promptSnippet}
          </div>
        ) : isInView ? (
          <InteractiveDemo techniqueId={item.id} />
        ) : (
          <div
            className={`w-full h-40 ${
              keepDarkStage ? 'bg-slate-950' : 'bg-slate-100/80 dark:bg-slate-950'
            }`}
            aria-hidden="true"
          />
        )}
      </div>

      {/* 2. 하단 정보 영역 (말줄임표 없이 전체 텍스트 노출) */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div className="space-y-1 break-keep">
          <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
            "{item.vibeTag}"
          </div>
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              {item.titleKo}
            </h3>
            <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400/90">
              {item.titleEn}
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-0.5">
            {item.summary}
          </p>
        </div>

        {/* 하단 액션 버튼 바 */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/70">
          <button
            onClick={copy}
            disabled={copyStatus === 'copying'}
            className="flex-1 h-8 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 hover:bg-indigo-50/60 dark:bg-slate-950 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 hover:text-indigo-700 dark:text-slate-300 dark:hover:text-white flex items-center justify-center gap-1.5 transition-colors"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span>{copied ? '복사됨!' : copyStatus === 'copying' ? '복사 중…' : '프롬프트 복사'}</span>
          </button>

          <button
            onClick={() => onToggleCart(item)}
            className={`flex-1 h-8 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
              isSelected
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs dark:bg-indigo-500/15 dark:border-indigo-500/50 dark:text-indigo-300 hover:bg-indigo-500 dark:hover:bg-indigo-500/25'
                : 'bg-indigo-50/70 hover:bg-indigo-100/80 dark:bg-slate-900 dark:hover:bg-slate-800 border-indigo-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-slate-700 text-indigo-700 dark:text-slate-300 hover:text-indigo-900 dark:hover:text-white'
            }`}
          >
            {isSelected ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-white dark:text-indigo-400" />
                <span>담김 (빼기)</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 text-indigo-500 dark:text-slate-400" />
                <span>조합기에 담기</span>
              </>
            )}
          </button>
        </div>
        {copyStatus === 'error' && (
          <p role="alert" className="mt-2 text-xs text-rose-600 dark:text-rose-400">
            복사하지 못했습니다. 다시 시도하거나 프롬프트를 열어 직접 복사해 주세요.
          </p>
        )}
      </div>
    </article>
  );
};
