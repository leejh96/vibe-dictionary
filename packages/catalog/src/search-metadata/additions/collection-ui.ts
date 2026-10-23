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
        "포트폴리오 작업 목록에서 페이지 이동 전에 작품 이미지를 미리 보여주기"
      ],
      "en": [
        "Preview portfolio artwork from a project list before opening its page"
      ]
    },
    "aliases": {
      "ko": [
        "이미지 프리뷰 링크",
        "호버 이미지",
        "프리뷰 링크",
        "마우스 사진 미리보기",
        "링크 썸네일 팝업"
      ],
      "en": [
        "Image Preview Link",
        "hover image",
        "link preview",
        "image on link hover",
        "portfolio image preview"
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
        "브랜드 소개 페이지의 텍스트 링크에 가벼운 장식 반응 주기"
      ],
      "en": [
        "Give editorial navigation links a playful decorative response"
      ]
    },
    "aliases": {
      "ko": [
        "물결 밑줄 근접 호버",
        "웨이브 밑줄",
        "밑줄 간격",
        "출렁이는 밑줄",
        "물결 링크 강조"
      ],
      "en": [
        "Wavy Underline Offset Hover",
        "wavy underline",
        "underline offset",
        "wave underline link",
        "playful link underline"
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
        "신청 버튼에 진입할 때 가려진 강조색을 열어 클릭 유도"
      ],
      "en": [
        "Reveal an accent color as visitors approach a signup action"
      ]
    },
    "aliases": {
      "ko": [
        "좌우 커튼 호버 버튼",
        "분할 배경 호버",
        "커튼 버튼",
        "양옆으로 열리는 버튼",
        "커튼처럼 갈라지는 배경"
      ],
      "en": [
        "Split Curtain Hover Button",
        "split hover",
        "curtain button",
        "opening curtain button",
        "split background reveal"
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
        "다음 단계로 이동하는 링크에서 진행 방향을 반복해서 암시"
      ],
      "en": [
        "Reinforce forward navigation on a next step link"
      ]
    },
    "aliases": {
      "ko": [
        "화살표 컨베이어 호버",
        "화살표 교체",
        "아이콘 롤링",
        "흘러가는 화살표 버튼",
        "다음 이동 화살표"
      ],
      "en": [
        "Arrow Conveyor Hover",
        "arrow swap",
        "rolling arrow",
        "looping arrow button",
        "forward arrow conveyor"
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
        "주요 행동 버튼에 중심에서 번지는 색으로 선택 가능성 강조"
      ],
      "en": [
        "Highlight a primary action with an expanding central color fill"
      ]
    },
    "aliases": {
      "ko": [
        "중앙 잉크 확산 호버",
        "잉크 확산",
        "원형 채움",
        "원형으로 채워지는 버튼",
        "동그란 잉크 버튼"
      ],
      "en": [
        "Radial Ink Spread Hover",
        "ink flood",
        "radial fill",
        "circular ink fill",
        "expanding disc hover"
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
        "행사 예약 확인이나 입장권 미리보기를 절취선 있는 티켓으로 구성"
      ],
      "en": [
        "Present event reservations as tickets with a detachable admission stub"
      ]
    },
    "aliases": {
      "ko": [
        "천공 입장 티켓 카드",
        "입장권",
        "절취선 티켓",
        "입장권 절취선",
        "공연 티켓 디자인"
      ],
      "en": [
        "Perforated Admission Ticket",
        "admission pass",
        "ticket stub",
        "admission ticket stub",
        "perforated event pass"
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
        "작품이나 강의 소개의 표지를 열어 숨겨진 설명 공개"
      ],
      "en": [
        "Present a course or publication overview behind an opening cover"
      ]
    },
    "aliases": {
      "ko": [
        "책 표지 힌지 카드",
        "책 표지",
        "북 커버",
        "열리는 책 카드",
        "책등 회전 표지"
      ],
      "en": [
        "Hinged Book Cover Card",
        "book cover",
        "opening book",
        "opening book card",
        "hinged cover reveal"
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
        "작은 영역에 모아 둔 카드 후보를 펼쳐 비교하게 하기"
      ],
      "en": [
        "Expand compact card choices for side by side inspection"
      ]
    },
    "aliases": {
      "ko": [
        "부채꼴 카드 펼치기",
        "카드 부채",
        "덱 펼침",
        "부채처럼 펼친 카드",
        "카드 패 펼치기"
      ],
      "en": [
        "Fan Spread Card Deck",
        "fan deck",
        "spread cards",
        "fanned playing cards",
        "spread card hand"
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
        "쿠폰이나 경품 공개 화면에서 덮개가 지워지는 모습을 범위 입력으로 시연"
      ],
      "en": [
        "Preview a scratch off reward reveal using a range control rather than freehand scratching"
      ]
    },
    "aliases": {
      "ko": [
        "스크래치 마스크 리빌 카드",
        "스크래치 카드",
        "긁기 마스크",
        "긁는 카드",
        "복권 스크래치",
        "은박 지우기"
      ],
      "en": [
        "Scratch Mask Reveal Card",
        "scratch card",
        "scratch reveal",
        "scratch off card",
        "lottery reveal",
        "silver coating erase"
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
        "제품 사진의 주요 부품을 선택해 기능 설명을 확인하게 하기"
      ],
      "en": [
        "Attach selectable feature explanations to parts of a product image"
      ]
    },
    "aliases": {
      "ko": [
        "제품 핫스폿 카드",
        "제품 주석",
        "이미지 핫스팟",
        "제품 부위 설명",
        "클릭 포인트 안내"
      ],
      "en": [
        "Product Hotspot Card",
        "product annotations",
        "image hotspot",
        "product feature markers",
        "interactive product annotations"
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
        "배경 테마나 사진을 전환할 때 중심에서 새로운 화면 공개"
      ],
      "en": [
        "Introduce a new photo or theme through an expanding circular window"
      ]
    },
    "aliases": {
      "ko": [
        "원형 창 장면 전환",
        "원형 전환",
        "장면 클립",
        "원형으로 바뀌는 화면",
        "동그란 마스크 전환"
      ],
      "en": [
        "Circular Scene Switch",
        "circle transition",
        "scene clip",
        "circle scene reveal",
        "circular window transition"
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
        "여러 타일의 상태 변화를 순서가 보이는 넘어짐으로 표현"
      ],
      "en": [
        "Show a sequence of tile state changes through staggered toppling"
      ]
    },
    "aliases": {
      "ko": [
        "도미노 타일 전환",
        "도미노 모션",
        "순차 쓰러짐",
        "차례로 넘어지는 타일",
        "도미노 뒤집기"
      ],
      "en": [
        "Domino Tile Transition",
        "domino motion",
        "staggered fall",
        "toppling tile sequence",
        "domino flip transition"
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
        "티저 화면의 가운데를 벌려 안쪽 메시지를 공개"
      ],
      "en": [
        "Open the middle of a teaser panel to expose its message"
      ]
    },
    "aliases": {
      "ko": [
        "지퍼 패널 열림",
        "지퍼 리빌",
        "양쪽 열기",
        "지퍼처럼 열리는 화면",
        "좌우 패널 벌리기"
      ],
      "en": [
        "Zipper Panel Opening",
        "zipper reveal",
        "split opening",
        "unzipping panel",
        "split seam opening"
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
        "동일 공간의 두 콘텐츠 면을 입체 회전으로 교체"
      ],
      "en": [
        "Switch two content views within one space using a cube turn"
      ]
    },
    "aliases": {
      "ko": [
        "큐브 면 패널 전환",
        "큐브 전환",
        "3D 패널",
        "육면체 화면 전환",
        "옆면으로 돌아가는 패널"
      ],
      "en": [
        "Cube Face Panel Switch",
        "cube transition",
        "rotating panel",
        "cube face transition",
        "rotating panel side"
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
        "모아 보기와 전체 보기 사이에서 카드 배치를 전환"
      ],
      "en": [
        "Switch a card collection between compact and expanded overview modes"
      ]
    },
    "aliases": {
      "ko": [
        "스택에서 격자로 전환",
        "스택 그리드",
        "펼침 레이아웃",
        "겹친 카드 격자 펼침",
        "카드 모음 전체 보기"
      ],
      "en": [
        "Stack to Grid Transition",
        "stack grid",
        "spread layout",
        "stacked cards to grid",
        "expand card overview"
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
        "반응형 랜딩 페이지에서 짧은 마지막 줄이 남는 제목을 정돈"
      ],
      "en": [
        "Keep responsive landing page headlines visually balanced across line breaks"
      ]
    },
    "aliases": {
      "ko": [
        "균형 잡힌 헤드라인 줄바꿈",
        "균형 줄바꿈",
        "헤드라인 균형",
        "제목 줄 길이 균형",
        "고아 단어 줄바꿈"
      ],
      "en": [
        "Balanced Headline Wrapping",
        "text wrap balance",
        "balanced heading",
        "balanced text wrapping",
        "headline orphan prevention"
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
        "학습 자료에서 본문 흐름을 유지하면서 발음이나 뜻을 덧붙이기"
      ],
      "en": [
        "Annotate educational text with pronunciation without interrupting the main line"
      ]
    },
    "aliases": {
      "ko": [
        "루비 발음 주석",
        "루비 태그",
        "발음 표기",
        "후리가나 표기",
        "한자 독음",
        "글자 위 작은 주석"
      ],
      "en": [
        "Ruby Reading Annotation",
        "ruby annotation",
        "reading gloss",
        "furigana annotation",
        "pronunciation above characters",
        "ruby gloss"
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
        "문구 검토 화면에서 삭제와 교체 제안을 시각적으로 구분"
      ],
      "en": [
        "Distinguish deletion and replacement suggestions in a copy review"
      ]
    },
    "aliases": {
      "ko": [
        "교정 표시 타이포",
        "교정 마크",
        "삽입 삭제",
        "교열 표시",
        "수정 전후 문구"
      ],
      "en": [
        "Proofreading Text Marks",
        "proofreading marks",
        "insert delete",
        "copy editing marks",
        "proofreader corrections"
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
        "읽는 위치를 벗어나지 않고 출처나 보충 설명을 확인하게 하기"
      ],
      "en": [
        "Let readers inspect supporting notes without leaving their reading position"
      ]
    },
    "aliases": {
      "ko": [
        "인라인 각주 펼침",
        "각주",
        "보충 설명",
        "본문 각주 열기",
        "문장 보충 설명"
      ],
      "en": [
        "Inline Footnote Disclosure",
        "footnote",
        "supplementary note",
        "expandable footnote",
        "inline reference disclosure"
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
        "전시나 문화 행사 소개에 세로 제목과 여백을 활용"
      ],
      "en": [
        "Use vertical headings and whitespace for an exhibition announcement"
      ]
    },
    "aliases": {
      "ko": [
        "세로쓰기 에디토리얼",
        "세로 타이포",
        "세로쓰기",
        "세로 제목 편집",
        "수직 글쓰기 포스터"
      ],
      "en": [
        "Vertical Editorial Typography",
        "vertical type",
        "vertical writing",
        "vertical writing poster",
        "vertical editorial heading"
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
        "가입 양식에서 입력한 비밀번호가 어떤 조건을 만족하는지 안내"
      ],
      "en": [
        "Explain which password requirements are met while completing a signup form"
      ]
    },
    "aliases": {
      "ko": [
        "비밀번호 조건 체크리스트",
        "암호 조건",
        "비밀번호 체크",
        "암호 규칙 검사",
        "비밀번호 요구사항 표시"
      ],
      "en": [
        "Password Rule Checklist",
        "password requirements",
        "password checklist",
        "password requirements checklist",
        "password validation hints"
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
        "메모 편집 도중 저장 필요 여부와 저장 완료 상태를 구분"
      ],
      "en": [
        "Distinguish pending edits from saved content in a note editor"
      ]
    },
    "aliases": {
      "ko": [
        "노트 변경·저장 상태",
        "변경 감지",
        "저장 상태",
        "미저장 변경 표시",
        "저장 필요 상태"
      ],
      "en": [
        "Dirty Note Save State",
        "dirty state",
        "save status",
        "unsaved changes indicator",
        "dirty editor state"
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
        "작업을 작은 단계로 나누어 완료된 조각을 명확히 표시"
      ],
      "en": [
        "Communicate discrete completed units within a staged task"
      ]
    },
    "aliases": {
      "ko": [
        "청크 단위 진행 피드백",
        "분할 진행률",
        "청크 진행",
        "조각 진행률",
        "단계별 처리 표시"
      ],
      "en": [
        "Chunked Progress Feedback",
        "chunk progress",
        "segmented progress",
        "segmented task progress",
        "chunk completion feedback"
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
        "콘텐츠에 하나의 감정 반응을 남기거나 선택을 취소하게 하기"
      ],
      "en": [
        "Allow one content reaction to be selected or cleared"
      ]
    },
    "aliases": {
      "ko": [
        "토글 반응 선택기",
        "반응 버튼",
        "리액션 선택",
        "반응 선택 취소",
        "감정 리액션 버튼"
      ],
      "en": [
        "Toggle Reaction Picker",
        "reaction buttons",
        "reaction picker",
        "single reaction toggle",
        "clear selected reaction"
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
        "온라인과 오프라인에 따른 안내 문구의 차이를 화면에서 시연"
      ],
      "en": [
        "Prototype online and offline status messaging without monitoring a network"
      ]
    },
    "aliases": {
      "ko": [
        "연결 상태 배너 시연",
        "오프라인 배너",
        "연결 안내",
        "오프라인 안내 시연",
        "연결 끊김 배너 목업"
      ],
      "en": [
        "Simulated Connectivity Banner",
        "offline banner",
        "connection status",
        "offline banner prototype",
        "simulated connection notice"
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
        "참여자가 많을 때 일부 아바타와 추가 인원 수로 공간 절약"
      ],
      "en": [
        "Summarize many participants with overlapping avatars and an overflow count"
      ]
    },
    "aliases": {
      "ko": [
        "아바타 오버플로 묶음",
        "아바타 그룹",
        "참여자 더보기",
        "참여자 더 보기",
        "겹친 프로필 묶음"
      ],
      "en": [
        "Avatar Overflow Cluster",
        "avatar group",
        "participant overflow",
        "participant avatar overflow",
        "avatar group more button"
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
        "메신저에서 같은 사람이 연속으로 보낸 내용을 묶어 읽기 쉽게 구성"
      ],
      "en": [
        "Make consecutive messages from one sender easier to scan"
      ]
    },
    "aliases": {
      "ko": [
        "발신자별 대화 묶음",
        "메시지 그룹",
        "채팅 말풍선",
        "연속 채팅 묶음",
        "발신자별 말풍선"
      ],
      "en": [
        "Grouped Chat Bubbles",
        "message grouping",
        "chat bubbles",
        "consecutive message grouping",
        "sender grouped bubbles"
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
        "주문이나 신청 절차에서 현재 단계와 완료 구간을 함께 안내"
      ],
      "en": [
        "Show completed milestones and the active step in an application flow"
      ]
    },
    "aliases": {
      "ko": [
        "수평 마일스톤 레일",
        "단계 레일",
        "마일스톤 단계",
        "가로 단계 안내",
        "진행 단계 연결선"
      ],
      "en": [
        "Horizontal Milestone Rail",
        "milestone rail",
        "step progress",
        "horizontal step milestones",
        "connected progress steps"
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
        "월간 일정 화면의 날짜 위치와 선택일 강조 방식 제시"
      ],
      "en": [
        "Prototype a monthly scheduling view with a clearly highlighted date"
      ]
    },
    "aliases": {
      "ko": [
        "월간 캘린더 그리드",
        "달력 배치",
        "월간 그리드",
        "달력 날짜 배치",
        "월간 날짜 격자"
      ],
      "en": [
        "Static Month Calendar Grid",
        "calendar layout",
        "month grid",
        "month date layout",
        "monthly calendar mockup"
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
        "선택 목록이 길어져도 확인과 취소 행동을 접근 가능한 위치에 유지"
      ],
      "en": [
        "Keep commit and cancel actions accessible within a long selection panel"
      ]
    },
    "aliases": {
      "ko": [
        "패널 고정 작업 푸터",
        "고정 푸터",
        "패널 액션",
        "고정 확인 버튼",
        "목록 하단 액션 유지"
      ],
      "en": [
        "Pinned Panel Action Footer",
        "pinned footer",
        "panel actions",
        "persistent panel actions",
        "fixed action footer"
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
        "설정값을 슬라이더와 원형 계기판으로 동시에 확인"
      ],
      "en": [
        "Show a setting through both a range input and a rotary indicator"
      ]
    },
    "aliases": {
      "ko": [
        "범위 입력 연결 로터리 다이얼",
        "로터리 노브",
        "다이얼 입력",
        "노브 슬라이더 연동",
        "회전 눈금 컨트롤"
      ],
      "en": [
        "Range Linked Rotary Dial",
        "rotary knob",
        "dial input",
        "range linked knob",
        "rotary value indicator"
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
        "만족도 조사에서 세 가지 감정 중 하나를 고르게 하기"
      ],
      "en": [
        "Collect one of three sentiment choices in a short feedback form"
      ]
    },
    "aliases": {
      "ko": [
        "감정 라디오 세그먼트",
        "감정 선택",
        "라디오 세그먼트",
        "만족도 감정 선택",
        "세 가지 라디오 감정"
      ],
      "en": [
        "Sentiment Radio Segments",
        "sentiment choice",
        "radio segments",
        "sentiment radio group",
        "three choice satisfaction"
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
        "예약이나 타이머 설정에서 자주 쓰는 시간 길이를 빠르게 선택"
      ],
      "en": [
        "Offer common durations when configuring a timer or booking"
      ]
    },
    "aliases": {
      "ko": [
        "시간 길이 프리셋 선택",
        "지속시간",
        "시간 프리셋",
        "타이머 길이 선택",
        "시간 프리셋 메뉴"
      ],
      "en": [
        "Duration Preset Select",
        "duration input",
        "time preset",
        "timer duration presets",
        "duration dropdown"
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
        "위치 설정에서 가로와 세로 좌표를 한 화면에서 조절"
      ],
      "en": [
        "Adjust horizontal and vertical placement in a two dimensional control"
      ]
    },
    "aliases": {
      "ko": [
        "두 축 좌표 패드",
        "좌표 입력",
        "XY 패드",
        "엑스 와이 조절",
        "이차원 위치 패드"
      ],
      "en": [
        "Two Axis Coordinate Pad",
        "coordinate input",
        "XY pad",
        "xy position control",
        "two dimensional control pad"
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
        "디자인 편집기에서 숫자 입력창을 열지 않고 수치를 미세 조정"
      ],
      "en": [
        "Fine tune numeric properties directly in a design inspector"
      ]
    },
    "aliases": {
      "ko": [
        "드래그 숫자 스크러버",
        "숫자 드래그",
        "스크럽 입력",
        "숫자 끌어 조절",
        "드래그 수치 변경"
      ],
      "en": [
        "Pointer Numeric Scrubber",
        "numeric drag",
        "scrub input",
        "scrub numeric value",
        "draggable number field"
      ]
    }
  }
};
