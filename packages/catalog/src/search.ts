import { TECHNIQUES, type TechniqueItem, type DomainType, type CategoryType } from './techniques';
import { getTechniqueText } from './localization';
import { getSearchMetadata, type SearchTarget, type SearchTrigger } from './search-metadata';

// Bilingual equivalences describe one concept each. Targets and triggers stay separate metadata.
export const SEARCH_SYNONYMS: readonly (readonly string[])[] = [
  ['button', 'buttons', '버튼', 'cta'], ['card', 'cards', '카드'], ['text', '텍스트', '글자', '문구'],
  ['list', '목록', '리스트'], ['background', '배경'], ['shape', '도형', '오브젝트'],
  ['scene', '장면', '씬'], ['navigation', '내비게이션', '네비게이션'], ['panel', '패널'],
  ['input', '입력'], ['chart', '차트'], ['logo', '로고'], ['image', '이미지', '사진'],
  ['pointer', 'cursor', 'mouse', '커서', '마우스', '포인터'],
  ['pointer-move', 'pointer movement', 'mouse movement', '커서 이동', '마우스 이동', '포인터 이동'],
  ['hover', '호버', '마우스를 올리면', '마우스를 올릴 때', '마우스 올리기', '마우스 진입'],
  ['click', 'clicked', '클릭', '눌렀을 때'], ['hold', 'long press', '길게 누르기', '길게 누르는', '길게 눌러'],
  ['drag', 'dragging', '드래그'], ['auto', 'automatic', '자동'], ['static', '정적'],
  ['magnetic', '마그네틱', '자석처럼', '자석'], ['follow', 'following', '따라오는', '따라오게', '따라가는', '따라가게'],
  ['ripple', '리플', '물결', '파동'], ['shimmer', '시머', '광택'], ['glow', '글로우', '발광', '빛나는'],
  ['neon', '네온'], ['flip', 'flips', 'flipped', 'flipping', '플립', '뒤집기', '뒤집는', '뒤집어'], ['tilt', '틸트', '기울어지는', '기울어짐', '기울이기'],
  ['scroll', 'scrolling', 'scrolled', '스크롤'], ['continuous', 'continuously', 'continually', '계속', '끊임없이'],
  ['blur', 'blurred', 'blurring', '블러', '흐림', '흐리게'], ['face', '얼굴', '얼굴만'],
  ['glass', 'glassmorphism', '글래스모피즘', '글래스', '유리'], ['spring', '스프링', '탄성'],
  ['bounce', '바운스', '통통', '튀는'], ['stagger', 'staggered', '스태거', '순차', '차례대로'],
  ['accordion', '아코디언'], ['loading', '로딩'], ['typewriter', '타이프라이터', '타자기'],
  ['scramble', '스크램블'], ['decode', '해독'], ['gradient', '그라데이션'],
  ['counter', 'count up', 'count-up', '카운트업', '카운터'], ['highlight', '하이라이트', '형광펜'],
  ['confetti', '컨페티', '폭죽', '꽃가루'], ['error', '오류', '에러'], ['shake', '흔들림', '진동'],
  ['heart', '하트'], ['toast', '토스트'], ['notification', '알림'], ['tab', 'tabs', '탭'],
  ['marquee', '마키', '마퀴'], ['skeleton', '스켈레톤'], ['focus', '포커스', '초점'],
  ['before-after', 'before after', 'before/after', '비포 애프터', '전후 비교'], ['toggle', '토글'],
  ['progress', '진행률', '진행 바'], ['gauge', '게이지'], ['menu', '메뉴'], ['slot', '슬롯'],
  ['password', '비밀번호'], ['svg', '에스브이지'], ['blob', '블롭'], ['gooey', '구이'],
  ['orbit', '공전', '궤도'], ['aurora', '오로라'], ['particle', '파티클', '입자'],
  ['network', '네트워크'], ['dot', '도트', '점'], ['beam', '빔', '빛줄기'],
  ['wave', '파도'], ['parallax', '패럴랙스'], ['zoom', '줌', '확대'], ['isometric', '아이소메트릭'],
  ['glitch', '글리치'], ['radar', '레이더'], ['grid', '격자', '그리드'], ['prism', '프리즘'],
  ['bento', '벤토', '도시락'], ['masonry', '메이슨리', '워터폴', 'waterfall', 'pinterest', '핀터레스트'],
  ['honeycomb', '벌집'], ['dock', '독바', '도크'], ['palette', '팔레트'],
  ['sidebar', '사이드바'], ['breadcrumb', '브레드크럼'], ['kanban', '칸반'], ['heatmap', '히트맵'],
  ['neumorphism', '뉴모피즘'], ['clay', 'claymorphism', '클레이', '클레이모피즘'],
  ['pixel', '픽셀'], ['retro', '레트로'], ['synthwave', '신스웨이브'], ['blueprint', '설계도', '블루프린트'],
  ['halftone', '하프톤', '망점'], ['holographic', '홀로그래픽'], ['receipt', '영수증'],
  ['chrome', '크롬'], ['cyberpunk', '사이버펑크'], ['launch', '런칭', '출시'], ['showreel', '쇼릴'],
  ['countdown', '카운트다운'], ['funnel', '퍼널'], ['lower-third', 'lower third', '로어써드'],
  ['spectrum', '스펙트럼'], ['ticker', '티커', '뉴스띠'],
];
const stopWords = new Set('a an the to of in on at with for and or i my want please make create implement design effect this that me it is as can you add show using 디자인 효과 구현 구현해 구현해줘 만들어 만들어줘 해줘 주세요 줘 이 가 은 는 을 를 에 에서 으로 처럼 때 하면 되게 하게 살짝'.split(' '));
const escapeRegex = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// Replace all aliases in a single pass: a canonical term can never be replaced again by a later group.
const aliases = SEARCH_SYNONYMS.flatMap((group) => group.map(alias => ({ alias: alias.normalize('NFKC').toLowerCase(), canonical: group[0] })))
  .sort((a, b) => b.alias.length - a.alias.length);
const aliasMap = new Map(aliases.map(({ alias, canonical }) => [alias, canonical]));
const aliasPattern = new RegExp(aliases.map(({ alias }) => /[a-z]/.test(alias)
  ? `(?<![a-z0-9])${escapeRegex(alias)}(?![a-z0-9])` : escapeRegex(alias)).join('|'), 'gu');
function tokens(text: string): string[] {
  const canonical = text.normalize('NFKC').toLowerCase().replace(aliasPattern, match => ` ${aliasMap.get(match)!} `);
  return [...new Set(canonical.split(/[^\p{L}\p{N}.%-]+/u).map(token => token.replace(/^(?:을|를|이|가|은|는)$/, '')).filter(token => token && !stopWords.has(token)))];
}
export type MatchField = 'title' | 'alias' | 'keyword' | 'useCase' | 'target' | 'trigger' | 'summary' | 'prompt';
export interface SearchMatch { field: MatchField; value: string; }
export interface RankedTechnique { item: TechniqueItem; score: number; matchedOn: SearchMatch[]; }
export interface SearchOptions {
  query?: string;
  domain?: DomainType;
  category?: CategoryType;
  target?: SearchTarget;
  trigger?: SearchTrigger;
}
const weights: Record<MatchField, number> = { title: 30, alias: 28, keyword: 20, useCase: 18, target: 8, trigger: 6, summary: 12, prompt: 1 };
type Entry = SearchMatch & { tokens: Set<string> };
const index = new Map<TechniqueItem, Entry[]>();
function entries(item: TechniqueItem): Entry[] {
  const cached = index.get(item);
  if (cached) return cached;
  const en = getTechniqueText(item, 'en');
  const meta = getSearchMetadata(item);
  const fields: [MatchField, string[]][] = [
    ['title', [item.id, item.titleKo, item.titleEn]], ['alias', [...meta.aliases.ko, ...meta.aliases.en]],
    ['keyword', [...item.vibeKeywords, ...en.vibeKeywords, item.vibeTag, en.vibeTag]],
    ['useCase', [...meta.useCases.ko, ...meta.useCases.en]], ['target', meta.targets], ['trigger', meta.triggers],
    ['summary', [item.summary, en.summary]], ['prompt', [item.promptSnippet, en.promptSnippet]],
  ];
  const result = fields.flatMap(([field, values]) => values.map(value => ({ field, value, tokens: new Set(tokens(value)) })));
  index.set(item, result);
  return result;
}
function rank(item: TechniqueItem, query: string, queryTokens: string[]): RankedTechnique | null {
  if (!query.trim()) return { item, score: 0, matchedOn: [] };
  const normalizedQuery = query.normalize('NFKC').trim().toLowerCase();
  const allEntries = entries(item);
  const exact = allEntries.find(entry => entry.field !== 'prompt' && entry.value.normalize('NFKC').trim().toLowerCase() === normalizedQuery);
  if (!queryTokens.length && !exact) return null;
  const matchedOn: SearchMatch[] = [];
  const covered = new Set<string>();
  const best = new Map<string, number>();
  for (const entry of allEntries) {
    const matched = queryTokens.filter(token => entry.tokens.has(token));
    if (!matched.length) continue;
    for (const token of matched) {
      covered.add(token);
      best.set(token, Math.max(best.get(token) ?? 0, weights[entry.field]));
    }
    if (!matchedOn.some(match => match.field === entry.field)) matchedOn.push({ field: entry.field, value: entry.value });
  }
  // Unknown words count against coverage: an unrelated request with one generic word is not enough.
  if (!exact && covered.size < Math.max(1, Math.ceil(queryTokens.length * 0.6))) return null;
  let score = [...best.values()].reduce((sum, weight) => sum + weight, 0);
  score += queryTokens.length ? Math.round(20 * covered.size / queryTokens.length) : 0;
  if (exact) {
    score += exact.field === 'title' ? 150 : 100;
    if (!matchedOn.some(match => match.field === exact.field)) matchedOn.unshift({ field: exact.field, value: exact.value });
  }
  return { item, score, matchedOn: matchedOn.slice(0, 4) };
}
export function searchTechniques(options: SearchOptions = {}): RankedTechnique[] {
  const query = options.query ?? '';
  const queryTokens = tokens(query);
  const results: RankedTechnique[] = [];
  for (const item of TECHNIQUES) {
    if (options.domain && item.domain !== options.domain || options.category && item.category !== options.category) continue;
    const meta = getSearchMetadata(item);
    if (options.target && !meta.targets.includes(options.target) || options.trigger && !meta.triggers.includes(options.trigger)) continue;
    const result = rank(item, query, queryTokens);
    if (result) results.push(result);
  }
  // Stable sort preserves catalog order for ties and for browsing without a query.
  return results.sort((a, b) => b.score - a.score);
}
export function matchesSearch(item: TechniqueItem, query: string): boolean {
  return rank(item, query, tokens(query)) !== null;
}
