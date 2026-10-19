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
| `npm run lint` | ESLint 정적 오류 검사, 경고도 실패 처리 |
| `npm run evaluate:search` | 고정한 한영 사용자 표현의 검색 품질 지표와 실패 행 출력 |
| `npm run audit:keywords` | 한영 추천 키워드의 중복과 원본 기법 검색 연결 검사 |
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

카드 미리보기는 `DemoAutoplay`가 화면 안에서 8초 주기로 자동 시연한다. 카메라·VFX·제품 컷 등의 매개변수 슬라이더는 미리보기에서 표시하지 않는다. 숫자 범위·전환 상태·반복 동작은 `useDemoNumber`·`useDemoToggle`·`useDemoPulse`·`useDemoSample`로 연결한다. 효과 데모를 클릭하면 시연 상태를 초기화하고 처음부터 반복한다. 공통 호버 재시작이나 카드 재생 버튼은 제공하지 않는다. 호버는 버튼 채움·레이어 펼침 등 해당 디자인 고유의 효과에만 사용한다. 폼 입력, 탐색·데이터·스크롤 예시는 기존 조작을 유지한다. 화면 밖·숨긴 탭·모션 감소 설정에서는 새 시연 시계를 멈추고 이벤트·관찰자·타이머를 정리한다. `useDemoReplay`는 완료된 CSS 애니메이션도 기록해 재생한다. 이 미리보기 계층은 카탈로그 프롬프트가 설명하는 독립 구현의 입력 계약과 구분한다.

연속 효과는 `requestAnimationFrame`의 경과 시간으로 계산한다. 프레임마다 상태 복사 효과를 추가하지 않고 현재 프레임의 값을 직접 표시한다. 위치·각도·진행률은 소수점으로 보간하며, 탭 인덱스·색상 단계·글자 돌출 층수처럼 정수여야 하는 값만 `useDemoNumber`의 `steps` 모드를 사용한다. 토글·반복 트리거는 반주기별 별도 컨텍스트를 사용해 매 프레임 갱신을 구독하지 않는다.

호버 디자인에서 실제 입력을 처리하는 동안 `useDemoToggle`·`useDemoSample`의 `interacting`으로 사용자 입력값을 표시한다. 포인터 이탈 시 현재 자동 시연값으로 돌아가며 공통 시계를 재시작하지 않는다.

내부 버튼·입력 등 기존 컨트롤의 동작을 공통 클릭 재시작보다 우선한다. `div`·`span` 등의 자체 클릭 영역에는 `data-demo-control`을 붙여 `DemoAutoplay`와 `useDemoReplay` 양쪽에서 제외한다. 숫자·토글 setter는 현재 표시값을 기준으로 사용자 변경을 적용하고 자동 재생은 그 값에서 이어간다. 공통 시계나 다른 상태를 초기화하지 않는다. OTP 자동 시연은 기존 입력 순서 재생 핸들러를 재사용한다.

새 데모는 카테고리 폴더의 ID 레지스트리에 등록하고 `additionalDemos.ts`에서 연결한다. 기존 `InteractiveDemos.tsx`의 switch는 유지하되 같은 ID를 양쪽에 추가하지 않는다. `demo-registration.test.tsx`는 전체 카탈로그와 두 등록 경로의 ID 일치·중복 및 어두운 배경 예외의 유효성을 검사한다. 기존 레지스트리 테스트는 카테고리 간 덮어쓰기를 검사한다.

ESLint 10·typescript-eslint 8의 flat config를 사용한다. 추천 정적 오류 규칙을 적용하되 이름·타입 검사는 TypeScript에 맡기며 스타일·미사용 변수의 일괄 정리는 도입하지 않는다. PR 및 Pages CI는 `npm run lint` 실패를 차단한다. 브라우저 E2E 도입은 별도 브라우저 설치·CI 실행 비용이 있으므로 현재 도입하지 않았으며, 실제 브라우저의 키보드·클립보드·반응형 검증을 자동 컴포넌트 테스트와 구분해 기록한다.

프롬프트의 `prompt-scroll`과 데모 내부의 스크롤바는 `src/scrollbars.css`에서 라이트·다크 테마와 네이티브 입력의 색상 모드를 함께 관리한다. 데모의 스크롤바는 6px, 프롬프트는 8px이며 어두운 배경을 유지하는 데모는 다크 색상을 따른다. 고정 헤더·중첩 가로 목록처럼 트랙 여백이 필요한 곳은 `--scrollbar-track-block`·`--scrollbar-track-inline`로 지정한다. 공통 스타일에서 `overflow`를 바꾸지 않으며, 필요한 스크롤·고정 헤더·양쪽 거터를 유지하고 드롭다운은 펼친 상태의 경계와 실제 넘침을 확인한다.

근접 가변·원통 회전 타이포는 `public/fonts/roboto-flex/`의 같은 로컬 WOFF2를 사용한다. VIBE 네 글자 전용 부분집합이며 일반 UI 폰트로 사용하지 않는다. 출처는 같은 폴더의 README, 별도 폰트 라이선스는 OFL.txt에 있다. 폰트·라이선스가 빌드 결과에 함께 복사되고 CSS URL이 `/vibe-dictionary/` 하위 경로에서 동작하는지 확인한다.

문서 작성·보관 기준은 [문서 안내](README.md), 변경·검증 기준은 [프로젝트 작업 지침](../AGENTS.md)를 따른다.
