import type { GlossaryTermBody } from './types';

export const ENGINEERING_GLOSSARY_DATA: Record<string, GlossaryTermBody> = {
  debounce: {
    aliases: {
      ko: ['디바운싱', '입력 지연 호출', '타자 멈춘 뒤 검색', '연속 입력 묶기', 'API 호출 횟수 줄이기'],
      en: ['debouncing', 'input delay', 'trailing debounce', 'search input throttling'],
    },
    text: {
      ko: {
        definition: '연속해서 빠르게 발생하는 이벤트가 일정 시간 동안 멈춘 뒤 마지막 한 번만 실제 함수를 실행하도록 지연시키는 제어 기법입니다.',
        example: '검색창에 "스켈레톤"을 입력하는 동안 글자마다 서버 요청을 보내지 않고, 입력이 250ms 멈춘 뒤 한 번만 검색 API를 호출하며 언마운트 시 대기 타이머를 정리합니다.',
        promptSnippet: '검색 입력이나 자동 저장 이벤트에는 입력이 일정 시간(예: 250ms) 멈춘 뒤 마지막 값으로만 실행되도록 디바운스를 적용하고, 이전 대기 타이머와 취소 가능한 비동기 요청은 언마운트나 새 입력 시 정리해 줘.',
      },
      en: {
        definition: 'A rate-control technique that delays execution until a burst of rapid events settles for a specified quiet window, running only once with the latest input.',
        example: 'Rather than firing an API call on every keystroke while typing a search query, wait 250ms after the last keystroke and cancel pending timers on unmount.',
        promptSnippet: 'Debounce high-frequency handlers like search inputs or autosave (e.g., 250ms quiet window) so only the final value triggers work, and clean up pending timers or stale requests on unmount or newer input.',
      },
    },
  },
  'optimistic-update': {
    aliases: {
      ko: ['낙관적 UI', '선반영 후동기화', '서버 응답 전에 화면 먼저 바꾸기', '즉시 반영 후 실패 시 복구'],
      en: ['optimistic UI', 'optimistic rendering', 'instant UI update with rollback'],
    },
    text: {
      ko: {
        definition: '서버 요청이 성공할 것이라고 가정해 UI 상태를 먼저 즉시 반영하고, 실제 요청이 실패하면 이전 상태로 되돌리고 오류를 안내하는 갱신 패턴입니다.',
        example: '댓글 좋아요 버튼을 누르면 즉시 활성 상태와 +1을 표시한 뒤 서버에 저장 요청을 보내고, 네트워크가 실패하면 원래 숫자로 롤백합니다. 정적 UI 데모는 로컬 상태 전환만 시연하며 실제 서버 롤백을 구현하지 않습니다.',
        promptSnippet: '좋아요 토글이나 작업 상태 변경처럼 체감 속도가 중요한 액션에는 낙관적 업데이트를 적용해 UI를 먼저 갱신하고, 실제 API 요청이 실패하면 직전 스냅샷으로 롤백한 뒤 사용자에게 오류 안내를 표시해 줘.',
      },
      en: {
        definition: 'An update pattern that immediately applies the expected UI change before the server responds, then confirms on success or rolls back with an error if the request fails.',
        example: 'Toggling a heart reaction highlights the button right away while the save request is in flight, rolling back the count if the server rejects it. Static UI demos only toggle local state without real persistence.',
        promptSnippet: 'Apply optimistic updates for responsive interactions like reactions or status toggles by updating local state immediately, keeping a previous snapshot to roll back on API failure, and surfacing a clear error.',
      },
    },
  },
  idempotency: {
    aliases: {
      ko: ['멱등성 키', '결제 두 번 방지', '중복 결제 막기', '중복 요청 방지', '재시도 안전성'],
      en: ['idempotency key', 'duplicate request prevention', 'prevent double charge', 'safe retry'],
    },
    text: {
      ko: {
        definition: '같은 요청을 네트워크 재시도나 더블 클릭으로 여러 번 보내더라도 서버 상태가 처음 한 번 처리된 것과 동일하게 유지되는 성질입니다.',
        example: '결제 요청마다 클라이언트가 고유한 Idempotency-Key를 함께 보내면, 타임아웃 후 재전송하더라도 서버가 이미 처리된 동일 키를 감지해 두 번 출금하지 않고 기존 결과를 반환합니다. 이는 서버·원장 설계 원칙이며 단순 UI 버튼 비활성화만으로는 보장되지 않습니다.',
        promptSnippet: '결제·출금·웹훅 재실행 등 중복 실행되면 안 되는 변경 API에는 요청별 고유 idempotency key를 저장·검증해 동일 키의 재시도가 기존 처리 결과를 반환하도록 구현하고, UI 버튼 제어만으로 중복을 막으려 하지 마.',
      },
      en: {
        definition: 'A property ensuring that repeating the exact same operation—due to retries, timeouts, or double clicks—produces the same state as executing it once.',
        example: 'Attaching a unique Idempotency-Key per checkout attempt lets the backend recognize retried requests and return the original receipt instead of charging twice. UI button disabling alone cannot guarantee idempotency.',
        promptSnippet: 'Protect critical mutations such as payments, payouts, or webhook replays on the server using unique idempotency keys persisted atomically with the transaction, returning the original outcome on duplicate attempts.',
      },
    },
  },
  'role-based-access-control': {
    aliases: {
      ko: ['RBAC', '역할 기반 권한', '권한 제어', '관리자 일반 사용자 권한 분리', '최소 권한'],
      en: ['RBAC', 'role based access control', 'role permissions', 'least privilege access'],
    },
    text: {
      ko: {
        definition: '개별 사용자에게 직접 권한을 붙이는 대신 관리자·편집자·열람자 같은 역할(Role)에 권한을 묶어 부여하고, 서버와 UI에서 역할에 따라 접근을 통제하는 방식입니다.',
        example: '워크스페이스에서 열람자 역할은 문서를 읽을 수만 있고 결제 설정이나 구성원 삭제 API는 서버에서 403으로 차단합니다. UI에서 메뉴를 숨기는 것은 보조 수단일 뿐 실제 권한 통제는 서버 인가에서 강제합니다.',
        promptSnippet: '역할 기반 접근 제어(RBAC)를 설계할 때 역할별 허용 액션 매트릭스와 최소 권한 원칙을 정의하고, UI 노출 제어와 별개로 모든 서버 API 엔드포인트에서 현재 조직·역할 권한을 검증해 줘. 마지막 최고관리자 강등·삭제도 차단해 줘.',
      },
      en: {
        definition: 'An authorization model that assigns permissions to roles (such as Admin, Editor, Viewer) rather than individual users, enforcing access boundaries across APIs and views.',
        example: 'A Viewer can read workspace documents while billing mutations are rejected with 403 on the backend. Hiding buttons in the UI is only cosmetic; real enforcement lives in server authorization.',
        promptSnippet: 'Implement Role-Based Access Control (RBAC) with explicit role-permission mappings and least-privilege defaults, enforcing checks on every backend endpoint (not just hiding UI controls) and guarding against removing the last admin.',
      },
    },
  },
  'server-sent-events': {
    aliases: {
      ko: ['SSE', '단방향 서버 스트리밍', '실시간 토큰 스트리밍', 'EventSource 스트림'],
      en: ['SSE', 'EventSource', 'HTTP streaming', 'unidirectional server push'],
    },
    text: {
      ko: {
        definition: '하나의 HTTP 연결을 유지한 채 서버가 클라이언트로 텍스트 이벤트 스트림을 단방향으로 실시간 밀어주는 웹 표준 기술입니다.',
        example: 'AI 챗봇 답변이 생성되는 대로 토큰 조각을 화면에 한 글자씩 흘려보내거나, 진행 중인 작업 로그를 브라우저가 중단(AbortController) 및 재연결할 수 있게 스트리밍합니다.',
        promptSnippet: 'AI 응답이나 실시간 진행 로그를 단방향으로 스트리밍할 때 서버 전송 이벤트(SSE) 규격을 사용하고, 클라이언트에는 중지(AbortController), 연결 끊김 안내, 마지막 수신 이벤트 ID 기반 복구 흐름을 함께 구현해 줘.',
      },
      en: {
        definition: 'A web standard allowing a server to push real-time text events over a single long-lived HTTP connection from server to client.',
        example: 'Stream LLM response tokens incrementally as they are generated while supporting user-triggered AbortController cancellation and automatic reconnection.',
        promptSnippet: 'Use Server-Sent Events (SSE) for unidirectional streaming such as LLM token output or live status feeds, pairing it with AbortController cancellation, disconnect banners, and safe reconnect handling.',
      },
    },
  },
  'retrieval-augmented-generation': {
    aliases: {
      ko: ['RAG', '문서 검색 기반 답변', '출처 인용 AI', '지식 기반 검색 증강', '할루시네이션 줄이기'],
      en: ['RAG', 'retrieval augmented generation', 'grounded generation', 'citation-backed AI'],
    },
    text: {
      ko: {
        definition: '언어 모델이 학습 기억에만 의존하지 않도록 외부 문서·지식베이스에서 관련 근거를 먼저 검색해 프롬프트 문맥에 주입한 뒤, 출처와 함께 답변을 생성하게 하는 아키텍처입니다.',
        example: '사내 규정 챗봇이 질문과 관련된 최신 문서 단락 3건을 먼저 찾아 컨텍스트에 넣고, 답변 문장 끝에 [1], [2] 인라인 인용 칩을 붙여 원문 근거를 바로 확인할 수 있게 합니다.',
        promptSnippet: '검색 증강 생성(RAG) 흐름에서는 사용자 질의로 검증된 문서를 먼저 검색해 컨텍스트 예산 안에 주입하고, 답변에는 인라인 출처 인용과 근거가 부족할 때 모른다고 답하는 가드레일을 포함해 줘.',
      },
      en: {
        definition: 'An AI architecture that retrieves relevant passages from an external knowledge base before generation and injects them into the prompt context so answers stay grounded and citable.',
        example: 'A policy assistant retrieves the top matching handbook excerpts, passes them within the token budget, and renders inline citation chips linking back to each source.',
        promptSnippet: 'Design the Retrieval-Augmented Generation (RAG) pipeline to retrieve relevant documents within the context token budget, attach inline source citations to claims, and fall back safely when no supporting evidence is found.',
      },
    },
  },
  'dead-letter-queue': {
    aliases: {
      ko: ['DLQ', '실패 작업 보관 큐', '웹훅 실패 재처리 큐', '재시도 초과 큐'],
      en: ['DLQ', 'dead letter queue', 'failed job queue', 'poison message queue'],
    },
    text: {
      ko: {
        definition: '백그라운드 작업이나 웹훅 전송이 정해진 재시도 횟수를 모두 초과해 실패했을 때 메시지를 버리지 않고 별도 큐에 격리해 원인 조사와 수동 재실행을 가능하게 하는 패턴입니다.',
        example: '결제 완료 웹훅이 상대 서버 장애로 5회 연속 실패하면 데드 레터 큐(DLQ)로 이동시켜 운영자가 오류 원인을 확인한 뒤 멱등성 있게 다시 전송할 수 있게 합니다.',
        promptSnippet: '비동기 웹훅·알림·결제 후처리 워커에는 지수 백오프 재시도와 함께 최대 재시도 초과 시 메시지를 격리하는 데드 레터 큐(DLQ)를 두고, 운영자가 오류 payload를 조회해 멱등하게 재실행할 수 있게 해 줘.',
      },
      en: {
        definition: 'A dedicated holding queue where messages or webhook deliveries are routed after exhausting all retry attempts, preventing silent data loss and enabling inspection and replay.',
        example: 'When an outbound billing webhook fails 5 times due to a partner outage, move the payload to a Dead-Letter Queue (DLQ) so operators can inspect the error and safely replay it later.',
        promptSnippet: 'Configure exponential-backoff retries paired with a Dead-Letter Queue (DLQ) for exhausted jobs or webhooks, exposing failure metadata and an idempotent manual replay action.',
      },
    },
  },
  'audit-log': {
    aliases: {
      ko: ['보안 감사 로그', '변경 이력 기록', '관리자 활동 로그', '누가 언제 바꿨는지 기록'],
      en: ['audit trail', 'activity audit log', 'security event log', 'change history log'],
    },
    text: {
      ko: {
        definition: '누가·언제·어떤 대상에·무슨 변경이나 열람을 수행했는지 변조하기 어렵게 시간순으로 남기는 추적 기록입니다.',
        example: '관리자가 팀원의 역할을 변경하거나 API 키를 폐기하면 행위자, IP, 대상 리소스, 변경 전후 요약을 감사 로그에 남기되 비밀번호나 토큰 원문은 마스킹합니다.',
        promptSnippet: '권한 변경, API 키 발급·폐기, 민감 파일 다운로드 같은 중요 이벤트마다 행위자·시각·대상·요청 메타데이터를 감사 로그(Audit Log)에 추가 전용으로 기록하고, 비밀값과 개인정보는 마스킹해 줘.',
      },
      en: {
        definition: 'An append-only chronological record capturing who performed what action, on which resource, and when—used for security review, compliance, and incident investigation.',
        example: 'Record role changes, API key revocations, and sensitive file downloads with actor, timestamp, and before/after summary while redacting secrets or raw tokens.',
        promptSnippet: 'Emit append-only audit log entries for security- and billing-sensitive events (actor, timestamp, target resource, action outcome) while redacting credentials and sensitive PII.',
      },
    },
  },
  'http-live-streaming': {
    aliases: {
      ko: ['HLS', '라이브 스트리밍', 'm3u8', 'HLS 스트리밍', '적응형 비트레이트 스트리밍'],
      en: ['HLS', 'm3u8 playlist', 'adaptive streaming', 'HLS video streaming', 'segmented HTTP streaming'],
    },
    text: {
      ko: {
        definition: '미디어 콘텐츠를 작은 세그먼트 파일들로 나누고 재생 목록(.m3u8)을 통해 일반 HTTP/HTTPS로 실시간(Live) 또는 주문형(VOD) 전송하는 스트리밍 규격입니다. 여러 화질 변형이 포함된 멀티배리언트 재생 목록이 함께 준비된 경우 네트워크 상태에 따라 화질을 전환하는 적응형 스트리밍도 구성할 수 있습니다.',
        example: '온라인 강의 플레이어가 화질별 스트림이 담긴 마스터 .m3u8 목록을 받아 대역폭에 맞는 세그먼트를 순차 요청합니다. 브라우저의 기본 HLS 지원 여부를 먼저 확인하고, 미지원 환경에서는 호환 재생기 분기를 연결하며 세그먼트 로딩 실패 시 재시도 안내를 띄웁니다.',
        promptSnippet: 'HTTP 라이브 스트리밍(HLS) 플레이어를 구현할 때는 먼저 브라우저의 기본 HLS(.m3u8) 재생 지원 여부를 확인한 뒤 필요 시 호환 재생기 분기를 두고, 다중 화질 변형이 준비된 경우에만 적응형 화질 전환을 연결해 줘. 세그먼트 로딩 지연·네트워크 끊김·재생 오류 시 재시도와 오류 복구 안내를 함께 구현해 줘.',
      },
      en: {
        definition: 'An HTTP-based streaming specification (originated by Apple) that delivers live or VOD media as indexed playlists (.m3u8) referencing sequential media segments; adaptive bitrate switching is enabled when multiple quality variants are encoded and listed in a multivariant playlist.',
        example: 'A video player loads a multivariant .m3u8 playlist, checks native browser HLS support before choosing an MSE-based fallback library, fetches media segments over HTTP, and surfaces retry controls if segment requests fail.',
        promptSnippet: 'When integrating HTTP Live Streaming (HLS), check native browser support for .m3u8 playback before initializing an MSE fallback, enable adaptive bitrate switching only when multi-variant playlists are provided, and handle manifest or segment fetch failures with clear retry and fallback states.',
      },
    },
  },
  'content-delivery-network': {
    aliases: {
      ko: ['CDN', '엣지 캐시', '분산 캐시', '콘텐츠 전송망', '엣지 서버 캐싱'],
      en: ['CDN', 'edge cache', 'content distribution', 'edge caching', 'distributed edge delivery'],
    },
    text: {
      ko: {
        definition: '전 세계 여러 지점의 분산 엣지 서버에 정적 자산이나 미디어 조각을 캐싱해 사용자와 가까운 위치에서 빠르게 전달하는 전송 계층입니다. 원본 파일을 영구 보관하는 오리진 스토리지나 영상을 여러 해상도로 변환하는 트랜스코딩과는 별개의 역할입니다.',
        example: '정적 JS/이미지 자산에는 해시된 파일명과 긴 TTL을 설정해 엣지 캐시 적중률을 높이고, 유료 강좌나 비공개 첨부 파일처럼 권한 검사가 필요한 리소스는 공용 캐시로 노출하지 않고 짧은 만료 시간의 서명 URL이나 인증 검증 뒤에 제공합니다.',
        promptSnippet: '정적 자산이나 미디어를 CDN으로 배포·연동할 때 오리진 저장소·트랜스코딩과 책임을 분리하고, 캐시 키(경로·쿼리·언어 헤더 등) 설계, 리소스 성격별 TTL 만료 정책, 배포 시 캐시 무효화(버전 해시 또는 purge) 절차, 인증이 필요한 비공개 콘텐츠의 캐시 분리·서명 접근 제어를 함께 명시해 줘.',
      },
      en: {
        definition: 'A geographically distributed network of edge servers that caches and delivers static assets or media segments closer to end users; it is distinct from origin object storage (which holds source files) and media transcoding (which re-encodes formats).',
        example: 'Serve fingerprinted static bundles with long cache TTLs from edge locations while keeping access-controlled downloads behind origin authorization or short-lived signed URLs rather than shared public caches.',
        promptSnippet: 'When configuring a Content Delivery Network (CDN), separate edge delivery from origin storage and media transcoding, and explicitly define cache keys (path, query, vary headers), TTL/expiration policies, cache invalidation or asset-versioning strategy, and cache isolation or signed access control so private content is never exposed to unauthorized users through a shared cache.',
      },
    },
  },
  'content-management-system': {
    aliases: {
      ko: ['CMS', '콘텐츠 관리', '에디토리얼 관리', '헤드리스 CMS', '게시물 발행 시스템'],
      en: ['CMS', 'editorial system', 'headless CMS', 'content publishing system', 'editorial workflow'],
    },
    text: {
      ko: {
        definition: '문서·공지·블로그·미디어 자산 같은 콘텐츠의 작성, 편집, 검수, 예약 및 게시 생명주기를 관리하는 시스템입니다. 수강 등록·진도·평가를 다루는 학습 관리 시스템(LMS)과는 목적이 다른 별개 시스템입니다.',
        example: '에디터가 작성 중인 안내 문서를 초안(Draft) 상태로 저장해 비공개 미리보기 URL로 검수받은 뒤 승인된 항목만 게시(Published) 상태로 전환하고, 한국어·영어 로케일별 번역 상태를 함께 관리합니다.',
        promptSnippet: '콘텐츠 관리 시스템(CMS)을 설계할 때는 학습 관리(LMS)와 혼동하지 말고 콘텐츠 작성·검수·발행 흐름에 집중해 초안/검수/게시 상태 분리, 역할별 편집·발행 권한, 비공개 미리보기(Preview) 경계, 다국어·로케일별 콘텐츠 및 폴백 정책을 어떻게 다룰지 설계 질문과 구현 기준을 함께 정의해 줘.',
      },
      en: {
        definition: 'A system for managing the authoring, editing, review, and publishing lifecycle of digital content and media assets; unlike a Learning Management System (LMS), it does not manage learner enrollment, progress, or grading.',
        example: 'An editor saves an article as a draft, shares a gated preview with reviewers, and publishes approved versions across Korean and English locales without exposing unpublished edits to public readers.',
        promptSnippet: 'When designing a Content Management System (CMS)—distinct from an LMS—explicitly address design decisions for draft vs. published state transitions, authoring and publishing permissions, gated preview access, and multilingual/localization workflows with per-locale fallback rules.',
      },
    },
  },
  'supervised-learning': {
    aliases: {
      ko: ['지도학습', '레이블 학습', '분류 회귀 학습', '정답 데이터 기반 학습', '라벨링 학습'],
      en: ['supervised ML', 'labeled training', 'classification and regression', 'labeled dataset learning'],
    },
    text: {
      ko: {
        definition: '입력 데이터와 정답 레이블(Ground Truth)이 짝지어진 예시를 사용해 입력에서 출력으로의 매핑 함수를 학습시키는 머신러닝 방식으로, 주로 범주를 맞히는 분류(Classification)와 연속 수치를 예측하는 회귀(Regression)에 쓰입니다.',
        example: '스팸/정상 레이블이 달린 이메일 데이터로 모델을 학습시킬 때 학습(Train) 데이터로 가중치를 맞추고, 검증(Validation) 데이터로 하이퍼파라미터를 조정한 뒤, 분리된 평가(Test) 데이터로 일반화 성능을 측정합니다. 이미 학습된 외부 모델 API를 호출하거나 정적 UI 데모를 띄우는 것은 실제 지도 학습 훈련이 아닙니다.',
        promptSnippet: '지도 학습 기반 기능을 설계·구현할 때 분류(Classification)인지 회귀(Regression)인지 문제 유형과 정답 레이블 정의를 먼저 명확히 하고, 학습·검증·테스트 데이터셋 분리와 데이터 누수 방지 기준을 포함해 줘. 단순 UI 시연이나 사전 학습된 API 호출을 실제 모델 훈련처럼 표현하지 마.',
      },
      en: {
        definition: 'A machine learning paradigm that learns an input-to-output mapping from labeled examples paired with ground-truth answers, typically used for classification (discrete categories) or regression (continuous values).',
        example: 'Split labeled support tickets into training, validation, and held-out test sets to tune and evaluate a category classifier without data leakage. Calling a hosted inference API or toggling a UI mockup is not real model training.',
        promptSnippet: 'When building a supervised learning workflow, specify whether the task is classification or regression, define how ground-truth labels are collected, enforce strict training/validation/test splits to avoid leakage, and never misrepresent static UI demos or inference API calls as real model training.',
      },
    },
  },
  'unsupervised-learning': {
    aliases: {
      ko: ['비지도학습', '군집화', '패턴 탐색', '클러스터링', '차원 축소 학습'],
      en: ['unsupervised ML', 'clustering', 'pattern discovery', 'dimensionality reduction', 'unlabeled data learning'],
    },
    text: {
      ko: {
        definition: '정답 레이블이 없는 데이터에서 숨겨진 패턴, 잠재 구조, 유사한 집단(군집·클러스터)이나 이상 징후를 스스로 찾아내는 머신러닝 방식입니다. 정답을 주며 맞추게 하는 지도 학습이나 환경 보상 신호로 행동 정책을 익히는 강화 학습과는 접근 방식이 다릅니다.',
        example: '라벨이 없는 고객 행동 로그를 군집화해 유사한 이용 패턴 그룹을 탐색할 수 있지만, 도출된 군집 번호나 이상 점수가 절대적인 정답(Ground Truth)을 보장하지는 않으므로 도메인 전문가의 해석과 검증이 함께 필요합니다.',
        promptSnippet: '비지도 학습(군집화·차원 축소·이상 탐지 등) 결과를 제품에 반영할 때는 정답 레이블이 있는 지도 학습이나 보상 기반 강화 학습과 구분하고, 산출된 군집·그룹 라벨을 확정된 정답(Ground Truth)처럼 단정하지 말고 탐색적 신호로 표시해 사람이 검토할 수 있게 해 줘.',
      },
      en: {
        definition: 'A machine learning approach that uncovers hidden patterns, structures, or clusters in unlabeled data without ground-truth labels—distinct from supervised learning (which learns from labeled answers) and reinforcement learning (which optimizes actions from rewards).',
        example: 'Cluster unlabeled session logs to surface candidate user segments or anomalies, treating the resulting cluster assignments as exploratory signals requiring human interpretation rather than guaranteed ground truth.',
        promptSnippet: 'When surfacing unsupervised learning outputs (such as clustering or anomaly grouping), distinguish them from labeled supervised predictions and reward-driven reinforcement learning, and present discovered groups as exploratory hypotheses rather than guaranteed ground truth.',
      },
    },
  },
  'reinforcement-learning': {
    aliases: {
      ko: ['강화학습', 'RL', '보상 기반 학습', '정책 학습', '에이전트 보상 최적화'],
      en: ['RL', 'reward-based learning', 'policy learning', 'agent-environment learning'],
    },
    text: {
      ko: {
        definition: '에이전트가 환경과 상호작용하며 현재 상태(State)에서 행동(Action)을 선택하고 그 결과로 받는 보상(Reward)을 통해 누적 보상을 최대화하는 정책(Policy)을 시행착오로 학습하는 머신러닝 방식입니다.',
        example: '로봇 제어 시뮬레이터에서 목표 지점에 가까워질수록 양의 보상을 주고 충돌 시 음의 보상을 주며 정책을 반복 갱신합니다. 반면 퀴즈 점수나 배지 같은 게이미피케이션 UI 자체는 강화 학습이 아니며, 브라우저의 간단한 시연 데모도 실제 정책 학습 루프와 구분해 안내해야 합니다.',
        promptSnippet: '강화 학습(RL) 개념을 다루거나 실험 화면을 구성할 때는 상태·행동·보상·누적 보상 최적화 정책 구조를 명확히 정의하고, 퀴즈 점수나 배지 보상 UI를 강화 학습으로 혼동해 표기하지 마. 정적 UI 시뮬레이션이나 데모가 실제 모델 훈련을 수행하는 것처럼 보이지 않게 경계를 분명히 표시해 줘.',
      },
      en: {
        definition: 'A machine learning paradigm in which an agent interacts with an environment—observing states, taking actions, and receiving rewards—to learn a policy that maximizes cumulative long-term reward.',
        example: 'A simulated warehouse agent updates its navigation policy across episodes using state transitions and step rewards. Gamified quiz scores or badge UI alone are not reinforcement learning, and interactive UI demos must be clearly labeled as simulations rather than live policy training.',
        promptSnippet: 'When modeling or visualizing Reinforcement Learning (RL), explicitly define the state, action, reward, and cumulative-return policy loop, avoid calling gamified quiz points or badges "reinforcement learning," and clearly distinguish interactive UI simulations/demos from real training runs.',
      },
    },
  },
  'largest-contentful-paint': {
    aliases: {
      ko: ['LCP 지표', '최대 콘텐츠 페인트', '초기 대표 콘텐츠 렌더링'],
      en: ['LCP', 'Largest Contentful Paint', 'initial viewport paint'],
    },
    text: {
      ko: {
        definition: '페이지가 열릴 때 초기 뷰포트 안에서 가장 큰 적격 이미지나 텍스트 블록이 화면에 그려지는 시점을 측정하는 웹 성능 지표입니다. 초기 대표 이미지에 지연 로딩을 걸거나 렌더링 차단 스크립트를 앞세우면 LCP(Largest Contentful Paint)가 늦어집니다.',
        example: '랜딩 페이지 상단 히어로 배너 이미지를 지연 로딩 대상에서 제외하고 적절한 크기·포맷과 높은 우선순위로 전달해 초기 화면 핵심 시각 요소가 먼저 표시되게 합니다.',
        promptSnippet: '초기 뷰포트의 핵심 이미지나 헤드라인 블록이 LCP(Largest Contentful Paint) 대상이 되므로 상단 대표 이미지는 지연 로딩하지 말고 크기 속성, 우선순위 힌트, 가벼운 초기 CSS로 빠르게 그려지게 구성하세요.',
      },
      en: {
        definition: 'A Core Web Vital measuring the render time of the largest eligible image or text block visible within the initial viewport during page load. Blocking scripts or lazy-loading the hero asset directly delays Largest Contentful Paint (LCP).',
        example: 'A landing page excludes its above-the-fold hero banner from lazy loading, declares explicit dimensions, and prioritizes critical assets so the primary visual paints promptly.',
        promptSnippet: 'Optimize Largest Contentful Paint (LCP) by keeping the main above-the-fold image eager rather than lazy-loaded, setting explicit dimensions, and avoiding render-blocking resources before the primary viewport block.',
      },
    },
  },
  'interaction-to-next-paint': {
    aliases: {
      ko: ['INP 지표', '상호작용 응답 지연', '다음 페인트 지연'],
      en: ['INP', 'Interaction to Next Paint', 'input responsiveness'],
    },
    text: {
      ko: {
        definition: '사용자가 페이지에 머무는 동안 클릭, 탭, 키보드 입력을 처리해 다음 화면 프레임을 그리기까지의 지연 가운데, 전체 평균이 아니라 관찰된 느린 상호작용을 대표하는 값(고백분위 또는 최장 지연)을 보고하는 웹 성능 지표입니다. 무거운 동기 자바스크립트 연산이나 대량 DOM(Document Object Model) 갱신이 메인 스레드를 점유하면 INP(Interaction to Next Paint)가 나빠집니다.',
        example: '수천 개 항목 필터 입력 시 키 입력마다 전체 목록을 동기 정렬하지 않고 작업을 나누거나 표시 행을 제한해 버튼 클릭과 타이핑 후 다음 프레임이 지연 없이 반영되게 합니다.',
        promptSnippet: 'INP(Interaction to Next Paint)는 평균이 아니라 방문 중 가장 느린 축의 상호작용 지연이 지표를 좌우하므로 클릭·탭·키 입력 직후 긴 동기 연산이 메인 스레드를 막지 않도록 작업을 분할하거나 불필요한 DOM 재계산을 줄이세요.',
      },
      en: {
        definition: 'A Core Web Vital capturing the latency from user click, tap, or key interactions until the browser paints the next visual frame, reporting a value representative of the slowest observed interactions across the visit rather than an average. Long synchronous JavaScript tasks or large Document Object Model (DOM) updates stall the main thread and worsen Interaction to Next Paint (INP).',
        example: 'Instead of synchronously sorting and re-rendering thousands of rows on every keystroke, an interactive table slices heavy updates and limits visible rows so keystrokes and clicks update the next frame promptly.',
        promptSnippet: 'Because Interaction to Next Paint (INP) reflects slow interactions rather than an average, keep main-thread work short on every click, tap, or key event by splitting heavy tasks and avoiding synchronous full-list DOM updates.',
      },
    },
  },
  'cumulative-layout-shift': {
    aliases: {
      ko: ['CLS 지표', '레이아웃 밀림 점수', '예상치 못한 화면 이동'],
      en: ['CLS', 'Cumulative Layout Shift', 'unexpected layout shift'],
    },
    text: {
      ko: {
        definition: '방문 전체에서 발생한 이동을 단순 합산하는 것이 아니라, 짧은 간격으로 이어지는 레이아웃 이동 묶음(세션 구간, Session Window) 가운데 점수가 가장 큰 구간의 합으로 예상치 못한 화면 이동 크기를 나타내는 무단위 점수입니다. 사용자 동작 없이 이미지·배너·웹폰트가 뒤늦게 공간을 밀어낼수록 CLS(Cumulative Layout Shift)가 커집니다.',
        example: '동적 공지 배너와 비동기 카드 이미지에 미리 고정 높이나 aspect-ratio 공간을 할당하고, 모달 열림 시 스크롤바 너비 변화는 scrollbar-gutter로 보정해 주변 텍스트가 밀리지 않게 합니다.',
        promptSnippet: '이미지·광고·비동기 패널의 공간을 aspect-ratio나 예약 높이로 먼저 확보하고, 사용자 입력 없는 갑작스러운 상단 삽입을 피해 CLS(Cumulative Layout Shift)를 최소화하세요.',
      },
      en: {
        definition: 'A unitless Core Web Vital score measuring unexpected layout shifts not as an unbounded sum over an entire visit, but as the total score of the largest burst of shifts (session window). When late-loading images, banners, or fonts push visible elements downward without user input, Cumulative Layout Shift (CLS) rises.',
        example: 'Media slots reserve dimensions with CSS aspect-ratio and dynamic status regions keep fixed space so newly loaded thumbnails do not push action buttons downward.',
        promptSnippet: 'Minimize Cumulative Layout Shift (CLS) by reserving space for images, embeds, and async UI regions upfront and avoiding unprompted layout insertions above existing viewport content.',
      },
    },
  },
  'lazy-loading': {
    aliases: {
      ko: ['레이지 로딩', '화면 밖 리소스 지연 불러오기', '온디맨드 이미지 로드'],
      en: ['lazy load', 'deferred loading', 'loading lazy'],
    },
    text: {
      ko: {
        definition: '초기 화면에 바로 보이지 않는 이미지, 미디어, 하위 모듈을 처음부터 모두 받지 않고 사용자가 스크롤해 가까워지거나 필요해질 때 불러오는 기법입니다. 단, 첫 화면의 대표 이미지나 핵심 콘텐츠에 적용하면 오히려 초기 표시가 늦어지므로 화면 아래쪽 리소스부터 적용합니다.',
        example: '긴 기사나 갤러리에서 상단 첫 썸네일은 즉시 로드하고, 스크롤 아래에 놓인 이미지에만 loading="lazy"와 예약 비율을 적용해 초기 네트워크 대역폭을 아낍니다.',
        promptSnippet: '지연 로딩은 초기 뷰포트 아래에 있는 이미지나 보조 미디어부터 적용하고, 첫 화면 대표 이미지에는 적용하지 말며 레이아웃 이동이 없도록 크기 비율을 함께 지정하세요.',
      },
      en: {
        definition: 'Deferring the fetch of below-the-fold images, media, or secondary assets until the user scrolls near them or needs them. Because deferring visible assets hurts initial paint speed, apply lazy loading to offscreen resources rather than the initial hero image.',
        example: 'An editorial gallery loads the top visible image eagerly and marks lower gallery images with loading="lazy" alongside reserved aspect ratios.',
        promptSnippet: 'Apply lazy loading strictly to offscreen images and secondary resources below the initial fold, keep the hero asset eager, and reserve image dimensions to avoid layout shifts.',
      },
    },
  },
  'scrollbar-gutter': {
    aliases: {
      ko: ['스크롤바 거터', '스크롤바 여백 예약', '스크롤바 공간 고정'],
      en: ['scrollbar-gutter', 'scrollbar gutter reservation', 'stable scrollbar gutter'],
    },
    text: {
      ko: {
        definition: '스크롤 가능한 영역에서 콘텐츠 길이가 늘어 스크롤바가 나타나더라도 레이아웃 폭이나 가운데 정렬이 흔들리지 않도록 스크롤바 자리를 미리 예약해 두는 CSS(Cascading Style Sheets) 속성입니다. 클래식 스크롤바 환경에서 양쪽 여백을 대칭으로 맞출 때는 stable both-edges를 사용하며, 오버레이 스크롤바 모드에서는 표준상 별도 공간을 차지하지 않는다는 점을 고려해야 합니다.',
        example: '목록 확장 토글에 따라 항목 수가 변하는 패널에 overflow-y: auto와 scrollbar-gutter: stable both-edges를 함께 적용해 스크롤바 유무와 관계없이 본문 중심축이 어긋나지 않게 유지합니다.',
        promptSnippet: '목록 펼침이나 필터로 세로 스크롤바가 생겼다 사라져 본문 폭이 흔들리는 영역에는 overflow-y: auto와 함께 scrollbar-gutter: stable(대칭 정렬이 필요하면 both-edges)을 적용하되, 오버레이 스크롤바 환경에서는 별도 여백이 예약되지 않음을 전제하세요.',
      },
      en: {
        definition: 'A Cascading Style Sheets (CSS) property that reserves layout space for scrollbars in advance so toggling between short and overflowing content does not shift widths or centered alignment. Using stable both-edges balances classic scrollbars symmetrically, while overlay scrollbars occupy no gutter space.',
        example: 'An expandable file panel pairs overflow-y: auto with scrollbar-gutter: stable both-edges so adding rows never nudges centered row labels horizontally under classic scrollbars.',
        promptSnippet: 'Prevent horizontal layout jitter when scrollbars appear or disappear by combining overflow-y: auto with scrollbar-gutter: stable (or stable both-edges for centered layouts), accounting for overlay scrollbars that reserve no space.',
      },
    },
  },
  'content-visibility': {
    aliases: {
      ko: ['콘텐츠 비저빌리티', '화면 밖 렌더링 생략', 'CSS 렌더링 건너뛰기'],
      en: ['content-visibility auto', 'offscreen rendering skip', 'contain-intrinsic-size'],
    },
    text: {
      ko: {
        definition: 'CSS(Cascading Style Sheets)의 content-visibility: auto 속성을 이용해 화면 밖 섹션의 레이아웃과 페인트 작업을 브라우저가 나중에 필요할 때까지 건너뛰게 하는 렌더링 최적화 기법입니다. 화면 밖 노드를 DOM(Document Object Model)에서 제거하는 가상 스크롤과 달리 DOM 요소는 그대로 유지되므로 브라우저 내 찾기나 앵커 이동과 자연스럽게 호환됩니다.',
        example: '수백 개 섹션이 이어지는 긴 문서 목록의 각 섹션 카드에 content-visibility: auto와 contain-intrinsic-size 예상 높이를 지정해 스크롤 막대 길이를 유지하면서 초기 렌더링 비용을 낮춥니다.',
        promptSnippet: 'DOM 구조를 유지해야 하는 긴 문서나 카드 목록에서 초기 렌더링 부담을 줄이려면 가상 스크롤과 혼동하지 말고 섹션 단위에 content-visibility: auto와 contain-intrinsic-size를 함께 적용하세요.',
      },
      en: {
        definition: 'A Cascading Style Sheets (CSS) rendering optimization using content-visibility: auto so the browser skips layout and paint work for offscreen sections until they approach the viewport. Unlike virtual scrolling, which unmounts offscreen Document Object Model (DOM) nodes, content-visibility keeps the full DOM intact for browser find-in-page and anchor links.',
        example: 'A long technical specification applies content-visibility: auto with contain-intrinsic-size on each major section so scrollbars stay stable while offscreen sections skip initial layout work.',
        promptSnippet: 'For long pages that must preserve full DOM nodes for search and anchors, use content-visibility: auto paired with contain-intrinsic-size to skip offscreen layout and paint instead of confusing it with virtual scrolling.',
      },
    },
  },
  'stale-while-revalidate': {
    aliases: {
      ko: ['SWR 캐시 전략', '오래된 캐시 우선 응답 후 재검증', '백그라운드 캐시 갱신'],
      en: ['SWR', 'stale while revalidate', 'background revalidation'],
    },
    text: {
      ko: {
        definition: '캐시 유효 기간(max-age)이 지난 뒤에도 지정된 허용 재검증 시간 범위(stale-while-revalidate=<seconds>) 안에서는 이전 캐시 응답을 즉시 반환하면서 백그라운드에서 최신 데이터를 받아 갱신하는 캐시 전략입니다. 이 허용 한도가 지나면 더 이상 만료 응답을 즉시 내보내지 않고 원본 재검증이나 새 응답을 기다린 뒤 반환하며, 일시적 지연을 허용하는 공개 데이터에만 사용합니다.',
        example: '공개 공지 목록 응답에 Cache-Control: max-age=60, stale-while-revalidate=300을 설정하면 60초 신선 구간이 끝난 뒤 추가 300초 동안만 캐시된 이전 공개 목록을 즉시 반환하며 뒤에서 갱신하고, 그 추가 300초가 지나면 최신 응답을 기다려 반환합니다.',
        promptSnippet: '다소 이전 값이 잠깐 보여도 안전한 공개 콘텐츠 캐시에만 max-age와 허용 재검증 시간 범위(stale-while-revalidate=<초>)를 함께 지정하고, 재검증 한도 초과 후에는 최신 검증 응답을 기다리며 권한·결제 요청은 이 전략에서 제외하세요.',
      },
      en: {
        definition: 'A caching strategy that serves an expired cached response immediately while revalidating asynchronously in the background—but only within a bounded grace window specified by stale-while-revalidate=<seconds>. Once that revalidation limit expires, the cache blocks for a fresh origin validation rather than serving stale data, and the pattern is strictly for public read data tolerating brief staleness.',
        example: 'A public release-notes endpoint sets Cache-Control: max-age=60, stale-while-revalidate=300 so once the 60-second fresh period ends, cached public data is served immediately only during the additional 300-second window while refreshing in the background, waiting for a fresh validation response once that window expires.',
        promptSnippet: 'Restrict Stale-While-Revalidate (SWR) to public read data tolerating brief staleness, specify an explicit max-age and revalidation window limit, wait for fresh validation past that limit, and exclude private or financial requests.',
      },
    },
  },
  webhook: {
    aliases: {
      ko: ['웹후크', 'HTTP 이벤트 콜백', '수신 이벤트 웹훅'],
      en: ['webhooks', 'http callback', 'event webhook'],
    },
    text: {
      ko: {
        definition: '외부 시스템에서 이벤트가 발생했을 때 클라이언트가 주기적으로 묻는 대신 미리 등록한 HTTP(Hypertext Transfer Protocol) 엔드포인트로 서버가 알림 페이로드를 보내는 방식입니다. UI(User Interface) 설정 화면과 실제 서버 동작을 구분하며, 수신 서버는 제공자 규약에 따른 인증·서명 검증 후 후속 처리를 안정적으로 접수한 뒤에 2xx 성공 응답을 반환하고, 실패·시간 초과 시 재전송은 일반적으로 발신 측이 수행합니다.',
        example: '결제 서비스가 송장 결제 웹훅을 보내면 수신 백엔드는 제공자 규약(HMAC 서명, 공유 시크릿 등)으로 요청을 검증하고 이벤트 ID 멱등성 확인과 작업 큐 영속 접수를 마친 뒤 2xx로 응답하며, 미수신 시 발신 측 재전송에 대비해 중복 처리를 방어합니다.',
        promptSnippet: '웹훅 연동 화면이나 명세를 작성할 때 설정 UI와 실제 서버 처리를 구분하고, 제공자 규약에 맞춘 요청 검증, 후속 작업의 안정적 접수(큐·저장) 완료 후 2xx 응답, 이벤트 ID 멱등성, 그리고 일반적으로 발신 측이 수행하는 재전송 전제를 명시하세요.',
      },
      en: {
        definition: 'An event-driven Hypertext Transfer Protocol (HTTP) push mechanism in which a source server delivers event payloads to a registered endpoint rather than requiring polling. Distinguishing dashboard settings UI from backend execution, the receiver verifies requests per provider protocol, durably accepts or queues downstream work before returning 2xx success, and deduplicates deliveries since retries are generally driven by the sender.',
        example: 'When an external provider posts an invoice event, the backend verifies authenticity according to provider rules (such as HMAC signatures or shared tokens), persists or enqueues the job idempotently by event ID before returning 2xx, and relies on sender-side retries if delivery fails.',
        promptSnippet: 'Separate webhook configuration UI from server processing, specifying provider-defined request verification, durable intake or queuing before returning 2xx success, event-ID idempotency, and handling sender-driven retries.',
      },
    },
  },
  'exponential-backoff': {
    aliases: {
      ko: ['지수적 재시도 지연', '재시도 대기 시간 배증', '백오프 재시도'],
      en: ['exponential backoff with jitter', 'backoff retry', 'retry backoff'],
    },
    text: {
      ko: {
        definition: '일시적인 네트워크 오류나 429·5xx 응답으로 요청이 실패했을 때 재시도 간격을 1초, 2초, 4초처럼 지수적으로 늘려가며 다시 시도하는 알고리즘입니다. 여러 클라이언트가 같은 시각에 몰려 재충돌하는 현상을 막기 위해 무작위 지연(지터, Jitter)과 최대 재시도 횟수 상한을 함께 둡니다.',
        example: '웹훅 전송 워커가 503 응답을 받으면 기본 대기 시간에 2의 거듭제곱과 무작위 지터를 더해 최대 5회까지 재시도한 뒤에도 실패하면 영구 실패 큐로 넘깁니다.',
        promptSnippet: '일시적 오류 재시도에 고정 간격 루프 대신 최대 횟수·최대 대기 시간·무작위 지터(Jitter)가 포함된 지수 백오프를 적용하고, 400 Bad Request 같은 영구 오류는 재시도에서 제외하세요.',
      },
      en: {
        definition: 'A retry strategy that multiplies wait intervals exponentially after transient failures (such as network drops or HTTP 429/5xx responses) while capping total attempts. Adding randomized jitter prevents many clients from retrying in lockstep and overloading the recovering service.',
        example: 'A delivery worker multiplies its base delay by 2^attempt plus random jitter across up to five transient failures before routing undelivered jobs to a dead-letter state.',
        promptSnippet: 'Implement exponential backoff with randomized jitter, a max-delay cap, and a bounded retry count for transient 429/5xx failures while avoiding retries on permanent 4xx client errors.',
      },
    },
  },
  'request-cancellation': {
    aliases: {
      ko: ['비동기 요청 중단', '진행 중 요청 취소', 'AbortController 취소'],
      en: ['abort request', 'AbortController cancellation', 'cancel in-flight request'],
    },
    text: {
      ko: {
        definition: '사용자가 검색어를 바꾸거나 중지 버튼을 누르거나 화면을 떠날 때 진행 중인 비동기 요청이나 스트림을 취소해 불필요한 대기와 오래된 응답 덮어쓰기를 막는 제어 패턴입니다. 브라우저 fetch에 AbortController의 signal을 전달하면 클라이언트 요청 연결은 중단되지만, 백엔드 작업이 독립적으로 이어지는 경우에는 서버 측 작업을 중단하는 처리가 별도로 필요할 수 있습니다.',
        example: '자동완성 입력이 바뀔 때마다 이전 요청의 AbortController.abort()를 호출해 구버전 응답이 최신 입력 결과를 덮어쓰지 않게 하고, 이미 시작된 장시간 서버 생성 작업에는 별도 취소 API 호출 여부를 구분해 설계합니다.',
        promptSnippet: '검색 자동완성, 탭 전환, 스트리밍 생성 등 취소가 필요한 요청에는 AbortController signal을 연결해 재요청·언마운트 시 클라이언트 요청을 중단하고 AbortError를 정상 취소로 처리하며, 백엔드 작업까지 멈춰야 하면 서버 측 취소 경로를 따로 분리해 명시하세요.',
      },
      en: {
        definition: 'A pattern that cancels in-flight asynchronous requests or streams when inputs change, users trigger stop, or components unmount, preventing wasted work and stale response overwrites. Passing an AbortController signal to fetch aborts the client request cleanly, distinct from server-side job termination if backend work continues independently.',
        example: 'When a user types a new query in a combobox or clicks "Stop generating", calling controller.abort() aborts the superseded fetch request and prevents stale results from overwriting current UI state.',
        promptSnippet: 'Wire an AbortController signal into cancelable async requests and streaming readers, abort previous requests on query change or unmount, handle AbortError separately from network failures, and add explicit server-side cancellation when backend jobs must also stop.',
      },
    },
  },
};
