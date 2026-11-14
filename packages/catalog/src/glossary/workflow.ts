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
  'account-deactivation': {
    aliases: {
      ko: ['계정 비활성화', '계정 중지', '계정 휴면', '사용 제한', '접근 정지'],
      en: ['account deactivation', 'account suspension', 'disable account', 'soft deactivation'],
    },
    text: {
      ko: {
        definition: '사용자 계정의 접근과 이용을 제한하는 상태 전환으로, 데이터를 영구 파기하는 물리적 삭제(Hard deletion)와 구분됩니다. 학습 진도·데이터 보존 여부, 로그인 차단, 좌석(Seat) 수 반영, 복구 가능 여부는 서비스 정책에 따라 달라집니다.',
        example: '조직 멤버를 비활성화 상태로 전환해 로그인과 API 토큰 접근을 막되, 과금 좌석 해제 여부와 재활성화 가능 여부는 조직·서비스 정책 확인 후 처리합니다.',
        promptSnippet: '계정 비활성화 흐름을 구현할 때 대상 계정·리소스 요약을 먼저 보여 주고 권한 검증과 영향 범위 점검을 거치게 하며, 물리적 삭제와 구분하되 복구 가능 여부·진도 보존·좌석 차감은 자동 가정하지 말고 서비스 정책을 확인하게 해 줘.',
      },
      en: {
        definition: 'A state transition that restricts account access and usage, distinct from hard/physical deletion. Whether progress/data is preserved, logins are blocked, seats are released, or restoration is allowed depends on service policy.',
        example: 'Move a departing member account to deactivated status to block sign-in while checking policy rules before assuming automatic seat release or self-service restoration.',
        promptSnippet: 'Implement account deactivation with a target summary, impact check, and permission verification; separate it from hard deletion and verify service policies for data retention, seat counts, and recovery rather than assuming defaults.',
      },
    },
  },
};
