import type { DomainKnowledge } from '../domain-knowledge';

export const COMMUNITY_KNOWLEDGE: DomainKnowledge[] = [{
  id: 'community-post-visibility-and-moderation',
  aliases: {
    ko: ['게시판 서비스', '회원 커뮤니티', '회원 전용 게시판', '비공개 그룹', '게시글 운영', '신고 처리'],
    en: ['community forum', 'members-only forum', 'private group', 'post moderation', 'report review'],
  },
  useCases: {
    ko: ['게시물과 댓글이 있는 커뮤니티를 만들 때', '회원 전용·그룹별 공개 범위와 접근 권한을 설계할 때', '신고 접수·검토·운영 조치를 구분할 때', '게시물 숨김·삭제·복구와 댓글 잠금을 설계할 때'],
    en: ['Building a community with posts and comments', 'Designing members-only or private-group visibility and access permissions', 'Separating reports, review and moderation actions', 'Designing post hiding, deletion, restoration and comment locking'],
  },
  keywords: {
    ko: ['커뮤니티', '게시판', '게시물', '댓글', '공개 범위', '권한', '회원', '운영자', '신고', '숨김', '삭제', '잠금', '운영', '접근 제어'],
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
}];
