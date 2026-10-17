# 개발 안내

소스 수정, 테스트, 빌드와 배포를 진행하는 개발자를 위한 문서다. 서비스 소개는 [프로젝트 README](../README.md), npm 설치와 Codex 연결은 [MCP 사용 안내](../apps/mcp/README.md)를 참고한다.

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

카탈로그는 npm에 별도로 게시하지 않는 내부 TypeScript workspace다. 웹과 MCP의 빌드 도구가 각각 카탈로그를 포함하므로 별도 빌드·배포는 필요 없다. MCP는 카탈로그를 빌드 시에만 사용하고, 배포용 실행 파일에는 데이터를 함께 포함한다. MCP 설치 시 카탈로그를 별도 패키지로 다운로드하지 않는다.

## 개발과 검증

Node.js 24와 npm을 기준으로 개발한다. 모든 명령은 저장소 루트에서 실행한다.

| 명령 | 실행 내용 |
| --- | --- |
| `npm ci` | 단일 잠금 파일로 모든 workspace 설치·연결 |
| `npm run dev` | 웹 개발 서버 |
| `npm test` | 카탈로그·웹·MCP 회귀 테스트 |
| `npm run test:catalog` | 한영 번역·검색 메타데이터·관련도 회귀 테스트 |
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

## 배포

웹의 공개 경로는 `/vibe-dictionary/`다. Pages 워크플로는 전체 테스트 후 웹만 빌드하고 `apps/web/dist/`를 배포한다. 루트 `dist/`를 사용하지 않는다.

MCP의 npm 이름은 `@keke1933/vibe-dictionary-mcp`다. 패키지 검증과 공개 게시 절차는 [npm 게시 안내](npm-publishing.md)를 따른다.

`publish-npm.yml`은 `master`에서 수동 실행하며 입력 버전 확인, 전체 테스트·빌드, 취약점 검사와 독립 설치 검증 후 검증한 tarball만 OIDC로 게시한다. 루트·웹·내부 카탈로그는 `private: true`를 유지한다. 워크플로 추가나 `master` push만으로 npm에 게시하지 않는다.

언어·검색 데이터 구조와 추가 절차는 [카탈로그 언어와 검색](catalog-language-search.md)을 따른다.

기법 수정은 `packages/catalog/src/techniques.ts`, 데모 수정은 `apps/web/src/components/demos/InteractiveDemos.tsx`에서 한다. 데이터 변경 시 두 앱을 검증하고, 프롬프트와 데모가 같은 효과를 설명하는지 확인한다.

문서 작성·보관 기준은 [문서 안내](README.md), 변경·검증 기준은 [프로젝트 작업 지침](../AGENTS.md)를 따른다.
