import type { SearchMetadata } from '../../search-metadata';

export const GRAPHIC_SEARCH_METADATA = {
  'mg-intersection-clip': {
    targets: ['shape'], triggers: ['input'],
    useCases: { ko: ['범위 입력으로 두 원의 실제 교집합 렌즈를 조절하기'], en: ['Adjust the actual intersection lens of two circles with a range input'] },
    aliases: { ko: ['원 교집합', 'SVG 겹침 클립'], en: ['circle intersection', 'SVG overlap clip'] },
  },
  'mg-quadratic-bezier-editor': {
    targets: ['shape'], triggers: ['drag', 'input'],
    useCases: { ko: ['제어점을 드래그하거나 가로·세로 입력으로 이차 곡선을 편집하기'], en: ['Edit a quadratic curve by dragging its control point or changing horizontal and vertical inputs'] },
    aliases: { ko: ['이차 베지어 편집기', '곡선 제어 핸들'], en: ['quadratic Bezier editor', 'curve control handle'] },
  },
  'mg-fixed-stroke-zoom': {
    targets: ['shape'], triggers: ['click'],
    useCases: { ko: ['버튼으로 도형 크기를 두 배로 바꾸며 화면 선 두께를 유지하기'], en: ['Toggle a vector shape to double size with a button while preserving its screen stroke width'] },
    aliases: { ko: ['논 스케일링 스트로크', '선 두께 고정 확대'], en: ['non-scaling stroke', 'constant stroke zoom'] },
  },
  'mg-hatched-pattern-fill': {
    targets: ['shape'], triggers: ['static'],
    useCases: { ko: ['정적인 원과 사각형 안에 같은 간격의 사선 타일 질감을 채우기'], en: ['Fill a static circle and rectangle with equally spaced diagonal tile texture'] },
    aliases: { ko: ['사선 해칭 채움', 'SVG 반복 타일'], en: ['diagonal hatch fill', 'SVG repeating tile'] },
  },
  'mg-marching-ants-outline': {
    targets: ['shape'], triggers: ['auto'],
    useCases: { ko: ['선택 경계가 완성된 상태에서 점선의 위상만 반복 이동시키기'], en: ['Loop the dash phase around an already complete selection boundary'] },
    aliases: { ko: ['흐르는 선택 윤곽', '행진하는 점선'], en: ['marching ants border', 'animated selection dashes'] },
  },
  'mg-radial-rosette-repetition': {
    targets: ['shape'], triggers: ['static'],
    useCases: { ko: ['한 꽃잎을 30도씩 재사용해 정적인 열두 겹 대칭 문양 만들기'], en: ['Reuse one petal in 30-degree steps to make a static twelvefold symmetric ornament'] },
    aliases: { ko: ['방사형 꽃잎 반복', '열두 겹 로제트'], en: ['radial petal repetition', 'twelvefold rosette'] },
  },
  'mg-directed-connector-markers': {
    targets: ['shape'], triggers: ['static'],
    useCases: { ko: ['정적인 노드 분기 곡선의 끝에 접선 방향 화살표를 재사용하기'], en: ['Reuse tangent-aligned arrowheads at the ends of static branching node curves'] },
    aliases: { ko: ['SVG 화살표 마커', '분기 곡선 연결선'], en: ['SVG arrowhead marker', 'branching curve connector'] },
  },
  'mg-luminance-cutout-mask': {
    targets: ['shape'], triggers: ['auto'],
    useCases: { ko: ['자동 왕복하는 검은 밝기 마스크로 도형에 실제 투명 구멍 표현하기'], en: ['Reveal an actual transparent hole using an automatically alternating black luminance mask'] },
    aliases: { ko: ['밝기 컷아웃', '투명 구멍 마스크'], en: ['luminance cutout', 'transparent hole mask'] },
  },
  'mg-geometric-polygon-morph': {
    targets: ['shape'], triggers: ['auto'],
    useCases: { ko: ['같은 여덟 꼭짓점으로 팔각형·별·사각형 실루엣을 자동 보간하기'], en: ['Automatically interpolate octagon, star and square silhouettes using the same eight vertices'] },
    aliases: { ko: ['다각형 클립 모핑', '팔각형 별 사각형 변형'], en: ['polygon clip morph', 'octagon star square morph'] },
  },
  'mg-bezier-motion-path': {
    targets: ['shape'], triggers: ['auto'],
    useCases: { ko: ['베지어 경로의 접선을 따라 화살표 위치와 방향을 자동 반복 이동하기'], en: ['Automatically loop an arrow along a Bezier route while aligning its direction to the tangent'] },
    aliases: { ko: ['CSS 오프셋 패스', '접선 회전 경로 이동'], en: ['CSS offset path', 'tangent aligned path motion'] },
  },
} satisfies Record<string, SearchMetadata>;
