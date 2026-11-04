import type { SearchMetadata } from '../../search-metadata';

export const STARTER_PACK_SEARCH_METADATA: Record<string, SearchMetadata> = {
  'ui-ai-streaming-pulse': {
    targets: ['text'],
    triggers: ['auto', 'click'],
    useCases: {
      ko: ['생성형 AI 챗봇 답변, LLM 스트리밍 응답 또는 타이핑 연출이 필요한 화면에 적용할 때'],
      en: ['Stream generative AI chatbot responses or simulate typing with a breathing pulse cursor'],
    },
    aliases: {
      ko: ['AI 스트리밍 텍스트', '펄스 커서 타이핑', '타이프라이터 텍스트'],
      en: ['AI streaming pulse text', 'breathing cursor typing', 'generative typewriter text'],
    },
  },
  'ui-particle-burst-heart': {
    targets: ['button'],
    triggers: ['click'],
    useCases: {
      ko: ['좋아요, 즐겨찾기, 북마크 클릭 시 축하하는 듯한 마이크로 파티클 피드백을 줄 때'],
      en: ['Celebrate likes, favorites, or bookmark clicks with celebratory particle burst feedback'],
    },
    aliases: {
      ko: ['파티클 버스트 하트', '좋아요 파티클 모션', '하트 팡 애니메이션'],
      en: ['particle burst heart', 'confetti like reaction', 'heart bounce burst'],
    },
  },
  'mg-ambient-aurora-blob': {
    targets: ['background', 'scene'],
    triggers: ['auto', 'click'],
    useCases: {
      ko: ['랜딩 페이지 히어로 섹션이나 모던 SaaS 서비스의 은은한 오로라 배경을 만들 때'],
      en: ['Create an ambient glowing aurora background for landing hero sections or modern SaaS screens'],
    },
    aliases: {
      ko: ['앰비언트 오로라 블롭', '오로라 그라디언트 배경', '블러 블롭 모션'],
      en: ['ambient aurora blob', 'aurora gradient backdrop', 'blurred glowing blob animation'],
    },
  },
  'lay-bottom-sheet-modal': {
    targets: ['panel', 'navigation'],
    triggers: ['click'],
    useCases: {
      ko: ['모바일 웹에서 하단 옵션 서랍, 액션 시트, 상세 정보 팝업을 띄울 때'],
      en: ['Present mobile web action sheets, option drawers, or bottom popups smoothly'],
    },
    aliases: {
      ko: ['인터랙티브 바텀 시트', '모바일 드로어 서랍', '하단 슬라이드 모달'],
      en: ['interactive bottom sheet', 'mobile drawer panel', 'slide up action sheet'],
    },
  },
  'ui-swipe-to-confirm': {
    targets: ['button', 'input'],
    triggers: ['drag', 'click'],
    useCases: {
      ko: ['송금, 결제 확정, 중요 데이터 삭제 등 실수 방지가 필요한 안심 인터랙션을 만들 때'],
      en: ['Prevent accidental clicks on payments, money transfers, or irreversible actions'],
    },
    aliases: {
      ko: ['밀어서 잠금해제', '슬라이드 결제 버튼', '스와이프 확정 버튼'],
      en: ['swipe to confirm button', 'slide to pay slider', 'swipe to action button'],
    },
  },
  'ui-cli-command-switcher': {
    targets: ['panel', 'button'],
    triggers: ['click'],
    useCases: {
      ko: ['개발자 문서나 라이브러리 설치 페이지에서 패키지 매니저별 명령어를 한 번에 복사할 때'],
      en: ['Provide multi-package manager install snippets with one-click copy on developer docs'],
    },
    aliases: {
      ko: ['CLI 명령어 탭', '패키지 매니저 터미널', 'npm yarn 복사 블록'],
      en: ['cli command switcher', 'package manager tabs', 'terminal install codeblock'],
    },
  },
  'ui-interactive-kbd-key': {
    targets: ['button', 'text'],
    triggers: ['hover', 'click'],
    useCases: {
      ko: ['웹앱에서 단축키를 안내하거나 기계식 키보드 타건 느낌의 입체 뱃지를 보여줄 때'],
      en: ['Show tactile keyboard shortcut keys with realistic 3D key-press feedback'],
    },
    aliases: {
      ko: ['KBD 단축키 뱃지', '키보드 키캡 버튼', '단축키 툴팁'],
      en: ['interactive kbd key', 'mechanical keycap button', 'shortcut key badge'],
    },
  },
  'ui-tear-off-coupon-card': {
    targets: ['card', 'button'],
    triggers: ['click'],
    useCases: {
      ko: ['이벤트 프로모션, 쇼핑몰 할인 쿠폰, 바우처 티켓 발급 화면을 구성할 때'],
      en: ['Deliver promotional discount coupons or ticket vouchers with satisfying tear-off stubs'],
    },
    aliases: {
      ko: ['절취선 쿠폰 카드', '티켓 바우처', '뜯어지는 할인 쿠폰'],
      en: ['perforated coupon card', 'tear off voucher ticket', 'discount claim card'],
    },
  },
  'ui-file-dropzone-uploader': {
    targets: ['input', 'panel'],
    triggers: ['click', 'drag'],
    useCases: {
      ko: ['파일 업로드 드롭존, 첨부파일 등록 폼, SaaS 관리자 페이지의 파일 인풋을 만들 때'],
      en: ['Build drag-and-drop file upload zones with animated progress feedback for SaaS forms'],
    },
    aliases: {
      ko: ['파일 드롭존 업로더', '드래그 앤 드롭 업로드', '파일 첨부 컴포넌트'],
      en: ['file dropzone uploader', 'drag and drop upload area', 'file attachment dropzone'],
    },
  },
  'ui-liquid-segmented-control': {
    targets: ['navigation', 'button'],
    triggers: ['click'],
    useCases: {
      ko: ['뷰 모드 전환, 기간 선택 필터, 탭 스위처를 쫀득한 iOS 감성으로 구현할 때'],
      en: ['Switch between view modes, date ranges, or toggle filters with elastic iOS-style pills'],
    },
    aliases: {
      ko: ['리퀴드 세그먼트 컨트롤', '젤리 알약 탭', '세그먼트 토글 스위처'],
      en: ['liquid segmented control', 'elastic pill tab switcher', 'spring segment toggle'],
    },
  },
  'ui-3d-interactive-bank-card': {
    targets: ['card', 'button'],
    triggers: ['hover', 'click'],
    useCases: {
      ko: ['체크아웃 결제 화면, 신용카드 등록 및 CVC 보안코드 확인 인터랙션을 만들 때'],
      en: ['Interactive checkout payment forms with 3D credit card flipping for CVC security codes'],
    },
    aliases: {
      ko: ['3D 인터랙티브 결제 카드', '신용카드 3D 플립', '결제 폼 카드 뒤집기'],
      en: ['3d interactive payment card', 'credit card 3d flip', 'checkout bank card'],
    },
  },
  'ui-voice-note-waveform': {
    targets: ['button', 'input'],
    triggers: ['click'],
    useCases: {
      ko: ['메신저 음성 메모, AI 보이스 오디오 미리보기, 팟캐스트 클립 재생 인터랙션을 구성할 때'],
      en: ['Play voice notes or audio message clips with interactive clickable waveform bars'],
    },
    aliases: {
      ko: ['보이스노트 웨이브폼 플레이어', '음성 메모 미니 플레이어', '오디오 파형 탐색 바'],
      en: ['voice note waveform player', 'audio memo mini player', 'sound wave seek player'],
    },
  },
};
