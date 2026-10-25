import type { SearchMetadata } from '../../search-metadata';

export const SIGNATURE_SEARCH_METADATA: Record<string, SearchMetadata> = {
  'envelope-invitation-reveal': {
    targets: ['card', 'button'], triggers: ['click'],
    useCases: { ko: ['청첩장·초대장·이벤트 안내 카드를 봉투에서 꺼내듯 보여 줄 때'], en: ['Reveal wedding, party or event invitations as if pulled from an envelope'] },
    aliases: { ko: ['봉투 열림 초대장', '편지 봉투 오픈', '초대장 리빌 카드'], en: ['envelope invitation reveal', 'opening envelope card', 'letter pull out animation'] },
  },
  'cylinder-card-carousel': {
    targets: ['card', 'list'], triggers: ['click'],
    useCases: { ko: ['상품·포트폴리오 카드를 원통형 3D 무대에서 하나씩 넘겨 볼 때'], en: ['Browse product or portfolio cards one by one on a cylindrical 3D stage'] },
    aliases: { ko: ['3D 원통 캐러셀', '회전목마 캐러셀', '3D 링 슬라이더'], en: ['3d cylinder carousel', 'carousel ring', 'rotating 3d card slider'] },
  },
  'liquid-wave-progress-orb': {
    targets: ['shape', 'chart'], triggers: ['auto', 'click'],
    useCases: { ko: ['업로드·설치·목표 달성률을 물이 차오르는 원형 게이지로 보여 줄 때'], en: ['Show upload, install or goal progress as a round gauge filling with water'] },
    aliases: { ko: ['물결 진행률 구슬', '물 차오르는 로더', '웨이브 퍼센트 게이지'], en: ['liquid wave progress orb', 'water fill loader', 'wave percentage gauge'] },
  },
  'mg-glass-shatter-transition': {
    targets: ['scene', 'image'], triggers: ['auto', 'click'],
    useCases: { ko: ['강렬한 반전·리뉴얼 공개 장면에서 이전 화면을 깨뜨리며 넘어갈 때'], en: ['Break the previous screen apart for a dramatic reveal or relaunch scene'] },
    aliases: { ko: ['유리 깨짐 전환', '화면 산산조각', '파편 흩어지는 전환'], en: ['glass shatter transition', 'broken glass reveal', 'shard explosion transition'] },
  },
  'mg-black-hole-accretion-disk': {
    targets: ['background', 'scene'], triggers: ['auto', 'click'],
    useCases: { ko: ['우주·SF·AI 서비스 히어로에 빛나는 블랙홀 배경을 넣을 때'], en: ['Add a glowing black-hole backdrop to space, sci-fi or AI product heroes'] },
    aliases: { ko: ['블랙홀 강착원반', '사건의 지평선 배경', '우주 블랙홀 애니메이션'], en: ['black hole accretion disk', 'event horizon background', 'space black hole animation'] },
  },
  'mg-infinite-zoom-frames': {
    targets: ['scene', 'image'], triggers: ['auto', 'click'],
    useCases: { ko: ['인트로나 로딩 화면에서 끝없이 안으로 들어가는 몰입감을 줄 때'], en: ['Create an endless inward-diving feel for intros or loading screens'] },
    aliases: { ko: ['무한 줌 액자', '드로스테 줌', '끝없는 확대'], en: ['infinite zoom frames', 'droste zoom', 'endless zoom loop'] },
  },
  'mg-ink-wash-enso-stroke': {
    targets: ['shape', 'logo'], triggers: ['auto', 'click'],
    useCases: { ko: ['한식·차·명상 브랜드에 먹선 원과 낙관이 그려지는 동양적 연출을 넣을 때'], en: ['Draw an ink circle and seal for tea, meditation or Korean heritage brands'] },
    aliases: { ko: ['수묵 원상 붓터치', '먹선 원 그리기', '동양화 붓 효과'], en: ['ink wash enso stroke', 'zen circle brush', 'sumi ink brush effect'] },
  },
  'st-mother-of-pearl-inlay': {
    targets: ['background', 'panel'], triggers: ['auto', 'click'],
    useCases: { ko: ['전통 공예·프리미엄 브랜드 패널에 자개 무지갯빛 질감을 줄 때'], en: ['Give traditional-craft or premium brand panels an iridescent shell texture'] },
    aliases: { ko: ['나전칠기 자개', '자개 무지개 질감', '전통 옻칠 패널'], en: ['mother of pearl inlay', 'najeon lacquer', 'iridescent nacre texture'] },
  },
  'st-thermal-imaging-view': {
    targets: ['scene', 'background'], triggers: ['auto', 'click'],
    useCases: { ko: ['보안·과학·게임 화면에 열화상 카메라 느낌의 거짓색 장면을 넣을 때'], en: ['Add a false-color thermal camera look to security, science or game screens'] },
    aliases: { ko: ['열화상 카메라 화면', '적외선 열지도', '서멀 비전'], en: ['thermal imaging view', 'infrared heat map', 'thermal vision'] },
  },
  'vd-crt-power-off': {
    targets: ['scene'], triggers: ['auto', 'click'],
    useCases: { ko: ['영상 엔딩이나 레트로 콘셉트 화면을 옛 TV가 꺼지듯 마무리할 때'], en: ['End a video or retro-themed screen like an old TV switching off'] },
    aliases: { ko: ['CRT 전원 꺼짐', '브라운관 꺼지는 효과', '옛날 TV 끄기'], en: ['crt power off', 'old tv turn off effect', 'tube screen shutdown'] },
  },
};
