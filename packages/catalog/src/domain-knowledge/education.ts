import type { DomainKnowledge } from '../domain-knowledge';

export const EDUCATION_KNOWLEDGE: DomainKnowledge[] = [{
  // Preserve the ID so existing MCP references still resolve after broadening the topic.
  id: 'coding-lesson-objectives-and-practice',
  aliases: {
    ko: ['교육 서비스', '교육 플랫폼', '온라인 강의', '온라인 학습', '학습 관리 시스템', '진도 관리', '코딩 교육'],
    en: ['education platform', 'online course', 'online learning', 'learning management system', 'LMS', 'progress tracking'],
  },
  useCases: {
    ko: ['강의·퀴즈·과제를 제공하는 교육 서비스를 만들 때', '활동별 진도와 완료·수료 기준을 정할 때', '초안·최종 제출·강사 피드백을 구분할 때', '마감과 지각 제출·재시도·재제출 정책을 설계할 때'],
    en: ['Building a service with lessons, quizzes and assignments', 'Defining activity progress tracking and completion criteria', 'Separating drafts, final submissions and instructor feedback', 'Designing deadlines, late submissions, retries and resubmissions'],
  },
  keywords: {
    ko: ['교육', '학습', '수업', '강의', '수강', '학습자', '학생', '교사', '강사', '학습 목표', '학습 활동', '진도', '과제', '제출', '피드백', '평가', '평가 대기', '완료 기준', '재시도', '재제출', '교육 콘텐츠', '코딩 교육', '코딩교육'],
    en: ['education', 'learning', 'course', 'lesson', 'learner', 'student', 'teacher', 'instructor', 'learning objectives', 'learning activity', 'progress', 'assignment', 'submission', 'feedback', 'assessment', 'completion criteria', 'resubmission', 'coding education'],
  },
  text: {
    ko: {
      domain: '교육',
      title: '학습 활동·제출·피드백과 완료 기준',
      summary: '콘텐츠를 본 것과 학습을 마친 것을 구분하고, 활동·제출·피드백·진도를 연결합니다.',
      overview: '강의, 독서, 퀴즈, 실습, 토론처럼 서로 다른 학습 활동에는 서로 다른 결과물이 생깁니다. 교육 서비스를 만들 때는 학습 목표에 맞는 활동과 이해를 확인할 증거를 정한 뒤, 누가 어떤 조건으로 완료를 판단할지 연결해야 합니다. 아래 흐름은 설계를 위한 참고이며, 대상 학습자와 수업 방식에 맞게 결정해야 합니다.',
      concepts: [
        { name: '학습 목표와 확인할 증거', description: '배운 뒤 할 수 있어야 하는 행동과 그것을 확인할 결과물을 짝짓습니다. 예를 들어 개념 설명, 풀이 과정, 발표나 실습 결과가 증거가 될 수 있습니다.' },
        { name: '학습 활동', description: '열람·시청·문제 풀이·작성·토론 등 학습자가 수행하는 단위입니다. 활동마다 입력과 결과가 다르므로 모두 같은 완료 버튼으로 처리할 필요는 없습니다.' },
        { name: '제출과 평가', description: '초안 저장, 최종 제출, 평가 결과를 구분합니다. 평가 방식은 자기 확인·동료 피드백·강사 확인·자동 평가 중 무엇을 사용할지 정해야 합니다.' },
        { name: '진도와 완료', description: '진도는 활동을 얼마나 진행했는지, 완료는 정한 조건을 충족했는지를 나타냅니다. 열람, 제출, 통과를 같은 상태로 취급하지 않도록 기준을 명시합니다.' },
        { name: '재시도와 다음 단계 접근', description: '다시 풀거나 재제출할 수 있는 조건, 이전 결과의 보존, 다음 활동을 열 조건은 각각 결정할 정책입니다. 모든 수업에 순차 잠금을 적용하지 않습니다.' },
      ],
      workflow: [
        { name: '목표와 활동 정하기', description: '학습 대상과 목표를 정하고 읽기·퀴즈·과제 등 필요한 활동 및 결과물을 고릅니다.' },
        { name: '진행과 제출 구분하기', description: '작성 중인 초안과 제출한 결과물을 구분해 보여 줍니다. 저장이나 제출에 실패했을 때는 실패 상태와 다시 할 수 있는 행동을 안내합니다.' },
        { name: '결과와 피드백 연결하기', description: '누가 어떤 기준으로 확인하는지, 결과와 피드백을 언제 공개하는지 정합니다. 평가 대기와 통과를 구분합니다.' },
        { name: '완료와 후속 행동 안내하기', description: '합의한 조건을 충족하면 완료로 표시합니다. 재시도나 다음 활동이 가능하다면 그 조건과 이동 경로를 함께 보여 줍니다.' },
      ],
      pitfalls: [
        { name: '열람을 이해나 통과로 해석하기', description: '페이지를 열거나 영상을 끝까지 본 기록만으로 이해를 증명할 수는 없습니다. 열람 완료와 평가 통과의 의미를 화면과 데이터에서 구분하세요.' },
        { name: '초안·제출·평가를 하나로 합치기', description: '자동 저장됐다는 안내가 최종 제출을 뜻하면 혼란이 생깁니다. 마감 후 제출, 재제출, 평가 대기 시 가능한 행동도 먼저 결정하세요.' },
        { name: '진도 비율만 보여 주기', description: '무엇을 기준으로 계산한 비율인지, 남은 활동은 무엇인지 함께 알려야 합니다. 활동 수·배점·시청량 중 어떤 기준인지 확인하세요.' },
      ],
      questions: [
        '누가 배우며 어떤 선수 지식·접근 환경을 가지고 있나요? 학습 뒤 무엇을 할 수 있어야 하나요?',
        '강의·퀴즈·과제·토론 중 어떤 활동이 필요하며, 학습 결과를 무엇으로 확인하나요?',
        '열람·제출·평가 통과 중 무엇을 완료로 보나요? 진도 비율의 분모와 계산 기준은 무엇인가요?',
        '누가 평가하고 언제 결과·피드백을 공개하나요? 학습자와 강사가 볼 수 있는 정보는 무엇인가요?',
        '마감·지각 제출·재시도·재제출은 어떻게 처리하나요? 다음 활동은 자유롭게 열리나요, 조건이 있나요?',
        '진도 저장·제출·평가가 실패하거나 지연될 때 무엇을 보존하고 어떤 상태와 재시도 방법을 보여 주나요?',
      ],
      example: '예시: 글쓰기 수업에서 자료 읽기와 글 제출을 별도 활동으로 둡니다. 읽기는 학습자가 확인하고, 글은 초안 → 제출 → 강사 피드백으로 진행한다고 정할 수 있습니다. 제출을 완료로 볼지 피드백 이후 수정을 마쳐야 완료인지 먼저 결정한 뒤 상태 배지와 다음 행동을 구성합니다. 이는 하나의 예시이며 실제 수업의 확정 규칙은 아닙니다.',
      relatedDesigns: [
        { id: 'onboarding-progress-checklist', reason: '필수 학습 활동과 남은 단계를 목록으로 표현할 때 참고할 수 있습니다. 데모의 체크 동작이 실제 학습 완료를 판단하지는 않습니다.' },
        { id: 'inline-edit-field', reason: '활동 제목이나 짧은 답변의 편집·저장 상태 표현에 참고할 수 있습니다. 과제 저장·제출·평가 기능은 별도로 구현해야 합니다.' },
      ],
      promptSnippet: '교육 서비스를 설계해 줘. 먼저 학습 대상·목표·활동 종류·이해를 확인할 결과물·평가 주체·완료 기준·진도 계산법·마감과 재제출 정책을 질문하고, 정해지지 않은 정책을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 학습자와 강사의 역할 및 각자 볼 정보와 가능한 행동.\n2. 활동별 진행 상태와, 해당하는 경우 초안·제출·평가 대기·결과의 구분.\n3. 결과 공개, 피드백, 재시도 및 다음 활동 접근 조건.\n4. 저장·제출·평가 실패나 지연에서 보존할 정보와 사용자에게 보여 줄 상태.\n5. 위 규칙에 맞는 활동 목록·상태 배지·피드백 화면과 디자인 선택 이유.\n열람을 평가 통과로 간주하지 말고, 예시 정책을 확정 요구사항으로 쓰지 말아 줘. 실제 저장·평가·코드 실행 등은 지원 환경을 확인해 구현하고, 데모만 있다면 실제 기능과 구분해 줘.',
    },
    en: {
      domain: 'Education',
      title: 'Learning activities, submissions, feedback and completion',
      summary: 'Distinguish viewing content from completing learning, and connect activities, submissions, feedback and progress.',
      overview: 'Lessons, reading, quizzes, practice and discussions produce different kinds of learner work. When designing an education service, connect a learning outcome with an activity and evidence of understanding, then decide who judges completion and under which conditions. The workflow below is a design reference to adapt to the learners and course format.',
      concepts: [
        { name: 'Learning outcome and evidence', description: 'Pair what learners should be able to do with evidence that demonstrates it, such as an explanation, worked solution, presentation or practice result.' },
        { name: 'Learning activity', description: 'A unit such as reading, watching, solving, writing or discussing. Inputs and results differ, so activities do not all need the same completion button.' },
        { name: 'Submission and assessment', description: 'Distinguish saving a draft, submitting final work and receiving an assessment result. Decide whether assessment uses self-checks, peers, instructors or automation.' },
        { name: 'Progress and completion', description: 'Progress describes how far an activity has advanced; completion means agreed criteria have been met. Define criteria so viewing, submitting and passing do not become one status.' },
        { name: 'Retries and access to the next activity', description: 'Retry and resubmission conditions, preservation of previous results and access to later activities are separate policy decisions. Sequential locking is not required for every course.' },
      ],
      workflow: [
        { name: 'Choose an outcome and activity', description: 'Identify the learners and outcome, then select activities and evidence such as reading, quizzes or assignments.' },
        { name: 'Separate work in progress from submission', description: 'Show drafts separately from submitted work. If saving or submitting fails, show the failure and the actions learners can take next.' },
        { name: 'Connect results and feedback', description: 'Decide who assesses work, against which criteria, and when results and feedback become visible. Separate pending assessment from passing.' },
        { name: 'Explain completion and next actions', description: 'Mark completion when agreed criteria are met. If retries or later activities are available, explain the conditions and route to them.' },
      ],
      pitfalls: [
        { name: 'Treating viewing as understanding or passing', description: 'Opening a page or finishing a video does not by itself demonstrate understanding. Distinguish viewing completion from assessment success in the interface and data.' },
        { name: 'Merging drafts, submissions and assessment', description: 'An autosave message should not imply final submission. Decide which actions remain available after deadlines, during resubmission and while assessment is pending.' },
        { name: 'Showing only a progress percentage', description: 'Explain the basis of the percentage and which activities remain. Confirm whether it uses activity counts, weights or viewing time.' },
      ],
      questions: [
        'Who are the learners, what prior knowledge and access environment do they have, and what should they be able to do afterwards?',
        'Which lessons, quizzes, assignments or discussions are needed, and what evidence will demonstrate learning?',
        'Does completion require viewing, submission or passing? What denominator and calculation define progress?',
        'Who assesses work and when are results and feedback released? What can learners and instructors see?',
        'How are deadlines, late work, retries and resubmissions handled? Are later activities freely accessible or conditional?',
        'If progress saving, submission or assessment fails or is delayed, what is preserved and what status and retry path are shown?',
      ],
      example: 'Example: a writing course could separate reading materials from submitting an essay. Learners confirm reading, while essays move through draft, submission and instructor feedback. Decide whether submission or revision after feedback counts as completion before designing status badges and next actions. This is one example, not an established policy for the service being built.',
      relatedDesigns: [
        { id: 'onboarding-progress-checklist', reason: 'A reference for listing required activities and remaining steps. The demo checkbox does not determine actual learning completion.' },
        { id: 'inline-edit-field', reason: 'A reference for editing and save-status presentation of activity titles or short answers. Assignment persistence, submission and assessment need separate implementation.' },
      ],
      promptSnippet: 'Help design an education service. First ask about learners, outcomes, activity types, evidence of understanding, assessors, completion criteria, progress calculation, deadlines and resubmission policy. Do not assume undecided policies.\nBased on the answers, describe:\n1. Learner and instructor roles, visible information and available actions.\n2. Activity progress and, where applicable, distinct draft, submitted, pending assessment and result states.\n3. Result release, feedback, retries and access conditions for later activities.\n4. Information to preserve and status to show when saving, submission or assessment fails or is delayed.\n5. Activity lists, status badges and feedback screens that express these rules, with reasons for the design choices.\nDo not equate viewing with passing or turn example policies into agreed requirements. Confirm the supported environment for real persistence, assessment or code execution, and distinguish any demo from actual functionality.',
    },
  },
  sources: [
    { title: 'MoodleDocs — Activity completion', url: 'https://docs.moodle.org/en/Activity_completion' },
    { title: 'MoodleDocs — Assignment settings', url: 'https://docs.moodle.org/en/Assignment_settings' },
  ],
}, {
  id: 'education-curriculum-prerequisite-and-cohort',
  aliases: {
    ko: ['커리큘럼 설계', '선수 과목 잠금', '기수제 강의 운영', '코호트 수강 관리', '수강 기간 설정'],
    en: ['curriculum structure', 'course prerequisites', 'cohort-based course', 'enrollment window management', 'module unlock rules'],
  },
  useCases: {
    ko: ['주차·모듈·단원 계층으로 커리큘럼을 편성할 때', '선수 단원 이수나 특정 날짜 도래에 따라 다음 강의를 열 때', '상시 수강과 기수(코호트)제 운영 방식을 구분할 때', '수강 시작일·종료일과 복습 열람 유예 기간을 설계할 때'],
    en: ['Structuring a course into modules, sections and lessons', 'Unlocking subsequent units by prerequisites or scheduled release dates', 'Distinguishing self-paced enrollment from cohort-based schedules', 'Designing access start dates, expiration dates and review extension windows'],
  },
  keywords: {
    ko: ['커리큘럼', '단원', '모듈', '선수 조건', '기수', '코호트', '수강 기간', '복습 기간', '순차 오픈'],
    en: ['curriculum', 'module', 'syllabus', 'prerequisite', 'cohort', 'enrollment window', 'drip schedule', 'course access', 'sequential unlock'],
  },
  text: {
    ko: {
      domain: '교육',
      title: '커리큘럼 편성·선수 조건·기수(코호트) 및 수강 기간 관리',
      summary: '강의를 모듈·단원으로 구조화하고, 선수 조건과 기수별 일정·수강 만료 후 열람 범위를 연결합니다.',
      overview: '강의 목록을 순서대로 나열하는 것만으로는 수업 운영 방식이 정해지지 않습니다. 학습자가 원하는 단원부터 자유롭게 볼 수 있는지, 선수 단원을 마쳐야 다음 단원이 열리는지, 기수별로 같은 주차에 열리는지에 따라 화면 안내와 접근 제어가 달라집니다. 아래 흐름은 커리큘럼과 수강 기간 설계를 위한 참고이며 특정 교육 과정의 운영 규칙을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '커리큘럼 계층과 학습 단위', description: '과정·모듈(주차)·단원·세부 활동의 상하 구조를 정의하고, 각 단위가 필수인지 선택인지 구분합니다.' },
        { name: '선수 조건(Prerequisite)과 오픈 방식', description: '이전 필수 단원 충족, 특정 일시 도래, 강사 수동 개방 중 무엇으로 다음 단원을 열지 정합니다.' },
        { name: '상시 수강과 기수(코호트) 운영', description: '결제·신청 시점부터 개인별 수강 일수를 세는 상시형과, 정해진 개강일·종강일을 공유하는 기수제를 구분합니다.' },
        { name: '수강 만료와 복습 열람 범위', description: '수강 기간이 끝난 뒤 영상 시청·자료 내려받기·질문 작성·기존 제출물 열람 중 무엇을 유지하고 무엇을 제한할지 정합니다.' },
      ],
      workflow: [
        { name: '단원 구조와 필수 여부 배치하기', description: '모듈과 단원 순서를 정하고 필수·선택 표시와 예상 소요 시간을 학습자에게 안내합니다.' },
        { name: '단원 잠금 사유와 해제 조건 표시하기', description: '잠긴 단원은 클릭만 막지 않고 어떤 선수 단원이나 오픈 일시가 남았는지 명확히 보여 줍니다.' },
        { name: '기수 일정과 개인 수강 기간 계산하기', description: '개강 전 대기, 수강 중, 복습 기간, 만료 상태를 구분하고 남은 일수와 기준 시각을 표시합니다.' },
        { name: '과정 개편이나 기수 이동 처리하기', description: '수강 중 커리큘럼이 수정되거나 다음 기수로 연기할 때 기존 이수 기록과 열람 권한을 어떻게 이어받을지 적용합니다.' },
      ],
      pitfalls: [
        { name: '목록 UI만 잠그고 상세 경로 접근을 열어 두기', description: '커리큘럼 화면에서 자물쇠 아이콘만 표시하고 단원 URL 직접 접근을 막지 않으면 선수 조건과 개강일 규칙이 무력화됩니다.' },
        { name: '기수 변경이나 수강 연장 시 기준일을 덮어쓰기', description: '원래 개강일과 연장된 종료일을 구분하지 않으면 주차별 오픈 일정과 출석·과제 마감 계산이 함께 어긋납니다.' },
        { name: '수강 중 추가·삭제된 단원으로 완료율을 갑자기 바꾸기', description: '이미 과정을 마친 학습자에게 새 필수 단원을 소급 적용하면 완료 상태가 풀릴 수 있으므로 버전이나 적용 대상을 구분하세요.' },
      ],
      questions: [
        '과정은 상시 수강형인가요, 기수(코호트)별 개강·종강 일정이 있는 형태인가요?',
        '단원은 처음부터 모두 열리나요, 선수 단원 이수나 주차별 지정 일시에 따라 순차적으로 열리나요?',
        '수강 기간 만료 후에도 기존에 제출한 결과물이나 강의 자료를 복습용으로 계속 열람할 수 있나요?',
        '수강 일시정지·기간 연장·기수 변경을 허용한다면 기존 진도와 마감일은 어떻게 조정하나요?',
        '운영 중 단원이 추가·삭제되거나 순서가 바뀔 때 이미 수강 중인 학습자에게는 어떻게 반영하나요?',
      ],
      example: '예시: 8주 코호트 과정에서 매주 월요일 오전 9시에 해당 주차 모듈을 열고, 이전 주차 필수 과제를 제출해야 실습 단원에 들어갈 수 있으며, 종강 후 30일 동안은 영상 복습만 허용하도록 구성할 수 있습니다. 이는 참고용 예시이며 실제 과정의 오픈 조건과 수강 기간 정책은 별도로 확정해야 합니다.',
      relatedDesigns: [
        { id: 'onboarding-progress-checklist', reason: '모듈별 필수 단원과 남은 선수 조건을 단계별 체크리스트로 보여 주는 표현에 참고할 수 있습니다. 실제 단원 잠금 해제나 수강 기간 검증은 별도로 구현해야 합니다.' },
        { id: 'vertical-rail-tabs', reason: '주차·모듈 탐색 레일과 선택 단원 상세 영역을 나란히 배치하는 레이아웃에 참고할 수 있습니다. 실제 커리큘럼 데이터와 권한 제어는 포함하지 않습니다.' },
      ],
      promptSnippet: '교육 과정의 커리큘럼 편성·선수 조건·기수(코호트) 및 수강 기간 관리 흐름을 설계해 줘. 먼저 상시/기수제 운영 방식, 단원 순차 오픈 및 선수 조건, 수강 시작·만료 기준, 만료 후 복습 열람 범위, 과정 개편·기수 이동 시 진도 승계 규칙을 질문하고 정해지지 않은 정책을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 과정·모듈·단원의 구조와 필수/선택 및 잠금 해제 조건.\n2. 개강 전·수강 중·복습 유예·만료 상태별 학습자와 강사의 열람 범위 및 가능한 행동.\n3. 선수 조건 미충족·오픈 일시 전·수강 만료 시 화면 안내와 실제 접근 제어 기준.\n4. 수강 연장·기수 변경·중도 커리큘럼 수정 시 기존 이수 기록과 마감일 처리 방식.\n5. 커리큘럼 목차·잠금 배지·남은 수강 기간 안내 화면과 디자인 선택 이유.\n예시 정책을 확정 요구사항으로 쓰지 말고, 디자인 데모와 실제 수강 권한·일정 검증 구현을 구분해 줘.',
    },
    en: {
      domain: 'Education',
      title: 'Curriculum structure, prerequisites, cohorts and enrollment windows',
      summary: 'Organize courses into modules and units, and connect prerequisite rules, cohort schedules and post-expiration access scope.',
      overview: 'Listing lessons in order does not define how a course runs. Whether learners can jump to any unit, must satisfy prerequisites first, or follow a cohort release schedule changes both user guidance and access control. The workflow below is a design reference for curriculum and enrollment management, not a default rule set for every course.',
      concepts: [
        { name: 'Curriculum hierarchy and learning units', description: 'Define the hierarchy of courses, modules or weeks, units and activities, and distinguish required units from optional ones.' },
        { name: 'Prerequisites and release conditions', description: 'Decide whether later units unlock after completing prior required units, reaching a scheduled release date or manual instructor action.' },
        { name: 'Self-paced versus cohort schedules', description: 'Separate rolling self-paced access counted from each learner’s enrollment date from cohort courses that share fixed start and end dates.' },
        { name: 'Expiration and review access scope', description: 'Define which actions remain available after enrollment ends, such as video review, material downloads, posting questions or viewing past submissions.' },
      ],
      workflow: [
        { name: 'Arrange module structure and requirements', description: 'Order modules and units clearly and show required versus optional labels along with estimated study time.' },
        { name: 'Explain lock reasons and unlock criteria', description: 'Instead of silently disabling locked units, state which prerequisite unit or scheduled release date is still pending.' },
        { name: 'Calculate cohort dates and personal access windows', description: 'Distinguish pre-start, active enrollment, review grace period and expired states with clear remaining days and timezone labels.' },
        { name: 'Handle syllabus updates and cohort transfers', description: 'Apply clear rules for preserving completed units and recalculating due dates when curricula change or a learner moves to another cohort.' },
      ],
      pitfalls: [
        { name: 'Locking only the syllabus list while leaving direct URLs open', description: 'Showing a lock icon on the outline without enforcing access checks on unit pages lets learners bypass prerequisites and release dates.' },
        { name: 'Overwriting original start dates during extensions or transfers', description: 'Losing the separation between cohort schedule anchors and individual extensions breaks weekly unlock dates and deadline calculations.' },
        { name: 'Retroactively invalidating finished learners when adding units', description: 'Adding new required units to an active course without versioning or cohort scoping can unexpectedly drop completed learners back to incomplete.' },
      ],
      questions: [
        'Is the course self-paced from each learner’s signup date or run in cohorts with shared start and end dates?',
        'Are all units open from day one, or unlocked sequentially by prerequisite units or scheduled release dates?',
        'After the enrollment window expires, can learners still review videos, materials or their own past submissions?',
        'If pauses, extensions or cohort transfers are allowed, how are existing progress records and due dates adjusted?',
        'When units are added, reordered or removed mid-course, how does that affect learners already in progress?',
      ],
      example: 'Example: an 8-week cohort course could release each weekly module on Mondays at 9:00 AM, require the prior week’s assignment before opening lab units, and provide a 30-day read-only review period after the cohort ends. This is only a reference example, not an established policy for the service.',
      relatedDesigns: [
        { id: 'onboarding-progress-checklist', reason: 'A reference for displaying module requirements and remaining prerequisite steps as a checklist. Real unit unlock logic and access-window enforcement require separate implementation.' },
        { id: 'vertical-rail-tabs', reason: 'A reference for pairing a module navigation rail with a unit detail pane. It does not implement curriculum storage or access control.' },
      ],
      promptSnippet: 'Help design a course curriculum structure, prerequisite rules, cohort schedule and enrollment window workflow. First ask about self-paced versus cohort operation, sequential unlock and prerequisite rules, enrollment start/expiration dates, post-expiration review access scope, and progress carryover during curriculum edits or cohort transfers. Do not assume undecided policies.\nBased on the answers, describe:\n1. Course, module and unit hierarchy with required/optional flags and unlock conditions.\n2. Access scope and allowed actions for learners and instructors across pre-start, active, review-extension and expired states.\n3. User guidance and server-side access checks when prerequisites are unmet, release dates have not arrived or enrollment has expired.\n4. How existing completion records and deadlines behave during extensions, cohort switches or syllabus updates.\n5. Syllabus navigation, lock badges and enrollment-period notices with reasons for the design choices.\nDo not turn example rules into confirmed requirements, and distinguish design demos from real access-control and scheduling enforcement.',
    },
  },
  sources: [
    { title: 'Canvas LMS Community — How do I add prerequisites to a module?', url: 'https://community.canvaslms.com/t5/Instructor-Guide/How-do-I-add-prerequisites-to-a-module/ta-p/1123' },
    { title: 'MoodleDocs — Course enrolment and access dates', url: 'https://docs.moodle.org/en/Course_enrolment' },
  ],
}, {
  id: 'education-live-session-attendance-and-replay',
  aliases: {
    ko: ['실시간 온라인 수업', '라이브 강의 출석', '화상 수업 출결 관리', '실시간 강의 다시보기', '녹화본 전환 수업'],
    en: ['live online class', 'virtual classroom attendance', 'webinar session attendance', 'live lesson replay transition', 'recorded session fallback'],
  },
  useCases: {
    ko: ['화상 강의·실시간 세미나와 출석 체크를 함께 운영할 때', '입장 시각·체류 시간 기준의 출석·지각·결석 판정을 정할 때', '실시간 수업 종료 후 녹화 다시보기(VOD) 공개 시점을 연결할 때', '네트워크 끊김 재입장이나 다시보기 대체 출석 규칙을 설계할 때'],
    en: ['Running live virtual classes or webinars with attendance tracking', 'Defining present, late and absent criteria from join time and duration', 'Transitioning a finished live session into an on-demand replay', 'Handling reconnects after network drops or replay-based makeup attendance'],
  },
  keywords: {
    ko: ['실시간 수업', '라이브 강의', '출석', '지각', '결석', '체류 시간', '다시보기', '녹화본', '입장 대기실'],
    en: ['live session', 'virtual class', 'attendance', 'tardiness', 'absence', 'watch duration', 'replay', 'recording', 'waiting room'],
  },
  text: {
    ko: {
      domain: '교육',
      title: '실시간 수업·출석 인정 기준·다시보기 전환 흐름',
      summary: '수업 시작 전 대기부터 실시간 출결 판정, 종료 후 녹화 다시보기 공개와 대체 출석 여부를 연결합니다.',
      overview: '실시간 수업은 정해진 시각에 입장 링크를 여는 것부터 중도 재접속, 출석 시간 합산, 종료 후 녹화본 게시까지 시간에 따라 상태가 빠르게 바뀝니다. 입장 버튼 클릭만으로 출석을 확정하거나 수업 종료 즉시 다시보기가 준비된다고 가정하면 실제 운영에서 빈 화면과 출결 누락이 생깁니다. 아래 내용은 실시간 수업 설계를 위한 참고이며 특정 교육 기관의 출결 규정을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '세션 진행 단계와 입장 조건', description: '시작 전 대기·입장 가능(준비 시간)·진행 중·종료·녹화본 처리 중·다시보기 공개 단계를 구분하고 각 단계에서 보여 줄 행동을 정합니다.' },
        { name: '출석·지각·결석 판정 기준', description: '최초 입장 시각, 총 체류 시간 합산, 중간 출석 확인 응답 중 무엇으로 출결을 계산할지 정하고 재접속 기록 합산 규칙을 정의합니다.' },
        { name: '다시보기(Replay) 전환과 열람 범위', description: '실시간 종료 후 녹화 파일 인코딩·검수 대기를 거쳐 언제 다시보기를 열지, 수강생 전체 열람인지 참석자 한정인지 정합니다.' },
        { name: '대체 출석과 강사 수동 보정', description: '다시보기 시청으로 결석을 보완할 수 있는지, 기기 오류나 공결 사유가 있을 때 강사가 출결 상태를 수정할 수 있는지 정합니다.' },
      ],
      workflow: [
        { name: '시작 시각과 입장 가능 시점 안내하기', description: '세션 시작 시각, 시간대, 사전 입장 가능 시간을 표시하고 시작 전에는 대기 안내와 사전 자료를 제공합니다.' },
        { name: '입장·재접속 기록과 출결 상태 연결하기', description: '중간에 연결이 끊겼다 다시 들어온 시간을 합산해 임시 출결 상태를 계산하고 최종 확정 시점을 안내합니다.' },
        { name: '종료 후 다시보기 준비 상태 분리하기', description: '수업이 끝난 직후에는 종료 안내와 녹화본 준비 중 상태를 표시하고, 파일 준비가 끝난 뒤 다시보기 재생으로 전환합니다.' },
        { name: '출결 확정 및 보충 경로 제공하기', description: '세션 종료 후 확정된 출석·지각·결석을 보여 주고, 대체 과제나 다시보기 인정 또는 정정 요청 경로가 있다면 안내합니다.' },
      ],
      pitfalls: [
        { name: '입장 버튼 클릭 1회를 전체 출석으로 처리하기', description: '수업 시작 직후 들어왔다 바로 나간 경우와 끝까지 참여한 경우를 구분할지, 최소 체류 시간이 필요한지 먼저 정해야 합니다.' },
        { name: '수업 종료 즉시 녹화 영상이 재생된다고 가정하기', description: '실시간 방송이 끝난 뒤 녹화본 업로드와 변환에는 시간이 걸립니다. 영상 준비 중 상태와 실패 시 안내를 별도로 두세요.' },
        { name: '재접속 세션을 별도 인원으로 쪼개 체류 시간을 누락하기', description: '모바일 전환이나 네트워크 재연결로 여러 번 입장했을 때 기록이 합산되지 않으면 정상 참여자가 결석 처리될 수 있습니다.' },
      ],
      questions: [
        '실시간 수업 입장은 시작 몇 분 전부터 열리며, 지각 입장 마감 시각이 따로 있나요?',
        '출석·지각·결석은 입장 시각과 총 체류 시간 중 어떤 기준으로 판정하며, 끊김 후 재접속 시간은 합산하나요?',
        '수업 종료 후 녹화 다시보기를 제공하나요? 자동 공개인가요, 강사 검수 후 공개인가요?',
        '실시간에 불참한 학습자가 다시보기를 시청하면 출석이나 지각 보완으로 인정하나요?',
        '화상 연결 오류나 공결 사유가 있을 때 강사가 출결 결과를 수동으로 정정할 수 있나요?',
      ],
      example: '예시: 60분 실시간 세미나에서 시작 10분 전부터 입장을 열고, 시작 후 15분 이내 입장 및 총 45분 이상 체류 시 출석으로 인정하며, 종료 후 강사가 녹화본을 확인해 게시하면 결석자가 7일 내 시청 시 지각 출석으로 보완하도록 정할 수 있습니다. 이는 참고 예시이며 실제 출결 규칙은 수업 운영 기준에 맞게 결정해야 합니다.',
      relatedDesigns: [
        { id: 'ly-time-grid-agenda', reason: '주차별 실시간 수업 일정과 시작·종료 시간대를 시간표 형태로 배치하는 표현에 참고할 수 있습니다. 실제 화상 입장 제어와 출결 계산은 별도로 구현해야 합니다.' },
        { id: 'sticky-announcement-banner', reason: '수업 시작 임박이나 입장 가능 상태를 화면 상단에 고정 배너로 알리는 표현에 참고할 수 있습니다. 실제 세션 상태 감지는 포함하지 않습니다.' },
      ],
      promptSnippet: '교육 서비스의 실시간 수업·출석 인정 기준·다시보기 전환 흐름을 설계해 줘. 먼저 사전 입장 가능 시간, 출석·지각·결석 판정 기준(입장 시각·체류 시간 합산), 재접속 처리, 종료 후 다시보기 공개 절차와 대체 출석 인정 여부를 질문하고 정해지지 않은 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 시작 전·입장 가능·진행 중·종료(녹화 준비 중)·다시보기 공개 단계별 화면 상태와 가능한 행동.\n2. 입장·퇴장·재접속 기록 수집 기준과 출석·지각·결석 판정 및 강사 수동 보정 규칙.\n3. 다시보기 공개 조건과 실시간 불참자의 보충 인정 범위.\n4. 화상 연결 실패·녹화 변환 지연·중복 접속 시 데이터 보존과 사용자 안내.\n5. 일정 목록·실시간 입장 배너·출결 현황·다시보기 화면 구성과 디자인 선택 이유.\n입장 클릭만으로 출석을 단정하거나 종료 즉시 녹화본이 준비된다고 가정하지 말고, 디자인 데모와 실제 화상·출결 기록 시스템을 구분해 줘.',
    },
    en: {
      domain: 'Education',
      title: 'Live sessions, attendance criteria and replay transition',
      summary: 'Connect pre-session waiting rooms, live attendance grading, post-session recording preparation and replay makeup rules.',
      overview: 'A live class moves rapidly through pre-join waiting, active streaming, mid-session reconnects, attendance calculation and post-class recording publication. Assuming a single join click proves full attendance or that a replay is instantly playable the second a session ends leads to broken screens and disputed attendance logs. The concepts below are design references, not default attendance policies.',
      concepts: [
        { name: 'Session lifecycle stages and join windows', description: 'Distinguish scheduled, lobby open, live in progress, ended (processing recording) and replay published stages, along with allowed actions in each.' },
        { name: 'Present, late and absent criteria', description: 'Define how initial join timestamp, cumulative stay duration or live check-in prompts determine attendance, including how reconnect intervals are summed.' },
        { name: 'Replay preparation and exposure scope', description: 'Separate the end of the live broadcast from replay availability after encoding or instructor review, and decide who can watch the recording.' },
        { name: 'Makeup credit and manual instructor override', description: 'Clarify whether watching the replay grants partial or full attendance credit and how instructors adjust records for excused absences or technical faults.' },
      ],
      workflow: [
        { name: 'Show session schedule and lobby open time', description: 'Display start time, timezone and early-join window clearly, offering waiting-room status and session materials before the class begins.' },
        { name: 'Aggregate join and reconnect logs for attendance', description: 'Combine multiple join/leave segments caused by network drops before evaluating present, late or absent status.' },
        { name: 'Separate session end from replay readiness', description: 'Show a processing notice right after the live stream ends and switch to the video player only after the recording is ready and approved.' },
        { name: 'Confirm final attendance and makeup options', description: 'Present finalized attendance status alongside any available replay makeup window or attendance correction request path.' },
      ],
      pitfalls: [
        { name: 'Counting a single join click as full attendance', description: 'Decide whether learners who join for one minute and leave are treated the same as those who stay for the required duration.' },
        { name: 'Assuming recordings are playable immediately at session end', description: 'Video transcoding and instructor review take time. Provide an explicit recording-pending state and fallback message if recording fails.' },
        { name: 'Splitting reconnects into separate unmerged records', description: 'If switching devices or recovering from Wi-Fi drops creates separate short logs without summing duration, active learners may be marked absent.' },
      ],
      questions: [
        'How many minutes before start time can learners enter the session, and is there a cutoff time for late entry?',
        'Is attendance based on join time, total cumulative duration or live check-ins, and how are disconnects and reconnects counted?',
        'Are recordings published automatically after processing, or only after an instructor reviews and approves them?',
        'Does watching the replay within a set window count as makeup attendance or tardy credit for absent learners?',
        'Can instructors manually override attendance records when technical failures or excused absences occur?',
      ],
      example: 'Example: a 60-minute live class could open its lobby 10 minutes early, mark learners present if they join within 15 minutes and stay at least 45 cumulative minutes, and allow absentees who watch the instructor-approved replay within 7 days to receive partial attendance credit. This is a reference example, not an established policy.',
      relatedDesigns: [
        { id: 'ly-time-grid-agenda', reason: 'A reference for placing live class sessions along a weekly time grid. Real join-window enforcement and attendance calculation need separate implementation.' },
        { id: 'sticky-announcement-banner', reason: 'A reference for pinning an upcoming or live session join notice at the top of the view. It does not track live session state.' },
      ],
      promptSnippet: 'Help design a live class session, attendance tracking and replay transition workflow. First ask about early-join windows, present/late/absent rules (join cutoff and cumulative duration), reconnect aggregation, replay publication steps and replay makeup credit. Do not assume undecided rules.\nBased on the answers, describe:\n1. Screen states and allowed actions across scheduled, lobby-open, live, recording-processing and replay-available stages.\n2. Join/leave log aggregation rules, attendance status calculation and instructor override permissions.\n3. Replay exposure conditions and makeup credit rules for learners who missed the live session.\n4. Data preservation and user guidance during stream failures, delayed recording processing or duplicate device joins.\n5. Schedule views, live join banners, attendance summaries and replay screens with reasons for the design choices.\nDo not equate a single join click with full attendance or assume instant replay availability at session end, and distinguish design demos from real streaming and attendance systems.',
    },
  },
  sources: [
    { title: 'Zoom Support — Viewing participant attendance statuses in meetings', url: 'https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0059217' },
    { title: 'Canvas LMS Community — Conferences and recordings', url: 'https://community.canvaslms.com/t5/Instructor-Guide/How-do-I-use-the-Conferences-Index-Page/ta-p/855' },
  ],
}, {
  id: 'education-exam-timer-grading-and-appeal',
  aliases: {
    ko: ['온라인 시험 시스템', '시간 제한 평가 시험', '자동 채점과 수동 채점', '시험 답안 임시 저장', '성적 공개와 재채점 요청'],
    en: ['timed online exam', 'exam timer and auto-submit', 'auto and manual grading', 'exam answer working copy', 'grade release and score review'],
  },
  useCases: {
    ko: ['제한 시간이 있는 온라인 시험이나 정기 고사 응시 화면을 만들 때', '응시 중 답안 작업본 저장과 시간 종료 시 자동 제출을 다룰 때', '객관식 자동 채점과 서술형 강사 수동 채점을 함께 연결할 때', '성적·정오표 공개 시점과 문항 오류·채점 재검토 절차를 설계할 때'],
    en: ['Building a timed online exam or proctored test-taking flow', 'Handling working-copy answer saves and automatic submission when time expires', 'Combining automated objective grading with manual instructor grading', 'Designing score release timing, answer-key disclosure and grade review requests'],
  },
  keywords: {
    ko: ['시험', '정기 고사', '제한 시간', '타이머', '자동 제출', '자동 채점', '수동 채점', '정오표', '성적 재검토'],
    en: ['exam', 'timed test', 'time limit', 'countdown timer', 'auto-submit', 'auto grading', 'manual grading', 'answer key', 'score review'],
  },
  text: {
    ko: {
      domain: '교육',
      title: '시간 제한 시험·자동/수동 채점·정오표 및 성적 재검토',
      summary: '응시 타이머와 답안 작업본 보존을 연결하고, 자동·수동 채점 완료 후 성적 공개와 재검토 절차를 다룹니다.',
      overview: '시간 제한이 있는 시험에서는 브라우저를 새로고침하거나 네트워크가 잠시 흔들려도 응시 시간과 작성 중이던 답안 작업본이 일관되게 유지되어야 합니다. 또한 객관식 점수가 바로 계산되더라도 서술형 문항이 남아 있으면 전체 성적은 채점 대기 상태여야 하며, 다른 응시자가 시험을 치르는 동안 정답과 해설이 먼저 노출되지 않도록 공개 시점을 분리해야 합니다. 아래 내용은 시험·채점 흐름 설계를 위한 참고이며 특정 시험의 배점이나 재검토 규정을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '서버 기준 타이머와 응시 만료', description: '타이머를 브라우저 시계에만 맡기지 않고 응시 시작 시각과 전체 시험 종료 시각 중 더 이른 시점을 기준으로 남은 시간을 계산합니다.' },
        { name: '답안 작업본(Working copy)과 최종 제출', description: '문항 이동·선택 시 저장되는 답안 작업본과 응시자가 직접 누르거나 시간 종료로 확정되는 최종 제출 상태를 구분합니다.' },
        { name: '혼합 채점(자동·수동)과 부분 점수', description: '객관식·단답형 자동 채점 결과와 서술형·실습형 강사 채점 결과를 합산하며, 수동 채점 완료 전에는 총점을 가확정 또는 채점 중으로 표시합니다.' },
        { name: '성적·정오표 공개와 재검토 요청', description: '점수만 먼저 보여 줄지, 문항별 정오표와 해설까지 공개할지 시점을 나누고, 채점 결과 재검토 요청 기한과 점수 정정 이력을 관리합니다.' },
      ],
      workflow: [
        { name: '응시 조건과 제한 시간 확인 후 시작하기', description: '응시 가능 기간, 제한 시간, 허용 응시 횟수, 시간 종료 시 처리 방식을 시작 전에 명확히 안내합니다.' },
        { name: '답안 작업본 보존과 시간 종료 제출 처리하기', description: '문항별 답안 변경을 주기적으로 보존하고, 제한 시간이 끝나면 마지막으로 확인된 답안 작업본을 기준으로 제출을 마감합니다.' },
        { name: '자동 채점과 강사 수동 채점 합산하기', description: '자동 채점 문항을 먼저 계산하되 수동 채점 문항이 남아 있으면 채점 대기 상태를 유지하고, 모든 문항 채점 후 총점을 확정합니다.' },
        { name: '성적 공개 및 재검토 결과 반영하기', description: '약속한 공개 시점에 점수와 정오표를 열고, 재검토 요청이나 문항 전원 정답 처리 시 대상 응시자의 점수를 재계산합니다.' },
      ],
      pitfalls: [
        { name: '클라이언트 타이머만 믿고 시간 종료를 판단하기', description: '사용자 기기 시간을 바꾸거나 창을 닫았다 열면 타이머가 왜곡될 수 있습니다. 서버의 응시 시작·마감 시각을 기준으로 제출 가능 여부를 검증하세요.' },
        { name: '서술형 채점 전에 자동 채점 점수만으로 총점을 확정하기', description: '수동 채점 문항이 0점으로 합산된 상태를 최종 성적처럼 보여 주면 불필요한 재검토 문의가 쏟아집니다. 채점 중과 최종 공개를 분리하세요.' },
        { name: '시험 마감 전 완료자에게 정답과 해설을 즉시 노출하기', description: '아직 응시하지 않은 학습자가 남아 있는 상태에서 정오표가 먼저 열리면 공정성 문제가 생깁니다. 제출 직후 화면과 전체 마감 후 열람 범위를 구분하세요.' },
      ],
      questions: [
        '시험 제한 시간은 개인별 응시 시작 시점부터 흐르나요, 정해진 종료 시각에 일괄 마감되나요?',
        '응시 중 브라우저가 닫히거나 연결이 끊기면 타이머는 계속 흐르나요, 마지막 답안 작업본으로 자동 제출되나요?',
        '객관식 자동 채점 외에 강사가 직접 채점해야 하는 문항이 있으며, 전체 성적은 언제 공개하나요?',
        '성적 공개 시 총점만 보여 주나요, 문항별 내 답안·정답·해설(정오표)까지 함께 열어 주나요?',
        '채점 결과 재검토 요청 기간이나 문항 오류에 따른 일괄 재채점(전원 정답 등) 절차가 필요한가요?',
      ],
      example: '예시: 40분 제한 시험에서 응시 시작 즉시 서버 종료 시각을 고정하고, 문항 이동 시마다 답안 작업본을 저장하며, 객관식은 자동 계산하되 서술형 채점이 끝난 뒤 시험 전체 마감 시각 이후에 정오표와 총점을 공개하고 48시간 동안 성적 재검토 요청을 받도록 구성할 수 있습니다. 이는 참고 예시이며 실제 시험 규정은 별도로 확정해야 합니다.',
      relatedDesigns: [
        { id: 'onboarding-progress-checklist', reason: '전체 문항 중 답변 완료·보류 표기·미작성 문항 현황을 짚어 주는 탐색 목록 표현에 참고할 수 있습니다. 실제 타이머 동기화나 채점 기능은 구현하지 않습니다.' },
        { id: 'ly-context-code-diff', reason: '제출한 답안과 채점 기준·모범 답안을 나란히 대조해 보여 주는 정오표 화면에 참고할 수 있습니다. 실제 정답 비교와 점수 계산은 별도로 구현해야 합니다.' },
      ],
      promptSnippet: '시간 제한 시험·자동/수동 채점·정오표 및 성적 재검토 흐름을 설계해 줘. 먼저 타이머 기준(개인별 제한 시간 vs 전체 마감 시각), 응시 중 답안 작업본 보존과 시간 종료 시 자동 제출 규칙, 자동·수동 채점 구성, 성적·정오표 공개 시점, 성적 재검토 요청 및 일괄 재채점 정책을 질문하고 정해지지 않은 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 응시 전·응시 중·제출 완료·채점 중·성적 공개·재검토 진행 상태별 화면과 가능한 행동.\n2. 서버 기준 남은 시간 계산, 답안 작업본 저장, 시간 만료 및 재접속 시 제출 처리 규칙.\n3. 객관식 자동 채점과 서술형 수동 채점의 합산 및 문항 오류 일괄 재채점 반영 방식.\n4. 제출 중 네트워크 끊김·시간 초과 경합 시 보존할 답안과 사용자 안내.\n5. 시험 응시 화면·문항 이동 패널·채점 결과 및 정오표·재검토 요청 화면과 디자인 선택 이유.\n클라이언트 타이머만으로 마감 시간을 판단하거나 수동 채점 전 점수를 최종 성적으로 표시하지 말고, 디자인 데모와 실제 시험·채점 시스템을 구분해 줘.',
    },
    en: {
      domain: 'Education',
      title: 'Timed exams, auto/manual grading and score review requests',
      summary: 'Coordinate server-anchored exam timers and working-copy answer saves with mixed grading, answer-key release and score review requests.',
      overview: 'In a timed exam, page reloads or brief network drops must not reset the clock or lose the learner’s working copy of answers. Moreover, when an exam mixes auto-graded multiple-choice items with instructor-graded essays, the total score must stay pending until manual grading finishes, and answer keys must not leak while other learners are still testing. The workflow below is a reference for exam design, not a fixed policy.',
      concepts: [
        { name: 'Server-anchored timer and attempt cutoff', description: 'Compute remaining time from the server start timestamp and the hard exam close window rather than trusting only the browser clock.' },
        { name: 'Answer working copy versus final submission', description: 'Separate saved working copies of answers during navigation from final submission triggered by the learner or by timer expiration.' },
        { name: 'Mixed auto/manual grading and provisional totals', description: 'Combine automated objective scoring with manual rubric grading, keeping the overall grade in pending-review status until all manual items are scored.' },
        { name: 'Score disclosure, answer keys and grade review', description: 'Control when total scores, per-question results and explanations become visible, and track score review requests or full-cohort regrades.' },
      ],
      workflow: [
        { name: 'Confirm attempt rules and time limits before starting', description: 'Show the availability window, duration, allowed attempts and expiration behavior before the learner starts the timer.' },
        { name: 'Persist answer working copies and handle timer expiry', description: 'Save answer changes continuously and finalize submission using the latest verified working copy when time runs out.' },
        { name: 'Combine automated and manual grading', description: 'Score objective items automatically while holding final grade release until instructors complete manual items.' },
        { name: 'Release results and process score reviews', description: 'Publish scores and answer keys according to schedule, and recalculate affected grades if a question is rekeyed or a review request succeeds.' },
      ],
      pitfalls: [
        { name: 'Relying only on a client-side countdown timer', description: 'Refreshing the tab or changing the device clock can skew a browser-only timer. Validate attempt start and deadline timestamps on the server.' },
        { name: 'Displaying auto-graded subtotals as the final exam score', description: 'Showing ungraded essay items as zero in a final-looking total triggers confusion. Clearly mark scores as pending manual grading.' },
        { name: 'Revealing correct answers while the exam window is still open', description: 'Showing full answer keys immediately on submission lets early finishers share solutions before the exam window closes for everyone.' },
      ],
      questions: [
        'Does the timer run for a fixed duration from each learner’s start time, or cut off at a hard close time for everyone?',
        'If the browser closes or disconnects mid-exam, does the clock keep running and auto-submit the last saved working copy?',
        'Does the exam combine auto-graded questions with instructor-graded items, and when is the final score released?',
        'Upon release, do learners see only their total score or also per-question feedback, correct answers and explanations?',
        'Is there a window for requesting a score review, and how are faulty questions regraded across all examinees?',
      ],
      example: 'Example: a 40-minute exam could lock a server deadline when started, save a working copy on every question change, hold total scores until essay items are graded, release the answer key after the exam window closes for all learners, and accept score review requests for 48 hours. This is a reference example, not an established policy.',
      relatedDesigns: [
        { id: 'onboarding-progress-checklist', reason: 'A reference for showing answered, flagged and unanswered questions in an exam navigation list. Real timer synchronization and grading require separate implementation.' },
        { id: 'ly-context-code-diff', reason: 'A reference for comparing a learner’s submitted answer against reference criteria or solutions. Real answer evaluation and scoring need separate implementation.' },
      ],
      promptSnippet: 'Help design a timed exam, mixed auto/manual grading, answer-key release and score review workflow. First ask about timer rules (per-attempt duration vs hard close time), working-copy answer saving and auto-submit on expiry, auto versus manual grading items, score and answer-key release timing, and score review or regrade policies. Do not assume undecided rules.\nBased on the answers, describe:\n1. States and allowed actions across pre-start, in-progress, submitted, grading-pending, released and review-requested stages.\n2. Server-anchored timer validation, working-copy persistence and submission handling on timeout or reconnect.\n3. Aggregation of automated and manual grades, plus cohort-wide recalculation when an answer key changes.\n4. Answers to preserve and user feedback when network drops or timeout races happen during submission.\n5. Exam runner, question navigator, result/answer-key view and score review request screens with reasons for the design choices.\nDo not rely solely on client timers or present partial auto-graded totals as final grades, and distinguish design demos from a real assessment engine.',
    },
  },
  sources: [
    { title: 'Canvas LMS Community — Quiz settings and timer behavior', url: 'https://community.canvaslms.com/t5/Instructor-Guide/What-options-can-I-set-in-a-quiz/ta-p/683' },
    { title: 'MoodleDocs — Quiz settings and review options', url: 'https://docs.moodle.org/en/Quiz_settings' },
  ],
}, {
  id: 'education-certificate-issuance-and-verification',
  aliases: {
    ko: ['수료증 발급 시스템', '이수증 진위 확인', '디지털 배지 발급', '수료 요건 충족 검증', '수료증 명의 확정'],
    en: ['certificate issuance system', 'course certificate verification', 'digital credential badge', 'graduation requirement check', 'recipient name lock'],
  },
  useCases: {
    ko: ['과정 이수 후 수료증이나 디지털 인증서를 발급할 때', '발급 전 수료자 실명·영문 표기 확정 절차를 둘 때', '고유 검증 번호나 공개 조회 페이지로 수료증 진위를 확인할 때', '유효기간 만료·환불·부정행위 적발 시 수료증 취소 상태를 다룰 때'],
    en: ['Issuing course certificates or digital credentials after requirements are met', 'Confirming and locking the recipient’s legal or display name before issuance', 'Providing a verification code or public lookup page to validate authenticity', 'Handling certificate expiration, revocation or post-refund invalidation'],
  },
  keywords: {
    ko: ['수료증', '이수증', '자격증', '발급 요건', '명의 확정', '고유 번호', '진위 확인', '유효기간', '발급 취소'],
    en: ['certificate', 'credential', 'issuance', 'recipient name', 'verification code', 'authenticity check', 'expiration date', 'revocation', 'digital badge'],
  },
  text: {
    ko: {
      domain: '교육',
      title: '수료증·자격증 발급 요건·명의 확정·진위 검증과 취소',
      summary: '수료 요건 충족과 발급 시점의 명의 확정을 연결하고, 외부 진위 조회와 만료·취소 상태를 다룹니다.',
      overview: '수료증은 단순한 이미지 저장이 아니라 학습자가 정해진 요건을 충족했다는 증빙입니다. 발급 전에 수료증에 찍힐 이름을 확정해야 이후 계정 별명을 바꿔도 증명서 명의가 흔들리지 않으며, 외부 기관이 고유 번호로 진위를 조회할 때 유효·만료·취소 상태가 명확히 구분되어야 합니다. 아래 내용은 수료증·인증서 설계를 위한 참고이며 특정 기관의 수료 기준이나 법적 효력을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '발급 요건과 스냅샷 기록', description: '진도율, 필수 과제, 시험 점수, 출석률 중 어떤 조합을 충족해야 발급 자격이 생기는지 정하고, 발급 시점의 과정명·발급일·고유 번호를 고정합니다.' },
        { name: '수령인 명의 확정과 수정 제한', description: '계정 프로필 별명과 수료증 표기 이름을 분리하고, 최초 발급 시 이름을 확인·확정한 뒤에는 임의 수정을 제한합니다.' },
        { name: '고유 검증 코드와 외부 진위 조회', description: '인쇄물이나 PDF만으로는 위변조 여부를 알기 어려우므로 고유 검증 번호·URL로 발급 사실과 과정 정보를 대조하는 조회 화면을 둡니다.' },
        { name: '유효기간 만료와 발급 취소(Revocation)', description: '자격 유효기간이 지나 만료된 상태와 환불·대리 응시 등으로 발급 자체가 취소된 상태를 구분해 검증 조회 결과에 반영합니다.' },
      ],
      workflow: [
        { name: '남은 수료 요건과 달성 현황 보여 주기', description: '발급 전에는 필수 진도·점수·출석 중 무엇이 충족되었고 무엇이 남았는지 항목별로 명확히 안내합니다.' },
        { name: '발급 전 수령인 이름 확인 및 확정하기', description: '요건 충족 후 발급 신청 시 표기할 이름(국문·영문 등)을 확인받고, 발급 후 변경 규칙을 안내한 뒤 증명서를 생성합니다.' },
        { name: '증명서 내려받기와 진위 확인 경로 연결하기', description: '발급된 수료증에 고유 번호와 발급일을 표시하고, 제3자가 검증 번호로 유효 여부를 조회할 수 있게 연결합니다.' },
        { name: '재발급·명의 정정·발급 취소 처리하기', description: '개명 등 정당한 사유로 운영자가 명의를 정정하거나 환불·규정 위반으로 수료증을 취소할 때 기존 검증 번호의 조회 상태를 즉시 갱신합니다.' },
      ],
      pitfalls: [
        { name: '프로필 닉네임을 그대로 수료증에 실시간 연결하기', description: '발급 후 사용자가 프로필 이름을 바꿨을 때 기존 수료증 이름까지 함께 바뀌면 증빙 문서로서 신뢰를 잃습니다. 발급 시점 명의를 별도로 고정하세요.' },
        { name: 'PDF 생성만으로 검증 체계를 대신하기', description: '파일 자체는 쉽게 편집될 수 있습니다. 고유 발급 번호와 서버 기준 진위 확인 상태(유효·만료·취소)를 함께 설계하세요.' },
        { name: '수강 환불이나 성적 정정 후에도 기존 수료증을 유효로 두기', description: '점수 재산정으로 미달이 되거나 전액 환불된 경우 이미 발급된 수료증을 유지할지 취소 처리할지 규칙이 있어야 합니다.' },
      ],
      questions: [
        '수료증 발급을 위해 충족해야 하는 진도율·출석률·과제·시험 점수 기준은 무엇인가요?',
        '요건 충족 시 자동 발급되나요, 학습자가 표기 이름을 확인·신청하거나 운영자가 승인해야 발급되나요?',
        '수료증에 표시될 이름(국문·영문)은 언제 확정하며, 발급 후 개명이나 오기재 정정은 누가 처리하나요?',
        '제3자가 고유 번호나 링크로 진위를 확인할 때 어떤 정보(이름 일부·과정명·발급일·유효 상태)를 노출하나요?',
        '수료증에 유효기간이 있나요? 수강 취소·환불이나 규정 위반 확인 시 발급 취소(무효화) 상태가 필요한가요?',
      ],
      example: '예시: 필수 단원 100% 이수 및 최종 시험 80점 이상 달성 시 수료증 발급 버튼이 열리고, 학습자가 영문 성명을 확인·확정하면 고유 검증 번호가 포함된 수료증이 발급되며, 공개 검증 페이지에서는 번호 입력 시 마스킹된 성명·과정명·발급일·유효 상태를 보여 주도록 구성할 수 있습니다. 이는 참고용 예시이며 실제 발급·검증 정책은 별도로 확정해야 합니다.',
      relatedDesigns: [
        { id: 'onboarding-progress-checklist', reason: '수료증 발급까지 남은 필수 진도·과제·시험 요건을 체크리스트로 보여 주는 표현에 참고할 수 있습니다. 실제 요건 판정과 증명서 생성은 별도로 구현해야 합니다.' },
        { id: 'inline-edit-field', reason: '발급 전 수료증 표기 이름을 확인하고 수정·확정하는 입력 표현에 참고할 수 있습니다. 실제 명의 잠금과 발급 후 변경 제한은 별도로 구현해야 합니다.' },
      ],
      promptSnippet: '교육 과정의 수료증·자격증 발급 요건·명의 확정·진위 검증 및 취소 흐름을 설계해 줘. 먼저 발급 자격 조건, 자동 발급 vs 이름 확인 후 발급 방식, 수령인 명의 고정 및 정정 절차, 외부 진위 확인 시 노출할 정보 범위, 유효기간 만료와 발급 취소 정책을 질문하고 정해지지 않은 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 요건 미충족·발급 가능(명의 확인 전)·발급 완료·유효기간 만료·발급 취소 상태와 전환 조건.\n2. 발급 시 고정할 스냅샷 정보(수령인 이름, 과정명, 발급일, 고유 번호)와 프로필 변경 분리 규칙.\n3. 외부 진위 확인 조회 시 입력값과 상태별(유효·만료·취소·미존재) 안내 화면.\n4. PDF 생성 지연·명의 정정 재발급·성적 변경에 따른 취소 발생 시 데이터 처리와 사용자 안내.\n5. 수료 요건 현황·명의 확정 모달·수료증 상세·진위 검증 화면 구성과 디자인 선택 이유.\n프로필 별명을 수료증 명의와 실시간 연동하거나 단순 이미지 생성만으로 진위 검증이 된다고 가정하지 말고, 디자인 데모와 실제 발급·검증 시스템을 구분해 줘.',
    },
    en: {
      domain: 'Education',
      title: 'Certificate issuance requirements, recipient name lock and verification',
      summary: 'Tie qualification checks to recipient name confirmation, immutable credential snapshots, public verification and revocation states.',
      overview: 'A course certificate is more than a downloadable graphic; it is a verifiable record that a learner met specific criteria. Locking the recipient’s name at issuance prevents later profile nickname edits from altering the credential, and a verification lookup must distinguish valid, expired and revoked certificates. The concepts below are design references, not default accreditation or legal rules.',
      concepts: [
        { name: 'Qualification rules and credential snapshot', description: 'Define the required combination of unit progress, assignments, exam scores and attendance, and snapshot course title, issue date and certificate ID upon issuance.' },
        { name: 'Recipient name confirmation and lock', description: 'Separate account display nicknames from the formal name printed on the certificate, requiring confirmation before issuance and restricting free edits afterwards.' },
        { name: 'Verification code and authenticity lookup', description: 'Provide a unique verification ID or URL so third parties can confirm whether a presented PDF or printed certificate is genuine.' },
        { name: 'Expiration versus revocation states', description: 'Distinguish credentials that reached the end of a validity period from credentials revoked due to refunds, grading corrections or policy violations.' },
      ],
      workflow: [
        { name: 'Show remaining qualification criteria', description: 'Before eligibility is met, break down which progress, attendance or score requirements are satisfied and which remain.' },
        { name: 'Confirm and lock recipient name before issuing', description: 'Ask the eligible learner to verify their full name spelling and explain post-issuance change rules before generating the certificate.' },
        { name: 'Provide certificate download and verification lookup', description: 'Include the unique certificate ID and issue date on the credential and connect a verification page that checks its live status.' },
        { name: 'Handle name corrections, re-issuance and revocation', description: 'When an administrator approves a legal name correction or revokes a credential, update the verification record and audit trail immediately.' },
      ],
      pitfalls: [
        { name: 'Binding certificate names directly to mutable profile nicknames', description: 'If changing an account nickname retroactively changes an issued certificate’s name, the credential loses trustworthiness. Store an immutable recipient name snapshot.' },
        { name: 'Treating a downloadable PDF as self-verifying', description: 'Static files can be edited locally. Pair downloads with a server-backed verification ID and status check.' },
        { name: 'Leaving certificates valid after full refunds or score disqualifications', description: 'Define whether a refund, grade recalculation or misconduct finding automatically revokes an already issued certificate.' },
      ],
      questions: [
        'Which progress, attendance, assignment or exam score thresholds must be met to qualify for a certificate?',
        'Are certificates issued automatically upon qualification, or after learner name confirmation or administrator approval?',
        'When is the recipient name locked, and how are legal name changes or spelling corrections handled after issuance?',
        'What information is shown on the public verification page when someone checks a certificate ID?',
        'Do certificates expire after a set period, and under what conditions can an issued certificate be revoked?',
      ],
      example: 'Example: a course could unlock certificate claiming once a learner finishes all required modules and scores at least 80% on the final exam, require the learner to confirm and lock their full name, issue a certificate with a unique verification code, and show masked name, course title, issue date and valid/revoked status on the verification lookup page. This is a reference example, not an established policy.',
      relatedDesigns: [
        { id: 'onboarding-progress-checklist', reason: 'A reference for showing which required modules, assignments and exam thresholds remain before a certificate can be claimed. Real qualification checks and issuance need separate implementation.' },
        { id: 'inline-edit-field', reason: 'A reference for reviewing and confirming the recipient name before locking it for issuance. Real name locking and post-issuance restrictions need separate implementation.' },
      ],
      promptSnippet: 'Help design a course certificate issuance, recipient name lock, verification and revocation workflow. First ask about qualification thresholds, automatic versus confirmation-based issuance, recipient name locking and correction rules, verification lookup exposure scope, and expiration or revocation policies. Do not assume undecided rules.\nBased on the answers, describe:\n1. States and transitions across ineligible, eligible (pending name confirmation), issued/valid, expired and revoked credentials.\n2. Snapshot fields locked at issuance (recipient name, course title, issue date, verification code) and separation from mutable profile fields.\n3. Verification lookup inputs and status displays for valid, expired, revoked and non-existent codes.\n4. Handling of PDF generation delays, administrative name corrections and revocations triggered by refunds or score changes.\n5. Qualification progress, name confirmation prompt, certificate view and verification lookup screens with reasons for the design choices.\nDo not bind issued certificates to mutable profile nicknames or assume a PDF alone proves authenticity, and distinguish design demos from real credential issuance and verification systems.',
    },
  },
  sources: [
    { title: 'Canvas Credentials (Badgr) — Issuing and verifying digital badges', url: 'https://community.canvaslms.com/t5/Canvas-Credentials/ct-p/canvas-credentials' },
    { title: 'W3C Recommendation — Verifiable Credentials Data Model', url: 'https://www.w3.org/TR/vc-data-model/' },
  ],
}];
