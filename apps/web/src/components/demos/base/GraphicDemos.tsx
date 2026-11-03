import { useDemoToggle, useDemoAutoplayRunning } from '../../../hooks/useDemoAutoplay';
import { useLocale } from '../../../i18n/LocaleContext';
import React, { useState, useEffect } from 'react';
import { Rocket } from 'lucide-react';



/* ============================================================================
 * DOMAIN 2: 🎬 그래픽 & 모션 연출 데모 (22종)
 * ============================================================================ */

/* 1. 스쿼시 앤 스트레치 */
export const MgSquashStretchDemo: React.FC = () => {
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center select-none pt-6">
      <div className="w-10 h-10 rounded-full bg-linear-to-b from-amber-300 to-orange-500 shadow-lg shadow-orange-500/30 animate-squash-bounce" />
      <div className="mt-[18px] w-16 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600" />
    </div>
  );
};


/* 2. 앤티시페이션 (예비 동작) */
export const MgAnticipationDemo: React.FC = () => {
  const [runKey, setRunKey] = useState(0);
  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setRunKey((k) => k + 1)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setRunKey((k) => k + 1); } }}
      className="w-full h-40 flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden"
    >
      <div
        key={runKey}
        className="animate-anticipation-launch w-12 h-10 rounded-xl bg-linear-to-r from-rose-500 to-amber-400 flex items-center justify-center shadow-lg"
      >
        <Rocket className="w-5 h-5 text-slate-950 rotate-45" />
      </div>
    </div>
  );
};


/* 3. 팔로우 스루 & 딜레이 트레일 */
export const MgFollowTrailDemo: React.FC = () => {
  const [right, setRight] = useState(true); const autoRunning = useDemoAutoplayRunning();

  useEffect(() => {
    if (!autoRunning) return; const t = setInterval(() => setRight((r) => !r), 1400);
    return () => clearInterval(t);
  }, [autoRunning]);

  const delays = [0, 55, 110, 165];

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setRight(!right)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setRight(!right); } }}
      className="relative w-full h-40 flex flex-col items-center justify-center cursor-pointer select-none"
    >
      <div className="relative w-48 h-12 flex items-center justify-center">
        {delays
          .slice()
          .reverse()
          .map((d, revIdx) => {
            const idx = delays.length - 1 - revIdx;
            const size = 34 - idx * 6;
            return (
              <div
                key={idx}
                style={{
                  width: size,
                  height: size,
                  transition: `transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) ${d}ms`,
                  transform: `translateX(${right ? '62px' : '-62px'})`,
                  opacity: 1 - idx * 0.22,
                }}
                className="absolute rounded-full bg-linear-to-tr from-indigo-500 to-cyan-300 shadow-md"
              />
            );
          })}
      </div>
    </div>
  );
};


/* 4. 이징 속도 곡선 비교 */
export const MgEasingCurvesDemo: React.FC = () => { const autoRunning = useDemoAutoplayRunning();
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (!autoRunning) return; const t = setInterval(() => setActive((a) => !a), 1600);
    return () => clearInterval(t);
  }, [autoRunning]);

  const tracks = [
    { name: 'Linear', easing: 'linear', color: 'bg-slate-400' },
    { name: 'Ease-Out', easing: 'cubic-bezier(0.16, 1, 0.3, 1)', color: 'bg-cyan-400' },
    { name: 'Spring', easing: 'cubic-bezier(0.34, 1.30, 0.64, 1)', color: 'bg-amber-400' },
  ];

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setActive(!active)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(!active); } }}
      className="w-full h-40 flex flex-col justify-center px-6 pt-5 gap-2 cursor-pointer select-none"
    >
      {tracks.map((track) => (
        <div key={track.name} className="flex items-center gap-2">
          <span className="w-14 text-[10px] font-mono text-slate-400">{track.name}</span>
          <div className="relative flex-1 h-5 bg-slate-900 rounded-full border border-slate-800 flex items-center overflow-hidden">
            <div
              style={{
                transition: `left 0.9s ${track.easing}`,
                left: active ? 'calc(100% - 22px)' : '8px',
              }}
              className={`absolute w-3.5 h-3.5 rounded-full ${track.color}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};


/* 5. SVG 패스 라인 드로잉 */
export const MgSvgLineDrawDemo: React.FC = () => {
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center pt-4 select-none">
      <svg className="w-20 h-20" viewBox="0 0 100 100">
        <path
          d="M50 10 L63 36 L92 40 L71 60 L76 89 L50 75 L24 89 L29 60 L8 40 L37 36 Z" fill="rgba(99, 102, 241, 0.25)"
          pathLength="1"
          stroke="#818cf8"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-svg-draw"
        />
      </svg>
    </div>
  );
};


/* 6. 리퀴드 블롭 모핑 */
export const MgLiquidBlobMorphDemo: React.FC = () => {
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center pt-4 select-none">
      <div className="w-20 h-20 bg-linear-to-tr from-fuchsia-500 via-indigo-500 to-cyan-400 shadow-lg shadow-indigo-500/30 animate-liquid-morph" />
    </div>
  );
};


/* 7. 구이 메타볼 퓨전 (SVG Gooey Filter) */
export const MgGooeyMetaballDemo: React.FC = () => {
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center pt-4 select-none">
      <svg className="hidden">
        <defs>
          <filter id="gooey-demo-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div
        style={{ filter: 'url(#gooey-demo-filter)' }}
        className="relative w-44 h-20 flex items-center justify-center"
      >
        <div className="w-11 h-11 rounded-full bg-cyan-400 absolute animate-metaball-left" />
        <div className="w-11 h-11 rounded-full bg-indigo-500 absolute animate-metaball-right" />
      </div>
    </div>
  );
};


/* 8. 플래니터리 오빗 궤도 회전 */
export const MgOrbitRotationDemo: React.FC = () => {
  return (
    <div className="w-full h-40 flex items-center justify-center pt-5 select-none">
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* 중앙 코어 */}
        <div className="w-5 h-5 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50" />
        {/* 내부 궤도 */}
        <div className="absolute w-14 h-14 rounded-full border border-dashed border-indigo-400/40 animate-orbit-spin">
          <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-sm" />
        </div>
        {/* 외부 역방향 궤도 */}
        <div className="absolute inset-0.5 rounded-full border border-slate-700 animate-orbit-reverse">
          <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-pink-400 shadow-sm" />
        </div>
      </div>
    </div>
  );
};


/* 9. 키네틱 웨이브 텍스트 */
export const MgKineticWaveTextDemo: React.FC = () => {
  const { t } = useLocale(); const chars = t("sample.mgKineticWaveText.word").split('');
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center select-none">
      <div className="flex items-center justify-center gap-0.5 text-lg font-black text-white">
        {chars.map((ch, idx) => (
          <span
            key={idx}
            style={{ animationDelay: `${idx * 75}ms` }}
            className="inline-block animate-kinetic-wave"
          >
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        ))}
      </div>
    </div>
  );
};


/* 10. 버티컬 키네틱 텍스트 롤러 */
export const Mg3DTextRollerDemo: React.FC = () => {
  const { t } = useLocale();
  const words = [t("sample.mg3DTextRoller.motion"), t("sample.mg3DTextRoller.graphics"), t("sample.mg3DTextRoller.cinema"), t("sample.mg3DTextRoller.interaction")]; const autoRunning = useDemoAutoplayRunning();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!autoRunning) return; const t = setInterval(() => setIdx((i) => (i + 1) % words.length), 1400);
    return () => clearInterval(t);
  }, [autoRunning]);

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setIdx((i) => (i + 1) % words.length)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIdx((i) => (i + 1) % words.length); } }}
      className="w-full h-40 flex flex-col items-center justify-center cursor-pointer select-none"
    >
      <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
        <span>{t("sample.mg3DTextRoller.create")}</span>
        <div className="h-7 overflow-hidden bg-slate-900 border border-indigo-500/40 rounded-lg px-2.5">
          <div
            style={{
              transform: `translateY(-${idx * 28}px)`,
              transition: 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {words.map((w) => (
              <div
                key={w}
                className="h-7 flex items-center justify-center font-mono text-sm font-black text-indigo-300"
              >
                {w}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


/* 11. 네온 사인 플리커 점등 */
export const MgNeonSignFlickerDemo: React.FC = () => {
  const { t } = useLocale();
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center select-none">
      <div className="px-4 py-2 rounded-xl bg-slate-950 border border-rose-500/30 font-mono text-lg font-black tracking-widest text-rose-400">
        <span>{t("sample.mgNeonSignFlicker.open")}</span>
        <span className="animate-neon-flicker text-rose-300">{t("sample.mgNeonSignFlicker.hours")}</span>
      </div>
    </div>
  );
};


/* 12. 2.5D 멀티레이어 패럴랙스 */
export const MgParallaxDepthDemo: React.FC = () => {
  const { t } = useLocale();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({
          x: (e.clientX - (rect.left + rect.width / 2)) / 6,
          y: (e.clientY - (rect.top + rect.height / 2)) / 6,
        });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      className="relative w-full h-40 flex items-center justify-center overflow-hidden cursor-pointer select-none"
    >
      {/* 배경 레이어 (느림) */}
      <div
        style={{ transform: `translate(${pos.x * 0.4}px, ${pos.y * 0.4}px)` }}
        className="w-40 h-20 rounded-xl bg-slate-900 border border-slate-800 flex items-start justify-end p-2 transition-transform duration-75"
      >
        <span className="text-[9px] text-slate-500 font-mono">{t("sample.mgParallaxDepth.bg04x")}</span>
      </div>
      {/* 중경 레이어 (중간) */}
      <div
        style={{ transform: `translate(${pos.x * 1.1}px, ${pos.y * 1.1}px)` }}
        className="absolute w-28 h-14 rounded-xl bg-indigo-950/90 border border-indigo-500/40 flex items-start justify-end p-1.5 shadow-lg transition-transform duration-75"
      >
        <span className="text-[9px] text-indigo-300 font-mono">{t("sample.mgParallaxDepth.mid11x")}</span>
      </div>
      {/* 전경 레이어 (빠름) */}
      <div
        style={{ transform: `translate(${pos.x * 2.1}px, ${pos.y * 2.1}px)` }}
        className="absolute px-3 py-1.5 rounded-lg bg-cyan-400 text-slate-950 font-black text-xs shadow-xl transition-transform duration-75"
      >{t("sample.mgParallaxDepth.fg21x")}</div>
    </div>
  );
};


/* 13. 카메라 랙 포커스 (초점 심도 전환) */
export const MgRackFocusBlurDemo: React.FC = () => {
  const { t } = useLocale();
  const [focusFront, setFocusFront] = useDemoToggle(true);
  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setFocusFront(!focusFront)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFocusFront(!focusFront); } }}
      className="relative w-full h-40 flex items-center justify-center cursor-pointer select-none px-6 pt-5"
    >
      {/* 배경 피사체 (상단 배지와 겹치지 않도록 top-10 및 z-10 이하로 배치) */}
      <div
        className={`absolute right-7 top-10 px-3.5 py-2 rounded-xl bg-violet-600 text-white font-bold text-xs transition-all duration-500 ${
          !focusFront
            ? 'blur-0 scale-105 opacity-100 z-10 ring-2 ring-violet-300 shadow-xl'
            : 'blur-xs scale-90 opacity-45 z-0'
        }`}
      >{t("demo.backgroundSubjectBack")}</div>
      {/* 전경 피사체 */}
      <div
        className={`absolute left-7 bottom-4 px-3.5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs transition-all duration-500 ${
          focusFront
            ? 'blur-0 scale-105 opacity-100 z-10 ring-2 ring-emerald-200 shadow-xl'
            : 'blur-xs scale-90 opacity-45 z-0'
        }`}
      >{t("demo.foregroundSubjectClickToSwitch")}</div>
    </div>
  );
};


/* 14. 시네마틱 켄 번즈 (줌 & 패닝) */
export const MgKenBurnsPanDemo: React.FC = () => {
  const { t } = useLocale();
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center select-none px-6">
      <div className="relative w-52 h-24 rounded-xl overflow-hidden border border-slate-700">
        <div className="w-full h-full bg-linear-to-br from-indigo-900 via-purple-900 to-amber-700 animate-ken-burns flex items-center justify-center">
          <div className="text-center">
            <span className="text-[10px] font-mono text-amber-200 block">{t("sample.mgKenBurnsPan.cameraPanZoom")}</span>
            <span className="text-xs font-black text-white">{t("sample.mgKenBurnsPan.kenBurnsEffect")}</span>
          </div>
        </div>
        {/* 카메라 뷰파인더 가이드 */}
        <div className="pointer-events-none absolute inset-2 border border-white/25 rounded-sm flex items-start justify-between p-1">
          <span className="text-[8px] font-mono text-rose-400">{t("sample.mgKenBurnsPan.rec")}</span>
        </div>
      </div>
    </div>
  );
};


/* 15. 아이소메트릭 레이어 익스플로드 */
export const MgIsometricExplodeDemo: React.FC = () => { const { t } = useLocale();
  const [isHovering, setIsHovering] = useState(false);
  const [exploded, setExploded] = useDemoToggle(true, isHovering);
  const layers = [
    { label: t("sample.mgIsometricExplode.l1"), color: 'bg-slate-800/95 border-slate-500 text-slate-300' },
    { label: t("sample.mgIsometricExplode.l2"), color: 'bg-indigo-600/85 border-indigo-300 text-white' },
    { label: t("sample.mgIsometricExplode.l3"), color: 'bg-cyan-400/90 border-white text-slate-950' },
  ];
  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setExploded(!exploded)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExploded(!exploded); } }}
      onMouseEnter={() => { setIsHovering(true); setExploded(true); }}
      onMouseLeave={() => { setIsHovering(false); setExploded(false); }}
      className="w-full h-40 flex flex-col items-center justify-center pt-4 cursor-pointer select-none"
    >
      <div className="relative w-24 h-20 flex items-center justify-center perspective-1000 preserve-3d">
        {layers.map((layer, i) => {
          const offsetY = exploded ? (1 - i) * 18 : (1 - i) * 5;
          return (
            <div
              key={layer.label}
              style={{
                transform: `translateY(${offsetY}px) rotateX(55deg) rotateZ(-35deg)`,
                transition: 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
                zIndex: i + 1,
              }}
              className={`absolute w-16 h-16 rounded-xl border ${layer.color} shadow-lg flex items-end justify-end p-1.5 text-[9px] font-mono font-black`}
            >
              {layer.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};


/* 16. 서큘러 아이리스 와이프 전환 */
export const MgIrisCircleWipeDemo: React.FC = () => {
  const { t } = useLocale();
  const [closed, setClosed] = useDemoToggle(false);
  return (
    <button type="button" data-demo-control
      aria-label={t('demo.closeIrisAperture')} aria-pressed={closed}
      onClick={() => setClosed(!closed)}
      className="w-full h-40 flex flex-col items-center justify-center cursor-pointer select-none px-6 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-indigo-500"
    >
      <div className="relative w-52 h-24 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 flex items-center justify-center">
        <span className="text-xs font-bold text-slate-400">{t("demo.scene2ClickToOpen")}</span>
        <div
          style={{
            clipPath: closed ? 'circle(0% at 50% 50%)' : 'circle(120% at 50% 50%)',
            transition: 'clip-path 0.65s cubic-bezier(0.65, 0, 0.35, 1)',
          }}
          className="absolute inset-0 bg-linear-to-r from-indigo-600 to-emerald-500 flex items-center justify-center"
        >
          <span className="text-xs font-black text-white">{t("demo.scene1ClickToCloseIris")}</span>
        </div>
      </div>
    </button>
  );
};


/* 17. RGB 색수차 글리치 */
export const MgRgbChromaticGlitchDemo: React.FC = () => {
  const { t } = useLocale();
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center select-none">
      <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800">
        <span className="font-mono text-lg font-black tracking-wider text-white inline-block animate-rgb-glitch">{t("sample.mgRgbChromaticGlitch.cyberGlitch")}</span>
      </div>
    </div>
  );
};


/* 18. 스피드 라인 & 모션 스트리크 */
export const MgSpeedLinesStreakDemo: React.FC = () => {
  const { t } = useLocale();
  const lines = [
    { top: '20%', delay: '0ms', width: 'w-20' },
    { top: '38%', delay: '220ms', width: 'w-28' },
    { top: '58%', delay: '110ms', width: 'w-16' },
    { top: '78%', delay: '360ms', width: 'w-24' },
  ];

  return (
    <div className="relative w-full h-40 flex items-center justify-center overflow-hidden select-none">
      {lines.map((l, i) => (
        <span
          key={i}
          style={{ top: l.top, animationDelay: l.delay }}
          className={`pointer-events-none absolute left-0 h-0.5 ${l.width} bg-linear-to-r from-transparent via-cyan-400 to-white animate-speed-streak`}
        />
      ))}
      <div className="relative z-10 px-4 py-1.5 rounded-full bg-indigo-600 text-white font-black text-xs italic shadow-lg">{t("sample.mgSpeedLinesStreak.hyperSpeed")}</div>
    </div>
  );
};


/* 19. 오로라 메쉬 그라데이션 */
export const MgAuroraMeshDemo: React.FC = () => {
  const { t } = useLocale();
  return (
    <div className="relative w-full h-40 flex items-center justify-center overflow-hidden select-none bg-slate-950">
      <div className="w-32 h-32 rounded-full bg-indigo-500/60 blur-2xl absolute animate-aurora-1" />
      <div className="w-32 h-32 rounded-full bg-emerald-400/50 blur-2xl absolute animate-aurora-2" />
      <div className="w-28 h-28 rounded-full bg-fuchsia-500/50 blur-2xl absolute animate-glass-orb-1" />
      <span className="relative z-10 text-xs font-black tracking-wider text-white/90 bg-slate-950/40 backdrop-blur-xs px-3 py-1 rounded-full border border-white/15">{t("sample.mgAuroraMesh.auroraMesh")}</span>
    </div>
  );
};


/* 20. 컨스텔레이션 파티클 네트워크 */
export const MgParticleNetworkDemo: React.FC = () => {
  const [hoverIdx, setHoverIdx] = useState<number>(2);
  const nodes = [
    { x: 25, y: 28 },
    { x: 65, y: 22 },
    { x: 48, y: 55 },
    { x: 82, y: 65 },
    { x: 20, y: 74 },
  ];
  const edges = [
    [0, 1],
    [0, 2],
    [1, 2],
    [1, 3],
    [2, 3],
    [2, 4],
    [0, 4],
  ];

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setHoverIdx((h) => (h + 1) % nodes.length)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setHoverIdx((h) => (h + 1) % nodes.length); } }}
      className="relative w-full h-40 flex items-center justify-center cursor-pointer select-none"
    >
      <svg className="w-56 h-32" viewBox="0 0 100 100">
        {edges.map(([a, b], i) => {
          const isHighlighted = a === hoverIdx || b === hoverIdx;
          return (
            <line
              key={i}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              stroke={isHighlighted ? '#38bdf8' : '#334155'}
              strokeWidth={isHighlighted ? '1.8' : '1'}
            />
          );
        })}
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={i === hoverIdx ? 4.5 : 3}
            fill={i === hoverIdx ? '#38bdf8' : '#818cf8'}
            onMouseEnter={() => setHoverIdx(i)}
          />
        ))}
      </svg>
    </div>
  );
};


/* 21. 인터랙티브 도트 매트릭스 그리드 */
export const MgDotMatrixGridDemo: React.FC = () => {
  const { t } = useLocale();
  const [activeCol, setActiveCol] = useState(4);
  const cols = 9;
  const rows = 4;

  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const col = Math.floor(((e.clientX - rect.left) / rect.width) * cols);
        setActiveCol(Math.max(0, Math.min(cols - 1, col)));
      }}
      className="w-full h-40 flex flex-col items-center justify-center cursor-pointer select-none"
    >
      <div role="button" tabIndex={0} aria-label={t('demo.dotMatrixColumn', { column: activeCol + 1, total: cols })} onKeyDown={(e) => { if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveCol((c) => (c + 1) % cols); } else if (e.key === 'ArrowLeft') { e.preventDefault(); setActiveCol((c) => (c + cols - 1) % cols); } }} className="grid grid-cols-9 gap-2.5 p-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
        {Array.from({ length: rows * cols }).map((_, idx) => {
          const c = idx % cols;
          const dist = Math.abs(c - activeCol);
          const active = dist <= 1;
          return (
            <span
              key={idx}
              style={{
                transform: active ? `scale(${dist === 0 ? 1.8 : 1.35})` : 'scale(1)',
              }}
              className={`w-2 h-2 rounded-full transition-all duration-150 ${
                dist === 0
                  ? 'bg-cyan-400 shadow-xs shadow-cyan-400'
                  : dist === 1
                  ? 'bg-indigo-400'
                  : 'bg-slate-300 dark:bg-slate-800'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};


/* 22. 볼류메트릭 스포트라이트 빔 (God Rays) */
export const MgGodRayBeamDemo: React.FC = () => {
  return (
    <div className="relative w-full h-40 flex flex-col items-center justify-center overflow-hidden select-none bg-slate-950">
      <div
        style={{
          background:
            'conic-gradient(from 155deg at 50% 0%, transparent 0deg, rgba(56,189,248,0.35) 25deg, transparent 50deg)',
        }}
        className="pointer-events-none absolute -top-6 w-64 h-48 blur-md animate-beam-sway"
      />
    </div>
  );
};


/* [그래픽 +1] 소나 레이더 스윕 스캐너 (Sonar Radar Sweep Scanner) */
export const MgRadarSonarSweepDemo: React.FC = () => { const autoRunning = useDemoAutoplayRunning();
  const [angle, setAngle] = useState(0);
  const [fast, setFast] = useState(false);

  useEffect(() => {
    if (!autoRunning) return;
    const id = setInterval(() => {
      setAngle((a) => (a + (fast ? 10 : 6)) % 360);
    }, 40);
    return () => clearInterval(id);
  }, [fast, autoRunning]);

  const blips = [
    { x: 68, y: 28, deg: 45 },
    { x: 74, y: 70, deg: 135 },
    { x: 26, y: 66, deg: 220 },
  ];

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setFast((f) => !f)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFast((f) => !f); } }}
      className="w-full h-40 flex items-center justify-center pt-5 cursor-pointer select-none"
    >
      <div className="relative w-24 h-24 rounded-full bg-emerald-950/60 border border-emerald-500/45 overflow-hidden flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.18)]">
        {/* 동심원 & 십자선 */}
        <div className="absolute w-16 h-16 rounded-full border border-emerald-500/25 pointer-events-none" />
        <div className="absolute w-8 h-8 rounded-full border border-emerald-500/25 pointer-events-none" />
        <div className="absolute inset-x-0 h-px bg-emerald-500/20 pointer-events-none" />
        <div className="absolute inset-y-0 w-px bg-emerald-500/20 pointer-events-none" />

        {/* 회전 스캔 콘 + 리딩 레이저 라인 */}
        <div
          style={{
            transform: `rotate(${angle}deg)`,
            background: 'conic-gradient(from 0deg, transparent 70%, rgba(16, 185, 129, 0.55) 100%)',
          }}
          className="absolute inset-0 rounded-full pointer-events-none"
        >
          <div className="absolute left-1/2 top-0 w-0.5 h-1/2 -translate-x-1/2 bg-emerald-300 shadow-[0_0_8px_#6ee7b7]" />
        </div>

        {/* 탐지 타겟 블립 */}
        {blips.map((b, i) => {
          const diff = (angle - b.deg + 360) % 360;
          const active = diff < 105;
          return (
            <span
              key={i}
              style={{ left: `${b.x}%`, top: `${b.y}%` }}
              className={`absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-150 ${
                active
                  ? 'bg-emerald-300 scale-125 shadow-[0_0_8px_#34d399]'
                  : 'bg-emerald-500/25 scale-75'
              }`}
            />
          );
        })}

        <div className="w-1.5 h-1.5 rounded-full bg-emerald-300 shadow-[0_0_6px_#34d399] z-10" />
      </div>
    </div>
  );
};


/* [그래픽 +2] 스태거드 그리드 타일 웨이브 (Staggered Grid Tile Wave) */
export const MgMorphingGridWaveDemo: React.FC = () => { const autoRunning = useDemoAutoplayRunning();
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!autoRunning) return;
    const id = setInterval(() => {
      setTick((t) => (t + 1) % 8);
    }, 260);
    return () => clearInterval(id);
  }, [autoRunning]);

  const rows = 3;
  const cols = 6;

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setTick((t) => (t + 1) % 8)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setTick((t) => (t + 1) % 8); } }}
      className="w-full h-40 flex flex-col items-center justify-center gap-2 pt-5 cursor-pointer select-none"
    >
      <div className="grid grid-cols-6 gap-1.5">
        {Array.from({ length: rows * cols }).map((_, idx) => {
          const r = Math.floor(idx / cols);
          const c = idx % cols;
          const diag = r + c;
          const isWavePeak = diag === tick || diag === (tick + 1) % 8;
          return (
            <div
              key={idx}
              className={`w-5 h-5 rounded-md transition-all duration-300 ${
                isWavePeak
                  ? 'bg-linear-to-br from-cyan-400 to-indigo-500 scale-110 -translate-y-1 shadow-[0_0_10px_rgba(34,211,238,0.5)]'
                  : 'bg-slate-800/80 border border-slate-700/60 scale-90 opacity-60'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};


/* [그래픽 +3] 프리즘 광선 분산 효과 (Optical Prism Light Dispersion) */
export const MgPrismRainbowRefractionDemo: React.FC = () => {
  const [wide, setWide] = useDemoToggle(true);
  const spectrum = [
    { color: '#f43f5e', yEnd: 18 },
    { color: '#fbbf24', yEnd: 30 },
    { color: '#34d399', yEnd: 42 },
    { color: '#22d3ee', yEnd: 54 },
    { color: '#818cf8', yEnd: 66 },
    { color: '#e879f9', yEnd: 78 },
  ];

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setWide((w) => !w)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setWide((w) => !w); } }}
      className="w-full h-40 flex flex-col items-center justify-center pt-5 px-4 cursor-pointer select-none"
    >
      <svg viewBox="0 0 220 92" className="w-full max-w-[220px] h-24 overflow-visible">
        <defs>
          <linearGradient id="prismGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.38)" />
            <stop offset="50%" stopColor="rgba(56,189,248,0.18)" />
            <stop offset="100%" stopColor="rgba(99,102,241,0.32)" />
          </linearGradient>
        </defs>

        {/* 좌측 백색 입사 광선 (좌하단 ➔ 프리즘 좌측 빗변) */}
        <line
          x1="8"
          y1="62"
          x2="92"
          y2="46"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
          className="drop-shadow-[0_0_6px_#ffffff]"
        />

        {/* 프리즘 내부 굴절 브릿지 광선 */}
        <polygon
          points="92,46 126,38 130,56"
          fill="rgba(255,255,255,0.35)"
        />

        {/* 우측 6색 무지개 스펙트럼 분산 빔 */}
        {spectrum.map((ray, i) => {
          const targetY = wide ? ray.yEnd : 48 + (ray.yEnd - 48) * 0.45;
          return (
            <line
              key={i}
              x1="127"
              y1={42 + i * 2.2}
              x2="212"
              y2={targetY}
              stroke={ray.color}
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeOpacity="0.9"
              className="transition-all duration-500"
              style={{ filter: `drop-shadow(0 0 5px ${ray.color})` }}
            />
          );
        })}

        {/* 중앙 삼각 유리 프리즘 (세 변 모두 선명한 유리 테두리 렌더링) */}
        <polygon
          points="110,12 76,78 144,78"
          fill="url(#prismGlassGrad)"
          stroke="rgba(255,255,255,0.65)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};


/* [그래픽 +4] 뉴턴의 요람 물리 진자 (Newton's Cradle Momentum Pendulum) */
export const MgGravityNewtonCradleDemo: React.FC = () => { const autoRunning = useDemoAutoplayRunning();
  // 0: 좌측 스윙 아웃 -> 1: 중앙 충돌 -> 2: 우측 스윙 아웃 -> 3: 중앙 충돌
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);

  useEffect(() => {
    if (!autoRunning) return;
    const id = setInterval(() => {
      setStep((s) => ((s + 1) % 4) as 0 | 1 | 2 | 3);
    }, 320);
    return () => clearInterval(id);
  }, [autoRunning]);

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setStep((s) => ((s + 1) % 4) as 0 | 1 | 2 | 3)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setStep((s) => ((s + 1) % 4) as 0 | 1 | 2 | 3); } }}
      className="w-full h-40 flex flex-col items-center justify-center pt-5 cursor-pointer select-none"
    >
      {/* 상단 고정 지지대 */}
      <div className="w-28 h-1 rounded-full bg-slate-600 shadow-sm" />
      <div className="flex items-start justify-center">
        {[0, 1, 2, 3, 4].map((i) => {
          const isLeft = i === 0;
          const isRight = i === 4;
          const deg = isLeft && step === 0 ? 34 : isRight && step === 2 ? -34 : 0;
          const isSwingingOut = (isLeft && step === 0) || (isRight && step === 2);

          return (
            <div
              key={i}
              style={{
                transform: `rotate(${deg}deg)`,
                transformOrigin: 'top center',
                transitionTimingFunction: isSwingingOut
                  ? 'cubic-bezier(0.215, 0.61, 0.355, 1)'
                  : 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
              }}
              className="flex flex-col items-center transition-transform duration-300"
            >
              <div className="w-px h-10 bg-slate-500/80" />
              <div
                className={`w-4 h-4 rounded-full bg-linear-to-br transition-shadow duration-200 ${
                  isSwingingOut
                    ? 'from-cyan-300 via-indigo-400 to-slate-700 shadow-[0_0_10px_rgba(56,189,248,0.65)]'
                    : 'from-slate-200 via-slate-400 to-slate-700'
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
