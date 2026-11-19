import type { GlossaryTermBody } from './types';

export const GAME_DEVELOPMENT_GLOSSARY_DATA: Record<string, GlossaryTermBody> = {
  'game-loop': {
    aliases: {
      ko: ['고정 타임스텝', '업데이트 렌더 루프', '델타 타임 루프', '시뮬레이션 틱'],
      en: ['fixed timestep', 'update render loop', 'simulation tick', 'frame loop'],
    },
    text: {
      ko: {
        definition: '입력 수집, 고정 간격 게임 상태 업데이트(물리·판정), 화면 렌더링을 매 프레임 반복 실행하며 주사율이 달라도 동일한 속도를 유지하게 하는 핵심 실행 구조입니다.',
        example: '60Hz로 고정된 물리 누적기(accumulator)가 16.67ms마다 이동과 충돌을 계산하고, 144Hz 디스플레이에서는 직전·현재 좌표 사이를 보간해 매끄럽게 그립니다.',
        promptSnippet: '게임 시뮬레이션은 고정 타임스텝(예: 16.67ms) 누적기로 실행하고 렌더링은 잔여 시간 보간(alpha)으로 분리해 주사율에 무관하게 일관된 물리·속도를 유지해 줘. 백그라운드 복귀 시 최대 delta 상한도 걸어 줘.',
      },
      en: {
        definition: 'The core heartbeat of a game that polls input, advances simulation at a consistent rate, and renders frames so gameplay speed remains independent of monitor refresh rates.',
        example: 'A 60Hz fixed-timestep accumulator steps physics every 16.67ms while rendering interpolates between previous and current positions for smooth 144Hz output.',
        promptSnippet: 'Implement the game loop with a fixed-timestep accumulator (e.g., 16.67ms) for deterministic physics and interpolated rendering, clamping maximum frame delta after tab inactivity.',
      },
    },
  },
  'save-serialization-and-checkpoint': {
    aliases: {
      ko: ['세이브 직렬화', '세이브 슬롯', '원자적 저장', '세이브 마이그레이션', '자동 저장 체크포인트'],
      en: ['save slots', 'atomic save', 'save migration', 'autosave checkpoint', 'save state serialization'],
    },
    text: {
      ko: {
        definition: '플레이어 위치·인벤토리·진행 플래그를 버전 번호가 포함된 안정적인 데이터 구조로 변환해 저장하고, 덮어쓰기·크래시·패치 이후에도 손실 없이 복원하는 체계입니다.',
        example: '세이브 JSON 헤더에 schemaVersion을 넣고 점유된 수동 슬롯을 덮어쓰기 전에는 인라인 확인/취소를 요구하며, 자동 저장은 임시 파일에 먼저 쓴 뒤 교체합니다.',
        promptSnippet: '세이브 데이터에는 schemaVersion과 플레이 타임을 포함하고, 이미 저장된 슬롯을 덮어쓸 때는 2단계 확인을 거치며, 크래시 손상을 막는 원자적 쓰기 또는 롤링 백업을 적용해 줘.',
      },
      en: {
        definition: 'Converting player progress, inventory, and flags into a versioned persistent format with crash-safe writes, slot overwrite protection, and patch migrations.',
        example: 'Stamp save payloads with schemaVersion, serialize autosaves safely before swapping, and ask for inline confirmation before overwriting an occupied manual slot.',
        promptSnippet: 'Include schemaVersion and playtime metadata in save payloads, migrate older save versions cleanly on load, and guard occupied save slots with inline overwrite confirmation.',
      },
    },
  },
  'hitbox-and-hurtbox': {
    aliases: {
      ko: ['타격 판정 박스', '피격 판정 박스', '공격 콜라이더', '무적 프레임 판정'],
      en: ['attack hitbox', 'damage hurtbox', 'collision box', 'active frames'],
    },
    text: {
      ko: {
        definition: '히트박스는 공격·투사체가 피해를 입히는 공격 판정 영역이고, 허트박스는 캐릭터가 피해를 입을 수 있는 피격 판정 영역으로 둘을 분리해 공정한 전투 감각을 만듭니다.',
        example: '액션 게임에서는 플레이어의 체감 공정성을 위해 캐릭터 허트박스를 보이는 스프라이트보다 약간 작게, 공격 히트박스는 검기 끝까지 약간 넓게 잡습니다.',
        promptSnippet: '공격 판정(Hitbox)과 피격 판정(Hurtbox) 레이어를 분리하고, 발동 프레임(Startup/Active/Recovery)과 피격 후 무적 시간(i-frames)을 디버그 오버레이로 검증할 수 있게 설계해 줘.',
      },
      en: {
        definition: 'Separating offensive collision volumes (hitboxes) from vulnerable character volumes (hurtboxes) so combat hits feel fair, readable, and tunable by animation frame.',
        example: 'Action games often shrink player hurtboxes slightly inside visual silhouettes while extending sword hitboxes slightly forward to make dodges and strikes feel rewarding.',
        promptSnippet: 'Separate offensive hitboxes from defensive hurtboxes with explicit startup, active, and recovery frame windows plus invulnerability frames (i-frames) after taking a hit.',
      },
    },
  },
  'hitstop-and-game-feel': {
    aliases: {
      ko: ['타격감', '히트 프리즈', '역경직', '화면 흔들림', '게임 필'],
      en: ['hit freeze', 'impact frame', 'screen shake', 'juice', 'combat feel'],
    },
    text: {
      ko: {
        definition: '공격이 적중한 순간 약 40~100ms 동안 타격 주체를 잠시 멈추는 히트스톱과 짧은 히트 플래시·감쇠 진동 등을 조합해 타격의 무게감과 손맛을 극대화하는 기법입니다.',
        example: '강공격 명중 시 80ms 히트스톱 정지 프레임을 걸고 6px 화면 흔들림과 데미지 팝업을 함께 실행하며, 접근성 설정이나 prefers-reduced-motion에서는 흔들림을 끕니다.',
        promptSnippet: '공격 명중 시 40~100ms 히트스톱 정지 프레임, 짧은 피격 플래시, 감쇠 화면 흔들림을 조합하되 UI·BGM은 멈추지 않고 prefers-reduced-motion에서는 진동 효과를 비활성화해 줘.',
      },
      en: {
        definition: 'Tactile feedback crafted through brief 40–100ms freeze frames (hitstop), impact flashes, recoil, and damped camera shake so attacks convey weight and clarity.',
        example: 'Trigger an 80ms hitstop freeze ring and 6px damped shake on heavy strikes while leaving HUD/audio responsive and honoring prefers-reduced-motion.',
        promptSnippet: 'Combine a 40–100ms hitstop impact freeze with a brief hit flash and damped screen shake while keeping HUD/audio responsive and suppressing shake under prefers-reduced-motion.',
      },
    },
  },
  'coyote-time-and-input-buffering': {
    aliases: {
      ko: ['코요테 타임', '선입력 버퍼', '점프 유예 시간', '조작 보정'],
      en: ['coyote time', 'jump buffer', 'input buffer', 'ledge grace window'],
    },
    text: {
      ko: {
        definition: '발판 끝을 막 벗어난 직후 약 80~120ms 동안 점프를 허용하는 코요테 타임과, 착지·후딜 직전 누른 입력을 기억했다가 즉시 발동하는 입력 버퍼링의 조합입니다.',
        example: '플레이어가 절벽에서 4프레임 늦게 점프 버튼을 눌러도 정상 점프가 나가고, 땅에 닿기 100ms 전에 누른 회피 키가 착지 즉시 실행되어 답답함이 사라집니다.',
        promptSnippet: '플랫포머·액션 입력에 80~120ms 코요테 타임과 선입력 버퍼 윈도우를 두어 발판 이탈 직후나 경직 해제 직전 입력이 누락되지 않고 즉시 발동되게 구현해 줘.',
      },
      en: {
        definition: 'Two forgiveness mechanics: coyote time lets players still jump briefly (80–120ms) after walking off a ledge, while input buffering queues slightly early inputs to execute immediately once eligible.',
        example: 'Pressing Jump 4 frames after leaving a ledge still launches cleanly, and pressing Dodge 90ms before landing triggers on the exact landing tick.',
        promptSnippet: 'Add an 80–120ms coyote time grace window after leaving ledges and an input buffer queue so slightly early jump or dodge presses fire on the first valid frame.',
      },
    },
  },
  'object-pooling': {
    aliases: {
      ko: ['오브젝트 풀', '인스턴스 재사용', '가비지 컬렉션 억제', '메모리 풀링'],
      en: ['object pool', 'instance reuse', 'GC spike prevention', 'memory pooling'],
    },
    text: {
      ko: {
        definition: '총알·파티클·데미지 팝업처럼 초당 수십 번씩 생성·소멸되는 객체를 매번 새로 할당하고 파기하는 대신 미리 만든 풀에서 꺼내 쓰고 반납해 프레임 끊김을 막는 기법입니다.',
        example: '탄막 슈팅 게임에서 탄환 500개와 데미지 숫자 팝업을 미리 초기화해 두고 활성 플래그만 전환해 가비지 컬렉션(GC) 스파이크를 없앱니다.',
        promptSnippet: '빈번히 생성·제거되는 투사체, 파티클, 플로팅 데미지 요소는 매번 생성/삭제하지 말고 고정 크기 오브젝트 풀에서 활성 상태를 재활용해 프레임 드롭을 방지해 줘.',
      },
      en: {
        definition: 'Pre-allocating a reusable pool of frequently spawned objects (projectiles, particles, damage popups) and resetting active flags instead of allocating and garbage-collecting every frame.',
        example: 'A bullet-hell shooter pre-allocates 500 projectile slots and recycles expired instances cleanly without triggering GC frame hitches.',
        promptSnippet: 'Reuse high-churn entities like projectiles, particles, and floating damage text from a pre-allocated object pool with explicit caps rather than allocating and destroying per event.',
      },
    },
  },
  'entity-component-system': {
    aliases: {
      ko: ['ECS', '엔티티 컴포넌트 시스템', '데이터 지향 게임 설계', '컴포넌트 조합'],
      en: ['ECS', 'entity component system', 'data-oriented game architecture', 'composition over inheritance'],
    },
    text: {
      ko: {
        definition: '객체를 고유 ID인 엔티티(Entity), 순수 상태 데이터인 컴포넌트(Component), 동일 컴포넌트 묶음을 순회 처리하는 시스템(System)으로 분리해 확장성과 캐시 효율을 높이는 게임 아키텍처입니다.',
        example: '깊은 클래스 상속 대신 Position·Health·Inventory 컴포넌트를 자유롭게 조합해 캐릭터·상자·함정을 만들고 이동·피해 시스템이 이를 일괄 처리합니다.',
        promptSnippet: '엔티티(ID)·컴포넌트(순수 데이터)·시스템(로직 순회)을 분리하는 ECS 구조로 상태를 구성해 상속 계층 폭발 없이 장비·버프·스킬 효과를 유연하게 조합할 수 있게 해 줘.',
      },
      en: {
        definition: 'An architectural pattern separating object identities (Entities), pure data bags (Components), and logic processors (Systems) for flexible composition and cache-friendly iteration.',
        example: 'Compose units, chests, and hazards by attaching Health, Position, and Buff components without deep inheritance trees while Systems iterate matching component sets.',
        promptSnippet: 'Structure game state around Entity IDs, pure data Components, and focused Systems so abilities, status effects, and equipment loadouts compose cleanly without deep inheritance.',
      },
    },
  },
  'heads-up-display': {
    aliases: {
      ko: ['HUD', '전투 HUD', '게임 상태 표시줄', '체력 실드 오버레이', '미니맵 바'],
      en: ['HUD', 'combat HUD', 'game status overlay', 'player status bar'],
    },
    text: {
      ko: {
        definition: '플레이어가 시선을 게임 화면 중앙에 둔 상태에서도 체력·실드·탄약·쿨다운·보스 페이즈를 한눈에 파악할 수 있도록 화면 위에 겹쳐 띄우는 상시 인터페이스입니다.',
        example: '즉시 깎이는 HP 바 뒤에 220ms 지연 추격 잔상을 두고, 보스 체력바에는 66%·33% 페이즈 눈금을 표시하며 5~10% 안전 영역 여백 안에 고정합니다.',
        promptSnippet: '전투 HUD는 중앙 시야를 가리지 않도록 화면 가장자리 안전 영역 안에 배치하고, 색상 외에 아이콘·눈금·수치를 함께 제공해 색약 사용자도 즉시 상태를 읽게 구성해 줘.',
      },
      en: {
        definition: 'The persistent status overlay displaying vital player and encounter telemetry—such as HP, shields, cooldowns, and boss phases—readable in peripheral vision without leaving the action.',
        example: 'Show instant HP drop with a 220ms trailing damage bar, 66%/33% boss phase notch markers, and safe-zone margin alignment paired with non-color labels.',
        promptSnippet: 'Anchor HUD bars inside screen safe zones so center combat stays unobstructed, pairing color changes with threshold notches, icons, and numeric readouts for accessibility.',
      },
    },
  },
  'diegetic-interface': {
    aliases: {
      ko: ['다이이제틱 UI', 'diegetic UI', '세계관 내장 UI', '공간감 인터페이스', '게임 내 계기판'],
      en: ['diegetic UI', 'world-integrated UI', 'in-world interface', 'immersion UI'],
    },
    text: {
      ko: {
        definition: '체력, 탄약, 길 안내, 장비 선택 등을 별도 평면 메뉴 대신 게임 세계관 속 오브젝트(캐릭터 등 뒤 게이지, 홀로그램, 나침반 등)에 녹여 몰입감을 높이는 UI 방식입니다.',
        example: 'SF 게임에서 캐릭터 슈트 척추에 남은 체력 불빛을 표시하거나 무기 조준경 옆 홀로그램으로 남은 탄약을 띄우고, 필요 시 일반 HUD 보조 옵션을 함께 제공합니다.',
        promptSnippet: '다이이제틱 인터페이스에서는 세계관 내 시각 요소로 상태를 전달하되 작은 글자·낮은 대비로 가독성이 떨어지지 않도록 접근성용 고대비·고정 HUD 대체 옵션을 함께 고려해 줘.',
      },
      en: {
        definition: 'UI elements embedded directly inside the fictional game world—such as suit spine health gauges, weapon ammo counters, or holographic wheels—to preserve player immersion.',
        example: 'Render ammo counts on a rifle hologram or suit telemetry bar, while offering an optional high-contrast screen HUD fallback for legibility and accessibility.',
        promptSnippet: 'Integrate diegetic gauges seamlessly into game-world surfaces without sacrificing contrast, and provide optional high-legibility HUD fallbacks for players needing larger text or clear outlines.',
      },
    },
  },
  'rollback-netcode': {
    aliases: {
      ko: ['롤백 동기화', '지연 보상 넷코드', '예측 롤백', '대전 격투 넷코드', '클라이언트 예측'],
      en: ['rollback synchronization', 'client-side prediction', 'input delay netcode', 'GGPO style netcode'],
    },
    text: {
      ko: {
        definition: '원격 플레이어 입력이 도착할 때까지 화면을 멈춰 기다리지 않고 직전 입력을 예측해 즉시 실행한 뒤, 실제 입력이 다르면 과거 프레임으로 되감아(Rollback) 순식간에 재계산하는 네트워크 동기화 기법입니다.',
        example: '대전 격투 게임에서 내 펀치 입력을 지연 없이 바로 출력하고, 3프레임 뒤 상대 입력이 도착해 차이가 생기면 해당 시점 스냅샷에서 3프레임을 1프레임 안에 재시뮬레이션합니다.',
        promptSnippet: '실시간 반응성이 중요한 멀티플레이에서는 로컬 입력 예측과 상태 스냅샷 저장을 분리해 지연 체감을 줄이되, 승패·판정 권한과 재접속 스냅샷 동기화 기준을 명확히 정의해 줘.',
      },
      en: {
        definition: 'A multiplayer synchronization model that predicts remote inputs so local actions feel instant, then rewinds to a saved snapshot and fast-forwards simulation when differing remote inputs arrive.',
        example: 'In fighting or arena games, local attacks trigger immediately without waiting for round-trip latency; if a late remote packet differs, the engine rewinds and resimulates cleanly.',
        promptSnippet: 'Design multiplayer networking around deterministic snapshots or server-authoritative prediction so local controls stay responsive while correcting mispredictions and reconnects smoothly.',
      },
    },
  },
  'skill-based-matchmaking': {
    aliases: {
      ko: ['SBMM', '실력 기반 매칭', 'MMR 매치메이킹', '레이팅 매칭', '대기열 큐'],
      en: ['SBMM', 'MMR matchmaking', 'elo matchmaking', 'ranked queue', 'skill rating matching'],
    },
    text: {
      ko: {
        definition: '플레이어의 숨은 실력 지표(MMR)와 네트워크 지연(핑), 대기 시간을 함께 고려해 대등한 상대를 찾아주고 시간 초과 시 탐색 범위를 점진적으로 넓히는 멀티플레이어 매칭 방식입니다.',
        example: '큐 시작 첫 15초는 유사 MMR·낮은 핑 위주로 찾고, 대기가 길어지면 허용 MMR 폭을 넓히며 매치 성사 시 10초 수락 체크(Ready Check)로 이탈자를 걸러냅니다.',
        promptSnippet: '매치메이킹 큐에는 경과 시간 표시, 핑/MMR 범위 점진 확장, 10초 제한 수락 체크(Ready Check) 및 일부 거절 시 우선순위 재탐색(Priority Re-queue) 흐름을 구현해 줘.',
      },
      en: {
        definition: 'Pairing players of comparable matchmaking rating (MMR) while balancing regional latency and wait time, gradually widening brackets as queue duration rises.',
        example: 'Search narrow MMR and low ping initially, widen tolerances after 20 seconds, and launch a 10s Ready Check with player readiness pips before locking the match.',
        promptSnippet: 'Design matchmaking queues with elapsed search timers, progressive MMR/ping bracket expansion, a 10s Ready Check with player status pips, and clean priority re-queueing on decline.',
      },
    },
  },
  'loot-table-and-pity-system': {
    aliases: {
      ko: ['전리품 확률표', '드롭 테이블', '천장 시스템', '가챠 천장', '희귀도 보정'],
      en: ['loot table', 'drop table', 'pity counter', 'bad luck protection', 'rarity weights'],
    },
    text: {
      ko: {
        definition: '아이템 등급·종류별 출현 가중치를 정의하는 전리품 확률표(Loot Table)와, 일정 횟수 이상 최고 등급을 못 얻으면 확정 보상을 보장하는 천장(Pity) 안전장치의 결합입니다.',
        example: '일반·희귀·영웅·전설 가중치를 70:22:7:1로 두되 80회 연속 미획득 시 전설 확정 천장을 적용하고, 개봉 카드에는 380ms 등급 광택 스윕과 스탯 비교를 표시합니다.',
        promptSnippet: '전리품·보상 시스템에는 가중치 확률표와 투명한 천장(Pity) 카운터 표시를 두고, 실제 추첨은 신뢰된 서버에서 처리하며 클라이언트는 등급별 개봉 연출과 능력치 비교를 제공해 줘.',
      },
      en: {
        definition: 'Pairing weighted drop distributions (loot tables) with deterministic bad-luck protection (pity counters) that guarantee a high-rarity drop after a capped streak of misses.',
        example: 'Configure weighted tiers (Common/Rare/Epic/Legendary) alongside a visible 80-pull pity guarantee, revealing authoritative results with a 380ms sheen sweep and stat breakdown.',
        promptSnippet: 'Combine weighted loot tables with a clear pity counter guarantee, keep actual drop rolls server-authoritative for online play, and present drops with tiered rarity reveal effects.',
      },
    },
  },
};
