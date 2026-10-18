export const SCIFI_KO_MESSAGES = {
  'demo.additions.scifi.terrainImage': '마름모 투사대 위로 황금빛 등고선이 층층이 떠 있는 지형',
  'demo.additions.scifi.xrayImage': '반투명 원통 외피 너머 축과 여섯 코일이 보이는 장비 투시',
  'demo.additions.scifi.checkerImage': '중앙으로 열 폭이 좁아져 안으로 접혀 보이는 흑백 체커보드',
  'demo.additions.scifi.copperImage': '중앙 칩의 핀에서 구리 배선이 고리형 비아로 뻗는 회로 기판',
  'demo.additions.scifi.hiddenLineImage': '블록 위 구멍 입구는 실선으로, 가려진 구멍 벽과 아래 단면은 파선으로 표시한 도면',
  'demo.additions.scifi.tribarImage': '세 보의 밝고 어두운 면이 앞뒤 관계를 모순되게 잇는 펜로즈 불가능 삼각형',
  'demo.additions.scifi.orthographicImage': '같은 계단형 부품의 상면·정면·우측면을 너비와 높이로 정렬하고 45도 연결선으로 깊이를 옮긴 3면 도면',
  'demo.additions.scifi.moleculeImage': '중앙 탄소 구 하나와 정사면체 방향의 수소 구 네 개를 결합 막대로 이은 메테인 볼앤스틱 모형',
  'demo.additions.scifi.kochImage': '정삼각형의 각 선분을 세 번 나눠 작은 삼각 돌기가 자기유사하게 이어지는 코흐 눈송이 윤곽',
  'demo.additions.scifi.mobiusImage': '반 바퀴 꼬인 띠의 양끝이 뒤집혀 이어지고 하나의 경계가 되는 모비우스 리본',
} as const;

export const SCIFI_EN_MESSAGES = {
  'demo.additions.scifi.terrainImage': 'Terrain with golden contour lines floating in layers above a diamond projection platform',
  'demo.additions.scifi.xrayImage': 'Device view with a shaft and six coils visible through a translucent cylindrical shell',
  'demo.additions.scifi.checkerImage': 'Black-and-white checkerboard with columns narrowing toward the center to suggest an inward fold',
  'demo.additions.scifi.copperImage': 'Circuit board with copper traces extending from central chip pins to ring-shaped vias',
  'demo.additions.scifi.hiddenLineImage': 'Block drawing with a solid-line hole mouth and dashed concealed hole walls and lower cross-section',
  'demo.additions.scifi.tribarImage': 'Penrose impossible triangle with light and dark faces of three beams joined in contradictory depth order',
  'demo.additions.scifi.orthographicImage': 'Top, front and right views of one stepped part aligned by width and height with depth transferred by a 45-degree line',
  'demo.additions.scifi.moleculeImage': 'Methane ball-and-stick model joining one central carbon sphere to four tetrahedrally arranged hydrogen spheres',
  'demo.additions.scifi.kochImage': 'Koch snowflake outline with three subdivisions of an equilateral triangle and self-similar triangular bumps',
  'demo.additions.scifi.mobiusImage': 'Möbius ribbon with a half twist, reversed ends joined together and one continuous boundary',
} satisfies Record<keyof typeof SCIFI_KO_MESSAGES, string>;
