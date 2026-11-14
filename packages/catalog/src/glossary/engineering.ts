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
};
