# Vibe Dictionary MCP

바이브 코딩 사전의 디자인 기법과 도메인 지식을 검색하고 참고 원문을 가져오는 읽기 전용 로컬 MCP다. Node.js 22.12 이상이 필요하며, 현재 검증 환경은 Node.js 24다. 아래 도메인 지식 도구는 현재 소스 기준이며, npm 배포 버전은 별도로 확인해야 한다.

## 제공하는 도구

| 도구 | 입력 | 결과 |
| --- | --- | --- |
| `search_techniques` | 선택: `query`, `domain`, `category`, `target`, `trigger`, `locale`, `limit`, `offset` | 요약·사용 상황·검색 근거·점수·페이지 정보 |
| `get_technique` | 필수: `id`, 선택: `locale` | 기법 상세·별칭·키워드·해당 언어의 `promptSnippet` 원문 |
| `search_domain_knowledge` | 선택: `query`, `locale`, `limit`, `offset` | 도메인 지식 요약·사용 상황·관련도·매칭 필드와 페이지 정보 |
| `get_domain_knowledge` | 필수: `id`, 선택: `locale` | 개념·결정할 질문·예시·관련 기법 ID·참고 자료·프롬프트 |

모든 도구의 `locale`은 `ko`(기본) 또는 `en`이다. 기법 조회의 `titleKo`·`titleEn`은 호환성을 위해 두 이름을 유지한다. 검색 언어는 출력 언어와 독립적이므로 한국어로 검색한 뒤 영어 원문을 받을 수 있다.

도메인 지식은 한영 이름·별칭·사용 상황과 개념·흐름·결정 질문을 함께 검색한다. `LMS`, `온라인 강의`, `재시도`, `회원 전용`, `신고 처리`, `private group`처럼 짧은 서비스명이나 업무 표현으로 `search_domain_knowledge`를 호출한다. 한영 동의어·대소문자·문장 부호를 정규화하고 매칭 범위와 필드 중요도로 정렬하는 키워드 검색이며, 의미를 추론하는 AI 검색은 아니다. 결과의 `useCases`와 `matchedOn`을 비교해 선택하고 반환된 ID를 `get_domain_knowledge`에 전달한다. `score`는 신뢰 확률이 아니며, 결과가 맞지 않으면 동의어나 더 짧은 검색어로 다시 찾는다. 검색어가 비어 있으면 목록 순서로 조회한다.

상세 조회에는 개념·서비스 흐름·자주 놓치는 상황·질문·예시·프롬프트·출처를 제공한다. 흐름과 예시는 참고이며 결정할 질문은 정해진 규칙이 아니다. 관련 기법은 화면 표현을 돕는 참고 자료다. 코드 실행이나 교육 평가 기능을 제공하지 않는다.

기법 검색은 한영 이름·별칭·효과 키워드·사용 상황·요약·프롬프트를 대상으로 한다. 대소문자를 구분하지 않으며, 동의어를 연결하고 이름·별칭·사용 상황을 본문보다 우선한다. 모든 단어의 일치를 요구하지 않고 검색어 충족 비율로 후보를 좁힌다.

자연어 요청은 호출하는 AI가 해석한다. AI가 한 효과를 나타내는 짧은 한영 검색어를 생성 → MCP가 키워드로 후보 조회 → AI가 요약·사용 상황을 비교하고 필요하면 동의어·다른 언어·수식어를 줄인 표현으로 재검색 → 선택한 ID의 프롬프트를 조회한다. 예를 들어 “글을 고친 뒤 아직 저장하지 않았다는 표시”는 `저장 상태` 또는 `unsaved changes`로 검색한다. 필수 조건은 유지하고 불필요한 필터만 넓히며, 검색어나 필터를 바꾸면 `offset: 0`부터 조회한다. 순위가 높아도 요구에 맞지 않으면 선택하지 않는다.

도메인은 `ui`(UI), `motion`(그래픽), `layout`(레이아웃), `style`(스타일), `video`(모션 영상)다. 카테고리·대상·입력 ID는 도구 스키마에서 확인한다. 모든 필터는 함께 만족해야 한다. `target: "button"`, `trigger: "pointer-move"`처럼 필수 조건만 지정한다. 제목에 scroll/drag/audio가 있어도 실제 데모는 클릭·타이머 시연일 수 있으므로 `triggers`와 원문을 확인한다.

검색어가 있으면 관련도순이며 `score`는 정렬용 수치로 적합성 확률이 아니다. `matchedOn`은 일치한 필드명(`title`, `alias`, `keyword`, `useCase`, `target`, `trigger`, `summary`, `prompt`)이다. `query`를 생략하면 카탈로그 순서로 목록을 조회한다. 일치가 없으면 빈 목록을 반환한다.

`total`은 전체 일치 개수다. 기본 페이지 크기는 20, 최대 50이며 처음 후보를 좁힐 때는 `limit: 5`를 권장한다. `nextOffset`을 다음 요청의 `offset`으로 보내 이어서 조회한다. `nextOffset: null`이면 마지막 페이지다. 잘못된 입력과 존재하지 않는 상세 ID는 MCP 오류 결과를 반환한다.

검색 결과에는 프롬프트 전문을 넣지 않는다. 선택한 ID를 `get_technique`로 조회하면 웹과 같은 언어의 원문을 받는다. MCP는 조합·클립보드·프로젝트 파일 수정·UI 생성을 수행하지 않는다. 외부 API 호출·모델 다운로드·추론·벡터 인덱스가 필요 없다. MCP는 전달받은 검색어로 로컬 카탈로그를 조회하며 검색어 생성은 연결한 AI 클라이언트가 담당한다.

### English usage

The calling AI converts a natural-language request into short keywords for one effect. For a button that follows the mouse, search "magnetic button", compare candidate summaries and use cases, then retrieve only the selected prompt:

```json
{"query":"magnetic button","target":"button","trigger":"pointer-move","locale":"en","limit":5}
```

Then call `get_technique`:

```json
{"id":"magnetic-hover","locale":"en"}
```

Search matches both Korean and English regardless of output locale. Scores indicate relative ranking, not confidence. Unknown or unsuitable results require reformulating the query or clarifying the request. Tools return reference text only and never modify your project.

If candidates are empty or unsuitable, retry a synonym, the other language or fewer modifiers. Broaden only optional filters and restart at offset zero when changing the query or filters. The MCP runs keyword search locally and requires no embedding model, vector index or API key.

These capabilities describe the current source. An installed, pinned npm version does not automatically pick up local source changes. For local verification, build the repository and register `node <repository>/apps/mcp/dist/index.js` with your MCP client, then restart that server.

## npm 패키지로 Codex에 연결

공개 패키지는 [@keke1933/vibe-dictionary-mcp](https://www.npmjs.com/package/@keke1933/vibe-dictionary-mcp)다. 저장소 복제·로컬 빌드·웹 서버 실행 없이 사용할 수 있다. Node.js 22.12 이상과 npm, `codex` CLI를 먼저 설치하고 터미널에서 다음 명령이 동작하는지 확인한다. MCP 자체에는 API 키나 npm 로그인이 필요 없다. Codex는 별도로 사용할 수 있도록 설정되어 있어야 한다.

```sh
node --version
npm --version
codex --version
```

### 1. npx로 등록하기

**macOS / Linux**

```sh
codex mcp add vibe-dictionary -- npx -y --registry=https://registry.npmjs.org/ @keke1933/vibe-dictionary-mcp@0.1.2
```

**Windows (PowerShell)**

```powershell
codex mcp add vibe-dictionary -- cmd /d /c npx -y --registry=https://registry.npmjs.org/ @keke1933/vibe-dictionary-mcp@0.1.2
```

`npx`가 지정한 패키지를 npm 캐시에 설치해 실행한다. `-y`는 다운로드 확인 질문에 자동 동의하는 옵션이다. 별도 전역 패키지 설치는 필요 없으며, 프로젝트의 `package.json`에도 의존성을 추가하지 않는다. Windows는 `.cmd`를 실행할 수 있도록 `cmd /d /c`로 감싼다. `/d`는 cmd의 AutoRun 명령을 사용하지 않게 한다.

명령은 Codex의 **사용자 전역 MCP 설정**을 등록하므로 다른 프로젝트에서도 사용할 수 있다. 기본 파일은 `~/.codex/config.toml`이고, Windows는 `%USERPROFILE%\.codex\config.toml`이다. `CODEX_HOME`이 설정되어 있으면 그 폴더의 `config.toml`을 사용한다. 기존 `vibe-dictionary` 등록이 있다면 실행 명령이 갱신된다.

### 2. 연결과 실제 도구 호출 확인하기

```sh
codex mcp get vibe-dictionary
```

실행 인수에 `@keke1933/vibe-dictionary-mcp@0.1.2`이 있고 등록이 활성화되었는지 확인한다. 이 명령은 설정을 보여줄 뿐 서버의 실제 연결 성공을 보장하지는 않는다. 앱의 MCP 서버를 재시작하거나 새 Codex 세션에서 다음과 같이 요청한다.

> vibe-dictionary MCP에서 마그네틱 기법을 검색한 뒤 magnetic-hover의 프롬프트 원문을 가져와 줘. 코드는 수정하지 마.

실제 `search_techniques` 호출에 `magnetic-hover`가 반환되고, 이어지는 `get_technique` 호출에 `promptSnippet` 원문이 포함되면 정상이다. 터미널 Codex에서는 `/mcp`로 활성 MCP 목록도 확인할 수 있다.

### config.toml을 직접 작성하는 경우

CLI 등록 대신 아래 설정을 같은 파일의 기존 내용과 합칠 수 있다. 같은 이름의 테이블을 중복으로 만들지 않는다.

**macOS / Linux**

```toml
[mcp_servers.vibe-dictionary]
command = "npx"
args = ["-y", "--registry=https://registry.npmjs.org/", "@keke1933/vibe-dictionary-mcp@0.1.2"]
```

**Windows**

```toml
[mcp_servers.vibe-dictionary]
command = "cmd"
args = ["/d", "/c", "npx", "-y", "--registry=https://registry.npmjs.org/", "@keke1933/vibe-dictionary-mcp@0.1.2"]
```

다른 MCP 클라이언트도 `stdio` 전송 방식으로 위 `command`·`args`를 등록하면 된다. 클라이언트마다 설정 형식은 다르다.

### 선택 사항: npm 전역 설치 후 연결

실행 파일을 직접 설치해 관리하고 싶다면 `npx` 방식 대신 전역 설치를 사용할 수 있다. 다음 명령으로 패키지를 설치한다.

```sh
npm install --global @keke1933/vibe-dictionary-mcp@0.1.2 --registry=https://registry.npmjs.org/
```

설치 후 **macOS / Linux**에서는 다음과 같이 등록한다.

```sh
codex mcp add vibe-dictionary -- vibe-dictionary-mcp
```

**Windows (PowerShell)**에서는 다음과 같이 등록한다.

```powershell
codex mcp add vibe-dictionary -- cmd /d /c vibe-dictionary-mcp
```

npm 전역 실행 파일 폴더가 Codex의 `PATH`에 있어야 한다. `npx` 등록과 전역 설치 등록 중 하나만 사용하며, 같은 이름으로 등록하면 실행 방식이 갱신된다.

### 버전 변경과 연결 해제

예제는 재현 가능한 실행을 위해 버전을 `0.1.2`로 고정한다. 새 버전을 사용하려면 원하는 버전이 npm에 공개되었는지 확인한 후 등록 명령의 버전을 바꿔 다시 실행하고 MCP를 재시작한다. 전역 설치 방식은 `npm install --global`의 버전을 바꿔 재설치한다. 새 버전 게시만으로 기존 설정의 버전이 자동으로 바뀌지는 않는다.

```sh
codex mcp remove vibe-dictionary
```

위 명령은 Codex 연결 설정을 제거한다. 선택 사항으로 전역 설치했던 패키지까지 제거하려면 `npm uninstall --global @keke1933/vibe-dictionary-mcp`를 실행한다.

### 연결이 안 될 때

- `node`, `npm`, `npx`를 찾지 못하면 Node.js 설치와 `PATH`를 확인하고 Codex 앱을 다시 시작한다. 버전 관리자나 사용자 지정 설치 경로를 사용한다면 Codex도 해당 실행 파일을 찾을 수 있어야 한다.
- Windows에서 실행 형식 오류가 나면 위 `cmd /d /c` 설정을 사용한다. PowerShell이 `npm.ps1` 실행을 막는 경우 설치·버전 확인 명령은 `npm.cmd`로 실행할 수 있다.
- 최초 다운로드가 기본 시작 제한인 10초를 넘으면 `[mcp_servers.vibe-dictionary]` 아래에 `startup_timeout_sec = 60`을 추가하고 재시작한다. 설정 파일 전체를 덮어쓰지 않는다.
- 다운로드 오류나 `E404`가 나면 npm 레지스트리 접근과 지정 버전의 공개 여부를 확인한다. 패키지 설치·확인 과정은 네트워크를 사용할 수 있지만, 실행된 MCP의 검색·조회는 외부 API를 호출하지 않는다.
- 터미널에서 MCP만 직접 실행했을 때 출력 없이 대기하는 것은 stdio 요청을 기다리는 동작이다. 실제 연결 확인은 Codex의 도구 호출로 진행한다.

## 라이선스

이 패키지의 코드·기법·프롬프트는 [MIT License](LICENSE)를 따른다. 제3자 의존성은 각각의 라이선스를 따른다.

연결 방식의 근거: [Codex 공식 MCP 문서](https://developers.openai.com/codex/mcp), [npm npx 문서](https://docs.npmjs.com/cli/v11/commands/npx/), [npm 전역 설치 문서](https://docs.npmjs.com/downloading-and-installing-packages-globally/).
