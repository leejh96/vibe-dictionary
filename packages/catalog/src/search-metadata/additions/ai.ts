import type { SearchMetadata } from '../../search-metadata';

export const AI_SEARCH_METADATA: Record<string, SearchMetadata> = {
  'ai-prompt-box': {
    targets: ['input', 'button', 'card'],
    triggers: ['input', 'click'],
    useCases: {
      ko: ['텍스트 길이에 따라 확장되는 프롬프트 입력창과 모델 전환'],
      en: ['Auto-expanding prompt textarea with model toggle and submission'],
    },
    aliases: {
      ko: ['오토리사이즈 입력창', '프롬프트 인풋', '챗봇 입력창'],
      en: ['autoresize prompt input', 'chat prompt box'],
    },
  },
  'ai-slash-command': {
    targets: ['input', 'panel', 'list'],
    triggers: ['input', 'click'],
    useCases: {
      ko: ['슬래시(/) 문자로 명령어 메뉴를 열고 방향키와 엔터로 자동 완성'],
      en: ['Trigger slash command popover menu with keyboard navigation and autocomplete'],
    },
    aliases: {
      ko: ['슬래시 메뉴', '커맨드 팔레트', '프롬프트 단축키'],
      en: ['slash command palette', 'command popover'],
    },
  },
  'ai-context-pill': {
    targets: ['card', 'panel', 'chart'],
    triggers: ['click'],
    useCases: {
      ko: ['참조 문서 태그 칩을 추가/제거하고 토큰 소모율 게이지를 확인'],
      en: ['Manage context document chips and visualize token window utilization'],
    },
    aliases: {
      ko: ['토큰 사용량 게이지', '컨텍스트 윈도우 바', '문서 태그 칩'],
      en: ['token usage gauge', 'context window bar'],
    },
  },
  'ai-streaming-text': {
    targets: ['text', 'button', 'card'],
    triggers: ['click', 'auto'],
    useCases: {
      ko: ['깜빡이는 펄스 캐럿과 함께 실시간 타이핑 스트리밍 및 중단 제어'],
      en: ['Stream text character-by-character with pulsing caret and stop control'],
    },
    aliases: {
      ko: ['실시간 타이핑 효과', '스트리밍 텍스트', '응답 중지 버튼'],
      en: ['realtime typing stream', 'streaming response'],
    },
  },
  'ai-code-runner': {
    targets: ['panel', 'button', 'card'],
    triggers: ['click'],
    useCases: {
      ko: ['코드 블록의 구문 강조와 탭 전환을 통한 실시간 컴포넌트 미리보기'],
      en: ['Syntax-highlighted code block with one-click copy and live component preview tab'],
    },
    aliases: {
      ko: ['인터랙티브 코드 블록', '코드 미리보기 탭', '컴포넌트 러너'],
      en: ['interactive code block', 'code preview tab'],
    },
  },
  'ai-message-branch': {
    targets: ['card', 'navigation', 'text'],
    triggers: ['click'],
    useCases: {
      ko: ['재생성된 응답 버전들을 이전/다음 분기 네비게이션으로 탐색'],
      en: ['Navigate between regenerated response variations with branch switcher buttons'],
    },
    aliases: {
      ko: ['응답 버전 스위처', '브랜치 네비게이션', '답변 재생성 이력'],
      en: ['response branch switcher', 'version history pagination'],
    },
  },
  'ai-thinking-accordion': {
    targets: ['card', 'panel', 'list'],
    triggers: ['click'],
    useCases: {
      ko: ['AI의 추론 단계와 경과 시간을 접이식 아코디언으로 검토'],
      en: ['Inspect AI reasoning steps and elapsed time in a collapsible accordion'],
    },
    aliases: {
      ko: ['사고 과정 아코디언', '추론 로그 토글', 'Thinking 아코디언'],
      en: ['thinking process accordion', 'chain-of-thought log'],
    },
  },
  'ai-source-citation': {
    targets: ['text', 'card', 'button'],
    triggers: ['hover', 'pointer-move'],
    useCases: {
      ko: ['텍스트 내 인라인 출처 번호 호버 시 원문 요약 팝오버 노출'],
      en: ['Hover inline citation numbers to preview source website and excerpt popover'],
    },
    aliases: {
      ko: ['인라인 출처 팝오버', '참고문헌 칩', '출처 미리보기'],
      en: ['inline source citation', 'reference popover card'],
    },
  },
  'ai-tool-call-card': {
    targets: ['card', 'panel', 'list'],
    triggers: ['click'],
    useCases: {
      ko: ['에이전트 도구 호출의 인자와 실행 상태, 결과 요약을 확인'],
      en: ['Inspect agent tool execution status, parameters, and output results'],
    },
    aliases: {
      ko: ['도구 실행 상태 카드', 'Tool Call 카드', '함수 호출 카드'],
      en: ['agent tool call card', 'function execution card'],
    },
  },
  'ai-human-in-the-loop': {
    targets: ['card', 'button', 'panel'],
    triggers: ['click'],
    useCases: {
      ko: ['위험 작업 실행 전 영향도 요약과 사용자의 승인/거절 액션을 수신'],
      en: ['Prompt human confirmation with risk severity badge before executing critical actions'],
    },
    aliases: {
      ko: ['승인 가드레일 모달', 'Human-in-the-loop 카드', '위험 명령 승인'],
      en: ['human-in-the-loop approval', 'action confirmation card'],
    },
  },
};
