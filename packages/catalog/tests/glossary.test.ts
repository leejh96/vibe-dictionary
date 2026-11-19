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

test('glossary has 134 unique kebab-case terms across 10 categories with expanded acronyms', () => {
  assert.equal(GLOSSARY_TERMS.length, 134);
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
    'game-development',
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
    'container-query',
    'responsive-breakpoint',
    'aspect-ratio',
    'keyboard-focus-indicator',
    'skip-link',
    'breadcrumb',
    'tooltip',
    'tab-panel',
    'faceted-filter',
    'pagination',
    'largest-contentful-paint',
    'interaction-to-next-paint',
    'cumulative-layout-shift',
    'lazy-loading',
    'scrollbar-gutter',
    'content-visibility',
    'stale-while-revalidate',
    'webhook',
    'exponential-backoff',
    'request-cancellation',
    'conversion-funnel',
    'conversion-rate',
    'cohort-analysis',
    'retention-rate',
    'attribution-window',
    'anomaly-detection',
    'guardrail-metric',
    'data-freshness',
    'metric-definition',
    'success-criteria',
    'bottom-sheet',
    'segmented-control',
    'stepper-input',
    'combobox',
    'indeterminate-checkbox',
    'sticky-header',
    'rate-limiting',
    'circuit-breaker',
    'cursor-pagination',
    'optimistic-locking',
    'multi-factor-authentication',
    'presigned-url',
    'soft-delete',
    'waitlist-management',
    'break-glass-access',
    'dry-run-validation',
    'collaborative-edit-lock',
    'embargo-publishing',
    'customer-satisfaction-score',
    'ticket-deflection',
    'canned-response',
    'ticket-merging',
    'priority-escalation',
    'first-contact-resolution',
    'dunning-management',
    'double-entry-ledger',
    'usage-based-billing',
    'payment-reconciliation',
    'withholding-tax-settlement',
    'partial-refund',
    'churn-rate',
    'activation-metric',
    'north-star-metric',
    'sample-quota',
    'saved-report-view',
    'inventory-allocation',
    'reverse-logistics',
    'split-shipment',
    'proof-of-delivery',
    'cold-chain-monitoring',
    'coupon-stacking-rule',
    'win-back-campaign',
    'unsubscribe-suppression',
    'custom-quote-offer',
    'referral-attribution',
    'course-prerequisite',
    'grading-rubric-appeal',
    'certificate-verification',
    'cohort-enrollment-window',
    'timed-exam-submission',
    'game-loop',
    'save-serialization-and-checkpoint',
    'hitbox-and-hurtbox',
    'hitstop-and-game-feel',
    'coyote-time-and-input-buffering',
    'object-pooling',
    'entity-component-system',
    'heads-up-display',
    'diegetic-interface',
    'rollback-netcode',
    'skill-based-matchmaking',
    'loot-table-and-pity-system',
  ]) {
    assert.ok(ids.includes(requiredId), `Missing required term: ${requiredId}`);
  }

  const expectedCategoryCounts: Record<typeof GLOSSARY_CATEGORIES[number], number> = {
    ui: 27,
    engineering: 30,
    workflow: 11,
    'customer-support': 8,
    'payments-settlement': 9,
    'product-planning': 17,
    'business-operations': 6,
    'sales-marketing': 7,
    'education-operations': 7,
    'game-development': 12,
  };
  for (const category of GLOSSARY_CATEGORIES) {
    assert.equal(
      GLOSSARY_TERMS.filter(term => term.category === category).length,
      expectedCategoryCounts[category],
      `Expected exact count for category: ${category}`,
    );
  }

  const expectedReclassifiedMembers: Record<Exclude<typeof GLOSSARY_CATEGORIES[number], 'ui' | 'engineering'>, string[]> = {
    workflow: [
      'human-in-the-loop',
      'user-onboarding',
      'grace-period',
      'maker-checker-approval',
      'account-deactivation',
      'soft-delete',
      'waitlist-management',
      'break-glass-access',
      'dry-run-validation',
      'collaborative-edit-lock',
      'embargo-publishing',
    ],
    'customer-support': [
      'service-level-agreement',
      'voice-of-customer',
      'customer-satisfaction-score',
      'ticket-deflection',
      'canned-response',
      'ticket-merging',
      'priority-escalation',
      'first-contact-resolution',
    ],
    'payments-settlement': [
      'know-your-customer',
      'escrow-settlement',
      'proration',
      'dunning-management',
      'double-entry-ledger',
      'usage-based-billing',
      'payment-reconciliation',
      'withholding-tax-settlement',
      'partial-refund',
    ],
    'product-planning': [
      'net-promoter-score',
      'active-users',
      'conversion-funnel',
      'conversion-rate',
      'cohort-analysis',
      'retention-rate',
      'attribution-window',
      'anomaly-detection',
      'guardrail-metric',
      'data-freshness',
      'metric-definition',
      'success-criteria',
      'churn-rate',
      'activation-metric',
      'north-star-metric',
      'sample-quota',
      'saved-report-view',
    ],
    'business-operations': [
      'objectives-and-key-results',
      'inventory-allocation',
      'reverse-logistics',
      'split-shipment',
      'proof-of-delivery',
      'cold-chain-monitoring',
    ],
    'sales-marketing': [
      'sales-lead',
      'customer-relationship-management',
      'coupon-stacking-rule',
      'win-back-campaign',
      'unsubscribe-suppression',
      'custom-quote-offer',
      'referral-attribution',
    ],
    'education-operations': [
      'learning-management-system',
      'curriculum-alignment',
      'course-prerequisite',
      'grading-rubric-appeal',
      'certificate-verification',
      'cohort-enrollment-window',
      'timed-exam-submission',
    ],
    'game-development': [
      'game-loop',
      'save-serialization-and-checkpoint',
      'hitbox-and-hurtbox',
      'hitstop-and-game-feel',
      'coyote-time-and-input-buffering',
      'object-pooling',
      'entity-component-system',
      'heads-up-display',
      'diegetic-interface',
      'rollback-netcode',
      'skill-based-matchmaking',
      'loot-table-and-pity-system',
    ],
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
  assert.deepEqual(getGlossaryLinksForTechnique('ly-transposable-comparison-matrix', 4).map(l => l.id), ['supervised-learning', 'curriculum-alignment', 'cohort-analysis', 'retention-rate']);
  assert.deepEqual(getGlossaryLinksForTechnique('ly-stable-scrollbar-gutter').map(l => l.id), ['cumulative-layout-shift', 'scrollbar-gutter']);
  assert.deepEqual(getGlossaryLinksForTechnique('hover-focus-tooltip').map(l => l.id), ['tooltip']);
  assert.deepEqual(getGlossaryLinksForTechnique('ly-paginated-document-list').map(l => l.id), ['pagination']);
  assert.deepEqual(getGlossaryLinksForTechnique('ly-heatmap-grid').map(l => l.id), ['supervised-learning', 'unsupervised-learning']);
  assert.deepEqual(getGlossaryLinksForTechnique('vd-node-flow-pipeline').map(l => l.id), ['reinforcement-learning']);
  assert.deepEqual(getGlossaryLinksForTechnique('vd-diverging-bar-reveal').map(l => l.id), ['net-promoter-score']);
  assert.deepEqual(getGlossaryLinksForTechnique('ly-kanban-board').map(l => l.id), ['sales-lead']);
  assert.deepEqual(getGlossaryLinksForTechnique('ly-master-detail-split').map(l => l.id), ['customer-relationship-management']);
  assert.deepEqual(getGlossaryLinksForTechnique('inline-delete-confirmation').map(l => l.id), ['maker-checker-approval', 'account-deactivation']);

  assert.deepEqual(getGlossaryLinksForDomain('education-live-session-attendance-and-replay').map(l => l.id), ['http-live-streaming']);
  assert.deepEqual(getGlossaryLinksForDomain('cms-publishing-schedule-and-versioning').map(l => l.id), ['content-delivery-network', 'content-management-system']);
  assert.deepEqual(getGlossaryLinksForDomain('cms-publishing-schedule-and-versioning', 3).map(l => l.id), ['content-delivery-network', 'content-management-system', 'stale-while-revalidate']);
  assert.deepEqual(getGlossaryLinksForDomain('analytics-anomaly-threshold-alert-and-mute').map(l => l.id), ['unsupervised-learning', 'anomaly-detection']);
  assert.deepEqual(getGlossaryLinksForDomain('analytics-anomaly-threshold-alert-and-mute', 3).map(l => l.id), ['unsupervised-learning', 'anomaly-detection', 'guardrail-metric']);
  assert.deepEqual(getGlossaryLinksForDomain('ai-agent-state-memory-and-branching').map(l => l.id), ['reinforcement-learning']);
  assert.deepEqual(getGlossaryLinksForDomain('support-csat-survey-and-quality-review').map(l => l.id), ['voice-of-customer', 'net-promoter-score']);
  assert.deepEqual(getGlossaryLinksForDomain('support-ticket-routing-and-resolution').map(l => l.id), ['service-level-agreement', 'voice-of-customer']);
  assert.deepEqual(getGlossaryLinksForDomain('analytics-funnel-cohort-and-attribution-window').map(l => l.id), [
    'active-users',
    'conversion-funnel',
  ]);
  assert.deepEqual(getGlossaryLinksForDomain('analytics-funnel-cohort-and-attribution-window', 6).map(l => l.id), [
    'active-users',
    'conversion-funnel',
    'conversion-rate',
    'cohort-analysis',
    'retention-rate',
    'attribution-window',
  ]);
  assert.deepEqual(getGlossaryLinksForDomain('workspace-dependency-subtask-and-milestone').map(l => l.id), ['objectives-and-key-results']);
  assert.deepEqual(getGlossaryLinksForDomain('coding-lesson-objectives-and-practice').map(l => l.id), ['user-onboarding', 'learning-management-system']);
  assert.deepEqual(getGlossaryLinksForDomain('coding-lesson-objectives-and-practice', 4).map(l => l.id), ['user-onboarding', 'learning-management-system', 'curriculum-alignment', 'success-criteria']);
  assert.deepEqual(getGlossaryLinksForDomain('education-curriculum-prerequisite-and-cohort').map(l => l.id), ['learning-management-system', 'curriculum-alignment']);
  assert.deepEqual(getGlossaryLinksForDomain('education-curriculum-prerequisite-and-cohort', 3).map(l => l.id), ['learning-management-system', 'curriculum-alignment', 'cohort-analysis']);
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
    // 30 added glossary terms across UI, engineering, and product-planning
    ['container-query', ['container-query', '컨테이너 쿼리', 'Container Query', '@container']],
    ['responsive-breakpoint', ['responsive-breakpoint', '반응형 중단점', 'Responsive Breakpoint', '화면 폭 분기점']],
    ['aspect-ratio', ['aspect-ratio', '종횡비', 'Aspect Ratio', '가로세로 비율']],
    ['keyboard-focus-indicator', ['keyboard-focus-indicator', '키보드 포커스 표시', 'Keyboard Focus Indicator', '포커스 링']],
    ['skip-link', ['skip-link', '건너뛰기 링크', 'Skip Link', '본문 바로가기 링크']],
    ['breadcrumb', ['breadcrumb', '브레드크럼', 'Breadcrumb', 'breadcrumb trail']],
    ['tooltip', ['tooltip', '툴팁', 'Tooltip', '말풍선 안내']],
    ['tab-panel', ['tab-panel', '탭 패널', 'Tab Panel', 'tablist tabpanel']],
    ['faceted-filter', ['faceted-filter', '패싯 필터', 'Faceted Filter', '다중 속성 필터']],
    ['pagination', ['pagination', '페이지 나누기', 'Pagination', '페이지네이션']],
    ['largest-contentful-paint', ['largest-contentful-paint', '최대 콘텐츠 렌더링 시간(LCP)', 'Largest Contentful Paint (LCP)', 'LCP']],
    ['interaction-to-next-paint', ['interaction-to-next-paint', '다음 페인트까지의 상호작용 지연(INP)', 'Interaction to Next Paint (INP)', 'INP']],
    ['cumulative-layout-shift', ['cumulative-layout-shift', '누적 레이아웃 이동(CLS)', 'Cumulative Layout Shift (CLS)', 'CLS']],
    ['lazy-loading', ['lazy-loading', '지연 로딩', 'Lazy Loading', '레이지 로딩']],
    ['scrollbar-gutter', ['scrollbar-gutter', '스크롤바 공간', 'Scrollbar Gutter', '스크롤바 거터']],
    ['content-visibility', ['content-visibility', '콘텐츠 가시성', 'Content Visibility', 'content-visibility auto']],
    ['stale-while-revalidate', ['stale-while-revalidate', '만료 후 백그라운드 재검증(Stale-While-Revalidate)', 'Stale-While-Revalidate (SWR)', 'SWR']],
    ['webhook', ['webhook', '웹훅', 'Webhook', 'HTTP 이벤트 콜백']],
    ['exponential-backoff', ['exponential-backoff', '지수 백오프', 'Exponential Backoff', '재시도 대기 시간 배증']],
    ['request-cancellation', ['request-cancellation', '요청 취소', 'Request Cancellation', '비동기 요청 중단']],
    ['conversion-funnel', ['conversion-funnel', '전환 퍼널', 'Conversion Funnel', '퍼널 단계 분석']],
    ['conversion-rate', ['conversion-rate', '전환율', 'Conversion Rate', 'CVR']],
    ['cohort-analysis', ['cohort-analysis', '코호트 분석', 'Cohort Analysis', '동일 집단 분석']],
    ['retention-rate', ['retention-rate', '잔존율', 'Retention Rate', '리텐션 비율']],
    ['attribution-window', ['attribution-window', '기여 인정 기간', 'Attribution Window', '어트리뷰션 윈도우']],
    ['anomaly-detection', ['anomaly-detection', '이상치 감지', 'Anomaly Detection', '지표 급변 감지']],
    ['guardrail-metric', ['guardrail-metric', '가드레일 지표', 'Guardrail Metric', '방어 지표']],
    ['data-freshness', ['data-freshness', '데이터 최신성', 'Data Freshness', '집계 최신성']],
    ['metric-definition', ['metric-definition', '지표 정의', 'Metric Definition', '지표 산식 명세']],
    ['success-criteria', ['success-criteria', '성공 기준', 'Success Criteria', '출시 성공 조건']],
    // 50 added glossary terms across all 9 categories
    ['bottom-sheet', ['bottom-sheet', '바텀 시트', 'Bottom Sheet', '바텀시트']],
    ['segmented-control', ['segmented-control', '세그먼트 컨트롤', 'Segmented Control', '세그먼티드 컨트롤']],
    ['stepper-input', ['stepper-input', '스테퍼 입력', 'Stepper Input', '수량 스테퍼']],
    ['combobox', ['combobox', '콤보박스', 'Combobox', '자동완성 선택창']],
    ['indeterminate-checkbox', ['indeterminate-checkbox', '불확정 체크박스', 'Indeterminate Checkbox', '부분 선택 체크박스']],
    ['sticky-header', ['sticky-header', '고정 헤더', 'Sticky Header', '스티키 헤더']],
    ['rate-limiting', ['rate-limiting', '요청 빈도 제한', 'Rate Limiting', '레이트 리미팅']],
    ['circuit-breaker', ['circuit-breaker', '서킷 브레이커', 'Circuit Breaker', '회로 차단기 패턴']],
    ['cursor-pagination', ['cursor-pagination', '커서 기반 페이지네이션', 'Cursor-Based Pagination', '키셋 페이지네이션']],
    ['optimistic-locking', ['optimistic-locking', '낙관적 잠금', 'Optimistic Locking', '낙관적 락']],
    ['multi-factor-authentication', ['multi-factor-authentication', '다중 요소 인증(MFA)', 'Multi-Factor Authentication (MFA)', 'MFA']],
    ['presigned-url', ['presigned-url', '사전 서명된 주소', 'Presigned Link', 'Presigned URL']],
    ['soft-delete', ['soft-delete', '소프트 삭제', 'Soft Delete', '논리 삭제']],
    ['waitlist-management', ['waitlist-management', '대기열 등록 전환', 'Waitlist Offer Window', '대기자 명단 관리']],
    ['break-glass-access', ['break-glass-access', '긴급 예외 접근', 'Break-Glass Access', '브레이크 글래스']],
    ['dry-run-validation', ['dry-run-validation', '사전 모의 검증', 'Dry-Run Validation', '드라이 런 검증']],
    ['collaborative-edit-lock', ['collaborative-edit-lock', '편집 잠금과 체크인', 'Collaborative Edit Lock', '공동 편집 잠금']],
    ['embargo-publishing', ['embargo-publishing', '엠바고 예약 발행', 'Embargoed Publishing', '보도 유예 발행']],
    ['customer-satisfaction-score', ['customer-satisfaction-score', '고객 만족도 점수(CSAT)', 'Customer Satisfaction Score (CSAT)', 'CSAT']],
    ['ticket-deflection', ['ticket-deflection', '문의 자율 해결 유도', 'Ticket Deflection', '셀프 서비스 해결 유도']],
    ['canned-response', ['canned-response', '상담 매크로 답변', 'Canned Response', '매크로 답변']],
    ['ticket-merging', ['ticket-merging', '중복 문의 병합', 'Ticket Merging', '티켓 병합']],
    ['priority-escalation', ['priority-escalation', '우선순위 에스컬레이션', 'Priority Escalation', '티켓 에스컬레이션']],
    ['first-contact-resolution', ['first-contact-resolution', '초동 응대 해결률(FCR)', 'First Contact Resolution (FCR)', 'FCR']],
    ['dunning-management', ['dunning-management', '미납 재청구 독촉', 'Dunning Management', '더닝 프로세스']],
    ['double-entry-ledger', ['double-entry-ledger', '복식 원장', 'Double-Entry Ledger', '복식 부기 원장']],
    ['usage-based-billing', ['usage-based-billing', '종량제 과금', 'Usage-Based Billing', '사용량 기반 과금']],
    ['payment-reconciliation', ['payment-reconciliation', '입금 대사 정산', 'Payment Reconciliation', '결제 대사']],
    ['withholding-tax-settlement', ['withholding-tax-settlement', '원천징수 정산', 'Withholding Tax Settlement', '원천세 공제']],
    ['partial-refund', ['partial-refund', '부분 환불', 'Partial Refund', '부분 취소 환불']],
    ['churn-rate', ['churn-rate', '이탈률', 'Churn Rate', '고객 이탈률']],
    ['activation-metric', ['activation-metric', '초기 안착 지표', 'Activation Metric', '활성화 지표']],
    ['north-star-metric', ['north-star-metric', '북극성 지표', 'North Star Metric', '노스 스타 메트릭']],
    ['sample-quota', ['sample-quota', '표본 할당량', 'Sample Quota', '설문 할당량']],
    ['saved-report-view', ['saved-report-view', '저장된 리포트 보기', 'Saved Report View', '맞춤 필터 뷰']],
    ['inventory-allocation', ['inventory-allocation', '재고 할당 선점', 'Inventory Allocation', '재고 선점']],
    ['reverse-logistics', ['reverse-logistics', '반품 회수 물류', 'Reverse Logistics', '역물류']],
    ['split-shipment', ['split-shipment', '분할 배송과 합포장', 'Split and Consolidated Shipment', '합포장 배송']],
    ['proof-of-delivery', ['proof-of-delivery', '배송 완료 증빙(POD)', 'Proof of Delivery (POD)', 'POD']],
    ['cold-chain-monitoring', ['cold-chain-monitoring', '콜드체인 온도 관리', 'Cold-Chain Monitoring', '저온 물류 모니터링']],
    ['coupon-stacking-rule', ['coupon-stacking-rule', '쿠폰 중복 적용 규칙', 'Coupon Stacking Rule', '쿠폰 병행 사용 규칙']],
    ['win-back-campaign', ['win-back-campaign', '해지 방어와 재구독 유도', 'Win-Back and Retention Offer', '윈백 캠페인']],
    ['unsubscribe-suppression', ['unsubscribe-suppression', '수신 거부 제외 목록', 'Unsubscribe Suppression List', '수신 거부 목록']],
    ['custom-quote-offer', ['custom-quote-offer', '맞춤 견적 제안', 'Custom Quote Offer', '맞춤 견적서']],
    ['referral-attribution', ['referral-attribution', '추천 유입 귀속', 'Referral Source Attribution', '레퍼럴 어트리뷰션']],
    ['course-prerequisite', ['course-prerequisite', '선수 학습 요건', 'Course Prerequisite', '선수 과목 조건']],
    ['grading-rubric-appeal', ['grading-rubric-appeal', '채점 기준표와 성적 이의신청', 'Grading Rubric and Score Appeal', '채점 루브릭']],
    ['certificate-verification', ['certificate-verification', '수료증 발급 검증', 'Certificate Issuance and Verification', '수료증 검증']],
    ['cohort-enrollment-window', ['cohort-enrollment-window', '기수제 수강 기간', 'Cohort Enrollment Window', '기수 모집 기간']],
    ['timed-exam-submission', ['timed-exam-submission', '제한 시간 시험 자동 제출', 'Timed Exam Auto-Submission', '시험 타이머 자동 제출']],
    // 12 added game development glossary terms
    ['game-loop', ['game-loop', '게임 루프', 'Game Loop', '고정 타임스텝', '고정타임스텝']],
    ['save-serialization-and-checkpoint', ['save-serialization-and-checkpoint', '세이브 직렬화와 체크포인트', 'Save Serialization and Checkpoints', '세이브 마이그레이션', '세이브직렬화']],
    ['hitbox-and-hurtbox', ['hitbox-and-hurtbox', '히트박스와 허트박스', 'Hitbox and Hurtbox', '타격 판정 박스']],
    ['hitstop-and-game-feel', ['hitstop-and-game-feel', '히트스톱과 게임 필', 'Hitstop and Game Feel', '타격감']],
    ['coyote-time-and-input-buffering', ['coyote-time-and-input-buffering', '코요테 타임과 입력 버퍼링', 'Coyote Time and Input Buffering', '코요테 타임', '코요테타임']],
    ['object-pooling', ['object-pooling', '오브젝트 풀링', 'Object Pooling', '오브젝트 풀', '오브젝트풀링']],
    ['entity-component-system', ['entity-component-system', '엔티티 컴포넌트 시스템(ECS)', 'Entity Component System (ECS)', 'ECS']],
    ['heads-up-display', ['heads-up-display', '헤드업 디스플레이(HUD)', 'Heads-Up Display (HUD)', 'HUD']],
    ['diegetic-interface', ['diegetic-interface', '다이이제틱 인터페이스', 'Diegetic Interface', '다이이제틱 UI']],
    ['rollback-netcode', ['rollback-netcode', '롤백 넷코드', 'Rollback Netcode', '롤백 동기화', '롤백넷코드']],
    ['skill-based-matchmaking', ['skill-based-matchmaking', '실력 기반 매치메이킹(SBMM)', 'Skill-Based Matchmaking (SBMM)', 'SBMM']],
    ['loot-table-and-pity-system', ['loot-table-and-pity-system', '전리품 확률표와 천장 시스템', 'Loot Table and Pity System', '천장 시스템', '천장시스템']],
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

  // CLS now matches Cumulative Layout Shift by name/alias first while still finding skeleton-loading in body.
  const clsResults = rankGlossaryTerms('CLS');
  assert.equal(clsResults[0]?.item.id, 'cumulative-layout-shift');
  assert.ok(clsResults.some(entry => entry.item.id === 'skeleton-loading'));

  // Body-only match still finds relevant terms when name/alias do not contain the query.
  const ariaBusyResults = rankGlossaryTerms('aria-busy');
  assert.equal(ariaBusyResults[0]?.item.id, 'skeleton-loading');
  assert.ok(ariaBusyResults[0].matchedOn.some(m => m.field === 'prompt'));

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

  // Optional category filter narrows both browse and keyword search.
  const gameTerms = rankGlossaryTerms('', 'game-development');
  assert.equal(gameTerms.length, 12);
  assert.ok(gameTerms.every(entry => entry.item.category === 'game-development'));
  assert.equal(searchGlossaryTerms('고정타임스텝', 'game-development')[0]?.id, 'game-loop');
  assert.deepEqual(searchGlossaryTerms('고정타임스텝', 'ui'), []);
});
