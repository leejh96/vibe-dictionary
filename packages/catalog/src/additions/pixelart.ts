import type { TechniqueItem } from '../techniques';

export const PIXELART_ADDITIONS: TechniqueItem[] = [
  /* 1. 스프라이트·캐릭터 (sprites) */
  {
    id: 'px-sprite-walk-cycle',
    domain: 'pixelart',
    category: 'sprites',
    titleKo: '달빛 아래 탐험가 걷기',
    titleEn: 'Moonlit Explorer Walk Cycle',
    vibeTag: '밤하늘 달빛 아래 4방향 픽셀 격자 위로 망토를 펄럭이며 성큼성큼 걷는',
    vibeKeywords: ['걷기 사이클', 'Walk Cycle', '스프라이트 애니메이션', '도트 탐험가', '달빛 걷기', '픽셀 캐릭터'],
    summary: '고정된 48×48 정수 픽셀 격자에서 6프레임 걷기 주기와 달빛 조명을 재생·탐색하는 스프라이트 기법',
    promptSnippet:
      '지정한 영역에 달빛 아래 걷는 픽셀 스프라이트 애니메이션을 만들어 줘. 고정된 48×48 정수 픽셀 격자 위에서 접촉·다운·통과 등 6프레임 걷기 주기와 달빛 반사광을 표현하는 것이 핵심이야. 폭100%·최소높이188px·상단44px/좌우16px/하단20px 여백의 flex 중앙 정렬 영역 안에 viewBox 0 0 264 144·폭264px/최대100%·높이auto·shape-rendering crispEdges인 SVG를 놓고 비율을 유지해 줘. SVG는 12px 모서리·overflow hidden·#090d16 밤하늘 바탕을 가지며 초승달과 침엽수 실루엣 위로 망토를 두른 탐험가가 걸어가. 0.15s 간격의 프레임 재생과 슬라이더 탐색을 제공하고 보행 방향 반전 토글을 지원해 줘. 외부 이미지 폰트 없이 자체 정수 사각형 패스로 렌더링하고 모션 감소 상태에서는 슬라이더 수동 탐색을 유지해 줘.',
  },
  {
    id: 'px-flame-spirit-idle',
    domain: 'pixelart',
    category: 'sprites',
    titleKo: '일렁이는 불꽃 정령',
    titleEn: 'Flickering Flame Spirit',
    vibeTag: '핵심 백열부터 외곽 불똥까지 3단계 색 띠로 일렁이며 부유하는',
    vibeKeywords: ['불꽃 정령', 'Flame Spirit', '부유 대기모션', '불똥 파티클', '픽셀 이펙트', '도트 불꽃'],
    summary: '중심 백열·몸체 주황·외곽 심홍 띠와 상승하는 정수 불똥으로 대기 호흡을 표현한 픽셀 정령 스프라이트',
    promptSnippet:
      '지정한 영역에 부유하며 일렁이는 불꽃 정령 픽셀 스프라이트를 만들어 줘. 중심 백열·몸체 주황·외곽 심홍의 3단계 색 띠와 상승하는 정수 불똥 파티클로 대기 루프를 만드는 것이 핵심이야. 폭100%·최소높이188px·상단44px/좌우16px/하단20px 여백의 flex 중앙 정렬 영역 안에 viewBox 0 0 264 144·폭264px/최대100%·높이auto·shape-rendering crispEdges인 SVG를 사용해 줘. 48×48 픽셀 바운드 안에서 4프레임 일렁임 루프를 0.12s 주기로 순환하고, 바람 세기 슬라이더로 불꽃 끝 휨과 파티클 속도를 조절할 수 있게 해 줘. 12px 모서리와 다크 스테이지를 유지하며 흐림 필터 없이 선명한 계단식 픽셀 윤곽을 보존해 줘.',
  },
  {
    id: 'px-item-silhouette-set',
    domain: 'pixelart',
    category: 'sprites',
    titleKo: '아이템 실루엣 세트',
    titleEn: 'Item Silhouette Set',
    vibeTag: '원석·물약·열쇠·상자의 고유한 윤곽과 1픽셀 외곽선이 즉시 식별되는',
    vibeKeywords: ['아이템 실루엣', 'Item Silhouette', '도트 아이템', '1픽셀 외곽선', 'RPG 아이콘', '형태 식별'],
    summary: '24×24 정수 격자에서 원석·물약·마법 열쇠·보물상자의 고유 실루엣과 팔레트 분해를 검증하는 아이템 세트',
    promptSnippet:
      '지정한 영역에 명확한 실루엣과 1px 외곽선을 가진 판타지 RPG 아이템 4종 세트를 만들어 줘. 24×24 정수 격자 안에서 원석·플라스크 물약·마법 열쇠·보물상자가 한눈에 식별되는 고유 윤곽을 갖추는 것이 핵심이야. 폭100%·최소높이188px·상단44px/좌우16px/하단20px 여백의 flex 중앙 정렬 안에 viewBox 0 0 264 144·폭264px/최대100%·높이auto·shape-rendering crispEdges인 SVG를 배치해 줘. 실루엣 검은 음영 모드와 완성 팔레트 모드를 토글 버튼으로 즉시 전환할 수 있게 하고, 12px 모서리와 전시대 받침대를 렌더링해 줘. 1픽셀 외곽선 대비를 통해 밝은 배경과 어두운 배경 양쪽에서 가독성을 보장해 줘.',
  },
  {
    id: 'px-character-portrait-angles',
    domain: 'pixelart',
    category: 'sprites',
    titleKo: '3방향 캐릭터 포트레이트',
    titleEn: '3-Directional Character Portrait',
    vibeTag: '정면·반측면·측면으로 시점이 회전해도 픽셀 머리칼과 이목구비 비례가 유지되는',
    vibeKeywords: ['3방향 초상화', 'Character Portrait', '픽셀 포트레이트', '정면 측면 전환', '도트 얼굴', '대화창 초상화'],
    summary: '대화창에 쓰이는 정면·반측면·측면 3방향 두상 픽셀 아트를 같은 팔레트와 표정 전환으로 비교하는 포트레이트 기법',
    promptSnippet:
      '지정한 영역에 대화창용 3방향 픽셀 캐릭터 포트레이트를 만들어 줘. 48×48 정수 픽셀 크기에서 0도 정면·45도 반측면·90도 측면으로 시점이 바뀌어도 헤어 클러스터와 투구 장식의 비례가 유지되는 것이 핵심이야. 폭100%·최소높이188px·상단44px/좌우16px/하단20px 여백 안에 viewBox 0 0 264 144·폭264px/최대100%·높이auto·shape-rendering crispEdges인 SVG를 배치해 줘. 정면·반측면·측면 3개 버튼으로 시점을 즉시 전환하고 미소와 결의 표정 토글을 지원해 줘. 12px 모서리와 초상화 테두리를 포함하며 서브픽셀 보간 없이 정수 픽셀 클러스터로 명암을 표현해 줘.',
  },

  /* 2. 배경·풍경 (environments) */
  {
    id: 'px-parallax-mountain-depth',
    domain: 'pixelart',
    category: 'environments',
    titleKo: '산맥 픽셀 파랄랙스',
    titleEn: 'Pixel Mountain Parallax',
    vibeTag: '원경의 달과 보랏빛 산부터 근경의 침엽수림까지 층별 정수 속도로 깊이감을 펼치는',
    vibeKeywords: ['픽셀 파랄랙스', 'Pixel Parallax', '도트 산맥', '다층 배경', '정수 시차 스크롤', '원경 깊이감'],
    summary: '달·원경 산맥·중경 능선·근경 바위 4개 층을 정수 픽셀 오프셋으로 시차 이동시키는 파랄랙스 풍경 기법',
    promptSnippet:
      '지정한 영역에 다층 깊이감을 가진 픽셀 파랄랙스 산맥 배경을 만들어 줘. 밤하늘 달과 별, 원경 보라 산맥, 중경 능선, 근경 바위와 울타리의 4개 층이 각각 0.1배·0.3배·0.6배·1.0배의 속도로 시차 이동하는 것이 핵심이야. 폭100%·최소높이188px·상단44px/좌우16px/하단20px 여백의 컨테이너 안에 viewBox 0 0 264 144·폭264px/최대100%·높이auto·shape-rendering crispEdges인 SVG를 사용해 줘. 카메라는 슬라이더 조작에 따라 0에서 100까지 수평 이동하며 Math.round 정수 오프셋으로 서브픽셀 흐림을 차단해 줘. 12px 모서리와 다크 프레임을 유지하며 자동 패닝 재생 버튼도 지원해 줘.',
  },
  {
    id: 'px-sunset-river-reflection',
    domain: 'pixelart',
    category: 'environments',
    titleKo: '석양과 강물 픽셀 반사',
    titleEn: 'Sunset River Pixel Reflection',
    vibeTag: '노을 밴드 아래 수평선 해가 물결치듯 일렁이는 황금빛 픽셀 궤적으로 반사되는',
    vibeKeywords: ['석양 반사', 'River Reflection', '노을 수평선', '픽셀 강물', '수면 일렁임', '도트 노을'],
    summary: '디더링 노을 하늘과 수평선의 해, 교차 주사선 물결로 황금빛 반사 궤적을 맺는 픽셀 강물 연출 기법',
    promptSnippet:
      '지정한 영역에 석양의 태양과 강물 반사를 표현한 픽셀 풍경을 만들어 줘. 보라에서 황금빛까지 5단계 색 띠로 이루어진 노을 하늘과, 수평선 태양에서 뻗어 나오는 교차 주사선 수면 반사가 핵심이야. 폭100%·최소높이188px·상단44px/좌우16px/하단20px 여백 안에 viewBox 0 0 264 144·폭264px/최대100%·높이auto·shape-rendering crispEdges인 SVG를 배치해 줘. 0.1s 주기로 물결 반사 픽셀이 좌우로 번갈아 반짝이며, 슬라이더로 태양 고도를 낮추거나 올리면 반사 기둥의 폭과 하늘 색조가 변하게 해 줘. 12px 모서리와 선명한 디더 밴드를 유지해 줘.',
  },
  {
    id: 'px-rainy-neon-alley',
    domain: 'pixelart',
    category: 'environments',
    titleKo: '비 내리는 네온 골목',
    titleEn: 'Rainy Neon Alley',
    vibeTag: '어두운 벽돌 건물 사이로 네온 간판이 깜빡이고 사선 빗줄기가 물웅덩이 파문을 일으키는',
    vibeKeywords: ['네온 골목', 'Neon Alley', '픽셀 비', '빗줄기 반사', '사이버 골목', '도트 물웅덩이'],
    summary: '사선 정수 빗줄기·지면 파문 고리와 시안·마젠타 발광 네온 간판의 깜빡임을 결합한 사이버 레트로 골목 기법',
    promptSnippet:
      '지정한 영역에 비 내리는 사이버펑크 네온 골목 픽셀 풍경을 만들어 줘. 어두운 벽돌 건물 실루엣 사이로 65도 각도의 사선 빗줄기가 내리고 지면 물웅덩이에 픽셀 파문 고리가 번지는 것이 핵심이야. 폭100%·최소높이188px·상단44px/좌우16px/하단20px 여백 안에 viewBox 0 0 264 144·폭264px/최대100%·높이auto·shape-rendering crispEdges인 SVG를 배치해 줘. 시안과 마젠타 네온 간판이 0.08s 타이밍으로 부드럽게 깜빡이고, 강우량 슬라이더로 맑음·가랑비·폭우를 조절할 수 있게 해 줘. 12px 모서리와 지면 네온 반사광을 보존해 줘.',
  },
  {
    id: 'px-isometric-terrace-citadel',
    domain: 'pixelart',
    category: 'environments',
    titleKo: '아이소메트릭 테라스 성채',
    titleEn: 'Isometric Terrace Citadel',
    vibeTag: '2:1 투영법의 정수 블록으로 쌓아 올린 석조 테라스 정원과 계단이 입체감을 빚는',
    vibeKeywords: ['아이소메트릭 성채', 'Isometric Citadel', '2:1 투영 블록', '테라스 정원', '도트 건축', '쿼터뷰 픽셀'],
    summary: '2:1 정수 디메트릭 각도로 성채 벽체·정원 테라스·계단을 층별 단면으로 조작·조망하는 아이소메트릭 기법',
    promptSnippet:
      '지정한 영역에 2:1 투영법을 적용한 아이소메트릭 성채 픽셀 아트를 만들어 줘. 가로 2픽셀당 세로 1픽셀의 정수 디메트릭 각도로 기단·테라스 정원·탑루의 3개 층을 조형하는 것이 핵심이야. 폭100%·최소높이188px·상단44px/좌우16px/하단20px 여백 안에 viewBox 0 0 264 144·폭264px/최대100%·높이auto·shape-rendering crispEdges인 SVG를 배치해 줘. 상단면 밝은 톤, 좌측면 중간 톤, 우측면 그림자 톤의 3면 명암 체계를 유지하고, 층별 슬라이스 버튼으로 기단만 보기와 전체 보기를 전환할 수 있게 해 줘. 12px 모서리와 계단 디테일을 보존해 줘.',
  },

  /* 3. 타일·패턴 (tiles) */
  {
    id: 'px-autotile-terrain-bitmask',
    domain: 'pixelart',
    category: 'tiles',
    titleKo: '4방향 지형 오토타일',
    titleEn: '4-Directional Autotiling Bitmask',
    vibeTag: '상하좌우 이웃 타일 연결 상태를 4비트로 판정해 가장자리와 모서리를 자동 결합하는',
    vibeKeywords: ['오토타일', 'Autotile', '지형 비트마스크', '타일셋 결합', '도트 지형', '연결 모서리'],
    summary: '클릭으로 지형을 채우거나 지울 때 상하좌우 4비트 마스크로 16종 타일 경계를 실시간 결정하는 오토타일 기법',
    promptSnippet:
      '지정한 영역에 상하좌우 4방향 비트마스크를 적용한 지형 오토타일 시스템을 만들어 줘. 각 셀 36×24px 크기의 5×4 격자에서 셀을 클릭해 풀밭을 칠하거나 지울 때 4비트 이웃 마스크 계산으로 16종 타일 경계를 자동 선택하는 것이 핵심이야. 폭100%·최소높이188px·상단44px/좌우16px/하단20px 여백 안에 viewBox 0 0 264 144·폭264px/최대100%·높이auto·shape-rendering crispEdges인 SVG 또는 인터랙티브 캔버스를 배치해 줘. 외곽 모서리·직선 경계·고립 섬을 정확히 계산하고 초기화 및 섬 프리셋 버튼을 제공해 줘. 12px 모서리와 44px 조작 버튼을 유지해 줘.',
  },
  {
    id: 'px-dither-gradient-ramp',
    domain: 'pixelart',
    category: 'tiles',
    titleKo: '디더링 명암 램프',
    titleEn: 'Dithered Gradient Ramp',
    vibeTag: '제한된 4색 팔레트 위로 체커보드와 베이어 패턴이 매끄러운 입체 명암을 구현하는',
    vibeKeywords: ['디더링 램프', 'Dither Ramp', '베이어 매트릭스', '체커보드 명암', '4색 제한 팔레트', '도트 그라데이션'],
    summary: '포스터라이즈된 4단계 팔레트 사이를 2×2·4×4 규칙적 디더 패턴으로 채워 계단 현상 없이 곡면을 묘사하는 기법',
    promptSnippet:
      '지정한 영역에 제한된 4단계 팔레트와 정수 디더링을 적용한 구체 명암 램프를 만들어 줘. 암부·중간톤·명부·하이라이트의 4색 사이를 2×2 체커보드 및 4×4 베이어 매트릭스 점묘로 채워 완만한 톤 전환을 만드는 것이 핵심이야. 폭100%·최소높이188px·상단44px/좌우16px/하단20px 여백 안에 viewBox 0 0 264 144·폭264px/최대100%·높이auto·shape-rendering crispEdges인 SVG를 배치해 줘. 체커보드·베이어·단색 계단 3가지 패턴 토글과 광원 각도 슬라이더를 제공해 줘. 12px 모서리와 선명한 도트 명암을 보존해 줘.',
  },
  {
    id: 'px-seamless-pattern-repeat',
    domain: 'pixelart',
    category: 'tiles',
    titleKo: '픽셀 반복 패턴 시밍',
    titleEn: 'Seamless Pixel Pattern Seaming',
    vibeTag: '상하좌우 끝선이 한 픽셀 오차 없이 맞물려 3×3 그리드로 확장해도 이음매가 사라지는',
    vibeKeywords: ['심리스 패턴', 'Seamless Pattern', '이음매 없는 타일', '픽셀 반복 문양', '도트 텍스처', '토러스 랩'],
    summary: '40×36 논리 타일의 끝단을 3×3 반복 화면과 가로 오프셋으로 확인하는 심리스 패턴 기법',
    promptSnippet:
      '지정한 영역에 이음매 없이 무한 반복되는 던전 석조 심리스 픽셀 패턴을 만들어 줘. 가로 40px·세로 36px 논리 타일을 기준으로 좌측 2배 확대(80×72) 마스터 타일과 우측 3열×3행(120×108) 반복 타일링 영역에서 경계면 픽셀이 완벽히 이어지는 것이 핵심이야. 폭100%·최소높이188px·상단44px/좌우16px/하단20px 여백 안에 viewBox 0 0 264 144·폭264px/최대100%·높이auto·shape-rendering crispEdges인 SVG를 배치해 줘. 경계 토글을 켜면 마스터 타일에 붉은 점선, 반복 타일에 초록색 경계선을 표시해 줘. 수평 오프셋은 0~40px이고 40px에서는 한 주기를 돌아 0px과 같은 그림을 보여 줘. 12px 모서리를 유지해 줘.',
  },
  {
    id: 'px-palette-swap-texture',
    domain: 'pixelart',
    category: 'tiles',
    titleKo: '팔레트 교체 텍스처',
    titleEn: 'Indexed Palette Swap Texture',
    vibeTag: '동일한 5단계 색인 좌표에서 룩업 테이블만 교체해 숲·마그마·빙하·공허 표면으로 돌변하는',
    vibeKeywords: ['팔레트 스왑', 'Palette Swap', '색인 색상표', 'LUT 변환', '도트 텍스처', '표면 재질 전환'],
    summary: '형태 지오메트리 재배치 없이 5단계 인덱스 룩업 테이블을 교체해 재질과 분위기를 실시간 전환경하는 팔레트 기법',
    promptSnippet:
      '지정한 영역에 색인 색상표 교체로 질감을 바꾸는 픽셀 텍스처 기법을 만들어 줘. 기사 문장 방패의 고정된 정수 픽셀 형태 위에서 5단계 색인 값을 유지한 채 룩업 테이블만 교체해 숲·마그마·빙하·공허의 4종 분위기로 변환하는 것이 핵심이야. 폭100%·최소높이188px·상단44px/좌우16px/하단20px 여백 안에 viewBox 0 0 264 144·폭264px/최대100%·높이auto·shape-rendering crispEdges인 SVG를 배치해 줘. 4개 팔레트 프리셋 버튼을 누르면 지오메트리 재배치 없이 색상 테이블만 즉시 치환되게 해 줘. 12px 모서리를 보존해 줘.',
  },

  /* 4. 게임 UI (game_ui) */
  {
    id: 'px-hud-health-shield-bar',
    domain: 'pixelart',
    category: 'game_ui',
    titleKo: '하트와 실드 체력 HUD',
    titleEn: 'Pixel Heart & Shield HUD',
    vibeTag: '분할 하트와 마름모 실드가 피격 시 흔들리며 데미지 수치와 위험 깜빡임을 뿜어내는',
    vibeKeywords: ['체력 HUD', 'Health HUD', '도트 하트', '실드 바', '픽셀 체력바', '피격 피드백'],
    summary: '반칸 단위 하트·다이아몬드 보호막·전용 위치 피드백 수치와 저생명 펄스를 정수 도트로 통합한 액션 RPG HUD 기법',
    promptSnippet:
      '지정한 영역에 하트와 실드로 구성된 액션 RPG 픽셀 HUD를 만들어 줘. 5개 분할 하트와 4개 마름모 보호막 셀을 배치하고, 피격 시 실드가 먼저 깎인 뒤 하트가 반 칸 단위로 소모되는 체계가 핵심이야. 폭100%·최소높이188px·상단44px/좌우16px/하단20px 여백 안에 viewBox 0 0 264 144·폭264px/최대100%·높이auto·shape-rendering crispEdges인 SVG와 조작 버튼을 배치해 줘. 피격 -25·강타 -50·치유 +35·실드 충전 결과를 아이콘과 겹치지 않는 상단 영역에 표시하고 마지막 입력 0.9초 뒤에 지워 줘. 흔들림은 피격과 강타에만 적용하고 모션 감소에서는 생략해 줘. 남은 체력이 하트 반 칸 기준 3 이하라면 붉은 위험 테두리를 표시하고 12px 모서리를 유지해 줘.',
  },
  {
    id: 'px-inventory-grid-selector',
    domain: 'pixelart',
    category: 'game_ui',
    titleKo: '인벤토리 칸 선택기',
    titleEn: 'Inventory Grid Selector',
    vibeTag: '모서리 브래킷 커서가 칸을 이동하고 선택 아이템의 픽셀 배지와 능력치를 상세 패널에 띄우는',
    vibeKeywords: ['인벤토리 그리드', 'Inventory Grid', '아이템 슬롯', '커서 선택 브래킷', 'RPG 가방', '도트 장비창'],
    summary: '4×3 베벨 그리드에서 화살표·클릭으로 원석·물약·열쇠·상자를 선택하고 상세 스탯 패널을 표시하는 인벤토리 기법',
    promptSnippet:
      '지정한 영역에 그리드 탐색과 상세 정보창을 갖춘 픽셀 인벤토리 시스템을 만들어 줘. 4×3 베벨 슬롯 그리드 안에 원석·물약·룬 열쇠·보물상자 4종의 16×16 도트 아이템을 배치하고, 모서리 브래킷 커서로 선택된 아이템의 상세 이름과 속성 패널을 갱신하는 것이 핵심이야. 폭100%·최소높이188px·상단44px/좌우16px/하단20px 여백 안에 viewBox 0 0 264 144·폭264px/최대100%·높이auto·shape-rendering crispEdges인 SVG와 조작 버튼을 배치해 줘. 마우스 클릭 및 키보드 방향키 이동을 지원하고 다음 슬롯 및 첫 슬롯 선택 버튼을 제공해 줘. 12px 모서리를 보존해 줘.',
  },
  {
    id: 'px-rpg-dialog-typewriter',
    domain: 'pixelart',
    category: 'game_ui',
    titleKo: '픽셀 RPG 대화창',
    titleEn: 'Pixel RPG Dialog Box',
    vibeTag: '석조 프레임 안에서 화자 초상화 옆으로 대사가 한 글자씩 출력되는',
    vibeKeywords: ['RPG 대화창', 'Dialog Box', '타이프라이터 대화', '석조 프레임', '도트 텍스트창', '화자 포트레이트'],
    summary: '초상화와 대사를 나란히 배치하고 글자별 출력 효과를 켜거나 현재 대사를 다시 재생하는 고전 RPG 대화창 기법',
    promptSnippet:
      '지정한 영역에 고전 16비트 스타일의 픽셀 RPG 대화창을 만들어 줘. 최대 폭 264px의 석조 프레임에 12px 둥근 모서리와 금빛 리벳을 두고, 왼쪽 54px 정사각형 초상화의 세로 중앙에 오른쪽 이름과 대사 묶음을 맞추고, 프레임 높이는 내용과 안쪽 여백에 맞춰 줘. 초상화는 모자와 수염이 테두리 안에 들어오게 하고, 대사는 사용 가능한 폭에서 줄을 바꿔 줘. 첫 대사는 즉시 표시해 줘. 다음 대사 버튼은 고정 화살표와 함께 세 대사를 순환시켜 줘. 별도의 타자 효과 버튼으로 효과를 켜면 현재 대사를 처음부터 60ms마다 한 글자씩 표시하고 출력 중에만 화자의 입 모양을 바꿔 줘. 현재 대사 재생 버튼은 효과가 켜진 동안에만 활성화해 줘. 모션 감소 환경에서는 전체 대사를 즉시 표시해 줘.',
  },
  {
    id: 'px-minimap-radar',
    domain: 'pixelart',
    category: 'game_ui',
    titleKo: '상태 반응 픽셀 미니맵',
    titleEn: 'Interactive Pixel Minimap',
    vibeTag: '시야 원뿔을 따라 미개척 안개가 걷히고 플레이어와 보물상자 점이 실시간 갱신되는',
    vibeKeywords: ['픽셀 미니맵', 'Pixel Minimap', '전장의 안개', '도트 레이더', '던전 지도', '시야 원뿔 탐색'],
    summary: '24×24 정수 그리드에서 방향키 이동에 반응해 시야를 밝히고 적·보물 블립 위치를 동기화하는 미니맵 기법',
    promptSnippet:
      '지정한 영역에 전장의 안개와 시야 원뿔을 지원하는 픽셀 던전 미니맵을 만들어 줘. 24×24 정수 그리드 상에서 벽체와 통로를 표현하고 노란 플레이어 점이 이동할 때마다 미개척 안개가 걷히며 보물상자 점을 드러내는 것이 핵심이야. 폭100%·최소높이188px·상단44px/좌우16px/하단20px 여백 안에 viewBox 0 0 264 144·폭264px/최대100%·높이auto·shape-rendering crispEdges인 SVG를 배치해 줘. 상하좌우 조작 버튼으로 플레이어를 이동시키고 안개 토글 및 레이더 핑 펄스 효과를 지원해 줘. 12px 모서리를 보존해 줘.',
  },

  /* 5. 효과·애니메이션 (effects) */
  {
    id: 'px-integer-grid-explosion',
    domain: 'pixelart',
    category: 'effects',
    titleKo: '정수 그리드 폭발',
    titleEn: 'Integer Grid Explosion',
    vibeTag: '번쩍이는 섬광 핵에서 불꽃 톱니와 연기 고리로 산산이 부서지며 흩날리는 6프레임 아케이드',
    vibeKeywords: ['픽셀 폭발', 'Grid Explosion', '6프레임 폭발', '도트 화염', '아케이드 폭발', '임팩트 연기'],
    summary: '32×32 정수 격자에서 섬광점·화염 팽창·연기 파편·불똥 비산으로 이어지는 6프레임 아케이드 폭발 애니메이션 기법',
    promptSnippet:
      '지정한 영역에 아케이드 스타일의 6프레임 픽셀 폭발 애니메이션을 만들어 줘. 32×32 정수 격자에서 중심 섬광점·화염구 팽창·연기 도넛 고리·비산하는 1px 불똥 파편으로 이어지는 프레임 시퀀스가 핵심이야. 폭100%·최소높이188px·상단44px/좌우16px/하단20px 여백 안에 viewBox 0 0 264 144·폭264px/최대100%·높이auto·shape-rendering crispEdges인 SVG를 배치해 줘. 0.08s 프레임 타이밍으로 폭발 트리거 버튼과 프레임 스크러버 슬라이더를 제공해 줘. 12px 모서리와 충격 화면 진동 토글을 지원해 줘.',
  },
  {
    id: 'px-slash-afterimage-trail',
    domain: 'pixelart',
    category: 'effects',
    titleKo: '잔상 슬래시 궤적',
    titleEn: 'Slash Afterimage Trail',
    vibeTag: '칼날 호선 뒤로 4단계 잔상 픽셀이 색채와 불투명도를 감쇄하며 속도감을 새기는',
    vibeKeywords: ['슬래시 잔상', 'Slash Trail', '검기 궤적', '스텝 잔상', '도트 베기', '속도선 연출'],
    summary: '검격 호선 궤적에 정수 스텝 잔상 실루엣을 배치하고 감쇄 색상 띠로 공격 속도감을 극대화하는 슬래시 기법',
    promptSnippet:
      '지정한 영역에 검격 궤적과 잔상 효과를 픽셀 아트로 표현해 줘. 중심 백색 칼날 호선 뒤로 시안·청록·남색으로 이어지는 4단계 잔상 픽셀 띠가 불투명도를 낮추며 뒤따르는 것이 핵심이야. 폭100%·최소높이188px·상단44px/좌우16px/하단20px 여백 안에 viewBox 0 0 264 144·폭264px/최대100%·높이auto·shape-rendering crispEdges인 SVG를 배치해 줘. 0.25s 공격 트리거 버튼과 잔상 개수 조절 슬라이더, 베기 각도 전환 버튼을 제공해 줘. 12px 모서리와 정수 스텝 잔상을 유지해 줘.',
  },
  {
    id: 'px-sparkle-gemstone-shine',
    domain: 'pixelart',
    category: 'effects',
    titleKo: '흐르는 보석 반짝임',
    titleEn: 'Sparkling Gemstone Glint',
    vibeTag: '보석 안에서 대각선 광택 위치를 조절하고 별을 따로 반짝일 수 있는',
    vibeKeywords: ['보석 반짝임', 'Gemstone Glint', '도트 보석', '십자 반짝임', '광택 스위프', '다면체 반사'],
    summary: '보석 외곽 안에 갇힌 대각선 광택 띠와 버튼으로 켜는 십자 반짝임을 합성하는 기법',
    promptSnippet:
      '지정한 영역에 다면체 픽셀 보석을 만들어 줘. viewBox 0 0 264 144인 SVG에 색으로 나눈 보석 면과 대각선 광택 띠를 그려 줘. 보석 외곽을 클리핑 경계로 써서 광택이 면 밖으로 나가지 않게 해 줘. 광택 위치는 0~40 슬라이더로 조절하고 처음에는 20에 둬. 반짝이기 버튼은 광택 위치와 별개로 보석 위에 4갈래 별을 0.5초 동안 표시해 줘. 색상 선택은 루비·에메랄드·사파이어로 나누고 처음에는 루비를 선택해 줘. SVG는 최대 폭 264px, 둥근 모서리 12px로 맞춰 줘.',
  },
  {
    id: 'px-mosaic-pixel-wipe-transition',
    domain: 'pixelart',
    category: 'effects',
    titleKo: '단계별 모자이크 장면 전환',
    titleEn: 'Step-by-Step Pixel Mosaic Transition',
    vibeTag: '화면이 거대 모자이크 블록으로 뭉개졌다가 반대편 성채 장면으로 해상도를 복원하며 나타나는',
    vibeKeywords: ['모자이크 트랜지션', 'Pixel Mosaic Wipe', '해상도 전환', '도트 화면전환', '블록 전환', '픽셀 모자이크'],
    summary: '1px에서 32px까지 블록 크기를 정수 양자화해 장면을 덮고 두 번째 장면으로 복원하는 모자이크 전환 기법',
    promptSnippet:
      '지정한 영역에 블록 해상도를 단계별로 양자화하는 픽셀 모자이크 장면 전환 효과를 만들어 줘. 맑은 성채 장면에서 1px에서 32px 크기까지 거대 사각 블록으로 뭉개진 뒤, 10단계 과정을 거쳐 달밤 동굴 장면으로 해상도를 복원하는 것이 핵심이야. 폭100%·최소높이188px·상단44px/좌우16px/하단20px 여백 안에 viewBox 0 0 264 144·폭264px/최대100%·높이auto·shape-rendering crispEdges인 SVG를 배치해 줘. 0.5s 자동 전환 재생 버튼과 단계 슬라이더(0~10), 장면 A/B 수동 토글을 제공해 줘. 12px 모서리를 보존해 줘.',
  },
];
