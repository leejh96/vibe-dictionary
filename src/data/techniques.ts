export type DomainType = 'ui' | 'motion' | 'layout' | 'style' | 'video';

export type CategoryType =
  /* 1. UI 하위 카테고리 */
  | 'hover'
  | 'card'
  | 'motion'
  | 'text'
  | 'feedback'
  | 'layout'
  | 'control'
  /* 2. 그래픽 하위 카테고리 */
  | 'graphic'
  | 'shader'
  | 'physics'
  | 'kinetic'
  | 'camera'
  | 'vfx'
  /* 3. 레이아웃 하위 카테고리 */
  | 'grid'
  | 'scroll'
  | 'nav'
  | 'panel'
  /* 4. 스타일 하위 카테고리 */
  | 'modern'
  | 'tactile'
  | 'retro'
  | 'scifi'
  /* 5. 모션 영상 하위 카테고리 */
  | 'promo'
  | 'kinetic_ad'
  | 'infographic'
  | 'broadcast';

interface CategoryMeta {
  id: CategoryType | 'all';
  label: string;
}

const UI_CATEGORIES: CategoryMeta[] = [
  { id: 'all', label: '전체' },
  { id: 'hover', label: '버튼·호버' },
  { id: 'card', label: '카드·3D' },
  { id: 'motion', label: '등장·상태전환' },
  { id: 'text', label: '텍스트·카운터' },
  { id: 'feedback', label: '피드백·알림' },
  { id: 'layout', label: '탭·배너·로더' },
  { id: 'control', label: '슬라이더·토글' },
];

const MOTION_CATEGORIES: CategoryMeta[] = [
  { id: 'all', label: '전체' },
  { id: 'graphic', label: '도형·SVG·모핑' },
  { id: 'shader', label: '배경·파티클·조명' },
  { id: 'physics', label: '물리·모션 원리' },
  { id: 'kinetic', label: '키네틱 타이포' },
  { id: 'camera', label: '공간감·카메라(2.5D)' },
  { id: 'vfx', label: '화면전환·VFX' },
];

const LAYOUT_CATEGORIES: CategoryMeta[] = [
  { id: 'all', label: '전체' },
  { id: 'grid', label: '그리드·카드배치' },
  { id: 'scroll', label: '스크롤·전환구조' },
  { id: 'nav', label: '네비게이션·메뉴' },
  { id: 'panel', label: '패널·보드·데이터뷰' },
];

const STYLE_CATEGORIES: CategoryMeta[] = [
  { id: 'all', label: '전체' },
  { id: 'modern', label: '모던·트렌드' },
  { id: 'tactile', label: '입체·촉각질감' },
  { id: 'retro', label: '레트로·픽셀·CRT' },
  { id: 'scifi', label: 'SF·도면·팝아트' },
];

const VIDEO_CATEGORIES: CategoryMeta[] = [
  { id: 'all', label: '전체' },
  { id: 'promo', label: '런칭·쇼릴·홍보' },
  { id: 'kinetic_ad', label: '타이포·리듬 광고' },
  { id: 'infographic', label: '데이터·차트 모션' },
  { id: 'broadcast', label: '방송·트랜지션·자막' },
];

export const DOMAIN_LABELS: Record<DomainType, string> = {
  ui: 'UI',
  motion: '그래픽',
  layout: '레이아웃',
  style: '스타일',
  video: '모션 영상',
};

export const DOMAIN_CATEGORIES: Record<DomainType, CategoryMeta[]> = {
  ui: UI_CATEGORIES,
  motion: MOTION_CATEGORIES,
  layout: LAYOUT_CATEGORIES,
  style: STYLE_CATEGORIES,
  video: VIDEO_CATEGORIES,
};

export const CATEGORY_LABEL_MAP: Record<string, string> = Object.fromEntries(
  [
    ...UI_CATEGORIES,
    ...MOTION_CATEGORIES,
    ...LAYOUT_CATEGORIES,
    ...STYLE_CATEGORIES,
    ...VIDEO_CATEGORIES,
  ].map((c) => [c.id, c.label])
);

export interface TechniqueItem {
  id: string;
  domain: DomainType;
  category: CategoryType;
  vibeTag: string;
  vibeKeywords: string[];
  titleKo: string;
  titleEn: string;
  summary: string;
  promptSnippet: string;
}

export const TECHNIQUES: TechniqueItem[] = [
  /* =====================================================================
   * DOMAIN 1: UI (32종)
   * ===================================================================== */
  {
    id: 'magnetic-hover',
    domain: 'ui',
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
    domain: 'ui',
    category: 'hover',
    vibeTag: '반짝 빛이 스쳐 지나가는',
    vibeKeywords: ['반짝 스치는', '광택', '빛나는', '시머', '고급스러운', '하이라이트 버튼'],
    titleKo: '시머 광택 스윕',
    titleEn: 'Shimmer Light Sweep',
    summary: '대각선 빛줄기가 표면을 주기적으로 스쳐가는 연출',
    promptSnippet:
      '버튼/배지 위에 Shimmer Light Sweep 효과를 적용해 줘. 반투명 흰색 그라데이션(`via-white/50`) 레이어를 `skewX(-20deg)`로 기울여 왼쪽(`-160%`)에서 오른쪽(`260%`)으로 미끄러지듯 지나가게 해 줘.',
  },
  {
    id: 'ripple-click',
    domain: 'ui',
    category: 'hover',
    vibeTag: '클릭한 곳에서 물결이 퍼지는',
    vibeKeywords: ['물결', '리플', '파동', '클릭 타격감', '퍼져나가는', '터치 반응'],
    titleKo: '리플 물결 클릭',
    titleEn: 'Material Ripple Click',
    summary: '클릭 지점부터 동심원 물결이 부드럽게 퍼지는 효과',
    promptSnippet:
      '버튼 클릭 시 클릭한 정확한 마우스 좌표(`clientX - rect.left`)에서 원형 Ripple 물결이 `scale(0)`에서 `scale(14)`로 커지며 `opacity: 0`으로 사라지는 Material Ripple 이펙트를 구현해 줘.',
  },
  {
    id: 'neon-glow-pulse',
    domain: 'ui',
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
    domain: 'ui',
    category: 'hover',
    vibeTag: '배경색이 옆에서 촤악 차오르는',
    vibeKeywords: ['차오르는', '슬라이드 채움', '색이 채워지는', '호버 반전', '리퀴드'],
    titleKo: '슬라이드 컬러 필',
    titleEn: 'Slide Background Fill Button',
    summary: '마우스를 올리면 배경색 레이어가 미끄러져 채워지는 버튼',
    promptSnippet:
      '마우스 호버 시 버튼 내부의 배경 레이어가 `translateX(-100%)`에서 `translateX(0)`으로 빠르게 슬라이드되며 배경색과 텍스트 색상이 반전되는 Slide Fill Button을 구현해 줘.',
  },
  {
    id: 'card-flip-3d',
    domain: 'ui',
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
    domain: 'ui',
    category: 'card',
    vibeTag: '마우스 따라 입체로 기울어지는',
    vibeKeywords: ['입체 기울기', '틸트', '홀로그램', '각도 변화', '마우스 반응 카드', '3D'],
    titleKo: '3D 퍼스펙티브 틸트',
    titleEn: '3D Interactive Mouse Tilt',
    summary: '커서 위치에 맞춰 카드가 상하좌우 입체로 기울어짐',
    promptSnippet:
      '카드 위에서 마우스 이동 시 중심 대비 좌표를 계산해 `perspective(600px) rotateX(...) rotateY(...)`와 광택 하이라이트를 실시간 적용하고, 마우스가 떠나면 수평으로 돌아오는 3D Tilt Card를 구현해 줘.',
  },
  {
    id: 'glassmorphism-card',
    domain: 'ui',
    category: 'card',
    vibeTag: '반투명 간유리처럼 뒤가 비치는',
    vibeKeywords: ['유리 같은', '블러', '반투명', '글래스모피즘', '애플 스타일', '모던'],
    titleKo: '프로스티드 글래스모피즘',
    titleEn: 'Frosted Glassmorphism UI',
    summary: '배경 빛이 은은하게 투과되는 반투명 블러 유리 질감',
    promptSnippet:
      '배경의 컬러풀한 오브젝트가 은은하게 비치도록 `backdrop-filter: blur(16px)`, 반투명 배경(`bg-white/10`), 얇은 하이라이트 보더(`border-white/25`)를 조합한 Glassmorphism 카드를 적용해 줘.',
  },
  {
    id: 'spotlight-border-card',
    domain: 'ui',
    category: 'card',
    vibeTag: '마우스 따라 카드 조명이 비치는',
    vibeKeywords: ['테두리 빛', '스포트라이트 보더', '라디얼 글로우', 'Linear 스타일', '마우스 조명'],
    titleKo: '라디얼 커서 스포트라이트',
    titleEn: 'Radial Cursor Glow Card',
    summary: '커서가 위치한 곳만 은은한 원형 조명이 비치는 카드',
    promptSnippet:
      '카드 위에서 마우스 좌표(`x, y`)를 추적해 `radial-gradient(120px circle at ${x}px ${y}px, rgba(129,140,248,0.4), transparent 80%)` 조명이 커서를 따라다니는 Radial Spotlight Card를 만들어 줘.',
  },
  {
    id: 'stacked-card-cycle',
    domain: 'ui',
    category: 'card',
    vibeTag: '겹쳐진 카드를 한 장씩 휙 넘기는',
    vibeKeywords: ['겹쳐진 카드', '스택', '카드 덱', '스와이프', '다음 카드', '캐러셀'],
    titleKo: '스택 카드 사이클',
    titleEn: 'Stacked Card Deck Switcher',
    summary: '여러 장 겹쳐진 카드가 스케일과 깊이를 바꾸며 순환',
    promptSnippet:
      '3장의 카드가 `scale`과 `translateY` 오프셋으로 겹쳐진 Stacked Card Deck을 만들고, 클릭할 때마다 맨 앞 카드가 뒤로 넘어가며 다음 카드가 부드럽게 앞으로 나오는 인터랙션을 구현해 줘.',
  },
  {
    id: 'spring-bounce-modal',
    domain: 'ui',
    category: 'motion',
    vibeTag: '통통 튀며 탱글하게 나타나는',
    vibeKeywords: ['통통 튀는', '탱글탱글', '탄성', '바운스', '젤리 같은', '뿅 나타나는', '오버슈트'],
    titleKo: '스프링 바운스 팝',
    titleEn: 'Spring Physics Overshoot Pop',
    summary: '살짝 더 커졌다가(114%) 탄성 있게 제자리로 안착하는 모션',
    promptSnippet:
      '요소가 등장할 때 `cubic-bezier(0.34, 1.56, 0.64, 1)` 스프링 오버슈트 이징을 적용해 `scale(0.45)`에서 `scale(1.14)`까지 튕겼다가 `scale(1)`로 안착하는 탄성 팝 모션을 적용해 줘.',
  },
  {
    id: 'staggered-list',
    domain: 'ui',
    category: 'motion',
    vibeTag: '도미노처럼 촤르륵 순서대로 뜨는',
    vibeKeywords: ['촤르륵 순서대로', '차례대로', '도미노', '물결 등장', '스태거드', '리스트 모션'],
    titleKo: '스태거드 캐스케이드',
    titleEn: 'Staggered Cascade Fade-in',
    summary: '목록 아이템이 짧은 시간차를 두고 아래서 위로 순차 등장',
    promptSnippet:
      '목록 아이템들에 `index * 90ms`의 `animation-delay`를 부여해 아래(`translateY(12px)`, `opacity: 0`)에서 위로 도미노처럼 촤르륵 순차 등장하는 Staggered Cascade 애니메이션을 적용해 줘.',
  },
  {
    id: 'smooth-accordion',
    domain: 'ui',
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
    domain: 'ui',
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
    domain: 'ui',
    category: 'motion',
    vibeTag: '무중력처럼 공중에 둥둥 떠 있는',
    vibeKeywords: ['둥둥 떠다니는', '무중력', '플로팅', '살랑살랑', '부유하는', '히어로 아이콘'],
    titleKo: '플로팅 레비테이션',
    titleEn: 'Floating Levitation Loop',
    summary: '위아래로 천천히 오르내리며 바닥 그림자 크기도 함께 반응',
    promptSnippet:
      '요소가 2.2초 주기로 위아래(`translateY(-9px)`)로 부드럽게 둥둥 떠다니고, 동시에 하단 그림자(`blur`, `scale`)가 멀어질 때 작아지고 가까워질 때 진해지는 Floating Levitation 효과를 넣어 줘.',
  },
  {
    id: 'typewriter-streaming',
    domain: 'ui',
    category: 'text',
    vibeTag: '타자기처럼 다다닥 한 글자씩 치는',
    vibeKeywords: ['다다닥 타이핑', '타자기', '한글자씩', '커서 깜빡임', 'AI 스트리밍'],
    titleKo: '타이프라이터 타이핑',
    titleEn: 'Typewriter Streaming Text',
    summary: '깜빡이는 커서와 함께 글자가 실시간으로 타이핑되는 효과',
    promptSnippet:
      '텍스트가 50ms 간격으로 한 글자씩 순차 출력되고 끝에 깜빡이는 커서(`▋`)가 따라붙는 Typewriter Streaming Text 효과를 구현해 줘.',
  },
  {
    id: 'scramble-decode-text',
    domain: 'ui',
    category: 'text',
    vibeTag: '암호가 해독되듯 샤라락 바뀌는 글자',
    vibeKeywords: ['암호 해독', '샤라락', '매트릭스', '랜덤 글자', '스크램블', '사이버'],
    titleKo: '스크램블 텍스트 디코드',
    titleEn: 'Scramble / Cipher Text Decode',
    summary: '무작위 기호들이 빠르게 회전하다가 원래 문장으로 맞춰짐',
    promptSnippet:
      '호버하거나 클릭할 때 알파벳/기호(`!<>-_\\/[]{}—=+*^?#`)가 빠르게 무작위로 바뀌다가 왼쪽부터 한 글자씩 원래 텍스트로 해독되는 Scramble Text Decode 효과를 구현해 줘.',
  },
  {
    id: 'gradient-flow-text',
    domain: 'ui',
    category: 'text',
    vibeTag: '글자 안에 오로라 빛깔이 흐르는',
    vibeKeywords: ['무지개 글자', '오로라', '그라데이션 텍스트', '빛이 흐르는 글자', '타이틀 강조'],
    titleKo: '애니메이티드 그라데이션 텍스트',
    titleEn: 'Animated Flowing Gradient Text',
    summary: '텍스트 내부의 다중 컬러 그라데이션이 끊임없이 이동',
    promptSnippet:
      '헤드라인 텍스트에 `bg-clip-text text-transparent`와 `background-size: 220% 220%`를 주고, 그라데이션 포지션이 좌우로 계속 흐르는 Animated Gradient Text를 적용해 줘.',
  },
  {
    id: 'slot-number-ticker',
    domain: 'ui',
    category: 'text',
    vibeTag: '숫자가 드르륵 빠르게 올라가는',
    vibeKeywords: ['드르륵 숫자', '카운트업', '슬롯머신', '통계 숫자', '점수 올라가는', '티커'],
    titleKo: '넘버 카운트업 티커',
    titleEn: 'Animated Number Count-up Ticker',
    summary: '목표 숫자까지 감속 곡선을 그리며 드르륵 올라가는 카운터',
    promptSnippet:
      '숫자 지표가 변경될 때 `requestAnimationFrame`과 easeOutQuart 감속 함수를 사용해 시작 값에서 목표 수치까지 0.65초 동안 드르륵 부드럽게 카운트업되는 Number Ticker를 구현해 줘.',
  },
  {
    id: 'marker-highlight-draw',
    domain: 'ui',
    category: 'text',
    vibeTag: '중요한 문장에 형광펜을 슥 긋는',
    vibeKeywords: ['형광펜', '밑줄 긋기', '마커 드로잉', '강조 줄', '슥 그어지는'],
    titleKo: '형광펜 마커 드로잉',
    titleEn: 'Animated Marker Highlight Draw',
    summary: '핵심 단어 뒤로 형광펜 배경이 왼쪽에서 오른쪽으로 칠해짐',
    promptSnippet:
      '강조할 텍스트 뒤에 인라인 그라데이션 배경을 깔고 `background-size`가 `0% 85%`에서 `100% 85%`로 0.55초 동안 슥 그어지듯 채워지는 Marker Highlight 효과를 적용해 줘.',
  },
  {
    id: 'confetti-burst',
    domain: 'ui',
    category: 'feedback',
    vibeTag: '팡 터지는 화려한 꽃가루 폭죽',
    vibeKeywords: ['팡 터지는', '폭죽', '꽃가루', '축하', '컨페티', '파티클', '성공'],
    titleKo: '컨페티 파티클 버스트',
    titleEn: 'Confetti Particle Burst',
    summary: '클릭 지점에서 다채로운 폭죽 조각들이 사방으로 퍼져나감',
    promptSnippet:
      '완료/성공 액션 시 버튼 위치에서 다채로운 색상의 파티클 조각들이 방사형 속도와 회전을 갖고 0.8초 동안 사방으로 터져 나가는 Confetti Particle Burst를 구현해 줘.',
  },
  {
    id: 'error-shake-tooltip',
    domain: 'ui',
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
    domain: 'ui',
    category: 'feedback',
    vibeTag: '하트가 뿅 커지며 링이 퍼지는',
    vibeKeywords: ['하트', '좋아요', '뿅 커지는', '트위터 하트', '북마크', '파티클 링'],
    titleKo: '라이크 버스트 팝',
    titleEn: 'Heart Like Ring & Particle Pop',
    summary: '클릭 시 아이콘이 탄성 있게 튀어 오르며 외곽 링이 확산됨',
    promptSnippet:
      '좋아요 버튼 클릭 시 하트 아이콘이 스프링 바운스로 커지고, 동시에 외곽 원형 링이 `scale(0.5)`에서 `scale(1.85)`로 퍼지며 사라지는 Heart Ring Burst 애니메이션을 구현해 줘.',
  },
  {
    id: 'toast-slide-stack',
    domain: 'ui',
    category: 'feedback',
    vibeTag: '화면 아래에서 쏙 올라오는 알림창',
    vibeKeywords: ['쏙 올라오는', '토스트', '알림창', '스낵바', '슬라이드 알림', '팝업'],
    titleKo: '스택 슬라이드 토스트',
    titleEn: 'Slide-in Toast Notification',
    summary: '하단에서 탄성 있게 미끄러져 올라와 쌓이는 미니 알림 바',
    promptSnippet:
      '액션 발생 시 하단(`translateY(24px)`)에서 위로 스프링 이징과 함께 쏙 미끄러져 올라와 쌓이는 Slide-in Toast Notification 컴포넌트를 구현해 줘.',
  },
  {
    id: 'sliding-pill-tabs',
    domain: 'ui',
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
    domain: 'ui',
    category: 'layout',
    vibeTag: '끊김 없이 무한히 흘러가는 배너',
    vibeKeywords: ['무한 흐르는', '전광판', '마키', '로고 슬라이더', '티커 배너', '자동 스크롤'],
    titleKo: '인피니트 마키 티커',
    titleEn: 'Infinite Seamless Marquee',
    summary: '로고나 키워드 트랙이 끊기는 구간 없이 계속 옆으로 흐름',
    promptSnippet:
      '동일한 아이템 그룹 2개를 나란히 배치하고 `translateX(0%)`에서 `translateX(-50%)`까지 선형(linear) 무한 반복하는 Infinite Marquee 배너를 구현해 줘.',
  },
  {
    id: 'skeleton-shimmer',
    domain: 'ui',
    category: 'layout',
    vibeTag: '로딩 중에 은은한 빛이 흐르는 뼈대',
    vibeKeywords: ['로딩 뼈대', '스켈레톤', '자리표시자', '은은하게 흐르는', '플레이스홀더'],
    titleKo: '스켈레톤 쉬머 로더',
    titleEn: 'Skeleton Shimmer Placeholder',
    summary: '데이터가 뜨기 전 UI 윤곽선 위로 부드러운 광택이 흐름',
    promptSnippet:
      '데이터 로딩 상태에서 실제 카드 레이아웃 모양의 플레이스홀더 블록 위로 반투명 광택 그라데이션(`via-white/10`)이 가로질러 흐르는 Skeleton Shimmer Loader를 적용해 줘.',
  },
  {
    id: 'spotlight-focus',
    domain: 'ui',
    category: 'layout',
    vibeTag: '주변은 어둡게 끄고 여기만 비추는',
    vibeKeywords: ['손전등 집중', '주변 어둡게', '스포트라이트', '포커스', '하이라이트', '온보딩'],
    titleKo: '스포트라이트 딤 포커스',
    titleEn: 'Spotlight Dimmed Focus',
    summary: '나머지 요소를 흐리게 죽이고 선택한 요소만 선명하게 강조',
    promptSnippet:
      '비활성 항목들은 `opacity-30 blur-[0.4px]`로 낮추고, 현재 포커스된 항목만 밝은 링(`ring-2`)과 스케일 업으로 또렷하게 부각하는 Spotlight Focus 효과를 적용해 줘.',
  },
  {
    id: 'before-after-slider',
    domain: 'ui',
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
    domain: 'ui',
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
    domain: 'ui',
    category: 'control',
    vibeTag: '스위치가 쫀득하게 늘어났다 넘어가는',
    vibeKeywords: ['쫀득한 스위치', '토글', '온오프', '탄성 스위치', 'iOS 스위치'],
    titleKo: '일래스틱 토글 스위치',
    titleEn: 'Elastic Spring Toggle Switch',
    summary: 'ON/OFF 전환 시 노브가 가로로 살짝 늘어났다 탄성 있게 이동',
    promptSnippet:
      '토글 스위치 클릭 시 내부 원형 노브가 `cubic-bezier(0.34, 1.56, 0.64, 1)` 탄성 곡선으로 이동하고 전환 순간 가로로 살짝 늘어나는(`scaleX(1.25)`) Elastic Toggle Switch를 구현해 줘.',
  },
  {
    id: 'combo-gauge-pop',
    domain: 'ui',
    category: 'control',
    vibeTag: '게이지가 차오르며 배지가 통 튀는',
    vibeKeywords: ['차오르는 게이지', '프로그레스 바', '타격감', '콤보 팝', '달성률'],
    titleKo: '스무스 게이지 & 스케일 팝',
    titleEn: 'Smooth Progress & Scale Pop',
    summary: '진행 바가 부드럽게 차오르며 상태 배지가 탄성 있게 튀어 오름',
    promptSnippet:
      '수치 증가 시 프로그레스 바 너비가 그라데이션과 함께 부드럽게 차오르고, 상단 카운터 배지가 일시적으로 `scale(1.26)`으로 튀어 오르는 Smooth Gauge & Pop 연출을 적용해 줘.',
  },

  /* =====================================================================
   * DOMAIN 2: 그래픽 (22종)
   * ===================================================================== */
  {
    id: 'mg-svg-line-draw',
    domain: 'motion',
    category: 'graphic',
    vibeTag: '보이지 않던 선이 펜으로 그리듯 스르륵 그려지는',
    vibeKeywords: ['펜으로 그리는 선', 'SVG 드로잉', '외곽선 그리기', '라인 애니메이션', '스트로크 애니메이션', '로고 드로잉'],
    titleKo: 'SVG 패스 라인 드로잉',
    titleEn: 'SVG Stroke Dasharray Path Drawing',
    summary: '아이콘이나 일러스트 외곽선이 시작점부터 끝점까지 실시간으로 그려지는 기법',
    promptSnippet:
      'SVG `<path>`에 `stroke-dasharray`와 `stroke-dashoffset`을 전체 경로 길이로 설정한 뒤, `stroke-dashoffset`을 `0`으로 애니메이션화하여 펜으로 선을 직접 그리듯 외곽선이 완성되는 SVG Path Drawing 연출을 구현해 줘.',
  },
  {
    id: 'mg-liquid-blob-morph',
    domain: 'motion',
    category: 'graphic',
    vibeTag: '슬라임이나 물방울처럼 도형 경계가 일렁이는',
    vibeKeywords: ['슬라임 모핑', '물방울 일렁이는', '유기적 도형', '블롭 모핑', '리퀴드 셰이프'],
    titleKo: '리퀴드 블롭 모핑',
    titleEn: 'Organic Liquid Blob Morphing',
    summary: '딱딱한 원/사각형 대신 살아있는 액체처럼 곡률이 끊임없이 변형되는 그래픽',
    promptSnippet:
      '8축 `border-radius`(`60% 40% 30% 70% / 60% 30% 70% 40%` ➔ `30% 60% 70% 40% / 50% 60% 30% 60%`)와 미세 회전을 연속 키프레임으로 연결해 액체 물방울처럼 유영하는 Liquid Blob Morphing 그래픽을 구현해 줘.',
  },
  {
    id: 'mg-gooey-metaball',
    domain: 'motion',
    category: 'graphic',
    vibeTag: '두 물방울이 가까워지면 끈적하게 하나로 합쳐지는',
    vibeKeywords: ['물방울 합체', '구이 이펙트', '메타볼', '끈적하게 붙는', '융합 분리', '액체 합체'],
    titleKo: '구이 메타볼 퓨전 (Gooey Effect)',
    titleEn: 'SVG Gooey Metaball Filter Fusion',
    summary: '두 도형이 만날 때 경계면이 물방울처럼 끈적하게 이어지며 합쳐졌다 분리되는 효과',
    promptSnippet:
      '부모 컨테이너에 SVG 필터(`feGaussianBlur stdDeviation="8"` + `feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"`)를 적용해 내부 원형 요소들이 가까워질 때 액체처럼 끈적하게 융합되는 Gooey Metaball 그래픽을 구현해 줘.',
  },
  {
    id: 'mg-orbit-rotation',
    domain: 'motion',
    category: 'graphic',
    vibeTag: '중심 코어 주변을 위성들이 궤도를 돌며 공전하는',
    vibeKeywords: ['궤도 회전', '공전', '위성', '오빗', '행성 회전', '원형 궤도'],
    titleKo: '플래니터리 오빗 궤도 회전',
    titleEn: 'Multi-Ring Planetary Orbit',
    summary: '중심 오브젝트 둘레를 여러 궤도 링과 위성 입자들이 서로 다른 속도로 공전',
    promptSnippet:
      '중앙 코어 주변에 동심원 궤도 링들을 배치하고, 각 궤도 컨테이너를 서로 다른 주기와 방향(`animate-spin`, 역방향 회전)으로 돌게 하여 위성 아이콘들이 공전하는 Planetary Orbit 그래픽을 구현해 줘.',
  },
  {
    id: 'mg-aurora-mesh',
    domain: 'motion',
    category: 'shader',
    vibeTag: '밤하늘 오로라처럼 여러 빛깔이 부드럽게 섞여 흐르는',
    vibeKeywords: ['오로라 배경', '메쉬 그라데이션', '몽환적인 배경', '블러 그라데이션', '셰이더 느낌'],
    titleKo: '오로라 메쉬 그라데이션',
    titleEn: 'Aurora Mesh Gradient Backdrop',
    summary: '큰 블러(Blur) 컬러 구체들이 겹쳐진 채 유영하며 몽환적인 오로라 배경 형성',
    promptSnippet:
      '배경 레이어에 보라·청록·핑크 컬러의 대형 원형 요소들을 배치하고 `filter: blur(45px)`와 `mix-blend-mode: screen`을 적용한 뒤 서로 다른 궤적으로 천천히 유영하는 Aurora Mesh Gradient 배경을 구현해 줘.',
  },
  {
    id: 'mg-particle-network',
    domain: 'motion',
    category: 'shader',
    vibeTag: '점들이 별자리처럼 선으로 이어져 살아 움직이는',
    vibeKeywords: ['별자리 선 연결', '파티클 네트워크', '노드 그래프', '컨스텔레이션', '우주 점선'],
    titleKo: '컨스텔레이션 파티클 네트워크',
    titleEn: 'Constellation Node Particle Network',
    summary: '떠다니는 노드(점)들이 일정 거리 안에 들어오면 별자리처럼 선으로 연결되는 그래픽',
    promptSnippet:
      'SVG/Canvas 위에 여러 개의 노드(점)가 부드럽게 부유하며, 인접한 노드들 사이에 반투명 연결선(`<line>`)이 이어지고 마우스 근처 노드가 하이라이트되는 Constellation Particle Network 그래픽을 구현해 줘.',
  },
  {
    id: 'mg-dot-matrix-grid',
    domain: 'motion',
    category: 'shader',
    vibeTag: '촘촘한 도트 점들이 마우스 주변에서 물결치듯 빛나는',
    vibeKeywords: ['도트 패턴', '하프톤 그리드', '점박이 배경', '매트릭스 도트', '인터랙티브 그리드'],
    titleKo: '인터랙티브 도트 매트릭스 그리드',
    titleEn: 'Interactive Halftone Dot Matrix',
    summary: '규칙적인 도트 격자 위에서 커서 주변 점들이 커지고 밝게 빛나는 그래픽 패턴',
    promptSnippet:
      '배경에 `radial-gradient(circle, currentColor 1.5px, transparent 1.5px)` 도트 그리드 패턴을 깔고, 마우스 커서 반경 내의 도트들이 밝은 색상과 스케일로 반응하는 Interactive Dot Matrix 배경을 구현해 줘.',
  },
  {
    id: 'mg-god-ray-beam',
    domain: 'motion',
    category: 'shader',
    vibeTag: '천장에서 무대 조명 빛기둥이 대각선으로 쏟아지는',
    vibeKeywords: ['빛기둥 조명', '갓 레이', '스포트라이트 빔', '무대 조명', '후광 효과'],
    titleKo: '볼류메트릭 스포트라이트 빔 (God Rays)',
    titleEn: 'Volumetric God Rays Light Beam',
    summary: '상단 광원에서 원뿔 모양의 빛줄기가 쏟아지며 은은하게 흔들리는 입체 조명',
    promptSnippet:
      '상단에서 하단으로 퍼지는 원뿔형/대각선 그라데이션 레이어에 `filter: blur(20px)`와 회전 스웨이 모션을 적용해 무대 조명 빛기둥이 쏟아지는 Volumetric Spotlight Beam(God Rays) 연출을 구현해 줘.',
  },
  {
    id: 'mg-squash-stretch',
    domain: 'motion',
    category: 'physics',
    vibeTag: '바닥에 닿을 때 납작해졌다 길쭉하게 튀는',
    vibeKeywords: ['납작해졌다 튀는', '스쿼시 앤 스트레치', '찌그러지는', '공 튀기기', '젤리 탄성', '디즈니 12원칙'],
    titleKo: '스쿼시 앤 스트레치',
    titleEn: 'Squash & Stretch Physics',
    summary: '충돌 순간 납작하게 눌렸다가 이동 방향으로 길쭉하게 늘어나는 탄성 원리',
    promptSnippet:
      '오브젝트가 움직이거나 바닥에 닿을 때 부피를 유지한 채 충돌 순간에는 가로로 납작(`scaleX(1.38) scaleY(0.62)`)해지고, 도약/하강 구간에는 세로로 길쭉(`scaleX(0.85) scaleY(1.18)`)해지는 Squash & Stretch 애니메이션 원리를 적용해 줘.',
  },
  {
    id: 'mg-anticipation',
    domain: 'motion',
    category: 'physics',
    vibeTag: '앞으로 돌진하기 직전 뒤로 기를 모으는',
    vibeKeywords: ['기 모았다 발사', '예비 동작', '앤티시페이션', '웅크렸다 점프', '원심력', '발사 연출'],
    titleKo: '앤티시페이션 (예비 동작)',
    titleEn: 'Anticipation Wind-up Motion',
    summary: '본 동작 직전에 반대 방향으로 살짝 움츠려 폭발적인 속도감을 만드는 연출',
    promptSnippet:
      '요소가 오른쪽으로 빠르게 출발하기 직전에 먼저 왼쪽(`translateX(-24px)`)으로 살짝 물러나며 몸을 웅크렸다가(`scaleX(0.75) scaleY(1.2)`) 탄성 있게 발사되는 Anticipation(예비 동작) 키프레임을 적용해 줘.',
  },
  {
    id: 'mg-follow-trail',
    domain: 'motion',
    category: 'physics',
    vibeTag: '본체 뒤로 잔상 꼬리가 시차를 두고 따라오는',
    vibeKeywords: ['꼬리 잔상', '팔로우 스루', '오버래핑', '따라오는 꼬리', '딜레이 트레일', '모션 트레일'],
    titleKo: '팔로우 스루 & 딜레이 트레일',
    titleEn: 'Follow-Through & Delayed Trail',
    summary: '선두 물체가 이동한 뒤 후속 잔상/부속 요소들이 시차를 두고 따라붙어 안착',
    promptSnippet:
      '메인 오브젝트가 목표 좌표로 이동할 때 3~4개의 서브 레이어(또는 잔상 구체)가 각각 다른 `transition-delay`(40ms, 80ms, 120ms)와 점진적 축소(`scale`, `opacity`)를 갖고 꼬리처럼 뒤따라오는 Follow-Through Trail 연출을 구현해 줘.',
  },
  {
    id: 'mg-easing-curves',
    domain: 'motion',
    category: 'physics',
    vibeTag: '등속·급감속·스프링 속도감 차이를 주는',
    vibeKeywords: ['이징 곡선', '가속 감속', '베지어 커브', '속도 그래프', '스냅 모션', '리니어 스프링 비교'],
    titleKo: '이징 속도 곡선 (Linear / Out / Spring)',
    titleEn: 'Cubic-Bezier & Spring Easing Curves',
    summary: '같은 거리라도 속도 곡선(등속 vs 감속 vs 탄성 오버슈트)에 따라 달라지는 질감',
    promptSnippet:
      '기계적인 `linear` 대신 자연스러운 급감속(`cubic-bezier(0.16, 1, 0.3, 1)`) 또는 목표 지점을 살짝 지나쳤다 돌아오는 탄성 곡선(`cubic-bezier(0.34, 1.56, 0.64, 1)`)으로 물리적 속도감을 부여해 줘.',
  },
  {
    id: 'mg-kinetic-wave-text',
    domain: 'motion',
    category: 'kinetic',
    vibeTag: '글자들이 한 글자씩 쪼개져 파도처럼 물결치는',
    vibeKeywords: ['파도치는 글자', '물결 글자', '키네틱 타이포', '춤추는 글자', '스플릿 텍스트', '웨이브 텍스트'],
    titleKo: '키네틱 웨이브 스플릿 텍스트',
    titleEn: 'Kinetic Sine-Wave Split Typography',
    summary: '문장을 글자 단위로 쪼개어 각 글자가 파도타기하듯 리듬감 있게 물결치는 연출',
    promptSnippet:
      '문자열을 글자 단위(`<span>`)로 분할한 뒤 각 글자에 `index * 70ms`의 `animation-delay`를 주어 위아래 사인파 곡선으로 파도치듯 움직이는 Kinetic Wave Typography를 구현해 줘.',
  },
  {
    id: 'mg-3d-text-roller',
    domain: 'motion',
    category: 'kinetic',
    vibeTag: '단어가 슬롯머신 롤러처럼 위아래로 휙휙 바뀌는',
    vibeKeywords: ['돌아가는 단어', '텍스트 롤러', '단어 교체', '슬롯 타이포', '수직 회전 글자'],
    titleKo: '버티컬 키네틱 텍스트 롤러',
    titleEn: 'Vertical Kinetic Word Switcher',
    summary: '고정된 문장 안에서 핵심 키워드만 수직 슬라이드 롤러처럼 주기적으로 교체',
    promptSnippet:
      '고정 높이와 `overflow: hidden`을 가진 단어 창 안에서 여러 키워드 배열이 일정 주기로 `translateY(-100% * index)`와 스프링 이징으로 굴러가며 교체되는 Vertical Kinetic Word Roller를 구현해 줘.',
  },
  {
    id: 'mg-neon-sign-flicker',
    domain: 'motion',
    category: 'kinetic',
    vibeTag: '밤거리 네온사인 간판이 파르르 깜빡이며 켜지는',
    vibeKeywords: ['네온 간판 깜빡임', '플리커', '지지직 켜지는 글자', '사이버펑크 간판', '전구 점멸'],
    titleKo: '네온 사인 플리커 점등',
    titleEn: 'Realistic Neon Sign Flicker',
    summary: '실제 네온관처럼 특정 글자가 불규칙하게 파르르 깜빡이다가 선명하게 켜지는 연출',
    promptSnippet:
      '다중 `text-shadow`로 네온 광원을 만들고, 불규칙한 키프레임 구간(20%, 24%, 55%)에서 순간적으로 `opacity: 0.25`와 `text-shadow: none`이 교차되는 Neon Sign Flicker 타이포그래피를 적용해 줘.',
  },
  {
    id: 'mg-parallax-depth',
    domain: 'motion',
    category: 'camera',
    vibeTag: '배경·중경·전경이 다른 속도로 움직여 공간감이 나는',
    vibeKeywords: ['원근감 입체 이동', '패럴랙스', '2.5D 공간감', '다중 레이어 깊이', '카메라 이동'],
    titleKo: '2.5D 멀티레이어 패럴랙스',
    titleEn: '2.5D Multi-Layer Parallax Depth',
    summary: '먼 배경은 느리게, 가까운 전경은 빠르게 움직여 평면에 깊은 입체 공간감을 부여',
    promptSnippet:
      '마우스나 스크롤 이동량(dx, dy)에 대해 배경 레이어는 `0.15배`, 중간 레이어는 `0.4배`, 전경 피사체는 `0.85배`의 서로 다른 이동 계수를 곱해 입체 공간감이 느껴지는 2.5D Multi-Layer Parallax 씬을 구현해 줘.',
  },
  {
    id: 'mg-rack-focus-blur',
    domain: 'motion',
    category: 'camera',
    vibeTag: '앞 피사체는 흐려지고 뒤 피사체로 카메라 초점이 옮겨가는',
    vibeKeywords: ['아웃포커싱 초점', '랙 포커스', '심도 전환', '카메라 초점 이동', '보케 블러'],
    titleKo: '카메라 랙 포커스 (초점 심도 전환)',
    titleEn: 'Cinema Rack Focus Depth-of-Field',
    summary: '영화 카메라처럼 전경과 배경 중 한쪽만 선명하게 잡고 반대쪽은 블러 처리',
    promptSnippet:
      '전경(Foreground)과 배경(Background) 레이어 사이에서 포커스가 전환될 때 비활성 레이어는 `filter: blur(5px)`와 `opacity: 0.45`, 활성 레이어는 `blur(0px)`와 `scale(1.05)`로 전환되는 Camera Rack Focus 연출을 구현해 줘.',
  },
  {
    id: 'mg-ken-burns-pan',
    domain: 'motion',
    category: 'camera',
    vibeTag: '정지된 장면을 카메라가 천천히 줌인하며 가로질러 비추는',
    vibeKeywords: ['슬로우 줌 패닝', '켄 번즈', '카메라 워킹', '다큐멘터리 줌', '배경 움직임'],
    titleKo: '시네마틱 켄 번즈 (줌 & 패닝)',
    titleEn: 'Ken Burns Slow Camera Zoom & Pan',
    summary: '정적인 일러스트나 장면을 카메라가 천천히 확대하며 대각선으로 이동해 생동감 부여',
    promptSnippet:
      '뷰포트 프레임(`overflow: hidden`) 안의 장면 레이어가 6~10초 동안 `scale(1) translate(0, 0)`에서 `scale(1.28) translate(-4%, -3%)`로 서서히 줌인·패닝되는 Ken Burns 카메라 워킹을 적용해 줘.',
  },
  {
    id: 'mg-isometric-explode',
    domain: 'motion',
    category: 'camera',
    vibeTag: '겹쳐 있던 판들이 입체 각도로 층층이 분리되어 떠오르는',
    vibeKeywords: ['입체 층 분리', '아이소메트릭', '레이어 분해', '공중 부양 층', '3D 아키텍처 뷰'],
    titleKo: '아이소메트릭 레이어 익스플로드',
    titleEn: 'Isometric 3D Layer Explode View',
    summary: '평면 카드가 입체 아이소메트릭 각도로 기울어지며 바닥·중간·상단 층으로 분리됨',
    promptSnippet:
      '컨테이너에 `rotateX(55deg) rotateZ(-35deg)`와 `transform-style: preserve-3d`를 적용해 아이소메트릭 뷰를 만들고, 호버/클릭 시 겹쳐진 레이어들이 각각 `translateZ(0px, 28px, 56px)` 높이로 층층이 분리되어 떠오르게 구현해 줘.',
  },
  {
    id: 'mg-iris-circle-wipe',
    domain: 'motion',
    category: 'vfx',
    vibeTag: '만화 엔딩처럼 동그란 조리개가 좁혀졌다 확 열리는 전환',
    vibeKeywords: ['동그랗게 닫히는', '아이리스 와이프', '원형 장면 전환', '조리개 효과', '시네마틱 와이프'],
    titleKo: '서큘러 아이리스 와이프 전환',
    titleEn: 'Circular Iris Wipe Transition',
    summary: '원형 클립 마스크가 한 점으로 좁혀졌다가 다시 전체 화면으로 확 열리는 장면 전환',
    promptSnippet:
      '장면 전환 시 상위 레이어에 `clip-path: circle(140% at 50% 50%)`에서 `circle(0% at 50% 50%)`로 조리개처럼 좁혀졌다가 열리는 Circular Iris Wipe 트랜지션을 구현해 줘.',
  },
  {
    id: 'mg-rgb-chromatic-glitch',
    domain: 'motion',
    category: 'vfx',
    vibeTag: '화면이 지지직거리며 빨강·청록 잔상이 순간 어긋나는',
    vibeKeywords: ['지지직 글리치', '색수차', 'RGB 분리', '사이버펑크 노이즈', '화면 깨짐', '디지털 충격'],
    titleKo: 'RGB 색수차 글리치 (Chromatic Glitch)',
    titleEn: 'RGB Split & Chromatic Aberration Glitch',
    summary: '순간적인 기울림(Skew)과 함께 Red/Cyan 컬러 채널이 좌우로 분리되는 디지털 충격 효과',
    promptSnippet:
      '요소에 Red(`-4px 0 #ff0055`)와 Cyan(`4px 0 #00e5ff`) 이중 섀도우 분리를 적용하고 짧은 불규칙 키프레임으로 좌우 진동 및 `skewX(±8deg)` 왜곡이 발생하는 Chromatic Aberration Glitch 효과를 구현해 줘.',
  },
  {
    id: 'mg-speed-lines-streak',
    domain: 'motion',
    category: 'vfx',
    vibeTag: '초고속으로 달릴 때 주변에 빛줄기 속도선이 스쳐 지나가는',
    vibeKeywords: ['속도선', '스피드 라인', '모션 블러', '질주감', '워프 빛줄기', '애니메이션 집중선'],
    titleKo: '스피드 라인 & 모션 스트리크',
    titleEn: 'Anime Speed Lines & Motion Streaks',
    summary: '피사체 주변으로 가늘고 긴 빛줄기들이 맹렬한 속도로 스쳐 지나가며 고속 질주감 연출',
    promptSnippet:
      '배경에 서로 다른 높이와 속도를 가진 수평 그라데이션 스트리크(`h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent`)들을 배치해 왼쪽에서 오른쪽으로 빠르게 스쳐 지나가는 Speed Lines 연출을 구현해 줘.',
  },

  /* =====================================================================
   * DOMAIN 3: 레이아웃 (16종)
   * ===================================================================== */

  /* 1. 그리드·카드배치 (grid) */
  {
    id: 'ly-bento-grid',
    domain: 'layout',
    category: 'grid',
    vibeTag: '애플 소개 페이지처럼 크기가 다른 박스가 빈틈없이 짜인',
    vibeKeywords: ['도시락통 벤토', '벤토 그리드', '애플 그리드', '비대칭 타일', '대시보드 그리드'],
    titleKo: '벤토 그리드 (Bento Grid)',
    titleEn: 'Asymmetric Bento Box Grid',
    summary: '2x2 메인 타일과 2x1, 1x1 보조 타일들이 도시락통처럼 딱 맞아떨어지는 배치',
    promptSnippet:
      'CSS Grid(`grid-cols-4 auto-rows-[140px] gap-4`)를 사용해 핵심 기능은 `col-span-2 row-span-2`, 서브 기능은 `col-span-2 row-span-1` 및 `col-span-1`로 비대칭 조화를 이루는 Bento Grid 레이아웃으로 구성해 줘.',
  },
  {
    id: 'ly-masonry-waterfall',
    domain: 'layout',
    category: 'grid',
    vibeTag: '핀터레스트처럼 높이가 제각각인 카드가 빈틈없이 쌓이는',
    vibeKeywords: ['핀터레스트 벽돌', '메이슨리', '폭포수 레이아웃', '높이 다른 카드', '갤러리 그리드'],
    titleKo: '메이슨리 워터폴 그리드',
    titleEn: 'Masonry Waterfall Layout',
    summary: '세로 길이가 서로 다른 카드들이 빈 여백 없이 벽돌처럼 촘촘하게 맞물려 배치됨',
    promptSnippet:
      '높이가 서로 다른 이미지·콘텐츠 카드들이 세로 빈틈 없이 채워지도록 CSS `columns-3 gap-4`와 `break-inside-avoid`를 활용한 Masonry Waterfall 레이아웃으로 구현해 줘.',
  },
  {
    id: 'ly-editorial-asymmetric',
    domain: 'layout',
    category: 'grid',
    vibeTag: '잡지 화보처럼 한쪽은 큼직하고 반대쪽은 촘촘한 비대칭',
    vibeKeywords: ['잡지 레이아웃', '에디토리얼 스플릿', '비대칭 레이아웃', '룩북 구도'],
    titleKo: '에디토리얼 비대칭 스플릿',
    titleEn: 'Editorial Asymmetric Split Layout',
    summary: '좌측 65% 거대 히어로 비주얼과 우측 35% 다단 목록이 대비를 이루는 매거진 구도',
    promptSnippet:
      '12컬럼 그리드(`grid-cols-12`)에서 좌측 7컬럼은 대형 비주얼과 헤드라인을 배치하고, 우측 5컬럼은 얇은 구분선(`divide-y`)으로 나뉜 컴팩트 아티클 리스트를 배치하는 Editorial Asymmetric 레이아웃으로 짜 줘.',
  },
  {
    id: 'ly-honeycomb-hex',
    domain: 'layout',
    category: 'grid',
    vibeTag: '벌집이나 타일처럼 지그재그로 엇갈려 맞물리는',
    vibeKeywords: ['벌집 그리드', '허니콤', '지그재그 배치', '스킬 트리', '육각형 타일'],
    titleKo: '허니콤 오프셋 그리드',
    titleEn: 'Honeycomb Staggered Hex Grid',
    summary: '짝수 행마다 반 칸씩 옆으로 밀어 벌집처럼 촘촘히 맞물리게 배치하는 구조',
    promptSnippet:
      '아이콘/스킬 타일 행을 배치할 때 짝수 줄에 가로 오프셋(`translate-x-6`)과 음수 마진을 적용해 벌집처럼 지그재그로 맞물리는 Honeycomb Staggered Grid 구조를 구현해 줘.',
  },

  /* 2. 스크롤·전환구조 (scroll) */
  {
    id: 'ly-sticky-scrolltelling',
    domain: 'layout',
    category: 'scroll',
    vibeTag: '스크롤할 때 왼쪽 설명은 고정되고 오른쪽 화면만 바뀌는',
    vibeKeywords: ['왼쪽 고정 스크롤', '스티키 스크롤텔링', '스토리텔링 스크롤', '랜딩페이지 스크롤'],
    titleKo: '스티키 스플릿 스크롤텔링',
    titleEn: 'Sticky Split Scroll-telling',
    summary: '좌측 타이틀/단계는 화면에 고정(`sticky`)된 채 우측 프리뷰 카드만 스크롤에 따라 교체',
    promptSnippet:
      '좌측 영역은 `sticky top-24 h-fit`으로 화면에 고정해 현재 섹션 설명을 보여주고, 우측 영역은 스크롤에 따라 단계별 쇼케이스 카드가 이어지는 Sticky Split Scroll-telling 구조로 설계해 줘.',
  },
  {
    id: 'ly-fullpage-snap',
    domain: 'layout',
    category: 'scroll',
    vibeTag: '마우스 휠 한 번에 한 화면씩 자석처럼 딱딱 걸리는',
    vibeKeywords: ['풀페이지 스크롤', '스크롤 스냅', '한 장씩 넘어가는', '프레젠테이션 스크롤'],
    titleKo: '풀페이지 스크롤 스냅',
    titleEn: 'Full-Page Mandatory Scroll Snap',
    summary: '어중간한 위치에 멈추지 않고 각 섹션 정중앙에 딱 맞춰 스냅되는 뷰포트 구조',
    promptSnippet:
      '부모 스크롤 컨테이너에 `snap-y snap-mandatory overflow-y-scroll h-screen`을 주고 각 섹션에 `snap-start h-screen`을 적용해 슬라이드처럼 한 화면씩 정확히 스냅되는 Full-Page Snap 레이아웃을 구현해 줘.',
  },
  {
    id: 'ly-horizontal-showcase',
    domain: 'layout',
    category: 'scroll',
    vibeTag: '카드들이 가로 필름처럼 옆으로 길게 이어져 넘어가는',
    vibeKeywords: ['가로 스크롤', '필름 스트립', '호리젠탈 쇼케이스', '가로 갤러리'],
    titleKo: '호리젠탈 필름 쇼케이스',
    titleEn: 'Horizontal Snap Film Showcase',
    summary: '세로로 길어지는 대신 가로 트랙을 따라 카드를 스냅하며 넘겨보는 쇼케이스',
    promptSnippet:
      '가로 스크롤 트랙(`flex overflow-x-auto snap-x snap-mandatory gap-5`) 안에 고정 폭(`shrink-0 snap-center`) 쇼케이스 카드들을 배치해 옆으로 부드럽게 넘겨보는 Horizontal Film Showcase 레이아웃을 구현해 줘.',
  },
  {
    id: 'ly-curtain-reveal',
    domain: 'layout',
    category: 'scroll',
    vibeTag: '본문 커튼이 위로 걷히며 숨어있던 하단 화면이 드러나는',
    vibeKeywords: ['커튼 리빌', '숨겨진 푸터', '위로 걷히는 화면', '패럴랙스 푸터'],
    titleKo: '커튼 리빌 언더레이 레이아웃',
    titleEn: 'Curtain Reveal Fixed Underlay',
    summary: '상단 메인 콘텐츠가 커튼처럼 위로 올라가면 바닥에 고정된 히어로 푸터가 노출됨',
    promptSnippet:
      '하단 섹션을 `fixed bottom-0 z-0`으로 바닥에 깔아 두고, 그 위의 메인 본문 래퍼에 `relative z-10 mb-[300px] shadow-2xl`을 주어 스크롤 끝에서 본문이 커튼처럼 걷히며 하단이 드러나는 Curtain Reveal 구조를 적용해 줘.',
  },

  /* 3. 네비게이션·메뉴 (nav) */
  {
    id: 'ly-macos-dock',
    domain: 'layout',
    category: 'nav',
    vibeTag: '맥북 하단 독처럼 마우스 올린 아이콘과 주변이 둥글게 커지는',
    vibeKeywords: ['맥북 하단 독', '독 바', '아이콘 확대 메뉴', '맥OS 독', '플로팅 독'],
    titleKo: '맥OS 독 매그니피케이션 바',
    titleEn: 'MacOS Dock Magnification Bar',
    summary: '호버한 아이콘은 크게(1.5x), 양옆 인접 아이콘은 중간(1.2x) 크기로 부드럽게 확대',
    promptSnippet:
      '화면 하단 중앙에 플로팅 Dock 바를 만들고, 마우스가 올라간 아이콘 인덱스와 각 아이콘의 거리(`Math.abs(hoverIdx - i)`)에 반비례하여 `scale(1.45)`, `scale(1.2)`, `scale(1)`로 연속 확대되는 MacOS Dock 네비게이션을 구현해 줘.',
  },
  {
    id: 'ly-command-palette',
    domain: 'layout',
    category: 'nav',
    vibeTag: 'Ctrl+K 누르면 화면 중앙에 떠서 모든 기능을 바로 찾는',
    vibeKeywords: ['단축키 검색창', '커맨드 팔레트', 'Cmd+K', '스포트라이트 검색', '빠른 이동 모달'],
    titleKo: '커맨드 팔레트 (Cmd+K Modal)',
    titleEn: 'Command Palette Quick Launcher',
    summary: '상단 검색창과 단축키 배지가 달린 액션 리스트로 어디든 즉시 이동하는 모달 구조',
    promptSnippet:
      '`Cmd+K` / `Ctrl+K` 단축키로 열리는 중앙 오버레이 Command Palette를 구현해 줘. 상단에는 즉시 포커스되는 검색 인풋을 두고, 하단에는 그룹별 액션 목록과 우측 키보드 단축키 배지(`<kbd>`)가 표시되게 해 줘.',
  },
  {
    id: 'ly-dynamic-island-nav',
    domain: 'layout',
    category: 'nav',
    vibeTag: '상단 중앙에 작은 캡슐로 떠 있다가 누르면 넓게 펼쳐지는',
    vibeKeywords: ['다이나믹 아일랜드', '플로팅 캡슐 헤더', '확장형 알약 메뉴', '아이폰 아일랜드'],
    titleKo: '다이나믹 아일랜드 플로팅 바',
    titleEn: 'Dynamic Island Expanding Pill Nav',
    summary: '평소엔 작은 알약 형태였다가 클릭/호버 시 너비와 높이가 커지며 상세 위젯 노출',
    promptSnippet:
      '화면 상단 중앙에 둥근 검은색 캡슐(`rounded-full`) 형태의 Dynamic Island 헤더를 배치하고, 클릭 시 스프링 트랜지션으로 너비와 높이가 확장되며 상세 컨트롤과 상태 정보가 나타나는 구조를 구현해 줘.',
  },
  {
    id: 'ly-radial-pie-menu',
    domain: 'layout',
    category: 'nav',
    vibeTag: '중앙 버튼을 누르면 주변에 동그랗게 위성 메뉴가 펼쳐지는',
    vibeKeywords: ['원형 파이 메뉴', '래디얼 메뉴', '방사형 버튼', '링 메뉴', '게임 휠 메뉴'],
    titleKo: '래디얼 파이 컨텍스트 메뉴',
    titleEn: 'Radial Wheel / Pie Context Menu',
    summary: '트리거 버튼 중심에서 반원/원형 각도(`cos, sin`)로 하위 액션 버튼들이 촤르륵 펼쳐짐',
    promptSnippet:
      '중앙 트리거 버튼 클릭 시 주변 원형 궤도 각도(`angle * Math.PI / 180`) 좌표를 따라 하위 아이콘 버튼들이 `translate(x, y) scale(1)`로 방사형으로 펼쳐지는 Radial Pie Menu를 구현해 줘.',
  },

  /* 4. 패널·보드·데이터뷰 (panel) */
  {
    id: 'ly-bottom-sheet',
    domain: 'layout',
    category: 'panel',
    vibeTag: '모바일처럼 화면 바닥에서 위로 스와이프해 끌어올리는 서랍',
    vibeKeywords: ['끌어올리는 서랍', '바텀 시트', '드로어 시트', '모바일 모달', '스냅 시트'],
    titleKo: '드래거블 스냅 바텀 시트',
    titleEn: 'Draggable Snap Bottom Sheet',
    summary: '상단 손잡이 바(Handle)를 눌러 축소·중간·전체 높이로 전환하는 하단 슬라이드 시트',
    promptSnippet:
      '화면 하단에서 올라오는 둥근 모서리(`rounded-t-2xl`) Bottom Sheet 패널을 만들고, 상단 중앙에 회색 드래그 핸들 바(`w-10 h-1.5 rounded-full`)를 두어 단계별 높이(Peek / Half / Full)로 스냅 전환되게 구현해 줘.',
  },
  {
    id: 'ly-master-detail-split',
    domain: 'layout',
    category: 'panel',
    vibeTag: '왼쪽 목록을 클릭하면 페이지 이동 없이 오른쪽 상세창이 바뀌는',
    vibeKeywords: ['마스터 디테일', '좌우 분할 뷰', '이메일 클라이언트 구조', '2단 패널'],
    titleKo: '마스터-디테일 스플릿 뷰',
    titleEn: 'Master-Detail Two-Pane Split View',
    summary: '좌측 아이템 리스트와 우측 프리뷰 패널이 한 화면에 나란히 결합된 생산성 구조',
    promptSnippet:
      '좌측 35% 영역에는 스크롤 가능한 아이템 목록(Master)을 두고, 우측 65% 영역에는 선택된 아이템의 상세 내용(Detail)이 페이지 새로고침 없이 즉시 렌더링되는 Master-Detail Split View 레이아웃을 구현해 줘.',
  },
  {
    id: 'ly-kanban-board',
    domain: 'layout',
    category: 'panel',
    vibeTag: '할 일·진행 중·완료 기둥 사이에 카드를 쏙쏙 옮기는 보드',
    vibeKeywords: ['칸반 보드', '트렐로', '노션 보드', '상태 기둥', '워크플로우 보드'],
    titleKo: '칸반 워크플로우 보드',
    titleEn: 'Multi-Column Kanban Task Board',
    summary: '상태별 세로 컬럼(To Do / Doing / Done) 간에 태스크 카드를 즉시 이동시키는 구조',
    promptSnippet:
      '상태별 컬럼(`To Do`, `In Progress`, `Done`)을 가로로 나란히 배치하고, 각 컬럼 헤더에 카드 개수 배지를 표시하며 카드를 클릭하거나 드래그해 다음 단계 컬럼으로 즉시 이동시키는 Kanban Board 레이아웃을 구현해 줘.',
  },
  {
    id: 'ly-heatmap-grid',
    domain: 'layout',
    category: 'panel',
    vibeTag: '깃허브 잔디밭처럼 활동량에 따라 타일 색 농도가 달라지는',
    vibeKeywords: ['깃허브 잔디', '히트맵 그리드', '활동 잔디밭', '기여도 타일', '농도 차트'],
    titleKo: '컨트리뷰션 잔디 히트맵',
    titleEn: 'Contribution Activity Heatmap Grid',
    summary: '요일·주 단위 작은 정사각형 타일들의 색상 채도 단계(0~4단계)로 밀도를 시각화',
    promptSnippet:
      '작은 정사각형 셀(`w-3.5 h-3.5 rounded-sm`)들을 7행 그리드로 촘촘히 배치하고, 각 셀의 데이터 값(0~4단계)에 따라 어두운 회색부터 밝은 에메랄드색까지 농도가 달라지는 GitHub 스타일 Contribution Heatmap을 구현해 줘.',
  },

  /* =====================================================================
   * DOMAIN 4: 스타일 (16종)
   * ===================================================================== */

  /* 1. 모던·트렌드 (modern) */
  {
    id: 'st-neo-brutalism',
    domain: 'style',
    category: 'modern',
    vibeTag: '만화나 포스터처럼 굵은 검은 외곽선에 쨍한 원색과 딱딱한 그림자',
    vibeKeywords: ['굵은 검은 테두리', '네오 브루탈리즘', '원색 팝', '딱딱한 그림자', '검은 그림자', '피그마 감성'],
    titleKo: '네오 브루탈리즘 (Neo-Brutalism)',
    titleEn: 'Neo-Brutalist Pop UI Style',
    summary: '블러 없는 솔리드 오프셋 그림자(`4px 4px 0 #000`)와 굵은 검은 테두리, 고채도 원색 조합',
    promptSnippet:
      '전체 UI를 Neo-Brutalism 화풍으로 디자인해 줘. 모든 카드와 버튼에 굵은 검은색 실선 테두리(`border-2 border-black`), 블러가 전혀 없는 솔리드 하드 그림자(`shadow-[4px_4px_0px_#000]`), 고채도 노랑/민트/핑크 배경을 적용하고 클릭 시 그림자만큼 위치가 눌리게(`translate-x-[2px] translate-y-[2px]`) 해 줘.',
  },
  {
    id: 'st-liquid-acrylic',
    domain: 'style',
    category: 'modern',
    vibeTag: '투명 아크릴판 모서리에 빛이 굴절되어 반짝이는 고급 유리 풍',
    vibeKeywords: ['리퀴드 글래스', '아크릴 질감', 'iOS 26 유리', '모서리 빛 굴절', '투명 크리스탈'],
    titleKo: '리퀴드 아크릴 글래스 (Liquid Glass)',
    titleEn: 'Specular Liquid Acrylic Glass',
    summary: '단순 블러를 넘어 상단·좌측 림 라이트(Rim Light)와 내부 광택으로 두께감을 준 유리 질감',
    promptSnippet:
      'UI 표면에 Apple 스타일 Liquid Glass(아크릴 유리) 질감을 적용해 줘. `backdrop-blur-xl bg-white/10` 위에 상단과 좌측 모서리만 밝게 빛나는 내부 하이라이트(`shadow-[inset_0_1px_1px_rgba(255,255,255,0.45)]`)와 반투명 그라데이션 보더를 결합해 두꺼운 크리스탈 유리 느낌을 내 줘.',
  },
  {
    id: 'st-linear-dark-minimal',
    domain: 'style',
    category: 'modern',
    vibeTag: '칠흑 같은 다크 화면에 1px 은빛 실선과 절제된 상단 조명만 비치는',
    vibeKeywords: ['리니어 다크', '모던 다크 모드', '1px 은빛 보더', '절제된 SaaS', '고급 다크 테마'],
    titleKo: '리니어 다크 미니멀 (Linear Style)',
    titleEn: 'Linear-Style Dark Hairline Minimal',
    summary: '거의 검은 슬레이트 배경(`#0B0F17`)에 상단 1px 그라데이션 헤어라인과 미세 라디얼 광원 결합',
    promptSnippet:
      'Linear/Vercel 스타일의 하이엔드 다크 미니멀 화풍을 적용해 줘. 배경은 초저채도 다크(`#090D16`), 카드는 `bg-white/[0.03]`, 테두리는 상단 중앙만 은은하게 빛나는 1px 그라데이션 헤어라인(`via-white/25`)을 사용해 정교하고 차가운 금속성 다크 UI를 만들어 줘.',
  },
  {
    id: 'st-matte-film-grain',
    domain: 'style',
    category: 'modern',
    vibeTag: '매끈한 디지털 단색 대신 아날로그 필름·종이 같은 입자감이 깔린',
    vibeKeywords: ['필름 그레인', '노이즈 질감', '종이 질감', '매트 텍스처', '아날로그 감성'],
    titleKo: '매트 필름 그레인 & 노이즈',
    titleEn: 'Matte Film Grain & Noise Texture',
    summary: 'SVG 프랙탈 노이즈 오버레이를 얹어 차가운 화면에 따뜻한 인쇄물·필름 질감을 부여',
    promptSnippet:
      '배경과 카드 표면에 SVG `<feTurbulence type="fractalNoise" baseFrequency="0.8">` 노이즈 패턴을 낮은 투명도(`opacity: 0.12`)로 오버레이하여 매끈한 디지털 색감 대신 매트하고 감성적인 Film Grain 질감이 느껴지게 해 줘.',
  },

  /* 2. 입체·촉각질감 (tactile) */
  {
    id: 'st-neumorphism-soft',
    domain: 'style',
    category: 'tactile',
    vibeTag: '배경과 같은 색인데 빛과 그림자만으로 볼록 튀어나오거나 오목하게 파인',
    vibeKeywords: ['볼록한 플라스틱', '뉴모피즘', '소프트 UI', '음각 양각', '엠보싱 버튼'],
    titleKo: '뉴모피즘 (Neumorphism / Soft UI)',
    titleEn: 'Neumorphic Extruded Soft UI',
    summary: '배경색과 동일한 표면에서 좌상단 밝은 빛과 우하단 어두운 그림자로 양각·음각을 표현',
    promptSnippet:
      '배경과 요소에 동일한 톤의 색상(`#1e293b`)을 사용하고, 좌상단 하이라이트와 우하단 그림자를 동시에 주는 이중 박스 섀도우(`shadow-[6px_6px_12px_#0f172a,-6px_-6px_12px_#2d3b55]`)로 볼록 튀어나온 양각과 클릭 시 오목하게 들어가는(`inset`) Neumorphism 스타일을 구현해 줘.',
  },
  {
    id: 'st-claymorphism-3d',
    domain: 'style',
    category: 'tactile',
    vibeTag: '풍선이나 3D 점토 인형처럼 통통하고 말랑말랑하게 부풀어 오른',
    vibeKeywords: ['말랑한 3D 점토', '클레이모피즘', '풍선 같은', '귀여운 3D', '점토 질감'],
    titleKo: '클레이모피즘 (3D Claymorphism)',
    titleEn: '3D Fluffy Claymorphism Style',
    summary: '큰 둥근 모서리(`rounded-3xl`)와 밝은 상단 내부 그림자 + 진한 하단 내부 그림자로 통통한 볼륨감 형성',
    promptSnippet:
      '요소들이 3D 점토나 풍선처럼 통통하게 부풀어 보이도록 Claymorphism 스타일을 적용해 줘. 아주 둥근 모서리(`rounded-3xl`)와 파스텔/비비드 배경색 위에 이중 내부 그림자(`inset -6px -6px 14px rgba(0,0,0,0.35), inset 6px 6px 14px rgba(255,255,255,0.45)`)와 부드러운 외부 드롭 섀도우를 결합해 줘.',
  },
  {
    id: 'st-skeuomorphism-tactile',
    domain: 'style',
    category: 'tactile',
    vibeTag: '실제 기계식 키보드나 아날로그 장비 버튼을 손으로 꾹 누르는 듯한',
    vibeKeywords: ['기계식 버튼', '스큐어모피즘', '실물 스위치', '하드웨어 질감', '입체 키캡'],
    titleKo: '택타일 스큐어모피즘 (물리 키캡)',
    titleEn: 'Tactile Hardware Keycap Skeuomorphism',
    summary: '두꺼운 하단 베벨 두께(`border-b-4`)가 클릭 순간 물리적으로 내려앉는 실제 하드웨어 버튼 감각',
    promptSnippet:
      '실제 하드웨어 스위치나 기계식 키캡을 누르는 듯한 Tactile Skeuomorphism 스타일을 적용해 줘. 상단 표면 그라데이션과 두꺼운 하단 입체 턱(`border-b-[5px] border-slate-950`)을 만들고, `:active` 클릭 시 하단 두께가 줄어들며 버튼이 아래로 3px 푹 들어가는 물리적 손맛을 구현해 줘.',
  },
  {
    id: 'st-paper-cutout-layer',
    domain: 'style',
    category: 'tactile',
    vibeTag: '도톰한 색종이를 여러 겹 오려 포개 놓은 듯한 따뜻한 층위 그림자',
    vibeKeywords: ['색종이 오리기', '페이퍼 컷아웃', '종이 공예', '겹쳐진 그림자', '다이어리 감성'],
    titleKo: '레이어드 페이퍼 컷아웃',
    titleEn: 'Layered Paper Cutout Craft Style',
    summary: '따뜻한 색종이 톤 레이어들이 겹겹이 쌓여 계단식 깊이 그림자를 만드는 크래프트 화풍',
    promptSnippet:
      '도톰한 색종이를 여러 겹 오려 붙인 듯한 Paper Cutout 스타일로 구성해 줘. 파스텔/웜톤 카드들을 살짝씩 회전(`rotate-1`, `-rotate-2`)시켜 포개어 배치하고, 각 층 사이에 짧고 선명한 단차 그림자(`0 4px 6px rgba(0,0,0,0.25)`)를 넣어 종이 공예 같은 입체감을 표현해 줘.',
  },

  /* 3. 레트로·픽셀·CRT (retro) */
  {
    id: 'st-8bit-pixel-retro',
    domain: 'style',
    category: 'retro',
    vibeTag: '고전 오락실 게임처럼 둥근 곡선 없이 도트가 각져 보이는 8비트 감성',
    vibeKeywords: ['8비트 도트 게임', '픽셀 아트', '레트로 게임', '오락실 UI', '도트 테두리'],
    titleKo: '8비트 픽셀 아케이드 (Pixel Art)',
    titleEn: '8-Bit Retro Pixel Arcade UI',
    summary: '곡선(`border-radius: 0`)을 배제하고 계단식 픽셀 외곽선과 도트 폰트 감성을 살린 게임풍',
    promptSnippet:
      '고전 8비트 오락실 게임 같은 Pixel Art UI 스타일을 적용해 줘. 모든 `border-radius`를 `0`으로 제거하고, 다중 `box-shadow`로 계단식 픽셀 테두리(`0 -4px, 0 4px, -4px 0, 4px 0`)를 그리며 고정폭 도트 타이포그래피와 원색 팔레트를 사용해 줘.',
  },
  {
    id: 'st-win95-retro-os',
    domain: 'style',
    category: 'retro',
    vibeTag: '회색 입체 베벨 테두리와 파란 타이틀 바가 있는 90년대 윈도우 감성',
    vibeKeywords: ['90년대 윈도우', 'Win95', '레트로 OS', '회색 창', '고전 컴퓨터'],
    titleKo: '90s 클래식 OS (Win95 Bevel)',
    titleEn: '90s Retro Desktop OS Window',
    summary: '실버 그레이(`#c0c0c0`) 배경에 흰색·검은색 2px 입체 베벨 테두리와 네이비 타이틀 바 조합',
    promptSnippet:
      '90년대 Windows 95 / Classic OS 데스크톱 창 스타일로 디자인해 줘. 배경은 `#c0c0c0` 실버 그레이, 테두리는 좌상단 흰색(`#fff`)·우하단 진회색(`#000`)의 2px 3D Bevel 보더를 적용하고 상단에는 네이비색(`#000080`) 타이틀 바와 `[ _ ][ □ ][ X ]` 픽셀 버튼을 배치해 줘.',
  },
  {
    id: 'st-crt-scanline-terminal',
    domain: 'style',
    category: 'retro',
    vibeTag: '옛날 브라운관 모니터처럼 가로 주사선과 초록색 형광 글씨가 빛나는',
    vibeKeywords: ['브라운관 스캔라인', 'CRT 모니터', '해커 터미널', '초록 형광 글씨', '폴아웃 피프보이'],
    titleKo: 'CRT 포스퍼 & 스캔라인 터미널',
    titleEn: 'CRT Phosphor Green & Scanlines',
    summary: '수평 스캔라인 줄무늬 오버레이와 네온 그린(`#4ade80`) 잔광이 흐르는 레트로 모니터 화풍',
    promptSnippet:
      '구형 브라운관 해커 모니터 같은 CRT Scanline Terminal 화풍을 적용해 줘. 어두운 녹색 배경 위에 `repeating-linear-gradient(0deg, rgba(0,0,0,0.35) 0px, rgba(0,0,0,0.35) 1px, transparent 1px, transparent 3px)` 주사선 오버레이를 깔고, 모든 텍스트와 선에 초록색 형광 글로우(`text-shadow: 0 0 8px #22c55e`)를 적용해 줘.',
  },
  {
    id: 'st-synthwave-sunset-grid',
    domain: 'style',
    category: 'retro',
    vibeTag: '보라색 밤하늘 아래 네온 핑크 3D 격자 지평선이 펼쳐지는 80년대 감성',
    vibeKeywords: ['신스웨이브', '80년대 네온', '사이버 지평선', '레트로 퓨처리즘', '베이퍼웨이브'],
    titleKo: '80s 신스웨이브 네온 그리드',
    titleEn: '80s Synthwave Perspective Grid',
    summary: '마젠타·바이올렛 황혼 그라데이션과 원근법으로 누운 네온 그리드 바닥이 결합된 스타일',
    promptSnippet:
      '80년대 레트로 퓨처리즘 Synthwave 화풍을 적용해 줘. 상단은 보라·핑크·오렌지 황혼 그라데이션과 줄무늬 태양을 배치하고, 하단 바닥에는 `perspective(200px) rotateX(60deg)`로 기울어진 네온 마젠타 격자(`linear-gradient` 그리드)를 깔아 줘.',
  },

  /* 4. SF·도면·팝아트 (scifi) */
  {
    id: 'st-scifi-hud-chamfer',
    domain: 'style',
    category: 'scifi',
    vibeTag: '아이언맨이나 SF 게임 화면처럼 모서리가 대각선으로 깎이고 조준선이 있는',
    vibeKeywords: ['모서리 깎인 SF', '사이버펑크 HUD', '메카닉 인터페이스', '아이언맨 화면', '챔퍼 보더'],
    titleKo: '사이버펑크 SF HUD (Chamfer Frame)',
    titleEn: 'Sci-Fi Mecha HUD Chamfered UI',
    summary: '`clip-path: polygon()`으로 모서리를 45도 깎아내고 시안색 눈금·코너 브래킷을 더한 SF 화풍',
    promptSnippet:
      'SF 게임/메카닉 조종석 같은 Sci-Fi HUD 스타일을 적용해 줘. 카드 모서리를 `clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))`로 45도 깎아내고, 네 귀퉁이에 밝은 시안(`#06b6d4`) 코너 브래킷(`┌ ┐ └ ┘`)과 상태 코드 텍스트를 장식해 줘.',
  },
  {
    id: 'st-architect-blueprint',
    domain: 'style',
    category: 'scifi',
    vibeTag: '파란 건축 설계도면 모눈종이 위에 하얀 치수선과 보조선이 그려진',
    vibeKeywords: ['파란 설계도면', '블루프린트', '건축 도면', '모눈종이', '엔지니어링 CAD'],
    titleKo: '아키텍처 블루프린트 (설계도면 풍)',
    titleEn: 'Architectural CAD Blueprint Style',
    summary: '코발트블루 모눈종이 배경 위에 흰색 점선/실선 테두리와 치수 표기(`120px`)를 노출하는 도면 화풍',
    promptSnippet:
      '엔지니어링 설계도면 같은 Architectural Blueprint 화풍을 적용해 줘. 진한 블루(`#1e3a8a`) 배경 위에 20px 간격의 얇은 격자 모눈(`linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)`)을 깔고, 모든 컴포넌트를 흰색 실선·점선 보더와 모서리 십자선(`+`), 치수 라벨로 표현해 줘.',
  },
  {
    id: 'st-swiss-editorial-grid',
    domain: 'style',
    category: 'scifi',
    vibeTag: '노출된 1px 격자 실선과 강렬한 타이포그래피 대비의 현대 미술관 포스터 풍',
    vibeKeywords: ['스위스 그리드', '바우하우스', '노출된 실선 격자', '포스터 타이포', '에디토리얼 미니멀'],
    titleKo: '스위스 인터내셔널 그리드',
    titleEn: 'Swiss International Exposed Grid',
    summary: '여백 대신 1px 실선(`border-collapse`)으로 모든 셀 구획을 드러내고 거대한 숫자와 산세리프를 배치',
    promptSnippet:
      '현대 미술관 포스터 같은 Swiss International Typographic 스타일을 적용해 줘. 카드의 둥근 모서리를 없애고 노출된 1px 실선 격자(`divide-x divide-y border`)로 모든 영역을 엄격하게 분할하며, 강렬한 오렌지/화이트/블랙 대비와 굵은 번호 타이포그래피(`01`, `02`)를 전면에 배치해 줘.',
  },
  {
    id: 'st-comic-halftone-pop',
    domain: 'style',
    category: 'scifi',
    vibeTag: '만화책 망점 패턴과 기울어진 액션 박스, 굵은 외곽선이 튀는 팝아트 풍',
    vibeKeywords: ['만화책 망점', '코믹북 팝아트', '마블 코믹스', '말풍선 액션', '하프톤 팝아트'],
    titleKo: '코믹북 하프톤 팝아트',
    titleEn: 'Comic Book Halftone Pop-Art',
    summary: '도트 망점 배경 위에 살짝 기울어진(`skew-x`) 원색 패널과 만화 효과음 배지를 결합한 스타일',
    promptSnippet:
      '미국 코믹북/만화책 같은 Comic Halftone Pop-Art 스타일을 적용해 줘. 배경에 대각선 도트 망점(`radial-gradient(#000 1.5px, transparent 1.5px)`) 패턴을 깔고, 패널에 `skewX(-4deg)` 기울기와 3px 검은 외곽선, 강렬한 노랑·빨강 액션 배지를 결합해 줘.',
  },

  /* =====================================================================
   * DOMAIN 5: 모션 영상 (16종 - 타임라인·쇼릴·시퀀스 연출)
   * ===================================================================== */
  /* 1. 런칭·쇼릴·홍보 (promo) */
  {
    id: 'vd-saas-launch-reel',
    domain: 'video',
    category: 'promo',
    vibeTag: '타이틀 등장 후 대시보드 UI가 줌인되며 핵심 기능이 컷 전환되는 런칭 영상',
    vibeKeywords: ['프로덕트 런칭 영상', 'SaaS 쇼릴', '홍보 티저', '씬 시퀀스', '타임라인 쇼케이스'],
    titleKo: 'SaaS 프로덕트 런칭 쇼릴',
    titleEn: 'SaaS Product Launch Showreel',
    summary: 'Scene 1(슬로건 줌인) ➔ Scene 2(대시보드 등장) ➔ Scene 3(CTA 피날레)로 이어지는 3단계 프로모션 시퀀스',
    promptSnippet:
      'Remotion/모션 그래픽 스타일의 3단계 SaaS 프로덕트 런칭 쇼릴 시퀀스를 구현해 줘. Scene 1(0~1.5s)에서 슬로건이 spring 스케일업으로 등장하고, Scene 2(1.5~3.5s)에서 대시보드 목업이 3D 원근 각도에서 정면으로 펴지며 핵심 위젯이 하이라이트되고, Scene 3(3.5~5s)에서 브랜드 로고와 CTA 배지로 스냅 전환되게 해 줘.',
  },
  {
    id: 'vd-device-3d-spin',
    domain: 'video',
    category: 'promo',
    vibeTag: '스마트폰·랩탑 목업이 입체 회전하며 화면 속 앱 기능이 클로즈업되는',
    vibeKeywords: ['3D 기기 회전 목업', '아이폰 목업 영상', '앱 프리뷰 투어', '디바이스 쇼케이스', '제품 홍보 컷'],
    titleKo: '3D 디바이스 목업 투어',
    titleEn: '3D Device Mockup Showcase',
    summary: '기울어진 모바일/데스크탑 프레임이 부드럽게 회전하며 내부 UI 위젯이 레이어별로 떠오르는 홍보 연출',
    promptSnippet:
      '앱 홍보 영상처럼 3D 디바이스 목업 투어 모션을 만들어 줘. `perspective: 900px` 공간에서 디바이스 프레임이 `rotateY(-28deg) rotateX(12deg)`에서 정면(`0deg`)으로 회전하며 등장하고, 회전이 멈추는 타이밍에 화면 안의 핵심 알림 카드가 `translateZ(30px)`로 팝아웃되며 강조되게 해 줘.',
  },
  {
    id: 'vd-app-walkthrough-zoom',
    domain: 'video',
    category: 'promo',
    vibeTag: '가상 마우스 커서가 이동해 버튼을 누르는 순간 화면이 2배로 줌인되는',
    vibeKeywords: ['커서 추적 카메라 줌', '튜토리얼 워크스루', '마우스 클릭 줌인', '기능 가이드 영상', '포커스 카메라'],
    titleKo: '인터랙티브 커서 줌 워크스루',
    titleEn: 'Cursor Follow Zoom Walkthrough',
    summary: '가상 포인터가 타겟 버튼으로 이동해 클릭 리플을 일으키면 카메라가 해당 영역을 클로즈업하는 데모 연출',
    promptSnippet:
      '제품 사용법 영상처럼 Cursor Follow Zoom 워크스루 시퀀스를 구현해 줘. 가상 커서가 베지어 곡선을 그리며 타겟 버튼으로 이동할 때 전체 캔버스가 해당 좌표(`transform-origin`)를 기준으로 `scale(1.65)` 줌인되고, 클릭 파동 후 완료 배지가 뜨면서 다시 `scale(1)` 전체 뷰로 복귀하게 해 줘.',
  },
  {
    id: 'vd-split-promo-reel',
    domain: 'video',
    category: 'promo',
    vibeTag: '화면이 2~3분할로 쪼개져 서로 반대 방향으로 미끄러지듯 교차하는 광고 컷',
    vibeKeywords: ['다중 분할 쇼릴', '스플릿 스크린 광고', '교차 슬라이드 컷', '패션 커머스 영상', '멀티 프레임'],
    titleKo: '멀티 스크린 스플릿 쇼릴',
    titleEn: 'Multi-Screen Split Promo Reel',
    summary: '3개의 분할 컬럼이 상하 교차 슬라이드로 맞물려 들어온 뒤 전체 화면 타이틀로 합쳐지는 역동적인 구성',
    promptSnippet:
      '광고 쇼릴에 쓰이는 Multi-Screen Split 시퀀스를 구현해 줘. 화면을 3등분한 패널이 각각 위·아래·위 반대 방향(`translateY(-100%)`, `translateY(100%)`)에서 `cubic-bezier(0.22, 1, 0.36, 1)`로 동시에 맞물려 들어와 정지하고, 이어서 중앙 와이프와 함께 메인 카피가 오버레이되게 해 줘.',
  },

  /* 2. 타이포·리듬 광고 (kinetic_ad) */
  {
    id: 'vd-stomp-beat-typo',
    domain: 'video',
    category: 'kinetic_ad',
    vibeTag: '빠른 박자에 맞춰 굵은 단어가 화면을 쾅쾅 찍듯 바뀌며 배경색이 반전되는',
    vibeKeywords: ['박자 맞춰 찍히는 글자', '스톰프 타이포', '애플 광고 스타일', '배경 반전 비트', '리듬 텍스트 컷'],
    titleKo: '스톰프 비트 타이포그래피',
    titleEn: 'Stomp Beat Rhythm Typography',
    summary: '비트마다 단어가 거대한 스케일에서 쾅 찍히듯 수축하고 배경과 글자 색상이 흑백/원색으로 강렬하게 반전되는 연출',
    promptSnippet:
      '애플 "Don\'t Blink" 광고처럼 Stomp Beat Typography 시퀀스를 구현해 줘. 0.55초 비트 간격마다 키워드("THINK", "BUILD", "SHIP", "FAST.")가 `scale(2.2)`에서 `scale(1)`로 강하게 찍히듯 등장하고, 매 비트마다 컨테이너 배경색과 텍스트 색상이 반전(다크 ➔ 인디고 ➔ 앰버 ➔ 화이트)되게 해 줘.',
  },
  {
    id: 'vd-highlight-swipe-reveal',
    domain: 'video',
    category: 'kinetic_ad',
    vibeTag: '형광 마커 바가 문장을 휙 훑고 지나가며 핵심 키워드와 서브 카피가 켜지는',
    vibeKeywords: ['형광펜 스와이프 자막', '하이라이트 바 리빌', '광고 카피 모션', '키워드 마스킹', '타이포 시퀀스'],
    titleKo: '하이라이트 마커 스와이프 씬',
    titleEn: 'Marker Swipe Headline Reveal',
    summary: '컬러 블록 바가 좌에서 우로 빠르게 스와이프하며 헤드라인을 드러내고 하단 요약 태그가 순차 팝업되는 구성',
    promptSnippet:
      '모션 광고의 Marker Swipe Reveal 타이틀 씬을 구현해 줘. 먼저 컬러 마커 블록이 `scaleX(0)`에서 `scaleX(1)`(`transform-origin: left`)로 뻗어나간 뒤 `transform-origin: right`로 수축하면서 그 아래 숨겨져 있던 굵은 헤드라인 텍스트를 드러내고, 직후에 서브 태그 칩들이 0.1초 간격으로 올라오게 해 줘.',
  },
  {
    id: 'vd-countdown-energetic-intro',
    domain: 'video',
    category: 'kinetic_ad',
    vibeTag: '3·2·1 대형 카운트다운과 회전 링이 맞물려 돌아간 뒤 메인 타이틀이 터지는 오프닝',
    vibeKeywords: ['321 카운트다운 인트로', '영상 오프닝 시퀀스', '에너지틱 인트로', '타이머 폭발', '쇼릴 오프닝'],
    titleKo: '에너지틱 카운트다운 오프닝',
    titleEn: 'Energetic Countdown Opener',
    summary: '회전하는 레이더 서클 안에서 3·2·1 숫자가 타격감 있게 바뀐 뒤 "LIVE NOW" 메인 배너로 전환되는 인트로',
    promptSnippet:
      '쇼릴/이벤트 오프닝용 Countdown Opener 시퀀스를 만들어 줘. 대시 원형 링이 회전하는 가운데 숫자 `3` ➔ `2` ➔ `1`이 매초 `scale(1.6)` 탄성 애니메이션과 파동 링을 동반하며 전환되고, `0`이 되는 순간 화면 전체가 밝게 플래시된 뒤 메인 런칭 타이틀이 펼쳐지게 해 줘.',
  },
  {
    id: 'vd-chat-story-sequence',
    domain: 'video',
    category: 'kinetic_ad',
    vibeTag: '메신저 질문 말풍선과 점 세 개 타이핑 후 AI 결과 카드가 리듬감 있게 쌓이는',
    vibeKeywords: ['메신저 대화 광고 영상', '채팅 말풍선 시퀀스', 'AI 프롬프트 영상', '스토리텔링 릴스', '대화형 모션'],
    titleKo: '메신저 대화 빌드업 씬',
    titleEn: 'Chat Bubble Storyboard Sequence',
    summary: '사용자 질문 말풍선 ➔ 타이핑 점(`...`) ➔ 완성된 UI 결과 카드가 시나리오 순서대로 탄성 있게 쌓이는 연출',
    promptSnippet:
      'AI 서비스 홍보 영상에 쓰이는 Chat Storyboard Sequence를 구현해 줘. Step 1에서 우측 사용자 질문 말풍선이 아래에서 튀어 오르고, Step 2에서 좌측 타이핑 인디케이터(`...`)가 0.8초간 바운스한 뒤, Step 3에서 완성된 프리뷰 카드가 스프링 애니메이션으로 펼쳐지는 시퀀스를 자동 재생해 줘.',
  },

  /* 3. 데이터·차트 모션 (infographic) */
  {
    id: 'vd-animated-bar-race',
    domain: 'video',
    category: 'infographic',
    vibeTag: '막대 차트가 바닥에서 목표치까지 솟구치며 +340% 성장 배지가 팡 뜨는',
    vibeKeywords: ['차트 급상승 모션', '성장 그래프 영상', '피치덱 인포그래픽', '막대차트 애니메이션', '매출 상승 연출'],
    titleKo: '다이내믹 차트 성장 시퀀스',
    titleEn: 'Animated Growth Chart Scene',
    summary: '분기별 막대 차트가 시간차로 솟아오른 뒤 최고점 막대 위에 상승률(`+340%`) 콜아웃 배지가 팝업되는 씬',
    promptSnippet:
      'IR/피치덱 모션 그래픽처럼 Animated Growth Chart 시퀀스를 구현해 줘. 5개의 분기별 바가 0.1초 간격(stagger)으로 바닥(`height: 0%`)에서 목표 높이까지 `cubic-bezier(0.34, 1.56, 0.64, 1)`로 솟아오르고, 마지막 바가 완료되면 상단에 `+340% 성장` 하이라이트 배지가 팝업되게 해 줘.',
  },
  {
    id: 'vd-kpi-counter-explosion',
    domain: 'video',
    category: 'infographic',
    vibeTag: '핵심 성과 지표 카드 3개가 순서대로 뒤집히며 숫자가 빠르게 롤링되는',
    vibeKeywords: ['KPI 실적 발표 모션', '지표 카드 시퀀스', '숫자 롤링 인포그래픽', '데이터 리포트 영상', '성과 하이라이트'],
    titleKo: 'KPI 메트릭 리빌 시퀀스',
    titleEn: 'KPI Metric Reveal Sequence',
    summary: '3개의 핵심 지표 카드가 시간차로 등장하며 게이지 바와 핵심 수치(`99.9%`, `12x`, `0.2s`)가 동시에 채워지는 연출',
    promptSnippet:
      '실적 발표 영상용 KPI Metric Reveal 시퀀스를 만들어 줘. 3개의 지표 카드가 순차적으로 슬라이드 업 + 페이드인되면서 각 카드의 숫자가 0부터 목표값까지 카운트업되고, 하단 미니 프로그레스 바가 목표 비율까지 스르륵 채워지는 타임라인 애니메이션을 적용해 줘.',
  },
  {
    id: 'vd-node-flow-pipeline',
    domain: 'video',
    category: 'infographic',
    vibeTag: '입력 노드에서 AI 엔진을 거쳐 결과 노드로 빛 입자가 흐르며 차례로 켜지는',
    vibeKeywords: ['파이프라인 흐름도 영상', '노드 연결 모션', '아키텍처 설명 그래픽', '데이터 전송 펄스', '워크플로우 시퀀스'],
    titleKo: '데이터 파이프라인 플로우 씬',
    titleEn: 'Data Pipeline Node Flow Scene',
    summary: 'Input ➔ AI Core ➔ Output 3단계 노드를 따라 광선 패킷이 이동하며 도착한 노드가 네온 빛으로 점등되는 연출',
    promptSnippet:
      '기술 소개 영상에 쓰이는 Data Pipeline Node Flow 모션을 구현해 줘. 좌측 입력 노드에서 중앙 코어, 우측 결과 노드로 이어진 연결선을 따라 발광 패킷이 이동하고, 패킷이 도달하는 순서대로 각 노드의 테두리와 상태 배지가 활성화(`Active`)되는 단계별 타임라인을 보여줘.',
  },
  {
    id: 'vd-circular-ring-dashboard',
    domain: 'video',
    category: 'infographic',
    vibeTag: '3중 원형 게이지 링이 시간차로 돌아가며 채워지고 중앙 점수가 올라가는',
    vibeKeywords: ['3중 원형 링 차트', '애플워치 액티비티 링', '도넛 차트 모션', '원형 대시보드 영상', '게이지 충전 씬'],
    titleKo: '멀티 링 게이지 인포그래픽',
    titleEn: 'Multi-Ring Progress Infographic',
    summary: '외곽·중간·내부 3개의 SVG 원형 링이 서로 다른 속도와 색상으로 회전하며 채워지는 데이터 비주얼라이제이션',
    promptSnippet:
      '애플 워치 액티비티 링 스타일의 Multi-Ring Progress 인포그래픽 씬을 구현해 줘. 반지름이 다른 3개의 동심원 SVG `<circle>`(`stroke-linecap="round"`)이 `stroke-dashoffset` 애니메이션으로 각각 92%, 78%, 64%까지 부드럽게 채워지고, 우측 범례 수치가 순차 점등되게 해 줘.',
  },

  /* 4. 방송·트랜지션·자막 (broadcast) */
  {
    id: 'vd-lower-third-banner',
    domain: 'video',
    category: 'broadcast',
    vibeTag: '화면 좌측 하단에 컬러 라인이 먼저 그어진 뒤 이름과 직함 자막 바가 미끄러져 나오는',
    vibeKeywords: ['유튜브 인터뷰 자막바', '로어써드 자막 모션', '방송 하단 네임택', '발표자 소개 배너', '뉴스 자막 연출'],
    titleKo: '모던 로어써드 방송 자막',
    titleEn: 'Broadcast Lower Third Title',
    summary: '수직 액센트 바가 뻗은 뒤 마스크 안쪽에서 발표자 이름·소속 배너가 시간차로 슬라이드 인/아웃되는 방송 자막',
    promptSnippet:
      '유튜브·방송 인터뷰용 Lower Third 자막 애니메이션을 구현해 줘. 1단계로 좌측 수직 인디고 액센트 바가 위아래로 펼쳐지고(`scaleY(1)`), 2단계로 `overflow-hidden` 마스크 안에서 메인 이름 바가 좌측(`translateX(-100%)`)에서 슬라이드 인, 3단계로 0.15초 뒤 서브 직함 태그가 따라 나오는 시퀀스로 구성해 줘.',
  },
  {
    id: 'vd-diagonal-shutter-wipe',
    domain: 'video',
    category: 'broadcast',
    vibeTag: '3겹의 대각선 컬러 슬라이스가 시간차로 화면을 휙 쓸고 지나가며 장면이 바뀌는',
    vibeKeywords: ['대각선 스팅어 화면전환', '방송 와이프 트랜지션', '3단 컬러 셔터', '유튜브 씬 전환', '다이어고널 와이프'],
    titleKo: '다이어고널 멀티 와이프 전환',
    titleEn: 'Diagonal Multi-Layer Stinger Wipe',
    summary: '인디고·바이올렛·시안 3겹의 대각선 레이어가 짧은 시간차로 화면을 덮고 지나가며 Scene A를 Scene B로 전환',
    promptSnippet:
      '방송 스팅어(Stinger) 같은 Diagonal Multi-Layer Wipe 화면 전환을 구현해 줘. `skewX(-18deg)`로 기울어진 3개의 컬러 레이어가 0.08초 간격으로 화면 왼쪽 밖에서 오른쪽 밖으로 빠르게 가로질러 지나가고, 중앙을 덮는 순간 배경 씬(Scene A ➔ Scene B)이 매끄럽게 교체되게 해 줘.',
  },
  {
    id: 'vd-logo-stinger-outro',
    domain: 'video',
    category: 'broadcast',
    vibeTag: '양쪽에서 빛 줄기가 중앙으로 날아와 부딪힌 뒤 브랜드 로고와 슬로건이 완성되는 엔딩',
    vibeKeywords: ['로고 스팅어 엔딩', '아웃트로 로고 리빌', '브랜드 범퍼 영상', '네온 충돌 오프닝', '영상 엔딩 카드'],
    titleKo: '네온 로고 스팅어 아웃트로',
    titleEn: 'Logo Reveal Stinger Outro',
    summary: '좌우 빛 에너지가 중앙 코어에서 충돌해 충격파 링을 퍼뜨린 뒤 브랜드 심볼과 구독·CTA 버튼이 등장하는 엔딩 씬',
    promptSnippet:
      '유튜브·브랜드 필름 엔딩용 Logo Stinger Outro 시퀀스를 구현해 줘. 좌우에서 날아온 두 개의 네온 광선이 중앙에서 충돌하는 순간 원형 충격파(`scale(0)` ➔ `scale(2.5)`)가 퍼지고, 동시에 브랜드 로고 심볼이 탄성 있게 팝업된 뒤 하단 슬로건이 레터링 간격(`letter-spacing`)을 좁히며 자리 잡게 해 줘.',
  },
  {
    id: 'vd-audio-spectrum-visualizer',
    domain: 'video',
    category: 'broadcast',
    vibeTag: '음악 비트와 보컬 파형에 맞춰 수직 스펙트럼 바들이 살아 움직이는 뮤직비디오 씬',
    vibeKeywords: ['오디오 파형 스펙트럼', '음악 비주얼라이저', '팟캐스트 음성 파형', '이퀄라이저 바 모션', '뮤직비디오 플레이어'],
    titleKo: '오디오 스펙트럼 비주얼라이저',
    titleEn: 'Audio Spectrum Waveform Scene',
    summary: '트랙 재생 타임라인과 함께 16채널 주파수 스펙트럼 바가 리듬감 있게 물결치며 움직이는 미디어 씬',
    promptSnippet:
      '뮤직비디오·팟캐스트 영상용 Audio Spectrum Visualizer 씬을 구현해 줘. 중앙에 그라데이션 수직 바 16개를 배치해 각기 다른 주기와 위상차(`animation-delay`)로 높이가 역동적으로 요동치게 하고, 상단 LIVE 배지와 하단 재생 타임코드(`01:24 / 03:45`) 프로그레스 바가 함께 흐르도록 구성해 줘.',
  },
];
