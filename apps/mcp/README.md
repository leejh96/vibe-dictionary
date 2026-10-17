# Vibe Dictionary MCP

바이브 코딩 사전의 기법을 검색하고 구현용 프롬프트 원문을 가져오는 읽기 전용 로컬 MCP다. Node.js 22.12 이상이 필요하며, 현재 검증 환경은 Node.js 24다.

## 제공하는 도구

| 도구 | 입력 | 결과 |
| --- | --- | --- |
| `search_techniques` | 선택 사항: `query`, `domain`, `category`, `limit`, `offset` | 기법 ID·이름·분류·요약과 페이지 정보 |
| `get_technique` | 필수: `id` | 기법 상세·키워드·`promptSnippet` 원문 |

`query`를 생략하면 전체 목록을 조회한다. 공백으로 나눈 검색어를 모두 포함하는 항목을 찾으며, 영문 대소문자를 구분하지 않는다. 검색 대상은 한·영 이름, 효과 태그, 키워드, 요약과 프롬프트다. 문장 의미를 추론하는 검색은 아니므로 `마그네틱`, `magnetic`, `카드`, `SVG`처럼 짧은 검색어를 사용한다.

도메인은 `ui`(UI), `motion`(그래픽), `layout`(레이아웃), `style`(스타일), `video`(모션 영상)다. 카테고리 ID는 도구의 입력 스키마와 검색 결과에서 확인한다. 도메인·카테고리 필터를 함께 지정하면 둘 다 만족해야 한다. 검색 결과는 카탈로그 순서이며 관련도 순위는 제공하지 않는다.

검색 결과의 `total`은 필터와 검색 조건에 맞는 전체 개수다. 기본 페이지 크기는 20, 최대는 50이며 `nextOffset`을 다음 요청의 `offset`으로 보내면 이어서 조회한다. `nextOffset: null`이면 마지막 페이지다. 일치 항목이 없으면 빈 목록을 반환한다. 잘못된 입력과 존재하지 않는 상세 ID는 MCP 오류 결과를 반환한다.

검색 결과에는 프롬프트 전문을 넣지 않는다. 선택한 기법을 `get_technique`로 조회하면 웹과 같은 원문을 받을 수 있다. MCP 자체는 조합·클립보드 접근·프로젝트 파일 수정·UI 생성·외부 API 호출을 수행하지 않는다. 구현은 연결한 코딩 에이전트가 사용자 요청에 따라 수행한다.

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

다른 MCP 클라이언트도 `stdio` 전송 방식으로 위 `command`와 `args`를 등록하면 된다. 클라이언트마다 설정 형식은 다르다. 표준 출력은 MCP 통신 전용이므로 실행 명령을 `npm run start`로 감싸지 않는다.

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

## 저장소 개발용 로컬 빌드 연결

패키지를 사용하는 대신 소스를 수정하며 확인할 때만 저장소 루트에서 다음 명령을 실행한다.

```sh
npm ci
npm run build:mcp
codex mcp add vibe-dictionary -- node "/absolute/path/to/vibe-dictionary/apps/mcp/dist/index.js"
```

예제 경로를 자신의 빌드 파일 **실제 절대 경로**로 바꾼다. `node`가 Codex의 `PATH`에 없다면 Node 실행 파일도 절대 경로로 지정한다. 같은 이름의 npm 연결을 로컬 빌드 연결로 바꾸므로, 공개 패키지로 돌아가려면 위 npm 등록 명령을 다시 실행한다.

## 데이터와 배포

기법 데이터와 검색 함수는 내부 패키지 `@vibe-dictionary/catalog`로 웹과 공유하며 빌드 시 실행 파일에 포함된다. 카탈로그는 빌드 전용 의존성이므로 사용자 설치 시 별도로 가져오지 않는다. 실행 중에는 웹 접속·API 키·네트워크 연결이 필요 없다. 패키지 다운로드와 의존성 설치 시에는 네트워크가 필요하다. 카탈로그 변경은 재빌드하고 MCP 프로세스를 재시작해야 반영된다. npm 배포 이후에는 새 패키지 버전도 게시해야 한다.

저장소에서 `npm test`는 웹 회귀 테스트와 빌드된 MCP의 실제 stdio 연결 테스트를 함께 실행한다. `npm run build`는 웹과 MCP 전체 빌드, `npm run build:web`은 웹만, `npm run build:mcp`는 MCP만 빌드한다.

저장소 루트에서 다음 명령으로 배포 파일을 검증할 수 있다. 실행 파일·이 문서·LICENSE·패키지 메타데이터 4개만 포함하는지 검사하고, tarball을 임시 경로에 설치해 도구 목록과 모든 기법·프롬프트 원문을 대조한다. 설치에는 npm 레지스트리 연결이 필요하다. 최종 tarball 경로를 출력하며, 임시 설치 폴더는 정리한다.

```sh
npm run check:package
```

저장소 관리자는 GitHub Actions의 `Publish MCP to npm`을 `master`에서 수동 실행한다. 입력한 버전은 이미 커밋된 MCP 버전과 같아야 하며, GitHub `npm` environment와 npm Trusted Publisher를 사전에 설정한다. 최초 1회 패키지 생성·2FA 게시와 설정값은 [npm 게시 안내](https://github.com/leejh96/vibe-dictionary/blob/master/docs/npm-publishing.md)를 참고한다. npm 토큰을 GitHub Secrets에 추가할 필요는 없다.

## 라이선스

MCP 코드와 번들에 포함된 기법 데이터·프롬프트는 [MIT License](LICENSE)를 따른다. 제3자 의존성은 각각의 라이선스를 따른다.

연결 방식의 근거: [MCP 공식 SDK](https://ts.sdk.modelcontextprotocol.io/server), [Codex 공식 MCP 문서](https://developers.openai.com/codex/mcp), [npm npx 문서](https://docs.npmjs.com/cli/v11/commands/npx/), [npm 전역 설치 문서](https://docs.npmjs.com/downloading-and-installing-packages-globally/).
