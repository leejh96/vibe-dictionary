import type { TechniqueItem } from '../techniques';

export const LAYOUT_ADDITIONS: TechniqueItem[] = [
  {
    id: 'closable-document-tabs', domain: 'ui', category: 'layout',
    titleKo: '닫기 가능한 문서 탭', titleEn: 'Closable Document Tabs',
    vibeTag: '문서를 닫아도 다음 작업으로 이어지는', vibeKeywords: ['문서 탭 닫기', '동적 탭', '워크스페이스 탭'],
    summary: '선택한 탭을 닫고 인접 문서나 복원 조작으로 포커스를 연결',
    promptSnippet: '지정한 영역에 최대 폭 240px·최소 높이 116px의 닫기 가능한 예시 문서 탭을 만들어 줘. 처음에는 노트·기록 두 문서와 실제 패널을 유지하고 노트를 선택해 줘. 상단은 minmax(0,1fr) 탭 묶음과 44px 닫기 button을 8px 간격으로 배치해 줘. 열린 문서 이름의 tablist 안에 동일 너비·높이 44px인 실제 tab button들을 놓고 활성 탭만 인디고 3px 밑줄·연한 테마 표면·강조 문자·aria-selected true·tabIndex 0으로 표시해 줘. 인스턴스별 고유 ID로 tab의 aria-controls와 panel의 aria-labelledby를 연결하고 비활성 패널은 hidden·display none으로 제외해 줘. 각 panel은 위쪽 8px 간격·최소 높이 64px·12px 패딩·1px 테두리·10.4px 모서리·테마 표면·tabIndex 0이며 24px FileText SVG와 해당 문서 이름만 중앙에 보여 줘. 클릭·Enter·Space·포커스는 탭을 선택하고 좌우 방향키는 현재 남은 문서를 순환하며 Home·End는 첫째·마지막 문서로 선택·포커스를 이동해 줘. 상하 키는 기본 스크롤을 유지하고 Tab은 활성 탭에서 독립 닫기 button을 거쳐 현재 panel로 이동해 줘. 닫기 button은 18px X SVG·현재 문서 이름과 문서 닫기를 합친 접근 가능한 이름·44px 영역을 사용해 줘. 해당 button 클릭이나 탭에서 Delete를 누르면 선택 문서의 탭·패널을 DOM에서 제거하고 오른쪽 다음 문서로, 없으면 왼쪽 이전 문서로 선택과 포커스를 옮겨 줘. 마지막 문서까지 닫으면 같은 최소 높이 안에 44px 문서 복원 button과 16px RotateCcw SVG만 표시하고 포커스를 옮겨 줘. 복원은 두 예시 문서를 처음 상태로 되돌리고 첫 노트 탭에 포커스를 줘. 초기 마운트는 포커스를 빼앗지 않고 닫기·복원 후에만 새 DOM으로 포커스를 연결해 줘. 기존 탭·패널·아이콘 버튼 CSS를 재사용하되 문서 제거 수명은 별도 작은 컴포넌트에서 처리해 줘. 라이트·다크 대비·2px 포커스·좁은 화면 경계·상단 도구 여백을 맞추고 실제 파일 삭제·저장·타이머·애니메이션·별도 제목·설명·실행 횟수는 넣지 말아 줘.',
  },
  {
    id: 'sticky-announcement-banner', domain: 'ui', category: 'layout',
    titleKo: '스크롤 고정 추천 배너', titleEn: 'Sticky Announcement Banner',
    vibeTag: '목록을 내려도 추천 소식이 남는', vibeKeywords: ['고정 배너', '스티키 알림', '스크롤 추천'],
    summary: '독립 스크롤 목록 상단에 추천 배너를 실제 sticky로 유지',
    promptSnippet: '지정한 영역에 최대 폭240px·높이170px·1px 테마 테두리·12px 모서리·테마 표면·overflow hidden인 외곽 프레임 안에 독립 세로 스크롤 창을 만들어 줘. 안쪽 창은 너비/높이100%·overflow-y auto·overscroll-behavior-y contain·scrollbar-width thin·scrollbar-color 테마 테두리색/transparent를 기본으로 사용하고, ::-webkit-scrollbar 지원 브라우저에서는 표준 두 속성을 auto로 돌린 뒤 너비6px·투명 트랙·최소24px의 둥근 테마 테두리색 thumb·숨긴 scrollbar-button으로 화살표 없는 스크롤바를 그려 줘. 트랙은 위42px·아래6px 여백을 두어 손잡이가36px 헤더를 침범하지 않게 해 줘. 프로그램 목록 이름의 role region·tabIndex 0으로 마우스 휠·터치·키보드 스크롤을 지원해 줘. 안쪽 창의 배경도 위36px은 강조색, 그 아래는 테마 표면의 linear-gradient로 그려 얇은 스크롤바 뒤까지 배너 색이 이어지게 해 줘. 프레임의 둥근 경계 안에서 스크롤바와 내용을 함께 잘라 줘. 처음에는 배너36px과44px 행 세 개가 온전히 보이게 해 줘. 맨 위 추천 배너는 실제 position sticky·top 0·z-index 1이며 최소 높이 36px·상하 8px 좌우 12px 패딩·8px 간격으로 16px Sparkles SVG와 12px 굵은 이번 주 추천 원문을 나란히 배치해 줘. 배너는 불투명 인디고 표면과 대비되는 문자로 아래 목록을 가리고, 스크롤 창 안의 같은 상단 위치를 유지해 줘. 뒤에는 빛의 전시·여름 공연·주말 공방·공간 산책·작은 음악회의 실제 ul/li 목록을 넣고 각 행은 최소 44px·13px 문자·상하 8px 좌우 12px 패딩·연한 행 구분선을 사용해 줘. 목록 내용은 실제 스크롤에 따라 이동하며 첫 추천 배너 DOM은 유지해 줘. 라이트는 흰 목록·짙은 글자·짙은 인디고 배너와 흰 문자, 다크는 슬레이트 목록·밝은 글자·밝은 인디고 배너와 짙은 문자를 사용하고 다크 스크롤 창에 color-scheme dark를 적용해 줘. 프레임의 focus-within에2px 포커스 윤곽·offset2px을 표시하고 안쪽 창의 기본 outline만 제거해 줘. 좁은 화면 경계·배너와 행 정렬·상단 도구 여백을 맞춰 줘. 페이지 전체를 고정하거나 스크롤 이벤트·타이머·상태·클릭 기반 가짜 스크롤·자동 애니메이션·버튼·별도 제목·스크롤 안내·실행 횟수를 추가하지 말아 줘.',
  },
  {
    id: 'folded-edge-ribbon', domain: 'ui', category: 'layout',
    titleKo: '접힌 엣지 리본', titleEn: 'Folded Edge Ribbon',
    vibeTag: '가장자리 뒤로 접혀 입체감을 주는', vibeKeywords: ['리본 배너', '접힌 태그', '노치 리본'],
    summary: '카드 바깥의 작은 접힘과 잘린 꼬리로 리본 배지를 표현',
    promptSnippet: '지정한 영역 중앙에 너비 200px 이하·높이 112px·1px 테마 테두리·12px 모서리의 컬렉션 카드를 만들어 줘. 카드 콘텐츠는 위쪽 24px 패딩을 두고 24px Sparkles SVG와 컬렉션 이름만 8px 간격으로 중앙 정렬해 줘. 카드의 왼쪽 -6px·위쪽 12px에 너비 88px·높이 24px 리본을 걸쳐 놓아 줘. 안쪽 리본 띠는 새 소식 실제 배지 문구·12px 굵은 문자·오른쪽 8px 패딩·인디고 배경을 사용하고 clip-path polygon(0 0,100% 0,calc(100% - 8px) 50%,100% 100%,0 100%)으로 오른쪽 꼬리에 8px V 홈을 만들어 줘. 리본 바깥 래퍼의 after는 왼쪽 0·위쪽 24px에서 border-top 6px와 transparent border-left 6px의 삼각형으로 카드 가장자리 뒤로 접힌 면을 표현해 줘. clip-path는 안쪽 띠에만 적용해 접힌 면을 자르지 않고 카드 바깥 리본도 숨기지 않아. 라이트는 흰 카드·짙은 인디고 띠·흰 배지 문자·더 짙은 접힌 면, 다크는 슬레이트 카드·밝은 인디고 띠·짙은 배지 문자·중간 인디고 접힌 면으로 대비를 맞춰 줘. SVG는 장식으로 숨기고 리본 문구는 실제 텍스트 하나로 유지해 줘. 좁은 화면과 상단 도구 안쪽에서 6px 돌출부·모서리·콘텐츠 정렬을 확인하고, 버튼·타이머·애니메이션·별도 제목·설명·실행 횟수는 추가하지 말아 줘.',
  },
  {
    id: 'vertical-rail-tabs', domain: 'ui', category: 'layout',
    titleKo: '버티컬 레일 탭', titleEn: 'Vertical Rail Tabs',
    vibeTag: '옆 레일에서 내용을 빠르게 오가는', vibeKeywords: ['세로 탭', '왼쪽 레일', '사이드 탭'],
    summary: '왼쪽 세로 탭과 오른쪽 패널을 연결하고 위아래 키로 내용을 선택',
    promptSnippet: '지정한 영역에 최대 폭 240px·왼쪽 76px와 오른쪽 minmax(0,1fr)·8px 간격의 세로 탭 레이아웃을 만들어 줘. 왼쪽에는 문서·색상 tab button을 4px 간격으로 쌓고 초기에는 문서를 선택해 줘. tablist는 미리보기 종류 이름과 aria-orientation vertical을 사용하고 오른쪽 중립 구분선을 보여 줘. 탭은 최소 높이 44px·13px 굵은 문자·왼쪽 3px 투명선이며 활성 탭만 인디고 선·강조 문자·연한 테마 표면으로 표시해 줘. 실제 탭과 오른쪽 panel은 인스턴스별 고유 ID·aria-controls·aria-labelledby로 양방향 연결하고 선택한 탭만 aria-selected true·tabIndex 0, 나머지는 -1로 설정해 줘. 위·아래 방향키는 세로 방향에 맞춰 순환 포커스와 선택, Home·End는 첫째·마지막 탭 이동이며 좌우 키와 Tab 기본동작은 가로채지 않아. 클릭·Enter·Space·터치·포커스도 해당 탭을 선택하고 Tab은 현재 패널로 이동해 줘. 오른쪽은 최소 높이 96px·12px 패딩·테마 표면·1px 테두리·10.4px 모서리이며 role tabpanel·tabIndex 0을 사용해 줘. 문서에는 24px FileText SVG와 노트 이름, 색상에는 36×24px 인디고·민트·앰버 견본을 8px 간격으로 보여 주고 색 이름은 읽기용으로 제공해 줘. 비활성 패널은 hidden·display none으로 숨기되 DOM은 유지하고, 좁은 오른쪽 공간에서는 색 견본을 줄바꿈해 전체 높이에 맞춰 늘려 줘. 기존 가로 탭이 있다면 동일한 상태·ID·패널·포커스 로직을 재사용하되 방향키와 레일 배치만 세로로 바꿔 줘. 라이트·다크 대비와 2px 포커스 윤곽·좁은 화면 경계·상단 도구 간격을 맞추고 초기 자동 포커스·타이머·애니메이션·네트워크·별도 제목·설명·실행 횟수는 추가하지 말아 줘.',
  },
  {
    id: 'dot-wave-waiting-bubble', domain: 'ui', category: 'layout',
    titleKo: '도트 웨이브 대기 버블', titleEn: 'Dot Wave Waiting Bubble',
    vibeTag: '작은 점들이 차례로 기다림을 전하는', vibeKeywords: ['대기 버블', '점 세 개 로더', '도트 웨이브'],
    summary: '말풍선 안의 점 세 개를 시간차로 움직이는 작은 대기 표시',
    promptSnippet: '지정한 영역 중앙에 너비 88px 이하·높이 48px의 작은 대기 버블을 만들어 줘. 버블은 1px 테마 중립 테두리·테마 표면·모서리 16px 16px 16px 4px의 비대칭 모양이며 flex 중앙 정렬·6px 간격을 사용해 줘. 안에 8px 원형 점 세 개를 줄어들지 않게 배치하고 라이트의 짙은 인디고·다크의 밝은 인디고로 표시해 줘. 각 점은 aria-hidden true이며 1.2초 ease-in-out 무한 반복에서 0%·60%·100%의 translateY(0)·opacity .7, 30%의 translateY(-5px)·opacity 1로 움직여 줘. 점마다 0ms·160ms·320ms animation-delay를 주어 파도가 이어지게 해 줘. 바깥 버블은 role status이며 화면 읽기용 응답 대기 중 원문을 하나만 담아 점 움직임마다 상태가 반복 발표되지 않게 해 줘. 모션 감소에서는 점의 이동과 반복을 제거하고 opacity 1의 점 세 개를 정지 형태로 유지해 줘. 점과 여백·테두리·색상 대비·중앙 정렬을 라이트·다크와 좁은 화면·상단 도구 안쪽에서 맞춰 줘. 실제 메시지·AI·응답 생성·완료 전환·JS 타이머·포커스 조작·버튼·시각 제목·설명·실행 횟수 없이 대기 모양만 시연해 줘.',
  },
  {
    id: 'stable-skeleton-content', domain: 'ui', category: 'layout',
    titleKo: '자리 유지 스켈레톤 전환', titleEn: 'Stable Skeleton Content',
    vibeTag: '내용이 나타나도 자리가 흔들리지 않는', vibeKeywords: ['스켈레톤 전환', '자리 유지 로딩', '콘텐츠 리빌'],
    summary: '같은 크기의 뼈대와 콘텐츠를 전환해 레이아웃 이동을 막는 로딩 패턴',
    promptSnippet: '지정한 영역 중앙에 최대 폭 240px·minmax(0,1fr)과 44px의 두 열·8px 간격 프레임을 만들어 줘. 왼쪽은 높이 88px·12px 패딩·1px 테두리·12px 모서리의 노트 미리보기이고 오른쪽은 44px 전환 button이야. 미리보기는 고유 ID·role group·노트 미리보기 이름과 초기 aria-busy true를 사용해 줘. 처음에는 실제 콘텐츠를 숨기고 안쪽 12px inset의 absolute 뼈대를 보여 줘. 36px 정사각형과 너비가 다른 높이 10px·8px 막대 두 개를 10px 간격으로 정렬하고 1.4초 ease-in-out에서 opacity 1→.45→1을 반복해 줘. 막대 사이는 8px이며 두 번째 막대 너비는 65%야. 뼈대 전체는 aria-hidden true이고 테마 트랙색을 사용해 줘. 전환 button은 예시 콘텐츠 보기 이름·18px Eye SVG·미리보기 ID의 aria-controls를 사용하며 클릭·Enter·Space·터치로 콘텐츠 상태를 토글해 줘. 콘텐츠 상태에서는 aria-busy false·뼈대 visibility hidden과 애니메이션 중단을 적용하고 같은 미리보기 안의 36px 아이콘 영역·24px FileText SVG·주간 노트 제목·디자인 모음 콘텐츠를 250ms opacity 0→1로 표시해 줘. 콘텐츠는 첫 상태에서 aria-hidden true·visibility hidden이고 준비 상태에서 false·visible로 바꿔 줘. 전환 버튼은 로딩 모양 다시 보기 이름·18px RotateCcw SVG로 바뀌며 다시 누르면 처음 뼈대를 복원해 줘. 두 상태에서 카드·전체 프레임·button의 DOM과 치수·포커스를 유지하고 초기에는 자동 포커스를 하지 않아. 모션 감소에서는 뼈대 반복과 콘텐츠 페이드를 모두 제거해 줘. 라이트·다크 표면·본문·트랙·강조색·포커스 대비, 좁은 화면과 상단 도구 안쪽의 88px 카드·44px 버튼 정렬을 맞춰 줘. 고정 예시의 로딩/콘텐츠 모습만 비교하는 로컬 시연이며 실제 요청·완료 성공·JS 타이머·별도 제목·설명·실행 횟수는 추가하지 말아 줘.',
  },
  {
    id: 'manual-banner-carousel', domain: 'ui', category: 'layout',
    titleKo: '수동 배너 캐러셀', titleEn: 'Manual Banner Carousel',
    vibeTag: '필요한 배너를 직접 골라 넘기는', vibeKeywords: ['수동 배너', '이전 다음', '배너 캐러셀'],
    summary: '고정된 이전·다음 조작으로 배너를 순환하고 현재 슬라이드만 전달',
    promptSnippet: '지정한 영역에 최대 폭 240px의 수동 배너를 만들어 줘. 바깥은 이번 달 프로그램 이름의 role group·aria-roledescription 캐러셀이며 빛의 전시·여름 공연·주말 공방 세 슬라이드 중 처음 것을 표시해 줘. 높이 88px·1px 테두리·12px 모서리의 overflow hidden 창 안에 flex 트랙과 너비 100%·줄어들지 않는 슬라이드 세 개를 배치하고 트랙 translateX(-activeIndex * 100%)를 350ms ease로 전환해 줘. 각 슬라이드는 16px 패딩·14px 실제 제목·오른쪽 36px Frame/Music2/Paintbrush SVG로 구성해 줘. 라이트는 인디고·핑크·민트의 밝은 표면과 짙은 글자, 다크는 해당 짙은 표면과 밝은 글자를 사용해 줘. 각 슬라이드는 role group·aria-roledescription 슬라이드·고유 제목 ID의 aria-labelledby로 연결하고 현재 것만 aria-hidden false로 노출해 줘. 트랙은 aria-live polite·aria-atomic false이며 이미지 SVG는 장식으로 숨겨 줘. 창 아래 8px 간격의 3열 행에 44px 이전 프로그램 button, 중앙 장식 점 세 개, 44px 다음 프로그램 button을 놓아 줘. 양쪽 버튼은 고정된 18px ChevronLeft/ChevronRight SVG를 사용하고 클릭·Enter·Space·터치로 이전·다음 인덱스를 순환해 줘. 처음에서 이전은 마지막, 마지막에서 다음은 처음으로 돌아가며 이때도 같은 트랙 전환을 적용해 줘. 여러 입력이 한꺼번에 와도 각 이동을 누락하지 않고 조작한 버튼과 포커스를 유지해 줘. 중앙 점은 6px 원형이고 현재 것만 18px 캡슐·강조색으로 바꾸며 aria-hidden으로 숨겨 별도 Tab 조작이나 실행 횟수가 되지 않게 해 줘. 슬라이드 제목 외 별도 제목·설명·번호를 붙이지 않아. 모션 감소에서는 트랙을 즉시 바꾸고, 좁은 화면·상단 도구 안쪽에서 배너·44px 버튼·포커스 윤곽과 명암 대비를 맞춰 줘. 실제 콘텐츠 요청·링크 이동·드래그·자동 재생·타이머는 없는 로컬 배너 시연이야.',
  },
  {
    id: 'circular-sweep-spinner', domain: 'ui', category: 'layout',
    titleKo: '원형 스윕 스피너', titleEn: 'Circular Sweep Spinner',
    vibeTag: '늘어나는 호가 원을 따라 흐르는', vibeKeywords: ['원형 스피너', '회전 로더', '스윕 로딩'],
    summary: '회전과 호 길이 변화를 겹쳐 완료율 없는 원형 로딩을 표현',
    promptSnippet: '지정한 영역 중앙에 48px 정사각형의 원형 불확정 스피너를 만들어 줘. 바깥 div는 콘텐츠 로딩 중 이름의 role progressbar를 쓰고 aria-valuenow·백분율은 넣지 않아. 안쪽 48×48·viewBox 0 0 48 48 SVG는 aria-hidden true로 숨기고 cx 24·cy 24·r 18·fill none·stroke-width 4의 트랙 원과 활성 원 두 개를 겹쳐 줘. 트랙은 라이트 #e0e7ff·다크 #334155이며 활성 호는 라이트 #4338ca·다크 #a5b4fc와 round linecap을 사용해 줘. 활성 원의 pathLength를 100으로 정규화하고 1.8초 ease-in-out 무한 반복에서 stroke-dasharray 5 95·dashoffset 0 → 50% 지점 70 30·-25 → 마지막 5 95·-100으로 변화하게 해 줘. 동시에 SVG 전체는 -90deg에서 270deg로 1.4초 linear 무한 회전해 줘. 회전과 호 길이는 CSS 애니메이션으로만 구현하고 DOM·상태·JS 타이머를 반복 생성하지 않아. 모션 감소에서는 두 애니메이션을 모두 제거하고 SVG -90deg·dasharray 25 75·dashoffset 0의 고정 호만 보여 줘. 정지 호 길이를 진행률 25%로 전달하지 않고 불확정 로딩 상태 이름은 유지해 줘. 두 원의 중심·크기·둥근 끝·명암 대비와 좁은 화면·상단 도구 안쪽 배치를 맞춰 줘. 이 효과는 실제 요청·완료 전환이 없는 로컬 로딩 시연으로 제목·설명·성공 문구·실행 횟수·조작 버튼은 추가하지 말아 줘.',
  },
  {
    id: 'indeterminate-linear-loader', domain: 'ui', category: 'layout',
    titleKo: '불확정 선형 로더', titleEn: 'Indeterminate Linear Loader',
    vibeTag: '완료율 없이 흐름으로 기다림을 알리는', vibeKeywords: ['불확정 로딩', '선형 로더', '진행 중 표시'],
    summary: '두 막대의 반복 이동으로 완료율을 알 수 없는 로딩 상태를 표시',
    promptSnippet: '지정한 영역 중앙에 최대 폭 240px·높이 8px·둥근 캡슐의 불확정 선형 로더를 만들어 줘. 트랙은 overflow hidden과 라이트의 연한 인디고 #e0e7ff·다크의 슬레이트 #334155를 사용해 줘. 트랙에 콘텐츠 로딩 중 이름의 role progressbar를 연결하고 완료율을 알 수 없으므로 aria-valuenow나 시각 백분율을 넣지 않아. 장식용 막대 span 두 개를 absolute·왼쪽 0·높이 100%·너비 40%로 겹치고 aria-hidden true로 처리해 줘. 막대는 라이트 #4338ca·다크 #a5b4fc이며 translateX(-100%) scaleX(.5)에서 50% 지점 translateX(120%) scaleX(1)을 지나 translateX(350%) scaleX(.5)로 1.8초 ease-in-out 무한 반복 이동해 줘. 두 번째 막대는 -.9초 지연으로 반 주기 어긋나게 하고 양쪽 끝은 트랙 내부에서 잘리게 해 줘. 모션 감소에서는 모든 이동을 멈추고 첫 막대만 왼쪽 30%·너비 40%의 정지 형태로 남기며 두 번째 막대는 숨겨 줘. 이 정지 길이는 진행률 40%라는 의미가 아니고 로딩 상태 이름은 그대로 유지해 줘. 좁은 화면·상단 도구 안쪽에서 트랙의 크기·정렬·테마 대비를 맞춰 줘. 완료되지 않는 로컬 로딩 모양 시연으로 실제 요청·진행률·완료 전환·JS 타이머·별도 제목·설명·성공 문구·실행 횟수·조작 버튼은 추가하지 말아 줘.',
  },
  {
    id: 'underline-content-tabs', domain: 'ui', category: 'layout',
    titleKo: '언더라인 콘텐츠 탭', titleEn: 'Underline Content Tabs',
    vibeTag: '밑줄 아래로 선택한 내용이 이어지는', vibeKeywords: ['콘텐츠 탭', '밑줄 탭', '탭 패널'],
    summary: '밑줄로 현재 탭을 표시하고 키보드 선택과 실제 콘텐츠 패널을 함께 연결',
    promptSnippet: '지정한 영역에 최대 폭 240px의 문서·색상 두 탭과 콘텐츠 패널을 만들어 줘. 초기에는 문서 탭이 활성화되고 문서 패널에 24px FileText SVG와 노트 이름을 나란히 보여 줘. 색상 패널은 인디고·민트·앰버의 36×24px 견본 세 개를 8px 간격으로 배치하고 각 색 이름은 화면 읽기용으로 제공해 줘. 탭 묶음은 미리보기 종류 이름의 role tablist, 각 실제 button은 role tab·고유 ID·aria-controls·aria-selected를 사용하고 활성 탭만 tabIndex 0, 나머지는 -1로 설정해 줘. 탭은 동일 너비·높이 44px·13px 굵은 글자이며 아래 3px 밑줄과 연한 테마 표면으로 선택을 표시해 줘. 클릭·Enter·Space·터치·포커스로 해당 탭을 선택하고 좌우 방향키는 순환 이동과 즉시 선택, Home·End는 처음·마지막 탭으로 포커스와 선택을 옮겨 줘. 위·아래 방향키의 기본 스크롤은 막지 않아. Tab은 활성 탭에서 현재 패널로 빠져나가며 Shift+Tab은 활성 탭으로 돌아와야 해. 각 panel은 role tabpanel·고유 ID·해당 탭 aria-labelledby·tabIndex 0을 쓰고 비활성 panel은 hidden으로 표시·포커스·접근성 트리에서 제외해 줘. 패널은 탭 아래 8px·최소 높이 64px·12px 패딩·1px 테두리·10.4px 모서리·테마 표면색이며 두 패널의 DOM은 유지해 줘. 라이트·다크 글자·인디고 강조·테두리 대비와 탭·패널의 2px 키보드 포커스를 맞추고 좁은 화면·상단 도구 안쪽에 배치해 줘. 인스턴스마다 ID를 격리하고 초기 자동 포커스·타이머·애니메이션·네트워크·별도 제목·설명·실행 횟수는 추가하지 말아 줘.',
  },
];
