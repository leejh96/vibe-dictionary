import type { SearchMetadata } from '../../search-metadata';

export const WORKFLOW_SEARCH_METADATA: Record<string, SearchMetadata> = {
  'billing-cycle-pricing-card': {
    targets: ['card'], triggers: ['click'],
    useCases: { ko: ['구독 서비스의 월간 요금과 연간 할인·청구액을 비교할 때'], en: ['Compare monthly and annual subscription billing with transparent savings'] },
    aliases: { ko: ['요금 비교 카드', '월간 연간 요금', '결제 주기 토글'], en: ['billing cycle pricing', 'monthly yearly pricing', 'pricing toggle'] },
  },
  'faceted-filter-chips': {
    targets: ['list', 'input'], triggers: ['click'],
    useCases: { ko: ['자료 목록에 여러 조건을 조합하고 필터를 개별 해제할 때'], en: ['Combine resource filters and clear conditions individually'] },
    aliases: { ko: ['다중 조건 필터', '필터 칩', '패싯 필터'], en: ['faceted filter chips', 'filter chips', 'faceted search'] },
  },
  'bulk-selection-action-bar': {
    targets: ['list', 'panel'], triggers: ['click', 'input'],
    useCases: { ko: ['문서를 여러 개 선택해 한 번에 보관하고 선택 개수를 알릴 때'], en: ['Select documents and archive them together using a contextual action bar'] },
    aliases: { ko: ['일괄 작업 바', '다중 선택 툴바', '일괄 보관'], en: ['bulk selection action bar', 'bulk actions', 'batch archive toolbar'] },
  },
  'undo-delete-snackbar': {
    targets: ['list', 'panel'], triggers: ['click'],
    useCases: { ko: ['목록에서 실수로 삭제한 마지막 항목을 원래 위치에 복구할 때'], en: ['Undo the last accidental deletion and restore original list order'] },
    aliases: { ko: ['실행 취소 스낵바', '삭제 복구', '되돌리기 알림'], en: ['undo delete snackbar', 'undo snackbar', 'restore deleted item'] },
  },
  'onboarding-progress-checklist': {
    targets: ['card', 'list'], triggers: ['click'],
    useCases: { ko: ['초기 설정 단계를 완료 표시하고 남은 진행 상황을 확인할 때'], en: ['Mark onboarding steps complete and see remaining setup progress'] },
    aliases: { ko: ['온보딩 체크리스트', '시작하기 목록', '설정 진행률'], en: ['onboarding checklist', 'setup checklist', 'getting started checklist'] },
  },
};
