import type { SearchMetadata } from '../../search-metadata';

export const TACTILE_SEARCH_METADATA = {
  "st-stockinette-knit-surface": {
    "targets": [
      "panel",
      "background"
    ],
    "triggers": [
      "static"
    ],
    "useCases": {
      "ko": [
        "정적인 재질 면에서 둥근 실의 세로 니트 코와 깊은 틈을 보여 줄 때"
      ],
      "en": [
        "Show rounded vertical knit stitches and deep yarn gaps on a static material surface"
      ]
    },
    "aliases": {
      "ko": [
        "메리야스 편직",
        "스톡키네트 표면"
      ],
      "en": [
        "jersey knit surface",
        "stockinette texture"
      ]
    }
  },
  "st-compressed-wool-felt": {
    "targets": [
      "panel",
      "background"
    ],
    "triggers": [
      "static"
    ],
    "useCases": {
      "ko": [
        "직조 격자 없이 짧은 양모 섬유가 얽힌 조밀한 정적 재질을 보여 줄 때"
      ],
      "en": [
        "Show a static dense wool surface formed by short tangled fibres without a woven grid"
      ]
    },
    "aliases": {
      "ko": [
        "압축 펠트",
        "양모 부직포"
      ],
      "en": [
        "compressed felt texture",
        "nonwoven wool surface"
      ]
    }
  },
  "st-white-marble-veining": {
    "targets": [
      "panel",
      "background"
    ],
    "triggers": [
      "static"
    ],
    "useCases": {
      "ko": [
        "우윳빛 석재의 정적 면 안에 이어지는 회색 석맥과 분기를 보여 줄 때"
      ],
      "en": [
        "Show continuous branching grey veins within a static milky stone surface"
      ]
    },
    "aliases": {
      "ko": [
        "백색 석재 베이닝",
        "대리석 석맥"
      ],
      "en": [
        "marble vein texture",
        "white stone veining"
      ]
    }
  },
  "st-crackle-ceramic-glaze": {
    "targets": [
      "panel",
      "background"
    ],
    "triggers": [
      "static"
    ],
    "useCases": {
      "ko": [
        "매끄러운 청록 유약과 가는 빙렬을 정적인 도자기 접시에서 보여 줄 때"
      ],
      "en": [
        "Show smooth teal glaze and fine crackle on a static ceramic dish"
      ]
    },
    "aliases": {
      "ko": [
        "빙렬 도자기",
        "청자 유약 균열"
      ],
      "en": [
        "crazed ceramic glaze",
        "celadon crackle"
      ]
    }
  },
  "st-corrugated-cardboard": {
    "targets": [
      "panel",
      "background"
    ],
    "triggers": [
      "static"
    ],
    "useCases": {
      "ko": [
        "포장재의 표면지와 속이 빈 물결형 골심 단면을 정적으로 보여 줄 때"
      ],
      "en": [
        "Show a static packaging material with liner paper and hollow corrugated cut edges"
      ]
    },
    "aliases": {
      "ko": [
        "크라프트 골판 구조",
        "골판 종이 단면"
      ],
      "en": [
        "kraft corrugation",
        "corrugated paper cross section"
      ]
    }
  },
  "st-terrazzo-aggregate-surface": {
    "targets": [
      "panel",
      "background"
    ],
    "triggers": [
      "static"
    ],
    "useCases": {
      "ko": [
        "매끈한 바탕재 속에 연마된 여러 색 골재가 있는 석재 면을 보여 줄 때"
      ],
      "en": [
        "Show a polished stone surface with multicoloured aggregate embedded flush in a smooth matrix"
      ]
    },
    "aliases": {
      "ko": [
        "테라조 석판",
        "골재 단면"
      ],
      "en": [
        "terrazzo texture",
        "polished aggregate surface"
      ]
    }
  },
  "st-pebbled-leather": {
    "targets": [
      "panel",
      "background"
    ],
    "triggers": [
      "static"
    ],
    "useCases": {
      "ko": [
        "불규칙한 가죽 요철과 안쪽 봉제선이 있는 정적 재질을 보여 줄 때"
      ],
      "en": [
        "Show a static leather material with irregular raised grain and inset stitching"
      ]
    },
    "aliases": {
      "ko": [
        "페블 가죽 표면",
        "요철 가죽"
      ],
      "en": [
        "pebble-grain leather",
        "pebbled leather texture"
      ]
    }
  },
  "st-brushed-metal-surface": {
    "targets": [
      "panel",
      "background"
    ],
    "triggers": [
      "static"
    ],
    "useCases": {
      "ko": [
        "한 방향 연마선과 넓은 반사띠가 있는 은빛 금속 면을 정적으로 보여 줄 때"
      ],
      "en": [
        "Show a static silver metal surface with directional brushing and broad reflection bands"
      ]
    },
    "aliases": {
      "ko": [
        "헤어라인 금속 표면",
        "새틴 금속 결"
      ],
      "en": [
        "hairline metal finish",
        "satin brushed metal"
      ]
    }
  },
  "st-knotty-wood-grain": {
    "targets": [
      "panel",
      "background"
    ],
    "triggers": [
      "static"
    ],
    "useCases": {
      "ko": [
        "긴 나뭇결이 옹이를 감싸는 목재 패널의 면과 두께를 정적으로 보여 줄 때"
      ],
      "en": [
        "Show a static wood panel face and thickness with long grain curving around a knot"
      ]
    },
    "aliases": {
      "ko": [
        "옹이 나뭇결",
        "목재 결 표면"
      ],
      "en": [
        "knotty wood texture",
        "wood-grain surface"
      ]
    }
  },
  "st-plain-weave-textile": {
    "targets": [
      "panel",
      "background"
    ],
    "triggers": [
      "static"
    ],
    "useCases": {
      "ko": [
        "날실과 씨실이 번갈아 교차하고 가장자리에 봉제선이 있는 평직 천을 보여 줄 때"
      ],
      "en": [
        "Show plain-weave cloth with alternating warp/weft crossings and an edge seam"
      ]
    },
    "aliases": {
      "ko": [
        "평직 직조 표면",
        "날실 씨실 교차"
      ],
      "en": [
        "plain woven fabric",
        "over-under weave texture"
      ]
    }
  }
} satisfies Record<string, SearchMetadata>;
