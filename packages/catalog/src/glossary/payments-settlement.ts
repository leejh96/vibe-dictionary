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
};
