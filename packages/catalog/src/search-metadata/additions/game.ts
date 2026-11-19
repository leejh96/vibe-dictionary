import type { SearchMetadata } from '../../search-metadata';

export const GAME_SEARCH_METADATA: Record<string, SearchMetadata> = {
  'game-delayed-health-bar': {
    targets: ['panel', 'card', 'button'],
    triggers: ['click'],
    useCases: {
      ko: ['실드 우선 흡수, 지연 추격 잔상 바, 저체력 경고 강조가 포함된 전투 체력 HUD'],
      en: ['Combat health HUD with shield absorption, delayed damage ghost trail, and low-HP warning'],
    },
    aliases: {
      ko: ['HP 실드 바', '지연 데미지 바', '체력 잔상 게이지', '고스트 체력바'],
      en: ['delayed health trail', 'HP shield bar', 'ghost damage bar'],
    },
  },
  'game-radial-weapon-wheel': {
    targets: ['navigation', 'button', 'panel'],
    triggers: ['click', 'hover'],
    useCases: {
      ko: ['전투 중 무기·스킬·소모품을 6방향 원형 휠로 빠르게 전환'],
      en: ['Switch weapons, spells, or consumables quickly via a 6-sector radial wheel'],
    },
    aliases: {
      ko: ['무기 선택 휠', '원형 파이 메뉴', '스킬 퀵슬롯 휠', '방사형 메뉴'],
      en: ['weapon wheel', 'radial pie menu', 'circular quick slot'],
    },
  },
  'game-boss-phase-bar': {
    targets: ['panel', 'card', 'button'],
    triggers: ['click'],
    useCases: {
      ko: ['66%·33% 페이즈 임계 눈금과 경직 게이지를 갖춘 보스전 상단 체력 HUD'],
      en: ['Boss fight HUD displaying phase threshold notches, phase shift alert, and stagger bar'],
    },
    aliases: {
      ko: ['보스 HP 바', '페이즈 전환 체력바', '경직 게이지 바', '그로기 바'],
      en: ['boss HP bar', 'multi-phase boss bar', 'stagger posture bar'],
    },
  },
  'game-damage-number-pop': {
    targets: ['text', 'card', 'button'],
    triggers: ['click'],
    useCases: {
      ko: ['타격 시 일반·치명타·약점 데미지 숫자가 솟아오르며 피격 반짝임과 흔들림을 전달'],
      en: ['Spawn rising normal, critical, and weak-point damage numbers with impact flash feedback'],
    },
    aliases: {
      ko: ['데미지 팝업', '타격 숫자 이펙트', '크리티컬 데미지 텍스트', '플로팅 텍스트'],
      en: ['floating combat text', 'damage numbers', 'critical popup'],
    },
  },
  'game-combo-rank-meter': {
    targets: ['panel', 'card', 'button'],
    triggers: ['click'],
    useCases: {
      ko: ['연속 공격 시 D~SS 스타일 랭크가 상승하고 휴식 시 시간에 따라 감쇠하는 콤보 HUD'],
      en: ['Style rank gauge escalating from D to SS on combo hits and decaying over time'],
    },
    aliases: {
      ko: ['스타일 콤보 게이지', '랭크 감쇠 바', '연타 등급 미터', '콤보 카운터'],
      en: ['style rank meter', 'combo decay bar', 'rank escalation HUD'],
    },
  },
  'game-hitstop-impact-frame': {
    targets: ['scene', 'button', 'panel'],
    triggers: ['click'],
    useCases: {
      ko: ['히트스톱 정지 프레임(80ms)과 화면 흔들림(6px) 조합에 따른 타격감 차이를 실험·비교'],
      en: ['Compare game feel impact by toggling 80ms hitstop freeze frames and 6px screen shake'],
    },
    aliases: {
      ko: ['히트스톱 비교', '타격감 테스트', '화면 진동 시뮬레이터', '임팩트 프리즈'],
      en: ['hitstop freeze frame', 'screen shake simulator', 'impact game feel'],
    },
  },
  'game-loot-rarity-reveal': {
    targets: ['card', 'button'],
    triggers: ['click'],
    useCases: {
      ko: ['보상 상자·던전 드롭 아이템을 등급별 광채와 스윕 애니메이션으로 강조 공개'],
      en: ['Reveal dungeon drops or reward items with tier-specific border glow and sheen sweep'],
    },
    aliases: {
      ko: ['전리품 공개 카드', '아이템 등급 카드', '보상 개봉 연출', '가챠 등급 카드'],
      en: ['loot drop card', 'rarity reveal animation', 'item tier card'],
    },
  },
  'game-skill-tree-node': {
    targets: ['panel', 'button', 'shape'],
    triggers: ['click'],
    useCases: {
      ko: ['선행 노드 해금 조건과 잔여 스킬 포인트(SP)를 검증하며 캐릭터 빌드 확장'],
      en: ['Unlock character build nodes with SVG dependency lines and SP budget validation'],
    },
    aliases: {
      ko: ['스킬 트리 해금', '특성 노드 그래프', '스킬 포인트 분배기', '어빌리티 트리'],
      en: ['skill tree unlocker', 'talent node graph', 'ability dependency tree'],
    },
  },
  'game-matchmaking-ready-check': {
    targets: ['card', 'button', 'panel'],
    triggers: ['click'],
    useCases: {
      ko: ['큐 탐색 경과 시간과 10초 제한 수락 체크·파티원 응답 상태를 멀티플레이어 로비에 표시'],
      en: ['Display multiplayer queue search timer and 10s ready-check acceptance pip status'],
    },
    aliases: {
      ko: ['큐 수락 모달', '매치 성사 체크', '멀티플레이어 대기열', '레디 체크 카드'],
      en: ['queue ready check', 'match found modal', 'multiplayer queue card'],
    },
  },
  'game-save-slot-manager': {
    targets: ['list', 'panel', 'button'],
    triggers: ['click'],
    useCases: {
      ko: ['자동·수동·빈 저장 슬롯에서 안전한 덮어쓰기 확인과 저장 데이터 불러오기 제어'],
      en: ['Manage auto, manual, and empty game save slots with two-step overwrite protection'],
    },
    aliases: {
      ko: ['저장 슬롯 카드', '세이브 덮어쓰기 확인', '로드 세이브 UI', '체크포인트 슬롯'],
      en: ['save slot overwrite', 'save file manager', 'checkpoint slot UI'],
    },
  },
};
