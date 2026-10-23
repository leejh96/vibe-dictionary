import type { TechniqueItem } from '../techniques';

export const SHOWCASE_ADDITIONS: TechniqueItem[] = [
  {
    id: 'mg-lenticular-strip-poster', domain: 'motion', category: 'graphic',
    titleKo: '렌티큘러 스트립 포스터', titleEn: 'Lenticular Strip Poster',
    summary: '세로 띠 28개의 노출 폭이 함께 변하며 라임색 원형과 보라색 별 포스터가 교차하는 그래픽',
    vibeTag: '보는 각도가 달라진 듯 두 이미지가 교차하는',
    vibeKeywords: ['렌티큘러', '스트립 포스터', '세로 띠 전환', '광학 포스터'],
    promptSnippet: '지정 영역에 SVG 렌티큘러 스트립 포스터를 만들어 줘. 280×150 viewBox에 라임색 바탕과 남색 링을 먼저 그리고, 그 위에 보라색 바탕과 짙은 별을 한 그룹으로 겹쳐 줘. 위 그룹의 clipPath는 x=i×10인 세로 직사각형 28개로 구성하며 각 높이는 150, 폭은 reveal/10으로 해 줘. reveal은 초기 0에서 4초 동안 100까지 증가한 뒤 4초 동안 0으로 돌아오는 8초 왕복 자동 시연이야. 0에서는 링, 100에서는 별만 완전히 보이고 중간에는 두 그림이 세로 띠로 교차해. 10 간격의 옅은 수직 경계선을 얹고 클립 ID는 인스턴스별로 분리해 줘. 실제 시야각 감지나 광학 렌즈 효과가 아닌 스트립 마스크 시뮬레이션이야. 슬라이더 없이 재생하고 클릭 시 이전 시계를 초기화해 처음부터 한 번 재시작해 줘. 화면 밖·숨겨진 탭에서는 멈추고 모션 감소에서는 초기 링을 표시해 줘. 접근성 이름과 반응형 폭을 지원해 줘.',
  },
  {
    id: 'st-fluted-glass-panel', domain: 'style', category: 'tactile',
    titleKo: '골지 유리 패널', titleEn: 'Fluted Glass Panel',
    summary: '컬러 구체와 큰 글자 위에 세로 하이라이트·그림자·블러를 겹쳐 골이 있는 유리 질감을 표현',
    vibeTag: '빛이 세로 골을 따라 잘게 나뉘는 유리',
    vibeKeywords: ['골지 유리', '리드 유리', '세로 유리', '유리 질감'],
    promptSnippet: '지정 영역에 280×150 크기의 골지 유리 패널을 만들어 줘. 짙은 남색 배경 위에 지름 140인 복숭아·분홍·보라 방사형 그라데이션 구체와 흰색 굵은 타이포를 겹쳐 줘. 구체의 수평 이동은 초기 0에서 시작해 2초에 +45px, 6초에 -45px, 8초에 0으로 복귀하며 선형 왕복 반복해 줘. 그 위에 backdrop-filter blur(2px)와 주기 12px의 repeating-linear-gradient(90deg)를 얹어 밝은 면·투명 면·짙은 음영·가느다란 반사선을 표현해 줘. 하단 작은 캡션은 유리 레이어 위에서 선명하게 유지해 줘. 실제 광선 굴절이나 구체의 3D 렌더링은 없고 CSS 블러와 밝기 띠로 모사한 질감이야. blur 미지원 환경에서도 띠는 남겨 줘. 슬라이더 없이 자동 재생하고 클릭 시 기존 시계를 초기화해 처음부터 재생해 줘. 화면 밖·숨겨진 탭에서 정지하고 모션 감소에서는 초기 화면을 보여 줘. 양테마에서 패널 자체의 어두운 색을 유지하고 접근성 이름·좁은 폭을 지원해 줘.',
  },
  {
    id: 'polaroid-photo-develop', domain: 'ui', category: 'motion',
    titleKo: '폴라로이드 사진 현상', titleEn: 'Polaroid Photo Development',
    summary: '작은 즉석사진 프레임 속 어두운 면이 걷히며 산과 노을이 나타나고 사진의 기울기가 함께 변하는 연출',
    vibeTag: '천천히 나타나는 한 장의 추억',
    vibeKeywords: ['폴라로이드', '즉석사진', '사진 현상', '사진 리빌'],
    promptSnippet: '지정 영역에 크림색 여백과 하단 손글씨 캡션이 있는 너비 164px의 즉석사진을 만들어 줘. 안에는 SVG로 노을·태양·겹친 산·물결을 그리고 짙은 회색 덮개를 얹어 줘. progress는 초기 0에서 4초에 100, 8초에 다시 0으로 선형 왕복 반복해 줘. developed=min(1,progress/70), 덮개 opacity=1-developed, 사진 회전=-7+developed×4도로 연결해 줘. 처음에는 어둡고 2.8초에 완전히 나타나 5.2초까지 유지한 뒤 다시 어두워져. 초기 화면은 어두운 사진이며 실제 촬영·이미지 업로드·현상 처리는 없는 시각 시연이야. 그림자는 사진 아래에 고정하고 장면 안에 모든 요소가 들어오게 해 줘. 슬라이더 없이 자동 시연하며 클릭 시 이전 시계를 초기화해 처음부터 재생해 줘. 화면 밖·숨겨진 탭에서는 멈추고 모션 감소에서는 초기 정지 화면을 표시해 줘. 사진의 접근성 설명과 캡션의 한영 번역, 양테마·모바일 폭을 지원해 줘.',
  },
  {
    id: 'sticker-corner-peel', domain: 'ui', category: 'hover',
    titleKo: '스티커 모서리 들림', titleEn: 'Sticker Corner Peel',
    summary: '호버·키보드 포커스에서 스티커 오른쪽 아래가 접혀 뒷면이 드러나며 클릭으로 접힘을 고정',
    vibeTag: '손으로 살짝 떼어 보고 싶은 스티커',
    vibeKeywords: ['스티커 들림', '모서리 접힘', '스티커 호버', '필 오프'],
    promptSnippet: '지정 영역에 흰 외곽선과 라임색 면을 가진 144×100 스티커 버튼을 만들어 줘. 전체를 -8도 회전하고 drop-shadow로 바닥에서 띄워 줘. 앞면은 clip-path polygon으로 오른쪽 아래를 작게 잘라 두고, 같은 위치에 밝은 종이 뒷면 삼각형을 10×10으로 올려 줘. hover 또는 focus-visible 또는 고정 상태에서는 앞면 잘림을 오른쪽 높이 58%·아래쪽 너비 71%까지 넓히고 뒷면을 42×42로 280ms 전환해 줘. 초기 고정은 false야. native button의 클릭·Enter·Space로 고정 boolean을 토글하고 aria-pressed에 연결해 줘. 고정을 끄더라도 호버나 키보드 포커스가 남아 있으면 들림을 유지하며 셋 모두 해제될 때 접어 줘. 실제 분리·삭제·드래그는 없어. 입력 없이 자동으로 상태를 바꾸지 말고, 키보드 포커스 링·한영 버튼 이름·양테마·좁은 폭을 지원해 줘. 모션 감소에서는 전환 없이 목표 상태를 표시해 줘.',
  },
  {
    id: 'accordion-image-gallery', domain: 'layout', category: 'grid',
    titleKo: '아코디언 이미지 갤러리', titleEn: 'Accordion Image Gallery',
    summary: '세 장의 세로 풍경 중 선택한 패널이 넓어지고 나머지는 좁은 스트립으로 남는 갤러리',
    vibeTag: '한 장에 시선을 모으는 접이식 갤러리',
    vibeKeywords: ['아코디언 갤러리', '확장 이미지 패널', '이미지 스트립', '포트폴리오 갤러리'],
    promptSnippet: '지정 영역에 세로 풍경 패널 3개를 가로로 나란히 배치하는 아코디언 이미지 갤러리를 만들어 줘. 각 패널은 native button이고 CSS 그라데이션 하늘·원형 태양·둥근 언덕으로 새벽·사막·바다를 표현해 줘. 컨테이너 너비는 최대 280px·높이 150px, 간격 5px이며 버튼은 flex-basis:0·min-width:0으로 둬. 초기에는 첫 패널을 선택하고 선택 패널 flex-grow:4, 나머지 1로 설정해 줘. 클릭·Enter·Space 시 선택 index를 바꾸고 flex-grow를 450ms cubic-bezier(.22,1,.36,1)로 전환해 줘. 하단 풍경 이름은 선택 패널에서만 opacity:1, 나머지는 0이며 200ms로 전환해 줘. 각 버튼에 항상 한영 접근성 이름과 aria-pressed를 제공하고 Tab 순서와 내부 포커스 링을 유지해 줘. 자동 순환·페이지 이동 없이 선택 상태를 유지하며 언어를 바꿔도 선택 index를 유지해 줘. 양테마·좁은 폭·모션 감소 시 즉시 전환을 지원해 줘.',
  },
];
