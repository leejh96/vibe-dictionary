import type { TechniqueItem } from '../techniques';

export const UI_COLLECTION_ADDITIONS: TechniqueItem[] = [
  {
    "id": "hover-image-preview-link",
    "domain": "ui",
    "category": "hover",
    "titleKo": "이미지 프리뷰 링크",
    "titleEn": "Image Preview Link",
    "summary": "링크에 호버하거나 포커스를 주면 작은 풍경 이미지가 떠오르는 링크",
    "vibeTag": "다가서면 펼쳐지는 장면",
    "vibeKeywords": [
      "이미지 프리뷰 링크",
      "호버 이미지",
      "프리뷰 링크"
    ],
    "promptSnippet": "지정 영역에 이미지 프리뷰 링크 기법을 구현해 줘. 밑줄 링크 버튼 위에 100×58 SVG 풍경을 절대 배치해 줘. 초기 opacity 0·translateY(12px), hover와 focus-visible에서 opacity 1·translateY(0)으로 250ms 전환하고 -8도 기울기를 유지해 줘. 클릭으로 이동하거나 새 창을 열지는 않아. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "hover-wavy-underline",
    "domain": "ui",
    "category": "hover",
    "titleKo": "물결 밑줄 근접 호버",
    "titleEn": "Wavy Underline Offset Hover",
    "summary": "물결 밑줄이 글자 쪽으로 올라오며 반응하는 텍스트 버튼",
    "vibeTag": "글자 아래 작은 물결",
    "vibeKeywords": [
      "물결 밑줄 근접 호버",
      "웨이브 밑줄",
      "밑줄 간격"
    ],
    "promptSnippet": "지정 영역에 물결 밑줄 근접 호버 기법을 구현해 줘. 텍스트 버튼에 2px 보라색 wavy 밑줄을 넣고 underline-offset을 초기 8px에서 호버·focus-visible 시 3px로 250ms 전환해 줘. 포커스가 빠지면 원위치로 복귀해 줘. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "hover-split-curtain",
    "domain": "ui",
    "category": "hover",
    "titleKo": "좌우 커튼 호버 버튼",
    "titleEn": "Split Curtain Hover Button",
    "summary": "버튼의 두 배경 면이 양옆으로 갈라지며 아래 색이 드러나는 효과",
    "vibeTag": "양옆으로 열리는 무대",
    "vibeKeywords": [
      "좌우 커튼 호버 버튼",
      "분할 배경 호버",
      "커튼 버튼"
    ],
    "promptSnippet": "지정 영역에 좌우 커튼 호버 버튼 기법을 구현해 줘. 버튼 바탕을 연노랑으로 두고 보라색 가상요소 두 개로 좌우 절반을 덮어 줘. 글자는 덮개보다 위에 둬. hover·focus-visible에서 각 덮개를 -101%와 +101% 이동해 350ms에 열고 이탈하면 닫아 줘. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "hover-arrow-conveyor",
    "domain": "ui",
    "category": "hover",
    "titleKo": "화살표 컨베이어 호버",
    "titleEn": "Arrow Conveyor Hover",
    "summary": "작은 창 안에서 대각선 화살표가 올라가고 수평 화살표가 들어오는 버튼",
    "vibeTag": "계속 이어지는 방향감",
    "vibeKeywords": [
      "화살표 컨베이어 호버",
      "화살표 교체",
      "아이콘 롤링"
    ],
    "promptSnippet": "지정 영역에 화살표 컨베이어 호버 기법을 구현해 줘. 버튼 라벨 옆에 높이 20px overflow hidden 창을 만들고 ↗와 →를 각각 line-height 20px로 세로 적층해 줘. 호버·focus-visible에서 두 줄을 -20px 이동하는 350ms 전환을 적용해 줘. 아이콘은 장식으로 처리해 줘. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "hover-radial-ink",
    "domain": "ui",
    "category": "hover",
    "titleKo": "중앙 잉크 확산 호버",
    "titleEn": "Radial Ink Spread Hover",
    "summary": "버튼 중앙의 작은 원이 커지며 바탕을 채우는 잉크 효과",
    "vibeTag": "잉크가 번지는 순간",
    "vibeKeywords": [
      "중앙 잉크 확산 호버",
      "잉크 확산",
      "원형 채움"
    ],
    "promptSnippet": "지정 영역에 중앙 잉크 확산 호버 기법을 구현해 줘. 버튼 중앙에 지름 10px 보라색 원을 놓고 초기 scale 0으로 숨겨 줘. hover·focus-visible에서 scale 22까지 450ms 확대하고 버튼 overflow hidden으로 잘라 줘. 글자를 원보다 위에 두고 활성 상태에서는 짙은 글자로 바꿔 줘. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "perforated-admission-ticket",
    "domain": "ui",
    "category": "card",
    "titleKo": "천공 입장 티켓 카드",
    "titleEn": "Perforated Admission Ticket",
    "summary": "반원 홈과 절취선으로 본문·번호 면을 나눈 입장권 카드",
    "vibeTag": "한 장의 입장권",
    "vibeKeywords": [
      "천공 입장 티켓 카드",
      "입장권",
      "절취선 티켓"
    ],
    "promptSnippet": "지정 영역에 천공 입장 티켓 카드 기법을 구현해 줘. 카드를 본문 1fr와 번호 64px의 두 열로 구성해 줘. 보라색 바탕에 행사명과 회차를 놓고 번호 열은 vertical-rl로 표시해 줘. 열 경계에 점선과 상하 18px 원형 홈을 만들어 절취선을 표현해 줘. 테마에 따라 홈 색을 주변 배경에 맞춰 줘. 자동 재생이나 입력 동작이 없는 정적 구성으로 만들어 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "hinged-book-cover-card",
    "domain": "ui",
    "category": "card",
    "titleKo": "책 표지 힌지 카드",
    "titleEn": "Hinged Book Cover Card",
    "summary": "표지가 왼쪽 책등을 축으로 열려 안쪽 문장이 드러나는 카드",
    "vibeTag": "표지를 여는 기대감",
    "vibeKeywords": [
      "책 표지 힌지 카드",
      "책 표지",
      "북 커버"
    ],
    "promptSnippet": "지정 영역에 책 표지 힌지 카드 기법을 구현해 줘. 120×130 책의 크림색 안쪽 페이지 위에 보라색 표지 버튼을 겹쳐 줘. 초기 닫힘이며 클릭하면 transform-origin left·rotateY(-125deg)로 600ms 전환해 줘. 부모 perspective 650px, 표지 backface-visibility hidden을 쓰고 별도 토글 버튼으로 다시 닫을 수 있게 해 줘. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "fan-spread-deck",
    "domain": "ui",
    "category": "card",
    "titleKo": "부채꼴 카드 펼치기",
    "titleEn": "Fan Spread Card Deck",
    "summary": "겹친 카드 세 장이 아래쪽 축을 중심으로 부채처럼 펼쳐지는 카드 묶음",
    "vibeTag": "손안에 펼친 카드",
    "vibeKeywords": [
      "부채꼴 카드 펼치기",
      "카드 부채",
      "덱 펼침"
    ],
    "promptSnippet": "지정 영역에 부채꼴 카드 펼치기 기법을 구현해 줘. 78×104 카드 3개를 같은 위치에 겹치고 초기 회전은 0으로 둬. 카드 클릭 시 전체의 펼침 boolean을 바꿔 -23·0·23도로 회전해 줘. 회전축은 50% 130%, 바깥 카드는 4px 올리고 400ms 전환해 줘. 모든 카드에 번호 접근성 이름을 제공해 줘. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "scratch-mask-reveal-card",
    "domain": "ui",
    "category": "card",
    "titleKo": "스크래치 마스크 리빌 카드",
    "titleEn": "Scratch Mask Reveal Card",
    "summary": "슬라이더를 움직이면 지그재그 긁힘 경로가 은색 덮개를 지우는 카드",
    "vibeTag": "긁어서 드러나는 행운",
    "vibeKeywords": [
      "스크래치 마스크 리빌 카드",
      "스크래치 카드",
      "긁기 마스크"
    ],
    "promptSnippet": "지정 영역에 스크래치 마스크 리빌 카드 기법을 구현해 줘. 라임색 당첨 문구 위에 은색 rect를 겹쳐 줘. 흰 mask 위에 검정 지그재그 path를 stroke-width 40·round cap·pathLength 100으로 그려 줘. 초기 reveal 0, 슬라이더 0~100을 strokeDasharray reveal 100에 연결해 긁은 부분만 투명하게 해 줘. 직접 자유곡선을 그리는 입력은 없으며 마스크 ID는 인스턴스별로 달라야 해. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "product-hotspot-card",
    "domain": "ui",
    "category": "card",
    "titleKo": "제품 핫스폿 카드",
    "titleEn": "Product Hotspot Card",
    "summary": "제품 위 세 지점을 선택하면 해당 부위 설명이 아래에 나타나는 카드",
    "vibeTag": "제품의 작은 발견",
    "vibeKeywords": [
      "제품 핫스폿 카드",
      "제품 주석",
      "이미지 핫스팟"
    ],
    "promptSnippet": "지정 영역에 제품 핫스폿 카드 기법을 구현해 줘. SVG 병 위에 캡·라벨·몸체 위치를 가리키는 번호 버튼 3개를 절대 배치해 줘. 초기 첫 핫스폿을 선택하고 클릭 시 selected index와 aria-pressed를 함께 바꿔 줘. 아래 출력 영역에 선택 부위 이름을 표시하고 자동 선택 전환은 하지 않아. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "circular-scene-switch",
    "domain": "ui",
    "category": "motion",
    "titleKo": "원형 창 장면 전환",
    "titleEn": "Circular Scene Switch",
    "summary": "중앙 원형 클립을 넓혀 다른 풍경으로 바꾸는 전환",
    "vibeTag": "원으로 바뀌는 풍경",
    "vibeKeywords": [
      "원형 창 장면 전환",
      "원형 전환",
      "장면 클립"
    ],
    "promptSnippet": "지정 영역에 원형 창 장면 전환 기법을 구현해 줘. 첫 풍경 위에 두 번째 풍경을 clipPath circle로 겹쳐 줘. 초기 반지름 0에서 버튼으로 170까지 600ms 전환하고 다시 누르면 0으로 복귀해 줘. 중심은 280×160 SVG의 140,80이며 clip ID는 인스턴스별로 분리해 줘. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "domino-tile-transition",
    "domain": "ui",
    "category": "motion",
    "titleKo": "도미노 타일 전환",
    "titleEn": "Domino Tile Transition",
    "summary": "다섯 타일이 100ms 간격으로 넘어지거나 다시 일어나는 전환",
    "vibeTag": "차례차례 넘어가는 장면",
    "vibeKeywords": [
      "도미노 타일 전환",
      "도미노 모션",
      "순차 쓰러짐"
    ],
    "promptSnippet": "지정 영역에 도미노 타일 전환 기법을 구현해 줘. 높이 65px 타일 5개를 나란히 세우고 transform-origin bottom right로 둬. 버튼으로 회전을 0도와 65도 사이 전환하되 각 타일의 delay를 index×100ms, duration을 300ms ease-in으로 해 줘. 이는 CSS 순차 회전이며 실제 충돌 계산은 없어. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "zipper-panel-opening",
    "domain": "ui",
    "category": "motion",
    "titleKo": "지퍼 패널 열림",
    "titleEn": "Zipper Panel Opening",
    "summary": "맞물린 점선 경계의 두 패널이 벌어져 안쪽 문구를 드러내는 전환",
    "vibeTag": "중앙부터 열리는 틈",
    "vibeKeywords": [
      "지퍼 패널 열림",
      "지퍼 리빌",
      "양쪽 열기"
    ],
    "promptSnippet": "지정 영역에 지퍼 패널 열림 기법을 구현해 줘. 라임색 문구 영역을 보라색 두 절반으로 덮고 안쪽 경계에 5px 밝은 점선을 넣어 지퍼 이빨처럼 보여 줘. 초기 닫힘, 버튼 클릭 시 좌우 패널을 각 -100%·100% 수평 이동해 600ms에 열고 다시 누르면 닫아 줘. 실제 지퍼 물리나 개별 이빨 맞물림은 없어. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "cube-panel-switch",
    "domain": "ui",
    "category": "motion",
    "titleKo": "큐브 면 패널 전환",
    "titleEn": "Cube Face Panel Switch",
    "summary": "정면 패널이 90도 돌아가며 옆면 콘텐츠를 보여주는 3D 전환",
    "vibeTag": "면을 돌리는 전환",
    "vibeKeywords": [
      "큐브 면 패널 전환",
      "큐브 전환",
      "3D 패널"
    ],
    "promptSnippet": "지정 영역에 큐브 면 패널 전환 기법을 구현해 줘. 110×110 정면과 옆면을 translateZ(55px), rotateY(90deg) translateZ(55px)로 배치해 줘. 부모 perspective 500px와 preserve-3d를 쓰고 초기 큐브 rotateY 0에서 버튼으로 -90도까지 700ms 전환해 줘. 뒷면은 숨겨 줘. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "stack-to-grid-transition",
    "domain": "ui",
    "category": "motion",
    "titleKo": "스택에서 격자로 전환",
    "titleEn": "Stack to Grid Transition",
    "summary": "겹친 네 카드가 2×2 격자로 흩어지고 다시 쌓이는 전환",
    "vibeTag": "쌓임에서 펼침으로",
    "vibeKeywords": [
      "스택에서 격자로 전환",
      "스택 그리드",
      "펼침 레이아웃"
    ],
    "promptSnippet": "지정 영역에 스택에서 격자로 전환 기법을 구현해 줘. 72×52 카드 4개를 중앙에 위치·기울기를 조금씩 달리해 겹쳐 줘. 버튼을 누르면 두 열·두 행 위치로 이동하고 회전을 0으로 바꿔 줘. left·top·transform은 500ms로 전환하고 선택 boolean만 유지해 줘. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "balanced-headline-wrap",
    "domain": "ui",
    "category": "text",
    "titleKo": "균형 잡힌 헤드라인 줄바꿈",
    "titleEn": "Balanced Headline Wrapping",
    "summary": "너비를 바꾸며 마지막 줄이 짧아지지 않도록 균형을 잡는 제목",
    "vibeTag": "가지런한 문장 호흡",
    "vibeKeywords": [
      "균형 잡힌 헤드라인 줄바꿈",
      "균형 줄바꿈",
      "헤드라인 균형"
    ],
    "promptSnippet": "지정 영역에 균형 잡힌 헤드라인 줄바꿈 기법을 구현해 줘. 굵은 25px 제목에 text-wrap balance와 line-height 1.15를 적용해 줘. 너비는 초기 220px이고 range로 130~270px를 바꾸며 max-width 100%를 유지해 줘. 문장 내용은 고정하고 실제 CSS 줄바꿈을 보여 줘. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "ruby-reading-annotation",
    "domain": "ui",
    "category": "text",
    "titleKo": "루비 발음 주석",
    "titleEn": "Ruby Reading Annotation",
    "summary": "큰 본문 글자 위에 작은 발음·뜻 주석을 얹는 타이포",
    "vibeTag": "읽기를 돕는 작은 힌트",
    "vibeKeywords": [
      "루비 발음 주석",
      "루비 태그",
      "발음 표기"
    ],
    "promptSnippet": "지정 영역에 루비 발음 주석 기법을 구현해 줘. native ruby와 rt를 사용해 38px 본문 위에 12px 보라색 읽기 주석을 올려 줘. 폰트는 세리프이며 중앙에 배치해 줘. 한영 전환 시 본문과 주석을 각각 해당 사전 키로 표시해 줘. 자동 재생이나 입력 동작이 없는 정적 구성으로 만들어 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "proofreading-text-marks",
    "domain": "ui",
    "category": "text",
    "titleKo": "교정 표시 타이포",
    "titleEn": "Proofreading Text Marks",
    "summary": "삭제할 문구와 새 문구를 취소선·물결 밑줄로 대비하는 글자 구성",
    "vibeTag": "교정 흔적의 생동감",
    "vibeKeywords": [
      "교정 표시 타이포",
      "교정 마크",
      "삽입 삭제"
    ],
    "promptSnippet": "지정 영역에 교정 표시 타이포 기법을 구현해 줘. 세리프 25px 문구 두 줄을 가운데 정렬해 줘. 첫 줄은 del 요소와 붉은 2px 취소선, 둘째 줄은 ins 요소와 보라색 wavy 밑줄·8px offset을 적용해 줘. 실제 편집기 기능 없이 교정 표시의 시각적 위계를 보여 줘. 자동 재생이나 입력 동작이 없는 정적 구성으로 만들어 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "inline-footnote-disclosure",
    "domain": "ui",
    "category": "text",
    "titleKo": "인라인 각주 펼침",
    "titleEn": "Inline Footnote Disclosure",
    "summary": "본문의 작은 번호를 누르면 보충 설명이 아래에 펼쳐지는 텍스트",
    "vibeTag": "필요할 때 읽는 주석",
    "vibeKeywords": [
      "인라인 각주 펼침",
      "각주",
      "보충 설명"
    ],
    "promptSnippet": "지정 영역에 인라인 각주 펼침 기법을 구현해 줘. 본문 뒤에 작은 위첨자 번호 버튼을 놓아 줘. 초기 접힘에서 클릭·키보드로 open을 토글하고 aria-expanded·aria-controls를 연결해 줘. 보충 설명 div는 고유 ID와 hidden 속성으로 노출을 제어하고 본문은 그대로 유지해 줘. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "vertical-editorial-type",
    "domain": "ui",
    "category": "text",
    "titleKo": "세로쓰기 에디토리얼",
    "titleEn": "Vertical Editorial Typography",
    "summary": "세로 제목과 작은 캡션, 컬러 아치를 나란히 배치한 편집 스타일",
    "vibeTag": "위에서 아래로 읽는 여백",
    "vibeKeywords": [
      "세로쓰기 에디토리얼",
      "세로 타이포",
      "세로쓰기"
    ],
    "promptSnippet": "지정 영역에 세로쓰기 에디토리얼 기법을 구현해 줘. writing-mode vertical-rl의 28px 제목과 12px 캡션을 나란히 놓고 각각 2px·3px 자간을 줘. 옆에는 55×100 그라데이션 아치를 배치해 세로 흐름과 대비해 줘. 제목은 줄바꿈 없이 표시하고 전체 높이는 140px로 제한해 줘. 자동 재생이나 입력 동작이 없는 정적 구성으로 만들어 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "password-rule-checklist",
    "domain": "ui",
    "category": "feedback",
    "titleKo": "비밀번호 조건 체크리스트",
    "titleEn": "Password Rule Checklist",
    "summary": "샘플 비밀번호의 길이·숫자·대문자 조건을 실시간 표시",
    "vibeTag": "조건을 하나씩 채우기",
    "vibeKeywords": [
      "비밀번호 조건 체크리스트",
      "암호 조건",
      "비밀번호 체크"
    ],
    "promptSnippet": "지정 영역에 비밀번호 조건 체크리스트 기법을 구현해 줘. 빈 password 입력에서 시작해 길이 8 이상·숫자 포함·영문 대문자 포함의 세 boolean을 계산해 줘. 각 조건 체크와 충족 수/3의 진행 바를 갱신해 줘. 입력은 메모리에만 두고 저장·전송하지 않아. 이 세 조건을 보안 강도의 보증으로 표현하지 말아 줘. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "dirty-note-save-state",
    "domain": "ui",
    "category": "feedback",
    "titleKo": "노트 변경·저장 상태",
    "titleEn": "Dirty Note Save State",
    "summary": "입력 내용과 마지막 저장본을 비교해 미저장 상태와 버튼을 표시",
    "vibeTag": "수정과 저장의 명확한 구분",
    "vibeKeywords": [
      "노트 변경·저장 상태",
      "변경 감지",
      "저장 상태"
    ],
    "promptSnippet": "지정 영역에 노트 변경·저장 상태 기법을 구현해 줘. 현재 value와 saved 문자열을 모두 빈 값으로 시작해 줘. textarea 변경 시 value!==saved이면 미저장 안내와 활성 저장 버튼을 표시해 줘. 저장은 saved=value로 갱신하고 같으면 버튼을 비활성화해 줘. 로컬 데모라는 안내를 유지하며 새로고침을 넘는 저장이나 서버 요청은 없어. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "chunked-progress-feedback",
    "domain": "ui",
    "category": "feedback",
    "titleKo": "청크 단위 진행 피드백",
    "titleEn": "Chunked Progress Feedback",
    "summary": "버튼을 누를 때마다 다섯 진행 조각 중 하나를 채우는 시연",
    "vibeTag": "단계마다 쌓이는 성취",
    "vibeKeywords": [
      "청크 단위 진행 피드백",
      "분할 진행률",
      "청크 진행"
    ],
    "promptSnippet": "지정 영역에 청크 단위 진행 피드백 기법을 구현해 줘. count를 0으로 시작하고 버튼 클릭마다 1씩 증가시켜 최대 5까지 표시해 줘. 다섯 셀 중 index<count만 보라색으로 채우고 완료 수를 polite 출력으로 안내해 줘. 5에서 버튼은 초기화로 바뀌어 0으로 복귀해 줘. 파일 업로드나 네트워크 작업은 없는 수동 진행 시연이야. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "toggle-reaction-picker",
    "domain": "ui",
    "category": "feedback",
    "titleKo": "토글 반응 선택기",
    "titleEn": "Toggle Reaction Picker",
    "summary": "세 반응 중 하나를 선택하거나 같은 버튼으로 해제하는 입력",
    "vibeTag": "가볍게 전하는 마음",
    "vibeKeywords": [
      "토글 반응 선택기",
      "반응 버튼",
      "리액션 선택"
    ],
    "promptSnippet": "지정 영역에 토글 반응 선택기 기법을 구현해 줘. 세 개의 장식 기호 버튼을 나란히 놓고 초기 selected를 null로 둬. 클릭 시 선택 index를 유지하되 같은 버튼을 다시 누르면 null로 해제해 줘. 선택한 버튼만 8px 위로 이동하고 aria-pressed와 한영 반응 이름을 갱신해 줘. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "simulated-connectivity-banner",
    "domain": "ui",
    "category": "feedback",
    "titleKo": "연결 상태 배너 시연",
    "titleEn": "Simulated Connectivity Banner",
    "summary": "상태 토글에 따라 온라인·오프라인 안내 색과 문구가 바뀌는 배너",
    "vibeTag": "연결 상태를 한눈에",
    "vibeKeywords": [
      "연결 상태 배너 시연",
      "오프라인 배너",
      "연결 안내"
    ],
    "promptSnippet": "지정 영역에 연결 상태 배너 시연 기법을 구현해 줘. 초기 online true에서 토글로 상태를 뒤집어 줘. 온라인은 초록 왼쪽 선·배경, 오프라인은 분홍 선·배경을 쓰고 status 영역의 문구를 바꿔 줘. 실제 네트워크를 감지하지 않는 시연이라는 안내를 항상 표시해 줘. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "avatar-overflow-cluster",
    "domain": "ui",
    "category": "layout",
    "titleKo": "아바타 오버플로 묶음",
    "titleEn": "Avatar Overflow Cluster",
    "summary": "겹친 세 아바타 옆의 +2 버튼으로 나머지 참여자를 펼치는 구성",
    "vibeTag": "사람들이 모인 작은 원",
    "vibeKeywords": [
      "아바타 오버플로 묶음",
      "아바타 그룹",
      "참여자 더보기"
    ],
    "promptSnippet": "지정 영역에 아바타 오버플로 묶음 기법을 구현해 줘. 지름 46px 아바타 3개에 흰 테두리를 두고 음수 여백으로 겹쳐 줘. 옆의 +2 native 버튼은 초기 접힘이며 aria-expanded와 함께 나머지 두 사람 안내를 토글해 줘. 자동 펼침이나 실제 계정 연결은 없어. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "grouped-chat-bubbles",
    "domain": "ui",
    "category": "layout",
    "titleKo": "발신자별 대화 묶음",
    "titleEn": "Grouped Chat Bubbles",
    "summary": "연속 메시지의 간격과 말풍선 모서리로 발신자 그룹을 구분",
    "vibeTag": "대화의 자연스러운 묶음",
    "vibeKeywords": [
      "발신자별 대화 묶음",
      "메시지 그룹",
      "채팅 말풍선"
    ],
    "promptSnippet": "지정 영역에 발신자별 대화 묶음 기법을 구현해 줘. 발신자 이름 아래 왼쪽 말풍선 두 개를 4px 간격으로 묶어 줘. 답장은 오른쪽 정렬·보라색 면·오른쪽 아래 작은 모서리로 구분하고 하단에 읽음 안내를 둬. 실제 메시지 전송이나 입력은 없는 정적 대화 샘플이야. 자동 재생이나 입력 동작이 없는 정적 구성으로 만들어 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "horizontal-milestone-rail",
    "domain": "ui",
    "category": "layout",
    "titleKo": "수평 마일스톤 레일",
    "titleEn": "Horizontal Milestone Rail",
    "summary": "세 단계 중 선택한 지점까지 연결선과 체크가 채워지는 단계 UI",
    "vibeTag": "여정을 따라 놓인 이정표",
    "vibeKeywords": [
      "수평 마일스톤 레일",
      "단계 레일",
      "마일스톤 단계"
    ],
    "promptSnippet": "지정 영역에 수평 마일스톤 레일 기법을 구현해 줘. 계획·제작·출시 세 버튼을 가로 배치하고 첫 단계를 선택해 줘. 클릭한 index 이전 원은 체크, 현재는 번호와 aria-current step, 뒤쪽은 옅은 면으로 표시해 줘. 연결선 너비를 선택 index에 맞춰 300ms 전환하고 아래에는 현재 단계 이름을 출력해 줘. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "static-month-calendar",
    "domain": "ui",
    "category": "layout",
    "titleKo": "월간 캘린더 그리드",
    "titleEn": "Static Month Calendar Grid",
    "summary": "이전·다음 달 자리와 선택일을 대비하는 7열 월간 배치",
    "vibeTag": "한 달을 펼친 격자",
    "vibeKeywords": [
      "월간 캘린더 그리드",
      "달력 배치",
      "월간 그리드"
    ],
    "promptSnippet": "지정 영역에 월간 캘린더 그리드 기법을 구현해 줘. 7열 5행 격자에서 앞의 두 칸을 비우고 1~30일을 채운 뒤 나머지를 비워 줘. 16일만 보라색으로 강조해 줘. 특정 실제 달과 연결하지 않은 샘플 달임을 표시하고 날짜 선택 동작은 넣지 않아. 자동 재생이나 입력 동작이 없는 정적 구성으로 만들어 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "pinned-panel-action-footer",
    "domain": "ui",
    "category": "layout",
    "titleKo": "패널 고정 작업 푸터",
    "titleEn": "Pinned Panel Action Footer",
    "summary": "목록만 스크롤되고 하단 작업 버튼은 항상 남는 패널",
    "vibeTag": "언제나 손닿는 행동",
    "vibeKeywords": [
      "패널 고정 작업 푸터",
      "고정 푸터",
      "패널 액션"
    ],
    "promptSnippet": "지정 영역에 패널 고정 작업 푸터 기법을 구현해 줘. 높이 145px flex column 패널에 flex 1·overflow-y auto의 항목 목록과 별도 하단 푸터를 둬. 목록에 8개 행을 넣고 overscroll contain으로 페이지와 분리해 줘. 푸터의 적용 버튼은 로컬 숫자를 1씩 올려 동작을 보여 줘. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "range-linked-rotary-dial",
    "domain": "ui",
    "category": "control",
    "titleKo": "범위 입력 연결 로터리 다이얼",
    "titleEn": "Range Linked Rotary Dial",
    "summary": "범위 슬라이더가 원형 노브의 표시선과 숫자를 함께 바꾸는 컨트롤",
    "vibeTag": "손끝으로 맞추는 각도",
    "vibeKeywords": [
      "범위 입력 연결 로터리 다이얼",
      "로터리 노브",
      "다이얼 입력"
    ],
    "promptSnippet": "지정 영역에 범위 입력 연결 로터리 다이얼 기법을 구현해 줘. 초기 값 35, 범위 0~100의 native range를 SVG 노브에 연결해 줘. 노브 중심은 140,80이고 표시선을 -135+value×2.7도로 회전해 줘. 바깥 270도 호와 안쪽 원·중앙 숫자를 분리하고 드래그 회전 자체는 구현하지 않아. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "sentiment-radio-segments",
    "domain": "ui",
    "category": "control",
    "titleKo": "감정 라디오 세그먼트",
    "titleEn": "Sentiment Radio Segments",
    "summary": "세 감정 중 한 가지만 선택하는 네이티브 라디오 묶음",
    "vibeTag": "세 칸에 담는 기분",
    "vibeKeywords": [
      "감정 라디오 세그먼트",
      "감정 선택",
      "라디오 세그먼트"
    ],
    "promptSnippet": "지정 영역에 감정 라디오 세그먼트 기법을 구현해 줘. 낮음·보통·높음의 라디오를 각각 기호·라벨과 함께 셀로 묶어 줘. 초기 보통을 선택하고 선택 셀만 보라색 배경과 흰 글자로 표시해 줘. 각 데모 인스턴스의 radio name을 고유하게 만들어 다른 카드 선택에 간섭하지 않게 해 줘. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "duration-preset-select",
    "domain": "ui",
    "category": "control",
    "titleKo": "시간 길이 프리셋 선택",
    "titleEn": "Duration Preset Select",
    "summary": "분 단위 프리셋을 선택하면 시·분 표시가 함께 갱신되는 입력",
    "vibeTag": "시간을 빠르게 고르기",
    "vibeKeywords": [
      "시간 길이 프리셋 선택",
      "지속시간",
      "시간 프리셋"
    ],
    "promptSnippet": "지정 영역에 시간 길이 프리셋 선택 기법을 구현해 줘. 초기 15분에서 5·15·30·60·90분의 native select를 제공해 줘. 선택 값은 숫자 분으로 저장하고 floor(minutes/60)와 minutes%60을 각각 두 자리로 표시해 줘. 실제 타이머나 카운트다운은 시작하지 않아. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "two-axis-coordinate-pad",
    "domain": "ui",
    "category": "control",
    "titleKo": "두 축 좌표 패드",
    "titleEn": "Two Axis Coordinate Pad",
    "summary": "패드 클릭이나 두 범위 입력으로 점의 가로·세로 위치를 조절",
    "vibeTag": "두 축으로 정하는 위치",
    "vibeKeywords": [
      "두 축 좌표 패드",
      "좌표 입력",
      "XY 패드"
    ],
    "promptSnippet": "지정 영역에 두 축 좌표 패드 기법을 구현해 줘. 초기 좌표 50,50의 점을 격자 패드 위에 놓아 줘. 패드 pointerdown 위치를 경계 사각형에 대한 백분율로 변환해 좌표를 정하고 두 native range로 가로·세로를 각각 0~100 조절하게 해 줘. 슬라이더 조작 시 다른 축은 보존해 줘. 연속 드래그 패드가 아닌 클릭 위치 선택이야. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "pointer-numeric-scrubber",
    "domain": "ui",
    "category": "control",
    "titleKo": "드래그 숫자 스크러버",
    "titleEn": "Pointer Numeric Scrubber",
    "summary": "숫자를 좌우로 끌거나 방향키로 값을 조절하는 입력",
    "vibeTag": "밀어서 조절하는 숫자",
    "vibeKeywords": [
      "드래그 숫자 스크러버",
      "숫자 드래그",
      "스크럽 입력"
    ],
    "promptSnippet": "지정 영역에 드래그 숫자 스크러버 기법을 구현해 줘. 초기 50의 숫자를 focus 가능한 role slider로 만들고 범위를 0~100으로 제한해 줘. pointerdown에서 시작 값과 x를 저장하고 pointer capture로 이동을 받아 2px당 1씩 증감해 줘. 종료·취소·capture 해제 시 드래그 상태를 지워 줘. 방향키는 1씩, Home/End는 경계로 이동하고 aria-valuenow를 갱신해 줘. 자동으로 입력 상태를 바꾸지 말고 사용자의 조작 결과를 유지해 줘. native 버튼과 입력은 키보드로도 조작할 수 있게 하며 모션 감소에서는 전환을 즉시 적용해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  }
];
