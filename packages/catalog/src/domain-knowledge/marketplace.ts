import type { DomainKnowledge } from '../domain-knowledge';

export const MARKETPLACE_KNOWLEDGE: DomainKnowledge[] = [{
  id: 'marketplace-escrow-settlement-and-dispute',
  aliases: {
    ko: ['마켓플레이스', '판매자 정산', '오픈마켓 정산', '구매 확정 에스크로', '수수료 정산 보류'],
    en: ['two-sided marketplace', 'seller payouts', 'escrow settlement', 'platform fee deduction', 'dispute payout hold'],
  },
  useCases: {
    ko: ['구매자와 판매자를 연결하는 마켓플레이스를 만들 때', '구매자 결제 시점과 판매자 정산 가능 시점(구매 확정)을 분리할 때', '중개 수수료·부가세·취소 차감액을 구분해 정산할 때', '분쟁(클레임) 접수 시 정산 보류와 해제를 설계할 때'],
    en: ['Building a two-sided marketplace connecting buyers and sellers', 'Separating buyer payment capture from seller payout release upon confirmation', 'Calculating platform fees, taxes and post-payout reversal deductions', 'Designing payout holds and release rules during buyer-seller disputes'],
  },
  keywords: {
    ko: ['마켓플레이스', '정산', '판매자 정산', '에스크로', '구매 확정', '중개 수수료', '정산 대기', '정산 보류', '차감 정산', '분쟁 조정', '지급 계좌'],
    en: ['marketplace', 'payout', 'settlement', 'seller payout', 'escrow', 'order confirmation', 'platform fee', 'pending balance', 'payout hold', 'payout deduction', 'dispute'],
  },
  text: {
    ko: {
      domain: '마켓플레이스·정산',
      title: '구매 확정·수수료 차감·정산 대기와 분쟁 보류 흐름',
      summary: '구매자 결제와 판매자 지급 가능 상태를 분리하고, 구매 확정·수수료·분쟁 보류·차감 정산을 연결합니다.',
      overview: '구매자가 돈을 결제한 순간 그 금액이 곧바로 판매자가 출금할 수 있는 돈이 되는 것은 아닙니다. 거래 이행과 구매 확정, 플랫폼 수수료 차감, 분쟁 발생 시 지급 보류, 이미 지급된 뒤 취소되었을 때의 다음 정산 차감까지 나누어 설계해야 장부와 실제 지급액이 일치합니다. 아래 내용은 마켓플레이스·정산 흐름을 설계하기 위한 참고이며 특정 플랫폼의 수수료율이나 지급 주기를 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '구매자 결제와 판매자 정산금 분리', description: '구매자가 지불한 총결제액과 플랫폼이 보관 중인 에스크로 금액, 판매자에게 실제 지급할 정산 대상 금액을 별도 원장으로 관리합니다.' },
        { name: '정산 대기·확정·지급 완료 상태', description: '결제 완료 → 이행 완료 → 구매 확정(정산 대상) → 지급 예정 → 지급 완료(또는 지급 실패·보류) 단계를 구분합니다. 구매자가 직접 확정하지 않을 때의 자동 확정 기한도 정해야 합니다.' },
        { name: '수수료·할인 부담 주체와 세금 계산', description: '중개 수수료, 결제 대행 수수료, 프로모션 쿠폰 비용을 플랫폼과 판매자 중 누가 얼마나 부담하는지 거래 시점 기준으로 고정합니다.' },
        { name: '분쟁 접수와 정산 보류(Hold)', description: '미수령·불량 등으로 분쟁이 접수되면 해당 거래의 정산을 즉시 보류로 전환하고, 합의나 중재 결과에 따라 지급 재개 또는 결제 취소 반환으로 연결합니다.' },
        { name: '지급 후 취소와 차감 정산(Clawback)', description: '이미 판매자에게 정산금이 지급된 거래가 사후 취소되었을 때 다음 정산 예정 금액에서 차감할지 별도 입금을 요청할지 규칙을 정합니다.' },
      ],
      workflow: [
        { name: '거래 시점의 요율과 부담 기준 고정하기', description: '거래 성사 시점의 상품가·할인 분담·수수료율을 스냅샷으로 남겨 이후 요율 정책이 바뀌어도 기존 정산 계산이 흔들리지 않게 합니다.' },
        { name: '이행 확인과 구매 확정 연결하기', description: '용역 완료나 수령 확인 후 구매자가 확정하거나 일정 기간 분쟁 신청이 없으면 정산 가능 잔액으로 전환합니다.' },
        { name: '분쟁 보류와 지급 제외 적용하기', description: '정산일 전에 분쟁이나 계좌 오류가 발생한 건은 지급 대상에서 제외해 보류 사유를 판매자에게 알립니다.' },
        { name: '정산 내역서 제공과 지급 실패 복구하기', description: '건별 원금·수수료·차감액·실지급액을 대조할 수 있는 내역서를 제공하고, 계좌 불일치로 지급이 실패하면 재지급 절차를 안내합니다.' },
      ],
      pitfalls: [
        { name: '구매자 결제 완료 즉시 판매자 출금 가능 잔액에 더하기', description: '이행 전 취소나 분쟁이 발생했을 때 이미 판매자가 출금해 버리면 회수가 어렵습니다. 정산 대기와 출금 가능 잔액을 분리하세요.' },
        { name: '쿠폰 할인을 적용하면서 수수료 기준 금액을 모호하게 두기', description: '플랫폼 지원 쿠폰인지 판매자 자체 할인인지에 따라 판매자 정산 원금이 달라집니다. 할인 부담 주체와 수수료 부과 기준을 명확히 기록하세요.' },
        { name: '정산 지급 실패를 지급 완료로 처리해 잔액만 비우기', description: '은행 점검이나 계좌 오류로 이체가 실패했을 때 정산 상태가 완료로 굳어지면 지급 누락이 됩니다. 이체 요청과 실제 입금 완료를 구분하세요.' },
      ],
      questions: [
        '구매 확정 기준은 구매자 직접 클릭인가요, 이행 완료 후 일정 기간 경과 시 자동 확정되나요?',
        '중개 수수료·결제 수수료·할인 쿠폰 비용은 플랫폼과 판매자 중 누가 어떤 기준으로 부담하나요?',
        '정산 방식은 주간·월간 자동 지급인가요, 판매자가 출금 가능 잔액 범위에서 직접 출금을 신청하나요?',
        '분쟁이나 취소 요청이 들어오면 해당 건만 정산 보류하나요, 판매자의 전체 출금을 일시 제한하나요?',
        '이미 정산 지급이 끝난 거래가 취소되면 다음 정산금에서 차감하나요, 마이너스 잔액을 어떻게 관리하나요?',
        '판매자 지급 계좌 검증이나 세금계산서·원천징수 증빙 확인이 완료되기 전에는 정산금을 어떻게 보관하나요?',
      ],
      example: '예시: 외주 마켓에서 작업물 전달 후 7일 동안 분쟁 신청이 없으면 자동 구매 확정으로 전환하고, 수수료 10%를 제외한 금액을 매주 금요일에 지급하되 분쟁 접수 건은 해결될 때까지 보류 상태로 남기는 방식을 생각할 수 있습니다. 실제 수수료 구조·자동 확정 기한·차감 규칙은 사업 정책에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'ly-sortable-data-table', reason: '판매자 정산 내역이나 거래 목록을 항목·금액 기준으로 오름차순·내림차순 정렬해 비교하는 표현에 참고할 수 있습니다. 실제 정산 집계와 서버 정렬은 별도로 구현해야 합니다.' },
        { id: 'ly-expandable-data-rows', reason: '정산 요약 행을 펼쳐 거래 원금·수수료·보류 사유 등 세부 항목을 확인하는 표현에 참고할 수 있습니다. 실제 지급 처리와 내역 조회는 구현하지 않습니다.' },
      ],
      promptSnippet: '마켓플레이스(중개 플랫폼)의 구매 확정·수수료 차감·판매자 정산·분쟁 보류 흐름을 설계해 줘. 먼저 구매 확정 조건과 자동 확정 기한, 수수료 및 할인 비용 분담 기준, 정산 주기 또는 출금 신청 방식, 분쟁 접수 시 보류 범위, 지급 후 취소 시 차감 정산 정책을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 구매자·판매자·운영자가 각 거래 및 정산 단계에서 볼 금액 정보와 가능한 행동.\n2. 정산 대기(에스크로)·구매 확정·보류·지급 요청·지급 완료·지급 실패·차감 상태의 전환.\n3. 거래 원금, 할인 부담금, 중개 수수료, 세금, 실지급액의 계산 및 스냅샷 보존 규칙.\n4. 분쟁 발생·계좌 이체 실패·지급 후 취소로 인한 마이너스 잔액 발생 시 처리 방식과 안내.\n5. 판매자 정산 요약·건별 정산 상세 표·보류 안내·지급 계좌 설정 화면의 연결.\n구매자 결제 완료를 곧바로 판매자 출금 가능 상태로 다루지 말고, 예시 정책과 디자인 데모를 실제 정산·이체 시스템으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Marketplace & Payouts',
      title: 'Order confirmation, fee deduction, payout holds and dispute resolution',
      summary: 'Separate buyer payment capture from seller payout eligibility, and connect confirmation, fees, dispute holds and deductions.',
      overview: 'In a two-sided marketplace, capturing a buyer’s payment does not immediately make those funds withdrawable by the seller. Separating held escrow balances, buyer confirmation, platform fee and discount allocation, dispute holds, and post-payout reversals keeps seller ledgers accurate. These concepts are design references, not default commission rates or payout schedules for a specific marketplace.',
      concepts: [
        { name: 'Buyer payment versus seller payable balance', description: 'Track gross buyer payment, held escrow funds and net seller payable balance as distinct ledger states rather than a single balance.' },
        { name: 'Pending, eligible, held and paid states', description: 'Distinguish paid-in-escrow, delivered, confirmed (eligible for payout), scheduled, paid and failed/held states, including auto-confirmation windows.' },
        { name: 'Platform fees, discount allocation and taxes', description: 'Snapshot whether promotions or coupons are funded by the platform or the seller so commission and net payout calculations remain immutable.' },
        { name: 'Disputes and payout holds', description: 'When a buyer opens a dispute for non-delivery or defects, freeze payout eligibility for that transaction until the dispute is resolved.' },
        { name: 'Post-payout reversals and negative balances', description: 'Define how cancellations or chargebacks after a completed payout are recovered, such as offsetting future payouts.' },
      ],
      workflow: [
        { name: 'Snapshot fee and discount terms at transaction time', description: 'Record item price, discount bearer and fee rate when the order is placed so later rate changes do not alter pending settlements.' },
        { name: 'Connect delivery and buyer confirmation to eligibility', description: 'Move funds from pending escrow to payable balance when the buyer confirms receipt or the auto-confirmation window elapses.' },
        { name: 'Apply dispute holds and exclusion rules', description: 'Exclude disputed or unverified-account transactions from scheduled payout runs and show sellers the exact hold reason.' },
        { name: 'Provide itemized settlement statements and failure recovery', description: 'Break down gross amount, fees, holds and net payout per line item, and guide sellers when bank transfers fail.' },
      ],
      pitfalls: [
        { name: 'Making buyer payments immediately withdrawable by sellers', description: 'If sellers withdraw funds before fulfillment or during a dispute window, recovering canceled transactions becomes difficult. Keep escrow and withdrawable balances separate.' },
        { name: 'Leaving coupon funding and fee base ambiguous', description: 'Seller-funded discounts and platform-funded promos affect net seller payout differently. Explicitly store who bears each discount.' },
        { name: 'Marking payouts complete when the transfer is only initiated', description: 'Bank rejections or invalid account numbers can fail asynchronously. Separate payout initiation from confirmed bank settlement.' },
      ],
      questions: [
        'What makes a transaction eligible for seller payout—explicit buyer confirmation, delivery tracking or an auto-confirmation timer?',
        'How are platform fees, payment-processing fees and promotional discounts split between the platform and the seller?',
        'Are payouts sent on a fixed schedule or requested on demand from an available balance?',
        'When a dispute is opened, is only that transaction’s amount held or is the seller’s entire payout paused?',
        'If a transaction is reversed after payout, is the amount deducted from future payouts, and how are negative balances handled?',
        'How are pending funds held while seller bank verification or tax documentation is still incomplete?',
      ],
      example: 'Example: a freelance marketplace could hold buyer payments in escrow, move them to payable status 7 days after delivery if no dispute is opened, deduct a 10% fee on weekly Friday payouts, and hold disputed orders until resolved. Confirm actual fee rules, hold windows and reversal policies before adopting this setup.',
      relatedDesigns: [
        { id: 'ly-sortable-data-table', reason: 'A reference for sorting settlement or transaction rows by name or amount. Real ledger aggregation and server sorting need separate implementation.' },
        { id: 'ly-expandable-data-rows', reason: 'A reference for expanding a settlement summary row to inspect gross amount, fees and hold details. It does not implement payout execution.' },
      ],
      promptSnippet: 'Help design a marketplace escrow, settlement and seller-payout workflow. First confirm payout-eligibility triggers and auto-confirmation windows, fee and discount allocation rules, scheduled versus on-demand payouts, dispute hold scope, and post-payout deduction handling. Do not assume undecided rules.\nBased on the answers, describe:\n1. Financial details and actions visible to buyers, sellers and operators at each stage.\n2. Transitions across escrow pending, confirmed/eligible, held, payout initiated, paid, failed and deducted states.\n3. Snapshot and calculation rules for gross price, discount bearer, fees, taxes and net payout.\n4. Handling and seller guidance for disputes, bank transfer failures and negative balances after reversals.\n5. How balance summaries, itemized settlement tables, hold notices and payout-account settings connect.\nDo not treat buyer payment capture as immediately withdrawable seller funds, and do not mistake example policies or design demos for a real ledger or payout system.',
    },
  },
  sources: [
    { title: 'Stripe Docs — Stripe Connect payouts and balances', url: 'https://docs.stripe.com/connect/payouts' },
    { title: 'PayPal Developer — Marketplace delayed disbursements', url: 'https://developer.paypal.com/docs/multiparty/checkout/delayed-disbursement/' },
  ],
}, {
  id: 'marketplace-seller-onboarding-kyc-and-payout-account',
  aliases: {
    ko: ['판매자 입점 심사', '판매자 본인 사업자 인증', '정산 계좌 인증', '미인증 판매자 출금 제한'],
    en: ['seller onboarding KYC', 'merchant verification', 'payout bank verification', 'onboarding payout hold'],
  },
  useCases: {
    ko: ['개인·사업자 판매자의 입점 신청과 신원·사업자 서류 심사를 설계할 때', '입점 심사 완료 전 상품 등록·판매 개시·정산금 출금의 허용 범위를 나눌 때', '정산 입금 계좌의 예금주 실명 일치 확인과 계좌 변경 시 재검증을 다룰 때', '서류 보완(반려) 요청이나 정기 재인증 미이행 시 판매·출금 보류를 안내할 때'],
    en: ['Designing individual and business seller onboarding and document verification', 'Separating catalog setup, live selling and payout withdrawal permissions by verification state', 'Verifying payout bank-account ownership and re-verifying upon account changes', 'Handling document rejection resubmissions and payout holds when verification expires'],
  },
  keywords: {
    ko: ['판매자 입점', '입점 심사', '사업자 인증', '신원 확인', '정산 계좌', '예금주 확인', '서류 반려', '보완 요청', '출금 제한'],
    en: ['seller onboarding', 'KYC verification', 'business verification', 'payout account', 'account holder check', 'document rejection', 'resubmission', 'selling restriction', 'payout hold'],
  },
  text: {
    ko: {
      domain: '마켓플레이스·정산',
      title: '판매자 입점 심사·사업자/계좌 인증과 미인증 상태의 판매·출금 제한',
      summary: '판매자 유형별 신원·사업자 심사와 정산 계좌 인증을 연결하고, 단계별 판매·출금 허용 범위를 구분합니다.',
      overview: '마켓플레이스에서 판매자가 가입했다고 해서 곧바로 상품을 팔거나 정산금을 출금할 수 있게 하면 명의 불일치나 세무·정산 사고가 발생합니다. 개인·개인사업자·법인 유형에 맞는 신원·사업자 확인, 판매자 명의와 일치하는 정산 계좌 인증, 심사 대기·서류 보완 상태에서의 상품 준비와 실제 판매·출금 제한을 나누어 설계해야 합니다. 아래 내용은 판매자 입점·계좌 인증 흐름을 설계하기 위한 참고이며 특정 국가의 법령이나 결제 대행사 기준을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '판매자 유형(개인·사업자)과 필수 증빙 분리', description: '개인 판매자와 개인·법인 사업자에 따라 필요한 식별 정보, 사업자등록 증빙, 세금 정산 방식이 다르므로 입점 유형을 먼저 구분합니다.' },
        { name: '단계별 권한 분리(상품 준비·판매 노출·정산 출금)', description: '가입 직후 상품 임시 저장본 작성까지 허용할지, 신원 확인 후 판매를 열고 계좌 인증 완료 후 출금을 열지 단계별 허용 범위를 구분합니다.' },
        { name: '정산 계좌 예금주 일치와 변경 시 보류', description: '입금받을 은행 계좌의 예금주가 인증된 판매자(또는 사업자 대표·법인명)와 일치하는지 확인하고, 계좌 변경 시 재인증 전까지 이체를 보류합니다.' },
        { name: '서류 반려 사유 안내와 보완 재제출', description: '이미지 흐림·정보 불일치·유효기간 만료 등 구체적인 반려 사유를 항목별로 알려 주고, 전체 입력을 처음부터 다시 쓰지 않고 해당 항목만 보완하게 합니다.' },
      ],
      workflow: [
        { name: '판매자 유형 선택과 필수 항목 체크리스트 제시하기', description: '입점 유형을 고르면 완료해야 할 기본 정보, 증빙 서류, 정산 계좌 인증 단계와 현재 진행 상태를 보여 줍니다.' },
        { name: '증빙 제출과 심사 대기 중 허용 동작 안내하기', description: '서류 제출 후 심사 대기 상태임을 표시하고, 심사 중에 미리 해 둘 수 있는 상점 프로필·상품 준비 작업과 제한된 작업을 구분해 안내합니다.' },
        { name: '항목별 반려 사유 확인과 부분 재제출하기', description: '반려된 경우 어느 서류나 입력값이 왜 반려되었는지 표시하고 해당 항목만 수정해 다시 심사를 요청하게 합니다.' },
        { name: '계좌 인증 완료와 정산 보류 해제 연결하기', description: '신원·사업자 승인 및 정산 계좌 예금주 확인이 모두 끝나면 보류 중이던 판매 노출이나 정산 지급 가능 상태를 활성화합니다.' },
      ],
      pitfalls: [
        { name: '계좌 인증 없이 판매부터 열어 두고 정산일에 이체 실패 쌓기', description: '판매는 허용했는데 정산 계좌가 없거나 예금주가 다르면 정산금이 묶여 분쟁이 생깁니다. 판매 개시 조건과 출금 가능 조건을 명확히 안내하세요.' },
        { name: '서류 한 개만 흐린데 입점 신청서 전체를 처음부터 다시 쓰게 하기', description: '통장 사본만 다시 올리면 되는데 이미 통과한 기본 정보까지 초기화하면 이탈이 커집니다. 통과한 항목은 유지하고 반려 항목만 열어야 합니다.' },
        { name: '운영 중인 판매자가 계좌를 바꿨을 때 검증 전에 바로 다음 정산금을 보내기', description: '계좌 변경 요청이 검증되기 전에 자동 정산 배치가 돌면 잘못된 계좌로 송금되거나 실패합니다. 검증 완료 전까지는 이전 인증 계좌 유지 또는 보류 규칙을 두세요.' },
      ],
      questions: [
        '입점 가능한 판매자 유형(개인, 개인사업자, 법인사업자, 해외 판매자)은 무엇이며 유형별 필수 서류는 무엇인가요?',
        '심사 완료 전에도 상품 임시 저장본 작성은 가능한가요, 아니면 심사 승인 후에야 상품 등록 화면이 열리나요?',
        '신원·사업자 심사와 정산 계좌 인증 중 무엇이 완료되어야 실제 판매 노출이 가능하고, 무엇이 완료되어야 출금이 가능한가요?',
        '서류 반려 시 판매자에게 어떤 사유를 보여주며, 재제출 횟수 제한이나 기한이 있나요?',
        '이미 활동 중인 판매자가 상호·대표자·정산 계좌를 변경할 때 진행 중인 판매와 예정된 정산금은 어떻게 처리하나요?',
      ],
      example: '예시: 오픈마켓 입점 시 사업자 정보 입력·증빙 업로드·정산 계좌 1원 인증의 3단계를 체크리스트로 안내하고, 심사 중에도 상품 작업본 작성은 허용하되 판매 개시는 사업자 승인 후, 정산 지급은 예금주 일치 계좌 인증 완료 후에 열리도록 구성할 수 있습니다. 실제 필수 서류·실명 확인 수단·보류 해제 조건은 운영 및 결제 정책에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'onboarding-progress-checklist', reason: '판매자 입점에 필요한 기본 정보·서류 제출·계좌 인증 단계의 완료율과 남은 할 일을 보여주는 표현에 참고할 수 있습니다. 실제 서류 심사와 계좌 인증은 별도로 구현해야 합니다.' },
        { id: 'linked-form-error-summary', reason: '입점 신청서에서 누락되거나 반려된 필수 입력 항목을 상단 요약으로 모아서 해당 입력칸으로 바로 이동시키는 표현에 참고할 수 있습니다. 실제 서버 검증은 구현하지 않습니다.' },
      ],
      promptSnippet: '마켓플레이스 판매자 입점 심사(신원·사업자 확인)와 정산 계좌 인증 및 판매·출금 제한 흐름을 설계해 줘. 먼저 판매자 유형별 필수 정보와 서류, 심사 전 상품 작업본 작성 허용 여부, 판매 노출 가능 조건과 정산 출금 가능 조건의 분리, 서류 반려 시 부분 보완 방식, 기존 판매자의 계좌·사업자 정보 변경 시 정산 보류 규칙을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 가입 직후·심사 대기·보완 필요(반려)·판매 가능(계좌 미인증)·정산 가능 상태별 허용 행동과 제한 안내.\n2. 판매자 유형(개인·개인사업자·법인)별 입력 항목과 정산 계좌 예금주 일치 검증 흐름.\n3. 서류 반려 시 항목별 사유 표시와 통과 항목을 유지한 부분 재제출 규칙.\n4. 운영 중인 판매자의 정산 계좌·사업자 정보 변경 시 재인증 대기 및 예정 정산금 처리.\n5. 입점 체크리스트·신청 폼 오류 요약·심사 상태 배너·정산 계좌 관리 화면의 연결.\n입점 가입만으로 판매·출금이 모두 열린다고 가정하지 말고, 예시 정책과 디자인 데모를 실제 본인 확인·계좌 검증 시스템으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Marketplace & Payouts',
      title: 'Seller onboarding verification, payout-account checks and selling/payout holds',
      summary: 'Connect seller identity and business verification with payout-account ownership checks and staged selling or withdrawal limits.',
      overview: 'Letting new marketplace sellers list items or withdraw funds before verifying their identity, business registration and bank account ownership invites payout failures and compliance issues. Separating individual versus business onboarding requirements, staging permissions across catalog preparation, live selling and payout release, and handling document rejections or bank-account updates without losing progress keeps seller onboarding reliable. These concepts are design references, not default legal or payment-processor requirements.',
      concepts: [
        { name: 'Seller entity types and required verification artifacts', description: 'Distinguish individual sellers, sole proprietors and corporations early because tax identifiers, business documents and legal account-holder names differ.' },
        { name: 'Staged capability gates (prepare, sell, withdraw)', description: 'Define clearly what an unverified seller can do—such as preparing unsaved product listings—versus what requires identity approval or verified payout banking.' },
        { name: 'Payout account ownership and change holds', description: 'Verify that the bank account holder matches the verified seller or business entity, and pause scheduled payouts while a bank-account change is pending verification.' },
        { name: 'Targeted document rejection and resubmission', description: 'Record specific rejection reasons per field or document so sellers can replace only the unreadable or mismatched item without redoing approved steps.' },
      ],
      workflow: [
        { name: 'Present entity-specific onboarding checklist', description: 'Once the seller chooses an account type, show the required profile, verification document and bank-account steps with live completion status.' },
        { name: 'Communicate allowed actions while review is pending', description: 'Show a clear under-review state and indicate whether sellers can prepare catalog working copies while live store exposure and payouts remain gated.' },
        { name: 'Surface item-level rejection reasons for resubmission', description: 'Highlight which specific document or field failed review, explain why and let the seller re-upload just that requirement.' },
        { name: 'Unlock selling and payout capabilities upon verification', description: 'Enable live listings and release held payable balances once identity, business and bank-account checks all pass.' },
      ],
      pitfalls: [
        { name: 'Allowing live sales without a clear path to verified payout banking', description: 'If sellers accumulate orders before discovering their bank account cannot be verified, funds sit trapped in escrow. State selling and payout gates upfront.' },
        { name: 'Resetting the entire onboarding form when one document is rejected', description: 'Forcing a seller to re-enter tax and profile details because one uploaded image was blurry causes high drop-off. Preserve approved sections.' },
        { name: 'Sending a scheduled payout to a newly edited, unverified bank account', description: 'When an active seller updates bank details, hold transfers or require verification before the next payout batch runs.' },
      ],
      questions: [
        'Which seller types (individual, sole proprietor, corporation) are supported, and what documents are required for each?',
        'Can sellers prepare product working copies before verification completes, or is catalog creation blocked until approval?',
        'Which verification steps unlock live product selling, and which steps unlock payout withdrawals?',
        'When a submission is rejected, how are per-document reasons shown and how does partial resubmission work?',
        'If an active seller changes their business registration or payout bank account, how are live listings and upcoming payouts handled during re-verification?',
      ],
      example: 'Example: a marketplace could guide new sellers through a three-step checklist (Business Details, Document Upload, Bank Micro-deposit Check), allow preparing product working copies during review, unlock live selling after business approval, and unlock Friday payouts once the bank account holder matches the verified entity. Confirm actual compliance requirements, verification providers and hold rules before adopting this setup.',
      relatedDesigns: [
        { id: 'onboarding-progress-checklist', reason: 'A reference for showing seller onboarding steps, completion progress and remaining verification tasks. Document review and bank verification need separate implementation.' },
        { id: 'linked-form-error-summary', reason: 'A reference for summarizing missing or rejected onboarding fields at the top of a form and jumping to each input. Server-side validation needs separate implementation.' },
      ],
      promptSnippet: 'Help design a marketplace seller onboarding, verification and payout-account workflow. First confirm supported seller entity types and required documents, whether sellers can prepare product working copies during review, separate gates for live selling versus payout withdrawal, partial resubmission on rejection, and hold rules when active sellers change bank details. Do not assume undecided rules.\nBased on the answers, describe:\n1. Allowed and blocked actions across unverified, pending review, action-required, selling-enabled and payout-enabled states.\n2. Entity-specific inputs and bank account-holder matching rules.\n3. Per-item rejection feedback and partial resubmission without losing approved fields.\n4. Re-verification and payout-hold behavior when an active seller updates bank or business details.\n5. How onboarding checklists, form error summaries, review status banners and payout-account settings connect.\nDo not assume account creation immediately unlocks selling and payouts, and do not mistake example policies or design demos for a real KYC or banking verification integration.',
    },
  },
  sources: [
    { title: 'Stripe Docs — Connect onboarding and identity verification requirements', url: 'https://docs.stripe.com/connect/identity-verification' },
    { title: 'Shopify Help Center — Shopify Payments merchant verification and payout holds', url: 'https://help.shopify.com/en/manual/payments/shopify-payments/onboarding' },
  ],
}, {
  id: 'marketplace-multi-seller-cart-and-split-shipping',
  aliases: {
    ko: ['복수 판매자 장바구니', '입점사별 배송비 분리', '부분 취소 배송비 재계산', '판매자별 주문 분리 정산'],
    en: ['multi-seller cart checkout', 'per-seller shipping fee', 'split-order fulfillment', 'partial refund shipping recalculation'],
  },
  useCases: {
    ko: ['구매자가 한 번에 여러 판매자의 상품을 장바구니에 담아 합산 결제할 때', '판매자(출고지)별로 묶음 배송비와 무료 배송 기준 금액을 따로 계산할 때', '단일 결제 주문을 판매자별 하위 주문(Sub-order)으로 쪼개 배송·구매 확정을 독립 처리할 때', '특정 판매자 상품만 부분 취소·반품할 때 무료 배송 조건 깨짐과 쿠폰 안분을 정산할 때'],
    en: ['Allowing buyers to pay once for a cart containing items from multiple sellers', 'Calculating shipping fees and free-shipping thresholds independently per seller', 'Splitting a single buyer checkout into seller sub-orders for independent fulfillment and confirmation', 'Recalculating seller shipping fees and apportioned discounts when one item is partially canceled'],
  },
  keywords: {
    ko: ['복수 판매자 결제', '합산 결제', '하위 주문 분리', '판매자별 배송비', '묶음 배송 조건', '부분 취소', '배송비 재계산', '할인 안분'],
    en: ['multi-seller checkout', 'split order', 'sub-order', 'per-seller shipping', 'free-shipping threshold', 'partial cancellation', 'shipping recalculation', 'discount proration'],
  },
  text: {
    ko: {
      domain: '마켓플레이스·정산',
      title: '복수 판매자 합산 결제·배송비 판매자별 분리와 부분 취소 정산',
      summary: '구매자의 단일 결제를 판매자별 하위 주문으로 나누고, 판매자별 배송비·할인 안분·부분 취소 정산을 연결합니다.',
      overview: '오픈마켓에서 구매자는 여러 상점의 상품을 한 번에 결제하지만, 실제 포장과 발송·구매 확정·정산은 판매자마다 따로 돌아갑니다. 전체 장바구니 총액이 아니라 판매자별 금액 기준으로 묶음 배송비를 계산해야 하며, 한 판매자의 상품이 품절되거나 구매자가 일부만 취소했을 때 다른 판매자 주문은 영향받지 않도록 하위 주문을 분리하고 할인 금액과 배송비 변동을 정산 원장에 정확히 반영해야 합니다. 아래 내용은 복수 판매자 결제·분리 정산 흐름을 설계하기 위한 참고이며 특정 마켓의 배송비 정책을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '구매자 통합 주문(Parent order)과 판매자 하위 주문(Sub-order)', description: '구매자 결제 영수증 기준의 상위 주문 번호 아래에 판매자별 하위 주문과 상품 행(Line item)을 두어, 배송 추적·구매 확정·정산을 판매자 단위로 독립시킵니다.' },
        { name: '판매자(출고지)별 묶음 배송비와 무료 배송 기준', description: '장바구니 안에서 판매자별로 소계를 묶어 해당 판매자의 기본 배송비와 조건부 무료 배송 달성 여부를 각각 계산합니다.' },
        { name: '장바구니 공통 할인 쿠폰의 판매자별 안분(Proration)', description: '여러 판매자 상품에 걸친 정액 할인을 적용할 때 각 상품 가격 비율대로 할인액을 나누어 기록해야 부분 취소 시 환불액과 판매자 정산 원금이 어긋나지 않습니다.' },
        { name: '부분 취소·품절 시 무료 배송 조건 변동과 배송비 정산', description: '판매자 조건부 무료 배송을 받은 뒤 일부 상품을 구매자 변심으로 취소해 기준 금액 미만이 되었을 때, 초기 배송비를 환불액에서 차감할지 판매자 귀책(품절)과 구분할지 정합니다.' },
      ],
      workflow: [
        { name: '장바구니와 결제 화면에서 판매자별 묶음과 배송비 표시하기', description: '상품을 판매자별로 그룹화해 각 묶음의 상품 합계, 배송비, 무료 배송까지 남은 금액과 전체 총결제액을 구분해 보여 줍니다.' },
        { name: '단일 결제 완료 후 판매자별 하위 주문으로 분리 발주하기', description: '결제가 승인되면 각 판매자에게는 자신의 하위 주문 내역과 정산 기준 금액만 전달해 독립적으로 발송 처리하게 합니다.' },
        { name: '하위 주문·상품 단위의 독립 구매 확정과 부분 취소 처리하기', description: '먼저 도착한 판매자 상품은 먼저 구매 확정해 정산 대상으로 넘기고, 다른 판매자 상품의 배송 지연이나 취소와 분리합니다.' },
        { name: '부분 취소 사유에 따른 환불액·판매자 배송비 정산 맞추기', description: '판매자 품절인지 구매자 단순 변심인지에 따라 배송비 부담 주체와 안분된 할인 차감액을 계산해 구매자 환불액과 판매자 정산금을 맞춥니다.' },
      ],
      pitfalls: [
        { name: '전체 장바구니 합계만으로 무료 배송을 판정해 개별 판매자에게 무임승차 배송비 떠넘기기', description: 'A 상점 4만 원, B 상점 5천 원인데 전체 4만 5천 원이라고 B 상점 배송비까지 0원으로 만들면 B 상점 정산에서 배송비 손실이 납니다. 배송비 주체별로 계산하세요.' },
        { name: '한 판매자가 품절 취소했을 때 같은 결제의 다른 판매자 주문까지 통째로 취소하기', description: '단일 결제 트랜잭션이라고 해서 주문 상태까지 하나로 묶으면 이미 발송 준비 중인 다른 판매자까지 피해를 봅니다. 부분 환불과 하위 주문 상태를 분리하세요.' },
        { name: '정액 장바구니 쿠폰을 안분하지 않아 부분 취소 후 남은 금액 합계가 틀어지기', description: '할인액을 특정 상품 하나에만 몰아 두면 그 상품을 취소할 때 환불액이 0원이 되거나 음수가 됩니다. 결제 시점에 상품별 할인 안분액을 고정하세요.' },
      ],
      questions: [
        '구매자가 한 번에 결제할 수 있는 판매자 수 제한이 있으며, 배송비와 무료 배송 기준은 판매자(또는 출고지)별로 따로 계산하나요?',
        '장바구니 전체에 적용되는 플랫폼 쿠폰과 개별 판매자 쿠폰을 함께 쓸 때 할인 금액은 상품별로 어떻게 안분하나요?',
        '복수 판매자 주문 중 한 판매자의 상품만 품절되거나 구매자가 부분 취소할 때 나머지 판매자 주문은 그대로 진행되나요?',
        '조건부 무료 배송을 적용받은 판매자 묶음에서 일부 상품을 취소해 무료 배송 기준 미만이 되면 초기 배송비는 어떻게 차감하나요(구매자 변심 vs 판매자 품절)?',
        '배송비는 판매자 정산 시 수수료 부과 대상에 포함되나요, 별도 항목으로 정산되나요?',
      ],
      example: '예시: 오픈마켓 장바구니에서 상품을 판매자 카드별로 묶어 판매자당 3만 원 이상 무료 배송을 각각 계산하고, 장바구니 공통 쿠폰은 상품 금액 비율로 원 단위 안분해 저장하며, 일부 상품 변심 취소로 판매자 합계가 3만 원 미만이 되면 환불금에서 초기 배송비 3,000원을 차감해 판매자에게 정산하도록 구성할 수 있습니다. 실제 배송비 수수료율·단수 처리·귀책 사유별 차감 규칙은 정산 정책에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'ly-expandable-data-rows', reason: '통합 주문 행을 펼쳐 판매자별 하위 주문의 배송 상태, 상품 금액, 배송비, 할인 안분 내역을 확인하는 표현에 참고할 수 있습니다. 실제 분할 결제 취소와 정산 계산은 별도로 구현해야 합니다.' },
        { id: 'mixed-state-checkbox-group', reason: '장바구니에서 전체 선택 또는 판매자 묶음별 상품 선택·해제를 부분 선택(indeterminate) 상태와 함께 다루는 표현에 참고할 수 있습니다. 실제 판매자별 배송비 합산은 구현하지 않습니다.' },
      ],
      promptSnippet: '마켓플레이스의 복수 판매자 합산 결제·판매자별 배송비 분리·하위 주문 분할 및 부분 취소 정산 흐름을 설계해 줘. 먼저 판매자별 묶음 배송비와 무료 배송 기준, 장바구니 공통 쿠폰의 상품별 안분 방식, 상위 통합 주문과 판매자 하위 주문 분리 구조, 부분 취소(구매자 변심 vs 판매자 품절) 시 무료 배송 조건 깨짐과 배송비 정산 규칙을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 장바구니·결제 시점의 판매자별 상품 소계, 묶음 배송비, 할인 안분액, 총결제액 스냅샷 구조.\n2. 구매자 상위 주문과 판매자별 하위 주문(Sub-order)의 독립적인 발송·구매 확정·정산 대기 전환.\n3. 특정 판매자 상품만 부분 취소·반품될 때 귀책 사유별 배송비 재계산 및 구매자 환불액 산식.\n4. 판매자에게 전달되는 하위 주문 정산 내역(상품 정산금·배송비 정산금·수수료)의 일관성 규칙.\n5. 판매자 묶음 장바구니 선택·주문 상세의 하위 주문 확장 행·부분 취소 환불 예상액 확인 화면의 연결.\n전체 장바구니 합계로 개별 판매자 배송비를 뭉뚱그리거나 부분 취소로 다른 판매자 주문까지 취소하지 말고, 예시 정책과 디자인 데모를 실제 결제·정산 원장으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Marketplace & Payouts',
      title: 'Multi-seller checkout, per-seller shipping fees and split-order refunds',
      summary: 'Split a single buyer checkout into seller sub-orders, and connect per-seller shipping, discount proration and partial-refund settlements.',
      overview: 'In a multi-seller marketplace, a buyer checks out once, but fulfillment, shipping costs, order confirmation and payouts happen per seller. Grouping cart items by seller to calculate independent shipping fees and free-shipping thresholds, splitting the parent payment into seller sub-orders, prorating cart-wide discounts across line items, and recalculating shipping when a partial cancellation breaks a free-shipping threshold keeps both buyer refunds and seller payouts accurate. These concepts are design references, not default shipping rates or fee rules.',
      concepts: [
        { name: 'Parent checkout order versus seller sub-orders', description: 'Represent the buyer’s single payment as a parent order while creating independent sub-orders per seller for fulfillment, tracking, confirmation and payout.' },
        { name: 'Per-seller shipping groups and free-shipping thresholds', description: 'Evaluate shipping rates and conditional free-shipping thresholds against each seller’s subtotal rather than the combined multi-seller cart total.' },
        { name: 'Line-item proration of cart-wide discounts', description: 'Apportion cart-level promo codes across participating line items at checkout so partial cancellations refund the exact net amount paid per item.' },
        { name: 'Partial cancellation and free-shipping clawback rules', description: 'Distinguish seller-fault stockouts from buyer-initiated partial cancellations when deciding whether to deduct initial shipping fees if a sub-order drops below the free-shipping threshold.' },
      ],
      workflow: [
        { name: 'Group cart items by seller with clear shipping subtotals', description: 'Show items grouped by seller in the cart and checkout, displaying each seller’s item subtotal, shipping fee and progress toward free shipping.' },
        { name: 'Split captured checkout into independent seller sub-orders', description: 'After payment succeeds, route each sub-order only to its respective seller with that seller’s net item and shipping amounts.' },
        { name: 'Advance fulfillment and confirmation per sub-order', description: 'Allow one seller’s delivered sub-order to confirm and enter payout eligibility without waiting for slower sellers in the same parent order.' },
        { name: 'Recalculate refunds and seller shipping on partial cancellation', description: 'Preview and settle the exact buyer refund and seller shipping adjustment based on cancellation fault and prorated discounts.' },
      ],
      pitfalls: [
        { name: 'Applying a single free-shipping threshold across the whole multi-seller cart', description: 'Waiving Seller B’s shipping fee because the buyer spent enough with Seller A leaves Seller B unpaid for fulfillment unless the platform explicitly subsidizes it.' },
        { name: 'Canceling the entire parent order when one seller is out of stock', description: 'Tying all sellers to a single indivisible order status cancels other sellers’ ready shipments. Support sub-order or line-item partial refunds.' },
        { name: 'Failing to prorate cart-level coupons across items before partial refunds', description: 'If a fixed cart discount is not split across items at checkout, canceling one item later produces distorted refund and seller payout numbers.' },
      ],
      questions: [
        'Are shipping fees and conditional free-shipping thresholds calculated separately per seller or fulfillment origin?',
        'When a cart-wide coupon is applied across multiple sellers, how is the discount prorated and rounded across individual items?',
        'Can one seller’s sub-order be confirmed and paid out while another sub-order in the same checkout is still in transit or disputed?',
        'If a buyer partially cancels an item and the remaining seller subtotal falls below the free-shipping threshold, how is initial shipping deducted (buyer remorse versus seller stockout)?',
        'Are shipping fees settled to the seller in full, or does the platform charge a fee on shipping amounts as well?',
      ],
      example: 'Example: a marketplace cart could group items by seller with a $30 per-seller free-shipping threshold, prorate a cart coupon proportionally across items at checkout, let each seller ship and settle their sub-order independently, and deduct outbound shipping from the buyer’s refund if a buyer-initiated partial cancel drops that seller’s subtotal below $30. Confirm actual proration rounding, shipping fee commissions and fault rules before adopting this setup.',
      relatedDesigns: [
        { id: 'ly-expandable-data-rows', reason: 'A reference for expanding a parent order row to inspect per-seller sub-orders, shipping fees and prorated discounts. Split-payment refunds and ledger updates need separate implementation.' },
        { id: 'mixed-state-checkbox-group', reason: 'A reference for selecting all cart items or toggling a seller’s item group with indeterminate checkbox states. Per-seller shipping calculation needs separate implementation.' },
      ],
      promptSnippet: 'Help design a multi-seller cart, per-seller shipping and split-order settlement workflow. First confirm per-seller shipping and free-shipping threshold rules, cart-wide discount proration across items, parent-order versus seller sub-order independence, and shipping recalculation on partial cancellation (buyer remorse versus seller stockout). Do not assume undecided rules.\nBased on the answers, describe:\n1. Checkout snapshot structure for per-seller item subtotals, shipping fees, prorated discounts and parent payment totals.\n2. Independent lifecycle transitions for seller sub-orders across shipping, confirmation and payout eligibility.\n3. Refund and seller-settlement calculations when a line item or sub-order is partially canceled.\n4. How shipping fees and commissions appear on each seller’s settlement statement.\n5. How grouped cart selection, expandable sub-order rows and partial-cancellation refund previews connect.\nDo not pool independent seller shipping thresholds into a single cart total or cancel unrelated sub-orders on a single seller stockout, and do not mistake example policies or design demos for a real split-payment ledger.',
    },
  },
  sources: [
    { title: 'Stripe Docs — Separate charges and transfers for multi-party orders', url: 'https://docs.stripe.com/connect/separate-charges-and-transfers' },
    { title: 'Adyen Docs — Split payments and partial refunds in marketplaces', url: 'https://docs.adyen.com/platforms/online-payments/split-transactions/' },
  ],
}, {
  id: 'marketplace-quote-custom-offer-and-milestone',
  aliases: {
    ko: ['맞춤 견적 요청', '판매자 역제안 견적서', '마일스톤 분할 정산', '단계별 에스크로 지급'],
    en: ['custom quote request', 'seller counter-offer', 'milestone escrow payment', 'staged deliverable release'],
  },
  useCases: {
    ko: ['정찰가 상품 대신 요구사항에 맞춘 견적 요청(RFQ)과 판매자 맞춤 제안서를 주고받을 때', '제안서의 유효 기한 만료·조건 수정 재발송·수락 전 철회를 관리할 때', '프로젝트 대금을 착수·중간·최종 등 단계별(마일스톤)로 나누어 예치·지급할 때', '특정 마일스톤 검수 지연이나 중도 해지 시 기지급 단계와 미진행 단계 정산을 분리할 때'],
    en: ['Supporting custom quote requests and seller proposals for bespoke services or B2B orders', 'Managing proposal expiration timers, revised counter-offers and pre-acceptance withdrawal', 'Splitting contract payments into milestones with per-stage escrow funding and release', 'Handling mid-project cancellations by separating already-released milestones from remaining escrow'],
  },
  keywords: {
    ko: ['맞춤 견적', '견적 요청', '역제안', '제안서 만료', '마일스톤 정산', '단계별 지급', '분할 에스크로', '검수 승인', '중도 해지 정산'],
    en: ['custom quote', 'request for quote', 'counter-offer', 'offer expiration', 'milestone payment', 'staged escrow', 'deliverable approval', 'revision request', 'partial contract termination'],
  },
  text: {
    ko: {
      domain: '마켓플레이스·정산',
      title: '맞춤 견적 요청·역제안 만료와 단계별(마일스톤) 대금 분할 지급',
      summary: '견적 제안서의 유효 기한·조건 확정을 관리하고, 단계별(마일스톤) 에스크로 예치·검수 승인과 분할 지급을 연결합니다.',
      overview: '외주 개발·디자인·맞춤 제작 마켓에서는 고정 가격표만으로 거래하기 어려워 협상과 단계별 정산이 필요합니다. 판매자가 보낸 맞춤 제안서가 무한정 유효 상태로 남지 않도록 만료 기한과 버전교체를 두고, 수락 시 전체 금액을 한 번에 예치할지 마일스톤별로 예치할지 정하며, 각 단계 산출물 검수 승인과 중도 해지 시 이미 확정된 단계의 보호 규칙을 분명히 해야 합니다. 아래 내용은 맞춤 견적·마일스톤 정산 흐름을 설계하기 위한 참고이며 특정 플랫폼의 검수 기한이나 수수료율을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '견적 제안서(Custom Offer) 버전과 만료·철회', description: '제안금액·납기·포함 범위를 담은 제안서에 유효 기한을 두고, 구매자가 수락하기 전에 조건을 고쳐 재발송하면 이전 제안서는 즉시 수락 불가 상태로 전환합니다.' },
        { name: '일괄 예치와 단계별(마일스톤) 순차 예치 구분', description: '계약 총액을 시작 시점에 모두 에스크로에 넣고 단계별로 풀어줄지, 각 마일스톤 시작 때마다 해당 단계 금액만 결제해 예치할지 구분합니다.' },
        { name: '마일스톤별 산출물 제출·검수 승인·수정 요청', description: '단계마다 대기 → 진행 중(예치됨) → 산출물 제출(검수 대기) → 수정 요청 → 승인 완료(정산 대상) 상태를 독립적으로 관리합니다.' },
        { name: '중도 해지 시 기승인 마일스톤 확정과 잔여 예치금 반환', description: '3단계 중 1단계가 이미 승인·지급된 뒤 2단계에서 계약이 중단되면, 1단계 정산은 유지하고 미진행·진행 중 단계의 예치금만 합의·중재 기준에 따라 나눕니다.' },
      ],
      workflow: [
        { name: '요구사항 접수와 단계별 금액·기한이 담긴 제안서 발송하기', description: '판매자가 전체 범위 또는 마일스톤별 산출물·금액·납기일과 제안 유효 기한을 적어 맞춤 제안서를 보냅니다.' },
        { name: '유효 기한 내 제안 수락과 에스크로 결제 연결하기', description: '구매자가 만료 전 제안을 수락하면 약정된 범위·요율을 스냅샷으로 고정하고 첫 단계(또는 전체) 에스크로 결제를 진행합니다.' },
        { name: '마일스톤 산출물 제출과 검수 승인·자동 승인 처리하기', description: '판매자가 단계 산출물을 올리면 구매자가 확인 후 승인하거나 수정 요청을 보내고, 승인된 마일스톤 금액만 판매자 정산 가능 잔액으로 넘깁니다.' },
        { name: '일정 변경·추가 과업(Change order) 또는 중도 정산 마감하기', description: '진행 중 범위가 늘어나면 추가 마일스톤 제안을 연결하고, 중도 종료 시에는 미확정 에스크로 금액의 반환·지급 비율을 확정합니다.' },
      ],
      pitfalls: [
        { name: '조건을 고쳐 새 제안서를 보냈는데 구매자가 예전 낮은 금액 제안서를 결제하기', description: '수정 제안서 발송 시 기존 제안서를 즉시 대체(Superseded) 처리하지 않으면 구매자가 이전 링크로 결제해 금액 분쟁이 발생합니다.' },
        { name: '마지막 마일스톤 분쟁 때문에 이미 승인 끝난 이전 마일스톤까지 소급 취소하기', description: '단계별 분할 정산의 목적은 완료된 단계의 대금을 확정하는 데 있습니다. 기승인 단계와 현재 검수 중인 단계의 분쟁 범위를 분리하세요.' },
        { name: '마일스톤 합계 금액과 전체 계약 총액이 맞지 않은 채로 제안서가 발행되기', description: '각 단계 금액의 합이 총견적액과 다르면 마지막 정산에서 차액이 빕니다. 제안서 생성 시 단계 합계 일치를 검증하세요.' },
      ],
      questions: [
        '맞춤 제안서의 기본 유효 기한은 얼마이며, 구매자 수락 전에 판매자가 제안을 철회하거나 수정 제안서로 대체할 수 있나요?',
        '마일스톤 거래 시 구매자는 계약 시작 시점에 전체 금액을 한 번에 예치하나요, 마일스톤마다 순차 결제하나요?',
        '판매자가 마일스톤 산출물을 제출한 뒤 구매자가 응답하지 않을 때 자동 승인 기한과 수정 요청 횟수 기준은 무엇인가요?',
        '수수료는 각 마일스톤이 승인될 때마다 건별로 차감해 정산하나요, 전체 프로젝트 완료 후 일괄 정산하나요?',
        '프로젝트 중도 해지 시 이미 승인된 이전 마일스톤과 현재 진행 중인 마일스톤의 예치금은 어떻게 처리하나요?',
      ],
      example: '예시: 외주 마켓에서 판매자가 3단계 마일스톤(기획 30%·디자인 30%·개발 40%) 맞춤 제안서를 72시간 유효 기한으로 발송하고, 수정 제안 발송 시 이전 제안은 즉시 만료시키며, 각 마일스톤 산출물 제출 후 7일간 수정 요청이 없으면 해당 단계 에스크로만 부분 확정해 정산 대기로 넘기도록 구성할 수 있습니다. 실제 예치 방식·자동 승인 기한·중도 해지 환불 규칙은 거래 약관에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'ly-activity-timeline', reason: '견적 제안·조건 수정·수락·마일스톤별 산출물 제출과 검수 승인 내역을 시간순으로 추적하는 표현에 참고할 수 있습니다. 실제 에스크로 예치와 분할 정산은 별도로 구현해야 합니다.' },
        { id: 'ly-transposable-comparison-matrix', reason: '복수 판매자의 견적 제안이나 기본·표준·맞춤 패키지 조건(납기·산출물·마일스톤 수)을 나란히 비교하는 표현에 참고할 수 있습니다. 실제 제안 수락과 결제는 구현하지 않습니다.' },
      ],
      promptSnippet: '마켓플레이스의 맞춤 견적 제안(Custom Offer)·유효 기한 관리·단계별(마일스톤) 에스크로 분할 지급 흐름을 설계해 줘. 먼저 제안서 유효 기한과 수정 재발송 시 이전 제안 무효화 규칙, 전체 일괄 예치와 마일스톤별 순차 예치 방식, 단계별 산출물 검수 승인·수정 요청·자동 승인 기한, 중도 해지 시 기승인 단계 보호와 잔여 예치금 정산 규칙을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 제안 발송·수정 대체·만료·철회·수락 상태 전환과 계약 조건 스냅샷 고정.\n2. 마일스톤별 금액 합계 검증 및 에스크로 예치·검수 대기·수정 요청·승인 완료(정산 가능) 단계.\n3. 개별 마일스톤 승인 시 수수료 차감과 판매자 정산 가능 잔액 반영 시점.\n4. 범위 추가(추가 마일스톤) 또는 중도 해지·분쟁 발생 시 단계별 보류 및 반환 범위.\n5. 견적 비교 표·맞춤 제안서 상세·마일스톤 진행 타임라인·검수 승인 화면의 연결.\n수정 제안 발송 후 이전 제안이 계속 결제되게 두거나 후속 단계 분쟁으로 이미 승인된 단계까지 무효화하지 말고, 예시 정책과 디자인 데모를 실제 에스크로 계약 시스템으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Marketplace & Payouts',
      title: 'Custom quotes, counter-offer expiration and milestone-based escrow releases',
      summary: 'Manage custom offer expiration and revisions, and connect per-milestone escrow funding, deliverable approval and staged payouts.',
      overview: 'Service and B2B marketplaces often rely on negotiated quotes and staged deliverables rather than fixed-price carts. Expiring stale custom offers, invalidating older offer versions when a revised quote is sent, deciding whether escrow is funded upfront or per milestone, and releasing seller payouts stage by stage upon deliverable approval keeps long-running projects accountable. These concepts are design references, not default contract terms or escrow hold periods.',
      concepts: [
        { name: 'Versioned custom offers, expiration and withdrawal', description: 'Attach an expiration timestamp to every custom proposal, and immediately mark previous proposals as superseded when a seller sends a revised counter-offer.' },
        { name: 'Upfront full escrow versus sequential milestone funding', description: 'Distinguish contracts where the buyer funds all milestones into escrow at acceptance from contracts where each milestone is funded right before that phase starts.' },
        { name: 'Per-milestone submission, revision and approval states', description: 'Track each milestone independently through pending, funded, submitted for review, revision requested and approved (payout-eligible) states.' },
        { name: 'Mid-contract cancellation and settled-milestone protection', description: 'When a multi-milestone order ends early, keep already-approved and paid milestones final while resolving only the active or unfunded remaining milestones.' },
      ],
      workflow: [
        { name: 'Issue a structured proposal with milestones and expiry', description: 'Let the seller define scope, milestone amounts, due dates and an offer expiration window, verifying that milestone amounts sum to the total quote.' },
        { name: 'Accept active offer and lock contract snapshot', description: 'Allow the buyer to accept and fund only an unexpired, current proposal version, snapshotting agreed deliverables and platform fee rates.' },
        { name: 'Submit deliverables and release milestone payouts', description: 'When the seller submits a milestone, let the buyer approve or request revisions, moving only that milestone’s net funds to payable status upon approval.' },
        { name: 'Handle scope additions or partial contract closure', description: 'Support appending extra milestones for scope changes, or closing remaining milestones with clear escrow refund/split rules.' },
      ],
      pitfalls: [
        { name: 'Leaving an old quote payable after a revised counter-offer is sent', description: 'If the first proposal link stays active after the seller sends a updated quote, the buyer may pay the outdated price and scope.' },
        { name: 'Reversing already-approved early milestones during a late-stage dispute', description: 'Staged milestones exist to settle completed phases progressively. Scope disputes to the unapproved active milestone unless fraud is involved.' },
        { name: 'Allowing milestone line items that do not sum to the quoted contract total', description: 'Validate that individual milestone amounts equal the total proposal price before the offer can be sent or paid.' },
      ],
      questions: [
        'How long does a custom offer stay valid before expiring, and how are previous offer versions invalidated when a seller edits a quote?',
        'Does the buyer fund the entire contract into escrow upfront or pay for each milestone sequentially?',
        'After a seller submits milestone deliverables, what are the revision-request rules and the auto-approval window if the buyer does not respond?',
        'Are platform fees deducted and payouts released after each individual milestone approval, or only when the whole contract completes?',
        'If a project is canceled mid-way, how are already-approved milestones separated from the currently funded milestone in escrow?',
      ],
      example: 'Example: a freelance marketplace could let sellers send a 3-milestone proposal that expires in 72 hours, automatically invalidate prior proposal versions when a revised quote is sent, release each milestone’s net payout 7 days after deliverable submission if no revision is requested, and restrict mid-project refund disputes to unapproved milestones. Confirm actual funding models, auto-approval timers and fee rules before adopting this setup.',
      relatedDesigns: [
        { id: 'ly-activity-timeline', reason: 'A reference for displaying chronological quote revisions, milestone submissions and approvals. Escrow funding and payout releases need separate implementation.' },
        { id: 'ly-transposable-comparison-matrix', reason: 'A reference for comparing multiple seller quotes or service tiers across price, turnaround and milestone counts. Proposal acceptance and checkout need separate implementation.' },
      ],
      promptSnippet: 'Help design a marketplace custom-quote, counter-offer and milestone-escrow workflow. First confirm offer expiration and superseding rules on revision, upfront versus sequential milestone escrow funding, deliverable review and auto-approval timers, per-milestone payout release, and mid-project cancellation rules. Do not assume undecided rules.\nBased on the answers, describe:\n1. Proposal lifecycle across sent, revised/superseded, expired, withdrawn and accepted states.\n2. Sum validation and per-milestone states (unfunded, funded in escrow, submitted, revision requested, approved/payable).\n3. Fee deduction and seller balance updates as individual milestones are approved.\n4. Handling of change-order milestones and mid-contract cancellations without disturbing settled stages.\n5. How quote comparison tables, proposal views, milestone timelines and deliverable approval screens connect.\nDo not leave superseded quotes payable or reopen settled milestones during later stage disputes, and do not mistake example policies or design demos for a real escrow contract engine.',
    },
  },
  sources: [
    { title: 'Upwork Support — Fixed-price protection and milestone payments', url: 'https://support.upwork.com/hc/en-us/articles/211063718-Upwork-Fixed-Price-Protection' },
    { title: 'Stripe Docs — Holding funds and incremental payouts with Connect', url: 'https://docs.stripe.com/connect/separate-charges-and-transfers' },
  ],
}, {
  id: 'marketplace-tax-invoice-withholding-and-statement',
  aliases: {
    ko: ['정산 세금계산서 발행', '원천징수 영수증 명세서', '수수료 세금계산서 마감', '소급 취소 수정 세금계산서'],
    en: ['marketplace tax invoice', 'withholding tax statement', 'monthly settlement statement', 'amended fee invoice'],
  },
  useCases: {
    ko: ['사업자 판매자에게는 수수료 세금계산서를 발행하고 개인 판매자에게는 원천징수 세액을 차감해 정산할 때', '월간·정산 주기별 마감 기준일(구매 확정일 vs 지급일)을 고정해 세무 명세서를 생성할 때', '이미 마감된 이전 달 거래가 사후 취소·환불되었을 때 수정 세금계산서나 당월 차감 명세를 반영할 때', '판매자가 기간별 정산 명세서와 세무 증빙을 대조·다운로드하는 화면을 만들 때'],
    en: ['Issuing platform-fee tax invoices for business sellers and applying withholding taxes for individual sellers', 'Locking monthly settlement cutoffs by confirmation date or payout date for tax reporting', 'Handling post-cutoff refunds across closed tax periods via amended invoices or next-period credit notes', 'Providing downloadable settlement and tax statements that reconcile gross sales, fees, taxes and net payouts'],
  },
  keywords: {
    ko: ['세금계산서', '수정 세금계산서', '원천징수', '정산 명세서', '수수료 부가세', '월간 마감', '귀속월', '세무 증빙', '차감 명세'],
    en: ['tax invoice', 'amended invoice', 'credit note', 'withholding tax', 'settlement statement', 'VAT on fees', 'monthly cutoff', 'tax period', 'reconciliation'],
  },
  text: {
    ko: {
      domain: '마켓플레이스·정산',
      title: '정산 주기에 맞춘 세금계산서·원천징수 명세 확정과 수정 발급',
      summary: '판매자 과세 유형별 세금계산서·원천징수 계산을 구분하고, 월간 마감 기준일과 마감 후 취소분 수정 발급을 연결합니다.',
      overview: '마켓플레이스 정산에서는 실제 통장에 찍힌 실지급액과 세무 신고용 매출·수수료 금액을 판매자가 스스로 맞추기 어렵습니다. 과세·면세 사업자와 개인 판매자별 증빙 종류(수수료 세금계산서, 원천징수 영수증), 귀속월을 나누는 기준 시점(구매 확정일 기준인지 정산 지급일 기준인지), 그리고 월 마감 후에 발생한 환불·취소가 이전 달 수정 발급으로 가는지 이번 달 차감으로 가는지를 명확히 해야 합니다. 아래 내용은 세무 명세·정산 마감 흐름을 설계하기 위한 참고이며 특정 국가의 세법이나 세율을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '총매출·중개 수수료·원천징수·실지급액의 분리 표시', description: '통장에 입금된 순액만 보여 주지 않고 판매 총액, 플랫폼 수수료(공급가액·세액), 원천징수 세액, 실지급액이 서로 어떻게 계산되었는지 구분합니다.' },
        { name: '귀속 기간 마감 기준(구매 확정일 vs 정산 지급일)', description: '월말에 결제되고 다음 달 초에 구매 확정·지급된 거래가 어느 달 명세서와 세금계산서에 포함되는지 단일 기준 시점을 고정합니다.' },
        { name: '판매자 과세 유형별 증빙(세금계산서 vs 원천징수)', description: '사업자 판매자에게는 플랫폼 수수료에 대한 세금계산서 발행을, 개인 판매자에게는 소득세·지방세 원천징수 차감 및 지급명세서를 연결합니다.' },
        { name: '마감 후 취소(익월 취소)와 수정 발급·차감 반영', description: '이미 세금계산서나 명세서가 확정된 뒤 이전 달 거래가 환불되었을 때, 수정 세금계산서(마이너스)를 발급할지 당월 정산 집계에서 차감할지 구분합니다.' },
      ],
      workflow: [
        { name: '정산 마감 전 예정 내역과 사업자·세무 정보 확인하기', description: '월간·주기별 마감 전에 집계 예정 금액과 등록된 사업자 번호·과세 유형·이메일을 확인하고 이상이 있으면 마감 전에 수정하게 합니다.' },
        { name: '귀속 기준일에 맞춰 월간 정산 명세서와 세무 증빙 확정하기', description: '마감 시점이 지나면 해당 기간의 거래 원금·수수료·원천징수액을 확정 스냅샷으로 고정하고 세금계산서·원천징수 명세를 발행합니다.' },
        { name: '마감 이후 발생한 소급 취소·조정 건 분리 표시하기', description: '이전 귀속월 거래가 이번 달에 취소되면 당월 정상 거래와 섞지 않고 이전 기간 취소 조정 항목으로 별도 행에 표시합니다.' },
        { name: '요약 명세서와 건별 상세 내역 대조·내려받기 제공하기', description: '세금계산서 합계 금액이 어떤 개별 주문들의 수수료 합인지 건별 내역과 1원 단위까지 대조할 수 있게 다운로드 파일을 제공합니다.' },
      ],
      pitfalls: [
        { name: '실제 통장 입금액과 세금계산서 금액이 왜 다른지 안내하지 않기', description: '플랫폼 수수료에 대한 매입 세금계산서 금액과 판매 매출 총액, 수수료 차감 후 실입금액을 구분해 설명하지 않으면 판매자 문의가 폭주합니다.' },
        { name: '이미 확정 발행된 지난 달 명세서 숫자를 사후 취소 때문에 조용히 덮어쓰기', description: '판매자가 이미 세무 신고에 사용한 지난 달 확정 명세서의 숫자가 나중에 바뀌면 신고 불일치가 발생합니다. 확정본은 보존하고 수정분·차감분을 별도 기록하세요.' },
        { name: '월중 사업자 전환(개인 → 사업자) 시점을 구분하지 않고 한 달 전체를 한 기준으로 묶기', description: '개인에서 사업자로 전환된 날짜 전후의 거래는 원천징수 대상과 세금계산서 대상이 다를 수 있으므로 적용 시작 기준을 명확히 기록해야 합니다.' },
      ],
      questions: [
        '월간 정산 명세서와 세금계산서의 귀속월 기준은 결제일, 구매 확정일, 정산 지급일 중 무엇인가요?',
        '판매자 과세 유형(일반·간이·면세 사업자, 개인 원천징수 대상)에 따라 발행하는 증빙과 세액 계산 기준은 무엇인가요?',
        '이미 세금계산서·명세서가 마감 확정된 이전 달 거래가 취소되면 수정 세금계산서를 발행하나요, 이번 달 정산에서 차감 반영하나요?',
        '판매자가 월중에 개인에서 사업자로 전환하거나 사업자 정보를 바꿀 때 어느 거래부터 새 과세 기준을 적용하나요?',
        '세무 증빙 발행 전 판매자 확인(정산 내역 이의 확인) 유예 기간과 발행 실패(휴폐업·정보 오류) 시 재발행 절차는 어떻게 되나요?',
      ],
      example: '예시: 마켓플레이스에서 매월 말일 구매 확정 건을 기준으로 익월 5일에 월간 명세서를 확정하여 사업자 판매자에게는 중개 수수료 세금계산서를 발행하고 개인 판매자에게는 3.3% 원천징수 명세를 제공하며, 마감 후 취소된 이전 달 거래는 익월 수정 세금계산서 및 이월 조정 행으로 분리 표시하도록 구성할 수 있습니다. 실제 세율·귀속 기준일·수정 발급 규정은 세무 정책에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'ly-sortable-data-table', reason: '귀속월별 정산 명세서와 세금계산서 목록을 기간·공급가액·세액·실지급액 기준으로 정렬해 확인하는 표현에 참고할 수 있습니다. 실제 세액 계산과 전자세금계산서 발행은 별도로 구현해야 합니다.' },
        { id: 'dismissible-inline-banner', reason: '월간 세금계산서 마감 일정이나 휴폐업·세무 정보 보완 필요 안내를 정산 화면 상단에 표시하는 표현에 참고할 수 있습니다. 실제 마감 배치와 상태 감지는 구현하지 않습니다.' },
      ],
      promptSnippet: '마켓플레이스의 정산 주기별 세금계산서·원천징수 명세 확정 및 마감 후 취소 수정 발급 흐름을 설계해 줘. 먼저 귀속월 산정 기준 시점(구매 확정일 vs 정산 지급일), 판매자 유형(사업자 vs 개인)별 세금계산서·원천징수 계산 기준, 마감 확정 후 이전 달 거래 취소 시 수정 발급 또는 당월 차감 규칙, 월중 과세 유형 변경 시 적용 기준을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 판매 총액, 할인 분담금, 플랫폼 수수료(공급가액·부가세), 원천징수 세액, 실지급액의 대조 구조.\n2. 마감 예정 → 명세 확정 → 증빙 발행 완료 → 발행 실패/재발행 → 수정 발행 상태 전환.\n3. 이미 확정된 이전 기간 명세서의 불변 보존과 사후 취소·환불 건의 이월 조정/수정 발급 표시.\n4. 개인에서 사업자 전환 또는 휴폐업·정보 불일치 발생 시 정산 및 증빙 예외 처리.\n5. 마감 일정 안내 배너·월간 정산/세무 요약 카드·증빙 정렬 표·건별 대조 다운로드 화면의 연결.\n이미 발행된 확정 명세서 수치를 사후 취소로 몰래 덮어쓰거나 실입금액과 수수료 세금계산서 금액을 혼동하지 말고, 예시 정책과 디자인 데모를 실제 세무 신고·발행 시스템으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Marketplace & Payouts',
      title: 'Settlement tax invoices, withholding statements and amended issuances',
      summary: 'Connect seller tax profiles with monthly settlement cutoffs, fee invoices, withholding deductions and post-cutoff credit adjustments.',
      overview: 'Sellers need to reconcile the net cash deposited into their bank account against gross sales, platform fee invoices and tax withholdings. Defining whether monthly statements cut off by order confirmation date or payout date, separating VAT/GST fee invoices for business sellers from withholding statements for individual sellers, and handling refunds that occur after a tax period closes via amended invoices or carry-forward adjustments prevents accounting mismatches. These concepts are design references, not tax advice or statutory rates for a specific jurisdiction.',
      concepts: [
        { name: 'Gross sales, platform fees, withholding tax and net payout reconciliation', description: 'Show the full bridge from gross order value to platform fee, VAT/tax on fees, income tax withholding and final bank deposit so statements reconcile.' },
        { name: 'Period cutoff basis (confirmation date versus payout date)', description: 'Fix a single timestamp rule that assigns each transaction to a monthly tax period so cross-month orders never double-count or vanish.' },
        { name: 'Business fee invoices versus individual withholding statements', description: 'Route verified business sellers to platform-fee tax invoices while applying statutory withholding deductions and statements for eligible individual sellers.' },
        { name: 'Immutable closed statements and post-cutoff credit adjustments', description: 'Never silently mutate an already-issued monthly statement when a prior-month order is refunded; record an amended credit note or a separate prior-period adjustment line.' },
      ],
      workflow: [
        { name: 'Preview upcoming period totals and verify tax profile before cutoff', description: 'Let sellers review their preliminary period totals and confirm their business registration or tax status before the monthly lock date.' },
        { name: 'Lock the period snapshot and issue tax documents', description: 'Freeze transactions belonging to the closed period and generate the official settlement summary, fee tax invoice or withholding statement.' },
        { name: 'Isolate prior-period refunds and adjustments on statements', description: 'Display reversals of previous-month transactions as explicit prior-period adjustment rows rather than mixing them into current-month gross sales.' },
        { name: 'Provide line-item exports that tie to invoice totals', description: 'Let sellers download the exact transaction list whose fee and tax columns sum to the issued monthly tax invoice.' },
      ],
      pitfalls: [
        { name: 'Showing net bank payouts without explaining fee invoices and withholding deductions', description: 'Sellers comparing bank deposits directly against gross order totals or fee-only tax invoices will assume funds are missing unless the reconciliation breakdown is visible.' },
        { name: 'Silently editing a closed month’s statement after a late refund', description: 'Mutating numbers on a historical statement that a seller already filed for taxes creates audit discrepancies. Issue an amended document or next-period adjustment.' },
        { name: 'Applying a mid-month tax-type change retroactively to already-settled transactions', description: 'When a seller switches from an individual profile to a registered business, define the exact effective timestamp for new tax treatment.' },
      ],
      questions: [
        'Is a transaction assigned to a monthly tax statement by payment date, buyer confirmation date or payout transfer date?',
        'How do tax documents and deductions differ between registered business sellers and individual sellers subject to withholding?',
        'When a transaction from a closed month is refunded later, does the platform issue an amended tax invoice/credit note or net it against the current month?',
        'If a seller updates their business registration or tax status mid-month, which transactions use the updated tax rule?',
        'What happens if electronic tax-invoice issuance fails due to an invalid or closed business registration number?',
      ],
      example: 'Example: a marketplace could close monthly statements based on orders confirmed through the last day of the month, issue platform-fee tax invoices to business sellers and withholding statements to individual sellers on the 5th of the next month, and record post-cutoff refunds as separate prior-month adjustment rows with amended credit notes. Confirm actual statutory tax rules, cutoff dates and amendment procedures before adopting this setup.',
      relatedDesigns: [
        { id: 'ly-sortable-data-table', reason: 'A reference for sorting monthly settlement statements and tax invoices by period, fee amount, tax or net payout. Tax calculation and invoice issuance need separate implementation.' },
        { id: 'dismissible-inline-banner', reason: 'A reference for surfacing monthly tax-cutoff reminders or invalid tax-registration warnings at the top of the settlement view. Batch cutoff logic needs separate implementation.' },
      ],
      promptSnippet: 'Help design a marketplace tax-invoice, withholding-statement and monthly settlement reconciliation workflow. First confirm the period cutoff timestamp rule (confirmation vs payout date), document and deduction rules by seller tax type (business vs individual withholding), handling of refunds after a tax period closes (amended invoice vs next-period adjustment), and effective dates for tax-profile changes. Do not assume undecided rules.\nBased on the answers, describe:\n1. Reconciliation formula bridging gross sales, discounts, platform fees, fee taxes, withholding taxes and net payouts.\n2. Lifecycle states across open period, cutoff locked, tax document issued, issuance failed and amended/adjusted.\n3. Immutable preservation of closed statements and explicit presentation of prior-period refund adjustments.\n4. Handling of mid-period seller entity changes and failed tax-ID validations.\n5. How cutoff reminder banners, reconciliation summary cards, sortable invoice tables and line-item CSV exports connect.\nDo not silently overwrite closed monthly statements after late refunds or conflate fee invoices with gross sales, and do not mistake example policies or design demos for a certified tax-filing system.',
    },
  },
  sources: [
    { title: 'Stripe Docs — Tax reporting and platform fee invoices for Connect marketplaces', url: 'https://docs.stripe.com/connect/tax-reporting' },
    { title: 'Shopify Help Center — Taxes, payout statements and merchant financial reports', url: 'https://help.shopify.com/en/manual/finances/summary' },
  ],
}];
