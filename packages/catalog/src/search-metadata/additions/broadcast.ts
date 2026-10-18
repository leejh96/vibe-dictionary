import type { SearchMetadata } from '../../search-metadata';

export const BROADCAST_SEARCH_METADATA = {
  "vd-word-highlight-subtitles": {
    "targets": [
      "text",
      "scene"
    ],
    "triggers": [
      "auto",
      "click"
    ],
    "aliases": {
      "ko": [
        "워드 하이라이트",
        "카라오케 자막"
      ],
      "en": [
        "karaoke captions",
        "word-by-word highlighting"
      ]
    },
    "useCases": {
      "ko": [
        "고정된 두 줄 자막에서 현재 단어를 차례로 강조하고 일시정지한다."
      ],
      "en": [
        "Highlight the current word in fixed two-line captions, with pause and resume."
      ]
    }
  },
  "vd-end-credit-roll": {
    "targets": [
      "text",
      "list",
      "scene"
    ],
    "triggers": [
      "auto",
      "click"
    ],
    "aliases": {
      "ko": [
        "롤링 크레딧",
        "제작진 자막"
      ],
      "en": [
        "rolling credits",
        "production credit roll"
      ]
    },
    "useCases": {
      "ko": [
        "제작진 역할과 이름 전체를 일정 속도로 위로 흘리고 현재 위치에서 멈춘다."
      ],
      "en": [
        "Roll a full list of production roles and names upward, pausing at the current position."
      ]
    }
  },
  "vd-green-difference-key": {
    "targets": [
      "scene",
      "image",
      "background"
    ],
    "triggers": [
      "input"
    ],
    "aliases": {
      "ko": [
        "색차 키잉",
        "크로마키",
        "녹색 배경 제거"
      ],
      "en": [
        "color difference keying",
        "chroma key",
        "green screen key"
      ]
    },
    "useCases": {
      "ko": [
        "직접 키 강도를 조절해 녹색 우세 배경의 실제 알파를 줄이고 뒤의 도시를 드러낸다."
      ],
      "en": [
        "Adjust key strength to reduce actual alpha in green-dominant source pixels and reveal a city backdrop."
      ]
    }
  },
  "vd-corner-picture-in-picture": {
    "targets": [
      "scene",
      "image"
    ],
    "triggers": [
      "click"
    ],
    "aliases": {
      "ko": [
        "화면 속 화면",
        "픽처 인 픽처"
      ],
      "en": [
        "PiP",
        "picture in picture",
        "corner inset"
      ]
    },
    "useCases": {
      "ko": [
        "메인 산 풍경을 유지하며 작은 발표자 화면을 네 모서리로 이동한다."
      ],
      "en": [
        "Move a presenter inset among four corners while preserving the main mountain scene."
      ]
    }
  },
  "vd-broadcast-color-bars": {
    "targets": [
      "scene",
      "background",
      "image"
    ],
    "triggers": [
      "static"
    ],
    "aliases": {
      "ko": [
        "컬러바",
        "방송 테스트카드",
        "색 기준 패턴"
      ],
      "en": [
        "color bars",
        "broadcast test card",
        "color reference bars"
      ]
    },
    "useCases": {
      "ko": [
        "일곱 색 막대와 명암 패치로 방송 테스트카드의 정적 그래픽 형태를 보여 준다."
      ],
      "en": [
        "Show a static broadcast test-card graphic with seven color bars and shadow patches."
      ]
    }
  },
  "vd-dip-to-black": {
    "targets": [
      "scene",
      "image"
    ],
    "triggers": [
      "input"
    ],
    "aliases": {
      "ko": [
        "블랙 경유",
        "암전 전환",
        "딥 투 블랙"
      ],
      "en": [
        "dip to black",
        "fade through black"
      ]
    },
    "useCases": {
      "ko": [
        "수동 진행값으로 해안을 완전한 검정으로 지운 뒤 도시를 드러내는 순차 전환을 비교한다."
      ],
      "en": [
        "Scrub a sequential coast-to-city transition that passes through complete black."
      ]
    }
  },
  "vd-face-blur-mask": {
    "targets": [
      "scene",
      "image"
    ],
    "triggers": [
      "input",
      "click"
    ],
    "aliases": {
      "ko": [
        "얼굴 가림",
        "부분 흐림 마스크",
        "피사체 마스킹"
      ],
      "en": [
        "privacy mask",
        "face blur",
        "face-local blur mask"
      ]
    },
    "useCases": {
      "ko": [
        "수동으로 인물을 이동하고 얼굴에만 붙은 실제 블러의 적용 전후를 비교한다."
      ],
      "en": [
        "Move a subject manually and compare an attached face-only Gaussian blur on and off."
      ]
    }
  },
  "vd-cinematic-letterbox": {
    "targets": [
      "scene",
      "image"
    ],
    "triggers": [
      "input"
    ],
    "aliases": {
      "ko": [
        "레터박스",
        "시네마 매트",
        "검정 띠"
      ],
      "en": [
        "letterbox",
        "cinematic matte",
        "widescreen matte"
      ]
    },
    "useCases": {
      "ko": [
        "고정된 16:9 풍경의 위아래를 가려 중앙 개구부의 화면비만 직접 조절한다."
      ],
      "en": [
        "Adjust a centered opening by masking the top and bottom of a fixed 16:9 landscape."
      ]
    }
  },
  "vd-alpha-channel-view": {
    "targets": [
      "image",
      "scene"
    ],
    "triggers": [
      "click"
    ],
    "aliases": {
      "ko": [
        "알파 보기",
        "투명도 매트",
        "합성 채널"
      ],
      "en": [
        "alpha matte view",
        "alpha channel",
        "opacity matte"
      ]
    },
    "useCases": {
      "ko": [
        "컬러 합성과 실제 원본 알파의 불투명 회색 매트 보기를 전환한다."
      ],
      "en": [
        "Switch between a color composite and an opaque grayscale matte of actual source alpha."
      ]
    }
  },
  "vd-freeze-frame-hold": {
    "targets": [
      "scene",
      "image"
    ],
    "triggers": [
      "input"
    ],
    "aliases": {
      "ko": [
        "프리즈 프레임",
        "정지 프레임 삽입",
        "타임 리매핑"
      ],
      "en": [
        "freeze frame",
        "hold segment",
        "time remapping"
      ]
    },
    "useCases": {
      "ko": [
        "수동 타임라인의 40~60 구간에서 차체와 바퀴를 같은 중간 프레임에 고정하고 연속 동작을 이어간다."
      ],
      "en": [
        "Scrub a manual timeline with a 40–60 hold segment that freezes car and wheel pose before continuous motion resumes."
      ]
    }
  }
} satisfies Record<string, SearchMetadata>;
