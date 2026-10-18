import type { TechniqueItem } from '../techniques';

export const MOTION_ADDITIONS: TechniqueItem[] = [
  {
    id: 'anchored-scale-popover', domain: 'ui', category: 'motion',
    titleKo: '앵커 스케일 팝오버', titleEn: 'Anchored Scale Popover',
    vibeTag: '누른 위치에서 작은 창이 펼쳐지는', vibeKeywords: ['앵커 팝오버', '기준점 확대', '연결된 등장'],
    summary: '버튼과 맞닿은 기준점을 유지하며 작은 정보 창을 확대·축소',
    promptSnippet: '지정한 영역에 폭 176px 이하·높이 104px 프레임을 만들고 왼쪽 아래에 44px 정보 아이콘 button을 배치해 줘. 버튼 위 12px 간격에 폭 100%·높이 48px의 둥근 정보 창을 두고 잠금 SVG와 “읽기 전용”만 담아 줘. 창 아래의 작은 마름모 꼬리는 버튼 중심과 이어지도록 정렬해 줘. 초기 창은 열려 있고 버튼 클릭·Enter·Space·터치로 열림을 토글해 줘. 창의 transform-origin은 왼쪽 22px·아래로 12px 떨어진 기준점으로 설정하고 닫힘은 scale(.72)·opacity 0, 열림은 scale(1)·opacity 1로 바꿔 버튼에서 펼쳐지고 돌아가게 해 줘. transform은 220ms cubic-bezier(.2,.8,.2,1), opacity는 220ms ease이며 빠른 재입력도 현재 전환에서 이어져야 해. 닫힘 220ms 뒤 visibility hidden을 적용하고 열 때는 즉시 보이게 하며 닫힌 내용은 aria-hidden으로 숨겨 줘. 버튼의 aria-expanded·aria-controls를 고유 정보 창 ID에 연결하고 열린 동안만 aria-describedby로 내용을 설명해 줘. 바깥 pointerdown 또는 Escape로 닫고 Escape는 버튼 포커스를 유지·복구해 줘. 바깥 입력 리스너는 열릴 때만 등록하고 닫힘·언마운트 때 제거해 줘. 밝은 표면·짙은 문자와 어두운 표면·밝은 문자의 테마 대비, 포커스 윤곽, 좁은 화면 경계를 지켜 줘. 모션 감소에서는 지연 없이 즉시 전환해 줘. 실제 권한 조회·변경이나 추가 안내·실행 횟수 없는 로컬 정보 창 시연이야.',
  },
  {
    id: 'exit-collapse-presence', domain: 'ui', category: 'motion',
    titleKo: '퇴장 후 공간 접기', titleEn: 'Exit Before Unmount',
    vibeTag: '사라지는 항목의 자리가 부드럽게 접히는', vibeKeywords: ['퇴장 애니메이션', '공간 접기', '언마운트 지연'],
    summary: '항목을 퇴장 중에 유지하고 전환이 끝난 뒤 DOM에서 제거',
    promptSnippet: '지정한 영역에 팀 미팅·프로젝트 정리 두 항목을 담은 폭 240px 이하·높이 100px 목록 시연을 만들어 줘. 각 항목은 높이 46px, 첫 항목 아래 간격은 6px이고 팀 미팅 오른쪽에는 44px 닫기 button을 배치해 줘. 닫기 클릭·Enter·Space·터치 시 먼저 남는 프로젝트 정리 항목으로 포커스를 옮기고 첫 항목을 퇴장 상태로 바꿔 줘. 퇴장 중 첫 항목은 DOM에 유지하되 aria-hidden·닫기 aria-disabled·Tab 제외 처리하고, max-height 46px→0·아래 간격 6px→0·opacity 1→0·translateX(0)→16px를 250ms ease로 함께 전환해 줘. 중복 닫기 입력은 무시하고 250ms 타이머가 끝나면 첫 항목을 DOM에서 제거하며 프레임 아래에 44px 되돌리기 button을 표시해 줘. 남은 항목은 위로 이동하지만 바깥 프레임 높이는 바꾸지 않아. 되돌리면 첫 항목을 즉시 복원하고 복원된 닫기 버튼으로 포커스를 돌려 줘. 모션 감소에서는 퇴장 지연 없이 즉시 제거하며, 언마운트 시 남은 타이머를 취소해 줘. 라이트·다크 표면·문자·윤곽과 모바일 경계를 맞추고 실제 일정 삭제·서버 요청·추가 설명·횟수 표시는 없는 가역적인 로컬 시연으로 만들어 줘.',
  },
  {
    id: 'transport-icon-morph', domain: 'ui', category: 'motion',
    titleKo: '재생·일시정지 모핑', titleEn: 'Play Pause Polygon Morph',
    vibeTag: '삼각형이 두 개의 막대로 이어 변하는', vibeKeywords: ['재생 일시정지', '아이콘 모핑', '폴리곤 보간'],
    summary: '두 폴리곤의 꼭짓점을 보간해 재생 삼각형을 일시정지 막대로 전환',
    promptSnippet: '지정한 영역에 64px 원형 button과 그 안의 30px 아이콘 영역을 만들어 줘. 아이콘은 같은 currentColor를 채운 두 개의 절대 위치 span을 clip-path polygon으로 잘라 표현해 줘. 초기 왼쪽 조각은 (30% 15%,60% 32.5%,60% 67.5%,30% 85%), 오른쪽은 (60% 32.5%,90% 50%,90% 50%,60% 67.5%)의 네 꼭짓점으로 하나의 재생 삼각형을 이루게 해 줘. 클릭·Enter·Space·터치하면 aria-pressed를 토글하고 왼쪽 조각을 (24% 20%,42% 20%,42% 80%,24% 80%), 오른쪽을 (58% 20%,76% 20%,76% 80%,58% 80%)로 바꿔 일시정지 두 막대로 보간해 줘. 두 상태 모두 조각마다 꼭짓점 네 개를 유지하고 clip-path 전환은 280ms ease로 맞추며 재입력은 현재 보간 위치에서 반대로 이어지게 해 줘. 버튼의 “재생·일시정지 아이콘 전환” 이름은 유지하고 장식 조각은 접근성 트리에서 숨겨 줘. 라이트는 짙은 인디고 버튼·흰 아이콘, 다크는 밝은 인디고 버튼·짙은 아이콘으로 대비를 맞춰 줘. 포커스 윤곽·좁은 화면 경계·모션 감소의 즉시 전환을 지원해 줘. 실제 오디오·영상 재생, 타이머, 상태 설명이나 실행 횟수는 없는 로컬 아이콘 시연이야.',
  },
  {
    id: 'reflow-side-panel', domain: 'ui', category: 'motion',
    titleKo: '리플로 사이드 패널', titleEn: 'Reflow Side Panel',
    vibeTag: '패널이 들어오며 본문도 자리를 내주는', vibeKeywords: ['리플로 패널', '푸시 드로어', '본문 축소 전환'],
    summary: '옆 패널의 진입과 본문 너비 변화를 함께 연결하는 전환',
    promptSnippet: '지정한 영역에 폭 240px 이하·높이 100px의 잘린 프레임을 만들고 최근 문서 아이콘·제목과 44px 패널 토글 button을 본문에 배치해 줘. 초기 패널은 닫혀 있고 본문은 프레임 전체 너비를 사용해. 토글 클릭·Enter·Space·터치로 열면 오른쪽의 폭 76px 패널이 translateX(100%)에서 0으로 들어오는 동안 본문 너비는 100%에서 calc(100% - 76px)로 줄어들고 내부 그리드가 새 공간에 맞춰 정렬되게 해 줘. 닫으면 반대로 되돌아가며 양쪽 전환은 300ms ease로 맞춰 줘. 패널의 최근·저장 버튼은 각각 높이 44px이고 현재 보기만 aria-pressed로 표시해 줘. 보기를 고르면 본문 아이콘·제목을 최근 문서 또는 저장 문서로 바꾼 뒤 패널을 닫고 토글 버튼으로 포커스를 돌려 줘. Escape도 닫고 포커스를 복귀시켜 줘. 토글의 aria-expanded·aria-controls와 고유 패널 ID를 연결하고 닫힌 패널은 aria-hidden·비활성·Tab 제외로 처리해 줘. 닫힘 전환이 끝난 뒤 visibility hidden이 되게 하고 열린 동안에는 즉시 보이게 해 줘. 라이트·다크의 표면·틴트·문자·포커스 대비, 좁은 폭에서 두 조작 영역의 경계를 맞춰 줘. 모션 감소 시 즉시 전환하며 실제 문서 조회·저장·추가 안내·횟수 표시는 없는 로컬 패널 시연이야.',
  },
  {
    id: 'shared-element-expand', domain: 'ui', category: 'motion',
    titleKo: '공유 요소 확장 전환', titleEn: 'Shared Element Expansion',
    vibeTag: '같은 요소가 위치와 크기를 이어 바꾸는', vibeKeywords: ['공유 요소 전환', '썸네일 확장', '연속적인 확대'],
    summary: '커버 DOM을 유지하면서 확대하고 옆의 제목을 새 자리로 이동',
    promptSnippet: '지정한 영역에 폭 240px 이하·높이 100px의 “오팔” 미리보기 카드를 하나의 button으로 만들어 줘. 왼쪽 12px 위치·세로 중앙에 보석 SVG가 있는 56×56px 틴트 커버, 왼쪽 84px 위치에 제목, 오른쪽 위에 확대 SVG를 배치해 줘. 초기 확대 상태는 false이고 클릭·Enter·Space·터치마다 aria-pressed와 확대 상태를 토글해 줘. 확대하면 동일한 커버 DOM의 너비를 104px·높이를 80px·모서리를 20px로 바꾸고 제목을 왼쪽 132px 자리로 옮기며 아이콘은 축소 SVG로 바꿔 줘. 커버의 세로 중앙·왼쪽 위치와 카드 외곽 크기는 유지하고 너비·높이·모서리·제목 위치를 400ms ease로 전환해 줘. 다시 입력하면 56px·모서리 12px·제목 84px로 돌아가고 연속 입력도 현재 CSS 전환에서 이어지게 해 줘. 커버를 교체하거나 문서 전체 View Transition을 실행하지 않아. 라이트는 흰 표면·옅은 인디고 커버·짙은 보석, 다크는 슬레이트 표면·짙은 인디고 커버·밝은 보석과 문자로 맞춰 줘. 좁은 화면에서 커버·제목·조작 표시가 겹치지 않게 하고 포커스 윤곽·모션 감소의 즉시 전환을 지원해 줘. 별도 설명·실행 횟수·실제 이미지 조회 없는 로컬 크기 전환 시연이야.',
  },
  {
    id: 'masked-rise-entrance', domain: 'ui', category: 'motion',
    titleKo: '마스크 라이즈 등장', titleEn: 'Masked Rise Entrance',
    vibeTag: '고정된 창 아래에서 내용이 올라오는', vibeKeywords: ['마스크 등장', '클립 리빌', '아래에서 위로'],
    summary: '고정된 잘림 영역 안에서 패널 전체가 아래에서 올라오는 진입 효과',
    promptSnippet: '지정한 영역에 위쪽 방향 SVG 화살표와 “신규 공개”가 나란히 담긴 160×64px 틴트 패널을 만들어 줘. 패널 바깥에는 같은 크기의 고정된 둥근 창을 두고 overflow hidden으로 창 밖 내용을 잘라 줘. 첫 표시 때 안쪽 패널을 translateY(105%)에서 0까지 600ms cubic-bezier(.16,1,.3,1)로 한 번 올린 뒤 최종 상태를 유지해 줘. 창의 위치와 크기는 움직이지 않고 패널의 투명도는 바꾸지 않아. 바깥의 투명한 160×80px button을 클릭·Enter·Space·터치하면 안쪽 패널만 새 키로 교체해 재생하고 버튼·포커스는 유지해 줘. 버튼의 접근 가능한 이름에 보이는 “신규 공개”와 다시 재생 동작을 포함해 줘. 라이트는 옅은 인디고 표면·짙은 문자와 아이콘, 다크는 짙은 인디고 표면·밝은 문자와 아이콘을 사용하고 좁은 화면에서도 창과 포커스 윤곽이 들어오게 해 줘. 모션 감소에서는 애니메이션 없이 최종 위치를 표시해 줘. 별도 타이머·프레임 루프나 설명·재생 횟수·실제 조회는 추가하지 않는 로컬 진입 시연이야.',
  },
  {
    id: 'blur-focus-reveal', domain: 'ui', category: 'motion',
    titleKo: '블러 포커스 등장', titleEn: 'Blur to Focus Reveal',
    vibeTag: '흐릿한 윤곽이 또렷하게 맺히는', vibeKeywords: ['블러 등장', '포커스 리빌', '흐림에서 선명하게'],
    summary: '흐림·투명도·작은 상승을 함께 풀어 내용이 또렷해지는 진입 모션',
    promptSnippet: '지정한 요소에 반짝임 SVG와 “새 컬렉션” 내용이 담긴 160×64px의 틴트 패널을 만들어 줘. 첫 표시 때 opacity 0·filter blur(12px)·translateY(8px)에서 opacity 1·blur(0)·translateY(0)까지 550ms cubic-bezier(.2,.8,.2,1)로 한 번 등장한 뒤 최종 상태를 유지해 줘. 패널을 담는 160×80px의 button은 투명하게 두고 클릭·Enter·Space·터치마다 안쪽 애니메이션 요소만 새 키로 교체해 처음부터 재생해 줘. 바깥 버튼은 교체하지 않아 키보드 포커스를 유지하고 접근 가능한 이름에 현재 보이는 “새 컬렉션”과 다시 재생 동작을 포함해 줘. 라이트는 옅은 인디고 표면·짙은 아이콘과 문자, 다크는 짙은 인디고·밝은 아이콘과 문자로 대비를 맞춰 줘. 흐려진 가장자리가 다른 조작을 가리지 않게 여유를 두고 좁은 화면의 경계를 지켜 줘. 모션 감소에서는 애니메이션 없이 선명한 최종 상태를 표시해 줘. 언마운트 후 타이머나 프레임 작업을 남기지 않고 별도 안내·재생 횟수·실제 콘텐츠 조회는 추가하지 않아.',
  },
  {
    id: 'crossfade-scene-transition', domain: 'ui', category: 'motion',
    titleKo: '크로스페이드 장면 전환', titleEn: 'Crossfade Scene Transition',
    vibeTag: '두 장면이 겹치며 부드럽게 교대하는', vibeKeywords: ['크로스페이드', '장면 교체', '콘텐츠 디졸브'],
    summary: '두 콘텐츠 레이어의 투명도와 작은 배율을 반대로 전환하는 효과',
    promptSnippet: '지정한 영역에 폭 232px 이하·높이 88px의 컬렉션 카드를 하나의 button으로 만들어 줘. 카드 안에는 파도 SVG 커버와 “파도”, 나무 SVG 커버와 “숲”의 두 장면을 절대 위치로 겹치고 각 커버는 56px 정사각형, 이름은 오른쪽에 배치해 줘. 초기에는 파도 장면만 opacity 1·scale(1)이고 숲은 opacity 0·scale(.96)이야. 카드 클릭·Enter·Space·터치마다 두 장면의 활성 상태를 바꿔 이전 장면은 작아지며 사라지고 다음 장면은 원래 크기로 나타나게 해 줘. opacity·transform 전환은 각각 400ms ease이며 연속 입력에서도 같은 두 DOM 레이어의 현재 전환 상태에서 이어지게 해 줘. 카드 외곽과 커버 배치 크기는 바꾸지 않아. 비활성 장면은 aria-hidden으로 숨기고 버튼의 접근 가능한 이름에는 현재 보이는 파도·숲을 포함해 줘. 밝은 테마는 흰 표면·옅은 블루와 그린 커버, 어두운 테마는 슬레이트 표면·짙은 블루와 그린 커버·밝은 아이콘으로 대비를 맞춰 줘. 좁은 화면에서도 한 행을 유지하고 포커스 윤곽·모션 감소의 즉시 전환을 지원해 줘. 실제 페이지 이동·오디오·외부 조회나 추가 설명 없는 로컬 장면 시연이야.',
  },
  {
    id: 'directional-step-transition', domain: 'ui', category: 'motion',
    titleKo: '방향성 단계 전환', titleEn: 'Directional Step Transition',
    vibeTag: '앞으로 갈 때와 돌아올 때 방향이 이어지는', vibeKeywords: ['단계 전환', '방향성 슬라이드', '위저드 모션'],
    summary: '이전·다음 버튼으로 고정된 창 안의 단계를 좌우로 이동',
    promptSnippet: '지정한 영역에 이전 아이콘 button, 높이 80px의 잘린 콘텐츠 창, 다음 아이콘 button을 한 행으로 배치해 줘. 버튼은 각각 44×44px이고 전체 폭은 272px 이하로 좁은 화면에 맞춰 줄어들게 해 줘. 창 안에는 구성·스타일·검토의 세 단계 패널을 각 창 너비 100%로 가로 배치하고 각 단계에는 SVG 아이콘과 이름만 담아 줘. 초기 단계는 구성이며 이전 버튼은 aria-disabled로 비활성화하고, 다음 클릭·Enter·Space·터치마다 track을 -100%씩 움직여 오른쪽의 다음 단계를 왼쪽으로 들여오게 해 줘. 이전 입력은 반대 방향으로 돌아가며 마지막 검토에서는 다음을 비활성화하고 핸들러도 범위를 넘기지 않게 해 줘. 경계에서도 조작 버튼의 키보드 포커스가 사라지지 않도록 네이티브 disabled 대신 aria-disabled와 범위 제한을 함께 사용해 줘. 전환은 320ms cubic-bezier(.2,.8,.2,1), 연속 입력은 CSS transition이 현재 위치에서 새 도착점으로 이어지게 해 줘. 창 밖 패널은 시각적으로 잘리고 활성 단계 외에는 접근성 트리에서 숨겨 줘. 활성 단계 갱신은 polite로 전달하고 포커스 윤곽·라이트와 다크의 표면·아이콘·문자 대비를 맞춰 줘. 모션 감소 시 이동 전환은 없애 줘. 페이지 이동·제출·실행 카운터나 별도 설명 없는 로컬 단계 시연이야.',
  },
  {
    id: 'flip-reorder-list', domain: 'ui', category: 'motion',
    titleKo: 'FLIP 목록 재정렬', titleEn: 'FLIP List Reorder',
    vibeTag: '순서가 바뀌어도 자리를 이어 움직이는', vibeKeywords: ['목록 재정렬', 'FLIP 애니메이션', '레이아웃 전환'],
    summary: '바뀌기 전후 위치 차이를 역보정해 목록 항목의 이동 경로를 보여 줌',
    promptSnippet: '지정한 영역에 “기획·디자인·개발” 세 항목의 목록과 44px 원형 모서리의 순환 아이콘 button을 배치해 줘. 초기 순서는 기획→디자인→개발이고 버튼 클릭·Enter·Space·터치마다 첫 항목을 끝으로 보내며 안정적인 ID와 DOM 키를 유지해 줘. 순서 변경 직전에 각 항목의 화면상 top을 기록하고 새 DOM 배치 후 useLayoutEffect에서 새 top과의 차이를 구해 FLIP(이전 위치로 역보정한 뒤 새 위치로 재생) 전환을 실행해 줘. Web Animations API로 translateY(이전 top−새 top)에서 0까지 320ms cubic-bezier(.2,.8,.2,1) 이동하고 완료 후 최종 DOM 순서에 머물러. 빠르게 재입력하면 현재 보이는 위치를 먼저 기록하고 이전 애니메이션을 취소한 뒤 새 순서를 반영하며 언마운트 시 남은 애니메이션을 취소해 줘. 페이지 전체 스냅샷이나 전역 화면 전환은 만들지 않아. 모션 감소 또는 API 미지원에서는 순서를 즉시 바꿔 줘. 목록의 갱신을 접근성 트리에 전달하고 라이트·다크 대비·포커스 윤곽을 맞추며 좁은 폭에서도 목록과 버튼을 한 행에 담아 줘. 순환 횟수나 추가 안내 문구는 표시하지 않는 로컬 목록 시연이야.',
  },
];
