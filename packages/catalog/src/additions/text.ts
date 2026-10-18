import type { TechniqueItem } from '../techniques';

export const TEXT_ADDITIONS: TechniqueItem[] = [
  {
    id: 'editorial-drop-cap', domain: 'ui', category: 'text',
    titleKo: '드롭캡 에디토리얼 본문', titleEn: 'Editorial Drop Cap',
    vibeTag: '큰 첫 글자 옆으로 문장이 흐르는', vibeKeywords: ['드롭캡', '첫 글자 확대', '편집 본문'],
    summary: '문단 첫 글자를 크게 내려 배치하고 나머지 본문을 옆과 아래로 흐르게 구성',
    promptSnippet: '지정한 영역에 최대 폭 240px의 문단 하나만 배치하고 원문은 “빛은 공간의 표정을 바꿉니다. 작은 여백과 선명한 대비가 시선을 이끌고, 다음 문장으로 자연스럽게 이어 줍니다.”로 만들어 줘. 본문은 글자 13px·줄높이 1.7·기본 시스템 글꼴이며 왼쪽 정렬을 유지해 줘. 원문을 span으로 쪼개거나 첫 글자를 복제하지 말고 p::first-letter에만 float left, font-size 64px, line-height 1, font-weight 800, 위 여백 없이 오른쪽 0.15em 패딩과 강조색을 적용해 줘. 큰 빛 글자 옆으로 나머지 첫 줄들이 흐르고 글자 높이를 지나면 본문이 다시 전체 폭을 쓰게 해 줘. 문단은 display flow-root로 내부 float를 포함하고, margin 0·max-width 100%·word-break keep-all·overflow-wrap break-word로 단어를 유지하며 가용 폭에 맞춰 줄바꿈해 줘. 라이트에서는 짙은 본문과 인디고 첫 글자, 다크에서는 밝은 본문과 밝은 인디고 첫 글자로 대비를 맞춰 줘. 데모는 상단 도구 공간 44px를 확보하고 최소 높이 160px에서 본문 길이에 따라 늘어나 큰 글자나 마지막 줄이 잘리지 않아야 해. 화면 읽기는 전체 문단을 원래 순서로 한 번만 읽게 해 줘. 별도 제목·인용 출처·안내·버튼·실행 횟수·애니메이션·상태·타이머·외부 글꼴을 추가하지 않는 정적 본문 타이포그래피 시연이야.',
  },
  {
    id: 'svg-stroke-lettering', domain: 'ui', category: 'text',
    titleKo: '스트로크 드로잉 레터링', titleEn: 'SVG Stroke Lettering',
    vibeTag: '글자의 선이 차례대로 그려지는', vibeKeywords: ['글자 획 그리기', '라인 레터링', '드로잉 타이포'],
    summary: '글꼴 대신 SVG 선 경로로 만든 네 글자의 획을 시간차로 공개',
    promptSnippet: '지정한 영역에 폭 240px 이하·높이 88px의 투명한 button을 만들고 viewBox 0 0 240 80의 SVG로 VIBE 네 글자를 그려 줘. 글자 경로는 V M24 18L44 62L64 18, I M86 18H106M96 18V62M86 62H106, B M128 62V18H143C164 18 164 40 143 40H128M143 40C168 40 168 62 143 62H128, E M216 18H184V62H216M184 40H210으로 각각 분리해 줘. 각 path에 pathLength 1, fill none, stroke currentColor, stroke-width 4.5, 둥근 선 끝과 꺾임, stroke-dasharray 1을 적용해 줘. 처음 표시될 때 stroke-dashoffset 1→0을 600ms cubic-bezier(.2,.65,.3,1)로 한 번 재생하고 글자 순서대로 0/150/300/450ms 지연을 줘. both 채움 모드로 지연 중에는 획을 숨기고 완료 후 네 글자 전체가 남게 해 줘. 클릭·Enter·Space·터치마다 안쪽 SVG만 새 키로 교체해 처음부터 다시 그리고, 바깥 버튼 DOM·포커스·접근 가능한 이름 VIBE 글자 그리기 재생은 유지해 줘. 빠른 재입력은 이전 SVG를 교체해 최신 재생만 남겨 줘. SVG는 aria-hidden·focusable false로 숨기고 중복 텍스트를 붙이지 않아. 라이트는 짙은 인디고, 다크는 밝은 인디고 선·포커스 대비를 맞추고 SVG가 가용 폭에 비례해 줄어 글자 획이 잘리지 않게 해 줘. 모션 감소에서는 네 글자 전체를 즉시 표시해 줘. 외부 글꼴·이미지·타이머·네트워크·별도 제목·설명·재생 횟수 없이 실제 선 글자만 보여 주는 로컬 레터링 시연이야.',
  },
  {
    id: 'search-match-highlight', domain: 'ui', category: 'text',
    titleKo: '검색어 하이라이트', titleEn: 'Search Match Highlight',
    vibeTag: '찾는 글자가 문장 속에서 선명해지는', vibeKeywords: ['검색어 강조', '본문 검색', '매치 하이라이트'],
    summary: '입력한 문자열과 정확히 일치하는 본문 조각을 실시간으로 강조',
    promptSnippet: '지정한 영역에 최대 폭 240px의 본문 검색 프레임을 만들고 위에는 높이 44px 입력창, 아래에는 8px 간격의 본문을 배치해 줘. 입력창의 접근 가능한 이름은 본문에서 찾을 글자, 초기 값은 화면, 최대 길이는 24자이며 왼쪽에는 16px Search SVG, 오른쪽에는 44px 정사각형 지우기 button과 16px X SVG를 둬. 입력창은 14px 글자·좌측 32px·우측 44px 패딩으로 아이콘과 겹치지 않게 해 줘. 실제 본문은 “좋은 화면은 읽기 쉽습니다. 작은 화면에서도 내용은 선명하게 이어집니다.”이고 13px·줄높이 1.65로 표시해 줘. 입력이 바뀔 때 전체 본문을 유지하면서 대소문자·공백을 포함해 정확히 일치하는 문자열을 겹치지 않게 모두 찾아 mark 요소로 감싸 줘. 정규식이나 HTML로 해석하지 않고 문자 그대로 비교하며 빈 입력·일치 없음에서는 강조 없이 전체 본문을 보여 줘. 입력 원문을 HTML로 삽입하지 말고 React 텍스트 노드로 렌더해 줘. 지우기는 입력을 비우고 같은 입력창으로 포커스를 돌리며 이미 비어 있으면 disabled로 표시해 줘. 라이트는 연한 앰버·짙은 갈색, 다크는 밝은 앰버·짙은 문자로 강조 배경 대비를 맞추고 본문·입력·포커스 색도 테마에 맞춰 줘. 본문은 화면 읽기에서 한 번만 읽히고 강조마다 보조 문구를 삽입하지 않아. 좁은 화면의 가용 폭으로 프레임을 줄이고 본문 높이만큼 데모를 늘려 상단 도구와 겹치지 않게 해 줘. 네트워크·타이머·결과 개수·별도 제목·안내문 없이 입력과 본문만 제공하는 로컬 검색 강조 시연이야.',
  },
  {
    id: 'inline-spoiler-text', domain: 'ui', category: 'text',
    titleKo: '인라인 스포일러 텍스트', titleEn: 'Inline Spoiler Reveal',
    vibeTag: '가려진 단어만 눌러서 드러내는', vibeKeywords: ['스포일러 글자', '단어 가리기', '인라인 공개'],
    summary: '문장 안의 가려진 목적지를 같은 크기의 버튼에서 공개·가림 전환',
    promptSnippet: '지정한 영역에 최대 폭 240px의 중앙 정렬 flex 행을 만들고 18px·굵기 550의 “다음 여행은” 문구와 높이 44px인 단어 button을 8px 간격으로 나란히 배치해 줘. 버튼 안에는 20px·굵기 750의 제주도 한 단어만 넣고, 초기에는 단어에 filter blur(5px)·opacity .35·user-select none을 적용해 읽기 어렵게 가려 줘. 버튼은 좌우 9.6px 패딩·8px 모서리·1px 점선 테두리·연한 강조색 표면을 사용해 줘. 클릭·Enter·Space·터치하면 같은 단어를 blur(0)·opacity 1로 250ms ease 전환하고 테두리를 실선으로 바꾸며 글자 선택을 허용해 줘. 다시 누르면 처음처럼 가려지고 빠른 입력은 현재 스타일에서 최신 상태로 이어져야 해. 버튼 DOM·폭·포커스는 유지하고 단어 시각 레이어는 aria-hidden으로 숨겨 중복 낭독을 막아 줘. 접근 가능한 버튼 이름은 가림 상태에서는 가려진 목적지 보기, 공개 상태에서는 제주도 다시 가리기이며 이름이 동작에 따라 바뀌므로 aria-pressed는 사용하지 않아. 라이트는 짙은 강조색, 다크는 밝은 강조색으로 문자·표면·포커스 대비를 맞추고 좁은 폭에서는 행이 줄바꿈 가능하게 해 줘. 모션 감소에서는 상태를 즉시 바꿔 줘. 보안 정보 보호가 아닌 고정된 예시 문구의 시각적 공개 데모이며 비밀번호 입력·네트워크·타이머·별도 제목·안내·횟수는 추가하지 말아 줘.',
  },
  {
    id: 'clamped-read-more-text', domain: 'ui', category: 'text',
    titleKo: '말줄임 펼치기 텍스트', titleEn: 'Clamped Read More Text',
    vibeTag: '두 줄의 미리보기에서 본문으로 이어지는', vibeKeywords: ['여러 줄 말줄임', '본문 펼치기', '더 보기 텍스트'],
    summary: '두 줄 말줄임 본문을 같은 자리에서 펼치고 다시 접는 읽기 패턴',
    promptSnippet: '지정한 영역에 최대 폭 240px의 본문 프레임을 만들고 왼쪽 2px 강조선과 안쪽 12px 간격을 적용해 줘. 실제 본문은 “좋은 화면은 작은 선택에서 시작됩니다. 읽기 쉬운 간격과 선명한 대비가 내용을 자연스럽게 이어 줍니다.” 한 문단이고 글자 14px·줄높이 1.6으로 배치해 줘. 초기에는 display -webkit-box, -webkit-box-orient vertical, -webkit-line-clamp 2, overflow hidden으로 두 줄 끝에 말줄임표를 표시해 줘. 미지원 환경에서도 높이가 두 줄을 넘지 않도록 max-height 3.2em을 함께 두되 전체 원문은 DOM에 유지해 줘. 본문 아래에는 높이 44px 이상의 더 보기 button과 14px Plus SVG를 놓고 4px 간격을 둬. 클릭·Enter·Space·터치하면 같은 문단의 줄임·최대 높이 제한을 제거해 원문 전체를 즉시 펼치고 접기·Minus 아이콘으로 바꿔 줘. 다시 누르면 원래 두 줄로 돌아가며 버튼 DOM과 포커스는 유지해 줘. button의 aria-expanded와 인스턴스마다 고유한 본문 ID에 연결한 aria-controls를 상태와 함께 갱신해 줘. 전체 원문은 시각적으로 접힌 상태에서도 접근성 트리에 남겨 줘. 프레임은 좁은 화면의 가용 폭에 맞춰 줄고 펼친 높이만큼 주변 레이아웃이 늘어나야 해. 라이트·다크의 본문·강조선·버튼·포커스 대비를 맞춰 줘. 데모 상단 44px 도구 공간을 확보하고 별도 제목·안내·횟수·애니메이션·타이머 없이 본문과 읽기 조작만 보여 줘.',
  },
  {
    id: 'split-flap-typography', domain: 'ui', category: 'text',
    titleKo: '스플릿 플랩 타이포', titleEn: 'Split Flap Typography',
    vibeTag: '글자판의 절반이 찰칵 넘어가는', vibeKeywords: ['플랩 글자', '경첩 타이포', '기계식 문자판'],
    summary: '변경된 글자 타일의 위·아래 절반을 시간차로 회전해 새 단어로 교체',
    promptSnippet: '지정한 영역에 폭 192px 이하·높이 88px의 투명한 button을 만들고 너비 48px·높이 66px 글자 타일 세 개를 6px 간격으로 나란히 배치해 줘. 초기 단어는 NEW이고 클릭·Enter·Space·터치마다 NEW→NOW→YES→NEW로 순환해 줘. 각 타일 안쪽의 64px 글자 면을 위·아래 32px로 잘라 상단에는 전체 글자의 위쪽, 하단에는 translateY(-32px) 한 아래쪽을 보여 줘. 글자는 고정폭 40px·굵기 750·줄높이 64px이며 가운데 1px 경첩선을 넣어 줘. 바뀌지 않는 자리는 유지하고 바뀐 자리만 새 상단·이전 하단을 먼저 깐 뒤 이전 상단 플랩을 center bottom 기준 rotateX(0)→-90deg·180ms ease-in으로 접어 줘. 이어 새 하단 플랩을 center top 기준 rotateX(90deg)→0·180ms ease-out·180ms 지연으로 펼쳐 줘. perspective는 400px, backface-visibility hidden, 애니메이션은 both로 시작·최종 상태를 유지해 줘. 빠른 입력은 직전 단어와 최신 단어로 플랩을 다시 만들어 최신 전환만 남기고 버튼과 포커스는 유지해 줘. 버튼 이름에 현재 단어와 플랩 글자 전환 동작을 포함하고 중복되는 글자 면은 aria-hidden으로 숨겨 줘. 모션 감소에서는 이전 상단 플랩을 숨기고 새 단어를 즉시 표시해 줘. 라이트·다크의 타일·글자·경첩선·포커스 대비와 모바일 경계를 맞추며 타이머·소리·외부 글꼴·추가 설명·제목·전환 횟수는 넣지 않는 로컬 문자판 시연이야.',
  },
  {
    id: 'circular-path-text', domain: 'ui', category: 'text',
    titleKo: '원형 패스 타이포', titleEn: 'Circular Path Typography',
    vibeTag: '문구가 원을 따라 천천히 흐르는', vibeKeywords: ['원형 텍스트', '패스 타이포', '회전 글자 배지'],
    summary: 'SVG 원 경로 위의 문구를 회전시키고 가운데 버튼으로 현재 각도에서 정지·재생',
    promptSnippet: '지정한 영역에 112px 정사각형 프레임과 같은 크기의 SVG를 만들어 줘. SVG viewBox는 0 0 120 120이고 defs 안의 원 경로는 M60 16a44 44 0 1 1 0 88a44 44 0 1 1 0-88Z로 구성해 줘. 각 데모 인스턴스마다 고유 경로 ID를 만들고 textPath href로 연결하며 시작 오프셋은 1%로 맞춰 줘. CREATE • EXPLORE • CREATE • EXPLORE • 문구를 글자 11px·굵기 700으로 경로 위에 놓고 textLength 270·lengthAdjust spacing으로 간격을 분배해 줘. 글자 SVG만 view-box 중앙을 기준으로 0→360deg·18초 linear 무한 회전시키고 가운데 44px 원형 button은 움직이지 않게 해 줘. 초기 회전 중에는 일시정지 SVG 아이콘과 CREATE EXPLORE 원형 글자 일시정지 이름을 사용해 줘. 클릭·Enter·Space·터치하면 animation-play-state를 paused로 바꾸고 재생 아이콘·동작 이름으로 바꿔 줘. 다시 누르면 현재 각도에서 running으로 이어가며 SVG나 경로를 새로 만들지 않아. 경로와 장식 텍스트는 접근성 트리에서 숨기고 버튼의 전체 동작 이름으로 문구와 조작을 전달해 줘. 모션 감소에서는 회전 없이 정지된 문구를 보여 주고 조작 버튼의 상태 전환은 유지해 줘. 라이트·다크의 문구·버튼·포커스 대비를 맞추고 원 전체가 카드 경계와 상단 도구 안쪽에 들어오게 해 줘. 별도 타이머·네트워크·제목·설명·재생 횟수 없는 로컬 원형 타이포 시연이야.',
  },
  {
    id: 'word-mask-headline', domain: 'ui', category: 'text',
    titleKo: '단어별 마스크 등장', titleEn: 'Masked Word Headline',
    vibeTag: '제목의 단어들이 차례대로 올라오는', vibeKeywords: ['단어별 등장', '스플릿 타이포', '헤드라인 리빌'],
    summary: '줄 배치는 유지하고 각 단어의 잘림 창 안에서 글자 묶음을 순차 공개',
    promptSnippet: '지정한 영역에 폭 240px 이하·높이 96px의 투명한 button을 만들고 “작은 변화로 완성하는 경험” 한 문장만 담아 줘. 문장을 작은·변화로·완성하는·경험의 네 단어로 나누고 각각 inline-block·overflow hidden의 마스크에 넣어 줘. 글자는 22.4px·굵기 780·줄높이 1.4, 마스크 양옆 간격은 .12em이며 중앙 정렬과 text-wrap balance로 두 줄의 길이를 맞춰 줘. 줄바꿈은 마스크 사이에서만 일어나고 단어 안은 나누지 않아. 마운트 때 각 단어를 translateY(110%)·rotate(4deg)에서 translateY(0)·rotate(0)으로 550ms cubic-bezier(.16,1,.3,1) 한 번 올려 줘. transform-origin은 left bottom, 단어 지연은 0/80/160/240ms이며 both 채움 모드로 지연 중에도 시작 위치를 유지하고 완료 후 최종 위치에 머물게 해 줘. 바깥 버튼 클릭·Enter·Space·터치마다 안쪽 문장 묶음만 새 키로 교체해 처음부터 재생하고 버튼 DOM과 키보드 포커스는 유지해 줘. 빠른 입력은 직전 재생을 새 문장 묶음으로 교체해 최신 재생만 남겨 줘. 보이는 단어 마스크는 aria-hidden으로 숨기고 버튼 이름에는 전체 문장과 등장 재생 동작을 포함해 줘. 모션 감소에서는 모든 단어를 즉시 최종 위치로 표시해 줘. 밝은 테마의 짙은 문자와 어두운 테마의 밝은 문자·포커스 대비, 좁은 화면에서 두 줄의 경계를 맞춰 줘. 타이머·문자 하나씩 추가·별도 설명·제목·재생 횟수 없이 실제 문장만 보여 주는 로컬 헤드라인 시연이야.',
  },
  {
    id: 'outline-fill-text', domain: 'ui', category: 'text',
    titleKo: '아웃라인 채움 텍스트', titleEn: 'Outline to Fill Text',
    vibeTag: '글자 윤곽 안으로 색이 차오르는', vibeKeywords: ['글자 윤곽선', '텍스트 채움', '아웃라인 타이포'],
    summary: '고정된 텍스트 윤곽 위로 같은 글자의 채움 레이어를 왼쪽부터 공개',
    promptSnippet: '지정한 영역에 폭 240px 이하·높이 80px인 투명한 button을 만들고 중앙에 CREATE 한 단어만 배치해 줘. 글자는 44px·줄높이 1.2·굵기 850·자간 .035em으로 고정하고 웹폰트나 외부 이미지는 불러오지 않아. 기본 레이어는 -webkit-text-stroke 1.2px와 투명한 글자색으로 윤곽만 보이게 해 줘. 같은 단어의 ::after 레이어를 absolute inset 0에 정확히 겹치고 윤곽선 없이 강조색으로 채워 줘. 초기 aria-pressed는 false이며 채움 레이어의 clip-path는 inset(0 100% 0 0)이야. 클릭·Enter·Space·터치하면 aria-pressed를 토글하고 clip-path를 inset(0)까지 500ms cubic-bezier(.2,.8,.2,1)로 바꿔 왼쪽부터 글자 속이 채워지게 해 줘. 다시 누르면 같은 경로로 윤곽만 남게 하고 빠른 재입력은 현재 잘림 위치에서 새 상태로 이어지게 해 줘. 글자 위치·크기와 버튼 외곽은 움직이지 않으며 버튼 이름 CREATE 채움 전환은 유지해 줘. 중복 시각 레이어는 접근성 트리에서 숨겨 줘. 윤곽선 기능을 지원하지 않으면 기본 글자색으로 내용은 읽을 수 있게 유지해 줘. 라이트는 짙은 인디고, 다크는 밝은 인디고 윤곽·채움과 포커스 윤곽으로 대비를 맞추고 좁은 화면에서도 단어가 잘리지 않게 해 줘. 모션 감소에서는 채움 상태를 즉시 반영하며, 별도 안내·제목·조작 횟수·실제 제출 동작이나 타이머는 추가하지 않는 로컬 타이포그래피 시연이야.',
  },
  {
    id: 'per-digit-rolling-counter', domain: 'ui', category: 'text',
    titleKo: '자리별 롤링 카운터', titleEn: 'Per Digit Rolling Counter',
    vibeTag: '바뀌는 숫자 자리만 또르르 넘어가는', vibeKeywords: ['숫자 자리 전환', '롤링 카운터', '캐리 애니메이션'],
    summary: '올림·내림에서 바뀐 자리만 이전 숫자와 새 숫자를 반대로 이동',
    promptSnippet: '지정한 영역에 폭 240px 이하의 한 행을 만들고 왼쪽에 44px 빼기 button, 중앙에 세 자리 숫자 창, 오른쪽에 44px 더하기 button을 배치해 줘. 초기 값은 199이고 각 버튼의 클릭·Enter·Space·터치마다 1씩 줄이거나 늘리되 0~999로 제한해 줘. 숫자는 고정폭·tabular-nums·32px 글자·1.2 줄높이로 표시하고 세 자리보다 짧으면 앞을 0으로 채워 외곽 너비가 흔들리지 않게 해 줘. 각 자리에는 1ch 너비·1.2em 높이의 overflow hidden 창을 두고 이전 값과 새 값을 비교해 바뀐 자리만 이전·현재 두 숫자를 겹쳐 줘. 증가할 때 이전 숫자는 translateY(0)→-100%, 새 숫자는 100%→0으로 320ms cubic-bezier(.2,.8,.2,1) 이동하고 감소할 때는 방향을 반대로 해 줘. 199→200처럼 올림이 생기면 바뀐 세 자리 모두 움직이고 200→201에서는 마지막 자리만 움직여 줘. 빠른 입력은 직전 값과 최신 값으로 각 자리의 전환을 다시 시작하며 값을 잃지 않게 해 줘. 경계 버튼은 포커스를 유지하는 aria-disabled와 핸들러 제한을 함께 적용해 줘. 움직이는 숫자들은 aria-hidden으로 숨기고 별도의 화면 읽기용 현재 값을 polite·atomic으로 전달해 줘. 모션 감소에서는 이전 숫자를 숨기고 최신 숫자만 즉시 표시해 줘. 라이트·다크 표면·문자·포커스 대비와 좁은 화면 경계를 맞추고 타이머·네트워크·별도 제목·안내·조작 횟수는 추가하지 않는 숫자 디자인 시연이야.',
  },
];
