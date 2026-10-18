import type { SearchMetadata } from '../../search-metadata';

export const SCIFI_SEARCH_METADATA = {
  'st-mobius-half-twist-ribbon': {
    targets: ['shape', 'image'], triggers: ['static'],
    aliases: { ko: ['뫼비우스 띠', '반회전 곡면'], en: ['Möbius band', 'half-twisted strip'] },
    useCases: { ko: ['반회전 접합과 하나의 경계를 고정 벡터 리본으로 표현하기'], en: ['Illustrate a half-twist seam and single boundary with a static vector ribbon'] },
  },
  'st-koch-fractal-outline': {
    targets: ['shape', 'image'], triggers: ['static'],
    aliases: { ko: ['코흐 눈송이 윤곽', '삼각 자기유사 곡선'], en: ['Koch snowflake boundary', 'recursive triangular outline'] },
    useCases: { ko: ['세 번의 선분 분할로 자기유사 윤곽과 육방 대칭을 정적으로 표현하기'], en: ['Show self-similar contours and sixfold symmetry using three static subdivision passes'] },
  },
  'st-tetrahedral-ball-stick': {
    targets: ['shape', 'image'], triggers: ['static'],
    aliases: { ko: ['메테인 볼앤스틱', '정사면체 원자 모형'], en: ['methane ball-and-stick', 'tetrahedral atomic model'] },
    useCases: { ko: ['탄소와 네 수소의 이상적인 정사면체 배치를 구와 막대로 정적으로 시각화하기'], en: ['Visualize an ideal tetrahedral arrangement of carbon and four hydrogens using static spheres and sticks'] },
  },
  'st-third-angle-multiview': {
    targets: ['image', 'shape'], triggers: ['static'],
    aliases: { ko: ['제3각법 삼면도', '정렬된 정투상 도면'], en: ['third-angle multiview', 'aligned orthographic views'] },
    useCases: { ko: ['같은 계단 부품의 상면·정면·우측면 치수 관계를 정적인 투상선으로 보여 주기'], en: ['Show dimensional relationships between top, front and right views of one stepped part using static projection guides'] },
  },
  'st-penrose-impossible-tribar': {
    targets: ['shape', 'image'], triggers: ['static'],
    aliases: { ko: ['펜로즈 삼각형', '불가능 트라이바'], en: ['Penrose triangle', 'impossible tribar'] },
    useCases: { ko: ['세 보의 모순된 앞뒤 연결을 정적인 벡터 착시로 보여 주기'], en: ['Show contradictory depth joins between three beams as a static vector illusion'] },
  },
  'st-hidden-line-isometric': {
    targets: ['image', 'shape'], triggers: ['static'],
    aliases: { ko: ['숨은 구멍 파선 도면', '은선 제도'], en: ['hidden-edge drafting', 'dashed concealed-hole drawing'] },
    useCases: { ko: ['불투명 블록의 보이는 구멍 입구와 숨은 벽을 실선·파선으로 구별하기'], en: ['Distinguish a visible hole mouth from concealed walls in an opaque block using solid and dashed lines'] },
  },
  'st-pcb-copper-traces': {
    targets: ['image', 'scene'], triggers: ['static'],
    aliases: { ko: ['인쇄회로 구리 트랙', 'PCB 배선 패턴'], en: ['printed-circuit copper tracks', 'PCB routing pattern'] },
    useCases: { ko: ['칩 핀에서 비아로 이어지는 구리 트랙과 기판을 정적인 장비 이미지로 표현하기'], en: ['Illustrate a static equipment board with copper tracks connecting chip pins to vias'] },
  },
  'st-opart-pinched-checker': {
    targets: ['image', 'background'], triggers: ['static'],
    aliases: { ko: ['중앙 압축 체크 패턴', '핀치 체커 착시'], en: ['center-compressed checker pattern', 'pinched checker illusion'] },
    useCases: { ko: ['체크 열 폭을 중앙으로 좁혀 접히는 평면 같은 정적 기하 착시 만들기'], en: ['Suggest a folding plane with a static geometric illusion of checker columns narrowing toward the center'] },
  },
  'st-xray-device-shell': {
    targets: ['image', 'scene'], triggers: ['static'],
    aliases: { ko: ['반투명 원통 장비', '내부 코일 투시'], en: ['see-through cylindrical device', 'transparent-shell coil illustration'] },
    useCases: { ko: ['옅은 원통 외피와 내부 축·코일을 겹친 정적 장비 투시 이미지 만들기'], en: ['Create a static see-through device illustration layering a faint cylindrical shell with its internal shaft and coils'] },
  },
  'st-holographic-contour-terrain': {
    targets: ['scene', 'image'], triggers: ['static'],
    aliases: { ko: ['층층이 쌓인 지형 등고선', '투사대 등고선 지형'], en: ['layered contour terrain', 'projected contour relief'] },
    useCases: { ko: ['마름모 받침 위로 줄어드는 등고선을 쌓아 정적인 SF 지형 투사를 표현하기'], en: ['Suggest a static sci-fi terrain projection by stacking shrinking contours above a diamond platform'] },
  },
} satisfies Record<string, SearchMetadata>;
