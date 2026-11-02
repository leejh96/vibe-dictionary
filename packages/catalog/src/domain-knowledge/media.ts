import type { DomainKnowledge } from '../domain-knowledge';

export const MEDIA_KNOWLEDGE: DomainKnowledge[] = [{
  id: 'file-upload-processing-and-access-control',
  aliases: {
    ko: ['파일 업로드', '미디어 관리', '이미지 동영상 업로드', '첨부파일 권한', '썸네일 인코딩 대기'],
    en: ['file upload system', 'media management', 'image and video upload', 'attachment access control', 'async media processing'],
  },
  useCases: {
    ko: ['문서·이미지·동영상 파일 업로드를 제공하는 서비스를 만들 때', '허용 확장자·용량 검증과 업로드 진행·취소·재시도를 설계할 때', '업로드 전송 완료와 썸네일·인코딩·바이러스 검사 완료 상태를 구분할 때', '비공개 첨부파일의 접근 권한과 미연결(고아) 파일 정리를 정할 때'],
    en: ['Building a service with document, image or video uploads', 'Designing file-type and size validation with progress, cancel and retry flows', 'Separating transfer completion from thumbnailing, transcoding or virus-scan readiness', 'Defining private attachment access control and orphaned-file cleanup'],
  },
  keywords: {
    ko: ['파일 업로드', '미디어', '첨부파일', '용량 제한', '파일 형식', '업로드 진행률', '멀티파트 업로드', '썸네일 생성', '인코딩', '변환 대기', '서명된 URL', '고아 파일', '고아 파일 정리'],
    en: ['file upload', 'media', 'attachment', 'size limit', 'file type', 'upload progress', 'multipart upload', 'thumbnail generation', 'transcoding', 'processing state', 'signed URL', 'presigned url', 'orphan cleanup'],
  },
  text: {
    ko: {
      domain: '파일·미디어',
      title: '업로드 검증·비동기 변환 대기와 접근 범위·파일 정리',
      summary: '파일 전송 완료와 실제 사용 가능 상태를 구분하고, 검증·변환·접근 권한·정리 주기를 연결합니다.',
      overview: '파일을 선택해 서버나 스토리지에 올리는 전송 단계가 끝났다고 해서 곧바로 화면에 안전하게 표시하거나 공유할 수 있는 것은 아닙니다. 용량과 실제 형식 검증, 이미지 리사이징·동영상 인코딩·악성 파일 검사 같은 후처리 대기, 비공개 파일의 열람 권한 확인, 본문 저장 없이 버려진 미연결 파일 정리까지 나누어 설계해야 합니다. 아래 내용은 파일·미디어 흐름을 설계하기 위한 참고이며 특정 스토리지 상품이나 용량 한도를 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '사전 검증과 실제 파일 검사', description: '선택 직후 파일 크기·개수·확장자를 빠르게 안내하되, 확장자 이름만 바꾼 파일을 막기 위해 서버·스토리지 단계의 실제 형식(MIME·시그니처) 검사를 함께 둡니다.' },
        { name: '전송 완료와 변환(후처리) 완료 분리', description: '선택됨 → 전송 중 → 전송 완료(후처리 대기) → 사용 가능 → 실패 상태를 구분합니다. 대용량 영상이나 문서는 후처리 중에도 본문 작성을 이어갈 수 있는지 정합니다.' },
        { name: '파일 생명주기와 미연결 파일(Orphan) 정리', description: '글 작성 중 파일만 먼저 올리고 글을 저장하지 않고 나갔을 때, 연결되지 않은 임시 파일을 언제 정리할지, 기존 파일 교체 시 이전 파일을 언제 지울지 정합니다.' },
        { name: '공개 자산과 비공개 첨부 권한', description: '누구나 볼 수 있는 공개 이미지와 권한이 있는 사용자만 열람해야 하는 비공개 첨부를 구분합니다. 파일 주소만 알면 우회 접근되지 않도록 만료 시간이나 권한 확인 방식을 정합니다.' },
        { name: '부분 실패·취소와 재시도', description: '여러 파일을 올리는 중 일부만 실패하거나 사용자가 취소했을 때 성공한 파일은 유지하고 실패한 항목만 다시 시도하거나 제거할 수 있게 합니다.' },
      ],
      workflow: [
        { name: '선택 시점에 허용 조건과 예상 상태 안내하기', description: '허용 형식·최대 용량·최대 개수를 미리 알리고, 조건에 맞지 않는 파일은 전송 전에 이유와 함께 구분해 보여 줍니다.' },
        { name: '전송 진행과 취소·재시도 연결하기', description: '파일별 업로드 상태와 취소 동작을 제공하고, 네트워크 끊김 시 전체 입력을 잃지 않고 해당 파일만 다시 올릴 수 있게 합니다.' },
        { name: '비동기 후처리 상태와 대체 미리보기 표시하기', description: '썸네일 생성·인코딩·검사가 진행 중일 때는 변환 대기 표시를 보여 주고, 완료되면 미리보기나 재생 화면으로 전환합니다.' },
        { name: '상위 문서 저장·삭제와 파일 권한 동기화하기', description: '상위 글이나 항목이 저장·비공개 전환·삭제될 때 연결된 첨부파일의 접근 권한과 보관·파기 상태를 함께 맞춥니다.' },
      ],
      pitfalls: [
        { name: '전송 100%를 곧바로 변환 완료로 표시하기', description: '네트워크 전송이 끝났어도 서버 저장이나 영상 인코딩이 남았을 때 바로 재생 링크를 열면 깨진 파일처럼 보입니다. 전송 완료와 준비 완료를 구분하세요.' },
        { name: '파일은 먼저 삭제하고 본문 저장은 실패해 깨진 참조 남기기', description: '첨부파일 교체 시 본문 저장이 확정되기 전에 기존 파일을 영구 삭제하면 저장 실패나 취소 후 원래 파일도 사라집니다.' },
        { name: '비공개 문서의 첨부파일을 고정 공개 URL로 노출하기', description: '문서 화면에는 권한 검사를 두고 정작 첨부파일 경로는 아무나 열 수 있으면 정보가 유출됩니다. 파일 다운로드 경로에도 권한 기준을 적용하세요.' },
      ],
      questions: [
        '허용할 파일 형식·개별 최대 용량·전체 첨부 개수는 무엇이며, 다중 파일 업로드를 지원하나요?',
        '이미지 리사이즈·썸네일 생성·영상 인코딩·보안 검사 등 비동기 후처리가 필요한가요? 후처리 중에도 문서를 먼저 저장할 수 있나요?',
        '여러 파일 중 일부만 업로드나 변환에 실패했을 때 나머지 파일과 상위 폼 저장은 어떻게 처리하나요?',
        '첨부파일은 전체 공개인가요, 특정 권한을 가진 사용자만 볼 수 있나요? 상위 문서가 비공개·삭제되면 파일 접근은 어떻게 바뀌나요?',
        '파일을 교체하거나 업로드 후 문서를 저장하지 않고 이탈했을 때 임시·이전 파일은 언제 정리하나요?',
        '모바일 촬영 이미지의 회전 정보(EXIF)나 개인정보(위치 메타데이터) 제거가 필요한가요?',
      ],
      example: '예시: 포트폴리오 서비스에서 이미지·영상 선택 시 50MB 이하 조건을 먼저 확인하고, 영상은 업로드 직후 인코딩 대기 배지를 표시한 채 설명 글 저장을 허용하며, 작성 취소로 남은 미연결 파일은 24시간 뒤 정리하도록 구성할 수 있습니다. 실제 용량 한도·변환 파이프라인·권한 방식은 운영 환경에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'native-file-attachment', reason: '선택한 파일의 원문 이름과 크기를 표시하고 파일 교체·제거와 포커스 복귀를 연결하는 표현에 참고할 수 있습니다. 실제 서버 전송과 용량 검증은 별도로 구현해야 합니다.' },
        { id: 'ly-file-list-grid-view', reason: '업로드된 파일들의 순서와 형식을 유지하면서 목록 보기와 격자 타일 보기를 전환하는 표현에 참고할 수 있습니다. 실제 파일 열기·다운로드·썸네일 생성은 구현하지 않습니다.' },
      ],
      promptSnippet: '파일·미디어 업로드와 첨부 관리 흐름을 설계해 줘. 먼저 허용 형식·용량·개수 제한, 업로드 완료와 비동기 변환(썸네일·인코딩·검사) 대기 상태의 분리, 다중 업로드 중 부분 실패 처리, 공개/비공개 접근 권한, 미연결(고아) 파일 및 교체 파일 정리 정책을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 클라이언트 사전 검증과 서버·스토리지 실제 형식·용량 검증 기준.\n2. 선택됨·전송 중·후처리 대기·사용 가능·실패·취소 상태 전환과 상위 문서 저장 조건.\n3. 다중 파일 업로드 시 개별 취소·재시도와 기존 파일 교체 시 안전한 보존·정리 순서.\n4. 비공개 첨부파일의 접근 권한 검증 및 상위 항목 삭제·권한 변경 시 연동.\n5. 파일 선택·업로드 진행/오류 표시·변환 대기 배지·첨부 목록/격자 화면의 연결.\n클라이언트 확장자 확인이나 전송 100%만을 최종 사용 가능 상태로 단정하지 말고, 예시 정책과 디자인 데모를 실제 스토리지·미디어 변환 시스템으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'File & Media Management',
      title: 'Upload validation, async media processing, access scope and cleanup',
      summary: 'Separate file transfer completion from processing readiness, and connect validation, access control and orphan cleanup.',
      overview: 'Finishing a network upload does not always mean a file is safe and ready to display. Validating real file types and sizes, waiting for asynchronous thumbnailing, transcoding or malware scanning, enforcing private attachment permissions, and cleaning up abandoned uploads all require distinct states. These concepts are design references, not default storage limits or pipeline rules for a specific infrastructure.',
      concepts: [
        { name: 'Pre-upload checks versus server verification', description: 'Check file size, count and extension immediately for fast user guidance, and verify actual file signatures and limits on the server or storage layer.' },
        { name: 'Transfer completion versus processing readiness', description: 'Distinguish selected, uploading, uploaded (processing), ready and failed states, and decide whether forms can be saved while media transcoding finishes.' },
        { name: 'Lifecycle and orphaned-file cleanup', description: 'Define when uploaded files that were never attached to a saved record are purged, and keep existing files until a replacement save succeeds.' },
        { name: 'Public assets versus private attachments', description: 'Separate public media from private attachments that require permission checks or time-limited signed URLs so direct file links cannot bypass access rules.' },
        { name: 'Partial failures, cancellation and retry', description: 'In multi-file uploads, allow canceling or retrying a failed file without discarding files that already succeeded.' },
      ],
      workflow: [
        { name: 'Communicate constraints at selection time', description: 'State allowed formats, size limits and maximum file counts upfront, and flag ineligible files before transfer begins.' },
        { name: 'Connect transfer progress, cancel and retry', description: 'Show per-file progress and let users cancel or retry individual transfers without losing surrounding form inputs.' },
        { name: 'Represent async processing and fallback previews', description: 'Display a processing state while thumbnails, transcoding or scans run, then swap in the ready preview or failure action.' },
        { name: 'Align file access and cleanup with parent records', description: 'Sync attachment access and deletion when the parent document is saved, restricted or deleted.' },
      ],
      pitfalls: [
        { name: 'Treating 100% network transfer as ready-to-play media', description: 'Opening a video or document before storage finalization or transcoding completes results in broken previews. Separate transfer from processing completion.' },
        { name: 'Deleting an old attachment before the replacement form save succeeds', description: 'If the user cancels editing or the save fails after the old file was purged, the record loses its file. Delete replaced files only after commit.' },
        { name: 'Serving private attachments from unauthenticated public URLs', description: 'Checking permissions on the page while leaving raw attachment URLs permanently public exposes sensitive files.' },
      ],
      questions: [
        'Which file types, per-file size limits and maximum counts are allowed, and are multi-file uploads supported?',
        'Does uploaded media require async processing (thumbnails, transcoding, scanning), and can the parent record be saved before processing finishes?',
        'If one file in a batch fails validation or processing, how should the remaining files and parent save behave?',
        'Are attachments public or restricted, and how does file access change when the parent record is restricted or deleted?',
        'When are abandoned uploads or replaced files cleaned up?',
        'Should image orientation (EXIF) or embedded location metadata be normalized or stripped on upload?',
      ],
      example: 'Example: a portfolio app could validate a 50 MB limit on selection, allow saving a project while uploaded video shows an encoding badge, and purge unattached temporary uploads after 24 hours. Confirm actual size limits, processing steps and access-control mechanisms before adopting this setup.',
      relatedDesigns: [
        { id: 'native-file-attachment', reason: 'A reference for displaying selected file names and byte sizes with replace/remove actions and focus return. Real upload transfer and server validation need separate implementation.' },
        { id: 'ly-file-list-grid-view', reason: 'A reference for switching uploaded files between list and grid layouts while preserving order and file types. It does not implement file opening, downloads or thumbnail generation.' },
      ],
      promptSnippet: 'Help design a file and media upload workflow. First confirm allowed file types/sizes/counts, separation between upload transfer and async processing readiness, partial-failure handling in batches, public versus private access control, and cleanup rules for abandoned or replaced files. Do not assume undecided rules.\nBased on the answers, describe:\n1. Client pre-checks and server/storage verification rules.\n2. State transitions across selected, uploading, processing, ready, canceled and failed files, and how they interact with saving the parent record.\n3. Per-file cancel/retry handling and safe replacement ordering.\n4. Access-control enforcement for private attachments and synchronization with parent deletion or permission changes.\n5. How file pickers, progress/error rows, processing badges and list/grid views connect.\nDo not equate client extension checks or 100% upload transfer with final media readiness, and do not mistake example policies or design demos for real storage or transcoding infrastructure.',
    },
  },
  sources: [
    { title: 'OWASP Cheat Sheet Series — File Upload Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html' },
    { title: 'Cloudflare Docs — Presigned URLs and R2 access control', url: 'https://developers.cloudflare.com/r2/api/s3/presigned-urls/' },
  ],
}, {
  id: 'file-folder-permission-inheritance-and-move',
  aliases: {
    ko: ['폴더 권한 상속', '폴더 이동 권한 변경', '공유 폴더 파일 이동', '파일 이름 변경 공유 링크'],
    en: ['folder permission inheritance', 'moving shared files', 'folder move access rules', 'persistent file share links'],
  },
  useCases: {
    ko: ['계층형 폴더와 하위 파일의 열람·편집 권한 상속을 설계할 때', '파일이나 폴더를 다른 상위 폴더로 옮길 때 권한 변화와 경고를 안내할 때', '폴더 이름을 바꾸거나 위치를 옮겨도 기존 공유 링크가 깨지지 않게 유지할 때', '상위 폴더 권한보다 좁거나 넓은 하위 항목 개별 예외 권한을 관리할 때'],
    en: ['Designing hierarchical folder and child-file access inheritance', 'Warning users how access changes when moving files between shared folders', 'Preserving existing share links across file renames and folder moves', 'Managing item-level access overrides inside a shared parent folder'],
  },
  keywords: {
    ko: ['폴더 권한', '권한 상속', '폴더 이동', '파일 이동', '이름 변경', '고유 식별자', '공유 폴더', '하위 폴더', '개별 권한 예외'],
    en: ['folder permissions', 'permission inheritance', 'folder move', 'file move', 'file rename', 'immutable file ID', 'shared folder', 'subfolder', 'access override'],
  },
  text: {
    ko: {
      domain: '파일·미디어',
      title: '폴더 이동·이름 변경 시 하위 파일 권한 상속과 공유 링크 유지',
      summary: '상위 폴더 이동에 따른 하위 항목 권한 재계산과 고유 ID 기반 공유 링크 유지를 연결합니다.',
      overview: '클라우드 드라이브나 문서함에서 파일을 다른 폴더로 옮기면 단순히 경로만 바뀌는 것이 아니라 열람·편집 가능한 사람 목록이 함께 바뀝니다. 상위 폴더에서 물려받은 권한과 개별 파일에 직접 부여한 권한을 구분하고, 폴더 이름을 바꾸거나 이동해도 기존 공유 링크가 깨지지 않도록 경로 문자열 대신 고유 식별자(ID)로 연결해야 합니다. 아래 내용은 폴더 이동·권한 상속 흐름을 설계하기 위한 참고이며 특정 드라이브 제품의 권한 정책을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '상위 폴더 상속 권한과 개별 직접 권한 구분', description: '폴더로부터 물려받은 권한(Inherited)과 특정 파일에 직접 추가한 권한(Direct)을 분리해 저장해야 이동 후 어느 권한을 교체할지 계산할 수 있습니다.' },
        { name: '폴더 이동 시 권한 재계산과 사전 안내', description: '비공개 폴더의 파일을 팀 공유 폴더로 옮기거나 반대로 옮길 때, 새로 접근권을 얻거나 잃는 사람이 누구인지 이동 확정 전에 알려 줍니다.' },
        { name: '경로 문자열과 분리된 고유 식별자(ID) 링크', description: '공유 링크를 폴더 이름이나 경로 문자열로만 만들면 이름을 바꿀 때 링크가 깨집니다. 변하지 않는 파일·폴더 ID를 기준으로 링크를 유지합니다.' },
        { name: '순환 이동 방지와 이름 충돌 처리', description: '상위 폴더를 자기 자신의 하위 폴더 안으로 옮기는 순환 이동을 차단하고, 이동 대상 폴더에 같은 이름의 파일이 있을 때 덮어쓰기·이름 변경·취소 규칙을 정합니다.' },
      ],
      workflow: [
        { name: '현재 항목의 상속 권한과 직접 권한 표시하기', description: '권한 설정 창에서 이 권한이 어느 상위 폴더에서 상속되었는지, 이 파일에 직접 지정되었는지 구분해 보여 줍니다.' },
        { name: '이동 대상 폴더 선택과 권한 변경 미리보기', description: '파일·폴더를 옮기기 전에 대상 폴더의 열람 범위와 비교해 권한이 넓어지는지 좁아지는지 확인 안내를 띄웁니다.' },
        { name: '하위 트리 권한 일괄 갱신과 고유 링크 유지하기', description: '이동이 확정되면 기존 상위 폴더 상속분을 새 상위 폴더 상속분으로 교체하고, 기존 고유 ID 공유 링크는 그대로 연결합니다.' },
        { name: '동일 이름 충돌과 이동 되돌리기 처리하기', description: '대상 폴더에 같은 이름이 있으면 선택지를 제시하고, 실수로 옮긴 직후에는 원래 위치와 권한으로 되돌릴 수 있게 합니다.' },
      ],
      pitfalls: [
        { name: '폴더 이름 변경만으로 기존에 보낸 공유 URL이 모두 404가 되기', description: '공유 주소를 폴더 경로 문자열에만 의존하면 정리 작업 한 번에 외부·사내 문서 링크가 모두 끊어집니다. 고유 ID 기반으로 라우팅하세요.' },
        { name: '상위 폴더 이동 시 이전 폴더의 상속 권한이 그대로 남아 유출되기', description: '상속 권한과 직접 부여 권한을 구분하지 않고 단순 누적하면, 보안 폴더로 옮긴 뒤에도 이전 공유 폴더 멤버가 계속 열람하게 됩니다.' },
        { name: '대규모 하위 폴더 이동을 동기 요청 하나로 처리하다 중간에 멈추기', description: '수천 개 하위 파일이 든 폴더를 옮길 때 일부만 권한이 바뀌고 실패하면 정합성이 깨집니다. 원자적 상위 참조 변경이나 비동기 갱신 상태를 두세요.' },
      ],
      questions: [
        '하위 폴더나 파일에서 상위 폴더의 상속 권한을 끊거나 더 좁은 권한으로 제한하는 것을 허용하나요?',
        '파일을 다른 공유 폴더로 옮길 때 개별 파일에 직접 추가해 둔 공유 대상은 유지하나요, 새 폴더 기준으로 초기화하나요?',
        '폴더나 파일 이름을 바꿨을 때 기존 공유 링크는 그대로 동작하나요, 별도 리다이렉트를 두나요?',
        '이동하려는 폴더 안에 동일한 이름의 파일·폴더가 이미 있을 때 기본 동작(덮어쓰기·번호 붙이기·차단)은 무엇인가요?',
        '누가 폴더를 다른 상위 폴더로 이동할 수 있나요(원본 폴더 편집자, 소유자, 대상 폴더 편집자 조합)?',
      ],
      example: '예시: 팀 문서함에서 파일을 다른 부서 폴더로 옮길 때 기존 상위 폴더에서 상속된 권한은 새 폴더 권한으로 교체하되 파일에 직접 초대한 외부 협업자 권한은 유지하고, 권한 확대 경고 모달을 거친 뒤 고유 ID 공유 링크는 그대로 유지하도록 구성할 수 있습니다. 실제 상속 차단 허용 여부와 충돌 규칙은 문서 보안 정책에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'ly-file-list-grid-view', reason: '폴더와 파일 목록을 표 형태와 타일 격자 형태로 전환하며 선택·탐색하는 표현에 참고할 수 있습니다. 실제 폴더 이동과 권한 상속 계산은 별도로 구현해야 합니다.' },
        { id: 'inline-edit-field', reason: '폴더나 파일 이름을 제자리에서 수정하고 저장·취소하는 표현에 참고할 수 있습니다. 실제 중복 이름 검증과 공유 링크 유지는 구현하지 않습니다.' },
      ],
      promptSnippet: '폴더·파일 이동과 이름 변경 시 권한 상속 및 공유 링크 유지 흐름을 설계해 줘. 먼저 상위 폴더 상속 권한과 개별 직접 권한의 구분, 하위 항목의 상속 제한 허용 여부, 폴더 이동 시 권한 변경 기준, 이름·경로 변경 시 공유 링크 유지 방식, 동일 이름 충돌 처리 규칙을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 폴더·파일별 상속 권한과 직접 부여 권한의 표시 및 편집 권한 기준.\n2. 다른 폴더로 이동할 때 권한 확대·축소 사전 안내와 상속 권한 재계산 규칙.\n3. 이름 변경·폴더 이동 후에도 기존 공유 링크가 깨지지 않는 고유 ID 연결 방식.\n4. 순환 폴더 이동 차단, 동일 이름 충돌 선택지, 이동 직후 되돌리기 처리.\n5. 파일 목록/격자 화면·인라인 이름 변경·이동 대상 선택·권한 변경 확인 안내의 연결.\n경로 문자열 변경만으로 공유 링크가 끊기게 두거나 이전 폴더 상속 권한을 누적해 남기지 말고, 예시 정책과 디자인 데모를 실제 스토리지 권한 엔진으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'File & Media Management',
      title: 'Folder moves, permission inheritance and persistent share links',
      summary: 'Connect parent-folder access recalculation on move with ID-based share links that survive renames.',
      overview: 'Moving a file or folder in a workspace changes more than its breadcrumb path—it often changes who can read or edit the item. Separating permissions inherited from a parent folder from permissions granted directly on an item, warning users before a move expands or restricts access, and routing share links by immutable IDs rather than path strings keeps file sharing predictable. These concepts are design references, not default permission rules for a specific storage provider.',
      concepts: [
        { name: 'Inherited versus direct item permissions', description: 'Store parent-inherited permissions separately from direct item grants so moving an item replaces only the old parent inheritance.' },
        { name: 'Access recalculation and pre-move warnings', description: 'Before moving items between private and shared folders, preview who will gain or lose access and require confirmation when exposure changes.' },
        { name: 'Immutable ID links independent of path names', description: 'Resolve share links using a permanent file or folder ID so renaming a folder or reorganizing directories does not break distributed URLs.' },
        { name: 'Cycle prevention and name-collision handling', description: 'Block moving a folder into its own descendant subtree, and define whether duplicate names on move prompt a rename, version replace or cancel.' },
      ],
      workflow: [
        { name: 'Show inherited and direct access sources clearly', description: 'In the sharing dialog, indicate which permissions come from a parent folder and which were granted directly on the file.' },
        { name: 'Preview access changes before confirming a move', description: 'Compare source and destination folder access scopes and alert the user if collaborators will lose access or new members will gain access.' },
        { name: 'Update subtree inheritance while preserving ID links', description: 'Apply the destination folder’s inherited permissions across moved items while keeping existing ID-based share links valid.' },
        { name: 'Resolve name collisions and support immediate undo', description: 'Prompt for duplicate filename resolution in the target folder and allow undoing an accidental move to restore prior location and access.' },
      ],
      pitfalls: [
        { name: 'Breaking every shared URL when a parent folder is renamed', description: 'If share links rely only on human-readable folder paths, routine cleanup breaks bookmarks and embedded links. Route by immutable ID.' },
        { name: 'Retaining old parent permissions after moving to a restricted folder', description: 'Flattening inherited permissions into permanent grants leaves former folder members with lingering access after a file is moved away.' },
        { name: 'Allowing a folder to be moved into its own subfolder', description: 'Without ancestor-chain checks, moving a parent into a child folder orphans the entire subtree from the root directory.' },
      ],
      questions: [
        'Can a subfolder or file restrict or break inheritance from its parent folder?',
        'When a file is moved to another folder, are direct item-level collaborators kept while parent-inherited permissions switch to the new folder?',
        'Do existing share links remain valid without changes when a file or parent folder is renamed or moved?',
        'How should the system handle filename collisions in the destination folder (block, auto-suffix or replace)?',
        'Which role combinations on the source item and destination folder are required to move a file or folder?',
      ],
      example: 'Example: a document workspace could replace parent-inherited permissions with the destination folder’s permissions upon move while preserving direct file guests, show a confirmation dialog when moving a private file into a team folder, and keep ID-based share URLs intact after renames. Confirm actual inheritance override rules and collision behavior before adopting this setup.',
      relatedDesigns: [
        { id: 'ly-file-list-grid-view', reason: 'A reference for browsing files and folders across list and grid layouts. Folder moves and permission inheritance calculations need separate implementation.' },
        { id: 'inline-edit-field', reason: 'A reference for renaming an item inline with save and cancel actions. Duplicate-name validation and link persistence need separate implementation.' },
      ],
      promptSnippet: 'Help design folder moves, permission inheritance and share-link persistence. First confirm how inherited versus direct permissions work, whether children can restrict parent inheritance, how moving an item changes access, whether share links use immutable IDs across renames, and how name collisions are handled. Do not assume undecided rules.\nBased on the answers, describe:\n1. Display and editing rules for parent-inherited versus direct item permissions.\n2. Pre-move warnings and permission recalculation when moving items between folders with different access scopes.\n3. Immutable ID routing so renames and moves do not break existing share links.\n4. Cycle detection for subfolder moves, duplicate-name resolution and undo behavior.\n5. How file list/grid views, inline rename fields, move-target pickers and access-change confirmations connect.\nDo not tie share links solely to mutable path strings or leave old parent permissions attached after a move, and do not mistake example policies or design demos for a real storage authorization engine.',
    },
  },
  sources: [
    { title: 'Google Workspace Admin Help — How sharing permissions inherit in shared drives', url: 'https://support.google.com/a/users/answer/12380484' },
    { title: 'Microsoft Learn — OneDrive and SharePoint file sharing and link persistence', url: 'https://learn.microsoft.com/en-us/sharepoint/turn-external-sharing-on-or-off' },
  ],
}, {
  id: 'file-trash-retention-and-quota-accounting',
  aliases: {
    ko: ['휴지통 보관 기간', '저장 용량 계산', '영구 삭제 복구', '스토리지 용량 초과'],
    en: ['trash retention policy', 'storage quota accounting', 'permanent file purge', 'restore deleted files'],
  },
  useCases: {
    ko: ['삭제한 파일을 즉시 파기하지 않고 일정 기간 휴지통에 보관한 뒤 복구·영구 삭제할 때', '활성 파일·휴지통 파일·이전 버전이 저장 용량(Quota)에 포함되는 기준을 정할 때', '용량 한도 근접·초과 시 신규 업로드 차단과 용량 확보 안내를 설계할 때', '폴더 복구 시 원래 상위 폴더가 이미 삭제된 경우의 복원 위치를 정할 때'],
    en: ['Keeping deleted files in trash for a retention window before permanent purge', 'Defining how active files, trashed items and version history count toward storage quota', 'Designing upload limits and cleanup guidance when a user or workspace exceeds quota', 'Determining where a restored file goes if its original parent folder was deleted'],
  },
  keywords: {
    ko: ['휴지통', '보관 기간', '영구 삭제', '파일 복구', '저장 용량', '스토리지 쿼터', '용량 초과', '용량 회수', '휴지통 비우기'],
    en: ['trash retention', 'soft delete', 'permanent purge', 'file restore', 'storage quota', 'quota accounting', 'over quota', 'space reclamation', 'empty trash'],
  },
  text: {
    ko: {
      domain: '파일·미디어',
      title: '휴지통 보관 기간·영구 삭제와 저장 용량(Quota) 차감·회수 기준',
      summary: '휴지통 이동과 영구 파기를 구분하고, 저장 용량 합산 범위와 용량 초과 시 업로드 제한을 연결합니다.',
      overview: '사용자가 파일을 지웠을 때 곧바로 복구 불가능하게 파기하면 실수를 되돌릴 수 없고, 반대로 휴지통 이동만으로 용량이 즉시 줄어든다고 오해하면 왜 업로드를 못 하는지 혼란을 겪습니다. 휴지통 보관 기간과 복구 규칙, 휴지통·이전 버전의 용량 합산 여부, 영구 삭제 후 실제 용량 회수 시점, 용량 초과 시 차단 동작을 함께 설계해야 합니다. 아래 내용은 휴지통·저장 용량 흐름을 설계하기 위한 참고이며 특정 서비스의 무료 용량이나 보관 일수를 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '휴지통 이동(Soft delete)과 영구 파기(Purge) 분리', description: '휴지통에 있는 동안은 외부 공유와 일반 검색에서 제외하되 만료 전까지는 복구할 수 있게 두고, 만료일 도달이나 휴지통 비우기 시 영구 파기합니다.' },
        { name: '저장 용량(Quota) 합산 범위와 회수 시점', description: '내 파일, 공유받은 파일, 휴지통 보관 파일, 이전 버전 파일 중 무엇이 누구의 용량을 차지하는지 명시하고 영구 삭제 시 용량을 회수합니다.' },
        { name: '원래 상위 폴더가 사라진 항목의 복구 규칙', description: '휴지통에서 파일을 복구하려는데 원래 있던 상위 폴더가 이미 영구 삭제되었다면 최상위(루트) 폴더로 복원할지 상위 폴더를 다시 만들지 정합니다.' },
        { name: '용량 임계치 경고와 초과 시 업로드 제한', description: '용량이 80%·100%에 도달했을 때 경고를 표시하고, 초과 상태에서는 열람·내려받기·삭제는 허용하되 신규 업로드와 사본 생성을 막습니다.' },
      ],
      workflow: [
        { name: '휴지통 이동과 즉시 실행 취소 안내하기', description: '파일 삭제 시 휴지통으로 이동했음을 알리고, 실수인 경우 스낵바 등으로 바로 되돌릴 수 있게 합니다.' },
        { name: '휴지통 목록에서 남은 보관 일수와 용량 보여 주기', description: '각 항목이 언제 자동 파기되는지와 차지하는 파일 크기를 표시하고, 선택 복구·선택 영구 삭제·휴지통 비우기를 제공합니다.' },
        { name: '사용 용량 구성과 초과 원인 안내하기', description: '전체 한도 중 일반 파일·휴지통·버전 이력이 각각 얼마를 쓰는지 나누어 보여 주어 사용자가 어디를 비워야 할지 알게 합니다.' },
        { name: '영구 삭제 확인과 비동기 용량 반영하기', description: '되돌릴 수 없는 영구 삭제 전에는 확인 절차를 거치고, 대량 삭제 시 용량 집계가 갱신되는 상태를 안내합니다.' },
      ],
      pitfalls: [
        { name: '파일을 휴지통에 넣었는데도 사용 용량이 그대로인 이유를 숨기기', description: '휴지통 파일도 용량을 차지하는 정책이면서 사용량 표시에 휴지통 비중을 안 보여 주면 사용자는 파일을 지워도 업로드가 안 된다고 느낍니다.' },
        { name: '휴지통에 들어간 파일의 외부 공유 링크가 그대로 열리기', description: '휴지통으로 이동한 파일은 복구되기 전까지 외부 공유 링크나 임베드에서도 접근이 중단되어야 합니다.' },
        { name: '용량 초과 시 파일 삭제나 내려받기까지 모두 막아 버리기', description: '용량이 찼다고 해서 기존 파일 다운로드나 휴지통 비우기까지 막으면 사용자가 스스로 용량을 줄이거나 백업할 수 없습니다.' },
      ],
      questions: [
        '삭제된 파일은 휴지통에 며칠 동안 보관되며, 보관 기간이 지나면 자동으로 영구 삭제되나요?',
        '휴지통에 있는 파일과 이전 버전 파일도 저장 용량(Quota)에 포함되나요? 공유 폴더의 파일은 누구의 용량을 차감하나요?',
        '휴지통에서 파일을 복구할 때 원래 상위 폴더가 이미 삭제되었다면 어디로 복원하나요?',
        '저장 용량을 초과했을 때 어떤 작업(업로드, 사본 생성, 동기화)이 차단되고 어떤 작업(열람, 다운로드, 삭제)은 유지되나요?',
        '공유 폴더에서 일반 편집자가 삭제한 파일은 누구의 휴지통으로 가며 누가 복구·영구 삭제할 수 있나요?',
      ],
      example: '예시: 워크스페이스에서 삭제된 파일을 30일간 휴지통에 보관하며 휴지통 용량도 전체 한도에 포함하되, 사용량 막대에 일반 파일과 휴지통 용량을 구분해 표시하고, 원래 폴더가 없어진 파일은 최상위 경로로 복원하며 안내 배너를 띄우도록 구성할 수 있습니다. 실제 보관 일수·공유 파일 용량 귀속·초과 유예 기준은 서비스 정책에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'undo-delete-snackbar', reason: '파일을 휴지통으로 옮긴 직후 하단 알림에서 즉시 실행 취소(복구)를 제공하는 표현에 참고할 수 있습니다. 실제 휴지통 보관 기한과 서버 복원 처리는 별도로 구현해야 합니다.' },
        { id: 'bulk-selection-action-bar', reason: '휴지통이나 파일 목록에서 여러 항목을 한꺼번에 선택해 일괄 복구하거나 영구 삭제하는 하단 작업 바 표현에 참고할 수 있습니다. 실제 용량 회수와 일괄 삭제 API는 구현하지 않습니다.' },
      ],
      promptSnippet: '파일 휴지통 보관·복구·영구 삭제와 저장 용량(Quota) 산정 흐름을 설계해 줘. 먼저 휴지통 보관 기간과 자동 파기 여부, 휴지통·이전 버전·공유 파일의 용량 차감 귀속 기준, 상위 폴더가 삭제된 항목의 복원 위치, 용량 초과 시 차단/허용 작업 범위를 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 활성 상태·휴지통 보관·복구됨·영구 삭제 대기/완료 상태 전환과 공유 링크 차단 규칙.\n2. 저장 용량 합산 항목(일반 파일·휴지통·버전 이력) 구분 표시와 영구 삭제 시 용량 회수 시점.\n3. 원래 상위 폴더가 없는 파일의 복원 처리와 공유 폴더 삭제 권한 기준.\n4. 용량 임계치 경고 및 한도 초과 시 업로드 차단·기존 파일 다운로드/삭제 허용 흐름.\n5. 삭제 직후 실행 취소 스낵바·휴지통 일괄 선택 바·영구 삭제 확인·용량 상세 안내 화면의 연결.\n휴지통 이동을 곧바로 영구 용량 확보로 단정하거나 용량 초과 시 삭제 동작까지 막지 말고, 예시 정책과 디자인 데모를 실제 스토리지 과금·정리 엔진으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'File & Media Management',
      title: 'Trash retention, permanent purge and storage quota accounting',
      summary: 'Separate soft deletion in trash from permanent purge, and connect quota breakdowns with over-quota restrictions.',
      overview: 'Deleting a file should rarely destroy it instantly without recovery, yet keeping deleted items in trash raises questions about storage quota and active share links. Defining the trash retention window, clarifying whether trashed items and old versions count toward quota, handling restore when an original parent folder is gone, and blocking new uploads while still allowing downloads and cleanup when over quota keeps storage behavior transparent. These concepts are design references, not default quota limits or retention windows.',
      concepts: [
        { name: 'Soft delete in trash versus permanent purge', description: 'Hide trashed files from standard views and disable their share links immediately, while allowing restoration until the retention timer expires or trash is emptied.' },
        { name: 'Quota accounting across active, trashed and versioned files', description: 'Specify whether trashed files, file versions and shared-folder items count against the owner’s or workspace’s quota, and reclaim space upon permanent purge.' },
        { name: 'Orphaned-parent recovery on restore', description: 'Define where a restored file lands—such as the root directory or a recreated path—when its original parent folder has already been permanently deleted.' },
        { name: 'Quota thresholds and graceful over-quota restrictions', description: 'Warn users as storage approaches 100%, and when exceeded, block new uploads or copies while keeping view, download and permanent-delete actions open.' },
      ],
      workflow: [
        { name: 'Move to trash with immediate undo feedback', description: 'Confirm that deleted items moved to trash and offer an immediate undo action for accidental clicks.' },
        { name: 'Show remaining retention days and item sizes in trash', description: 'List trashed items with their auto-purge countdown and byte size, supporting bulk restore, selective purge and Empty Trash.' },
        { name: 'Break down storage usage by category', description: 'Show how much quota is consumed by active files, trashed files and historical versions so users know how to free space.' },
        { name: 'Confirm permanent purge and update quota totals', description: 'Require explicit confirmation before irreversible deletion and reflect reclaimed space once purge processing completes.' },
      ],
      pitfalls: [
        { name: 'Counting trash against quota without showing trash usage in the quota meter', description: 'If users delete large files to free space but remain blocked because those files still sit in trash, hiding the trash breakdown causes confusion.' },
        { name: 'Leaving external share links active while a file is in trash', description: 'Trashed items should return an unavailable state to external viewers until the owner restores them.' },
        { name: 'Blocking downloads or trash cleanup when an account is over quota', description: 'Users who exceed storage limits must still be able to download backups and permanently delete files to get back under the limit.' },
      ],
      questions: [
        'How many days do deleted files remain in trash before automatic permanent purge?',
        'Do trashed files and historical versions count toward storage quota, and whose quota is charged for files in shared folders?',
        'Where is a file placed if it is restored after its original parent folder was permanently deleted?',
        'Which actions are blocked when storage quota is exceeded, and which recovery actions remain available?',
        'Who has permission to restore or permanently purge files deleted by collaborators inside a shared workspace?',
      ],
      example: 'Example: a cloud workspace could retain deleted files in trash for 30 days, include trash in quota while displaying a segmented usage bar for active versus trashed storage, restore orphaned files to the root folder with a notice, and block new uploads above 100% quota. Confirm actual retention periods, quota attribution and grace rules before adopting this setup.',
      relatedDesigns: [
        { id: 'undo-delete-snackbar', reason: 'A reference for showing a temporary snackbar to undo moving an item to trash. Retention timers and server restoration need separate implementation.' },
        { id: 'bulk-selection-action-bar', reason: 'A reference for selecting multiple trashed items to restore or permanently delete in bulk. Quota updates and batch deletion APIs need separate implementation.' },
      ],
      promptSnippet: 'Help design a file trash retention, restoration, permanent purge and storage quota workflow. First confirm the trash retention period, whether trashed items/versions/shared files count toward quota, where files restore if their parent folder is gone, and which actions are blocked when over quota. Do not assume undecided rules.\nBased on the answers, describe:\n1. Transitions across active, trashed, restored and permanently purged states, including share-link suspension in trash.\n2. Storage quota breakdown (active files, trash, versions) and when space is reclaimed.\n3. Restoration fallback when the original parent folder no longer exists and permissions in shared folders.\n4. Warning thresholds and over-quota behavior that blocks new uploads while preserving download and delete actions.\n5. How undo snackbars, trash bulk-action bars, permanent-purge confirmations and quota meters connect.\nDo not hide trash consumption when it counts toward quota or block users from deleting files when over quota, and do not mistake example policies or design demos for a real storage accounting system.',
    },
  },
  sources: [
    { title: 'Google Drive Help — Delete and restore files in Google Drive', url: 'https://support.google.com/drive/answer/2375102' },
    { title: 'Dropbox Help — How deleted files and versions affect storage space', url: 'https://help.dropbox.com/storage-space/deleted-files-take-up-space' },
  ],
}, {
  id: 'file-version-replacement-and-download-audit',
  aliases: {
    ko: ['파일 버전 관리', '새 버전 덮어쓰기', '이전 버전 복원', '파일 다운로드 열람 기록'],
    en: ['file version history', 'upload new file version', 'restore previous version', 'file download access logs'],
  },
  useCases: {
    ko: ['기존 공유 링크를 유지한 채 파일 내용만 새 버전으로 교체(업데이트)할 때', '이전 버전을 내려받거나 현재 대표 버전으로 되돌릴 때', '자동 생성된 버전과 사용자가 메모를 남겨 고정한 버전을 구분할 때', '누가 언제 어떤 버전의 파일을 열람·다운로드했는지 기록을 남길 때'],
    en: ['Replacing a file with a newer version while keeping the same item ID and share link', 'Allowing users to download or promote a historical file version', 'Distinguishing routine version replacements from pinned milestone versions', 'Recording access and download logs by user, timestamp and file version'],
  },
  keywords: {
    ko: ['파일 버전', '버전 교체', '새 버전 업로드', '이전 버전 복원', '버전 고정', '파일 해시', '다운로드 기록', '열람 로그', '캐시 무효화'],
    en: ['file versioning', 'version replacement', 'upload new version', 'version restore', 'pinned version', 'checksum', 'download log', 'access history', 'cache busting'],
  },
  text: {
    ko: {
      domain: '파일·미디어',
      title: '동일 항목의 파일 새 버전 교체·이전 파일 내려받기와 열람 기록',
      summary: '항목 ID를 유지한 채 새 버전을 올리고, 이전 버전 복원·고정 및 버전별 열람·내려받기 기록을 연결합니다.',
      overview: '문서나 디자인 시안을 수정할 때마다 기존 파일을 지우고 새로 올리면 공유 링크와 댓글 맥락이 모두 끊어집니다. 같은 파일 항목 안에 새 버전을 올려 최신판을 갱신하되 이전 버전을 조회·다운로드하거나 되돌릴 수 있게 하고, 브라우저 캐시 때문에 옛 파일이 보이지 않도록 처리하며, 중요 문서의 버전별 다운로드 기록을 남겨야 합니다. 아래 내용은 파일 버전 교체·열람 기록 흐름을 설계하기 위한 참고이며 특정 서비스의 버전 보관 개수나 로그 보관 기한을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '단일 파일 항목과 불변 버전 스냅샷 분리', description: '외부에 공유되는 파일 항목(Item ID)은 하나로 유지하면서, 새 파일을 올릴 때마다 버전 번호·크기·체크섬·업로더가 담긴 버전 스냅샷을 추가합니다.' },
        { name: '이전 버전 되돌리기(Promote)와 고정(Pin)', description: '과거 버전을 다시 현재 버전으로 승격할 때 기존 최신 버전을 덮어써 지우지 않고 새 최신 버전으로 추가하며, 자동 정리에서 제외할 중요 버전을 고정합니다.' },
        { name: '버전 교체 시 미리보기·CDN 캐시 갱신', description: '파일 내용은 바뀌었는데 고정 URL 캐시 때문에 이전 이미지나 PDF가 계속 보이지 않도록 버전 식별자나 ETag로 캐시를 구분합니다.' },
        { name: '버전별 열람·다운로드 기록과 권한', description: '누가 언제 몇 번째 버전을 미리보기했거나 내려받았는지 기록하고, 이 기록을 파일 소유자·관리자 중 누가 볼 수 있는지 정합니다.' },
      ],
      workflow: [
        { name: '새 버전 업로드와 형식·변경 메모 확인하기', description: '기존 항목에서 새 버전 올리기를 선택했을 때 확장자 계열이 달라졌는지 확인하고, 무엇이 바뀌었는지 짧은 버전 메모를 입력받습니다.' },
        { name: '버전 목록과 현재 대표 버전 표시하기', description: '버전 번호, 업로드 시각, 작성자, 파일 크기, 메모를 시간순으로 보여 주고 현재 대표 버전을 명확히 표시합니다.' },
        { name: '특정 버전 개별 다운로드와 현재 버전으로 복원하기', description: '과거 버전을 먼저 내려받아 확인한 뒤 필요하면 현재 대표 버전으로 복원하거나 영구 보관으로 고정합니다.' },
        { name: '열람·다운로드 기록 조회하기', description: '권한이 있는 사용자가 해당 파일의 최근 열람·다운로드 시각과 대상 버전을 시간순으로 확인합니다.' },
      ],
      pitfalls: [
        { name: '새 버전을 올렸는데 고정 URL 캐시 때문에 이전 파일이 내려받아지기', description: '파일 경로가 같다고 브라우저나 CDN이 이전 바이너리를 그대로 돌려주면 수신자는 수정 전 파일을 보게 됩니다. 버전별 고유 경로나 캐시 무효화를 적용하세요.' },
        { name: '이전 버전으로 복원할 때 그사이 올라온 최신 버전을 흔적 없이 삭제하기', description: '실수로 예전 버전을 복원했을 때 최신 작업본까지 사라지면 복구할 수 없습니다. 복원도 새로운 최신 버전 생성으로 기록하세요.' },
        { name: '전혀 다른 형식의 파일로 새 버전을 덮어써 미리보기를 깨뜨리기', description: '이미지 항목에 압축 파일이나 다른 형식을 새 버전으로 올릴 때 경고 없이 교체하면 연결된 임베드 화면이 깨집니다.' },
      ],
      questions: [
        '파일당 이전 버전을 최대 몇 개 또는 며칠 동안 보관하며, 자동 삭제에서 제외하는 버전 고정 기능을 두나요?',
        '새 버전을 올릴 때 기존 파일과 다른 확장자·형식(예: PNG를 PDF로 교체)을 허용하나요, 경고를 띄우나요?',
        '이전 버전을 현재 버전으로 되돌릴 때 기존 버전 이력은 그대로 유지되나요?',
        '외부 공유 링크를 열면 항상 최신 버전이 보이나요, 특정 시점 버전으로 고정된 링크도 발급할 수 있나요?',
        '파일 열람·다운로드 기록에는 어떤 정보(사용자, 시각, 버전, IP/기기)를 남기며 누구에게 열람을 허용하나요?',
      ],
      example: '예시: 계약서·시안 관리 화면에서 새 파일 버전을 올리면 공유 링크는 그대로 최신 v3 파일을 가리키고, 이전 v1·v2는 90일간 목록에서 개별 다운로드나 복원이 가능하며, 소유자는 누가 어느 버전을 내려받았는지 타임라인으로 확인하도록 구성할 수 있습니다. 실제 버전 보관 한도·이종 확장자 허용 여부·열람 로그 범위는 운영 정책에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'ly-activity-timeline', reason: '버전 업로드·복원 이력이나 파일 열람·다운로드 기록을 시간순 타임라인으로 나열하는 표현에 참고할 수 있습니다. 실제 파일 버전 저장과 로그 수집은 별도로 구현해야 합니다.' },
        { id: 'ly-expandable-data-rows', reason: '버전 행을 펼쳐 버전 메모, 파일 해시, 해당 버전의 다운로드 상세 내역을 확인하는 표현에 참고할 수 있습니다. 실제 이전 버전 다운로드와 복원 처리는 구현하지 않습니다.' },
      ],
      promptSnippet: '동일 파일 항목의 새 버전 교체·이전 버전 복원·열람 및 다운로드 기록 흐름을 설계해 줘. 먼저 이전 버전 보관 개수/기한과 영구 고정 여부, 새 버전 업로드 시 다른 확장자 허용 기준, 이전 버전 복원 시 이력 보존 방식, 공유 링크의 최신/특정 버전 연결, 열람·다운로드 기록 범위와 조회 권한을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 파일 항목(Item ID)과 개별 버전(Version ID)의 구조 및 현재 대표 버전 전환 규칙.\n2. 새 버전 업로드 시 형식 검사, 버전 메모 기록, 미리보기·다운로드 캐시 갱신 처리.\n3. 이전 버전 개별 다운로드, 현재 버전으로 되돌리기(이력 보존), 중요 버전 고정/삭제 흐름.\n4. 버전별 열람·다운로드 기록 수집 항목과 역할별 조회 권한.\n5. 파일 상세·새 버전 업로드·버전 이력 타임라인·확장 상세 행·열람 기록 화면의 연결.\n새 버전 교체 후 캐시된 구버전이 그대로 내려가게 두거나 복원 시 기존 최신 버전을 삭제하지 말고, 예시 정책과 디자인 데모를 실제 스토리지 버전 관리 시스템으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'File & Media Management',
      title: 'File version replacement, historical downloads and access logs',
      summary: 'Replace file contents under a stable item ID, and connect version promotion, cache invalidation and per-version download logs.',
      overview: 'Deleting and re-uploading a file whenever edits occur breaks shared links and loses context. Keeping a single file item ID while appending immutable version snapshots lets teams ship updated files to the same link, download or restore earlier versions safely, bust stale CDN caches, and see which version a collaborator actually downloaded. These concepts are design references, not default version retention limits or logging policies.',
      concepts: [
        { name: 'Stable item ID versus immutable version snapshots', description: 'Keep one persistent item ID for sharing while recording each upload as a numbered version with its own byte size, checksum, uploader and note.' },
        { name: 'Non-destructive version promotion and pinning', description: 'When restoring an older version, promote it as the newest version rather than erasing intermediate versions, and allow pinning milestone versions against auto-pruning.' },
        { name: 'Preview and cache invalidation on replacement', description: 'Ensure thumbnails, previews and download endpoints reflect the newly uploaded version immediately instead of serving cached bytes from an older version.' },
        { name: 'Per-version access and download logs', description: 'Record who viewed or downloaded which specific version and when, and restrict log access to authorized owners or admins.' },
      ],
      workflow: [
        { name: 'Upload a replacement version with format check and note', description: 'Verify whether the new file matches the expected media type and let the uploader attach a brief version note.' },
        { name: 'Inspect version history and current active badge', description: 'List versions chronologically with version numbers, timestamps, authors, sizes and notes, clearly marking the current version.' },
        { name: 'Download historical versions or promote to current', description: 'Let authorized users download a prior version to inspect it, promote it to become the current version, or pin it.' },
        { name: 'Review version-specific download and view activity', description: 'Display a chronological log showing which version each recipient viewed or downloaded.' },
      ],
      pitfalls: [
        { name: 'Serving stale cached bytes after a new version is uploaded', description: 'If a static URL caches the first upload without versioned ETags or cache busting, recipients keep downloading the outdated file.' },
        { name: 'Destroying newer versions when rolling back to an earlier version', description: 'Hard-deleting v3 when restoring v2 makes an accidental rollback irreversible. Keep v3 in history and create v4 from v2.' },
        { name: 'Silently replacing a file with an incompatible MIME type', description: 'Replacing an embedded image item with a ZIP archive without warning breaks downstream previews and embeds.' },
      ],
      questions: [
        'How many historical versions or how many days of history are kept per file, and can users pin versions so they do not expire?',
        'Can a new version have a different file extension or MIME type than the current file, or should that require confirmation?',
        'When an older version is restored as current, are all intermediate versions preserved in the history list?',
        'Do shared links always resolve to the latest version, or can a user share a link locked to a specific version?',
        'Which view and download events are logged (user, timestamp, version number), and who is allowed to inspect the log?',
      ],
      example: 'Example: a design review workspace could keep a single share URL that always serves the latest version, retain the last 50 versions for 90 days unless pinned, warn if a replacement upload changes file format, and show owners a log of who downloaded v1 versus v2. Confirm actual retention caps, format rules and log access permissions before adopting this setup.',
      relatedDesigns: [
        { id: 'ly-activity-timeline', reason: 'A reference for presenting chronological version uploads, restores and download events. Version storage and event logging need separate implementation.' },
        { id: 'ly-expandable-data-rows', reason: 'A reference for expanding a version row to inspect release notes, checksums or per-version download details. File download and restore execution need separate implementation.' },
      ],
      promptSnippet: 'Help design a file version replacement, version history and download-log workflow. First confirm version retention limits and pinning rules, whether replacement uploads can change file types, how restoring an old version preserves history, whether links point to latest or fixed versions, and who can view download logs. Do not assume undecided rules.\nBased on the answers, describe:\n1. Data separation between the stable file item ID and immutable version records.\n2. Replacement upload validation, version notes and preview/CDN cache invalidation.\n3. Historical version download, non-destructive promotion to current and milestone pinning.\n4. Per-version view/download logging and role-based access to the activity log.\n5. How file details, version-upload dialogs, activity timelines and expandable version rows connect.\nDo not serve stale cached versions after replacement or delete newer versions on rollback, and do not mistake example policies or design demos for a real versioned storage backend.',
    },
  },
  sources: [
    { title: 'AWS Documentation — Using versioning in S3 buckets', url: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html' },
    { title: 'Box Support — Upload a new version of a file and view version history', url: 'https://support.box.com/hc/en-us/articles/360043697254-Upload-a-New-Version-of-a-File' },
  ],
}, {
  id: 'file-external-share-link-password-and-expiry',
  aliases: {
    ko: ['외부 공유 링크', '링크 비밀번호 설정', '공유 링크 만료일', '다운로드 횟수 제한 무효화'],
    en: ['external share link', 'password-protected file link', 'expiring share URL', 'download limit and link revocation'],
  },
  useCases: {
    ko: ['계정이 없는 외부인에게 만료일이나 비밀번호가 걸린 파일 공유 링크를 보낼 때', '웹 미리보기만 허용하고 원본 파일 다운로드는 막는 열람 전용 링크를 만들 때', '최대 다운로드 횟수 제한이나 즉시 링크 폐기(무효화)를 제공할 때', '같은 파일에 대해 수신자·목적별로 서로 다른 복수 공유 링크를 발급·관리할 때'],
    en: ['Sharing files externally via links protected by an expiration date or password', 'Offering view-only preview links that disable raw file downloads', 'Enforcing maximum download counts or instant link revocation', 'Issuing multiple independent share links for the same file with different expiration rules'],
  },
  keywords: {
    ko: ['외부 공유 링크', '링크 만료일', '비밀번호 링크', '다운로드 차단', '다운로드 횟수 제한', '링크 무효화', '토큰 재발급', '열람 전용'],
    en: ['external share link', 'link expiration', 'password protection', 'disable download', 'download count limit', 'link revocation', 'token rotation', 'view-only link'],
  },
  text: {
    ko: {
      domain: '파일·미디어',
      title: '외부 공유 링크의 만료일·비밀번호·다운로드 제한과 즉시 무효화',
      summary: '외부 공유 토큰에 만료일·비밀번호·다운로드 제한을 연결하고, 즉시 폐기와 상태별 안내 화면을 구분합니다.',
      overview: '외부 파트너나 고객에게 파일을 전달할 때 한 번 만든 공개 주소가 영구적으로 살아 있으면 계약 종료 후에도 파일이 계속 돌아다니게 됩니다. 파일 자체와 분리된 공유 링크 토큰을 발급해 만료 일시·비밀번호·다운로드 허용 여부·최대 내려받기 횟수를 제어하고, 필요할 때 특정 링크만 즉시 무효화할 수 있어야 합니다. 아래 내용은 외부 공유 링크 흐름을 설계하기 위한 참고이며 특정 보안 등급이나 기본 만료 기간을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '파일 원본 경로와 분리된 공유 토큰(Share Token)', description: '실제 스토리지 경로를 직접 노출하지 않고 예측 불가능한 공유 토큰을 발급해, 파일을 지우지 않고도 링크만 폐기하거나 조건을 바꿀 수 있게 합니다.' },
        { name: '만료 일시·비밀번호·최대 다운로드 횟수 조건', description: '지정한 시각이 지나거나 허용된 다운로드 횟수에 도달하면 자동으로 접근을 차단하고, 비밀번호가 설정된 링크는 검증 통과 후에만 파일 메타데이터와 본문을 엽니다.' },
        { name: '미리보기 전용과 원본 다운로드 허용 구분', description: '브라우저 안에서 문서·이미지 열람만 허용할지 원본 파일 내려받기까지 허용할지 구분하고, 미리보기 전용의 기술적 한계(화면 캡처 등)를 함께 고려합니다.' },
        { name: '즉시 무효화(Revoke)와 수신자 차단 사유 구분', description: '발급자가 링크를 폐기하면 즉시 접근을 막고, 수신자에게는 비밀번호 입력 필요·기간 만료·비활성화된 링크 상태를 명확히 안내합니다.' },
      ],
      workflow: [
        { name: '공유 링크 생성과 보호 조건 설정하기', description: '만료일, 비밀번호, 원본 다운로드 허용 여부, 최대 다운로드 횟수를 선택해 공유 링크를 발급하고 복사합니다.' },
        { name: '발급된 활성 링크 목록과 사용 현황 관리하기', description: '하나의 파일에 발급된 링크별 생성일, 만료일, 현재 다운로드 횟수를 확인하고 조건 수정이나 즉시 폐기를 수행합니다.' },
        { name: '외부 수신자 접근 시 토큰·비밀번호 검증하기', description: '수신자가 링크를 열면 만료·폐기 여부를 먼저 확인하고, 비밀번호가 걸려 있으면 파일 이름을 노출하기 전에 비밀번호 확인 절차를 거칩니다.' },
        { name: '만료·한도 도달·폐기 링크 안내하기', description: '접근이 거부된 경우 빈 오류 화면 대신 기간 만료나 링크 비활성화 안내를 표시하고 재요청 방법을 안내합니다.' },
      ],
      pitfalls: [
        { name: '비밀번호 확인 전에 페이지 메타태그나 응답에 파일 원문을 내려보내기', description: '화면만 가려 두고 네트워크 응답이나 미리보기 이미지 주소에 이미 파일 정보를 담아 보내면 비밀번호를 입력하지 않아도 파일이 노출됩니다.' },
        { name: '링크를 무효화했는데 이전에 발급된 다운로드 주소가 계속 열리기', description: '공유 링크를 폐기했을 때 장시간 유효한 정적 파일 주소가 남아 있으면 무효화가 작동하지 않습니다. 짧은 서명 URL이나 실시간 토큰 검증을 연결하세요.' },
        { name: '브라우저 미리보기 요청까지 다운로드 횟수 제한에 중복 차감하기', description: '수신자가 페이지를 새로고침하거나 미리보기를 열었을 뿐인데 다운로드 횟수가 소진되면 정작 파일을 내려받지 못합니다. 열람과 파일 다운로드를 구분하세요.' },
      ],
      questions: [
        '외부 공유 링크에 만료일이나 비밀번호를 필수로 강제하나요, 사용자가 선택할 수 있나요?',
        '하나의 파일에 서로 다른 만료일·비밀번호를 가진 여러 개의 공유 링크를 동시에 발급할 수 있나요?',
        '원본 파일 다운로드를 막고 웹 미리보기만 허용하는 옵션을 두나요? 최대 다운로드 횟수 제한도 지원하나요?',
        '비밀번호가 걸린 링크에 접근했을 때 비밀번호 통과 전에는 파일 이름·썸네일도 숨기나요?',
        '비밀번호를 여러 번 틀렸을 때의 재시도 제한(Rate limit)과 만료·폐기된 링크 화면 문구는 어떻게 구분하나요?',
      ],
      example: '예시: 외부 전달용 파일 링크 생성 시 기본 만료일을 7일로 제안하고, 비밀번호와 다운로드 허용 토글을 선택할 수 있게 하며, 비밀번호 통과 전에는 파일명을 숨기고, 공유 관리 창에서 언제든 개별 링크를 즉시 폐기하도록 구성할 수 있습니다. 실제 기본 만료 기한·비밀번호 강도·서명 URL 유효 시간은 보안 정책에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'native-date-field', reason: '공유 링크의 만료 날짜를 달력 입력으로 지정하는 표현에 참고할 수 있습니다. 실제 만료 시각 검증과 서버 토큰 차단 처리는 별도로 구현해야 합니다.' },
        { id: 'inline-delete-confirmation', reason: '발급된 외부 공유 링크를 즉시 폐기(무효화)하기 전에 제자리에서 한 번 더 확인받는 표현에 참고할 수 있습니다. 실제 토큰 폐기 API는 구현하지 않습니다.' },
      ],
      promptSnippet: '파일 외부 공유 링크의 만료일·비밀번호·다운로드 제한·즉시 무효화 흐름을 설계해 줘. 먼저 만료일·비밀번호 필수 여부, 파일당 복수 링크 발급 허용 여부, 미리보기 전용과 원본 다운로드 제한 기준, 비밀번호 통과 전 메타데이터 숨김 범위, 즉시 폐기 및 재시도 제한 규칙을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 파일 원본과 분리된 공유 토큰 구조 및 링크별 보호 설정(만료일·비밀번호·다운로드 허용/횟수).\n2. 외부 수신자의 링크 접근 시 유효성 검사 순서(폐기/만료 확인 → 비밀번호 검증 → 미리보기/다운로드).\n3. 미리보기 열람과 실제 파일 다운로드 횟수 차감의 구분 및 짧은 유효시간의 서명 URL 연동.\n4. 비밀번호 연속 실패 제한과 만료·한도 초과·폐기된 링크의 수신자 안내 화면.\n5. 공유 링크 생성/설정·발급 링크 목록·즉시 폐기 인라인 확인·외부 수신자 열람 화면의 연결.\n비밀번호 검증 전에 파일 정보나 원본 URL을 응답에 노출하지 말고, 예시 정책과 디자인 데모를 실제 인증·서명 URL 시스템으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'File & Media Management',
      title: 'External share links with expiration, password protection and instant revocation',
      summary: 'Connect external share tokens with expiration dates, passwords, download limits and instant revocation.',
      overview: 'Sharing a file with an external client or partner should not mean exposing a permanent raw storage URL forever. Issuing revocable share tokens with configurable expiration timestamps, password checks, view-only versus downloadable permissions, and maximum download counts lets owners control external access and cut off a link at any time. These concepts are design references, not default security baselines or expiration windows.',
      concepts: [
        { name: 'Decoupled share tokens versus raw storage paths', description: 'Generate unguessable share tokens rather than sharing underlying storage URLs so links can be updated or revoked without deleting the file.' },
        { name: 'Expiration timestamps, passwords and download caps', description: 'Enforce time-based expiration, server-side password verification before revealing file contents, and optional maximum download counts.' },
        { name: 'View-only preview versus raw file download', description: 'Distinguish links that allow in-browser viewing only from links that allow downloading the original file bytes.' },
        { name: 'Instant revocation and clear recipient states', description: 'Allow owners to revoke an active link immediately and show recipients distinct screens for password prompt, expired link or revoked link.' },
      ],
      workflow: [
        { name: 'Configure protection rules when creating a link', description: 'Let the owner set an expiration date, optional password, download permission and download cap before copying the share URL.' },
        { name: 'Manage active links and usage counts per file', description: 'Display all issued links for a file with their creation date, expiry, download count and an action to edit settings or revoke immediately.' },
        { name: 'Verify token validity and password before serving data', description: 'When a recipient opens the link, check revocation and expiry first, then verify the password on the server before returning file metadata or signed media URLs.' },
        { name: 'Render clear blocked states on expiry or revocation', description: 'Show a clear notice when a link has expired, reached its download limit or been revoked by the owner.' },
      ],
      pitfalls: [
        { name: 'Leaking filenames or file URLs in the page payload before password verification', description: 'Hiding a preview behind a client-side overlay while already sending the file URL or title in the initial response exposes protected content.' },
        { name: 'Revoking a share link while long-lived direct download URLs stay active', description: 'Ensure revoked tokens stop issuing signed download URLs and keep signed asset URLs short-lived.' },
        { name: 'Counting page reloads or thumbnail previews against the file download limit', description: 'Separate page view rendering from explicit file download actions so a recipient does not exhaust their download cap by refreshing the page.' },
      ],
      questions: [
        'Are expiration dates or passwords mandatory for external share links, or optional per link?',
        'Can a single file have multiple active external links with different expiration dates or passwords for different recipients?',
        'Can owners restrict a link to in-browser preview only or set a maximum number of downloads?',
        'Should password-protected links hide the file name and thumbnail until the visitor enters the correct password?',
        'How are repeated wrong password attempts rate-limited, and what message do visitors see when a link is expired versus revoked?',
      ],
      example: 'Example: a file sharing dialog could default external links to a 7-day expiration, offer an optional password and download toggle, withhold file metadata until the password is verified on the server, and let owners revoke individual links with inline confirmation. Confirm actual expiration defaults, password requirements and signed-URL lifetimes before adopting this setup.',
      relatedDesigns: [
        { id: 'native-date-field', reason: 'A reference for picking a share-link expiration date with a native calendar control. Expiry enforcement and token validation need separate implementation.' },
        { id: 'inline-delete-confirmation', reason: 'A reference for confirming link revocation inline before disabling an external link. Token revocation APIs need separate implementation.' },
      ],
      promptSnippet: 'Help design an external file share-link workflow with expiration, password protection, download limits and revocation. First confirm whether expiry/passwords are required, whether multiple links per file are supported, view-only versus download rules, metadata hiding before password entry, and revocation/rate-limit rules. Do not assume undecided rules.\nBased on the answers, describe:\n1. Share-token structure and per-link settings (expiry, password, view-only vs download, max downloads).\n2. Server-side verification order when a visitor opens a link (revocation/expiry check, password check, short-lived signed URL issuance).\n3. Separation between preview loads and download-limit counters.\n4. Rate-limiting on failed password attempts and visitor-facing screens for expired, capped or revoked links.\n5. How link creation settings, active link lists, inline revocation confirmation and recipient access screens connect.\nDo not expose file metadata or asset URLs before password verification completes, and do not mistake example policies or design demos for a real token-authentication system.',
    },
  },
  sources: [
    { title: 'Nextcloud Documentation — Public link shares, passwords and expiration dates', url: 'https://docs.nextcloud.com/server/latest/user_manual/en/files/sharing.html' },
    { title: 'Cloudflare Docs — Protect content with short-lived presigned URLs', url: 'https://developers.cloudflare.com/r2/api/s3/presigned-urls/' },
  ],
}];
