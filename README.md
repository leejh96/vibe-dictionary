# 바이브 코딩 사전

UI·그래픽·레이아웃·스타일·모션 영상 기법의 데모를 보고 구현용 프롬프트를 가져오는 서비스다. 웹은 [GitHub Pages](https://leejh96.github.io/vibe-dictionary/)에서, 읽기 전용 MCP는 사용자의 PC에서 실행한다.

## npm MCP를 Codex에 연결하기

저장소를 복제하거나 웹 서버를 실행할 필요 없이 [npm 패키지](https://www.npmjs.com/package/@keke1933/vibe-dictionary-mcp)를 사용할 수 있다. Node.js 22.12 이상과 npm, `codex` CLI가 필요하다. 검증 환경은 Node.js 24다.

**macOS / Linux**

```sh
codex mcp add vibe-dictionary -- npx -y --registry=https://registry.npmjs.org/ @keke1933/vibe-dictionary-mcp@0.1.1
```

**Windows (PowerShell)**

```powershell
codex mcp add vibe-dictionary -- cmd /d /c npx -y --registry=https://registry.npmjs.org/ @keke1933/vibe-dictionary-mcp@0.1.1
```

`npx`가 지정 버전을 npm에서 받아 캐시에 설치하므로 별도 `npm install -g`는 필요 없다. Codex 연결 설정은 사용자 전역 설정인 `~/.codex/config.toml`에 등록된다. Windows는 `%USERPROFILE%\.codex\config.toml`이며, `CODEX_HOME`을 지정했다면 그 폴더를 사용한다. Windows 명령은 `.cmd` 실행을 위해 `cmd /d /c`를 사용한다.

다음 명령으로 등록을 확인하고, Codex의 MCP 서버를 재시작하거나 새 세션에서 사용한다. `get`은 설정 확인이므로 실제 연결은 아래 요청의 도구 호출까지 확인한다.

```sh
codex mcp get vibe-dictionary
```

> vibe-dictionary MCP에서 마그네틱 기법을 검색한 뒤 magnetic-hover의 프롬프트 원문을 가져와 줘. 코드는 수정하지 마.

`search_techniques` 검색 결과와 `get_technique`의 `promptSnippet`이 반환되면 연결된 것이다. MCP 자체에는 API 키나 npm 로그인이 필요 없다. 패키지를 받거나 확인하는 `npx` 실행에는 네트워크가 필요할 수 있다.

수동 설정, 선택적 전역 설치, 버전 변경·연결 해제와 문제 해결은 [MCP 사용 안내](apps/mcp/README.md)를 따른다. 연결 설정은 [Codex 공식 문서](https://developers.openai.com/codex/mcp), 캐시 설치 방식은 [npm npx 문서](https://docs.npmjs.com/cli/v11/commands/npx/)를 참고한다.

## 저장소 구조

```text
apps/
  web/                 React 웹 앱
    src/               화면·데모·훅·스타일
    tests/             웹 동작 회귀 테스트
    public/            정적 파일
    index.html
    vite.config.ts
    postcss.config.js
    tsconfig.json
    package.json
  mcp/                 로컬 MCP 실행·패키징
    src/               stdio 연결과 읽기 전용 도구
    tests/             빌드된 실행 파일의 실제 연결 테스트
    tsconfig.json
    package.json
packages/
  catalog/             웹과 MCP가 공유하는 기법·분류·검색
    src/
    package.json
docs/                  공유 지침과 보관한 작업 기록
  local/               Git에서 제외한 임시 자료
.github/workflows/     PR 검증·웹 배포·수동 npm 게시
scripts/               npm 패키지 설치·내용 검증
package.json           공통 실행 명령과 개발 도구
package-lock.json      모든 workspace의 단일 잠금 파일
AGENTS.md              저장소 작업 기준
```

`apps`는 실행·배포하는 앱, `packages`는 앱이 공유하는 코드다. 웹과 MCP는 `@vibe-dictionary/catalog`의 공개 진입점으로 데이터와 검색 함수를 가져온다. 앱끼리 상대 경로로 다른 앱의 소스를 참조하지 않는다. 공용 패키지는 React·브라우저·MCP SDK에 의존하지 않는다.

카탈로그는 내부 전용 TypeScript 소스 패키지다. 웹과 MCP의 빌드 도구가 각각 카탈로그를 포함하므로 별도 빌드·배포는 필요 없다. MCP는 카탈로그를 빌드 시에만 사용하고, 배포용 실행 파일에는 데이터를 함께 포함한다. 설치 사용자는 비공개 카탈로그 패키지를 받을 필요가 없다.

## 개발과 검증

Node.js 24와 npm을 기준으로 개발한다. 모든 명령은 저장소 루트에서 실행한다.

| 명령 | 실행 내용 |
| --- | --- |
| `npm ci` | 단일 잠금 파일로 모든 workspace 설치·연결 |
| `npm run dev` | 웹 개발 서버 |
| `npm test` | 웹과 MCP 회귀 테스트 |
| `npm run test:web` | 웹 테스트만 실행 |
| `npm run test:mcp` | MCP 빌드 후 stdio 연결 테스트 |
| `npm run build` | 웹과 MCP 전체 빌드 |
| `npm run build:web` | 웹 타입 검사·빌드 → `apps/web/dist/` |
| `npm run build:mcp` | MCP 타입 검사·번들링 → `apps/mcp/dist/index.js` |
| `npm run check:package` | MCP 빌드·tarball 내용 검사·독립 설치·전체 기법 조회 검증 |
| `npm run preview` | 웹 빌드 결과 미리보기 |
| `npm run start:mcp` | 빌드된 MCP를 터미널에서 실행 |

각 앱의 실행 의존성은 해당 앱의 `package.json`에 둔다. TypeScript·테스트 실행 도구처럼 공통으로 쓰는 개발 도구만 루트에서 관리한다. 의존성 추가 시 대상 workspace를 지정한다. 잠금 파일은 루트의 하나만 관리한다.

```sh
npm install <package> --workspace vibe-dictionary-web
npm install <package> --workspace @keke1933/vibe-dictionary-mcp
```

## 배포와 MCP 연결

웹의 공개 경로는 `/vibe-dictionary/`다. Pages 워크플로는 전체 테스트 후 웹만 빌드하고 `apps/web/dist/`를 배포한다. 루트 `dist/`를 사용하지 않는다.

MCP의 npm 이름은 `@keke1933/vibe-dictionary-mcp`다. 사용자는 위 npm 연결 방법을, 저장소 관리자는 [연결·패키징 안내](apps/mcp/README.md)와 [npm 최초 설정·게시 안내](docs/npm-publishing.md)를 따른다. 기존 로컬 설정의 실행 경로가 `packages/mcp/dist/index.js`였다면 `apps/mcp/dist/index.js`로 바꾸거나 npm 방식으로 재등록하고 MCP 연결을 다시 시작해야 한다.

`publish-npm.yml`은 `master`에서 수동 실행하며 입력 버전 확인, 전체 테스트·빌드, 취약점 검사와 독립 설치 검증 후 검증한 tarball만 OIDC로 게시한다. 루트·웹·내부 카탈로그는 `private: true`를 유지한다. 워크플로 추가나 `master` push만으로 npm에 게시하지 않는다.

기법 수정은 `packages/catalog/src/techniques.ts`, 데모 수정은 `apps/web/src/components/demos/InteractiveDemos.tsx`에서 한다. 데이터 변경 시 두 앱을 검증하고, 프롬프트와 데모가 같은 효과를 설명하는지 확인한다.

문서 작성·보관 기준은 [문서 안내](docs/README.md), 변경·검증 기준은 [AGENTS.md](AGENTS.md)를 따른다.

## 라이선스

직접 작성한 웹·MCP 코드, 기법 데이터와 프롬프트는 [MIT License](LICENSE)를 따른다. 제3자 의존성은 각각의 라이선스를 따른다.
