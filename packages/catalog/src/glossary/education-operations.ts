import type { GlossaryTermBody } from './types';

export const EDUCATION_OPERATIONS_GLOSSARY_DATA: Record<string, GlossaryTermBody> = {
  'learning-management-system': {
    aliases: {
      ko: ['LMS', '학습 관리', '학습 관리 시스템', '온라인 강의 시스템', '수강 관리'],
      en: ['LMS', 'learning management system', 'learning platform', 'course management'],
    },
    text: {
      ko: {
        definition: '학습자 등록, 반·코호트 운영, 강좌 배정, 참여·진도율 추적, 과제·평가를 통합 관리하는 시스템입니다. 콘텐츠 제작·발행 중심의 CMS와 구분되며, 학습자 권한과 진도 산정 기준은 서비스 정책에 맞춰 확인해야 합니다.',
        example: '코호트별로 수강생을 배정하고 각 차시 완료 여부와 퀴즈 제출 상태를 기록해 강사와 관리자가 이수 현황을 확인합니다.',
        promptSnippet: '학습 관리 시스템(LMS) 기능을 설계할 때 학습자·반/코호트·강좌 배정·참여/진도·평가 엔티티를 분리해 CMS와 구분하고, 학습자 권한 범위와 진도율 계산 기준을 서비스 정책에 맞게 먼저 확인하도록 해 줘.',
      },
      en: {
        definition: 'A system for managing learners, cohorts or classes, course assignments, participation/progress tracking, and assessments. It differs from a CMS, and learner permissions plus progress calculation rules must be confirmed per service.',
        example: 'Assign learners to a cohort, track module participation and assessment submissions per enrollment, and surface completion status for instructors.',
        promptSnippet: 'Model a Learning Management System (LMS) around learners, cohorts, course assignments, progress, and assessments distinct from a CMS, confirming learner permission boundaries and progress calculation rules per service.',
      },
    },
  },
  'curriculum-alignment': {
    aliases: {
      ko: ['교육과정 연계', '성취기준 연계', '커리큘럼 매핑', '학습 목표 연계', '교과 연계'],
      en: ['curriculum alignment', 'curriculum mapping', 'standards alignment', 'learning objective alignment'],
    },
    text: {
      ko: {
        definition: '콘텐츠·실습 활동을 정해진 학습 목표나 성취기준에 대응해 매핑하는 과정입니다. 항목을 연계했다고 해서 공식 인증 획득이나 교육과정 전체 범위 충족을 자동으로 의미하지는 않습니다.',
        example: '블록 코딩 실습 단원을 해당 학년군 문제 분해 성취기준에 연결하면서, 어떤 활동이 근거인지와 아직 다루지 않은 미포함 기준을 함께 기록합니다.',
        promptSnippet: '교육과정 연계(매핑) 기능을 설계할 때 기준 버전, 대상 학년·수준, 연계 근거·사유, 미충족 공백(Gap)을 명시하게 하고, 연계 표시만으로 공식 인증이나 전체 충족을 단정하지 않도록 구성해 줘.',
      },
      en: {
        definition: 'The process of mapping learning content or activities to defined learning objectives or achievement standards. Linking an item does not imply official certification or complete curriculum coverage.',
        example: 'Map a hands-on coding lesson to a target grade-level standard version, documenting the supporting activity rationale alongside any uncovered standard gaps.',
        promptSnippet: 'Structure curriculum alignment records to capture standard version, target grade/level, alignment evidence/rationale, and uncovered gaps, without implying official certification or full coverage.',
      },
    },
  },
  'course-prerequisite': {
    aliases: {
      ko: ['선수 과목 조건', '이수 선행 요건', '수강 자격 검증', '단계 잠금 해제'],
      en: ['prerequisite course', 'course gating', 'required prior completion', 'module prerequisite'],
    },
    text: {
      ko: {
        definition: '심화 강좌나 다음 단원을 수강·제출하기 전에 반드시 먼저 이수하거나 통과해야 하는 선행 과목·진단 평가·점수 기준입니다. 미충족 시 단순히 잠금 아이콘만 보여 주지 않고 부족한 선수 과목 목록과 바로 이동 경로를 안내하며, 관리자의 예외 수강 승인(Override) 여부를 정책으로 분리합니다.',
        example: '"비동기 상태 관리" 강좌는 "TypeScript 기초" 이수를 선수 요건으로 두고, 미이수 수강생에게는 잠금 사유와 선수 강좌 바로가기를 보여 주되 관리자 예외 면제가 부여된 경우에만 잠금을 풉니다.',
        promptSnippet: '선수 학습 요건 기능을 설계할 때 이수 완료·최소 합격 점수 조건, 순환 의존성(A→B→A) 방지, 미충족 학습자에게 부족 조건과 바로가기 안내, 그리고 운영자의 사유 기록형 예외 승인(Override)을 함께 구현하세요.',
      },
      en: {
        definition: 'Prior courses, modules, or minimum assessment scores a learner must complete before enrolling in or unlocking an advanced unit—pairing clear missing-requirement links with optional audited instructor overrides.',
        example: 'Lock "Async State Patterns" until "TypeScript Foundations" reaches completion, showing a checklist link to the missing prerequisite unless an instructor grants an override.',
        promptSnippet: 'Enforce course prerequisites with cycle-free dependency checks, clear visual explanations linking learners to incomplete prerequisites, and audited admin/instructor override support.',
      },
    },
  },
  'grading-rubric-appeal': {
    aliases: {
      ko: ['채점 루브릭', '성적 재검토 요청', '평가 이의 제기', '채점 기준 공개'],
      en: ['grading rubric', 'grade appeal', 'regrade request', 'score review workflow'],
    },
    text: {
      ko: {
        definition: '서술형·실습 과제를 평가할 때 항목별 배점과 감점 기준을 명시한 채점 기준표(Rubric)를 제공하고, 성적 공개 후 정해진 기간 안에 학습자가 문항별 근거를 들어 성적 재검토·이의신청을 접수하고 강사가 수정 사유와 함께 점수를 확정하는 평가 흐름입니다.',
        example: '시험 결과 화면에서 문항별 루브릭 득점과 감점 코멘트를 펼쳐 본 뒤, 채점 공개 후 48시간 이내에 3번 문항에 대한 재검토 요청을 제출해 강사의 조정 이력과 함께 최종 점수를 확정합니다.',
        promptSnippet: '채점 기준표와 성적 이의신청 흐름에는 문항별 루브릭 배점 구조, 이의신청 허용 마감 창, 재검토 요청 시 점수 조정 전후 값과 변경 사유의 감사 기록, 그리고 최종 확정 잠금을 포함하세요.',
      },
      en: {
        definition: 'A transparent assessment workflow pairing criterion-level scoring rubrics with a time-bounded window for learners to contest scores on specific items and receive an audited regrade decision.',
        example: 'Learners expand item-by-item rubric feedback on their graded exam and submit a regrade request on Question 3 within 48 hours, recording any score adjustment and instructor rationale.',
        promptSnippet: 'Implement rubric-based grading and appeals with explicit criterion weights, bounded appeal deadlines, status tracking (submitted, under review, adjusted/upheld), and an audit trail of score revisions.',
      },
    },
  },
  'certificate-verification': {
    aliases: {
      ko: ['수료증 검증', '이수증 진위 확인', '자격증 발급 번호 조회', '수료 인증 링크'],
      en: ['certificate check', 'credential verification', 'completion certificate lookup', 'tamper-evident certificate'],
    },
    text: {
      ko: {
        definition: '정해진 이수 기준을 충족한 학습자에게 고유 검증 번호가 담긴 수료증을 발급하고, 외부 채용 담당자나 제3자가 공개 검증 링크나 코드로 발급 사실·발급일·유효/취소 상태를 확인할 수 있게 하는 검증 체계입니다. 수료 기준 변경이나 오류 발급 시 수료증 폐기(Revocation) 상태도 반영할 수 있어야 합니다.',
        example: '과목 80% 이상 진도와 최종 평가 통과 시 고유 코드 `CERT-2026-8491`을 발급하고, 검증 페이지에서 성명·과정명·발급일과 현재 유효 상태를 확인하되 민감 개인정보는 노출하지 않습니다.',
        promptSnippet: '수료증 발급 검증 기능에는 수료 요건 충족 검증과 고유 검증 ID 발급, 공개 검증 페이지의 최소 정보 노출(성명·과정·발급일·유효/폐기 상태), 재발급/취소(Revoke) 처리 및 링크 원클릭 복사를 구현하세요.',
      },
      en: {
        definition: 'Issuing uniquely identified completion credentials to eligible learners and providing a public lookup endpoint or link where third parties can confirm authenticity, issue date, and whether the certificate remains valid or has been revoked.',
        example: 'Upon passing the final exam and attendance requirement, generate a unique verification ID that resolves on a public check page showing recipient, course, date, and valid/revoked status without leaking private contact details.',
        promptSnippet: 'Design certificate issuance and verification with strict completion eligibility checks, unguessable verification IDs, minimal PII exposure on public lookup pages, and explicit revocation states.',
      },
    },
  },
  'cohort-enrollment-window': {
    aliases: {
      ko: ['기수 모집 기간', '코호트 수강 신청 기간', '수강 기간 제어', '기수별 학습 일정'],
      en: ['enrollment period', 'cohort registration window', 'cohort access dates', 'intake window'],
    },
    text: {
      ko: {
        definition: '기수(Cohort) 단위로 운영하는 교육 과정에서 모집 시작·마감일, 실제 학습 열람 기간, 수료 후 복습 허용 기간을 타임존 기준으로 분리 제어하는 일정 관리 규칙입니다. 같은 강좌라도 1기와 2기 수강생이 서로 다른 마감일과 정원·대기열을 적용받도록 강좌 템플릿과 기수 인스턴스를 분리합니다.',
        example: '봄 3기 코호트는 3월 1~14일 모집, 3월 15일~4월 30일 학습 진행, 이후 30일간 읽기 전용 복습 기간으로 설정해 마감 후 신규 등록은 막고 기존 기수 진도는 보존합니다.',
        promptSnippet: '기수제 수강 기간 관리에서는 강좌 콘텐츠와 기수(Cohort) 일정 인스턴스를 분리하고, 모집 기간·수강 기간·복습(읽기 전용) 기간을 타임존과 함께 명시하며 기수 정원 마감과 기수 이동 시 진도 처리 정책을 명확히 두세요.',
      },
      en: {
        definition: 'Separating course content from cohort-specific schedules—registration open/close dates, active instruction period, and post-course read-only review access—so each cohort enforces its own capacity and deadlines cleanly.',
        example: 'Cohort 3 opens registration March 1–14, runs live instruction through April 30, and transitions automatically to a 30-day read-only archive afterward.',
        promptSnippet: 'Separate reusable course definitions from cohort enrollment instances, defining timezone-aware registration, active study, and read-only review windows plus seat caps and cohort-transfer policies.',
      },
    },
  },
  'timed-exam-submission': {
    aliases: {
      ko: ['시험 타이머 자동 제출', '시간 제한 시험', '응시 시간 만료 제출', '답안 임시 저장'],
      en: ['timed assessment', 'exam countdown auto-submit', 'test timer submission', 'assessment timeout'],
    },
    text: {
      ko: {
        definition: '응시 시작 시각부터 제한 시간이 흐르는 온라인 시험에서 답안을 주기적으로 임시 저장해 두고, 브라우저 새로고침이나 일시 끊김에도 서버 기준 남은 시간을 동기화하며 종료 시각 도래 시 미제출 답안을 자동 제출·마감하는 평가 메커니즘입니다. 클라이언트 시계 조작이나 마감 직전 중복 제출을 서버 시각 검증으로 막아야 합니다.',
        example: '60분 제한 시험에서 응시자가 문제를 풀 때마다 로컬과 서버에 초안을 저장하고, 종료 5분 전 경고 배너를 띄운 뒤 서버 마감 시각이 지나면 마지막 저장 답안을 기준으로 자동 확정합니다.',
        promptSnippet: '제한 시간 시험 자동 제출 기능은 클라이언트 카운트다운에 의존하지 말고 서버 기준 시작·마감 시각을 기준으로 남은 시간을 계산하며, 답안 자동 임시 저장, 재접속 복구, 종료 임박 경고 및 마감 시 멱등 자동 제출을 구현하세요.',
      },
      en: {
        definition: 'An online exam workflow that anchors countdown deadlines to server start/end timestamps, autosaves in-progress answers against disconnects or refreshes, warns before expiry, and idempotently auto-submits saved answers when time runs out.',
        example: 'A 60-minute exam autosaves draft selections periodically, renders a 5-minute remaining warning banner, and finalizes the latest saved answers at the server deadline even if the tab closes.',
        promptSnippet: 'Anchor timed exam deadlines to server timestamps rather than client clocks, autosave answer drafts resiliently, warn clearly before timeout, and execute idempotent server-enforced auto-submission at cutoff.',
      },
    },
  },
};
