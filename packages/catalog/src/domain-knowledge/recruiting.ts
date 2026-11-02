import type { DomainKnowledge } from '../domain-knowledge';

export const RECRUITING_KNOWLEDGE: DomainKnowledge[] = [{
  id: 'recruiting-pipeline-evaluation-and-notice',
  aliases: {
    ko: ['채용 사이트', '지원자 관리 시스템', 'ATS 채용', '채용 공고 전형 단계', '면접 평가표'],
    en: ['recruiting platform', 'applicant tracking system', 'ATS pipeline', 'job application stages', 'interview scorecards'],
  },
  useCases: {
    ko: ['채용 공고 게시와 입사 지원 접수를 받는 서비스를 만들 때', '서류·과제·면접·처우 협의·합격 등 전형 단계를 관리할 때', '면접관 내부 평가표와 지원자에게 안내되는 전형 결과를 분리할 때', '중복 지원 방지·지원 취소·공고 마감 후 처리를 설계할 때'],
    en: ['Building a job board or applicant tracking system (ATS)', 'Managing candidate pipeline stages across screening, interviews and offers', 'Separating internal interviewer scorecards from candidate-facing status notices', 'Designing duplicate-application rules, withdrawal and job-closing behavior'],
  },
  keywords: {
    ko: ['채용', '지원 관리', 'ATS', '채용 공고', '입사 지원', '지원자', '전형 단계', '서류 전형', '면접', '평가표', '합격 통보', '지원 취소', '채용 마감'],
    en: ['recruiting', 'applicant tracking', 'ATS', 'job posting', 'job application', 'candidate', 'pipeline stage', 'screening', 'interview', 'scorecard', 'offer', 'withdrawal', 'job closure'],
  },
  text: {
    ko: {
      domain: '채용·지원 관리',
      title: '공고 마감·전형 단계 이동·내부 평가와 결과 안내 분리',
      summary: '내부 전형 평가와 지원자 화면의 결과 공개 시점을 분리하고, 공고·지원서·단계 이동을 연결합니다.',
      overview: '채용 서비스에서는 채용 담당자와 면접관이 내부에서 논의하는 단계와 지원자에게 실제로 안내되는 결과가 동시에 움직이지 않습니다. 내부 평가표가 작성되었다고 해서 지원자 화면에 즉시 합격·불합격이 노출되면 운영 사고로 이어집니다. 공고 상태, 지원서 접수, 전형 단계 이동, 면접관 간 열람 범위, 최종 결과 통보 시점을 분리해 설계해야 합니다. 아래 내용은 채용·지원 관리 흐름을 설계하기 위한 참고이며 특정 기업의 전형 절차나 서류 보관 기간을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '채용 공고 상태와 기존 지원자 유지', description: '공고 준비·접수 중·접수 마감·채용 완료를 구분합니다. 신규 접수를 마감하더라도 이미 접수된 지원자의 전형 진행과 열람은 계속 이어져야 합니다.' },
        { name: '전형 단계(Pipeline)와 이동 규칙', description: '서류 검토·실무 면접·임원 면접·처우 협의·최종 합격·불합격·지원 취소 단계를 구분합니다. 단계 건너뛰기나 이전 단계 되돌리기를 허용할지 정합니다.' },
        { name: '내부 평가 기록과 외부 결과 통보 분리', description: '내부에서 불합격으로 판정한 상태와 지원자에게 결과 안내를 발송해 지원자 조회 화면에 공개한 상태를 엄격히 분리합니다.' },
        { name: '평가자 역할별 열람 제한(Blind evaluation)', description: '면접관이 자신의 평가표를 등록하기 전에 다른 면접관의 점수를 볼 수 있게 할지, 희망 연봉·민감 정보를 인사 담당자에게만 열람하게 할지 구분합니다.' },
        { name: '중복 지원·재지원과 서류 보관 기간', description: '같은 공고에 중복 접수를 막을지, 지원 취소 후 재지원을 허용할지, 전형 종료 후 이력서와 첨부 서류를 얼마 동안 보관·파기할지 정합니다.' },
      ],
      workflow: [
        { name: '공고 게시와 지원서 접수 확인하기', description: '모집 분야·필수 서류·접수 기한을 안내하고, 지원 완료 시 접수 확인과 지원 내역 조회 방법을 제공합니다.' },
        { name: '전형 단계 분류와 평가자 배정하기', description: '지원자를 전형 단계별로 조회하고, 담당 면접관을 배정해 서류와 평가 기준표를 연결합니다.' },
        { name: '내부 평가 취합과 합격·불합격 확정하기', description: '평가자별 의견과 등급을 모아 다음 단계 이동 또는 최종 결정을 내리되, 통보 전까지는 내부 상태로만 유지합니다.' },
        { name: '결과 안내 발송과 외부 상태 동기화하기', description: '담당자가 결과 안내를 발송하는 시점에 지원자 조회 화면의 상태와 안내 메시지를 함께 갱신합니다.' },
      ],
      pitfalls: [
        { name: '내부 전형 단계 변경을 지원자 조회 화면에 즉시 노출하기', description: '담당자가 후보자를 비교하며 임시로 불합격 열에 옮겼는데 지원자에게 바로 불합격으로 보이면 큰 혼란이 생깁니다. 내부 단계와 대외 통보 상태를 분리하세요.' },
        { name: '공고를 마감·수정하면서 기존 지원서의 기준 정보를 덮어쓰기', description: '공고 문구나 질문을 나중에 고쳐도 이미 접수된 지원자가 당시 응답한 질문과 첨부 서류 원문은 그대로 보존되어야 합니다.' },
        { name: '면접관에게 처우·연봉 등 불필요한 민감 권한까지 모두 열기', description: '평가에 필요한 이력서·포트폴리오 열람 권한과 채용 조건·개인 식별 정보 열람 권한은 역할에 따라 나누어 설계하세요.' },
      ],
      questions: [
        '지원자는 로그인 후 지원하나요, 비로그인 상태에서 이메일·확인 번호로 지원하고 조회하나요?',
        '기본 전형 단계는 어떻게 구성되며, 공고마다 전형 단계를 다르게 설정하거나 단계를 건너뛸 수 있나요?',
        '면접관은 다른 면접관의 평가표를 언제 볼 수 있으며, 연봉·처우 정보는 누구에게만 공개하나요?',
        '내부 합격·불합격 결정과 지원자에게 결과를 공개·통보하는 시점은 어떻게 분리하나요?',
        '같은 공고에 중복 지원이나 지원서 접수 후 수정·지원 취소를 허용하나요?',
        '공고 마감 후 미처리 지원자 안내와 불합격자 서류 파기·인재풀 보관 동의는 어떻게 다루나요?',
      ],
      example: '예시: 채용 관리 도구에서 전형 단계를 서류·1차 면접·2차 면접·최종 제안으로 두고, 면접관은 본인 평가표를 작성한 뒤에만 다른 면접관 의견을 열람할 수 있으며, 지원자 화면에는 인사 담당자가 결과 안내를 발송한 뒤에만 전형 결과가 반영되도록 구성할 수 있습니다. 실제 전형 단계·권한 범위·보관 기간은 채용 운영 정책에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'faceted-filter-chips', reason: '지원자 목록에서 전형 단계나 검토 완료 조건을 칩으로 조합해 좁혀 보는 표현에 참고할 수 있습니다. 실제 지원자 검색과 권한 필터링은 별도로 구현해야 합니다.' },
        { id: 'vertical-rail-tabs', reason: '지원자 상세 화면에서 지원서·포트폴리오·면접 평가표를 세로 탭으로 전환하며 살펴보는 표현에 참고할 수 있습니다. 실제 서류 열람과 평가 저장은 구현하지 않습니다.' },
      ],
      promptSnippet: '채용·지원 관리(ATS) 서비스의 공고·지원 접수·전형 단계·면접 평가·결과 통보 흐름을 설계해 줘. 먼저 지원 방식과 중복 지원 규칙, 전형 단계 구성, 면접관과 인사 담당자의 열람 권한 분리, 내부 평가 확정과 지원자 대외 결과 공개 시점의 분리, 지원 취소 및 서류 보관 정책을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 지원자·면접관·인사 담당자별 열람 가능 정보(이력서·평가표·처우)와 가능한 행동.\n2. 공고 상태, 지원서 내부 전형 단계, 대외 결과 통보 상태의 구분과 전환 조건.\n3. 면접 평가표 등록, 다른 평가자 의견 열람 조건, 단계 이동 및 되돌리기 규칙.\n4. 중복 지원·지원 취소·공고 마감·결과 발송 실패 시 처리 방식과 안내.\n5. 채용 공고·지원서 작성·지원자 파이프라인 목록·지원자 상세(서류/평가 탭)·결과 통보 화면의 연결.\n내부 전형 단계 변경을 지원자에게 즉시 노출하거나 모든 면접관에게 동일 권한을 가정하지 말고, 예시 정책과 디자인 데모를 실제 채용 관리 시스템으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Recruiting & ATS',
      title: 'Job posting closure, pipeline stages, internal scorecards and candidate notices',
      summary: 'Separate internal hiring stages and scorecards from candidate-facing status releases, and connect postings, applications and reviews.',
      overview: 'In a recruiting system, internal recruiter stage changes and interviewer scorecards must not leak immediately to a candidate’s status portal. Separating job posting state, application snapshots, internal pipeline stages, role-based access to compensation or peer reviews, and explicit candidate result notices prevents accidental disclosures. These concepts are design references, not default hiring workflows or data-retention rules for a specific company.',
      concepts: [
        { name: 'Job posting state versus active applications', description: 'Distinguish preparing, open, closed-to-new-applicants and filled postings so closing a job stops new applications without breaking ongoing candidate reviews.' },
        { name: 'Pipeline stages and transition rules', description: 'Define stages such as Screening, Technical Interview, Final Round, Offer, Hired, Rejected and Withdrawn, and whether stages can be skipped or reversed.' },
        { name: 'Internal decision state versus candidate-visible status', description: 'Strictly separate an internal rejection or advance decision from the candidate-facing notice that is released only when the recruiter sends the update.' },
        { name: 'Role-based access and blind scorecards', description: 'Decide whether interviewers must submit their own scorecard before seeing peer evaluations, and restrict compensation or sensitive notes to authorized roles.' },
        { name: 'Duplicate applications, withdrawal and retention', description: 'Define rules for duplicate applications to the same role, candidate self-withdrawal, and when unsuccessful application files are purged or kept with consent.' },
      ],
      workflow: [
        { name: 'Publish postings and snapshot applications', description: 'State role requirements and required documents clearly, and preserve the exact questions and files attached at the time of application.' },
        { name: 'Route candidates across stages and assign reviewers', description: 'Filter candidates by stage, assign interviewers and attach the right evaluation rubric to each interview step.' },
        { name: 'Collect scorecards and record internal decisions', description: 'Gather structured evaluations from interviewers and record stage advances or rejections internally before notifying the candidate.' },
        { name: 'Release candidate notices and handle closures', description: 'Update the candidate-facing status only when the official notice is sent, and ensure all remaining applicants receive closure when a role is filled.' },
      ],
      pitfalls: [
        { name: 'Exposing internal stage drags directly on the candidate portal', description: 'If moving a candidate to a rejected column immediately updates their public status before a notice is reviewed and sent, candidates receive premature or mistaken updates.' },
        { name: 'Mutating historical applications when a job posting is edited', description: 'Editing screening questions on a live posting should not overwrite or misalign answers already recorded by earlier applicants.' },
        { name: 'Granting every interviewer access to salary and private HR notes', description: 'Separate access to resumes and interview rubrics from compensation history and offer terms.' },
      ],
      questions: [
        'Do candidates apply with an account or via email and a lookup token, and can they edit or withdraw an application after applying?',
        'What are the pipeline stages, and can recruiters customize stages per job or skip stages?',
        'Can interviewers see other interviewers’ scorecards before recording their own, and who can view compensation details?',
        'How is an internal stage decision separated from releasing a status update or email notice to the candidate?',
        'How are duplicate applications to the same role or re-applications handled?',
        'When a job closes, how are remaining active candidates notified and when are candidate documents purged?',
      ],
      example: 'Example: an ATS could use four stages (Screening, First Interview, Final Interview, Offer), hide peer scorecards until an interviewer records their own evaluation, and keep candidate portal status as Under Review until HR explicitly sends the outcome notice. Confirm actual stages, permission boundaries and retention rules before adopting this setup.',
      relatedDesigns: [
        { id: 'faceted-filter-chips', reason: 'A reference for narrowing candidate lists by stage or review condition using filter chips. Real candidate search and role permissions need separate implementation.' },
        { id: 'vertical-rail-tabs', reason: 'A reference for switching between a candidate’s resume, portfolio and interview scorecard in a detail panel. Document viewing and evaluation storage need separate implementation.' },
      ],
      promptSnippet: 'Help design a recruiting and applicant-tracking (ATS) workflow. First confirm candidate intake and duplicate rules, pipeline stages, permission boundaries between interviewers and HR, separation between internal decisions and candidate-visible notices, and withdrawal/retention policies. Do not assume undecided rules.\nBased on the answers, describe:\n1. Information and actions available to candidates, interviewers and recruiters/HR.\n2. Distinct states for job postings, internal candidate pipeline stages and candidate-facing notice statuses.\n3. Scorecard collection, blind-review rules and stage transition or rollback behavior.\n4. Handling of duplicate applications, candidate withdrawals, job closures and failed notice deliveries.\n5. How job postings, application forms, pipeline lists, candidate detail tabs and outcome-notice screens connect.\nDo not expose internal stage changes directly to candidates before notice release, and do not mistake example policies or design demos for a real ATS backend.',
    },
  },
  sources: [
    { title: 'Greenhouse Support — Job stages and interview kit overview', url: 'https://support.greenhouse.io/hc/en-us/articles/200723264' },
    { title: 'Workable Help Center — Moving candidates in the pipeline', url: 'https://help.workable.com/hc/en-us/articles/115012795408' },
  ],
}, {
  id: 'recruiting-interview-scheduling-and-panel-availability',
  aliases: {
    ko: ['면접 일정 조율', '면접관 가능 시간 투표', '후보자 면접 시간 선택', '면접관 변경 재조율'],
    en: ['interview scheduling flow', 'panel interviewer availability', 'candidate time-slot booking', 'interview rescheduling'],
  },
  useCases: {
    ko: ['지원자에게 여러 후보 시간대를 보내고 직접 면접 일정을 선택·확정하게 할 때', '복수 면접관(Panel)이 함께 들어가는 면접의 교집합 가능 시간과 회의실·화상 링크를 맞출 때', '확정된 면접에 특정 면접관이 불참하게 되어 대타 면접관으로 교체하거나 일정을 재조율할 때', '해외 거주 지원자와의 표준시(Timezone) 차이 표시와 후보 시간 만료·선착순 충돌을 막을 때'],
    en: ['Sending candidate self-scheduling links or proposed interview time slots', 'Matching combined calendar availability across a multi-interviewer panel and meeting room', 'Handling interviewer substitutions versus full rescheduling when a panelist has a conflict', 'Displaying explicit timezones and preventing double-booked slots across multiple candidates'],
  },
  keywords: {
    ko: ['면접 일정', '일정 조율', '후보 시간 제안', '면접관 배정', '패널 면접', '대타 면접관', '일정 변경', '화상 면접 링크', '표준시 표시'],
    en: ['interview scheduling', 'slot proposal', 'panel availability', 'interviewer substitution', 'rescheduling', 'calendar invite', 'video interview link', 'timezone display', 'slot conflict'],
  },
  text: {
    ko: {
      domain: '채용·지원 관리',
      title: '면접 일정 후보 시간 제안·면접관 변경과 일정 재조율 흐름',
      summary: '복수 면접관의 가능 시간과 후보자 시간대 선택을 연결하고, 면접관 교체와 전체 일정 재조율을 구분합니다.',
      overview: '면접 일정 조율은 지원자 한 명과 면접관 한두 명의 일정을 맞추는 수준을 넘어, 여러 면접관의 교집합 시간 확보, 동시간대 다른 지원자와의 슬롯 겹침 방지, 확정 후 면접관 불참 시 대타 투입과 일정 재조율의 구분까지 다뤄야 합니다. 특히 확정된 면접에서 내부 면접관 한 명만 바뀔 때 지원자에게까지 불필요한 취소 알림이 가지 않게 내부 배정 변경과 일정 시간 변경을 분리해야 합니다. 아래 내용은 면접 일정 조율 흐름을 설계하기 위한 참고이며 특정 캘린더 연동이나 면접 시간을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '후보 시간 제안(Slot proposal)과 확정 잠금', description: '제안 대기 → 지원자 선택(또는 시간 역제안) → 일정 확정 → 변경/취소 상태를 구분하고, 확정되는 순간 다른 지원자에게 열려 있던 동일 시간 슬롯을 잠급니다.' },
        { name: '복수 면접관(Panel) 필수·대체 가능 역할 구분', description: '모두 반드시 참석해야 하는 필수 면접관과 같은 직군 풀에서 1명만 들어가도 되는 대체 가능 면접관을 구분해 가능 시간 계산과 대타 교체를 유연하게 합니다.' },
        { name: '내부 면접관 교체(Substitution)와 일정 시간 변경(Reschedule) 분리', description: '면접 시각과 화상 링크는 그대로 둔 채 내부 면접관만 교체하는 경우와, 지원자와 약속한 날짜·시각 자체를 다시 잡는 경우를 분리합니다.' },
        { name: '표준시(Timezone) 명시와 준비·정리 여유 시간(Buffer)', description: '지원자와 면접관 화면 모두에 기준 표준시를 함께 표기하고, 연속 면접 사이에 평가표 작성용 여유 시간을 둘 수 있게 합니다.' },
      ],
      workflow: [
        { name: '면접 시간·방식(대면/화상)과 참여 면접관 지정하기', description: '면접 소요 시간, 대면 회의실 또는 화상 면접 여부, 참석할 면접관 조합과 제안할 후보 시간대를 설정합니다.' },
        { name: '지원자 시간 선택 또는 가능 시간 회신받기', description: '지원자가 안내받은 후보 시간 중 하나를 선택하거나 가능한 모든 시간을 체크해 보내고, 맞는 시간이 없으면 대체 일정을 요청하게 합니다.' },
        { name: '일정 확정과 캘린더 초대·면접 키트 연결하기', description: '시간이 확정되면 지원자에게는 일시·장소/접속 링크를 보내고, 면접관에게는 이력서와 평가표 링크가 담긴 내부 초대를 별도로 보냅니다.' },
        { name: '면접관 교체 또는 일정 재조율 처리하기', description: '면접관 사정이 생기면 동일 시간대 대체 면접관으로 내부 배정만 바꿀지, 기존 일정을 취소하고 새 후보 시간을 보낼지 선택합니다.' },
      ],
      pitfalls: [
        { name: '면접관용 내부 초대장을 지원자에게 그대로 공유해 평가표 링크나 내부 메모 노출하기', description: '지원자용 안내와 면접관용 내부 초대는 포함 정보가 다릅니다. 지원자에게는 내부 평가 링크나 다른 면접관 비공개 메모가 보이지 않게 분리하세요.' },
        { name: '여러 지원자에게 같은 시간 슬롯을 동시에 열어 두고 중복 확정을 막지 않기', description: 'A 지원자가 화요일 2시를 확정했는데 B 지원자 선택 화면에서도 화요일 2시가 그대로 눌리면 면접관 일정이 겹칩니다. 선택 시점에 실시간 가능 여부를 검증하세요.' },
        { name: '면접관 한 명만 내부에서 바뀌었는데 지원자에게 면접 취소 알림을 보내 놀라게 하기', description: '면접 시각과 접속 링크가 그대로라면 내부 면접관 초대만 갱신하고 지원자 일정은 유지해야 혼선을 줄일 수 있습니다.' },
      ],
      questions: [
        '지원자가 열린 시간 슬롯 중 하나를 골라 즉시 확정하나요, 아니면 지원자가 선호 시간을 여러 개 고른 뒤 채용 담당자가 최종 확정하나요?',
        '여러 지원자에게 동시에 같은 후보 시간대를 보냈을 때, 먼저 선택한 지원자가 있으면 나머지 지원자 화면에서는 어떻게 처리하나요?',
        '확정된 면접에 특정 면접관이 참석할 수 없게 되면 같은 시간대 다른 면접관으로 내부 교체만 가능한가요, 일정 전체를 재조율해야 하나요?',
        '지원자가 제안된 모든 시간에 참석하기 어렵거나 확정 후 일정 변경을 요청할 때 마감 기한(예: 면접 24시간 전)과 절차는 어떻게 되나요?',
        '지원자용 안내장과 면접관용 초대장에 각각 어떤 정보(면접관 실명/직무 노출 여부, 화상 링크, 평가표 링크)를 포함하나요?',
      ],
      example: '예시: 실무 면접 조율 시 채용 담당자가 60분 단위 후보 시간 5개를 보내 지원자가 선택 즉시 확정되게 하되, 지원자용 일정 안내와 면접관용 평가 키트 초대를 분리 발송하고, 면접관 불참 시 동일 시간대 대타 면접관 교체는 지원자 일정 취소 없이 내부 초대만 변경하도록 구성할 수 있습니다. 실제 슬롯 선점 규칙·면접관 실명 공개 여부·변경 마감 시간은 채용 운영 기준에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'ly-time-grid-agenda', reason: '면접관들의 가능 시간대와 예정된 면접 일정을 시간 격자에서 비교·배치하는 표현에 참고할 수 있습니다. 실제 캘린더 연동과 중복 예약 잠금은 별도로 구현해야 합니다.' },
        { id: 'native-date-field', reason: '후보 면접 날짜 범위를 달력 입력으로 고르는 표현에 참고할 수 있습니다. 실제 표준시 변환과 슬롯 생성은 구현하지 않습니다.' },
      ],
      promptSnippet: '채용 면접 일정 후보 시간 제안·복수 면접관 배정·일정 확정 및 재조율 흐름을 설계해 줘. 먼저 지원자 즉시 확정 방식과 담당자 최종 확정 방식의 구분, 복수 지원자 간 동일 시간 슬롯 충돌 방지 규칙, 지원자 안내장과 면접관 내부 초대장의 정보 분리, 면접관 불참 시 내부 대타 교체와 전체 일정 재조율의 구분, 일정 변경/취소 마감 기준을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 후보 시간 제안 대기·지원자 선택·일정 확정·면접관 내부 교체·일정 재조율 요청·면접 취소 상태 전환.\n2. 복수 면접관(필수 참석 vs 대체 가능 풀) 가능 시간 교집합과 면접 간 여유 시간(Buffer)·표준시 표시 규칙.\n3. 지원자용 안내(일시·장소/화상 링크)와 면접관용 초대(이력서·평가표 링크)의 엄격한 분리.\n4. 동시 슬롯 선택 충돌 시 재선택 안내 및 제안된 모든 시간이 불가할 때의 대체 시간 요청 흐름.\n5. 날짜 선택·면접관 시간 격자 아젠다·지원자 슬롯 선택 화면·면접관 교체/일정 변경 화면의 연결.\n면접관 내부 평가 링크를 지원자 초대장에 섞거나 내부 면접관 교체만으로 지원자에게 면접 취소 알림을 보내지 말고, 예시 정책과 디자인 데모를 실제 캘린더 연동 엔진으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Recruiting & ATS',
      title: 'Interview slot proposals, interviewer substitutions and rescheduling flows',
      summary: 'Connect panel interviewer availability with candidate slot booking, and separate internal interviewer substitutions from full reschedules.',
      overview: 'Coordinating interviews requires matching multiple panelists’ calendars, preventing two candidates from booking the same slot simultaneously, and keeping internal evaluation kits hidden from the candidate’s calendar invite. Just as importantly, replacing an unavailable panelist at the same interview time should update internal calendar invites without alarming the candidate with a canceled-interview notice. These concepts are design references, not default calendar integrations or scheduling policies.',
      concepts: [
        { name: 'Proposed slots, candidate booking and slot locking', description: 'Track scheduling through proposed, candidate-selected, confirmed, reschedule-requested and canceled states, locking a time slot the moment it is claimed.' },
        { name: 'Required panelists versus interchangeable interviewer pools', description: 'Distinguish required hiring managers from interchangeable peer-interviewer pools so the schedule can either compute strict intersection times or swap an available peer.' },
        { name: 'Internal interviewer substitution versus candidate reschedule', description: 'Separate swapping an interviewer on an already-confirmed time slot (internal-only update) from changing the interview date or time with the candidate.' },
        { name: 'Explicit timezone display and interview buffer windows', description: 'Show timezones clearly on both candidate and interviewer views and support buffer minutes between back-to-back interviews for scorecard writing.' },
      ],
      workflow: [
        { name: 'Configure interview duration, format and panel members', description: 'Select the interview length, room or video link type, required panelists and candidate-facing time slots to propose.' },
        { name: 'Let the candidate pick a slot or request alternative times', description: 'Allow the candidate to select an available time in their local timezone or indicate that none of the proposed slots work.' },
        { name: 'Issue separate candidate and interviewer invitations', description: 'Send the candidate only the time, format and join instructions while sending interviewers the internal invite with resume and scorecard links.' },
        { name: 'Substitute a panelist or trigger a reschedule flow', description: 'If a panelist drops out, let the coordinator either reassign an available replacement interviewer silently or propose new times to the candidate.' },
      ],
      pitfalls: [
        { name: 'Putting internal scorecard links or private recruiter notes on the candidate’s shared calendar invite', description: 'A single shared calendar event exposes internal ATS links and attendee emails to the candidate. Maintain separate candidate and internal panel invites.' },
        { name: 'Allowing two candidates to confirm the same open interviewer slot concurrently', description: 'When sending self-scheduling links to multiple candidates, validate availability atomically on submission and hide claimed slots immediately.' },
        { name: 'Sending a cancellation notice to the candidate when only an internal panelist is swapped', description: 'If the interview time and video link stay the same, swapping Panelist A for Panelist B should only update the internal panel assignments.' },
      ],
      questions: [
        'Does a candidate’s slot selection confirm the interview immediately, or does the candidate submit multiple preferred windows for recruiter confirmation?',
        'When self-scheduling links are sent to several candidates at once, how are slots locked so two candidates cannot book the same interviewer window?',
        'When a confirmed interviewer has a conflict, can coordinators swap in a replacement interviewer without notifying or rescheduling the candidate?',
        'What happens if none of the proposed slots work for the candidate, or if the candidate needs to reschedule close to the interview start time?',
        'Which details (such as interviewer names, titles or video links) are shown to the candidate versus kept only on the internal panel invite?',
      ],
      example: 'Example: a recruiting tool could let coordinators propose five 60-minute slots with timezone labels, confirm immediately when the candidate picks a still-open slot, generate separate candidate and panel calendar invites, and allow swapping an unavailable peer interviewer internally without canceling the candidate’s meeting link. Confirm actual calendar-sync rules, panel disclosure policies and reschedule cutoffs before adopting this setup.',
      relatedDesigns: [
        { id: 'ly-time-grid-agenda', reason: 'A reference for viewing interviewer availability and scheduled interview blocks across a time grid. Calendar syncing and slot locking need separate implementation.' },
        { id: 'native-date-field', reason: 'A reference for choosing proposed interview dates with a native date input. Timezone conversion and slot generation need separate implementation.' },
      ],
      promptSnippet: 'Help design a recruiting interview-scheduling, panel-availability and rescheduling workflow. First confirm instant candidate booking versus recruiter confirmation, concurrency locking across multiple candidates, separation between candidate invites and internal interviewer invites, panelist substitution versus full rescheduling, and candidate reschedule cutoffs. Do not assume undecided rules.\nBased on the answers, describe:\n1. Scheduling states across proposed, candidate-selected, confirmed, panelist-substituted, reschedule-requested and canceled.\n2. Panel availability rules (required vs pooled interviewers), inter-interview buffers and explicit timezone formatting.\n3. Strict separation between candidate-facing meeting details and internal interviewer packets (resumes, rubrics, private notes).\n4. Handling concurrent slot claims and candidate fallback when no proposed times fit.\n5. How date pickers, panel time-grid agendas, candidate slot-selection screens and substitution/reschedule dialogs connect.\nDo not leak internal scorecard links on candidate invites or cancel a candidate’s interview when only swapping an internal panelist, and do not mistake example policies or design demos for a real calendar-sync backend.',
    },
  },
  sources: [
    { title: 'Greenhouse Support — Schedule interviews and manage interviewer availability', url: 'https://support.greenhouse.io/hc/en-us/articles/360025568611' },
    { title: 'Lever Help Center — Candidate self-scheduling and interview panel replacement', url: 'https://help.lever.co/hc/en-us/articles/20087429992093-Scheduling-interviews-with-Easy-Book-links' },
  ],
}, {
  id: 'recruiting-referral-agency-and-source-attribution',
  aliases: {
    ko: ['사내 추천 채용', '헤드헌터 에이전시 후보자 등록', '중복 추천 소유권 기한', '채용 수수료 보상 정산'],
    en: ['employee referral tracking', 'recruiting agency submission', 'candidate ownership window', 'referral bonus and agency fee'],
  },
  useCases: {
    ko: ['임직원 사내 추천과 외부 서치펌(헤드헌터·에이전시) 후보자 등록 경로를 운영할 때', '이미 지원했거나 다른 사람이 먼저 추천한 후보자가 중복 접수될 때 최초 추천 귀속(소유권) 기한을 판별할 때', '추천 임직원·에이전시에게 보여 줄 전형 진행 상태와 비공개로 가려야 할 세부 평가·처우 정보를 나눌 때', '최종 입사 후 근속 일수(예: 수습 통과·90일 재직) 충족 시점에 추천 보상금·수수료 지급 대상을 확정할 때'],
    en: ['Accepting candidate submissions from employee referrals and external recruiting agencies', 'Resolving duplicate candidate ownership when a candidate is already in the database or submitted by multiple sources', 'Limiting what referrers and external agencies can see about a candidate’s interview feedback and offer details', 'Tracking post-hire retention milestones (such as 90 days of employment) for referral bonus or agency fee eligibility'],
  },
  keywords: {
    ko: ['사내 추천', '헤드헌터', '에이전시 포털', '후보자 귀속', '중복 후보자', '소유권 유효 기간', '추천 보상금', '채용 수수료', '재직 조건'],
    en: ['employee referral', 'recruiting agency', 'headhunter portal', 'source attribution', 'duplicate candidate', 'ownership window', 'referral bonus', 'placement fee', 'retention period'],
  },
  text: {
    ko: {
      domain: '채용·지원 관리',
      title: '사내 추천·헤드헌터(에이전시) 후보자 등록·중복 추천 귀속과 수수료 기준',
      summary: '사내 추천·에이전시·직접 지원의 최초 귀속과 유효 기간을 판별하고, 제한된 진행 현황 공유와 입사 후 보상 조건을 연결합니다.',
      overview: '한 명의 후보자가 채용 사이트로 직접 지원하면서 동시에 지인 사내 추천이나 헤드헌터 추천으로도 들어오는 일이 빈번합니다. 누가 먼저 등록했는지와 기존 지원 이력의 인정 유효 기간(소유권 기간)을 명확히 해 중복 추천 분쟁을 막고, 에이전시가 후보자 동의 없이 이력서만 대량 등록하는 일을 방지하며, 추천인·에이전시에게는 내부 면접 점수나 연봉 협상 내용을 노출하지 않고 큰 단계만 보여 주어야 합니다. 아래 내용은 사내 추천·에이전시 귀속 흐름을 설계하기 위한 참고이며 특정 기업의 추천 보상금이나 수수료율을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '유입 경로(직접 지원·사내 추천·에이전시)와 최초 귀속(Source Attribution)', description: '후보자가 어떤 경로로 처음 접수되었는지 시각과 함께 기록하고, 이후 다른 경로로 같은 후보자가 들어왔을 때 기존 귀속이 우선하는지 판별합니다.' },
        { name: '후보자 소유권 유효 기간(Ownership window)과 후보자 본인 확인', description: '과거 지원·추천 후 일정 기간(예: 6개월·12개월) 안에는 기존 경로의 귀속을 유지할지 정하고, 에이전시·추천 접수 시 후보자 본인의 지원 동의를 확인합니다.' },
        { name: '추천인·에이전시용 제한된 진행 상태 공유', description: '사내 추천인이나 외부 에이전시에게는 서류 검토·면접 진행·종료 정도의 요약 상태만 보여 주고, 면접관 평가표·불합격 상세 사유·처우 조건은 가립니다.' },
        { name: '입사 확정·최소 근속 기간 충족과 보상·수수료 자격', description: '단순 합격 통보가 아니라 실제 입사일(Start date) 도래와 약정된 최소 재직 기간(보증 기간) 경과 여부를 기준으로 추천 보상금·수수료 지급 자격을 확정합니다.' },
      ],
      workflow: [
        { name: '후보자 등록 시 이메일·연락처 기반 중복 여부 사전 확인하기', description: '사내 임직원이나 에이전시가 후보자를 등록할 때 최근 일정 기간 내 이미 접수된 후보자인지 검사해 중복 등록이나 소유권 제외 여부를 안내합니다.' },
        { name: '후보자 본인 지원 동의 확인과 정식 전형 연결하기', description: '추천 등록된 후보자에게 안내를 보내 본인 지원 의사와 개인정보 동의를 확인한 뒤 정식 전형 파이프라인에 올립니다.' },
        { name: '추천인·에이전시 화면에 요약 전형 단계만 표시하기', description: '전형이 진행되는 동안 추천인이나 에이전시는 허용된 요약 상태만 조회하고 내부 평가 내용은 열람하지 못하게 합니다.' },
        { name: '입사일 및 보증 기간 도래 시 보상·수수료 정산 대상 확정하기', description: '최종 입사 후 약정 근속 일수를 채우면 지급 대기로 전환하고, 보증 기간 내 중도 퇴사 시 제외 또는 환수 기준을 적용합니다.' },
      ],
      pitfalls: [
        { name: '이미 어제 직접 지원한 후보자를 오늘 헤드헌터가 등록했다고 헤드헌터 실적으로 덮어쓰기', description: '최근 접수 이력을 검사하지 않고 마지막 등록자로 귀속 경로를 덮어쓰면 불필요한 수수료 지급 분쟁이 생깁니다. 최초 귀속과 유효 기간을 고정하세요.' },
        { name: '외부 에이전시 포털에 다른 공고 지원 이력이나 내부 면접관 코멘트를 노출하기', description: '에이전시는 자신이 담당 공고에 추천한 후보자의 요약 진행 여부만 볼 수 있어야 하며, 후보자의 타 경로 지원 이력이나 내부 평가표를 보면 안 됩니다.' },
        { name: '오퍼 수락 시점에 바로 추천 보상금·수수료를 확정해 입사 취소·조기 퇴사 시 회수 못 하기', description: '입사 전 포기나 수습 기간 내 퇴사가 있을 수 있으므로 합격 통보·실제 입사·근속 기간 충족 단계를 구분하세요.' },
      ],
      questions: [
        '이미 인재풀에 있거나 최근 직접 지원한 후보자가 사내 추천·에이전시로 다시 접수될 때, 기존 이력 우선 인정 기간(예: 최근 6개월)은 얼마인가요?',
        '사내 추천이나 에이전시 추천 시 후보자 본인이 직접 동의 링크를 눌러야 전형이 시작되나요?',
        '사내 추천 임직원과 외부 에이전시는 자신이 추천한 후보자의 진행 상태를 어디까지 볼 수 있나요?',
        '외부 에이전시는 허가된 특정 채용 공고에만 후보자를 등록할 수 있나요, 공고별 배정 한도가 있나요?',
        '사내 추천 보상금이나 에이전시 수수료는 실제 입사 후 며칠(예: 90일 재직)이 지나야 지급 대상으로 확정되며, 중도 퇴사 시 어떻게 처리하나요?',
      ],
      example: '예시: 채용 시스템에서 에이전시나 임직원이 후보자 등록 시 최근 6개월 내 동일 이메일·연락처 지원 이력이 있으면 중복 추천으로 안내해 소유권을 인정하지 않고, 신규 후보자는 본인 동의 완료 후 전형을 시작하며, 추천인에게는 서류·면접·종료 3단계 요약만 공개하고 입사 후 90일 재직 시 보상 지급 대기로 전환하도록 구성할 수 있습니다. 실제 소유권 유효 기간·동의 절차·보증 기간은 채용 및 계약 정책에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'inline-email-validation', reason: '추천할 후보자의 이메일 형식을 확인하고 중복 후보자 여부나 안내 문구를 입력칸 아래에 바로 표시하는 표현에 참고할 수 있습니다. 실제 중복 조회와 소유권 판별은 별도로 구현해야 합니다.' },
        { id: 'ly-sortable-data-table', reason: '사내 추천·에이전시 접수 목록을 추천일·진행 단계·입사일·보상 자격 상태 기준으로 정렬해 관리하는 표현에 참고할 수 있습니다. 실제 수수료 계산과 권한 분리는 구현하지 않습니다.' },
      ],
      promptSnippet: '채용 서비스의 사내 추천·헤드헌터(에이전시) 후보자 등록·중복 추천 귀속(소유권) 판별 및 보상·수수료 기준 흐름을 설계해 줘. 먼저 기존 지원/추천 이력의 소유권 인정 기간, 추천 등록 시 후보자 본인 동의 절차, 추천인·에이전시에게 허용할 진행 상태 열람 범위, 입사 후 최소 재직(보증) 기간과 보상·수수료 확정 규칙을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 직접 지원·사내 추천·에이전시 추천 접수 시 최초 귀속(Source Attribution) 기록과 중복 접수 판별 규칙.\n2. 후보자 등록 → 후보자 본인 동의 대기 → 정식 전형 진행 → 입사 확정 → 근속 기준 충족(지급 대상) 또는 조기 퇴사(제외) 상태 전환.\n3. 인사 담당자, 사내 추천인, 외부 에이전시, 후보자 각 역할이 볼 수 있는 정보의 경계.\n4. 복수 추천 충돌(임직원 간 중복 추천, 직접 지원 후 에이전시 등록 등) 시 우선순위 및 안내.\n5. 후보자 추천 입력 및 이메일 검증·후보자 동의 화면·추천 현황 정렬 표·보상/수수료 정산 대상 화면의 연결.\n최근 직접 지원한 후보자의 귀속을 나중 추천으로 덮어쓰거나 추천인·에이전시에게 내부 면접 평가표를 노출하지 말고, 예시 정책과 디자인 데모를 실제 ATS 귀속·정산 시스템으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Recruiting & ATS',
      title: 'Employee referrals, agency submissions, duplicate ownership windows and fee eligibility',
      summary: 'Determine candidate source attribution and ownership windows across referrals and agencies, and connect restricted status views with post-hire retention milestones.',
      overview: 'A single candidate might apply on the career site, get referred by an employee and be submitted by an external recruiting agency in the same week. Enforcing clear candidate ownership windows so earlier active applications are not overwritten, requiring candidate consent on third-party submissions, showing referrers and agencies only high-level status without leaking internal scorecards, and tying referral bonuses or placement fees to post-hire retention dates prevents attribution disputes. These concepts are design references, not default agency contract terms or bonus rules.',
      concepts: [
        { name: 'Primary source attribution and duplicate detection', description: 'Record the first valid channel that introduced a candidate and check existing records within the active ownership window before crediting a new referrer or agency.' },
        { name: 'Candidate ownership windows and candidate opt-in', description: 'Define how long an employee referral or agency submission retains credit (for example, 6 or 12 months) and require the candidate to confirm consent before entering the pipeline.' },
        { name: 'Redacted status views for referrers and external agencies', description: 'Show employee referrers and external agencies only coarse stage milestones while hiding interviewer scorecards, rejection reasons and offer compensation.' },
        { name: 'Start-date and retention-milestone fee eligibility', description: 'Track hire start date and required retention or guarantee windows (such as 90 days on the job) before marking a referral bonus or agency fee eligible for payout.' },
      ],
      workflow: [
        { name: 'Check for existing candidate records at submission time', description: 'Validate candidate email or phone on referral or agency submission and flag if the candidate is already active within the ownership lookback window.' },
        { name: 'Request candidate consent to complete the referral', description: 'Send the referred candidate a confirmation link to accept the representation/referral and upload or verify their application details.' },
        { name: 'Expose coarse milestone progress to the submitting source', description: 'Let referrers and agencies track their submitted candidates across high-level stages (Submitted, In Review, Interviewing, Closed/Hired) without internal notes.' },
        { name: 'Track post-hire retention and confirm bonus or fee eligibility', description: 'Once a referred candidate starts work, track the retention countdown and mark the referral bonus or agency fee eligible after the guarantee period passes.' },
      ],
      pitfalls: [
        { name: 'Overwriting an active direct application with a later agency submission', description: 'If the last uploader automatically claims source attribution, agencies can claim fees for candidates already interviewing with the company.' },
        { name: 'Leaking internal interview scorecards or other applications to an agency portal', description: 'External agencies must only see the high-level status of the specific job submission they own, never internal rubrics or activity on other roles.' },
        { name: 'Marking placement fees payable upon offer acceptance rather than start date and retention', description: 'Candidates may decline before day one or leave during the guarantee period. Tie payout eligibility to actual start date and retention rules.' },
      ],
      questions: [
        'What is the candidate ownership lookback window during which an existing application, referral or agency submission blocks duplicate attribution?',
        'Must a referred or agency-submitted candidate explicitly confirm consent via email before recruiters review them?',
        'What level of pipeline status is visible to employee referrers and external agencies, and what details remain strictly HR-only?',
        'Are external agencies restricted to submitting candidates only to specifically assigned job requisitions?',
        'What post-hire retention milestone (such as 30 or 90 days after start date) triggers referral bonus or agency fee eligibility, and how are early departures handled?',
      ],
      example: 'Example: an ATS could enforce a 6-month candidate ownership window against duplicate email/phone submissions, require candidates to click an opt-in link on agency submissions, show referrers a 4-stage summary view without scorecards, and mark referral bonuses eligible 90 days after the candidate’s start date. Confirm actual ownership windows, agency contract terms and retention periods before adopting this setup.',
      relatedDesigns: [
        { id: 'inline-email-validation', reason: 'A reference for validating a referred candidate’s email address inline and surfacing duplicate or formatting guidance. Ownership lookbacks need separate implementation.' },
        { id: 'ly-sortable-data-table', reason: 'A reference for sorting referral and agency submissions by submission date, stage, start date or bonus eligibility. Attribution logic and role permissions need separate implementation.' },
      ],
      promptSnippet: 'Help design an employee-referral, recruiting-agency submission and source-attribution workflow. First confirm the candidate ownership lookback window for duplicates, candidate opt-in/consent steps, what status details referrers and agencies can view, job-assignment restrictions for agencies, and post-hire retention milestones for bonuses or placement fees. Do not assume undecided rules.\nBased on the answers, describe:\n1. Source attribution and duplicate-conflict rules across direct applications, employee referrals and agency submissions.\n2. Lifecycle states from submitted, awaiting candidate consent, active in pipeline, hired/started, retention met (payout eligible) and early termination.\n3. Strict permission boundaries between HR/recruiters, employee referrers, external agencies and candidates.\n4. Handling competing submissions (two employees referring the same person or agency submission after direct apply).\n5. How referral submission forms with inline email checks, candidate opt-in screens, sortable referral tables and bonus/fee eligibility views connect.\nDo not overwrite earlier active candidate attribution with later submissions or expose internal scorecards to referrers and agencies, and do not mistake example policies or design demos for a real ATS attribution system.',
    },
  },
  sources: [
    { title: 'Greenhouse Support — Agency portal and candidate ownership rules', url: 'https://support.greenhouse.io/hc/en-us/articles/200723484' },
    { title: 'Workable Help Center — Referrals portal and tracking employee referrals', url: 'https://help.workable.com/hc/en-us/articles/115015794148' },
  ],
}, {
  id: 'recruiting-offer-approval-and-expiration',
  aliases: {
    ko: ['처우 제안서 오퍼 결재', '입사 제안서 수락 기한', '연봉 조건 수정 재발송', '오퍼 승인 체인'],
    en: ['offer letter approval chain', 'candidate offer expiration', 'revised offer terms', 'compensation approval workflow'],
  },
  useCases: {
    ko: ['후보자에게 처우 제안서(Offer letter)를 보내기 전에 부서장·인사·재무의 단계별 내부 결재를 거칠 때', '내부 승인 완료 전에는 후보자에게 오퍼가 발송되지 않도록 잠그고, 승인 후 수락 마감 기한을 둘 때', '입사일·연봉 등 처우 조건을 협상으로 수정할 때 기존 제안서를 폐기하고 재결재·재발송을 거칠 때', '후보자의 수락·거절·기한 만료와 채용 정원(Headcount) 마감 상태를 연결할 때'],
    en: ['Routing compensation and offer terms through a multi-step internal approval chain before sending to a candidate', 'Enforcing an offer acceptance deadline and tracking candidate view, signature or decline states', 'Re-triggering internal approval and superseding the previous offer when salary or start-date terms are renegotiated', 'Connecting offer acceptance, decline or expiration with job requisition headcount fulfillment'],
  },
  keywords: {
    ko: ['처우 제안서', '오퍼 레터', '내부 결재', '승인 체인', '수락 기한', '조건 재협상', '오퍼 만료', '처우 수정 재발송', '입사 확정'],
    en: ['offer letter', 'compensation offer', 'approval chain', 'internal sign-off', 'acceptance deadline', 'offer expiration', 'revised offer', 'counter-offer negotiation', 'headcount fulfillment'],
  },
  text: {
    ko: {
      domain: '채용·지원 관리',
      title: '처우 제안서(Offer) 내부 결재·후보자 수락 기한과 조건 수정 재발송',
      summary: '처우 조건의 내부 다단계 결재와 후보자 발송을 분리하고, 수락 기한 만료 및 조건 수정 시 이전 오퍼 무효화를 연결합니다.',
      overview: '최종 합격 후보자에게 연봉과 입사일이 적힌 처우 제안서(Offer)를 보낼 때는 채용 담당자 임의로 발송하지 않고 현업 리드·인사·임원의 내부 승인을 먼저 거치는 경우가 많습니다. 내부 결재 대기 상태와 후보자에게 실제 발송된 상태를 엄격히 나누고, 후보자 수락 기한 만료 처리, 그리고 처우 협상으로 금액이나 입사일이 바뀔 때 기존 오퍼 링크를 즉시 무효화하고 어느 범위의 수정부터 내부 재결재를 다시 태울지 명확히 정해야 합니다. 아래 내용은 처우 제안 결재·발송 흐름을 설계하기 위한 참고이며 특정 기업의 결재선이나 근로계약 형식을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '처우 작업본·내부 결재 완료·후보자 발송 완료의 분리', description: '담당자가 작성 중인 오퍼 작업본과 내부 결재선(순차·병렬) 승인이 끝난 상태, 후보자에게 실제 제안서가 발송된 상태를 분리해 미승인 발송을 차단합니다.' },
        { name: '후보자 수락 기한(Expiration)과 수락·거절 상태', description: '발송된 오퍼에 수락 마감 일시를 두고, 후보자 열람·수락 완료·거절(사유 포함)·기한 만료·발송 철회 상태를 구분합니다.' },
        { name: '조건 수정(재협상) 시 이전 오퍼 무효화와 재결재 기준', description: '연봉·사이닝 보너스·직급을 고쳐 새 오퍼를 만들면 이전 오퍼는 즉시 수락 불가(대체됨)로 바꾸고, 예산·급여 밴드 변경 시 내부 재결재를 거치게 합니다.' },
        { name: '채용 정원(Headcount) 차감과 잔여 후보자 마감 연동', description: '후보자가 오퍼를 최종 수락했을 때 해당 포지션의 채용 정원을 차감하고, 정원이 다 찼을 때만 공고 마감 및 다른 후보자 안내로 이어지게 합니다.' },
      ],
      workflow: [
        { name: '처우 조건 작성과 내부 결재선 상신하기', description: '직급, 기본급, 인센티브, 예정 입사일, 수락 기한을 입력하고 지정된 내부 결재자 순서대로 승인을 요청합니다.' },
        { name: '결재 승인 또는 반려 사유 확인 후 후보자에게 발송하기', description: '모든 결재자가 승인하면 발송 기능이 활성화되며, 반려 시에는 사유를 확인해 조건을 수정한 뒤 다시 결재를 올립니다.' },
        { name: '수락 기한 내 후보자 응답 확인과 만료·연장 처리하기', description: '후보자가 기한 내에 수락 또는 거절하게 하고, 기한이 임박하거나 지났을 때 인사 담당자가 기한을 연장할지 만료 처리할지 결정합니다.' },
        { name: '처우 조건 변경 시 기존 오퍼 폐기와 수정 오퍼 재발송하기', description: '협상으로 조건이 바뀌면 기존 발송본을 즉시 무효화하고, 변경 항목에 따라 재결재를 거쳐 새 버전의 오퍼를 발송합니다.' },
      ],
      pitfalls: [
        { name: '내부 결재가 다 끝나기 전에 후보자에게 오퍼 발송 버튼이 열리기', description: '결재 대기 중에 실수로 후보자에게 제안서가 나가면 나중에 회사 내부 반려로 오퍼를 번복하는 심각한 문제가 생깁니다.' },
        { name: '조건을 수정해 새 오퍼를 보냈는데 후보자가 예전 오퍼 링크에 서명하기', description: '수정 제안서가 생성·발송되면 이전 제안서는 즉시 만료·대체 상태로 잠가 두 개의 서로 다른 조건이 동시에 수락되지 않게 하세요.' },
        { name: '오퍼를 발송하기만 했는데 채용 정원(Headcount)을 이미 채운 것으로 마감해 버리기', description: '후보자가 오퍼를 거절하거나 기한이 만료될 수 있습니다. 발송 중(Pending) 수량과 최종 수락(Accepted) 수량을 구분해 정원을 관리하세요.' },
      ],
      questions: [
        '오퍼 내부 결재선은 모든 공고에 고정인가요, 직급·연봉 밴드 초과 여부에 따라 결재 단계가 추가되나요?',
        '이미 내부 승인을 받은 오퍼에서 입사 예정일만 며칠 바뀌는 경우에도 전체 결재선을 처음부터 다시 거쳐야 하나요, 금액·직급 변경 시에만 재결재하나요?',
        '후보자 오퍼 수락 기한(예: 7일)이 지나면 자동으로 수락 버튼이 막히나요, 인사 담당자가 기한을 연장할 수 있나요?',
        '후보자가 오퍼를 수락하는 방식은 화면 내 수락 확인인가요, 전자서명 연동인가요?',
        '1명을 뽑는 공고에서 후보자가 오퍼를 수락하기 전에 거절·만료되면 다음 예비 후보자에게 어떻게 오퍼를 넘기나요?',
      ],
      example: '예시: 채용 시스템에서 오퍼 작성 후 채용 매니저 → 인사 리드 순차 승인이 완료되어야만 후보자 발송 버튼이 열리고, 발송 후 7일 수락 기한을 두며, 연봉이나 보너스 금액이 수정되면 이전 오퍼 링크를 즉시 무효화하고 재결재를 거치되 단순 입사일 변경은 인사 담당자 확인만으로 재발송하도록 구성할 수 있습니다. 실제 결재 기준·재결재 예외 항목·수락 효력 요건은 인사 규정에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'ly-activity-timeline', reason: '오퍼 내부 결재 요청·단계별 승인/반려·후보자 발송·조건 수정·수락 완료 이력을 시간순으로 보여주는 표현에 참고할 수 있습니다. 실제 결재 권한 검증과 발송 처리는 별도로 구현해야 합니다.' },
        { id: 'dismissible-inline-banner', reason: '후보자 오퍼 수락 마감 임박이나 내부 재결재 필요 상태를 상세 화면 상단에 알려 주는 표현에 참고할 수 있습니다. 실제 만료 차단과 알림 발송은 구현하지 않습니다.' },
      ],
      promptSnippet: '채용 처우 제안서(Offer)의 내부 다단계 결재·후보자 발송·수락 기한 및 조건 수정 재발송 흐름을 설계해 줘. 먼저 내부 결재선 구성 조건, 결재 완료 전 후보자 발송 차단 규칙, 오퍼 수락 기한과 만료/연장 처리, 처우 조건 수정 시 이전 오퍼 무효화 및 재결재 필요 범위(연봉/직급 변경 vs 단순 입사일 변경), 채용 정원(Headcount) 차감 시점을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 오퍼 작업본 → 내부 결재 대기(단계별 승인/반려) → 승인 완료 → 후보자 발송됨 → 수락/거절/만료/대체됨 상태 전환.\n2. 결재자·인사 담당자·면접관·후보자 간 처우 금액 및 결재 의견의 열람 권한 분리.\n3. 조건 협상으로 수정 오퍼 생성 시 기존 발송 오퍼 즉시 무효화 및 재결재 트리거 규칙.\n4. 오퍼 발송 중(예약 정원)과 수락 완료(확정 정원) 구분 및 거절·만료 시 차순위 후보자 진행 흐름.\n5. 처우 작성 및 결재 상태 배너·결재/발송 타임라인·후보자 오퍼 확인 및 수락 화면의 연결.\n내부 결재 완료 전에 후보자에게 오퍼가 노출되게 하거나 수정 오퍼 발송 후 이전 오퍼 링크를 살아 있게 두지 말고, 예시 정책과 디자인 데모를 실제 전자서명·인사 결재 시스템으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Recruiting & ATS',
      title: 'Offer approval chains, candidate acceptance deadlines and revised offer letters',
      summary: 'Gate candidate offer delivery behind internal multi-step approvals, and connect acceptance deadlines with versioned offer revisions.',
      overview: 'Extending a job offer usually requires sign-off from hiring managers, HR and finance before a single number is shared with the candidate. Locking candidate delivery until the internal approval chain completes, enforcing an offer expiration deadline, immediately invalidating old offer links when terms are renegotiated, and distinguishing minor start-date edits from compensation changes that require re-approval keeps offer management controlled. These concepts are design references, not legal employment contract advice or default approval matrices.',
      concepts: [
        { name: 'Internal approval chain before candidate release', description: 'Keep offer working copies strictly internal through sequential or parallel approval steps, enabling candidate delivery only after all required approvers sign off.' },
        { name: 'Offer expiration deadlines and response states', description: 'Track sent offers across viewed, accepted, declined (with reason), expired and withdrawn states, enforcing the configured acceptance deadline.' },
        { name: 'Versioned offer revisions and re-approval triggers', description: 'When compensation, title or start date changes, supersede the prior offer version immediately and define which field changes require restarting internal approvals.' },
        { name: 'Requisition headcount reservation versus fulfillment', description: 'Distinguish an out-for-signature offer from an accepted offer so declining or expiring an offer frees the requisition slot without prematurely rejecting backup candidates.' },
      ],
      workflow: [
        { name: 'Prepare offer terms and route through internal approvers', description: 'Enter title, base salary, bonus, start date and expiration date, then route the offer package through the designated approval chain.' },
        { name: 'Resolve rejections or send the approved offer to the candidate', description: 'If an approver rejects the terms, revise and resubmit internally; once fully approved, unlock the action to send the offer to the candidate.' },
        { name: 'Monitor candidate response and expiration countdown', description: 'Show the candidate the offer terms and acceptance deadline, and allow HR to extend an expiring deadline or formally withdraw the offer if needed.' },
        { name: 'Supersede prior offers when renegotiating terms', description: 'If the candidate negotiates revised terms, invalidate the previously sent offer link, run required re-approvals and issue the new offer version.' },
      ],
      pitfalls: [
        { name: 'Allowing recruiters to send an offer to the candidate before internal approvals finish', description: 'Sending unapproved compensation terms risks having to retract a live offer if finance or leadership rejects the package.' },
        { name: 'Leaving the original offer link active after sending a revised counter-offer', description: 'If Version 1 remains signable after Version 2 is issued, a candidate could sign the outdated terms. Supersede older versions immediately.' },
        { name: 'Closing the job requisition and auto-rejecting runner-up candidates the moment an offer is sent', description: 'Wait until the offer is actually accepted (or the hire is confirmed) before closing out the requisition and notifying remaining finalists.' },
      ],
      questions: [
        'Is the internal offer approval chain fixed for every role, or does it add approvers when compensation exceeds a band?',
        'If an already-approved offer is edited, which changes (such as salary or level versus a minor start-date shift) require restarting the approval chain?',
        'When the candidate acceptance deadline passes, is acceptance automatically blocked until HR extends the date?',
        'How does the candidate accept the offer (in-portal confirmation, uploaded signed PDF or e-signature integration)?',
        'When does an offer consume open requisition headcount—while pending candidate response or only upon acceptance?',
      ],
      example: 'Example: an ATS could require sequential approval from the Hiring Manager and VP of People before enabling the Send Offer button, enforce a 7-day candidate acceptance window, require full re-approval if base salary or equity changes while allowing HR to adjust the start date directly, and mark previous offer links superseded upon revision. Confirm actual approval matrices, signature methods and headcount rules before adopting this setup.',
      relatedDesigns: [
        { id: 'ly-activity-timeline', reason: 'A reference for tracking sequential approval steps, offer versions sent, candidate views and final acceptance timestamps. Approval routing and e-signature need separate implementation.' },
        { id: 'dismissible-inline-banner', reason: 'A reference for alerting recruiters when an offer is nearing its expiration date or requires re-approval after edits. Deadline enforcement needs separate implementation.' },
      ],
      promptSnippet: 'Help design a recruiting offer-approval, candidate-expiration and offer-revision workflow. First confirm internal approval-chain rules, hard blocks against sending unapproved offers, candidate acceptance deadlines and extension rules, which term edits trigger re-approval while superseding old offers, and how pending versus accepted offers affect job headcount. Do not assume undecided rules.\nBased on the answers, describe:\n1. Offer lifecycle across working copy, pending approval, changes requested, approved, sent to candidate, accepted, declined, expired and superseded.\n2. Permission boundaries keeping compensation and approval notes hidden from regular interviewers and unreleased from candidates.\n3. Superseding previous offer links on revision and rules for full versus bypassed re-approval.\n4. Requisition headcount tracking across pending offers, declines/expirations and final acceptances.\n5. How offer preparation forms, status banners, approval/version timelines and candidate acceptance screens connect.\nDo not allow unapproved offers to be sent to candidates or leave superseded offer links signable, and do not mistake example policies or design demos for a binding e-signature or HRIS system.',
    },
  },
  sources: [
    { title: 'Greenhouse Support — Offer approvals and managing offer versions', url: 'https://support.greenhouse.io/hc/en-us/articles/200723424' },
    { title: 'Lever Help Center — Creating, approving and sending offers', url: 'https://help.lever.co/hc/en-us/articles/20087421265053-Creating-and-managing-offers' },
  ],
}, {
  id: 'recruiting-talent-pool-consent-and-data-purge',
  aliases: {
    ko: ['지원자 개인정보 보관 기간', '인재풀 등록 동의', '불합격자 이력서 자동 파기', '보관 기한 연장 요청'],
    en: ['candidate data retention policy', 'talent pool opt-in consent', 'scheduled resume purge', 'privacy consent renewal'],
  },
  useCases: {
    ko: ['해당 공고 전형에만 쓰는 필수 개인정보 동의와 향후 채용 제안용 인재풀(Talent pool) 보관 선택 동의를 분리할 때', '전형 불합격 후 법정·내부 보관 기한이 도래한 이력서·첨부파일·연락처를 파기하고 비식별 통계만 남길 때', '보관 만료 전에 후보자에게 인재풀 보관 기간 연장(갱신) 의사를 묻거나 즉시 삭제(철회) 요청을 처리할 때', '동일 후보자가 나중에 다른 공고에 새로 지원했을 때 진행 중인 전형의 보관 기한을 별도로 계산할 때'],
    en: ['Separating mandatory application-processing consent from optional long-term talent-pool opt-in', 'Purging resumes, attachments and personal identifiers when a candidate’s retention window expires while keeping anonymized aggregate counts', 'Sending consent-renewal requests before expiry and honoring immediate candidate deletion (opt-out) requests', 'Protecting active applications when a candidate with an expiring historical record applies to a new job'],
  },
  keywords: {
    ko: ['개인정보 동의', '보관 기간', '인재풀', '선택 동의', '이력서 파기', '자동 파기', '비식별화', '동의 갱신', '동의 철회'],
    en: ['privacy consent', 'data retention', 'talent pool', 'opt-in consent', 'resume purge', 'scheduled deletion', 'anonymization', 'consent renewal', 'right to erasure'],
  },
  text: {
    ko: {
      domain: '채용·지원 관리',
      title: '개인정보 수집 동의 기한·인재풀 등록과 보관 만료 시 이력서 파기',
      summary: '전형 진행용 필수 동의와 인재풀 장기 보관 선택 동의를 분리하고, 만료 전 연장 확인 및 이력서·첨부파일 파기를 연결합니다.',
      overview: '채용 과정에서는 이력서와 포트폴리오 등 민감한 개인정보가 대량으로 수집됩니다. 당장 지원한 공고의 전형 진행을 위한 필수 동의와 불합격 후에도 향후 다른 포지션 제안을 위해 이력서를 남겨 두는 인재풀(Talent pool) 선택 동의를 구분해야 하며, 각 동의의 보관 만료일이 지나면 이름·연락처·첨부 서류를 실제로 파기하되 전체 지원자 수 같은 비식별 통계까지 깨지지 않도록 설계해야 합니다. 아래 내용은 채용 개인정보 보관·파기 흐름을 설계하기 위한 참고이며 특정 국가의 개인정보 보호법 기간을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '당해 전형 필수 동의와 인재풀(상시 채용) 선택 동의 분리', description: '이번 공고 심사를 위한 단기 보관 동의와 향후 포지션 추천을 위한 장기 인재풀 보관 동의를 분리해 보관 만료일을 다르게 산정합니다.' },
        { name: '보관 만료일 산정 기준(지원일 vs 최종 전형 종료일)', description: '진행 중인 전형 도중에 이력서가 파기되지 않도록, 보관 기한을 단순 접수일이 아니라 최종 결과 통보(전형 종료) 시점부터 계산할지 명확히 정합니다.' },
        { name: '만료 전 동의 연장(갱신) 요청과 즉시 삭제(철회) 처리', description: '인재풀 보관 만료 전에 후보자에게 연장 동의 링크를 보낼 수 있게 하고, 후보자가 언제든 삭제를 요청하면 즉시 파기 절차를 실행합니다.' },
        { name: '개인 식별 정보·첨부 서류 완전 파기와 비식별 통계 유지', description: '파기 시 이름·이메일·전화번호·이력서 파일·면접 메모 내 식별 정보는 복구 불가능하게 지우되, 공고별 총 지원자 수·단계별 전환율 같은 익명 집계 숫자는 유지합니다.' },
      ],
      workflow: [
        { name: '지원 시점에 필수 동의와 인재풀 선택 동의 구분해 받기', description: '지원서 제출 시 필수 수집·이용 기간과 선택적 인재풀 보관 기간을 각각 안내하고 동의 시각과 버전을 기록합니다.' },
        { name: '전형 종료 확정과 후보자별 보관 만료일 계산하기', description: '불합격이나 지원 취소로 전형이 끝나면 해당 후보자의 인재풀 동의 여부에 맞춰 예정 파기일을 지정합니다.' },
        { name: '만료 임박 후보자 동의 갱신 요청 또는 파기 대기 전환하기', description: '만료 전 갱신 안내 대상에게는 연장 확인을 보내고, 미응답·미동의 후보자는 만료일 도달 시 열람을 차단하고 파기 대상에 올립니다.' },
        { name: '첨부파일·식별 정보 파기 실행과 파기 확인 기록 남기기', description: '데이터베이스의 식별 필드와 스토리지의 이력서·포트폴리오 원본 파일을 함께 파기하고, 언제 몇 건이 파기되었는지 비식별 증적만 남깁니다.' },
      ],
      pitfalls: [
        { name: '전형이 길어졌는데 지원일 기준 만료일이 지났다고 면접 중인 후보자 이력서를 파기하기', description: '채용 진행 중인 활성 지원자는 파기 배치에서 제외하고, 전형이 종료된 시점부터 보관 기한을 계산하거나 유예해야 합니다.' },
        { name: 'DB에서 이름만 지우고 스토리지의 이력서 PDF 파일은 그대로 남겨 두기', description: '화면에만 익명 표시를 하고 실제 첨부파일이나 면접 코멘트 본문에 개인정보가 그대로 남아 있으면 파기가 완료된 것이 아닙니다.' },
        { name: '후보자 레코드 자체를 물리 삭제(Hard delete)해 과거 공고의 총 지원자 수 통계까지 0명으로 바뀌기', description: '개인 식별 값과 파일은 완전 삭제하더라도 비식별 집계용 껍데기나 카운트는 남겨야 과거 채용 리포트 수치가 왜곡되지 않습니다.' },
      ],
      questions: [
        '일반 전형 불합격자의 기본 서류 보관 기간과 인재풀(선택 동의) 등록 후보자의 보관 기간은 각각 얼마인가요?',
        '보관 만료일은 최초 지원 접수일 기준인가요, 전형 최종 종료(결과 통보)일 기준인가요?',
        '인재풀 보관 기간이 만료되기 전에 후보자에게 기간 연장 동의를 요청하는 절차를 두나요?',
        '후보자가 개인정보 동의 철회(즉시 삭제)를 요청했을 때 진행 중인 전형이 있다면 지원 취소와 함께 어떻게 처리하나요?',
        '파기 시 어떤 항목(이름, 연락처, 이력서·포트폴리오 파일, 면접 평가 코멘트)을 삭제·비식별화하며, 비식별 채용 통계는 어떻게 유지하나요?',
      ],
      example: '예시: 입사 지원 시 전형 진행 필수 동의(전형 종료 후 30일 보관)와 인재풀 선택 동의(2년 보관)를 분리해 받고, 인재풀 만료 14일 전에 연장 동의 안내를 발송하며, 만료 시 이름·연락처·이력서 원본 파일과 평가 텍스트를 즉시 파기하되 공고별 단계 전환 수 통계만 비식별로 남기도록 구성할 수 있습니다. 실제 법정 보관 기간·파기 예외 사유·비식별 처리 범위는 개인정보 처리방침에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'bulk-selection-action-bar', reason: '보관 만료 예정 후보자 목록에서 여러 명을 선택해 동의 연장 안내를 보내거나 파기 대상을 일괄 처리하는 작업 바 표현에 참고할 수 있습니다. 실제 파일 영구 삭제와 비식별화 배치는 별도로 구현해야 합니다.' },
        { id: 'inline-delete-confirmation', reason: '후보자 개인정보 즉시 파기를 실행하기 전에 되돌릴 수 없는 작업임을 제자리에서 확인받는 표현에 참고할 수 있습니다. 실제 스토리지 파기 API는 구현하지 않습니다.' },
      ],
      promptSnippet: '채용 후보자의 개인정보 수집 동의·인재풀 선택 보관·만료 시 이력서 및 식별 정보 파기 흐름을 설계해 줘. 먼저 당해 전형 필수 동의와 인재풀 장기 보관 선택 동의의 기간 구분, 만료일 산정 기준(접수일 vs 전형 종료일), 만료 전 동의 연장 요청 및 후보자 즉시 삭제(철회) 처리, 파기 대상 범위(DB 식별값·첨부파일·평가 메모)와 비식별 통계 보존 방식을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 전형 진행 중·전형 종료(단기 보관)·인재풀 보관(장기 동의)·만료 임박(연장 요청)·파기 대기·파기 완료(비식별화) 상태 전환.\n2. 진행 중인 새 공고 지원이 있는 후보자의 파기 유예 규칙과 후보자 직접 삭제 요청 처리.\n3. 이력서·포트폴리오 스토리지 파일과 DB 식별 정보·평가 텍스트의 완전 삭제 및 비식별 집계 유지 구조.\n4. 만료된 후보자 열람 차단과 파기 실행 일시·건수 증적 관리.\n5. 지원서 필수/선택 동의 체크·인재풀 만료 예정 목록 및 일괄 작업 바·즉시 파기 확인 화면의 연결.\n면접 진행 중인 후보자를 지원일 경과만으로 파기하거나 DB 이름만 가리고 이력서 원본 파일을 스토리지에 남기지 말고, 예시 정책과 디자인 데모를 실제 개인정보 파기 시스템으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Recruiting & ATS',
      title: 'Candidate privacy consent windows, talent-pool opt-in and scheduled resume purging',
      summary: 'Separate single-job processing consent from optional talent-pool retention, and connect renewal prompts with complete resume and PII purging.',
      overview: 'Recruiting systems collect resumes, portfolios and interview notes containing sensitive personal data. Distinguishing mandatory consent for the current job application from optional opt-in to stay in a long-term talent pool, calculating expiration from the end of an active hiring process rather than purging mid-interview candidates, and erasing personal identifiers and stored files while keeping anonymized funnel counts intact keeps hiring pipelines compliant. These concepts are design references, not legal advice for a specific privacy jurisdiction.',
      concepts: [
        { name: 'Application processing consent versus talent-pool opt-in', description: 'Capture mandatory consent for evaluating the current application separately from optional consent to retain the candidate’s profile for future roles.' },
        { name: 'Active-application protection and retention clock start', description: 'Never purge a candidate while they are still active in an open interview pipeline; start or extend the retention countdown based on final stage closure or latest consent.' },
        { name: 'Pre-expiry consent renewal and candidate erasure requests', description: 'Allow sending an opt-in renewal link before talent-pool consent expires, and support immediate erasure when a candidate withdraws consent.' },
        { name: 'Complete file/PII purge versus anonymized funnel metrics', description: 'Delete names, contact details, free-text notes and stored resume/portfolio files irreversibly upon purge while preserving non-identifiable aggregate counts for historical reporting.' },
      ],
      workflow: [
        { name: 'Record granular consent timestamps at application or referral time', description: 'Present clear, separate checkboxes for current-role processing and optional talent-pool retention, storing the exact consent version and date.' },
        { name: 'Schedule expiration dates when applications close', description: 'When an application ends without a hire, set the candidate’s scheduled purge date according to whether they opted into the talent pool.' },
        { name: 'Send renewal invites or lock expiring profiles', description: 'Before talent-pool retention expires, optionally invite the candidate to renew consent; once expired, hide the profile from search and queue it for purge.' },
        { name: 'Purge PII and storage attachments while preserving anonymous counts', description: 'Wipe personal fields, evaluation text and cloud-storage resume files, recording only a non-identifiable purge timestamp for compliance verification.' },
      ],
      pitfalls: [
        { name: 'Purging a candidate’s resume mid-interview because the clock started on initial application date', description: 'If a hiring process takes longer than the short-term retention window, a naive timer will wipe an active finalist. Exclude active applications from purge jobs.' },
        { name: 'Masking the candidate’s name in the database while leaving the resume PDF in object storage', description: 'True purging requires deleting attached files, thumbnails and free-text interview notes alongside database contact columns.' },
        { name: 'Hard-deleting application rows so historical job funnel totals drop to zero', description: 'Anonymize closed application records rather than deleting aggregate rows so past applicant-to-hire conversion metrics remain intact.' },
      ],
      questions: [
        'What are the retention periods for unsuccessful applicants who only agreed to single-role evaluation versus those who opted into the talent pool?',
        'Does the retention countdown start on initial application submission or when the candidate’s active application is closed?',
        'Should the system send an automated email inviting talent-pool candidates to renew their consent before it expires?',
        'If a candidate requests immediate data deletion while still active in a job pipeline, how are withdrawal and purging coordinated?',
        'Which specific records (contact fields, uploaded resumes/portfolios, interviewer notes) are wiped on purge, and what anonymized fields remain for reporting?',
      ],
      example: 'Example: an ATS could separate mandatory application consent (purged 30 days after rejection) from optional talent-pool consent (retained for 24 months), send a renewal link 14 days before talent-pool expiry, skip any candidate with an active open application, and wipe PII, notes and stored resume files upon expiry while keeping anonymized stage counts. Confirm actual statutory retention rules, legal holds and anonymization requirements before adopting this setup.',
      relatedDesigns: [
        { id: 'bulk-selection-action-bar', reason: 'A reference for selecting expiring talent-pool profiles in bulk to send consent-renewal emails or trigger scheduled purges. Storage deletion and anonymization jobs need separate implementation.' },
        { id: 'inline-delete-confirmation', reason: 'A reference for confirming irreversible candidate PII and resume purging inline. Backend file deletion and data scrubbing need separate implementation.' },
      ],
      promptSnippet: 'Help design a candidate privacy-consent, talent-pool retention and scheduled data-purge workflow. First confirm separate retention windows for single-job processing versus optional talent-pool opt-in, when the retention timer starts (application date vs closure date), pre-expiry consent renewal and self-service erasure requests, and how PII/files are purged while preserving anonymized funnel counts. Do not assume undecided rules.\nBased on the answers, describe:\n1. Candidate data states across active in pipeline, closed (short-term retention), talent-pool opted-in, expiring (renewal sent), queued for purge and purged/anonymized.\n2. Safeguards preventing purge jobs from wiping candidates who have an active application in another requisition.\n3. Scope of irreversible deletion across database PII, interviewer free-text notes and stored resume/portfolio files versus retained anonymous metrics.\n4. Handling candidate-initiated consent withdrawal and immediate erasure requests.\n5. How application consent checkboxes, expiring-candidate bulk action bars and inline purge confirmations connect.\nDo not purge candidates while they are still interviewing or leave raw resume PDFs in storage after database anonymization, and do not mistake example policies or design demos for a certified privacy-compliance engine.',
    },
  },
  sources: [
    { title: 'Greenhouse Support — GDPR compliance, data retention and candidate deletion', url: 'https://support.greenhouse.io/hc/en-us/articles/360000438666' },
    { title: 'Workable Help Center — GDPR data retention and talent pool consent', url: 'https://help.workable.com/hc/en-us/articles/360002226254' },
  ],
}];
