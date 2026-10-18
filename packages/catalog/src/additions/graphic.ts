import type { TechniqueItem } from '../techniques';

export const GRAPHIC_ADDITIONS: TechniqueItem[] = [
  {
    id: 'mg-intersection-clip', domain: 'motion', category: 'graphic',
    titleKo: '교집합 클리핑', titleEn: 'SVG Intersection Clipping',
    vibeTag: '겹치는 면만 선명하게 남기는', vibeKeywords: ['교집합 클리핑', '겹침 영역', 'SVG 클립 패스'],
    summary: '두 원의 공통 영역만 채우고 실제 겹침 입력으로 렌즈 모양을 조절',
    promptSnippet: '지정한 영역에 두 원의 교집합만 채우는 SVG 클리핑을 만들어 줘. 최대 폭240px·비율 유지 viewBox 0 0 240 112의 SVG와 아래8px 간격의 네이티브 range 한 행을 세로로 배치하고 상단 도구 여백44px을 유지해 줘. 고정 원은 중심(96,56)·반지름36, 이동 원은 중심(cx,56)·반지름36이며 cx=168-겹침값*.48로 계산해 줘. 겹침 상태는 초기50·범위0~100·step1의 하나만 두고 입력 이름 두 원 겹침·보이는 label 겹침으로 제공해 줘. defs에 useId로 인스턴스별 고유 clipPath를 만들고 clipPathUnits userSpaceOnUse를 명시하며 이동 원 하나를 넣어 줘. 보조색으로 채운 고정 원에 해당 로컬 clipPath URL을 적용해 두 원 내부에 동시에 속한 영역만 실제로 남겨 줘. 두 원의 fill none·강조색1.5px 외곽선을 뒤에 그려 전체 형태를 유지해 줘. 겹침값0에서는 중심거리72로 맞닿아 채워진 면적이0이고, 값100에서는 중심거리24의 넓은 렌즈가 돼. 같은 입력을 유지하며 드래그·방향키·Home/End에 즉시 반응하고 별도 자동 이동·전환 애니메이션은 추가하지 않아. 기존 그래픽의240px 캔버스·테마 변수·44px range 높이·32px label 열·8px 간격·포커스 윤곽을 재사용해 줘. 라이트는 짙은 인디고 외곽·시안 블루 교집합, 다크는 밝은 인디고 외곽·밝은 시안 교집합과 native color-scheme dark를 사용해 줘. SVG에는 role img와 두 원의 겹치는 부분만 채워지는 교집합이라는 이름을 제공해 줘. 실제 클리핑 경계·로컬 ID 격리·양끝 입력·좁은 폭 비례 축소·상단 도구 여백·양테마 대비를 확인해 줘. 배경색으로 덮는 가짜 교집합·SVG 경로 연산/파일 내보내기·추가 설명/제목/좌표/수치/실행 횟수·중복 상태·타이머·외부 도형 라이브러리는 넣지 말아 줘.',
  },
  {
    id: 'mg-quadratic-bezier-editor', domain: 'motion', category: 'graphic',
    titleKo: '베지어 제어점 편집', titleEn: 'Quadratic Bezier Control Point Editor',
    vibeTag: '점을 옮기면 곡선이 손끝을 따라 바뀌는', vibeKeywords: ['베지어 제어점', '곡선 편집', '패스 핸들 드래그'],
    summary: '하나의 제어점을 드래그하거나 두 범위 입력으로 조절해 실제 SVG 곡선을 편집',
    promptSnippet: '지정한 영역에 이차 베지어 제어점 편집 데모를 만들어 줘. 최대 폭240px·비율240/112의 상대 위치 프레임과 같은 viewBox의 SVG를 사용하고 시작점(24,88)·끝점(216,24)을 고정해 줘. 초기 제어점은(120,24)이며 하나의 x/y 상태를 SVG Q 경로·점선 가이드·HTML 핸들 위치·두 네이티브 range 입력에서 공유해 줘. 곡선 d는 M24 88 Q{x} {y} 216 24, 가이드는 M24 88 {x} {y} 216 24이며 각각3px 강조색 round cap 선과1.5px 중립색 dash3 4로 그려 줘. 두 끝점에는 반지름3의 강조색 점을 놓아 줘. 제어점에는 프레임 기준left=x/240·top=y/112의44×44px HTML 드래그 영역을 중앙 정렬하고 시각 원은12px·2px 강조색 테두리·테마 표면으로 표현해 줘. 핸들만 touch-action none·user-select none·grab/grabbing 커서를 사용하고 장식/포인터 대체 조작이므로 aria-hidden으로 숨겨 줘. 기본 버튼의 주 포인터만 capture하며 누른 지점과 원 중심의 SVG 좌표 차이를 저장해 잡는 순간 위치가 튀지 않게 해 줘. 매 이동에서 현재 프레임 client rect로 실제 포인터를 SVG 좌표로 환산하고 반올림·x24~216/y22~90 제한을 적용해 줘. 다른 포인터는 무시하고 정상 해제에서는 마지막 위치를 반영한 뒤 capture를 끝내며, pointercancel/capture 유실에서는 마지막 표시 위치를 유지하고 드래그 참조만 정리해 줘. 전역 리스너는 쓰지 않아. 프레임 아래8px 간격으로 가로/세로 label과44px 높이 네이티브 range 두 행을 배치해 줘. 입력 이름은 제어점 가로/제어점 세로, 범위는 각각24~216/22~90, step1이며 드래그 결과와 양방향 동기화하고 네이티브 방향키·Home/End로 같은 점을 편집하게 해 줘. 라이트는 짙은 인디고 곡선/핸들/입력 강조·흰 핸들 표면, 다크는 밝은 인디고 강조·슬레이트 표면과 native color-scheme dark를 적용해 줘. SVG는 role img와 제어점의 위치에 따라 바뀌는 이차 베지어 곡선이라는 이름을 제공해 줘. 좁은 화면에서 좌표 비례 환산·44px 실제 핸들·범위 입력·상단 도구 여백·양테마 대비를 확인해 줘. 조작 label 외 제목·안내·좌표 수치·실행 횟수·다중 제어점·경로 저장·자동 이동·애니메이션·타이머·외부 편집 라이브러리는 추가하지 말아 줘.',
  },
  {
    id: 'mg-fixed-stroke-zoom', domain: 'motion', category: 'graphic',
    titleKo: '선 두께 유지 벡터 확대', titleEn: 'Non-Scaling Stroke Zoom',
    vibeTag: '확대해도 선은 섬세하게 유지되는', vibeKeywords: ['고정 두께 선', '벡터 확대', '논 스케일링 스트로크'],
    summary: '도형의 크기만 두 배로 바꾸고 외곽선은 같은 화면 두께로 유지',
    promptSnippet: '지정한 영역에 선 두께를 유지하며 확대하는 SVG 도형을 만들어 줘. 최대 폭240px·비율 유지 viewBox 0 0 240 112의 SVG와 그 아래44px 높이·112px 폭·최대 폭100%의 실제 확대 버튼을 세로로 놓고 간격8px·상단 도구 여백44px을 유지해 줘. 입체 도형의 윗면 path는 M120 36 140 46 120 56 100 46Z, 외곽과 내부 선의 path는 M120 36 140 46V66L120 76 100 66V46Z M100 46 120 56 140 46 M120 56V76을 사용해 줘. 윗면은 보조색·fill-opacity .25, 선은 fill none·강조색·두께2·round cap/join으로 지정하고 선 path 자체에 vector-effect non-scaling-stroke를 적용해 줘. 두 path를 같은 g에 두고 translate(120 56) scale(1 또는 2) translate(-120 -56)로 도형 중심을 고정한 채 크기만 즉시 바꿔 줘. 초기 기본 크기이며 버튼 클릭·Enter·Space마다 기본/두 배를 왕복해 줘. 실제 화면 선 두께는 그룹 확대와 좁은 SVG 비례 축소 모두에서2px을 유지해야 해. 같은 button DOM을 유지하고 기본에서는 ZoomIn18px SVG와 확대, 확대 상태에서는 ZoomOut18px SVG와 원래 크기를 표시해 줘. 버튼은 가운데 정렬·8px 아이콘 간격·테마 표면 배경·강조색 테두리/글자·키보드 포커스 윤곽을 사용해 줘. SVG에 useId로 고유 ID를 주고 버튼 aria-controls로 연결하며 role img의 이름에는 기본/두 배 크기를 반영해 줘. 아이콘은 aria-hidden으로 중복 발표를 막아 줘. 라이트는 짙은 인디고 선/글자와 시안 블루 윗면·흰 버튼 표면, 다크는 밝은 인디고 선/글자와 밝은 시안 윗면·슬레이트 버튼 표면을 사용해 줘. 기존 캔버스·테마 변수를 재사용하며 두 배 상태에서도 도형 경계와 중앙 정렬·버튼 포커스·44px 조작 높이·상단 도구 간섭을 확인해 줘. 확대 상태 하나 외 중복 상태·임의 줌 배율·드래그/휠 줌·애니메이션·타이머·프레임 루프·외부 그래픽 라이브러리·추가 제목·설명·실행 횟수는 넣지 말아 줘.',
  },
  {
    id: 'mg-hatched-pattern-fill', domain: 'motion', category: 'graphic',
    titleKo: 'SVG 해칭 패턴 채움', titleEn: 'SVG Hatched Pattern Fill',
    vibeTag: '도형 안에 정돈된 사선 질감을 채우는', vibeKeywords: ['해칭 패턴', 'SVG 타일 채움', '도형 사선 질감'],
    summary: '하나의 사선 타일을 반복해 서로 다른 도형의 내부를 같은 간격으로 채움',
    promptSnippet: '지정한 영역에 최대 폭 240px·비율 유지 SVG viewBox 0 0 240 112의 해칭 패턴 채움을 만들어 줘. 원은 중심(60,56)·반지름36, 둥근 사각형은 x112·y20·너비104·높이72·rx18로 배치해 같은 높이와 16px 간격을 유지해 줘. defs에 useId로 인스턴스별 고유 pattern을 하나만 정의하고 두 도형을 묶은 g의 fill이 같은 로컬 URL을 참조하게 해 줘. pattern 너비/높이는 8이며 patternUnits와 patternContentUnits 모두 userSpaceOnUse로 명시해 도형 크기와 관계없이 같은 좌표계·간격을 유지해 줘. 타일 안에는 8×8의 테마 표면 rect와 fill none·보조색 stroke·두께1.5의 단일 path M-2 2 2-2 M0 8 8 0 M6 10 10 6을 넣어 줘. 타일 경계 양끝의 짧은 선도 함께 반복해 사선이 모서리에서 끊기지 않게 하고 사선 자체에 별도 닫힘 선을 만들지 않아. 도형 그룹의 외곽은 강조색·두께2이며 패턴은 실제 원과 사각형 내부에서만 보이게 해 줘. 라이트는 흰 타일 바탕·시안 블루 사선·짙은 인디고 외곽, 다크는 슬레이트 바탕·밝은 시안 사선·밝은 인디고 외곽을 사용해 줘. 기존 SVG 캔버스와 테마 변수를 재사용하고 좁은 화면에서는 타일 간격·도형·외곽선을 함께 비례 축소해 줘. role img와 같은 간격의 사선 패턴으로 채운 원과 둥근 사각형이라는 접근 가능한 이름을 제공해 줘. 타일 이음새·인스턴스 ID 격리·도형 경계·중앙 정렬·양테마 대비·상단 도구 여백을 확인해 줘. 전경 사선 수십 개 복제·배경 전체 패턴·애니메이션·상태·이벤트·타이머·외부 이미지·패턴 라이브러리·조작 버튼·제목·설명·수치·실행 횟수는 추가하지 말아 줘.',
  },
  {
    id: 'mg-marching-ants-outline', domain: 'motion', category: 'graphic',
    titleKo: '마칭 앤츠 선택 윤곽', titleEn: 'Marching Ants Selection Outline',
    vibeTag: '선택 영역의 점선이 끊김 없이 흐르는', vibeKeywords: ['마칭 앤츠', '흐르는 선택 점선', '선택 영역 윤곽'],
    summary: '완성된 점선 윤곽을 유지하며 대시의 위상만 연속 이동',
    promptSnippet: '지정한 영역에 최대 폭 240px·비율 유지 SVG viewBox 0 0 240 112의 마칭 앤츠 선택 윤곽을 만들어 줘. 안쪽 예시 도형은 중심(104,56)·반지름22의 보조색 원·opacity .55와 x116·y37·너비38·높이38·rx8·rotate(15 135 56)의 강조색 사각형·opacity .8을 순서대로 그려 겹쳐 줘. 그 뒤에 x36·y14·너비168·높이84·rx12·fill none의 선택 윤곽 rect를 놓아 줘. 윤곽은 강조색 stroke·두께2·stroke-dasharray 4 4이며 전체 경계는 처음부터 완성된 상태야. 기본 stroke-dashoffset 0에서 -8까지 .8초 linear infinite로 움직여 대시+공백의 정확히 한 주기만 이동하고 반복 경계에서도 모양이 튀지 않게 해 줘. 선을 숨겼다가 그리는 path drawing이나 완료율 표시로 대체하지 않아. prefers-reduced-motion reduce에서는 애니메이션을 없애 기본 offset0의 정지 점선을 유지해 줘. 라이트는 짙은 인디고 윤곽/사각형과 시안 블루 원, 다크는 밝은 인디고 윤곽/사각형과 밝은 시안 원을 사용해 줘. 기존 SVG 캔버스 크기·테마 변수·공통 모션 감소 선언을 재사용하고 좁은 화면에서는 점선 간격·윤곽·도형을 같은 SVG 좌표계에서 함께 비례 축소해 줘. role img와 두 도형 주위를 따라 점선이 흐르는 선택 윤곽이라는 접근 가능한 이름을 제공해 줘. 점선 경계·내부 도형 여백·상단 도구 비중첩·양테마 대비를 확인하고 실제 선택·이동·리사이즈 핸들·조작 버튼·글자·제목·설명·수치·완료 상태·실행 횟수·이벤트·타이머·프레임 루프는 추가하지 말아 줘.',
  },
  {
    id: 'mg-radial-rosette-repetition', domain: 'motion', category: 'graphic',
    titleKo: '방사형 로제트 반복', titleEn: 'Radial Rosette Repetition',
    vibeTag: '하나의 꽃잎이 겹쳐 정교한 문양으로', vibeKeywords: ['로제트 패턴', '방사형 반복', 'SVG 도형 재사용'],
    summary: '꽃잎 경로 하나를 회전 복제해 겹침과 열두 겹 대칭을 표현',
    promptSnippet: '지정한 영역 중앙에 최대 폭 240px·비율 유지 SVG viewBox 0 0 240 112의 방사형 로제트를 만들어 줘. defs에 useId로 인스턴스별 고유 path를 하나만 정의하고 d는 M0-4 C-18-10-16-44 0-48 C16-44 18-10 0-4Z의 꽃잎으로 사용해 줘. 이 경로 자체에는 고정 fill/stroke를 지정하지 않아 use가 상속하는 테마 스타일을 가리지 않게 해 줘. translate(120 56) 그룹 안에서 use 12개가 같은 로컬 href를 참조하고 index 0~11의 rotate(index*30)로 0~330도를 순서대로 배치해 줘. 경로 데이터 12벌을 복사하거나 원형 궤도·행성·그리드 배치로 대체하지 말아 줘. 그룹 채움은 보조색·fill-opacity .28, 윤곽은 강조색·stroke-width 1.2·round join으로 지정해 투명 면의 실제 겹침을 보여 줘. 그룹 뒤에는 중심(120,56)·반지름5의 강조색 원을 그려 꽃잎의 안쪽 끝을 정돈해 줘. 라이트는 짙은 인디고 윤곽과 짙은 시안 블루 반투명 면, 다크는 밝은 인디고 윤곽과 밝은 시안 반투명 면을 사용해 줘. 기존 SVG 캔버스 크기·강조색 채움·테마 변수를 재사용하고 좁은 화면에서는 전체 좌표·윤곽·꽃잎을 함께 비례 축소해 줘. SVG에는 role img와 하나의 꽃잎을 30도씩 반복한 열두 겹 방사형 문양이라는 접근 가능한 이름을 제공해 줘. 인스턴스 간 ID와 href 격리·중앙 정렬·외곽 선의 경계·양테마 겹침 대비·상단 도구 여백을 확인해 줘. 별도 제목·설명·실행 횟수·수치·조작 버튼·자동 회전·펄스·상태·이벤트·타이머·프레임 루프·외부 패턴 라이브러리는 추가하지 말아 줘.',
  },
  {
    id: 'mg-directed-connector-markers', domain: 'motion', category: 'graphic',
    titleKo: 'SVG 분기 화살표 연결선', titleEn: 'SVG Directed Connector Markers',
    vibeTag: '연결선의 끝 방향을 정확히 가리키는', vibeKeywords: ['화살표 연결선', 'SVG 마커', '노드 분기 다이어그램'],
    summary: '하나의 화살표 정의를 재사용하며 곡선의 접선 방향에 자동 정렬',
    promptSnippet: '지정한 영역에 최대 폭 240px·비율 유지 SVG viewBox 0 0 240 112의 노드 분기 연결선을 만들어 줘. 시작 노드는 중심(40,56)·반지름12의 강조색 원, 두 도착 노드는 (200,18)/(200,94)·반지름12·테마 표면 채움·2px 보조색 테두리 원으로 놓아 줘. 두 연결선은 M52 56 Q110 56 186 24와 M52 56 Q110 56 186 88이며 fill none·2px 강조 선·round cap을 사용해 줘. defs에 useId로 인스턴스별 고유 marker를 하나만 만들고 두 path의 marker-end가 같은 로컬 URL을 참조하게 해 줘. marker는 viewBox 0 0 10 10·refX10·refY5·markerWidth10·markerHeight10·markerUnits userSpaceOnUse·orient auto이며 강조색 M0 0 10 5 0 10 3 5Z 화살표를 포함해 줘. 따라서 화살표 끝은 각 곡선 종점에 맞고 위/아래 분기의 마지막 접선 방향을 자동으로 향하며 선 두께를 기준으로 화살표 크기가 중복 확대되지 않아. 연결선을 먼저 그리고 노드를 뒤에 그려 시작점이 노드 뒤로 이어지게 해 줘. 라이트는 짙은 인디고 연결선·시안 블루 도착 테두리·흰 노드 표면, 다크는 밝은 인디고 선·밝은 시안 테두리·슬레이트 표면을 사용해 줘. 기존 SVG 캔버스 크기와 테마 CSS 변수를 재사용하고 좁은 화면에서는 노드·곡선·marker를 함께 비례 축소해 줘. role img와 한 노드에서 두 노드로 분기하는 곡선 화살표라는 접근 가능한 이름을 제공해 줘. 화살표·원·상단 도구 경계를 확인하고 별도 글자·제목·설명·실행 횟수·노드 선택·드래그·애니메이션·타이머·이벤트·전역 ID·그래프 라이브러리는 추가하지 말아 줘.',
  },
  {
    id: 'mg-luminance-cutout-mask', domain: 'motion', category: 'graphic',
    titleKo: 'SVG 컷아웃 마스크', titleEn: 'SVG Luminance Cutout Mask',
    vibeTag: '도형 안의 구멍으로 배경을 드러내는', vibeKeywords: ['SVG 마스크', '구멍 뚫린 도형', '밝기 마스킹'],
    summary: '움직이는 검은 마스크로 도형 일부를 실제 투명하게 제거',
    promptSnippet: '지정한 영역에 최대 폭 240px·비율 유지 SVG viewBox 0 0 240 112의 컷아웃 마스크 그래픽을 만들어 줘. defs 안에 인스턴스별 고유 접두 ID의 linearGradient와 mask를 두고 다른 인스턴스의 참조와 섞이지 않게 해 줘. 그라데이션은 (0%,0%)→(100%,100%)이며 라이트에서는 짙은 인디고→짙은 시안 블루, 다크에서는 밝은 인디고→밝은 시안을 사용해 줘. 도형은 x40·y14·너비160·높이84·rx20의 둥근 사각형 하나이며 fill은 해당 그라데이션 URL, mask는 같은 인스턴스 마스크 URL로 연결해 줘. maskUnits와 maskContentUnits는 userSpaceOnUse, 마스크 x/y0·너비240·높이112, mask-type luminance를 명시해 줘. 마스크 바탕은 전체240×112의 불투명 흰 사각형, 뚫을 부분은 중심(120,56)·반지름28의 불투명 검은 원이야. 검은 원은 기본 transform translateX(-38px)에서 translateX(38px)까지 4초 ease-in-out infinite alternate로 움직여 8초에 한 번 왕복하고 밝기0 영역으로 실제 도형을 지워 뒤의 배경이 그대로 보이게 해 줘. 배경색 원을 위에 덮거나 검은색 구멍을 실제 전경에 그리는 방식으로 대체하지 말아 줘. prefers-reduced-motion reduce에서는 원의 애니메이션을 없애 기본 왼쪽 위치에 정지시켜 줘. 흰색/검은색은 마스크 의미를 유지하고 테마 색으로 바꾸지 않아. 두 SVG 데모의 동일한 캔버스 크기 CSS와 공통 모션 감소 선언을 재사용하고 좁은 화면에서 SVG·도형·구멍 좌표를 함께 비례 축소해 줘. role img와 움직이는 원형 구멍으로 배경이 드러나는 도형이라는 접근 가능한 이름을 제공하고 라이트·다크 실루엣·실제 투명 구멍·원 경계·상단 도구 여백을 확인해 줘. 외부 이미지·필터·복제 도형·제목·설명·수치·실행 횟수·조작 버튼·상태·이벤트·타이머·프레임 루프는 추가하지 말아 줘.',
  },
  {
    id: 'mg-geometric-polygon-morph', domain: 'motion', category: 'graphic',
    titleKo: '기하학 폴리곤 모핑', titleEn: 'Geometric Polygon Morph',
    vibeTag: '꼭짓점이 흐르며 새로운 도형으로', vibeKeywords: ['다각형 모핑', '기하학 변형', '별 사각형 보간'],
    summary: '동일한 꼭짓점 개수로 팔각형·별·사각형을 연속 보간',
    promptSnippet: '지정한 영역 중앙에 폭 96px·최대 폭 100%·aspect-ratio 1의 기하학 모핑 도형을 만들어 줘. 단일 div의 clip-path polygon을 6초 ease-in-out infinite로 보간하고 모든 키프레임에서 시계 방향 꼭짓점 8개·같은 참조 상자·같은 채움 규칙을 유지해 줘. 0%와 100%의 팔각형은 (30,0),(70,0),(100,30),(100,70),(70,100),(30,100),(0,70),(0,30), 33%의 네 갈래 별은 (50,0),(62,38),(100,50),(62,62),(50,100),(38,62),(0,50),(38,38), 66%의 사각형은 (0,0),(50,0),(100,0),(100,50),(100,100),(50,100),(0,100),(0,50)이며 모든 좌표는 % 단위야. 사각형의 중간점도 유지해 꼭짓점 개수가 줄어들며 순간 전환되지 않게 해 줘. 시작 팔각형은 요소의 CSS 변수에 한 번 정의해 기본 clip-path와 첫/마지막 키프레임에서 재사용하고 모션 감소에서는 애니메이션을 없애 그 팔각형에 정지해 줘. 채움은 135도 선형 그라데이션이며 라이트는 짙은 인디고에서 짙은 시안 블루, 다크는 밝은 인디고에서 밝은 시안으로 이어 도형 실루엣이 배경에 묻히지 않게 해 줘. 퍼센트 꼭짓점으로 도형 비율을 유지하고 좁은 화면의 경계와 상단 도구 여백을 확인해 줘. role img와 팔각형과 네 갈래 별, 사각형으로 이어 변하는 도형이라는 접근 가능한 이름을 제공해 줘. 별도 회전·확대·글자·제목·설명·재생 횟수·조작 버튼·이벤트·타이머·애니메이션 프레임·외부 모핑 라이브러리는 추가하지 말아 줘.',
  },
  {
    id: 'mg-bezier-motion-path', domain: 'motion', category: 'graphic',
    titleKo: '베지어 모션 패스', titleEn: 'Bezier Motion Path',
    vibeTag: '곡선의 흐름을 따라 방향을 바꾸는', vibeKeywords: ['모션 패스', '곡선 경로 이동', '접선 방향 회전'],
    summary: '하나의 베지어 경로를 따라 이동과 회전을 함께 연결',
    promptSnippet: '지정한 영역에 최대 폭 240px·비율 유지 SVG viewBox 0 0 240 112의 베지어 모션 패스를 만들어 줘. 경로 문자열 M16 90 C16 20 95 20 116 56 S214 100 224 22를 한 상수에서 관리해 보이는 rail의 d와 이동 화살표의 CSS offset-path path()에 함께 사용해 줘. rail은 fill none·2px 중립 선·dasharray 4 7·round cap이며 시작 (16,90)·끝 (224,22)에 반지름 3px의 같은 중립 점을 놓아 줘. 화살표는 중심 기준 M-8-6 8 0-8 6-4 0Z의 채워진 SVG path이며 g에 offset-anchor center·offset-rotate auto·transform-box fill-box를 적용해 접선 방향을 향하게 해 줘. offset-distance 0%→100%를 4초 linear infinite로 이동하고 끝에 도달하면 시작으로 되돌아 반복해 줘. prefers-reduced-motion reduce에서는 CSS 애니메이션을 없애 기본 0%의 시작점에 정지시켜 줘. offset-path 미지원 시에는 애니메이션 없이 translate(16px,90px)의 시작점에 화살표를 표시해 줘. 라이트는 짙은 인디고 화살표·중립 슬레이트 rail, 다크는 밝은 인디고 화살표·같은 rail을 사용하고 좁은 화면에서는 SVG 전체를 비례 축소해 경로와 화살표가 어긋나지 않게 해 줘. SVG에는 베지어 곡선을 따라 이동하고 방향을 바꾸는 화살표라는 접근 가능한 이미지 이름을 제공하고 실제 문자·수치·제목·설명·실행 횟수·조작 버튼은 추가하지 않아. 상단 도구 여백과 곡선·화살표의 경계를 확인하고 JavaScript 좌표 타이머·애니메이션 프레임·이벤트·별도 라이브러리는 쓰지 말아 줘.',
  },
];
