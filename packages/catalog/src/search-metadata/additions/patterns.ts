import type { SearchMetadata } from '../../search-metadata';

export const PATTERN_SEARCH_METADATA: Record<string, SearchMetadata> = {
  'zoom-lightbox-gallery': {
    targets: ['image', 'card'], triggers: ['click', 'drag'],
    useCases: { ko: ['상품 사진이나 포트폴리오 이미지를 크게 보고 넘기거나 확대 이동할 때'], en: ['Browse, enlarge, and pan product or portfolio images inside a viewer'] },
    aliases: { ko: ['라이트박스 갤러리', '사진 확대 뷰어'], en: ['lightbox gallery', 'image viewer', 'zoom pan gallery'] },
  },
  'selection-bubble-toolbar': {
    targets: ['text', 'panel'], triggers: ['drag', 'click'],
    useCases: { ko: ['문서에서 선택한 글자 바로 위에 서식 도구를 표시할 때'], en: ['Show formatting controls directly above selected document text'] },
    aliases: { ko: ['선택 툴바', '버블 메뉴', '플로팅 서식 툴바'], en: ['bubble menu', 'selection toolbar', 'floating formatting toolbar'] },
  },
  'ly-collapsing-scroll-header': {
    targets: ['navigation', 'text'], triggers: ['auto', 'click'],
    useCases: { ko: ['큰 제목이 상단 바로 압축되는 효과를 스크롤바 없이 자동 시뮬레이션할 때'], en: ['Automatically simulate a large title collapsing into a compact top bar without a scrollbar'] },
    aliases: { ko: ['스크롤 압축 헤더', '접히는 상단 바', '큰 제목 축소'], en: ['collapsing app bar', 'shrinking header', 'large title collapse'] },
  },
  'rich-hover-preview': {
    targets: ['card', 'text'], triggers: ['hover', 'click'],
    useCases: { ko: ['작성자 이름에서 이동하기 전에 프로필 정보를 미리 확인할 때'], en: ['Preview an author profile before leaving the current content'] },
    aliases: { ko: ['호버 카드', '프로필 미리보기', '리치 링크 프리뷰'], en: ['hover card', 'profile preview', 'rich link preview'] },
  },
  'inline-edit-field': {
    targets: ['input', 'text'], triggers: ['click', 'input'],
    useCases: { ko: ['프로젝트 이름을 같은 자리에서 편집하고 저장하거나 취소할 때'], en: ['Edit a project name in place with save and cancel actions'] },
    aliases: { ko: ['인라인 편집', '제자리 편집', '즉시 이름 변경'], en: ['inline edit', 'editable text', 'in-place editing'] },
  },
};
