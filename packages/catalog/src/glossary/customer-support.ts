import type { GlossaryTermBody } from './types';

export const CUSTOMER_SUPPORT_GLOSSARY_DATA: Record<string, GlossaryTermBody> = {
  'service-level-agreement': {
    aliases: {
      ko: ['SLA', '응대 목표 시간', '처리 기한 약속', '지원 티켓 마감 기한', 'SLA 타이머'],
      en: ['SLA', 'response time target', 'resolution target', 'support SLA timer'],
    },
    text: {
      ko: {
        definition: '고객지원·운영 조직이 문의나 장애에 첫 응답·해결을 완료하기로 약속한 목표 시간과 영업시간 계산·임박 경고·에스컬레이션 기준입니다.',
        example: '긴급 문의는 첫 응답 1시간 이내 SLA를 적용하고, 고객 답변을 기다리는 동안에는 타이머를 일시정지하며, 마감 15분 전에는 담당 팀에 경고를 보냅니다.',
        promptSnippet: '문의 큐나 운영 워크플로에 서비스 수준 협약(SLA) 기준을 반영할 때 우선순위별 목표 시간, 영업시간 기준 타이머, 고객 대기 중 일시정지 조건, 임박·초과 시 에스컬레이션 규칙을 명확히 분리해 설계해 줘.',
      },
      en: {
        definition: 'A formal commitment defining target first-response and resolution times for support or operations, including business-hour calendars, pause states, and escalation rules.',
        example: 'Apply a 1-hour first-response SLA to urgent tickets, pause the clock while waiting on customer reply, and flag approaching breaches before timeout.',
        promptSnippet: 'Model Service-Level Agreement (SLA) tracking with priority-based target durations, business-hours calculation, explicit pause states (e.g., waiting on customer), and breach escalation alerts.',
      },
    },
  },
  'voice-of-customer': {
    aliases: {
      ko: ['VOC', '고객의 소리', '고객 피드백', '고객 의견', '고객 건의'],
      en: ['VOC', 'Voice of Customer', 'customer feedback', 'customer voice', 'customer insights'],
    },
    text: {
      ko: {
        definition: '고객 문의·불편 사항·개선 제안을 체계적으로 수집해 분류·분석하고 제품 개선의 입력 자료로 활용하는 흐름입니다. 개별 요청을 곧바로 확정된 개발 요구사항으로 간주하지는 않습니다.',
        example: '고객지원 티켓, 앱 내 피드백, 설문 코멘트에서 수집한 의견을 유형과 영향도별로 묶어 우선순위를 검토하되, 실제 스펙 반영 여부는 별도 검증을 거쳐 결정합니다.',
        promptSnippet: '고객의 소리(VOC) 수집·분류 기능을 설계할 때 유입 출처, 카테고리·유형, 영향도, 처리 이력을 함께 기록하고 개인정보(PII)는 최소화·마스킹하며 개별 요청을 확정 요구사항과 분리해 관리해 줘.',
      },
      en: {
        definition: 'A structured workflow for collecting, categorizing, and analyzing customer inquiries, pain points, and suggestions as product improvement input, without treating individual requests as confirmed requirements.',
        example: 'Aggregate support tickets, in-app feedback, and survey comments by theme and impact to inform roadmap discussions while keeping formal requirement sign-off separate.',
        promptSnippet: 'Design Voice of Customer (VOC) intake and triage to capture source, category/type, impact, and handling history, minimize or mask PII, and keep raw customer requests separate from confirmed specs.',
      },
    },
  },
};
