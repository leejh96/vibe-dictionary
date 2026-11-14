import type { GlossaryTermBody } from './types';

export const BUSINESS_OPERATIONS_GLOSSARY_DATA: Record<string, GlossaryTermBody> = {
  'objectives-and-key-results': {
    aliases: {
      ko: ['OKR', 'KR', '핵심 결과', '목표 관리', '목표와 핵심 결과'],
      en: ['OKR', 'KR', 'key results', 'goal framework', 'objectives and key results'],
    },
    text: {
      ko: {
        definition: '도전적인 목표(Objective)와 그 달성 여부를 측정하는 정량·검증 가능한 핵심 결과(Key Result)를 짝지어 성과를 추적하는 목표 관리 체계입니다. 단순 할 일(To-do) 목록과 달리 작업 나열이 아니라 결과 변화에 초점을 둡니다.',
        example: '"신규 사용자 첫 주 안착 경험 개선"을 목표로 두고, 핵심 결과로 "온보딩 완료율 변화"나 "첫 프로젝트 생성 비중" 같은 결과 지표를 연결해 진척도를 점검합니다.',
        promptSnippet: '목표와 핵심 결과(OKR) 관리 흐름을 설계할 때 도전적 목표와 측정 가능한 핵심 결과(KR)를 연결하고 단순 작업 체크리스트와 구분하되, 조직마다 다른 목표 개수·주기·채점 방식은 고정 규칙으로 강제하지 말아 줘.',
      },
      en: {
        definition: 'A goal-setting framework pairing aspirational Objectives with measurable Key Results (KRs) to track outcome progress rather than listing to-do tasks, without mandating fixed org-specific counts, cadences, or scoring rules.',
        example: 'Pair an Objective like "Improve first-week new user activation" with measurable outcome KRs such as onboarding completion rate, keeping day-to-day execution tasks tracked separately.',
        promptSnippet: 'Design an Objectives and Key Results (OKR) tracking flow that links aspirational Objectives to measurable Key Results distinct from task lists, keeping target counts, review cadence, and scoring rules configurable per team.',
      },
    },
  },
};
