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

## 현재 연결 방법

이 패키지는 아직 npm에 게시하지 않았다. 게시 이름을 확정하기 전까지 `private: true`로 유지한다. 저장소에서 다음 명령을 실행한다.

```sh
npm ci
npm run build:mcp
```

Codex에는 빌드 결과의 **실제 절대 경로**로 등록한다. 아래 자리표시자는 자신의 경로로 바꾼다. `node`가 Codex의 PATH에 없다면 Node 실행 파일도 절대 경로로 지정한다.

```sh
codex mcp add vibe-dictionary -- node "/absolute/path/to/vibe-dictionary/packages/mcp/dist/index.js"
codex mcp get vibe-dictionary
```

현재 사용 중인 Codex 세션에 도구가 나타나지 않으면 앱의 MCP 서버 재시작 기능을 사용하거나 새 세션에서 확인한다. 다음과 같이 요청하고 실제 도구 호출과 반환된 `promptSnippet`을 확인한다.

> vibe-dictionary MCP에서 마그네틱 기법을 검색한 뒤 magnetic-hover의 프롬프트 원문을 가져와 줘. 코드는 수정하지 마.

다른 MCP 클라이언트도 `stdio` 서버로 등록하고 명령을 `node`, 인수를 같은 빌드 파일의 절대 경로로 지정하면 된다. 설정 형식은 클라이언트별로 다르다. 표준 출력은 MCP 통신 전용이므로 등록 명령을 `npm run start`로 감싸지 않는다.

## 데이터와 배포

기법 데이터와 검색 함수는 웹 소스와 공유하며 빌드 시 실행 파일에 포함된다. 실행 중에는 웹 접속·API 키·네트워크 연결이 필요 없다. 패키지 다운로드와 의존성 설치 시에는 네트워크가 필요하다. 카탈로그 변경은 재빌드하고 MCP 프로세스를 재시작해야 반영된다. npm 배포 이후에는 새 패키지 버전도 게시해야 한다.

저장소에서 `npm test`는 웹 회귀 테스트와 빌드된 MCP의 실제 stdio 연결 테스트를 함께 실행한다. `npm run build`는 웹 빌드, `npm run build:mcp`는 MCP 타입 검사와 실행 파일 빌드다.

배포 파일 점검은 저장소의 `docs/local/` 폴더를 만든 뒤 다음 명령으로 할 수 있다. 패키지에는 실행 파일·이 문서·패키지 메타데이터만 포함하며 로컬 자료와 비밀값을 포함하지 않는다.

```sh
npm pack --workspace vibe-dictionary-mcp --pack-destination docs/local
```

공개 npm 배포 전에는 게시 계정·최종 패키지 이름·배포 권한 및 라이선스를 결정하고 `private` 설정을 변경해야 한다. 이 문서의 로컬 연결과 npm 공개 게시는 별개다.

연결 방식의 근거: [MCP 공식 SDK](https://ts.sdk.modelcontextprotocol.io/server), [Codex 공식 MCP 문서](https://developers.openai.com/codex/mcp).
