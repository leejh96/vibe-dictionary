import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  DOMAIN_KNOWLEDGE,
  GLOSSARY_CATEGORIES,
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

test('glossary has 24 unique kebab-case terms across ui, engineering and workflow with expanded acronyms', () => {
  assert.ok(GLOSSARY_TERMS.length >= 20 && GLOSSARY_TERMS.length <= 30);
  assert.equal(GLOSSARY_TERMS.length, 24);
  assert.deepEqual(GLOSSARY_CATEGORIES, ['ui', 'engineering', 'workflow']);

  const ids = GLOSSARY_TERMS.map(term => term.id);
  assert.equal(new Set(ids).size, GLOSSARY_TERMS.length);
  for (const id of ids) {
    assert.match(id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, `Invalid kebab-case ID: ${id}`);
  }

  for (const requiredId of ['skeleton-loading', 'empty-state', 'debounce', 'optimistic-update', 'idempotency']) {
    assert.ok(ids.includes(requiredId), `Missing required term: ${requiredId}`);
  }

  for (const category of GLOSSARY_CATEGORIES) {
    assert.ok(
      GLOSSARY_TERMS.filter(term => term.category === category).length >= 6,
      `Expected balanced coverage for category: ${category}`,
    );
  }

  const koNames = GLOSSARY_TERMS.map(term => term.name.ko.trim().toLowerCase());
  const enNames = GLOSSARY_TERMS.map(term => term.name.en.trim().toLowerCase());
  assert.equal(new Set(koNames).size, GLOSSARY_TERMS.length);
  assert.equal(new Set(enNames).size, GLOSSARY_TERMS.length);

  // Every standalone uppercase acronym in a term name must appear expanded alongside its full title.
  for (const term of GLOSSARY_TERMS) {
    for (const locale of ['ko', 'en'] as const) {
      const name = term.name[locale];
      const acronymMatches = name.match(/\b[A-Z]{2,6}\b/g) ?? [];
      for (const acronym of acronymMatches) {
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
