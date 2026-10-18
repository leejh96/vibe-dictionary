import type { SearchMetadata } from '../../search-metadata';

export const MODERN_SEARCH_METADATA = {
  'st-squircle-icon-surface': {
    targets: ['shape', 'image'], triggers: ['static'],
    useCases: { ko: ['네이티브 스쿼클 모서리와 안쪽 테두리로 보라색 앱 아이콘 표면 구성'], en: ['Build a purple app-icon surface with native squircle corners and an inset border'] },
    aliases: { ko: ['슈퍼엘립스 아이콘', '연속 곡률 아이콘'], en: ['superellipse icon', 'continuous-curvature icon'] },
  },
  'st-duotone-tone-map': {
    targets: ['image', 'scene'], triggers: ['static'],
    useCases: { ko: ['구체와 언덕의 흑백 명암을 두 잉크로 매핑해 깊이 유지'], en: ['Map grayscale shading of a sphere and dunes into two inks while preserving depth'] },
    aliases: { ko: ['두 잉크 명암 변환', '듀오톤 그라디언트 맵'], en: ['two-ink tone mapping', 'duotone gradient map'] },
  },
  'st-expressive-connected-group': {
    targets: ['button', 'text'], triggers: ['click'],
    useCases: { ko: ['연결 버튼의 너비·모서리로 정렬 선택을 강조하고 네 줄 미리보기 변경'], en: ['Emphasize alignment selection through connected-button widths and corners while updating a four-line preview'] },
    aliases: { ko: ['형태 변형 정렬 버튼', '익스프레시브 버튼 그룹'], en: ['expressive button group', 'shape-morphing alignment buttons'] },
  },
  'st-die-cut-sticker-collage': {
    targets: ['image', 'shape'], triggers: ['static'],
    useCases: { ko: ['흰 절단 여백을 두른 별·번개·하트를 비대칭으로 겹친 콜라주 구성'], en: ['Compose an asymmetric collage of overlapping star, lightning, and heart stickers with white cut margins'] },
    aliases: { ko: ['흰 윤곽 스티커', '다이컷 콜라주'], en: ['white-outline stickers', 'die-cut collage'] },
  },
  'st-ascii-luminance-art': {
    targets: ['image', 'text', 'shape'], triggers: ['static'],
    useCases: { ko: ['고정 구체의 명암을 ASCII 문자 밀도로 표현하고 원형 윤곽 유지'], en: ['Render fixed sphere shading as ASCII character density while preserving a round silhouette'] },
    aliases: { ko: ['문자 명암 구체', '문자 밀도 아트'], en: ['character-density sphere', 'ASCII shading'] },
  },
  'st-rough-sketch-wireframe': {
    targets: ['image', 'card'], triggers: ['static'],
    useCases: { ko: ['두 벌의 고정 곡선으로 카드와 체크 표시의 손그림 질감 표현'], en: ['Give a card and check mark a hand-drawn texture using two sets of fixed curves'] },
    aliases: { ko: ['이중선 스케치', '손그림 와이어프레임'], en: ['double-line sketch', 'hand-drawn wireframe'] },
  },
  'st-window-shadow-overlay': {
    targets: ['image', 'background', 'scene'], triggers: ['static'],
    useCases: { ko: ['종이와 잎 그림을 가로지르는 확산 창틀 그림자로 공간 분위기 표현'], en: ['Add spatial atmosphere with diffuse window-frame shadows crossing paper and leaf artwork'] },
    aliases: { ko: ['확산 창틀 그림자', '자연광 그림자 오버레이'], en: ['diffuse window shadow', 'ambient window-frame overlay'] },
  },
  'st-serif-negative-space-brand': {
    targets: ['text', 'logo'], triggers: ['static'],
    useCases: { ko: ['세리프 브랜드 단어와 넓은 자간·여백으로 절제된 위계 표현'], en: ['Create restrained hierarchy with a serif brand word, generous tracking and whitespace'] },
    aliases: { ko: ['여백 세리프 워드마크', '네거티브 스페이스 브랜딩'], en: ['whitespace serif wordmark', 'negative-space branding'] },
  },
  'st-connected-truchet-tiles': {
    targets: ['background', 'shape'], triggers: ['static'],
    useCases: { ko: ['사분원 타일을 연결해 고리와 굽은 길의 반복 패턴 구성'], en: ['Build a repeating loop-and-path pattern from connected quarter-circle tiles'] },
    aliases: { ko: ['사분원 연결 타일', '트루셰 곡선 패턴'], en: ['quarter-circle Truchet pattern', 'connected arc tiles'] },
  },
  'st-low-poly-faceted-pear': {
    targets: ['image', 'shape'], triggers: ['static'],
    useCases: { ko: ['공유 꼭짓점과 단색 삼각 면으로 각진 배 일러스트 표현'], en: ['Illustrate an angular pear with shared vertices and solid triangular facets'] },
    aliases: { ko: ['다면 배 일러스트', '삼각면 셰이딩'], en: ['faceted pear illustration', 'triangular flat shading'] },
  },
} satisfies Record<string, SearchMetadata>;
