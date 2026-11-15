import type { GlossaryTermBody } from './types';

export const PAYMENTS_SETTLEMENT_GLOSSARY_DATA: Record<string, GlossaryTermBody> = {
  'know-your-customer': {
    aliases: {
      ko: ['KYC', '고객 신원 확인', '판매자 입점 본인인증', '신분증 인증 단계', '한도 상향 심사'],
      en: ['KYC', 'identity verification', 'customer verification', 'seller onboarding KYC'],
    },
    text: {
      ko: {
        definition: '금융·정산·마켓플레이스 서비스가 법적 규제와 부정 거래 방지를 위해 사용자의 실명·사업자·계좌 소유 여부를 단계별로 검증하는 절차입니다.',
        example: '핀테크 지갑이나 오픈마켓에서 미인증 계정은 소액 조회만 허용하고, 신분증·계좌 인증(KYC)을 마쳐야 출금이나 판매자 정산 한도를 열어 줍니다.',
        promptSnippet: '결제·정산·출금 기능이 포함된 서비스에서는 고객 확인 절차(KYC)의 검증 단계(미제출·심사 중·승인·보류)를 분리하고, 미완료 상태의 기능 제한과 반려 사유 재제출 흐름을 설계해 줘.',
      },
      en: {
        definition: 'A regulated verification workflow used by fintech and marketplace platforms to confirm user or merchant identity, business legitimacy, and payout account ownership.',
        example: 'Restrict withdrawals and seller payouts while an account is unverified or pending KYC review, and show clear resubmission guidance if documents are rejected.',
        promptSnippet: 'Structure Know Your Customer (KYC) onboarding with explicit verification states (unverified, under review, approved, rejected), capability limits per tier, and clear resubmission feedback.',
      },
    },
  },
  'escrow-settlement': {
    aliases: {
      ko: ['에스크로 결제 정산', '구매 확정 후 지급', '대금 보관 정산', '정산 보류 및 분쟁 처리'],
      en: ['escrow payout', 'held funds settlement', 'buyer confirmation release', 'marketplace escrow'],
    },
    text: {
      ko: {
        definition: '구매자와 판매자 사이 거래에서 플랫폼이 결제 대금을 안전하게 보관하고 있다가, 구매 확정·배송 완료·마일스톤 검수가 끝난 뒤 수수료를 차감해 정산해 주는 흐름입니다.',
        example: '마켓플레이스에서 구매자가 결제하면 대금은 에스크로 대기 상태로 묶이고, 상품 수령 후 [구매 확정]을 누르거나 자동 확정 기간이 지나면 수수료를 제외한 금액이 판매자에게 정산됩니다.',
        promptSnippet: '마켓플레이스나 외주 거래에는 결제 대금을 즉시 출금시키지 않고 보관 → 구매 확정(또는 기한 만료) → 수수료 차감 정산 → 분쟁 시 지급 보류 상태를 거치는 에스크로 정산 흐름을 적용해 줘.',
      },
      en: {
        definition: 'A marketplace settlement workflow where the platform holds buyer funds safely until delivery confirmation or milestone sign-off, then releases net payouts after fee deduction.',
        example: 'Hold order funds in escrow at checkout and release the seller payout minus platform fees only after buyer confirmation or auto-confirm expiry, pausing payout if a dispute opens.',
        promptSnippet: 'Model escrow settlement with distinct ledger states—held on payment, frozen during active disputes, and released net of platform fees upon buyer confirmation or milestone approval.',
      },
    },
  },
  proration: {
    aliases: {
      ko: ['프로레이션', '중도 변경 차액 계산', '남은 기간 일할 정산', '요금제 업그레이드 차액'],
      en: ['pro-rata billing', 'prorated charge', 'mid-cycle plan adjustment', 'seat proration'],
    },
    text: {
      ko: {
        definition: '구독 결제 주기 도중에 요금제를 변경하거나 팀 좌석 수를 늘리고 줄일 때, 남은 사용 일수·시간 비율에 맞춰 추가 청구액이나 크레딧 차액을 정산하는 규칙입니다.',
        example: '월간 30일 주기 중 15일이 남은 시점에 좌석을 1개 추가하면 전체 한 달 요금이 아니라 남은 15일치 절반 금액만 계산해 청구서에 반영합니다.',
        promptSnippet: '구독 플랜 업그레이드·다운그레이드 또는 좌석 증감 시 결제 주기 남은 기간에 따른 일할 계산(Proration) 적용 여부와 예상 차액·적용 시점(즉시 vs 다음 주기)을 변경 확인 화면에 미리 보여 줘.',
      },
      en: {
        definition: 'A billing calculation that adjusts charges or credits proportionally based on the remaining days in a billing cycle when a plan or seat count changes mid-cycle.',
        example: 'Adding a team seat halfway through a 30-day billing cycle charges roughly half the monthly seat price rather than the full month.',
        promptSnippet: 'Preview prorated charges or credits clearly before confirming mid-cycle plan or seat changes, specifying whether adjustments apply immediately or on the next invoice.',
      },
    },
  },
  'dunning-management': {
    aliases: {
      ko: ['결제 실패 재시도', '미납 독촉 관리', '더닝 프로세스', '카드 갱신 안내'],
      en: ['dunning', 'failed payment recovery', 'payment retry schedule', 'past-due recovery'],
    },
    text: {
      ko: {
        definition: '정기 구독 결제나 자동이체가 잔액 부족·카드 만료 등으로 실패했을 때 정해진 일정에 따라 자동 재청구를 시도하고, 고객에게 결제 수단 교체 안내와 유예 기간을 제공해 비자발적 해지를 줄이는 미납 회수 흐름입니다.',
        example: '월간 구독 결제가 거절되면 1·3·7일 간격으로 스마트 재시도를 수행하는 동안 대시보드 상단 배너로 "카드 만료로 결제 재시도 중 — 수단 변경하기"를 띄우고 최종 실패 시에만 이용 권한을 전환합니다.',
        promptSnippet: '미납 재청구 독촉(Dunning) 흐름에는 실패 사유별 재시도 일정(만료·분실 카드 즉시 안내 vs 일시적 잔액 부족 재시도), 유예 기간(Grace Period) 배너, 결제 수단 즉시 교체와 재시도 트리거, 최종 미납 시 권한 변경 규칙을 함께 설계하세요.',
      },
      en: {
        definition: 'An automated failed-payment recovery workflow for subscriptions and recurring mandates that schedules smart retries, notifies customers to update payment methods during a grace window, and handles final past-due downgrades or cancellations.',
        example: 'After a card renewal fails, retry on days 1, 3, and 7 while displaying a non-blocking billing banner with a direct card-update link before downgrading access on final failure.',
        promptSnippet: 'Design dunning management around error-aware retry schedules, customer notification cadence, an explicit grace window with one-click payment method recovery, and clear final past-due state transitions.',
      },
    },
  },
  'double-entry-ledger': {
    aliases: {
      ko: ['복식 부기 원장', '차변 대변 원장', '불변 원장 기록', '계정 원장 시스템'],
      en: ['double-entry bookkeeping', 'immutable ledger', 'debit credit ledger', 'financial ledger'],
    },
    text: {
      ko: {
        definition: '예치금, 포인트, 에스크로 정산 등 모든 금액 이동을 단일 잔액 숫자 덮어쓰기가 아니라 차변(Debit)과 대변(Credit)이 항상 0으로 합산되는 추가 전용(Append-Only) 분개 기록으로 저장하는 회계 구조입니다. 오류 정정도 기존 행을 수정·삭제하지 않고 반대 방향의 상계 분개(Reversal)로 남깁니다.',
        example: '사용자가 10,000원을 출금 요청하면 가용 계정에서 출금 대기(Hold) 계정으로 이동 분개를 생성하고, 실제 송금 확정 시 출금 대기 계정에서 외부 정산 계정으로 마감을 기록해 총합 균형을 유지합니다.',
        promptSnippet: '예치금·정산·지갑 원장은 단순 balance 컬럼 증감 대신 차변과 대변 합이 일치하는 추가 전용 복식 원장으로 설계하고, 취소·환불은 기존 행 수정이 아닌 역분개(Reversal)와 멱등성 키로 처리하세요.',
      },
      en: {
        definition: 'An append-only financial accounting model where every monetary movement records balanced debit and credit entries across accounts rather than mutating a standalone balance column. Corrections are posted as reversing entries rather than overwriting history.',
        example: 'On a withdrawal request, post a balanced transfer from available wallet funds to a pending hold account, settling out only when bank confirmation arrives.',
        promptSnippet: 'Model wallets, escrow, and payouts with an append-only double-entry ledger where every transaction balances debits and credits, edits use reversing entries instead of updates, and idempotency guards prevent duplicate postings.',
      },
    },
  },
  'usage-based-billing': {
    aliases: {
      ko: ['사용량 기반 과금', '종량 과금', '미터링 과금', '초과 사용량 청구'],
      en: ['metered billing', 'usage metering', 'pay-as-you-go billing', 'overage billing'],
    },
    text: {
      ko: {
        definition: '고정 정액 요금에 더해 API 호출 수, 저장 용량, 전송량, 활성 좌석 수 등 실제 측정된 사용량에 구간 단가나 초과 요율(Overage)을 적용해 주기별 청구 금액을 산정하는 과금 방식입니다. 사용 이벤트 중복 집계를 막는 멱등성과 주기 마감 전 예상 청구액 안내가 핵심입니다.',
        example: '기본 월 10만 건 API 포함 플랜에서 12만 건을 호출하면 대시보드에서 현재 사용률과 초과 2만 건의 예상 추가 요금을 실시간 보여 주고, 주기 종료 시 청구서에 단위별 내역을 합산합니다.',
        promptSnippet: '종량제 과금(Usage-Based Billing) 설계 시 사용 이벤트의 멱등성 중복 제거, 포함량·구간 단가·초과 요율 계산 규칙, 청구 주기 중 실시간 사용량·예상 요금 표시와 임계치 알림을 함께 구현하세요.',
      },
      en: {
        definition: 'A pricing and invoicing model that bills customers according to measured consumption—such as API calls, storage GB, or tokens—either purely pay-as-you-go or as overages above included tier allowances.',
        example: 'A workspace plan includes 100k monthly events and bills overages per 10k block, displaying current cycle consumption and estimated overage charges before invoice finalization.',
        promptSnippet: 'Implement usage-based billing with idempotent usage event ingestion, transparent tier/overage rate formulas, threshold usage alerts, and live mid-cycle estimated spend previews.',
      },
    },
  },
  'payment-reconciliation': {
    aliases: {
      ko: ['결제 대사', '정산 대사 작업', '입출금 대조 검증', 'PG 거래 대사'],
      en: ['reconciliation', 'payout reconciliation', 'settlement matching', 'ledger reconciliation'],
    },
    text: {
      ko: {
        definition: '서비스 내부 주문·원장 기록과 결제 대행사(PG)·은행 실제 입출금 내역을 1:1로 대조해 누락, 중복 입금, 수수료 차이, 상태 불일치(예: 서비스 실패·PG 승인)를 찾아내고 보정하는 정산 검증 절차입니다.',
        example: '매일 자정 PG 정산 내역 파일과 내부 거래 원장을 대조해 금액·거래 ID가 어긋난 3건을 미일치 대기열로 분류하고, 담당자가 원인을 확인해 환불 또는 수동 확정 처리합니다.',
        promptSnippet: '입금 대사 정산(Reconciliation) 화면과 배치를 설계할 때 거래 ID·금액·수수료·정산 일자 대조 기준, 불일치 유형(누락·중복·금액 오차) 분류 큐, 그리고 감사 로그가 남는 수동 조정·해소 흐름을 포함하세요.',
      },
      en: {
        definition: 'The process of matching internal order and ledger records against external payment-gateway or bank settlement reports to detect missing entries, duplicate charges, fee discrepancies, or status mismatches.',
        example: 'A daily reconciliation job compares processor settlement batches against internal wallet entries, surfacing three mismatched items in an exception queue for review and resolution.',
        promptSnippet: 'Build payment reconciliation workflows comparing external settlement files against internal ledger transactions by reference ID, amount, and fees, with explicit exception queues and audited resolution actions.',
      },
    },
  },
  'withholding-tax-settlement': {
    aliases: {
      ko: ['세금 원천징수 정산', '사업소득 3.3% 정산', '세금계산서 정산 차감', '원천세 공제'],
      en: ['tax withholding payout', 'withholding tax deduction', 'payout tax statement', 'net-of-tax settlement'],
    },
    text: {
      ko: {
        definition: '크리에이터·강사·프리랜서·판매자에게 정산 대금을 지급할 때 플랫폼 수수료와 함께 세법상 필요한 원천징수 세액(예: 개인 사업소득세·지방소득세 등)을 미리 공제해 세무 신고·납부하고, 총 지급액·공제 내역·실지급액이 담긴 명세서를 발행하는 정산 처리입니다.',
        example: '개인 크리에이터 수익 1,000,000원에서 플랫폼 수수료와 원천징수 세액을 항목별로 분리 계산해 실지급액을 입금하고, 연말·월별 지급명세서 확인 화면을 제공합니다.',
        promptSnippet: '원천징수 정산 화면·계산 로직에서는 사업자/개인 구분과 세법 확인 상태, 총액·플랫폼 수수료·공제 세액·실지급액의 항목별 반올림 기준, 그리고 수정 시 재계산·증빙 명세서 이력을 명확히 분리하세요.',
      },
      en: {
        definition: 'A payout calculation and reporting workflow where a platform deducts applicable withholding taxes alongside platform fees before disbursing net earnings to creators, instructors, or sellers, generating compliant tax statements.',
        example: 'Before paying out an individual instructor’s earnings, verify tax residency status, itemize gross earnings, platform fee, withheld tax, and net payout on the settlement statement.',
        promptSnippet: 'Design withholding-tax settlement with verified payee tax profiles, itemized breakdowns (gross, fees, tax withheld, net payout), deterministic rounding rules, and immutable payout statements.',
      },
    },
  },
  'partial-refund': {
    aliases: {
      ko: ['부분 취소 환불', '일부 품목 환불', '차액 환불 처리', '잔여 환불 가능액'],
      en: ['partial cancellation refund', 'item-level refund', 'partial credit return', 'remaining refundable balance'],
    },
    text: {
      ko: {
        definition: '전체 주문 가운데 일부 상품·수량만 취소하거나 배송비·사용 일수·쿠폰 할인 배분액을 제외하고 나머지 금액의 일부분만 원결제 수단으로 돌려주는 환불 방식입니다. 여러 차례 부분 환불이 일어날 수 있으므로 최초 결제액에서 누적 환불액을 뺀 잔여 환불 가능 금액 검증이 필수입니다.',
        example: '3만 원과 2만 원 상품 묶음 주문에 5천 원 장바구니 쿠폰을 써서 4만 5천 원을 결제했다면, 한 상품만 반품 시 쿠폰 비례 할인분과 반품 배송비 차감 후 잔여 환불 한도 안에서만 부분 환불을 승인합니다.',
        promptSnippet: '부분 환불 기능을 구현할 때는 원결제 금액 대비 누적 환불액·잔여 환불 가능 한도 검증, 쿠폰·포인트·배송비 정산 배분 규칙, 다중 부분 환불 멱등성 키, 그리고 품목별 환불 진행 상태 표시를 함께 설계하세요.',
      },
      en: {
        definition: 'Refunding only a subset of order items, quantities, or net amounts—after accounting for prorated coupons, points, or return shipping—without canceling the entire transaction. Multiple partial refunds must never exceed the remaining refundable balance.',
        example: 'When a buyer returns one item from a discounted multi-item order, compute net refund after proportional coupon adjustment and enforce remaining refundable balance checks.',
        promptSnippet: 'Implement partial refunds with server-side remaining-balance validation, deterministic coupon/shipping allocation rules, per-request idempotency keys, and line-item refund status tracking.',
      },
    },
  },
};
