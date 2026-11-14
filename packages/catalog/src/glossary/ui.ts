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
};
