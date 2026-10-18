import type { TechniqueItem } from '../techniques';

export const FEEDBACK_ADDITIONS: TechniqueItem[] = [
  {
    id: 'linked-form-error-summary', domain: 'ui', category: 'feedback',
    titleKo: '입력 연결 오류 요약', titleEn: 'Linked Form Error Summary',
    vibeTag: '오류 목록에서 고칠 입력으로 바로 이어지는', vibeKeywords: ['오류 요약', '폼 검증', '오류 링크'],
    summary: '폼의 오류를 한곳에 모으고 해당 입력으로 포커스를 연결해 수정하는 패턴',
    promptSnippet: '지정한 영역에 최대 폭 240px·세로 12px 간격의 로컬 form을 만들어 줘. 이름 input과 type email 입력에 각각 실제 label·인스턴스별 고유 ID·required를 연결하고 autoComplete off와 form noValidate로 기본 오류 팝업 대신 커스텀 요약을 사용해 줘. 두 입력은 처음 비어 있고 높이 44px·테마 표면·1px 중립 테두리·10.4px 모서리이며 입력 확인 submit button도 최소 높이 44px로 만들어 줘. 첫 확인 전에는 오류나 성공 표시가 없어. 확인 시 브라우저의 각 input.validity.valid를 읽고 이름이 유효하지 않으면 이름을 입력해 주세요., 이메일이 비면 이메일을 입력해 주세요., 값이 있으나 유효하지 않으면 이메일 형식을 확인해 주세요.를 사용해 줘. 오류가 있으면 폼 맨 위에 2px 위험색 테두리·10px 패딩·10.4px 모서리의 role alert·tabindex -1 요약을 만들고 포커스를 옮겨 줘. 요약은 16px CircleAlert SVG와 입력 확인 필요 문구, 오류별 ul/li/a로 구성하며 각 링크는 최소 높이 44px의 밑줄 문자로 보여 줘. 링크 href는 해당 input ID를 가리키고 클릭·Enter 시 페이지 해시를 바꾸지 않고 해당 입력으로 포커스를 옮겨 줘. 각 오류 문구를 해당 입력 아래에도 같은 원문으로 표시하고 aria-invalid·aria-describedby로 연결해 줘. 첫 확인 이후 편집은 입력값을 보존한 채 현재 validity로 모든 오류를 갱신하고 요약으로 포커스를 빼앗지 않아. 오류를 모두 고치면 요약·각 오류·오류 연결을 제거하고 입력 확인 버튼에 초록 16px Check SVG와 초록 테두리만 보여 줘. 이후 재확인에서 다시 오류가 생기면 요약을 복원하고 다시 포커스하며, 정상 확인에서는 현재 포커스를 유지해 줘. 같은 input DOM·커서·원문을 유지하고 초기 마운트에는 자동 포커스를 하지 않아. 라이트·다크 위험색·본문·초록 표시·2px 포커스 윤곽, 44px 조작과 좁은 화면·상단 도구 간격을 맞추고 내용에 맞게 데모 높이를 늘려 줘. 이는 required·이메일 형식만 확인하는 로컬 시연으로 실제 이름·주소 존재·인증·저장·전송 성공을 의미하지 않아. 입력값을 서버나 저장소로 보내지 않고 타이머·애니메이션·별도 설명·성공 문구·실행 횟수는 추가하지 말아 줘.',
  },
  {
    id: 'character-budget-feedback', domain: 'ui', category: 'feedback',
    titleKo: '글자 수 예산 피드백', titleEn: 'Character Budget Feedback',
    vibeTag: '입력한 만큼 남은 양이 바로 보이는', vibeKeywords: ['글자 수 피드백', '남은 글자', '초과 입력'],
    summary: '입력 원문을 보존하면서 40자 기준의 남은 양과 초과 상태를 즉시 표시',
    promptSnippet: '지정한 영역에 최대 폭 240px의 메모 입력 필드를 만들어 줘. 실제 메모 label과 인스턴스별 고유 ID의 textarea를 연결하고 첫 값은 비워 줘. textarea는 메모 입력 placeholder·너비 100%·최소 높이 72px·최대 높이 160px·세로 크기 조절·상하 8px 좌우 12px 패딩·1px 중립 테두리·10.4px 모서리·13px 글자·줄높이 1.5를 사용해 줘. 아래 6px 간격 오른쪽에 12px tabular-nums 숫자와 상태 문구 하나만 배치해 줘. 값의 Array.from(value).length로 유니코드 코드포인트 수를 세고 40에서 뺀 값이 0 이상이면 N자 남음, 음수이면 양수로 표시한 N자 초과를 보여 줘. 초기 40자 남음, 정확히 40자면 0자 남음이며 초과에서만 위험색·굵은 문자·위험색 입력 테두리·aria-invalid true로 바꿔 줘. 문자 수 문구의 고유 ID를 textarea aria-describedby로 항상 연결해 현재 남음·초과를 색 이외의 텍스트로도 전달해 줘. 입력·붙여넣기·줄바꿈·IME 조합 중에도 같은 textarea와 원문·커서를 유지하고 maxlength·문자열 자르기·입력 차단을 하지 않아. 초과한 원문을 지워 범위 안으로 돌아오면 즉시 중립 상태로 복원해 줘. 공백과 줄바꿈도 각각 세며 단일 코드포인트 이모지는 1, 여러 코드포인트로 이뤄진 결합 이모지는 여러 자로 세는 예시 기준이야. 라이트·다크 표면·본문·중립 문자·위험색·2px 포커스 윤곽 대비를 맞추고 변경된 높이를 포함해 좁은 화면과 상단 도구 안쪽에 들어오게 해 줘. 40자는 로컬 시연 기준이며 서버 제한·제출·저장·타이머·별도 제목·부가 설명·실행 횟수·애니메이션은 추가하지 말아 줘.',
  },
  {
    id: 'recoverable-search-empty-state', domain: 'ui', category: 'feedback',
    titleKo: '검색 빈 상태와 복귀', titleEn: 'Recoverable Search Empty State',
    vibeTag: '결과가 없어도 다음 조작이 이어지는', vibeKeywords: ['검색 결과 없음', '빈 상태', '검색 초기화'],
    summary: '실제 검색 결과가 비었을 때 간결한 안내와 검색어 지우기로 목록을 복원',
    promptSnippet: '지정한 영역에 최대 폭 240px의 작은 검색 결과 프레임을 만들어 줘. 노트 검색 이름·placeholder를 가진 높이 44px input, 왼쪽 12px·위 14px의 16px Search SVG, 8px 아래의 최소 높이 124px 결과 영역을 배치해 줘. 입력은 왼쪽 패딩 36px·오른쪽 12px·최대 40자·자동완성 및 철자 검사 꺼짐이며 첫 값은 바다야. 로컬 예시 목록은 산책 노트와 빛 기록 두 개이고 query.trim()을 포함하는 항목만 원래 순서대로 즉시 필터해 줘. 정규식이나 HTML로 해석하지 않아. 처음에는 일치 항목이 없으므로 1px 중립 점선·12px 모서리·8px 패딩·테마 표면의 중앙 빈 상태를 보여 줘. 24px SearchX SVG, role status의 검색 결과 없음 문구, 최소 높이 44px 검색 지우기 button을 세로 6px 간격으로 배치해 줘. 검색 지우기를 클릭·Enter·Space·터치하면 입력을 비우고 같은 input으로 포커스를 옮겨 전체 목록을 복원해 줘. 결과가 있으면 빈 상태와 버튼을 DOM에서 제거하고 실제 ul/li에 각각 16px FileText SVG와 노트 이름을 보여 줘. 행은 최소 높이 44px·8px 간격·1px 테두리·8px 모서리이며 빈 검색어와 공백뿐인 검색어는 두 항목 모두 보여 줘. 검색 결과가 다시 비면 같은 빈 상태로 돌아가며 입력 DOM과 편집 포커스는 유지해 줘. 라이트·다크 표면·글자·중립선·인디고 조작·포커스 윤곽 대비를 맞추고 전체 프레임의 실제 높이에 맞춰 영역을 늘려 좁은 화면과 상단 도구에 겹치지 않게 해 줘. 안내는 실제 결과 없음 문구 하나뿐이며 별도 제목·설명·결과 개수·실행 횟수·타이머·애니메이션·네트워크는 추가하지 말아 줘.',
  },
  {
    id: 'inline-copy-feedback', domain: 'ui', category: 'feedback',
    titleKo: '인라인 복사 체크', titleEn: 'Inline Clipboard Feedback',
    vibeTag: '복사한 자리에서 체크로 응답하는', vibeKeywords: ['클립보드 복사', '복사 체크', '코드 복사'],
    summary: '실제 클립보드 복사의 대기·성공·실패를 코드 옆 고정 아이콘으로 표시',
    promptSnippet: '지정한 영역 중앙에 최대 폭 240px의 인라인 코드 복사 필드를 만들어 줘. 필드는 테마 표면색·1px 중립 테두리·12px 모서리·4px 패딩·8px 간격의 flex이며 npm run build 원문을 12px code로 표시해 줘. 코드는 flex 1·min-width 0·왼쪽 패딩 8px·긴 문자열 줄바꿈을 사용하고 오른쪽 button은 줄어들지 않는 44px 정사각형으로 유지해 줘. 초기에는 18px Copy SVG와 빌드 명령어 복사 이름을 쓰고 클릭·Enter·Space·터치 시 navigator.clipboard.writeText로 표시한 명령어 그대로 실제 복사해 줘. 대기 중에는 고정된 18px LoaderCircle SVG·aria-busy·aria-disabled와 복사 중 이름을 표시하며 핸들러에서도 중복 요청을 막아 줘. Promise가 성공한 뒤에만 초록 Check SVG·복사됨 이름을 표시하고 1500ms 후 초기 아이콘으로 돌아가게 해 줘. API 부재·권한 거부·실패 시에는 위험색 CircleAlert SVG와 복사 실패, 다시 시도 이름을 유지하고 재시도를 허용해 줘. 성공·실패 결과는 화면 읽기용 role status로 전달하되 별도 시각 문구·토스트·제목·실행 횟수는 추가하지 않아. 같은 button과 포커스를 유지하고 라이트의 연한 인디고·다크의 어두운 인디고 버튼 표면, 아이콘 대비와 2px 포커스 윤곽을 맞춰 줘. 기존 공용 복사 훅이 있으면 재사용하며 원문 변경·언마운트 후 이전 Promise 결과를 무시하고 타이머를 정리해 줘. 좁은 화면 경계와 상단 도구 안쪽에 전체 필드를 배치하며 애니메이션이나 가짜 복사 성공은 추가하지 말아 줘.',
  },
  {
    id: 'inline-delete-confirmation', domain: 'ui', category: 'feedback',
    titleKo: '인라인 삭제 확인', titleEn: 'Inline Delete Confirmation',
    vibeTag: '실행 전에 같은 자리에서 한 번 더 고르는', vibeKeywords: ['인라인 확인', '삭제 취소', '두 단계 액션'],
    summary: '항목 옆 삭제 요청을 취소·확인 조작으로 바꾸고 확인한 경우에만 예시 항목을 제거',
    promptSnippet: '지정한 영역에 최대 폭 240px·최소 높이 72px 프레임을 만들고 처음에는 높이 68px 이상의 예시 항목을 보여 줘. 항목은 1px 테두리·12px 모서리·8px 패딩·테마 표면색이며 20px FileText SVG, 초안 이름, 44px 삭제 button을 8px 간격 grid로 배치해 줘. 삭제 버튼 이름은 초안 삭제이고 18px Trash2 SVG를 사용해 줘. 클릭·Enter·Space·터치로 삭제를 요청하면 항목과 이름은 유지하고 오른쪽만 취소·삭제의 두 44px button으로 바꿔 줘. 이 묶음은 role group·초안 삭제 확인 이름으로 연결하고 항목 테두리를 위험색으로 바꿔 줘. 취소는 중립색, 삭제는 라이트의 짙은 장미색·흰 글자와 다크의 밝은 장미색·짙은 글자로 구분해 줘. 확인 단계 진입 시 취소로 포커스를 옮겨 연속 Enter가 곧바로 삭제를 실행하지 않게 해 줘. 취소나 Escape는 초기 상태로 돌아가 삭제 버튼에 포커스를 돌려주고, 삭제 확인을 누른 경우에만 항목을 DOM에서 제거해 줘. 제거 후에는 중앙의 44px 초안 다시 표시 button과 18px RotateCcw SVG만 보여 주고 이 버튼으로 포커스를 옮겨 줘. 다시 표시하면 초기 항목을 복원하고 삭제 버튼에 포커스를 돌려줘. 첫 마운트 때는 자동 포커스를 하지 않아. 이름과 중립·위험 조작의 대비, 각 조작의 포커스 윤곽과 좁은 화면 경계를 맞추고 상단 도구와 겹치지 않게 해 줘. 실제 파일이나 서버 데이터를 삭제하지 않는 로컬 예시 항목 시연이며 타이머·자동 확정·별도 제목·질문·성공 메시지·실행 횟수·애니메이션은 추가하지 말아 줘.',
  },
  {
    id: 'dismissible-inline-banner', domain: 'ui', category: 'feedback',
    titleKo: '닫을 수 있는 인라인 알림', titleEn: 'Dismissible Inline Banner',
    vibeTag: '필요한 안내를 한 줄 영역에 담는', vibeKeywords: ['인라인 알림', '알림 닫기', '경고 배너'],
    summary: '맥락 알림을 닫거나 다시 표시할 때 다음 조작으로 포커스를 이어 주는 패턴',
    promptSnippet: '지정한 영역에 최대 폭 240px·최소 높이 72px의 중앙 프레임을 만들고 처음에는 인라인 안내를 표시해 줘. 안내는 1px 앰버 테두리·왼쪽 4px 강조선·10.4px 모서리·상하좌우 8px 패딩·최소 높이 68px이며 20px TriangleAlert SVG, 검토할 변경 사항이 있어요. 문단, 44px 정사각형 닫기 button을 8px 간격의 3열 grid로 배치해 줘. 문단 열은 minmax(0,1fr), 글자는 12.5px·줄높이 1.5·단어 유지 줄바꿈이며 문단에 role status를 적용해 줘. 닫기 button 이름은 안내 닫기이고 16px X SVG만 담아 줘. 클릭·Enter·Space·터치로 닫으면 안내와 문단을 DOM에서 제거하고 같은 프레임 중앙에 44px 안내 다시 표시 button과 20px BellPlus SVG를 보여 줘. 닫은 직후 다시 표시 버튼으로 포커스를 옮기고, 다시 표시를 누르면 같은 안내를 복원하면서 새 닫기 버튼으로 포커스를 옮겨 줘. 첫 마운트 때는 자동 포커스를 하지 않아. 라이트는 연한 앰버 표면과 짙은 갈색 문자, 다크는 어두운 앰버 표면과 밝은 크림 문자로 구분하고 두 조작의 포커스 표시를 유지해 줘. 아이콘은 aria-hidden으로 숨기고 전체 알림과 44px 조작이 좁은 화면 경계·상단 도구 안쪽에 들어오게 해 줘. 고정된 예시 안내를 로컬로 닫고 복원하는 시연이며 실제 변경 감지·제출·타이머·자동 숨김·별도 제목·설명·실행 횟수·애니메이션은 추가하지 말아 줘.',
  },
  {
    id: 'native-star-rating', domain: 'ui', category: 'feedback',
    titleKo: '별점 라디오 입력', titleEn: 'Native Star Rating',
    vibeTag: '고른 점수까지 별이 채워지는', vibeKeywords: ['별점 피드백', '스타 레이팅', '평점 선택'],
    summary: '네이티브 라디오로 1~5점을 선택하고 선택 점수까지 별을 채우는 입력',
    promptSnippet: '지정한 영역에 너비 220px 이하의 fieldset과 화면 읽기용 legend 별점 선택을 만들고, 1~5점의 네이티브 input type radio를 같은 고유 name으로 묶어 줘. 다른 데모 인스턴스와 name이 겹치지 않게 하며 초기에는 아무 점수도 선택하지 않아. 각 radio는 1점~5점 이름을 가지고 시각적으로만 sr-only로 숨기되 키보드 포커스와 네이티브 선택 동작을 유지해 줘. radio를 감싸는 label은 각각 44px 정사각형 터치 영역이며 안쪽 36px 프레임 중앙에 26px Star SVG를 배치해 줘. 선택된 radio 하나만 checked가 되고 해당 점수 이하의 별은 currentColor로 채우며 나머지는 같은 색 윤곽만 남겨 줘. 클릭·터치·Space·방향키 선택과 Tab 그룹 이동은 네이티브 radio에 맡기고 별도 keydown이나 로빙 tabindex를 구현하지 않아. 키보드 포커스는 해당 별 프레임에 1px 간격의 2px currentColor 윤곽으로 보여 줘. 라이트는 짙은 앰버 #b45309, 다크는 밝은 앰버 #fcd34d 별을 사용하고 호버 표면도 테마에 맞춰 줘. 별 SVG는 aria-hidden으로 숨기고 점수의 의미는 실제 radio 이름·checked로 전달해 줘. 좁은 폭에서도 44px 조작 영역을 줄이지 않고 가용 폭이 220px 미만이면 label 행이 줄바꿈되게 해 줘. 선택을 낮추거나 높여도 각 input과 포커스는 유지하며 외곽·상단 도구와 겹치지 않게 해 줘. 실제 평가 제출·서버 저장·타이머·별도 제목·점수 설명·실행 횟수·초기화 버튼 없이 별 다섯 개만 보여 주는 로컬 별점 시연이야.',
  },
  {
    id: 'hover-focus-tooltip', domain: 'ui', category: 'feedback',
    titleKo: '호버·포커스 툴팁', titleEn: 'Hover Focus Tooltip',
    vibeTag: '아이콘 위로 짧은 정보가 떠오르는', vibeKeywords: ['호버 툴팁', '아이콘 도움말', '포커스 안내'],
    summary: '마우스·키보드·탭으로 아이콘 관련 정보를 열고 포커스·포인터 이탈에 맞춰 닫기',
    promptSnippet: '지정한 영역에 폭 176px 이하·높이 104px의 상대 위치 프레임을 만들고 하단 중앙에 44px 정사각형 button과 20px Settings2 SVG를 배치해 줘. 버튼 이름은 화면 설정 안내이며 위에는 밝기와 글자 크기 문구의 비대화형 툴팁만 표시해 줘. 초기에는 툴팁을 opacity 0·visibility hidden·translate(-50%,4px)·aria-hidden true로 숨겨 줘. 마우스 포인터가 버튼에 진입하거나 버튼이 키보드 포커스를 받거나 클릭·Enter·Space·터치되면 열어 줘. 열림은 opacity 1·visibility visible·translate(-50%,0)으로 150ms ease 전환하며 버튼 위 12px 간격에 툴팁을 놓아 줘. 툴팁은 left 50%·bottom 56px·글자 12px·줄높이 1.5·상하 8px 좌우 12px 패딩·8px 모서리이며 아래 중앙에 같은 색 6px 마름모 꼬리를 붙여 줘. 트리거와 툴팁 사이 프레임을 지나갈 때는 열림을 유지하고 포인터가 프레임을 벗어나면 닫되 버튼에 포커스가 있으면 유지해 줘. blur·Escape·프레임 밖 pointerdown은 닫고 포커스는 임의로 옮기지 않아. Escape 뒤 같은 포커스에서 자동으로 다시 열리지 않으며 버튼을 다시 누르면 열려야 해. 닫힘은 150ms 뒤 visibility hidden으로 전환하되 aria-hidden은 즉시 true로 바꿔 줘. 인스턴스별 고유 ID·role tooltip을 사용하고 열렸을 때만 버튼 aria-describedby로 연결해 줘. 툴팁 안에는 포커스 가능한 조작을 넣지 않아. 라이트는 짙은 툴팁·흰 글자, 다크는 밝은 툴팁·짙은 글자와 명확한 버튼 포커스를 사용해 줘. 좁은 화면과 상단 도구 안쪽에 전체 프레임이 들어오고 모션 감소에서는 즉시 전환해 줘. 실제 설정 변경·외부 서비스·타이머·별도 제목·추가 안내·실행 횟수 없이 관련 정보만 보여 주는 로컬 툴팁 시연이야.',
  },
  {
    id: 'unread-notification-badge', domain: 'ui', category: 'feedback',
    titleKo: '읽지 않은 알림 배지', titleEn: 'Unread Notification Badge',
    vibeTag: '벨 위의 작은 배지가 읽음 상태를 알리는', vibeKeywords: ['알림 배지', '읽지 않음', '벨 카운트'],
    summary: '벨 버튼의 알림 수 배지를 읽음 상태와 함께 제거·복원',
    promptSnippet: '지정한 영역 중앙에 64px 정사각형 button을 놓고 26px Bell SVG만 담아 줘. 버튼은 17.6px 모서리·1px 강조색 테두리·테마 표면색이며 포커스에는 바깥 4px 간격의 2px 윤곽을 표시해 줘. 초기에는 읽지 않은 예시 알림 3개를 나타내는 배지를 오른쪽 -5px·위 -5px에 겹쳐 줘. 배지는 최소 폭 22px·높이 22px·좌우 4px 패딩·2px 표면색 테두리·둥근 캡슐·11px 굵은 숫자 3이며 처음 나타날 때 scale .5·opacity 0→scale 1·opacity 1을 280ms cubic-bezier(.2,.8,.25,1.3)로 한 번 재생해 줘. 클릭·Enter·Space·터치하면 예시 알림을 읽음으로 바꿔 배지를 DOM에서 제거하고 벨과 테두리를 중립색으로 200ms ease 전환해 줘. 다시 누르면 처음의 3개 배지를 새로 표시하고 같은 등장 모션을 재생해 줘. 바깥 버튼과 포커스는 유지하며 빠른 재입력은 최신 읽음 상태만 반영해 줘. 버튼 이름은 읽지 않은 알림 3개, 모두 읽음으로 표시와 읽지 않은 알림 없음, 알림 다시 표시 사이에서 바꾸고 SVG와 시각 배지는 aria-hidden으로 숨겨 숫자를 중복 낭독하지 않아. 라이트는 짙은 장미색·흰 배지 문자, 다크는 밝은 장미색·짙은 배지 문자로 대비를 맞춰 줘. 배지와 포커스가 좁은 화면의 카드 경계·상단 도구 안쪽에 들어오게 해 줘. 모션 감소에서는 상태를 즉시 표시해 줘. 실제 서버 알림이나 메시지를 읽지 않는 로컬 배지 시연이며 타이머·알림 목록·별도 제목·안내·실행 횟수는 추가하지 말아 줘.',
  },
  {
    id: 'inline-email-validation', domain: 'ui', category: 'feedback',
    titleKo: '인라인 입력 검증', titleEn: 'Inline Input Validation',
    vibeTag: '고친 자리에서 바로 피드백을 받는', vibeKeywords: ['인라인 검증', '입력 오류', '이메일 검사'],
    summary: '입력창 이탈 후 오류를 표시하고 수정할 때 같은 자리에서 피드백을 갱신',
    promptSnippet: '지정한 영역에 최대 폭 240px의 이메일 입력 필드를 만들어 줘. 실제 label은 이메일이며 인스턴스마다 고유한 input ID와 htmlFor로 연결해 줘. 입력은 type email·required·높이 44px·글자 14px·오른쪽 패딩 36px이고 초기 값은 비어 있어. 처음에는 오류나 상태 아이콘을 표시하지 않으며, 첫 blur 이후부터 브라우저의 input.validity.valid로 검사해 줘. 비었으면 이메일을 입력해 주세요., 값이 있으나 유효하지 않으면 이메일 형식을 확인해 주세요.를 12px·줄높이 1.5·상단 간격 6px의 오류 문구로 보여 줘. 오류에서는 입력 테두리와 16px CircleAlert SVG를 오류색으로 바꾸고 aria-invalid true·고유 오류 ID의 aria-describedby·오류 문구 role alert를 함께 연결해 줘. 첫 검사 이후에는 입력이 바뀔 때마다 같은 브라우저 유효성 결과로 즉시 갱신하며, 유효해지면 오류 문구·오류 연결을 제거하고 초록 테두리와 16px Check SVG만 표시해 줘. 다시 비우거나 잘못 입력하면 해당 오류로 돌아가고 입력 DOM·포커스·커서 위치는 유지해 줘. 아이콘은 입력 오른쪽 12px·위 14px에 놓고 aria-hidden·pointer-events none으로 처리해 줘. 라이트·다크의 표면·문자·오류·유효 색상과 포커스 대비를 맞추고 가용 폭과 오류 높이에 맞춰 데모를 늘려 상단 도구와 겹치지 않게 해 줘. 이메일 형식만 검사하는 로컬 피드백이며 실제 주소 존재·인증·저장 성공을 의미하지 않아. 네트워크·제출·타이머·별도 제목·안내·실행 횟수는 추가하지 말아 줘.',
  },
];
