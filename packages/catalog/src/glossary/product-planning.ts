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
  'conversion-funnel': {
    aliases: {
      ko: ['퍼널 단계 분석', '전환 깔때기', '단계별 이탈 분석'],
      en: ['funnel analysis', 'conversion pipeline', 'funnel steps'],
    },
    text: {
      ko: {
        definition: '사용자가 가입, 체험, 결제 같은 목표 행동에 이르기까지 거치는 순차 단계와 각 구간의 통과·이탈 흐름을 나타내는 분석 모형입니다. 단계 순서 보장 여부와 한 사용자의 중복 진입을 어떻게 묶을지 먼저 정해야 단계별 비교가 왜곡되지 않습니다.',
        example: '방문 → 회원가입 → 첫 프로젝트 생성 → 유료 전환 4단계를 사용자 단위(User-scoped) 순차 퍼널로 집계해 어느 구간에서 이탈이 집중되는지 확인합니다.',
        promptSnippet: '전환 퍼널 차트나 분석 쿼리를 설계할 때 단계 이벤트 목록, 순차 완료 제약, 집계 단위(사용자/세션), 전환 허용 기간을 먼저 명시해 단계별 통과와 이탈률을 일관되게 계산하세요.',
      },
      en: {
        definition: 'An analytical model tracking the ordered sequence of steps users take toward a target action—such as signup through checkout—to reveal where drop-offs occur. Accurate funnels specify step ordering rules and whether counts deduplicate by user or session.',
        example: 'A product team maps Visit -> Sign Up -> First Workspace -> Paid Upgrade as a user-scoped ordered funnel to pinpoint the largest drop-off transition.',
        promptSnippet: 'When specifying a conversion funnel, define the exact ordered step events, counting unit (unique user vs. session), and conversion time limit so stage-to-stage drop-off remains comparable.',
      },
    },
  },
  'conversion-rate': {
    aliases: {
      ko: ['전환 비율', '목표 달성 비율', 'CVR'],
      en: ['CVR', 'goal conversion rate', 'conversion ratio'],
    },
    text: {
      ko: {
        definition: '기준 집단(분모) 가운데 정해진 목표 행동을 완료한 대상(분자)의 비율입니다. 같은 이름의 전환율이라도 분모가 전체 방문 세션인지 고유 사용자 수인지에 따라 수치가 크게 달라지므로 산식을 함께 밝혀야 합니다.',
        example: '체험 신청 완료율(%)을 계산할 때 "가격 페이지 방문 고유 사용자 수 대비 체험 양식 제출 완료 사용자 수"로 분자와 분모를 고정해 기간별 비교를 유지합니다.',
        promptSnippet: '전환율을 표시하거나 계산할 때는 퍼센트 숫자만 단독 표기하지 말고 분자(목표 완료 기준), 분모(모집단 단위), 집계 기간, 표본 수를 함께 명시하세요.',
      },
      en: {
        definition: 'The proportion of a defined denominator group that completes a target action, expressed as a percentage. Because user-based and session-based denominators produce very different numbers, conversion rates require an explicit formula.',
        example: 'Checkout conversion rate is reported as unique users completing payment divided by unique users entering checkout during the same period, alongside raw counts.',
        promptSnippet: 'Never display a conversion rate without documenting its exact numerator event, denominator population unit, time window, and underlying raw counts.',
      },
    },
  },
  'cohort-analysis': {
    aliases: {
      ko: ['동일 집단 분석', '코호트 비교', '가입 시점별 그룹 분석'],
      en: ['cohort table', 'cohort tracking', 'user cohorts'],
    },
    text: {
      ko: {
        definition: '가입 주간이나 첫 구매월처럼 동일한 시점·조건으로 묶은 사용자 집단(코호트)의 행동 변화를 경과 기간(0주차, 1주차, 2주차 등)에 따라 추적하는 방법입니다. 신규 유입량 증가에 가려진 기존 사용자 이탈 여부를 전체 평균보다 정확히 드러냅니다.',
        example: '월별 가입 코호트 행렬에서 1월 가입자와 3월 가입자의 가입 후 4주차 재사용률을 나란히 비교해 온보딩 개편 전후의 지속 효과를 확인합니다.',
        promptSnippet: '코호트 분석 표나 리포트를 구현할 때 코호트 묶음 기준(가입일·첫 행동일), 경과 구간 단위(일·주·월), 기준 시간대와 미경과 구간 공백 처리를 명시하세요.',
      },
      en: {
        definition: 'Tracking groups of users who share a starting event or timeframe—such as signup week—across subsequent elapsed periods (Day 1, Week 2, Month 1). Cohort grids isolate behavioral changes over time without letting new-user growth mask retention drops.',
        example: 'A monthly signup cohort matrix compares Week-4 repeat usage across January and March signups to evaluate whether an onboarding change improved follow-through.',
        promptSnippet: 'Define the cohort entry event, cohort time bucket, elapsed-period intervals, timezone alignment, and blank handling for immature periods when building cohort analysis views.',
      },
    },
  },
  'retention-rate': {
    aliases: {
      ko: ['리텐션 비율', '유지율', '재방문 유지율'],
      en: ['retention', 'user retention', 'cohort retention rate'],
    },
    text: {
      ko: {
        definition: '초기 기준 시점에 활동한 사용자 집단 중 특정 경과 시점이나 기간 뒤에 다시 돌아와 핵심 행동을 수행한 사용자의 비율입니다. 정확히 N일째 방문(N-Day)인지 N일 이후 누적 재방문(Unbounded)인지 계산 방식에 따라 의미가 달라집니다.',
        example: '학습 앱에서 첫 수업 완료 코호트를 기준으로 7일 차(D7)에 다시 학습을 실행한 비율을 집계할 때, 아직 7일이 지나지 않은 최근 코호트는 분모에서 제외합니다.',
        promptSnippet: '잔존율을 정의할 때 시작 기준 행동, 복귀로 인정할 재방문 행동, 계산 방식(N-Day·구간·누적), 그리고 경과일 미도달 코호트 제외 규칙을 먼저 고정하세요.',
      },
      en: {
        definition: 'The percentage of users from an initial cohort who return to perform a qualifying action at or within a later elapsed interval. Results vary meaningfully depending on whether retention uses exact N-Day, bracketed-window, or unbounded logic.',
        example: 'An education app measures Day-7 retention as the share of first-lesson completers who launch a practice session on Day 7, excluding cohorts younger than seven days.',
        promptSnippet: 'Specify the cohort start event, qualifying return action, retention mode (exact N-Day, bracket, or unbounded), and exclusion of immature cohorts when reporting retention rates.',
      },
    },
  },
  'attribution-window': {
    aliases: {
      ko: ['어트리뷰션 윈도우', '성과 인정 유효 기간', '전환 귀속 기간'],
      en: ['attribution lookback window', 'conversion window', 'lookback window'],
    },
    text: {
      ko: {
        definition: '광고 클릭, 캠페인 노출, 알림 열람 같은 접점 발생 후 며칠 또는 몇 시간 이내에 일어난 전환까지 그 접점의 성과로 인정할지 정하는 유효 시간 범위입니다. 기간을 너무 짧게 잡으면 숙고형 전환이 누락되고, 너무 길게 잡으면 무관한 재방문까지 과대 귀속될 수 있습니다.',
        example: '이메일 온보딩 알림 링크를 클릭한 뒤 7일 이내에 유료 플랜을 활성화한 전환만 해당 캠페인 성과로 귀속하고, 7일 이후 전환은 직접 유입 또는 최근 접점으로 분류합니다.',
        promptSnippet: '전환 귀속이나 퍼널 연계를 계산할 때 클릭·노출 기준별 기여 인정 기간(예: 24시간, 7일, 30일)과 동일 전환에 여러 접점이 겹칠 때의 우선 귀속 규칙을 명시하세요.',
      },
      en: {
        definition: 'The bounded time horizon after a touchpoint—such as an ad click, email open, or view—during which a subsequent conversion is credited to that touchpoint. Too short a window misses considered decisions, while overly long windows inflate attribution.',
        example: 'Subscriptions activated within 7 days of clicking an onboarding email are attributed to that email touchpoint, while conversions after day 7 fall outside the window.',
        promptSnippet: 'Configure an explicit attribution window per touchpoint type (e.g., 1-day view, 7-day click) alongside tie-breaking rules when multiple touchpoints precede one conversion.',
      },
    },
  },
  'anomaly-detection': {
    aliases: {
      ko: ['지표 급변 감지', '이상 징후 탐지', '임계치 이탈 감지'],
      en: ['anomaly alerting', 'outlier detection', 'metric spike detection'],
    },
    text: {
      ko: {
        definition: '기준선이나 계절성 패턴에서 벗어난 지표 급증·급락·오류율 상승 같은 비정상 변동을 자동으로 식별해 알림이나 점검 흐름으로 연결하는 분석 기법입니다. 대시보드 UI(User Interface)는 임계치 미리보기나 점검 구간 경보 일시 중지를 다루며, 실제 시계열 비교·평가·알림 발송은 백엔드 모니터링 파이프라인에서 수행합니다.',
        example: '결제 실패율이나 가입 급감이 최근 14일 이동 기준 범위를 3표준편차 이상 벗어나면 운영 채널로 이상 경보를 보내고, 예정된 배포·점검 시간에는 일시 중지(Mute) 규칙으로 오탐 알림을 억제합니다.',
        promptSnippet: '이상치 감지 기능이나 경보 규칙 UI를 설계할 때 대시보드의 임계치·일시 중지 설정과 서버 측 평가 파이프라인을 구분하고, 비교 기준 구간, 최소 표본 조건, 중복 알림 억제·재알림 규칙을 명시하세요.',
      },
      en: {
        definition: 'Identifying unexpected spikes, drops, or error-rate deviations in metrics relative to historical baselines or thresholds so teams can investigate early. Dashboard UI handles threshold configuration and maintenance-window muting, while continuous evaluation and alert dispatch run in backend monitoring jobs.',
        example: 'When checkout failure rate deviates sharply from its trailing baseline outside a scheduled maintenance mute window, a server rule emits an alert once minimum event volume is met.',
        promptSnippet: 'Distinguish anomaly-rule configuration UI from backend evaluation pipelines, defining baseline lookback periods, minimum volume guards, maintenance-window muting, and alert deduplication.',
      },
    },
  },
  'guardrail-metric': {
    aliases: {
      ko: ['방어 지표', '안전장치 지표', '실험 가드레일'],
      en: ['guardrail metrics', 'safety metric', 'counter-metric'],
    },
    text: {
      ko: {
        definition: '주요 목표 지표가 올라가는 것처럼 보여도 페이지 지연, 오류율 급증, 환불·해지 증가처럼 서비스 건강성과 사용자 경험을 해치지 않는지 함께 감시하는 하한·상한 기준 지표입니다. 기능 출시나 실험에서 목표 지표가 개선되더라도 가드레일 지표가 허용 범위를 벗어나면 배포를 보류하거나 되돌립니다.',
        example: '추천 배너 노출을 늘려 클릭률은 8% 상승했지만 페이지 LCP(Largest Contentful Paint) 95백분위 지연과 고객 불만 문의율이 가드레일 임계치를 넘어 롤아웃을 중단합니다.',
        promptSnippet: '성공 지표만 단독 평가하지 말고 오류율, 응답 지연, 취소·환불률, 이탈 문의 등 훼손되어서는 안 될 가드레일 지표와 허용 임계치를 함께 정의해 실험·배포 판단에 반영하세요.',
      },
      en: {
        definition: 'Metrics monitored alongside primary success goals to ensure a change or experiment does not degrade system reliability, page speed, error rates, or customer trust. Even if the primary metric improves, breaching a guardrail metric halts or rolls back the rollout.',
        example: 'A new recommendation module raised click-through rate, but triggered a rollback because p95 latency and support complaint rate crossed their pre-set guardrail thresholds.',
        promptSnippet: 'Pair every launch or experiment target with explicit guardrail metrics—such as error rate, tail latency, refunds, or unsubscribe spikes—and document the rollback threshold for each.',
      },
    },
  },
  'data-freshness': {
    aliases: {
      ko: ['데이터 반영 지연', '집계 최신성', '최신 갱신 시각'],
      en: ['freshness', 'data latency', 'refresh lag'],
    },
    text: {
      ko: {
        definition: '실제 이벤트가 발생한 시점부터 분석 대시보드나 리포트 조회 결과에 그 데이터가 반영되기까지 걸리는 시간과 현재 기준 시점의 최신 정도입니다. 실시간 지표와 배치 집계 지표는 반영 주기가 다르므로 화면에 마지막 갱신 시각과 미집계 구간을 함께 표시해야 오판을 막습니다.',
        example: '매시간 정각 배치가 도는 매출 대시보드 상단에 "마지막 집계: 14:00 KST (최대 60분 지연)" 배지를 표기해 방금 발생한 주문이 빠진 상태를 장애로 오인하지 않게 합니다.',
        promptSnippet: '지표 화면과 리포트에는 기대 데이터 최신성(예: 실시간, 15분, 일 배치)과 마지막 집계 완료 시각을 함께 노출하고, 아직 집계가 끝나지 않은 최신 시간대는 진행 중 상태임을 구분해 표시하세요.',
      },
      en: {
        definition: 'How recently analytics pipelines have ingested and processed source events relative to the present moment. Because streaming and batch pipelines update on different schedules, dashboards should display the last completed refresh timestamp and mark incomplete intervals.',
        example: 'An hourly sales report displays "Updated at 14:00 UTC (up to 60m pipeline lag)" so stakeholders do not mistake expected batch delay for dropped orders.',
        promptSnippet: 'Display expected data freshness and the last completed aggregation timestamp on dashboards, clearly distinguishing partial current-day intervals from finalized metrics.',
      },
    },
  },
  'metric-definition': {
    aliases: {
      ko: ['지표 산식 명세', 'KPI 정의서', '메트릭 정의'],
      en: ['metric spec', 'metric formula', 'KPI definition'],
    },
    text: {
      ko: {
        definition: '특정 지표를 계산하기 위한 이벤트 소스, 필터 조건, 제외 대상(테스트 계정·봇·취소 건), 분자·분모, 중복 제거 단위, 시간대를 명문화한 기준 문서입니다. 같은 용어를 쓰더라도 팀마다 지표 정의가 다르면 보고서마다 수치가 어긋나 의사결정 신뢰가 깨집니다.',
        example: '"월간 결제 완료 매출" 정의서에 환불·취소 건 제외 여부, 부가세 포함 여부, 결제 승인 시각 기준 시간대(Asia/Seoul), 내부 QA(Quality Assurance) 계정 필터 조건을 함께 기록합니다.',
        promptSnippet: '새 지표나 대시보드 카드를 구현하기 전에 이벤트명, 포함·제외 필터, 중복 제거 키, 분자·분모 산식, 기준 시간대, 단위(건수·비율·금액)를 포함한 지표 정의 명세를 먼저 확정하세요.',
      },
      en: {
        definition: 'A canonical specification documenting the source events, inclusion and exclusion filters, deduplication key, numerator/denominator formula, timezone, and rounding rules for a metric. Shared definitions prevent different dashboards from reporting conflicting numbers under the same label.',
        example: 'The "Net Paid Orders" metric spec explicitly records currency normalization, test-account exclusion, UTC day boundaries, and whether canceled orders are deducted at cancellation or order time.',
        promptSnippet: 'Establish a written metric definition covering source events, exclusions (bots, QA, refunds), deduplication unit, exact formula, and timezone before implementing charts or exports.',
      },
    },
  },
  'success-criteria': {
    aliases: {
      ko: ['완료·성과 기준', '출시 성공 조건', '합격 기준'],
      en: ['acceptance success criteria', 'launch criteria', 'target threshold'],
    },
    text: {
      ko: {
        definition: '기능, 실험, 온보딩, 학습 과제가 의도한 목적을 달성했다고 판단하기 위해 작업 시작 전에 합의하는 구체적이고 측정 가능한 기준입니다. 모호한 "개선" 대신 목표 수치, 평가 기간, 함께 충족해야 할 제약 조건을 명시해 사후 기준 변경을 막습니다.',
        example: '검색 개편의 성공 기준을 "출시 후 2주간 무결과 검색 비율 25% 감소, 검색 후 결과 클릭률 유지, 검색 API p95 응답 300ms 이하"로 사전에 확정합니다.',
        promptSnippet: '프로젝트·실험·기능 작업의 성공 기준을 정할 때는 측정 지표, 목표 변화량 또는 절대 임계값, 평가 기간, 그리고 훼손하면 안 되는 제약 조건을 실행 전에 명시하세요.',
      },
      en: {
        definition: 'Specific, measurable thresholds agreed upon before launch to decide whether a feature, experiment, or workflow achieved its intended outcome. Setting clear target values, evaluation windows, and constraints upfront prevents moving the goalposts afterward.',
        example: 'A search redesign defines success criteria beforehand as reducing zero-result searches by 25% over 14 days while keeping result click-through steady and p95 latency under 300ms.',
        promptSnippet: 'Define measurable success criteria upfront by pairing target metrics, required improvement or threshold values, evaluation duration, and non-regression constraints.',
      },
    },
  },
  'churn-rate': {
    aliases: {
      ko: ['고객 이탈률', '해지율', '구독 취소율', '매출 이탈률'],
      en: ['customer churn', 'attrition rate', 'cancellation rate', 'revenue churn'],
    },
    text: {
      ko: {
        definition: '특정 기간 시작 시점에 유지되고 있던 고객 또는 반복 매출(MRR) 가운데 기간 종료 시점까지 해지·만료로 빠져나간 비율입니다. 고객 수 기준(Logo Churn)과 매출 금액 기준(Revenue Churn), 그리고 해지 요청 시점이 아닌 실제 만료 시점 중 어떤 기준으로 집계하는지 통일해야 합니다.',
        example: '월초 유료 구독 팀 500곳 중 해당 월에 갱신하지 않고 만료된 15곳을 집계해 월간 고객 이탈률 3%로 보고하되, 일시정지(Pause) 계정은 해지와 별도로 구분해 추적합니다.',
        promptSnippet: '이탈률(Churn Rate) 대시보드·지표 명세에서는 고객 수 이탈과 매출(MRR) 이탈 구분, 해지 신청일 vs 실제 만료일 기준, 일시정지·신규 가입자 분모 포함 여부를 먼저 명확히 정의하세요.',
      },
      en: {
        definition: 'The percentage of active customers or recurring revenue lost over a defined period through cancellations or non-renewals. Reporting must clarify logo churn versus revenue churn and whether paused accounts or mid-period signups enter the denominator.',
        example: 'Out of 500 active subscriptions at the start of the month, 15 expire without renewing, yielding 3% monthly logo churn while paused accounts are tracked separately.',
        promptSnippet: 'Document churn rate definitions explicitly—separating customer churn from MRR churn, cancellation request date from effective end date, and paused or new mid-period accounts from the starting cohort.',
      },
    },
  },
  'activation-metric': {
    aliases: {
      ko: ['활성화 지표', '아하 모먼트 지표', '신규 사용자 안착률', '첫 가치 도달률'],
      en: ['user activation', 'activation rate', 'aha moment metric', 'time to value'],
    },
    text: {
      ko: {
        definition: '신규 가입자가 단순 회원 등록에서 멈추지 않고 서비스의 핵심 가치를 처음으로 경험했다고 판단하는 행동 완료 비율과 소요 시간입니다. 단순 로그인이나 이메일 인증이 아니라 장기 잔존율과 상관이 높은 실제 사용 마일스톤을 기준으로 잡습니다.',
        example: '협업 툴에서 가입 후 7일 이내에 첫 보드를 만들고 팀원 1명 이상을 초대한 비율을 초기 안착 지표로 두고, 온보딩 체크리스트의 각 단계 이탈과 연결해 점검합니다.',
        promptSnippet: '초기 안착 지표(Activation Metric)를 설계할 때는 단순 가입이 아니라 서비스 핵심 가치를 체험한 구체적 행동 조합과 판단 기한(예: 가입 후 7일 이내)을 정하고 온보딩 단계별 전환 퍼널과 연결하세요.',
      },
      en: {
        definition: 'The percentage of new signups who complete the key milestone or set of actions that demonstrates core product value within a target timeframe, strongly predicting long-term retention.',
        example: 'Track the share of newly created workspaces that publish their first project and invite at least one teammate within 7 days of signup.',
        promptSnippet: 'Define your activation metric around concrete value-realizing actions within a bounded post-signup window rather than passive logins, and pair it with onboarding step drop-offs.',
      },
    },
  },
  'north-star-metric': {
    aliases: {
      ko: ['핵심 나침반 지표', '대표 성과 지표', '노스 스타 메트릭', '장기 가치 지표'],
      en: ['NSM', 'North Star Metric', 'top-level product metric', 'core value metric'],
    },
    text: {
      ko: {
        definition: '제품이 고객에게 전달하는 핵심 가치와 장기 비즈니스 성과를 하나의 대표 지표로 요약해, 여러 기능 팀이 같은 방향을 보고 우선순위를 맞추도록 돕는 최상위 지표입니다. 페이지뷰 같은 허영 지표(Vanity Metric)를 피하고 가드레일 지표와 짝지어 균형을 잡습니다.',
        example: '문서 협업 플랫폼이 총 가입자 수 대신 "주간 3명 이상이 함께 편집한 활성 문서 수"를 북극성 지표로 삼고, 로딩 속도와 오류율을 가드레일로 감시합니다.',
        promptSnippet: '북극성 지표(North Star Metric)와 하위 분해 트리를 설계할 때 사용자 가치 전달을 반영하는 대표 산식을 정하고, 단기 과최적화를 막을 가드레일 지표 및 세부 입력 지표를 함께 연결하세요.',
      },
      en: {
        definition: 'A single overarching metric capturing the core value a product delivers to customers and driving sustainable business growth, aligning cross-functional teams while balanced by guardrail metrics.',
        example: 'Instead of raw signups, a collaboration app chooses "weekly documents co-edited by 3+ teammates" as its North Star Metric alongside reliability guardrails.',
        promptSnippet: 'Pair a North Star Metric that reflects genuine customer value (not vanity pageviews) with measurable driver inputs and protective guardrail metrics.',
      },
    },
  },
  'sample-quota': {
    aliases: {
      ko: ['설문 할당량', '응답자 쿼터', '세그먼트별 목표 표본 수', '할당 마감'],
      en: ['survey quota', 'respondent quota', 'quota cap', 'sampling quota'],
    },
    text: {
      ko: {
        definition: '설문조사나 사용자 리서치에서 연령대·직군·요금제 같은 세부 세그먼트별 응답이 한쪽에 치우치지 않도록 목표 표본 수를 할당하고, 특정 구간의 할당량이 차면 추가 응답을 마감하거나 대체 경로로 안내하는 제어 기준입니다.',
        example: '유료 플랜 200명, 무료 플랜 200명 목표 설문에서 무료 플랜 응답이 먼저 200건에 도달하면 무료 플랜 응답자만 정중히 마감 안내 화면으로 분기하고 유료 플랜 수집은 계속 열어 둡니다.',
        promptSnippet: '표본 할당량(Sample Quota)이 있는 설문·리서치 흐름에서는 응답 확정 시점의 원자적 카운트 차감, 진행 중 이탈로 인한 미완료 슬롯 처리, 할당 초과 시 우회/마감 안내를 설계하세요.',
      },
      en: {
        definition: 'Per-segment response caps used in surveys or research studies to ensure balanced representation across cohorts—automatically closing or routing incoming respondents once a segment reaches its target count.',
        example: 'Once the 200-response quota for free-tier users fills, new free-tier entrants receive a polite quota-full notice while paid-tier collection stays open.',
        promptSnippet: 'Implement sample quotas with atomic capacity checks on final submission, clear handling for in-progress drafts when a quota closes, and transparent quota-reached messaging.',
      },
    },
  },
  'saved-report-view': {
    aliases: {
      ko: ['저장된 보기', '맞춤 필터 뷰', '대시보드 프리셋', '공유 리포트 뷰'],
      en: ['saved view', 'report preset', 'saved filter view', 'custom dashboard view'],
    },
    text: {
      ko: {
        definition: '분석 대시보드나 데이터 테이블에서 사용자가 자주 조합하는 기간, 필터 조건, 정렬, 표시 열 구성을 이름과 함께 저장해 두고 원클릭으로 다시 불러오거나 팀과 공유할 수 있는 상태 스냅샷입니다. 원본 스키마가 바뀌거나 필터 항목이 삭제된 경우에도 안전하게 기본값으로 폴백해야 합니다.',
        example: '제품 매니저가 "최근 30일 유료 전환 퍼널(모바일 제외)" 필터·열 구성을 팀 공유 뷰로 저장해 두면 주간 회의에서 매번 필터를 다시 설정하지 않고 바로 열어 확인합니다.',
        promptSnippet: '저장된 리포트 보기(Saved View) 기능에는 URL 파라미터·저장 상태 동기화, 개인/팀 공유 범위와 편집 권한 분리, 변경됨(Dirty) 표시와 덮어쓰기/새 이름으로 저장, 그리고 삭제된 필터 필드 복원 폴백을 구현하세요.',
      },
      en: {
        definition: 'A persisted configuration of date ranges, filters, sorting, and visible columns in an analytics table or report that users can reload in one click or share with teammates, gracefully ignoring obsolete fields if schemas evolve.',
        example: 'Save "Last 30d Paid Funnel (Desktop)" as a shared team preset so stakeholders reopen the exact slice without rebuilding filters every week.',
        promptSnippet: 'Build saved report views with clear dirty-state indicators ("Save changes" vs. "Save as new"), personal versus team sharing permissions, URL sync, and graceful fallback when saved filter keys no longer exist.',
      },
    },
  },
};
