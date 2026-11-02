import type { DomainKnowledge } from '../domain-knowledge';

export const COLLABORATION_KNOWLEDGE: DomainKnowledge[] = [{
  id: 'workspace-task-assignment-and-status',
  aliases: {
    ko: ['협업 툴', '업무 관리', '프로젝트 관리', '워크스페이스', '칸반 보드', '할 일 배정'],
    en: ['collaboration tool', 'work management', 'project management', 'team workspace', 'kanban task board'],
  },
  useCases: {
    ko: ['팀원과 작업·이슈를 나누어 관리하는 협업 도구를 만들 때', '작업 배정·상태 전환·우선순위·마감일을 연결할 때', '워크스페이스·프로젝트·개별 문서의 공유 범위를 설계할 때', '일괄 작업과 활동 이력·실수 복구를 함께 구성할 때'],
    en: ['Building a collaboration tool for managing team tasks and issues', 'Connecting task assignment, status transitions, priority and due dates', 'Designing sharing scope across workspaces, projects and items', 'Combining bulk actions with activity history and undo recovery'],
  },
  keywords: {
    ko: ['협업', '업무 관리', '프로젝트 관리', '워크스페이스', '작업', '할 일', '태스크', '이슈', '칸반', '작업 배정', '우선순위', '공유 범위', '활동 기록', '일괄 작업'],
    en: ['collaboration', 'work management', 'project management', 'workspace', 'task', 'issue', 'kanban', 'assignment', 'assignee', 'priority', 'sharing scope', 'activity history', 'bulk action'],
  },
  text: {
    ko: {
      domain: '협업·업무 관리',
      title: '작업 배정·상태 전환과 공유 범위·변경 이력',
      summary: '작업의 진행 상태와 담당·공유 범위를 구분하고, 보드·목록·일괄 변경·이력을 한 데이터로 연결합니다.',
      overview: '협업 도구에서 작업 카드를 옮기거나 체크하는 동작은 단순한 화면 이동이 아니라 팀 전체가 공유하는 상태 변경입니다. 누가 어떤 작업을 볼 수 있는지, 누가 상태와 담당자를 바꿀 수 있는지, 선행 조건이나 보관 처리가 어떻게 동작하는지를 나누어 정해야 목록·보드·타임라인이 어긋나지 않습니다. 아래 내용은 업무 관리 흐름을 설계하기 위한 참고이며 특정 조직의 승인 절차나 권한 체계를 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '워크스페이스·프로젝트·작업의 공유 범위', description: '조직 전체·특정 프로젝트 구성원·초대된 게스트별 열람·편집·생성 범위를 구분합니다. 상위 프로젝트를 볼 수 없을 때 하위 작업 링크를 어떻게 처리할지도 정해야 합니다.' },
        { name: '작업 상태와 완료·보관의 구분', description: '할 일·진행 중·검토 중·완료 같은 진행 상태와 목록에서 감추는 보관(Archive)·휴지통 이동을 분리합니다. 완료된 작업을 곧바로 삭제하지 않도록 구분합니다.' },
        { name: '담당 배정과 참여 역할', description: '실제 작업을 수행하는 담당자(Assignee), 요청자, 알림을 받는 참조자를 구분합니다. 담당자가 비어 있는 미배정 상태와 다중 담당 허용 여부를 정합니다.' },
        { name: '동일 데이터의 다중 뷰 일관성', description: '칸반 보드, 표 목록, 일정 뷰는 같은 작업 데이터를 다른 축으로 보여 줍니다. 한 뷰에서 상태·정렬·필터를 바꿨을 때 원본 값과 화면 한정 상태를 구분합니다.' },
        { name: '일괄 변경과 활동 이력', description: '여러 작업을 한 번에 상태 변경·보관·배정할 때 일부 항목이 권한이나 조건으로 실패하면 어떻게 처리할지, 누가 언제 무엇을 바꿨는지 이력에 남길 범위를 정합니다.' },
      ],
      workflow: [
        { name: '작업 생성과 필수 속성 정하기', description: '제목만으로 빠르게 만든 뒤 상세 속성을 채울 수 있게 할지, 프로젝트·상태·담당자·마감일 중 초기 필수 항목이 무엇인지 정합니다.' },
        { name: '상태 전환과 담당 변경 연결하기', description: '보드 이동이나 상태 변경 시 허용된 단계 전환인지 확인하고, 담당자 변경이나 완료 처리 시 누구에게 알림을 보낼지 연결합니다.' },
        { name: '필터·정렬·일괄 작업 제공하기', description: '내 작업·상태·우선순위 조건으로 목록을 좁히고, 선택한 작업들의 일괄 보관·상태 변경과 실행 취소 경로를 제공합니다.' },
        { name: '변경 이력과 복구 경로 남기기', description: '상태·담당자·마감일 변경을 시간순 활동 이력으로 보여 주고, 실수로 보관하거나 삭제한 작업을 원래 위치로 되돌릴 수 있게 합니다.' },
      ],
      pitfalls: [
        { name: '보드·목록마다 별도 상태를 들고 있어 화면끼리 어긋나기', description: '보드에서 완료로 옮겼는데 목록 뷰나 개수 요약에 반영되지 않으면 혼란이 생깁니다. 단일 작업 데이터에서 각 뷰와 집계를 계산하세요.' },
        { name: '완료·보관·영구 삭제를 하나로 섞기', description: '완료된 업무 기록은 회고와 이력 확인에 필요합니다. 진행 완료 표시와 화면에서 숨기는 보관, 복구 불가능한 삭제를 구분하세요.' },
        { name: '동시 편집이나 일괄 작업 중 부분 실패를 숨기기', description: '다른 팀원이 먼저 바꾼 작업을 덮어쓰거나, 10개 일괄 변경 중 일부가 실패했는데 전체 성공으로 표시하지 않도록 결과를 명확히 알리세요.' },
      ],
      questions: [
        '워크스페이스 구성원·게스트·비로그인 사용자 중 누가 프로젝트와 작업을 열람·생성·수정·보관할 수 있나요?',
        '작업의 기본 진행 단계는 무엇이며, 자유롭게 단계를 옮길 수 있나요, 특정 순서나 승인 조건이 있나요?',
        '작업 하나에 담당자를 한 명만 지정하나요, 여러 명을 지정하거나 미배정 상태로 둘 수 있나요?',
        '하위 작업(Subtask)이나 선행 작업이 있을 때 하위 항목이 미완료여도 상위 작업을 완료로 바꿀 수 있나요?',
        '여러 작업을 일괄 선택해 상태 변경·보관·삭제할 때 실행 취소나 휴지통 복구를 지원하나요?',
        '두 사용자가 동시에 같은 작업의 상태·담당자를 바꾸거나 저장이 실패하면 어떤 안내와 최종 상태를 보여 주나요?',
      ],
      example: '예시: 제품 팀 워크스페이스에서 작업 상태를 대기·진행·검토·완료 4단계로 두고, 완료된 작업은 보드에 남기되 일괄 선택 바로 한꺼번에 보관함으로 옮기며, 삭제 시에는 스낵바로 즉시 되돌릴 수 있게 구성할 수 있습니다. 실제 권한 범위·필수 입력·하위 작업 규칙은 팀 운영 방식에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'bulk-selection-action-bar', reason: '여러 작업을 체크해 한꺼번에 보관하거나 상태를 바꾸는 하단 일괄 작업 바 표현에 참고할 수 있습니다. 실제 서버 반영과 권한 검사는 별도로 구현해야 합니다.' },
        { id: 'ly-activity-timeline', reason: '작업의 생성·상태 전환·담당 변경 기록을 시간순으로 이어 보여 주는 표현에 참고할 수 있습니다. 실제 활동 로그 수집과 저장은 구현하지 않습니다.' },
      ],
      promptSnippet: '협업·업무 관리 도구의 작업 배정·상태 전환·공유 범위·이력 흐름을 설계해 줘. 먼저 워크스페이스와 프로젝트의 역할별 권한, 작업 진행 단계와 전환 조건, 담당자 지정 방식, 완료·보관·삭제의 구분, 일괄 작업 및 동시 편집 처리 정책을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 구성원 역할별 프로젝트·작업·이력에 대한 열람·편집·보관 권한.\n2. 작업 진행 상태, 보관·삭제 상태, 담당자·우선순위·마감일 속성의 구조.\n3. 보드·목록·상세 화면 간 데이터 일관성과 필터·정렬·일괄 작업 동작.\n4. 일괄 변경 부분 실패·동시 수정 충돌·실수 삭제 시 복구 방법과 사용자 안내.\n5. 작업 보드/목록·상세 패널·일괄 작업 바·활동 타임라인·실행 취소 알림의 연결.\n화면의 카드 이동만으로 권한이나 저장이 처리된다고 가정하지 말고, 예시 정책과 디자인 데모를 실제 협업 백엔드로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Collaboration & Work Management',
      title: 'Task assignment, status transitions, sharing scope and activity history',
      summary: 'Separate task status from assignment and sharing scope, and keep boards, lists, bulk actions and history in sync.',
      overview: 'Moving or checking off a task card in a collaboration tool changes shared team state, not just local layout. Define who can view or edit tasks, how status transitions and assignments work, and how completion differs from archiving so boards, tables and timelines stay consistent. These concepts are design references, not default approval or permission rules for a specific organization.',
      concepts: [
        { name: 'Sharing scope across workspace, project and task', description: 'Distinguish view, edit and create access for workspace members, project members and guests, including what happens when a user opens a direct link to a restricted task.' },
        { name: 'Workflow status versus archive and deletion', description: 'Separate workflow stages such as To Do, In Progress, Review and Done from archiving or moving to trash so completed work is not accidentally destroyed.' },
        { name: 'Assignment and participation roles', description: 'Distinguish the assignee responsible for execution from the creator or watchers, and decide whether tasks can be unassigned or have multiple assignees.' },
        { name: 'Multi-view consistency over shared data', description: 'Kanban boards, sortable tables and agendas render the same underlying tasks. Separate persisted task fields from view-local filters and sort order.' },
        { name: 'Bulk actions and activity history', description: 'Define how bulk status changes, archiving or assignment handle partial failures, and which field changes are recorded in the activity timeline.' },
      ],
      workflow: [
        { name: 'Define task creation and required fields', description: 'Decide whether tasks can be quick-created with a title alone or require project, status, assignee or due date upfront.' },
        { name: 'Connect status transitions and assignment updates', description: 'Validate allowed stage transitions when moving cards or editing fields, and trigger notifications for new assignees or completions.' },
        { name: 'Support filtering, sorting and bulk operations', description: 'Let users narrow tasks by assignee, status or priority, apply bulk actions to selected items, and undo accidental changes.' },
        { name: 'Preserve activity history and recovery paths', description: 'Show chronological changes to status, assignee and due dates, and let users restore archived or recently deleted tasks.' },
      ],
      pitfalls: [
        { name: 'Keeping separate state per view so boards and lists diverge', description: 'If moving a card on a board does not update list rows or summary counts, users lose trust. Derive every view from one task collection.' },
        { name: 'Conflating completion, archiving and permanent deletion', description: 'Teams need completed tasks for history and reporting. Keep Done distinct from archived views and permanent deletion.' },
        { name: 'Hiding concurrent edits or partial bulk failures', description: 'Do not silently overwrite a teammate’s update or show full success when part of a bulk operation failed permission or validation checks.' },
      ],
      questions: [
        'Which workspace members, project members or guests can view, create, edit, archive or delete projects and tasks?',
        'What are the workflow statuses, and can tasks move freely between any status or only along specific transitions?',
        'Can a task be unassigned, assigned to one person, or assigned to multiple people?',
        'If subtasks or blockers exist, can a parent task be marked Done while subtasks remain open?',
        'Which bulk actions are supported, and how can users undo or restore archived or deleted tasks?',
        'When two teammates update the same task concurrently or a save fails, what final state and notice are shown?',
      ],
      example: 'Example: a product workspace could use four statuses (Backlog, In Progress, Review, Done), keep Done tasks visible until archived via a bulk action bar, and provide an undo snackbar for deletions. Confirm actual role permissions, required fields and subtask rules before adopting this setup.',
      relatedDesigns: [
        { id: 'bulk-selection-action-bar', reason: 'A reference for selecting multiple tasks to archive or update from a floating action bar. Real persistence and permission checks need separate implementation.' },
        { id: 'ly-activity-timeline', reason: 'A reference for displaying chronological task creation, status changes and assignment updates. It does not implement activity logging or storage.' },
      ],
      promptSnippet: 'Help design a collaboration and work-management workflow. First confirm workspace and project permissions, task statuses and transition rules, assignment model, completion versus archiving/deletion, bulk operations and concurrent-edit handling. Do not assume undecided rules.\nBased on the answers, describe:\n1. Role-based permissions for viewing, editing, archiving and deleting projects, tasks and history.\n2. Data model for workflow status, archive/deletion state, assignee, priority and due date.\n3. Consistency across board, list and detail views, plus filtering, sorting and bulk actions.\n4. Recovery and user feedback for partial bulk failures, concurrent edits and accidental deletion.\n5. How boards/lists, detail inspectors, bulk action bars, activity timelines and undo notifications connect.\nDo not assume moving a card in the UI enforces permissions or persistence, and do not mistake example policies or design demos for a real collaboration backend.',
    },
  },
  sources: [
    { title: 'Linear Docs — Issue workflow and statuses', url: 'https://linear.app/docs/configuring-workflows' },
    { title: 'GitHub Docs — About Projects and task layouts', url: 'https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects' },
  ],
}, {
  id: 'workspace-dependency-subtask-and-milestone',
  aliases: {
    ko: ['선후행 작업 의존성', '하위 태스크 관리', '마일스톤 일정 밀림', '블로커 작업 연결'],
    en: ['task dependencies and blockers', 'subtask completion rules', 'milestone schedule shifting', 'parent child task rollup'],
  },
  useCases: {
    ko: ['선행 작업이 끝나야 시작할 수 있는 후행 작업(Blocker) 관계를 연결할 때', '하위 태스크 미완료 시 상위 작업의 완료 처리 허용 여부를 정할 때', '선행 작업 마감일이 늦어질 때 후행 작업과 마일스톤 일정 조정 방식을 설계할 때', '순환 의존성(A→B→A) 생성 방지와 차단 해제 알림을 구성할 때'],
    en: ['Linking blocking and blocked tasks so teams see prerequisite work', 'Defining whether parent tasks can close while subtasks remain open', 'Adjusting downstream task dates and milestones when a blocker slips', 'Preventing circular dependencies and notifying assignees when blockers clear'],
  },
  keywords: {
    ko: ['작업 의존성', '선행 작업', '후행 작업', '블로커', '하위 태스크', '서브태스크', '마일스톤', '일정 밀림', '완료 규칙'],
    en: ['task dependency', 'blocker', 'blocked by', 'subtask', 'parent task', 'milestone', 'schedule shift', 'rollup', 'completion rule'],
  },
  text: {
    ko: {
      domain: '협업·업무 관리',
      title: '선행·후행 작업 의존성·하위 태스크 완료 규칙과 일정 밀림',
      summary: '상하위 작업과 선후행 블로커 관계를 구분하고, 완료 조건·일정 연쇄 조정·순환 방지 규칙을 연결합니다.',
      overview: '복잡한 프로젝트에서는 단일 작업의 상태만으로는 전체 진행률을 파악하기 어렵습니다. 큰 작업을 쪼갠 하위 태스크(Subtask)와 작업 간 선후행 순서인 의존성(Dependency), 그리고 주요 목표 시점인 마일스톤이 서로 어떻게 영향을 주는지 정해야 일정 충돌과 완료 누락을 막을 수 있습니다. 아래 내용은 의존성과 하위 작업 설계를 위한 참고이며 특정 조직의 일정 자동 조정 규칙을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '하위 태스크(포함 관계)와 선후행 의존성(순서 관계) 구분', description: '상위 작업의 세부 실행 항목인 하위 태스크와, 서로 다른 작업 사이에 선행 완료가 필요한 블로커(Blocker) 관계를 구분합니다.' },
        { name: '상하위 완료 연동과 진행률 집계', description: '하위 태스크가 모두 끝나야 상위 작업을 완료할 수 있는지, 상위 작업을 완료하면 하위 항목도 함께 완료 처리할지, 진행률을 개수 기준으로 계산할지 정합니다.' },
        { name: '선행 일정 지연 시 후행 일정 조정 방식', description: '선행 작업의 마감일이 뒤로 밀렸을 때 후행 작업과 마일스톤 일정을 자동으로 함께 미룰지, 일정 충돌 경고만 표시하고 수동 조정하게 할지 결정합니다.' },
        { name: '순환 의존성 차단과 블로커 해제 알림', description: 'A가 B를 막고 B가 다시 A를 막는 순환 연결을 등록 단계에서 차단하고, 선행 작업이 완료되면 후행 작업 담당자에게 착수 가능 알림을 보냅니다.' },
      ],
      workflow: [
        { name: '하위 태스크 분해와 선후행 연결하기', description: '상위 작업 아래에 하위 태스크를 추가하거나 다른 작업을 선행·후행 관계로 연결하고, 자기 참조나 순환 연결 여부를 즉시 검사합니다.' },
        { name: '차단 상태 표시와 착수 제한 안내하기', description: '선행 작업이 미완료인 후행 작업에 차단(Blocked) 배지를 표시하고, 진행 중이나 완료로 바꿀 때 경고 또는 제한 규칙을 적용합니다.' },
        { name: '일정 변경 시 연쇄 영향 확인하기', description: '선행 작업의 기간이나 마감일을 바꿀 때 영향을 받는 후행 작업 목록과 마일스톤 여유 기간을 비교해 보여 줍니다.' },
        { name: '하위 완료 집계와 마일스톤 달성 갱신하기', description: '하위 태스크와 선행 작업이 완료될 때마다 상위 작업 진행률과 마일스톤 달성 상태를 갱신하고 다음 담당자에게 알립니다.' },
      ],
      pitfalls: [
        { name: '순환 의존성을 허용해 일정 계산이 무한 루프에 빠지기', description: '직접 연결뿐 아니라 A→B→C→A처럼 건너뛴 순환 연결도 등록 시점에 검사해 차단해야 일정 및 상태 집계가 깨지지 않습니다.' },
        { name: '선행 작업이 밀릴 때 예고 없이 후행 일정을 덮어쓰기', description: '다른 팀의 마감일을 사전 확인 없이 자동으로 바꿔 버리면 혼란이 생깁니다. 자동 이동 여부나 변경 전 영향 미리보기를 명확히 하세요.' },
        { name: '미완료 하위 태스크를 숨긴 채 상위 작업만 완료로 닫기', description: '상위 작업이 완료로 보여도 실제 하위 작업이 남아 있으면 누락이 발생합니다. 미완료 하위 항목 확인 절차나 완료 차단 규칙을 정하세요.' },
      ],
      questions: [
        '하위 태스크가 남아 있을 때 상위 작업의 완료 처리를 막나요, 경고 후 허용하나요, 하위 항목까지 일괄 완료하나요?',
        '선행 작업(Blocker)이 완료되지 않았을 때 후행 작업을 진행 중이나 완료 상태로 바꿀 수 있나요?',
        '선행 작업 마감일이 지연되면 후행 작업과 마일스톤 일정을 자동으로 미루나요, 충돌 표시만 하나요?',
        '하위 태스크의 중첩 단계는 몇 단계까지 허용하며, 상위 진행률은 단순 개수와 가중치 중 무엇으로 계산하나요?',
        '선행 작업이나 상위 작업이 보관·삭제되면 연결된 의존성과 하위 태스크는 어떻게 처리하나요?',
      ],
      example: '예시: 스프린트 보드에서 하위 태스크는 1단계까지만 허용하고 미완료 하위 항목이 있으면 상위 완료 시 확인 창을 띄우며, 선행 작업이 지연되면 후행 작업에 일정 역전 경고를 표시하되 날짜는 담당자가 직접 조정하도록 구성할 수 있습니다. 실제 자동 일정 이동 여부와 차단 강제는 팀 운영 방식에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'ly-expandable-data-rows', reason: '상위 작업 행을 펼쳐 하위 태스크 목록과 선행 블로커 상태를 한눈에 확인하는 표현에 참고할 수 있습니다. 실제 의존성 검증과 진행률 계산은 별도로 구현해야 합니다.' },
        { id: 'ly-time-grid-agenda', reason: '시간 축에서 작업 일정과 마감일 배치를 확인하는 표현에 참고할 수 있습니다. 실제 선후행 연쇄 일정 이동은 구현하지 않습니다.' },
      ],
      promptSnippet: '협업 도구의 선행·후행 작업 의존성, 하위 태스크 완료 규칙, 마일스톤 일정 조정 흐름을 설계해 줘. 먼저 하위 태스크 미완료 시 상위 작업 완료 허용 여부, 선행 블로커 미완료 시 후행 작업 상태 전환 제한, 일정 지연 시 자동 밀림 vs 충돌 경고 정책, 순환 의존성 차단 기준을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 상위·하위 태스크와 선행·후행 의존성, 마일스톤의 관계 및 진행률 집계 기준.\n2. 블로커 미해제 및 하위 태스크 미완료 상태에서의 상태 전환 허용·경고·차단 규칙.\n3. 선행 작업 일정 변경 시 후행 작업·마일스톤 영향 계산과 알림 흐름.\n4. 순환 의존성 입력 방지, 선행·상위 작업 삭제 시 연결 해제 및 복구 처리.\n5. 작업 목록의 하위 펼침 뷰·상세 의존성 섹션·일정 타임라인·차단 배지의 연결.\n화면의 배지 표시만으로 순환 검증이나 일정 조정이 끝난다고 가정하지 말고, 예시 정책과 디자인 데모를 실제 일정 엔진으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Collaboration & Work Management',
      title: 'Task dependencies, subtask completion rules and schedule shifting',
      summary: 'Separate parent-child subtasks from blocking dependencies, and connect completion rules, schedule shifts and cycle prevention.',
      overview: 'In multi-step projects, a single task status rarely tells the whole story. Teams need clear rules for how parent tasks roll up subtasks, what happens when a blocking task slips past its due date, and how milestones reflect remaining work. These concepts are design references, not default scheduling or enforcement rules for a specific team.',
      concepts: [
        { name: 'Subtasks versus blocking dependencies', description: 'Distinguish hierarchical parent-child subtasks that break down one deliverable from finish-to-start blockers between separate tasks.' },
        { name: 'Parent-child completion and progress rollup', description: 'Decide whether open subtasks block parent completion, whether completing a parent cascades to subtasks, and how rollup percentages are calculated.' },
        { name: 'Downstream schedule shifting versus conflict warnings', description: 'Choose whether slipping a blocker automatically pushes dependent task dates and milestones or flags a date conflict for manual review.' },
        { name: 'Cycle detection and unblock notifications', description: 'Reject direct or transitive circular dependencies when linking tasks, and notify downstream assignees as soon as their last blocker completes.' },
      ],
      workflow: [
        { name: 'Break down subtasks and link blockers', description: 'Add subtasks under a parent item or link upstream blockers while validating against self-links and dependency cycles.' },
        { name: 'Surface blocked states and transition rules', description: 'Display blocked indicators on dependent tasks and enforce either a hard block or a confirmation warning when moving them to In Progress or Done.' },
        { name: 'Preview schedule impact on date changes', description: 'When a blocker’s due date moves, highlight affected downstream tasks and milestone buffer impact before or after saving.' },
        { name: 'Update rollups and milestone progress', description: 'Recalculate parent completion ratios and milestone readiness as subtasks and blockers are completed.' },
      ],
      pitfalls: [
        { name: 'Allowing circular dependencies that break rollup or date logic', description: 'Check for indirect cycles (A blocks B blocks C blocks A) at link time so dependency graphs stay acyclic.' },
        { name: 'Silently rewriting downstream due dates without notice', description: 'Automatically shifting dates across teams can hide slippage. Make auto-shift behavior explicit or preview affected tasks first.' },
        { name: 'Closing parent tasks while open subtasks disappear from view', description: 'If completing a parent hides unfinished subtasks without warning, work gets dropped. Prompt the user or require subtask resolution.' },
      ],
      questions: [
        'When subtasks remain open, is completing the parent task blocked, allowed after confirmation, or cascaded to all subtasks?',
        'Can a blocked task move to In Progress or Done while its upstream blocker is still open?',
        'When a blocking task slips, should dependent task dates and milestones shift automatically or show a schedule conflict?',
        'How many subtask nesting levels are allowed, and is progress rolled up by item count or weight?',
        'What happens to dependency links and subtasks when a blocker or parent task is archived or deleted?',
      ],
      example: 'Example: a sprint tool could allow one level of subtasks, ask for confirmation before closing a parent with open subtasks, and show a red date-overlap badge rather than auto-moving dates when a blocker slips. Confirm actual cascade rules and scheduling behavior before adopting this setup.',
      relatedDesigns: [
        { id: 'ly-expandable-data-rows', reason: 'A reference for expanding a parent row to inspect subtasks and blocker status in place. Real dependency validation and rollup logic need separate implementation.' },
        { id: 'ly-time-grid-agenda', reason: 'A reference for viewing scheduled blocks along a time grid. It does not implement dependency-driven date shifting.' },
      ],
      promptSnippet: 'Help design task dependencies, subtask completion rules and milestone schedule adjustments. First confirm parent completion rules when subtasks are open, status restrictions on blocked tasks, automatic date shifting versus conflict warnings, and circular-dependency checks. Do not assume undecided rules.\nBased on the answers, describe:\n1. Relationship and rollup model for parent tasks, subtasks, blocking dependencies and milestones.\n2. Allowed, warned or blocked status transitions when blockers or subtasks remain open.\n3. Schedule impact calculation and notifications when upstream due dates change.\n4. Cycle prevention and cleanup when linked or parent tasks are archived or deleted.\n5. How expandable task rows, dependency sections, timeline views and blocked badges connect.\nDo not assume badge rendering enforces dependency rules, and do not mistake example policies or design demos for a real scheduling engine.',
    },
  },
  sources: [
    { title: 'Linear Docs — Project milestones and dependencies', url: 'https://linear.app/docs/project-dependencies' },
    { title: 'Asana Help Center — Task dependencies and subtasks', url: 'https://help.asana.com/s/article/task-dependencies' },
  ],
}, {
  id: 'workspace-guest-invite-and-external-sharing',
  aliases: {
    ko: ['외부 게스트 초대', '공유 링크 만료 설정', '외부 협업 권한 분리', '내부 전용 필드 숨김'],
    en: ['external guest invitation', 'expiring share links', 'guest access boundaries', 'internal-only task fields'],
  },
  useCases: {
    ko: ['외부 협력사·고객을 전체 워크스페이스가 아닌 특정 프로젝트에만 초대할 때', '만료 기한과 비밀번호·도메인 제한이 있는 외부 공유 링크를 발급할 때', '외부 게스트에게 내부 단가·보안 메모·타 프로젝트 연결을 숨길 때', '계약 종료나 프로젝트 완료 시 게스트 권한과 공유 링크를 일괄 회수할 때'],
    en: ['Inviting external partners or clients to a single project without exposing the workspace', 'Issuing share links with expiration dates, domain checks or revoke controls', 'Hiding internal cost fields, private notes or cross-project links from guests', 'Revoking guest seats and active share links when an engagement ends'],
  },
  keywords: {
    ko: ['게스트 초대', '외부 공유', '공유 링크', '링크 만료', '권한 회수', '외부 협력사', '열람 범위', '내부 전용 속성', '접근 제한'],
    en: ['guest invite', 'external sharing', 'share link', 'link expiration', 'revoke access', 'external collaborator', 'access scope', 'internal fields', 'permission boundary'],
  },
  text: {
    ko: {
      domain: '협업·업무 관리',
      title: '외부 게스트 초대·링크 공유 만료와 내부 전용 속성 분리',
      summary: '정식 구성원과 외부 게스트·공유 링크의 열람 범위를 분리하고, 내부 전용 속성과 만료·회수 절차를 연결합니다.',
      overview: '외부 고객사나 파트너와 협업할 때는 같은 프로젝트 화면을 보더라도 정식 팀원과 똑같은 정보를 노출해서는 안 됩니다. 전체 구성원 디렉터리나 타 프로젝트 목록 접근을 막고, 내부 원가·내부용 코멘트처럼 게스트에게 숨길 속성을 분리하며, 공유 링크의 만료와 즉시 회수 경로를 갖추어야 안전하게 협업할 수 있습니다. 아래 내용은 외부 협업 권한 설계를 위한 참고이며 특정 보안 정책을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '정식 구성원·외부 게스트·공유 링크 방문자 구분', description: '워크스페이스 기본 열람 권한을 가진 구성원, 초대받은 프로젝트·작업만 볼 수 있는 로그인 게스트, 토큰 링크로 읽기만 가능한 외부 방문자를 구분합니다.' },
        { name: '내부 전용 속성과 멘션·검색 범위 제한', description: '같은 작업 안에서도 내부 예상 공수·단가·내부 메모·비공개 첨부를 게스트 화면과 API 응답에서 제외하고, 게스트가 전체 임직원 목록을 자동완성으로 조회하지 못하게 제한합니다.' },
        { name: '공유 링크 만료·재발급과 즉시 폐기', description: '외부 공유 링크에 유효 기간과 열람 가능 대상을 설정하고, 링크가 유출되었을 때 토큰을 재발급하거나 즉시 폐기해 기존 주소를 무효화합니다.' },
        { name: '초대 수락 전 상태와 프로젝트 종료 후 일괄 회수', description: '초대 발송·수락 대기·활성·만료·회수 상태를 나누고, 프로젝트가 보관되거나 계약이 끝날 때 외부 게스트 접근권을 한 번에 거두어들입니다.' },
      ],
      workflow: [
        { name: '게스트 초대 및 공유 링크 조건 설정하기', description: '대상 프로젝트나 작업을 고르고 허용 역할(열람·댓글·편집), 만료일, 허용 이메일 도메인 조건을 지정해 초대장이나 링크를 만듭니다.' },
        { name: '게스트 시점의 노출 항목 검증하기', description: '게스트에게 숨겨지는 내부 전용 필드와 비공개 연결 작업이 제외된 화면을 미리 확인하고 초대 대상에게 전달합니다.' },
        { name: '외부 참여 현황과 만료 예정 목록 점검하기', description: '현재 프로젝트에 접근 가능한 게스트와 활성 공유 링크 목록, 마지막 접근 시각, 만료 예정일을 한곳에서 확인합니다.' },
        { name: '링크 폐기·권한 회수와 재요청 안내하기', description: '만료되거나 관리자가 회수한 링크로 접근하면 권한 종료 안내를 보여 주고, 작업 중이던 게스트 세션은 즉시 읽기 차단 상태로 전환합니다.' },
      ],
      pitfalls: [
        { name: '화면에서만 내부 필드를 숨기고 응답 데이터에는 그대로 내려주기', description: 'CSS나 UI 조건문으로만 내부 단가·메모를 가리면 네트워크 응답으로 노출됩니다. 역할별 반환 필드 자체를 분리하세요.' },
        { name: '멘션(@) 자동완성으로 전체 조직도와 타 프로젝트 이름을 노출하기', description: '외부 게스트가 댓글에서 @를 입력했을 때 참여하지 않은 팀원이나 비밀 프로젝트가 검색되지 않도록 조회 범위를 현재 공유 단위로 제한하세요.' },
        { name: '프로젝트를 보관 처리했는데 외부 공유 링크는 계속 열려 있기', description: '상위 프로젝트가 종료·보관되거나 게스트가 제거되면 하위 작업의 개별 공유 링크와 알림 구독도 함께 비활성화해야 합니다.' },
      ],
      questions: [
        '외부 게스트는 누가 초대할 수 있으며, 허용할 행동(열람만, 댓글 작성, 상태 변경, 파일 첨부)은 어디까지인가요?',
        '같은 작업 안에서 정식 구성원에게만 보이고 외부 게스트에게는 숨겨야 하는 내부 전용 필드나 코멘트가 있나요?',
        '외부 공유 링크는 로그인 없이 열람 가능한가요, 지정된 이메일·도메인 인증이나 만료 기한이 필수인가요?',
        '게스트가 댓글에서 @멘션이나 작업 연결을 할 때 조회할 수 있는 사용자·작업 범위는 어디까지인가요?',
        '게스트 권한을 회수하거나 링크를 폐기했을 때 이미 열려 있는 화면과 기존 작성 댓글은 어떻게 처리하나요?',
      ],
      example: '예시: 외주 파트너를 특정 프로젝트에 댓글 가능 게스트로 초대하되 내부 예산 필드와 타 프로젝트 링크는 숨기고, 외부 공유 링크는 기본 14일 뒤 만료되며 프로젝트 보관 시 모든 활성 공유 링크가 자동 폐기되도록 구성할 수 있습니다. 실제 초대 승인 권한과 숨김 필드 목록은 조직 보안 기준에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'inline-email-validation', reason: '게스트 초대 시 이메일 형식과 허용 도메인 조건을 입력 즉시 확인하는 표현에 참고할 수 있습니다. 실제 초대장 발송과 토큰 검증은 별도로 구현해야 합니다.' },
        { id: 'inline-delete-confirmation', reason: '활성 공유 링크 폐기나 외부 게스트 권한 회수 시 실수를 막기 위해 한 번 더 확인하는 표현에 참고할 수 있습니다. 실제 세션 차단과 권한 제거는 구현하지 않습니다.' },
      ],
      promptSnippet: '협업 도구의 외부 게스트 초대, 만료형 공유 링크, 내부 전용 속성 분리 흐름을 설계해 줘. 먼저 게스트 초대 가능 역할과 허용 행동, 게스트에게 숨길 내부 전용 필드·코멘트, 공유 링크의 인증·만료 조건, 멘션·검색 노출 범위, 권한 회수 시 처리 방식을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 정식 구성원·외부 게스트·공유 링크 방문자별 열람 및 편집 가능 범위.\n2. 내부 전용 속성·비공개 메모·타 프로젝트 연결의 마스킹 및 검색/멘션 제한 규칙.\n3. 초대 발송·수락 대기·만료·토큰 재발급·즉시 회수 상태 전환.\n4. 만료·회수된 링크 접근, 허용되지 않은 도메인 접근, 열람 중 권한 회수 시 사용자 안내.\n5. 공유 설정 창·게스트 목록·링크 만료 배지·내부 전용 표시의 연결.\n클라이언트 화면 숨김만으로 보안 분리가 된다고 가정하지 말고, 예시 정책과 디자인 데모를 실제 권한 검증 시스템으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Collaboration & Work Management',
      title: 'External guest invitations, expiring share links and internal-only fields',
      summary: 'Separate workspace members from external guests and share links, and protect internal fields with clear expiration and revocation.',
      overview: 'Collaborating with clients or contractors inside a project should not expose the rest of the workspace or sensitive internal data. Define what guests and link visitors can see, which fields or comments stay internal-only, and how invitations and share links expire or get revoked. These concepts are design references, not default security controls for a specific organization.',
      concepts: [
        { name: 'Workspace members versus guests and link visitors', description: 'Distinguish full workspace members from invited guests scoped to specific projects or tasks and read-only visitors using a tokenized share link.' },
        { name: 'Internal-only fields and scoped directory lookup', description: 'Strip internal cost fields, private notes and restricted cross-project links for external viewers, and scope @mention autocomplete to collaborators in the shared item.' },
        { name: 'Expiring and revocable share links', description: 'Support expiration dates, optional domain restrictions and instant token rotation or revocation if a link is leaked.' },
        { name: 'Invitation lifecycle and offboarding cleanup', description: 'Track pending, active, expired and revoked guest states, and revoke guest access and active links when a project is archived or completed.' },
      ],
      workflow: [
        { name: 'Configure guest role and share-link constraints', description: 'Select the target project or task, choose allowed actions (view, comment, edit), and set expiration or email-domain requirements.' },
        { name: 'Verify external exposure boundaries', description: 'Confirm which internal fields, private notes and linked items are excluded from the guest perspective before sharing.' },
        { name: 'Audit active guests and expiring links', description: 'List all external collaborators and active share links with their permission level, last access time and expiration date.' },
        { name: 'Revoke access and handle expired sessions', description: 'Invalidate revoked or expired tokens immediately, stop further mutations from open guest sessions, and show a clear access-ended notice.' },
      ],
      pitfalls: [
        { name: 'Hiding internal fields only in the UI while still returning them in payloads', description: 'Excluding internal cost or private notes only in CSS leaks data in network responses. Filter restricted fields before sending data to guests.' },
        { name: 'Exposing the full company directory through @mention autocomplete', description: 'Restrict user and task search for guests so they only see collaborators and items within their shared scope.' },
        { name: 'Leaving task share links active after the parent project is archived', description: 'When a project ends or a guest is removed, cascade revocation to child share links and notification subscriptions.' },
      ],
      questions: [
        'Who can invite external guests or create share links, and which actions (view, comment, status change, upload) can guests perform?',
        'Which task fields, attachments or internal comments must remain hidden from external guests?',
        'Can share links be opened anonymously, or do they require email verification, domain matching or a mandatory expiration date?',
        'Which teammates and tasks can a guest discover through search or @mention autocomplete?',
        'When guest access is revoked or a link expires, what happens to active sessions and comments the guest already posted?',
      ],
      example: 'Example: an agency workspace could let project leads invite clients as comment-only guests, hide internal budget fields and internal notes, set external share links to expire after 14 days, and revoke all guest links automatically when the project is archived. Confirm actual security policies and hidden fields before adopting this setup.',
      relatedDesigns: [
        { id: 'inline-email-validation', reason: 'A reference for checking guest email format and domain rules inline before sending an invite. Real invitation delivery and token verification need separate implementation.' },
        { id: 'inline-delete-confirmation', reason: 'A reference for confirming before revoking a guest seat or invalidating an active share link. Real access revocation needs separate implementation.' },
      ],
      promptSnippet: 'Help design external guest invitations, expiring share links and internal-only field boundaries for a collaboration tool. First confirm who can invite guests, allowed guest actions, internal-only fields and notes, share-link authentication and expiration rules, directory/search scoping, and revocation behavior. Do not assume undecided rules.\nBased on the answers, describe:\n1. Access scope and allowed actions for workspace members, invited guests and share-link visitors.\n2. Rules for stripping internal-only fields, private notes and out-of-scope @mentions or links.\n3. Lifecycle transitions across pending invite, active access, expired link, token rotation and revocation.\n4. User-facing behavior when a link expires, a domain check fails or access is revoked mid-session.\n5. How share dialogs, guest audit lists, expiration badges and internal-only indicators connect.\nDo not assume hiding fields in the UI secures the data, and do not mistake example policies or design demos for real authorization enforcement.',
    },
  },
  sources: [
    { title: 'Notion Help Center — Share and invite guests', url: 'https://www.notion.com/help/add-members-admins-guests-and-groups' },
    { title: 'Atlassian Support — Invite and manage external guests in Confluence', url: 'https://support.atlassian.com/confluence-cloud/docs/invite-guests-to-confluence/' },
  ],
}, {
  id: 'workspace-template-custom-field-and-archiving',
  aliases: {
    ko: ['프로젝트 템플릿', '사용자 정의 필드 관리', '커스텀 속성 스키마 변경', '기존 작업 값 보존'],
    en: ['project templates', 'custom field schema changes', 'historical field preservation', 'template instantiation'],
  },
  useCases: {
    ko: ['반복되는 프로젝트를 표준 작업·역할·상대 마감일이 담긴 템플릿으로 생성할 때', '팀별 사용자 정의 필드(선택형·숫자·날짜)를 추가하거나 옵션을 수정할 때', '커스텀 필드 옵션을 바꾸거나 비활성화해도 과거 완료 작업의 기록을 보존할 때', '템플릿을 수정했을 때 이미 생성된 진행 중 프로젝트와의 분리 기준을 정할 때'],
    en: ['Creating repeatable projects from templates with preset tasks and relative due dates', 'Adding or editing team custom fields such as select options, numbers or dates', 'Preserving historical values on completed tasks when custom field options change or retire', 'Deciding how template edits affect already instantiated projects'],
  },
  keywords: {
    ko: ['프로젝트 템플릿', '사용자 정의 필드', '커스텀 필드', '필드 스키마', '옵션 비활성화', '상대 마감일', '과거 데이터 보존', '필수 입력 전환'],
    en: ['project template', 'custom field', 'field schema', 'select option', 'relative due date', 'historical value', 'field deprecation', 'required field'],
  },
  text: {
    ko: {
      domain: '협업·업무 관리',
      title: '프로젝트 템플릿·사용자 정의 필드 변경과 기존 작업 값 유지',
      summary: '템플릿 복제 시점과 원본 수정을 분리하고, 사용자 정의 필드 변경 시 기존 작업 값과 집계를 안전하게 보존합니다.',
      overview: '협업 도구를 오래 쓰다 보면 팀마다 필요한 속성(사용자 정의 필드)과 프로젝트 템플릿이 계속 바뀝니다. 이때 새 필드를 필수로 바꾸거나 선택지 이름을 수정·삭제했다고 해서 기존 진행 중이거나 완료된 작업의 기록이 깨지거나 저장이 막히면 안 됩니다. 아래 내용은 템플릿과 커스텀 필드 수명주기를 설계하기 위한 참고이며 특정 데이터 스키마를 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '템플릿 복제(스냅샷)와 원본 템플릿 수정 분리', description: '템플릿으로 새 프로젝트를 만들 때 기본 작업·담당 역할·기준일 대비 상대 마감일(D+3 등)을 복제하며, 이후 템플릿을 고쳐도 이미 생성된 프로젝트는 덮어쓰지 않는지 정합니다.' },
        { name: '공용 커스텀 필드와 프로젝트 전용 필드', description: '여러 프로젝트에서 함께 집계하는 워크스페이스 공용 필드와 특정 프로젝트 안에서만 쓰는 로컬 필드를 구분해 변경 영향 범위를 관리합니다.' },
        { name: '필드 옵션 변경·비활성화와 과거 값 보존', description: '선택형 필드의 옵션 이름을 바꾸는 것과 더 이상 새로 고르지 못하게 비활성화(Deprecate)하는 것을 구분해, 과거 완료 작업에 기록된 값이 유실되지 않게 합니다.' },
        { name: '새 필수 필드 추가 시 기존 작업 유예 처리', description: '기존 프로젝트에 새 필수 필드를 추가했을 때 이미 만들어져 있던 작업은 다음 수정 시점이나 특정 단계 전환 시점에 입력을 요구할지 정합니다.' },
      ],
      workflow: [
        { name: '템플릿 정의와 기준일 기반 프로젝트 생성하기', description: '표준 작업 목록, 하위 구조, 커스텀 필드 기본값을 템플릿으로 저장하고, 프로젝트 시작일이나 목표일을 입력받아 상대 일정을 계산해 생성합니다.' },
        { name: '커스텀 필드 추가·수정과 영향 범위 확인하기', description: '필드 이름·형식·선택 옵션을 바꿀 때 몇 개의 프로젝트와 기존 작업이 이 필드를 사용 중인지 먼저 보여 줍니다.' },
        { name: '옵션 비활성화 및 대체 값 마이그레이션하기', description: '더 이상 쓰지 않는 선택 옵션은 신규 선택만 막고 기존 작업 표시는 유지하거나, 관리자가 지정한 대체 옵션으로 일괄 전환합니다.' },
        { name: '기존 작업 편집 시 누락 필수값 안내하기', description: '나중에 추가된 필수 필드가 비어 있는 기존 작업을 수정하거나 완료로 옮길 때 인라인으로 입력을 안내합니다.' },
      ],
      pitfalls: [
        { name: '선택 옵션을 물리 삭제해 과거 작업의 속성이 빈칸으로 바뀌기', description: '지난 분기 분류 옵션을 바로 지우면 과거 완료 작업의 통계와 이력이 모두 깨집니다. 삭제 대신 신규 선택 비활성화를 기본으로 두세요.' },
        { name: '필드 자료형(텍스트→숫자 등)을 호환성 확인 없이 덮어쓰기', description: '이미 값이 들어 있는 필드의 타입을 강제로 바꾸면 데이터 손실이 발생합니다. 기존 값 변환 규칙을 확인하거나 새 필드 생성을 안내하세요.' },
        { name: '템플릿 수정 사항을 진행 중인 프로젝트에 예고 없이 반영하기', description: '이미 팀이 수정하며 진행 중인 프로젝트에 템플릿 변경을 덮어쓰면 작업이 중복되거나 사라질 수 있습니다.' },
      ],
      questions: [
        '프로젝트 템플릿에는 어떤 항목(작업 구조, 상대 마감일, 기본 담당 역할, 커스텀 필드)까지 포함하나요?',
        '템플릿을 수정했을 때 이미 생성되어 진행 중인 프로젝트에는 영향을 주지 않나요, 선택적 동기화를 지원하나요?',
        '사용자 정의 필드는 워크스페이스 전체 공용인가요, 프로젝트별로 따로 만들 수 있나요?',
        '선택형 필드의 옵션을 삭제·비활성화하거나 이름을 바꿀 때 기존 작업에 저장된 값은 어떻게 표시·보존하나요?',
        '이미 작업이 많은 프로젝트에 새로운 필수 커스텀 필드를 추가하면 기존 미입력 작업은 언제 입력을 강제하나요?',
      ],
      example: '예시: 신규 런칭 템플릿에서 시작일 기준으로 각 작업의 상대 마감일을 자동 배치하고, 커스텀 필드의 옛날 옵션은 비활성화(신규 선택 불가)로만 전환해 과거 완료된 작업의 표시는 그대로 유지하도록 구성할 수 있습니다. 실제 공용 필드 권한과 일괄 값 변환 여부는 운영 방식에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'inline-edit-field', reason: '작업 상세나 필드 설정에서 커스텀 속성 값을 제자리에서 수정하고 저장·취소하는 표현에 참고할 수 있습니다. 실제 스키마 검증과 일괄 반영은 별도로 구현해야 합니다.' },
        { id: 'faceted-filter-chips', reason: '추가한 사용자 정의 필드 조건으로 작업 목록을 다중 필터링하는 표현에 참고할 수 있습니다. 실제 커스텀 필드 인덱싱과 쿼리는 구현하지 않습니다.' },
      ],
      promptSnippet: '협업 도구의 프로젝트 템플릿 생성과 사용자 정의 필드(Custom Field) 변경·보존 흐름을 설계해 줘. 먼저 템플릿 포함 항목과 생성 후 원본 수정 시 분리 원칙, 공용 vs 프로젝트 전용 필드 범위, 옵션 이름 변경·비활성화 시 과거 작업 값 보존 방식, 새 필수 필드 추가 시 기존 작업 처리 기준을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 템플릿 구성 요소와 기준일 기반 프로젝트 생성(복제) 규칙.\n2. 사용자 정의 필드의 타입, 적용 범위(공용/개별), 필수 여부 구조.\n3. 필드 옵션 수정·비활성화·대체 값 이관 시 기존 진행/완료 작업 데이터 보존.\n4. 호환되지 않는 타입 변경 제한 및 신규 필수 필드 미입력 작업의 단계별 안내.\n5. 템플릿 선택 화면·필드 관리 설정·작업 상세 인라인 편집·필터 칩의 연결.\n옵션 삭제가 과거 기록까지 지워도 된다고 가정하지 말고, 예시 정책과 디자인 데모를 실제 스키마 마이그레이션 구현으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Collaboration & Work Management',
      title: 'Project templates, custom-field schema changes and historical value preservation',
      summary: 'Decouple template snapshots from live projects, and preserve historical task data when custom fields evolve.',
      overview: 'As teams mature, their project templates and custom fields change. Adding a required field or retiring an old dropdown option must not corrupt historical records on completed tasks or unexpectedly mutate active projects created from an earlier template. These concepts are design references, not default schema rules for a specific product.',
      concepts: [
        { name: 'Template instantiation versus live template edits', description: 'Clone preset tasks, role placeholders and relative due dates when creating a project, while keeping already created projects independent from later template edits.' },
        { name: 'Workspace-shared versus project-local custom fields', description: 'Distinguish global custom fields used for cross-project reporting from fields scoped to a single project.' },
        { name: 'Option deprecation versus destructive deletion', description: 'Separate renaming an option from deprecating it (blocking new selections while keeping existing values intact on historical tasks).' },
        { name: 'Backfill rules for newly required fields', description: 'Define whether adding a required custom field leaves existing tasks valid until their next edit or stage transition.' },
      ],
      workflow: [
        { name: 'Instantiate projects with relative dates', description: 'Save standard task hierarchies and custom field defaults in a template, and compute concrete due dates from a chosen kickoff or target date.' },
        { name: 'Inspect impact before changing field schemas', description: 'Show how many projects and tasks reference a custom field or option before applying renames, deprecations or type changes.' },
        { name: 'Deprecate or migrate retired field options', description: 'Hide retired options from new selections while preserving them on old tasks, or let admins map old values to a replacement option.' },
        { name: 'Prompt for missing required fields on next transition', description: 'When an older task lacks a newly required field, guide the user inline when they edit the task or move it to a gated status.' },
      ],
      pitfalls: [
        { name: 'Hard-deleting select options and wiping historical task records', description: 'Removing an option outright erases past reporting data. Prefer deprecating options so completed tasks keep their recorded value.' },
        { name: 'Mutating a custom field’s data type without a migration path', description: 'Changing a populated text field into a number or date field causes data loss. Block incompatible type changes or create a new field.' },
        { name: 'Pushing template edits directly into active projects unannounced', description: 'Overwriting an in-flight project when a template changes can duplicate or overwrite custom team progress.' },
      ],
      questions: [
        'Which elements (task hierarchy, relative due dates, role placeholders, custom fields) are included when creating a project from a template?',
        'Do edits to a template affect only future projects, or can existing projects opt in to template updates?',
        'Are custom fields shared across the workspace, scoped to individual projects, or both?',
        'When a custom-field option is renamed, deprecated or deleted, how are values on existing and completed tasks preserved?',
        'If a custom field becomes required after tasks already exist, when must older tasks fill in that value?',
      ],
      example: 'Example: a launch template could generate tasks with due dates relative to kickoff day, while retiring a custom-field option marks it as deprecated—hidden from the picker for new tasks but still displayed on historical tasks. Confirm actual shared-field permissions and migration options before adopting this setup.',
      relatedDesigns: [
        { id: 'inline-edit-field', reason: 'A reference for editing custom field values or labels inline with explicit save and cancel controls. Real schema validation and migrations need separate implementation.' },
        { id: 'faceted-filter-chips', reason: 'A reference for filtering task lists by custom field values. Real custom-field indexing and queries need separate implementation.' },
      ],
      promptSnippet: 'Help design project templates and custom-field lifecycle management for a collaboration tool. First confirm what templates clone, whether live projects stay independent from later template edits, shared versus project-local field scope, how retired options preserve historical task values, and when newly required fields are enforced on existing tasks. Do not assume undecided rules.\nBased on the answers, describe:\n1. Template structure and relative-date instantiation rules.\n2. Custom-field types, scope (workspace-wide versus project-local) and required-field rules.\n3. Handling of option renames, deprecation and value migration without losing historical data.\n4. Safeguards against incompatible type changes and progressive prompts for missing required values.\n5. How template pickers, field schema settings, inline task fields and filter chips connect.\nDo not assume deleting an option should erase historical values, and do not mistake example policies or design demos for real schema migration logic.',
    },
  },
  sources: [
    { title: 'Asana Help Center — Custom fields and project templates', url: 'https://help.asana.com/s/article/custom-fields' },
    { title: 'Jira Cloud Support — Configure custom field contexts and options', url: 'https://support.atlassian.com/jira-cloud-administration/docs/configure-custom-field-context/' },
  ],
}, {
  id: 'workspace-approval-stage-and-signoff',
  aliases: {
    ko: ['단계별 결재 승인', '검토 요청과 반려 사유', '승인 후 수정 잠금', '다중 결재자 합의'],
    en: ['multi-stage approval workflow', 'review sign-off and rejection', 'post-approval edit lock', 'approver quorum rules'],
  },
  useCases: {
    ko: ['작업이나 산출물이 다음 단계로 넘어가기 전에 지정된 승인자의 결재를 거치게 할 때', '단독 승인·전원 합의(만장일치)·순차 결재 조건을 구분할 때', '반려 시 필수 사유 입력과 수정 후 재요청 이력을 남길 때', '승인 완료 후 산출물이나 핵심 속성이 임의로 바뀌면 승인을 무효화하거나 잠글 때'],
    en: ['Requiring formal sign-off before a task or deliverable moves to the next stage', 'Distinguishing any-one approver, unanimous approval and sequential stages', 'Capturing required rejection reasons and tracking resubmission cycles', 'Locking approved fields or resetting sign-off if key content is edited after approval'],
  },
  keywords: {
    ko: ['결재', '승인 단계', '검토 요청', '반려 사유', '재요청', '승인 잠금', '만장일치', '순차 승인', '대리 승인', '결재 이력'],
    en: ['approval workflow', 'sign-off', 'review request', 'rejection reason', 'resubmission', 'edit lock', 'unanimous approval', 'sequential approval', 'delegation', 'approval history'],
  },
  text: {
    ko: {
      domain: '협업·업무 관리',
      title: '단계별 결재·검토 요청·반려 사유 기록과 승인 후 수정 잠금',
      summary: '일반 작업 상태와 결재 결정을 분리하고, 합의 기준·반려 후 재요청·승인 후 수정 시 효력 처리를 연결합니다.',
      overview: '예산 집행, 디자인 확정, 배포 승인처럼 책임 확인이 필요한 작업은 단순한 칸반 카드 이동만으로 처리하기 어렵습니다. 누가 승인 권한을 갖는지, 여러 승인자 중 한 명만 승인해도 되는지 전원이 승인해야 하는지, 반려 사유와 재요청 차수를 어떻게 남기고 승인 후 내용이 바뀌면 어떻게 처리할지 정해야 합니다. 아래 내용은 결재·검토 흐름 설계를 위한 참고이며 특정 기업의 내규를 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '작업 진행 상태와 승인 결정(Decision) 분리', description: '작업의 진행 단계(검토 대기 등)와 개별 결재자의 의사 표시(대기·승인·반려·변경 요청)를 분리해 다중 승인자의 응답을 각각 기록합니다.' },
        { name: '단독·만장일치·순차 결재 규칙', description: '지정된 승인자 중 1명만 승인해도 통과되는지(Any), 전원 승인이 필요한지(All), 1차 승인 후 2차 승인자에게 넘어가는 순차 구조인지 정합니다.' },
        { name: '반려 사유 필수화와 재요청 차수 관리', description: '반려나 수정 요청 시 구체적인 사유를 남기게 하고, 작성자가 보완해 다시 올렸을 때 이전 차수의 반려 기록과 새 검토 요청을 구분해 보여 줍니다.' },
        { name: '승인 완료 후 수정 잠금과 승인 초기화', description: '승인이 끝난 작업의 핵심 내용이나 첨부 파일이 수정되는 것을 잠글지, 수정 시 기존 승인을 무효화하고 재승인을 받게 할지 결정합니다.' },
      ],
      workflow: [
        { name: '검토 대상 확정과 승인자 지정해 요청하기', description: '필수 입력값과 산출물이 준비되었는지 확인한 뒤 승인자와 결재 방식(단독·전원·순차), 응답 기한을 지정해 검토를 요청합니다.' },
        { name: '승인·반려 결정과 사유 기록하기', description: '승인자가 요청 내용과 변경점을 확인하고 승인하거나 반려 사유를 남겨 결정을 등록하며, 정족수 충족 여부에 따라 단계 상태를 갱신합니다.' },
        { name: '반려 항목 보완 후 재검토 요청하기', description: '반려된 사유를 확인해 내용을 수정한 뒤 새 차수로 재요청을 보내고, 누구의 승인을 다시 받아야 하는지 안내합니다.' },
        { name: '승인 완료 잠금 및 변경 시 재승인 처리하기', description: '최종 승인된 항목은 승인 시각과 결재자 기록을 고정하고, 사후 수정이 발생하면 잠금 안내 또는 승인 초기화 규칙을 적용합니다.' },
      ],
      pitfalls: [
        { name: '승인이 끝난 뒤 본문이나 금액을 고쳐도 승인 완료 배지가 그대로 남기', description: '승인 후 핵심 내용이 바뀌었는데 기존 승인자 이름으로 완료 표시가 유지되면 감사 이력이 왜곡됩니다. 편집 잠금이나 승인 초기화 기준을 두세요.' },
        { name: '다중 승인자 중 한 명이 반려했는데 다른 사람의 승인으로 통과되기', description: '만장일치나 순차 결재에서 반려가 발생했을 때 남은 대기 상태와 전체 결재 결과가 어떻게 되는지 명확히 정의하세요.' },
        { name: '재요청 시 이전 반려 사유와 결재 이력을 덮어써 지우기', description: '몇 차에 누가 왜 반려했고 무엇이 보완되었는지 시간순으로 남아야 맥락을 파악할 수 있습니다.' },
      ],
      questions: [
        '승인자가 여러 명일 때 1명 승인(Any), 전원 승인(All), 순서대로 승인(Sequential) 중 어떤 방식을 사용하나요?',
        '결재자가 반려하거나 수정을 요청할 때 사유 입력이 필수인가요? 작성자 본인이 스스로 승인하는 것을 막아야 하나요?',
        '반려 후 수정해 재요청할 때 이미 승인했던 다른 결재자의 승인도 처음부터 다시 받나요, 반려한 사람만 다시 확인하나요?',
        '최종 승인이 완료된 뒤 작업 본문·첨부·주요 속성을 수정할 수 있나요? 수정하면 기존 승인이 자동 취소되나요?',
        '승인자가 부재중일 때 대리 승인자 지정이나 결재선 변경은 누가 할 수 있나요?',
      ],
      example: '예시: 배포 승인 단계에서 개발 리드와 QA 리드 2명의 전원 승인을 요구하고, 한 명이라도 반려하면 사유와 함께 작성 중 상태로 돌아가며, 승인 완료 후 배포 대상 버전을 수정하면 두 사람의 승인이 모두 초기화되도록 구성할 수 있습니다. 실제 결재 정족수와 사후 수정 허용 범위는 조직 규정에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'ly-activity-timeline', reason: '검토 요청·승인·반려 사유·재요청 차수를 시간순 이력으로 보여 주는 표현에 참고할 수 있습니다. 실제 결재 권한 검증과 상태 잠금은 별도로 구현해야 합니다.' },
        { id: 'linked-form-error-summary', reason: '검토 요청 전 필수 산출물이나 반려 사유 누락을 요약해 안내하는 표현에 참고할 수 있습니다. 실제 결재선 라우팅은 구현하지 않습니다.' },
      ],
      promptSnippet: '협업 도구의 단계별 결재·검토 요청·반려 및 승인 후 수정 잠금 흐름을 설계해 줘. 먼저 다중 승인자 합의 방식(단독·전원·순차), 본인 승인 제한 및 반려 사유 필수 여부, 재요청 시 기존 승인 유지/초기화 기준, 최종 승인 후 수정 잠금 또는 승인 무효화 규칙을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 요청자·승인자·열람자 권한과 결재 단계별 합의 조건.\n2. 검토 대기·부분 승인·반려(수정 필요)·최종 승인·승인 취소 상태의 전환.\n3. 반려 사유 기록, 보완 후 재요청 차수 관리, 이전 승인자 재확인 범위.\n4. 최종 승인 후 핵심 속성 수정 시도 시 잠금 경고 또는 승인 초기화 처리.\n5. 결재 요청 패널·승인자별 상태 배지·반려 사유 입력창·결재 이력 타임라인의 연결.\n화면의 승인 버튼 클릭만으로 권한 검증이나 수정 잠금이 보장된다고 가정하지 말고, 예시 정책과 디자인 데모를 실제 전자결재 백엔드로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Collaboration & Work Management',
      title: 'Multi-stage approvals, rejection feedback and post-signoff edit locks',
      summary: 'Separate task status from individual approver decisions, and connect quorum rules, rejection loops and post-approval edit locks.',
      overview: 'Deliverables such as budget requests, release checklists or client sign-offs need more than a movable status column. Define who can approve, whether one approver or all approvers must sign off, how rejection reasons and resubmissions are tracked, and what happens if someone edits the item after approval. These concepts are design references, not default compliance rules for a specific organization.',
      concepts: [
        { name: 'Task status versus individual approver decisions', description: 'Track each approver’s decision (pending, approved, changes requested) separately from the overall task stage.' },
        { name: 'Single, unanimous and sequential approval rules', description: 'Distinguish any-one-approver rules from unanimous sign-off and multi-stage sequential approvals where stage two starts after stage one passes.' },
        { name: 'Mandatory rejection feedback and resubmission rounds', description: 'Require a written reason when requesting changes, and preserve prior review rounds when the author updates the work and resubmits.' },
        { name: 'Post-signoff edit locks versus approval reset', description: 'Decide whether approved fields and attachments are locked against edits or whether modifying them automatically invalidates existing sign-offs.' },
      ],
      workflow: [
        { name: 'Validate readiness and submit for review', description: 'Check required deliverables, assign approvers and quorum rules, and lock or snapshot the submitted state.' },
        { name: 'Record approvals or change requests', description: 'Let each approver approve or reject with a comment, and advance or return the task based on the configured quorum rule.' },
        { name: 'Revise and resubmit after rejection', description: 'Guide the author to address rejection notes, submit a new review round, and notify the required approvers.' },
        { name: 'Enforce post-approval locks or reset on edit', description: 'Record the final sign-off timestamp and either block edits to approved fields or require re-approval when critical fields change.' },
      ],
      pitfalls: [
        { name: 'Keeping an Approved badge intact after critical fields are edited', description: 'If someone changes the scope or attachment after sign-off without resetting or locking approval, the audit trail becomes misleading.' },
        { name: 'Ambiguous behavior when one approver rejects in a multi-approver stage', description: 'Define clearly whether a single rejection immediately halts the stage or waits for remaining reviewers.' },
        { name: 'Overwriting previous rejection reasons on resubmission', description: 'Keep each review round in chronological history so reviewers can verify what changed since the last rejection.' },
      ],
      questions: [
        'When multiple approvers are assigned, does the stage require any one approver, all approvers, or sequential stages?',
        'Is a comment required when rejecting, and are task authors prevented from approving their own requests?',
        'When a rejected item is resubmitted, must all approvers sign off again or only the reviewer who requested changes?',
        'After final approval, are key fields and attachments locked, or does editing them reset the approval state?',
        'Who is allowed to reassign or delegate an approval when a designated approver is unavailable?',
      ],
      example: 'Example: a release task could require unanimous sign-off from both Engineering and QA leads, require a comment on rejection, and automatically reset both approvals if the target build version or checklist is edited after sign-off. Confirm actual quorum rules and lock policies before adopting this setup.',
      relatedDesigns: [
        { id: 'ly-activity-timeline', reason: 'A reference for showing chronological review requests, individual sign-offs, rejection reasons and resubmissions. Real approval enforcement and edit locking need separate implementation.' },
        { id: 'linked-form-error-summary', reason: 'A reference for summarizing missing required fields or missing rejection reasons before submitting an approval action. Real workflow routing needs separate implementation.' },
      ],
      promptSnippet: 'Help design a multi-stage approval and sign-off workflow for a collaboration tool. First confirm quorum rules (any, all, sequential), self-approval restrictions and required rejection reasons, whether resubmission resets prior approvals, and whether post-approval edits are locked or invalidate sign-off. Do not assume undecided rules.\nBased on the answers, describe:\n1. Requester, approver and viewer permissions plus stage quorum rules.\n2. State transitions across pending review, partially approved, changes requested, approved and approval-reset states.\n3. Recording rejection reasons, resubmission rounds and re-review scope.\n4. Lock warnings or automatic sign-off reset when approved fields or attachments change.\n5. How the review request panel, per-approver badges, rejection reason prompt and audit timeline connect.\nDo not assume UI buttons alone enforce approval locks, and do not mistake example policies or design demos for a real compliance workflow engine.',
    },
  },
  sources: [
    { title: 'Asana Help Center — Approvals in Asana', url: 'https://help.asana.com/s/article/approvals' },
    { title: 'Jira Service Management Support — Add an approval step to a workflow', url: 'https://support.atlassian.com/jira-service-management-cloud/docs/add-an-approval-to-a-workflow/' },
  ],
}];
