import type { DomainKnowledge } from '../domain-knowledge';

export const BOOKING_KNOWLEDGE: DomainKnowledge[] = [{
  id: 'booking-slot-capacity-and-cancellation',
  aliases: {
    ko: ['예약 서비스', '예약 시스템', '일정 예약', '타임슬롯 예약', '예약 변경 취소', '대기열 예약'],
    en: ['booking system', 'reservation service', 'appointment scheduling', 'time-slot booking', 'rescheduling and cancellation'],
  },
  useCases: {
    ko: ['날짜·시간대별 예약이나 상담 일정을 받는 서비스를 만들 때', '동시 예약 시 정원·잔여석과 대기열을 관리할 때', '예약 신청·승인 대기·확정·방문 완료 상태를 구분할 때', '예약 변경·취소 마감 기한과 노쇼 처리 규칙을 설계할 때'],
    en: ['Building a service for date and time-slot bookings or appointments', 'Managing capacity, remaining spots and waitlists under concurrent requests', 'Separating requested, pending approval, confirmed and attended states', 'Designing rescheduling windows, cancellation cutoffs and no-show policies'],
  },
  keywords: {
    ko: ['예약', '일정', '스케줄', '시간대', '타임슬롯', '정원', '잔여석', '대기열', '예약 확정', '예약 변경', '예약 취소', '노쇼', '시간대 기준'],
    en: ['booking', 'reservation', 'schedule', 'scheduling', 'time slot', 'time slot capacity', 'capacity', 'availability', 'waitlist', 'confirmation', 'reschedule', 'cancellation', 'no-show', 'timezone'],
  },
  text: {
    ko: {
      domain: '예약·일정',
      title: '시간대·정원·예약 확정과 변경·취소 규칙',
      summary: '가능한 시간대 조회와 실제 예약 확정을 구분하고, 정원·대기·변경·취소·노쇼를 연결합니다.',
      overview: '달력에서 빈 시간대를 고르는 것만으로 예약이 완료되지는 않습니다. 정원과 동시 요청, 즉시 확정과 운영자 승인, 변경·취소 마감 시각, 미방문(노쇼) 처리를 분리해 설계해야 일정 충돌과 초과 예약을 막을 수 있습니다. 아래 내용은 예약 서비스를 설계하기 위한 참고이며 특정 업종의 위약금이나 운영 시간을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '가용 시간대와 정원', description: '운영 시간, 휴무일, 준비 시간(버퍼), 시간대별 최대 인원이나 자원 수를 기준으로 예약 가능한 슬롯과 잔여석을 계산합니다.' },
        { name: '예약 상태 전환', description: '예약 요청·승인 대기·확정·변경됨·취소됨·이용 완료·노쇼를 구분합니다. 신청 접수와 실제 자리 확정이 같은 시점인지 먼저 정해야 합니다.' },
        { name: '동시 선택과 중복 예약 방지', description: '같은 시간대의 마지막 자리를 여러 사람이 동시에 누를 때 누가 확정되는지, 입력 중 임시 선점 시간을 둘지 결정합니다.' },
        { name: '변경·취소 가능 기한과 대기열', description: '이용 시작 몇 시간 전까지 직접 변경·취소할 수 있는지 정합니다. 취소로 빈 자리가 생겼을 때 대기열에 자동 배정할지 순서대로 알림만 보낼지도 구분합니다.' },
        { name: '시간대(Timezone)와 일정 표기', description: '온라인 상담이나 글로벌 서비스라면 예약자 시각과 제공자 시각 중 무엇을 기준으로 표시하고 알림을 보낼지 명확히 맞춥니다.' },
      ],
      workflow: [
        { name: '조건에 맞는 가용 슬롯 보여 주기', description: '날짜·인원·담당자나 공간 조건에 맞는 시간대와 잔여석을 표시하고, 선택 불가능한 시간대는 이유를 구분해 안내합니다.' },
        { name: '확정 방식과 정원 차감 연결하기', description: '즉시 확정인지 운영자 승인 후 확정인지에 따라 잔여석 차감 시점과 예약 번호·일정 안내 발송 시점을 맞춥니다.' },
        { name: '예약 변경과 취소 기한 적용하기', description: '변경 시 기존 자리를 언제 반환하고 새 자리를 확정할지 정하며, 기한이 지난 경우 가능한 문의 경로와 정책을 안내합니다.' },
        { name: '방문 확인·노쇼·대기열 후속 처리하기', description: '이용 완료와 미방문을 기록하고, 취소나 노쇼로 발생한 빈자리의 복구 또는 대기자 전환 규칙을 실행합니다.' },
      ],
      pitfalls: [
        { name: '화면의 잔여석 표시만으로 중복 예약을 막으려 하기', description: '조회 시점에는 자리가 있었어도 저장 순간에는 마감될 수 있습니다. 실제 저장 단계에서 정원을 다시 검증하고 마감 시 안내를 제공하세요.' },
        { name: '예약 변경을 새 예약과 기존 취소로만 쪼개 처리하기', description: '새 시간대 확정에 실패했는데 기존 예약만 먼저 취소되면 사용자가 자리를 잃게 됩니다. 변경 확정과 기존 자리 반환을 한 흐름으로 다루세요.' },
        { name: '시간대 기준과 버퍼 시간을 누락하기', description: '연속 예약 사이의 정리·준비 시간이 없거나 시간대(Timezone) 표기가 모호하면 일정이 겹치고 지각·노쇼 판단이 어긋납니다.' },
      ],
      questions: [
        '예약 단위는 고정 시간 슬롯인가요, 사용자가 시작 시각과 이용 시간을 직접 고르나요? 슬롯 사이 준비 시간이 필요한가요?',
        '신청 즉시 확정되나요, 운영자 승인이나 선결제가 끝나야 확정되나요?',
        '한 시간대에 여러 명이나 여러 자원을 받을 때 잔여석 차감 기준과 동시 요청 처리 방식은 무엇인가요?',
        '예약 변경·취소 마감 시각은 언제이며, 마감 전후 취소·노쇼 시 어떤 제약이나 안내가 적용되나요?',
        '마감된 시간대에 대기 신청을 받나요? 빈자리가 나면 자동 확정하나요, 대기자에게 선택 기회를 주나요?',
        '참여자 시간대가 다를 수 있나요? 예약 충돌이나 저장 실패 시 어떤 상태와 대안 시간대를 보여 주나요?',
      ],
      example: '예시: 1:1 멘토링 예약에서 30분 슬롯과 10분 준비 시간을 두고, 신청 시 즉시 확정하되 시작 24시간 전까지만 직접 일정 변경을 허용하는 방식을 생각할 수 있습니다. 실제 승인 절차·대기열 운영·취소 기한은 서비스 운영 규칙에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'ly-time-grid-agenda', reason: '날짜별 예약 일정과 시간대 블록의 시작 시각·길이를 시간축 위에 표시하는 표현에 참고할 수 있습니다. 실제 가용 시간 계산이나 중복 예약 방지는 별도로 구현해야 합니다.' },
        { id: 'dismissible-inline-banner', reason: '예약 변경 마감 시각이나 시간대 기준 안내를 상단 배너로 알리는 표현에 참고할 수 있습니다. 실제 기한 검증과 예약 취소 처리는 구현하지 않습니다.' },
      ],
      promptSnippet: '예약·일정 서비스의 시간대 조회·확정·변경·취소 흐름을 설계해 줘. 먼저 슬롯 단위와 준비 시간, 정원·잔여석 계산 기준, 즉시 확정 여부, 변경·취소 마감 기한, 대기열과 노쇼 처리 정책을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 예약자와 운영자(제공자)가 볼 일정 정보와 가능한 행동.\n2. 예약 요청·대기·확정·변경·취소·이용 완료·노쇼 상태와 잔여석 변화.\n3. 동시 예약 요청, 변경 중 자리 보존, 취소 시 대기열 연결 방식.\n4. 마감 직전 요청·정원 초과·저장 실패 시 사용자에게 보일 결과와 실제 최종 상태.\n5. 날짜/시간 선택·예약 확인·내 예약 변경/취소·운영자 일정표 화면의 연결.\n화면의 빈 시간대 표시를 실제 자리 확보로 간주하지 말고, 예시 정책과 디자인 데모를 실제 예약 엔진이나 저장 기능으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Booking & Scheduling',
      title: 'Time slots, capacity, booking confirmation and rescheduling or cancellation rules',
      summary: 'Separate viewing open slots from confirmed bookings, and connect capacity, waitlists, rescheduling, cancellations and no-shows.',
      overview: 'Picking an open slot on a calendar is not the entire booking lifecycle. You need clear rules for capacity and concurrent requests, instant confirmation versus approval, rescheduling or cancellation cutoffs, and no-show handling to prevent double bookings. These concepts are design references, not default penalty or operating-hour policies for a specific business.',
      concepts: [
        { name: 'Available slots and capacity', description: 'Calculate bookable slots and remaining spots from operating hours, blackouts, buffer times and per-slot capacity or resource counts.' },
        { name: 'Booking state transitions', description: 'Distinguish requested, pending approval, confirmed, rescheduled, canceled, completed and no-show states. Decide whether submitting a request immediately secures a spot.' },
        { name: 'Concurrency and double-booking prevention', description: 'Define who gets the last spot when multiple users submit at once and whether checkout holds a temporary reservation.' },
        { name: 'Cutoffs for rescheduling, cancellation and waitlists', description: 'Set how close to start time users can self-reschedule or cancel, and whether freed spots auto-enroll waitlisted users or send invitations.' },
        { name: 'Timezones and schedule representation', description: 'For remote appointments or multi-region services, clarify whether times are shown and notified in the requester’s or provider’s timezone.' },
      ],
      workflow: [
        { name: 'Present eligible time slots', description: 'Show slots and remaining capacity matching date, party size and resource filters, and distinguish unavailable slots with clear reasons.' },
        { name: 'Connect confirmation rules to capacity deduction', description: 'Align when capacity is deducted and when confirmation details are sent based on instant confirmation versus manual approval.' },
        { name: 'Enforce rescheduling and cancellation windows', description: 'Keep the original spot until a rescheduled slot is confirmed, and explain available contact paths or policies after the cutoff.' },
        { name: 'Handle attendance, no-shows and freed capacity', description: 'Record completed visits and no-shows, and apply the agreed rule for returning canceled spots to general availability or the waitlist.' },
      ],
      pitfalls: [
        { name: 'Relying only on client-side slot display to prevent overbooking', description: 'A slot that looked open when loaded can fill before submission. Re-verify capacity atomically when saving and guide users when a slot just filled.' },
        { name: 'Treating rescheduling as canceling first and booking later', description: 'If the new slot fails after the original booking is canceled, the user loses both spots. Transition the booking atomically.' },
        { name: 'Omitting buffer time and timezone labels', description: 'Missing prep time between back-to-back bookings or ambiguous timezones leads to overlapping sessions and disputed no-shows.' },
      ],
      questions: [
        'Are bookings fixed time slots or custom start-and-duration ranges, and is buffer time required between sessions?',
        'Are bookings confirmed immediately on submission, or only after host approval or payment?',
        'How is capacity counted across people or resources, and how are simultaneous requests for the last spot resolved?',
        'What is the cutoff for self-service rescheduling or cancellation, and what rules apply after the cutoff or for no-shows?',
        'Is there a waitlist for full slots, and do freed spots auto-confirm or notify waitlisted users first?',
        'Can participants be in different timezones, and what status and fallback slots are shown when a conflict occurs?',
      ],
      example: 'Example: a 1:1 mentoring service could offer 30-minute slots with a 10-minute buffer, confirm immediately on request, and allow self-service rescheduling up to 24 hours before start time. Confirm actual approval steps, waitlist behavior and cancellation cutoffs before adopting this setup.',
      relatedDesigns: [
        { id: 'ly-time-grid-agenda', reason: 'A reference for positioning daily scheduled blocks along a time axis by start time and duration. Real availability calculation and conflict prevention need separate implementation.' },
        { id: 'dismissible-inline-banner', reason: 'A reference for surfacing cancellation cutoffs or timezone notices in an inline banner. It does not implement cutoff checks or booking cancellation.' },
      ],
      promptSnippet: 'Help design a booking and scheduling workflow. First confirm slot structure and buffers, capacity calculation, instant versus approved confirmation, rescheduling/cancellation cutoffs, waitlist rules and no-show handling. Do not assume undecided rules.\nBased on the answers, describe:\n1. Schedule information and actions available to requesters and hosts/operators.\n2. States for requested, pending, confirmed, rescheduled, canceled, completed and no-show bookings, and how capacity changes.\n3. Handling of concurrent requests, atomic rescheduling and waitlist promotion when spots open.\n4. User-visible outcomes and final states for past-cutoff requests, full slots and save failures.\n5. How slot selection, booking summary, reschedule/cancel flows and operator agenda views connect.\nDo not treat displaying an open slot as securing capacity, and do not mistake example policies or design demos for a real scheduling engine.',
    },
  },
  sources: [
    { title: 'Cal.com Docs — Event types, limits and buffer time', url: 'https://cal.com/docs/core-features/event-types/limits' },
    { title: 'Square Developer — Bookings API overview', url: 'https://developer.squareup.com/docs/bookings-api/what-it-is' },
  ],
}, {
  id: 'booking-resource-staff-and-room-conflict',
  aliases: {
    ko: ['담당자와 공간 동시 배정', '다중 자원 예약 충돌 방지', '담당자 자동 배정 라운드로빈', '장비 및 회의실 교차 예약', '자원별 준비 시간 분리'],
    en: ['multi-resource booking conflict', 'staff and room allocation', 'round-robin host assignment', 'equipment availability check', 'cross-resource scheduling'],
  },
  useCases: {
    ko: ['예약 1건에 담당자(강사·디자이너·상담사)와 공간(방)·장비가 동시에 필요할 때', '고객이 담당자를 직접 지정하는 방식과 빈 담당자를 자동 배정하는 방식을 함께 둘 때', '같은 담당자가 다른 방에 잡히거나 같은 방에 다른 일정이 겹치는 교차 충돌을 막을 때', '자원(담당자·방·장비)마다 서로 다른 근무 시간·점검 시간·정리 버퍼를 적용할 때'],
    en: ['Requiring a staff member, a physical room and shared equipment for a single booking', 'Supporting both customer-selected staff and automatic round-robin or pooled assignment', 'Preventing cross-booking conflicts when a staff member or room is shared across services', 'Applying distinct working hours, maintenance blackouts and cleanup buffers per resource'],
  },
  keywords: {
    ko: ['다중 자원 예약', '담당자 배정', '공간 배정', '장비 예약', '교차 중복 방지', '자동 배정', '지정 예약', '자원 충돌', '정리 시간'],
    en: ['resource allocation', 'staff assignment', 'room booking', 'equipment pool', 'conflict prevention', 'round-robin', 'pooled availability', 'buffer time', 'cross-booking'],
  },
  text: {
    ko: {
      domain: '예약·일정',
      title: '담당자·공간·장비 동시 배정과 교차 중복 방지',
      summary: '예약에 필요한 인력·공간·장비의 교집합 가용 시간을 계산하고, 지정 배정과 자동 배정 시 교차 충돌을 막습니다.',
      overview: '서비스에 따라 담당자만 시간이 비어 있다고 예약을 받을 수 없는 경우가 많습니다. 상담실이 모두 찼거나 필수 장비가 다른 예약에 배정되어 있으면 해당 시간대는 열리지 않아야 하며, 예약 확정 순간에는 관련된 모든 자원이 함께 잠겨야 교차 중복이 생기지 않습니다. 아래 내용은 다중 자원 예약 설계를 위한 참고이며 특정 업종의 배정 우선순위를 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '필수 자원 조합(교집합 가용성)', description: '예약 1건이 성립하기 위해 동시에 확보되어야 하는 담당자 1명 + 공간 1곳 + 장비 N개 같은 자원 조건을 정의하고, 모든 조건이 충족되는 시간대만 가용 슬롯으로 계산합니다.' },
        { name: '담당자 직접 지정과 자동 배정(Pooled)', description: '예약자가 특정 담당자를 고르는 지정 예약과, 가능한 담당자 풀(Pool) 중 순서·비율·우선순위에 따라 자동 배정하는 방식을 구분합니다.' },
        { name: '원자적 다중 자원 선점과 교차 충돌 방지', description: '한 담당자가 여러 서비스를 담당하거나 한 공간을 여러 팀이 공유할 때, 저장 시점에 모든 연결 자원을 한 묶음으로 검증·차감해 부분 배정을 막습니다.' },
        { name: '자원별 개별 스케줄과 정비 시간', description: '담당자 휴게 시간, 공간 청소·환기 시간, 장비 점검 시간처럼 자원마다 다른 불가 시간과 앞뒤 준비 시간을 각각 반영합니다.' },
      ],
      workflow: [
        { name: '서비스와 지정 조건에 맞는 교집합 시간대 조회하기', description: '선택한 서비스에 필요한 공간·장비 재고와 담당자(지정 또는 전체 풀)의 가용 시간이 모두 겹치는 슬롯만 표시합니다.' },
        { name: '확정 시 필요한 모든 자원을 한 번에 배정하기', description: '예약 저장 시 담당자, 방, 장비를 함께 잠그고, 하나라도 직전에 마감되었으면 전체 예약을 실패로 돌려 부분 점유를 남기지 않습니다.' },
        { name: '담당자 휴무·장비 고장 시 재배정 또는 안내하기', description: '확정 후 특정 담당자나 방을 쓸 수 없게 되면 동일 시간대의 대체 자원으로 교체할지 예약자에게 일정 변경을 요청할지 처리합니다.' },
        { name: '일정 변경·취소 시 연결된 자원 일괄 반환하기', description: '예약이 취소되거나 다른 시간대로 옮겨지면 기존에 묶여 있던 담당자·공간·장비 슬롯을 모두 누락 없이 해제합니다.' },
      ],
      pitfalls: [
        { name: '담당자 일정만 보고 예약을 받은 뒤 방이나 장비가 없어 취소하기', description: '담당자 캘린더와 공간·장비 재고를 따로 관리하면 담당자는 비어 있는데 방이 없는 초과 예약이 발생합니다. 조회와 저장 모두 교집합으로 검증하세요.' },
        { name: '자동 배정에서 예약자에게 처음부터 담당자 선택을 강제하기', description: '누구에게 받아도 상관없는 예약자에게 모든 담당자 시간표를 하나씩 눌러 보게 하면 이탈이 늘어납니다. "빠른 배정(아무나)" 옵션을 함께 고려하세요.' },
        { name: '예약 취소 시 담당자 일정만 비우고 공간·장비 점유를 남겨 두기', description: '연결된 자원 중 일부만 반환되면 실제론 비어 있는 방이나 장비가 계속 마감 상태로 남습니다.' },
      ],
      questions: [
        '예약 1건에 담당자·공간(방)·장비 중 어떤 자원들이 동시에 확보되어야 하나요?',
        '예약자가 담당자나 공간을 직접 고를 수 있나요, 아니면 가능한 자원 중 자동 배정(라운드로빈·우선순위)하나요?',
        '한 담당자나 한 공간이 여러 종류의 예약 상품에 공유될 때 교차 중복과 준비 시간은 어떻게 계산하나요?',
        '확정된 예약의 담당자가 휴무가 되거나 방·장비에 문제가 생기면 대체 자원으로만 교체하나요, 고객 확인을 거치나요?',
        '예약 화면에서 고객에게 배정된 공간·담당자 이름을 즉시 공개하나요, 방문 전날이나 확정 후에 안내하나요?',
      ],
      example: '예시: 스튜디오 촬영 예약에서 사진작가 1명, 촬영실 1곳, 조명 세트 1개가 모두 비어 있는 시간대만 열어 주고, 고객이 작가를 지정하지 않으면 가능한 작가 중 당일 배정 건수가 적은 순으로 자동 배정하며 촬영실은 종료 후 15분 정리 시간을 따로 두도록 구성할 수 있습니다. 이는 참고 예시이며 실제 자원 배정 규칙은 별도로 확정해야 합니다.',
      relatedDesigns: [
        { id: 'ly-time-grid-agenda', reason: '담당자별·공간별 시간표 블록과 겹치는 일정을 시간축 위에서 비교하는 표현에 참고할 수 있습니다. 실제 다중 자원 교집합 계산과 충돌 방지는 별도로 구현해야 합니다.' },
        { id: 'faceted-filter-chips', reason: '담당자·공간 유형·장비 조건을 칩으로 좁혀 가용 시간대를 조회하는 표현에 참고할 수 있습니다. 실제 자원 배정 로직은 포함하지 않습니다.' },
      ],
      promptSnippet: '예약·일정 서비스의 담당자·공간·장비 동시 배정 및 교차 중복 방지 흐름을 설계해 줘. 먼저 예약 1건에 필요한 필수/선택 자원 조합, 고객 직접 지정 vs 자동 배정(풀·라운드로빈) 방식, 자원별 근무/정비/준비 시간 차이, 확정 후 자원 불가 시 대체 배정 정책을 질문하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 인력·공간·장비 자원의 데이터 구조와 교집합 가용 시간 계산 기준.\n2. 직접 지정과 자동 배정 시 선택 가능한 슬롯 표시 및 최종 배정 자원 결정 규칙.\n3. 동시 요청 시 다중 자원의 원자적 선점·확정과 취소/변경 시 일괄 반환 방식.\n4. 확정 후 담당자 부재나 공간·장비 문제 발생 시 재배정 또는 고객 안내 절차.\n5. 자원 조건 선택기·통합 가용 시간표·운영자 자원별 배정 현황 화면과 디자인 선택 이유.\n담당자 일정만으로 가용 여부를 단정하지 말고, 디자인 데모와 실제 다중 자원 스케줄링 엔진을 구분해 줘.',
    },
    en: {
      domain: 'Booking & Scheduling',
      title: 'Multi-resource staff, room and equipment allocation without conflicts',
      summary: 'Calculate intersection availability across staff, rooms and equipment, and lock all required resources atomically.',
      overview: 'Many appointments require more than an open staff calendar: a session may simultaneously need one qualified host, one available room and specific shared equipment. If availability checks or database writes evaluate only the host and ignore shared rooms or gear, cross-service double bookings are inevitable. The concepts below are design references, not default allocation rules.',
      concepts: [
        { name: 'Composite resource requirements (intersection availability)', description: 'Define which combination of staff, rooms and equipment pools must be free at the same time for a slot to be bookable.' },
        { name: 'Named selection versus pooled auto-assignment', description: 'Distinguish bookings where the customer picks a specific staff member from pooled bookings that assign an available host by round-robin, load balance or priority.' },
        { name: 'Atomic multi-resource locking and cross-service conflict checks', description: 'Verify and reserve all required resources in a single transaction so a room or staff member shared across multiple event types cannot be double-booked.' },
        { name: 'Per-resource schedules, blackouts and turnaround buffers', description: 'Account for different shift hours, room turnover cleanup times and equipment maintenance windows on each resource independently.' },
      ],
      workflow: [
        { name: 'Compute eligible slots across all required resources', description: 'Show only time slots where at least one eligible staff member, required room and equipment unit are simultaneously free.' },
        { name: 'Lock assigned resources atomically on confirmation', description: 'Bind the selected or auto-assigned staff, room and equipment together on save, rolling back the whole attempt if any resource was just taken.' },
        { name: 'Handle post-booking resource unavailability', description: 'When an assigned host calls out or a room closes for maintenance, apply clear rules for swapping an equivalent resource versus asking the customer to reschedule.' },
        { name: 'Release all linked resources on reschedule or cancel', description: 'Ensure canceling or moving a booking frees every attached staff, room and equipment reservation together.' },
      ],
      pitfalls: [
        { name: 'Checking staff calendars while ignoring room or equipment caps', description: 'Five available staff members cannot run five parallel sessions if the venue only has three rooms. Intersect all resource pools before showing open slots.' },
        { name: 'Forcing customers to click through every staff member when they have no preference', description: 'Offer an "Any available" option that merges pooled availability instead of making users inspect each host calendar one by one.' },
        { name: 'Releasing the host slot on cancellation while leaving the room or equipment locked', description: 'Partial cleanup leaves phantom room blocks that silently reduce capacity.' },
      ],
      questions: [
        'Which combination of staff, rooms or equipment units must be reserved together for a single booking?',
        'Can customers request a specific staff member or room, choose "any available", or both, and how does auto-assignment pick among available resources?',
        'Are staff members, rooms or equipment shared across multiple booking types, and do they have different buffer or cleanup times?',
        'If an assigned staff member or room becomes unavailable after confirmation, can an operator swap the resource silently or must the customer reconfirm?',
        'Which assigned resource details (host name, room number) are shown to the customer at booking time versus before arrival?',
      ],
      example: 'Example: a studio booking could require 1 photographer, 1 shooting room and 1 lighting kit, let customers either pick a named photographer or select "Any available" (assigned to the eligible photographer with the fewest bookings that day), apply a 15-minute room cleanup buffer, and release all three resources together on cancellation. This is a reference example, not an established policy.',
      relatedDesigns: [
        { id: 'ly-time-grid-agenda', reason: 'A reference for inspecting scheduled blocks across staff or room columns on a time grid. Real multi-resource intersection and conflict locking need separate implementation.' },
        { id: 'faceted-filter-chips', reason: 'A reference for filtering slots by preferred staff, room type or equipment options. Real resource allocation is not included.' },
      ],
      promptSnippet: 'Help design a multi-resource booking workflow covering staff, rooms and equipment without conflicts. First ask about required resource combinations per booking, named selection versus pooled/round-robin assignment, per-resource working hours and cleanup buffers, and resource swap rules when an assigned resource becomes unavailable. Do not assume undecided rules.\nBased on the answers, describe:\n1. Resource data model and intersection availability calculation across staff, rooms and equipment.\n2. Slot display and assignment rules for named preferences versus pooled auto-assignment.\n3. Atomic locking on confirmation and complete release across all linked resources on reschedule or cancel.\n4. Operator reassignment versus customer reconfirmation when a staff member or room becomes unavailable.\n5. Resource filter controls, customer slot picker and operator multi-resource schedule views with reasons for the design choices.\nDo not check staff calendars in isolation when rooms or equipment are constrained, and distinguish design demos from a real multi-resource scheduling engine.',
    },
  },
  sources: [
    { title: 'Cal.com Docs — Round-robin and collective team scheduling', url: 'https://cal.com/docs/core-features/teams/round-robin-scheduling' },
    { title: 'Microsoft Learn — Microsoft Bookings service and staff scheduling', url: 'https://learn.microsoft.com/en-us/microsoft-365/bookings/bookings-overview' },
  ],
}, {
  id: 'booking-recurring-schedule-and-exception',
  aliases: {
    ko: ['정기 반복 예약 생성', '공휴일 휴무 예외 처리', '이번 회차만 변경과 이후 전체 변경', '반복 일정 일부 충돌 해결', '다회차 정기권 예약'],
    en: ['recurring booking series', 'holiday blackout exceptions', 'edit single instance vs series', 'partial series conflict resolution', 'repeating appointment schedule'],
  },
  useCases: {
    ko: ['매주·격주·매월 같은 요일과 시간으로 반복 예약을 생성할 때', '반복 기간 중 공휴일·휴무일이나 이미 마감된 회차가 섞여 있을 때', '특정 1회차만 시간을 바꾸거나 취소하는 것과 이후 전체 회차를 바꾸는 것을 구분할 때', '월말 일자(31일)나 일광절약시간(DST) 경계에서 반복 시각을 유지할 때'],
    en: ['Creating weekly, biweekly or monthly repeating bookings', 'Handling holidays, blackouts or already-full dates inside a requested series', 'Distinguishing edits or cancellations to a single occurrence from changes to all future occurrences', 'Preserving local wall-clock time across month-end dates or daylight saving transitions'],
  },
  keywords: {
    ko: ['반복 예약', '정기 일정', '회차별 예외', '공휴일 제외', '단일 회차 수정', '이후 일정 전체 변경', '반복 종료 조건', '일부 회차 충돌'],
    en: ['recurring schedule', 'repeating booking', 'series exception', 'holiday skip', 'this occurrence only', 'this and following', 'series end condition', 'partial conflict'],
  },
  text: {
    ko: {
      domain: '예약·일정',
      title: '반복 일정 생성·휴무일 제외와 단일 회차/전체 수정 범위',
      summary: '반복 규칙과 종료 조건으로 회차를 전개하고, 일부 회차 충돌 처리와 단일 회차·이후 전체 수정 범위를 연결합니다.',
      overview: '매주 같은 시간에 진행하는 수업이나 정기 상담은 1회성 예약과 달리 중간에 공휴일이 끼거나 특정 날짜만 이미 마감되어 있을 수 있습니다. 또한 시작 후 한 회차만 날짜를 옮기는 것인지 앞으로 남은 모든 회차의 요일·시간을 바꾸는 것인지 구분하지 않으면 기존 출석 기록이나 다른 날짜의 예약까지 엉키게 됩니다. 아래 내용은 반복 일정 설계를 위한 참고이며 특정 서비스의 회차 차감 정책을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '반복 주기 규칙과 종료 조건', description: '매주·격주·매월 같은 반복 주기와 총 회차 수(예: 8회) 또는 종료 일자 중 무엇으로 반복 범위를 끝낼지 정의합니다.' },
        { name: '회차 전개 시 휴무일·충돌 회차 처리', description: '생성하려는 회차 중 휴무일이나 정원 마감 날짜가 있을 때 전체 생성을 막을지, 해당 날짜만 건너뛰고 종료일을 한 주 미룰지, 대체 시간을 고르게 할지 정합니다.' },
        { name: '단일 회차 예외(This instance)와 이후 전체 변경(This and following)', description: '특정 회차 하나만 변경·취소하는 예외 처리와, 선택한 회차부터 이후 남은 일정 전체의 시간·담당자를 바꾸는 처리를 분리합니다.' },
        { name: '과거 완료 회차 보존과 잔여 회차 정산', description: '반복 일정을 중도 해지하거나 앞으로의 규칙을 수정할 때 이미 진행 완료된 과거 회차 기록과 결제·횟수권 차감 내역은 건드리지 않고 보존합니다.' },
      ],
      workflow: [
        { name: '반복 조건 입력 후 전체 회차 미리보기 제시하기', description: '확정 전에 생성될 모든 회차 날짜 목록과 휴무일·충돌 여부를 한눈에 보여 주고 충돌 회차 처리 방식을 확인받습니다.' },
        { name: '합의된 규칙으로 회차별 예약 확정하기', description: '정상 회차와 건너뛴 회차, 대체 시간 회차를 구분해 저장하고 총 확정 회차 수를 명확히 안내합니다.' },
        { name: '변경·취소 시 적용 범위(이번 회차만 / 이후 전체) 선택받기', description: '사용자가 특정 일정을 수정하거나 취소할 때 해당 1회차에만 적용할지 이후 미진행 회차 전체에 적용할지 먼저 묻습니다.' },
        { name: '단일 예외 또는 이후 회차 재전개 반영하기', description: '단일 회차 변경은 해당 회차만 예외로 분리하고, 이후 전체 변경은 과거 완료 회차를 남긴 채 미래 회차만 새 시간대로 다시 검증·배정합니다.' },
      ],
      pitfalls: [
        { name: '전체 회차 중 하루만 마감되어도 이유 없이 생성 전체를 실패 처리하기', description: '12주 예약 중 공휴일 하루 때문에 아무 설명 없이 실패만 띄우면 사용자가 원인을 알 수 없습니다. 어느 날짜가 충돌하는지 보여 주고 건너뛰기나 대체 선택을 안내하세요.' },
        { name: '반복 규칙을 수정할 때 이미 끝난 과거 회차 시간까지 함께 덮어쓰기', description: '다음 달부터 시간을 바꿨는데 지난달 완료된 예약 기록의 시각과 담당자까지 바뀌면 정산과 이력이 무너집니다.' },
        { name: '무기한 반복을 한 번에 수천 개 행으로 만들어 두거나 아예 정원을 안 잡기', description: '반복 예약이 실제 정원을 점유하는 최대 선점 범위(예: 최대 12회 또는 3개월)를 명확히 정해 정원 계산과 저장 방식을 맞추세요.' },
      ],
      questions: [
        '반복 주기는 매주·격주·매월 중 무엇을 지원하며, 최대 몇 회차 또는 몇 개월 앞까지 한 번에 예약할 수 있나요?',
        '반복 기간 중 공휴일이나 이미 마감된 시간대가 겹치면 해당 날짜만 건너뛰고 회차를 뒤로 미루나요, 대체 시간대를 고르게 하나요?',
        '예약 변경·취소 시 "이번 회차만"과 "이번 및 이후 전체 회차" 선택을 모두 허용하나요?',
        '다회차 패키지나 정기권과 연결된 경우 특정 회차 취소·노쇼 시 잔여 횟수와 만료일은 어떻게 조정되나요?',
        '이후 전체 회차의 시간이나 담당자를 바꿀 때 새로 옮기는 시간대에 또 일부 충돌이 있으면 어떻게 안내하나요?',
      ],
      example: '예시: 주 1회 총 8회 정기 예약 신청 시 공휴일과 겹치는 주는 자동으로 건너뛰어 9주에 걸쳐 8회차를 미리보기로 보여 주고, 이용 중 변경 시에는 "이번 회차만 변경"과 "이후 남은 회차 전체 변경"을 구분해 선택받으며 이미 완료된 회차 기록은 그대로 유지하도록 구성할 수 있습니다. 이는 참고 예시이며 실제 반복·정산 규칙은 별도로 확정해야 합니다.',
      relatedDesigns: [
        { id: 'native-date-field', reason: '반복 시작일과 종료일 또는 예외 날짜를 선택하고 유효 범위 밖 날짜를 제한하는 입력 표현에 참고할 수 있습니다. 실제 반복 회차 전개와 충돌 계산은 별도로 구현해야 합니다.' },
        { id: 'ly-expandable-data-rows', reason: '정기 예약 요약 행 아래로 개별 회차 날짜·상태(정상·휴무 건너뜀·변경됨)·담당자를 펼쳐 확인하는 표현에 참고할 수 있습니다. 실제 회차 수정 처리는 포함하지 않습니다.' },
      ],
      promptSnippet: '예약·일정 서비스의 반복 일정 생성·휴무일 제외 및 단일 회차/전체 수정 흐름을 설계해 줘. 먼저 허용 반복 주기와 최대 회차/기간 제한, 중간 휴무일·마감 슬롯 발생 시 처리(건너뛰기·회차 연장·대체 시간 선택), 변경·취소 시 적용 범위(이번 회차만 vs 이후 전체), 과거 완료 회차 보존과 다회차 정산 규칙을 질문하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 반복 시리즈와 개별 회차(Instance)의 데이터 구조 및 상태 구분.\n2. 예약 생성 전 전체 회차 미리보기와 휴무일·정원 충돌 회차 해결 방식.\n3. "이번 회차만" 변경·취소와 "이번 및 이후 전체" 변경·취소 시 과거 완료 회차 보존 및 미래 회차 재검증 규칙.\n4. 이후 전체 변경 중 일부 날짜만 다시 충돌할 때의 사용자 안내와 선택지.\n5. 반복 주기 설정·회차별 충돌 미리보기·수정 범위 선택 모달 화면과 디자인 선택 이유.\n과거 완료 회차를 덮어쓰거나 충돌 날짜 안내 없이 전체 실패만 띄우지 말고, 디자인 데모와 실제 반복 스케줄링 엔진을 구분해 줘.',
    },
    en: {
      domain: 'Booking & Scheduling',
      title: 'Recurring schedules, holiday exceptions and single-versus-series edits',
      summary: 'Expand repeating booking rules with holiday/conflict previews, and separate single-occurrence exceptions from future-series updates.',
      overview: 'Unlike a one-off appointment, a weekly or monthly recurring booking often crosses public holidays, host vacations or a single date that is already full. Once a series is active, the workflow must also separate moving or canceling just one occurrence from updating all remaining future occurrences without rewriting already completed past sessions. The concepts below are design references, not default package or billing policies.',
      concepts: [
        { name: 'Recurrence pattern, horizon cap and end condition', description: 'Define supported frequencies (weekly, biweekly, monthly) and whether a series ends after a fixed occurrence count or an end date within a maximum booking horizon.' },
        { name: 'Holiday blackouts and partial-conflict resolution', description: 'When one date in a requested series lands on a holiday or full slot, decide whether to skip that date and extend the series end date, prompt for an alternate slot on that week, or block submission.' },
        { name: 'Single-instance exception versus "this and following" updates', description: 'Separate detaching or rescheduling a single occurrence from splitting the series to move or cancel all upcoming occurrences.' },
        { name: 'Preservation of completed past occurrences', description: 'Keep historical attended, canceled or no-show occurrences immutable when future recurrence times or assigned hosts are edited.' },
      ],
      workflow: [
        { name: 'Preview expanded occurrences and highlight conflicts before saving', description: 'List all generated dates upfront, marking any holiday skips or capacity conflicts so the user can resolve or confirm them before booking.' },
        { name: 'Confirm series instances within the booking horizon', description: 'Create the concrete occurrence reservations and clearly state which dates were booked, skipped or shifted.' },
        { name: 'Prompt for edit scope (this occurrence versus future series)', description: 'When a user reschedules or cancels from an occurrence, ask explicitly whether the change applies only to that date or to that date and all following occurrences.' },
        { name: 'Apply single exceptions or re-validate future occurrences', description: 'Update only the target instance for single edits, or leave past instances intact while re-checking capacity and moving remaining future instances.' },
      ],
      pitfalls: [
        { name: 'Failing the entire recurring request without showing which date conflicted', description: 'Rejecting a 10-week booking with a generic error because week 4 is a holiday leaves users guessing. Highlight the exact conflicting occurrence and offer skip or alternate-slot options.' },
        { name: 'Mutating completed past occurrences when editing a series rule', description: 'Changing next month’s recurring time must never overwrite timestamps or host records on sessions that already took place last month.' },
        { name: 'Leaving recurrence horizons unbounded against real capacity', description: 'Define a clear maximum number of occurrences or months reserved at once so capacity accounting stays bounded and predictable.' },
      ],
      questions: [
        'Which recurrence frequencies are supported, and what is the maximum number of occurrences or months that can be booked at once?',
        'When a requested occurrence hits a holiday or full slot, is that date skipped (extending the series), replaced with an alternate slot, or blocked?',
        'When rescheduling or canceling, can users choose between "this occurrence only" and "this and all following occurrences"?',
        'If the series draws from a multi-session pass or package, how do skipped holidays, single cancellations or no-shows affect remaining session credits?',
        'When moving "this and following" occurrences to a new time, how are partial conflicts on the new time handled?',
      ],
      example: 'Example: a weekly 8-session booking could preview all 8 dates, automatically skip a public holiday to span 9 calendar weeks, prompt on edits whether to change "only this session" or "this and remaining sessions", and keep already attended past sessions locked. This is a reference example, not an established policy.',
      relatedDesigns: [
        { id: 'native-date-field', reason: 'A reference for picking series start/end dates or alternate exception dates within allowed bounds. Real recurrence expansion and conflict detection need separate implementation.' },
        { id: 'ly-expandable-data-rows', reason: 'A reference for expanding a recurring series summary row to inspect individual occurrence dates and statuses. Real series editing logic is not included.' },
      ],
      promptSnippet: 'Help design a recurring booking schedule, holiday exception and single-versus-series edit workflow. First ask about supported recurrence frequencies and horizon caps, handling of holidays or full slots inside a series (skip and extend, pick alternate slot, or block), edit/cancel scope (this occurrence only vs this and following), and preservation of past sessions or package credits. Do not assume undecided rules.\nBased on the answers, describe:\n1. Data relationship between the parent recurrence series and individual occurrence records.\n2. Pre-confirmation preview of generated occurrences and resolution paths for holidays or capacity conflicts.\n3. Rules for single-occurrence exceptions versus splitting/updating future occurrences while keeping completed past occurrences immutable.\n4. Handling of new partial conflicts when rescheduling all future occurrences.\n5. Recurrence setup controls, occurrence conflict preview and edit-scope confirmation UI with reasons for the design choices.\nDo not overwrite past completed occurrences when editing a series, and distinguish design demos from a real recurring scheduling engine.',
    },
  },
  sources: [
    { title: 'Cal.com Docs — Recurring bookings', url: 'https://cal.com/docs/core-features/event-types/recurring-events' },
    { title: 'RFC 5545 — Internet Calendaring and Scheduling Core Object Specification (iCalendar RRULE)', url: 'https://datatracker.ietf.org/doc/html/rfc5545#section-3.8.5' },
  ],
}, {
  id: 'booking-deposit-prepayment-and-penalty',
  aliases: {
    ko: ['예약금 보증금 선결제', '취소 시점별 위약금 정산', '노쇼 페널티 차감 환불', '운영자 사유 취소 전액 환불', '인원 감소 부분 위약금'],
    en: ['booking deposit prepayment', 'tiered cancellation penalty', 'no-show fee deduction', 'host-initiated full refund', 'headcount reduction fee'],
  },
  useCases: {
    ko: ['예약 신청 후 일정 시간 내 예약금이나 전액 선결제를 완료해야 자리를 확정할 때', '이용 시작까지 남은 시간(7일 전·하루 전·당일·노쇼)에 따라 취소 수수료율을 차등 적용할 때', '예약자 귀책 취소와 매장·운영자 사유 취소를 구분해 위약금 면제 여부를 정할 때', '일정 변경 시 기존 예약금을 승계하거나 인원 축소 시 부분 위약금을 정산할 때'],
    en: ['Holding a provisional slot briefly until a booking deposit or prepayment succeeds', 'Applying tiered cancellation fees based on how close the cancellation is to start time', 'Separating customer-initiated cancellations from host/venue cancellations that waive fees', 'Carrying deposits across reschedules or settling partial penalties when party size drops'],
  },
  keywords: {
    ko: ['예약금', '보증금', '선결제', '위약금', '취소 수수료', '환불 규정', '노쇼 차감', '결제 대기 만료', '귀책 사유'],
    en: ['booking deposit', 'prepayment', 'cancellation fee', 'penalty tier', 'refund policy', 'no-show charge', 'payment hold expiry', 'fee waiver', 'reschedule carryover'],
  },
  text: {
    ko: {
      domain: '예약·일정',
      title: '예약금·보증금 선결제와 취소 시점별 위약금 정산',
      summary: '선결제 완료로 예약을 확정하고, 취소·노쇼 시점과 귀책 사유에 따른 위약금 차감·환불을 연결합니다.',
      overview: '노쇼와 임박 취소를 줄이기 위해 예약금(보증금)이나 선결제를 받는 서비스에서는 결제 대기 중인 임시 선점 상태와 결제 완료 확정 상태를 명확히 나눠야 합니다. 또한 취소 요청 시각이 이용 시작 몇 시간 전인지, 예약자 사정인지 제공자 사정인지에 따라 환불 금액이 달라지므로 취소 버튼을 누르기 전에 예상 위약금과 실환불액을 투명하게 계산해 보여 주어야 분쟁을 줄일 수 있습니다. 아래 내용은 예약금·위약금 설계를 위한 참고이며 특정 업종의 환불 기준을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '임시 자리 선점과 결제 대기 만료(Hold Expiry)', description: '결제창에 들어간 동안 다른 사람이 같은 자리를 뺏지 못하도록 짧게 선점하되, 정해진 시간 안에 결제가 끝나지 않으면 선점을 자동 해제합니다.' },
        { name: '예약금·전액 선결제와 현장 잔금 구분', description: '정액 예약금, 이용료의 일정 비율(%), 전액 선결제 중 무엇을 받는지 정의하고, 예약금만 결제한 경우 현장에서 치를 잔여 금액을 구분해 기록합니다.' },
        { name: '시점별 위약금 구간(Tiered Cutoff)과 노쇼 정산', description: '이용 시작 시점으로부터 남은 기간·시간 구간별 환불 비율(예: 100% 환불 → 50% 차감 → 환불 불가)을 예약 시점의 규정 스냅샷으로 고정합니다.' },
        { name: '제공자 귀책·천재지변 면제와 일정 변경 승계', description: '운영자 측 취소나 약정된 면제 사유일 때는 시점과 무관하게 위약금 없이 100% 환불하고, 허용 기한 내 일정 변경 시 기존 예약금을 새 일정으로 이어받습니다.' },
      ],
      workflow: [
        { name: '결제 전 위약금 규정 확인과 임시 선점 시작하기', description: '예약금 금액, 결제 제한 시간, 시점별 취소·노쇼 환불 규정을 명확히 제시하고 동의 후 결제를 진행합니다.' },
        { name: '결제 성공 시 확정, 시간 초과·실패 시 선점 해제하기', description: '결제 승인 확인 후에만 예약을 확정으로 바꾸고, 미결제 만료 시 자리를 즉시 가용 정원으로 되돌립니다.' },
        { name: '취소·변경 요청 시점에 맞는 정산 미리보기 제공하기', description: '취소 실행 전에 현재 시각 기준 적용 구간, 차감되는 위약금, 최종 환불 예정 금액을 계산해 확인받습니다.' },
        { name: '귀책 구분에 따른 환불 실행 또는 예약금 승계하기', description: '예약자 취소는 구간별 차감 환불을, 운영자 취소는 전액 환불을 실행하며, 허용된 일정 변경은 추가 결제 없이 예약금을 승계합니다.' },
      ],
      pitfalls: [
        { name: '결제창을 열어 둔 채 이탈한 건이 자리를 계속 막고 있기', description: '임시 선점에 만료 시간(예: 10분)이 없으면 결제하지 않은 시도가 인기 시간대를 모두 잠가 버립니다.' },
        { name: '취소 확인 화면에서 위약금 액수를 안 보여 주고 취소부터 완료하기', description: '얼마가 공제되는지 모른 채 취소를 눌렀다가 예상보다 적은 금액이 환불되면 즉시 민원으로 이어집니다. 취소 확정 전 계산 결과를 먼저 보여 주세요.' },
        { name: '나중에 바뀐 환불 규정을 이미 결제된 기존 예약에 소급 적용하기', description: '운영자가 오늘 위약금 비율을 올렸더라도 이미 어제 완료된 예약은 결제 당시 동의한 규정 스냅샷을 기준으로 정산해야 합니다.' },
      ],
      questions: [
        '예약 시 전액 선결제, 정액 예약금, 비율(%) 예약금 중 무엇을 받으며, 결제 대기 선점 시간은 몇 분인가요?',
        '이용 시작 전 시점별 취소 수수료 구간과 노쇼(미방문) 시 차감 비율은 어떻게 나뉘나요?',
        '허용 기한 안에 일정을 변경하면 기존 예약금이 그대로 승계되나요, 차액이 생기면 어떻게 정산하나요?',
        '예약 인원을 줄이는 부분 취소(예: 6명 → 4명) 시 줄어든 인원분에 대해서도 시점별 위약금을 적용하나요?',
        '매장·담당자 사정으로 취소하거나 운영자가 예외 면제를 승인할 때는 시점과 관계없이 전액 환불되나요?',
      ],
      example: '예시: 예약 신청 시 10분간 자리를 임시 선점해 1인당 예약금 결제를 받고, 이용 48시간 전까지는 100% 환불 및 1회 무료 일정 변경으로 예약금 승계를 허용하며, 24시간 이내 취소는 50% 차감, 운영자 사유 취소는 시점 무관 100% 환불하도록 구성할 수 있습니다. 이는 참고 예시이며 실제 금액과 위약금 규정은 별도로 확정해야 합니다.',
      relatedDesigns: [
        { id: 'inline-delete-confirmation', reason: '예약 취소 확정 전에 현재 시점 기준 차감 위약금과 실제 환불 예정액을 확인받는 표현에 참고할 수 있습니다. 실제 위약금 계산과 결제 취소는 별도로 구현해야 합니다.' },
        { id: 'ly-transposable-comparison-matrix', reason: '취소 시점 구간(예: 7일 전·1일 전·당일·노쇼)별 환불 비율과 일정 변경 가능 여부를 표로 안내하는 표현에 참고할 수 있습니다. 실제 정산 로직은 포함하지 않습니다.' },
      ],
      promptSnippet: '예약·일정 서비스의 예약금·보증금 선결제 및 취소 시점별 위약금 정산 흐름을 설계해 줘. 먼저 선결제 방식(정액·비율·전액)과 결제 대기 선점 만료 시간, 이용 시작 전 구간별 취소 수수료 및 노쇼 차감 기준, 일정 변경 시 예약금 승계 조건, 인원 감소 부분 취소 및 운영자 귀책 면제 규칙을 질문하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 임시 선점(결제 대기)·결제 완료(예약 확정)·미결제 만료·취소/노쇼 정산 완료 상태와 자리 반환 시점.\n2. 예약 당시 동의한 위약금 규정 스냅샷 보존과 취소 요청 시각 기준 환불액 계산식.\n3. 허용 기한 내 일정 변경 시 예약금 승계 또는 차액 정산 방식.\n4. 고객 귀책 취소 vs 운영자 귀책(면제) 취소 및 결제 취소 지연/실패 시 처리.\n5. 결제 전 규정 안내·취소 위약금 미리보기 확인·정산 상세 내역 화면과 디자인 선택 이유.\n예약 시점 규정을 사후 변경으로 덮어쓰지 말고, 디자인 데모와 실제 결제·위약금 정산 시스템을 구분해 줘.',
    },
    en: {
      domain: 'Booking & Scheduling',
      title: 'Booking deposits, prepayments and cutoff-based cancellation fees',
      summary: 'Connect temporary payment holds and deposit collection with tiered cancellation cutoffs, no-show fees and host-fault waivers.',
      overview: 'Services that collect a booking deposit or full prepayment to reduce no-shows must separate temporary checkout holds from paid confirmed bookings. When a cancellation or no-show occurs, the refund depends on how close the request is to the start time and whether the customer or the host initiated it, so the interface must preview the exact penalty and net refund before confirmation. The concepts below are design references, not default fee schedules.',
      concepts: [
        { name: 'Provisional payment hold and expiration timer', description: 'Hold capacity briefly while the requester completes payment, and release the slot automatically if payment does not succeed before the hold timer expires.' },
        { name: 'Deposit versus full prepayment and balance due', description: 'Distinguish flat deposits, percentage deposits and full prepayments, recording both the amount paid online and any remaining balance due on arrival.' },
        { name: 'Tiered cancellation cutoffs and policy snapshots', description: 'Snapshot the agreed cancellation fee schedule (such as 100% refund before 48h, 50% before 24h, non-refundable on no-show) on the booking record at purchase time.' },
        { name: 'Host-fault waivers and reschedule deposit carryover', description: 'Waive penalties for host-initiated cancellations or approved exceptions, and define when rescheduling carries the existing deposit over to the new slot.' },
      ],
      workflow: [
        { name: 'Present fee tiers and start a bounded payment hold', description: 'Show the deposit amount, hold countdown and cutoff-based refund schedule clearly before taking payment.' },
        { name: 'Confirm on payment or release capacity on timeout', description: 'Transition the booking to confirmed only when payment is captured, or expire the hold and restore capacity if payment fails or times out.' },
        { name: 'Preview penalty deduction and net refund before canceling', description: 'Calculate which cutoff window applies at the moment of the request and show the exact fee deducted and net refund before the user confirms cancellation.' },
        { name: 'Execute net refunds, full waivers or reschedule carryovers', description: 'Process partial refunds for late customer cancellations, full refunds for host cancellations, or deposit carryovers when rescheduling within the allowed window.' },
      ],
      pitfalls: [
        { name: 'Holding unpaid slots indefinitely when users abandon checkout', description: 'Without a strict payment-hold expiration timer, abandoned checkouts lock up peak time slots.' },
        { name: 'Executing a cancellation before showing the penalty deduction', description: 'Surprising users with a 50% deduction only after the booking is already canceled causes disputes. Always show the calculated breakdown in the confirmation step.' },
        { name: 'Evaluating refunds against edited store settings instead of the booking’s snapshot policy', description: 'If an operator tightens cancellation rules today, existing bookings paid under yesterday’s terms must still settle against the policy snapshot they agreed to.' },
      ],
      questions: [
        'Does the service collect a flat deposit, percentage deposit or full prepayment, and how many minutes does an unpaid checkout hold last?',
        'What are the time-based cancellation fee tiers before start time, and what penalty applies to a no-show?',
        'When a customer reschedules within the allowed window, does the existing deposit transfer automatically, and how are price differences settled?',
        'If a booking reduces headcount (for example, from 6 guests to 4) after the cutoff, does a per-person cancellation fee apply?',
        'How are penalties waived when the host or venue cancels or approves an exception?',
      ],
      example: 'Example: a venue could hold a selected slot for 10 minutes during checkout, charge a per-person deposit, refund 100% or carry the deposit to a new date if changed at least 48 hours ahead, deduct 50% within 24–48 hours, and refund 100% whenever the venue cancels. This is a reference example, not an established policy.',
      relatedDesigns: [
        { id: 'inline-delete-confirmation', reason: 'A reference for confirming a booking cancellation after displaying the applicable cutoff tier, deducted fee and net refund amount. Real fee calculation and refund execution need separate implementation.' },
        { id: 'ly-transposable-comparison-matrix', reason: 'A reference for presenting time-window cancellation tiers and refund percentages in a structured table. Real settlement logic is not included.' },
      ],
      promptSnippet: 'Help design a booking deposit, prepayment and cutoff-based cancellation fee workflow. First ask about deposit/prepayment structure and unpaid hold duration, tiered cancellation cutoffs and no-show penalties, deposit carryover on rescheduling, partial headcount reductions, and host-fault fee waivers. Do not assume undecided rules.\nBased on the answers, describe:\n1. States across provisional payment hold, confirmed (paid), hold-expired and canceled/no-show settled, plus capacity release timing.\n2. Policy snapshot storage at booking time and deterministic penalty/refund calculation at cancellation time.\n3. Deposit carryover and price-difference settlement when rescheduling.\n4. Customer-fault deductions versus host-fault full waivers, plus handling of delayed or failed refund calls.\n5. Pre-checkout policy summary, cancellation penalty preview confirmation and settlement receipt UI with reasons for the design choices.\nDo not retroactively apply changed fee policies to already-paid bookings, and distinguish design demos from real payment and refund settlement systems.',
    },
  },
  sources: [
    { title: 'Square Developer — Bookings API cancellation policy and no-show fees', url: 'https://developer.squareup.com/docs/bookings-api/what-it-is' },
    { title: 'Stripe Docs — Place a hold on a payment method or refund partially', url: 'https://docs.stripe.com/refunds' },
  ],
}, {
  id: 'booking-waitlist-offer-window-and-expiry',
  aliases: {
    ko: ['빈자리 대기 순번 알림', '대기 확정 제한 시간과 만료', '다음 순번 자동 승계', '임박 취소 시 선착순 전환', '대기 신청 중복 제한'],
    en: ['waitlist slot offer window', 'offer expiration timer', 'next-in-line waitlist promotion', 'last-minute cancellation waitlist', 'waitlist position and forfeit'],
  },
  useCases: {
    ko: ['마감된 시간대에 대기 신청을 받고 취소석 발생 시 순번대로 기회를 줄 때', '1순위 대기자에게 일정 시간(예: 30분) 동안만 확정 권한을 열어 두고 만료 시 다음 순번으로 넘길 때', '이용 시작이 임박해 순차 대기 시간이 부족할 때의 전환 방식을 정할 때', '대기 신청자가 이미 다른 시간대를 확정했거나 스스로 대기를 포기할 때'],
    en: ['Accepting waitlist signups for full slots and offering freed spots in queue order', 'Giving the top waitlisted user a timed claim window before passing the offer to the next person', 'Adjusting offer timers when a cancellation happens shortly before the session starts', 'Cleaning up waitlist entries when a user books another slot or declines an offer'],
  },
  keywords: {
    ko: ['대기열 승계', '대기 순번', '빈자리 알림', '확정 제한 시간', '기회 만료', '다음 순번 승계', '자동 확정', '대기 취소', '마감 임박 빈자리'],
    en: ['waitlist queue', 'queue position', 'slot offer window', 'claim timer', 'offer expiration', 'next in line', 'auto-enroll', 'waitlist forfeit', 'freed capacity'],
  },
  text: {
    ko: {
      domain: '예약·일정',
      title: '빈자리 발생 시 대기 순번 알림·확정 제한 시간과 다음 순번 승계',
      summary: '취소로 생긴 빈자리를 일반 목록보다 대기자에게 먼저 배정하고, 확정 제한 시간 만료 시 다음 순번으로 승계합니다.',
      overview: '마감된 인기 시간대에서 취소가 나왔을 때 그 자리를 즉시 일반 목록에 풀어 버리면 대기 신청을 걸어 둔 사람보다 우연히 화면을 새로고침한 사람이 먼저 채가게 됩니다. 반대로 1순위 대기자에게 기한 없이 자리를 묶어 두면 응답이 없을 때 결국 빈자리로 버려집니다. 따라서 대기 전용 선점 상태와 확정 제한 시간, 만료 시 다음 순번 승계 규칙을 함께 설계해야 합니다. 아래 내용은 대기열 승계 설계를 위한 참고이며 특정 서비스의 알림 시간을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '대기 전용 홀드(Waitlist Hold)와 일반 노출 차단', description: '대기자가 있는 시간대에 취소석이 생기면 일반 예약 화면에는 여전히 마감으로 유지한 채 대기 순번 대상자에게만 확정 기회를 엽니다.' },
        { name: '순차 제안(Timed Offer) vs 사전 동의 자동 확정(Auto-enroll)', description: '1순위 대기자에게 알림을 보내 제한 시간 안에 직접 확정하게 할지, 사전 결제·동의한 대기자를 즉시 확정으로 전환할지 구분합니다.' },
        { name: '확정 제한 시간 만료와 다음 순번 승계', description: '제안받은 대기자가 제한 시간 안에 확정하지 않거나 거절하면 해당 제안을 만료 처리하고 즉시 다음 순번 대기자에게 기회를 넘깁니다.' },
        { name: '시작 임박 예외와 중복 대기 자동 정리', description: '이용 시작이 임박해 긴 응답 시간을 줄 수 없을 때의 단축 규칙과, 같은 날 다른 시간대를 이미 확정한 사용자의 대기 항목 자동 해제 규칙을 정의합니다.' },
      ],
      workflow: [
        { name: '대기 조건 안내 후 대기열 등록하기', description: '현재 대기 순번(또는 대기 인원), 빈자리 발생 시 자동 확정인지 알림 후 직접 확정인지, 응답 제한 시간을 알리고 등록합니다.' },
        { name: '빈자리 발생 시 1순위 대상에게 확정 기회 열기', description: '취소·변경으로 자리가 나면 해당 자리를 대기 홀드로 잠그고 1순위 대기자에게 만료 시각이 명시된 확정 안내를 보냅니다.' },
        { name: '기한 내 확정·거절 또는 시간 만료 처리하기', description: '기한 내 응답하면 정식 예약으로 전환하고, 거절하거나 만료 시각이 지나면 다음 순번에게 승계하거나 대기자가 없으면 일반 가용석으로 풉니다.' },
        { name: '시작 시각 도래 시 미해결 대기 일괄 종료하기', description: '끝내 자리가 나지 않은 채 예약 시작 시각(또는 대기 마감 시각)이 지나면 남은 대기 신청을 만료 안내와 함께 종료합니다.' },
      ],
      pitfalls: [
        { name: '대기자가 있는데도 취소 즉시 일반 예약 화면에 빈자리를 풀어 버리기', description: '취소 처리가 곧바로 일반 잔여석 증가로 이어지면 대기열보다 일반 조회자가 먼저 예약할 수 있어 대기 순번이 무력화됩니다.' },
        { name: '대기 제안에 만료 시각을 두지 않아 첫 순번 무응답이 끝까지 자리를 막기', description: '1순위가 알림을 못 본 사이 수업 시작 시각이 지나 버리지 않도록 명확한 확정 마감 타이머와 자동 승계를 두세요.' },
        { name: '같은 시간대 모든 대기자에게 동시에 알림을 보내고도 1순위 보장처럼 안내하기', description: '동시 발송 선착순 방식인지 1명씩 순차 제한 시간 부여 방식인지 명확히 구분해 안내해야 늦게 누른 대기자의 혼란을 줄일 수 있습니다.' },
      ],
      questions: [
        '빈자리가 나면 1순위 대기자에게 직접 확정할 제한 시간을 주나요, 사전 동의 기반으로 즉시 자동 확정하나요?',
        '직접 확정 방식이라면 응답 제한 시간은 몇 분이며, 만료되거나 거절할 때 다음 순번에게 어떻게 넘어가나요?',
        '이용 시작 몇 시간 전부터는 순차 대기 시간을 줄이거나 대기열 운영을 마감하나요?',
        '한 사용자가 여러 시간대에 동시에 대기를 걸 수 있나요? 하나가 확정되면 나머지 대기 신청은 자동 취소되나요?',
        '2명 이상 다인원 대기 신청이 있을 때 1자리만 비면 해당 팀을 건너뛰고 다음 1인 대기자에게 먼저 기회를 주나요?',
      ],
      example: '예시: 정원 마감 시간대에 대기 신청을 받되 취소석이 생기면 일반 화면에는 마감 상태를 유지한 채 1순위 대기자에게 30분 확정 기회를 부여하고, 30분 내 미확정 시 2순위로 자동 승계하며 모든 대기자가 거절하거나 없을 때만 일반 잔여석으로 열도록 구성할 수 있습니다. 이는 참고 예시이며 실제 대기·승계 규칙은 별도로 확정해야 합니다.',
      relatedDesigns: [
        { id: 'unread-notification-badge', reason: '대기 중이던 시간대에 빈자리 확정 기회가 열렸음을 알림 배지로 강조하는 표현에 참고할 수 있습니다. 실제 순번 계산과 만료 타이머는 별도로 구현해야 합니다.' },
        { id: 'ly-activity-timeline', reason: '대기 신청 → 순번 도래(확정 대기) → 시간 내 확정 또는 만료 승계로 이어지는 상태 변화를 시간순으로 보여 주는 표현에 참고할 수 있습니다. 실제 대기열 승계 로직은 포함하지 않습니다.' },
      ],
      promptSnippet: '예약·일정 서비스의 빈자리 대기 순번 알림·확정 제한 시간 및 다음 순번 승계 흐름을 설계해 줘. 먼저 자동 확정 vs 제한 시간 내 직접 확정 방식, 응답 제한 시간과 만료 시 다음 순번 승계 규칙, 시작 임박 시 단축/마감 기준, 다중 대기 신청 및 다인원 대기 매칭 규칙을 질문하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 대기 신청(대기 중)·확정 기회 부여(Waitlist Hold)·기한 내 확정·거절/시간 만료·전체 마감 만료 상태와 전환 조건.\n2. 취소석 발생 시 일반 노출 차단과 대기 1순위 제안 및 만료 시 다음 순번 자동 승계 규칙.\n3. 다인원 대기 시 잔여석 수 매칭 기준과 다른 시간대 확정 시 중복 대기 정리 방식.\n4. 만료 경계 시각의 확정 클릭 경합이나 이용 시작 임박 시 예외 처리.\n5. 대기 신청 확인·내 대기 순번 및 남은 확정 시간 배너·확정/포기 화면과 디자인 선택 이유.\n취소석을 대기자 확인 전에 일반 잔여석으로 먼저 풀지 말고, 디자인 데모와 실제 대기열 타이머·승계 시스템을 구분해 줘.',
    },
    en: {
      domain: 'Booking & Scheduling',
      title: 'Waitlist slot-offer windows, expiration timers and next-in-line promotion',
      summary: 'Hold freed capacity for waitlisted users, enforce timed claim windows and promote the next person in line when an offer expires.',
      overview: 'When a confirmed booking cancels on a full time slot, returning that spot directly to public availability lets a casual page refresh beat users who joined the waitlist hours earlier. Conversely, holding the freed spot for the first waitlisted user without an expiration timer wastes the slot if they never respond. A waitlist workflow needs a dedicated waitlist-hold state, a clear claim deadline and automatic promotion to the next eligible person. The concepts below are design references, not default queue policies.',
      concepts: [
        { name: 'Waitlist-reserved capacity versus public availability', description: 'When a spot opens on a slot that has active waitlist entries, keep the slot closed to the general public while the waitlist queue is being offered the spot.' },
        { name: 'Timed claim offer versus pre-authorized auto-enrollment', description: 'Distinguish sending the top waitlisted user a timed link to confirm from automatically converting pre-authorized waitlisted users into confirmed bookings.' },
        { name: 'Offer expiration and next-in-line promotion', description: 'Define how long an offered spot is held before it expires and automatically advances to the next eligible waitlist entry (or returns to public capacity if the queue is empty).' },
        { name: 'Near-start cutoff rules and duplicate waitlist cleanup', description: 'Shorten or close waitlist offers when start time is imminent, and automatically remove a user’s other same-day waitlist entries once one booking is confirmed.' },
      ],
      workflow: [
        { name: 'Enroll users with clear queue and offer expectations', description: 'Show queue position (or waitlist status), whether promotion is automatic or requires confirmation, and how long an offer window lasts.' },
        { name: 'Lock freed capacity and issue a timed offer to the next eligible user', description: 'When a cancellation frees capacity, place the spot in a waitlist-hold state and notify the first eligible entry with an explicit expiration timestamp.' },
        { name: 'Confirm within the window or advance on decline/timeout', description: 'Convert accepted offers into confirmed bookings, or immediately pass declined/expired offers to the next eligible person in line.' },
        { name: 'Expire unfulfilled waitlist entries when the booking cutoff passes', description: 'Once the session starts or passes its final waitlist cutoff, close remaining waitlist entries with a clear status update.' },
      ],
      pitfalls: [
        { name: 'Releasing canceled spots to the public page before checking the waitlist', description: 'Incrementing general available capacity on cancel lets anyone grab the spot before the waitlist queue is processed.' },
        { name: 'Holding an offered spot without a hard expiration timestamp', description: 'An unacknowledged offer with no timer blocks the rest of the waitlist until the session starts empty.' },
        { name: 'Broadcasting one spot to the entire waitlist while implying guaranteed first-in-line reservation', description: 'Clarify whether offers are exclusive one-by-one timed holds or simultaneous first-come claims when start time is very close.' },
      ],
      questions: [
        'When a spot opens, does it auto-confirm the first waitlisted user or send a timed claim offer requiring confirmation?',
        'How many minutes does a claim offer stay valid before expiring and advancing to the next waitlisted user?',
        'How does waitlist behavior change when a cancellation happens shortly before the session start time?',
        'Can a user join multiple waitlists at once, and are their other waitlist entries automatically canceled when one spot is confirmed?',
        'If a waitlisted request is for 2+ spots and only 1 spot opens, does the queue skip to the next single-spot request while keeping the 2-spot request in line?',
      ],
      example: 'Example: a full class could place freed spots into a waitlist hold, grant the first eligible waitlisted user a 30-minute exclusive claim window, advance to the next person on decline or timeout, skip multi-seat requests when only 1 seat is free without dropping their queue place, and open the seat to the public only if the waitlist empties. This is a reference example, not an established policy.',
      relatedDesigns: [
        { id: 'unread-notification-badge', reason: 'A reference for alerting a user that a waitlisted slot is now available to claim within a time window. Real queue promotion and timer expiration need separate implementation.' },
        { id: 'ly-activity-timeline', reason: 'A reference for displaying the progression from waitlist signup to slot offer, confirmation or expiration. Real waitlist state transitions are not included.' },
      ],
      promptSnippet: 'Help design a booking waitlist slot-offer window, expiration timer and next-in-line promotion workflow. First ask about auto-enrollment versus timed claim offers, offer duration and next-in-line promotion rules, near-start cutoff behavior, multi-slot waitlist cleanup, and party-size matching when partial capacity opens. Do not assume undecided rules.\nBased on the answers, describe:\n1. Waitlist states across queued, offer-pending (waitlist hold), claimed/confirmed, declined/expired and closed-unfulfilled.\n2. Isolation of freed capacity from public booking views while waitlist offers are active.\n3. Party-size matching rules and automatic cleanup of overlapping waitlist entries upon confirmation.\n4. Handling of race conditions at the exact expiration second and shortened rules near session start.\n5. Waitlist signup summary, active claim countdown banner and accept/pass screens with reasons for the design choices.\nDo not release canceled capacity to the public while eligible waitlisted users are waiting, and distinguish design demos from real queue and timer systems.',
    },
  },
  sources: [
    { title: 'Square Support — Manage customer waitlists with Square Appointments', url: 'https://squareup.com/help/us/en/article/7992-manage-waitlists-with-square-appointments' },
    { title: 'Mindbody Support — Waitlist setup, notifications and confirmation windows', url: 'https://support.mindbodyonline.com/s/article/203259523-Waitlists' },
  ],
}];
