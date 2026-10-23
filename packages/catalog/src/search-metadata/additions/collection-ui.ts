import type { SearchMetadata } from '../../search-metadata';

export const UI_COLLECTION_SEARCH: Record<string, SearchMetadata> = {
  "hover-image-preview-link": {
    "targets": [
      "text"
    ],
    "triggers": [
      "hover"
    ],
    "useCases": {
      "ko": [
        "링크에 호버하거나 포커스를 주면 작은 풍경 이미지가 떠오르는 링크"
      ],
      "en": [
        "A small landscape floats above a link on hover or keyboard focus"
      ]
    },
    "aliases": {
      "ko": [
        "이미지 프리뷰 링크",
        "호버 이미지",
        "프리뷰 링크"
      ],
      "en": [
        "Image Preview Link",
        "hover image",
        "link preview"
      ]
    }
  },
  "hover-wavy-underline": {
    "targets": [
      "button"
    ],
    "triggers": [
      "hover"
    ],
    "useCases": {
      "ko": [
        "물결 밑줄이 글자 쪽으로 올라오며 반응하는 텍스트 버튼"
      ],
      "en": [
        "A wavy underline moves closer to its label on hover or focus"
      ]
    },
    "aliases": {
      "ko": [
        "물결 밑줄 근접 호버",
        "웨이브 밑줄",
        "밑줄 간격"
      ],
      "en": [
        "Wavy Underline Offset Hover",
        "wavy underline",
        "underline offset"
      ]
    }
  },
  "hover-split-curtain": {
    "targets": [
      "button"
    ],
    "triggers": [
      "hover"
    ],
    "useCases": {
      "ko": [
        "버튼의 두 배경 면이 양옆으로 갈라지며 아래 색이 드러나는 효과"
      ],
      "en": [
        "Two button background halves slide apart to expose the underlying color"
      ]
    },
    "aliases": {
      "ko": [
        "좌우 커튼 호버 버튼",
        "분할 배경 호버",
        "커튼 버튼"
      ],
      "en": [
        "Split Curtain Hover Button",
        "split hover",
        "curtain button"
      ]
    }
  },
  "hover-arrow-conveyor": {
    "targets": [
      "button"
    ],
    "triggers": [
      "hover"
    ],
    "useCases": {
      "ko": [
        "작은 창 안에서 대각선 화살표가 올라가고 수평 화살표가 들어오는 버튼"
      ],
      "en": [
        "A diagonal arrow exits a clipped window as a horizontal arrow enters"
      ]
    },
    "aliases": {
      "ko": [
        "화살표 컨베이어 호버",
        "화살표 교체",
        "아이콘 롤링"
      ],
      "en": [
        "Arrow Conveyor Hover",
        "arrow swap",
        "rolling arrow"
      ]
    }
  },
  "hover-radial-ink": {
    "targets": [
      "button"
    ],
    "triggers": [
      "hover"
    ],
    "useCases": {
      "ko": [
        "버튼 중앙의 작은 원이 커지며 바탕을 채우는 잉크 효과"
      ],
      "en": [
        "A small circle expands from the button center to flood the background"
      ]
    },
    "aliases": {
      "ko": [
        "중앙 잉크 확산 호버",
        "잉크 확산",
        "원형 채움"
      ],
      "en": [
        "Radial Ink Spread Hover",
        "ink flood",
        "radial fill"
      ]
    }
  },
  "perforated-admission-ticket": {
    "targets": [
      "card"
    ],
    "triggers": [
      "static"
    ],
    "useCases": {
      "ko": [
        "반원 홈과 절취선으로 본문·번호 면을 나눈 입장권 카드"
      ],
      "en": [
        "An admission ticket divided by a perforated seam and semicircular notches"
      ]
    },
    "aliases": {
      "ko": [
        "천공 입장 티켓 카드",
        "입장권",
        "절취선 티켓"
      ],
      "en": [
        "Perforated Admission Ticket",
        "admission pass",
        "ticket stub"
      ]
    }
  },
  "hinged-book-cover-card": {
    "targets": [
      "card"
    ],
    "triggers": [
      "click"
    ],
    "useCases": {
      "ko": [
        "표지가 왼쪽 책등을 축으로 열려 안쪽 문장이 드러나는 카드"
      ],
      "en": [
        "A cover swings around the left spine to reveal an inner page"
      ]
    },
    "aliases": {
      "ko": [
        "책 표지 힌지 카드",
        "책 표지",
        "북 커버"
      ],
      "en": [
        "Hinged Book Cover Card",
        "book cover",
        "opening book"
      ]
    }
  },
  "fan-spread-deck": {
    "targets": [
      "card"
    ],
    "triggers": [
      "click"
    ],
    "useCases": {
      "ko": [
        "겹친 카드 세 장이 아래쪽 축을 중심으로 부채처럼 펼쳐지는 카드 묶음"
      ],
      "en": [
        "Three stacked cards open into a fan around a pivot below their faces"
      ]
    },
    "aliases": {
      "ko": [
        "부채꼴 카드 펼치기",
        "카드 부채",
        "덱 펼침"
      ],
      "en": [
        "Fan Spread Card Deck",
        "fan deck",
        "spread cards"
      ]
    }
  },
  "scratch-mask-reveal-card": {
    "targets": [
      "card"
    ],
    "triggers": [
      "input"
    ],
    "useCases": {
      "ko": [
        "슬라이더를 움직이면 지그재그 긁힘 경로가 은색 덮개를 지우는 카드"
      ],
      "en": [
        "A range input extends a zigzag scratch mask through a silver covering"
      ]
    },
    "aliases": {
      "ko": [
        "스크래치 마스크 리빌 카드",
        "스크래치 카드",
        "긁기 마스크"
      ],
      "en": [
        "Scratch Mask Reveal Card",
        "scratch card",
        "scratch reveal"
      ]
    }
  },
  "product-hotspot-card": {
    "targets": [
      "card"
    ],
    "triggers": [
      "click"
    ],
    "useCases": {
      "ko": [
        "제품 위 세 지점을 선택하면 해당 부위 설명이 아래에 나타나는 카드"
      ],
      "en": [
        "Three product hotspots reveal the selected part label"
      ]
    },
    "aliases": {
      "ko": [
        "제품 핫스폿 카드",
        "제품 주석",
        "이미지 핫스팟"
      ],
      "en": [
        "Product Hotspot Card",
        "product annotations",
        "image hotspot"
      ]
    }
  },
  "circular-scene-switch": {
    "targets": [
      "scene"
    ],
    "triggers": [
      "click"
    ],
    "useCases": {
      "ko": [
        "중앙 원형 클립을 넓혀 다른 풍경으로 바꾸는 전환"
      ],
      "en": [
        "A growing circular clip exposes a second landscape"
      ]
    },
    "aliases": {
      "ko": [
        "원형 창 장면 전환",
        "원형 전환",
        "장면 클립"
      ],
      "en": [
        "Circular Scene Switch",
        "circle transition",
        "scene clip"
      ]
    }
  },
  "domino-tile-transition": {
    "targets": [
      "shape"
    ],
    "triggers": [
      "click"
    ],
    "useCases": {
      "ko": [
        "다섯 타일이 100ms 간격으로 넘어지거나 다시 일어나는 전환"
      ],
      "en": [
        "Five tiles tilt sequentially with a 100ms stagger"
      ]
    },
    "aliases": {
      "ko": [
        "도미노 타일 전환",
        "도미노 모션",
        "순차 쓰러짐"
      ],
      "en": [
        "Domino Tile Transition",
        "domino motion",
        "staggered fall"
      ]
    }
  },
  "zipper-panel-opening": {
    "targets": [
      "panel"
    ],
    "triggers": [
      "click"
    ],
    "useCases": {
      "ko": [
        "맞물린 점선 경계의 두 패널이 벌어져 안쪽 문구를 드러내는 전환"
      ],
      "en": [
        "Two panels with dashed inner seams part to reveal a message"
      ]
    },
    "aliases": {
      "ko": [
        "지퍼 패널 열림",
        "지퍼 리빌",
        "양쪽 열기"
      ],
      "en": [
        "Zipper Panel Opening",
        "zipper reveal",
        "split opening"
      ]
    }
  },
  "cube-panel-switch": {
    "targets": [
      "panel"
    ],
    "triggers": [
      "click"
    ],
    "useCases": {
      "ko": [
        "정면 패널이 90도 돌아가며 옆면 콘텐츠를 보여주는 3D 전환"
      ],
      "en": [
        "A panel rotates 90 degrees to reveal its adjacent cube face"
      ]
    },
    "aliases": {
      "ko": [
        "큐브 면 패널 전환",
        "큐브 전환",
        "3D 패널"
      ],
      "en": [
        "Cube Face Panel Switch",
        "cube transition",
        "rotating panel"
      ]
    }
  },
  "stack-to-grid-transition": {
    "targets": [
      "card"
    ],
    "triggers": [
      "click"
    ],
    "useCases": {
      "ko": [
        "겹친 네 카드가 2×2 격자로 흩어지고 다시 쌓이는 전환"
      ],
      "en": [
        "Four overlapping cards spread into a two-by-two grid and restack"
      ]
    },
    "aliases": {
      "ko": [
        "스택에서 격자로 전환",
        "스택 그리드",
        "펼침 레이아웃"
      ],
      "en": [
        "Stack to Grid Transition",
        "stack grid",
        "spread layout"
      ]
    }
  },
  "balanced-headline-wrap": {
    "targets": [
      "text"
    ],
    "triggers": [
      "input"
    ],
    "useCases": {
      "ko": [
        "너비를 바꾸며 마지막 줄이 짧아지지 않도록 균형을 잡는 제목"
      ],
      "en": [
        "A width control demonstrates balanced headline wrapping"
      ]
    },
    "aliases": {
      "ko": [
        "균형 잡힌 헤드라인 줄바꿈",
        "균형 줄바꿈",
        "헤드라인 균형"
      ],
      "en": [
        "Balanced Headline Wrapping",
        "text wrap balance",
        "balanced heading"
      ]
    }
  },
  "ruby-reading-annotation": {
    "targets": [
      "text"
    ],
    "triggers": [
      "static"
    ],
    "useCases": {
      "ko": [
        "큰 본문 글자 위에 작은 발음·뜻 주석을 얹는 타이포"
      ],
      "en": [
        "Small reading annotations sit above large base lettering"
      ]
    },
    "aliases": {
      "ko": [
        "루비 발음 주석",
        "루비 태그",
        "발음 표기"
      ],
      "en": [
        "Ruby Reading Annotation",
        "ruby annotation",
        "reading gloss"
      ]
    }
  },
  "proofreading-text-marks": {
    "targets": [
      "text"
    ],
    "triggers": [
      "static"
    ],
    "useCases": {
      "ko": [
        "삭제할 문구와 새 문구를 취소선·물결 밑줄로 대비하는 글자 구성"
      ],
      "en": [
        "Deleted and revised words are contrasted with a strike and wavy underline"
      ]
    },
    "aliases": {
      "ko": [
        "교정 표시 타이포",
        "교정 마크",
        "삽입 삭제"
      ],
      "en": [
        "Proofreading Text Marks",
        "proofreading marks",
        "insert delete"
      ]
    }
  },
  "inline-footnote-disclosure": {
    "targets": [
      "text"
    ],
    "triggers": [
      "click"
    ],
    "useCases": {
      "ko": [
        "본문의 작은 번호를 누르면 보충 설명이 아래에 펼쳐지는 텍스트"
      ],
      "en": [
        "A superscript reference button reveals supplementary text below"
      ]
    },
    "aliases": {
      "ko": [
        "인라인 각주 펼침",
        "각주",
        "보충 설명"
      ],
      "en": [
        "Inline Footnote Disclosure",
        "footnote",
        "supplementary note"
      ]
    }
  },
  "vertical-editorial-type": {
    "targets": [
      "text"
    ],
    "triggers": [
      "static"
    ],
    "useCases": {
      "ko": [
        "세로 제목과 작은 캡션, 컬러 아치를 나란히 배치한 편집 스타일"
      ],
      "en": [
        "A vertical headline and small caption sit beside a colored arch"
      ]
    },
    "aliases": {
      "ko": [
        "세로쓰기 에디토리얼",
        "세로 타이포",
        "세로쓰기"
      ],
      "en": [
        "Vertical Editorial Typography",
        "vertical type",
        "vertical writing"
      ]
    }
  },
  "password-rule-checklist": {
    "targets": [
      "input"
    ],
    "triggers": [
      "input"
    ],
    "useCases": {
      "ko": [
        "샘플 비밀번호의 길이·숫자·대문자 조건을 실시간 표시"
      ],
      "en": [
        "Live checks show whether a sample password meets length, digit and uppercase conditions"
      ]
    },
    "aliases": {
      "ko": [
        "비밀번호 조건 체크리스트",
        "암호 조건",
        "비밀번호 체크"
      ],
      "en": [
        "Password Rule Checklist",
        "password requirements",
        "password checklist"
      ]
    }
  },
  "dirty-note-save-state": {
    "targets": [
      "input"
    ],
    "triggers": [
      "input",
      "click"
    ],
    "useCases": {
      "ko": [
        "입력 내용과 마지막 저장본을 비교해 미저장 상태와 버튼을 표시"
      ],
      "en": [
        "The current text is compared with a local saved snapshot to show dirty state"
      ]
    },
    "aliases": {
      "ko": [
        "노트 변경·저장 상태",
        "변경 감지",
        "저장 상태"
      ],
      "en": [
        "Dirty Note Save State",
        "dirty state",
        "save status"
      ]
    }
  },
  "chunked-progress-feedback": {
    "targets": [
      "chart"
    ],
    "triggers": [
      "click"
    ],
    "useCases": {
      "ko": [
        "버튼을 누를 때마다 다섯 진행 조각 중 하나를 채우는 시연"
      ],
      "en": [
        "A button fills one of five progress chunks at a time"
      ]
    },
    "aliases": {
      "ko": [
        "청크 단위 진행 피드백",
        "분할 진행률",
        "청크 진행"
      ],
      "en": [
        "Chunked Progress Feedback",
        "chunk progress",
        "segmented progress"
      ]
    }
  },
  "toggle-reaction-picker": {
    "targets": [
      "button"
    ],
    "triggers": [
      "click"
    ],
    "useCases": {
      "ko": [
        "세 반응 중 하나를 선택하거나 같은 버튼으로 해제하는 입력"
      ],
      "en": [
        "Choose one of three reactions or toggle the selected reaction off"
      ]
    },
    "aliases": {
      "ko": [
        "토글 반응 선택기",
        "반응 버튼",
        "리액션 선택"
      ],
      "en": [
        "Toggle Reaction Picker",
        "reaction buttons",
        "reaction picker"
      ]
    }
  },
  "simulated-connectivity-banner": {
    "targets": [
      "panel"
    ],
    "triggers": [
      "click"
    ],
    "useCases": {
      "ko": [
        "상태 토글에 따라 온라인·오프라인 안내 색과 문구가 바뀌는 배너"
      ],
      "en": [
        "A local toggle changes the online/offline banner color and message"
      ]
    },
    "aliases": {
      "ko": [
        "연결 상태 배너 시연",
        "오프라인 배너",
        "연결 안내"
      ],
      "en": [
        "Simulated Connectivity Banner",
        "offline banner",
        "connection status"
      ]
    }
  },
  "avatar-overflow-cluster": {
    "targets": [
      "list"
    ],
    "triggers": [
      "click"
    ],
    "useCases": {
      "ko": [
        "겹친 세 아바타 옆의 +2 버튼으로 나머지 참여자를 펼치는 구성"
      ],
      "en": [
        "Overlapping avatars use a +2 disclosure for additional participants"
      ]
    },
    "aliases": {
      "ko": [
        "아바타 오버플로 묶음",
        "아바타 그룹",
        "참여자 더보기"
      ],
      "en": [
        "Avatar Overflow Cluster",
        "avatar group",
        "participant overflow"
      ]
    }
  },
  "grouped-chat-bubbles": {
    "targets": [
      "list"
    ],
    "triggers": [
      "static"
    ],
    "useCases": {
      "ko": [
        "연속 메시지의 간격과 말풍선 모서리로 발신자 그룹을 구분"
      ],
      "en": [
        "Bubble corners and spacing distinguish consecutive messages and their sender"
      ]
    },
    "aliases": {
      "ko": [
        "발신자별 대화 묶음",
        "메시지 그룹",
        "채팅 말풍선"
      ],
      "en": [
        "Grouped Chat Bubbles",
        "message grouping",
        "chat bubbles"
      ]
    }
  },
  "horizontal-milestone-rail": {
    "targets": [
      "navigation"
    ],
    "triggers": [
      "click"
    ],
    "useCases": {
      "ko": [
        "세 단계 중 선택한 지점까지 연결선과 체크가 채워지는 단계 UI"
      ],
      "en": [
        "A connecting rail and checks fill up to the selected milestone"
      ]
    },
    "aliases": {
      "ko": [
        "수평 마일스톤 레일",
        "단계 레일",
        "마일스톤 단계"
      ],
      "en": [
        "Horizontal Milestone Rail",
        "milestone rail",
        "step progress"
      ]
    }
  },
  "static-month-calendar": {
    "targets": [
      "panel"
    ],
    "triggers": [
      "static"
    ],
    "useCases": {
      "ko": [
        "이전·다음 달 자리와 선택일을 대비하는 7열 월간 배치"
      ],
      "en": [
        "A seven-column month layout contrasts empty boundary cells and a highlighted day"
      ]
    },
    "aliases": {
      "ko": [
        "월간 캘린더 그리드",
        "달력 배치",
        "월간 그리드"
      ],
      "en": [
        "Static Month Calendar Grid",
        "calendar layout",
        "month grid"
      ]
    }
  },
  "pinned-panel-action-footer": {
    "targets": [
      "panel"
    ],
    "triggers": [
      "click"
    ],
    "useCases": {
      "ko": [
        "목록만 스크롤되고 하단 작업 버튼은 항상 남는 패널"
      ],
      "en": [
        "Only the list scrolls while the bottom action remains visible"
      ]
    },
    "aliases": {
      "ko": [
        "패널 고정 작업 푸터",
        "고정 푸터",
        "패널 액션"
      ],
      "en": [
        "Pinned Panel Action Footer",
        "pinned footer",
        "panel actions"
      ]
    }
  },
  "range-linked-rotary-dial": {
    "targets": [
      "input"
    ],
    "triggers": [
      "input"
    ],
    "useCases": {
      "ko": [
        "범위 슬라이더가 원형 노브의 표시선과 숫자를 함께 바꾸는 컨트롤"
      ],
      "en": [
        "A range input updates the rotary knob indicator and numeric value"
      ]
    },
    "aliases": {
      "ko": [
        "범위 입력 연결 로터리 다이얼",
        "로터리 노브",
        "다이얼 입력"
      ],
      "en": [
        "Range Linked Rotary Dial",
        "rotary knob",
        "dial input"
      ]
    }
  },
  "sentiment-radio-segments": {
    "targets": [
      "input"
    ],
    "triggers": [
      "input",
      "click"
    ],
    "useCases": {
      "ko": [
        "세 감정 중 한 가지만 선택하는 네이티브 라디오 묶음"
      ],
      "en": [
        "A native radio group allows exactly one of three sentiments"
      ]
    },
    "aliases": {
      "ko": [
        "감정 라디오 세그먼트",
        "감정 선택",
        "라디오 세그먼트"
      ],
      "en": [
        "Sentiment Radio Segments",
        "sentiment choice",
        "radio segments"
      ]
    }
  },
  "duration-preset-select": {
    "targets": [
      "input"
    ],
    "triggers": [
      "input"
    ],
    "useCases": {
      "ko": [
        "분 단위 프리셋을 선택하면 시·분 표시가 함께 갱신되는 입력"
      ],
      "en": [
        "Selecting a duration preset updates the hour-and-minute display"
      ]
    },
    "aliases": {
      "ko": [
        "시간 길이 프리셋 선택",
        "지속시간",
        "시간 프리셋"
      ],
      "en": [
        "Duration Preset Select",
        "duration input",
        "time preset"
      ]
    }
  },
  "two-axis-coordinate-pad": {
    "targets": [
      "input"
    ],
    "triggers": [
      "input",
      "click"
    ],
    "useCases": {
      "ko": [
        "패드 클릭이나 두 범위 입력으로 점의 가로·세로 위치를 조절"
      ],
      "en": [
        "Click the pad or use two range inputs to set a point on both axes"
      ]
    },
    "aliases": {
      "ko": [
        "두 축 좌표 패드",
        "좌표 입력",
        "XY 패드"
      ],
      "en": [
        "Two Axis Coordinate Pad",
        "coordinate input",
        "XY pad"
      ]
    }
  },
  "pointer-numeric-scrubber": {
    "targets": [
      "input"
    ],
    "triggers": [
      "input",
      "drag"
    ],
    "useCases": {
      "ko": [
        "숫자를 좌우로 끌거나 방향키로 값을 조절하는 입력"
      ],
      "en": [
        "Drag a number horizontally or use arrow keys to adjust it"
      ]
    },
    "aliases": {
      "ko": [
        "드래그 숫자 스크러버",
        "숫자 드래그",
        "스크럽 입력"
      ],
      "en": [
        "Pointer Numeric Scrubber",
        "numeric drag",
        "scrub input"
      ]
    }
  }
};
