import type { SearchMetadata } from '../../search-metadata';

export const MOTION_SEARCH_METADATA = {
  'flip-reorder-list': {
    targets: ['list'], triggers: ['click'],
    useCases: { ko: ['버튼으로 목록 첫 항목을 끝으로 순환시키고 FLIP으로 위치 이동을 보여 줄 때'], en: ['Cycle the first list item to the end with a button and show its movement with FLIP.'] },
    aliases: { ko: ['FLIP 재배치', '목록 위치 역보정'], en: ['FLIP layout reorder', 'first last invert play'] },
  },
  'directional-step-transition': {
    targets: ['panel', 'navigation'], triggers: ['click'],
    useCases: { ko: ['이전·다음 버튼으로 구성·스타일·검토 단계를 고정 창 안에서 좌우 전환할 때'], en: ['Use Previous and Next buttons to slide Structure, Style, and Review steps inside a fixed window.'] },
    aliases: { ko: ['방향성 단계 슬라이드', '위저드 패널 이동'], en: ['directional step slide', 'wizard panel transition'] },
  },
  'crossfade-scene-transition': {
    targets: ['card', 'scene'], triggers: ['click'],
    useCases: { ko: ['카드를 눌러 파도와 숲의 두 고정 레이어를 크로스페이드로 교대할 때'], en: ['Press a card to crossfade between two persistent Waves and Forest layers.'] },
    aliases: { ko: ['장면 디졸브', '겹친 레이어 페이드'], en: ['scene dissolve', 'overlapping layer fade'] },
  },
  'blur-focus-reveal': {
    targets: ['panel'], triggers: ['auto', 'click'],
    useCases: { ko: ['새 컬렉션 패널의 흐림을 풀어 등장시키고 버튼으로 처음부터 재생할 때'], en: ['Bring a new-collection panel into focus on entrance and replay from the start with a button.'] },
    aliases: { ko: ['흐림 해제 등장', '블러 투 포커스'], en: ['blur to focus entrance', 'deblur reveal'] },
  },
  'masked-rise-entrance': {
    targets: ['panel'], triggers: ['auto', 'click'],
    useCases: { ko: ['고정된 마스크 안에서 신규 공개 패널이 한 번 올라오고 버튼으로 재생할 때'], en: ['Reveal a new-release panel once inside a fixed mask and replay it with a button.'] },
    aliases: { ko: ['아래에서 올라오는 클립 리빌', '마스크 상승 등장'], en: ['masked slide up entrance', 'clipped rise reveal'] },
  },
  'shared-element-expand': {
    targets: ['card', 'image'], triggers: ['click'],
    useCases: { ko: ['미리보기 카드를 눌러 같은 커버를 확대하고 제목 위치를 연속 전환할 때'], en: ['Press a preview card to continuously expand the same cover and reposition its title.'] },
    aliases: { ko: ['공유 커버 확대', '동일 요소 크기 전환'], en: ['shared cover expansion', 'persistent element resize'] },
  },
  'reflow-side-panel': {
    targets: ['panel', 'navigation'], triggers: ['click'],
    useCases: { ko: ['문서 보기 패널을 열 때 본문 폭을 함께 줄이고 최근·저장 보기를 선택할 때'], en: ['Shrink the main content as its document-view panel opens, then select Recent or Saved.'] },
    aliases: { ko: ['푸시 사이드 패널', '본문 리플로 드로어'], en: ['push side panel', 'reflow drawer'] },
  },
  'transport-icon-morph': {
    targets: ['button', 'shape'], triggers: ['click'],
    useCases: { ko: ['버튼을 눌러 재생 삼각형과 일시정지 막대 사이의 폴리곤 모핑을 시연할 때'], en: ['Demonstrate polygon morphing between a play triangle and pause bars by pressing a button.'] },
    aliases: { ko: ['재생 정지 모핑', '폴리곤 아이콘 보간'], en: ['play pause morph', 'polygon icon interpolation'] },
  },
  'exit-collapse-presence': {
    targets: ['list'], triggers: ['click'],
    useCases: { ko: ['닫은 목록 항목을 퇴장 전환 뒤 제거하고 되돌리기로 복원할 때'], en: ['Remove a dismissed list item after its exit transition and restore it with Undo.'] },
    aliases: { ko: ['퇴장 후 언마운트', '목록 공간 접기'], en: ['exit before unmount', 'collapsing list presence'] },
  },
  'anchored-scale-popover': {
    targets: ['button', 'panel'], triggers: ['click'],
    useCases: { ko: ['정보 버튼을 눌러 기준점에서 확대되는 읽기 전용 안내 창을 열고 닫을 때'], en: ['Open and close a read-only information window that scales from its information button.'] },
    aliases: { ko: ['앵커 확대 팝오버', '기준점 스케일 전환'], en: ['anchored scale popover', 'transform origin popover'] },
  },
} satisfies Record<string, SearchMetadata>;
