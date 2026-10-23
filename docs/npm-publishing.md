# MCP를 npm에 공개 게시하기

공개 패키지는 `@keke1933/vibe-dictionary-mcp`다. 직접 작성한 코드·기법·프롬프트는 MIT를 적용하며, 루트·웹·내부 카탈로그는 npm 게시 대상이 아니다. 웹의 Pages 배포와 npm 게시는 독립적이다.

## 준비 상태 확인

게시 준비 변경과 `.github/workflows/publish-npm.yml`을 먼저 검토·커밋하고 `master`에 반영한다. GitHub 수동 워크플로가 목록에 나타나려면 기본 브랜치에 파일이 있어야 한다. 준비 작업 자체는 npm 게시나 원격 반영을 실행하지 않는다.

저장소 루트에서 다음 검사를 실행한다.

```sh
npm ci --ignore-scripts
npm audit --registry=https://registry.npmjs.org/
npm test
npm run build
npm run check:package -- docs/local/npm-release
```

마지막 명령은 tarball에 실행 파일·README·LICENSE·package.json만 들어가는지 확인하고, 독립된 임시 경로에 설치해 도구 목록·전체 기법·한영 프롬프트를 원본과 대조한다. 소비자 설치 시 새로 결정된 실행 의존성도 npm audit로 검사한다. 성공 시 검증한 tarball 경로를 출력한다. 이 명령은 게시하지 않는다.

## 최초 1회: npm 계정과 패키지 생성

1. npm 게시 계정은 `keke1933`이다. 이메일 인증과 계정 2FA를 설정한다. GitHub 저장소 소유자는 `leejh96`이며 npm 계정과 별개다. `@keke1933` scope의 게시 권한이 있어야 한다.
2. 로컬 터미널에서 `npm login --registry=https://registry.npmjs.org/`으로 로그인하고 `npm whoami --registry=https://registry.npmjs.org/` 결과가 `keke1933`인지 확인한다. 토큰·OTP·복구 코드를 저장소나 채팅에 복사하지 않는다.
3. 최초 게시 시점에 패키지명·버전 소유 상태를 레지스트리에서 다시 확인한다.
4. 위 검사에 통과한 최초 tarball을 아래 명령으로 **실제로 공개 게시**한다. 이것은 검증 명령이 아니므로 최종 게시할 때만 실행하고 2FA를 완료한다. `0.1.0`은 tarball과 manifest의 버전으로 맞춘다.

```sh
npm publish ./docs/local/npm-release/keke1933-vibe-dictionary-mcp-0.1.0.tgz --access public --ignore-scripts --registry=https://registry.npmjs.org/
```

npm 공식 문서상 Trusted Publisher를 설정할 패키지는 레지스트리에 먼저 존재해야 한다. 따라서 아직 없는 패키지의 최초 버전은 이 절차로 생성하고 이후 버전을 OIDC로 게시한다. 이미 본인 소유로 존재하는 패키지라면 중복 최초 게시를 하지 않는다. 동일 버전은 다시 게시할 수 없다.

## npm에서 Trusted Publisher 설정

패키지 페이지 → Settings → Trusted publishing에서 GitHub Actions 연결을 추가한다. npm에는 `keke1933`으로 로그인하지만, 아래 Organization or user에는 GitHub 소유자 `leejh96`을 입력한다.

| 필드 | 입력값 |
| --- | --- |
| 패키지 | `@keke1933/vibe-dictionary-mcp` |
| Organization or user | `leejh96` |
| Repository | `vibe-dictionary` |
| Workflow filename | `publish-npm.yml` (폴더 경로 없이 파일명만) |
| Environment name | `npm` |
| Allowed actions | 직접 게시인 `npm publish` 허용 |

새 연결은 설정 후 2일 이내에 첫 게시를 성공해야 한다. 다음 버전을 OIDC로 게시할 준비가 됐을 때 설정하고, 만료되면 연결을 새로 만든다. UI에서 저장에 성공해도 OIDC 인증 검증을 완료한 것은 아니다. 실제 게시가 성공해야 연결을 확인한 것이다.

OIDC 게시를 확인한 뒤 패키지 Settings → Publishing access에서 **Require two-factor authentication and disallow tokens**를 권장한다. GitHub Secrets에 `NPM_TOKEN`을 등록하지 않는다. OIDC 게시와 로컬 계정 로그인은 서로 다른 인증 방식이다.

## GitHub 설정과 이후 버전 게시

저장소 Settings → Environments에서 `npm` environment를 만들고 배포 허용 브랜치를 `master`로 제한한다. 필요하면 승인 담당자를 지정한다. npm에 입력한 environment 이름도 대소문자까지 `npm`이어야 한다.

1. MCP 버전을 올린다. 예: `npm version 0.2.1 --workspace @keke1933/vibe-dictionary-mcp --no-git-tag-version`. 함께 바뀐 잠금 파일을 검토하고, [변경 기록](../CHANGE_LOG.md)의 **MCP → 미배포** 항목 중 이번 릴리스에 포함되는 내용을 해당 MCP 버전으로 옮긴다. MCP의 패키지 manifest·잠금 파일·변경 기록의 버전이 일치하는지 확인한다. 웹 버전과 웹 변경 기록은 별도로 관리한다.
2. 변경과 버전을 검증·커밋하고 `master`에 반영한다. 패키지 버전은 워크플로에서 자동 변경하지 않는다.
3. Actions → **Publish MCP to npm** → Run workflow에서 브랜치 `master`와 해당 버전(예: `0.2.1`)을 입력한다.
4. 저장소·브랜치·버전 확인 → 전체 취약점 감사 → 테스트·빌드 → tarball 독립 설치·전체 프롬프트 대조 → **검증한 tarball 게시** 순서로 진행된다. 앞 단계가 실패하면 게시하지 않는다.
5. npm에서 버전과 빌드 출처 증명(provenance)을 확인하고 실제 패키지 설치·조회도 확인한다. 실패한 게시를 다시 실행하기 전에 레지스트리에 버전이 생성됐는지 먼저 확인한다.

워크플로는 GitHub 호스팅 Ubuntu, Node.js 24, npm 11.21.0을 사용한다. `contents: read`와 OIDC용 `id-token: write`를 사용하며 npm 장기 토큰은 사용하지 않는다. 동시 게시를 직렬화하고 자동 push·태그 게시 트리거는 두지 않는다. 공개 GitHub 저장소와 공개 npm 패키지의 OIDC 게시에는 npm이 provenance를 자동 생성한다.

근거: [npm Trusted publishing](https://docs.npmjs.com/trusted-publishers/), [npm trust 사전 조건](https://docs.npmjs.com/cli/v11/commands/npm-trust/#prerequisites), [npm publish](https://docs.npmjs.com/cli/v11/commands/npm-publish/).
