import type { GlossaryTermBody } from './types';

export const CUSTOMER_SUPPORT_GLOSSARY_DATA: Record<string, GlossaryTermBody> = {
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
  'voice-of-customer': {
    aliases: {
      ko: ['VOC', '고객의 소리', '고객 피드백', '고객 의견', '고객 건의'],
      en: ['VOC', 'Voice of Customer', 'customer feedback', 'customer voice', 'customer insights'],
    },
    text: {
      ko: {
        definition: '고객 문의·불편 사항·개선 제안을 체계적으로 수집해 분류·분석하고 제품 개선의 입력 자료로 활용하는 흐름입니다. 개별 요청을 곧바로 확정된 개발 요구사항으로 간주하지는 않습니다.',
        example: '고객지원 티켓, 앱 내 피드백, 설문 코멘트에서 수집한 의견을 유형과 영향도별로 묶어 우선순위를 검토하되, 실제 스펙 반영 여부는 별도 검증을 거쳐 결정합니다.',
        promptSnippet: '고객의 소리(VOC) 수집·분류 기능을 설계할 때 유입 출처, 카테고리·유형, 영향도, 처리 이력을 함께 기록하고 개인정보(PII)는 최소화·마스킹하며 개별 요청을 확정 요구사항과 분리해 관리해 줘.',
      },
      en: {
        definition: 'A structured workflow for collecting, categorizing, and analyzing customer inquiries, pain points, and suggestions as product improvement input, without treating individual requests as confirmed requirements.',
        example: 'Aggregate support tickets, in-app feedback, and survey comments by theme and impact to inform roadmap discussions while keeping formal requirement sign-off separate.',
        promptSnippet: 'Design Voice of Customer (VOC) intake and triage to capture source, category/type, impact, and handling history, minimize or mask PII, and keep raw customer requests separate from confirmed specs.',
      },
    },
  },
  'customer-satisfaction-score': {
    aliases: {
      ko: ['CSAT', '고객 만족도 조사', '상담 만족도 평가', '별점 만족도'],
      en: ['CSAT', 'customer satisfaction survey', 'support rating', 'post-resolution rating'],
    },
    text: {
      ko: {
        definition: '상담 종료나 특정 기능 이용 직후 고객이 경험에 얼마나 만족했는지 5점 척도나 좋아요·아쉬워요 등으로 측정하는 단기 경험 지표입니다. 장기 충성도·추천 의향을 묻는 순추천지수(NPS)와 목적이 다르며, 응답 수정 가능 기한과 저점 응답 후속 검토 흐름을 함께 정합니다.',
        example: '문의가 해결 상태로 바뀐 뒤 7일간 유효한 1~5점 CSAT 평가 링크를 띄우고, 1~2점 응답은 사유 태그 입력을 받아 품질 검토 대기열로 연결합니다.',
        promptSnippet: '고객 만족도(CSAT) 수집 화면과 집계 로직을 설계할 때 해결 직후 발송 시점, 응답 만료·수정 허용 기한, 불만족 사유 태그 선택, 저점 티켓 품질 검토 연결, 그리고 NPS와의 지표 구분을 명확히 하세요.',
      },
      en: {
        definition: 'A transactional metric measuring how satisfied a customer was with a specific support interaction or touchpoint, usually via a 1–5 scale or thumbs rating immediately after resolution. Unlike NPS, which tracks overall brand loyalty, CSAT evaluates discrete experiences.',
        example: 'After marking a ticket resolved, send a 7-day CSAT survey and route 1–2 star responses with reason tags into a supervisor quality-review queue.',
        promptSnippet: 'Design CSAT collection with explicit response and edit deadlines, structured dissatisfaction reason tags, low-score quality review escalation, and clear separation from NPS reporting.',
      },
    },
  },
  'ticket-deflection': {
    aliases: {
      ko: ['문의 방어', '셀프 서비스 해결 유도', 'FAQ 상담 전환', '문의 접수 전 해결'],
      en: ['self-service deflection', 'case deflection', 'FAQ deflection', 'pre-submit help'],
    },
    text: {
      ko: {
        definition: '사용자가 문의 양식을 작성하거나 제목을 입력하는 도중에 관련 도움말(FAQ)과 자가 해결 절차를 실시간으로 제안해 불필요한 티켓 접수를 줄이고 즉시 문제를 해결하게 돕는 고객지원 흐름입니다. 억지로 상담 경로를 숨기면 오히려 불만이 커지므로 해결되지 않았을 때 작성 중인 내용을 유지한 채 바로 상담으로 이어져야 합니다.',
        example: '문의 제목에 "영수증 재발급"을 입력하면 관련 가이드 3건을 인라인으로 펼쳐 보여 주고, [해결됨]을 누르면 이탈을 기록하며 [여전히 문의하기]를 누르면 입력한 제목·본문을 그대로 티켓으로 넘깁니다.',
        promptSnippet: '문의 자율 해결 유도(Ticket Deflection) UI는 도움말 추천으로 먼저 문제를 풀되 [도움이 되었나요 / 계속 문의하기] 경로를 숨기지 말고, 상담 전환 시 사용자가 이미 입력한 제목·첨부·본문 내용을 유지하세요.',
      },
      en: {
        definition: 'A support flow that surfaces relevant help articles or troubleshooting steps while a user composes an inquiry, resolving common issues immediately before a ticket is filed. Good deflection never hides the human contact path and preserves entered text if the user still submits.',
        example: 'Typing "invoice receipt" in the support form expands matching FAQ answers inline, recording deflection if solved or carrying draft text into ticket submission if unresolved.',
        promptSnippet: 'Implement ticket deflection with inline searchable help suggestions, honest "This solved my issue" vs. "Still need help" controls, and draft-preserving fallback to live ticket submission.',
      },
    },
  },
  'canned-response': {
    aliases: {
      ko: ['매크로 답변', '응대 템플릿', '상용구 답변', '변수 치환 매크로'],
      en: ['macro reply', 'response template', 'saved reply', 'support macro'],
    },
    text: {
      ko: {
        definition: '자주 반복되는 고객 문의에 빠르고 일관되게 답하기 위해 상담사가 불러와 쓰는 표준 답변 템플릿과 변수 치환 체계입니다. 고객 이름, 주문번호 같은 동적 변수가 비어 있거나 치환에 실패한 채로 그대로 발송되지 않도록 전송 전 검증을 거쳐야 합니다.',
        example: '상담사가 답변창에 `/환불` 매크로를 삽입하면 `{{customer_name}}`과 `{{order_id}}`가 자동 치환되고, 아직 채워지지 않은 `{{refund_reason}}` 플레이스홀더가 있으면 전송 버튼을 막고 강조 표시합니다.',
        promptSnippet: '상담 매크로 답변(Canned Response) 기능에서는 단축키/슬래시 호출, 변수 자동 치환과 누락 시 기본값 또는 수동 입력 강조, 그리고 미치환 `{{...}}` 토큰이 남은 상태의 발송 차단을 구현하세요.',
      },
      en: {
        definition: 'Pre-authored reply templates with dynamic variable placeholders that agents insert to answer common inquiries accurately and consistently. Before sending, unresolved or missing variables must be flagged so raw placeholder tokens never reach customers.',
        example: 'Inserting a `/refund` macro populates customer name and order ID automatically while highlighting any blank manual field and blocking send until resolved.',
        promptSnippet: 'Build canned response macros with fast slash/palette insertion, safe variable substitution with fallback defaults, and pre-send validation that prevents sending unresolved placeholder tokens.',
      },
    },
  },
  'ticket-merging': {
    aliases: {
      ko: ['티켓 병합', '중복 티켓 합치기', '동일 문의 통합', '문의 건 병합'],
      en: ['merge tickets', 'duplicate ticket merge', 'ticket consolidation', 'combine support cases'],
    },
    text: {
      ko: {
        definition: '같은 고객이 동일한 문제로 여러 채널이나 중복 접수로 남긴 티켓들을 하나의 대표(Primary) 티켓으로 합쳐 대화 이력과 담당자 배정을 일원화하는 상담 운영 처리입니다. 병합 시 어느 티켓의 SLA 기준·태그·첨부파일을 유지하고 닫히는 티켓의 요청자에게 어떻게 안내할지 규칙이 필요합니다.',
        example: '동일 주문에 대해 이메일과 챗으로 중복 접수된 2건 중 먼저 생성된 티켓을 대표 티켓으로 고르고, 보조 티켓의 대화·첨부를 합친 뒤 보조 티켓은 병합됨 상태로 닫아 중복 응대를 막습니다.',
        promptSnippet: '중복 문의 병합 기능에는 대표 티켓과 닫힐 보조 티켓을 명확히 대비해 보여 주는 확인 단계, 메시지·첨부·참조자 이관 규칙, 동일 요청자 검증, SLA 기준 유지 및 감사 이력 기록을 포함하세요.',
      },
      en: {
        definition: 'Consolidating multiple tickets submitted by the same customer about the same issue into a single primary ticket so conversation history, ownership, and SLA tracking stay unified.',
        example: 'Merge a duplicate chat follow-up into the original email ticket, copying messages and attachments onto the primary thread and closing the secondary ticket with a merge reference.',
        promptSnippet: 'Implement ticket merging with a clear confirmation preview comparing primary versus secondary tickets, explicit rules for transferring messages, watchers, and SLA timers, and an immutable merge audit trail.',
      },
    },
  },
  'priority-escalation': {
    aliases: {
      ko: ['우선순위 상향', '티켓 에스컬레이션', '상위 담당 이관', '긴급도 격상'],
      en: ['ticket escalation', 'severity escalation', 'tier handoff', 'SLA escalation'],
    },
    text: {
      ko: {
        definition: '문의의 영향도, 고객 등급, 응답 지연 임박 여부에 따라 티켓 우선순위를 높이거나 1차 상담에서 전문 엔지니어·관리자 그룹(Tier 2/3)으로 인수인계하는 운영 규칙입니다. 에스컬레이션 시 기존 대화 맥락, 재현 정보, 변경 사유가 함께 전달되어야 고객에게 같은 설명을 반복 요구하지 않습니다.',
        example: '결제 장애 티켓의 목표 해결 시각이 30분 남았을 때 우선순위를 높음에서 긴급으로 자동 격상하고, 사유와 내부 노트를 묶어 결제 운영 팀 큐로 이관합니다.',
        promptSnippet: '우선순위 에스컬레이션 흐름에는 수동 이관 사유·내부 인수인계 노트 작성, 자동 격상 임계 조건(임박·VIP·재오픈 횟수), 중복 알림 억제, 그리고 권한별 우선순위 변경 이력 기록을 포함하세요.',
      },
      en: {
        definition: 'Raising a ticket’s priority or handing it off from frontline agents to specialized engineering or supervisor tiers when impact, severity, or approaching SLA breaches demand faster or deeper resolution.',
        example: 'When a payment incident approaches its target window, escalate severity to Urgent, notify the on-call payments queue, and attach structured reproduction notes for the receiving tier.',
        promptSnippet: 'Design priority escalation with explicit trigger conditions (approaching breach, repeated reopen, tier handoff), required handoff summaries, clear ownership transfer, and complete escalation history.',
      },
    },
  },
  'first-contact-resolution': {
    aliases: {
      ko: ['FCR', '최초 접촉 해결률', '원콜 해결률', '1회 응대 완료율'],
      en: ['FCR', 'first touch resolution', 'one-touch resolution', 'single-contact resolution'],
    },
    text: {
      ko: {
        definition: '고객이 처음 문의를 접수한 뒤 추가 왕복 문의나 타 부서 재이관 없이 첫 번째 응대만으로 문제가 완전히 해결된 비율입니다. 단순 종료 처리만 하고 고객이 며칠 내 같은 사유로 다시 문의하거나 재오픈하면 진정한 FCR로 인정하지 않도록 재오픈 기간 기준을 함께 정의합니다.',
        example: '이번 달 해결 티켓 1,000건 중 추가 회신·재오픈 없이 7일 유예 창을 통과하고 1회 응대로 끝난 680건을 집계해 초동 응대 해결률 68%로 산출합니다.',
        promptSnippet: '초동 응대 해결률(FCR) 지표를 정의·표시할 때는 1회 응대로 인정할 해결 기준, 재오픈·후속 문의 제외 관찰 기간(예: 7일), 자동 응답 봇 안내만의 종료 제외 규칙을 먼저 명문화하세요.',
      },
      en: {
        definition: 'The percentage of customer inquiries resolved completely on the first agent interaction without requiring follow-up replies, escalations, or customer callbacks. Accurate FCR excludes auto-closed tickets that reopen within a defined lookback window.',
        example: 'Measure monthly FCR as resolved tickets closed after one agent reply with zero customer reopens or repeat tickets on the same topic during the next 7 days.',
        promptSnippet: 'Define First Contact Resolution (FCR) metrics with explicit rules for qualifying single-reply closures, a reopen lookback exclusion window, and separation of automated acknowledgments from true human resolutions.',
      },
    },
  },
};
