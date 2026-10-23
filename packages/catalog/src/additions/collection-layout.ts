import type { TechniqueItem } from '../techniques';

export const LAYOUT_COLLECTION_ADDITIONS: TechniqueItem[] = [
  {
    "id": "ly-circular-thumbnail-gallery",
    "domain": "layout",
    "category": "grid",
    "titleKo": "원형 썸네일 갤러리",
    "titleEn": "Circular Thumbnail Gallery",
    "summary": "둘레의 썸네일을 선택하면 가운데 미리보기가 바뀌는 원형 배치",
    "vibeTag": "원 둘레로 모인 장면",
    "vibeKeywords": [
      "원형 썸네일 갤러리",
      "원형 갤러리",
      "링 배치"
    ],
    "promptSnippet": "지정 영역에 원형 썸네일 갤러리 기법을 구현해 줘. 5개 36px 버튼을 가로 반경 85·세로 반경 53의 타원 둘레에 배치해 줘. 초기 첫 항목을 선택하고 중앙 56px 원에 같은 색·번호를 표시해 줘. 각 버튼 클릭 시 selected index와 aria-pressed를 갱신하며 포커스 표시를 유지해 줘. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "ly-triangle-tessellation-grid",
    "domain": "layout",
    "category": "grid",
    "titleKo": "삼각 타일 테셀레이션",
    "titleEn": "Triangle Tile Tessellation",
    "summary": "위아래 삼각형을 맞물려 빈틈없이 채우는 기하학 배치",
    "vibeTag": "삼각형이 채우는 화면",
    "vibeKeywords": [
      "삼각 타일 테셀레이션",
      "삼각 그리드",
      "테셀레이션"
    ],
    "promptSnippet": "지정 영역에 삼각 타일 테셀레이션 기법을 구현해 줘. 280×160 SVG에 가로 40·높이 35 단위의 삼각형 쌍을 6열 4행으로 배치해 줘. 각 셀은 위·아래 방향 삼각형 두 개로 이루어지며 5색 팔레트를 행·열 index로 순환해 줘. SVG 경계 밖은 잘라 줘. 자동 재생이나 입력 동작이 없는 정적 구성으로 만들어 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "ly-justified-image-rows",
    "domain": "layout",
    "category": "grid",
    "titleKo": "양끝 정렬 이미지 행",
    "titleEn": "Justified Image Rows",
    "summary": "서로 다른 비율의 썸네일이 행마다 같은 높이로 양끝을 채우는 배치",
    "vibeTag": "빈틈없이 맞춘 사진 행",
    "vibeKeywords": [
      "양끝 정렬 이미지 행",
      "정렬 갤러리",
      "동일 높이 사진"
    ],
    "promptSnippet": "지정 영역에 양끝 정렬 이미지 행 기법을 구현해 줘. 두 개의 flex 행에 각각 3개 풍경을 두고 높이를 65px로 통일해 줘. 첫 행 flex 비율 1.6:1:1.3, 둘째 행 .8:1.8:1.3, gap 5px를 적용해 줘. 이미지는 preserveAspectRatio slice로 셀을 채우고 min-width 0으로 좁은 폭에서도 넘치지 않게 해 줘. 자동 재생이나 입력 동작이 없는 정적 구성으로 만들어 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "ly-overlap-editorial-grid",
    "domain": "layout",
    "category": "grid",
    "titleKo": "겹침 에디토리얼 그리드",
    "titleEn": "Overlapping Editorial Grid",
    "summary": "큰 제목이 이미지 열을 가로질러 겹치는 잡지형 구성",
    "vibeTag": "겹침으로 만드는 편집 리듬",
    "vibeKeywords": [
      "겹침 에디토리얼 그리드",
      "오버랩 레이아웃",
      "잡지 제목"
    ],
    "promptSnippet": "지정 영역에 겹침 에디토리얼 그리드 기법을 구현해 줘. 6열 그리드의 행 높이를 30·65·45px로 두고 풍경은 3~6열 전체 높이에 놓아 줘. 제목은 둘째 행 1~5열에 z-index 1로 겹쳐 35px 세리프 굵은 글자로 표시해 줘. 왼쪽 아래에는 작은 회차 캡션을 두어 위계를 만들어 줘. 자동 재생이나 입력 동작이 없는 정적 구성으로 만들어 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "ly-alternating-feature-rows",
    "domain": "layout",
    "category": "grid",
    "titleKo": "교차형 기능 소개 행",
    "titleEn": "Alternating Feature Rows",
    "summary": "이미지와 설명의 좌우 순서를 번갈아 바꾸는 기능 소개 배치",
    "vibeTag": "좌우로 번갈아 읽는 이야기",
    "vibeKeywords": [
      "교차형 기능 소개 행",
      "교차 행",
      "기능 소개 배치"
    ],
    "promptSnippet": "지정 영역에 교차형 기능 소개 행 기법을 구현해 줘. 세 행마다 75×40 컬러 도형 면과 제목·짧은 줄을 나란히 놓아 줘. 가운데 행만 flex-direction row-reverse로 바꿔 좌우 리듬을 만들고 간격 12px를 유지해 줘. 순서는 시각적으로만 바꾸며 기능별 텍스트 그룹은 함께 유지해 줘. 자동 재생이나 입력 동작이 없는 정적 구성으로 만들어 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "ly-perspective-text-crawl",
    "domain": "layout",
    "category": "scroll",
    "titleKo": "원근 텍스트 크롤",
    "titleEn": "Perspective Text Crawl",
    "summary": "기울어진 글자가 위쪽 소실점으로 흐르는 오프닝 배치",
    "vibeTag": "먼 곳으로 사라지는 문장",
    "vibeKeywords": [
      "원근 텍스트 크롤",
      "원근 크롤",
      "오프닝 텍스트"
    ],
    "promptSnippet": "지정 영역에 원근 텍스트 크롤 기법을 구현해 줘. 높이 155px viewport에 perspective 200px를 주고 노랑 문장 네 줄을 중앙 정렬해 줘. 글자 그룹은 아래쪽 기준 rotateX(35deg) translateY(70-210p px)로 이동해 줘. 실제 페이지 스크롤 대신 자동 진행값으로 크롤을 시연해 줘. 진행값 p는 초기 0에서 4초에 1, 8초에 0으로 돌아오는 선형 왕복 시연으로 반복해 줘. 별도 슬라이더 없이 자동 시연하며 클릭하면 기존 시계를 초기화해 처음부터 재시작해 줘. 화면 밖·숨겨진 탭에서는 시계를 멈추고 모션 감소 환경에서는 p=0의 정지 장면을 유지해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "ly-sticky-stacked-cards",
    "domain": "layout",
    "category": "scroll",
    "titleKo": "스크롤 스티키 카드 쌓기",
    "titleEn": "Sticky Stacked Cards",
    "summary": "스크롤할수록 앞 카드 위에 다음 카드가 포개지는 배치",
    "vibeTag": "차례로 포개지는 카드",
    "vibeKeywords": [
      "스크롤 스티키 카드 쌓기",
      "스티키 스택",
      "쌓이는 카드"
    ],
    "promptSnippet": "지정 영역에 스크롤 스티키 카드 쌓기 기법을 구현해 줘. 높이 140px 스크롤 영역에 108px 카드 세 개를 45px 하단 여백으로 놓아 줘. 각 카드는 sticky top=i×7px로 설정하고 DOM 순서대로 겹치게 해 줘. 자동 진행 p에 따라 scrollTop=p×(scrollHeight-clientHeight)를 갱신해 스크롤바를 움직이지 않아도 시연되게 해 줘. 진행값 p는 초기 0에서 4초에 1, 8초에 0으로 돌아오는 선형 왕복 시연으로 반복해 줘. 별도 슬라이더 없이 자동 시연하며 클릭하면 기존 시계를 초기화해 처음부터 재시작해 줘. 화면 밖·숨겨진 탭에서는 시계를 멈추고 모션 감소 환경에서는 p=0의 정지 장면을 유지해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "ly-horizontal-timeline-track",
    "domain": "layout",
    "category": "scroll",
    "titleKo": "가로 연혁 트랙",
    "titleEn": "Horizontal Timeline Track",
    "summary": "연도와 이벤트 카드가 이어진 긴 트랙을 자동으로 가로 탐색",
    "vibeTag": "시간을 따라 옆으로 이동",
    "vibeKeywords": [
      "가로 연혁 트랙",
      "연혁 스크롤",
      "타임라인 트랙"
    ],
    "promptSnippet": "지정 영역에 가로 연혁 트랙 기법을 구현해 줘. 폭 600px flex 트랙에 연도 2022~2026과 이벤트 카드 5개를 배치해 줘. 각 칸은 100px이고 gap 16px이며 부모 overflow hidden 안에서 translateX(-340p px)로 이동해 줘. 실제 스크롤 입력 없이 가로 탐색 구조를 자동 미리보기로 보여 줘. 진행값 p는 초기 0에서 4초에 1, 8초에 0으로 돌아오는 선형 왕복 시연으로 반복해 줘. 별도 슬라이더 없이 자동 시연하며 클릭하면 기존 시계를 초기화해 처음부터 재시작해 줘. 화면 밖·숨겨진 탭에서는 시계를 멈추고 모션 감소 환경에서는 p=0의 정지 장면을 유지해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "ly-footer-uncover-scroll",
    "domain": "layout",
    "category": "scroll",
    "titleKo": "푸터 언커버 스크롤",
    "titleEn": "Footer Uncover Scroll",
    "summary": "본문이 올라가며 뒤에 고정된 마무리 영역을 드러내는 구조",
    "vibeTag": "본문 뒤에서 드러나는 끝맺음",
    "vibeKeywords": [
      "푸터 언커버 스크롤",
      "푸터 리빌",
      "언커버 푸터"
    ],
    "promptSnippet": "지정 영역에 푸터 언커버 스크롤 기법을 구현해 줘. 140px 스크롤 viewport에 290px 본문을 position relative·z-index 1로 두고 뒤에 높이 75px 푸터를 sticky bottom 0으로 배치해 줘. 본문 배경과 그림자가 푸터를 가리다가 스크롤 끝에서 드러나게 해 줘. scrollTop은 p와 최대 스크롤 거리의 곱으로 자동 갱신해 줘. 진행값 p는 초기 0에서 4초에 1, 8초에 0으로 돌아오는 선형 왕복 시연으로 반복해 줘. 별도 슬라이더 없이 자동 시연하며 클릭하면 기존 시계를 초기화해 처음부터 재시작해 줘. 화면 밖·숨겨진 탭에서는 시계를 멈추고 모션 감소 환경에서는 p=0의 정지 장면을 유지해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "ly-scroll-linked-path",
    "domain": "layout",
    "category": "scroll",
    "titleKo": "스크롤 연결 경로 드로잉",
    "titleEn": "Scroll Linked Path Drawing",
    "summary": "문서 스크롤 진행과 곡선이 그려지는 길이를 함께 연결",
    "vibeTag": "읽은 만큼 그려지는 길",
    "vibeKeywords": [
      "스크롤 연결 경로 드로잉",
      "스크롤 패스",
      "문서 경로"
    ],
    "promptSnippet": "지정 영역에 스크롤 연결 경로 드로잉 기법을 구현해 줘. 왼쪽에 세로 S자 SVG 경로의 옅은 바탕과 보라색 선을 겹쳐 줘. pathLength 1·strokeDasharray 1·strokeDashoffset 1-p를 적용하고 오른쪽 140px 목록 viewport의 scrollTop도 같은 p에 최대 거리를 곱해 갱신해 줘. 시연은 자동이며 사용자가 직접 스크롤한 위치를 읽어 동기화하는 기능은 아니야. 진행값 p는 초기 0에서 4초에 1, 8초에 0으로 돌아오는 선형 왕복 시연으로 반복해 줘. 별도 슬라이더 없이 자동 시연하며 클릭하면 기존 시계를 초기화해 처음부터 재시작해 줘. 화면 밖·숨겨진 탭에서는 시계를 멈추고 모션 감소 환경에서는 p=0의 정지 장면을 유지해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "ly-document-minimap-navigation",
    "domain": "layout",
    "category": "nav",
    "titleKo": "문서 미니맵 탐색",
    "titleEn": "Document Minimap Navigation",
    "summary": "축소된 페이지 버튼을 눌러 큰 미리보기의 구간을 이동",
    "vibeTag": "문서 전체를 보는 작은 지도",
    "vibeKeywords": [
      "문서 미니맵 탐색",
      "문서 미니맵",
      "페이지 미니맵"
    ],
    "promptSnippet": "지정 영역에 문서 미니맵 탐색 기법을 구현해 줘. 왼쪽 140px 높이 viewport에 세 페이지를 세로로 쌓고 오른쪽에 40px 높이 축소 버튼을 배치해 줘. 초기 첫 페이지, 버튼 선택 시 콘텐츠 translateY를 -140×index로 350ms 전환해 줘. 버튼의 aria-pressed와 외곽선으로 현재 위치를 표시해 줘. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "ly-collapsed-breadcrumb-path",
    "domain": "layout",
    "category": "nav",
    "titleKo": "접힌 브레드크럼 경로",
    "titleEn": "Collapsed Breadcrumb Path",
    "summary": "긴 경로의 가운데 항목을 줄임표로 접고 필요할 때 펼치는 탐색",
    "vibeTag": "긴 경로를 간결하게",
    "vibeKeywords": [
      "접힌 브레드크럼 경로",
      "경로 줄임표",
      "접힌 경로"
    ],
    "promptSnippet": "지정 영역에 접힌 브레드크럼 경로 기법을 구현해 줘. 네 경로 항목 중 처음과 끝만 표시하고 중간 두 항목을 줄임표 버튼으로 대체해 줘. 클릭 시 중간 항목과 접기 버튼을 보여 줘. 각 경로 버튼은 선택된 샘플 위치 이름을 아래 출력하며 실제 페이지 이동은 하지 않아. 초기 선택은 마지막 항목이야. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "ly-flyout-branch-menu",
    "domain": "layout",
    "category": "nav",
    "titleKo": "분기 플라이아웃 메뉴",
    "titleEn": "Branch Flyout Menu",
    "summary": "상위 항목 옆에 하위 선택지를 펼치는 두 열 메뉴",
    "vibeTag": "가지처럼 펼쳐지는 선택",
    "vibeKeywords": [
      "분기 플라이아웃 메뉴",
      "하위 플라이아웃",
      "분기 메뉴"
    ],
    "promptSnippet": "지정 영역에 분기 플라이아웃 메뉴 기법을 구현해 줘. 자료실 버튼 옆에 이미지·문서 하위 버튼 면을 두어 줘. 초기 하위 면은 숨기고 상위 버튼의 aria-expanded와 함께 토글해 줘. 하위 항목 선택은 로컬 index를 바꾸고 출력 라벨과 aria-pressed를 갱신해 줘. 마우스 호버만 요구하지 않아. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "ly-vertical-journey-rail",
    "domain": "layout",
    "category": "nav",
    "titleKo": "세로 여정 레일",
    "titleEn": "Vertical Journey Rail",
    "summary": "세로 연결선 옆의 단계를 선택해 현재 여정 화면을 바꾸는 탐색",
    "vibeTag": "단계마다 달라지는 여정",
    "vibeKeywords": [
      "세로 여정 레일",
      "여정 단계",
      "버티컬 레일"
    ],
    "promptSnippet": "지정 영역에 세로 여정 레일 기법을 구현해 줘. 시작·탐색·완료 버튼을 보라색 세로선 옆에 쌓고 오른쪽에는 선택 단계의 기호와 이름을 표시해 줘. 초기 시작을 선택하고 클릭 시 aria-current step·aria-pressed를 갱신해 줘. 앞 단계 완료 여부를 자동 추론하거나 실제 업무 데이터를 바꾸지 않아. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "ly-workspace-switcher",
    "domain": "layout",
    "category": "nav",
    "titleKo": "워크스페이스 전환기",
    "titleEn": "Workspace Switcher",
    "summary": "현재 공간 이름을 눌러 다른 공간을 선택하는 드롭다운",
    "vibeTag": "작업 공간을 가볍게 전환",
    "vibeKeywords": [
      "워크스페이스 전환기",
      "공간 선택",
      "팀 전환"
    ],
    "promptSnippet": "지정 영역에 워크스페이스 전환기 기법을 구현해 줘. 개인·스튜디오·팀 중 초기 개인을 표시해 줘. 상단 버튼으로 후보 목록을 열고 항목을 선택하면 selected index를 바꾸고 목록을 닫아 줘. 메뉴는 native 버튼으로 구성하고 aria-expanded·aria-pressed를 제공해 줘. 계정 전환이나 서버 요청은 없어. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "ly-multitrack-clip-timeline",
    "domain": "layout",
    "category": "panel",
    "titleKo": "멀티트랙 클립 타임라인",
    "titleEn": "Multitrack Clip Timeline",
    "summary": "영상·제목·오디오 행의 클립을 선택하면 아래 속성이 바뀌는 편집기 구성",
    "vibeTag": "트랙 위에 놓인 시간 조각",
    "vibeKeywords": [
      "멀티트랙 클립 타임라인",
      "클립 타임라인",
      "트랙 편집기"
    ],
    "promptSnippet": "지정 영역에 멀티트랙 클립 타임라인 기법을 구현해 줘. 세 트랙의 고정 라벨과 가로 타임라인을 나란히 배치해 줘. 클립 시작은 i×13%, 너비는 85-i×18%로 다르게 두고 선택 버튼으로 만들어 줘. 초기 첫 클립을 선택하고 하단에 선택 트랙 이름·클립 번호를 표시해 줘. 실제 미디어 재생이나 타이밍 편집은 없어. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "ly-collapsible-run-log",
    "domain": "layout",
    "category": "panel",
    "titleKo": "실행 로그 접기 패널",
    "titleEn": "Collapsible Run Log",
    "summary": "준비·검증·완료 로그 묶음을 개별로 펼치는 콘솔 패널",
    "vibeTag": "필요한 실행 기록만 펼치기",
    "vibeKeywords": [
      "실행 로그 접기 패널",
      "로그 그룹",
      "접는 콘솔"
    ],
    "promptSnippet": "지정 영역에 실행 로그 접기 패널 기법을 구현해 줘. 어두운 패널 안에 native details 3개를 세로 배치하고 첫 항목만 초기 open으로 둬. summary에 단계 이름과 체크 기호를 표시하고 안쪽에는 작은 monospace 샘플 로그를 넣어 줘. 실제 명령 실행 없이 접고 펼치는 UI만 보여 줘. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "ly-column-visibility-table",
    "domain": "layout",
    "category": "panel",
    "titleKo": "열 표시 선택 표",
    "titleEn": "Column Visibility Table",
    "summary": "체크박스로 값·상태 열을 켜고 끄는 데이터 표",
    "vibeTag": "필요한 열만 남기는 표",
    "vibeKeywords": [
      "열 표시 선택 표",
      "열 숨기기",
      "컬럼 선택"
    ],
    "promptSnippet": "지정 영역에 열 표시 선택 표 기법을 구현해 줘. 항목·값·상태의 세 열과 샘플 행 3개를 native table로 표시해 줘. 값·상태 체크박스는 초기 true이며 변경하면 해당 th와 모든 td를 함께 렌더링하거나 제거해 줘. 항목 열은 항상 유지하고 데이터 값 자체는 바꾸지 않아. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "ly-crossfilter-summary-bars",
    "domain": "layout",
    "category": "panel",
    "titleKo": "선택 연동 요약 막대",
    "titleEn": "Crossfilter Summary Bars",
    "summary": "막대 선택에 따라 합계가 해당 그룹 값으로 바뀌는 데이터 패널",
    "vibeTag": "선택과 요약이 함께 움직임",
    "vibeKeywords": [
      "선택 연동 요약 막대",
      "교차 필터",
      "선택 합계"
    ],
    "promptSnippet": "지정 영역에 선택 연동 요약 막대 기법을 구현해 줘. 34·67·48의 막대 3개와 하단 합계 149를 표시해 줘. 초기 선택 없음에서 막대를 누르면 해당 값만 요약하고 나머지 opacity를 .3으로 낮춰 줘. 같은 막대를 다시 누르면 선택을 해제해 전체 합계로 돌아오며 aria-pressed를 갱신해 줘. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "ly-overview-detail-chart",
    "domain": "layout",
    "category": "panel",
    "titleKo": "개요·상세 구간 차트",
    "titleEn": "Overview and Detail Chart",
    "summary": "전체 미니 차트의 선택 창을 옮겨 위쪽 상세 구간을 바꾸는 구성",
    "vibeTag": "전체와 부분을 함께 보기",
    "vibeKeywords": [
      "개요·상세 구간 차트",
      "개요 상세",
      "브러시 구간"
    ],
    "promptSnippet": "지정 영역에 개요·상세 구간 차트 기법을 구현해 줘. 고정된 14개 값을 아래 미니 차트로 그리고 위에는 start부터 7개 값만 확대한 선 차트를 표시해 줘. 초기 start 0이며 0~7 range로 조절해 줘. 아래 128px 선택 창의 x도 start×20+6으로 옮기고 표시 중인 시작·끝 번호를 출력해 줘. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  }
];
