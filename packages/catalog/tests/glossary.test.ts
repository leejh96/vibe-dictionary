import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  DOMAIN_KNOWLEDGE,
  GLOSSARY_CATEGORIES,
  GLOSSARY_DOMAIN_TITLES,
  GLOSSARY_LINK_META,
  GLOSSARY_TERMS,
  TECHNIQUES,
  getGlossaryLinksForDomain,
  getGlossaryLinksForTechnique,
  getGlossaryTerm,
  rankGlossaryTerms,
  searchGlossaryTerms,
} from '../src/index';

const TEST_DIR = dirname(fileURLToPath(import.meta.url));

test('glossary has 42 unique kebab-case terms across 9 categories with expanded acronyms', () => {
  assert.equal(GLOSSARY_TERMS.length, 42);
  assert.deepEqual(GLOSSARY_CATEGORIES, [
    'ui',
    'engineering',
    'workflow',
    'customer-support',
    'payments-settlement',
    'product-planning',
    'business-operations',
    'sales-marketing',
    'education-operations',
  ]);

  const ids = GLOSSARY_TERMS.map(term => term.id);
  assert.equal(new Set(ids).size, GLOSSARY_TERMS.length);
  for (const id of ids) {
    assert.match(id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, `Invalid kebab-case ID: ${id}`);
  }

  for (const requiredId of [
    'skeleton-loading',
    'empty-state',
    'debounce',
    'optimistic-update',
    'idempotency',
    'call-to-action',
    'floating-action-button',
    'safe-area',
    'http-live-streaming',
    'content-delivery-network',
    'content-management-system',
    'supervised-learning',
    'unsupervised-learning',
    'reinforcement-learning',
    'voice-of-customer',
    'net-promoter-score',
    'active-users',
    'objectives-and-key-results',
    'learning-management-system',
    'sales-lead',
    'customer-relationship-management',
    'account-deactivation',
    'curriculum-alignment',
  ]) {
    assert.ok(ids.includes(requiredId), `Missing required term: ${requiredId}`);
  }

  const expectedCategoryCounts: Record<typeof GLOSSARY_CATEGORIES[number], number> = {
    ui: 11,
    engineering: 14,
    workflow: 5,
    'customer-support': 2,
    'payments-settlement': 3,
    'product-planning': 2,
    'business-operations': 1,
    'sales-marketing': 2,
    'education-operations': 2,
  };
  for (const category of GLOSSARY_CATEGORIES) {
    assert.equal(
      GLOSSARY_TERMS.filter(term => term.category === category).length,
      expectedCategoryCounts[category],
      `Expected exact count for category: ${category}`,
    );
  }

  const expectedReclassifiedMembers: Record<Exclude<typeof GLOSSARY_CATEGORIES[number], 'ui' | 'engineering'>, string[]> = {
    workflow: ['human-in-the-loop', 'user-onboarding', 'grace-period', 'maker-checker-approval', 'account-deactivation'],
    'customer-support': ['service-level-agreement', 'voice-of-customer'],
    'payments-settlement': ['know-your-customer', 'escrow-settlement', 'proration'],
    'product-planning': ['net-promoter-score', 'active-users'],
    'business-operations': ['objectives-and-key-results'],
    'sales-marketing': ['sales-lead', 'customer-relationship-management'],
    'education-operations': ['learning-management-system', 'curriculum-alignment'],
  };
  for (const [category, expectedIds] of Object.entries(expectedReclassifiedMembers)) {
    assert.deepEqual(
      GLOSSARY_TERMS.filter(term => term.category === category).map(term => term.id),
      expectedIds,
      `Expected exact member list for category: ${category}`,
    );
  }

  const koNames = GLOSSARY_TERMS.map(term => term.name.ko.trim().toLowerCase());
  const enNames = GLOSSARY_TERMS.map(term => term.name.en.trim().toLowerCase());
  assert.equal(new Set(koNames).size, GLOSSARY_TERMS.length);
  assert.equal(new Set(enNames).size, GLOSSARY_TERMS.length);

  // Every standalone uppercase acronym in a term name must appear expanded alongside its full title.
  // "HTTP" in "HTTP Live Streaming (HLS)" is part of the standard expanded name for HLS.
  for (const term of GLOSSARY_TERMS) {
    for (const locale of ['ko', 'en'] as const) {
      const name = term.name[locale];
      const acronymMatches = name.match(/\b[A-Z]{2,6}\b/g) ?? [];
      for (const acronym of acronymMatches) {
        if (term.id === 'http-live-streaming' && acronym === 'HTTP') continue;
        assert.match(
          name,
          new RegExp(`\\(${acronym}\\)`),
          `Acronym ${acronym} in "${name}" (${term.id}.${locale}) must be expanded as "Full Name (${acronym})"`,
        );
        const withoutParens = name.replace(/\s*\([^)]*\)/g, '').trim();
        assert.ok(withoutParens.length > acronym.length, `Missing expanded text for ${acronym} in "${name}"`);
      }
    }
  }

  const activeUsers = getGlossaryTerm('active-users')!;
  assert.doesNotMatch(activeUsers.name.ko, /[A-Z]{2,6}/);
  assert.doesNotMatch(activeUsers.name.en, /[A-Z]{2,6}/);
});

test('every glossary term has complete bilingual content, curated aliases and verified catalog links', () => {
  const techniqueIds = new Set(TECHNIQUES.map(item => item.id));
  const domainIds = new Set(DOMAIN_KNOWLEDGE.map(item => item.id));

  for (const term of GLOSSARY_TERMS) {
    for (const locale of ['ko', 'en'] as const) {
      assert.ok(term.name[locale].trim(), `${term.id}.name.${locale}`);
      assert.equal(term.text[locale].name, term.name[locale], `${term.id}.text.${locale}.name`);
      assert.ok(term.text[locale].definition.trim(), `${term.id}.definition.${locale}`);
      assert.ok(term.text[locale].example.trim(), `${term.id}.example.${locale}`);
      assert.ok(term.text[locale].promptSnippet.trim(), `${term.id}.promptSnippet.${locale}`);
      assert.ok(term.aliases[locale].length >= 2, `${term.id}.aliases.${locale} should have >= 2 entries`);
      for (const alias of term.aliases[locale]) {
        assert.ok(alias.trim(), `${term.id}.aliases.${locale} contains empty alias`);
      }
    }

    assert.equal(new Set(term.relatedTechniqueIds).size, term.relatedTechniqueIds.length, `${term.id} duplicate technique IDs`);
    assert.equal(new Set(term.relatedDomainIds).size, term.relatedDomainIds.length, `${term.id} duplicate domain IDs`);
    assert.ok(
      term.relatedTechniqueIds.length + term.relatedDomainIds.length >= 1,
      `${term.id} must link to at least 1 technique or domain knowledge entry`,
    );

    for (const techniqueId of term.relatedTechniqueIds) {
      assert.ok(techniqueIds.has(techniqueId), `${term.id} references unknown techniqueId "${techniqueId}"`);
    }
    for (const domainId of term.relatedDomainIds) {
      assert.ok(domainIds.has(domainId), `${term.id} references unknown domainId "${domainId}"`);
    }
  }
});

test('glossary domain titles match the source titles for every related domain', () => {
  const relatedIds = new Set(GLOSSARY_TERMS.flatMap(term => term.relatedDomainIds));
  const expectedTitles = new Map(
    DOMAIN_KNOWLEDGE.filter(item => relatedIds.has(item.id))
      .map(({ id, text }) => [id, { ko: text.ko.title, en: text.en.title }] as const),
  );
  assert.deepEqual(GLOSSARY_DOMAIN_TITLES, expectedTitles);
});

test('glossary-links.ts has 1:1 parity with GLOSSARY_TERMS and stays tree-shakeable', () => {
  assert.equal(GLOSSARY_LINK_META.length, GLOSSARY_TERMS.length);
  for (let i = 0; i < GLOSSARY_TERMS.length; i++) {
    const meta = GLOSSARY_LINK_META[i];
    const term = GLOSSARY_TERMS[i];
    assert.equal(meta.id, term.id);
    assert.deepEqual(meta.name, term.name);
    assert.equal(meta.category, term.category);
    assert.deepEqual(meta.relatedTechniqueIds, term.relatedTechniqueIds);
    assert.deepEqual(meta.relatedDomainIds, term.relatedDomainIds);
  }

  // Ensure glossary-links.ts contains no runtime imports of full catalog/glossary modules.
  const linksSource = readFileSync(resolve(TEST_DIR, '../src/glossary-links.ts'), 'utf8');
  const runtimeImportLines = linksSource
    .split(/\r?\n/)
    .filter(line => /^\s*import\s+(?!type\b)/.test(line));
  assert.deepEqual(runtimeImportLines, [], 'glossary-links.ts must not have runtime imports');

  // Lookup helpers
  assert.equal(getGlossaryTerm('idempotency')?.id, 'idempotency');
  assert.equal(getGlossaryTerm('objectives-and-key-results')?.id, 'objectives-and-key-results');
  assert.equal(getGlossaryTerm('non-existent-id'), undefined);

  const emptySearchLinks = getGlossaryLinksForTechnique('recoverable-search-empty-state');
  assert.deepEqual(emptySearchLinks.map(link => link.id), ['empty-state', 'debounce']);
  assert.deepEqual(getGlossaryLinksForTechnique('recoverable-search-empty-state', 1).map(l => l.id), ['empty-state']);
  assert.deepEqual(getGlossaryLinksForTechnique('recoverable-search-empty-state', 0), []);
  assert.deepEqual(getGlossaryLinksForTechnique('unknown-technique'), []);

  const idempotencyDomainLinks = getGlossaryLinksForDomain('fintech-wallet-ledger-idempotency-and-hold');
  assert.deepEqual(idempotencyDomainLinks.map(link => link.id), ['idempotency']);
  assert.deepEqual(getGlossaryLinksForDomain('subscription-plan-entitlement-and-billing', 2).map(l => l.id), ['proration', 'grace-period']);
  assert.deepEqual(getGlossaryLinksForDomain('subscription-plan-entitlement-and-billing', 1).map(l => l.id), ['proration']);
  assert.deepEqual(getGlossaryLinksForDomain('unknown-domain'), []);

  // Preserve existing priority while verifying reverse links for new terms
  assert.deepEqual(getGlossaryLinksForTechnique('morphing-state-button').map(l => l.id), ['call-to-action']);
  assert.deepEqual(getGlossaryLinksForTechnique('gooey-menu-fab').map(l => l.id), ['floating-action-button']);
  assert.deepEqual(getGlossaryLinksForTechnique('ly-bottom-destination-nav').map(l => l.id), ['safe-area']);
  assert.deepEqual(getGlossaryLinksForTechnique('ly-transposable-comparison-matrix').map(l => l.id), ['supervised-learning', 'curriculum-alignment']);
  assert.deepEqual(getGlossaryLinksForTechnique('ly-heatmap-grid').map(l => l.id), ['supervised-learning', 'unsupervised-learning']);
  assert.deepEqual(getGlossaryLinksForTechnique('vd-node-flow-pipeline').map(l => l.id), ['reinforcement-learning']);
  assert.deepEqual(getGlossaryLinksForTechnique('vd-diverging-bar-reveal').map(l => l.id), ['net-promoter-score']);
  assert.deepEqual(getGlossaryLinksForTechnique('ly-kanban-board').map(l => l.id), ['sales-lead']);
  assert.deepEqual(getGlossaryLinksForTechnique('ly-master-detail-split').map(l => l.id), ['customer-relationship-management']);
  assert.deepEqual(getGlossaryLinksForTechnique('inline-delete-confirmation').map(l => l.id), ['maker-checker-approval', 'account-deactivation']);

  assert.deepEqual(getGlossaryLinksForDomain('education-live-session-attendance-and-replay').map(l => l.id), ['http-live-streaming']);
  assert.deepEqual(getGlossaryLinksForDomain('cms-publishing-schedule-and-versioning').map(l => l.id), ['content-delivery-network', 'content-management-system']);
  assert.deepEqual(getGlossaryLinksForDomain('analytics-anomaly-threshold-alert-and-mute').map(l => l.id), ['unsupervised-learning']);
  assert.deepEqual(getGlossaryLinksForDomain('ai-agent-state-memory-and-branching').map(l => l.id), ['reinforcement-learning']);
  assert.deepEqual(getGlossaryLinksForDomain('support-csat-survey-and-quality-review').map(l => l.id), ['voice-of-customer', 'net-promoter-score']);
  assert.deepEqual(getGlossaryLinksForDomain('support-ticket-routing-and-resolution').map(l => l.id), ['service-level-agreement', 'voice-of-customer']);
  assert.deepEqual(getGlossaryLinksForDomain('analytics-funnel-cohort-and-attribution-window').map(l => l.id), ['active-users']);
  assert.deepEqual(getGlossaryLinksForDomain('workspace-dependency-subtask-and-milestone').map(l => l.id), ['objectives-and-key-results']);
  assert.deepEqual(getGlossaryLinksForDomain('coding-lesson-objectives-and-practice').map(l => l.id), ['user-onboarding', 'learning-management-system']);
  assert.deepEqual(getGlossaryLinksForDomain('education-curriculum-prerequisite-and-cohort').map(l => l.id), ['learning-management-system', 'curriculum-alignment']);
  assert.deepEqual(getGlossaryLinksForDomain('notification-scheduled-campaign-and-unsubscribe').map(l => l.id), ['sales-lead']);
  assert.deepEqual(getGlossaryLinksForDomain('workspace-template-custom-field-and-archiving').map(l => l.id), ['customer-relationship-management']);
  assert.deepEqual(getGlossaryLinksForDomain('account-dormancy-lockout-and-reactivation').map(l => l.id), ['account-deactivation']);
  assert.deepEqual(getGlossaryLinksForDomain('subscription-seat-license-and-member-change').map(l => l.id), ['proration', 'account-deactivation']);
});

test('glossary search matches both languages, prioritizes names/aliases and avoids unrelated fallback', () => {
  const topCases: [string, string[]][] = [
    ['skeleton-loading', ['스켈레톤 로딩', 'Skeleton Loading', '로딩 뼈대 화면', 'shimmer skeleton']],
    ['empty-state', ['빈 상태', 'Empty State', '검색 결과 없을 때', 'zero state']],
    ['debounce', ['디바운스', 'Debounce', '타자 멈춘 뒤 검색', '입력 지연 호출']],
    ['optimistic-update', ['낙관적 업데이트', 'Optimistic Update', '서버 응답 전에 화면 먼저 바꾸기', 'optimistic UI']],
    ['idempotency', ['멱등성', 'Idempotency', '결제 두 번 방지', '중복 결제 막기', 'prevent double charge']],
    ['role-based-access-control', ['RBAC', 'ＲＢＡＣ', '역할 기반 접근 제어', 'role based access control']],
    ['server-sent-events', ['SSE', '서버 전송 이벤트', 'Server-Sent Events', 'EventSource']],
    ['retrieval-augmented-generation', ['RAG', '검색 증강 생성', 'Retrieval-Augmented Generation']],
    ['dead-letter-queue', ['DLQ', '데드 레터 큐', 'Dead-Letter Queue', '실패 작업 보관 큐']],
    ['human-in-the-loop', ['HITL', '인간 개입 승인', 'Human-in-the-Loop', '휴먼인더루프']],
    ['service-level-agreement', ['SLA', '서비스 수준 협약', '응대 목표 시간']],
    ['know-your-customer', ['KYC', '고객 확인 절차', '판매자 입점 본인인증']],
    ['focus-trap', ['포커스 트랩', 'Focus Trap', '모달 밖으로 포커스 이탈 방지']],
    ['proration', ['일할 계산', 'Proration', '중도 변경 차액 계산']],
    ['grace-period', ['유예 기간', 'Grace Period', '결제 실패 유예']],
    // 18 expanded glossary terms: IDs, names, and representative aliases
    ['call-to-action', ['call-to-action', '행동 유도(CTA)', 'Call to Action (CTA)', 'CTA', '콜투액션', '행동 유도 버튼', 'primary action']],
    ['floating-action-button', ['floating-action-button', '플로팅 액션 버튼(FAB)', 'Floating Action Button (FAB)', 'FAB', '플로팅 버튼', 'floating button']],
    ['safe-area', ['safe-area', '안전 영역', 'Safe Area', '세이프 에어리어', '안전 여백', 'safe area inset']],
    ['http-live-streaming', ['http-live-streaming', 'HTTP 라이브 스트리밍(HLS)', 'HTTP Live Streaming (HLS)', 'HLS', 'm3u8', 'm3u8 playlist']],
    ['content-delivery-network', ['content-delivery-network', '콘텐츠 전송 네트워크(CDN)', 'Content Delivery Network (CDN)', 'CDN', '엣지 캐시', 'edge cache']],
    ['content-management-system', ['content-management-system', '콘텐츠 관리 시스템(CMS)', 'Content Management System (CMS)', 'CMS', '헤드리스 CMS', 'headless CMS']],
    ['supervised-learning', ['supervised-learning', '지도 학습', 'Supervised Learning', '지도학습', 'supervised ML', 'labeled training']],
    ['unsupervised-learning', ['unsupervised-learning', '비지도 학습', 'Unsupervised Learning', '비지도학습', 'unsupervised ML', 'pattern discovery']],
    ['reinforcement-learning', ['reinforcement-learning', '강화 학습', 'Reinforcement Learning', '강화학습', 'RL', 'reward-based learning']],
    ['voice-of-customer', ['voice-of-customer', '고객의 소리(VOC)', 'Voice of Customer (VOC)', 'VOC', '고객 피드백', 'customer feedback']],
    ['net-promoter-score', ['net-promoter-score', '순추천지수(NPS)', 'Net Promoter Score (NPS)', 'NPS', '순추천고객지수', 'promoter score']],
    ['active-users', ['active-users', '활성 사용자', 'Active Users', 'MAU', 'WAU', 'DAU', '월간 활성 사용자', 'weekly active users']],
    ['objectives-and-key-results', ['objectives-and-key-results', '목표와 핵심 결과(OKR)', 'Objectives and Key Results (OKR)', 'OKR', 'KR', '핵심 결과', 'key results']],
    ['learning-management-system', ['learning-management-system', '학습 관리 시스템(LMS)', 'Learning Management System (LMS)', 'LMS', '학습 관리', 'learning platform']],
    ['sales-lead', ['sales-lead', '잠재 고객', 'Sales Lead', '리드', '잠재고객', 'lead', 'sales prospect']],
    ['customer-relationship-management', ['customer-relationship-management', '고객 관계 관리(CRM)', 'Customer Relationship Management (CRM)', 'CRM', '고객 관리', 'sales pipeline CRM']],
    ['account-deactivation', ['account-deactivation', '계정 비활성화', 'Account Deactivation', '계정 중지', 'disable account']],
    ['curriculum-alignment', ['curriculum-alignment', '교육과정 연계', 'Curriculum Alignment', '성취기준 연계', 'curriculum mapping']],
  ];

  for (const [expectedId, queries] of topCases) {
    for (const query of queries) {
      const results = searchGlossaryTerms(query);
      assert.equal(results[0]?.id, expectedId, `Expected "${query}" to rank ${expectedId} first, got ${results[0]?.id}`);
    }
  }

  // Name / alias matches outrank body-only matches.
  const rankedDebounce = rankGlossaryTerms('디바운스');
  assert.equal(rankedDebounce[0]?.item.id, 'debounce');
  assert.ok(rankedDebounce[0].matchedOn.some(m => m.field === 'name' || m.field === 'alias'));

  // Body-only match still finds relevant terms when name/alias do not contain the query.
  const clsResults = rankGlossaryTerms('CLS');
  assert.equal(clsResults[0]?.item.id, 'skeleton-loading');
  assert.ok(clsResults[0].matchedOn.some(m => m.field === 'prompt'));

  // Empty / whitespace queries browse all in catalog order with zero score.
  for (const emptyQuery of ['', ' \t\n ']) {
    const browsing = rankGlossaryTerms(emptyQuery);
    assert.deepEqual(browsing.map(r => r.item), GLOSSARY_TERMS);
    assert.ok(browsing.every(r => r.score === 0 && r.matchedOn.length === 0));
    assert.deepEqual(searchGlossaryTerms(emptyQuery), GLOSSARY_TERMS);
  }

  // Unknown or stopword-only queries return [] with no unrelated fallback.
  for (const unknownQuery of ['unknown-glossary-term-999', '???', '용어 뜻 알려줘', '암호화폐 자동매매']) {
    assert.deepEqual(searchGlossaryTerms(unknownQuery), [], `Expected empty results for "${unknownQuery}"`);
    assert.deepEqual(rankGlossaryTerms(unknownQuery), [], `Expected empty ranked results for "${unknownQuery}"`);
  }

  // searchGlossaryTerms matches rankGlossaryTerms order.
  assert.deepEqual(
    searchGlossaryTerms('로딩'),
    rankGlossaryTerms('로딩').map(r => r.item),
  );
});
