import { useDemoNumber, useDemoToggle, useDemoAutoplayRunning } from '../../../hooks/useDemoAutoplay';
import { useLocale } from '../../../i18n/LocaleContext';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MoveHorizontal } from 'lucide-react';



/* ============================================================================
 * DOMAIN 3: 레이아웃 & 공간 구조 데모 (16종)
 * ============================================================================ */

/* 1. 벤토 그리드 (Bento Grid) */
export const LyBentoGridDemo: React.FC = () => {
  const { t } = useLocale();
  const [activeTile, setActiveTile] = useState(0);
  return (
    <div className="w-full h-40 flex items-center justify-center px-5 pt-6 select-none">
      <div className="w-full h-24 grid grid-cols-4 grid-rows-2 gap-1.5">
        <div data-demo-control
          role="button" tabIndex={0} onClick={() => setActiveTile(0)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveTile(0); } }}
          className={`col-span-2 row-span-2 rounded-xl p-2.5 flex flex-col justify-between cursor-pointer border transition-all ${
            activeTile === 0
              ? 'bg-indigo-600/30 border-indigo-400 text-white'
              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
          }`}
        >
          <span className="text-[9px] font-mono text-indigo-300">{t("sample.lyBentoGrid.mainTile")}</span>
          <span className="text-xs font-extrabold">{t("sample.lyBentoGrid.bentoHero")}</span>
        </div>
        <div data-demo-control
          role="button" tabIndex={0} onClick={() => setActiveTile(1)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveTile(1); } }}
          className={`col-span-2 row-span-1 rounded-xl px-2.5 py-1 flex items-center justify-between cursor-pointer border transition-all ${
            activeTile === 1
              ? 'bg-emerald-600/30 border-emerald-400 text-white'
              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
          }`}
        >
          <span className="text-[10px] font-bold">{t("sample.lyBentoGrid.wideTile")}</span>
          <span className="text-[9px] font-mono text-emerald-300">{t("sample.lyBentoGrid.wideTile")}</span>
        </div>
        <div data-demo-control
          role="button" tabIndex={0} onClick={() => setActiveTile(2)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveTile(2); } }}
          className={`col-span-1 row-span-1 rounded-xl flex items-center justify-center cursor-pointer border text-[10px] font-bold transition-all ${
            activeTile === 2
              ? 'bg-amber-500/30 border-amber-400 text-amber-200'
              : 'bg-slate-900 border-slate-800 text-slate-400'
          }`}
        >{t("sample.lyBentoGrid.smallTile")}</div>
        <div data-demo-control
          role="button" tabIndex={0} onClick={() => setActiveTile(3)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveTile(3); } }}
          className={`col-span-1 row-span-1 rounded-xl flex items-center justify-center cursor-pointer border text-[10px] font-bold transition-all ${
            activeTile === 3
              ? 'bg-pink-500/30 border-pink-400 text-pink-200'
              : 'bg-slate-900 border-slate-800 text-slate-400'
          }`}
        >{t("sample.lyBentoGrid.smallTile")}</div>
      </div>
    </div>
  );
};


/* 2. 메이슨리 폭포수 그리드 (Masonry Waterfall) */
export const LyMasonryWaterfallDemo: React.FC = () => {
  const { t } = useLocale();
  const [shuffled, setShuffled] = useDemoToggle(false);
  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setShuffled(!shuffled)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setShuffled(!shuffled); } }}
      className="w-full h-40 flex flex-col items-center justify-center px-6 pt-5 cursor-pointer select-none"
    >
      <div className="w-full grid grid-cols-3 gap-1.5 items-start">
        <div className="space-y-1.5">
          <div className={`${shuffled ? 'h-8' : 'h-12'} rounded-lg bg-indigo-500/30 border border-indigo-500/50 transition-all duration-300 flex items-center justify-center text-[9px] font-mono text-indigo-200`}>{t("sample.lyMasonryWaterfall.h1")}</div>
          <div className={`${shuffled ? 'h-12' : 'h-7'} rounded-lg bg-slate-800 border border-slate-700 transition-all duration-300 flex items-center justify-center text-[9px] font-mono text-slate-400`}>{t("sample.lyMasonryWaterfall.h2")}</div>
        </div>
        <div className="space-y-1.5">
          <div className={`${shuffled ? 'h-12' : 'h-7'} rounded-lg bg-slate-800 border border-slate-700 transition-all duration-300 flex items-center justify-center text-[9px] font-mono text-slate-400`}>{t("sample.lyMasonryWaterfall.h3")}</div>
          <div className={`${shuffled ? 'h-8' : 'h-12'} rounded-lg bg-cyan-500/30 border border-cyan-500/50 transition-all duration-300 flex items-center justify-center text-[9px] font-mono text-cyan-200`}>{t("sample.lyMasonryWaterfall.h4")}</div>
        </div>
        <div className="space-y-1.5">
          <div className={`${shuffled ? 'h-10' : 'h-11'} rounded-lg bg-fuchsia-500/30 border border-fuchsia-500/50 transition-all duration-300 flex items-center justify-center text-[9px] font-mono font-bold text-fuchsia-800 dark:text-fuchsia-200`}>{t("sample.lyMasonryWaterfall.h5")}</div>
          <div className={`${shuffled ? 'h-11' : 'h-9'} rounded-lg bg-slate-800 border border-slate-700 transition-all duration-300 flex items-center justify-center text-[9px] font-mono text-slate-400`}>{t("sample.lyMasonryWaterfall.h6")}</div>
        </div>
      </div>
    </div>
  );
};


/* 3. 매거진 비대칭 오버랩 (Asymmetric Editorial) */
export const LyEditorialAsymmetricDemo: React.FC = () => {
  const { t } = useLocale();
  const [isHovering, setIsHovering] = useState(false);
  const [hovered, setHovered] = useDemoToggle(false, isHovering);
  return (
    <div data-demo-control
      onMouseEnter={() => { setIsHovering(true); setHovered(true); }}
      onMouseLeave={() => { setIsHovering(false); setHovered(false); }}
      role="button" tabIndex={0} onClick={() => setHovered(!hovered)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setHovered(!hovered); } }}
      className="relative w-full h-40 flex items-center justify-center px-6 pt-4 cursor-pointer select-none"
    >
      <div
        className={`w-36 h-24 rounded-xl bg-linear-to-br from-rose-500/40 to-indigo-600/40 border border-white/20 mr-10 transition-transform duration-300 ${
          hovered ? '-translate-x-2 scale-105' : ''
        }`}
      />
      <div
        className={`absolute right-7 bottom-5 w-32 rounded-lg bg-slate-900/95 border border-amber-400/50 p-2.5 shadow-xl transition-transform duration-300 ${
          hovered ? 'translate-x-1 -translate-y-1' : ''
        }`}
      >
        <span className="text-[9px] font-mono text-amber-300">{t("sample.lyEditorialAsymmetric.issue04")}</span>
        <p className="text-xs font-black text-white leading-tight">{t("sample.lyEditorialAsymmetric.editorialOverlap")}</p>
      </div>
    </div>
  );
};


/* 4. 허니컴 육각형 타일 (Honeycomb Grid) - 라이트/다크 모드 고대비 벡터 타일 */
export const LyHoneycombHexDemo: React.FC = () => {
  const { t } = useLocale();
  const [selected, setSelected] = useState(2);
  const hexes = [
    { id: 0, label: 'AI', role: 'CORE' },
    { id: 1, label: 'UI', role: 'VIEW' },
    { id: 2, label: 'VFX', role: 'ANIM' },
    { id: 3, label: '3D', role: 'MESH' },
    { id: 4, label: 'CSS', role: 'STYLE' },
  ];

  const row1 = hexes.slice(0, 3);
  const row2 = hexes.slice(3, 5);

  const renderHex = (item: (typeof hexes)[0]) => {
    const active = selected === item.id;
    return (
      <div data-demo-control
        key={item.id}
        role="button"
        tabIndex={0}
        onClick={() => setSelected(item.id)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setSelected(item.id);
          }
        }}
        aria-pressed={active} aria-label={t("demo.honeycomb.cellLabel", { name: item.label })}
        style={{
          /* outline preserved for focus-visible */
          border: 'none',
          WebkitTapHighlightColor: 'transparent',
          boxShadow: 'none',
        }}
        className={`relative w-12 h-14 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 select-none group border-0 border-none rounded-lg focus-visible:outline-2 focus-visible:outline-indigo-500 ${
          active
            ? 'scale-110 z-20 drop-shadow-[0_6px_14px_rgba(245,158,11,0.45)]'
            : 'hover:scale-105 z-10 drop-shadow-[0_2px_5px_rgba(15,23,42,0.12)] dark:drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]'
        }`}
      >
        <svg
          viewBox="0 0 100 115"
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        >
          <polygon
            points="50,4 96,31 96,84 50,111 4,84 4,31"
            className={`transition-colors duration-200 ${
              active
                ? 'fill-amber-400 dark:fill-amber-400 stroke-amber-500 dark:stroke-amber-300 stroke-3'
                : 'fill-white dark:fill-slate-900 stroke-slate-300 dark:stroke-slate-700 stroke-2 group-hover:stroke-indigo-500 dark:group-hover:stroke-indigo-400 group-hover:fill-indigo-50/70 dark:group-hover:fill-slate-800'
            }`}
          />
        </svg>

        <span
          className={`relative z-10 text-[11px] font-black tracking-tight leading-none transition-colors pointer-events-none ${
            active
              ? 'text-slate-950'
              : 'text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-white'
          }`}
        >
          {item.label}
        </span>
        <span
          className={`relative z-10 text-[7px] font-extrabold tracking-widest mt-0.5 leading-none transition-colors pointer-events-none ${
            active
              ? 'text-slate-900/80 font-bold'
              : 'text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 dark:group-hover:text-slate-300'
          }`}
        >
          {item.role}
        </span>
      </div>
    );
  };

  return (
    <div className="w-full h-40 flex flex-col items-center justify-center pt-1 select-none">
      <div className="flex flex-col items-center">
        {/* 상단 1열 (3셀) */}
        <div className="flex items-center gap-2">
          {row1.map(renderHex)}
        </div>
        {/* 하단 2열 (2셀, 상단 1열의 골짜기에 맞물리는 오프셋) */}
        <div className="flex items-center gap-2 -mt-3.5">
          {row2.map(renderHex)}
        </div>
      </div>
    </div>
  );
};


/* 5. 스티키 스크롤텔링 (Sticky Scrolltelling) */
export const LyStickyScrolltellingDemo: React.FC = () => {
  const { t } = useLocale();
  const [step, setStep] = useDemoNumber(0, 0, 2, 1, 'steps');
  const steps = [
    { title: 'Step 01', color: 'from-indigo-500 to-cyan-400' },
    { title: 'Step 02', color: 'from-emerald-500 to-teal-400' },
    { title: 'Step 03', color: 'from-rose-500 to-amber-400' },
  ];
  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setStep((s) => (s + 1) % steps.length)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setStep((s) => (s + 1) % steps.length); } }}
      className="w-full h-40 flex items-center justify-center px-5 pt-6 cursor-pointer select-none"
    >
      <div className="w-full min-h-24 rounded-xl bg-slate-900 border border-slate-800 p-2 grid grid-cols-2 gap-2 items-center">
        {/* 좌측 고정(Sticky) 비주얼 */}
        <div
          className={`h-full rounded-lg bg-linear-to-br ${steps[step].color} flex flex-col items-center justify-center text-slate-950 font-black text-xs transition-all duration-300`}
        >
          <span className="text-[9px] font-mono opacity-75">{t("sample.lyStickyScrolltelling.stickyLeft")}</span>
          <span>{steps[step].title}</span>
        </div>
        {/* 우측 스크롤 스토리 */}
        <div className="space-y-1">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className={`px-1.5 py-0.5 rounded text-[9px] leading-tight font-bold transition-all ${
                i === step
                  ? 'bg-indigo-600/30 border border-indigo-400 text-white'
                  : 'bg-slate-950 text-slate-500'
              }`}
            >
              {t("demo.story.section", { title: s.title })}</div>
          ))}
        </div>
      </div>
    </div>
  );
};


/* 6. 풀페이지 스냅 섹션 (Full-Page Scroll Snap) */
export const LyFullpageSnapDemo: React.FC = () => {
  const { t } = useLocale();
  const [page, setPage] = useDemoNumber(0, 0, 2, 1, 'steps');
  const colors = ['bg-indigo-600/30 border-indigo-400', 'bg-emerald-600/30 border-emerald-400', 'bg-rose-600/30 border-rose-400'];
  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setPage((p) => (p + 1) % 3)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPage((p) => (p + 1) % 3); } }}
      className="w-full h-40 flex items-center justify-center px-6 pt-5 cursor-pointer select-none"
    >
      <div className="relative w-full h-24 rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
        <div
          style={{ transform: `translateY(-${page * 96}px)` }}
          className="transition-transform duration-500 ease-out"
        >
          {[0, 1, 2].map((idx) => (
            <div
              key={idx}
              className={`h-24 flex flex-col items-center justify-center border-l-4 ${colors[idx]}`}
            >
              <span className="text-xs font-black text-white">{t("sample.lyFullpageSnap.section0")}{idx + 1}</span>
            </div>
          ))}
        </div>
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex flex-col gap-1">
          {[0, 1, 2].map((idx) => (
            <span
              key={idx}
              className={`w-1.5 h-1.5 rounded-full ${page === idx ? 'bg-white' : 'bg-slate-600'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};


/* 7. 가로 스크롤 쇼케이스 (Horizontal Scroll Showcase) */
export const LyHorizontalShowcaseDemo: React.FC = () => {
  const { t } = useLocale();
  const [idx, setIdx] = useDemoNumber(0, 0, 3, 1, 'steps');
  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setIdx((i) => (i + 1) % 4)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIdx((i) => (i + 1) % 4); } }}
      className="w-full h-40 flex flex-col items-center justify-center px-5 pt-3 cursor-pointer select-none"
    >
      <div className="w-full overflow-hidden rounded-xl bg-slate-900 border border-slate-800 p-2">
        <div
          style={{ transform: `translateX(-${idx * 76}px)` }}
          className="flex gap-2 transition-transform duration-500 ease-out"
        >
          {['CARD 01', 'CARD 02', 'CARD 03', 'CARD 04'].map((c, i) => (
            <div
              key={c}
              className={`shrink-0 w-24 h-16 rounded-lg border flex flex-col items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                i === idx
                  ? 'bg-indigo-600 text-white border-indigo-400 shadow-md scale-[1.02]'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              <span>{c}</span>
              <span
                className={`text-[9px] ${
                  i === idx ? 'text-indigo-100 font-semibold' : 'text-indigo-400/80'
                }`}
              >{t("demo.snapSlide")}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-2">
        {[0, 1, 2, 3].map((dot) => (
          <span
            key={dot}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              dot === idx
                ? 'w-4 bg-indigo-500'
                : 'w-1.5 bg-slate-400/40 dark:bg-slate-700'
            }`}
          />
        ))}
        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 ml-1">
          {idx + 1} / 4
        </span>
      </div>
    </div>
  );
};


/* 8. 언더빌 커튼 리빌 푸터 (Curtain Reveal) */
export const LyCurtainRevealDemo: React.FC = () => {
  const { t } = useLocale();
  const [lifted, setLifted] = useDemoToggle(false);
  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setLifted(!lifted)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLifted(!lifted); } }}
      className="w-full h-40 flex items-center justify-center px-6 pt-6 cursor-pointer select-none"
    >
      <div className="relative w-full h-24 rounded-xl overflow-hidden border border-slate-800 bg-indigo-950 flex items-end justify-center p-2">
        {/* 바닥에 깔린 고정 레이어 */}
        <div className="text-center">
          <span className="text-[10px] font-mono text-indigo-300">{t("sample.lyCurtainReveal.fixedFooterLayer")}</span>
          <p className="text-xs font-black text-white">{t("demo.aHiddenFooterIsRevealed")}</p>
        </div>
        {/* 위를 덮은 본문 커튼 */}
        <div
          className={`absolute inset-0 bg-slate-900 border-b border-slate-700 flex flex-col items-center justify-center transition-transform duration-500 ${
            lifted ? '-translate-y-12' : 'translate-y-0'
          }`}
        >
          <span className="text-xs font-bold text-slate-200">
            {lifted ? t("demo.closeCurtainClick") : t("demo.liftContentCurtainClick")}
          </span>
        </div>
      </div>
    </div>
  );
};


/* 9. 맥OS 독 매그니피케이션 바 (macOS Dock Magnification) */
export const LyMacosDockDemo: React.FC = () => {
  const [hoverIdx, setHoverIdx] = useState<number | null>(2);
  const icons = ['🏠', '🔍', '⚡', '🎨', '🚀'];
  return (
    <div
      onMouseLeave={() => setHoverIdx(2)}
      className="w-full h-40 flex flex-col items-center justify-center pt-4 select-none"
    >
      <div className="flex items-end gap-2 px-3.5 py-2 rounded-2xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md h-14">
        {icons.map((ic, i) => {
          const dist = hoverIdx === null ? 99 : Math.abs(hoverIdx - i);
          const scale = dist === 0 ? 1.45 : dist === 1 ? 1.18 : 1;
          return (
            <button
              key={i}
              onMouseEnter={() => setHoverIdx(i)}
              onClick={() => setHoverIdx(i)}
              style={{ transform: `scale(${scale}) translateY(${dist === 0 ? '-4px' : '0px'})` }}
              className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-sm transition-transform duration-150 origin-bottom"
            >
              {ic}
            </button>
          );
        })}
      </div>
    </div>
  );
};


/* 10. 커맨드 팔레트 스포트라이트 (Command Palette Cmd+K) */
export const LyCommandPaletteDemo: React.FC = () => {
  const { t } = useLocale();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const cmds = [t("demo.createProject"), t("demo.switchDarkTheme"), t("demo.copyFullPrompt")];
  return (
    <div className="w-full h-40 flex items-center justify-center px-6 pt-6 select-none">
      <div className="w-full rounded-xl bg-white dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden">
        <div className="px-3 py-1.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
          <span>{t("sample.lyCommandPalette.typeACommand")}</span>
          <kbd className="px-1.5 py-0.5 rounded-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[9px] border border-slate-200 dark:border-transparent">{t("sample.lyCommandPalette.k")}</kbd>
        </div>
        <div className="p-1 space-y-0.5">
          {cmds.map((cmd, i) => (
            <div data-demo-control
              key={cmd}
              role="button" tabIndex={0} onClick={() => setSelectedIdx(i)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedIdx(i); } }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer flex items-center justify-between transition-colors ${
                selectedIdx === i
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>{cmd}</span>
              {selectedIdx === i && <span className="text-[9px] font-mono">↵</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


/* 11. 다이나믹 아일랜드 캡슐 바 (Dynamic Island Capsule) */
export const LyDynamicIslandNavDemo: React.FC = () => {
  const { t } = useLocale();
  const [expanded, setExpanded] = useDemoToggle(false);
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center pt-4 select-none">
      <div data-demo-control
        role="button" tabIndex={0} aria-expanded={expanded} onClick={() => setExpanded(!expanded)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpanded(!expanded); } }}
        className={`bg-white dark:bg-black border border-slate-200/90 dark:border-slate-700/80 shadow-lg shadow-indigo-950/5 dark:shadow-2xl cursor-pointer transition-all duration-300 overflow-hidden flex flex-col justify-center ${
          expanded
            ? 'w-56 max-w-[calc(100%-12px)] h-20 rounded-3xl px-4 py-2'
            : 'w-32 h-9 rounded-full px-3'
        }`}
      >
        <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
          <span className="flex items-center gap-1.5 text-slate-900 dark:text-white">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-black tracking-tight text-slate-900 dark:text-white">
              {expanded ? t("sample.lyDynamicIslandNav.nowPlaying") : t("sample.lyDynamicIslandNav.island")}
            </span>
          </span>
          <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-300 font-bold">
            {expanded ? t("actions.collapse") : t("demo.click")}
          </span>
        </div>
        {expanded && (
          <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-600 dark:text-slate-200 border-t border-slate-100 dark:border-slate-800/80 pt-1.5">
            <span className="text-slate-700 dark:text-slate-200 font-medium">{t("sample.lyDynamicIslandNav.vibeSynthTrack")}</span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white font-bold shadow-xs">{t("sample.lyDynamicIslandNav.live")}</span>
          </div>
        )}
      </div>
    </div>
  );
};


/* 12. 원형 파이 메뉴 (Radial Pie Menu) */
export const LyRadialPieMenuDemo: React.FC = () => { const triggerRef = useRef<HTMLButtonElement>(null);
  const { t } = useLocale();
  const [open, setOpen] = useDemoToggle(true);
  const items = [
    { icon: '🎨', x: -38, y: -28 },
    { icon: '⚡', x: 38, y: -28 },
    { icon: '🚀', x: 38, y: 28 },
    { icon: '✨', x: -38, y: 28 },
  ];
  return (
    <div className="relative w-full h-40 flex items-center justify-center pt-5 select-none">
      {items.map((it, idx) => (
        <button
          key={idx}
          type="button"
          tabIndex={open ? 0 : -1} aria-hidden={!open} disabled={!open} onClick={() => { setOpen(false); triggerRef.current?.focus({ preventScroll: true }); }}
          style={{
            transform: open
              ? `translate(${it.x}px, ${it.y}px) scale(1)`
              : 'translate(0px, 0px) scale(0.2)',
            opacity: open ? 1 : 0,
            transitionDelay: open ? `${idx * 35}ms` : '0ms',
          }}
          className={`absolute w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-indigo-400/50 flex items-center justify-center text-xs text-slate-700 dark:text-white transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer shadow-md hover:bg-indigo-50 dark:hover:bg-slate-700 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
        >
          {it.icon}
        </button>
      ))}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        ref={triggerRef} aria-expanded={open} aria-label={t("demo.openClosePieMenu")}
        className="relative z-10 w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg border border-indigo-400/40 cursor-pointer"
      >
        <svg
          viewBox="0 0 20 20"
          className={`w-4 h-4 stroke-current stroke-[2.4] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            open ? 'rotate-45' : 'rotate-0'
          }`}
        >
          <line x1="10" y1="3.5" x2="10" y2="16.5" strokeLinecap="round" />
          <line x1="3.5" y1="10" x2="16.5" y2="10" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
};


/* 13. 바텀 시트 드로어 (Draggable Bottom Sheet) */
export const LyBottomSheetDemo: React.FC = () => {
  const { t } = useLocale();
  const [snap, setSnap] = useState<'half' | 'full'>('half');
  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setSnap(snap === 'half' ? 'full' : 'half')} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSnap(snap === 'half' ? 'full' : 'half'); } }}
      className="w-full h-40 flex items-end justify-center px-8 pt-8 cursor-pointer select-none"
    >
      <div
        className={`w-full rounded-t-2xl bg-white dark:bg-slate-900 border-t border-x border-slate-200 dark:border-slate-700 px-3.5 pt-2 transition-all duration-300 shadow-lg ${
          snap === 'full' ? 'h-24' : 'h-14'
        }`}
      >
        <div className="w-8 h-1 rounded-full bg-slate-300 dark:bg-slate-600 mx-auto mb-1.5" />
        <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
          <span>{t("sample.lyBottomSheet.bottomSheet")}{snap.toUpperCase()})</span>
        </div>
        {snap === 'full' && (
          <p className="mt-1.5 text-[11px] text-slate-600 dark:text-slate-400">{t("demo.detailsExpandAsIfTheHandle")}</p>
        )}
      </div>
    </div>
  );
};


/* 14. 마스터-디테일 스플릿 뷰 (Master-Detail Split View) */
export const LyMasterDetailSplitDemo: React.FC = () => {
  const { t } = useLocale();
  const [activeId, setActiveId] = useState(0);
  const items = [
    { name: 'Inbox #1', desc: t("demo.detailPreviewForTheFirstItem") },
    { name: 'Inbox #2', desc: t("demo.instantDetailForTheSecondItem") },
    { name: 'Inbox #3', desc: t("demo.reportDetailsForTheThirdItem") },
  ];
  return (
    <div className="w-full h-40 flex items-center justify-center px-5 pt-6 select-none">
      <div className="w-full h-24 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 grid grid-cols-5 overflow-hidden shadow-xs">
        <div className="col-span-2 border-r border-slate-200 dark:border-slate-800 p-1.5 space-y-0.5">
          {items.map((it, idx) => (
            <button
              key={it.name}
              onClick={() => setActiveId(idx)}
              className={`w-full text-left px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                activeId === idx
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {it.name}
            </button>
          ))}
        </div>
        <div className="col-span-3 p-2.5 flex flex-col justify-center">
          <span className="text-[9px] font-mono text-indigo-600 dark:text-indigo-400">{t("sample.lyMasterDetailSplit.detailView")}</span>
          <p className="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5">{items[activeId].name}</p>
          <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5">{items[activeId].desc}</p>
        </div>
      </div>
    </div>
  );
};


/* 15. 칸반 보드 컬럼 (Kanban Board Columns) */
export const LyKanbanBoardDemo: React.FC = () => {
  const { t } = useLocale();
  const [col, setCol] = useState<0 | 1 | 2>(1);
  const cols = ['TODO', 'DOING', 'DONE'];
  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setCol(((col + 1) % 3) as 0 | 1 | 2)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setCol(((col + 1) % 3) as 0 | 1 | 2); } }}
      className="w-full h-40 flex flex-col items-center justify-center px-5 pt-5 cursor-pointer select-none"
    >
      <div className="w-full grid grid-cols-3 gap-1.5">
        {cols.map((title, i) => (
          <div key={title} className="rounded-lg bg-slate-900 border border-slate-800 p-1.5 sm:p-2 h-20">
            <div className="text-[9px] font-mono text-slate-400 mb-1">{title}</div>
            {col === i ? (
              <div className="rounded-sm bg-indigo-600/30 border border-indigo-400 px-1 py-0.5 text-[9px] sm:text-[10px] leading-tight break-keep text-center font-bold text-white animate-spring-pop">{t("demo.taskCard")}</div>
            ) : (
              <div className="h-6 rounded-sm border border-dashed border-slate-800" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};


/* 16. 잔디 히트맵 매트릭스 (Contribution Heatmap Grid) */
export const LyHeatmapGridDemo: React.FC = () => {
  const [seed, setSeed] = useState(1);
  const levels = [
    'bg-slate-800',
    'bg-emerald-900/70',
    'bg-emerald-700/80',
    'bg-emerald-500',
    'bg-emerald-300',
  ];
  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setSeed((s) => s + 1)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSeed((s) => s + 1); } }}
      className="w-full h-40 flex flex-col items-center justify-center pt-4 cursor-pointer select-none"
    >
      <div className="grid grid-cols-10 gap-1 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
        {Array.from({ length: 40 }).map((_, idx) => {
          const lv = (idx * 7 + seed * 3) % 5;
          return <span key={idx} className={`w-3 h-3 rounded-[3px] ${levels[lv]}`} />;
        })}
      </div>
    </div>
  );
};


/* [레이아웃 +1] 스크롤스파이 플로팅 목차 (Scrollspy Floating TOC) */
export const LyFloatingTocSpyDemo: React.FC = () => { const autoRunning = useDemoAutoplayRunning();
  const { t } = useLocale();
  const [activeSec, setActiveSec] = useState(0);
  const sections = [
    { title: t("demo.toc.overview"), desc: t("demo.coreArchitectureLayers") },
    { title: t("demo.toc.installation"), desc: t("demo.packagesAndEnvironmentSetup") },
    { title: t("demo.toc.deployment"), desc: t("demo.zeroDowntimeEdgeDeployment") },
  ];

  useEffect(() => {
    if (!autoRunning) return;
    const id = setInterval(() => {
      setActiveSec((s) => (s + 1) % sections.length);
    }, 1800);
    return () => clearInterval(id);
  }, [sections.length, autoRunning]);

  return (
    <div className="w-full h-40 flex items-center justify-center pt-5 px-4 select-none">
      <div className="w-full max-w-[230px] h-24 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 p-2.5 flex items-center gap-2.5 shadow-xs">
        {/* 좌측 스크롤 연동 문서 뷰포트 */}
        <div className="flex-1 h-full bg-slate-50 dark:bg-slate-950/80 rounded-lg border border-slate-200/80 dark:border-slate-800 overflow-hidden relative">
          <div
            style={{ transform: `translateY(-${activeSec * 100}%)` }}
            className="h-full transition-transform duration-500 ease-out"
          >
            {sections.map((sec, idx) => (
              <div key={sec.title} className="h-full p-2 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-indigo-700 dark:text-indigo-300">{sec.title}</span>
                  <span className="text-[8px] font-mono text-slate-400 dark:text-slate-500">0{idx + 1}/03</span>
                </div>
                <p className="text-[9px] text-slate-700 dark:text-slate-300 leading-tight">{sec.desc}</p>
                <div className="w-full h-1 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div
                    style={{ width: `${((idx + 1) / sections.length) * 100}%` }}
                    className="h-full bg-indigo-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 우측 Sticky Scrollspy TOC (정확한 22px 행 높이 동기화) */}
        <div className="w-20 relative pl-2.5 border-l border-slate-200 dark:border-slate-800 flex flex-col">
          <div
            style={{ transform: `translateY(${activeSec * 22}px)` }}
            className="absolute left-[-1.5px] top-[3px] w-0.5 h-4 bg-indigo-500 rounded-full transition-transform duration-300 shadow-[0_0_6px_#818cf8]"
          />
          {sections.map((sec, idx) => (
            <button
              key={sec.title}
              type="button"
              onClick={() => setActiveSec(idx)}
              className={`h-[22px] flex items-center text-left text-[9px] truncate transition-colors cursor-pointer ${
                activeSec === idx
                  ? 'text-indigo-600 dark:text-indigo-300 font-bold'
                  : 'text-slate-600 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-slate-300'
              }`}
            >
              {sec.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};


/* [레이아웃 +2] 접이식 미니 레일 사이드바 (Collapsible Icon-Rail Sidebar) */
export const LyCollapsibleRailSidebarDemo: React.FC = () => {
  const { t } = useLocale();
  const [expanded, setExpanded] = useDemoToggle(true);
  const [activeNav, setActiveNav] = useState(0);
  const navs = [
    { icon: '🏠', label: t("demo.dashboard") },
    { icon: '📊', label: t("demo.analytics") },
    { icon: '⚡', label: t("demo.automations") },
  ];

  return (
    <div className="w-full h-40 flex items-center justify-center pt-5 px-4 select-none">
      <div className="w-full max-w-[230px] h-24 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 overflow-hidden flex shadow-xs">
        {/* 접이식 레일 사이드바 */}
        <div
          className={`h-full bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 p-1.5 flex flex-col justify-between transition-[width] duration-300 ${
            expanded ? 'w-24' : 'w-9'
          }`}
        >
          <div className="space-y-1">
            {navs.map((item, idx) => (
              <button
                key={item.label}
                type="button"
                aria-label={item.label} aria-current={activeNav === idx ? 'page' : undefined} onClick={() => setActiveNav(idx)}
                className={`w-full h-5 rounded-md flex items-center gap-1.5 px-1.5 text-[9px] transition-colors cursor-pointer ${
                  activeNav === idx
                    ? 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/70 dark:hover:bg-slate-900'
                }`}
              >
                <span className="shrink-0 text-[10px]">{item.icon}</span>
                {expanded && <span className="truncate">{item.label}</span>}
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-expanded={expanded} aria-label={expanded ? t("demo.collapseRail") : t("demo.expandRail")} onClick={() => setExpanded((e) => !e)}
            className="w-full h-4 rounded-sm bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-[8px] font-mono text-slate-600 dark:text-slate-400 flex items-center justify-center cursor-pointer border border-slate-200/80 dark:border-transparent transition-colors"
          >
            {expanded ? t("demo.collapseRail") : '»'}
          </button>
        </div>

        {/* 우측 메인 콘텐츠 */}
        <div className="flex-1 min-w-0 p-2 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-900 dark:text-white truncate">{navs[activeNav].label}</span>
            <span className="text-[8px] px-1.5 py-0.5 rounded-sm bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 font-mono border border-indigo-100 dark:border-transparent">
              {expanded ? t("sample.lyCollapsibleRailSidebar.label220px") : t("sample.lyCollapsibleRailSidebar.label56px")}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="h-9 rounded-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 p-1.5">
              <div className="w-8 h-1.5 rounded-sm bg-indigo-500/60 mb-1" />
              <div className="w-12 h-2 rounded-sm bg-slate-300 dark:bg-slate-600/60" />
            </div>
            <div className="h-9 rounded-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 p-1.5">
              <div className="w-8 h-1.5 rounded-sm bg-emerald-500/60 mb-1" />
              <div className="w-10 h-2 rounded-sm bg-slate-300 dark:bg-slate-600/60" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


/* [레이아웃 +3] 드릴다운 브레드크럼 파인더 (Drill-Down Breadcrumb Explorer) */
export const LyBreadcrumbFolderDrillDemo: React.FC = () => {
  const [path, setPath] = useState<string[]>(['root', 'src', 'ui']);
  const [selectedFile, setSelectedFile] = useState<string>('Button.tsx');

  const folderMap: Record<string, string[]> = {
    root: ['src/', 'public/', 'README.md'],
    src: ['ui/', 'hooks/', 'App.tsx'],
    public: ['logo.svg', 'favicon.svg', 'robots.txt'],
    ui: ['Button.tsx', 'Modal.tsx', 'Card.tsx'],
    hooks: ['useTheme.ts', 'useToast.ts', 'index.ts'],
  };

  const currentFolder = path[path.length - 1];
  const currentItems = folderMap[currentFolder] || folderMap.root;

  return (
    <div className="w-full h-40 flex items-center justify-center pt-5 px-4 select-none">
      <div className="w-full max-w-[230px] h-24 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 p-2.5 flex flex-col justify-between shadow-xs">
        {/* 상단 브레드크럼 경로 바 */}
        <div className="flex items-center justify-between gap-1 text-[9px] font-mono bg-slate-50 dark:bg-slate-950 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-0.5 truncate">
            {path.map((seg, idx) => (
              <React.Fragment key={`${seg}-${idx}`}>
                {idx > 0 && <span className="text-slate-400 dark:text-slate-600">/</span>}
                <button
                  type="button"
                  onClick={() => setPath((prev) => prev.slice(0, idx + 1))}
                  className={`px-1 rounded transition-colors cursor-pointer ${
                    idx === path.length - 1
                      ? 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white'
                  }`}
                >
                  {seg}
                </button>
              </React.Fragment>
            ))}
          </div>
          <span className="text-[8px] text-emerald-600 dark:text-emerald-400 font-bold truncate max-w-[64px]">{selectedFile}</span>
        </div>

        {/* 하단 현재 계층 아이템 목록 (모든 폴더·파일 클릭 반응) */}
        <div className="grid grid-cols-3 gap-1.5">
          {currentItems.map((item) => {
            const isFolder = item.endsWith('/');
            const cleanName = item.replace(/\/$/, '');
            const isSelected = !isFolder && selectedFile === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => {
                  if (isFolder) {
                    setPath((prev) => [...prev, cleanName]);
                  } else {
                    setSelectedFile(item);
                  }
                }}
                className={`h-10 rounded-lg border flex flex-col items-center justify-center gap-0.5 text-[9px] transition-all active:scale-95 cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-50 border-indigo-400 text-indigo-700 dark:bg-indigo-500/20 dark:border-indigo-400/70 dark:text-indigo-200 font-bold shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 dark:bg-slate-800/80 dark:hover:bg-slate-800 dark:border-slate-700/60 dark:text-slate-200'
                }`}
              >
                <span className="text-[11px]">{isFolder ? '📁' : '📄'}</span>
                <span className="truncate max-w-[58px]">{item}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};


/* [레이아웃 +4] 리사이저블 스플릿 패인 (Resizable Dual Split Pane) */
export const LyResizableSplitPaneDemo: React.FC = () => {
  const { t } = useLocale();
  const [leftRatio, setLeftRatio] = useState(45);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false); const draggedRef = useRef(false);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pct = ((clientX - rect.left) / rect.width) * 100;
      setLeftRatio(Math.min(75, Math.max(25, Math.round(pct))));
    },
    []
  );

  return (
    <div className="w-full h-40 flex flex-col items-center justify-center gap-1.5 pt-5 px-4 select-none">
      <div
        ref={containerRef}
        onPointerMove={(e) => {
          if (dragging) { draggedRef.current = true; handleMove(e.clientX); }
        }}
        onPointerUp={() => setDragging(false)}
        onPointerLeave={() => setDragging(false)}
        className="w-full max-w-[230px] h-20 rounded-xl bg-slate-900 border border-slate-700/80 overflow-hidden flex"
      >
        {/* 좌측 Code 패인 */}
        <div
          style={{ width: `${leftRatio}%` }}
          className="h-full bg-slate-950 p-2 flex flex-col justify-between overflow-hidden"
        >
          <span className="text-[8px] font-mono text-indigo-400">{t("sample.lyResizableSplitPane.editor")}{leftRatio}%)</span>
          <div className="space-y-1">
            <div className="w-4/5 h-1.5 rounded-sm bg-indigo-500/40" />
            <div className="w-3/5 h-1.5 rounded-sm bg-slate-700" />
          </div>
        </div>

        {/* 중앙 드래그 가터 핸들 */}
        <div data-demo-control
          onPointerDown={() => { draggedRef.current = false; setDragging(true); }}
          role="separator" tabIndex={0} aria-orientation="vertical" aria-valuenow={leftRatio} aria-valuemin={25} aria-valuemax={75} aria-label={t("demo.dragLeftRightOrClick")} onClick={() => { if (draggedRef.current) { draggedRef.current = false; return; } setLeftRatio((r) => (r === 45 ? 65 : r === 65 ? 30 : 45)); }} onKeyDown={(e) => { if (e.key === 'ArrowLeft') { e.preventDefault(); setLeftRatio((r) => Math.max(25, r - 5)); } else if (e.key === 'ArrowRight') { e.preventDefault(); setLeftRatio((r) => Math.min(75, r + 5)); } else if (e.key === 'Home') { e.preventDefault(); setLeftRatio(25); } else if (e.key === 'End') { e.preventDefault(); setLeftRatio(75); } else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLeftRatio((r) => (r === 45 ? 65 : r === 65 ? 30 : 45)); } }}
          className="w-2 h-full bg-slate-800 hover:bg-indigo-500 active:bg-indigo-400 flex items-center justify-center cursor-col-resize transition-colors shrink-0"
          title={t("demo.dragLeftRightOrClick")}
        >
          <MoveHorizontal className="w-2.5 h-2.5 text-slate-300" />
        </div>

        {/* 우측 Preview 패인 */}
        <div className="flex-1 h-full bg-slate-900 p-2 flex flex-col justify-between overflow-hidden">
          <span className="text-[8px] font-mono text-emerald-400">{t("sample.lyResizableSplitPane.preview")}{100 - leftRatio}%)</span>
          <div className="w-full h-7 rounded-sm bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-[8px] font-bold text-emerald-300">{t("sample.lyResizableSplitPane.liveView")}</div>
        </div>
      </div>
    </div>
  );
};
