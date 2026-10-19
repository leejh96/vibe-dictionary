import { HOVER_ADDITIONS } from './additions/hover';
import { CARD_ADDITIONS } from './additions/card';
import { MOTION_ADDITIONS } from './additions/motion';
import { TEXT_ADDITIONS } from './additions/text';
import { FEEDBACK_ADDITIONS } from './additions/feedback';
import { LAYOUT_ADDITIONS } from './additions/layout';
import { CONTROL_ADDITIONS } from './additions/control';
import { GRAPHIC_ADDITIONS } from './additions/graphic';
import { SHADER_ADDITIONS } from './additions/shader';
import { PHYSICS_ADDITIONS } from './additions/physics';
import { KINETIC_ADDITIONS } from './additions/kinetic';
import { GRID_ADDITIONS } from './additions/grid';
import { NAV_ADDITIONS } from './additions/nav';
import { PANEL_ADDITIONS } from './additions/panel';
import { MODERN_ADDITIONS } from './additions/modern';
import { CAMERA_ADDITIONS } from './additions/camera';
import { VFX_ADDITIONS } from './additions/vfx';
import { SCROLL_ADDITIONS } from './additions/scroll';
import { TACTILE_ADDITIONS } from './additions/tactile';
import { RETRO_ADDITIONS } from './additions/retro';
import { SCIFI_ADDITIONS } from './additions/scifi';
import { PROMO_ADDITIONS } from './additions/promo';
import { KINETIC_AD_ADDITIONS } from './additions/kinetic_ad';
import { INFOGRAPHIC_ADDITIONS } from './additions/infographic';
import { BROADCAST_ADDITIONS } from './additions/broadcast';

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
  ...TACTILE_ADDITIONS,
  ...RETRO_ADDITIONS,
  ...SCIFI_ADDITIONS,
  ...PROMO_ADDITIONS,
  ...KINETIC_AD_ADDITIONS,
  ...INFOGRAPHIC_ADDITIONS,
  ...BROADCAST_ADDITIONS,
  ...CAMERA_ADDITIONS,
  ...VFX_ADDITIONS,
  ...SCROLL_ADDITIONS,
  ...GRID_ADDITIONS,
  ...NAV_ADDITIONS,
  ...PANEL_ADDITIONS,
  ...MODERN_ADDITIONS,
  ...KINETIC_ADDITIONS,
  ...PHYSICS_ADDITIONS,
  ...SHADER_ADDITIONS,
  ...GRAPHIC_ADDITIONS,
  ...CONTROL_ADDITIONS,
  ...LAYOUT_ADDITIONS,
  ...TEXT_ADDITIONS,
  ...FEEDBACK_ADDITIONS,
  ...MOTION_ADDITIONS,
  ...CARD_ADDITIONS,
  ...HOVER_ADDITIONS,
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
      "지정한 버튼을 감싼 영역에서 마우스 위치를 추적하는 Magnetic Cursor Hover를 구현해 줘. 추적 영역 중심과 커서의 좌표 차이(dx, dy)의 42%만큼 버튼을 translate하고, 이동 중에는 0.05초 ease-out으로 따라가게 해 줘. 영역을 벗어나면 오프셋을 (0, 0)으로 초기화하고 0.45초 cubic-bezier(0.34, 1.56, 0.64, 1)로 복귀시켜 줘.",
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
      "지정한 버튼/배지 안에 overflow-hidden과 pointer-events-none 광택 레이어를 두는 Shimmer Light Sweep을 구현해 줘. 투명→흰색 55%→투명 그라데이션을 skewX(-20deg)로 기울이고 translateX(-160%)에서 260%까지 2초 ease-in-out으로 무한 반복해 줘. 텍스트는 광택보다 위에 두고, 버튼을 클릭하면 광택 애니메이션을 처음부터 재생해 줘.",
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
      "지정한 버튼을 클릭한 위치(clientX - rect.left, clientY - rect.top)에 16px 원형 Ripple을 생성해 줘. 버튼 내부에서만 보이게 하고 pointer-events-none으로 입력을 가로막지 않게 해 줘. 0.65초 ease-out 동안 translate(-50%, -50%)를 유지하며 scale(0)→14, opacity 0.65→0으로 확산한 뒤 원을 제거해 줘. 연속 클릭은 각각 독립된 물결로 처리해 줘.",
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
      "지정한 버튼에 클릭으로 ON/OFF가 전환되는 Neon Glow Pulse를 구현해 줘. 초기값은 ON이며 ON일 때만 시안색 테두리와 box-shadow를 2초 ease-in-out으로 반복해 줘. 그림자는 0/100%에서 번짐 10px·24px(불투명도 0.55·0.25), 50%에서 20px·42px(0.95·0.55)로 맥동하게 해 줘. OFF에서는 반복 발광을 없애고 어두운 배경·테두리·문자로 전환해 줘.",
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
      "지정한 버튼 안에서 에메랄드 배경 레이어가 translateX(-100%)→0으로 채워지는 Slide Fill을 구현해 줘. 초기에는 비어 있고 마우스 진입 시 채움, 이탈 시 비움, 클릭 시 현재 채움 상태를 반전시켜 줘. 배경 이동은 0.3초 ease-out, 텍스트 색상 전환도 0.3초로 맞추고, 채워졌을 때 어두운 텍스트로 바꿔 줘. 배경은 버튼 안에서 잘리고 텍스트보다 뒤에 있어야 해.",
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
      "지정한 카드에 클릭할 때마다 앞면/뒷면을 토글하는 3D Card Flip을 구현해 줘. 외부에는 perspective: 1000px, 내부에는 transform-style: preserve-3d와 0.5초 transform 전환을 적용해 줘. 양면 모두 backface-visibility: hidden을 적용하고 뒷면은 미리 rotateY(180deg)로 배치해 줘. 내부 래퍼를 0deg↔180deg로 돌려 초기 앞면에서 뒷면으로, 재클릭 시 앞면으로 돌아오게 해 줘.",
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
      "지정한 카드의 추적 영역에서 정규화한 커서 좌표(px, py: 0~1)를 사용해 perspective(550px), rotateX((py - 0.5) * -28deg), rotateY((px - 0.5) * 28deg)를 적용하는 3D Tilt를 구현해 줘. 이동 중에는 0.04초 linear로 추적하고 커서 위치에 흰색 35%→transparent 60% radial-gradient 광택을 배치해 줘. 마우스 이탈 시 기울기를 0deg로, 광택 중심을 (50%, 50%)로 초기화하고 0.4초 ease-out으로 복귀해 줘.",
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
      "지정한 카드에 bg-white/10, backdrop-blur-md, border-white/25와 둥근 모서리·그림자를 조합한 Frosted Glassmorphism을 적용해 줘. 뒤에는 분홍색·시안색 원형 광원을 흐리게 두고, 각각 반대 방향으로 (-28px, -12px)↔(28px, 14px) 및 (28px, 12px)↔(-28px, -14px) 이동하며 scale(1)↔1.15로 4초 ease-in-out 반복해 줘. 카드 앞의 텍스트는 선명하게 유지하고 광원이 유리를 통해 비치게 해 줘.",
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
      "지정한 카드 내부의 마우스 좌표를 따라가는 Radial Spotlight를 구현해 줘. 초기 조명 중심은 (100px, 45px)이며 radial-gradient(120px circle at xpx ypx, rgba(129,140,248,0.42), rgba(15,23,42,0.95) 80%)를 카드 배경으로 사용해 줘. 마우스 이동 시 중심만 갱신하고, 이탈 시에는 마지막 위치를 유지해 줘. 조명은 텍스트와 입력을 가리지 않아야 해.",
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
      "지정한 카드 덱을 3장으로 겹치고 클릭할 때마다 첫 카드를 배열 끝으로 보내 순환하는 Stacked Card Deck을 구현해 줘. 앞에서부터 index에 따라 translateY(-9px * index), scale(1 - 0.07 * index), opacity(1 - 0.25 * index), z-index(10 - index)를 적용해 줘. 순환에 따른 위치·크기·투명도 변화는 0.3초로 전환해 줘.",
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
      "지정한 요소가 처음 나타날 때와 클릭으로 재생할 때 0.48초 cubic-bezier(0.34, 1.56, 0.64, 1)의 Spring Pop을 실행해 줘. 0%에서는 scale(0.45)·opacity 0, 60%에서는 scale(1.14)·opacity 1, 80%에서는 scale(0.95), 100%에서는 scale(1)로 안착하고 마지막 상태를 유지해 줘. 반복 클릭하면 애니메이션을 처음부터 다시 시작해 줘.",
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
      "지정한 목록의 항목을 index * 100ms 간격으로 순차 등장시키는 Staggered Cascade를 구현해 줘. 각 항목은 0.42초 cubic-bezier(0.16, 1, 0.3, 1) 동안 opacity 0·translateY(12px)에서 opacity 1·translateY(0)으로 전환해 줘. 지연 중에도 시작 상태를 유지하도록 backwards를 적용하고, 처음 표시될 때 재생하며 목록을 클릭하면 전체 시퀀스를 재시작해 줘.",
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
      "지정한 아코디언은 초기 열린 상태로 두고 클릭할 때마다 접기/펼치기를 토글해 줘. 상세 영역을 CSS Grid grid-template-rows: 0fr↔1fr와 opacity: 0↔1로 0.3초 ease-out 전환하고, 내부에는 overflow-hidden을 적용해 줘. 열릴 때만 상단 간격을 주고 화살표는 0.3초 동안 180deg 회전해 줘.",
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
      "지정한 버튼을 Idle→Loading→Done으로 바꾸는 시연용 Morphing State Button을 구현해 줘. Idle 클릭 시 너비 144px의 인디고 버튼이 40px의 원형 로딩 스피너로 변하고, 850ms 뒤 너비 128px의 에메랄드 완료 버튼으로 전환되게 해 줘. 너비·색상 변화는 0.3초로 맞춰 줘. Loading 또는 Done에서 재클릭하면 타이머를 취소하고 Idle로 복귀시켜 줘. 850ms 전환은 데모용 타이머이며 실제 요청의 성공을 의미하지 않아.",
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
      "지정한 요소와 아래의 별도 그림자 레이어를 2.2초 ease-in-out으로 함께 반복하는 Floating Levitation을 구현해 줘. 요소는 translateY(0)→-9px→0으로 떠다니고, 그림자는 같은 타이밍에 scale(1)·opacity 0.55→scale(0.65)·opacity 0.25→원래 값으로 변하게 해 줘. 그림자는 blur(2px)로 부드럽게 하고 요소가 높이 뜰수록 작고 옅어지게 해 줘.",
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
      "지정한 텍스트를 처음 표시할 때 55ms 간격으로 한 글자씩 출력하는 Typewriter 효과를 구현해 줘. 끝에는 에메랄드색 막대 커서가 펄스 형태로 깜빡이게 해 줘. 전체 문장을 출력하면 타이핑 타이머를 멈추고, 영역을 클릭하면 기존 출력을 비운 뒤 처음부터 다시 타이핑해 줘.",
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
      "지정한 텍스트가 처음 표시되거나 클릭할 때 Scramble Decode를 재생해 줘. 35ms마다 무작위 기호(!<>-_\\\\/[]{}—=+*^?#01)를 갱신하고, 공백은 유지해 줘. frame > index * 2인 문자부터 원문으로 고정해 왼쪽에서 오른쪽으로 해독하고, frame이 전체 글자 수의 2배를 넘으면 타이머를 멈춰 줘. 재실행 전의 타이머는 정리해 줘.",
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
      "지정한 헤드라인에 bg-clip-text와 text-transparent를 적용하고, #818cf8→#f472b6→#fbbf24→#34d399→#818cf8의 90deg 그라데이션을 글자 안에만 보이게 해 줘. background-size: 220% 220%로 확대하고 background-position을 0% 50%→100% 50%→0% 50%로 3초 ease 무한 반복하는 Animated Gradient Text를 구현해 줘.",
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
      "지정한 숫자 지표를 requestAnimationFrame과 easeOutQuart(1 - (1 - p)^4)로 0.65초 동안 현재 표시값에서 목표값까지 보간하는 Number Ticker를 구현해 줘. 매 프레임 정수로 반올림하고 천 단위 구분자를 표시해 줘. 데모는 최초 0→2,480으로 시작하고 클릭할 때 목표값에 400~1,599를 더해 다시 재생해. 목표 변경/언마운트 시 기존 프레임을 취소하고 새 목표는 현재 표시값에서 이어서 시작해 줘.",
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
      "지정한 강조 텍스트 뒤에 노란색 45%의 인라인 배경을 no-repeat, background-position: 0 90%로 배치해 줘. 최초 표시 200ms 뒤 background-size: 0% 85%→100% 85%를 0.55초 cubic-bezier(0.16, 1, 0.3, 1)로 채우는 Marker Highlight를 구현해 줘. 클릭하면 전환 없이 폭을 0으로 되돌리고 120ms 뒤 다시 그어 줘.",
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
      "지정한 버튼을 클릭할 때 중앙에서 9개의 다색 10px 파티클이 퍼지는 Confetti Burst를 구현해 줘. 파티클은 x -80~80px, y -80~50px 범위의 데모상 고정된 9방향으로 0.78초 ease-out 이동하면서 scale(0.4)→1.15, rotate(0)→120deg, opacity 1→0으로 변하게 해 줘. 장식 레이어는 pointer-events-none으로 두고 900ms 뒤 제거하며, 재클릭 시 이전 정리 타이머를 취소하고 새 폭죽을 재생해 줘. 클릭은 시연 트리거이며 실제 작업의 성공을 의미하지 않아.",
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
      "지정한 입력 박스 모양 영역에 클릭으로 유효성 실패 표현을 시연하는 Error Shake를 구현해 줘. 0.42초 cubic-bezier(0.36, 0.07, 0.19, 0.97) 동안 translateX(0)→±8px와 rotate(±1deg)를 교차한 뒤 원위치로 돌아오게 해 줘. 클릭 시 빨간 테두리를 적용하고 재클릭 시 15ms 간격으로 애니메이션을 재시작해 줘. 상단 안내 배지는 처음부터 표시하고 2.2초 주기의 float-bob으로 띄워 줘. 데모에는 실제 입력값 검사나 안내 자동 숨김은 없어.",
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
      "지정한 좋아요 버튼의 하트와 둥근 사각 테두리 링을 처음 표시할 때와 클릭할 때마다 함께 재생해 줘. 하트에는 0.48초 Spring Pop(scale 0.45→1.14→0.95→1)을, 링에는 0.5초 ease-out으로 scale(0.5)→1.85와 opacity 0.9→0을 적용해 줘. 재클릭 시 두 애니메이션을 처음부터 다시 시작하고, 좋아요 서버 저장 여부와는 구분된 시각 효과로 구현해 줘.",
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
      "지정한 알림 영역에 초기 토스트 1개를 보여주고 클릭할 때마다 새 토스트를 추가하는 Slide-in Toast Stack을 구현해 줘. 최신 2개만 유지하며 자동으로 사라지게 하지는 말아 줘. 새 토스트는 0.38초 cubic-bezier(0.34, 1.56, 0.64, 1) 동안 translateY(24px)·scale(0.92)·opacity 0에서 65% 지점의 translateY(-3px)·scale(1.02)를 거쳐 원위치·scale(1)·opacity 1로 안착하게 해 줘. 알림 문구는 시연용이며 실제 저장 완료를 의미하지 않아.",
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
      "지정한 탭 메뉴를 동일 너비의 3칸으로 배치하고 초기에는 첫 탭을 활성화해 줘. 탭 클릭 시 인디고색 둥근 배경 Pill이 translateX(activeIndex * 100%)로 0.3초 ease-out 이동하고, 활성 탭의 텍스트는 흰색·비활성 탭은 회색으로 전환해 줘. Pill은 버튼보다 뒤에 두고 메뉴 내부에서만 이동하게 해 줘.",
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
      "지정한 배너 안에 같은 아이템 목록을 두 번 연속 배치하고 바깥에는 overflow-hidden을 적용해 줘. 전체 트랙을 translateX(0%)→-50%로 9초 linear 무한 반복하는 Infinite Marquee를 구현해 줘. 두 사본의 구성과 간격을 같게 맞춰 반복 경계에서 같은 목록이 이어지게 하고, 별도 호버 정지 기능은 추가하지 말아 줘.",
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
      "지정한 로딩 플레이스홀더를 원형 아바타 1개와 너비가 다른 텍스트 막대 2개로 구성해 줘. 카드 내부의 절반 너비 광택 레이어에 투명→흰색 10%→투명 그라데이션을 주고 translateX(-160%)→260% 및 skewX(-20deg)를 2초 ease-in-out 무한 반복하는 Skeleton Shimmer를 구현해 줘. 광택은 카드 내부에서 잘리고 입력을 가로막지 않게 해 줘. 데모는 정적 로딩 시연이며 실제 데이터 요청/완료 전환은 없어.",
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
      "지정한 3개 항목 중 초기에는 가운데 항목만 bg-slate-800, 흰색 글자, ring-2 ring-amber-400, scale(1.02)로 강조하는 Spotlight Focus를 구현해 줘. 비활성 항목은 opacity 0.3과 blur(0.4px)로 낮추고 모든 변화는 0.3초로 전환해 줘. 데모와 같이 index i인 행을 클릭하면 그 행 자체가 아니라 다음 행((i + 1) % 3)을 강조하도록 순환해 줘.",
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
      "지정한 비교 영역에 BEFORE/AFTER 레이어를 겹치고 초기 분할 위치를 55%로 두는 Before/After Slider를 구현해 줘. 영역 전체를 덮는 투명한 range 입력의 범위는 10~90으로 제한하고, 값 pos에 따라 상단 BEFORE 레이어의 clip-path: inset(0 (100 - pos)% 0 0)와 분할선의 left: pos%를 함께 갱신해 줘. 분할선 가운데에는 양방향 이동 핸들을 표시해 줘.",
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
      "지정한 슬롯과 Motion/3D UI/Spring 3개 칩으로 구성한 Snap-to-Slot 시연 UI를 구현해 줘. 초기 선택은 Motion이며 칩을 클릭하면 슬롯 텍스트를 해당 칩으로 교체하고 에메랄드 테두리와 0.48초 Spring Pop(scale 0.45→1.14→0.95→1)으로 장착감을 표현해 줘. 선택된 칩도 강조해 줘. 이 데모는 클릭 선택 방식으로 실제 드래그 앤 드롭이나 물리적 흡착은 구현하지 않아.",
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
      "지정한 토글 스위치를 초기 ON 상태로 두고 클릭할 때마다 ON/OFF를 전환해 줘. 흰색 노브를 translateX(0px)↔28px로 0.42초 cubic-bezier(0.34, 1.56, 0.64, 1) 이동시키면서, 클릭 직후 220ms 동안 scaleX(1.25)로 늘렸다가 1로 복귀시켜 줘. 트랙 색상은 ON 인디고/OFF 어두운 회색으로 0.3초 전환해 줘.",
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
      "지정한 게이지와 카운터 배지에 클릭으로 반복되는 Combo Gauge Pop을 구현해 줘. 초기 count는 3이고 너비는 ((count % 5) + 1) * 20%이므로 처음 80%에서 시작해 클릭마다 count를 1씩 올리고 게이지를 100%→20%→40% 순으로 순환시켜 줘. 막대 너비는 0.3초 전환하고 배지는 count 변경 시 0.34초 cubic-bezier(0.34, 1.56, 0.64, 1)로 scale(0.7) rotate(-6deg)→scale(1.26) rotate(4deg)→scale(1) rotate(0)으로 팝하게 해 줘.",
  },
  {
    id: 'gooey-menu-fab',
    domain: 'ui',
    category: 'control',
    vibeTag: '플러스 버튼을 누르면 물방울처럼 톡톡 튀어나오는 액션 메뉴',
    vibeKeywords: ['물방울 플로팅 버튼', '구이 메뉴', 'FAB 확장', '스피드 다이얼', '플러스 메뉴'],
    titleKo: '구이 플로팅 액션 버튼 (Speed-Dial FAB)',
    titleEn: 'Spring Speed-Dial Floating Action Button',
    summary: '메인 + 버튼을 누르면 45도 회전하며 서브 액션 아이콘들이 시간차 스프링으로 튀어나옴',
    promptSnippet:
      "지정한 플로팅 액션 메뉴를 초기 열린 상태로 두고 메인 버튼 클릭 시 열기/닫기를 토글해 줘. 3개 하위 버튼의 열린 위치는 (-52px,-18px), (0,-48px), (52px,-18px)이며, 열 때만 0/45/90ms 지연과 0.3초 cubic-bezier(0.34, 1.56, 0.64, 1)로 scale(0.3)·opacity 0에서 scale(1)·opacity 1로 펼쳐 줘. 닫힐 때는 지연 없이 중앙으로 모으고 pointer-events-none으로 클릭을 막아 줘. + 아이콘은 0↔45deg 회전하게 해 줘. 하위 버튼은 배치와 등장 효과를 보여 주는 시연이며 별도 액션이나 선택 결과 문구는 추가하지 말아 줘.",
  },
  {
    id: 'otp-pin-focus-bounce',
    domain: 'ui',
    category: 'control',
    vibeTag: '인증번호를 한 자리씩 칠 때마다 칸이 통통 튀며 다음 칸으로 넘어가는',
    vibeKeywords: ['인증번호 6자리 입력창', 'OTP 입력', '핀 코드', '자동 포커스 이동', '바운스 인풋'],
    titleKo: 'OTP 핀 코드 바운스 인풋',
    titleEn: 'OTP Pin Auto-Focus Bounce Input',
    summary: '숫자 입력 시 해당 슬롯이 탄성 있게 튀어 오르며 자동으로 다음 칸으로 포커스가 이동하고 완료 시 에메랄드 글로우 점등',
    promptSnippet:
      "지정한 영역에 6칸 OTP 입력 모양의 시연 UI를 구현해 줘. 기본 샘플은 [4,8,2,9,빈칸,빈칸]이며 다섯 번째 칸을 강조해 줘. 칸 클릭 시 1~9 샘플 숫자로 바꾸고 다음 칸(마지막은 마지막 칸)을 강조하면서 0.2초 탄성 전환으로 scale(1.25)·translateY(-4px)를 적용한 뒤 260ms 후 복귀시켜 줘. 연속 입력 재생은 빈칸으로 초기화한 뒤 110ms 간격으로 [7,3,9,1,5,8]을 채우고, 6칸이 차면 에메랄드 테두리·광택을 켜 줘. 실제 input 자동 포커스나 서버 인증이 아닌 버튼/타이머 시연임을 구분해 줘.",
  },
  {
    id: 'hold-to-confirm-ring',
    domain: 'ui',
    category: 'feedback',
    vibeTag: '실수로 눌리지 않게 버튼을 꾹 누르고 있으면 게이지가 다 차야 실행되는',
    vibeKeywords: ['길게 눌러 실행 버튼', '홀드 투 컨펌', '꾹 누르기', '롱프레스 버튼', '삭제 확인 버튼'],
    titleKo: '홀드 투 컨펌 (Hold-to-Confirm)',
    titleEn: 'Hold-to-Confirm Progress Button',
    summary: '버튼을 길게 누르는 동안 게이지가 차오르고 중간에 떼면 취소되며 끝까지 채우면 실행 완료',
    promptSnippet:
      "지정한 버튼에서 pointerdown 동안 35ms마다 진행률을 5%씩 올리는 Hold-to-Confirm 시연을 구현해 줘. 0%부터 연속 약 700ms 누르면 100%에 도달해 완료 상태로 전환하고, 완료 버튼 클릭 시 전체를 초기화해 줘. 완료 전에 pointerup/leave가 발생하면 즉시 0으로 만들지 말고 25ms마다 10%씩 감소시켜 줘. 감소 도중 다시 누르면 남은 진행률부터 증가해 줘. 누르는 동안 scale(0.95), 진행 레이어 너비는 75ms 전환을 적용하고 실제 배포/중요 작업 실행과는 구분해 줘.",
  },
  {
    id: 'peek-password-lamp',
    domain: 'ui',
    category: 'control',
    vibeTag: '눈 아이콘을 켜면 손전등 빛이 비치며 가려진 비밀번호가 드러나는',
    vibeKeywords: ['손전등 비밀번호 보기', '패스워드 피크', '비밀번호 표시 조명', '라이트 빔 인풋', '보안 입력창'],
    titleKo: '스포트라이트 패스워드 피크',
    titleEn: 'Flashlight Beam Password Peek',
    summary: '우측 조명 토글을 켜면 원뿔형 손전등 빛줄기가 입력창을 비추며 마스킹된 비밀번호가 선명하게 나타남',
    promptSnippet:
      "지정한 비밀번호 표시 영역에 초기 ON인 손전등 토글을 구현해 줘. 빛줄기는 clip-path: polygon(100% 50%, 0% -18%, 0% 118%)와 origin-right를 사용해 0.3초 동안 scaleX(0)·opacity 0↔scaleX(1)·opacity 1로 전환해 줘. 샘플 문자열은 ON에서 실제 문자와 금색 광택, OFF에서 •로 표시하고 오른쪽 문자부터 18ms 간격의 지연과 0.2초 색상 전환을 줘. 이 데모는 문자열 표시 시연이며 실제 비밀번호 입력/저장/인증 처리는 포함하지 않아.",
  },

  /* =====================================================================
   * DOMAIN 2: 그래픽 (26종)
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
      "지정한 SVG 도형의 외곽선이 그려지는 Path Drawing을 구현해 줘. path마다 pathLength=\"1\"로 길이를 정규화하고 stroke-dasharray: 1, 초기 stroke-dashoffset: 1을 적용해, 실제 도형 길이와 관계없이 시작 시 외곽선 전체가 숨겨지게 해 줘. 고정된 실제 길이 320을 임의 도형에 재사용하지 말아 줘. stroke #818cf8, stroke-width 4, round cap/join을 사용해 줘. 2.4초 ease-in-out 무한 반복에서 0~65% 구간에는 내부 fill을 투명하게 유지하며 dashoffset을 1→0으로 줄여 외곽선을 그려 줘. 65~85% 구간에는 dashoffset을 0으로 유지하고 내부 fill을 투명→인디고 25%(rgba(99,102,241,0.25))로 채운 뒤, 85~100%에는 완성된 외곽선과 채움을 유지해 줘.",
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
      "지정한 그라데이션 도형에 5초 ease-in-out 무한 반복 Liquid Blob Morph를 적용해 줘. border-radius는 0/100%에 60% 40% 30% 70% / 60% 30% 70% 40%, 33%에 30% 60% 70% 40% / 50% 60% 30% 60%, 66%에 70% 30% 50% 50% / 30% 40% 70% 60%로 변형해 줘. 같은 시점에 rotate/scale을 (0deg,1)→(6deg,1.05)→(-6deg,0.97)→처음 값으로 이어 줘.",
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
      "지정한 두 원형 도형에 SVG Gooey 필터를 적용해 줘. feGaussianBlur stdDeviation=7, feColorMatrix의 알파 행은 0 0 0 18 -7로 두고 feBlend로 원본과 합성해 줘. 시안·인디고 원은 각각 translateX(-28px)↔18px, 28px↔-18px로 2.4초 ease-in-out 무한 반복해 가까워질 때 융합되고 멀어질 때 분리되게 해 줘. SVG 필터는 도형 그룹에만 적용하고 텍스트는 밖에 둬 줘.",
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
      "지정한 그래픽에 중앙의 고정된 금색 코어와 안팎 2개의 원형 궤도를 배치해 줘. 내부 점선 링은 시안 위성을 달고 0→360deg로 5초 linear 무한 공전하고, 외부 링은 분홍 위성을 달고 360→0deg로 3.5초 linear 무한 역회전하게 해 줘. 코어와 텍스트는 궤도 컨테이너의 회전에 포함하지 말아 줘.",
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
      "지정한 배경을 어두운 바탕과 blur-2xl을 적용한 인디고 60%·에메랄드 50%·푸시아 50% 원형 광원 3개로 구성해 줘. 인디고는 5초 ease-in-out 동안 translate(-20%,-15%) scale(1) rotate(0)↔translate(25%,20%) scale(1.25) rotate(25deg), 에메랄드는 6초 동안 translate(20%,15%) scale(1.1) rotate(0)↔translate(-25%,-15%) scale(0.9) rotate(-25deg)로 반복해 줘. 푸시아는 (-28px,-12px)↔(28px,14px), scale(1)↔1.15를 4초 반복해 줘. 광원은 잘라내는 배경 레이어로 두고 전경 글자를 흐리지 말아 줘. 데모에는 mix-blend-mode: screen이 없어.",
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
      "지정한 그래픽을 고정 SVG 노드 5개와 연결선 7개로 구성한 Particle Network로 구현해 줘. 좌표는 viewBox 0 0 100 100에서 (25,28),(65,22),(48,55),(82,65),(20,74), 연결은 0-1,0-2,1-2,1-3,2-3,2-4,0-4로 배치해 줘. 초기 세 번째 노드가 활성이고 노드 호버 시 해당 노드를, 영역 클릭 시 다음 노드를 순환 강조해 줘. 활성 노드 반지름은 4.5(나머지 3), 연결선 두께는 1.8(나머지 1)과 시안색으로 바꿔 줘. 데모에는 노드의 부유 이동이나 거리 기반 자동 연결은 없어.",
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
      "지정한 그래픽을 9열×4행의 실제 원형 도트 36개로 구성해 줘. 초기 활성 열은 다섯 번째이며 커서 x 위치를 추적 영역 너비로 정규화해 0~8열로 제한해 줘. 활성 열의 도트는 시안색·scale(1.8), 양옆 열은 인디고색·scale(1.35), 나머지는 어두운 색·scale(1)로 0.15초 전환해 줘. y 좌표 반경이 아닌 열 단위 반응이고, radial-gradient 배경 패턴으로 대체하지 말아 줘.",
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
      "지정한 어두운 배경의 상단에 conic-gradient(from 155deg at 50% 0%, transparent 0deg, rgba(56,189,248,0.35) 25deg, transparent 50deg) 빛기둥을 배치해 줘. blur-md와 pointer-events-none을 적용하고 4초 ease-in-out 무한 반복에서 rotate(-18deg) scaleX(1) opacity(0.55)↔rotate(-6deg) scaleX(1.25) opacity(0.85)로 흔들어 줘. 배경 밖으로 나가는 빔은 숨기고 별도 제목이나 설명 문구는 추가하지 말아 줘.",
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
      "지정한 원형 도형에 1.25초 무한 반복 Squash & Stretch를 적용해 줘. 0/100%는 translateY(-28px) scaleX(0.92) scaleY(1.08), 42%는 translateY(20px) scaleX(0.85) scaleY(1.18), 충돌 50%는 translateY(26px) scaleX(1.38) scaleY(0.62), 60%는 translateY(14px) scaleX(0.84) scaleY(1.18)로 연결해 줘. 하강 구간은 cubic-bezier(0.55,0.055,0.675,0.19), 충돌 뒤 도약은 cubic-bezier(0.215,0.61,0.355,1)로 표현해 줘. 실제 물리/부피 보존 계산이 아닌 키프레임 시연으로 구현해 줘.",
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
      "지정한 도형을 처음 표시할 때와 클릭 시 1.6초 cubic-bezier(0.22,1,0.36,1) 무한 반복하는 Anticipation으로 구현해 줘. 0% x=-45px에서 시작해 25% x=-68px scale(0.75,1.22) rotate(-8deg), 35% x=-72px scale(0.72,1.25) rotate(-10deg)로 웅크린 뒤, 55% x=65px scale(1.3,0.8) rotate(6deg)로 발사해 줘. 70% x=48px scale(0.92,1.06)을 거쳐 85~100% x=52px scale(1) rotate(0)에 안착하고, 클릭하면 주기를 재시작해 줘.",
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
      "지정한 그래픽에 선두 1개와 잔상 3개를 두고 translateX(-62px)↔62px로 왕복하는 Follow-Through Trail을 구현해 줘. 1.4초마다 방향을 자동 반전하며 클릭해도 즉시 반전되게 해 줘. 각 도형은 0.65초 cubic-bezier(0.34,1.56,0.64,1) 전환에 0/55/110/165ms 지연을 주고, 크기는 34/28/22/16px, opacity는 1/0.78/0.56/0.34로 줄여 선두가 가장 앞에 보이게 해 줘.",
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
      "지정한 영역에 Linear, Ease-Out, Spring의 속도 차이를 나란히 비교하는 3개 트랙을 구현해 줘. 각 점은 left: 8px↔calc(100% - 22px)로 0.9초 이동하며 곡선은 각각 linear, cubic-bezier(0.16,1,0.3,1), cubic-bezier(0.34,1.30,0.64,1)를 사용해 줘. 초기에는 오른쪽 상태로 두고 1.6초마다 방향을 자동 반전하며 클릭해도 토글해 줘.",
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
      "지정한 문자열을 글자 단위 span으로 나누고 공백은 줄지 않는 공백으로 유지하는 Kinetic Wave Text를 구현해 줘. 각 글자에 index * 75ms 지연을 주고 1.3초 ease-in-out 무한 반복에서 translateY(0) rotate(0)→translateY(-10px) rotate(-4deg)→원위치로 이어 줘. 파도 정점에서는 글자색을 #38bdf8로 바꿔 줘.",
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
      "지정한 문장의 키워드 창을 높이 28px·overflow-hidden으로 고정하고, 같은 높이의 단어 4개(MOTION/GRAPHICS/CINEMA/INTERACTION)를 세로로 쌓아 줘. 초기 첫 단어에서 1.4초마다 다음 단어로 순환하고 클릭해도 다음 단어로 넘어가게 해 줘. 트랙은 translateY(-index * 28px)와 0.45초 cubic-bezier(0.34,1.56,0.64,1)로 이동해 줘. 전체 트랙 높이에 대한 -100%를 사용하지 말고 한 행 높이를 기준으로 이동해 줘.",
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
      "지정한 네온 문구 중 강조할 부분에만 2.8초 무한 반복 Neon Flicker를 적용해 줘. 기본 text-shadow는 0 0 8px #f43f5e, 0 0 22px #f43f5e, 0 0 38px #e11d48이며 opacity는 1로 유지해 줘. 20%,24%,55% 지점에서만 opacity 0.25와 text-shadow: none으로 순간 꺼졌다가 인접 키프레임에서 복귀하게 해 줘. 나머지 문구와 프레임은 고정해 줘.",
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
      "지정한 3개 레이어를 마우스 기반 2.5D Parallax로 구현해 줘. 추적 영역 중심과 커서 차이를 먼저 6으로 나눈 (x,y)에 대해 배경은 0.4배, 중경은 1.1배, 전경은 2.1배의 translate를 적용하고 75ms transform 전환으로 따라가게 해 줘. 초기 위치는 모두 0이고 마우스 이탈 시 원위치로 초기화해 줘. 데모에는 스크롤 기반 이동은 없어.",
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
      "지정한 전경/배경 피사체 사이의 초점을 클릭할 때마다 토글하는 Rack Focus를 구현해 줘. 초기에는 전경에 초점을 맞추고 활성 피사체는 blur-0·scale(1.05)·opacity 1·z-index 10과 밝은 링/그림자, 비활성 피사체는 blur-xs·scale(0.9)·opacity 0.45·z-index 0으로 0.5초 전환해 줘. 실제 카메라 초점 계산이 아닌 두 UI 레이어의 필터 전환으로 구현해 줘.",
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
      "지정한 장면을 overflow-hidden 프레임 안에 넣고 6초 ease-in-out 무한 반복 Ken Burns를 적용해 줘. 0/100%는 scale(1) translate(0,0), 50%는 scale(1.28) translate(-12px,-6px)로 줌인·패닝한 뒤 다시 돌아오게 해 줘. 뷰파인더 테두리와 REC 표시는 별도 고정 레이어로 두고 장면과 함께 확대하지 말아 줘.",
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
      "지정한 그래픽의 3개 레이어 각각에 rotateX(55deg) rotateZ(-35deg)를 적용하고 부모에는 perspective: 1000px와 preserve-3d를 줘. 초기에는 펼친 상태이며, 마우스 진입 시 펼치기·이탈 시 접기·클릭 시 토글해 줘. 레이어 index i의 화면상 Y 간격을 펼쳤을 때 (1 - i) * 18px, 접었을 때 (1 - i) * 5px로 바꾸고 0.45초 cubic-bezier(0.34,1.56,0.64,1)로 전환해 줘. 데모는 translateY 층 분리이며 translateZ 이동은 없어.",
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
      "지정한 두 장면을 겹치고 초기에는 상위 SCENE #1이 보이게 해 줘. 클릭할 때마다 상위 레이어의 clip-path를 circle(120% at 50% 50%)↔circle(0% at 50% 50%)로 0.65초 cubic-bezier(0.65,0,0.35,1) 전환해 아래 SCENE #2를 드러내거나 가려 줘. 자동 장면 전환이 아닌 클릭 토글로 구현해 줘.",
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
      "지정한 텍스트에 2.2초 무한 반복 RGB Glitch를 구현해 줘. 평상시에는 -2px 0 #ff0055와 2px 0 #00e5ff 이중 text-shadow를 주고, 주기의 84%까지는 위치를 유지해 줘. 86%에 translate(-4px,1px) skewX(-8deg), 89%에 translate(4px,-1px) skewX(8deg), 92%에 translate(-2px,0) skewX(0)으로 짧게 흔든 뒤 원위치로 복귀해 줘. 이 구간에서 적색·시안 그림자 오프셋도 3~5px로 변형해 줘.",
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
      "지정한 배경에 높이 2px의 수평 스트리크 4개를 top 20/38/58/78%, 너비 80/112/64/96px로 배치해 줘. 투명→시안→흰색 그라데이션을 사용하고 각 지연은 0/220/110/360ms로 줘. 각 선은 같은 0.75초 linear 주기로 translateX(-120%) scaleX(0.4)→translateX(240%) scaleX(1.5), opacity 0→0.9(30%)→0을 무한 반복해 줘. 영역 밖의 선은 숨기고 전경 라벨은 고정해 줘.",
  },
  {
    id: 'mg-radar-sonar-sweep',
    domain: 'motion',
    category: 'shader',
    vibeTag: '잠수함 레이더처럼 회전하는 스캔 광선이 타겟 점들을 차례로 포착하는',
    vibeKeywords: ['소나 레이더 스캔', '레이더 스윕', '타겟 탐지', '원형 스캐너', '보안 스캔 그래픽'],
    titleKo: '소나 레이더 스윕 스캐너',
    titleEn: 'Sonar Radar Sweep Scanner',
    summary: '360도 회전하는 원뿔형(conic-gradient) 레이더 빔이 동심원 격자 위의 타겟 블립을 점등시키는 그래픽',
    promptSnippet:
      "지정한 레이더에 동심원·십자선과 conic-gradient(from 0deg, transparent 70%, rgba(16,185,129,0.55) 100%) 스캔 빔을 배치해 줘. 초기 각도 0에서 40ms마다 6deg씩 회전하고 클릭하면 10deg/40ms의 빠른 모드와 기본 모드를 토글해 줘. 고정 타겟 3개의 기준 각도는 45/135/220deg이고 (현재 각도 - 타겟 각도 + 360) % 360 < 105일 때 밝은 에메랄드·scale(1.25)로, 그 외에는 옅은 색·scale(0.75)로 0.15초 전환해 줘. 실제 데이터 탐지가 아닌 고정 타겟 시연이야.",
  },
  {
    id: 'mg-morphing-grid-wave',
    domain: 'motion',
    category: 'graphic',
    vibeTag: '바둑판 타일들이 대각선 파도를 타듯 차례대로 솟아올랐다 가라앉는',
    vibeKeywords: ['대각선 타일 파도', '그리드 웨이브', '타일 리플', '스태거드 매트릭스', '입체 타일 물결'],
    titleKo: '스태거드 그리드 타일 웨이브',
    titleEn: 'Staggered Grid Tile Wave',
    summary: '행+열 좌표 합(`row + col`)에 비례한 딜레이로 타일들이 대각선 물결처럼 크기와 색상이 변하는 모션',
    promptSnippet:
      "지정한 타일 영역을 3행×6열로 만들고 row + col 대각선 값을 기준으로 움직이는 Grid Wave를 구현해 줘. tick을 초기 0에서 260ms마다 (tick + 1) % 8로 갱신하고 클릭해도 한 단계 진행해 줘. 대각선 값이 tick 또는 (tick + 1) % 8인 타일은 시안-인디고 그라데이션·scale(1.1)·translateY(-4px)·발광, 나머지는 scale(0.9)·opacity 0.6으로 0.3초 전환해 줘. 데모는 상태 기반 두 대각선 파도이며 90ms animation-delay 방식은 아니야.",
  },
  {
    id: 'mg-prism-rainbow-refraction',
    domain: 'motion',
    category: 'vfx',
    vibeTag: '한 줄기 하얀 빛이 유리 삼각 프리즘을 통과하며 무지개 스펙트럼으로 퍼지는',
    vibeKeywords: ['프리즘 무지개 굴절', '빛 분산 스펙트럼', '삼각 프리즘 광선', '광학 굴절', '스펙트럼 빔'],
    titleKo: '프리즘 광선 분산 효과',
    titleEn: 'Optical Prism Light Dispersion',
    summary: '좌측 백색 입사광이 중앙 유리 프리즘에 닿아 우측으로 6색 무지개 스펙트럼 빔으로 굴절·확산되는 VFX',
    promptSnippet:
      "지정한 그래픽을 SVG viewBox 0 0 220 92의 삼각 유리 프리즘과 백색 입사선, 6색 출사선으로 구성해 줘. 프리즘은 반투명 선형 그라데이션 polygon이고 입사선은 (8,62)→(92,46), 출사선은 x=127에서 x=212로 향하며 기본 끝점 y는 18/30/42/54/66/78이야. 초기에는 넓은 분산이며 클릭하면 끝점 y를 48 + (기본 y - 48) * 0.45로 모았다가 다시 펼치도록 0.5초 전환해 줘. 각 출사선에 색상별 5px drop-shadow를 주고, 실제 광학 계산이나 backdrop blur가 아닌 고정 SVG 광선 시연으로 구현해 줘.",
  },
  {
    id: 'mg-gravity-newton-cradle',
    domain: 'motion',
    category: 'physics',
    vibeTag: '매달린 쇠구슬 중 양끝 구슬만 교대로 부딪히며 운동량을 전달하는',
    vibeKeywords: ['뉴턴의 진자 구슬', '뉴턴의 요람', '진자 운동 물리', '탄성 충돌 구슬', '모멘텀 진자'],
    titleKo: '뉴턴의 요람 물리 진자',
    titleEn: "Newton's Cradle Momentum Pendulum",
    summary: '중앙 구슬들은 정지한 채 좌측 끝 구슬과 우측 끝 구슬이 교대로 부딪히며 튀어 오르는 물리 진자 모션',
    promptSnippet:
      "지정한 그래픽에 상단 지지대와 구슬 5개를 매달고 transform-origin: top center인 Newton's Cradle 시연을 구현해 줘. 초기 왼쪽 끝 구슬만 +34deg로 기울이고 320ms마다 [왼쪽 +34deg→모두 0deg→오른쪽 -34deg→모두 0deg]의 4단계를 순환해 줘. 중앙 3개는 고정하고 클릭해도 한 단계 진행해 줘. 회전은 0.3초, 바깥쪽 스윙은 cubic-bezier(0.215,0.61,0.355,1), 복귀는 cubic-bezier(0.55,0.055,0.675,0.19)를 사용해 줘. 실제 물리 시뮬레이션이 아닌 상태 기반 시연이야.",
  },

  /* =====================================================================
   * DOMAIN 3: 레이아웃 (20종)
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
      "지정한 콘텐츠 영역을 4열×2행 CSS Grid의 Bento 구성으로 만들어 줘. 메인 타일은 col-span-2 row-span-2, 오른쪽 위 타일은 col-span-2 row-span-1, 오른쪽 아래에는 1×1 타일 2개를 배치하고 간격은 데모 기준 6px로 맞춰 줘. 초기에는 메인 타일만 강조하고 타일 클릭 시 해당 타일 하나만 색상·테두리로 활성화해 줘. 데모에 없는 auto-rows: 140px를 강제하지 말고 지정한 영역 안에서 이 비율을 유지해 줘.",
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
      "지정한 영역을 3열 Grid로 나누고 각 열에 높이가 다른 카드 2개씩을 수직으로 쌓아 Waterfall 모양을 재현해 줘. 데모의 초기 카드 높이는 열별 [48,28], [28,48], [44,36]px이고 클릭하면 [32,48], [48,32], [40,44]px로 0.3초 전환해 줘. 열·카드 사이 간격은 6px이며, CSS columns나 자동 빈칸 채우기 알고리즘이 아닌 3개의 고정 열 시연으로 구현해 줘.",
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
      "지정한 영역에 큰 그라데이션 비주얼과 그 오른쪽 아래에 겹치는 작은 편집 정보 카드를 배치하는 Editorial Overlap을 구현해 줘. 초기에는 두 레이어를 겹쳐 두고 호버 시 비주얼은 translateX(-8px) scale(1.05), 정보 카드는 translate(4px,-4px)로 0.3초 벌어지게 해 줘. 마우스 이탈 시 원위치, 클릭 시 겹침/벌림을 토글해 줘. 데모는 7:5의 12컬럼 기사 목록이 아닌 2개 레이어 겹침 시연이야.",
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
      "지정한 아이콘 타일을 SVG 육각형 5개로 만들고 위 3개·아래 2개를 가운데 정렬해 벌집 형태로 맞물리게 해 줘. 데모 기준 셀은 48×56px, 셀 간격 8px, 아래 행은 margin-top: -14px이며 별도의 translateX(24px)는 사용하지 않아. 초기 세 번째 셀을 활성화하고 클릭·Enter·Space로 선택을 바꾸게 해 줘. 선택 셀은 금색·scale(1.1), 비선택 호버는 scale(1.05), 전환은 0.2초로 맞춰 줘.",
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
      "지정한 2단 쇼케이스에서 왼쪽 비주얼은 같은 위치에 두고 오른쪽 Step 01~03 목록 중 현재 단계 하나를 강조하는 Sticky Split 시연을 구현해 줘. 초기 단계는 1이고 영역 클릭마다 1→2→3→1로 순환하며, 왼쪽 비주얼의 색과 단계 텍스트 및 오른쪽 강조 항목을 함께 0.3초 전환해 줘. 데모는 클릭 기반 상태 전환이며 실제 position: sticky나 스크롤 감지 기능은 없어.",
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
      "지정한 프레임 안에 같은 높이의 3개 섹션을 세로로 쌓고 첫 섹션에서 시작하는 Fullpage Snap 시연을 구현해 줘. 클릭마다 다음 섹션으로 순환하고 트랙을 translateY(-page * 섹션 높이)로 0.5초 ease-out 이동해 줘. 데모 섹션 높이는 96px이며 활성 페이지 점 표시를 함께 갱신해 줘. 실제 휠 스크롤·h-screen·CSS scroll-snap은 데모에 없으므로 클릭 슬라이드와 구분해 줘.",
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
      "지정한 쇼케이스 프레임 안에 카드 4개를 가로로 배치하고 첫 카드에서 시작해 클릭마다 다음 카드로 순환해 줘. 데모 기준 카드 너비 96px·간격 8px, 트랙 이동은 translateX(-index * 76px)를 0.5초 ease-out으로 적용해 줘. 활성 카드는 인디고색·scale(1.02)로 0.3초 강조하고 하단에는 활성 점과 현재 번호/4를 표시해 줘. 실제 가로 스크롤·드래그·scroll-snap 대신 클릭으로 트랙을 이동하는 시연이야.",
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
      "지정한 프레임 아래층에는 푸터 내용을 고정하고 위층의 본문 커튼을 absolute inset-0로 덮어 줘. 초기에는 닫힌 상태이며 클릭할 때마다 커튼을 translateY(0)↔-48px로 0.5초 이동시켜 아래 푸터를 드러내는 Curtain Reveal 시연을 구현해 줘. 프레임 밖은 숨기고 푸터 자체는 이동하지 않게 해 줘. 데모에는 브라우저 fixed 푸터, 스크롤 끝 감지나 300px 본문 여백은 없어.",
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
      "지정한 Dock 바에 아이콘 5개를 배치하고 초기에는 가운데 세 번째 아이콘을 강조해 줘. 아이콘 호버/클릭 시 거리 |활성 index - i|가 0이면 scale(1.45) translateY(-4px), 1이면 scale(1.18), 그 외에는 scale(1)로 0.15초 전환하고 origin-bottom으로 확대해 줘. 추적 영역에서 마우스가 나가면 가운데 아이콘 강조로 복귀해 줘. 아이콘 클릭은 선택 시연이며 실제 페이지 이동은 없어.",
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
      "지정한 영역에 검색창처럼 보이는 상단 라벨과 ⌘K 배지, 액션 목록 3개를 가진 Command Palette 모양 패널을 구현해 줘. 패널은 처음부터 표시하며 초기 첫 행을 선택하고, 행 클릭 시 해당 행만 인디고색으로 강조하고 ↵ 표시를 붙여 줘. 데모에는 실제 검색 input·자동 포커스·Cmd/Ctrl+K 키 핸들러·모달 열기/닫기·명령 실행이 없으므로 시각적 선택 패널과 구분해 줘.",
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
      "지정한 캡슐형 상태 바를 초기 접힌 상태에서 클릭으로 확장/축소하는 Dynamic Island 시연으로 구현해 줘. 데모 기준 접힘은 128×36px·rounded-full, 확장은 224×80px·rounded-3xl이고 크기·모서리는 0.3초 전환해 줘. 접힘에는 Island 라벨과 점멸 상태 점을, 확장에는 Now Playing 라벨과 트랙명/LIVE 정보를 추가해 줘. 라이트 모드의 흰 배경과 다크 모드의 검은 배경을 구분하고 실제 음악 재생이나 화면 상단 고정 동작은 추가하지 말아 줘.",
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
      "지정한 파이 메뉴를 초기 열린 상태로 두고 중앙 버튼 또는 하위 버튼 클릭 시 열기/닫기를 토글해 줘. 하위 버튼 4개의 열린 좌표는 (-38,-28),(38,-28),(38,28),(-38,28)px, 닫힘은 translate(0,0) scale(0.2)·opacity 0으로 설정해 줘. 열 때 0/35/70/105ms 지연과 0.3초 cubic-bezier(0.34,1.56,0.64,1)를 적용하고 닫을 때는 지연을 없애 줘. 중앙 +는 45deg 회전해 ×가 되게 하고 하위 버튼은 별도 명령 실행이 없는 토글 시연으로 구현해 줘.",
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
      "지정한 프레임 하단에 둥근 상단 모서리의 Bottom Sheet를 배치해 줘. 초기 HALF 높이 56px에서 영역 클릭마다 FULL 96px와 번갈아 0.3초 전환하고, FULL일 때만 상세 문구를 추가해 줘. 상단 중앙 핸들은 데모 기준 32×4px로 표시해 줘. 이 데모는 클릭 기반 2단계 시연이며 실제 드래그 제스처·Peek 단계·브라우저 하단 fixed 동작은 없어.",
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
      "지정한 Master-Detail 영역을 5열 Grid의 좌측 2열(40%)·우측 3열(60%)로 구성해 줘. 좌측에는 항목 3개, 우측에는 선택된 항목의 제목과 설명을 표시하고 초기 첫 항목에서 시작해 줘. 좌측 버튼 클릭 시 해당 행을 강조하고 우측 내용을 새로고침 없이 교체해 줘. 데모에는 목록 스크롤이나 원격 데이터 요청은 없어.",
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
      "지정한 칸반 시연을 TODO/DOING/DONE의 동일 너비 3개 컬럼과 태스크 카드 1개로 구성해 줘. 초기 카드는 DOING에 두고 영역 클릭마다 DONE→TODO→DOING으로 순환 이동시켜 줘. 카드가 없는 컬럼은 점선 자리표시자로 표시하고 새 컬럼의 카드는 0.48초 Spring Pop으로 나타나게 해 줘. 실제 드래그 앤 드롭·카드 개수 배지·서버 상태 저장은 데모에 없어.",
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
      "지정한 Contribution Heatmap을 10열×4행, 12px 정사각형 셀 40개와 간격 4px로 구성해 줘. 셀 모서리는 3px이고 값은 (index * 7 + seed * 3) % 5로 계산해 회색→짙은 에메랄드→밝은 에메랄드의 5단계 농도로 표현해 줘. 초기 seed는 1이며 영역 클릭마다 1씩 늘려 패턴을 바꿔 줘. 실제 기여도 데이터나 7행 달력 구조가 아닌 패턴 시연이야.",
  },
  {
    id: 'ly-floating-toc-spy',
    domain: 'layout',
    category: 'scroll',
    vibeTag: '본문을 읽어나가면 우측 미니 목차 바의 활성 인디케이터가 따라 내려오는',
    vibeKeywords: ['스크롤 연동 목차 바', '스크롤스파이 TOC', '문서 목차 네비게이션', '플로팅 목차', '현재 섹션 표시'],
    titleKo: '스크롤스파이 플로팅 목차 (TOC Spy)',
    titleEn: 'Scrollspy Floating Table of Contents',
    summary: '본문 스크롤 위치(IntersectionObserver)에 연동해 우측 목차 트랙의 활성 마커가 이동하고 클릭 시 해당 섹션으로 점프',
    promptSnippet:
      "지정한 문서 프레임 왼쪽에는 3개 섹션, 오른쪽에는 행 높이 22px의 목차를 배치해 줘. 초기 첫 섹션에서 1.8초마다 다음 섹션으로 순환하고 목차 버튼 클릭 시 해당 섹션으로 바꿔 줘. 본문 트랙은 translateY(-activeSection * 100%)를 0.5초 ease-out으로, 목차 인디케이터는 translateY(activeSection * 22px)를 0.3초로 이동해 줘. 데모는 자동/클릭 상태 시연이며 sticky 위치 고정·실제 스크롤·IntersectionObserver 감지는 없어.",
  },
  {
    id: 'ly-collapsible-rail-sidebar',
    domain: 'layout',
    category: 'nav',
    vibeTag: '평소엔 좁은 아이콘 기둥이었다가 토글하면 텍스트 라벨까지 넓게 펼쳐지는',
    vibeKeywords: ['아이콘 레일 사이드바', '접이식 사이드바', '미니 레일 메뉴', '사이드바 축소 확장', '대시보드 LNB'],
    titleKo: '접이식 미니 레일 사이드바',
    titleEn: 'Collapsible Icon-Rail Sidebar',
    summary: '아이콘만 보이는 56px 슬림 레일 모드와 메뉴명이 함께 보이는 220px 확장 모드를 즉시 전환하는 대시보드 네비게이션',
    promptSnippet:
      "지정한 사이드바와 본문 영역을 Flex로 구성하고 초기 확장·첫 메뉴 선택 상태로 시작해 줘. 하단 축소 버튼 클릭 시 사이드바 실제 너비를 112px(w-28)↔36px(w-9)로 0.3초 전환하고, 축소 시 텍스트 라벨만 숨기고 아이콘은 유지해 줘. 메뉴 3개 중 하나를 클릭하면 선택 강조와 본문 제목을 함께 바꿔 줘. 데모의 220px/56px 배지는 실제 CSS 너비와 다른 표시값이며, 호버 툴팁이나 실제 라우팅은 구현돼 있지 않아.",
  },
  {
    id: 'ly-breadcrumb-folder-drill',
    domain: 'layout',
    category: 'nav',
    vibeTag: '상단 경로 바를 눌러 상위·하위 폴더 계층을 즉시 오가는 탐색기 구조',
    vibeKeywords: ['계층형 폴더 브레드크럼', '드릴다운 탐색기', '경로 네비게이션', '파일 트리 이동', '상위 폴더 이동'],
    titleKo: '드릴다운 브레드크럼 파인더',
    titleEn: 'Drill-Down Breadcrumb Explorer',
    summary: '하위 폴더로 들어갈 때마다 상단 경로 체인(`Root / src / ui`)이 쌓이고 중간 경로를 클릭하면 즉시 해당 계층으로 복귀',
    promptSnippet:
      "지정한 파일 탐색 시연을 경로 바와 3열 항목 그리드로 구성해 줘. 초기 경로는 root/src/ui, 선택 파일은 Button.tsx로 두고 정해진 샘플 폴더 맵을 사용해 줘. 폴더 클릭 시 경로 끝에 폴더명을 추가하고, 경로 세그먼트 클릭 시 그 지점까지 잘라 상위 폴더로 복귀하며, 파일 클릭 시 선택 이름/강조만 갱신해 줘. 폴더 이동 후에도 선택 파일명은 유지하고 실제 파일 열기·파일시스템 접근은 없는 로컬 상태 시연으로 구현해 줘.",
  },
  {
    id: 'ly-resizable-split-pane',
    domain: 'layout',
    category: 'panel',
    vibeTag: '코드 에디터처럼 중앙 구분선을 잡고 좌우 화면 비율을 자유롭게 조절하는',
    vibeKeywords: ['비율 조절 분할 패널', '리사이저블 스플릿', '구분선 드래그', 'IDE 분할 창', '가변 2단 레이아웃'],
    titleKo: '리사이저블 스플릿 패인',
    titleEn: 'Resizable Dual Split Pane',
    summary: '좌우 두 패널 사이의 중앙 가터(Gutter) 핸들을 드래그하거나 프리셋으로 너비 비율(25:75 ~ 75:25)을 즉시 조절',
    promptSnippet:
      "지정한 좌우 패널 사이에 너비 8px의 리사이즈 핸들을 배치하고 초기 좌측 비율을 45%로 설정해 줘. 핸들의 pointerdown 이후 프레임 내부 pointermove에서 (clientX - rect.left) / rect.width * 100을 반올림한 뒤 25~75%로 제한해 좌측 width를 갱신하고 우측은 남은 공간을 채우게 해 줘. pointerup/leave 시 드래그를 종료해 줘. 핸들 클릭은 현재 45이면 65, 65이면 30, 그 외에는 45%로 바꾸는 프리셋으로 구현해 줘.",
  },

  /* =====================================================================
   * DOMAIN 4: 스타일 (20종)
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
      "지정한 버튼에 황금색 바탕·분홍색 표면·3px 검은 테두리의 Neo-Brutalism 스타일을 적용해 줘. 기본 그림자는 5px 5px 0 #000이며 클릭으로 눌림을 토글하면 translate(4px,4px)와 1px 1px 0 #000 그림자로 0.1초 전환해 줘. 재클릭 시 원래 위치/그림자로 복귀하고, 다른 화면의 모든 카드까지 자동으로 변경하지 말아 줘.",
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
      "지정한 카드에 위쪽 흰색 20%→아래쪽 흰색 5%의 그라데이션, backdrop-blur-xl, 흰색 30% 테두리와 깊은 그림자를 조합하는 Liquid Acrylic 스타일을 적용해 줘. 뒤의 푸시아·시안 원형 광원은 각각 70% 불투명도·blur-xl로 흐리게 하고 5초/6초의 서로 다른 오로라 궤적으로 움직여 줘. 카드 글자는 선명하게 유지해 줘. 데모는 반투명 레이어/blur 표현이며 별도 inset 하이라이트나 실제 광학 굴절 계산은 없어.",
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
      "지정한 카드와 그 배경에 Linear Dark Minimal을 적용해 줘. 배경은 #090A0F, 카드 표면은 #12131A와 흰색 10% 테두리로 두고, 상단 중앙에 좌우가 투명·중앙은 인디고 80%인 1px 가로 헤어라인을 배치해 줘. 헤드라인은 흰색→slate-400 그라데이션 텍스트로 표현해 줘. 움직임 없이 절제된 정적 카드이며 입력한 적용 대상 밖의 테마는 바꾸지 말아 줘.",
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
      "지정한 어두운 stone 톤 배경에 radial-gradient(rgba(255,255,255,0.14) 1px, transparent 0), background-size: 6px 6px의 점 패턴을 opacity 0.6으로 덮는 Matte Film Grain 느낌을 구현해 줘. 패턴은 pointer-events-none으로 입력을 가로막지 않게 하고 전경 카드/글자는 별도 레이어로 선명하게 유지해 줘. 데모는 고정된 반복 도트이며 SVG feTurbulence나 움직이는 랜덤 노이즈는 사용하지 않아.",
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
      "지정한 버튼과 배경을 같은 slate-800 톤으로 맞추고 Neumorphism 양각/음각을 클릭으로 토글해 줘. 초기 양각은 box-shadow: 6px 6px 12px #0f172a, -6px -6px 12px #334155, 음각은 inset 5px 5px 10px #0f172a, inset -5px -5px 10px #334155를 적용해 줘. 둥근 모서리와 밝은 글자를 유지하고 누르는 동안만이 아니라 클릭 상태로 유지되게 해 줘.",
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
      "지정한 카드에 인디고색 표면과 24px 둥근 모서리의 Claymorphism 스타일을 적용해 줘. 그림자는 0 12px 20px rgba(0,0,0,0.45), inset -6px -6px 12px rgba(79,70,229,0.7), inset 6px 6px 12px rgba(255,255,255,0.45)를 결합해 줘. 기본 호버에서는 scale(1.05), 클릭으로 눌림 상태를 토글하면 scale(0.95), 재클릭하면 기본 상태로 복귀해 줘.",
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
      "지정한 하드웨어형 버튼에 slate-700→slate-900의 세로 그라데이션과 얇은 테두리를 적용해 줘. 초기 ON은 translateY(2px), inset 0 2px 5px rgba(0,0,0,0.8)와 0 1px 0 rgba(255,255,255,0.15) 그림자, 녹색 LED를 표시해 줘. 클릭해 OFF가 되면 원위치, 0 6px 10px rgba(0,0,0,0.7)와 inset 0 1px 1px rgba(255,255,255,0.35) 그림자, 회색 LED로 전환해 줘. 5px 하단 턱이나 :active 순간 눌림이 아닌 클릭 ON/OFF 시연이야.",
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
      "지정한 카드에 3겹의 Paper Cutout 레이어를 적용해 줘. 뒤의 금색 종이는 -4deg, 중간의 장미색 종이는 3deg 회전하고 각각 shadow-md를 줘. 앞의 어두운 카드는 회전 없이 정면에 유지하고 2px 흰색 80% 테두리·shadow-lg를 적용해 줘. 각 레이어의 크기는 동일하게 겹치고, 데모처럼 별도 애니메이션이나 클릭 동작 없이 정적으로 표현해 줘.",
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
      "지정한 버튼에 둥근 모서리 없는 8비트 픽셀 느낌을 적용해 줘. 어두운 바탕 위 에메랄드 버튼, 2px 흰 테두리, 4px 4px 0 #1e1b4b의 단일 하드 그림자와 고정폭 굵은 글자를 사용해 줘. 코인 숫자는 99로 시작해 클릭마다 1 증가하고, 누르는 동안만 translateY(2px)로 내려가게 해 줘. 데모에는 4방향 계단식 다중 테두리나 실제 결제 기능은 없어.",
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
      "지정한 창 UI를 #008080 배경 위 #c0c0c0 실버 패널로 구성하고, 위·왼쪽은 2px 흰색/오른쪽·아래는 2px 검은색 Bevel 테두리를 적용해 줘. 상단 타이틀 바는 #000080과 흰 글자, 우측에는 회색 × 표시 하나를 배치해 줘. 데모는 정적인 Win95 창 외형이며 최소화/최대화 버튼이나 실제 닫기 동작은 없어.",
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
      "지정한 터미널 그래픽의 배경을 #041208로 두고 repeating-linear-gradient(0deg, rgba(0,0,0,0.38) 0px, rgba(0,0,0,0.38) 1px, transparent 1px, transparent 3px) 스캔라인을 입력을 가로막지 않는 오버레이로 덮어 줘. 주요 고정폭 문구에는 에메랄드색과 drop-shadow(0 0 8px rgba(52,211,153,0.8))를 적용해 줘. 별도 보조 라벨은 추가하지 말아 줘. 데모는 정적 CRT 표현이며 실제 터미널 입력이나 점멸 애니메이션은 없어.",
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
      "지정한 그래픽에 #1a052e→#3b0764→#be185d의 세로 황혼 배경과 금색→장미색 원형 태양을 배치해 줘. 하단 격자는 분홍색 40%의 가로/세로 1px 선, background-size: 16px 10px와 perspective(120px) rotateX(55deg)로 표현해 줘. 태양에는 20px 장미색 발광을 주되 줄무늬나 이동은 추가하지 말고 정적 Synthwave 씬으로 구현해 줘.",
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
      "지정한 HUD 프레임의 clip-path를 polygon(12px 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%,0 12px)로 주어 좌상단·우하단을 12px 잘라 줘. 같은 모양의 외곽 시안색 레이어에 1.5px 패딩을 두고 내부를 어두운 반투명 표면으로 채워 얇은 윤곽선을 만들어 줘. 고정폭 상태 코드와 펄스 ONLINE 점을 배치하되 데모에 없는 4개 코너 브래킷은 추가하지 말아 줘.",
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
      "지정한 도면 그래픽에 #0a2540 배경과 rgba(56,189,248,0.18)의 1px 가로·세로 모눈을 background-size: 14px 14px로 적용해 줘. 중앙에는 옅은 하늘색 점선 테두리와 고정폭 흰색 문구를 배치하고, 상단 테두리에 배경색을 깐 치수 라벨을 걸쳐 표시해 줘. 데모의 240px × 96px 문구는 장식 라벨이며 실제 크기 측정값은 아니고, 코너 십자선/실제 CAD 기능은 없어.",
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
      "지정한 편집 카드에 둥근 모서리 없는 Swiss Grid 스타일을 적용해 줘. 밝은 stone 배경 위 3열 Grid에서 왼쪽 1열은 빨간색과 흰 글자·굵은 01 번호, 오른쪽 2열은 검은 고정폭 보조 라벨과 굵은 헤드라인을 배치해 줘. 외곽과 세로 구분선은 2px 검은색으로 노출하고, 데모처럼 별도 동작 없는 정적 1:2 레이아웃으로 구현해 줘.",
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
      "지정한 그래픽의 금색 배경에 radial-gradient(#f43f5e 1.5px, transparent 1.5px), background-size: 8px 8px의 장미색 도트를 깔아 줘. 전경의 흰 말풍선 카드에는 3px 검은 테두리와 5px 5px 0 #000 그림자를 주고, 초기 rotate(-3deg)에서 클릭하면 rotate(3deg) scale(1.1)로 토글하며 BAM→POW 문구를 바꿔 줘. skewX 왜곡이나 검은 망점 대신 데모의 회전·유색 도트를 사용해 줘.",
  },
  {
    id: 'st-holographic-foil-card',
    domain: 'style',
    category: 'modern',
    vibeTag: '보는 각도에 따라 무지개빛 프리즘 홀로그램 광택이 일렁이는 포토카드 풍',
    vibeKeywords: ['홀로그램 포토카드 광택', '이리데슨트 포일', '무지개 빛 반사', '프리즘 카드', '레어 카드 효과'],
    titleKo: '홀로그래픽 포일 이리데슨트',
    titleEn: 'Holographic Foil Iridescent Style',
    summary: '다중 각도 무지개 그라데이션(`linear-gradient(125deg, #ff0080, #7928ca, #00e5ff, #00ff88)`)과 대각선 쉬머가 결합된 광택 화풍',
    promptSnippet:
      "지정한 카드에 #ff0080→#7928ca→#00e5ff→#00ff88→#fde047의 다중 스펙트럼 외곽 그라데이션과 같은 각도의 반투명 내부 그라데이션을 겹쳐 줘. 초기 각도는 125deg이고 마우스 x 위치 비율 pct에 따라 round(90 + pct * 140)deg로 갱신하며, 클릭하면 (현재 각도 + 45) % 360으로 바꿔 줘. 얇은 그라데이션 테두리·backdrop-blur-md·시안 그림자를 유지하고 이탈 시 각도를 초기화하지 말아 줘. 데모에는 color-dodge나 250% 배경 확대는 없어.",
  },
  {
    id: 'st-receipt-thermal-mono',
    domain: 'style',
    category: 'retro',
    vibeTag: '하얀 감열지 영수증에 지그재그 절취선과 점선 구분선·바코드가 찍힌',
    vibeKeywords: ['감열지 영수증 티켓', '모노스페이스 영수증', '바코드 티켓', '절취선 종이', '아날로그 영수증 UI'],
    titleKo: '서멀 영수증 & 바코드 티켓',
    titleEn: 'Thermal Receipt & Barcode Ticket',
    summary: '크림 화이트 지류 배경, 상하단 톱니 절취선, 고정폭(`monospace`) 영수증 내역과 하단 바코드를 결합한 편집 화풍',
    promptSnippet:
      "지정한 영수증 카드에 #faf8f5 감열지 배경, 어두운 고정폭 글자, 상하단 2px 점선과 항목별 점선 구분을 적용해 줘. 바코드는 높이 14px의 막대 18개를 1.5px 간격으로 배치하고 각 너비를 데모 배열 [2,1,3,1,2,1,4,1,2,2,1,3,1,2,1,3,2,1] * 1.5px로 표현해 줘. 초기 빨간 PAID ✓ 도장은 -6deg이며 클릭하면 회색 RECEIPT/원각도로 토글해 줘. 지그재그 절취선이나 실제 결제 상태를 의미하지 않는 시연이야.",
  },
  {
    id: 'st-vaporwave-y2k-chrome',
    domain: 'style',
    category: 'retro',
    vibeTag: '2000년대 초반 메탈릭 은빛 크롬 배지와 캔디 핑크·하늘색이 섞인 Y2K 감성',
    vibeKeywords: ['Y2K 파스텔 크롬', '2000년대 하이틴', '메탈릭 실버', '버블검 핑크', '사이버 Y2K 윈도우'],
    titleKo: 'Y2K 애시드 크롬 & 파스텔 윈도우',
    titleEn: 'Y2K Metallic Chrome & Pastel UI',
    summary: '광택 나는 리퀴드 실버 크롬 그라데이션과 핫핑크·베이비블루 그라데이션 창, 반짝이 별(✦) 장식이 어우러진 2000년대 화풍',
    promptSnippet:
      "지정한 윈도우 카드에 분홍→푸시아→하늘색 파스텔 배경과 흰 테두리를 적용해 줘. 상단 크롬 바는 linear-gradient(180deg,#ffffff 0%,#cbd5e1 48%,#64748b 52%,#f1f5f9 100%), 작은 크롬 배지는 #f8fafc→#94a3b8(50%)→#e2e8f0로 표현해 줘. 별/하트 장식을 넣고 초기 ★ PLAY 배지를 클릭 시 ☆ CUE와 토글해 줘. 실제 오디오 재생이나 OS 창 실행은 없는 외형 시연이야.",
  },
  {
    id: 'st-cyberpunk-neon-glitch',
    domain: 'style',
    category: 'scifi',
    vibeTag: '강렬한 애시드 옐로우 패널에 블랙·시안 경고 띠와 네온 글리치가 박힌',
    vibeKeywords: ['사이버펑크 나이트시티', '애시드 옐로우 HUD', '네온 경고문', '미래 도시 전광판', '하이테크 펑크'],
    titleKo: '사이버펑크 하이볼티지 네온',
    titleEn: 'Cyberpunk High-Voltage Neon UI',
    summary: '고채도 사이버 옐로우(`#facc15`)와 딥 블랙 대비, 대각선 해저드 스트라이프, 일렉트릭 시안(`#00f0ff`) 액센트를 결합한 화풍',
    promptSnippet:
      "지정한 카드에 #facc15 애시드 옐로우 표면·어두운 글자와 왼쪽 4px 시안 테두리, 우상단·좌하단 12px 컷아웃을 적용해 줘. 위에는 검은 표면의 #00f0ff 상태 태그를 두고 하단에는 repeating-linear-gradient(-45deg,#09090b 0px,#09090b 5px,#facc15 5px,#facc15 10px) 경고 띠를 넣어 줘. 초기 NEON OVERDRIVE 문구에서 클릭마다 BREACH PROTOCOL과 토글해 줘. 데모에 별도 글리치 애니메이션이나 실제 시스템 경고 동작은 없어.",
  },

  /* =====================================================================
   * DOMAIN 5: 모션 영상 (20종 - 타임라인·쇼릴·시퀀스 연출)
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
      "SaaS 런칭 소개용 3장면 루프를 만들어 줘. 슬로건 → 단순 대시보드와 +142% 위젯 → CTA 순서로 각 장면을 1.6초씩 보여주고, 클릭하면 다음 장면으로 이동하며 자동 전환 대기를 다시 시작해 줘. 장면마다 0.48초 spring-pop으로 scale(0.45) → 1.14 → 0.95 → 1 팝업을 재생하고 하단 3개 진행 표시를 300ms로 전환해 줘. 데모처럼 평면 UI 장면으로 구성해 줘.",
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
      "제품 소개용 CSS 3D 디바이스 씬을 만들어 줘. perspective 1000px 안에서 초기 rotateY(-28deg) rotateX(14deg) scale(0.94) 상태와 정면 rotateY(0) rotateX(0) scale(1.04) 상태를 1.8초마다 또는 클릭으로 교대해 줘. preserve-3d와 700ms transform 전환을 사용하고, 정면 전환과 동시에 내부 알림 카드를 translateZ(26px) scale(1.06)으로 띄웠다가 복귀 시 Z=0으로 되돌려 줘. 결제 승인 문구는 연출용 예시야.",
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
      "앱 사용법을 보여주는 3단계 줌 데모를 구현해 줘. 초기 전체 화면 → 버튼 강조 → 완료 순으로 1.4초마다 또는 클릭으로 이동해 줘. 2단계에서 화면을 scale(1.48) translate(-16px,4px)로 500ms 확대하고 마지막에는 원래 배율로 복귀해 줘. 커서는 각 단계에서 translate(24px,54px) → translate(136px,42px) scale(0.85) → translate(148px,52px)로 500ms 이동해 줘. 2단계에 핑 링을 보여주고 2·3단계에서는 버튼을 완료 색상과 scale(1.05)로 유지해 줘. 실제 배포 요청 없이 상태 전환만 시연해 줘.",
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
      "세로 3분할 프로모션 씬을 만들어 줘. 초기에는 세 패널이 정렬된 장면을 보여주고 1.3초마다 또는 클릭으로 다음 단계로 이동해 줘. 진입 단계에서는 패널을 위/아래/위로 각각 100% 이동한 위치에 두고, 다음 단계에서 정렬한 뒤 마지막 단계에서 패널 opacity를 0으로 전환하고 중앙 타이틀을 spring-pop으로 보여줘. 패널 이동과 투명도는 300ms로 전환하고 3단계를 반복해 줘.",
  },
  {
    id: 'vd-glitch-cut-reel',
    domain: 'video',
    category: 'promo',
    vibeTag: '강렬한 RGB 노이즈 슬라이스와 함께 제품 스펙 키워드가 빠르게 컷 전환되는',
    vibeKeywords: ['글리치 컷 전환 티저', '사이버 티저 릴', '스펙 하이라이트 영상', '게이밍 홍보 컷', 'RGB 컷 편집'],
    titleKo: '사이버 글리치 컷 티저 릴',
    titleEn: 'Glitch Cut Spec Teaser Reel',
    summary: '장면이 바뀔 때마다 순간적인 RGB 색수차 플래시와 수평 슬라이스가 터지며 핵심 스펙이 연속 전환되는 티저',
    promptSnippet:
      "240Hz OLED / 0.03ms GTG / NEURAL AI+ 스펙을 교체하는 글리치 컷 데모를 만들어 줘. 1.5초마다 글리치를 켜고 90ms 뒤 스펙을 다음 것으로 바꾸며 시작 후 220ms에 글리치를 꺼 줘. 클릭 시에는 스펙을 즉시 바꾸고 200ms 동안 글리치를 보여줘. 글리치 중 translateX(4px) skewX(-6deg), 좌우 4px 빨강·시안 그림자, 중앙 12px 높이 시안 반투명 띠의 mix-blend-screen을 적용하고 전환은 75ms로 설정해 줘.",
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
      "THINK. → BUILD. → SHIP. → FAST ⚡ 타이포그래피를 750ms마다 또는 클릭으로 교체하는 스톰프 비트 씬을 만들어 줘. 배경을 어두운색 → 인디고 → 앰버 → 흰색으로 100ms 전환하고 뒤 두 장면은 어두운 글자를 사용해 줘. 각 단어는 0.36초 cubic-bezier(0.22,1,0.36,1)로 scale(2.15), opacity 0에서 시작해 45% 지점 0.94, 70% 지점 1.03, 마지막 1로 착지하도록 키프레임을 재시작해 줘.",
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
      "타이틀 위 하이라이트 띠가 가로질러 지나가며 글자를 드러내는 3단계 씬을 만들어 줘. 초기에는 완료된 타이틀을 보여줘. 재생은 띠 translateX(-102%)·글자 opacity 0 상태로 120ms 대기 → 띠 translateX(0)를 300ms ease-out으로 이동하며 420ms 유지 → 띠 translateX(102%)와 글자 opacity 1을 각각 300ms·150ms로 전환하고 1.6초 유지하는 루프야. 완료 단계에서 태그 3개를 90ms 간격으로 opacity 0→1, translateY(6px)→0의 300ms 전환으로 보여주고 클릭 시 첫 단계로 돌아가 줘.",
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
      "3 → 2 → 1 → LIVE! 순서의 반복 카운트다운 인트로를 만들어 줘. 숫자는 각 800ms, LIVE!는 1.3초 유지하고 클릭으로 다음 단계로 이동해 줘. 각 단계의 글자는 spring-pop(0.48초)으로 등장시키며 숫자는 scale(1.14)로 강조해 줘. 배경 점선 링은 5초 주기로 회전하고 단계마다 0.5초 heart-ring 충격파를 새로 재생해 줘. 0이나 후속 메인 장면 없이 LIVE! 다음에 3으로 반복해 줘. spring-pop은 scale 0.45→1.14→0.95→1과 opacity 0→1, 충격파는 scale 0.5→1.85와 opacity 0.9→0으로 만들어 줘.",
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
      "AI 채팅 과정을 연출하는 3단계 스토리 씬을 만들어 줘. 초기에는 완료 상태를 보여주고 각 단계는 1.3초마다 또는 클릭으로 순환해 줘. 오른쪽 질문 말풍선은 모든 단계에 유지하고, 첫 단계는 질문만, 두 번째는 왼쪽 답변 말풍선과 0/120/240ms 지연으로 튀는 점 3개, 마지막은 왼쪽 결과 미리보기를 보여줘. 질문·답변·결과가 새로 나타날 때 spring-pop을 적용하고 실제 AI 요청이나 영상 생성 없이 시연 상태로 구성해 줘. 말풍선 Spring Pop은 0.48초 cubic-bezier(0.34,1.56,0.64,1)로 0% scale(0.45)·opacity 0 → 60% scale(1.14)·opacity 1 → 80% scale(0.95) → 100% scale(1)이야.",
  },
  {
    id: 'vd-slot-jackpot-headline',
    domain: 'video',
    category: 'kinetic_ad',
    vibeTag: '슬롯머신 릴 3개가 회전하다가 철컥철컥 멈추며 핵심 카피 문장이 완성되는',
    vibeKeywords: ['슬롯머신 카피 완성 씬', '잭팟 타이포 모션', '단어 롤링 광고', '릴 스핀 헤드라인', '랜덤 조합 카피'],
    titleKo: '슬롯 릴 잭팟 헤드라인 씬',
    titleEn: 'Slot Reel Jackpot Headline Scene',
    summary: '3개의 단어 슬롯 윈도우가 빠르게 수직 회전한 뒤 좌측부터 순서대로 멈추며 슬로건 한 줄을 완성하는 연출',
    promptSnippet:
      "3열 슬롯 헤드라인을 만들어 줘. 열별 단어는 SHIP/BUILD/CREATE, 2X/5X/10X, BETTER/SMARTER/FASTER로 구성하고 행 높이를 36px로 맞춰 줘. step은 초기 3이며 680ms마다 0→1→2→3→4→0으로 순환하고, 각 열 인덱스 r에서 step>r이면 마지막 단어에 고정하고 아니면 (step+r)%3 행으로 이동해 줘. translateY(-행번호×36px)를 300ms cubic-bezier(0.34,1.56,0.64,1)로 전환하고 step>=3이면 에메랄드 프레임을 켜 줘. 클릭 시 step=0으로 재시작하되 기존 인터벌은 유지해 줘.",
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
      "5개 막대의 성장 차트 씬을 만들어 줘. 활성 상태의 높이는 28/42/58/76/100%, 비활성은 모두 12%로 두고 높이를 500ms로 전환해 줘. 활성화 시 막대별 0/75/150/225/300ms 지연을 주고 마지막 막대 위에 +340% 배지를 spring-pop으로 즉시 표시해 줘. 초기 활성 상태에서 2초 유지 후 비활성 700ms를 반복하고 클릭으로 상태를 바꿔 줘. 비활성으로 복귀할 때는 지연을 없애 줘. 배지 팝업은 0.48초 cubic-bezier(0.34,1.56,0.64,1)로 scale 0.45→1.14→0.95→1과 opacity 0→1을 사용해 줘.",
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
      "Uptime 99.9%, Speed 12.4x, Latency 0.18s의 KPI 카드 3개를 나란히 배치해 줘. requestAnimationFrame 기반 900ms 카운트업을 0부터 시작하고 easeOutCubic=1-(1-p)^3을 공통 진행률로 사용해 숫자와 바를 동시에 올려 줘. 각 바의 최종 너비는 92/82/74%이며 숫자의 소수 자릿수는 각각1/1/2자리야. 2.8초마다 또는 클릭 시 0부터 재시작하고, 카드 자체는 고정 배치로 유지해 줘.",
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
      "Input → AI Core → Render의 3노드 파이프라인 모션을 만들어 줘. 0/1/2단계를 각각 950ms 유지한 뒤 리셋 단계를 80ms 두고 반복해 줘. 현재 노드 하나만 시안 테두리·인디고 배경·scale(1.1)로 300ms 강조하고, 발광 패킷을 left 12%→48%→82%로 500ms 이동해 줘. 첫 단계와 리셋 단계에서는 패킷을 opacity 0·transition 없음으로 좌측에 복귀시켜 줘. 클릭 시에는 다음 노드로 순환하며 Active 배지나 실제 데이터 전송 없이 시연해 줘.",
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
      "3개의 동심원 SVG 링 게이지를 구현해 줘. viewBox 0 0 80 80, 중심(40,40), 반지름32/23/14, stroke-width 6, round linecap을 사용하고 SVG를 -90deg 회전해 줘. dasharray는201/145/88, 빈 상태 dashoffset도201/145/88, 채운 상태는24/32/28로 설정해 줘. 전환은700ms, 지연은0/75/150ms이며 범례는 채움 상태에서88/78/68%, 빈 상태에서0%로 즉시 바꿔 줘. 초기 채움 상태를2.2초, 빈 상태를750ms 유지하며 반복하고 클릭으로도 교대해 줘.",
  },
  {
    id: 'vd-funnel-conversion-drop',
    domain: 'video',
    category: 'infographic',
    vibeTag: '상단 유입부터 최종 결제까지 단계별 깔때기 수치가 채워지며 전환율이 뜨는',
    vibeKeywords: ['마케팅 퍼널 전환 모션', '깔때기 차트 영상', '전환율 인포그래픽', '세일즈 퍼널 시퀀스', 'CVR 데이터 모션'],
    titleKo: '컨버전 퍼널 단계별 리빌 씬',
    titleEn: 'Conversion Funnel Stage Reveal',
    summary: 'Visit(100%) ➔ Sign Up(58%) ➔ Pro(28%) 3단계 퍼널 바가 위에서 아래로 순차 확장되며 최종 전환율 배지가 팝업되는 씬',
    promptSnippet:
      "컨버전 퍼널의3개 가로 바를 중앙 정렬로 쌓아 줘. VISITORS 100%는176px, SIGN UPS 58%는128px, PRO PAID 28.4%는96px 너비, 각 높이20px로 설정해 줘. stage는 초기3이며900ms마다1→2→3→4→1로 순환하고 stage>행 인덱스일 때 해당 행을 opacity 1·scale(1)·translateY(0), 아니면 opacity 0.15·scale(0.9)·translateY(-4px)로300ms 전환해 줘. stage>=3이면 하단 FINAL CVR +28.4% 배지를 opacity 0→1·scale(0.75)→1로300ms 표시하고 클릭 시stage=1로 돌아가 줘.",
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
      "방송용 로어써드를 왼쪽 아래에 배치해 줘. 왼쪽6px 인디고 바는 origin-bottom 기준 scaleY(0)↔1을300ms 전환하고, overflow-hidden 오른쪽 영역에서 메인 이름 바를 translateX(-100%)↔0으로500ms 슬라이드해 줘. 서브 직함 바는 같은500ms에100ms 지연을 적용해 줘. 초기 표시 상태를2.2초 유지하고 숨김 상태850ms를 반복하며 클릭으로도 교대해 줘. 세 요소는 같은 상태 전환에서 시작하되 서브 바에만 지연을 줘.",
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
      "인디고·푸크시아·시안의3겹 대각선 스팅어 와이프를 만들어 줘. 각 레이어는 skewX(-18deg) 상태에서 translateX(-150%)→150%를500ms ease-in-out으로 이동하고 시작 지연은0/70/140ms로 해 줘. 트리거280ms 뒤 배경 씬을 교체하고720ms 뒤에는 transition을 제거한 채 좌측 대기 위치로 즉시 복귀시켜 줘. 2.6초마다 자동 재생하고 클릭 시 기존 교체·복귀 타이머를 취소한 뒤 새로 시작해 줘.",
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
      "네온 로고 아웃트로3단계 루프를 만들어 줘. 초기 완성 상태에서 시작하고 광선 단계450ms → 링·로고 등장 단계500ms → 완성 단계1.8초를 반복하며 클릭 시 광선 단계로 돌아가 줘. 좌우80px 광선은 광선 단계의 translateX(±42px) scaleX(1)·opacity 1에서 다음 단계의 translateX(0) scaleX(0.2)·opacity 0으로300ms 전환해 줘. 링은 등장·완성 각 단계 진입에0.5초 heart-ring으로 재생하고 로고는 scale(0.5)·opacity 0→scale(1)·opacity 1을500ms 전환해 줘. VIBE STUDIO 자간은 완성 단계에서 tracking-tight에서0.26em으로 넓혀 줘. 링은 scale(0.5)·opacity 0.9에서 scale(1.85)·opacity 0으로 ease-out 확산해 줘.",
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
      "오디오 스펙트럼을 흉내 내는16개 세로 바를 만들어 줘. 기본 높이는45/75/95/60/85/100/70/50/90/100/65/80/55/78/60/42%이며 아래쪽 기준 scaleY 애니메이션을 사용해 줘. 바 i의 지연은(i%5)×130ms, 주기는650+(i%4)×140ms로 설정해 줘. 초기 재생 상태·84초(01:24)에서1초마다 타임코드를 증가시키고225초(03:45) 다음에는0초로 돌아가 줘. 클릭 시 animation-play-state와 타이머를 함께 일시정지·재개하고 배지는 AUDIO ON/PAUSED, 바 opacity는1/0.7로200ms 전환해 줘. 실제 음원 분석·재생이나 진행 바 없이 시각 데모로 구성해 줘. 바의 scaleY 키프레임은 0/100% 지점0.22, 35% 지점1, 65% 지점0.48, 85% 지점0.85의 ease-in-out 무한 반복으로 설정해 줘.",
  },
  {
    id: 'vd-breaking-news-ticker',
    domain: 'video',
    category: 'broadcast',
    vibeTag: 'LIVE 속보 배지와 함께 상단 헤드라인이 바뀌고 하단 뉴스 자막띠가 흐르는',
    vibeKeywords: ['뉴스 속보 티커 방송 씬', '브레이킹 뉴스 자막', '생방송 뉴스 오버레이', '하단 자막 롤링', '방송 스튜디오 그래픽'],
    titleKo: '브레이킹 뉴스 속보 & 티커 씬',
    titleEn: 'Breaking News Broadcast Overlay',
    summary: '붉은 BREAKING 라이브 배지, 슬라이드 교체되는 메인 속보 헤드라인, 하단 연속 스크롤 뉴스띠를 결합한 방송 씬',
    promptSnippet:
      "속보 방송 스타일의 뉴스 패널을 만들어 줘. 상단 붉은 헤더에 핑 애니메이션의 흰 점과 BREAKING NEWS / LIVE 24H를 배치하고, 중앙 헤드라인3개를2초마다 또는 클릭으로 교체하며 새 문구마다0.38초 toast-slide-up을 재시작해 줘. 하단 앰버 티커는 같은 문구를2개 이어 붙인 w-max 트랙을 translateX(0)→-50%로9초 linear 무한 반복시켜 끊김 없이 왼쪽으로 흘려 줘. 헤드라인·티커는 고정 예시 텍스트로 구성해 줘. 헤드라인은 cubic-bezier(0.34,1.56,0.64,1)로 translateY(24px)·scale(0.92)·opacity 0에서 65% 지점 translateY(-3px)·scale(1.02)·opacity 1을 거쳐 원위치·scale(1)로 안착하게 해 줘.",
  },
];
