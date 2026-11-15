import type { GlossaryTermBody } from './types';

export const BUSINESS_OPERATIONS_GLOSSARY_DATA: Record<string, GlossaryTermBody> = {
  'objectives-and-key-results': {
    aliases: {
      ko: ['OKR', 'KR', '핵심 결과', '목표 관리', '목표와 핵심 결과'],
      en: ['OKR', 'KR', 'key results', 'goal framework', 'objectives and key results'],
    },
    text: {
      ko: {
        definition: '도전적인 목표(Objective)와 그 달성 여부를 측정하는 정량·검증 가능한 핵심 결과(Key Result)를 짝지어 성과를 추적하는 목표 관리 체계입니다. 단순 할 일(To-do) 목록과 달리 작업 나열이 아니라 결과 변화에 초점을 둡니다.',
        example: '"신규 사용자 첫 주 안착 경험 개선"을 목표로 두고, 핵심 결과로 "온보딩 완료율 변화"나 "첫 프로젝트 생성 비중" 같은 결과 지표를 연결해 진척도를 점검합니다.',
        promptSnippet: '목표와 핵심 결과(OKR) 관리 흐름을 설계할 때 도전적 목표와 측정 가능한 핵심 결과(KR)를 연결하고 단순 작업 체크리스트와 구분하되, 조직마다 다른 목표 개수·주기·채점 방식은 고정 규칙으로 강제하지 말아 줘.',
      },
      en: {
        definition: 'A goal-setting framework pairing aspirational Objectives with measurable Key Results (KRs) to track outcome progress rather than listing to-do tasks, without mandating fixed org-specific counts, cadences, or scoring rules.',
        example: 'Pair an Objective like "Improve first-week new user activation" with measurable outcome KRs such as onboarding completion rate, keeping day-to-day execution tasks tracked separately.',
        promptSnippet: 'Design an Objectives and Key Results (OKR) tracking flow that links aspirational Objectives to measurable Key Results distinct from task lists, keeping target counts, review cadence, and scoring rules configurable per team.',
      },
    },
  },
  'inventory-allocation': {
    aliases: {
      ko: ['재고 선점', '주문 재고 할당', '가용 재고 예약', '재고 홀드'],
      en: ['stock allocation', 'inventory reservation', 'inventory hold', 'stock commitment'],
    },
    text: {
      ko: {
        definition: '주문이 접수되거나 결제가 진행되는 동안 보유 재고(On-hand) 가운데 해당 주문 몫을 가용 재고(Available)에서 미리 분리·예약해 다른 주문에 중복 판매되지 않게 하는 물류·커머스 재고 제어 방식입니다. 결제 시간 초과나 취소 시 선점된 재고를 즉시 가용 상태로 반환해야 품절 오탐을 막습니다.',
        example: '마지막 재고 1개 상품의 결제를 시작하면 10분간 임시 할당(Hold) 상태로 가용 수량을 0으로 줄이고, 결제 완료 시 확정 차감, 미결제 만료 시 다시 1개로 복원합니다.',
        promptSnippet: '재고 할당 선점(Inventory Allocation)을 구현할 때는 보유·할당·가용 수량을 분리하고, 원자적 조건부 차감과 결제 만료 시 자동 해제 타이머, 출고 취소 시 복원 경로를 함께 설계하세요.',
      },
      en: {
        definition: 'Reserving specific stock units from available-to-promise inventory when an order enters checkout or fulfillment so concurrent buyers cannot oversell the last item. Timed holds release stock automatically if checkout expires or orders cancel.',
        example: 'When a buyer begins checkout on the final unit, place a 10-minute allocation hold so other shoppers see out-of-stock, releasing the hold automatically if payment never completes.',
        promptSnippet: 'Separate on-hand, allocated, and available inventory counts using atomic conditional reservations, bounded checkout hold TTLs, and automatic release on timeout or cancellation.',
      },
    },
  },
  'reverse-logistics': {
    aliases: {
      ko: ['역물류', '반품 교환 수거', '회수 및 재입고', '반품 검수 물류'],
      en: ['return logistics', 'reverse supply chain', 'return pickup and restock', 'RMA logistics'],
    },
    text: {
      ko: {
        definition: '고객에게 배송된 상품을 반품·교환·수리 사유로 다시 수거해 물류 센터로 입고하고, 검수 결과(양품·불량·폐기)에 따라 재판매 가능 재고로 복원하거나 환불·재배송을 완료하는 역방향 물류 흐름입니다.',
        example: '고객이 반품을 신청하면 택배 회수 송장을 발급하고, 센터 입고 후 검수 통과 시에만 가용 재고로 다시 편입하며 파손 판정 시 손상 사유 사진과 함께 대체 정산을 진행합니다.',
        promptSnippet: '반품 회수 물류(Reverse Logistics) 흐름에는 회수 요청·수거 추적, 검수 단계(정상 재입고·폐기·보류) 분리, 선환불 vs 검수 후 환불 정책 분기, 그리고 재입고 전 가용 재고 오반영 차단을 포함하세요.',
      },
      en: {
        definition: 'The workflow of retrieving delivered goods from customers for returns, exchanges, or repairs—tracking pickup, inspecting condition at the warehouse, and deciding whether items restock, refurbish, or trigger refunds.',
        example: 'Issue a return pickup label on request, track transit back to the warehouse, and restock into sellable inventory only after inspection passes.',
        promptSnippet: 'Model reverse logistics with pickup tracking, explicit inspection outcomes (restock, damaged, hold), refund-timing policy branching, and strict gating so uninspected returns never auto-restock.',
      },
    },
  },
  'split-shipment': {
    aliases: {
      ko: ['부분 출고', '합포장 배송', '묶음 배송 분할', '다중 송장 배송'],
      en: ['partial shipment', 'split delivery', 'multi-parcel order', 'consolidated shipping'],
    },
    text: {
      ko: {
        definition: '하나의 주문에 포함된 여러 상품이 출고 창고·판매자·입고 일정이 다를 때 품목 단위로 여러 송장으로 나누어 먼저 발송(분할 배송)하거나, 같은 출고지 상품을 한 상자로 모아(합포장) 배송비와 수령 횟수를 줄이는 출고 운영 방식입니다.',
        example: '즉시 출고 가능한 셔츠와 3일 뒤 입고되는 가방을 한 번에 주문했을 때, 각각 별도 송장으로 출고 현황을 추적하고 구매 확정·부분 취소도 묶음 내 품목 단위로 처리합니다.',
        promptSnippet: '분할 배송과 합포장(Split/Consolidated Shipment)을 다룰 때는 주문(Order)과 배송 패키지(Shipment)·송장(Tracking)을 1:N 구조로 분리해 품목별 상태·부분 취소·배송비 정산을 독립 추적하세요.',
      },
      en: {
        definition: 'Fulfilling one customer order across multiple shipments when items reside in different warehouses, come from separate sellers, or have different lead times—or consolidating eligible items into one parcel to save shipping cost.',
        example: 'Split an order containing an in-stock shirt and a backordered bag into two independent shipments with separate tracking numbers and item-level cancellation.',
        promptSnippet: 'Separate order records from 1-to-many shipment packages so each parcel carries its own carrier, tracking status, partial cancellation handling, and shipping fee settlement.',
      },
    },
  },
  'proof-of-delivery': {
    aliases: {
      ko: ['POD', '수령 증빙', '배송 완료 사진', '전자 서명 인수증'],
      en: ['POD', 'delivery confirmation proof', 'recipient signature photo', 'drop-off evidence'],
    },
    text: {
      ko: {
        definition: '라스트마일 배송 기사가 물품을 전달한 뒤 수령인 서명, 문 앞 배치 사진, 수령 시각과 GPS 기록을 남겨 실제 인도를 객관적으로 증명하는 완료 증빙 데이터입니다. 분실·미수령 클레임 분쟁 해소와 정산 확정의 근거로 쓰이며 개인 주소·출입 비밀번호 등 민감정보 노출을 제한해야 합니다.',
        example: '배송 완료 처리 시 기사가 촬영한 현장 사진과 서명을 비공개 스토리지에 업로드하고, 구매자에게는 주문 상세에서 만료되는 안전 링크로만 증빙을 열람하게 합니다.',
        promptSnippet: '배송 완료 증빙(POD) 기능에는 사진·서명·타임스탬프·수령 방식 기록과 함께, 오프라인 환경의 지연 업로드 재시도 및 타인 열람 차단과 현관 비밀번호 등 개인정보 보호 처리를 포함하세요.',
      },
      en: {
        definition: 'Verifiable evidence captured at final handoff—such as a drop-off photo, recipient signature, timestamp, and location—proving a shipment was delivered and resolving non-receipt disputes.',
        example: 'A courier uploads a drop-off photo and signature to private storage upon delivery, exposing it only to authorized order participants via expiring links.',
        promptSnippet: 'Implement Proof of Delivery (POD) with photo/signature capture, offline retry queuing for couriers, authorized-only access controls, and privacy protection for sensitive location or entry details.',
      },
    },
  },
  'cold-chain-monitoring': {
    aliases: {
      ko: ['냉장 냉동 유통 관리', '저온 물류 모니터링', '온도 이탈 경보', '신선식품 온도 추적'],
      en: ['temperature-controlled logistics', 'cold chain tracking', 'thermal excursion alert', 'perishable monitoring'],
    },
    text: {
      ko: {
        definition: '신선식품·의약품·시약처럼 일정 온도 범위를 유지해야 하는 화물을 보관·운송하는 전 과정에서 센서 온도를 연속 기록하고, 허용 범위를 벗어난 온도 이탈(Excursion) 발생 시 즉시 경보·폐기 격리·재배송 보상을 연결하는 품질 관리 체계입니다.',
        example: '냉장 의약품 배송 구간에서 온도가 8°C를 15분 이상 초과하면 운송 상태에 온도 이탈 경고를 기록하고, 고객 인도 전 자동 격리 및 대체 출고 승인을 요청합니다.',
        promptSnippet: '콜드체인 온도 관리 화면과 알림 규칙에서는 허용 상·하한 온도 및 연속 이탈 시간 기준, 구간별 시계열 차트 표시, 이탈 발생 시 출고·인수 보류와 클레임·재배송 연결을 함께 구현하세요.',
      },
      en: {
        definition: 'End-to-end temperature monitoring across storage and transit for perishable goods or pharmaceuticals, logging sensor readings and triggering alerts, quarantine, or redelivery when temperatures breach safe thresholds.',
        example: 'If refrigerated cargo stays above 8°C for 15 minutes, flag an excursion event on the shipment timeline and initiate replacement dispatch before delivery.',
        promptSnippet: 'Build cold-chain monitoring with configurable safe temperature bands and duration thresholds, time-series excursion highlights, quarantine holds, and automated claim or redelivery workflows.',
      },
    },
  },
};
