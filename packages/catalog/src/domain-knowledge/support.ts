import type { DomainKnowledge } from '../domain-knowledge';

export const SUPPORT_KNOWLEDGE: DomainKnowledge[] = [{
  id: 'support-ticket-routing-and-resolution',
  aliases: {
    ko: ['고객지원', '고객센터', '헬프데스크', '1:1 문의', '문의 접수', '상담 티켓'],
    en: ['customer support', 'helpdesk ticketing', 'support center', '1:1 inquiry', 'ticket routing and resolution'],
  },
  useCases: {
    ko: ['1:1 문의나 고객지원 티켓 시스템을 만들 때', '문의 유형 분류·우선순위·담당 배정을 연결할 때', '상담원 답변 대기와 고객 추가 확인 대기 상태를 구분할 때', '해결 완료 처리와 고객의 재오픈(다시 열기) 조건을 설계할 때'],
    en: ['Building a 1:1 customer inquiry or helpdesk ticketing system', 'Connecting ticket categorization, priority and agent routing', 'Separating waiting-on-agent from waiting-on-customer states', 'Designing ticket resolution, closure and customer reopening rules'],
  },
  keywords: {
    ko: ['고객지원', '고객센터', '헬프데스크', '문의', '티켓', '1:1 문의', '우선순위', '상담원', '답변 대기', '내부 메모', '해결', '재오픈', '만족도'],
    en: ['customer support', 'helpdesk', 'ticket', 'ticketing', 'inquiry', 'priority', 'triage', 'agent', 'waiting on customer', 'internal note', 'resolution', 'reopen', 'satisfaction'],
  },
  text: {
    ko: {
      domain: '고객지원·문의',
      title: '문의 접수·담당 배정·답변 대기와 해결·재오픈 흐름',
      summary: '누구의 응답을 기다리는지 구분하고, 공개 답변·내부 메모·해결·재오픈을 나누어 연결합니다.',
      overview: '고객 문의는 단순히 접수됨과 완료됨 두 상태만으로는 운영하기 어렵습니다. 상담원 답변을 기다리는 상태인지, 고객에게 추가 정보를 요청하고 회신을 기다리는 상태인지, 해결 안내 후 재문의가 가능한 상태인지를 나누어야 누락 없이 대응할 수 있습니다. 아래 내용은 고객지원·문의 흐름을 설계하기 위한 참고이며 특정 서비스의 응답 목표 시간(SLA)이나 상담 운영 규칙을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '문의 유형·우선순위와 배정', description: '결제·계정·오류 같은 문의 유형과 긴급도를 기준으로 담당 팀이나 상담원에게 배정합니다. 접수 직후 미배정 보관함과 담당 배정 상태를 구분합니다.' },
        { name: '상담원 대기 vs 고객 회신 대기', description: '신규 접수나 고객의 추가 답변이 도착해 상담원이 확인해야 하는 상태와, 상담원이 안내 후 고객의 확인을 기다리는 상태를 분리합니다.' },
        { name: '공개 답변과 상담원 내부 메모', description: '고객에게 실제로 노출되고 알림이 발송되는 공개 답변과, 담당자 인계나 확인을 위해 상담원끼리만 보는 내부 메모를 엄격히 구분합니다.' },
        { name: '해결(Resolved)과 최종 종료(Closed)', description: '답변을 마쳐 해결로 표시한 뒤에도 고객이 추가 질문을 달면 다시 열리는(재오픈) 기간을 둘지, 일정 기간 뒤 최종 종료하여 새 문의로 받게 할지 정합니다.' },
        { name: '문의 맥락과 첨부·개인정보 보호', description: '주문 번호·환경 정보·스크린샷 등 문제 파악에 필요한 맥락을 함께 받고, 민감한 정보는 열람 권한과 보관 범위를 제한합니다.' },
      ],
      workflow: [
        { name: '문의 접수와 접수 확인 안내하기', description: '문의 유형과 내용을 입력받아 티켓 번호를 발급하고, 고객이 진행 상태를 조회할 수 있는 경로를 안내합니다.' },
        { name: '분류·배정과 우선순위 정하기', description: '문의 성격에 따라 담당자를 배정하고, 미응답 문의와 고객 회신이 도착한 문의를 우선 확인할 수 있게 정렬합니다.' },
        { name: '공개 답변·내부 메모와 대기 상태 전환하기', description: '상담원이 공개 답변을 보내면 고객 회신 대기로, 고객이 답장하면 다시 상담원 확인 필요 상태로 자동 전환해 누락을 막습니다.' },
        { name: '해결 확인·재오픈·최종 종료 연결하기', description: '문제가 해결되면 해결 상태로 바꾸고, 고객이 추가 문의를 남기면 재오픈하거나 종료 기한 후에는 이전 문의를 참조한 새 문의 작성을 안내합니다.' },
      ],
      pitfalls: [
        { name: '상담원이 답변만 남기면 무조건 최종 완료로 닫아 버리기', description: '상담원의 첫 안내만으로 문제가 끝나지 않을 수 있습니다. 회신 대기와 해결 완료를 구분하고 고객이 후속 답변을 남길 수 있는지 분명히 하세요.' },
        { name: '내부 메모와 고객 공개 답변 입력창을 헷갈리게 두기', description: '내부 확인용 메모가 고객에게 발송되면 큰 운영 사고가 됩니다. 작성 단계에서 공개 답변과 내부 메모의 시각적 구분과 확인 절차를 분리하세요.' },
        { name: '고객이 추가 답장을 보냈는데도 완료·대기 목록에 묻혀 있기', description: '고객 회신이 도착하면 티켓 상태를 다시 확인 필요로 올리고 읽지 않은 알림 표시를 갱신해야 응답 지연을 막을 수 있습니다.' },
      ],
      questions: [
        '로그인한 회원과 비회원 중 누가 문의를 남길 수 있으며, 비회원은 이메일이나 조회 번호로 확인하나요?',
        '문의 유형·우선순위는 고객이 선택하나요, 접수 후 운영자가 분류·변경하며 담당자는 어떻게 배정하나요?',
        '상담원 확인 필요·고객 회신 대기·보류·해결·최종 종료 중 어떤 상태 단계를 사용하나요?',
        '상담원끼리만 공유하는 내부 메모나 담당자 이관 기능이 필요한가요?',
        '해결 처리 후 고객이 다시 답장하면 기존 티켓을 재오픈하나요? 얼마 뒤 최종 종료로 전환하나요?',
        '답변 등록 실패나 두 상담원의 동시 답변 충돌이 발생했을 때 어떤 경고와 최종 상태를 보여 주나요?',
      ],
      example: '예시: 1:1 문의함에서 접수 시 상담원 확인 필요 상태로 시작하고, 상담원이 답변을 보내면 고객 회신 대기로 바뀌며, 해결 처리 후 7일 안에는 고객이 추가 답장으로 티켓을 다시 열 수 있게 구성할 수 있습니다. 실제 비회원 접수 여부·내부 메모 사용·자동 종료 기한은 고객지원 정책에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'character-budget-feedback', reason: '문의 본문이나 답변 입력 시 권장·제한 글자 수와 초과 상태를 실시간으로 안내하는 표현에 참고할 수 있습니다. 실제 티켓 저장과 전송은 별도로 구현해야 합니다.' },
        { id: 'unread-notification-badge', reason: '새로운 고객 회신이나 미확인 문의 건수를 배지로 표시하고 확인 시 갱신하는 표현에 참고할 수 있습니다. 실제 실시간 알림 수신은 구현하지 않습니다.' },
      ],
      promptSnippet: '고객지원·1:1 문의(티켓) 서비스의 접수·배정·답변·해결·재오픈 흐름을 설계해 줘. 먼저 회원/비회원 접수 방식, 문의 분류와 담당 배정 기준, 상담원 대기·고객 회신 대기·해결·종료 상태 구분, 공개 답변과 내부 메모 분리, 재오픈 허용 기한을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 고객과 상담원(운영자)이 각 단계에서 볼 정보와 가능한 행동.\n2. 접수·배정·상담원 확인 필요·고객 회신 대기·해결·재오픈·최종 종료 상태 전환.\n3. 공개 답변과 내부 메모의 권한·노출·알림 구분.\n4. 답변 전송 실패·동시 응대 충돌·종료 후 추가 문의 시 처리 방식과 사용자 안내.\n5. 문의 작성·내 문의 내역·상담원 티켓 목록·대화 상세·미확인 알림 표시의 연결.\n상담원의 첫 답변을 곧바로 최종 종료로 단정하거나 내부 메모와 공개 답변을 같은 노출 범위로 다루지 말아 줘. 예시 정책과 디자인 데모를 실제 고객지원 시스템으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Customer Support & Ticketing',
      title: 'Ticket intake, assignment, waiting states and resolution or reopening workflows',
      summary: 'Distinguish whose reply is needed next, and separate public replies, internal notes, resolution and reopening.',
      overview: 'Customer inquiries need more than open and closed flags. Separating tickets waiting on an agent from tickets waiting on a customer reply, and distinguishing resolved tickets that can still be reopened from permanently closed tickets, keeps follow-ups from falling through the cracks. These concepts are design references, not default SLA targets or staffing rules for a specific support team.',
      concepts: [
        { name: 'Categorization, priority and routing', description: 'Route inquiries by category (billing, account, bug) and urgency, and distinguish unassigned queue items from assigned tickets.' },
        { name: 'Waiting on agent versus waiting on customer', description: 'Separate new or customer-replied tickets that need agent action from tickets where an agent asked for details and awaits the customer.' },
        { name: 'Public replies versus internal notes', description: 'Strictly separate customer-visible replies that trigger notifications from internal agent notes used for handoffs and investigation.' },
        { name: 'Resolved versus closed and reopening', description: 'Decide whether a resolved ticket reopens when the customer replies within a window, and when it transitions to permanently closed so new issues start a fresh ticket.' },
        { name: 'Context capture and privacy boundaries', description: 'Collect order IDs, environment details or attachments needed to troubleshoot while restricting access to sensitive customer data.' },
      ],
      workflow: [
        { name: 'Confirm ticket intake and tracking path', description: 'Capture category and problem context, issue a ticket reference, and show customers where to track replies.' },
        { name: 'Triage, assign and prioritize queues', description: 'Assign tickets to an owner or queue and surface unanswered or newly customer-replied tickets first.' },
        { name: 'Switch waiting states on replies and notes', description: 'Move a ticket to waiting-on-customer after a public agent reply and back to agent-action-needed when the customer responds.' },
        { name: 'Connect resolution, reopening and closure', description: 'Mark issues resolved when answered, reopen if the customer replies within the allowed window, or guide them to open a linked follow-up ticket after closure.' },
      ],
      pitfalls: [
        { name: 'Closing tickets permanently on the first agent reply', description: 'An initial answer may require follow-up. Distinguish awaiting customer confirmation or resolved states from final closure.' },
        { name: 'Blurring internal notes and public customer replies', description: 'Sending an internal note to a customer is a serious operational mistake. Separate note and reply modes visually and in confirmation actions.' },
        { name: 'Burying customer follow-ups inside waiting or resolved views', description: 'When a customer replies, automatically return the ticket to an active agent queue and update unread indicators.' },
      ],
      questions: [
        'Can only signed-in members submit inquiries, or can guests submit and check status via email or reference code?',
        'How are categories and priorities set, and how are tickets assigned or transferred between agents?',
        'Which statuses are used across new, waiting on agent, waiting on customer, on hold, resolved and closed?',
        'Do agents need private internal notes and handoff history separate from customer-visible replies?',
        'Does a customer reply reopen a resolved ticket, and when does a resolved ticket become permanently closed?',
        'If sending a reply fails or two agents respond at the same time, what warning and final state are shown?',
      ],
      example: 'Example: a support inbox could open new inquiries in an agent-action queue, switch to waiting-on-customer when an agent replies, and allow customer replies to reopen a resolved ticket for 7 days before final closure. Confirm actual guest access, internal-note rules and auto-close windows before adopting this setup.',
      relatedDesigns: [
        { id: 'character-budget-feedback', reason: 'A reference for showing remaining or exceeded character counts on inquiry or reply fields. Real ticket submission and attachments need separate implementation.' },
        { id: 'unread-notification-badge', reason: 'A reference for indicating unread customer replies and clearing the badge when reviewed. It does not implement live message delivery.' },
      ],
      promptSnippet: 'Help design a customer-support and ticketing workflow. First confirm member/guest intake, categorization and assignment rules, waiting-on-agent versus waiting-on-customer states, public reply versus internal note separation, and resolution/reopening windows. Do not assume undecided rules.\nBased on the answers, describe:\n1. Information and actions available to customers and support agents at each stage.\n2. Transitions across intake, assigned, waiting on agent, waiting on customer, resolved, reopened and closed states.\n3. Visibility, permission and notification boundaries between public replies and internal notes.\n4. Handling and user feedback for failed replies, concurrent agent responses and follow-ups after closure.\n5. How inquiry forms, customer ticket history, agent queues, conversation threads and unread badges connect.\nDo not treat the first agent reply as permanent closure or mix internal notes with public replies, and do not mistake example policies or design demos for a real helpdesk system.',
    },
  },
  sources: [
    { title: 'Zendesk Help — About ticket statuses and life cycle', url: 'https://support.zendesk.com/hc/en-us/articles/4408883376154' },
    { title: 'Intercom Help — Inbox workflows and conversation states', url: 'https://www.intercom.com/help/en/articles/6608152-how-to-use-tickets' },
  ],
}, {
  id: 'support-sla-priority-and-escalation',
  aliases: {
    ko: ['SLA 응대 목표 시간', '영업시간 타이머 일시정지', '문의 우선순위 격상', '상위 팀 에스컬레이션'],
    en: ['SLA response targets', 'business-hours SLA timer', 'priority escalation', 'tier handoff workflow'],
  },
  useCases: {
    ko: ['첫 응답 목표 시간(First Response)과 해결 목표 시간(Resolution) SLA를 구분해 관리할 때', '영업시간 외·주말이나 고객 회신 대기 중에 SLA 타이머를 일시정지할 때', '목표 시간 임박·초과 시 우선순위를 높이거나 상위 담당자에게 에스컬레이션할 때', '전문 부서(2차 기술 지원 등)로 티켓을 이관할 때 맥락과 책임 주체를 남길 때'],
    en: ['Tracking separate SLA targets for first response, next reply and full resolution', 'Pausing SLA timers outside business hours or while waiting on the customer', 'Escalating priority or alerting leads when a ticket approaches or breaches its SLA', 'Handing off tickets to Tier-2 or specialist teams with structured context'],
  },
  keywords: {
    ko: ['SLA', '응대 목표 시간', '첫 응답 시간', '해결 시간', '영업시간', '타이머 일시정지', '우선순위 격상', '에스컬레이션', '인수인계'],
    en: ['SLA', 'first response time', 'resolution target', 'business hours', 'timer pause', 'breach warning', 'priority escalation', 'tier handoff', 'queue sorting'],
  },
  text: {
    ko: {
      domain: '고객지원·문의',
      title: '응대 목표 시간(SLA)·영업시간 기준 타이머·우선순위 격상과 인수인계',
      summary: '첫 응답·해결 목표 시간과 영업시간·대기 정지 조건을 구분하고, 마감 임박 경고와 상위 단계 인수인계를 연결합니다.',
      overview: '고객지원에서 모든 문의를 접수 순서대로만 처리하면 결제 장애나 서비스 중단 같은 긴급 문의가 뒤로 밀립니다. 문의 긴급도에 따른 목표 시간(SLA)을 정하고, 영업시간 외 시간이나 고객 회신 대기 구간에서 타이머가 어떻게 흐르는지, 목표 시간 초과 전에 어떻게 경고를 띄우고 상위 팀으로 인계할지 명확히 해야 합니다. 아래 내용은 SLA·이관 흐름 설계를 위한 참고이며 특정 계약 기준 시간을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '첫 응답·후속 응답·최종 해결 목표 시간 구분', description: '접수 후 첫 안내까지의 목표 시간, 고객의 추가 질문 이후 다음 답변까지의 시간, 문제 최종 해결까지의 시간을 나누어 측정합니다.' },
        { name: '영업시간 기준 계산과 고객 대기 중 일시정지', description: '24시간 연중무휴로 흐르는 달력 시간과 평일 운영 시간만 계산하는 영업시간 기준을 구분하고, 고객 회신 대기 상태에서는 타이머를 멈출지 정합니다.' },
        { name: '마감 임박(At Risk)·초과(Breached) 경고와 우선순위 변경', description: '목표 시간 만료 전 경고를 표시해 목록 상단에 올리고, 도중에 긴급도가 바뀌었을 때 목표 시간을 처음 접수 시각부터 재계산할지 변경 시점부터 적용할지 정의합니다.' },
        { name: '상위 단계(Tier 2)·타 부서 인수인계와 소유권', description: '일반 상담에서 기술·정산 팀으로 에스컬레이션할 때 필수 인계 요약(재현 조건, 확인 내역)을 남기고 주 담당 소유권이 누구에게 있는지 분명히 합니다.' },
      ],
      workflow: [
        { name: '문의 유형·긴급도에 따른 목표 시간 부여하기', description: '접수 시 문의 분류, 고객 등급, 영향 범위를 기준으로 우선순위와 첫 응답·해결 목표 시각을 계산해 배정합니다.' },
        { name: '상태 전환과 영업시간에 맞춰 타이머 갱신하기', description: '상담원이 답변해 고객 대기 상태로 바뀌거나 영업 종료 시각이 되면 타이머를 일시정지하고, 고객 회신이나 영업 시작 시 재개합니다.' },
        { name: '임박·초과 티켓 강조와 에스컬레이션 알림 보내기', description: '남은 목표 시간이 임계치 이하인 티켓을 큐 상단에 정렬하고, 초과 위험 시 담당자와 팀 리드에게 알림을 보냅니다.' },
        { name: '인수인계 체크리스트 작성 후 전문 팀으로 이관하기', description: '상위 팀 이관 시 확인한 사항과 내부 메모를 남겨 배정 대상을 옮기고, 고객에게 검토 진행 안내를 전달할지 선택합니다.' },
      ],
      pitfalls: [
        { name: '고객 회신을 기다리는 시간까지 상담원 지연(SLA 초과)으로 집계하기', description: '고객이 추가 정보를 늦게 주었는데 상담원 SLA 위반으로 잡히면 지표가 왜곡됩니다. 대기 주체별 타이머 정지 조건을 분리하세요.' },
        { name: '우선순위를 높였는데 마감 시각이 갱신되지 않거나 이미 초과로 뜨기', description: '일반 문의를 긴급으로 격상할 때 목표 시간을 접수 시점 기준과 변경 시점 기준 중 무엇으로 재산정할지 일관된 규칙을 두세요.' },
        { name: '맥락 메모 없이 다른 팀 큐로 티켓만 넘기기', description: '이관 사유와 사전 확인 내용 없이 담당 팀만 바꾸면 새 담당자가 고객에게 같은 질문을 반복하게 됩니다.' },
      ],
      questions: [
        '첫 응답 시간, 후속 응답 시간, 최종 해결 시간 중 어떤 목표(SLA)를 관리하며 긴급도별 기준은 어떻게 다른가요?',
        '목표 시간은 24시간 기준인가요, 휴일·야간을 제외한 영업시간 기준인가요? 고객 회신 대기 중에는 타이머가 멈추나요?',
        '진행 도중 문의 우선순위가 바뀌면 남은 목표 시간은 접수 시각과 변경 시각 중 어디를 기준으로 다시 계산하나요?',
        '목표 시간 임박 또는 초과 시 목록 정렬 변경 외에 담당자·관리자 알림이나 자동 재배정이 일어나나요?',
        '상위 팀이나 다른 부서로 에스컬레이션할 때 필수로 입력할 인계 항목과 기존 담당자의 참조 유지 여부는 무엇인가요?',
      ],
      example: '예시: 장애 문의는 24시간 기준으로 첫 응답 1시간, 일반 문의는 평일 영업시간 기준으로 첫 응답 8시간을 부여하되, 고객 회신 대기 상태에서는 해결 타이머를 일시정지하고 마감 30분 전부터 경보 배지를 띄우도록 구성할 수 있습니다. 실제 목표 시간 수치와 영업시간표는 서비스 운영 기준에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'ly-sortable-data-table', reason: '상담 큐에서 남은 목표 시간·우선순위·상태별로 티켓 목록을 정렬해 급한 문의를 먼저 찾는 표현에 참고할 수 있습니다. 실제 타이머 계산과 서버 정렬은 별도로 구현해야 합니다.' },
        { id: 'faceted-filter-chips', reason: '임박·초과 여부, 우선순위, 담당 팀 조건으로 티켓 큐를 빠르게 좁히는 표현에 참고할 수 있습니다. 실제 에스컬레이션 규칙은 구현하지 않습니다.' },
      ],
      promptSnippet: '고객지원 티켓의 응대 목표 시간(SLA), 영업시간 타이머, 우선순위 격상 및 상위 팀 인수인계 흐름을 설계해 줘. 먼저 측정할 목표 항목(첫 응답·후속 응답·해결), 영업시간 적용 및 고객 대기 시 일시정지 규칙, 우선순위 변경 시 타이머 재계산 기준, 임박·초과 시 알림 및 인수인계 절차를 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 우선순위·문의 유형별 목표 시간 기준과 타이머 시작·일시정지·종료 조건.\n2. 영업시간·휴일 캘린더 반영 및 진행 중 우선순위 변경 시 마감 시각 재산정 규칙.\n3. 마감 임박(At Risk)·초과(Breached) 상태 표시, 큐 정렬, 관리자 에스컬레이션 알림.\n4. 타 부서·상위 단계 이관 시 필수 인계 메모, 담당 소유권 이전, 고객 안내 방식.\n5. 상담 큐 정렬 테이블·SLA 카운트다운 배지·우선순위 변경·이관 모달의 연결.\n화면의 남은 시간 표시만으로 영업시간 계산이나 자동 이관이 수행된다고 가정하지 말고, 예시 정책과 디자인 데모를 실제 헬프데스크 SLA 엔진으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Customer Support & Ticketing',
      title: 'SLA targets, business-hour timers, priority escalation and handoffs',
      summary: 'Distinguish first-response and resolution SLAs, pause timers during customer wait or off-hours, and connect breach warnings to handoffs.',
      overview: 'Working a support queue strictly first-in, first-out can leave urgent outages waiting behind routine questions. Teams need clear service-level targets (SLAs), rules for when timers pause outside business hours or while awaiting customer input, and structured handoffs when escalating to specialists. These concepts are design references, not default contractual SLA commitments.',
      concepts: [
        { name: 'First-response, next-reply and resolution targets', description: 'Track separate countdowns for acknowledging a new ticket, replying to a customer follow-up, and resolving the underlying issue.' },
        { name: 'Business hours versus calendar hours and pause states', description: 'Decide whether SLA clocks run 24/7 or only during scheduled operating hours, and whether waiting on the customer pauses the resolution clock.' },
        { name: 'At-risk warnings, breaches and priority recalculation', description: 'Surface tickets approaching their deadline before they breach, and define how deadlines recalculate when ticket priority is upgraded or downgraded.' },
        { name: 'Structured tier escalation and ownership transfer', description: 'Require troubleshooting context when escalating from Tier-1 support to engineering or billing specialists, and clarify who owns customer follow-up.' },
      ],
      workflow: [
        { name: 'Assign priority and SLA policy at intake', description: 'Match the ticket category, severity and customer tier to an SLA policy and calculate initial target timestamps.' },
        { name: 'Pause and resume clocks across states and schedules', description: 'Pause timers when waiting on the customer or outside operating hours, and resume immediately when the customer replies or business hours start.' },
        { name: 'Highlight at-risk tickets and trigger escalation alerts', description: 'Sort queues by remaining SLA time and notify the assigned agent or team lead when a target is at risk or breached.' },
        { name: 'Hand off to specialist queues with required notes', description: 'Capture reproduction steps and investigation notes before transferring ownership or linking a specialist escalation.' },
      ],
      pitfalls: [
        { name: 'Counting customer wait time against agent SLA compliance', description: 'If the clock keeps ticking while waiting for a customer’s log file, agents are penalized for delays they cannot control. Pause timers on customer-wait states.' },
        { name: 'Ambiguous deadline math when priority changes mid-ticket', description: 'Define explicitly whether upgrading a ticket from Normal to Urgent recalculates the target from ticket creation or from the time of escalation.' },
        { name: 'Reassigning tickets to another team without handoff context', description: 'Dropping a ticket into a Tier-2 queue without an internal summary forces the next responder to re-ask questions the customer already answered.' },
      ],
      questions: [
        'Which SLA metrics (first response, next reply, total resolution) are tracked, and how do targets vary by priority?',
        'Do timers run on calendar hours or business hours, and which statuses (such as waiting on customer) pause the clock?',
        'When a ticket’s priority is changed mid-flight, is the new deadline calculated from original creation or from the change timestamp?',
        'What happens when a ticket becomes at-risk or breaches its SLA (visual badge, queue pinning, lead alert, auto-reassignment)?',
        'When escalating a ticket to a specialist team, what handoff fields are required and who remains responsible for customer updates?',
      ],
      example: 'Example: a support desk could measure critical outage tickets 24/7 with a 1-hour first-response target, measure standard inquiries during weekday business hours with an 8-hour target, pause resolution timers while waiting on the customer, and flag tickets in amber 30 minutes before breach. Confirm actual SLA targets and operating schedules before adopting this setup.',
      relatedDesigns: [
        { id: 'ly-sortable-data-table', reason: 'A reference for sorting ticket queues by remaining SLA time, priority or status. Real SLA timer calculation and server sorting need separate implementation.' },
        { id: 'faceted-filter-chips', reason: 'A reference for filtering queues by breach status, priority and assigned tier. Real escalation rules need separate implementation.' },
      ],
      promptSnippet: 'Help design SLA timers, priority escalation and tier handoffs for a customer-support system. First confirm tracked SLA metrics (first response, next reply, resolution), business-hour and customer-wait pause rules, deadline recalculation on priority changes, breach notifications, and handoff requirements. Do not assume undecided rules.\nBased on the answers, describe:\n1. Priority levels, SLA target definitions, and timer start/pause/stop conditions.\n2. Business-hour calendar rules and deadline recalculation when priority or category changes.\n3. At-risk and breached indicators, queue sorting and escalation alerts.\n4. Required handoff notes, ownership transfer and customer communication during tier escalation.\n5. How the sortable queue table, SLA countdown badges, priority controls and escalation modal connect.\nDo not assume countdown badges compute business hours automatically, and do not mistake example policies or design demos for a real SLA engine.',
    },
  },
  sources: [
    { title: 'Zendesk Help — Defining and using SLA policies', url: 'https://support.zendesk.com/hc/en-us/articles/4408829459866' },
    { title: 'Jira Service Management Support — Set up SLA goals and calendars', url: 'https://support.atlassian.com/jira-service-management-cloud/docs/create-service-level-agreements-slas/' },
  ],
}, {
  id: 'support-faq-self-service-and-deflection',
  aliases: {
    ko: ['FAQ 도움말 추천', '자가 해결 확인', '문의 작성 중 문서 추천', '상담원 전환 연결'],
    en: ['self-service FAQ deflection', 'suggested help articles', 'did this solve your issue', 'faq to ticket handoff'],
  },
  useCases: {
    ko: ['고객이 문의를 제출하기 전에 입력한 제목·유형에 맞는 도움말(FAQ)을 추천할 때', '추천 문서로 해결되었는지(해결됨 / 계속 문의하기)를 확인해 접수 건수를 줄일 때', '해결되지 않아 1:1 문의로 넘어갈 때 이미 입력한 내용과 열람한 문서 맥락을 그대로 전달할 때', '문의는 많아도 관련 도움말이 없거나 해결률이 낮은 문서를 찾아 개선할 때'],
    en: ['Suggesting relevant help articles while a customer types an inquiry subject or category', 'Asking whether a suggested article solved the problem before creating a ticket', 'Carrying typed inputs and viewed articles into the ticket form when self-service is not enough', 'Identifying high-contact topics with low article helpfulness for content updates'],
  },
  keywords: {
    ko: ['FAQ', '도움말 센터', '자가 해결', '문서 추천', '문의 전환', '유용성 평가', '맥락 유지', '검색어 매칭', '고객센터'],
    en: ['FAQ', 'help center', 'self-service', 'ticket deflection', 'suggested articles', 'helpfulness vote', 'context handoff', 'knowledge base', 'support intake'],
  },
  text: {
    ko: {
      domain: '고객지원·문의',
      title: '도움말 문서(FAQ) 추천·해결 여부 확인과 상담 전환 연결',
      summary: '문의 접수 전 관련 도움말을 제시해 즉시 해결을 돕고, 미해결 시 입력 맥락을 잃지 않고 1:1 문의로 연결합니다.',
      overview: '비밀번호 변경 방법이나 환불 규정처럼 자주 묻는 질문은 상담원 답변을 기다리는 것보다 정확한 도움말을 바로 보는 편이 고객에게도 빠릅니다. 다만 도움말 추천이 문의 접수를 가로막는 장벽처럼 느껴지면 고객 불만이 커집니다. 추천 문서로 즉시 해결할 수 있는 경로와, 해결되지 않았을 때 이미 적은 내용을 다시 쓰지 않고 곧바로 상담 접수까지 이어지는 흐름을 함께 설계해야 합니다. 아래 내용은 자가 해결·상담 전환 설계를 위한 참고이며 특정 추천 알고리즘을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '문의 유형·입력어 기반 추천과 즉시 열람', description: '고객이 선택한 카테고리나 입력 중인 제목 키워드에 맞춰 관련 FAQ 요약을 보여 주고, 작성 중인 화면을 벗어나지 않고 본문을 확인할 수 있게 합니다.' },
        { name: '자가 해결 확인(해결됨)과 상담 계속하기 분리', description: '문서를 읽고 문제가 해결되었을 때 문의를 접수하지 않고 종료하는 선택과, 여전히 해결되지 않아 1:1 문의를 제출하는 선택을 명확히 구분합니다.' },
        { name: '상담 전환 시 입력값 및 열람 문서 맥락 인계', description: '도움말을 보고도 해결되지 않아 문의를 제출할 때 고객이 처음에 입력한 제목·본문·분류와 이미 확인한 FAQ 문서 목록을 티켓에 함께 남깁니다.' },
        { name: '문서 유용성 피드백과 미해결 주제 집계', description: '도움말 하단의 도움 여부 응답과 문서 확인 후에도 실제 문의로 이어진 비율을 집계해 보완이 필요한 문서를 파악합니다.' },
      ],
      workflow: [
        { name: '문의 분류 선택 또는 키워드 입력받기', description: '고객이 겪는 문제 유형을 고르거나 한 줄 요약을 입력하면 일치하는 도움말 문서를 찾습니다.' },
        { name: '작성 흐름 안에서 추천 도움말 미리보기 제공하기', description: '페이지 이동으로 입력 내용이 날아가지 않도록 펼침 영역이나 사이드 패널에서 추천 FAQ 내용을 바로 보여 줍니다.' },
        { name: '해결 여부 확인 후 종료 또는 문의 본문으로 진행하기', description: '문서로 해결되었다면 완료 안내로 마치고, 해결되지 않았다면 기존 입력값을 유지한 채 상세 문의 입력 단계로 넘깁니다.' },
        { name: '열람한 FAQ 기록을 포함해 티켓 생성하기', description: '상담원이 이미 고객이 읽은 FAQ 링크를 다시 보내지 않도록 티켓 맥락에 확인 완료 문서를 표시합니다.' },
      ],
      pitfalls: [
        { name: '도움말을 읽으러 갔다가 돌아오면 작성 중이던 문의 내용이 초기화되기', description: '추천 문서 링크가 현재 탭을 덮어써서 고객이 적던 내용을 잃어버리면 큰 불편을 겪습니다. 인라인 펼침이나 입력 상태 보존을 적용하세요.' },
        { name: '문의하기 버튼을 숨기거나 강제로 여러 문서를 읽어야만 접수하게 막기', description: '해결되지 않는 긴급 문제인데도 접수 경로를 막으면 고객 이탈과 불만이 심해집니다. 언제든 문의 작성을 이어갈 수 있게 두세요.' },
        { name: '고객이 방금 읽고 해결 안 된 FAQ 링크를 상담원이 그대로 다시 안내하기', description: '고객이 이미 확인하고 넘어온 도움말 목록을 상담원 화면에 표시해 중복 안내를 방지하세요.' },
      ],
      questions: [
        '도움말(FAQ) 추천은 고객센터 첫 검색창에서 보여주나요, 1:1 문의 작성 중 제목·유형 입력 단계에서 함께 보여주나요?',
        '추천 문서를 클릭했을 때 현재 화면 안에서 펼쳐 보나요, 새 탭으로 여나요? 작성 중이던 입력값은 어떻게 유지하나요?',
        '고객이 추천 문서로 해결되지 않아 문의를 접수할 때 어떤 정보(검색어, 열람 문서, 선택 분류)를 티켓에 함께 전달하나요?',
        '장애나 결제 오류처럼 자가 해결보다 즉시 접수가 우선인 유형은 추천 단계를 건너뛰게 하나요?',
        '도움말 문서의 마지막 수정일 표시나 "도움이 되었나요?" 평가를 수집하나요?',
      ],
      example: '예시: 1:1 문의 작성 첫 단계에서 분류와 제목을 입력하면 아래에 관련 FAQ 3개가 아코디언으로 펼쳐지고, "해결되었어요"를 누르면 접수를 마치고 "계속 문의하기"를 누르면 입력한 제목과 확인한 FAQ 목록이 그대로 담긴 채 본문 작성으로 이어지게 구성할 수 있습니다. 실제 추천 매칭 방식과 예외 카테고리는 운영 정책에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'ly-expandable-data-rows', reason: '문의 작성 화면을 떠나지 않고 추천 FAQ 항목을 펼쳐 요약과 해결 절차를 확인하는 표현에 참고할 수 있습니다. 실제 문서 검색과 추천 매칭은 별도로 구현해야 합니다.' },
        { id: 'dismissible-inline-banner', reason: '선택한 문의 유형과 관련된 공지나 빠른 해결 안내를 상단 배너로 보여 주고 닫을 수 있는 표현에 참고할 수 있습니다. 실제 상담 접수 연동은 구현하지 않습니다.' },
      ],
      promptSnippet: '고객지원 서비스의 도움말(FAQ) 추천, 자가 해결 확인, 1:1 상담 전환 흐름을 설계해 줘. 먼저 FAQ 추천 노출 시점, 문서 열람 시 작성 중 입력값 보존 방식, 자가 해결 종료 vs 문의 계속하기 선택, 상담 전환 시 상담원에게 전달할 열람 문서 맥락, 즉시 접수 예외 유형을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 문의 유형·검색어에 따른 추천 도움말 노출 조건과 즉시 접수 예외 규칙.\n2. 작성 화면 내 문서 미리보기 및 입력 내용 유지 방식.\n3. 해결 완료 종료와 미해결 시 1:1 문의 본문 작성으로의 단계 전환.\n4. 생성된 티켓에 포함할 검색어·열람 FAQ 목록 등 상담원 참고 맥락.\n5. 문의 분류/제목 입력·추천 FAQ 펼침 목록·해결 확인 버튼·상세 접수 폼의 연결.\n도움말 추천이 문의 접수 자체를 차단해도 된다고 가정하지 말고, 예시 정책과 디자인 데모를 실제 검색·추천 백엔드로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Customer Support & Ticketing',
      title: 'Self-service FAQ suggestions, resolution checks and ticket handoff',
      summary: 'Surface relevant help articles before ticket submission, let users confirm if their issue is solved, and preserve context when handing off to a ticket.',
      overview: 'Many routine questions—such as resetting a password or checking refund eligibility—can be answered immediately with the right help article. However, self-service should never trap frustrated customers or wipe out what they already typed. Connect inline article suggestions with a clear choice to either mark the issue solved or continue to a support ticket with full context intact. These concepts are design references, not default search or ranking rules.',
      concepts: [
        { name: 'Contextual article suggestions during intake', description: 'Match help-center articles against the selected category and typed subject so customers can read answers inline without leaving the intake flow.' },
        { name: 'Explicit resolution check versus continuing to support', description: 'Give users a clear action to confirm that an article solved their problem alongside an unobstructed path to continue submitting their inquiry.' },
        { name: 'Context preservation into the created ticket', description: 'Carry the customer’s typed subject, category, search query and list of already-viewed FAQ articles into the ticket so agents do not repeat the same link.' },
        { name: 'Article helpfulness and deflection tracking', description: 'Record whether viewed articles resolved the issue or led to a ticket so teams can spot outdated or missing documentation.' },
      ],
      workflow: [
        { name: 'Capture inquiry category or problem summary', description: 'Ask the customer for their topic or a short summary and fetch matching help articles or known-issue notices.' },
        { name: 'Display expandable article previews in place', description: 'Let customers read suggested steps inside an accordion or drawer so their form inputs are never lost.' },
        { name: 'Branch on solved confirmation or ticket continuation', description: 'Close the flow cleanly if the customer confirms the article helped, or reveal the remaining ticket fields with prior inputs prefilled.' },
        { name: 'Attach viewed-article history for the assigned agent', description: 'Show the agent which FAQ articles the customer already opened before submitting the ticket.' },
      ],
      pitfalls: [
        { name: 'Navigating away to an article page and losing typed ticket inputs', description: 'If clicking a suggested FAQ navigates the current tab away without saving form state, customers have to retype their issue from scratch.' },
        { name: 'Hiding the submit button behind mandatory article hurdles', description: 'Forcing users with urgent billing or outage issues to click through unhelpful FAQs creates friction. Keep the path to human support clear.' },
        { name: 'Agents replying with the exact FAQ link the customer just rejected', description: 'Surface viewed articles in the ticket sidebar so agents know what self-service steps already failed.' },
      ],
      questions: [
        'Are FAQ suggestions shown in a help-center search step first, or inline while the user selects a category and types a ticket subject?',
        'How are suggested articles opened (inline accordion, side drawer, new tab) so typed form fields are preserved?',
        'When the user continues to submit a ticket, which context (search terms, viewed articles, selected category) is attached for the agent?',
        'Should urgent categories (such as payment failures or security reports) bypass self-service suggestions and go straight to the form?',
        'Do help articles display last-updated timestamps and collect helpfulness feedback?',
      ],
      example: 'Example: an inquiry form could show up to three expandable FAQ cards as soon as a category and subject are entered, let the user click "This solved my problem" or "Still need help", and attach the list of viewed articles to the ticket if submitted. Confirm actual bypass categories and search matching rules before adopting this setup.',
      relatedDesigns: [
        { id: 'ly-expandable-data-rows', reason: 'A reference for expanding suggested FAQ rows inline without leaving the intake form. Real article search and ranking need separate implementation.' },
        { id: 'dismissible-inline-banner', reason: 'A reference for showing a known-issue or quick-answer notice at the top of an intake view. Real ticket deflection tracking needs separate implementation.' },
      ],
      promptSnippet: 'Help design a self-service FAQ suggestion and ticket-handoff workflow. First confirm when article suggestions appear, how typed inputs are preserved while reading articles, how users choose between solved and continuing to a ticket, what viewed-article context agents see, and which urgent categories bypass deflection. Do not assume undecided rules.\nBased on the answers, describe:\n1. Trigger conditions for article suggestions and bypass rules for urgent categories.\n2. Inline article preview behavior that preserves user form inputs.\n3. Flow branching between self-resolved completion and full ticket submission.\n4. Context payload (typed fields, search terms, viewed articles) passed to the agent view.\n5. How category/subject inputs, expandable FAQ cards, resolution buttons and the ticket form connect.\nDo not block users from reaching support when articles do not help, and do not mistake example policies or design demos for a real knowledge-base search engine.',
    },
  },
  sources: [
    { title: 'Zendesk Help — Using answer suggestions and ticket deflection', url: 'https://support.zendesk.com/hc/en-us/articles/4408832707610' },
    { title: 'Intercom Help — Help Center and self-serve support workflows', url: 'https://www.intercom.com/help/en/articles/6279660-how-to-set-up-your-help-center' },
  ],
}, {
  id: 'support-canned-response-and-merge-tickets',
  aliases: {
    ko: ['상담 답변 템플릿 매크로', '중복 문의 티켓 병합', '치환 변수 누락 방지', '대표 티켓 통합'],
    en: ['canned response macros', 'duplicate ticket merging', 'template variable validation', 'primary ticket consolidation'],
  },
  useCases: {
    ko: ['자주 쓰는 안내 문구와 상태·태그 변경을 상담 매크로(답변 템플릿)로 불러올 때', '매크로 안의 고객명·주문번호 같은 치환 변수가 비어 있을 때 발송 전 경고를 띄울 때', '같은 고객이 동일 문제로 여러 번 접수한 중복 티켓을 하나의 대표 티켓으로 병합할 때', '서로 다른 고객의 문의나 방향이 잘못된 병합을 막기 위해 병합 전후 결과를 확인할 때'],
    en: ['Inserting canned replies and status/tag updates with agent macros', 'Blocking send when template placeholders like customer name or order ID are unresolved', 'Merging duplicate tickets from the same customer into one primary conversation', 'Preventing accidental cross-customer merges with clear primary/secondary previews'],
  },
  keywords: {
    ko: ['답변 템플릿', '매크로', '상용구', '치환 변수', '중복 문의', '티켓 병합', '대표 티켓', '오발송 방지', '상담 효율'],
    en: ['canned response', 'macro', 'saved reply', 'placeholder variable', 'ticket merge', 'duplicate inquiry', 'primary ticket', 'send validation', 'agent workspace'],
  },
  text: {
    ko: {
      domain: '고객지원·문의',
      title: '상담 템플릿(매크로) 변수 치환과 동일 고객 중복 문의 병합',
      summary: '매크로의 문구·상태 변경과 미치환 변수 검사를 연결하고, 중복 문의를 대표 티켓 중심으로 안전하게 병합합니다.',
      overview: '상담원이 반복 문의에 빠르게 답하려고 매크로(답변 템플릿)를 쓸 때 `{{고객명}}` 같은 치환 변수가 풀리지 않은 채 발송되거나 기존 작성 내용이 덮어써지면 사고로 이어집니다. 또한 고객이 답답함에 같은 문의를 여러 건 남겼을 때 이를 대표 티켓 하나로 합치는 기준과 병합 후 대화·참조자·알림 처리 규칙이 명확해야 중복 응대를 막을 수 있습니다. 아래 내용은 매크로와 티켓 병합 설계를 위한 참고이며 특정 자동 병합 규칙을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '답변 문구 삽입과 부가 동작(상태·태그·담당) 매크로', description: '매크로가 본문 텍스트만 입력창에 넣는지, 티켓 상태 전환·분류 태그 추가·담당 팀 변경까지 한 번에 세팅하는지 범위를 구분합니다.' },
        { name: '치환 변수(Placeholder) 풀림 확인과 발송 차단', description: '고객 이름, 주문 번호, 환불 금액 등 변수 값이 비어 있거나 수동 입력이 필요한 항목(`[직접 입력]`)이 남아 있으면 발송 전에 강조하고 전송을 막습니다.' },
        { name: '대표 티켓(Primary)과 피병합 티켓(Secondary) 구분', description: '중복 문의를 합칠 때 어느 티켓이 계속 대화를 이어갈 대표 티켓이고, 어느 티켓이 닫히며 대표 티켓으로 연결될지 방향을 분명히 합니다.' },
        { name: '병합 후 대화 이력·첨부·SLA 기준과 취소 불가 안내', description: '피병합 티켓의 본문과 첨부를 대표 티켓 타임라인에 어떻게 남길지, 서로 다른 요청자의 티켓 병합을 제한할지, 병합이 되돌릴 수 없는 작업인지 정합니다.' },
      ],
      workflow: [
        { name: '매크로 검색·미리보기와 본문 반영하기', description: '키워드나 분류로 매크로를 찾아 삽입할 문구와 함께 바뀔 상태·태그를 미리 확인하고, 이미 적던 답변 뒤에 이어 붙일지 선택합니다.' },
        { name: '미치환 변수·수동 입력 구간 확인 후 발송하기', description: '치환된 실제 값을 입력창에서 검토하고, 비어 있는 변수나 수동 수정 표시가 남아 있으면 경고를 띄워 보완한 뒤 발송합니다.' },
        { name: '중복 티켓 감지와 대표 티켓 선택하기', description: '같은 고객의 열려 있는 다른 문의를 표시하고, 병합할 대상과 살아남을 대표 티켓을 지정해 병합 후 상태를 미리 보여 줍니다.' },
        { name: '티켓 병합 실행과 참조 연결 남기기', description: '피병합 티켓을 종료 상태로 바꾸면서 양쪽 티켓에 병합 이력 메모를 남기고, 고객이 어느 티켓을 열어도 대표 티켓 안내를 볼 수 있게 합니다.' },
      ],
      pitfalls: [
        { name: '치환되지 않은 `{{customer_name}}` 문자열을 그대로 고객에게 발송하기', description: '비회원 문의 등에서 특정 필드가 비어 있을 때 변수 기호가 그대로 나가면 신뢰가 떨어집니다. 대체 문구나 발송 전 차단 검사를 두세요.' },
        { name: '매크로 선택 시 상담원이 직접 작성 중이던 문장을 묻지도 않고 덮어쓰기', description: '이미 작성 중인 내용이 있을 때 매크로를 적용하면 커서 위치 삽입, 하단 추가, 덮어쓰기 확인 중 안전하게 동작해야 합니다.' },
        { name: '서로 다른 고객의 티켓을 실수로 병합해 개인정보가 섞이기', description: '다른 고객의 문의를 합치면 대화 내역이나 참조자 이메일이 노출될 위험이 있습니다. 동일 고객 여부를 기본 조건으로 검사하거나 엄격히 경고하세요.' },
      ],
      questions: [
        '매크로(답변 템플릿)는 답변 문구만 넣나요, 상태·우선순위·담당자·태그 변경까지 함께 적용하나요?',
        '매크로에 포함된 변수 값이 비어 있거나 수동 입력 구간이 남아 있을 때 어떻게 경고하고 발송을 막나요?',
        '이미 답변창에 작성 중인 내용이 있을 때 매크로를 선택하면 이어 붙이나요, 덮어쓰기 확인을 거치나요?',
        '티켓 병합은 동일 고객의 문의끼리만 허용하나요? 병합 시 피병합 티켓의 대화·첨부·SLA 타이머는 어떻게 처리하나요?',
        '티켓을 병합할 때 고객에게 별도 알림이 가나요, 상담원 내부 메모로만 병합 기록을 남기나요?',
      ],
      example: '예시: 상담원이 환불 안내 매크로를 고르면 본문 끝에 문구가 추가되고 상태가 고객 회신 대기로 세팅되며, `{{환불금액}}` 칸이 비어 있으면 보내기 버튼이 막히고, 동일 고객의 중복 티켓을 병합할 때는 먼저 접수된 티켓을 대표로 유지하고 나중 티켓은 내부 연결 메모와 함께 닫히도록 구성할 수 있습니다. 실제 타 고객 병합 허용 여부와 알림 발송은 운영 기준에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'linked-form-error-summary', reason: '매크로 적용 후 미치환 변수나 필수 수동 입력 항목이 남아 있을 때 발송 전 오류 요약으로 안내하는 표현에 참고할 수 있습니다. 실제 템플릿 파서는 별도로 구현해야 합니다.' },
        { id: 'inline-delete-confirmation', reason: '되돌리기 어려운 티켓 병합을 실행하기 전에 대표 티켓과 닫힐 티켓을 한 번 더 확인하는 표현에 참고할 수 있습니다. 실제 티켓 통합 처리는 구현하지 않습니다.' },
      ],
      promptSnippet: '고객지원 도구의 상담 템플릿(매크로) 변수 치환과 중복 문의 티켓 병합 흐름을 설계해 줘. 먼저 매크로가 바꾸는 항목 범위(문구·상태·태그), 미치환 변수 및 기존 작성 본문 보호 규칙, 중복 티켓 병합 허용 조건(동일 고객 제한 등), 대표 티켓과 피병합 티켓의 대화·SLA·알림 처리 방식을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 매크로 구성 요소와 기존 작성 중 본문에 적용할 때의 삽입/덮어쓰기 규칙.\n2. 치환 변수 누락·빈 값 감지, 대체값 처리 및 발송 전 차단 검증.\n3. 중복 티켓 감지 기준과 대표 티켓(Primary)·피병합 티켓(Secondary) 선택 구조.\n4. 병합 실행 시 대화·첨부·SLA 타이머 통합 방식과 타 고객 병합 방지 경고.\n5. 매크로 선택기·답변 에디터 변수 강조·중복 티켓 알림·병합 확인 창의 연결.\n변수 문자열 삽입만으로 치환 검증이 끝난다고 가정하지 말고, 예시 정책과 디자인 데모를 실제 티켓 병합 백엔드로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Customer Support & Ticketing',
      title: 'Canned macro variable substitution and duplicate ticket merging',
      summary: 'Validate unresolved macro placeholders before sending, and merge duplicate customer inquiries safely into a primary ticket.',
      overview: 'Canned responses (macros) and ticket merging save agents time, but small mistakes are costly: sending a literal `{{first_name}}` token looks careless, and merging two unrelated customers’ tickets can leak private information. Define how macros populate text and fields, how unresolved variables block sending, and how duplicate tickets consolidate into a single primary thread. These concepts are design references, not default automation rules.',
      concepts: [
        { name: 'Text-only snippets versus multi-action macros', description: 'Distinguish simple saved text blocks from macros that also update ticket status, priority, tags or assignee.' },
        { name: 'Placeholder resolution and pre-send blocking', description: 'Resolve dynamic variables (customer name, order ID) when applying a macro, and block sending if required tokens or manual fill-in markers remain unresolved.' },
        { name: 'Primary versus secondary tickets in a merge', description: 'Clarify which ticket becomes the surviving primary thread and which secondary tickets are closed and linked into the primary history.' },
        { name: 'Cross-requester safeguards and merge irreversibility', description: 'Warn or block when an agent attempts to merge tickets from different requesters, and make clear whether a merge is permanent.' },
      ],
      workflow: [
        { name: 'Preview and insert macro actions safely', description: 'Let agents preview the text and field changes a macro will apply, and append to existing editor text rather than overwriting it silently.' },
        { name: 'Validate placeholders before sending the reply', description: 'Highlight any missing variable values or `[FILL IN]` markers in the composer and prevent submission until resolved.' },
        { name: 'Select primary and duplicate tickets with a preview', description: 'Surface open tickets from the same customer, let the agent pick the primary target, and preview what will close versus remain active.' },
        { name: 'Consolidate history and cross-link merged tickets', description: 'Close secondary tickets, copy or link their messages and attachments into the primary timeline, and record a merge audit note on both sides.' },
      ],
      pitfalls: [
        { name: 'Sending raw `{{variable}}` tokens to the customer', description: 'If a field like `order_id` is empty on a guest ticket, raw template syntax may go out. Validate and highlight unresolved placeholders before send.' },
        { name: 'Overwriting an agent’s half-written reply when applying a macro', description: 'Insert macro text at the cursor or ask before replacing existing composer content so agents do not lose custom troubleshooting notes.' },
        { name: 'Merging tickets from two different customers and leaking data', description: 'Combining tickets across different requesters can expose emails or order details via CC or ticket history. Restrict merges to the same requester or require an explicit override warning.' },
      ],
      questions: [
        'Do macros only insert reply text, or can they also update status, priority, tags and assignee?',
        'What happens when a macro variable has no value on the current ticket or requires manual agent input before sending?',
        'If the reply box already contains text, does applying a macro append at the cursor or ask before replacing?',
        'Are ticket merges restricted to the same customer, and how are messages, attachments and SLA timers combined on the primary ticket?',
        'Does merging tickets send a customer-visible message or only record an internal audit note?',
      ],
      example: 'Example: applying a refund macro could append the template text, set status to Waiting on Customer, and highlight `{{refund_amount}}` as a required fill-in that blocks sending until edited, while duplicate tickets from the same email can be merged into the oldest open ticket with an internal cross-link note. Confirm actual merge restrictions and notification rules before adopting this setup.',
      relatedDesigns: [
        { id: 'linked-form-error-summary', reason: 'A reference for listing unresolved macro variables or required fields before allowing a reply to be sent. Real template parsing needs separate implementation.' },
        { id: 'inline-delete-confirmation', reason: 'A reference for confirming an irreversible ticket merge after reviewing the primary and secondary tickets. Real ticket consolidation needs separate implementation.' },
      ],
      promptSnippet: 'Help design canned response macros and duplicate ticket merging for a customer-support tool. First confirm whether macros update fields as well as text, how unresolved variables and existing composer text are handled, whether merges are restricted to the same requester, and how messages, SLAs and notifications behave when merging into a primary ticket. Do not assume undecided rules.\nBased on the answers, describe:\n1. Macro structure and rules for inserting into or replacing existing reply text.\n2. Variable substitution, missing-value fallbacks and pre-send validation blocks.\n3. Duplicate detection and selection of primary versus secondary tickets.\n4. Consolidation of messages, attachments and SLA clocks plus safeguards against cross-customer merges.\n5. How the macro picker, composer variable highlights, duplicate indicators and merge confirmation dialog connect.\nDo not assume inserting template text validates placeholders automatically, and do not mistake example policies or design demos for a real helpdesk backend.',
    },
  },
  sources: [
    { title: 'Zendesk Help — Merging tickets and using macros', url: 'https://support.zendesk.com/hc/en-us/articles/4408886858138' },
    { title: 'Freshdesk Support — Merging duplicate tickets and canned responses', url: 'https://support.freshdesk.com/en/support/solutions/articles/37551-merging-tickets' },
  ],
}, {
  id: 'support-csat-survey-and-quality-review',
  aliases: {
    ko: ['상담 만족도 조사 CSAT', '만족도 평가 응답 기한', '불만족 사유 수집', '상담 품질 후속 검토'],
    en: ['CSAT satisfaction survey', 'post-resolution feedback window', 'negative rating follow-up', 'support quality review'],
  },
  useCases: {
    ko: ['티켓이 해결 처리된 뒤 고객에게 상담 만족도(CSAT)와 한 줄 의견을 요청할 때', '만족도 응답 가능 기한과 기한 내 점수 수정 허용 여부를 정할 때', '낮은 점수(불만족) 선택 시 구체적인 사유 항목을 묻고 관리자 후속 검토로 연결할 때', '단순 변심·정책 불가로 인한 불만과 실제 응대 품질 문제를 구분해 검토할 때'],
    en: ['Requesting a customer satisfaction (CSAT) rating and comment after a ticket is resolved', 'Defining the survey expiration window and whether customers can update their rating', 'Prompting for specific reasons on negative ratings and routing them for manager review', 'Separating product/policy dissatisfaction from agent handling quality during review'],
  },
  keywords: {
    ko: ['만족도 조사', 'CSAT', '상담 평가', '불만족 사유', '응답 기한', '점수 수정', '품질 검토', '재오픈 분리', '후속 조치'],
    en: ['CSAT', 'customer satisfaction', 'post-resolution survey', 'rating window', 'negative feedback', 'reason tags', 'quality review', 'manager follow-up', 'reopen separation'],
  },
  text: {
    ko: {
      domain: '고객지원·문의',
      title: '상담 종료 후 만족도 평가(CSAT) 수집·응답 수정 기한과 후속 조치',
      summary: '해결 후 만족도 요청 시점과 응답·수정 기한을 정하고, 불만족 사유 수집과 미해결 재문의를 분리해 연결합니다.',
      overview: '문의를 해결 처리한 직후 만족도(CSAT)를 수집하면 응대 품질을 돌아볼 수 있지만, 아직 문제가 끝나지 않은 고객이 추가 질문 대신 불만족 버튼에 내용을 적거나 한 번의 재오픈마다 설문이 중복 발송되면 경험이 나빠집니다. 설문 발송 조건과 수정 가능 기한, 불만족 사유 분류, 그리고 "문제가 아직 해결되지 않음"을 골랐을 때의 재오픈 연결을 명확히 설계해야 합니다. 아래 내용은 만족도 수집과 후속 검토 설계를 위한 참고이며 특정 점수 체계를 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '설문 발송 시점과 재오픈 시 중복 발송 제한', description: '해결 처리 즉시 보낼지 일정 시간 뒤에 보낼지 정하고, 같은 티켓이 재오픈되었다가 다시 해결될 때 설문을 새로 받을지 기존 응답을 갱신할지 결정합니다.' },
        { name: '점수 척도와 응답·수정 유효 기한', description: '2단계(만족/불만족) 또는 5점 척도 중 무엇을 쓸지, 해결 후 며칠 동안 평가를 받으며 기한 안에 고객이 점수와 의견을 고칠 수 있는지 정합니다.' },
        { name: '불만족 사유 분류와 미해결 문의 분리', description: '낮은 점수를 주었을 때 응답 지연·설명 부족·정책 불만 같은 사유를 선택하게 하고, 아직 문제가 해결되지 않은 경우 티켓 재오픈 경로로 안내합니다.' },
        { name: '내부 품질 검토(QA)와 후속 안내 연결', description: '불만족 응답이 등록되면 담당 팀 리드의 검토 대기열에 올리고, 응대 과정 점검과 고객 추가 안내 여부를 기록합니다.' },
      ],
      workflow: [
        { name: '해결 전환 시 발송 조건 확인하고 설문 노출하기', description: '스팸이나 단순 자동 종료 건을 제외하고 실제 상담이 이루어진 해결 티켓에 만족도 평가 배너나 링크를 제공합니다.' },
        { name: '원클릭 점수 선택과 상세 사유 입력받기', description: '점수 선택 즉시 기본 응답을 저장해 중도 이탈을 막고, 이어서 선택 사유나 추가 코멘트를 부담 없이 남기게 합니다.' },
        { name: '기한 내 응답 수정 및 기한 만료 안내하기', description: '유효 기한 안에는 기존 선택을 바꿀 수 있게 하고, 기한이 지난 링크를 열면 평가 마감 안내와 새 문의 경로를 보여 줍니다.' },
        { name: '불만족 티켓 후속 검토와 미해결 재연결하기', description: '낮은 평점이나 미해결 응답이 들어온 티켓을 별도 검토 목록으로 모아 원인을 분류하고 필요한 경우 고객에게 후속 답변을 보냅니다.' },
      ],
      pitfalls: [
        { name: '점수를 누른 뒤 긴 설문지를 다 채워야만 저장되게 만들기', description: '주관식 입력까지 강제하면 응답률이 급감합니다. 점수 선택 시점에 1차 저장하고 사유 태그와 코멘트는 후속 단계로 받으세요.' },
        { name: '아직 해결되지 않았다는 불만족 코멘트를 닫힌 티켓에 방치하기', description: '고객이 설문 코멘트에 "아직 안 돼요"라고 적었는데 아무도 답하지 않으면 불만이 커집니다. 재오픈 버튼과 설문 코멘트의 역할을 분명히 안내하세요.' },
        { name: '단순 공지나 중복 병합으로 닫힌 티켓에도 설문을 보내기', description: '실제 응대가 없었던 자동 닫힘·병합 티켓에 만족도 요청을 보내면 불필요한 알림과 왜곡된 점수가 쌓입니다.' },
      ],
      questions: [
        '만족도 조사(CSAT)는 해결 처리 직후 바로 노출하나요, 일정 시간 뒤 발송하며 어떤 티켓(중복 병합 등)은 제외하나요?',
        '평가 척도(만족/불만족 2단계, 5점 척도 등)는 무엇이며, 응답 가능 기한과 기한 내 점수 수정 허용 여부는 어떻게 되나요?',
        '불만족(낮은 점수)을 선택했을 때 선택형 사유 항목이나 주관식 코멘트 입력을 필수로 받나요?',
        '티켓이 재오픈되어 다시 해결되었을 때 만족도 조사를 다시 요청하나요, 티켓당 1회만 받나요?',
        '불만족 평가가 접수되면 관리자 알림·품질 검토 상태·티켓 재오픈 중 어떤 후속 흐름으로 연결하나요?',
      ],
      example: '예시: 실제 상담 답변이 오간 티켓이 해결되면 상세 화면 상단과 안내 메일에 5점 만족도 배너를 7일간 노출하고, 1~2점을 누르면 사유 칩(응답 지연, 해결 안 됨, 설명 부족)을 추가로 물으며 "해결 안 됨" 선택 시 바로 재문의 답글창으로 연결하도록 구성할 수 있습니다. 실제 척도와 재발송 기준은 운영 정책에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'dismissible-inline-banner', reason: '해결된 문의 상세 상단에 만족도 평가 요청 배너를 띄우고 응답 후 완료 안내로 전환하는 표현에 참고할 수 있습니다. 실제 설문 저장과 만료 검증은 별도로 구현해야 합니다.' },
        { id: 'faceted-filter-chips', reason: '불만족 사유 태그를 고르거나 관리자가 평점·사유별로 후속 검토 대상 티켓을 필터링하는 표현에 참고할 수 있습니다. 실제 통계 집계는 구현하지 않습니다.' },
      ],
      promptSnippet: '고객지원 티켓 종료 후 만족도 평가(CSAT) 수집, 응답 수정 기한, 불만족 후속 검토 흐름을 설계해 줘. 먼저 설문 발송 대상과 제외 조건, 평가 척도 및 응답·수정 유효 기한, 불만족 선택 시 사유 수집 방식, 미해결 고객의 재오픈 연결, 재오픈 후 재설문 여부와 관리자 후속 검토 절차를 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 설문 노출/발송 조건, 제외 대상(병합·자동 종료 등), 응답 유효 기한.\n2. 점수 즉시 저장, 불만족 사유 태그/코멘트 수집, 기한 내 응답 수정 규칙.\n3. 설문 코멘트와 실제 티켓 재오픈(추가 질문) 경로의 구분 및 안내.\n4. 재오픈 후 재해결 시 설문 갱신 규칙과 불만족 건의 관리자 품질 검토 흐름.\n5. 티켓 상세 만족도 배너·사유 선택 칩·기한 만료 안내·관리자 검토 목록의 연결.\n설문 코멘트 입력만으로 닫힌 티켓이 자동 재응대된다고 가정하지 말고, 예시 정책과 디자인 데모를 실제 CSAT 분석 시스템으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Customer Support & Ticketing',
      title: 'Post-resolution CSAT surveys, response windows and follow-up review',
      summary: 'Define when CSAT surveys trigger and expire, capture structured reasons for low ratings, and separate unresolved issues from closed feedback.',
      overview: 'Collecting customer satisfaction (CSAT) after resolving a ticket helps teams spot coaching and product opportunities, but poorly timed surveys backfire. If customers write "still broken" inside a survey comment on a closed ticket instead of reopening the thread, or receive duplicate surveys on merged tickets, issues get missed. Define trigger rules, rating edit windows, negative-feedback reasons and manager follow-up clearly. These concepts are design references, not default scoring metrics.',
      concepts: [
        { name: 'Survey eligibility and reopen suppression', description: 'Send surveys only on resolved tickets with real agent interaction—excluding merged or spam tickets—and decide how reopened tickets handle repeat surveys.' },
        { name: 'Rating scale, expiration window and rating edits', description: 'Choose a scale (such as binary good/bad or 1–5 stars), set how many days the survey stays open, and allow customers to update their rating within that window.' },
        { name: 'Negative-rating reason tags versus unresolved issues', description: 'Prompt for structured reason tags on low scores, and give customers whose issue is still unresolved a direct way to reopen the ticket rather than leaving a dead-end comment.' },
        { name: 'Manager quality review and follow-up queue', description: 'Route negative ratings into a review queue where leads can distinguish policy/product limitations from agent handling and log follow-up actions.' },
      ],
      workflow: [
        { name: 'Trigger the survey when an eligible ticket resolves', description: 'Display an inline rating prompt on the ticket view or send a survey link after resolution while skipping merged or no-reply tickets.' },
        { name: 'Save the initial score on click and ask for optional details', description: 'Record the rating as soon as the customer clicks a score, then show quick reason chips and an optional comment box.' },
        { name: 'Allow updates within the window and handle expired links', description: 'Let customers revise their score before the window closes, and show a friendly closed notice if they open an expired survey link.' },
        { name: 'Triage low ratings and route unresolved cases', description: 'Surface negative CSAT items for lead review and guide customers who selected "issue not resolved" back into an active reply or follow-up ticket.' },
      ],
      pitfalls: [
        { name: 'Discarding the rating unless the user completes a long multi-field form', description: 'Save the numeric or binary score immediately on the first click so partial drop-offs still record the core rating.' },
        { name: 'Letting "still not fixed" survey comments sit unread on closed tickets', description: 'Make it clear whether survey comments reopen the ticket or are feedback-only, and provide a prominent reopen action for unfinished issues.' },
        { name: 'Sending CSAT surveys on duplicate-merged or auto-closed tickets', description: 'Surveying a ticket that was closed as a duplicate frustrates customers and skews satisfaction metrics.' },
      ],
      questions: [
        'When is the CSAT survey triggered after resolution, and which tickets (such as merged duplicates or no-reply closures) are excluded?',
        'What rating scale is used, how long does the survey remain open, and can customers change their rating within that window?',
        'When a customer selects a low rating, are structured reason tags or a written comment required?',
        'If a resolved ticket is reopened and resolved a second time, is a new survey sent or can the previous rating be updated?',
        'What follow-up workflow occurs when a negative rating arrives, and how are "issue still not resolved" responses routed?',
      ],
      example: 'Example: a helpdesk could show a 5-point rating banner on resolved tickets for 7 days, save the score on click, ask for a reason chip (Slow response, Issue unresolved, Policy limitation) on 1–2 star ratings, and offer a one-click Reopen button when "Issue unresolved" is chosen. Confirm actual rating scales and review workflows before adopting this setup.',
      relatedDesigns: [
        { id: 'dismissible-inline-banner', reason: 'A reference for displaying a post-resolution survey prompt at the top of a resolved ticket view. Real survey persistence and expiration checks need separate implementation.' },
        { id: 'faceted-filter-chips', reason: 'A reference for selecting feedback reason tags or filtering a quality-review queue by rating and reason. Real analytics aggregation needs separate implementation.' },
      ],
      promptSnippet: 'Help design a post-resolution CSAT survey and quality-review workflow for customer support. First confirm survey eligibility and exclusion rules, rating scale and edit/expiration window, follow-up reason tags for low scores, how unresolved issues reconnect to ticket reopening, and how reopened tickets or manager reviews are handled. Do not assume undecided rules.\nBased on the answers, describe:\n1. Trigger and exclusion rules for CSAT surveys plus response/edit window limits.\n2. Immediate rating capture, negative-rating reason chips/comments and rating revision behavior.\n3. Separation and routing between feedback comments and active ticket reopening.\n4. Handling of reopened tickets and the manager quality-review workflow for low scores.\n5. How the resolved-ticket survey banner, reason chips, expired-survey notice and review queue connect.\nDo not assume a survey comment automatically reopens a closed ticket unless specified, and do not mistake example policies or design demos for a real CSAT analytics backend.',
    },
  },
  sources: [
    { title: 'Zendesk Help — About CSAT (Customer Satisfaction) ratings in Zendesk', url: 'https://support.zendesk.com/hc/en-us/articles/4408827604250' },
    { title: 'Intercom Help — Measure customer satisfaction with conversation ratings', url: 'https://www.intercom.com/help/en/articles/1064812-measure-customer-satisfaction-with-conversation-ratings' },
  ],
}];
