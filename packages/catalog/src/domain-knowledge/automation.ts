import type { DomainKnowledge } from '../domain-knowledge';

export const AUTOMATION_KNOWLEDGE: DomainKnowledge[] = [
  {
    id: 'automation-form-branching-validation-and-partial-save',
    aliases: {
      ko: ['조건부 분기 설문 폼', '다단계 폼 임시 저장', '설문 문항 수정과 기존 응답 보존', '필수 문항 건너뛰기 검증', '응답 마감 조건'],
      en: ['conditional form branching', 'multi-step form partial save', 'form schema versioning', 'skip-logic validation', 'form submission cutoff'],
    },
    useCases: {
      ko: [
        '앞 질문의 선택값에 따라 다음 질문이나 페이지가 달라지는 조건부 분기(Skip logic) 폼을 만들 때',
        '상위 선택을 바꿨을 때 숨겨진 하위 질문의 입력값과 필수 검증 조건을 어떻게 제외할지 정할 때',
        '이미 응답을 수집 중인 폼의 문항이나 선택지를 고칠 때 기존 제출 데이터를 깨뜨리지 않게 보존할 때',
        '긴 다단계 폼에서 중간 저장 후 이어쓰기와 응답 마감 시각·수량 도달 처리를 설계할 때',
      ],
      en: [
        'Building multi-step forms where earlier answers route respondents through conditional branches',
        'Excluding hidden branch fields from required-field validation and final submission payloads',
        'Editing form questions while collection is live without corrupting previously submitted responses',
        'Supporting save-and-resume progress alongside submission deadlines or response caps',
      ],
    },
    keywords: {
      ko: ['설문', '폼 빌더', '조건부 분기', '스킵 로직', '다단계 폼', '이어쓰기', '문항 버전', '응답 마감', '유효성 검증'],
      en: ['form builder', 'conditional branching', 'skip logic', 'multi-step form', 'save and resume', 'schema version', 'submission cutoff', 'field validation'],
    },
    text: {
      ko: {
        domain: '설문·폼·워크플로 자동화',
        title: '조건부 분기 질문·진행 중 문항 수정 시 기존 응답 보존과 마감 처리',
        summary: '조건부 분기에 따른 활성 문항만 검증하고, 수집 중 문항 변경 시 기존 응답 스키마 보존과 마감을 연결합니다.',
        overview: '다단계 설문이나 신청 폼에서는 앞선 응답에 따라 보여 줄 문항이 달라지고, 운영 도중 문구나 선택지를 고치는 일도 잦습니다. 숨겨진 분기 문항이 필수 검증을 가로막지 않게 하고, 작성자가 상위 답변을 바꿨을 때 하위 값을 어떻게 비울지, 수집 중 문항이 바뀌어도 이전 응답이 어긋나지 않게 버전이나 스냅샷을 어떻게 남길지 정해야 합니다. 아래 내용은 폼·설문 설계를 위한 참고이며 특정 폼 도구의 제한을 기본값으로 정하지 않습니다.',
        concepts: [
          { name: '조건부 분기(Branching)와 비활성 문항 검증 제외', description: '현재 경로에서 숨겨진 문항은 필수 입력 검사에서 제외하고, 최종 제출 시 비활성 분기에 남아 있던 이전 입력값을 제외할지 정합니다.' },
          { name: '중간 저장(Save & Resume)과 최종 제출 분리', description: '작성 중인 임시 저장본과 최종 제출 완료 상태를 구분하고, 마감 시각이 지났을 때 작성 중이던 응답의 유예 허용 여부를 결정합니다.' },
          { name: '수집 중 문항 수정과 기존 응답 스냅샷 보존', description: '선택지 이름을 바꾸거나 문항을 삭제해도 이미 제출된 응답이 당시 어떤 질문·선택지에 답했는지 왜곡되지 않게 보존합니다.' },
          { name: '순환 분기 방지와 마감(기한·정원) 조건', description: '폼 작성자가 A→B→A처럼 끝없는 분기를 만들지 못하게 막고, 마감 일시나 목표 응답 수 도달 시 안내 화면을 정의합니다.' },
        ],
        workflow: [
          { name: '문항·검증 규칙과 분기 경로 정의하기', description: '질문 유형, 필수 여부, 선택값별 이동할 다음 단계 또는 종료 조건을 설정하고 순환 경로가 없는지 확인합니다.' },
          { name: '응답 입력·분기 전환·중간 저장 연결하기', description: '응답에 따라 다음 질문을 즉시 계산하고, 상위 답변 변경 시 영향을 받는 하위 문항과 진행 단계를 갱신합니다.' },
          { name: '활성 경로 기준 최종 검증과 제출 확정하기', description: '현재 유효한 경로의 필수 항목만 검사해 제출을 확정하고, 중복 제출 방지 및 접수 확인 화면을 보여 줍니다.' },
          { name: '문항 개정 버전 관리와 마감 전환하기', description: '수집 중 문항 수정 시 새 버전을 기록해 이전 응답과 구분하고, 마감 시 신규 진입을 닫습니다.' },
        ],
        pitfalls: [
          { name: '숨겨진 분기의 필수 문항 때문에 제출이 막히기', description: '사용자에게 보이지도 않는 다른 분기의 필수 입력 칸이 비었다며 제출 오류를 내면 아무도 제출할 수 없습니다. 활성 경로만 검증하세요.' },
          { name: '선택지 순번(Index)만 저장해 문항 수정 시 기존 답변 의미가 바뀌기', description: '1번 선택지를 삭제하거나 순서를 바꿨을 때 과거 응답의 의미가 뒤바뀌지 않도록 고유 선택지 ID나 원문 스냅샷을 함께 남기세요.' },
          { name: '상위 답변을 바꿨는데 이전 분기의 민감 입력값이 그대로 제출되기', description: '비활성으로 전환된 분기의 입력값은 최종 제출 데이터에서 정리하거나 명확히 구분하세요.' },
        ],
        questions: [
          '응답자가 상위 선택을 바꿔 기존 분기가 숨겨지면, 이미 적어 둔 하위 답변은 즉시 비우나요, 다시 돌아올 때를 위해 제출 직전까지 임시 보관하나요?',
          '로그인 없이 링크만으로 응답할 때 중간 저장과 이어쓰기를 어떤 방식으로 지원하나요?',
          '이미 응답이 쌓인 상태에서 문항 삭제나 선택지 수정을 어디까지 허용하며, 결과 표에서는 어떻게 합산하나요?',
          '마감 기준은 특정 일시인가요, 선착순 제출 수량인가요? 작성 도중 마감되면 어떻게 처리하나요?',
          '제출 완료 후 응답자가 본인 응답을 다시 열람하거나 수정할 수 있나요?',
        ],
        example: '예시: 참가 신청 폼에서 참가 유형 선택에 따라 발표자 전용 질문 분기를 열고, 상위 유형을 일반 참가로 바꾸면 발표자 질문 값은 제출에서 제외하며, 수집 중 문항 문구를 수정하면 새 응답부터 개정 버전 번호를 붙여 저장하도록 구성할 수 있습니다. 실제 이어쓰기 방식과 마감 유예 규칙은 운영 목적에 맞게 먼저 확인해야 합니다.',
        relatedDesigns: [
          { id: 'linked-form-error-summary', reason: '현재 활성 단계에서 누락되거나 형식이 어긋난 질문 목록을 상단에 요약하고 해당 입력 칸으로 이동하는 표현에 참고할 수 있습니다. 실제 분기 계산과 제출 저장은 별도로 구현해야 합니다.' },
          { id: 'onboarding-progress-checklist', reason: '다단계 폼의 완료 단계와 현재 작성 위치를 표시하는 표현에 참고할 수 있습니다. 실제 단계 검증과 중간 저장은 구현하지 않습니다.' },
        ],
        promptSnippet: '조건부 분기 설문·신청 폼의 단계 이동·검증·중간 저장·수집 중 문항 수정 흐름을 설계해 줘. 먼저 분기 변경 시 숨겨진 하위 입력값 처리, 활성 경로 기준 필수 검증, 중간 저장 및 마감 처리, 수집 중 문항 수정 시 기존 응답 보존 규칙을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 폼 설계자(운영자)와 응답자가 볼 정보와 가능한 행동.\n2. 작성 전·임시 저장·최종 제출·수정 허용·마감됨 상태와 문항 스키마 버전 구분.\n3. 상위 답변 변경 시 하위 분기 재계산, 검증 범위 및 최종 제출 데이터 정리 규칙.\n4. 작성 중 마감 도달·순환 분기 설정 오류·저장 실패 시 처리와 안내.\n5. 분기 설정 에디터·다단계 응답 화면·오류 요약·제출 완료 및 결과 조회 화면의 연결.\n숨겨진 분기 문항으로 제출을 막거나 선택지 수정으로 과거 응답 의미를 깨뜨리지 말고, 예시 정책과 디자인 데모를 실제 폼 엔진으로 간주하지 말아 줘.',
      },
      en: {
        domain: 'Forms, Surveys & Workflow Automation',
        title: 'Conditional form branching, mid-collection schema edits, partial saves and cutoffs',
        summary: 'Validate only active branch fields, and preserve historical response meaning when live form schemas change.',
        overview: 'Multi-step forms and surveys often route respondents through different questions based on earlier answers, and organizers frequently tweak questions after launch. Excluding inactive branches from validation, clearing or isolating orphaned branch answers when an upstream answer changes, and versioning live schema edits keep submissions accurate. These concepts are design references, not default rules for a specific form builder.',
        concepts: [
          { name: 'Active-path validation and inactive branch pruning', description: 'Validate required rules only on questions reachable along the respondent’s current branch path, and exclude hidden branch values from the final payload.' },
          { name: 'Save-and-resume versus final submission', description: 'Separate saved in-progress responses from finalized submissions, and decide whether in-progress respondents get a grace window when a cutoff hits.' },
          { name: 'Schema versioning during live collection', description: 'Preserve option IDs or question snapshots so renaming, reordering or deleting an option mid-survey does not corrupt earlier responses.' },
          { name: 'Cycle-free branching and cutoff rules', description: 'Prevent form authors from creating circular branch loops, and define behavior when a date cutoff or response cap is reached.' },
        ],
        workflow: [
          { name: 'Define questions, validation and acyclic branch rules', description: 'Configure field types, required flags and branch targets while verifying that every path can reach a submit or end screen.' },
          { name: 'Recompute visible steps and save progress as answers change', description: 'Update downstream steps immediately when an upstream choice changes, and let respondents save progress to resume later.' },
          { name: 'Validate the active path and confirm submission', description: 'Check constraints only on active questions, record the submission against the current schema version and show confirmation.' },
          { name: 'Version live edits and enforce closing conditions', description: 'Tag new responses with the updated schema revision when questions change, and close new entries once the deadline or cap is met.' },
        ],
        pitfalls: [
          { name: 'Blocking submission on a required field inside a hidden branch', description: 'Never fail form submission because an unvisited branch contains a required question.' },
          { name: 'Storing only array indexes for multiple-choice answers', description: 'If an author reorders or removes an option, index-only storage silently rewrites historical answers. Store stable option IDs and snapshots.' },
          { name: 'Submitting stale data from a deselected branch', description: 'If a user switches from Branch A to Branch B, strip or exclude the abandoned Branch A answers upon final submission.' },
        ],
        questions: [
          'When a respondent changes an upstream answer, are hidden downstream inputs cleared immediately or excluded only upon final submission?',
          'How does save-and-resume work for signed-in users versus link-only respondents?',
          'Which edits are allowed after responses exist, and how are old and new schema versions combined in exports?',
          'Does the form close by date, response count or manual toggle, and what happens to someone mid-form when it closes?',
          'Can respondents view or edit their submission after completing the form?',
        ],
        example: 'Example: a registration form could open speaker-specific questions only when Speaker is selected, omit those fields from the payload if the user switches back to Attendee, and record a schema version number whenever an organizer edits a question on a live form. Confirm actual resume mechanisms and edit rules before adopting this setup.',
        relatedDesigns: [
          { id: 'linked-form-error-summary', reason: 'A reference for summarizing invalid or missing fields on the active step and jumping to each input. Branch evaluation and persistence need separate implementation.' },
          { id: 'onboarding-progress-checklist', reason: 'A reference for showing completed and remaining steps in a multi-step form. Step validation and partial saves need separate implementation.' },
        ],
        promptSnippet: 'Help design a conditional-branching form, partial-save and live schema-versioning workflow. First confirm how deselected branch values are handled, active-path validation rules, save-and-resume behavior, cutoff handling, and how mid-collection edits preserve existing responses. Do not assume undecided rules.\nBased on the answers, describe:\n1. Views and actions available to form authors and respondents.\n2. States for unstarted, saved in-progress, submitted, editable-after-submit and closed forms, plus schema revisions.\n3. Rules for branch recalculation, active-path validation and pruning abandoned branch values.\n4. Handling of mid-session cutoffs, circular branch errors and failed saves.\n5. How the branching editor, multi-step respondent view, error summary and response export screens connect.\nDo not validate hidden branch fields or overwrite historical response meaning on schema edits, and do not mistake example policies or design demos for a real form engine.',
      },
    },
    sources: [
      { title: 'W3C WAI Tutorials — Multi-page Forms and User Notifications', url: 'https://www.w3.org/WAI/tutorials/forms/multi-page/' },
      { title: 'GOV.UK Design System — Question Pages and Branching Patterns', url: 'https://design-system.service.gov.uk/patterns/question-pages/' },
    ],
  },
  {
    id: 'automation-survey-anonymity-quota-and-duplicate-response',
    aliases: {
      ko: ['익명 설문과 경품 연락처 분리', '표본 할당량 쿼터 마감', '설문 중복 응답 방지', '불성실 응답 스크리닝 제외', '타깃 대상자 자격 조건'],
      en: ['anonymous survey reward separation', 'survey sample quota cap', 'duplicate response prevention', 'screener disqualification flow', 'respondent eligibility gating'],
    },
    useCases: {
      ko: [
        '설문 응답 내용은 익명으로 통계 처리하면서 답례품·추첨 발송용 연락처는 분리해 수집할 때',
        '연령·지역·이용군별 표본 할당량(Quota)이 찼을 때 해당 조건 응답자만 조기 마감 안내로 보낼 때',
        '사전 자격 질문(Screener) 미충족 시 본 설문으로 진입하지 않고 정중히 종료할 때',
        '1인 1회 응답 제한을 로그인·초대 토큰·기기 기준 중 무엇으로 판단할지 설계할 때',
      ],
      en: [
        'Collecting contact info for survey rewards in a separate record unlinked from anonymous survey answers',
        'Closing specific demographic or segment buckets once their target sample quota is full',
        'Routing ineligible respondents to a polite screen-out page after initial screener questions',
        'Preventing duplicate submissions via single-use invite tokens, accounts or browser checks',
      ],
    },
    keywords: {
      ko: ['익명 설문', '경품 연락처 분리', '표본 할당량', '쿼터 마감', '사전 스크리닝', '중복 응답 제한', '1회용 응답 링크', '응답 집계'],
      en: ['anonymous survey', 'reward PII separation', 'sample quota', 'quota full', 'screener question', 'duplicate prevention', 'single-use token', 'response tally'],
    },
    text: {
      ko: {
        domain: '설문·폼·워크플로 자동화',
        title: '익명 설문과 경품 연락처 분리·표본 할당량(Quota) 마감과 중복 응답 제한',
        summary: '익명 응답 본문과 참여 확인·경품 연락처를 분리하고, 대상자 스크리닝·할당량 마감·중복 방지를 연결합니다.',
        overview: '익명을 약속한 설문에서 같은 행(Row)에 이름·연락처·계정 ID를 함께 저장하면 결과 조회 화면에서 누가 어떤 답을 했는지 드러나게 됩니다. 또한 조사 설문에서는 특정 조건의 표본 수(Quota)가 다 찼을 때나 자격 조건(Screener)에 맞지 않을 때 본 설문 끝까지 작성한 뒤에야 거절되지 않도록 앞단에서 분기해야 합니다. 아래 내용은 설문 조사 설계를 위한 참고이며 특정 리서치 기준을 기본값으로 정하지 않습니다.',
        concepts: [
          { name: '익명 응답 원문과 참여 여부·연락처 분리 저장', description: '누가 설문에 참여했는지(중복 방지·경품 지급용)와 실제 어떤 답변을 골랐는지(익명 집계용)를 서로 연결 키 없이 분리해 저장할지 정합니다.' },
          { name: '사전 자격 질문(Screener)과 조기 종료', description: '조사 대상 조건에 맞지 않는 응답자는 본 문항을 모두 풀기 전에 첫 단계에서 대상 아님 안내 화면으로 이동시킵니다.' },
          { name: '조건별 표본 할당량(Quota)과 동시 참여 기준', description: '전체 500명 또는 특정 조건 100명처럼 할당량이 찼을 때 신규 진입을 막되, 이미 작성 중인 응답자를 인정할지(초과 허용) 차단할지 정합니다.' },
          { name: '소그룹 교차 필터의 익명성 보호(최소 응답 수)', description: '부서·직급 필터를 좁혔을 때 대상자가 1~2명뿐이면 익명 설문이어도 작성자가 특정되므로 최소 N명 이상일 때만 결과를 열람하게 합니다.' },
        ],
        workflow: [
          { name: '응답 자격과 중복 참여 여부 확인하기', description: '초대 토큰이나 참여 기록으로 중복 진입을 확인하고, 사전 자격 질문으로 대상 여부를 먼저 판별합니다.' },
          { name: '조건별 잔여 할당량(Quota) 확인하기', description: '응답자의 분류 조건에 해당하는 표본 할당량이 남아 있는지 확인하고, 마감된 조건이면 할당량 마감 안내로 연결합니다.' },
          { name: '본 설문 응답 저장과 경품 연락처 분리 접수하기', description: '본 설문 제출이 완료되면 익명 응답만 집계 테이블에 기록하고, 경품 응모 연락처는 별도 분리된 양식으로 입력받습니다.' },
          { name: '최소 표본 기준에 맞춰 집계 결과 공개하기', description: '결과 조회 시 익명 보호 최소 인원 기준을 충족한 구간만 통계를 표시합니다.' },
        ],
        pitfalls: [
          { name: '익명 설문이라 안내하고 실제로는 응답 행에 작성자 ID와 연락처를 함께 넣기', description: '관리자 엑셀 다운로드나 상세 조회에서 작성자와 답변이 한 줄로 나오면 익명 약속 위반이 됩니다. 참여 기록과 답변 레코드를 분리하세요.' },
          { name: '설문 끝까지 다 작성하게 한 뒤 할당량 초과라며 제출을 거절하기', description: '10분 동안 문항을 다 채운 뒤에야 인원이 찼다고 막으면 큰 불만이 생깁니다. 앞단 스크리너 직후에 할당량을 확인하세요.' },
          { name: '응답자 1명인 부서 필터 결과를 그대로 노출해 작성자 특정하기', description: '익명 조직 설문에서는 교차 필터 결과가 최소 인원 미만일 때 수치를 가리는 보호 규칙을 함께 설계하세요.' },
        ],
        questions: [
          '완전 익명 설문인가요, 기명 설문인가요? 익명이면서 중복 방지나 경품 추첨이 필요하면 데이터를 어떻게 분리하나요?',
          '사전 자격 질문(Screener) 탈락자와 표본 할당량(Quota) 마감 대상자에게 각각 어떤 안내 화면을 보여 주나요?',
          '할당량은 설문 시작 시점에 선점하나요, 최종 제출 완료 시점에 차감하나요?',
          '1인 1회 응답 제한은 1회용 초대 링크, 로그인 계정, 브라우저 쿠키 중 무엇을 기준으로 하나요?',
          '익명 설문 결과를 부서·조건별로 필터링할 때 최소 몇 명 이상이어야 결과를 표시하나요?',
        ],
        example: '예시: 임직원 익명 설문에서 계정당 1회 참여 여부만 별도 목록에 표시하고 실제 답변은 작성자 식별자 없이 저장하며, 부서별 응답자가 5명 미만인 구간은 결과 차트를 비공개로 표시하도록 구성할 수 있습니다. 실제 익명 분리 구조와 할당량 기준은 조사 목적에 맞게 먼저 확인해야 합니다.',
        relatedDesigns: [
          { id: 'faceted-filter-chips', reason: '설문 집계 화면에서 응답 조건 칩을 조합해 표본을 좁혀 보는 표현에 참고할 수 있습니다. 실제 최소 인원 마스킹과 서버 집계는 별도로 구현해야 합니다.' },
          { id: 'dismissible-inline-banner', reason: '익명 보장 안내나 개인정보 분리 수집 기준을 설문 상단 배너로 고지하는 표현에 참고할 수 있습니다. 실제 데이터 분리 저장은 구현하지 않습니다.' },
        ],
        promptSnippet: '익명 설문·경품 연락처 분리·표본 할당량(Quota) 마감·중복 응답 제한 흐름을 설계해 줘. 먼저 익명 답변과 참여자/경품 연락처 분리 저장 구조, 사전 자격 질문(Screener) 탈락 처리, 조건별 할당량 차감 시점, 중복 참여 방지 기준, 소수 표본 결과 마스킹 규칙을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 응답자와 설문 운영자가 볼 정보와 익명성 보호 경계.\n2. 진입·스크리닝 탈락·할당량 마감·작성 중·제출 완료·경품 별도 응모 상태의 전환.\n3. 참여 여부 기록, 익명 답변 원문, 경품 연락처 데이터의 분리 저장 규칙.\n4. 동시 제출로 인한 할당량 도달·중복 링크 클릭·소수 인원 필터 조회 시 처리와 안내.\n5. 익명 안내 배너·사전 자격 질문·본 설문·분리된 경품 입력·최소 인원 보호가 적용된 결과 화면의 연결.\n익명 설문에서 답변과 식별자를 한 레코드로 묶어 노출하지 말고, 예시 정책과 디자인 데모를 실제 조사 플랫폼으로 간주하지 말아 줘.',
      },
      en: {
        domain: 'Forms, Surveys & Workflow Automation',
        title: 'Anonymous survey separation, sample quotas, screeners and duplicate prevention',
        summary: 'Separate anonymous survey answers from participation tokens and reward contacts, and connect screeners, quotas and k-anonymity thresholds.',
        overview: 'Promising anonymity while storing a respondent’s user ID or prize phone number on the same answer row breaks trust as soon as someone exports the table. Research and employee surveys also need front-loaded screener questions, segment quota checks and minimum aggregation thresholds so respondents are not rejected at the final step or identified through narrow filters. These concepts are design references, not default research policies.',
        concepts: [
          { name: 'Unlinked storage for anonymous answers versus reward contacts', description: 'Record that a user or token participated—and collect optional prize contact details—in a separate store without a foreign key linking back to the specific answer payload.' },
          { name: 'Front-loaded screeners and polite screen-out', description: 'Evaluate eligibility questions at the very start so ineligible participants exit cleanly before answering the main questionnaire.' },
          { name: 'Segment quotas and in-flight respondents', description: 'Define target counts per segment and decide whether quotas count completed submissions only or reserve seats for active in-flight sessions.' },
          { name: 'Minimum aggregation threshold (k-anonymity) in reports', description: 'Hide breakdown charts or text answers when a filtered segment has fewer than a minimum number of respondents (such as fewer than 5).' },
        ],
        workflow: [
          { name: 'Verify single-use eligibility and run screener questions', description: 'Check whether the invite token or account has already participated, then evaluate screener criteria.' },
          { name: 'Check segment quota availability early', description: 'Verify whether the respondent’s demographic or segment quota is still open before presenting the full survey.' },
          { name: 'Commit anonymous answers separately from reward sign-up', description: 'Save the anonymous response payload first, then offer a decoupled form for raffle or reward contact entry.' },
          { name: 'Enforce minimum sample thresholds on filtered dashboards', description: 'Suppress breakdown metrics and verbatims whenever filter combinations narrow the cohort below the privacy threshold.' },
        ],
        pitfalls: [
          { name: 'Attaching account IDs or phone numbers directly to anonymous answer rows', description: 'Keep participation tracking and prize contact rows structurally decoupled from the anonymous answer records.' },
          { name: 'Rejecting a respondent for a full quota after they finish the entire survey', description: 'Check segment quotas immediately after the screener step rather than waiting until the final submit button.' },
          { name: 'Allowing cross-filters to expose a 1-person segment in an anonymous survey', description: 'Enforce a minimum respondent count before rendering filtered breakdowns.' },
        ],
        questions: [
          'Is the survey strictly anonymous or identifiable, and how are participation tracking and prize contact details decoupled from answers?',
          'What screens are shown for screener disqualification versus a full segment quota?',
          'Are segment quotas decremented on final submission or temporarily held when a respondent passes the screener?',
          'How are duplicate submissions prevented (single-use tokens, account checks or browser state)?',
          'What is the minimum respondent count required before a filtered report segment can be viewed?',
        ],
        example: 'Example: an employee pulse survey could mark an account as having participated without linking the account ID to the submitted answer row, route reward contact entry to a separate table, and hide department breakdowns with fewer than 5 responses. Confirm actual anonymity guarantees and quota rules before adopting this setup.',
        relatedDesigns: [
          { id: 'faceted-filter-chips', reason: 'A reference for combining segment filter chips on a survey report view. Minimum-sample suppression and aggregation need separate implementation.' },
          { id: 'dismissible-inline-banner', reason: 'A reference for displaying an anonymity notice or data-separation explanation above the survey. Real decoupled storage needs separate implementation.' },
        ],
        promptSnippet: 'Help design an anonymous survey, reward-contact separation, sample-quota and duplicate-prevention workflow. First confirm how anonymous answers are separated from participation tracking and reward contacts, screener disqualification rules, quota decrement timing, duplicate prevention, and minimum respondent thresholds for reports. Do not assume undecided rules.\nBased on the answers, describe:\n1. Information and privacy boundaries visible to respondents and survey organizers.\n2. Transitions across entry, screened-out, quota-full, in-progress, submitted and separate reward-opt-in states.\n3. Decoupled data model for participation flags, anonymous answer payloads and prize contact records.\n4. Handling of concurrent quota completion, repeat token clicks and sub-threshold report filters.\n5. How privacy notices, screener steps, main survey pages, decoupled reward forms and privacy-threshold reports connect.\nDo not store user identifiers on anonymous answer rows, and do not mistake example policies or design demos for a real survey backend.',
      },
    },
    sources: [
      { title: 'AAPOR — Standards and Best Practices for Survey Research', url: 'https://aapor.org/standards-and-ethics/best-practices/' },
      { title: 'NIST Privacy Framework — De-identification and Aggregation Controls', url: 'https://www.nist.gov/privacy-framework' },
    ],
  },
  {
    id: 'automation-trigger-condition-action-and-loop-guard',
    aliases: {
      ko: ['트리거 조건 액션 자동화', '무한 루프 방지 가드', '워크플로 규칙 활성 비활성', '자동화 실행 이력과 실패 알림', '규칙 버전 수정과 진행 중 작업'],
      en: ['trigger condition action rules', 'automation infinite loop guard', 'workflow rule activation toggle', 'execution run log', 'in-flight workflow versioning'],
    },
    useCases: {
      ko: [
        '사용자가 직접 이벤트(Trigger)·조건(Condition)·실행 동작(Action)을 조합해 업무 자동화 규칙을 만들 때',
        '규칙 A의 실행 결과가 다시 규칙 B나 자기 자신을 깨워 무한 반복되는 루프를 차단할 때',
        '규칙을 수정하거나 비활성화했을 때 이미 대기 중인 지연 작업(Delay step)을 어떻게 처리할지 정할 때',
        '자동화 실행 성공·조건 불일치 건너뜀·실패 사유를 실행 이력에서 추적할 때',
      ],
      en: [
        'Letting users configure trigger-condition-action automation rules across workspace events',
        'Preventing infinite loops when an automation action emits an event that re-triggers itself or another rule',
        'Handling delayed in-flight workflow runs when a rule is edited or paused',
        'Inspecting execution logs that distinguish succeeded, condition-skipped and failed runs',
      ],
    },
    keywords: {
      ko: ['워크플로 자동화', '트리거', '조건 분기', '액션 실행', '무한 루프 차단', '지연 실행', '실행 로그', '규칙 비활성화', '오류 복구'],
      en: ['workflow automation', 'trigger', 'condition check', 'action step', 'loop guard', 'delayed step', 'execution log', 'rule pause', 'run history'],
    },
    text: {
      ko: {
        domain: '설문·폼·워크플로 자동화',
        title: '자동화 규칙(Trigger-Action)·무한 루프 차단과 비활성화·실행 이력',
        summary: '트리거·조건·액션 단계와 실행 결과를 분리하고, 무한 루프 차단과 지연 실행 중 규칙 변경 처리를 연결합니다.',
        overview: '사용자가 직접 설정하는 자동화 규칙은 잘못 조합되면 상태 변경이 다시 같은 규칙을 깨우는 무한 루프를 만들거나, 외부 연동 오류로 조용히 멈추기 쉽습니다. 규칙의 활성 상태, 조건 평가 결과(통과·건너뜀), 단계별 실행 결과, 재진입(루프) 차단 기준, 그리고 대기 중인 지연 실행 건의 취소·유지 규칙을 명확히 설계해야 안전하게 운영할 수 있습니다. 아래 내용은 워크플로 자동화 설계를 위한 참고이며 특정 자동화 엔진의 한도를 기본값으로 정하지 않습니다.',
        concepts: [
          { name: '트리거(Trigger)·조건(Condition)·액션(Action) 분리', description: '어떤 사건이 발생했는지(트리거), 현재 데이터가 실행 조건에 맞는지(조건), 어떤 작업을 수행할지(액션)를 단계별로 구분해 기록합니다.' },
          { name: '자기 재호출·상호 무한 루프 차단(Loop guard)', description: '자동화가 변경한 이벤트가 다시 같은 자동화나 연쇄 규칙을 끝없이 호출하지 않도록 최대 연쇄 깊이·동일 대상 재실행 제한·무한 루프 자동 일시정지를 둡니다.' },
          { name: '지연 단계(Wait/Delay)와 시점 재검증', description: '3일 뒤 실행처럼 지연 단계가 있을 때, 3일 뒤 실행 직전에 조건이 여전히 유효한지 다시 확인할지, 그사이 규칙이 꺼지면 대기 건도 취소할지 정합니다.' },
          { name: '실행 이력(통과·건너뜀·실패)과 자동 비활성화', description: '조건 불일치로 건너뛴 건과 실제 오류로 실패한 건을 구분하고, 연속 실패 시 규칙 소유자에게 알리고 규칙을 보류할지 결정합니다.' },
        ],
        workflow: [
          { name: '트리거·조건·액션 구성과 테스트 실행하기', description: '샘플 데이터로 조건 통과 여부와 예상 액션 결과를 먼저 시험해 본 뒤 규칙을 활성화합니다.' },
          { name: '이벤트 수신 시 루프 여부와 조건 평가하기', description: '연쇄 호출 한도를 넘지 않았는지 확인하고, 조건 불일치 시 건너뜀(Skipped) 사유를 남깁니다.' },
          { name: '단계별 액션 수행과 지연 대기 관리하기', description: '순차 액션을 실행하고 지연 단계가 있으면 예정 시각과 대기 상태를 표시합니다.' },
          { name: '실행 로그 확인과 연속 실패 복구하기', description: '실패한 단계의 입력·오류 원인을 보여 주고, 설정 수정 후 실패 지점부터 재실행하거나 규칙을 다시 켭니다.' },
        ],
        pitfalls: [
          { name: '자동화가 만든 수정 이벤트를 사용자 수정과 구분하지 않아 무한 루프 발생하기', description: '상태 변경 트리거가 다시 같은 상태를 수정하면 끝없이 반복됩니다. 이벤트 발생 주체(사용자 vs 자동화)와 연쇄 횟수를 검사하세요.' },
          { name: '지연 대기 중에 이미 취소·완료된 대상에 그대로 액션을 실행하기', description: '24시간 뒤 독촉 알림을 보내기 전에 해당 작업이 이미 완료되었는지 실행 시점의 최신 상태를 다시 확인하세요.' },
          { name: '조건 불일치 건너뜀과 실행 오류 실패를 둘 다 미실행으로 뭉뚱그리기', description: '사용자가 왜 자동화가 안 돌았는지 알 수 있도록 조건 미충족(정상 건너뜀)과 연동 실패(오류)를 명확히 나누어 보여 주세요.' },
        ],
        questions: [
          '하나의 자동화가 만든 데이터 변경이 다른 자동화 규칙을 연쇄적으로 깨우는 것을 허용하나요? 최대 몇 단계까지 허용하나요?',
          '지연(Delay) 단계가 포함된 규칙이 수정되거나 비활성화되면 이미 대기 중인 실행 건은 취소하나요, 이전 규칙대로 마저 실행하나요?',
          '지연 시간이 끝난 시점에 원래 실행 조건을 한 번 더 재검사하나요?',
          '여러 액션 중 중간 단계가 실패했을 때 앞 단계를 되돌리나요, 실패 단계에서 멈추고 재시도를 지원하나요?',
          '연속 실패나 루프 감지로 규칙이 자동 중지되면 누구에게 어떤 경로로 알리나요?',
        ],
        example: '예시: 업무 보드에서 상태가 검토 요청으로 바뀌면 담당자에게 알림을 보내고 48시간 뒤에도 그대로면 리마인더를 보내되, 48시간 시점에 이미 완료 상태면 건너뛰기로 기록하고, 동일 항목에서 5분 내 3회 이상 반복 호출되면 루프로 감지해 차단하도록 구성할 수 있습니다. 실제 연쇄 한도와 지연 처리 규칙은 서비스 환경에 맞게 먼저 확인해야 합니다.',
        relatedDesigns: [
          { id: 'ly-activity-timeline', reason: '트리거 발생·조건 평가·단계별 액션 실행과 실패 지점을 시간순으로 추적하는 표현에 참고할 수 있습니다. 실제 규칙 실행 엔진은 별도로 구현해야 합니다.' },
          { id: 'closable-document-tabs', reason: '여러 자동화 규칙이나 실행 로그 상세 탭을 전환하고 닫는 작업 공간 표현에 참고할 수 있습니다. 실제 규칙 저장은 구현하지 않습니다.' },
        ],
        promptSnippet: '트리거·조건·액션 기반 워크플로 자동화와 무한 루프 차단 흐름을 설계해 줘. 먼저 자동화 연쇄 호출 허용 여부와 루프 차단 기준, 지연(Delay) 대기 중 조건 재검증 및 규칙 수정/비활성화 시 처리, 조건 미충족 건너뜀과 오류 실패 구분, 중간 단계 실패 시 재시도 정책을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 규칙 생성자·운영자·일반 사용자가 볼 자동화 상태와 실행 이력 범위.\n2. 규칙의 비활성·활성·루프/오류 일시중지 상태와, 개별 실행(Run)의 대기·진행·조건 건너뜀·성공·실패·취소 상태 전환.\n3. 무한 루프 감지(호출 깊이·빈도 제한) 및 지연 실행 시점의 최신 상태 재확인 규칙.\n4. 중간 액션 실패·외부 권한 만료·규칙 비활성화 시 대기 건 처리와 알림.\n5. 규칙 빌더(트리거/조건/액션)·샘플 테스트·실행 이력 타임라인·오류 복구 화면의 연결.\n조건 건너뜀과 실행 오류를 하나로 합치거나 루프 방지 없이 재귀 호출을 허용하지 말고, 예시 정책과 디자인 데모를 실제 자동화 런타임으로 간주하지 말아 줘.',
      },
      en: {
        domain: 'Forms, Surveys & Workflow Automation',
        title: 'Trigger-condition-action workflows, loop guards, rule versioning and execution logs',
        summary: 'Separate trigger events, condition checks and action results, and connect runaway loop guards with in-flight delayed runs.',
        overview: 'User-configured automations can easily trigger infinite update loops or fail silently when external permissions expire. Separating rule activation states, condition-skipped versus errored runs, recursion/loop guards, and the handling of delayed in-flight executions when a rule changes keeps workflow automation safe and debuggable. These concepts are design references, not default execution limits for a specific engine.',
        concepts: [
          { name: 'Trigger, condition evaluation and action steps', description: 'Record the initiating event, whether filter conditions matched, and the outcome of each sequential action as distinct steps.' },
          { name: 'Recursion and runaway loop guards', description: 'Track event origin and chain depth so an action that mutates a record cannot endlessly re-trigger itself or a cycle of rules.' },
          { name: 'Delayed steps and wake-time re-evaluation', description: 'When a workflow pauses for hours or days, decide whether to re-check conditions upon waking and what happens if the rule was edited or disabled meanwhile.' },
          { name: 'Skipped versus failed run logs and circuit breaking', description: 'Distinguish runs skipped because conditions did not match from runs that failed with an error, and auto-pause rules after repeated failures.' },
        ],
        workflow: [
          { name: 'Configure trigger, conditions and actions with sample tests', description: 'Let authors test rules against sample payloads to preview condition matches and action inputs before activating.' },
          { name: 'Check loop limits and evaluate conditions on event intake', description: 'Enforce chain-depth and rate guards first, then log a Skipped outcome if conditions are not met.' },
          { name: 'Execute actions and manage delayed waiting states', description: 'Run actions in order, persist scheduled wake times for delay steps and re-verify target state before firing delayed actions.' },
          { name: 'Inspect run timelines and recover from paused or failed states', description: 'Surface step-level inputs and error messages, notify the rule owner on auto-pause and allow retrying failed runs.' },
        ],
        pitfalls: [
          { name: 'Allowing automation edits to re-trigger the same rule without a loop guard', description: 'If an update-record action fires the same record-updated trigger unrestricted, the system loops until resources are exhausted.' },
          { name: 'Firing delayed reminder actions without re-checking current state', description: 'Sending an overdue alert 48 hours later for a task that was completed yesterday annoys users. Re-verify state when the timer wakes.' },
          { name: 'Hiding condition-skipped runs or conflating them with errors', description: 'Users troubleshooting why a rule did not fire need to see whether the trigger never arrived, the condition evaluated false, or the action failed.' },
        ],
        questions: [
          'Can an action in one rule trigger another rule, and what chain-depth or frequency limit prevents infinite loops?',
          'When a rule with a delay step is edited or disabled, are sleeping in-flight runs canceled or completed under the prior version?',
          'Are filter conditions re-evaluated when a delay step finishes waiting?',
          'If step 2 of a 3-step action sequence fails, does the run halt for retry or attempt compensating actions?',
          'Who is notified when a rule is automatically paused due to loop detection or repeated errors?',
        ],
        example: 'Example: a workspace automation could trigger when a task enters Review, wait 48 hours, re-check whether the task is still in Review before sending a reminder, log Condition Skipped if already completed, and auto-pause the rule if the same record triggers it more than 3 times in 5 minutes. Confirm actual loop limits and delay semantics before adopting this setup.',
        relatedDesigns: [
          { id: 'ly-activity-timeline', reason: 'A reference for displaying trigger intake, condition evaluation and step-by-step action outcomes in chronological order. Real workflow execution needs separate implementation.' },
          { id: 'closable-document-tabs', reason: 'A reference for switching between open rule definitions and run-log detail tabs. Rule persistence needs separate implementation.' },
        ],
        promptSnippet: 'Help design a trigger-condition-action workflow automation and loop-guard system. First confirm rule-chaining limits and loop guards, handling of in-flight delayed runs when rules change or pause, wake-time condition re-evaluation, skipped-versus-failed run logging, and multi-step failure recovery. Do not assume undecided rules.\nBased on the answers, describe:\n1. Views and actions available to rule authors, admins and workspace members.\n2. Rule states (inactive, active, auto-paused) and run states (waiting, running, condition-skipped, succeeded, failed, canceled).\n3. Loop-detection rules (chain depth, per-entity rate limits) and wake-time state re-verification.\n4. Handling of mid-sequence action errors, expired credentials and rule edits while runs are sleeping.\n5. How the rule builder, dry-run tester, execution timeline and error-recovery screens connect.\nDo not conflate skipped conditions with execution errors or omit loop guards, and do not mistake example policies or design demos for a production workflow runtime.',
      },
    },
    sources: [
      { title: 'GitHub Docs — Avoiding recursive workflow runs and loop guards', url: 'https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/triggering-a-workflow' },
      { title: 'AWS Step Functions Developer Guide — State Machine Executions and Retries', url: 'https://docs.aws.amazon.com/step-functions/latest/dg/concepts-states.html' },
    ],
  },
  {
    id: 'automation-webhook-retry-dead-letter-and-replay',
    aliases: {
      ko: ['웹훅 발송 재시도', '데드레터 큐 보류 보관', '실패 이벤트 수동 재실행', '수신처 서명 검증과 타임아웃', '웹훅 순서 역전과 중복 처리'],
      en: ['outbound webhook retry policy', 'dead-letter queue replay', 'exponential backoff delivery', 'webhook signature and timeout', 'out-of-order event idempotency'],
    },
    useCases: {
      ko: [
        '외부 고객사 서버로 웹훅(Webhook) 이벤트를 보낼 때 응답 지연·오류 시 지수 백오프 재시도를 설계할 때',
        '최대 재시도 횟수를 넘긴 실패 건을 보류 목록(Dead-letter)에 보관하고 원인 해결 후 수동 재발송(Replay)할 때',
        '동일 이벤트가 재시도로 두 번 전달되거나 순서가 바뀌어 도착할 때 고유 이벤트 ID와 발생 시각을 함께 제공할 때',
        '죽은 수신 주소(연속 실패 엔드포인트)가 전체 발송 큐를 막지 않도록 자동 차단(Circuit break)할 때',
      ],
      en: [
        'Designing outbound webhook delivery with timeouts and exponential backoff retries',
        'Moving exhausted deliveries to a dead-letter list for inspection and manual replay',
        'Including unique event IDs and occurrence timestamps so receivers can deduplicate and order retries',
        'Auto-disabling persistently failing endpoints so they do not stall healthy deliveries',
      ],
    },
    keywords: {
      ko: ['웹훅', '웹훅 재발송', '지수 백오프', '보류 큐', '데드레터', '수동 재발송', '이벤트 ID', '타임아웃', '엔드포인트 차단'],
      en: ['webhook delivery', 'retry policy', 'exponential backoff', 'dead-letter queue', 'manual replay', 'event ID', 'delivery timeout', 'circuit breaker'],
    },
    text: {
      ko: {
        domain: '설문·폼·워크플로 자동화',
        title: '외부 연동 웹훅(Webhook) 재시도·보류 큐(Dead-letter) 적재와 수동 재실행',
        summary: '초기 발송과 재시도·최종 보류 상태를 분리하고, 고유 이벤트 ID·수동 재발송·연속 실패 엔드포인트 차단을 연결합니다.',
        overview: '외부 서버로 이벤트를 전달하는 웹훅은 상대방 서버 점검이나 네트워크 지연으로 언제든 실패할 수 있습니다. 한 번 실패했다고 이벤트를 버리거나, 반대로 끝없이 즉시 재시도해 상대 서버를 마비시키지 않으려면 응답 제한 시간(Timeout), 점진적 재시도 간격, 보류 큐(Dead-letter) 보관, 수동 재발송(Replay)을 함께 설계해야 합니다. 아래 내용은 웹훅 발송·재실행 흐름을 설계하기 위한 참고이며 특정 재시도 횟수나 보관 기한을 기본값으로 정하지 않습니다.',
        concepts: [
          { name: '발송 대기·재시도 예정·전달 성공·보류(Dead-letter) 분리', description: '일시적 오류로 다음 재시도를 기다리는 상태와 모든 재시도를 소진해 수동 조치가 필요한 보류 상태를 구분합니다.' },
          { name: '고유 이벤트 ID와 발생 시각 보존', description: '재발송을 하더라도 최초 이벤트 ID와 이벤트 발생 시각은 그대로 유지해, 수신 측이 중복 수신과 순서 역전을 판별할 수 있게 합니다.' },
          { name: '응답 코드별 즉시 중단과 재시도 구분', description: '타임아웃이나 5xx 서버 오류는 재시도하되, 잘못된 주소 설정 같은 영구 오류나 엔드포인트 비활성 상태는 구분해 처리합니다.' },
          { name: '연속 실패 엔드포인트 자동 중지(Circuit breaker)', description: '며칠 동안 계속 실패하는 수신 주소는 자동으로 비활성화하고 담당자에게 알려 전체 발송 자원을 보호합니다.' },
        ],
        workflow: [
          { name: '이벤트 생성과 발송 시도 기록하기', description: '이벤트 페이로드와 고유 ID·서명을 생성해 전송하고, 응답 상태 코드·소요 시간·오류 요약을 기록합니다.' },
          { name: '실패 시 재시도 간격 예약하기', description: '응답이 실패하면 예정된 다음 재시도 시각과 현재 시도 횟수를 표시합니다.' },
          { name: '한도 소진 건 보류 전환과 알림 보내기', description: '최대 재시도 횟수를 넘기면 보류(Dead-letter) 상태로 옮기고 엔드포인트 소유자에게 실패 안내를 보냅니다.' },
          { name: '개별·일괄 수동 재발송(Replay) 실행하기', description: '수신 서버 복구 후 선택한 실패 이벤트나 특정 시간대 보류 건을 다시 발송하고 결과를 갱신합니다.' },
        ],
        pitfalls: [
          { name: '재발송할 때마다 새로운 이벤트 ID를 발급하기', description: '재시도마다 이벤트 ID가 바뀌면 수신 서버는 같은 사건이 여러 번 일어난 것으로 착각해 중복 처리를 하게 됩니다.' },
          { name: '재시도 중 과거 시점의 페이로드 대신 현재 덮어써진 상태를 보내거나 기준을 섞기', description: '발생 당시 스냅샷을 그대로 재전송하는지 최신 상태를 보내는지 명확히 일관되게 유지하세요.' },
          { name: '응답 본문 전체를 무제한 저장해 민감 정보나 용량 문제가 생기기', description: '수신 서버가 반환한 거대한 HTML 오류 페이지 대신 상태 코드와 제한된 길이의 응답 요약만 안전하게 보관하세요.' },
        ],
        questions: [
          '웹훅 발송 시 응답 대기 제한 시간(Timeout)과 최대 재시도 횟수·간격은 어떻게 정하나요?',
          '재시도가 모두 실패한 이벤트는 얼마 동안 보류 목록에 보관하며, 개별·기간별 일괄 재발송을 지원하나요?',
          '수동 재발송(Replay) 시 최초 이벤트 ID와 당시 페이로드 스냅샷을 그대로 유지하나요?',
          '특정 수신 주소가 연속으로 실패할 때 언제 자동 비활성화하고 누구에게 알리나요?',
          '발송 로그에서 요청 헤더·서명·응답 본문은 어디까지 마스킹하고 몇 글자까지 보여 주나요?',
        ],
        example: '예시: 외부 연동 설정에서 웹훅 응답을 5초까지 기다리고 실패 시 지수 간격으로 5회 재시도한 뒤 보류함으로 옮기며, 보류함에서 최근 7일 내 실패 건을 원래 이벤트 ID 그대로 일괄 재발송할 수 있도록 구성할 수 있습니다. 실제 타임아웃·재시도 횟수·보관 일수는 운영 환경에 맞게 먼저 확인해야 합니다.',
        relatedDesigns: [
          { id: 'bulk-selection-action-bar', reason: '보류(Dead-letter) 목록에서 여러 실패 이벤트를 선택해 한꺼번에 재발송하는 하단 일괄 작업 바 표현에 참고할 수 있습니다. 실제 큐 재적재와 전송은 별도로 구현해야 합니다.' },
          { id: 'ly-expandable-data-rows', reason: '웹훅 발송 로그 행을 펼쳐 시도 횟수별 응답 코드·지연 시간·페이로드를 확인하는 표현에 참고할 수 있습니다. 실제 로그 조회는 구현하지 않습니다.' },
        ],
        promptSnippet: '외부 연동 웹훅(Webhook)의 재시도·보류 큐(Dead-letter)·수동 재발송(Replay) 흐름을 설계해 줘. 먼저 타임아웃과 재시도 간격·횟수, 보류 큐 전환 및 보관 기간, 재발송 시 고유 이벤트 ID·페이로드 유지 규칙, 연속 실패 엔드포인트 자동 중지 기준을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 연동 관리자가 볼 엔드포인트 상태·발송 로그·보류 목록과 가능한 행동.\n2. 발송 대기·재시도 예약·전달 성공·보류(Dead-letter)·재발송 중 상태와 엔드포인트 활성/차단 상태 전환.\n3. 이벤트 ID 보존, 서명 헤더 생성, 시도별 응답 코드·소요 시간 기록 규칙.\n4. 연속 실패로 인한 엔드포인트 자동 차단·일괄 재발송 중 부분 실패·순서 역전 주의 안내.\n5. 엔드포인트 목록·발송 시도 상세 행·보류 건 일괄 재발송 바·복구 안내 화면의 연결.\n재발송 시 이벤트 ID를 새로 바꿔 중복 처리를 유발하지 말고, 예시 정책과 디자인 데모를 실제 메시지 큐 인프라로 간주하지 말아 줘.',
      },
      en: {
        domain: 'Forms, Surveys & Workflow Automation',
        title: 'Outbound webhook retries, dead-letter queues and idempotent manual replay',
        summary: 'Separate scheduled retries from exhausted dead-letter deliveries, and preserve original event IDs across manual replays.',
        overview: 'Outbound webhooks fail whenever a receiver endpoint times out, deploys a bug or goes down for maintenance. Separating transient backoff retries from exhausted dead-letter events, preserving the original event ID for receiver deduplication, and circuit-breaking dead endpoints keep integrations recoverable. These concepts are design references, not default timeout or retention settings for a specific platform.',
        concepts: [
          { name: 'Pending, scheduled-retry, delivered and dead-letter states', description: 'Distinguish deliveries waiting for their next backoff timer from exhausted deliveries sitting in a dead-letter list awaiting manual action.' },
          { name: 'Immutable event IDs and occurrence timestamps', description: 'Preserve the original event ID and creation timestamp across all retries and manual replays so receivers can deduplicate and order events safely.' },
          { name: 'Timeout rules and retryable status codes', description: 'Define request timeouts and which HTTP responses trigger backoff retries versus immediate failure.' },
          { name: 'Endpoint circuit breaking on sustained failure', description: 'Automatically pause an endpoint that fails continuously over an extended window and alert its owner so dead URLs do not clog delivery workers.' },
        ],
        workflow: [
          { name: 'Sign and dispatch the event and log the attempt', description: 'Send the payload with its event ID and signature header, recording status code, latency and truncated response details.' },
          { name: 'Schedule exponential backoff retries on failure', description: 'Display the attempt counter and the exact timestamp of the next scheduled retry.' },
          { name: 'Move exhausted events to the dead-letter list and alert', description: 'Transition events that exceed the retry cap into the dead-letter state and notify the integration owner.' },
          { name: 'Replay selected or time-ranged dead-letter events', description: 'Let admins trigger single or bulk replays once their receiver is healthy and update delivery statuses.' },
        ],
        pitfalls: [
          { name: 'Generating a new event ID on retry or manual replay', description: 'Changing the event ID breaks the receiver’s idempotency check and causes duplicate side effects.' },
          { name: 'Storing unbounded raw response bodies from failing receivers', description: 'Truncate and sanitize logged response bodies and redact secret headers in the delivery viewer.' },
          { name: 'Retrying dead endpoints forever without a circuit breaker', description: 'Unbounded retries against decommissioned URLs waste worker capacity and obscure active failures.' },
        ],
        questions: [
          'What are the delivery timeout, maximum retry count and backoff schedule?',
          'How long are exhausted dead-letter events retained, and can admins replay them individually or in bulk?',
          'Does manual replay preserve the original event ID and original payload snapshot?',
          'When is a persistently failing webhook endpoint automatically disabled, and how is it re-enabled?',
          'Which request headers and response excerpts are shown in the delivery log?',
        ],
        example: 'Example: a webhook system could enforce a 5-second timeout, retry failed deliveries up to 5 times with exponential backoff, move exhausted events to a 7-day dead-letter list, and let admins bulk-replay failed items with their original event IDs intact. Confirm actual timeout, retry and retention limits before adopting this setup.',
        relatedDesigns: [
          { id: 'bulk-selection-action-bar', reason: 'A reference for selecting multiple dead-letter webhook events to replay in bulk. Queue dispatch and retry execution need separate implementation.' },
          { id: 'ly-expandable-data-rows', reason: 'A reference for expanding a webhook delivery row to inspect attempt timestamps, HTTP status codes and payloads. Real log retrieval needs separate implementation.' },
        ],
        promptSnippet: 'Help design an outbound webhook retry, dead-letter and manual-replay workflow. First confirm request timeouts and backoff schedules, dead-letter retention and bulk replay rules, preservation of original event IDs and snapshots, and circuit-breaker thresholds for failing endpoints. Do not assume undecided rules.\nBased on the answers, describe:\n1. Endpoint health, delivery logs and dead-letter actions available to integration admins.\n2. Transitions across pending, retry-scheduled, delivered, dead-letter and replaying states, plus active versus circuit-broken endpoints.\n3. Rules for preserving event IDs, generating signatures and recording per-attempt status and latency.\n4. Handling of auto-disabled endpoints, partial bulk-replay failures and out-of-order delivery warnings.\n5. How endpoint settings, expandable delivery rows, bulk replay bars and circuit-breaker banners connect.\nDo not mint new event IDs on replay, and do not mistake example policies or design demos for a real webhook delivery queue.',
      },
    },
    sources: [
      { title: 'Standard Webhooks — Webhook Specification and Guidelines', url: 'https://www.standardwebhooks.com/' },
      { title: 'Stripe Docs — Receive Webhooks, Retries and Best Practices', url: 'https://docs.stripe.com/webhooks' },
    ],
  },
  {
    id: 'automation-batch-import-validation-and-rollback',
    aliases: {
      ko: ['엑셀 CSV 대량 가져오기', '사전 검증 드라이런', '행별 오류 리포트 다운로드', '부분 반영과 전체 취소 선택', '중복 키 덮어쓰기 규칙'],
      en: ['bulk CSV spreadsheet import', 'dry-run pre-validation', 'row-level error report', 'partial commit versus all-or-nothing', 'upsert duplicate key handling'],
    },
    useCases: {
      ko: [
        '고객·상품·구성원 목록을 CSV나 엑셀 파일로 한꺼번에 가져올 때 열(Column) 매핑과 사전 검증을 설계할 때',
        '1,000행 중 10행에 오류가 있을 때 정상 990행만 먼저 반영할지 전체를 중단할지 정책을 정할 때',
        '이미 존재하는 고유 키(이메일·상품코드 등)와 겹칠 때 건너뛰기·덮어쓰기·오류 처리 중 무엇을 택할지 정할 때',
        '실패한 행의 행 번호와 실패 사유만 모아 수정용 CSV로 내려받게 할 때',
      ],
      en: [
        'Mapping spreadsheet columns and running dry-run validation before committing a bulk import',
        'Choosing between all-or-nothing rejection and partial import of valid rows when some rows fail',
        'Handling duplicate keys via skip, update-existing (upsert) or error modes',
        'Generating a downloadable error CSV with row numbers and failure reasons for easy fixing',
      ],
    },
    keywords: {
      ko: ['배치 가져오기', 'CSV 업로드', '엑셀 일괄 등록', '열 매핑', '사전 검증', '부분 반영', '전체 롤백', '중복 키 처리', '오류 행 다운로드'],
      en: ['batch import', 'CSV import', 'bulk upload', 'column mapping', 'dry-run validation', 'partial commit', 'all-or-nothing rollback', 'duplicate upsert', 'error CSV'],
    },
    text: {
      ko: {
        domain: '설문·폼·워크플로 자동화',
        title: '대량 엑셀/CSV 가져오기 사전 검증·부분 반영 또는 전체 취소와 오류 보고서',
        summary: '파일 업로드와 실제 데이터 반영을 분리하고, 열 매핑·사전 검증(Dry-run)·중복 처리·오류 행 재업로드를 연결합니다.',
        overview: '수백·수천 건의 데이터를 파일로 일괄 등록할 때 곧바로 데이터베이스에 반영하면, 중간에 잘못된 형식이 나왔을 때 어디까지 들어갔는지 알 수 없어 중복 등록이 발생합니다. 열 매핑과 사전 검증(Dry-run) 단계로 정상·수정·중복·오류 건수를 먼저 보여 주고, 전체 취소(All-or-nothing)와 정상 행만 부분 반영 중 어떤 방식을 쓸지 명확히 해야 안전합니다. 아래 내용은 대량 가져오기 흐름을 설계하기 위한 참고이며 특정 파일 행 수 한도를 기본값으로 정하지 않습니다.',
        concepts: [
          { name: '사전 검증(Dry-run)과 실제 반영(Commit) 분리', description: '파일을 올린 직후에는 데이터를 바로 생성하지 않고 필수 열·자료형·중복 여부를 검사해 신규·갱신·오류 예정 건수를 먼저 브리핑합니다.' },
          { name: '전체 반영(All-or-nothing)과 부분 반영 선택', description: '오류 행이 하나라도 있으면 전체 반영을 막을지, 검증을 통과한 행만 먼저 반영하고 실패 행만 따로 안내할지 결정합니다.' },
          { name: '중복 키 충돌 정책(신규만·덮어쓰기·건너뛰기)', description: '파일 안의 두 행이 서로 겹치거나 기존 데이터와 고유 키가 같을 때 오류로 막을지, 기존 값을 갱신할지(빈 칸으로 기존 값을 지울지 여부 포함) 정합니다.' },
          { name: '행별 오류 리포트와 실패 행만 재업로드', description: '실패한 행 번호·열 이름·원인을 표로 보여 주고, 실패한 행만 담긴 파일을 내려받아 고친 뒤 다시 올릴 수 있게 합니다.' },
        ],
        workflow: [
          { name: '양식 다운로드와 파일 업로드·열 매핑하기', description: '표준 양식 파일을 제공하고, 업로드된 파일의 헤더를 시스템 필드와 짝지은 뒤 인코딩·행 수 제한을 확인합니다.' },
          { name: '사전 검증 결과(신규·갱신·오류) 미리보기', description: '실제 반영 전에 정상 건수, 중복 처리 예정 건수, 오류 행 목록과 원인을 요약해 보여 줍니다.' },
          { name: '반영 방식 확인 후 비동기 일괄 실행하기', description: '사용자 확인을 거쳐 반영을 시작하고, 대량 작업이면 진행 상태와 완료 후 생성·갱신·실패 최종 건수를 표시합니다.' },
          { name: '실패 행 내보내기와 이력 조회 연결하기', description: '오류로 제외된 행을 사유 열이 포함된 파일로 내려받게 하고, 누가 언제 몇 건을 일괄 반영했는지 기록을 남깁니다.' },
        ],
        pitfalls: [
          { name: '오류 행만 고쳐서 전체 파일을 다시 올렸는데 앞선 성공 행이 2번 중복 생성되기', description: '부분 반영 후 전체 파일을 그대로 재업로드하면 이미 들어간 행이 중복될 수 있습니다. 실패 행 전용 파일이나 고유 키 중복 방지 기준을 제공하세요.' },
          { name: '덮어쓰기(Upsert) 시 파일의 빈 칸이 기존 저장된 값을 공백으로 지워 버리기', description: '비어 있는 열은 기존 값을 유지할지 삭제할지 명확히 안내하고 선택하게 하세요.' },
          { name: '사전 검증 통과 후 실제 반영 사이에 발생한 충돌을 무시하기', description: '검증 시점에는 없던 중복 데이터가 실제 반영 시점에 생겼을 때의 최종 실패 기록과 결과 요약을 빠뜨리지 마세요.' },
        ],
        questions: [
          '지원할 파일 형식(CSV·XLSX), 인코딩, 1회 최대 행 수·용량 제한은 무엇인가요?',
          '검증에서 일부 행에 오류가 발견되면 전체 반영을 차단하나요, 정상 행만 부분 반영할 수 있나요?',
          '기존 데이터와 고유 키가 겹칠 때 오류·건너뛰기·덮어쓰기 중 무엇을 기본으로 하며, 빈 셀은 어떻게 다루나요?',
          '실패한 행의 오류 사유를 화면과 다운로드 파일로 어떻게 제공하나요?',
          '잘못 반영된 일괄 가져오기 작업을 통째로 되돌리기(일괄 취소)할 수 있나요?',
        ],
        example: '예시: 상품 일괄 등록에서 CSV 업로드 후 사전 검증 화면에 신규 480건·기존 수정 15건·오류 5건을 먼저 표시하고, 정상 495건만 먼저 반영한 뒤 오류 5건은 실패 사유가 적힌 CSV로 내려받아 수정 후 재업로드하도록 구성할 수 있습니다. 실제 부분 반영 허용 여부와 덮어쓰기 규칙은 데이터 성격에 맞게 먼저 확인해야 합니다.',
        relatedDesigns: [
          { id: 'native-file-attachment', reason: '가져올 CSV·엑셀 파일을 선택해 파일명과 용량을 확인하고 교체하는 표현에 참고할 수 있습니다. 실제 파일 파싱과 서버 전송은 별도로 구현해야 합니다.' },
          { id: 'linked-form-error-summary', reason: '사전 검증에서 발견된 행·열별 오류 건수를 상단에 요약하고 상세 오류 행으로 연결하는 표현에 참고할 수 있습니다. 실제 행 검증은 구현하지 않습니다.' },
        ],
        promptSnippet: '대량 엑셀/CSV 가져오기의 열 매핑·사전 검증(Dry-run)·부분/전체 반영·오류 리포트 흐름을 설계해 줘. 먼저 파일 형식·행 수 제한, 사전 검증과 실제 반영 분리, 일부 오류 시 전체 차단 vs 부분 반영 정책, 중복 키(건너뛰기/덮어쓰기) 및 빈 셀 처리, 실패 행 다운로드 방식을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 작업 실행자와 관리자가 각 단계에서 볼 검증 요약과 실행 결과.\n2. 파일 선택·열 매핑·사전 검증 중·검증 완료(확인 대기)·반영 중·전체 완료·부분 완료·실패 상태 전환.\n3. 파일 내 중복 행, 기존 데이터 중복 키, 빈 셀 덮어쓰기 여부의 판정 규칙.\n4. 부분 반영 후 재업로드 시 중복 방지와 반영 중 충돌 발생 시 오류 리포트 생성.\n5. 양식 다운로드/파일 선택·열 매핑·사전 검증 미리보기 및 오류 요약·실행 결과·실패 행 CSV 다운로드 화면의 연결.\n파일 선택 즉시 검증 없이 반영하거나 부분 반영 후 재업로드로 중복 생성을 유발하지 말고, 예시 정책과 디자인 데모를 실제 배치 처리 파이프라인으로 간주하지 말아 줘.',
      },
      en: {
        domain: 'Forms, Surveys & Workflow Automation',
        title: 'Bulk CSV/spreadsheet import dry-run validation, partial commit and error reports',
        summary: 'Separate file upload and dry-run validation from final commit, and connect duplicate-key rules with downloadable error rows.',
        overview: 'Committing hundreds of spreadsheet rows directly on upload leaves data in a half-written state when row 400 fails validation. Staging imports through column mapping and a dry-run preview—and explicitly choosing between all-or-nothing rollback and partial commit with a downloadable failed-row CSV—prevents duplicate records and guesswork. These concepts are design references, not default row limits for a specific importer.',
        concepts: [
          { name: 'Dry-run pre-validation versus final commit', description: 'Parse and validate the uploaded file first to report how many rows will be created, updated or rejected before mutating real records.' },
          { name: 'All-or-nothing versus partial-commit modes', description: 'Decide whether a single invalid row blocks the entire import or whether valid rows can be committed while failed rows are exported for fixing.' },
          { name: 'Duplicate-key resolution and blank-cell semantics', description: 'Define how intra-file duplicates and existing database matches behave (error, skip or update), and whether blank cells clear or preserve existing field values.' },
          { name: 'Row-level error reports and safe re-upload', description: 'Provide exact row numbers, column names and reasons for every failed row, and let users download only the failed rows to fix and re-import without duplicating already committed rows.' },
        ],
        workflow: [
          { name: 'Provide a template, upload the file and map columns', description: 'Check file format, encoding and row limits, then match spreadsheet headers to target fields.' },
          { name: 'Run dry-run validation and preview counts', description: 'Summarize new, updated, skipped and invalid row counts and let the user inspect specific row errors.' },
          { name: 'Confirm commit mode and execute asynchronously', description: 'Run the agreed commit mode, show progress for large batches and record final created, updated and failed counts.' },
          { name: 'Export failed rows and record the import audit trail', description: 'Generate a CSV of rejected rows with an appended error-reason column and log who ran the import.' },
        ],
        pitfalls: [
          { name: 'Duplicating previously succeeded rows when a user fixes and re-uploads the full file', description: 'If partial commit succeeded for 990 rows and the user re-uploads all 1,000 rows after fixing 10, lack of upsert keys or failed-only exports creates 990 duplicates.' },
          { name: 'Silently wiping existing field values when an upsert row has blank cells', description: 'Clarify upfront whether an empty cell in update mode means no change or clear value.' },
          { name: 'Skipping re-validation at commit time when concurrent data changed', description: 'Handle and report any unique-key conflicts that appear between dry-run preview and final commit.' },
        ],
        questions: [
          'Which file formats, character encodings and maximum row counts or file sizes are supported?',
          'When some rows fail validation, must the entire file be fixed first or can valid rows be committed immediately?',
          'How are duplicate keys handled (reject, skip or update), and do blank cells overwrite existing values during updates?',
          'Can users download a CSV containing only the failed rows and their error messages?',
          'Is there a way to roll back or undo a completed batch import?',
        ],
        example: 'Example: a catalog importer could parse a CSV into a dry-run summary showing 480 new items, 15 updates and 5 invalid rows, let the admin commit the 495 valid rows, and provide a downloadable 5-row error CSV for correction. Confirm actual commit modes, upsert keys and rollback rules before adopting this setup.',
        relatedDesigns: [
          { id: 'native-file-attachment', reason: 'A reference for selecting a CSV or spreadsheet file, showing its name and size, and replacing or removing it. File parsing and upload transfer need separate implementation.' },
          { id: 'linked-form-error-summary', reason: 'A reference for summarizing validation errors at the top of a review screen and linking to specific error items. Row-level spreadsheet parsing needs separate implementation.' },
        ],
        promptSnippet: 'Help design a bulk CSV/spreadsheet import, dry-run validation and error-recovery workflow. First confirm file/row limits, separation between dry-run validation and final commit, all-or-nothing versus partial-commit policy, duplicate-key and blank-cell upsert rules, and failed-row export handling. Do not assume undecided rules.\nBased on the answers, describe:\n1. Information and actions visible to the user running the import and to workspace admins.\n2. Transitions across file-selected, column-mapped, validating, dry-run-ready, committing, completed, partially-completed and failed states.\n3. Rules for intra-file duplicates, existing record matches and blank-cell updates.\n4. Prevention of duplicate creation on re-upload and handling of commit-time conflicts.\n5. How template download, file picker, column mapper, dry-run error summary, progress view and failed-row CSV export connect.\nDo not mutate records before dry-run confirmation or cause duplicates on retry, and do not mistake example policies or design demos for a real batch-import pipeline.',
      },
    },
    sources: [
      { title: 'RFC 4180 — Common Format and MIME Type for Comma-Separated Values (CSV) Files', url: 'https://www.rfc-editor.org/rfc/rfc4180' },
      { title: 'Shopify Help Center — Using CSV Files for Bulk Import and Overwrite Behavior', url: 'https://help.shopify.com/en/manual/products/import-export/using-csv' },
    ],
  },
];
