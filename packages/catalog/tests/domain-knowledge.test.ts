import assert from 'node:assert/strict';
import test from 'node:test';
import { DOMAIN_KNOWLEDGE, TECHNIQUES, searchDomainKnowledge, rankDomainKnowledge } from '../src/index';

test('domain knowledge searches both languages, intersects terms and keeps the existing education ID', () => {
  const education = DOMAIN_KNOWLEDGE.find(item => item.id === 'coding-lesson-objectives-and-practice');
  assert.ok(education);
  assert.equal(education.text.ko.domain, '교육');
  assert.equal(education.text.en.domain, 'Education');
  for (const query of ['교육', 'EDUCATION']) {
    const matches = searchDomainKnowledge(query);
    assert.equal(matches.length, 5, query);
    assert.ok(matches.every(item => item.text.ko.domain === '교육'), query);
  }
  for (const query of ['제출 피드백', 'learning completion', '코딩 교육']) {
    assert.equal(searchDomainKnowledge(query)[0]?.id, education.id, query);
  }
  for (const query of ['커뮤니티', 'community']) {
    const matches = searchDomainKnowledge(query);
    assert.equal(matches.length, 5, query);
    assert.ok(matches.every(item => item.text.ko.domain === '커뮤니티'), query);
  }
  for (const query of ['공개 범위', 'report permissions', '회원 신고']) {
    assert.equal(searchDomainKnowledge(query)[0]?.id, 'community-post-visibility-and-moderation', query);
  }
  assert.deepEqual(searchDomainKnowledge('교육 신고'), []);
  assert.deepEqual(searchDomainKnowledge('unknown-domain-123'), []);
  assert.deepEqual(searchDomainKnowledge(' \t '), DOMAIN_KNOWLEDGE);
});

test('every domain entry has bilingual guidance, distinct IDs, usable sources and valid design references', () => {
  assert.equal(DOMAIN_KNOWLEDGE.length, 100);
  assert.equal(new Set(DOMAIN_KNOWLEDGE.map(item => item.id)).size, DOMAIN_KNOWLEDGE.length);
  const domains = [...new Set(DOMAIN_KNOWLEDGE.map(item => item.text.ko.domain))];
  assert.equal(domains.length, 20);
  for (const domain of domains) {
    assert.equal(DOMAIN_KNOWLEDGE.filter(item => item.text.ko.domain === domain).length, 5, domain);
  }
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
    ['commerce-order-inventory-and-refund', [
      '쇼핑몰', '이커머스', '온라인 스토어', '장바구니', '재고 차감', '부분 환불',
      '쇼핑몰을 만들고 싶어', 'online store', 'ecommerce refund', 'out of stock',
    ]],
    ['booking-slot-capacity-and-cancellation', [
      '예약 시스템', '예약시스템', '타임슬롯', '잔여석', '대기열', '노쇼',
      '예약 서비스를 만들고 싶어', 'booking system', 'time slot capacity', 'no-show',
    ]],
    ['subscription-plan-entitlement-and-billing', [
      '구독 서비스', '정기 결제', '정기결제', '요금제', '무료 체험', '유예 기간', '해지 예약',
      'SaaS pricing plans', 'recurring billing', 'cancel at period end',
    ]],
    ['workspace-task-assignment-and-status', [
      '협업 툴', '협업툴', '업무 관리', '워크스페이스', '칸반', '작업 배정', '공유 범위',
      'work management', 'kanban task board', 'sharing scope',
    ]],
    ['support-ticket-routing-and-resolution', [
      '고객지원', '고객센터', '헬프데스크', '1:1 문의', '상담 티켓', '내부 메모', '재오픈',
      'customer support', 'helpdesk ticketing', 'waiting on customer',
    ]],
    ['account-auth-recovery-and-deletion', [
      '회원가입', '소셜 로그인', '소셜로그인', '비밀번호 재설정', '회원 탈퇴', '탈퇴 유예', '개인정보 파기',
      'social login', 'password reset', 'account deletion',
    ]],
    ['notification-channels-preferences-and-read-state', [
      '알림 센터', '알림센터', '인앱 알림', '푸시 알림', '방해 금지', '모두 읽음', '중복 발송 방지',
      'notification center', 'quiet hours', 'mark all read',
    ]],
    ['cms-publishing-schedule-and-versioning', [
      '콘텐츠 발행', 'CMS', '예약 발행', '버전 복원', '슬러그', '게시 내림',
      'scheduled publishing', 'version restore', 'url slug',
    ]],
    ['file-upload-processing-and-access-control', [
      '파일 업로드', '파일업로드', '멀티파트 업로드', '썸네일 생성', '변환 대기', '고아 파일',
      'file upload', 'transcoding', 'presigned url',
    ]],
    ['marketplace-escrow-settlement-and-dispute', [
      '마켓플레이스', '판매자 정산', '판매자정산', '에스크로', '구매 확정', '정산 보류', '차감 정산',
      'seller payouts', 'escrow', 'payout hold',
    ]],
    ['event-registration-ticket-and-checkin', [
      '참가 신청', '참가신청', '티켓 발권', '얼리버드', '참가권 양도', '현장 체크인', 'QR 체크인',
      'event registration', 'ticket transfer', 'qr check-in',
    ]],
    ['recruiting-pipeline-evaluation-and-notice', [
      '채용 공고', '입사 지원', 'ATS', '전형 단계', '면접 평가표', '합격 통보',
      'applicant tracking system', 'pipeline stage', 'interview scorecards',
    ]],
    ['analytics-metric-aggregation-and-export', [
      '지표 대시보드', '데이터 분석', 'KPI', '집계 지연', '결측치', 'CSV 다운로드', '데이터 내보내기',
      'analytics dashboard', 'data freshness', 'csv export',
    ]],
    ['security-rbac-role-assignment-and-least-privilege', [
      'RBAC', '역할 기반 권한', '최소 권한', 'role-based access control', 'last-admin protection',
    ]],
    ['logistics-warehouse-picking-packing-and-split-shipment', [
      '창고 피킹 패킹', '합포장', '분리배송', 'warehouse pick and pack', 'split shipment',
    ]],
    ['fintech-wallet-ledger-idempotency-and-hold', [
      '예치금 지갑', '복식 원장', '멱등성 키', 'double-entry ledger', 'idempotency key',
    ]],
    ['healthcare-clinic-intake-triage-and-queue', [
      '사전 문진표', '내원 대기 순번', '호출 보류', 'pre-visit intake form', 'clinic check-in queue',
    ]],
    ['automation-form-branching-validation-and-partial-save', [
      '조건부 분기', '스킵 로직', '다단계 폼', 'conditional form branching', 'skip logic',
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
