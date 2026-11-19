import type { TechniqueItem } from '../techniques';

export const GAME_ADDITIONS: TechniqueItem[] = [
  /* 1. 전투·HUD (game_hud) */
  {
    id: 'game-delayed-health-bar',
    domain: 'game',
    category: 'game_hud',
    vibeTag: '피격 시 즉각 깎이는 체력 뒤로 잔상 게이지가 지연 추격하는',
    vibeKeywords: ['지연 체력바', '실드 HUD', '잔상 체력 게이지', '피격 피드백', '보스 체력바'],
    titleKo: '지연 추격 체력·실드 바',
    titleEn: 'Delayed-Trail Health & Shield Bar',
    summary: '보호막 우선 흡수, 즉시 차감되는 체력, 220ms 후 450ms 동안 추격하는 흰색·호박색 잔상 트레일과 저체력 위험 경고를 구현',
    promptSnippet:
      '지정한 영역에 전투용 지연 추격 체력·실드 바 HUD를 만들어 줘. 너비 100%, 최소 높이 180px 컨테이너 안에 12px 둥근 모서리와 1px 테두리의 카드를 구성해 줘. 최대 체력 100과 최대 실드 40을 표시하며, 공격을 받으면 실드가 먼저 차감되고 남은 피해만 체력(HP)에서 즉시 줄어들게 해 줘. 체력이 깎인 자리에 남아 있던 이전 체력 위치에서 220ms 지연 후 450ms 동안 부드럽게 따라오는 잔상 트레일(Ghost Trail) 바를 렌더링해 줘. 체력이 25% 이하가 되면 테두리와 배지가 붉게 경고 강조되도록 해 줘(prefers-reduced-motion에서는 맥동 애니메이션 중단). 하단에는 피해 -18, 강타 -35, 회복 +25, 초기화 버튼을 배치하고 native progressbar 역할과 aria-valuenow 접근성 속성을 제공해 줘.',
  },
  {
    id: 'game-radial-weapon-wheel',
    domain: 'game',
    category: 'game_hud',
    vibeTag: '원형 섹터가 팽창하며 장비·스킬을 직관적으로 고르는',
    vibeKeywords: ['무기 휠', '방사형 메뉴', '원형 퀵슬롯', '스킬 휠', '장비 선택 휠'],
    titleKo: '방사형 무기·스킬 휠 메뉴',
    titleEn: 'Radial Weapon & Skill Wheel',
    summary: '6개 원형 섹터 중 활성 슬롯이 바깥으로 6px 돌출되며 클릭·방향키로 즉시 장비를 전환하는 방사형 휠 UI',
    promptSnippet:
      '지정한 영역에 6개 슬롯으로 구성된 방사형 무기·스킬 휠 선택기를 만들어 줘. 너비 100%, 최소 높이 180px 컨테이너 안에 12px 모서리 카드를 두고, 직경 180px 안팎의 SVG 원형 휠을 배치해 줘. 검·활·지팡이·방패·물약·폭탄 6개 부채꼴 섹터 중 선택되거나 포커스된 섹터는 바깥쪽으로 6px 돌출되고 150ms 트랜지션으로 강조되며, 중앙 원형 허브에는 현재 장착된 장비 이름과 단축 번호를 표시해 줘. 마우스 클릭·호버뿐만 아니라 좌/우 방향키(ArrowLeft/ArrowRight)로도 6개 슬롯을 순환 선택할 수 있게 하고 aria-pressed 상태와 focus-visible 표시를 보장해 줘.',
  },
  {
    id: 'game-boss-phase-bar',
    domain: 'game',
    category: 'game_hud',
    vibeTag: '체력 임계치 눈금과 그로기 게이지를 함께 보여주는',
    vibeKeywords: ['보스 체력바', '페이즈 전환 바', '그로기 게이지', '스테이지 보스 HUD', '보스 체력'],
    titleKo: '다단계 보스 페이즈 체력바',
    titleEn: 'Multi-Phase Boss Health Bar',
    summary: '66%·33% 페이즈 임계 눈금, 페이즈 배지 전환 알림 플래시, 보조 경직(그로기) 게이지를 결합한 보스 전투 HUD',
    promptSnippet:
      '지정한 영역에 다단계 페이즈 전환을 표시하는 보스 체력바 HUD를 만들어 줘. 너비 100%, 최소 높이 180px, 12px 둥근 모서리 카드 안에 보스 이름, 현재 페이즈 배지(1·2·3페이즈), 최대 체력 100 기준의 메인 체력바, 그리고 66%와 33% 지점의 수직 페이즈 임계 눈금 마커를 배치해 줘. 아래에는 경직(그로기) 게이지를 두고, 공격 -20과 강공격 -35 버튼으로 체력이 66% 또는 33% 아래로 내려갈 때 500ms 동안 페이즈 전환 배너 알림을 띄워 줘. 경직 게이지가 100%에 도달하면 브레이크 상태를 표시하고, 초기화 버튼으로 1페이즈(100%) 상태로 복원할 수 있게 해 줘.',
  },

  /* 2. 게임필·피드백 (game_feel) */
  {
    id: 'game-damage-number-pop',
    domain: 'game',
    category: 'game_feel',
    vibeTag: '타격 순간 치명타 수치와 점멸이 공중으로 튀어 오르는',
    vibeKeywords: ['플로팅 데미지', '타격 수치 팝업', '크리티컬 팝업', '히트 플래시', '데미지 텍스트'],
    titleKo: '플로팅 데미지·크리티컬 팝업',
    titleEn: 'Floating Damage & Critical Popups',
    summary: '일반(-124)·치명타(-480)·약점(-310) 타격에 맞춰 750ms 동안 솟아오르는 데미지 숫자와 70ms 피격 점멸·140ms 미세 흔들림을 결합',
    promptSnippet:
      '지정한 영역에 타격 시 데미지 숫자가 솟아오르는 플로팅 데미지 팝업 데모를 만들어 줘. 너비 100%, 최소 높이 180px, 12px 둥근 모서리 카드 안에 표적 더미 배지를 두고, 일반 타격(-124), 치명타(-480), 약점 타격(-310) 버튼을 제공해 줘. 버튼을 누르면 표적 위에 데미지 수치와 배지가 생성되어 750ms 동안 위로 솟구치며 페이드아웃되고 만료 타이머가 정리되게 해 줘. 타격 직후 70ms 동안 표적 하이라이트 점멸과 140ms 미세 흔들림을 적용하되, prefers-reduced-motion 환경에서는 흔들림을 생략하고 수치 팝업과 누적 피해 기록만 차분히 표시해 줘.',
  },
  {
    id: 'game-combo-rank-meter',
    domain: 'game',
    category: 'game_feel',
    vibeTag: '연속 타격으로 스타일 랭크가 오르고 멈추면 서서히 감쇠하는',
    vibeKeywords: ['콤보 랭크 미터', '스타일 랭크', '콤보 감쇠 게이지', '연타 카운터', '액션 콤보'],
    titleKo: '스타일 콤보 랭크 감쇠 미터',
    titleEn: 'Style Combo Rank Decay Meter',
    summary: '일반 타격과 스킬 연계로 D→C→B→A→S→SS 랭크가 상승하고 100ms 주기로 유지 타이머 게이지가 서서히 감소하는 콤보 미터',
    promptSnippet:
      '지정한 영역에 스타일 콤보 랭크와 시간 감쇠 미터를 만들어 줘. 너비 100%, 최소 높이 180px, 12px 둥근 모서리 카드 안에 현재 랭크 배지(D·C·B·A·S·SS), 누적 콤보 수, 그리고 유지 게이지 바를 배치해 줘. 일반 타격(+1 콤보, 게이지 +20) 또는 스킬 연계(+3 콤보, 게이지 +45) 버튼을 누르면 게이지가 즉시 오르며 점수 임계치에 따라 랭크가 상승하고, 입력이 없으면 100ms 간격으로 게이지가 감소해 0이 되면 한 단계씩 랭크가 내려가게 해 줘. 초기에는 35% 감쇠 게이지의 A랭크 예시로 보여 주며, 초기화 버튼과 언마운트 시 interval 정리를 반드시 포함해 줘.',
  },
  {
    id: 'game-hitstop-impact-frame',
    domain: 'game',
    category: 'game_feel',
    vibeTag: '충돌 순간 80ms 정지 프레임과 감쇠 흔들림으로 타격감을 비교하는',
    vibeKeywords: ['히트스톱 시뮬레이터', '타격감 연출', '임팩트 프레임', '화면 흔들림', '히트 프리즈'],
    titleKo: '히트스톱·화면 흔들림 시뮬레이터',
    titleEn: 'Hitstop & Screen Shake Impact Simulator',
    summary: '80ms 히트스톱 정지와 6px 화면 흔들림 토글을 독립 제어해 타격 직전·임팩트 정지·160ms 반동 복귀의 타격감 차이를 체감',
    promptSnippet:
      '지정한 영역에 히트스톱(Hitstop)과 화면 흔들림(Screen Shake)을 개별 토글하며 비교할 수 있는 타격감 시뮬레이터를 만들어 줘. 너비 100%, 최소 높이 180px, 12px 둥근 모서리 카드 안에 검격 공격자와 표적 블록이 충돌하는 무대를 두고, 상단에 80ms 히트스톱 토글과 6px 화면 흔들림 토글 버튼을 배치해 줘. [공격 실행] 버튼을 누르면 히트스톱이 켜진 경우 충돌 순간 80ms 동안 충격 링이 고정된 정지 프레임이 유지된 뒤 160ms 반동으로 복귀하고, 화면 흔들림이 켜진 경우 무대가 감쇠 진동하며 현재 적용된 타이밍 배지를 표시해 줘. 모든 타이머는 언마운트 시 정리하고 prefers-reduced-motion에서는 흔들림을 비활성화해 줘.',
  },

  /* 3. 성장·인벤토리 (game_progression) */
  {
    id: 'game-loot-rarity-reveal',
    domain: 'game',
    category: 'game_progression',
    vibeTag: '등급별 테두리 광채와 380ms 개봉 광택으로 전리품을 감정하는',
    vibeKeywords: ['전리품 등급 카드', '아이템 개봉 연출', '레어도 카드', '보상 등급', '장비 감정 카드'],
    titleKo: '등급별 전리품 카드 공개 연출',
    titleEn: 'Loot Rarity Reveal Card',
    summary: '일반·희귀·영웅·전설 4단계 등급 전환과 380ms 개봉 광택 스윕으로 별점·부가 능력치·등급 광채를 연출하는 루트 카드',
    promptSnippet:
      '지정한 영역에 등급별 전리품 카드 공개 연출을 만들어 줘. 너비 100%, 최소 높이 180px, 12px 둥근 모서리 카드 안에 일반(Common)·희귀(Rare)·영웅(Epic)·전설(Legendary) 4단계 등급 선택 버튼과 [감정 / 다시 개봉] 버튼을 배치해 줘. 등급을 선택하거나 개봉 버튼을 누르면 380ms 동안 대각선 광택 스윕 애니메이션과 등급별 테두리 글로우가 재생되며 장비 이름, 별 개수(1~4개), 부가 능력치 2줄이 표시되게 해 줘. 라이트·다크 테마 양쪽에서 희귀도 색상 대비가 선명하도록 구성하고, 언마운트 시 애니메이션 타이머를 정리해 줘.',
  },
  {
    id: 'game-skill-tree-node',
    domain: 'game',
    category: 'game_progression',
    vibeTag: '선행 노드 연결선을 따라 스킬 포인트를 배분해 해금하는',
    vibeKeywords: ['스킬 트리', '노드 해금', '스킬 포인트 분배', '특성 트리', 'RPG 성장 트리'],
    titleKo: '의존성 스킬 트리 노드 해금',
    titleEn: 'Dependency Skill Tree Unlocker',
    summary: '5개 노드를 잇는 SVG 연결선과 3 SP 예산 안에서 선행 조건이 충족된 노드만 해금·초기화할 수 있는 RPG 스킬 트리',
    promptSnippet:
      '지정한 영역에 선행 노드 조건을 검증하는 5개 노드 RPG 스킬 트리를 만들어 줘. 너비 100%, 최소 높이 180px, 12px 둥근 모서리 카드 안에 보유 스킬 포인트(초기 3 SP)와 SVG 연결선으로 이어진 5개 노드(기초 검술 → 2갈래 중급 스킬 → 최종 오의)를 배치해 줘. 이미 해금된 부모 노드가 있어야만 자식 노드가 [해금 가능] 상태로 열리며, 잠긴 노드는 disabled 처리하고 해금 시 160ms 전환으로 연결선과 노드가 강조되게 해 줘. 우측 상단 초기화 버튼을 누르면 모든 노드가 초기 상태로 돌아가고 3 SP가 반환되도록 해 줘.',
  },

  /* 4. 로비·매치메이킹 (game_lobby) */
  {
    id: 'game-matchmaking-ready-check',
    domain: 'game',
    category: 'game_lobby',
    vibeTag: '큐 탐색 타이머부터 10초 수락 체크와 파티원 응답까지 이어지는',
    vibeKeywords: ['매치메이킹 큐', '수락 체크', '매치 성사 모달', '큐 타이머', '로비 대기열'],
    titleKo: '매치메이킹 큐 & 수락 체크',
    titleEn: 'Matchmaking Queue & Ready Check',
    summary: '대기·매칭 탐색(경과 시간)·10초 레디 체크(4명 중 3/4 수락 상태)·수락/거절 확정의 4단계 멀티플레이어 매치 흐름을 구현',
    promptSnippet:
      '지정한 영역에 멀티플레이어 매치메이킹 큐와 수락(Ready Check) 흐름 카드를 만들어 줘. 너비 100%, 최소 높이 180px, 12px 둥근 모서리 카드 안에서 대기(Idle) → 탐색 중(Searching, 1000ms 단위 경과 초 표시 및 취소 버튼) → 수락 확인(Ready Check, 10초 카운트다운 바와 4개 플레이어 응답 점 중 3/4 준비 완료 표시) → 매칭 확정/취소의 상태 전환을 구현해 줘. 탐색 중 [매치 발견 시뮬레이션] 버튼으로 즉시 수락 확인 단계에 진입할 수 있고, 수락 확인 단계에서 [수락] 또는 [거절]을 누르면 4/4 확정 또는 큐 취소 결과 배너와 [다시 탐색] 복원 버튼을 제공해 줘. 모든 interval 타이머는 언마운트 시 정리해 줘.',
  },
  {
    id: 'game-save-slot-manager',
    domain: 'game',
    category: 'game_lobby',
    vibeTag: '기존 세이브 덮어쓰기 전 2단계 확인으로 데이터 손실을 막는',
    vibeKeywords: ['세이브 슬롯', '저장 슬롯 관리', '덮어쓰기 확인', '게임 저장 불러오기', '체크포인트 슬롯'],
    titleKo: '세이브 슬롯 덮어쓰기·복원 카드',
    titleEn: 'Save Slot Overwrite & Recovery Panel',
    summary: '자동 저장(14h 22m)·수동 저장·빈 슬롯 3칸에서 불러오기와 점유 슬롯 덮어쓰기 시 인라인 2단계 확인(확인/취소)을 제공',
    promptSnippet:
      '지정한 영역에 3개 세이브 슬롯을 관리하는 게임 저장·불러오기 패널을 만들어 줘. 너비 100%, 최소 높이 180px, 12px 둥근 모서리 카드 안에 자동 저장(슬롯 1, 플레이 타임 14h 22m), 수동 저장(슬롯 2), 빈 슬롯(슬롯 3) 3행 목록을 배치해 줘. 각 슬롯에는 [저장]과 [불러오기] 버튼을 두되, 데이터가 있는 슬롯에 [저장]을 누르면 즉시 덮어쓰지 않고 해당 행 안에서 인라인으로 [덮어쓰기 확인] / [취소] 2단계 확인을 요구하게 해 줘. 빈 슬롯은 [불러오기]를 비활성화하고 저장 시 바로 새 세이브 기록으로 채워 주며, 마지막 작업 결과를 polite 상태 영역에 안내해 줘.',
  },
];
