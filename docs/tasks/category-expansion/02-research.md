# 카테고리 확장 선정 근거

2026-10-18 조사. 기존 카탈로그와 대조해 이름만 다른 같은 효과를 늘리지 않고, 빠져 있는 조작 패턴과 시각 기법을 추가한다.

## 근거

- [Webflow: 2026 web design trends](https://webflow.com/blog/web-design-trends-2026) (2026-01-08): 의도 있는 상호작용, 표현적인 타이포그래피, 스크롤 길잡이, 점 격자와 노드를 활용한 캔버스 표현을 소개한다.
- [Apple: Meet Liquid Glass](https://developer.apple.com/videos/play/wwdc2025/219/): 콘텐츠 위 조작 레이어의 투과 소재와 명암 적응을 설명한다. 웹 CSS 근사 데모를 네이티브 소재와 동등하다고 표현하지 않는다.
- [Carbon: Button guidelines](https://www.carbondesignsystem.com/building-blocks/core/components/button/guidelines): 동작을 설명하는 라벨, 주·보조 동작 구분, 포커스와 상태 기준을 참고한다. 장식뿐 아니라 누락된 기본 조작도 우선 선정한다.

## 구현 판단

기존 유리 카드·리퀴드 아크릴·벤토 그리드·커맨드 팔레트 등은 재추가하지 않는다. 기법 데이터·데모·프롬프트를 한 묶음으로 추가하고 카테고리별 파일로 분리한다. 기존 React와 브라우저 기능을 사용하며 새로운 라이브러리나 API를 도입하지 않아 Context7 조회는 생략했다.

카테고리별 10개씩 총 250개 추가와 검증을 완료했다. 최종 검증 범위와 한계는 문서 마지막에 기록했다. 작업 중 사용한 원시 검증 로그와 항목별 진행 기록은 로컬 정리 과정에서 삭제했다.

## 카드 패턴 선정

2026-10-18에 기존 카드 5종과 대조했다. [Carbon 타일 지침](https://v10.carbondesignsystem.com/components/tile/usage/)의 단일·복수 선택, 펼침, 왼쪽 정렬과 [Webflow의 폴드아웃 카드](https://webflow.com/blog/how-to-build-an-interactive-fold-out-card-in-webflow)의 점진적 정보 공개를 참고한다. 이 자료를 최신 유행 순위로 단정하지 않고 누락된 실무 패턴의 근거로 사용한다. 기존 회전·틸트·유리·스포트라이트·스택 순환은 재추가하지 않는다. 카드 자체의 콘텐츠와 조작만 표시하고 별도 데모 안내·실행 카운터는 넣지 않는다.

## 등장·상태전환 선정

[Carbon 모션 안무](https://www.carbondesignsystem.com/building-blocks/foundations/motion/choreography)(2026-08-12 갱신)와 [web.dev의 SPA 전환](https://web.dev/learn/css/view-transitions-spas)을 확인했다. 이동 방향, 요소의 연속성, 진입·퇴장의 의미와 모션 감소를 기준으로 기존 팝·순차 등장·아코디언·버튼 상태·부유 효과에 없는 패턴을 선정한다. 여러 데모가 동시에 보이는 카탈로그에서는 전역 문서 스냅샷의 간섭을 피하기 위해 필요한 요소에만 CSS 또는 Web Animations API를 적용한다. API 미지원에서도 최종 상태는 동작하게 한다.

[MDN clip-path 문서](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path)의 기본 도형 보간 조건을 확인해 아이콘 모핑에는 조각별 꼭짓점 수를 동일하게 유지한다. 외부 아이콘 이미지나 새 라이브러리 없이 CSS 도형의 실제 보간을 시연한다.

[Carbon 팝오버 지침](https://www.carbondesignsystem.com/building-blocks/core/components/popover/guidelines)(2026-09-30 갱신)의 트리거와 정보 창 연결·배치 기준과 [MDN transform-origin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin)을 참고해 버튼 쪽 기준점에서 확대되는 정보 창을 추가한다. 전역 포털 대신 카드 내부의 한정된 프레임에서 보여 주는 로컬 모션 시연이며, 별도 권한 조회나 변경 기능은 없다.

## 텍스트·카운터 선정

기존 타이핑·스크램블·그라데이션·단순 카운트업·마커와 그래픽 도메인의 웨이브·3D 롤러를 대조한다. Webflow의 2026 타이포그래피 흐름을 참고하되 이름만 다른 효과는 추가하지 않는다. [MDN 숫자 글꼴 기능](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-variant-numeric)의 tabular-nums를 참고해 자리별 롤링 숫자는 너비가 흔들리지 않게 하고, 시각 애니메이션과 읽기용 최신 값을 분리한다. 숫자 자체가 디자인 콘텐츠이며 별도의 실행 횟수는 표시하지 않는다.

[MDN 텍스트 윤곽선](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-text-stroke)의 지원 방식과 clip-path를 참고해 윤곽→채움 타이포그래피를 추가한다. 미지원에서도 글자가 사라지지 않게 기본 글자색을 남기고, 같은 글자 레이어의 위치를 유지한 채 잘림만 바꾼다.

[MDN text-wrap](https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap)의 짧은 제목 줄 균형 기준을 참고해 단어별 마스크 헤드라인의 줄 길이를 맞춘다. 줄 전체를 올리는 기존 패널과 달리 단어별 고정된 마스크에서 시간차로 공개하며, 문장을 한 글자씩 추가하거나 화면에 재생 횟수를 표시하지 않는다.

[MDN SVG textPath](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/textPath)의 경로 참조·startOffset·textLength·lengthAdjust를 확인해 빠져 있던 원형 패스 타이포를 추가한다. 인스턴스별 경로 ID를 분리하고 CSS 회전만 일시정지해 같은 위치에서 재개한다. 별도 안내나 카운터는 붙이지 않는다.

[MDN perspective](https://developer.mozilla.org/en-US/docs/Web/CSS/perspective)와 [backface-visibility](https://developer.mozilla.org/en-US/docs/Web/CSS/backface-visibility)를 대조해 스플릿 플랩 타일의 위·아래 회전면을 구현한다. 단어 전체를 회전하는 기존 3D 롤러와 구분해 바뀐 글자의 절반만 순서대로 교체하고, 모션 감소에서는 최신 면만 즉시 보인다.

[MDN line-clamp](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/line-clamp)를 확인해 빠져 있던 여러 줄 본문 미리보기·펼치기 패턴을 추가한다. 표준 속성만의 지원 범위를 가정하지 않고 명시된 접두사 조합과 높이 제한을 사용한다. 전체 원문을 유지하며 실제 본문과 읽기 버튼만 표시한다.

[WAI 버튼 패턴](https://www.w3.org/WAI/ARIA/apg/patterns/button/)의 동작 이름 변경·키보드·포커스 규칙을 인라인 스포일러에 적용한다. 공개 전 이름에는 가려진 단어를 넣지 않고 공개 후에는 현재 단어와 다시 가리는 동작을 전달한다. 비밀번호 기능과 구분되는 시각적 가림 패턴이며 별도 설명은 데모에 붙이지 않는다.

[MDN mark](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/mark)의 검색 일치 구간 예제를 참고해 검색어 하이라이트를 추가한다. 전체 본문은 보존하고 문자열을 정규식·HTML로 해석하지 않는다. 본문을 두 번 읽거나 강조마다 별도 안내를 추가하지 않고 실제 입력·지우기·강조만 제공한다.

[MDN pathLength](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/pathLength)와 [stroke-dashoffset](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/stroke-dashoffset)을 확인해 길이를 정규화한 선 글자 그리기를 추가한다. 기존 글자 속 색 채움과 달리 고정된 SVG 획 자체가 순서대로 드러난다. 글꼴이나 외부 에셋을 불러오지 않는다.

[MDN first-letter](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::first-letter)의 드롭캡 예제와 적용 가능한 float·서체·패딩 속성을 확인했다. 빠져 있던 편집 본문 패턴으로 원문을 분리·복제하지 않고 첫 글자 옆으로 문단이 흐르게 한다. 정적인 타이포그래피에 불필요한 재생 버튼이나 설명을 붙이지 않는다.

## 피드백·알림 선정

[GOV.UK 오류 요약](https://design-system.service.gov.uk/components/error-summary/)의 오류 위치 연결·같은 인라인 오류 문구·확인 후 요약 포커스를 참고한다. 기존 단일 필드 blur 검증과 구분해 폼 확인→오류 목록→대상 필드 수정 흐름을 구현한다. 라이브러리나 실제 전송을 도입하지 않으며 요약과 필드의 문구 반복은 이 패턴의 필요한 접근성 연결이다.

[GOV.UK 글자 수 지침](https://design-system.service.gov.uk/components/character-count/)의 남은 양·초과 안내와 원문을 잘라 버리지 않는 방식을 참고한다. 실제 서비스의 새 제한 정책을 도입하는 것이 아니라 로컬 예시 40자 기준을 시연한다. 코드포인트 계산 기준과 조합 이모지의 한계는 프롬프트에 명시하고 부가 실행 카운터·설명은 붙이지 않는다.

[PatternFly 빈 상태](https://www.patternfly.org/components/empty-state/design-guidelines/)의 검색 결과 없음·간결한 상태·다음 조작 지침을 참고한다. 본문 강조와 구분해 로컬 검색의 비어 있는 결과와 검색어 지우기·목록 복귀 자체를 시연한다. 결과 없음은 필요한 상태 문구 하나로 전달하고 부가 제목·설명·개수는 추가하지 않는다.

[PatternFly 인라인 코드 복사](https://www.patternfly.org/components/clipboard-copy/)와 [Carbon 공통 동작](https://www.carbondesignsystem.com/building-blocks/core/patterns/common-actions/tab-1)의 복사 확인 피드백을 참고해 코드 옆 아이콘을 실제 복사 결과에 연결한다. 기존 공용 복사 훅을 재사용하고 Promise 성공 전에 체크를 보이지 않으며 실패·재시도도 구분한다. 데모에 별도 토스트·설명·실행 횟수는 붙이지 않는다.

[Carbon 입력 지침](https://www.carbondesignsystem.com/building-blocks/core/components/text-input/guidelines)(2026-09-30 갱신)의 레이블·오류 상태와 [MDN 이메일 입력](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/email)의 내장 유효성 검사를 확인했다. 기존 클릭 기반 흔들림과 달리 실제 입력 검사·수정 피드백이 빠져 있어 우선 추가한다. 오류 문구는 이 디자인의 필수 콘텐츠이며 별도 안내·제목·실행 횟수는 추가하지 않는다. 형식 검사와 실제 주소 인증·저장 성공은 구분한다.

[Bootstrap 배지 지침](https://getbootstrap.com/docs/5.3/components/badge/)의 모서리 배치·알림 숫자 맥락·대비를 참고해 빠져 있던 읽지 않은 알림 배지를 추가한다. 라이브러리를 도입하지 않고 기존 SVG와 CSS로 표현하며, 숫자의 의미는 버튼 이름에 전달한다. 읽음 전환은 고정된 예시 배지 상태만 바꾸며 실제 알림 연동을 주장하지 않는다.

[WAI 툴팁 패턴](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)의 focus 유지·Escape·hoverable·role/설명 연결을 참고해 툴팁을 추가한다. 이 APG 문서는 합의 진행 중인 패턴임을 명시하므로 완성된 표준 규격으로 표현하지 않는다. 기존 앵커 팝오버의 크기 전환과 달리 비대화형 정보·hover/focus/tap 수명에 초점을 맞추며, 바깥 포인터 닫기는 공용 훅을 재사용한다.

[WAI 별점 라디오 예제](https://www.w3.org/WAI/ARIA/apg/patterns/radio/examples/radio-rating/)의 점수 이름·단일 선택·포커스 대비를 확인했다. 예제의 사용자 정의 SVG radio 대신 실제 HTML radio·fieldset·legend를 사용해 키보드 선택을 브라우저에 맡긴다. 평점 자체 외 설명·제출 성공·실행 횟수를 붙이지 않는다.

[Bootstrap 알림 닫기 지침](https://getbootstrap.com/docs/5.3/components/alerts/#dismissing)의 제거 후 포커스 유실 주의를 참고했다. 인라인 알림을 닫으면 같은 위치의 복원 조작으로, 복원하면 닫기 조작으로 포커스를 옮긴다. 고정된 안내 문구 하나와 닫기·복원만 제공하며 실제 변경 감지나 부가 설명은 추가하지 않는다.

[Carbon 버튼 지침](https://www.carbondesignsystem.com/building-blocks/core/components/button/guidelines)(2026-10-15 갱신)의 위험 동작 구분·관련 동작 묶음을 참고해 인라인 확인을 추가했다. 기존 길게 누르기와 달리 취소·확인을 명시적으로 고르고, 확인 단계의 초기 포커스는 취소에 둔다. 실제 데이터 변경이나 부가 질문·성공 문구는 넣지 않는다.

## 슬라이더·토글 선정

[MDN color 입력](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/color)의 기본 RGB 입력·브라우저 선택 UI·변경값 연결을 확인했다. 고정된 제품 스와치 선택과 달리 실제 임의 색상 선택과 색상값 표시를 시연한다. 브라우저별 picker 외형 차이는 native 동작으로 유지하고 알파·광색역·전역 테마 변경은 추가하지 않는다.

[WAI 다중 손잡이 슬라이더](https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/)의 교차 방지·동적 접근성 범위·고정 Tab 순서와 [MDN pointer-events](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/pointer-events)의 입력 대상 구분을 확인했다. 고정된 전체 좌표의 native range 두 개를 겹치고 현재 peer 값에 대한 clamp·20 간격을 함수형 갱신으로 유지한다. 시각 손잡이는 20px이나 native hit 영역은 44px이며, 트랙 클릭은 가까운 손잡이로 한 번 이동한다. 터치 보조기기는 APG도 기기 검증을 요구하므로 실제 기기 검증 여부를 별도로 보고한다.

[Carbon 태그 지침](https://www.carbondesignsystem.com/building-blocks/core/components/tag/guidelines)의 사용자 생성 레이블·독립 제거 조작과 [MDN isComposing](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/isComposing)의 조합 중 키 구분을 참고한다. 고정된 필터 칩과 달리 텍스트 입력·추가·제거 수명을 시연한다. 44px 제거 조작과 긴 한국어 원문 보존을 위해 문자는 줄바꿈하고, 실제 동일 버튼·입력 표면 CSS를 재사용한다. 저장·필터 적용이나 개수 안내는 덧붙이지 않는다.

[MDN 숫자 입력](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/number)과 [WAI 스핀버튼](https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/)의 직접 편집·범위·단계 조작을 확인했다. 숫자 모션 시연과 구분해 실제 number 입력과 큰 증감 조작을 연결한다. 예시 0~9 범위이며 stepUp/stepDown·validity를 브라우저에 맡기고 입력/blur에서 임의 보정하거나 주문·저장 결과를 주장하지 않는다.

[MDN select](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/select)의 label·option value·브라우저 기본 선택 동작을 확인했다. 고정 탭·분할 메뉴와 달리 실제 폼 선택과 글자 크기 미리보기를 연결한다. 기존 범위 입력과 동일한 프레임·label CSS만 재사용하며 사용자 정의 listbox나 외부 리스너·부가 설명은 만들지 않는다.

[WAI 체크박스 패턴](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/)의 전체/일부/없음과 [MDN indeterminate](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/indeterminate)의 JavaScript 전용 native 속성을 확인했다. 라디오 단일 선택·온오프 스위치와 구분해 여러 옵션과 전체 선택의 부분 상태를 시연한다. HTML fieldset/legend/label/input을 사용하고 선택 개수나 저장 성공은 붙이지 않는다.

[MDN range 입력](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/range)의 min/max/step·기본 유효 범위와 음량 같은 상대적인 조절 용도를 확인했다. 기존 전후 이미지 분할과 달리 단일 값·현재 값 버블·채움 트랙을 네이티브 입력에 연결한다. 손잡이의 실제 이동 구간을 반영해 버블 중심을 보정하고, 버블은 시각용으로 숨겨 native 값과 중복 발표하지 않는다. 실제 오디오 호출·부가 설명은 도입하지 않는다.

## 탭·배너·로더 선정

[WAI 탭 패턴](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)의 선택적 Delete 닫기·다음/이전 탭 포커스·마지막 탭 제거 후 논리적인 조작으로 복귀를 참고한다. 동적 문서 수명과 복원 흐름은 기존 고정 두 패널 탭과 구분하고, 탭·패널과 44px 아이콘 버튼의 실제 동일 CSS를 재사용한다. 탭 안에 중첩 버튼을 만들지 않으며 독립 닫기 조작과 로컬 예시 복원만 제공한다.

[MDN position](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position)의 sticky가 가장 가까운 스크롤 조상과 top에 고정되는 규칙을 확인했다. 기존 클릭으로 단계를 바꾸는 스크롤 스토리 시연과 구분해 실제 독립 스크롤 목록에 추천 배너를 고정한다. 네이티브 스크롤·포커스·overscroll containment만 사용하고 이벤트·상태·안내 문구를 덧붙이지 않는다.

[MDN clip-path](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/clip-path)의 polygon과 클리핑 범위를 확인해 빠져 있던 접힌 리본 배지를 추가한다. 띠 안쪽만 잘라 꼬리 홈을 만들고 바깥 접힘은 별도 pseudo-element로 유지한다. 정적인 배지 콘텐츠만 제공하며 불필요한 애니메이션·상태·설명을 추가하지 않는다.

세로 레일 탭은 [WAI 탭 패턴](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)의 vertical 방향과 위·아래 이동을 적용한다. 가로 탭의 실제 공통 상태·패널·포커스 로직을 ContentTabsDemos에서 재사용하고, 새 레일 배치와 방향키만 분리해 동일 코드를 복제하지 않는다.

[MDN animation-delay](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-delay)와 [status 역할](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/status_role)을 참고해 점의 시간차 움직임과 상태 전달을 분리한다. 기존 영상의 대화 시나리오 전체와 달리 재사용 가능한 작은 UI 대기 버블만 보여 주며 실제 응답 생성이나 부가 문구는 추가하지 않는다.

[PatternFly 스켈레톤 지침](https://www.patternfly.org/components/skeleton/design-guidelines/)의 실제 콘텐츠 구조와 동일한 자리 확보 기준을 참고한다. 기존 정적 쉬머와 달리 뼈대와 고정 예시 콘텐츠를 같은 영역에서 전환해 크기·포커스를 유지한다. 실제 요청 완료를 흉내 낸 타이머나 성공 문구는 사용하지 않는다.

[WAI 캐러셀 패턴](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/)의 이전·다음 버튼·포커스 유지·비활성 슬라이드 숨김·수동 전환의 polite 상태를 참고한다. 기존 겹친 카드·다중 카드 쇼케이스와 달리 하나의 전체 배너를 두 고정 조작으로 넘기며 자동 재생·드래그를 주장하지 않는다.

[MDN SVG pathLength](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/pathLength)와 [stroke-dasharray](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/stroke-dasharray)를 참고해 원형 로더의 호를 정규화한다. 단순 회전 테두리와 달리 호 길이·오프셋 변형을 회전에 겹치고 모션 감소에서는 두 애니메이션 모두 멈춘다. 선형 로더와 실제로 같은 트랙 색상만 CSS 변수로 재사용한다.

[MDN progressbar 역할](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/progressbar_role)의 완료율을 모를 때 aria-valuenow를 생략하는 규칙을 참고해 불확정 선형 로더를 추가한다. 기존 실제 수치 진행 바·스켈레톤과 달리 반복되는 두 막대만 표현하며 모션 감소에서도 정지 막대를 완료율로 해석하지 않게 한다.

[WAI 탭 패턴](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)의 실제 패널 연결·좌우 순환·Home/End·Tab 이탈을 참고한다. 기존 캡슐 배경 이동과 구분해 콘텐츠를 전환하는 밑줄 탭을 추가한다. 즉시 표시할 로컬 패널을 사용해 방향키 포커스와 선택을 함께 이동하고 비활성 패널은 hidden으로 제외한다. 별도 안내나 실행 횟수는 붙이지 않는다.

[MDN file input](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/file)의 실제 FileList·파일명·바이트 크기·단일 선택·cancel 계약을 참고해 누락된 기본 파일 첨부를 추가한다. opacity 0의 실제 입력을 선택 영역 전체에 유지하며, 제거 시 입력값도 비워 같은 파일 재선택을 허용한다. 로컬 선택·교체·제거만 구현하고 업로드·진행률·드롭존은 주장하지 않는다.

[WAI 수동 선택 콤보박스](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list/)를 참고해 단순 셀렉트와 구분되는 검색 추천을 추가한다. 입력 원문은 자유롭게 유지하고 자동 확정 없이 명시적으로 고른 후보만 적용한다. DOM 포커스는 입력에 유지하며 활성 후보 연결·스크롤·blur/Escape/Tab 닫기·조합 중 키 보호를 대조한다. 실제 보조기기·모바일 터치 지원은 별도 기기 검증 범위다.

[MDN date input](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/date)의 정규화된 yyyy-mm-dd 값·로캘별 표시·기본 연월일 편집과 달력을 사용한다. 카탈로그에 없던 기본 날짜 입력을 추가하며 커스텀 달력이나 Date 시간대 변환·업무용 날짜 제한은 도입하지 않는다. 라이트/다크 color-scheme과 좁은 입력의 native 편집·아이콘 경계를 확인한다.

[MDN offset-path](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/offset-path)와 [offset-distance](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/offset-distance)를 참고해 베지어 모션 패스를 추가한다. 경로와 이동 기준은 같은 SVG 좌표계를 사용하며 하나의 경로 상수로 두 표현의 불일치를 막는다. 접선 방향 회전·비례 축소·시작점 정지의 모션 감소와 미지원 fallback을 확인한다. 데이터 차트 관련 자료도 탐색했으나 현재 도형·SVG·모핑 분류에 맞는 기본 경로 이동부터 추가한다.

[MDN basic-shape 보간](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/basic-shape#interpolation_of_basic_shapes)의 같은 좌표쌍 개수·참조 상자·채움 규칙을 유지해 기하학 폴리곤 모핑을 추가한다. 팔각형·네 갈래 별·사각형 모두 8점으로 대응하며 초기 도형 정의를 기본 상태와 루프 양끝에서 재사용한다. 기존 액체 border-radius 변형과 구분되는 직선 꼭짓점의 연속 형태 변환을 보여 준다.

[MDN mask-type](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/mask-type)의 luminance에서 흰색은 보존·검은색은 제거하는 규칙으로 SVG 컷아웃을 추가한다. 테마 배경색을 덮어 가짜 구멍을 만들지 않고 실제 투명 영역으로 배경을 드러낸다. mask와 gradient는 useId로 인스턴스별 격리하고 동일 SVG 좌표계·모션 감소·비례 축소를 대조한다.

[MDN SVG marker](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/marker)의 marker-end·orient auto와 userSpaceOnUse를 사용해 분기 연결선을 추가한다. 화살표 정의를 인스턴스 안에서 재사용하고 끝점과 접선 방향을 일치시키며, 전역 ID 충돌·선 두께에 따른 이중 확대·좁은 SVG의 끝부분 잘림을 확인한다.

[MDN SVG use](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/use)의 로컬 href 재사용과 스타일 상속을 적용해 방사형 로제트를 추가한다. 하나의 꽃잎을 30도 간격으로 회전 복제해 패턴을 만들며, 원본 경로의 고정 색이 인스턴스 스타일을 가리지 않게 한다. 독립 ID·투명 면의 겹침·비례 축소·모서리 잘림을 확인한다.

[MDN stroke-dasharray](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/stroke-dasharray)와 [stroke-dashoffset](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/stroke-dashoffset)을 사용해 마칭 앤츠 선택 윤곽을 추가한다. 완성된 윤곽을 유지하고 4+4 대시 주기만 위상 이동해 루프 경계를 맞춘다. 정지 점선의 모션 감소와 실제 선택/리사이즈 기능을 주장하지 않는 표현 범위를 확인한다.

[MDN SVG pattern](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/pattern)과 [patternUnits](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/patternUnits)의 반복 타일·사용자 좌표계를 참고해 도형 내부 해칭 채움을 추가한다. 방사형 복제와 구분되는 2차원 타일 채움이며, 단일 타일을 원과 둥근 사각형에서 재사용한다. 경계 이음새·명시적 단위·인스턴스별 ID·테마 표면과 사선 대비를 확인한다.

[MDN vector-effect](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/vector-effect)의 non-scaling-stroke를 적용해 확대 가능한 벡터의 선 두께를 유지한다. 일반 크기 애니메이션과 구분해 사용자가 실제 버튼으로 두 배 확대·복귀하고, 도형 중심·고정 선 두께·같은 버튼의 포커스를 확인한다. 지원되지 않는 다른 vector-effect 값이나 외부 줌 엔진은 추가하지 않는다.

[MDN SVG path](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/Paths)의 Q 제어점과 [Pointer events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events)의 capture·해제·취소를 적용해 베지어 제어점을 직접 편집한다. 고정 경로를 따라 이동하는 기존 모션 패스와 구분하며, 드래그와 동일 상태를 편집하는 네이티브 가로·세로 입력을 제공한다. 눌린 위치 오프셋·실제 프레임 좌표 환산·포인터 격리·취소 후 정지·좁은 화면 조작 영역을 검증한다.

[MDN clipPath](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/clipPath)와 [clipPathUnits](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/clipPathUnits)를 사용해 두 원의 실제 교집합을 표현한다. 기존 컷아웃 마스크의 빼기와 달리 공통 면만 남기며, 겹침 입력 하나로 clip 도형과 보이는 원을 동기화한다. 네이티브 range의 실제 공통 스타일은 베지어 편집과 재사용하고 경로 연산·내보내기 기능을 주장하지 않는다.

[Magic UI의 그리드 패턴](https://magicui.design/docs/components/interactive-grid-pattern)에서 확인되는 패턴·방사형 페이드 구성을 참고하되 외부 구현·라이브러리는 가져오지 않는다. [MDN mask-image](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/mask-image)의 CSS gradient 마스크로 기본 선 격자 배경을 추가한다. 기존 커서 반응 도트 열과 구분해 선·20px 고정 간격·중앙 정렬·가장자리 페이드만 표현하고, 단일 가상 요소와 테마별 바탕/선/경계로 구성한다.

[Magic UI Meteors](https://magicui.design/docs/components/meteors)의 유성 배경 패턴을 확인하고 자체 CSS 장면으로 구현한다. [MDN animation-delay](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-delay)의 음수 지연으로 세 유성의 위상을 분리한다. 머리의 이동 벡터와 꼬리 회전을 맞추고, 모션 감소에서는 화면 안의 정지 유성 한 개를 유지한다. 난수·외부 구현·JavaScript 타이머는 추가하지 않는다.

[MDN mix-blend-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/mix-blend-mode)와 [isolation](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/isolation)을 참고해 혼색 조명을 추가한다. 기존 흐르는 블러 오로라와 달리 실제 원 세 개의 합성만 표현하고, 밝은 바탕에는 multiply·어두운 바탕에는 screen과 서로 다른 원색을 적용한다. 실제 토글로 normal 합성과 비교하며 장면 밖 합성·중복 상태·불필요한 설명은 추가하지 않는다.

[MDN feTurbulence](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feTurbulence)와 [feDisplacementMap](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feDisplacementMap)의 입력 이미지·채널·scale 계약으로 선 굴절을 추가한다. 기존 고정 도트 그레인이나 미리 만든 곡선과 구분해 고정 seed 노이즈가 실제 직선 픽셀 위치를 변형한다. scale0 복귀·인스턴스 ID 격리·확장 필터/선 경계·좁은 장면 채움·44px 네이티브 조작을 확인하며 자동 필터 애니메이션은 추가하지 않는다.

라인 굴절의 실제 최대값 렌더에서 보인 샘플링 계단은 [MDN feGaussianBlur](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feGaussianBlur)의 stdDeviation .3 후단 필터로 약하게 완화한다. 원래 scale0 직선 형태와 노이즈 맵·굴절값은 유지하며, 프롬프트에도 해당 경계 처리를 명시한다.

[MDN feSpecularLighting](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feSpecularLighting)의 높이 맵·광원 위치·표면 기하에 따른 반사 조명을 사용한다. 기존 radial-gradient 스포트라이트와 달리 고정 노이즈의 알파를 요철로 계산하고 실제 fePointLight x만 네이티브 입력으로 조절한다. 필터/ID 격리·양끝 조명·테마 lighting-color·고정 seed·전체 장면 채움을 확인하며 선 굴절의 실제 공통 range 스타일만 재사용한다.

[Magic UI Particles](https://v3.magicui.design/docs/components/particles)의 작은 입자 배경 패턴을 확인하고 자체 CSS 상승 궤적으로 구성한다. 고정 연결 노드·대각선 유성과 구분해 꼬리 없는8개 빛이 위로 움직이며 크기/주기/위상을 달리한다. [MDN 접근성 미디어 쿼리](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using_for_accessibility)를 따라 모션 감소에서는 화면 안의 고정 분산 위치에 정지한다. 새 난수·JavaScript 타이머·입자 엔진은 추가하지 않는다.

[MDN repeating-radial-gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/gradient/repeating-radial-gradient)의 중심·고정 길이 색상 구간 반복으로 모아레 원무늬 간섭을 추가한다. 기존 단일 격자·레이더와 구분해 동일한 두 무늬의 상대 중심 차이로 실제 겹침 띠가 생기며, 사용자는 편차 하나를 직접 조절한다. 자동 움직임 없이 고정6px 주기·3px 선·확장된 두 레이어만 유지하고 실제 간섭·양테마·최대 이동의 모서리 채움과 입력 포커스를 확인한다. 라이브러리 문서나 새 의존성이 필요하지 않아 Context7은 사용하지 않는다.

[Paper Dithering](https://shaders.paper.design/dithering)에서 사용되는 점 밀도 기반 명암 표현을 확인했다. 외부 구현을 가져오지 않고 [MDN feComposite](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feComposite)의 arithmetic 합성과 [feComponentTransfer](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feComponentTransfer)의 discrete 임계값으로 자체 SVG 디더링을 구성한다. 균일한 장식 그레인·커서 반응 도트 격자와 구분해 연속 명암+고정 노이즈를 이진 알파로 바꾸며, 오차 확산이나 특정 디더 알고리즘의 정확한 재현을 주장하지 않는다. 실제 양끝/중앙 밀도·테마색·인스턴스 참조 격리·좁은 프레임 채움을 확인한다. 라이브러리 설치/API 사용이 없어 Context7은 필요하지 않다.

실제 렌더에서 명암이 오른쪽에 치우친 노이즈 입력은 합성 전에 R을 clamp(3R−1)로 넓히고 alpha를1로 맞춘다. MDN의 비프리멀티플라이 채널 변환 규칙으로 보정하며, 양끝의 점이 반드시 완전히 없어지는 선형 확률 분포로 주장하지 않고 희박한 점에서 촘촘한 점으로의 실제 밀도 변화를 설명한다.

[Scratchapixel 점광원](https://www.scratchapixel.com/lessons/3d-basic-rendering/introduction-to-lighting/introduction-to-lighting-punctual-lights.html)의 광원 방향과 가림에 따른 그림자 원리를 참고해 단순2D 가림막의 투영을 추가한다. 실제3D 추적 엔진을 구현한다고 주장하지 않으며 광원→가림막 양끝의 직선을 하단까지 연장한다. [MDN mask-type](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/mask-type)과 [maskUnits](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/maskUnits)를 따라 고유 luminance mask로 가려진 빛을 실제 제거한다. 기존 높이 맵 조명·고정 빔과 구분되는 위치 기반 차폐이며, 중심 대칭·양끝 공선성·테마 대비·좁은 장면/입력과 인스턴스 참조 격리를 확인한다. 새 라이브러리나 서비스가 없어 Context7은 필요하지 않다.

두께8px 가림막이 광원 한쪽에 있을 때 상단 모서리만 쓰면 안쪽으로 빛이 새는 문제가 독립 검토에서 발견됐다. 각진 직사각형으로 유지하고 광원보다 오른쪽인 왼끝 또는 광원보다 왼쪽인 오른끝은 하단 모서리(y68)로 투영한다. 광원이 가림막 너비 안에 있으면 상단 양끝(y60)을 사용한다. 중심x90의 하단x80, 중심x174의 하단x184가 반드시 가려지는 회귀 조건을 추가한다.

[Paper Voronoi](https://shaders.paper.design/voronoi)의 셀 경계 배경 사용례와 [The Book of Shaders의 최근접 기준점 분할](https://thebookofshaders.com/12/?lan=en)을 확인하고 보로노이 셀 배경을 추가한다. 기존 도트·균일 격자·모아레와 구분되는 불규칙 최근접 분할이며, 고정10점과 이동1점의 수직이등분선 반평면을 사각형에 순서대로 적용한 실제 SVG 다각형을 사용한다. 외부 셰이더 구현이나 라이브러리는 가져오지 않고 GPU 실행·연속 Worley 거리 명암을 주장하지 않는다. 셀 면적 합·최근접 꼭짓점 조건·입력 양끝·인스턴스와 DOM 격리·테마/좁은 폭 채움을 검증한다. 라이브러리/API/버전 변경이 없어 Context7은 필요하지 않다.

감쇠 진동은 기존 cubic-bezier 탄성 비교와 구분해 [MIT OCW 감쇠 진동 해설](https://ocw.mit.edu/courses/18-03sc-differential-equations-fall-2011/79f2349d10404454ea6ed6f959fc1d33_MIT18_03SCF11_rec_08s13_sol.pdf)의 지수 감소 진동 원리를 사용한다. 자체 식 x(t)=60e^(-2t)(cos10t+.2sin10t)는 초기 변위60·초기 속도0이며, 물체 이동과 스프링 끝을 동일 변위로 연결한다. [MDN Element.animate](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate)와 [Animation.cancel](https://developer.mozilla.org/en-US/docs/Web/API/Animation/cancel)에 따라 한 번 재생하고 반복/언마운트에서 취소하며, 모션 감소·API 부재에서는 최종 평형 상태로 이동한다. 수치 적분/충돌 엔진을 주장하지 않고101개 해석식 샘플을 네이티브 애니메이션으로 보간한다. 연결성·감쇠·입력/인스턴스 격리·정리/대체 분기·테마/반응형이 검증 기준이다. 라이브러리/API 서비스 도입이 없어 Context7은 필요하지 않다.

[OpenStax 투사체 운동](https://openstax.org/books/university-physics-volume-1/pages/4-3-projectile-motion)의 수평 등속·수직 등가속도와 같은 높이 착지 조건을 사용해 중력 포물선 발사를 추가한다. 기존 예비 동작·스쿼시·경로 추종과 구분해 발사각이 궤적뿐 아니라 비행 시간도 바꾼다. 좌표 단위의 speed300/g500, T=2vy/g, R=vxT에서 점선 quadratic과41개 시간 샘플을 함께 유도하며, 실제 미터 단위나 충돌 엔진을 주장하지 않는다. [MDN keyframe 형식](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats)을 따라 등간격 시간의 transform을 보간한다. 각도 변경은 취소/시작점 복귀, 재발사는 취소/재시작, 모션 감소/API 부재는 최종 착지이며 새 타이머나 라이브러리를 사용하지 않는다.25/45/65도 사거리·높이·시간 관계, 수평 속도/수직 가속도, 궤적과 공 일치, 정리·테마·좁은 도구 행이 검증 기준이다. 라이브러리/API 서비스 도입이 없어 Context7은 필요하지 않다.

[OpenStax 단진자](https://openstax.org/books/university-physics-volume-1/pages/15-4-pendulums)의 작은 각도 근사 T=2π√(L/g)를 적용해 길이와 주기의 관계를 추가한다. 기존 뉴턴의 요람은 다중 구슬의 단계 기반 전달인 반면 이 디자인은 길이40~88의 단일 진자가14도 범위에서61개 코사인 샘플로 회전한다. 큰 각도 비선형 해나 실제 단위는 주장하지 않는다. [MDN Animation.pause](https://developer.mozilla.org/en-US/docs/Web/API/Animation/pause)의 기존 재생 위치 보존을 사용해 같은 Animation을 정지/재생하며 길이 변경에만 새 주기를 만든다. 생성과 재생 상태 효과를 분리하고 취소/ref 정리를 유지한다. 기본 수직 상태가 모션 감소/API 부재의 정지 표현이다. 주기 제곱과 길이 비례·양끝 길이·정지 중 길이 변경·정지 위치 보존의 실제 브라우저 관측·테마/좁은 도구 행이 검증 기준이다. 새 라이브러리/API 서비스가 없어 Context7은 필요하지 않다.

[University of Alabama 반발 계수 실험](https://pleclair.ua.edu/ph105/Labs/old/coef_rest_lab.pdf)의 충돌 후 속도 e배·최고 높이 e²배·바운스 시간 감소를 사용해 반발 계수 공 낙하를 추가한다. 기존 스쿼시/스트레치와 구분해 원 모양을 유지하고 좌표 단위의 H80/g500에서 실제 낙하·반발 궤적을 계산한다. 무한히 작은 바운스까지 재현하지 않고 다음 높이.5 미만에서 종료하는 시각적 근사를 명시한다. 계수별 계산은 memo, 사용자 입력 이후만 네이티브 WAAPI 재생, 변경/재실행/언마운트는 취소하며 별도 타이머/프레임 엔진은 없다. e² 높이비·축소되는 시간·유한 종료·바닥 미관통·모션 감소/API 부재·양테마/좁은 도구 행이 검증 기준이다. 새 라이브러리/API 서비스가 없어 Context7은 필요하지 않다.

[OpenStax 운동 마찰](https://openstax.org/books/university-physics-volume-1/pages/6-2-friction)과 [일정 가속도 운동](https://openstax.org/books/university-physics-volume-1/pages/3-4-motion-with-constant-acceleration)의 수평 감속 관계로 운동 마찰 미끄럼을 추가한다. 같은 초기 속력180에서 a=μg, T=v/a, D=vT/2를 사용하며 기존 탄성/감쇠 진동과 달리 역방향 움직임 없이 정지한다. 정지 마찰 임계값이나 지속하는 밀기 힘은 추가하지 않고 좌표 단위의 단순 운동 마찰 근사임을 명시한다. 기존 장면/범위 입력/실행 행을 재사용하고41개 시간 샘플을 네이티브 WAAPI로 보간한다. μD 일정·마찰 증가 시 시간/거리 감소·일정 감속/역주행 없음·표식/바닥 접촉·취소/대체 분기·테마/반응형이 검증 기준이다. 새 라이브러리/API 서비스가 없어 Context7은 필요하지 않다.

[OpenStax 1차원 탄성 충돌](https://openstax.org/books/college-physics-2e/pages/8-4-elastic-collisions-in-one-dimension)의 운동량·운동에너지 보존으로 두 블록의 충돌 속도를 계산한다. 기존 다중 구슬 요람과 구분해 정지 대상의 질량 비율.5~3을 직접 조절하며, 너비가 달라도 실제 양끝이 닿는 시간을 사용한다. 충돌 후.4초까지만 관찰하고 마지막 프레임을 보존하는 시연이며 외력 없이 물리적으로 멈춘다고 주장하지 않는다. 두 네이티브 WAAPI의 충돌 offset을 맞추고 변경/재실행/언마운트에서 취소한다. 보존량·속도 부호·접촉/관통 없음·대체 분기·테마/좁은 도구 행이 검증 기준이며 새 라이브러리/API 서비스가 없어 Context7은 필요하지 않다.

[OpenStax 구름 운동](https://openstax.org/books/university-physics-volume-1/pages/11-1-rolling-motion)의 D=Rθ와 v=Rω를 적용해 이동과 회전이 맞물리는 바퀴를 추가한다. 회전 로더나 숫자 롤링과 구분해 반경16~28이 달라도 같은168좌표 단위를2초 동안 이동하며 작은 바퀴가 더 많이 회전한다. 바퀴의 외곽 반경을 선 두께까지 포함해 맞추고 중심 높이를 바꿔 바닥 접촉을 유지한다. 네이티브 WAAPI 두 개로 이동/회전을 동기화하고 변경/재실행/언마운트에서 취소한다. 마지막 관찰 프레임을 유지하는 유한 시연이며 마찰 정지·토크·관성 엔진은 주장하지 않는다. 거리/각도와 접촉점 속도 관계·대체 분기·테마/좁은 도구 행이 검증 기준이며 새 라이브러리/API 서비스가 없어 Context7은 필요하지 않다.

[OpenStax 각운동량 보존](https://openstax.org/books/university-physics-volume-1/pages/11-3-conservation-of-angular-momentum)의 Iω 일정 관계로 추 간격 회전 관성을 추가한다. 고정 중심부 관성200과 같은 질점 추 두 개의 I=200+2R²를 사용하며, 거리20~44를 줄이면 같은 회전이 빨라진다. 팔 질량과 추 자체 자전 관성을 무시한 근사이고, 추를 모으는 일로 운동에너지가 변하므로 에너지 보존은 주장하지 않는다. [MDN updatePlaybackRate](https://developer.mozilla.org/en-US/docs/Web/API/Animation/updatePlaybackRate)의 재생 위치 동기화로 같은 Animation의 속도만 바꾸며, 관찰 일시정지 중 거리 변경도 각도와 정지를 유지한다. 기존 진자 아이콘 도구 행을 실제 재사용해 공통 이름으로 바꾸고, 물리식·Animation 재사용·정지/재개·테마/좁은 조작 행을 확인한다. 새 라이브러리/API 서비스가 없어 Context7은 필요하지 않다.

[MIT 고정축 회전의 비미끄럼 조건](https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/pages/week-10-rotational-motion/31-6-non-slip-condition/)의 일정한 줄 길이와 s=Rθ를 적용해 고정 도르래를 추가한다. 사용자가 줄 위치를 직접 바꾸면 양쪽 추의 변위가 반대가 되고 전체 줄 길이는120+24π로 유지된다. 바퀴 회전도 줄 이동량/24로 연결한다. 기존 구름 운동은 바퀴 중심이 이동하는 반면 이 기법은 축 고정·두 물체의 위치 구속을 다룬다. 중력·장력·질량차 가속도를 계산하는 시뮬레이터는 아니다. 상태 하나와 네이티브 범위 입력으로 즉시 연결하고 불필요한 애니메이션/ref/타이머를 두지 않는다. 실제 줄끝/추 접점·길이·회전 부호·경계·테마/모바일이 검증 기준이며 새 라이브러리/API 서비스가 없어 Context7은 필요하지 않다.

[OpenStax 파동 간섭](https://openstax.org/books/university-physics-volume-1/pages/16-5-interference-of-waves)의 선형 중첩으로 위상차 파동 합성을 추가한다. 기존 모아레는 겹친 무늬의 공간 간섭을 보여주지만 이 기법은 두 사인파의 실제 변위를 각 표본에서 더해 결과를 계산한다. 정적인 공간 파형에서 둘째 위상0~360도를 조절하며 시간 진행·전파·오디오나 물 엔진은 없다. 같은 진폭8에서0/360도 결과진폭16,180도0,90/270도8√2를 확인한다. 첫 입력·둘째 입력·합성 결과를 세 가로축과 SVG 연산자로 연결하고 추가 설명·수치 UI는 두지 않는다. 모든 표본의 합·위상 부호·경계·네이티브 입력/DOM·테마/반응형이 검증 기준이다. 물리 카테고리 신규10개에 도달하면 원래5개와 ID 연결을 보존하고 개수 계약을 테스트로 고정한다. 새 라이브러리/API 서비스가 없어 Context7은 필요하지 않다.

### 키네틱 타이포: 슬라이스 조립

[2026년 Codrops 포트폴리오 사례](https://tympanus.net/codrops/2026/05/06/from-shader-uniforms-to-clip-path-wipes-how-gsap-drives-my-portfolio/)의 SplitText·스크램블·clip-path 조합과 [현재 타이포 사례 목록](https://tympanus.net/codrops/hub/tag/typography/)을 확인했다. 기존 카탈로그에 타이핑·스크램블·글자 웨이브·단어 마스크·플랩이 있어 반복 추가하지 않는다. 빠져 있던 조각 재조립을 우선한다는 판단이며, 이것을 2026년에 새로 생긴 유행이라고 주장하지 않는다.

[Codrops 슬라이스 타이포 원형](https://tympanus.net/codrops/2023/12/05/on-scroll-sliced-text-animation/)(2023-12-05)은 스크롤에 따라 분할 텍스트를 재결합한다. 이번에는 같은 조각 구조의 독립적인 클릭 재생 변형을 구현하고 스크롤/GSAP 복제라고 설명하지 않는다. [MDN clip-path](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/clip-path)의 기본 border-box 잘림으로 네 수평 띠가 단어 전체를 분담한다. 고정된 시각 영역, 유한 CSS 애니메이션, 모션 감소의 완성 상태, 기본 button 키보드 활성화를 사용한다. 실제 조각 경계·최종 정렬·반복/포커스·테마/모바일이 검증 기준이다. 새 라이브러리·폰트·API 서비스가 없어 Context7은 필요하지 않다.

### 키네틱 타이포: 근접 반응 가변 굵기

[Studio Size의 Exat 사례](https://tympanus.net/codrops/2026/04/10/the-exat-microsite-pushing-a-typography-showcase-to-new-creative-extremes/)(2026-04-10)는 포인터 근접도에 따른 가변 굵기와 직접 조작하는 타입 시연을 사용한다. 기존 웨이브·스크램블·글자 이동과 달리 실제 글리프 윤곽이 보간되는 기법이 빠져 있어 우선 추가한다. 이 사례의 폰트·색 단계·스크롤 구조를 복제하는 대신 VIBE 한 단어의 연속 굵기에 집중한다. 모바일·키보드에서는 명시적 native range로 같은 위치를 조절한다.

[MDN 가변 폰트 속성](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-variation-settings)에 따라 등록된 wght축은 기본 font-weight로 조작한다. 실제 [Roboto Flex](https://github.com/google/fonts/tree/main/ofl/robotoflex)의 VIBE 전용 WOFF2를 [Google Fonts CSS API](https://developers.google.com/fonts/docs/css2)의 text 부분집합으로 받아 로컬 정적 자산으로 포함한다. 파일은1,940바이트이며 WOFF2의 Brotli 스트림에서 OpenType fvar를 읽어 wght100~1000/default400을 확인했다. 원본 OFL과 출처를 함께 배포하고 합성 볼드/가로늘이기/실행 중 외부 폰트 요청으로 대체하지 않는다. 4칸 중심 거리로 굵기를 계산하며 칸·입력 DOM을 유지한다. touch 장면 동작은 무시해 페이지 스크롤과 간섭하지 않고 native range가 대체 조작을 담당한다. 테마·모바일·로드·실제 가변 굵기·하위 경로·라이선스 동봉이 검증 기준이다. 새 패키지·외부 서비스가 없고 네이티브 CSS/폰트 형식이므로 공식 문서를 직접 확인했으며 Context7은 필요하지 않다.

### 키네틱 타이포: 원통 회전

[Codrops의 CSS 3D 타이포 사례](https://tympanus.net/codrops/2025/11/04/creating-3d-scroll-driven-text-animations-with-css-and-gsap/)(2025-11-04)에서 입체 원통 배치를 확인했다. 기존 원형 SVG 텍스트와 수직 단어 슬라이드에 없는 깊이 배치를 추가한다. 이번 구현은 16개 글자를 Y축 둘레에 배치하는 독립 CSS 반복이며 원문의 GSAP·스크롤 연동을 복제한다고 설명하지 않는다. [MDN transform-style](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transform-style)에 따라 preserve-3d와 깊이를 유지하는 overflow:clip을 사용하고, [animation-play-state](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-play-state)로 같은 각도에서 정지·재개한다. 기존 로컬 VIBE 폰트와 버튼 포커스 스타일을 재사용한다. 동일 각도 간격·뒷면 숨김·정지/재개·네이티브 키보드 입력·양테마·좁은 화면을 검증하며 모션 감소에서는 읽을 수 있는 정지형으로 표시한다. 새 의존성이 없는 네이티브 CSS이므로 공식 문서를 직접 확인했고 Context7은 필요하지 않다.


### 키네틱 타이포: 리퀴드 글자 모핑

[현재 Codrops 디자인 허브](https://tympanus.net/codrops/hub/)와 [SVG 필터 타이포 사례](https://tympanus.net/codrops/2024/08/22/scroll-based-svg-filter-animations-on-text/)를 확인하고 기존 카탈로그에 없는 단어 간 윤곽 융합을 우선한다. [Morphing Gooey Text](https://tympanus.net/codrops/2020/04/28/morphing-gooey-text-hover-effect/)(2020-04-28)의 고전적인 기법이며 새로 생긴 2026년 유행이라고 주장하지 않는다. 기존 블러 등장·투명 교차 전환·노이즈 배경 굴절·구슬 합체와 달리 두 단어의 블러와 불투명도를 합쳐 글자 윤곽을 이어 붙인다.

[MDN feGaussianBlur](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feGaussianBlur)와 [feColorMatrix](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feColorMatrix)를 근거로 두 단어의 블러 결과에 알파 임계값18A-7을 적용한다. 진행0/100은 선명한 단어,50은 연결된 중간 윤곽이며 경로 보간이나 실제 액체 엔진이 아니다. 기본 굵은 시스템 글꼴을 사용하고 기존 키네틱 세로 정렬과44px 범위 입력을 재사용한다. 자동 스크롤/호버 재생을 복제하는 대신 네이티브 범위 입력으로 중간 모핑을 직접 관찰한다. 진행 상태 하나와 useId만 두고 필터·텍스트·입력 DOM을 유지한다. 양끝/중간·인스턴스별 필터 격리·네이티브 드래그/키보드·양테마·모바일 경계가 검증 기준이다. 자동 모션이 없어 모션 감소에서도 직접 입력한 상태만 보여 준다. 패키지/API 변경 없이 네이티브 SVG를 사용하므로 공식 문서를 직접 확인했으며 Context7은 필요하지 않다.

### 키네틱 타이포: 곡률 조절 패스 타이포

[현재 Codrops 디자인 허브](https://tympanus.net/codrops/hub/)와 [SVG 경로 위 텍스트 사례](https://tympanus.net/codrops/2020/02/26/animating-svg-text-on-a-path/)(2020-02-26)를 확인했다. 원문의 스크롤에 따른 startOffset 이동을 복제하지 않고, 카탈로그에 없던 열린 글자 기준선의 직접 변형을 우선 추가한다. 기존 원형 배지 회전은 고정 원 경로, 베지어 편집은 선 자체의 제어점 이동이며, 이번에는 경로 변경에 따른 글자 위치와 접선 방향의 재배치를 보여 준다. 고전적인 SVG 기법을 새2026년 유행이라고 주장하지 않는다.

[MDN textPath](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/textPath)에 따라 href로 같은 경로를 참조하고 startOffset50%와 text-anchor middle을 사용한다. 고정 양끝(18,62)/(246,62), 제어점(132,62-bend)의 이차 곡선으로 bend-60~60을 조절한다. 중심은(132,62-bend/2)이며0이면 실제 직선이다. 첫 브라우저 측정에서 y58 기준선의 위쪽 극값 글자 경계가 장면 위2.23px 나가 y62로4px 내렸다. 최종 위/아래 극값의 글자 경계는 모두104px 장면 안으로 들어온다. 단일 경로를 점선 기준선과 실제 텍스트 참조로 함께 사용하며 기존 키네틱 SVG 크기·44px 범위 입력·세로 정렬을 재사용한다. 직접 입력 이외 자동 재생·시간 전환이 없어 모션 감소에서도 같은 직접 조작만 유지한다. 양끝/직선·문구 가독성·로컬 경로 ID·DOM/포커스 유지·양테마·모바일 경계가 검증 기준이다. 새 패키지/API 없이 네이티브 SVG만 사용하므로 공식 문서를 직접 확인했으며 Context7은 필요하지 않다.

### 키네틱 타이포: 분산 글자 재조립

[현재 Codrops 목록](https://tympanus.net/codrops/)과 [Distributed Letters](https://tympanus.net/codrops/2021/03/24/distributed-letters-animation-layout/)(2021-03-24)를 확인했다. 기존 단어 마스크 등장·수평 조각 조립·자동 웨이브와 구분해 개별 글자를 실제 다른 위치와 각도로 분산하고 다시 한 줄로 모으는 빠진 패턴을 추가한다. 원문의 패널/페이지 전환이나 새로운2026년 유행을 재현한다고 설명하지 않는다. SVG 고정 좌표계에서7개 글자를 이동시키고 한 개 네이티브 버튼으로 왕복한다.

[MDN transition-delay](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transition-delay)의 속성 전환 지연으로500ms 이동에 글자마다35ms 차이를 둔다. [WAI 버튼 패턴](https://www.w3.org/WAI/ARIA/apg/patterns/button/)에 따라 토글 이름은 고정하고 aria-pressed로 분산 상태를 제공한다. 모션 감소의 transition none은 지연까지 제거한다. 기존 슬라이스 버튼의 공통 크기·모서리·포커스를 실제 공유하되 글꼴은 각각 유지한다. 함수형 상태 하나만 사용하며 반복/난수/ref/effect/타이머는 없다. 두 배치와 전환의 글자 경계·중복 문자 키·빠른 왕복·키보드/포커스·양테마·모바일·기존 슬라이스 외형이 검증 기준이다. 추가 패키지 없이 네이티브 CSS/SVG를 사용하므로 Context7 대신 공식 문서를 직접 확인했다.

### 병렬 확장: 그리드·내비게이션·패널·모던 스타일

- **자동 열맞춤 그리드**: [MDN Grid](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Grids)와 [web.dev 컨테이너 반응형 사례](https://web.dev/articles/baseline-in-action-container-queries)(2025-10-23)를 확인했다. 기존 고정 열·겹침·육각 배치에 없는 실제 컨테이너 폭 기반 auto-fit/minmax를 우선한다. 너비 입력이 목록의 실제 폭을 바꾸며 최소76px/gap6px 기준으로3→2→1열이 된다. JS 폭 추정·가짜 scale·ResizeObserver 없이 CSS가 배치한다.
- **디스클로저 계층 탐색**: [WAI 탐색 예제](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)(2026-01-20 갱신)를 확인했다. 기존 폭 접기 레일과 달리 고정 사이드바에서 중첩 링크 노출을 제어한다. 일반 링크/목록·aria-current·aria-expanded/controls·Escape 복귀·포커스 이탈 닫기를 사용하고 menu 역할이나 불필요한 방향키 규칙은 추가하지 않는다. 실제 외부 라우팅은 없고 데모의 고유 페이지 영역 아트워크만 교체한다.
- **열 정렬 데이터 표**: [WAI 정렬 표](https://www.w3.org/WAI/ARIA/apg/patterns/table/examples/sortable-table/)와 [Carbon 접근성 기준](https://www.carbondesignsystem.com/building-blocks/core/components/data-table/accessibility)(2026-09-30 갱신)를 확인했다. 기존 패널에는 데이터 열 정렬이 없어 native table·44px 헤더 버튼·활성 th 하나의 aria-sort를 추가한다. 실제 이름/숫자 행을 정렬하고 같은 열은 방향 반전, 다른 열은 오름차순으로 전환한다. 서버·지연·가짜 정렬 결과는 없다.
- **스쿼클 아이콘 표면**: [Chrome 구현 설명](https://developer.chrome.com/blog/implementing-corner-shape)(2026-02-19)과 [MDN corner-shape](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/corner-shape)를 확인했다. 기존 글래스/홀로그램의 색 변형 대신 빠져 있는 네이티브 연속 곡률 표면을 추가한다. corner-shape:squircle과 border-radius30%를 함께 사용하고 두 테마의 경계·그라데이션을 구분한다. 미지원 환경은 일반 둥근 사각형 폴백이며 같은 실루엣이라고 주장하지 않는다. 정적 스타일에 불필요한 상태나 가짜 버튼을 넣지 않는다.

네 기법 모두 새 라이브러리·외부 API가 없어 Context7 패키지 문서 대신 플랫폼/디자인 시스템의 공식 문서를 직접 확인했다. 연구·구현·독립 리뷰는 카테고리별로 병렬 진행하되 각 담당자는 디자인 한 개의 테스트·버그 수정·코드 정리를 마친 뒤 통합 게이트를 기다린다. 공통 연결은 카테고리별 컴포넌트 목록을 모으고, 전체 테스트·빌드와 브라우저 검증이 끝나야 다음 디자인을 진행한다.

### 병렬 확장 두 번째 묶음: 정렬·페이지 탐색·선택 문맥·듀오톤·입체 타이포

- **서브그리드 카드 행 정렬**: [WebKit의 subgrid 설명](https://webkit.org/blog/17339/subgrid-how-to-line-up-elements-to-your-hearts-content/)(2025-09-12)과 [MDN subgrid](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Subgrid)를 확인했다. 기존 카드 배치에 없던 내부 제목·본문·태그의 공유 행 정렬을 추가한다. 높이를 고정하거나 JS로 측정하지 않고 실제 subgrid와 span 3을 사용한다. 네이티브 체크박스가 카드 자체 행만 독립 행으로 전환하며 콘텐츠는 유지한다.
- **문서 목록 페이지네이션**: [GOV.UK Pagination](https://design-system.service.gov.uk/components/pagination/)과 [Queensland Pagination](https://www.designsystem.qld.gov.au/components/pagination)을 확인했다. 기존 경로·계층 탐색과 구분되는 실제 세 페이지 목록 탐색을 추가한다. 현재 페이지·양끝 disabled·실제 문서 두 행을 연결하고 컨테이너235px 이하에서는 비활성 번호를 숨겨44px 조작 영역을 유지한다. 로컬 예시 목록이며 실제 URL 라우팅은 추가하지 않는다.
- **선택 연동 속성 인스펙터**: [Figma 선택 문맥](https://help.figma.com/hc/en-us/articles/360040449873-Select-layers-and-objects)과 [디자인 파일 구성](https://help.figma.com/hc/en-us/articles/15297425105303-Explore-design-files)을 참고했다. 단순 입력 모음 대신 캔버스 선택과 속성 패널을 연결하고 요소별 편집값을 유지한다.220px 이하의 컨테이너에서는 옆 패널을 아래로 재배치한다. 요소 높이48px로 최대 반경24px가 CSS 정규화에 잘리지 않게 한다.
- **듀오톤 명암 매핑**: [Adobe의 듀오톤 설명](https://www.adobe.com/uk/creativecloud/photography/discover/duotone-effect.html)과 [MDN feComponentTransfer](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feComponentTransfer)를 확인했다. 단순 색 오버레이와 구분되는 두 잉크 사이의 실제 RGB 명암 보간을 추가한다. 자체 흑백 SVG 구체와 언덕에 sRGB 채널별 table을 적용하며 알파는 보존한다. 양테마에서 같은 아트워크를 유지하되 프레임 경계색을 구분한다.
- **깊이 조절 압출 타이포**: Sarah Fossheim의 [겹친 그림자로 만드는 입체 글자](https://css-tricks.com/creating-playful-effects-with-css-text-shadows/)(2020-04-23)와 [MDN SVG use](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/use)를 확인했다. 최신 유행이라고 주장하지 않고 기존 네온·원통 배치에 없던 연속 측면 깊이 조절을 보완한다. 하나의 glyph와 뒤에서 앞으로 그리는 use를 사용하고 깊이의 절반만큼 전체를 보정해 중심을 유지한다. 실제 브라우저에서 조상 의존 text 선택자의 글꼴이 복제본에 적용되지 않아 SVG 부모 상속으로 수정했다. 측정한 상하 여백을 맞추도록 기준선을75.5로 조정했다. 실제 3D 엔진이나 흐린 그림자와 동일하다고 설명하지 않는다.

새 패키지·외부 API 없이 기존 네이티브 입력·CSS·SVG와 카테고리별 파일을 재사용한다. 다섯 기법 모두 구현 직후 해당 행동 테스트와 코드 정리, 새 읽기 전용 검토를 수행하고 root의 실제 양테마·모바일·복사·통합 검증을 통과한 뒤 다음 디자인으로 진행한다.

### 병렬 확장 세 번째 묶음: 빈칸 채움·하단 탐색·상세행·연결형 조작·글자 힌지

- **빈칸 채움 모자이크 그리드**: [MDN 자동 배치](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Auto-placement)와 [Grid 접근성](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Accessibility)을 확인했다. 기존 메이슨리 예시와 구분되는 실제 grid-auto-flow:dense 빈칸 채움을 추가한다. DOM 순서와 시각 순서가 달라질 수 있어 의미 순서·포커스가 없는 장식 SVG 타일만 사용한다. 체크박스는 실제 CSS 흐름만 바꾸며3행108px과4행146px의 차이를 보여 준다.
- **하단 기본 목적지 내비게이션**: [Material Android 공식 하단 탐색 문서](https://github.com/material-components/material-components-android/blob/master/docs/components/BottomNavigation.md?plain=1)를 확인했다. 기존 독/탭과 구분되는 고정 하단의 아이콘·라벨·활성 캡슐과 현재 페이지를 연결한다. 세 목적지가 실제 로컬 페이지 아트워크를 바꾸며 URL 라우팅이나 저장 기능을 있다고 설명하지 않는다.
- **상세 행 확장 테이블**: [Carbon 데이터 표](https://www.carbondesignsystem.com/building-blocks/core/components/data-table/guidelines)와 [WAI Disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)를 확인했다. 기존 정렬 표나 옆 상세 패널에 없는 요약행 바로 아래의 독립 상세행을 추가한다. native table과 tr/colspan,44px 버튼·aria-expanded/controls·hidden을 연결하고 오른쪽 셰브런이 펼친 행을 향해 아래로 바뀐다. 실제 파일 예시의 너비·높이 외 별도 수치 안내는 없다.
- **익스프레시브 연결 버튼**: [Google Expressive 연구](https://design.google/library/expressive-material-design-google-research)와 [Wear 디자인 언어](https://developer.android.com/design/ui/wear/guides/get-started/design-language)의 형태·선택 강조를 참고했다. 선택한 버튼의 너비와 둥근 모서리를 함께 바꾸는 독립적인 웹 응용이며 네이티브 Material의 완전한 복제나 웹 공식 규격이라고 설명하지 않는다. 버튼 선택이 실제 네 줄 미리보기의 왼쪽·중앙·오른쪽 정렬과 접근성 이름을 함께 바꾼다.64px 높이·최소44px 폭과 줄바꿈 없는 짧은 라벨을 유지한다.
- **힌지 오프닝 타이포**: [Codrops Animated Opening Type](https://tympanus.net/codrops/2013/11/14/animated-opening-type/)(2013-11-14)의 글자별 축 회전과 그림자를 참고한다. 새2026년 유행이라고 주장하지 않고 원통 회전·플랩 단어 교체에 없는 글자 표면의 왼쪽 힌지 열림을 보완한다. 네 글자와 각 의사 요소를 같은 DOM에 유지하고 native 버튼 하나로 회전·그림자 변형을 왕복한다. 실제280px 화면에서 암묵적 그리드 열이224px로 남아 마지막 글자가 잘려, 힌지 버튼에만 minmax(0,1fr) 열을 지정했다. 기존 다른 타이포 버튼의 배치는 바꾸지 않는다.

이번 묶음도 기존 CSS·SVG·네이티브 입력만 사용하며 새 패키지·서버를 추가하지 않는다. 코드와 프롬프트를 함께 대조하고 독립 검토 후 실제 렌더링에서 발견한 좁은 폭 문제를 수정한다. 의미 없는 보조 제목·완료 문구·실행 횟수를 넣지 않으며 페이지·속성·조작에 필요한 내용만 표시한다.

### 병렬 확장 네 번째 묶음: 컴포넌트 반응형·활동 기록·콜라주·디졸브·카메라·장면 전환·그룹 스크롤

- **컨테이너 쿼리 미디어 카드**: [web.dev의 실제 컨테이너 쿼리 사례](https://web.dev/articles/baseline-in-action-container-queries)(2025-10-23)를 확인했다. 기존 자동 열맞춤과 달리 카드 내부의 그림·본문 구도를 컨테이너220px 경계에서 바꾼다. 실제 폭 입력과 named container만 사용하고 화면 폭 추정이나 별도 모드 상태를 추가하지 않는다.
- **컨테이너 반응형 헤더 메뉴**: [GOV.UK Service navigation](https://design-system.service.gov.uk/components/service-navigation/)의 좁은 화면 탐색을 참고한다. 동일 목적지를 가로 목록과 네이티브 details 메뉴로 전환하고 로컬 페이지 아트워크를 바꾼다. 네이티브 열림 상태를 React 상태로 중복하지 않으며 선택·Escape·포커스 이탈의 닫힘과 선택 후 summary 복귀를 연결한다.
- **활동 기록 타임라인**: [GitHub Primer Timeline](https://primer.style/product/components/timeline/)과 [Ant Design Timeline](https://ant.design/components/timeline/)에서 빠져 있던 시간순 연결 목록을 보완했다. 실제 시간·활동 본문과 추가 기록만 표시하고 마지막 항목 아래 연결선은 제거한다. 두 라이브러리를 설치하거나 서버 활동 수집을 있다고 설명하지 않는다.
- **다이컷 스티커 콜라주**: [Adobe의2026 디자인 전망](https://www.adobe.com/in/express/learn/blog/design-trends-2026)(2025-12-12)의 자유로운 겹침 구성을 참고한다. 세 가지 자체 벡터 실루엣의 흰 절단 여백과 비대칭 겹침으로 해석하며 이미지 자산·가짜 드래그·추가 문구는 넣지 않는다.
- **노이즈 디졸브 타이포**: Thibault Introvigne의 [Codrops Gommage](https://tympanus.net/codrops/2026/01/28/webgpu-gommage-effect-dissolving-msdf-text-into-dust-and-petals-with-three-js-tsl/)(2026-01-28)와 [SVG 필터 타이포 사례](https://tympanus.net/codrops/2024/08/22/scroll-based-svg-filter-animations-on-text/)(2024-08-22)를 확인했다. 노이즈로 잉크가 소실되는 발상만 독립 SVG로 구현한다. 고정 노이즈·알파 임계값·SourceGraphic 합성으로 원래 테마 색을 유지하며 실제 WebGPU/MSDF/파티클/블룸 기능을 제공한다고 쓰지 않는다.
- **돌리 줌 원근 압축**: [Adobe Dolly zoom](https://www.adobe.com/creativecloud/video/production/cinematography/camera-shots-and-angles/dolly-zoom-shot.html)의 피사체 크기 유지와 배경 원근 변화를 보완한다. 초점거리와 카메라 거리를 함께 바꾸는 간단한 핀홀 투영이며 단일 장면 scale로 대체하지 않는다. 복도 광선은 깊이0의 투영 모서리에서 연결해 모든 중간 프레임 모서리와 같은 직선 위에 놓이도록 수정했다.
- **베네시안 블라인드 전환**: [Adobe의 전환 효과 설명](https://helpx.adobe.com/after-effects/desktop/apply-effects-and-animation-presets/list-of-effects/transition-effects.html)을 확인했다. 독립 색띠 대신 완전한 두 자체 SVG 풍경 사이를8개 수평 클립으로 전환한다. 실제 모바일 검증에서 고정 높이와 비균일 매핑이 해를 타원으로 왜곡해, 불필요한 preserveAspectRatio none을 제거하고11:6 균일 축소로 수정했다.
- **그룹별 밀어내는 고정 헤더**: [CSS Positioned Layout의 sticky 규칙](https://drafts.csswg.org/css-position-3/#sticky-pos)과 [MDN overflow 접근성](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow#accessibility)을 확인했다. 단일 추천 배너와 달리 section별 헤더가 다음 그룹에 밀려난다. 이름이 있는 포커스 가능한 네이티브 스크롤 영역과 실제 견본 목록만 유지하고 스크롤 추적 상태나 이벤트를 만들지 않는다.

각 디자인의 구현 직후 테스트·불필요한 코드 정리·새 독립 검토를 수행한다. 카테고리별 등록 목록은 첫 실제 구현이 생겼을 때만 공통 연결에 추가하며 빈 스텁은 만들지 않는다. 실제 화면에서 발견한 수정도 해당 테스트와 새 검토 후 반영하고, 전체 테스트·빌드와 양테마·모바일·복사·저장 복원 확인을 완료해야 다음 디자인을 시작한다.

### 병렬 확장 다섯 번째 묶음: 구조·재질·광고 구성의 누락 보완

- **명명 영역 작업 화면 그리드**: [MDN Grid template areas](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Grid_template_areas)와 [web.dev Grid](https://web.dev/learn/css/grid)를 확인했다. 머리말·탐색·본문·꼬리말을 실제 영역 지도로 연결하며 탐색 해제는 본문 공간을 확장한다. 좁은 컨테이너에서는 탐색 영역을 가로 행으로 바꾼다.
- **초성 색인 점프 내비게이션**: [W3C G124](https://www.w3.org/WAI/WCAG22/Techniques/general/G124)와 [NHS A-Z 목록](https://www.nhs.uk/health-a-to-z/conditions/)을 참고한다. 이미 렌더된 한글 이름 목록의 위치와 제목 포커스를 함께 옮긴다. 원본 자료의 의료 내용은 사용하지 않으며 전체 접근성 준수를 주장하지 않는다.
- **문맥 접기 코드 비교뷰**: [GitHub 변경 검토](https://docs.github.com/en/pull-requests/how-tos/review-pull-requests/reviewing-proposed-changes-in-a-pull-request)와 [VS Code 변경 비교](https://code.visualstudio.com/docs/sourcecontrol/staging-commits)를 확인했다. 실제 삭제·추가 행은 유지하고 변하지 않은 문맥만 접는다. 색 외에 기호와 읽기용 삭제·추가 이름을 제공하며 실제 Git 조회는 없다.
- **양축 고정 스크롤 표**: [MDN 작은 공간의 표](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/table#displaying_large_tables_in_small_spaces)와 [CSS sticky 표준](https://www.w3.org/TR/css-position-3/#sticky-pos)을 확인했다. 상단 열 제목·왼쪽 행 이름·교차 셀을 각각 실제 sticky로 유지한다. 네이티브 양축 스크롤과 표 의미를 보존하고 위치 복제 상태를 만들지 않는다.
- **명암 ASCII 아트**: [Webflow의2026 디자인 사례](https://webflow.com/blog/web-design-trends-2026)를 참고한다. 명암을 여러 문자 밀도로 매핑하는 자체 구체를 만들고 직사각 문자 셀의 비율을 보정한다. 픽셀 점 마스크와 구분되며 외부 사진·폰트 없이 고정된 문자 격자를 사용한다.
- **평직 패브릭 질감**: [CottonWorks의 직물 구조](https://cottonworks.com/learning-hub/weaving/basic-woven-fabric-designs/)와 [Pratt 직조 자료](https://textileresearchlab.pratt.edu/construction/wovens)를 확인했다. 단순 체크 배색 대신 날실·씨실이1/1로 위아래를 교대하는 실제 SVG 페인트 순서를 사용한다. 정적 스타일에 가짜 조작을 붙이지 않는다.
- **80s 멤피스 기하 패턴**: [Design Museum의 Memphis 설명](https://designmuseum.org/discover-design/all-stories/memphis-group-awful-or-awesome)을 확인했다. 선명한 기하 도형·줄무늬·비대칭 배치를 자체 벡터 구성으로 해석한다. 역사적 스타일의 누락 보완이며 새2026년 발명이나 박물관 이미지 복제로 설명하지 않는다.
- **홀로그래픽 등고선 지형**: [Territory Studio의 Dune: Part Two 작업](https://territorystudio.com/project/dune-part-two/)을 참고한다. 폐곡선 등고선과 투사 가이드·받침으로 높이를 표현하는 정적 SF 스타일이며 실제 지리 데이터·센서·3D 엔진을 제공한다고 쓰지 않는다.
- **잔물결 반사 타이포**: [Codrops 반사 사례](https://tympanus.net/codrops/2024/02/15/reflection-scroll-effect/), [MDN feDisplacementMap](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feDisplacementMap)을 참고한다. 원문 하나를 거울 좌표로 재사용하고 반사본만 수평 굴절·하단 알파 감쇠를 적용한다. 세로 변위 채널을 상수로 고정해 원문과 수면 위치는 움직이지 않는다.
- **타깃 중심 오빗 카메라**: [Adobe 카메라 애니메이션](https://helpx.adobe.com/ph_fil/after-effects/how-to/camera-animation.html)과 [Three.js OrbitControls](https://threejs.org/docs/pages/OrbitControls.html)의 타깃 주위 회전 원리를 확인했다. 라이브러리 없이 고정 입체의 카메라 좌표 투영과 법선 기반 면 가림을 구현한다. 물체의 평면 회전이나 카드 기울임으로 대체하지 않는다.
- **시계 방향 래디얼 와이프**: [Adobe 전환 효과](https://helpx.adobe.com/after-effects/desktop/apply-effects-and-animation-presets/list-of-effects/transition-effects.html)의 Radial Wipe를 확인했다. 원 반지름을 바꾸는 아이리스와 달리 중심에서 시계 방향으로 부채꼴을 넓혀 두 완전한 도시 장면을 교체한다.0·100의 경계를 따로 처리하고 역방향 입력도 같은 장면을 재현한다.
- **슬리브 패키지 언박싱**: [Samsung 제품 언박싱](https://news.samsung.com/global/unboxing-galaxy-z-fold7-powerful-versatility-in-the-thinnest-lightest-z-fold-yet)과 [Adobe MAX 패키징 사례](https://www.adobe.com/max/2024/sessions/barbie-hot-wheels-more-unboxing-content-s6200.html)를 참고한다. 슬리브와 트레이를 반대 방향으로 이동시켜 포장 안 제품을 드러내는 자체 SVG 홍보 컷이다. 실제 포장 가림과 끝의 분리를 유지하며 영상 출력·자동 촬영은 없다.
- **제품 중심 타이포 프레이밍**: [BUCK Comfy](https://www.buck.co/work/comfy-brand-refresh)와 [School of Motion의 타이포 구성](https://schoolofmotion.com/blog/tiny-typography-decisions-motion-graphics)을 참고한다. 카피가 제품의 자리를 만들며 최종 광고 구성을 유지하는 한 번의 시퀀스다. 재생은 시각 그룹만 교체하며 버튼 포커스는 유지한다.
- **워터폴 증감 누적 리빌**: [Highcharts Waterfall 설명](https://www.highcharts.com/docs/chart-and-series-types/waterfall-series)을 확인했다. 증가·감소 기여도를 공중에 떠 있는 막대로 연결하고 최종 합계는 영점에서 시작한다. 예시값80+40−30=90과 실제 축·라벨을 보존하며 차트 라이브러리를 설치하거나 실시간 분석을 주장하지 않는다.
- **단어 강조 자막**: [DaVinci Resolve20 새 기능 안내](https://documents.blackmagicdesign.com/SupportNotes/DaVinci_Resolve_20_New_Features_Guide.pdf)의 Animated Subtitles(p28)를 확인했다. 전체 두 줄 자막을 유지하며 정해진 큐의 한 단어만 강조한다. 실제 음성 분석·오디오 재생 없이 일시정지·재개하며,2025년 도입 사례를2026년 새 기능으로 과장하지 않는다.

이번15개도 먼저 전역 카탈로그와 기존 데모를 대조해 단순 배색·모서리 변형을 제외했다. 실제 콘텐츠인 자막·광고 카피·차트 값·코드 행은 유지하되 효과 설명용 보조 문구는 넣지 않는다. 정적 예시는 상태·타이머 없이 유지하고, 자동 CSS 모션은 감소 모션에서 정적인 결과를 제공한다. 공용 연결은 별도 새 검토자가 기존122개 ID와 데모 연결 보존까지 확인했다.

## 여섯 번째 묶음: 누락된 구조·재질·제작 기법

2026-10-18 기준14개 선정. 기존 전체 카탈로그와 데모를 검색해 각 기법의 입력·배치·표현 원리가 겹치지 않는지 대조했다. 역사적 기법과 현재의 유행 근거를 구분하며, 아래 도구나 라이브러리를 새 의존성으로 설치하지 않는다.

- **풀블리드 기사 그리드**: [MDN 명명 그리드 라인](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Named_grid_lines)과 [web.dev subgrid 기사 예시](https://web.dev/articles/css-subgrid)를 참고한다. 직접 자식의 읽기 폭과 그림의 전체 폭을 별도 라인에 배치하므로 불필요한 subgrid는 추가하지 않는다.
- **방문 기록 앞뒤 탐색 바**: [MDN History API 개념](https://developer.mozilla.org/en-US/docs/Web/API/History_API/Working_with_the_History_API), [WHATWG 앞으로 기록 제거](https://html.spec.whatwg.org/multipage/browsing-the-web.html#clear-the-forward-session-history)를 참고한다. 데모 안의 실제 방문 순서만 복원하며 전역 브라우저 기록을 변경하지 않는다.
- **구조화 JSON 펼침 뷰**: [Mantine JsonViewer](https://mantine.dev/code-highlight/json-viewer/)의 계층·자료형 구분 패턴을 참고한다. native details/summary와 작은 고정 자료만 사용하며 별도 트리 키보드 모델·복사 기능·개수 배지는 추가하지 않는다.
- **러프 스케치 와이어프레임**: [Adobe2026 전망의 유기적·불완전 디자인](https://www.adobe.com/in/express/learn/blog/design-trends-2026)과 [RoughJS 저자의 원리 설명](https://shihn.ca/posts/2020/roughjs-algorithms/)을 확인했다. 자체 고정 곡선을 두 번 그린 정적 벡터이며 난수 엔진이나 원본 자산 복제가 아니다.
- **더치 앵글 카메라 롤**: [Adobe Dutch angle](https://www.adobe.com/creativecloud/video/production/cinematography/camera-shots-and-angles/dutch-angle-shot.html)을 참고한다. 고정 프레임 안에서 광축 롤의 반대 방향으로 세계 전체를 회전하며 여분 배경으로 빈 모서리를 막는다.
- **블록 디졸브 전환**: [Adobe Block Dissolve](https://helpx.adobe.com/after-effects/desktop/apply-effects-and-animation-presets/list-of-effects/transition-effects.html)의 정사각 블록 소실을 고정 순열로 재현한다. 실제 축소 화면에서 발견된 클립 경계 이음선은 [SVG2 shape-rendering](https://www.w3.org/TR/SVG2/painting.html#ShapeRenderingProperty)을 각 클립 도형에 적용하고 브라우저에서 재확인했다. 렌더링 힌트이므로 속성 테스트만으로 픽셀 결과를 보장하지 않는다.
- **양끝 그림자 스크롤 목록**: [Lea Verou 원리 설명](https://lea.verou.me/blog/2012/04/background-attachment-local/)을 참고해 local 덮개와 scroll 그림자를 겹친다. 스크롤 이벤트·위치 상태 없이 실제 남은 콘텐츠 방향을 보여 준다.
- **옹이 우드그레인**: [USDA 목재 구조](https://research.fs.usda.gov/treesearch/7154)와 [Wood Handbook](https://research.fs.usda.gov/treesearch/62244)의 옹이 주변 불규칙 결을 참고한다. 누락된 재질 보완이며 자체 곡선과 옹이·측면 두께를 사용한다.
- **아르데코 선버스트 프레임**: [V&A Art Deco](https://www.vam.ac.uk/articles/art-deco-printmakers), [Met French Art Deco](https://www.metmuseum.org/essays/french-art-deco)를 참고한다. 계단형 건축 프레임과 좌우 대칭 반원 부챗살을 자체 구성해 멤피스·원형 로제트와 구분한다.
- **엑스레이 장비 투시**: [Territory Studio Prometheus](https://territorystudio.com/project/prometheus/), [제작자 인터뷰의 Radiography 사례](https://derivative.ca/community-post/soma-cg-drives-all-screen-visuals-set-ridley-scotts-alien-covenant/60666)를 참고한다. 반투명 외피·축·코일의 자체 장식 벡터이며 실제 X선·의학 판독 기능은 없다.
- **스톱모션 제품 플랫레이**: [A+C Studios의 현재 브랜드 제작 사례](https://aplusc.tv/stop-motion-for-brands/)를 확인했다. 직접 조절하는 진행값을 여덟 고정 포즈에 대응시켜 연속 보간 없이 장면이 바뀐다. 자동 영상 출력·촬영은 없다.
- **타이포·제품 매치컷**: [Adobe match cut](https://www.adobe.com/in/creativecloud/video/discover/match-cut.html)을 참고한다. 같은 원형 윤곽을 고정하고0.9초에 주변 카피와 원 내부를 하드컷한다. 형태 모핑이나 장면 와이프로 대체하지 않는다.
- **덤벨 쌍점 변화 모션**: [Highcharts dumbbell 설명](https://www.highcharts.com/docs/chart-and-series-types/dumbbell-series)과 [이전·이후 마커 예시](https://www.highcharts.com/demo/highcharts/dumbbell-markers)를 참고한다. 공통 척도에서 이전 빈 원·이후 채운 원·연결선으로 증가와 감소를 모두 표현하며 범례와 실제 수치를 보존한다.
- **엔딩 크레딧 롤**: [Adobe Premiere 크레딧 롤](https://helpx.adobe.com/premiere/desktop/add-text-images/insert-images-and-graphics/create-credit-rolls.html)을 확인했다. 역할·이름 두 열이 위로 이동하고 마지막 퇴장 뒤 잠시 쉰다. native 버튼으로 같은 위치에서 일시정지·재개한다.

각 구현은 즉시 범위 테스트와 불필요한 상태·타이머·CSS·중복 정리 후 새로운 독립 검토자를 거친다. 실제 화면은 양 테마와 넓은·좁은 폭에서 확인하며, 정적 검토와 자동 테스트를 브라우저 재현성의 증거로 대신하지 않는다.

## 일곱 번째 묶음: 실제 크롭·계층 탐색·자료 변환

2026-10-18 조사. 이번 14개도 전체 카탈로그의 이름뿐 아니라 기존 데모의 입력과 표현 원리를 대조했다. 새 라이브러리를 설치하지 않고, 빠져 있던 기법을 기존 React·CSS·SVG로 구현한다.

- **종횡비 고정 썸네일 그리드**: [web.dev의 이미지 갤러리 예시](https://web.dev/articles/baseline-in-action-image-gallery), [MDN object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/object-fit)을 확인했다. 서로 다른 고유 비율의 실제 이미지 세 개를 같은 셀 비율로 크롭한다. 자체 SVG를 실제 img로 불러오며 단일 그림의 확대 효과와 구분한다.
- **키보드 계층 파일 트리**: [W3C APG Navigation Treeview](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/examples/treeview-navigation/)의 단일 탭 진입점·방향키·부모와 자식 이동·그룹 소유 관계를 참고했다. 일반 접기 메뉴와 다른 실제 트리 탐색 예시이며, 파일을 열거나 파일시스템에 접근하지 않는다. 브라우저 키보드 검증과 보조기술 검증은 구분한다.
- **날짜 전환 타임그리드**: [FullCalendar TimeGrid](https://fullcalendar.io/docs/timegrid-view), [SAP Single Planning Calendar](https://www.sap.com/design-system/fiori-design-web/v1-84/ui-elements/single-planning-calendar)의 시간축과 기간 배치를 참고한다. 날짜별 고정 자료를 바꾸면 시작 시각과 지속 시간에 맞춰 블록의 위치·높이가 바뀐다. 예약·편집 정책은 추가하지 않는다.
- **원근·정투영 카메라 전환**: [Three.js OrthographicCamera](https://threejs.org/docs/pages/OrthographicCamera.html), [Adobe의 3D 표시 설명](https://helpx.adobe.com/acrobat/using/displaying-3d-models-pdfs.html)을 참고한다. 같은 세계 좌표·카메라에서 원근 나눗셈만 전환하여 거리별 크기와 격자의 소실점 차이를 보여 준다. WebGL·카메라 장비 연동은 없다.
- **루마 그라데이션 와이프**: [Adobe Gradient Wipe](https://helpx.adobe.com/after-effects/desktop/apply-effects-and-animation-presets/list-of-effects/transition-effects.html)를 참고한다. 고정 회색 지도에서 어두운 영역부터 투명해지도록 밝기를 알파로 변환한다. 블록 제거·텍스트 노이즈·전체 페이드와 다른 장면 전환 원리다.
- **독립 분할 스크롤 패널**: [MDN overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow), [CSS Overflow 사양](https://www.w3.org/TR/css-overflow-3/#overflow-properties)을 확인했다. 두 실제 스크롤 창을 같은 높이의 격자에 배치하고 각자의 위치를 독립 유지한다. 선택·동기화·리사이즈 같은 별도 동작은 붙이지 않는다.
- **자연광 창틀 오버레이**: [Webflow의 2025 창문·그림자 오버레이](https://webflow.com/blog/web-design-trends-2025), [Adobe Terra Memory의 자연적 분위기](https://www.adobe.com/express/learn/blog/microtrend-terra-memory)를 참고한다. 종이와 주변 표면에 여러 창틀의 부드러운 그림자를 연속으로 겹치는 정적 공간 스타일이다. 단일 가림막의 투영 계산·블라인드 전환과 구분한다.
- **브러시드 메탈**: [Outokumpu Deco 표면](https://www.outokumpu.com/en/products/product-ranges/deco), [worldstainless 표면 처리](https://worldstainless.org/about-stainless/process-and-production/surface-treatment/)를 참고한다. 단방향 미세 연마결·넓은 반사띠·얇은 베벨을 자체 벡터로 구성해 매끈한 크롬이나 홀로포일과 구분한다.
- **리소그래프 색판 어긋남**: [RISO 다색 인쇄](https://www.riso.co.jp/showcase/solution/multicolorprinting.html), [Illinois 인쇄 스튜디오 안내](https://web.faa.illinois.edu/app/uploads/sites/6/2021/05/riso_print_guide.pdf)를 확인했다. 고정 분홍 판 위의 파랑 점묘·윤곽 판만 이동하며 겹친 잉크와 가장자리 틈을 드러낸다. 발광 RGB 글리치·듀오톤 색 변환과 구분되는 인쇄 스타일 근사다.
- **옵아트 핀치 체커보드**: [Yale Center for British Art의 기하 착시 설명](https://bridget-riley.publications.britishart.yale.edu/catalogue/1/)을 참고한다. 자체 대칭 열 폭을 중앙으로 압축하고 행 높이를 유지해 평면이 접혀 보이는 정적 착시를 만든다. 원작 이미지 자산을 사용하거나 특정 작품을 그대로 재현하지 않는다.
- **제품 부위 연결 콜아웃**: [Adobe 모션 추적의 부착 원리](https://www.adobe.com/in/products/aftereffects/motion-tracking.html)를 참고한다. 직접 이동시킨 예시 제품의 다이얼과 연결선 시작점이 붙어 있고 부위 이름은 고정된다. 실제 영상 인식·자동 추적을 제공한다고 표현하지 않는다.
- **교정 마크 카피 광고**: [BUCK Residence의 손으로 그린 동작 언어](https://buck.co/work/residence-rebrand)를 참고했다. 자체 광고 카피에서 취소선을 그리고 삽입 기호와 대체 단어를 순서대로 보여 준다. 해당 자료가 교정 광고 자체를 제공한다는 주장은 하지 않으며, 단순 마커 강조·글자 모핑과 구분한다.
- **히스토그램 구간 재집계**: [Highcharts Histogram](https://www.highcharts.com/docs/chart-and-series-types/histogram-series)을 확인했다. 원시 표본 16개를 구간 폭 10·20으로 직접 재집계하고 마지막 상한값도 포함한다. 범주 막대나 누적 증감 차트와 달리 같은 원자료의 구간별 빈도를 비교한다.
- **그린스크린 색차 키잉**: [Adobe Keying effects](https://helpx.adobe.com/premiere/desktop/add-video-effects/effects-and-transitions-library/keying-effects.html), [SVG 색 행렬 사양](https://www.w3.org/TR/filter-effects-1/#feColorMatrixElement)을 참고한다. 녹색 우세 영역의 알파만 줄이고 전경 RGB를 보존해 아래 도시 장면을 드러낸다. 단순 색차 근사이며 실제 영상 입력·완전한 Ultra Key·출력 기능은 없다.

각 항목의 독립 코드 검토 외에 별도의 새 검토자가 라이트 화면 14장과 트리·일정표의 좁은 다크 화면을 직접 확인했다. 실제 입력·중간 상태·원위치 복귀·두 테마·세 화면 폭은 주 담당자가 확인하며, 저장 화면 검토를 동작 검증으로 대신하지 않는다.

## 여덟 번째 묶음: 열 기준선·메가 메뉴·국소 모션

2026-10-18 조사. 전체 카탈로그의 입력·배치·표현 원리를 먼저 대조하고, 최신 사례와 오래됐지만 빠져 있던 필수 기법을 구분했다. 아래 제품의 기능이나 자산을 가져오는 대신 기존 React·CSS·SVG로 각 원리를 구현한다.

- **12열 스팬 그리드 시스템**: [MDN의 공통 그리드 배치](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Common_grid_layouts), [web.dev Grid](https://web.dev/learn/css/grid)를 참고했다. 같은 12개 트랙에서 주·보조 영역의 span만 바꾸고 아래 4열 블록과 기준선을 일치시킨다. 독립 비율 너비나 가짜 기준선으로 대체하지 않는다.
- **그룹형 리소스 메가 메뉴**: [NN/G 메뉴 지침](https://www.nngroup.com/articles/menu-design/)의 명확한 분류·클릭으로 열기·충분한 조작 크기와 [Adobe 접근성 예시](https://adobe-accessibility.github.io/Accessible-Mega-Menu/)의 일반 탐색 의미를 참고한다. 두 분류의 네 실제 예시 화면을 연결하며, 선택·Escape·외부 입력에 맞춰 닫기와 포커스를 처리한다.
- **축 전환 비교 매트릭스**: [GOV.UK Table](https://design-system.service.gov.uk/components/table/), [Microsoft 행·열 바꾸기](https://support.microsoft.com/en-US/Excel/transpose-rotate-data-from-rows-to-columns-or-vice-versa)를 참고한다. 같은 여섯 포함 관계를 유지하고 행·열 제목과 scope를 함께 바꾼다. 정렬이나 필터링과 다른 자료 표현이다.
- **세리프 여백 브랜딩**: [Canva 2026 전망](https://www.canva.com/newsroom/news/design-trends-2026/)에서 세리프·절제된 팔레트·단순한 로고를 다룬 Opt-Out Era를 담당자가 원문 확인했다. 시스템 세리프 한 단어와 넓은 자간·얇은 선으로 해석하며 장식 프레임·고딕 격자 스타일과 구분한다. SVG 배치 길이와 실제 글리프의 잉크 경계가 다름을 프롬프트에 명시했다.
- **고정 위치 수평 팬**: [Adobe Pan shot](https://www.adobe.com/creativecloud/video/production/cinematography/camera-shots-and-angles/pan-shot.html)을 참고한다. 카메라 위치·피치를 유지하고 yaw에 따라 고정 입체와 바닥을 재투영한다. 평면 이동이나 카메라 위치가 도는 오빗으로 대체하지 않는다. 방향 표시는 기존 SVG 아이콘을 재사용한다.
- **광학 렌즈 플레어**: [Adobe Generate effects](https://helpx.adobe.com/after-effects/desktop/apply-effects-and-animation-presets/list-of-effects/generate-effects.html), [광학 중심 대칭 관련 논문](https://arxiv.org/abs/2303.15046)을 참고한다. 광원과 광학 중심을 잇는 축의 반대편으로 고스트를 이동시키며, 반사 계수 하나는 정확한 점대칭으로 둔다. 완전한 광선 추적이나 실제 렌즈 시뮬레이션은 아니다.
- **세로 컬렉션과 가로 선반**: [MDN overflow-x](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow-x), [CSS Overscroll](https://www.w3.org/TR/css-overscroll-1/)을 참고한다. 독립 가로 포스터 선반 두 개를 세로 목록 안에 두고 가로 선반 위의 세로 휠은 부모로 이어지게 한다. 스크롤 이벤트·위치 상태·가짜 화살표를 추가하지 않는다.
- **페블 그레인 가죽**: [Spinneybeck Hand Tipped](https://www.spinneybeck.com/shop/product/Hand-Tipped-HT/ht-1522-fiddletown)의 도드라진 요철과 돌출부 색 차이를 참고한다. 불규칙한 닫힌 셀·어두운 골·봉제선을 자체 벡터로 구성한 정적 재질이다.
- **7세그먼트 LED 디스플레이**: [Adafruit 안내](https://learn.adafruit.com/adafruit-7-segment-led-featherwings), [제조사 세그먼트 자료](https://cdn-shop.adafruit.com/datasheets/AD-121F2_cat_e.pdf)를 확인했다. 일곱 고정 조각의 점등 조합으로 실제 0~9를 표시하며 시계·자동 카운터·전기 회로 시뮬레이션을 붙이지 않는다.
- **PCB 구리 배선 스타일**: [KiCad 배선 안내](https://docs.kicad.org/9.0/en/pcbnew/pcbnew.html#routing-tracks)를 참고한다. 칩의 12개 핀에서 비아까지 수평·수직·45도 선을 실제 접점에 연결한다. 장식용 자체 회로 구성으로 전기적 유효성을 주장하지 않는다.
- **선택적 모션 시네마그래프**: [Adobe Cinemagraph 안내](https://www.adobe.com/creativecloud/video/discover/how-to-make-a-cinemagraph.html)의 대부분 정지·작은 영역 반복 원리를 참고한다. 촛불만 움직이고 제품과 세트는 고정하며, 같은 애니메이션 위상에서 일시정지·재개한다. 2018년 제품 홍보 사례는 역사적 배경으로만 취급한다.
- **제품 뒤 통과 타이포**: [Adobe의 2026-06-01 제작 예시](https://www.adobe.com/learn/premiere-pro/web/text-behind-subject-object-mask?src=helpx)를 참고한다. 자체 운동화 실루엣을 글자 다음에 그려 전경으로 가리고, 글자가 위로 빠져나온 최종 광고 구성을 유지한다. AI 마스크 추적·영상 입력을 제공한다고 쓰지 않는다.
- **상자 수염 다섯 수치 리빌**: [Highcharts Box plot](https://www.highcharts.com/docs/chart-and-series-types/box-plot-series)을 참고한다. 같은 0~100 축에 최소 10·Q1 25·중앙 50·Q3 75·최대 90을 배치하고 수염은 최소·최대를 연결한다. 원자료 없는 1.5 IQR·이상치 계산을 만들어 넣지 않는다.
- **모서리 픽처 인 픽처**: [Blackmagic ATEM Mini 시작 안내](https://www.blackmagicdesign.com/products/atemmini/gettingstarted)의 PiP 구성을 참고한다. 메인 풍경을 유지하고 발표자 작은 화면을 네 모서리로 이동한다. 실제 영상 송출이나 브라우저·OS PiP API를 사용하지 않는다.

각 디자인은 즉시 범위 테스트와 불필요한 코드 정리 후 새 독립 검토자를 거쳤다. 주 담당자는 양테마·세 화면 폭의 배치 84조건, 실제 입력·스크롤·중간 가림·일시정지·복사·저장 복원과 카드 행 정렬을 확인했다. 별도의 새 검토자는 라이트 14장과 좁은 다크 3장을 직접 열어 확인했다. 가죽의 처음 규칙적 격자는 큰 화면에서 직물처럼 보여, 크기·위치·각도가 다른 둥근 요철과 약한 음영으로 수정했다. 이 수정본도 새 코드 검토·화면 검토와 전체 테스트·빌드를 다시 통과했다. 실제 모바일 기기·보조기술과 OS 모션 감소 설정의 실행 검증은 이 확인 범위에 포함하지 않는다.

## 아홉 번째 묶음: 내재적 크기·면적 부호화·제작용 시각 언어

2026-10-18 조사. 새로운 항목도 전체 카탈로그와 데모를 대조해, 같은 효과의 배색 변형을 제외했다. 최신 제작 사례와 빠져 있던 필수 기법을 함께 검토하며, 역사적 기법의 발명 시점을 현재 유행으로 바꾸어 설명하지 않는다.

- **자연 너비 라벨·값 그리드**: [MDN fit-content()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/fit-content_function)의 내재적 크기 제한을 참고한다. 실제 정의 목록의 항목명이 바뀌면 첫 열은 내용에 맞게 늘다가 35%에서 줄바꿈하고, 두 번째 열의 값은 같은 시작선을 공유한다. JS 폭 측정이나 고정 라벨 열과 구분한다.
- **우선순위 오버플로 내비게이션**: [Bootstrap Priority+ 문서](https://getbootstrap.com/docs/6.0/components/nav-overflow/)의 주요 항목 유지·넘치는 목적지 모으기를 참고한다. 라이브러리는 설치하지 않고, 고정 네 항목에 필요한 실제 폭을 기준으로 컨테이너 쿼리를 사용한다. 전체 탐색을 숨기는 기존 헤더 메뉴와 다르다.
- **목록·격자 파일뷰 전환**: [Google Drive의 보기 전환 안내](https://support.google.com/drive/answer/2375177)를 참고한다. 같은 네 파일의 실제 메타데이터와 순서·노드를 보존하고 48px 행과 104px 타일로 재배치한다. 파일 열기·업로드·가짜 선택 기능은 추가하지 않는다.
- **연결 곡선 트루셰 타일**: [Bridges 2023 원논문](https://archive.bridgesmathart.org/2023/bridges2023-461.pdf)의 대각 모서리 사분원과 경계 연결 원리를 참고한다. 여덟 개의 같은 정사각 모듈을 고정 회전시킨 자체 곡선 구성이며, 논문의 적응적 명암·니팅 알고리즘을 제공하는 것은 아니다.
- **틸트 업 건축 리빌**: [Adobe의 카메라 동작 정의](https://helpx.adobe.com/pdf/adobe_story_reference.pdf)를 참고한다. 고정 위치의 카메라를 수직 회전해 건물 꼭대기를 드러내며 수평선과 수직선 소실점도 바뀐다. 오래된 기본 촬영 기법을 보완한 것으로, 평면 이동이나 수평 팬의 단순 이름 변경이 아니다.
- **하이라이트 블룸**: [Adobe Glow 효과](https://helpx.adobe.com/after-effects/desktop/apply-effects-and-animation-presets/list-of-effects/stylize-effects.html)를 참고한다. 실제 원본의 밝은 픽셀을 추출하고 흐린 빛을 원본에 가산한다. 별도 광원·고스트를 그리는 렌즈 플레어와 구분하며, 어두운 도형을 함께 번지게 만들지 않는다.
- **문서 스크롤 위치 진행선**: [MDN scrollTop](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTop), [HTML progress](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/progress)를 참고한다. 실제 남은 스크롤 범위에 대한 위치를 표시하고 양끝과 초과 값을 제한한다. 읽기 완료·요청 완료를 추정하는 기능은 아니다.
- **테라조 골재 표면**: [NTMA](https://ntma.com/), [TERRAZZCO 골재 설명](https://terrazzco.com/aggregate-series/)의 골재와 바탕재 구성을 참고한다. 각진 여러 색 칩을 하나의 매끈한 앞면 안에 배치하므로 가죽 요철이나 입체 직조와 구분된다.
- **리노컷 잎맥 판화**: [V&A 판화 설명](https://www.vam.ac.uk/articles/what-is-print)을 참고한다. 단색 잎 실루엣 안의 가늘고 굵은 음각을 실제 마스크로 파내 종이를 드러낸다. 색판 어긋남이나 반복 해칭 대신 자체 식물 구도의 볼록판 인쇄 언어를 표현한다.
- **은선 아이소메트릭 도면**: [Autodesk의 숨은 선 설명](https://help.autodesk.com/cloudhelp/2025/ENU/AutoCAD-Mechanical/files/GUID-2CBB609D-D196-42AA-BD51-1E92CBCF632A.htm)을 참고한다. 불투명 블록의 보이는 모서리는 실선, 가려진 구멍 벽과 아래 단면은 파선으로 구분한다. 실제 CAD 계산·치수 측정 기능은 없다.
- **다층 제품 단면 스캔**: [KeyShot 2024 Cutaway](https://manuals.keyshot.com/keyshot2024/manual/cutaway.html)의 제품 내부 공개 원리를 참고한다. 고정된 구의 절단 위치에 맞춰 각 층의 단면 반경을 계산하며, 실제 절단선과 별도 단면도를 함께 보여 준다. 예시 구의 수학적 단면으로 실제 재료 분석을 주장하지 않는다.
- **가로·세로 카피 리프레이밍**: [Adobe 2026 Reframe 활용 안내](https://helpx.adobe.com/firefly/web/work-with-enterprise-features/creative-production/reframe-api-use-cases.html)의 매체별 구성 변경 맥락을 참고한다. 같은 카피와 제품을 보존하며 실제 16:9·9:16 캔버스에 재배치한다. API 호출·영상 출력이나 자동 인식 기능은 없다. 전환의 중간 프레임에서도 단어가 겹치지 않는지 별도로 확인한다.
- **트리맵 계층 면적 리빌**: [Highcharts Treemap](https://www.highcharts.com/docs/chart-and-series-types/treemap)을 참고한다. 부모 폭과 자식 높이를 실제 합계·비율에서 계산해 네 잎의 면적을 40·20·25·15%로 보존한다. 임의 크기의 벤토 배치나 색만 달라지는 히트맵과 구분한다.
- **방송 컬러바 패턴**: [Adobe의 Bars and Tone 안내](https://helpx.adobe.com/premiere/desktop/add-video-effects/commonly-used-effects/calibrate-audio-and-video-using-bars-and-tone.html)를 참고한다. 색 막대·정렬 띠·명암 패치를 빈틈없이 연결한 로컬 시각 패턴이다. 교정된 신호 발생기나 정확한 SMPTE·EBU 준수, 오디오 재생 기능이라고 표현하지 않는다.

정적 재질·패턴에는 불필요한 상태나 조작을 만들지 않는다. 실제 자료명·차트 값·광고 카피는 디자인 콘텐츠로 유지하고, 설명용 제목·캡션·실행 횟수는 넣지 않는다. 새 독립 코드 검토와 실제 화면·입력 검증은 서로 대체하지 않으며, 애니메이션은 최종 모습뿐 아니라 이동 중 배치도 확인한다.

## 열 번째 묶음: 빠진 기본 패턴과 시각 언어

이번 묶음은 새로 발명된 기법이라는 주장보다 카탈로그에 없던 기본 메커니즘을 보완하는 데 중점을 둔다. 각 항목은 전체 카탈로그의 이름뿐 아니라 실제 작동 방식과 용도를 대조한 뒤 선정했다.

- **혼합 크기 글자 기준선 그리드**: [CSS Box Alignment](https://www.w3.org/TR/css-align-3/#baseline-align-self), [CSS Grid 기준선](https://www.w3.org/TR/css-grid-2/#grid-baselines)을 참고한다. 서로 다른 크기의 숫자를 실제 첫 텍스트 기준선으로 정렬하며 가운데 정렬과 비교한다. 부모 행을 공유하는 subgrid와 다른 정렬 문제다.
- **본문 바로가기 스킵 내비게이션**: [W3C G1](https://www.w3.org/WAI/WCAG22/Techniques/general/G1), [G123](https://www.w3.org/WAI/WCAG22/Techniques/general/G123)을 참고한다. 반복 메뉴를 건너뛰어 현재 본문 제목에 포커스를 옮기고 다음 Tab이 메뉴를 우회하도록 한다. 데모에서는 항상 보이는 링크를 사용하며 URL 해시나 페이지 스크롤 변경을 요구하지 않는다.
- **양방향 목록 항목 이동**: [PatternFly Dual list selector](https://www.patternfly.org/components/dual-list-selector/), [Ant Design Transfer](https://ant.design/components/transfer/)를 참고한다. 체크한 항목을 대기·포함 두 목록 사이로 실제 이동시키며 전체 항목과 원래 순서를 유지한다. 기존 보기 방식 전환이나 체크박스 그룹과 구분된다.
- **로우폴리 다면 일러스트**: [Adobe Low-poly 안내](https://www.adobe.com/products/substance3d/discover/how-to-create-low-poly-3d-models-and-characters.html), [Illustrator 기본 도형](https://www.adobe.com/learn/illustrator/web/draw-basic-shapes)을 참고한다. 꼭짓점을 공유하는 삼각 면의 단색 명암으로 자체 배 일러스트를 구성한다. 로컬 2D 벡터이며 3D 모델링이나 자동 삼각분할 기능이 아니다.
- **수평 트럭 오클루전 리빌**: [Adobe 카메라 도구](https://helpx.adobe.com/after-effects/desktop/work-with-layers/camera-layer/cameras-lights-points-interest.html)의 Track XY와 Orbit·Track Z 구분을 참고한다. 카메라 방향과 세계 좌표를 유지한 채 수평 위치를 바꾸고 거리별 투영과 불투명 기둥의 가림을 함께 계산한다. 임의 속도의 레이어 이동과 구분된다.
- **라플라시안 윤곽 검출**: [Adobe Find Edges](https://helpx.adobe.com/after-effects/desktop/apply-effects-and-animation-presets/list-of-effects/stylize-effects.html), [W3C feConvolveMatrix](https://www.w3.org/TR/filter-effects-1/#feConvolveMatrixElement)를 참고한다. 채운 그림의 실제 이웃 픽셀 밝기를 합성곱으로 비교하고 양의 경계를 원본과 혼합한다. 미리 그린 윤곽선이 아니며 실제 선의 두께는 래스터화 조건의 영향을 받는다.
- **비례 동기화 문서 스크롤**: [CSSOM scrollTop](https://drafts.csswg.org/cssom-view/#dom-element-scrolltop), [스크롤 이벤트](https://drafts.csswg.org/cssom-view/#scrolling-events)를 참고한다. 길이가 다른 두 문서의 실제 스크롤 범위 비율을 양방향으로 연결한다. 독립 분할 스크롤과 목적이 다르며, 프로그램으로 이동한 상대 목록의 이벤트가 원래 입력을 되돌리지 않는지 실제 브라우저 검증이 필요하다.
- **크라프트 골판지**: [FEFCO 구조](https://www.fefco.org/node/1588), [생산 과정](https://www.fefco.org/technical-information/production-process)을 참고한다. 일부 벗겨진 표면지와 길게 이어지는 골심, 연결된 물결 단면을 자체 SVG로 구성한다. 평직·가죽·금속의 표면 질감과 다른 종이 구조다.
- **아르누보 휘플래시 장식**: [V&A The Whiplash](https://www.vam.ac.uk/articles/the-whiplash), [Art Nouveau 컬렉션](https://www.vam.ac.uk/collections/art-nouveau)을 참고한다. 비대칭 S곡선 테두리와 가는 잠자리 날개를 조합하며 계단형 대칭 아르데코와 음각 잎맥 판화에서 구분한다.
- **펜로즈 불가능 트라이바**: [Penrose 원논문](https://bpspsychub.onlinelibrary.wiley.com/doi/10.1111/j.2044-8295.1958.tb00634.x), [Escher 박물관 Waterfall 해설](https://escherinhetpaleis.nl/en/about-escher/escher-today/waterfall)을 참고한다. 세 면의 공유 경계와 삼각 구멍으로 국소적으로 입체적이지만 전체 깊이는 모순되는 정적 도형을 그린다. 실현 가능한 3D 물체나 단순 삼각형 회전이 아니다.
- **음료 푸어 제품 컷**: [MRMC 제품 촬영 장치 설명](https://www.mrmoco.com/motion-control/bolt-mini-model-mover/)의 liquid pour 촬영 맥락을 참고한다. 수동 진행값이 병 기울이기·입구에서 잔까지의 줄기·잔 채우기·병 복귀를 구동한다. 로컬 벡터 시연으로 유체 물리나 촬영 장비 제어를 주장하지 않는다. 병·잔이 겹치던 초기 구도는 병과 줄기 시작점을 함께 옮겨 수정했다.
- **풍경을 담은 타이포 광고**: [Adobe 텍스트·도형 마스크](https://helpx.adobe.com/premiere/desktop/add-text-images/insert-images-and-graphics/mask-with-text-or-shape-using-properties-panel.html)를 참고한다. 고정된 글리프를 클립 창으로 사용해 내부 풍경만 한 번 이동시킨다. 글자 위치·외곽선·배경을 유지하므로 제품 뒤 글자 가림이나 글리프 자체 이동과 구분된다.
- **산점도 좌표 리빌**: [Vega-Lite Point](https://vega.github.io/vega-lite/docs/point.html), [Datawrapper 산점도 만들기](https://www.datawrapper.de/academy/how-to-create-a-scatter-plot)를 참고한다. 독립적인 두 수치의 선형 축에 예시 점을 실제 좌표로 배치하고 불투명도만 순서대로 공개한다. 한 수치 축의 쌍점 비교나 구간별 빈도 집계와 다르다.
- **블랙 경유 장면 전환**: [Adobe Dissolve 전환 목록](https://helpx.adobe.com/premiere/desktop/add-video-effects/effects-and-transitions-library/list-of-video-dissolve-transitions.html)을 참고한다. 앞 장면을 완전히 검정으로 낮춘 뒤 뒤 장면을 올리며, 두 장면이 함께 보이는 크로스페이드와 구분된다. 자동 시간 재생이 아닌 수동 스크럽 시연이다.

새 항목의 정적 코드·회귀 테스트·독립 검토 통과는 실제 화면 검증을 대신하지 않는다. 네이티브 입력, 스크롤 이벤트 순서, 글자 잉크와 도형의 중간 상태를 별도 확인한 뒤 완료로 집계한다.

## 열한 번째 묶음: 위치 보존·제작 효과·정보 비교

2026-10-18 조사. 전체 카탈로그의 이름·목적·실제 메커니즘을 대조해 빠져 있던 기본 패턴을 보완했다. 오래된 기법을 새로운 유행이라고 표현하지 않는다.

- **페데스탈 옥상 리빌**: [Adobe 카메라 도구](https://helpx.adobe.com/after-effects/desktop/work-with-layers/camera-layer/cameras-lights-points-interest.html), [StudioBinder Pedestal](https://www.studiobinder.com/camera-shots/camera-movements/pedestal-shot/)을 참고한다. 고정 방향의 카메라 높이만 바꿔 지붕을 드러내며, 고정 위치에서 회전하는 틸트와 구분한다. 실제 투영 좌표와 지붕 위 마크가 함께 이동한다.
- **RGB 채널 포스터라이즈**: [Adobe Posterize](https://helpx.adobe.com/after-effects/desktop/apply-effects-and-animation-presets/list-of-effects/stylize-effects.html), [W3C feComponentTransfer](https://www.w3.org/TR/filter-effects-1/#feComponentTransferElement)를 참고한다. 실제 원본의 세 채널을 각각 2~8단계로 양자화하고 알파는 보존한다. 단계 수는 채널별 값이며 이미지 전체의 색 개수라고 주장하지 않는다.
- **앞선 기록 삽입 위치 유지**: [CSS Scroll Anchoring](https://drafts.csswg.org/css-scroll-anchoring/#exclusion-api), [CSSOM scrollHeight](https://drafts.csswg.org/cssom-view/#dom-element-scrollheight), [React useLayoutEffect](https://react.dev/reference/react/useLayoutEffect)를 참고한다. 앞에 행을 추가한 뒤 실제 높이 증가량만큼 페인트 전에 보정해 읽던 행을 같은 위치에 둔다. 네트워크 로딩이나 가상화 기능은 없다.
- **빙렬 유약 도자기**: [Fireclay의 crazing 설명](https://www.fireclaytile.com/blogs/fireclay-tile-blog/tile-school-questions-about-crazing), [Heath의 유약·질감](https://www.heathceramics.com/blogs/heath-journal/glaze-finish-and-texture)을 참고한다. 이어진 유약 표면에 가는 균열·광택·테두리·점토 밑면을 조합한다. 색으로 채운 보로노이 셀이나 실제 파괴 시뮬레이션과 다르다.
- **구성주의 대각 포스터**: [V&A 포스터 역사](https://www.vam.ac.uk/articles/a-short-history-of-the-poster), [MoMA Stenberg Brothers](https://www.moma.org/interactives/exhibitions/1997/sternbergbrothers/)를 참고한다. 자체 FORM 카피와 붉은 대각선·검정·크림 구도를 사용한 정적 벡터이며 기존 작품 이미지를 복제하지 않는다.
- **정투상 3면 정렬 도면**: [MIT Drawing and Sketching](https://ocw.mit.edu/courses/2-007-design-and-manufacturing-i-spring-2009/pages/related-resources/drawing_and_sketching/)을 참고한다. 같은 계단형 부품의 정면·평면·우측면을 제3각법 위치와 투영선으로 연결한다. 원근 도면과 구분하며 실제 CAD·자동 치수 측정을 제공하지 않는다.
- **보호필름 컬 리빌**: [CycoreFX](https://cycorefx.com/prod_ccfx.php), [CC Page Turn 매뉴얼](https://www.cycorefx.com/downloads/cfx_hd_std/CycoreFX%20HD%201.8.9%20Manual.pdf)의 말림 원리를 참고한다. 접힌 뒷면과 곡면 경계를 연결하고 마지막에는 시트를 제품 위에서 완전히 분리한다. 자체 2D 벡터 시연으로 물리적 시트 길이 보존이나 플러그인 사용을 주장하지 않는다.
- **의미를 늘리는 타이포 광고**: [Monotype 가변 글꼴 활용](https://www.monotype.com/resources/expertise/variable-fonts-for-brands), [DIA Roblox](https://dia.tv/project/roblox/)의 표현 맥락을 참고한다. MORE의 O 폭을 넓히면서 단어 중심과 글자 간격을 유지한다. 자체 SVG 글리프이며 실제 가변 폰트나 사례의 정확한 디자인을 재현한 것은 아니다.
- **100% 누적 구성비 리빌**: [Highcharts Stacking](https://www.highcharts.com/docs/advanced-chart-features/stacking-charts), [Datawrapper 누적 차트 주의점](https://www.datawrapper.de/academy/what-to-consider-when-creating-stacked-column-charts)을 참고한다. 달마다 다른 원시 합계를 같은 길이로 정규화해 구성비를 비교한다. 고정된 구간 위로 클립을 공개하고 각 행이 완전히 드러난 뒤 백분율을 표시한다.
- **피사체 얼굴 블러 마스크**: [Adobe 얼굴 블러](https://helpx.adobe.com/ph_fil/premiere-pro/how-to/blur-face-masking-tracking.html), [마스크 추적 안내](https://www.adobe.com/learn/premiere-pro/web/track-mask-blur-effect?src=helpx)를 참고한다. 피사체와 같은 좌표계의 얼굴 타원 안에만 흐린 복제 그림을 합성한다. 수동 위치 조작이며 AI 추적·자동 익명화 보장 기능은 없다.

각 항목은 즉시 범위 테스트·불필요한 코드 정리·새 독립 검토를 거쳤다. 실제 화면은 두 테마와 세 폭, 필요한 입력·중간 프레임·역방향·빠른 재입력·스크롤 위치 보존을 별도로 확인했다. 코드 검토와 정지 이미지 검토를 실제 브라우저 동작 검증과 동일시하지 않는다.

## 열두 번째 묶음: 프레이밍·가상 목록·연속 정보 표현

2026-10-18 조사. 전체 카탈로그의 실제 메커니즘과 목적을 대조하고 빠진 필수 기법을 우선했다. 제작 사례와 기본 원리를 확인하되 라이브러리·장비·API를 실제 사용한다고 표현하지 않는다.

- **건축 렌즈 시프트 보정**: [Unity Lens shift](https://docs.unity.com/en-us/engine/6000.6/manual/cameras/physical/lens-shift), [Nikon PC 렌즈](https://www.nikonusa.com/learn-and-explore/c/tips-and-techniques/the-pc-lens-advantage-what-you-see-is-what-youll-get)를 참고한다. 같은 건축 입면을 올려다보는 일반 틸트와, 카메라를 수평으로 둔 수직 렌즈 시프트를 비교한다. 원근 나눗셈과 바닥 소실은 유지하므로 정투영 전환과 다르다.
- **수평 방향성 블러**: [Adobe Directional Blur](https://helpx.adobe.com/after-effects/desktop/apply-effects-and-animation-presets/list-of-effects/blur-sharpen-effects.html), [W3C feGaussianBlur](https://www.w3.org/TR/filter-effects-1/#feGaussianBlurElement)를 참고한다. 실제 원본의 색과 알파를 가로축으로만 흐리고 세로 범위를 유지한다. 미리 그린 속도선·선택 영역 얼굴 블러·밝은 픽셀 블룸과 구분한다. 확인하지 않은 Safari 출력은 보장하지 않는다.
- **고정 행 높이 가상 목록**: [web.dev 목록 windowing](https://web.dev/articles/virtualize-long-lists-react-window), [WAI-ARIA setsize](https://www.w3.org/TR/wai-aria-1.2/#aria-setsize), [React flushSync](https://react.dev/reference/react-dom/flushSync)를 참고한다. 실제 예시 100행의 길이는 유지하고 보이는 세 행 주위에 여유를 둔 27행만 렌더링한다. 화면 밖 전체 검색·보조기술 탐색이나 성능 수치를 보장하지 않는다. 실제 긴 키보드 스크롤에서 발견한 빈 화면은 필요한 동기 갱신과 제한된 여유 범위로 수정했다.
- **백색 대리석 베이닝**: [Margraf Bianco Carrara](https://www.margraf.it/en/products/bianco-carrara/), [Antolini Dover White](https://www.antolini.com/en/c6/natural-stone-collection/m648/dover-white)를 참고한다. 연속된 우윳빛 석재 안의 폭이 변하는 회색 석맥과 가는 분기를 자체 곡선으로 표현한다. 골재 조각·도자기 균열망·나뭇결과 구분하며 특정 석판 사진을 복제하지 않는다.
- **스텐실 브리지 레터링**: [Microsoft Stencil](https://learn.microsoft.com/en-us/typography/font-list/stencil), [Reading 대학의 스텐실 연구](https://typography.network/2016/10/28/material-histories-centennial-exhibition-stencil/)를 참고한다. 자체 BOLD 벡터에서 속공간을 지지하는 브리지를 실제 열린 틈으로 나타낸다. 외부 폰트나 애니메이션·가림 마스크를 사용하지 않는 정적 인쇄 언어다.
- **정사면체 볼앤스틱 분자 모형**: [UCLA tetrahedral carbon](https://www.chem.ucla.edu/~harding/IGOC/T/tetrahedral_carbon.html), [Wisconsin VSEPR](https://www2.chem.wisc.edu/deptfiles/genchem/sstutorial/Text7/Tx73/tx73.html)을 참고한다. 탄소 하나와 수소 네 개의 정사면체 방향을 실제 3D 좌표에서 투영하고 구·막대·깊이 순서로 표현한다. 실제 분자 계산·결합 에너지·물리 엔진 기능은 없다.
- **향수 아토마이저 분사 컷**: [Aptar VP4](https://www.aptar.com/en-us/products/vp4-high-performing-fragrance-pump/), [HDS INUNE](https://aptar.com/en-us/products/hds-inune-high-definition-spray-fragrance-pump)를 참고한다. 펌프를 누른 위치의 노즐에서 가는 분무가 나오고, 이미 나온 입자는 펌프가 복귀해도 독립된 경로로 흩어진다. 수동 진행 예시이며 실제 제품의 분사량·성능·유체 물리를 재현한다고 주장하지 않는다.
- **배경 반전 타이포 광고**: [W3C difference 합성](https://www.w3.org/TR/compositing-1/#blendingdifference), [Adobe CSS 그래픽 효과](https://blog.adobe.com/en/publish/2015/04/29/an-introduction-to-graphical-effects-in-css)를 참고한다. 고정된 BOLD 글자를 이동하는 흑백 띠와 실제 difference로 합성해 겹친 부분만 반대 명암으로 유지한다. 글자 전체의 시간별 색 교체나 글자 가림과 다르며 임의의 회색·컬러 배경까지 가독성을 보장하지 않는다.
- **시계열 꺾은선 리빌**: [Vega-Lite Line](https://vega.github.io/vega-lite/docs/line), [Vega Line mark](https://vega.github.io/vega/docs/marks/line/)를 참고한다. 실제 시각 간격 1:2:3에 따라 점을 놓고 하나의 연속선으로 연결한다. 처음 대시 방식은 실제 브라우저에서 마지막 선분이 끊겨, 굵기·데이터 좌표를 유지하는 왼쪽부터의 클립 리빌로 교체했다. 선분이 측정 사이의 실제 관측값이나 미래 예측을 의미하지 않는다.
- **시네마 레터박스 매트**: [Apple Viewer overlays](https://support.apple.com/en-gb/guide/final-cut-pro/verded6d49d7/mac), [Adobe cinematic black bars](https://www.adobe.com/creativecloud/video/discover/cinematic-black-bars.html)를 참고한다. 고정된 16:9 원본 위아래에 같은 높이의 검정 띠를 겹쳐 2.35:1까지 보이는 화면을 조절한다. 원본 자체를 확대·재배치하는 리프레이밍이나 영상 출력 기능은 없다.

정적 코드와 테스트를 통과한 뒤에도 실제 출력에서 차트 대시 끊김과 가상 목록의 중간 빈 화면이 발견됐다. 두 문제를 수정하고 새 독립 코드 검토·범위 테스트를 다시 거친 뒤, 양테마·세 화면 폭과 실제 중간 상태를 재확인했다. 가상 목록은 키보드 왕복뿐 아니라 실제 스크롤바 드래그와 휠도 확인했다. 정지 이미지의 독립 검토는 입력·렌더링 스케줄의 증거를 대신하지 않는다.

## 13. 카테고리별 누락 기법 보완 — 열세 번째 검증 묶음

- **배럴·핀쿠션 렌즈 왜곡**: [OpenCV 보정 모델](https://docs.opencv.org/5.0/main_modules/calib.html)을 참고해 방사 계수 부호에 따른 격자 곡률을 보여준다. 중심은 고정하며 실제 렌즈 보정·카메라 캘리브레이션 기능으로 설명하지 않는다.
- **페더 비네팅**: [Adobe 비네트](https://helpx.adobe.com/premiere/desktop/add-video-effects/commonly-used-effects/create-vignettes-using-lumetri-color.html), [SVG 방사 그라디언트](https://www.w3.org/TR/SVG11/pservers.html#RadialGradients)를 참고한다. 중앙 보호 영역을 유지하며 가장자리만 점진적으로 어두워진다.
- **양쪽 스크롤바 공간 고정**: [CSSWG scrollbar-gutter](https://drafts.csswg.org/css-overflow-3/#scrollbar-gutter-property), [web.dev 지원 설명](https://web.dev/blog/baseline-scrollbar-props)을 참고한다. 짧은·긴 목록 전환에도 본문 폭과 중심이 유지된다. 오버레이 스크롤바는 공간을 예약하지 않는 표준 동작을 따른다.
- **압축 울 펠트**: [FilzFelt 울 소재](https://www.filzfelt.com/shop/product/10mm-wool-design-felt)를 참고해 여러 방향의 짧고 굽은 섬유와 두께를 직접 그렸다. 직물 격자·광택 가죽과 다른 무광 비직조 표면이다.
- **사이키델릭 스웰 레터링**: [Cooper Hewitt Good Vibrations](https://www.cooperhewitt.org/2013/01/29/good-vibrations/), [포스터의 의도적 왜곡](https://www.cooperhewitt.org/2018/10/23/deliberately-disorienting/)을 참고한다. WAVE 글자 윤곽 자체가 부풀고 휘며 곡선 띠와 간격을 유지한다.
- **코흐 자기유사 프랙털 윤곽**: [NRICH 코흐 눈송이](https://nrich.maths.org/problems/koch-snowflake)를 참고한다. 삼각형 변을 세 번 분할한 192개 선분의 닫힌 윤곽이며 임의의 장식 톱니와 구분한다.
- **나사 캡 회전 개봉**: [Berlin Packaging 나사 규격](https://www.berlinpackaging.com/cap-sizer-liner-definitions/), [KeyShot 애니메이션](https://manual.keyshot.com/manual/animation/working-with-animations/)을 참고한다. 두 바퀴 회전하며 일정 피치로 상승한 뒤 분리된다. 원통 외곽은 유지하고 전면 홈·표식의 투영이 바뀐다. 실제 제품 체결 규격을 재현한다고 주장하지 않는다.
- **회전 앰비그램 워드마크**: [Scott Kim의 회전 레터링](https://www.scottkim.com/post/inversions---scott-kim-180-degree-rotation-1981), [John Langdon 회전 분류](https://www.johnlangdon.net/projects/category/rotation/)를 참고해 직접 그린 NOON을 반 바퀴 돌려도 같은 단어로 읽히게 했다. 임의의 단어를 자동 변환하는 기능은 없다.
- **생키 분기·합류 리빌**: [Highcharts 생키 설명](https://www.highcharts.com/docs/chart-and-series-types/sankey-diagram)을 참고한다. 웹60·앱40의 흐름이 구매40·보류30·이탈30으로 나뉘고 합쳐지며 띠 두께가 수량을 보존한다.
- **알파 채널 매트 보기**: [Adobe 뷰 채널](https://helpx.adobe.com/after-effects/desktop/view-and-preview/preview-video-and-audio/modifying-using-views.html), [Apple 알파 채널](https://support.apple.com/en-ca/guide/final-cut-pro/ver7d0329d42/mac)을 참고한다. 같은 원본의 투명도를 검정·회색·흰색으로 표현하며 체크 배경을 매트에 포함하지 않는다. 단순한 휘도 흑백 변환과 구분한다.

기존 전체 카탈로그와 목적·메커니즘을 대조해 누락된 기법을 추가했다. 오래된 원리도 필요한 기본 기법으로 선택했으며 최신 유행으로 포장하지 않았다. 실제 브라우저에서 양테마·세 폭, 입력·왕복·빠른 재입력·중간 프레임을 확인했다. 이미지의 별도 정적 검토와 실제 입력 검증은 구분한다.

## 14. 마지막 일곱 기법 — 카테고리별 열 번째 추가

- **스톡키네트 니트**: [Craft Yarn Council 기초](https://www.craftyarncouncil.com/files/DiscoverPDFs/017_KStSt.pdf), [Purl Soho 니트 교육](https://www.purlsoho.com/create/learn-to-knit/)에서 매끈한 겉면의 V자 코를 확인했다. 둥근 실의 앞 코와 뒤 고리를 맞물리게 그려 평직의 교차 띠·펠트의 무작위 섬유와 구분했다. 실제 편직·옷감 물리 기능은 없다.
- **시아노타입 접촉 음화**: [V&A 사진 공정](https://www.vam.ac.uk/articles/photographic-processes), [카메라 없는 사진](https://www.vam.ac.uk/articles/cameraless-photography), [Met 유리 포토그램](https://www.metmuseum.org/art/collection/search/919808)을 참고한다. 불균일한 청색 코팅 위에 흰 열쇠 접촉 실루엣과 옅은 유리 원판을 남긴 원본 구성이다. 모눈·치수 선화인 블루프린트나 명암 매핑인 듀오톤과 구분한다.
- **모비우스 반회전 리본**: [UCSD 수학 자료](https://mathweb.ucsd.edu/~jeggers/math31ch/mobius_strip.pdf), [Cambridge NRICH 반회전 연결](https://nrich.maths.org/making-maths-make-magic-circle)을 참고한다. 반 바퀴 꼬아 양끝의 폭 방향을 뒤집어 연결한 띠를 96개 깊이 정렬 패치로 투영한다. 하나로 이어진 경계가 있으며 정밀 깊이 버퍼·실제 종이 접힘 시뮬레이션은 아니다.
- **결로 물방울 제품 컷**: [Adobe 음료 촬영](https://www.adobe.com/jp/learn/lightroom-cc/web/easy-photo-for-smartphone-26), [Nikon 물방울 확대](https://www.nikonusa.com/learn-and-explore/c/tips-and-techniques/tiny-bubbles-photographing-water-droplets)를 참고한다. 캔에 부착된 방울 31개에서 같은 포장 그림을 각 방울 중심으로 확대하고 접촉 그림자·테두리·반사광을 그린다. 공중 분무 입자와 다르며 실제 열역학·광선 추적 기능은 없다.
- **그림문자 치환 타이포**: [Pentagram Hartbeat](https://www.pentagram.com/work/hartbeat), [Baseman 그림문자 탐구](https://basemandesign.com/more/rebus-quotes-and-other-typographical-explorations/), [W3C 경로 보간](https://www.w3.org/TR/SVG2/paths.html#TheDProperty)을 참고한다. 고정 LOVE의 O 윤곽 하나를 같은 자리의 하트로 바꾸고 반전·빠른 재입력에서도 현재 윤곽부터 이어간다. [CSS d 지원 제한](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/d) 때문에 모든 브라우저의 부드러운 전환을 주장하지 않으며, 미지원 환경은 SVG 속성으로 선택한 최종 모양을 즉시 표시한다.
- **레이더 프로필 리빌**: [Chart.js 레이더 설명](https://www.chartjs.org/docs/latest/charts/radar.html), [방사형 선형 축](https://www.chartjs.org/docs/latest/axes/radial/linear.html)을 참고해 자체 예시 다섯 점수를 같은 0~100 반지름 척도로 표시한다. 다각형이 나타난 뒤 점·수치가 이어진다. 면적이 종합 점수·순위·인과관계를 뜻하지 않는다. 해당 라이브러리를 설치하지 않고 SVG로 구현했다.
- **프리즈 프레임 홀드**: [Apple 홀드 구간](https://support.apple.com/en-ca/guide/final-cut-pro/ver4c2173c9/mac), [Adobe 구간 프리즈](https://helpx.adobe.com/premiere/desktop/organize-media/file-organization/freeze-a-frame-for-a-portion-of-a-clip-using-time-remapping.html)를 참고한다. 수동 타임라인 40~60%에서 차량과 바퀴의 같은 프레임을 유지한 뒤 같은 연속 동작을 이어간다. 전 구간이 이산 포즈인 기존 스톱모션과 다르며 실제 영상 재생기·시간 단위·편집 출력 기능을 제공한다고 설명하지 않는다.

일곱 기법 모두 기존 전체 카탈로그의 이름·메커니즘·용도를 대조하고, 개별 구현 직후 테스트·불필요 코드 정리·새 독립 검토를 거쳤다. 실제 Chromium의 양테마·세 화면 폭, 글자 윤곽 중간 프레임·반전·빠른 입력, 정지 구간·재개, 차트 완료 상태를 별도로 확인했다. 역사적 원리와 제작 기본 기법을 최신 유행이라고 표현하지 않는다.

최종 고정 소스는 기존 122개와 추가 250개를 합쳐 372개이며, 기존 25개 분류에 정확히 10개씩 추가됐음을 보존 검사로 확인했다. 웹 314개·실제 MCP stdio 7개 테스트와 전체 빌드가 통과했다. 마지막 묶음은 양테마·세 폭의 42개 화면 조건 및 실제 입력·중간 프레임을 확인했고, 전체 카드도 양테마의 1·2·3열에서 제목·설명·액션 정렬을 확인했다. 정적 이미지 독립 검토와 실제 입력 검증을 구분했으며, 실물 휴대폰·터치·보조공학·Firefox·Safari·운영체제 모션 감소 설정의 실행 검증은 포함하지 않는다. 기존 대형 청크 경고는 남아 있다.
