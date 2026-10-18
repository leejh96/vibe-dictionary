import type { SearchMetadata } from '../../search-metadata';

export const HOVER_SEARCH_METADATA = {
  'split-action-button': {
    targets: ['button'], triggers: ['click'],
    useCases: { ko: ['기본 내보내기 버튼 옆에서 PNG·SVG 형식을 선택하고 선택값을 표시하기'], en: ['Choose PNG or SVG beside a primary export button and display the selected format.'] },
    aliases: { ko: ['분할 액션', '보조 선택 버튼'], en: ['split action', 'split dropdown button'] },
  },
  'icon-expand-button': {
    targets: ['button'], triggers: ['hover'],
    useCases: { ko: ['아이콘 전용 캡슐 버튼에서 호버와 키보드 포커스로 라벨을 펼치기'], en: ['Reveal a label from an icon-only capsule button on hover and keyboard focus.'] },
    aliases: { ko: ['아이콘 라벨 펼침', '확장 캡슐'], en: ['icon label reveal', 'expanding capsule'] },
  },
  'outline-trace-button': {
    targets: ['button'], triggers: ['hover'],
    useCases: { ko: ['버튼 호버와 키보드 포커스에 SVG 외곽선을 한 바퀴 그려 강조하기'], en: ['Emphasize button hover and keyboard focus by drawing one full SVG outline.'] },
    aliases: { ko: ['외곽선 트레이싱', '테두리 선 그리기'], en: ['outline tracing', 'border line draw'] },
  },
  'rolling-label-button': {
    targets: ['button', 'text'], triggers: ['hover'],
    useCases: { ko: ['버튼 호버와 키보드 포커스에서 한 줄 창의 라벨을 위로 넘겨 교체하기'], en: ['Roll a button label upward to its next line on hover and keyboard focus.'] },
    aliases: { ko: ['세로 라벨 롤링', '마스크 문구 전환'], en: ['vertical label roll', 'masked label swap'] },
  },
  'depth-press-button': {
    targets: ['button'], triggers: ['hover', 'hold'],
    useCases: { ko: ['버튼을 누르는 동안 바닥 그림자와 깊이를 바꿔 키캡 같은 촉감을 표현하기'], en: ['Suggest a keycap-like tactile press by changing button depth and base shadow while held.'] },
    aliases: { ko: ['키캡 눌림', '입체 프레스'], en: ['keycap press', 'raised button press'] },
  },
  'underline-travel-button': {
    targets: ['button', 'text'], triggers: ['hover'],
    useCases: { ko: ['텍스트 버튼의 호버와 키보드 포커스를 방향성 있는 밑줄로 표현하기'], en: ['Show text-button hover and keyboard focus with a directional underline.'] },
    aliases: { ko: ['방향 전환 밑줄', '이동 언더라인'], en: ['directional underline', 'traveling underline'] },
  },
  'corner-bracket-button': {
    targets: ['button'], triggers: ['hover'],
    useCases: { ko: ['버튼 호버와 키보드 포커스에 네 모서리 브래킷을 모아 강조하기'], en: ['Emphasize button hover and keyboard focus by converging four corner brackets.'] },
    aliases: { ko: ['코너 프레임', '모서리 브래킷'], en: ['corner frame', 'converging brackets'] },
  },
  'menu-icon-morph': {
    targets: ['button', 'shape'], triggers: ['click'],
    useCases: { ko: ['버튼 활성화로 메뉴 두 선과 닫기 X 아이콘을 왕복 전환하기'], en: ['Toggle two menu lines into a close X and back by activating the button.'] },
    aliases: { ko: ['메뉴 닫기 모핑', '햄버거 X 전환'], en: ['menu close morph', 'hamburger to X'] },
  },
  'border-beam-button': {
    targets: ['button'], triggers: ['hover'],
    useCases: { ko: ['버튼의 호버와 키보드 포커스를 순환하는 테두리 빛으로 강조하기'], en: ['Highlight button hover and keyboard focus with light circulating along its border.'] },
    aliases: { ko: ['궤도 테두리 빛', '회전 보더 빔'], en: ['orbiting border light', 'rotating border beam'] },
  },
  'letter-stagger-button': {
    targets: ['button', 'text'], triggers: ['hover'],
    useCases: { ko: ['버튼의 글자를 차례로 띄워 호버와 키보드 포커스를 강조하기'], en: ['Emphasize button hover and keyboard focus by lifting letters in sequence.'] },
    aliases: { ko: ['순차 문자 상승', '글자 스태거'], en: ['staggered letter lift', 'sequential letter hover'] },
  },
} satisfies Record<string, SearchMetadata>;
