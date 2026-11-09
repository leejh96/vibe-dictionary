import type { DomainKnowledge } from '../domain-knowledge';

export const AI_KNOWLEDGE: DomainKnowledge[] = [
  {
    id: 'ai-prompt-context-and-token-budget',
    aliases: {
      ko: ['프롬프트 엔지니어링', '토큰 예산', '토큰예산', '컨텍스트 윈도우', '시스템 프롬프트', '토큰 초과 방지'],
      en: ['prompt engineering', 'token budget', 'context window management', 'system prompt design', 'token overflow prevention'],
    },
    useCases: {
      ko: [
        'LLM 컨텍스트 윈도우 한도 안에서 시스템 프롬프트, 대화 히스토리, RAG 문서의 우선순위를 배분할 때',
        '토큰 초과로 인한 API 호출 에러나 과도한 과금을 방지하기 위한 토큰 모니터링 UI를 구성할 때',
        '사용자 입력 길이에 맞춰 실시간으로 토큰을 계산하고 위험 임계치를 사용자에게 경고할 때',
        '여러 문서를 첨부했을 때 우선순위에 따라 컨텍스트를 동적으로 압축하거나 요약할 때',
      ],
      en: [
        'Allocating context window space between system instructions, conversation history, and retrieved docs',
        'Preventing token limit errors and unexpected billing surges with token monitoring controls',
        'Calculating real-time tokens as the user types and providing warning thresholds',
        'Dynamically truncating or summarizing attachments when total context exceeds budget',
      ],
    },
    keywords: {
      ko: ['컨텍스트 윈도우', '토큰 한도', '토큰 예산', '프롬프트 최적화', '시스템 프롬프트', '토큰 계산', '비용 최적화'],
      en: ['context window', 'token limit', 'token budget', 'prompt optimization', 'system prompt', 'token estimation', 'cost control'],
    },
    text: {
      ko: {
        domain: 'AI 에이전트 & LLM 서비스',
        title: '프롬프트 컨텍스트 윈도우 관리와 토큰 예산 제어',
        summary: '컨텍스트 윈도우 내 토큰 소모량을 실시간 추적하고, 입력·참조 문서·히스토리의 우선순위를 제어해 비용과 성능을 최적화합니다.',
        overview: 'LLM 기반 애플리케이션에서는 모델별 최대 토큰 수(Context Window)가 정해져 있으며, 입력과 출력 토큰에 따라 직접적인 비용과 응답 지연이 발생합니다. 시스템 프롬프트, 첨부 문서, 이전 대화 기록이 쌓여 한도를 초과하면 API 호출이 실패하거나 앞선 맥락이 유실됩니다. 따라서 각 요소의 토큰 점유율을 실시간으로 시각화하고, 중요도에 따라 오래된 대화를 요약하거나 첨부 문서를 선택적으로 잘라내는 토큰 관리 정책을 수립해야 합니다.',
        concepts: [
          { name: '토큰 예산 배분(Token Budgeting)', description: '전체 컨텍스트 용량 중 시스템 프롬프트 고정분, 검색 문서 가변분, 대화 히스토리 슬라이딩 윈도우분의 최대 할당량을 사전에 규정합니다.' },
          { name: '실시간 토큰 카운팅(Tokenizer Feedback)', description: '클라이언트 사이드 BPE 토크나이저를 사용해 사용자가 입력하는 도중 실시간으로 토큰 수와 예상 비용을 계산해 시각적 피드백을 제공합니다.' },
          { name: '컨텍스트 압축 및 슬라이딩 윈도우(Sliding Window & Compression)', description: '대화가 길어지면 초기 메시지를 요약본으로 대체하고 최근 턴만 원문으로 유지해 한도 초과를 방지합니다.' },
        ],
        workflow: [
          { name: '영역별 토큰 한도 할당하기', description: '모델 한도(예: 8k/128k)에 맞춰 시스템 지시 15%, RAG 검색 45%, 대화 히스토리 30%, 출력 여유 10%의 예산 비율을 설정합니다.' },
          { name: '실시간 입력 및 첨부 파일 토큰 산출하기', description: '사용자가 텍스트를 입력하거나 문서를 드롭할 때 토큰 수를 계산해 프로그레스 게이지에 반영합니다.' },
          { name: '임계치 도달 시 자동 압축 및 경고 처리하기', description: '80% 도달 시 경고 색상 전환, 95% 도달 시 오래된 턴 요약 실행 또는 전송 제한을 적용합니다.' },
        ],
        pitfalls: [
          { name: '글자 수(Length)와 토큰 수(Token Count)를 동일시하기', description: '한글이나 코드, 특수문자는 문자당 2~3토큰 이상을 소모하므로 단순 글자 수가 아닌 실제 토크나이저 바이트 기준으로 계산해야 합니다.' },
          { name: '출력 토큰(Max Completion Tokens) 여유분을 남겨두지 않기', description: '컨텍스트를 꽉 채워 보내면 모델이 답변을 한두 문장 만에 잘라버리는 Truncation 현상이 발생합니다.' },
        ],
        questions: [
          '사용자가 여러 대용량 파일을 첨부했을 때, 어떤 기준으로 우선순위를 매겨 컨텍스트에 포함할 것인가요?',
          '토큰 한도 초과 시 이전 대화를 완전 삭제할 것인가요, 아니면 AI 요약본으로 축약할 것인가요?',
          '실시간 토큰 추정치와 실제 API 과금 토큰 수 간의 오차를 UI에서 어떻게 고지할 것인가요?',
        ],
        example: '예시: 문서 분석 챗봇에서 사용자가 4개의 PDF를 첨부하면 각 파일별 토큰 칩을 표시하고, 총 8,000토큰 중 6,500토큰 사용 시 주황색 게이지와 함께 [문서 압축] 버튼을 띄워 핵심 발췌문만 남기도록 유도할 수 있습니다.',
        relatedDesigns: [
          { id: 'ai-prompt-box', reason: '모델 스위처와 높이 자동 조절을 갖춘 입력창으로 프롬프트 전송 인터랙션을 구성합니다.' },
          { id: 'ai-context-pill', reason: '첨부된 컨텍스트 태그 칩과 실시간 토큰 사용량 프로그레스 바를 시각화합니다.' },
        ],
        promptSnippet:
          '지정한 영역에 첨부 문서 태그 칩과 실시간 토큰 소모율 게이지를 갖춘 프롬프트 입력 카드를 만들어 줘. 너비 100%, 최소 높이 180px 컨테이너 안에 12px 모서리와 1px 테두리의 카드를 구성하고, 상단에는 첨부 문서 칩 목록(X 삭제 버튼 포함), 하단에는 총 8000토큰 대비 사용량을 나타내는 프로그레스 바를 배치해 줘.',
      },
      en: {
        domain: 'AI Agents & LLM Services',
        title: 'Prompt Context Window Management and Token Budget Control',
        summary: 'Track token usage against context window limits in real-time, optimizing allocation across instructions, retrieval, and chat history.',
        overview: 'LLM applications operate within fixed context window ceilings, where input and output tokens directly dictate financial costs and latency. Without deliberate budgeting, accumulated chat histories and file attachments trigger API overflow errors or silent context truncation. Teams must implement explicit token allocations, real-time client-side counting, and automated summarization rules.',
        concepts: [
          { name: 'Token Budget Allocation', description: 'Predefining ceiling ratios for system directives, retrieved documents, and conversational turns within the total window.' },
          { name: 'Real-time Tokenizer Feedback', description: 'Using client-side tokenizers to compute token load and cost projections as the user types.' },
          { name: 'Context Compression & Sliding Window', description: 'Collapsing older messages into summaries while preserving recent turns verbatim to maintain coherency without overflow.' },
        ],
        workflow: [
          { name: 'Define Budget Allocation Quotas', description: 'Establish proportional quotas (e.g., 15% instructions, 45% retrieval, 30% history, 10% completion headroom).' },
          { name: 'Calculate Real-time Input & Attachment Tokens', description: 'Compute token metrics on text change and file drop, updating visual gauges dynamically.' },
          { name: 'Enforce Threshold Warnings & Auto-summaries', description: 'Shift gauge alerts at 80% and trigger automated conversation summarization at 95% capacity.' },
        ],
        pitfalls: [
          { name: 'Equating Character Count with Token Usage', description: 'Multilingual text and code consume substantially more tokens per character than English prose; compute using authentic tokenizers.' },
          { name: 'Neglecting Output Completion Headroom', description: 'Maxing out input context leaves no capacity for model completions, truncating responses mid-sentence.' },
        ],
        questions: [
          'How will the system prioritize among multiple large document attachments when context limits are reached?',
          'Will overflow conditions discard older messages entirely or condense them via background LLM summarization?',
          'How should discrepancies between client-side estimates and provider billing be communicated?',
        ],
        example: 'Example: In a document analysis assistant, attached files are tagged with token pills. When utilization hits 6,500 of 8,000 tokens, the gauge shifts to amber and offers a one-click summarization option.',
        relatedDesigns: [
          { id: 'ai-prompt-box', reason: 'Provides an auto-expanding prompt input with model switching controls.' },
          { id: 'ai-context-pill', reason: 'Visualizes attached document tags and real-time token capacity bars.' },
        ],
        promptSnippet:
          'Create a prompt input card with document tag pills and a real-time token gauge in the specified area. Inside a container of width 100% and min-height 180px, build a card with 12px corners and 1px border. Feature removable context tags at the top and a progress bar showing token usage out of 8000 tokens at the bottom.',
      },
    },
    sources: [
      { title: 'OpenAI Prompt Engineering Guide', url: 'https://platform.openai.com/docs/guides/prompt-engineering' },
      { title: 'Anthropic Context Window Guidance', url: 'https://docs.anthropic.com/en/docs/build-with-claude/context-window' },
    ],
  },
  {
    id: 'ai-streaming-response-and-reconnection',
    aliases: {
      ko: ['SSE 스트리밍', '스트리밍 텍스트', '응답 중단', '웹소켓 청크', '스트리밍 에러 복구'],
      en: ['SSE streaming', 'text streaming', 'streaming abort', 'chunked transfer', 'streaming reconnect'],
    },
    useCases: {
      ko: [
        'LLM의 긴 생성 시간을 보완하기 위해 첫 토큰 지연 시간(TTFT)을 최소화하고 한 글자씩 실시간 렌더링할 때',
        '생성 중 사용자가 [생성 중지(Stop)]를 눌러 불필요한 토큰 낭비와 대기를 즉시 차단할 때',
        '네트워크 불안정으로 청크 전송이 끊겼을 때 부분 생성된 텍스트를 유지하고 재연결을 시도할 때',
        '스트리밍 도중 마크다운 태그(코드 블록, 표 등)가 미완성인 상태에서도 레이아웃 깨짐 없이 렌더링할 때',
      ],
      en: [
        'Minimizing time-to-first-token (TTFT) by rendering text chunks in real-time as tokens arrive',
        'Empowering users to abort generations immediately to halt token burn and clear the UI',
        'Recovering from network drops by retaining partial text buffers and retrying connection',
        'Streaming incomplete markdown tokens without breaking code blocks or table layouts',
      ],
    },
    keywords: {
      ko: ['SSE', 'Server-Sent Events', '스트리밍', 'TTFT', '중단 버튼', 'AbortController', '청크 렌더링', '마크다운 파서'],
      en: ['SSE', 'Server-Sent Events', 'streaming', 'TTFT', 'stop generation', 'AbortController', 'chunk rendering', 'markdown stream'],
    },
    text: {
      ko: {
        domain: 'AI 에이전트 & LLM 서비스',
        title: 'SSE 스트리밍 응답 렌더링과 연결 복구 및 조기 중단',
        summary: '서버-센트 이벤트(SSE)로 첫 토큰 지연을 단축하고, AbortController 기반 생성 중단과 끊김 복구를 제공합니다.',
        overview: '생성형 AI 모델은 전체 답변을 완성하기까지 수 초에서 수십 초가 소요되므로, HTTP 단일 응답 대신 Server-Sent Events(SSE)나 웹소켓을 통한 청크 스트리밍이 필수적입니다. 사용자는 첫 글자가 빠르게 찍히는 것을 보며 체감 대기 시간을 줄일 수 있습니다. 또한 원치 않는 방향으로 답변이 생성될 때 즉각 중단(Abort)할 수 있어야 하며, 일시적 네트워크 단절 시에도 이미 도착한 내용을 보존하고 재전송을 요청할 수 있어야 합니다.',
        concepts: [
          { name: '첫 토큰 시간(Time-to-First-Token, TTFT)', description: '전체 생성 완료가 아닌 최초 청크가 클라이언트에 도착해 화면에 렌더링되기까지의 소요 시간으로, UX 만족도의 핵심 척도입니다.' },
          { name: '조기 중단 신호(AbortController Signal)', description: '사용자가 중지 버튼을 누르면 fetch API의 signal을 중단해 서버의 불필요한 GPU 연산과 토큰 과금을 즉시 차단합니다.' },
          { name: '불완전 마크다운 버퍼링(Fault-Tolerant Markdown Parsing)', description: '코드 블록의 닫는 백틱(```)이나 볼드 태그(**)가 아직 스트리밍되지 않았을 때도 파서가 크래시 없이 점진적으로 렌더링하도록 처리합니다.' },
        ],
        workflow: [
          { name: 'SSE 연결 수립 및 상태 초기화하기', description: '요청 시 AbortController를 등록하고, UI에 펄스 커서와 [응답 중단] 버튼을 활성화합니다.' },
          { name: '청크 수신 및 점진적 텍스트 추가하기', description: '도착하는 텍스트 청크를 누적 버퍼에 추가하고, 렌더러를 통해 부드러운 타이핑 모션으로 출력합니다.' },
          { name: '완료 신호 수신 또는 중단 이벤트 처리하기', description: '[DONE] 토큰 수신 시 커서를 숨기고 [다시 생성]으로 전환하며, 사용자 중단 시 연결을 닫고 부분 버퍼를 확정합니다.' },
        ],
        pitfalls: [
          { name: '청크마다 무거운 전체 리렌더링 발생시키기', description: '매 토큰마다 복잡한 컴포넌트 트리를 다시 그리면 브라우저 메인 스레드가 정지하므로 가벼운 텍스트 노드 업데이트나 requestAnimationFrame 배칭을 적용해야 합니다.' },
          { name: '클라이언트 중단 시 서버 세션을 방치하기', description: '브라우저에서만 중단하고 백엔드 LLM 호출을 취소하지 않으면 백엔드에서 백그라운드 토큰 비용이 계속 발생합니다.' },
        ],
        questions: [
          '스트리밍 도중 일시적 네트워크 오류가 나면 어디서부터 재연결을 시도할 것인가요?',
          '중단(Abort)된 불완전한 응답도 대화 기록에 저장해 다음 프롬프트의 컨텍스트로 넘길 것인가요?',
          '코드 블록 내부가 스트리밍되는 도중 사용자가 [코드 복사]를 누르면 어떻게 동작해야 하나요?',
        ],
        example: '예시: 코드 생성 AI에서 사용자가 프롬프트를 보내면 30ms 간격으로 코드가 스트리밍되며, 원치 않는 라이브러리로 작성되기 시작할 때 [응답 중단] 버튼을 눌러 150자 시점에 즉시 멈추고 프롬프트를 수정할 수 있습니다.',
        relatedDesigns: [
          { id: 'ai-streaming-text', reason: '실시간 타이핑 효과와 펄스 커서, 응답 중지 버튼의 시각적 인터랙션을 제공합니다.' },
          { id: 'ai-code-runner', reason: '스트리밍된 코드의 신택스 하이라이팅과 미리보기 탭 전환을 지원합니다.' },
        ],
        promptSnippet:
          '지정한 영역에 깜빡이는 펄스 커서와 [응답 중지] 제어가 포함된 실시간 스트리밍 텍스트 컴포넌트를 만들어 줘. 너비 100%, 최소 높이 180px 컨테이너에서 30ms 간격으로 글자가 출력되며 클릭 시 즉시 타이머를 정지하는 중지 버튼을 제공해 줘.',
      },
      en: {
        domain: 'AI Agents & LLM Services',
        title: 'SSE Streaming Response Rendering, Connection Recovery, and Early Abort',
        summary: 'Stream tokens via SSE to slash TTFT, supporting AbortController-driven stops and resilient partial rendering.',
        overview: 'Because LLM completions can span several seconds, chunked streaming over Server-Sent Events (SSE) or WebSockets is indispensable for minimizing perceived latency. Real-time token streaming creates responsive feedback while enabling users to abort suboptimal answers early. The architecture must handle incomplete markdown tokens and gracefully recover from dropped sockets.',
        concepts: [
          { name: 'Time-to-First-Token (TTFT)', description: 'The elapsed time until the initial text chunk renders in the browser, representing the primary benchmark of perceived system responsiveness.' },
          { name: 'AbortController Signal', description: 'Transmitting cancellation signals to terminate the upstream LLM invocation and arrest downstream GPU billing.' },
          { name: 'Fault-tolerant Markdown Streaming', description: 'Parsing incomplete markdown chunks (such as unclosed code fences) incrementally without crashing the DOM renderer.' },
        ],
        workflow: [
          { name: 'Establish SSE Stream & Abort Handles', description: 'Initiate HTTP streaming with an attached AbortSignal, activating the stop button and typing cursor.' },
          { name: 'Accumulate Chunks & Batch Render', description: 'Buffer incoming tokens and apply requestAnimationFrame updates for smooth typographic expansion.' },
          { name: 'Handle Completion or Abort Interrupts', description: 'Finalize output on [DONE] signals, or cleanly sever the connection upon user abort while preserving partial buffers.' },
        ],
        pitfalls: [
          { name: 'Triggering Full Tree Re-renders Per Token', description: 'Re-evaluating entire virtual DOM trees for every arriving token stalls the browser UI thread; batch DOM mutations.' },
          { name: 'Orphaning Upstream Server Generation on Abort', description: 'Halting the client socket without signaling the backend API allows costly LLM compute to run to completion.' },
        ],
        questions: [
          'How will dropped socket connections resume without duplicate token generation?',
          'Should truncated or aborted turns be committed into persistent session history?',
          'What state should one-click copy buttons present while a code block is actively streaming?',
        ],
        example: 'Example: In an AI coding assistant, code blocks stream at 30ms intervals with a pulsing caret. When the developer spots an obsolete dependency, clicking Stop immediately halts generation at 150 characters.',
        relatedDesigns: [
          { id: 'ai-streaming-text', reason: 'Implements a pulsing cursor streaming effect with start and stop controls.' },
          { id: 'ai-code-runner', reason: 'Renders streaming code with syntax highlighting and a live preview tab.' },
        ],
        promptSnippet:
          'Create a streaming text component with a pulsing caret and stop button in the specified area. Inside a container of width 100% and min-height 180px, stream text at 30ms intervals and provide a button to immediately halt the stream on click.',
      },
    },
    sources: [
      { title: 'MDN Server-Sent Events Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events' },
      { title: 'W3C Fetch AbortController Standard', url: 'https://fetch.spec.whatwg.org/#abortcontroller-interface' },
    ],
  },
  {
    id: 'ai-tool-calling-and-human-approval',
    aliases: {
      ko: ['함수 호출', 'Function Calling', '에이전트 도구', '휴먼인더루프', '위험 명령 승인', '도구 실행 가드레일'],
      en: ['tool calling', 'function calling', 'agent tools', 'human-in-the-loop', 'action approval', 'guardrail validation'],
    },
    useCases: {
      ko: [
        'AI 에이전트가 외부 검색, 데이터베이스 조회, API 호출을 직접 수행할 수 있도록 도구를 연결할 때',
        '파일 삭제, 결제 실행, 이메일 발송 등 비가역적 위험 작업 전 사용자에게 승인을 요청할 때',
        '도구 실행 인자(JSON Arguments)와 반환 결과를 사용자에게 시각적으로 투명하게 공개할 때',
        '도구 실행 실패나 타임아웃 시 에이전트가 스스로 대체 도구를 찾거나 재시도하도록 구성할 때',
      ],
      en: [
        'Equipping AI agents with tools for external search, database queries, and API integrations',
        'Requiring explicit human approval before irreversible actions like file deletions or payment execution',
        'Transparently displaying structured JSON tool arguments and return payloads in the interface',
        'Enabling fallback tools or automated retries when a tool invocation times out or errors',
      ],
    },
    keywords: {
      ko: ['도구 호출', 'Function Calling', '에이전트', 'Human-in-the-loop', '승인 모달', '가드레일', 'JSON 인자', '권한 관리'],
      en: ['tool call', 'function calling', 'agent', 'human in the loop', 'approval card', 'guardrail', 'json arguments', 'permissions'],
    },
    text: {
      ko: {
        domain: 'AI 에이전트 & LLM 서비스',
        title: 'Function Calling 도구 오케스트레이션과 위험 작업 인간 승인(Human-in-the-Loop)',
        summary: '도구 호출 입출력을 시각화하고, 비가역적인 명령 실행 전 인간 승인(Human-in-the-Loop) 가드레일을 적용합니다.',
        overview: '최신 자율 에이전트는 사용자의 의도를 분석해 웹 검색, 계산기, 터미널 실행, DB 수정 등의 도구를 연계 호출합니다. 그러나 모델이 잘못된 인자를 넣거나 파일 시스템 삭제, 결제 등 비가역적 부작용이 있는 명령을 자의적으로 실행하면 치명적인 피해를 초래합니다. 따라서 도구 호출의 진행 상태를 명확히 보여주고, 고위험 작업은 Human-in-the-loop 단계로 격리해 사용자의 명시적 [승인] 없이는 실행되지 않도록 강제해야 합니다.',
        concepts: [
          { name: '도구 스키마 및 인자 파싱(Tool Schema & JSON Arguments)', description: '모델이 호출할 함수의 이름, 설명, 매개변수 스키마를 정의하고 반환된 JSON 인자의 유효성을 런타임에서 검증합니다.' },
          { name: '위험도 수준 분류(Risk Severity Tiering)', description: '단순 조회(Low), 데이터 변경(Medium), 삭제/결제/외부 전송(High)으로 작업을 분류해 High 등급에만 승인 인터랙션을 필수로 요구합니다.' },
          { name: '휴먼 인 더 루프(Human-in-the-Loop, HITL)', description: '에이전트 실행 루프를 일시 중지하고 사용자에게 명령 파라미터와 예상 영향을 제시한 뒤 [승인/거절] 입력을 기다립니다.' },
        ],
        workflow: [
          { name: '모델의 Tool Call 요청 수신 및 검증하기', description: '모델이 생성한 function_call 데이터를 파싱해 도구 명세 및 인자 유효성을 확인합니다.' },
          { name: '작업 위험도 평가 및 승인 카드 렌더링하기', description: '고위험 작업일 경우 즉시 실행하지 않고 승인 대기 상태로 전환해 경고 카드와 버튼을 노출합니다.' },
          { name: '사용자 승인 시 실행 및 결과 반환하기', description: '사용자가 승인하면 실제 함수를 호출해 결과를 에이전트 컨텍스트에 주입하고, 거절 시 취소 메시지를 전달합니다.' },
        ],
        pitfalls: [
          { name: '승인 모달 없이 셸(Shell)이나 파일 쓰기 권한 허용하기', description: '프롬프트 인젝션 공격에 노출될 경우 시스템 파일이 삭제되거나 악성 스크립트가 실행될 수 있습니다.' },
          { name: '도구 실행 실패 시 무한 재시도 루프에 빠지기', description: '에러 응답을 받은 모델이 동일한 실패 명령을 반복 호출해 크레딧을 고갈시키는 문제를 방지하기 위해 최대 재시도 횟수를 제한해야 합니다.' },
        ],
        questions: [
          '어떤 작업(예: 파일 삭제, 외부 API 발송)을 반드시 사용자의 승인을 거쳐야 하는 고위험군으로 지정할 것인가요?',
          '사용자가 승인을 거절했을 때, 에이전트가 다른 대안을 제시하도록 프롬프트를 어떻게 유도할 것인가요?',
          '백그라운드에서 실행되는 긴 도구(예: 웹 크롤링)의 진행률을 사용자에게 어떻게 보고할 것인가요?',
        ],
        example: '예시: 코딩 에이전트가 캐시 디렉터리 정리 명령("rm -rf ./temp_cache")을 내렸을 때, 빨간색 [High] 위험도 배지와 영향받는 파일 목록을 담은 승인 카드를 띄워 사용자가 [승인하여 실행]을 클릭할 때만 실제 명령이 실행되도록 제어할 수 있습니다.',
        relatedDesigns: [
          { id: 'ai-tool-call-card', reason: '에이전트가 호출한 도구명, 파라미터 JSON, 실행 상태 스피너를 단계별로 시각화합니다.' },
          { id: 'ai-human-in-the-loop', reason: '고위험 명령 실행 전 영향도 요약과 승인/거절 액션을 제어하는 가드레일 UI를 제공합니다.' },
        ],
        promptSnippet:
          '지정한 영역에 고위험 작업 전 사용자 승인을 요구하는 Human-in-the-loop 가드레일 카드를 만들어 줘. 너비 100%, 최소 높이 180px 컨테이너 안에 경고 아이콘, 위험도 [High] 배지, 실행 예정 명령 및 영향 파일 목록, 그리고 [승인하여 실행]과 [거절하기] 버튼을 배치해 줘.',
      },
      en: {
        domain: 'AI Agents & LLM Services',
        title: 'Function Calling Tool Orchestration and Human-in-the-Loop Approval',
        summary: 'Visualize agent tool invocations while gating irreversible actions behind human-in-the-loop approval guardrails.',
        overview: 'Autonomous agents leverage function calling to interact with search engines, databases, and system utilities. However, unconstrained tool access creates severe vulnerabilities when models emit erroneous arguments or execute destructive system operations. Robust architectures classify action risk levels and isolate high-severity operations behind interactive human checkpoints.',
        concepts: [
          { name: 'Tool Schema & Parameter Validation', description: 'Defining JSON schemas for available tools and validating model-generated arguments before execution.' },
          { name: 'Risk Severity Tiering', description: 'Categorizing tools into read-only (Low), mutation (Medium), and destructive/financial (High) tiers.' },
          { name: 'Human-in-the-Loop (HITL)', description: 'Suspending agent execution loops to solicit explicit approval or cancellation from the user for high-risk operations.' },
        ],
        workflow: [
          { name: 'Parse Tool Call Directives', description: 'Inspect model output for tool invocations and validate argument integrity against schemas.' },
          { name: 'Evaluate Risk & Trigger Approval UI', description: 'If flagged as high risk, intercept execution and render an interactive approval modal detailing projected impacts.' },
          { name: 'Execute on Approval or Inject Refusal', description: 'On human approval, run the function and stream results; on rejection, feed a structured cancellation notice back to the agent.' },
        ],
        pitfalls: [
          { name: 'Permitting Unrestricted Shell Access Without Approvals', description: 'Prompt injection vectors can compromise system hosts via automated script execution; enforce strict human verification.' },
          { name: 'Unbounded Tool Retry Spirals', description: 'Failing invocations can trap agents in repetitive error loops, rapidly draining API allowances without human intervention.' },
        ],
        questions: [
          'Which specific operations (e.g., file deletes, webhook calls) strictly mandate human sign-off?',
          'How should the agent recover when a user explicitly rejects a proposed tool invocation?',
          'What visual telemetry should communicate progress for long-running asynchronous tools?',
        ],
        example: 'Example: An autonomous coding agent proposing "rm -rf ./temp_cache" triggers an amber warning card with a red [High] badge. The command remains dormant until the user explicitly clicks [Approve & Execute].',
        relatedDesigns: [
          { id: 'ai-tool-call-card', reason: 'Displays tool names, JSON arguments, and execution spinner indicators.' },
          { id: 'ai-human-in-the-loop', reason: 'Implements human approval guardrails with risk badges and confirmation buttons.' },
        ],
        promptSnippet:
          'Create a Human-in-the-loop approval guardrail card in the specified area. Inside a container of width 100% and min-height 180px, render a warning card displaying a [High] risk badge, command details, and dual [Approve & Execute] and [Reject] buttons.',
      },
    },
    sources: [
      { title: 'OpenAI Function Calling Guide', url: 'https://platform.openai.com/docs/guides/function-calling' },
      { title: 'Anthropic Tool Use Documentation', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use' },
    ],
  },
  {
    id: 'ai-rag-retrieval-and-source-attribution',
    aliases: {
      ko: ['RAG', '검색 증강 생성', '출처 인용', '할루시네이션 방지', '근거 제시', '문서 임베딩'],
      en: ['RAG', 'retrieval-augmented generation', 'source attribution', 'citation chips', 'hallucination reduction', 'document embeddings'],
    },
    useCases: {
      ko: [
        '기업 사내 문서나 최신 지식을 검색해 AI 답변의 근거로 활용하고 신뢰도를 높이고자 할 때',
        '생성된 답변 문장마다 인라인 출처 번호([1], [2])를 달아 호버 시 원문 스니펫을 검증하게 할 때',
        'AI가 지어낸 거짓 정보(할루시네이션)를 줄이기 위해 답변 작성 전 추론(Thinking) 단계를 노출할 때',
        '검색된 문서 청크(Chunk) 중 실제 답변에 기여한 핵심 문단을 사용자에게 투명하게 보여줄 때',
      ],
      en: [
        'Grounding AI completions in proprietary documents or fresh knowledge bases to build trust',
        'Attaching inline citation badges ([1], [2]) that reveal source snippets and URLs on hover',
        'Mitigating model hallucinations by exposing step-by-step thinking processes to users',
        'Displaying the exact document chunks that informed the generated answer',
      ],
    },
    keywords: {
      ko: ['RAG', '검색 증강', '출처 인용', '할루시네이션', '추론 과정', 'CoT', '신뢰도', '임베딩'],
      en: ['RAG', 'retrieval augmented generation', 'citations', 'hallucination', 'thinking process', 'chain of thought', 'attribution'],
    },
    text: {
      ko: {
        domain: 'AI 에이전트 & LLM 서비스',
        title: 'RAG 검색 증강과 인라인 출처 인용 및 할루시네이션 가드레일',
        summary: '검색 증강(RAG) 지식을 바탕으로 문장별 인라인 출처 인용과 사고 과정(Thinking)을 제공해 할루시네이션을 억제합니다.',
        overview: 'LLM의 가장 큰 한계는 학습 시점 이후의 최신 정보를 알지 못하고 그럴듯한 거짓말을 지어내는 할루시네이션(Hallucination)입니다. 이를 극복하기 위해 사용자 질문과 관련된 문서를 벡터 DB에서 검색해 컨텍스트로 제공하는 RAG 기법이 널리 사용됩니다. 사용자에게 높은 신뢰를 주려면 답변 문장마다 출처 번호 칩을 달아 마우스 호버 시 원문 제목과 발췌문을 확인하게 하고, 복잡한 답변은 AI의 사고 과정(Thinking)을 펼쳐볼 수 있게 해야 합니다.',
        concepts: [
          { name: '검색 증강 생성(RAG, Retrieval-Augmented Generation)', description: '외부 지식 베이스에서 관련 텍스트 청크를 검색해 LLM의 프롬프트 컨텍스트에 주입함으로써 정확한 근거 기반 답변을 생성합니다.' },
          { name: '인라인 출처 인용(Inline Attribution)', description: '생성된 텍스트 본문 내에 [1], [2] 같은 각주 형태의 칩을 배치하고, 상호작용 시 원문 링크와 발췌문을 팝오버로 제공합니다.' },
          { name: '사고 과정 투명성(Chain-of-Thought Transparency)', description: '모델이 최종 답변을 내놓기 전 거친 분석·검색·검증 단계를 아코디언 형태로 노출해 답변의 논리적 타당성을 사용자가 직접 검토하게 합니다.' },
        ],
        workflow: [
          { name: '질문 임베딩 및 관련 청크 검색하기', description: '사용자 질문과 유사한 문서 청크 상위 3~5개를 벡터 DB에서 조회해 메타데이터(URL, 제목)와 함께 준비합니다.' },
          { name: '근거 기반 답변 및 인용 태그 생성하기', description: '시스템 프롬프트에 제공된 문서만을 기반으로 답변하고 인용 번호를 붙이도록 지시합니다.' },
          { name: '인라인 칩 및 호버 팝오버 카드 바인딩하기', description: '렌더링 시 [1] 태그를 감지해 출처 팝오버 컴포넌트로 치환하고 원문 파비콘 및 발췌문을 연결합니다.' },
        ],
        pitfalls: [
          { name: '검색된 청크가 질문과 무관한데도 억지로 답변에 끼워 맞추기', description: '유사도 점수가 낮은 검색 결과는 과감히 버리고 "제공된 문서에서 관련 정보를 찾을 수 없습니다"라고 솔직히 답변하도록 가드레일을 설정해야 합니다.' },
          { name: '클릭해도 이동할 수 없는 가짜 출처 URL 링크 남기기', description: '출처 칩에 실제 유효한 URL이나 문서 미리보기가 연결되어 있지 않으면 서비스 신뢰도가 급격히 하락합니다.' },
        ],
        questions: [
          '사용자가 인용 칩을 클릭했을 때 외부 웹페이지로 이동하나요, 아니면 서비스 내 문서 뷰어로 연결하나요?',
          '검색된 문서 내용과 LLM 자체 지식이 상충할 때 어떤 정보를 우선하여 답변할 것인가요?',
          'AI 사고 과정(Thinking Process)을 기본적으로 펼쳐둘 것인가요, 접어두고 사용자가 원할 때만 보게 할 것인가요?',
        ],
        example: '예시: 기술 문서 Q&A에서 React 19 변경점을 질문하면, 본문 끝에 [1], [2] 칩을 표시하고 [1]에 마우스를 올렸을 때 "React 19 마이그레이션 가이드" 제목과 react.dev URL 및 핵심 발췌문을 담은 카드가 부드럽게 나타납니다.',
        relatedDesigns: [
          { id: 'ai-source-citation', reason: '텍스트 속 인라인 출처 번호와 마우스 호버 시 나타나는 원문 요약 팝오버를 구현합니다.' },
          { id: 'ai-thinking-accordion', reason: 'AI의 추론 과정과 경과 시간, 단계별 체크리스트를 담은 접이식 아코디언을 제공합니다.' },
        ],
        promptSnippet:
          '지정한 영역에 인라인 출처 인용 칩과 호버 미리보기 카드를 갖춘 AI 답변 UI를 만들어 줘. 너비 100%, 최소 높이 180px 컨테이너 안에 답변 텍스트와 [1] 인용 칩을 배치하고, 호버 시 240px 너비의 출처 카드(제목, URL, 2줄 발췌문)가 150ms 페이드인으로 나타나게 해 줘.',
      },
      en: {
        domain: 'AI Agents & LLM Services',
        title: 'RAG Retrieval Augmentation, Inline Source Attribution, and Hallucination Guardrails',
        summary: 'Ground AI answers in retrieved documents with inline citation badges and collapsible thinking timelines to suppress hallucinations.',
        overview: 'A primary hurdle in generative AI adoption is hallucination—the confident assertion of fabricated claims. Retrieval-Augmented Generation (RAG) resolves this by fetching relevant document chunks from vector databases to anchor responses in verified truth. To cultivate user trust, answers should furnish inline reference badges that reveal underlying sources on hover alongside transparent reasoning logs.',
        concepts: [
          { name: 'Retrieval-Augmented Generation (RAG)', description: 'Injecting queried knowledge base chunks into the prompt context to ensure strictly factual, evidence-backed answers.' },
          { name: 'Inline Attribution Badges', description: 'Embedding interactive reference markers ([1], [2]) directly within prose to anchor assertions to verifiable documents.' },
          { name: 'Chain-of-Thought Transparency', description: 'Exposing intermediate reasoning and search steps inside an accordion so users can evaluate logical integrity.' },
        ],
        workflow: [
          { name: 'Query Vector Stores for Context Chunks', description: 'Retrieve top matching document snippets with associated metadata (title, URL, timestamps).' },
          { name: 'Synthesize Answers with Citation Footnotes', description: 'Instruct the model to reference source indices corresponding to cited propositions.' },
          { name: 'Bind Interactive Citation Popovers', description: 'Map citation tokens to rich hover cards displaying site favicons, page titles, and snippet excerpts.' },
        ],
        pitfalls: [
          { name: 'Forcing Responses When Retrieval Confidence Is Poor', description: 'Failing to implement similarity score floors prompts models to hallucinate answers instead of reporting missing data.' },
          { name: 'Dangling Citations Without Navigable Sources', description: 'Displaying dead reference numbers with unverified links severely damages platform credibility.' },
        ],
        questions: [
          'Should citation clicks navigate externally or open an internal split-pane viewer?',
          'How will conflicting facts between enterprise documents and model priors be arbitrated?',
          'Should the thinking process accordion mount open by default or remain collapsed?',
        ],
        example: 'Example: In a technical documentation assistant, answers append [1] markers. Hovering marker [1] reveals a 240px card with title "React 19 Migration Guide", domain "react.dev", and excerpt text.',
        relatedDesigns: [
          { id: 'ai-source-citation', reason: 'Provides inline citation chips with hoverable source preview cards.' },
          { id: 'ai-thinking-accordion', reason: 'Renders collapsible reasoning logs with elapsed time badges.' },
        ],
        promptSnippet:
          'Create an AI answer layout with inline citation chips and hover preview cards in the specified area. Inside a container of width 100% and min-height 180px, render text with a [1] badge that triggers a 240px source preview popover on hover.',
      },
    },
    sources: [
      { title: 'Lewis et al., Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks', url: 'https://arxiv.org/abs/2005.11401' },
      { title: 'Pinecone RAG Architecture Guide', url: 'https://www.pinecone.io/learn/retrieval-augmented-generation/' },
    ],
  },
  {
    id: 'ai-agent-state-memory-and-branching',
    aliases: {
      ko: ['대화 세션 상태', '응답 버전 분기', '대화 브랜치', '에이전트 메모리', '슬래시 명령어', '대화 롤백'],
      en: ['conversation state', 'response branching', 'message history branches', 'agent memory', 'slash commands', 'session rollback'],
    },
    useCases: {
      ko: [
        '동일한 질문에 대해 여러 번 다시 생성(Regenerate)한 답변들을 버리지 않고 버전별로 탐색할 때',
        '대화 도중 특정 시점으로 돌아가 새로운 대화 줄기를 뻗어나가는 분기(Forking/Branching)를 구현할 때',
        '슬래시(/) 명령어로 사전에 정의된 프롬프트 템플릿을 빠르게 불러와 세션에 적용할 때',
        '세션이 길어질 때 사용자의 핵심 선호도와 과거 작업 맥락을 장기 메모리로 요약 보관할 때',
      ],
      en: [
        'Retaining multiple regenerated answer versions rather than discarding past responses',
        'Branching conversation threads from earlier turns to explore alternative paths',
        'Invoking preset prompt templates via slash commands directly into active sessions',
        'Summarizing user preferences and ongoing task state into persistent agent memory',
      ],
    },
    keywords: {
      ko: ['세션 상태', '응답 분기', '버전 스위처', '슬래시 커맨드', '장기 메모리', '롤백', '재생성 히스토리'],
      en: ['session state', 'response branching', 'version switcher', 'slash commands', 'long-term memory', 'rollback', 'regeneration history'],
    },
    text: {
      ko: {
        domain: 'AI 에이전트 & LLM 서비스',
        title: '에이전트 대화 세션 상태 관리와 응답 버전 분기 및 롤백',
        summary: '멀티턴 세션 상태를 보존하고, 재생성된 여러 응답 버전 간의 탐색과 슬래시 커맨드 템플릿을 지원합니다.',
        overview: '대화형 AI 서비스에서 사용자는 마음에 들지 않는 답변을 다시 생성(Retry)하거나, 이전 턴으로 돌아가 다른 질문을 던지는 일이 흔합니다. 이전 답변을 덮어써버리면 과거의 유용한 정보를 영구히 잃게 됩니다. 또한 반복적인 작업을 단축하기 위해 슬래시(/) 커맨드로 자주 쓰는 템플릿을 호출할 수 있어야 하며, 장기 세션에서도 사용자의 선호 스타일과 작업 상태를 메모리로 유지해야 합니다.',
        concepts: [
          { name: '트리 기반 대화 상태(Tree-structured Conversation State)', description: '단순 선형 배열이 아닌 부모-자식 노드로 메시지를 저장해 한 질문에서 여러 답변 브랜치가 분기할 수 있도록 데이터 구조를 설계합니다.' },
          { name: '버전 네비게이션(Version Pagination)', description: '동일 노드에서 분기된 여러 답변 버전을 < 1 / 3 > 형태의 컨트롤로 넘겨보며 활성 브랜치를 전환합니다.' },
          { name: '슬래시 커맨드 템플릿(Slash Command Prompt Ingestion)', description: '입력창에서 / 키로 트리거되는 커맨드 팔레트를 통해 일관된 고품질 시스템 지시 프롬프트를 주입합니다.' },
        ],
        workflow: [
          { name: '재생성 요청 시 신규 노드 추가하기', description: '기존 답변을 덮어쓰지 않고 부모 질문 노드의 자식 배열에 새로운 답변 버전을 추가합니다.' },
          { name: '버전 스위처 컨트롤 렌더링하기', description: '답변 카드 하단에 이전/다음 화살표와 현재 버전 인덱스를 표시해 슬라이드 전환을 제공합니다.' },
          { name: '슬래시 커맨드로 프롬프트 자동 완성하기', description: '사용자가 /를 입력하면 추천 명령 팝오버를 열고 선택 시 해당 템플릿으로 치환합니다.' },
        ],
        pitfalls: [
          { name: '새 버전 생성 시 이전 버전을 파괴적으로 덮어쓰기', description: '사용자가 이전 버전의 코드가 더 마음에 들었을 때 되돌아갈 수 없으면 큰 불만을 야기합니다.' },
          { name: '깊은 분기 트리로 인한 세션 상태 복잡도 폭증', description: '무제한 분기 시 클라이언트 메모리와 DB 관계가 복잡해지므로 노드 깊이 제한이나 명시적 가지치기(Prune) 정책을 두어야 합니다.' },
        ],
        questions: [
          '사용자가 특정 이전 버전으로 전환했을 때, 그 이후에 이어지는 후속 대화들도 해당 버전에 맞춰 동기화되나요?',
          '슬래시 명령어 목록을 사용자가 직접 커스텀으로 추가하고 편집할 수 있나요?',
          '브라우저를 새로고침하거나 세션을 나갔다 와도 생성된 모든 버전 히스토리가 유지되나요?',
        ],
        example: '예시: 동일한 코드 리팩토링 요청에 대해 간결형, 상세형, 표 형식의 3가지 버전을 생성한 뒤, 답변 카드 하단의 < 1 / 3 > 버튼으로 자유롭게 넘겨보며 가장 적합한 버전을 채택할 수 있습니다.',
        relatedDesigns: [
          { id: 'ai-message-branch', reason: '재생성된 답변 버전들을 이전/다음 화살표로 넘겨보는 브랜치 스위처를 제공합니다.' },
          { id: 'ai-slash-command', reason: '슬래시(/) 문자로 자주 쓰는 프롬프트 템플릿을 빠르게 불러오는 커맨드 팔레트를 구성합니다.' },
        ],
        promptSnippet:
          '지정한 영역에 < 1 / 3 > 형태의 버전 네비게이션을 갖춘 AI 응답 버전 분기 카드를 만들어 줘. 너비 100%, 최소 높이 180px 컨테이너 안에 답변 내용과 이전/다음 버튼을 배치하고, 새 버전 생성 클릭 시 신규 버전이 배열에 추가되며 즉시 이동하게 해 줘.',
      },
      en: {
        domain: 'AI Agents & LLM Services',
        title: 'Agent Conversation Session State, Response Branching, and Rollback',
        summary: 'Manage multi-turn conversation states with non-destructive response version branching and slash command palettes.',
        overview: 'Users routinely regenerate AI answers or backstep to fork alternative lines of inquiry. Overwriting previous responses discards viable solutions permanently. Structuring session histories as trees preserves parallel branches, navigated via version switchers, while slash command palettes facilitate rapid ingestion of standard prompt templates.',
        concepts: [
          { name: 'Tree-structured Session State', description: 'Representing conversations as parent-child nodes rather than flat lists to support multiple branching response variants.' },
          { name: 'Response Version Pagination', description: 'Navigating parallel response alternatives using < 1 / 3 > controls to switch the active branch.' },
          { name: 'Slash Command Palette Ingestion', description: 'Surfacing command popovers on "/" keypress to insert structured prompt templates seamlessly.' },
        ],
        workflow: [
          { name: 'Append New Node on Regeneration', description: 'Record newly generated responses as sibling nodes beneath the parent prompt rather than mutating existing records.' },
          { name: 'Render Branch Pagination Controls', description: 'Display previous/next selectors and version tallies at the base of message bubbles to toggle states.' },
          { name: 'Trigger Slash Palette Autocompletion', description: 'Open a floating command selector when "/" is typed, substituting prompts upon selection.' },
        ],
        pitfalls: [
          { name: 'Destructively Overwriting Prior Generations', description: 'Eliminating earlier generations frustrates users seeking snippets from previous completions; retain versions in memory.' },
          { name: 'Unbounded Tree Memory Growth', description: 'Unchecked branching inflates client memory and serialization complexity; establish pragmatic pruning boundaries.' },
        ],
        questions: [
          'Does navigating to an earlier sibling version automatically switch the downstream conversational context?',
          'Can users configure custom personal slash command macros?',
          'Does session persistence retain full branch histories across page reloads?',
        ],
        example: 'Example: A developer requests three refactoring variants (concise, detailed, tabular) and navigates among them using < 1 / 3 > controls before deciding which variant to keep.',
        relatedDesigns: [
          { id: 'ai-message-branch', reason: 'Enables navigating across multiple response generations with version pagination.' },
          { id: 'ai-slash-command', reason: 'Provides a slash command menu to autocomplete common prompt instructions.' },
        ],
        promptSnippet:
          'Create a response branch switcher card with < 1 / 3 > version navigation in the specified area. Inside a container of width 100% and min-height 180px, render message content and pagination controls to switch between regenerated responses.',
      },
    },
    sources: [
      { title: 'LangChain Chat History & Memory Concepts', url: 'https://python.langchain.com/docs/concepts/chat_history/' },
      { title: 'Vercel AI SDK Core Concepts', url: 'https://sdk.vercel.ai/docs/concepts' },
    ],
  },
];
