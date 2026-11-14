# Vibe Dictionary 프로젝트 지침

이 문서는 저장소 전체에 적용한다. 전역 지침을 바탕으로 아래 프로젝트 맥락과 검증 기준을 추가하며, 하위 디렉터리에 더 구체적인 지침이 있으면 해당 범위에서 우선한다.

## 프로젝트와 사용자 흐름

- **바이브 코딩 사전**은 디자인·인터랙션 기법과 도메인 지식 등 서비스 콘텐츠를 탐색하는 한국어·영어 웹 앱이다.
- 기법은 도메인·카테고리·검색으로 찾고 카드에서 데모와 프롬프트를 확인한다. 프롬프트를 개별 복사하거나 기법을 조합기에 담아 공통 적용 대상을 입력한 뒤 조합 프롬프트를 복사한다.
- 현재 구조는 React 18 + TypeScript + Vite 6 + Tailwind CSS 4의 정적 사이트다. 서버·DB·AI API 호출 없이 브라우저에서 동작한다. 새 서버나 외부 서비스를 전제로 기능을 설계하지 말고, 요청에 필요하면 도입 이유와 영향을 먼저 확인한다.
- `apps/mcp`는 같은 카탈로그를 사용하는 읽기 전용 로컬 MCP(Model Context Protocol)다. 운영 서버 없이 표준 입출력(stdio)으로 연결하며 카탈로그 콘텐츠의 목록·검색·상세 조회를 제공한다. 조합·쓰기·코드 실행 기능은 추가하지 않는다.

## 구조와 의존 방향

- 실행·배포하는 앱은 `apps/web`, `apps/mcp`, 공용 콘텐츠 데이터·분류·검색은 `packages/catalog`에 둔다. 루트는 공통 실행 명령·개발 도구·잠금 파일을 관리한다. 상세 구조는 [개발 안내](docs/development.md)를 따른다.
- 파일을 추가하거나 옮기기 전에 개발 안내와 아래 파일별 책임을 확인하고, 같은 역할의 파일이 있는 디렉터리의 배치·이름 규칙을 따른다. 기존 디렉터리로 책임을 명확히 나눌 수 없을 때만 새 디렉터리를 만든다.
- 완료 전에 변경한 파일의 위치와 의존 방향을 확인한다. 디렉터리 구조를 바꾸면 관련 참조 경로와 개발 안내를 갱신하고, 이 문서의 파일별 책임도 필요한 부분을 고친다.
- 웹과 MCP는 `@vibe-dictionary/catalog`를 통해 공용 코드에 접근한다. 다른 앱의 소스나 공용 패키지의 내부 파일을 상대 경로로 직접 가져오지 않는다. 공용 패키지는 앱·React·MCP SDK·브라우저 API에 의존하지 않는다.
- 앱 전용 의존성은 앱의 `package.json`에, 공통 개발 도구만 루트에 선언한다. npm 잠금 파일은 루트 하나만 관리한다.
- MCP는 내부 카탈로그를 번들에 포함한다. 공개 실행 의존성에는 MCP SDK·입력 검증 라이브러리만 두고, 카탈로그를 사용자 설치 시 내려받는 의존성으로 남기지 않는다.

## 파일별 책임

| 경로 | 역할 |
| --- | --- |
| `apps/web/src/App.tsx` | 도메인·검색·카테고리 상태, 테마, 조합기 연결, 페이지 스크롤 이동 |
| `packages/catalog/src/techniques.ts` | 기법 타입·분류와 import한 데이터 배열의 조합 |
| `packages/catalog/src/additions/*.ts` | 개별 기법의 표시 이름·검색 키워드·복사용 `promptSnippet` 등 데이터. 기본 기법은 `base.ts`에서 관리 |
| `packages/catalog/src/search.ts` | 웹과 MCP의 한영 동의어·관련도 검색 |
| `packages/catalog/src/search-metadata.ts` | 검색 메타데이터 타입·분류와 import한 데이터의 조합·조회 |
| `packages/catalog/src/search-metadata/additions/*.ts` | 기법별 적용 대상·실제 입력·한영 사용 상황·별칭. 기본 기법은 `base.ts`에서 관리 |
| `packages/catalog/src/localization.ts`, `packages/catalog/src/translations/en.ts` | 언어별 분류·기법 조회와 영어 번역 |
| `packages/catalog/src/translations/classification.en.ts` | 영어 도메인·카테고리 이름 원문 |
| `packages/catalog/src/translations/additions/*.ts` | 기법별 영어 원문. 기본 기법은 `base.ts`에서 관리 |
| `apps/web/src/i18n/` | 고정 메시지 키·한영 사전·타입이 있는 번역 함수·언어 상태 |
| `apps/web/src/i18n/base.messages.ts`, `apps/web/src/i18n/demos/*.messages.ts` | 기본 문구와 기법 묶음별 한영 문구. `messages.ko.ts`·`messages.en.ts`는 import한 사전을 조합 |
| `scripts/check-i18n.ts` | 번역 누락·빈 값·자리표시자 불일치·직접 작성한 UI 문구 검사 |
| `packages/catalog/src/index.ts` | 공용 카탈로그의 유일한 공개 진입점 |
| `packages/catalog/src/glossary-links.ts` | 용어 사전 분류 정의(`GLOSSARY_CATEGORIES`), 용어 ID·이름·분류와 관련 기법·도메인 지식 ID 연결 |
| `packages/catalog/src/glossary.ts` | 분류별 용어 본문을 합쳐 `GLOSSARY_TERMS`와 `getGlossaryTerm` 제공 |
| `packages/catalog/src/glossary/*.ts` | 분류별 용어 본문(`ui.ts`, `engineering.ts`, `workflow.ts`, `customer-support.ts`, `payments-settlement.ts`, `product-planning.ts`, `business-operations.ts`, `sales-marketing.ts`, `education-operations.ts`)과 타입 정의(`types.ts`) |
| `packages/catalog/src/glossary-search.ts` | 웹과 MCP가 공유하는 용어 사전 한영 동의어·관련도 검색 |
| `apps/mcp/` | 로컬 MCP 실행 파일·스키마·연결 테스트·사용 안내 |
| `apps/web/src/components/FilterBar.tsx` | 카테고리·검색·추천 키워드 UI |
| `apps/web/src/components/TechniqueCard.tsx` | 카드, 개별 복사, 조합기 선택, 화면 근처 데모 마운트, 데모 배경 예외 |
| `apps/web/src/components/demos/LazyInteractiveDemo.tsx` | 화면 근처 데모 묶음의 로딩·실패 안내와 렌더링 |
| `apps/web/src/components/demos/demoLoaders.ts` | 기법 ID별 데모 묶음 지연 로딩 연결 |
| `apps/web/src/components/demos/demoRegistry.ts` | 묶음별 등록을 합쳐 테스트에서 사용하는 ID와 컴포넌트 목록을 제공 |
| `apps/web/src/components/demos/InteractiveDemos.tsx` | 테스트에서 등록된 ID로 개별 데모를 렌더링 |
| `apps/web/src/components/demos/base/` | 영역별 기본 데모 구현(`UiDemos.tsx`, `GraphicDemos.tsx`, `LayoutDemos.tsx`, `StyleDemos.tsx`, `VideoDemos.tsx`)과 import한 컴포넌트의 ID 등록(`index.ts`) |
| `apps/web/src/components/LazyDomainKnowledgeView.tsx` | 도메인 지식 화면의 지연 로딩·로딩 안내·실패 복구 |
| `apps/web/src/components/DomainKnowledgeView.tsx`, `apps/web/src/components/knowledge/` | 도메인 지식의 선택 상태·목록과 분리한 상세·필터 UI |
| `apps/web/src/hooks/useDomainKnowledgeSearch.ts` | 검색어별 결과 재사용·도메인별 개수 집계·표시 언어 연결 |
| `apps/web/src/components/PromptCartDrawer.tsx` | 공통 적용 대상 입력, 조합 프롬프트 생성·미리보기·복사 |
| `apps/web/src/hooks/usePromptCart.ts` | 선택 기법과 공통 적용 대상의 저장·복원 |
| `apps/web/src/hooks/useClipboard.ts` | 비동기 복사 결과와 오류 상태 |
| `apps/web/src/index.css` | Tailwind·공통·카테고리 CSS를 기존 순서로 import하는 진입점 |
| `apps/web/src/base.css` | 다크 변형, 공통 유틸리티·애니메이션 키프레임과 테마·모션 규칙 |
| `apps/web/tests/prompt-behavior.test.tsx` | Node 테스트 러너와 React Test Renderer를 사용한 복사·저장·조합기 회귀 테스트 |
| `apps/web/tests/demo-behavior.test.tsx` | 데모의 입력·상태 전환 회귀 테스트 |
| `docs/README.md` | 공유 문서 안내와 현재 지침·과거 기록 구분 |
| `docs/development.md` | 저장소 구조와 개발·검증·배포 개요 |
| `docs/prompt-quality.md` | 효과 재현을 목표로 하는 프롬프트 작성·검증 기준 |

## 변경 시 유지할 계약

### 서비스 콘텐츠와 MCP

- 웹 서비스에서 사용자가 열람할 수 있는 모든 콘텐츠는 MCP에서도 읽기 전용으로 조회할 수 있어야 한다. 기법·도메인 지식·용어와 앞으로 추가되는 콘텐츠 유형에 모두 적용한다.
- 콘텐츠를 추가하거나 바꿀 때는 웹과 MCP가 공유하는 카탈로그를 갱신한다. 기존 도구로 조회할 수 없는 콘텐츠를 추가하거나 조회 계약을 바꾸면 같은 작업에서 MCP 조회 도구·테스트·사용 안내도 갱신한다.
- 콘텐츠를 추가·수정하거나 공용 데이터·검색 규칙을 바꾸면 웹과 MCP 양쪽에서 관련 항목의 검색·상세 결과를 확인한다. MCP는 실제 stdio로 연결하고 프롬프트가 있는 항목은 원문과 대조한다. MCP 구현을 바꾸면 같은 연결에서 도구 목록·입력 검증·조회 결과와 해당 프롬프트 원문 보존을 확인한다.

### 기법 데이터와 데모

- 기법·영어 번역·검색 메타데이터·한영 UI 문구는 파일별 책임에 명시된 모듈에서 항목을 정의하고 상위 파일은 가져온 목록만 합친다. `techniques.ts`의 `TECHNIQUES`도 가져온 배열을 합치는 역할만 맡는다. 언어별 분류명은 원문 모듈에서 가져오고, CSS 진입점은 import만 관리한다. 설정의 기본값과 덮어쓰기, 컴포넌트의 아이콘과 속성, 테스트의 입력과 기대값은 해당 책임 안에서 함께 관리한다.
- 데모는 별도 컴포넌트 파일에 구현하고 묶음별 등록 목록에서 기법 ID에 연결한다. `demoRegistry.ts`는 묶음별 등록을 합치고 `demoLoaders.ts`는 웹에서 같은 묶음의 ID를 지연 로딩에 연결한다. `InteractiveDemo`는 등록된 컴포넌트를 조회해 렌더링한다. 개별 데모 구현이나 ID별 분기는 `InteractiveDemo`에 두지 않는다.
- 기법을 추가하거나 바꿀 때 데이터·데모 연결·관련 CSS·`promptSnippet`을 대조한다. 새 기법의 재생 방식은 `demoPlayback.ts`에 등록하고, 테스트에서 ID 중복·누락과 지연 로딩 연결의 일치를 확인한다.
- 프롬프트는 기법을 단독으로 구현할 때의 입력 동작, 초기 상태, 타이밍, 반복·종료 조건과 시각 효과를 설명한다. 데모에 없는 기능이나 실제 API·오디오·물리 엔진 연동을 있다고 쓰지 않는다.
- 프롬프트 품질의 목표는 **의도한 효과와 상호작용 재현**이다. 색·문구·치수 등 외형의 완전 일치는 별도 요구가 있을 때만 검증한다. 상세 기준은 [프롬프트 품질 기준](docs/prompt-quality.md)을 따른다.
- 분류를 바꾸면 도메인·카테고리 타입과 메타데이터, 필터·검색·개수 표시의 영향을 확인한다. 기법 개수를 별도 상수로 중복 관리하지 않는다.
- 기법 ID는 데모 연결과 저장된 선택 복원에 쓰인다. 구조만 정리할 때 ID·순서·원문을 보존하고, 이름이나 문구만 바꿀 때도 ID를 유지한다. 삭제·ID 변경이 필요하면 기존 저장 데이터에 미치는 영향을 확인한다.

### 언어와 검색

- `apps/web/src/i18n/`에서 기본 UI와 기본 데모 문구는 `base.messages.ts`, 확장 기법 묶음별 문구는 `demos/*.messages.ts`에 정의한다. `actions.copyPrompt` 같은 고정 키로 등록하고 `t(key, params)`로 표시한다. `messages.ko.ts`와 `messages.en.ts`는 언어별 사전을 합친다. 한국어 문구를 고쳐도 키를 유지하고, 키를 추가하거나 삭제하면 두 언어를 함께 수정한다. 한국어 원문을 키로 쓰는 `tr`이나 미등록 문구를 원문으로 돌려주는 우회는 추가하지 않는다.
- 숫자·검색어·적용 대상 등은 이름이 있는 자리표시자(`{count}`, `{query}`)로 전달하고 언어별 문장 조각을 이어 붙이지 않는다. 양쪽 자리표시자 이름을 일치시킨다. 상태에는 번역 결과 대신 ID·숫자·메시지 키를 보관하고 표시할 때 번역한다.
- 데모의 영문 타이틀 등 의도적으로 유지할 샘플 문구도 고정 키로 등록하고 양쪽 값을 동일하게 둔다. 한국어 주석·사용자 입력·공용 카탈로그 데이터는 UI 문구 검사와 구분한다. 새 UI 문구를 JSX 텍스트·속성이나 한국어 문자열로 직접 넣지 않는다.
- `npm run check:i18n`으로 사전·소스 검사를 실행한다. 웹 테스트와 빌드에도 자동 연결되어 있다. `npm test`는 잘못된 키·필수 자리표시자·전체 사전의 타입 검사도 수행한다. 자동 검사는 번역 의미가 최신인지 판단하지 못하므로 한국어 의미를 바꾸면 영어 의미도 함께 검토한다.
- 기법 추가·변경 시 영어 요약·키워드·프롬프트와 검색 메타데이터도 함께 유지한다. 번역과 메타데이터의 전체 ID 일치 테스트를 통과해야 한다. 상세 기준은 [카탈로그 언어와 검색](docs/catalog-language-search.md)을 따른다.
- 검색은 표시 언어와 관계없이 한영 정보를 함께 사용하며, 웹과 MCP는 콘텐츠 유형별로 공용 카탈로그의 검색 순위를 공유한다. MCP 검색 결과에서는 요약을 제공하고 프롬프트 원문은 상세 조회로 제공한다.
- 언어 전환으로 기법 ID·조합기 선택 순서·사용자 입력 대상을 바꾸지 않는다. 복사는 선택 언어의 원문을 사용한다.

### 조합기·저장·복사

- 조합기는 **하나의 공통 적용 대상**을 사용한다. 선택 기법이 없거나 대상이 비었거나 공백뿐이면 버튼과 핸들러 모두에서 복사를 차단한다. 개별 카드 복사에는 이 대상 입력을 요구하지 않는다.
- 조합 프롬프트에는 기법을 선택 순서대로 넣는다. 모든 기법을 공통 적용 대상 안에만 구현하고, 대상 밖의 화면·컴포넌트와 선택 기법에 무관한 기존 동작을 유지하도록 지시한다.
- 기법 간 충돌은 현재 감지하거나 차단하지 않는다. 서로 다른 스타일도 대상이 있으면 함께 복사할 수 있다. 충돌 감지·자동 제외·우선순위 같은 새 업무 규칙은 별도 요구 없이 추가하지 않는다.
- 저장은 `usePromptCart`, 복사는 `useClipboard`를 우선 재사용한다. 저장된 기법은 ID로 최신 카탈로그에 연결하고, 과거에 저장된 프롬프트 원문을 신뢰해 복원하지 않는다.
- 저장 데이터를 읽을 수 없거나 데이터가 손상됐으면 조합기를 기본 상태로 연다. 쓰기 실패 시 안내를 표시하고 조합기를 계속 사용할 수 있게 한다. 저장 키나 형식을 바꾸면 기존 데이터 복원을 확인한다.
- 복사 성공은 클립보드 Promise가 성공한 뒤 표시한다. 권한 거부·API 부재를 성공으로 표시하지 않으며, 원문 변경이나 언마운트 후 이전 비동기 결과가 상태를 덮어쓰지 않도록 한다.

### UI와 애니메이션

- 어두운 배경이 효과의 핵심인 데모는 `TechniqueCard.tsx`의 `DARK_STAGE_IDS`로 배경 예외를 확인한다.
- 화면 진입을 감지할 수 있는 브라우저에서는 화면 근처의 데모만 마운트한다. `IntersectionObserver`를 지원하지 않으면 데모를 바로 마운트한다. 언마운트 시 타이머·이벤트·애니메이션 프레임을 정리한다.
- 스크롤·드래그·키보드 동작을 바꾸면 카드 내부 상호작용과 페이지 이동이 간섭하는지 확인한다. 공통 CSS·키프레임 변경은 다른 데모에도 영향을 줄 수 있으므로 참조 위치를 검색한다.
- 화면이나 UI 요소를 추가하거나 변경할 때는 같은 역할의 기존 화면을 기준으로 배치·여백·글자 크기·색상·버튼과 입력의 상태 표현을 맞춘다. 공통 컴포넌트·훅·Tailwind 유틸리티·CSS를 우선 재사용한다. 단순한 효과를 위해 새 애니메이션 라이브러리나 상태 관리 계층을 추가하지 않는다.

### 최적화

- 기능·콘텐츠를 추가하거나 변경할 때마다 변경 범위의 중복 로딩·렌더링·검색 계산·리소스 사용을 점검한다. 기존 지연 로딩과 공용 검색을 우선 활용한다.
- 성능 최적화를 검토할 때는 초기 로딩 크기나 검색 시간처럼 개선할 지표를 먼저 정하고, 동일한 기능과 콘텐츠를 기준으로 최적화 후보의 적용 전후를 같은 실행 환경·입력·측정 방법으로 비교한다. 적용 전 값을 기준으로 대상 지표가 **20% 이상 개선된 경우에만** 최적화를 적용한다. 측정 조건과 전후 수치, 개선율을 기록한다.

## 실행과 검증

저장소 루트에서 npm workspaces 명령을 실행한다. 개발과 CI는 Node.js 24를 기준으로 한다. 전체 명령과 용도는 [개발과 검증](docs/development.md#개발과-검증), MCP 실행 요구사항과 연결 방법은 [MCP 안내](apps/mcp/README.md)를 따른다.

- 앱 코드·기법 데이터·스타일 변경은 `npm test`와 `npm run build`를 실행한다. 동작을 바꾸면 관련 성공·실패 조건을 검증하고 기존 테스트가 해당 조건을 다루지 않으면 보완한다. 단순 문구·문서 변경에는 새 테스트를 요구하지 않는다.
- MCP 조회는 [서비스 콘텐츠와 MCP](#서비스-콘텐츠와-mcp)의 조건에 따라 검증한다. 패키징을 바꾸면 `npm run check:package`로 tarball의 파일 목록·독립 설치·조회 결과와 프롬프트 원문을 확인한다.
- `npm run lint`는 자동 수정 없이 정적 오류를 검사하며 PR·Pages CI에서 실패를 차단한다.
- UI를 추가하거나 변경하면 실제 브라우저에서 변경한 데모·화면의 동작과 반응형 레이아웃을 검증한다. 라이트·다크 테마에서 같은 역할의 기존 화면과 디자인을 비교한다. 모바일·태블릿·데스크톱의 대표 화면 폭과 레이아웃 전환 경계 전후에서 콘텐츠 잘림·겹침, 주요 버튼·입력·스크롤을 확인한다. 변경과 관련된 복사와 새로고침 후 복원도 점검한다. 자동 웹 테스트와 브라우저 검증 결과를 구분하고 미실행 항목과 이유를 보고한다.
- 문서만 바꾸면 코드·명령·경로와의 일치 및 diff를 확인한다.

## 문서 관리

- 반복해서 참고할 사용·개발 지침과 결정 근거는 [문서 안내](docs/README.md)에 따라 배치한다. 루트 `README.md`와 npm에 포함되는 `apps/mcp/README.md`는 서비스 소개·설치·사용 안내를 담당한다.
- 초안, 일회성 조사 보고서, 원시 로그·측정값, 생성 UI, 임시 스크린샷과 백업은 Git에서 제외되는 `docs/local/`에 둔다. 공유할 가치가 있는 작업 기록은 `docs/tasks/<task>/`에 남긴다. 원인·결정 이유·중요한 검증 결과와 한계를 요약하고, 공유에 필요한 첨부만 문서 가까이에 둔다. `docs/local/` 원본은 강제로 Git에 추가하지 않는다.
- 공유 문서는 다른 사람이 읽고 사용할 수 있어야 한다. 개인 PC 절대 경로나 localhost·세션 전용 링크를 넣지 않고, 저장소 상대 링크 또는 접근 가능한 고정 커밋·PR 링크를 사용한다.
- 코드 변경 시 관련된 현재 지침을 함께 갱신한다. 과거 기록에는 날짜·기준 커밋·후속 해결 상태를 표시하고, 당시 수치나 검증 결과를 현재 상태처럼 고치지 않는다. 특정 행을 인용한 과거 코드 링크는 가능하면 기준 커밋에 고정한다.

## 배포와 작업 범위

- 웹과 MCP는 각각 `apps/web/package.json`과 `apps/mcp/package.json`의 버전으로 릴리스한다. 앱 전용 변경으로 버전을 올릴 때는 해당 앱의 버전만 올린다. 공용 카탈로그 변경은 영향을 받는 두 앱에 각각 기록해 각 릴리스에 반영한다.
- `master` 대상 PR이나 버전업을 준비할 때 `CHANGE_LOG.md`에 사용자에게 영향을 주는 변경과 호환성 영향을 기록한다. 릴리스 전에는 해당 앱의 `미배포`에 기록하고, 버전을 올릴 때 이번 릴리스에 포함할 항목만 해당 앱의 버전 기록으로 옮긴다. 앱 manifest·루트 잠금 파일·변경 기록의 버전을 맞춘다. 앱 버전과 무관한 문서·개발 지침 변경은 `저장소 관리`에 기록한다.
- `apps/web/vite.config.ts`의 `base`는 `/vibe-dictionary/`다. 자산 URL과 경로를 바꿀 때 GitHub Pages 하위 경로에서 동작하는지 확인한다.
- `.github/workflows/check-pr.yml`은 `master` 대상 PR에서 검사와 빌드를 수행한다. `master` push나 수동 실행은 `.github/workflows/deploy-pages.yml`을 시작하며, 검사를 통과하면 `apps/web/dist/`를 GitHub Pages에 배포한다. 커밋 요청을 push·배포 승인으로 해석하지 않는다.
- `dist/`, `node_modules/`, `*.tsbuildinfo`는 생성물이다. 원본 코드를 수정하고 생성물은 커밋하지 않는다.
- npm 공개 패키지는 `@keke1933/vibe-dictionary-mcp` 하나다. 루트·웹·내부 카탈로그의 `private: true`를 유지한다. `publish-npm.yml`은 `master`에서 수동 실행하고 버전·감사·테스트·빌드·독립 설치 검증을 통과한 tarball을 OIDC로 게시한다. 준비·커밋·push 요청을 npm 게시 승인으로 해석하지 않는다. 최초 설정은 [npm 게시 안내](docs/npm-publishing.md)를 따른다.
- 직접 작성한 코드·기법 데이터·프롬프트는 MIT다. 루트 `LICENSE`와 배포용 `apps/mcp/LICENSE`를 함께 유지하고, `npm run check:package`로 두 라이선스 파일의 일치를 검증한다. 제3자 의존성 라이선스는 별개다.
- 저장소 지침·문서를 바꾸는 요청에는 관련 없는 앱 코드, 패키지, CI 설정 변경을 섞지 않는다.
