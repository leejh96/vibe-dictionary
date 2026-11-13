import type { GlossaryTermBody } from './types';

export const WORKFLOW_GLOSSARY_DATA: Record<string, GlossaryTermBody> = {
  'human-in-the-loop': {
    aliases: {
      ko: ['HITL', '휴먼인더루프', '사람 승인 단계', '에이전트 실행 전 확인', '위험 작업 승인'],
      en: ['HITL', 'human in the loop', 'human approval guardrail', 'manual review gate'],
    },
    text: {
      ko: {
        definition: 'AI 에이전트나 자동화 워크플로가 되돌리기 어려운 작업(삭제·결제·외부 발송 등)을 실행하기 직전에 실행을 멈추고 사람의 명시적 승인 또는 거절을 요구하는 안전 절차입니다.',
        example: 'AI 비서가 고객에게 환불 메일을 발송하거나 DB 테이블을 수정하기 전에 영향 범위와 실행 파라미터를 카드로 보여 주고 [승인] 버튼을 누른 경우에만 실제 도구를 실행합니다.',
        promptSnippet: 'AI 에이전트나 자동화 파이프라인에서 파괴적·금전적·외부 전파 작업은 자동 실행하지 말고 인간 개입 승인(HITL) 게이트를 두어 대상과 파라미터 요약을 보여 준 뒤 명시적 승인 후에만 진행되게 해 줘.',
      },
      en: {
        definition: 'A workflow guardrail that pauses an AI agent or automation before high-impact or irreversible actions, requiring explicit human approval or rejection to proceed.',
        example: 'Before an agent sends external emails or deletes records, pause execution and surface the exact tool parameters and impact summary for a user to approve or reject.',
        promptSnippet: 'Gate irreversible, financial, or external-facing automated actions behind a Human-in-the-Loop (HITL) approval step that displays exact parameters and risk context before execution.',
      },
    },
  },
  'service-level-agreement': {
    aliases: {
      ko: ['SLA', '응대 목표 시간', '처리 기한 약속', '지원 티켓 마감 기한', 'SLA 타이머'],
      en: ['SLA', 'response time target', 'resolution target', 'support SLA timer'],
    },
    text: {
      ko: {
        definition: '고객지원·운영 조직이 문의나 장애에 첫 응답·해결을 완료하기로 약속한 목표 시간과 영업시간 계산·임박 경고·에스컬레이션 기준입니다.',
        example: '긴급 문의는 첫 응답 1시간 이내 SLA를 적용하고, 고객 답변을 기다리는 동안에는 타이머를 일시정지하며, 마감 15분 전에는 담당 팀에 경고를 보냅니다.',
        promptSnippet: '문의 큐나 운영 워크플로에 서비스 수준 협약(SLA) 기준을 반영할 때 우선순위별 목표 시간, 영업시간 기준 타이머, 고객 대기 중 일시정지 조건, 임박·초과 시 에스컬레이션 규칙을 명확히 분리해 설계해 줘.',
      },
      en: {
        definition: 'A formal commitment defining target first-response and resolution times for support or operations, including business-hour calendars, pause states, and escalation rules.',
        example: 'Apply a 1-hour first-response SLA to urgent tickets, pause the clock while waiting on customer reply, and flag approaching breaches before timeout.',
        promptSnippet: 'Model Service-Level Agreement (SLA) tracking with priority-based target durations, business-hours calculation, explicit pause states (e.g., waiting on customer), and breach escalation alerts.',
      },
    },
  },
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
  'user-onboarding': {
    aliases: {
      ko: ['온보딩 흐름', '초기 설정 가이드', '시작하기 체크리스트', '첫 사용자 안내'],
      en: ['onboarding flow', 'getting started checklist', 'first-run experience', 'activation checklist'],
    },
    text: {
      ko: {
        definition: '새로 가입한 사용자나 팀이 서비스의 첫 핵심 가치를 빠르게 경험하도록 초기 설정·필수 입력·둘러보기 단계를 순서대로 안내하는 흐름입니다.',
        example: '팀 협업 SaaS 가입 직후 "1. 프로필 설정 → 2. 팀원 초대 → 3. 첫 프로젝트 만들기" 체크리스트와 진행률 막대를 보여 주어 이탈 없이 시작하게 합니다.',
        promptSnippet: '신규 사용자 온보딩은 한 번에 모든 설정을 강요하지 말고 3~4개의 작은 완료 가능한 단계와 진행률 표시로 나누고, 건너뛰기와 나중에 이어하기를 허용해 줘.',
      },
      en: {
        definition: 'A guided activation flow that helps new users or teams complete essential setup steps and reach their first meaningful outcome without feeling overwhelmed.',
        example: 'After sign-up, present a 3-step checklist ("Profile", "Invite teammates", "Create first project") with a live progress indicator and optional skip.',
        promptSnippet: 'Design user onboarding as a concise 3-4 step checklist with visible progress, clear next-action cues, and safe skip/resume support so users reach core value quickly.',
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
  'grace-period': {
    aliases: {
      ko: ['유예기간', '결제 실패 유예', '탈퇴 철회 기간', '시크릿 교체 유예'],
      en: ['grace window', 'dunning grace period', 'deletion grace period', 'dual-valid window'],
    },
    text: {
      ko: {
        definition: '결제 실패·구독 만료·회원 탈퇴 요청·API 시크릿 교체 같은 전환이 발생한 뒤, 즉시 차단하거나 영구 삭제하지 않고 복구·전환할 수 있도록 허용하는 일정 유예 시간입니다.',
        example: '정기 결제가 실패해도 즉시 계정을 잠그지 않고 7일간 유예 기간 배너와 결제 수단 교체 안내를 띄워 정상 복구할 수 있게 합니다.',
        promptSnippet: '결제 실패, 해지 예약, 계정 삭제, 웹훅 시크릿 교체에는 즉시 차단 대신 명시적 유예 기간(Grace Period)과 남은 기한 배너·복구 액션을 제공해 의도치 않은 서비스 중단을 줄여 줘.',
      },
      en: {
        definition: 'A configured buffer window after payment failure, cancellation, deletion request, or credential rotation during which users can recover or transition before hard enforcement.',
        example: 'After a recurring card charge fails, grant a 7-day grace period with a persistent banner to update payment details before downgrading entitlements.',
        promptSnippet: 'Include an explicit grace period with countdown banners and recovery actions for failed renewals, scheduled account deletions, or dual-valid secret rotations before hard cutoff.',
      },
    },
  },
  'maker-checker-approval': {
    aliases: {
      ko: ['메이커 체커', '2인 승인 체계', '교차 승인', '고위험 작업 결재', '4-eyes 원칙'],
      en: ['maker-checker', 'four-eyes principle', 'two-person approval', 'peer sign-off'],
    },
    text: {
      ko: {
        definition: '고액 출금, 권한 승격, 운영 설정 변경 같은 고위험 작업을 요청하는 사람(Maker)과 이를 검토·승인하는 사람(Checker)을 분리해 단독 실수나 악용을 막는 승인 워크플로입니다.',
        example: '담당자 A가 대량 정산 지급을 기안하더라도 본인 계정은 승인 버튼이 막혀 있고, 다른 관리자 B가 내용을 검토한 뒤 승인해야만 실행됩니다.',
        promptSnippet: '고위험 운영 작업에는 요청자(Maker)와 승인자(Checker)를 동일 인물로 허용하지 않는 이중 승인 워크플로를 두고, 승인 만료 시간·반려 사유·감사 로그를 함께 기록해 줘.',
      },
      en: {
        definition: 'A governance workflow requiring two distinct authorized people—a Maker who initiates a high-risk action and a Checker who independently reviews and approves it.',
        example: 'An operator who drafts a bulk payout or production permission change cannot self-approve; a second reviewer must approve before execution.',
        promptSnippet: 'Enforce Maker-Checker dual-control approval on high-risk actions by blocking self-approval on the backend, adding request expiration and rejection reasons, and logging every decision.',
      },
    },
  },
};
