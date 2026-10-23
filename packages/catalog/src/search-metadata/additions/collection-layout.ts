import type { SearchMetadata } from '../../search-metadata';

export const LAYOUT_COLLECTION_SEARCH: Record<string, SearchMetadata> = {
  "ly-circular-thumbnail-gallery": {
    "targets": [
      "list"
    ],
    "triggers": [
      "click"
    ],
    "useCases": {
      "ko": [
        "둘레의 썸네일을 선택하면 가운데 미리보기가 바뀌는 원형 배치"
      ],
      "en": [
        "Selecting a perimeter thumbnail updates the central preview"
      ]
    },
    "aliases": {
      "ko": [
        "원형 썸네일 갤러리",
        "원형 갤러리",
        "링 배치"
      ],
      "en": [
        "Circular Thumbnail Gallery",
        "circular gallery",
        "ring layout"
      ]
    }
  },
  "ly-triangle-tessellation-grid": {
    "targets": [
      "list"
    ],
    "triggers": [
      "static"
    ],
    "useCases": {
      "ko": [
        "위아래 삼각형을 맞물려 빈틈없이 채우는 기하학 배치"
      ],
      "en": [
        "Alternating upright and inverted triangles tile a geometric field"
      ]
    },
    "aliases": {
      "ko": [
        "삼각 타일 테셀레이션",
        "삼각 그리드",
        "테셀레이션"
      ],
      "en": [
        "Triangle Tile Tessellation",
        "triangle grid",
        "tessellation"
      ]
    }
  },
  "ly-justified-image-rows": {
    "targets": [
      "image"
    ],
    "triggers": [
      "static"
    ],
    "useCases": {
      "ko": [
        "서로 다른 비율의 썸네일이 행마다 같은 높이로 양끝을 채우는 배치"
      ],
      "en": [
        "Different thumbnail proportions fill equal-height rows from edge to edge"
      ]
    },
    "aliases": {
      "ko": [
        "양끝 정렬 이미지 행",
        "정렬 갤러리",
        "동일 높이 사진"
      ],
      "en": [
        "Justified Image Rows",
        "justified gallery",
        "equal height photos"
      ]
    }
  },
  "ly-overlap-editorial-grid": {
    "targets": [
      "panel"
    ],
    "triggers": [
      "static"
    ],
    "useCases": {
      "ko": [
        "큰 제목이 이미지 열을 가로질러 겹치는 잡지형 구성"
      ],
      "en": [
        "An oversized headline overlaps image columns in a magazine-style layout"
      ]
    },
    "aliases": {
      "ko": [
        "겹침 에디토리얼 그리드",
        "오버랩 레이아웃",
        "잡지 제목"
      ],
      "en": [
        "Overlapping Editorial Grid",
        "overlap layout",
        "magazine heading"
      ]
    }
  },
  "ly-alternating-feature-rows": {
    "targets": [
      "panel"
    ],
    "triggers": [
      "static"
    ],
    "useCases": {
      "ko": [
        "이미지와 설명의 좌우 순서를 번갈아 바꾸는 기능 소개 배치"
      ],
      "en": [
        "Feature rows alternate the image and text order"
      ]
    },
    "aliases": {
      "ko": [
        "교차형 기능 소개 행",
        "교차 행",
        "기능 소개 배치"
      ],
      "en": [
        "Alternating Feature Rows",
        "alternating rows",
        "feature layout"
      ]
    }
  },
  "ly-perspective-text-crawl": {
    "targets": [
      "text"
    ],
    "triggers": [
      "auto",
      "click"
    ],
    "useCases": {
      "ko": [
        "기울어진 글자가 위쪽 소실점으로 흐르는 오프닝 배치"
      ],
      "en": [
        "Tilted text moves toward an upper vanishing point"
      ]
    },
    "aliases": {
      "ko": [
        "원근 텍스트 크롤",
        "원근 크롤",
        "오프닝 텍스트"
      ],
      "en": [
        "Perspective Text Crawl",
        "perspective crawl",
        "opening text"
      ]
    }
  },
  "ly-sticky-stacked-cards": {
    "targets": [
      "card"
    ],
    "triggers": [
      "auto",
      "click"
    ],
    "useCases": {
      "ko": [
        "스크롤할수록 앞 카드 위에 다음 카드가 포개지는 배치"
      ],
      "en": [
        "Later cards layer over earlier sticky cards as the local viewport scrolls"
      ]
    },
    "aliases": {
      "ko": [
        "스크롤 스티키 카드 쌓기",
        "스티키 스택",
        "쌓이는 카드"
      ],
      "en": [
        "Sticky Stacked Cards",
        "sticky stack",
        "stacking cards"
      ]
    }
  },
  "ly-horizontal-timeline-track": {
    "targets": [
      "list"
    ],
    "triggers": [
      "auto",
      "click"
    ],
    "useCases": {
      "ko": [
        "연도와 이벤트 카드가 이어진 긴 트랙을 자동으로 가로 탐색"
      ],
      "en": [
        "An automatic horizontal sweep reveals a connected timeline of years and events"
      ]
    },
    "aliases": {
      "ko": [
        "가로 연혁 트랙",
        "연혁 스크롤",
        "타임라인 트랙"
      ],
      "en": [
        "Horizontal Timeline Track",
        "timeline scroll",
        "history track"
      ]
    }
  },
  "ly-footer-uncover-scroll": {
    "targets": [
      "panel"
    ],
    "triggers": [
      "auto",
      "click"
    ],
    "useCases": {
      "ko": [
        "본문이 올라가며 뒤에 고정된 마무리 영역을 드러내는 구조"
      ],
      "en": [
        "The scrolling page uncovers a footer held behind it"
      ]
    },
    "aliases": {
      "ko": [
        "푸터 언커버 스크롤",
        "푸터 리빌",
        "언커버 푸터"
      ],
      "en": [
        "Footer Uncover Scroll",
        "footer reveal",
        "uncover footer"
      ]
    }
  },
  "ly-scroll-linked-path": {
    "targets": [
      "panel"
    ],
    "triggers": [
      "auto",
      "click"
    ],
    "useCases": {
      "ko": [
        "문서 스크롤 진행과 곡선이 그려지는 길이를 함께 연결"
      ],
      "en": [
        "A document preview scrolls while an adjacent curve is drawn"
      ]
    },
    "aliases": {
      "ko": [
        "스크롤 연결 경로 드로잉",
        "스크롤 패스",
        "문서 경로"
      ],
      "en": [
        "Scroll Linked Path Drawing",
        "scroll path",
        "document path"
      ]
    }
  },
  "ly-document-minimap-navigation": {
    "targets": [
      "navigation"
    ],
    "triggers": [
      "click"
    ],
    "useCases": {
      "ko": [
        "축소된 페이지 버튼을 눌러 큰 미리보기의 구간을 이동"
      ],
      "en": [
        "Miniature page buttons jump the larger preview to a selected section"
      ]
    },
    "aliases": {
      "ko": [
        "문서 미니맵 탐색",
        "문서 미니맵",
        "페이지 미니맵"
      ],
      "en": [
        "Document Minimap Navigation",
        "document minimap",
        "page minimap"
      ]
    }
  },
  "ly-collapsed-breadcrumb-path": {
    "targets": [
      "navigation"
    ],
    "triggers": [
      "click"
    ],
    "useCases": {
      "ko": [
        "긴 경로의 가운데 항목을 줄임표로 접고 필요할 때 펼치는 탐색"
      ],
      "en": [
        "Middle breadcrumb items collapse into an ellipsis and can be expanded"
      ]
    },
    "aliases": {
      "ko": [
        "접힌 브레드크럼 경로",
        "경로 줄임표",
        "접힌 경로"
      ],
      "en": [
        "Collapsed Breadcrumb Path",
        "breadcrumb ellipsis",
        "collapsed path"
      ]
    }
  },
  "ly-flyout-branch-menu": {
    "targets": [
      "navigation"
    ],
    "triggers": [
      "click"
    ],
    "useCases": {
      "ko": [
        "상위 항목 옆에 하위 선택지를 펼치는 두 열 메뉴"
      ],
      "en": [
        "A parent item reveals child choices in an adjacent menu column"
      ]
    },
    "aliases": {
      "ko": [
        "분기 플라이아웃 메뉴",
        "하위 플라이아웃",
        "분기 메뉴"
      ],
      "en": [
        "Branch Flyout Menu",
        "child flyout",
        "branch menu"
      ]
    }
  },
  "ly-vertical-journey-rail": {
    "targets": [
      "navigation"
    ],
    "triggers": [
      "click"
    ],
    "useCases": {
      "ko": [
        "세로 연결선 옆의 단계를 선택해 현재 여정 화면을 바꾸는 탐색"
      ],
      "en": [
        "A vertical rail of steps switches the current journey preview"
      ]
    },
    "aliases": {
      "ko": [
        "세로 여정 레일",
        "여정 단계",
        "버티컬 레일"
      ],
      "en": [
        "Vertical Journey Rail",
        "journey steps",
        "vertical rail"
      ]
    }
  },
  "ly-workspace-switcher": {
    "targets": [
      "navigation"
    ],
    "triggers": [
      "click"
    ],
    "useCases": {
      "ko": [
        "현재 공간 이름을 눌러 다른 공간을 선택하는 드롭다운"
      ],
      "en": [
        "A disclosure button lets the user choose a different sample workspace"
      ]
    },
    "aliases": {
      "ko": [
        "워크스페이스 전환기",
        "공간 선택",
        "팀 전환"
      ],
      "en": [
        "Workspace Switcher",
        "workspace picker",
        "team switcher"
      ]
    }
  },
  "ly-multitrack-clip-timeline": {
    "targets": [
      "panel"
    ],
    "triggers": [
      "click"
    ],
    "useCases": {
      "ko": [
        "영상·제목·오디오 행의 클립을 선택하면 아래 속성이 바뀌는 편집기 구성"
      ],
      "en": [
        "Selecting clips on video, title and audio tracks updates a local inspector"
      ]
    },
    "aliases": {
      "ko": [
        "멀티트랙 클립 타임라인",
        "클립 타임라인",
        "트랙 편집기"
      ],
      "en": [
        "Multitrack Clip Timeline",
        "clip timeline",
        "track editor"
      ]
    }
  },
  "ly-collapsible-run-log": {
    "targets": [
      "panel"
    ],
    "triggers": [
      "click"
    ],
    "useCases": {
      "ko": [
        "준비·검증·완료 로그 묶음을 개별로 펼치는 콘솔 패널"
      ],
      "en": [
        "A console panel independently expands preparation, validation and completion log groups"
      ]
    },
    "aliases": {
      "ko": [
        "실행 로그 접기 패널",
        "로그 그룹",
        "접는 콘솔"
      ],
      "en": [
        "Collapsible Run Log",
        "log groups",
        "collapsible console"
      ]
    }
  },
  "ly-column-visibility-table": {
    "targets": [
      "panel"
    ],
    "triggers": [
      "click"
    ],
    "useCases": {
      "ko": [
        "체크박스로 값·상태 열을 켜고 끄는 데이터 표"
      ],
      "en": [
        "Checkboxes independently show or hide value and status columns"
      ]
    },
    "aliases": {
      "ko": [
        "열 표시 선택 표",
        "열 숨기기",
        "컬럼 선택"
      ],
      "en": [
        "Column Visibility Table",
        "hide columns",
        "column picker"
      ]
    }
  },
  "ly-crossfilter-summary-bars": {
    "targets": [
      "chart"
    ],
    "triggers": [
      "click"
    ],
    "useCases": {
      "ko": [
        "막대 선택에 따라 합계가 해당 그룹 값으로 바뀌는 데이터 패널"
      ],
      "en": [
        "Selecting a bar changes a summary total to that group value"
      ]
    },
    "aliases": {
      "ko": [
        "선택 연동 요약 막대",
        "교차 필터",
        "선택 합계"
      ],
      "en": [
        "Crossfilter Summary Bars",
        "crossfilter",
        "selection total"
      ]
    }
  },
  "ly-overview-detail-chart": {
    "targets": [
      "chart"
    ],
    "triggers": [
      "input"
    ],
    "useCases": {
      "ko": [
        "전체 미니 차트의 선택 창을 옮겨 위쪽 상세 구간을 바꾸는 구성"
      ],
      "en": [
        "Move a window over an overview chart to update the detailed segment above"
      ]
    },
    "aliases": {
      "ko": [
        "개요·상세 구간 차트",
        "개요 상세",
        "브러시 구간"
      ],
      "en": [
        "Overview and Detail Chart",
        "overview detail",
        "windowed chart"
      ]
    }
  }
};
