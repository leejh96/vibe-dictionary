export type SituationType = 'correct' | 'wrong' | 'explain' | 'practice';

export interface SituationMeta {
  id: SituationType | 'all';
  label: string;
  emoji: string;
  description: string;
  badgeClass: string;
}

export const SITUATION_CATEGORIES: SituationMeta[] = [
  {
    id: 'all',
    label: '전체 기법 보기',
    emoji: '✨',
    description: '모든 인터랙션과 모션 기법을 한눈에 둘러봅니다.',
    badgeClass: 'bg-slate-800 text-slate-200 border-slate-700',
  },
  {
    id: 'correct',
    label: '정답 맞혔을 때',
    emoji: '🎉',
    description: '성취감과 타격감을 극대화해 다음 문제도 풀고 싶게 만드는 보상 연출',
    badgeClass: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60',
  },
  {
    id: 'wrong',
    label: '틀렸을 때',
    emoji: '💥',
    description: '좌절감 대신 즉각적인 시각 피드백과 단계별 힌트를 자연스럽게 건네는 연출',
    badgeClass: 'bg-rose-950/80 text-rose-300 border-rose-700/60',
  },
  {
    id: 'explain',
    label: '개념 설명할 때',
    emoji: '💡',
    description: '지루한 줄글 대신 시선을 집중시키고 코드 흐름을 직관적으로 이해시키는 연출',
    badgeClass: 'bg-amber-950/80 text-amber-300 border-amber-700/60',
  },
  {
    id: 'practice',
    label: '직접 실습할 때',
    emoji: '🧩',
    description: '학습자가 마우스로 만지고 조립하며 손맛을 느끼게 해주는 조작형 인터랙션',
    badgeClass: 'bg-indigo-950/80 text-indigo-300 border-indigo-700/60',
  },
];

export const QUICK_VIBE_CHIPS = [
  '통통 튀는',
  '팡 터지는',
  '부르르 떨리는',
  '착 달라붙는',
  '휙 뒤집히는',
  '촤르륵 나오는',
  '다다닥 타이핑',
  '형광펜 이동',
  '손전등 집중',
  '차오르는 게이지',
  '스르륵 펼쳐지는',
];

export interface TechniqueItem {
  id: string;
  vibePhrase: string;
  vibeKeywords: string[];
  titleKo: string;
  titleEn: string;
  situations: SituationType[];
  plainDescription: string;
  whyItWorks: string;
  promptSnippet: string;
  codeHint: string;
}

export const TECHNIQUES: TechniqueItem[] = [
  {
    id: 'card-flip-3d',
    vibePhrase: '휙 입체적으로 뒤집히는 느낌',
    vibeKeywords: ['휙 뒤집히는', '앞뒤 카드', '입체적인', '회전', '퀴즈 카드', '정답 확인', '플립', '뒤집기'],
    titleKo: '3D 카드 플립',
    titleEn: '3D Card Flip with Perspective',
    situations: ['explain', 'practice'],
    plainDescription: '카드를 클릭하면 실제 트럼프 카드를 뒤집듯 Y축으로 180도 입체 회전하며 뒷면의 정답 코드나 해설을 보여줍니다.',
    whyItWorks: '처음부터 정답이나 개념을 다 보여주지 않고, 학습자가 스스로 생각한 뒤 직접 뒤집어 확인하게 만들어 능동적 학습을 유도합니다.',
    promptSnippet:
      '개념/퀴즈 카드를 클릭하면 CSS `perspective: 1000px`와 `transform-style: preserve-3d`, `rotateY(180deg)`를 적용해 0.6초 동안 입체적으로 뒤집히며 뒷면의 정답 코드와 해설이 나타나도록 구현해 줘. `backface-visibility: hidden`으로 앞/뒤 면이 겹치지 않게 처리해 줘.',
    codeHint: 'perspective: 1000px; transform-style: preserve-3d; transform: rotateY(180deg);',
  },
  {
    id: 'confetti-burst',
    vibePhrase: '팡 터지는 축하 폭죽과 꽃가루',
    vibeKeywords: ['팡 터지는', '꽃가루', '폭죽', '축하', '파티클', '화려한', '성공', '보상'],
    titleKo: '컨페티 파티클 버스트',
    titleEn: 'Confetti Particle Burst',
    situations: ['correct'],
    plainDescription: '정답을 맞히거나 미션을 클리어한 순간 버튼 주변에서 알록달록한 폭죽 조각들이 중력과 속도를 가지고 사방으로 흩날립니다.',
    whyItWorks: '문제를 풀었을 때 즉각적인 도파민과 시각적 보상감을 주어 코딩 실습의 피로도를 낮추고 성취감을 극대화합니다.',
    promptSnippet:
      '정답 판정 시 화면 중앙 또는 제출 버튼 위치에서 Confetti Particle Burst(폭죽 꽃가루 효과)가 터지도록 구현해 줘. 다양한 색상의 파티클 30~40개가 방사형 속도와 중력 가속도를 갖고 1.2초 동안 퍼지며 서서히 사라지는 애니메이션을 넣어 줘.',
    codeHint: 'Radial particle velocity (vx, vy) + gravity decay + rotation transform',
  },
  {
    id: 'error-shake-tooltip',
    vibePhrase: '부르르 떨리면서 말풍선 힌트가 뜨는 느낌',
    vibeKeywords: ['부르르 떨리는', '도리도리', '흔들리는', '진동', '오답', '틀렸을 때', '말풍선', '띠용'],
    titleKo: '에러 셰이크 & 플로팅 힌트',
    titleEn: 'Horizontal Error Shake & Floating Tooltip',
    situations: ['wrong'],
    plainDescription: '틀린 답을 제출하면 입력창이 도리도리하듯 좌우로 부르르 떨리고, 위쪽에 둥둥 떠다니는 말풍선 힌트가 부드럽게 나타납니다.',
    whyItWorks: '딱딱한 경고창(alert) 대신 직관적인 물리 진동으로 오답임을 알리고, 시선이 머무는 자리에 바로 힌트를 띄워 재시도를 돕습니다.',
    promptSnippet:
      '오답 입력 시 컨테이너가 0.45초 동안 좌우(`±8px`)로 빠르게 진동하는 Horizontal Error Shake 애니메이션을 재생하고, 동시에 요소 상단에 위아래로 살랑거리는(Floating Bobbing) 말풍선 툴팁으로 왜 틀렸는지 핵심 힌트를 띄워 줘.',
    codeHint: '@keyframes shake { 15%, 45%, 75% { transform: translateX(-8px) } 30%, 60%, 90% { transform: translateX(8px) } }',
  },
  {
    id: 'magnetic-hover',
    vibePhrase: '자석처럼 커서에 착 달라붙어 따라오는 느낌',
    vibeKeywords: ['착 달라붙는', '자석처럼', '쫀득한', '따라오는', '마우스 반응', '버튼 강조', '호버'],
    titleKo: '마그네틱 커서 호버',
    titleEn: 'Magnetic Cursor Hover Effect',
    situations: ['explain', 'practice'],
    plainDescription: '마우스 커서를 버튼 위에 올리고 움직이면, 버튼이 자석에 이끌리듯 커서 위치를 향해 쫀득하게 따라 움직입니다.',
    whyItWorks: '학습자가 다음에 눌러야 할 핵심 실행 버튼(예: 코드 실행, 다음 미션)에 손이 가도록 무의식적인 조작 재미를 부여합니다.',
    promptSnippet:
      '주요 액션 버튼에 Magnetic Hover 효과를 적용해 줘. 마우스가 버튼 영역 안에서 움직일 때 버튼 중심점과 마우스 좌표의 오프셋(`dx, dy`)을 계산해 버튼이 커서 방향으로 25~30% 정도 부드럽게 끌려오고, 마우스가 벗어나면 탄성 있게 원위치로 복귀하게 해 줘.',
    codeHint: 'onMouseMove: translate(dx * 0.3, dy * 0.3) with transition: transform 150ms ease-out',
  },
  {
    id: 'spring-bounce-modal',
    vibePhrase: '통통 튀며 탱글탱글하게 뿅 나타나는 느낌',
    vibeKeywords: ['통통 튀는', '탱글탱글', '탄성 있는', '뿅 나타나는', '젤리 같은', '바운스', '팝업'],
    titleKo: '스프링 바운스 팝업',
    titleEn: 'Spring Physics Overshoot Pop-up',
    situations: ['correct', 'explain'],
    plainDescription: '알림창이나 배지가 나타날 때 원래 크기보다 살짝 더 커졌다가(112%) 통통 튕기며 제자리(100%)로 안착하는 탄성 모션입니다.',
    whyItWorks: '선형(linear) 애니메이션보다 생명력 있는 캐주얼 게임 느낌을 주어 어린 학습자나 입문자의 흥미를 즉시 끌어올립니다.',
    promptSnippet:
      '결과 배지나 안내 모달이 등장할 때 단순 페이드인이 아니라 Spring Physics Overshoot 이징(`cubic-bezier(0.34, 1.56, 0.64, 1)`)을 사용해 `scale(0.5)`에서 `scale(1.12)`까지 살짝 커졌다가 `scale(1)`로 통통 튀며 안착하는 바운스 애니메이션을 적용해 줘.',
    codeHint: 'transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);',
  },
  {
    id: 'typewriter-streaming',
    vibePhrase: '타자기처럼 글자가 다다닥 한 글자씩 나오는 느낌',
    vibeKeywords: ['다다닥 타이핑', '타자기', '한글자씩', '말하는 느낌', 'NPC 대화', '스토리텔링', '커서 깜빡임'],
    titleKo: '타이프라이터 스트리밍 텍스트',
    titleEn: 'Typewriter Text & Blinking Caret',
    situations: ['explain'],
    plainDescription: '멘토 캐릭터나 AI 선생님이 실시간으로 말을 건네듯 텍스트가 한 글자씩 타이핑되며 끝에 깜빡이는 커서가 따라붙습니다.',
    whyItWorks: '긴 설명문을 한꺼번에 띄우면 읽지 않고 넘기지만, 타이핑 효과로 한 문장씩 출력하면 시선이 글자 끝을 따라가며 끝까지 읽게 됩니다.',
    promptSnippet:
      '개념 설명이나 미션 지문 영역에 Typewriter Streaming 효과를 적용해 줘. 텍스트가 35ms 간격으로 한 글자씩 순차 출력되고 문장 끝에 깜빡이는 블록 커서(`▋`)가 표시되도록 하며, 클릭 시 전체 문장을 즉시 다 보여주는 스킵/재재생 토글도 지원해 줘.',
    codeHint: 'setInterval slice(0, idx) + blinking cursor span (animate-pulse)',
  },
  {
    id: 'staggered-list',
    vibePhrase: '도미노처럼 차례대로 촤르륵 올라오는 느낌',
    vibeKeywords: ['촤르륵 나오는', '차례대로', '순차 등장', '도미노처럼', '물결처럼', '목록 애니메이션', '부드럽게'],
    titleKo: '스태거드 페이드인 리스트',
    titleEn: 'Staggered Slide & Fade-in List',
    situations: ['explain'],
    plainDescription: '여러 개의 학습 단계나 알고리즘 순서 카드가 한 번에 툭 뜨지 않고 0.08초 간격으로 아래에서 위로 촤르륵 순차 등장합니다.',
    whyItWorks: '알고리즘의 1단계 ➔ 2단계 ➔ 3단계처럼 순서가 중요한 코딩 개념을 시각적인 시간차로 자연스럽게 인지시킵니다.',
    promptSnippet:
      '학습 단계나 선택지 목록이 렌더링될 때 Staggered Fade-in 효과를 적용해 줘. 각 아이템에 `index * 80ms`의 `animation-delay`를 부여해 아래(`translateY(14px)`, `opacity: 0`)에서 원래 위치로 차례대로 촤르륵 미끄러져 올라오게 만들어 줘.',
    codeHint: 'style={{ transitionDelay: `${index * 80}ms` }} + translate-y-0 opacity-100',
  },
  {
    id: 'drag-snap-slot',
    vibePhrase: '블록을 빈칸에 끌어서 착 끼워 맞추는 느낌',
    vibeKeywords: ['끌어서 끼우는', '착 들어맞는', '빈칸 조립', '착 달라붙는', '블록 코딩', '퍼즐', '드래그 앤 드롭'],
    titleKo: '드래그 앤 스냅 코드 슬롯',
    titleEn: 'Drag & Snap-to-Slot Code Block',
    situations: ['practice'],
    plainDescription: '코드 조각 블록을 선택하거나 드래그하면 빈칸 슬롯이 반짝이며 반응하고, 자석처럼 빈칸 안에 착 끼워 맞춰지며 문장이 완성됩니다.',
    whyItWorks: '영어 타이핑 오타 때문에 문법 에러를 겪는 초보자에게, 퍼즐 조각을 맞추는 손맛으로 코드 구조를 먼저 깨치게 해줍니다.',
    promptSnippet:
      '코드 빈칸 채우기 실습에 Snap-to-Slot 인터랙션을 구현해 줘. 사용자가 보기 블록을 드래그하거나 클릭하면 빈칸 슬롯 테두리가 하이라이트되고, 블록이 슬롯에 들어갈 때 짧은 탄성 스케일 모션과 함께 착 달라붙어 전체 코드가 완성되도록 해 줘.',
    codeHint: 'Slot active glow ring + spring scale snap transition on drop/select',
  },
  {
    id: 'spotlight-focus',
    vibePhrase: '주변을 어둡게 끄고 손전등처럼 여기만 비추는 느낌',
    vibeKeywords: ['손전등 집중', '주변을 어둡게', '여기만 강조', '스포트라이트', '포커스', '튜토리얼 가이드', '시선 집중'],
    titleKo: '스포트라이트 포커스 오버레이',
    titleEn: 'Spotlight Dimmed Focus Overlay',
    situations: ['explain'],
    plainDescription: '복잡한 화면 전체를 반투명한 어두운 막으로 덮고, 지금 봐야 하는 핵심 코드 줄이나 버튼 하나만 손전등을 비춘 듯 또렷하게 강조합니다.',
    whyItWorks: '화면 어디를 봐야 할지 헤매는 입문자의 시각적 인지 부하(Cognitive Load)를 줄이고 설명 중인 핵심 요소에만 100% 집중시킵니다.',
    promptSnippet:
      '단계별 튜토리얼 설명 시 Spotlight Focus Overlay 기법을 적용해 줘. 배경 전체에 반투명 다크 오버레이(`bg-black/75`)를 깔고, 현재 설명 대상인 코드 블록이나 UI 요소만 밝은 하이라이트 링과 높은 z-index로 또렷하게 부각되게 만들어 줘.',
    codeHint: 'Backdrop dim overlay (opacity: 0.75) + target element z-20 ring-4 glow',
  },
  {
    id: 'combo-gauge-pop',
    vibePhrase: '숫자가 통 커지면서 게이지가 쭉 차오르는 타격감',
    vibeKeywords: ['차오르는 게이지', '숫자가 커지는', '연속 정답', '콤보', '타격감', '경험치 바', '레벨업'],
    titleKo: '콤보 카운터 팝 & 스무스 게이지',
    titleEn: 'Combo Scale Pop & Smooth Progress Fill',
    situations: ['correct', 'practice'],
    plainDescription: '문제를 맞히거나 클릭할 때마다 콤보 숫자가 쾅 찍히듯 커졌다 줄어들고, 하단 경험치 게이지가 빛나며 부드럽게 차오릅니다.',
    whyItWorks: '반복적인 코딩 문법 연습도 리듬 게임이나 클리커 게임처럼 느껴지게 만들어 지루함 없이 연속 문제를 풀게 만듭니다.',
    promptSnippet:
      '연속 정답/실습 진행 시 Combo Scale Pop과 Smooth Progress Bar 연출을 넣어 줘. 점수가 오를 때마다 `COMBO xN!` 배지가 일시적으로 1.28배 커지며 살짝 기울어졌다가 돌아오는 타격감 모션을 주고, 진행률 바는 그라데이션 광택과 함께 부드럽게 차오르게 구현해 줘.',
    codeHint: 'Combo keyframe scale(1.28) rotate(4deg) + progress width transition 400ms',
  },
  {
    id: 'step-line-highlighter',
    vibePhrase: '코드 한 줄씩 형광펜이 미끄러지며 실행되는 느낌',
    vibeKeywords: ['형광펜 이동', '한줄씩 따라가는', '실행 순서', '코드 추적', '디버거', '변수 변화', '스텝 실행'],
    titleKo: '코드 라인 스텝 하이라이터',
    titleEn: 'Step-by-Step Code Line Highlighter',
    situations: ['explain', 'practice'],
    plainDescription: '[다음 줄 실행]을 누를 때마다 코드 줄을 비추는 형광펜 바가 위에서 아래로 부드럽게 미끄러져 내려가며 우측의 변수 상자 값이 실시간으로 바뀝니다.',
    whyItWorks: '컴퓨터가 코드를 위에서 아래로, 혹은 반복문으로 어떻게 읽고 변수 값이 왜 바뀌는지 눈으로 직접 쫓아갈 수 있게 해줍니다.',
    promptSnippet:
      '코드 실행 과정을 보여주는 Step-by-Step Line Highlighter를 구현해 줘. 사용자가 [다음 스텝] 버튼을 누를 때마다 현재 실행 중인 코드 라인의 배경 하이라이트 바가 `translateY`로 부드럽게 이동하고, 옆의 메모리/변수 상태 패널 값이 실시간으로 업데이트되게 해 줘.',
    codeHint: 'Active line indicator absolute bar with translateY(lineIndex * rowHeight)',
  },
  {
    id: 'progressive-hint-accordion',
    vibePhrase: '잠긴 힌트가 한 단계씩 스르륵 펼쳐지는 느낌',
    vibeKeywords: ['스르륵 펼쳐지는', '단계별 힌트', '하나씩 열기', '아코디언', '스포일러 방지', '점진적 공개'],
    titleKo: '프로그레시브 힌트 아코디언',
    titleEn: 'Progressive Disclosure Hint Accordion',
    situations: ['wrong', 'practice'],
    plainDescription: '정답을 한 번에 알려주지 않고 [1단계: 생각의 실마리] ➔ [2단계: 핵심 문법] ➔ [3단계: 정답 코드] 순으로 클릭할 때마다 스르륵 펼쳐집니다.',
    whyItWorks: '학습자가 너무 쉽게 정답을 베끼는 것을 방지하면서도, 막혔을 때 포기하지 않도록 필요한 만큼만 도움을 줍니다.',
    promptSnippet:
      '실습 화면 하단에 Progressive Disclosure(점진적 공개) 힌트 아코디언을 구현해 줘. 1단계 힌트를 열어야만 2단계 힌트 버튼이 활성화되도록 순차 해금 로직을 적용하고, 각 단계가 열릴 때 높이와 투명도가 부드럽게 펼쳐지는 트랜지션을 적용해 줘.',
    codeHint: 'Sequential unlock state (unlockedLevel) + smooth max-height/opacity transition',
  },
];
