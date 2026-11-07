import type { SearchMetadata } from '../../search-metadata';

export const PIXELART_SEARCH_METADATA = {
  /* 1. Sprites */
  'px-sprite-walk-cycle': {
    targets: ['shape', 'scene', 'input'],
    triggers: ['input', 'auto'],
    useCases: {
      ko: ['48×48 정수 픽셀 격자에서 달빛 아래 6프레임 탐험가 걷기 루프 재생 및 프레임 탐색하기'],
      en: ['Play and scrub a 6-frame explorer walk cycle with moonlit rim lighting on a 48x48 integer pixel grid'],
    },
    aliases: {
      ko: ['걷기 애니메이션', '도트 걷기', '스프라이트 워크'],
      en: ['walk animation', 'dot walk cycle', 'sprite walking loop'],
    },
  },
  'px-flame-spirit-idle': {
    targets: ['shape', 'scene', 'input'],
    triggers: ['input', 'auto'],
    useCases: {
      ko: ['3단계 색 띠와 상승하는 불똥 파티클로 부유하는 픽셀 불꽃 정령 루프 연출하기'],
      en: ['Create a floating pixel flame spirit loop with 3 concentric color bands and ascending ember sparks'],
    },
    aliases: {
      ko: ['불꽃 정령', '화염 대기모션', '도트 파티클 정령'],
      en: ['flame elemental', 'fire spirit idle', 'pixel ember wisp'],
    },
  },
  'px-item-silhouette-set': {
    targets: ['image', 'shape', 'input'],
    triggers: ['input'],
    useCases: {
      ko: ['24×24 정수 격자에서 원석·물약·열쇠·상자의 1px 외곽선 실루엣 식별성과 팔레트 검증하기'],
      en: ['Verify silhouette readability and palette breakdown for crystal ore, potion, key and chest on a 24x24 grid'],
    },
    aliases: {
      ko: ['아이템 실루엣', '도트 아이템 세트', '1픽셀 외곽선 아이콘'],
      en: ['item silhouette set', 'pixel RPG icons', '1px contour icons'],
    },
  },
  'px-character-portrait-angles': {
    targets: ['image', 'shape', 'input'],
    triggers: ['input'],
    useCases: {
      ko: ['정면·반측면·측면 3방향 픽셀 초상화의 이목구비 비례와 표정 변화 비교하기'],
      en: ['Compare facial proportions and expression changes across front, 3/4 and profile pixel portraits'],
    },
    aliases: {
      ko: ['3방향 초상화', '대화창 포트레이트', '픽셀 두상'],
      en: ['3-way portrait', 'dialog bust angles', 'character face angles'],
    },
  },

  /* 2. Environments */
  'px-parallax-mountain-depth': {
    targets: ['background', 'scene', 'input'],
    triggers: ['input', 'pointer-move'],
    useCases: {
      ko: ['달·원경 산맥·중경 능선·근경 바위 4개 층의 정수 시차 스크롤로 깊이감 구현하기'],
      en: ['Implement atmospheric depth with 4 integer parallax layers across moon, peaks, ridge and foreground rocks'],
    },
    aliases: {
      ko: ['픽셀 파랄랙스', '산맥 시차 스크롤', '도트 다층 배경'],
      en: ['pixel parallax scenery', 'mountain parallax scroll', 'layered dot landscape'],
    },
  },
  'px-sunset-river-reflection': {
    targets: ['background', 'scene', 'input'],
    triggers: ['input'],
    useCases: {
      ko: ['디더링 노을 하늘과 수평선 태양, 교차 주사선 강물 반사 궤적 표현하기'],
      en: ['Render a dithered sunset sky, horizon sun disk, and scanline river ripple reflection trail'],
    },
    aliases: {
      ko: ['석양 강물 반사', '노을 수면 일렁임', '픽셀 일몰'],
      en: ['sunset water reflection', 'river glow scanline', 'pixel sunset horizon'],
    },
  },
  'px-rainy-neon-alley': {
    targets: ['scene', 'background', 'input'],
    triggers: ['input', 'auto'],
    useCases: {
      ko: ['사선 빗줄기와 물웅덩이 파문, 시안·마젠타 발광 네온 간판의 사이버 골목 연출하기'],
      en: ['Direct a cyberpunk alley with diagonal rain streaks, puddle ripples, and glowing neon signs'],
    },
    aliases: {
      ko: ['네온 골목', '픽셀 비 연출', '사이버펑크 골목'],
      en: ['neon alley', 'pixel rain puddle', 'cyberpunk backstreet'],
    },
  },
  'px-isometric-terrace-citadel': {
    targets: ['scene', 'shape', 'input'],
    triggers: ['input'],
    useCases: {
      ko: ['2:1 투영 디메트릭 각도로 기단·정원 테라스·탑루의 층별 입체 구조 조망하기'],
      en: ['View 3 tiered elevations of foundation, terrace garden and tower keep in 2:1 dimetric isometric projection'],
    },
    aliases: {
      ko: ['아이소메트릭 성채', '2:1 투영 픽셀', '테라스 정원 쿼터뷰'],
      en: ['isometric citadel', '2:1 dimetric pixel', 'quarter view castle terrace'],
    },
  },

  /* 3. Tiles & Patterns */
  'px-autotile-terrain-bitmask': {
    targets: ['list', 'shape', 'input'],
    triggers: ['input'],
    useCases: {
      ko: ['5×4 격자에서 셀을 클릭해 풀밭을 칠할 때 상하좌우 4비트 마스크로 16종 타일 연결하기'],
      en: ['Paint terrain on a 5x4 grid and resolve 16 border tile shapes with 4-way neighbor bitmasks'],
    },
    aliases: {
      ko: ['오토타일 비트마스크', '4방향 지형 연결', '타일셋 모서리 결합'],
      en: ['autotile bitmask', '4-way terrain connection', 'tileset auto border'],
    },
  },
  'px-dither-gradient-ramp': {
    targets: ['shape', 'background', 'input'],
    triggers: ['input'],
    useCases: {
      ko: ['4색 제한 팔레트 위로 2×2 체커보드와 4×4 베이어 매트릭스를 적용해 곡면 명암 표현하기'],
      en: ['Shade a 3D pixel sphere with 2x2 checkerboard and 4x4 Bayer dithering over 4 fixed palette colors'],
    },
    aliases: {
      ko: ['디더링 램프', '베이어 매트릭스 명암', '체커보드 그라데이션'],
      en: ['dither gradient ramp', 'Bayer ordered dither', 'checkerboard tonal ramp'],
    },
  },
  'px-seamless-pattern-repeat': {
    targets: ['background', 'shape', 'input'],
    triggers: ['input'],
    useCases: {
      ko: ['40×36 논리 타일을 3×3으로 반복해 끝단 픽셀이 이어지는지 확인하기'],
      en: ['Verify edge alignment by repeating a 40x36 logical tile in a 3x3 preview'],
    },
    aliases: {
      ko: ['심리스 픽셀 패턴', '이음매 없는 타일', '던전 석조 패턴'],
      en: ['seamless pixel pattern', 'seamless tile texture', 'dungeon stone wallpaper'],
    },
  },
  'px-palette-swap-texture': {
    targets: ['shape', 'image', 'input'],
    triggers: ['input'],
    useCases: {
      ko: ['5단계 색인 좌표를 유지한 채 룩업 테이블만 교체해 방패 표면 분위기 실시간 전환하기'],
      en: ['Remap 5 index color coordinates across 4 thematic lookup tables to transform shield surfaces'],
    },
    aliases: {
      ko: ['팔레트 스왑', '색인 룩업 전환', '도트 재질 교체'],
      en: ['palette swap texture', 'indexed color LUT', 'dot texture palette shift'],
    },
  },

  /* 4. Game UI */
  'px-hud-health-shield-bar': {
    targets: ['panel', 'text', 'input'],
    triggers: ['input'],
    useCases: {
      ko: ['분할 하트와 마름모 실드를 가리지 않는 상단 피격 문구로 액션 RPG 상태창 구성하기'],
      en: ['Construct an action RPG status bar with split hearts, diamond shields, separate damage feedback and a low-health warning'],
    },
    aliases: {
      ko: ['체력 HUD', '도트 하트 실드', '픽셀 RPG 체력바'],
      en: ['health HUD', 'pixel heart shield bar', 'RPG health status bar'],
    },
  },
  'px-inventory-grid-selector': {
    targets: ['list', 'panel', 'input'],
    triggers: ['input'],
    useCases: {
      ko: ['4×3 베벨 슬롯 그리드에서 아이템을 선택하고 상세 능력치와 희귀도 프레임 표시하기'],
      en: ['Navigate a 4x3 beveled slot grid to inspect 16x16 item icons, stats and rarity frames'],
    },
    aliases: {
      ko: ['인벤토리 그리드', '아이템 칸 선택기', 'RPG 가방 슬롯'],
      en: ['inventory grid selector', 'item slot backpack', 'RPG inventory window'],
    },
  },
  'px-rpg-dialog-typewriter': {
    targets: ['text', 'panel', 'input'],
    triggers: ['input'],
    useCases: {
      ko: ['석조 프레임 안의 초상화 옆에 RPG 대사를 배치하고 타자 효과 켜기'],
      en: ['Show RPG dialogue beside a portrait in a stone frame with an optional typewriter effect'],
    },
    aliases: {
      ko: ['RPG 대화창', '타이프라이터 대화상자', '화자 포트레이트 대사창'],
      en: ['RPG dialog box', 'typewriter dialog window', 'speaker portrait text box'],
    },
  },
  'px-minimap-radar': {
    targets: ['panel', 'scene', 'input'],
    triggers: ['input'],
    useCases: {
      ko: ['24×24 정수 그리드에서 플레이어 이동에 반응해 시야 안개를 밝히고 보물 위치 동기화하기'],
      en: ['Clear fog of war along field-of-view cones and synchronize treasure blips on a 24x24 dungeon minimap'],
    },
    aliases: {
      ko: ['픽셀 미니맵', '던전 레이더 지도', '전장의 안개 탐색'],
      en: ['pixel minimap', 'dungeon radar map', 'fog of war minimap'],
    },
  },

  /* 5. Effects */
  'px-integer-grid-explosion': {
    targets: ['shape', 'scene', 'input'],
    triggers: ['input'],
    useCases: {
      ko: ['32×32 정수 격자에서 섬광·화염구·연기 고리·불똥 파편으로 이어지는 6프레임 아케이드 폭발 시연하기'],
      en: ['Demonstrate a 6-frame arcade explosion advancing from spark dot to fireball, smoke ring and ash embers on a 32x32 grid'],
    },
    aliases: {
      ko: ['정수 그리드 폭발', '6프레임 픽셀 폭발', '아케이드 화염 이펙트'],
      en: ['integer grid explosion', '6-frame pixel explosion', 'arcade fireball effect'],
    },
  },
  'px-slash-afterimage-trail': {
    targets: ['shape', 'scene', 'input'],
    triggers: ['input'],
    useCases: {
      ko: ['백색 칼날 호선 뒤로 4단계 잔상 픽셀 띠가 불투명도를 감쇄하며 속도감을 표현하기'],
      en: ['Render a swift sword slash arc with 4 stepped afterimage ghost silhouettes decaying in opacity and hue'],
    },
    aliases: {
      ko: ['슬래시 잔상', '검격 궤적', '스텝 잔상 이펙트'],
      en: ['slash afterimage trail', 'sword arc trail', 'stepped ghost slash'],
    },
  },
  'px-sparkle-gemstone-shine': {
    targets: ['shape', 'image', 'input'],
    triggers: ['input'],
    useCases: {
      ko: ['다면체 보석 안에서 광택 위치를 조절하고 4갈래 별을 따로 반짝이기'],
      en: ['Move a clipped diagonal highlight inside a gemstone and trigger a separate four-point sparkle'],
    },
    aliases: {
      ko: ['보석 반짝임', '다면체 보석 광택', '십자 도트 반짝임'],
      en: ['gemstone sparkle glint', 'faceted jewel shimmer', 'cross star pixel glint'],
    },
  },
  'px-mosaic-pixel-wipe-transition': {
    targets: ['scene', 'image', 'input'],
    triggers: ['input'],
    useCases: {
      ko: ['1px에서 32px까지 블록 크기를 양자화해 첫 장면을 덮고 두 번째 장면으로 복원하기'],
      en: ['Quantize block resolution from 1px to 32px over 10 steps to transition between two contrasting pixel scenes'],
    },
    aliases: {
      ko: ['모자이크 장면 전환', '픽셀 모자이크 와이프', '해상도 전환 트랜지션'],
      en: ['mosaic scene transition', 'pixel mosaic wipe', 'resolution dissolve wipe'],
    },
  },
} satisfies Record<string, SearchMetadata>;
