import type { SearchMetadata } from '../../search-metadata';

export const GRAPHIC_STUDIO_SEARCH_METADATA: Record<string, SearchMetadata> = {
  'mg-halftone-dot-shading': {
    targets: ['shape', 'image', 'background'], triggers: ['auto', 'click'],
    useCases: { ko: ['포스터와 인쇄풍 배경에서 점 크기로 명암을 표현할 때'], en: ['Shade poster artwork and print-inspired backgrounds using dot sizes'] },
    aliases: { ko: ['하프톤 음영', '망점 음영', '점 크기 명암'], en: ['halftone dot shading', 'dot size shading', 'screen tone'] },
  },
  'mg-isometric-voxel-landscape': {
    targets: ['scene', 'shape'], triggers: ['auto', 'click'],
    useCases: { ko: ['게임 소개나 데이터 플랫폼 히어로에 작은 블록 지형을 넣을 때'], en: ['Build a block terrain illustration for game or data platform hero areas'] },
    aliases: { ko: ['아이소메트릭 복셀', '등각 블록 지형', '복셀 풍경'], en: ['isometric voxel landscape', 'voxel terrain', 'isometric block hill'] },
  },
  'mg-ribbon-over-under-weave': {
    targets: ['shape', 'background', 'logo'], triggers: ['auto', 'click'],
    useCases: { ko: ['브랜드 장식과 직물 소개에서 리본이 엮이는 패턴을 보여 줄 때'], en: ['Show interlacing ribbons in brand ornaments and textile presentations'] },
    aliases: { ko: ['교차 리본 직조', '위아래 직조', '리본 짜임'], en: ['over under ribbon weave', 'interlaced ribbons', 'woven ribbon pattern'] },
  },
  'mg-guilloche-curve-engraving': {
    targets: ['shape', 'background'], triggers: ['auto', 'click'],
    useCases: { ko: ['인증서와 패키지에 가는 곡선 장식 문양을 넣을 때'], en: ['Add fine decorative curve engraving to certificates and packaging'] },
    aliases: { ko: ['기요셰 곡선', '길로셰 문양', '인증서 곡선 장식'], en: ['guilloche curve engraving', 'guilloche ornament', 'certificate linework'] },
  },
  'mg-gradient-stroke-ribbon': {
    targets: ['shape', 'logo', 'background'], triggers: ['auto', 'click'],
    useCases: { ko: ['브랜드 히어로와 배너에 부드러운 컬러 리본 오브젝트를 넣을 때'], en: ['Create a colorful ribbon object for brand heroes and banners'] },
    aliases: { ko: ['그라데이션 곡선 리본', '컬러 스트로크', '베지어 리본'], en: ['gradient stroke ribbon', 'color ribbon curve', 'bezier ribbon'] },
  },
};
