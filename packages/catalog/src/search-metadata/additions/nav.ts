import type { SearchMetadata } from '../../search-metadata';

export const NAV_SEARCH_METADATA = {
  'ly-skip-to-content-nav': {
    targets: ['navigation', 'text'], triggers: ['click'],
    useCases: { ko: ['반복 메뉴를 건너뛰고 현재 본문 제목으로 실제 키보드 포커스 옮기기'], en: ['Bypass repeated menus and move real keyboard focus to the current content heading'] },
    aliases: { ko: ['건너뛰기 링크', '본문 포커스 이동'], en: ['skip navigation link', 'content focus jump'] },
  },
  "ly-priority-overflow-nav": {
  "targets": [
    "navigation",
    "list"
  ],
  "triggers": [
    "click"
  ],
  "useCases": {
    "ko": [
      "두 경로는 남기고 좁은 컨테이너에서만 나머지 목적지를 추가 메뉴로 탐색하기"
    ],
    "en": [
      "Keep two routes visible and browse the remaining destinations in an extra menu only in narrow containers"
    ]
  },
  "aliases": {
    "ko": [
      "우선순위 더보기",
      "넘침 탐색"
    ],
    "en": [
      "Priority+ menu",
      "overflow navigation"
    ]
  }
},
  "ly-grouped-mega-navigation": {
  "targets": [
    "navigation",
    "panel"
  ],
  "triggers": [
    "click"
  ],
  "useCases": {
    "ko": [
      "두 분류의 리소스를 펼쳐 선택한 그림으로 이동하고 트리거로 포커스 돌려주기"
    ],
    "en": [
      "Expand two resource categories, select actual artwork, and return focus to the trigger"
    ]
  },
  "aliases": {
    "ko": [
      "그룹형 메가 메뉴",
      "두 열 리소스 메뉴"
    ],
    "en": [
      "grouped mega menu",
      "two-column resource menu"
    ]
  }
},
  "ly-keyboard-file-tree": {
  "targets": [
    "navigation",
    "list"
  ],
  "triggers": [
    "click"
  ],
  "useCases": {
    "ko": [
      "하나의 탭 진입점에서 방향키로 실제 계층을 이동하고 폴더 펼침과 선택을 함께 관리하기"
    ],
    "en": [
      "Navigate a real hierarchy with arrow keys from one tab stop, keeping folder disclosure and selection coordinated"
    ]
  },
  "aliases": {
    "ko": [
      "키보드 트리뷰",
      "로빙 탭 파일 트리"
    ],
    "en": [
      "keyboard treeview",
      "roving tabindex file tree"
    ]
  }
},
  "ly-visit-history-nav": {
  "targets": [
    "navigation",
    "list"
  ],
  "triggers": [
    "click"
  ],
  "useCases": {
    "ko": [
      "실제 방문 순서대로 문서 공간을 복원하고 새 목적지를 방문할 때만 앞으로 기록 비우기"
    ],
    "en": [
      "Restore document spaces in actual visit order and clear forward history only when visiting a new destination"
    ]
  },
  "aliases": {
    "ko": [
      "로컬 방문 이력",
      "이전 다음 기록"
    ],
    "en": [
      "local navigation history",
      "back forward history"
    ]
  }
},
  "ly-initial-index-nav": {
  "targets": [
    "navigation",
    "list"
  ],
  "triggers": [
    "click"
  ],
  "useCases": {
    "ko": [
      "이름 색인 링크로 이미 렌더링된 목록을 실제 스크롤하고 목표 제목으로 포커스 이동하기"
    ],
    "en": [
      "Use a name index link to scroll an already rendered list and focus the target heading"
    ]
  },
  "aliases": {
    "ko": [
      "초성 바로가기",
      "이름 섹션 점프"
    ],
    "en": [
      "alphabet jump index",
      "name section jump"
    ]
  }
},
  "ly-responsive-header-menu": {
  "targets": [
    "navigation",
    "panel"
  ],
  "triggers": [
    "click"
  ],
  "useCases": {
    "ko": [
      "컨테이너 폭에 따라 같은 탐색 경로를 가로 메뉴와 네이티브 details 메뉴로 전환하기"
    ],
    "en": [
      "Switch the same routes between a horizontal nav and native details menu based on container width"
    ]
  },
  "aliases": {
    "ko": [
      "반응형 전체 메뉴",
      "컨테이너 헤더 메뉴"
    ],
    "en": [
      "container responsive navigation",
      "native disclosure header"
    ]
  }
},
  "ly-bottom-destination-nav": {
  "targets": [
    "navigation"
  ],
  "triggers": [
    "click"
  ],
  "useCases": {
    "ko": [
      "하단의 세 목적지에서 현재 화면 그림과 활성 아이콘 캡슐을 함께 전환하기"
    ],
    "en": [
      "Switch real page artwork and the active icon capsule from three bottom destinations"
    ]
  },
  "aliases": {
    "ko": [
      "하단 목적지 바",
      "바텀 메뉴"
    ],
    "en": [
      "bottom destination bar",
      "bottom nav bar"
    ]
  }
},
  "ly-paginated-document-list": {
  "targets": [
    "navigation",
    "list"
  ],
  "triggers": [
    "click"
  ],
  "useCases": {
    "ko": [
      "이전·다음·번호 버튼으로 실제 문서 페이지를 바꾸고 끝점에서 이동 차단하기"
    ],
    "en": [
      "Change real document pages with previous/next/number buttons and block movement at endpoints"
    ]
  },
  "aliases": {
    "ko": [
      "번호 페이지 탐색",
      "목록 페이지 나누기"
    ],
    "en": [
      "numbered pagination",
      "document list paging"
    ]
  }
},
  "ly-disclosure-sidebar-nav": {
  "targets": [
    "navigation",
    "panel"
  ],
  "triggers": [
    "click"
  ],
  "useCases": {
    "ko": [
      "사이드바의 하위 경로를 접고 펼치며 선택 페이지와 Escape 포커스 복귀 유지하기"
    ],
    "en": [
      "Expand and collapse sidebar routes while preserving the selected page and Escape focus return"
    ]
  },
  "aliases": {
    "ko": [
      "접이식 프로젝트 메뉴",
      "계층 경로 탐색"
    ],
    "en": [
      "disclosure sidebar",
      "collapsible project navigation"
    ]
  }
},
} satisfies Record<string, SearchMetadata>;
