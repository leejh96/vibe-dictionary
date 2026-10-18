import type { SearchMetadata } from '../../search-metadata';

export const VFX_SEARCH_METADATA = {
  'mg-feathered-vignette': {
    targets: ['scene', 'image'], triggers: ['input'],
    useCases: { ko: ['범위 입력으로 풍경의 중심을 보존하며 가장자리 감광 세기 조절'], en: ['Adjust landscape edge darkening with a range input while preserving the center'] },
    aliases: { ko: ['타원 감광', '페더 비네트'], en: ['elliptical vignette', 'feathered edge darkening'] },
  },
  'mg-horizontal-directional-blur': {
    targets: ['shape', 'image'], triggers: ['input'],
    useCases: { ko: ['범위 입력으로 세로 높이는 유지하며 그래픽의 수평 번짐 조절'], en: ['Adjust a graphic’s horizontal blur with a range input while retaining vertical height'] },
    aliases: { ko: ['일축 가우시안 블러', '가로 방향 블러'], en: ['single-axis Gaussian blur', 'horizontal Gaussian blur'] },
  },
  'mg-channel-posterize': {
    targets: ['image', 'shape'], triggers: ['input'],
    useCases: { ko: ['범위 입력으로 RGB 채널당 색 단계를 바꿔 구체와 리본의 밴딩 비교'], en: ['Compare sphere and ribbon banding by adjusting RGB levels per channel with a range input'] },
    aliases: { ko: ['채널 양자화', '색 단계 축소'], en: ['RGB quantization', 'color level reduction'] },
  },
  'mg-laplacian-edge-detect': {
    targets: ['image', 'shape'], triggers: ['input'],
    useCases: { ko: ['범위 입력으로 카메라 그래픽 원본과 실제 밝기 경계 검출 결과 혼합'], en: ['Mix a camera graphic with detected luminance contours using a range input'] },
    aliases: { ko: ['라플라시안 경계 검출', '밝기 윤곽 필터'], en: ['Laplacian contour filter', 'luminance edge detection'] },
  },
  'mg-highlight-bloom': {
    targets: ['shape', 'image'], triggers: ['input'],
    useCases: { ko: ['범위 입력으로 밝은 도형만 추출한 블룸 반경과 합성 강도 조절'], en: ['Adjust the radius and additive weight of extracted-highlight bloom with a range input'] },
    aliases: { ko: ['밝은 픽셀 블룸', '하이라이트 발광'], en: ['threshold bloom', 'highlight glow'] },
  },
  'mg-optical-lens-flare': {
    targets: ['scene', 'shape'], triggers: ['input'],
    useCases: { ko: ['범위 입력으로 광원 위치를 바꾸며 반대편 축의 렌즈 고스트 배치 확인'], en: ['Move a light source with a range input and inspect lens ghosts on the opposite optical axis'] },
    aliases: { ko: ['렌즈 고스트', '광학 플레어'], en: ['lens ghosting', 'optical flare'] },
  },
  'mg-luma-gradient-wipe': {
    targets: ['scene', 'image'], triggers: ['input'],
    useCases: { ko: ['범위 입력으로 고정 밝기 지도의 어두운 영역부터 두 풍경 교체'], en: ['Replace two landscapes from dark luminance-map regions first using a range input'] },
    aliases: { ko: ['밝기 매트 와이프', '그레이스케일 와이프'], en: ['luminance matte wipe', 'grayscale gradient wipe'] },
  },
  'mg-block-dissolve-transition': {
    targets: ['scene', 'image'], triggers: ['input'],
    useCases: { ko: ['범위 입력으로 고정 순서의 정사각 블록을 지워 다음 그래픽 노출'], en: ['Reveal the next graphic by removing square blocks in a fixed order with a range input'] },
    aliases: { ko: ['정사각 블록 와이프', '모자이크 디졸브'], en: ['square block wipe', 'mosaic dissolve'] },
  },
  'mg-clockwise-radial-wipe': {
    targets: ['scene', 'image'], triggers: ['input'],
    useCases: { ko: ['범위 입력으로 중앙 부채꼴을 시계 방향으로 돌려 낮 도시에서 밤 도시로 전환'], en: ['Turn a central sector clockwise with a range input to transition a city from day to night'] },
    aliases: { ko: ['시계 와이프', '시계 방향 부채꼴 전환'], en: ['clock wipe', 'clockwise sector wipe'] },
  },
  'mg-venetian-blinds-transition': {
    targets: ['scene', 'image'], triggers: ['input'],
    useCases: { ko: ['범위 입력으로 사막의 수평 띠 높이를 함께 줄여 산악 풍경 노출'], en: ['Reveal mountains by shrinking the desert’s horizontal strips together with a range input'] },
    aliases: { ko: ['수평 블라인드 와이프', '수평 띠 전환'], en: ['horizontal blinds wipe', 'horizontal slat transition'] },
  },
} satisfies Record<string, SearchMetadata>;
