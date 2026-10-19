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
  'shimmer-sweep': m(['button'], ['auto', 'click'], '버튼이나 배지에 반복 광택 강조', 'Add a repeating glossy sweep to a button or badge'),
  'ripple-click': m(['button'], ['click'], '클릭한 지점에 물결 피드백 표시', 'Show ripple feedback at the clicked point', '물결 버튼|클릭 파동', 'click ripple|ripple button'),
  'neon-glow-pulse': m(['button'], ['auto', 'click'], '버튼 외곽에 맥동하는 네온 발광', 'Emphasize a button with a pulsing neon glow'),
  'liquid-slide-fill': m(['button'], ['hover', 'click'], '호버할 때 버튼 배경색 채우기', 'Fill a button background on hover'),
  'card-flip-3d': m(['card'], ['click'], '카드를 뒤집어 뒷면 상세 표시', 'Flip a card to reveal its back details'),
  'tilt-3d-card': m(['card'], ['pointer-move'], '마우스 위치에 따라 카드를 입체로 기울이기', 'Tilt a card in perspective with cursor position'),
  'glassmorphism-card': m(['card'], ['auto'], '배경 조명이 투과하는 유리 카드', 'Present a translucent glass card over moving lights'),
  'spotlight-border-card': m(['card'], ['pointer-move'], '카드 안에서 커서 위치를 조명으로 강조', 'Highlight the cursor position inside a card'),
  'stacked-card-cycle': m(['card'], ['click'], '겹친 카드 덱을 클릭으로 순환 탐색', 'Cycle through a layered card deck'),
  'spring-bounce-modal': m(['panel'], ['auto', 'click'], '요소 진입을 탄성 팝업으로 강조', 'Reveal an element with a springy entrance pop'),
  'staggered-list': m(['list'], ['auto', 'click'], '목록 항목을 순차적으로 등장시키기', 'Reveal list items in a staggered sequence'),
  'smooth-accordion': m(['panel'], ['click'], '상세 영역을 부드럽게 접고 펼치기', 'Expand and collapse details with a smooth height transition'),
  'morphing-state-button': m(['button'], ['click', 'auto'], '버튼의 로딩과 완료 상태 변형 시연', 'Demonstrate a button morphing through loading and completion'),
  'floating-levitation': m(['shape'], ['auto'], '오브젝트와 그림자의 떠다니는 모션', 'Float an object above its changing shadow'),
  'typewriter-streaming': m(['text'], ['auto', 'click'], '문장을 한 글자씩 타이핑하여 노출', 'Reveal a sentence one character at a time'),
  'scramble-decode-text': m(['text'], ['auto', 'hover', 'click'], '기호가 원래 문구로 해독되는 타이틀', 'Reveal a title by decoding random symbols'),
  'gradient-flow-text': m(['text'], ['auto'], '헤드라인 글자 안의 컬러 흐름', 'Flow animated colors inside a headline'),
  'slot-number-ticker': m(['text', 'chart'], ['auto', 'click'], '숫자 지표를 목표값까지 카운트업', 'Count a metric smoothly toward its target'),
  'marker-highlight-draw': m(['text'], ['auto', 'click'], '중요 단어 뒤에 형광펜 강조 그리기', 'Draw a marker highlight behind important words'),
  'confetti-burst': m(['button'], ['click'], '클릭을 축하하는 파티클 폭죽', 'Celebrate a click with a confetti burst'),
  'error-shake-tooltip': m(['input'], ['click'], '입력 오류의 흔들림 표현 시연', 'Demonstrate a shaking validation-error appearance'),
  'heart-like-burst': m(['button'], ['auto', 'click'], '좋아요 하트의 팝과 확산 링', 'Animate a like heart with a pop and expanding ring'),
  'toast-slide-stack': m(['panel'], ['click'], '최근 알림을 두 개까지 쌓아서 표시', 'Stack up to two recent toast notifications'),
  'sliding-pill-tabs': m(['navigation'], ['click'], '활성 탭 위치로 캡슐 인디케이터 이동', 'Slide an active pill indicator between tabs'),
  'infinite-marquee': m(['list'], ['auto'], '로고와 키워드를 끊김 없이 흐르게 하기', 'Scroll logos or keywords in a seamless loop'),
  'skeleton-shimmer': m(['card'], ['auto'], '로딩 상태를 플레이스홀더 광택으로 표현', 'Show a shimmering loading placeholder'),
  'spotlight-focus': m(['list'], ['click'], '선택 항목을 강조하고 나머지 흐리게 하기', 'Focus attention on one item while dimming others'),
  'before-after-slider': m(['image'], ['drag', 'input'], '두 이미지나 상태를 분할선으로 비교', 'Compare two views with a movable divider'),
  'drag-snap-slot': m(['panel'], ['click'], '칩을 선택해 슬롯에 장착되는 모양 표현', 'Place a clicked chip label in a springy slot'),
  'elastic-toggle-switch': m(['button'], ['click'], '스위치 노브에 늘어나는 탄성 적용', 'Give a toggle knob an elastic stretch'),
  'combo-gauge-pop': m(['chart'], ['click'], '진행 바와 카운터 배지를 함께 갱신', 'Update a progress bar and popping counter badge together'),
  'gooey-menu-fab': m(['navigation', 'button'], ['click'], '플로팅 버튼에서 하위 액션 펼치기', 'Expand sub-actions from a floating action button'),
  'otp-pin-focus-bounce': m(['input'], ['click', 'auto'], 'OTP 칸의 입력 피드백을 샘플 숫자로 시연', 'Demonstrate OTP slot feedback with sample digits'),
  'hold-to-confirm-ring': m(['button'], ['hold', 'click'], '길게 누르는 동안 진행률 채우기', 'Fill a confirmation gauge while holding a button'),
  'peek-password-lamp': m(['input'], ['click'], '샘플 비밀번호 표시와 마스킹 전환', 'Toggle a flashlight to reveal or mask sample password text'),
  'mg-svg-line-draw': m(['shape', 'logo'], ['auto'], 'SVG 아이콘의 윤곽선부터 채움까지 재생', 'Draw an SVG outline before revealing its fill'),
  'mg-liquid-blob-morph': m(['shape'], ['auto'], '유기적인 액체 도형을 반복 변형', 'Continuously morph an organic liquid shape'),
  'mg-gooey-metaball': m(['shape'], ['auto'], '두 원이 끈적하게 합쳐지고 분리', 'Merge and separate two gooey circles'),
  'mg-orbit-rotation': m(['shape'], ['auto'], '중앙 코어 주위를 위성이 공전', 'Orbit satellites around a stationary core'),
  'mg-aurora-mesh': m(['background'], ['auto'], '몽환적인 오로라 배경 조명', 'Create a dreamy drifting aurora background'),
  'mg-particle-network': m(['shape'], ['hover', 'click'], '고정 노드와 연결선의 선택 강조', 'Highlight fixed nodes and their connecting lines'),
  'mg-dot-matrix-grid': m(['background', 'shape'], ['pointer-move'], '커서 열에 반응하는 도트 격자', 'Make dot-grid columns react to cursor movement'),
  'mg-god-ray-beam': m(['background'], ['auto'], '어두운 장면 위에서 흔들리는 빛기둥', 'Sway a soft light beam over a dark scene'),
  'mg-squash-stretch': m(['shape'], ['auto'], '충돌과 도약의 눌림과 늘어남 시연', 'Demonstrate squash on impact and stretch on takeoff'),
  'mg-anticipation': m(['shape'], ['auto', 'click'], '발사 전에 반대로 움츠리는 예비 동작', 'Wind up backward before launching forward'),
  'mg-follow-trail': m(['shape'], ['auto', 'click'], '선두 뒤에 시간차 잔상을 연결', 'Follow a moving leader with a delayed trail'),
  'mg-easing-curves': m(['shape'], ['auto', 'click'], '등속 감속 탄성 속도 곡선 비교', 'Compare linear, ease-out and spring motion'),
  'mg-kinetic-wave-text': m(['text'], ['auto'], '글자별로 파도치는 타이포그래피', 'Animate a wave across individual letters'),
  'mg-3d-text-roller': m(['text'], ['auto', 'click'], '문장 안의 키워드를 세로로 교체', 'Roll through keywords within a sentence'),
  'mg-neon-sign-flicker': m(['text'], ['auto'], '간판 글자의 네온 깜빡임', 'Flicker selected neon-sign letters'),
  'mg-parallax-depth': m(['scene'], ['pointer-move'], '마우스 이동으로 배경과 전경 깊이 표현', 'Create layered depth with mouse-driven parallax'),
  'mg-rack-focus-blur': m(['scene'], ['click'], '전경과 배경의 선명도 전환', 'Switch sharpness between foreground and background'),
  'mg-ken-burns-pan': m(['image', 'scene'], ['auto'], '정지 장면을 천천히 줌하고 패닝', 'Slowly zoom and pan a still scene'),
  'mg-isometric-explode': m(['shape'], ['hover', 'click'], '입체 레이어 구조를 층별로 분리', 'Separate a tilted isometric layer stack'),
  'mg-iris-circle-wipe': m(['scene'], ['click'], '원형 마스크로 장면 열고 닫기', 'Reveal or hide a scene through a circular iris'),
  'mg-rgb-chromatic-glitch': m(['text'], ['auto'], '텍스트의 RGB 채널 분리와 글리치', 'Glitch text with split red and cyan shadows'),
  'mg-speed-lines-streak': m(['background'], ['auto'], '수평 빛줄기로 속도감 표현', 'Convey speed with horizontal light streaks'),
  'mg-radar-sonar-sweep': m(['shape'], ['auto', 'click'], '레이더 빔이 고정 타겟을 비추는 시연', 'Sweep a radar beam over fixed demo targets'),
  'mg-morphing-grid-wave': m(['background', 'shape'], ['auto', 'click'], '타일 격자에 대각선 파도 전달', 'Send diagonal waves across a tile grid'),
  'mg-prism-rainbow-refraction': m(['shape'], ['click'], '프리즘의 무지개 광선 분산 시연', 'Demonstrate rainbow beam dispersion with an SVG prism'),
  'mg-gravity-newton-cradle': m(['shape'], ['auto', 'click'], '뉴턴의 요람 진자 운동 모양 시연', 'Demonstrate a timed Newton cradle pendulum sequence'),
  'mg-dice-roll-3d': m(['shape', 'card'], ['click'], '3D 주사위 굴리기와 눈금 안착 시연', 'Tumble and roll a 3D dice landing on a random face'),
  'mg-marble-board': m(['shape', 'card', 'navigation'], ['click'], '캐주얼 보드게임 주사위와 말 이동 시연', 'Play a mini board game with dual dice, pawn hops, and landmark animations'),
  'mg-treasure-chest-3d': m(['shape', 'card'], ['click'], '3D 보물상자 열기와 황금빛 빔 루팅 시연', 'Open a 3D treasure chest to reveal radiant beams and floating loot'),
  'mg-lucky-wheel-3d': m(['shape', 'button'], ['click'], '3D 럭키 휠 룰렛 회전과 감속 물리 시연', 'Spin a 3D lucky wheel roulette with deceleration physics and pin flapper'),
  'ly-bento-grid': m(['panel', 'card'], ['click'], '대형과 보조 콘텐츠 타일 배치', 'Arrange primary and supporting content tiles in a bento grid'),
  'ly-masonry-waterfall': m(['list', 'card'], ['click'], '높이가 다른 카드의 워터폴 배치', 'Arrange variable-height cards in fixed waterfall columns'),
  'ly-editorial-asymmetric': m(['image', 'card'], ['hover', 'click'], '비주얼과 정보 카드의 편집형 겹침', 'Overlap a large visual and a small editorial card'),
  'ly-honeycomb-hex': m(['navigation'], ['click'], '육각형 아이콘을 벌집 구조로 선택', 'Select icons arranged in a honeycomb grid'),
  'ly-sticky-scrolltelling': m(['panel'], ['click'], '단계별 설명과 비주얼을 함께 교체', 'Switch explanatory steps and showcase visuals together'),
  'ly-fullpage-snap': m(['panel'], ['click'], '동일 높이 섹션을 클릭 슬라이드로 탐색', 'Browse equal-height sections with click-driven slides'),
  'ly-horizontal-showcase': m(['list', 'card'], ['click'], '가로 카드 쇼케이스를 순환 탐색', 'Browse a horizontal card showcase'),
  'ly-curtain-reveal': m(['panel'], ['click'], '본문 커튼 뒤의 푸터 노출', 'Reveal a stationary footer behind a content curtain'),
  'ly-macos-dock': m(['navigation'], ['hover', 'click'], '호버 아이콘과 이웃 아이콘 확대', 'Magnify a hovered dock icon and its neighbors'),
  'ly-command-palette': m(['navigation', 'panel'], ['click'], '명령 목록 모양 패널에서 행 선택', 'Select a row in a command-palette-shaped panel'),
  'ly-dynamic-island-nav': m(['navigation', 'panel'], ['click'], '캡슐 상태 바를 정보 위젯으로 확장', 'Expand a capsule status bar into an information widget'),
  'ly-radial-pie-menu': m(['navigation'], ['click'], '중앙 버튼 주위에 액션 메뉴 펼치기', 'Fan action buttons around a central menu'),
  'ly-bottom-sheet': m(['panel'], ['click'], '하단 시트를 두 높이로 확장', 'Expand a bottom sheet between two heights'),
  'ly-master-detail-split': m(['panel', 'list'], ['click'], '목록 선택과 상세 패널 연결', 'Connect list selection to an adjacent detail panel'),
  'ly-kanban-board': m(['panel', 'card'], ['click'], '태스크를 상태별 컬럼으로 이동 시연', 'Demonstrate moving a task across workflow columns'),
  'ly-heatmap-grid': m(['chart'], ['click'], '활동 밀도를 셀 농도로 시각화', 'Visualize sample activity density with colored cells'),
  'ly-floating-toc-spy': m(['navigation', 'panel'], ['auto', 'click'], '문서 섹션과 목차 표시 연동 시연', 'Synchronize a document preview with its contents indicator'),
  'ly-collapsible-rail-sidebar': m(['navigation', 'panel'], ['click'], '아이콘 레일과 펼친 사이드바 전환', 'Switch navigation between an icon rail and expanded sidebar'),
  'ly-breadcrumb-folder-drill': m(['navigation', 'list'], ['click'], '샘플 폴더 경로를 탐색하는 브레드크럼', 'Navigate sample folders with a breadcrumb path'),
  'ly-resizable-split-pane': m(['panel'], ['drag', 'click'], '중앙 핸들로 두 패널 너비 조절', 'Resize two panels with a central divider'),
  'st-neo-brutalism': m(['button'], ['click'], '굵은 테두리와 하드 그림자의 버튼 스타일', 'Style a button with bold borders and hard offset shadows'),
  'st-liquid-acrylic': m(['card'], ['auto'], '반투명 아크릴 표면과 이동 조명', 'Combine a translucent acrylic card with moving lights'),
  'st-linear-dark-minimal': m(['card', 'background'], ['static'], '절제된 어두운 카드와 헤어라인', 'Style a restrained dark card with a fine hairline'),
  'st-matte-film-grain': m(['background'], ['static'], '반복 도트로 매트한 필름 질감 추가', 'Add a matte film-like texture with fixed repeating dots'),
  'st-neumorphism-soft': m(['button'], ['click'], '같은 색 표면의 양각과 음각 전환', 'Toggle raised and inset shadows on matching surfaces'),
  'st-claymorphism-3d': m(['card'], ['hover', 'click'], '입체적인 말랑한 클레이 카드', 'Style a puffy clay card with inset highlights'),
  'st-skeuomorphism-tactile': m(['button'], ['click'], 'LED와 깊이감이 있는 하드웨어 버튼', 'Style a tactile hardware button with a status LED'),
  'st-paper-cutout-layer': m(['card'], ['static'], '회전한 종이 레이어의 깊이감', 'Create depth from overlapping rotated paper layers'),
  'st-8bit-pixel-retro': m(['button'], ['click'], '각진 8비트 아케이드 버튼', 'Style a square 8-bit arcade button'),
  'st-win95-retro-os': m(['panel'], ['static'], '고전 윈도우95 창 외형', 'Recreate a classic Windows 95 window appearance'),
  'st-crt-scanline-terminal': m(['panel'], ['static'], '녹색 잔광과 스캔라인 터미널 외형', 'Create a green-phosphor CRT terminal appearance'),
  'st-synthwave-sunset-grid': m(['background'], ['static'], '레트로 황혼과 원근 네온 격자', 'Compose a retro sunset and perspective neon grid'),
  'st-scifi-hud-chamfer': m(['panel'], ['auto'], '모서리가 잘린 SF HUD 프레임', 'Style a chamfered sci-fi HUD frame'),
  'st-architect-blueprint': m(['background', 'panel'], ['static'], '모눈과 치수 라벨의 설계도 외형', 'Style a blueprint with grid lines and decorative dimensions'),
  'st-swiss-editorial-grid': m(['card'], ['static'], '굵은 번호와 헤드라인의 스위스 편집', 'Compose bold numbering and headlines in a Swiss grid'),
  'st-comic-halftone-pop': m(['card'], ['click'], '유색 망점과 말풍선의 만화 스타일', 'Style a comic speech card with colored halftone dots'),
  'st-holographic-foil-card': m(['card'], ['pointer-move', 'click'], '커서에 따라 각도가 바뀌는 무지개 광택', 'Change rainbow foil sheen with cursor position'),
  'st-receipt-thermal-mono': m(['card'], ['click'], '고정폭 영수증과 장식 바코드', 'Style a monospace thermal receipt with a sample barcode'),
  'st-vaporwave-y2k-chrome': m(['panel'], ['click'], '파스텔과 크롬의 Y2K 윈도우', 'Style a Y2K window with pastel colors and chrome accents'),
  'st-cyberpunk-neon-glitch': m(['card'], ['click'], '경고 띠와 네온 액센트의 사이버펑크', 'Style a cyberpunk card with neon accents and hazard stripes'),
  'vd-saas-launch-reel': m(['scene'], ['auto', 'click'], '슬로건 대시보드 CTA의 SaaS 런칭 소개', 'Introduce a SaaS product through slogan, dashboard and CTA scenes'),
  'vd-device-3d-spin': m(['scene'], ['auto', 'click'], '디바이스 목업의 입체 제품 소개', 'Showcase a product with a CSS 3D device mockup'),
  'vd-app-walkthrough-zoom': m(['scene'], ['auto', 'click'], '가상 커서와 줌으로 앱 사용법 소개', 'Explain an app flow with a simulated cursor and zoom'),
  'vd-split-promo-reel': m(['scene'], ['auto', 'click'], '분할 패널과 타이틀의 홍보 시퀀스', 'Promote content through split panels and a central title'),
  'vd-glitch-cut-reel': m(['scene', 'text'], ['auto', 'click'], '제품 스펙을 글리치 컷으로 교체', 'Reveal product specifications with glitch cuts'),
  'vd-stomp-beat-typo': m(['scene', 'text'], ['auto', 'click'], '단어가 비트처럼 착지하는 타이포', 'Land large words with rhythmic stomp motion'),
  'vd-highlight-swipe-reveal': m(['scene', 'text'], ['auto', 'click'], '하이라이트 스와이프로 헤드라인 공개', 'Reveal a headline with a sweeping highlight'),
  'vd-countdown-energetic-intro': m(['scene', 'text'], ['auto', 'click'], '라이브 시작을 알리는 카운트다운', 'Introduce a live event with an energetic countdown'),
  'vd-chat-story-sequence': m(['scene'], ['auto', 'click'], '질문에서 결과까지 채팅 스토리 시연', 'Stage a chat story from question to result'),
  'vd-slot-jackpot-headline': m(['scene', 'text'], ['auto', 'click'], '슬롯 단어가 멈추며 슬로건 완성', 'Assemble a slogan as word reels settle'),
  'vd-animated-bar-race': m(['scene', 'chart'], ['auto', 'click'], '성장 수치를 막대 상승으로 연출', 'Reveal sample growth with rising chart bars'),
  'vd-kpi-counter-explosion': m(['scene', 'chart'], ['auto', 'click'], '여러 KPI 숫자와 진행 바 동시 공개', 'Reveal multiple KPI counters and progress bars together'),
  'vd-node-flow-pipeline': m(['scene', 'shape'], ['auto', 'click'], '노드 사이의 데이터 흐름 모양 시연', 'Demonstrate a glowing packet moving through pipeline nodes'),
  'vd-circular-ring-dashboard': m(['scene', 'chart'], ['auto', 'click'], '동심원 링으로 여러 진행률 표시', 'Show multiple progress values in concentric rings'),
  'vd-funnel-conversion-drop': m(['scene', 'chart'], ['auto', 'click'], '단계별 전환 퍼널과 최종 지표 공개', 'Reveal conversion funnel stages and a final metric'),
  'vd-lower-third-banner': m(['scene', 'text'], ['auto', 'click'], '발표자 이름과 직함의 방송 자막', 'Introduce a speaker with a broadcast name and role banner'),
  'vd-diagonal-shutter-wipe': m(['scene'], ['auto', 'click'], '겹친 대각선 레이어로 장면 전환', 'Transition scenes with layered diagonal wipes'),
  'vd-logo-stinger-outro': m(['scene', 'logo'], ['auto', 'click'], '광선과 충격파로 브랜드 로고 등장', 'Reveal a brand logo with beams and shockwave rings'),
  'vd-audio-spectrum-visualizer': m(['scene', 'chart'], ['auto', 'click'], '오디오 분석 없는 스펙트럼 시각 연출', 'Stage an audio-spectrum visual without actual audio analysis'),
  'vd-breaking-news-ticker': m(['scene', 'text'], ['auto', 'click'], '샘플 속보 헤드라인과 뉴스띠', 'Present sample breaking-news headlines and a scrolling ticker'),
};
export function getSearchMetadata(item: TechniqueItem): SearchMetadata {
  return SEARCH_METADATA[item.id] ?? { targets: [], triggers: [], aliases: { ko: [], en: [] }, useCases: { ko: [], en: [] } };
}
