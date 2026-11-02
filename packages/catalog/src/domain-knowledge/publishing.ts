import type { DomainKnowledge } from '../domain-knowledge';

export const PUBLISHING_KNOWLEDGE: DomainKnowledge[] = [{
  id: 'cms-publishing-schedule-and-versioning',
  aliases: {
    ko: ['콘텐츠 발행', 'CMS 설계', '블로그 에디터', '예약 발행', '버전 관리 복원', '주소 슬러그 변경'],
    en: ['content management system', 'CMS publishing', 'scheduled publishing', 'version history and restore', 'URL slug redirects'],
  },
  useCases: {
    ko: ['블로그·문서·뉴스룸 같은 콘텐츠 발행(CMS) 서비스를 만들 때', '작성 중인 임시본과 현재 게시된 본문을 분리해 수정할 때', '검수 승인·예약 발행·게시 내림(비공개 전환)을 설계할 때', '이전 버전 비교·복원과 고유 주소(Slug) 변경 처리를 정할 때'],
    en: ['Building a blog, documentation or newsroom CMS', 'Editing an unpublished working copy without overwriting the live published page', 'Designing editorial review, scheduled publishing and unpublishing', 'Defining version comparison, restoration and URL slug change handling'],
  },
  keywords: {
    ko: ['콘텐츠 발행', 'CMS', '임시본', '미리보기', '검수', '예약 발행', '게시', '게시 내림', '버전 관리', '버전 복원', '슬러그', '리다이렉트'],
    en: ['content publishing', 'CMS', 'working copy', 'preview', 'editorial review', 'scheduled publishing', 'publish', 'unpublish', 'version history', 'version restore', 'slug', 'url slug', 'redirect'],
  },
  text: {
    ko: {
      domain: '콘텐츠 발행·CMS',
      title: '검수·예약 발행·버전 복원과 주소(Slug) 변경 처리',
      summary: '현재 게시된 본문과 편집 중인 작업본을 분리하고, 검수·예약 발행·버전 복원·주소 변경을 연결합니다.',
      overview: '콘텐츠 발행 시스템에서 이미 게시된 글을 수정할 때 저장 버튼이 곧바로 외부 노출을 바꾸면 오탈자나 미완성 문장이 그대로 공개됩니다. 현재 외부에 노출 중인 게시본과 편집기에서 다루는 작업본을 분리하고, 예약 발행·게시 내림·버전 복원·고유 주소(Slug) 변경이 기존 방문자와 검색 노출에 미치는 영향을 함께 설계해야 합니다. 아래 내용은 CMS 흐름을 설계하기 위한 참고이며 특정 편집기 형식이나 승인 단계를 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '현재 게시본과 편집 작업본 분리', description: '아직 발행하지 않은 새 글뿐 아니라, 이미 게시된 글을 고칠 때도 외부 방문자가 보는 게시본과 편집자의 작업본을 분리할지 정합니다.' },
        { name: '발행 생명주기와 예약 발행', description: '작성 중·검수 대기·예약됨·게시됨·게시 내림(보관) 상태를 구분합니다. 예약 발행 시각의 기준 표준시(Timezone)와 발행 직전 취소 방법을 명확히 합니다.' },
        { name: '미리보기와 접근 범위', description: '발행 전 화면을 실제 레이아웃으로 확인하는 미리보기가 편집자 본인에게만 보이는지, 공유용 임시 링크로 외부 검수자에게도 열리는지 구분합니다.' },
        { name: '버전 이력 비교와 복원', description: '언제 새 버전을 기록할지(자동 저장과 명시적 발행 시점 구분), 이전 버전으로 복원할 때 즉시 게시할지 작업본으로만 불러올지 결정합니다.' },
        { name: '고유 주소(Slug)와 게시 내림 처리', description: '게시된 문서의 주소(Slug)를 바꾸거나 게시를 내렸을 때 이전 주소로 들어온 방문자에게 새 주소 이동(리다이렉트)이나 안내 화면 중 무엇을 보여 줄지 정합니다.' },
      ],
      workflow: [
        { name: '작업본 저장과 미리보기 확인하기', description: '편집 중 내용을 안전하게 저장하되 외부 게시본과 구분해 표시하고, 데스크톱·모바일 미리보기로 결과를 확인합니다.' },
        { name: '검수 요청과 즉시·예약 발행 연결하기', description: '필수 메타데이터(제목·요약·대표 이미지·주소)를 검증한 뒤 즉시 발행하거나 지정한 시각에 발행되도록 예약합니다.' },
        { name: '게시 후 수정·버전 비교·복원하기', description: '게시된 글의 수정본을 비교 뷰로 확인해 반영하고, 문제가 생기면 이전 버전 기록에서 원하는 시점을 복원합니다.' },
        { name: '주소 변경·게시 내림의 후속 경로 유지하기', description: '주소가 바뀌면 이전 주소를 연결하거나 안내하고, 게시를 내린 글은 목록·사이트맵·외부 검색 노출에서 일관되게 제외합니다.' },
      ],
      pitfalls: [
        { name: '게시된 글의 자동 저장이 실시간으로 외부 화면을 덮어쓰기', description: '수정 중인 문장이 저장될 때마다 외부 방문자에게 바로 노출되면 사고가 납니다. 작업본 저장과 변경분 재발행을 분리하세요.' },
        { name: '주소(Slug) 변경 후 기존 공유 링크를 깨진 채로 두기', description: '제목에 맞춰 주소를 자동으로 바꾸면 이미 공유된 링크가 모두 404가 됩니다. 주소 고정 여부와 이전 주소 리다이렉트 규칙을 정하세요.' },
        { name: '예약 발행 시각의 표준시와 발행 실패 안내를 누락하기', description: '편집자와 서버의 기준 시각이 다르면 엉뚱한 시각에 발행됩니다. 기준 시각 표기와 예약 작업 실패 시 알림 경로를 준비하세요.' },
      ],
      questions: [
        '이미 게시된 글을 수정할 때 즉시 반영하나요, 별도 작업본으로 저장한 뒤 다시 발행 버튼을 눌러 반영하나요?',
        '작성자 외에 별도 편집자·관리자 검수 승인 단계가 필요한가요?',
        '예약 발행을 지원한다면 어느 표준시(Timezone)를 기준으로 동작하며, 예약 대기 중 수정이나 취소는 어떻게 하나요?',
        '버전 이력은 언제 생성되며, 이전 버전을 복원하면 작업본으로 불러오나요, 즉시 게시본을 교체하나요?',
        '게시된 글의 고유 주소(Slug) 변경을 허용하나요? 변경하거나 게시를 내렸을 때 기존 URL은 어떻게 응답하나요?',
        '두 명의 편집자가 동시에 같은 문서를 수정하거나 저장이 끊겼을 때 어떤 충돌 안내와 복구 수단을 제공하나요?',
      ],
      example: '예시: 기술 블로그 CMS에서 게시된 글의 수정 사항은 먼저 작업본에 저장되고, 차이 비교를 확인한 뒤 재발행해야 실제 페이지가 갱신되며, 주소(Slug)를 바꾸면 이전 주소는 새 주소로 자동 이동하도록 구성할 수 있습니다. 실제 검수 단계·버전 보관 개수·리다이렉트 정책은 서비스 목적에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'ly-context-code-diff', reason: '이전 게시 버전과 현재 작업본의 삭제·추가 문장을 나란히 비교하고 변하지 않은 문맥을 접어 보는 표현에 참고할 수 있습니다. 실제 문서 버전 비교 계산과 저장은 구현하지 않습니다.' },
        { id: 'undo-delete-snackbar', reason: '문서를 보관함이나 휴지통으로 옮긴 직후 실행 취소 스낵바로 즉시 되돌리는 표현에 참고할 수 있습니다. 실제 서버 복원과 발행 상태 변경은 별도로 구현해야 합니다.' },
      ],
      promptSnippet: '콘텐츠 발행(CMS) 서비스의 작성·검수·예약 발행·버전 복원·주소 관리 흐름을 설계해 줘. 먼저 게시본과 편집 작업본 분리 여부, 검수 승인 단계, 예약 발행 기준 시각, 버전 이력 생성·복원 방식, 고유 주소(Slug) 변경 및 게시 내림 시 기존 링크 처리 정책을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 작성자·검수자·방문자별 열람 가능 상태와 미리보기 접근 범위.\n2. 미발행 작업본·검수 대기·예약됨·게시됨·게시후 수정본·게시 내림 상태의 전환.\n3. 버전 이력 기록 시점, 변경 비교, 이전 버전 복원 절차.\n4. 주소(Slug) 변경·게시 내림·예약 발행 실패·동시 편집 충돌 시 처리 방식과 안내.\n5. 에디터·미리보기·발행/예약 설정·버전 비교 패널·목록 상태 배지의 연결.\n편집 중 자동 저장을 즉시 외부 발행으로 단정하지 말고, 예시 정책과 디자인 데모를 실제 CMS 저장·라우팅 기능으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Content Publishing & CMS',
      title: 'Editorial review, scheduled publishing, version restore and slug changes',
      summary: 'Separate live published content from unpublished working copies, and connect review, scheduling, version restore and URL slugs.',
      overview: 'When editing an already published article, saving work in progress should not immediately expose half-written changes to readers. Separating the live published version from the editor’s working copy—and defining how scheduled publishing, unpublishing, version restoration and URL slug updates affect existing links—keeps publishing predictable. These concepts are design references, not default editorial hierarchy or routing rules for a specific CMS.',
      concepts: [
        { name: 'Live published version versus working copy', description: 'Decide whether edits to a live article are saved to a separate working copy until explicitly republished, rather than mutating the live page on every save.' },
        { name: 'Publishing lifecycle and scheduling', description: 'Distinguish unpublished, in-review, scheduled, published and unpublished/archived states, including timezone rules and how to cancel a scheduled release.' },
        { name: 'Preview modes and access scope', description: 'Clarify whether previews are restricted to signed-in editors or can be shared with external reviewers via temporary preview links.' },
        { name: 'Version history and restoration', description: 'Define when immutable versions are recorded (autosave checkpoints versus explicit publish events) and whether restoring loads into the working copy or replaces the live article.' },
        { name: 'URL slugs, redirects and unpublishing', description: 'Decide whether changing a published slug creates a redirect from the old URL, and what visitors see when a published page is unpublished.' },
      ],
      workflow: [
        { name: 'Save working copies and inspect previews', description: 'Persist editor changes safely without altering live content, and let authors verify layout and metadata in preview mode.' },
        { name: 'Validate metadata and publish or schedule', description: 'Check required title, summary, cover media and slug fields before immediate publication or scheduled release.' },
        { name: 'Compare revisions and restore previous versions', description: 'Show diffs between the live version and pending edits, and allow rolling back to an earlier version when needed.' },
        { name: 'Preserve URL continuity on slug change or unpublish', description: 'Maintain redirects for renamed slugs and remove unpublished items consistently from lists, feeds and sitemaps.' },
      ],
      pitfalls: [
        { name: 'Overwriting the live published page on every editor autosave', description: 'If autosave mutates the public record directly, readers see unfinished edits. Keep working copies separate from published revisions.' },
        { name: 'Breaking shared links by auto-regenerating slugs from titles', description: 'Changing the URL every time a headline is tweaked breaks bookmarks and external links. Lock published slugs by default or record redirects.' },
        { name: 'Hiding timezone labels and failure states on scheduled posts', description: 'Ambiguous timezones or silent scheduler failures leave time-sensitive announcements unpublished without warning.' },
      ],
      questions: [
        'When editing a published item, do saves update the live page immediately or stay in a separate working copy until republished?',
        'Is an editorial review or approval step required before authors can publish?',
        'If scheduled publishing is supported, which timezone is used and how can scheduled items be edited or unscheduled?',
        'When are version snapshots created, and does restoring a version replace the live page or populate the working copy?',
        'Can published URL slugs be changed, and how do old URLs or unpublished pages respond to visitors?',
        'How are concurrent edits by two authors or interrupted saves detected and resolved?',
      ],
      example: 'Example: a documentation CMS could keep edits to live pages in a separate working copy, show a diff before republishing, and automatically redirect previous slugs when a page URL is renamed. Confirm actual review steps, version retention limits and redirect policies before adopting this setup.',
      relatedDesigns: [
        { id: 'ly-context-code-diff', reason: 'A reference for comparing deleted and added lines between versions while collapsing unchanged context. Real diff calculation and revision storage need separate implementation.' },
        { id: 'undo-delete-snackbar', reason: 'A reference for offering immediate undo after archiving or trashing an article. Server-side restoration and publishing state updates need separate implementation.' },
      ],
      promptSnippet: 'Help design a content-publishing and CMS workflow. First confirm whether live articles and working copies are separated, whether editorial approval is needed, how scheduled publishing and timezones work, how version history and restore behave, and how slug changes or unpublishing affect existing URLs. Do not assume undecided rules.\nBased on the answers, describe:\n1. Author, reviewer and visitor permissions across live pages and preview links.\n2. State transitions across unpublished working copy, in review, scheduled, published, pending-update and unpublished states.\n3. Version snapshot creation, revision comparison and restoration behavior.\n4. Handling of slug renames, unpublishing, failed scheduled releases and concurrent editing conflicts.\n5. How the editor, preview, publish/schedule controls, revision diff viewer and status badges connect.\nDo not assume editor autosaves should overwrite live published content immediately, and do not mistake example policies or design demos for a real CMS backend.',
    },
  },
  sources: [
    { title: 'WordPress Documentation — Post statuses and visibility', url: 'https://wordpress.org/documentation/article/post-status/' },
    { title: 'Payload CMS Docs — Versions and Publish Status', url: 'https://payloadcms.com/docs/versions/overview' },
  ],
}, {
  id: 'cms-category-taxonomy-and-navigation-order',
  aliases: {
    ko: ['카테고리 분류 개편', '연재 시리즈 순서 관리', '상단 고정 노출 핀', '소속 문서 일괄 이동'],
    en: ['category taxonomy reorganization', 'series navigation order', 'pinned featured articles', 'orphan article reassignment'],
  },
  useCases: {
    ko: ['카테고리·태그·연재 시리즈를 통합하거나 삭제할 때 소속된 기존 글의 이동 경로를 정할 때', '문서 가이드나 연재물에서 발행일 순이 아닌 수동 순서와 이전/다음 글 이동을 구성할 때', '목록 최상단에 고정(Pin)할 대표 글 개수와 고정 만료·교체 규칙을 설계할 때', '카테고리 이름·주소가 바뀔 때 하위 문서 경로와 상단 메뉴(GNB/사이드바)를 동기화할 때'],
    en: ['Reassigning existing articles when merging, renaming or deleting categories and tags', 'Ordering documentation chapters or multi-part series manually with previous/next links', 'Pinning featured posts to the top of a feed with slot limits or expiration rules', 'Keeping navigation trees and article paths consistent when taxonomy nodes move'],
  },
  keywords: {
    ko: ['카테고리 개편', '분류 체계', '택소노미', '시리즈 연재', '노출 순서', '상단 고정', '미분류 이동', '이전 다음 글', '목차 정렬'],
    en: ['taxonomy', 'category merge', 'series order', 'navigation tree', 'pinned post', 'featured slot', 'article reassignment', 'prev next navigation', 'uncategorized fallback'],
  },
  text: {
    ko: {
      domain: '콘텐츠 발행·CMS',
      title: '카테고리·시리즈 개편 시 소속 글 이동과 노출 순서 고정',
      summary: '카테고리·태그·시리즈의 역할을 구분하고, 분류 통폐합 시 소속 글 이관과 상단 고정·수동 정렬 순서를 연결합니다.',
      overview: '콘텐츠가 쌓이면 초기 카테고리를 합치거나 연재 시리즈 순서를 다시 짜야 할 때가 옵니다. 이때 카테고리를 지웠다고 안에 있던 수백 개의 게시물이 목록에서 증발하거나, 카테고리가 포함된 문서 URL이 한꺼번에 깨지면 안 됩니다. 분류 개편 시 소속 문서의 대체 이동 규칙, 시리즈 내 수동 순서와 미발행 편 건너뛰기, 상단 고정(Pin) 슬롯 관리를 함께 설계해야 합니다. 아래 내용은 분류·노출 순서 설계를 위한 참고이며 특정 메뉴 구조를 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '단일 소속 카테고리·다중 태그·순차 시리즈 구분', description: '글의 위치를 정하는 계층형 카테고리, 주제 검색을 돕는 다중 태그, 1편·2편처럼 읽는 순서가 있는 시리즈의 역할을 분리합니다.' },
        { name: '분류 삭제·병합 시 소속 글 대체 이관', description: '글이 들어 있는 카테고리를 삭제하거나 합칠 때 소속 글을 지정한 다른 카테고리로 일괄 이동시킬지 기본(미분류) 카테고리로 옮길지 강제해 고아 문서를 막습니다.' },
        { name: '발행일 정렬과 수동 목차·상단 고정(Pin) 우선순위', description: '기본 최신순 목록 위에 상단 고정 글을 몇 개까지 올릴지, 기술 문서나 연재 시리즈처럼 편집자가 지정한 수동 순서를 우선할지 구분합니다.' },
        { name: '시리즈 내 미게시 문서 제외와 이전·다음 탐색', description: '연재 시리즈 중간에 아직 게시되지 않은 작업본이나 게시 내림된 글이 끼어 있을 때, 독자의 이전/다음 글 링크와 회차 번호가 끊기지 않게 계산합니다.' },
      ],
      workflow: [
        { name: '분류 생성·이동과 소속 문서 수 확인하기', description: '카테고리나 시리즈 구조를 바꿀 때 현재 연결된 게시물과 작업본 개수를 보여 주고, URL 경로에 분류명이 포함되는지 확인합니다.' },
        { name: '분류 병합·삭제 전 대체 카테고리 지정하기', description: '소속 글이 있는 카테고리는 바로 지우지 못하게 막고, 옮겨 갈 대상 카테고리를 먼저 선택한 뒤에야 병합·삭제를 실행합니다.' },
        { name: '시리즈 순서 배치와 상단 고정 슬롯 관리하기', description: '시리즈 내 문서 순서를 바꾸거나 목록 상단 고정 글을 지정하고, 최대 고정 개수 초과 시 가장 오래된 고정 글을 내릴지 확인합니다.' },
        { name: '독자 화면의 목차·이전/다음 링크와 경로 갱신하기', description: '현재 게시된 글만 기준으로 시리즈 목차와 이전·다음 이동 링크를 생성하고, 카테고리 경로가 바뀌었다면 이전 주소를 새 주소로 연결합니다.' },
      ],
      pitfalls: [
        { name: '카테고리를 삭제해 소속된 게시물이 목록과 사이트맵에서 사라지기', description: '분류 노드만 지우고 글의 카테고리 참조를 방치하면 글이 어디에서도 조회되지 않습니다. 삭제 전 일괄 이관 절차를 필수로 두세요.' },
        { name: '시리즈의 다음 글 링크가 아직 발행 안 된 작업본을 가리켜 404가 뜨기', description: '편집기에서는 1~4편을 미리 묶어 두더라도 방문자 화면의 이전·다음 버튼은 현재 게시됨 상태인 글끼리만 이어지도록 필터링하세요.' },
        { name: '상단 고정(Pin)을 해제 기준 없이 계속 쌓아 첫 화면 전체가 옛날 글로 덮이기', description: '고정 슬롯 최대 개수나 고정 만료일을 두어 새 글이 첫 화면에서 밀려나지 않도록 관리하세요.' },
      ],
      questions: [
        '게시물 하나는 하나의 카테고리에만 속하나요, 여러 카테고리와 태그·시리즈에 동시에 속할 수 있나요?',
        '글이 들어 있는 카테고리를 삭제하거나 병합할 때 소속 글을 다른 카테고리로 이관하게 하나요, 기본 카테고리로 옮기나요?',
        '카테고리 고유 주소(Slug)가 개별 게시물 URL에도 포함되나요? 분류 이동 시 기존 게시물 URL 리다이렉트를 지원하나요?',
        '목록 상단 고정(Pin) 글의 최대 개수 제한이나 고정 해제 예약 기능이 필요한가요?',
        '연재 시리즈나 문서 목차에서 중간 글이 게시 내림되거나 아직 미발행 작업본일 때 회차 표시와 이전/다음 이동은 어떻게 동작하나요?',
      ],
      example: '예시: 각 글은 단일 카테고리와 선택적 연재 시리즈를 가지며, 카테고리 삭제 시에는 소속 글을 옮길 대상 카테고리를 필수로 고르게 하고, 상단 고정은 최대 3개까지만 허용하며 시리즈 하단 이전·다음 링크는 현재 게시된 글만 연결하도록 구성할 수 있습니다. 실제 다중 카테고리 허용 여부와 URL 구조는 서비스 특성에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'vertical-rail-tabs', reason: '문서 카테고리나 시리즈의 상하위 섹션을 좌측 탐색 레일로 전환하며 확인하는 표현에 참고할 수 있습니다. 실제 분류 트리 저장과 경로 변경은 별도로 구현해야 합니다.' },
        { id: 'bulk-selection-action-bar', reason: '여러 게시물을 선택해 한꺼번에 다른 카테고리로 옮기거나 시리즈에 묶는 일괄 작업 바 표현에 참고할 수 있습니다. 실제 서버 일괄 이관은 구현하지 않습니다.' },
      ],
      promptSnippet: '콘텐츠 발행(CMS) 서비스의 카테고리·시리즈 분류 개편, 소속 글 이동, 상단 고정 및 노출 순서 관리 흐름을 설계해 줘. 먼저 카테고리·태그·시리즈의 소속 규칙(단일 vs 다중), 분류 삭제·병합 시 기존 글 이관 방식, 카테고리 주소 변경이 게시물 URL에 미치는 영향, 상단 고정 슬롯 제한, 시리즈 내 미게시 글 건너뛰기 기준을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 카테고리·태그·시리즈 데이터 구조와 게시물 연결 규칙.\n2. 분류 이름/주소 변경, 병합, 삭제 시 소속 글 대체 이관과 URL 리다이렉트 처리.\n3. 최신순 정렬, 상단 고정(Pin) 개수·만료 관리, 시리즈/문서 수동 순서 정렬 규칙.\n4. 시리즈 내 작업본·게시 내림 문서가 섞여 있을 때 독자 화면의 목차 및 이전/다음 링크 계산.\n5. 분류 트리 관리 화면·일괄 카테고리 이동 바·시리즈 순서 편집·독자 탐색 메뉴의 연결.\n분류 삭제가 소속 게시물 숨김이나 깨진 링크를 만들어도 된다고 가정하지 말고, 예시 정책과 디자인 데모를 실제 CMS 분류 백엔드로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Content Publishing & CMS',
      title: 'Category and series reorganization, article reassignment and pinned ordering',
      summary: 'Separate categories, tags and ordered series, require safe article reassignment on taxonomy changes, and manage pinned or manual ordering.',
      overview: 'As a content library grows, editors inevitably merge categories, rename sections or reorder multi-part series. Deleting a category without reassigning its articles can orphan hundreds of live pages or break category-prefixed URLs. Define clear rules for taxonomy migration, manual series ordering that skips unpublished items, and bounded top-of-feed pinning. These concepts are design references, not default site architectures.',
      concepts: [
        { name: 'Categories versus tags versus ordered series', description: 'Distinguish hierarchical categories that define site sections, flat tags for cross-cutting topics, and ordered series or guides with explicit reading sequences.' },
        { name: 'Mandatory reassignment on category merge or deletion', description: 'Prevent deleting a populated category until its articles are reassigned to a target category or a designated fallback section.' },
        { name: 'Chronological feeds, pinned slots and manual chapter order', description: 'Separate reverse-chronological feeds with a capped number of pinned posts from manually ordered documentation trees or multi-part series.' },
        { name: 'Published-only series navigation', description: 'Compute reader-facing chapter numbers and previous/next links exclusively across currently published items so unpublished working copies never create dead links.' },
      ],
      workflow: [
        { name: 'Inspect article counts and URL impact before taxonomy edits', description: 'Show how many published and unpublished items belong to a category or series before renaming, moving or merging it.' },
        { name: 'Select a target category when merging or deleting', description: 'Require the editor to pick a destination category for existing articles and record URL redirects if category slugs appear in article paths.' },
        { name: 'Manage series sequence and pinned post limits', description: 'Let editors reorder series items and pin featured articles while enforcing maximum pin slots or replacement prompts.' },
        { name: 'Render reader navigation across live items only', description: 'Filter out unpublished or archived items when rendering public category counts, series tables of contents and previous/next links.' },
      ],
      pitfalls: [
        { name: 'Orphaning live articles when a category is deleted', description: 'Never leave published articles pointing to a deleted category ID; enforce reassignment or move them to a fallback category.' },
        { name: 'Pointing a series Next link to an unpublished working copy', description: 'If Part 3 is still unpublished, Part 2’s reader view should either link to a published Part 4 or show no Next link until Part 3 goes live.' },
        { name: 'Allowing unlimited pinned posts that bury new articles below the fold', description: 'Cap the number of pinned items or support pin expiration dates so fresh content remains discoverable.' },
      ],
      questions: [
        'Can an article belong to only one primary category or multiple categories, tags and series?',
        'When a category containing articles is deleted or merged, must the editor choose a replacement category or does it move to an Uncategorized fallback?',
        'Are category slugs part of the article URL path, and if so, are redirects created automatically when an article moves categories?',
        'How many articles can be pinned to the top of a list, and what happens when a new item is pinned at the limit?',
        'In an ordered series or guide, how do chapter numbers and previous/next links behave when an intermediate item is unpublished?',
      ],
      example: 'Example: a publishing platform could assign each article one primary category and an optional ordered series, require picking a destination category before deleting any populated category, cap top-of-feed pins at 3 items, and compute series Prev/Next links only across published posts. Confirm actual URL path structures and multi-category rules before adopting this setup.',
      relatedDesigns: [
        { id: 'vertical-rail-tabs', reason: 'A reference for navigating top-level sections or series chapters along a vertical rail. Real taxonomy persistence and routing need separate implementation.' },
        { id: 'bulk-selection-action-bar', reason: 'A reference for selecting multiple articles to move to another category or series in bulk. Real batch reassignment needs separate implementation.' },
      ],
      promptSnippet: 'Help design category and series taxonomy reorganization, article reassignment and pinned/manual ordering for a CMS. First confirm single versus multi-category rules, how articles are reassigned when categories are merged or deleted, whether category slugs affect article URLs and redirects, pinned-slot limits, and how ordered series handle unpublished items. Do not assume undecided rules.\nBased on the answers, describe:\n1. Data model connecting articles to categories, tags and ordered series.\n2. Reassignment workflows and URL redirect rules when renaming, merging or deleting categories.\n3. Ordering rules combining chronological feeds, capped pinned slots and manual series sequences.\n4. Reader-facing table-of-contents and previous/next link calculation when some series items are unpublished.\n5. How the taxonomy manager, bulk category-move bar, series order editor and reader navigation connect.\nDo not allow category deletion to orphan live articles or break URLs silently, and do not mistake example policies or design demos for a real CMS taxonomy backend.',
    },
  },
  sources: [
    { title: 'WordPress Documentation — Categories, Tags, and Taxonomies', url: 'https://wordpress.org/documentation/article/posts-categories-screen/' },
    { title: 'Ghost Help Center — Organizing content with tags and collections', url: 'https://ghost.org/help/organising-content/' },
  ],
}, {
  id: 'cms-collaborative-lock-and-review-comment',
  aliases: {
    ko: ['동시 편집 잠금 점유', '문단 인라인 검수 코멘트', '코멘트 해결 완료 확인', '비활성 편집 잠금 인계'],
    en: ['editor presence lock', 'inline editorial comments', 'comment resolution tracking', 'stale lock takeover'],
  },
  useCases: {
    ko: ['두 명의 편집자가 같은 문서를 동시에 열어 서로의 저장본을 덮어쓰는 사고를 막을 때', '작성 중인 편집자의 점유 잠금(Edit Lock)과 자리 비움 시 잠금 자동 해제·인계 요청을 설계할 때', '본문 특정 문장·문단에 인라인 검수 코멘트를 달고 수정 후 해결(Resolved) 처리할 때', '미해결 필수 검수 코멘트가 남아 있을 때 발행 버튼을 경고하거나 차단할 때'],
    en: ['Preventing two editors from silently overwriting each other’s changes on the same article', 'Managing active editor locks, idle lock expiration and safe lock takeover requests', 'Attaching inline review comments to specific paragraphs and tracking resolved threads', 'Warning or blocking publication while unresolved editorial review comments remain'],
  },
  keywords: {
    ko: ['동시 편집 잠금', '편집 점유', '잠금 인계', '인라인 코멘트', '문단 피드백', '코멘트 해결', '발행 전 검수', '충돌 방지', '자동 저장 보호'],
    en: ['edit lock', 'presence indicator', 'lock takeover', 'inline comment', 'editorial feedback', 'resolve comment', 'orphaned comment', 'publish gate', 'conflict prevention'],
  },
  text: {
    ko: {
      domain: '콘텐츠 발행·CMS',
      title: '동시 편집 점유(편집 잠금)·문단별 검수 코멘트와 해결 확인',
      summary: '편집 잠금과 자리 비움 인계로 덮어쓰기를 막고, 문단별 인라인 코멘트의 해결 상태와 발행 전 점검을 연결합니다.',
      overview: '여러 편집자와 검수자가 한 문서를 다룰 때 나중에 저장한 사람이 먼저 저장한 사람의 수정을 덮어쓰면 공들인 원고가 사라집니다. 실시간 공동 편집 엔진을 쓰지 않는 환경이라면 누가 현재 편집권을 점유하고 있는지(편집 잠금)와 자리 비움 시 어떻게 편집권을 넘겨받는지 정해야 합니다. 또한 문단별로 달린 검수 코멘트가 본문 수정·삭제 후에도 어떻게 유지되고 해결 처리되는지 함께 설계해야 합니다. 아래 내용은 편집 잠금과 검수 코멘트 설계를 위한 참고이며 특정 에디터 엔진을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '편집 점유 잠금(Edit Lock)과 읽기·코멘트 전용 열람', description: '한 사람이 본문을 편집 중일 때 다른 진입자에게는 누가 편집 중인지 배너로 알리고, 덮어쓰기 방지를 위해 읽기 및 코멘트 작성 모드로만 열리게 합니다.' },
        { name: '자리 비움 만료(Heartbeat)와 편집권 인계 요청', description: '편집 창을 켜 둔 채 자리를 비우면 일정 시간 뒤 잠금을 자동 해제하거나, 다른 편집자가 인계를 요청했을 때 미저장 작업본을 안전하게 백업한 뒤 편집권을 넘깁니다.' },
        { name: '문단·구간 지정 인라인 코멘트와 본문 삭제 시 보존', description: '특정 문장이나 블록에 연결된 검수 코멘트를 관리하고, 해당 문장이 삭제되더라도 코멘트 스레드 자체가 증발하지 않도록 문서 코멘트 목록에 보존합니다.' },
        { name: '코멘트 해결(Resolved) 전환과 미해결 시 발행 점검', description: '수정 반영 후 코멘트를 해결 상태로 접어 두고, 아직 해결되지 않은 검수 코멘트가 남아 있을 때 발행 단계에서 경고하거나 발행을 제한합니다.' },
      ],
      workflow: [
        { name: '문서 진입 시 편집 잠금 확인과 점유 표시하기', description: '문서를 열 때 현재 편집 중인 사용자가 없으면 편집 잠금을 획득하고, 다른 사람이 편집 중이면 점유자 이름·마지막 활동 시각과 함께 코멘트 모드로 안내합니다.' },
        { name: '문단별 인라인 검수 코멘트 작성 및 답글 달기', description: '검수자가 수정이 필요한 구절을 지정해 코멘트를 남기면 작성자에게 알리고, 해당 위치로 바로 스크롤해 맥락을 확인하게 합니다.' },
        { name: '본문 수정 후 코멘트 해결·재오픈 처리하기', description: '작성자가 문장을 고친 뒤 코멘트를 해결 완료로 바꾸고, 검수자가 다시 확인해 부족하면 코멘트를 다시 열거나 완료로 확정합니다.' },
        { name: '미해결 코멘트 점검 및 잠금 해제·인계 처리하기', description: '발행 전 미해결 코멘트 건수를 요약해 보여 주고, 편집 종료 시 또는 자리 비움 인계 시 작업본을 저장한 뒤 잠금을 해제합니다.' },
      ],
      pitfalls: [
        { name: '탭을 닫거나 퇴근한 사용자의 편집 잠금이 영구히 풀리지 않기', description: '명시적 종료 없이 브라우저가 닫혀도 주기적 신호(Heartbeat) 만료와 강제 인계 기능이 있어야 다음 담당자가 작업할 수 있습니다.' },
        { name: '강제 인계 시 이전 편집자의 화면에서 안내 없이 저장이 실패하거나 덮어쓰기', description: '편집권이 다른 사람에게 넘어갔다면 기존 편집자 화면을 즉시 읽기 모드로 바꾸고 미반영 문구는 복사·백업할 수 있게 보호하세요.' },
        { name: '코멘트가 달린 문장을 지웠을 때 미해결 코멘트까지 소리 없이 사라지기', description: '원문 구절이 수정·삭제되어도 인라인 코멘트는 "원문 수정됨" 표시와 함께 우측 목록에 남아야 검수 누락을 막을 수 있습니다.' },
      ],
      questions: [
        '동시 편집 방식은 실시간 동시 입력인가요, 한 번에 한 명만 본문을 고치는 편집 점유 잠금(Edit Lock) 방식인가요?',
        '편집 점유자가 아무 입력 없이 자리를 비웠을 때 몇 분 뒤 잠금이 풀리며, 다른 편집자가 강제로 편집권을 가져올 수 있나요?',
        '다른 사람이 본문을 편집 중일 때 들어온 사용자는 읽기만 가능한가요, 인라인 검수 코멘트 작성은 가능한가요?',
        '본문 구절이 삭제되었을 때 거기에 달려 있던 미해결 인라인 코멘트는 어떻게 표시하고 보존하나요?',
        '미해결 검수 코멘트가 남아 있을 때 발행이나 예약 발행을 차단하나요, 확인 경고만 띄우나요?',
      ],
      example: '예시: 한 편집자가 문서를 열면 편집 잠금을 획득하고 10분간 입력이 없으면 다른 편집자가 "저장 후 편집권 가져오기"를 누를 수 있으며, 검수자는 편집 잠금과 무관하게 문단별 코멘트를 남길 수 있고 미해결 코멘트가 있으면 발행 시 확인 모달을 띄우도록 구성할 수 있습니다. 실제 잠금 만료 시간과 발행 차단 강제는 편집팀 규칙에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'dismissible-inline-banner', reason: '에디터 상단에 현재 문서를 편집 중인 동료 이름과 읽기 전용 상태, 편집권 요청 버튼을 알리는 배너 표현에 참고할 수 있습니다. 실제 세션 하트비트와 잠금 제어는 별도로 구현해야 합니다.' },
        { id: 'ly-activity-timeline', reason: '문단별 검수 코멘트와 답글, 해결 완료 및 재오픈 이력을 순서대로 확인하는 사이드 패널 표현에 참고할 수 있습니다. 실제 텍스트 위치 매핑은 구현하지 않습니다.' },
      ],
      promptSnippet: '콘텐츠 발행(CMS) 에디터의 동시 편집 점유 잠금(Edit Lock)과 문단별 인라인 검수 코멘트·해결 흐름을 설계해 줘. 먼저 실시간 공동 편집 vs 단일 편집자 점유 잠금 방식, 자리 비움 만료 시간과 편집권 인계 시 기존 작업본 보호 규칙, 편집 잠금 중 코멘트 허용 여부, 코멘트 대상 문장 삭제 시 보존 방식, 미해결 코멘트 존재 시 발행 제한 기준을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 편집 가능(점유 중)·타인 편집 중(읽기/코멘트 전용)·자리 비움 만료·편집권 인계 상태 전환.\n2. 편집권 인계 시 이전 편집자 화면의 즉시 잠금 전환과 미저장 문구 백업 안내.\n3. 문단·구절 단위 인라인 코멘트 생성, 답글, 해결(Resolved)·재오픈 및 원문 삭제 시 보존 규칙.\n4. 발행 요청 시 미해결 코멘트 개수 점검 및 경고/차단 처리.\n5. 에디터 상단 점유 배너·본문 하이라이트·우측 코멘트 스레드 패널·발행 전 확인 창의 연결.\n화면 배너 표시만으로 서버의 동시 저장 덮어쓰기가 막힌다고 가정하지 말고, 예시 정책과 디자인 데모를 실제 동시성 제어 백엔드로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Content Publishing & CMS',
      title: 'Editor presence locks, inline review comments and resolution tracking',
      summary: 'Prevent lost edits with presence locks and safe lock takeovers, and track inline editorial comments through resolution before publishing.',
      overview: 'Without realtime operational-transform or CRDT syncing, two editors saving the same article will overwrite each other’s work. A clear editor lock—paired with idle timeouts and safe takeover handoffs—protects working copies while still letting reviewers leave inline paragraph comments and verify that every review thread is resolved before publication. These concepts are design references, not default editor engine implementations.',
      concepts: [
        { name: 'Active edit lock versus read-and-comment access', description: 'Grant write access to one active editor at a time while letting other teammates open the article in read-and-comment mode with a clear banner showing who holds the lock.' },
        { name: 'Heartbeat timeouts and safe lock takeover', description: 'Expire locks automatically when an editor goes idle or closes their browser, and allow another editor to request or take over the lock after snapshotting unsaved changes.' },
        { name: 'Anchored inline comments and detached-thread preservation', description: 'Attach review comments to specific text ranges or blocks, and keep unresolved threads accessible in the comment rail even if the anchored paragraph is deleted.' },
        { name: 'Comment resolution and pre-publish review gates', description: 'Track open versus resolved comment threads, allow reopening if a fix is incomplete, and warn or block publishing when unresolved comments remain.' },
      ],
      workflow: [
        { name: 'Acquire the edit lock or enter comment-only mode', description: 'Acquire a lease with periodic heartbeats when opening the editor, or display the active editor’s name and last activity time if already locked.' },
        { name: 'Add inline comments and jump to anchored passages', description: 'Let reviewers highlight text to start a comment thread and click any thread in the sidebar to scroll directly to that passage.' },
        { name: 'Resolve or reopen threads as edits are made', description: 'Let authors mark feedback threads resolved after updating the copy, while keeping resolved history inspectable.' },
        { name: 'Check unresolved comments before publish and release locks cleanly', description: 'Surface any remaining open comments during the publish check, and handle lock release or takeover without losing the previous editor’s work.' },
      ],
      pitfalls: [
        { name: 'Orphaned locks that stay stuck after an editor closes their laptop', description: 'Always pair edit locks with a short server heartbeat timeout and an explicit takeover flow so a departed teammate never blocks a deadline.' },
        { name: 'Allowing a stale tab to overwrite the new lock holder’s save', description: 'Verify the active lock token on every save request, and let the displaced tab copy its local unsaved edits if its lock was taken over.' },
        { name: 'Silently deleting unresolved comments when their anchored sentence is removed', description: 'If an author deletes a paragraph to rewrite it, preserve the attached comment thread with a "Quoted text removed" indicator until explicitly resolved.' },
      ],
      questions: [
        'Does the CMS use single-editor presence locks or realtime multi-cursor editing, and can reviewers still add comments while an edit lock is active?',
        'After how many minutes of inactivity does an edit lock expire, and how does manual lock takeover protect the previous editor’s unsaved text?',
        'Who can mark an inline review comment as resolved—any author, only the reviewer who opened it, or a lead editor?',
        'What happens to an open inline comment when the text passage it was anchored to is deleted?',
        'When unresolved comments remain on an article, is publishing blocked outright or allowed after a confirmation warning?',
      ],
      example: 'Example: a newsroom CMS could grant a single edit lock with a 10-minute idle timeout, let reviewers add inline comments while the article is locked, keep deleted-passage comments visible in a "Detached" group until resolved, and prompt for confirmation if an editor clicks Publish with open comments. Confirm actual lock timeouts and publish gates before adopting this setup.',
      relatedDesigns: [
        { id: 'dismissible-inline-banner', reason: 'A reference for showing which teammate currently holds the edit lock along with a button to request or take over editing. Real lock leases need separate implementation.' },
        { id: 'ly-activity-timeline', reason: 'A reference for displaying comment threads, replies and resolution history in a side rail. Real text-range anchoring needs separate implementation.' },
      ],
      promptSnippet: 'Help design editor presence locks, lock takeovers and inline review comments for a CMS. First confirm single-editor lock versus realtime collaboration rules, idle lock expiration and safe takeover behavior, whether commenting works while locked, how comments survive when anchored text is deleted, and whether open comments warn or block publishing. Do not assume undecided rules.\nBased on the answers, describe:\n1. States across unlocked, locked by current user, locked by teammate (comment-only), idle-expired and lock-taken-over.\n2. Server lock-token checks on save and local backup protection when a stale tab loses its lock.\n3. Inline comment anchoring, reply threads, resolve/reopen actions and detached-comment preservation.\n4. Pre-publish checks for unresolved review threads.\n5. How the top lock banner, inline text highlights, comment sidebar and publish confirmation dialog connect.\nDo not assume a UI banner alone prevents concurrent save overwrites, and do not mistake example policies or design demos for a real concurrency backend.',
    },
  },
  sources: [
    { title: 'WordPress Documentation — Post Locking and Collaborative Editing', url: 'https://wordpress.org/documentation/article/posts-screen/#post-locking' },
    { title: 'Wagtail CMS Docs — Page locking and editorial workflow', url: 'https://docs.wagtail.org/en/stable/reference/pages/locking.html' },
  ],
}, {
  id: 'cms-seo-metadata-canonical-and-embargo',
  aliases: {
    ko: ['SEO 메타데이터 오픈그래프', '대표 주소 Canonical 설정', '보도자료 엠바고 노출 제어', '비공개 미리보기 공유 토큰'],
    en: ['SEO and Open Graph metadata', 'canonical URL and noindex rules', 'embargo release enforcement', 'shareable preview tokens'],
  },
  useCases: {
    ko: ['문서 본문 제목과 별개로 검색 결과용 제목·요약(SEO)과 메신저 공유 카드(OG)를 설정할 때', '외부 매체 전재 글이나 중복 경로 문서의 대표 주소(Canonical URL)와 검색 수집 제외(noindex)를 지정할 때', '엠바고(보도 유예) 시각 전까지 검색 엔진·사이트맵·RSS·내부 검색 노출을 모두 차단할 때', '발행 전 외부 관계자에게 만료·회수 가능한 비공개 미리보기 토큰 링크를 공유할 때'],
    en: ['Configuring search title/description and social Open Graph cards separately from the article headline', 'Setting canonical URLs for syndicated posts and noindex flags for unlisted pages', 'Enforcing embargo timestamps across pages, sitemaps, RSS feeds and internal search', 'Sharing expiring, non-indexed preview token links with external stakeholders before release'],
  },
  keywords: {
    ko: ['SEO 메타데이터', '오픈그래프', '대표 주소', 'Canonical', '검색 제외', 'noindex', '엠바고', '미리보기 토큰', '사이트맵'],
    en: ['SEO metadata', 'Open Graph', 'canonical URL', 'noindex', 'embargo time', 'preview token', 'sitemap exclusion', 'syndication', 'social card preview'],
  },
  text: {
    ko: {
      domain: '콘텐츠 발행·CMS',
      title: '검색 노출(메타·대표 주소) 제어·엠바고 시각과 비공개 미리보기 토큰',
      summary: '본문과 검색·공유 메타데이터의 기본값 대체 규칙을 정하고, 대표 주소·검색 제외·엠바고 시각·미리보기 토큰을 연결합니다.',
      overview: '글을 잘 작성했더라도 검색 결과 설명이나 메신저 공유 카드가 비어 있으면 유입이 줄고, 반대로 엠바고(보도 유예) 문서나 외부 검수용 미리보기 링크가 검색 엔진이나 사이트맵에 먼저 수집되면 큰 보안·홍보 사고가 됩니다. 본문에서 메타데이터로 이어지는 자동 대체(Fallback) 규칙, 대표 주소(Canonical)와 검색 제외(noindex) 제어, 엠바고 해금 전 채널별 차단 범위를 함께 설계해야 합니다. 아래 내용은 SEO·엠바고·미리보기 설계를 위한 참고이며 특정 검색 엔진의 순위 공식을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '본문 제목·요약과 검색(SEO)·소셜 공유(OG) 메타데이터 폴백', description: '별도 SEO 제목·설명이나 소셜 공유 이미지를 입력하지 않았을 때 본문 제목·첫 문단·대표 썸네일을 어떤 순서로 자동 대체할지 정합니다.' },
        { name: '대표 주소(Canonical URL)와 검색 수집 제외(noindex)', description: '동일 원고를 여러 경로에 싣거나 외부에 기고했을 때 원본 대표 주소를 명시하고, 링크 소지자만 열람해야 하는 페이지는 검색 로봇 수집과 사이트맵에서 제외합니다.' },
        { name: '엠바고(Embargo) 해금 시각과 전체 노출 경로 차단', description: '지정된 엠바고 시각 전에는 웹 페이지 직접 접근뿐 아니라 RSS 피드, 사이트맵, 사이트 내 검색, 추천 글 목록에서도 제목과 요약이 노출되지 않게 막습니다.' },
        { name: '만료·회수 가능한 외부 검수용 미리보기 토큰', description: '아직 발행되지 않았거나 엠바고 중인 문서를 외부 관계자에게 보여 줄 때 서명된 임시 토큰 링크를 발급하고, 검색 수집 차단(`noindex`)과 토큰 즉시 폐기를 지원합니다.' },
      ],
      workflow: [
        { name: '메타데이터 입력과 검색·메신저 카드 미리보기 확인하기', description: 'SEO 제목·설명 글자 수와 소셜 공유 이미지를 점검하고, 비워 둔 항목이 본문 값으로 어떻게 대체되는지 카드 미리보기로 확인합니다.' },
        { name: '검색 수집 여부와 대표 주소(Canonical) 검증하기', description: '기본 자기 참조 대표 주소를 생성하거나 외부 원본 URL 형식을 검사하고, 비노출 문서는 검색 수집 제외와 사이트맵 제외를 함께 켭니다.' },
        { name: '엠바고 시각 설정 또는 외부 미리보기 링크 발급하기', description: '엠바고 해제 일시(표준시 포함)를 지정해 정식 노출을 잠그고, 사전 공유가 필요하면 만료 기한이 있는 미리보기 토큰 주소를 생성합니다.' },
        { name: '해금 시점 공개 전환 및 미리보기 토큰 정리하기', description: '엠바고 시각이 도래하면 문서를 게시 상태로 전환해 사이트맵·피드에 반영하고, 사전 공유용 임시 토큰은 만료 또는 폐기합니다.' },
      ],
      pitfalls: [
        { name: '웹 페이지만 막아 두고 사이트맵·RSS·내부 검색 API에는 엠바고 제목을 노출하기', description: '본문 URL만 차단해도 사이트맵이나 최신 글 API 응답에 제목·요약이 들어가면 엠바고가 유출됩니다. 모든 조회 경로에서 동일하게 걸러내세요.' },
        { name: '외부 공유용 미리보기 링크에 검색 차단 헤더가 빠져 검색 결과에 색인되기', description: '토큰이 붙은 미리보기 주소가 외부에 공유될 때 검색 로봇이 수집하지 못하도록 응답 헤더와 메타 태그로 차단하고 만료 기한을 두세요.' },
        { name: '작업 중 걸어 둔 검색 제외(noindex)가 정식 발행 후에도 그대로 남아 있기', description: '검수 단계의 비노출 설정과 정식 발행 후의 검색 노출 설정을 혼동해 발행 후에도 검색에 안 잡히지 않도록 발행 확인 창에서 노출 상태를 명확히 보여 주세요.' },
      ],
      questions: [
        'SEO 제목·설명이나 소셜 공유(OG) 이미지를 비워 두었을 때 본문 제목·요약·대표 이미지 중 무엇으로 자동 대체하나요?',
        '외부 원본 글의 대표 주소(Canonical URL) 직접 입력이나 특정 게시물의 검색 엔진 수집 제외(noindex) 옵션을 제공하나요?',
        '엠바고(예약 해금) 문서는 해제 시각 전까지 사이트맵, RSS 피드, 내부 검색, 관련 글 목록에서 어떻게 차단하나요?',
        '발행 전 외부 관계자 공유용 미리보기 링크는 만료 기한·비밀번호·즉시 폐기(토큰 재발급) 중 어떤 보호 수단을 쓰나요?',
        '정식 발행 시점에 검색 제외(noindex)가 켜져 있거나 대표 이미지·요약이 비어 있으면 경고를 띄우나요?',
      ],
      example: '예시: SEO 설명이 비어 있으면 본문 요약(최대 150자)으로 자동 대체하고, 외부 검수용 미리보기 링크는 기본 72시간 유효하며 항상 검색 수집 제외로 응답하고, 엠바고 설정 문서는 해제 시각 전까지 사이트맵·피드·검색 결과에서 모두 제외하도록 구성할 수 있습니다. 실제 메타데이터 필수 여부와 캐시 갱신 주기는 배포 환경에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'character-budget-feedback', reason: '검색 결과에서 잘리지 않도록 SEO 제목과 메타 설명의 권장·최대 글자 수를 실시간으로 안내하는 표현에 참고할 수 있습니다. 실제 메타 태그 렌더링은 별도로 구현해야 합니다.' },
        { id: 'inline-delete-confirmation', reason: '외부에 공유된 미리보기 토큰을 즉시 폐기하거나 재발급할 때 기존 링크가 무효화됨을 확인하는 표현에 참고할 수 있습니다. 실제 토큰 검증은 구현하지 않습니다.' },
      ],
      promptSnippet: '콘텐츠 발행(CMS) 서비스의 SEO·소셜 메타데이터, 대표 주소(Canonical)·검색 제외(noindex), 엠바고 시각 제어, 비공개 미리보기 토큰 흐름을 설계해 줘. 먼저 메타데이터 미입력 시 본문 값 대체 규칙, Canonical URL 및 noindex 설정 범위, 엠바고 해금 전 차단 경로(페이지·사이트맵·RSS·검색), 외부 미리보기 토큰의 만료·폐기 방식을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 본문 제목/요약/대표 이미지와 SEO·Open Graph 메타데이터의 매핑 및 폴백 순서.\n2. 자기 참조·외부 대표 주소(Canonical) 검증 및 검색 수집/사이트맵 제외 연동.\n3. 엠바고 해제 전후의 웹 페이지, 피드, 사이트맵, 내부 검색 노출 통제.\n4. 외부 검수용 미리보기 토큰 발급, 검색 색인 차단, 만료 및 즉시 폐기 처리.\n5. 메타데이터 설정 패널·글자 수 안내·소셜/검색 카드 미리보기·발행 전 노출 점검 창의 연결.\n단순히 본문 페이지만 숨기면 피드나 검색에서도 엠바고가 지켜진다고 가정하지 말고, 예시 정책과 디자인 데모를 실제 검색·배포 파이프라인으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Content Publishing & CMS',
      title: 'SEO metadata, canonical URLs, embargo times and shareable preview tokens',
      summary: 'Connect metadata fallbacks, canonical URLs and noindex rules with strict embargo enforcement and revocable preview tokens.',
      overview: 'Publishing content requires careful control over how and when search engines, social cards and external reviewers can see an article. Missing metadata weakens search and social snippets, while leaking an embargoed announcement through an RSS feed or allowing a private preview link to get indexed by crawlers causes serious operational mistakes. Coordinate metadata fallbacks, canonical/noindex controls, embargo gates and preview tokens together. These concepts are design references, not default SEO ranking formulas.',
      concepts: [
        { name: 'Search and social metadata fallback chains', description: 'Define how SEO title, meta description and Open Graph image fall back to the article headline, excerpt or cover image when left blank.' },
        { name: 'Canonical URLs and search-indexing exclusion', description: 'Default to a self-referencing canonical URL, allow overriding it for syndicated articles, and synchronize `noindex` flags with XML sitemap exclusion.' },
        { name: 'Embargo enforcement across all discovery surfaces', description: 'Keep embargoed articles out of public routes, XML sitemaps, RSS/Atom feeds, site search and related-article widgets until the exact release timestamp.' },
        { name: 'Expiring, non-indexed shareable preview tokens', description: 'Generate signed preview URLs with expiration and instant revocation so external reviewers can inspect unreleased articles without exposing them to crawlers.' },
      ],
      workflow: [
        { name: 'Edit metadata and inspect search/social card previews', description: 'Show character-budget feedback for SEO titles and descriptions, and render a live preview of how fallback values populate social cards.' },
        { name: 'Configure canonical URLs and indexing controls', description: 'Validate custom canonical URLs and clearly warn if `noindex` is enabled on an article intended for public search discovery.' },
        { name: 'Set embargo timestamps or issue preview tokens', description: 'Lock public exposure until the specified timezone-aware embargo time, and create revocable preview tokens for pre-release stakeholders.' },
        { name: 'Release on embargo expiry and rotate or revoke tokens', description: 'Publish the article to live pages, feeds and sitemaps when the embargo lifts, and invalidate expired or revoked preview tokens immediately.' },
      ],
      pitfalls: [
        { name: 'Leaking embargoed headlines through sitemaps, RSS feeds or search APIs', description: 'Blocking the article page alone is not enough; ensure sitemaps, feeds and internal search queries filter out embargoed items until release.' },
        { name: 'Allowing shareable preview links to be indexed by search engines', description: 'Always attach `noindex` directives and token expiration to preview routes so shared review links never appear in public search results.' },
        { name: 'Leaving a staging `noindex` toggle turned on after publishing', description: 'Surface indexing status prominently in the publish confirmation step so editors do not accidentally hide a launched article from search engines.' },
      ],
      questions: [
        'When SEO title, meta description or Open Graph image fields are left empty, how do they fall back to article fields?',
        'Can editors set a custom canonical URL for syndicated content or mark specific published pages as `noindex` (and excluded from sitemaps)?',
        'How does an embargo timestamp suppress an article across web routes, sitemaps, RSS feeds and internal search until release?',
        'How are pre-release preview links protected (expiration window, token revocation, password), and how are crawlers blocked from indexing them?',
        'Does the publish checklist warn editors when social images are missing or when `noindex` is still enabled?',
      ],
      example: 'Example: a CMS could fall back from SEO description to the first 150 characters of the summary, issue 72-hour revocable preview links that always send `X-Robots-Tag: noindex`, exclude embargoed posts from sitemaps and feeds until release, and warn before publishing if `noindex` is checked. Confirm actual cache invalidation and syndication rules before adopting this setup.',
      relatedDesigns: [
        { id: 'character-budget-feedback', reason: 'A reference for showing recommended character limits on SEO titles and meta descriptions. Real metadata tag rendering needs separate implementation.' },
        { id: 'inline-delete-confirmation', reason: 'A reference for confirming before revoking or rotating an active external preview token. Real token verification needs separate implementation.' },
      ],
      promptSnippet: 'Help design SEO/Open Graph metadata, canonical and noindex controls, embargo release gates and shareable preview tokens for a CMS. First confirm metadata fallback order, custom canonical URL and `noindex`/sitemap rules, how embargoed items are excluded from pages, feeds, sitemaps and search until release, and how preview tokens expire or get revoked. Do not assume undecided rules.\nBased on the answers, describe:\n1. Mapping and fallback rules between article fields and SEO/Open Graph metadata.\n2. Validation for canonical URLs and synchronization between `noindex` directives and sitemap exclusion.\n3. Embargo enforcement across public URLs, RSS feeds, sitemaps and search indexes.\n4. Issuance, crawler blocking, expiration and revocation of external preview tokens.\n5. How the metadata inspector, character budget meter, card preview and pre-publish exposure checklist connect.\nDo not assume hiding an article route keeps it out of feeds or sitemaps automatically, and do not mistake example policies or design demos for a real publishing pipeline.',
    },
  },
  sources: [
    { title: 'Google Search Central — Consolidate duplicate URLs with canonicals', url: 'https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls' },
    { title: 'Google Search Central — Block search indexing with noindex', url: 'https://developers.google.com/search/docs/crawling-indexing/block-indexing' },
  ],
}, {
  id: 'cms-localization-translation-sync-and-fallback',
  aliases: {
    ko: ['다국어 문서 번역 동기화', '원문 수정 시 번역 갱신 대기', '미번역 언어 기본 폴백', '언어별 독립 발행 상태'],
    en: ['multi-locale content sync', 'outdated translation flags', 'locale fallback routing', 'per-locale publish status'],
  },
  useCases: {
    ko: ['하나의 원본 문서를 한국어·영어·일본어 등 여러 언어 버전으로 연결해 관리할 때', '기준 언어(Source) 원문이 수정되었을 때 연결된 번역본들에 "원문 변경됨(갱신 필요)" 표시를 띄울 때', '특정 언어 번역본이 아직 게시되지 않았을 때 방문자에게 기본 언어 본문을 안내와 함께 보여 줄지 404를 띄울지 정할 때', '번역 화면에서 기준 언어의 이전 버전과 새 버전 차이를 보며 해당 언어만 독립적으로 발행할 때'],
    en: ['Managing linked translations of an article across multiple locales', 'Flagging translated locales as outdated when the source-locale article is updated', 'Deciding whether missing locale pages fall back to the default locale with a banner or return 404', 'Comparing source-locale diffs side by side and publishing each locale independently'],
  },
  keywords: {
    ko: ['다국어 CMS', '번역 동기화', '기준 언어', '번역 갱신 필요', '언어 폴백', '로케일 전환', '독립 발행', '원문 비교', '다국어 주소'],
    en: ['multi-locale CMS', 'translation sync', 'source locale', 'outdated translation', 'locale fallback', 'language switcher', 'per-locale publishing', 'hreflang', 'side-by-side translation'],
  },
  text: {
    ko: {
      domain: '콘텐츠 발행·CMS',
      title: '다국어 문서 원문 수정 시 번역본 갱신 대기 표시와 기본 언어 대체',
      summary: '기준 언어 원문과 언어별 번역본의 발행 상태를 분리하고, 원문 변경 시 갱신 필요 표시와 미번역 언어 대체 노출을 연결합니다.',
      overview: '다국어 문서나 블로그를 운영할 때 한국어 원문만 고치고 영어·일본어 번역본은 예전 내용 그대로 방치되면 언어마다 안내하는 정책이나 수치가 달라집니다. 반대로 번역이 다 끝날 때까지 원문 발행을 무조건 막으면 시급한 공지를 제때 올릴 수 없습니다. 언어별 독립 발행 상태, 원문 변경 시 번역 갱신 필요(Outdated) 알림, 그리고 아직 번역되지 않은 언어로 접근한 독자에게 보여 줄 대체(Fallback) 화면을 함께 설계해야 합니다. 아래 내용은 다국어 CMS 설계를 위한 참고이며 특정 번역 도구를 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '기준 언어(Source Locale)와 언어별 독립 생명주기', description: '하나의 문서 ID 아래에 언어별 본문과 발행 상태(미작성·번역 중·게시됨)를 따로 두어, 원문이 먼저 게시되고 번역본이 순차적으로 발행될 수 있게 합니다.' },
        { name: '원문 버전 기준점과 번역 갱신 대기(Outdated) 표시', description: '각 번역본이 원문의 몇 번째 버전을 기준으로 번역되었는지 기록하고, 원문에 중요한 수정이 발행되면 연결된 번역본들을 "갱신 필요" 상태로 표시합니다.' },
        { name: '소규모 오타 수정과 번역 재검토 유발 구분', description: '원문의 단순 띄어쓰기·오탈자만 고칠 때는 번역 갱신 경고를 띄우지 않고, 의미나 수치가 바뀐 수정일 때만 번역 담당자에게 갱신 요청을 보낼지 선택합니다.' },
        { name: '미번역 언어 방문 시 기본 언어 폴백과 언어 전환 안내', description: '독자가 선택한 언어의 번역본이 아직 없을 때 404를 보여 줄지, 기본 언어 본문을 보여 주면서 상단에 "아직 한국어 원문으로 제공됩니다" 안내를 띄울지 결정합니다.' },
      ],
      workflow: [
        { name: '기준 언어 작성·발행과 번역 대상 언어 생성하기', description: '기준 언어 문서를 작성하고, 필요한 대상 언어 탭을 열어 원문 구조를 복제한 작업본에서 번역을 시작합니다.' },
        { name: '원문 수정 시 번역 갱신 필요 여부 지정하기', description: '이미 번역본이 있는 원문을 재발행할 때 "번역본 갱신 필요로 표시" 여부를 확인해 대상 언어들을 갱신 대기 목록에 올립니다.' },
        { name: '원문 변경점(Diff)을 비교하며 번역본 갱신·발행하기', description: '번역 에디터에서 이전에 번역했던 원문 시점과 최신 원문의 차이를 나란히 확인하며 수정한 뒤, 해당 언어 번역본을 최신 상태로 재발행합니다.' },
        { name: '독자 화면에서 언어 전환 및 미번역 대체 안내하기', description: '방문자가 언어를 바꿀 때 게시된 번역본이 있으면 해당 언어로 이동하고, 없으면 정책에 따라 기본 언어 대체 본문과 안내 배너를 보여 줍니다.' },
      ],
      pitfalls: [
        { name: '원문은 여러 번 바뀌었는데 번역본이 최신인지 예전 내용인지 알 수 없기', description: '번역본마다 기준이 된 원문 버전을 기록하지 않으면 어느 문단이 바뀌었는지 처음부터 대조해야 합니다. 원문 변경 차이를 바로 확인하게 하세요.' },
        { name: '원문을 수정했다고 이미 게시된 번역본을 자동으로 비공개로 내려 버리기', description: '번역이 조금 늦어진다고 기존 영어 페이지를 갑자기 닫으면 외부 링크가 깨집니다. 기존 번역본을 유지할지 안내 배너를 띄울지 구분하세요.' },
        { name: '공통 속성(고유 코드·대표 이미지·카테고리)과 언어별 속성(제목·본문)을 구분하지 않기', description: '모든 언어에서 함께 써야 하는 속성과 언어마다 달라지는 속성을 명확히 나누어야 수정 시 혼선이 없습니다.' },
      ],
      questions: [
        '기준 언어(Source Locale)는 고정인가요, 문서마다 처음 작성한 언어가 기준 언어가 되나요?',
        '모든 언어 번역이 끝나야 동시에 발행하나요, 언어별로 준비되는 대로 개별 발행할 수 있나요?',
        '기준 언어 원문이 수정·재발행될 때 기존 번역본에 "번역 갱신 필요" 표시를 띄우고, 단순 오타 수정은 제외할 수 있나요?',
        '특정 언어 번역본이 아직 없거나 예전 버전일 때 방문자 화면에서는 기본 언어 대체 노출, 안내 배너 표시, 404 중 어떻게 처리하나요?',
        '카테고리·슬러그·대표 이미지·첨부 파일 중 모든 언어가 공유하는 항목과 언어별로 따로 넣는 항목은 무엇인가요?',
      ],
      example: '예시: 한국어 원문이 재발행될 때 편집자가 "주요 내용 변경"을 체크하면 영어·일본어 번역본에 갱신 필요 배지가 붙고, 번역 화면에서는 한국어 원문의 변경 문단만 강조해 보여 주며, 아직 번역되지 않은 언어 URL로 접속하면 상단 안내 배너와 함께 기본 언어 본문을 보여 주도록 구성할 수 있습니다. 실제 동시 발행 필수 여부와 URL 언어 경로 규칙은 서비스 정책에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'ly-context-code-diff', reason: '번역본이 마지막으로 맞췄던 원문 버전과 최신 원문 버전의 변경 문장을 비교하는 표현에 참고할 수 있습니다. 실제 다국어 버전 매핑은 별도로 구현해야 합니다.' },
        { id: 'dismissible-inline-banner', reason: '방문자에게 현재 선택한 언어의 번역본이 준비 중이어서 기본 언어로 표시되고 있음을 알리는 배너 표현에 참고할 수 있습니다. 실제 로케일 라우팅은 구현하지 않습니다.' },
      ],
      promptSnippet: '다국어 콘텐츠 발행(CMS) 서비스의 원문·번역본 동기화, 갱신 대기(Outdated) 표시, 미번역 언어 대체(Fallback) 흐름을 설계해 줘. 먼저 기준 언어와 대상 언어의 독립 발행 허용 여부, 원문 수정 시 번역 갱신 필요 표시 조건(주요 수정 vs 오타 수정), 미번역 또는 구버전 번역본에 대한 독자 화면 대체 노출 규칙, 언어 간 공유 속성과 개별 속성 구분을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 문서의 공통 속성과 언어별(Locale) 본문·발행 상태·기준 원문 버전 기록 구조.\n2. 기준 언어 재발행 시 하위 번역본의 갱신 필요(Outdated) 상태 전환과 예외 규칙.\n3. 이전 번역 시점 원문과 최신 원문 간 차이(Diff) 확인 및 번역본 최신화 절차.\n4. 미번역 언어 또는 구버전 번역본 접근 시 기본 언어 폴백, 안내 배너, 언어 전환기 동작.\n5. 언어별 상태 탭·원문 변경 비교 뷰·갱신 필요 필터 목록·독자용 언어 안내 배너의 연결.\n원문 수정이 번역본 자동 번역이나 즉시 비공개 처리를 뜻한다고 가정하지 말고, 예시 정책과 디자인 데모를 실제 다국어 CMS 백엔드로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Content Publishing & CMS',
      title: 'Multi-locale content sync, outdated-translation flags and locale fallbacks',
      summary: 'Track per-locale publishing states against source revisions, flag outdated translations when source content changes, and define reader fallbacks.',
      overview: 'In a multi-locale CMS, updating the source-language article without tracking which translations now lag behind quickly leads to contradictory product docs or policies across languages. At the same time, blocking an urgent source update until every language is translated is often impractical. Track which source revision each translation matches, flag outdated locales on substantive edits, and define clear fallback behavior for readers. These concepts are design references, not default localization architectures.',
      concepts: [
        { name: 'Source locale versus independent per-locale lifecycle', description: 'Link multiple locales under one content item while allowing each locale to have its own working copy and publish status (untranslated, in translation, published).' },
        { name: 'Source-revision pinning and outdated-translation flags', description: 'Record the source revision ID each translation was last synced against, and mark translations as Outdated when a new source revision is published.' },
        { name: 'Substantive source updates versus minor typo fixes', description: 'Let editors indicate whether a source edit changes meaning (flagging translations for update) or only fixes a source-language typo (leaving translations synced).' },
        { name: 'Reader locale fallback and untranslated notices', description: 'Decide whether requesting an untranslated locale serves the default-locale content with a helpful notice banner, redirects, or hides the language option.' },
      ],
      workflow: [
        { name: 'Author the source locale and initialize target locales', description: 'Publish or save the source-locale article and open target-locale tabs that reference the current source version.' },
        { name: 'Flag translations when publishing substantive source edits', description: 'When republishing the source locale, choose whether the change requires translation updates and mark linked locales as Outdated.' },
        { name: 'Review source diffs and republish updated translations', description: 'Show translators the exact diff between the source revision their locale last matched and the latest source revision, then clear the Outdated flag on publish.' },
        { name: 'Serve localized pages or fallback banners to readers', description: 'Route visitors to published translations, or display the configured fallback locale with a clear notice when a translation is unavailable or behind.' },
      ],
      pitfalls: [
        { name: 'Updating the source article with no record of which translations are now stale', description: 'Without pinning each translation to a source revision, translators have to re-read the entire article to guess what changed.' },
        { name: 'Automatically unpublishing live translations whenever the source is edited', description: 'Taking down live translated pages on every source edit breaks traffic and links. Keep the published translation live while flagging a pending update, unless an urgent takedown is chosen.' },
        { name: 'Mixing locale-shared fields with locale-specific fields without labels', description: 'Make it explicit which fields (such as category or canonical key) are shared across all locales and which fields (title, body, localized slug, alt text) are per-locale.' },
      ],
      questions: [
        'Is there one fixed source locale for all content, or can each article designate its own source locale?',
        'Can each locale be published independently as soon as it is ready, or must selected locales launch simultaneously?',
        'When the source article is updated, do linked translations automatically become Outdated, or can editors skip the flag for minor typo fixes?',
        'What do visitors see when a requested locale is not yet translated or is behind the source version (fallback locale with banner, redirect, or 404)?',
        'Which fields are shared across all locales versus customized per locale?',
      ],
      example: 'Example: a documentation CMS could let English articles publish immediately, mark Korean and Japanese translations as Outdated whenever an editor publishes a substantive English update, show translators the English diff since their last synced revision, and serve the English page with a top notice banner if a reader opens an untranslated locale. Confirm actual simultaneous-launch rules and URL structures before adopting this setup.',
      relatedDesigns: [
        { id: 'ly-context-code-diff', reason: 'A reference for showing translators the diff between the source version they last translated and the newest source version. Real revision tracking needs separate implementation.' },
        { id: 'dismissible-inline-banner', reason: 'A reference for informing readers when a page is shown in the fallback language or when a translation is being updated. Real locale routing needs separate implementation.' },
      ],
      promptSnippet: 'Help design multi-locale translation synchronization, outdated-translation flags and reader fallback rules for a CMS. First confirm whether locales publish independently or together, how substantive source edits versus minor typo edits affect outdated flags, what readers see when a locale is untranslated or outdated, and which fields are shared versus per-locale. Do not assume undecided rules.\nBased on the answers, describe:\n1. Data model for shared item fields versus per-locale content, publish status and synced source-revision ID.\n2. Rules for marking translations Outdated when the source locale is republished.\n3. Translator workflow for inspecting source diffs since the last synced revision and clearing Outdated flags.\n4. Reader-facing behavior for missing or outdated translations (fallback locale, notice banner, language switcher state).\n5. How the locale status tabs, source-diff viewer, outdated-translation queue and reader fallback banner connect.\nDo not assume source edits automatically translate or unpublish other locales, and do not mistake example policies or design demos for a real localization backend.',
    },
  },
  sources: [
    { title: 'Google Search Central — Localized Versions of your Pages (hreflang)', url: 'https://developers.google.com/search/docs/specialty/international/localized-versions' },
    { title: 'Payload CMS Docs — Localization and Field-level Fallbacks', url: 'https://payloadcms.com/docs/configuration/localization' },
  ],
}];
