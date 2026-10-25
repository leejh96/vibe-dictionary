import { BASE_ADDITIONS } from './additions/base';
import { SIGNATURE_ADDITIONS } from './additions/signature';
import { UI_COLLECTION_ADDITIONS } from './additions/collection-ui';
import { MOTION_COLLECTION_ADDITIONS } from './additions/collection-motion';
import { LAYOUT_COLLECTION_ADDITIONS } from './additions/collection-layout';
import { STYLE_COLLECTION_ADDITIONS } from './additions/collection-style';
import { VIDEO_COLLECTION_ADDITIONS } from './additions/collection-video';
import { SHOWCASE_ADDITIONS } from './additions/showcase';
import { GRAPHIC_STUDIO_ADDITIONS } from './additions/graphic-studio';
import { WORKFLOW_ADDITIONS } from './additions/workflows';
import { PATTERN_ADDITIONS } from './additions/patterns';
import { HOVER_ADDITIONS } from './additions/hover';
import { CARD_ADDITIONS } from './additions/card';
import { MOTION_ADDITIONS } from './additions/motion';
import { TEXT_ADDITIONS } from './additions/text';
import { FEEDBACK_ADDITIONS } from './additions/feedback';
import { LAYOUT_ADDITIONS } from './additions/layout';
import { CONTROL_ADDITIONS } from './additions/control';
import { GRAPHIC_ADDITIONS } from './additions/graphic';
import { SHADER_ADDITIONS } from './additions/shader';
import { PHYSICS_ADDITIONS } from './additions/physics';
import { KINETIC_ADDITIONS } from './additions/kinetic';
import { GRID_ADDITIONS } from './additions/grid';
import { NAV_ADDITIONS } from './additions/nav';
import { PANEL_ADDITIONS } from './additions/panel';
import { MODERN_ADDITIONS } from './additions/modern';
import { CAMERA_ADDITIONS } from './additions/camera';
import { VFX_ADDITIONS } from './additions/vfx';
import { SCROLL_ADDITIONS } from './additions/scroll';
import { TACTILE_ADDITIONS } from './additions/tactile';
import { RETRO_ADDITIONS } from './additions/retro';
import { SCIFI_ADDITIONS } from './additions/scifi';
import { PROMO_ADDITIONS } from './additions/promo';
import { KINETIC_AD_ADDITIONS } from './additions/kinetic_ad';
import { INFOGRAPHIC_ADDITIONS } from './additions/infographic';
import { BROADCAST_ADDITIONS } from './additions/broadcast';

export type DomainType = 'ui' | 'motion' | 'layout' | 'style' | 'video';

export type CategoryType =
  /* 1. UI 하위 카테고리 */
  | 'hover'
  | 'card'
  | 'motion'
  | 'text'
  | 'feedback'
  | 'layout'
  | 'control'
  /* 2. 그래픽 하위 카테고리 */
  | 'graphic'
  | 'shader'
  | 'physics'
  | 'kinetic'
  | 'camera'
  | 'vfx'
  /* 3. 레이아웃 하위 카테고리 */
  | 'grid'
  | 'scroll'
  | 'nav'
  | 'panel'
  /* 4. 스타일 하위 카테고리 */
  | 'modern'
  | 'tactile'
  | 'retro'
  | 'scifi'
  /* 5. 모션 영상 하위 카테고리 */
  | 'promo'
  | 'kinetic_ad'
  | 'infographic'
  | 'broadcast';

interface CategoryMeta {
  id: CategoryType | 'all';
  label: string;
}

const UI_CATEGORIES: CategoryMeta[] = [
  { id: 'all', label: '전체' },
  { id: 'hover', label: '버튼·호버' },
  { id: 'card', label: '카드·3D' },
  { id: 'motion', label: '등장·상태전환' },
  { id: 'text', label: '텍스트·카운터' },
  { id: 'feedback', label: '피드백·알림' },
  { id: 'layout', label: '탭·배너·로더' },
  { id: 'control', label: '슬라이더·토글' },
];

const MOTION_CATEGORIES: CategoryMeta[] = [
  { id: 'all', label: '전체' },
  { id: 'graphic', label: '도형·SVG·모핑' },
  { id: 'shader', label: '배경·파티클·조명' },
  { id: 'physics', label: '물리·모션 원리' },
  { id: 'kinetic', label: '키네틱 타이포' },
  { id: 'camera', label: '공간감·카메라(2.5D)' },
  { id: 'vfx', label: '화면전환·VFX' },
];

const LAYOUT_CATEGORIES: CategoryMeta[] = [
  { id: 'all', label: '전체' },
  { id: 'grid', label: '그리드·카드배치' },
  { id: 'scroll', label: '스크롤·전환구조' },
  { id: 'nav', label: '네비게이션·메뉴' },
  { id: 'panel', label: '패널·보드·데이터뷰' },
];

const STYLE_CATEGORIES: CategoryMeta[] = [
  { id: 'all', label: '전체' },
  { id: 'modern', label: '모던·트렌드' },
  { id: 'tactile', label: '입체·촉각질감' },
  { id: 'retro', label: '레트로·픽셀·CRT' },
  { id: 'scifi', label: 'SF·도면·팝아트' },
];

const VIDEO_CATEGORIES: CategoryMeta[] = [
  { id: 'all', label: '전체' },
  { id: 'promo', label: '런칭·쇼릴·홍보' },
  { id: 'kinetic_ad', label: '타이포·리듬 광고' },
  { id: 'infographic', label: '데이터·차트 모션' },
  { id: 'broadcast', label: '방송·트랜지션·자막' },
];

export const DOMAIN_LABELS: Record<DomainType, string> = {
  ui: 'UI',
  motion: '그래픽',
  layout: '레이아웃',
  style: '스타일',
  video: '모션 영상',
};

export const DOMAIN_CATEGORIES: Record<DomainType, CategoryMeta[]> = {
  ui: UI_CATEGORIES,
  motion: MOTION_CATEGORIES,
  layout: LAYOUT_CATEGORIES,
  style: STYLE_CATEGORIES,
  video: VIDEO_CATEGORIES,
};

export const CATEGORY_LABEL_MAP: Record<string, string> = Object.fromEntries(
  [
    ...UI_CATEGORIES,
    ...MOTION_CATEGORIES,
    ...LAYOUT_CATEGORIES,
    ...STYLE_CATEGORIES,
    ...VIDEO_CATEGORIES,
  ].map((c) => [c.id, c.label])
);

export interface TechniqueItem {
  id: string;
  domain: DomainType;
  category: CategoryType;
  vibeTag: string;
  vibeKeywords: string[];
  titleKo: string;
  titleEn: string;
  summary: string;
  promptSnippet: string;
}

export const TECHNIQUES: TechniqueItem[] = [
  ...SIGNATURE_ADDITIONS,
  ...UI_COLLECTION_ADDITIONS,
  ...MOTION_COLLECTION_ADDITIONS,
  ...LAYOUT_COLLECTION_ADDITIONS,
  ...STYLE_COLLECTION_ADDITIONS,
  ...VIDEO_COLLECTION_ADDITIONS,
  ...WORKFLOW_ADDITIONS,
  ...SHOWCASE_ADDITIONS,
  ...GRAPHIC_STUDIO_ADDITIONS,
  ...PATTERN_ADDITIONS,
  ...TACTILE_ADDITIONS,
  ...RETRO_ADDITIONS,
  ...SCIFI_ADDITIONS,
  ...PROMO_ADDITIONS,
  ...KINETIC_AD_ADDITIONS,
  ...INFOGRAPHIC_ADDITIONS,
  ...BROADCAST_ADDITIONS,
  ...CAMERA_ADDITIONS,
  ...VFX_ADDITIONS,
  ...SCROLL_ADDITIONS,
  ...GRID_ADDITIONS,
  ...NAV_ADDITIONS,
  ...PANEL_ADDITIONS,
  ...MODERN_ADDITIONS,
  ...KINETIC_ADDITIONS,
  ...PHYSICS_ADDITIONS,
  ...SHADER_ADDITIONS,
  ...GRAPHIC_ADDITIONS,
  ...CONTROL_ADDITIONS,
  ...LAYOUT_ADDITIONS,
  ...TEXT_ADDITIONS,
  ...FEEDBACK_ADDITIONS,
  ...MOTION_ADDITIONS,
  ...CARD_ADDITIONS,
  ...HOVER_ADDITIONS,
  ...BASE_ADDITIONS,
];
