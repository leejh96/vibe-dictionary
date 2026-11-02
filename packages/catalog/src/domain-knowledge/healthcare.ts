import type { DomainKnowledge } from '../domain-knowledge';

export const HEALTHCARE_KNOWLEDGE: DomainKnowledge[] = [
  {
    id: 'healthcare-clinic-intake-triage-and-queue',
    aliases: {
      ko: ['사전 문진표 접수', '내원 대기 순번', '클리닉 현장 접수', '호출 보류 재호출', '진료실 대기열 관리'],
      en: ['pre-visit intake form', 'clinic check-in queue', 'patient waiting order', 'missed-call hold and recall', 'triage queue management'],
    },
    useCases: {
      ko: [
        '방문 전 모바일 문진표를 작성하고 현장 도착 확인과 대기 순번을 연결할 때',
        '예약 방문자와 당일 현장 접수자의 대기 순서를 합산하거나 우선순위를 조정할 때',
        '순번 호출 시 자리에 없는 방문자를 즉시 취소하지 않고 보류·재호출 상태로 전환할 때',
        '접수 취소·담당의 변경 시 예상 대기 인원과 안내 화면을 갱신할 때',
      ],
      en: [
        'Connecting mobile pre-visit intake forms to on-site arrival check-in and queue assignment',
        'Balancing scheduled appointments and walk-in arrivals within the same room queue',
        'Moving absent callers into a temporary hold state for recall instead of canceling immediately',
        'Updating waiting counts and room displays when a visit is canceled or reassigned',
      ],
    },
    keywords: {
      ko: ['헬스케어', '진료', '건강기록', '사전 문진표', '문진표', '내원 접수', '대기 순번', '현장 접수', '호출 보류', '재호출'],
      en: ['healthcare', 'clinic', 'intake form', 'check-in queue', 'waiting list', 'walk-in', 'triage priority', 'patient call', 'recall hold'],
    },
    text: {
      ko: {
        domain: '헬스케어·진료·건강기록',
        title: '사전 문진표 작성·내원 접수·현장 대기 순번과 호출 보류 흐름',
        summary: '사전 예약·문진 작성과 실제 내원 도착 상태를 분리하고, 대기 순번·호출 보류·재호출을 연결합니다.',
        overview: '클리닉이나 검진 센터에서는 예약을 했다고 해서 곧바로 진료실 대기 순번에 들어가지 않습니다. 사전 문진표 제출 여부, 현장 도착 확인, 예약자와 당일 방문자의 순서 배정, 호출 시 부재자 보류 처리를 나누어 설계해야 현장 혼선을 줄일 수 있습니다. 아래 내용은 진료 접수·대기 흐름을 설계하기 위한 참고이며 특정 기관의 접수 규칙을 기본값으로 정하지 않습니다.',
        concepts: [
          { name: '예약·문진 완료와 실제 도착 확인 분리', description: '사전 문진표를 제출했더라도 현장에 도착해 접수 확인을 마친 시점부터 실제 호출 대상 대기열에 올립니다.' },
          { name: '예약 방문과 현장 접수의 대기열 결합', description: '시간대 예약자와 당일 현장 접수자를 같은 대기열에서 어떤 규칙으로 섞을지, 긴급 확인 대상의 우선 배정을 허용할지 정합니다.' },
          { name: '호출 중·부재 보류·입실 완료 상태', description: '호출했을 때 즉시 응답하지 못한 방문자를 바로 취소하지 않고 부재 보류로 두었다가 복귀 시 몇 순번 뒤에 재호출할지 결정합니다.' },
          { name: '대기 현황판의 개인정보 마스킹', description: '대기실 공용 화면과 모바일 조회 화면에 방문자 이름을 어떻게 가려 표시할지(예: 홍*동 + 생년월일 끝자리) 기준을 맞춥니다.' },
        ],
        workflow: [
          { name: '사전 문진 작성과 미작성 항목 안내하기', description: '방문 전 증상·복용약·주의사항을 입력받고, 임시 저장본이 남아 있으면 현장 도착 시 이어서 완료하게 안내합니다.' },
          { name: '도착 확인과 대기 순번 배정하기', description: '현장 키오스크나 데스크에서 도착을 확인하면 담당 진료실과 대기 순번을 배정합니다.' },
          { name: '호출·부재 보류·재호출 처리하기', description: '순번이 되어 호출한 뒤 일정 시간 응답이 없으면 부재 보류로 옮기고 다음 대기자를 먼저 호출합니다.' },
          { name: '진료 완료와 수납·차기 일정 연결하기', description: '입실 후 상담이 끝나면 수납 대기나 처방·다음 예약 안내 단계로 상태를 전환합니다.' },
        ],
        pitfalls: [
          { name: '예약 시각 도래를 현장 도착으로 자동 간주하기', description: '아직 도착하지 않은 예약자를 자동으로 호출 목록에 올리면 빈 호명이 반복됩니다. 도착 확인과 예약 시각을 분리하세요.' },
          { name: '공용 대기 화면에 실명과 방문 사유를 그대로 노출하기', description: '대기실 모니터에 전체 이름이나 세부 과목·증상이 보이면 사생활 침해가 됩니다. 식별에 필요한 최소 마스킹 표기만 노출하세요.' },
          { name: '잠시 자리를 비운 대기자를 취소로만 처리하기', description: '검사실 이동이나 화장실 이용으로 호출을 놓친 방문자를 처음부터 다시 접수하게 하면 마찰이 큽니다. 보류 후 재호출 상태를 두세요.' },
        ],
        questions: [
          '사전 문진표를 제출하지 않은 방문자도 현장 도착 접수를 먼저 할 수 있나요, 문진 완료가 필수인가요?',
          '예약 방문자와 당일 현장 접수자가 겹칠 때 대기 순번은 어떤 기준으로 배열하나요?',
          '호출 후 응답이 없을 때 부재 보류로 전환하는 기준과 복귀 시 재편입 위치는 어떻게 정하나요?',
          '대기실 전광판과 개인 알림 메시지에서 방문자 이름과 순번을 각각 어디까지 표시하나요?',
          '담당의 변경이나 접수 취소 시 다른 대기자의 예상 순서 안내를 어떻게 갱신하나요?',
        ],
        example: '예시: 외래 클리닉에서 모바일 사전 문진 후 현장 태블릿으로 도착 확인을 누르면 담당실 대기열에 등록되고, 호명 시 부재하면 보류 상태로 전환한 뒤 데스크 확인 후 다음 순번 뒤로 재호출하도록 구성할 수 있습니다. 실제 순번 배정 규칙과 마스킹 방식은 기관 운영 방침에 맞게 먼저 확인해야 합니다.',
        relatedDesigns: [
          { id: 'onboarding-progress-checklist', reason: '사전 문진 작성·도착 확인·진료 대기의 단계별 진행 여부를 표시하는 표현에 참고할 수 있습니다. 실제 접수와 대기열 배정은 별도로 구현해야 합니다.' },
          { id: 'ly-activity-timeline', reason: '접수·호출·보류·입실로 이어지는 단계 기록을 시간순으로 보여 주는 표현에 참고할 수 있습니다. 실제 호출 제어는 구현하지 않습니다.' },
        ],
        promptSnippet: '클리닉의 사전 문진·내원 도착 접수·대기 순번·호출 보류 흐름을 설계해 줘. 먼저 사전 문진 필수 여부, 예약자와 현장 접수자의 순번 결합 규칙, 호출 부재 시 보류 및 재호출 방식, 공용 화면의 이름 마스킹 기준을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 방문자·접수 데스크·진료실 담당자가 볼 정보와 가능한 행동.\n2. 예약됨·문진 완료·도착 대기·호출 중·부재 보류·입실·취소 상태의 전환.\n3. 예약 방문과 당일 방문의 순번 조정 및 부재 복귀 시 재편입 규칙.\n4. 문진 저장 실패·중복 도착 접수·담당실 변경 시 처리와 안내.\n5. 사전 문진 화면·도착 확인·모바일 순번 조회·공용 대기 현황판·호출 제어 화면의 연결.\n예약 시각을 실제 도착으로 단정하거나 공용 화면에 민감 정보를 노출하지 말고, 예시 정책과 디자인 데모를 실제 원무 시스템으로 간주하지 말아 줘.',
      },
      en: {
        domain: 'Healthcare, Clinic & Health Records',
        title: 'Pre-visit intake forms, arrival check-in, waiting queues and missed-call holds',
        summary: 'Separate scheduled bookings and intake forms from on-site arrival, and connect queue order, missed-call holds and recalls.',
        overview: 'In a clinic or checkup center, holding an appointment time does not mean the visitor has arrived in the waiting room. Separating pre-visit intake completion, on-site arrival confirmation, blended walk-in and appointment ordering, and missed-call hold states keeps room flow predictable. These concepts are design references, not default clinical triage rules for a specific facility.',
        concepts: [
          { name: 'Pre-visit intake versus on-site arrival confirmation', description: 'Keep pre-visit questionnaire submission distinct from physical arrival check-in so only present visitors enter the active call queue.' },
          { name: 'Blending scheduled appointments and walk-ins', description: 'Define how on-time appointments, late arrivals and walk-in registrations are ordered in the room queue.' },
          { name: 'Called, missed-call hold and in-room states', description: 'Allow staff to place an absent visitor on temporary hold rather than canceling the visit outright, and define where they re-enter upon return.' },
          { name: 'Privacy masking on public queue displays', description: 'Mask visitor names on shared waiting-room screens while showing full details only on authenticated staff or personal views.' },
        ],
        workflow: [
          { name: 'Collect pre-visit intake and flag incomplete fields', description: 'Let visitors fill out symptoms, medications and precautions ahead of time and resume any unsaved copy at check-in.' },
          { name: 'Confirm arrival and assign room queue position', description: 'Verify arrival at the desk or kiosk and place the visitor into the appropriate room queue.' },
          { name: 'Handle calls, temporary holds and recalls', description: 'Transition absent callers to a hold state so the next waiting visitor can proceed, and re-queue held visitors when they check back in.' },
          { name: 'Advance completed visits to checkout or follow-up', description: 'Move finished consultations to billing, prescription pickup or follow-up scheduling.' },
        ],
        pitfalls: [
          { name: 'Auto-queuing appointments without arrival check-in', description: 'Calling scheduled visitors who have not arrived stalls the room. Require explicit arrival confirmation before queuing.' },
          { name: 'Displaying full names or visit reasons on public monitors', description: 'Shared waiting-room boards must mask personal identifiers and never expose sensitive visit reasons.' },
          { name: 'Forcing full re-registration after a brief missed call', description: 'Visitors stepping away for a test or restroom break need a hold-and-recall state rather than permanent cancellation.' },
        ],
        questions: [
          'Must visitors complete the pre-visit intake form before joining the waiting queue, or can they finish it while waiting?',
          'How are scheduled appointments, late arrivals and walk-ins ordered in the same queue?',
          'When a called visitor is absent, how does the hold state work and where do they re-enter when they return?',
          'How are visitor names masked on public waiting screens versus personal mobile status views?',
          'How are queue positions updated when a room changes or a visitor cancels?',
        ],
        example: 'Example: an outpatient clinic could let visitors submit mobile intake forms ahead of time, activate their queue number upon kiosk check-in, mask middle characters on the waiting-room display, and move missed calls to a hold list that re-inserts them one slot after the current turn once confirmed at the desk. Confirm actual queue rules and privacy masking before adopting this setup.',
        relatedDesigns: [
          { id: 'onboarding-progress-checklist', reason: 'A reference for showing step progress across intake, check-in and room readiness. Real queue assignment needs separate implementation.' },
          { id: 'ly-activity-timeline', reason: 'A reference for displaying chronological check-in, call, hold and completion events. It does not implement queue control.' },
        ],
        promptSnippet: 'Help design a clinic pre-visit intake, arrival check-in and waiting-queue workflow. First confirm intake completion requirements, queue ordering between appointments and walk-ins, missed-call hold and recall rules, and name-masking rules for shared displays. Do not assume undecided rules.\nBased on the answers, describe:\n1. Information and actions available to visitors, front-desk staff and room staff.\n2. Transitions across booked, intake-completed, checked-in waiting, called, on-hold, in-room and canceled states.\n3. Ordering rules for appointments, walk-ins and returning held visitors.\n4. Handling of incomplete intake forms, duplicate check-ins and room reassignments.\n5. How mobile intake forms, arrival check-in, personal queue trackers, public waiting boards and staff call controls connect.\nDo not treat scheduled time as physical arrival or expose unmasked personal details on shared screens, and do not mistake example policies or design demos for a real clinic system.',
      },
    },
    sources: [
      { title: 'HL7 FHIR Specification — Appointment and Encounter Lifecycle', url: 'https://hl7.org/fhir/appointment.html' },
      { title: 'NHS Digital Service Manual — Designing patient check-in and waiting flows', url: 'https://service-manual.nhs.uk/' },
    ],
  },
  {
    id: 'healthcare-consent-guardian-proxy-and-revocation',
    aliases: {
      ko: ['건강기록 열람 동의', '보호자 대리인 권한', '법정대리인 가족 연동', '민감 기록 동의 철회', '제3자 기록 제공 범위'],
      en: ['health record sharing consent', 'guardian proxy access', 'caregiver account delegation', 'consent revocation workflow', 'granular health data sharing'],
    },
    useCases: {
      ko: [
        '본인 건강기록을 가족·보호자나 담당 기관에 어디까지 열람하게 할지 동의 범위를 설정할 때',
        '미성년 자녀나 고령 가족을 대신해 예약·문진·결과 조회를 수행하는 대리인(Proxy) 권한을 둘 때',
        '동의 기간 만료나 즉시 철회 시 대리인 화면의 열람·알림을 중단시킬 때',
        '자녀가 성년이 되거나 대리 관계가 종료될 때 보호자 접근 권한을 전환할 때',
      ],
      en: [
        'Letting individuals grant scoped health-record access to family caregivers or partner clinics',
        'Supporting guardian or caregiver proxy actions for scheduling, intake and record viewing',
        'Revoking or expiring sharing consent so proxy viewing and notifications stop immediately',
        'Transitioning proxy access when a minor reaches adulthood or a guardianship period ends',
      ],
    },
    keywords: {
      ko: ['열람 동의', '보호자 대리', '법정대리인', '가족 연동', '동의 철회', '동의 만료', '대리 예약', '건강기록 권한', '열람 이력'],
      en: ['sharing consent', 'guardian proxy', 'caregiver access', 'delegated account', 'consent revocation', 'consent expiry', 'access audit', 'health records'],
    },
    text: {
      ko: {
        domain: '헬스케어·진료·건강기록',
        title: '건강정보 열람 동의·보호자 대리 권한(Proxy)과 동의 철회 흐름',
        summary: '본인 계정과 보호자 대리 권한을 분리하고, 항목별 열람 범위·만료일·동의 철회를 연결합니다.',
        overview: '건강기록 서비스에서는 한 사람의 아이디와 비밀번호를 가족이 함께 쓰는 대신, 본인 계정과 대리인(보호자) 계정을 분리해 위임 권한으로 연결해야 누가 어떤 행동을 했는지 투명하게 남습니다. 또한 전체 기록을 무조건 공유하기보다 일정·복약·검사 결과 등 열람 범위를 나누고 언제든 동의를 철회할 수 있어야 합니다. 아래 내용은 동의·대리 권한 흐름을 설계하기 위한 참고이며 특정 법령의 대리 요건을 기본값으로 정하지 않습니다.',
        concepts: [
          { name: '본인 계정과 대리인(Proxy) 계정 분리', description: '보호자는 자신의 계정으로 로그인한 뒤 대리 대상 프로필로 전환해 행동하며, 모든 기록에는 실제 수행한 대리인 정보가 남도록 합니다.' },
          { name: '항목별 열람·대리 행동 범위 구분', description: '예약·수납만 대리할 수 있는지, 과거 건강기록과 세부 결과까지 열람할 수 있는지 위임 범위를 나눕니다.' },
          { name: '관계 증빙 확인과 유효 기간', description: '가족·보호자 관계 확인 전 대기 상태와 승인 활성 상태를 구분하고, 동의 만료일이나 연령 도달에 따른 자동 종료 기준을 둡니다.' },
          { name: '즉시 동의 철회와 열람 이력 확인', description: '본인이 동의를 철회하면 대리인의 열람·알림 수신이 즉시 중단되고, 본인은 누가 언제 자신의 기록을 조회했는지 확인할 수 있게 합니다.' },
        ],
        workflow: [
          { name: '대리·공유 대상과 허용 범위 선택하기', description: '공유할 대상자, 허용할 항목(일정·처방·검사 기록 등), 유효 기한을 지정해 요청이나 증빙 절차를 시작합니다.' },
          { name: '본인·관계 확인 후 대리 프로필 활성화하기', description: '상대방 수락이나 관계 확인이 완료되면 대리인 계정에 전환 가능한 대상자 프로필과 허용 권한을 연결합니다.' },
          { name: '대리 프로필 전환과 권한 내 행동 수행하기', description: '대리인이 대상자 프로필로 전환하면 상단에 현재 대리 조회 중임을 명확히 표시하고 허용된 범위만 보여 줍니다.' },
          { name: '동의 범위 변경·만료·철회 반영하기', description: '본인이 일부 항목을 제외하거나 동의를 철회하면 활성 세션과 예약 알림 대상에서 대리인을 즉시 제외합니다.' },
        ],
        pitfalls: [
          { name: '대리인 행동 기록을 본인 행동과 구분하지 않기', description: '누가 예약을 취소했거나 문진표를 작성했는지 구분되지 않으면 분쟁이나 착오 추적이 불가능합니다. 대상자와 실제 행위자를 함께 기록하세요.' },
          { name: '동의 철회 후에도 기존 알림이나 캐시 화면이 남기', description: '공유를 끊었는데도 대리인에게 다음 예약 알림이 가거나 열려 있던 화면에서 상세 기록이 계속 보이면 안 됩니다.' },
          { name: '성년 전환 등 자격 종료 시점을 고려하지 않기', description: '미성년 자녀 대리 권한을 무기한으로 두면 성년이 된 뒤에도 본인이 모르게 기록이 공유될 수 있습니다. 만료 조건과 재동의 안내를 준비하세요.' },
        ],
        questions: [
          '대리인 연결은 본인의 직접 초대로 이루어지나요, 미성년·고령자의 경우 별도 관계 증빙 확인 절차를 거치나요?',
          '예약·문진·수납·처방·검사 결과 중 항목별로 공유 범위를 나누어 선택할 수 있나요?',
          '동의에 기본 유효 기간이 있나요, 자녀가 일정 연령에 도달하면 권한이 어떻게 바뀌나요?',
          '본인이 동의를 수정하거나 즉시 철회했을 때 대리인에게 어떤 안내를 보내고 열려 있는 화면은 어떻게 처리하나요?',
          '본인이 대리인의 열람·대리 행동 이력을 어디까지 조회할 수 있나요?',
        ],
        example: '예시: 건강관리 앱에서 부모가 고령 가족의 대리인으로 연결될 때 일정 관리와 복약 알림만 먼저 공유받고, 상세 검사 기록은 별도 동의 체크가 있을 때만 열람하며, 본인이 설정에서 언제든 연결을 즉시 해제할 수 있도록 구성할 수 있습니다. 실제 증빙 요건과 연령별 대리 기준은 적용 규정과 서비스 정책에 맞게 먼저 확인해야 합니다.',
        relatedDesigns: [
          { id: 'mixed-state-checkbox-group', reason: '공유할 건강기록 항목을 전체 선택·일부 선택·해제로 나누어 지정하는 표현에 참고할 수 있습니다. 실제 동의 저장과 권한 검사는 별도로 구현해야 합니다.' },
          { id: 'inline-delete-confirmation', reason: '대리인 권한 해제나 공유 동의 철회 시 영향을 확인하고 실행하는 표현에 참고할 수 있습니다. 실제 세션 차단과 알림 해제는 구현하지 않습니다.' },
        ],
        promptSnippet: '건강기록 열람 동의와 보호자 대리 권한(Proxy) 흐름을 설계해 줘. 먼저 대리인 연결 및 증빙 방식, 항목별 열람·행동 허용 범위, 동의 유효 기간 및 연령 전환 기준, 즉시 철회 시 접근·알림 차단 정책, 열람 이력 표시 방식을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 본인·대리인(보호자)·운영 담당자별 가능한 행동과 열람 가능 범위.\n2. 동의 요청·증빙 대기·활성·범위 변경·만료·철회 상태 전환.\n3. 대리인 프로필 전환 표시와 본인/대리인 행위자 구분 기록 규칙.\n4. 동의 철회·만료·자격 상실 시 열려 있는 화면과 예약 알림의 차단 처리.\n5. 공유 범위 설정·대리인 프로필 전환 바·권한 철회 확인·열람 이력 화면의 연결.\n계정 공유로 대리 권한을 대신하거나 철회 후에도 알림이 남지 않게 하고, 예시 정책과 디자인 데모를 실제 권한·법적 동의 시스템으로 간주하지 말아 줘.',
      },
      en: {
        domain: 'Healthcare, Clinic & Health Records',
        title: 'Health-record sharing consent, guardian proxy access and revocation workflows',
        summary: 'Separate the subject account from caregiver proxy accounts, and connect scoped permissions, expiration and immediate revocation.',
        overview: 'Rather than sharing a single login password among family members, health services should link a caregiver or guardian’s own account via explicit proxy delegation. Scoping which records or actions are delegated, recording who performed each action, and enforcing immediate revocation or age-out transitions protects privacy. These concepts are design references, not legal guardianship defaults for a specific jurisdiction.',
        concepts: [
          { name: 'Subject account versus delegated proxy account', description: 'Caregivers sign in with their own credentials and switch into a delegated profile context, while audit trails record both the subject and the acting proxy.' },
          { name: 'Granular scope for viewing versus acting', description: 'Separate permission to manage appointments or billing from permission to view prescriptions or sensitive test results.' },
          { name: 'Verification states and expiration rules', description: 'Distinguish pending-verification, active, expired and revoked delegations, including automatic transitions when a minor reaches adulthood.' },
          { name: 'Immediate revocation and access history', description: 'Revoking consent immediately stops proxy access and notifications, while letting the subject review when their records were accessed.' },
        ],
        workflow: [
          { name: 'Select delegate, data scope and duration', description: 'Choose who receives proxy access, which record categories or actions are included, and when the consent expires.' },
          { name: 'Verify relationship or acceptance and activate', description: 'Complete subject confirmation or guardianship verification before enabling the delegated profile switch.' },
          { name: 'Display clear proxy context during use', description: 'Show a persistent banner when acting on behalf of another person and restrict hidden categories on both UI and API layers.' },
          { name: 'Apply scope edits, expirations and revocations immediately', description: 'Cut off active proxy sessions and notification routing as soon as consent is narrowed, expired or revoked.' },
        ],
        pitfalls: [
          { name: 'Logging proxy actions as if performed by the subject', description: 'Always record the acting proxy user alongside the subject profile so appointment changes or form submissions remain attributable.' },
          { name: 'Continuing notifications to a revoked caregiver', description: 'Ensure scheduled reminders and push alerts check current consent state at send time rather than relying on stale subscriber lists.' },
          { name: 'Leaving minor-to-adult proxy access open indefinitely', description: 'Define how proxy permissions expire or require re-authorization when a dependent reaches the age of majority.' },
        ],
        questions: [
          'Is proxy access initiated by the subject’s invitation, or through guardian verification for minors and dependents?',
          'Which categories (appointments, intake, billing, prescriptions, test results) can be toggled independently?',
          'Does consent have an expiration date, and what happens when a minor dependent reaches adulthood?',
          'When consent is narrowed or revoked, how are active proxy sessions and pending notifications terminated?',
          'Can the subject view a log of when and by whom their records were viewed or modified?',
        ],
        example: 'Example: a health portal could allow an adult to grant a family caregiver access to appointment scheduling and medication reminders while keeping lab records unchecked, display a clear proxy banner when the caregiver switches profiles, and revoke access immediately when unchecked. Confirm actual legal verification and age-out rules before adopting this setup.',
        relatedDesigns: [
          { id: 'mixed-state-checkbox-group', reason: 'A reference for toggling all, some or none of the shareable record categories. Real consent persistence and access checks need separate implementation.' },
          { id: 'inline-delete-confirmation', reason: 'A reference for two-step confirmation before revoking caregiver proxy access. Session termination and alert suppression need separate implementation.' },
        ],
        promptSnippet: 'Help design a health-record sharing consent and guardian-proxy workflow. First confirm invitation versus guardian verification rules, granular category scopes, expiration and age-out transitions, immediate revocation effects on sessions and alerts, and access-history logging. Do not assume undecided rules.\nBased on the answers, describe:\n1. Allowed views and actions for the subject, delegated proxy and support staff.\n2. Transitions across requested, pending-verification, active, narrowed, expired and revoked consent states.\n3. Profile-switching indicators and actor-versus-subject attribution rules.\n4. Immediate cutoff behavior for active sessions and scheduled notifications upon revocation or expiry.\n5. How scope checkboxes, proxy switcher banners, revocation confirmations and access logs connect.\nDo not rely on shared passwords for caregiver access, and do not mistake example policies or design demos for legal consent compliance.',
      },
    },
    sources: [
      { title: 'HL7 FHIR Specification — Consent Resource', url: 'https://hl7.org/fhir/consent.html' },
      { title: 'ONC HealthIT Playbook — Patient and Caregiver Portal Access', url: 'https://www.healthit.gov/playbook/patient-engagement/' },
    ],
  },
  {
    id: 'healthcare-prescription-refill-and-dispensing-status',
    aliases: {
      ko: ['처방전 발행 유효기간', '약국 조제 수령 상태', '반복 재처방 요청', '처방 변경 만료 안내', '조제 대기 알림'],
      en: ['prescription validity window', 'pharmacy dispensing status', 'refill request workflow', 'expired prescription handling', 'pickup readiness tracking'],
    },
    useCases: {
      ko: [
        '발행된 처방전의 제출 유효 기한과 약국 전달·조제 중·수령 완료 상태를 구분할 때',
        '잔여 반복 조제(Refill) 횟수가 남은 경우와 담당의 재확인이 필요한 재처방 요청을 나눌 때',
        '약국 재고 부족이나 대체 조제 확인이 필요할 때 보류 사유와 연락 경로를 안내할 때',
        '유효 기한이 지난 미수령 처방전의 만료 처리와 재발행 절차를 설계할 때',
      ],
      en: [
        'Distinguishing issued prescriptions, submission expiration windows, pharmacy preparation and pickup completion',
        'Separating remaining authorized refills from renewal requests that require clinician review',
        'Handling pharmacy stock holds or substitution confirmation requests clearly',
        'Managing expired or unclaimed prescriptions and re-issuance requests',
      ],
    },
    keywords: {
      ko: ['처방전', '유효기간', '약국 전달', '조제 대기', '조제 완료', '수령 확인', '재처방 요청', '대체 조제', '미수령 만료'],
      en: ['prescription', 'expiration window', 'dispensing status', 'ready for pickup', 'refill request', 'renewal approval', 'pharmacy hold', 'unclaimed expiry'],
    },
    text: {
      ko: {
        domain: '헬스케어·진료·건강기록',
        title: '처방전 발행·유효기간·조제/수령 상태와 재처방 요청 구분',
        summary: '처방전 발행과 실제 조제·수령 완료를 분리하고, 제출 기한·보류 사유·재처방 요청을 연결합니다.',
        overview: '처방전이 발행되었다는 표시와 약국에서 약이 준비되어 바로 수령할 수 있다는 상태는 다릅니다. 처방전 제출 유효 기한, 약국 접수 후 조제 진행 상태, 재고 부족이나 확인 필요로 인한 보류, 남은 횟수 내 재조제와 신규 재처방 요청을 명확히 구분해야 헛걸음과 중복 요청을 줄일 수 있습니다. 아래 내용은 처방·조제 안내 흐름을 설계하기 위한 참고이며 특정 국가의 처방 전달 규정을 기본값으로 정하지 않습니다.',
        concepts: [
          { name: '처방 발행·약국 접수·조제 완료·수령 완료 분리', description: '처방전 발급 직후, 약국에 전달되어 확인 중인 단계, 조제가 끝나 수령 가능한 단계, 실제 수령이 끝난 단계를 각각 구분합니다.' },
          { name: '처방전 제출 기한과 수령 보관 기한', description: '발행 후 약국에 제출해야 하는 유효 기한과, 조제 완료 후 수령하지 않을 때 보관·취소되는 기한을 나누어 표시합니다.' },
          { name: '조제 보류와 사유 안내', description: '약품 일시 품절, 용량 재확인, 본인 부담금 확인 등으로 조제가 멈춘 경우 단순 대기 중과 구분해 필요한 행동을 안내합니다.' },
          { name: '잔여 횟수 재조제와 재처방 검토 요청', description: '이미 허용된 잔여 횟수 안에서 조제를 요청하는 것과, 횟수가 소진되었거나 기한이 지나 담당자의 새 승인이 필요한 요청을 구분합니다.' },
        ],
        workflow: [
          { name: '처방 발행 내역과 유효 기한 안내하기', description: '발행 시각, 제출 마감일, 주의사항을 표시하고 약국 제출 또는 수령 방식을 선택하게 합니다.' },
          { name: '접수·조제 진행과 보류 상태 갱신하기', description: '약국 접수, 조제 중, 보류(품절·확인 대기), 조제 완료(수령 가능) 상태를 실시간으로 반영합니다.' },
          { name: '수령 확인과 복약 안내 연결하기', description: '수령이 완료되면 수령 일시를 기록하고 복용 횟수·보관법 안내 화면으로 연결합니다.' },
          { name: '만료·소진 후 재처방 요청 처리하기', description: '유효기간 만료나 잔여 횟수 소진 시 재처방 요청 가능 여부와 예상 검토 절차를 안내합니다.' },
        ],
        pitfalls: [
          { name: '처방전 발급 완료를 약국 수령 가능 상태로 오해하게 표시하기', description: '발급 직후 바로 찾으러 갔는데 아직 조제 전이거나 품절이면 불편이 생깁니다. 처방 발행과 약국 조제 완료 배지를 명확히 분리하세요.' },
          { name: '유효 기한이 지난 처방전에 제출 버튼을 그대로 활성 두기', description: '제출 기한이 만료된 처방전은 만료 사유와 재발행 문의 경로를 안내해야 합니다.' },
          { name: '진행 중인 재처방 요청이 있는데 중복 신청 허용하기', description: '검토 대기 중인 요청이 있을 때는 현재 요청 상태를 보여 주고 중복 접수를 막으세요.' },
        ],
        questions: [
          '처방전 발행 후 약국 제출 유효 기한은 며칠이며, 기한 경과 시 어떻게 안내하나요?',
          '약국 접수·조제 중·보류·조제 완료·수령 완료 중 화면에서 어디까지 단계별로 제공하나요?',
          '약국 재고 부족이나 대체 확인이 필요할 때 방문자에게 어떤 알림과 선택지를 보여 주나요?',
          '반복 조제(잔여 횟수 차감)와 담당자 재검토가 필요한 재처방 요청을 모두 다루나요?',
          '조제 완료 후 일정 기간 미수령 시 어떻게 취소·보관 처리하나요?',
        ],
        example: '예시: 클리닉 앱에서 처방 발행 시 제출 마감일을 함께 표시하고, 지정 약국에서 조제 완료를 누르면 수령 가능 알림을 보내며, 유효 기한이 지난 처방전은 만료 배지와 함께 재상담 예약 버튼을 안내하도록 구성할 수 있습니다. 실제 전자처방 전달 범위와 유효 기한은 관련 법규와 운영 방식에 맞게 먼저 확인해야 합니다.',
        relatedDesigns: [
          { id: 'dismissible-inline-banner', reason: '처방전 제출 마감 임박이나 조제 보류 사유를 상단 인라인 배너로 알리는 표현에 참고할 수 있습니다. 실제 만료 계산과 알림 발송은 별도로 구현해야 합니다.' },
          { id: 'ly-expandable-data-rows', reason: '처방 목록 행을 펼쳐 약품별 복용량·조제 상태·수령 일시를 확인하는 표현에 참고할 수 있습니다. 실제 처방 조회는 구현하지 않습니다.' },
        ],
        promptSnippet: '처방전 발행·유효기간·약국 조제/수령 상태·재처방 요청 흐름을 설계해 줘. 먼저 처방전 제출 유효 기한, 발행·접수·조제 중·보류·수령 가능·수령 완료 상태 구분, 품절/확인 보류 안내, 잔여 횟수 재조제와 재처방 검토 요청의 차이를 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 방문자·발행 담당자·약국 담당자가 각 단계에서 볼 정보와 가능한 행동.\n2. 발행됨·약국 접수·조제 중·보류·수령 가능·수령 완료·기한 만료 상태의 전환.\n3. 유효 기한 및 미수령 보관 기한 표시와 만료 후 후속 경로.\n4. 약품 품절·추가 확인 필요·중복 재처방 요청 시 처리와 안내.\n5. 처방 목록·조제 진행 상세·보류 안내 배너·재처방/재상담 요청 화면의 연결.\n처방 발행을 조제 완료로 표시하지 말고, 예시 정책과 디자인 데모를 실제 처방 전달 시스템으로 간주하지 말아 줘.',
      },
      en: {
        domain: 'Healthcare, Clinic & Health Records',
        title: 'Prescription validity windows, pharmacy dispensing status and refill requests',
        summary: 'Separate prescription issuance from pharmacy pickup readiness, and connect expiration windows, holds and refill or renewal requests.',
        overview: 'An issued prescription is not the same as a bag of medication ready at the pharmacy counter. Distinguishing submission validity windows, pharmacy preparation states, stock or verification holds, and authorized refills versus clinician-reviewed renewals prevents wasted trips and duplicate requests. These concepts are design references, not regulatory defaults for a specific country.',
        concepts: [
          { name: 'Issued, received, ready-for-pickup and picked-up states', description: 'Track prescription issuance, pharmacy intake, active preparation, pickup readiness and completed pickup as distinct states.' },
          { name: 'Submission validity versus pickup holding windows', description: 'Separate the deadline to submit a newly issued prescription from the window to pick up a prepared order before restocking.' },
          { name: 'Dispensing holds and actionable reasons', description: 'Differentiate normal preparation time from holds caused by out-of-stock items, clarification requests or payment confirmation.' },
          { name: 'Authorized refills versus clinician renewal requests', description: 'Distinguish requesting a fill from remaining authorized refills versus asking a clinician to review and issue a new prescription.' },
        ],
        workflow: [
          { name: 'Show issuance details and expiration dates clearly', description: 'Display the issue date, submission deadline and pharmacy routing options as soon as the prescription is created.' },
          { name: 'Update intake, preparation and hold statuses', description: 'Reflect whether the pharmacy is preparing the order, waiting on stock/clarification, or ready for pickup.' },
          { name: 'Record pickup completion and link care instructions', description: 'Transition to picked-up upon collection and surface dosage schedule and storage notes.' },
          { name: 'Route expired or exhausted prescriptions to renewal', description: 'Disable direct refill actions when zero refills remain or the validity window has passed, and guide the user to a renewal or follow-up request.' },
        ],
        pitfalls: [
          { name: 'Labeling an issued prescription as ready for pickup', description: 'Sending visitors to the counter before the pharmacy has verified stock and finished preparation causes frustration.' },
          { name: 'Leaving submit or refill buttons active on expired prescriptions', description: 'Expired prescriptions should clearly state why they cannot be filled and offer the appropriate renewal or booking path.' },
          { name: 'Allowing duplicate renewal requests while one is pending', description: 'Show the pending review status instead of letting users submit repeated requests for the same medication.' },
        ],
        questions: [
          'How long is an issued prescription valid for submission, and what happens when it expires?',
          'Which pharmacy states (received, preparing, on hold, ready for pickup, picked up) are tracked and shown?',
          'How are out-of-stock holds or substitution checks communicated to the visitor?',
          'Does the service support both remaining refills and clinician-reviewed renewal requests?',
          'How long are prepared orders held before being returned to stock if unclaimed?',
        ],
        example: 'Example: a clinic app could display a 7-day submission window on new prescriptions, notify the visitor only when the pharmacy marks the order Ready for Pickup, and replace the refill button with a Pending Review badge while a renewal request is being evaluated. Confirm actual regulatory windows and pharmacy integration rules before adopting this setup.',
        relatedDesigns: [
          { id: 'dismissible-inline-banner', reason: 'A reference for surfacing expiration warnings or pharmacy hold reasons in an inline banner. Deadline calculation and notifications need separate implementation.' },
          { id: 'ly-expandable-data-rows', reason: 'A reference for expanding a prescription row to inspect line items, dosage notes and pickup timestamps. Real prescription lookup needs separate implementation.' },
        ],
        promptSnippet: 'Help design a prescription status, pharmacy dispensing and refill workflow. First confirm prescription validity windows, tracked dispensing states, hold reasons (stock or clarification), and the distinction between remaining refills and clinician renewal requests. Do not assume undecided rules.\nBased on the answers, describe:\n1. Information and actions visible to visitors, prescribing staff and pharmacy staff.\n2. Transitions across issued, received, preparing, on-hold, ready-for-pickup, picked-up and expired states.\n3. Display of submission deadlines, unclaimed pickup windows and post-expiry paths.\n4. Handling of stock holds, clarification requests and duplicate renewal submissions.\n5. How prescription lists, expandable detail rows, hold banners and renewal-request screens connect.\nDo not equate prescription issuance with pickup readiness, and do not mistake example policies or design demos for a real e-prescribing system.',
      },
    },
    sources: [
      { title: 'HL7 FHIR Specification — MedicationRequest and MedicationDispense', url: 'https://hl7.org/fhir/medicationrequest.html' },
      { title: 'NHS Digital — Electronic Prescription Service Tracker Guidance', url: 'https://digital.nhs.uk/services/electronic-prescription-service' },
    ],
  },
  {
    id: 'healthcare-test-result-review-before-release',
    aliases: {
      ko: ['검사 수치 검토 후 공개', '검진 결과지 참고 범위', '이상 수치 안내와 상담 연결', '검사 결과 정정 이력', '단계별 결과 발표'],
      en: ['lab result clinician review', 'test result release gating', 'reference range display', 'amended lab report version', 'staged result notification'],
    },
    useCases: {
      ko: [
        '장비에서 넘어온 원시 검사 수치와 담당자 검토·해설이 끝난 뒤 방문자에게 공개하는 상태를 분리할 때',
        '단일 수치가 아닌 정상 참고 범위·측정 단위·이전 회차 추이를 함께 표시할 때',
        '참고 범위를 벗어난 항목이 있을 때 불안만 키우지 않고 담당자 코멘트나 상담 예약 동선을 함께 보여 줄 때',
        '이미 공개된 검사 결과가 재검이나 오기입 수정으로 정정(Amended)될 때 수정본 표시와 재알림을 설계할 때',
      ],
      en: [
        'Separating raw preliminary lab values from clinician-reviewed results released to the visitor portal',
        'Displaying measurement units, normal reference ranges and historical trends alongside each value',
        'Pairing out-of-range indicators with reviewer commentary and follow-up scheduling actions',
        'Handling amended or corrected reports after initial release with clear revision notes',
      ],
    },
    keywords: {
      ko: ['검사 결과', '검진 리포트', '참고 범위', '측정 단위', '검토 후 공개', '결과 해설', '수치 추이', '결과 정정', '재검 안내'],
      en: ['test results', 'lab report', 'reference range', 'measurement unit', 'release review', 'reviewer note', 'historical trend', 'amended result'],
    },
    text: {
      ko: {
        domain: '헬스케어·진료·건강기록',
        title: '검사 수치 입력·담당자 검토 완료 후 공개와 참고 범위·정정 표시',
        summary: '수집 중인 원시 수치와 검토 완료된 공개 결과를 분리하고, 참고 범위·해설 코멘트·정정 이력을 연결합니다.',
        overview: '검진이나 검사 수치는 숫자가 시스템에 입력된 시점과 방문자에게 안내문과 함께 공개되는 시점이 다를 수 있습니다. 일부 항목만 먼저 나온 미완성 상태와 담당자 검토를 마친 공개 상태를 구분하고, 측정 단위·참고 범위·정정 여부를 명확히 표시해야 수치 오독을 줄일 수 있습니다. 아래 내용은 검사 결과 조회 흐름을 설계하기 위한 참고이며 특정 검사 항목의 판정 기준을 기본값으로 정하지 않습니다.',
        concepts: [
          { name: '검체 접수·분석 중·검토 대기·공개 완료 분리', description: '내부 시스템에 수치가 입력되었더라도 담당자 확인이나 해설 작성이 끝난 뒤 방문자 화면에 공개할지, 자동 공개 대상과 검토 후 공개 대상을 나눌지 정합니다.' },
          { name: '측정 단위·참고 범위와 이전 추이 병기', description: '숫자만 단독으로 보여 주지 않고 측정 단위, 연령·조건별 참고 범위, 직전 검사 대비 변화를 함께 제시합니다.' },
          { name: '참고 범위 이탈 표시와 후속 안내 연결', description: '참고 범위를 벗어난 수치를 표시할 때 담당자의 한 줄 해설이나 추가 상담·재검 예약 경로를 같은 자리에 연결합니다.' },
          { name: '공개 후 정정(Amended)과 버전 보존', description: '공개된 결과에 단위 수정이나 재검 반영이 생기면 기존 값을 소리 없이 덮어쓰지 않고 정정 배지·정정 일시·사유를 명시합니다.' },
        ],
        workflow: [
          { name: '검사 진행 단계와 예상 공개 시점 안내하기', description: '접수 완료·분석 중·결과 정리 중 단계를 보여 주어 아직 결과가 없는 이유와 예상 확인 시점을 알립니다.' },
          { name: '수치 검증과 해설 코멘트 연결하기', description: '내부 화면에서 단위·참고 범위·이상치를 확인하고 방문자용 요약 설명을 덧붙여 공개 상태로 전환합니다.' },
          { name: '참고 범위·추이와 후속 행동 표시하기', description: '방문자 화면에 항목별 수치·참고 범위·해설을 보여 주고, 필요한 경우 상담 예약이나 질문 남기기로 연결합니다.' },
          { name: '결과 정정 시 변경 안내와 재알림 보내기', description: '공개 후 수치가 정정되면 정정됨 표시와 함께 변경 사유를 남기고 방문자에게 갱신 알림을 발송합니다.' },
        ],
        pitfalls: [
          { name: '분석 전이나 미검토 빈칸을 숫자 0이나 정상으로 표시하기', description: '아직 결과가 입력되지 않은 항목은 미입력·집계 대기 상태로 두어야지 0으로 표시하면 오해가 생깁니다.' },
          { name: '측정 단위나 참고 범위 없이 숫자만 나열하기', description: '검사 기관이나 시점마다 단위와 기준 구간이 다를 수 있으므로 당시 적용된 참고 범위 스냅샷을 함께 저장·표시하세요.' },
          { name: '공개된 수치를 아무런 정정 표시 없이 조용히 바꾸기', description: '이미 결과를 확인한 방문자가 나중에 다른 숫자를 보면 신뢰가 깨집니다. 정정 일시와 이전 기록 구분을 남기세요.' },
        ],
        questions: [
          '검사 수치가 입력되면 즉시 자동 공개하나요, 담당자 검토 및 코멘트 등록 후 공개하나요?',
          '여러 검사 항목 중 일부만 먼저 완료되었을 때 부분 공개하나요, 전체 항목이 모인 뒤 한 번에 공개하나요?',
          '참고 범위를 벗어난 항목에는 어떤 시각 표시와 상담·재검 안내 동선을 함께 제공하나요?',
          '검사 시점의 참고 범위와 단위를 결과마다 스냅샷으로 보존하나요?',
          '이미 공개된 결과를 정정해야 할 때 이전 값 표기와 재알림 규칙은 어떻게 정하나요?',
        ],
        example: '예시: 종합검진 포털에서 혈액·영상 결과가 모두 입력되고 담당의 요약 소견이 등록된 뒤에만 방문자 화면에 공개 완료로 전환하며, 각 항목 옆에 참고 범위 막대와 이전 연도 비교값을 함께 표시하고, 사후 정정 시 정정 배지와 갱신 알림을 보내도록 구성할 수 있습니다. 실제 공개 시점과 항목별 기준은 기관 운영 기준에 맞게 먼저 확인해야 합니다.',
        relatedDesigns: [
          { id: 'ly-sortable-data-table', reason: '검사 항목별 수치·참고 범위·검사일을 표 형태로 정렬해 비교하는 표현에 참고할 수 있습니다. 실제 수치 판정과 데이터 조회는 별도로 구현해야 합니다.' },
          { id: 'vertical-rail-tabs', reason: '검진 리포트에서 요약 소견·세부 항목 수치·이전 추이를 탭으로 나누어 살펴보는 표현에 참고할 수 있습니다. 실제 결과 데이터 연동은 구현하지 않습니다.' },
        ],
        promptSnippet: '검사·검진 결과의 검토 후 공개·참고 범위 표시·정정 안내 흐름을 설계해 줘. 먼저 자동 공개와 담당자 검토 후 공개 구분, 부분 완료 시 공개 기준, 단위·참고 범위 스냅샷 보존, 범위 이탈 시 해설 및 상담 연결, 공개 후 정정(Amended) 표기 정책을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 방문자와 검토 담당자가 볼 상태·수치·소견 범위와 가능한 행동.\n2. 검사 접수·분석 중·검토 대기·부분 공개·전체 공개·정정됨 상태의 전환.\n3. 측정 단위, 참고 범위 스냅샷, 이전 회차 비교 및 미입력 항목 표기 규칙.\n4. 수치 정정·부분 지연·해설 누락 시 처리 방식과 재알림 규칙.\n5. 검사 진행 현황·요약 소견·항목별 결과 표·정정 내역·후속 상담 예약 화면의 연결.\n미입력 상태를 0이나 정상으로 표시하지 말고, 예시 정책과 디자인 데모를 실제 판정 시스템으로 간주하지 말아 줘.',
      },
      en: {
        domain: 'Healthcare, Clinic & Health Records',
        title: 'Test result verification, clinician sign-off before release, reference ranges and amendments',
        summary: 'Separate preliminary unreviewed values from released results, and connect reference ranges, reviewer notes and amendment notices.',
        overview: 'Raw values arriving from lab equipment are not always ready for immediate portal display without context. Distinguishing in-progress, awaiting-review, released and amended states—while preserving units, reference ranges and reviewer explanations—prevents misinterpretation. These concepts are design references, not clinical release mandates for a specific institution.',
        concepts: [
          { name: 'In-progress, awaiting-review and released states', description: 'Decide which test panels release automatically and which wait for a reviewer’s note or full-panel completion before becoming visible.' },
          { name: 'Units, reference-range snapshots and trends', description: 'Store and display the exact measurement unit and reference range active at test time alongside historical comparisons.' },
          { name: 'Contextualized out-of-range indicators', description: 'Pair out-of-range flags with plain-language reviewer notes and a clear path to book a follow-up consultation.' },
          { name: 'Amended reports and revision history', description: 'When a previously released value is corrected, mark the report as Amended with a timestamp and explanation rather than silently overwriting it.' },
        ],
        workflow: [
          { name: 'Show collection status and expected release window', description: 'Let visitors see whether samples are collected, in analysis or under final review instead of showing an empty table.' },
          { name: 'Verify values and attach reviewer summary notes', description: 'Allow staff to check units and outliers, attach a summary note and release the report.' },
          { name: 'Present values with ranges, trends and next steps', description: 'Render each metric with its unit, reference interval, prior value and any recommended follow-up action.' },
          { name: 'Issue explicit amendment notices on post-release edits', description: 'Record the correction reason, badge the updated row as Amended and notify the visitor when a released report changes.' },
        ],
        pitfalls: [
          { name: 'Rendering pending or uncollected sub-tests as 0 or normal', description: 'Keep pending items explicitly labeled as Pending rather than defaulting to zero.' },
          { name: 'Omitting units or reference intervals on numeric values', description: 'A bare number without its unit and reference range is ambiguous across labs and methods.' },
          { name: 'Silently mutating a report the visitor has already viewed', description: 'Always surface an Amended indicator and timestamp when updating released results.' },
        ],
        questions: [
          'Are results released immediately upon instrument upload or only after reviewer sign-off?',
          'When a multi-part panel finishes at different times, are partial results shown or held until complete?',
          'How are out-of-range values explained and connected to follow-up booking or messaging?',
          'Are units and reference intervals snapshotted per result record?',
          'How are post-release corrections (amendments) badged, logged and re-notified?',
        ],
        example: 'Example: a checkup portal could hold results in Awaiting Review until a summary note is attached, display each value with its unit, reference bar and prior-year comparison, and badge any later correction as Amended with a notification. Confirm actual release timing and reporting policies before adopting this setup.',
        relatedDesigns: [
          { id: 'ly-sortable-data-table', reason: 'A reference for sorting test items by name, value or date in a structured table. Real range evaluation and data queries need separate implementation.' },
          { id: 'vertical-rail-tabs', reason: 'A reference for switching between summary commentary, detailed panels and historical trends. Real report storage needs separate implementation.' },
        ],
        promptSnippet: 'Help design a test-result review, release and amendment workflow. First confirm auto-release versus reviewer sign-off rules, partial-panel visibility, unit and reference-range snapshotting, out-of-range follow-up guidance, and post-release amendment handling. Do not assume undecided rules.\nBased on the answers, describe:\n1. Views and actions available to visitors and reviewing staff.\n2. Transitions across collected, in-analysis, awaiting-review, partially-released, released and amended states.\n3. Display rules for units, snapshotted reference ranges, prior comparisons and pending rows.\n4. Handling of post-release amendments, delayed sub-tests and missing commentary.\n5. How status trackers, summary notes, result tables, amendment badges and follow-up booking connect.\nDo not display pending values as zero, and do not mistake example policies or design demos for a clinical reporting system.',
      },
    },
    sources: [
      { title: 'HL7 FHIR Specification — Observation and DiagnosticReport', url: 'https://hl7.org/fhir/diagnosticreport.html' },
      { title: 'MedlinePlus — How to Understand Your Lab Results', url: 'https://medlineplus.gov/lab-tests/how-to-understand-your-lab-results/' },
    ],
  },
  {
    id: 'healthcare-care-plan-medication-reminder-and-adherence',
    aliases: {
      ko: ['복약 알림 수행 기록', '건강 관리 루틴 체크', '미복용 사유와 지연 복용', '복약 시간대 스케줄 조정', '보호자 복약 확인 공유'],
      en: ['medication reminder schedule', 'adherence logging workflow', 'skipped dose reason tracking', 'snooze and late-dose window', 'care-plan routine checklist'],
    },
    useCases: {
      ko: [
        '아침·점심·저녁·취침 전 등 시간대별 복약·건강 루틴 알림과 수행 완료 체크를 설계할 때',
        '단순 미체크와 실제 건너뜀(미수행)·지연 수행·수행 중단을 구분해 기록할 때',
        '알림을 잠시 미루기(Snooze)할 수 있는 최대 시간과 다음 회차와 겹칠 때의 경고를 정할 때',
        '일정 변경이나 처방 종료 시 과거 수행 기록은 보존하고 앞으로의 예정 알림만 갱신할 때',
      ],
      en: [
        'Designing daily medication or care-routine reminders with completion check-offs',
        'Distinguishing unlogged slots from intentionally skipped, delayed or discontinued items',
        'Bounding snooze intervals so a delayed dose does not collide with the next scheduled slot',
        'Updating future schedules without overwriting historical adherence logs',
      ],
    },
    keywords: {
      ko: ['복약 알림', '복약 기록', '수행률', '건너뜀 사유', '알림 미루기', '복용 주기', '건강 루틴', '일정 종료', '이력 보존'],
      en: ['medication reminder', 'adherence log', 'skipped dose', 'snooze window', 'dosing schedule', 'care routine', 'schedule termination', 'history preservation'],
    },
    text: {
      ko: {
        domain: '헬스케어·진료·건강기록',
        title: '복약·건강 관리 일정 알림·수행 기록과 미수행/중단 구분',
        summary: '예정 알림과 실제 수행 기록을 분리하고, 지연 수행·건너뜀 사유·일정 변경 시 과거 이력 보존을 연결합니다.',
        overview: '복약이나 건강 루틴 관리에서는 알림이 울렸다는 것과 실제로 수행했다는 것이 다릅니다. 또한 바빠서 아직 기록하지 못한 상태, 의도적으로 건너뛴 상태, 늦게 수행한 상태를 구분하고, 루틴 시간이나 용량이 바뀔 때 과거 달성 기록이 함께 바뀌지 않도록 설계해야 합니다. 아래 내용은 복약·건강 루틴 기록 흐름을 설계하기 위한 참고이며 특정 복용 지침을 기본값으로 정하지 않습니다.',
        concepts: [
          { name: '예정·수행 완료·지연 수행·건너뜀·미기록 분리', description: '시간이 지났는데 체크하지 않은 미기록 상태를 자동으로 수행이나 건너뜀으로 단정하지 않고, 실제 수행 시각이나 건너뜀 사유를 구분해 남깁니다.' },
          { name: '알림 미루기(Snooze)와 회차 간 간격 경고', description: '알림을 30분·1시간 뒤로 미룰 때 다음 예정 회차와 너무 가까워지면 중복 수행 주의를 표시합니다.' },
          { name: '일정 규칙 변경과 과거 기록 스냅샷 보존', description: '하루 3회에서 2회로 줄이거나 루틴을 종료할 때, 변경 시점 이후의 예정 항목만 바꿀 뿐 지난주 수행률 분모와 기록은 그대로 유지합니다.' },
          { name: '일시 중단(Pause)과 종료 구분', description: '여행·검사 준비 등으로 며칠간 루틴 알림을 일시 중지하는 것과 전체 일정을 마치는 것을 구분합니다.' },
        ],
        workflow: [
          { name: '루틴 주기와 시간대별 알림 설정하기', description: '반복 요일·횟수·기준 시각과 시작일·종료일을 입력해 일일 수행 슬롯을 생성합니다.' },
          { name: '알림 수신 후 수행·미루기·건너뜀 기록하기', description: '한 번의 탭으로 수행 시각을 기록하거나, 미루기 또는 건너뜀(사유 선택)을 남깁니다.' },
          { name: '미기록 지난 항목 소급 입력 지원하기', description: '어제나 오늘 오전의 미기록 항목을 뒤늦게 체크할 때 실제 수행한 시각을 기준으로 기록할 수 있게 합니다.' },
          { name: '과거 수행 추이 확인과 일정 수정·종료하기', description: '주간·월간 수행 기록을 확인하고, 루틴 변경 시 앞으로 생성될 일정부터 새 규칙을 적용합니다.' },
        ],
        pitfalls: [
          { name: '루틴을 수정·삭제하면서 과거 수행 이력까지 함께 지우기', description: '복용이 끝난 항목을 목록에서 지웠다고 해서 지난달 수행 기록까지 사라지면 이력 조회가 불가능해집니다. 활성 일정과 과거 기록을 분리하세요.' },
          { name: '미기록 상태를 건너뜀(0%)과 구분하지 않기', description: '앱을 아직 열지 않은 것인지 실제로 건너뛴 것인지 구분해야 정확한 안내와 기록이 가능합니다.' },
          { name: '표준시(Timezone) 이동 시 알림 시각이 엉키기', description: '해외 이동 시 현지 시각 기준으로 울릴지 절대 시간 간격을 유지할지 기준을 명확히 표시하세요.' },
        ],
        questions: [
          '루틴은 매일 고정 시각인가요, 요일별·특정 일수 간격·필요시(수시) 기록도 포함하나요?',
          '알림 미루기(Snooze) 허용 횟수와 다음 회차 인접 시 안내 규칙은 어떻게 정하나요?',
          '미기록·수행 완료·지연 수행·건너뜀(사유 포함) 중 어떤 상태를 구분해 기록하나요?',
          '지난 날짜의 미기록 항목을 소급해서 수정할 수 있는 기한이 있나요?',
          '루틴을 수정하거나 종료할 때 과거 수행 통계와 예정 알림은 각각 어떻게 처리하나요?',
        ],
        example: '예시: 건강 루틴 앱에서 아침·저녁 복약 슬롯을 두고, 예정 시각 후 2시간까지 미루기를 허용하며, 체크 시 정시 수행·지연 수행·건너뜀을 구분해 기록하고, 루틴 종료 후에도 과거 달력 기록은 그대로 열람할 수 있도록 구성할 수 있습니다. 실제 알림 간격과 기록 항목은 서비스 목적에 맞게 먼저 확인해야 합니다.',
        relatedDesigns: [
          { id: 'onboarding-progress-checklist', reason: '오늘의 시간대별 복약·루틴 항목을 체크하고 남은 항목을 확인하는 표현에 참고할 수 있습니다. 실제 반복 스케줄 생성과 알림은 별도로 구현해야 합니다.' },
          { id: 'native-date-field', reason: '루틴 시작일·종료일이나 과거 기록 조회 날짜를 선택하는 표현에 참고할 수 있습니다. 실제 이력 저장과 집계는 구현하지 않습니다.' },
        ],
        promptSnippet: '복약·건강 관리 루틴의 일정 알림·수행 기록·건너뜀 및 일정 변경 흐름을 설계해 줘. 먼저 반복 주기 유형, 예정·수행·지연·건너뜀·미기록 상태 구분, 알림 미루기 한도와 회차 간격 안내, 소급 기록 허용 범위, 일정 수정/종료 시 과거 이력 보존 규칙을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 사용자(및 공유 대상자)가 볼 일일 루틴·이력 정보와 가능한 행동.\n2. 예정·미루기 중·수행 완료·지연 수행·건너뜀·미기록·일시 중단·종료 상태 전환.\n3. 루틴 수정·종료 시 과거 스냅샷 보존과 미래 슬롯 갱신 규칙.\n4. 연속 미루기로 다음 회차와 겹칠 때나 소급 입력 시 처리와 안내.\n5. 오늘의 루틴 체크리스트·알림/미루기 동작·건너뜀 사유 선택·주간 달성 달력·루틴 설정 화면의 연결.\n루틴 종료를 과거 기록 삭제로 처리하지 말고, 예시 정책과 디자인 데모를 실제 복약 지도 시스템으로 간주하지 말아 줘.',
      },
      en: {
        domain: 'Healthcare, Clinic & Health Records',
        title: 'Care-plan schedules, medication reminders, adherence logging and skipped-dose tracking',
        summary: 'Separate scheduled reminders from logged adherence states, and preserve historical logs when future routines change.',
        overview: 'Sending a reminder notification is not the same as confirming a completed health routine or medication dose. Distinguishing unlogged slots from on-time completion, late completion and intentional skips—while keeping historical logs immutable when a schedule is edited or ended—keeps adherence records reliable. These concepts are design references, not clinical dosing instructions.',
        concepts: [
          { name: 'Scheduled, taken, late, skipped and unlogged states', description: 'Do not conflate an unlogged past slot with an intentional skip; let users record actual completion time or a skip reason.' },
          { name: 'Snooze bounds and next-slot proximity warnings', description: 'Limit how far a reminder can be snoozed and warn if a delayed entry approaches the next scheduled slot.' },
          { name: 'Immutable historical logs across schedule edits', description: 'When a routine frequency changes or ends, update only future scheduled slots while preserving past completion denominators and logs.' },
          { name: 'Temporary pause versus routine completion', description: 'Separate pausing reminders for a few days from permanently ending a routine.' },
        ],
        workflow: [
          { name: 'Configure recurrence rules and reminder times', description: 'Define daily times, day-of-week patterns or interval schedules along with start and end dates.' },
          { name: 'Log completion, snooze or skip from the reminder', description: 'Let users mark a slot complete with one tap, snooze within safe bounds or log a skip with an optional note.' },
          { name: 'Support retroactive logging for unlogged past slots', description: 'Allow users to fill in yesterday’s or earlier unlogged slots with the actual time taken.' },
          { name: 'Review adherence trends and update future schedules', description: 'Show weekly or monthly completion summaries and apply schedule edits strictly forward in time.' },
        ],
        pitfalls: [
          { name: 'Deleting historical adherence records when a routine is removed', description: 'Ending or deleting an active routine should only stop future slots, not erase past adherence history.' },
          { name: 'Treating unlogged slots as confirmed skips', description: 'Distinguish slots the user has not yet interacted with from slots explicitly marked as skipped.' },
          { name: 'Breaking reminder intervals across timezone changes', description: 'Clarify whether schedules follow wall-clock local time or fixed hourly intervals when traveling.' },
        ],
        questions: [
          'What schedule patterns are needed (fixed daily times, specific days, interval-based or as-needed logging)?',
          'How long can a reminder be snoozed, and what happens when a snoozed slot nears the next scheduled time?',
          'Which adherence states (on time, late, skipped with reason, unlogged) are tracked?',
          'How far back can users retroactively log or edit past slots?',
          'When a routine is modified, paused or ended, how are past statistics and future reminders handled?',
        ],
        example: 'Example: a care-routine app could generate morning and evening slots, allow snoozing up to 2 hours, record on-time versus late or skipped entries, and preserve past calendar logs when a routine is marked completed. Confirm actual schedule rules and reminder channels before adopting this setup.',
        relatedDesigns: [
          { id: 'onboarding-progress-checklist', reason: 'A reference for checking off daily routine items and tracking remaining slots. Recurring schedule generation and notifications need separate implementation.' },
          { id: 'native-date-field', reason: 'A reference for picking start/end dates or inspecting past adherence dates. Persistence and trend calculation need separate implementation.' },
        ],
        promptSnippet: 'Help design a care-plan and medication-reminder adherence workflow. First confirm schedule recurrence types, tracked adherence states (taken, late, skipped, unlogged), snooze limits and proximity warnings, retroactive logging windows, and historical preservation when schedules change. Do not assume undecided rules.\nBased on the answers, describe:\n1. Daily checklist and history views and actions for the user (and any shared caregiver).\n2. Transitions across scheduled, snoozed, completed, late-completed, skipped, unlogged, paused and ended states.\n3. Rules for keeping past adherence logs intact when editing or ending a routine.\n4. Handling of overlapping snoozed slots, timezone shifts and retroactive edits.\n5. How the daily checklist, snooze/skip controls, adherence calendar and schedule-editor screens connect.\nDo not erase historical logs when a routine ends, and do not mistake example policies or design demos for clinical dosing advice.',
      },
    },
    sources: [
      { title: 'HL7 FHIR Specification — CarePlan and MedicationStatement', url: 'https://hl7.org/fhir/careplan.html' },
      { title: 'Apple Developer Documentation — HealthKit Medication Tracking', url: 'https://developer.apple.com/documentation/healthkit' },
    ],
  },
];
