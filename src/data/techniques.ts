export type CategoryType =
  | 'hover'
  | 'card'
  | 'motion'
  | 'text'
  | 'feedback'
  | 'layout'
  | 'control';

export interface CategoryMeta {
  id: CategoryType | 'all';
  label: string;
}

export const CATEGORIES: CategoryMeta[] = [
  { id: 'all', label: '전체' },
  { id: 'hover', label: '버튼·호버' },
  { id: 'card', label: '카드·3D' },
  { id: 'motion', label: '등장·모션' },
  { id: 'text', label: '텍스트·타이포' },
  { id: 'feedback', label: '피드백·파티클' },
  { id: 'layout', label: '레이아웃·배너' },
  { id: 'control', label: '조작·인터랙션' },
];

export const QUICK_VIBE_CHIPS = [
  '자석처럼',
  '통통 튀는',
  '반짝 스치는',
  '입체 기울기',
  '팡 터지는',
  '부르르 떨리는',
  '촤르륵 순서대로',
  '암호 해독',
  '유리 같은',
  '스르륵 캡슐 탭',
  '무한 흐르는',
  '드르륵 숫자',
];

export interface TechniqueItem {
  id: string;
  category: CategoryType;
  vibeTag: string;
  vibeKeywords: string[];
  titleKo: string;
  titleEn: string;
  summary: string;
  promptSnippet: string;
}

export const TECHNIQUES: TechniqueItem[] = [
  /* ==================== 1. 버튼·호버 (hover) ==================== */
  {
    id: 'magnetic-hover',
    category: 'hover',
    vibeTag: '자석처럼 착 달라붙는',
    vibeKeywords: ['자석처럼', '착 달라붙는', '쫀득한', '마우스 따라오는', '마그네틱', '버튼 호버'],
    titleKo: '마그네틱 호버',
    titleEn: 'Magnetic Cursor Hover',
    summary: '커서 방향으로 버튼이 자석처럼 끌려오는 효과',
    promptSnippet:
      '버튼에 Magnetic Cursor Hover 효과를 적용해 줘. 마우스가 요소 영역 안에서 움직일 때 중심점과 커서 좌표 오프셋(dx, dy)의 35%만큼 요소가 따라 움직이고, 마우스가 나가면 spring 이징으로 복귀하게 해 줘.',
  },
  {
    id: 'shimmer-sweep',
    category: 'hover',
    vibeTag: '반짝 빛이 스쳐 지나가는',
    vibeKeywords: ['반짝 스치는', '광택', '빛나는', '시머', '고급스러운', '하이라이트 버튼'],
    titleKo: '시머 광택 스윕',
    titleEn: 'Shimmer Light Sweep',
    summary: '대각선 빛줄기가 표면을 주기적으로 스쳐가는 연출',
    promptSnippet:
      '버튼/배지 위에 Shimmer Light Sweep 효과를 적용해 줘. 반투명 흰색 그라데이션(`via-white/30`) 레이어를 `skewX(-20deg)`로 기울여 왼쪽(`-150%`)에서 오른쪽(`250%`)으로 미끄러지듯 지나가게 해 줘.',
  },
  {
    id: 'ripple-click',
    category: 'hover',
    vibeTag: '클릭한 곳에서 물결이 퍼지는',
    vibeKeywords: ['물결', '리플', '파동', '클릭 타격감', '퍼져나가는', '터치 반응'],
    titleKo: '리플 물결 클릭',
    titleEn: 'Material Ripple Click',
    summary: '클릭 지점부터 동심원 물결이 부드럽게 퍼지는 효과',
    promptSnippet:
      '버튼 클릭 시 클릭한 정확한 마우스 좌표(`clientX - rect.left`)에서 원형 Ripple 물결이 `scale(0)`에서 `scale(4)`로 커지며 `opacity: 0`으로 사라지는 Material Ripple 이펙트를 구현해 줘.',
  },
  {
    id: 'neon-glow-pulse',
    category: 'hover',
    vibeTag: '네온사인이 은은하게 숨 쉬는',
    vibeKeywords: ['네온', '글로우', '빛이 번지는', '사이버펑크', '발광', '강조 버튼'],
    titleKo: '네온 글로우 펄스',
    titleEn: 'Neon Drop-Shadow Pulse',
    summary: '버튼 주변으로 네온 빛 번짐이 부드럽게 맥동하는 효과',
    promptSnippet:
      '호버 및 활성 상태에서 다중 `box-shadow`(`0 0 15px`, `0 0 35px`)와 밝은 테두리를 사용해 네온사인이 숨 쉬듯 은은하게 발광하는 Neon Glow Pulse 효과를 적용해 줘.',
  },
  {
    id: 'liquid-slide-fill',
    category: 'hover',
    vibeTag: '배경색이 옆에서 촤악 차오르는',
    vibeKeywords: ['차오르는', '슬라이드 채움', '색이 채워지는', '호버 반전', '리퀴드'],
    titleKo: '슬라이드 컬러 필',
    titleEn: 'Slide Background Fill Button',
    summary: '마우스를 올리면 배경색 레이어가 미끄러져 채워지는 버튼',
    promptSnippet:
      '마우스 호버 시 버튼 내부의 배경 레이어가 `translateX(-100%)`에서 `translateX(0)`으로 빠르게 슬라이드되며 배경색과 텍스트 색상이 반전되는 Slide Fill Button을 구현해 줘.',
  },

  /* ==================== 2. 카드·3D (card) ==================== */
  {
    id: 'card-flip-3d',
    category: 'card',
    vibeTag: '앞뒤로 휙 입체 회전하는',
    vibeKeywords: ['휙 뒤집히는', '앞뒤 카드', '입체 회전', '플립', '뒷면 보기', '3D'],
    titleKo: '3D 카드 플립',
    titleEn: '3D Perspective Card Flip',
    summary: '클릭하면 Y축 180도로 입체 회전하며 뒷면 노출',
    promptSnippet:
      '카드 컨테이너에 `perspective: 1000px`, 내부 래퍼에 `transform-style: preserve-3d`를 주고 클릭 시 `rotateY(180deg)`로 0.6초 동안 회전하며 뒷면이 나타나는 3D Card Flip을 구현해 줘.',
  },
  {
    id: 'tilt-3d-card',
    category: 'card',
    vibeTag: '마우스 따라 입체로 기울어지는',
    vibeKeywords: ['입체 기울기', '틸트', '홀로그램', '각도 변화', '마우스 반응 카드', '3D'],
    titleKo: '3D 퍼스펙티브 틸트',
    titleEn: '3D Interactive Mouse Tilt',
    summary: '커서 위치에 맞춰 카드가 상하좌우 입체로 기울어짐',
    promptSnippet:
      '카드 위에서 마우스 이동 시 중심 대비 좌표를 계산해 `perspective(800px) rotateX(...) rotateY(...)`를 실시간 적용하고, 마우스가 떠나면 부드럽게 수평으로 돌아오는 3D Tilt Card를 구현해 줘.',
  },
  {
    id: 'glassmorphism-card',
    category: 'card',
    vibeTag: '반투명 간유리처럼 뒤가 비치는',
    vibeKeywords: ['유리 같은', '블러', '반투명', '글래스모피즘', '애플 스타일', '모던'],
    titleKo: '프로스티드 글래스모피즘',
    titleEn: 'Frosted Glassmorphism UI',
    summary: '배경 빛이 은은하게 투과되는 반투명 블러 유리 질감',
    promptSnippet:
      '배경의 컬러풀한 오브젝트가 은은하게 비치도록 `backdrop-filter: blur(16px)`, 반투명 배경(`bg-white/10`), 얇은 하이라이트 보더(`border-white/20`)를 조합한 Glassmorphism 카드를 적용해 줘.',
  },
  {
    id: 'spotlight-border-card',
    category: 'card',
    vibeTag: '마우스 따라 카드 테두리가 빛나는',
    vibeKeywords: ['테두리 빛', '스포트라이트 보더', '라디얼 글로우', 'Linear 스타일', '마우스 조명'],
    titleKo: '라디얼 커서 스포트라이트',
    titleEn: 'Radial Cursor Glow Card',
    summary: '커서가 위치한 곳만 은은한 원형 조명이 비치는 카드',
    promptSnippet:
      '카드 위에서 마우스 좌표(`x, y`)를 추적해 `radial-gradient(220px circle at ${x}px ${y}px, rgba(99,102,241,0.28), transparent 80%)` 조명이 커서를 따라다니는 Radial Spotlight Card를 만들어 줘.',
  },
  {
    id: 'stacked-card-cycle',
    category: 'card',
    vibeTag: '겹쳐진 카드를 한 장씩 휙 넘기는',
    vibeKeywords: ['겹쳐진 카드', '스택', '카드 덱', '스와이프', '다음 카드', '캐러셀'],
    titleKo: '스택 카드 사이클',
    titleEn: 'Stacked Card Deck Switcher',
    summary: '여러 장 겹쳐진 카드가 스케일과 깊이를 바꾸며 순환',
    promptSnippet:
      '3장의 카드가 `scale`과 `translateY` 오프셋으로 겹쳐진 Stacked Card Deck을 만들고, 클릭할 때마다 맨 앞 카드가 뒤로 넘어가며 다음 카드가 부드럽게 앞으로 나오는 인터랙션을 구현해 줘.',
  },

  /* ==================== 3. 등장·모션 (motion) ==================== */
  {
    id: 'spring-bounce-modal',
    category: 'motion',
    vibeTag: '통통 튀며 탱글하게 나타나는',
    vibeKeywords: ['통통 튀는', '탱글탱글', '탄성', '바운스', '젤리 같은', '뿅 나타나는', '오버슈트'],
    titleKo: '스프링 바운스 팝',
    titleEn: 'Spring Physics Overshoot Pop',
    summary: '살짝 더 커졌다가(112%) 탄성 있게 제자리로 안착하는 모션',
    promptSnippet:
      '요소가 등장할 때 `cubic-bezier(0.34, 1.56, 0.64, 1)` 스프링 오버슈트 이징을 적용해 `scale(0.5)`에서 `scale(1.12)`까지 튕겼다가 `scale(1)`로 안착하는 탄성 팝 모션을 적용해 줘.',
  },
  {
    id: 'staggered-list',
    category: 'motion',
    vibeTag: '도미노처럼 촤르륵 순서대로 뜨는',
    vibeKeywords: ['촤르륵 순서대로', '차례대로', '도미노', '물결 등장', '스태거드', '리스트 모션'],
    titleKo: '스태거드 캐스케이드',
    titleEn: 'Staggered Cascade Fade-in',
    summary: '목록 아이템이 짧은 시간차를 두고 아래서 위로 순차 등장',
    promptSnippet:
      '목록 아이템들에 `index * 80ms`의 `animation-delay`를 부여해 아래(`translateY(14px)`, `opacity: 0`)에서 위로 도미노처럼 촤르륵 순차 등장하는 Staggered Cascade 애니메이션을 적용해 줘.',
  },
  {
    id: 'smooth-accordion',
    category: 'motion',
    vibeTag: '접힌 영역이 스르륵 펼쳐지는',
    vibeKeywords: ['스르륵 펼쳐지는', '아코디언', '접기 펼치기', 'FAQ', '드로어', '높이 전환'],
    titleKo: '스무스 확장 아코디언',
    titleEn: 'Smooth Height Expand Accordion',
    summary: '클릭 시 끊김 없이 부드러운 높이 변화로 열리고 닫힘',
    promptSnippet:
      '클릭 시 숨겨진 상세 영역이 CSS Grid `grid-template-rows: 0fr`에서 `1fr`로 전환되며 높이와 투명도가 스르륵 부드럽게 펼쳐지는 Smooth Accordion을 구현해 줘.',
  },
  {
    id: 'morphing-state-button',
    category: 'motion',
    vibeTag: '버튼이 로딩·완료 모양으로 변신하는',
    vibeKeywords: ['변신하는', '모핑', '로딩 버튼', '상태 전환', '스피너 체크', '부드러운 변화'],
    titleKo: '모핑 스테이트 버튼',
    titleEn: 'Morphing Multi-State Button',
    summary: '기본 ➔ 로딩 스피너 ➔ 완료 체크로 폭과 색상이 매끄럽게 변형',
    promptSnippet:
      '버튼 클릭 시 [Idle ➔ Loading ➔ Success] 3단계로 버튼 너비, 배경색, 내부 아이콘이 레이아웃 덜컥거림 없이 매끄럽게 변형되는 Morphing State Button을 구현해 줘.',
  },
  {
    id: 'floating-levitation',
    category: 'motion',
    vibeTag: '무중력처럼 공중에 둥둥 떠 있는',
    vibeKeywords: ['둥둥 떠다니는', '무중력', '플로팅', '살랑살랑', '부유하는', '히어로 아이콘'],
    titleKo: '플로팅 레비테이션',
    titleEn: 'Floating Levitation Loop',
    summary: '위아래로 천천히 오르내리며 바닥 그림자 크기도 함께 반응',
    promptSnippet:
      '요소가 2.2초 주기로 위아래(`translateY(-7px)`)로 부드럽게 둥둥 떠다니고, 동시에 하단 그림자(`blur`, `scale`)가 멀어질 때 작아지고 가까워질 때 진해지는 Floating Levitation 효과를 넣어 줘.',
  },

  /* ==================== 4. 텍스트·타이포 (text) ==================== */
  {
    id: 'typewriter-streaming',
    category: 'text',
    vibeTag: '타자기처럼 다다닥 한 글자씩 치는',
    vibeKeywords: ['다다닥 타이핑', '타자기', '한글자씩', '커서 깜빡임', 'AI 스트리밍'],
    titleKo: '타이프라이터 타이핑',
    titleEn: 'Typewriter Streaming Text',
    summary: '깜빡이는 커서와 함께 글자가 실시간으로 타이핑되는 효과',
    promptSnippet:
      '텍스트가 35ms 간격으로 한 글자씩 순차 출력되고 끝에 깜빡이는 커서(`▋`)가 따라붙는 Typewriter Streaming Text 효과를 구현해 줘.',
  },
  {
    id: 'scramble-decode-text',
    category: 'text',
    vibeTag: '암호가 해독되듯 샤라락 바뀌는 글자',
    vibeKeywords: ['암호 해독', '샤라락', '매트릭스', '랜덤 글자', '스크램블', '사이버', '글리치'],
    titleKo: '스크램블 텍스트 디코드',
    titleEn: 'Scramble / Cipher Text Decode',
    summary: '무작위 기호들이 빠르게 회전하다가 원래 문장으로 맞춰짐',
    promptSnippet:
      '호버하거나 클릭할 때 알파벳/기호(`!<>-_\\/[]{}—=+*^?#`)가 빠르게 무작위로 바뀌다가 왼쪽부터 한 글자씩 원래 텍스트로 해독되는 Scramble Text Decode 효과를 구현해 줘.',
  },
  {
    id: 'gradient-flow-text',
    category: 'text',
    vibeTag: '글자 안에 오로라 빛깔이 흐르는',
    vibeKeywords: ['무지개 글자', '오로라', '그라데이션 텍스트', '빛이 흐르는 글자', '타이틀 강조'],
    titleKo: '애니메이티드 그라데이션 텍스트',
    titleEn: 'Animated Flowing Gradient Text',
    summary: '텍스트 내부의 다중 컬러 그라데이션이 끊임없이 이동',
    promptSnippet:
      '헤드라인 텍스트에 `bg-clip-text text-transparent`와 `background-size: 200% auto`를 주고, 그라데이션 포지션이 좌우로 계속 흐르는 Animated Gradient Text를 적용해 줘.',
  },
  {
    id: 'slot-number-ticker',
    category: 'text',
    vibeTag: '숫자가 드르륵 빠르게 올라가는',
    vibeKeywords: ['드르륵 숫자', '카운트업', '슬롯머신', '통계 숫자', '점수 올라가는', '티커'],
    titleKo: '넘버 카운트업 티커',
    titleEn: 'Animated Number Count-up Ticker',
    summary: '목표 숫자까지 감속 곡선을 그리며 드르륵 올라가는 카운터',
    promptSnippet:
      '숫자 지표가 변경될 때 `requestAnimationFrame`과 easeOutQuart 감속 함수를 사용해 0에서 목표 수치까지 0.8초 동안 드르륵 부드럽게 카운트업되는 Number Ticker를 구현해 줘.',
  },
  {
    id: 'marker-highlight-draw',
    category: 'text',
    vibeTag: '중요한 문장에 형광펜을 슥 긋는',
    vibeKeywords: ['형광펜', '밑줄 긋기', '마커 드로잉', '강조 줄', '슥 그어지는'],
    titleKo: '형광펜 마커 드로잉',
    titleEn: 'Animated Marker Highlight Draw',
    summary: '핵심 단어 뒤로 형광펜 배경이 왼쪽에서 오른쪽으로 칠해짐',
    promptSnippet:
      '강조할 텍스트 뒤에 인라인 그라데이션 배경을 깔고 `background-size`가 `0% 100%`에서 `100% 100%`로 0.5초 동안 슥 그어지듯 채워지는 Marker Highlight 효과를 적용해 줘.',
  },

  /* ==================== 5. 피드백·파티클 (feedback) ==================== */
  {
    id: 'confetti-burst',
    category: 'feedback',
    vibeTag: '팡 터지는 화려한 꽃가루 폭죽',
    vibeKeywords: ['팡 터지는', '폭죽', '꽃가루', '축하', '컨페티', '파티클', '성공'],
    titleKo: '컨페티 파티클 버스트',
    titleEn: 'Confetti Particle Burst',
    summary: '클릭 지점에서 다채로운 폭죽 조각들이 사방으로 퍼져나감',
    promptSnippet:
      '완료/성공 액션 시 버튼 위치에서 다채로운 색상의 파티클 조각들이 방사형 속도와 회전을 갖고 0.85초 동안 사방으로 터져 나가는 Confetti Particle Burst를 구현해 줘.',
  },
  {
    id: 'error-shake-tooltip',
    category: 'feedback',
    vibeTag: '부르르 도리도리 떨리는 진동',
    vibeKeywords: ['부르르 떨리는', '도리도리', '진동', '에러 흔들림', '경고', '셰이크'],
    titleKo: '에러 셰이크 & 플로팅 배지',
    titleEn: 'Horizontal Error Shake',
    summary: '잘못된 동작 시 좌우로 빠르게 진동하며 안내 배지 노출',
    promptSnippet:
      '유효성 실패 시 입력 박스가 0.42초 동안 좌우(`±8px`)로 빠르게 진동하는 Horizontal Error Shake 키프레임을 실행하고 상단에 플로팅 안내 툴팁을 띄워 줘.',
  },
  {
    id: 'heart-like-burst',
    category: 'feedback',
    vibeTag: '하트가 뿅 커지며 링이 퍼지는',
    vibeKeywords: ['하트', '좋아요', '뿅 커지는', '트위터 하트', '북마크', '파티클 링'],
    titleKo: '라이크 버스트 팝',
    titleEn: 'Heart Like Ring & Particle Pop',
    summary: '클릭 시 아이콘이 탄성 있게 튀어 오르며 주변에 점들이 퍼짐',
    promptSnippet:
      '좋아요 버튼 클릭 시 하트 아이콘이 스프링 바운스로 커지고, 동시에 외곽 원형 링과 미니 도트 파티클 6개가 바깥으로 톡 튀어나가는 Heart Burst 애니메이션을 구현해 줘.',
  },
  {
    id: 'toast-slide-stack',
    category: 'feedback',
    vibeTag: '화면 구석에서 쏙 올라오는 알림창',
    vibeKeywords: ['쏙 올라오는', '토스트', '알림창', '스낵바', '슬라이드 알림', '팝업'],
    titleKo: '스택 슬라이드 토스트',
    titleEn: 'Slide-in Toast Notification',
    summary: '하단에서 탄성 있게 미끄러져 올라와 쌓이는 미니 알림 바',
    promptSnippet:
      '액션 발생 시 하단에서 위로 스프링 이징과 함께 쏙 미끄러져 올라오고 진행률 게이지가 줄어드는 Slide-in Toast Notification 컴포넌트를 구현해 줘.',
  },

  /* ==================== 6. 레이아웃·배너 (layout) ==================== */
  {
    id: 'sliding-pill-tabs',
    category: 'layout',
    vibeTag: '배경 캡슐이 스르륵 따라다니는 탭',
    vibeKeywords: ['스르륵 캡슐 탭', '슬라이딩 탭', '움직이는 배경', '세그먼트 컨트롤', 'iOS 탭'],
    titleKo: '슬라이딩 필 인디케이터 탭',
    titleEn: 'Sliding Pill Tab Indicator',
    summary: '탭을 바꿀 때 활성 배경 캡슐이 선택한 탭 위치로 미끄러짐',
    promptSnippet:
      '탭 메뉴 전환 시 활성 탭을 감싸는 둥근 배경 Pill 요소가 `translateX` 트랜지션으로 선택된 탭 위치까지 스르륵 미끄러져 이동하는 Sliding Pill Tabs를 구현해 줘.',
  },
  {
    id: 'infinite-marquee',
    category: 'layout',
    vibeTag: '끊김 없이 무한히 흘러가는 배너',
    vibeKeywords: ['무한 흐르는', '전광판', '마키', '로고 슬라이더', '티커 배너', '자동 스크롤'],
    titleKo: '인피니트 마키 티커',
    titleEn: 'Infinite Seamless Marquee',
    summary: '로고나 키워드 트랙이 끊기는 구간 없이 계속 옆으로 흐름',
    promptSnippet:
      '동일한 아이템 그룹 2개를 나란히 배치하고 `translateX(0%)`에서 `translateX(-50%)`까지 선형(linear) 무한 반복하며 마우스 호버 시 일시정지되는 Infinite Marquee 배너를 구현해 줘.',
  },
  {
    id: 'skeleton-shimmer',
    category: 'layout',
    vibeTag: '로딩 중에 은은한 빛이 흐르는 뼈대',
    vibeKeywords: ['로딩 뼈대', '스켈레톤', '자리표시자', '은은하게 흐르는', '플레이스홀더'],
    titleKo: '스켈레톤 쉬머 로더',
    titleEn: 'Skeleton Shimmer Placeholder',
    summary: '데이터가 뜨기 전 UI 윤곽선 위로 부드러운 광택이 흐름',
    promptSnippet:
      '데이터 로딩 상태에서 실제 카드 레이아웃 모양의 회색 블록 위로 밝은 그라데이션이 부드럽게 스쳐 지나가는 Skeleton Shimmer Loader를 적용해 줘.',
  },
  {
    id: 'spotlight-focus',
    category: 'layout',
    vibeTag: '주변은 어둡게 끄고 여기만 비추는',
    vibeKeywords: ['손전등 집중', '주변 어둡게', '스포트라이트', '포커스', '하이라이트', '온보딩'],
    titleKo: '스포트라이트 딤 포커스',
    titleEn: 'Spotlight Dimmed Focus',
    summary: '나머지 요소를 흐리게 죽이고 선택한 요소만 선명하게 강조',
    promptSnippet:
      '비활성 항목들은 `opacity-25 blur-[0.5px]`로 낮추고, 현재 포커스된 항목만 밝은 링(`ring-2`)과 스케일 업으로 또렷하게 부각하는 Spotlight Focus 효과를 적용해 줘.',
  },

  /* ==================== 7. 조작·인터랙션 (control) ==================== */
  {
    id: 'before-after-slider',
    category: 'control',
    vibeTag: '막대를 좌우로 밀어 전후를 비교하는',
    vibeKeywords: ['전후 비교', '비포 애프터', '슬라이더 분할', '커튼 밀기', '화면 비교'],
    titleKo: '비포 & 애프터 비교 슬라이더',
    titleEn: 'Before / After Split Comparison',
    summary: '중앙 핸들을 좌우로 움직여 두 화면의 차이를 즉석 비교',
    promptSnippet:
      '두 개의 레이어를 겹쳐 놓고 드래그/레인지 값(0~100%)에 따라 상단 레이어의 `clip-path: inset(0 ${100 - pos}% 0 0)`와 분할선 핸들 위치를 조절하는 Before/After Comparison Slider를 구현해 줘.',
  },
  {
    id: 'drag-snap-slot',
    category: 'control',
    vibeTag: '조각을 빈칸에 자석처럼 착 끼우는',
    vibeKeywords: ['착 끼우는', '빈칸 조립', '블록 스냅', '퍼즐 맞추기', '슬롯 장착'],
    titleKo: '스냅 투 슬롯 블록',
    titleEn: 'Snap-to-Slot Token Block',
    summary: '아이템을 선택하면 빈 슬롯에 탄성 있게 착 끼워 맞춰짐',
    promptSnippet:
      '토큰/칩을 클릭하거나 드래그했을 때 타겟 슬롯이 하이라이트되며 스프링 바운스 모션과 함께 슬롯 내부에 착 장착되는 Snap-to-Slot 인터랙션을 구현해 줘.',
  },
  {
    id: 'elastic-toggle-switch',
    category: 'control',
    vibeTag: '스위치가 쫀득하게 늘어났다 넘어가는',
    vibeKeywords: ['쫀득한 스위치', '토글', '온오프', '탄성 스위치', 'iOS 스위치'],
    titleKo: '일래스틱 토글 스위치',
    titleEn: 'Elastic Spring Toggle Switch',
    summary: 'ON/OFF 전환 시 노브가 탄성 있게 튕기며 배경색이 전환됨',
    promptSnippet:
      '토글 스위치 클릭 시 내부 원형 노브가 `cubic-bezier(0.34, 1.56, 0.64, 1)` 탄성 곡선으로 이동하고 클릭 순간 가로로 살짝 늘어나는 Elastic Toggle Switch를 구현해 줘.',
  },
  {
    id: 'combo-gauge-pop',
    category: 'control',
    vibeTag: '게이지가 차오르며 배지가 통 튀는',
    vibeKeywords: ['차오르는 게이지', '프로그레스 바', '타격감', '콤보 팝', '달성률'],
    titleKo: '스무스 게이지 & 스케일 팝',
    titleEn: 'Smooth Progress & Scale Pop',
    summary: '진행 바가 부드럽게 차오르며 상태 배지가 탄성 있게 튀어 오름',
    promptSnippet:
      '수치 증가 시 프로그레스 바 너비가 그라데이션과 함께 부드럽게 차오르고, 상단 카운터 배지가 일시적으로 `scale(1.22)`로 튀어 오르는 Smooth Gauge & Pop 연출을 적용해 줘.',
  },
];
