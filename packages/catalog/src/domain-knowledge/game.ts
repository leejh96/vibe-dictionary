import type { DomainKnowledge } from '../domain-knowledge';

export const GAME_KNOWLEDGE: DomainKnowledge[] = [
  {
    id: 'game-loop-fixed-timestep-and-input-feel',
    aliases: {
      ko: ['게임 루프', '고정 타임스텝', '타격감', '히트스톱', '코요테 타임', '입력 버퍼링', '게임 필'],
      en: ['game loop', 'fixed timestep', 'game feel', 'hitstop', 'coyote time', 'input buffering', 'delta time'],
    },
    useCases: {
      ko: [
        '모니터 주사율(60Hz·144Hz)이 달라도 물리·이동·판정이 동일하게 작동하도록 고정 타임스텝 루프를 설계할 때',
        '점프·회피 입력의 불쾌한 씹힘을 줄이기 위해 코요테 타임과 입력 버퍼링을 도입할 때',
        '공격 충돌 순간 히트스톱(정지 프레임), 화면 흔들림, 플로팅 데미지로 타격감을 전달할 때',
        '빈번한 탄환·파티클·데미지 텍스트 생성으로 인한 프레임 드롭을 오브젝트 풀링으로 억제할 때',
      ],
      en: [
        'Designing a fixed timestep simulation loop so physics and combat remain deterministic across 60Hz and 144Hz displays',
        'Adding coyote time and input buffering so platforming jumps and dodges never feel dropped near edges or animations',
        'Combining hitstop freeze frames, damped screen shake, and floating damage popups for crisp combat feedback',
        'Preventing garbage-collection frame spikes on frequent projectiles, particles, and damage text using object pooling',
      ],
    },
    keywords: {
      ko: ['게임 루프', '고정 타임스텝', '델타 타임', '보간', '타격감', '히트스톱', '코요테 타임', '입력 버퍼링', '오브젝트 풀링'],
      en: ['game loop', 'fixed timestep', 'delta time', 'interpolation', 'game feel', 'hitstop', 'coyote time', 'input buffering', 'object pooling'],
    },
    text: {
      ko: {
        domain: '게임 개발',
        title: '게임 루프·고정 타임스텝과 조작감(Game Feel) 설계',
        summary: '프레임레이트에 독립적인 고정 타임스텝 시뮬레이션과 입력 버퍼링·코요테 타임·히트스톱으로 일관되고 쫀득한 조작감을 만듭니다.',
        overview: '게임에서는 화면 주사율과 하드웨어 성능이 사용자마다 다르기 때문에 매 프레임 경과 시간(delta time)에 물리와 판정을 그대로 묶으면 고주사율 기기에서 캐릭터 속도가 달라지거나 터널링(벽 뚫림) 버그가 발생합니다. 이를 해결하기 위해 누적 시간(accumulator)을 일정 간격(예: 1/60초)으로 소비하는 고정 타임스텝(Fixed Timestep) 물리 업데이트와 남은 비율 기반 렌더링 보간(Interpolation)을 분리해야 합니다. 또한 조작의 답답함을 없애려면 낭떠러지 직후 몇 프레임 동안 점프를 허용하는 코요테 타임(Coyote Time), 선입력 버퍼링(Input Buffering), 타격 순간의 짧은 히트스톱(Hitstop)과 접근성용 모션 감소 옵션 분리를 함께 설계해야 합니다.',
        concepts: [
          { name: '고정 타임스텝과 누적기(Fixed Timestep & Accumulator)', description: '렌더 주기와 분리된 고정 간격(예: 16.67ms)으로 물리와 충돌을 스텝 실행하고, 탭 전환으로 델타가 튀는 현상(Spiral of Death)을 막기 위해 최대 프레임 델타 상한(clamping)을 둡니다.' },
          { name: '코요테 타임 & 입력 버퍼링(Coyote Time & Input Buffering)', description: '발판을 벗어난 직후 약 80~120ms의 유예(코요테 타임)와 착지 직전 입력을 저장했다가 착지 순간 실행하는 버퍼(80~150ms)로 조작 관용도를 높입니다.' },
          { name: '히트스톱·화면 흔들림과 오브젝트 풀링(Hitstop & Object Pooling)', description: '타격 시 짧은 정지 프레임(40~100ms)과 감쇠 흔들림으로 무게감을 주고, 반복 생성되는 이펙트·팝업은 사전 할당 풀에서 재사용해 GC 끊김을 줄입니다.' },
        ],
        workflow: [
          { name: '고정 물리 틱과 가변 렌더 보간 분리하기', description: '시뮬레이션 누적기로 고정 틱(예: 60Hz)을 처리한 뒤 잔여 시간(alpha = accumulator / fixedDt)으로 직전·현재 상태를 보간해 렌더링합니다.' },
          { name: '입력 상태 큐와 관용 타이머 연결하기', description: '원시 키 입력을 매 프레임 판정하지 않고 타임스탬프 버퍼에 기록해 선입력·코요테 타임·히트스톱 중 입력 보류 여부를 일관되게 처리합니다.' },
          { name: '이펙트 풀링 및 접근성 옵션 분기하기', description: '데미지 텍스트·파티클에 최대 풀 상한을 정하고, 화면 흔들림과 번쩍임(히트 플래시)은 설정 및 prefers-reduced-motion에서 끌 수 있게 분리합니다.' },
        ],
        pitfalls: [
          { name: '가변 deltaTime에 비선형 물리·점프 수식 직접 곱하기', description: '프레임 드롭 시 한 번의 큰 deltaTime으로 캐릭터가 바닥 콜라이더를 관통하거나 프레임레이트별로 점프 높이가 달라집니다.' },
          { name: '히트스톱 중 사운드·네트워크·UI 입력까지 함께 얼리기', description: '타격 연출용 정지 프레임은 공격자와 피격자 애니메이션/물리에만 국한해야 하며 HUD 조작, BGM, 네트워크 심박수까지 멈추면 응답 불능처럼 느껴집니다.' },
        ],
        questions: [
          '시뮬레이션 틱 레이트(예: 30Hz, 60Hz, 120Hz)와 백그라운드 탭 복귀 시 최대 델타 상한(max frame delta)은 얼마로 제한할 것인가요?',
          '히트스톱 도중 들어온 회피·콤보 입력을 무시할 것인가요, 아니면 버퍼에 저장해 정지 해제 직후 실행할 것인가요?',
          '화면 흔들림·히트 플래시 효과를 게임 내 접근성 설정으로 강도 조절(0%~100%)하거나 완전 비활성화할 수 있게 할 것인가요?',
        ],
        example: '예시: 2D 액션 플랫폼 게임에서 물리 루프는 60Hz 고정 스텝으로 돌리고, 144Hz 모니터에서는 직전 위치와 현재 위치를 alpha 비율로 보간해 부드럽게 그립니다. 동시에 강공격 타격 시 80ms 히트스톱 동안 입력 버퍼에 들어온 다음 콤보 키를 보관했다가 정지가 풀리는 프레임에 즉시 이어갑니다.',
        relatedDesigns: [
          { id: 'game-hitstop-impact-frame', reason: '80ms 히트스톱 정지 프레임과 6px 감쇠 화면 흔들림 토글이 타격감에 미치는 차이를 직접 비교합니다.' },
          { id: 'game-damage-number-pop', reason: '타격 시 솟아오르는 데미지 수치 팝업과 모션 감소 옵션 대응 피드백을 시연합니다.' },
          { id: 'game-combo-rank-meter', reason: '연속 입력 유예 시간(감쇠 게이지)과 스타일 랭크 상승·하락 구조를 보여 줍니다.' },
          { id: 'px-jump-arc-poses', reason: '예비 동작·상승·정점 체공·착지 충격 흡수의 점프 포즈 단계를 확인합니다.' },
        ],
        promptSnippet:
          '지정한 영역에 고정 타임스텝 시뮬레이션 기반의 타격감 테스트 패널을 만들어 줘. 너비 100%, 최소 높이 180px 컨테이너 안에 12px 모서리 카드를 구성하고, 히트스톱(80ms)과 화면 흔들림(6px) 토글 및 [공격 실행] 버튼을 배치해 정지 프레임과 160ms 반동 복귀가 구분되도록 구현해 줘. prefers-reduced-motion 환경에서는 흔들림을 비활성화하고 타이머를 언마운트 시 정리해 줘.',
      },
      en: {
        domain: 'Game Development',
        title: 'Game Loop, Fixed Timestep, and Game Feel Architecture',
        summary: 'Combine frame-rate-independent fixed timestep physics with input buffering, coyote time, and hitstop for crisp, deterministic feel.',
        overview: 'Because player hardware spans 60Hz to 240Hz displays, tying physics and collision checks directly to variable frame delta times causes inconsistent jump arcs and collision tunneling. Separating a fixed timestep accumulator loop (such as 60Hz) from interpolated rendering keeps gameplay deterministic. On top of a stable loop, thoughtful game feel relies on coyote time, input buffering, object pooling for high-frequency VFX, and accessibility toggles for screen shake and flashes.',
        concepts: [
          { name: 'Fixed Timestep & Accumulator', description: 'Accumulating real elapsed time to advance simulation in fixed steps (e.g., 16.67ms) with a clamped max delta to prevent spiral-of-death freezes on tab resume.' },
          { name: 'Coyote Time & Input Buffering', description: 'Granting a brief 80–120ms grace window after stepping off a ledge and queueing pre-landing inputs so responsive actions never feel dropped.' },
          { name: 'Hitstop, Screen Shake & Object Pooling', description: 'Applying short 40–100ms impact freeze frames for weight while recycling floating numbers and particles from pre-allocated pools to prevent GC stutters.' },
        ],
        workflow: [
          { name: 'Separate Fixed Simulation from Render Interpolation', description: 'Consume accumulated delta in fixed steps and blend previous and current transforms using alpha = accumulator / fixedDt when drawing.' },
          { name: 'Buffer Player Inputs Across Freeze States', description: 'Record timestamped action intents so inputs pressed slightly early or during hitstop execute immediately on the next valid frame.' },
          { name: 'Pool Ephemeral VFX & Expose Comfort Toggles', description: 'Cap pooled damage numbers/particles and allow disabling screen shake and hit flashes via settings and prefers-reduced-motion.' },
        ],
        pitfalls: [
          { name: 'Multiplying Non-Linear Physics Directly by Variable DeltaTime', description: 'Large frame hitches stretch movement steps past wall colliders and alter jump heights across different refresh rates.' },
          { name: 'Freezing Audio, HUD, or Network Heartbeats During Hitstop', description: 'Hitstop should pause combat actor animation and hit physics locally rather than halting menu controls, audio playback, or network sync.' },
        ],
        questions: [
          'What fixed tick rate (30Hz, 60Hz, 120Hz) and max frame delta cap will prevent spiral-of-death after window focus loss?',
          'Should inputs pressed during hitstop freeze frames be discarded or queued in the input buffer for immediate execution afterward?',
          'Can players independently scale down or disable screen shake and hit-flash effects for motion comfort?',
        ],
        example: 'Example: An action platformer simulates movement at a fixed 60Hz step while interpolating visuals for 144Hz monitors. On a heavy hit, the attackers freeze for 80ms hitstop while buffering a queued follow-up dodge input to fire on the first post-freeze tick.',
        relatedDesigns: [
          { id: 'game-hitstop-impact-frame', reason: 'Lets developers toggle 80ms hitstop and 6px screen shake independently to compare impact feel.' },
          { id: 'game-damage-number-pop', reason: 'Demonstrates rising damage popups with 70ms hit flash and reduced-motion safe shake.' },
          { id: 'game-combo-rank-meter', reason: 'Visualizes buffered combo rank escalation and idle decay timing.' },
          { id: 'px-jump-arc-poses', reason: 'Illustrates jump anticipation, apex hang, and landing compression poses.' },
        ],
        promptSnippet:
          'Create an interactive impact feel test panel in the specified area. Inside a container of width 100% and min-height 180px with 12px rounded corners, provide independent 80ms Hitstop and 6px Screen Shake toggles alongside a Strike trigger button, showing freeze-frame impact and 160ms recoil recovery while suppressing shake under prefers-reduced-motion and cleaning up timers on unmount.',
      },
    },
    sources: [
      { title: 'Fix Your Timestep! — Gaffer On Games', url: 'https://gafferongames.com/post/fix_your_timestep/' },
      { title: 'Game Programming Patterns: Game Loop', url: 'https://gameprogrammingpatterns.com/game-loop.html' },
    ],
  },
  {
    id: 'game-hud-combat-feedback-and-accessibility',
    aliases: {
      ko: ['게임 HUD', '체력바', '다이이제틱 UI', '전투 피드백', '무기 휠', '게임 접근성', '보스 체력바'],
      en: ['game HUD', 'health bar', 'diegetic UI', 'combat feedback', 'weapon wheel', 'game accessibility', 'boss bar'],
    },
    useCases: {
      ko: [
        '전투 중 시선 분산을 최소화하면서도 체력·보호막·스킬 쿨다운·보스 패턴을 즉시 읽히는 HUD 계층을 잡을 때',
        '피해량을 한눈에 파악하도록 즉시 감소 체력 바 뒤에 지연 추격 잔상(Ghost Trail)을 배치할 때',
        '많은 무기·물약·스킬 슬롯을 버튼 열거 대신 방사형 휠 메뉴와 키보드·패드 방향으로 선택하게 할 때',
        '색약·저시력·모션 민감 플레이어를 위해 색상에만 의존하지 않는 패턴·기호·폰트 크기·HUD 안전 영역을 설계할 때',
      ],
      en: [
        'Structuring combat HUD hierarchy so health, shields, cooldowns, and boss phases read in peripheral vision',
        'Adding a delayed damage ghost trail behind instant HP drops so chunk damage remains legible in fast fights',
        'Replacing crowded linear hotbars with radial weapon/skill wheels operable by pointer, keyboard, or stick',
        'Designing accessible combat UI with colorblind-safe indicators, shape cues, scalable fonts, and screen safe zones',
      ],
    },
    keywords: {
      ko: ['HUD', '다이이제틱 UI', '지연 체력바', '방사형 휠', '보스 페이즈', '게임 접근성', '안전 영역', '색약 대응'],
      en: ['HUD', 'diegetic UI', 'delayed health bar', 'radial wheel', 'boss phase', 'game accessibility', 'safe area', 'colorblind safe'],
    },
    text: {
      ko: {
        domain: '게임 개발',
        title: '전투 HUD 계층·다이이제틱 피드백과 게임 접근성',
        summary: '지연 추격 체력바, 방사형 퀵휠, 보스 페이즈 표식을 중심으로 즉각적 가독성과 색·모션·입력 접근성을 함께 설계합니다.',
        overview: '액션과 전략 게임의 HUD는 플레이어가 화면 중앙의 위협에서 눈을 떼지 않고도 생존 자원(HP·실드·스태미나)과 적 상태(보스 페이즈·그로기)를 읽을 수 있어야 합니다. 이를 위해 화면 모서리 고정형(Non-diegetic) HUD, 캐릭터 주변 공간형(Spatial) 팝업, 세계관 내장형(Diegetic) 계기판을 목적에 맞게 조합합니다. 동시에 저체력 깜빡임이나 등급 색상을 빨강/초록 색상 차이만으로 구분하면 색각 이상 플레이어가 상태를 놓치므로, 임계 눈금·아이콘 형태·대비 텍스트를 병행하고 16:9 및 울트라와이드/모바일 노치 환경의 안전 영역(Safe Area)을 확보해야 합니다.',
        concepts: [
          { name: '스파셜·다이이제틱·비다이이제틱 UI 구분', description: '세계관 내부 오브젝트(탄창 LED 등)로 표현하는 다이이제틱, 캐릭터 머리 위 데미지 숫자 같은 공간형(Spatial), 화면 고정 체력 HUD를 정보 긴급도에 따라 배치합니다.' },
          { name: '지연 추격 체력 트레일과 임계 눈금(Delayed Trail & Phase Notches)', description: '실제 체력은 즉시 줄이되 이전 값을 200ms 안팎 유지 후 따라오게 해 한 번에 받은 피해량을 직관화하고, 보스 체력바에는 66%/33% 같은 페이즈 경계 눈금을 그립니다.' },
          { name: '비색상 중복 신호 & 안전 영역(Non-Color Cues & Safe Zones)', description: '색상 변화 외에 테두리 굵기, 위험 아이콘, 수치 라벨, 오디오/진동 보조 신호를 함께 제공하며 화면 가장자리 5~10% 안전 여백을 지킵니다.' },
        ],
        workflow: [
          { name: '정보 긴급도별 HUD 밀도 배분하기', description: '항상 봐야 하는 체력·실드는 상단/하단 고정 앵커에, 일시적 무기 교체는 중앙 휠 오버레이로 분리해 평소 시야를 비웁니다.' },
          { name: '피격·회복·페이즈 전환 상태 중복 표시하기', description: '피격 시 실드 우선 소모, HP 즉시 감소, 잔상 트레일 추격과 함께 25% 이하 저체력 경고를 아이콘과 텍스트로 동시 전달합니다.' },
          { name: '키보드·컨트롤러·터치 대체 입력 보장하기', description: '방사형 휠처럼 포인터/아날로그 스틱에 최적화된 UI도 좌우 방향키 순환과 숫자 단축키, 충분한 터치 면적을 제공합니다.' },
        ],
        pitfalls: [
          { name: '전투와 무관한 장식 요소로 중앙 시야 가리기', description: '거대한 알림 배너나 불투명 툴팁이 캐릭터·투사체를 가리면 불공정한 피격으로 이어집니다.' },
          { name: '색상만으로 적·아군·희귀도·위험 상태 구분하기', description: '적색 점멸이나 녹색 회복 표시만 쓰면 적록 색각 이상 사용자가 위험 경고를 인지할 수 없습니다.' },
        ],
        questions: [
          '방사형 무기 휠이 열릴 때 게임 시간을 슬로우 모션(예: 0.25x)으로 늦출 것인가요, 일시정지할 것인가요, 실시간으로 유지할 것인가요?',
          '오버스캔이나 모바일 노치·모서리 곡률을 고려한 HUD 안전 영역(Safe Area) 비율과 UI 스케일 범위(예: 80%~130%)는 어떻게 설정할까요?',
          '저체력 경고 효과나 보스 페이즈 전환 알림을 시각 외의 효과음·컨트롤러 진동과 어떻게 동기화할 것인가요?',
        ],
        example: '예시: 보스전에서 플레이어 HP바는 220ms 지연 후 따라오는 호박색 잔상 트레일로 큰 피해량을 체감하게 하고, 화면 상단 보스 체력바는 66%·33% 수직 눈금과 페이즈 배지로 다음 패턴 임박 시점을 예고합니다.',
        relatedDesigns: [
          { id: 'game-delayed-health-bar', reason: '실드 우선 차감, 220ms 지연 450ms 추격 잔상 바, 25% 이하 저체력 경고를 구현합니다.' },
          { id: 'game-radial-weapon-wheel', reason: '6개 장비 섹터를 포인터와 방향키로 선택하는 방사형 휠 메뉴를 보여 줍니다.' },
          { id: 'game-boss-phase-bar', reason: '66%·33% 페이즈 임계 눈금과 경직 게이지를 갖춘 보스 체력바를 제공합니다.' },
          { id: 'px-hud-health-shield-bar', reason: '도트 게임 스타일의 분할 하트·실드 HUD 예시를 참고할 수 있습니다.' },
        ],
        promptSnippet:
          '지정한 영역에 실드 우선 소모와 220ms 지연 추격 잔상 트레일을 갖춘 전투 체력 HUD를 만들어 줘. 너비 100%, 최소 높이 180px 컨테이너 안에 12px 모서리 카드를 구성하고 최대 HP 100·실드 40, 25% 이하 저체력 경고 표시, 그리고 native progressbar 속성을 갖춘 공격·강타·회복 버튼을 배치해 줘.',
      },
      en: {
        domain: 'Game Development',
        title: 'Combat HUD Hierarchy, Diegetic Feedback, and Accessibility',
        summary: 'Design readable combat HUDs combining delayed-trail health bars, radial selectors, boss phase notches, and color-independent accessibility.',
        overview: 'Effective game HUDs communicate survival resources, cooldowns, and boss phase shifts in peripheral vision without occluding active combat. Teams balance world-embedded diegetic gauges, spatial world-space popups, and screen-anchored HUD elements based on urgency. Crucially, combat interfaces must never rely on hue alone or violate screen safe zones—low-HP alerts, rarities, and radial menus require paired icons, labels, threshold notches, and full keyboard/gamepad accessibility.',
        concepts: [
          { name: 'Diegetic, Spatial & Non-Diegetic UI Spectrum', description: 'Matching world-integrated gauges, character-anchored popups, and screen-edge HUD bars to how immediately players need the feedback.' },
          { name: 'Delayed Damage Ghost Trail & Phase Notches', description: 'Holding a ghost bar briefly (~220ms) before easing down communicates chunk damage at a glance, while notch markers on boss bars telegraph phase transitions.' },
          { name: 'Multi-Modal Cues & HUD Safe Areas', description: 'Pairing color transitions with borders, icons, numeric values, and audio/haptic cues while keeping critical bars inside screen-edge safe margins.' },
        ],
        workflow: [
          { name: 'Prioritize Peripheral Anchors & On-Demand Overlays', description: 'Anchor persistent HP/shield bars to screen corners and tuck dense gear switching into an on-demand radial wheel.' },
          { name: 'Layer Instant, Trailing & Threshold States', description: 'Absorb hits on shield first, update core HP immediately, animate the trailing ghost bar, and display both visual and numeric low-HP alerts.' },
          { name: 'Ensure Non-Pointer Input Parity', description: 'Allow arrow keys, hotkeys, or d-pad inputs to navigate radial wheels and menus cleanly alongside mouse or analog sticks.' },
        ],
        pitfalls: [
          { name: 'Obscuring Active Combat Lanes with Banners', description: 'Large centered announcements during active combat block incoming projectiles and frustrate players.' },
          { name: 'Conveying Critical State by Color Alone', description: 'Red/green-only damage or rarity indicators fail color-vision-deficient players without shape, notch, or text backups.' },
        ],
        questions: [
          'Should opening the radial weapon wheel apply slow-motion (e.g., 0.25x), pause gameplay, or keep simulation running in real time?',
          'What HUD safe-zone padding and UI scale range (e.g., 80%–130%) will support notched mobile screens and ultrawide monitors?',
          'How should low-HP and boss-phase alerts synchronize across HUD visuals, audio cues, and controller haptics?',
        ],
        example: 'Example: During a boss encounter, the player bar flashes damage via a 220ms-delayed ghost trail, while the boss bar displays 66% and 33% threshold notches and an icon-paired Phase 2 shift badge.',
        relatedDesigns: [
          { id: 'game-delayed-health-bar', reason: 'Implements shield-first absorption, 220ms-delayed 450ms ghost trail, and <=25% low-HP warning.' },
          { id: 'game-radial-weapon-wheel', reason: 'Demonstrates a 6-slot radial wheel supporting both pointer selection and arrow-key cycling.' },
          { id: 'game-boss-phase-bar', reason: 'Shows 66%/33% threshold notches, phase alert banners, and secondary stagger bars.' },
          { id: 'px-hud-health-shield-bar', reason: 'Provides a pixel-art heart and shield HUD counterpart for retro games.' },
        ],
        promptSnippet:
          'Build a combat HUD with shield-first absorption and a 220ms-delayed ghost damage trail in the specified area. Inside a container of width 100% and min-height 180px with 12px rounded corners, render max HP 100, max Shield 40, a <=25% low-HP warning state, and Hit/Heal controls using accessible progressbar semantics.',
      },
    },
    sources: [
      { title: 'Xbox Accessibility Guidelines (XAGs)', url: 'https://learn.microsoft.com/en-us/gaming/accessibility/guidelines' },
      { title: 'Game Accessibility Guidelines', url: 'https://gameaccessibilityguidelines.com/' },
    ],
  },
  {
    id: 'game-inventory-progression-and-economy-balance',
    aliases: {
      ko: ['인벤토리', '스킬 트리', '게임 경제', '전리품 확률표', '천장 시스템', '아이템 등급', '장비 비교'],
      en: ['game inventory', 'skill tree', 'game economy', 'loot table', 'pity system', 'item rarity', 'gear comparison'],
    },
    useCases: {
      ko: [
        '골드·재료 등 재화 유입(Faucet)과 소비(Sink) 균형을 맞춰 인플레이션을 방지하는 게임 경제를 설계할 때',
        '선행 노드 조건·포인트 환불(Respec)·빌드 비교가 가능한 RPG 스킬 트리를 구축할 때',
        '드롭 확률표(Loot Table)와 천장(Pity) 카운터, 등급별 전리품 개봉 피드백을 결합할 때',
        '슬롯 제한, 스택 크기, 무게 한도, 장비 스탯 증감 비교창 등 인벤토리 규칙을 정의할 때',
      ],
      en: [
        'Balancing currency faucets and sinks to prevent late-game resource inflation in game economies',
        'Designing prerequisite-gated RPG skill trees with clear node unlock states and point refunds',
        'Pairing weighted loot tables and pity counters with tiered rarity reveal feedback',
        'Defining inventory slot limits, stack sizes, encumbrance rules, and equipped stat delta comparisons',
      ],
    },
    keywords: {
      ko: ['게임 경제', '파우셋과 싱크', '스킬 트리', '전리품 확률표', '천장 시스템', '인벤토리', '스탯 비교', '희귀도'],
      en: ['game economy', 'faucets and sinks', 'skill tree', 'loot table', 'pity system', 'inventory', 'stat comparison', 'rarity'],
    },
    text: {
      ko: {
        domain: '게임 개발',
        title: '인벤토리·성장 곡선과 게임 경제·전리품 밸런스',
        summary: '재화 유입/소비 균형(Faucets & Sinks), 선행 조건형 스킬 트리, 가중치 드롭 테이블과 천장 시스템을 체계적으로 설계합니다.',
        overview: 'RPG·로그라이크·라이브 서비스 게임에서는 아이템 획득과 캐릭터 성장이 플레이 동기의 핵심입니다. 그러나 재화 생산(Faucet)만 늘고 소모(Sink: 수리비·강화·재분배 비용 등)가 부족하면 게임 내 경제가 급격히 붕괴합니다. 또한 스킬 트리는 선행 노드 의존성 그래프와 되돌리기(Respec) 규칙을 명확히 검증해야 하며, 확률형 전리품 시스템은 단순 난수 대신 가중치 드롭 테이블과 연속 실패 보정(Pity Counter)을 결합해 플레이어 좌절을 방지하고 등급별 시각·청각 보상으로 기대감을 유지해야 합니다.',
        concepts: [
          { name: '유입과 소비 루프(Faucets & Sinks)', description: '퀘스트 보상·몬스터 드롭(Faucet)과 상점 구매·제작·내구도 수리·스킬 초기화(Sink)의 순환 속도를 시뮬레이션해 재화 과잉 축적을 막습니다.' },
          { name: '의존성 스킬 그래프와 포인트 예산(Dependency Skill Graph)', description: '유향 비순환 그래프(DAG)로 부모 노드 해금 여부를 판정하고, 중간 노드를 되돌릴 때 연결된 하위 노드의 고아 상태를 차단합니다.' },
          { name: '가중치 확률표와 천장 보정(Loot Tables & Pity System)', description: '등급별 드롭 가중치와 별개로 연속 미획득 횟수를 추적해 일정 횟수 도달 시 상위 등급 보상을 확정 지급하는 안전망을 둡니다.' },
        ],
        workflow: [
          { name: '인벤토리 용량·스택·장착 슬롯 규칙 고정하기', description: '최대 슬롯 수, 동일 소모품 중첩 상한, 장비 교체 시 공격력/방어력 증감(델타) 비교 기준을 먼저 확정합니다.' },
          { name: '스킬 트리 선행 조건 및 환불 제약 검증하기', description: '루트 노드에서 도달 가능(reachable)한 노드만 해금 허용하고, 포인트 반환 시 전체 초기화 또는 말단 노드부터 단계적 해제를 강제합니다.' },
          { name: '전리품 개봉 연출과 서버 측 드롭 판정 분리하기', description: '클라이언트는 등급별 광채·스윕 개봉 연출만 담당하고, 실제 드롭 결과와 천장 카운터 차감은 신뢰할 수 있는 판정 로직/서버에서 결정합니다.' },
        ],
        pitfalls: [
          { name: '중간 부모 노드만 환불해 하위 스킬이 공중에 뜨는(Orphaned) 버그', description: '의존 그래프의 루트 연결성을 다시 검사하지 않고 단일 노드 포인트를 회수하면 선행 조건 없는 최종 스킬이 활성화됩니다.' },
          { name: '클라이언트에서 전리품 등급과 확률을 직접 추첨하기', description: '싱글 경쟁 리더보드나 온라인 게임에서 클라이언트 난수로 드롭을 결정하면 메모리 변조로 전설 아이템을 무한 생성할 수 있습니다.' },
        ],
        questions: [
          '스킬 포인트 초기화(Respec)를 무료로 언제든 허용할 것인가요, 재화나 특정 거점을 요구할 것인가요?',
          '인벤토리가 가득 찬 상태에서 전리품을 얻으면 바닥에 드롭할 것인가요, 우편함/임시 보관함으로 보낼 것인가요?',
          '천장(Pity) 카운터는 배너·던전별로 분리할 것인가요, 계정 전체에서 이월(Carry-over)할 것인가요?',
        ],
        example: '예시: 5개 노드 스킬 트리에서 3 SP를 부여할 때 기초 검술(1 SP)을 찍어야만 두 갈래 중급 스킬이 열리며, 전리품 상자 개봉 시에는 서버가 확정한 영웅 등급 아이템을 380ms 광택 스윕과 스탯 비교 델타(+14 ATK)와 함께 표시합니다.',
        relatedDesigns: [
          { id: 'game-skill-tree-node', reason: '선행 노드 조건과 3 SP 예산 검증을 갖춘 5노드 SVG 스킬 트리를 시연합니다.' },
          { id: 'game-loot-rarity-reveal', reason: '4단계 희귀도 전환과 380ms 개봉 광택 스윕 연출을 제공합니다.' },
          { id: 'px-inventory-grid-selector', reason: '픽셀 격자 기반 인벤토리 슬롯 탐색과 상세 스탯 패널 예시를 보여 줍니다.' },
          { id: 'px-equipment-stat-comparison', reason: '기존 장비 대비 신규 장비의 능력치 증감(▲/▼) 비교 UI를 참고합니다.' },
        ],
        promptSnippet:
          '지정한 영역에 선행 노드 조건과 3 SP 예산을 검증하는 RPG 스킬 트리 패널을 만들어 줘. 너비 100%, 최소 높이 180px 컨테이너 안에 12px 모서리 카드를 구성하고 SVG 연결선으로 이어진 5개 노드를 배치해 부모 노드가 해금되기 전에는 자식 노드를 비활성화하며 160ms 전환과 전체 포인트 초기화 버튼을 구현해 줘.',
      },
      en: {
        domain: 'Game Development',
        title: 'Inventory Systems, Progression Curves, and Economy Balance',
        summary: 'Structure currency faucets and sinks, dependency-checked skill trees, weighted loot tables, and pity safeguards.',
        overview: 'Progression loops and item drops drive long-term engagement, yet economies quickly inflate if currency faucets outpace meaningful sinks such as upgrades, repairs, or respecs. Meanwhile, skill trees require acyclic dependency validation so refunds cannot leave downstream nodes orphaned, and probabilistic loot tables work best when paired with transparent pity counters and clear rarity reveal feedback.',
        concepts: [
          { name: 'Faucets & Sinks Economy Loop', description: 'Balancing resource inflows (quests, drops) against purposeful outflows (crafting, upgrades, maintenance, respecs) to preserve currency value.' },
          { name: 'Dependency Skill Graph & Respec Integrity', description: 'Validating unlockable nodes via directed parent prerequisites and preventing orphaned child skills when refunding intermediate nodes.' },
          { name: 'Weighted Loot Tables & Pity Safeguards', description: 'Combining weighted drop rolls with consecutive-miss pity counters so players never hit unbounded unlucky streaks.' },
        ],
        workflow: [
          { name: 'Codify Slot, Stack & Stat-Delta Rules', description: 'Lock down maximum inventory slots, stack caps, overflow handling, and equipped-vs-candidate stat delta calculation.' },
          { name: 'Validate Skill Tree Prerequisites on Unlock & Refund', description: 'Disable locked children until parent nodes unlock, and enforce either full-tree resets or leaf-only step refunds.' },
          { name: 'Decouple Roll Authority from Reveal Presentation', description: 'Compute drops and pity counters authoritatively while using client rarity reveal animations purely for dramatic presentation.' },
        ],
        pitfalls: [
          { name: 'Orphaning Child Nodes on Mid-Tree Refund', description: 'Allowing users to unspend a middle prerequisite without re-checking graph reachability from root leaves ultimate abilities illegally active.' },
          { name: 'Rolling High-Value Loot Client-Side in Online Games', description: 'Client-computed drop rolls can be tampered with in memory; online economies must adjudicate drops on the server.' },
        ],
        questions: [
          'Should skill tree respecs be free anytime, gated to town hubs, or priced as an intentional currency sink?',
          'When inventory capacity is full, do dropped items stay in the world, go to a temporary overflow mailbox, or auto-salvage?',
          'Do pity counters reset per activity/banner or carry over across cycles?',
        ],
        example: 'Example: Within a 5-node skill tree on a 3 SP budget, unlocking the root strike node lights up its two intermediate branches; meanwhile, opening a reward crate reveals an Epic-tier item via a 380ms diagonal sheen sweep alongside green stat deltas.',
        relatedDesigns: [
          { id: 'game-skill-tree-node', reason: 'Enforces prerequisite node locking and 3 SP budget tracking with SVG connectors.' },
          { id: 'game-loot-rarity-reveal', reason: 'Showcases 4 loot rarity tiers with 380ms reveal sheen bursts and substat readouts.' },
          { id: 'px-inventory-grid-selector', reason: 'Provides a 4x3 grid inventory selector with detail inspection panel.' },
          { id: 'px-equipment-stat-comparison', reason: 'Illustrates equipped vs candidate weapon stat delta arrows.' },
        ],
        promptSnippet:
          'Build a 5-node dependency skill tree unlocker with a 3 SP budget in the specified area. Inside a container of width 100% and min-height 180px with 12px rounded corners, link nodes with SVG lines, lock child nodes until their parent unlocks, highlight unlocked paths with a 160ms transition, and provide a full SP refund reset button.',
      },
    },
    sources: [
      { title: 'Machinations — Game Economy Design Guide', url: 'https://machinations.io/articles/what-is-game-economy-design/' },
      { title: 'Game Programming Patterns: Type Object', url: 'https://gameprogrammingpatterns.com/type-object.html' },
    ],
  },
  {
    id: 'game-save-state-serialization-and-cloud-sync',
    aliases: {
      ko: ['세이브 슬롯', '게임 저장', '자동 저장', '세이브 직렬화', '클라우드 세이브', '체크포인트', '세이브 마이그레이션'],
      en: ['save slots', 'game save', 'autosave', 'save serialization', 'cloud save', 'checkpoint', 'save migration'],
    },
    useCases: {
      ko: [
        '멀티 슬롯(자동·수동·빈 슬롯) 저장 UI와 기존 세이브 덮어쓰기 방지 확인 흐름을 설계할 때',
        '자동 저장 도중 갑작스러운 종료나 크래시가 발생해도 세이브 파일이 깨지지 않도록 원자적 저장을 구현할 때',
        '게임 패치 후 구버전 세이브 데이터를 깨짐 없이 새 스키마로 올리는 버전 마이그레이션을 준비할 때',
        'PC·모바일·오프라인 플레이 간 클라우드 세이브 타임스탬프 충돌 해결 기준을 정할 때',
      ],
      en: [
        'Building multi-slot (Auto, Manual, Empty) save managers with two-step overwrite protection',
        'Ensuring autosaves never corrupt existing progress during crashes via atomic write-and-swap flows',
        'Migrating legacy player save schemas cleanly across game updates using explicit save version numbers',
        'Resolving cloud save conflicts gracefully when offline play diverges across devices',
      ],
    },
    keywords: {
      ko: ['세이브 슬롯', '자동 저장', '원자적 쓰기', '스키마 버전', '세이브 마이그레이션', '클라우드 동기화', '체크포인트'],
      en: ['save slot', 'autosave', 'atomic write', 'schema version', 'save migration', 'cloud sync', 'checkpoint'],
    },
    text: {
      ko: {
        domain: '게임 개발',
        title: '게임 세이브 상태 직렬화·슬롯 관리와 클라우드 동기화',
        summary: '원자적 저장과 스키마 버전 마이그레이션, 안전한 덮어쓰기 확인 및 클라우드 충돌 해결 정책으로 플레이어 진행도를 보호합니다.',
        overview: '플레이어가 수십 시간 쌓은 진행 데이터가 단 한 번의 자동 저장 중 크래시나 실수 클릭으로 유실되면 게임 신뢰도가 치명적으로 떨어집니다. 따라서 세이브 시스템은 1) 임시 파일 기록 후 교체(Atomic Write) 및 직전 백업(bak) 보관, 2) `saveVersion` 필드를 통한 버전별 마이그레이션 파이프라인, 3) 자동 저장 슬롯과 수동 저장 슬롯 분리 및 덮어쓰기 2단계 확인, 4) 오프라인 이후 클라우드 동기화 충돌 시 플레이 타임·최신 저장 시각을 나란히 보여 주어 사용자가 선택하게 하는 안전 장치를 갖추어야 합니다.',
        concepts: [
          { name: '원자적 저장과 롤링 백업(Atomic Save & Rolling Backup)', description: '기존 세이브 파일에 바로 덮어쓰지 않고 임시 파일(`.tmp`)에 직렬화·체크섬 검증을 마친 뒤 이름 바꾸기로 교체하고 직전 본(`.bak`)을 유지합니다.' },
          { name: '스키마 버전 마이그레이션(Schema Versioning)', description: '모든 세이브 JSON/바이너리 헤더에 `schemaVersion`을 저장해 패치 이후 신규 필드 기본값 보충이나 구형 아이템 ID 변환을 순차 실행합니다.' },
          { name: '덮어쓰기 2단계 보호 & 클라우드 충돌 선택', description: '이미 데이터가 있는 슬롯 저장 시 인라인 확인을 요구하며, 로컬/클라우드 저장분이 갈릴 때는 챕터·플레이 타임 메타데이터를 비교해 선택하도록 합니다.' },
        ],
        workflow: [
          { name: '저장 시점 스냅샷 일관성 확보하기', description: '전투 한가운데나 씬 전환 도중 불완전 저장이 되지 않도록 체크포인트·안전 구역·비동기 직렬화 큐로 저장 가능 시점을 제어합니다.' },
          { name: '자동 저장과 수동 슬롯 역할 분리하기', description: '슬롯 1은 최신 자동 저장 전용으로 분리하고 수동 슬롯 덮어쓰기 시에만 2단계 확인을 요구해 실수를 막습니다.' },
          { name: '클라우드 동기화 충돌 시 메타데이터 비교 띄우기', description: '기기 간 시간 오차만 믿고 자동 덮어쓰기하지 말고 로컬 vs 클라우드의 플레이 타임(예: 14h 22m vs 12h 10m)과 챕터를 나란히 제시합니다.' },
        ],
        pitfalls: [
          { name: '엔진 객체·메모리 참조를 그대로 직렬화해 패치 후 로드 실패하기', description: '클래스 구조 변경 시 전체 역직렬화가 깨지므로 안정적인 ID·값 기반 DTO 구조로 직렬화해야 합니다.' },
          { name: '소프트락(Soft-lock) 직전 상태에서 자동 저장 덮어쓰기', description: '체력 1·함정 한가운데서 유일한 자동 저장 슬롯을 덮어쓰면 재시작이 불가능해지므로 회전형(2~3개) 자동 저장 또는 챕터 시작 백업이 필요합니다.' },
        ],
        questions: [
          '자동 저장 슬롯을 단일 슬롯으로 둘 것인가요, 최근 2~3개 롤링 슬롯으로 유지해 소프트락을 방지할 것인가요?',
          '위험한 전투 중이나 보스 방 내부에서의 수동 저장/불러오기를 제한할 것인가요, 즉시 허용할 것인가요?',
          '로컬 세이브와 클라우드 세이브가 충돌했을 때 자동 병합 대신 사용자에게 비교 선택 창을 보여 줄 것인가요?',
        ],
        example: '예시: 세이브 슬롯 관리창에서 슬롯 1은 자동 저장(14h 22m)으로 유지하고, 이미 기록이 있는 슬롯 2에 [저장]을 누르면 즉시 덮어쓰지 않고 해당 슬롯 행 안에 [덮어쓰기 확인] / [취소] 버튼을 띄워 실수를 방지합니다.',
        relatedDesigns: [
          { id: 'game-save-slot-manager', reason: '자동·수동·빈 슬롯 3칸에서 점유 슬롯 저장 시 인라인 2단계 덮어쓰기 확인을 구현합니다.' },
          { id: 'px-quest-tracker-states', reason: '세이브 데이터에 함께 직렬화되는 퀘스트 진행 상태와 완료 플래그 UI를 보여 줍니다.' },
          { id: 'dirty-note-save-state', reason: '마지막 저장 스냅샷 대비 변경(Dirty) 여부를 판별하는 상태 패턴을 참고합니다.' },
        ],
        promptSnippet:
          '지정한 영역에 자동 저장(14h 22m)·수동 저장·빈 슬롯 3칸을 관리하는 세이브 슬롯 패널을 만들어 줘. 너비 100%, 최소 높이 180px 컨테이너 안에 12px 모서리 카드를 구성하고 데이터가 있는 슬롯 저장 시 인라인 2단계 덮어쓰기 확인/취소 흐름과 polite 상태 안내를 구현해 줘.',
      },
      en: {
        domain: 'Game Development',
        title: 'Game Save Serialization, Slot Management, and Cloud Sync',
        summary: 'Protect player progress with atomic writes, versioned schema migrations, overwrite confirmation, and safe cloud conflict prompts.',
        overview: 'Nothing erodes player trust faster than a corrupted autosave or an accidental slot overwrite after dozens of hours of play. Resilient save systems rely on atomic write-and-swap persistence with rolling backups, explicit schemaVersion migrations across game updates, dedicated autosave versus manual slots with two-step overwrite confirmation, and conflict dialogs showing playtime and chapter metadata instead of silently trusting device clocks.',
        concepts: [
          { name: 'Atomic Saves & Rolling Backups', description: 'Serializing into a temporary file, validating checksums, swapping atomically, and retaining the previous `.bak` copy to survive mid-save crashes.' },
          { name: 'Versioned Schema Migrations', description: 'Stamping a `schemaVersion` header into every save so patches can backfill defaults or remap deprecated IDs cleanly.' },
          { name: 'Two-Step Overwrite Protection & Cloud Diffs', description: 'Requiring inline confirmation before overwriting occupied slots and presenting local vs cloud playtime/chapter metadata on sync divergence.' },
        ],
        workflow: [
          { name: 'Capture Coherent Save Snapshots', description: 'Restrict manual or auto saves to stable checkpoints or serialized snapshots so mid-transition entity states are never half-written.' },
          { name: 'Separate Autosave from Confirmed Manual Slots', description: 'Keep dedicated rotating autosave slots while guarding manual occupied slots behind inline overwrite confirmation.' },
          { name: 'Surface Cloud Conflicts Without Clock Bias', description: 'Compare local and remote playtime (e.g., 14h 22m) and chapter progress visually instead of blindly picking newest wall-clock timestamps.' },
        ],
        pitfalls: [
          { name: 'Serializing Raw Engine Objects Directly', description: 'Renaming classes or fields breaks deserialization after patches; persist stable ID-keyed data transfer schemas instead.' },
          { name: 'Autosaving Inside Unrecoverable Soft-Lock States', description: 'Overwriting the sole autosave right before lethal hazards traps players; keep rolling checkpoints or chapter-start backups.' },
        ],
        questions: [
          'Will autosaves use a single slot or a 2–3 slot rolling ring to protect against soft-locks?',
          'Should manual saves be permitted mid-combat or restricted to safe checkpoints and pause states?',
          'When local and cloud saves diverge after offline play, how will both snapshots be compared for the player?',
        ],
        example: 'Example: In a 3-slot save panel, Slot 1 holds Auto-save (14h 22m), Slot 3 is empty and disables Load, and clicking Save on occupied Slot 2 expands an inline [Confirm Overwrite] / [Cancel] prompt rather than discarding prior data immediately.',
        relatedDesigns: [
          { id: 'game-save-slot-manager', reason: 'Implements Auto, Manual, and Empty save slots with inline two-step overwrite protection.' },
          { id: 'px-quest-tracker-states', reason: 'Demonstrates quest progression state flags commonly serialized in save payloads.' },
          { id: 'dirty-note-save-state', reason: 'Illustrates dirty-vs-saved snapshot comparison before committing state.' },
        ],
        promptSnippet:
          'Build a 3-slot save manager panel with Auto-save (14h 22m), Manual, and Empty slots in the specified area. Inside a container of width 100% and min-height 180px with 12px rounded corners, require inline two-step Confirm/Cancel verification before overwriting occupied slots and announce save/load updates in a polite status region.',
      },
    },
    sources: [
      { title: 'Godot Engine Docs — Saving Games', url: 'https://docs.godotengine.org/en/stable/tutorials/io/saving_games.html' },
      { title: 'MDN Web Docs — IndexedDB API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API' },
    ],
  },
  {
    id: 'game-multiplayer-matchmaking-netcode-and-liveops',
    aliases: {
      ko: ['멀티플레이어', '매치메이킹', '넷코드', '롤백 넷코드', '실력 기반 매칭', 'SBMM', '라이브옵스', '레디 체크'],
      en: ['multiplayer', 'matchmaking', 'netcode', 'rollback netcode', 'SBMM', 'liveops', 'ready check', 'server authority'],
    },
    useCases: {
      ko: [
        '실력 점수(MMR/SBMM)와 지역 핑, 대기 시간 사이의 트레이드오프를 고려한 매치메이킹 큐를 설계할 때',
        '10초 수락 확인(Ready Check), 중도 거절/닷지 페널티, 파티원 응답 상태 표시 흐름을 구성할 때',
        '격투·액션·FPS 게임의 지연 체감을 줄이기 위해 클라이언트 예측, 서버 조정, 롤백 넷코드를 비교할 때',
        '서버 권한 검증, 치트 방지, 시즌 패스/밸런스 패치 등 라이브옵스(LiveOps) 운영 체계를 설계할 때',
      ],
      en: [
        'Balancing skill rating (MMR/SBMM), regional latency, and queue wait times in multiplayer matchmaking',
        'Designing ready-check countdowns, dodge penalties, and teammate acceptance state indicators',
        'Choosing between lockstep, client-side prediction/reconciliation, and rollback netcode for responsive play',
        'Enforcing server authority, anti-cheat boundaries, and LiveOps seasonal/balance updates safely',
      ],
    },
    keywords: {
      ko: ['매치메이킹', 'SBMM', 'MMR', '수락 체크', '롤백 넷코드', '클라이언트 예측', '서버 권한', '라이브옵스'],
      en: ['matchmaking', 'SBMM', 'MMR', 'ready check', 'rollback netcode', 'client prediction', 'server authority', 'liveops'],
    },
    text: {
      ko: {
        domain: '게임 개발',
        title: '멀티플레이어 매치메이킹·넷코드와 서버 권한 및 라이브옵스',
        summary: '실력·핑·대기시간 균형의 매치메이킹과 10초 수락 체크, 클라이언트 예측·롤백 넷코드 및 서버 권한 원칙을 정리합니다.',
        overview: '멀티플레이어 게임은 네트워크 지연(Latency)과 불특정 다수의 상태 동기가 얽혀 있어 로컬 테스트만으로는 보이지 않는 문제가 자주 터집니다. 매치메이킹 단계에서는 실력(MMR/SBMM)과 핑 품질, 대기 시간 상한에 따라 검색 범위를 점진적으로 넓히며(Backfill/Expansion), AFK 방지를 위한 수락 확인(Ready Check)으로 매치 성사를 확정합니다. 인게임에서는 클라이언트 입력을 즉시 보여 주는 예측(Prediction) 또는 롤백(Rollback) 기법으로 조작감을 유지하되, 체력·데미지·재화·승패 판정은 반드시 서버 권한(Server Authority)으로 검증해야 치트를 막을 수 있습니다.',
        concepts: [
          { name: '실력 기반 매치메이킹과 대기열 확장(SBMM & Queue Expansion)', description: '초기에는 좁은 MMR·최적 리전 핑으로 탐색하다가 대기 시간이 길어질수록 허용 실력 폭과 핑 상한을 단계적으로 넓혀 무한 대기를 방지합니다.' },
          { name: '클라이언트 예측·서버 조정 & 롤백 넷코드(Prediction vs Rollback)', description: '내 입력은 로컬에 즉시 반영해 응답성을 살리고, 원격 입력이 뒤늦게 도착해 예측과 다를 때는 과거 스냅샷으로 되감아 재시뮬레이션(롤백)하거나 서버 스냅샷과 보간(Reconciliation)합니다.' },
          { name: '서버 권한 원칙과 라이브옵스(Server Authority & LiveOps)', description: '클라이언트가 보낸 "피해 999" 결과를 믿지 않고 입력/의도만 받아 서버가 검증·집계하며, 원격 밸런스 설정과 시즌 로테이션은 버전 호환을 지킵니다.' },
        ],
        workflow: [
          { name: '큐 진입·수락 체크·재대기열 흐름 연결하기', description: '탐색 중 예상/경과 시간을 보여 주고 매칭 발견 시 10초 제한 수락 체크를 띄우며, 다른 플레이어가 거절하면 우선순위 큐(Priority Re-queue)로 복귀시킵니다.' },
          { name: '동기화 모델과 핑 허용 한계 정의하기', description: '1:1 대전은 결정론적 롤백 넷코드, 다인 PvE/FPS는 틱 기반 서버 권위+보간·지연 보상으로 장르에 맞게 선택합니다.' },
          { name: '재접속·이탈(Dodge)·리포트 정책 고정하기', description: '일시적 네트워크 단절 시 AI 대체나 복귀 유예 창구를 두고, 고의 거절·이탈에는 대기열 쿨다운 정책을 명확히 고지합니다.' },
        ],
        pitfalls: [
          { name: '클라이언트 판정을 신뢰해 데미지·쿨다운·드롭 변조 허용하기', description: 'UI 쿨다운만 막고 서버 검증을 빼면 패킷 리플레이나 메모리 변조로 무제한 공격과 재화 복제가 일어납니다.' },
          { name: '수락 체크 만료 직후 대기열 이탈·복귀 상태 처리 누락하기', description: '파티원 중 1명이 시간 초과로 탈락했을 때 나머지 수락자를 다시 검색 상태로 돌리지 않으면 유령 로비에 갇힙니다.' },
        ],
        questions: [
          '대기 시간이 일정 초(예: 60초)를 초과할 때 핑 우선과 실력(MMR) 범위 확장 중 어느 쪽에 가중치를 둘 것인가요?',
          '매치 수락 확인(Ready Check) 거절 또는 시간 초과 시 몇 초/분 동안 재매칭 페널티를 부과할 것인가요?',
          '게임 도중 클라이언트 연결이 끊겼을 때 스냅샷 재동기화 재접속 유예 시간을 몇 분까지 유지할 것인가요?',
        ],
        example: '예시: 4인 협동 매치메이킹에서 탐색 중 경과 시간을 초 단위로 표시하고, 매치 발견 시 10초 카운트다운과 함께 3/4 준비 완료 점을 보여 줍니다. 사용자가 [수락]을 누르면 4/4 매칭이 확정되고, [거절] 시 이유를 안내한 뒤 다시 탐색할 수 있게 합니다.',
        relatedDesigns: [
          { id: 'game-matchmaking-ready-check', reason: '대기·탐색 타이머·10초 레디 체크(3/4 응답 점)·확정/취소 흐름을 직접 시연합니다.' },
          { id: 'game-boss-phase-bar', reason: '다인 레이드 보스전에서 모든 파티원이 공유하는 페이즈 전환 및 경직 게이지 기준을 보여 줍니다.' },
          { id: 'px-turn-order-timeline', reason: '동기화된 턴 대기열과 속도 버프에 따른 턴 순서 재정렬 UI를 참고할 수 있습니다.' },
        ],
        promptSnippet:
          '지정한 영역에 멀티플레이어 매치메이킹 큐와 10초 수락 확인(Ready Check) 카드를 만들어 줘. 너비 100%, 최소 높이 180px 컨테이너 안에 12px 모서리 카드를 구성하고 대기 → 탐색(1000ms 타이머) → 10초 수락 확인(4명 중 3/4 응답 상태) → 확정/취소 및 재탐색 흐름을 구현해 줘.',
      },
      en: {
        domain: 'Game Development',
        title: 'Multiplayer Matchmaking, Netcode, Server Authority, and LiveOps',
        summary: 'Balance MMR, latency, and wait times with 10s ready checks, client prediction or rollback netcode, and server authority.',
        overview: 'Multiplayer systems must hide network round-trip latency while resisting cheating and partial disconnects. Matchmaking queues widen skill (MMR) and latency thresholds over time to bound wait durations, followed by timed ready checks to filter AFK players. In-game synchronization uses client prediction and reconciliation or rollback netcode to keep controls snappy, while enforcing server authority over damage, cooldowns, and currency mutations.',
        concepts: [
          { name: 'Skill-Based Matchmaking & Queue Expansion', description: 'Starting with tight MMR and region latency bounds, then relaxing tolerances progressively as search elapsed time grows.' },
          { name: 'Client Prediction, Reconciliation & Rollback Netcode', description: 'Applying local inputs immediately for zero perceived input lag, while rolling back or reconciling against authoritative snapshots when remote inputs arrive.' },
          { name: 'Server Authority & LiveOps Boundaries', description: 'Treating client payloads strictly as player intent rather than trusted damage or reward outcomes, while keeping live config updates version-safe.' },
        ],
        workflow: [
          { name: 'Wire Queue, Ready Check & Priority Re-queue Flows', description: 'Track elapsed search seconds, launch a 10s acceptance countdown with player readiness pips, and cleanly re-queue remaining accepted players on decline.' },
          { name: 'Match Sync Architecture to Genre Constraints', description: 'Choose deterministic rollback netcode for tight 1v1 fighters or tick-based server reconciliation and lag compensation for shooters and co-op.' },
          { name: 'Define Disconnect Grace & Dodge Policies', description: 'Support snapshot catch-up during temporary drops and surface clear cooldown penalties for queue declines or abandons.' },
        ],
        pitfalls: [
          { name: 'Trusting Client-Reported Damage or Cooldowns', description: 'Enforcing timers or damage rules only in client UI lets modified clients replay packets or fabricate rewards.' },
          { name: 'Stranding Players After Partial Ready-Check Declines', description: 'Failing to return accepted party members back into active search leaves lobbies stuck in dead states.' },
        ],
        questions: [
          'When wait times pass 60 seconds, should the matchmaker widen MMR brackets first or accept higher-ping cross-region matches?',
          'What temporary queue lockout applies when a player declines or times out of a ready check?',
          'How long will an active match hold a disconnected player slot for full state snapshot reconnection?',
        ],
        example: 'Example: A 4-player queue tracks elapsed search seconds, switches to a 10s Ready Check showing 3/4 ready player pips, confirms 4/4 on Accept, and offers clean cancellation recovery on Decline.',
        relatedDesigns: [
          { id: 'game-matchmaking-ready-check', reason: 'Demonstrates Idle, Searching timer, 10s Ready Check (3/4 pips), and Confirmed/Cancelled states.' },
          { id: 'game-boss-phase-bar', reason: 'Visualizes shared raid boss phase thresholds and stagger gauges across party members.' },
          { id: 'px-turn-order-timeline', reason: 'Shows synchronized turn initiative ordering in multiplayer tactics games.' },
        ],
        promptSnippet:
          'Build a multiplayer matchmaking queue and 10s ready-check card in the specified area. Inside a container of width 100% and min-height 180px with 12px rounded corners, transition through Idle, Searching (1000ms timer), 10s Ready Check (3/4 player pips), and Match Confirmed or Cancelled with a clean Re-queue reset.',
      },
    },
    sources: [
      { title: 'Valve Developer Wiki — Source Multiplayer Networking', url: 'https://developer.valvesoftware.com/wiki/Source_Multiplayer_Networking' },
      { title: 'Gaffer On Games — Networked Physics', url: 'https://gafferongames.com/post/networked_physics_2004/' },
    ],
  },
];
