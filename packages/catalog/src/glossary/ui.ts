import type { GlossaryTermBody } from './types';

export const UI_GLOSSARY_DATA: Record<string, GlossaryTermBody> = {
  'skeleton-loading': {
    aliases: {
      ko: ['스켈레톤 UI', '뼈대 화면', '로딩 플레이스홀더', '자리 유지 로딩', '로딩 중 회색 박스'],
      en: ['skeleton screen', 'skeleton placeholder', 'loading placeholder', 'shimmer skeleton', 'content placeholder'],
    },
    text: {
      ko: {
        definition: '데이터가 도착하기 전 최종 카드나 목록과 같은 크기·배치의 빈 뼈대 박스를 먼저 보여 주어 화면이 갑자기 밀리지 않게 하는 로딩 패턴입니다.',
        example: '상품 목록을 불러오는 동안 썸네일 사각형과 두 줄짜리 회색 막대를 실제 카드 높이 그대로 먼저 띄워 두고, 데이터가 오면 같은 자리에서 콘텐츠로 바꿉니다. UI 데모는 형태 전환 시연이며 실제 네트워크 요청을 수행하지 않습니다.',
        promptSnippet: '데이터 로딩 중에는 최종 콘텐츠와 동일한 높이·격자 비율을 가진 스켈레톤 플레이스홀더를 먼저 렌더링하고, aria-busy와 부드러운 불투명도 또는 시머 전환으로 레이아웃 밀림(CLS) 없이 실제 콘텐츠로 교체해 줘. prefers-reduced-motion에서는 애니메이션을 멈춰 줘.',
      },
      en: {
        definition: 'A loading pattern that renders low-fidelity wireframe blocks matching the final layout dimensions before data arrives, preventing sudden layout shifts.',
        example: 'While a product feed fetches, show an avatar circle and two text bars inside the exact final card height, then swap them for real items in place. UI demos illustrate the visual transition without performing real network fetches.',
        promptSnippet: 'While content is loading, render skeleton placeholders matching the exact height and grid proportions of the final layout with aria-busy="true", then swap in loaded content without layout shift while respecting prefers-reduced-motion.',
      },
    },
  },
  'empty-state': {
    aliases: {
      ko: ['빈 화면', '결과 없음 화면', '데이터 없음 안내', '초기 빈 상태', '검색 결과 없을 때'],
      en: ['no results state', 'zero state', 'blank slate', 'no data screen', 'empty list fallback'],
    },
    text: {
      ko: {
        definition: '아직 생성된 항목이 없거나 검색·필터 조건에 맞는 결과가 0건일 때, 이유와 다음 행동을 안내해 사용자가 막히지 않게 돕는 UI 상태입니다.',
        example: '검색어에 맞는 노트가 없을 때 빈 여백만 남기는 대신 "검색 결과가 없습니다" 문구와 [검색어 지우기] 버튼을 함께 두어 바로 전체 목록으로 돌아갈 수 있게 합니다.',
        promptSnippet: '목록이나 검색 결과가 비어 있을 때 단순히 빈 화면을 두지 말고, 처음 생성 전인지 필터/검색 결과 0건인지 원인을 한 줄로 알린 뒤 [검색 초기화] 또는 [새 항목 만들기] 같은 복구 버튼을 바로 제공해 줘.',
      },
      en: {
        definition: 'A dedicated UI state shown when a collection has no items yet or a search/filter returns zero matches, explaining why and offering a clear next action.',
        example: 'When a search finds no matching notes, show a concise "No matching results" message paired with a [Clear search] button that restores the list and returns focus to the search input.',
        promptSnippet: 'Provide a purposeful empty state that distinguishes first-time creation from zero search/filter results, displays a concise status message, and includes a primary recovery action such as resetting filters or creating the first item.',
      },
    },
  },
  'inline-validation': {
    aliases: {
      ko: ['실시간 입력 검사', '입력창 오류 표시', '인라인 에러', '입력 아래 빨간 안내', '폼 즉시 검증'],
      en: ['inline form validation', 'field-level validation', 'live field error', 'input error feedback'],
    },
    text: {
      ko: {
        definition: '폼 전체를 제출하기 전이나 각 입력 필드를 벗어난 직후, 해당 입력창 바로 아래에 오류 원인과 수정 조건을 즉시 표시하는 검증 방식입니다.',
        example: '회원가입 이메일 입력창에서 포커스를 옮긴 뒤 형식이 틀렸을 때만 입력창 아래에 빨간 안내 문구와 aria-invalid 상태를 띄우고, 올바르게 고치면 바로 해제합니다. 이는 클라이언트 입력 안내이며 실제 서버 중복 확인이나 보안 검증을 대체하지 않습니다.',
        promptSnippet: '입력 필드는 첫 blur 또는 제출 시점부터 유효성을 검사해 오류 문구를 입력창 바로 아래에 표시하고 aria-invalid 및 aria-describedby로 연결해 줘. 수정 중 오류가 해소되면 즉시 정상 상태로 복구하되, 타이핑 첫 글자부터 성급히 경고를 띄우지 마.',
      },
      en: {
        definition: 'Field-level validation that displays error reasons and fix guidance directly beside or beneath the relevant input after blur or submission rather than waiting for a separate error page.',
        example: 'Wait until a user blurs the email field before showing an inline format error linked via aria-describedby, then clear the error immediately once corrected. Client-side checks improve usability and never replace real server-side validation.',
        promptSnippet: 'Validate each input on blur or submit (not prematurely on the first keystroke), render concise error text directly below the field linked with aria-invalid and aria-describedby, and clear it immediately when fixed.',
      },
    },
  },
  'progressive-disclosure': {
    aliases: {
      ko: ['단계적 정보 노출', '필요할 때 펼치기', '아코디언 펼침', '고급 옵션 접기', '정보 계층화'],
      en: ['gradual reveal', 'expandable details', 'on-demand details', 'collapsible details', 'layered disclosure'],
    },
    text: {
      ko: {
        definition: '처음에는 핵심 정보와 기본 조작만 간결하게 보여 주고, 세부 설명·고급 설정·부속 항목은 사용자가 요청할 때 펼쳐 보여 주는 정보 설계 원칙입니다.',
        example: '주문 표에서는 주문번호와 상태만 기본 행에 표시하고, 상세 행 확장 버튼을 눌렀을 때만 배송지·결제 수단·처리 이력을 아래로 펼쳐 화면 복잡도를 낮춥니다.',
        promptSnippet: '초기 화면에는 핵심 정보와 주요 액션만 노출하고, 부가 설명이나 고급 옵션은 native button 토글(aria-expanded, aria-controls)로 필요할 때만 펼쳐지도록 점진적 공개 구조로 구성해 줘.',
      },
      en: {
        definition: 'An interaction principle that shows only essential options upfront and reveals secondary details or advanced settings only when the user asks for them.',
        example: 'Show order ID and status in each summary row, and expand shipping address and item breakdown only when the user toggles the row disclosure button.',
        promptSnippet: 'Keep the default view focused on primary information and reveal secondary details or advanced controls on demand using accessible disclosure toggles (aria-expanded and aria-controls).',
      },
    },
  },
  'toast-and-snackbar': {
    aliases: {
      ko: ['토스트 알림', '스낵바 알림', '실행 취소 배너', '잠깐 뜨는 알림', '하단 알림 바'],
      en: ['toast notification', 'snackbar', 'undo snackbar', 'ephemeral notification', 'status toast'],
    },
    text: {
      ko: {
        definition: '사용자 작업의 결과나 짧은 상태 변화를 현재 화면 흐름을 끊지 않고 화면 모서리에 잠깐 띄워 알리거나 실행 취소 액션을 제공하는 일시적 피드백 컴포넌트입니다.',
        example: '문서를 보관함으로 옮긴 직후 하단에 "문서 1건을 보관했습니다 [실행 취소]" 스낵바를 띄워 작업을 확인시켜 주고, 실수한 경우 바로 되돌릴 수 있게 합니다.',
        promptSnippet: '작업 완료나 되돌리기 가능한 삭제 피드백은 모달로 흐름을 막지 말고 role="status"를 갖춘 토스트/스낵바로 표시해 줘. 실행 취소 버튼이 있다면 키보드 포커스와 충분한 대기 시간을 보장해 줘.',
      },
      en: {
        definition: 'A non-blocking temporary banner or floating message used to confirm an action or offer an immediate Undo option without interrupting the user’s current flow.',
        example: 'After archiving a document, display a bottom snackbar saying "Archived 1 document" with an [Undo] button instead of interrupting with a full-screen dialog.',
        promptSnippet: 'Surface non-blocking action confirmations as a toast or snackbar inside an accessible live region (role="status"), ensuring any Undo action remains keyboard-reachable before dismissal.',
      },
    },
  },
  'command-palette': {
    aliases: {
      ko: ['명령 팔레트', '빠른 실행창', '단축키 검색창', 'Cmd+K 메뉴', '슬래시 명령창'],
      en: ['quick launcher', 'command menu', 'Cmd+K palette', 'action switcher', 'slash command menu'],
    },
    text: {
      ko: {
        definition: '키보드 단축키(예: Cmd/Ctrl+K)나 `/` 입력으로 열어 페이지 이동, 검색, 기능 실행을 마우스 없이 빠르게 처리하는 통합 검색형 명령창입니다.',
        example: '협업 툴에서 어느 화면에 있든 Cmd+K를 눌러 "다크 모드 전환", "새 문서 만들기", "최근 프로젝트 열기"를 바로 검색하고 Enter로 실행합니다.',
        promptSnippet: 'Cmd/Ctrl+K로 여닫을 수 있는 커맨드 팔레트를 만들고, 검색 입력과 방향키(ArrowUp/ArrowDown)·Enter 선택·Escape 닫기·포커스 복귀를 모두 키보드만으로 조작할 수 있게 구현해 줘.',
      },
      en: {
        definition: 'A keyboard-first modal launcher (typically opened via Cmd/Ctrl+K or `/`) that lets users search and trigger navigation, settings, or actions from anywhere.',
        example: 'Press Cmd+K inside a workspace app to filter commands like "Switch theme" or "Open project" and execute them immediately with Enter.',
        promptSnippet: 'Build a keyboard-accessible command palette triggered by Cmd/Ctrl+K with live query filtering, ArrowUp/ArrowDown item navigation, Enter execution, Escape dismissal, and focus restoration.',
      },
    },
  },
  'focus-trap': {
    aliases: {
      ko: ['포커스 가두기', '모달 포커스 관리', '키보드 초점 고정', '모달 밖으로 포커스 이탈 방지'],
      en: ['focus containment', 'modal focus lock', 'dialog focus management', 'keyboard focus trap'],
    },
    text: {
      ko: {
        definition: '모달 다이얼로그나 드로어가 열려 있는 동안 Tab 키 이동이 배경 화면으로 빠져나가지 않고 다이얼로그 내부 요소들 사이에서만 순환하도록 제한하고, 닫힐 때 원래 버튼으로 포커스를 돌려주는 접근성 기법입니다.',
        example: '삭제 확인 모달을 열면 포커스가 모달 내부로 들어오고 배경 버튼은 비활성화되며, Escape나 닫기를 누르면 처음 모달을 열었던 버튼으로 초점이 되돌아갑니다.',
        promptSnippet: '모달이나 시트 다이얼로그를 구현할 때 native <dialog> showModal() 또는 포커스 트랩을 적용해 Tab 키가 배경으로 새지 않게 하고, Escape·닫기 버튼 지원과 함께 닫힌 뒤 트리거 요소로 포커스를 복귀시켜 줘.',
      },
      en: {
        definition: 'An accessibility pattern that keeps Tab/Shift+Tab keyboard focus inside an active modal dialog or drawer and returns focus to the triggering element when closed.',
        example: 'Opening a confirmation dialog traps keyboard navigation inside the modal controls; pressing Escape closes it and restores focus to the button that opened it.',
        promptSnippet: 'Use native <dialog> showModal() or an explicit focus trap so Tab navigation stays inside the open modal, support Escape and explicit close controls, and restore focus to the original trigger on close.',
      },
    },
  },
  'virtual-scrolling': {
    aliases: {
      ko: ['목록 가상화', '윈도잉', '대용량 리스트 최적화', '보이는 영역만 렌더링'],
      en: ['list virtualization', 'windowing', 'virtual list', 'windowed rendering'],
    },
    text: {
      ko: {
        definition: '수천~수만 건의 긴 목록에서 전체 스크롤 높이만 유지한 채 현재 화면 뷰포트와 약간의 여유(overscan) 범위에 들어온 행만 DOM에 렌더링해 성능을 지키는 기법입니다.',
        example: '10,000건의 로그 목록을 한 번에 DOM에 올리는 대신 현재 보이는 15행과 위아래 여유 10행만 마운트해 스크롤 버벅임을 줄입니다.',
        promptSnippet: '행 수가 많은 긴 목록에는 전체 스크롤 높이를 빈 스페이서로 유지하면서 현재 뷰포트 주변과 overscan 행만 DOM에 렌더링하는 가상 스크롤을 적용하고, aria-setsize와 aria-posinset으로 전체 순번을 유지해 줘.',
      },
      en: {
        definition: 'A rendering optimization that preserves full scroll height while mounting only the visible rows plus a small overscan buffer in the DOM.',
        example: 'Instead of rendering 10,000 chat or log rows at once, mount only the ~25 rows near the current scroll position while keeping native scrollbar proportions accurate.',
        promptSnippet: 'Virtualize large lists by mounting only visible rows plus an overscan buffer between top/bottom spacer elements, preserving exact scroll height and aria-setsize/aria-posinset semantics.',
      },
    },
  },
  'call-to-action': {
    aliases: {
      ko: ['CTA', '콜투액션', '행동 유도 버튼', '주요 행동 버튼', '핵심 전환 요소'],
      en: ['CTA', 'call to action button', 'primary action', 'conversion trigger', 'action link'],
    },
    text: {
      ko: {
        definition: '사용자가 현재 화면에서 취해야 할 다음 핵심 행동을 명확하게 안내하는 버튼이나 링크 등의 인터랙션 요소입니다. 버튼의 겉모양이나 고정 위치가 아니라 행동 유도라는 목적에 의해 정의되며, 플로팅 액션 버튼(FAB)과 같은 의미가 아닙니다.',
        example: '요금제 안내 화면 상단의 "14일 체험 시작하기" 기본 버튼과 비교표 아래 "맞춤 플랜 문의하기" 링크처럼, 형태와 관계없이 사용자의 다음 핵심 행동을 분명한 동사형 문구로 제시합니다.',
        promptSnippet: '화면의 핵심 목표에 맞춰 주 행동(Primary CTA)과 보조 행동(Secondary CTA)의 시각적 위계를 명확히 구분해 줘. 버튼뿐 아니라 링크 형태도 CTA로 사용할 수 있으며, 구체적인 동사형 레이블과 충분한 명도 대비·키보드 포커스 표시·터치 영역을 함께 확보해 줘.',
      },
      en: {
        definition: 'An interface element—such as a button or link—that clearly guides the user toward the next core action on a screen. It is defined by its intent rather than a button shape or placement, and is not synonymous with a floating action button (FAB).',
        example: 'On a pricing screen, a high-contrast "Start 14-day trial" primary button and a "Contact for custom plan" link below the comparison table both serve as CTAs by clearly directing the next step with action verbs.',
        promptSnippet: 'Establish clear visual hierarchy between the primary CTA and secondary actions using specific verb-driven labels, accessible contrast, visible keyboard focus indicators, and adequate hit targets whether the CTA is rendered as a button or a link.',
      },
    },
  },
  'floating-action-button': {
    aliases: {
      ko: ['FAB', '플로팅 버튼', '떠 있는 작업 버튼', '우하단 고정 생성 버튼', '플로팅 액션'],
      en: ['FAB', 'floating button', 'primary floating button', 'floating action'],
    },
    text: {
      ko: {
        definition: '화면 콘텐츠 위에 떠 있는 형태로 배치되어 해당 화면의 가장 대표적인 생성·작성·핵심 작업을 즉시 실행하는 버튼입니다. CTA가 행동 유도라는 목적을 뜻하는 반면 FAB는 콘텐츠 위에 떠 있는 버튼의 형태·배치를 가리키므로 FAB도 CTA 역할을 할 수 있으며, 모든 position: fixed 버튼이 FAB에 해당하는 것은 아닙니다.',
        example: '노트 목록 화면 오른쪽 아래에 떠 있는 "+ 새 노트" 버튼이 스크롤 중에도 작성 화면을 바로 열어 주는 경우로, 하단 고정 툴바나 일반 본문 CTA 버튼과는 구분됩니다.',
        promptSnippet: '화면의 대표 작업 하나만 플로팅 액션 버튼(FAB)으로 배치하고, 본문 마지막 항목이나 하단 컨트롤이 가려지지 않도록 스크롤 여백을 충분히 확보해 줘. 충분한 터치 영역(예: 최소 44x44px)과 명확한 aria-label, 논리적인 키보드 포커스 순서를 함께 보장해 줘.',
      },
      en: {
        definition: 'A prominent primary action button that floats above screen content to trigger the screen’s single most representative task. While CTA describes the purpose of prompting user action, FAB refers to a floating button form and placement—so a FAB can also serve as a CTA, and not every position: fixed button is a FAB.',
        example: 'A "+ New note" button floating at the bottom-right corner of a notes feed stays reachable while scrolling to open the composer, distinct from an inline CTA or a sticky bottom toolbar.',
        promptSnippet: 'Use a floating action button (FAB) only for the screen’s single primary action, reserve bottom scroll padding so it never occludes underlying content or controls, provide an adequate touch target (e.g., at least 44x44px), and ensure logical keyboard focus order with a clear accessible label.',
      },
    },
  },
  'safe-area': {
    aliases: {
      ko: ['세이프 에어리어', '안전 여백', '노치 여백', '홈 인디케이터 여백', '안전 영역 인셋'],
      en: ['safe area inset', 'notch safe margin', 'viewport safe area', 'home indicator inset'],
    },
    text: {
      ko: {
        definition: '기기의 노치, 둥근 화면 모서리, 하단 홈 인디케이터 바 등에 콘텐츠나 조작 요소가 가려지지 않도록 비워 두는 영역입니다. 고정 픽셀 수치로 획일화하기보다 기본 여백에 CSS env(safe-area-inset-bottom) 등 환경 변수를 필요에 맞게 결합해 대응합니다.',
        example: '모바일 하단 고정 바의 아래쪽 여백에 기본 16px 패딩과 env(safe-area-inset-bottom)을 더해, 홈 인디케이터가 있는 기기에서도 버튼이 가려지지 않게 유지합니다.',
        promptSnippet: '노치·둥근 화면 모서리·홈 인디케이터가 상하단 고정 바나 가장자리 콘텐츠를 가리지 않도록, 고정 픽셀 값에만 의존하지 말고 기본 padding·margin에 env(safe-area-inset-bottom) 등 CSS 안전 영역 변수를 필요에 맞게 조합해 적용해 줘.',
      },
      en: {
        definition: 'The region reserved so content and interactive controls are not obscured by device notches, rounded screen corners, or home indicator bars. Instead of prescribing fixed pixel offsets, combine base padding or margins with CSS variables like env(safe-area-inset-bottom) as needed.',
        example: 'A sticky mobile bottom bar adds env(safe-area-inset-bottom) to its base 16px bottom padding so action buttons clear the home indicator without adding excess space on standard screens.',
        promptSnippet: 'Keep edge-to-edge content and fixed bars clear of notches, rounded corners, and home indicator bars by combining base padding or margins with CSS safe-area environment variables such as env(safe-area-inset-bottom) as needed rather than hardcoding fixed pixel offsets.',
      },
    },
  },
  'container-query': {
    aliases: {
      ko: ['콘테이너 쿼리', '컨테이너 크기 쿼리', '컴포넌트 기준 반응형'],
      en: ['container queries', '@container', 'container-type'],
    },
    text: {
      ko: {
        definition: '뷰포트 전체 너비 대신 지정한 상위 컨테이너의 크기나 스타일을 기준으로 내부 레이아웃을 바꾸는 CSS(Cascading Style Sheets) 규칙입니다. 같은 카드나 위젯이 사이드바와 본문 등 서로 다른 폭의 영역에 배치될 때 좁은 기본 레이아웃을 유지한 채 공간이 넓어질 때만 배치를 확장하도록 제어합니다.',
        example: '상품 요약 카드는 상위 열에 inline-size 컨테이너를 선언해 기본적으로 세로 1열로 쌓고, 할당 폭이 넓어질 때만 썸네일과 설명을 가로 배치로 전환해 사이드바와 메인 그리드 양쪽에서 깨지지 않게 합니다.',
        promptSnippet: '카드나 패널처럼 배치 위치에 따라 폭이 달라지는 컴포넌트는 뷰포트 기준 대신 상위 래퍼에 container-type: inline-size를 선언하고 좁은 기본 레이아웃에서 @container (min-width: ...) 조건으로만 가로 확장이나 보조 열을 열도록 구현하세요.',
      },
      en: {
        definition: 'A Cascading Style Sheets (CSS) rule that adapts an element’s layout to a designated ancestor container’s dimensions rather than the browser viewport. It keeps a narrow-first default layout and expands to wider arrangements only when the surrounding container provides enough space.',
        example: 'A media card wrapper declares container-type: inline-size so the card stacks vertically by default in narrow sidebars and switches to a horizontal row only inside wider main grid tracks.',
        promptSnippet: 'For reusable cards or widgets placed across varying column widths, define container-type: inline-size on an ancestor wrapper, keep a narrow-first base layout, and switch to horizontal or multi-column tracks via @container rules instead of viewport media queries.',
      },
    },
  },
  'responsive-breakpoint': {
    aliases: {
      ko: ['반응형 브레이크포인트', '화면 폭 분기점', '미디어 쿼리 분기점'],
      en: ['breakpoints', 'responsive breakpoints', 'media query breakpoint'],
    },
    text: {
      ko: {
        definition: '화면이나 컨테이너의 크기가 특정 임계값을 넘을 때 열 수, 여백, 탐색 구조를 전환하는 기준 폭입니다. 기기 브랜드 이름이 아니라 콘텐츠가 겹치거나 줄 바꿈이 어색해지는 지점에 맞춰 분기점을 정합니다.',
        example: '문서 목록 페이지가 작은 화면에서는 1열 카드로 보이고, 표와 필터를 나란히 둘 수 있는 폭 이상에서만 2단 레이아웃으로 전환되도록 분기점을 설정합니다.',
        promptSnippet: '특정 기기 해상도를 가정하지 말고 콘텐츠가 좁아져 겹치거나 가독성이 떨어지는 지점에 맞춰 반응형 중단점을 정의하며, 모바일 기준 기본 레이아웃 위에서 점진적으로 열과 간격을 확장하세요.',
      },
      en: {
        definition: 'A threshold width at which a layout adjusts column counts, spacing, or navigation structure. Breakpoints should follow where the content actually crowds or breaks rather than fixed device names.',
        example: 'A catalog view stays single-column on narrow screens and shifts to a sidebar-plus-grid arrangement only once the width comfortably accommodates both filter controls and readable cards.',
        promptSnippet: 'Define responsive breakpoints based on where layout wrapping or crowding occurs rather than device brands, starting from a single-column base layout and progressively adding columns and spacing.',
      },
    },
  },
  'aspect-ratio': {
    aliases: {
      ko: ['화면 비율', '가로세로 비율', '비율 고정 프레임'],
      en: ['aspect ratio', 'aspect-ratio css', 'aspect ratio box'],
    },
    text: {
      ko: {
        definition: '이미지, 영상, 카드 프레임의 가로와 세로 길이 비율을 일정하게 유지하는 속성입니다. 리소스가 불러와지기 전부터 슬롯 크기를 예약해 주변 요소가 아래로 밀리는 현상을 줄입니다.',
        example: '썸네일 갤러리 카드 이미지 래퍼에 aspect-ratio: 16 / 9와 object-fit: cover를 함께 적용해 각 이미지의 원본 비율이 달라도 카드 행 높이를 일정하게 맞춥니다.',
        promptSnippet: '이미지나 미디어 카드 슬롯에는 명시적인 aspect-ratio와 object-fit 규칙을 지정해 콘텐츠 로드 전후에도 프레임 크기가 흔들리지 않게 유지하세요.',
      },
      en: {
        definition: 'The proportional relationship between an element’s width and height, such as 16:9 or 4:3. Setting an explicit aspect ratio reserves box height before media finishes loading so surrounding content does not jump.',
        example: 'A thumbnail grid applies CSS aspect-ratio: 16 / 9 with object-fit: cover on media frames so mixed-dimension photos align into uniform rows without clipping key layout geometry.',
        promptSnippet: 'Apply explicit aspect-ratio sizing and appropriate object-fit framing to image, video, and card media slots so their layout dimensions are reserved before media loads.',
      },
    },
  },
  'keyboard-focus-indicator': {
    aliases: {
      ko: ['포커스 링', '키보드 포커스 윤곽선', '포커스 표시기'],
      en: ['focus indicator', 'focus ring', 'focus-visible outline'],
    },
    text: {
      ko: {
        definition: 'Tab 키 등 키보드 탐색 중 현재 선택된 대화형 요소가 어디인지 눈에 띄는 외곽선이나 대비 변화로 알려 주는 시각 표시입니다. 마우스 클릭 시 불필요한 테두리를 줄이려면 :focus-visible을 활용하되 키보드 포커스 표시는 절대 가리지 않아야 합니다.',
        example: '버튼과 입력 필드에 outline: none을 단독으로 쓰지 않고 :focus-visible 상태에서 배경과 충분한 명도 대비를 갖는 2px 외곽선과 offset을 표시해 키보드 사용자가 현재 위치를 바로 파악하게 합니다.',
        promptSnippet: '모든 대화형 버튼, 링크, 입력 요소에 배경과 대비가 뚜렷한 :focus-visible 포커스 표시를 제공하고, 대체 스타일 없이 outline을 제거하지 마세요.',
      },
      en: {
        definition: 'A visible outline or highlight showing which interactive control currently receives keyboard focus during Tab or arrow navigation. Using :focus-visible keeps keyboard focus unmistakably clear without adding distracting rings on pointer clicks.',
        example: 'Buttons and form inputs retain a high-contrast 2px :focus-visible outline with offset against both light and dark surfaces instead of stripping outline with outline: none.',
        promptSnippet: 'Ensure every interactive link, button, tab, and form field displays a high-contrast :focus-visible indicator with clear offset, and never remove focus outlines without an equally visible replacement.',
      },
    },
  },
  'skip-link': {
    aliases: {
      ko: ['본문 바로가기 링크', '스킵 네비게이션', '스킵 링크'],
      en: ['skip navigation link', 'skip to content', 'bypass block link'],
    },
    text: {
      ko: {
        definition: '페이지 최상단에 두어 키보드나 스크린 리더 사용자가 반복되는 헤더 메뉴를 건너뛰고 본문 영역으로 즉시 이동할 수 있게 하는 링크입니다. 평소에는 화면 밖에 숨겨 두더라도 포커스를 받으면 즉시 보이게 노출해야 합니다.',
        example: '페이지 첫 Tab 입력 시 "본문으로 건너뛰기" 링크가 좌측 상단에 나타나고, 선택하면 main 요소의 앵커로 포커스와 스크롤이 바로 이동합니다.',
        promptSnippet: '반복적인 상단 내비게이션이 있는 페이지 최상단에 포커스 시 명확히 드러나는 건너뛰기 링크를 배치해 키보드 사용자가 메인 콘텐츠 랜드마크로 바로 이동할 수 있게 구현하세요.',
      },
      en: {
        definition: 'An anchor placed at the very start of a page that lets keyboard and screen-reader users bypass repeated header navigation and jump straight to the main content landmark. It can stay visually hidden until focused, when it must become clearly visible.',
        example: 'Pressing Tab upon entering a documentation page reveals a "Skip to main content" link at the top corner that moves focus directly to the main landmark.',
        promptSnippet: 'Place a skip link as the first focusable control in the page that becomes visibly styled on :focus-visible and moves keyboard focus directly to the main content region.',
      },
    },
  },
  breadcrumb: {
    aliases: {
      ko: ['이동 경로 탐색', '경로 표시줄', '빵 부스러기 탐색'],
      en: ['breadcrumbs', 'breadcrumb trail', 'hierarchy path'],
    },
    text: {
      ko: {
        definition: '현재 화면이 계층 구조의 어느 단계에 있는지 상위 폴더나 카테고리를 순서대로 보여 주는 보조 탐색 경로입니다. 사용자가 전체 메뉴를 다시 열지 않고도 원하는 상위 단계로 한 번에 되돌아갈 수 있게 돕습니다.',
        example: '문서 상세 화면 상단에 "홈 > 가이드 > 성능" 경로를 nav[aria-label]과 목록 구조로 표시하고, 현재 항목에는 aria-current="page"를 부여하며 좁은 화면에서는 중간 단계를 생략해 줄 넘침을 막습니다.',
        promptSnippet: '계층형 페이지나 폴더 구조 상단에 상위 경로를 연결하는 브레드크럼 내비게이션을 제공하고, 현재 항목에는 aria-current="page"를 지정하며 좁은 폭에서는 중간 경로를 안전하게 축약하세요.',
      },
      en: {
        definition: 'A secondary navigation trail showing a user’s position within a hierarchy of categories or folders. It lets users jump directly back to any parent level without retracing multiple back steps.',
        example: 'A workspace folder view renders semantic breadcrumb links inside a labeled nav element, marks the active leaf with aria-current="page", and collapses middle segments on narrow screens.',
        promptSnippet: 'Implement hierarchical navigation paths with a labeled nav breadcrumb list, linking ancestor levels, marking the current item with aria-current="page", and safely truncating middle items in narrow layouts.',
      },
    },
  },
  tooltip: {
    aliases: {
      ko: ['말풍선 안내', '부연 설명 팝업', '툴팁 도움말'],
      en: ['tooltips', 'hint popover', 'accessible tooltip'],
    },
    text: {
      ko: {
        definition: '아이콘 버튼이나 축약된 레이블 위에 마우스를 올리거나 키보드 포커스가 머물 때 짧은 보조 설명을 띄우는 작은 오버레이입니다. 긴 본문이나 필수 조작 버튼은 툴팁 안에 숨기지 않고 화면에 직접 두거나 별도 패널로 분리합니다.',
        example: '아이콘 전용 복사 버튼에 hover와 focus-visible 모두에서 열리는 짧은 텍스트 툴팁을 role="tooltip"과 aria-describedby로 연결하고 Escape 키로 즉시 닫을 수 있게 합니다.',
        promptSnippet: '아이콘이나 약어 레이블의 보조 설명에만 툴팁을 사용하고, 마우스 hover뿐 아니라 키보드 focus에서도 나타나며 Escape로 닫히고 aria-describedby로 연결되도록 구현하세요.',
      },
      en: {
        definition: 'A brief contextual overlay that reveals a short text label or hint when a user hovers over or focuses on a control. Essential instructions, interactive links, and long prose belong outside tooltips so touch and keyboard users are not blocked.',
        example: 'An icon-only toolbar action reveals a concise hint tooltip on both pointer hover and keyboard focus via aria-describedby, dismissing immediately on Escape.',
        promptSnippet: 'Use tooltips strictly for concise supplementary hints, triggering on both hover and keyboard focus, linking the text via aria-describedby, and closing on Escape without placing interactive controls inside.',
      },
    },
  },
  'tab-panel': {
    aliases: {
      ko: ['탭 전환 패널', '탭 UI', '탭 콘텐츠 영역'],
      en: ['tabs panel', 'tabbed interface', 'tablist tabpanel'],
    },
    text: {
      ko: {
        definition: '같은 영역 안에서 주제나 보기 방식을 전환하는 탭 목록(tablist)과 선택된 탭에 대응하는 콘텐츠 영역(tabpanel)으로 이루어진 UI(User Interface) 패턴입니다. 새 경로로 이동하는 링크 탐색과 구분해 한 화면 내 콘텐츠 전환에 쓰며 좌우 방향키 이동과 선택 상태를 명확히 관리합니다.',
        example: '설정 화면에서 "일반", "알림", "보안" 탭을 role="tablist", role="tab", role="tabpanel"로 연결해 좌우 방향키로 포커스를 옮기고 선택된 패널만 표시합니다.',
        promptSnippet: '한 화면 안에서 보기나 섹션을 전환할 때는 role="tablist", role="tab", role="tabpanel"과 aria-selected·aria-controls 연결을 갖추고 방향키 탐색이 동작하는 탭 패널을 구현하세요.',
      },
      en: {
        definition: 'A User Interface (UI) pattern pairing a set of tab controls (tablist) with switchable content regions (tabpanel) inside the same view. Unlike page-navigation links, tabs toggle peer sections in place and support arrow-key switching with explicit selected state.',
        example: 'A metrics drawer pairs "Overview", "Funnel", and "Raw Table" tabs using role="tablist", role="tab", and role="tabpanel" linked by aria-controls so arrow keys switch panels cleanly.',
        promptSnippet: 'Build tab interfaces for switching in-page views with proper role="tablist", role="tab", and role="tabpanel" attributes, synchronized aria-selected/aria-controls bindings, and keyboard arrow-key navigation.',
      },
    },
  },
  'faceted-filter': {
    aliases: {
      ko: ['다중 속성 필터', '조건별 필터 칩', '속성 필터링'],
      en: ['faceted search', 'multi-attribute filter', 'filter facets'],
    },
    text: {
      ko: {
        definition: '카테고리, 상태, 가격대 등 여러 속성 축을 동시에 조합해 목록을 좁혀 가는 필터 방식입니다. 현재 적용 중인 조건을 배지나 칩으로 드러내고 개별 해제 및 전체 초기화 경로를 함께 제공합니다.',
        example: '템플릿 탐색기에서 영역, 난이도, 지원 형식 필터를 다중 선택하면 일치하는 항목 수와 선택된 조건 칩이 즉시 갱신되고 각 칩 버튼으로 조건을 하나씩 지울 수 있습니다.',
        promptSnippet: '여러 속성 조건을 조합하는 목록에는 선택 가능한 패싯 옵션과 결과 개수, 현재 적용된 필터 칩, 그리고 개별 해제·전체 초기화 버튼을 함께 제공하세요.',
      },
      en: {
        definition: 'A filtering pattern that narrows a collection across multiple independent attributes—such as category, status, or format—at the same time. Showing matching counts and removable active filter chips prevents users from losing track of applied constraints.',
        example: 'A catalog directory lets users combine domain and format checkboxes while updating result counts and displaying removable active filter chips with a single reset action.',
        promptSnippet: 'Design multi-attribute filtering with clear facet groups, live match counts when feasible, removable active filter chips, and an accessible clear-all action.',
      },
    },
  },
  pagination: {
    aliases: {
      ko: ['페이지네이션', '페이지 분할 탐색', '쪽 나누기'],
      en: ['page navigation', 'paged list', 'page controls'],
    },
    text: {
      ko: {
        definition: '많은 항목을 한 번에 모두 그리지 않고 일정 단위 페이지로 나누어 탐색하게 하는 방식입니다. 사용자가 현재 위치와 전체 페이지 규모를 가늠하고 특정 페이지나 이전·다음 페이지로 예측 가능하게 이동할 수 있습니다.',
        example: '검색 결과 240건을 페이지당 20건씩 나누어 이전/다음 버튼과 현재 페이지 표시(aria-current="page")를 제공하고, 목록 끝의 푸터 링크에도 쉽게 닿을 수 있게 합니다.',
        promptSnippet: '대량 목록에서 항목 위치 참조나 푸터 접근이 중요하다면 페이지 크기, 현재 페이지 표시(aria-current="page"), 이전/다음 비활성 경계 처리가 명확한 페이지 나누기를 구현하세요.',
      },
      en: {
        definition: 'Dividing a large result set into fixed-size pages with explicit controls to move between them. Compared to endless streams, pagination preserves footer access and lets users bookmark or revisit specific positions.',
        example: 'A document directory displays 20 records per page with disabled boundary buttons on the first and last pages and marks the active page control using aria-current="page".',
        promptSnippet: 'Implement pagination controls with predictable page size, boundary-disabled previous/next buttons, and aria-current="page" on the active page indicator.',
      },
    },
  },
};
