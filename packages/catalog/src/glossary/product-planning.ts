import type { GlossaryTermBody } from './types';

export const PRODUCT_PLANNING_GLOSSARY_DATA: Record<string, GlossaryTermBody> = {
  'net-promoter-score': {
    aliases: {
      ko: ['NPS', '순추천지수', '순추천고객지수', '추천 지수', '추천 의향 조사'],
      en: ['NPS', 'Net Promoter Score', 'promoter score', 'customer loyalty metric'],
    },
    text: {
      ko: {
        definition: '0~10점 추천 의향 응답에서 추천 그룹(9~10점) 비율에서 비추천 그룹(0~6점) 비율을 뺀 지표(-100~100)입니다. 중립 그룹(7~8점)은 분모에는 포함되지만 분자에는 들어가지 않으며, 미응답을 0점으로 처리하거나 평균 별점·CSAT와 혼동하지 않습니다.',
        example: '유효 응답 100건 중 추천 50건(50%), 중립 30건(30%), 비추천 20건(20%)이면 중립을 포함한 100건을 분모로 계산해 NPS는 30이 되며 미응답 건은 집계에서 제외합니다.',
        promptSnippet: '순추천지수(NPS) 설문·집계 스펙을 정리할 때 0~10점 척도, 추천(9~10)·중립(7~8)·비추천(0~6) 분류, 중립의 분모 포함 규칙, 미응답 제외 기준, 평균 별점·CSAT와의 차이를 명시해 줘.',
      },
      en: {
        definition: 'A loyalty metric ranging from -100 to 100 calculated on 0-10 recommendation responses as (% Promoters 9-10) minus (% Detractors 0-6). Passives (7-8) count in the denominator only, non-responses are not 0, and it differs from average star ratings or CSAT.',
        example: 'Out of 100 valid responses with 50 Promoters (50%), 30 Passives (30%), and 20 Detractors (20%), Passives stay in the 100-response denominator so NPS is 30, while non-responses are excluded.',
        promptSnippet: 'Specify Net Promoter Score (NPS) survey and reporting rules with the 0-10 scale, Promoter (9-10)/Passive (7-8)/Detractor (0-6) buckets, denominator inclusion for Passives, non-response exclusion, and distinction from CSAT.',
      },
    },
  },
  'active-users': {
    aliases: {
      ko: ['MAU', 'WAU', 'DAU', '월간 활성 사용자', '주간 활성 사용자', '일간 활성 사용자'],
      en: ['MAU', 'WAU', 'DAU', 'monthly active users', 'weekly active users', 'daily active users'],
    },
    text: {
      ko: {
        definition: '정해진 기간(일간 DAU·주간 WAU·월간 MAU) 안에 정의된 핵심 행동을 1회 이상 수행한 중복 제거 사용자 수입니다. 계정의 활성 상태(Active status), 누적 가입자 수, 단순 세션·방문 횟수와는 다릅니다.',
        example: '단순 로그인이나 페이지 새로고침이 아니라 문서 편집·저장 같은 핵심 이벤트를 월간 기준으로 사용자 ID별 1회만 집계해 MAU를 산출합니다.',
        promptSnippet: '활성 사용자(DAU·WAU·MAU) 지표 또는 조회 요건을 설계할 때는 먼저 집계 기간 창, 기준 타임존, 활성으로 인정할 핵심 행동, 사용자 식별 및 중복 제거 규칙을 먼저 확정하도록 요구해 줘.',
      },
      en: {
        definition: 'The count of deduplicated users who performed a defined core action at least once within a set period such as DAU, WAU, or MAU. It is distinct from active account status, cumulative signups, and raw session counts.',
        example: 'Compute MAU by counting unique user IDs that triggered a qualifying core event—such as saving a project—at least once during the month, rather than counting every login or session.',
        promptSnippet: 'Before implementing or reporting Active Users (DAU/WAU/MAU), require defining the exact time window, timezone, qualifying core action, and user identifier deduplication rules first.',
      },
    },
  },
};
