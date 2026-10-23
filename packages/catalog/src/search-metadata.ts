import { UI_COLLECTION_SEARCH } from './search-metadata/additions/collection-ui';
import { MOTION_COLLECTION_SEARCH } from './search-metadata/additions/collection-motion';
import { LAYOUT_COLLECTION_SEARCH } from './search-metadata/additions/collection-layout';
import { STYLE_COLLECTION_SEARCH } from './search-metadata/additions/collection-style';
import { VIDEO_COLLECTION_SEARCH } from './search-metadata/additions/collection-video';
import { SHOWCASE_SEARCH_METADATA } from './search-metadata/additions/showcase';
import { GRAPHIC_STUDIO_SEARCH_METADATA } from './search-metadata/additions/graphic-studio';
import { WORKFLOW_SEARCH_METADATA } from './search-metadata/additions/workflows';
import { PATTERN_SEARCH_METADATA } from './search-metadata/additions/patterns';
import { BROADCAST_SEARCH_METADATA } from './search-metadata/additions/broadcast';
import { CAMERA_SEARCH_METADATA } from './search-metadata/additions/camera';
import { CARD_SEARCH_METADATA } from './search-metadata/additions/card';
import { CONTROL_SEARCH_METADATA } from './search-metadata/additions/control';
import { FEEDBACK_SEARCH_METADATA } from './search-metadata/additions/feedback';
import { GRAPHIC_SEARCH_METADATA } from './search-metadata/additions/graphic';
import { GRID_SEARCH_METADATA } from './search-metadata/additions/grid';
import { HOVER_SEARCH_METADATA } from './search-metadata/additions/hover';
import { INFOGRAPHIC_SEARCH_METADATA } from './search-metadata/additions/infographic';
import { KINETIC_SEARCH_METADATA } from './search-metadata/additions/kinetic';
import { KINETIC_AD_SEARCH_METADATA } from './search-metadata/additions/kinetic_ad';
import { LAYOUT_SEARCH_METADATA } from './search-metadata/additions/layout';
import { MODERN_SEARCH_METADATA } from './search-metadata/additions/modern';
import { MOTION_SEARCH_METADATA } from './search-metadata/additions/motion';
import { NAV_SEARCH_METADATA } from './search-metadata/additions/nav';
import { PANEL_SEARCH_METADATA } from './search-metadata/additions/panel';
import { PHYSICS_SEARCH_METADATA } from './search-metadata/additions/physics';
import { PROMO_SEARCH_METADATA } from './search-metadata/additions/promo';
import { RETRO_SEARCH_METADATA } from './search-metadata/additions/retro';
import { SCIFI_SEARCH_METADATA } from './search-metadata/additions/scifi';
import { SCROLL_SEARCH_METADATA } from './search-metadata/additions/scroll';
import { SHADER_SEARCH_METADATA } from './search-metadata/additions/shader';
import { TACTILE_SEARCH_METADATA } from './search-metadata/additions/tactile';
import { TEXT_SEARCH_METADATA } from './search-metadata/additions/text';
import { VFX_SEARCH_METADATA } from './search-metadata/additions/vfx';
import type { TechniqueItem } from './techniques';
import type { Locale } from './localization';

export const TARGETS = ['button', 'card', 'text', 'list', 'background', 'shape', 'scene', 'navigation', 'panel', 'input', 'chart', 'logo', 'image'] as const;
export type SearchTarget = typeof TARGETS[number];
export const TRIGGERS = ['pointer-move', 'hover', 'click', 'hold', 'drag', 'input', 'auto', 'static'] as const;
export type SearchTrigger = typeof TRIGGERS[number];
export interface SearchMetadata {
  targets: SearchTarget[];
  triggers: SearchTrigger[];
  useCases: Record<Locale, string[]>;
  aliases: Record<Locale, string[]>;
}
const m = (targets: SearchTarget[], triggers: SearchTrigger[], ko: string, en: string, aliasesKo = '', aliasesEn = ''): SearchMetadata => ({
  targets, triggers, useCases: { ko: [ko], en: [en] },
  aliases: { ko: aliasesKo ? aliasesKo.split('|') : [], en: aliasesEn ? aliasesEn.split('|') : [] },
});
// Describe the implemented demo, including its actual input, rather than features suggested by a title.
export const SEARCH_METADATA: Record<string, SearchMetadata> = {
  ...UI_COLLECTION_SEARCH,
  ...MOTION_COLLECTION_SEARCH,
  ...LAYOUT_COLLECTION_SEARCH,
  ...STYLE_COLLECTION_SEARCH,
  ...VIDEO_COLLECTION_SEARCH,
  ...WORKFLOW_SEARCH_METADATA,
  ...SHOWCASE_SEARCH_METADATA,
  ...GRAPHIC_STUDIO_SEARCH_METADATA,
  ...PATTERN_SEARCH_METADATA,
  ...BROADCAST_SEARCH_METADATA,
  ...CAMERA_SEARCH_METADATA,
  ...CARD_SEARCH_METADATA,
  ...CONTROL_SEARCH_METADATA,
  ...FEEDBACK_SEARCH_METADATA,
  ...GRAPHIC_SEARCH_METADATA,
  ...GRID_SEARCH_METADATA,
  ...HOVER_SEARCH_METADATA,
  ...INFOGRAPHIC_SEARCH_METADATA,
  ...KINETIC_SEARCH_METADATA,
  ...KINETIC_AD_SEARCH_METADATA,
  ...LAYOUT_SEARCH_METADATA,
  ...MODERN_SEARCH_METADATA,
  ...MOTION_SEARCH_METADATA,
  ...NAV_SEARCH_METADATA,
  ...PANEL_SEARCH_METADATA,
  ...PHYSICS_SEARCH_METADATA,
  ...PROMO_SEARCH_METADATA,
  ...RETRO_SEARCH_METADATA,
  ...SCIFI_SEARCH_METADATA,
  ...SCROLL_SEARCH_METADATA,
  ...SHADER_SEARCH_METADATA,
  ...TACTILE_SEARCH_METADATA,
  ...TEXT_SEARCH_METADATA,
  ...VFX_SEARCH_METADATA,
  'magnetic-hover': m(['button'], ['pointer-move'], '버튼이 커서 방향으로 끌려오게 만들기', 'Make a button follow the mouse cursor', '자석 버튼|마우스 따라오는 버튼', 'magnetic button|cursor attraction'),
  'shimmer-sweep': m(['button'], ['auto', 'click'], '버튼이나 배지에 반복 광택 강조', 'Add a repeating glossy sweep to a button or badge', "반짝이는 광택 띠|버튼 빛 훑기", "glossy light sweep|shining button stripe"),
  'ripple-click': m(['button'], ['click'], '클릭한 지점에 물결 피드백 표시', 'Show ripple feedback at the clicked point', '물결 버튼|클릭 파동', 'click ripple|ripple button'),
  'neon-glow-pulse': m(['button'], ['auto', 'click'], '버튼 외곽에 맥동하는 네온 발광', 'Emphasize a button with a pulsing neon glow', "숨쉬는 네온 버튼|맥동 발광", "breathing neon button|pulsating glow"),
  'liquid-slide-fill': m(['button'], ['hover', 'click'], '호버할 때 버튼 배경색 채우기', 'Fill a button background on hover', "배경색 밀려오는 버튼|색 채움 호버", "sliding button color|hover background fill"),
  'card-flip-3d': m(['card'], ['click'], '카드를 뒤집어 뒷면 상세 표시', 'Flip a card to reveal its back details', "뒤집는 카드|카드 뒷면 보기", "flip card|reveal card back"),
  'tilt-3d-card': m(['card'], ['pointer-move'], '마우스 위치에 따라 카드를 입체로 기울이기', 'Tilt a card in perspective with cursor position', "마우스 따라 기울어지는 카드|입체 틸팅", "cursor tilted card|perspective card tilt"),
  'glassmorphism-card': m(['card'], ['auto'], '배경 조명이 투과하는 유리 카드', 'Present a translucent glass card over moving lights', "반투명 서리 유리|블러 유리 패널", "frosted glass card|translucent blur surface"),
  'spotlight-border-card': m(['card'], ['pointer-move'], '카드 안에서 커서 위치를 조명으로 강조', 'Highlight the cursor position inside a card', "커서 원형 조명|카드 스포트라이트", "cursor spotlight card|radial hover light"),
  'stacked-card-cycle': m(['card'], ['click'], '겹친 카드 덱을 클릭으로 순환 탐색', 'Cycle through a layered card deck', "겹친 카드 순환|덱 넘기기", "cycling card stack|layered deck navigation"),
  'spring-bounce-modal': m(['panel'], ['auto', 'click'], '요소 진입을 탄성 팝업으로 강조', 'Reveal an element with a springy entrance pop', "통통 튀는 등장|탄성 팝업", "spring entrance pop|bouncing modal entrance"),
  'staggered-list': m(['list'], ['auto', 'click'], '목록 항목을 순차적으로 등장시키기', 'Reveal list items in a staggered sequence', "차례대로 뜨는 목록|시간차 리스트", "staggered list entrance|cascading list reveal"),
  'smooth-accordion': m(['panel'], ['click'], '상세 영역을 부드럽게 접고 펼치기', 'Expand and collapse details with a smooth height transition', "부드러운 접기 펼치기|높이 확장 패널", "smooth expanding accordion|animated disclosure height"),
  'morphing-state-button': m(['button'], ['click', 'auto'], '버튼의 로딩과 완료 상태 변형 시연', 'Demonstrate a button morphing through loading and completion', "로딩 완료 변신 버튼|상태 변화 버튼", "loading success morph button|button state transition"),
  'floating-levitation': m(['shape'], ['auto'], '오브젝트와 그림자의 떠다니는 모션', 'Float an object above its changing shadow', "공중에 뜬 물체|둥둥 떠다니기", "floating object animation|levitating object shadow"),
  'typewriter-streaming': m(['text'], ['auto', 'click'], '문장을 한 글자씩 타이핑하여 노출', 'Reveal a sentence one character at a time', "한 글자씩 타이핑|타자 효과", "typing text effect|character by character reveal"),
  'scramble-decode-text': m(['text'], ['auto', 'hover', 'click'], '기호가 원래 문구로 해독되는 타이틀', 'Reveal a title by decoding random symbols', "기호 해독 글자|랜덤 문자 복원", "scrambled text reveal|random character decode"),
  'gradient-flow-text': m(['text'], ['auto'], '헤드라인 글자 안의 컬러 흐름', 'Flow animated colors inside a headline', "흐르는 색 글씨|움직이는 그라데이션 글자", "flowing gradient letters|animated color text"),
  'slot-number-ticker': m(['text', 'chart'], ['auto', 'click'], '숫자 지표를 목표값까지 카운트업', 'Count a metric smoothly toward its target', "올라가는 숫자 카운터|실적 숫자 카운트업", "animated number counter|metric count up"),
  'marker-highlight-draw': m(['text'], ['auto', 'click'], '중요 단어 뒤에 형광펜 강조 그리기', 'Draw a marker highlight behind important words', "형광펜 밑칠|글자 뒤 마커", "drawn marker highlight|animated text highlighter"),
  'confetti-burst': m(['button'], ['click'], '클릭을 축하하는 파티클 폭죽', 'Celebrate a click with a confetti burst', "축하 색종이|컨페티 폭죽", "celebration confetti|party particle burst"),
  'error-shake-tooltip': m(['input'], ['click'], '입력 오류의 흔들림 표현 시연', 'Demonstrate a shaking validation-error appearance', "오류 좌우 흔들림|실패 진동 안내", "validation error shake|shaking error badge"),
  'heart-like-burst': m(['button'], ['auto', 'click'], '좋아요 하트의 팝과 확산 링', 'Animate a like heart with a pop and expanding ring', "하트 좋아요 팝|좋아요 확산 링", "like heart pop|heart reaction burst"),
  'toast-slide-stack': m(['panel'], ['click'], '최근 알림을 두 개까지 쌓아서 표시', 'Stack up to two recent toast notifications', "쌓이는 알림|아래서 뜨는 토스트", "stacked toast notifications|sliding notification stack"),
  'sliding-pill-tabs': m(['navigation'], ['click'], '활성 탭 위치로 캡슐 인디케이터 이동', 'Slide an active pill indicator between tabs', "움직이는 탭 배경|탭 캡슐 이동", "moving tab pill|sliding tab background"),
  'infinite-marquee': m(['list'], ['auto'], '로고와 키워드를 끊김 없이 흐르게 하기', 'Scroll logos or keywords in a seamless loop', "끊임없이 흐르는 로고|무한 가로 띠", "endless logo strip|continuous marquee track"),
  'skeleton-shimmer': m(['card'], ['auto'], '로딩 상태를 플레이스홀더 광택으로 표현', 'Show a shimmering loading placeholder', "로딩 뼈대 화면|광택 플레이스홀더", "shimmering skeleton loader|loading placeholder shine"),
  'spotlight-focus': m(['list'], ['click'], '선택 항목을 강조하고 나머지 흐리게 하기', 'Focus attention on one item while dimming others', "선택 외 흐리기|선택 항목 집중", "dim unselected items|selected item spotlight"),
  'before-after-slider': m(['image'], ['drag', 'input'], '두 이미지나 상태를 분할선으로 비교', 'Compare two views with a movable divider', "전후 사진 비교|이미지 비교 핸들", "before after image comparison|image comparison handle"),
  'drag-snap-slot': m(['panel'], ['click'], '칩을 선택해 슬롯에 장착되는 모양 표현', 'Place a clicked chip label in a springy slot', "클릭 슬롯 장착|칩 끼워 맞춤", "click chip into slot|snap chip placement"),
  'elastic-toggle-switch': m(['button'], ['click'], '스위치 노브에 늘어나는 탄성 적용', 'Give a toggle knob an elastic stretch', "늘어나는 토글|탄성 켜기 끄기", "stretching toggle knob|elastic on off switch"),
  'combo-gauge-pop': m(['chart'], ['click'], '진행 바와 카운터 배지를 함께 갱신', 'Update a progress bar and popping counter badge together', "진행률 배지 팝|게이지 카운터 연동", "progress counter pop|gauge badge feedback"),
  'gooey-menu-fab': m(['navigation', 'button'], ['click'], '플로팅 버튼에서 하위 액션 펼치기', 'Expand sub-actions from a floating action button', "플러스 액션 펼침|플로팅 하위 버튼", "expanding floating actions|speed dial action menu"),
  'otp-pin-focus-bounce': m(['input'], ['click', 'auto'], 'OTP 칸의 입력 피드백을 샘플 숫자로 시연', 'Demonstrate OTP slot feedback with sample digits', "인증번호 입력 피드백|핀 입력 바운스 시연", "verification code feedback|pin input bounce demo"),
  'hold-to-confirm-ring': m(['button'], ['hold', 'click'], '길게 누르는 동안 진행률 채우기', 'Fill a confirmation gauge while holding a button', "누르고 있어야 확인|길게 눌러 실행", "press and hold confirmation|hold progress ring"),
  'peek-password-lamp': m(['input'], ['click'], '샘플 비밀번호 표시와 마스킹 전환', 'Toggle a flashlight to reveal or mask sample password text', "비밀번호 조명 표시|암호 마스킹 전환", "password flashlight reveal|password masking toggle"),
  'mg-svg-line-draw': m(['shape', 'logo'], ['auto'], 'SVG 아이콘의 윤곽선부터 채움까지 재생', 'Draw an SVG outline before revealing its fill', "윤곽선 그리기|아이콘 선 등장", "svg stroke drawing|outline tracing animation"),
  'mg-liquid-blob-morph': m(['shape'], ['auto'], '유기적인 액체 도형을 반복 변형', 'Continuously morph an organic liquid shape', "흐물거리는 액체 도형|유기적 덩어리", "morphing liquid shape|organic blob animation"),
  'mg-gooey-metaball': m(['shape'], ['auto'], '두 원이 끈적하게 합쳐지고 분리', 'Merge and separate two gooey circles', "물방울 합쳐짐|끈적한 원 결합", "merging gooey circles|metaball fusion"),
  'mg-orbit-rotation': m(['shape'], ['auto'], '중앙 코어 주위를 위성이 공전', 'Orbit satellites around a stationary core', "위성 공전|중심 주변 회전", "orbiting satellites|planetary ring motion"),
  'mg-aurora-mesh': m(['background'], ['auto'], '몽환적인 오로라 배경 조명', 'Create a dreamy drifting aurora background', "몽환적 오로라 배경|블러 색 구체", "dreamy aurora backdrop|drifting mesh gradient"),
  'mg-particle-network': m(['shape'], ['hover', 'click'], '고정 노드와 연결선의 선택 강조', 'Highlight fixed nodes and their connecting lines', "별자리 연결 노드|선 연결 점 강조", "constellation node links|particle connection highlight"),
  'mg-dot-matrix-grid': m(['background', 'shape'], ['pointer-move'], '커서 열에 반응하는 도트 격자', 'Make dot-grid columns react to cursor movement', "마우스 반응 점 격자|인터랙티브 도트", "responsive dot matrix|cursor reactive dot grid"),
  'mg-god-ray-beam': m(['background'], ['auto'], '어두운 장면 위에서 흔들리는 빛기둥', 'Sway a soft light beam over a dark scene', "하늘에서 비치는 빛|입체 조명 기둥", "god ray light shaft|volumetric beam effect"),
  'mg-squash-stretch': m(['shape'], ['auto'], '충돌과 도약의 눌림과 늘어남 시연', 'Demonstrate squash on impact and stretch on takeoff', "찌그러졌다 늘어나는 공|탄성 변형", "squashing bouncing ball|stretch on takeoff"),
  'mg-anticipation': m(['shape'], ['auto', 'click'], '발사 전에 반대로 움츠리는 예비 동작', 'Wind up backward before launching forward', "움츠렸다 발사|동작 전 준비 모션", "anticipation windup|backward motion before launch"),
  'mg-follow-trail': m(['shape'], ['auto', 'click'], '선두 뒤에 시간차 잔상을 연결', 'Follow a moving leader with a delayed trail', "뒤따르는 잔상|시간차 이동 꼬리", "delayed motion trail|follow through echoes"),
  'mg-easing-curves': m(['shape'], ['auto', 'click'], '등속 감속 탄성 속도 곡선 비교', 'Compare linear, ease-out and spring motion', "속도 곡선 비교|등속 감속 탄성", "easing comparison|linear ease out spring"),
  'mg-kinetic-wave-text': m(['text'], ['auto'], '글자별로 파도치는 타이포그래피', 'Animate a wave across individual letters', "파도치는 글자|웨이브 타이포", "waving letters|kinetic text wave"),
  'mg-3d-text-roller': m(['text'], ['auto', 'click'], '문장 안의 키워드를 세로로 교체', 'Roll through keywords within a sentence', "세로 바뀌는 단어|문장 키워드 롤러", "vertical word roller|rotating sentence keywords"),
  'mg-neon-sign-flicker': m(['text'], ['auto'], '간판 글자의 네온 깜빡임', 'Flicker selected neon-sign letters', "깜빡이는 네온 간판|형광 글자 점등", "flickering neon sign|neon letter ignition"),
  'mg-parallax-depth': m(['scene'], ['pointer-move'], '마우스 이동으로 배경과 전경 깊이 표현', 'Create layered depth with mouse-driven parallax', "앞뒤 레이어 깊이|마우스 시차 공간", "layered depth parallax|cursor scene parallax"),
  'mg-rack-focus-blur': m(['scene'], ['click'], '전경과 배경의 선명도 전환', 'Switch sharpness between foreground and background', "앞뒤 초점 교체|배경 전경 선명도", "rack focus transition|foreground background focus"),
  'mg-ken-burns-pan': m(['image', 'scene'], ['auto'], '정지 장면을 천천히 줌하고 패닝', 'Slowly zoom and pan a still scene', "사진 줌 패닝|정지 이미지 카메라", "Ken Burns photo movement|slow image zoom pan"),
  'mg-isometric-explode': m(['shape'], ['hover', 'click'], '입체 레이어 구조를 층별로 분리', 'Separate a tilted isometric layer stack', "분해되는 입체 층|아이소 레이어 분리", "exploded isometric layers|layer separation diagram"),
  'mg-iris-circle-wipe': m(['scene'], ['click'], '원형 마스크로 장면 열고 닫기', 'Reveal or hide a scene through a circular iris', "조리개 장면 전환|원형 닫힘 열림", "iris wipe transition|circular aperture reveal"),
  'mg-rgb-chromatic-glitch': m(['text'], ['auto'], '텍스트의 RGB 채널 분리와 글리치', 'Glitch text with split red and cyan shadows', "빨강 청록 글리치|색수차 분리", "RGB channel glitch|chromatic aberration text"),
  'mg-speed-lines-streak': m(['background'], ['auto'], '수평 빛줄기로 속도감 표현', 'Convey speed with horizontal light streaks', "질주 속도선|고속 빛줄기", "speed streak lines|fast motion light trails"),
  'mg-radar-sonar-sweep': m(['shape'], ['auto', 'click'], '레이더 빔이 고정 타겟을 비추는 시연', 'Sweep a radar beam over fixed demo targets', "회전 레이더 빔|탐지 스캐너 시연", "rotating radar sweep|sonar scanner display"),
  'mg-morphing-grid-wave': m(['background', 'shape'], ['auto', 'click'], '타일 격자에 대각선 파도 전달', 'Send diagonal waves across a tile grid', "대각 타일 물결|격자 시간차 변형", "diagonal tile wave|staggered grid pulse"),
  'mg-prism-rainbow-refraction': m(['shape'], ['click'], '프리즘의 무지개 광선 분산 시연', 'Demonstrate rainbow beam dispersion with an SVG prism', "프리즘 무지개 분산|빛 스펙트럼", "prism rainbow dispersion|white light spectrum"),
  'mg-gravity-newton-cradle': m(['shape'], ['auto', 'click'], '뉴턴의 요람 진자 운동 모양 시연', 'Demonstrate a timed Newton cradle pendulum sequence', "뉴턴 진자 구슬|충돌 요람", "Newton cradle balls|alternating pendulum collision"),
  'mg-dice-roll-3d': m(['shape', 'card'], ['click'], '3D 주사위 굴리기와 눈금 안착 시연', 'Tumble and roll a 3D dice landing on a random face', "입체 주사위 회전|랜덤 주사위 눈금", "rolling 3D dice|random dice landing"),
  'mg-marble-board': m(['shape', 'card', 'navigation'], ['click'], '캐주얼 보드게임 주사위와 말 이동 시연', 'Play a mini board game with dual dice, pawn hops, and landmark animations', "주사위 보드게임|말 이동 게임판", "dice board game|pawn tile movement"),
  'mg-treasure-chest-3d': m(['shape', 'card'], ['click'], '3D 보물상자 열기와 황금빛 빔 루팅 시연', 'Open a 3D treasure chest to reveal radiant beams and floating loot', "보물상자 열기|황금 보상 공개", "opening treasure chest|golden loot reveal"),
  'mg-lucky-wheel-3d': m(['shape', 'button'], ['click'], '3D 럭키 휠 룰렛 회전과 감속 물리 시연', 'Spin a 3D lucky wheel roulette with deceleration physics and pin flapper', "보상 룰렛 돌리기|행운 회전판", "prize wheel spin|lucky reward roulette"),
  'ly-bento-grid': m(['panel', 'card'], ['click'], '대형과 보조 콘텐츠 타일 배치', 'Arrange primary and supporting content tiles in a bento grid', "도시락 타일 배치|큰 작은 카드 격자", "bento tile layout|mixed size feature grid"),
  'ly-masonry-waterfall': m(['list', 'card'], ['click'], '높이가 다른 카드의 워터폴 배치', 'Arrange variable-height cards in fixed waterfall columns', "높이 다른 사진 벽|벽돌형 카드 목록", "masonry photo wall|variable height waterfall"),
  'ly-editorial-asymmetric': m(['image', 'card'], ['hover', 'click'], '비주얼과 정보 카드의 편집형 겹침', 'Overlap a large visual and a small editorial card', "비대칭 매거진 배치|큰 사진 정보 카드", "asymmetric editorial split|large image information card"),
  'ly-honeycomb-hex': m(['navigation'], ['click'], '육각형 아이콘을 벌집 구조로 선택', 'Select icons arranged in a honeycomb grid', "육각 벌집 메뉴|허니콤 아이콘 배치", "honeycomb icon layout|hexagonal selection grid"),
  'ly-sticky-scrolltelling': m(['panel'], ['click'], '단계별 설명과 비주얼을 함께 교체', 'Switch explanatory steps and showcase visuals together', "고정 단계 스토리|설명 비주얼 단계 전환", "sticky story steps|step driven visual narrative"),
  'ly-fullpage-snap': m(['panel'], ['click'], '동일 높이 섹션을 클릭 슬라이드로 탐색', 'Browse equal-height sections with click-driven slides', "한 화면씩 섹션 이동|전체 화면 스냅 시연", "full page section navigation|screen snap preview"),
  'ly-horizontal-showcase': m(['list', 'card'], ['click'], '가로 카드 쇼케이스를 순환 탐색', 'Browse a horizontal card showcase', "가로 카드 전시|좌우 쇼케이스 탐색", "horizontal card showcase|sideways gallery browsing"),
  'ly-curtain-reveal': m(['panel'], ['click'], '본문 커튼 뒤의 푸터 노출', 'Reveal a stationary footer behind a content curtain', "커튼처럼 걷히는 본문|언더레이 배치 시연", "curtain content reveal|underlay layout preview"),
  'ly-macos-dock': m(['navigation'], ['hover', 'click'], '호버 아이콘과 이웃 아이콘 확대', 'Magnify a hovered dock icon and its neighbors', "커지는 독 아이콘|맥 도크 메뉴", "magnifying dock icons|macOS style dock"),
  'ly-command-palette': m(['navigation', 'panel'], ['click'], '명령 목록 모양 패널에서 행 선택', 'Select a row in a command-palette-shaped panel', "명령 검색 창|빠른 액션 모달", "command search modal|quick action palette"),
  'ly-dynamic-island-nav': m(['navigation', 'panel'], ['click'], '캡슐 상태 바를 정보 위젯으로 확장', 'Expand a capsule status bar into an information widget', "늘어나는 알약 위젯|플로팅 아일랜드", "expanding island widget|floating pill navigation"),
  'ly-radial-pie-menu': m(['navigation'], ['click'], '중앙 버튼 주위에 액션 메뉴 펼치기', 'Fan action buttons around a central menu', "원형 펼침 메뉴|방사형 액션", "radial action menu|circular pie menu"),
  'ly-bottom-sheet': m(['panel'], ['click'], '하단 시트를 두 높이로 확장', 'Expand a bottom sheet between two heights', "하단 높이 전환 패널|바텀시트 스냅 시연", "bottom sheet snap states|bottom panel height preview"),
  'ly-master-detail-split': m(['panel', 'list'], ['click'], '목록 선택과 상세 패널 연결', 'Connect list selection to an adjacent detail panel', "목록과 상세 나란히|선택 미리보기 패널", "list detail split|selection preview pane"),
  'ly-kanban-board': m(['panel', 'card'], ['click'], '태스크를 상태별 컬럼으로 이동 시연', 'Demonstrate moving a task across workflow columns', "상태별 작업 보드|할일 진행 완료 칸", "workflow kanban columns|task status board"),
  'ly-heatmap-grid': m(['chart'], ['click'], '활동 밀도를 셀 농도로 시각화', 'Visualize sample activity density with colored cells', "깃허브 잔디|활동 밀도 달력", "contribution heatmap|activity density calendar"),
  'ly-floating-toc-spy': m(['navigation', 'panel'], ['auto', 'click'], '문서 섹션과 목차 표시 연동 시연', 'Synchronize a document preview with its contents indicator', "현재 읽는 목차|본문 위치 탐색", "active section table of contents|floating scrollspy navigation"),
  'ly-collapsible-rail-sidebar': m(['navigation', 'panel'], ['click'], '아이콘 레일과 펼친 사이드바 전환', 'Switch navigation between an icon rail and expanded sidebar', "아이콘 레일 접기|펼쳐지는 사이드 메뉴", "collapsible icon rail|expandable navigation sidebar"),
  'ly-breadcrumb-folder-drill': m(['navigation', 'list'], ['click'], '샘플 폴더 경로를 탐색하는 브레드크럼', 'Navigate sample folders with a breadcrumb path', "폴더 단계 탐색|상위 경로 복귀", "folder drilldown trail|breadcrumb parent navigation"),
  'ly-resizable-split-pane': m(['panel'], ['drag', 'click'], '중앙 핸들로 두 패널 너비 조절', 'Resize two panels with a central divider', "패널 너비 조절|가운데 구분선 드래그", "resizable pane divider|drag split gutter"),
  'st-neo-brutalism': m(['button'], ['click'], '굵은 테두리와 하드 그림자의 버튼 스타일', 'Style a button with bold borders and hard offset shadows', "굵은 테두리 원색|딱딱한 오프셋 그림자", "bold border brutalism|hard offset shadow style"),
  'st-liquid-acrylic': m(['card'], ['auto'], '반투명 아크릴 표면과 이동 조명', 'Combine a translucent acrylic card with moving lights', "두꺼운 아크릴 유리|림 라이트 글래스", "thick acrylic glass|rim lit liquid glass"),
  'st-linear-dark-minimal': m(['card', 'background'], ['static'], '절제된 어두운 카드와 헤어라인', 'Style a restrained dark card with a fine hairline', "절제된 어두운 화면|리니어 스타일", "restrained dark interface|Linear inspired minimal style"),
  'st-matte-film-grain': m(['background'], ['static'], '반복 도트로 매트한 필름 질감 추가', 'Add a matte film-like texture with fixed repeating dots', "매트 노이즈 질감|필름 입자 표면", "matte film texture|subtle grain overlay"),
  'st-neumorphism-soft': m(['button'], ['click'], '같은 색 표면의 양각과 음각 전환', 'Toggle raised and inset shadows on matching surfaces', "부드러운 양각 버튼|같은 색 음각", "soft raised interface|inset same color surface"),
  'st-claymorphism-3d': m(['card'], ['hover', 'click'], '입체적인 말랑한 클레이 카드', 'Style a puffy clay card with inset highlights', "말랑한 입체 카드|통통한 점토 UI", "puffy clay interface|soft volumetric card"),
  'st-skeuomorphism-tactile': m(['button'], ['click'], 'LED와 깊이감이 있는 하드웨어 버튼', 'Style a tactile hardware button with a status LED', "물리 키캡 버튼|실물 하드웨어 느낌", "physical keycap button|tactile hardware style"),
  'st-paper-cutout-layer': m(['card'], ['static'], '회전한 종이 레이어의 깊이감', 'Create depth from overlapping rotated paper layers', "색종이 레이어|종이 오려 붙이기", "layered paper cutouts|stacked craft paper"),
  'st-8bit-pixel-retro': m(['button'], ['click'], '각진 8비트 아케이드 버튼', 'Style a square 8-bit arcade button', "고전 픽셀 게임풍|도트 아케이드", "retro pixel arcade|8 bit game interface"),
  'st-win95-retro-os': m(['panel'], ['static'], '고전 윈도우95 창 외형', 'Recreate a classic Windows 95 window appearance', "윈도우95 창|옛날 컴퓨터 UI", "Windows 95 window|classic desktop bevel"),
  'st-crt-scanline-terminal': m(['panel'], ['static'], '녹색 잔광과 스캔라인 터미널 외형', 'Create a green-phosphor CRT terminal appearance', "녹색 브라운관|레트로 터미널 줄무늬", "green CRT terminal|phosphor scanline screen"),
  'st-synthwave-sunset-grid': m(['background'], ['static'], '레트로 황혼과 원근 네온 격자', 'Compose a retro sunset and perspective neon grid', "네온 황혼 배경|복고 원근 격자", "synthwave sunset backdrop|retro neon perspective grid"),
  'st-scifi-hud-chamfer': m(['panel'], ['auto'], '모서리가 잘린 SF HUD 프레임', 'Style a chamfered sci-fi HUD frame', "잘린 모서리 HUD|미래형 계기판", "chamfered sci fi panel|futuristic HUD corners"),
  'st-architect-blueprint': m(['background', 'panel'], ['static'], '모눈과 치수 라벨의 설계도 외형', 'Style a blueprint with grid lines and decorative dimensions', "파란 설계 도면|치수 표시 모눈", "blueprint drafting style|dimensioned technical grid"),
  'st-swiss-editorial-grid': m(['card'], ['static'], '굵은 번호와 헤드라인의 스위스 편집', 'Compose bold numbering and headlines in a Swiss grid', "스위스 그래픽 편집|큰 숫자 격자", "Swiss graphic layout|bold numbered editorial grid"),
  'st-comic-halftone-pop': m(['card'], ['click'], '유색 망점과 말풍선의 만화 스타일', 'Style a comic speech card with colored halftone dots', "만화 망점 배경|팝아트 말풍선", "comic halftone backdrop|pop art speech panel"),
  'st-holographic-foil-card': m(['card'], ['pointer-move', 'click'], '커서에 따라 각도가 바뀌는 무지개 광택', 'Change rainbow foil sheen with cursor position', "무지개 포일 광택|각도별 반짝임", "iridescent foil finish|holographic rainbow card"),
  'st-receipt-thermal-mono': m(['card'], ['click'], '고정폭 영수증과 장식 바코드', 'Style a monospace thermal receipt with a sample barcode', "영수증 종이 디자인|고정폭 결제 내역", "thermal receipt style|monospace purchase slip"),
  'st-vaporwave-y2k-chrome': m(['panel'], ['click'], '파스텔과 크롬의 Y2K 윈도우', 'Style a Y2K window with pastel colors and chrome accents', "파스텔 크롬 창|Y2K 인터넷 감성", "pastel chrome window|Y2K vaporwave interface"),
  'st-cyberpunk-neon-glitch': m(['card'], ['click'], '경고 띠와 네온 액센트의 사이버펑크', 'Style a cyberpunk card with neon accents and hazard stripes', "네온 경고 띠|사이버펑크 카드", "cyberpunk warning stripes|neon glitch panel"),
  'vd-saas-launch-reel': m(['scene'], ['auto', 'click'], '슬로건 대시보드 CTA의 SaaS 런칭 소개', 'Introduce a SaaS product through slogan, dashboard and CTA scenes', "소프트웨어 출시 영상|대시보드 홍보 릴", "software launch reel|SaaS dashboard promo"),
  'vd-device-3d-spin': m(['scene'], ['auto', 'click'], '디바이스 목업의 입체 제품 소개', 'Showcase a product with a CSS 3D device mockup', "회전하는 기기 목업|디바이스 제품 영상", "rotating device mockup|3D product device shot"),
  'vd-app-walkthrough-zoom': m(['scene'], ['auto', 'click'], '가상 커서와 줌으로 앱 사용법 소개', 'Explain an app flow with a simulated cursor and zoom', "앱 사용 흐름 소개|커서 줌 튜토리얼", "app walkthrough zoom|simulated cursor tutorial"),
  'vd-split-promo-reel': m(['scene'], ['auto', 'click'], '분할 패널과 타이틀의 홍보 시퀀스', 'Promote content through split panels and a central title', "분할 프로모션 영상|패널 광고 구성", "split panel promo|promotional split screen"),
  'vd-glitch-cut-reel': m(['scene', 'text'], ['auto', 'click'], '제품 스펙을 글리치 컷으로 교체', 'Reveal product specifications with glitch cuts', "글리치 스펙 소개|제품 사양 컷", "glitch product specification|glitch cut promo"),
  'vd-stomp-beat-typo': m(['scene', 'text'], ['auto', 'click'], '단어가 비트처럼 착지하는 타이포', 'Land large words with rhythmic stomp motion', "쿵 찍히는 단어|리듬 타이포 광고", "stomping rhythmic type|beat landing words"),
  'vd-highlight-swipe-reveal': m(['scene', 'text'], ['auto', 'click'], '하이라이트 스와이프로 헤드라인 공개', 'Reveal a headline with a sweeping highlight', "하이라이트 헤드라인 등장|색 띠 문구 공개", "highlight swipe headline|color swipe copy reveal"),
  'vd-countdown-energetic-intro': m(['scene', 'text'], ['auto', 'click'], '라이브 시작을 알리는 카운트다운', 'Introduce a live event with an energetic countdown', "행사 시작 카운트다운|라이브 오프닝 숫자", "live event countdown|energetic countdown intro"),
  'vd-chat-story-sequence': m(['scene'], ['auto', 'click'], '질문에서 결과까지 채팅 스토리 시연', 'Stage a chat story from question to result', "대화형 홍보 스토리|채팅 장면 소개", "chat narrative sequence|conversation promo story"),
  'vd-slot-jackpot-headline': m(['scene', 'text'], ['auto', 'click'], '슬롯 단어가 멈추며 슬로건 완성', 'Assemble a slogan as word reels settle', "슬롯 문구 완성|릴 단어 제목", "slot reel headline|jackpot word slogan"),
  'vd-animated-bar-race': m(['scene', 'chart'], ['auto', 'click'], '성장 수치를 막대 상승으로 연출', 'Reveal sample growth with rising chart bars', "성장 막대 상승|움직이는 실적 막대", "rising growth bars|animated metric bar reveal"),
  'vd-kpi-counter-explosion': m(['scene', 'chart'], ['auto', 'click'], '여러 KPI 숫자와 진행 바 동시 공개', 'Reveal multiple KPI counters and progress bars together', "동시 지표 카운트업|성과 숫자 공개", "simultaneous KPI counters|metric number reveal"),
  'vd-node-flow-pipeline': m(['scene', 'shape'], ['auto', 'click'], '노드 사이의 데이터 흐름 모양 시연', 'Demonstrate a glowing packet moving through pipeline nodes', "노드 간 패킷 이동|데이터 흐름 시연", "pipeline packet animation|node data flow demo"),
  'vd-circular-ring-dashboard': m(['scene', 'chart'], ['auto', 'click'], '동심원 링으로 여러 진행률 표시', 'Show multiple progress values in concentric rings', "동심원 진행 지표|원형 다중 게이지", "concentric progress rings|multiple radial metrics"),
  'vd-funnel-conversion-drop': m(['scene', 'chart'], ['auto', 'click'], '단계별 전환 퍼널과 최종 지표 공개', 'Reveal conversion funnel stages and a final metric', "전환 단계 퍼널|마케팅 깔때기 차트", "conversion stage funnel|marketing funnel reveal"),
  'vd-lower-third-banner': m(['scene', 'text'], ['auto', 'click'], '발표자 이름과 직함의 방송 자막', 'Introduce a speaker with a broadcast name and role banner', "이름 직함 자막|방송 하단 소개", "speaker name lower third|broadcast role banner"),
  'vd-diagonal-shutter-wipe': m(['scene'], ['auto', 'click'], '겹친 대각선 레이어로 장면 전환', 'Transition scenes with layered diagonal wipes', "대각선 셔터 전환|비스듬한 장면 와이프", "diagonal shutter transition|slanted scene wipe"),
  'vd-logo-stinger-outro': m(['scene', 'logo'], ['auto', 'click'], '광선과 충격파로 브랜드 로고 등장', 'Reveal a brand logo with beams and shockwave rings', "브랜드 로고 마무리|충격파 로고 등장", "logo shockwave outro|brand stinger reveal"),
  'vd-audio-spectrum-visualizer': m(['scene', 'chart'], ['auto', 'click'], '오디오 분석 없는 스펙트럼 시각 연출', 'Stage an audio-spectrum visual without actual audio analysis', "음악 막대 시연|가상 오디오 스펙트럼", "simulated audio bars|decorative spectrum visualizer"),
  'vd-breaking-news-ticker': m(['scene', 'text'], ['auto', 'click'], '샘플 속보 헤드라인과 뉴스띠', 'Present sample breaking-news headlines and a scrolling ticker', "속보 띠 자막|흐르는 뉴스 헤드라인", "breaking news crawl|scrolling headline ticker"),
};
export function getSearchMetadata(item: TechniqueItem): SearchMetadata {
  return SEARCH_METADATA[item.id] ?? { targets: [], triggers: [], aliases: { ko: [], en: [] }, useCases: { ko: [], en: [] } };
}
