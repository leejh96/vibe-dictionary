import type { TechniqueItem } from '../techniques';

export const STYLE_COLLECTION_ADDITIONS: TechniqueItem[] = [
  {
    "id": "st-bauhaus-primary-composition",
    "domain": "style",
    "category": "modern",
    "titleKo": "바우하우스 원색 구성",
    "titleEn": "Bauhaus Primary Composition",
    "summary": "원·삼각형·직사각형과 원색을 대비하는 기하학 포스터",
    "vibeTag": "원색과 도형의 질서",
    "vibeKeywords": [
      "바우하우스 원색 구성",
      "바우하우스",
      "원색 기하학"
    ],
    "promptSnippet": "지정 영역에 바우하우스 원색 구성 기법을 구현해 줘. 크림 바탕에 붉은 세로 사각형, 노랑 큰 원, 파랑 삼각형을 겹쳐 줘. 아래쪽 검정 가로선 3개와 오른쪽 작은 검정 원으로 균형을 맞추고 SVG의 단색 면·명확한 겹침을 유지해 줘. 자동 재생이나 입력 동작이 없는 정적 구성으로 만들어 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "st-oversized-monochrome-type",
    "domain": "style",
    "category": "modern",
    "titleKo": "초대형 모노크롬 타이포",
    "titleEn": "Oversized Monochrome Typography",
    "summary": "큰 검정 단어와 작은 메타 문구로 강한 크기 대비를 만드는 편집 스타일",
    "vibeTag": "큰 글자가 만든 존재감",
    "vibeKeywords": [
      "초대형 모노크롬 타이포",
      "대형 타이포",
      "모노크롬 편집"
    ],
    "promptSnippet": "지정 영역에 초대형 모노크롬 타이포 기법을 구현해 줘. 회백색 면 위에 작은 상단 메타 줄·가느다란 구분선·75px FORM 단어·하단 캡션을 배치해 줘. 본문 단어는 font-weight 950, line-height .85, letter-spacing -.09em으로 응축하고 넘치는 부분은 패널 안에서 잘라 줘. 자동 재생이나 입력 동작이 없는 정적 구성으로 만들어 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "st-radial-gradient-editorial",
    "domain": "style",
    "category": "modern",
    "titleKo": "래디얼 그라데이션 에디토리얼",
    "titleEn": "Radial Gradient Editorial",
    "summary": "부드러운 컬러 번짐 위에 세리프 제목을 놓는 편집 스타일",
    "vibeTag": "은은하게 퍼지는 색의 중심",
    "vibeKeywords": [
      "래디얼 그라데이션 에디토리얼",
      "그라데이션 편집",
      "소프트 브랜딩"
    ],
    "promptSnippet": "지정 영역에 래디얼 그라데이션 에디토리얼 기법을 구현해 줘. 75% 45% 중심의 타원형 radial-gradient를 복숭아·연보라·하늘색·회백색 순으로 연결해 줘. 위에는 자간 3px의 작은 캡션, 가운데 italic 37px 세리프 제목, 아래에는 45px 가는 선을 놓아 줘. 자동 재생이나 입력 동작이 없는 정적 구성으로 만들어 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "st-monoline-icon-language",
    "domain": "style",
    "category": "modern",
    "titleKo": "모노라인 아이콘 언어",
    "titleEn": "Monoline Icon Language",
    "summary": "동일한 선 두께와 둥근 끝으로 서로 다른 아이콘을 통일",
    "vibeTag": "하나의 선으로 통일한 표정",
    "vibeKeywords": [
      "모노라인 아이콘 언어",
      "모노라인",
      "선 아이콘"
    ],
    "promptSnippet": "지정 영역에 모노라인 아이콘 언어 기법을 구현해 줘. 가방·집·확대경 기호를 SVG의 path·rect·circle로 그려 줘. 모든 선은 채움 없이 2.5px, round cap·round join의 보라색으로 통일하고 세 기호의 시각적 크기와 간격을 맞춰 줘. 자동 재생이나 입력 동작이 없는 정적 구성으로 만들어 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "st-grain-shaded-spheres",
    "domain": "style",
    "category": "modern",
    "titleKo": "그레인 음영 구체",
    "titleEn": "Grain Shaded Spheres",
    "summary": "그라데이션 구체 안에 노이즈를 제한해 인쇄 질감을 만드는 일러스트",
    "vibeTag": "거친 입자를 입힌 입체감",
    "vibeKeywords": [
      "그레인 음영 구체",
      "노이즈 구체",
      "그레인 음영"
    ],
    "promptSnippet": "지정 영역에 그레인 음영 구체 기법을 구현해 줘. 크림 바탕에 반지름 58·24의 구체를 놓고 radial-gradient로 노랑 하이라이트에서 분홍·보라 그림자까지 연결해 줘. seed 7, baseFrequency .65, numOctaves 2의 fractalNoise를 SourceGraphic 알파 안으로 제한하고 soft-light로 혼합해 줘. 필터·그라데이션 ID를 분리해 줘. 자동 재생이나 입력 동작이 없는 정적 구성으로 만들어 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "st-cork-granule-surface",
    "domain": "style",
    "category": "tactile",
    "titleKo": "코르크 입자 표면",
    "titleEn": "Cork Granule Surface",
    "summary": "불규칙한 갈색 조각의 반복으로 코르크 보드 질감을 표현",
    "vibeTag": "따뜻한 코르크 알갱이",
    "vibeKeywords": [
      "코르크 입자 표면",
      "코르크",
      "보드 질감"
    ],
    "promptSnippet": "지정 영역에 코르크 입자 표면 기법을 구현해 줘. 50×40 SVG 패턴 안에 크기·회전이 다른 작은 타원 13개를 결정적으로 배치해 줘. 밝고 어두운 갈색 3색을 순환하고 전체를 코르크 바탕으로 채워 줘. 위에 -7도 기울인 크림 메모지와 붉은 압정을 올려 촉각적 맥락을 더해 줘. 자동 재생이나 입력 동작이 없는 정적 구성으로 만들어 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "st-denim-double-stitch",
    "domain": "style",
    "category": "tactile",
    "titleKo": "데님 이중 스티치",
    "titleEn": "Denim Double Stitch",
    "summary": "사선 직조 바탕과 두 줄 봉제선으로 청바지 주머니를 표현",
    "vibeTag": "두 줄의 실밥과 청색 직물",
    "vibeKeywords": [
      "데님 이중 스티치",
      "데님",
      "봉제선"
    ],
    "promptSnippet": "지정 영역에 데님 이중 스티치 기법을 구현해 줘. 6×6 반복 패턴의 청색 사선으로 데님 조직을 만들고 위에 오각형 주머니를 겹쳐 줘. 안쪽 경계를 따라 베이지 점선 두 줄을 넣고 상단 양쪽에 작은 금속색 리벳을 배치해 줘. 모두 SVG 패턴과 경로로 표현해 줘. 자동 재생이나 입력 동작이 없는 정적 구성으로 만들어 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "st-velvet-directional-sheen",
    "domain": "style",
    "category": "tactile",
    "titleKo": "벨벳 방향성 광택",
    "titleEn": "Directional Velvet Sheen",
    "summary": "빛의 방향에 따라 밝은 띠가 이동하는 짙은 벨벳 표면",
    "vibeTag": "방향에 따라 흐르는 광택",
    "vibeKeywords": [
      "벨벳 방향성 광택",
      "벨벳",
      "방향성 광택"
    ],
    "promptSnippet": "지정 영역에 벨벳 방향성 광택 기법을 구현해 줘. 짙은 자주 바탕의 둥근 패널에 어두움·자주·밝은 분홍·자주·어두움의 linear-gradient를 넣어 줘. 그라데이션 각도를 65+55p도로 왕복하고 안쪽 어두운 그림자와 반투명 세리프 라벨을 유지해 줘. 실제 섬유 이방성 렌더링이 아닌 CSS 색 띠 모사야. 진행값 p는 초기 0에서 4초에 1, 8초에 0으로 돌아오는 선형 왕복 시연으로 반복해 줘. 별도 슬라이더 없이 자동 시연하며 클릭하면 기존 시계를 초기화해 처음부터 재시작해 줘. 화면 밖·숨겨진 탭에서는 시계를 멈추고 모션 감소 환경에서는 p=0의 정지 장면을 유지해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "st-rubber-dot-grip",
    "domain": "style",
    "category": "tactile",
    "titleKo": "러버 도트 그립",
    "titleEn": "Rubber Dot Grip",
    "summary": "작은 볼록 돌기가 반복되는 어두운 고무 그립 표면",
    "vibeTag": "손에 잡히는 작은 돌기",
    "vibeKeywords": [
      "러버 도트 그립",
      "고무 돌기",
      "그립 표면"
    ],
    "promptSnippet": "지정 영역에 러버 도트 그립 기법을 구현해 줘. 20×20 SVG 타일에 어두운 바닥 원과 위쪽으로 2px 이동한 반지름 6 하이라이트 원을 겹쳐 줘. 위 원은 밝은 좌상단에서 어두운 테두리로 변하는 radial-gradient를 사용해 줘. 240×144 둥근 패널을 이 타일로 채워 볼록 돌기를 표현해 줘. 자동 재생이나 입력 동작이 없는 정적 구성으로 만들어 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "st-embossed-paper-seal",
    "domain": "style",
    "category": "tactile",
    "titleKo": "엠보싱 종이 씰",
    "titleEn": "Embossed Paper Seal",
    "summary": "같은 종이색의 원형 문양을 밝고 어두운 그림자로 솟아 보이게 표현",
    "vibeTag": "종이에 눌러 새긴 인장",
    "vibeKeywords": [
      "엠보싱 종이 씰",
      "종이 엠보싱",
      "블라인드 씰"
    ],
    "promptSnippet": "지정 영역에 엠보싱 종이 씰 기법을 구현해 줘. 베이지 종이 위 지름 128 원형 테두리를 놓고 우하단 어두운 그림자·좌상단 밝은 그림자와 반대 방향 inset 그림자를 함께 써 줘. 중앙 V 글자에도 밝고 어두운 text-shadow를 적용해 잉크 없이 눌러 찍은 인상을 만들어 줘. 자동 재생이나 입력 동작이 없는 정적 구성으로 만들어 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "st-letterpress-ink-imprint",
    "domain": "style",
    "category": "retro",
    "titleKo": "레터프레스 잉크 인상",
    "titleEn": "Letterpress Ink Imprint",
    "summary": "종이에 눌러 찍힌 듯한 잉크 글자와 활판 인쇄 위계",
    "vibeTag": "눌러 찍은 잉크의 깊이",
    "vibeKeywords": [
      "레터프레스 잉크 인상",
      "활판 인쇄",
      "레터프레스"
    ],
    "promptSnippet": "지정 영역에 레터프레스 잉크 인상 기법을 구현해 줘. 따뜻한 종이색 면에 작은 인쇄소 캡션·굵은 48px PRESS·하단 선과 문구를 중앙 정렬해 줘. 큰 글자는 붉은 갈색 잉크색이고 아래 밝은 그림자·위 어두운 그림자를 넣어 눌린 가장자리를 모사해 줘. 자동 재생이나 입력 동작이 없는 정적 구성으로 만들어 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "st-newspaper-column-layout",
    "domain": "style",
    "category": "retro",
    "titleKo": "신문 다단 편집",
    "titleEn": "Newspaper Column Layout",
    "summary": "굵은 제호 아래 좁은 본문 단을 배치한 신문 스타일",
    "vibeTag": "촘촘한 활자의 지면",
    "vibeKeywords": [
      "신문 다단 편집",
      "신문 스타일",
      "다단 본문"
    ],
    "promptSnippet": "지정 영역에 신문 다단 편집 기법을 구현해 줘. 회백색 종이 위 29px 세리프 제호와 이중 구분선을 놓아 줘. 본문은 column-count 3·column-gap 10px·가는 column-rule을 적용하고 10px 세리프 글자를 justify 정렬해 줘. 한영 샘플 기사 문장은 사전 키로 관리해 줘. 자동 재생이나 입력 동작이 없는 정적 구성으로 만들어 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "st-midcentury-atomic-starburst",
    "domain": "style",
    "category": "retro",
    "titleKo": "미드센추리 아토믹 문양",
    "titleEn": "Midcentury Atomic Starburst",
    "summary": "가느다란 방사선과 끝의 원으로 원자 시대 장식 문양을 표현",
    "vibeTag": "별 모양으로 튀는 복고",
    "vibeKeywords": [
      "미드센추리 아토믹 문양",
      "아토믹 디자인",
      "미드센추리"
    ],
    "promptSnippet": "지정 영역에 미드센추리 아토믹 문양 기법을 구현해 줘. 연회녹색 바탕에 중심 140,80에서 10개의 가는 방사선을 그려 줘. 길이는 50·60·70을 순환하고 끝의 원은 청록·주황으로 교차해 줘. 중앙에는 -25도 기울인 노랑 타원을 올려 비대칭 장식감을 만들어 줘. 자동 재생이나 입력 동작이 없는 정적 구성으로 만들어 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "st-dot-matrix-tractor-paper",
    "domain": "style",
    "category": "retro",
    "titleKo": "도트매트릭스 연속 용지",
    "titleEn": "Dot Matrix Tractor Paper",
    "summary": "양쪽 급지 구멍과 점으로 채운 글자가 있는 프린터 출력 스타일",
    "vibeTag": "점으로 찍힌 인쇄의 기억",
    "vibeKeywords": [
      "도트매트릭스 연속 용지",
      "도트 프린터",
      "연속 용지"
    ],
    "promptSnippet": "지정 영역에 도트매트릭스 연속 용지 기법을 구현해 줘. 크림색 용지 양쪽에 급지 구멍 7개씩과 세로 점선 절취선을 배치해 줘. 중앙 PRINT 글자를 52px 굵은 monospace로 쓰되 4×4 타일의 작은 원 pattern으로 채워 도트 출력을 표현해 줘. 자동 재생이나 입력 동작이 없는 정적 구성으로 만들어 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "st-perforated-postage-stamp",
    "domain": "style",
    "category": "retro",
    "titleKo": "천공 우표와 소인",
    "titleEn": "Perforated Postage Stamp",
    "summary": "톱니 가장자리의 풍경 우표에 원형 소인이 겹친 레트로 구성",
    "vibeTag": "우표 가장자리의 작은 구멍",
    "vibeKeywords": [
      "천공 우표와 소인",
      "우표",
      "소인"
    ],
    "promptSnippet": "지정 영역에 천공 우표와 소인 기법을 구현해 줘. 154×144 크림 우표를 -7도 기울이고 네 변의 작은 원형 컷아웃으로 천공 가장자리를 만들어 줘. 안에는 청록 풍경·태양·액면 숫자를 넣고 오른쪽 위에 반투명 원 두 개와 평행선 소인을 15도 기울여 겹쳐 줘. 자동 재생이나 입력 동작이 없는 정적 구성으로 만들어 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "st-oscilloscope-phosphor-trace",
    "domain": "style",
    "category": "scifi",
    "titleKo": "오실로스코프 형광 궤적",
    "titleEn": "Oscilloscope Phosphor Trace",
    "summary": "격자 위 녹색 신호선을 여러 두께로 겹쳐 형광 발광을 표현",
    "vibeTag": "잔광으로 이어지는 파형",
    "vibeKeywords": [
      "오실로스코프 형광 궤적",
      "오실로스코프",
      "형광 신호"
    ],
    "promptSnippet": "지정 영역에 오실로스코프 형광 궤적 기법을 구현해 줘. 20px 격자 위 160점의 파형을 x=10+1.65i, y=80+32sin(.12i+6p)+10sin(.31i-4p)로 그려 줘. 같은 경로를 넓고 옅은 7px 선과 밝은 1.5px 선으로 겹쳐 발광처럼 보여 줘. 실제 전기 신호나 오디오 입력은 없어. 진행값 p는 초기 0에서 4초에 1, 8초에 0으로 돌아오는 선형 왕복 시연으로 반복해 줘. 별도 슬라이더 없이 자동 시연하며 클릭하면 기존 시계를 초기화해 처음부터 재시작해 줘. 화면 밖·숨겨진 탭에서는 시계를 멈추고 모션 감소 환경에서는 p=0의 정지 장면을 유지해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "st-wireframe-sphere-grid",
    "domain": "style",
    "category": "scifi",
    "titleKo": "와이어프레임 구 격자",
    "titleEn": "Wireframe Sphere Grid",
    "summary": "타원 경선과 위선으로 회전하는 구의 윤곽을 모사",
    "vibeTag": "선만으로 드러나는 구체",
    "vibeKeywords": [
      "와이어프레임 구 격자",
      "와이어 구체",
      "구 격자"
    ],
    "promptSnippet": "지정 영역에 와이어프레임 구 격자 기법을 구현해 줘. 반지름 66의 원 안에 rx=abs(cos(iπ/7+pπ))×66, ry=66인 경선 타원 7개를 겹쳐 줘. 위선 5개는 구 단면 너비로 줄여 배치하고 전체를 30p도 기울여 줘. 뒷면 은선 제거 없는 2D 와이어 구체 시연이야. 진행값 p는 초기 0에서 4초에 1, 8초에 0으로 돌아오는 선형 왕복 시연으로 반복해 줘. 별도 슬라이더 없이 자동 시연하며 클릭하면 기존 시계를 초기화해 처음부터 재시작해 줘. 화면 밖·숨겨진 탭에서는 시계를 멈추고 모션 감소 환경에서는 p=0의 정지 장면을 유지해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "st-fingerprint-scan-interface",
    "domain": "style",
    "category": "scifi",
    "titleKo": "지문 스캔 인터페이스",
    "titleEn": "Fingerprint Scan Interface",
    "summary": "가상의 지문 곡선 위로 밝은 스캔선이 지나가는 인터페이스",
    "vibeTag": "빛이 훑고 지나는 지문",
    "vibeKeywords": [
      "지문 스캔 인터페이스",
      "지문 스캔",
      "바이오메트릭 UI"
    ],
    "promptSnippet": "지정 영역에 지문 스캔 인터페이스 기법을 구현해 줘. 서로 안쪽으로 들어오는 베지어 곡선 12개를 둥근 clipPath 안에 그려 지문 같은 문양을 만들어 줘. y=15+125p의 라임 스캔선과 그 위 옅은 띠를 이동하고 네 모서리에 프레임을 놓아 줘. 실제 지문 수집·인식·인증 기능은 없는 가상 패턴이야. 진행값 p는 초기 0에서 4초에 1, 8초에 0으로 돌아오는 선형 왕복 시연으로 반복해 줘. 별도 슬라이더 없이 자동 시연하며 클릭하면 기존 시계를 초기화해 처음부터 재시작해 줘. 화면 밖·숨겨진 탭에서는 시계를 멈추고 모션 감소 환경에서는 p=0의 정지 장면을 유지해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "st-constellation-star-atlas",
    "domain": "style",
    "category": "scifi",
    "titleKo": "별자리 아틀라스",
    "titleEn": "Constellation Star Atlas",
    "summary": "좌표 격자와 가상의 별 연결선을 겹친 기술 도면형 별지도",
    "vibeTag": "별 사이를 잇는 지도",
    "vibeKeywords": [
      "별자리 아틀라스",
      "별지도",
      "별자리 도면"
    ],
    "promptSnippet": "지정 영역에 별자리 아틀라스 기법을 구현해 줘. 28px 격자와 큰 타원 경계 위에 고정된 별 7개를 연결해 줘. 별은 크기가 다른 연노랑 원과 옅은 외곽 링으로 그리고 연결선은 가는 청회색으로 표시해 줘. 샘플 별지도 캡션을 넣고 실제 별자리나 천문 좌표라고 주장하지 않아. 자동 재생이나 입력 동작이 없는 정적 구성으로 만들어 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  },
  {
    "id": "st-hex-status-lattice",
    "domain": "style",
    "category": "scifi",
    "titleKo": "육각 상태 격자",
    "titleEn": "Hex Status Lattice",
    "summary": "육각 셀을 차례로 강조해 스캔하는 듯한 기술 인터페이스",
    "vibeTag": "육각형에 담은 상태 신호",
    "vibeKeywords": [
      "육각 상태 격자",
      "육각 HUD",
      "상태 격자"
    ],
    "promptSnippet": "지정 영역에 육각 상태 격자 기법을 구현해 줘. 5열 3행의 육각 셀을 홀수 행에서 22px 어긋나게 배치해 줘. 반지름은 24이며 active=min(14,floor(15p)) 셀만 밝은 라임 윤곽·중앙점·청록 채움을 적용해 줘. 실제 센서 데이터 없이 순서대로 훑는 장식 인터페이스야. 진행값 p는 초기 0에서 4초에 1, 8초에 0으로 돌아오는 선형 왕복 시연으로 반복해 줘. 별도 슬라이더 없이 자동 시연하며 클릭하면 기존 시계를 초기화해 처음부터 재시작해 줘. 화면 밖·숨겨진 탭에서는 시계를 멈추고 모션 감소 환경에서는 p=0의 정지 장면을 유지해 줘. 최대 300px 반응형 영역 안에 구성하고 접근성 이름, 한국어·영어 문구, 라이트·다크 테마를 지원해 줘. 외부 이미지·서버·실제 데이터 연동 없이 로컬 SVG·CSS·상태로 표현하는 데모야."
  }
];
