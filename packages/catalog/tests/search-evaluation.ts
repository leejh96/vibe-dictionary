// Curated synthetic user expressions, fixed before measuring. These are not search logs.
export const SEARCH_EVALUATION = [
  { query: '마우스를 따라오는 버튼', expected: ['magnetic-hover'] },
  { query: 'a button following my mouse', expected: ['magnetic-hover'] },
  { query: '클릭한 곳에서 물결이 퍼지는 버튼', expected: ['ripple-click'] },
  { query: 'ripples spreading from a clicked button', expected: ['ripple-click'] },
  { query: '클릭하면 뒤집어지는 카드', expected: ['card-flip-3d'] },
  { query: 'a card that flips when clicked', expected: ['card-flip-3d'] },
  { query: '타자기처럼 한 글자씩 나오는 문장', expected: ['typewriter-streaming'] },
  { query: 'text appearing one letter at a time', expected: ['typewriter-streaming'] },
  { query: '옆으로 계속 흘러가는 배너', expected: ['infinite-marquee'] },
  { query: 'a banner scrolling continuously', expected: ['infinite-marquee'] },
  { query: '사진 높이가 다른 핀터레스트 레이아웃', expected: ['ly-masonry-waterfall'] },
  { query: 'pinterest layout with different image heights', expected: ['ly-masonry-waterfall'] },
  { query: '반투명 유리 카드', expected: ['glassmorphism-card', 'st-liquid-acrylic'] },
  { query: 'a translucent glass card', expected: ['glassmorphism-card', 'st-liquid-acrylic'] },
  { query: '스위치가 탄성 있게 바뀌는', expected: ['elastic-toggle-switch'] },
  { query: 'a switch with a spring toggle', expected: ['elastic-toggle-switch'] },
  { query: '얼굴만 흐리게 가리는', expected: ['vd-face-blur-mask'] },
  { query: 'blur only the face', expected: ['vd-face-blur-mask'] },
  { query: '검정 화면을 거쳐 다음 장면으로 전환', expected: ['vd-dip-to-black'] },
  { query: 'transition through black between scenes', expected: ['vd-dip-to-black'] },
] as const;

export const NO_RESULT_QUERIES = ['내일 서울 날씨 알려줘', 'book a flight to Mars', 'zzzz-no-such-technique-987'];
