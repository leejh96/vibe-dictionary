import type { SearchMetadata } from '../../search-metadata';

export const PIXELART_EXPANSION_SEARCH_METADATA = {
  /* 1. Sprites (6) */
  'px-blacksmith-hammer-strike': {
    targets: ['shape', 'scene', 'input'],
    triggers: ['input', 'auto'],
    useCases: {
      ko: ['모루 위에서 백스윙·타격·반동·복귀 4단계 대장장이 해머 타격 포즈와 불꽃 파편을 재생하고 단조 열기 색상을 전환하기'],
      en: ['Play and scrub a 4-stage blacksmith hammer strike over an anvil with spark shards and toggle forge heat colors'],
    },
    aliases: {
      ko: ['대장장이 타격', '모루 망치질', '무기 단조 애니메이션'],
      en: ['blacksmith anvil strike', 'forging hammer animation', 'weapon smithing loop'],
    },
  },
  'px-jump-arc-poses': {
    targets: ['shape', 'scene', 'input'],
    triggers: ['input', 'auto'],
    useCases: {
      ko: ['도약 웅크림부터 체공 정점·착지 충격까지 5단계 포물선 점프 자세와 중력 궤적을 비교하기'],
      en: ['Compare 5 parabolic jump poses from anticipation crouch to apex hang and landing dust with gravity arc switching'],
    },
    aliases: {
      ko: ['점프 포물선', '도약 착지 프레임', '플랫포머 점프 모션'],
      en: ['platformer jump arc', 'crouch apex landing poses', 'jump trajectory animation'],
    },
  },
  'px-dragon-wing-stroke': {
    targets: ['shape', 'scene', 'input'],
    triggers: ['input', 'auto'],
    useCases: {
      ko: ['4단계 날개 퍼덕임과 몸체 수직 반동으로 부유하는 새끼 드래곤의 체공 루프와 화염 오라 연출하기'],
      en: ['Animate a hovering dragon whelp with 4-frame wing strokes, vertical body counter-bob and flame aura particles'],
    },
    aliases: {
      ko: ['드래곤 날개짓', '비행 몬스터 호버링', '용 퍼덕임 루프'],
      en: ['dragon wing flap', 'flying monster hover', 'wyvern wingbeat cycle'],
    },
  },
  'px-slime-squash-stretch': {
    targets: ['shape', 'scene', 'input'],
    triggers: ['input', 'auto'],
    useCases: {
      ko: ['픽셀 면적을 보존하며 납작 압축과 수직 신장을 오가는 슬라임 젤리 탄성 변형과 코어 부유 제어하기'],
      en: ['Control volume-preserving slime squash and stretch deformation from flat compression to vertical stretch with floating core'],
    },
    aliases: {
      ko: ['슬라임 탄성', '스쿼시 앤 스트레치', '젤리 몬스터 점프'],
      en: ['jelly slime bounce', 'pixel squash and stretch', 'elastic blob deformation'],
    },
  },
  'px-modular-robot-loadout': {
    targets: ['shape', 'image', 'input'],
    triggers: ['click', 'input'],
    useCases: {
      ko: ['기준 섀시 위에서 레이더 안테나·제트팩·플라즈마 암 파츠와 3종 도색 스킨을 조합해 로봇 스프라이트 구성하기'],
      en: ['Assemble a modular robot sprite by toggling radar antenna, jetpack thruster, plasma arm and 3 paint schemes on anchored sockets'],
    },
    aliases: {
      ko: ['모듈형 로봇', '파츠 장착 커스텀', '메카 스킨 교체'],
      en: ['modular mech builder', 'paperdoll robot parts', 'sprite equipment sockets'],
    },
  },
  'px-directional-archer-draw': {
    targets: ['shape', 'scene', 'input'],
    triggers: ['click', 'input'],
    useCases: {
      ko: ['수평·상향·하향 3가지 조준 각도와 시위 당김·발사 4단계를 조합해 궁수 조준 자세 확인하기'],
      en: ['Inspect archer aiming postures across horizontal, upward and downward angles combined with 4 bowstring draw and release steps'],
    },
    aliases: {
      ko: ['궁수 조준 발사', '방향별 활시위 당김', '다방향 사격 포즈'],
      en: ['directional bow aim', 'archer draw release frames', 'multi-angle ranged attack'],
    },
  },

  /* 2. Environments (6) */
  'px-snow-village-accumulation': {
    targets: ['background', 'scene', 'input'],
    triggers: ['input', 'auto'],
    useCases: {
      ko: ['강설 밀도 4단계에 따라 낙하 눈송이와 오두막 지붕 적설 캡 두께·창문 난로 불빛을 제어하기'],
      en: ['Control falling snowflake count, cabin roof snow cap thickness and warm window lights across 4 snowfall accumulation levels'],
    },
    aliases: {
      ko: ['눈 내리는 마을', '지붕 눈 쌓임', '겨울 배경 적설'],
      en: ['snowfall accumulation scene', 'winter cabin snow drift', 'pixel snow village'],
    },
  },
  'px-aurora-tundra-bands': {
    targets: ['background', 'scene', 'input'],
    triggers: ['input', 'auto'],
    useCases: {
      ko: ['툰드라 빙하 위에서 28개 수직 기둥의 위상차로 물결치는 오로라 커튼과 수면 반사를 연출하기'],
      en: ['Render rippling aurora borealis curtains with 28 vertical column phase shifts and ice reflections over a tundra horizon'],
    },
    aliases: {
      ko: ['오로라 밤하늘', '극광 파동 배경', '툰드라 빙하 야경'],
      en: ['northern lights pixel art', 'aurora curtain wave', 'arctic night sky scene'],
    },
  },
  'px-underwater-ruin-caustics': {
    targets: ['background', 'scene', 'input'],
    triggers: ['input', 'auto'],
    useCases: {
      ko: ['수중 신전 기둥 위로 흔들리는 굴절 빛무늬와 상승 기포·발광 산호초 밝기를 조절하기'],
      en: ['Adjust rippling underwater caustic light bands, rising bubble columns and glowing coral brightness across sunken temple pillars'],
    },
    aliases: {
      ko: ['수중 유적 빛무늬', '물속 커스틱 굴절', '심해 신전 배경'],
      en: ['underwater caustic rays', 'sunken temple ruins', 'submerged light refraction'],
    },
  },
  'px-windmill-wheat-breeze': {
    targets: ['background', 'scene', 'input'],
    triggers: ['input', 'auto'],
    useCases: {
      ko: ['바람 세기 단계에 맞춰 풍차 날개 회전과 황금 밀밭 줄기의 위상 물결·노을 하늘을 동기화하기'],
      en: ['Synchronize windmill blade rotation and golden wheat stalk wave sway across wind strength levels and noon or dusk skies'],
    },
    aliases: {
      ko: ['풍차와 밀밭', '바람에 흔들리는 들판', '전원 풍경 루프'],
      en: ['windmill wheat field', 'breeze grass wave', 'pastoral pixel landscape'],
    },
  },
  'px-lava-channel-flow': {
    targets: ['background', 'scene', 'input'],
    triggers: ['input', 'auto'],
    useCases: {
      ko: ['현무암 협곡 수로를 따라 흐르는 마그마 띠와 식은 암석 조각·균열 발광 및 화산재 파티클 제어하기'],
      en: ['Animate flowing magma bands, drifting cooled crust plates, glowing rock fissures and rising ash sparks in a basalt gorge'],
    },
    aliases: {
      ko: ['용암 수로 흐름', '화산 마그마 배경', '용암 동굴 타일'],
      en: ['flowing lava river', 'volcanic magma channel', 'molten rock gorge scene'],
    },
  },
  'px-forest-canopy-shafts': {
    targets: ['background', 'scene', 'input'],
    triggers: ['click', 'input'],
    useCases: {
      ko: ['숲 수관 틈새의 빛줄기 개수와 태양 기울기 각도를 조절해 이끼 제단 바닥의 조명 영역과 꽃가루를 연출하기'],
      en: ['Control forest canopy sunbeam count and tilt angle to illuminate a mossy forest shrine floor with floating pollen motes'],
    },
    aliases: {
      ko: ['숲속 빛내림', '나뭇잎 틈새 햇살', '산림 고드레이 조명'],
      en: ['forest god rays', 'canopy sunbeams', 'woodland light shafts'],
    },
  },

  /* 3. Tiles (6) */
  'px-dual-grid-shore-corners': {
    targets: ['shape', 'scene', 'input'],
    triggers: ['click', 'input'],
    useCases: {
      ko: ['4×4 논리 지형 격자와 반 타일 어긋난 3×3 렌더 타일의 4비트 코너 마스크로 해안선 모서리를 매끄럽게 연결하기'],
      en: ['Connect shoreline corners cleanly using 4-bit corner masks on a 3x3 render grid offset half a tile from a 4x4 terrain grid'],
    },
    aliases: {
      ko: ['듀얼 그리드 해안선', '오프셋 오토타일', '모서리 해변 타일맵'],
      en: ['dual grid autotiling', 'offset corner tileset', '4-bit shoreline mask'],
    },
  },
  'px-wang-edge-color-tiles': {
    targets: ['shape', 'scene', 'input'],
    triggers: ['click', 'input'],
    useCases: {
      ko: ['타일의 북·동·남·서 변 색상을 전환해 인접 타일과 맞닿는 도로·수로 경계를 끊김 없이 매칭하기'],
      en: ['Switch North, East, South and West edge colors to match road and canal boundaries seamlessly across neighboring Wang tiles'],
    },
    aliases: {
      ko: ['왕 타일 변 매칭', '엣지 컬러 타일맵', '도로 수로 연결 타일'],
      en: ['Wang edge matching', '2-edge color tileset', 'seamless road canal tiles'],
    },
  },
  'px-seeded-brick-variants': {
    targets: ['background', 'shape', 'input'],
    triggers: ['click', 'input'],
    useCases: {
      ko: ['결정론적 해시 시드와 변형 밀도로 균열·이끼·음영 벽돌을 섞어 타일 벽면의 반복 무늬를 제거하기'],
      en: ['Break up repetitive brick wall patterns by mixing cracked, mossy and recessed bricks via deterministic seed hash and density'],
    },
    aliases: {
      ko: ['시드 벽돌 변형', '타일 반복 제거', '던전 성벽 불규칙 타일'],
      en: ['seeded tile variation', 'brick wall pattern breaker', 'deterministic dungeon bricks'],
    },
  },
  'px-nine-slice-pixel-frame': {
    targets: ['panel', 'card', 'input'],
    triggers: ['click', 'input'],
    useCases: {
      ko: ['모서리 장식 픽셀을 1:1로 고정한 채 가로·세로 패널 크기를 정수 배율로 리사이즈하고 9분할 가이드를 확인하기'],
      en: ['Resize a pixel dialog frame across integer widths and heights while keeping 12x12 corner ornaments unscaled with 9-slice guides'],
    },
    aliases: {
      ko: ['9슬라이스 픽셀 테두리', '모서리 보존 리사이즈', '도트 UI 프레임 확장'],
      en: ['9-slice pixel border', 'nine-patch UI frame', 'corner-preserving dialog box'],
    },
  },
  'px-conveyor-elbow-orientation': {
    targets: ['shape', 'scene', 'input'],
    triggers: ['click', 'input', 'auto'],
    useCases: {
      ko: ['90도 엘보 타일의 꺾임 방향과 벨트 역회전을 전환해 화물 상자의 이송 경로를 시뮬레이션하기'],
      en: ['Switch 90-degree conveyor elbow orientation and belt flow direction to route cargo crates along an L-shaped factory track'],
    },
    aliases: {
      ko: ['컨베이어 엘보 회전', '공장 벨트 방향 전환', '물류 타일 애니메이션'],
      en: ['conveyor belt corner', 'factory track routing', 'elbow tile orientation'],
    },
  },
  'px-one-way-platform-collision': {
    targets: ['shape', 'scene', 'input'],
    triggers: ['click', 'input'],
    useCases: {
      ko: ['하단 점프 통과·상단 착지·하향 통과 입력 3가지 모드에서 단방향 발판의 충돌 판정 조건을 비교하기'],
      en: ['Compare one-way platform collision checks across upward jump-through, top surface landing and downward drop-through modes'],
    },
    aliases: {
      ko: ['단방향 발판 충돌', '점프 통과 플랫폼', '하향 점프 판정'],
      en: ['jump-through platform', 'one-way collider ledge', 'drop-through floor physics'],
    },
  },

  /* 4. Game UI (6) */
  'px-quest-tracker-states': {
    targets: ['panel', 'list', 'input'],
    triggers: ['click', 'input'],
    useCases: {
      ko: ['3개 세부 목표의 체크 상태를 토글해 진행도 게이지와 완료 배너·보상 상자 활성화를 전환하기'],
      en: ['Toggle 3 quest objective checkboxes to update the progress bar and unlock the quest completion banner and reward chest'],
    },
    aliases: {
      ko: ['퀘스트 트래커 HUD', '목표 달성 체크리스트', '임무 완료 알림창'],
      en: ['quest log tracker', 'mission objective checklist', 'RPG quest completion HUD'],
    },
  },
  'px-radial-spell-hotbar-cooldown': {
    targets: ['button', 'panel', 'input'],
    triggers: ['click', 'input', 'auto'],
    useCases: {
      ko: ['4개 스킬 슬롯의 부채꼴 쿨타임 마스크 각도와 잔여 시간 숫자를 조절하고 재사용 완료 점멸을 확인하기'],
      en: ['Control radial cooldown wedge masks and remaining second readouts across 4 spell hotbar slots with ready flash feedback'],
    },
    aliases: {
      ko: ['스킬 쿨타임 핫바', '원형 쿨다운 마스크', '액션바 재사용 대기시간'],
      en: ['radial cooldown sweep', 'spell action bar HUD', 'clock-wipe skill timer'],
    },
  },
  'px-turn-order-timeline': {
    targets: ['panel', 'list', 'input'],
    triggers: ['click', 'input'],
    useCases: {
      ko: ['턴 진행과 가속 버프 토글에 따라 타임라인 위 초상화 토큰의 행동 순서를 실시간 재정렬하기'],
      en: ['Advance combat turns and toggle a haste speed buff to reorder unit portrait tokens along a tactical turn timeline'],
    },
    aliases: {
      ko: ['턴 순서 타임라인', '전투 이니셔티브 바', '속도 버프 순서 변경'],
      en: ['turn order initiative bar', 'ATB combat timeline', 'tactical speed queue HUD'],
    },
  },
  'px-branching-dialogue-choices': {
    targets: ['panel', 'button', 'input'],
    triggers: ['click', 'input'],
    useCases: {
      ko: ['용기·기만·외교 3가지 대화 선택지를 비교해 NPC 표정·호감도 수치·스토리 분기 태그 변화를 미리보기'],
      en: ['Compare Valor, Cunning and Diplomacy dialogue choices to preview NPC expression shifts, affinity deltas and story branch tags'],
    },
    aliases: {
      ko: ['분기형 대화 선택지', '호감도 대화창', '성향 선택 UI'],
      en: ['branching dialogue menu', 'RPG choice consequence preview', 'NPC affinity response UI'],
    },
  },
  'px-equipment-stat-comparison': {
    targets: ['panel', 'card', 'input'],
    triggers: ['click', 'input'],
    useCases: {
      ko: ['후보 무기 3종을 선택해 현재 장비 대비 공격력·속도·치명타 증감 화살표와 스탯 막대를 비교하고 장착 교체하기'],
      en: ['Select among 3 candidate weapons to compare ATK, SPD and CRIT stat bars with signed delta indicators and swap equipped gear'],
    },
    aliases: {
      ko: ['장비 스탯 비교창', '무기 교체 능력치 증감', 'RPG 인벤토리 비교'],
      en: ['equipment stat diff panel', 'weapon comparison tooltip', 'RPG gear delta bars'],
    },
  },
  'px-collectible-badge-grid': {
    targets: ['panel', 'card', 'input'],
    triggers: ['click', 'input'],
    useCases: {
      ko: ['3×2 배지 도감 슬롯을 선택하고 잠금·해금 상태를 전환해 실루엣 마스킹과 상세 설명·수집률을 확인하기'],
      en: ['Select 3x2 badge codex slots and toggle lock or unlock states to inspect silhouette masks, lore details and collection progress'],
    },
    aliases: {
      ko: ['배지 수집 도감', '업적 해금 그리드', '컬렉션 달성률 UI'],
      en: ['collectible badge codex', 'achievement unlock grid', 'trophy collection menu'],
    },
  },

  /* 5. Effects (6) */
  'px-teleport-dissolve-reform': {
    targets: ['shape', 'scene', 'input'],
    triggers: ['click', 'input', 'auto'],
    useCases: {
      ko: ['고정 베이어 임계값 마스크로 캐릭터가 왼편 패드에서 분해되어 오른편 패드에서 재결합하는 순간이동 연출하기'],
      en: ['Dissolve a character on Pad A and reform on Pad B using a stable Bayer threshold mask and cyan warp beam column'],
    },
    aliases: {
      ko: ['텔레포트 분해 재결합', '순간이동 디졸브 마스크', '픽셀 워프 이펙트'],
      en: ['teleport dissolve shader', 'Bayer matrix materialization', 'pixel warp beam effect'],
    },
  },
  'px-stepped-lightning-chain': {
    targets: ['shape', 'scene', 'input'],
    triggers: ['click', 'input', 'auto'],
    useCases: {
      ko: ['타겟 크리스탈 개수와 방전 파형 단계에 맞춰 직교 계단형 연쇄 번개 아크와 피격 점멸을 제어하기'],
      en: ['Control stepped orthogonal chain lightning arcs and impact rings jumping from a caster staff across 1 to 3 crystal targets'],
    },
    aliases: {
      ko: ['연쇄 번개 이펙트', '체인 라이트닝 도트', '계단형 전격 아크'],
      en: ['chain lightning arc', 'stepped pixel thunderbolt', 'electric shock jump VFX'],
    },
  },
  'px-directional-crt-glitch': {
    targets: ['image', 'panel', 'input'],
    triggers: ['click', 'input', 'auto'],
    useCases: {
      ko: ['수평·수직 축과 왜곡 강도를 조절해 홀로그램 슬라이스 밀림과 RGB 색수차 분리·주사선 노이즈를 연출하기'],
      en: ['Adjust horizontal or vertical glitch axis and distortion intensity for slice tear offsets, RGB channel split and scanlines'],
    },
    aliases: {
      ko: ['CRT 글리치 왜곡', '색수차 슬라이스 티어링', '홀로그램 노이즈 효과'],
      en: ['directional CRT glitch', 'chromatic aberration tear', 'hologram scanline distortion'],
    },
  },
  'px-ground-shockwave-rings': {
    targets: ['shape', 'scene', 'input'],
    triggers: ['click', 'input', 'auto'],
    useCases: {
      ko: ['지면을 강타한 지점에서 퍼져 나가는 동심 타원 충격파 링과 순차적으로 솟구치는 암석 파편을 재생하기'],
      en: ['Trigger expanding concentric ground shockwave rings and sequentially heaving rock pillars from an impact epicenter'],
    },
    aliases: {
      ko: ['지면 충격파 링', '대지 강타 파동', '바위 융기 이펙트'],
      en: ['ground slam shockwave', 'seismic ring expansion', 'earth shatter rock heave'],
    },
  },
  'px-ice-freeze-thaw-spread': {
    targets: ['shape', 'scene', 'input'],
    triggers: ['click', 'input', 'auto'],
    useCases: {
      ko: ['맨해튼 거리 반경에 따라 중앙 크리스탈에서 퍼져 나가는 서리 타일 결빙과 해빙 복원 애니메이션 제어하기'],
      en: ['Spread and recede hexagonal frost tiles and ice spikes outward from a central crystal using Manhattan distance rings'],
    },
    aliases: {
      ko: ['얼음 결빙 해빙 확산', '서리 타일 전파', '빙결 마법 범위 효과'],
      en: ['ice freeze spread VFX', 'frost tile propagation', 'radial glacial thaw'],
    },
  },
  'px-pixel-portal-swirl': {
    targets: ['shape', 'scene', 'input'],
    triggers: ['click', 'input', 'auto'],
    useCases: {
      ko: ['균열 점화부터 소용돌이 확장·유지·붕괴까지 시간 제한이 있는 차원 포털 생애주기와 궤도 입자를 제어하기'],
      en: ['Scrub or play a time-bounded pixel portal lifecycle from rift ignition and vortex spin to collapse with orbiting particles'],
    },
    aliases: {
      ko: ['픽셀 포털 소용돌이', '차원문 개방 붕괴', '보텍스 스월 이펙트'],
      en: ['pixel vortex portal', 'dimensional rift lifecycle', 'swirling gate VFX'],
    },
  },
} as const satisfies Record<string, SearchMetadata>;
