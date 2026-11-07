import type { TechniqueItem } from '../techniques';

export const PIXELART_EXPANSION_ADDITIONS: TechniqueItem[] = [
  /* ============================================================================
   * 1. 스프라이트·캐릭터 (sprites) - 추가 6종
   * ============================================================================ */
  {
    id: 'px-blacksmith-hammer-strike',
    domain: 'pixelart',
    category: 'sprites',
    titleKo: '대장장이 망치 단조 타격',
    titleEn: 'Blacksmith Hammer Forge Strike',
    vibeTag: '용광로 불빛 아래 달궈진 강철 위로 망치를 치켜들었다가 내리찍으며 불꽃 파편을 튀기는',
    vibeKeywords: ['대장장이 단조', 'Blacksmith Forge', '망치 타격 프레임', '앤빌 스파크', '픽셀 대장간', '공격 선딜 후딜'],
    summary: '48×48 정수 격자에서 백스윙·모루 타격·8개 불똥 반동·회수의 4프레임 단조 동작을 제어하는 스프라이트 기법',
    promptSnippet:
      '지정한 영역에 대장장이 망치 단조 타격 픽셀 스프라이트를 만들어 줘. 48×48 정수 픽셀 격자에서 0번 머리 위 백스윙, 1번 모루 타격 임팩트(+2px 모루 진동), 2번 반동과 8개 불똥 파편 확산, 3번 회수 자세의 4프레임 주기를 표현하는 것이 핵심이야. 폭 100%·최소높이 188px·상단 44px/좌우 16px/하단 16px 여백의 컨테이너 안에 viewBox 0 0 264 144·폭 264px·12px 모서리·shape-rendering crispEdges인 SVG를 배치해 줘. 초기 상태는 불똥이 튀는 2번 프레임으로 시작하고, 0.14s 간격의 자동 재생/일시정지 토글과 강철 백열·룬 청열 금속 색상 전환 버튼, 0~3 프레임 슬라이더를 제공해 줘. 모션 감소 환경에서는 자동 재생을 비활성화하고 슬라이더 수동 탐색을 유지해 줘.',
  },
  {
    id: 'px-jump-arc-poses',
    domain: 'pixelart',
    category: 'sprites',
    titleKo: '점프 예비동작과 체공 착지',
    titleEn: 'Jump Anticipation Apex Landing',
    vibeTag: '웅크린 도약 예비동작부터 정점 체공의 망토 펄럭임과 착지 먼지까지 포물선 5단계를 그리는',
    vibeKeywords: ['점프 체공 포즈', 'Jump Arc Poses', '예비동작 스쿼트', '체공 정점', '착지 더스트', '플랫포머 점프'],
    summary: '포물선 궤적 위에서 도약 준비·상승·정점 체공·하강·착지 충격흡수의 5단계 핵심 포즈와 그림자 크기를 연동한 기법',
    promptSnippet:
      '지정한 영역에 플랫포머 캐릭터의 5단계 점프 포즈 픽셀 스프라이트를 만들어 줘. 0번 도약 예비 웅크림, 1번 수직 상승 신장, 2번 정점 체공(높이 34px 또는 저중력 46px), 3번 하강 낙하, 4번 착지 쿠션과 먼지 파편의 5프레임 포즈 및 바닥 그림자 축소·확대가 핵심이야. 폭 100%·최소높이 188px·상단 44px/좌우 16px/하단 16px 여백 안에 viewBox 0 0 264 144·폭 264px·12px 모서리·shape-rendering crispEdges인 SVG를 배치해 줘. 초기에는 2번 정점 체공 포즈를 표시하고, 0.16s 주기의 재생/일시정지 토글과 일반 중력(34px)·달 저중력(46px) 전환 버튼, 0~4 단계 슬라이더를 제공해 줘.',
  },
  {
    id: 'px-dragon-wing-stroke',
    domain: 'pixelart',
    category: 'sprites',
    titleKo: '드래곤 날개짓 상승 기류',
    titleEn: 'Dragon Wing Stroke Updraft',
    vibeTag: '거대한 박쥐형 날개막이 상하로 굽이치며 몸통 반작용 바운스와 화염 숨결을 뿜어내는',
    vibeKeywords: ['드래곤 날개짓', 'Dragon Wingbeat', '와이번 비행', '날개막 프레임', '몬스터 보스', '체공 반작용'],
    summary: '날개막의 4프레임 상하 스트로크에 맞춰 드래곤 몸통과 꼬리가 반작용으로 상하 바운스하는 비행 스프라이트 기법',
    promptSnippet:
      '지정한 영역에 화산 협곡 위를 체공하는 드래곤 날개짓 픽셀 스프라이트를 만들어 줘. 0번 날개 최고점 펼침, 1번 강한 내리치기와 상승 기류선, 2번 최저점 감싸기, 3번 접어 올리기의 4프레임 동안 몸통이 반작용으로 수직 바운스하는 것이 핵심이야. 폭 100%·최소높이 188px·상단 44px/좌우 16px/하단 16px 여백 안에 viewBox 0 0 264 144·폭 264px·12px 모서리·shape-rendering crispEdges인 SVG를 배치해 줘. 초기에는 0번 펼침 프레임과 화염 기운 켜짐 상태로 시작하고, 0.15s 간격의 날개짓 재생 토글과 입가 화염 기운 토글, 0~3 프레임 슬라이더를 제공해 줘.',
  },
  {
    id: 'px-slime-squash-stretch',
    domain: 'pixelart',
    category: 'sprites',
    titleKo: '슬라임 부피 보존 스쿼시 스트레치',
    titleEn: 'Slime Volume Squash & Stretch',
    vibeTag: '납작하게 눌린 60px 폭부터 수직으로 솟구친 48px 높이까지 젤리 코어의 부피를 유지하며 통통 튀는',
    vibeKeywords: ['슬라임 스쿼시', 'Slime Squash', '부피 보존 탄성', '젤리 몬스터', '스쿼시 앤 스트레치', '도트 슬라임'],
    summary: '폭 60×높이 18 압착부터 폭 24×높이 48 수직 신장까지 픽셀 면적을 보존하며 변형되는 젤리 슬라임 기법',
    promptSnippet:
      '지정한 영역에 부피 보존 법칙을 따르는 픽셀 슬라임 스쿼시 앤 스트레치 데모를 만들어 줘. -2단계 최대 압착(폭 60px·높이 18px)부터 0단계 기본형(폭 40px·높이 30px), +2단계 최대 도약 신장(폭 24px·높이 48px)까지 5단계 변형에서 내부 핵과 하이라이트 방울이 함께 반응하는 것이 핵심이야. 폭 100%·최소높이 188px·상단 44px/좌우 16px/하단 16px 여백 안에 viewBox 0 0 264 144·폭 264px·12px 모서리·shape-rendering crispEdges인 SVG를 배치해 줘. 초기 상태는 변형 0단계이며, 0.13s 주기의 탄성 점프 재생 토글과 에메랄드·아케인 퍼플 속성 전환 버튼, -2~2 변형 슬라이더를 제공해 줘.',
  },
  {
    id: 'px-modular-robot-loadout',
    domain: 'pixelart',
    category: 'sprites',
    titleKo: '모듈형 로봇 파츠 조합',
    titleEn: 'Modular Robot Accessory Loadout',
    vibeTag: '고정된 메카닉 동체 하드포인트 위로 레이더 안테나·제트팩·플라즈마 암이 오차 없이 합체되는',
    vibeKeywords: ['모듈형 로봇', 'Modular Robot', '파츠 커스터마이징', '메카닉 도트', '하드포인트 장착', '장비 레이어링'],
    summary: '48×48 로봇 본체의 머리·등·오른팔 하드포인트 좌표에 안테나·제트팩·플라즈마 암 파츠와 도색을 조합하는 기법',
    promptSnippet:
      '지정한 영역에 모듈형 픽셀 로봇 파츠 조합 시스템을 만들어 줘. 48×48 정수 격자 동체의 고정 하드포인트 소켓 위에 머리 레이더 안테나, 등 제트팩 부스터, 오른팔 플라즈마 실드 파츠를 레이어로 탈부착하는 것이 핵심이야. 폭 100%·최소높이 188px·상단 44px/좌우 16px/하단 16px 여백 안에 viewBox 0 0 264 144·폭 264px·12px 모서리·shape-rendering crispEdges인 SVG를 배치해 줘. 초기에는 안테나와 제트팩이 켜진 타이탄 블루 도색으로 시작하고, 3개 파츠 개별 장착 토글 버튼과 타이탄 블루·인더스트리얼 옐로·스텔스 크림슨 3종 도색 프리셋 버튼을 제공해 줘.',
  },
  {
    id: 'px-directional-archer-draw',
    domain: 'pixelart',
    category: 'sprites',
    titleKo: '3각도 궁수 시위 당김과 발사',
    titleEn: 'Directional Archer Draw & Release',
    vibeTag: '수평·상향 +45도·하향 -30도 표적 각도에 맞춰 활대와 시위 장력·화살 궤적이 정교하게 맞물리는',
    vibeKeywords: ['궁수 활시위', 'Archer Bow Draw', '방향별 조준', '시위 당김 프레임', '발사 이펙트', '도트 레인저'],
    summary: '수평 0°·상향 +45°·하향 -30° 조준 각도와 거총·반당김·만작·발사의 4단계를 결합한 궁수 스프라이트 기법',
    promptSnippet:
      '지정한 영역에 조준 각도와 활시위 장력을 제어하는 픽셀 궁수 스프라이트를 만들어 줘. 하체 지지발을 고정한 채 활대와 메긴 화살의 계단식 정수 기하를 상향 +45도·수평 0도·하향 -30도 표적 방향으로 조준하고, 0번 준비·1번 반당김·2번 만작 조준·3번 화살 발사 궤적의 4단계를 표현하는 것이 핵심이야. 폭 100%·최소높이 188px·상단 44px/좌우 16px/하단 16px 여백 안에 viewBox 0 0 264 144·폭 264px·12px 모서리·shape-rendering crispEdges인 SVG를 배치해 줘. 초기에는 수평 0도 조준과 2번 만작 단계로 시작하며, 3개 각도 선택 버튼(+45°·0°·-30°)과 0~3 시위 당김 슬라이더를 제공해 줘.',
  },

  /* ============================================================================
   * 2. 배경·풍경 (environments) - 추가 6종
   * ============================================================================ */
  {
    id: 'px-snow-village-accumulation',
    domain: 'pixelart',
    category: 'environments',
    titleKo: '설원 마을 강설 밀도와 적설',
    titleEn: 'Snow Village Flurry & Accumulation',
    vibeTag: '따뜻한 창가 등불이 켜진 목조 오두막 지붕과 전나무 위로 함박눈이 소복이 쌓여가는',
    vibeKeywords: ['설원 마을 적설', 'Snow Village Accumulation', '강설 밀도', '겨울 오두막', '지붕 눈더미', '도트 설경'],
    summary: '강설 단계(0~3)에 따라 연속 순환 낙하하는 눈송이 수(0~36개)와 지붕·소나무 적설 두께(0~8px)가 연동되는 설경 기법',
    promptSnippet:
      '지정한 영역에 강설 밀도와 지붕 적설량이 연동되는 설원 마을 픽셀 풍경을 만들어 줘. 0단계 맑은 초겨울(0개, 타이머 정지)부터 1단계 가벼운 눈발(12개, 적설 2px), 2단계 함박눈(24개, 적설 5px), 3단계 폭설(36개, 적설 8px)까지 126px 높이에서 끊김 없이 순환 낙하하는 눈송이 패스와 지붕·전나무 적설 층이 함께 두꺼워지는 것이 핵심이야. 폭 100%·최소높이 188px·상단 44px/좌우 16px/하단 16px 여백 안에 viewBox 0 0 264 144·폭 264px·12px 모서리·shape-rendering crispEdges인 SVG를 배치해 줘. 초기에는 적설 2단계와 창가 등불 켜짐 상태로 시작하고, 0.12s 주기의 강설 애니메이션 토글과 오두막 등불 토글, 0~3 적설 단계 슬라이더를 제공해 줘.',
  },
  {
    id: 'px-aurora-tundra-bands',
    domain: 'pixelart',
    category: 'environments',
    titleKo: '오로라 툰드라 파장 시프트',
    titleEn: 'Aurora Tundra Band Shift',
    vibeTag: '얼어붙은 빙하 호수 위로 에메랄드와 보랏빛 오로라 수직 커튼이 파동치며 투영되는',
    vibeKeywords: ['오로라 툰드라', 'Aurora Tundra', '오로라 커튼', '빙하 호수 반사', '극야 풍경', '수직 파장 시프트'],
    summary: '28개 수직 픽셀 기둥의 사인파 위상 이동으로 극야 하늘의 오로라 커튼과 빙하 호수 반사광을 연출하는 기법',
    promptSnippet:
      '지정한 영역에 오로라 커튼이 파동치는 극지 툰드라 픽셀 풍경을 만들어 줘. 밤하늘을 가로지르는 28개 수직 픽셀 기둥이 위상(0~11)에 따라 계단식 곡선으로 물결치고 하단 빙하 호수에 반사되는 것이 핵심이야. 폭 100%·최소높이 188px·상단 44px/좌우 16px/하단 16px 여백 안에 viewBox 0 0 264 144·폭 264px·12px 모서리·shape-rendering crispEdges인 SVG를 배치해 줘. 초기 위상은 3으로 시작하고, 0.14s 간격의 파동 재생 토글과 그린·바이올렛 및 시안·마젠타 스펙트럼 전환 버튼, 0~11 위상 슬라이더를 제공해 줘.',
  },
  {
    id: 'px-underwater-ruin-caustics',
    domain: 'pixelart',
    category: 'environments',
    titleKo: '해저 유적 수면 커스틱스',
    titleEn: 'Underwater Ruin Caustic Light',
    vibeTag: '일렁이는 해수면 아래 고대 신전 기둥과 모래 바닥 위로 청록빛 물결 광망이 교차하는',
    vibeKeywords: ['해저 유적 커스틱스', 'Underwater Caustics', '수중 신전', '물결 굴절광', '해저 기포', '도트 심해'],
    summary: '수면 물결에서 굴절된 사선 커스틱스 광망이 해저 석조 기둥과 바닥 위를 4프레임 주기로 흐르는 수중 배경 기법',
    promptSnippet:
      '지정한 영역에 수면 굴절광(Caustics)이 비치는 해저 유적 픽셀 풍경을 만들어 줘. 수면 물결에서 뻗어 나온 사선 빛 기둥과 석조 신전 기둥·해저 바닥의 밝은 커스틱스 타일이 0.15s 주기로 일렁이며 기포가 상승하는 것이 핵심이야. 폭 100%·최소높이 188px·상단 44px/좌우 16px/하단 16px 여백 안에 viewBox 0 0 264 144·폭 264px·12px 모서리·shape-rendering crispEdges인 SVG를 배치해 줘. 초기 광망 강도는 2단계와 발광 산호 켜짐으로 시작하고, 물결 재생 토글과 발광 산호 토글, 1~3 광망 강도 슬라이더를 제공해 줘.',
  },
  {
    id: 'px-windmill-wheat-breeze',
    domain: 'pixelart',
    category: 'environments',
    titleKo: '풍차 언덕과 황금 밀밭 바람결',
    titleEn: 'Windmill Hill & Wheat Field Breeze',
    vibeTag: '붉은 벽돌 풍차 날개가 회전하고 언덕 아래 황금빛 밀 이삭이 바람의 세기만큼 물결치는',
    vibeKeywords: ['풍차 밀밭 바람', 'Windmill Wheat Field', '황금 밀밭 파동', '풍차 날개 회전', '목가적 언덕', '도트 자연풍경'],
    summary: '바람 세기(0~3)에 맞춰 풍차 4날개의 4위상(8방위) 회전 속도와 전경 24줄기 황금 밀밭의 기울기 파동을 동기화한 풍경 기법',
    promptSnippet:
      '지정한 영역에 바람결에 반응하는 풍차 언덕과 황금 밀밭 픽셀 풍경을 만들어 줘. 바람 세기(0~3)가 0이면 정지하고 1~3이면 속도(0.20s·0.14s·0.09s)에 맞춰 풍차 날개가 4개 회전 위상(8방위 정수 각도)으로 돌며 언덕 아래 24줄기 황금 밀 이삭이 비례해 휘어지는 것이 핵심이야. 폭 100%·최소높이 188px·상단 44px/좌우 16px/하단 16px 여백 안에 viewBox 0 0 264 144·폭 264px·12px 모서리·shape-rendering crispEdges인 SVG를 배치해 줘. 초기 바람 세기는 2단계(0.14s 주기)와 정오 하늘로 시작하고, 바람 재생 토글과 정오·황혼 시간대 전환 버튼, 0~3 바람 세기 슬라이더를 제공해 줘.',
  },
  {
    id: 'px-lava-channel-flow',
    domain: 'pixelart',
    category: 'environments',
    titleKo: '용암 수로 냉각각과 유속 흐름',
    titleEn: 'Volcanic Lava Channel Flow',
    vibeTag: '검은 현무암 협곡 사이로 백열 마그마가 흐르고 식어가는 암각 파편이 폭포 아래로 쏟아지는',
    vibeKeywords: ['용암 수로 흐름', 'Lava Channel Flow', '화산 마그마', '현무암 냉각각', '용암 폭포', '던전 배경'],
    summary: '중심 백열·주황·심홍 3단 온도 띠와 검은 냉각 암각 타일이 수로와 낙하 폭포를 따라 이동하는 화산 배경 기법',
    promptSnippet:
      '지정한 영역에 현무암 협곡을 흐르는 용암 수로와 마그마 폭포 픽셀 풍경을 만들어 줘. 수로 중심의 백열 코어부터 가장자리 적갈색까지 온도 띠를 이루고, 수면 위 검은 냉각 암각 파편이 유속 위상(0~5)을 따라 폭포 아래로 이동하는 것이 핵심이야. 폭 100%·최소높이 188px·상단 44px/좌우 16px/하단 16px 여백 안에 viewBox 0 0 264 144·폭 264px·12px 모서리·shape-rendering crispEdges인 SVG를 배치해 줘. 초기 위상은 2로 시작하고, 0.13s 간격의 유류 재생 토글과 냉각 암각 밀도 토글, 0~5 유속 위상 슬라이더를 제공해 줘.',
  },
  {
    id: 'px-forest-canopy-shafts',
    domain: 'pixelart',
    category: 'environments',
    titleKo: '고목 수관 틈새 햇살 기둥',
    titleEn: 'Forest Canopy Sunbeam Shafts',
    vibeTag: '울창한 고목 잎사귀 틈을 뚫고 내려온 대각선 햇살 기둥이 이끼 낀 성소 제단을 환하게 비추는',
    vibeKeywords: ['수관 햇살 기둥', 'Forest Canopy Shafts', '숲속 갓레이', '나뭇잎 투광', '고대 숲 성소', '꽃가루 파티클'],
    summary: '수관 틈새 개수와 태양 각도(-20°~20°)에 따라 사선 빛 기둥과 숲 바닥의 조명 타일 위치가 연동되는 삼림 기법',
    promptSnippet:
      '지정한 영역에 고목 수관 틈새로 쏟아지는 햇살 기둥(Light Shafts) 픽셀 풍경을 만들어 줘. 태양 각도 슬라이더(-20~20, 5단위)에 따라 사선 빛 기둥의 기울기와 숲 바닥 이끼가 밝아지는 지점이 정확히 일치하는 것이 핵심이야. 폭 100%·최소높이 188px·상단 44px/좌우 16px/하단 16px 여백 안에 viewBox 0 0 264 144·폭 264px·12px 모서리·shape-rendering crispEdges인 SVG를 배치해 줘. 초기 각도는 0도와 3줄기 투광 모드로 시작하며, 3줄기·5줄기·성소 집중 프리셋 버튼과 꽃가루 반짝임 토글, -20~20 태양 각도 슬라이더를 제공해 줘.',
  },

  /* ============================================================================
   * 3. 타일·패턴 (tiles) - 추가 6종
   * ============================================================================ */
  {
    id: 'px-dual-grid-shore-corners',
    domain: 'pixelart',
    category: 'tiles',
    titleKo: '듀얼 그리드 해안선 모서리 타일',
    titleEn: 'Dual-Grid Shoreline Corner Tiles',
    vibeTag: '논리 지형 격자에서 반 칸 어긋난 듀얼 타일이 4개 꼭짓점 비트를 읽어 매끄러운 해안 곡선을 그리는',
    vibeKeywords: ['듀얼 그리드 해안', 'Dual-grid Shoreline', '반칸 오프셋 타일', '해안선 코너', '4비트 꼭짓점', '오토타일 대안'],
    summary: '4×4 논리 정점 격자와 반 칸 이동한 3×3 듀얼 타일을 겹쳐 내부 이음매 없는 잔디와 물 경계 모래 해안선을 완성하는 기법',
    promptSnippet:
      '지정한 영역에 반 칸 오프셋 듀얼 그리드(Dual-Grid) 해안선 타일 시스템을 만들어 줘. 4×4 논리 정점(잔디 대지 vs 바다)을 기준으로 반 타일 이동한 3×3 렌더링 격자가 네 꼭짓점의 4비트 상태(0~15)를 읽어, 인접한 대지끼리는 노란 이음매 없이 초록 잔디로 잇고 물과 맞닿은 경계에만 모래 해변과 파도 거품, 대각 해협(5·10번) 연결 다리를 그리는 것이 핵심이야. 폭 100%·최소높이 188px·상단 44px/좌우 16px/하단 16px 여백 안에 viewBox 0 0 264 144·폭 264px·12px 모서리·shape-rendering crispEdges인 SVG를 배치해 줘. 만(Bay)·대각 해협(Saddle)·환초(Atoll) 3가지 지형 프리셋 버튼과 듀얼 격자선 오버레이 토글, 파도 거품 전환 버튼을 제공해 줘.',
  },
  {
    id: 'px-wang-edge-color-tiles',
    domain: 'pixelart',
    category: 'tiles',
    titleKo: '왕 타일 2색 모서리 매칭',
    titleEn: '2-Edge Wang Tile Color Matching',
    vibeTag: '타일 상하좌우 네 변의 색상 코드가 이웃 타일과 한 치의 어긋남 없이 맞물려 수로와 회로를 잇는',
    vibeKeywords: ['왕 타일 매칭', 'Wang Edge Tiles', '모서리 색상 매칭', '비주기 타일링', '던전 수로 연결', '에지 비트마스크'],
    summary: '3×3 타일 보드에서 북·동·남·서 4변의 2색 에지 코드를 인접 타일과 일치시켜 끊김 없는 수로 패턴을 구성하는 기법',
    promptSnippet:
      '지정한 영역에 2색 모서리 매칭 규칙을 따르는 왕 타일(Wang Tiles) 보드를 만들어 줘. 3×3 타일 격자에서 각 타일의 북(1)·동(2)·남(4)·서(8) 변이 황금 수로(1) 또는 청석 벽(0) 상태를 가지며, 중앙 타일의 변을 바꿀 때 인접 타일의 공유 변이 즉시 동기화되는 것이 핵심이야. 폭 100%·최소높이 188px·상단 44px/좌우 16px/하단 16px 여백 안에 viewBox 0 0 264 144·폭 264px·12px 모서리·shape-rendering crispEdges인 SVG를 배치해 줘. 북쪽·동쪽·남서쪽 변 전환 버튼과 4변 보타이 가이드 토글, 기본 배치 복원 버튼을 제공해 줘.',
  },
  {
    id: 'px-seeded-brick-variants',
    domain: 'pixelart',
    category: 'tiles',
    titleKo: '시드 해시 벽돌 변주 타일',
    titleEn: 'Seeded Hash Brick Variants',
    vibeTag: '결정론적 좌표 해시로 균열·이끼·어두운 음각 벽돌을 자연스럽게 섞어 반복 타일의 단조로움을 깨는',
    vibeKeywords: ['시드 벽돌 변주', 'Seeded Brick Variants', '좌표 해시 타일', '던전 벽체 변주', '이끼 균열 타일', '반복성 제거'],
    summary: '8×5 성벽 격자에서 시드별 혼합 정수 해시로 기본 석재·균열·이끼·어두운 음각 변주 벽돌을 결정론적으로 배치하는 기법',
    promptSnippet:
      '지정한 영역에 시드 해시 기반의 벽돌 변주 타일 시스템을 만들어 줘. 8×5 엇갈림 성벽 격자에서 시드와 좌표를 혼합한 결정론적 정수 해시로 기본 벽돌·균열 벽돌·이끼 벽돌·어두운 음각 벽돌의 분포를 시드마다 뚜렷이 바꾸면서도 같은 시드·밀도에서는 동일한 패턴을 재현하는 것이 핵심이야. 폭 100%·최소높이 188px·상단 44px/좌우 16px/하단 16px 여백 안에 viewBox 0 0 264 144·폭 264px·12px 모서리·shape-rendering crispEdges인 SVG를 배치해 줘. 시드 1·2·3 선택 버튼과 시드 해시/단일 반복 비교 토글, 변주 밀도 슬라이더(0~100%, 25단위, 초기값 50%)를 제공해 줘.',
  },
  {
    id: 'px-nine-slice-pixel-frame',
    domain: 'pixelart',
    category: 'tiles',
    titleKo: '9슬라이스 픽셀 프레임 리사이즈',
    titleEn: '9-Slice Pixel Frame Resize',
    vibeTag: '창 크기를 가로세로로 늘여도 네 모서리 황금 리벳 장식은 1:1 정수 비율을 그대로 지키는',
    vibeKeywords: ['9슬라이스 프레임', '9-slice Pixel Frame', '나인패치 창', '모서리 보존 리사이즈', 'RPG 윈도우 테두리', '가변 타일 프레임'],
    summary: '12×12px 네 모서리 장식은 고정하고 상하좌우 변과 중앙 영역만 정수 단위로 확장하는 9슬라이스 UI 타일 기법',
    promptSnippet:
      '지정한 영역에 모서리 왜곡 없는 9슬라이스(9-Slice) 픽셀 프레임 리사이즈 데모를 만들어 줘. 12×12px 크기의 네 모서리 황금 리벳 블록은 1:1 원본 비율을 유지하고, 가로 폭(108px·168px·228px)과 세로 높이(48px~108px, 12px 단위) 변화에 맞춰 테두리 변과 내부만 확장되는 것이 핵심이야. 폭 100%·최소높이 188px·상단 44px/좌우 16px/하단 16px 여백 안에 viewBox 0 0 264 144·폭 264px·12px 모서리·shape-rendering crispEdges인 SVG를 배치해 줘. 초기 크기는 폭 168px·높이 84px와 9분할 가이드 켜짐으로 시작하고, 3개 폭 프리셋 버튼, 분할선 토글, 높이 슬라이더(48~108)를 제공해 줘.',
  },
  {
    id: 'px-conveyor-elbow-orientation',
    domain: 'pixelart',
    category: 'tiles',
    titleKo: '컨베이어 벨트 엘보 방향 전환',
    titleEn: 'Conveyor Belt Elbow Orientation',
    vibeKeywords: ['컨베이어 엘보 타일', 'Conveyor Elbow Tile', '벨트 방향 전환', '공장 타일셋', '화물 이송 궤도', '롤러 애니메이션'],
    vibeTag: '코너 엘보 턴테이블의 회전 방향에 맞춰 컨베이어 롤러 화살표와 에너지 상자의 이송 경로가 바뀌는',
    summary: '직선 벨트와 코너 엘보 타일의 회전 상태(우하향·하좌향·직선)에 따라 롤러 진행 방향과 화물 궤적을 제어하는 기법',
    promptSnippet:
      '지정한 영역에 공장 컨베이어 벨트와 코너 엘보 방향 전환 타일 데모를 만들어 줘. 중앙 엘보 타일을 우하향 코너·하좌향 코너·직선 통과로 전환하면 롤러 화살표와 에너지 화물 상자의 이동 경로(0~7 단계)가 해당 출구로 즉시 바뀌는 것이 핵심이야. 폭 100%·최소높이 188px·상단 44px/좌우 16px/하단 16px 여백 안에 viewBox 0 0 264 144·폭 264px·12px 모서리·shape-rendering crispEdges인 SVG를 배치해 줘. 초기 상태는 우하향 코너와 3번 위치이며, 엘보 회전 버튼, 정방향/역방향 토글, 0.14s 벨트 가동 토글, 0~7 위치 슬라이더를 제공해 줘.',
  },
  {
    id: 'px-one-way-platform-collision',
    domain: 'pixelart',
    category: 'tiles',
    titleKo: '단방향 플랫폼 상단 충돌 판정',
    titleEn: 'One-Way Platform Top Collision Edge',
    vibeTag: '아래에서 솟구칠 때는 발판을 그대로 통과하고 위에서 내려올 때만 상단 2px 경계면에 착지하는',
    vibeKeywords: ['단방향 플랫폼 타일', 'One-way Platform Tile', '상단 충돌 판정', '패스스루 발판', '하단 점프 낙하', '플랫포머 지형'],
    summary: '목재 발판의 상단 2px 충돌 경계선을 시각화해 상향 통과·상단 착지·하단 점프 낙하의 3가지 판정을 비교하는 기법',
    promptSnippet:
      '지정한 영역에 플랫포머 게임의 단방향(One-Way) 플랫폼 상단 충돌 판정 데모를 만들어 줘. 발판 상단 2px 충돌 경계선을 기준으로 아래서 위로 점프할 때(Δy < 0)는 통과하고, 위에서 내려올 때(Δy >= 0)는 안착하며, 아래 키 점프 시 통과 낙하하는 3가지 모드를 비교하는 것이 핵심이야. 폭 100%·최소높이 188px·상단 44px/좌우 16px/하단 16px 여백 안에 viewBox 0 0 264 144·폭 264px·12px 모서리·shape-rendering crispEdges인 SVG를 배치해 줘. 초기에는 위에서 착지 모드와 3번 단계, 판정선 표시 켜짐으로 시작하고, 3개 궤적 모드 버튼과 판정선 토글, 0~5 궤적 단계 슬라이더를 제공해 줘.',
  },

  /* ============================================================================
   * 4. 게임 UI (game_ui) - 추가 6종
   * ============================================================================ */
  {
    id: 'px-quest-tracker-states',
    domain: 'pixelart',
    category: 'game_ui',
    titleKo: '퀘스트 트래커 목표 상태창',
    titleEn: 'Quest Tracker Objective States',
    vibeTag: '세부 목표 체크박스가 채워질 때마다 진행률 게이지가 오르고 모든 조건 달성 시 황금 보물상자가 열리는',
    vibeKeywords: ['퀘스트 트래커', 'Quest Tracker UI', '목표 달성 체크', '임무 진행률 바', 'RPG 퀘스트창', '보상 해금 피드백'],
    summary: '고대 열쇠·봉인 제단·수호자 격파 3개 목표의 완료 체크에 따라 진행률 게이지와 보상 상자 해금이 갱신되는 퀘스트 UI 기법',
    promptSnippet:
      '지정한 영역에 목표 상태를 추적하는 픽셀 RPG 퀘스트 트래커 HUD를 만들어 줘. 3개의 세부 임무 행(1. 고대 열쇠·2. 봉인 제단·3. 수호자 격파)과 상단 진행률 바를 배치하고, 3개 목표가 모두 완료(3/3)되면 완료 배지와 우측 황금 보상 상자가 열리는 것이 핵심이야. 폭 100%·최소높이 188px·상단 44px/좌우 16px/하단 16px 여백 안에 viewBox 0 0 264 144·폭 264px·12px 모서리·shape-rendering crispEdges인 SVG를 배치해 줘. 초기에는 1번·2번 목표가 완료된 2/3 상태로 시작하며, 3개 목표 개별 완료 토글 버튼과 추적 강조 테두리 토글, 상태 초기화 버튼을 제공해 줘.',
  },
  {
    id: 'px-radial-spell-hotbar-cooldown',
    domain: 'pixelart',
    category: 'game_ui',
    titleKo: '스펠 핫바 부채꼴 쿨다운 스윕',
    titleEn: 'Radial Spell Hotbar Cooldown Sweep',
    vibeTag: '4칸 고유 속성 스킬 아이콘 위로 시계방향 부채꼴 마스크가 걷히며 슬롯별 쿨다운 비율이 줄어드는',
    vibeKeywords: ['스펠 쿨다운 핫바', 'Spell Hotbar Cooldown', '부채꼴 쿨타임', '스킬 슬롯 바', '재사용 대기시간', '액션 RPG 핫바'],
    summary: '고유 픽셀 문양을 가진 4칸 스킬 슬롯별로 독립된 부채꼴 쿨다운 마스크와 잔여 비율(%)·완료 테두리를 표시하는 기법',
    promptSnippet:
      '지정한 영역에 슬롯별 독립 부채꼴 쿨다운 스윕이 작동하는 4칸 픽셀 스펠 핫바를 만들어 줘. 고유 픽셀 스펠 문양(Q 화염구·W 빙결창·E 비전신성·R 낙뢰)을 가진 4개 슬롯마다 독립된 잔여 쿨다운 비율(0~100%, 10% 단위)과 시계방향 부채꼴 마스크를 유지해, 새 슬롯을 시전하거나 재시전하면 해당 슬롯만 100%로 초기화되고 이미 진행 중인 다른 슬롯의 0.12s 카운트다운은 지연 없이 계속 줄어들며 0%가 되면 금빛 READY 테두리를 켜는 것이 핵심이야. 폭 100%·최소높이 188px·상단 44px/좌우 16px/하단 16px 여백 안에 viewBox 0 0 264 144·폭 264px·12px 모서리·shape-rendering crispEdges인 SVG를 배치해 줘. 초기 상태는 W 슬롯 선택(Q 0%·W 60%·E 30%·R 0%)으로 시작하며, 0.12s 주기로 선택 슬롯을 100%에서 0%까지 감소시키는 스킬 시전 버튼과 슬롯 전환 버튼, 선택 슬롯의 잔여 비율을 수동 미리보기하는 0~100% 쿨다운 슬라이더를 제공해 줘.',
  },
  {
    id: 'px-turn-order-timeline',
    domain: 'pixelart',
    category: 'game_ui',
    titleKo: '턴제 전투 순서 타임라인 바',
    titleEn: 'Turn-Based Initiative Timeline',
    vibeTag: '상단 이니셔티브 레일 위에서 대기 유닛 토큰이 속도 버프에 따라 순번을 앞지르며 턴을 교대하는',
    vibeKeywords: ['턴 순서 타임라인', 'Turn Order Timeline', '이니셔티브 바', '턴제 전투 UI', '속도 버프 순서', '유닛 큐 레일'],
    summary: '표시된 단일 대기열을 기준으로 다음 턴 진행 시 #2 유닛이 즉시 행동하고 현재 #1 유닛은 대기열 끝(#4)으로 이동하며, 가속 버프 시 대기열(#2~#4)만 속도(SPD) 순으로 재정렬하는 4인 타임라인 기법',
    promptSnippet:
      '지정한 영역에 턴제 RPG의 4인 이니셔티브 순서 타임라인 바를 만들어 줘. 도적(SPD 18)·용사(SPD 16)·마법사(SPD 14)·보스(SPD 11) 4개 유닛 카드를 단일 표시 대기열로 상단 타임라인 레일에 배치해, 다음 턴 진행 시 표시된 대기열을 그대로 회전시켜 #2 유닛을 새 #1 활성 턴으로 올리고 기존 #1 유닛은 꼬리(#4)로 보내며, 마법사 가속 버프(SPD 14↔22) 토글 시에는 현재 행동 중인 #1 유닛은 고정한 채 대기 유닛(#2~#4)만 SPD 내림차순으로 재정렬하는 것이 핵심이야. 폭 100%·최소높이 188px·상단 44px/좌우 16px/하단 16px 여백 안에 viewBox 0 0 264 144·폭 264px·12px 모서리·shape-rendering crispEdges인 SVG를 배치해 줘. 다음 턴 진행 버튼, 마법사 가속 버프 토글, SPD 수치 표시 토글, 순서 초기화 버튼을 제공해 줘.',
  },
  {
    id: 'px-branching-dialogue-choices',
    domain: 'pixelart',
    category: 'game_ui',
    titleKo: '분기형 선택지 대화 결정 트리',
    titleEn: 'Branching Dialogue Choice Tree',
    vibeTag: '용기·기만·외교 3가지 응답 선택지에 따라 호감도 게이지와 후속 스토리 루트 태그가 즉시 갈리는',
    vibeKeywords: ['분기형 대화 선택지', 'Branching Dialogue Choices', '선택지 트리 UI', '성향 변화 게이지', 'RPG 분기 응답', '대화 결과 미리보기'],
    summary: '타이프라이터 출력 없이 3개 분기 선택지와 호감도 증감(+15/-5/+25) 게이지, 결정 확정 및 루트 태그를 제어하는 기법',
    promptSnippet:
      '지정한 영역에 선택에 따라 스토리 루트와 호감도 수치가 갈리는 분기형 픽셀 대화 선택지 UI를 만들어 줘. 타자 효과 없이 문지기 카엘의 대사와 3개 응답 선택지(1. 정면 돌파 용기 +15, 2. 암호 거래 기만 -5, 3. 동맹 제안 외교 +25)를 패널 폭 안에 깔끔히 배치하고 호감도 게이지 및 분기 루트 태그(돌파·잠입·동맹 루트)를 즉시 비교하는 것이 핵심이야. 폭 100%·최소높이 188px·상단 44px/좌우 16px/하단 16px 여백 안에 viewBox 0 0 264 144·폭 264px·12px 모서리·shape-rendering crispEdges인 SVG를 배치해 줘. 초기에는 1번 정면 돌파 선택지가 선택된 상태이며, 3개 선택지 버튼과 선택 확정/변경 토글, 분기 태그 표시 토글을 제공해 줘.',
  },
  {
    id: 'px-equipment-stat-comparison',
    domain: 'pixelart',
    category: 'game_ui',
    titleKo: '장비 교체 능력치 증감 비교창',
    titleEn: 'Equipment Stat Delta Comparison',
    vibeTag: '현재 장착 무기와 후보 무기의 공격력·속도·치명타를 대조해 초록 상승 화살표와 붉은 하락 수치를 띄우는',
    vibeKeywords: ['장비 능력치 비교', 'Equipment Stat Comparison', '스탯 증감 화살표', '무기 교체 프리뷰', 'RPG 장비 비교창', '델타 수치 표시'],
    summary: '기준 무기(강철검 ATK 32·SPD 28·CRIT 15)와 3종 후보 무기의 능력치 차이를 부호 있는 수치와 상승(▲)·하락(▼)·동일(=)로 표시하는 기법',
    promptSnippet:
      '지정한 영역에 장착 무기와 후보 무기의 능력치 증감을 비교하는 픽셀 장비 비교창을 만들어 줘. 기준 장비(강철검: ATK 32·SPD 28·CRIT 15)와 3종 후보 무기(태양검 46/22/30·그림자단검 26/44/45·거대대검 58/12/20)의 수치를 비교해 상승은 초록색 +수치 ▲, 하락은 붉은색 -수치 ▼, 장착 후 동일해진 수치는 회색 0 =으로 표시하는 것이 핵심이야. 폭 100%·최소높이 188px·상단 44px/좌우 16px/하단 16px 여백 안에 viewBox 0 0 264 144·폭 264px·12px 모서리·shape-rendering crispEdges인 SVG를 배치해 줘. 초기 후보는 태양검이며, 3개 후보 무기 선택 버튼과 장착 적용/기준 복원 토글 버튼을 제공해 줘.',
  },
  {
    id: 'px-collectible-badge-grid',
    domain: 'pixelart',
    category: 'game_ui',
    titleKo: '수집형 업적 배지 해금 도감',
    titleEn: 'Collectible Achievement Badge Grid',
    vibeTag: '잠긴 자물쇠 실루엣 슬롯이 해금되는 순간 6종 고유 픽셀 문장 배지와 도감 달성률이 금빛으로 빛나는',
    vibeKeywords: ['업적 배지 도감', 'Collectible Badge Grid', '트로피 컬렉션 UI', '배지 해금 상태', '수집률 게이지', '도트 엠블럼'],
    summary: '3×2 도감 그리드에서 잠긴 픽셀 자물쇠 실루엣과 6종 고유 픽셀 문장(불꽃·삼지창·날개·방패·별·왕관) 및 수집률(4/6~6/6)을 관리하는 기법',
    promptSnippet:
      '지정한 영역에 3×2 그리드 기반의 수집형 픽셀 업적 배지 도감 UI를 만들어 줘. 6개 업적 슬롯에서 잠긴 배지는 픽셀 자물쇠 실루엣(고리와 몸통·열쇠구멍)으로, 해금된 배지는 6종 고유 컬러 문장(불꽃·삼지창·날개·방패·별·왕관)과 금빛 테두리로 그리며 상단 수집 진행률(초기 4/6)과 우측 선택 배지 상세 패널을 연동하는 것이 핵심이야. 폭 100%·최소높이 188px·상단 44px/좌우 16px/하단 16px 여백 안에 viewBox 0 0 264 144·폭 264px·12px 모서리·shape-rendering crispEdges인 SVG를 배치해 줘. 다음 배지 선택 버튼, 선택 배지 해금/잠금 토글 버튼, 전체 해금(6/6) 버튼, 기본 상태(4/6) 복원 버튼을 제공해 줘.',
  },

  /* ============================================================================
   * 5. 효과·애니메이션 (effects) - 추가 6종
   * ============================================================================ */
  {
    id: 'px-teleport-dissolve-reform',
    domain: 'pixelart',
    category: 'effects',
    titleKo: '텔레포트 픽셀 분해와 재구성',
    titleEn: 'Teleport Pixel Dissolve & Reform',
    vibeTag: '고정된 픽셀 마스크 패턴을 따라 마법사가 청록빛 수직 광선으로 분해되어 반대편 워프 패드에 재결합하는',
    vibeKeywords: ['텔레포트 픽셀 분해', 'Teleport Pixel Dissolve', '워프 재구성 이펙트', '스캔라인 마스크', '순간이동 빔', '도트 소환 연출'],
    summary: '결정론적 픽셀 마스크와 수직 빔을 사용해 좌측 패드 분해(0~3)·광선 전송(4, 본체 소실)·우측 패드 재구성(5~8)을 시연하는 기법',
    promptSnippet:
      '지정한 영역에 결정론적 픽셀 마스크로 분해되고 재구성되는 텔레포트 이펙트를 만들어 줘. 0~3단계는 좌측 패드 A(x=68)에서만 캐릭터가 분해되고, 4단계는 양쪽 패드 모두 캐릭터 본체 없이 수직 전송 광선만 연결되며, 5~8단계는 우측 패드 B(x=196)에서만 재결합되는 것이 핵심이야. 폭 100%·최소높이 188px·상단 44px/좌우 16px/하단 16px 여백 안에 viewBox 0 0 264 144·폭 264px·12px 모서리·shape-rendering crispEdges인 SVG를 배치해 줘. 초기 단계는 분해 중인 3번으로 시작하며, 0.1s 간격으로 0에서 8번까지 1회 진행 후 멈추는 워프 실행 버튼과 패드 A/B 즉시 전환 버튼, 0~8 단계 슬라이더를 제공해 줘.',
  },
  {
    id: 'px-stepped-lightning-chain',
    domain: 'pixelart',
    category: 'effects',
    titleKo: '계단식 연쇄 번개 아크 방전',
    titleEn: 'Stepped Chain Lightning Arc',
    vibeTag: '코일 탑에서 뻗어 나온 직각·45도 계단식 전류가 3개의 룬 파일런을 연쇄 타격하며 스파크를 터뜨리는',
    vibeKeywords: ['연쇄 번개 아크', 'Stepped Chain Lightning', '체인 라이트닝', '픽셀 전류 방전', '룬 파일런 타격', '도트 번개 이펙트'],
    summary: '직각과 45도 정수 꺾임선으로 구성된 백색 코어·시안 글로우 번개가 1~3개 타깃 파일런을 연쇄 연결하는 방전 기법',
    promptSnippet:
      '지정한 영역에 계단식 픽셀 꺾임선으로 이어지는 연쇄 번개(Chain Lightning) 이펙트를 만들어 줘. 좌측 방전 코일에서 최대 3개의 룬 파일런까지 시안 외곽광과 백색 중심 아크가 연쇄 도약하며 타격 지점에 십자 스파크를 표시하는 것이 핵심이야. 폭 100%·최소높이 188px·상단 44px/좌우 16px/하단 16px 여백 안에 viewBox 0 0 264 144·폭 264px·12px 모서리·shape-rendering crispEdges인 SVG를 배치해 줘. 초기에는 3개 타깃 연쇄 상태로 시작하고, 0.11s 주기로 4종 아크 파형을 순환하는 방전 루프 토글과 파형 스텝 전환 버튼, 1~3 연쇄 타깃 수 슬라이더를 제공해 줘.',
  },
  {
    id: 'px-directional-crt-glitch',
    domain: 'pixelart',
    category: 'effects',
    titleKo: '방향성 CRT 주사선 슬라이스 글리치',
    titleEn: 'Directional CRT Scanline Glitch',
    vibeTag: '사이버 엠블럼이 주사선 슬라이스 단위로 어긋나며 적색·시안 색수차 고스트를 튕겨내는',
    vibeKeywords: ['CRT 슬라이스 글리치', 'Directional CRT Glitch', '주사선 색수차', '픽셀 화면 노이즈', 'RGB 스플릿', '디지털 왜곡 이펙트'],
    summary: '6개 클리핑 주사선 슬라이스 대역별로 정수 오프셋과 적·청 채널 분리를 적용해 수평·수직 방향 글리치를 제어하는 기법',
    promptSnippet:
      '지정한 영역에 방향성 CRT 주사선 슬라이스 글리치 이펙트를 만들어 줘. 중앙 픽셀 엠블럼을 6개 슬라이스 대역으로 나누고, 강도(0~4)와 축 방향(수평 슬라이스·수직 지터)에 따라 적색(#f43f5e)·시안(#06b6d4) 채널 분리와 정수 오프셋 왜곡을 주는 것이 핵심이야. 폭 100%·최소높이 188px·상단 44px/좌우 16px/하단 16px 여백 안에 viewBox 0 0 264 144·폭 264px·12px 모서리·shape-rendering crispEdges인 SVG를 배치해 줘. 초기 강도는 2단계와 수평 모드로 시작하며, 0.12s 주기의 글리치 버스트 토글과 수평/수직 방향 전환 버튼, 0~4 강도 슬라이더를 제공해 줘.',
  },
  {
    id: 'px-ground-shockwave-rings',
    domain: 'pixelart',
    category: 'effects',
    titleKo: '지면 강타 동심 충격파 링',
    titleEn: 'Ground Slam Shockwave Rings',
    vibeTag: '거대 전투망치가 내리꽂힌 중심점으로부터 계단식 동심원 파동과 바닥 석판 융기가 퍼져 나가는',
    vibeKeywords: ['지면 충격파 링', 'Ground Shockwave Rings', '보스 광역 강타', '동심원 파동', '바닥 타일 융기', '도트 임팩트 링'],
    summary: '중심 타격점에서 확산되는 2중 픽셀 동심 링과 파동 반경에 맞춰 솟아오르는 바닥 석판 파편을 동기화한 기법',
    promptSnippet:
      '지정한 영역에 지면 강타 시 퍼져 나가는 픽셀 동심 충격파 링 이펙트를 만들어 줘. 타격 중심에서 0~6 프레임 동안 황금·주황 동심 링이 아이소메트릭 비율로 팽창하고, 파동이 지나가는 위치의 바닥 석판 블록이 수직으로 솟구치는 것이 핵심이야. 폭 100%·최소높이 188px·상단 44px/좌우 16px/하단 16px 여백 안에 viewBox 0 0 264 144·폭 264px·12px 모서리·shape-rendering crispEdges인 SVG를 배치해 줘. 초기에는 충격파가 확장 중인 3번 프레임과 파편 융기 켜짐으로 시작하고, 0.09s 간격으로 6번 프레임까지 1회 재생하는 지면 강타 버튼과 파편 융기 토글, 0~6 프레임 슬라이더를 제공해 줘.',
  },
  {
    id: 'px-ice-freeze-thaw-spread',
    domain: 'pixelart',
    category: 'effects',
    titleKo: '빙결 결정 확산과 해동 전이',
    titleEn: 'Ice Crystal Freeze & Thaw Spread',
    vibeTag: '분수대 중심에서 팔각형 얼음 결정 전선이 퍼져 나가며 고드름 기둥을 세웠다가 물결로 녹아내리는',
    vibeKeywords: ['빙결 결정 확산', 'Ice Freeze Spread', '프로스트 노바', '해동 상태 전이', '얼음 기둥 이펙트', '도트 빙결 마법'],
    summary: '중앙 석조 분수대를 중심으로 0단계 수면에서 최대 확산 반경 5단계(분수대 완전 결빙, 거리 6인 네 모서리 셀은 반경 밖 유지)까지 팔각형 서리 타일과 얼음 기둥이 확산·해동되는 기법',
    promptSnippet:
      '지정한 영역에 중심에서 확산되고 다시 녹는 픽셀 빙결·해동 전이 이펙트를 만들어 줘. 9×5 격자 정중앙의 석조 분수대(4,2)를 중심으로 0단계 액체 수면부터 최대 확산 반경 5단계(분수대가 완전히 얼어붙고 맨해튼 거리 6인 네 모서리 셀은 반경 5 밖에 남음)까지 맨해튼 거리에 따라 팔각형 서리 타일과 솟아오른 얼음 결정 기둥이 단계별로 번지거나 녹아내리는 것이 핵심이야. 폭 100%·최소높이 188px·상단 44px/좌우 16px/하단 16px 여백 안에 viewBox 0 0 264 144·폭 264px·12px 모서리·shape-rendering crispEdges인 SVG를 배치해 줘. 초기 상태는 중반까지 얼어붙은 3단계로 시작하며, 0.11s 간격으로 5단계까지 얼리는 빙결 확산 버튼과 0단계까지 녹이는 해동 복원 버튼, 0~5 빙결 반경 슬라이더를 제공해 줘.',
  },
  {
    id: 'px-pixel-portal-swirl',
    domain: 'pixelart',
    category: 'effects',
    titleKo: '시간 제한 픽셀 차원문 소용돌이',
    titleEn: 'Time-Bounded Pixel Portal Swirl',
    vibeTag: '흑요석 아치 안쪽에서 4갈래 나선 와류가 회전하고 기둥의 8칸 룬 타이머가 모두 소진되면 차원문이 닫히는',
    vibeKeywords: ['픽셀 차원문 소용돌이', 'Pixel Portal Swirl', '시간 제한 포탈', '보텍스 와류', '룬 타이머 게이지', '도트 워프게이트'],
    summary: '석조 아치 기둥의 8단계 룬 타이머가 점등된 동안 4갈래 계단식 나선 팔이 회전하고 8단계 만료 시 닫히는 차원문 기법',
    promptSnippet:
      '지정한 영역에 지속 시간이 제한된 픽셀 차원문(Portal) 소용돌이 이펙트를 만들어 줘. 흑요석 아치 내부의 4갈래 계단식 픽셀 나선 팔이 단계마다 회전하는 동안 양쪽 기둥의 8칸 룬 표시등(8-step)이 하나씩 소등되고, 8단계에 도달하면 특이점으로 수축하며 닫히는 것이 핵심이야. 폭 100%·최소높이 188px·상단 44px/좌우 16px/하단 16px 여백 안에 viewBox 0 0 264 144·폭 264px·12px 모서리·shape-rendering crispEdges인 SVG를 배치해 줘. 초기에는 활짝 열린 2단계(룬 6개 점등)와 공허 보라 색상으로 시작하며, 0.12s 간격으로 0에서 8까지 진행 후 종료되는 차원문 개방 버튼과 공허 보라·균열 에메랄드 색상 전환 버튼, 0~8 타임라인 슬라이더를 제공해 줘.',
  },
];
