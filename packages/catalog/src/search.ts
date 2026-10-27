import { TECHNIQUES, type TechniqueItem, type DomainType, type CategoryType } from './techniques';
import { getTechniqueText } from './localization';
import { getSearchMetadata, type SearchTarget, type SearchTrigger } from './search-metadata';
import { createSearchTokenizer, normalizeSearchText, rankSearchEntries } from './search-ranking';

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
const tokens = createSearchTokenizer(SEARCH_SYNONYMS);
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
  const normalizedQuery = normalizeSearchText(query);
  const allEntries = entries(item);
  const exact = allEntries.find(entry => entry.field !== 'prompt' && normalizeSearchText(entry.value) === normalizedQuery);
  const result = rankSearchEntries(allEntries, queryTokens, weights, exact, exact?.field === 'title' ? 150 : 100);
  return result ? { item, ...result } : null;
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
