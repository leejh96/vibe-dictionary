import type { SearchMetadata } from '../../search-metadata';

export const INFOGRAPHIC_SEARCH_METADATA = {
  "vd-waterfall-contribution-reveal": {
    "targets": [
      "chart"
    ],
    "triggers": [
      "auto"
    ],
    "useCases": {
      "ko": [
        "증가와 감소 기여도를 연결해 최종 합계를 보여 주기"
      ],
      "en": [
        "Reveal how positive and negative contributions produce a final total"
      ]
    },
    "aliases": {
      "ko": [
        "브리지 차트",
        "누적 증감 차트"
      ],
      "en": [
        "bridge chart",
        "cumulative contribution chart"
      ]
    }
  },
  "vd-dumbbell-paired-change": {
    "targets": [
      "chart"
    ],
    "triggers": [
      "auto"
    ],
    "useCases": {
      "ko": [
        "같은 척도에서 이전과 이후의 증가·감소 비교"
      ],
      "en": [
        "Compare increases and decreases between paired values on a common scale"
      ]
    },
    "aliases": {
      "ko": [
        "쌍점 차트",
        "연결 점 비교"
      ],
      "en": [
        "paired dot plot",
        "connected dot comparison"
      ]
    }
  },
  "vd-histogram-rebin-transition": {
    "targets": [
      "chart"
    ],
    "triggers": [
      "input"
    ],
    "useCases": {
      "ko": [
        "표본을 실제 구간별로 다시 집계해 구간 폭에 따른 분포 비교"
      ],
      "en": [
        "Reaggregate samples into bins to compare distributions at two bin widths"
      ]
    },
    "aliases": {
      "ko": [
        "도수 분포",
        "구간 재집계"
      ],
      "en": [
        "frequency distribution",
        "histogram rebinning"
      ]
    }
  },
  "vd-boxplot-five-number-reveal": {
    "targets": [
      "chart"
    ],
    "triggers": [
      "auto"
    ],
    "useCases": {
      "ko": [
        "다섯 수치 요약으로 분포의 중앙 범위와 양끝 표현"
      ],
      "en": [
        "Show the central range and extremes of a five-number summary"
      ]
    },
    "aliases": {
      "ko": [
        "상자 수염 차트",
        "다섯 수치 요약"
      ],
      "en": [
        "box and whisker plot",
        "five-number summary"
      ]
    }
  },
  "vd-treemap-hierarchy-area": {
    "targets": [
      "chart"
    ],
    "triggers": [
      "auto"
    ],
    "useCases": {
      "ko": [
        "계층별 부분과 전체의 비중을 사각형 면적으로 비교"
      ],
      "en": [
        "Compare hierarchical part-to-whole proportions using rectangle area"
      ]
    },
    "aliases": {
      "ko": [
        "계층 면적 차트",
        "중첩 사각형"
      ],
      "en": [
        "hierarchical area chart",
        "nested rectangle map"
      ]
    }
  },
  "vd-scatterplot-coordinate-reveal": {
    "targets": [
      "chart"
    ],
    "triggers": [
      "auto"
    ],
    "useCases": {
      "ko": [
        "두 독립 수치의 관계를 실제 좌표에 놓인 점으로 보여 주기"
      ],
      "en": [
        "Show two independent numerical variables as points at their true coordinates"
      ]
    },
    "aliases": {
      "ko": [
        "산포도",
        "이변량 좌표 차트"
      ],
      "en": [
        "scatter diagram",
        "bivariate coordinate plot"
      ]
    }
  },
  "vd-percent-stacked-composition": {
    "targets": [
      "chart"
    ],
    "triggers": [
      "auto"
    ],
    "useCases": {
      "ko": [
        "서로 다른 월별 전체를 정규화해 유입 경로 구성비 비교"
      ],
      "en": [
        "Normalize different monthly totals to compare traffic-channel composition"
      ]
    },
    "aliases": {
      "ko": [
        "백분율 누적 막대",
        "정규화 구성비 차트"
      ],
      "en": [
        "percentage stacked bar",
        "normalized composition chart"
      ]
    }
  },
  "vd-time-series-line-draw": {
    "targets": [
      "chart"
    ],
    "triggers": [
      "auto"
    ],
    "useCases": {
      "ko": [
        "불규칙한 측정 간격을 보존해 시간에 따른 요청 추이 표현"
      ],
      "en": [
        "Show request trends while preserving unequal elapsed-time intervals"
      ]
    },
    "aliases": {
      "ko": [
        "시간 추이 선 그래프",
        "시계열 선 차트"
      ],
      "en": [
        "time trend line",
        "time-series plot"
      ]
    }
  },
  "vd-sankey-flow-conservation": {
    "targets": [
      "chart"
    ],
    "triggers": [
      "auto"
    ],
    "useCases": {
      "ko": [
        "웹·앱의 분기와 합류를 수량 비례 띠로 보여 주기"
      ],
      "en": [
        "Show quantity-conserving branches and merges using weighted ribbons"
      ]
    },
    "aliases": {
      "ko": [
        "샌키 다이어그램",
        "수량 흐름도"
      ],
      "en": [
        "weighted flow diagram",
        "Sankey flow diagram"
      ]
    }
  },
  "vd-radar-profile-reveal": {
    "targets": [
      "chart"
    ],
    "triggers": [
      "auto"
    ],
    "useCases": {
      "ko": [
        "공통 척도의 다섯 점수를 방사형 거리로 비교"
      ],
      "en": [
        "Compare five scores as radial distances on a common scale"
      ]
    },
    "aliases": {
      "ko": [
        "스파이더 차트",
        "방사형 프로필"
      ],
      "en": [
        "spider chart",
        "radial profile chart"
      ]
    }
  }
} satisfies Record<string, SearchMetadata>;
