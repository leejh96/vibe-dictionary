import type { GlossaryTermBody } from './types';

export const SALES_MARKETING_GLOSSARY_DATA: Record<string, GlossaryTermBody> = {
  'sales-lead': {
    aliases: {
      ko: ['리드', '잠재고객', '잠재 고객', '영업 리드', '문의 리드'],
      en: ['lead', 'sales prospect', 'sales lead', 'inbound lead'],
    },
    text: {
      ko: {
        definition: '도입 문의, 자료 요청, 데모 신청 등을 통해 구매 또는 계약 가능성을 보인 개인이나 조직(잠재 고객)입니다. 이미 결제한 유료 고객이나 성사된 거래(Closed-won), 단순 연락처 명단과는 구분됩니다.',
        example: '웹사이트에서 제품 데모 신청 양식을 제출한 담당자를 영업 리드로 등록해 유입 경로와 담당자를 배정하고, 실제 유료 전환 전까지는 기존 고객 계정과 분리해 후속 상담을 진행합니다.',
        promptSnippet: '잠재 고객(Sales Lead) 접수·관리 흐름을 만들 때 마케팅·연락 수신 동의 여부, 담당자 배정, 유입 출처, 후속 접촉 이력을 함께 추적하고 유료 고객이나 단순 연락처 목록과 상태를 구분해 줘.',
      },
      en: {
        definition: 'An individual or organization that has expressed interest as a sales opportunity candidate, distinct from paying customers, closed-won deals, or an unvetted raw contact list.',
        example: 'Record someone who submits a demo request form as a sales lead with intake source and assigned owner, tracking outreach before any paid conversion occurs.',
        promptSnippet: 'Design a Sales Lead intake and tracking flow that records consent status, owner assignment, intake source, and follow-up contact history while keeping leads distinct from paying customers and raw contact lists.',
      },
    },
  },
  'customer-relationship-management': {
    aliases: {
      ko: ['CRM', '고객 관리', '고객 관계 관리', '영업 이력 관리', '고객 파이프라인'],
      en: ['CRM', 'customer relationship management', 'customer management', 'sales pipeline CRM'],
    },
    text: {
      ko: {
        definition: '잠재 고객과 기존 고객을 대상으로 상담·영업·지원 상호작용과 거래 이력을 한 흐름으로 관리하는 체계입니다. 단순 스프레드시트 목록이나 특정 상용 제품명과 동일시하지 않습니다.',
        example: '문의 접수부터 상담 메모, 제안 단계, 계약 후 지원 이력까지 고객 단위로 연결해 담당자가 바뀌어도 맥락을 이어서 응대할 수 있게 합니다.',
        promptSnippet: '고객 관계 관리(CRM) 기능을 설계할 때 접근 제어, 중복 고객 병합·방지, 개인정보(PII) 최소화, 담당자 지정, 단계·상태 관리를 포함하고 단순 표나 특정 제품 종속 구조로 두지 말아 줘.',
      },
      en: {
        definition: 'A workflow and system for managing interactions, consultations, sales stages, and support history across leads and existing customers, not synonymous with spreadsheets or any specific vendor product.',
        example: 'Link inquiry notes, consultation history, deal stages, and post-sale support records under a deduplicated account timeline with clear ownership.',
        promptSnippet: 'Architect Customer Relationship Management (CRM) workflows with role-based access control, record deduplication, PII minimization, owner assignment, and explicit status lifecycle management.',
      },
    },
  },
  'coupon-stacking-rule': {
    aliases: {
      ko: ['쿠폰 병행 사용 규칙', '할인 중복 적용', '프로모션 우선순위', '쿠폰 조합 제한'],
      en: ['promotion stacking', 'discount stacking rules', 'coupon combination policy', 'promo exclusivity'],
    },
    text: {
      ko: {
        definition: '장바구니 결제 시 상품 할인, 장바구니 쿠폰, 등급 혜택, 프로모션 코드를 동시에 여러 개 적용할 수 있는지, 불가하다면 어느 순서를 먼저 계산하고 어떤 혜택이 우선하는지 정하는 할인 정책 규칙입니다. 중복 차단 사유를 명확히 보여 주어야 결제 이탈을 줄일 수 있습니다.',
        example: '"신규 20% 쿠폰"과 "주말 5,000원 할인 쿠폰"이 상호 배타 설정일 때, 사용자가 두 번째 쿠폰을 고르면 자동 대체 여부와 할인 금액 비교를 보여 주고 적용 순서를 일관되게 계산합니다.',
        promptSnippet: '쿠폰 중복 적용 규칙을 구현할 때 쿠폰·등급·프로모션 간 병행 허용/배타 매트릭스, 정률·정액 계산 순서, 최소 결제 금액 검증, 부분 취소 시 쿠폰 반환 규칙과 불가 사유 안내를 명확히 설계하세요.',
      },
      en: {
        definition: 'Pricing policy rules determining whether product discounts, cart coupons, promo codes, and loyalty credits can combine at checkout—and in what order they calculate or override one another when mutually exclusive.',
        example: 'When a user enters a promo code that cannot stack with an active cart coupon, explain the conflict and preview which option yields the larger discount.',
        promptSnippet: 'Enforce coupon stacking rules on the backend with an explicit exclusivity matrix, deterministic percent-vs-fixed calculation order, minimum spend re-checks, and clear replacement previews in checkout.',
      },
    },
  },
  'win-back-campaign': {
    aliases: {
      ko: ['윈백 캠페인', '해지 방어 오퍼', '구독 일시정지 전환', '재가입 유도 혜택'],
      en: ['win-back flow', 'churn save offer', 'cancellation deflection', 'reactivation campaign'],
    },
    text: {
      ko: {
        definition: '구독 해지를 시도하거나 이미 만료·이탈한 고객에게 해지 사유를 확인한 뒤 구독 일시정지, 하위 플랜 전환, 일정 기간 할인 혜택 등을 제안해 유지 또는 복귀를 유도하는 리텐션 흐름입니다. 최종 해지 버튼은 가독성 있게 유지하면서 진정성 있는 대안을 제시해야 다크 패턴을 피합니다.',
        example: '구독 해지 설문에서 "잠시 쉬고 싶어요"를 고른 고객에게 해지 대신 1개월 일시정지 옵션을 제안하되, 사용자가 원하면 한 번의 클릭으로 즉시 해지를 마칠 수 있게 둡니다.',
        promptSnippet: '해지 방어와 재구독 유도(Win-Back) 흐름을 설계할 때 해지 사유별 맞춤 대안(일시정지·다운그레이드·유예 할인)을 제시하되 최종 해지 완료 버튼을 숨기거나 방해하지 말고, 혜택 적용 횟수·악용 제한도 서버에서 관리하세요.',
      },
      en: {
        definition: 'A retention and reactivation workflow that offers departing or churned subscribers tailored alternatives—such as pausing, downgrading, or limited-time discounts—while keeping final cancellation transparent and free of dark patterns.',
        example: 'When a canceling user selects "Too expensive right now," offer a downgrade or 30-day pause while keeping the "Confirm cancellation" button clearly accessible.',
        promptSnippet: 'Design win-back and cancel-save flows with reason-matched options (pause, downgrade, limited offer), server-enforced offer eligibility limits, and an unobstructed final cancellation path.',
      },
    },
  },
  'unsubscribe-suppression': {
    aliases: {
      ko: ['수신 거부 목록', '발송 제외 억제 리스트', '마케팅 수신 철회', '옵트아웃 관리'],
      en: ['suppression list', 'opt-out suppression', 'do-not-contact list', 'unsubscribe enforcement'],
    },
    text: {
      ko: {
        definition: '마케팅 이메일, 문자, 푸시 알림 등에서 사용자가 수신 거부를 요청하거나 반송(Hard Bounce)·스팸 신고가 발생한 주소를 전역 제외 목록(Suppression List)에 즉시 등록해 예약된 캠페인이나 재발송 시에도 자동으로 발송을 차단하는 준법·품질 관리 장치입니다. 보안 인증이나 결제 영수증 같은 필수 거래성(Transactional) 알림과는 채널·동의를 분리합니다.',
        example: '예약 발송 3시간 전에 캠페인 대상 스냅샷을 뽑아 두었더라도 실제 발송 직전에 수신 거부 제외 목록과 다시 대조해 방금 수신 거부한 사용자에게는 메일이 나가지 않게 막습니다.',
        promptSnippet: '알림·캠페인 발송 파이프라인에는 원클릭 수신 거부 처리와 즉시 반영되는 제외 목록(Suppression List)을 두고, 예약 발송 직전 최종 필터링과 거래성 필수 알림·마케팅 알림 채널 분리를 반드시 구현하세요.',
      },
      en: {
        definition: 'An authoritative opt-out registry containing unsubscribed recipients, hard bounces, and spam complaints that automatically suppresses promotional deliveries right before send—even for pre-scheduled campaigns—while staying separate from mandatory transactional notices.',
        example: 'Even after snapshotting a scheduled broadcast audience hours earlier, re-check the suppression list at send time so anyone who just unsubscribed is skipped immediately.',
        promptSnippet: 'Enforce unsubscribe suppression lists at final dispatch time (not only at campaign creation), support instant one-click opt-out without login barriers, and strictly separate marketing from transactional messages.',
      },
    },
  },
  'custom-quote-offer': {
    aliases: {
      ko: ['맞춤 견적서', '역제안 오퍼', 'B2B 견적 만료', '마일스톤 견적'],
      en: ['custom proposal', 'counter-offer quote', 'expiring quote', 'B2B custom offer'],
    },
    text: {
      ko: {
        definition: '정형화된 정가 상품 대신 구매자의 요구 범위·수량·일정에 맞춰 판매자나 영업팀이 가격, 작업 범위, 납기, 분할 지급 마일스톤과 유효 만료 기한을 담아 발송하는 맞춤형 거래 제안입니다. 조건 변경이나 역제안이 오갈 때 이전 버전 견적을 무효화하고 수락 당시 가격 조건을 스냅샷으로 고정해야 분쟁이 없습니다.',
        example: '외주 마켓플레이스에서 판매자가 3단계 마일스톤과 7일 유효기간이 적힌 맞춤 견적을 보내면, 구매자가 역제안 시 기존 견적은 대체됨 상태로 닫히고 수락한 견적 금액으로 에스크로 결제가 열립니다.',
        promptSnippet: '맞춤 견적 제안(Custom Quote) 흐름에는 견적 버전·만료 시각 관리, 역제안 시 구버전 무효화, 수락 시점 가격·마일스톤 스냅샷 고정, 그리고 수락 후 계약·결제 연결을 함께 구현하세요.',
      },
      en: {
        definition: 'A tailored commercial proposal specifying custom scope, pricing, delivery schedule, milestone splits, and an expiration deadline. Counter-offers supersede prior revisions, and acceptance snapshots the agreed terms for checkout or contracting.',
        example: 'A marketplace seller sends a 3-milestone quote valid for 7 days; if the buyer submits a counter-offer, the previous quote locks as superseded before the revised terms can be accepted.',
        promptSnippet: 'Build custom quote workflows with versioned revisions, strict expiration timestamps, superseding rules on counter-offers, and immutable term snapshots upon acceptance.',
      },
    },
  },
  'referral-attribution': {
    aliases: {
      ko: ['추천인 귀속', '소개 경로 추적', '레퍼럴 어트리뷰션', '에이전시 소스 귀속'],
      en: ['referral tracking', 'source attribution', 'partner referral credit', 'recruiter source attribution'],
    },
    text: {
      ko: {
        definition: '추천 링크, 초대 코드, 채용 헤드헌팅 에이전시, 파트너 유입을 통해 들어온 가입자나 지원자의 원천(Source)과 기여 주체를 규정에 따라 기록해 보상·수수료 정산의 근거로 삼는 귀속 관리 규칙입니다. 동일 대상이 여러 경로로 중복 유입될 때 최초 접점·최근 접점·유효 소유 기간 중 어느 규칙을 따를지 미리 확정해야 합니다.',
        example: '채용 시스템에서 추천인이 먼저 등록한 후보자가 30일 이내에 다른 경로로 중복 지원하더라도 유효 소유 기간 안의 최초 추천인에게 소개 귀속을 유지하고 타임라인에 근거를 남깁니다.',
        promptSnippet: '추천 유입 귀속(Referral Attribution) 로직에서는 중복 유입 시 우선순위(최초 vs 최근), 소유권 유효 기간 만료, 자기 추천·부정 중복 차단, 그리고 보상·정산 확정 시점(예: 입사 90일·결제 완료)을 명확히 정의하세요.',
      },
      en: {
        definition: 'Rules for crediting a signup, purchase, or job candidate to the referring user, partner, or agency when tracking rewards or fees—explicitly defining precedence, ownership windows, and duplicate-submission resolution.',
        example: 'In an applicant tracking system, keep referral attribution locked to the original agency within a 90-day ownership window if the candidate reapplies directly, logging every source event.',
        promptSnippet: 'Define referral attribution rules with explicit first-touch vs. last-touch precedence, ownership expiration windows, self-referral/fraud checks, and clear qualifying payout events.',
      },
    },
  },
};
