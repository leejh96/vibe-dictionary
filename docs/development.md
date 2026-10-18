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
| `npm run check:i18n` | 웹·데모의 번역 키·문구·자리표시자 검사 |
| `npm run test:web` | 언어 검사 후 웹 테스트 실행 |
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

웹과 MCP는 독립적인 버전을 사용한다. 현재 웹 버전은 `apps/web/package.json`, MCP 버전은 `apps/mcp/package.json`에서 확인하며, 루트·내부 카탈로그 버전은 앱의 배포 버전이 아니다. [변경 기록](../CHANGE_LOG.md)도 웹·MCP별로 `미배포`와 버전 기록을 분리한다. 공통 카탈로그 변경은 영향을 받는 두 앱에 각각 기록하고 각 앱의 릴리스에 반영한다.

웹 릴리스를 준비할 때는 `npm version <다음-웹-버전> --workspace vibe-dictionary-web --no-git-tag-version`으로 웹 버전과 루트 잠금 파일을 갱신한다. 변경 기록의 **웹 → 미배포**에서 이번 배포에 포함할 항목만 해당 웹 버전으로 옮기고, manifest·잠금 파일·변경 기록의 버전 일치를 확인한다. 웹 버전업으로 MCP 버전을 함께 올리지 않는다. 버전업 명령 자체는 커밋·push·Pages 배포를 수행하지 않는다.

MCP의 npm 이름은 `@keke1933/vibe-dictionary-mcp`다. 패키지 검증과 공개 게시 절차는 [npm 게시 안내](npm-publishing.md)를 따른다.

`publish-npm.yml`은 `master`에서 수동 실행하며 입력 버전 확인, 전체 테스트·빌드, 취약점 검사와 독립 설치 검증 후 검증한 tarball만 OIDC로 게시한다. 루트·웹·내부 카탈로그는 `private: true`를 유지한다. 워크플로 추가나 `master` push만으로 npm에 게시하지 않는다.

웹 테스트와 웹 빌드는 번역 사전·소스 검사를 먼저 실행하며, 번역 키 누락·빈 값·자리표시자 불일치·직접 작성한 UI 문구가 있으면 실패한다. 테스트는 번역 API의 타입 계약도 검사한다.

확장 기법의 영어 원문과 검색 정보는 `packages/catalog/src/translations/additions/`, `packages/catalog/src/search-metadata/additions/`에 카테고리별로 분리한다. 웹의 확장 데모 문구는 `apps/web/src/i18n/demos/*.messages.ts`에서 한영 키를 함께 관리하고 공통 사전에 합친다. 새 기법은 한국어 데이터·영어 프롬프트·검색 메타데이터·데모 연결·한영 문구를 함께 추가한다. 상세 계약은 [카탈로그 언어와 검색](catalog-language-search.md)을 따른다.

언어·검색 데이터 구조와 추가 절차는 [카탈로그 언어와 검색](catalog-language-search.md)을 따른다.

기법 타입·분류와 기존 데이터는 `packages/catalog/src/techniques.ts`에 있고, 확장 기법은 `packages/catalog/src/additions/`의 카테고리별 파일에서 관리해 `TECHNIQUES`에 합친다. 데모 진입점은 `apps/web/src/components/demos/InteractiveDemos.tsx`이며, 확장 데모와 전용 CSS는 `demos/` 아래 카테고리별 폴더에 둔다. 등록 목록을 제공하는 카테고리의 추가 데모는 각 폴더 `index.ts`의 ID별 컴포넌트 목록을 `additionalDemos.ts`에서 모아 연결하므로 카테고리 작업마다 공통 진입점을 수정하지 않아도 된다. 새 카테고리는 실제 첫 데모와 함께 목록을 등록하고 빈 목록만 미리 연결하지 않는다. 전용 CSS는 `src/index.css`에서 가져온다. 데이터 변경 시 두 앱을 검증하고, 프롬프트와 데모가 같은 효과를 설명하는지 확인한다.

카드의 데모·태그·타이틀·설명·액션 정렬은 `components/TechniqueCard.css`의 행 subgrid에서 관리한다. 같은 줄의 카드는 각 영역의 높이를 공유하며, 긴 문구는 자르지 않고 함께 늘린다. 카드마다 높이 측정 상태를 추가하지 말고, 1·2·3열과 프롬프트/복사 오류 표시를 함께 확인한다.

카드 미리보기의 CSS 애니메이션은 `useDemoReplay`가 최초 실행과 후속 시작을 기록해 호버 진입·캔버스 클릭에서 다시 재생한다. 데모를 재마운트하거나 입력·선택 상태를 초기화하지 않는다. 내부 버튼·입력은 자체 동작을 우선하며, 일시 정지·모션 감소 설정과 CSS 전환은 재생 처리에서 유지한다. 이는 사전의 미리보기 조작이며 기법 프롬프트의 고유 입력·타이밍을 바꾸지 않는다.

프롬프트의 `prompt-scroll`과 데모 내부의 스크롤바는 `src/scrollbars.css`에서 라이트·다크 테마와 네이티브 입력의 색상 모드를 함께 관리한다. 데모의 스크롤바는 6px, 프롬프트는 8px이며 어두운 배경을 유지하는 데모는 다크 색상을 따른다. 고정 헤더·중첩 가로 목록처럼 트랙 여백이 필요한 곳은 `--scrollbar-track-block`·`--scrollbar-track-inline`로 지정한다. 공통 스타일에서 `overflow`를 바꾸지 않으며, 필요한 스크롤·고정 헤더·양쪽 거터를 유지하고 드롭다운은 펼친 상태의 경계와 실제 넘침을 확인한다.

근접 가변·원통 회전 타이포는 `public/fonts/roboto-flex/`의 같은 로컬 WOFF2를 사용한다. VIBE 네 글자 전용 부분집합이며 일반 UI 폰트로 사용하지 않는다. 출처는 같은 폴더의 README, 별도 폰트 라이선스는 OFL.txt에 있다. 폰트·라이선스가 빌드 결과에 함께 복사되고 CSS URL이 `/vibe-dictionary/` 하위 경로에서 동작하는지 확인한다.

문서 작성·보관 기준은 [문서 안내](README.md), 변경·검증 기준은 [프로젝트 작업 지침](../AGENTS.md)를 따른다.
