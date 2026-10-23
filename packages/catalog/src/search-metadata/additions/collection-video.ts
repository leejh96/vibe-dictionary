import type { SearchMetadata } from '../../search-metadata';

export const VIDEO_COLLECTION_SEARCH: Record<string, SearchMetadata> = {
  "vd-squeeze-tube-dispense": {
    "targets": [
      "scene"
    ],
    "triggers": [
      "auto",
      "click"
    ],
    "useCases": {
      "ko": [
        "튜브 몸체가 좁아지며 아래쪽 크림 경로가 드러나는 제품 컷"
      ],
      "en": [
        "A tube narrows as a cream-like stroke appears below its nozzle"
      ]
    },
    "aliases": {
      "ko": [
        "튜브 압착 디스펜스 컷",
        "튜브 제품컷",
        "크림 디스펜스"
      ],
      "en": [
        "Squeeze Tube Dispense Shot",
        "tube packshot",
        "cream dispense"
      ]
    }
  },
  "vd-color-swatch-fan-reveal": {
    "targets": [
      "scene"
    ],
    "triggers": [
      "auto",
      "click"
    ],
    "useCases": {
      "ko": [
        "같은 핀에 묶인 다섯 컬러칩이 부채처럼 벌어지는 제품 소개"
      ],
      "en": [
        "Five color swatches fan out from a shared pin"
      ]
    },
    "aliases": {
      "ko": [
        "컬러칩 팬 리빌",
        "컬러칩",
        "스와치 팬"
      ],
      "en": [
        "Color Swatch Fan Reveal",
        "color chips",
        "swatch fan"
      ]
    }
  },
  "vd-floating-ingredient-packshot": {
    "targets": [
      "scene"
    ],
    "triggers": [
      "auto",
      "click"
    ],
    "useCases": {
      "ko": [
        "중앙 용기 주위를 잎과 과일 조각이 천천히 떠다니는 장면"
      ],
      "en": [
        "Leaves and fruit slices float around a central product bottle"
      ]
    },
    "aliases": {
      "ko": [
        "플로팅 원료 제품 컷",
        "원료 부유",
        "재료 제품컷"
      ],
      "en": [
        "Floating Ingredient Packshot",
        "floating ingredients",
        "ingredient packshot"
      ]
    }
  },
  "vd-pull-tab-can-opening": {
    "targets": [
      "scene"
    ],
    "triggers": [
      "auto",
      "click"
    ],
    "useCases": {
      "ko": [
        "캔 상단 탭이 들리고 입구와 작은 기포가 나타나는 제품 연출"
      ],
      "en": [
        "A can tab lifts as the opening and small bubbles become visible"
      ]
    },
    "aliases": {
      "ko": [
        "풀탭 캔 개봉",
        "풀탭",
        "캔 오프닝"
      ],
      "en": [
        "Pull Tab Can Opening",
        "pull tab",
        "can opening"
      ]
    }
  },
  "vd-pouch-seal-opening": {
    "targets": [
      "scene"
    ],
    "triggers": [
      "auto",
      "click"
    ],
    "useCases": {
      "ko": [
        "파우치 입구의 앞뒤 테두리가 벌어져 내부가 보이는 제품 컷"
      ],
      "en": [
        "The front and back pouch lips separate to reveal a dark interior"
      ]
    },
    "aliases": {
      "ko": [
        "파우치 실링 개봉",
        "파우치 개봉",
        "포장 입구"
      ],
      "en": [
        "Pouch Seal Opening",
        "pouch opening",
        "package seal"
      ]
    }
  },
  "vd-diagonal-type-conveyor": {
    "targets": [
      "text"
    ],
    "triggers": [
      "auto",
      "click"
    ],
    "useCases": {
      "ko": [
        "서로 반대 방향으로 움직이는 세 타이포 띠를 대각선으로 배치"
      ],
      "en": [
        "Three diagonal type bands move in alternating directions"
      ]
    },
    "aliases": {
      "ko": [
        "대각 타이포 컨베이어",
        "대각 문구",
        "타이포 띠"
      ],
      "en": [
        "Diagonal Typography Conveyor",
        "diagonal copy",
        "type bands"
      ]
    }
  },
  "vd-price-strike-replacement": {
    "targets": [
      "text"
    ],
    "triggers": [
      "auto",
      "click"
    ],
    "useCases": {
      "ko": [
        "이전 가격에 취소선을 그린 뒤 새 가격을 아래에 드러내는 광고 모션"
      ],
      "en": [
        "A strike crosses an old sample price before a new price appears below"
      ]
    },
    "aliases": {
      "ko": [
        "가격 취소선 교체 광고",
        "가격 교체",
        "세일 타이포"
      ],
      "en": [
        "Price Strike Replacement",
        "price replacement",
        "sale typography"
      ]
    }
  },
  "vd-circular-word-burst": {
    "targets": [
      "text"
    ],
    "triggers": [
      "auto",
      "click"
    ],
    "useCases": {
      "ko": [
        "짧은 단어 여덟 개가 중앙에서 바깥으로 퍼지는 광고 모션"
      ],
      "en": [
        "Eight short words spread outward from the center"
      ]
    },
    "aliases": {
      "ko": [
        "원형 단어 버스트",
        "단어 확산",
        "타이포 버스트"
      ],
      "en": [
        "Circular Word Burst",
        "word burst",
        "radial typography"
      ]
    }
  },
  "vd-elastic-word-stamp": {
    "targets": [
      "text"
    ],
    "triggers": [
      "auto",
      "click"
    ],
    "useCases": {
      "ko": [
        "도장 프레임과 문구가 눌렸다가 탄성 있게 자리 잡는 광고 모션"
      ],
      "en": [
        "A framed word compresses and settles like an elastic stamp"
      ]
    },
    "aliases": {
      "ko": [
        "탄성 워드 스탬프",
        "워드 스탬프",
        "도장 광고"
      ],
      "en": [
        "Elastic Word Stamp",
        "word stamp",
        "stamp motion"
      ]
    }
  },
  "vd-quote-bracket-reveal": {
    "targets": [
      "text"
    ],
    "triggers": [
      "auto",
      "click"
    ],
    "useCases": {
      "ko": [
        "모여 있던 인용 부호가 양옆으로 열리며 문구를 드러내는 모션"
      ],
      "en": [
        "Quotation marks separate to expose a centered line of copy"
      ]
    },
    "aliases": {
      "ko": [
        "인용 부호 카피 리빌",
        "인용 카피",
        "따옴표 리빌"
      ],
      "en": [
        "Quote Bracket Copy Reveal",
        "quote copy",
        "quotation reveal"
      ]
    }
  },
  "vd-slopegraph-paired-reveal": {
    "targets": [
      "chart"
    ],
    "triggers": [
      "auto",
      "click"
    ],
    "useCases": {
      "ko": [
        "이전·이후 값의 점을 연결해 변화 방향을 보여주는 차트"
      ],
      "en": [
        "Connected before/after points reveal the direction of change"
      ]
    },
    "aliases": {
      "ko": [
        "슬로프그래프 쌍점 리빌",
        "슬로프 차트",
        "전후 비교 선"
      ],
      "en": [
        "Slopegraph Paired Reveal",
        "slope chart",
        "before after lines"
      ]
    }
  },
  "vd-waffle-percent-fill": {
    "targets": [
      "chart"
    ],
    "triggers": [
      "auto",
      "click"
    ],
    "useCases": {
      "ko": [
        "100칸 중 목표 비율만큼 채우며 백분율을 함께 표시"
      ],
      "en": [
        "A hundred-cell grid fills toward a target percentage"
      ]
    },
    "aliases": {
      "ko": [
        "와플 차트 비율 채움",
        "와플 차트",
        "100칸 비율"
      ],
      "en": [
        "Waffle Percent Fill",
        "waffle chart",
        "hundred-cell share"
      ]
    }
  },
  "vd-diverging-bar-reveal": {
    "targets": [
      "chart"
    ],
    "triggers": [
      "auto",
      "click"
    ],
    "useCases": {
      "ko": [
        "0축을 기준으로 음수는 왼쪽, 양수는 오른쪽으로 자라는 차트"
      ],
      "en": [
        "Negative and positive bars grow in opposite directions from zero"
      ]
    },
    "aliases": {
      "ko": [
        "발산 막대 리빌",
        "양음 막대",
        "발산 차트"
      ],
      "en": [
        "Diverging Bar Reveal",
        "diverging bars",
        "positive negative chart"
      ]
    }
  },
  "vd-bullet-target-comparison": {
    "targets": [
      "chart"
    ],
    "triggers": [
      "auto",
      "click"
    ],
    "useCases": {
      "ko": [
        "구간 배경 위 실적 막대와 목표선을 겹쳐 비교하는 차트"
      ],
      "en": [
        "An actual-value bar is compared with a target marker over qualitative bands"
      ]
    },
    "aliases": {
      "ko": [
        "불릿 목표 비교 차트",
        "불릿 차트",
        "목표 대비"
      ],
      "en": [
        "Bullet Target Comparison",
        "bullet chart",
        "target comparison"
      ]
    }
  },
  "vd-polar-area-reveal": {
    "targets": [
      "chart"
    ],
    "triggers": [
      "auto",
      "click"
    ],
    "useCases": {
      "ko": [
        "같은 각도의 부채꼴 면적이 값에 비례해 커지는 차트"
      ],
      "en": [
        "Equal-angle sectors grow with areas proportional to their values"
      ]
    },
    "aliases": {
      "ko": [
        "극좌표 면적 리빌",
        "극면적 차트",
        "로즈 차트"
      ],
      "en": [
        "Polar Area Reveal",
        "polar area chart",
        "rose chart"
      ]
    }
  },
  "vd-interview-split-screen": {
    "targets": [
      "scene"
    ],
    "triggers": [
      "auto",
      "click"
    ],
    "useCases": {
      "ko": [
        "진행자와 게스트 패널 중 발화 중인 면을 강조하는 방송 배치"
      ],
      "en": [
        "Host and guest panels alternate an active-speaker outline"
      ]
    },
    "aliases": {
      "ko": [
        "인터뷰 분할 화면",
        "분할 인터뷰",
        "대담 레이아웃"
      ],
      "en": [
        "Interview Split Screen",
        "split interview",
        "conversation layout"
      ]
    }
  },
  "vd-safe-frame-overlay": {
    "targets": [
      "scene"
    ],
    "triggers": [
      "static"
    ],
    "useCases": {
      "ko": [
        "화면 안쪽 두 경계와 중앙 십자로 자막 배치 여백을 보여주는 가이드"
      ],
      "en": [
        "Two inset frames and a center cross show illustrative caption margins"
      ]
    },
    "aliases": {
      "ko": [
        "세이프 프레임 가이드",
        "세이프 영역",
        "자막 여백"
      ],
      "en": [
        "Safe Frame Guide Overlay",
        "safe frame",
        "caption margins"
      ]
    }
  },
  "vd-sports-score-bug": {
    "targets": [
      "scene"
    ],
    "triggers": [
      "auto",
      "click"
    ],
    "useCases": {
      "ko": [
        "경기장 위 고정 점수판의 숫자가 바뀌는 방송 오버레이"
      ],
      "en": [
        "A fixed score overlay updates above a stylized playing field"
      ]
    },
    "aliases": {
      "ko": [
        "스포츠 스코어 버그",
        "스코어 버그",
        "방송 점수판"
      ],
      "en": [
        "Sports Score Bug",
        "score bug",
        "broadcast scoreboard"
      ]
    }
  },
  "vd-replay-stinger-panel": {
    "targets": [
      "scene"
    ],
    "triggers": [
      "auto",
      "click"
    ],
    "useCases": {
      "ko": [
        "리플레이 문구가 있는 기울어진 컬러 면이 화면을 가로지르는 전환"
      ],
      "en": [
        "A skewed colored panel carrying a replay label crosses the frame"
      ]
    },
    "aliases": {
      "ko": [
        "리플레이 스팅어 패널",
        "리플레이 전환",
        "스팅어 패널"
      ],
      "en": [
        "Replay Stinger Panel",
        "replay transition",
        "stinger panel"
      ]
    }
  },
  "vd-countdown-film-slate": {
    "targets": [
      "scene"
    ],
    "triggers": [
      "auto",
      "click"
    ],
    "useCases": {
      "ko": [
        "이중 원과 회전선 안에 큰 숫자를 넣은 필름 리더 스타일"
      ],
      "en": [
        "Large numbers inside double rings and a rotating line evoke a film leader"
      ]
    },
    "aliases": {
      "ko": [
        "카운트다운 필름 슬레이트",
        "필름 리더",
        "카운트다운 슬레이트"
      ],
      "en": [
        "Countdown Film Slate",
        "film leader",
        "countdown slate"
      ]
    }
  }
};
