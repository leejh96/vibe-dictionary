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
    ko: ['교육', '학습', '수업', '강의', '수강', '학습자', '학생', '교사', '강사', '학습 목표', '학습 활동', '진도', '과제', '제출', '피드백', '평가', '완료 기준', '재제출', '교육 콘텐츠', '코딩 교육', '코딩교육'],
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
}];
