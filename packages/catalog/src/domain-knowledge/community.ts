import type { DomainKnowledge } from '../domain-knowledge';

export const COMMUNITY_KNOWLEDGE: DomainKnowledge[] = [{
  id: 'community-post-visibility-and-moderation',
  aliases: {
    ko: ['게시판 서비스', '회원 커뮤니티', '회원 전용 게시판', '비공개 그룹', '게시글 운영', '신고 처리'],
    en: ['community forum', 'members-only forum', 'private group', 'post moderation', 'community moderation', 'report review'],
  },
  useCases: {
    ko: ['게시물과 댓글이 있는 커뮤니티를 만들 때', '회원 전용·그룹별 공개 범위와 접근 권한을 설계할 때', '신고 접수·검토·운영 조치를 구분할 때', '게시물 숨김·삭제·복구와 댓글 잠금을 설계할 때'],
    en: ['Building a community with posts and comments', 'Designing members-only or private-group visibility and access permissions', 'Separating reports, review and moderation actions', 'Designing post hiding, deletion, restoration and comment locking'],
  },
  keywords: {
    ko: ['커뮤니티', '게시판', '게시물', '댓글', '댓글 잠금', '공개 범위', '권한', '회원', '운영자', '신고', '숨김', '숨김 복구', '삭제', '잠금', '운영', '접근 제어', '이의 제기'],
    en: ['community', 'forum', 'post', 'discussion', 'comment', 'visibility', 'permissions', 'member', 'moderator', 'report', 'hide', 'delete', 'lock', 'moderation', 'access control'],
  },
  text: {
    ko: {
      domain: '커뮤니티',
      title: '게시물의 공개 범위·권한과 운영 상태',
      summary: '누가 글을 보고 행동할 수 있는지 정하고, 게시·신고·숨김·잠금을 서로 다른 상태로 다룹니다.',
      overview: '커뮤니티의 글은 공개 여부만으로 설명되지 않습니다. 누가 볼 수 있는지, 누가 작성·수정·댓글을 달 수 있는지, 운영 중 어떤 상태로 바뀌는지를 나누어 설계해야 합니다. 아래 개념은 게시물과 댓글을 설계하기 위한 참고이며 특정 서비스의 권한이나 제재 정책을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '공개 범위와 접근 권한', description: '전체 공개·회원·특정 그룹처럼 누가 내용을 볼 수 있는지 정합니다. 열람 권한과 글 작성·댓글 작성 권한은 별도일 수 있습니다.' },
        { name: '역할과 행동', description: '방문자·회원·작성자·운영자별 가능한 행동을 구분합니다. 버튼을 숨기는 화면 처리만으로 실제 데이터 접근이나 수정을 막을 수는 없습니다.' },
        { name: '게시 상태', description: '초안·게시됨·숨김·삭제처럼 글의 노출과 보관 상태를 구분합니다. 숨김과 영구 삭제는 복구 가능성과 기존 링크 처리에서 다르므로 의미를 정해야 합니다.' },
        { name: '신고와 운영 판단', description: '신고 접수는 위반 확정과 다릅니다. 확인 중·처리됨 등 검토 상태, 담당자와 가능한 조치를 정하고 게시 상태와 구분합니다.' },
        { name: '댓글 잠금과 변경 기록', description: '댓글 잠금은 읽기나 삭제와 다른 조치입니다. 누가 잠금·해제·수정을 할 수 있는지, 변경 이유와 기록을 누구에게 보여 줄지 결정합니다.' },
      ],
      workflow: [
        { name: '작성 전에 범위와 권한 확인하기', description: '작성자가 게시할 위치와 공개 범위를 이해하게 하고, 읽기·작성·댓글 권한을 각각 정합니다.' },
        { name: '작성·게시·수정 연결하기', description: '초안 저장과 게시를 구분하고, 게시 후 수정 가능 범위와 공개 범위 변경 시 기존 링크·검색 노출 처리를 정합니다.' },
        { name: '신고를 검토와 조치로 연결하기', description: '신고 내용 확인 후 정책에 따라 유지·숨김·잠금 등 필요한 조치를 선택합니다. 신고 횟수만으로 자동 제재할지는 별도 결정 사항입니다.' },
        { name: '결과와 복구 가능성 안내하기', description: '처리 결과를 누구에게 알릴지, 숨김 해제·삭제 복구·이의 제기 경로를 제공할지 정합니다. 실패 시 조치가 완료된 것처럼 표시하지 않습니다.' },
      ],
      pitfalls: [
        { name: '화면에서만 숨기기', description: '권한 없는 사용자에게 목록을 숨겨도 상세 주소·검색·첨부 파일 경로에서 내용이 노출될 수 있습니다. 실제 제공 데이터의 권한 검사까지 연결하세요.' },
        { name: '신고·숨김·삭제·잠금을 한 상태로 처리하기', description: '신고 접수 후에도 글은 공개될 수 있고, 댓글을 잠근 글도 읽을 수 있습니다. 각 조치의 의미와 조합을 확인하세요.' },
        { name: '공개 범위 변경의 파급을 놓치기', description: '전체 공개 글을 그룹 전용으로 바꾸면 이전 링크·검색 결과·알림 미리보기·첨부에도 같은 정책이 필요합니다. 이미 외부에 공유된 복사본까지 회수된다고 안내하지 마세요.' },
      ],
      questions: [
        '방문자·회원·특정 그룹 중 누가 글·댓글·첨부를 볼 수 있고, 누가 작성할 수 있나요?',
        '작성자와 운영자는 각각 언제 무엇을 수정·숨김·삭제·잠금할 수 있나요?',
        '공개 범위를 변경하면 기존 주소·검색 결과·알림·첨부 파일은 어떻게 보이나요?',
        '신고는 누가 검토하고 어떤 상태와 조치가 필요한가요? 자동 숨김 기준이 있다면 무엇인가요?',
        '숨김·삭제 후 복구나 이의 제기를 허용하나요? 댓글과 변경 기록은 누구에게 남아 보이나요?',
        '다른 운영자와 동시에 처리하거나 요청이 실패했을 때 어떤 최종 상태와 안내를 보여 주나요?',
      ],
      example: '예시: 독서 모임의 글은 가입한 그룹 구성원만 읽고 댓글을 달 수 있게 정할 수 있습니다. 신고가 들어오면 검토 대기만 표시하고, 운영자가 토론을 잠그면 기존 글은 읽을 수 있지만 새 댓글은 제한하는 방식입니다. 실제 공개 범위·자동 조치·복구 정책은 운영 목적에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'faceted-filter-chips', reason: '운영 목록에서 게시 상태와 신고 검토 상태를 별도 조건으로 좁히는 표현에 참고할 수 있습니다. 실제 접근 권한 검사는 구현하지 않습니다.' },
        { id: 'inline-delete-confirmation', reason: '게시물 삭제의 영향을 확인하는 화면에 참고할 수 있습니다. 실제 삭제·복구 정책과 저장 처리는 별도로 구현해야 합니다.' },
      ],
      promptSnippet: '커뮤니티의 게시물·댓글·운영 흐름을 설계해 줘. 먼저 공개 범위, 역할별 열람·작성·수정 권한, 게시 상태, 신고 검토 과정, 숨김·삭제·잠금과 복구 정책을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 역할별 가능한 행동과 글·댓글·첨부에 대한 접근 권한.\n2. 공개 범위, 게시 상태, 신고 검토 상태를 구분한 데이터와 상태 전환.\n3. 각 조치가 기존 링크·검색·알림·첨부·댓글에 미치는 영향.\n4. 조치 실패·중복 요청·동시 처리 시 사용자에게 보일 결과와 실제 최종 상태.\n5. 목록·상세·작성·신고·운영 화면과 상태 배지·필터·확인 동작의 연결.\n신고를 위반 확정으로 취급하거나 버튼 숨김만으로 권한을 구현하지 말아 줘. 예시 정책과 디자인 데모를 실제 운영 규칙이나 저장 기능으로 간주하지 말고, 필요한 인증·저장 환경은 별도로 확인해 줘.',
    },
    en: {
      domain: 'Community',
      title: 'Post visibility, permissions and moderation states',
      summary: 'Decide who can read and act, and separate publication, reports, hiding and locking.',
      overview: 'A community post needs more than a public/private flag. Design who can read it, who can create, edit or comment, and which moderation states it can enter. These concepts are references for posts and comments, not default access or enforcement policies for a particular service.',
      concepts: [
        { name: 'Visibility and access permissions', description: 'Decide who can read content: everyone, members or specific groups, for example. Reading, creating posts and replying can be separate permissions.' },
        { name: 'Roles and actions', description: 'Separate actions available to visitors, members, authors and moderators. Hiding a button alone cannot prevent actual data access or modification.' },
        { name: 'Publication state', description: 'Distinguish draft, published, hidden and deleted content. Define hiding versus permanent deletion, including recoverability and handling of existing links.' },
        { name: 'Reports and moderation decisions', description: 'Receiving a report does not establish a violation. Define review states, responsible people and available actions separately from publication state.' },
        { name: 'Comment locking and change history', description: 'Locking comments is a different action from restricting reading or deleting content. Decide who can lock, unlock or edit, and who can see reasons and history.' },
      ],
      workflow: [
        { name: 'Confirm scope and permissions before posting', description: 'Help authors understand the destination and visibility of their post, and define reading, posting and reply permissions separately.' },
        { name: 'Connect drafting, publication and editing', description: 'Separate saving drafts from publishing. Decide what can change afterwards and how visibility changes affect existing links and search exposure.' },
        { name: 'Connect reports to review and action', description: 'Review a report, then follow the agreed policy to retain, hide or lock content. Automatic enforcement based on report counts is a separate decision.' },
        { name: 'Explain outcomes and recoverability', description: 'Decide who is notified and whether unhiding, restoring deleted content or appeals are available. Do not present failed actions as completed.' },
      ],
      pitfalls: [
        { name: 'Hiding content only in the interface', description: 'Removing a list item can still leave content exposed through detail URLs, search or attachment paths. Connect the design to actual data-access checks.' },
        { name: 'Merging reports, hiding, deletion and locking', description: 'A reported post may remain published, and a comment-locked post may remain readable. Confirm the meaning and permitted combinations of these states.' },
        { name: 'Missing the effects of visibility changes', description: 'Changing a public post to group-only also needs a policy for old links, search results, notification previews and attachments. Do not promise to recall copies already shared externally.' },
      ],
      questions: [
        'Which visitors, members or groups can read posts, comments and attachments, and who can create them?',
        'When can authors and moderators edit, hide, delete or lock content, and which content can they affect?',
        'After visibility changes, what do existing URLs, search results, notifications and attachments show?',
        'Who reviews reports, which states and actions are needed, and is there an agreed automatic-hiding rule?',
        'Can hidden or deleted content be restored or appealed? Who can still see comments and change history?',
        'If moderators act concurrently or a request fails, what final state and explanation are shown?',
      ],
      example: 'Example: a reading group could allow only its members to read and comment on posts. A report would create a pending review, while a moderator could lock further comments and keep the existing discussion readable. Confirm actual visibility, automatic actions and recovery policies for the community before adopting this example.',
      relatedDesigns: [
        { id: 'faceted-filter-chips', reason: 'A reference for filtering a moderation list separately by publication and report-review states. It does not implement actual access checks.' },
        { id: 'inline-delete-confirmation', reason: 'A reference for confirming the impact of deleting a post. Real deletion, recovery policy and persistence need separate implementation.' },
      ],
      promptSnippet: 'Help design community posts, comments and moderation. First confirm visibility, role-based read/create/edit permissions, publication states, report review, hiding, deletion, locking and recovery policies. Do not assume undecided rules.\nBased on the answers, describe:\n1. Actions for each role and access to posts, comments and attachments.\n2. Data and transitions that separate visibility, publication state and report-review state.\n3. How each action affects existing links, search, notifications, attachments and comments.\n4. User-visible outcomes and actual final states after failures, duplicate requests or concurrent moderation.\n5. How lists, detail pages, editors, reports and moderation screens connect to badges, filters and confirmation actions.\nDo not treat a report as proof of a violation or implement permissions by hiding buttons alone. Do not mistake example policies or design demos for real moderation rules or persistence. Separately confirm the required authentication and storage environment.',
    },
  },
  sources: [
    { title: 'Discourse — Create a category', url: 'https://meta.discourse.org/t/create-a-category-in-discourse/197224' },
    { title: 'GitHub Docs — Moderating discussions', url: 'https://docs.github.com/en/discussions/managing-discussions-for-your-community/moderating-discussions' },
  ],
}, {
  id: 'community-comment-thread-mention-and-reaction',
  aliases: {
    ko: ['댓글 대댓글 스레드', '멘션 호출 알림', '공감 추천 투표', '삭제된 댓글 자리 표시', '계층형 댓글 구조'],
    en: ['nested comment threads', 'user mention notifications', 'reaction and upvote system', 'deleted comment tombstone', 'threaded replies'],
  },
  useCases: {
    ko: ['댓글·대댓글 계층과 들여쓰기 깊이를 정할 때', '@멘션 자동완성과 호출 알림 발송 대상을 연결할 때', '좋아요·이모지 공감·추천/비추천 투표 집계를 설계할 때', '답글이 달린 상위 댓글 삭제 시 자리 표시(Tombstone)를 유지할 때'],
    en: ['Defining comment reply hierarchy and maximum indentation depth', 'Connecting @mention autocomplete to recipient notification rules', 'Designing like, emoji reaction or upvote/downvote tally rules', 'Preserving thread continuity with a tombstone when a parent comment is deleted'],
  },
  keywords: {
    ko: ['대댓글', '스레드', '답글 깊이', '멘션', '호출 알림', '공감', '이모지 반응', '추천 투표', '삭제된 댓글'],
    en: ['comment thread', 'nested replies', 'reply depth', 'mention', 'reaction', 'upvote', 'downvote', 'tombstone placeholder', 'sort order'],
  },
  text: {
    ko: {
      domain: '커뮤니티',
      title: '대댓글 계층·멘션 호출·공감/투표와 삭제 자리 표시',
      summary: '댓글·답글의 깊이 제한과 정렬, @멘션 알림, 공감·투표 취소, 상위 댓글 삭제 후 스레드 보존을 연결합니다.',
      overview: '게시물 아래 댓글이 길어지면 답글 계층을 몇 단계까지 들여쓸지, 누구를 @멘션했을 때 실제로 알림을 보낼지, 상위 댓글이 지워졌을 때 하위 답글을 어떻게 남길지 정해야 대화가 깨지지 않습니다. 아래 내용은 댓글·반응 흐름을 설계하기 위한 참고이며 특정 커뮤니티의 정렬 방식이나 투표 정책을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '댓글 계층 깊이(Depth)와 정렬 기준', description: '1단 답글(평면형)로 제한할지 다단계 트리로 허용할지 정하고, 등록순·최신순·추천순 정렬 시 하위 답글이 상위 댓글을 따라가는지 정의합니다.' },
        { name: '멘션(@) 파싱과 알림 발송 조건', description: '댓글 본문의 @계정 호출을 단순 텍스트와 구분해 저장하고, 열람 권한이 없는 대상이나 차단 관계, 수정 시 재발송 여부를 걸러냅니다.' },
        { name: '공감·이모지 반응과 추천/비추천 집계', description: '사용자당 1회 토글 여부, 중복 클릭 방지, 본인 댓글 자추 허용 여부와 취소 시 실시간 집계 차감 규칙을 정합니다.' },
        { name: '삭제 자리 표시(Tombstone)와 답글 보존', description: '하위 답글이 달린 댓글을 삭제할 때 스레드를 통째로 날리지 않고 작성자·본문만 지운 자리 표시를 남겨 대화 맥락을 유지합니다.' },
      ],
      workflow: [
        { name: '답글 대상과 작업본 입력 연결하기', description: '어느 댓글에 대한 답글인지 명확히 표시하고, 작성 중 실수로 닫아도 입력 작업본을 구분해 복구하거나 확인합니다.' },
        { name: '멘션 대상 검증 후 알림 생성하기', description: '댓글 저장 시 유효한 멘션 대상을 추출하되 해당 글을 볼 수 있는 사용자에게만 1회 알림을 보냅니다.' },
        { name: '반응·투표 토글과 집계 동기화하기', description: '공감이나 추천 클릭 시 중복 요청을 막고, 취소나 재선택이 실제 합계와 목록 정렬에 일관되게 반영되게 합니다.' },
        { name: '댓글 수정·삭제 시 하위 스레드 정리하기', description: '하위 답글 유무에 따라 완전 삭제와 삭제 자리 표시 전환을 구분하고, 삭제된 댓글의 기존 반응·멘션 노출을 정리합니다.' },
      ],
      pitfalls: [
        { name: '무제한 들여쓰기로 모바일 화면 폭을 무너뜨리기', description: '답글 단계가 깊어질수록 왼쪽 여백이 커져 본문이 한 글자씩 줄바꿈됩니다. 최대 들여쓰기 단계와 더보기 접기를 함께 설계하세요.' },
        { name: '댓글을 수정할 때마다 기존 @멘션 알림을 중복 발송하기', description: '오타만 고쳤는데 이미 호출된 사용자에게 알림이 다시 가면 피로도가 커집니다. 새로 추가된 멘션 대상만 발송하세요.' },
        { name: '상위 댓글 삭제 시 하위 답글까지 예고 없이 숨기기', description: '다른 사용자가 작성한 답글이 함께 사라지면 토론 맥락이 끊깁니다. 하위 답글이 있을 때의 자리 표시 정책을 먼저 정하세요.' },
      ],
      questions: [
        '댓글 답글은 몇 단계 깊이까지 허용하며, 모바일에서는 몇 단계부터 들여쓰기를 고정하나요?',
        '댓글 정렬은 등록순·최신순·인기순 중 무엇을 지원하며, 인기순일 때 하위 답글은 어떤 순서로 묶이나요?',
        '@멘션은 한 댓글에 몇 명까지 허용하며, 댓글 수정 시 새로 추가된 대상에게만 알림을 보내나요?',
        '좋아요·이모지 반응과 추천/비추천 중 무엇을 쓰며, 본인 댓글 반응이나 취소·변경을 허용하나요?',
        '하위 답글이 있는 댓글을 작성자나 운영자가 삭제하면 자리 표시만 남기나요, 답글 작성도 함께 막나요?',
      ],
      example: '예시: 기술 포럼에서 댓글은 2단계 깊이까지만 들여쓰고 그 이후 답글은 @멘션 태그와 함께 2단계에 이어 붙이며, 하위 답글이 달린 댓글 삭제 시 본문만 "삭제된 댓글입니다"로 바꾸고 답글은 유지하도록 구성할 수 있습니다. 이는 참고 예시이며 실제 계층·알림·삭제 규칙은 별도로 확정해야 합니다.',
      relatedDesigns: [
        { id: 'character-budget-feedback', reason: '댓글·답글 작성 시 최대 글자 수와 남은 분량을 안내하는 입력 표현에 참고할 수 있습니다. 실제 멘션 파싱이나 댓글 저장은 구현하지 않습니다.' },
        { id: 'inline-delete-confirmation', reason: '댓글 삭제 시 하위 답글 유지 여부나 삭제 영향을 확인하는 동작에 참고할 수 있습니다. 실제 자리 표시 전환은 별도로 구현해야 합니다.' },
      ],
      promptSnippet: '커뮤니티의 댓글·대댓글 계층, @멘션 알림, 공감/투표 및 삭제 자리 표시 흐름을 설계해 줘. 먼저 최대 답글 깊이와 정렬 기준, 멘션 호출 제한 및 수정 시 재알림 여부, 공감/투표 종류와 취소 규칙, 하위 답글이 있는 댓글 삭제 시 자리 표시 정책을 질문하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 댓글·대댓글 계층 구조, 정렬 방식, 깊이 초과 시 화면 표현.\n2. @멘션 자동완성, 열람 권한·차단 검증, 신규/수정 댓글 알림 발송 조건.\n3. 공감·이모지·투표 토글 상태와 중복 클릭·취소 시 집계 처리.\n4. 하위 답글 유무에 따른 댓글 삭제·자리 표시(Tombstone) 전환과 복구 가능 여부.\n5. 댓글 목록·답글 작성·멘션 선택·반응 버튼·삭제 상태 화면과 디자인 선택 이유.\n예시 정책을 확정 요구사항으로 쓰지 말고, 디자인 데모와 실제 댓글 저장·알림·집계 시스템을 구분해 줘.',
    },
    en: {
      domain: 'Community',
      title: 'Nested comment threads, mentions, reactions and deleted placeholders',
      summary: 'Connect reply depth and sorting, @mention notification rules, reaction toggles and deleted-parent tombstones.',
      overview: 'As discussions grow, a community needs clear rules for how deep replies indent, when @mentions trigger notifications, how reactions or votes are counted, and what happens to child replies when a parent comment is deleted. The concepts below are design references for threaded discussions, not default sorting or voting policies.',
      concepts: [
        { name: 'Thread hierarchy depth and sort order', description: 'Decide between flat replies, two-level grouping or deep trees, and define how child replies stay attached when sorting by oldest, newest or top score.' },
        { name: 'Mention parsing and notification filtering', description: 'Resolve @username tokens separately from plain text, and suppress notifications for unauthorized viewers, blocked users or already-notified recipients on edit.' },
        { name: 'Reactions, upvotes and idempotent tallies', description: 'Define per-user toggle rules, self-voting restrictions and atomic score updates when users switch or remove reactions.' },
        { name: 'Deleted comment tombstones and child preservation', description: 'When a comment with existing replies is deleted, replace author and body with a deleted placeholder rather than orphaning or wiping child replies.' },
      ],
      workflow: [
        { name: 'Anchor reply inputs and preserve working copies', description: 'Clearly show which comment is being replied to and keep any unsaved working copy intact if the user collapses or switches rows.' },
        { name: 'Validate mentioned users before dispatching alerts', description: 'Extract valid mentions on save and notify only recipients who have access scope to read the thread.' },
        { name: 'Synchronize reaction toggles and counts', description: 'Prevent duplicate rapid clicks and update user reaction state and total counts consistently on add, change or removal.' },
        { name: 'Transition deleted comments based on reply state', description: 'Distinguish hard removal of leaf comments from tombstone replacement when child replies exist, and clear or hide stale reactions.' },
      ],
      pitfalls: [
        { name: 'Unbounded indentation that crushes mobile width', description: 'Indenting every reply level endlessly leaves narrow columns on phones. Cap visual indentation depth and provide thread continuation links.' },
        { name: 'Resending @mention alerts on every minor typo edit', description: 'Diff mentioned users between the previous and updated comment so only newly added mentions trigger notifications.' },
        { name: 'Silently deleting child replies when a parent comment is removed', description: 'Wiping an entire sub-thread deletes other members’ contributions. Use explicit tombstone rules when replies are present.' },
      ],
      questions: [
        'How many reply nesting levels are supported, and at what depth does visual indentation flatten on mobile?',
        'Which comment sort orders (chronological, newest, top score) exist, and how are child replies ordered under each?',
        'How many @mentions are allowed per comment, and are notifications sent only to newly added mentions when a comment is edited?',
        'Does the community use likes, multi-emoji reactions or upvotes/downvotes, and can authors react to their own comments?',
        'When a comment that has replies is deleted, is a placeholder kept and can new replies still be added under it?',
      ],
      example: 'Example: a forum could allow two visual nesting levels, attach deeper replies at level two with an @mention prefix, and replace deleted parent comments that have replies with a "[deleted]" placeholder while keeping child replies readable. This is a reference example, not an established policy.',
      relatedDesigns: [
        { id: 'character-budget-feedback', reason: 'A reference for showing remaining character count while composing a comment or reply. Real mention parsing and persistence need separate implementation.' },
        { id: 'inline-delete-confirmation', reason: 'A reference for confirming comment deletion before removing it or converting it into a placeholder. Real tombstone handling needs separate implementation.' },
      ],
      promptSnippet: 'Help design a community comment thread, @mention notification, reaction/voting and deleted-placeholder workflow. First ask about maximum reply depth and sort order, mention limits and edit re-notification rules, reaction or vote types and toggle behavior, and tombstone rules when deleting comments with replies. Do not assume undecided rules.\nBased on the answers, describe:\n1. Thread hierarchy, sorting behavior and mobile depth-flattening rules.\n2. @mention resolution, access-scope and block checks, and notification deduplication on edits.\n3. Reaction or vote toggle states, self-vote rules and idempotent tally updates.\n4. Hard deletion versus tombstone placeholder transitions when child replies exist.\n5. Comment list, inline reply composer, mention picker, reaction controls and deleted-placeholder UI with reasons for the design choices.\nDo not turn example policies into confirmed requirements, and distinguish design demos from real comment storage, notification and tally systems.',
    },
  },
  sources: [
    { title: 'GitHub Docs — Basic writing and formatting syntax (Mentions)', url: 'https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#mentioning-people-and-teams' },
    { title: 'Discourse Meta — Understanding deleted posts and tombstones', url: 'https://meta.discourse.org/t/how-do-deleted-posts-work/114005' },
  ],
}, {
  id: 'community-user-sanction-block-and-mute',
  aliases: {
    ko: ['사용자 차단과 뮤트', '계정 정지 제재 단계', '활동 제한 기간 만료', '커뮤니티 차단 목록 관리', '운영 경고와 이용 정지'],
    en: ['user block and mute', 'account suspension tiers', 'sanction expiration rules', 'blocked user filtering', 'moderation warning and ban'],
  },
  useCases: {
    ko: ['사용자가 특정 상대를 직접 차단(Block)하거나 뮤트(Mute)할 때', '차단된 상대의 게시글·댓글·멘션·알림 노출 방식을 정할 때', '운영 경고·작성 제한·기간 정지·영구 정지 단계를 구분할 때', '제재 만료 시 자동 해제와 제재 사유·남은 기간 안내를 설계할 때'],
    en: ['Allowing users to block or mute other accounts personally', 'Defining how posts, comments, mentions and alerts behave between blocked users', 'Separating moderation warnings, posting restrictions, temporary suspensions and permanent bans', 'Designing automatic sanction expiration and clear restriction notices'],
  },
  keywords: {
    ko: ['차단', '뮤트', '이용 정지', '활동 제한', '운영 제재', '경고', '작성 금지', '제재 만료', '차단 해제'],
    en: ['block', 'mute', 'sanction', 'suspension', 'posting restriction', 'warning', 'temporary ban', 'sanction expiry', 'unblock'],
  },
  text: {
    ko: {
      domain: '커뮤니티',
      title: '사용자 차단·뮤트와 운영 제재 단계·만료 해제',
      summary: '개인 간 차단·뮤트와 운영자의 계정 제재 단계를 구분하고, 노출 차단 범위와 만료 시 자동 해제를 연결합니다.',
      overview: '커뮤니티에서는 사용자가 스스로 불편한 상대를 가리는 기능(차단·뮤트)과 운영자가 규칙 위반 계정에 부과하는 제재(경고·작성 제한·정지)가 함께 동작합니다. 두 기능을 섞어 다루거나 제재 만료 시각을 수동 해제에만 의존하면, 차단한 상대에게 여전히 호출 알림이 오거나 정지 기간이 끝났는데도 글을 쓰지 못하는 문제가 생깁니다. 아래 내용은 차단 및 운영 제재 설계를 위한 참고이며 특정 서비스의 제재 수위를 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '개인 뮤트(Mute)와 차단(Block)의 차이', description: '뮤트는 내 화면에서만 상대 글을 접거나 숨기는 단방향 조치이고, 차단은 내 피드 숨김에 더해 상대의 멘션·답글·메시지 도달까지 막는 양방향 또는 상호 제한 조치입니다.' },
        { name: '운영 제재 단계와 제한 행동', description: '주의 경고, 댓글·글 작성 제한(읽기만 허용), 한시적 접속 정지, 영구 이용 정지처럼 단계별로 허용되는 열람 범위와 차단 행동을 분리합니다.' },
        { name: '제재 기간 계산과 만료 해제', description: '기간제 정지는 시작 시각과 만료 시각을 명확히 기록해 만료 도래 시 별도 수동 작업 없이도 작성 권한이 복원되도록 정의합니다.' },
        { name: '제재 안내와 소명·재검토 요청', description: '제재 대상 사용자에게 적용된 조치 종류, 사유 요약, 만료 일시와 소명 문의를 제출할 수 있는 공식 경로를 안내합니다.' },
      ],
      workflow: [
        { name: '차단·뮤트 적용 범위 선택하고 목록 관리하기', description: '차단 또는 뮤트 실행 시 무엇이 가려지고 어떤 상호작용이 막히는지 알리고, 설정 화면에서 언제든 해제할 수 있게 합니다.' },
        { name: '피드·댓글·알림에서 차단 관계 걸러내기', description: '차단한 상대의 글·댓글 자리 표시 여부와 멘션·답글 알림 차단 규칙을 목록·상세·검색·알림에 일관되게 적용합니다.' },
        { name: '위반 수준에 맞는 운영 제재 부과하기', description: '운영자가 경고·작성 제한·기간 정지 중 조치를 선택하고 적용 기간과 안내 사유를 함께 기록합니다.' },
        { name: '제재 상태 표시와 만료 후 권한 복원하기', description: '제재 중인 사용자에게 남은 기간과 제한된 행동을 표시하고, 만료 시각이 지나면 정상 상태로 전환합니다.' },
      ],
      pitfalls: [
        { name: '피드 목록에서만 가리고 알림·멘션은 그대로 보내기', description: '차단한 상대가 나를 @멘션하거나 내 글에 답글을 달 때 알림이 그대로 오면 차단 기능이 무의미해집니다.' },
        { name: '작성 제한 계정을 아예 로그인 차단과 같게 처리하기', description: '일정 기간 글쓰기만 제한된 사용자도 기존 본인 글 확인이나 제재 사유 확인은 가능해야 하는지 먼저 구분하세요.' },
        { name: '기간제 제재를 배치 누락으로 만료 후에도 방치하기', description: '만료 시각이 지났는데 상태 플래그가 갱신되지 않아 정지가 풀리지 않는 일이 없도록 만료 시각 기준 검증을 함께 두세요.' },
      ],
      questions: [
        '개인 차단(Block)과 뮤트(Mute)를 모두 제공하나요, 각 조치는 게시글·댓글·멘션·알림을 어디까지 막나요?',
        '내가 차단한 상대가 내 글에 댓글을 달거나 내 글을 볼 수 있나요, 아니면 양쪽 모두에게 숨기나요?',
        '운영 제재 단계(경고·작성 제한·기간 정지·영구 정지)별로 읽기·작성·반응 중 무엇이 제한되나요?',
        '기간 정지의 만료 시각이 지나면 자동으로 해제되나요, 운영자 확인이 필요한 경우가 있나요?',
        '제재를 받은 사용자에게 어떤 사유와 만료 일시를 보여 주며, 재검토 문의는 어떤 경로로 받나요?',
      ],
      example: '예시: 사용자가 특정 계정을 뮤트하면 목록에서 접힘 표시로 바뀌고, 차단하면 서로의 글에 답글과 @멘션을 보낼 수 없으며, 운영자가 7일 작성 제한을 부과하면 열람은 유지하되 글·댓글 작성 버튼 대신 남은 기간과 재검토 문의 안내를 보여 주도록 구성할 수 있습니다. 이는 참고 예시이며 실제 차단·제재 규칙은 별도로 확정해야 합니다.',
      relatedDesigns: [
        { id: 'dismissible-inline-banner', reason: '작성 제한 중인 사용자에게 제재 사유와 해제 예정 일시를 화면 상단에 안내하는 표현에 참고할 수 있습니다. 실제 권한 차단이나 만료 계산은 별도로 구현해야 합니다.' },
        { id: 'ly-sortable-data-table', reason: '차단 목록이나 운영 제재 대상자 목록을 제재 상태·만료일 기준으로 정렬해 관리하는 화면에 참고할 수 있습니다. 실제 제재 집행은 포함하지 않습니다.' },
      ],
      promptSnippet: '커뮤니티의 개인 차단·뮤트와 운영 제재 단계·만료 해제 흐름을 설계해 줘. 먼저 뮤트와 차단의 노출·상호작용 차단 범위, 양방향 숨김 여부, 운영 제재 단계별 허용/제한 행동, 기간 정지 만료 처리, 제재 사유 안내 및 재검토 문의 경로를 질문하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 개인 뮤트·차단 시 목록·댓글·검색·멘션·알림에서 달라지는 동작.\n2. 경고·작성 제한·기간 정지·영구 정지 단계별 열람 범위와 차단되는 행동.\n3. 기간제 제재의 시작·만료 시각 관리와 만료 후 자동 해제 규칙.\n4. 차단 직후 진행 중이던 답글 요청이나 제재 만료 경계 시점 요청의 처리 방식.\n5. 차단/뮤트 관리 설정·제재 안내 배너·운영자 제재 부여 화면과 디자인 선택 이유.\n예시 정책을 확정 요구사항으로 쓰지 말고, 디자인 데모와 실제 권한 제어·제재 집행 시스템을 구분해 줘.',
    },
    en: {
      domain: 'Community',
      title: 'User blocking, muting, sanction tiers and expiration',
      summary: 'Distinguish personal mute/block controls from moderator sanction tiers, and connect exposure filtering with automatic expiration.',
      overview: 'Communities combine personal safety controls (blocking and muting other accounts) with moderator-enforced sanctions (warnings, posting restrictions, temporary suspensions and permanent bans). Mixing these layers or relying on manual cleanup for timed suspensions causes leaked notifications from blocked users or accounts stuck in suspension after their timer ends. The concepts below are design references, not default enforcement policies.',
      concepts: [
        { name: 'Personal mute versus block semantics', description: 'Separate muting (quietly hiding or collapsing another user’s content from your own feed) from blocking (also preventing mentions, direct replies or interaction between the two accounts).' },
        { name: 'Moderation sanction tiers and restricted actions', description: 'Define distinct tiers such as formal warnings, read-only posting restrictions, timed suspensions and permanent bans, specifying which actions each tier blocks.' },
        { name: 'Timed sanction duration and automatic expiry', description: 'Store explicit start and end timestamps for temporary restrictions so privileges restore accurately when the window expires.' },
        { name: 'Sanction notice and review request path', description: 'Show restricted users the active sanction tier, rule summary, expiration timestamp and any supported channel to request a moderation review.' },
      ],
      workflow: [
        { name: 'Explain block or mute scope and manage lists', description: 'Clarify what muting versus blocking changes before confirmation, and provide a settings list to review or unblock accounts.' },
        { name: 'Filter feeds, threads and alerts by block rules', description: 'Apply block and mute rules consistently across post lists, comment threads, search results and @mention or reply notifications.' },
        { name: 'Apply graduated moderation sanctions', description: 'Let moderators select the sanction tier, duration and reason summary while recording an audit entry.' },
        { name: 'Surface active restrictions and restore on expiry', description: 'Display remaining restriction time in place of blocked actions and lift timed restrictions automatically once the end timestamp passes.' },
      ],
      pitfalls: [
        { name: 'Hiding blocked users in feeds while still delivering their mention alerts', description: 'If a blocked account can still trigger @mention or reply notifications, the block fails at its primary job. Enforce block checks in the notification pipeline.' },
        { name: 'Treating a temporary posting restriction as a full login lockout', description: 'Decide whether read-only restricted users can still sign in to read discussions, view their own history and check when the restriction ends.' },
        { name: 'Leaving timed suspensions active after the end timestamp passes', description: 'Evaluate expiration timestamps at request time as well as background jobs so users are not stranded by a delayed cron task.' },
      ],
      questions: [
        'Are both mute and block supported, and how does each affect posts, comments, @mentions and notifications?',
        'Does blocking hide content only from the blocker, or also prevent the blocked user from viewing or replying to the blocker’s posts?',
        'Which moderation sanction tiers exist, and which read, post, comment or reaction actions does each tier restrict?',
        'Do timed restrictions lift automatically when the expiration timestamp passes, or do any tiers require manual moderator release?',
        'What reason summary, remaining time and review-request contact path are shown to a restricted user?',
      ],
      example: 'Example: muting an account could collapse its comments in threads, blocking could hide posts both ways and block replies or @mentions between the two users, and a 7-day moderator posting restriction could keep the forum readable while replacing compose buttons with the expiration date and review request link. This is a reference example, not an established policy.',
      relatedDesigns: [
        { id: 'dismissible-inline-banner', reason: 'A reference for showing a restricted user the active sanction reason and expiration time at the top of the page. Real permission enforcement and expiry logic need separate implementation.' },
        { id: 'ly-sortable-data-table', reason: 'A reference for sorting and reviewing blocked accounts or active moderator sanctions by status and expiration date. Real enforcement actions are not included.' },
      ],
      promptSnippet: 'Help design user blocking/muting and moderation sanction tiers with expiration. First ask about mute versus block behavior across feeds/threads/alerts, one-way versus two-way hiding, moderation sanction tiers and restricted actions, timed suspension expiry rules, and user notices or review request paths. Do not assume undecided rules.\nBased on the answers, describe:\n1. Behavior of muted and blocked accounts across post lists, comment threads, search, @mentions and notifications.\n2. Access scope and blocked actions for warnings, read-only restrictions, timed suspensions and permanent bans.\n3. Start/end timestamp handling and automatic restoration when timed sanctions expire.\n4. Handling of in-flight reply submissions right when a block or sanction is applied or expires.\n5. Block/mute management settings, restriction notice banners and moderator sanction screens with reasons for the design choices.\nDo not turn example policies into confirmed requirements, and distinguish design demos from real permission and sanction enforcement.',
    },
  },
  sources: [
    { title: 'Discourse Meta — Understanding user trust levels and moderation flags', url: 'https://blog.discourse.org/2018/06/understanding-discourse-trust-levels/' },
    { title: 'GitHub Docs — Blocking a user from your personal account', url: 'https://docs.github.com/en/communities/maintaining-your-safety-on-github/blocking-a-user-from-your-personal-account' },
  ],
}, {
  id: 'community-topic-tag-pin-and-best-answer',
  aliases: {
    ko: ['말머리와 태그 분류', '상단 고정 공지글', '질문글 답변 채택', '해결됨 상태 게시판', '커뮤니티 공지 배너'],
    en: ['topic tags and categories', 'pinned notice posts', 'accepted best answer', 'solved question thread', 'forum pin expiration'],
  },
  useCases: {
    ko: ['게시판 카테고리·필수 말머리·자유 태그로 글을 분류할 때', '전체 공지나 게시판별 상단 고정글(Pin) 노출 개수와 만료를 정할 때', '질문·답변(Q&A) 게시판에서 미해결·해결됨과 채택 답변을 다룰 때', '답변 채택 권한·채택 변경·보상 포인트 연결 규칙을 설계할 때'],
    en: ['Classifying posts with boards, required prefixes and topic tags', 'Managing global or category-pinned announcements and pin expiration', 'Handling unsolved/solved states and accepted answers in Q&A boards', 'Designing answer acceptance permissions, re-selection rules and reward points'],
  },
  keywords: {
    ko: ['말머리', '태그', '분류', '상단 고정', '공지글', '질문 게시판', '답변 채택', '베스트 답변', '해결됨'],
    en: ['topic tag', 'category prefix', 'pinned post', 'announcement', 'Q&A board', 'accepted answer', 'best answer', 'solved state', 'tag filter'],
  },
  text: {
    ko: {
      domain: '커뮤니티',
      title: '말머리·태그 분류·상단 고정 공지와 질문글 답변 채택',
      summary: '말머리·태그 분류와 상단 고정 공지의 노출 규칙을 정하고, 질문글의 답변 채택과 해결 상태를 연결합니다.',
      overview: '커뮤니티에 글이 쌓이면 원하는 주제를 좁혀 보는 말머리·태그 체계와, 꼭 읽어야 할 공지를 상단에 고정하는 규칙, 질문글에서 검증된 답변을 맨 위에 올려 주는 채택 흐름이 필요합니다. 고정글이 화면을 가득 채우거나 채택된 답변이 임의로 삭제·변경되면 탐색 경험과 신뢰가 무너집니다. 아래 내용은 분류·고정·답변 채택 설계를 위한 참고이며 특정 게시판의 보상 정책을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '단일 말머리(Prefix)와 다중 태그(Tag)', description: '글의 성격을 하나로 정하는 필수 말머리(질문·정보·후기 등)와 세부 주제를 여러 개 붙이는 태그를 구분하고, 신규 태그 생성 권한과 별칭 통합 규칙을 정합니다.' },
        { name: '상단 고정(Pin) 범위와 만료', description: '전체 게시판 고정과 특정 카테고리 내 고정을 나누고, 최대 고정 개수·정렬 순서·고정 만료 일시 또는 사용자가 접어 두는 동작을 정의합니다.' },
        { name: '질문글 해결 상태와 답변 채택(Accepted Answer)', description: '일반 토론글과 질문글을 구분하고, 질문글에는 미해결·해결됨 상태와 질문 본문 바로 아래에 요약 노출되는 채택 답변 슬롯을 연결합니다.' },
        { name: '채택 권한·변경 제한과 채택 답변 보호', description: '질문 작성자 본인 채택 외에 운영자 대리 채택을 허용할지, 이미 채택된 답변의 수정·삭제나 채택 변경을 어디까지 허용할지 정합니다.' },
      ],
      workflow: [
        { name: '글 작성 시 말머리와 태그 검증하기', description: '게시판 성격에 따라 필수 말머리 선택과 허용 태그 개수를 확인하고, 질문 말머리 선택 시 채택 기능이 켜짐을 안내합니다.' },
        { name: '상단 고정 공지와 일반 목록 배치하기', description: '고정글이 첫 페이지 상단을 과도하게 덮지 않도록 고정 범위·만료일을 적용하고, 페이지 이동 시 노출 방식을 일관되게 맞춥니다.' },
        { name: '답변 채택과 해결됨 상태 연결하기', description: '질문 작성자가 도움이 된 답변을 채택하면 질문 상태를 해결됨으로 바꾸고, 채택 답변을 본문 직후나 상단에 강조해 보여 줍니다.' },
        { name: '채택 후 수정·삭제·채택 변경 처리하기', description: '보상이 걸린 질문글이나 채택된 답변은 임의 삭제를 제한하거나 채택 취소·변경 가능 조건을 명확히 적용합니다.' },
      ],
      pitfalls: [
        { name: '상단 고정글을 제한 없이 쌓아 첫 화면의 새 글을 밀어내기', description: '고정 공지가 10개씩 쌓이면 모바일에서는 스크롤을 한참 내려야 새 글이 보입니다. 최대 고정 수와 만료일을 함께 두세요.' },
        { name: '자유 태그 오타와 대소문자 차이로 같은 주제를 쪼개기', description: '자동완성과 정규화 없이 자유 입력만 받으면 같은 주제가 여러 태그로 흩어집니다. 추천 태그와 정규화 규칙을 적용하세요.' },
        { name: '답변을 채택받은 뒤 내용을 지우거나 질문글 자체를 삭제하게 두기', description: '해결된 질문과 채택 답변은 이후 검색 유입자의 핵심 자료입니다. 답변이 달린 질문글과 채택 답변의 삭제·수정 제한을 먼저 정하세요.' },
      ],
      questions: [
        '게시글 분류에 필수 말머리와 다중 태그 중 무엇을 쓰며, 새 태그는 누구나 만들 수 있나요?',
        '상단 고정글은 전체 고정과 게시판별 고정을 구분하나요? 최대 고정 개수와 자동 해제 일시를 두나요?',
        '질문글에서 답변 채택은 질문 작성자만 할 수 있나요, 장기간 미채택 시 운영자 채택도 허용하나요?',
        '채택된 답변을 나중에 다른 답변으로 바꾸거나 채택을 취소할 수 있나요? 포인트 보상이 있다면 어떻게 정산하나요?',
        '답변이 달리거나 채택이 완료된 질문글·채택 답변은 작성자가 직접 수정·삭제할 수 있나요?',
      ],
      example: '예시: Q&A 게시판에서 질문 말머리로 작성된 글은 답변 1개를 채택할 수 있고, 채택 즉시 해결됨 배지와 함께 해당 답변이 본문 바로 아래에도 상단 노출되며, 채택된 답변과 질문글은 작성자 임의 삭제를 막고 상단 공지는 최대 3개까지만 고정하도록 구성할 수 있습니다. 이는 참고 예시이며 실제 운영 규칙은 별도로 확정해야 합니다.',
      relatedDesigns: [
        { id: 'faceted-filter-chips', reason: '말머리·태그·해결 여부(미해결/해결됨) 조건을 조합해 게시글 목록을 좁혀 보는 표현에 참고할 수 있습니다. 실제 태그 집계와 검색은 별도로 구현해야 합니다.' },
        { id: 'sticky-announcement-banner', reason: '게시판 상단 고정 공지를 일반 글 목록 위쪽에 구분해 표시하는 표현에 참고할 수 있습니다. 실제 고정 만료나 권한 제어는 포함하지 않습니다.' },
      ],
      promptSnippet: '커뮤니티의 말머리·태그 분류, 상단 고정 공지 및 질문글 답변 채택 흐름을 설계해 줘. 먼저 필수 말머리와 태그 생성·정규화 규칙, 상단 고정 범위·최대 개수·만료 조건, 질문글 답변 채택 권한과 변경 허용 여부, 채택된 질문·답변의 수정·삭제 제한을 질문하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 말머리·태그 구조, 입력 검증 및 목록 필터링 규칙.\n2. 전체/카테고리 상단 고정글의 노출 순서, 최대 개수, 만료 해제 동작.\n3. 질문글의 미해결·해결됨 상태와 채택 답변 상단 강조 노출 방식.\n4. 채택 변경·포인트 정산·채택 후 질문/답변 삭제 시도 시 제한과 안내.\n5. 글 작성 분류 선택·상단 고정 목록·질문 상세 및 답변 채택 UI와 디자인 선택 이유.\n예시 정책을 확정 요구사항으로 쓰지 말고, 디자인 데모와 실제 분류·고정·채택 저장 시스템을 구분해 줘.',
    },
    en: {
      domain: 'Community',
      title: 'Topic tags, pinned notices and accepted answers',
      summary: 'Connect category prefixes and topic tags with bounded pinned notices and Q&A accepted-answer workflows.',
      overview: 'As a community accumulates posts, members rely on prefixes and tags to filter topics, pinned notices to see critical announcements, and accepted answers in Q&A threads to spot verified solutions without reading dozens of replies. Unbounded pins bury new discussions, and unrestricted edits or deletions after answer acceptance break shared knowledge. The concepts below are design references, not default forum rules.',
      concepts: [
        { name: 'Required prefixes versus multi-tag taxonomy', description: 'Distinguish a single required post prefix (such as Question, Guide or Showcase) from multiple topic tags, and define who can create new tags and how synonyms are normalized.' },
        { name: 'Pin scope, limits and expiration', description: 'Separate global pins from category-level pins, and define maximum pin counts, display order, expiration dates and whether users can unpin or dismiss them.' },
        { name: 'Question solved state and accepted answer slot', description: 'Give Q&A threads an explicit unsolved/solved state and surface the accepted answer directly below the question while keeping its chronological place.' },
        { name: 'Acceptance permissions, changes and content lock', description: 'Clarify whether only the question author or also moderators can mark an accepted answer, whether acceptance can be switched, and how accepted posts are protected from deletion.' },
      ],
      workflow: [
        { name: 'Validate prefixes and tags during composition', description: 'Check required prefix selection and tag count limits before publishing, and indicate when a prefix enables Q&A answer acceptance.' },
        { name: 'Balance pinned announcements above organic posts', description: 'Apply pin scope, count caps and expiration timestamps so pinned notices do not push all fresh discussions off the first screen.' },
        { name: 'Mark an accepted answer and update solved status', description: 'When the author selects a solution, transition the thread to solved and highlight or pin the accepted answer at the top of replies.' },
        { name: 'Guard accepted threads against destructive edits', description: 'Enforce agreed rules when users try to switch the accepted answer, claim bounties or delete a question or reply after acceptance.' },
      ],
      pitfalls: [
        { name: 'Stacking unlimited pinned posts at the top of mobile lists', description: 'Ten pinned announcements force mobile readers to scroll past a full screen before seeing any new post. Cap active pins and set expiry dates.' },
        { name: 'Allowing unnormalized free-form tags to fragment topics', description: 'Without case normalization and autocomplete suggestions, variations split the same topic across multiple tags.' },
        { name: 'Letting authors delete questions or accepted answers freely after resolution', description: 'Deleting a solved question or its accepted reply destroys the thread for future readers and breaks any attached reward points.' },
      ],
      questions: [
        'Does the board use a required single prefix, multiple tags or both, and who is allowed to create new tags?',
        'Are pinned posts scoped globally or per category, what is the maximum pin count, and do pins expire automatically?',
        'Who can mark an answer as accepted—only the question author, or also moderators after an inactivity window?',
        'Can the accepted answer be changed or unaccepted later, and how does that affect any awarded points or bounties?',
        'Once a question has replies or an accepted answer, can the question or accepted reply still be edited or deleted by its author?',
      ],
      example: 'Example: a Q&A board could require a prefix, allow up to 5 normalized tags, cap category pins at 3 with optional expiration dates, let question authors accept one answer to mark the thread solved and surface that answer below the question, and prevent authors from deleting solved questions or accepted answers. This is a reference example, not an established policy.',
      relatedDesigns: [
        { id: 'faceted-filter-chips', reason: 'A reference for combining prefix, tag and solved/unsolved filter chips above a topic list. Real tag indexing and query filtering need separate implementation.' },
        { id: 'sticky-announcement-banner', reason: 'A reference for separating a pinned community announcement from regular discussion rows. Real pin expiration and permissions are not included.' },
      ],
      promptSnippet: 'Help design community topic tags, pinned notices and Q&A accepted answers. First ask about prefix and tag creation/normalization rules, pin scope/count limits/expiration, who can accept or switch an answer, bounty or point rules, and edit/delete restrictions on solved threads. Do not assume undecided rules.\nBased on the answers, describe:\n1. Prefix and tag taxonomy, validation rules and list filtering behavior.\n2. Global versus category pin ordering, maximum counts and expiration handling.\n3. Unsolved/solved question states and how the accepted answer is surfaced in the thread.\n4. Rules for switching accepted answers, adjusting points and blocking destructive deletes on solved posts.\n5. Tag picker, pinned notice rows, question detail and accepted-answer highlight UI with reasons for the design choices.\nDo not turn example policies into confirmed requirements, and distinguish design demos from real tagging, pinning and Q&A persistence systems.',
    },
  },
  sources: [
    { title: 'Discourse Solved Plugin — Allow accepted answers on topics', url: 'https://meta.discourse.org/t/discourse-solved/30155' },
    { title: 'GitHub Docs — Pinning a discussion to your repository', url: 'https://docs.github.com/en/discussions/managing-discussions-for-your-community/Managing-discussions#pinning-a-discussion' },
  ],
}, {
  id: 'community-anonymous-board-and-nickname-policy',
  aliases: {
    ko: ['익명 게시판 설계', '게시글별 임시 별명 고정', '익명 글쓴이 표시', '닉네임 변경 이력과 쿨다운', '익명 작성자 본인 확인'],
    en: ['anonymous discussion board', 'thread-local pseudonyms', 'anonymous author badge', 'nickname change cooldown', 'author identity separation'],
  },
  useCases: {
    ko: ['실명·기본 닉네임 대신 익명으로 글을 쓰는 게시판을 만들 때', '한 게시글 안에서 댓글 작성자마다 익명1·익명2 임시 번호를 고정할 때', '익명 글 작성자가 댓글에서도 원글 작성자(글쓴이)임을 표시할 때', '닉네임 변경 주기와 작성자 본인 수정·삭제 및 운영자 제재 연결을 설계할 때'],
    en: ['Building an anonymous board or allowing per-post anonymous mode', 'Assigning consistent thread-local pseudonyms (such as Anon 1, Anon 2) within a post', 'Distinguishing the original poster (OP) when replying anonymously in their own thread', 'Designing nickname change cooldowns and separating public anonymity from author self-service and moderation'],
  },
  keywords: {
    ko: ['익명 게시판', '익명 댓글', '임시 별명', '글쓴이 표시', '닉네임 정책', '별명 변경 주기', '작성자 분리', '중복 별명 방지'],
    en: ['anonymous board', 'pseudonym', 'thread-local ID', 'original poster badge', 'nickname policy', 'rename cooldown', 'identity separation', 'reserved handle'],
  },
  text: {
    ko: {
      domain: '커뮤니티',
      title: '익명 게시판·임시 별명 고정·작성자 본인 확인과 열람 분리',
      summary: '외부 노출에서 작성자 신원을 가리고 게시글 내 임시 번호·글쓴이 표시와 본인 수정·운영 제재를 연결합니다.',
      overview: '익명 게시판에서 모든 사람을 똑같은 "익명"으로만 표시하면 한 스레드 안에서 한 사람이 여러 명인 것처럼 댓글을 달거나 대화 상대를 구분할 수 없게 됩니다. 반대로 화면에서만 이름을 가리고 응답 데이터에 원래 계정 식별자를 내려보내면 익명성이 즉시 깨집니다. 아래 내용은 익명 게시판과 별명 정책 설계를 위한 참고이며 특정 서비스의 신원 보관 규칙을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '게시글 단위 임시 별명(Thread-local Pseudonym)', description: '한 게시글 안에서 첫 댓글 작성 순서대로 익명1, 익명2 같은 임시 별명을 부여해 같은 게시글 안에서는 동일인임을 구분하고, 다른 게시글에서는 번호가 이어지지 않게 분리합니다.' },
        { name: '원글 작성자(글쓴이) 배지와 사칭 방지', description: '익명 게시글 작성자가 본인 글에 댓글을 달 때는 별도 번호 대신 "익명(글쓴이)"처럼 원글 작성자임을 자동으로 표시해 제3자의 글쓴이 사칭을 막습니다.' },
        { name: '외부 노출 익명성과 내부 본인 권한 분리', description: '다른 사용자에게 내려가는 화면·응답에는 계정 ID나 프로필을 절대 포함하지 않으면서, 본인 글 수정·삭제 여부와 중복 추천 방지, 운영 제재는 내부 매핑으로 처리합니다.' },
        { name: '일반 닉네임 규칙과 변경 제한(Cooldown)', description: '기명 게시판의 경우 금칙어·운영자 사칭 예약어·중복 허용 여부와 닉네임 변경 후 재변경 제한 기간을 정의합니다.' },
      ],
      workflow: [
        { name: '게시판 성격과 기명·익명 모드 확인하기', description: '익명 전용 게시판인지 작성 시 익명 선택이 가능한지 명확히 표시하고, 등록 전에 현재 작성 모드를 보여 줍니다.' },
        { name: '게시글별 임시 별명과 글쓴이 배지 부여하기', description: '댓글 등록 시 해당 게시글에서 이미 부여받은 임시 번호가 있으면 재사용하고, 원글 작성자라면 글쓴이 배지를 붙입니다.' },
        { name: '열람 응답에서 계정 정보 제거하고 본인 행동 연결하기', description: '조회 데이터에서는 작성자 계정 식별자를 제외하고 `isMine` 같은 최소 권한 정보만 내려 본인 수정·삭제 버튼을 표시합니다.' },
        { name: '신고·차단 및 닉네임 변경 규칙 적용하기', description: '익명 상대에 대한 신고·차단이 내부적으로 동작하게 연결하고, 기명 닉네임 변경 시에는 중복·예약어·변경 주기를 검증합니다.' },
      ],
      pitfalls: [
        { name: '화면만 익명으로 그리고 API 응답에 작성자 ID를 그대로 내려보내기', description: '브라우저 개발자 도구에서 작성자 계정 번호나 프로필 경로가 보이면 익명성이 완전히 깨집니다. 서버 응답 단계에서 식별자를 제거하세요.' },
        { name: '모든 게시글에서 같은 익명 해시값을 고정해 작성자를 추적하게 만들기', description: '게시글마다 다른 솔트(Salt)나 게시글별 순번을 쓰지 않고 사이트 전체에서 같은 임시 ID를 쓰면 활동 내역을 엮어 신원을 특정할 수 있습니다.' },
        { name: '기명 댓글을 수정해 익명으로 바꾸거나 그 반대로 전환하게 두기', description: '이미 멘션이나 답글로 닉네임이 노출된 뒤 익명으로 바꾸면 대화 기록과 노출 상태가 어긋납니다. 작성 후 익명 전환 허용 여부를 먼저 정하세요.' },
      ],
      questions: [
        '익명 기능은 익명 전용 게시판에서만 동작하나요, 일반 게시판에서도 글·댓글마다 익명 체크를 허용하나요?',
        '한 게시글 안에서 댓글 작성자를 익명1·익명2처럼 구분하나요, 그리고 원글 작성자 댓글에는 글쓴이 배지를 붙이나요?',
        '익명 글·댓글도 작성자 본인이 수정·삭제할 수 있나요, 그리고 익명 사용자를 개인 차단하면 다른 글에서도 차단되나요?',
        '법령 위반이나 심각한 규정 위반 신고 시 운영자도 작성자 계정을 볼 수 없나요, 제한된 절차로 제재만 부과하나요?',
        '기명 닉네임은 중복을 허용하나요, 변경 주기와 사칭 방지 예약어(운영자·관리자 등) 규칙은 무엇인가요?',
      ],
      example: '예시: 익명 게시판에서는 모든 글을 익명으로만 작성하고, 댓글은 해당 글 안에서 등장 순서대로 익명1, 익명2를 고정 부여하며 원글 작성자는 "익명(글쓴이)"로 표시하되, 조회 응답에는 계정 ID 대신 본인 여부 플래그만 내려 수정·삭제를 허용하도록 구성할 수 있습니다. 이는 참고 예시이며 실제 익명 보관·제재 정책은 별도로 확정해야 합니다.',
      relatedDesigns: [
        { id: 'inline-edit-field', reason: '프로필 설정에서 닉네임 중복·금칙어·변경 가능 주기를 확인하며 별명을 수정하는 표현에 참고할 수 있습니다. 실제 예약어 검증과 변경 이력 관리는 별도로 구현해야 합니다.' },
        { id: 'inline-delete-confirmation', reason: '익명 글·댓글을 본인 권한으로 삭제할 때 재확인하는 표현에 참고할 수 있습니다. 실제 작성자 본인 검증과 익명 응답 분리는 포함하지 않습니다.' },
      ],
      promptSnippet: '커뮤니티의 익명 게시판·임시 별명 고정·작성자 본인 확인 및 닉네임 정책을 설계해 줘. 먼저 익명 전용 vs 선택형 여부, 게시글 내 임시 번호(익명1·익명2) 및 원글 작성자(글쓴이) 표시 규칙, 조회 응답의 계정 식별자 분리 방식, 익명 신고·차단 처리, 기명 닉네임 중복·예약어·변경 주기 정책을 질문하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 기명·익명 작성 모드와 작성 후 모드 변경 불가 규칙.\n2. 게시글 단위 임시 별명 부여·유지 방식과 원글 작성자(글쓴이) 배지 처리.\n3. 열람자 응답에서 제거할 식별 정보와 본인 수정·삭제·중복 투표 방지를 위한 권한 확인 구조.\n4. 익명 사용자에 대한 신고·운영 제재·개인 차단 연결 방식과 기명 닉네임 변경 제한.\n5. 익명 작성 토글·댓글 임시 별명 배지·닉네임 변경 화면과 디자인 선택 이유.\n클라이언트 화면에서만 이름을 가리는 방식을 쓰지 말고, 디자인 데모와 실제 익명 식별자 분리·권한 검증 시스템을 구분해 줘.',
    },
    en: {
      domain: 'Community',
      title: 'Anonymous boards, thread-local pseudonyms and author identity separation',
      summary: 'Strip author identity from public responses while preserving thread-local pseudonyms, OP badges, author self-service and moderation.',
      overview: 'On an anonymous board, labeling every comment with an identical "Anonymous" string makes multi-person conversations impossible to follow and lets one person impersonate a crowd. Conversely, hiding the username only in CSS while returning raw user IDs in API payloads breaks anonymity immediately. The concepts below are design references for anonymous boards and nickname policies, not default data-retention rules.',
      concepts: [
        { name: 'Thread-local pseudonyms', description: 'Assign sequential per-thread handles (such as Anon 1, Anon 2) so replies by the same person match within one post without linking their identity across different posts.' },
        { name: 'Original poster (OP) badge and anti-spoofing', description: 'Automatically label the post author’s own anonymous comments as the original poster so commenters cannot impersonate the thread starter.' },
        { name: 'Separation of public response and internal ownership', description: 'Omit account IDs, avatars and profile links from read payloads while still computing a boolean ownership flag for self-edits, deletions, blocks and moderation.' },
        { name: 'Nickname rules, reserved words and rename cooldowns', description: 'For named boards, define uniqueness, reserved moderator/system terms and cooldown intervals between nickname changes.' },
      ],
      workflow: [
        { name: 'Clarify anonymous versus named posting mode', description: 'Show clearly before submission whether the board is strictly anonymous or uses an explicit per-post anonymous toggle.' },
        { name: 'Assign per-thread handles and OP badges', description: 'Reuse an existing thread-local handle when the same user comments again on that post, or mark them as OP if they created the post.' },
        { name: 'Sanitize read payloads while preserving author actions', description: 'Strip account identifiers from public responses and pass only the caller’s allowed action flags (`canEdit`, `canDelete`).' },
        { name: 'Connect anonymous moderation, blocks and handle rules', description: 'Route reports, sanctions and personal blocks through internal server mappings without revealing the underlying account to other members.' },
      ],
      pitfalls: [
        { name: 'Masking names in UI while leaking user IDs in network responses', description: 'Anyone inspecting network payloads can deanonymize authors if raw user IDs or profile URLs are returned. Sanitize payloads on the server.' },
        { name: 'Reusing one global anonymous hash across every thread', description: 'A static site-wide pseudonym lets readers correlate every post a user makes across the forum. Rotate identifiers per thread.' },
        { name: 'Allowing posts or comments to switch between named and anonymous after publishing', description: 'Toggling anonymity after replies or @mentions exist leaks identity through quoted history. Lock the anonymity mode once published.' },
      ],
      questions: [
        'Is anonymity enforced for the entire board, or can authors toggle anonymous mode per post or comment?',
        'Do comments within a thread receive sequential pseudonyms (Anon 1, Anon 2) and an automatic OP badge for the post author?',
        'Can anonymous authors still edit or delete their own posts, and does blocking an anonymous commenter apply across other threads?',
        'How are reports and sanctions handled on anonymous posts without exposing the author’s account to regular members or moderators?',
        'For regular nicknames, are duplicates blocked, which terms are reserved, and how long is the cooldown between nickname changes?',
      ],
      example: 'Example: an anonymous board could lock all posts to anonymous mode, assign "Anon (OP)" to the thread author and "Anon 1", "Anon 2" to commenters in order of first reply within that thread, strip user IDs from API responses while returning `isOwner` for self-deletion, and enforce a 30-day cooldown on regular profile nickname changes. This is a reference example, not an established policy.',
      relatedDesigns: [
        { id: 'inline-edit-field', reason: 'A reference for editing a profile nickname with inline validation for reserved words and cooldown notices. Real handle uniqueness and cooldown checks need separate implementation.' },
        { id: 'inline-delete-confirmation', reason: 'A reference for confirming deletion of an anonymous post or comment by its owner. Real identity separation and ownership verification are not included.' },
      ],
      promptSnippet: 'Help design an anonymous community board, thread-local pseudonyms, author identity separation and nickname policy. First ask about board-wide versus toggle anonymity, per-thread numbering (Anon 1, Anon 2) and OP badges, API payload sanitization, anonymous reporting/blocking rules, and regular nickname uniqueness, reserved words and rename cooldowns. Do not assume undecided rules.\nBased on the answers, describe:\n1. Named versus anonymous composition modes and post-publish lock rules.\n2. Thread-local pseudonym assignment and OP badge behavior within a thread.\n3. Fields stripped from public read responses versus server-side ownership flags for edit, delete and vote deduplication.\n4. How personal blocks, reports and moderator sanctions work on anonymous content plus nickname change restrictions.\n5. Anonymous composer indicators, thread-local badges and nickname settings UI with reasons for the design choices.\nDo not hide names only on the client, and distinguish design demos from real server-side identity separation and permission checks.',
    },
  },
  sources: [
    { title: 'Discourse Meta — Anonymous mode configuration and behavior', url: 'https://meta.discourse.org/t/enabling-anonymous-posting-for-users/25568' },
    { title: 'OWASP Cheat Sheet Series — Excessive Data Exposure / API Security', url: 'https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html' },
  ],
}];
