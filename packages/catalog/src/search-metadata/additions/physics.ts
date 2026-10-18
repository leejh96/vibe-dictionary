import type { SearchMetadata } from '../../search-metadata';

export const PHYSICS_SEARCH_METADATA = {"mg-phase-wave-superposition": {
  "targets": [
    "scene",
    "shape"
  ],
  "triggers": [
    "input"
  ],
  "useCases": {
    "ko": [
      "위상 슬라이더로 두 사인파와 실제 합성 변위의 보강·상쇄 간섭을 비교한다."
    ],
    "en": [
      "Compare two sine waves and their actual summed displacement with a phase slider."
    ]
  },
  "aliases": {
    "ko": [
      "위상 간섭",
      "사인파 합성"
    ],
    "en": [
      "phase interference",
      "sine wave addition"
    ]
  }
},
"mg-fixed-pulley-constraint": {
  "targets": [
    "scene",
    "shape"
  ],
  "triggers": [
    "input"
  ],
  "useCases": {
    "ko": [
      "줄 위치를 직접 바꿔 일정한 줄 길이와 양끝의 반대 이동을 비교한다."
    ],
    "en": [
      "Adjust rope position to compare constant rope length and equal opposite motion at both ends."
    ]
  },
  "aliases": {
    "ko": [
      "고정 도르래 구속",
      "줄 길이 제약"
    ],
    "en": [
      "fixed pulley constraint",
      "rope length constraint"
    ]
  }
},
"mg-angular-momentum-spin": {
  "targets": [
    "scene",
    "shape"
  ],
  "triggers": [
    "auto",
    "input",
    "click"
  ],
  "useCases": {
    "ko": [
      "회전하는 두 추의 거리를 조절해 관성과 회전 속도의 관계를 비교하고 일시정지해 관찰한다."
    ],
    "en": [
      "Adjust two rotating masses inward or outward to compare inertia and spin speed, with pause for observation."
    ]
  },
  "aliases": {
    "ko": [
      "가변 관성 회전",
      "각운동량 회전"
    ],
    "en": [
      "variable inertia spin",
      "angular momentum spin"
    ]
  }
},
"mg-no-slip-rolling-wheel": {
  "targets": [
    "scene",
    "shape"
  ],
  "triggers": [
    "input",
    "click"
  ],
  "useCases": {
    "ko": [
      "반경을 바꾼 뒤 같은 거리를 굴려 반경과 회전각의 반비례 관계를 비교한다."
    ],
    "en": [
      "Change wheel radius and roll the same distance to compare the inverse relation between radius and rotation angle."
    ]
  },
  "aliases": {
    "ko": [
      "무미끄럼 구름",
      "구름 구속"
    ],
    "en": [
      "no slip rolling",
      "rolling constraint"
    ]
  }
},
"mg-mass-ratio-elastic-collision": {
  "targets": [
    "scene",
    "shape"
  ],
  "triggers": [
    "input",
    "click"
  ],
  "useCases": {
    "ko": [
      "둘째 블록의 질량 비율을 바꾸고 충돌시켜 첫 블록의 통과·정지·반발을 비교한다."
    ],
    "en": [
      "Adjust the second block’s mass ratio and trigger a collision to compare forward motion, stopping and rebound of the first block."
    ]
  },
  "aliases": {
    "ko": [
      "질량비 탄성 충돌",
      "일차원 탄성 충돌"
    ],
    "en": [
      "mass ratio elastic impact",
      "one dimensional elastic collision"
    ]
  }
},
"mg-kinetic-friction-slide": {
  "targets": [
    "scene",
    "shape"
  ],
  "triggers": [
    "input",
    "click"
  ],
  "useCases": {
    "ko": [
      "마찰 계수를 바꾼 뒤 같은 초기 속도로 밀어 정지 거리와 감속을 비교한다."
    ],
    "en": [
      "Change friction and push with the same initial speed to compare deceleration and stopping distance."
    ]
  },
  "aliases": {
    "ko": [
      "마찰 감속",
      "마찰 정지 거리"
    ],
    "en": [
      "friction deceleration",
      "friction stopping distance"
    ]
  }
},
"mg-restitution-bounce-drop": {
  "targets": [
    "scene",
    "shape"
  ],
  "triggers": [
    "input",
    "click"
  ],
  "useCases": {
    "ko": [
      "반발 계수를 조절해 공을 떨어뜨리고 줄어드는 반발 높이와 비행 시간을 비교한다."
    ],
    "en": [
      "Adjust restitution and drop a ball to compare diminishing rebound heights and flight times."
    ]
  },
  "aliases": {
    "ko": [
      "반발계수 바운스",
      "감쇠 반발"
    ],
    "en": [
      "restitution bounce",
      "diminishing rebound"
    ]
  }
},
"mg-length-controlled-pendulum": {
  "targets": [
    "scene",
    "shape"
  ],
  "triggers": [
    "auto",
    "input",
    "click"
  ],
  "useCases": {
    "ko": [
      "줄 길이로 왕복 주기를 바꾸고 일시정지·재생으로 진자의 위상을 관찰한다."
    ],
    "en": [
      "Change string length to compare swing periods, then pause and resume to observe the pendulum phase."
    ]
  },
  "aliases": {
    "ko": [
      "길이 제어 진자",
      "소각도 단진자"
    ],
    "en": [
      "length controlled pendulum",
      "small angle pendulum"
    ]
  }
},
"mg-gravity-projectile-arc": {
  "targets": [
    "scene",
    "shape"
  ],
  "triggers": [
    "input",
    "click"
  ],
  "useCases": {
    "ko": [
      "발사각을 바꾸고 공을 발사해 포물선 높이·사거리·비행 시간을 비교한다."
    ],
    "en": [
      "Change launch angle and launch the ball to compare parabolic height, range and flight time."
    ]
  },
  "aliases": {
    "ko": [
      "포물선 투사체",
      "탄도 궤적"
    ],
    "en": [
      "parabolic projectile",
      "ballistic trajectory"
    ]
  }
},
"mg-damped-spring-release": {
  "targets": [
    "scene",
    "shape"
  ],
  "triggers": [
    "click"
  ],
  "useCases": {
    "ko": [
      "당긴 스프링을 놓고 점차 작아지는 양방향 진동과 평형점 정착을 관찰한다."
    ],
    "en": [
      "Release a stretched spring to observe decreasing oscillations on both sides and settling at equilibrium."
    ]
  },
  "aliases": {
    "ko": [
      "감쇠 진동",
      "스프링 복귀"
    ],
    "en": [
      "damped oscillation",
      "spring release settling"
    ]
  }
},
} satisfies Record<string, SearchMetadata>;
