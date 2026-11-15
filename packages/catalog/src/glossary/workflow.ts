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
  'soft-delete': {
    aliases: {
      ko: ['논리 삭제', '휴지통 보관', '복구 가능한 삭제', '임시 삭제'],
      en: ['logical deletion', 'trash retention', 'recoverable delete', 'undoable delete'],
    },
    text: {
      ko: {
        definition: '데이터베이스에서 레코드를 즉시 물리 삭제(Hard Delete)하지 않고 삭제 시각(deletedAt)이나 보관 상태를 표시해 일반 조회에서 숨겼다가, 보관 유예 기간 동안 복원하거나 기한 만료 후 영구 파기하는 삭제 워크플로입니다. 삭제된 항목이 저장 용량(Quota)이나 고유 제약 조건(예: 동일 파일명·슬러그)에 미치는 영향을 함께 정해야 합니다.',
        example: '파일이나 문서를 삭제하면 즉시 휴지통 상태로 전환하고 실행 취소 스낵바를 띄우며, 30일 보관 후 영구 삭제 배치로 실제 데이터와 스토리지 점유를 정리합니다.',
        promptSnippet: '복구 가능한 삭제가 필요한 파일·문서·댓글에는 deletedAt 기반 소프트 삭제와 휴지통 복원 경로를 두고, 일반 목록·검색 제외, 고유 이름 충돌 처리, 보관 기간 만료 후 영구 삭제(Hard Delete)와 용량 반환 규칙을 함께 설계하세요.',
      },
      en: {
        definition: 'Marking a record with a deletion timestamp or trash status rather than erasing it immediately, hiding it from active views so users can restore it during a retention period before scheduled permanent purge.',
        example: 'Moving a workspace file to Trash sets deletedAt and shows an undo snackbar, keeping the file out of standard searches while retaining it for 30 days before permanent cleanup.',
        promptSnippet: 'Implement soft delete with an explicit deletedAt timestamp, consistent exclusion from normal queries, a restore flow, uniqueness handling, and a scheduled permanent purge with quota reclamation.',
      },
    },
  },
  'waitlist-management': {
    aliases: {
      ko: ['대기자 명단 관리', '빈자리 알림 전환', '대기열 순번 승인', '예약 대기 만료'],
      en: ['waitlist queue', 'waitlist promotion', 'standby queue', 'waitlist expiry'],
    },
    text: {
      ko: {
        definition: '예약 슬롯이나 행사 좌석이 모두 찼을 때 대기자 명단을 접수하고, 취소가 발생하면 순번·조건에 따라 다음 대기자에게 한정된 수락 기한(Offer Window)을 부여해 확정하거나 미응답 시 자동 만료 후 다음 순번으로 넘기는 흐름입니다.',
        example: '마감된 워크숍에 취소표 1석이 생기면 1순위 대기자에게 30분 유효한 결제·확정 링크를 발급하고, 기한 안에 확정하지 않으면 제안을 만료 처리한 뒤 2순위 대기자에게 넘깁니다.',
        promptSnippet: '예약·티켓 대기열에는 단순 대기 등록뿐 아니라 빈자리 발생 시 한정된 수락 유예 시간 부여, 선점 락과 동시 수락 충돌 방지, 기한 만료 시 자동 승계 및 대기 취소 흐름을 함께 설계하세요.',
      },
      en: {
        definition: 'A queue workflow for full bookings or events that registers standby users and, when capacity opens, grants a time-boxed offer window to the next eligible candidate—automatically expiring and advancing to the next person if unconfirmed.',
        example: 'When a spot cancels, issue a 30-minute confirmation offer to the first waitlisted registrant and automatically rotate the seat to the next person if the offer expires.',
        promptSnippet: 'Design waitlist workflows with bounded confirmation offer windows, atomic capacity holds to prevent double-claiming, automatic expiration rollover, and clear status visibility for waiting users.',
      },
    },
  },
  'break-glass-access': {
    aliases: {
      ko: ['비상 권한 상승', '긴급 관리자 접근', '브레이크 글래스', '예외 권한 발동'],
      en: ['emergency access', 'break glass account', 'just-in-time emergency elevation', 'emergency override'],
    },
    text: {
      ko: {
        definition: '장애 대응이나 보안 사고처럼 일반 이중 승인(Maker-Checker) 절차를 기다리기 어려운 비상 상황에서, 사전 사유 입력과 추가 인증을 거쳐 제한된 시간 동안만 임시 권한을 부여하고 종료 후 자동 회수와 사후 감사를 의무화하는 예외 접근 절차입니다.',
        example: '야간 장애로 운영 DB나 잠긴 조직 계정을 즉시 복구해야 할 때 관리자가 사유 티켓 번호를 입력하고 길게 눌러 긴급 접근을 활성화하면 1시간 뒤 권한이 자동 만료되며 보안 팀에 즉시 알림과 감사 로그가 남습니다.',
        promptSnippet: '긴급 예외 접근(Break-Glass) 기능에는 사전 사유·티켓 번호 필수 입력, 명확한 자동 만료 타이머(TTL), 실시간 보안 알림 발송, 만료 시 자동 권한 회수와 변조 불가 감사 로그·사후 검토 상태를 반드시 포함하세요.',
      },
      en: {
        definition: 'A tightly audited emergency privilege-escalation path used during critical incidents when normal multi-person approval cannot wait. It requires an explicit reason, grants short-lived access with automatic expiration, triggers immediate security alerts, and mandates post-incident review.',
        example: 'An on-call engineer enters an incident ID and completes step-up verification to unlock 60-minute emergency production access, automatically revoking privileges on timeout and alerting security.',
        promptSnippet: 'Build break-glass access with mandatory incident justification, step-up authentication, strict automatic TTL expiration, real-time alert notifications, and mandatory post-event audit sign-off.',
      },
    },
  },
  'dry-run-validation': {
    aliases: {
      ko: ['드라이 런 검증', '미리보기 검증', '가져오기 사전 검사', '실제 반영 전 검증'],
      en: ['dry run check', 'pre-flight validation', 'import preview validation', 'simulation run'],
    },
    text: {
      ko: {
        definition: '대량 CSV 가져오기, 일괄 상태 변경, 요금제 마이그레이션처럼 영향이 큰 작업을 실제 데이터베이스에 반영하기 전에, 동일한 규칙으로 전체 행을 먼저 검증해 생성·수정·실패 건수와 행별 오류 원인을 미리 보여 주는 사전 검증 단계입니다.',
        example: '직원 명단 500건 CSV 업로드 시 곧바로 저장하지 않고 드라이 런 단계에서 "신규 420건, 갱신 75건, 오류 5건(이메일 형식·중복 ID)" 요약과 오류 CSV 다운로드를 먼저 제시한 뒤 최종 실행 여부를 묻습니다.',
        promptSnippet: '대량 데이터 가져오기나 일괄 변경에는 실제 커밋 전 영향 건수와 행별 오류를 미리 확인하는 사전 모의 검증(Dry-Run) 단계를 두고, 전체 중단(All-or-Nothing)인지 유효 행만 부분 반영인지 정책을 사용자가 명확히 선택하게 하세요.',
      },
      en: {
        definition: 'A pre-flight verification step that runs all schema, uniqueness, and business-rule checks on bulk imports or batch mutations without persisting changes, previewing created, updated, and failing rows before final commit.',
        example: 'Uploading a 500-row CSV previews "420 new, 75 updates, 5 validation errors" with line-level error reasons and a downloadable error report before committing.',
        promptSnippet: 'Add a dry-run validation preview before bulk imports or batch updates showing exact counts of inserts, updates, and row-level errors, and clarify all-or-nothing rollback versus partial-commit rules.',
      },
    },
  },
  'collaborative-edit-lock': {
    aliases: {
      ko: ['공동 편집 잠금', '문서 체크아웃 잠금', '동시 편집 충돌 방지', '편집권 점유'],
      en: ['edit lock', 'document checkout lock', 'pessimistic edit lock', 'editing lease'],
    },
    text: {
      ko: {
        definition: '실시간 동시 편집을 지원하지 않는 CMS 문서나 설정 화면에서, 한 사용자가 편집에 들어가면 일정 유지 시간(Lease) 동안 다른 사용자의 동시 수정을 제한하거나 편집 중임을 알려 작업 손실을 막는 체크아웃 잠금 흐름입니다. 잠금 보유자가 응답 없이 이탈해도 영구 잠기지 않도록 자동 만료(Heartbeat/TTL)와 관리자 강제 해제 경로를 함께 둡니다.',
        example: '편집자 A가 공지 문서를 수정하는 동안 다른 편집자에게 "현재 A님이 편집 중입니다(3분 후 자동 해제)" 배너를 띄우고 읽기 전용 보기로 전환하며, 필요한 경우 잠금 인계 요청을 보낼 수 있습니다.',
        promptSnippet: '비실시간 문서·설정 편집에 편집 잠금을 적용할 때는 하트비트 기반 만료 시간(TTL), 타 사용자에게 읽기 전용 전환과 현재 편집자 안내 배너, 관리자 강제 해제 또는 잠금 인계 및 저장 시 버전 검증을 함께 설계하세요.',
      },
      en: {
        definition: 'A document checkout workflow used when simultaneous real-time editing is not supported, granting a time-bounded editing lease to one user while alerting others and preventing silent overwrites. Heartbeat TTL expiry and admin override prevent stale locks if someone closes their tab.',
        example: 'While Editor A holds the lease on a draft article, other teammates see a read-only view banner naming the active editor and can request lock handoff if urgent.',
        promptSnippet: 'Implement collaborative edit locks with a short heartbeat-renewed TTL, clear active-holder banners for read-only viewers, controlled lock takeover or expiry, and version checks on save.',
      },
    },
  },
  'embargo-publishing': {
    aliases: {
      ko: ['보도 유예 발행', '지정 시각 공개 제한', '엠바고 설정', '예약 공개 잠금'],
      en: ['embargoed release', 'embargo timestamp', 'scheduled embargo', 'pre-release hold'],
    },
    text: {
      ko: {
        definition: '보도자료, 성적 발표, 신제품 공지처럼 정해진 시각(Embargo) 이전에는 외부에 절대 공개되거나 검색·피드·CDN에 유출되어서는 안 되는 콘텐츠를 사전에 작성·검수해 두고, 지정 시각이 된 후에만 공개 상태로 전환하는 발행 통제 워크플로입니다.',
        example: '신규 요금제 발표 글에 엠바고 일시와 타임존을 설정하면 공개 전까지 사이트맵, RSS, 외부 캐시, 검색 API에서 완전히 제외되고 승인된 미리보기 토큰으로만 내부 검수를 진행합니다.',
        promptSnippet: '엠바고 예약 발행 흐름에서는 타임존이 명시된 공개 일시, 공개 전 목록·검색·RSS·CDN 캐시 유출 차단, 인증된 내부 미리보기 분리, 그리고 예약 시각 도래 시 원자적 상태 전환과 취소 경로를 설계하세요.',
      },
      en: {
        definition: 'A publishing control that lets teams author, review, and stage sensitive announcements or releases while strictly blocking public URLs, search indexes, feeds, and edge caches until an explicit timezone-aware embargo timestamp arrives.',
        example: 'A press release stays excluded from public sitemaps, search APIs, and CDN caches until its scheduled UTC timestamp, accessible beforehand only via gated reviewer links.',
        promptSnippet: 'Implement embargoed publishing with timezone-explicit release timestamps, strict exclusion from public feeds, search, and shared caches before release, gated internal previews, and atomic publish transitions.',
      },
    },
  },
};
