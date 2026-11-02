import type { DomainKnowledge } from '../domain-knowledge';

export const ACCOUNT_KNOWLEDGE: DomainKnowledge[] = [{
  id: 'account-auth-recovery-and-deletion',
  aliases: {
    ko: ['회원가입 로그인', '계정 관리', '소셜 로그인 연동', '비밀번호 재설정', '세션 관리', '회원 탈퇴'],
    en: ['authentication and account', 'sign-in and registration', 'social login linking', 'password reset', 'session management', 'account deletion'],
  },
  useCases: {
    ko: ['회원가입·로그인·소셜 계정 연동을 설계할 때', '이메일·본인 확인 전후의 이용 가능 범위를 구분할 때', '비밀번호 재설정·다중 기기 세션 해제 흐름을 만들 때', '회원 탈퇴 유예 기간과 작성 데이터 파기·보존 정책을 정할 때'],
    en: ['Designing registration, sign-in and social account linking', 'Separating access before and after email or identity verification', 'Building password recovery and multi-device session revocation', 'Defining account deletion grace periods and data retention or anonymization'],
  },
  keywords: {
    ko: ['계정', '인증', '로그인', '회원가입', '소셜 로그인', 'OAuth', '이메일 인증', '비밀번호 재설정', '세션', '로그아웃', '회원 탈퇴', '탈퇴 유예', '개인정보 파기'],
    en: ['account', 'authentication', 'login', 'sign-in', 'registration', 'social login', 'oauth', 'email verification', 'password reset', 'session', 'logout', 'account deletion', 'anonymization'],
  },
  text: {
    ko: {
      domain: '계정·인증',
      title: '로그인·계정 연동·세션 관리와 탈퇴·데이터 처리',
      summary: '인증 수단과 계정 정체성을 분리하고, 미인증·정상·잠금·탈퇴 유예 상태와 데이터 처리를 연결합니다.',
      overview: '로그인 버튼을 누르는 것 뒤에는 가입 경로, 인증 수단 연결, 기기별 세션 유지, 계정 복구와 탈퇴 처리까지 여러 상태가 이어집니다. 이메일 가입과 소셜 로그인을 별도 계정으로 만들지 하나로 연결할지, 탈퇴 시 어떤 기록을 즉시 지우고 어떤 거래·활동 기록을 익명화해 남길지 먼저 정해야 합니다. 아래 개념은 계정·인증 흐름을 설계하기 위한 참고이며 특정 보안 규격이나 법적 보관 기간을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '계정(Identity)과 인증 수단(Credential) 분리', description: '사용자 계정 하나에 비밀번호, 소셜 로그인(OAuth), 패스키 등 여러 인증 수단을 연결할 수 있는지 정합니다. 같은 이메일로 다른 소셜 로그인을 시도할 때의 병합 규칙이 필요합니다.' },
        { name: '가입·인증 단계별 계정 상태', description: '이메일 미인증·정상 활성·보안 잠금·휴면·탈퇴 유예·영구 해지 상태를 구분합니다. 인증 완료 전에도 둘러보기를 허용할지 주요 행동을 막을지 결정합니다.' },
        { name: '세션 유지와 기기별 해제', description: '현재 기기만 로그아웃하는 동작과 다른 기기의 로그인 세션을 모두 만료시키는 동작을 구분합니다. 비밀번호 변경이나 이상 로그인 감지 시 기존 세션 처리 규칙을 정합니다.' },
        { name: '계정 복구와 가입 여부 노출 방지', description: '비밀번호 재설정이나 아이디 찾기를 요청할 때 인증 번호·링크의 만료 시간과 재발송 제한을 정하고, 미가입 이메일 입력 시 안내 문구 기준을 일관되게 맞춥니다.' },
        { name: '회원 탈퇴 유예와 데이터 파기·익명화', description: '탈퇴 즉시 모든 데이터를 삭제할지 일정 유예 기간 동안 복구를 허용할지 정합니다. 다른 사용자와 공유된 문서·댓글이나 정산 기록은 삭제 대신 작성자 익명화로 남길지 구분합니다.' },
      ],
      workflow: [
        { name: '가입 수단과 본인 확인 연결하기', description: '이메일·소셜 로그인으로 가입을 받고, 중복 이메일 확인 및 인증 메일 재발송·만료 안내를 제공합니다.' },
        { name: '로그인 실패·잠금과 복구 안내하기', description: '잘못된 인증 정보 입력 시 남은 시도나 잠금 해제 방법, 비밀번호 재설정 또는 연동된 소셜 로그인 경로를 안내합니다.' },
        { name: '인증 수단 추가·해제와 세션 관리하기', description: '소셜 계정 연결을 해제할 때 최소 하나의 로그인 수단이 남는지 확인하고, 보안 설정에서 활성 기기 로그아웃을 지원합니다.' },
        { name: '탈퇴 전 제약 확인과 사후 처리 실행하기', description: '진행 중인 거래나 단독 소유 워크스페이스가 있으면 탈퇴 전에 양도·정리를 안내하고, 탈퇴 확정 시 유예·익명화·파기 규칙을 적용합니다.' },
      ],
      pitfalls: [
        { name: '마지막 로그인 수단까지 연결 해제 허용하기', description: '비밀번호 없이 소셜 로그인 하나로만 가입한 사용자가 그 소셜 연결을 해제하면 다시 로그인할 수 없게 됩니다. 대체 수단 등록 여부를 먼저 확인하세요.' },
        { name: '같은 이메일의 소셜 로그인을 무조건 자동 병합하거나 중복 생성하기', description: '이메일 소유 확인 없이 계정을 합치면 계정 탈취 위험이 생기고, 안내 없이 새 계정을 만들면 사용자는 기존 데이터가 사라졌다고 느낍니다.' },
        { name: '탈퇴 시 공유 데이터와 단독 소유 자원을 구분하지 않기', description: '팀 공간의 유일한 관리자 계정을 그대로 삭제하면 남은 팀원이 접근할 수 없게 됩니다. 소유권 이전이나 정리 조건을 먼저 검사하세요.' },
      ],
      questions: [
        '이메일·비밀번호와 소셜 로그인 중 어떤 수단을 지원하며, 동일 이메일로 다른 수단 로그인 시 어떻게 안내하나요?',
        '이메일 인증을 완료하기 전까지 사용자가 열람하거나 실행할 수 있는 기능 범위는 어디까지인가요?',
        '비밀번호 재설정 링크·인증 코드의 유효 시간과 연속 실패 시 잠금 기준은 무엇인가요?',
        '비밀번호 변경이나 보안 설정 변경 시 다른 기기에 열려 있는 세션을 자동으로 로그아웃하나요?',
        '진행 중인 거래나 단독 관리자 권한이 남아 있을 때 탈퇴를 바로 허용하나요, 사전 정리를 요구하나요?',
        '탈퇴 신청 시 즉시 파기하나요, 복구 가능한 유예 기간을 두나요? 작성한 글·댓글은 삭제하나요, 익명화하나요?',
      ],
      example: '예시: 이메일과 구글 로그인을 함께 지원하되, 마지막 남은 로그인 수단은 해제할 수 없게 막고, 탈퇴 신청 시 14일 유예 기간 동안 재로그인으로 철회할 수 있으며 공유 문서의 작성자 표시는 익명으로 전환하는 방식을 생각할 수 있습니다. 실제 인증 수단·유예 기간·개인정보 보관 기준은 서비스 정책에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'inline-email-validation', reason: '가입·로그인·복구 화면에서 이메일 입력 형식을 확인하고 수정 즉시 오류를 갱신하는 표현에 참고할 수 있습니다. 실제 중복 가입 확인이나 인증 메일 발송은 구현하지 않습니다.' },
        { id: 'inline-delete-confirmation', reason: '소셜 계정 연동 해제나 탈퇴 요청 시 같은 자리에서 취소·확인을 한 번 더 거치는 표현에 참고할 수 있습니다. 실제 계정 파기나 세션 만료는 별도로 구현해야 합니다.' },
      ],
      promptSnippet: '계정·인증 서비스의 회원가입·로그인·계정 연동·세션 관리·탈퇴 흐름을 설계해 줘. 먼저 지원할 로그인 수단과 동일 이메일 병합 규칙, 이메일 미인증 상태의 허용 범위, 비밀번호 재설정 및 잠금 기준, 기기별 세션 만료 조건, 탈퇴 유예 기간과 공유 데이터 익명화·파기 정책을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 미인증·정상·잠금·탈퇴 유예·해지 상태별 접근 범위와 가능한 행동.\n2. 계정과 복수 인증 수단(비밀번호·소셜 연동)의 연결·추가·해제 조건.\n3. 비밀번호 재설정, 인증 코드 만료·재발송, 다중 기기 세션 해제 흐름.\n4. 탈퇴 전 사전 조건(단독 관리자·미종결 거래) 확인과 유예·파기·익명화 처리.\n5. 가입·로그인·계정 복구·보안/세션 설정·탈퇴 확인 화면의 연결.\n화면의 입력 형식 통과를 실제 본인 인증 완료로 간주하지 말고, 예시 정책과 디자인 데모를 실제 인증·보안 구현으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Auth & Account',
      title: 'Sign-in, account linking, session management and deletion or data handling',
      summary: 'Separate account identity from sign-in credentials, and connect unverified, active, locked and pending-deletion states.',
      overview: 'Behind a sign-in button sit registration paths, credential linking, multi-device sessions, account recovery and deletion policies. Decide early how email and social logins map to one account, when sessions are revoked, and which user records are deleted versus anonymized upon account closure. These concepts are design references, not default security standards or legal retention rules for a specific service.',
      concepts: [
        { name: 'Account identity versus credentials', description: 'Separate the user account from attached credentials such as passwords, OAuth providers or passkeys, and define how matching email addresses are linked.' },
        { name: 'Verification and lifecycle states', description: 'Distinguish unverified, active, locked, dormant, pending-deletion and purged accounts, and define what unverified users can access.' },
        { name: 'Session persistence and device revocation', description: 'Separate signing out of the current browser from revoking all active sessions after a password change or suspicious activity.' },
        { name: 'Recovery flows and enumeration boundaries', description: 'Define expiration and rate limits for reset links or verification codes, and decide how unregistered email addresses are handled during recovery.' },
        { name: 'Deletion grace periods and data anonymization', description: 'Decide whether account deletion is immediate or enters a reversible grace window, and distinguish personal profile erasure from anonymizing shared team records.' },
      ],
      workflow: [
        { name: 'Connect registration and identity verification', description: 'Accept email or social sign-up, handle duplicate email checks, and provide code expiration and resend actions.' },
        { name: 'Guide sign-in failures, lockouts and recovery', description: 'Explain remaining attempts or lockout recovery clearly, and route users to password reset or linked social sign-in.' },
        { name: 'Manage linked credentials and active sessions', description: 'Ensure at least one valid sign-in method remains before unlinking a provider, and let users revoke other active sessions.' },
        { name: 'Check blockers before deletion and apply retention rules', description: 'Require ownership transfer or settlement of active obligations before deletion, then execute the agreed grace-period, anonymization and purge steps.' },
      ],
      pitfalls: [
        { name: 'Allowing users to unlink their last sign-in method', description: 'If a social-only user unlinks their OAuth provider without setting a password first, they are locked out. Enforce at least one active credential.' },
        { name: 'Silently merging or duplicating social logins with the same email', description: 'Auto-merging unverified emails risks account takeover, while silently creating a second account makes users think their data disappeared.' },
        { name: 'Deleting an account without resolving sole-owner resources', description: 'Purging the only owner of a shared workspace can orphan the team. Check ownership and pending obligations before finalizing deletion.' },
      ],
      questions: [
        'Which sign-in methods are supported, and what happens when someone signs in with a social provider matching an existing email?',
        'What can a user view or do before completing email or phone verification?',
        'How long are verification codes and reset links valid, and what triggers temporary account lockout?',
        'Does changing a password or security setting automatically revoke sessions on other devices?',
        'Must users transfer sole workspace ownership or finish active transactions before deleting their account?',
        'Is deletion immediate or reversible during a grace window, and which shared records are anonymized rather than deleted?',
      ],
      example: 'Example: a service could support email and Google sign-in, block unlinking the last credential, place deleted accounts into a 14-day reversible grace state, and anonymize author names on shared documents after final purge. Confirm actual auth providers, grace periods and retention obligations before adopting this setup.',
      relatedDesigns: [
        { id: 'inline-email-validation', reason: 'A reference for checking email format on blur and updating validation state in place. Real account lookup and verification emails need separate implementation.' },
        { id: 'inline-delete-confirmation', reason: 'A reference for two-step confirmation when unlinking a provider or requesting account deletion. Real session revocation and data purging need separate implementation.' },
      ],
      promptSnippet: 'Help design an authentication and account-lifecycle workflow. First confirm supported sign-in methods and email-linking rules, unverified-account access limits, password reset and lockout rules, multi-device session revocation, deletion grace windows and data anonymization/purge policies. Do not assume undecided rules.\nBased on the answers, describe:\n1. Access boundaries and allowed actions across unverified, active, locked, pending-deletion and purged states.\n2. Rules for linking, adding and unlinking credentials on a single account.\n3. Password recovery, code expiration/resend and session revocation across devices.\n4. Pre-deletion blocker checks (sole ownership, active obligations) and grace-period, anonymization or purge handling.\n5. How sign-up, sign-in, recovery, security settings and account-deletion screens connect.\nDo not treat client-side input validation as real authentication, and do not mistake example policies or design demos for real security implementation.',
    },
  },
  sources: [
    { title: 'OWASP Cheat Sheet Series — Authentication Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html' },
    { title: 'Auth0 Docs — User Account Linking', url: 'https://auth0.com/docs/manage-users/user-accounts/user-account-linking' },
  ],
}, {
  id: 'account-mfa-stepup-and-backup-codes',
  aliases: {
    ko: ['2단계 인증 MFA', '민감 작업 재인증 Step-up', '일회용 복구 코드', '인증 기기 분실 복구'],
    en: ['multi-factor authentication MFA', 'step-up reauthentication', 'backup recovery codes', 'lost authenticator recovery'],
  },
  useCases: {
    ko: ['인증 앱(TOTP)·패스키·문자 등 2단계 인증(MFA) 등록과 기본 수단을 설정할 때', '이미 로그인된 상태에서도 비밀번호 변경·결제 수단 수정·API 키 발급 시 재인증(Step-up)을 요구할 때', '휴대폰 분실에 대비한 일회용 복구 코드 발급·차감·재생성 흐름을 만들 때', '모든 2차 인증 수단을 분실했을 때의 본인 확인 및 복구 절차를 설계할 때'],
    en: ['Enrolling TOTP authenticator apps, passkeys or SMS as multi-factor methods', 'Requiring step-up reauthentication before sensitive actions like API key creation or payout changes', 'Generating, consuming and rotating single-use backup recovery codes', 'Designing fallback recovery when a user loses their second-factor device'],
  },
  keywords: {
    ko: ['2단계 인증', 'MFA', '2FA', 'OTP', '패스키', '재인증', 'Step-up 인증', '복구 코드', '백업 코드', '신뢰 기기'],
    en: ['MFA', '2FA', 'two-factor authentication', 'TOTP', 'passkey', 'step-up authentication', 'reauthentication', 'backup codes', 'recovery code', 'trusted device'],
  },
  text: {
    ko: {
      domain: '계정·인증',
      title: '2단계 인증(MFA)·민감 작업 재인증(Step-up)과 복구 코드 분실 대비',
      summary: '주 인증과 2차 인증·민감 작업 재인증을 구분하고, 복구 코드 차감·재발급과 기기 분실 복구를 연결합니다.',
      overview: '비밀번호만으로는 계정 탈취나 열린 브라우저 세션의 악용을 막기 어렵습니다. 로그인 시점의 2단계 인증(MFA)뿐 아니라, 이미 로그인된 상태에서도 보안 설정 변경이나 정산 계좌 수정처럼 위험도가 높은 행동 직전에 짧게 다시 본인 확인을 거치는 재인증(Step-up)과 인증 기기 분실 대비용 복구 코드 관리가 함께 설계되어야 합니다. 아래 내용은 MFA와 재인증 설계를 위한 참고이며 특정 암호화 규격을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '주 인증(1차)과 다중 2차 인증 수단(MFA) 구성', description: '인증 앱(TOTP), 보안 키/패스키, SMS 등 지원할 2차 수단과 우선순위를 정하고, 조직 정책으로 MFA 등록을 필수로 강제할 수 있는지 구분합니다.' },
        { name: '민감 작업 재인증(Step-up)과 유효 시간(Freshness)', description: '로그인 세션이 살아 있어도 비밀번호·MFA 해제·결제 계좌·회원 탈퇴 같은 민감 작업 전에는 최근 재인증 시각을 확인해 추가 인증을 요구합니다.' },
        { name: '일회용 복구 코드(Backup Codes) 발급·차감·무효화', description: '2차 인증 기기를 잃어버렸을 때 쓰는 일회용 복구 코드를 발급 시 한 번만 평문으로 보여 주고, 사용된 코드는 즉시 차감하며 새로 발급하면 기존 코드를 모두 폐기합니다.' },
        { name: '기기 신뢰 유지와 전체 2차 수단 분실 복구', description: '현재 브라우저에서 일정 기간 2차 인증을 건너뛰는 신뢰 기기 설정 범위와, 인증 앱과 복구 코드를 모두 잃어버렸을 때의 관리자·고객센터 복구 절차를 정의합니다.' },
      ],
      workflow: [
        { name: '2차 인증 수단 등록과 복구 코드 보관 확인하기', description: 'QR 코드나 인증 번호 검증이 통과된 뒤에야 MFA를 활성화하고, 동시에 일회용 복구 코드를 내려받거나 복사했는지 확인합니다.' },
        { name: '로그인 시 2차 인증 및 대체 수단 전환하기', description: '1차 인증 통과 후 기본 2차 수단 입력을 받고, 기기가 없을 때 다른 등록 수단이나 복구 코드 입력 화면으로 전환할 수 있게 합니다.' },
        { name: '민감 작업 진입 시 Step-up 재인증 실행하기', description: '마지막 인증 이후 경과 시간을 확인해 짧은 재인증 모달을 띄우고, 통과 시에만 원래 요청한 민감 작업을 이어서 실행합니다.' },
        { name: '남은 복구 코드 경고와 새 코드 재발급하기', description: '복구 코드로 로그인하면 남은 코드 개수를 알리고, 보안 설정에서 재인증을 거쳐 새 복구 코드 묶음을 재발급합니다.' },
      ],
      pitfalls: [
        { name: '코드 검증을 마치기 전에 MFA 활성화 상태부터 저장하기', description: 'QR 코드만 띄운 상태에서 사용자가 화면을 닫았는데 MFA가 켜져 버리면 다음 로그인부터 계정에 들어갈 수 없습니다. 첫 코드 검증 성공 시점에 활성화하세요.' },
        { name: '기기 신뢰(기억하기)를 체크했다고 보안 설정 변경까지 재인증 없이 허용하기', description: '로그인 편의를 위한 기기 신뢰와 비밀번호·MFA 해제 같은 민감 작업 재인증(Step-up)은 분리해야 세션 탈취 피해를 줄일 수 있습니다.' },
        { name: '복구 코드를 여러 번 재사용하게 두거나 재발급 후에도 구 코드를 살려 두기', description: '각 복구 코드는 1회 사용 즉시 소멸해야 하며, 새 묶음을 생성하면 이전 묶음은 전부 무효화해야 안전합니다.' },
      ],
      questions: [
        '2단계 인증(MFA)은 사용자가 선택해서 켜나요, 특정 권한이나 조직 소속에 따라 필수로 강제하나요?',
        '인증 앱(TOTP), 패스키/보안 키, 문자·이메일 중 어떤 2차 수단을 지원하며 복수 등록이 가능한가요?',
        '이미 로그인된 상태에서 어떤 민감 작업(비밀번호 변경, MFA 해제, API 키 발급 등)을 할 때 Step-up 재인증을 요구하나요?',
        '일회용 복구 코드는 몇 개를 발급하며, 소진 임박 시 알림과 재발급 시 기존 코드 폐기는 어떻게 안내하나요?',
        '사용자가 2차 인증 기기와 복구 코드를 모두 분실했을 때 어떤 본인 확인이나 관리자 절차를 거쳐 복구하나요?',
      ],
      example: '예시: 계정 보안 설정에서 인증 앱 등록 완료 시 10개의 일회용 복구 코드를 발급하고, 로그인 시 30일간 기기 기억하기를 허용하되 비밀번호 변경·MFA 해제·복구 코드 재발급 직전에는 최근 10분 내 재인증(Step-up)을 다시 요구하도록 구성할 수 있습니다. 실제 강제 대상과 분실 복구 심사는 서비스 보안 기준에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'onboarding-progress-checklist', reason: '2단계 인증 수단 연결, 첫 인증 코드 검증, 복구 코드 저장 확인을 순서대로 완료하도록 안내하는 표현에 참고할 수 있습니다. 실제 암호화 키 생성과 검증은 별도로 구현해야 합니다.' },
        { id: 'inline-delete-confirmation', reason: '등록된 2차 인증 수단 해제나 기존 복구 코드 무효화 후 재발급 시 한 번 더 확인을 거치는 표현에 참고할 수 있습니다. 실제 세션·인증 상태 변경은 구현하지 않습니다.' },
      ],
      promptSnippet: '계정·인증 서비스의 2단계 인증(MFA), 민감 작업 재인증(Step-up), 복구 코드 관리 흐름을 설계해 줘. 먼저 MFA 필수/선택 여부와 지원 수단, Step-up 재인증이 필요한 민감 작업 목록과 유효 시간, 일회용 복구 코드 발급·차감·재발급 규칙, 기기 및 복구 코드 동시 분실 시 복구 절차를 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. MFA 미등록·등록 진행 중·활성·비활성 상태와 조직별 강제 조건.\n2. 로그인 2차 인증, 신뢰 기기 유지 범위, 민감 작업 시 Step-up 재인증 조건.\n3. 일회용 복구 코드 최초 노출, 1회 차감, 소진 경고, 재발급 시 기존 코드 폐기 규칙.\n4. 인증 연속 실패 잠금 및 2차 수단·복구 코드 전체 분실 시 복구 경로.\n5. MFA 등록 단계·로그인 2차 입력·대체 수단 선택·Step-up 모달·보안 설정의 연결.\n첫 코드 검증 전에 MFA를 활성화 처리하지 말고, 예시 정책과 디자인 데모를 실제 인증 서버 구현으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Auth & Account',
      title: 'Multi-factor authentication, step-up challenges and recovery code rotation',
      summary: 'Connect MFA enrollment, step-up reauthentication for sensitive actions, and single-use backup code rotation.',
      overview: 'Passwords alone do not protect accounts when credentials leak or an unlocked laptop is left unattended. Beyond sign-in MFA, products need step-up reauthentication before high-risk actions (such as disabling MFA, rotating API keys or changing payout settings) and a reliable recovery-code lifecycle when a user loses their phone. These concepts are design references, not default cryptographic standards.',
      concepts: [
        { name: 'Primary credentials versus secondary MFA factors', description: 'Support secondary factors such as TOTP authenticator apps, passkeys/security keys or SMS, and define whether MFA is optional or enforced by organization policy.' },
        { name: 'Step-up reauthentication and session freshness', description: 'Require a fresh credential or MFA challenge before sensitive mutations—even inside an active session—if the last verification is older than a short freshness window.' },
        { name: 'Single-use backup codes and rotation', description: 'Show generated backup codes once during setup, consume each code permanently upon use, and invalidate all prior codes whenever a new set is generated.' },
        { name: 'Trusted-device boundaries and lost-device recovery', description: 'Separate "remember this browser for sign-in" from step-up checks on sensitive settings, and define the verification path when both the MFA device and backup codes are lost.' },
      ],
      workflow: [
        { name: 'Verify factor and confirm backup code storage on setup', description: 'Activate MFA only after the user successfully verifies a live code from their device and acknowledges saving their backup recovery codes.' },
        { name: 'Challenge at sign-in with fallback factor switching', description: 'Prompt for the default second factor after primary sign-in and let the user switch to another enrolled factor or enter a backup code.' },
        { name: 'Trigger step-up verification before sensitive actions', description: 'Check authentication freshness before high-risk actions, present an inline or modal challenge, and resume the intended action upon success.' },
        { name: 'Warn on low backup codes and rotate sets', description: 'Notify the user how many backup codes remain after one is used, and allow generating a fresh set after step-up verification.' },
      ],
      pitfalls: [
        { name: 'Marking MFA enabled before the user verifies their first code', description: 'If scanning a QR code flips MFA on before a test code succeeds, an interrupted setup locks the user out immediately.' },
        { name: 'Letting a remembered device bypass step-up checks on security settings', description: 'A trusted-device cookie for login convenience should not allow someone to disable MFA or change the account email without re-verifying.' },
        { name: 'Allowing backup codes to be reused or keeping old sets valid after rotation', description: 'Each recovery code must be single-use, and generating a new batch must revoke all previously issued codes.' },
      ],
      questions: [
        'Is MFA optional for users or enforced by role or organization policy, and which factor types are supported?',
        'Can users enroll multiple second factors (such as both a passkey and an authenticator app) as fallbacks?',
        'Which sensitive actions require step-up reauthentication inside an active session, and how long does that fresh verification last?',
        'How many single-use backup codes are issued, when are low-count warnings shown, and how does code rotation work?',
        'What recovery process is available if a user loses both their second-factor device and their backup codes?',
      ],
      example: 'Example: an account security flow could activate TOTP only after a verified 6-digit code, issue 10 single-use backup codes, remember a browser for 30 days at sign-in, and still require a step-up challenge within the last 10 minutes before changing passwords, disabling MFA or rotating backup codes. Confirm actual factor types and lockout recovery rules before adopting this setup.',
      relatedDesigns: [
        { id: 'onboarding-progress-checklist', reason: 'A reference for guiding users through connecting an authenticator, verifying a code and saving backup codes step by step. Real secret generation and verification need separate implementation.' },
        { id: 'inline-delete-confirmation', reason: 'A reference for confirming before removing an enrolled MFA factor or invalidating existing backup codes. Real security state mutations need separate implementation.' },
      ],
      promptSnippet: 'Help design multi-factor authentication (MFA), step-up reauthentication and backup recovery code workflows. First confirm optional versus enforced MFA rules, supported factor types, sensitive actions and freshness windows for step-up checks, backup code consumption and rotation rules, and lost-device recovery paths. Do not assume undecided rules.\nBased on the answers, describe:\n1. MFA enrollment states, multiple-factor priority and organization enforcement rules.\n2. Sign-in MFA challenge, trusted-device scope and step-up reauthentication triggers.\n3. Backup code display, single-use consumption, low-remaining warnings and full-set rotation.\n4. Rate limits, temporary lockouts and recovery when all second factors are lost.\n5. How the MFA setup checklist, sign-in challenge, factor switcher, step-up prompt and security settings connect.\nDo not mark MFA active before a factor is verified, and do not mistake example policies or design demos for a real authentication server.',
    },
  },
  sources: [
    { title: 'OWASP Cheat Sheet Series — Multifactor Authentication Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html' },
    { title: 'GitHub Docs — Configuring two-factor authentication recovery methods', url: 'https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication-recovery-methods' },
  ],
}, {
  id: 'account-organization-switch-and-membership',
  aliases: {
    ko: ['다중 조직 워크스페이스 전환', '개인 계정 기업 계정 분리', '소속 멤버십 퇴사 회수', '기업 도메인 계정 귀속'],
    en: ['multi-organization switching', 'personal vs enterprise account ownership', 'organization membership offboarding', 'domain-claimed accounts'],
  },
  useCases: {
    ko: ['한 계정으로 개인 공간과 여러 회사·팀 조직(Organization)을 오가며 전환할 때', '조직을 전환했을 때 권한·결제·데이터 맥락과 열려 있는 다른 탭의 충돌을 처리할 때', '구성원이 조직에서 제외(퇴사)될 때 개인 계정 자체는 유지하고 해당 조직 접근권만 회수할 때', '회사 이메일 도메인으로 가입한 계정의 소속 귀속(Domain Claim)과 데이터 소유권을 정할 때'],
    en: ['Switching one user identity across a personal space and multiple organizations', 'Updating permissions, billing context and open browser tabs when the active organization changes', 'Revoking a member’s access to one organization without deleting their underlying user account', 'Defining ownership when an enterprise claims accounts registered with its corporate email domain'],
  },
  keywords: {
    ko: ['조직 전환', '다중 소속', '워크스페이스 전환', '멤버십', '개인 계정', '기업 도메인', '소유권 귀속', '퇴사 회수', '활성 컨텍스트'],
    en: ['organization switcher', 'multi-tenant membership', 'workspace context', 'personal space', 'enterprise domain', 'account ownership', 'member offboarding', 'role per organization', 'context switch'],
  },
  text: {
    ko: {
      domain: '계정·인증',
      title: '다중 소속(조직 전환)·개인 계정과 기업 도메인 계정 귀속 기준',
      summary: '사용자 계정과 조직별 멤버십을 분리하고, 소속 전환·권한 경계·퇴사 시 접근 회수·도메인 귀속을 연결합니다.',
      overview: '협업·SaaS 서비스에서는 한 사용자가 개인 작업 공간과 여러 고객사·소속 회사의 조직에 동시에 참여하는 경우가 많습니다. 이때 로그인 계정 자체와 각 조직 안에서의 멤버십(역할·상태)을 분리하지 않으면, 한 조직에서 제외될 때 다른 조직이나 개인 데이터까지 막히거나 조직 전환 중 엉뚱한 공간에 데이터를 저장하는 문제가 생깁니다. 아래 내용은 다중 소속과 계정 귀속 설계를 위한 참고이며 특정 기업 계약 조건을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '사용자 계정(User)과 조직 멤버십(Membership) 분리', description: '로그인 주체인 사용자 계정 하나가 여러 조직에 각각 다른 역할(관리자·일반 구성원·게스트)로 소속될 수 있도록 계정과 멤버십을 분리합니다.' },
        { name: '활성 조직 전환과 데이터·탭 맥락 격리', description: '현재 선택된 조직에 맞춰 목록·권한·결제 메뉴를 바꾸고, URL에 조직 식별자를 포함해 다른 브라우저 탭과 활성 조직이 섞이지 않게 합니다.' },
        { name: '조직 멤버십 회수(퇴사)와 작성 산출물 귀속', description: '사용자를 특정 조직에서 내보낼 때 그 조직의 접근권과 세션만 회수하고, 조직 안에서 만든 문서·작업은 조직 소유로 남기며 개인 계정과 타 조직 소속은 유지합니다.' },
        { name: '기업 도메인 인증(Domain Claim)과 계정 전환', description: '기업이 자사 이메일 도메인을 등록해 관리 대상으로 전환할 때, 기존에 회사 이메일로 가입해 쓰던 개인 공간 데이터를 분리 이관할지 기업 관리 계정으로 흡수할지 정합니다.' },
      ],
      workflow: [
        { name: '소속 조직 목록 확인과 활성 조직 전환하기', description: '상단 전환 메뉴에서 현재 소속된 조직과 개인 공간, 대기 중인 초대를 보여 주고 선택 시 해당 조직 경로와 권한으로 전환합니다.' },
        { name: '조직별 추가 인증(SSO/MFA) 요구 조건 확인하기', description: '일반 조직에서 보안 요구가 높은 기업 조직으로 전환할 때 해당 조직이 요구하는 SSO 로그인이나 MFA 조건을 추가로 확인합니다.' },
        { name: '구성원 제외(Offboarding)와 단독 소유권 점검하기', description: '구성원이 스스로 나가거나 관리자가 제외할 때 해당 조직의 유일한 소유자가 아닌지 확인하고, 제외 즉시 해당 조직 화면 접근을 차단합니다.' },
        { name: '비활성·권한 상실 조직 접근 시 안전하게 복귀하기', description: '마지막으로 열었던 조직에서 제외되었거나 조직이 정지된 경우 무한 오류 대신 다른 소속 조직이나 개인 공간 선택 화면으로 안내합니다.' },
      ],
      pitfalls: [
        { name: '브라우저 공용 상태 하나로 활성 조직을 관리해 멀티 탭에서 다른 조직에 저장하기', description: '탭 A에서 조직을 바꿨다고 탭 B의 작성 중 요청이 바뀐 조직으로 전송되면 데이터가 섞입니다. 요청과 경로에 대상 조직 ID를 명시하세요.' },
        { name: '조직에서 구성원을 제거할 때 사용자 계정 자체를 삭제해 버리기', description: '한 프로젝트 조직에서 나갔는데 사용자의 개인 공간이나 다른 회사 조직까지 로그인이 막히지 않도록 멤버십 제거와 계정 탈퇴를 엄격히 구분하세요.' },
        { name: '마지막으로 방문한 조직의 권한이 회수되었을 때 로그인 직후 오류 화면에 갇히기', description: '기본 진입 조직에 더 이상 접근할 수 없으면 자동으로 남은 소속 조직이나 조직 선택 화면으로 이동시켜야 합니다.' },
      ],
      questions: [
        '사용자 한 명이 개인 공간과 여러 조직(워크스페이스)에 동시에 소속되어 전환할 수 있나요?',
        '조직마다 사용자의 역할(관리자·구성원·게스트)과 보안 요구사항(MFA·SSO 필수 여부)이 다르게 적용되나요?',
        '여러 브라우저 탭을 열어 두고 한 탭에서 조직을 전환했을 때 다른 탭의 화면과 저장 요청은 어떻게 보호하나요?',
        '구성원이 특정 조직에서 제외되거나 퇴사할 때 그 사용자가 조직 안에서 만든 데이터 소유권과 타 조직 이용은 어떻게 되나요?',
        '기업이 회사 이메일 도메인을 관리 대상으로 등록할 때 기존에 같은 회사 메일로 쓰던 계정의 개인 데이터는 어떻게 처리하나요?',
      ],
      example: '예시: 사용자가 개인 공간과 2개의 팀 조직을 상단 스위처로 오가되 URL 경로(`/org/:slug`)로 탭별 맥락을 분리하고, 특정 조직에서 제외되면 해당 조직 산출물은 조직에 남고 사용자는 개인 공간으로 안전하게 이동하도록 구성할 수 있습니다. 실제 도메인 귀속 정책과 조직별 SSO 강제는 서비스 계약 구조에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'closable-document-tabs', reason: '소속 공간이나 열려 있는 작업 문맥을 구분해 전환하고 닫는 상단 탭 표현에 참고할 수 있습니다. 실제 조직별 권한 검증과 라우팅 격리는 별도로 구현해야 합니다.' },
        { id: 'inline-delete-confirmation', reason: '조직에서 구성원을 제외하거나 본인이 조직에서 나가기 전에 상실되는 접근 범위를 확인하는 표현에 참고할 수 있습니다. 실제 멤버십 회수는 구현하지 않습니다.' },
      ],
      promptSnippet: '계정·인증 서비스의 다중 조직(워크스페이스) 전환, 멤버십 회수, 개인·기업 계정 귀속 흐름을 설계해 줘. 먼저 단일 계정의 다중 조직 소속 허용 여부, 조직별 역할·보안 조건(MFA/SSO), 멀티 탭에서의 조직 맥락 격리 방식, 구성원 제외 시 데이터 소유권과 계정 유지 기준, 기업 도메인 귀속 정책을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 사용자 계정(Identity)과 조직별 멤버십·역할·개인 공간의 관계 구조.\n2. 조직 전환 시 권한·메뉴 갱신, 추가 인증(SSO/MFA) 확인, 멀티 탭 간 맥락 충돌 방지.\n3. 조직 나가기·관리자 제외 시 단독 소유자 확인, 조직 산출물 귀속, 남은 소속으로의 복귀.\n4. 기업 이메일 도메인 관리 전환 시 기존 계정의 개인 작업 분리 또는 귀속 절차.\n5. 헤더 조직 전환기·초대 수락 배너·구성원 관리 목록·접근 상실 안내 화면의 연결.\n한 조직의 멤버십 해제를 전체 계정 탈퇴와 같다고 가정하지 말고, 예시 정책과 디자인 데모를 실제 멀티테넌트 인가 구현으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Auth & Account',
      title: 'Multi-organization switching and personal-versus-enterprise account ownership',
      summary: 'Separate user identity from per-organization memberships, and handle context switching, offboarding and enterprise domain ownership.',
      overview: 'In modern SaaS tools, one person often belongs to a personal workspace and multiple company or client organizations at the same time. Separating the underlying user account from per-organization memberships prevents cross-tenant data leaks when switching tabs and ensures that removing someone from one company revokes only that organization’s access without destroying their personal account. These concepts are design references, not default enterprise terms.',
      concepts: [
        { name: 'User identity versus per-organization membership', description: 'Model one user identity linked to multiple organization memberships, each with its own role (owner, admin, member, guest) and status.' },
        { name: 'Context switching and multi-tab isolation', description: 'Scope routes and API requests to an explicit organization identifier so switching organizations in one browser tab does not silently redirect saves in another tab.' },
        { name: 'Organization offboarding versus account deletion', description: 'When removing a member from an organization, revoke their access to that organization and keep their work owned by the organization while leaving their personal account and other memberships intact.' },
        { name: 'Enterprise domain claiming and personal data separation', description: 'Define what happens when an enterprise verifies and claims a corporate email domain already used by employees for personal workspaces.' },
      ],
      workflow: [
        { name: 'List memberships and switch active organization', description: 'Show personal spaces, active organizations and pending invites in an organization switcher, and update navigation and permissions on switch.' },
        { name: 'Enforce organization-specific SSO or MFA on switch', description: 'When switching into a stricter enterprise organization, prompt for required MFA or enterprise SSO before granting access.' },
        { name: 'Offboard members and check sole-owner constraints', description: 'Verify that another owner exists before a user leaves or is removed from an organization, and immediately invalidate access to that organization.' },
        { name: 'Fallback cleanly when the last-used organization is inaccessible', description: 'If a user’s default organization revokes their membership, redirect them to another valid membership or an organization picker instead of a broken error loop.' },
      ],
      pitfalls: [
        { name: 'Storing active organization only in a shared cookie across multiple tabs', description: 'If Tab A switches from Org 1 to Org 2 and Tab B relies on an implicit session org without checking the target org ID, edits in Tab B may save into the wrong tenant.' },
        { name: 'Deleting the user identity when removing them from one organization', description: 'Offboarding a contractor from one client workspace must never wipe their account or lock them out of their other workspaces.' },
        { name: 'Trapping users on a 403 screen when their last-visited org removes them', description: 'Always provide a working switcher or fallback route when the previously active organization is no longer accessible.' },
      ],
      questions: [
        'Can a single user account belong to a personal workspace and multiple organizations simultaneously?',
        'Can each organization enforce its own role permissions and authentication rules (such as mandatory MFA or SSO)?',
        'How are URLs and requests scoped so switching organizations in one browser tab does not corrupt actions in another open tab?',
        'When a member leaves or is removed from an organization, who retains ownership of their created items and what happens to their other memberships?',
        'If an enterprise claims a corporate email domain, how are existing accounts and personal workspaces on that domain migrated or separated?',
      ],
      example: 'Example: an app could scope every workspace URL by `/org/:slug`, require step-up SSO when switching into an enterprise org, keep items owned by the org when a member is removed, and route removed users back to their personal workspace. Confirm actual domain-claim rules and tenant isolation requirements before adopting this setup.',
      relatedDesigns: [
        { id: 'closable-document-tabs', reason: 'A reference for switching between distinct workspace or document contexts in a top bar. Real tenant scoping and authorization checks need separate implementation.' },
        { id: 'inline-delete-confirmation', reason: 'A reference for confirming before leaving an organization or removing a member. Real membership revocation and session updates need separate implementation.' },
      ],
      promptSnippet: 'Help design multi-organization switching, membership offboarding and personal-versus-enterprise account ownership. First confirm whether one account can join multiple organizations, whether organizations have separate roles and MFA/SSO rules, how multi-tab organization context is isolated, what happens to content and accounts on offboarding, and how enterprise domain claims work. Do not assume undecided rules.\nBased on the answers, describe:\n1. Relationship between user identity, personal workspaces and per-organization memberships/roles.\n2. Context-switching behavior, org-specific MFA/SSO prompts and multi-tab request isolation.\n3. Member removal or leave flows, sole-owner checks, content ownership and fallback routing.\n4. Handling of existing accounts and personal data when an enterprise claims a corporate domain.\n5. How the organization switcher, pending-invite banner, member list and access-revoked fallback screen connect.\nDo not conflate removing an organization membership with deleting a user account, and do not mistake example policies or design demos for real multi-tenant authorization.',
    },
  },
  sources: [
    { title: 'Auth0 Docs — Understand how Auth0 Organizations work', url: 'https://auth0.com/docs/manage-users/organizations/organizations-overview' },
    { title: 'Atlassian Support — Verify a domain to manage accounts', url: 'https://support.atlassian.com/user-management/docs/verify-a-domain-to-manage-accounts/' },
  ],
}, {
  id: 'account-email-phone-change-and-reverification',
  aliases: {
    ko: ['대표 이메일 변경 인증', '휴대폰 번호 변경 재인증', '구 연락처 변경 알림과 보호', '미확정 연락처 대기'],
    en: ['primary email change verification', 'phone number update flow', 'old address security alert', 'pending contact verification'],
  },
  useCases: {
    ko: ['로그인 아이디나 주요 알림 수신처로 쓰는 대표 이메일·휴대폰 번호를 바꿀 때', '새 연락처 인증이 끝나기 전까지 기존 대표 연락처를 그대로 유지할 때', '연락처 변경 시 기존(구) 이메일·번호로도 즉시 안내를 보내거나 취소·잠금 경로를 제공할 때', '이미 다른 계정에 등록된 이메일·번호 충돌과 재발송 제한을 처리할 때'],
    en: ['Changing the primary email address or phone number used for sign-in and alerts', 'Keeping the current address active until the new address completes verification', 'Sending a security notice or rollback link to the old email address when a change is requested', 'Handling duplicate-contact conflicts and resend rate limits during verification'],
  },
  keywords: {
    ko: ['이메일 변경', '휴대폰 번호 변경', '연락처 재인증', '구 이메일 알림', '인증 대기', '계정 탈취 방지', '인증 코드 만료', '중복 연락처'],
    en: ['email change', 'phone number change', 'contact reverification', 'old email notification', 'pending verification', 'account takeover prevention', 'verification code', 'duplicate email'],
  },
  text: {
    ko: {
      domain: '계정·인증',
      title: '대표 이메일·휴대폰 번호 변경 시 구/신 연락처 검증과 기존 수단 보호',
      summary: '새 연락처 검증 완료 전까지 기존 대표 연락처를 유지하고, 본인 재인증과 구 연락처 보안 알림을 함께 연결합니다.',
      overview: '대표 이메일이나 휴대폰 번호는 비밀번호 재설정과 보안 알림을 받는 핵심 열쇠입니다. 만약 입력값을 수정하자마자 검증 없이 대표 이메일을 덮어쓰거나, 기존 이메일로 아무런 알림도 보내지 않으면 공격자가 잠깐 열린 세션에서 계정을 영구적으로 가로챌 수 있습니다. 재인증, 새 연락처 검증 대기 상태, 구 연락처 알림과 복구 경로를 함께 설계해야 합니다. 아래 내용은 연락처 변경 설계를 위한 참고이며 특정 인증 유효 시간을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '현재 대표 연락처 유지와 변경 대기(Pending) 분리', description: '새 이메일이나 전화번호를 입력해도 인증 코드를 통과하기 전까지는 기존 연락처를 대표 상태로 유지하고, 새 연락처는 검증 대기 상태로만 보관합니다.' },
        { name: '변경 요청 시 본인 재인증과 구·신 양방향 확인', description: '연락처 변경을 시작할 때 현재 비밀번호나 2차 인증을 확인하고, 새 연락처 소유 확인뿐 아니라 기존 연락처에도 변경 요청 사실을 즉시 알립니다.' },
        { name: '구 연락처 접근 불가 시와 탈취 의심 시 대응', description: '사용자가 예전 이메일·번호를 이미 해지해 볼 수 없는 경우의 변경 절차와, 본인이 요청하지 않은 변경 알림을 기존 메일에서 발견했을 때의 즉시 취소·잠금 경로를 구분합니다.' },
        { name: '연동된 소셜 로그인 및 청구서 수신처와의 구분', description: '로그인·보안용 대표 이메일을 바꾸는 것이 소셜 로그인(OAuth) 연결 이메일이나 결제 영수증 수신 이메일도 함께 바꾸는지 명확히 구분합니다.' },
      ],
      workflow: [
        { name: '본인 재인증 후 새 연락처와 중복 여부 확인하기', description: '비밀번호 또는 MFA 재인증을 거친 뒤 새 이메일·번호 형식을 확인하고, 다른 계정에서 이미 사용 중인지 검사합니다.' },
        { name: '새 연락처로 인증 코드 발송 및 구 연락처로 안내 보내기', description: '새 연락처에는 인증 코드·링크를 보내고, 기존 연락처에는 변경 시도 안내(새 연락처 일부 마스킹)와 이상 시 조치 방법을 발송합니다.' },
        { name: '인증 완료 시 대표 연락처 교체 및 세션 갱신하기', description: '유효 시간 안에 새 연락처 인증이 완료되면 그제야 대표 연락처를 교체하고, 변경 완료 알림을 양쪽에 기록합니다.' },
        { name: '대기 중 취소·재발송 및 오입력 수정 지원하기', description: '인증 대기 중에 오타를 발견하면 대기 요청을 취소하거나 새 주소로 다시 입력해 재발송할 수 있게 합니다.' },
      ],
      pitfalls: [
        { name: '새 이메일 인증이 끝나기 전에 기존 대표 이메일을 먼저 덮어쓰기', description: '사용자가 새 이메일에 오타를 냈는데 즉시 대표 이메일이 바뀌면 인증 메일도 못 받고 기존 이메일로 로그인도 못 하게 됩니다.' },
        { name: '기존 이메일에 아무런 알림 없이 조용히 연락처를 바꿔 버리기', description: '계정이 도용되었을 때 원래 주인이 알아차릴 유일한 단서가 기존 이메일 알림입니다. 변경 요청 및 완료 사실을 기존 연락처에도 알리세요.' },
        { name: '인증 대기 중인 새 이메일로 이미 비밀번호 재설정을 허용하기', description: '아직 소유가 확인되지 않은 대기(Pending) 이메일로는 계정 복구나 주요 보안 알림이 발송되지 않아야 합니다.' },
      ],
      questions: [
        '대표 이메일이나 휴대폰 번호를 변경할 때 새 연락처 인증만 거치나요, 기존 연락처 확인이나 비밀번호·MFA 재인증도 필요한가요?',
        '사용자가 기존 이메일이나 휴대폰 번호에 더 이상 접근할 수 없을 때는 어떤 절차로 변경을 허용하나요?',
        '새 연락처 인증이 완료되기 전까지 로그인·알림·비밀번호 찾기는 기존 연락처로 유지되나요?',
        '기존 연락처로 변경 알림을 보낼 때 본인이 아닌 경우 변경을 취소하거나 계정을 잠그는 링크를 제공하나요?',
        '대표 이메일을 변경하면 결제 영수증 수신 메일이나 연동된 소셜 로그인 정보도 함께 바뀌나요, 별개로 유지되나요?',
      ],
      example: '예시: 대표 이메일 변경 시 현재 비밀번호를 먼저 확인하고, 새 이메일이 인증되기 전까지는 기존 이메일을 그대로 대표로 유지하며, 기존 이메일로 변경 안내와 48시간 유효한 변경 취소 링크를 함께 보내도록 구성할 수 있습니다. 실제 구 연락처 필수 확인 여부와 취소 유예 시간은 서비스 보안 정책에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'inline-email-validation', reason: '변경할 새 이메일 주소의 형식 오류나 기존 주소와의 동일 여부를 즉시 안내하는 표현에 참고할 수 있습니다. 실제 중복 확인과 인증 메일 발송은 별도로 구현해야 합니다.' },
        { id: 'dismissible-inline-banner', reason: '계정 설정 상단에 새 이메일 인증 대기 상태와 남은 유효 시간, 재발송·취소 버튼을 보여 주는 표현에 참고할 수 있습니다. 실제 인증 상태 전환은 구현하지 않습니다.' },
      ],
      promptSnippet: '계정·인증 서비스의 대표 이메일·휴대폰 번호 변경 및 재인증 흐름을 설계해 줘. 먼저 변경 시작 시 재인증(비밀번호·MFA) 요구 여부, 구 연락처 접근 불가 시 처리, 새 연락처 검증 전 기존 대표 연락처 유지 규칙, 구 연락처로의 보안 알림 및 변경 취소/잠금 제공 여부, 소셜 연동·청구 이메일과의 분리 기준을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 현재 대표 연락처와 검증 대기(Pending) 새 연락처의 분리 구조 및 로그인·알림 기준.\n2. 본인 재인증, 중복 연락처 검사, 새 연락처 인증 코드 발송·재발송·취소 흐름.\n3. 기존(구) 연락처로 발송할 보안 안내 범위와 비인가 변경 시 취소·잠금 조치.\n4. 인증 만료·오입력 수정·구 연락처 분실 시의 예외 처리.\n5. 계정 설정 연락처 영역·재인증 모달·인증 대기 배너·코드 입력 화면의 연결.\n새 연락처 입력 즉시 미인증 상태로 대표 연락처를 덮어쓰지 말고, 예시 정책과 디자인 데모를 실제 계정 보안 구현으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Auth & Account',
      title: 'Primary email or phone change verification and old-address notification',
      summary: 'Keep the current primary contact active until the new one is verified, require reauthentication, and notify the old address.',
      overview: 'A user’s primary email address or phone number controls password resets and security alerts. Overwriting the primary address before the new one is verified—or failing to notify the previous address—can lock out a user who made a typo or let an attacker silently hijack an open session. Combine step-up reauthentication, a pending-verification state and old-address notifications. These concepts are design references, not default security lifetimes.',
      concepts: [
        { name: 'Active primary contact versus pending replacement', description: 'Keep the existing email or phone as the active primary address for sign-in and recovery until the candidate address completes verification.' },
        { name: 'Reauthentication and dual-address notification', description: 'Require password or MFA confirmation before starting a change, verify ownership of the new address, and send an immediate security notice to the old address.' },
        { name: 'Lost access to old contact versus unauthorized change revert', description: 'Distinguish users who no longer control their old inbox from account-takeover cases where the legitimate owner clicks a revert/lock link in the old-address alert.' },
        { name: 'Primary sign-in email versus billing or OAuth emails', description: 'Clarify whether updating the primary account email also updates billing invoice recipients or stays independent from linked OAuth provider identities.' },
      ],
      workflow: [
        { name: 'Reauthenticate and validate the candidate contact', description: 'Confirm the user’s current credential or MFA factor, check email/phone formatting, and ensure the new contact is not already claimed.' },
        { name: 'Send verification to the new contact and alert the old one', description: 'Dispatch a time-limited verification code or link to the new address while notifying the old address of the requested change.' },
        { name: 'Promote the new contact only upon verification', description: 'Swap the candidate contact into the primary slot once verified, record an audit event, and confirm completion.' },
        { name: 'Allow cancelling or correcting a pending change', description: 'Let the user cancel a pending change or fix a mistyped candidate address without losing access to their current primary email.' },
      ],
      pitfalls: [
        { name: 'Overwriting the primary email before the new address is verified', description: 'If a typo in the new email immediately replaces the primary address, the user cannot receive the verification email and is locked out.' },
        { name: 'Changing contact details silently without alerting the previous address', description: 'Always send a notification to the old email or phone so the owner can spot and halt an unauthorized takeover.' },
        { name: 'Allowing password resets to be sent to an unverified pending email', description: 'Never route recovery links or sensitive alerts to a candidate address while it is still pending verification.' },
      ],
      questions: [
        'Does changing the primary email or phone require password/MFA reauthentication, verification of the new contact, or approval from the old contact as well?',
        'How can a user update their contact information if they have permanently lost access to their old email inbox or phone number?',
        'While the new email is pending verification, does the old email remain active for sign-in, alerts and password resets?',
        'Does the security alert sent to the old address include a one-click link to cancel the change or lock the account?',
        'Does changing the primary account email also change billing notification emails or linked social sign-in providers?',
      ],
      example: 'Example: changing a primary email could require password re-entry, store the new address in a pending banner until its 6-digit code is verified, keep sign-in on the old email in the meantime, and email the old address a notice with a 48-hour revert link. Confirm actual verification steps and revert windows before adopting this setup.',
      relatedDesigns: [
        { id: 'inline-email-validation', reason: 'A reference for validating the new email format inline before sending a verification code. Real duplicate checks and email delivery need separate implementation.' },
        { id: 'dismissible-inline-banner', reason: 'A reference for showing a pending-verification banner with resend and cancel actions on the account settings page. Real contact promotion logic needs separate implementation.' },
      ],
      promptSnippet: 'Help design a primary email or phone number change and reverification workflow. First confirm reauthentication requirements, whether users who lost access to their old address can still verify, how the existing primary contact is preserved while the new one is pending, what security notice or revert action goes to the old address, and how billing or social emails are affected. Do not assume undecided rules.\nBased on the answers, describe:\n1. Separation between the active primary contact and the pending candidate contact for sign-in and recovery.\n2. Step-up verification, duplicate checks, code verification, resend and cancel flows.\n3. Security notifications sent to the old address and unauthorized-change revert or lock actions.\n4. Handling of expired codes, mistyped candidate addresses and lost access to the old contact.\n5. How the contact settings form, reauthentication modal, pending-verification banner and code entry screen connect.\nDo not overwrite the active primary contact before verification succeeds, and do not mistake example policies or design demos for real account security implementation.',
    },
  },
  sources: [
    { title: 'OWASP Cheat Sheet Series — Credential Stuffing & Account Change Protection', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html' },
    { title: 'GitHub Docs — Changing your primary email address', url: 'https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/changing-your-primary-email-address' },
  ],
}, {
  id: 'account-dormancy-lockout-and-reactivation',
  aliases: {
    ko: ['장기 미접속 휴면 계정', '보안 잠금과 운영 정지 구분', '휴면 해제 본인 확인', '잠금 사유별 복귀 절차'],
    en: ['dormant account reactivation', 'security lockout vs suspension', 'inactive account lifecycle', 'account unlock verification'],
  },
  useCases: {
    ko: ['장기 미접속으로 인한 휴면 계정과 로그인 연속 실패·이상 징후로 인한 보안 잠금을 구분할 때', '관리자 운영 정지(약관 위반 등)와 사용자 보호용 임시 잠금의 안내 화면을 다르게 구성할 때', '휴면 전환 전 사전 예고 알림과 로그인 시 본인 확인 후 즉시 활성 복귀 흐름을 만들 때', '휴면 중 알림 발송 중단·프로필 비노출 범위와 해제 후 기존 데이터 복원을 정의할 때'],
    en: ['Distinguishing long-term inactivity dormancy from security lockouts and policy suspensions', 'Showing appropriate recovery paths for temporary brute-force locks versus admin suspensions', 'Notifying users before dormancy and guiding self-serve reactivation upon return', 'Defining how notifications and profile exposure pause during dormancy and restore on reactivation'],
  },
  keywords: {
    ko: ['휴면 계정', '휴면 해제', '장기 미접속', '보안 잠금', '로그인 실패 잠금', '계정 정지', '활성 복귀', '사전 안내', '본인 확인'],
    en: ['dormant account', 'account reactivation', 'inactivity policy', 'security lockout', 'brute-force lock', 'account suspension', 'unlock flow', 'pre-dormancy notice', 'identity verification'],
  },
  text: {
    ko: {
      domain: '계정·인증',
      title: '장기 미접속 휴면·보안 잠금 분리와 본인 확인 후 활성 복귀',
      summary: '장기 미접속 휴면, 보안 위협 잠금, 운영 정지를 구분하고 각 상태에 맞는 안내와 활성 복귀 절차를 연결합니다.',
      overview: '로그인이 막혔을 때 모든 경우를 똑같이 "이용이 제한된 계정입니다"라고만 띄우면 사용자는 왜 막혔는지, 어떻게 풀어야 하는지 알 수 없습니다. 오랫동안 접속하지 않아 전환된 휴면 상태인지, 비밀번호 연속 오류나 낯선 접속으로 보호 잠금이 걸린 것인지, 운영 정책 위반으로 정지된 것인지를 나누어야 안내 문구와 복구 수단이 명확해집니다. 아래 내용은 휴면·잠금·복귀 설계를 위한 참고이며 특정 보관 기간이나 제재 기준을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '휴면(Dormant)·임시 보안 잠금(Locked)·운영 정지(Suspended) 구분', description: '장기 미접속으로 분리 보관된 휴면, 연속 실패나 이상 접속을 막기 위한 보안 잠금, 운영자 조치로 차단된 정지 상태를 각각 다른 상태와 복구 경로로 다룹니다.' },
        { name: '휴면 전환 사전 안내와 휴면 중 처리 범위', description: '휴면 전환 전 사전 안내 시점과 휴면 상태에서 마케팅·일반 알림 중단, 외부 프로필 노출 숨김, 자동 결제 유지·중단 여부를 정의합니다.' },
        { name: '임시 시도 제한(Cooldown)과 본인 확인 잠금 해제', description: '짧은 시간 뒤 자동으로 풀리는 로그인 시도 제한과, 이메일·본인 인증이나 비밀번호 재설정을 거쳐야만 풀리는 보안 잠금을 구분합니다.' },
        { name: '휴면 해제 및 잠금 해제 후 정상 상태 복원', description: '사용자가 돌아와 인증을 마치면 휴면 분리 데이터를 원래 상태로 복원하고, 보안 잠금 해제 시에는 기존 의심 세션을 정리한 뒤 진입시킵니다.' },
      ],
      workflow: [
        { name: '미접속 기간 집계와 사전 안내 발송하기', description: '마지막 로그인·활동 기준일을 추적해 휴면 예정 대상자에게 사전 안내와 간편 연장(로그인) 경로를 보냅니다.' },
        { name: '로그인 시 계정 상태별 전용 안내 화면 분기하기', description: '인증 직후 계정이 휴면이면 휴면 해제 동의로, 보안 잠금이면 본인 확인·비밀번호 재설정으로, 운영 정지이면 사유와 고객센터 문의 경로로 분기합니다.' },
        { name: '본인 확인 후 즉시 활성 복귀 실행하기', description: '휴면 해제 확인이나 잠금 해제 인증 코드를 통과하면 계정 상태를 정상 활성으로 바꾸고 기존 설정과 데이터를 복원합니다.' },
        { name: '복귀 완료 안내와 보안 점검 연결하기', description: '보안 잠금에서 복귀한 경우 최근 로그인 기록과 비밀번호 변경을 안내하고, 휴면에서 복귀한 경우 오래된 연락처·알림 설정을 확인하게 합니다.' },
      ],
      pitfalls: [
        { name: '휴면 계정과 약관 위반 정지 계정에 똑같은 차단 문구를 띄우기', description: '오랜만에 돌아온 휴면 사용자에게 정지·차단 같은 경고 문구를 보여 주면 이탈합니다. 반갑게 맞이하며 간단한 확인으로 복귀시키세요.' },
        { name: '유료 정기결제는 계속 청구하면서 계정만 휴면으로 잠가 버리기', description: '휴면 전환 기준을 잡을 때 활성 구독·정기결제 보유 계정의 처리 규칙이 빠지면 결제 분쟁이 생깁니다.' },
        { name: '비밀번호 오류 잠금을 영구 잠금으로만 두어 공격자가 타인 계정을 마비시키기', description: '아이디만 알면 누구나 고의로 틀려 잠글 수 있으므로 시간 경과 후 완화나 이메일 인증을 통한 자가 해제 경로를 함께 제공하세요.' },
      ],
      questions: [
        '장기 미접속 휴면 계정을 운영하나요? 기준 기간(예: 1년 미접속)과 전환 전 사전 알림 시점은 어떻게 되나요?',
        '휴면 전환 시 숨겨지는 정보·중단되는 알림은 무엇이며, 유료 구독 중인 계정도 휴면 대상에 포함되나요?',
        '로그인 연속 실패 시 일정 시간 대기(Cooldown) 후 재시도를 허용하나요, 이메일·본인 인증으로 잠금을 풀게 하나요?',
        '휴면 계정 복귀, 보안 잠금 해제, 운영 정지 안내 화면에서 각각 사용자에게 어떤 행동 수단을 제공하나요?',
        '휴면이나 잠금 상태가 아주 오래 지속된 계정은 별도 파기(탈퇴) 절차로 넘어가나요?',
      ],
      example: '예시: 12개월 미접속 시 30일 전 이메일 안내 후 휴면으로 전환하되 로그인 후 이메일 인증 1회로 즉시 복귀할 수 있게 하고, 비밀번호 5회 오류 시에는 15분 대기 또는 이메일 인증으로 풀 수 있는 임시 보안 잠금 화면을 보여주며, 운영 정지 계정은 사유 안내와 고객센터 문의 링크만 표시하도록 구성할 수 있습니다. 실제 휴면 기간과 잠금 임계치는 서비스 정책에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'dismissible-inline-banner', reason: '휴면 복귀나 보안 잠금 해제 직후 연락처 최신화나 최근 로그인 기록 점검을 권유하는 상단 안내 배너 표현에 참고할 수 있습니다. 실제 계정 복원 처리는 별도로 구현해야 합니다.' },
        { id: 'onboarding-progress-checklist', reason: '보안 잠금 해제나 장기 휴면 복귀 시 본인 확인·비밀번호 변경·연락처 확인 단계를 차례로 안내하는 표현에 참고할 수 있습니다. 실제 인증 검증은 구현하지 않습니다.' },
      ],
      promptSnippet: '계정·인증 서비스의 장기 미접속 휴면, 보안 잠금, 운영 정지 분리 및 활성 복귀 흐름을 설계해 줘. 먼저 휴면 전환 기준과 사전 알림·구독 계정 예외 여부, 로그인 실패 및 이상 징후 시 보안 잠금 방식(시간 대기 vs 인증 해제), 휴면·보안 잠금·운영 정지별 안내 화면과 복귀 절차, 복귀 후 데이터·알림 복원 범위를 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 정상·휴면 예정·휴면·임시 보안 잠금·운영 정지 상태의 구분과 전환 조건.\n2. 휴면 중 알림 중단·프로필 비노출·결제 처리 규칙과 사전 예고 흐름.\n3. 상태별 로그인 진입 시 보여줄 전용 안내 화면과 자가 해제(본인 확인·비밀번호 재설정) 또는 문의 경로.\n4. 해제 완료 시 데이터·권한 복원, 의심 세션 만료, 복귀 후 보안 점검 안내.\n5. 로그인 상태 분기 화면·휴면 해제 확인·보안 잠금 해제 인증·복귀 후 안내 배너의 연결.\n휴면과 보안 잠금·운영 정지를 하나의 에러 상태로 뭉뚱그리지 말고, 예시 정책과 디자인 데모를 실제 계정 잠금/복원 백엔드로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Auth & Account',
      title: 'Dormant accounts versus security lockouts and reactivation flows',
      summary: 'Distinguish inactivity dormancy, protective security lockouts and policy suspensions, and provide clear reactivation paths for each.',
      overview: 'When a user cannot sign in, a generic "Account disabled" message leaves them guessing whether they typed the wrong password too many times, were away for a year, or violated terms of service. Separating inactivity dormancy, protective security lockouts and administrative suspensions ensures each state has the right messaging, notification rules and recovery path. These concepts are design references, not default legal or security thresholds.',
      concepts: [
        { name: 'Dormant versus security-locked versus suspended states', description: 'Distinguish accounts archived due to long-term inactivity (dormant), accounts paused to block brute-force or suspicious sign-ins (locked), and accounts restricted by moderators (suspended).' },
        { name: 'Pre-dormancy notices and dormant account behavior', description: 'Define when inactivity warnings are sent, how optional notifications and public profile presence pause during dormancy, and how active paid subscriptions are handled.' },
        { name: 'Cooldown rate limits versus verification unlocks', description: 'Separate short timed cooldowns after repeated wrong passwords from protective lockouts that require email verification or a password reset to clear.' },
        { name: 'Self-serve reactivation and post-unlock hygiene', description: 'Restore a dormant account immediately after sign-in and verification, and revoke suspicious sessions or prompt for a password update after a security unlock.' },
      ],
      workflow: [
        { name: 'Track last activity and send pre-dormancy reminders', description: 'Monitor qualifying account activity and notify inactive users ahead of time with a simple sign-in action to stay active.' },
        { name: 'Route sign-in attempts to state-specific screens', description: 'Show a welcoming reactivation prompt for dormant users, a verification/reset flow for security-locked users, and a policy notice with support contact for suspended accounts.' },
        { name: 'Verify ownership and restore active status', description: 'Complete the required email code, MFA check or password reset, transition the account back to active, and restore profile and workspace access.' },
        { name: 'Prompt for post-recovery checks', description: 'After a security unlock, review active devices; after dormancy reactivation, ask the user to confirm their contact details and notification preferences.' },
      ],
      pitfalls: [
        { name: 'Showing a punitive "Account banned" screen to returning dormant users', description: 'Treating long-time returning users like policy violators drives them away. Use welcoming copy and a quick one-step reactivation.' },
        { name: 'Moving an account to dormancy while still billing an active subscription', description: 'Ensure inactivity rules account for recurring billing so users are never charged while locked out as dormant.' },
        { name: 'Permanent password-failure lockouts with no self-serve unlock path', description: 'If five wrong passwords permanently lock an account until support intervenes, attackers can easily lock out legitimate users by guessing their email.' },
      ],
      questions: [
        'Does the service transition inactive accounts to a dormant state, after what period, and with what advance notice?',
        'What happens to notifications, profile exposure and active subscriptions when an account becomes dormant?',
        'When sign-in fails repeatedly, does the account use a timed cooldown, require email/MFA verification, or require a password reset?',
        'What specific screen and recovery action are shown for dormant accounts versus security-locked accounts versus policy-suspended accounts?',
        'Are accounts that remain dormant or locked past a final threshold eventually scheduled for deletion?',
      ],
      example: 'Example: a service could notify users 30 days before marking 12-month inactive accounts dormant, let dormant users reactivate immediately via a single email code on sign-in, apply a 15-minute cooldown or email-unlock challenge after 5 failed password attempts, and show a support appeal link for policy suspensions. Confirm actual inactivity periods and lockout thresholds before adopting this setup.',
      relatedDesigns: [
        { id: 'dismissible-inline-banner', reason: 'A reference for prompting a newly reactivated or unlocked user to review recent sign-in activity or outdated contact details. Real account restoration needs separate implementation.' },
        { id: 'onboarding-progress-checklist', reason: 'A reference for stepping a user through identity verification, password rotation and session review after a security lockout. Real verification logic needs separate implementation.' },
      ],
      promptSnippet: 'Help design account dormancy, protective security lockouts and reactivation workflows. First confirm inactivity thresholds and pre-dormancy notices (including paid-subscription rules), brute-force cooldown versus verification unlock rules, distinct screens for dormant, security-locked and suspended states, and data/session restoration behavior on reactivation. Do not assume undecided rules.\nBased on the answers, describe:\n1. State definitions and transitions across active, pre-dormant, dormant, security-locked and suspended accounts.\n2. Notification pausing, profile exposure and billing handling during dormancy.\n3. Sign-in routing and recovery actions for each non-active state (self-serve reactivation, verification unlock, support appeal).\n4. Restoration of account data, cleanup of suspicious sessions and post-recovery prompts.\n5. How the sign-in state router, dormancy reactivation screen, security unlock challenge and post-return banner connect.\nDo not lump dormancy, security lockouts and policy suspensions into a single generic error screen, and do not mistake example policies or design demos for a real authentication backend.',
    },
  },
  sources: [
    { title: 'OWASP Cheat Sheet Series — Blocking Brute Force Attacks and Account Lockout', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#account-lockout' },
    { title: 'Google Account Help — Inactive Google Account Policy', url: 'https://support.google.com/accounts/answer/12418290' },
  ],
}];
