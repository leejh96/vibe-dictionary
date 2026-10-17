# 바이브 코딩 사전

UI·그래픽·레이아웃·스타일·모션 영상 기법의 데모를 보고 구현용 프롬프트를 가져오는 서비스다. 웹은 [GitHub Pages](https://leejh96.github.io/vibe-dictionary/)에서, 읽기 전용 MCP는 사용자의 PC에서 실행한다.

현재 소스의 웹은 상단에서 한국어/English를 전환하며, MCP는 `locale: "ko" | "en"`으로 요약과 프롬프트 언어를 선택한다. 검색은 한영 동의어·사용 상황을 함께 확인해 관련도순으로 후보를 반환한다. 기존에 설치한 npm 고정 버전에는 소스 변경이 자동 반영되지 않는다.

## npm MCP를 Codex에 연결하기

저장소를 복제하거나 웹 서버를 실행할 필요 없이 [npm 패키지](https://www.npmjs.com/package/@keke1933/vibe-dictionary-mcp)를 사용할 수 있다. Node.js 22.12 이상과 npm, `codex` CLI가 필요하다. 검증 환경은 Node.js 24다.

**macOS / Linux**

```sh
codex mcp add vibe-dictionary -- npx -y --registry=https://registry.npmjs.org/ @keke1933/vibe-dictionary-mcp@0.1.2
```

**Windows (PowerShell)**

```powershell
codex mcp add vibe-dictionary -- cmd /d /c npx -y --registry=https://registry.npmjs.org/ @keke1933/vibe-dictionary-mcp@0.1.2
```

`npx`가 지정 버전을 npm에서 받아 캐시에 설치하므로 별도 `npm install -g`는 필요 없다. Codex 연결 설정은 사용자 전역 설정인 `~/.codex/config.toml`에 등록된다. Windows는 `%USERPROFILE%\.codex\config.toml`이며, `CODEX_HOME`을 지정했다면 그 폴더를 사용한다. Windows 명령은 `.cmd` 실행을 위해 `cmd /d /c`를 사용한다.

다음 명령으로 등록을 확인하고, Codex의 MCP 서버를 재시작하거나 새 세션에서 사용한다. `get`은 설정 확인이므로 실제 연결은 아래 요청의 도구 호출까지 확인한다.

```sh
codex mcp get vibe-dictionary
```

> vibe-dictionary MCP에서 마그네틱 기법을 검색한 뒤 magnetic-hover의 프롬프트 원문을 가져와 줘. 코드는 수정하지 마.

`search_techniques` 검색 결과와 `get_technique`의 `promptSnippet`이 반환되면 연결된 것이다. MCP 자체에는 API 키나 npm 로그인이 필요 없다. 패키지를 받거나 확인하는 `npx` 실행에는 네트워크가 필요할 수 있다.

수동 설정, 선택적 전역 설치, 버전 변경·연결 해제와 문제 해결은 [MCP 사용 안내](apps/mcp/README.md)를 따른다. 연결 설정은 [Codex 공식 문서](https://developers.openai.com/codex/mcp), 캐시 설치 방식은 [npm npx 문서](https://docs.npmjs.com/cli/v11/commands/npx/)를 참고한다.

## 개발 문서

- [개발 안내](docs/development.md): 저장소 구조, 개발 환경과 검증 명령.
- [npm 게시 안내](docs/npm-publishing.md): 패키지 관리자용 배포 절차.
- [문서 안내](docs/README.md): 프로젝트 지침과 보관한 작업 기록.

## 라이선스

직접 작성한 웹·MCP 코드, 기법 데이터와 프롬프트는 [MIT License](LICENSE)를 따른다. 제3자 의존성은 각각의 라이선스를 따른다.
