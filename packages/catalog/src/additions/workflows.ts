import type { TechniqueItem } from '../techniques';

export const WORKFLOW_ADDITIONS: TechniqueItem[] = [
  {
    id: 'billing-cycle-pricing-card', domain: 'ui', category: 'card',
    titleKo: '월간·연간 요금 비교 카드', titleEn: 'Billing Cycle Pricing Card',
    summary: '결제 주기 버튼을 누르면 월 환산 가격·실제 청구 금액·연간 절약액이 함께 바뀌는 요금 카드',
    vibeTag: '가격과 결제 조건을 한눈에', vibeKeywords: ['요금제', '결제 주기', '연간 할인', '가격 비교 카드'],
    promptSnippet: '지정한 영역에 Studio 요금 카드와 월간·연간 두 버튼을 만들어 줘. 월간을 초기 선택하고 월 $20·매월 $20 청구를 표시해 줘. 연간 선택 시 월 환산 $16·연 $192 청구·연 $48 절약으로 함께 바꿔 줘. 상단에는 연간 20% 절약 배지를 두고 월 환산액과 실제 청구 주기를 구분해 줘. 선택 버튼의 aria-pressed와 밝은 필 배경을 동기화하고 가격은 aria-live polite로 알려 줘. 버튼은 Enter·Space로 작동하며 선택은 자동으로 바뀌지 않아. 데모용 USD 고정 금액이며 실제 결제·가입·환율·세금 계산은 없어. 좁은 카드·한영 문구·라이트/다크 대비와 포커스 윤곽을 지원해 줘.',
  },
  {
    id: 'faceted-filter-chips', domain: 'ui', category: 'control',
    titleKo: '다중 조건 필터 칩', titleEn: 'Faceted Filter Chips',
    summary: '디자인·준비 완료 조건을 조합하면 목록과 결과 개수가 바뀌고 칩 재클릭이나 초기화로 조건을 해제',
    vibeTag: '필요한 조건만 남기는 작은 칩', vibeKeywords: ['필터 칩', '다중 조건', '패싯 검색', '필터 초기화'],
    promptSnippet: '지정한 카드에 자료 목록·결과 개수·디자인과 준비 완료 필터 칩을 만들어 줘. 초기에는 조건 없이 브랜드 기획서(디자인·준비 완료), 사용자 조사(준비 완료), 아이콘 에셋(디자인·초안) 세 행을 보여 줘. 두 필터는 독립 boolean이며 동시에 켜면 AND 조건으로 브랜드 기획서만 남겨 줘. 활성 칩은 색상·테두리·X 아이콘과 aria-pressed로 표시하고 칩 전체 재클릭으로 해당 조건을 해제해 줘. 전체 초기화는 두 조건을 끄고 조건이 없으면 비활성화해 줘. 결과 개수는 aria-live polite로 알리고 행에는 상태 점의 접근성 이름을 제공해 줘. 목록 공간을 유지해 카드가 튀지 않게 하며 버튼은 키보드로 조작 가능하게 해 줘. 로컬 고정 데이터만 사용하며 네트워크 검색·자동 필터 변경은 없어. 양테마와 모바일 폭을 지원해 줘.',
  },
  {
    id: 'bulk-selection-action-bar', domain: 'layout', category: 'panel',
    titleKo: '선택 항목 일괄 작업 바', titleEn: 'Bulk Selection Action Bar',
    summary: '문서를 선택하면 선택 개수와 보관 버튼이 나타나며 일부 선택·전체 선택·작업 후 선택 해제를 연결',
    vibeTag: '선택한 항목에만 나타나는 작업 도구', vibeKeywords: ['일괄 작업', '다중 선택', '선택 액션 바', '일괄 보관'],
    promptSnippet: '지정한 영역에 문서 세 행과 네이티브 체크박스, 전체 선택 체크박스를 만들어 줘. 초기에는 선택이 없으며 일부 선택 시 전체 체크박스의 indeterminate를 설정하고 모두 선택 시 checked를 켜 줘. 하나 이상 선택하면 아래 예약 공간에 선택 개수와 보관 버튼을 가진 액션 바를 opacity 0·translateY(5px)에서 180ms ease-out으로 나타내 줘. 보관은 선택한 행만 로컬 목록에서 제거하고 누적 보관 개수를 알리며 선택을 비워 액션 바를 감춰 줘. 보관 후 전체 선택으로 포커스를 옮기고 빈 목록이면 초기화 버튼으로 옮겨 줘. 선택이 없으면 작업을 차단하고 빈 목록의 전체 선택을 비활성화해 줘. 초기화는 원래 세 행·선택 없음·보관 0으로 복귀해 줘. 서버 보관·영속 저장·자동 선택은 없어. 네이티브 키보드 조작, status 안내, 라이트/다크, 좁은 폭과 모션 감소를 지원해 줘.',
  },
  {
    id: 'undo-delete-snackbar', domain: 'ui', category: 'feedback',
    titleKo: '실행 취소 스낵바', titleEn: 'Undo Delete Snackbar',
    summary: '문서를 삭제하면 실행 취소 액션이 나타나고 마지막으로 삭제한 항목을 원래 순서로 복구',
    vibeTag: '실수한 순간 바로 되돌릴 수 있게', vibeKeywords: ['실행 취소', '삭제 복구', '스낵바', '되돌리기 알림'],
    promptSnippet: '지정한 카드에 브랜드 기획서·사용자 조사·아이콘 에셋 세 행과 각각 삭제 버튼을 만들어 줘. 삭제는 로컬 목록에서 해당 행을 제거하고 카드 아래 예약 공간에 삭제 문서 이름과 실행 취소 버튼을 가진 스낵바를 보여 줘. 스낵바는 180ms ease-out으로 opacity 0·아래 5px에서 등장하며 삭제 후 실행 취소 버튼으로 포커스를 옮겨 줘. 마지막 삭제 ID 하나만 보관하고 다음 삭제가 이전 복구 대상을 대체해 줘. 실행 취소는 그 항목만 원래 순서로 복구하고 스낵바를 닫은 뒤 초기화 버튼에 포커스를 옮겨 줘. 자동 만료 타이머는 없고 초기화는 모든 행과 삭제 기록을 원래대로 돌려 줘. 삭제 안내는 role status로 읽고 버튼 이름에는 문서 이름을 포함해 줘. 실제 파일 삭제·서버 요청·영속 저장은 없어. 키보드·양테마·좁은 폭·모션 감소를 지원해 줘.',
  },
  {
    id: 'onboarding-progress-checklist', domain: 'ui', category: 'layout',
    titleKo: '온보딩 진행 체크리스트', titleEn: 'Onboarding Progress Checklist',
    summary: '시작 단계마다 완료 표시를 토글하면 진행 막대와 완료 개수가 함께 바뀌고 모두 마치면 완료 안내',
    vibeTag: '처음 시작하는 과정을 작은 성취로', vibeKeywords: ['온보딩 체크리스트', '시작 가이드', '설정 진행률', '완료 단계'],
    promptSnippet: '지정한 영역에 시작하기 카드, 완료 개수 배지, 네이티브 progress 막대, 프로필 설정·팀원 초대·첫 프로젝트 세 단계 버튼을 만들어 줘. 초기에는 0/3이며 순서 제한 없이 버튼을 누르면 완료 ID를 추가·제거해 줘. 완료 단계는 숫자 원을 체크 원으로 바꾸고 문구에 취소선을 표시하며 aria-pressed를 맞춰 줘. progress의 max는 3, value는 완료 개수로 두고 채움 너비는 200ms로 전환해 줘. 3/3이면 준비 완료 안내를 표시하고 하나라도 해제하면 단계 선택 안내로 돌아가 줘. 진행 배지와 완료 안내를 접근성 라이브 영역으로 제공하며 자동 진행은 없어. 데모에서 직접 완료 표시만 바꾸며 실제 프로필 변경·초대 발송·프로젝트 생성·영속 저장은 없어. 라이트/다크, 모바일, 키보드 포커스와 모션 감소를 지원해 줘.',
  },
];
