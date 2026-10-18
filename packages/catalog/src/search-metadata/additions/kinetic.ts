import type { SearchMetadata } from '../../search-metadata';

export const KINETIC_SEARCH_METADATA = {
  'mg-ripple-reflection-type': {
    targets: ['text'], triggers: ['input'],
    useCases: { ko: ['원문 아래 반사 글자만 가로 잔물결로 굴절시키고 범위 입력으로 세기를 조절하기'], en: ['Adjust horizontal ripple strength on a fading mirrored word while leaving the original unchanged'] },
    aliases: { ko: ['잔물결 거울 타이포', '가로 굴절 반사 글자'], en: ['rippled mirrored type', 'horizontal reflection displacement'] },
  },
  'mg-noise-dissolve-type': {
    targets: ['text'], triggers: ['input'],
    useCases: { ko: ['고정 노이즈 얼룩을 따라 글자가 소실되는 정도를 범위 입력으로 왕복 조절하기'], en: ['Scrub a word between intact and dissolved states using a repeatable noise-alpha threshold'] },
    aliases: { ko: ['노이즈 임계값 소실', '얼룩 글자 디졸브'], en: ['noise threshold dissolve', 'patchy text disappearance'] },
  },
  'mg-hinged-opening-type': {
    targets: ['text'], triggers: ['click'],
    useCases: { ko: ['글자 왼쪽 가장자리에 힌지를 두고 클릭으로 앞면을 열어 아래 면과 그림자를 드러내기'], en: ['Toggle letter faces around left-edge hinges to reveal their underlying surfaces and shadows'] },
    aliases: { ko: ['왼쪽 힌지 글자', '열리는 글자 앞면'], en: ['left-hinged letters', 'opening letter faces'] },
  },
  'mg-layered-type-extrusion': {
    targets: ['text'], triggers: ['input'],
    useCases: { ko: ['같은 글자 단면을 대각선으로 겹쳐 만든 측면 두께를 범위 입력으로 조절하기'], en: ['Adjust letter thickness by stacking repeated glyph cross-sections diagonally behind an unchanged front face'] },
    aliases: { ko: ['겹친 단면 압출', '대각선 글자 두께'], en: ['layered glyph extrusion', 'diagonal type thickness'] },
  },
  'mg-scattered-letter-assembly': {
    targets: ['text'], triggers: ['click'],
    useCases: { ko: ['클릭으로 개별 글자의 분산 좌표·회전과 한 줄 배치를 시간차 전환하기'], en: ['Toggle staggered per-letter position and rotation between scattered and assembled word layouts'] },
    aliases: { ko: ['글자 분산 재배치', '문자 재조립'], en: ['letter scattering and reassembly', 'staggered letter repositioning'] },
  },
  'mg-curved-type-baseline': {
    targets: ['text'], triggers: ['input'],
    useCases: { ko: ['열린 베지어 기준선의 곡률을 직접 조절해 글자 위치와 접선 방향을 함께 바꾸기'], en: ['Adjust an open Bézier baseline upward or downward while letters follow its position and tangent direction'] },
    aliases: { ko: ['베지어 기준선 타이포', '곡률 패스 글자'], en: ['Bézier baseline type', 'adjustable text on a path'] },
  },
  'mg-gooey-word-morph': {
    targets: ['text'], triggers: ['input'],
    useCases: { ko: ['범위 입력으로 두 단어의 블러·알파 임계값 윤곽을 녹듯 연결하기'], en: ['Scrub between two words whose blurred contours merge through an alpha threshold'] },
    aliases: { ko: ['블러 임계값 모핑', '녹는 단어 변형'], en: ['blur threshold word morph', 'gooey text morph'] },
  },
  'mg-cylinder-type-rotation': {
    targets: ['text'], triggers: ['auto', 'click'],
    useCases: { ko: ['원통 둘레의 글자 띠를 자동 회전시키고 현재 각도에서 일시정지·재개하기'], en: ['Rotate a cylindrical band of letters automatically and pause or resume at its current angle'] },
    aliases: { ko: ['원통 글자 띠 회전', '입체 원통 타이포'], en: ['cylindrical letter band', '3D cylindrical text rotation'] },
  },
  'mg-proximity-variable-type': {
    targets: ['text'], triggers: ['pointer-move', 'input'],
    useCases: { ko: ['포인터 또는 범위 입력 위치에 가까운 VIBE 글자의 실제 가변 굵기만 강조하기'], en: ['Emphasize nearby VIBE letters with actual variable font weight controlled by pointer or native range position'] },
    aliases: { ko: ['근접 굵기 보간', '거리 반응 가변 글자'], en: ['proximity weight interpolation', 'distance-sensitive variable type'] },
  },
  'mg-sliced-type-assembly': {
    targets: ['text'], triggers: ['auto', 'click'],
    useCases: { ko: ['네 가로 띠의 좌우 이동과 기울기를 순차 조립하고 버튼으로 처음부터 재생하기'], en: ['Assemble four offset horizontal word slices on mount and replay their staggered alignment with a button'] },
    aliases: { ko: ['가로 띠 글자 조립', '분할 텍스트 조립'], en: ['horizontal text slice assembly', 'staggered split-word assembly'] },
  },
} satisfies Record<string, SearchMetadata>;
