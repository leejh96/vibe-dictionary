import type { DomainKnowledge } from '../domain-knowledge';

export const SUBSCRIPTION_KNOWLEDGE: DomainKnowledge[] = [{
  id: 'subscription-plan-entitlement-and-billing',
  aliases: {
    ko: ['구독 서비스', '정기 결제', '요금제 설계', 'SaaS 요금제', '플랜 업그레이드', '무료 체험 해지'],
    en: ['subscription billing', 'recurring billing', 'SaaS pricing plans', 'plan entitlements', 'free trial and cancellation'],
  },
  useCases: {
    ko: ['무료·유료 요금제와 정기 결제가 있는 SaaS를 만들 때', '플랜별 기능 권한과 사용 한도(Quota)를 구분할 때', '월간·연간 주기 변경이나 업그레이드·다운그레이드 시점을 정할 때', '무료 체험 종료·결제 실패 유예·해지 예약 후 접근 범위를 설계할 때'],
    en: ['Building a SaaS product with free and paid recurring plans', 'Separating plan feature entitlements and usage quotas', 'Defining billing-cycle changes, upgrades and downgrades', 'Designing trial expiration, payment-failure grace periods and cancel-at-period-end access'],
  },
  keywords: {
    ko: ['구독', '요금제', '플랜', '정기 결제', '결제 주기', '무료 체험', '체험판', '업그레이드', '다운그레이드', '일할 계산', '플랜 권한', '사용 한도', '해지 예약', '유예 기간'],
    en: ['subscription', 'pricing', 'plan', 'tier', 'recurring billing', 'billing cycle', 'free trial', 'upgrade', 'downgrade', 'proration', 'entitlement', 'quota', 'cancel at period end', 'grace period'],
  },
  text: {
    ko: {
      domain: '구독·요금제',
      title: '요금제 권한·결제 주기 변경과 해지·유예 상태',
      summary: '요금제 이름과 실제 기능 권한을 분리하고, 체험·갱신·플랜 변경·결제 실패·해지 예약을 연결합니다.',
      overview: '구독 서비스에서는 현재 결제 상태와 실제로 쓸 수 있는 기능 권한이 항상 1:1로 같지 않습니다. 무료 체험 중인지, 해지를 신청했지만 남은 이용 기간이 있는지, 갱신 결제가 실패해 유예 기간 중인지에 따라 접근 범위와 안내가 달라져야 합니다. 아래 내용은 구독·요금제 흐름을 설계하기 위한 참고이며 특정 서비스의 가격이나 요금·과금 정책을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '요금제(Plan)와 기능 권한(Entitlement)', description: '요금제 이름만 비교하지 않고 해당 플랜이 허용하는 기능 목록, 좌석 수, 월간 사용 한도를 별도 권한 기준으로 정의합니다.' },
        { name: '구독 생명주기 상태', description: '무료 체험·정상 이용·갱신 결제 실패(유예)·해지 예약(기간 만료 대기)·만료됨을 구분합니다. 해지 신청 직후 즉시 차단할지 결제 주기 끝까지 유지할지 정해야 합니다.' },
        { name: '업그레이드·다운그레이드와 적용 시점', description: '상위 플랜 변경은 즉시 적용하고 차액을 정산할지, 하위 플랜 변경은 다음 결제 주기부터 적용할지 구분합니다.' },
        { name: '한도 초과 시 데이터 보존과 제한', description: '하위 플랜으로 내려가거나 무료 체험이 끝났을 때 기존에 만든 데이터나 초대한 팀원을 삭제하지 않고 읽기 전용·추가 생성 제한 중 어떻게 다룰지 정합니다.' },
        { name: '갱신 실패와 결제 수단 복구', description: '정기 결제가 실패했을 때 즉시 기능을 잠그지 않고 재시도와 결제 수단 변경을 안내하는 유예 기간(Grace period) 정책을 정합니다.' },
      ],
      workflow: [
        { name: '플랜 비교와 결제 주기 조건 제시하기', description: '월간·연간 청구 금액, 무료 체험 기간, 포함 기능과 사용 한도를 구분해 가입·변경 전에 명확히 보여 줍니다.' },
        { name: '플랜 변경 시 권한과 청구 시점 맞추기', description: '업그레이드·다운그레이드가 즉시 반영되는지 다음 주기에 반영되는지 안내하고, 예정된 변경 사항을 구독 관리 화면에 표시합니다.' },
        { name: '한도 도달과 갱신 실패에 대응하기', description: '사용량이 한도에 가까워지거나 정기 결제가 실패하면 차단되는 행동과 유지되는 데이터를 구분해 복구 경로를 안내합니다.' },
        { name: '해지 예약과 재구독 연결하기', description: '해지 신청 시 남은 이용 가능 일자를 알리고, 만료 전 해지 취소나 만료 후 기존 데이터를 유지한 재구독 흐름을 연결합니다.' },
      ],
      pitfalls: [
        { name: '해지 신청을 즉시 계정 정지나 데이터 삭제로 처리하기', description: '이미 결제한 남은 기간이 있는데 해지 버튼 즉시 접근을 막으면 분쟁이 생깁니다. 해지 예약 상태와 최종 만료 시점을 구분하세요.' },
        { name: '다운그레이드 시 기존 데이터가 한도를 넘는 상황을 누락하기', description: '프로 플랜에서 문서를 50개 만든 뒤 무료 한도 10개 플랜으로 내려갈 때 기존 40개가 어떻게 보이는지 규칙이 없으면 화면과 저장소가 어긋납니다.' },
        { name: '화면의 요금제 배지만 바꾸고 실제 권한 검사를 생략하기', description: '클라이언트에서 플랜 이름만 바꿔도 실제 기능 호출과 사용량 한도는 서버·데이터 계층에서 검증해야 합니다.' },
      ],
      questions: [
        '어떤 요금제가 있으며, 각 플랜에서 달라지는 기능 권한·좌석 수·사용량 한도는 무엇인가요?',
        '무료 체험을 제공하나요? 체험 시작 시 결제 수단 등록이 필요한가요, 종료 시 자동 전환되나요?',
        '월간·연간 변경이나 업그레이드·다운그레이드는 언제 적용되며, 남은 기간 금액은 일할 계산하나요?',
        '다운그레이드나 만료로 기존 데이터·팀원 수가 새 한도를 초과하면 열람·편집·추가 생성 중 무엇을 제한하나요?',
        '정기 결제가 실패하면 재시도와 유예 기간을 얼마나 두며, 그사이 어떤 기능을 유지하거나 제한하나요?',
        '해지 신청 시 남은 결제 주기 끝까지 이용을 유지하나요? 만료 전 해지 철회나 재구독 시 데이터는 어떻게 복원되나요?',
      ],
      example: '예시: 협업 도구에서 무료 플랜은 프로젝트 3개까지 생성할 수 있고, 프로 플랜에서 무료로 다운그레이드하면 다음 결제 주기부터 추가 생성만 막고 기존 프로젝트 열람은 유지하도록 정할 수 있습니다. 실제 일할 계산·유예 기간·데이터 보관 정책은 서비스 과금 규칙에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'billing-cycle-pricing-card', reason: '월간·연간 결제 주기 전환에 따라 월 환산 요금과 실제 청구 금액·절약액을 함께 표시하는 표현에 참고할 수 있습니다. 실제 정기 결제나 일할 계산은 구현하지 않습니다.' },
        { id: 'ly-transposable-comparison-matrix', reason: '요금제별 포함 기능과 제한 차이를 행·열 비교표로 보여 주는 표현에 참고할 수 있습니다. 실제 플랜 권한 검사는 별도로 구현해야 합니다.' },
      ],
      promptSnippet: '구독·요금제(SaaS) 서비스의 플랜 권한·주기 변경·해지·유예 흐름을 설계해 줘. 먼저 요금제별 기능 권한과 사용 한도, 무료 체험 조건, 업그레이드·다운그레이드 적용 시점과 정산 방식, 결제 실패 유예 기간, 해지 예약 및 한도 초과 데이터 처리 정책을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 요금제 및 구독 상태별 허용 기능·사용 한도와 제한 동작.\n2. 체험·정상 이용·변경 예약·결제 실패(유예)·해지 예약·만료 상태의 전환 조건.\n3. 플랜 변경·주기 전환 시 적용 시점과 기존 초과 데이터·좌석의 처리 방식.\n4. 갱신 결제 실패·한도 도달·중복 변경 요청 시 사용자 안내와 복구 경로.\n5. 요금제 비교·구독 관리·사용량 표시·결제 수단 복구·해지 확인 화면의 연결.\n해지 신청을 즉시 차단이나 데이터 삭제로 단정하지 말고, 예시 정책과 디자인 데모를 실제 과금·권한 검증 기능으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Subscription & Billing',
      title: 'Plan entitlements, billing-cycle changes and cancellation or grace states',
      summary: 'Separate plan names from actual feature entitlements, and connect trials, renewals, plan changes, grace periods and scheduled cancellations.',
      overview: 'In a subscription service, billing status and active feature access are not a single boolean. Access and messaging differ across free trials, active subscriptions, scheduled cancellations with remaining paid time, and past-due grace periods. These concepts are design references for subscription flows, not default pricing, proration or retention rules for a specific product.',
      concepts: [
        { name: 'Plans versus entitlements and quotas', description: 'Define the features, seat counts and usage quotas granted by a plan separately from the display name or price.' },
        { name: 'Subscription lifecycle states', description: 'Distinguish trialing, active, past-due (grace period), cancel-at-period-end and expired states. Decide whether cancellation revokes access immediately or at period end.' },
        { name: 'Upgrades, downgrades and effective timing', description: 'Clarify whether upgrades take effect immediately with proration while downgrades or cycle switches apply at the next renewal.' },
        { name: 'Over-quota handling on downgrade or expiry', description: 'When a downgrade or trial end leaves existing items or seats above the new limit, decide what stays read-only versus blocked for new creation.' },
        { name: 'Renewal failures and payment recovery', description: 'Define a grace period and retry flow when recurring charges fail so users can update payment methods before losing access.' },
      ],
      workflow: [
        { name: 'Present plan comparisons and billing terms', description: 'Clearly distinguish monthly versus annual billing totals, trial rules, included features and usage quotas before signup or plan changes.' },
        { name: 'Align plan changes with entitlement timing', description: 'Explain whether an upgrade or downgrade applies now or at next renewal, and show pending scheduled changes in billing settings.' },
        { name: 'Handle quota limits and past-due renewals', description: 'When usage nears a quota or a renewal charge fails, separate restricted actions from preserved data and provide a clear recovery action.' },
        { name: 'Connect scheduled cancellation and reactivation', description: 'Show the exact end date when canceling at period end, and allow undoing a pending cancellation or reactivating later with preserved data.' },
      ],
      pitfalls: [
        { name: 'Treating cancellation requests as immediate lockouts or deletion', description: 'Revoking access immediately when a user has paid time remaining causes confusion. Separate cancel-at-period-end from final expiration.' },
        { name: 'Ignoring existing data that exceeds a lower tier’s limit', description: 'If a user created 50 items on Pro and moves to a 10-item Free tier, define how the existing 50 items behave in both UI and storage.' },
        { name: 'Updating only UI plan badges without enforcing entitlements', description: 'Switching plan labels on screen does not enforce feature access or usage quotas; connect checks to actual data and service operations.' },
      ],
      questions: [
        'Which plans exist, and which feature entitlements, seat limits and usage quotas differ across tiers?',
        'Is a free trial offered, does it require a payment method upfront, and does it auto-convert or expire quietly?',
        'When do monthly/annual switches, upgrades and downgrades take effect, and how is proration handled?',
        'If a downgrade or expiry leaves existing data or members above the new limit, which actions remain allowed?',
        'When a renewal payment fails, how long is the grace period and which features remain available during recovery?',
        'Does canceling keep access until the end of the billing period, and can users withdraw a pending cancellation or reactivate later?',
      ],
      example: 'Example: a workspace app could allow 3 projects on Free, apply upgrades to Pro immediately, and apply downgrades at period end by keeping existing projects readable while blocking new project creation until usage drops below 3. Confirm actual proration, grace-period and retention policies before adopting this setup.',
      relatedDesigns: [
        { id: 'billing-cycle-pricing-card', reason: 'A reference for toggling monthly and annual billing cycles while distinguishing per-month rate, billed total and annual savings. It does not implement billing or proration.' },
        { id: 'ly-transposable-comparison-matrix', reason: 'A reference for comparing included features across plans in a table. Real entitlement enforcement needs separate implementation.' },
      ],
      promptSnippet: 'Help design a subscription and pricing workflow. First confirm tier entitlements and quotas, free-trial terms, upgrade/downgrade timing and proration, payment-failure grace periods, cancel-at-period-end behavior and over-quota data rules. Do not assume undecided rules.\nBased on the answers, describe:\n1. Allowed features, quotas and restricted actions for each tier and subscription state.\n2. Transitions across trialing, active, scheduled-change, past-due, cancel-at-period-end and expired states.\n3. Effective timing for plan or cycle changes and handling of existing data or seats above a lower limit.\n4. User guidance and recovery paths for failed renewals, quota exhaustion and duplicate change requests.\n5. How plan comparison, billing management, quota indicators, payment recovery and cancellation confirmation screens connect.\nDo not assume cancellation deletes data or revokes paid time immediately, and do not mistake example policies or design demos for real billing or entitlement checks.',
    },
  },
  sources: [
    { title: 'Stripe Docs — How subscriptions work', url: 'https://docs.stripe.com/billing/subscriptions/overview' },
    { title: 'Stripe Docs — Prorations for upgrades and downgrades', url: 'https://docs.stripe.com/billing/subscriptions/prorations' },
  ],
}, {
  id: 'subscription-seat-license-and-member-change',
  aliases: {
    ko: ['팀 좌석 라이선스 과금', '시트 추가 및 중도 일할 청구', '구성원 비활성화와 좌석 회수', '유료 편집자와 무료 열람자 역할', '대기 중인 초대와 좌석 차감'],
    en: ['per-seat subscription billing', 'seat addition and mid-cycle proration', 'member deactivation and seat reuse', 'billable vs free viewer roles', 'pending invite seat reservation'],
  },
  useCases: {
    ko: ['팀원 수(Seat)에 따라 요금이 달라지는 협업 SaaS 요금제를 만들 때', '유료 좌석을 쓰는 역할(편집자·관리자)과 무료 열람자·게스트 역할을 구분할 때', '결제 주기 중 좌석을 늘릴 때의 즉시 일할 청구와 좌석을 줄일 때의 다음 주기 반영을 정할 때', '퇴사·비활성화 구성원의 좌석을 다른 초대자에게 재배정하고 기존 작업물을 보존할 때'],
    en: ['Building per-seat team billing where price scales with licensed members', 'Distinguishing billable editor/admin seats from free viewer or guest roles', 'Handling mid-cycle seat increases with proration versus next-cycle seat reductions', 'Reassigning freed seats from deactivated members while preserving their created work'],
  },
  keywords: {
    ko: ['좌석 과금', '시트 라이선스', '팀원 초대', '유료 역할', '무료 열람자', '좌석 증감', '일할 청구', '구성원 비활성화', '좌석 재배정'],
    en: ['seat license', 'per-seat billing', 'member invite', 'billable role', 'free viewer', 'seat reduction', 'mid-cycle proration', 'deactivated member', 'seat reassignment'],
  },
  text: {
    ko: {
      domain: '구독·요금제',
      title: '팀 좌석(Seat) 라이선스 증감·비활성 구성원 전환과 중도 일할 청구',
      summary: '과금 대상 역할과 초대 대기·비활성 구성원의 좌석 점유를 정의하고, 중도 좌석 추가·축소 정산을 연결합니다.',
      overview: '팀 단위 구독에서는 단순히 가입된 계정 수를 세는 것만으로 요금을 계산할 수 없습니다. 유료 좌석을 쓰는 편집자와 무료 열람자를 구분해야 하고, 아직 수락하지 않은 초대장이 좌석을 점유하는지, 결제 주기 중간에 팀원이 퇴사했을 때 남은 기간 그 빈 좌석에 새 팀원을 추가 요금 없이 앉힐 수 있는지 명확해야 합니다. 아래 내용은 좌석 기반 과금 설계를 위한 참고이며 특정 서비스의 단가나 정산 주기를 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '과금 좌석 역할(Billable Seat)과 무료 역할 분리', description: '유료 시트를 차감하는 관리자·편집자 역할과 무료로 참여하는 뷰어·외부 게스트 역할을 구분하고, 역할 승격 시 좌석 증감 조건을 정의합니다.' },
        { name: '구매 좌석 수(Purchased Seats)와 사용 중·빈 좌석', description: '약정해 결제한 총 구매 좌석 수와 현재 배정된 좌석, 비활성화로 비어 있는 여유 좌석을 분리해 빈 좌석이 있으면 추가 결제 없이 새 구성원을 배정합니다.' },
        { name: '초대 대기(Pending Invite)의 좌석 선점 시점', description: '초대 발송 시점에 좌석을 미리 잡아 두어 초과 초대를 막을지, 초대 수락 시점에 좌석을 차감하거나 자동 증설할지 정합니다.' },
        { name: '중도 좌석 추가(일할 청구)와 좌석 축소(다음 주기 반영)', description: '결제 주기 중 구매 좌석을 늘릴 때는 남은 일수만큼 일할 계산해 청구하고, 좌석 수를 줄이는 신청은 다음 갱신일부터 반영하는 규칙을 구분합니다.' },
      ],
      workflow: [
        { name: '현재 구매 좌석·배정 현황과 역할별 과금 안내하기', description: '팀 관리 화면에서 총 구매 좌석, 사용 중 좌석, 초대 대기 수, 남은 빈 좌석과 유료 역할 전환 시 추가 예상 금액을 보여 줍니다.' },
        { name: '구성원 초대·역할 변경과 빈 좌석 배정 연결하기', description: '남은 빈 좌석이 있으면 즉시 배정하고, 구매 좌석을 초과해 유료 역할을 부여할 때는 일할 추가 요금을 안내하고 승인받습니다.' },
        { name: '구성원 비활성화 시 작업물 보존과 좌석 회수하기', description: '퇴사하거나 제외된 구성원의 계정은 비활성화해 좌석 점유만 즉시 풀고, 그 사람이 만든 문서·기록의 소유권은 유지하거나 이관합니다.' },
        { name: '다음 주기 좌석 수 축소 예약과 갱신 반영하기', description: '관리자가 구매 좌석 감소를 예약하면 다음 결제일 전까지 실제 사용 좌석 수가 목표 이하인지 확인하고 갱신 시 축소된 좌석 수로 청구합니다.' },
      ],
      pitfalls: [
        { name: '주기 중 팀원 1명을 빼고 1명을 새로 넣었는데 좌석을 중복 청구하기', description: '이미 이번 달 요금을 낸 좌석에서 기존 인원을 비활성화했다면, 그 빈 좌석에는 추가 과금 없이 새 인원을 배정할 수 있어야 합니다.' },
        { name: '비활성화한 구성원이 만든 데이터까지 함께 삭제해 버리기', description: '좌석을 회수하려고 구성원을 정리했을 때 그 사람이 만든 공유 폴더나 작업 이력이 사라지면 팀 업무가 중단됩니다. 계정 비활성화와 데이터 삭제를 분리하세요.' },
        { name: '아무 안내 없이 뷰어가 편집 동작을 누른 순간 유료 좌석으로 자동 결제하기', description: '누가 유료 좌석 추가를 승인할 수 있는지(관리자 승인 vs 자동 증설) 정하고 과금 발생 사실을 명확히 확인받으세요.' },
      ],
      questions: [
        '모든 팀원이 유료 좌석을 쓰나요, 아니면 유료 역할(편집자 등)과 무료 역할(뷰어·게스트)이 나뉘나요?',
        '팀원 초대를 보낼 때 바로 좌석을 선점하나요, 초대받은 사람이 수락할 때 좌석을 차감하나요?',
        '결제 주기 중간에 구성원을 비활성화하면 그 빈 좌석을 남은 기간 다른 신규 구성원에게 무료로 재배정할 수 있나요?',
        '주기 중 유료 좌석을 추가할 때는 즉시 일할 계산해 청구하고, 구매 좌석 수를 줄일 때는 다음 결제 주기부터 반영하나요?',
        '무료 역할 사용자가 유료 기능을 쓰려 할 때 관리자에게 승인을 요청하나요, 자동으로 좌석이 추가되나요?',
      ],
      example: '예시: 팀 플랜에서 편집자만 유료 좌석을 차감하고 뷰어는 무료로 두며, 결제 주기 중 유료 좌석 초과 초대 시에는 남은 일수만큼 일할 계산해 즉시 청구하고, 기존 편집자를 비활성화하면 작성 문서는 보존한 채 빈 좌석으로 돌려 새 팀원에게 추가 비용 없이 배정하도록 구성할 수 있습니다. 이는 참고 예시이며 실제 좌석 과금 정책은 별도로 확정해야 합니다.',
      relatedDesigns: [
        { id: 'ly-sortable-data-table', reason: '팀 구성원 목록을 역할(유료/무료)·상태(활성/초대 대기/비활성)·최근 활동순으로 정렬해 좌석 배정을 관리하는 표현에 참고할 수 있습니다. 실제 좌석 정산과 권한 변경은 별도로 구현해야 합니다.' },
        { id: 'bulk-selection-action-bar', reason: '여러 구성원을 선택해 역할을 무료 뷰어로 전환하거나 비활성화해 좌석을 회수하는 일괄 작업 표현에 참고할 수 있습니다. 실제 과금 반영은 포함하지 않습니다.' },
      ],
      promptSnippet: '구독·요금제 서비스의 팀 좌석(Seat) 라이선스 증감·비활성 구성원 전환 및 중도 일할 청구 흐름을 설계해 줘. 먼저 유료 좌석 역할과 무료 역할 구분, 초대 발송 vs 수락 시점의 좌석 차감 기준, 비활성 구성원의 좌석 회수·재배정과 작업물 보존, 중도 좌석 추가(일할 청구) 및 좌석 축소(다음 주기 반영) 정책을 질문하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 구매 좌석 수, 배정 좌석(활성/초대 대기), 빈 좌석의 관계와 역할별 과금 기준.\n2. 구성원 초대·역할 승격·비활성화·재배정 시 좌석 수 변화와 추가 과금 발생 조건.\n3. 중도 좌석 증설 시 일할 계산 방식과 좌석 축소 예약 시 다음 갱신일 검증 규칙.\n4. 비활성 구성원의 기존 생성 데이터 보존/소유권 이관과 동시 초대 시 좌석 초과 처리.\n5. 좌석 현황 요약·팀원 관리 테이블·좌석 증감 및 일할 청구 확인 모달 화면과 디자인 선택 이유.\n구성원 비활성화를 데이터 삭제로 처리하거나 빈 좌석 재배정에 중복 과금하지 말고, 디자인 데모와 실제 좌석 과금 원장 시스템을 구분해 줘.',
    },
    en: {
      domain: 'Subscription & Billing',
      title: 'Team seat licensing, member deactivation and mid-cycle proration',
      summary: 'Separate billable roles from free viewers, manage empty paid seats on member deactivation, and connect mid-cycle proration.',
      overview: 'Per-seat team billing requires more than counting user rows in a workspace. A billing design must distinguish billable roles (such as editors or admins) from free viewers, clarify whether pending invitations consume a seat, allow deactivated members’ already-paid seats to be reassigned without paying twice in the same cycle, and preserve a departed member’s work. The concepts below are design references, not default seat-pricing rules.',
      concepts: [
        { name: 'Billable roles versus non-billable roles', description: 'Define which workspace roles consume a paid seat license (such as Admin or Editor) and which roles are free (such as Viewer or Billing Manager).' },
        { name: 'Purchased seats versus assigned and open seats', description: 'Track contracted seat quantity separately from currently assigned seats so deactivating a member leaves an open paid seat that can be reassigned for the rest of the cycle.' },
        { name: 'Pending invitation seat reservation', description: 'Decide whether sending an invitation reserves an open seat immediately or if seats are consumed/expanded only when the invitee accepts.' },
        { name: 'Mid-cycle seat expansion proration and renewal-time reduction', description: 'Clarify whether adding seats beyond the purchased count triggers an immediate prorated charge while reducing contracted seats takes effect at the next renewal.' },
      ],
      workflow: [
        { name: 'Display purchased, assigned, pending and available seats', description: 'Show workspace admins a clear breakdown of total paid seats, active billable members, pending invites and open seats before any role change.' },
        { name: 'Fill open seats first and confirm prorated additions', description: 'Assign new or promoted billable members to existing open seats at no extra cost, and show the prorated charge before expanding total purchased seats.' },
        { name: 'Deactivate members while preserving their created assets', description: 'When a member leaves, deactivate their account to free their seat immediately while keeping or transferring ownership of their projects and files.' },
        { name: 'Schedule seat reductions for the next billing renewal', description: 'Let admins reduce contracted seats down to current active usage and apply the lower seat count on the next billing cycle.' },
      ],
      pitfalls: [
        { name: 'Charging for a new seat when replacing a departed member mid-cycle', description: 'If a team paid for 10 seats, deactivated 1 member and invited 1 replacement, billing for an 11th seat double-charges for the same slot.' },
        { name: 'Deleting shared workspace data when freeing a deactivated member’s seat', description: 'Revoking a member’s seat must not wipe shared documents or history they created for the team. Separate seat deactivation from content deletion.' },
        { name: 'Silently auto-upgrading viewers to paid seats without admin awareness', description: 'Specify whether viewers must request an editor upgrade from an admin or if self-upgrade is explicitly enabled with billing notice.' },
      ],
      questions: [
        'Which roles consume a paid seat, and are there free viewer, guest or billing-only roles?',
        'Does a pending invitation reserve a seat when sent, or is a seat consumed only when the invitation is accepted?',
        'When a billable member is deactivated mid-cycle, can their open paid seat be reassigned to another member at no extra cost?',
        'How are mid-cycle seat increases billed (immediate proration or end-of-month true-up), and when do seat reductions take effect?',
        'When a viewer needs paid editor access, does that require admin approval or automatically add a seat?',
      ],
      example: 'Example: a workspace could charge only for Admin and Editor seats while keeping Viewers free, fill any open paid seat before adding new seats, charge a prorated amount immediately when expanding beyond purchased seats, apply seat reductions at the next renewal, and keep deactivated members’ files intact under workspace ownership. This is a reference example, not an established policy.',
      relatedDesigns: [
        { id: 'ly-sortable-data-table', reason: 'A reference for sorting workspace members by role (billable vs free), status (active, pending invite, deactivated) and last activity. Real seat accounting and billing calls need separate implementation.' },
        { id: 'bulk-selection-action-bar', reason: 'A reference for selecting multiple members to downgrade roles or deactivate accounts in bulk. Real license updates are not included.' },
      ],
      promptSnippet: 'Help design a team seat licensing, member deactivation and mid-cycle proration workflow. First ask about billable versus free roles, seat consumption on invite send versus acceptance, seat reuse and content preservation when deactivating members, and mid-cycle seat increase proration versus renewal-time seat reduction rules. Do not assume undecided rules.\nBased on the answers, describe:\n1. Relationship between purchased seats, active assigned seats, pending invites and open seats.\n2. Seat changes and billing impact across invitations, role promotions, role downgrades and member deactivation.\n3. Proration calculation for mid-cycle seat expansion and validation for scheduled seat reductions at renewal.\n4. Preservation or ownership transfer of work created by deactivated members and handling of concurrent invites.\n5. Seat usage summary bar, member management table and seat expansion confirmation UI with reasons for the design choices.\nDo not double-charge when reassigning an already-paid seat or delete team content on member deactivation, and distinguish design demos from a real seat-billing system.',
    },
  },
  sources: [
    { title: 'Stripe Docs — Per-seat subscriptions and quantity changes', url: 'https://docs.stripe.com/billing/subscriptions/per-seat' },
    { title: 'Slack Help Center — Fair Billing Policy and active seat management', url: 'https://slack.com/help/articles/218915077-Slacks-Fair-Billing-Policy' },
  ],
}, {
  id: 'subscription-usage-metering-and-overage',
  aliases: {
    ko: ['사용량 기반 종량제 과금', '포함 크레딧 차감과 이월', '사용량 임계치 알림', '초과 요금 상한선 설정', '집계 지연과 멱등 기록'],
    en: ['usage-based metered billing', 'included credit drawdown and rollover', 'usage threshold alerts', 'hard and soft spend caps', 'idempotent usage ingestion'],
  },
  useCases: {
    ko: ['기본 구독료에 포함된 무료 사용량(크레딧)과 초과 종량 과금(Overage)을 결합할 때', '사용량 80%·100% 도달 시 알림과 초과 시 자동 과금 vs 기능 차단(Hard Cap)을 정할 때', '선불 충전 크레딧과 월간 기본 제공 크레딧의 차감 우선순위 및 소멸·이월을 다룰 때', '집계 지연 시간을 안내하고 중복 이벤트로 사용량이 두 번 찍히지 않게 설계할 때'],
    en: ['Combining a base subscription allowance with pay-as-you-go overage billing', 'Configuring threshold alerts (such as 80% and 100%) and choosing between overage charges or hard caps', 'Ordering drawdown across monthly included credits and prepaid top-up credits with expiration/rollover rules', 'Communicating usage aggregation lag and preventing duplicate metering events'],
  },
  keywords: {
    ko: ['종량제 과금', '사용량 집계', '초과 요금', '크레딧 차감', '사용 한도 알림', '지출 상한선', '크레딧 이월', '선불 충전', '멱등 키'],
    en: ['metered billing', 'usage aggregation', 'overage charge', 'credit drawdown', 'threshold alert', 'spend cap', 'credit rollover', 'prepaid top-up', 'idempotency key'],
  },
  text: {
    ko: {
      domain: '구독·요금제',
      title: '사용량 기반 과금(Metered)·크레딧 차감·한도 알림과 초과 요금 제어',
      summary: '기본 제공량·충전 크레딧의 차감 순서와 이월 여부를 정하고, 임계치 알림 및 초과 상한(Hard/Soft Cap)을 연결합니다.',
      overview: 'API 호출 수, 생성 토큰, 저장 용량처럼 쓴 만큼 요금이 달라지는 종량제(Metered) 결합 구독에서는 예상치 못한 요금 폭탄을 막는 장치가 핵심입니다. 월간 기본 제공량과 별도 구매한 충전 크레딧 중 무엇이 먼저 깎이는지, 한도를 넘었을 때 서비스를 멈출지(Hard cap) 초과 요금을 부과할지(Soft cap), 화면의 사용량 수치가 몇 분 전 기준인지 명확히 보여 주어야 합니다. 아래 내용은 사용량 기반 과금 설계를 위한 참고이며 특정 서비스의 단가나 한도를 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '집계 기준(합계·최댓값·고유 수)과 멱등성', description: '건당 누적 합계(Sum), 기간 내 최대치(Peak), 활성 리소스 수 중 어떤 기준으로 측정할지 정의하고, 재시도 요청이 중복 과금되지 않도록 고유 식별자로 멱등 처리합니다.' },
        { name: '크레딧 종류별 차감 순서와 만료·이월', description: '매달 초기화되는 플랜 기본 크레딧, 프로모션 무상 크레딧, 유료 충전 크레딧 중 만료일이 빠른 것부터 먼저 차감하고 미사용분 이월(Rollover) 여부를 정합니다.' },
        { name: '임계치 알림과 초과 제어(Hard Cap vs Overage)', description: '기본 제공량의 80%·100% 도달 시 알림을 보내고, 100% 초과 시 기능을 즉시 멈추는 하드 캡과 설정한 월 지출 상한선(Spend limit)까지 종량 과금하는 방식을 구분합니다.' },
        { name: '집계 반영 지연(Lag)과 청구 마감 정산', description: '실시간 추정 사용량과 최종 청구서 확정 사용량 사이의 집계 지연 시간을 표시하고, 결제 주기 마감 시점의 사용량 원장을 기준으로 청구서를 발행합니다.' },
      ],
      workflow: [
        { name: '현재 주기 사용량·남은 크레딧·집계 기준 시각 표시하기', description: '기본 제공량 대비 사용률, 유료 충전 잔액, 현재 누적 초과 요금과 "마지막 집계 시각"을 대시보드에 함께 보여 줍니다.' },
        { name: '만료 임박 순으로 크레딧 차감하고 임계치 알림 보내기', description: '소멸 예정인 월간 기본 제공량을 먼저 차감하고, 약정된 비율(예: 80%, 100%) 도달 시 중복 없이 경고 알림을 발송합니다.' },
        { name: '한도 도달 시 초과 과금 또는 상한 차단 적용하기', description: '설정한 월 지출 상한선에 도달하면 추가 호출을 차단하고 상한선 상향 또는 크레딧 충전 경로를 안내합니다.' },
        { name: '주기 종료 시 초과 사용량 정산 및 초기화하기', description: '결제 주기 마감 후 지연 도착한 이벤트까지 마감 시간 기준으로 합산해 초과 요금을 청구하고 새 주기 기본 제공량을 부여합니다.' },
      ],
      pitfalls: [
        { name: '유료 충전 크레딧을 먼저 깎고 당월 소멸 크레딧을 남겨 날리기', description: '이번 달 말에 사라지는 기본 제공량보다 이월 가능한 유료 충전분이 먼저 차감되면 사용자의 실질 잔액이 손실됩니다. 소멸 임박 순 차감 원칙을 지키세요.' },
        { name: '상한선(Spend limit) 설정 없이 무제한 종량 과금만 열어 두기', description: '사용자 코드의 무한 루프나 트래픽 급증으로 하루 만에 수백만 원이 청구되지 않도록 월간 초과 지출 한도 설정을 제공하세요.' },
        { name: '실패한 요청이나 네트워크 재시도까지 사용량으로 중복 집계하기', description: '서버 오류로 실패한 요청이 과금 대상에서 제외되는지, 재시도 시 동일 멱등 키로 1회만 집계되는지 명확히 구분하세요.' },
      ],
      questions: [
        '과금 대상 사용량은 누적 합계(호출 수·토큰 등)인가요, 기간 내 최대 사용량(용량 등)인가요? 실패한 요청도 차감하나요?',
        '플랜 기본 제공량, 이벤트 무상 크레딧, 유료 충전 크레딧의 차감 우선순위와 미사용분 이월·소멸 규칙은 무엇인가요?',
        '기본 제공량을 모두 소진하면 기능을 즉시 차단(Hard cap)하나요, 종량 초과 과금(Overage)으로 전환하나요?',
        '사용자가 월간 최대 초과 지출 한도(Spend cap)나 알림 임계치(예: 80%, 100%)를 직접 설정할 수 있나요?',
        '화면의 사용량 대시보드는 실시간 반영인가요, 몇 분 단위 집계 지연이 있으며 주기 마감 직전 사용량은 어떻게 정산하나요?',
      ],
      example: '예시: 월 기본 10,000건 제공 후 초과 시 1,000건당 과금하되, 당월 소멸하는 기본 제공량을 유료 충전 크레딧보다 먼저 차감하고, 80%·100% 도달 시 알림을 보내며 사용자가 설정한 월 초과 한도(예: 5만 원)에 도달하면 일시 차단 후 한도 변경 버튼을 보여 주도록 구성할 수 있습니다. 이는 참고 예시이며 실제 단가와 차감 규칙은 별도로 확정해야 합니다.',
      relatedDesigns: [
        { id: 'dismissible-inline-banner', reason: '기본 제공량 80% 도달이나 월 지출 상한선 임박 경고를 대시보드 상단에 표시하고 한도 설정으로 연결하는 표현에 참고할 수 있습니다. 실제 사용량 집계와 차단은 별도로 구현해야 합니다.' },
        { id: 'ly-sortable-data-table', reason: '일자별·기능별 사용량과 차감된 크레딧, 초과 과금 내역을 정렬해 확인하는 화면에 참고할 수 있습니다. 실제 미터링 원장 조회는 포함하지 않습니다.' },
      ],
      promptSnippet: '구독·요금제 서비스의 사용량 기반 과금(Metered)·크레딧 차감·한도 알림 및 초과 요금 제어 흐름을 설계해 줘. 먼저 사용량 측정 기준(누적 합계 vs 최대치)과 실패 요청 제외 여부, 기본 제공량·무상/유료 충전 크레딧의 차감 순서와 이월 규칙, 한도 도달 시 차단(Hard cap) vs 초과 과금 및 월 지출 상한선(Spend limit), 집계 지연 안내 방식을 질문하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 멱등 사용량 수집 기준과 크레딧 버킷(기본·프로모션·유료 충전)별 차감 우선순위 및 만료 규칙.\n2. 사용률 임계치(80%·100% 등) 알림 발송과 초과 과금 전환 또는 상한 도달 시 차단 동작.\n3. 대시보드의 실시간 추정치 vs 청구 확정치 구분과 마지막 집계 시각 표시.\n4. 주기 마감 경계 시각의 지연 이벤트 정산 및 한도 상향/크레딧 충전 시 즉시 해제 흐름.\n5. 사용량 게이지·크레딧 잔액 내역·월 지출 상한선 설정·초과 경고 배너 화면과 디자인 선택 이유.\n소멸 예정 크레딧보다 유료 충전분을 먼저 차감하거나 상한 제어 없이 무제한 과금만 가정하지 말고, 디자인 데모와 실제 미터링·과금 원장 시스템을 구분해 줘.',
    },
    en: {
      domain: 'Subscription & Billing',
      title: 'Usage-based metering, credit drawdown, threshold alerts and overage caps',
      summary: 'Define idempotent usage metering, credit drawdown precedence and rollover rules alongside threshold alerts and spend caps.',
      overview: 'When a subscription combines a monthly allowance with pay-as-you-go overage (such as API calls, tokens, minutes or storage), customers need predictability against runaway bills. The system must define which credit bucket draws down first, whether hitting 100% blocks further usage (hard cap) or bills overage up to a configurable spend cap, and how recent the displayed usage numbers are. The concepts below are design references, not default metering tariffs.',
      concepts: [
        { name: 'Aggregation model and idempotent metering', description: 'Specify whether usage is summed across events, measured by peak watermark or counted by unique active items, and deduplicate retried events with idempotency keys.' },
        { name: 'Credit buckets, drawdown order and rollover', description: 'Consume expiring monthly plan allowances before longer-lived promotional or prepaid top-up credits, and define whether unused allowances expire or roll over.' },
        { name: 'Threshold alerts, overage billing and hard spend caps', description: 'Trigger deduplicated alerts at agreed thresholds (such as 80% and 100%) and distinguish hard-capped plans from metered overage plans bounded by a customer-configured monthly spend limit.' },
        { name: 'Reporting lag and end-of-period closeout', description: 'Show the "last updated" timestamp on usage dashboards so users understand any ingestion delay, and define the grace window for late-arriving events when closing an invoice period.' },
      ],
      workflow: [
        { name: 'Surface allowance usage, credit buckets and freshness timestamp', description: 'Display consumed versus remaining included units, prepaid credit balances, current accrued overage and the latest aggregation timestamp.' },
        { name: 'Draw down expiring credits first and dispatch threshold alerts', description: 'Deduct usage from the earliest-expiring credit bucket and send one alert per threshold crossing within the billing cycle.' },
        { name: 'Enforce overage rates or pause at the configured spend cap', description: 'When included credits reach zero, either bill overage up to the active spend cap or pause billable operations with a clear upgrade/top-up path.' },
        { name: 'Close the billing period and reset cycle allowances', description: 'Finalize period usage after the ingestion cutoff, invoice any accrued overage and reset the new cycle’s included allowance.' },
      ],
      pitfalls: [
        { name: 'Drawing down paid non-expiring top-ups before expiring monthly allowances', description: 'Always consume credits that expire at the end of the current cycle before touching paid rollover or top-up balances.' },
        { name: 'Offering metered overages without a configurable spend limit', description: 'A runaway script can generate a massive bill overnight if users cannot set a hard monthly overage cap.' },
        { name: 'Double-counting retried requests or billing for server-error responses', description: 'Define clearly which response statuses are billable and enforce idempotency keys on usage ingestion.' },
      ],
      questions: [
        'How is usage metered (sum of events, peak storage watermark or unique active units), and are failed requests excluded?',
        'In what order are included plan allowances, promo credits and prepaid top-up credits consumed, and do unused credits roll over?',
        'When included usage hits 100%, does the service stop (hard cap) or switch to pay-as-you-go overage billing?',
        'Can customers configure threshold alert percentages and a hard monthly overage spend limit?',
        'How much delay exists between an event and the usage dashboard, and how are late-arriving events at period end handled?',
      ],
      example: 'Example: a plan could include 10,000 monthly units that expire each cycle, consume those before any prepaid top-up credits, send alerts at 80% and 100%, bill overage in 1,000-unit blocks up to a user-editable $50 monthly spend cap, and pause requests once that cap is reached until the cap is raised or credits are topped up. This is a reference example, not an established policy.',
      relatedDesigns: [
        { id: 'dismissible-inline-banner', reason: 'A reference for surfacing an 80% allowance warning or spend-cap pause notice with a direct link to billing limits. Real usage metering and cap enforcement need separate implementation.' },
        { id: 'ly-sortable-data-table', reason: 'A reference for inspecting daily or per-feature usage rows, credit deductions and overage charges. Real metering ledger queries are not included.' },
      ],
      promptSnippet: 'Help design a usage-based metering, credit drawdown, threshold alert and overage cap workflow. First ask about the metering model (sum vs peak) and error exclusions, drawdown order and rollover across plan allowances and prepaid top-ups, hard cap versus overage billing and configurable spend limits, and usage reporting lag. Do not assume undecided rules.\nBased on the answers, describe:\n1. Idempotent usage ingestion rules and drawdown precedence across expiring allowances and prepaid credit buckets.\n2. Threshold alert triggers (such as 80% and 100%) and behavior when transitioning to overage or hitting a hard spend cap.\n3. Dashboard presentation of included usage, credit balances, accrued overage and data-freshness timestamps.\n4. Period-close cutoff handling for late events and instant unblocking when a user tops up credits or raises their spend cap.\n5. Usage meters, credit bucket breakdown, spend-cap controls and warning banners with reasons for the design choices.\nDo not consume paid top-up credits before expiring monthly allowances, and distinguish design demos from a real metering and billing pipeline.',
    },
  },
  sources: [
    { title: 'Stripe Docs — Usage-based billing and metered subscriptions', url: 'https://docs.stripe.com/billing/subscriptions/usage-based' },
    { title: 'Stripe Docs — Grants and credit burndown for usage-based billing', url: 'https://docs.stripe.com/billing/subscriptions/usage-based/credit-grants' },
  ],
}, {
  id: 'subscription-invoice-tax-and-payment-retry',
  aliases: {
    ko: ['청구서 인보이스 확정과 영수증', '사업자 정보와 세금 계산', '정기 결제 실패 재시도 일정', '결제 수단 교체 후 즉시 재청구', '확정 청구서 불변성과 수정 발행'],
    en: ['invoice finalization and receipt', 'tax ID and VAT calculation', 'dunning payment retry schedule', 'payment method update and immediate retry', 'immutable finalized invoice and credit note'],
  },
  useCases: {
    ko: ['결제 예정 내역(Upcoming)과 확정 발행된 청구서(Finalized Invoice)·결제 영수증을 구분할 때', '국가·주소·사업자등록번호(Tax ID)에 따른 부가세(VAT) 포함/별도 계산과 청구서 표기를 다룰 때', '정기 결제 실패(한도 초과·카드 만료 등) 시 자동 재시도(Dunning) 일정과 안내를 설계할 때', '고객이 새 카드를 등록했을 때 미납 청구서를 즉시 재결제하고 연체 상태를 해제할 때'],
    en: ['Separating upcoming invoice previews from finalized invoices and paid receipts', 'Handling tax calculation (inclusive vs exclusive VAT/sales tax) and company tax IDs on invoices', 'Designing dunning retry schedules and failure reason notices when a recurring charge fails', 'Immediately retrying open past-due invoices when a customer updates their default payment method'],
  },
  keywords: {
    ko: ['청구서', '인보이스', '영수증', '세금 계산', '사업자 정보', '결제 재시도', '연체 복구', '결제 수단 변경', '수정 청구서'],
    en: ['invoice', 'receipt', 'tax calculation', 'tax ID', 'dunning retry', 'past-due recovery', 'payment method update', 'credit note', 'billing address'],
  },
  text: {
    ko: {
      domain: '구독·요금제',
      title: '청구서(Invoice) 발행·세금 정보 확정·결제 수단 교체와 재청구',
      summary: '다음 결제 예정 내역과 확정 청구서를 구분하고, 세금·사업자 정보 고정과 미납 청구서 재시도·카드 교체 복구를 연결합니다.',
      overview: '기업과 개인이 함께 쓰는 구독 서비스에서는 다음 결제일에 얼마가 빠져나갈지 보여 주는 예정 내역(Upcoming preview)과 이미 발행된 확정 청구서(Invoice), 실제 결제 완료 후의 영수증(Receipt)이 서로 다른 문서입니다. 이미 발행된 청구서의 회사명이나 사업자번호를 사후 프로필 수정으로 마음대로 덮어쓰면 세무 증빙이 어긋나며, 카드를 새로 등록했는데도 다음 자동 재시도 날까지 연체 상태가 풀리지 않으면 사용자는 결제 복구가 된 것인지 알 수 없습니다. 아래 내용은 청구서·세금·재청구 설계를 위한 참고이며 특정 국가의 세율을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '예정 내역(Upcoming) vs 확정 청구서(Invoice) vs 영수증(Receipt)', description: '결제일 전까지 플랜·좌석 변동에 따라 바뀌는 다음 결제 예정 내역과, 주기가 마감되어 금액·번호·청구처 정보가 고정된 확정 청구서, 납부 완료 증빙인 영수증을 구분합니다.' },
        { name: '세금(VAT/Sales Tax) 포함·별도 계산과 사업자 정보 스냅샷', description: '표시 요금이 세금 포함(Inclusive)인지 별도 가산(Exclusive)인지 명확히 하고, 청구서 확정 시점의 상호·청구지 주소·사업자번호(Tax ID)를 스냅샷으로 고정합니다.' },
        { name: '결제 실패 사유 분류와 자동 재시도(Dunning) 일정', description: '잔액 부족·한도 초과·해외 결제 차단·카드 만료 등 실패 원인을 안내하고, 며칠 간격으로 몇 회 자동 재시도한 뒤 구독을 정지·만료할지 정의합니다.' },
        { name: '결제 수단 교체 시 미납 청구서 즉시 재결제와 기본 수단 보호', description: '연체(Past-due) 상태에서 새 결제 수단을 등록하면 미납 청구서를 즉시 재청구해 정상 상태로 복구하고, 활성 구독이 남아 있는 동안 마지막 결제 수단 삭제를 제한합니다.' },
      ],
      workflow: [
        { name: '다음 결제 예정 금액과 세금·청구 정보 미리 보여 주기', description: '구독 관리 화면에서 다음 결제일, 기본 요금, 일할 정산금, 예상 세금과 청구서에 찍힐 사업자 정보를 미리 확인·수정할 수 있게 합니다.' },
        { name: '청구서 확정 발행 및 자동 결제 실행하기', description: '결제 주기가 도래하면 청구서 번호와 청구처 스냅샷을 고정해 발행하고 등록된 기본 결제 수단으로 승인 요청을 보냅니다.' },
        { name: '결제 실패 시 사유 안내와 재시도·카드 변경 연결하기', description: '승인이 거절되면 실패 사유와 다음 자동 재시도 예정일, 유예 기한을 알리고 카드 변경 또는 즉시 재결제 버튼을 제공합니다.' },
        { name: '미납금 완납 확인 후 연체 해제 및 영수증 발급하기', description: '재시도나 새 카드 결제가 성공하면 청구서를 납부 완료(Paid)로 전환하고 연체 배너를 즉시 내려 영수증 내려받기를 활성화합니다.' },
      ],
      pitfalls: [
        { name: '이미 발행·결제된 과거 청구서의 사업자 정보를 프로필 수정으로 그냥 덮어쓰기', description: '확정된 청구서는 회계·세무 증빙이므로 사후 프로필 변경이 과거 청구서를 임의로 바꾸면 안 됩니다. 변경분은 다음 청구서부터 반영하거나 정식 수정 발행(Credit note/Reissue) 절차를 두세요.' },
        { name: '연체 상태에서 새 카드를 등록했는데 미납 청구서를 그대로 두고 다음 주기를 기다리기', description: '사용자는 카드를 바꾸면 바로 연체가 풀릴 것으로 기대합니다. 결제 수단 변경 시 열려 있는 미납 청구서 재결제를 함께 연결하세요.' },
        { name: '활성 구독 중인데 유일한 결제 수단을 삭제하게 두기', description: '해지 예약이 아닌 활성 구독에서 대체 수단 없이 카드를 지우면 다음 갱신이 무조건 실패합니다. 새 수단을 먼저 기본으로 지정한 뒤 기존 수단을 삭제하게 하세요.' },
      ],
      questions: [
        '요금제 표시 가격은 세금 포함(부가세 포함)인가요, 청구지 국가·주소에 따라 결제 시 세금이 별도 가산되나요?',
        '청구서에 회사명·사업자등록번호(Tax ID)·청구지 주소를 기재하며, 이미 발행된 청구서의 정보 수정 요청은 어떻게 처리하나요?',
        '정기 결제가 실패하면 며칠 간격으로 몇 번 자동 재시도(Dunning)하며, 최종 실패 시 구독은 어떤 상태로 바뀌나요?',
        '미납(연체) 상태에서 고객이 새 카드를 등록하면 열려 있는 미납 청구서를 즉시 자동 재결제하나요?',
        '활성 구독이나 미납 청구서가 남아 있을 때 등록된 마지막 기본 결제 수단 삭제를 어떻게 제한하나요?',
      ],
      example: '예시: 결제일 전에는 예정 내역에서 사업자 정보와 예상 부가세를 수정·확인할 수 있고, 결제일 도래 시 확정 청구서를 발행해 자동 결제하되 실패 시 1·3·7일 뒤 총 3회 재시도하며, 그사이 고객이 새 카드를 기본 수단으로 등록하면 미납 청구서를 즉시 재청구해 연체 경고를 해제하도록 구성할 수 있습니다. 이는 참고 예시이며 실제 세금·재시도 규칙은 별도로 확정해야 합니다.',
      relatedDesigns: [
        { id: 'ly-expandable-data-rows', reason: '청구서 목록에서 발행일·상태(납부 완료/미납/환불)·총액을 보고 행을 펼쳐 세부 항목·세금·영수증 링크를 확인하는 표현에 참고할 수 있습니다. 실제 청구서 생성과 세금 계산은 별도로 구현해야 합니다.' },
        { id: 'linked-form-error-summary', reason: '청구지 주소·사업자등록번호·결제 수단 등록 폼에서 형식 오류나 필수 누락을 상단 요약으로 짚어 주는 표현에 참고할 수 있습니다. 실제 카드 승인이나 세금 번호 검증은 포함하지 않습니다.' },
      ],
      promptSnippet: '구독·요금제 서비스의 청구서(Invoice) 발행·세금 정보 확정·결제 수단 교체 및 재청구 흐름을 설계해 줘. 먼저 예정 내역(Upcoming)과 확정 청구서 구분, 세금 포함/별도 계산 및 사업자 정보(Tax ID) 고정 규칙, 정기 결제 실패 시 재시도(Dunning) 일정, 새 결제 수단 등록 시 미납 청구서 즉시 재결제 여부, 기본 결제 수단 삭제 제한을 질문하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 다음 결제 예정 내역, 확정 발행 청구서(미납/납부 완료/무효), 결제 영수증의 구분과 스냅샷 항목.\n2. 청구지·사업자 정보 변경 시 다음 청구서 반영 규칙과 기발행 청구서 정정 절차.\n3. 정기 결제 실패 사유 안내, 자동 재시도 일정, 최종 실패 시 구독 상태 전환.\n4. 연체 중 결제 수단 교체·즉시 재결제 성공/실패 처리와 마지막 결제 수단 삭제 방지 규칙.\n5. 청구 정보 설정·예정 내역 및 청구서 이력 테이블·미납 복구 배너 화면과 디자인 선택 이유.\n확정된 과거 청구서를 단순 프로필 수정으로 덮어쓰지 말고, 디자인 데모와 실제 인보이스·세금·결제 재시도 시스템을 구분해 줘.',
    },
    en: {
      domain: 'Subscription & Billing',
      title: 'Invoice finalization, tax details, payment-method recovery and dunning retries',
      summary: 'Distinguish upcoming previews from finalized invoices, snapshot tax details, and connect dunning retries with payment-method recovery.',
      overview: 'In a subscription billing system, an upcoming renewal preview, a finalized invoice and a paid receipt are distinct records. Letting a later profile edit silently rewrite company names or tax IDs on already finalized invoices breaks accounting compliance, and letting a past-due customer add a new card without retrying their open invoice leaves them unexpectedly locked out. The concepts below are design references, not default tax or dunning policies.',
      concepts: [
        { name: 'Upcoming preview versus finalized invoice and receipt', description: 'Separate the mutable upcoming renewal estimate from finalized invoices (which lock invoice number, line items and billing details) and payment receipts.' },
        { name: 'Tax calculation and billing-detail snapshots', description: 'Clarify whether plan prices are tax-inclusive or tax-exclusive, and snapshot legal business name, billing address and tax ID when each invoice is finalized.' },
        { name: 'Dunning schedule and decline reason messaging', description: 'Surface actionable decline guidance (such as expired card or insufficient funds) alongside the scheduled automatic retry dates and final cutoff.' },
        { name: 'Immediate open-invoice retry and default payment protection', description: 'When a past-due subscriber updates their default payment method, retry open unpaid invoices immediately, and block removing the last payment method while an active subscription remains.' },
      ],
      workflow: [
        { name: 'Preview upcoming renewal lines, taxes and billing details', description: 'Show the next billing date, base plan, prorated adjustments, estimated tax and current tax ID/address so admins can update details before finalization.' },
        { name: 'Finalize the invoice and attempt collection', description: 'At period close, lock the invoice snapshot and charge the default payment method idempotently.' },
        { name: 'Guide recovery across dunning retries and card updates', description: 'If collection fails, show the failure reason, next scheduled retry date and a direct action to replace the payment method or pay now.' },
        { name: 'Settle open invoices on card update and issue receipts', description: 'When a new payment method is saved or an immediate retry succeeds, mark the invoice paid, clear the past-due state and provide the receipt.' },
      ],
      pitfalls: [
        { name: 'Mutating historical finalized invoices when a user edits their billing profile', description: 'Finalized invoices are accounting records. Apply profile edits to upcoming invoices, or use formal credit-note and re-issuance flows when allowed.' },
        { name: 'Saving a new card on a past-due account without retrying the unpaid invoice', description: 'If a user updates their card to fix a failed renewal, leaving the invoice unpaid until a background job runs days later causes confusion.' },
        { name: 'Allowing deletion of the only payment method on an active recurring subscription', description: 'Require adding and selecting a replacement default payment method before removing the existing one unless the subscription is canceled.' },
      ],
      questions: [
        'Are listed plan prices tax-inclusive or tax-exclusive, and which billing address or tax ID fields are collected?',
        'When a customer updates their company name, address or tax ID, does it apply only to future invoices or is invoice re-issuance supported?',
        'What is the automatic retry (dunning) schedule after a failed renewal charge, and what happens when all retries fail?',
        'When a past-due customer adds or changes their default payment method, is the open unpaid invoice retried immediately?',
        'Can a customer delete their last payment method while a paid subscription or unpaid invoice is still active?',
      ],
      example: 'Example: a SaaS billing page could show an upcoming invoice preview with editable tax ID and address, lock those fields when finalizing the monthly invoice, retry failed charges on days 1, 3 and 7, immediately attempt payment on any open past-due invoice when the user saves a new default card, and prevent deleting the sole card while the subscription is active. This is a reference example, not an established policy.',
      relatedDesigns: [
        { id: 'ly-expandable-data-rows', reason: 'A reference for listing invoices by date, status (paid, past due, void) and total, while expanding rows to inspect line items, tax and receipt links. Real invoice generation and tax math need separate implementation.' },
        { id: 'linked-form-error-summary', reason: 'A reference for summarizing missing or invalid billing address, tax ID and payment fields on a billing settings form. Real tax validation and card tokenization are not included.' },
      ],
      promptSnippet: 'Help design a subscription invoice finalization, tax detail, payment-method recovery and dunning retry workflow. First ask about upcoming preview versus finalized invoice rules, tax-inclusive versus tax-exclusive calculation and tax ID snapshots, dunning retry schedule and final failure state, immediate retry on payment-method update, and protection of the default payment method. Do not assume undecided rules.\nBased on the answers, describe:\n1. Distinction and snapshot fields across upcoming previews, finalized invoices (open, paid, void/credited) and receipts.\n2. How billing address and tax ID updates affect upcoming versus already finalized invoices.\n3. Decline reason presentation, automated dunning schedule and transition when retries are exhausted.\n4. Immediate collection flow when replacing a payment method on a past-due account and rules blocking removal of the last payment method.\n5. Billing profile form, upcoming/historical invoice table and past-due recovery banner UI with reasons for the design choices.\nDo not overwrite finalized historical invoices on profile edits, and distinguish design demos from real invoicing, tax and dunning systems.',
    },
  },
  sources: [
    { title: 'Stripe Docs — How invoices work and invoice lifecycle', url: 'https://docs.stripe.com/invoicing/overview' },
    { title: 'Stripe Docs — Smart Retries and failed payment recovery', url: 'https://docs.stripe.com/billing/revenue-recovery/smart-retries' },
  ],
}, {
  id: 'subscription-pause-resume-and-winback',
  aliases: {
    ko: ['구독 일시정지와 재개', '일시정지 기간 열람 범위', '재개 시 결제 기준일 조정', '최대 정지 기간과 자동 재개', '해지 방어 혜택과 일시정지 제안'],
    en: ['subscription pause and resume', 'paused state access scope', 'billing anchor shift on resume', 'maximum pause duration and auto-resume', 'cancellation retention offer'],
  },
  useCases: {
    ko: ['사용자가 완전 해지 대신 1~3개월 구독 일시정지(Pause)를 선택할 수 있게 할 때', '일시정지 시작 시점(즉시 vs 현재 결제 주기 끝)과 정지 중 데이터 열람 범위를 정할 때', '일시정지 만료 시 자동 재개 여부와 조기 재개 시 다음 결제 기준일(Billing anchor) 계산을 다룰 때', '해지 진행 화면에서 정지 옵션이나 잔류 할인 혜택을 제안하고 남용 방지 주기를 설계할 때'],
    en: ['Offering a temporary subscription pause (such as 1 to 3 months) as an alternative to cancellation', 'Deciding whether a pause starts immediately or at period end, and which read-only access scope remains while paused', 'Handling automatic resumption at pause end versus early manual resume and billing-anchor adjustments', 'Presenting pause or retention offers during cancellation while enforcing cooldown limits against abuse'],
  },
  keywords: {
    ko: ['구독 일시정지', '구독 재개', '결제 기준일 조정', '정지 중 열람 범위', '자동 재개', '일시정지 횟수 제한', '해지 방어 제안', '잔여 기간 이월'],
    en: ['subscription pause', 'resume subscription', 'billing cycle anchor', 'paused access scope', 'auto-resume', 'pause cooldown', 'retention offer', 'remaining time credit'],
  },
  text: {
    ko: {
      domain: '구독·요금제',
      title: '구독 일시정지·재개 시 결제일 조정과 정지 기간 열람 범위',
      summary: '해지 대신 선택하는 일시정지의 시작 시점과 정지 중 열람 범위를 정하고, 재개 시 결제 기준일 조정을 연결합니다.',
      overview: '프로젝트 공백기나 비수기에 잠시 서비스를 쓰지 않는 사용자에게 완전 해지 대신 일시정지(Pause)를 제공하면 데이터를 유지한 채 복귀율을 높일 수 있습니다. 그러나 정지가 신청 즉시 시작되는지 이번 결제 주기 끝부터 시작되는지, 정지 기간 동안 기존 데이터를 읽기 전용으로 볼 수 있는지, 만료일에 자동으로 결제가 재개되는지 미리 알리지 않으면 예고 없는 자동 결제로 분쟁이 발생합니다. 아래 내용은 구독 일시정지·재개 설계를 위한 참고이며 특정 서비스의 정지 허용 기간을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '일시정지 시작 시점(즉시 정지 vs 결제 주기 말 정지)', description: '이미 결제한 이번 주기가 끝난 뒤부터 정지를 시작할지, 즉시 정지하고 남은 유료 일수를 재개 시점의 크레딧·기간으로 이월할지 구분합니다.' },
        { name: '정지 기간 중 열람 범위(Paused Access Scope)', description: '일시정지 상태에서 기존 데이터 조회·내보내기(읽기 전용)는 열어 두고 새 생성·편집·자동화 실행만 막을지, 설정 화면 외 접근을 모두 잠글지 정의합니다.' },
        { name: '만료일 자동 재개와 조기 재개 시 결제 기준일(Billing Anchor)', description: '선택한 정지 기간이 끝나면 자동 재개·결제되는지 정하고, 고객이 예정보다 일찍 재개할 때 결제 기준일을 재개일로 새로 잡을지 남은 일수를 먼저 소진할지 계산합니다.' },
        { name: '정지 횟수·기간 제한과 정지 중 해지 전환', description: '연간 허용 정지 횟수나 해지 방어(Winback) 혜택의 재수령 제한 기간(Cooldown)을 두고, 일시정지 상태에서도 언제든 재과금 없이 해지로 전환할 수 있게 합니다.' },
      ],
      workflow: [
        { name: '일시정지 조건·기간 선택과 자동 재개일 안내하기', description: '정지 가능 개월 수, 정지 시작일, 정지 중 유지되는 열람 범위, 자동 재개 및 다음 결제 예정일을 신청 전에 명확히 보여 줍니다.' },
        { name: '정지 예약 또는 정지 상태 전환 적용하기', description: '현재 주기 말 정지라면 정지 예정 배지를 표시하고, 정지가 시작되면 정기 청구를 멈춘 채 약속한 읽기 전용 범위를 적용합니다.' },
        { name: '자동 재개 사전 알림 및 조기 재개 처리하기', description: '자동 재개 며칠 전에 결제 예정 알림을 보내고, 사용자가 직접 조기 재개를 누르면 새 결제 주기 기준일과 청구 금액을 안내한 뒤 즉시 권한을 복원합니다.' },
        { name: '정지 중 해지 전환 또는 혜택 쿨다운 검증하기', description: '정지 중 해지를 선택하면 추가 청구 없이 구독을 종료 처리하고, 반복 정지·할인 수령 시 연간 제한 횟수를 검증합니다.' },
      ],
      pitfalls: [
        { name: '자동 재개 날짜와 사전 알림 없이 정지 만료일에 갑자기 결제하기', description: '1~3개월 뒤 자동으로 결제가 다시 시작된다면 신청 화면의 명시적 동의와 재개 전 사전 알림이 필수입니다.' },
        { name: '일시정지 중에는 해지 버튼을 숨겨 일단 재개 결제를 거쳐야만 해지되게 만들기', description: '일시정지 중인 사용자도 추가 요금 없이 바로 구독 해지를 확정할 수 있어야 불필요한 환불 분쟁이 생기지 않습니다.' },
        { name: '남은 유료 기간이 있는 상태에서 즉시 정지시키고 재개 시 그 기간을 소멸시키기', description: '결제 주기 중간에 즉시 정지를 허용한다면 이미 돈 낸 잔여 일수를 크레딧으로 보관하거나 현재 주기 끝부터 정지가 시작되게 설계하세요.' },
      ],
      questions: [
        '일시정지는 한 번에 최대 몇 개월, 1년에 몇 회까지 허용하며 어떤 요금제(월간/연간)에서 사용할 수 있나요?',
        '일시정지 신청 시 현재 결제 주기가 끝난 뒤 정지되나요, 즉시 정지되고 남은 기간은 재개 후로 이월되나요?',
        '정지 기간 동안 사용자는 기존 데이터를 읽기 전용으로 열람·내보내기할 수 있나요, 아니면 접근이 전면 제한되나요?',
        '정지 기간이 끝나면 자동으로 결제와 구독이 재개되나요? 사용자가 예정보다 일찍 재개하면 결제일은 어떻게 바뀌나요?',
        '해지 화면에서 일시정지나 할인 제안을 보여 줄 때, 혜택을 반복 수령하지 못하게 하는 재적용 제한 기간이 있나요?',
      ],
      example: '예시: 월간 구독자가 해지 대신 1~3개월 일시정지를 고르면 현재 결제 주기가 끝나는 날부터 정지가 시작되어 기존 데이터는 읽기 전용으로만 열람할 수 있고, 정지 만료 7일 전에 자동 재개 알림을 보내며 정지 중에도 추가 결제 없이 언제든 즉시 해지하거나 조기 재개(재개일 기준 새 결제 주기 시작)할 수 있도록 구성할 수 있습니다. 이는 참고 예시이며 실제 정지·재개 정책은 별도로 확정해야 합니다.',
      relatedDesigns: [
        { id: 'dismissible-inline-banner', reason: '일시정지 중인 계정 상단에 현재 제한된 기능 범위, 자동 재개 예정일, 즉시 재개 또는 해지 전환 버튼을 안내하는 표현에 참고할 수 있습니다. 실제 청구 일시정지와 재개 처리는 별도로 구현해야 합니다.' },
        { id: 'native-date-field', reason: '허용된 범위 안에서 일시정지 기간이나 재개 희망 날짜를 선택하는 입력 표현에 참고할 수 있습니다. 실제 결제 기준일 재계산은 포함하지 않습니다.' },
      ],
      promptSnippet: '구독·요금제 서비스의 일시정지·재개 시 결제일 조정 및 정지 기간 열람 범위 흐름을 설계해 줘. 먼저 허용 정지 기간과 연간 횟수 제한, 정지 시작 시점(즉시 vs 현재 주기 말)과 잔여 유료 기간 처리, 정지 중 데이터 열람 범위(읽기 전용 vs 차단), 만료 시 자동 재개 사전 알림과 조기 재개 시 결제 기준일(Billing anchor) 조정, 정지 중 해지 전환 및 혜택 재수령 제한(Cooldown)을 질문하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 정상 이용·정지 예약·일시정지 중·재개됨·정지 중 해지 상태의 전환 조건과 허용 행동.\n2. 즉시 정지 vs 주기 말 정지에 따른 잔여 유료 일수 보존 및 조기/자동 재개 시 다음 결제일·금액 계산.\n3. 일시정지 기간 중 유지되는 데이터 열람·내보내기 범위와 차단되는 쓰기/자동화 동작.\n4. 자동 재개 전 사전 안내, 재개 시 결제 실패 처리, 정지 중 무과금 해지 전환 흐름.\n5. 일시정지 기간 선택 모달·정지 상태 안내 배너·조기 재개/해지 확인 화면과 디자인 선택 이유.\n정지 중인 사용자가 해지하기 위해 먼저 유료 재개를 거치게 만들지 말고, 디자인 데모와 실제 구독 일시정지·과금 스케줄러를 구분해 줘.',
    },
    en: {
      domain: 'Subscription & Billing',
      title: 'Subscription pause, billing-anchor adjustment on resume and paused access scope',
      summary: 'Define pause start timing and read-only access scope while paused, and connect auto-resume notices, billing-anchor shifts and direct cancellation.',
      overview: 'Offering a temporary subscription pause helps seasonal or between-project users keep their workspace without canceling outright. However, if a service does not clarify whether the pause starts immediately or at period end, what read-only access scope remains during the pause, how the billing cycle anchor shifts upon early or scheduled resumption, and when automatic billing restarts, users face surprise charges. The concepts below are design references, not default retention policies.',
      concepts: [
        { name: 'Pause start timing (immediate versus period end)', description: 'Decide whether pausing takes effect at the end of the current paid period or starts immediately while crediting or carrying forward unused paid days.' },
        { name: 'Paused access scope and data preservation', description: 'Define what a paused subscriber can still do—such as signing in to view or export existing records in read-only mode while creation, edits and background automations are suspended.' },
        { name: 'Scheduled auto-resume versus early resume and billing anchor', description: 'Clarify whether the subscription auto-resumes and bills on a chosen date, and how an early manual resume resets the billing cycle anchor or consumes remaining credit first.' },
        { name: 'Pause limits, retention cooldowns and cancel-while-paused', description: 'Enforce maximum pause durations and annual cooldowns on pause or winback discounts, while allowing paused users to cancel outright without being charged first.' },
      ],
      workflow: [
        { name: 'Present pause durations, access scope and resume date upfront', description: 'Before confirming a pause, show the selectable duration, effective pause start date, read-only rules while paused and the exact auto-resume billing date.' },
        { name: 'Transition to pause-scheduled or paused state', description: 'Suspend recurring invoice collection while the pause is active and apply the agreed read-only access scope across the product.' },
        { name: 'Send pre-resume reminders and handle early manual resume', description: 'Notify the user ahead of scheduled auto-resume billing, and if they resume early, show the updated billing anchor and charge summary before restoring full access.' },
        { name: 'Allow direct cancellation while paused and enforce cooldowns', description: 'Let paused users switch to full cancellation at any time without triggering a resume charge, and track eligibility cooldowns for future pauses or retention offers.' },
      ],
      pitfalls: [
        { name: 'Resuming recurring charges after a multi-month pause without advance notice', description: 'Always display the auto-resume date at pause signup and send a reminder before charging when a pause window is about to end.' },
        { name: 'Forcing a paused user to resume and pay before they are allowed to cancel', description: 'Users in a paused state must be able to cancel their subscription directly without an unwanted renewal charge.' },
        { name: 'Forfeiting already-paid days when applying an immediate mid-cycle pause', description: 'Either start the pause at the end of the current paid period or preserve the unused portion as credit/time when the user resumes.' },
      ],
      questions: [
        'Which plans can be paused, for how many months at a time, and how many pauses are allowed per year?',
        'Does a pause begin at the end of the current billing period, or immediately with unused paid time credited toward resumption?',
        'While paused, can users still sign in to view or export existing data in read-only mode?',
        'Does the subscription auto-resume at the end of the pause window, and how is the billing cycle date adjusted if a user resumes early?',
        'Can a paused user cancel directly without resuming first, and is there a cooldown on claiming pause or retention offers?',
      ],
      example: 'Example: a monthly subscriber could pause for 1, 2 or 3 months starting at the end of their current paid period, keep read-only viewing and export access while paused, receive a reminder 7 days before auto-resumption, resume early with a new billing anchor on the resume date, or cancel at any time while paused with zero additional charge. This is a reference example, not an established policy.',
      relatedDesigns: [
        { id: 'dismissible-inline-banner', reason: 'A reference for showing a paused-account banner with read-only scope details, scheduled resume date and actions to resume now or cancel. Real billing suspension and resumption need separate implementation.' },
        { id: 'native-date-field', reason: 'A reference for selecting a pause duration or target resume date within allowed bounds. Real billing-anchor recalculation is not included.' },
      ],
      promptSnippet: 'Help design a subscription pause, resume billing-anchor adjustment and paused access-scope workflow. First ask about allowed pause durations and annual cooldown limits, immediate versus period-end pause timing and unused-time handling, read-only access scope while paused, auto-resume reminders and billing-anchor calculation on early resume, and direct cancellation while paused. Do not assume undecided rules.\nBased on the answers, describe:\n1. States and allowed actions across active, pause-scheduled, paused, resumed and canceled-from-pause.\n2. Handling of remaining paid time and billing-anchor recalculation for scheduled auto-resume versus early manual resume.\n3. Read-only viewing/export access versus suspended write and automation actions during a pause.\n4. Pre-resume notifications, failed charge handling on resume, and zero-charge cancellation while paused.\n5. Pause duration selector, paused-state banner and early-resume or cancel confirmation UI with reasons for the design choices.\nDo not require paused users to pay for a resume just to cancel, and distinguish design demos from a real subscription billing scheduler.',
    },
  },
  sources: [
    { title: 'Stripe Docs — Pause payment collection on subscriptions', url: 'https://docs.stripe.com/billing/subscriptions/pause-payment' },
    { title: 'Google Play Billing — Pause and resume subscriptions', url: 'https://developer.android.com/google/play/billing/subscriptions#pause' },
  ],
}];
