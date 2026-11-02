import type { DomainKnowledge } from '../domain-knowledge';

export const NOTIFICATION_KNOWLEDGE: DomainKnowledge[] = [{
  id: 'notification-channels-preferences-and-read-state',
  aliases: {
    ko: ['알림 센터', '푸시 이메일 알림', '알림 수신 설정', '읽음 상태 동기화', '방해 금지 설정'],
    en: ['notification center', 'push and email alerts', 'notification preferences', 'read state sync', 'quiet hours'],
  },
  useCases: {
    ko: ['인앱 알림함과 이메일·푸시 발송을 함께 설계할 때', '필수 보안·거래 안내와 선택형 알림 수신 설정을 구분할 때', '개별 읽음·모두 읽음과 배지 숫자를 동기화할 때', '반복 이벤트 묶음(배치)과 중복 발송 방지를 설계할 때'],
    en: ['Designing an in-app notification inbox alongside email and push delivery', 'Separating mandatory transactional alerts from optional notification preferences', 'Synchronizing unread badge counts with per-item and mark-all-read actions', 'Designing digest batching, quiet hours and duplicate-delivery prevention'],
  },
  keywords: {
    ko: ['알림', '알림함', '알림 센터', '인앱 알림', '푸시 알림', '이메일 알림', '수신 설정', '수신 동의', '방해 금지', '읽음 처리', '모두 읽음', '배지 카운트', '중복 발송 방지'],
    en: ['notification', 'notification center', 'in-app inbox', 'push notification', 'email alert', 'notification preferences', 'opt-in', 'quiet hours', 'read state', 'mark all read', 'badge count', 'deduplication'],
  },
  text: {
    ko: {
      domain: '알림·메시징',
      title: '채널별 발송·수신 설정과 읽음 동기화·중복 방지',
      summary: '필수 안내와 선택 알림을 구분하고, 채널별 발송·읽음 상태·배지 집계·중복 방지를 연결합니다.',
      overview: '알림은 화면 우측 상단의 종 모양 아이콘만으로 끝나지 않습니다. 인앱 알림함, 이메일, 모바일 푸시 중 어느 채널로 보낼지, 사용자가 끌 수 있는 알림과 끌 수 없는 필수 안내가 무엇인지, 읽음 표시와 이동 대상이 어떻게 연결되는지를 함께 설계해야 알림 피로와 누락을 줄일 수 있습니다. 아래 내용은 알림·메시징 흐름을 설계하기 위한 참고이며 특정 발송 주기나 채널 구성을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '필수 안내와 선택형 알림 분리', description: '보안 경고·결제 영수증처럼 수신 거부 여부와 관계없이 보내야 하는 필수 안내와, 활동 소식·마케팅처럼 사용자가 유형·채널별로 켜고 끌 수 있는 알림을 구분합니다.' },
        { name: '채널별 특성과 대체 발송', description: '인앱 알림함은 기록 보관에, 푸시는 즉각 확인에, 이메일은 상세 내용 전달에 적합합니다. 이미 인앱에서 확인한 항목은 외부 이메일 발송을 생략할지 등 채널 간 우선순위를 정합니다.' },
        { name: '확인(Seen)과 읽음(Read) 상태', description: '알림 목록 창을 열어 배지 숫자를 내리는 확인 상태와, 개별 알림을 눌러 실제 내용을 읽은 상태를 구분할지 하나로 다룰지 정합니다.' },
        { name: '묶음 발송(Batching)과 방해 금지', description: '짧은 시간에 같은 대상에 대한 알림이 여러 번 발생할 때 하나로 묶어 보여 줄지, 야간 등 방해 금지 시각에는 푸시만 보류하고 인앱 목록에만 쌓을지 결정합니다.' },
        { name: '원본 대상 삭제·권한 변경 시 처리', description: '알림을 눌렀을 때 이동할 원본 항목이 이미 삭제되었거나 권한이 회수된 경우 빈 오류 화면 대신 어떤 안내를 보여 줄지 정의합니다.' },
      ],
      workflow: [
        { name: '발생 이벤트와 수신 대상·채널 결정하기', description: '행동을 일으킨 본인에게는 알림을 제외하고, 수신자의 알림 설정·방해 금지 여부·권한을 확인해 발송 채널을 고릅니다.' },
        { name: '중복 방지와 묶음 규칙 적용하기', description: '같은 원인으로 중복 요청이 들어와도 한 번만 발송하고, 연속 알림은 요약 건수로 합쳐 피로도를 낮춥니다.' },
        { name: '읽음·모두 읽음과 배지 숫자 맞추기', description: '개별 알림 클릭이나 모두 읽음 실행 시 미확인 배지 숫자와 목록 강조 표시를 일관되게 갱신합니다.' },
        { name: '수신 설정 변경과 즉시 반영 연결하기', description: '알림 설정 화면이나 이메일 하단 수신 거부에서 유형별·채널별 설정을 바꾸면 이후 발송부터 즉시 반영되게 합니다.' },
      ],
      pitfalls: [
        { name: '모든 알림을 한 스위치로만 켜고 끄게 만들기', description: '사용자가 마케팅 알림만 끄려다 중요 안내까지 못 받거나, 필수 보안 알림까지 꺼지는 문제가 생깁니다. 알림 종류와 채널을 나누어 제공하세요.' },
        { name: '배지 숫자와 실제 미확인 목록 개수가 어긋나기', description: '삭제된 항목이나 이미 읽은 항목이 배지 집계에 남으면 아무리 눌러도 숫자가 사라지지 않습니다. 배지 카운트와 미확인 목록의 기준을 하나로 맞추세요.' },
        { name: '권한이 없어진 대상의 내용을 알림 미리보기에 노출하기', description: '접근 권한이 회수된 문서나 비공개 전환된 항목은 알림 목록에서도 민감한 본문이 그대로 남지 않도록 처리 기준을 맞추세요.' },
      ],
      questions: [
        '인앱 알림함·이메일·푸시·메신저 중 어떤 채널을 사용하며, 채널별 발송 조건은 무엇인가요?',
        '사용자가 수신 거부할 수 없는 필수 안내와 직접 켜고 끌 수 있는 알림 유형은 어떻게 나뉘나요?',
        '알림 목록을 여는 것과 개별 알림을 클릭하는 것 중 언제 배지 숫자와 읽음 표시를 갱신하나요?',
        '짧은 시간에 반복되는 알림을 하나로 묶어 표시하나요? 방해 금지 시각 설정을 제공하나요?',
        '알림의 원본 항목이 삭제되거나 권한이 바뀌었을 때 알림 목록과 클릭 후 이동 화면을 어떻게 처리하나요?',
        '외부 채널(이메일·푸시) 발송이 실패하거나 지연될 때 인앱 알림 기록과 재시도는 어떻게 관리하나요?',
      ],
      example: '예시: 협업 서비스에서 새 멘션은 인앱 알림과 푸시로 즉시 보내되, 5분 안에 같은 스레드에 달린 후속 답글은 인앱에서 한 줄로 묶어 보여 주고, 보안 알림은 수신 설정과 무관하게 이메일로 발송하도록 정할 수 있습니다. 실제 채널 구성·묶음 간격·보관 기간은 서비스 특성에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'unread-notification-badge', reason: '미확인 알림 건수를 벨 아이콘 배지로 표시하고 모두 읽음 처리 시 배지를 제거하는 표현에 참고할 수 있습니다. 실제 알림 수신과 서버 읽음 저장은 구현하지 않습니다.' },
        { id: 'mixed-state-checkbox-group', reason: '알림 수신 설정에서 전체 선택·일부 선택·전체 해제를 체크박스 그룹으로 다루는 표현에 참고할 수 있습니다. 실제 채널별 설정 저장은 별도로 구현해야 합니다.' },
      ],
      promptSnippet: '알림·메시징 서비스의 채널별 발송·수신 설정·읽음 동기화 흐름을 설계해 줘. 먼저 지원 채널(인앱·이메일·푸시), 필수 안내와 선택형 알림의 구분, 확인과 읽음 처리 기준, 반복 알림 묶음 및 방해 금지 정책, 원본 삭제·권한 변경 시 노출 규칙을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 알림 유형별 대상자 선정, 필수/선택 구분 및 채널별 발송 조건.\n2. 미확인 배지 숫자, 개별 읽음, 모두 읽음 상태의 동기화 규칙.\n3. 중복 발송 방지, 연속 이벤트 묶음 표시, 방해 금지 구간의 보류 처리.\n4. 발송 실패·원본 항목 삭제·권한 회수 시 목록 표시와 클릭 후 안내.\n5. 헤더 알림 배지·인앱 알림 목록·유형/채널별 수신 설정 화면의 연결.\n단순 배지 숨김을 읽음 저장 완료로 간주하지 말고, 예시 정책과 디자인 데모를 실제 메시징 발송 시스템으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Notifications & Messaging',
      title: 'Multi-channel delivery, notification preferences, read sync and deduplication',
      summary: 'Separate mandatory alerts from optional notifications, and connect channel routing, read states, badge counts and deduplication.',
      overview: 'Notifications involve more than a bell icon. Coordinating in-app inboxes, email and push channels, distinguishing mandatory security or transactional notices from user-controlled preferences, and syncing unread counts with target navigation prevents both alert fatigue and missed actions. These concepts are design references, not default delivery cadences or channel rules for a specific product.',
      concepts: [
        { name: 'Mandatory transactional versus optional notifications', description: 'Distinguish critical security or receipt notices that cannot be disabled from activity or marketing updates that users can toggle per category and channel.' },
        { name: 'Channel routing and fallback rules', description: 'Use in-app lists for history, push for immediate attention and email for durable records, and decide whether reading an in-app item suppresses delayed email digests.' },
        { name: 'Seen versus read states', description: 'Decide whether opening the notification tray clears the unread badge count (seen) while individual items stay unread until clicked (read), or whether one state covers both.' },
        { name: 'Batching, digests and quiet hours', description: 'Group rapid bursts of activity on the same item into one summary entry, and define whether quiet hours hold push alerts while still recording in-app items.' },
        { name: 'Target deletion and permission revocation', description: 'Define what happens when a user clicks a notification whose target item was deleted or had its access revoked.' },
      ],
      workflow: [
        { name: 'Determine recipients, permissions and channels', description: 'Exclude the actor who triggered the event, check recipient access and preferences, and select eligible delivery channels.' },
        { name: 'Apply deduplication and batching', description: 'Ensure retried events do not send duplicate alerts, and collapse repeated updates on the same subject when appropriate.' },
        { name: 'Synchronize read actions and badge counts', description: 'Keep the header badge count, unread row styling and mark-all-read action consistent across tabs and views.' },
        { name: 'Connect preference controls to delivery', description: 'Let users adjust category-by-channel settings in-app or via email unsubscribe links and apply changes immediately.' },
      ],
      pitfalls: [
        { name: 'Providing only a single master toggle for all alerts', description: 'Users trying to mute noisy updates should not lose password-reset or receipt notices. Separate categories and channels.' },
        { name: 'Allowing badge counts to drift from visible unread items', description: 'If deleted or inaccessible items still count toward the unread badge, users can never clear the indicator. Derive counts from the same eligible unread set.' },
        { name: 'Leaking restricted content in notification previews', description: 'When access to a resource is revoked, ensure notification snippets and links do not expose restricted text.' },
      ],
      questions: [
        'Which channels (in-app inbox, email, push, chat webhook) are used, and when is each channel triggered?',
        'Which notices are mandatory, and which categories can users toggle per channel?',
        'Does opening the tray clear the badge count, or must items be clicked or marked read explicitly?',
        'Are rapid events batched into a single entry or digest, and are quiet hours supported?',
        'What should the inbox and destination screen show if the referenced item is deleted or no longer accessible?',
        'If an email or push delivery fails, how is retry handled while keeping the in-app inbox accurate?',
      ],
      example: 'Example: a workspace app could send direct mentions immediately to both in-app and push, collapse follow-up replies within 5 minutes into a single grouped inbox row, and always send security alerts by email regardless of marketing preferences. Confirm actual channels, batching windows and retention limits before adopting this setup.',
      relatedDesigns: [
        { id: 'unread-notification-badge', reason: 'A reference for showing an unread count badge on a bell button and clearing it when marked read. Real notification delivery and persistence need separate implementation.' },
        { id: 'mixed-state-checkbox-group', reason: 'A reference for managing select-all, partial and individual category toggles in notification settings. Saving preferences requires separate implementation.' },
      ],
      promptSnippet: 'Help design a notification and messaging workflow. First confirm supported channels, mandatory versus optional categories, seen/read state definitions, batching and quiet-hour rules, and handling of deleted or restricted target items. Do not assume undecided rules.\nBased on the answers, describe:\n1. Recipient selection, mandatory versus optional rules, and per-channel routing.\n2. Synchronization between unread badge counts, individual read states and mark-all-read actions.\n3. Deduplication, event batching and quiet-hour hold behavior.\n4. User-visible behavior when delivery fails or when a notification target is deleted or restricted.\n5. How the header badge, in-app notification inbox and preference matrix connect.\nDo not treat hiding a badge in the UI as persisting read state, and do not mistake example policies or design demos for a real notification delivery system.',
    },
  },
  sources: [
    { title: 'MDN Web Docs — Notifications API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API' },
    { title: 'Apple Human Interface Guidelines — Notifications', url: 'https://developer.apple.com/design/human-interface-guidelines/notifications' },
  ],
}, {
  id: 'notification-chat-room-delivery-and-recall',
  aliases: {
    ko: ['실시간 채팅 전송 상태', '읽음 확인 안 읽은 인원수', '메시지 발송 취소 회수', '오프라인 재전송 낙관적 UI'],
    en: ['chat message delivery states', 'unread participant count', 'message recall and unsend', 'optimistic send and retry'],
  },
  useCases: {
    ko: ['1:1 및 단체 대화방에서 전송 중·전송 완료·전송 실패 재시도 상태를 표시할 때', '참여자별 마지막 읽은 위치(Read Cursor)로 메시지 옆 안 읽은 인원수를 계산할 때', '보낸 메시지를 모두에게서 회수(발송 취소)하는 것과 내 화면에서만 숨기는 것을 구분할 때', '메시지 회수 시 이미 발송된 푸시 알림과 대화방 목록의 마지막 메시지 요약을 갱신할 때'],
    en: ['Showing sending, sent, failed-with-retry and edited states in direct or group chat', 'Computing unread participant counts from per-user read cursors', 'Distinguishing unsend-for-everyone from delete-for-me-only', 'Updating push notifications and conversation list previews when a message is recalled'],
  },
  keywords: {
    ko: ['채팅 메시지', '전송 상태', '전송 실패 재시도', '읽음 확인', '안 읽은 수', '메시지 회수', '발송 취소', '내게서만 삭제', '메시지 수정'],
    en: ['chat delivery state', 'optimistic UI', 'retry send', 'read receipt', 'unread count', 'message recall', 'unsend', 'delete for me', 'message edit'],
  },
  text: {
    ko: {
      domain: '알림·메시징',
      title: '실시간 대화방 메시지 전송 상태·읽음 수 집계와 발송 취소/가리기',
      summary: '전송 중·실패 재시도 상태와 참여자 읽음 위치를 연결하고, 전체 회수와 내 화면 숨김 및 미리보기 갱신을 구분합니다.',
      overview: '실시간 대화방에서 엔터를 누른 직후 말풍선을 먼저 띄우면(낙관적 표시) 반응은 빠르지만, 네트워크가 끊겼을 때 실제로는 안 갔는데 전송된 것처럼 보이거나 재시도 시 같은 메시지가 두 번 등록될 수 있습니다. 또한 단체방의 안 읽은 인원수 계산과 메시지 발송 취소(전체 회수 vs 내게서만 가리기)가 대화 목록 요약에 미치는 영향까지 함께 맞춰야 합니다. 아래 내용은 채팅 전송·회수 설계를 위한 참고이며 특정 회수 제한 시간을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '전송 대기·서버 접수·전송 실패와 중복 방지 키', description: '전송 버튼을 누른 즉시 고유 식별자(Client Message ID)를 붙여 전송 중으로 표시하고, 실패 후 재전송하더라도 서버에 중복 메시지가 쌓이지 않게 합니다.' },
        { name: '참여자별 읽음 커서(Read Cursor)와 미확인 인원수', description: '메시지마다 읽은 사람 목록을 중복 저장하는 대신 참여자별 마지막 읽은 메시지 시점을 갱신해 단체방의 남은 미확인 숫자를 계산합니다.' },
        { name: '모두에게서 회수(Unsend) vs 내 화면에서만 가리기', description: '일정 시간 안에 모든 참여자의 화면에서 본문을 거두어들이는 전체 회수와, 다른 사람 화면은 그대로 두고 내 목록에서만 숨기는 동작을 분리합니다.' },
        { name: '수정·회수 시 목록 미리보기·인용 답장·푸시 연동', description: '마지막 메시지가 수정되거나 회수되면 대화방 목록의 한 줄 요약과 인용된 원문 표시를 함께 바꾸고, 아직 안 읽은 푸시 알림도 철회하거나 안내 문구로 대체합니다.' },
      ],
      workflow: [
        { name: '고유 키와 함께 메시지 전송 및 상태 표시하기', description: '입력 즉시 전송 중 표시로 말풍선을 추가하고, 서버 확인 응답이 오면 전송 완료 시각으로 바꾸며 실패 시 재전송·취소 버튼을 노출합니다.' },
        { name: '대화방 진입·스크롤에 맞춰 읽음 커서 갱신하기', description: '사용자가 대화방을 열어 최신 메시지까지 확인하면 마지막 읽은 위치를 올리고 상대방 화면의 미확인 숫자를 줄입니다.' },
        { name: '메시지 수정 또는 발송 취소 범위 선택하기', description: '허용 기한 안에는 수정이나 모두에게서 회수를 선택할 수 있게 하고, 기한이 지났거나 상대방 메시지인 경우 내 화면에서만 가리기를 안내합니다.' },
        { name: '회수 흔적 표시와 대화 목록 요약 동기화하기', description: '전체 회수된 자리에는 "삭제된 메시지입니다" 안내를 남길지 정하고, 좌측 대화방 목록의 최신 메시지 미리보기를 즉시 갱신합니다.' },
      ],
      pitfalls: [
        { name: '메시지 본문은 회수했는데 대화방 목록 미리보기에는 원문이 그대로 남기', description: '방 안에서는 지워졌는데 방 목록 요약이나 답장 인용구에 민감한 원문이 그대로 보이면 회수 기능이 무의미해집니다.' },
        { name: '재전송 버튼을 누를 때마다 똑같은 메시지가 여러 개 발송되기', description: '일시적인 응답 지연을 실패로만 처리해 새 요청으로 보내면 중복 말풍선이 생깁니다. 최초 생성한 메시지 식별자로 멱등성을 유지하세요.' },
        { name: '내게서만 삭제와 모두에게서 회수를 같은 "삭제" 버튼 하나로 두기', description: '사용자가 상대방 화면에서도 지워진 줄 알고 실수하지 않도록 두 동작의 이름과 적용 대상을 명확히 구분하세요.' },
      ],
      questions: [
        '메시지 전송 중 네트워크가 끊겼을 때 자동 재시도를 하나요, 사용자가 직접 재전송·삭제를 선택하게 하나요?',
        '1:1 및 단체 대화방에서 읽음 여부를 개별 프로필로 보여주나요, 안 읽은 인원수 숫자로 보여주나요?',
        '보낸 메시지를 모두에게서 회수(발송 취소)할 수 있는 제한 시간과 수정 가능 시간은 각각 얼마인가요?',
        '메시지를 모두에게서 회수했을 때 빈자리 없이 완전히 숨기나요, "삭제된 메시지입니다" 같은 안내 문구를 남기나요?',
        '회수된 메시지를 인용해 달았던 답장이나 대화방 목록의 마지막 메시지 미리보기는 어떻게 바뀌나요?',
      ],
      example: '예시: 단체 대화방에서 전송 중인 메시지는 시계 아이콘으로, 실패 시에는 재전송/취소 버튼으로 표시하고, 발송 후 5분 안에는 모두에게서 회수가 가능하며 회수 시 말풍선과 대화방 목록 미리보기가 모두 "삭제된 메시지입니다"로 바뀌도록 구성할 수 있습니다. 실제 회수 허용 기한과 읽음 표시 범위는 서비스 정책에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'unread-notification-badge', reason: '대화방 목록에서 아직 읽지 않은 메시지 건수를 배지로 표시하고 진입 시 초기화하는 표현에 참고할 수 있습니다. 실제 실시간 소켓 연동과 커서 계산은 별도로 구현해야 합니다.' },
        { id: 'inline-delete-confirmation', reason: '메시지 삭제 시 내 화면에서만 가릴지 모두에게서 회수할지 확인하는 표현에 참고할 수 있습니다. 실제 서버 메시지 회수는 구현하지 않습니다.' },
      ],
      promptSnippet: '실시간 대화방의 메시지 전송 상태, 읽음 수 집계, 메시지 수정 및 발송 취소(회수) 흐름을 설계해 줘. 먼저 전송 실패 시 재시도 및 중복 방지 방식, 읽음 확인 표시 기준(인원수 vs 읽은 사람), 모두에게서 회수 가능 기한과 내게서만 가리기 구분, 회수 시 흔적 문구 및 대화 목록 미리보기·답장 인용 갱신 규칙을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 전송 대기·전송 완료·전송 실패·수정됨·전체 회수·내 화면 숨김 상태 전환.\n2. 고유 메시지 식별자를 통한 재전송 중복 방지와 참여자별 읽음 커서 집계.\n3. 모두에게서 회수 vs 내게서만 가리기의 허용 조건과 확인 문구.\n4. 메시지 수정·회수 시 대화방 목록 요약, 인용 답장, 미확인 푸시 알림 동기화.\n5. 대화방 목록·말풍선 상태 아이콘·실패 재전송 액션·회수 확인 창의 연결.\n화면에서 말풍선을 먼저 띄운 것을 실제 전송 성공으로 단정하지 말고, 예시 정책과 디자인 데모를 실제 실시간 메시징 서버로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Notifications & Messaging',
      title: 'Chat message delivery states, unread participant counts and message recall',
      summary: 'Connect optimistic send states, per-participant read cursors, and clear boundaries between unsend-for-all and delete-for-me.',
      overview: 'Rendering a chat bubble immediately on Enter makes messaging feel fast, but flaky connections can leave messages stuck in limbo or create duplicates when retried. At the same time, group chats need accurate unread participant counts, and users must never confuse hiding a message on their own screen with recalling it for everyone. These concepts are design references, not default recall time limits.',
      concepts: [
        { name: 'Optimistic sending, retry and idempotency keys', description: 'Attach a client-generated message ID before sending so retries after a network drop do not create duplicate messages.' },
        { name: 'Per-participant read cursors and unread counts', description: 'Track each participant’s last-read message timestamp or sequence ID to derive how many people still have not read each message.' },
        { name: 'Recall for everyone versus hide for me', description: 'Strictly separate recalling a sent message for all participants (often within a time window) from hiding a message only in the current user’s view.' },
        { name: 'Preview, quote and push synchronization on recall', description: 'When a message is edited or recalled, update the room list snippet, quoted reply previews and any pending push notifications.' },
      ],
      workflow: [
        { name: 'Render optimistic state and handle send failures', description: 'Show a sending indicator immediately, switch to a sent timestamp on acknowledgment, or offer inline retry and discard actions on failure.' },
        { name: 'Advance read cursors when viewing the thread', description: 'Update the user’s read cursor when the room is focused and scrolled to the bottom, decrementing unread counts for other participants.' },
        { name: 'Choose between edit, recall for all, or hide for me', description: 'Allow editing or recalling for everyone within the allowed window, and label local-only removal clearly when full recall is unavailable.' },
        { name: 'Replace recalled content across thread and previews', description: 'Swap recalled message text with a tombstone notice (if configured) and refresh the conversation list preview and quoted snippets.' },
      ],
      pitfalls: [
        { name: 'Recalling the message bubble while leaving the original text in the room list preview', description: 'If the sidebar snippet or quoted reply still shows the recalled text, sensitive mistakes remain exposed.' },
        { name: 'Creating duplicate messages when the user clicks Retry', description: 'Always reuse the original client message ID on retry so the server deduplicates already-received payloads.' },
        { name: 'Labeling both local hide and global unsend simply as "Delete"', description: 'Make it unmistakable whether a deletion removes the message for everyone in the room or only from the sender’s screen.' },
      ],
      questions: [
        'When sending a message fails offline, does the app retry automatically or show manual Retry and Discard actions?',
        'How are read receipts displayed in 1:1 and group rooms (unread participant count, avatar list, or simple checkmarks)?',
        'What time window applies to editing a message or recalling it for everyone, and how is "delete for me" distinguished?',
        'When a message is recalled for everyone, does it leave a "Message recalled" placeholder or disappear completely?',
        'How do conversation list previews, quoted replies and unread push notifications update when a message is recalled?',
      ],
      example: 'Example: a team chat could show a clock icon while sending, offer inline Retry/Delete buttons on network failure, allow "Recall for everyone" within 5 minutes of sending, and replace both the bubble and sidebar preview with "This message was recalled." Confirm actual recall windows and read-receipt privacy rules before adopting this setup.',
      relatedDesigns: [
        { id: 'unread-notification-badge', reason: 'A reference for showing unread message counts on conversation rows and clearing them when read. Real socket delivery and read-cursor sync need separate implementation.' },
        { id: 'inline-delete-confirmation', reason: 'A reference for confirming whether to recall a message for everyone or remove it only from the current view. Real server-side message recall needs separate implementation.' },
      ],
      promptSnippet: 'Help design chat message delivery states, read-receipt counts and message recall workflows. First confirm offline retry and deduplication rules, how read receipts are shown in 1:1 and group chats, time limits for editing or recalling for everyone versus deleting for oneself, and how tombstones, sidebar previews and quoted replies update on recall. Do not assume undecided rules.\nBased on the answers, describe:\n1. Message states across sending, sent, failed, edited, recalled-for-all and hidden-for-me.\n2. Client message IDs for idempotent retries and read-cursor calculation for unread counts.\n3. Eligibility and confirmation copy for recall-for-all versus hide-for-me.\n4. Synchronization of room list previews, quoted replies and push notifications when a message is edited or recalled.\n5. How the room list, message status indicators, retry actions and recall confirmation UI connect.\nDo not treat optimistic UI rendering as confirmed server delivery, and do not mistake example policies or design demos for a real realtime messaging backend.',
    },
  },
  sources: [
    { title: 'Slack Help Center — Edit or delete messages', url: 'https://slack.com/help/articles/201457107-Edit-or-delete-messages' },
    { title: 'Apple Support — Unsend and edit messages on iPhone', url: 'https://support.apple.com/guide/iphone/unsend-and-edit-messages-iphe67195653/ios' },
  ],
}, {
  id: 'notification-scheduled-campaign-and-unsubscribe',
  aliases: {
    ko: ['예약 공지 단체 발송', '발송 시점 수신 거부 재확인', '대상자 스냅샷과 동적 조건', '수신자 표준시 예약 발송'],
    en: ['scheduled broadcast notifications', 'send-time unsubscribe suppression', 'audience snapshot vs dynamic filter', 'recipient timezone scheduling'],
  },
  useCases: {
    ko: ['전체 공지·뉴스레터·이벤트 알림을 지정한 날짜와 시각에 예약 발송할 때', '예약 등록 시점과 실제 발송 시각 사이에 수신 거부하거나 탈퇴한 사용자를 발송 대상에서 즉시 제외할 때', '대상자를 예약 시점 명단(스냅샷)으로 고정할지 발송 시점 조건으로 다시 계산할지 정할 때', '발송 시작 전 예약 수정·취소와 발송 중 긴급 중단(일시정지) 흐름을 설계할 때'],
    en: ['Scheduling announcements, newsletters or campaign alerts for a future date and time', 'Suppressing users who unsubscribed or deleted their account between scheduling and actual send time', 'Choosing between a fixed audience snapshot at scheduling time and dynamic filtering at send time', 'Supporting schedule edits, cancellation before dispatch and emergency pause during rollout'],
  },
  keywords: {
    ko: ['예약 발송', '단체 알림', '공지 발송', '수신 거부 제외', '대상자 조건', '스냅샷', '표준시', '테스트 발송', '발송 취소'],
    en: ['scheduled broadcast', 'campaign notification', 'unsubscribe suppression', 'audience segment', 'send-time check', 'timezone scheduling', 'test send', 'cancel schedule', 'batch pause'],
  },
  text: {
    ko: {
      domain: '알림·메시징',
      title: '예약 공지·단체 메시지 발송 대상 고정과 수신 거부 즉시 제외',
      summary: '예약 시점과 발송 시점의 대상자 계산을 구분하고, 발송 직전 수신 거부·탈퇴 제외와 예약 취소·중단을 연결합니다.',
      overview: '단체 공지나 캠페인 알림을 며칠 전에 미리 예약해 두면 그사이에 수신 거부를 누르거나 탈퇴하는 사용자가 생깁니다. 만약 예약 등록 시점에 뽑아 둔 명단 그대로 발송해 버리면 이미 수신을 거부한 사용자에게 알림이 나가 법적·운영적 문제가 됩니다. 대상자 추출 시점과 발송 직전 수신 거부(Suppression) 재확인, 기준 표준시, 발송 전 취소 절차를 명확히 설계해야 합니다. 아래 내용은 예약·단체 발송 설계를 위한 참고이며 특정 발송 속도나 규정을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '예약 시점 명단 고정(Snapshot) vs 발송 시점 조건 재계산', description: '대상자 조건을 예약할 때 확정할지 실제 발송 시각에 조건에 맞는 사용자를 다시 조회할지 정합니다. 어느 쪽이든 수신 거부·탈퇴 제외는 발송 직전에 다시 검사합니다.' },
        { name: '발송 직전 수신 거부·차단 목록(Suppression) 강제 제외', description: '예약 등록 이후부터 실제 큐가 발송되는 순간까지 발생한 수신 거부, 계정 탈퇴, 반송(Bounce) 주소를 최종 발송 직전에 반드시 걸러냅니다.' },
        { name: '절대 시각 발송 vs 수신자 현지 표준시(Timezone) 발송', description: '모든 대상자에게 한국 시각 오전 10시처럼 동시에 보낼지, 각 수신자의 현지 시간대 오전 10시에 맞춰 순차 발송할지 구분합니다.' },
        { name: '테스트 발송과 예약 취소·발송 중 긴급 중단', description: '본 발송 전에 담당자에게만 테스트 발송해 본문과 링크를 확인하고, 예약 대기 중 취소·시간 변경과 대량 순차 발송 중 긴급 중단 상태를 정의합니다.' },
      ],
      workflow: [
        { name: '대상자 조건 설정과 예상 수신 인원 확인하기', description: '대상 그룹·언어·알림 동의 조건을 선택하고, 현재 기준 예상 발송 인원과 수신 거부로 제외되는 인원을 구분해 보여 줍니다.' },
        { name: '테스트 발송 확인 후 예약 시각·표준시 확정하기', description: '미리보기와 테스트 발송으로 내용을 점검한 뒤 즉시 발송 또는 기준 표준시가 명시된 예약 시각을 등록합니다.' },
        { name: '예약 대기 중 수정·취소 또는 발송 잠금 처리하기', description: '발송 시작 전까지는 예약 취소나 문구 수정을 허용하고, 발송 큐 적재가 시작되는 시점부터는 중복 수정이 일어나지 않게 잠급니다.' },
        { name: '발송 직전 수신 거부 재검사 및 결과 집계하기', description: '실제 발송 시점에 최신 수신 거부·탈퇴 여부를 다시 걸러내 발송하고, 성공·제외·실패 건수를 집계합니다.' },
      ],
      pitfalls: [
        { name: '예약 등록 시점의 대상자 명단을 그대로 발송해 그사이 수신 거부한 사람에게 보내기', description: '어제 수신 거부를 눌렀는데 오늘 예약 메일이 도착하면 큰 항의로 이어집니다. 수신 거부 대조는 반드시 실제 발송 직전에 수행하세요.' },
        { name: '테스트 발송 버튼이 실제 전체 고객에게 발송되도록 헷갈리게 배치하기', description: '내부 확인용 테스트 발송과 실제 전체 발송 액션은 입력창과 확인 단계를 명확히 분리해 오발송 사고를 막으세요.' },
        { name: '발송이 이미 시작되었는데 예약 취소 버튼이 성공으로 뜨기', description: '배치 발송이 진행 중일 때는 단순 예약 취소가 아니라 남은 대기분 중단(이미 나간 건은 취소 불가)임을 정확히 안내해야 합니다.' },
      ],
      questions: [
        '예약 발송 대상자는 예약 등록 시점에 고정하나요, 실제 발송 시각에 조건을 다시 계산하나요?',
        '예약 후 실제 발송되기 전 사이에 수신 거부하거나 탈퇴·권한 상실된 사용자는 발송 직전에 자동 제외되나요?',
        '예약 시각은 운영자 기준 단일 표준시로 동시에 나가나요, 수신자별 현지 시간대에 맞춰 나뉘어 나가나요?',
        '예약된 알림을 수정하거나 취소할 수 있는 마감 시점은 언제이며, 대량 발송 도중 긴급 중단을 지원하나요?',
        '수신자가 알림 하단에서 수신 거부를 눌렀을 때 로그인 없이 원클릭으로 즉시 반영되나요, 어떤 알림 유형만 꺼지나요?',
      ],
      example: '예시: 공지 알림을 KST 기준 내일 오전 9시로 예약하되 발송 5분 전부터는 문구 수정을 잠그고, 실제 발송 큐가 돌 때 최신 수신 거부 및 탈퇴 계정을 다시 제외하며, 이메일 하단 링크로 로그인 없이 해당 공지 카테고리를 즉시 수신 거부할 수 있게 구성할 수 있습니다. 실제 발송 단가와 대량 발송 제한은 인프라 환경에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'native-date-field', reason: '예약 발송 날짜와 기준 범위를 입력하고 과거 날짜 선택을 제한하는 표현에 참고할 수 있습니다. 실제 타임존 변환과 스케줄러 등록은 별도로 구현해야 합니다.' },
        { id: 'inline-delete-confirmation', reason: '전체 발송 확정이나 예약 취소·중단 실행 전에 대상 인원과 영향을 한 번 더 확인하는 표현에 참고할 수 있습니다. 실제 발송 큐 제어는 구현하지 않습니다.' },
      ],
      promptSnippet: '알림·메시징 서비스의 예약 공지·단체 발송과 수신 거부 즉시 제외 흐름을 설계해 줘. 먼저 대상자 추출 시점(예약 시점 고정 vs 발송 시점 재계산), 발송 직전 수신 거부·탈퇴 재검사 규칙, 기준 표준시(단일 시각 vs 수신자별 시간대), 예약 수정·취소 마감 시점과 발송 중 긴급 중단 방식을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 작성 중·예약 대기·발송 준비(잠금)·발송 중·발송 완료·취소/중단 상태 전환.\n2. 대상자 조건 계산과 발송 직전 수신 거부(Suppression)·탈퇴·반송 계정 제외 규칙.\n3. 테스트 발송과 본 발송의 분리, 표준시 표기, 예약 변경·취소 가능 구간.\n4. 발송 도중 중단 시 이미 발송된 건과 남은 대기 건의 처리 및 결과 집계.\n5. 대상자 미리보기·예약 일시 설정·발송 전 최종 확인 창·수신 거부 완료 화면의 연결.\n예약 시점의 명단이 발송 시점에도 그대로 유효하다고 가정하지 말고, 예시 정책과 디자인 데모를 실제 대량 발송 스케줄러로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Notifications & Messaging',
      title: 'Scheduled broadcasts, audience snapshots and immediate unsubscribe suppression',
      summary: 'Coordinate scheduled broadcast audiences, enforce send-time unsubscribe suppression, and support safe cancellation before dispatch.',
      overview: 'When an announcement or campaign is scheduled days in advance, some recipients will unsubscribe, lose access or delete their accounts before the clock strikes. Sending to a stale list captured when the schedule was created violates user trust and compliance rules. Define whether audiences are snapshotted or evaluated dynamically, always re-check suppression lists at actual send time, and make cancellation boundaries explicit. These concepts are design references, not default compliance advice.',
      concepts: [
        { name: 'Audience snapshot versus send-time evaluation', description: 'Decide whether segment rules capture a fixed recipient list when scheduled or recalculate matching users at send time—while always re-applying suppression checks right before delivery.' },
        { name: 'Send-time unsubscribe and bounce suppression', description: 'Filter out anyone who unsubscribed, lost access, bounced hard or deleted their account between schedule creation and the moment each message dispatches.' },
        { name: 'Fixed broadcast time versus recipient-timezone delivery', description: 'Distinguish sending to everyone at one absolute timestamp from delivering at a local wall-clock time per recipient timezone.' },
        { name: 'Test sends, freeze windows and mid-rollout pause', description: 'Separate internal test sends from live broadcasts, define when a scheduled job locks against edits, and specify what pausing a running batch stops.' },
      ],
      workflow: [
        { name: 'Define audience filters and preview eligible counts', description: 'Show estimated eligible recipients alongside how many matching users are currently excluded by unsubscribe or bounce status.' },
        { name: 'Verify with a test send and lock the schedule timezone', description: 'Send a preview to a test address, confirm the explicit timezone and schedule timestamp, and place the broadcast in a scheduled state.' },
        { name: 'Allow edits or cancellation before the dispatch freeze', description: 'Let operators edit copy or cancel the schedule up until queue ingestion begins, then lock the payload to prevent race conditions.' },
        { name: 'Enforce send-time suppression and report outcomes', description: 'Re-verify opt-out and account status right as messages dispatch, and report delivered, suppressed and failed counts separately.' },
      ],
      pitfalls: [
        { name: 'Sending to users who unsubscribed after the broadcast was scheduled', description: 'Never rely solely on the opt-in state recorded when the campaign was scheduled; check the suppression list at dispatch time.' },
        { name: 'Placing Test Send and Send to All right next to each other without confirmation', description: 'Require an explicit confirmation showing the recipient count and schedule time before queuing a live broadcast.' },
        { name: 'Showing "Cancelled" after a batch has already started dispatching', description: 'Once sending begins, clarify that pausing halts remaining queued recipients but cannot recall emails or pushes already sent.' },
      ],
      questions: [
        'Is the target audience fixed when the broadcast is scheduled, or re-evaluated against filter rules at send time?',
        'How does the system guarantee that users who unsubscribed or deleted their accounts after scheduling are excluded at send time?',
        'Are scheduled broadcasts sent at a single global timestamp or staggered by each recipient’s local timezone?',
        'Until what point before send time can a scheduled broadcast be edited or cancelled, and can an in-progress rollout be paused?',
        'Does clicking an unsubscribe link apply immediately without requiring sign-in, and does it mute one category or all optional broadcasts?',
      ],
      example: 'Example: an announcement tool could evaluate segment rules at send time, lock edits 5 minutes before dispatch, strip any address on the live unsubscribe or deleted-account list right before sending, and provide a one-click category unsubscribe link. Confirm actual rate limits and legal opt-out rules before adopting this setup.',
      relatedDesigns: [
        { id: 'native-date-field', reason: 'A reference for picking a valid future date with min/max bounds for a scheduled broadcast. Real timezone conversion and job scheduling need separate implementation.' },
        { id: 'inline-delete-confirmation', reason: 'A reference for confirming recipient count before scheduling or confirming cancellation of a queued broadcast. Real queue control needs separate implementation.' },
      ],
      promptSnippet: 'Help design scheduled broadcast notifications, audience evaluation and immediate unsubscribe suppression. First confirm whether audiences are snapshotted at schedule time or evaluated at send time, how send-time unsubscribe/deletion suppression works, single-timezone versus recipient-timezone scheduling, edit/cancel cutoff windows, and one-click unsubscribe behavior. Do not assume undecided rules.\nBased on the answers, describe:\n1. Broadcast states across editing, scheduled, locked for dispatch, sending, completed and cancelled/paused.\n2. Audience calculation and mandatory send-time suppression for unsubscribed, deleted or revoked users.\n3. Separation between test sends and live broadcasts, timezone display and edit cutoff rules.\n4. Behavior when pausing a mid-flight broadcast and reporting delivered versus suppressed counts.\n5. How the audience preview, schedule date/time picker, pre-send confirmation and unsubscribe page connect.\nDo not assume an audience list captured at scheduling time remains valid at send time without suppression checks, and do not mistake example policies or design demos for a real campaign delivery engine.',
    },
  },
  sources: [
    { title: 'RFC 8058 — Signaling One-Click Functionality for List Email Headers', url: 'https://datatracker.ietf.org/doc/html/rfc8058' },
    { title: 'Customer.io Docs — Broadcasts and recipient suppression', url: 'https://customer.io/docs/journeys/broadcasts/' },
  ],
}, {
  id: 'notification-template-variable-and-fallback',
  aliases: {
    ko: ['다국어 알림 템플릿 관리', '치환 변수 누락 기본값', '채널 발송 실패 대체 경로', '푸시 이메일 폴백'],
    en: ['localized notification templates', 'missing variable fallback', 'channel failover routing', 'template version preview'],
  },
  useCases: {
    ko: ['하나의 알림 이벤트를 한국어·영어 등 수신자 언어 설정에 맞는 템플릿으로 발송할 때', '수신자 이름·문서 제목 같은 치환 변수가 비어 있을 때 깨진 기호 대신 자연스러운 대체 문구를 넣을 때', '인앱·푸시·이메일·문자 중 채널별 글자 수 제한과 마크다운/HTML 지원 차이를 맞출 때', '푸시 토큰 만료나 1차 채널 발송 실패 시 대체 채널(이메일 등)로 전환할 조건을 정할 때'],
    en: ['Rendering notification templates in each recipient’s preferred locale with a default-locale fallback', 'Replacing missing template variables with safe fallback copy instead of raw syntax or blanks', 'Adapting one event across push, in-app, email and SMS length and formatting constraints', 'Failing over to a secondary channel when the primary channel token is invalid or undelivered'],
  },
  keywords: {
    ko: ['알림 템플릿', '다국어 알림', '치환 변수', '폴백 문구', '대체 채널', '푸시 실패', '글자 수 제한', '템플릿 미리보기', '오발송 방지'],
    en: ['notification template', 'localization', 'variable fallback', 'default locale', 'channel failover', 'push token expiry', 'character limit', 'payload validation', 'template preview'],
  },
  text: {
    ko: {
      domain: '알림·메시징',
      title: '다국어 알림 템플릿·치환 변수 누락 방어와 발송 채널 실패 시 대체 경로',
      summary: '수신자 언어와 채널 제약에 맞춰 템플릿을 렌더링하고, 변수 누락 시 대체 문구와 채널 실패 시 우회 발송을 연결합니다.',
      overview: '알림 메시지는 수신자마다 표시 언어가 다르고, 푸시·인앱·이메일·SMS마다 허용 글자 수와 서식이 다릅니다. 만약 특정 변수가 비어 있다고 화면에 `undefined`나 `{{userName}}`이 그대로 찍히거나, 만료된 푸시 토큰으로만 보내고 끝나 중요 안내가 유실되면 서비스 신뢰가 무너집니다. 다국어·변수 폴백과 채널 간 대체 발송(Failover) 규칙을 함께 설계해야 합니다. 아래 내용은 알림 템플릿과 폴백 설계를 위한 참고이며 특정 외부 발송 업체를 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '수신자별 언어(Locale) 매칭과 기본 언어 폴백', description: '발송자가 아니라 각 수신자의 언어 설정에 맞춰 템플릿을 고르고, 해당 언어 번역이 아직 없는 항목은 서비스 기본 언어 템플릿으로 안전하게 대체합니다.' },
        { name: '치환 변수(Variable) 검증과 누락 시 대체 문구', description: '선택 속성(이름 등)이 비어 있을 때 쓸 기본 호칭(`회원님` 등)을 지정하고, 결제 금액·인증 코드 같은 필수 변수가 누락되면 깨진 문장을 보내는 대신 발송을 차단하고 경고를 남깁니다.' },
        { name: '채널별 길이·서식 제약과 말줄임 규칙', description: '짧은 한 줄만 보이는 모바일 푸시·SMS와 긴 본문·버튼을 담는 이메일의 템플릿을 구분하고, 긴 문서 제목이 들어올 때 어디서 줄일지 정합니다.' },
        { name: '1차 채널 실패 감지와 대체 채널(Failover) 전환', description: '푸시 기기 토큰이 만료되었거나 일정 시간 내 전달 실패가 확인될 때, 중요 알림에 한해 이메일이나 문자로 대체 발송할지 기준을 정합니다.' },
      ],
      workflow: [
        { name: '채널·언어별 템플릿 작성과 변수 스키마 연결하기', description: '알림 이벤트가 제공하는 변수 목록과 필수 여부를 정의하고, 각 채널·언어별 제목과 본문, 이동 링크를 작성합니다.' },
        { name: '샘플 데이터와 빈 값으로 미리보기 검증하기', description: '정상 데이터뿐 아니라 선택 변수가 비어 있는 경우와 아주 긴 문자열이 들어온 경우의 렌더링 결과를 채널별로 미리 확인합니다.' },
        { name: '발송 시 수신자 언어 선택 및 변수 치환하기', description: '수신자 언어에 맞는 템플릿에 데이터를 주입하고, 필수 변수 누락 시 발송 차단 및 오류 기록, 선택 변수 누락 시 대체 문구를 적용합니다.' },
        { name: '발송 결과 확인과 대체 채널 우회 실행하기', description: '1차 채널 응답이 기기 무효나 전달 실패로 돌아오면 무효 토큰을 정리하고 설정된 정책에 따라 대체 채널로 발송합니다.' },
      ],
      pitfalls: [
        { name: '행동을 일으킨 사람의 언어로 다른 나라 수신자에게 알림 보내기', description: '영어권 사용자가 댓글을 달았다고 한국어 설정 수신자에게 영문 시스템 알림이 가면 어색합니다. 템플릿 언어는 수신자 기준으로 고르세요.' },
        { name: '변수 값이 없을 때 `null`, `undefined`, `{{name}}`을 그대로 노출하기', description: '프로필 닉네임을 아직 안 정한 사용자에게 깨진 문자열이 나가지 않도록 모든 선택 변수에 대체 표현을 준비하세요.' },
        { name: '일시적 지연을 실패로 오판해 푸시와 이메일·문자를 동시에 중복 폭격하기', description: '대체 채널 발송은 명확한 발송 실패나 중요 알림에 한정하고, 이미 인앱·푸시로 읽은 경우에는 후속 대체 발송을 취소하세요.' },
      ],
      questions: [
        '지원하는 알림 언어는 무엇이며, 수신자 언어의 번역 템플릿이 없을 때 어느 기본 언어로 대체하나요?',
        '알림 템플릿의 변수 중 값이 없으면 대체 문구로 치환할 선택 변수와, 누락 시 발송 자체를 막아야 할 필수 변수는 무엇인가요?',
        '푸시·SMS·인앱·이메일 등 채널별 최대 글자 수와 긴 변수 값(긴 제목 등)의 말줄임 기준은 어떻게 되나요?',
        '모바일 푸시나 메신저 발송이 실패(토큰 만료 등)했을 때 이메일·SMS 등 대체 채널로 자동 전환할 알림 유형은 무엇인가요?',
        '운영자가 템플릿 문구를 수정했을 때 이미 예약 대기 중인 알림에는 수정본이 반영되나요, 기존 버전이 유지되나요?',
      ],
      example: '예시: 멘션 알림 템플릿에서 수신자 언어(ko/en)에 맞춰 문구를 고르고 발신자 표시 이름이 비어 있으면 "팀원"으로 대체하며, 긴 문서 제목은 푸시에서 30자로 줄이고, 보안 경고 푸시가 유효한 기기 토큰 부재로 실패하면 즉시 이메일로 대체 발송하도록 구성할 수 있습니다. 실제 폴백 대기 시간과 문자 발송 비용 기준은 운영 환경에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'character-budget-feedback', reason: '푸시·SMS 등 글자 수 제한이 엄격한 채널 템플릿을 작성할 때 치환 변수 길이를 고려한 남은 글자 수를 안내하는 표현에 참고할 수 있습니다. 실제 템플릿 엔진은 별도로 구현해야 합니다.' },
        { id: 'underline-content-tabs', reason: '하나의 알림 이벤트에 대해 인앱·푸시·이메일 탭과 한국어·영어 미리보기를 전환하며 확인하는 표현에 참고할 수 있습니다. 실제 발송과 폴백 라우팅은 구현하지 않습니다.' },
      ],
      promptSnippet: '알림·메시징 서비스의 다국어 템플릿, 치환 변수 누락 방어, 발송 채널 실패 시 대체 경로(Failover) 흐름을 설계해 줘. 먼저 수신자 기준 언어 선택과 기본 언어 폴백, 필수 변수 누락 시 발송 차단 vs 선택 변수 대체 문구 규칙, 채널별 글자 수·말줄임 기준, 1차 채널 실패 시 대체 채널 전환 조건을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 알림 이벤트별 변수 스키마(필수/선택, 대체 기본값, 최대 길이)와 다국어 템플릿 구조.\n2. 수신자 언어 매칭, 미번역 언어 폴백, `null`/`undefined`/원시 토큰 노출 방지 규칙.\n3. 채널별(인앱·푸시·이메일·SMS) 서식 차이와 긴 문자열 말줄임 처리.\n4. 1차 채널 발송 실패·무효 토큰 감지 시 대체 채널 전환 및 읽음 확인 시 후속 발송 취소.\n5. 채널/언어 탭 에디터·글자 수 예산 표시·빈 값/긴 값 미리보기·실패 로그의 연결.\n단순 문자열 치환만으로 누락 방어나 다국어 처리가 끝난다고 가정하지 말고, 예시 정책과 디자인 데모를 실제 알림 템플릿·라우팅 엔진으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Notifications & Messaging',
      title: 'Localized notification templates, missing-variable fallbacks and channel failover',
      summary: 'Render notifications in the recipient’s locale, guard against missing template variables, and define channel failover rules.',
      overview: 'A single notification event often renders across push, in-app, email and SMS for recipients in different languages. If an optional profile name is blank and the user receives `Hello undefined` or `{{user_name}}`, or if a critical alert silently drops because a push token expired, the experience breaks down. Combine recipient-locale resolution, safe variable fallbacks and channel failover rules. These concepts are design references, not default provider configurations.',
      concepts: [
        { name: 'Recipient-locale resolution and default-locale fallback', description: 'Select the template matching the recipient’s language preference (not the actor’s), and fall back cleanly to the default product locale if a translation is missing.' },
        { name: 'Required variables versus optional fallback copy', description: 'Provide safe fallback strings (such as "a teammate") for optional variables, and block sending with an error log if a required variable (such as a verification code or amount) is missing.' },
        { name: 'Per-channel formatting and truncation limits', description: 'Tailor copy length and formatting per channel—concise plain text for push and SMS versus rich layouts for email—and truncate long interpolated titles safely.' },
        { name: 'Primary channel failure and failover routing', description: 'When a primary channel fails (for example, an unregistered push token) or remains unacknowledged past a threshold, route eligible high-priority alerts to a fallback channel like email.' },
      ],
      workflow: [
        { name: 'Define the event payload schema and channel templates', description: 'Declare required and optional variables with fallback defaults, and author localized templates for each active channel.' },
        { name: 'Preview templates with sample, empty and long values', description: 'Test how every channel and locale renders when optional fields are omitted or when interpolated strings are unusually long.' },
        { name: 'Validate variables and render per recipient at send time', description: 'Resolve the recipient’s locale, apply fallback copy for blank optional fields, and halt delivery if a required field is missing.' },
        { name: 'Prune invalid tokens and trigger channel failover', description: 'Mark dead push tokens inactive on permanent errors and dispatch the configured fallback channel if the alert has not already been seen.' },
      ],
      pitfalls: [
        { name: 'Using the actor’s locale instead of the recipient’s locale', description: 'If a user with an English UI comments on a Korean teammate’s task, the notification must still render in the recipient’s preferred language.' },
        { name: 'Sending literal `undefined`, `null` or `{{variable}}` in live messages', description: 'Never interpolate raw nullish values into templates; enforce explicit fallback strings or fail closed before sending.' },
        { name: 'Triggering noisy multi-channel duplicates on slow responses', description: 'Only fail over on confirmed delivery failure or after a defined grace window, and cancel fallback sends if the user already read the in-app item.' },
      ],
      questions: [
        'Which locales are supported for notifications, and which default locale is used when a recipient’s language has no translation?',
        'Which template variables are optional (using fallback copy when blank) and which are required (blocking delivery if missing)?',
        'How do character limits and truncation rules differ across push, SMS, in-app and email templates?',
        'When a push or chat delivery fails due to an expired token or error, which notification categories fail over to email or SMS?',
        'When an operator edits a template, do already-queued scheduled notifications use the updated template or the version locked at scheduling?',
      ],
      example: 'Example: a mention alert could render in the recipient’s locale, fall back to "A teammate" if the sender’s display name is blank, truncate item titles to 30 characters in push notifications, and fall back to email if a critical security push fails with no valid device token. Confirm actual failover windows and SMS cost rules before adopting this setup.',
      relatedDesigns: [
        { id: 'character-budget-feedback', reason: 'A reference for showing remaining character budgets on push or SMS templates while accounting for variable length. Real template rendering needs separate implementation.' },
        { id: 'underline-content-tabs', reason: 'A reference for switching between in-app, push and email previews or locale tabs in a template editor. Real failover delivery needs separate implementation.' },
      ],
      promptSnippet: 'Help design localized notification templates, missing-variable fallbacks and channel failover workflows. First confirm recipient-locale resolution and default-locale fallbacks, required versus optional variable handling, per-channel character and truncation limits, and failover rules when a primary channel fails. Do not assume undecided rules.\nBased on the answers, describe:\n1. Event payload schema (required versus optional variables, fallback defaults, max lengths) and localized template structure.\n2. Recipient-locale matching, missing-translation fallback and guards against `null`/`undefined`/raw token output.\n3. Per-channel formatting and safe truncation of long interpolated values.\n4. Failover triggers on invalid tokens or delivery errors, plus suppression if already read in-app.\n5. How the channel/locale tab editor, character budget indicator, empty/long-value preview and failure logs connect.\nDo not assume simple string replacement handles missing values or localization safely, and do not mistake example policies or design demos for a real template and routing engine.',
    },
  },
  sources: [
    { title: 'Unicode ICU Documentation — MessageFormat and Localization Fallbacks', url: 'https://unicode-org.github.io/icu/userguide/format_parse/messages/' },
    { title: 'Firebase Cloud Messaging Docs — Manage registration tokens and delivery errors', url: 'https://firebase.google.com/docs/cloud-messaging/manage-tokens' },
  ],
}, {
  id: 'notification-mention-thread-subscription-and-mute',
  aliases: {
    ko: ['스레드 구독 팔로우', '자동 구독 조건과 알림 끄기', '개별 대화방 뮤트', '직접 멘션 예외 알림'],
    en: ['thread subscription and following', 'auto-follow triggers', 'per-thread muting', 'direct mention override'],
  },
  useCases: {
    ko: ['사용자가 작성·댓글·멘션으로 참여한 문서나 스레드를 자동으로 구독(Follow)하게 할 때', '관심 없는 개별 스레드나 시끄러운 대화방의 후속 댓글 알림만 선택해서 끌(Mute) 때', '뮤트한 대화방이라도 나를 직접 지목한 `@이름` 멘션은 예외로 알릴지 결정할 때', '일시적 알림 끄기(1시간·내일 아침까지)와 영구 구독 해제를 구분해 제공할 때'],
    en: ['Automatically subscribing users to a thread when they author, comment or get mentioned', 'Letting users unfollow a single noisy thread without disabling global comment alerts', 'Deciding whether direct `@username` mentions bypass a muted channel or thread', 'Offering temporary mute durations (1 hour, until tomorrow) alongside permanent unfollow'],
  },
  keywords: {
    ko: ['스레드 구독', '팔로우', '자동 구독', '알림 끄기', '뮤트', '일시 중지', '직접 멘션', '전체 멘션 차단', '참여자 알림'],
    en: ['thread subscription', 'follow thread', 'auto-follow', 'mute thread', 'snooze notifications', 'direct mention', 'here and channel mentions', 'unfollow', 'watcher'],
  },
  text: {
    ko: {
      domain: '알림·메시징',
      title: '스레드 구독·자동 팔로우 조건과 개별 대화방 알림 끄기',
      summary: '전역 알림 설정과 개별 스레드·대화방의 구독 및 뮤트 상태를 분리하고, 직접 멘션 예외 규칙을 연결합니다.',
      overview: '전역 알림 설정만 있으면 사용자는 시끄러운 게시물 하나 때문에 댓글 알림 전체를 꺼 버리게 됩니다. 내가 글을 쓰거나 댓글을 달았을 때 그 스레드를 자동으로 구독(Follow)하는 규칙, 더 이상 알림을 받고 싶지 않은 개별 스레드만 구독 해제하거나 일시 뮤트하는 기능, 그리고 뮤트 상태에서도 직접 `@이름` 멘션은 깨울지 여부를 함께 정의해야 합니다. 아래 내용은 스레드 구독과 뮤트 설계를 위한 참고이며 특정 우선순위 규칙을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '전역 카테고리 설정과 개별 대상(스레드·방) 구독 분리', description: '계정 전체의 댓글 알림 스위치와 별개로, 특정 작업·문서·대화 스레드마다 구독 중(Following) 또는 알림 끄기(Muted) 상태를 개별 관리합니다.' },
        { name: '자동 구독(Auto-follow) 발생 조건', description: '문서 작성, 댓글 작성, 담당자 배정, `@멘션` 지목 시 해당 항목을 자동으로 구독 상태로 전환하고 이후 달리는 일반 댓글도 알릴지 정합니다.' },
        { name: '구독 해제(Unfollow)와 시간제 뮤트(Mute) 구분', description: '내가 빠질 때까지 새 댓글 알림을 안 받는 구독 해제와, 1시간·24시간 등 지정한 시간 동안만 알림을 멈춘 뒤 자동 복귀하는 일시 뮤트를 구분합니다.' },
        { name: '직접 멘션(`@이름`)과 전체 호출(`@all`, `@here`)의 뮤트 통과 여부', description: '대화방이나 스레드를 뮤트했을 때 `@here` 같은 단체 호출은 막더라도 개인을 콕 집은 `@이름` 멘션은 알림을 보낼지, 완전 차단할지 결정합니다.' },
      ],
      workflow: [
        { name: '활동 시 자동 구독 연결 및 현재 구독 상태 표시하기', description: '댓글을 남기거나 담당자로 지정되면 상단이나 하단에 "구독 중(새 댓글 알림 받음)" 상태를 표시해 왜 알림이 오는지 알기 쉽게 합니다.' },
        { name: '개별 스레드·알림함에서 원클릭 구독 해제·뮤트하기', description: '스레드 상세 화면뿐 아니라 인앱 알림함의 개별 항목 메뉴에서도 바로 해당 스레드 알림을 끄거나 일시 중지할 수 있게 합니다.' },
        { name: '새 이벤트 발생 시 전역 설정·구독·뮤트·멘션 우선순위 계산하기', description: '댓글이 달리면 구독자 목록을 찾되, 뮤트 중인 사용자는 제외하고 직접 `@멘션` 예외 규칙에 해당하는지만 판별해 발송합니다.' },
        { name: '일시 뮤트 만료 복귀 및 재참여 시 재구독 처리하기', description: '시간제 뮤트 기한이 끝나면 원래 구독 상태로 돌리고, 사용자가 직접 구독 해제한 스레드에 다시 댓글을 달았을 때 자동 재구독할지 정합니다.' },
      ],
      pitfalls: [
        { name: '스레드 하나가 시끄러울 때 그 스레드만 끄는 버튼이 없어 전체 알림을 끄게 만들기', description: '알림 아이템과 스레드 헤더에 개별 구독 해제(벨 아이콘)를 두어 중요한 다른 업무 알림까지 끊기지 않게 하세요.' },
        { name: '사용자가 직접 구독을 껐는데 다른 사람이 일반 댓글을 달았다고 다시 자동 구독시키기', description: '명시적으로 구독 해제(Unfollow)한 기록은 존중해야 하며, 다시 자동 구독되는 조건(직접 재멘션 등)을 엄격히 제한하세요.' },
        { name: '왜 나에게 이 알림이 왔는지 이유(구독 중, 멘션됨, 담당자)를 표시하지 않기', description: '알림 문구에 "구독 중인 스레드의 새 댓글"인지 "나를 직접 멘션함"인지 밝혀야 사용자가 적절한 해제 방식을 고를 수 있습니다.' },
      ],
      questions: [
        '사용자가 글 작성·댓글 작성·멘션 지목·담당 배정 중 어떤 행동을 했을 때 해당 스레드를 자동 구독(Follow)하나요?',
        '개별 스레드나 대화방 알림을 끌 때 영구 구독 해제 외에 1시간·내일까지 같은 시간제 일시 뮤트를 지원하나요?',
        '뮤트하거나 구독 해제한 대화방·스레드에서 누군가 나를 직접 `@이름`으로 멘션하면 알림을 보내나요, 그것도 차단하나요?',
        '사용자가 직접 구독 해제한 스레드에 본인이 다시 댓글을 남기면 자동으로 다시 구독 상태로 바뀌나요?',
        '단체 호출(`@all`, `@channel`, `@here`)은 어떤 권한을 가진 사용자만 쓸 수 있으며 몇 명 이상일 때 확인 경고를 띄우나요?',
      ],
      example: '예시: 작업에 댓글을 남기거나 멘션되면 자동으로 스레드를 구독하되, 알림함이나 스레드 상단에서 언제든 구독 해제 또는 24시간 뮤트를 선택할 수 있고, 구독을 껐더라도 나를 직접 `@이름`으로 지목한 새 멘션은 인앱 알림으로만 표시하도록 구성할 수 있습니다. 실제 직접 멘션 통과 여부와 단체 멘션 제한 인원은 팀 규칙에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'unread-notification-badge', reason: '구독 중인 스레드의 일반 새 소식과 직접 멘션 건수를 구분해 표시하는 표현에 참고할 수 있습니다. 실제 구독자 판별과 뮤트 타이머는 별도로 구현해야 합니다.' },
        { id: 'dismissible-inline-banner', reason: '현재 스레드가 뮤트 상태이거나 자동 구독되었음을 알리고 바로 설정을 바꿀 수 있는 배너 표현에 참고할 수 있습니다. 실제 알림 억제 처리는 구현하지 않습니다.' },
      ],
      promptSnippet: '알림·메시징 서비스의 스레드 구독(Follow), 자동 팔로우 조건, 개별 대화방·스레드 뮤트 흐름을 설계해 줘. 먼저 자동 구독이 켜지는 행동 조건, 영구 구독 해제와 시간제 뮤트 구분, 뮤트 상태에서 직접 `@이름` 멘션과 단체 호출(`@here`)의 통과 여부, 수동 구독 해제 후 재참여 시 처리 기준을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 전역 알림 설정, 개별 스레드 구독/해제, 시간제 뮤트 간의 우선순위 규칙.\n2. 작성·댓글·배정·멘션에 따른 자동 구독 전환과 명시적 해제 상태 보존.\n3. 뮤트된 대상에서 일반 댓글, 단체 호출(`@all`/`@here`), 직접 `@멘션`의 발송/차단 구분.\n4. 시간제 뮤트 만료 시 자동 복귀 및 대량 단체 멘션 실행 전 확인 경고.\n5. 스레드 상단 구독/뮤트 토글·알림함 빠른 뮤트 메뉴·수신 사유 표시의 연결.\n전역 알림 설정 하나로 개별 스레드 구독을 대신할 수 있다고 가정하지 말고, 예시 정책과 디자인 데모를 실제 구독 라우팅 엔진으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Notifications & Messaging',
      title: 'Thread subscriptions, auto-follow triggers and per-thread muting',
      summary: 'Separate global preferences from per-thread subscriptions and mutes, and define auto-follow triggers and direct-mention overrides.',
      overview: 'If users only have a global switch for comment notifications, one noisy thread will push them to turn off alerts for the entire workspace. Products need per-thread subscriptions (following), clear auto-follow rules when someone comments or gets mentioned, timed or permanent mutes for noisy rooms, and explicit rules for whether a direct `@username` mention pierces a mute. These concepts are design references, not default routing priorities.',
      concepts: [
        { name: 'Global preferences versus per-item subscriptions', description: 'Evaluate item-level subscription or mute state alongside account-wide category preferences so users can silence one thread without disabling all comments.' },
        { name: 'Auto-follow triggers and explicit unfollow', description: 'Automatically subscribe users when they create an item, post a reply, are assigned or get `@mentioned`, while respecting an explicit manual unfollow.' },
        { name: 'Permanent unfollow versus timed snooze/mute', description: 'Distinguish unsubscribing from future replies indefinitely from muting a thread or channel for a set duration (such as 1 hour or until tomorrow).' },
        { name: 'Direct `@mention` overrides versus broadcast `@here`/`@all`', description: 'Define whether muting a channel suppresses broadcast mentions (`@here`, `@channel`) while still allowing direct personal `@username` mentions through.' },
      ],
      workflow: [
        { name: 'Auto-subscribe on participation and show follow state', description: 'Flip the thread badge to Following when the user participates, and show why they are receiving updates (for example, "Following because you commented").' },
        { name: 'Provide one-click unfollow or timed mute from thread and inbox', description: 'Let users unfollow or mute a noisy thread directly from the notification row or thread header without opening global settings.' },
        { name: 'Evaluate mute, subscription and mention priority on new events', description: 'Filter subscribers on each reply, suppress muted users for ordinary replies and `@here` broadcasts, and apply the agreed rule for direct `@mentions`.' },
        { name: 'Expire timed mutes and warn on large broadcast mentions', description: 'Restore normal delivery automatically when a timed mute expires, and ask for confirmation before someone triggers `@all` in a large room.' },
      ],
      pitfalls: [
        { name: 'Forcing users into global settings to silence one active thread', description: 'Always surface an item-level Unfollow or Mute action on the thread and inside each notification row.' },
        { name: 'Silently re-subscribing a user who explicitly unfollowed a thread', description: 'Once a user manually clicks Unfollow, ordinary replies from others must not re-enable their subscription.' },
        { name: 'Hiding the reason a notification was delivered', description: 'Label notifications clearly ("Mentioned you" versus "New reply in a followed thread") so users know whether to unfollow the thread or adjust mention rules.' },
      ],
      questions: [
        'Which actions (creating, commenting, being assigned, being `@mentioned`) automatically subscribe a user to a thread?',
        'Can users mute a thread or room for a set duration (such as 1 hour or 24 hours) in addition to unfollowing permanently?',
        'If a user mutes or unfollows a thread, does a new direct `@username` mention still notify them or is it suppressed too?',
        'If a user manually unfollowed a thread and later posts a new reply in it, are they automatically re-subscribed?',
        'Who can use broadcast mentions (`@all`, `@channel`, `@here`), and above what member count is a confirmation warning shown?',
      ],
      example: 'Example: a collaboration app could auto-follow threads when a user comments or is mentioned, let them unfollow or mute for 24 hours from the inbox row, block `@here` in muted rooms, and still deliver an in-app badge if someone directly `@mentions` them by name. Confirm actual mention-override rules and broadcast limits before adopting this setup.',
      relatedDesigns: [
        { id: 'unread-notification-badge', reason: 'A reference for distinguishing unread counts or badges between general thread activity and direct mentions. Real subscription evaluation needs separate implementation.' },
        { id: 'dismissible-inline-banner', reason: 'A reference for showing a thread’s current muted or auto-followed state with a quick toggle to change it. Real mute timers need separate implementation.' },
      ],
      promptSnippet: 'Help design thread subscriptions, auto-follow triggers and per-thread or per-room muting. First confirm which actions trigger auto-follow, how permanent unfollow differs from timed mutes, whether direct `@username` mentions bypass a mute while `@here`/`@all` are suppressed, and what happens when an unfollowed user replies again. Do not assume undecided rules.\nBased on the answers, describe:\n1. Priority order across global preferences, item-level subscription, explicit unfollow and timed mute.\n2. Auto-follow triggers and preservation of explicit unfollow choices.\n3. Delivery versus suppression rules for ordinary replies, broadcast mentions (`@here`/`@all`) and direct `@username` mentions.\n4. Timed-mute expiration behavior and confirmation warnings for large broadcast mentions.\n5. How the thread follow/mute toggle, inbox quick-mute action and delivery-reason labels connect.\nDo not assume global notification settings replace per-thread subscription controls, and do not mistake example policies or design demos for a real subscription routing engine.',
    },
  },
  sources: [
    { title: 'GitHub Docs — Managing your subscriptions and notifications on GitHub', url: 'https://docs.github.com/en/account-and-profile/managing-subscriptions-and-notifications-on-github' },
    { title: 'Slack Help Center — Mute channels and direct messages', url: 'https://slack.com/help/articles/204411433-Mute-channels-and-direct-messages' },
  ],
}];
