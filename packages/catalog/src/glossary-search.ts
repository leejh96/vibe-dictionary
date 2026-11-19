import { GLOSSARY_TERMS, type GlossaryTerm } from './glossary';
import type { GlossaryCategory } from './glossary-links';
import {
  createSearchEntries,
  createSearchTokenizer,
  normalizeSearchText,
  rankSearchEntries,
  type SearchTextEntry,
} from './search-ranking';

export type GlossaryMatchField = 'name' | 'alias' | 'definition' | 'example' | 'prompt';

export interface RankedGlossaryTerm {
  item: GlossaryTerm;
  score: number;
  matchedOn: { field: GlossaryMatchField; value: string }[];
}

const GLOSSARY_SYNONYMS: readonly (readonly string[])[] = [
  ['skeleton', '스켈레톤', '뼈대'],
  ['loading', '로딩', '불러오기'],
  ['emptystate', 'empty state', '빈 상태', '빈상태', '빈 화면', '결과 없음', '데이터 없음'],
  ['validation', '유효성 검증', '유효성 검사', '입력 검증', '인라인 에러'],
  ['disclosure', '점진적 공개', '접기 펼치기', '아코디언'],
  ['toast', '토스트'],
  ['snackbar', '스낵바'],
  ['commandpalette', 'command palette', '커맨드 팔레트', '명령 팔레트', '빠른 실행창'],
  ['focustrap', 'focus trap', '포커스 트랩', '포커스 가두기', '초점 고정'],
  ['virtualscroll', 'virtual scroll', 'virtual scrolling', '가상 스크롤', '목록 가상화', '윈도잉'],
  ['debounce', '디바운스', '디바운싱', '입력 지연'],
  ['optimistic', '낙관적'],
  ['idempotency', '멱등성', '결제 두 번 방지', '중복 결제 막기', '중복 요청 방지'],
  ['rbac', 'role-based access control', 'role based access control', '역할 기반 접근 제어', '역할 기반 권한'],
  ['sse', 'server-sent events', '서버 전송 이벤트', 'eventsource'],
  ['rag', 'retrieval-augmented generation', 'retrieval augmented generation', '검색 증강 생성'],
  ['dlq', 'dead-letter queue', 'dead letter queue', '데드 레터 큐', '실패 작업 보관 큐'],
  ['auditlog', 'audit log', 'audit trail', '감사 로그', '변경 이력'],
  ['hitl', 'human-in-the-loop', 'human in the loop', '인간 개입 승인', '휴먼인더루프'],
  ['sla', 'service-level agreement', 'service level agreement', '서비스 수준 협약', '응대 목표 시간'],
  ['kyc', 'know your customer', '고객 확인 절차', '고객 신원 확인'],
  ['onboarding', '온보딩', '초기 설정'],
  ['escrow', '에스크로'],
  ['proration', 'prorated', 'pro-rata', '일할 계산', '일할계산', '프로레이션'],
  ['graceperiod', 'grace period', '유예 기간', '유예기간'],
  ['makerchecker', 'maker-checker', 'dual-control', '이중 승인', '메이커 체커', '메이커-체커', '2인 승인'],
  ['gameloop', 'game loop', 'fixed timestep', '게임 루프', '게임루프', '고정 타임스텝', '고정타임스텝'],
  ['saveslot', 'save slot', 'save serialization', 'checkpoint', '세이브 직렬화', '세이브직렬화', '세이브 슬롯', '세이브슬롯', '체크포인트'],
  ['hitbox', 'hurtbox', '히트박스', '허트박스', '타격 판정', '피격 판정'],
  ['hitstop', 'game feel', '히트스톱', '게임 필', '게임필', '타격감', '히트 프리즈', '히트프리즈', '역경직'],
  ['coyotetime', 'coyote time', 'input buffering', '코요테 타임', '코요테타임', '입력 버퍼링', '입력버퍼링', '선입력'],
  ['objectpool', 'object pooling', '오브젝트 풀링', '오브젝트풀링', '오브젝트 풀', '오브젝트풀'],
  ['ecs', 'entity component system', '엔티티 컴포넌트 시스템'],
  ['hud', 'heads-up display', '헤드업 디스플레이', '전투 hud', '전투hud'],
  ['diegetic', 'diegetic ui', 'diegetic interface', '다이이제틱', '다이이제틱 ui', '다이이제틱ui', '세계관 내장 ui'],
  ['rollback', 'rollback netcode', '롤백 넷코드', '롤백넷코드', '롤백 동기화'],
  ['sbmm', 'skill-based matchmaking', 'mmr', '실력 기반 매치메이킹', '매치메이킹'],
  ['loottable', 'loot table', 'pity system', '전리품 확률표', '전리품확률표', '천장 시스템', '천장시스템', '가챠 천장', '가챠천장'],
];

const GLOSSARY_STOP_WORDS = [
  '용어', '뜻', '의미', '설명', '뭐야', '무엇', '알려줘', '알고', '대한',
  'term', 'glossary', 'what', 'mean', 'meaning', 'explain', 'definition',
] as const;

const tokens = createSearchTokenizer(GLOSSARY_SYNONYMS, GLOSSARY_STOP_WORDS);

const weights: Record<GlossaryMatchField, number> = {
  name: 35,
  alias: 28,
  definition: 12,
  example: 6,
  prompt: 2,
};

const index = new Map<GlossaryTerm, SearchTextEntry<GlossaryMatchField>[]>();

function entries(item: GlossaryTerm): SearchTextEntry<GlossaryMatchField>[] {
  const cached = index.get(item);
  if (cached) return cached;
  const fields: [GlossaryMatchField, string[]][] = [
    ['name', [item.id, item.name.ko, item.name.en]],
    ['alias', [...item.aliases.ko, ...item.aliases.en]],
    ['definition', [item.text.ko.definition, item.text.en.definition]],
    ['example', [item.text.ko.example, item.text.en.example]],
    ['prompt', [item.text.ko.promptSnippet, item.text.en.promptSnippet]],
  ];
  const result = createSearchEntries(fields, tokens);
  index.set(item, result);
  return result;
}

export function rankGlossaryTerms(query = '', category?: GlossaryCategory): RankedGlossaryTerm[] {
  const candidates = category
    ? GLOSSARY_TERMS.filter(term => term.category === category)
    : GLOSSARY_TERMS;
  if (!query.trim()) {
    return candidates.map(item => ({ item, score: 0, matchedOn: [] }));
  }
  const queryTokens = tokens(query);
  const normalizedQuery = normalizeSearchText(query);
  const results: RankedGlossaryTerm[] = [];
  for (const item of candidates) {
    const allEntries = entries(item);
    const exact = allEntries.find(entry => entry.field !== 'prompt' && entry.normalizedValue === normalizedQuery);
    const exactBonus = exact?.field === 'name' ? 150 : exact?.field === 'alias' ? 120 : 100;
    const result = rankSearchEntries(allEntries, queryTokens, weights, exact, exactBonus);
    if (result) results.push({ item, ...result });
  }
  // Stable sort preserves catalog order for ties.
  return results.sort((a, b) => b.score - a.score);
}

export function searchGlossaryTerms(query = '', category?: GlossaryCategory): GlossaryTerm[] {
  return rankGlossaryTerms(query, category).map(({ item }) => item);
}
