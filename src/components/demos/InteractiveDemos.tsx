import React, { useState, useEffect } from 'react';
import { RotateCcw, Sparkles, Check, AlertCircle, Play, Lock, Unlock, Lightbulb, Flame } from 'lucide-react';

interface DemoProps {
  techniqueId: string;
}

export const InteractiveDemo: React.FC<DemoProps> = ({ techniqueId }) => {
  switch (techniqueId) {
    case 'card-flip-3d':
      return <CardFlipDemo />;
    case 'confetti-burst':
      return <ConfettiBurstDemo />;
    case 'error-shake-tooltip':
      return <ErrorShakeDemo />;
    case 'magnetic-hover':
      return <MagneticHoverDemo />;
    case 'spring-bounce-modal':
      return <SpringBounceDemo />;
    case 'typewriter-streaming':
      return <TypewriterDemo />;
    case 'staggered-list':
      return <StaggeredListDemo />;
    case 'drag-snap-slot':
      return <DragSnapSlotDemo />;
    case 'spotlight-focus':
      return <SpotlightFocusDemo />;
    case 'combo-gauge-pop':
      return <ComboGaugeDemo />;
    case 'step-line-highlighter':
      return <StepLineHighlighterDemo />;
    case 'progressive-hint-accordion':
      return <ProgressiveHintDemo />;
    default:
      return null;
  }
};

/* 1. 3D 카드 플립 */
const CardFlipDemo: React.FC = () => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="relative w-full h-44 flex flex-col items-center justify-center select-none">
      <div
        onClick={() => setFlipped(!flipped)}
        className="w-60 h-32 perspective-1000 cursor-pointer group"
      >
        <div
          className={`relative w-full h-full duration-500 preserve-3d transition-transform ${
            flipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* 앞면 */}
          <div className="absolute inset-0 backface-hidden rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 p-4 flex flex-col justify-between border border-indigo-400/40 shadow-lg group-hover:scale-[1.02] transition-transform">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-200 bg-indigo-950/50 px-2 py-0.5 rounded w-fit">
              QUIZ CARD (앞면)
            </span>
            <p className="text-sm font-bold text-white">
              파이썬에서 리스트 끝에 요소를 추가하는 함수는?
            </p>
            <span className="text-xs text-indigo-200 flex items-center gap-1">
              👆 카드를 클릭해서 뒤집어 보세요
            </span>
          </div>

          {/* 뒷면 */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 p-4 flex flex-col justify-between border border-emerald-400/40 shadow-lg">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-100 bg-emerald-950/50 px-2 py-0.5 rounded w-fit">
              ANSWER (뒷면)
            </span>
            <code className="text-sm font-mono font-bold text-white bg-black/30 px-2.5 py-1.5 rounded">
              items.append('사과')
            </code>
            <span className="text-xs text-emerald-100">
              👆 다시 클릭하면 앞면으로 돌아갑니다
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* 2. 컨페티 파티클 버스트 */
const ConfettiBurstDemo: React.FC = () => {
  const [burstKey, setBurstKey] = useState(0);
  const [isCelebrating, setIsCelebrating] = useState(false);

  const triggerBurst = () => {
    setBurstKey((prev) => prev + 1);
    setIsCelebrating(true);
    setTimeout(() => setIsCelebrating(false), 1100);
  };

  const particles = [
    { dx: '-75px', dy: '-65px', color: 'bg-amber-400', rot: '45deg' },
    { dx: '-45px', dy: '-80px', color: 'bg-rose-400', rot: '-60deg' },
    { dx: '0px', dy: '-90px', color: 'bg-emerald-400', rot: '25deg' },
    { dx: '50px', dy: '-80px', color: 'bg-sky-400', rot: '80deg' },
    { dx: '80px', dy: '-60px', color: 'bg-purple-400', rot: '-45deg' },
    { dx: '-85px', dy: '-15px', color: 'bg-pink-400', rot: '110deg' },
    { dx: '85px', dy: '-10px', color: 'bg-yellow-300', rot: '-95deg' },
    { dx: '-60px', dy: '45px', color: 'bg-indigo-400', rot: '30deg' },
    { dx: '60px', dy: '50px', color: 'bg-teal-300', rot: '-40deg' },
    { dx: '-25px', dy: '-55px', color: 'bg-orange-400', rot: '70deg' },
    { dx: '30px', dy: '-50px', color: 'bg-lime-400', rot: '-30deg' },
    { dx: '0px', dy: '60px', color: 'bg-fuchsia-400', rot: '55deg' },
  ];

  return (
    <div className="relative w-full h-44 flex flex-col items-center justify-center overflow-hidden select-none">
      <div className="relative">
        {isCelebrating && (
          <div key={burstKey} className="pointer-events-none absolute inset-0 flex items-center justify-center">
            {particles.map((p, idx) => (
              <span
                key={idx}
                className={`w-2.5 h-2.5 rounded-sm ${p.color} absolute transition-all duration-700 ease-out`}
                style={{
                  animation: `confetti-fly-${idx} 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                }}
              />
            ))}
            <style>{`
              ${particles
                .map(
                  (p, idx) => `
                @keyframes confetti-fly-${idx} {
                  0% { transform: translate(0, 0) scale(0.4) rotate(0deg); opacity: 1; }
                  70% { opacity: 1; }
                  100% { transform: translate(${p.dx}, ${p.dy}) scale(1.1) rotate(${p.rot}); opacity: 0; }
                }
              `
                )
                .join('\n')}
            `}</style>
          </div>
        )}

        <button
          onClick={triggerBurst}
          className="relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/25 hover:brightness-110 active:scale-95 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          정답 제출하기 (클릭!)
        </button>
      </div>
      <p className="mt-3 text-xs text-slate-400">
        {isCelebrating ? '🎉 정답입니다! 폭죽 파티클이 터집니다!' : '버튼을 눌러 폭죽 효과를 확인해 보세요'}
      </p>
    </div>
  );
};

/* 3. 에러 셰이크 & 플로팅 힌트 */
const ErrorShakeDemo: React.FC = () => {
  const [shaking, setShaking] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const triggerError = () => {
    setShaking(false);
    setTimeout(() => {
      setShaking(true);
      setShowHint(true);
    }, 10);
  };

  return (
    <div className="relative w-full h-44 flex flex-col items-center justify-center px-4 select-none">
      {/* 플로팅 힌트 말풍선 */}
      <div
        className={`mb-2.5 transition-all duration-300 ${
          showHint ? 'opacity-100 translate-y-0 animate-float-bob' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        <div className="relative bg-amber-400 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5">
          <Lightbulb className="w-3.5 h-3.5 shrink-0" />
          <span>힌트: 문자열은 따옴표(" ")로 감싸야 해요!</span>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-amber-400 rotate-45" />
        </div>
      </div>

      {/* 오답 입력 박스 */}
      <div
        onClick={triggerError}
        className={`w-full max-w-[250px] rounded-xl bg-slate-900 border-2 px-3.5 py-2.5 flex items-center justify-between cursor-pointer transition-colors ${
          shaking ? ' animate-error-shake border-rose-500 bg-rose-950/30' : 'border-slate-700 hover:border-rose-500/60'
        }`}
      >
        <code className="text-xs font-mono text-rose-300">print(안녕 파이썬)</code>
        <span className="text-xs font-semibold px-2 py-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
          오답 실행해보기
        </span>
      </div>

      <p className="mt-2.5 text-[11px] text-slate-400">
        👆 박스를 클릭하면 좌우 진동 + 말풍선 힌트가 뜹니다
      </p>
    </div>
  );
};

/* 4. 마그네틱 커서 호버 */
const MagneticHoverDemo: React.FC = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = (e.clientX - centerX) * 0.38;
    const dy = (e.clientY - centerY) * 0.38;
    setOffset({ x: dx, y: dy });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-44 flex flex-col items-center justify-center cursor-pointer select-none"
    >
      <div className="p-6 rounded-2xl border border-dashed border-indigo-500/30 bg-indigo-950/10 flex items-center justify-center">
        <button
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px)`,
            transition: offset.x === 0 && offset.y === 0 ? 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'transform 0.08s ease-out',
          }}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/30 flex items-center gap-2"
        >
           magnet처럼 따라오는 버튼
        </button>
      </div>
      <p className="mt-2.5 text-xs text-slate-400">
        점선 영역 안에서 마우스를 이리저리 움직여 보세요
      </p>
    </div>
  );
};

/* 5. 스프링 바운스 팝업 */
const SpringBounceDemo: React.FC = () => {
  const [popKey, setPopKey] = useState(1);

  return (
    <div className="relative w-full h-44 flex flex-col items-center justify-center select-none">
      <div
        key={popKey}
        onClick={() => setPopKey((k) => k + 1)}
        className="animate-spring-pop cursor-pointer bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 px-5 py-3 rounded-2xl shadow-xl shadow-orange-500/20 flex items-center gap-3 border-2 border-amber-200"
      >
        <div className="w-9 h-9 rounded-xl bg-slate-950/15 flex items-center justify-center text-lg font-extrabold">
          🏆
        </div>
        <div>
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-900/80">
            LEVEL UP BADGE
          </div>
          <div className="text-sm font-black">조건문 마스터 획득!</div>
        </div>
      </div>

      <button
        onClick={() => setPopKey((k) => k + 1)}
        className="mt-3 text-xs text-indigo-300 hover:text-indigo-200 flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded-md"
      >
        <RotateCcw className="w-3 h-3" /> 클릭해서 통통 튀는 탄성 다시 보기
      </button>
    </div>
  );
};

/* 6. 타이프라이터 텍스트 & 커서 */
const TypewriterDemo: React.FC = () => {
  const fullText = '안녕! 오늘 미션은 for 반복문으로 몬스터 5마리를 한 번에 물리치는 거야!';
  const [displayed, setDisplayed] = useState('');
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    setDisplayed('');
    let idx = 0;
    const timer = setInterval(() => {
      idx += 1;
      setDisplayed(fullText.slice(0, idx));
      if (idx >= fullText.length) {
        clearInterval(timer);
      }
    }, 40);
    return () => clearInterval(timer);
  }, [runId]);

  return (
    <div
      onClick={() => setRunId((r) => r + 1)}
      className="relative w-full h-44 flex flex-col justify-center px-4 cursor-pointer select-none"
    >
      <div className="bg-slate-900/95 border border-slate-700 rounded-xl p-3.5 shadow-inner">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
            🤖 코딩 멘토 AI
          </span>
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <RotateCcw className="w-2.5 h-2.5" /> 클릭 시 재타이핑
          </span>
        </div>
        <p className="text-xs leading-relaxed text-slate-100 font-medium min-h-[36px]">
          {displayed}
          <span className="inline-block w-1.5 h-3.5 ml-0.5 align-middle bg-emerald-400 animate-pulse" />
        </p>
      </div>
    </div>
  );
};

/* 7. 스태거드 페이드인 리스트 */
const StaggeredListDemo: React.FC = () => {
  const [replayKey, setReplayKey] = useState(0);
  const steps = [
    '1단계: 변수 box에 숫자 10을 저장합니다',
    '2단계: if 조건문으로 5보다 큰지 비교합니다',
    '3단계: 조건이 참(True)이므로 문을 엽니다!',
  ];

  return (
    <div
      onClick={() => setReplayKey((k) => k + 1)}
      className="relative w-full h-44 flex flex-col justify-center px-4 cursor-pointer select-none"
    >
      <div key={replayKey} className="space-y-1.5">
        {steps.map((step, index) => (
          <div
            key={index}
            style={{
              animation: `stagger-up 0.45s cubic-bezier(0.16, 1, 0.3, 1) ${index * 110}ms backwards`,
            }}
            className="bg-slate-800/90 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-200 flex items-center gap-2"
          >
            <span className="w-4 h-4 rounded-full bg-indigo-500/30 text-indigo-300 text-[10px] font-bold flex items-center justify-center shrink-0">
              {index + 1}
            </span>
            <span className="truncate">{step}</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes stagger-up {
          0% { opacity: 0; transform: translateY(14px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <span className="mt-2 text-[11px] text-slate-400 text-center">
        👆 카드를 클릭하면 촤르륵 순차 등장을 다시 봅니다
      </span>
    </div>
  );
};

/* 8. 드래그 앤 스냅 코드 슬롯 */
const DragSnapSlotDemo: React.FC = () => {
  const [selectedToken, setSelectedToken] = useState<string | null>('range(5)');
  const options = ['range(5)', 'print()', 'while'];

  return (
    <div className="relative w-full h-44 flex flex-col items-center justify-center px-4 select-none">
      {/* 코드 빈칸 슬롯 영역 */}
      <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 font-mono text-xs flex items-center justify-center gap-1.5 mb-3">
        <span className="text-purple-400 font-bold">for</span>
        <span className="text-slate-200">i</span>
        <span className="text-purple-400 font-bold">in</span>
        <button
          onClick={() => setSelectedToken(null)}
          className={`min-w-[82px] h-7 px-2 rounded-lg border-2 transition-all flex items-center justify-center font-bold ${
            selectedToken
              ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300 animate-spring-pop'
              : 'border-dashed border-indigo-400/70 bg-indigo-950/40 text-indigo-300/70'
          }`}
        >
          {selectedToken ?? '빈칸 클릭'}
        </button>
        <span className="text-slate-200">:</span>
      </div>

      {/* 하단 보기 블록 */}
      <div className="flex items-center gap-2">
        {options.map((token) => {
          const isUsed = selectedToken === token;
          return (
            <button
              key={token}
              onClick={() => setSelectedToken(isUsed ? null : token)}
              className={`px-2.5 py-1 rounded-lg font-mono text-xs font-semibold border transition-all ${
                isUsed
                  ? 'bg-slate-800/40 text-slate-500 border-slate-800 scale-95'
                  : 'bg-indigo-600/30 text-indigo-200 border-indigo-500/50 hover:bg-indigo-500/40 hover:-translate-y-0.5'
              }`}
            >
              {token}
            </button>
          );
        })}
      </div>
      <span className="mt-2 text-[11px] text-slate-400">
        👆 아래 코드 조각을 눌러 빈칸에 착 끼워 보세요
      </span>
    </div>
  );
};

/* 9. 스포트라이트 포커스 오버레이 */
const SpotlightFocusDemo: React.FC = () => {
  const [focusLine, setFocusLine] = useState<number>(1);
  const lines = [
    { code: 'score = 85', desc: '1. 점수를 변수에 저장해요' },
    { code: 'if score >= 80:', desc: '2. 80점 이상인지 조건을 검사해요!' },
    { code: '    print("합격!")', desc: '3. 조건이 맞으면 결과를 출력해요' },
  ];

  return (
    <div className="relative w-full h-44 flex flex-col justify-center px-4 select-none">
      <div className="relative rounded-xl bg-slate-950 border border-slate-800 p-2.5 space-y-1">
        {lines.map((item, idx) => {
          const isFocused = focusLine === idx;
          return (
            <div
              key={idx}
              onClick={() => setFocusLine((idx + 1) % lines.length)}
              className={`cursor-pointer rounded-lg px-3 py-1.5 font-mono text-xs flex items-center justify-between transition-all duration-300 ${
                isFocused
                  ? 'bg-slate-800 text-white ring-2 ring-amber-400 shadow-lg shadow-amber-500/10 scale-[1.02] opacity-100'
                  : 'opacity-25 blur-[0.3px] hover:opacity-50'
              }`}
            >
              <span>{item.code}</span>
              {isFocused && (
                <span className="text-[10px] font-sans font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded">
                  🔦 {item.desc}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <span className="mt-2 text-[11px] text-slate-400 text-center">
        👆 코드 줄을 클릭하면 손전등 스포트라이트가 이동합니다
      </span>
    </div>
  );
};

/* 10. 콤보 카운터 팝 & 스무스 게이지 */
const ComboGaugeDemo: React.FC = () => {
  const [combo, setCombo] = useState(3);
  const progress = Math.min(100, (combo % 6) * 20 || 100);

  return (
    <div className="relative w-full h-44 flex flex-col items-center justify-center px-5 select-none">
      <div className="flex items-center justify-between w-full mb-2">
        <div
          key={combo}
          className="animate-combo-pop flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-black text-xs px-3 py-1 rounded-full shadow-md"
        >
          <Flame className="w-3.5 h-3.5 fill-current" />
          COMBO x{combo}!
        </div>
        <span className="text-xs font-mono font-bold text-emerald-400">EXP {progress}%</span>
      </div>

      {/* 게이지 바 */}
      <div className="w-full h-3.5 bg-slate-900 rounded-full overflow-hidden border border-slate-700 p-0.5 mb-3">
        <div
          style={{ width: `${progress}%` }}
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-emerald-400 to-teal-300 transition-all duration-300 ease-out"
        />
      </div>

      <button
        onClick={() => setCombo((c) => c + 1)}
        className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-bold text-white active:scale-95 transition-transform"
      >
        ⚡ 연속 정답 클릭해보기 (+1 Combo)
      </button>
    </div>
  );
};

/* 11. 코드 라인 스텝 하이라이터 */
const StepLineHighlighterDemo: React.FC = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { line: 0, code: 'hp = 100', hpValue: 100 },
    { line: 1, code: 'hp = hp - 30', hpValue: 70 },
    { line: 2, code: 'hp = hp + 15', hpValue: 85 },
  ];

  return (
    <div className="relative w-full h-44 flex flex-col justify-center px-4 select-none">
      <div className="flex items-center gap-2.5">
        {/* 좌측 코드 창 */}
        <div className="relative flex-1 bg-slate-950 border border-slate-800 rounded-xl p-2 font-mono text-xs overflow-hidden">
          {/* 부드럽게 이동하는 형광펜 바 */}
          <div
            style={{ transform: `translateY(${step * 28}px)` }}
            className="absolute left-1.5 right-1.5 top-2 h-6 rounded-md bg-indigo-500/25 border-l-4 border-indigo-400 transition-transform duration-300 ease-out pointer-events-none"
          />
          {steps.map((s, idx) => (
            <div
              key={idx}
              className={`relative z-10 h-7 px-2.5 flex items-center transition-colors ${
                step === idx ? 'text-white font-bold' : 'text-slate-500'
              }`}
            >
              <span className="w-4 text-[10px] text-slate-600">{idx + 1}</span>
              <span>{s.code}</span>
            </div>
          ))}
        </div>

        {/* 우측 변수 상태 상자 */}
        <div className="w-24 bg-slate-900 border border-slate-700 rounded-xl p-2.5 flex flex-col items-center justify-center">
          <span className="text-[10px] text-slate-400 font-semibold">변수 hp 상자</span>
          <span
            key={steps[step].hpValue}
            className="mt-1 text-lg font-mono font-black text-emerald-400 animate-spring-pop"
          >
            {steps[step].hpValue}
          </span>
        </div>
      </div>

      <button
        onClick={() => setStep((s) => (s + 1) % steps.length)}
        className="mt-2.5 mx-auto flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-200 text-xs font-bold transition-colors"
      >
        <Play className="w-3 h-3 fill-current" /> 다음 줄 실행 (Step {step + 1}/3)
      </button>
    </div>
  );
};

/* 12. 프로그레시브 힌트 아코디언 */
const ProgressiveHintDemo: React.FC = () => {
  const [unlocked, setUnlocked] = useState(1);
  const hints = [
    { level: 1, title: '1단계 힌트: 생각의 실마리', body: '짝수는 2로 나누었을 때 나머지가 0인 숫자예요.' },
    { level: 2, title: '2단계 힌트: 사용할 연산자', body: '나머지를 구할 때는 % 기호(모듈로 연산자)를 사용해요.' },
    { level: 3, title: '3단계 힌트: 정답 코드 보기', body: 'if num % 2 == 0:' },
  ];

  return (
    <div className="relative w-full h-44 flex flex-col justify-center px-4 select-none">
      <div className="space-y-1.5">
        {hints.map((h) => {
          const isOpen = unlocked >= h.level;
          const canUnlockNext = unlocked + 1 === h.level;
          return (
            <div
              key={h.level}
              onClick={() => {
                if (canUnlockNext) setUnlocked(h.level);
                else if (h.level === 3 && unlocked === 3) setUnlocked(1);
              }}
              className={`rounded-lg border px-3 py-1.5 transition-all duration-300 ${
                isOpen
                  ? 'bg-slate-800/90 border-indigo-500/50 text-slate-100'
                  : canUnlockNext
                  ? 'bg-slate-900/90 border-slate-700 hover:border-amber-400/60 cursor-pointer text-amber-300'
                  : 'bg-slate-950/60 border-slate-800/70 text-slate-600'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="flex items-center gap-1.5">
                  {isOpen ? <Unlock className="w-3 h-3 text-indigo-400" /> : <Lock className="w-3 h-3" />}
                  {h.title}
                </span>
                {canUnlockNext && <span className="text-[10px] underline">클릭해 열기</span>}
              </div>
              {isOpen && (
                <p className="mt-1 text-[11px] text-indigo-200 font-mono truncate">
                  👉 {h.body}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
