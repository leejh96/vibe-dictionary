import type { SearchMetadata } from '../../search-metadata';

export const LAYOUT_SEARCH_METADATA = {
  "closable-document-tabs": {
    "targets": [
      "navigation",
      "panel"
    ],
    "triggers": [
      "click"
    ],
    "useCases": {
      "ko": [
        "예시 문서를 닫은 뒤 인접 탭으로 포커스를 옮기고 마지막 문서를 닫으면 복원하기"
      ],
      "en": [
        "Close example documents, move focus to an adjacent tab, and restore after closing the last document."
      ]
    },
    "aliases": {
      "ko": [
        "닫을 수 있는 탭",
        "문서 작업공간 탭"
      ],
      "en": [
        "dismissible document tabs",
        "workspace document tabs"
      ]
    }
  },
  "sticky-announcement-banner": {
    "targets": [
      "list",
      "panel"
    ],
    "triggers": [
      "static"
    ],
    "useCases": {
      "ko": [
        "독립 목록을 실제 스크롤할 때 추천 배너를 상단에 유지하기"
      ],
      "en": [
        "Keep a recommendation banner at the top while its independent list scrolls natively."
      ]
    },
    "aliases": {
      "ko": [
        "스티키 추천 띠",
        "고정 알림 배너"
      ],
      "en": [
        "sticky recommendation strip",
        "sticky notice banner"
      ]
    }
  },
  "folded-edge-ribbon": {
    "targets": [
      "card",
      "text"
    ],
    "triggers": [
      "static"
    ],
    "useCases": {
      "ko": [
        "컬렉션 카드 가장자리에 접힌 배지로 새 소식을 표시하기"
      ],
      "en": [
        "Mark news on a collection card with a folded edge badge."
      ]
    },
    "aliases": {
      "ko": [
        "접힌 리본 배지",
        "노치 리본 태그"
      ],
      "en": [
        "folded ribbon badge",
        "notched ribbon tag"
      ]
    }
  },
  "vertical-rail-tabs": {
    "targets": [
      "navigation",
      "panel"
    ],
    "triggers": [
      "click"
    ],
    "useCases": {
      "ko": [
        "세로 탭을 클릭하거나 위아래 키로 문서와 색상 패널을 선택하기"
      ],
      "en": [
        "Select document and color panels with a vertical rail using clicks or up/down keys."
      ]
    },
    "aliases": {
      "ko": [
        "사이드 레일 탭",
        "수직 콘텐츠 탭"
      ],
      "en": [
        "side rail tabs",
        "vertical content tabs"
      ]
    }
  },
  "dot-wave-waiting-bubble": {
    "targets": [
      "panel",
      "shape"
    ],
    "triggers": [
      "auto"
    ],
    "useCases": {
      "ko": [
        "세 점의 CSS 파동으로 응답 대기 모양을 시연하기"
      ],
      "en": [
        "Demonstrate a waiting-for-response appearance with a CSS wave of three dots."
      ]
    },
    "aliases": {
      "ko": [
        "세 점 대기 표시",
        "타이핑 버블"
      ],
      "en": [
        "three-dot waiting indicator",
        "typing bubble"
      ]
    }
  },
  "stable-skeleton-content": {
    "targets": [
      "card",
      "button"
    ],
    "triggers": [
      "click",
      "auto"
    ],
    "useCases": {
      "ko": [
        "버튼으로 같은 크기의 스켈레톤과 예시 콘텐츠를 전환하며 자리 이동 없는 로딩 형태를 비교하기"
      ],
      "en": [
        "Toggle equal-sized skeleton and example content states to compare loading without layout shifts."
      ]
    },
    "aliases": {
      "ko": [
        "자리 고정 스켈레톤",
        "레이아웃 유지 로딩"
      ],
      "en": [
        "stable skeleton transition",
        "layout-preserving loading"
      ]
    }
  },
  "manual-banner-carousel": {
    "targets": [
      "panel",
      "navigation"
    ],
    "triggers": [
      "click"
    ],
    "useCases": {
      "ko": [
        "이전·다음 버튼으로 세 예시 배너를 수동 순환하며 현재 슬라이드만 전달하기"
      ],
      "en": [
        "Manually cycle three example banners with previous/next buttons while exposing only the current slide."
      ]
    },
    "aliases": {
      "ko": [
        "수동 슬라이드 배너",
        "버튼 배너 순환"
      ],
      "en": [
        "manual slide banner",
        "button-controlled carousel"
      ]
    }
  },
  "circular-sweep-spinner": {
    "targets": [
      "shape"
    ],
    "triggers": [
      "auto"
    ],
    "useCases": {
      "ko": [
        "회전과 호 길이 CSS 애니메이션으로 완료율 없는 원형 로딩을 시연하기"
      ],
      "en": [
        "Demonstrate indeterminate circular loading using CSS rotation and arc-length animation."
      ]
    },
    "aliases": {
      "ko": [
        "스윕 로더",
        "불확정 원형 로딩"
      ],
      "en": [
        "sweep loader",
        "indeterminate circular loading"
      ]
    }
  },
  "indeterminate-linear-loader": {
    "targets": [
      "shape"
    ],
    "triggers": [
      "auto"
    ],
    "useCases": {
      "ko": [
        "두 막대의 CSS 반복 이동으로 완료율을 모르는 선형 로딩을 시연하기"
      ],
      "en": [
        "Demonstrate linear loading with unknown progress through two repeatedly moving CSS bars."
      ]
    },
    "aliases": {
      "ko": [
        "불확정 진행 막대",
        "순환 선형 로딩"
      ],
      "en": [
        "indeterminate progress bar",
        "looping linear loading"
      ]
    }
  },
  "underline-content-tabs": {
    "targets": [
      "navigation",
      "panel"
    ],
    "triggers": [
      "click"
    ],
    "useCases": {
      "ko": [
        "문서와 색상 패널을 가로 탭의 클릭·좌우 키로 선택하고 밑줄로 현재 위치를 표시하기"
      ],
      "en": [
        "Select document and color panels by clicking horizontal tabs or using left/right keys, with an underline marking selection."
      ]
    },
    "aliases": {
      "ko": [
        "밑줄 콘텐츠 탭",
        "가로 패널 탭"
      ],
      "en": [
        "underlined content tabs",
        "horizontal panel tabs"
      ]
    }
  }
} satisfies Record<string, SearchMetadata>;
