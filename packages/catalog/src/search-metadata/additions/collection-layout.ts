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
        "중앙 작품과 주변 후보를 원형으로 묶어 전시"
      ],
      "en": [
        "Arrange a featured work and surrounding alternatives in a circular gallery"
      ]
    },
    "aliases": {
      "ko": [
        "원형 썸네일 갤러리",
        "원형 갤러리",
        "링 배치",
        "둘레 사진 선택",
        "중앙 미리보기 갤러리"
      ],
      "en": [
        "Circular Thumbnail Gallery",
        "circular gallery",
        "ring layout",
        "circular image selector",
        "orbit thumbnail gallery"
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
        "기하학 포스터를 삼각형 모듈의 반복으로 구성"
      ],
      "en": [
        "Compose a geometric poster from repeating interlocking triangles"
      ]
    },
    "aliases": {
      "ko": [
        "삼각 타일 테셀레이션",
        "삼각 그리드",
        "테셀레이션",
        "삼각 모듈 배치",
        "삼각형 빈틈 채우기"
      ],
      "en": [
        "Triangle Tile Tessellation",
        "triangle grid",
        "tessellation",
        "triangle tiling layout",
        "interlocking triangular tiles"
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
        "사진 모음에서 원래 비율을 살리면서 행 단위 정렬 유지"
      ],
      "en": [
        "Display a photo collection in aligned rows while respecting image proportions"
      ]
    },
    "aliases": {
      "ko": [
        "양끝 정렬 이미지 행",
        "정렬 갤러리",
        "동일 높이 사진",
        "같은 높이 사진 행",
        "사진 양끝 맞춤"
      ],
      "en": [
        "Justified Image Rows",
        "justified gallery",
        "equal height photos",
        "justified photo gallery",
        "equal height image rows"
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
        "매거진 표지에서 제목과 사진을 겹쳐 시각적 위계 만들기"
      ],
      "en": [
        "Create a magazine cover hierarchy by overlapping headline and imagery"
      ]
    },
    "aliases": {
      "ko": [
        "겹침 에디토리얼 그리드",
        "오버랩 레이아웃",
        "잡지 제목",
        "사진 위 큰 제목",
        "잡지 겹침 구성"
      ],
      "en": [
        "Overlapping Editorial Grid",
        "overlap layout",
        "magazine heading",
        "overlapping magazine headline",
        "editorial image overlay"
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
        "기능 설명이 길어질 때 이미지와 문장의 좌우를 교차해 리듬 만들기"
      ],
      "en": [
        "Add rhythm to a long feature page by alternating imagery and copy"
      ]
    },
    "aliases": {
      "ko": [
        "교차형 기능 소개 행",
        "교차 행",
        "기능 소개 배치",
        "좌우 교차 소개",
        "번갈아 배치한 기능"
      ],
      "en": [
        "Alternating Feature Rows",
        "alternating rows",
        "feature layout",
        "alternating feature sections",
        "zigzag feature layout"
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
        "영화 도입이나 서문을 멀어지는 원근 글자로 보여주기"
      ],
      "en": [
        "Present an opening story as text receding toward a vanishing point"
      ]
    },
    "aliases": {
      "ko": [
        "원근 텍스트 크롤",
        "원근 크롤",
        "오프닝 텍스트",
        "우주 오프닝 글자",
        "멀어지는 서문"
      ],
      "en": [
        "Perspective Text Crawl",
        "perspective crawl",
        "opening text",
        "opening perspective crawl",
        "receding story text"
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
        "긴 설명을 카드 단위로 나누고 스크롤할 때 순차적으로 포개기"
      ],
      "en": [
        "Present a long narrative as cards that progressively overlap during scrolling"
      ]
    },
    "aliases": {
      "ko": [
        "스크롤 스티키 카드 쌓기",
        "스티키 스택",
        "쌓이는 카드",
        "스크롤 카드 포개기",
        "고정 카드 스택"
      ],
      "en": [
        "Sticky Stacked Cards",
        "sticky stack",
        "stacking cards",
        "scroll stacking cards",
        "sticky overlapping cards"
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
        "여러 해의 사건을 가로 트랙에 이어 회사 연혁 소개"
      ],
      "en": [
        "Present company history as events along a horizontal track"
      ]
    },
    "aliases": {
      "ko": [
        "가로 연혁 트랙",
        "연혁 스크롤",
        "타임라인 트랙",
        "가로 역사 탐색",
        "연도별 사건 트랙"
      ],
      "en": [
        "Horizontal Timeline Track",
        "timeline scroll",
        "history track",
        "horizontal history timeline",
        "year event track"
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
        "페이지의 마지막에서 본문 뒤에 있던 브랜드 마무리 영역 공개"
      ],
      "en": [
        "Reveal a branded closing section from behind the main page content"
      ]
    },
    "aliases": {
      "ko": [
        "푸터 언커버 스크롤",
        "푸터 리빌",
        "언커버 푸터",
        "숨겨진 푸터 공개",
        "본문 뒤 푸터"
      ],
      "en": [
        "Footer Uncover Scroll",
        "footer reveal",
        "uncover footer",
        "uncover hidden footer",
        "footer behind content"
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
        "스크롤한 분량을 선이 그려지는 정도로 시각화"
      ],
      "en": [
        "Represent reading progress through the length of a drawn path"
      ]
    },
    "aliases": {
      "ko": [
        "스크롤 연결 경로 드로잉",
        "스크롤 패스",
        "문서 경로",
        "읽기 진행 경로",
        "스크롤 선 그리기"
      ],
      "en": [
        "Scroll Linked Path Drawing",
        "scroll path",
        "document path",
        "reading progress path",
        "scroll path drawing"
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
        "긴 문서의 구조를 축소판으로 보여주고 위치 이동 지원"
      ],
      "en": [
        "Provide a miniature document overview for quick positional navigation"
      ]
    },
    "aliases": {
      "ko": [
        "문서 미니맵 탐색",
        "문서 미니맵",
        "페이지 미니맵",
        "문서 축소판 탐색",
        "페이지 미니 지도"
      ],
      "en": [
        "Document Minimap Navigation",
        "document minimap",
        "page minimap",
        "document miniature navigator"
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
        "깊은 폴더 구조에서 경로 표시가 지나치게 길어지지 않게 구성"
      ],
      "en": [
        "Keep deep folder paths compact while preserving access to intermediate levels"
      ]
    },
    "aliases": {
      "ko": [
        "접힌 브레드크럼 경로",
        "경로 줄임표",
        "접힌 경로",
        "경로 줄임표 펼침",
        "접힌 폴더 경로"
      ],
      "en": [
        "Collapsed Breadcrumb Path",
        "breadcrumb ellipsis",
        "collapsed path",
        "expand breadcrumb ellipsis",
        "collapsed folder trail"
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
        "상위 분류를 유지하면서 옆 열에서 하위 항목 선택"
      ],
      "en": [
        "Choose a nested item in an adjacent column without losing its parent context"
      ]
    },
    "aliases": {
      "ko": [
        "분기 플라이아웃 메뉴",
        "하위 플라이아웃",
        "분기 메뉴",
        "옆으로 펼치는 하위 메뉴",
        "두 열 분류 메뉴"
      ],
      "en": [
        "Branch Flyout Menu",
        "child flyout",
        "branch menu",
        "cascading side menu",
        "two column branch navigation"
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
        "온보딩이나 절차 안내를 세로 단계 목록과 상세 화면으로 구성"
      ],
      "en": [
        "Organize onboarding steps beside their corresponding detail view"
      ]
    },
    "aliases": {
      "ko": [
        "세로 여정 레일",
        "여정 단계",
        "버티컬 레일",
        "세로 절차 탐색",
        "여정 단계 목록"
      ],
      "en": [
        "Vertical Journey Rail",
        "journey steps",
        "vertical rail",
        "vertical process navigation",
        "journey step rail"
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
        "여러 팀이나 프로젝트 공간 사이를 빠르게 전환"
      ],
      "en": [
        "Switch quickly between team or project workspaces"
      ]
    },
    "aliases": {
      "ko": [
        "워크스페이스 전환기",
        "공간 선택",
        "팀 전환",
        "팀 공간 선택",
        "프로젝트 공간 전환"
      ],
      "en": [
        "Workspace Switcher",
        "workspace picker",
        "team switcher",
        "team workspace selector",
        "project space switcher"
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
        "영상 편집기의 트랙과 선택 클립 속성 배치를 시연"
      ],
      "en": [
        "Prototype editing tracks alongside properties of the selected media clip"
      ]
    },
    "aliases": {
      "ko": [
        "멀티트랙 클립 타임라인",
        "클립 타임라인",
        "트랙 편집기",
        "편집기 트랙 배치",
        "영상 클립 속성"
      ],
      "en": [
        "Multitrack Clip Timeline",
        "clip timeline",
        "track editor",
        "video editor track layout",
        "selected clip inspector"
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
        "작업 실행 기록을 단계별로 묶어 필요한 상세만 펼치기"
      ],
      "en": [
        "Group execution records by stage and expand only relevant details"
      ]
    },
    "aliases": {
      "ko": [
        "실행 로그 접기 패널",
        "로그 그룹",
        "접는 콘솔",
        "단계 로그 펼침",
        "실행 기록 접기"
      ],
      "en": [
        "Collapsible Run Log",
        "log groups",
        "collapsible console",
        "expandable execution logs",
        "grouped run output"
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
        "보고서 표에서 사용자가 필요한 정보 열만 남기게 하기"
      ],
      "en": [
        "Let report readers choose which information columns remain visible"
      ]
    },
    "aliases": {
      "ko": [
        "열 표시 선택 표",
        "열 숨기기",
        "컬럼 선택",
        "표 열 숨기기",
        "체크박스 열 선택"
      ],
      "en": [
        "Column Visibility Table",
        "hide columns",
        "column picker",
        "hide table columns",
        "column chooser checkboxes"
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
        "그룹별 막대를 선택해 전체 합계와 선택 합계를 비교"
      ],
      "en": [
        "Compare overall and selected totals through selectable group bars"
      ]
    },
    "aliases": {
      "ko": [
        "선택 연동 요약 막대",
        "교차 필터",
        "선택 합계",
        "막대 선택 합계",
        "그룹별 요약 필터"
      ],
      "en": [
        "Crossfilter Summary Bars",
        "crossfilter",
        "selection total",
        "bar selection totals",
        "group summary filter"
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
        "긴 시계열의 전체 흐름과 확대 구간을 동시에 확인"
      ],
      "en": [
        "Inspect a detailed time window while retaining an overview of the whole series"
      ]
    },
    "aliases": {
      "ko": [
        "개요·상세 구간 차트",
        "개요 상세",
        "브러시 구간",
        "차트 구간 확대",
        "전체 상세 연동"
      ],
      "en": [
        "Overview and Detail Chart",
        "overview detail",
        "windowed chart",
        "chart range navigator",
        "overview detail plot"
      ]
    }
  }
};
