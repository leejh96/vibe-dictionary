import type { TechniqueItem } from '../techniques';

export const CONTROL_ADDITIONS: TechniqueItem[] = [
  {
    id: 'native-date-field', domain: 'ui', category: 'control',
    titleKo: '네이티브 날짜 선택', titleEn: 'Native Date Field',
    vibeTag: '익숙한 달력으로 날짜를 고르는', vibeKeywords: ['날짜 선택', '데이트 피커', '네이티브 달력 입력'],
    summary: '브라우저 달력과 날짜 구간 편집을 유지하는 테마 대응 입력',
    promptSnippet: '지정한 영역에 최대 폭 240px·min-width 0의 네이티브 날짜 입력을 만들어 줘. 16px 장식 CalendarDays SVG와 날짜 label을 8px 간격·13px 굵은 문자로 정렬하고 인스턴스별 고유 ID의 실제 input type date에 연결해 줘. label 아래 8px에 폭 100%·높이 44px·좌우 12px 패딩·1px 중립 테두리·10.4px 모서리·테마 표면·13px tabular 숫자의 입력을 배치해 줘. 초기 예시 값은 defaultValue 2026-10-18로만 지정하고 이후 날짜 편집과 지우기는 같은 native input이 관리하게 해 줘. 다른 출력과 값을 공유하지 않으므로 React 값 상태나 동기화 핸들러는 만들지 말아 줘. 입력의 실제 값은 yyyy-mm-dd 또는 빈 문자열이고 화면의 날짜 표기·연월일 세그먼트 편집·방향키·Tab·달력 아이콘·선택창·취소·선택 지우기는 브라우저와 운영체제 기본 UI에 맡겨 줘. 날짜를 Date 객체나 UTC/로컬 시간으로 재변환하지 말아 줘. min/max/required나 별도 주말·예약 가능일·오늘 강제 규칙은 넣지 않고 지운 값도 유지해 줘. 라이트는 흰 표면·짙은 글자·color-scheme light, 다크는 슬레이트 표면·밝은 글자·color-scheme dark를 적용해 native 달력 아이콘·선택창도 테마에 맞추고 실제 지원 범위에서 확인해 줘. 기본 달력 표시를 숨기거나 사용자 정의 아이콘으로 덮지 말고 WebKit calendar-picker-indicator에는 pointer 커서만 지정해 줘. 기존 control 입력 표면·포커스 CSS와 숫자 입력의 실제 native invalid 테두리 색만 재사용해 부분 입력이 invalid이면 라이트 로즈/다크 밝은 로즈 테두리를 보여 줘. 같은 input DOM·인스턴스별 native 값·2px focus-visible 윤곽·44px 높이·좁은 화면의 연월일과 달력 아이콘 경계·상단 도구 여백을 확인해 줘. 네이티브 달력의 모양은 브라우저별로 다를 수 있으며 커스텀 달력·버튼·복제 날짜 출력·포맷 라이브러리·저장·서버·리스너·타이머·애니메이션·별도 제목·설명·실행 횟수는 추가하지 말아 줘.',
  },
  {
    id: 'manual-search-combobox', domain: 'ui', category: 'control',
    titleKo: '검색 추천 콤보박스', titleEn: 'Manual Search Combobox',
    vibeTag: '입력 흐름 안에서 후보를 고르는', vibeKeywords: ['검색 콤보박스', '자동완성 목록', '방향키 추천 선택'],
    summary: '직접 입력을 보존하며 추천 필터·키보드 탐색·명시적 선택을 연결',
    promptSnippet: '지정한 영역에 폭 240px·최대 100%의 수동 선택형 검색 콤보박스를 만들어 줘. 16px Search SVG와 디자인 분야 label을 인스턴스별 고유 ID의 text input에 연결하고 아래 8px에 높이 44px·좌우 12/40px 패딩·13px 문자·1px 테마 중립 테두리·10.4px 모서리·테마 표면의 입력을 놓아 줘. 오른쪽 12px·상단 13px에 18px ChevronDown SVG를 장식으로 고정하고 열려도 회전시키지 않아. 초기 입력은 빈 값, placeholder 분야 검색이며 autocomplete off·spellcheck false를 사용해 줘. input role combobox·aria-autocomplete list·aria-expanded·항상 존재하는 listbox ID의 aria-controls와 실제 활성 후보가 있을 때만 aria-activedescendant를 연결해 줘. 추천은 고정 ID를 가진 타이포그래피·컬러 시스템·아이콘 순서이며 입력의 trim 문자열을 포함하는 항목만 표시해 줘. 포커스·클릭·입력으로 열고 처음에는 후보를 자동 선택하지 않아. 입력은 자유 원문을 허용하고 후보를 고르지 않고 벗어나도 원문을 유지해 줘. 기본 ArrowDown/ArrowUp만 첫/마지막 후보 진입과 이후 경계 내 이동에 사용하고 수정키 조합·Home/End·좌우·문자 편집은 native 입력에 맡겨 줘. 탐색 중 DOM 포커스는 input에 유지하고 활성 option ID·aria-selected·강조 배경·Check SVG를 동기화하며 활성 후보를 nearest로 스크롤해 줘. Enter는 활성 후보가 있을 때만 해당 원문을 입력값으로 확정하고 닫아 줘. 포인터 후보 선택은 primary pointerdown에서 native blur만 방지하고 click으로 확정한 뒤 input 포커스를 유지·복귀해 줘. Escape는 값을 지우거나 후보를 확정하지 않고 닫고, Tab과 blur는 기본 포커스 이동을 유지하며 닫아 줘. isComposing인 키는 가로채지 않아. 필터 변경·닫기 때 활성 후보를 지워 존재하지 않는 option ID가 남지 않게 해 줘. listbox는 입력 아래 4px·absolute 좌우 0·z-index 5·4px 패딩·1px 중립 테두리·같은 모서리·테마 표면·작은 그림자·최대 높이 142px의 실제 스크롤 목록이며 각 option은 최소 44px·8px 패딩·8px 간격·13px 원문과 16px 장식 Check SVG로 정렬해 줘. 닫힌 목록은 hidden으로 감추고 option은 Tab 순서에 넣지 않아. 열려 있고 일치 후보가 없으면 목록을 숨기고 같은 팝업 자리에 추천 항목 없음 status만 표시하며 자유 입력은 유지해 줘. 데모 프레임은 최소 높이 218px로 팝업 자리를 확보해 아래 카드 내용이나 상단 도구를 가리지 않게 해 줘. 기존 control 표면·포커스·placeholder CSS를 재사용하고 라이트·다크 대비, 긴 입력·좁은 화면 경계·포커스·44px 크기를 확인해 줘. 검색 서버·필수 검증·저장·타이머·전역 리스너·별도 제목·사용법·선택 개수·실행 횟수는 추가하지 말아 줘.',
  },
  {
    id: 'native-file-attachment', domain: 'ui', category: 'control',
    titleKo: '네이티브 파일 첨부', titleEn: 'Native File Attachment',
    vibeTag: '고른 파일이 정돈된 첨부 항목으로', vibeKeywords: ['파일 선택', '첨부 파일', '파일 교체 제거'],
    summary: '실제 파일 선택과 파일명·크기 표시, 교체·제거를 연결',
    promptSnippet: '지정한 영역에 최대 폭 240px의 네이티브 단일 파일 선택을 만들어 줘. 인스턴스별 고유 ID의 input type file과 16px 장식 Paperclip SVG가 있는 첨부 파일 label을 연결해 줘. label 아래 8px에는 높이 44px·1px 중립 점선 테두리·10.4px 모서리·테마 틴트의 선택 영역을 두고 실제 file input을 absolute inset 0·width/height 100%·opacity 0으로 덮어 클릭·Tab·Enter·Space·네이티브 파일 선택·취소를 그대로 사용해 줘. 입력을 display none이나 disabled로 숨기지 말아 줘. 안에는 pointer-events none·aria-hidden의 18px FilePlus2 SVG와 파일 선택 문구를 8px 간격으로 중앙 정렬하고 선택 후에는 파일 변경으로 바꿔 줘. multiple·accept·용량 제한은 지정하지 않아. 초기 파일은 없고 실제 input.files 첫 File만 로컬 상태에 보관해 선택·교체 시 동기화해 줘. 취소나 같은 파일 재선택은 브라우저 기본 동작을 유지하며 선택창을 열기 전에 값을 지우지 않아. 선택한 뒤 8px 아래에는 1px 테두리·같은 모서리·테마 표면의 첨부 행을 표시해 줘. 행은 좌측 10px 패딩·20px 장식 FileText SVG·min-width 0의 원문 파일명과 실제 size를 ko-KR 자릿수 구분 B 단위로 표시한 두 줄 정보·44px 제거 버튼을 8px 간격으로 정렬해 줘. 파일명은 자르지 않고 anywhere 줄바꿈하며 숫자 크기는 11px tabular 숫자, 파일명은 12px로 보여 줘. 제거 버튼은 기존 44px 아이콘 버튼 표면을 재사용하되 테두리와 배경은 없애고 16px X SVG·전체 파일명과 첨부 제거를 합친 이름을 제공해 줘. 제거 시 실제 input.value를 빈 문자열로 초기화하고 파일 상태도 null로 바꾸며 같은 input으로 포커스를 돌려 동일 파일을 다시 선택할 수 있게 해 줘. 같은 입력 DOM·고유 ID·인스턴스별 상태를 유지하고 라이트·다크 본문·틴트·테두리·포커스 대비, 긴 한국어 파일명·좁은 화면 경계·44px 조작 영역·상단 도구 여백을 확인해 줘. 파일은 읽거나 전송하지 않으며 업로드 완료·진행률·드롭존·미리보기 URL·전역 리스너·타이머·별도 제목·설명·실행 횟수를 추가하지 말아 줘.',
  },
  {
    id: 'native-color-swatch-field', domain: 'ui', category: 'control',
    titleKo: '네이티브 컬러 스와치', titleEn: 'Native Color Swatch Field',
    vibeTag: '고른 색과 색상값을 나란히 확인하는', vibeKeywords: ['색상 입력', '컬러 피커', '색상값 스와치'],
    summary: '브라우저 색상 선택과 실제 RGB 색상값 표시를 연결',
    promptSnippet: '지정한 영역에 최대 폭 240px의 네이티브 컬러 스와치 입력을 만들어 줘. 16px 장식 Palette SVG와 강조색 label을 8px 간격·13px 굵은 문자로 정렬하고 인스턴스별 고유 ID로 실제 input type color에 연결해 줘. label 아래 8px에 44px 색상 입력과 minmax(0,1fr) 색상값 output을 12px 간격으로 배치해 줘. 초기 불투명 RGB 색상은 #8b5cf6이며 선택값이 바뀌면 같은 input의 스와치와 오른쪽 대문자 원문 #8B5CF6 형태를 함께 갱신해 줘. output은 입력 ID의 htmlFor·aria-hidden을 사용해 native 색상 입력의 값과 중복 발표하지 않고 실제 편집 가능한 text input처럼 동작시키지 않아. 색상 input은 44px 정사각형·4px 패딩·1px 테마 중립 테두리·10.4px 모서리·테마 표면이며 WebKit swatch-wrapper 패딩을 0으로, WebKit/Firefox 색 면의 테두리를 0·모서리를 6px로 맞춰 줘. output은 높이 44px·좌우 12px 패딩·13px monospace 문자·같은 표면/테두리/모서리를 사용해 줘. 라이트는 흰 표면·짙은 글자·color-scheme light, 다크는 슬레이트 표면·밝은 글자·color-scheme dark를 native 색상 input에 적용해 줘. 색 면은 사용자가 고른 원래 색을 유지하고 선택색 위에 다른 글자를 얹지 않아. 색 선택창·키보드·취소 동작은 브라우저 기본 UI에 맡기고 사용자 정의 팔레트·알파·광색역 컨트롤은 만들지 말아 줘. 같은 DOM·포커스·인스턴스별 상태를 유지하고 2px 포커스 윤곽·44px 조작 영역·좁은 화면 경계·상단 도구 여백을 확인해 줘. 로컬 색상 입력이며 앱 전체 테마 변경·저장·복사 버튼·네트워크·리스너·타이머·애니메이션·별도 제목·설명·실행 횟수는 추가하지 말아 줘.',
  },
  {
    id: 'constrained-dual-range-slider', domain: 'ui', category: 'control',
    titleKo: '교차 방지 구간 슬라이더', titleEn: 'Constrained Dual Range Slider',
    vibeTag: '두 손잡이가 선택 구간을 지키는', vibeKeywords: ['두 손잡이 슬라이더', '구간 선택', '교차 방지 범위'],
    summary: '두 값의 최소 간격과 각 손잡이의 입력·접근성 범위를 함께 유지',
    promptSnippet: '지정한 영역에 최대 폭 240px의 두 손잡이 구간 슬라이더를 만들어 줘. fieldset·구간 legend·16px SlidersHorizontal SVG를 사용하고 legend 오른쪽에는 실제 현재 범위 20–80을 tabular 숫자로 보여 주되 이 output은 aria-hidden으로 숨겨 각 native slider 값과 중복 발표하지 않아. 초기 lower 20·upper 80·전체 범위 0~100·step 5·최소 간격 20을 사용해 줘. legend 아래 16px의 상대 위치 44px 필드에 두 native input type range를 absolute inset 0으로 겹치고 고유 ID·최솟값/최댓값 이름을 제공해 줘. DOM과 Tab 순서는 항상 lower→upper로 유지해 줘. 각 input의 물리적 min/max는 같은 0/100으로 유지해 손잡이 좌표를 맞추되 lower의 aria-valuemin/max는 0/upper-20, upper는 lower+20/100으로 실제 허용 범위에 동기화해 줘. 입력 변경은 현재 두 값을 기준으로 해당 허용 구간에 clamp하는 함수형 상태 갱신을 사용해 연속·배치 입력에서도 교차하지 않게 해 줘. 방향키는 native step 5 동작을 유지하고 Home/End만 현재 손잡이의 실제 허용 최솟값/최댓값으로 이동해 줘. 손잡이는 native hit 영역 44px 원형 안에 중심 반지름 7px의 테마 표면과 7~10px 강조 링을 radial-gradient로 그려 실제 시각 크기는 20px로 보여 줘. WebKit track 6px·thumb margin-top -19px와 Firefox thumb/track/progress 스타일을 함께 지정해 줘. 입력은 pointer-events none, thumb만 auto로 두어 양쪽 손잡이를 직접 드래그하게 해 줘. 포커스한 input은 z-index를 높이고 focus-visible thumb에 2px 윤곽·안쪽 4px 간격을 표시해 줘. 별도 장식 트랙은 왼쪽·오른쪽 22px·위쪽 19px·높이 6px이며 lower~upper만 강조색, 나머지는 중립색으로 채워 실제 손잡이 중심과 일치시켜 줘. 필드 배경의 주 포인터 클릭·탭은 (clientX-left-22)/(width-44)의 위치를 0~100·5단계로 계산하고 가까운 손잡이를 해당 허용 구간 안으로 이동·포커스해 줘. 같은 거리면 lower를 선택하고 thumb 자체의 native 포인터 입력·보조 버튼·다중 포인터는 가로채지 않아. 필드 너비가 44px 이하이면 위치 계산을 건너뛰고 트랙에서 시작한 별도 드래그 상태는 만들지 않아. 라이트·다크 표면·강조 링·트랙·포커스 대비와 좁은 화면 경계·최소 간격·상단 도구 여백을 확인하고 기존 단일 range와 실제 동일한 입력 표면·track CSS만 재사용해 줘. 실제 검색·가격·저장·전역 리스너·타이머·애니메이션·별도 제목·설명·실행 횟수는 추가하지 말아 줘.',
  },
  {
    id: 'dismissible-token-input', domain: 'ui', category: 'control',
    titleKo: '추가·제거 태그 입력', titleEn: 'Dismissible Token Input',
    vibeTag: '입력한 단어가 정리된 태그가 되는', vibeKeywords: ['태그 입력', '토큰 입력', '제거 가능한 칩'],
    summary: '입력값을 태그로 추가하고 제거 뒤 같은 입력창으로 포커스를 복귀',
    promptSnippet: '지정한 영역에 최대 폭 240px의 태그 입력을 만들어 줘. 초기 태그는 UI·모션이고 입력은 빈 값이야. 16px 장식 Tag SVG와 태그 label을 8px 간격·13px 굵은 글자로 정렬하고 고유 ID로 같은 native text input을 연결해 줘. 아래 8px에 태그 목록과 입력 행을 세로 8px 간격으로 배치해 줘. 목록은 추가한 태그 이름의 실제 ul/li·flex-wrap·8px 간격이며 모든 태그를 제거하면 목록만 숨겨 입력 행과 label은 유지해 줘. 태그는 최대 폭 100%·1px 중립 테두리·10.4px 모서리·테마 틴트이고 12px 원문과 44px 제거 button을 나란히 배치해 줘. 긴 태그는 원문을 자르지 않고 anywhere 줄바꿈하되 제거 button은 줄어들지 않게 해 줘. 각 제거 button은 전체 태그 이름과 태그 제거를 합친 접근 가능한 이름·16px X SVG를 쓰고 클릭·Enter·Space·터치로 그 태그만 제거한 뒤 같은 input으로 포커스를 돌려 줘. 입력 행은 minmax(0,1fr) text input·44px 추가 button을 8px 간격으로 놓고 input 높이 44px·13px 문자·좌우 12px 패딩·새 태그 placeholder를 사용해 줘. 추가 button은 태그 추가 이름·18px Plus SVG이며 클릭·Enter·Space·터치 또는 input의 Enter로 입력값을 trim한 태그 하나를 끝에 추가하고 입력을 비운 뒤 input 포커스를 유지·복구해 줘. 빈 값·공백은 추가하지 않고 button aria-disabled true·opacity .45와 핸들러 guard를 사용해 줘. 같은 원문이 이미 있으면 중복 태그를 만들지 않고 입력만 비우며 대소문자는 구분해 줘. 쉼표 분할·붙여넣기 자동 분리·자동 삭제 규칙은 넣지 않아. 키보드 조합 중 nativeEvent.isComposing true의 Enter는 확정 동작을 가로채거나 태그로 추가하지 않아. 태그와 입력·제거·추가 button의 같은 DOM을 가능한 유지하고 인스턴스별 상태와 ID를 격리해 줘. 기존 수량 스텝 입력과 동일한 44px 아이콘 버튼 CSS, select와 동일한 실제 입력 표면·포커스 CSS만 재사용해 줘. 라이트·다크 본문·틴트·테두리·포커스 대비, 긴 한국어 태그·좁은 화면 경계·상단 도구 여백을 확인해 줘. 로컬 태그 입력이며 실제 필터·저장·네트워크·타이머·애니메이션·별도 제목·설명·선택 개수·실행 횟수는 추가하지 말아 줘.',
  },
  {
    id: 'native-quantity-stepper', domain: 'ui', category: 'control',
    titleKo: '네이티브 수량 스텝 입력', titleEn: 'Native Quantity Stepper',
    vibeTag: '직접 쓰거나 한 칸씩 조절하는', vibeKeywords: ['수량 스텝 입력', '숫자 입력', '증감 버튼'],
    summary: '직접 편집하는 숫자 입력과 네이티브 단계 증감을 연결',
    promptSnippet: '지정한 영역에 최대 폭 200px의 수량 스텝 입력을 만들어 줘. 16px 장식 Package SVG와 수량 label을 8px 간격·13px 굵은 문자로 정렬하고 고유 ID로 native input type number에 연결해 줘. label 아래 8px에 44px 감소 button·minmax(0,1fr) 숫자 입력·44px 증가 button을 8px 간격의 grid로 배치해 줘. 예시 입력은 초기 문자열 3·min 0·max 9·step 1·inputMode numeric을 사용하고 직접 입력·지우기·브라우저 기본 위아래 방향키를 유지해 줘. 숫자는 중앙 20px 굵은 tabular 숫자로 보여 주고 입력 높이는 44px이야. 기본 브라우저의 작은 스핀 화살표는 appearance textfield와 WebKit spin-button CSS로 숨기되 native spinbutton 의미와 키보드 기능은 유지해 줘. 양쪽 button은 수량 줄이기·수량 늘리기 이름과 입력 ID의 aria-controls·18px Minus/Plus SVG를 사용해 줘. button 클릭·Enter·Space·터치는 해당 native input의 stepDown/stepUp을 실행한 뒤 실제 DOM value를 상태에 반영해 줘. 브라우저의 정수 단계 맞춤과 범위 처리를 재구현하지 말고 빈 값·소수·범위 밖 직접 입력도 입력/blur에서 임의로 잘라 고치지 않아. 빈 값은 허용하고 native validity가 잘못된 직접 입력에는 라이트의 짙은 로즈·다크의 밝은 로즈 테두리를 보여 줘. 비어 있지 않은 숫자가 0 이하이면 감소, 9 이상이면 증가 button을 aria-disabled true·opacity .45로 표시하고 핸들러에서도 막되 native disabled로 포커스를 잃게 하지 말아 줘. 유효한 버튼은 같은 DOM과 포커스를 유지하며 타이머·길게 누르기 로직은 추가하지 않아. 입력과 button은 1px 테마 중립 테두리·10.4px 모서리·테마 표면을 사용하고 라이트는 짙은 글자·인디고, 다크는 밝은 글자·인디고로 맞춰 줘. 2px 포커스 윤곽·44px 입력 영역·좁은 화면 경계·상단 도구 여백을 확인해 줘. 로컬 예시 입력이며 실제 주문·재고·저장·제출·별도 제목·설명·실행 횟수는 추가하지 말아 줘.',
  },
  {
    id: 'preview-linked-native-select', domain: 'ui', category: 'control',
    titleKo: '미리보기 연결 셀렉트', titleEn: 'Preview Linked Native Select',
    vibeTag: '선택한 크기가 바로 눈에 보이는', vibeKeywords: ['네이티브 셀렉트', '글자 크기 선택', '선택 미리보기'],
    summary: '브라우저 기본 선택 조작과 실제 글자 크기 미리보기를 연결',
    promptSnippet: '지정한 영역에 최대 폭 240px의 미리보기 연결 셀렉트를 만들어 줘. 16px 장식 Type SVG와 글자 크기 label을 8px 간격·13px 굵은 문자로 정렬하고 인스턴스별 고유 ID로 실제 select에 연결해 줘. label 아래 8px에 minmax(0,1fr) 선택 영역·64px 미리보기의 두 열을 8px 간격으로 배치하고 세로 중앙을 맞춰 줘. native select는 작게 · 20px, 보통 · 28px, 크게 · 36px의 실제 option과 숫자값을 사용하며 초기값은 28이야. 선택 변경 시 오른쪽 Aa 샘플의 실제 font-size를 20/28/36px로 즉시 바꾸되 같은 select·샘플 DOM과 포커스를 유지해 줘. 샘플은 64px 정사각형·1px 테두리·12px 모서리·테마 틴트·강조 문자·line-height 1·중앙 정렬이며 aria-hidden으로 숨겨 선택된 option과 중복 발표하지 않아. select는 appearance none·높이 44px·왼쪽 12px 오른쪽 36px 패딩·1px 중립 테두리·10.4px 모서리·테마 표면과 본문색을 사용해 줘. 바깥 상대 위치 래퍼 오른쪽 12px·세로 중앙에 18px ChevronDown SVG를 겹치고 aria-hidden·pointer-events none으로 처리해 줘. 화살표는 회전하지 않고 실제 메뉴 열림·닫힘·방향키·문자 검색·Escape·모바일 선택 UI는 브라우저 기본 select 동작을 유지해 줘. 라이트는 흰 표면·짙은 글자·짙은 인디고와 color-scheme light, 다크는 슬레이트 표면·밝은 글자·밝은 인디고와 color-scheme dark를 select에 적용해 줘. 기존 범위 입력과 동일한 프레임 폭·label CSS만 재사용하고, 2px 포커스 윤곽·좁은 화면의 옵션 문자와 화살표 간격·미리보기 경계·상단 도구 여백을 확인해 줘. 실제 전역 글꼴 설정·저장·네트워크·사용자 정의 listbox·이벤트 리스너·타이머·애니메이션·별도 제목·설명·실행 횟수는 추가하지 말아 줘.',
  },
  {
    id: 'mixed-state-checkbox-group', domain: 'ui', category: 'control',
    titleKo: '부분 선택 체크박스 그룹', titleEn: 'Mixed State Checkbox Group',
    vibeTag: '일부 선택도 한눈에 구분되는', vibeKeywords: ['부분 선택', '전체 선택 체크박스', '중간 상태'],
    summary: '개별 옵션과 전체 선택의 체크·해제·부분 선택을 네이티브 입력에 연결',
    promptSnippet: '지정한 영역에 최대 폭 224px·1px 테마 중립 테두리·12px 모서리·테마 표면의 체크박스 fieldset을 만들어 줘. 디자인 옵션 legend는 화면 읽기용으로만 제공하고 전체 선택·색상·타이포·레이아웃의 실제 label 행을 위에서 아래로 배치해 줘. 초기에는 색상만 선택해 줘. 각 행은 최소 높이 44px·상하 8px 좌우 12px 패딩·10px 간격·13px 문자이며 첫 전체 선택 행만 굵게 표시하고 아래 중립 구분선을 둬. 각 label을 인스턴스별 고유 ID의 native input type checkbox와 연결하고 행 전체 클릭·터치와 Tab·Space로 조작하게 해 줘. 체크 모양은 20px 정사각형·2px 테두리·5px 모서리·appearance none의 input과 중앙 14px Check SVG를 겹쳐 그리며 SVG는 장식으로 숨기고 포인터 입력을 막지 않게 해 줘. 아무 항목도 선택하지 않으면 전체 선택은 unchecked, 모두 선택하면 checked, 일부만 선택하면 checked false와 실제 DOM indeterminate true를 적용해 줘. 부분 선택일 때 전체 선택의 Check를 Minus SVG로 바꾸고 선택·부분 선택 행은 연한 테마 표면과 강조색 네모로 표시해 줘. 전체 선택 조작은 모두 체크하거나 모두 해제하고 개별 조작은 해당 옵션만 변경해 줘. 부분 선택 기억·순환 같은 추가 규칙은 넣지 않아. indeterminate는 React 렌더 뒤 layout effect로 native input에 동기화하고 상태가 바뀌어도 같은 input과 포커스를 유지해 줘. 라이트는 흰 표면·짙은 글자·짙은 인디고 네모와 흰 SVG, 다크는 슬레이트 표면·밝은 글자·밝은 인디고 네모와 짙은 SVG를 사용해 줘. 모든 네모의 2px 포커스 윤곽·3px 간격·44px 행·좁은 화면 경계·상단 도구 여백을 확인해 줘. 실제 저장·설정 적용·타이머·애니메이션·별도 제목·설명·선택 개수·실행 횟수는 추가하지 말아 줘.',
  },
  {
    id: 'value-bubble-range-slider', domain: 'ui', category: 'control',
    titleKo: '값 버블 범위 슬라이더', titleEn: 'Value Bubble Range Slider',
    vibeTag: '손잡이를 따라 현재 값이 움직이는', vibeKeywords: ['값 버블 슬라이더', '음량 입력', '범위 조절'],
    summary: '네이티브 범위 입력의 손잡이·채움·현재 값 버블을 함께 연결',
    promptSnippet: '지정한 영역에 최대 폭 240px의 값 버블 슬라이더를 만들어 줘. 16px 장식 Volume2 SVG와 음량 label을 8px 간격으로 정렬하고 고유 ID로 실제 input type range와 연결해 줘. 입력은 초기값 50·min 0·max 100·step 5이며 클릭·드래그·터치·브라우저 기본 방향키와 Home/End로 값을 조절해 줘. 44px 높이의 입력 중앙에 높이 6px 트랙을 background linear-gradient로 그리고 값의 백분율까지 강조색·나머지는 테마 중립색으로 채워 줘. appearance none의 손잡이는 20px 원형·3px 강조 테두리·테마 표면이며 WebKit과 Firefox의 native range thumb/track 스타일을 함께 지정해 줘. label 아래 4px 간격의 상대 위치 필드에 위쪽 28px 공간을 확보하고 손잡이 위의 36×24px 버블을 배치해 줘. 버블은 현재 값과 %를 11px tabular 숫자·굵은 글자로 보여 주고 아래 4px 삼각 꼬리를 사용해 줘. 버블 중심 left는 calc(value% + (10 - value / 5)px)·translateX(-50%)로 20px 손잡이 중심을 따라가게 해 줘. 최솟값·최댓값에서도 버블과 꼬리가 데모 안에 남도록 좌우 여백을 확보해 줘. 시각 output은 aria-hidden으로 숨기고 native 입력의 aria-valuetext에 같은 백분율을 전달해 중복 발표를 피하며 0에서는 VolumeX SVG로 바꿔 줘. 같은 input DOM과 포커스를 유지하고 라이트는 짙은 인디고·흰 버블 문자·흰 손잡이, 다크는 밝은 인디고·짙은 버블 문자·슬레이트 손잡이로 대비를 맞춰 줘. 2px 포커스 윤곽·좁은 화면 정렬·상단 도구 여백을 확인해 줘. 로컬 입력값 시연이며 실제 오디오 재생·볼륨 변경·타이머·애니메이션·별도 제목·설명·실행 횟수는 추가하지 말아 줘.',
  },
];
