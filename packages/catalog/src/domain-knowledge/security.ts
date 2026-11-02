import type { DomainKnowledge } from '../domain-knowledge';

export const SECURITY_KNOWLEDGE: DomainKnowledge[] = [
  {
    id: 'security-rbac-role-assignment-and-least-privilege',
    aliases: {
      ko: ['역할 기반 권한', 'RBAC 설계', '커스텀 역할 관리', '최고관리자 보호', '최소 권한 부여'],
      en: ['role-based access control', 'RBAC role management', 'custom role scopes', 'last-admin protection', 'least privilege assignment'],
    },
    useCases: {
      ko: [
        '사전 정의된 기본 역할과 세부 권한을 조합한 커스텀 역할을 함께 설계할 때',
        '조직·워크스페이스·리소스 단위 중 어디까지 역할을 부여할지 범위를 정할 때',
        '마지막 최고관리자의 권한 강등이나 탈퇴로 관리 불능 상태가 되는 것을 막을 때',
        '권한이 변경된 사용자의 열려 있는 화면과 API 요청에 즉시 새 권한을 반영할 때',
      ],
      en: [
        'Designing built-in roles alongside custom roles composed of granular permissions',
        'Choosing whether roles apply at the organization, workspace or resource level',
        'Preventing lockout by blocking demotion or removal of the last super-admin',
        'Applying permission changes to active user sessions and API requests without delay',
      ],
    },
    keywords: {
      ko: ['RBAC', '역할 기반 권한', '접근 제어', '최소 권한', '커스텀 역할', '권한 위임', '최고관리자', '권한 상속', '리소스 범위'],
      en: ['rbac', 'role-based access control', 'least privilege', 'custom roles', 'permission scope', 'super admin', 'privilege escalation', 'role assignment', 'access control'],
    },
    text: {
      ko: {
        domain: '권한·보안·감사',
        title: '역할 기반 권한(RBAC)·커스텀 역할 조합과 마지막 최고관리자 보호',
        summary: '권한 원자 단위를 역할로 묶어 부여 범위를 분리하고, 자신이 가진 권한만 위임하도록 제한하며 마지막 최고관리자 상실을 방지합니다.',
        overview: '조직형 서비스에서는 단순한 관리자·일반 사용자 이분법만으로 운영 요구를 감당하기 어렵습니다. 결제만 담당하는 재무 역할, 설정은 볼 수만 있는 감사 역할처럼 기능별 읽기·쓰기·삭제 권한을 조합할 수 있어야 합니다. 동시에 권한 부여자가 자기보다 높은 권한을 남에게 주지 못하게 막고, 조직에 최소 1명의 최고관리자가 남도록 보장해야 합니다. 아래 내용은 역할 기반 접근 제어 설계를 위한 참고이며 특정 보안 표준을 기본값으로 강제하지 않습니다.',
        concepts: [
          { name: '원자적 권한(Permission)과 역할(Role) 분리', description: '코드에서 역할 이름을 직접 비교하지 않고 세분화된 행동 권한(예: 청구서 조회, 멤버 초대)을 기준으로 검사하며, 역할은 이러한 권한의 묶음으로 관리합니다.' },
          { name: '부여 범위(Scope)와 복수 역할 합산', description: '조직 전체에 적용되는 역할과 특정 프로젝트·폴더에만 적용되는 역할을 구분하고, 한 사용자가 여러 역할을 가질 때 허용 권한을 어떻게 합산할지 정합니다.' },
          { name: '권한 상승 방지(Privilege Escalation Guard)', description: '역할을 편집하거나 다른 멤버에게 부여할 때, 작업자가 현재 보유하지 않은 상위 권한을 새 역할에 포함하거나 위임하지 못하도록 차단합니다.' },
          { name: '마지막 최고관리자 불변 조건(Last-Admin Invariant)', description: '조직 내 활성 상태인 최고관리자가 1명뿐일 때는 해당 계정의 역할 강등, 비활성화, 조직 나가기를 차단하고 다른 최고관리자 지정을 먼저 요구합니다.' },
        ],
        workflow: [
          { name: '기본 역할과 세부 권한 매트릭스 정의하기', description: '소유자·관리자·편집자·뷰어 같은 기본 역할과 각 역할에 포함되는 세부 행동 권한을 표로 정리합니다.' },
          { name: '커스텀 역할 생성 및 위임 한도 검증하기', description: '관리자가 세부 권한을 선택해 새 역할을 만들 때 필수 선행 권한(예: 수정 권한 선택 시 조회 권한 자동 포함)과 위임 가능 범위를 검사합니다.' },
          { name: '멤버별 역할 할당과 최고관리자 수 확인하기', description: '멤버의 역할을 바꾸거나 제거할 때 동시 요청 환경에서도 최소 1명의 최고관리자가 유지되는지 원자적으로 확인합니다.' },
          { name: '권한 회수 즉시 반영 및 안내하기', description: '역할이 축소되거나 회수되면 캐시된 토큰과 화면 메뉴를 갱신하고, 권한이 없는 요청에는 필요한 역할과 요청 경로를 안내합니다.' },
        ],
        pitfalls: [
          { name: '프론트엔드에서 메뉴만 숨기고 서버 API 검사를 생략하기', description: '버튼을 비활성화해도 직접 API를 호출하면 작업이 실행될 수 있으므로 모든 상태 변경 요청은 서버에서 세부 권한을 다시 검증해야 합니다.' },
          { name: '동시에 두 최고관리자가 서로를 강등해 무관리자 조직 만들기', description: '단순 조회 후 업데이트하면 경쟁 상태로 두 요청이 모두 통과할 수 있으므로 잠금이나 조건부 갱신으로 마지막 최고관리자를 보호해야 합니다.' },
          { name: '역할 삭제 시 해당 역할을 가진 기존 멤버를 방치하기', description: '사용 중인 커스텀 역할을 바로 지우면 멤버가 아무 권한도 없거나 오류 상태에 빠질 수 있으므로 대체 역할로 먼저 이전하거나 삭제를 막아야 합니다.' },
        ],
        questions: [
          '기본 제공 역할 외에 고객사가 세부 권한을 체크해 커스텀 역할을 직접 만들 수 있나요?',
          '역할은 조직 전체에만 부여되나요, 아니면 워크스페이스·프로젝트 단위로 다르게 부여할 수 있나요?',
          '한 멤버에게 여러 역할이 동시에 부여될 때 권한은 합집합으로 적용되나요, 명시적 거부 규칙이 있나요?',
          '사용 중인 커스텀 역할을 수정하거나 삭제할 때 이미 그 역할을 가진 멤버는 어떻게 처리하나요?',
          '권한이 변경되었을 때 이미 발급된 액세스 토큰이나 열려 있는 세션에는 언제부터 새 권한이 적용되나요?',
        ],
        example: '예시: 소유자·관리자·재무·뷰어 4개 기본 역할을 제공하고, 커스텀 역할은 소유자만 생성할 수 있으며, 활성 소유자가 1명뿐일 때는 역할 변경 버튼을 비활성화하고 서버에서도 거부하는 방식을 생각할 수 있습니다. 실제 역할 종류와 토큰 갱신 주기는 서비스 구조에 맞게 먼저 확인해야 합니다.',
        relatedDesigns: [
          { id: 'mixed-state-checkbox-group', reason: '커스텀 역할 편집 화면에서 도메인별 전체 권한 선택과 하위 세부 권한의 부분 선택(indeterminate) 상태를 표현할 때 참고할 수 있습니다. 서버 측 권한 검증은 별도로 구현해야 합니다.' },
          { id: 'inline-delete-confirmation', reason: '커스텀 역할 삭제나 관리자 권한 회수처럼 위험한 작업 전에 영향을 받는 멤버 수를 보여주고 재확인할 때 참고할 수 있습니다. 마지막 최고관리자 차단 로직은 서버에서 함께 보장해야 합니다.' },
        ],
        promptSnippet: '조직·워크스페이스 서비스의 역할 기반 권한(RBAC)과 커스텀 역할 할당, 마지막 최고관리자 보호 흐름을 설계해 줘. 먼저 기본 역할과 커스텀 역할 허용 여부, 조직·리소스 단위의 권한 부여 범위, 복수 역할 보유 시 합산 규칙, 사용 중인 역할 삭제 시 대체 처리, 권한 변경 시 활성 세션 반영 시점을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 원자적 세부 권한 목록과 기본·커스텀 역할의 매핑 구조.\n2. 선행 권한(조회 없는 수정 방지) 및 자기 권한 초과 위임 차단 규칙.\n3. 마지막 최고관리자 강등·탈퇴·동시 해제 요청을 막는 불변 조건.\n4. 역할 수정·삭제 시 기존 할당 멤버의 이전 절차와 토큰·세션 반영 방식.\n5. 역할 목록, 권한 매트릭스 편집, 멤버별 역할 지정 화면의 연결.\n화면에서 버튼을 숨기는 것만으로 권한이 통제된다고 가정하지 말고, 예시 정책과 디자인 데모를 실제 인가(Authorization) 구현으로 간주하지 말아 줘.',
      },
      en: {
        domain: 'Permissions, Security & Audit',
        title: 'Role-based access control, custom role scopes and last-admin protection',
        summary: 'Bundle atomic permissions into scoped roles, prevent privilege escalation during delegation, and protect the last super-admin.',
        overview: 'A simple admin-versus-member split rarely covers real organizational workflows such as billing-only staff or read-only auditors. Services need roles built from atomic permissions, clear boundaries on whether roles apply globally or per workspace, and safeguards so nobody grants permissions they do not hold or removes the final super-admin. These concepts are design references rather than a fixed compliance mandate.',
        concepts: [
          { name: 'Atomic permissions versus named roles', description: 'Evaluate access against fine-grained action permissions (such as viewing invoices or inviting members) while treating roles as configurable bundles of those permissions.' },
          { name: 'Assignment scopes and multi-role union', description: 'Distinguish organization-wide roles from project- or resource-scoped roles, and define how permissions combine when a member holds multiple roles.' },
          { name: 'Privilege escalation prevention', description: 'Ensure that an administrator creating a custom role or assigning roles cannot grant permissions that exceed their own current permission set.' },
          { name: 'Last-admin invariant protection', description: 'Block role demotion, deactivation or workspace departure for the sole remaining active super-admin until another member is promoted.' },
        ],
        workflow: [
          { name: 'Define built-in roles and the permission matrix', description: 'Establish default roles such as Owner, Admin, Editor and Viewer alongside the exact atomic actions each role permits.' },
          { name: 'Validate dependencies when creating custom roles', description: 'Require prerequisite permissions (such as auto-selecting read access when write access is checked) and verify the creator holds every selected permission.' },
          { name: 'Assign member roles with atomic last-admin checks', description: 'Verify inside a transaction or lock that at least one active super-admin remains whenever a role is changed or revoked.' },
          { name: 'Propagate permission revocations to active sessions', description: 'Refresh permission claims or invalidate cached tokens when roles shrink, and show clear guidance when an action is denied.' },
        ],
        pitfalls: [
          { name: 'Hiding UI buttons without enforcing server-side permission checks', description: 'Client-side menu hiding is only a convenience; every mutating API endpoint must independently verify atomic permissions.' },
          { name: 'Allowing two admins to demote each other concurrently', description: 'Checking admin count outside a transactional lock allows race conditions that leave an organization with zero administrators.' },
          { name: 'Deleting a custom role while members are still assigned to it', description: 'Removing an active role without migrating its holders first can leave accounts with broken or empty access states.' },
        ],
        questions: [
          'Beyond built-in roles, can organizations create custom roles by picking individual permissions?',
          'Are roles assigned only at the organization level, or can members hold different roles per workspace or project?',
          'When a member has multiple roles, are permissions combined additively or can a role explicitly deny actions?',
          'What happens to assigned members when a custom role is edited or deleted?',
          'How quickly do role reductions take effect for already issued access tokens and open browser sessions?',
        ],
        example: 'Example: a platform might ship with Owner, Admin, Billing and Viewer roles, allow only Owners to create custom roles, and block any attempt to demote the last active Owner both in the UI and inside a database transaction. Confirm role granularity and token refresh timing for the target service first.',
        relatedDesigns: [
          { id: 'mixed-state-checkbox-group', reason: 'A reference for selecting all or part of a permission category with an indeterminate parent checkbox. Server-side authorization checks must still be implemented separately.' },
          { id: 'inline-delete-confirmation', reason: 'A reference for confirming role deletion or admin removal inline while showing affected member counts. Transactional last-admin protection must be enforced on the backend.' },
        ],
        promptSnippet: 'Help design role-based access control (RBAC), custom role configuration and last-admin protection. First confirm built-in versus custom roles, organization versus workspace scope, multi-role combination rules, migration steps when deleting a role in use, and how quickly permission revocations affect active sessions. Do not assume undecided rules.\nBased on the answers, describe:\n1. Atomic permission definitions and how built-in and custom roles map to them.\n2. Prerequisite permission rules and guards against delegating higher privileges than the actor holds.\n3. Concurrency-safe invariants that prevent removing or demoting the last active super-admin.\n4. Member migration when roles change or are deleted, plus token/cache invalidation behavior.\n5. How role directories, permission matrix editors and member assignment views connect.\nDo not treat hidden UI controls as real access enforcement, and do not mistake example policies or design demos for production authorization logic.',
      },
    },
    sources: [
      { title: 'OWASP Cheat Sheet Series — Authorization Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html' },
      { title: 'NIST CSRC — Role Based Access Control (RBAC)', url: 'https://csrc.nist.gov/projects/role-based-access-control' },
    ],
  },
  {
    id: 'security-api-key-webhook-and-secret-rotation',
    aliases: {
      ko: ['API 키 발급 관리', '시크릿 로테이션', '웹훅 서명 시크릿 교체', 'API 토큰 폐기', '키 교체 유예 기간'],
      en: ['API key management', 'secret rotation', 'webhook signing secret rotation', 'dual-valid key window', 'API token revocation'],
    },
    useCases: {
      ko: [
        '발급 직후 원문을 한 번만 보여주고 이후에는 접두사와 마스킹 정보만 표시할 때',
        '서비스 중단 없이 API 키나 웹훅 서명 시크릿을 교체하기 위해 구버전·신버전 동시 유효 구간을 둘 때',
        '유출이 의심되는 키를 유예 기간 없이 즉시 폐기하고 호출을 차단할 때',
        '키별 권한 범위(Scope), 만료일, 마지막 호출 시각을 관리 화면에 표시할 때',
      ],
      en: [
        'Showing a newly generated secret once and storing only a hash plus an identifiable prefix afterward',
        'Rotating API keys or webhook signing secrets without downtime using a dual-valid overlap window',
        'Revoking a compromised key immediately without a grace window',
        'Tracking per-key scopes, expiration timestamps and last-used telemetry in a management console',
      ],
    },
    keywords: {
      ko: ['API 키', '시크릿 로테이션', '웹훅 시크릿', '무중단 키 교체', '키 폐기', '토큰 만료', '일회성 표시', '접두사 식별', '서명 검증'],
      en: ['api key', 'secret rotation', 'webhook secret', 'dual-valid window', 'key revocation', 'token expiration', 'show once secret', 'key prefix', 'hmac verification'],
    },
    text: {
      ko: {
        domain: '권한·보안·감사',
        title: 'API 키·웹훅 시크릿 발급·교체 유예(Dual-valid)와 폐기 즉시 차단',
        summary: '시크릿 원문은 생성 시 1회만 노출하고, 정기 교체 시에는 구·신 키 동시 유효 기간을 두며, 유출 시에는 즉시 폐기를 구분합니다.',
        overview: '외부 연동용 API 키나 웹훅 서명용 시크릿은 한 번 발급되면 고객사 서버 환경변수에 배포되어 운영됩니다. 키를 교체하는 순간 기존 키를 바로 무효화하면 고객사가 배포를 마치는 동안 연동 장애가 발생합니다. 반대로 키가 외부에 노출된 비상 상황에서는 유예 기간 없이 즉시 차단해야 합니다. 아래 개념은 키 수명주기 설계를 위한 참고이며 특정 암호화 알고리즘을 고정하지 않습니다.',
        concepts: [
          { name: '생성 시 1회 노출과 식별용 접두사(Prefix)', description: '발급 직후에만 전체 시크릿을 복사할 수 있게 보여주고 서버에는 해시값만 저장합니다. 목록에서는 어떤 키인지 구분할 수 있도록 환경·유형 접두사와 끝 몇 자리만 표시합니다.' },
          { name: '무중단 교체를 위한 동시 유효 구간(Dual-valid Window)', description: '키 교체(Roll/Rotate)를 실행하면 새 시크릿을 발급하되, 지정한 유예 시간 동안은 이전 시크릿과 새 시크릿을 모두 유효하게 인정하고 웹훅 서명도 두 키로 함께 전달합니다.' },
          { name: '교체 유예 만료와 비상 즉시 폐기(Instant Revoke) 분리', description: '정상적인 정기 교체는 유예 기간 후 구버전 키가 자동 만료되게 하고, 유출 대응을 위한 폐기(Revoke) 또는 유예 조기 종료는 누르는 즉시 구버전 키를 차단합니다.' },
          { name: '키별 권한 범위·만료일과 마지막 사용 시각', description: '각 키에 필요한 최소 권한과 선택적 만료일을 지정하고, 마지막 호출 시각을 기록해 오랫동안 쓰지 않는 유휴 키나 구버전 키 호출 여부를 파악할 수 있게 합니다.' },
        ],
        workflow: [
          { name: '이름·권한 범위·만료일 지정 후 시크릿 발급하기', description: '키 용도와 허용 권한, 만료일을 입력받아 시크릿을 생성하고, 화면을 닫으면 다시 볼 수 없다는 안내와 함께 복사 기능을 제공합니다.' },
          { name: '유예 시간을 선택해 무중단 키 교체 시작하기', description: '기존 키에서 교체를 누르면 즉시 폐기 또는 유예 시간(예: 1시간, 24시간) 중 선택하게 하고, 동시 유효 상태와 구버전 만료 예정 시각을 표시합니다.' },
          { name: '동시 유효 구간 동안 구버전 호출 감지 및 전환 완료하기', description: '고객사가 새 키를 배포한 뒤 구버전 키 호출이 없는 것을 확인하면 유예 만료 전이라도 구버전 키를 수동으로 즉시 만료시킬 수 있게 합니다.' },
          { name: '유출 키 즉시 폐기 및 실패 응답 구분하기', description: '즉시 폐기된 키나 만료된 키로 요청이 들어오면 즉시 거부하고, 감사 로그에 어떤 식별자의 키가 차단되었는지 남깁니다.' },
        ],
        pitfalls: [
          { name: '생성된 API 키 원문을 평문으로 저장해 언제든 다시 조회하게 하기', description: '관리 화면에서 기존 시크릿 전체를 다시 볼 수 있으면 계정 탈취나 내부자 조회 시 모든 연동 키가 그대로 유출됩니다.' },
          { name: '웹훅 시크릿 교체 시 단일 서명만 보내 수신 측 검증을 깨뜨리기', description: '유예 기간 동안 웹훅 헤더에 신버전 서명만 보내면 아직 새 시크릿을 배포하지 못한 수신 서버가 모든 웹훅을 위조로 판단해 거부합니다.' },
          { name: '키가 속한 관리자 계정이 비활성화될 때 서비스 공용 키까지 예고 없이 중단하기', description: '개인용 토큰과 조직 단위 서비스 계정의 API 키를 구분하지 않으면 담당자 퇴사 시 운영 중인 서버 연동이 갑자기 멈출 수 있습니다.' },
        ],
        questions: [
          'API 키는 조직 단위의 서비스 키로 발급되나요, 개별 사용자 계정에 귀속되나요?',
          '키 교체(Rotate) 시 구버전과 신버전이 함께 동작하는 유예 시간 옵션을 어떻게 제공하나요?',
          '웹훅 시크릿 교체 유예 구간 동안 요청 헤더에 이전 서명과 새 서명을 어떤 형식으로 함께 전달하나요?',
          '발급 가능한 활성 키 개수 한도와 기본 만료일 정책은 어떻게 정하나요?',
          '만료 임박 키나 구버전 유예 키로 계속 요청이 들어올 때 누구에게 어떤 알림을 보내나요?',
        ],
        example: '예시: API 키 생성 시 `live_...` 접두사를 붙이고 원문은 1회만 표시하며, 키 교체 시 즉시·1시간·24시간·7일 유예 중 선택할 수 있고, 웹훅은 유예 기간 동안 두 서명을 함께 전송하는 방식을 생각할 수 있습니다. 실제 유예 시간 옵션과 서명 헤더 규격은 서비스에 맞게 먼저 확인해야 합니다.',
        relatedDesigns: [
          { id: 'inline-delete-confirmation', reason: 'API 키 즉시 폐기나 유예 중인 구버전 키의 조기 만료를 실행할 때 실수로 운영 연동을 끊지 않도록 인라인 재확인을 거치는 표현에 참고할 수 있습니다.' },
          { id: 'dismissible-inline-banner', reason: '신규 발급된 시크릿 원문을 화면을 떠나기 전에 복사하라고 강조하거나, 현재 교체 유예 기간이 진행 중임을 안내하는 배너 표현에 참고할 수 있습니다.' },
        ],
        promptSnippet: '외부 연동용 API 키와 웹훅 서명 시크릿의 발급·무중단 교체(Dual-valid)·즉시 폐기 흐름을 설계해 줘. 먼저 키의 귀속 단위(조직 서비스 키 vs 개인 토큰), 생성 시 1회 노출 및 접두사 규칙, 교체 유예 기간 옵션, 웹훅 복수 서명 전달 방식, 비상시 즉시 폐기 조건을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 활성·교체 유예 중(구/신 동시 유효)·만료·즉시 폐기 상태별 검증 동작.\n2. 시크릿 원문 1회 노출, 해시 저장, 목록에서의 접두사·마지막 사용 시각 표시 규칙.\n3. API 키 및 웹훅 시크릿 교체 유예 시작, 구버전 호출 확인, 조기 만료 확정 흐름.\n4. 키 유출 시 유예 없는 즉시 폐기와 만료/폐기 키 호출 시 응답 및 로그 기록.\n5. 키 목록, 신규 발급 모달/패널, 교체 유예 설정, 즉시 폐기 확인 화면의 연결.\n시크릿 원문을 서버에 평문 저장해 재조회하는 방식을 가정하지 말고, 예시 정책과 디자인 데모를 실제 암호화·서명 검증 구현으로 간주하지 말아 줘.',
      },
      en: {
        domain: 'Permissions, Security & Audit',
        title: 'API key and webhook secret issuance, dual-valid rotation windows and instant revocation',
        summary: 'Reveal raw secrets only once at creation, support zero-downtime rotation with dual-valid overlap windows, and allow instant revocation on compromise.',
        overview: 'API keys and webhook signing secrets live inside external production servers. If rotating a key invalidates the old value immediately, integrations break while engineers deploy the new environment variable. Conversely, if a key is leaked, waiting for a grace window is unsafe. Separate planned rotation with an overlap window from emergency instant revocation. These concepts are design references, not a mandate for a specific cryptographic algorithm.',
        concepts: [
          { name: 'Show-once secret creation and identifiable prefixes', description: 'Display the full secret only immediately after creation, store a one-way hash on the server, and show a prefix plus last characters in the dashboard so teams can identify which key is which.' },
          { name: 'Dual-valid overlap window for zero-downtime rotation', description: 'When rotating a key or webhook secret, issue the new secret while keeping the previous secret valid until a chosen grace timestamp expires.' },
          { name: 'Scheduled expiry versus emergency instant revocation', description: 'Let planned rotations expire the old secret automatically after the overlap window, while providing an explicit revoke action that cuts off a leaked secret immediately.' },
          { name: 'Scoped permissions, expiration dates and last-used telemetry', description: 'Bind each key to minimal scopes and optional expiration dates, and record last-used timestamps so teams can verify traffic has shifted off an expiring key.' },
        ],
        workflow: [
          { name: 'Issue a scoped secret with one-time copy guidance', description: 'Collect key name, allowed scopes and expiration date, generate the secret, and warn the user to copy it before closing the view.' },
          { name: 'Start key rotation with a selectable overlap window', description: 'Let the operator rotate a key immediately or pick a grace period (such as 1 hour or 24 hours), displaying when the old secret will stop working.' },
          { name: 'Verify traffic migration and allow early expiration', description: 'Show whether the expiring secret is still receiving requests and let operators expire the old secret early once deployment finishes.' },
          { name: 'Revoke compromised keys immediately and log rejected calls', description: 'Provide a distinct emergency revoke action that invalidates the key at once and records rejected attempts in the audit log.' },
        ],
        pitfalls: [
          { name: 'Storing raw API keys in plaintext so they can be viewed again later', description: 'Allowing full secret retrieval after creation turns any dashboard compromise into a full breach of customer integrations.' },
          { name: 'Sending only the new webhook signature during a rotation window', description: 'If webhook deliveries stop including the old signature before the receiver deploys the new secret, webhook verification will fail across the overlap window.' },
          { name: 'Tying production organization keys directly to a single employee account', description: 'If deactivating a departing employee automatically kills organization-wide integration keys, production traffic can fail unexpectedly.' },
        ],
        questions: [
          'Are API keys owned by the organization/service account or tied to individual user profiles?',
          'Which overlap window durations are offered when rotating an API key or webhook secret?',
          'During webhook secret rotation, how are both old and new signatures formatted in the delivery headers?',
          'What are the maximum active key limits and default expiration rules?',
          'Who gets notified when an expiring key is still actively used near its cutoff time?',
        ],
        example: 'Example: a service could prefix live keys with `live_`, display the raw value only once, offer immediate, 1-hour, 24-hour or 7-day rotation windows, and send dual HMAC signatures in webhook headers until the window closes. Confirm exact header formats and grace options for the target API.',
        relatedDesigns: [
          { id: 'inline-delete-confirmation', reason: 'A reference for inline confirmation before immediately revoking an active key or ending a rotation grace window early.' },
          { id: 'dismissible-inline-banner', reason: 'A reference for prominent copy-once warnings upon secret creation or status banners showing an active rotation overlap window.' },
        ],
        promptSnippet: 'Help design API key and webhook signing secret issuance, zero-downtime rotation and instant revocation. First confirm key ownership (organization service key vs personal token), show-once and prefix rules, rotation overlap window options, dual-signature webhook delivery format, and emergency revocation behavior. Do not assume undecided rules.\nBased on the answers, describe:\n1. Validation rules across active, rotating (dual-valid), expired and revoked states.\n2. Show-once display, hashed storage, prefix masking and last-used tracking.\n3. Starting a rotation window, monitoring calls to the old secret and expiring the old secret early.\n4. Instant revocation for leaked secrets and error/audit handling for rejected calls.\n5. How the key list, creation view, rotation configuration and revoke confirmation connect.\nDo not store or re-display plaintext secrets after creation, and do not mistake example policies or design demos for real cryptographic verification.',
      },
    },
    sources: [
      { title: 'Stripe Docs — Rolling API Keys', url: 'https://docs.stripe.com/keys#rolling-keys' },
      { title: 'OWASP Cheat Sheet Series — Secrets Management Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html' },
    ],
  },
  {
    id: 'security-audit-log-retention-and-tamper-evidence',
    aliases: {
      ko: ['보안 감사 로그', '운영 감사 추적', '민감정보 마스킹 로그', '감사 로그 보관 정책', '위변조 방지 로그'],
      en: ['security audit log', 'audit trail retention', 'sensitive field redaction', 'tamper-evident logging', 'operational audit events'],
    },
    useCases: {
      ko: [
        '누가 언제 어떤 리소스를 어떻게 바꿨는지 표준화된 감사 이벤트 스키마를 설계할 때',
        '로그에 비밀번호·토큰·개인식별정보가 평문으로 남지 않도록 마스킹 규칙을 정할 때',
        '일반 관리자의 로그 삭제·수정을 차단하고 전용 열람 권한으로만 조회·내보내기를 허용할 때',
        '온라인 즉시 조회 기간과 장기 보관·만료 파기 주기를 분리할 때',
      ],
      en: [
        'Designing a standardized audit event schema capturing actor, action, target, context and outcome',
        'Redacting secrets, tokens and sensitive personal fields before writing audit records',
        'Preventing administrators from editing or deleting audit trails while scoping read and export access',
        'Separating hot searchable retention windows from cold archival and scheduled purge rules',
      ],
    },
    keywords: {
      ko: ['감사 로그', '보안 감사', '로그 마스킹', '추가 전용 로그', '위변조 방지', '보관 주기', '행위자 추적', '로그 내보내기', '비대칭 권한'],
      en: ['audit log', 'audit trail', 'log redaction', 'append-only log', 'tamper evidence', 'retention policy', 'actor tracking', 'log export', 'security events'],
    },
    text: {
      ko: {
        domain: '권한·보안·감사',
        title: '운영·보안 감사 로그 기록 대상·민감값 마스킹과 조회·보관 정책',
        summary: '행위자·행동·대상·결과를 추가 전용(Append-only)으로 기록하고 민감값을 마스킹하며 조회 권한과 보관 주기를 분리합니다.',
        overview: '보안 사고 조사나 엔터프라이즈 고객의 규정 준수 확인에서는 애플리케이션 디버그 로그만으로는 부족합니다. 누가(대리 접속 여부 포함), 어디서(IP·기기), 무엇을 시도해 성공 또는 실패했는지 일관된 구조로 남아야 하며, 관리자라도 이미 기록된 감사 로그를 임의로 고치거나 지울 수 없어야 합니다. 아래 개념은 감사 로그 설계를 위한 참고이며 특정 법적 보관 기간을 기본값으로 정하지 않습니다.',
        concepts: [
          { name: '표준 감사 이벤트 스키마(Actor·Action·Target·Context·Result)', description: '수행 주체(사용자·API 키·시스템·대리 수행자), 행동 유형, 대상 리소스 식별자, 요청 맥락(시각·IP·User-Agent), 성공/실패 사유를 고정 필드로 기록합니다.' },
          { name: '추가 전용(Append-only) 기록과 위변조 방지', description: '감사 로그는 생성만 허용하고 수정·삭제 API를 제공하지 않습니다. 필요 시 해시 체인이나 분리된 저장소 권한으로 사후 변조 여부를 검증할 수 있게 합니다.' },
          { name: '기록 전 민감 필드 마스킹(Redaction)', description: '비밀번호, API 시크릿, 결제 수단 번호, 민감 개인정보는 감사 로그 저장 전에 마스킹하거나 변경 여부만 기록해 로그 자체가 유출 경로가 되지 않게 합니다.' },
          { name: '열람 권한 분리와 온라인 조회·장기 보관 주기', description: '일반 설정 권한과 감사 로그 조회·내보내기 권한을 분리하고, 화면에서 즉시 검색 가능한 기간과 아카이브 보관·파기 시점을 구분합니다.' },
        ],
        workflow: [
          { name: '필수 기록 대상 이벤트와 스키마 정의하기', description: '로그인·권한 변경·키 발급·대량 데이터 내보내기·보안 정책 수정 등 반드시 남겨야 할 이벤트 목록과 공통 필드를 정의합니다.' },
          { name: '전후 값 비교 시 민감 필드 마스킹 처리하기', description: '설정 변경 전후 값을 기록할 때 허용 목록 외의 민감 필드는 `***`로 가리고, 대리 접속(Impersonation) 중이면 실제 작업자와 대상 계정을 함께 남깁니다.' },
          { name: '기간·행위자·이벤트 유형별 필터 조회 제공하기', description: '감사 담당자가 날짜 범위, 행위자, 대상 리소스, 성공/실패 여부로 로그를 좁혀 보고 상세 맥락을 펼쳐 볼 수 있게 합니다.' },
          { name: '대량 내보내기와 보관 만료 처리 실행하기', description: '외부 분석이나 보관을 위한 CSV/JSON 내보내기 자체도 감사 이벤트로 기록하고, 약정된 보관 기간이 지난 로그는 정책에 따라 아카이브 또는 파기합니다.' },
        ],
        pitfalls: [
          { name: '실패한 보안 시도나 권한 거부 요청을 로그에서 누락하기', description: '성공한 작업만 기록하면 무차별 대입 공격이나 비인가 접근 시도를 추적할 수 없으므로 중요한 인증·인가 실패도 함께 기록해야 합니다.' },
          { name: '변경 상세에 토큰이나 비밀번호 원문을 그대로 직렬화해 저장하기', description: '요청 본문 전체를 그대로 덤프하면 감사 로그 열람 권한을 가진 사람에게 시크릿이 그대로 노출됩니다.' },
          { name: '탈퇴하거나 삭제된 사용자의 로그에서 행위자 정보를 함께 날리기', description: '외래 키 연쇄 삭제로 로그가 사라지거나 행위자를 전혀 식별할 수 없게 되면 사후 감사가 불가능하므로 불변 식별자나 스냅샷을 남겨야 합니다.' },
        ],
        questions: [
          '어떤 카테고리의 이벤트(인증, 권한 변경, 데이터 내보내기, 과금 설정 등)를 감사 로그 필수 기록 대상으로 포함하나요?',
          '변경 전후 값을 기록할 때 마스킹하거나 값 대신 변경 여부만 남겨야 하는 민감 필드는 무엇인가요?',
          '고객사 관리자 중 어떤 역할만 감사 로그를 열람하거나 파일로 내보낼 수 있나요?',
          '관리 화면에서 즉시 검색 가능한 기간과 전체 보관 기간은 각각 얼마로 설정하나요?',
          '운영자의 대리 접속(Impersonation)이나 자동화 작업으로 발생한 이벤트는 행위자를 어떻게 표시하나요?',
        ],
        example: '예시: 인증·권한·API 키·데이터 내보내기 이벤트를 수정 불가능한 저장소에 기록하고, 시크릿 필드는 마스킹하며, 화면에서는 최근 90일간 필터 조회와 CSV 내보내기를 지원하고 내보내기 실행 자체도 감사 로그에 남기는 방식을 생각할 수 있습니다. 실제 보관 기간과 기록 대상은 서비스의 규정 준수 요건에 맞게 먼저 확인해야 합니다.',
        relatedDesigns: [
          { id: 'ly-expandable-data-rows', reason: '감사 로그 목록에서 시각·행위자·이벤트 요약만 먼저 보여주고, 행을 펼쳤을 때 IP·기기 정보·마스킹된 상세 메타데이터를 확인하는 구조에 참고할 수 있습니다.' },
          { id: 'faceted-filter-chips', reason: '이벤트 종류, 결과(성공/실패), 행위자 유형 등 여러 필터 조건을 조합해 감사 로그를 좁혀 보는 UI 표현에 참고할 수 있습니다.' },
        ],
        promptSnippet: '운영·보안 감사 로그의 기록 스키마, 민감정보 마스킹, 조회·내보내기 권한과 보관 주기를 설계해 줘. 먼저 필수 기록 이벤트 범위, 마스킹할 민감 필드, 대리 접속·시스템 작업의 행위자 표기 방식, 열람 및 내보내기 허용 역할, 온라인 조회 기간과 장기 보관 정책을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 행위자(실제 수행자·대리 대상)·행동·대상·맥락·결과를 포함하는 표준 이벤트 스키마.\n2. 저장 전 민감 필드 마스킹 규칙과 수정·삭제를 차단하는 추가 전용(Append-only) 보장 방식.\n3. 계정 삭제 후에도 감사 추적성을 유지하는 식별자 보존 규칙.\n4. 날짜·행위자·이벤트 유형 필터 조회, 상세 열람, 감사 로그 내보내기 기록 흐름.\n5. 감사 로그 검색 목록, 행 확장 상세 보기, 내보내기 및 보관 안내 화면의 연결.\n일반 애플리케이션 디버그 로그를 보안 감사 로그와 동일시하지 말고, 예시 정책과 디자인 데모를 실제 위변조 방지 저장소 구현으로 간주하지 말아 줘.',
      },
      en: {
        domain: 'Permissions, Security & Audit',
        title: 'Security audit log events, sensitive-field redaction and retention controls',
        summary: 'Record actor, action, target and outcome in append-only storage, redact sensitive values before write, and separate viewing permissions from retention tiers.',
        overview: 'Security investigations and enterprise compliance checks require more than ephemeral application logs. Teams need structured, immutable records showing who performed an action (including impersonation context), from where, on which resource, and whether it succeeded or failed—without leaking raw secrets into the log itself. These concepts are design references, not a fixed legal retention schedule.',
        concepts: [
          { name: 'Standardized event schema (Actor, Action, Target, Context, Outcome)', description: 'Capture the actor (user, API key, system job or impersonating operator), action name, target resource identifier, request metadata (timestamp, IP, user agent) and success or failure reason.' },
          { name: 'Append-only storage and tamper evidence', description: 'Disallow update and delete operations on audit records, and optionally chain hashes or isolate storage permissions so post-hoc tampering is detectable.' },
          { name: 'Pre-write sensitive field redaction', description: 'Strip or mask passwords, API secrets, payment details and regulated personal data before persisting audit payloads so logs do not become a secondary leak.' },
          { name: 'Scoped audit access and tiered retention', description: 'Separate audit-read and export permissions from general admin roles, and distinguish hot searchable retention windows from archival storage and scheduled purging.' },
        ],
        workflow: [
          { name: 'Define mandatory security and operational events', description: 'List events that must always be recorded, including sign-in attempts, role changes, key issuance, bulk exports and security policy edits.' },
          { name: 'Redact sensitive payloads and preserve impersonation context', description: 'Mask non-allowlisted fields in before/after diffs and record both the acting support operator and the impersonated account when applicable.' },
          { name: 'Provide filtered search and expandable event inspection', description: 'Let authorized auditors filter by time range, actor, event type, target resource and outcome, then inspect structured metadata per event.' },
          { name: 'Log audit exports and enforce retention lifecycle rules', description: 'Record any CSV/JSON audit export as an audit event itself, and transition aged records to cold archive or purge according to policy.' },
        ],
        pitfalls: [
          { name: 'Logging only successful actions and ignoring denied attempts', description: 'Omitting failed authentication or authorization checks blinds security teams to brute-force attacks and privilege-probing attempts.' },
          { name: 'Dumping raw request bodies containing secrets into audit metadata', description: 'Serializing unredacted payloads exposes credentials and tokens to anyone granted read access to the audit console.' },
          { name: 'Cascade-deleting audit records when a user account is deleted', description: 'Using foreign-key cascades that wipe historical logs upon account deletion destroys the audit trail; keep immutable actor snapshots or IDs instead.' },
        ],
        questions: [
          'Which event categories (authentication, permissions, API keys, data exports, billing changes) must be captured in the audit log?',
          'Which fields must be masked or recorded only as changed-field names without raw values?',
          'Which roles are allowed to view audit logs or export them to external files?',
          'How long are logs searchable in the UI versus retained in archival storage?',
          'How should events triggered by support impersonation or automated system jobs identify the actor?',
        ],
        example: 'Example: a service might record auth, permission, key and export events in an append-only table, mask secret fields before storage, provide 90-day searchable UI access with CSV export for Security Admins, and log every export action itself. Confirm exact retention windows and compliance requirements before implementation.',
        relatedDesigns: [
          { id: 'ly-expandable-data-rows', reason: 'A reference for showing high-level timestamp, actor and action summaries in a table row while expanding to inspect IP, user agent and redacted metadata.' },
          { id: 'faceted-filter-chips', reason: 'A reference for combining active filters across event category, outcome and actor type when investigating an audit trail.' },
        ],
        promptSnippet: 'Help design a security and operational audit logging system with sensitive-field redaction and retention controls. First confirm required event categories, fields that must be redacted, actor representation for impersonation and system jobs, roles permitted to view or export logs, and searchable versus archival retention windows. Do not assume undecided rules.\nBased on the answers, describe:\n1. The standardized event schema covering actor, action, target, request context and outcome.\n2. Pre-write redaction rules and append-only storage constraints that block edits or deletions.\n3. Actor identifier preservation when user accounts or resources are later deleted.\n4. Filtering, detail inspection, audit-log export tracking and retention lifecycle transitions.\n5. How the filterable log table, expandable detail view and export controls connect.\nDo not treat general application debug logs as a security audit trail, and do not mistake example policies or design demos for tamper-evident storage implementation.',
      },
    },
    sources: [
      { title: 'OWASP Cheat Sheet Series — Logging Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html' },
      { title: 'NIST SP 800-92 — Guide to Computer Security Log Management', url: 'https://csrc.nist.gov/pubs/sp/800/92/final' },
    ],
  },
  {
    id: 'security-approval-maker-checker-and-breakglass',
    aliases: {
      ko: ['2인 승인 체계', 'Maker-Checker 승인', '고위험 작업 교차 승인', '긴급 권한 사용', 'Break-glass 절차'],
      en: ['maker-checker approval', 'dual-control workflow', 'four-eyes principle', 'break-glass emergency access', 'high-risk action approval'],
    },
    useCases: {
      ko: [
        '대량 삭제·권한 승격·보안 설정 해제 같은 고위험 작업을 요청자 혼자 즉시 실행하지 못하게 막을 때',
        '요청자(Maker)와 승인자(Checker)를 반드시 다른 사람으로 강제하고 승인 대기 만료 시간을 둘 때',
        '승인 시점에 대상 리소스 상태가 이미 바뀌었는지 재검증해 오래된 요청 실행을 막을 때',
        '장애 대응 등 비상 상황에서 사유를 남기고 한시적 긴급 권한(Break-glass)을 부여·회수할 때',
      ],
      en: [
        'Requiring a second authorized person to approve destructive or high-risk administrative actions',
        'Enforcing separation of duties between the requester (maker) and the approver (checker) with request expiry',
        'Re-validating target resource state at execution time so stale approval requests cannot overwrite newer changes',
        'Granting time-bounded emergency break-glass access with mandatory justification and post-incident review',
      ],
    },
    keywords: {
      ko: ['2인 승인', 'Maker-Checker', '직무 분리', '교차 승인', '승인 만료', '긴급 권한', 'Break-glass', '고위험 작업', '사후 감사'],
      en: ['maker-checker', 'dual control', 'four-eyes principle', 'separation of duties', 'approval expiration', 'break-glass access', 'emergency privilege', 'high-risk action', 'post-incident review'],
    },
    text: {
      ko: {
        domain: '권한·보안·감사',
        title: '고위험 작업 2인 승인(Maker-Checker)·승인 만료와 긴급 권한 사용 기록',
        summary: '고위험 작업은 요청자와 승인자를 분리해 실행 전 상태를 검증하고, 비상 긴급 권한은 사유 기록·자동 만료·사후 검토를 강제합니다.',
        overview: '단 한 명의 관리자 실수나 계정 탈취로 전체 데이터 삭제, 정산 계좌 변경, 보안 정책 해제가 즉시 실행되면 피해를 되돌리기 어렵습니다. 중요한 작업은 요청자(Maker)가 변경안을 등록하고 다른 승인자(Checker)가 검토 후 실행하게 하며, 야간 장애 등 2인 승인을 기다릴 수 없는 비상시를 대비한 긴급 절차(Break-glass)와 자동 회수 규칙도 함께 설계해야 합니다. 아래 개념은 내부 통제 흐름을 위한 참고이며 특정 금융·보안 규제를 기본값으로 가정하지 않습니다.',
        concepts: [
          { name: '요청자(Maker)와 승인자(Checker) 분리', description: '고위험 작업은 즉시 반영하는 대신 승인 대기 요청으로 저장하고, 요청을 만든 본인이나 권한이 없는 계정은 승인할 수 없도록 차단합니다.' },
          { name: '승인 대기 만료(TTL)와 실행 시점 정합성 검증', description: '오래 방치된 요청이 뒤늦게 실행되지 않도록 유효 시간을 두고, 승인 확정 시점에 대상 리소스의 버전이나 전제 조건이 요청 당시와 같은지 다시 확인합니다.' },
          { name: '긴급 권한(Break-glass) 발동과 시간 제한', description: '비상 상황에서만 사용할 수 있는 긴급 절차를 별도로 두고, 장애 티켓 번호나 사유 입력을 강제하며 짧은 유효 시간이 지나면 권한을 자동 회수합니다.' },
          { name: '즉시 경보 발송과 사후 검토(Post-incident Review)', description: '긴급 권한이 발동되거나 고위험 작업이 승인·반려되면 보안 채널로 즉시 알림을 보내고, 긴급 권한 동안 수행한 모든 행동을 묶어 사후 검토 상태로 남깁니다.' },
        ],
        workflow: [
          { name: '고위험 작업 인터셉트 및 승인 요청 생성하기', description: '대상 작업을 실행하려 할 때 변경 내용 요약과 요청 사유를 입력받아 승인 대기 상태로 등록하고 승인권자에게 알림을 보냅니다.' },
          { name: '교차 검토 후 승인·반려 또는 요청 철회하기', description: '요청자가 아닌 다른 승인권자가 변경 전후 차이와 영향을 확인해 승인 또는 사유와 함께 반려하며, 요청자는 승인 전에 직접 철회할 수 있습니다.' },
          { name: '실행 시점 상태 재확인 및 결과 기록하기', description: '승인이 완료되면 대상 리소스가 그사이 변경되지 않았는지 확인해 작업을 실행하고, 충돌이 있으면 실패 사유를 안내합니다.' },
          { name: '긴급 권한 발동·자동 만료 및 사후 감사 마감하기', description: '비상시 사유를 기록하고 한시적 접근을 허용한 뒤, 만료 시각에 세션을 종료하고 수행 내역에 대한 사후 검토 확인을 받습니다.' },
        ],
        pitfalls: [
          { name: '요청자가 다른 세션을 열거나 역할을 바꿔 자기 요청을 스스로 승인하기', description: '계정 식별자 기준으로 요청자와 승인자가 동일 인물인지 서버에서 검증하지 않으면 2인 통제가 무력화됩니다.' },
          { name: '요청 생성 시점에만 조건을 검사하고 며칠 뒤 승인 시점에는 그대로 덮어쓰기', description: '대기 중에 다른 정상 변경이 반영되었는데도 예전 페이로드를 그대로 덮어쓰면 데이터가 손상될 수 있습니다.' },
          { name: '비상용 긴급 권한을 부여한 뒤 수동 회수에만 의존하기', description: '장애 대응이 끝난 뒤 권한 회수를 잊으면 과도한 권한이 상시 유지되므로 서버 타이머에 의한 자동 만료가 필수입니다.' },
        ],
        questions: [
          '어떤 작업들(대량 삭제, 보안 정책 완화, 정산 정보 변경 등)에 2인 승인(Maker-Checker)을 적용하나요?',
          '승인 대기 요청의 유효 시간(TTL)은 얼마이며, 승인 후 즉시 자동 실행되나요 아니면 요청자가 최종 실행 버튼을 누르나요?',
          '조직 내에 승인 가능한 관리자가 1명뿐인 소규모 팀에서는 2인 승인 규칙을 어떻게 예외 처리하나요?',
          '비상시 긴급 권한(Break-glass)은 누가 발동할 수 있으며, 최대 지속 시간과 필수 입력 정보는 무엇인가요?',
          '긴급 권한 사용 후 사후 검토(Post-incident review)는 누가 언제까지 완료해야 하나요?',
        ],
        example: '예시: 보안 정책 비활성화와 대량 데이터 삭제는 다른 최고관리자의 24시간 내 승인을 요구하고, 비상 장애 시에는 사유와 티켓 번호를 입력해 1시간 동안만 유효한 긴급 권한을 얻되 전 관리자에게 즉시 경보를 보내는 방식을 생각할 수 있습니다. 실제 대상 작업과 만료 시간은 조직 규모에 맞게 먼저 확인해야 합니다.',
        relatedDesigns: [
          { id: 'ly-context-code-diff', reason: '승인권자(Checker)가 요청된 설정 변경이나 권한 수정의 변경 전후 차이를 한눈에 비교하며 검토하는 화면에 참고할 수 있습니다.' },
          { id: 'ly-activity-timeline', reason: '요청 생성, 검토 코멘트, 승인/반려, 실행 완료 또는 긴급 권한 발동·만료로 이어지는 시간순 이력을 표시할 때 참고할 수 있습니다.' },
        ],
        promptSnippet: '고위험 관리자 작업의 2인 승인(Maker-Checker)과 비상 긴급 권한(Break-glass) 흐름을 설계해 줘. 먼저 2인 승인 적용 대상 작업, 요청자·승인자 분리 조건, 승인 대기 유효 시간과 실행 시점 충돌 검사 방식, 소규모 조직 예외 여부, 긴급 권한의 최대 지속 시간과 사후 검토 절차를 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 승인 대기·승인 완료·반려·철회·만료·실행 실패(상태 충돌) 상태 전이 규칙.\n2. 자기 승인 차단 및 승인 확정 시점의 대상 리소스 버전·조건 재검증 방식.\n3. 긴급 권한(Break-glass) 발동 요건, 즉시 경보 발송, 시간 만료 시 자동 회수 처리.\n4. 긴급 권한 사용 중 수행된 작업의 묶음 기록과 사후 검토 마감 흐름.\n5. 변경 요청 등록, 변경 전후 비교 검토, 승인 대기열, 긴급 권한 발동·검토 화면의 연결.\n요청 생성 시점의 검증만으로 실행 시점 안전성이 보장된다고 가정하지 말고, 예시 정책과 디자인 데모를 실제 서버 통제 구현으로 간주하지 말아 줘.',
      },
      en: {
        domain: 'Permissions, Security & Audit',
        title: 'Dual-control maker-checker approvals, request expiry and emergency access trails',
        summary: 'Separate the requester from the approver for high-risk actions, re-validate resource state on execution, and time-box emergency break-glass access with mandatory review.',
        overview: 'A single compromised admin account or human mistake should not be able to immediately wipe production resources, disable security policies or reroute payouts. Dual-control (maker-checker) workflows hold high-risk changes until a second authorized person reviews and approves them, while time-boxed break-glass procedures handle urgent incidents without leaving permanent standing privileges behind. These concepts are design references rather than a fixed regulatory rulebook.',
        concepts: [
          { name: 'Separation of duties between Maker and Checker', description: 'Capture high-risk actions as pending requests rather than executing them immediately, and block the original requester from approving their own submission.' },
          { name: 'Request expiration (TTL) and execution-time state validation', description: 'Expire unreviewed requests after a defined window, and verify at approval/execution time that the target resource version has not diverged since the request was created.' },
          { name: 'Time-boxed emergency access (Break-glass)', description: 'Provide an explicit emergency override path that requires an incident ticket or justification and automatically revokes elevated access when the timer expires.' },
          { name: 'Real-time alerting and mandatory post-incident review', description: 'Notify security channels immediately whenever break-glass access or high-risk approvals occur, and group all actions taken during emergency access for subsequent sign-off.' },
        ],
        workflow: [
          { name: 'Intercept high-risk actions and create a pending request', description: 'Capture the proposed change payload, target version and requester justification, then notify eligible approvers.' },
          { name: 'Review before/after impact and approve, reject or withdraw', description: 'Let a distinct authorized approver inspect the diff and approve or reject with a reason, while allowing the maker to withdraw pending requests.' },
          { name: 'Verify resource freshness and execute atomically', description: 'Check that preconditions and resource versions still match upon approval; apply the change or fail safely with a conflict notice.' },
          { name: 'Grant break-glass access, auto-expire and complete review', description: 'Record emergency justification, grant temporary access with a strict countdown, revoke automatically on expiry, and track post-incident review completion.' },
        ],
        pitfalls: [
          { name: 'Allowing the maker to approve their own request via another session or role', description: 'Always enforce distinct actor identities (`makerId !== checkerId`) on the server rather than relying on UI state.' },
          { name: 'Applying a stale approval payload without checking concurrent modifications', description: 'If a resource changed while the request sat in the queue, blindly applying the old snapshot can silently overwrite newer valid settings.' },
          { name: 'Relying on manual revocation after an emergency break-glass event', description: 'Responders often forget to drop elevated privileges after resolving an outage; enforce server-side TTL expiration automatically.' },
        ],
        questions: [
          'Which administrative actions require dual-control (maker-checker) approval before taking effect?',
          'How long does a pending approval request remain valid, and does approval trigger execution immediately?',
          'How is dual control handled for small workspaces that currently have only one administrator?',
          'Who can trigger emergency break-glass access, what justification is required, and when does it auto-expire?',
          'Who must review and sign off on the audit trail after a break-glass session ends?',
        ],
        example: 'Example: disabling security policies or deleting bulk data could require approval from a second Super Admin within 24 hours, while an incident responder can activate a 1-hour break-glass session by entering a ticket ID, triggering an immediate alert to all owners and creating a mandatory post-incident review item. Confirm target actions and team size constraints first.',
        relatedDesigns: [
          { id: 'ly-context-code-diff', reason: 'A reference for showing the approver a clear before-and-after diff of the proposed configuration or permission change.' },
          { id: 'ly-activity-timeline', reason: 'A reference for rendering the chronological trail of request creation, review comments, approval, execution or break-glass expiration.' },
        ],
        promptSnippet: 'Help design a dual-control (maker-checker) approval workflow and emergency break-glass access procedure. First confirm which actions require dual approval, maker-versus-checker separation rules, request TTL and execution-time conflict checks, single-admin workspace exceptions, and break-glass duration and post-incident review rules. Do not assume undecided rules.\nBased on the answers, describe:\n1. State transitions across pending, approved, rejected, withdrawn, expired and conflict-failed requests.\n2. Self-approval prevention and optimistic-concurrency checks when executing an approved change.\n3. Break-glass activation requirements, immediate security alerts and automatic TTL revocation.\n4. Grouping actions performed during break-glass access and completing post-incident sign-off.\n5. How request submission, diff review, approval queues and break-glass review screens connect.\nDo not assume preconditions checked at request creation still hold at execution time, and do not mistake example policies or design demos for server-side enforcement.',
      },
    },
    sources: [
      { title: 'NIST CSRC — Separation of Duty (SoD) Glossary', url: 'https://csrc.nist.gov/glossary/term/separation_of_duty' },
      { title: 'Google Cloud Architecture — Break-glass Access Pattern', url: 'https://cloud.google.com/IAM/docs/best-practices-for-using-anis-and-break-glass' },
    ],
  },
  {
    id: 'security-ip-allowlist-device-trust-and-session-policy',
    aliases: {
      ko: ['IP 허용 목록', '접속 IP 제한', '신뢰 기기 정책', '세션 타임아웃 정책', '관리자 자가 차단 방지'],
      en: ['IP allowlist policy', 'network access restriction', 'trusted device enforcement', 'session timeout policy', 'admin lockout prevention'],
    },
    useCases: {
      ko: [
        '특정 사무실·VPN 대역(CIDR)에서만 관리 콘솔이나 API에 접근하도록 제한할 때',
        '관리자가 현재 자신이 접속 중인 IP를 빼고 허용 목록을 저장해 스스로 잠기는 사고를 막을 때',
        '유휴 시간 만료(Idle timeout)와 최대 세션 유지 시간(Absolute timeout), 동시 접속 기기 수를 정할 때',
        '새로운 기기 접속 시 추가 인증을 요구하거나 비인가 기기 세션을 즉시 강제 종료할 때',
      ],
      en: [
        'Restricting console or API access to approved corporate IP addresses and CIDR ranges',
        'Preventing administrators from locking themselves out when activating or editing an IP allowlist',
        'Configuring idle session timeouts, absolute session lifetimes and concurrent device limits',
        'Challenging unrecognized devices and revoking active sessions that violate updated security policies',
      ],
    },
    keywords: {
      ko: ['IP 허용 목록', 'CIDR 대역', '신뢰 기기', '세션 타임아웃', '유휴 만료', '자가 차단 방지', '동시 접속 제한', '네트워크 접근 제어', '강제 로그아웃'],
      en: ['ip allowlist', 'cidr range', 'device trust', 'session timeout', 'idle timeout', 'lockout prevention', 'concurrent sessions', 'network restriction', 'session revocation'],
    },
    text: {
      ko: {
        domain: '권한·보안·감사',
        title: '접속 IP 허용 목록·신뢰 기기 제한과 정책 변경 시 현재 접속자 예외 처리',
        summary: '허용 IP 대역·기기 신뢰 조건·세션 만료 규칙을 적용하되, 설정 변경 시 현재 작업자의 자가 차단을 막고 기존 세션을 안전하게 정리합니다.',
        overview: '엔터프라이즈 환경에서는 계정 인증을 통과했더라도 사내 네트워크(IP 대역)가 아니거나 등록되지 않은 기기라면 접근을 차단하고, 일정 시간 입력이 없으면 세션을 만료시키는 보안 정책을 자주 요구합니다. 하지만 관리자가 IP 허용 목록을 잘못 입력해 자기 자신까지 접속 불능 상태에 빠뜨리거나, 프록시 뒤에서 실제 클라이언트 IP를 잘못 읽어 전체 사용자를 차단하는 사고가 흔히 발생합니다. 아래 개념은 네트워크·세션 정책 설계를 위한 참고이며 특정 네트워크 구성을 강제하지 않습니다.',
        concepts: [
          { name: 'IP/CIDR 허용 목록과 현재 접속 IP 자가 차단 방지', description: '허용할 단일 IP와 CIDR 대역을 검증하고, 정책을 활성화하거나 수정할 때 현재 관리자의 접속 IP가 목록에 포함되어 있는지 확인해 자가 잠금(Self-lockout)을 막습니다.' },
          { name: '적용 대상 구분(웹 콘솔·API·웹훅)과 시험 적용(Dry-run)', description: 'IP 제한을 브라우저 로그인에만 적용할지 외부 서버가 호출하는 API 키 요청에도 별도 목록으로 적용할지 구분하고, 차단 전 로그만 남기는 시험 모드를 지원할지 정합니다.' },
          { name: '신뢰 기기 등록과 미확인 기기 추가 검증', description: '기기 식별 정보나 보안 요건 충족 여부를 확인해 새 기기 접속 시 추가 인증이나 관리자 승인을 거치게 하고, 분실 기기는 목록에서 즉시 해제합니다.' },
          { name: '유휴 만료(Idle)·절대 만료(Absolute)와 정책 변경 시 기존 세션 처리', description: '마지막 활동 기준 유휴 만료와 최초 로그인 기준 절대 만료 시간을 분리하고, 보안 정책 강화 시 이미 열려 있는 세션도 즉시 재검증할지 정합니다.' },
        ],
        workflow: [
          { name: '현재 접속 IP 표시 및 허용 대역 검증하기', description: '설정 화면에 관리자의 현재 감지된 IP를 명시하고, 입력한 IP/CIDR 형식 오류와 현재 IP 누락 여부를 저장 전에 검사합니다.' },
          { name: '정책 활성화 및 기존 활성 세션 재평가하기', description: '새 IP·기기·타임아웃 정책을 적용할 때 현재 조건을 만족하지 못하는 기존 세션을 즉시 종료할지 다음 갱신 시점에 차단할지 처리합니다.' },
          { name: '차단된 접속 시도에 명확한 원인과 복구 경로 안내하기', description: 'IP 불일치, 기기 미승인, 세션 만료 중 어떤 이유로 접근이 거부되었는지 구분해 안내하고 관리자 문의 또는 복구 절차를 제공합니다.' },
          { name: '비상 잠금 해제 및 기기·세션 강제 해제 관리하기', description: '공인 IP 변경 등으로 모든 관리자가 잠겼을 때의 비상 복구 수단을 정의하고, 관리자가 특정 멤버의 기기·세션을 개별 강제 로그아웃할 수 있게 합니다.' },
        ],
        pitfalls: [
          { name: '리버스 프록시나 CDN 뒤에서 로드밸런서 내부 IP로 검사하기', description: '신뢰할 수 있는 프록시 설정 없이 헤더를 잘못 읽으면 모든 사용자가 같은 내부 IP로 보이거나 반대로 헤더 위조로 IP 제한이 우회될 수 있습니다.' },
          { name: '현재 관리자의 IP가 빠진 허용 목록을 즉시 활성화해 전원 잠그기', description: '현재 접속 IP 포함 여부 검사나 확정 전 연결 확인 단계가 없으면 오타 하나로 조직 전체가 콘솔에 들어가지 못하게 됩니다.' },
          { name: '웹 콘솔용 IP 제한을 외부 서버 연동 API까지 일괄 적용하기', description: '사무실 IP만 허용한 정책이 클라우드 서버의 API 키 호출까지 막아버리면 운영 중인 백엔드 연동이 즉시 중단됩니다.' },
        ],
        questions: [
          'IP 허용 목록은 웹 콘솔 접속에만 적용하나요, API 키 호출에도 동일하게 또는 별도 목록으로 적용하나요?',
          '정책 저장 시 현재 작업 중인 관리자의 접속 IP가 목록에 없으면 저장을 차단하나요, 자동 추가를 제안하나요?',
          '공인 IP가 갑자기 바뀌어 모든 관리자가 접속할 수 없을 때 어떤 본인 확인 절차로 잠금을 해제하나요?',
          '세션 유휴 만료 시간과 최대 유지 시간은 얼마이며, 동시 접속 가능한 기기 수에 제한이 있나요?',
          'IP 허용 목록이나 기기 제한 정책을 강화했을 때 이미 로그인되어 있는 기존 세션은 즉시 종료하나요?',
        ],
        example: '예시: 설정 화면에 현재 접속 IP를 표시해 해당 IP가 포함되지 않으면 IP 허용 목록 활성화를 막고, 웹 콘솔과 API 키별로 허용 대역을 분리하며, 30분 유휴 만료와 12시간 절대 만료를 함께 적용하는 방식을 생각할 수 있습니다. 실제 프록시 환경과 비상 복구 절차는 인프라 구성에 맞게 먼저 확인해야 합니다.',
        relatedDesigns: [
          { id: 'linked-form-error-summary', reason: '여러 개의 CIDR 대역과 세션 타임아웃 수치를 입력할 때 잘못된 IP 형식이나 자가 차단 위험 항목을 상단 요약과 해당 입력칸으로 연결해 안내할 때 참고할 수 있습니다.' },
          { id: 'dismissible-inline-banner', reason: '현재 감지된 접속 IP를 보여주고 허용 목록 변경 시 영향을 받는 활성 세션 수나 주의사항을 상단에 안내할 때 참고할 수 있습니다.' },
        ],
        promptSnippet: '조직의 접속 IP 허용 목록, 신뢰 기기 제한, 세션 타임아웃 정책과 관리자 자가 차단 방지 흐름을 설계해 줘. 먼저 IP 제한 적용 범위(웹 콘솔 vs API 키), 현재 접속 IP 누락 시 자가 차단 방지 규칙, 전원 잠금 시 비상 복구 절차, 신뢰 기기 승인 조건, 유휴·절대 세션 만료 시간과 정책 변경 시 기존 세션 처리 방식을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. IP/CIDR 형식 검증, 현재 접속 IP 확인, 웹·API 적용 범위 분리 규칙.\n2. 신뢰 기기 등록·해제 조건과 미등록 기기 접속 시 추가 인증 또는 차단 처리.\n3. 유휴 만료(Idle)·절대 만료(Absolute)·동시 세션 제한 및 정책 강화 시 기존 세션 재검증.\n4. IP 변경 등으로 인한 전체 관리자 잠금 시 비상 복구(Lockout recovery) 절차.\n5. 네트워크·기기·세션 정책 설정, 활성 기기 목록, 접근 거부 안내 화면의 연결.\n클라이언트가 임의로 보낸 헤더를 검증 없이 실제 IP로 신뢰하지 말고, 예시 정책과 디자인 데모를 실제 네트워크·세션 보안 구현으로 간주하지 말아 줘.',
      },
      en: {
        domain: 'Permissions, Security & Audit',
        title: 'IP allowlists, trusted-device restrictions and lockout-safe policy updates',
        summary: 'Enforce approved IP ranges, device trust checks and session timeouts while preventing administrators from locking themselves out during policy updates.',
        overview: 'Organizations often restrict workspace access to corporate IP ranges, require approved devices, and enforce strict idle and absolute session timeouts. However, a mistyped CIDR block can lock every administrator out of the console, and applying browser IP rules blindly to server-to-server API keys can break production integrations. Design network and session policies with self-lockout guards and clear scope boundaries. These concepts are design references, not a fixed network architecture.',
        concepts: [
          { name: 'IP/CIDR allowlisting with current-IP lockout protection', description: 'Validate IPv4/IPv6 addresses and CIDR blocks, display the administrator’s detected client IP, and block saving an active allowlist that excludes the actor’s current IP.' },
          { name: 'Traffic scope separation (Console versus API) and dry-run mode', description: 'Decide whether IP restrictions apply only to interactive browser sessions or also to API keys (with per-key or global ranges), and optionally support a log-only dry-run mode before enforcement.' },
          { name: 'Trusted device posture and unrecognized device challenges', description: 'Track registered or managed devices, require step-up verification or admin approval for new devices, and let admins revoke lost devices immediately.' },
          { name: 'Idle versus absolute session timeouts and live session re-evaluation', description: 'Configure both inactivity timeouts and maximum session lifetimes, and define whether tightening a policy immediately terminates non-compliant active sessions.' },
        ],
        workflow: [
          { name: 'Display detected client IP and validate CIDR rules before saving', description: 'Show the admin’s current IP address in the policy editor, validate CIDR syntax, and prevent enabling a rule set that would immediately block the current session.' },
          { name: 'Apply updated policies and reconcile existing sessions', description: 'Enforce the new IP, device or timeout rules and revoke or challenge already open sessions that fall outside the updated policy.' },
          { name: 'Explain access denial reasons and recovery options clearly', description: 'Distinguish IP mismatch, unapproved device and expired session states so legitimate users know whether to connect to VPN, re-authenticate or contact an admin.' },
          { name: 'Provide lockout recovery and per-device session revocation', description: 'Define a verified out-of-band recovery path if an office IP changes unexpectedly, and let admins terminate specific device sessions from the console.' },
        ],
        pitfalls: [
          { name: 'Evaluating the load balancer IP or trusting spoofed forwarding headers', description: 'Failing to configure trusted proxy hops properly either blocks everyone behind a proxy IP or lets attackers bypass the allowlist with forged headers.' },
          { name: 'Activating an IP allowlist without verifying the current admin connection', description: 'Without a current-IP inclusion check or confirmation handshake, a single typo in a CIDR range can lock out the entire organization.' },
          { name: 'Applying office IP restrictions to cloud backend API keys unexpectedly', description: 'If employee VPN allowlists automatically restrict server-to-server API keys, production backend integrations running in cloud regions will fail.' },
        ],
        questions: [
          'Does the IP allowlist apply only to interactive web sign-ins, or also to API key requests?',
          'When saving an IP allowlist, does the system block saving if the admin’s current IP is not covered?',
          'What is the recovery process if an organization’s corporate IP changes and all admins are locked out?',
          'What are the configurable ranges for idle session timeout, absolute session lifetime and concurrent devices?',
          'When IP or device policies are tightened, are existing non-compliant sessions terminated immediately?',
        ],
        example: 'Example: a console could display the admin’s current IP and require it to be covered before enabling an IP allowlist, keep API key IP restrictions separate from browser sessions, and enforce a 30-minute idle timeout alongside a 12-hour absolute re-login limit. Confirm proxy header handling and lockout recovery steps before implementation.',
        relatedDesigns: [
          { id: 'linked-form-error-summary', reason: 'A reference for summarizing invalid CIDR entries or self-lockout warnings at the top of a policy form and linking directly to the offending input.' },
          { id: 'dismissible-inline-banner', reason: 'A reference for displaying the administrator’s currently detected IP address and warning how many active sessions will be affected by a policy change.' },
        ],
        promptSnippet: 'Help design IP allowlist controls, trusted-device restrictions, session timeout policies and admin lockout prevention. First confirm traffic scope (web console vs API keys), current-IP self-lockout prevention rules, out-of-band recovery if an office IP changes, device approval rules, and idle/absolute session timeouts plus live session revocation behavior. Do not assume undecided rules.\nBased on the answers, describe:\n1. IP/CIDR validation, current-IP inclusion checks and separation between interactive sessions and API traffic.\n2. Trusted-device registration, step-up challenges for new devices and lost-device revocation.\n3. Idle timeout, absolute session lifetime, concurrent session limits and re-evaluating active sessions on policy changes.\n4. Out-of-band recovery procedures when all administrators are locked out by an IP change.\n5. How network/session policy editors, active device tables and access-denied screens connect.\nDo not trust unverified client-supplied IP headers, and do not mistake example policies or design demos for real network or session enforcement.',
      },
    },
    sources: [
      { title: 'OWASP Cheat Sheet Series — Session Management Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html' },
      { title: 'GitHub Docs — Managing allowed IP addresses for your organization', url: 'https://docs.github.com/en/organizations/keeping-your-organization-secure/managing-security-settings-for-your-organization/managing-allowed-ip-addresses-for-your-organization' },
    ],
  },
];
