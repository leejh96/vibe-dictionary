import type { SearchMetadata } from '../../search-metadata';

export const TEXT_SEARCH_METADATA = {
  'editorial-drop-cap': {
    targets: ['text'], triggers: ['static'],
    useCases: { ko: ['문단 첫 글자를 크게 내려 본문을 옆과 아래로 흐르게 배치하기'], en: ['Wrap editorial body copy beside and below a large dropped initial'] },
    aliases: { ko: ['드롭 이니셜', '문단 첫 글자 장식'], en: ['dropped initial', 'initial cap'] },
  },
  'svg-stroke-lettering': {
    targets: ['text'], triggers: ['auto', 'click'],
    useCases: { ko: ['SVG 글자 획을 순차적으로 그리고 버튼으로 처음부터 다시 재생하기'], en: ['Draw SVG letter strokes in sequence and replay them from a button'] },
    aliases: { ko: ['선 글자 애니메이션', '획 드로잉'], en: ['stroke dash lettering', 'SVG handwriting reveal'] },
  },
  'search-match-highlight': {
    targets: ['text', 'input'], triggers: ['input', 'click'],
    useCases: { ko: ['입력 문자열과 정확히 일치하는 본문을 모두 강조하고 지우기로 입력을 초기화하기'], en: ['Highlight every literal passage match as text is entered and clear the query with a button'] },
    aliases: { ko: ['찾기 강조', '문자열 매치 표시'], en: ['literal search highlighting', 'find in text'] },
  },
  'inline-spoiler-text': {
    targets: ['text', 'button'], triggers: ['click'],
    useCases: { ko: ['문장 안의 가려진 예시 목적지를 누르면 공개하고 다시 가리기'], en: ['Reveal a concealed sample destination within a sentence, then hide it again'] },
    aliases: { ko: ['블러 스포일러', '숨긴 단어 공개'], en: ['blurred spoiler', 'concealed word reveal'] },
  },
  'clamped-read-more-text': {
    targets: ['text', 'button'], triggers: ['click'],
    useCases: { ko: ['두 줄로 줄인 문단을 제자리에서 펼치고 다시 접기'], en: ['Expand a two-line clamped paragraph in place and collapse it again'] },
    aliases: { ko: ['라인 클램프 토글', '두 줄 더 보기'], en: ['line clamp toggle', 'expandable paragraph'] },
  },
  'split-flap-typography': {
    targets: ['text', 'button'], triggers: ['click'],
    useCases: { ko: ['단어를 순환하며 바뀐 글자판의 위아래 절반만 경첩처럼 전환하기'], en: ['Cycle words by flipping only the changed letter tiles in hinged halves'] },
    aliases: { ko: ['스플릿 플랩 문자판', '기계식 플립 글자'], en: ['split flap display', 'hinged letter tiles'] },
  },
  'circular-path-text': {
    targets: ['text', 'button'], triggers: ['auto', 'click'],
    useCases: { ko: ['원 경로의 문구를 회전시키고 현재 각도에서 일시정지하거나 이어 재생하기'], en: ['Rotate a phrase on a circular path and pause or resume at its current angle'] },
    aliases: { ko: ['원형 패스 글자', '회전 문자 배지'], en: ['circular text path', 'spinning type badge'] },
  },
  'word-mask-headline': {
    targets: ['text', 'button'], triggers: ['auto', 'click'],
    useCases: { ko: ['단어마다 잘림 창에서 순서대로 떠오르는 헤드라인을 재생하기'], en: ['Replay a headline whose words rise in sequence through separate clipping masks'] },
    aliases: { ko: ['마스크 헤드라인 리빌', '단어 스태거 등장'], en: ['masked word reveal', 'staggered headline entrance'] },
  },
  'outline-fill-text': {
    targets: ['text', 'button'], triggers: ['click'],
    useCases: { ko: ['고정된 글자 윤곽 안으로 채움 레이어를 공개하거나 되돌리기'], en: ['Reveal or retract a fill layer inside stationary outlined letters'] },
    aliases: { ko: ['윤곽선 채움 전환', '텍스트 클립 채움'], en: ['outlined text fill reveal', 'clipped type fill'] },
  },
  'per-digit-rolling-counter': {
    targets: ['text', 'button'], triggers: ['click'],
    useCases: { ko: ['더하기와 빼기로 숫자를 바꾸며 올림·내림에서 변경된 자리만 롤링하기'], en: ['Increment or decrement a number and roll only changed places through carries and borrows'] },
    aliases: { ko: ['자리별 숫자 롤링', '올림 내림 카운터'], en: ['per-place digit rolling', 'carry and borrow counter'] },
  },
} satisfies Record<string, SearchMetadata>;
