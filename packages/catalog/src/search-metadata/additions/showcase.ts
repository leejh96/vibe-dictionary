import type { SearchMetadata } from '../../search-metadata';

export const SHOWCASE_SEARCH_METADATA: Record<string, SearchMetadata> = {
  'mg-lenticular-strip-poster': {
    targets: ['image', 'shape'], triggers: ['auto', 'click'],
    useCases: { ko: ['브랜드 포스터 두 장을 세로 띠로 교차하며 보여 줄 때'], en: ['Interlace two brand posters using animated vertical strips'] },
    aliases: { ko: ['렌티큘러 포스터', '렌티큘러 스트립', '광학 포스터 전환'], en: ['lenticular strip poster', 'interlaced poster', 'optical print transition'] },
  },
  'st-fluted-glass-panel': {
    targets: ['panel', 'background'], triggers: ['auto', 'click'],
    useCases: { ko: ['브랜드 히어로와 카드 배경에 세로 골 유리 질감을 넣을 때'], en: ['Add ribbed-glass texture to brand heroes and card backgrounds'] },
    aliases: { ko: ['골지 유리 패널', '리드 유리', '세로 골 유리'], en: ['fluted glass panel', 'reeded glass', 'ribbed glass texture'] },
  },
  'polaroid-photo-develop': {
    targets: ['image', 'card'], triggers: ['auto', 'click'],
    useCases: { ko: ['여행 기록이나 추억 카드에서 즉석사진이 나타나는 연출'], en: ['Reveal an instant photograph in travel journals or memory cards'] },
    aliases: { ko: ['폴라로이드 사진 현상', '즉석사진 리빌', '사진 현상 효과'], en: ['polaroid photo development', 'instant photo reveal', 'developing photograph'] },
  },
  'sticker-corner-peel': {
    targets: ['button', 'card'], triggers: ['hover', 'click'],
    useCases: { ko: ['프로모션 스티커와 배지에 종이 모서리를 드는 반응을 넣을 때'], en: ['Add a tactile peeling corner to promotional stickers and badges'] },
    aliases: { ko: ['스티커 모서리 들림', '스티커 접힘', '스티커 필 오프'], en: ['sticker corner peel', 'peeling sticker', 'folded sticker hover'] },
  },
  'accordion-image-gallery': {
    targets: ['image', 'panel'], triggers: ['click'],
    useCases: { ko: ['포트폴리오와 여행 갤러리에서 선택한 이미지를 넓게 강조할 때'], en: ['Expand a selected image in portfolio and travel galleries'] },
    aliases: { ko: ['아코디언 이미지 갤러리', '확장 이미지 패널', '접이식 갤러리'], en: ['accordion image gallery', 'expanding image panels', 'image strip gallery'] },
  },
};
