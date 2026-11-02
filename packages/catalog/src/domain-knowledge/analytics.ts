import type { DomainKnowledge } from '../domain-knowledge';

export const ANALYTICS_KNOWLEDGE: DomainKnowledge[] = [{
  id: 'analytics-metric-aggregation-and-export',
  aliases: {
    ko: ['지표 대시보드', '데이터 분석 화면', '통계 집계 리포트', '기간 필터 비교', 'CSV 데이터 내보내기'],
    en: ['analytics dashboard', 'metrics and KPIs', 'data aggregation view', 'date range comparison', 'CSV data export'],
  },
  useCases: {
    ko: ['매출·방문자·전환율 같은 핵심 지표(KPI) 대시보드를 만들 때', '집계 기준(중복 제거·표준시·구간 경계)과 갱신 시점을 표시할 때', '실제 값 0과 데이터 수집 전·집계 지연을 구분해 보여 줄 때', '필터 조건과 동일한 범위로 CSV·집계표를 내보내고 권한을 제한할 때'],
    en: ['Building an analytics dashboard with KPI cards, charts and tables', 'Clarifying metric definitions, deduplication rules, timezones and data freshness', 'Distinguishing zero values from uncollected or delayed data intervals', 'Connecting dashboard filters to CSV exports and role-based data boundaries'],
  },
  keywords: {
    ko: ['지표', '대시보드', '데이터 분석', '통계', 'KPI', '집계 기준', '기간 필터', '전주 대비', '집계 지연', '결측치', '데이터 내보내기', 'CSV 다운로드'],
    en: ['analytics', 'dashboard', 'metrics', 'KPI', 'aggregation', 'date filter', 'period comparison', 'data freshness', 'missing data', 'zero versus null', 'data export', 'csv export', 'CSV download'],
  },
  text: {
    ko: {
      domain: '지표·대시보드',
      title: '집계 기준·표준시·지연 표시와 결측 구분·내보내기 권한',
      summary: '지표의 계산 정의와 기준 시각을 명시하고, 실제 0과 집계 미완료·필터 범위·내보내기를 연결합니다.',
      overview: '대시보드의 숫자와 차트는 계산 기준이 조금만 달라도 카드 요약과 상세 표의 합계가 어긋납니다. 총합과 고유 사용자 수(중복 제거)의 차이, 조회 기간의 기준 표준시(Timezone), 실시간 수치와 배치 집계 지연, 실제 실적이 0인 날과 아직 수집되지 않은 구간의 구분까지 명확히 정해야 잘못된 의사결정을 막을 수 있습니다. 아래 내용은 지표·대시보드 흐름을 설계하기 위한 참고이며 특정 서비스의 지표 계산식이나 갱신 주기를 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '지표 정의와 분모·중복 제거 기준', description: '전체 이벤트 횟수(PV)인지 중복을 뺀 고유 수(UV)인지, 전환율의 분모와 분자가 무엇인지, 취소·테스트 데이터를 제외하는지 명확히 정의합니다.' },
        { name: '기간 경계와 기준 표준시(Timezone)', description: '오늘·최근 7일·월간 집계가 어느 표준시 자정을 기준으로 잘리는지, 아직 끝나지 않은 오늘의 부분 데이터를 이전 완료 구간과 어떻게 비교할지 정합니다.' },
        { name: '집계 지연(Freshness)과 기준 시각 표시', description: '실시간 반영 수치인지 매시간·매일 갱신되는 집계인지 구분하고, 마지막 집계 기준 시각을 함께 표시해 최신 상태 여부를 오해하지 않게 합니다.' },
        { name: '실제 0과 수집 전·결측(Null)의 구분', description: '해당 구간에 활동이 없어 0건인 것과, 아직 집계 배치가 돌지 않았거나 수집 오류가 난 상태를 화면과 차트에서 구분합니다.' },
        { name: '요약·차트·내보내기(Export)의 필터 및 권한 일치', description: '상단 기간·조건 필터를 바꿨을 때 KPI 카드, 추세 차트, 하단 표, CSV 내보내기 파일이 모두 같은 조건과 열람 권한 범위를 따르는지 확인합니다.' },
      ],
      workflow: [
        { name: '조회 조건과 마지막 집계 시각 제시하기', description: '선택한 날짜 범위·비교 구간·필터 조건과 함께 현재 화면 숫자의 집계 기준 시각을 상단에 명확히 보여 줍니다.' },
        { name: '요약 카드·차트·상세 표의 기준 맞추기', description: '조건 변경 시 로딩 상태와 이전 값 구분을 명확히 하고, 요약 지표와 하위 분류 표의 계산 기준이 어긋나지 않게 연결합니다.' },
        { name: '0·결측·집계 지연 구간 안내하기', description: '데이터가 없는 초기 상태, 실제 0건, 아직 집계되지 않은 최신 구간을 서로 다른 안내와 시각 표시로 구분합니다.' },
        { name: '조건 그대로 내보내기와 대용량 처리하기', description: '현재 적용된 필터·기간 조건을 명시해 내보내기를 실행하고, 데이터가 크면 비동기 생성 대기나 행 수 제한과 민감 열 마스킹을 적용합니다.' },
      ],
      pitfalls: [
        { name: '고유 사용자 수(UV)를 일별로 단순 합산해 주간·월간 총합으로 표시하기', description: '월요일과 화요일에 모두 방문한 사용자는 일별 합산에서 2명으로 중복 계산됩니다. 중복 제거 지표는 전체 기간 기준으로 다시 집계하거나 계산 방식을 명시하세요.' },
        { name: '아직 집계되지 않은 오늘 데이터를 0건 추락으로 그리기', description: '배치 집계가 아직 안 끝난 구간을 0으로 찍으면 지표가 급락한 것처럼 보입니다. 미집계 구간과 실제 0을 구분하세요.' },
        { name: '화면에서는 마스킹한 민감 정보를 CSV 다운로드에 그대로 포함하기', description: '열람 권한이 제한된 사용자에게 내보내기 파일로 전체 원본 행이 내려가지 않도록 화면과 동일한 권한·필터 기준을 적용하세요.' },
      ],
      questions: [
        '핵심 지표 각각의 정확한 계산식(분자·분모·중복 제거·취소분 제외 여부)은 무엇인가요?',
        '날짜 구간은 어느 표준시(Timezone)를 기준으로 집계하며, 직전 기간 대비 증감률은 어떤 구간끼리 비교하나요?',
        '데이터는 실시간으로 갱신되나요, 주기적으로 집계되나요? 마지막 갱신 시각을 어떻게 표시하나요?',
        '실제 실적이 0인 경우, 조건에 맞는 데이터가 없는 경우, 집계 지연·오류인 경우를 어떻게 구분해 보여 주나요?',
        '상단 기간·조직 필터를 바꿀 때 모든 카드·차트·표가 함께 바뀌나요, 일부 고정 지표가 있나요?',
        'CSV 등 데이터 내보내기를 지원하나요? 최대 행 수 제한, 생성 대기 방식, 역할별 민감 항목 제외 규칙은 무엇인가요?',
      ],
      example: '예시: 운영 대시보드에서 최근 7일 지표를 KST 자정 기준으로 집계하고, 상단에 마지막 집계 시각을 표시하며, 아직 집계가 끝나지 않은 당일 구간은 점선으로 구분하고, CSV 내보내기 시에는 현재 필터 범위 안에서 개인 식별 열을 제외한 집계표만 내려받도록 구성할 수 있습니다. 실제 지표 산식·갱신 주기·내보내기 권한은 데이터 정책에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'native-date-field', reason: '집계 기준 날짜를 브라우저 기본 달력과 키보드로 선택하는 표현에 참고할 수 있습니다. 실제 기간 범위 검증과 지표 재조회는 별도로 구현해야 합니다.' },
        { id: 'stable-skeleton-content', reason: '지표 데이터를 불러오는 동안 카드 높이를 유지하며 스켈레톤과 결과를 전환하는 표현에 참고할 수 있습니다. 실제 데이터 집계와 차트 렌더링은 구현하지 않습니다.' },
      ],
      promptSnippet: '지표·대시보드(Analytics) 서비스의 집계 기준·기간 필터·지연 표시·내보내기 흐름을 설계해 줘. 먼저 핵심 지표별 계산식(중복 제거·취소 제외·분모 기준), 날짜 경계 표준시(Timezone)와 비교 구간 규칙, 집계 주기와 마지막 갱신 시각 표시, 실제 0과 미집계·결측의 구분, 데이터 내보내기 범위와 권한 정책을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 역할별 열람 가능한 지표·조직 범위와 내보내기 허용 권한.\n2. 기간·조건 필터 적용 시 KPI 요약 카드, 차트, 상세 표, 내보내기 데이터 간의 일관성 규칙.\n3. 실시간/배치 집계 지연 표시와 초기 빈 상태·실제 0·미집계(결측)·집계 오류의 구분.\n4. 고유값(중복 제거) 지표의 기간별 집계 주의점과 진행 중인 당일/당월 구간 비교 방식.\n5. 기간/필터 바·집계 기준 시각 안내·요약 카드·상세 표·내보내기 동작의 연결.\n일별 고유 수의 단순 합산을 기간 전체 고유 수로 단정하거나 미집계 구간을 0으로 표시하지 말고, 예시 정책과 디자인 데모를 실제 데이터 파이프라인으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Analytics & Dashboards',
      title: 'Metric definitions, timezone cutoffs, data freshness, missing-data states and exports',
      summary: 'Clarify metric formulas and timezones, and connect zero versus missing data, filter scope and export permissions.',
      overview: 'Dashboard numbers lose trust when summary cards, charts and exported tables use slightly different definitions. Defining total events versus deduplicated users, timezone cutoffs, batch data freshness, and the difference between a true zero and uncollected data keeps decisions grounded. These concepts are design references, not default KPI formulas or refresh cadences for a specific analytics system.',
      concepts: [
        { name: 'Metric definitions, denominators and deduplication', description: 'Define whether a metric counts total events or unique entities, what forms the denominator of a rate, and whether canceled or test records are excluded.' },
        { name: 'Date boundaries, timezones and partial intervals', description: 'Specify which timezone defines daily or monthly cutoffs and how an incomplete current day or month is compared against previous complete intervals.' },
        { name: 'Data freshness and last-updated timestamps', description: 'Distinguish live counters from hourly or daily batch aggregations and display the effective data timestamp clearly.' },
        { name: 'True zero versus uncollected or delayed data', description: 'Separate an interval with zero actual activity from an interval where batch processing has not finished or collection failed.' },
        { name: 'Filter and permission alignment across views and exports', description: 'Ensure top-level date and segment filters—and role-based access rules—apply consistently across KPI cards, charts, tables and CSV downloads.' },
      ],
      workflow: [
        { name: 'Display active filters and data freshness', description: 'Show the selected date range, comparison baseline and last-aggregated timestamp alongside dashboard metrics.' },
        { name: 'Keep summary cards, charts and breakdown tables aligned', description: 'Indicate loading states during filter changes without layout shifts, and keep summary totals consistent with breakdown rows.' },
        { name: 'Distinguish zero, empty, pending and error intervals', description: 'Use distinct visual and text indicators for onboarding empty states, zero-count periods and not-yet-aggregated intervals.' },
        { name: 'Connect filtered views to scoped data exports', description: 'Include the active filter context in exported files, handle large exports asynchronously if needed, and mask restricted columns.' },
      ],
      pitfalls: [
        { name: 'Summing daily unique counts to compute weekly or monthly uniques', description: 'A user active on three days counts three times in a simple daily sum. Compute unique metrics over the full window or label the aggregation clearly.' },
        { name: 'Plotting not-yet-processed intervals as zero', description: 'Rendering a delayed batch window as 0 makes charts look like a sudden crash. Distinguish pending intervals from true zeros.' },
        { name: 'Bypassing screen-level permissions or masking in CSV downloads', description: 'Export endpoints must enforce the same row filters and column redaction as the on-screen table.' },
      ],
      questions: [
        'What is the exact formula for each metric, including deduplication rules, denominators and excluded records?',
        'Which timezone defines date boundaries, and how are period-over-period comparisons calculated?',
        'Are metrics real-time or batch-aggregated, and how is the last-updated timestamp shown?',
        'How should the UI distinguish true zero values, no-match filter results, pending aggregation windows and collection errors?',
        'Do all cards, charts and tables respond to the global date and segment filters, or are any widgets fixed?',
        'Are CSV or table exports supported, and what row limits, async generation steps and role-based column restrictions apply?',
      ],
      example: 'Example: an operations dashboard could aggregate daily metrics at midnight KST, display the last batch timestamp in the header, mark the in-progress current day as partial, and export filtered CSV tables with personal identifiers omitted for standard roles. Confirm actual formulas, refresh schedules and export permissions before adopting this setup.',
      relatedDesigns: [
        { id: 'native-date-field', reason: 'A reference for selecting an aggregation date with a native calendar input. Date-range validation and metric queries need separate implementation.' },
        { id: 'stable-skeleton-content', reason: 'A reference for keeping card dimensions stable while switching between loading placeholders and loaded metric content. Real aggregation and charting need separate implementation.' },
      ],
      promptSnippet: 'Help design an analytics and dashboard workflow. First confirm metric formulas (deduplication, denominators, exclusions), timezone boundaries and comparison rules, refresh cadence and freshness indicators, true-zero versus pending/missing states, and export scope/permissions. Do not assume undecided rules.\nBased on the answers, describe:\n1. Role-based visibility for metrics, segments and exported columns.\n2. Consistency rules across KPI summary cards, charts, breakdown tables and exports when filters change.\n3. Freshness indicators and distinct states for onboarding empty views, true zeros, pending batch windows and errors.\n4. Handling of deduplicated metrics across date ranges and partial current-period comparisons.\n5. How filter bars, freshness timestamps, KPI cards, breakdown tables and export actions connect.\nDo not sum daily uniques as multi-day uniques or plot pending data as zero, and do not mistake example policies or design demos for a real analytics pipeline.',
    },
  },
  sources: [
    { title: 'Google Analytics Help — About data freshness and processing latency', url: 'https://support.google.com/analytics/answer/11198161' },
    { title: 'PostHog Docs — Trends and unique user aggregations', url: 'https://posthog.com/docs/product-analytics/trends/overview' },
  ],
}, {
  id: 'analytics-funnel-cohort-and-attribution-window',
  aliases: {
    ko: ['퍼널 전환율 분석', '코호트 잔존율 리텐션', '전환 인정 기간 어트리뷰션', '순차 퍼널 단계'],
    en: ['funnel conversion analysis', 'cohort retention matrix', 'conversion attribution window', 'sequential funnel steps'],
  },
  useCases: {
    ko: ['가입 → 온보딩 → 결제처럼 여러 단계를 거치는 퍼널 전환율과 이탈 구간을 분석할 때', '단계 간 순서 강제 여부(순차 달성 vs 무관 달성)와 전환 인정 기간(Conversion window)을 정의할 때', '가입 주차·월차 코호트별 재방문·재구매 잔존율(Retention)과 미도래 미래 구간을 표시할 때', '아직 전환 인정 기간이 끝나지 않은 최근 코호트의 미완성 수치를 완료된 과거 코호트와 구분할 때'],
    en: ['Analyzing multi-step funnel conversion rates and drop-off points across user journeys', 'Defining strict step ordering versus any-order funnels and the conversion lookback window', 'Building weekly or monthly cohort retention tables with clear immature future cells', 'Distinguishing recently formed cohorts whose conversion window is still open from completed cohorts'],
  },
  keywords: {
    ko: ['퍼널 분석', '전환율', '이탈률', '전환 인정 기간', '코호트 분석', '리텐션', '잔존율', '미도래 구간', '단계 순서'],
    en: ['funnel analysis', 'conversion rate', 'drop-off rate', 'conversion window', 'cohort analysis', 'retention rate', 'attribution lookback', 'immature cohort', 'step order'],
  },
  text: {
    ko: {
      domain: '지표·대시보드',
      title: '퍼널 전환·코호트 잔존율의 기준 시점과 전환 인정 기간(Attribution)',
      summary: '퍼널 단계의 순서·전환 인정 기한과 코호트 잔존율의 기준일·미도래 구간 표시를 연결합니다.',
      overview: '같은 데이터라도 1단계 진입 후 24시간 안에 마지막 단계까지 마친 사람만 전환으로 볼지, 30일 안에만 마치면 전환으로 볼지에 따라 퍼널 전환율이 크게 달라집니다. 또한 코호트 잔존율 표에서 아직 시간이 지나지 않아 데이터가 생길 수 없는 미래 칸(예: 어제 가입한 코호트의 7일 차 잔존율)을 0%로 표시하면 최근 코호트가 급락한 것처럼 오해하게 됩니다. 아래 내용은 퍼널·코호트 분석 흐름을 설계하기 위한 참고이며 특정 분석 도구의 기본 전환 기한이나 리텐션 공식을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '퍼널 단계 순서(Strict/Ordered vs Unordered)와 고유 기준', description: '1단계 이후에 반드시 2단계가 일어나야 하는지, 중간에 다른 행동이 끼어도 되는지, 고유 사용자 기준인지 세션 기준인지 명시합니다.' },
        { name: '전환 인정 기간(Conversion/Attribution window)', description: '1단계를 시작한 시점부터 며칠·몇 시간 안에 최종 단계를 달성해야 전환 성공으로 집계할지 기한을 고정합니다.' },
        { name: '코호트 기준 사건(Anchor event)과 복귀 판정(N일 차 vs 범위형)', description: '코호트를 묶는 최초 사건(예: 첫 가입일)과 잔존 판정이 정확히 N일째 당일 복귀인지 N일 이후 언제든 복귀(Unbounded)인지 구분합니다.' },
        { name: '전환 기한 진행 중(Immature) 코호트와 미도래 미래 구간 구분', description: '아직 전환 인정 기간이 끝나지 않은 최근 진입군과 아직 날짜가 오지 않은 코호트 표의 빈 삼각형 구간을 0%와 명확히 구분합니다.' },
      ],
      workflow: [
        { name: '퍼널 단계·순서 조건과 전환 인정 기간 설정하기', description: '단계별 이벤트와 순서 규칙, 전환 인정 기간(예: 7일 이내)을 선택하고 현재 적용된 계산 기준을 상단에 표시합니다.' },
        { name: '단계별 전환율·전체 전환율과 소요 시간 확인하기', description: '최초 진입 대비 전환율과 직전 단계 대비 전환율을 함께 보여 주고, 아직 전환 기한이 남아 있는 최근 구간은 진행 중 표시를 덧붙입니다.' },
        { name: '코호트 묶음 단위(일·주·월)와 잔존 기준 선택하기', description: '코호트 생성 기간 단위와 복귀 이벤트를 고르고, 각 경과 구간별 코호트 크기(모수)와 잔존율을 행렬 표로 보여 줍니다.' },
        { name: '미도래 구간 비우기와 소수 모수 코호트 안내하기', description: '아직 도래하지 않은 경과 일자 칸은 비워 두거나 대시(-)로 표시하고, 모수가 너무 작은 코호트는 해석 주의를 안내합니다.' },
      ],
      pitfalls: [
        { name: '어제 가입한 코호트의 7일 차 리텐션을 빈칸 대신 0%로 표시해 평균을 깎아 먹기', description: '아직 7일이 지나지 않은 코호트를 0%로 넣고 열 평균을 내면 최근으로 올수록 잔존율이 폭락한 것처럼 보입니다. 미도래 구간은 평균에서 제외하세요.' },
        { name: '전체 조회 기간만 바꾸면 과거 퍼널 전환율까지 매번 달라지게 만들기', description: '조회 기간 경계에 걸친 사용자의 전환 인정 기간(예: 월말 진입 후 익월 초 결제)을 어떻게 처리하는지 고정하지 않으면 조회할 때마다 숫자가 흔들립니다.' },
        { name: '1단계 대비 전환율과 직전 단계 대비 전환율을 구분 없이 섞어 쓰기', description: '3단계 숫자가 1단계 대비 20%인지 2단계 대비 20%인지 라벨을 명확히 적지 않으면 어느 단계에서 이탈이 큰지 반대로 읽게 됩니다.' },
      ],
      questions: [
        '퍼널 전환은 단계 순서가 엄격히 지켜져야 하나요, 조회 기간 내 순서와 무관하게 달성해도 인정하나요?',
        '1단계 진입 후 최종 단계까지 인정하는 전환 기간(Conversion window, 예: 1시간·7일·30일)은 얼마인가요?',
        '아직 전환 인정 기간이 다 지나지 않은 최근 진입 사용자의 퍼널·코호트 수치는 어떻게 표시하나요?',
        '코호트 잔존율은 정확히 N일/N주 차 당일 활동 기준(N-day)인가요, N일 이후 1회 이상 활동 기준(Unbounded)인가요?',
        '코호트 표에서 아직 도래하지 않은 미래 경과 구간과 모수가 0명인 행은 화면과 열 평균 계산에서 어떻게 처리하나요?',
      ],
      example: '예시: 커머스 전환 대시보드에서 장바구니 담기 → 결제 시작 → 결제 완료 순차 퍼널의 전환 인정 기간을 7일로 두고, 최근 7일 이내 진입군은 집계 진행 중(빗금)으로 구분하며, 주간 코호트 잔존율 표에서 아직 오지 않은 주차 칸은 대시(-)로 비워 열 평균 계산에서 제외하도록 구성할 수 있습니다. 실제 전환 기한·리텐션 정의·귀속 모델은 분석 정책에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'ly-transposable-comparison-matrix', reason: '코호트 행(가입 주차)과 경과 기간 열(1주·2주·3주 차)로 이루어진 잔존율 비교 행렬을 표시하는 표현에 참고할 수 있습니다. 실제 코호트 집계와 미도래 셀 계산은 별도로 구현해야 합니다.' },
        { id: 'underline-content-tabs', reason: '퍼널 전환 차트 보기, 단계별 이탈 상세 보기, 코호트 잔존율 표 보기를 탭으로 전환하는 표현에 참고할 수 있습니다. 실제 분석 쿼리 실행은 구현하지 않습니다.' },
      ],
      promptSnippet: '지표·대시보드(Analytics)의 퍼널 전환 분석·코호트 잔존율(Retention)·전환 인정 기간(Conversion window) 흐름을 설계해 줘. 먼저 퍼널 단계의 순서 강제 기준과 전환 인정 기한, 최초 단계 대비 vs 직전 단계 대비 전환율 표시, 코호트 잔존율 판정 방식(N일 차 당일 vs 범위형), 아직 전환 기한이 끝나지 않은 진행 중 코호트와 미도래 미래 구간의 처리 규칙을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 퍼널 고유 기준(사용자/세션), 단계 순서 규칙, 전환 인정 기간(Lookback/Conversion window) 정의 표시.\n2. 전체 대비 전환율·직전 단계 대비 전환율·이탈 수의 병기 및 전환 기한 미경과 구간 구분.\n3. 코호트 기준일·초기 모수(Cohort size)·경과 구간별 잔존율 행렬 구조.\n4. 미도래 미래 칸의 빈 상태 표시 및 열 평균 계산 시 미도래·미완성 구간 제외 규칙.\n5. 분석 기준 설정 바·뷰 전환 탭·코호트 비교 행렬·단계별 이탈 상세 화면의 연결.\n아직 도래하지 않은 코호트 미래 구간을 0%로 표시해 평균을 왜곡하거나 1단계 대비 전환율과 직전 단계 대비 전환율을 혼동하지 말고, 예시 정책과 디자인 데모를 실제 분석 쿼리 엔진으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Analytics & Dashboards',
      title: 'Funnel conversion steps, cohort retention windows and attribution lookback rules',
      summary: 'Connect funnel step ordering and conversion windows with cohort retention matrices and immature-period indicators.',
      overview: 'Funnel conversion rates shift dramatically depending on whether a user must complete step 3 within one hour or thirty days of step 1, and whether steps must occur in strict chronological order. Likewise, in a cohort retention table, rendering future elapsed intervals that have not happened yet as 0% makes recent cohorts look like they crashed. Defining conversion lookback windows, distinguishing overall versus step-to-step conversion, and marking immature cohorts clearly prevents misreading growth trends. These concepts are design references, not default attribution windows or retention formulas.',
      concepts: [
        { name: 'Sequential step ordering and entity counting', description: 'Specify whether funnel steps must happen in strict chronological order per unique user or session, and whether repeated events re-enter the funnel.' },
        { name: 'Conversion window (attribution lookback)', description: 'Define the maximum time allowed between entering Step 1 and completing the final step (such as 24 hours, 7 days or 30 days) to count as a conversion.' },
        { name: 'Cohort anchor event and retention definition (N-day versus unbounded)', description: 'Clarify what forms a cohort (such as signup week) and whether return activity is measured strictly in period N or any time on or after period N.' },
        { name: 'Immature cohorts versus unelapsed future cells', description: 'Distinguish recent cohorts whose conversion or retention window is still open from future matrix cells that cannot have data yet, never rendering unelapsed cells as 0%.' },
      ],
      workflow: [
        { name: 'Configure funnel steps, ordering and conversion window', description: 'Let users see and adjust the ordered steps, counting entity and conversion window (for example, within 7 days) at the top of the report.' },
        { name: 'Display both overall and step-to-step conversion rates', description: 'Show the percentage converting from Step 1 alongside the step-over-step conversion and drop-off counts, flagging in-progress cohorts whose window has not closed.' },
        { name: 'Build the cohort retention matrix with explicit cohort sizes', description: 'Render rows by cohort start period with the initial cohort size (N) and columns for elapsed intervals (Day 1, Day 7, Week 1, Week 2).' },
        { name: 'Blank out future intervals and exclude them from column averages', description: 'Leave unelapsed bottom-right triangle cells blank or dashed and exclude immature or unelapsed cells when computing average retention per column.' },
      ],
      pitfalls: [
        { name: 'Rendering unelapsed future cohort cells as 0% and including them in averages', description: 'A cohort created yesterday has no Day-7 data yet; treating that cell as 0% drags down summary averages and implies a false retention drop.' },
        { name: 'Conflating top-of-funnel conversion with previous-step conversion', description: 'Always label whether a bar’s percentage is relative to Step 1 entrants or relative to the immediately preceding step.' },
        { name: 'Hiding that the most recent days are still inside their conversion window', description: 'If the conversion window is 14 days, entrants from 2 days ago have had less time to convert; mark immature windows clearly.' },
      ],
      questions: [
        'Must funnel steps occur in strict chronological order, and what is the maximum conversion window from Step 1 to completion?',
        'Does the funnel display conversion relative to Step 1, relative to the previous step, or both?',
        'How are recent cohorts whose conversion or retention window has not fully elapsed visually distinguished?',
        'Is cohort retention calculated as strict N-period return (active in Week N) or rolling/unbounded return (active in Week N or later)?',
        'How are unelapsed future cells and zero-member cohorts handled in the cohort table and summary row averages?',
      ],
      example: 'Example: a product analytics view could measure a 3-step checkout funnel with a 7-day conversion window, show both Step-1 and step-to-step conversion rates, shade cohorts from the last 7 days as still maturing, and render unelapsed cells in the weekly retention matrix as dashes excluded from column averages. Confirm actual event schemas, window lengths and retention definitions before adopting this setup.',
      relatedDesigns: [
        { id: 'ly-transposable-comparison-matrix', reason: 'A reference for displaying a cohort retention grid across cohort rows and elapsed-period columns. Cohort aggregation and unelapsed-cell calculations need separate implementation.' },
        { id: 'underline-content-tabs', reason: 'A reference for switching between Funnel Steps, Drop-off Breakdown and Cohort Retention Matrix views. Analytics query execution needs separate implementation.' },
      ],
      promptSnippet: 'Help design a funnel conversion, attribution-window and cohort retention workflow. First confirm strict versus unordered funnel steps, the conversion lookback window, overall versus step-to-step conversion labels, cohort retention formula (N-period vs unbounded), and how immature cohorts and unelapsed future cells are handled. Do not assume undecided rules.\nBased on the answers, describe:\n1. Funnel counting unit, step-order rules and explicit conversion-window display.\n2. Side-by-side presentation of top-of-funnel conversion, step-over-step conversion, drop-offs and immature-window indicators.\n3. Cohort matrix structure with anchor period, initial cohort size and elapsed retention columns.\n4. Rules keeping unelapsed future cells blank and excluding them from column summary averages.\n5. How window controls, view-switching tabs, cohort comparison matrices and drop-off breakdowns connect.\nDo not plot unelapsed future cohort intervals as 0% or mix up overall versus step-to-step conversion rates, and do not mistake example policies or design demos for a real analytics query engine.',
    },
  },
  sources: [
    { title: 'Amplitude Docs — Funnel analysis, conversion windows and step order', url: 'https://amplitude.com/docs/analytics/charts/funnel-analysis/funnel-analysis-build' },
    { title: 'Mixpanel Docs — Retention cohorts and calculation modes', url: 'https://docs.mixpanel.com/docs/reports/retention' },
  ],
}, {
  id: 'analytics-custom-report-filter-and-saved-view',
  aliases: {
    ko: ['맞춤 리포트 필터 저장', '대시보드 저장된 뷰 프리셋', '상대 날짜 절대 날짜 필터', '폐기된 지표 스키마 경고'],
    en: ['saved report filter preset', 'custom dashboard view', 'relative versus absolute date filter', 'deprecated metric warning'],
  },
  useCases: {
    ko: ['자주 쓰는 기간·세그먼트·지표 조합을 개인 또는 팀 공유용 저장된 뷰(Saved view)로 만들어 둘 때', '최근 30일 같은 상대 기간(Relative date) 저장과 특정 시작·종료일 고정(Absolute date) 저장을 구분할 때', '공유된 프리셋을 열어 임시로 필터를 바꿔 볼 때 원본 프리셋 덮어쓰기와 새 이름으로 저장을 나눌 때', '데이터 스키마 변경이나 지표 폐기(Deprecation)로 저장된 뷰의 일부 필터·열이 유효하지 않을 때 복구 안내를 줄 때'],
    en: ['Saving frequently used filter, segment and column combinations as personal or team report presets', 'Distinguishing rolling relative date ranges (Last 30 days) from fixed calendar ranges when reopening a saved view', 'Separating temporary filter edits (dirty state) from overwriting a shared preset or saving as a new view', 'Warning users and offering a safe fallback when a saved report references a renamed or deprecated metric'],
  },
  keywords: {
    ko: ['저장된 뷰', '필터 프리셋', '맞춤 리포트', '상대 기간 필터', '조건 수정 상태', '다른 이름으로 저장', '팀 공유 프리셋', '지표 폐기 경고'],
    en: ['saved view', 'filter preset', 'custom report', 'relative date range', 'unsaved filter changes', 'save as new view', 'shared preset', 'deprecated metric'],
  },
  text: {
    ko: {
      domain: '지표·대시보드',
      title: '사용자 정의 리포트·필터 프리셋 저장과 스키마 변경 시 깨진 조건 안내',
      summary: '상대·고정 기간을 구분해 필터 프리셋을 저장하고, 조건 임시 변경 상태와 폐기된 지표 안내를 연결합니다.',
      overview: '실무자는 대시보드에 들어올 때마다 똑같은 날짜·채널·지역 필터를 다시 고르기보다 저장된 뷰(프리셋)를 열어 확인합니다. 이때 지난 7일처럼 열리는 시점마다 기준일이 이동하는 상대 기간인지 특정 프로모션 날짜로 고정된 기간인지 구분해야 하며, 한 사람이 팀 공유 프리셋의 필터를 잠깐 바꿔 본 것이 팀 전체의 기본 뷰를 덮어쓰지 않도록 수정본 상태(Unsaved changes)를 분리해야 합니다. 또한 시간이 지나 일부 지표나 필터 값이 폐기되었을 때 리포트 전체가 먹통이 되지 않게 안내해야 합니다. 아래 내용은 맞춤 리포트·저장된 뷰 흐름을 설계하기 위한 참고이며 특정 BI 도구의 저장 개수를 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '상대 기간(Rolling/Relative)과 고정 날짜(Absolute) 저장 구분', description: '최근 30일·이번 달처럼 조회 시점에 맞춰 자동으로 날짜가 이동하는 조건과 2026-05-01~2026-05-15처럼 날짜를 고정한 조건을 구분해 저장합니다.' },
        { name: '저장된 원본 프리셋과 임시 수정 상태(Modified working copy) 분리', description: '저장된 뷰를 불러온 뒤 필터 칩을 추가·제거하면 즉시 원본을 덮어쓰지 않고 수정됨 표시를 띄워, 원본 되돌리기·덮어쓰기·새 뷰로 저장을 선택하게 합니다.' },
        { name: '개인 전용 뷰와 팀 공유 뷰의 수정 권한 및 데이터 경계', description: '팀 공유 뷰를 누가 수정·삭제할 수 있는지 제한하고, 같은 공유 뷰를 열더라도 조회하는 사람의 조직·데이터 열람 권한 범위 안에서만 숫자가 집계되게 합니다.' },
        { name: '폐기·변경된 지표(Deprecated field) 감지와 부분 실행', description: '저장해 둔 리포트의 특정 지표나 필터 항목이 나중에 이름 변경·폐기되었을 때 화면 전체를 오류로 막지 않고 어떤 항목이 바뀌었는지 알려 주며 조건 교체를 유도합니다.' },
      ],
      workflow: [
        { name: '필터·지표·상대/고정 기간 조합하고 뷰 저장하기', description: '원하는 조건과 기간 방식(상대 기간 vs 고정 날짜)을 고른 뒤 이름을 붙여 개인용 또는 팀 공유용 뷰로 저장합니다.' },
        { name: '저장된 뷰 전환과 임시 조건 변경·초기화하기', description: '탭이나 목록에서 저장된 뷰를 빠르게 전환하고, 필터를 바꿨을 때는 변경 전 원본 프리셋으로 되돌리기와 저장 선택지를 보여 줍니다.' },
        { name: '공유 링크(URL 파라미터)와 저장된 뷰 상태 맞추기', description: '현재 적용된 뷰나 임시 필터 조건을 동료에게 링크로 공유했을 때 동일한 필터 상태가 재현되되 수신자의 데이터 권한을 따르게 합니다.' },
        { name: '유효하지 않은 필터·폐기 지표 경고와 조건 수정하기', description: '저장된 뷰에 더 이상 제공되지 않는 지표나 삭제된 카테고리 값이 있으면 상단 배너와 해당 칩에 경고를 표시해 새 항목으로 교체하게 합니다.' },
      ],
      pitfalls: [
        { name: '누군가 팀 기본 뷰에서 필터를 바꿔 본 순간 모든 팀원의 화면까지 덮어쓰기', description: '조회용 필터 조작과 프리셋 원본 저장(Save)을 분리하지 않으면 팀 공용 대시보드 기준이 수시로 틀어집니다.' },
        { name: '최근 7일을 눌렀는데 당시 날짜 문자열로 고정 저장되어 한 달 뒤에도 옛날 7일만 보여 주기', description: '상대 기간을 의도했는지 고정 날짜를 의도했는지 저장 스키마에서 구분하고 화면에 계산된 실제 날짜 범위를 함께 표시하세요.' },
        { name: '리포트에 들어 있던 지표 하나가 폐기되었다고 저장된 뷰 전체를 열지 못하게 막기', description: '나머지 유효한 지표와 필터는 그대로 열어 주고, 폐기된 항목만 대체 안내와 함께 편집 가능하게 보여 주어야 기존 리포트를 복구할 수 있습니다.' },
      ],
      questions: [
        '저장된 뷰(프리셋)는 개인별로만 저장되나요, 팀·워크스페이스 전체에 공유하고 기본 뷰로 지정할 수 있나요?',
        '팀 공유 프리셋에서 일반 구성원이 필터를 바꿨을 때 원본 덮어쓰기 권한은 누구에게 있으며, 권한이 없으면 새 뷰로 저장만 허용하나요?',
        '날짜 필터를 저장할 때 최근 N일·이번 달 같은 상대 기간(Rolling)과 특정 날짜 고정(Absolute)을 모두 지원하나요?',
        '저장된 뷰에 포함된 지표나 필터 항목이 추후 폐기·삭제되었을 때 화면에서 어떻게 표시하고 대체를 안내하나요?',
        '저장된 뷰를 다른 사용자에게 공유할 때, 수신자의 데이터 열람 권한이 작성자보다 좁으면 결과는 어떻게 표시되나요?',
      ],
      example: '예시: 마케팅 리포트에서 주간 채널 성과 뷰를 상대 기간(최근 7일) 팀 프리셋으로 저장해 두고, 일반 팀원이 필터를 바꾸면 수정됨 배지와 함께 내 뷰로 따로 저장 또는 원래대로 되돌리기 버튼을 보여 주며, 폐기된 구버전 전환 지표가 포함된 프리셋을 열면 상단 안내 배너와 대체 지표를 표시하도록 구성할 수 있습니다. 실제 프리셋 공유 범위·권한 규칙·URL 동기화 방식은 서비스 정책에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'faceted-filter-chips', reason: '현재 리포트에 적용된 세그먼트·채널·기간 필터 조건을 칩으로 표시하고 개별 제거·초기화하는 표현에 참고할 수 있습니다. 실제 프리셋 저장과 쿼리 반영은 별도로 구현해야 합니다.' },
        { id: 'closable-document-tabs', reason: '여러 개의 저장된 리포트 뷰를 탭으로 열어 두고 전환하거나 닫는 표현에 참고할 수 있습니다. 실제 수정 상태 보존과 서버 저장은 구현하지 않습니다.' },
      ],
      promptSnippet: '지표·대시보드의 사용자 정의 리포트·필터 프리셋(저장된 뷰) 관리와 스키마 변경 시 깨진 조건 안내 흐름을 설계해 줘. 먼저 상대 기간(Rolling)과 고정 날짜(Absolute) 저장 구분, 저장된 원본 프리셋과 임시 필터 수정 상태(작업본)의 분리, 개인 뷰와 팀 공유 뷰의 수정 권한 및 조회자별 데이터 권한 적용, 폐기·변경된 지표나 필터 값 발생 시 복구 안내 방식을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 저장된 뷰의 구성 요소(지표·세그먼트·정렬·상대/고정 기간)와 현재 계산된 실제 날짜 범위 표시.\n2. 저장된 뷰 열람 → 필터 임시 변경(수정됨 상태) → 원본 되돌리기 / 원본 덮어쓰기 / 새 뷰로 저장 흐름.\n3. 팀 공유 뷰의 편집 권한 제한과 조회자별 데이터 접근 권한(Row/Column 제한) 적용.\n4. 저장된 뷰 안의 특정 지표·필터 값이 폐기(Deprecated)되었을 때 부분 렌더링과 조건 교체 안내.\n5. 저장된 뷰 탭·필터 칩 바·수정 상태 저장 메뉴·스키마 변경 경고 배너의 연결.\n임시 필터 조작이 팀 공유 프리셋 원본을 자동 덮어쓰게 하거나 폐기된 지표 하나 때문에 리포트 전체 열람을 막지 말고, 예시 정책과 디자인 데모를 실제 BI 저장·쿼리 시스템으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Analytics & Dashboards',
      title: 'Saved report presets, shared filter views and deprecated-metric warnings',
      summary: 'Save rolling or fixed-date filter presets, separate temporary filter edits from overwriting shared views, and handle deprecated metrics gracefully.',
      overview: 'Teams rely on saved dashboard views so they do not have to rebuild the same date, channel and segment filters every morning. Preserving whether a saved date filter is a rolling window (such as Last 30 Days) or a fixed calendar range, separating temporary on-screen filter tweaks from overwriting a shared team preset, enforcing the viewer’s own data permissions, and gracefully flagging deprecated metrics or removed filter values without crashing the whole report keeps saved analytics dependable. These concepts are design references, not default preset limits or BI schema rules.',
      concepts: [
        { name: 'Rolling relative dates versus fixed calendar ranges', description: 'Store whether a saved view uses a rolling relative window (such as Last 7 Days or Month-to-Date, evaluated at view time) or fixed start and end dates.' },
        { name: 'Saved preset baseline versus modified working state', description: 'When a user tweaks filters on a saved view, mark the view as having unsaved changes with actions to Revert, Update Preset (if permitted) or Save as New View.' },
        { name: 'Personal versus shared team presets and viewer data scope', description: 'Control who can edit or delete a shared team view, and always evaluate report queries using the viewing user’s own row and column permissions.' },
        { name: 'Graceful degradation for deprecated metrics or invalid filters', description: 'If a metric or dimension in a saved report is later renamed or deprecated, render the rest of the report and highlight the broken chip or column with a replacement prompt.' },
      ],
      workflow: [
        { name: 'Combine filters, columns and relative/fixed dates into a saved view', description: 'Let the user configure metrics, segment chips and rolling or fixed date ranges, then save the configuration as a personal or shared preset.' },
        { name: 'Switch presets and manage temporary filter edits', description: 'Allow switching between saved views via tabs or a picker, clearly indicating when active filters differ from the saved baseline.' },
        { name: 'Share reproducible view links bounded by viewer permissions', description: 'Keep active filter state shareable via link while ensuring recipients only see segments and columns permitted for their role.' },
        { name: 'Flag deprecated fields and guide inline replacement', description: 'Show an inline banner and highlight any deprecated metric or missing filter value so the owner can swap in the replacement field and update the preset.' },
      ],
      pitfalls: [
        { name: 'Auto-saving every casual filter click directly over a shared team preset', description: 'If one teammate’s exploratory filter tweak overwrites the shared default view, everyone else sees unexpected numbers. Require explicit save confirmation.' },
        { name: 'Saving a Last 7 Days selection as hardcoded static dates', description: 'Freezing a rolling preset to the exact calendar week it was created makes the saved report go stale the following week. Store the relative rule and display the resolved dates.' },
        { name: 'Failing the entire saved report with a generic error when one metric is deprecated', description: 'Instead of blocking the whole view, load valid widgets and clearly mark the deprecated metric or filter chip for editing.' },
      ],
      questions: [
        'Can saved views be kept private to an individual user, shared across a team or set as the workspace default?',
        'When a viewer changes filters on a shared preset, who can overwrite the original preset versus only saving a personal copy?',
        'How does a saved view distinguish rolling relative date windows from fixed historical date ranges?',
        'What should happen when a metric, dimension or filter value stored in a saved view is later renamed or deprecated?',
        'When a user opens a shared preset created by an admin, how are row-level or column-level data restrictions applied?',
      ],
      example: 'Example: an analytics workspace could let leads save a Weekly Acquisition preset with a rolling Last 7 Days window, show an Unsaved Changes indicator with Revert and Save As Copy buttons when teammates adjust filter chips, and display a replacement banner if a legacy conversion metric in the preset is deprecated. Confirm actual sharing permissions, URL state rules and schema-migration policies before adopting this setup.',
      relatedDesigns: [
        { id: 'faceted-filter-chips', reason: 'A reference for displaying active segment, channel and date filter chips with individual remove and reset actions. Preset persistence and query execution need separate implementation.' },
        { id: 'closable-document-tabs', reason: 'A reference for keeping multiple saved report views open in switchable, closable tabs. Unsaved-change tracking and server storage need separate implementation.' },
      ],
      promptSnippet: 'Help design a custom analytics report, saved filter-preset and schema-deprecation workflow. First confirm rolling relative dates versus fixed dates in presets, separation between the saved preset baseline and temporary filter edits (working state), personal versus shared preset edit permissions and viewer data scoping, and fallback handling when a saved metric or filter is deprecated. Do not assume undecided rules.\nBased on the answers, describe:\n1. Saved preset structure (metrics, segment chips, sort, rolling vs fixed date rule) and resolved date display.\n2. Transitions across clean saved view, modified working copy, revert to baseline, overwrite preset and save as new copy.\n3. Edit permissions on shared team views and enforcement of the viewer’s own data access scope.\n4. Graceful partial rendering and replacement guidance when a saved view references a deprecated metric or invalid filter.\n5. How saved-view tabs, filter chip bars, save/revert menus and deprecation warning banners connect.\nDo not auto-overwrite shared presets on casual filter clicks or crash an entire saved view over one deprecated field, and do not mistake example policies or design demos for a real BI persistence engine.',
    },
  },
  sources: [
    { title: 'Google Analytics Help — Customize and save detail reports', url: 'https://support.google.com/analytics/answer/10447840' },
    { title: 'Looker Studio Help — Date range controls and report filter properties', url: 'https://support.google.com/looker-studio/answer/6291067' },
  ],
}, {
  id: 'analytics-anomaly-threshold-alert-and-mute',
  aliases: {
    ko: ['지표 임계치 경보 알림', '데이터 급변 이상 감지', '경보 폭주 방지 쿨다운', '점검 시간 알림 일시 중지'],
    en: ['metric threshold alert', 'anomaly detection notification', 'alert fatigue cooldown', 'maintenance window mute'],
  },
  useCases: {
    ko: ['매출 급감·오류율 급증처럼 핵심 지표가 고정 임계치나 전주 대비 변동 폭을 넘었을 때 경보를 보낼 때', '일시적 1분 튀는 값이나 아직 집계가 덜 끝난 부분 구간 때문에 거짓 경보(False positive)가 울리지 않게 할 때', '동일 경보가 매분 반복 발송되지 않도록 재알림 대기 시간(Cooldown)과 정상 복구(Resolved) 알림을 둘 때', '예정된 서버 점검이나 캠페인 기간 동안 특정 경보를 지정 시간만 일시 중지(Mute/Snooze)할 때'],
    en: ['Triggering alerts when a KPI crosses a static threshold or drops sharply compared to a baseline period', 'Preventing false alarms from incomplete in-progress aggregation windows or tiny sample sizes', 'Avoiding alert storms through evaluation windows, cooldown intervals and recovery (resolved) notifications', 'Muting or snoozing metric alerts during scheduled maintenance with automatic re-activation'],
  },
  keywords: {
    ko: ['지표 경보', '임계치 알림', '급변 감지', '이상 징후', '경보 조건', '재알림 대기', '정상 복구 알림', '경보 일시 중지', '최소 표본 수'],
    en: ['metric alert', 'threshold rule', 'anomaly detection', 'spike and drop alert', 'evaluation window', 'alert cooldown', 'resolved notification', 'mute window', 'minimum sample size'],
  },
  text: {
    ko: {
      domain: '지표·대시보드',
      title: '지표 임계치 경보·급변 감지 알림과 점검 구간 경보 일시 중지',
      summary: '완료된 집계 구간과 최소 표본 수를 기준으로 임계치·급변 경보를 판정하고, 재알림 억제와 일시 중지(Mute) 만료를 연결합니다.',
      overview: '지표 경보는 문제를 빨리 알려 주어야 하지만, 아직 데이터 수집이 끝나지 않은 시간대를 0건 급락으로 오판하거나 새벽 시간대 트래픽 2건 중 1건 실패를 전환율 50% 폭락으로 울리면 담당자가 곧 경보를 꺼 버리게 됩니다. 완료된 집계 구간과 최소 모수(Sample size) 조건을 함께 두고, 경보 발생 → 지속 중(재알림 억제) → 정상 복구 상태를 나누며, 점검 시간 일시 중지(Mute)가 끝난 뒤 자동으로 다시 켜지게 설계해야 합니다. 아래 내용은 지표 경보·일시 중지 흐름을 설계하기 위한 참고이며 특정 모니터링 도구의 임계치나 발송 채널을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '고정 임계치와 비교 대비 급변 조건(최소 표본 수 포함)', description: '절대 수치 기준(예: 결제 실패율 5% 초과)과 이전 동시간대 대비 증감 기준을 구분하되, 모수가 너무 작은 시간대(예: 전체 요청 20건 미만)는 경보 판정에서 제외합니다.' },
        { name: '완료된 집계 구간 평가와 지연 여유 시간(Evaluation offset)', description: '집계가 아직 진행 중인 현재 분/시간이나 파이프라인 지연 구간을 그대로 평가해 거짓 급락 경보를 울리지 않도록 완료된 구간만 판정합니다.' },
        { name: '경보 상태(정상·발생·확인됨·정상 복구)와 재알림 억제(Cooldown)', description: '임계치를 넘었을 때 매 평가 주기마다 알림을 쏟아내지 않도록 재발송 간격을 두고, 지표가 정상 범위로 돌아오면 복구 완료(Resolved) 알림을 보냅니다.' },
        { name: '만료 시각이 있는 경보 일시 중지(Mute/Snooze)', description: '예정된 점검이나 이미 인지한 장애 동안 경보 알림을 잠시 끄되, 영구 방치되지 않도록 종료 시각을 지정해 자동 해제되게 합니다.' },
      ],
      workflow: [
        { name: '대상 지표·조건·평가 주기·최소 모수 설정하기', description: '감시할 지표와 필터 범위, 임계치(또는 전주 동시간 대비 변동률), 연속 충족 횟수, 최소 표본 수를 지정해 경보 규칙을 만듭니다.' },
        { name: '경보 발생 시 판단 근거와 해당 시점 차트 링크 전달하기', description: '경보가 울리면 기준 임계치, 실제 측정값, 평가 구간 시각, 바로 원인을 볼 수 있는 해당 필터 대시보드 링크를 함께 보냅니다.' },
        { name: '담당자 확인(Acknowledge) 또는 기한부 일시 중지(Mute)하기', description: '알림을 확인한 담당자가 확인 상태를 남기거나, 점검 시간 동안 몇 시간 일시 중지할지 사유와 만료 시각을 설정합니다.' },
        { name: '지표 정상화 감지 및 복구 완료 기록하기', description: '지표가 다시 정상 구간으로 돌아오면 경보 상태를 복구 완료로 전환하고 발생 시각부터 복구 시각까지의 이력을 남깁니다.' },
      ],
      pitfalls: [
        { name: '아직 집계가 안 끝난 현재 시간대 데이터를 평가해 매시간 0건 급락 경보 울리기', description: '14시 01분에 14시~15시 구간 합계를 평가하면 당연히 수치가 낮습니다. 직전 완료된 구간을 평가 창으로 사용하세요.' },
        { name: '최소 표본 수 조건 없이 비율(%) 지표만 걸어 새벽에 거짓 경보 쏟아내기', description: '새벽에 결제 시도 1건이 실패했다고 실패율 100% 긴급 경보가 울리지 않도록 최소 모수(예: 최소 30건 이상) 조건을 함께 두세요.' },
        { name: '점검 때문에 꺼 둔 경보를 다시 켜는 것을 잊어 실제 장애를 놓치기', description: '단순히 규칙을 비활성화(Off)하게만 두면 점검 후 복구를 잊기 쉽습니다. 종료 시각이 지나면 자동으로 다시 켜지는 일시 중지(Mute/Snooze)를 제공하세요.' },
      ],
      questions: [
        '경보 조건은 고정 수치 임계치인가요, 직전 기간·전주 동시간대 대비 증감률(%) 기준인가요?',
        '비율(%) 지표 경보에서 새벽 등 소량 구간 오탐을 막기 위한 최소 표본 수(최소 분모 건수) 조건을 두나요?',
        '집계 지연을 고려해 완료된 직전 구간만 평가하나요, 연속 몇 회 임계치를 넘어야 실제 경보를 발송하나요?',
        '경보가 계속 유지될 때 재알림 간격(Cooldown)은 얼마이며, 정상 수치로 돌아왔을 때 복구 완료(Resolved) 알림도 보내나요?',
        '점검이나 작업 중 경보를 일시 중지(Mute)할 때 최대 허용 기간과 자동 해제 규칙은 어떻게 되나요?',
      ],
      example: '예시: 결제 전환율 경보에서 직전 완료된 1시간 구간의 결제 시도가 최소 50건 이상이면서 전주 동시간대 대비 30% 이상 하락 상태가 2회 연속 지속될 때 경보를 보내고, 동일 경보는 2시간 동안 재발송을 억제하며, 서버 점검 시에는 최대 24시간 만료 조건으로 일시 중지(Mute)를 걸 수 있도록 구성할 수 있습니다. 실제 평가 주기·최소 모수·수신 채널은 운영 기준에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'unread-notification-badge', reason: '새로 발생한 미확인 지표 경보 건수를 상단 종 모양이나 경보 탭 배지로 표시하는 표현에 참고할 수 있습니다. 실제 임계치 평가와 알림 발송은 별도로 구현해야 합니다.' },
        { id: 'ly-activity-timeline', reason: '경보 발생·담당자 확인·일시 중지(Mute) 설정·정상 복구(Resolved) 이력을 시간순으로 추적하는 표현에 참고할 수 있습니다. 실제 상태 감지 엔진은 구현하지 않습니다.' },
      ],
      promptSnippet: '지표·대시보드의 임계치 경보·급변 감지 알림·재알림 억제 및 점검 구간 일시 중지(Mute) 흐름을 설계해 줘. 먼저 고정 임계치와 비교 변동률 조건, 비율 지표의 최소 표본 수(분모) 기준, 미완료/지연 구간 오탐 방지를 위한 평가 시점 규칙, 재알림 대기 시간(Cooldown)과 정상 복구 알림, 만료 시각이 있는 일시 중지(Mute) 규칙을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 경보 규칙 정의(대상 지표·필터·임계치·평가 주기·최소 모수·연속 횟수).\n2. 정상(OK) → 경보 발생(Firing) → 담당자 확인(Ack) / 일시 중지(Muted) → 정상 복구(Resolved) 상태 전환.\n3. 미집계 현재 구간 제외 규칙과 소량 트래픽 시간대 거짓 경보 방지 처리.\n4. 예정된 점검 구간 일시 중지 설정, 남은 중지 시간 표시, 만료 후 자동 재활성화.\n5. 미확인 경보 배지·경보 규칙 설정·일시 중지 타이머·발생/복구 이력 타임라인 화면의 연결.\n아직 집계가 끝나지 않은 구간이나 모수 1~2건 구간에 거짓 경보를 울리지 말고, 예시 정책과 디자인 데모를 실제 실시간 경보 엔진으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Analytics & Dashboards',
      title: 'Metric threshold alerts, anomaly rules and maintenance-window muting',
      summary: 'Evaluate metric alerts on complete data windows with minimum sample thresholds, and connect alert cooldowns with auto-expiring maintenance mutes.',
      overview: 'Metric alerts lose credibility fast if they fire false alarms on an in-progress hour whose batch pipeline has not finished, or scream about a 100% failure rate when 1 out of 1 midnight request fails. Evaluating only completed aggregation windows, requiring a minimum denominator sample size for rate metrics, tracking Firing, Acknowledged and Resolved states with cooldown intervals, and supporting time-bounded mute windows that unmute automatically after maintenance keeps alerting actionable. These concepts are design references, not default threshold values or paging policies.',
      concepts: [
        { name: 'Static thresholds versus baseline deltas with minimum sample size', description: 'Support both fixed numeric thresholds and period-over-period percentage drops, while requiring a minimum event count so low-traffic hours do not trigger noisy rate alerts.' },
        { name: 'Completed-window evaluation and ingestion lag offset', description: 'Evaluate alerts against the most recently completed and settled data interval rather than an incomplete current bucket or delayed batch window.' },
        { name: 'Alert states (OK, Firing, Acknowledged, Resolved) and cooldowns', description: 'Suppress duplicate notifications during an active incident via a cooldown window, and send an explicit Resolved update when the metric returns to normal.' },
        { name: 'Time-bounded maintenance mutes (Snooze)', description: 'Let operators mute an alert rule or schedule a maintenance window with an explicit end timestamp so notifications resume automatically without manual intervention.' },
      ],
      workflow: [
        { name: 'Define metric, threshold, evaluation window and minimum volume', description: 'Configure the target metric, segment filter, threshold or baseline comparison, consecutive breach count and minimum sample size.' },
        { name: 'Deliver contextual alert payloads with deep links', description: 'When an alert fires, include the threshold, observed value, evaluated time window and a direct link to the filtered chart at that timestamp.' },
        { name: 'Acknowledge active incidents or schedule a timed mute', description: 'Let responders acknowledge an alert to stop escalations, or mute notifications for a bounded duration (such as 2 hours) with a reason note.' },
        { name: 'Detect recovery and log incident duration', description: 'Transition the alert back to OK when the metric recovers, notify subscribers of resolution and record the full incident timeline.' },
      ],
      pitfalls: [
        { name: 'Evaluating an in-progress hour or delayed batch as a sudden drop to zero', description: 'Checking the current hour at 2 minutes past the hour will always look like a volume crash. Offset alert checks to settled intervals.' },
        { name: 'Triggering percentage-rate alerts on tiny overnight denominators', description: 'Without a minimum volume guard (for example, at least 50 checkouts), a single failed transaction at 3 AM triggers a high-severity alert.' },
        { name: 'Toggling an alert rule permanently off during maintenance and forgetting to re-enable it', description: 'Provide time-bounded mutes with an automatic expiration timestamp instead of relying on humans to turn disabled rules back on.' },
      ],
      questions: [
        'Do alerts trigger on static numeric thresholds, percentage change against a prior baseline (such as same hour last week), or both?',
        'What minimum sample size (denominator count) is required before a rate or conversion-percentage alert is allowed to fire?',
        'How does the evaluation schedule account for batch ingestion latency and incomplete current time buckets?',
        'How long is the re-notification cooldown while an alert remains in the Firing state, and is a Resolved notice sent upon recovery?',
        'Can operators mute an alert for a scheduled maintenance window, and how is automatic re-activation enforced when the mute expires?',
      ],
      example: 'Example: an operations dashboard could evaluate hourly checkout conversion 10 minutes after the hour closes, fire an alert only if total checkout attempts exceed 50 and conversion drops 30% below the previous week for 2 consecutive hours, enforce a 2-hour notification cooldown, and allow time-bounded mutes up to 24 hours with automatic unmuting. Confirm actual latency offsets, sample thresholds and paging channels before adopting this setup.',
      relatedDesigns: [
        { id: 'unread-notification-badge', reason: 'A reference for surfacing the count of active or unacknowledged metric alerts on a header icon or tab badge. Alert evaluation and delivery need separate implementation.' },
        { id: 'ly-activity-timeline', reason: 'A reference for showing a chronological log of alert firing, acknowledgment, mute windows and resolution events. Anomaly detection logic needs separate implementation.' },
      ],
      promptSnippet: 'Help design a metric threshold-alert, anomaly-notification and maintenance-mute workflow. First confirm static versus baseline-comparison thresholds, minimum sample-size guards for rate metrics, evaluation offsets for ingestion latency and incomplete intervals, notification cooldowns and resolved notices, and time-bounded mute rules. Do not assume undecided rules.\nBased on the answers, describe:\n1. Alert rule parameters (metric, filter scope, threshold, evaluation window, consecutive breaches, minimum volume).\n2. State transitions across OK, Firing, Acknowledged, Muted (with expiry) and Resolved.\n3. Safeguards preventing false positives on unaggregated current windows or low-traffic periods.\n4. Scheduled or ad-hoc mute windows with visible countdowns and automatic re-activation.\n5. How unread alert badges, rule configuration forms, mute controls and incident timelines connect.\nDo not evaluate incomplete time buckets as zero-drops or fire rate alerts on tiny sample sizes, and do not mistake example policies or design demos for a real monitoring and paging engine.',
    },
  },
  sources: [
    { title: 'Datadog Docs — Metric monitors, evaluation windows and alert recovery', url: 'https://docs.datadoghq.com/monitors/types/metric/' },
    { title: 'Grafana Docs — Alerting evaluation behavior, pending periods and mute timings', url: 'https://grafana.com/docs/grafana/latest/alerting/fundamentals/' },
  ],
}, {
  id: 'analytics-goal-target-pro-rata-and-forecast',
  aliases: {
    ko: ['월간 분기 목표 달성률', '일할 계산 목표 페이스', '목표치 수정 이력 보존', '하위 조직 목표 합산'],
    en: ['KPI goal and target tracking', 'pro-rated pacing line', 'target revision history', 'period-to-date attainment'],
  },
  useCases: {
    ko: ['월간·분기 목표치(Target) 대비 현재 누적 실적과 달성률(%)을 대시보드에 표시할 때', '월초·월중 시점에 전체 월간 목표 대비가 아니라 오늘 날짜 기준 일할 목표선(Pacing) 대비 앞서가는지 뒤처지는지 보여 줄 때', '누적 합산 지표(매출·신규 가입)와 기간 평균·기말 시점 지표(전환율·유지율)의 목표 비교 방식을 구분할 때', '기간 도중 목표치를 상향·하향 수정했을 때 이전 목표 기준과 변경 사유를 남길 때'],
    en: ['Displaying monthly or quarterly KPI targets alongside actual performance and attainment percentage', 'Comparing month-to-date actuals against a pro-rated daily pacing target rather than only the full end-of-month goal', 'Distinguishing cumulative sum targets (revenue, signups) from rate or point-in-time targets (conversion rate, active seats)', 'Preserving original target snapshots and revision reasons when a period target is adjusted mid-quarter'],
  },
  keywords: {
    ko: ['목표 관리', '달성률', '일할 목표', '페이스 라인', '누적 실적', '목표 수정', '영업일 기준', '분기 목표', '목표 대비 실적'],
    en: ['goal tracking', 'target attainment', 'pro-rated target', 'pacing line', 'period-to-date', 'target revision', 'business-day weighting', 'quarterly target', 'plan versus actual'],
  },
  text: {
    ko: {
      domain: '지표·대시보드',
      title: '월간·분기 목표치 대비 달성률·일할 목표선과 수정 이력 보존',
      summary: '기간 전체 목표와 현재 시점 일할 목표선(Pacing)을 구분하고, 합산·비율 지표별 달성률과 목표 수정 이력을 연결합니다.',
      overview: '30일 중 5일이 지난 시점에 월간 매출 목표 대비 달성률이 18%라고만 빨간색 경고로 띄우면, 실제로는 일할 목표(16.7%)보다 앞서 가고 있는데도 부진한 것처럼 보입니다. 기간 말 최종 목표치와 오늘 날짜까지 기대되는 일할 목표선(Pacing target)을 함께 보여 주고, 날짜가 갈수록 쌓이는 누적 합산 지표와 비율(%) 지표의 목표 비교 방식을 나누며, 분기 도중 목표치를 수정했을 때 당초 목표와 수정 목표를 구분해 남겨야 합니다. 아래 내용은 목표치·달성률 흐름을 설계하기 위한 참고이며 특정 조직의 영업일 가중치나 예측 공식을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '기간 말 전체 목표(Full-period target)와 당일 기준 일할 목표선(Pacing)', description: '월말·분기말 최종 목표 달성률과 함께, 경과 일수(달력 일수 또는 영업일 기준)에 비례해 오늘 시점에 도달했어야 할 기준선 대비 상태를 함께 표시합니다.' },
        { name: '누적 합산(Additive) 목표와 비율·스냅샷(Rate/Point-in-time) 목표 구분', description: '매출·가입 수처럼 매일 더해져 일할 기준선이 우상향하는 지표와, 전환율·불량률처럼 기간 내내 목표 비율(예: 4.5% 유지) 자체가 기준선이 되는 지표를 구분합니다.' },
        { name: '하위 조직·채널 목표 합계와 상위 전사 목표의 관계', description: '부서별·채널별 목표의 단순 합이 상위 전체 목표와 항상 같아야 하는지, 별도 전사 목표(버퍼 포함)를 독립적으로 둘 수 있는지 정합니다.' },
        { name: '기간 중 목표 수정(Revision)과 당초 목표 보존', description: '월중·분기 중에 목표 수치를 바꿨을 때 기존 목표를 흔적 없이 덮어쓰지 않고, 당초 목표(Original plan)와 수정 목표(Revised target)·수정 사유를 함께 보존합니다.' },
      ],
      workflow: [
        { name: '지표 유형에 맞는 기간·목표치·일할 기준 등록하기', description: '대상 지표가 누적 합산형인지 비율형인지에 맞춰 월간·분기 목표치와 일할 배분 방식(균등 일할·영업일 가중치)을 설정합니다.' },
        { name: '누적 실적·전체 달성률·일할 페이스 상태 함께 표시하기', description: '현재 실적, 전체 목표 대비 달성률(%), 오늘 시점 일할 목표 대비 초과·정상·미달(On track / Behind) 상태를 카드와 차트 기준선으로 보여 줍니다.' },
        { name: '기간 중 목표 수정 시 사유 기록과 기준선 전환하기', description: '권한이 있는 관리자가 목표를 수정하면 변경 시각과 사유를 남기고, 화면에서 당초 목표 대비와 수정 목표 대비를 전환해 볼 수 있게 합니다.' },
        { name: '기간 마감 후 최종 달성 결과 고정하기', description: '해당 월·분기가 끝나고 집계가 확정되면 최종 실적과 달성률을 마감 스냅샷으로 고정해 과거 달성표가 흔들리지 않게 합니다.' },
      ],
      pitfalls: [
        { name: '월초 3일 차에 전체 월간 달성률이 10%라고 일괄 미달(위험) 색상으로 표시하기', description: '경과 일수를 고려하지 않고 전체 목표 대비 숫자만으로 경고 색상을 칠하면 월초에는 모든 지표가 실패처럼 보입니다. 일할 페이스 기준을 함께 쓰세요.' },
        { name: '전환율(3.0%) 같은 비율 목표를 일할 계산해 월초 목표를 0.3%로 쪼개기', description: '누적 합산 지표만 일수로 나누어 배분할 수 있습니다. 전환율·유지율 같은 비율 지표는 일할 분할 대상이 아닙니다.' },
        { name: '분기 말에 목표치를 낮춰 덮어써서 처음부터 목표가 낮았던 것처럼 보이기', description: '당초 계획 대비 분석이 가능하도록 최초 확정 목표와 수정된 목표를 분리해 저장하세요.' },
      ],
      questions: [
        '목표를 설정하는 지표는 누적 합산형(매출, 건수)인가요, 비율·유지형(전환율, 잔존율)인가요?',
        '누적 합산형 지표의 일할 목표선(Pacing)은 달력 일수 균등 배분인가요, 평일·주말(영업일) 가중치를 다르게 두나요?',
        '진행 중인 월·분기에서 정상(On track)·주의·미달 상태 색상은 전체 목표 대비가 아니라 오늘 시점 일할 목표 대비로 판정하나요?',
        '하위 팀·채널별 목표의 합계가 상위 전체 목표와 자동으로 일치해야 하나요, 별도 입력을 허용하나요?',
        '기간 도중에 목표 수치를 수정할 수 있는 권한은 누구에게 있으며, 당초 목표(Original)와 수정 목표(Revised)를 함께 표시하나요?',
      ],
      example: '예시: 분기 매출 대시보드에서 월간 목표 3억 원을 달력 일수 기준 일할 목표선(점선)으로 차트에 그리고, 10일 차에는 일할 기대치 1억 원 대비 달성 여부로 정상/주의 배지를 표시하며, 전환율 목표 4%는 수평 기준선으로 그리고, 분기 중 목표 수정 시 당초 목표와 수정 목표를 토글로 비교하도록 구성할 수 있습니다. 실제 영업일 가중치·하위 조직 합산 규칙·수정 마감일은 경영 관리 기준에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'ly-sortable-data-table', reason: '부서·채널별 목표치, 현재 누적 실적, 일할 기대치, 달성률(%)을 열 기준으로 정렬해 비교하는 표현에 참고할 수 있습니다. 실제 일할 계산과 집계는 별도로 구현해야 합니다.' },
        { id: 'inline-edit-field', reason: '권한이 있는 관리자가 기간별·부서별 목표 수치를 제자리에서 수정하고 저장·취소하는 표현에 참고할 수 있습니다. 실제 수정 사유 기록과 당초 목표 보존은 구현하지 않습니다.' },
      ],
      promptSnippet: '지표·대시보드의 월간·분기 목표치(Target) 설정·일할 목표선(Pacing) 비교·달성률 표시 및 목표 수정 이력 보존 흐름을 설계해 줘. 먼저 누적 합산 지표와 비율/시점 지표의 목표 비교 방식 구분, 일할 목표선 계산 기준(달력 일수 균등 vs 영업일 가중치), 기간 진행 중 상태(정상/주의/미달) 판정 기준, 하위 조직 목표 합계와 상위 목표의 관계, 기간 중 목표 수정 시 당초 목표 보존 규칙을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 지표 성격(누적 합산형 vs 비율/유지형)에 따른 전체 목표·일할 기대치·현재 실적·달성률 계산식.\n2. 차트 내 목표 기준선(우상향 일할 페이스선 vs 수평 목표선)과 진행 중 구간의 상태 배지 판정.\n3. 당초 확정 목표(Original)와 기간 중 수정 목표(Revised)의 분리 저장 및 전환 비교.\n4. 전사 상위 목표와 부서·채널 하위 목표 간 합계 검증 또는 차이 표시.\n5. 목표 인라인 입력/수정·KPI 목표 달성 카드·페이스 기준선 차트·조직별 달성률 정렬 표의 연결.\n월초에 경과 일수를 무시한 채 전체 목표 대비만으로 미달 경고를 띄우거나 비율 지표를 일수로 나누지 말고, 예시 정책과 디자인 데모를 실제 경영 계획·예측 엔진으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Analytics & Dashboards',
      title: 'Period targets, pro-rated pacing lines and target revision history',
      summary: 'Separate full-period targets from pro-rated period-to-date pacing, and connect additive versus rate goals with preserved target revisions.',
      overview: 'Five days into a 30-day month, showing 18% attainment against the full monthly revenue goal in alarming red misleads teams who are actually ahead of the 16.7% pro-rated pace. Distinguishing full-period targets from pro-rated period-to-date pacing lines, treating cumulative additive metrics differently from percentage-rate metrics, and preserving original targets alongside mid-period revisions keeps goal tracking fair and auditable. These concepts are design references, not default forecasting models or planning rules.',
      concepts: [
        { name: 'Full-period target versus pro-rated period-to-date pacing', description: 'Show both overall attainment toward the end-of-period goal and current pacing against where the metric should be on today’s elapsed day or business day.' },
        { name: 'Cumulative additive goals versus rate or point-in-time goals', description: 'Prorate cumulative goals (such as revenue or signups) across elapsed days with an upward-sloping pace line, while keeping rate goals (such as conversion rate) as a flat target threshold.' },
        { name: 'Top-down organizational targets versus bottom-up team rollups', description: 'Define whether child segment or department targets must sum strictly to the company target or can carry an explicit unallocated buffer.' },
        { name: 'Original baseline plan versus mid-period target revisions', description: 'When a target is adjusted mid-month or mid-quarter, preserve the original baseline target and record the revision timestamp and note rather than overwriting history.' },
      ],
      workflow: [
        { name: 'Configure period targets and pacing allocation rules', description: 'Set monthly or quarterly targets per metric, specifying whether pacing is linear by calendar day, weighted by business days or flat for rate metrics.' },
        { name: 'Render actuals against both full target and current pace', description: 'Display actual performance, full-period attainment (%) and an On Track / Behind Pace indicator based on the pro-rated target as of today.' },
        { name: 'Record target revisions while preserving the original plan', description: 'Let authorized planners revise a target with a note, allowing viewers to compare actuals against either the Original Target or the Revised Target.' },
        { name: 'Lock final attainment snapshots when the period closes', description: 'Once the month or quarter closes and data settles, freeze final actuals against the target snapshot for historical comparison.' },
      ],
      pitfalls: [
        { name: 'Coloring metrics red at the start of the month based only on full-month attainment', description: 'On Day 3 of a month, 10% of the monthly goal is right on pace; judge in-progress status badges against the pro-rated period-to-date target.' },
        { name: 'Prorating a percentage rate target by elapsed days', description: 'A 4% conversion-rate target is 4% on Day 1 and Day 30 alike. Only cumulative volume or revenue metrics prorate across elapsed days.' },
        { name: 'Overwriting the original quarterly goal mid-quarter without keeping the baseline', description: 'Silently replacing the initial target erases planning context. Store both the original committed target and the revised target.' },
      ],
      questions: [
        'Which tracked goals are cumulative volume/revenue metrics (pro-rated over time) versus rate or ratio metrics (flat target line)?',
        'Is the period-to-date pacing line calculated evenly across calendar days or weighted by weekdays/business days?',
        'Are On Track / At Risk status indicators evaluated against the pro-rated target as of today?',
        'Must sub-team or channel targets sum exactly to the parent target, or can top-level and child targets differ?',
        'Who can revise a target mid-period, and should users be able to toggle between the Original Plan and Revised Target?',
      ],
      example: 'Example: a quarterly KPI dashboard could plot cumulative revenue against an upward-sloping daily pacing line to badge whether month-to-date performance is On Track, plot conversion rate against a flat 4.0% target line, and let admins save mid-quarter target revisions while keeping an Original vs Revised toggle. Confirm actual pacing calendars, rollup rules and revision permissions before adopting this setup.',
      relatedDesigns: [
        { id: 'ly-sortable-data-table', reason: 'A reference for sorting team or channel rows by full target, pro-rated pace target, actuals and attainment percentage. Pacing calculations need separate implementation.' },
        { id: 'inline-edit-field', reason: 'A reference for editing a period target value inline with save and cancel controls. Revision history persistence and permission checks need separate implementation.' },
      ],
      promptSnippet: 'Help design a KPI period-target, pro-rated pacing and target-revision workflow. First confirm which metrics are cumulative (pro-rated) versus flat rates, how period-to-date pacing is weighted (calendar vs business days), how in-progress status badges are evaluated, parent versus child target rollup rules, and how mid-period target revisions preserve the original plan. Do not assume undecided rules.\nBased on the answers, describe:\n1. Formulas for full-period attainment, pro-rated period-to-date target and pace variance across cumulative versus rate metrics.\n2. Visual representation of upward-sloping pacing lines versus flat rate thresholds and On Track / Behind status rules.\n3. Data structure preserving Original Target alongside Revised Target with timestamps and reasons.\n4. Alignment or variance display between top-level targets and sub-segment target sums.\n5. How inline target editors, KPI attainment cards, pacing charts and sortable breakdown tables connect.\nDo not flag early-month cumulative actuals as failing without comparing against pro-rated pace or prorate percentage-rate goals by day, and do not mistake example policies or design demos for a real financial planning engine.',
    },
  },
  sources: [
    { title: 'Google Analytics Help — Track goals and conversion events', url: 'https://support.google.com/analytics/answer/12966437' },
    { title: 'Tableau Help — Add reference lines, bands and target distributions', url: 'https://help.tableau.com/current/pro/desktop/en-us/reference_lines.htm' },
  ],
}];
