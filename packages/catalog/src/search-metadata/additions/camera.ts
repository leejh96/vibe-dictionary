import type { SearchMetadata } from '../../search-metadata';

export const CAMERA_SEARCH_METADATA = {
  'mg-radial-lens-distortion': {
    targets: ['scene'], triggers: ['input'],
    useCases: { ko: ['슬라이더로 방사 계수를 바꾸며 배럴·직선·핀쿠션 격자를 비교'], en: ['Compare barrel, straight and pincushion grids by changing a radial coefficient with a slider'] },
    aliases: { ko: ['방사 렌즈 왜곡', '배럴 핀쿠션 격자'], en: ['radial distortion grid', 'barrel pincushion comparison'] },
  },
  'mg-architectural-lens-shift': {
    targets: ['scene'], triggers: ['click'],
    useCases: { ko: ['버튼으로 상향 틸트와 수직 렌즈 시프트의 건축 수직선 수렴을 비교'], en: ['Compare architectural vertical convergence under upward tilt and vertical lens shift with two buttons'] },
    aliases: { ko: ['건축 시프트 투영', '수직 원근 제어'], en: ['architectural shift projection', 'vertical perspective control'] },
  },
  'mg-pedestal-roof-reveal': {
    targets: ['scene'], triggers: ['input'],
    useCases: { ko: ['카메라 높이 슬라이더로 지붕 위아래를 오가며 옥상 표식의 가림과 노출을 비교'], en: ['Move a camera-height slider above and below the roof to compare occlusion and reveal of rooftop markings'] },
    aliases: { ko: ['페데스탈 상승 샷', '수직 카메라 리빌'], en: ['pedestal rise', 'vertical camera reveal'] },
  },
  'mg-lateral-camera-truck': {
    targets: ['scene'], triggers: ['input'],
    useCases: { ko: ['슬라이더로 카메라를 좌우 이동해 앞 기둥의 실제 가림과 작품 리빌을 관찰'], en: ['Slide the camera sideways to observe physical foreground-pillar occlusion and the artwork reveal'] },
    aliases: { ko: ['트럭 오클루전', '횡이동 카메라 샷'], en: ['truck occlusion reveal', 'lateral tracking shot'] },
  },
  'mg-vertical-camera-tilt': {
    targets: ['scene'], triggers: ['input'],
    useCases: { ko: ['각도 슬라이더로 고정 위치 카메라를 틸트해 고층 건물의 꼭대기와 움직이는 수평선을 관찰'], en: ['Tilt a fixed-position camera with an angle slider to reveal a tall building top and observe the moving horizon'] },
    aliases: { ko: ['틸트 업 리빌', '고정 위치 수직 팬'], en: ['tilt-up reveal', 'fixed-position vertical tilt'] },
  },
  'mg-stationary-camera-pan': {
    targets: ['scene'], triggers: ['input'],
    useCases: { ko: ['슬라이더로 고정 위치 카메라의 좌우 시선을 바꾸며 입체 기둥 정원 원근을 비교'], en: ['Turn a fixed-position camera left and right with a slider to compare pillar-garden perspective'] },
    aliases: { ko: ['고정점 수평 팬', '카메라 요 회전'], en: ['fixed-position horizontal pan', 'camera yaw rotation'] },
  },
  'mg-projection-mode-switch': {
    targets: ['scene'], triggers: ['click'],
    useCases: { ko: ['버튼으로 동일한 세계 장면의 원근·정투영을 전환해 패널 크기와 격자 수렴을 비교'], en: ['Switch one world scene between perspective and orthographic projection to compare panel sizes and grid convergence'] },
    aliases: { ko: ['원근 정투영 비교', '직교 카메라 전환'], en: ['perspective orthographic comparison', 'orthographic camera switch'] },
  },
  'mg-dutch-camera-roll': {
    targets: ['scene'], triggers: ['input', 'click'],
    useCases: { ko: ['롤 슬라이더로 도시와 수평선을 함께 기울이고 복원 버튼으로 수평으로 되돌리기'], en: ['Tilt the city and horizon together with a roll slider and restore level with a button'] },
    aliases: { ko: ['더치 카메라 롤', '광축 롤 회전'], en: ['Dutch camera roll', 'optical-axis roll'] },
  },
  'mg-dolly-zoom-perspective': {
    targets: ['scene'], triggers: ['input'],
    useCases: { ko: ['슬라이더로 거리와 초점거리를 함께 바꿔 피사체 크기를 유지하며 복도 배경 압축을 비교'], en: ['Change camera distance and focal length together with a slider to compare corridor compression while retaining subject size'] },
    aliases: { ko: ['버티고 줌', '히치콕 돌리 줌'], en: ['vertigo zoom', 'Hitchcock dolly zoom'] },
  },
  'mg-orbit-camera-view': {
    targets: ['scene'], triggers: ['input'],
    useCases: { ko: ['수평각 슬라이더로 고정 상자를 중심으로 공전하며 반대 면과 무늬의 실제 가림을 비교'], en: ['Orbit a fixed box with a horizontal-angle slider to compare opposite faces, markings and physical face occlusion'] },
    aliases: { ko: ['타깃 중심 공전 카메라', '오비트 카메라 뷰'], en: ['target-centered orbit', 'orbit camera view'] },
  },
} satisfies Record<string, SearchMetadata>;
