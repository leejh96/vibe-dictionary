import type { DomainKnowledge } from '../domain-knowledge';

export const EVENT_KNOWLEDGE: DomainKnowledge[] = [{
  id: 'event-registration-ticket-and-checkin',
  aliases: {
    ko: ['이벤트 참가 신청', '행사 티켓 발권', '컨퍼런스 등록', '현장 체크인 QR', '참가권 양도 취소'],
    en: ['event registration', 'conference ticketing', 'attendee check-in', 'QR ticket verification', 'ticket transfer and cutoff'],
  },
  useCases: {
    ko: ['세미나·컨퍼런스·모임의 참가 신청과 티켓 발권을 만들 때', '얼리버드·일반석 등 등급별 매진과 인당 신청 매수를 제한할 때', '참가 확정·대기 신청·참가권 양도·취소 마감을 구분할 때', '현장 QR 코드·명단 체크인과 중복 입장 방지를 설계할 때'],
    en: ['Building seminar, conference or meetup registration and ticketing', 'Enforcing per-tier capacity and per-person quantity limits', 'Separating confirmed tickets, waitlists, transfers and cancellation cutoffs', 'Designing on-site QR or roster check-in and duplicate-entry prevention'],
  },
  keywords: {
    ko: ['이벤트', '행사', '참가 신청', '컨퍼런스', '티켓 발권', '얼리버드', '매진', '수량 제한', '참가권 양도', '현장 체크인', 'QR 체크인', '중복 입장 방지', '참석 확인'],
    en: ['event', 'conference', 'registration', 'event ticket', 'early bird', 'sold out', 'quantity limit', 'ticket transfer', 'check-in', 'QR check-in', 'duplicate entry', 'attendance'],
  },
  text: {
    ko: {
      domain: '이벤트·체크인',
      title: '참가 신청·좌석/등급 마감·양도와 현장 체크인 검증',
      summary: '신청자 계정과 개별 참가권을 분리하고, 등급별 수량·양도·취소 마감·현장 체크인을 연결합니다.',
      overview: '행사 등록에서는 한 사람이 여러 장을 신청하거나 다른 사람에게 참가권을 넘기는 일이 자주 일어납니다. 신청 대표자와 실제 입장객 명단을 구분하고, 등급별 매진·취소 마감·양도 시 기존 입장 코드 무효화·현장 중복 스캔 방지까지 나누어 설계해야 행사 당일 혼선을 줄일 수 있습니다. 아래 내용은 이벤트·체크인 흐름을 설계하기 위한 참고이며 특정 행사의 취소 규정이나 입장 방식을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '신청 주문과 개별 참가권(Attendee) 분리', description: '한 번에 3장을 신청하더라도 현장 입장과 명찰 발급은 참가자 한 명씩 이루어집니다. 신청 대표자 정보와 개별 입장권 보유자 정보를 분리합니다.' },
        { name: '티켓 등급(Tier)과 판매 조건', description: '얼리버드·일반·온라인 참가처럼 등급마다 판매 기간, 할당 좌석 수, 1인당 신청 가능 매수를 구분합니다.' },
        { name: '참가권 양도와 코드 재발급', description: '참가권을 다른 사람에게 양도하거나 참석자 이름을 바꿀 때, 이전 입장 코드(QR)를 즉시 무효화하고 새 입장 코드를 발급해 이중 입장을 막습니다.' },
        { name: '현장 체크인 상태와 중복 스캔 방지', description: '미입장·체크인 완료·체크인 취소(오처리 복구)·입장 불가(취소된 티켓) 상태를 구분합니다. 이미 체크인된 코드가 다시 스캔되면 첫 입장 시각을 보여 주고 중복 입장을 차단합니다.' },
        { name: '행사 변경·연기·취소 시 안내', description: '장소 변경이나 일정 연기 시 유효한 참가권 보유자에게만 안내를 보내고, 취소 마감 기한 전후의 취소 가능 여부를 명확히 구분합니다.' },
      ],
      workflow: [
        { name: '등급·수량 선택과 참가자 정보 입력하기', description: '판매 중인 등급과 남은 매수를 확인해 수량을 고르고, 각 참가권에 필요한 참석자 이름·연락처·사전 질문을 입력받습니다.' },
        { name: '입장권 발급과 변경·양도 연결하기', description: '등록이 확정되면 고유 입장 코드를 발급하고, 마감 시각 전까지 참석자 정보 수정이나 양도 절차를 제공합니다.' },
        { name: '현장 검색·스캔과 즉시 판별하기', description: '현장 스태프가 QR 스캔이나 이름·연락처 검색으로 참가권을 조회하고, 유효·중복 스캔·취소된 티켓 여부를 즉시 구분해 확인합니다.' },
        { name: '오처리 복구와 최종 참석 집계하기', description: '동명이인을 잘못 체크인했을 때 미입장 상태로 되돌릴 수 있게 하고, 실시간 입장 인원과 미입장 인원을 집계합니다.' },
      ],
      pitfalls: [
        { name: '다매수 신청에 입장 코드를 하나만 발급하기', description: '동행인이 각자 다른 시각에 도착하면 코드 하나로 누구까지 입장했는지 구분할 수 없습니다. 참가권 매수마다 개별 체크인 상태를 두세요.' },
        { name: '취소되거나 양도된 이전 QR 코드가 현장에서도 통과되기', description: '캡처해 둔 이전 QR 코드로 입장할 수 있으면 정원 초과가 발생합니다. 취소·양도 시 기존 코드를 무효화하고 최신 상태를 검증하세요.' },
        { name: '현장 스캔 화면에 네트워크 지연이나 실수 되돌리기가 없기', description: '버튼이 두 번 눌려 바로 중복 오류로 뜨거나 잘못 누른 체크인을 취소할 수 없으면 입장 줄이 멈춥니다. 첫 스캔 시각 표시와 체크인 취소를 함께 준비하세요.' },
      ],
      questions: [
        '1인당 신청 가능 매수는 몇 장이며, 여러 장 신청 시 각 참석자 정보를 신청 시점에 모두 입력해야 하나요?',
        '얼리버드·일반·VIP 등 티켓 등급별 정원이 따로 있나요, 전체 행사 정원을 공유하나요?',
        '참가 취소 마감과 타인 양도 마감은 언제이며, 양도 시 기존 입장 코드는 어떻게 무효화하나요?',
        '현장 체크인은 QR 스캔만 사용하나요, 이름·연락처 수동 검색과 스태프의 체크인 취소(되돌리기)도 지원하나요?',
        '이미 체크인된 티켓이나 취소된 티켓이 스캔되었을 때 스태프 화면에 어떤 정보(첫 입장 시각·취소 사유)를 보여 주나요?',
        '일부 좌석만 취소하거나 당일 현장 등록을 추가할 때 잔여 좌석과 참석자 명단은 어떻게 갱신되나요?',
      ],
      example: '예시: 컨퍼런스에서 1인 최대 4장까지 신청하되 각 참가자 이메일로 개별 QR 티켓을 발송하고, 행사 하루 전까지 양도를 허용하며, 현장에서는 QR 스캔과 초성 명단 검색을 함께 지원하는 방식을 생각할 수 있습니다. 실제 등급 구성·양도 허용 여부·현장 운영 방식은 행사 계획에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'native-quantity-stepper', reason: '티켓 신청 매수를 허용된 최소·최대 범위 안에서 증감 버튼이나 직접 입력으로 조절하는 표현에 참고할 수 있습니다. 실제 잔여석 확보와 발권 처리는 별도로 구현해야 합니다.' },
        { id: 'ly-initial-index-nav', reason: '현장 참가자 명단에서 이름 초성 색인으로 해당 구간에 빠르게 이동하는 표현에 참고할 수 있습니다. 실제 참가자 검색과 체크인 상태 저장은 구현하지 않습니다.' },
      ],
      promptSnippet: '이벤트 참가 신청·티켓 발권·양도·현장 체크인 흐름을 설계해 줘. 먼저 티켓 등급별 정원과 1인당 신청 매수, 다매수 신청 시 개별 참석자 정보 입력 방식, 취소·양도 마감 기한과 기존 코드 무효화 규칙, 현장 QR/명단 체크인 및 중복 입장 방지 정책을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 참가 신청자·실제 참석자·현장 스태프가 볼 정보와 가능한 행동.\n2. 신청 완료·양도 중·취소됨·미입장·체크인 완료 상태 전환과 개별 입장 코드 유효성.\n3. 등급별 잔여 수량 계산, 다매수 부분 취소, 양도 시 코드 재발급 규칙.\n4. 중복 스캔·취소된 티켓 스캔·동명이인 오체크인 복구 시 현장 화면 안내.\n5. 티켓 등급/수량 선택·내 입장권·양도/취소·현장 스캔 및 참가자 명단 화면의 연결.\n신청 건수와 개별 입장권 상태를 하나로 합치지 말고, 예시 정책과 디자인 데모를 실제 발권·검표 시스템으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Events & Check-in',
      title: 'Event registration, tier limits, ticket transfer and on-site check-in verification',
      summary: 'Separate the buyer order from individual attendee tickets, and connect tier limits, transfers, cutoffs and on-site check-in.',
      overview: 'Event registration often involves one buyer purchasing multiple tickets or transferring a pass to a colleague. Separating the order contact from individual attendee passes, enforcing tier capacities and transfer cutoffs, invalidating old QR codes on transfer, and preventing duplicate check-in scans keeps event doors moving smoothly. These concepts are design references, not default admission or cancellation rules for a specific event.',
      concepts: [
        { name: 'Registration order versus individual attendee tickets', description: 'Even when one order buys multiple seats, badges and door check-in happen per attendee. Track a distinct ticket record and code for each attendee.' },
        { name: 'Ticket tiers, sales windows and quantity limits', description: 'Define per-tier sales dates, capacity pools and per-order quantity limits across tiers such as Early Bird, General Admission or Online.' },
        { name: 'Ticket transfers and credential rotation', description: 'When a ticket is transferred to a new attendee, immediately invalidate the previous QR code or pass and issue a new one.' },
        { name: 'Check-in states and duplicate-scan protection', description: 'Distinguish not-checked-in, checked-in, check-in-reverted and voided tickets. On a repeat scan, show the first check-in timestamp and block duplicate entry.' },
        { name: 'Schedule updates and cutoff rules', description: 'Send venue or schedule updates to active ticket holders and enforce clear cutoffs for self-service cancellations or name changes.' },
      ],
      workflow: [
        { name: 'Select tiers, quantities and attendee details', description: 'Let registrants choose available tiers and quantities within limits and capture required attendee names, emails and registration questions.' },
        { name: 'Issue passes and handle transfers before cutoff', description: 'Generate a unique pass per attendee upon confirmation, and allow attendee reassignment or cancellation before the cutoff window.' },
        { name: 'Verify passes at the door via scan or roster lookup', description: 'Let staff scan QR codes or search the attendee roster by name, immediately distinguishing valid, already-checked-in and voided passes.' },
        { name: 'Support accidental check-in undo and live attendance counts', description: 'Allow staff to revert a mistaken check-in on a namesake attendee and keep checked-in versus remaining counts accurate.' },
      ],
      pitfalls: [
        { name: 'Issuing a single shared QR code for a multi-ticket order', description: 'If guests arrive separately, one shared code cannot track which seats have already entered. Issue one code per attendee seat.' },
        { name: 'Accepting screenshots of canceled or transferred QR codes', description: 'If voided or reassigned passes still validate at the door, venues risk overcapacity. Revoke old tokens upon cancellation or transfer.' },
        { name: 'Providing no undo or timestamp details on the check-in screen', description: 'Accidental double-taps or checking in the wrong person stalls the line unless staff can see the first scan time and undo mistakes.' },
      ],
      questions: [
        'What is the maximum ticket quantity per order, and must every attendee’s name and email be entered at registration time?',
        'Do ticket tiers have independent capacity pools or share one overall venue capacity?',
        'What are the cutoffs for cancellation and ticket transfer, and how is the previous pass invalidated on transfer?',
        'Does door check-in use QR scanning, manual roster search or both, and can staff undo an accidental check-in?',
        'When an already-used or voided pass is scanned, what details (such as original check-in time or void reason) should staff see?',
        'How are partial order cancellations or walk-in registrations reflected in remaining capacity and the live roster?',
      ],
      example: 'Example: a conference could allow up to 4 tickets per order with individual QR passes emailed to each attendee, permit transfers until 24 hours before doors open, and support both QR scanning and alphabetical roster check-in on site. Confirm actual tier limits, transfer rules and door workflows before adopting this setup.',
      relatedDesigns: [
        { id: 'native-quantity-stepper', reason: 'A reference for adjusting ticket quantities within minimum and maximum bounds via stepper buttons or direct input. Real seat holds and ticket issuance need separate implementation.' },
        { id: 'ly-initial-index-nav', reason: 'A reference for jumping to name groups in an attendee roster using index links. Real attendee search and check-in persistence need separate implementation.' },
      ],
      promptSnippet: 'Help design an event registration, ticketing and check-in workflow. First confirm tier capacities and per-order quantity limits, per-attendee information requirements, cancellation/transfer cutoffs and token revocation, and on-site QR/roster check-in with duplicate-scan protection. Do not assume undecided rules.\nBased on the answers, describe:\n1. Information and actions available to buyers, individual attendees and check-in staff.\n2. States for confirmed, transferred, voided, not-checked-in and checked-in passes, and pass token validity.\n3. Tier capacity tracking, partial order cancellation and credential rotation upon transfer.\n4. Staff-facing feedback for duplicate scans, voided tickets and undoing an accidental check-in.\n5. How tier/quantity selection, attendee pass views, transfer/cancel flows and staff check-in screens connect.\nDo not merge order-level payment with individual attendee check-in state, and do not mistake example policies or design demos for a real ticketing or scanner system.',
    },
  },
  sources: [
    { title: 'Eventbrite Help Center — Customize order forms and attendee info', url: 'https://www.eventbrite.com/help/en-us/articles/726115/how-to-create-custom-questions-for-attendees/' },
    { title: 'Stripe Docs — Checkout quantity limits and inventory', url: 'https://docs.stripe.com/payments/checkout/adjustable-quantity' },
  ],
}, {
  id: 'event-seat-map-hold-and-timeout',
  aliases: {
    ko: ['지정석 좌석 선점', '좌석 선택 타이머 만료', '동시 좌석 선택 충돌', '결제 실패 좌석 해제'],
    en: ['reserved seating hold timer', 'seat map concurrency lock', 'checkout seat timeout', 'payment failure seat release'],
  },
  useCases: {
    ko: ['공연·컨퍼런스 지정석 좌석표에서 원하는 좌석을 골라 예매할 때', '결제 진행 중 다른 사용자가 같은 좌석을 낚아채지 못하도록 선점 시간(Hold timer)을 둘 때', '선점 시간 만료나 결제 실패·취소 시 좌석을 즉시 다시 선택 가능 상태로 풀 때', '연석 선택·1인당 좌석 수 제한·구역별 가격 차등을 함께 적용할 때'],
    en: ['Allowing attendees to pick specific seats from a venue seat map', 'Locking selected seats with a countdown timer while checkout is in progress', 'Releasing held seats back to available inventory upon timer expiry or payment failure', 'Enforcing per-order seat limits, adjacent-seat rules and zone-based pricing'],
  },
  keywords: {
    ko: ['지정석', '좌석표', '좌석 선점', '홀드 타이머', '동시 선택 충돌', '선점 만료', '좌석 해제', '구역별 가격', '연석 선택'],
    en: ['reserved seating', 'seat map', 'seat hold', 'hold timer', 'concurrency lock', 'hold expiration', 'seat release', 'zone pricing', 'adjacent seats'],
  },
  text: {
    ko: {
      domain: '이벤트·체크인',
      title: '지정석 좌석표 선점 시간(Hold timer)·동시 선택 충돌과 결제 실패 시 좌석 해제',
      summary: '좌석 클릭과 실제 선점 확정을 분리하고, 결제 카운트다운 만료·결제 실패 시 좌석 자동 해제를 연결합니다.',
      overview: '인기 행사나 지정석 예매에서는 수백 명이 동시에 같은 앞줄 좌석을 클릭합니다. 화면에서 좌석이 비어 보여도 결제 단계로 넘어가는 순간 서버에서 원자적으로 좌석을 선점(Hold)해야 이중 발권을 막을 수 있으며, 결제 창을 켜 둔 채 이탈한 사용자의 좌석이 영원히 묶이지 않도록 선점 제한 시간과 자동 해제를 설계해야 합니다. 아래 내용은 지정석 선점·해제 흐름을 설계하기 위한 참고이며 특정 예매처의 선점 시간이나 좌석 제한을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '선택 가능·임시 선점(Hold)·발권 완료·판매 제외 좌석 구분', description: '빈 좌석, 다른 사람이 결제 중인 임시 선점 좌석, 이미 팔린 좌석, 시야 제한·운영 목적으로 막아 둔 좌석 상태를 구분합니다.' },
        { name: '원자적 좌석 선점과 동시 클릭 충돌 안내', description: '두 사용자가 거의 동시에 같은 좌석을 골랐을 때 먼저 선점 요청이 통과한 한 명에게만 결제 기회를 주고, 다른 사용자에게는 즉시 다른 좌석 선택을 안내합니다.' },
        { name: '선점 카운트다운(Hold timer)과 만료 자동 해제', description: '선점된 좌석에 고정 만료 시각(예: 10분)을 부여해 화면에 남은 시간을 표시하고, 시간 내 결제가 완료되지 않으면 좌석을 자동으로 빈 상태로 되돌립니다.' },
        { name: '비동기 결제 승인과 만료 경계(Race condition) 처리', description: '선점 타이머가 만료된 직후에 뒤늦은 카드 승인 응답이 도착하는 경계 상황을 막기 위해 결제창 유효 시간과 서버 선점 만료를 맞춥니다.' },
      ],
      workflow: [
        { name: '구역·좌석 등급 확인과 좌석 선택하기', description: '좌석표에서 구역별 가격과 잔여석을 확인하고, 인당 허용 매수 범위 안에서 원하는 좌석을 고릅니다.' },
        { name: '좌석 선점 확정과 결제 타이머 시작하기', description: '다음을 누르면 서버에서 해당 좌석이 아직 비어 있는지 검증해 임시 선점 상태로 잠그고, 상단에 남은 결제 시간을 표시합니다.' },
        { name: '동시 선점 실패 시 즉시 좌석표 갱신하기', description: '선택한 좌석 중 일부가 그사이 다른 사람에게 선점되었다면 어느 좌석이 충돌했는지 알려 주고 최신 좌석표에서 다시 고르게 합니다.' },
        { name: '결제 완료 확정 또는 만료·취소 시 좌석 반환하기', description: '결제가 성공하면 발권 완료로 고정하고, 사용자가 뒤로 가거나 타이머가 만료되면 임시 선점을 즉시 해제합니다.' },
      ],
      pitfalls: [
        { name: '브라우저 화면에서만 좌석을 골라 두고 결제 완료 시점에야 중복 여부를 검사하기', description: '입력 폼을 다 채우고 카드 결제까지 눌렀는데 이미 팔린 좌석이라며 실패하면 사용자 불만이 극대화됩니다. 결제 진입 시점에 먼저 선점하세요.' },
        { name: '결제 창을 닫거나 이탈했을 때 선점 좌석이 해제되지 않고 남기', description: '실제 구매하지 않은 트래픽이 좌석을 모두 잡아 두면 진짜 구매자가 예매를 못 합니다. 서버 기준 만료 시각에 자동 해제되어야 합니다.' },
        { name: '선점 만료로 다른 사람이 산 좌석에 뒤늦은 이전 결제 승인이 겹치기', description: '선점 만료 후에는 이전 결제 세션의 승인을 거부하거나 즉시 자동 취소·환불해 한 좌석에 두 장의 티켓이 발급되지 않게 하세요.' },
      ],
      questions: [
        '좌석 임시 선점(Hold)은 좌석을 클릭하는 즉시 걸리나요, 좌석 선택 후 결제하기 버튼을 누를 때 걸리나요?',
        '좌석 선점 유지 시간은 몇 분이며, 결제 중 시간 연장을 허용하나요?',
        '1인당 한 번에 선택할 수 있는 최대 좌석 수와 외톨이 빈자리(한 칸 띄어 앉기) 방지 규칙이 있나요?',
        '여러 좌석을 동시에 골랐는데 그중 한 좌석만 다른 사용자와 충돌했을 때 전체 재선택으로 처리하나요, 남은 좌석만 먼저 잡아 주나요?',
        '선점 시간이 만료되는 순간 결제 승인이 겹쳤을 때(경계 상황) 좌석 배정과 자동 환불은 어떻게 처리하나요?',
      ],
      example: '예시: 컨퍼런스 지정석 예매에서 1인 최대 4석까지 선택 후 다음 단계 진입 시 8분간 좌석을 임시 선점하고, 화면 상단에 남은 시간 배너를 띄우며, 8분 내 미결제 또는 창 이탈 시 좌석을 즉시 빈자리로 되돌리도록 구성할 수 있습니다. 실제 선점 시점·유지 시간·외톨이 좌석 제한 여부는 행사 예매 정책에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'sticky-announcement-banner', reason: '좌석 선점 후 결제 화면 상단에 남은 선점 시간(카운트다운)과 만료 주의 안내를 고정해 보여주는 표현에 참고할 수 있습니다. 실제 서버 타이머와 좌석 잠금은 별도로 구현해야 합니다.' },
        { id: 'native-quantity-stepper', reason: '지정석 선택 전후에 예매할 인원수·매수를 허용 한도 안에서 조절하는 표현에 참고할 수 있습니다. 실제 좌석 매핑과 재고 차감은 구현하지 않습니다.' },
      ],
      promptSnippet: '지정석 이벤트의 좌석표 선택·임시 선점(Hold timer)·동시 선택 충돌·결제 실패 시 좌석 해제 흐름을 설계해 줘. 먼저 좌석 선점이 걸리는 시점(클릭 즉시 vs 결제 진입 시), 선점 유지 시간과 만료 규칙, 1인당 최대 좌석 수 및 연석/빈자리 규칙, 동시 선택 충돌 시 처리 방식, 선점 만료와 결제 승인 경계 처리 규칙을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 선택 가능·내 임시 선점·타인 선점 중·발권 완료·판매 제외 좌석의 상태 구분과 표시.\n2. 다중 좌석 선택 시 원자적 선점 요청과 동시 충돌 발생 시 안내 및 좌석표 갱신.\n3. 서버 기준 선점 만료 타이머, 사용자 중도 취소, 결제 실패 시 즉시 좌석 해제 흐름.\n4. 선점 만료 직후 도착한 지연 결제 응답의 이중 발권 차단 및 자동 환불 처리.\n5. 인원수 선택·구역/좌석표·상단 선점 카운트다운 고정 배너·결제 및 만료 안내 화면의 연결.\n클라이언트 타이머만으로 좌석 선점을 관리하거나 결제 완료 시점까지 좌석 잠금을 미루지 말고, 예시 정책과 디자인 데모를 실제 실시간 좌석 잠금 엔진으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Events & Check-in',
      title: 'Reserved-seating hold timers, concurrent seat locks and payment-failure release',
      summary: 'Separate seat selection from atomic server holds, and connect checkout countdowns with automatic seat release on timeout or failed payment.',
      overview: 'When hundreds of attendees browse a reserved-seating map at once, two people will inevitably click the same seat. Locking selected seats atomically on the server with a strict hold timer, showing a clear countdown during checkout, rejecting duplicate holds immediately, and releasing seats back to the pool if payment fails or times out prevents double-booking and ghosted inventory. These concepts are design references, not default hold durations or venue rules.',
      concepts: [
        { name: 'Available, held, sold and blocked seat states', description: 'Distinguish open seats, seats temporarily held by an active checkout, confirmed sold seats and organizer-blocked seats.' },
        { name: 'Atomic seat holds and concurrency conflict feedback', description: 'Ensure only one request wins when two users claim the same seat simultaneously, and immediately prompt the losing user to pick another seat.' },
        { name: 'Server-enforced hold timer and automatic release', description: 'Assign an explicit expiration timestamp to every seat hold so abandoned checkouts release their seats back to available inventory automatically.' },
        { name: 'Late-payment race condition protection', description: 'Prevent double-selling if a slow payment gateway callback arrives right after a seat hold expired and the seat was claimed by someone else.' },
      ],
      workflow: [
        { name: 'Browse zones, pricing and select desired seats', description: 'Show seat availability and pricing by section or row, enforcing per-order seat limits as the attendee clicks seats.' },
        { name: 'Acquire atomic seat hold and start checkout countdown', description: 'Lock the chosen seats on the server before collecting payment details and display the remaining hold time prominently.' },
        { name: 'Handle concurrent seat conflicts gracefully', description: 'If another buyer locked one of the selected seats a moment earlier, highlight the unavailable seat and refresh the map without losing the user’s session.' },
        { name: 'Convert hold to issued ticket or release on cancel/timeout', description: 'Finalize the seat as sold upon confirmed payment, or release the hold immediately if the user cancels, payment fails or the timer expires.' },
      ],
      pitfalls: [
        { name: 'Checking seat availability only after the user submits payment', description: 'Letting a buyer fill out attendee and card forms before locking the seat leads to frustrating failures at the final click. Lock seats when entering checkout.' },
        { name: 'Relying only on browser unload events to release held seats', description: 'Closed tabs or lost mobile connections will leave seats stuck forever unless the server expires holds by timestamp.' },
        { name: 'Issuing duplicate seats when a delayed payment succeeds after hold expiry', description: 'Align payment session expiry with the seat hold window and automatically void or refund late captures if the hold has already lapsed.' },
      ],
      questions: [
        'Are seats locked the instant a user clicks each seat on the map, or when they click Proceed to Checkout?',
        'How many minutes does a seat hold last during checkout, and is the hold ever extended?',
        'What is the maximum seat count per order, and are single-seat gaps (orphan seats) restricted?',
        'If a user selects multiple seats and one seat is taken concurrently, does the hold fail as a whole or lock the remaining available seats?',
        'How does the system prevent double-issuance if a payment webhook arrives just after the seat hold timer expires?',
      ],
      example: 'Example: a venue ticketing flow could let buyers select up to 4 seats, lock those seats for 8 minutes upon entering checkout with a sticky countdown banner, reject single-seat gaps in a row, and automatically release the seats if payment is not confirmed before the 8-minute server timestamp expires. Confirm actual hold windows, concurrency rules and payment timeouts before adopting this setup.',
      relatedDesigns: [
        { id: 'sticky-announcement-banner', reason: 'A reference for keeping the active seat-hold countdown and expiration warning visible at the top of checkout. Server hold timers and seat locks need separate implementation.' },
        { id: 'native-quantity-stepper', reason: 'A reference for choosing the number of seats to book within order limits. Seat-map selection and inventory locking need separate implementation.' },
      ],
      promptSnippet: 'Help design a reserved-seating map, seat-hold timer and concurrency workflow. First confirm when seat holds are acquired (on seat click vs entering checkout), hold duration and timeout rules, per-order seat limits and single-seat gap rules, multi-seat conflict handling, and race-condition handling between hold expiry and payment capture. Do not assume undecided rules.\nBased on the answers, describe:\n1. Visual and backend states for available, held-by-me, held-by-others, sold and blocked seats.\n2. Atomic hold acquisition and user feedback when a selected seat is taken concurrently.\n3. Server-side hold expiration, explicit user cancellation and payment-failure release rules.\n4. Safeguards against late payment callbacks arriving after a seat hold has expired.\n5. How quantity pickers, interactive seat maps, sticky countdown banners and timeout/retry screens connect.\nDo not rely on client-side timers alone to enforce seat holds or wait until final payment capture to check seat availability, and do not mistake example policies or design demos for a real concurrency-locking ticketing backend.',
    },
  },
  sources: [
    { title: 'Eventbrite Help Center — Create an event with reserved seating', url: 'https://www.eventbrite.com/help/en-us/articles/455159/how-to-create-a-reserved-seating-event/' },
    { title: 'Stripe Docs — Expire a Checkout Session and release held inventory', url: 'https://docs.stripe.com/payments/checkout/managing-limited-inventory' },
  ],
}, {
  id: 'event-session-track-capacity-and-schedule',
  aliases: {
    ko: ['컨퍼런스 트랙 세션 신청', '세션 시간표 겹침 경고', '강연장 정원 마감 대기', '내 시간표 북마크'],
    en: ['multi-track conference schedule', 'session capacity registration', 'overlapping session conflict', 'personal event agenda'],
  },
  useCases: {
    ko: ['여러 트랙(발표장)이 동시에 열리는 컨퍼런스에서 참가자별 세부 세션 신청을 받을 때', '단순 관심 표시(내 시간표 담기)와 정원이 제한된 워크숍·강연장의 좌석 예약을 구분할 때', '같은 시간대에 겹치는 두 세션을 신청하려 할 때 시간 충돌 경고를 안내할 때', '세션 시간·장소 변경 시 해당 세션 신청자에게 알리고 현장 세션 입장을 확인할 때'],
    en: ['Managing per-session sign-ups across multiple parallel tracks at a conference', 'Separating casual agenda bookmarking from capacity-limited room reservations', 'Warning attendees or blocking double-booking when two chosen sessions overlap in time', 'Notifying registered attendees when a session moves rooms or changes time slots'],
  },
  keywords: {
    ko: ['멀티 트랙', '세션 신청', '시간표', '일정 충돌', '시간 겹침', '강연장 정원', '워크숍 정원', '내 일정표', '세션 체크인'],
    en: ['multi-track', 'session registration', 'conference agenda', 'schedule conflict', 'overlapping sessions', 'room capacity', 'workshop limit', 'personal schedule', 'session check-in'],
  },
  text: {
    ko: {
      domain: '이벤트·체크인',
      title: '복수 트랙·세션별 참가 신청·시간표 겹침 경고와 현장 입장 제한',
      summary: '전체 행사 참가권과 세부 세션 정원 신청을 연결하고, 동시간대 세션 겹침과 발표장 정원 제한을 다룹니다.',
      overview: '대형 컨퍼런스에서는 전체 입장권이 있어도 세부 워크숍이나 소규모 발표장은 정원이 따로 제한됩니다. 참가자가 관심 세션을 시간표에 담아 두는 북마크와 실제 좌석을 차지하는 정원제 세션 신청을 구분하고, 같은 시간대 두 트랙의 세션을 동시에 신청할 때 경고하거나 교체하게 하며, 행사 당일 발표장 앞에서의 세션별 입장 확인 기준을 정해야 합니다. 아래 내용은 복수 트랙·세션 신청 흐름을 설계하기 위한 참고이며 특정 행사의 트랙 수나 현장 노쇼 규칙을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '전체 행사 입장권 등급과 세부 세션 신청 자격', description: '일반 참가권·워크숍 패스·온라인 참가권 등 보유한 티켓 등급에 따라 신청할 수 있는 세부 세션 범위를 구분합니다.' },
        { name: '관심 일정 담기(Bookmark)와 정원제 좌석 예약(Seat reservation) 분리', description: '자유 입장 강연은 인원 제한 없이 내 일정표에 담게 하고, 정원 제한 워크숍은 실제 잔여석을 차감해 예약을 확정합니다.' },
        { name: '동시간대 세션 겹침(Time conflict) 판별', description: '시작·종료 시각이 일부라도 겹치는 두 세션을 고를 때, 단순 북마크는 겹침 표시만 할지 정원제 예약은 기존 세션을 취소하고 교체하게 할지 정합니다.' },
        { name: '세션 시작 직전 노쇼(No-show) 좌석 전환과 시간표 변경', description: '사전 예약자가 세션 시작 몇 분 전까지 입장하지 않으면 현장 대기열에 좌석을 풀지, 발표 시간·장소 변경 시 충돌을 어떻게 안내할지 정합니다.' },
      ],
      workflow: [
        { name: '날짜·트랙·주제별로 전체 세션 시간표 탐색하기', description: '시간 축과 발표장(트랙) 축으로 구성된 시간표에서 각 세션의 발표자, 장소, 정원제 여부, 잔여 좌석을 보여 줍니다.' },
        { name: '시간 겹침과 티켓 등급 자격을 확인해 세션 신청하기', description: '세션을 신청할 때 보유 티켓 등급을 확인하고, 이미 신청한 동시간대 정원제 세션이 있으면 시간 충돌 안내와 교체 선택지를 제시합니다.' },
        { name: '내 시간표(My Agenda) 조회와 세션 취소·변경하기', description: '참가자가 신청·저장한 세션만 시간순으로 모아 보고, 참석하지 못할 정원제 세션은 취소해 다른 참가자에게 좌석을 넘길 수 있게 합니다.' },
        { name: '발표장 입구 세션 체크인과 시간·장소 변경 알림 연결하기', description: '세션 장소나 시각이 바뀌면 해당 신청자에게 알리고, 현장에서는 정원제 세션 예약 여부를 빠르게 확인합니다.' },
      ],
      pitfalls: [
        { name: '관심 세션 북마크를 정원 확정으로 오해하게 만들기', description: '선착순 자유 입장 세션을 내 일정표에 담았을 뿐인데 좌석이 보장된 것처럼 표시하면 현장에서 만석으로 못 들어갈 때 항의가 생깁니다.' },
        { name: '한 참가자가 같은 시간대 정원제 워크숍 여러 개를 동시에 선점하게 두기', description: '동시간대 중복 예약을 막지 않으면 실제로는 한 곳만 가면서 다른 워크숍 좌석까지 허수로 마감시켜 빈자리가 생깁니다.' },
        { name: '세션 시간을 운영자가 옮겼는데 기존 신청자의 시간표 충돌을 표시하지 않기', description: '발표 시간이 바뀌어 참가자의 다른 예약 세션과 겹치게 되었을 때 이를 표시해 주지 않으면 참가자가 현장에서야 알게 됩니다.' },
      ],
      questions: [
        '모든 세션이 사전 정원 신청제인가요, 일반 강연은 자유 입장(북마크만 제공)이고 일부 워크숍만 정원 예약제인가요?',
        '보유한 행사 티켓 등급에 따라 신청 가능한 세션이나 트랙이 제한되나요?',
        '같은 시간대에 시간이 겹치는 두 세션을 담거나 신청하려 할 때 경고만 띄우나요, 정원제 세션은 중복 신청을 차단하나요?',
        '정원이 마감된 세션에 대기 신청을 받나요, 아니면 시작 몇 분 전 미입장 좌석을 현장 대기자에게 개방하나요?',
        '운영자가 세션의 시간이나 발표장을 변경했을 때 기존 신청자에게 어떤 알림과 충돌 안내를 제공하나요?',
      ],
      example: '예시: 3개 트랙 컨퍼런스에서 일반 세션은 시간 겹침 배지만 표시한 채 내 시간표에 자유롭게 북마크하게 하고, 30명 정원 실습 워크숍은 동시간대 중복 예약을 차단하며 세션 시작 10분 전까지 발표장 QR 체크인이 없으면 현장 대기자에게 좌석을 열도록 구성할 수 있습니다. 실제 트랙 구성·중복 허용 여부·현장 노쇼 기준은 행사 운영 방식에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'ly-time-grid-agenda', reason: '시간대와 복수 트랙(발표장) 축에 맞춰 세션 카드를 배치하고 시간표 흐름을 보여주는 표현에 참고할 수 있습니다. 실제 세션 예약과 정원 차감은 별도로 구현해야 합니다.' },
        { id: 'faceted-filter-chips', reason: '트랙·주제·난이도·잔여석 유무 조건 칩으로 세션 목록을 좁혀 보는 표현에 참고할 수 있습니다. 실제 필터 쿼리와 신청 자격 검증은 구현하지 않습니다.' },
      ],
      promptSnippet: '복수 트랙 컨퍼런스의 세션별 참가 신청·시간표 겹침 경고·발표장 정원 관리 흐름을 설계해 줘. 먼저 자유 입장 세션(북마크)과 정원제 예약 세션의 구분, 티켓 등급별 세션 신청 자격, 동시간대 세션 중복 신청 차단/경고 기준, 세션 마감 및 현장 미입장(노쇼) 좌석 개방 규칙, 일정·장소 변경 시 안내 방식을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 전체 시간표에서 일반 세션 북마크와 정원제 세션 예약 상태(신청 가능·예약 완료·정원 마감·시간 충돌)의 표시.\n2. 세션 신청 시 티켓 등급 자격 확인과 동시간대 기신청 세션과의 시간 겹침 처리(경고 또는 기존 예약 교체).\n3. 참가자 개인 시간표(My Agenda) 조회, 예약 취소 시 잔여석 즉시 복원, 운영자의 시간·장소 변경 시 충돌 재계산.\n4. 발표장 입구에서의 세션별 예약 확인과 시작 직전 미입장 좌석의 현장 전환 흐름.\n5. 트랙/주제 필터 칩·시간 격자 아젠다·충돌 교체 확인·내 시간표 화면의 연결.\n단순 일정표 북마크를 좌석 보장으로 오해하게 하거나 정원제 세션을 동시간대에 무제한 중복 선점하게 두지 말고, 예시 정책과 디자인 데모를 실제 세션 예약 시스템으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Events & Check-in',
      title: 'Multi-track session sign-ups, schedule conflict warnings and room capacity limits',
      summary: 'Connect event tickets with per-session room capacities, overlapping-slot conflict checks and personal agendas.',
      overview: 'At multi-track conferences, holding a general event badge does not guarantee a seat in every breakout room or hands-on workshop. Distinguishing casual agenda bookmarks from capacity-controlled room reservations, detecting overlapping time slots so one attendee cannot hoard seats in parallel workshops, and handling room or schedule changes keeps breakout rooms balanced. These concepts are design references, not default room capacities or no-show policies.',
      concepts: [
        { name: 'Event pass tier eligibility for breakout sessions', description: 'Check whether an attendee’s ticket tier (such as General Admission versus Workshop Pass) grants access to reserve specific tracks or sessions.' },
        { name: 'Agenda bookmarking versus capacity-locked seat reservation', description: 'Clearly separate open-seating talks saved to a personal schedule from capacity-limited sessions that reserve an actual room seat.' },
        { name: 'Time-slot overlap detection and replacement', description: 'Detect when two sessions overlap in time; allow side-by-side bookmarks with a visual overlap badge, or require replacing an existing reservation for capacity-limited workshops.' },
        { name: 'Room check-in cutoffs and schedule-change alerts', description: 'Define when unclaimed reserved seats release to standby attendees at the room door, and notify registrants if a session’s time or room changes.' },
      ],
      workflow: [
        { name: 'Explore the multi-track time grid and room availability', description: 'Present sessions across time slots and tracks, indicating speakers, room names, open-seating versus reservation-required status and remaining seats.' },
        { name: 'Validate ticket eligibility and time conflicts on sign-up', description: 'When an attendee reserves a capacity-limited session, check pass eligibility and prompt to swap if they already hold a reservation in an overlapping slot.' },
        { name: 'Manage personal agenda and release canceled seats', description: 'Let attendees view their saved and reserved sessions in chronological order and cancel a reservation so the seat returns to the pool.' },
        { name: 'Verify room entry and broadcast schedule updates', description: 'Let room monitors verify session reservations at the door and alert registered attendees when a session’s room or start time shifts.' },
      ],
      pitfalls: [
        { name: 'Making casual agenda bookmarks look like guaranteed seats', description: 'If saving an open-seating talk uses the same confirmation language as a reserved workshop, attendees will expect a held seat in a full room.' },
        { name: 'Letting one attendee reserve multiple capacity-limited workshops in the same time slot', description: 'Allowing parallel seat reservations inflates no-show rates and locks out other attendees from hands-on rooms.' },
        { name: 'Moving a session’s time slot without flagging newly created schedule conflicts', description: 'When organizers reschedule a talk, recompute overlaps on registered attendees’ agendas and notify affected ticket holders.' },
      ],
      questions: [
        'Which sessions are open-seating bookmarks versus strict capacity-limited reservations?',
        'Do certain sessions or tracks require a specific ticket tier or add-on pass?',
        'When an attendee selects a session that overlaps with an existing item on their schedule, should the system warn them or block duplicate reservations?',
        'How are full sessions handled (waitlist or standby line at the door), and when do unclaimed reserved seats release before the session starts?',
        'How are attendees notified if an organizer changes a session’s room, speaker or time slot?',
      ],
      example: 'Example: a multi-track summit could allow unlimited agenda bookmarks for main-stage talks with an overlap badge, restrict hands-on labs to one reservation per time slot for Workshop Pass holders, and release unclaimed lab seats to the door standby line 10 minutes before start time. Confirm actual session types, overlap rules and door policies before adopting this setup.',
      relatedDesigns: [
        { id: 'ly-time-grid-agenda', reason: 'A reference for laying out parallel track sessions across a time-grid schedule. Session reservation persistence and capacity checks need separate implementation.' },
        { id: 'faceted-filter-chips', reason: 'A reference for filtering conference sessions by track, topic or seat availability using chips. Query filtering and eligibility checks need separate implementation.' },
      ],
      promptSnippet: 'Help design a multi-track event session registration, conflict-checking and room-capacity workflow. First confirm which sessions use casual bookmarking versus capacity reservations, ticket-tier eligibility rules, overlapping time-slot conflict handling, full-session/no-show release rules, and schedule-change notifications. Do not assume undecided rules.\nBased on the answers, describe:\n1. Clear visual and state distinction between open-seating bookmarks, confirmed seat reservations, full sessions and time conflicts.\n2. Eligibility checks and overlap resolution (warning vs replacing an existing reservation) when signing up.\n3. Personal agenda management, seat return upon cancellation and conflict recalculation if organizers move a session.\n4. Room-level check-in verification and standby seat release before session start.\n5. How filter chips, time-grid schedules, overlap swap dialogs and personal agenda views connect.\nDo not present casual bookmarks as guaranteed room seats or allow one attendee to hoard parallel capacity-limited sessions, and do not mistake example policies or design demos for a real event scheduling backend.',
    },
  },
  sources: [
    { title: 'Eventbrite Help Center — Manage multi-session events and capacity', url: 'https://www.eventbrite.com/help/en-us/articles/857219/how-to-create-an-event-with-multiple-dates-or-times/' },
    { title: 'Zoom Support — Zoom Events session registration and capacity limits', url: 'https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0065645' },
  ],
}, {
  id: 'event-speaker-sponsor-and-material-release',
  aliases: {
    ko: ['연사 발표자료 취합 검수', '컨퍼런스 발표 슬라이드 공개', '참석자 전용 발표자료 다운로드', '연사 프로필 세션 연결'],
    en: ['speaker deck submission', 'presentation material review', 'attendee-gated event resources', 'post-event slide release'],
  },
  useCases: {
    ko: ['연사로부터 발표 제목·초록·프로필과 발표 자료(슬라이드·영상)를 마감 기한에 맞춰 취합·검수할 때', '행사 전에는 세션 소개만 보여 주고 세션 종료 후에만 발표 자료와 다시보기를 열 때', '전체 공개 자료와 티켓 보유자·실제 체크인 참석자만 볼 수 있는 자료의 열람 범위를 나눌 때', '연사 요청으로 공개 후 자료를 수정 교체하거나 배포를 중단할 때'],
    en: ['Collecting and reviewing speaker bios, session abstracts and presentation decks before an event', 'Keeping slides and recordings hidden during the talk and releasing them after the session concludes', 'Separating public session resources from materials gated to ticket holders or checked-in attendees', 'Replacing or unpublishing a speaker deck after the event when corrections or redactions are needed'],
  },
  keywords: {
    ko: ['연사 관리', '발표 자료', '슬라이드 제출', '사전 검수', '자료 공개 시점', '다시보기 영상', '참석자 전용 자료', '열람 자격', '자료 교체'],
    en: ['speaker management', 'presentation deck', 'slide submission', 'material review', 'scheduled release', 'session recording', 'attendee-gated access', 'access scope', 'deck replacement'],
  },
  text: {
    ko: {
      domain: '이벤트·체크인',
      title: '연사·발표 자료 사전 검수·행사 종료 후 참석자 전용 자료 공개',
      summary: '연사 발표 자료의 사전 제출·운영진 검수와 행사 후 참석 자격별 자료 공개 시점을 연결합니다.',
      overview: '컨퍼런스나 세미나에서는 연사의 발표 소개글은 행사 전에 먼저 열리지만, 실제 발표 슬라이드와 녹화 영상은 사전 검수를 거쳐 세션이 끝난 뒤에야 공개되는 경우가 많습니다. 연사가 제출한 작업본과 운영진이 승인한 게시본을 구분하고, 누구나 볼 수 있는 자료인지 티켓 구매자 또는 실제 현장 체크인 참석자만 내려받을 수 있는 자료인지 열람 자격을 나누어야 합니다. 아래 내용은 연사 자료 검수·공개 흐름을 설계하기 위한 참고이며 특정 행사의 저작권 동의 조건이나 공개 기한을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '연사 제출 작업본과 운영진 승인 게시본 분리', description: '연사가 마감 전에 올린 슬라이드나 발표 소개 수정본이 검수 없이 시간표 화면에 바로 반영되지 않도록 제출·검수 대기·보완 요청·승인 완료 상태를 둡니다.' },
        { name: '세션 소개 공개와 발표 자료(슬라이드·영상) 공개 시점 분리', description: '행사 전에는 세션 제목·연사 소개만 노출하고, 발표 자료와 녹화본은 세션 종료 후 또는 지정한 공개 시각에 열리게 구분합니다.' },
        { name: '열람 범위(전체 공개·티켓 보유자·체크인 참석자)', description: '발표 자료마다 비로그인 전체 공개, 유효 티켓 보유자 전용, 실제 현장·온라인 체크인 완료자 전용 등 열람 자격을 설정합니다.' },
        { name: '연사 배포 동의와 사후 교체·비공개 전환', description: '연사별로 슬라이드 다운로드 허용 여부와 영상 다시보기 공개 동의 범위를 따로 기록하고, 민감 정보 발견 시 자료를 새 버전으로 교체하거나 즉시 내릴 수 있게 합니다.' },
      ],
      workflow: [
        { name: '연사별 제출 항목과 마감 기한 안내하기', description: '연사에게 프로필, 발표 요약, 발표용 파일, 배포용 파일(PDF 등)과 저작권·공개 동의 체크 항목을 마감일과 함께 안내합니다.' },
        { name: '제출 자료 사전 검수와 보완 요청·승인하기', description: '운영진이 화면 비율·폰트 깨짐·외부 공개 불가 내용 여부를 확인해 승인하거나 사유와 함께 재업로드를 요청합니다.' },
        { name: '세션 종료 또는 예약 시각에 맞춰 자료 공개하기', description: '승인된 자료를 세션 종료 후 공개 상태로 전환하고, 참가자에게 발표 자료가 열렸음을 알립니다.' },
        { name: '참가권·체크인 자격을 검증해 열람·내려받기 제공하기', description: '참가자가 세션 상세 화면에서 자료를 열 때 티켓 보유 또는 체크인 여부를 확인하고 허용된 형식(열람 또는 다운로드)으로 제공합니다.' },
      ],
      pitfalls: [
        { name: '연사가 현장 발표용 원본 파일을 올리는 즉시 참가자에게 다운로드로 노출하기', description: '발표 전에 슬라이드 스포일러나 미검수 대외비 내용이 먼저 유출됩니다. 운영진 검수 승인과 공개 시점 조건을 분리하세요.' },
        { name: '환불·취소된 티켓 보유자에게도 유료 참석자 전용 자료가 계속 열리기', description: '과거에 티켓을 샀다가 취소한 계정은 참석자 전용 자료 열람 대상에서 제외되어야 합니다. 현재 유효한 티켓·체크인 상태를 확인하세요.' },
        { name: '현장 발표용 슬라이드와 참석자 배포용 PDF를 구분하지 않기', description: '애니메이션이나 내부 메모가 들어간 발표 원본을 그대로 배포하면 안 되는 연사가 많습니다. 발표 진행용과 참석자 배포용 파일을 구분해 받으세요.' },
      ],
      questions: [
        '연사가 직접 포털에 프로필과 발표 자료를 업로드하나요, 운영진이 대신 등록하고 승인만 받나요?',
        '현장 발표용 파일과 참석자 배포용 파일(예: 메모 제거 PDF)을 별도로 제출받으며, 연사별로 자료 비공개를 선택할 수 있나요?',
        '발표 자료와 녹화 영상은 언제 공개되나요(세션 시작 시, 세션 종료 직후, 행사 전체 종료 후 수동 일괄 공개)?',
        '자료 열람·다운로드 자격은 누구나 가능한가요, 유효 티켓 보유자만 가능한가요, 실제 체크인 완료자만 가능한가요?',
        '공개된 자료는 행사 종료 후 얼마 동안 열람할 수 있으며, 사후 수정 교체 시 기존 다운로드 링크는 어떻게 처리하나요?',
      ],
      example: '예시: 기술 컨퍼런스에서 연사에게 행사 3일 전까지 발표본과 배포용 PDF를 따로 제출받아 운영진이 검수 승인하고, 행사가 끝난 다음 날 유효 티켓 보유자에게만 배포동의된 세션의 PDF 다운로드와 30일간 다시보기를 열도록 구성할 수 있습니다. 실제 제출 기한·열람 자격·연사 공개 동의 조건은 행사 운영 기준에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'onboarding-progress-checklist', reason: '연사가 마감일 전까지 제출해야 할 프로필·발표 요약·공개 동의·발표 자료 단계의 진행 상태를 보여주는 표현에 참고할 수 있습니다. 실제 파일 업로드와 검수 승인은 별도로 구현해야 합니다.' },
        { id: 'underline-content-tabs', reason: '세션 상세 화면에서 세션 소개·연사 정보·발표 자료/다시보기 탭을 전환해 보여주는 표현에 참고할 수 있습니다. 실제 티켓 자격 검증과 파일 제공은 구현하지 않습니다.' },
      ],
      promptSnippet: '이벤트 연사 발표 자료 사전 취합·검수와 행사 종료 후 참석자 전용 자료 공개 흐름을 설계해 줘. 먼저 연사 제출 항목(발표용 vs 배포용 파일, 공개 동의 여부), 운영진 사전 검수·승인 절차, 자료 공개 시점(세션 종료 후 자동 vs 수동 전환), 열람 허용 대상(전체·유효 티켓 보유자·체크인 참석자), 공개 후 자료 교체 및 만료 규칙을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 연사 제출 전·검수 대기·보완 요청·검수 승인(공개 대기)·공개 완료·공개 종료 상태 전환.\n2. 현장 발표용 파일과 참가자 배포용 자료의 분리 및 연사별 공개 동의 범위(열람만/다운로드 허용/비공개) 적용.\n3. 유효 티켓 보유자 또는 체크인 완료자 여부 검증과 취소된 티켓 보유자의 접근 차단.\n4. 공개 후 오타·민감 정보 수정으로 자료를 새 버전으로 교체하거나 즉시 비공개로 내리는 절차.\n5. 연사 제출 체크리스트·운영진 검수 화면·세션 상세 탭(소개/연사/발표자료)·자격 안내 화면의 연결.\n연사가 파일을 올리는 즉시 참가자에게 공개하거나 취소된 티켓에 참석자 자료 권한을 남기지 말고, 예시 정책과 디자인 데모를 실제 파일 배포·권한 검증 시스템으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Events & Check-in',
      title: 'Speaker deck review, schedule changes and attendee-gated post-event materials',
      summary: 'Connect speaker deck submission and organizer review with post-session material release gated by ticket or check-in status.',
      overview: 'Conference session descriptions go live weeks before the event, but speaker slide decks and session recordings usually require organizer review and should stay hidden until the talk concludes. Separating speaker working submissions from approved public session info, distinguishing stage presentation files from attendee handout PDFs, and gating post-event downloads to valid ticket holders or checked-in attendees prevents premature leaks. These concepts are design references, not default speaker-agreement terms or hosting limits.',
      concepts: [
        { name: 'Speaker submission review versus live session listing', description: 'Keep speaker-uploaded bios, abstracts and slide files in a review workflow (submitted, changes requested, approved) before publishing to the live schedule.' },
        { name: 'Staged release timing (pre-event info versus post-session materials)', description: 'Show session titles and speaker bios before the event while holding approved slide handouts and recordings until the session ends or the organizer triggers release.' },
        { name: 'Tiered access scope (public, ticket holder, checked-in attendee)', description: 'Control per-session resource access so organizers can make materials open to everyone, limited to active ticket holders, or limited to checked-in attendees.' },
        { name: 'Speaker distribution consent and post-release replacement', description: 'Record whether each speaker consents to PDF downloads or video replay, and allow swapping a corrected deck or unpublishing a file immediately if needed.' },
      ],
      workflow: [
        { name: 'Collect speaker profile, consent and separate presentation/handout files', description: 'Guide speakers through a deadline checklist for their bio, talk summary, stage deck, attendee handout PDF and distribution consent.' },
        { name: 'Review submissions and request revisions or approve', description: 'Let organizers inspect uploaded decks for formatting or confidential content, either requesting a new upload or marking the material approved for release.' },
        { name: 'Release approved materials after session completion', description: 'Unlock approved handouts and recordings once the session finishes or when the organizer publishes post-event resources.' },
        { name: 'Verify active ticket or check-in status before serving files', description: 'Check that the viewer holds an active, unrefunded pass (or completed check-in, if required) before opening or downloading gated session materials.' },
      ],
      pitfalls: [
        { name: 'Exposing speaker slides for download the moment the speaker uploads them', description: 'Auto-publishing raw uploads weeks before the conference leaks unreviewed slides and spoils talks. Separate upload approval from scheduled release.' },
        { name: 'Allowing refunded or voided tickets to keep accessing attendee-only recordings', description: 'Verify current active ticket or check-in state rather than relying on an old registration email link.' },
        { name: 'Treating the live stage presentation file as the downloadable attendee handout', description: 'Speakers often use animations or private speaker notes in their stage deck. Collect a separate sanitized handout file or require explicit distribution opt-in.' },
      ],
      questions: [
        'Do speakers upload materials through a self-service portal, and are stage files separated from downloadable attendee handouts?',
        'Can individual speakers opt out of sharing their slides or video recording while keeping their session on the schedule?',
        'When do approved slides and recordings become visible—immediately after each session ends, or via a manual post-event release?',
        'Who can access released materials: anyone, active ticket holders, or only attendees who checked in?',
        'How long do post-event recordings and downloads remain available, and how are post-release file replacements handled?',
      ],
      example: 'Example: a conference portal could give speakers a checklist to submit their stage deck, optional attendee PDF and distribution consent 3 days before the event, keep approved PDFs locked until the organizer flips post-event release, and allow active ticket holders to access consented handouts and replays for 30 days. Confirm actual speaker rights, gating rules and retention windows before adopting this setup.',
      relatedDesigns: [
        { id: 'onboarding-progress-checklist', reason: 'A reference for showing speakers their submission checklist across bio, abstract, consent and deck upload steps. File review and storage need separate implementation.' },
        { id: 'underline-content-tabs', reason: 'A reference for switching between Session Overview, Speaker Bio and Slides/Recording tabs on a session page. Ticket gating and file delivery need separate implementation.' },
      ],
      promptSnippet: 'Help design an event speaker-material review and post-event resource release workflow. First confirm speaker submission items (stage file vs attendee handout, distribution consent), organizer review and approval steps, release timing (per-session end vs manual release), viewer eligibility (public, active ticket holders, checked-in attendees), and post-release replacement or expiry rules. Do not assume undecided rules.\nBased on the answers, describe:\n1. States across pending submission, under review, changes requested, approved/scheduled, released and expired/unpublished.\n2. Separation between stage presentation files and consented attendee handouts/recordings.\n3. Authorization checks for active ticket holders or checked-in attendees, excluding canceled/refunded passes.\n4. Updating or revoking a published deck if redactions are required after the event.\n5. How speaker checklists, organizer review queues, session detail tabs and gated download screens connect.\nDo not auto-publish speaker uploads before organizer approval and release time, and do not mistake example policies or design demos for a real content-delivery or rights-management system.',
    },
  },
  sources: [
    { title: 'Sessionize — Speaker portal, deck collection and schedule management', url: 'https://sessionize.com/playbook/manage-speakers' },
    { title: 'Zoom Support — Managing Zoom Events recordings and attendee access', url: 'https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0068252' },
  ],
}, {
  id: 'event-cancellation-postponement-and-batch-refund',
  aliases: {
    ko: ['행사 취소 일괄 환불', '행사 일정 연기 티켓 유지', '주최자 취소 전액 환불', '연기 행사 부분 환불 마감'],
    en: ['event postponement and refund', 'batch ticket refund', 'event cancellation payout reversal', 'rescheduled event ticket rollover'],
  },
  useCases: {
    ko: ['우천·대관 취소 등으로 행사가 전면 취소되어 전체 참가권에 대해 수수료 없는 일괄 전액 환불을 진행할 때', '행사 날짜가 연기되었을 때 기존 참가권을 새 일정으로 자동 유지(Rollover)하되 불참 희망자에게는 환불 기한을 열어 줄 때', '일괄 환불 시 취소된 입장 QR 코드를 즉시 무효화하고 환불 진행·실패 건을 추적할 때', '이미 정산금을 일부 지급받은 주최자의 행사 취소 시 환불 재원과 차감 정산을 다룰 때'],
    en: ['Canceling an entire event and executing batch full refunds across all active orders', 'Postponing an event to a new date while letting ticket holders either keep their passes or request a refund before a deadline', 'Invalidating refunded QR passes and tracking batch refund progress and payment-method failures', 'Managing refund funding and organizer balance recovery when an event is canceled'],
  },
  keywords: {
    ko: ['행사 취소', '행사 연기', '일정 변경', '일괄 환불', '전액 환불', '참가권 유지', '환불 신청 기한', '주최자 귀책 취소', '입장권 무효화'],
    en: ['event cancellation', 'event postponement', 'rescheduled event', 'batch refund', 'full refund', 'ticket rollover', 'refund deadline', 'organizer cancellation', 'pass invalidation'],
  },
  text: {
    ko: {
      domain: '이벤트·체크인',
      title: '행사 연기·취소 시 참가권 일괄 환불과 변경 일정 유지 확인',
      summary: '참가자 변심 취소와 주최자 행사 연기·취소를 분리하고, 변경 일정 참가권 유지(Rollover)와 일괄 환불 처리를 연결합니다.',
      overview: '참가자 개인이 취소할 때는 취소 마감일과 위약금 규정이 적용되지만, 주최자 사정으로 행사가 전면 취소되거나 연기될 때는 완전히 다른 규칙이 필요합니다. 전면 취소 시에는 마감 기한과 관계없이 일괄 전액 환불과 입장 코드 무효화가 이루어져야 하고, 일정 연기 시에는 기존 티켓을 새 날짜로 그대로 유지할지 환불받을지 선택할 수 있는 기한을 안내해야 하며, 수백·수천 건의 비동기 환불 중 카드 정지 등으로 실패한 건을 별도로 추적해야 합니다. 아래 내용은 행사 연기·취소 및 일괄 환불 흐름을 설계하기 위한 참고이며 특정 플랫폼의 위약금이나 정산 보류 규정을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '참가자 자발적 취소와 주최자 행사 취소·연기 규정 분리', description: '일반 취소 마감일이 지났더라도 주최자가 행사를 취소하면 취소 수수료 없이 전액 환불 대상으로 전환합니다.' },
        { name: '행사 연기 시 참가권 유지(Rollover)와 환불 신청 기간', description: '일정이 연기되면 기존 참가권과 QR 코드를 새 일정에 그대로 유효하게 둘지, 참석이 어려운 참가자에게 언제까지 전액 환불 신청을 받을지 정합니다.' },
        { name: '비동기 일괄 환불(Batch refund) 상태와 실패 복구', description: '수백 건의 결제를 한꺼번에 취소할 때 환불 대기·환불 진행 중·환불 완료·환불 실패(카드 만료·계좌 오류 등 별도 환불 필요) 상태를 건별로 추적합니다.' },
        { name: '환불된 참가권의 즉시 무효화와 중복 환불 방지', description: '개별 환불이나 일괄 환불에 포함된 참가권은 즉시 입장 불가 상태로 바꾸고, 이미 부분 환불된 주문을 일괄 환불할 때 남은 금액만 정확히 환불합니다.' },
      ],
      workflow: [
        { name: '행사 연기 또는 전면 취소 결정과 대상 주문 집계하기', description: '취소·연기 확정 전에 현재 유효한 주문 수, 이미 부분 취소된 건, 총 환불 예정 금액과 안내 메시지 내용을 먼저 확인합니다.' },
        { name: '일정 연기 안내와 참가 유지·환불 선택 기간 운영하기', description: '연기 시 새 일시·장소와 환불 가능 마감일을 공지하고, 참가자가 새 일정 참석 유지 또는 환불을 선택하게 합니다.' },
        { name: '전면 취소 시 일괄 환불 실행과 입장권 일괄 폐기하기', description: '행사가 취소되면 신규 예매와 양도를 즉시 중단하고, 모든 유효 참가권을 무효화한 뒤 비동기 일괄 환불 배치를 실행합니다.' },
        { name: '건별 환불 완료 통보와 실패 건 수동 후속 처리하기', description: '참가자에게 환불 접수 및 완료 안내를 보내고, 결제 수단 문제로 자동 취소가 실패한 주문만 모아 대체 환불 절차를 진행합니다.' },
      ],
      pitfalls: [
        { name: '주최자가 행사를 취소했는데 일반 취소 수수료나 마감일 차감을 그대로 적용하기', description: '참가자 변심 취소 로직을 그대로 호출해 주최자 취소 건에서도 위약금을 떼면 분쟁이 발생합니다. 취소 사유 주체(참가자 vs 주최자)를 분리하세요.' },
        { name: '이미 1장 부분 환불된 3장짜리 주문에 전체 원금 환불을 다시 요청하기', description: '일괄 환불 시 최초 결제 원금이 아니라 현재 환불되지 않고 남아 있는 유효 티켓 금액만 계산해 환불해야 초과 환불이나 PG 오류가 나지 않습니다.' },
        { name: '수백 건 일괄 환불을 단일 동기 요청으로 처리하다 중간에 타임아웃 나기', description: '대량 결제 취소는 외부 PG 호출이 많아 시간이 걸립니다. 주문별 멱등 키(Idempotency key)를 두고 비동기 큐로 처리하며 진행률을 보여 주세요.' },
      ],
      questions: [
        '주최자가 행사를 전면 취소할 때 티켓 금액 외에 예매 수수료까지 모두 전액 환불하나요?',
        '행사가 연기(날짜·장소 변경)되었을 때 기존 참가권은 기본으로 새 일정에 자동 유지되나요, 아니면 참가자가 유지 여부를 다시 확인해야 하나요?',
        '행사 연기로 참석이 어려운 참가자에게는 언제까지 수수료 없는 전액 환불 신청을 열어 주나요?',
        '이미 일부 좌석을 부분 취소했거나 양도한 주문이 일괄 환불 대상에 포함될 때 누가 얼마를 환불받나요(최초 결제자 vs 양수인)?',
        '대량 환불 중 카드 해지·가상계좌 만료 등으로 자동 취소가 실패한 건은 참가자와 운영자에게 어떻게 안내하고 처리하나요?',
      ],
      example: '예시: 세미나가 2주 연기되면 기존 참가권은 새 날짜로 자동 유지하되 새 일정 기준 7일 전까지 수수료 없는 전액 환불 신청을 열어 두고, 전면 취소 시에는 이미 부분 취소된 금액을 제외한 잔여 유효 금액에 대해 비동기 일괄 환불을 실행하며 실패 건만 운영자 목록에 따로 모으도록 구성할 수 있습니다. 실제 예매 수수료 환불 범위·양도 티켓 환불 귀속·정산금 회수 규칙은 약관에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'bulk-selection-action-bar', reason: '연기·취소 대상 참가 주문이나 환불 실패 건을 선택해 일괄 환불·재시도·안내 발송을 실행하는 작업 바 표현에 참고할 수 있습니다. 실제 PG 환불 배치와 멱등 처리는 별도로 구현해야 합니다.' },
        { id: 'sticky-announcement-banner', reason: '행사 상세 및 내 티켓 화면 상단에 일정 연기 또는 행사 취소 공지와 환불 신청 마감 기한을 고정해 알리는 표현에 참고할 수 있습니다. 실제 일정 변경과 환불 접수는 구현하지 않습니다.' },
      ],
      promptSnippet: '이벤트 연기(일정 변경)·전면 취소 시 참가권 유지 확인 및 일괄 환불 흐름을 설계해 줘. 먼저 주최자 취소 시 전액 환불 범위(예매 수수료 포함 여부), 행사 연기 시 기존 티켓 자동 유지(Rollover)와 환불 신청 허용 기한, 부분 취소·양도된 주문의 환불 금액 및 수취인 기준, 대량 비동기 환불 진행 및 실패 건 복구 절차를 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 정상 진행·일정 연기(환불 신청 기간)·행사 취소(일괄 환불 중)·환불 완료 상태 전환과 신규 예매/양도 차단.\n2. 참가자 자발적 취소 규정과 주최자 귀책 취소·연기 시 무수수료 전액 환불 규칙의 분리.\n3. 기부분환불 차감 계산, 입장 QR 코드 즉시 무효화, 주문별 멱등 키 기반 비동기 일괄 환불 처리.\n4. 카드 해지·계좌 오류 등으로 일괄 환불에서 실패한 건의 별도 추출 및 대체 환불 안내.\n5. 상단 연기/취소 고정 공지 배너·참가자 일정 유지/환불 선택 화면·운영자 일괄 환불 작업 바 및 진행 현황 화면의 연결.\n주최자 취소 건에 참가자 위약금을 적용하거나 대량 PG 환불을 단일 동기 호출로 처리하지 말고, 예시 정책과 디자인 데모를 실제 결제 취소·정산 시스템으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Events & Check-in',
      title: 'Event postponement or cancellation, batch refunds and roll-over ticket confirmation',
      summary: 'Separate organizer-initiated cancellation or postponement from attendee cancellation, and connect ticket rollover windows with idempotent batch refunds.',
      overview: 'When an attendee cancels their own ticket, standard cutoff dates and cancellation fees apply; when the organizer postpones or cancels the entire event, those rules no longer fit. Handling full event cancellations requires halting sales, invalidating passes and running asynchronous, idempotent batch refunds for the remaining unrefunded balance of every order, while postponements require clear rollover defaults and a penalty-free refund window for attendees who cannot make the new date. These concepts are design references, not default refund laws or payment-gateway rules.',
      concepts: [
        { name: 'Organizer cancellation/postponement versus attendee-initiated cancellation', description: 'Bypass standard attendee cancellation cutoffs and penalty fees when the organizer cancels the event or moves it to a new date.' },
        { name: 'Ticket rollover and postponement refund windows', description: 'When an event is postponed, define whether existing passes automatically carry over to the new date and how long attendees have to request a full refund if the new date does not work.' },
        { name: 'Idempotent asynchronous batch refunds and failure tracking', description: 'Process bulk order refunds via an asynchronous queue with per-order idempotency keys, tracking pending, refunded and failed (e.g., expired card) states separately.' },
        { name: 'Remaining-balance calculation and immediate pass revocation', description: 'Refund only the remaining active balance on partially refunded orders, and immediately mark all refunded passes as void for door check-in.' },
      ],
      workflow: [
        { name: 'Preview affected orders and total refund liability before confirming', description: 'Before marking an event postponed or canceled, show the organizer the count of active passes, partially refunded orders and total refund amount.' },
        { name: 'Announce postponement with rollover and refund-request deadline', description: 'For postponed events, publish the new date and venue, keep existing passes valid by default (or ask for confirmation), and open a deadline-bound full-refund option.' },
        { name: 'Freeze sales, void passes and trigger batch refunds on cancellation', description: 'When an event is canceled, immediately stop new ticket sales and transfers, void all active QR passes, and enqueue batch refunds.' },
        { name: 'Notify attendees and resolve failed refund transactions', description: 'Send confirmation notices as refunds complete and surface any failed payment reversals in an exception queue for manual follow-up.' },
      ],
      pitfalls: [
        { name: 'Applying attendee cancellation penalties during an organizer-initiated cancellation', description: 'Reusing the attendee self-cancellation function deducts fees or blocks refunds past cutoff. Route organizer cancellations through a dedicated full-refund policy.' },
        { name: 'Attempting to refund the original gross order amount on a partially refunded order', description: 'If a 4-ticket order already had 1 ticket refunded earlier, batch refunding must refund only the remaining 3 active tickets.' },
        { name: 'Running hundreds of gateway refunds in a single synchronous HTTP request', description: 'Bulk payment reversals time out if run synchronously. Use background jobs with idempotency keys and show live batch progress.' },
      ],
      questions: [
        'When an organizer cancels an event, are ticketing and service fees refunded in full alongside the ticket price?',
        'When an event is postponed to a new date, do existing tickets roll over automatically or must attendees explicitly confirm attendance?',
        'How long is the penalty-free refund request window open after an event postponement is announced?',
        'How are batch refunds handled for orders that were partially refunded earlier or had tickets transferred to another person?',
        'When an automated refund fails (for example, a closed bank account or expired card), how are the organizer and buyer notified to complete recovery?',
      ],
      example: 'Example: an event platform could roll existing passes over automatically when a seminar is postponed while opening a 14-day penalty-free refund window, and upon full cancellation, immediately freeze sales, void all QR codes and process remaining order balances through an idempotent batch-refund queue with a failed-refund retry list. Confirm actual fee-refund policies, transfer refund recipients and payout-escrow rules before adopting this setup.',
      relatedDesigns: [
        { id: 'bulk-selection-action-bar', reason: 'A reference for selecting affected orders or failed refund rows to trigger batch refunds or retry actions. Gateway refund queues and idempotency need separate implementation.' },
        { id: 'sticky-announcement-banner', reason: 'A reference for pinning an event postponement or cancellation notice and refund deadline at the top of the event and ticket views. Refund execution needs separate implementation.' },
      ],
      promptSnippet: 'Help design an event postponement, cancellation and batch-refund workflow. First confirm full-refund rules on organizer cancellation (including service fees), ticket rollover defaults and refund windows on postponement, handling of partially refunded or transferred orders, and asynchronous batch-refund processing with failure recovery. Do not assume undecided rules.\nBased on the answers, describe:\n1. Event and ticket state transitions across scheduled, postponed (refund window open), canceled (batch refunding), refunded and refund-failed.\n2. Separation between attendee self-cancellation rules and organizer-initiated full refunds.\n3. Remaining-balance calculation for partially refunded orders, immediate QR pass revocation and idempotent background refund execution.\n4. Exception handling and buyer/organizer guidance when a payment gateway refund fails.\n5. How sticky postponement/cancellation banners, attendee rollover/refund choices and organizer batch-refund progress screens connect.\nDo not apply attendee penalty fees to organizer-canceled events or run bulk gateway refunds synchronously, and do not mistake example policies or design demos for a real payment-reversal engine.',
    },
  },
  sources: [
    { title: 'Eventbrite Help Center — Cancel or postpone your event and issue refunds', url: 'https://www.eventbrite.com/help/en-us/articles/790574/how-to-cancel-or-postpone-your-event/' },
    { title: 'Stripe Docs — Refund payments and handle idempotent retries', url: 'https://docs.stripe.com/refunds' },
  ],
}];
