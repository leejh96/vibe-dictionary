import assert from 'node:assert/strict';
import test from 'node:test';
import { DOMAIN_KNOWLEDGE, TECHNIQUES, searchDomainKnowledge, rankDomainKnowledge } from '../src/index';

test('domain knowledge searches both languages, intersects terms and keeps the existing education ID', () => {
  const education = DOMAIN_KNOWLEDGE.find(item => item.id === 'coding-lesson-objectives-and-practice');
  assert.ok(education);
  assert.equal(education.text.ko.domain, '교육');
  assert.equal(education.text.en.domain, 'Education');
  for (const query of ['교육', 'EDUCATION', '제출 피드백', 'learning completion', '코딩 교육']) {
    assert.deepEqual(searchDomainKnowledge(query).map(item => item.id), [education.id], query);
  }
  for (const query of ['커뮤니티', 'community', '공개 범위', 'report permissions', '회원 신고']) {
    assert.deepEqual(searchDomainKnowledge(query).map(item => item.id), ['community-post-visibility-and-moderation'], query);
  }
  assert.deepEqual(searchDomainKnowledge('교육 신고'), []);
  assert.deepEqual(searchDomainKnowledge('unknown-domain-123'), []);
  assert.deepEqual(searchDomainKnowledge(' \t '), DOMAIN_KNOWLEDGE);
});

test('every domain entry has bilingual guidance, distinct IDs, usable sources and valid design references', () => {
  assert.equal(new Set(DOMAIN_KNOWLEDGE.map(item => item.id)).size, DOMAIN_KNOWLEDGE.length);
  for (const item of DOMAIN_KNOWLEDGE) {
    assert.ok(item.sources.length > 0, item.id);
    for (const source of item.sources) assert.equal(new URL(source.url).protocol, 'https:');
    for (const locale of ['ko', 'en'] as const) {
      const text = item.text[locale];
      for (const value of [text.domain, text.title, text.summary, text.overview, text.example, text.promptSnippet]) assert.ok(value.trim(), item.id);
      for (const points of [text.concepts, text.workflow, text.pitfalls]) {
        assert.ok(points.length > 0, item.id);
        assert.equal(new Set(points.map(point => point.name)).size, points.length);
        for (const point of points) assert.ok(point.name.trim() && point.description.trim(), item.id);
      }
      assert.ok(text.questions.length > 0 && text.questions.every(question => question.trim()), item.id);
      assert.ok(item.keywords[locale].length > 0, item.id);
      assert.ok(item.aliases[locale].length > 0 && item.aliases[locale].every(value => value.trim()), item.id);
      assert.ok(item.useCases[locale].length > 0 && item.useCases[locale].every(value => value.trim()), item.id);
      assert.ok(text.relatedDesigns.length > 0, item.id);
      for (const related of text.relatedDesigns) assert.ok(TECHNIQUES.some(technique => technique.id === related.id), related.id);
    }
    assert.deepEqual(item.text.ko.relatedDesigns.map(related => related.id), item.text.en.relatedDesigns.map(related => related.id));
  }
});

test('service names, everyday workflow phrases and normalized bilingual inputs find the intended domain', () => {
  const cases: [string, string[]][] = [
    ['coding-lesson-objectives-and-practice', [
      '온라인 강의', '온라인강의', 'LMS', 'ＬＭＳ', '학습관리시스템', '퀴즈', '재시도', '지각 제출',
      '교육서비스를 만들고 싶어', '과제를 다시 제출', '진도 비율', '평가 대기', 'late submission',
      'online courses', 'learning completion', 'I want to build an education website',
    ]],
    ['community-post-visibility-and-moderation', [
      '회원 전용', '회원전용', '신고 처리', '신고처리', '숨김 복구', '댓글 잠금', '공개범위',
      '커뮤니티를 만들고 싶어', '회원만 볼 수 있는 게시판', '변경 기록', '이의 제기',
      'private group', 'members-only forum', 'community moderation', 'POSTS, COMMENTS!',
    ]],
  ];
  for (const [expected, queries] of cases) for (const query of queries) {
    assert.equal(searchDomainKnowledge(query)[0]?.id, expected, query);
  }
});

test('ranking favors useful fields, searches body concepts and preserves browsing and unrelated-query behavior', () => {
  const ranked = rankDomainKnowledge('초안');
  assert.equal(ranked.length, 2);
  assert.equal(ranked[0].item.id, 'coding-lesson-objectives-and-practice');
  assert.ok(ranked[0].score > ranked[1].score);
  assert.ok(rankDomainKnowledge('변경 기록')[0].matchedOn.some(match => match.field === 'concept'));
  assert.deepEqual(searchDomainKnowledge('초안'), ranked.map(({ item }) => item));
  for (const query of ['교육 신고', '교육 암호화폐 자동매매', '의료 진단', '항공권 예약', 'postage', '???', '만들고 싶어']) {
    assert.deepEqual(searchDomainKnowledge(query), [], query);
  }
  const browsing = rankDomainKnowledge(' \t ');
  assert.deepEqual(browsing.map(({ item }) => item), DOMAIN_KNOWLEDGE);
  assert.ok(browsing.every(result => result.score === 0 && result.matchedOn.length === 0));
});
