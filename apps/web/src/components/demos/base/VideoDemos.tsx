import { useDemoAutoplayRunning } from '../../../hooks/useDemoAutoplay';
import { useLocale } from '../../../i18n/LocaleContext';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles, Check, Zap, Rocket } from 'lucide-react';



/* ============================================================================
 * DOMAIN 5: 🎞️ 모션 영상 & 쇼릴 데모 (16종)
 * ============================================================================ */

/* 1. SaaS 프로덕트 런칭 쇼릴 (3-Scene Sequence) */
export const VdSaasLaunchReelDemo: React.FC = () => { const autoRunning = useDemoAutoplayRunning();
  const { t } = useLocale();
  const [scene, setScene] = useState(0);

  useEffect(() => {
    if (!autoRunning) return;
    const id = setTimeout(() => {
      setScene((s) => (s + 1) % 3);
    }, 1600);
    return () => clearTimeout(id);
  }, [scene, autoRunning]);

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setScene((s) => (s + 1) % 3)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setScene((s) => (s + 1) % 3); } }}
      className="w-full h-40 relative overflow-hidden flex flex-col items-center justify-center pt-5 pb-3 px-5 cursor-pointer select-none bg-linear-to-br from-slate-950 via-indigo-950/60 to-slate-950"
    >
      {scene === 0 && (
        <div className="animate-spring-pop text-center space-y-1">
          <span className="text-[9px] font-mono text-indigo-400 tracking-widest uppercase">{t("sample.vdSaasLaunchReel.scene01Intro")}</span>
          <div className="text-base font-black text-white tracking-tight">{t("sample.vdSaasLaunchReel.workflow")}<span className="text-indigo-400">{t("sample.vdSaasLaunchReel.reimagined")}</span>
          </div>
        </div>
      )}

      {scene === 1 && (
        <div className="animate-spring-pop w-48 bg-slate-900/95 border border-indigo-500/50 rounded-xl p-2.5 shadow-xl shadow-indigo-500/20 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold text-indigo-300">{t("sample.vdSaasLaunchReel.aiDashboard")}</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded-sm bg-emerald-500/20 text-emerald-300 font-bold">
              +142%
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <div className="h-7 rounded-sm bg-indigo-500/30 border border-indigo-400/40" />
            <div className="h-7 rounded-sm bg-violet-500/30 border border-violet-400/40" />
            <div className="h-7 rounded-sm bg-cyan-500/30 border border-cyan-400/40" />
          </div>
        </div>
      )}

      {scene === 2 && (
        <div className="animate-spring-pop flex flex-col items-center gap-1.5">
          <div className="px-3.5 py-1.5 rounded-full bg-indigo-600 text-white text-xs font-black shadow-lg shadow-indigo-500/40 flex items-center gap-1.5">
            <Rocket className="w-3.5 h-3.5" />
            <span>{t("sample.vdSaasLaunchReel.startFreeToday")}</span>
          </div>
          <span className="text-[9px] font-mono text-slate-400">{t("sample.vdSaasLaunchReel.vibeApp")}</span>
        </div>
      )}

      {/* 하단 씬 타임라인 인디케이터 */}
      <div className="absolute bottom-2.5 flex items-center gap-1.5">
        {[0, 1, 2].map((idx) => (
          <span
            key={idx}
            className={`h-1 rounded-full transition-all duration-300 ${
              scene === idx ? 'w-6 bg-indigo-400' : 'w-2 bg-slate-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
};


/* 2. 3D 디바이스 목업 투어 */
export const VdDevice3DSpinDemo: React.FC = () => {
  const { t } = useLocale();
  const [front, setFront] = useState(false); const autoRunning = useDemoAutoplayRunning();

  useEffect(() => {
    if (!autoRunning) return;
    const id = setTimeout(() => {
      setFront((f) => !f);
    }, 1800);
    return () => clearTimeout(id);
  }, [front, autoRunning]);

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setFront((f) => !f)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFront((f) => !f); } }}
      className="w-full h-40 flex items-center justify-center pt-5 cursor-pointer select-none perspective-1000"
    >
      <div
        style={{
          transform: front
            ? 'rotateY(0deg) rotateX(0deg) scale(1.04)'
            : 'rotateY(-28deg) rotateX(14deg) scale(0.94)',
        }}
        className="w-36 h-24 rounded-xl bg-slate-900 border-2 border-slate-700 p-2 shadow-2xl transition-transform duration-700 preserve-3d relative"
      >
        <span aria-hidden="true" className="absolute -right-[3px] top-5 w-[2px] h-4 rounded-r-xs bg-slate-500" /><div className="flex items-center justify-center gap-1 mb-1.5"><span className="w-1.5 h-1.5 rounded-full bg-slate-600" /><div className="w-8 h-1 rounded-full bg-slate-700" /></div>
        <div className="space-y-1.5">
          <div className="h-3 w-2/3 rounded-sm bg-slate-800" />
          <div
            style={{
              transform: front ? 'translateZ(26px) scale(1.06)' : 'translateZ(0px)',
            }}
            className="p-1.5 rounded-lg bg-linear-to-r from-indigo-600 to-violet-600 text-white text-[10px] font-extrabold shadow-lg transition-transform duration-700 flex items-center justify-between"
          >
            <span>{t("demo.paymentApproved")}</span>
            <Check className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
};


/* 3. 인터랙티브 커서 줌 워크스루 */
export const VdAppWalkthroughZoomDemo: React.FC = () => {
  const { t } = useLocale();
  const [step, setStep] = useState(0); const autoRunning = useDemoAutoplayRunning();

  useEffect(() => {
    if (!autoRunning) return;
    const id = setTimeout(() => {
      setStep((s) => (s + 1) % 3);
    }, 1400);
    return () => clearTimeout(id);
  }, [step, autoRunning]);

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setStep((s) => (s + 1) % 3)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setStep((s) => (s + 1) % 3); } }}
      className="w-full h-40 overflow-hidden flex items-center justify-center pt-5 cursor-pointer select-none"
    >
      <div
        style={{
          transform: step === 1 ? 'scale(1.48) translate(-16px, 4px)' : 'scale(1)',
        }}
        className="relative w-48 h-24 rounded-xl bg-slate-900 border border-slate-800 p-3 flex items-center justify-between transition-transform duration-500"
      >
        <div className="space-y-1">
          <div className="w-16 h-2 rounded-sm bg-slate-700" />
          <div className="w-12 h-2 rounded-sm bg-slate-800" />
        </div>

        <div className="relative">
          {step === 1 && (
            <span className="absolute inset-0 rounded-lg border-2 border-amber-400 animate-ping pointer-events-none" />
          )}
          <div
            className={`px-2.5 py-1.5 rounded-lg text-[10px] font-extrabold transition-all ${
              step >= 1
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/40 scale-105'
                : 'bg-indigo-600 text-white'
            }`}
          >
            {step >= 1 ? t("demo.deployed") : t("sample.vdAppWalkthroughZoom.deploy")}
          </div>
        </div>

        {/* 가상 마우스 포인터 */}
        <div
          style={{
            transform:
              step === 0
                ? 'translate(24px, 54px)'
                : step === 1
                ? 'translate(136px, 42px) scale(0.85)'
                : 'translate(148px, 52px)',
          }}
          className="absolute left-0 top-0 pointer-events-none transition-transform duration-500 z-10"
        >
          <div className="w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-white shadow-md" />
        </div>
      </div>
    </div>
  );
};


/* 4. 멀티 스크린 스플릿 쇼릴 (3단계: 교차 진입 -> 정렬 -> 타이틀 오버레이) */
export const VdSplitPromoReelDemo: React.FC = () => {
  const { t } = useLocale();
  const [stage, setStage] = useState(1); const autoRunning = useDemoAutoplayRunning();

  useEffect(() => {
    if (!autoRunning) return;
    const id = setTimeout(() => {
      setStage((s) => (s + 1) % 3);
    }, 1300);
    return () => clearTimeout(id);
  }, [stage, autoRunning]);

  const cols = [
    {
      label: t("sample.vdSplitPromoReel.design"),
      bg: 'bg-indigo-600',
      offset: stage === 0 ? '-translate-y-full' : 'translate-y-0',
    },
    {
      label: t("sample.vdSplitPromoReel.motion"),
      bg: 'bg-violet-600',
      offset: stage === 0 ? 'translate-y-full' : 'translate-y-0',
    },
    {
      label: t("sample.vdSplitPromoReel.launch"),
      bg: 'bg-cyan-600',
      offset: stage === 0 ? '-translate-y-full' : 'translate-y-0',
    },
  ];

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setStage((s) => (s + 1) % 3)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setStage((s) => (s + 1) % 3); } }}
      className="w-full h-40 flex items-center justify-center pt-5 px-6 cursor-pointer select-none overflow-hidden"
    >
      <div className="relative w-full h-24 grid grid-cols-3 gap-1.5 overflow-hidden rounded-xl p-1.5 bg-slate-900 border border-slate-800">
        {cols.map((c) => (
          <div
            key={c.label}
            className={`${c.bg} ${c.offset} ${
              stage === 2 ? 'opacity-20 scale-95' : 'opacity-100'
            } rounded-lg flex items-center justify-center text-[10px] font-black text-white tracking-wider transition-all duration-300`}
          >
            {c.label}
          </div>
        ))}
        {stage === 2 && (
          <div className="absolute inset-0 z-10 bg-slate-950 flex flex-col items-center justify-center gap-1.5 rounded-xl border border-indigo-500/50 shadow-xl">
            <div className="animate-spring-pop flex flex-col items-center gap-1">
              <span className="px-3.5 py-1.5 rounded-full bg-indigo-600 text-white text-xs font-black tracking-tight shadow-lg flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />{t("sample.vdSplitPromoReel.allInOneReel")}</span>
              <span className="text-[9px] font-mono font-bold text-indigo-400 tracking-wider">{t("sample.vdSplitPromoReel.unifiedMasterCut")}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


/* 5. 스톰프 비트 타이포그래피 (상단 배지 가독성을 해치지 않는 16:9 와이드 프레임 내 배경 반전 + 타격 모션) */
export const VdStompBeatTypoDemo: React.FC = () => { const { t } = useLocale(); const autoRunning = useDemoAutoplayRunning();
  const beats = [
    { word: t("sample.vdStompBeatTypo.think"), bg: 'bg-slate-900 border-slate-700', text: 'text-white' },
    { word: t("sample.vdStompBeatTypo.build"), bg: 'bg-indigo-600 border-indigo-400', text: 'text-white' },
    { word: t("sample.vdStompBeatTypo.ship"), bg: 'bg-amber-400 border-amber-300', text: 'text-slate-950' },
    { word: t("sample.vdStompBeatTypo.fast"), bg: 'bg-white border-white', text: 'text-slate-950' },
  ];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!autoRunning) return;
    const id = setTimeout(() => {
      setIdx((i) => (i + 1) % beats.length);
    }, 750);
    return () => clearTimeout(id);
  }, [idx, beats.length, autoRunning]);

  const cur = beats[idx];

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setIdx((i) => (i + 1) % beats.length)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIdx((i) => (i + 1) % beats.length); } }}
      className="w-full h-40 flex items-center justify-center pt-5 px-6 cursor-pointer select-none"
    >
      <div
        className={`w-48 h-24 rounded-xl border flex items-center justify-center overflow-hidden shadow-xl transition-colors duration-100 ${cur.bg}`}
      >
        <span
          key={cur.word}
          className={`text-2xl font-black tracking-tighter animate-stomp-hit ${cur.text}`}
        >
          {cur.word}
        </span>
      </div>
    </div>
  );
};


/* 6. 하이라이트 마커 스와이프 씬 (단방향 좌➔우 스와이프 리빌, 역방향 후진 버그 수정) */
export const VdHighlightSwipeRevealDemo: React.FC = () => { const autoRunning = useDemoAutoplayRunning();
  const { t } = useLocale();
  // phase 0: 왼쪽 대기(숨김), phase 1: 마커 바가 덮음, phase 2: 오른쪽으로 빠지며 텍스트 리빌
  const [phase, setPhase] = useState(2);

  useEffect(() => {
    if (!autoRunning) return;
    const delays = [120, 420, 1600];
    const id = setTimeout(() => {
      setPhase((p) => (p + 1) % 3);
    }, delays[phase]);
    return () => clearTimeout(id);
  }, [phase, autoRunning]);

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setPhase(0)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPhase(0); } }}
      className="w-full h-40 flex flex-col items-center justify-center gap-2 pt-5 cursor-pointer select-none"
    >
      <div className="relative overflow-hidden rounded-lg px-4 py-1.5 bg-slate-900 border border-slate-800">
        <span
          className={`text-sm font-black tracking-tight text-white transition-opacity duration-150 ${
            phase >= 2 ? 'opacity-100' : 'opacity-0'
          }`}
        >{t("sample.vdHighlightSwipeReveal.headline")}</span>
        <div
          style={{
            transform:
              phase === 0
                ? 'translateX(-102%)'
                : phase === 1
                ? 'translateX(0%)'
                : 'translateX(102%)',
          }}
          className={`absolute inset-0 bg-linear-to-r from-indigo-500 via-fuchsia-500 to-amber-400 ${
            phase === 0 ? 'transition-none' : 'transition-transform duration-300 ease-out'
          }`}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-1 px-3">
        {[t("sample.vdHighlightSwipeReveal.remotion"), t("sample.vdHighlightSwipeReveal.afterEffects"), t("sample.vdHighlightSwipeReveal.showreel")].map((t, i) => (
          <span
            key={t}
            style={{ transitionDelay: phase === 2 ? `${i * 90}ms` : '0ms' }}
            className={`text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono transition-all duration-300 ${
              phase === 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5'
            }`}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};


/* 7. 에너지틱 카운트다운 오프닝 */
export const VdCountdownEnergeticIntroDemo: React.FC = () => {
  const { t } = useLocale(); const steps = ['3', '2', '1', t("sample.vdCountdownEnergeticIntro.live")]; const autoRunning = useDemoAutoplayRunning();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!autoRunning) return;
    const id = setTimeout(() => {
      setIdx((i) => (i + 1) % steps.length);
    }, idx === 3 ? 1300 : 800);
    return () => clearTimeout(id);
  }, [idx, steps.length, autoRunning]);

  const isLive = idx === 3;

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setIdx((i) => (i + 1) % steps.length)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIdx((i) => (i + 1) % steps.length); } }}
      className="w-full h-40 flex items-center justify-center pt-5 cursor-pointer select-none"
    >
      <div className="relative w-20 h-20 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-500/60 animate-orbit-spin" />
        <div
          key={`ring-${idx}`}
          className="absolute inset-1 rounded-full border border-indigo-400/50 animate-heart-ring pointer-events-none"
        />
        <div
          key={steps[idx]}
          className={`animate-spring-pop font-black ${
            isLive
              ? 'px-3 py-1 rounded-full bg-rose-500 text-white text-xs tracking-wider shadow-lg shadow-rose-500/40'
              : 'text-2xl text-white font-mono'
          }`}
        >
          {steps[idx]}
        </div>
      </div>
    </div>
  );
};


/* 8. 메신저 대화 빌드업 씬 (고정 높이 스테이지로 말풍선 추가 시 상하 점프 현상 제거) */
export const VdChatStorySequenceDemo: React.FC = () => { const autoRunning = useDemoAutoplayRunning();
  const { t } = useLocale();
  const [step, setStep] = useState(2);

  useEffect(() => {
    if (!autoRunning) return;
    const id = setTimeout(() => {
      setStep((s) => (s + 1) % 3);
    }, 1300);
    return () => clearTimeout(id);
  }, [step, autoRunning]);

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setStep((s) => (s + 1) % 3)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setStep((s) => (s + 1) % 3); } }}
      className="w-full h-40 flex items-center justify-center px-6 pt-5 cursor-pointer select-none"
    >
      <div className="w-full max-w-[220px] h-20 flex flex-col justify-start gap-2">
        {/* Step 0+: 사용자 질문 말풍선 (상단 고정) */}
        <div
          key={step === 0 ? 'q-pop' : 'q-stay'}
          className={`self-end px-3 py-1 rounded-2xl rounded-br-sm bg-indigo-600 text-white text-[11px] font-bold shadow-md ${
            step === 0 ? 'animate-spring-pop' : ''
          }`}
        >{t("demo.createALaunchShowreel")}</div>

        {/* Step 1: 타이핑 인디케이터 */}
        {step === 1 && (
          <div className="self-start px-3 py-1.5 rounded-2xl rounded-bl-sm bg-slate-800 text-slate-300 text-[11px] font-mono flex items-center gap-1 animate-spring-pop">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" />
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:120ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:240ms]" />
          </div>
        )}

        {/* Step 2: 완성 카드 응답 */}
        {step === 2 && (
          <div className="self-start px-3 py-1.5 rounded-xl bg-slate-900 border border-emerald-500/50 text-emerald-300 text-[11px] font-bold flex items-center gap-1.5 animate-spring-pop shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{t("demo.chat.resultReady")}</span>
          </div>
        )}
      </div>
    </div>
  );
};


/* 9. 다이내믹 차트 성장 시퀀스 */
export const VdAnimatedBarRaceDemo: React.FC = () => { const autoRunning = useDemoAutoplayRunning();
  const [active, setActive] = useState(true);
  const heights = [28, 42, 58, 76, 100];

  useEffect(() => {
    if (!autoRunning) return;
    const id = setTimeout(() => {
      setActive((a) => !a);
    }, active ? 2000 : 700);
    return () => clearTimeout(id);
  }, [active, autoRunning]);

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setActive((a) => !a)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive((a) => !a); } }}
      className="w-full h-40 flex flex-col items-center justify-end pb-4 pt-8 px-8 cursor-pointer select-none"
    >
      <div className="w-full flex items-end justify-between gap-2.5 h-24 border-b border-slate-800 px-2">
        {heights.map((h, i) => (
          <div key={i} className="relative flex-1 flex flex-col items-center justify-end h-full">
            {i === 4 && active && (
              <span className="absolute -top-5 px-1.5 py-0.5 rounded-sm bg-emerald-500 text-slate-950 text-[9px] font-black animate-spring-pop whitespace-nowrap">
                +340%
              </span>
            )}
            <div
              style={{
                height: active ? `${h}%` : '12%',
                transitionDelay: active ? `${i * 75}ms` : '0ms',
              }}
              className={`w-full rounded-t-md transition-all duration-500 ${
                i === 4
                  ? 'bg-linear-to-t from-indigo-600 to-emerald-400'
                  : 'bg-slate-300 dark:bg-slate-700'
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};


/* 10. KPI 메트릭 리빌 시퀀스 (자동 재생 루프 + 실제 숫자 카운트업 롤링 구현) */
export const VdKpiCounterExplosionDemo: React.FC = () => { const { t } = useLocale(); const autoRunning = useDemoAutoplayRunning();
  const [progress, setProgress] = useState(1); // 0 ~ 1
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    let rafId = 0;
    const start = performance.now();
    const duration = 900; if (!autoRunning) { setProgress(1); return; }

    setProgress(0);
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased);
      if (p < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };
    rafId = requestAnimationFrame(tick);

    const loopTimer = setTimeout(() => {
      setCycle((c) => c + 1);
    }, 2800);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(loopTimer);
    };
  }, [cycle, autoRunning]);

  const metrics = [
    {
      label: t("sample.vdKpiCounterExplosion.uptime"),
      val: `${(99.9 * progress).toFixed(1)}%`,
      pct: Math.round(92 * progress),
      color: 'text-emerald-400',
    },
    {
      label: t("sample.vdKpiCounterExplosion.speed"),
      val: `${(12.4 * progress).toFixed(1)}x`,
      pct: Math.round(82 * progress),
      color: 'text-indigo-400',
    },
    {
      label: t("sample.vdKpiCounterExplosion.latency"),
      val: `${(0.18 * progress).toFixed(2)}s`,
      pct: Math.round(74 * progress),
      color: 'text-amber-600 dark:text-amber-300',
    },
  ];

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setCycle((c) => c + 1)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setCycle((c) => c + 1); } }}
      className="w-full h-40 flex items-center justify-center gap-2 px-4 pt-5 cursor-pointer select-none"
    >
      {metrics.map((m) => (
        <div
          key={m.label}
          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-2.5 shadow-md"
        >
          <div className="text-[9px] text-slate-400 font-semibold">{m.label}</div>
          <div className={`text-sm font-black font-mono mt-0.5 ${m.color}`}>
            {m.val}
          </div>
          <div className="w-full h-1 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
            <div
              style={{ width: `${m.pct}%` }}
              className="h-full bg-indigo-500 rounded-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
};


/* 11. 데이터 파이프라인 플로우 씬 (단방향 좌➔우 광선 패킷 이동, 역주행 버그 수정) */
export const VdNodeFlowPipelineDemo: React.FC = () => {
  // step 0: Input(좌), step 1: AI Core(중), step 2: Render(우), step 3: 순간 리셋 대기
  const [step, setStep] = useState(0);
  const { t } = useLocale(); const nodes = [t("sample.vdNodeFlowPipeline.input"), t("sample.vdNodeFlowPipeline.aiCore"), t("sample.vdNodeFlowPipeline.render")]; const autoRunning = useDemoAutoplayRunning();

  useEffect(() => {
    if (!autoRunning) return;
    const delay = step === 3 ? 80 : 950;
    const id = setTimeout(() => {
      setStep((s) => (s + 1) % 4);
    }, delay);
    return () => clearTimeout(id);
  }, [step, autoRunning]);

  const activeNode = step === 3 ? 0 : step;
  const packetLeft =
    step === 0 || step === 3 ? '12%' : step === 1 ? '48%' : '82%';

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setStep((s) => (s + 1) % 3)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setStep((s) => (s + 1) % 3); } }}
      className="w-full h-40 flex items-center justify-center px-6 pt-5 cursor-pointer select-none"
    >
      <div className="flex items-center w-full justify-between relative">
        <div className="absolute left-6 right-6 h-0.5 bg-slate-800 top-1/2 -translate-y-1/2" />
        <div
          style={{ left: packetLeft }}
          className={`w-6 h-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/80 absolute top-1/2 -translate-y-1/2 ${
            step === 3 || step === 0
              ? 'transition-none opacity-0'
              : 'transition-all duration-500 opacity-100'
          }`}
        />

        {nodes.map((label, i) => {
          const isLit = activeNode === i;
          return (
            <div
              key={label}
              className={`relative z-10 px-3 py-2 rounded-xl border text-[10px] font-extrabold transition-all duration-300 ${
                isLit
                  ? 'bg-indigo-600 text-white border-cyan-400 shadow-lg shadow-indigo-500/40 scale-110'
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
};


/* 12. 멀티 링 게이지 인포그래픽 (자동 충전 루프 애니메이션 추가) */
export const VdCircularRingDashboardDemo: React.FC = () => { const autoRunning = useDemoAutoplayRunning();
  const { t } = useLocale();
  const [filled, setFilled] = useState(true);

  useEffect(() => {
    if (!autoRunning) return;
    const id = setTimeout(() => {
      setFilled((f) => !f);
    }, filled ? 2200 : 750);
    return () => clearTimeout(id);
  }, [filled, autoRunning]);

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setFilled((f) => !f)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFilled((f) => !f); } }}
      className="w-full h-40 flex items-center justify-center gap-4 pt-5 cursor-pointer select-none"
    >
      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
        {/* 외곽 링 */}
        <circle cx="40" cy="40" r="32" stroke="#1e293b" strokeWidth="6" fill="none" />
        <circle
          cx="40"
          cy="40"
          r="32"
          stroke="#6366f1"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="201"
          strokeDashoffset={filled ? '24' : '201'}
          className="transition-all duration-700"
        />
        {/* 중간 링 */}
        <circle cx="40" cy="40" r="23" stroke="#1e293b" strokeWidth="6" fill="none" />
        <circle
          cx="40"
          cy="40"
          r="23"
          stroke="#10b981"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="145"
          strokeDashoffset={filled ? '32' : '145'}
          className="transition-all duration-700 delay-75"
        />
        {/* 내부 링 */}
        <circle cx="40" cy="40" r="14" stroke="#1e293b" strokeWidth="6" fill="none" />
        <circle
          cx="40"
          cy="40"
          r="14"
          stroke="#f59e0b"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="88"
          strokeDashoffset={filled ? '28' : '88'}
          className="transition-all duration-700 delay-150"
        />
      </svg>

      <div className="space-y-1 text-[10px] font-mono">
        <div className="text-indigo-400 font-bold">{t("sample.vdCircularRingDashboard.reach")}{filled ? '88%' : '0%'}
        </div>
        <div className="text-emerald-400 font-bold">{t("sample.vdCircularRingDashboard.conv")}{filled ? '78%' : '0%'}
        </div>
        <div className="text-amber-400 font-bold">{t("sample.vdCircularRingDashboard.ret")}{filled ? '68%' : '0%'}
        </div>
      </div>
    </div>
  );
};


/* 13. 모던 로어써드 방송 자막 (Broadcast Lower Third) */
export const VdLowerThirdBannerDemo: React.FC = () => { const autoRunning = useDemoAutoplayRunning();
  const { t } = useLocale();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!autoRunning) return;
    const id = setTimeout(() => {
      setVisible((v) => !v);
    }, visible ? 2200 : 850);
    return () => clearTimeout(id);
  }, [visible, autoRunning]);

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setVisible((v) => !v)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setVisible((v) => !v); } }}
      className="w-full h-40 flex items-end justify-start pb-5 pl-6 pt-6 cursor-pointer select-none bg-linear-to-tr from-slate-950 via-slate-900 to-slate-950"
    >
      <div className="flex items-stretch gap-2">
        <div
          className={`w-1.5 rounded-full bg-indigo-500 transition-transform duration-300 origin-bottom ${
            visible ? 'scale-y-100' : 'scale-y-0'
          }`}
        />
        <div className="overflow-hidden space-y-1">
          <div
            className={`px-3 py-1 bg-white text-slate-950 text-xs font-black tracking-tight rounded-r-lg transition-transform duration-500 ${
              visible ? 'translate-x-0' : '-translate-x-full'
            }`}
          >{t("sample.vdLowerThirdBanner.alexKimProductLead")}</div>
          <div
            className={`px-2.5 py-0.5 bg-indigo-600 text-white text-[10px] font-bold rounded-r-md w-fit transition-transform duration-500 delay-100 ${
              visible ? 'translate-x-0' : '-translate-x-full'
            }`}
          >{t("sample.vdLowerThirdBanner.keynote2026Live")}</div>
        </div>
      </div>
    </div>
  );
};


/* 14. 다이어고널 멀티 와이프 전환 (3겹 슬라이스 + 역방향 복귀 시 transition-none 처리 + 자동 전환) */
export const VdDiagonalShutterWipeDemo: React.FC = () => { const autoRunning = useDemoAutoplayRunning();
  const { t } = useLocale();
  const [sceneB, setSceneB] = useState(false);
  // phase: 'idle' (좌측 대기, transition-none) | 'wiping' (우측 끝으로 이동, transition-transform)
  const [phase, setPhase] = useState<'idle' | 'wiping'>('idle');
  const timersRef = useRef<number[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
  };

  const triggerWipe = useCallback(() => {
    clearTimers();
    setPhase('wiping');
    const t1 = window.setTimeout(() => setSceneB((b) => !b), 280);
    const t2 = window.setTimeout(() => setPhase('idle'), 720);
    timersRef.current.push(t1, t2);
  }, []);

  useEffect(() => {
    if (!autoRunning) return () => clearTimers(); const interval = window.setInterval(() => {
      triggerWipe();
    }, 2600);
    return () => {
      window.clearInterval(interval);
      clearTimers();
    };
  }, [triggerWipe, autoRunning]);

  const layers = [
    { color: 'bg-indigo-600', delay: '0ms' },
    { color: 'bg-fuchsia-500', delay: '70ms' },
    { color: 'bg-cyan-400', delay: '140ms' },
  ];

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={triggerWipe} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); triggerWipe(); } }}
      className={`w-full h-40 relative overflow-hidden flex items-center justify-center pt-5 cursor-pointer select-none transition-colors ${
        sceneB ? 'bg-indigo-950/80' : 'bg-slate-950'
      }`}
    >
      <div className="text-center">
        <span className="text-[10px] font-mono text-indigo-400 block">
          {sceneB ? t("sample.vdDiagonalShutterWipe.scene02OnAir") : t("sample.vdDiagonalShutterWipe.scene01Intro")}
        </span>
        <span className="text-sm font-black text-white">
          {sceneB ? t("sample.vdDiagonalShutterWipe.nextChapter") : t("sample.vdDiagonalShutterWipe.stingerWipe")}
        </span>
      </div>

      {/* 3겹 대각선 와이프 슬라이스 (복귀 시 transition-none으로 역방향 후진 방지) */}
      {layers.map((layer) => (
        <div
          key={layer.color}
          style={{
            transform:
              phase === 'wiping'
                ? 'translateX(150%) skewX(-18deg)'
                : 'translateX(-150%) skewX(-18deg)',
            transitionDelay: phase === 'wiping' ? layer.delay : '0ms',
          }}
          className={`absolute inset-y-0 -left-12 w-full ${layer.color} pointer-events-none ${
            phase === 'wiping' ? 'transition-transform duration-500 ease-in-out' : 'transition-none'
          }`}
        />
      ))}
    </div>
  );
};


/* 15. 네온 로고 스팅어 아웃트로 (광선 충돌 ➔ 충격파 링 ➔ 로고 & 자간 확장 3단계 시퀀스) */
export const VdLogoStingerOutroDemo: React.FC = () => {
  const { t } = useLocale();
  const [stage, setStage] = useState(2); const autoRunning = useDemoAutoplayRunning();

  useEffect(() => {
    if (!autoRunning) return;
    const delays = [450, 500, 1800];
    const id = setTimeout(() => {
      setStage((s) => (s + 1) % 3);
    }, delays[stage]);
    return () => clearTimeout(id);
  }, [stage, autoRunning]);

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setStage(0)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setStage(0); } }}
      className="w-full h-40 relative overflow-hidden flex flex-col items-center justify-center pt-5 cursor-pointer select-none"
    >
      {/* Stage 0: 좌우에서 중앙으로 날아오는 네온 광선 */}
      <div
        style={{
          transform: stage === 0 ? 'translateX(-42px) scaleX(1)' : 'translateX(0px) scaleX(0.2)',
          opacity: stage === 0 ? 1 : 0,
        }}
        className="absolute h-1 w-20 rounded-full bg-linear-to-r from-transparent to-cyan-400 transition-all duration-300 pointer-events-none"
      />
      <div
        style={{
          transform: stage === 0 ? 'translateX(42px) scaleX(1)' : 'translateX(0px) scaleX(0.2)',
          opacity: stage === 0 ? 1 : 0,
        }}
        className="absolute h-1 w-20 rounded-full bg-linear-to-l from-transparent to-fuchsia-400 transition-all duration-300 pointer-events-none"
      />

      {/* Stage 1: 중앙 충돌 쇼크웨이브 링 */}
      {stage >= 1 && (
        <div
          key={`wave-${stage}`}
          className="absolute w-14 h-14 rounded-full border-2 border-cyan-400/80 animate-heart-ring pointer-events-none"
        />
      )}

      {/* Stage 1~2: 중앙 로고 리빌 및 자간 확장 */}
      <div
        className={`relative z-10 flex flex-col items-center gap-1.5 transition-all duration-500 ${
          stage >= 1 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}
      >
        <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-xl shadow-indigo-500/40 border border-white/20">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <span
          className={`text-[10px] font-black text-white uppercase transition-all duration-500 ${
            stage === 2 ? 'tracking-[0.26em]' : 'tracking-tight'
          }`}
        >{t("sample.vdLogoStingerOutro.vibeStudio")}</span>
      </div>
    </div>
  );
};


/* 16. 오디오 스펙트럼 비주얼라이저 (실제 주파수 바 상하 율동 + 실시간 재생 타임코드 진행) */
export const VdAudioSpectrumVisualizerDemo: React.FC = () => { const autoRunning = useDemoAutoplayRunning();
  const { t } = useLocale();
  const [playing, setPlaying] = useState(true);
  const [seconds, setSeconds] = useState(84);
  const bars = [45, 75, 95, 60, 85, 100, 70, 50, 90, 100, 65, 80, 55, 78, 60, 42];

  useEffect(() => {
    if (!playing || !autoRunning) return;
    const id = setInterval(() => {
      setSeconds((s) => (s >= 225 ? 0 : s + 1));
    }, 1000);
    return () => clearInterval(id);
  }, [playing, autoRunning]);

  const fmt = (sec: number) => {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setPlaying((p) => !p)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPlaying((p) => !p); } }}
      className="w-full h-40 flex flex-col items-center justify-center gap-2.5 pt-6 px-6 cursor-pointer select-none"
    >
      <div className="flex items-end justify-center gap-1 h-14 w-full max-w-[190px]">
        {bars.map((h, i) => (
          <div
            key={i}
            style={{
              height: `${h}%`,
              animationDelay: `${(i % 5) * 130}ms`,
              animationDuration: `${650 + (i % 4) * 140}ms`,
              animationPlayState: playing ? 'running' : 'paused',
            }}
            className={`flex-1 rounded-full bg-linear-to-t from-indigo-600 via-violet-500 to-cyan-400 origin-bottom animate-spectrum-bar transition-opacity duration-200 ${
              playing ? 'opacity-100' : 'opacity-70'
            }`}
          />
        ))}
      </div>

      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
        <span
          className={`px-1.5 py-0.5 rounded font-bold ${
            playing
              ? 'bg-rose-500/20 text-rose-400'
              : 'bg-slate-800 text-slate-400'
          }`}
        >
          {playing ? t("sample.vdAudioSpectrumVisualizer.audioOn") : t("sample.vdAudioSpectrumVisualizer.paused")}
        </span>
        <span>{fmt(seconds)} / 03:45</span>
      </div>
    </div>
  );
};


/* [모션 영상 +1] 사이버 글리치 컷 티저 릴 (Glitch Cut Spec Teaser Reel) */
export const VdGlitchCutReelDemo: React.FC = () => { const autoRunning = useDemoAutoplayRunning();
  const { t } = useLocale();
  const [idx, setIdx] = useState(0);
  const [glitching, setGlitching] = useState(false);
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>());
  const delay = (callback: () => void, milliseconds: number) => {
    const timer = setTimeout(() => { timers.current.delete(timer); callback(); }, milliseconds);
    timers.current.add(timer);
  };
  useEffect(() => () => { timers.current.forEach(clearTimeout); timers.current.clear(); }, []);

  const specs = [
    { tag: 'SCENE 01 // DISPLAY', title: '240Hz OLED', accent: 'text-cyan-300 border-cyan-400/50' },
    { tag: 'SCENE 02 // SPEED', title: '0.03ms GTG', accent: 'text-rose-300 border-rose-400/50' },
    { tag: 'SCENE 03 // CORE', title: 'NEURAL AI+', accent: 'text-amber-300 border-amber-400/50' },
  ];

  useEffect(() => {
    if (!autoRunning) { setGlitching(false); return; }
    const id = setInterval(() => {
      setGlitching(true);
      delay(() => {
        setIdx((i) => (i + 1) % specs.length);
      }, 90);
      delay(() => {
        setGlitching(false);
      }, 220);
    }, 1500);
    return () => { clearInterval(id); timers.current.forEach(clearTimeout); timers.current.clear(); };
  }, [specs.length, autoRunning]);

  const cur = specs[idx];

  return (
    <div data-demo-control
      role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setGlitching(true); setIdx((i) => (i + 1) % specs.length); delay(() => setGlitching(false), 200); } }} onClick={() => {
        setGlitching(true);
        setIdx((i) => (i + 1) % specs.length);
        delay(() => setGlitching(false), 200);
      }}
      className="w-full h-40 flex items-center justify-center pt-5 px-5 cursor-pointer select-none"
    >
      <div
        className={`relative w-full max-w-[215px] h-24 rounded-xl bg-slate-950 border px-3 py-2.5 flex flex-col justify-between overflow-hidden transition-transform duration-75 ${
          cur.accent
        } ${glitching ? 'translate-x-1 -skew-x-6 shadow-[-4px_0_#ff0055,4px_0_#00e5ff]' : 'skew-x-0'}`}
      >
        {glitching && (
          <div className="absolute inset-x-0 top-1/2 h-3 bg-cyan-400/30 mix-blend-screen pointer-events-none" />
        )}
        <div className="flex items-center justify-between text-[8px] font-mono text-slate-400">
          <span>{cur.tag}</span>
          <span className="text-rose-400 font-bold">{t("sample.mgKenBurnsPan.rec")}</span>
        </div>
        <div className="text-base font-black tracking-wider text-white font-mono">
          {cur.title}
        </div>
        <div className="flex gap-1">
          {specs.map((_, i) => (
            <span
              key={i}
              className={`h-1 flex-1 rounded-full ${i === idx ? 'bg-cyan-400' : 'bg-slate-800'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};


/* [모션 영상 +2] 슬롯 릴 잭팟 헤드라인 씬 (Slot Reel Jackpot Headline Scene) */
export const VdSlotJackpotHeadlineDemo: React.FC = () => { const autoRunning = useDemoAutoplayRunning();
  const { t } = useLocale();
  const [step, setStep] = useState(3);
  const reels = [
    ['SHIP', 'BUILD', 'CREATE'],
    ['2X', '5X', '10X'],
    ['BETTER', 'SMARTER', 'FASTER'],
  ];

  useEffect(() => {
    if (!autoRunning) return;
    const id = setInterval(() => {
      setStep((s) => (s >= 4 ? 0 : s + 1));
    }, 680);
    return () => clearInterval(id);
  }, [autoRunning]);

  const locked = step >= 3;

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setStep(0)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setStep(0); } }}
      className="w-full h-40 flex flex-col items-center justify-center gap-2 pt-5 px-4 cursor-pointer select-none"
    >
      <div
        className={`flex items-center gap-1.5 p-2 rounded-xl border transition-all duration-300 ${
          locked
            ? 'bg-emerald-950/30 border-emerald-400/70 shadow-[0_0_20px_rgba(16,185,129,0.25)]'
            : 'bg-slate-900 border-slate-700'
        }`}
      >
        {reels.map((words, rIdx) => {
          const isStopped = step > rIdx;
          const wordIdx = isStopped ? 2 : (step + rIdx) % 3;
          return (
            <div
              key={rIdx}
              className="w-16 h-9 rounded-lg bg-slate-950 border border-slate-800 overflow-hidden relative"
            >
              <div
                style={{
                  transform: `translateY(-${wordIdx * 36}px)`,
                }}
                className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              >
                {words.map((w) => (
                  <div
                    key={w}
                    className={`h-9 flex items-center justify-center text-[10px] font-black tracking-tight ${
                      isStopped ? 'text-emerald-300' : 'text-slate-400'
                    }`}
                  >
                    {w}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <span className="text-[9px] font-mono text-slate-400">
        {locked ? t("sample.vdSlotJackpotHeadline.jackpotCreate10xFaster") : t("sample.vdSlotJackpotHeadline.rollingHeadlineReels")}
      </span>
    </div>
  );
};


/* [모션 영상 +3] 컨버전 퍼널 단계별 리빌 씬 (Conversion Funnel Stage Reveal) */
export const VdFunnelConversionDropDemo: React.FC = () => { const autoRunning = useDemoAutoplayRunning();
  const { t } = useLocale();
  const [stage, setStage] = useState(3);
  const steps = [
    { label: t("sample.vdFunnelConversionDrop.visitors"), val: '100%', width: 'w-44', color: 'from-indigo-500 to-blue-500' },
    { label: t("sample.vdFunnelConversionDrop.signUps"), val: '58%', width: 'w-32', color: 'from-violet-500 to-indigo-500' },
    { label: t("sample.vdFunnelConversionDrop.proPaid"), val: '28.4%', width: 'w-24', color: 'from-emerald-400 to-teal-500' },
  ];

  useEffect(() => {
    if (!autoRunning) return;
    const id = setInterval(() => {
      setStage((s) => (s >= 4 ? 1 : s + 1));
    }, 900);
    return () => clearInterval(id);
  }, [autoRunning]);

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setStage(1)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setStage(1); } }}
      className="w-full h-40 flex flex-col items-center justify-center gap-1.5 pt-5 px-4 cursor-pointer select-none"
    >
      {steps.map((st, idx) => {
        const visible = stage > idx;
        return (
          <div
            key={st.label}
            className={`${st.width} h-5 rounded-md bg-linear-to-r ${st.color} px-2.5 flex items-center justify-between text-[9px] font-bold text-white shadow transition-all duration-300 ${
              visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-15 scale-90 -translate-y-1'
            }`}
          >
            <span>{st.label}</span>
            <span className="font-mono">{st.val}</span>
          </div>
        );
      })}
      <div
        className={`mt-0.5 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-[9px] font-mono font-bold text-emerald-300 transition-all duration-300 ${
          stage >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
      >{t("sample.vdFunnelConversionDrop.finalCvr284")}</div>
    </div>
  );
};


/* [모션 영상 +4] 브레이킹 뉴스 속보 & 티커 씬 (Breaking News Broadcast Overlay) */
export const VdBreakingNewsTickerDemo: React.FC = () => { const autoRunning = useDemoAutoplayRunning();
  const { t } = useLocale();
  const [headIdx, setHeadIdx] = useState(0);
  const headlines = [
    t("demo.vibeDictionaryReaches122Interactions"),
    t("demo.copyMotionVideoPromptsWithOne"),
    t("demo.liveInteractiveDemoPreviewsAreReady"),
  ];
  const tickerText =
    t("demo.newsUi36Graphics26Layout");

  useEffect(() => {
    if (!autoRunning) return;
    const id = setInterval(() => {
      setHeadIdx((h) => (h + 1) % headlines.length);
    }, 2000);
    return () => clearInterval(id);
  }, [headlines.length, autoRunning]);

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setHeadIdx((h) => (h + 1) % headlines.length)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setHeadIdx((h) => (h + 1) % headlines.length); } }}
      className="w-full h-40 flex items-center justify-center pt-5 px-4 cursor-pointer select-none"
    >
      <div className="w-full max-w-[225px] rounded-xl bg-slate-950 border border-rose-500/40 overflow-hidden shadow-lg">
        {/* 상단 BREAKING LIVE 헤더 */}
        <div className="bg-linear-to-r from-rose-600 to-red-700 px-2.5 py-1 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            <span className="text-[9px] font-black tracking-wider text-white">{t("sample.vdBreakingNewsTicker.breakingNews")}</span>
          </div>
          <span className="text-[8px] font-mono text-white/90">{t("sample.vdBreakingNewsTicker.live24h")}</span>
        </div>

        {/* 중앙 수직 슬라이드 교체형 속보 헤드라인 */}
        <div className="px-2.5 py-2 bg-slate-900 overflow-hidden">
          <div
            key={headIdx}
            className="text-[10px] leading-snug font-bold text-white line-clamp-2 animate-toast-slide-up"
          >
            {headlines[headIdx]}
          </div>
        </div>

        {/* 하단 무한 루프 뉴스 자막 티커 (.animate-marquee-left 2배 트랙) */}
        <div className="bg-amber-400 text-slate-950 py-0.5 overflow-hidden whitespace-nowrap">
          <div className="flex w-max animate-marquee-left text-[9px] font-mono font-black">
            <span className="px-2">{tickerText}</span>
            <span className="px-2">{tickerText}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
