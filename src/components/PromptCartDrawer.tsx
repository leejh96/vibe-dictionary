import React, { useState, useMemo } from 'react';
import { ShoppingBag, X, Copy, Check, Sparkles, Trash2, Wand2 } from 'lucide-react';
import { TechniqueItem } from '../data/techniques';

interface PromptCartDrawerProps {
  cart: TechniqueItem[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

const EXAMPLE_TOPICS = [
  '초등학생용 파이썬 if-else 조건문으로 신호등 건너기 퀴즈',
  'for 반복문으로 슬라임 몬스터 5마리 연속 공격하기 실습',
  '배열(리스트) 보물상자에 아이템 추가·삭제하기 인터랙티브 실습',
  '함수(Function) 자판기에 동전을 넣고 음료수 뽑기 시뮬레이션',
];

const TECH_STACK_OPTIONS = [
  { id: 'react-tailwind', label: 'React + Tailwind CSS (모던 웹앱)' },
  { id: 'html-js', label: '단일 HTML/CSS/JS 파일 (설치 없이 바로 실행)' },
  { id: 'auto', label: 'AI 자율 추천 (가장 적합한 스택)' },
];

export const PromptCartDrawer: React.FC<PromptCartDrawerProps> = ({
  cart,
  isOpen,
  onOpenChange,
  onRemoveItem,
  onClearCart,
}) => {
  const [topic, setTopic] = useState(EXAMPLE_TOPICS[0]);
  const [targetAudience, setTargetAudience] = useState('코딩 입문자 및 초·중등 학습자');
  const [techStack, setTechStack] = useState(TECH_STACK_OPTIONS[0].id);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const combinedPrompt = useMemo(() => {
    const stackLabel =
      TECH_STACK_OPTIONS.find((t) => t.id === techStack)?.label ?? 'React + Tailwind CSS';

    if (cart.length === 0) {
      return '왼쪽 카탈로그에서 마음에 드는 인터랙션 기법 카드를 [장바구니 담기]로 선택해 주세요!';
    }

    const explainItems = cart.filter((i) => i.situations.includes('explain'));
    const practiceItems = cart.filter((i) => i.situations.includes('practice'));
    const correctItems = cart.filter((i) => i.situations.includes('correct'));
    const wrongItems = cart.filter((i) => i.situations.includes('wrong'));

    const formatSection = (title: string, items: TechniqueItem[]) => {
      if (items.length === 0) return '';
      return (
        `\n### ${title}\n` +
        items
          .map(
            (item, idx) =>
              `${idx + 1}. **${item.titleKo} (${item.titleEn})** - [원하는 느낌: "${item.vibePhrase}"]\n   - 구현 지침: ${item.promptSnippet}\n   - 기술 힌트: \`${item.codeHint}\``
          )
          .join('\n')
      );
    };

    return `당신은 인터랙티브 코딩 교육 콘텐츠 전문 프론트엔드 개발자입니다.
다음 교육 주제와 학습 대상에 맞춰, 아래 지정된 UI/모션 인터랙션 기법들이 실제로 살아 움직이는 교육용 인터랙티브 웹 콘텐츠를 구현해 주세요.

## 1. 콘텐츠 기본 정보
- **교육 주제**: ${topic || '(주제를 입력해 주세요)'}
- **학습 대상**: ${targetAudience}
- **구현 기술 스택**: ${stackLabel}

## 2. 필수 적용 인터랙션 & 모션 기법 명세 (총 ${cart.length}종)
단순히 정적인 텍스트와 버튼만 나열하지 말고, 아래 선택한 전문 인터랙션 기법들을 각 학습 흐름에 정확히 반영해 주세요.
${formatSection('💡 개념 설명 및 도입 구간', explainItems)}${formatSection(
      '🧩 직접 조작 및 코드 실습 구간',
      practiceItems
    )}${formatSection('🎉 정답 판정 및 보상 피드백 구간', correctItems)}${formatSection(
      '💥 오답 판정 및 힌트 제공 구간',
      wrongItems
    )}

## 3. 추가 품질 요구사항
- 모든 모션은 끊김 없이 부드러운 이징(Easing) 곡선과 물리적 탄성이 느껴지도록 작성해 주세요.
- 학습자가 화면에 진입했을 때 무엇을 클릭하거나 조작해야 하는지 직관적인 시각적 어포던스(Affordance)를 제공해 주세요.`;
  }, [cart, topic, targetAudience, techStack]);

  const handleCopyPrompt = () => {
    if (cart.length === 0) return;
    navigator.clipboard.writeText(combinedPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <>
      {/* 하단 플로팅 장바구니 요약 바 */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => onOpenChange(true)}
          className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white font-extrabold text-sm shadow-2xl shadow-indigo-500/40 hover:scale-[1.03] active:scale-95 transition-all border border-indigo-400/40"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-amber-400 text-slate-950 text-xs font-black flex items-center justify-center">
              {cart.length}
            </span>
          </div>
          <span>바이브 프롬프트 조합기 열기</span>
        </button>
      </div>

      {/* 슬라이드 오버 드로어 모달 */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl">
            {/* 헤더 */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                  <Wand2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-white">
                    바이브코딩 통합 프롬프트 조합기
                  </h2>
                  <p className="text-xs text-slate-400">
                    고른 인터랙션 기법들과 교육 주제를 합쳐 AI에게 바로 붙여넣을 완성형 프롬프트를 만듭니다.
                  </p>
                </div>
              </div>
              <button
                onClick={() => onOpenChange(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 본문 스크롤 영역 */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* 1단계: 코딩 교육 주제 입력 */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
                <label className="block text-xs font-bold text-indigo-300">
                  STEP 1. 이번에 만들 코딩 교육 콘텐츠 주제는 무엇인가요?
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="예: 파이썬 if-else 조건문으로 신호등 건너기 실습"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] text-slate-400">예시 주제 클릭:</span>
                  {EXAMPLE_TOPICS.map((ex, i) => (
                    <button
                      key={i}
                      onClick={() => setTopic(ex)}
                      className="text-[11px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    >
                      {ex.slice(0, 18)}...
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      학습 대상
                    </label>
                    <input
                      type="text"
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      희망 기술 스택
                    </label>
                    <select
                      value={techStack}
                      onChange={(e) => setTechStack(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    >
                      {TECH_STACK_OPTIONS.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* 2단계: 장바구니에 담긴 기법 리스트 */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-300">
                    STEP 2. 장바구니에 담은 인터랙션 기법 ({cart.length}개)
                  </span>
                  {cart.length > 0 && (
                    <button
                      onClick={onClearCart}
                      className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> 전체 비우기
                    </button>
                  )}
                </div>

                {cart.length === 0 ? (
                  <div className="py-6 text-center text-xs text-slate-500">
                    아직 담긴 기법이 없습니다. 카탈로그에서 마음에 드는 모션 카드를 담아보세요!
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-2 bg-slate-900 border border-indigo-500/40 rounded-lg px-3 py-1.5 text-xs"
                      >
                        <span className="font-bold text-white">{item.titleKo}</span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          ({item.titleEn})
                        </span>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-400 hover:text-rose-400 ml-1"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 3단계: 완성된 바이브코딩 프롬프트 미리보기 */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    STEP 3. 완성된 바이브코딩 프롬프트 (AI 코딩 툴에 그대로 붙여넣으세요)
                  </span>
                </div>
                <pre className="w-full max-h-72 overflow-y-auto p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed">
                  {combinedPrompt}
                </pre>
              </div>
            </div>

            {/* 하단 고정 액션 바 */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between gap-3">
              <button
                onClick={() => onOpenChange(false)}
                className="px-4 py-3 rounded-xl border border-slate-700 text-xs font-bold text-slate-300 hover:bg-slate-800"
              >
                기법 더 고르기
              </button>
              <button
                onClick={handleCopyPrompt}
                disabled={cart.length === 0}
                className={`flex-1 py-3 px-5 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all ${
                  cart.length === 0
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : copiedPrompt
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:brightness-110 text-white shadow-lg shadow-indigo-500/25'
                }`}
              >
                {copiedPrompt ? (
                  <>
                    <Check className="w-4 h-4" />
                    통합 바이브코딩 프롬프트 복사 완료!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    통합 프롬프트 복사하기 ({cart.length}개 기법 적용)
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
