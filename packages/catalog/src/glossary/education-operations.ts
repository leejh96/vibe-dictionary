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
};
