import type { SearchMetadata } from '../../search-metadata';

export const CARD_SEARCH_METADATA = {
  'selectable-plan-card': {
    targets: ['card', 'input'], triggers: ['input'],
    useCases: { ko: ['네이티브 라디오 카드 두 개 중 하나를 선택해 작업 공간 유형을 표시하기'], en: ['Choose one of two native radio cards to indicate a workspace type'] },
    aliases: { ko: ['라디오 플랜 카드', '단일 선택 카드'], en: ['radio plan cards', 'single-selection cards'] },
  },
  'product-swatch-card': {
    targets: ['card', 'image', 'button'], triggers: ['click'],
    useCases: { ko: ['상품 색상 버튼 선택에 맞춰 헤드폰 색과 현재 색상 이름을 함께 바꾸기'], en: ['Update the headphone color and current color name together when a product swatch is selected'] },
    aliases: { ko: ['제품 컬러 스와치', '색상 변형 선택'], en: ['product color swatches', 'color variant selector'] },
  },
  'lift-shadow-card': {
    targets: ['card'], triggers: ['hover'],
    useCases: { ko: ['호버나 키보드 포커스에서 카드 전체 상승과 넓어진 그림자로 깊이를 표현하기'], en: ['Express depth by lifting the entire card and broadening its shadow on hover or keyboard focus'] },
    aliases: { ko: ['카드 상승 그림자', '호버 고도 카드'], en: ['card hover elevation', 'lift-and-shadow hover'] },
  },
  'hinged-foldout-card': {
    targets: ['card', 'image', 'panel'], triggers: ['click'],
    useCases: { ko: ['여행 앨범 카드를 눌러 접힌 이미지 면을 옆으로 펼치거나 접기'], en: ['Press a travel album card to unfold or close its hinged image panel'] },
    aliases: { ko: ['힌지 펼침 카드', '접힌 이미지 패널'], en: ['hinged foldout', 'folding image panel'] },
  },
  'image-crop-zoom-card': {
    targets: ['card', 'image'], triggers: ['hover'],
    useCases: { ko: ['호버나 키보드 포커스에서 썸네일 창의 크기는 유지하고 풍경만 확대하기'], en: ['Zoom only the landscape on hover or keyboard focus while keeping its thumbnail window fixed'] },
    aliases: { ko: ['잘린 이미지 확대', '고정 프레임 줌'], en: ['clipped image zoom', 'fixed-frame image zoom'] },
  },
  'expandable-detail-card': {
    targets: ['card', 'panel'], triggers: ['click'],
    useCases: { ko: ['네이티브 상세 카드의 제목 행을 눌러 연락처를 공개하거나 접기'], en: ['Press a native detail-card heading to reveal or collapse contact information'] },
    aliases: { ko: ['디테일 공개 카드', '연락처 펼침 카드'], en: ['disclosure card', 'expandable contact card'] },
  },
  'media-action-overlay-card': {
    targets: ['card', 'image', 'button'], triggers: ['hover', 'click'],
    useCases: { ko: ['이미지 카드의 저장·좋아요 조작을 호버나 내부 포커스에서 드러내고 각각 선택하기'], en: ['Reveal save and like controls on image-card hover or internal focus and toggle each independently'] },
    aliases: { ko: ['이미지 호버 액션', '미디어 오버레이 툴바'], en: ['image hover actions', 'media overlay toolbar'] },
  },
  'folder-peek-card': {
    targets: ['card'], triggers: ['hover'],
    useCases: { ko: ['폴더 호버나 키보드 포커스에서 문서가 올라오는 미리보기 표현'], en: ['Preview a folder with documents rising on hover or keyboard focus'] },
    aliases: { ko: ['문서 팬아웃', '폴더 문서 펼치기'], en: ['folder document fanout', 'folder peek preview'] },
  },
  'swipe-action-card': {
    targets: ['card', 'button'], triggers: ['drag', 'click'],
    useCases: { ko: ['카드 앞면을 밀거나 키보드로 열어 뒤쪽 저장 액션을 드러내기'], en: ['Swipe a card front or open it with the keyboard to reveal a save action behind it'] },
    aliases: { ko: ['밀어서 액션 표시', '스와이프 액션 리빌'], en: ['swipe action reveal', 'slide-to-reveal card'] },
  },
  'profile-fanout-card': {
    targets: ['card', 'image'], triggers: ['hover'],
    useCases: { ko: ['호버나 키보드 포커스에서 겹친 팀 아바타를 펼쳐 구성원을 보여 주기'], en: ['Spread overlapping team avatars on hover or keyboard focus to show the members'] },
    aliases: { ko: ['아바타 팬아웃', '펼쳐지는 프로필 묶음'], en: ['avatar fanout', 'expanding avatar group'] },
  },
} satisfies Record<string, SearchMetadata>;
