import type { DomainKnowledge } from '../domain-knowledge';

export const LOGISTICS_KNOWLEDGE: DomainKnowledge[] = [
  {
    id: 'logistics-warehouse-picking-packing-and-split-shipment',
    aliases: {
      ko: ['창고 피킹 패킹', '부분 출고 분리배송', '합포장 처리', '출고 검수 재고 부족', '풀필먼트 할당'],
      en: ['warehouse pick and pack', 'split shipment fulfillment', 'order consolidation', 'short-pick stock discrepancy', 'fulfillment allocation'],
    },
    useCases: {
      ko: [
        '주문 하나에 담긴 여러 상품이 서로 다른 창고에 있거나 출고 가능 시점이 달라 분리배송할 때',
        '같은 수령인의 여러 주문을 하나의 상자로 합포장(Consolidation)할 수 있는 조건을 정할 때',
        '피킹 도중 전산 재고와 실물 재고가 맞지 않아 일부 수량만 출고하거나 대체·품절 처리할 때',
        '패킹 바코드 검수와 송장 발행 시점을 기준으로 배송지 변경·취소 가능 여부를 나눌 때',
      ],
      en: [
        'Splitting a single customer order into multiple shipments across warehouses or availability dates',
        'Consolidating multiple orders for the same recipient and address into one parcel before packing',
        'Handling short-picks when physical bin inventory is lower than system stock during picking',
        'Locking address edits and order cancellations once pick/pack verification or label printing begins',
      ],
    },
    keywords: {
      ko: ['풀필먼트', '창고 할당', '피킹', '패킹', '바코드 검수', '분리배송', '부분 출고', '합포장', '재고 불일치', '송장 발행'],
      en: ['fulfillment', 'warehouse allocation', 'picking', 'packing', 'barcode verification', 'split shipment', 'partial shipment', 'order consolidation', 'short pick', 'shipping label'],
    },
    text: {
      ko: {
        domain: '물류·배달·풀필먼트',
        title: '창고 할당·피킹/패킹 검수·부분 출고(합포장·분리배송)와 재고 불일치',
        summary: '주문 단위를 실제 출고 지시·상자 단위로 분리하고, 피킹 중 실물 재고 부족과 합포장·분리배송 조건을 정합성 있게 처리합니다.',
        overview: '고객이 결제한 주문 1건이 항상 상자 1개로 출고되지는 않습니다. 보관 창고가 다르거나 입고 지연 상품이 섞여 있으면 준비된 상품부터 분리배송해야 하고, 반대로 같은 고객의 연속 주문은 합포장해 배송비를 아끼기도 합니다. 또한 전산상 재고가 있어도 현장 피킹 중 파손·분실로 수량이 모자라는 상황(Short-pick)과 출고 지시 이후 취소 차단 시점을 명확히 설계해야 합니다. 아래 개념은 풀필먼트 흐름 설계를 위한 참고이며 특정 창고 관리 시스템(WMS) 규격을 강제하지 않습니다.',
        concepts: [
          { name: '주문(Order)·출고 지시(Fulfillment Order)·상자(Package) 분리', description: '고객 주문 1건 아래에 여러 출고 지시와 복수의 상자(운송장 번호)가 연결될 수 있도록 모델을 분리하고, 품목별 출고 수량을 개별 추적합니다.' },
          { name: '분리배송(Split Shipment)과 합포장(Consolidation) 규칙', description: '재고 위치나 예약 상품 여부에 따라 주문을 나누어 출고하는 기준과, 동일 수령인·배송지·온도대의 미출고 주문을 하나로 합치는 조건 및 마감 시점을 정합니다.' },
          { name: '피킹·패킹 바코드 검수와 실물 재고 불일치(Short-pick)', description: '지정 로케이션에서 상품 바코드를 스캔해 오출고를 막고, 실물이 부족하면 대체 로케이션 재할당·부분 출고·부분 환불 중 어떤 절차로 넘길지 결정합니다.' },
          { name: '출고 단계별 주문 취소·배송지 변경 잠금(Cutoff)', description: '할당 대기 중에는 취소를 즉시 허용하더라도, 피킹 시작이나 송장 발행 이후에는 현장 회수 확인 전까지 취소·주소 변경을 보류하거나 차단합니다.' },
        ],
        workflow: [
          { name: '창고 할당 및 합포장·분리배송 결정하기', description: '주문 품목의 보관 창고, 온도대, 가용 재고를 확인해 단일 출고, 창고별 분리 출고, 기존 미출고 건과의 합포장 여부를 결정합니다.' },
          { name: '피킹 리스트 생성 및 현장 재고 부족 처리하기', description: '동선에 따라 피킹 지시를 내리고, 현장에서 파손·분실이 발견되면 해당 로케이션을 보류 처리한 뒤 다른 재고를 찾거나 부분 출고로 전환합니다.' },
          { name: '패킹 검수·상자 분할 및 운송장 발행하기', description: '스캔한 품목과 수량이 출고 지시와 일치하는지 확인하고, 부피·무게에 따라 상자를 나눈 뒤 상자별 운송장 번호를 부여합니다.' },
          { name: '상자별 출고 확정 및 고객 알림 전달하기', description: '상차 완료 시 품목별 출고 수량과 남은 미출고 품목 상태를 갱신하고, 고객에게 상자별 송장 번호와 분리배송 여부를 안내합니다.' },
        ],
        pitfalls: [
          { name: '주문 1건당 운송장 번호 컬럼을 1개만 두기', description: '부피가 커서 두 상자로 나누거나 일부 상품을 먼저 보내야 할 때 두 번째 송장을 등록할 수 없어 배송 추적이 깨집니다.' },
          { name: '피킹·패킹이 진행 중인데 고객의 즉시 취소나 주소 변경을 그대로 통과시키기', description: '현장에서는 이미 송장을 붙여 출고했는데 전산에서만 취소 완료로 처리되면 상품은 그대로 발송되고 환불까지 나가는 사고가 발생합니다.' },
          { name: '현장 재고 부족(Short-pick) 시 전산 재고를 그대로 두어 다음 주문에 또 할당하기', description: '실물이 없는 로케이션의 가용 재고를 즉시 동결하고 실사 대상으로 분리하지 않으면 이후 주문도 연쇄적으로 출고 실패를 겪습니다.' },
        ],
        questions: [
          '주문 내 일부 상품만 즉시 출고 가능할 때 준비된 상품부터 분리배송하나요, 전체 상품이 모일 때까지 대기하나요?',
          '분리배송이나 합포장이 발생할 때 추가 배송비 부담이나 배송비 환급 기준은 어떻게 되나요?',
          '피킹 중 실물 재고 부족(Short-pick)이 확인되면 나머지 상품만 먼저 출고하나요, 고객 확인 후 전체 여부를 결정하나요?',
          '고객이 배송지를 변경하거나 주문을 즉시 취소할 수 있는 마지막 단계(할당 전, 피킹 전, 송장 발행 전)는 어디까지인가요?',
          '한 출고 지시를 여러 상자로 나누어 패킹할 때 상자별 포함 품목과 수량까지 고객 화면에 표시하나요?',
        ],
        example: '예시: 동일 배송지·상온 상품이 송장 발행 전이면 자동 합포장하고, 피킹 중 일부 품목 재고가 부족하면 해당 로케이션을 즉시 실사 보류로 잠근 뒤 준비된 품목부터 부분 출고하며 상자별 운송장과 남은 품목 일정을 함께 안내하는 방식을 생각할 수 있습니다. 실제 분리배송 기준과 취소 차단 시점은 창고 운영 방식에 맞게 먼저 확인해야 합니다.',
        relatedDesigns: [
          { id: 'ly-expandable-data-rows', reason: '출고 지시나 주문 행을 펼쳐 상자(운송장)별로 어떤 품목이 몇 개씩 담겼고 어떤 품목이 미출고 상태인지 확인하는 구조에 참고할 수 있습니다.' },
          { id: 'bulk-selection-action-bar', reason: '창고 운영 화면에서 여러 출고 대기 건을 선택해 일괄 피킹 지시, 합포장 묶기, 송장 발행을 실행하는 하단·상단 액션바 표현에 참고할 수 있습니다.' },
        ],
        promptSnippet: '창고 할당, 피킹·패킹 검수, 합포장·분리배송(부분 출고)과 현장 재고 불일치 처리 흐름을 설계해 줘. 먼저 분리배송 및 합포장 기준, 피킹 중 실물 재고 부족(Short-pick) 시 처리 방침, 출고 단계별 주문 취소·배송지 변경 가능 한계 시점, 다중 상자 패킹 시 송장·품목 매핑 방식을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 주문(Order), 출고 지시(Fulfillment), 상자(Package/운송장) 간의 1:N 데이터 관계와 상태 전이.\n2. 합포장 묶음 조건과 일부 품목 지연·창고 분리 시 부분 출고 처리 규칙.\n3. 피킹·패킹 바코드 검수 절차와 실물 부족 시 로케이션 잠금·재할당·부분 취소 흐름.\n4. 피킹 시작·송장 발행 이후 취소/주소 변경 요청의 차단 또는 현장 회수 확인 절차.\n5. 출고 대기 목록, 피킹/패킹 검수 화면, 고객용 상자별 배송 현황 화면의 연결.\n주문 1건에 송장 1개만 존재한다고 가정하지 말고, 예시 정책과 디자인 데모를 실제 창고 설비·택배사 연동 구현으로 간주하지 말아 줘.',
      },
      en: {
        domain: 'Logistics, Delivery & Fulfillment',
        title: 'Warehouse allocation, pick/pack verification, split shipments and stock discrepancy handling',
        summary: 'Separate customer orders from fulfillment orders and physical packages, and handle split shipments, order consolidation and short-pick inventory discrepancies.',
        overview: 'A single checkout order does not always leave the warehouse as a single box. Items stored in different fulfillment centers or on backorder may ship separately, while multiple orders for the same address may be consolidated into one parcel. Warehouse teams also need clear rules when physical bin stock is missing during picking (short-pick) and strict cutoffs for when customers can no longer edit addresses or cancel immediately. These concepts are design references rather than a fixed WMS specification.',
        concepts: [
          { name: 'Order, Fulfillment Order and Package hierarchy', description: 'Model a 1-to-many relationship from the customer order to warehouse fulfillment orders and individual physical packages (each with its own tracking number and item quantities).' },
          { name: 'Split shipments versus order consolidation', description: 'Define when an order is split across warehouses or availability dates, and when multiple unreleased orders for the same recipient, address and temperature zone can be merged.' },
          { name: 'Barcode pick/pack verification and short-pick handling', description: 'Require item barcode scans during picking and packing to prevent mis-shipments, and define whether a physical stock shortage triggers bin freezing, re-allocation, partial shipment or partial refund.' },
          { name: 'Stage-based cancellation and address-edit cutoffs', description: 'Allow instant self-service edits before warehouse release, but block or hold cancellation and address changes once picking starts or shipping labels are generated.' },
        ],
        workflow: [
          { name: 'Allocate inventory and evaluate split or consolidated fulfillment', description: 'Assign items to warehouses based on stock and zone rules, splitting multi-warehouse items or merging eligible orders before pick release.' },
          { name: 'Execute guided picking and resolve physical short-picks', description: 'Direct pickers by bin location; if an item is damaged or missing, quarantine the bin count and either re-allocate from another bin or mark the line as short-picked.' },
          { name: 'Verify packed items, split boxes and generate tracking labels', description: 'Confirm scanned items match the fulfillment order, distribute heavy or bulky items across multiple boxes if needed, and assign a tracking number to each box.' },
          { name: 'Confirm dispatch per package and notify the recipient', description: 'Update shipped versus remaining item quantities upon carrier handoff and show per-box contents and tracking links to the customer.' },
        ],
        pitfalls: [
          { name: 'Storing only a single tracking number field on the order record', description: 'Tying one tracking number to the whole order makes it impossible to represent multi-box packing or split shipments across warehouses.' },
          { name: 'Allowing instant customer cancellation after a parcel is already on the packing line', description: 'If the app refunds an order immediately without intercepting the physical box in the warehouse, the parcel still ships for free.' },
          { name: 'Leaving system inventory unchanged after a physical short-pick', description: 'If a picker reports an empty bin but available stock is not frozen for cycle counting, subsequent orders will repeatedly allocate to the same phantom stock.' },
        ],
        questions: [
          'When only part of an order is ready, does the available portion ship immediately or wait for the remaining items?',
          'How are shipping fees or surcharges handled when an order is split or when multiple orders are consolidated?',
          'If a picker discovers missing stock (short-pick) and no backup bin exists, do the remaining items still ship automatically?',
          'At which exact fulfillment stage (allocated, picking started, packed, labeled) are self-service cancellations and address edits locked?',
          'Does the customer order view list the exact items and quantities inside each individual box when a shipment is split?',
        ],
        example: 'Example: a fulfillment flow might consolidate ambient-temperature orders for the same address prior to label generation, freeze bin stock and ship available items when a short-pick occurs, and lock address edits once picking begins while showing per-box item lists to the customer. Confirm split-shipment and cutoff policies with warehouse operations first.',
        relatedDesigns: [
          { id: 'ly-expandable-data-rows', reason: 'A reference for expanding an order or fulfillment row to inspect individual boxes, tracking numbers and per-box item quantities.' },
          { id: 'bulk-selection-action-bar', reason: 'A reference for selecting multiple queued fulfillment orders to batch-release pick waves, consolidate parcels or print labels.' },
        ],
        promptSnippet: 'Help design warehouse allocation, pick/pack verification, split or consolidated shipments and short-pick discrepancy handling. First confirm split-shipment and consolidation rules, how physical short-picks are resolved, which fulfillment stage locks cancellations and address changes, and how multi-box packages map to order items. Do not assume undecided rules.\nBased on the answers, describe:\n1. The data relationship and states across Order, Fulfillment Order and Package (tracking number and item lines).\n2. Rules for consolidating orders or splitting shipments across warehouses and availability dates.\n3. Barcode verification during picking/packing and bin-freeze, re-allocation or partial-cancel steps on short-picks.\n4. Cutoff rules and interception workflows when cancellation or address changes are requested after pick release.\n5. How fulfillment queues, pick/pack verification screens and customer multi-package tracking views connect.\nDo not assume one order always equals one tracking number, and do not mistake example policies or design demos for live WMS or carrier integrations.',
      },
    },
    sources: [
      { title: 'Shopify Help Center — Fulfilling orders and split fulfillments', url: 'https://help.shopify.com/en/manual/fulfillment/fulfilling-orders' },
      { title: 'GS1 Standards — Warehouse Management and Barcode Verification', url: 'https://www.gs1.org/industries/transport-and-logistics' },
    ],
  },
  {
    id: 'logistics-last-mile-dispatch-and-delivery-proof',
    aliases: {
      ko: ['라스트마일 배차', '배달 경로 상태', '수령 확인 사진 서명', '부재 시 재배달 보관', '배송 완료 증빙'],
      en: ['last-mile dispatch', 'delivery status tracking', 'proof of delivery photo signature', 'unattended delivery workflow', 'failed delivery redelivery'],
    },
    useCases: {
      ko: [
        '배차 대기·배차 완료·픽업 완료·배송 출발·배송 완료·배송 실패 등 단계별 상태를 전환할 때',
        '대면 수령(서명·인증번호)과 비대면 문앞 배송(완료 사진 촬영)의 완료 증빙 요건을 구분할 때',
        '고객 부재·공동현관 출입 불가·주소 불명 시 재시도, 보관 장소 변경, 반송 절차를 나눌 때',
        '배달원이나 배송 기사의 위치·완료 보고가 오프라인 구간에서 지연 도착할 때 순서를 보정할 때',
      ],
      en: [
        'Managing transitions across unassigned, dispatched, picked up, out for delivery, delivered and failed states',
        'Separating proof-of-delivery (PoD) requirements for attended handoff (signature or PIN) versus unattended drop-off (photo)',
        'Handling recipient absence, locked building entry or invalid addresses via redelivery, safe-place drop or return to hub',
        'Reconciling delayed or out-of-order status updates when couriers work through dead network zones',
      ],
    },
    keywords: {
      ko: ['라스트마일', '배차', '배송 상태', '수령 확인', '배송 완료 사진', '전자 서명', '비대면 배송', '공동현관 출입', '재배달', '반송 전환'],
      en: ['last mile', 'dispatch', 'delivery tracking', 'proof of delivery', 'delivery photo', 'recipient signature', 'unattended delivery', 'access instructions', 'redelivery attempt', 'return to sender'],
    },
    text: {
      ko: {
        domain: '물류·배달·풀필먼트',
        title: '배달 배차·경로 상태·수령 확인(사진/서명)과 부재 시 재배달/보관 처리',
        summary: '배차부터 최종 전달까지의 상태를 추적하고, 대면·비대면 수령 방식별 완료 증빙과 출입 불가·부재 시 후속 절차를 구분합니다.',
        overview: '라스트마일 배송은 도로 상황, 공동현관 출입, 수령인 부재 등 현장 변수가 가장 많은 구간입니다. 단순히 배송 완료 버튼만 누르게 하면 오배송 분쟁이 생기기 쉬우므로, 비대면 문앞 배송은 현장 사진 촬영을, 고가품·연령 확인 상품은 대면 서명이나 수령 코드를 요구하는 등 상품·요청 유형별 수령 확인(PoD) 규칙을 분리해야 합니다. 아래 개념은 라스트마일 배송 설계를 위한 참고이며 특정 배달 대행 API 규격을 고정하지 않습니다.',
        concepts: [
          { name: '배차·집하·배송 출발·완료·실패 상태 전이', description: '배차 대기, 기사 배정(재배정 포함), 상품 픽업, 배송 중, 배송 완료, 배송 보류/실패, 거점 회수 상태를 구분하고 허용되는 역전이 조건을 정합니다.' },
          { name: '수령 방식별 완료 증빙(Proof of Delivery)', description: '문앞·경비실 등 비대면 보관 시에는 위치·사진 등록을 필수로 하고, 대면 수령 필수 상품은 서명이나 일회용 수령 확인 번호(PIN) 없이 완료 처리하지 못하게 합니다.' },
          { name: '배송 실패 사유 분류와 재배달·회수 전환', description: '공동현관 비밀번호 오류, 수령인 부재, 주소 오기재, 수취 거부 등 실패 사유를 구분해 고객에게 안내하고, 최대 재시도 횟수 초과 시 거점 보관 또는 반송으로 전환합니다.' },
          { name: '출입 정보 보안과 오프라인 완료 보고 정합성', description: '공동현관 출입번호 등 민감 정보는 배송 완료 즉시 기사 화면에서 숨기고, 지하·엘리베이터 등 통신 음영 지역에서 기록된 완료 시각을 서버 수신 시각과 구분해 저장합니다.' },
        ],
        workflow: [
          { name: '배송 건 배차 및 수령 방법·출입 안내 전달하기', description: '배송 기사에게 경로와 희망 수령 장소(문앞·경비실·대면), 공동현관 출입 방법을 전달하고 대면 필수 여부를 표시합니다.' },
          { name: '픽업 스캔 및 배송 출발 안내하기', description: '기사가 물품을 인수해 스캔하면 고객에게 예상 도착 시간대나 현재 배송 단계를 갱신해 안내합니다.' },
          { name: '수령 증빙 등록 후 배송 완료 확정하기', description: '요구된 증빙(배달 완료 사진, 서명, 수령 코드)이 업로드되어야 완료로 전환하고, 완료 즉시 기사 앱의 고객 연락처·출입번호 열람을 제한합니다.' },
          { name: '배송 불가 시 사유 기록 및 재배달·보관 장소 변경 처리하기', description: '출입 불가나 부재로 전달하지 못하면 사유와 현장 증빙을 남기고, 고객이 출입 정보를 수정하거나 재배달·대체 보관 장소를 지정할 수 있게 연결합니다.' },
        ],
        pitfalls: [
          { name: '대면 수령 필수 상품을 사진 한 장만으로 비대면 문앞 완료 처리하기', description: '고액 상품이나 본인 확인이 필요한 물품을 임의로 문앞에 두도록 허용하면 분실·수령 부인 시 책임 소재를 가릴 수 없습니다.' },
          { name: '배송 완료 후에도 기사 앱에 고객 전화번호와 공동현관 비밀번호를 계속 노출하기', description: '배송이 끝난 뒤에도 개인정보와 출입 정보가 남으면 보안 문제가 되므로 안심번호 만료와 출입 정보 마스킹을 즉시 적용해야 합니다.' },
          { name: '단순 배송 실패와 고객의 수취 거부를 같은 상태로 묶기', description: '출입문 비밀번호 누락은 정보 보완 후 재배달 대상이지만, 명시적 수취 거부는 즉시 회수·반품 절차로 넘어가야 하므로 사유별 후속 흐름을 분리해야 합니다.' },
        ],
        questions: [
          '기본 수령 방식은 비대면(문앞·보관함)인가요, 대면 수령인가요? 대면 수령이나 PIN 입력이 필수인 상품 조건은 무엇인가요?',
          '배송 완료 처리를 위해 사진 촬영이나 서명 등록이 필수인가요, 그리고 완료 사진을 고객에게 언제까지 보여주나요?',
          '공동현관 출입 불가나 대면 수령인 부재 시 몇 회까지 재시도하며, 대기 시간이나 보관 장소 변경 규칙은 무엇인가요?',
          '배송 완료 또는 취소 후 기사 화면에서 고객 연락처(안심번호)와 공동현관 비밀번호는 언제 마스킹되나요?',
          '기사가 이미 배송 완료를 눌렀으나 오배송으로 확인된 경우 상태를 다시 배송 중으로 되돌릴 수 있나요?',
        ],
        example: '예시: 일반 상품은 문앞 배송 후 사진 1장 등록 시 완료 처리하고, 고가 상품은 4자리 수령 번호 확인을 요구하며, 공동현관 출입 불가 시 고객에게 알림을 보내 10분 내 응답이 없으면 거점으로 회수하고 완료 즉시 출입번호를 마스킹하는 방식을 생각할 수 있습니다. 실제 증빙 요건과 재시도 횟수는 서비스 특성에 맞게 먼저 확인해야 합니다.',
        relatedDesigns: [
          { id: 'ly-activity-timeline', reason: '배차 완료, 픽업, 배송 출발, 배송 시도/실패, 최종 완료 사진 확인까지 시간순 배송 진행 단계를 고객과 운영자에게 보여줄 때 참고할 수 있습니다.' },
          { id: 'native-file-attachment', reason: '배송 기사가 문앞 배치 완료 사진이나 현장 출입 불가 증빙 이미지를 첨부하고 업로드 상태를 확인하는 입력 흐름에 참고할 수 있습니다.' },
        ],
        promptSnippet: '라스트마일 배달 배차, 경로 상태 추적, 수령 확인 증빙(사진·서명·인증번호)과 부재 시 재배달·회수 흐름을 설계해 줘. 먼저 대면·비대면 수령 구분과 필수 증빙 요건, 공동현관 출입 불가 및 수령인 부재 시 재시도·회수 기준, 완료 후 연락처·출입번호 마스킹 시점, 오배송 시 상태 복구 허용 여부를 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 배차 대기·배정·픽업·배송 중·완료·보류/실패·회수 상태와 실제 발생 시각/서버 수신 시각 기록.\n2. 비대면 사진 증빙과 대면 서명·PIN 확인 등 수령 방식별 완료 검증 조건.\n3. 출입 불가·부재·주소 불명·수취 거부 사유별 고객 알림 및 재배달·반송 전환 흐름.\n4. 배송 종료 후 안심번호 해제 및 공동현관 출입 정보 즉시 마스킹 규칙.\n5. 기사 배차/완료 등록 화면, 고객 배송 조회 및 수령 방법 변경 화면, 운영 관제 화면의 연결.\n증빙 확인 없이 상태값만 바꾸는 완료 처리를 기본으로 두지 말고, 예시 정책과 디자인 데모를 실제 위치 추적·통신사 안심번호 연동으로 간주하지 말아 줘.',
      },
      en: {
        domain: 'Logistics, Delivery & Fulfillment',
        title: 'Last-mile dispatch, proof of delivery and unattended or failed-delivery workflows',
        summary: 'Track dispatch-to-doorstep states, enforce delivery proof by handoff type, and route failed attempts to redelivery, safe drop-off or return.',
        overview: 'Last-mile delivery faces real-world friction such as locked building lobbies, absent recipients and dead network zones in elevators. Simply tapping a "Delivered" button without verification invites disputes. Separate proof-of-delivery (PoD) rules for unattended doorstep drops versus attended handoffs, define clear paths when a courier cannot reach the door, and mask sensitive access codes once delivery finishes. These concepts are design references, not a fixed courier API specification.',
        concepts: [
          { name: 'Dispatch and last-mile lifecycle states', description: 'Track unassigned, courier assigned (or reassigned), picked up, out for delivery, delivered, delivery failed/on-hold and returned-to-hub states alongside allowed transitions.' },
          { name: 'Proof of Delivery (PoD) by handoff requirement', description: 'Require drop-off photos for unattended deliveries (doorstep, concierge, parcel locker) and require a signature or recipient PIN for attended-only items.' },
          { name: 'Structured failure reasons and redelivery routing', description: 'Distinguish locked building access, recipient absence, wrong address and explicit refusal so each triggers the right next step—instruction update, redelivery attempt or return.' },
          { name: 'Access-note redaction and offline timestamp reconciliation', description: 'Hide building entry codes and masked phone numbers as soon as the stop completes, and store both the actual offline capture timestamp and server sync timestamp.' },
        ],
        workflow: [
          { name: 'Dispatch route with handoff rules and entry instructions', description: 'Provide the courier with stop order, drop-off preference (doorstep, locker, in-person), building access notes and whether a signature or PIN is mandatory.' },
          { name: 'Scan pickup and broadcast out-for-delivery status', description: 'Confirm parcel custody via barcode scan at pickup and update the recipient with the active delivery stage and estimated window.' },
          { name: 'Capture required proof of delivery and mask private instructions', description: 'Validate that the photo, signature or PIN is attached before marking the stop delivered, then immediately redact lobby codes and expire proxy contact numbers.' },
          { name: 'Record delivery exceptions and trigger redelivery or hub return', description: 'When delivery cannot be completed, log the reason and evidence, prompt the recipient to update access details or choose an alternate drop location, or route back to the hub after max attempts.' },
        ],
        pitfalls: [
          { name: 'Allowing couriers to complete attended-only deliveries with just a doorstep photo', description: 'High-value or restricted items that require in-person verification must block completion unless the required PIN or signature is captured or an approved fallback is chosen.' },
          { name: 'Keeping customer phone numbers and building entry codes visible after completion', description: 'Leaving private access notes accessible in the courier’s completed history creates privacy risks; redact them immediately upon terminal status.' },
          { name: 'Treating temporary access failures the same as explicit recipient refusal', description: 'A missing lobby code can be resolved with a quick customer reply or redelivery, whereas an explicit refusal at the door should go straight to return processing.' },
        ],
        questions: [
          'Which deliveries allow unattended drop-off with a photo versus requiring an in-person signature or recipient PIN?',
          'Are proof-of-delivery photos mandatory for unattended stops, and how long can recipients view them?',
          'How many delivery attempts are made when a recipient is absent or building entry fails, and what happens after the final attempt?',
          'When are customer proxy phone numbers and building entry codes masked from the courier’s device?',
          'If a courier marks a stop delivered by mistake, who can revert or reopen the delivery status?',
        ],
        example: 'Example: standard parcels could allow doorstep drop-off with a mandatory photo, high-value parcels could require a 4-digit recipient PIN, failed lobby access could notify the customer and return the parcel to the hub if unresolved, and lobby codes could be masked immediately upon completion. Confirm PoD rules and retry limits for the target operation.',
        relatedDesigns: [
          { id: 'ly-activity-timeline', reason: 'A reference for displaying the step-by-step progression from dispatch and pickup through delivery attempts and final proof of delivery.' },
          { id: 'native-file-attachment', reason: 'A reference for attaching and previewing proof-of-delivery or exception photos before submitting completion.' },
        ],
        promptSnippet: 'Help design last-mile dispatch, delivery status tracking, proof of delivery (photo, signature, PIN) and failed-delivery recovery workflows. First confirm attended versus unattended handoff rules, mandatory PoD evidence, retry and hub-return policies on failed access or absence, post-delivery masking of contact and entry codes, and whether mistakenly completed stops can be reopened. Do not assume undecided rules.\nBased on the answers, describe:\n1. State transitions across dispatch, pickup, out for delivery, delivered, failed/hold and hub return, including offline timestamp handling.\n2. Validation rules for unattended photo proof versus attended signature or PIN verification.\n3. Exception flows for locked entry, recipient absence, bad address and recipient refusal.\n4. Immediate redaction of building entry codes and proxy phone numbers after completion.\n5. How the courier stop screen, customer tracking/instruction view and dispatch console connect.\nDo not allow unattended completion on attended-only shipments, and do not mistake example policies or design demos for real GPS or telecom proxy integrations.',
      },
    },
    sources: [
      { title: 'Schema.org — ParcelDelivery and DeliveryEvent Vocabulary', url: 'https://schema.org/ParcelDelivery' },
      { title: 'GS1 — Last Mile Delivery and Proof of Delivery Guidelines', url: 'https://www.gs1.org/standards/traceability' },
    ],
  },
  {
    id: 'logistics-address-validation-zone-surcharge-and-cutoff',
    aliases: {
      ko: ['배송지 권역 판별', '도서산간 추가 운임', '당일 출고 마감 시각', '새벽배송 가능 지역 확인', '주소 정제 및 배송 불가'],
      en: ['shipping zone validation', 'remote area surcharge', 'same-day dispatch cutoff', 'serviceable zip code check', 'address normalization'],
    },
    useCases: {
      ko: [
        '입력한 우편번호·도로명 주소를 기준으로 일반 택배·새벽배송·당일배송 가능 권역인지 판별할 때',
        '제주·도서산간 지역 선택 시 추가 운임을 계산하고 배송 불가 상품(신선식품·대형 가구 등)을 결제 전에 차단할 때',
        '당일 출고 마감 시각(Cutoff)과 주말·공휴일·택배 없는 날을 반영해 예상 발송일을 안내할 때',
        '결제 완료 후 배송지를 변경할 때 권역이 달라져 발생하는 추가 운임이나 배송 방법 변경을 검증할 때',
      ],
      en: [
        'Determining whether an address qualifies for standard, overnight or same-day delivery based on postal code and zone rules',
        'Calculating remote-area or island surcharges and blocking unserviceable items (such as perishables or oversized goods) before payment',
        'Computing dispatch and arrival estimates around daily cutoff times, weekends and carrier holidays',
        'Re-validating zone eligibility and surcharge differences when a customer edits their shipping address after checkout',
      ],
    },
    keywords: {
      ko: ['배송 권역', '도서산간', '추가 배송비', '출고 마감 시각', '당일 출고', '배송 불가 지역', '우편번호 검증', '예상 도착일', '주소 변경 검증'],
      en: ['shipping zone', 'remote area surcharge', 'island surcharge', 'dispatch cutoff', 'same-day shipping', 'unserviceable area', 'postal code validation', 'estimated delivery date', 'address change validation'],
    },
    text: {
      ko: {
        domain: '물류·배달·풀필먼트',
        title: '배송지 권역 판별·도서산간 추가 운임·당일 출고 마감 시각 안내',
        summary: '배송지 주소로 가능 배송 방식과 도서산간 추가 운임을 결제 전에 판별하고, 출고 마감 시각과 휴무일을 반영해 발송 일정을 계산합니다.',
        overview: '같은 상품이라도 배송지에 따라 새벽배송이 가능한 곳, 일반 택배만 가능한 곳, 도서산간 추가 운임이 붙는 곳, 신선도 유지나 설치 제약으로 아예 배송이 불가능한 곳이 나뉩니다. 결제 후 출고 단계에서야 배송 불가를 발견하면 취소·환불 마찰이 커지므로, 주소 입력과 결제 시점에 권역·추가 운임·출고 마감 시각(Cutoff)을 정확히 판별하고 결제 후 주소 변경 시에도 같은 검증을 거쳐야 합니다. 아래 개념은 배송 권역·운임·마감 설계를 위한 참고이며 특정 우편번호 체계를 고정하지 않습니다.',
        concepts: [
          { name: '주소 정규화와 권역별 배송 수단 판별', description: '우편번호와 행정구역·도로명 주소를 기준으로 당일·새벽·일반 택배 가능 여부와 도서산간·제주 권역 해당 여부를 판별합니다.' },
          { name: '도서산간 추가 운임과 상품별 배송 불가 제약', description: '권역별 추가 운임을 기본 배송비와 구분해 계산하고, 냉장·냉동 상품이나 설치형 대형 상품처럼 특정 권역으로 보낼 수 없는 품목은 결제 전에 안내합니다.' },
          { name: '당일 출고 마감 시각(Cutoff)과 영업일 캘린더', description: '창고 시간대 기준 마감 시각(예: 오후 2시)과 주말·공휴일·택배사 휴무일을 반영해 결제 완료 시각 기준 예상 출고일을 계산합니다.' },
          { name: '결제 후 배송지 변경 시 권역·운임 재검증', description: '주문 완료 후 고객이 주소를 바꿀 때 일반 지역에서 도서산간이나 배송 불가 지역으로 바뀌는 경우를 검사해 변경을 차단하거나 차액 정산을 거치게 합니다.' },
        ],
        workflow: [
          { name: '배송지 선택 시 가능 배송 수단과 제약 즉시 표시하기', description: '장바구니·주문서에서 주소가 선택되면 해당 권역에서 이용 가능한 배송 방법과 배송 불가 품목 유무를 바로 보여줍니다.' },
          { name: '기본 배송비와 권역 추가 운임 분리 계산하기', description: '무료배송 조건을 충족하더라도 도서산간 추가 운임이 별도로 부과되는지 여부에 따라 최종 배송비를 산출하고 명세를 표시합니다.' },
          { name: '서버 시각 기준 출고 마감 카운트다운 및 발송일 확정하기', description: '주문서 작성 중 마감 시각이 지나면 예상 출고일을 다음 영업일로 갱신하고, 실제 결제 승인 시각을 기준으로 출고 예정일을 확정합니다.' },
          { name: '주문 후 주소 변경 요청 시 권역 호환성 확인하기', description: '출고 전 주소 변경 시 새 주소의 권역 등급과 추가 운임 변동 여부를 확인해 동일 조건일 때만 즉시 변경을 허용합니다.' },
        ],
        pitfalls: [
          { name: '무료배송 쿠폰이나 금액 기준 적용 시 도서산간 추가 운임까지 무조건 0원으로 만들기', description: '기본 배송비 면제와 도서산간 특수 운임 면제 정책을 구분하지 않으면 원가 손실이나 정산 오류가 발생할 수 있습니다.' },
          { name: '결제 후 배송지 변경 화면에서 권역·추가 운임 검사를 생략하기', description: '일반 지역으로 결제한 뒤 출고 직전에 제주·도서산간이나 배송 불가 지역으로 주소를 바꾸면 추가 운임 누락이나 출고 불능 상태가 됩니다.' },
          { name: '사용자 기기의 로컬 시계를 기준으로 당일 출고 마감 여부를 판정하기', description: '기기 시간이 틀려 있거나 주문서를 오래 열어둔 채 마감 시각 이후에 결제했을 때 당일 출고로 잘못 약속하지 않도록 서버 시각으로 재판정해야 합니다.' },
        ],
        questions: [
          '주소 기준으로 구분하는 배송 권역(수도권 새벽배송, 일반 권역, 제주, 도서산간 등)과 권역별 추가 운임은 어떻게 되나요?',
          '기본 배송비 무료 조건(금액 기준 또는 쿠폰) 달성 시 도서산간 추가 운임도 면제되나요, 별도 부과되나요?',
          '신선식품이나 대형 상품 등 도서산간·특정 권역으로 아예 주문을 받을 수 없는 상품군 규칙이 있나요?',
          '당일 출고 마감 시각(Cutoff)은 몇 시이며, 마감 직전 주문서 진입 후 마감 이후에 결제가 완료되면 어떻게 안내하나요?',
          '결제 완료 후 고객이 배송지를 변경할 때 추가 운임이 발생하는 지역으로의 변경은 어떻게 처리하나요?',
        ],
        example: '예시: 우편번호로 새벽배송·일반택배·도서산간을 판별해 냉동 상품의 도서산간 결제를 사전 차단하고, 기본 무료배송 시에도 도서산간 추가 운임은 별도 표시하며, 오후 3시(서버 시각) 이전 결제 완료 건만 당일 출고로 접수하고 결제 후 권역이 바뀌는 주소 변경은 차단하는 방식을 생각할 수 있습니다. 실제 권역 표와 마감 시각은 물류 계약에 맞게 먼저 확인해야 합니다.',
        relatedDesigns: [
          { id: 'dismissible-inline-banner', reason: '선택한 배송지가 도서산간 추가 운임 대상이거나 당일 출고 마감 시각이 임박·경과했음을 주문서 안에서 안내할 때 참고할 수 있습니다.' },
          { id: 'linked-form-error-summary', reason: '장바구니에 선택 권역으로 보낼 수 없는 상품이 섞여 있거나 상세 주소가 누락되었을 때 오류 요약과 해당 항목을 연결해 보여줄 때 참고할 수 있습니다.' },
        ],
        promptSnippet: '배송지 권역 판별, 도서산간 추가 운임 계산, 당일 출고 마감 시각(Cutoff)과 결제 후 주소 변경 검증 흐름을 설계해 줘. 먼저 배송 권역 구분과 추가 운임 기준, 무료배송 시 추가 운임 면제 여부, 권역별 배송 불가 상품 규칙, 서버 시각 기준 당일 출고 마감 시각과 휴무일 반영 방식, 결제 후 배송지 변경 시 권역 차액 처리 방침을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 우편번호·주소 기반 배송 가능 수단(당일·새벽·일반) 및 도서산간·배송 불가 권역 판별 규칙.\n2. 기본 배송비, 무료배송 혜택, 도서산간 추가 운임의 분리 계산과 표시 방식.\n3. 출고 마감 시각(Cutoff) 및 영업일 캘린더를 반영한 결제 시점 기준 발송 예정일 산출.\n4. 결제 완료 후 배송지 변경 요청 시 권역·운임·배송 가능 여부 재검증 및 차단/정산 처리.\n5. 배송지 입력/선택, 주문서 운임·도착 예정일 안내, 주문 상세의 배송지 변경 화면 연결.\n클라이언트 기기 시각만으로 당일 출고 여부를 확정하지 말고, 예시 정책과 디자인 데모를 실제 우편번호 DB·택배사 권역 연동으로 간주하지 말아 줘.',
      },
      en: {
        domain: 'Logistics, Delivery & Fulfillment',
        title: 'Address zone validation, remote-area surcharges and same-day dispatch cutoffs',
        summary: 'Evaluate shipping eligibility and remote-area surcharges from the delivery address before checkout, and calculate dispatch dates using server-side cutoff times and holiday calendars.',
        overview: 'Whether an order can ship via overnight courier, incurs an island or remote-area surcharge, or cannot be shipped at all (such as frozen goods to multi-day transit zones) depends on the destination address. Discovering an unserviceable address or unpaid surcharge after payment creates manual holds and cancellations. Validate zones, surcharges and daily dispatch cutoffs during checkout—and re-validate them whenever a recipient edits their address before dispatch. These concepts are design references rather than a fixed carrier tariff table.',
        concepts: [
          { name: 'Address normalization and zone eligibility lookup', description: 'Map postal codes and street addresses to delivery zones (such as metro overnight, standard mainland, island or remote area) to determine available shipping methods.' },
          { name: 'Remote-area surcharges and item-level shipping restrictions', description: 'Separate remote-area surcharges from base shipping fees, and block checkout early when cart items (such as perishables or oversized freight) are restricted from the selected zone.' },
          { name: 'Daily dispatch cutoff times and business-day calendars', description: 'Evaluate order placement timestamps against the warehouse time zone, daily cutoff hour and carrier non-operating days to promise accurate dispatch dates.' },
          { name: 'Post-checkout address edit re-validation', description: 'Re-run zone eligibility and surcharge checks when a customer attempts to change the delivery address on an existing order before fulfillment.' },
        ],
        workflow: [
          { name: 'Check zone eligibility and restricted items as the address is selected', description: 'Immediately surface available delivery tiers, remote-area status and any unshippable cart items when the user selects or enters an address.' },
          { name: 'Calculate base shipping fees separately from zone surcharges', description: 'Display base shipping, free-shipping threshold discounts and remote-area surcharges as distinct line items according to store policy.' },
          { name: 'Lock dispatch promises against server time at payment completion', description: 'Refresh the estimated dispatch date if a shopper crosses the daily cutoff time while on the checkout page, and record the promised date using the server payment timestamp.' },
          { name: 'Validate zone compatibility on post-purchase address changes', description: 'Allow self-service address edits only when the new address remains in a compatible zone and fee tier, or route surcharge changes through payment adjustment.' },
        ],
        pitfalls: [
          { name: 'Zeroing out remote-area surcharges unintentionally when a free-shipping promo applies', description: 'Unless policy explicitly waives remote surcharges, free base shipping should not silently erase island or remote-area carrier fees.' },
          { name: 'Skipping zone and surcharge validation on post-checkout address edits', description: 'Letting a buyer pay with a standard metro address and then edit the destination to a remote island before picking bypasses both surcharges and item restrictions.' },
          { name: 'Using the browser’s local clock to promise same-day dispatch', description: 'Client clocks can be skewed or stale; always compute cutoff countdowns and final dispatch promises against authoritative warehouse server time.' },
        ],
        questions: [
          'How are delivery zones categorized, and which postal codes or regions incur remote-area surcharges?',
          'When an order qualifies for free base shipping, is the remote-area surcharge still charged separately?',
          'Which product categories (such as cold-chain or oversized items) are blocked from remote or multi-day transit zones?',
          'What is the daily same-day dispatch cutoff time, and what happens if payment completes just after the cutoff?',
          'Can customers change their delivery address after payment if the new address is in a different surcharge zone?',
        ],
        example: 'Example: a store could map postal codes to overnight, standard and island/remote zones, block frozen items from island zones at checkout, keep remote surcharges separate from free base shipping, use a 3:00 PM server-time cutoff for same-day dispatch, and block post-purchase address edits that change the surcharge tier. Confirm carrier zone tables and cutoff hours first.',
        relatedDesigns: [
          { id: 'dismissible-inline-banner', reason: 'A reference for notifying shoppers inline when their selected address incurs a remote-area surcharge or when the same-day dispatch cutoff has passed.' },
          { id: 'linked-form-error-summary', reason: 'A reference for listing cart items that cannot be shipped to the selected zone and linking directly to the affected items or address fields.' },
        ],
        promptSnippet: 'Help design shipping address zone validation, remote-area surcharge calculation, same-day dispatch cutoffs and post-purchase address-edit checks. First confirm zone tiers and surcharge rules, whether free-shipping thresholds waive remote surcharges, item-level zone restrictions, server-time dispatch cutoffs and holiday calendars, and rules for post-checkout address changes. Do not assume undecided rules.\nBased on the answers, describe:\n1. Postal-code/zone mapping for delivery methods (overnight, standard) and remote/unserviceable areas.\n2. Fee calculation separating base shipping, free-shipping promotions and remote-area surcharges.\n3. Server-time cutoff evaluation and business-day calculation at checkout and payment completion.\n4. Re-validation rules when a customer edits a shipping address after payment.\n5. How address selection, checkout fee/date summaries and post-purchase address edit views connect.\nDo not rely on client device clocks for cutoff promises, and do not mistake example policies or design demos for real postal database or carrier rate integrations.',
      },
    },
    sources: [
      { title: 'Shopify Help Center — Setting up shipping zones and rates', url: 'https://help.shopify.com/en/manual/shipping/setting-up-and-managing-your-shipping/shipping-zones' },
      { title: 'Google Merchant Center Help — Set up shipping settings and cutoff times', url: 'https://support.google.com/merchants/answer/6069284' },
    ],
  },
  {
    id: 'logistics-cold-chain-damage-claim-and-redelivery',
    aliases: {
      ko: ['파손 오배송 사고 접수', '신선식품 변질 클레임', '재발송과 환불 분리', '배송 사고 증빙 사진', '택배 파손 배상'],
      en: ['damaged parcel claim', 'cold-chain spoilage claim', 'reshipment versus refund', 'delivery damage evidence', 'carrier claim attribution'],
    },
    useCases: {
      ko: [
        '상품 파손·누락·오배송·신선식품 해동 사고를 수령 후 기한 내에 사진 증빙과 함께 접수할 때',
        '부패·파손 상품은 회수 없이 현장 폐기로 종결할지 택배사 회수를 진행할지 구분할 때',
        '고객 보상을 대체 상품 재발송(0원 재출고)으로 처리할지 결제 금액 부분/전체 환불로 처리할지 나눌 때',
        '고객 대상 선처리(재발송·환불)와 택배사·창고·공급사 대상 구상/귀책 정산을 분리해 관리할 때',
      ],
      en: [
        'Accepting damaged, missing, wrong-item or thawed cold-chain claims with photo evidence within a claim window',
        'Deciding whether spoiled or shattered items are disposed of on-site without return pickup versus collected for inspection',
        'Separating replacement reshipment orders from partial or full monetary refunds so inventory and accounting stay accurate',
        'Decoupling fast customer resolution from downstream carrier or warehouse liability claims',
      ],
    },
    keywords: {
      ko: ['배송 사고', '파손 접수', '오배송', '콜드체인', '신선식품 변질', '증빙 사진', '재발송', '회수 면제 폐기', '귀책 구분', '부분 배상'],
      en: ['shipping damage', 'cold chain spoilage', 'wrong item delivered', 'missing item claim', 'photo evidence', 'replacement reshipment', 'returnless disposal', 'liability attribution', 'partial refund'],
    },
    text: {
      ko: {
        domain: '물류·배달·풀필먼트',
        title: '온도 민감·파손 사고 접수·증빙 확인과 재발송·배상 분리',
        summary: '수령 후 파손·변질·오배송을 증빙과 함께 접수하고, 회수 여부(현장 폐기 vs 수거)와 보상 방식(재발송 vs 환불) 및 귀책 정산을 분리합니다.',
        overview: '유리 용기 파손이나 냉장·냉동 식품의 해동·변질 사고는 일반 단순 변심 반품과 똑같은 회수 절차로 처리할 수 없습니다. 깨진 유리나 상한 식품을 다시 택배로 수거하면 안전 사고와 2차 오염이 발생하므로 사진 증빙으로 확인 후 회수 없이 폐기 안내를 해야 하며, 재발송(실물 재고 차감, 결제 추가 없음)과 환불(결제 취소, 재출고 없음)을 명확히 구분해야 원장과 재고가 어긋나지 않습니다. 아래 개념은 배송 사고·클레임 설계를 위한 참고이며 특정 배상 약관을 고정하지 않습니다.',
        concepts: [
          { name: '사고 유형(파손·변질·오배송·누락)과 접수 기한·증빙 요건', description: '배송 완료 시각 기준 접수 가능 기한(예: 신선식품 24시간, 일반 파손 7일)을 두고, 외박스 송장·완충재 상태·파손/해동 상품 사진 등 필수 증빙을 정의합니다.' },
          { name: '회수 면제(현장 폐기)와 실물 회수 대상 분리', description: '변질된 식품이나 위험한 파손품은 수거 지시를 생성하지 않고 폐기 안내로 종결하며, 오배송된 정상 고가 상품은 회수 송장을 발행해 수거합니다.' },
          { name: '재발송(Replacement)과 환불(Refund) 원장·재고 분리', description: '대체 상품 재발송은 원결제를 유지한 채 0원 대체 출고 지시를 만들어 재고를 차감하고, 재고 품절이나 고객 희망 시에는 해당 품목만 부분 환불로 전환합니다.' },
          { name: '고객 선조치와 귀책 주체(창고·택배사·공급사) 사후 정산 분리', description: '고객에게는 증빙 확인 즉시 재발송이나 환불을 먼저 진행하고, 포장 불량·배송 지연·상품 하자 등 귀책 판정과 운송사 배상 청구는 별도 운영 상태로 추적합니다.' },
        ],
        workflow: [
          { name: '사고 품목·수량 선택 및 증빙 사진 접수하기', description: '주문 상품 중 문제가 생긴 품목과 수량, 사고 유형을 선택받고, 안내된 필수 사진(운송장 부착 상자, 내부 상태, 상품 파손 부위)을 등록받습니다.' },
          { name: '접수 기한·증빙 확인 및 회수 필요 여부 판정하기', description: '배송 완료 시각 대비 접수 기한과 사진을 검토해 회수 면제(자체 폐기) 대상인지, 회수 수거 및 오배송 맞교환 대상인지 결정합니다.' },
          { name: '재발송 출고 지시 생성 또는 부분 환불 실행하기', description: '고객이 선택한 보상 방식과 현재 가용 재고를 확인해 대체 출고 지시를 내리거나, 품절 시 환불로 전환해 안내합니다.' },
          { name: '귀책 사유 기록 및 운송사·창고 클레임 정산 마감하기', description: '보냉제 누락, 상자 파손, 배송 지연 등 원인을 분류해 내부 손실 또는 택배사 배상 청구 건으로 집계하고 종결합니다.' },
        ],
        pitfalls: [
          { name: '변질·파손 상품 클레임에 일반 반품과 똑같이 자동 수거 지시를 내리기', description: '상한 식품이나 깨진 유리병에 자동 회수 송장이 나가면 택배 기사와 마찰이 생기고 불필요한 회수 운임까지 이중으로 발생합니다.' },
          { name: '재발송을 별도 출고 지시 없이 수기 메모로만 보내 가용 재고를 차감하지 않기', description: '전산 출고 지시 없이 창고에서 물건을 꺼내 보내면 전산 재고와 실물 재고가 어긋나 다음 주문에서 품절 사고가 납니다.' },
          { name: '택배사와의 과실 비율 확인이 끝날 때까지 고객 재발송·환불을 보류하기', description: '운송사 사고 심사는 수일~수주가 걸릴 수 있으므로 고객 보상 상태와 내부 구상 청구 상태를 하나의 단계로 묶으면 고객 경험이 크게 나빠집니다.' },
        ],
        questions: [
          '신선식품 변질·해동과 일반 상품 파손·오배송의 수령 후 접수 가능 기한은 각각 얼마인가요?',
          '사고 접수 시 고객이 반드시 첨부해야 하는 사진 기준(외박스, 운송장, 상품 상태 등)은 무엇인가요?',
          '어떤 경우에 실물 회수 없이 자체 폐기(회수 면제)로 처리하고, 어떤 경우에 반드시 회수 수거를 진행하나요?',
          '고객이 재발송을 원하지만 해당 상품 재고가 품절되었을 때는 어떻게 처리하고 안내하나요?',
          '고객에게 재발송·환불을 완료한 뒤 창고·택배사·입점사 중 귀책 주체와 배상 금액은 어떤 절차로 확정하나요?',
        ],
        example: '예시: 냉장·냉동 상품은 배송 완료 후 24시간 이내에 외박스와 상품 사진 2장 이상을 첨부해 접수하면 회수 없이 폐기 안내 후 즉시 재발송(품절 시 환불) 처리하고, 택배사 지연으로 인한 해동 건은 별도 운송사 배상 청구 목록으로 넘기는 방식을 생각할 수 있습니다. 실제 접수 기한과 회수 면제 범위는 취급 상품에 맞게 먼저 확인해야 합니다.',
        relatedDesigns: [
          { id: 'native-file-attachment', reason: '파손·해동 클레임 접수 시 외박스 송장 사진과 상품 상태 사진을 여러 장 첨부하고 누락 여부를 확인하는 UI에 참고할 수 있습니다.' },
          { id: 'ly-activity-timeline', reason: '클레임 접수, 증빙 확인 완료, 회수 면제/폐기 안내, 대체 상품 재출고 또는 환불 완료까지의 처리 단계를 표시할 때 참고할 수 있습니다.' },
        ],
        promptSnippet: '온도 민감(콜드체인) 변질 및 배송 중 파손·오배송·누락 사고의 접수, 증빙 확인, 재발송·환불 분리와 귀책 정산 흐름을 설계해 줘. 먼저 상품 유형별 접수 기한과 필수 증빙 사진 기준, 회수 면제(자체 폐기)와 실물 회수 구분 조건, 재발송 신청 시 품절 대응 규칙, 고객 선처리와 내부/운송사 귀책 정산 분리 방식을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 파손·변질·오배송·누락 유형별 접수 기한 검증과 필수 증빙 항목.\n2. 회수 면제(폐기 안내)와 실물 회수(수거 송장 발행) 분기 조건.\n3. 대체 상품 재발송(원결제 유지·재고 차감 출고 지시)과 부분/전체 환불(결제 취소)의 원장·재고 분리 처리.\n4. 고객 보상 완료 상태와 창고·택배사·공급사 귀책/구상 정산 상태의 독립적 추적.\n5. 사고 접수 및 사진 첨부, 보상 방식(재발송/환불) 선택, 처리 현황 조회, 운영자 검수 화면의 연결.\n파손·변질 식품에 무조건 자동 수거 지시를 내리거나 전산 출고 없이 수기 재발송하는 방식을 가정하지 말고, 예시 정책과 디자인 데모를 실제 택배사 배상 연동으로 간주하지 말아 줘.',
      },
      en: {
        domain: 'Logistics, Delivery & Fulfillment',
        title: 'Temperature-sensitive or damaged-parcel claims, evidence checks and reshipment versus compensation',
        summary: 'Accept post-delivery damage, spoilage or wrong-item claims with photo evidence, separate returnless disposal from pickup, and decouple replacement shipments from refunds and carrier liability.',
        overview: 'Shattered glass or thawed cold-chain groceries cannot follow the same return flow as a normal change-of-mind return. Booking a reverse pickup for spoiled food or broken glass wastes return freight and creates safety hazards, while shipping a replacement manually without a fulfillment order corrupts warehouse stock counts. Separate returnless disposal from physical recovery, distinguish replacement shipments from monetary refunds, and decouple fast customer resolution from slow carrier claim settlement. These concepts are design references, not a fixed legal warranty policy.',
        concepts: [
          { name: 'Claim types, reporting windows and photo evidence requirements', description: 'Define post-delivery reporting windows by item category (such as 24 hours for perishables vs 7 days for hard goods) and specify required photos (shipping label on outer box, inner cushioning and damaged item).' },
          { name: 'Returnless disposal versus physical reverse pickup', description: 'Skip reverse carrier booking for spoiled perishables or hazardous broken items by instructing the recipient to dispose of them, while scheduling pickup for intact wrong items or high-value goods.' },
          { name: 'Replacement reshipment versus monetary refund separation', description: 'Model a replacement as a zero-charge fulfillment order that deducts physical inventory while keeping the original payment intact, and fall back to a line-item refund if replacement stock is unavailable.' },
          { name: 'Decoupling customer resolution from carrier or warehouse liability', description: 'Resolve the customer’s replacement or refund as soon as evidence is verified, while tracking root cause (packing fault, carrier delay, vendor defect) and carrier reimbursement on a separate operational lifecycle.' },
        ],
        workflow: [
          { name: 'Select affected line items, quantities and upload evidence', description: 'Let the recipient pick the exact damaged, thawed, missing or wrong items and attach guided photos of the outer box, label and product condition.' },
          { name: 'Validate claim window and decide returnless disposal versus pickup', description: 'Verify the claim falls within the post-delivery window and route spoiled/broken items to returnless disposal while issuing pickup labels for recoverable goods.' },
          { name: 'Create a replacement fulfillment order or issue a line-item refund', description: 'Check live inventory for the requested replacement; either release a replacement shipment with new tracking or convert to a refund if out of stock.' },
          { name: 'Record fault attribution and settle carrier or vendor claims', description: 'Tag the root cause (missing ice packs, crushed carton, transit delay) and track carrier claim filing and payout separately from the closed customer ticket.' },
        ],
        pitfalls: [
          { name: 'Automatically booking reverse carrier pickups for spoiled food or broken glass', description: 'Sending a courier to collect leaking perishables or shattered glass incurs unnecessary return fees and carrier rejection.' },
          { name: 'Sending replacement items off-the-books without creating a fulfillment order', description: 'Shipping a replacement via ad-hoc manual notes leaves system inventory inflated, causing future orders to oversell.' },
          { name: 'Blocking customer refunds or reshipments until the carrier settles liability', description: 'Carrier damage investigations can take weeks; tying customer resolution directly to carrier payout state stalls customer support.' },
        ],
        questions: [
          'What are the post-delivery claim reporting windows for temperature-sensitive items versus standard merchandise?',
          'Which specific photos (outer box, shipping label, coolant state, damaged product) are required to submit a claim?',
          'Which claim categories qualify for returnless disposal versus requiring physical return pickup?',
          'When a customer requests a replacement reshipment but the item is now out of stock, how does the flow switch to a refund?',
          'How are fault attribution (warehouse packing vs carrier transit vs supplier defect) and carrier claims tracked after the customer is made whole?',
        ],
        example: 'Example: cold-chain claims submitted within 24 hours of delivery with photos of the shipping label and thawed item could trigger returnless disposal instructions and an immediate replacement order (or automatic refund if out of stock), while logging a separate carrier claim ticket when transit time exceeded the cold-pack window. Confirm reporting deadlines and disposal thresholds first.',
        relatedDesigns: [
          { id: 'native-file-attachment', reason: 'A reference for uploading and previewing required photos of the shipping box, label and damaged or thawed merchandise.' },
          { id: 'ly-activity-timeline', reason: 'A reference for showing the customer the progression from claim submission and evidence review to disposal guidance and replacement tracking or refund.' },
        ],
        promptSnippet: 'Help design a post-delivery claim workflow for temperature-sensitive spoilage, transit damage, missing items and wrong items. First confirm claim reporting windows by product type, required photo evidence, rules separating returnless disposal from physical pickup, fallback behavior when replacement stock is unavailable, and how customer resolution is separated from carrier/warehouse liability tracking. Do not assume undecided rules.\nBased on the answers, describe:\n1. Claim eligibility checks by delivery timestamp, item category and required photo attachments.\n2. Routing rules between returnless on-site disposal and reverse carrier pickup.\n3. Inventory and ledger separation between a zero-charge replacement fulfillment order and a line-item refund.\n4. Independent operational tracking for fault attribution and carrier reimbursement claims.\n5. How the customer claim form, resolution selector, status timeline and operator review console connect.\nDo not auto-schedule reverse pickups for spoiled perishables or broken glass, and do not mistake example policies or design demos for real WMS or carrier claim integrations.',
      },
    },
    sources: [
      { title: 'UPS — File a Shipping Claim and Photo Documentation Requirements', url: 'https://www.ups.com/us/en/support/file-a-claim.page' },
      { title: 'FedEx — Cold Chain and Perishable Shipping Guidelines', url: 'https://www.fedex.com/en-us/shipping/how-to-ship-perishables.html' },
    ],
  },
  {
    id: 'logistics-return-reverse-pickup-and-restock',
    aliases: {
      ko: ['반품 수거 송장', '회수 물류 트래킹', '반품 입고 검수', '양품 불량 재고 분리', '반품 배송비 차감'],
      en: ['reverse logistics return', 'return pickup tracking', 'warehouse return grading', 'restock versus quarantine inventory', 'return shipping fee deduction'],
    },
    useCases: {
      ko: [
        '택배사 자동 수거 접수와 고객 직접 발송(편의점·타 택배) 중 반품 회수 방식을 선택할 때',
        '수거 지시 후 집하 지연이나 반품 철회 요청을 처리하고 회수 송장 상태를 추적할 때',
        '창고 입고 후 검수 등급(양품 재입고·리퍼/검수 대기·불량 폐기)에 따라 가용 재고 반영을 분리할 때',
        '단순 변심과 판매자 귀책에 따라 왕복/편도 반품 배송비를 환불 금액에서 차감할지 정할 때',
      ],
      en: [
        'Supporting both automated carrier home pickup and customer drop-off or self-ship return methods',
        'Tracking reverse pickup progress, handling stalled pickups and allowing customers to withdraw a return before handoff',
        'Grading returned items at the warehouse into sellable restock, quarantine/refurbish or defective scrap buckets',
        'Calculating return shipping fee deductions based on return reason (buyer remorse vs merchant fault) and free-shipping thresholds',
      ],
    },
    keywords: {
      ko: ['역물류', '반품 회수', '회수 송장', '수거 지연', '입고 검수', '양품 재입고', '불량 격리', '반품 배송비', '반품 철회'],
      en: ['reverse logistics', 'return label', 'return pickup', 'pickup delay', 'warehouse grading', 'restock inventory', 'quarantine stock', 'return shipping fee', 'return withdrawal'],
    },
    text: {
      ko: {
        domain: '물류·배달·풀필먼트',
        title: '회수 송장 발행·수거 지연·창고 입고 검수와 양품/불량 재고 분리',
        summary: '반품 수거 방식과 회수 송장을 추적하고, 창고 입고 시 검수 등급에 따라 판매 가능 재고와 격리 재고를 분리한 뒤 배송비를 정산합니다.',
        overview: '반품(역물류)은 일반 출고의 단순 역순이 아닙니다. 고객이 집 앞에 내놓은 상품이 며칠째 수거되지 않거나 고객이 마음을 바꿔 반품을 철회하기도 하고, 창고에 도착한 반품 상자 안에 구성품이 빠져 있거나 사용 흔적이 있어 바로 새 상품으로 팔 수 없는 경우도 많습니다. 반품 접수 시점에 가용 재고를 바로 늘리지 않고 입고 검수 후 양품만 판매 재고로 편입하며, 반품 사유에 따른 회수 운임 정산을 함께 설계해야 합니다. 아래 개념은 역물류·검수 설계를 위한 참고이며 특정 택배사 반품 규격을 강제하지 않습니다.',
        concepts: [
          { name: '회수 방식(자동 수거 vs 직접 발송)과 수거 상태 추적', description: '지정 택배사 자동 수거 지시와 고객 직접 발송(운송장 번호 직접 입력)을 구분하고, 수거 지시·집하 완료·수거 지연·반품 철회·창고 도착 상태를 추적합니다.' },
          { name: '창고 입고 검수(Grading)와 양품·격리 재고 분리', description: '반품 도착 즉시 판매 가능 재고(Sellable)를 늘리지 않고, 검수 후 정상 양품만 가용 재고로 편입하며 개봉·훼손·불량품은 격리(Quarantine/불량) 로케이션으로 분리합니다.' },
          { name: '귀책 사유별 반품 운임(편도·왕복) 정산 규칙', description: '단순 변심인지 상품 불량·오배송인지에 따라 반품 배송비 부담 주체를 정하고, 부분 반품으로 인해 최초 무료배송 기준 금액이 깨질 때 초기 배송비까지 차감할지 계산합니다.' },
          { name: '검수 보류(구성품 누락·훼손) 안내와 환불 확정 시점', description: '집하 완료 시 선환불할지 창고 검수 완료 후 환불할지 정하고, 사은품 누락이나 상품 가치가 훼손된 경우 검수 보류 상태로 두고 고객에게 안내합니다.' },
        ],
        workflow: [
          { name: '반품 사유·회수 방법 선택 및 예상 환불액 안내하기', description: '반품할 품목·수량·사유와 수거 방법을 선택받고, 차감될 예상 반품 배송비와 최종 환불 예정 금액을 미리 보여줍니다.' },
          { name: '회수 송장 발행 및 수거 지연·반품 철회 처리하기', description: '택배사에 수거 지시를 내리거나 고객에게 반송지 주소와 송장 입력란을 안내하고, 집하 전이라면 반품 철회를 허용하며 수거 지연 시 재접수를 지원합니다.' },
          { name: '창고 반품 입고 스캔 및 상태 등급 검수하기', description: '도착한 반품 송장을 스캔해 주문과 대조한 뒤, 미개봉 양품·구성품 누락·파손 여부를 판정해 각각 판매 가능 재고와 격리 재고로 이동시킵니다.' },
          { name: '검수 결과 확정 및 배송비 차감 후 환불 실행하기', description: '검수 중 사유 변경(예: 불량 접수였으나 단순 변심 확인, 또는 그 반대)이 있으면 반품 운임을 재계산하고, 이상이 없으면 환불을 확정합니다.' },
        ],
        pitfalls: [
          { name: '반품 접수나 수거 완료 시점에 즉시 판매 가능 재고( 가용 재고 )를 다시 늘리기', description: '창고에서 상품 상태를 확인하기도 전에 재고를 풀어버리면 훼손되거나 빈 상자로 돌아온 상품이 다른 고객에게 다시 판매되는 사고가 발생합니다.' },
          { name: '불량 반품 물품을 일반 양품 보관 로케이션에 그대로 섞어 넣기', description: '검수 대기나 불량 판정 재고를 물리적·전산적으로 격리된 로케이션에 두지 않으면 다음 피킹 작업자가 불량품을 그대로 집어 출고하게 됩니다.' },
          { name: '고객이 이미 택배 기사에게 물건을 전달한 뒤에도 전산상 즉시 반품 철회를 허용하기', description: '집하 스캔이 늦어지는 동안 고객이 반품 철회를 누르면 물건은 창고로 오는데 주문은 정상 구매 완료로 남아 재고와 정산이 꼬입니다.' },
        ],
        questions: [
          '반품 수거는 지정 택배사 자동 수거만 지원하나요, 고객이 편의점이나 타 택배로 직접 보내고 송장을 입력하는 방식도 지원하나요?',
          '환불 실행 시점은 택배 기사 집하 완료 시점인가요, 창고 입고 및 검수 완료 시점인가요?',
          '단순 변심 부분 반품으로 인해 남은 구매 금액이 무료배송 기준 미만이 될 때 초기 배송비도 함께 차감하나요?',
          '창고 검수 결과 구성품·사은품이 빠졌거나 상품이 훼손되었을 때 어떤 상태(검수 보류·반송·차감 환불)로 처리하나요?',
          '검수 완료된 반품 상품은 어떤 등급(즉시 재판매 양품, 리퍼/재포장 대기, 불량 폐기)으로 재고가 나뉘나요?',
        ],
        example: '예시: 지정 택배 자동 수거를 기본으로 하되 집하 전까지만 반품 철회를 허용하고, 창고 입고 후 양품(A등급) 판정 시에만 판매 가능 재고로 편입하며, 단순 변심으로 무료배송 기준이 깨지면 왕복 배송비를 환불액에서 차감하고 구성품 누락 시 검수 보류 알림을 보내는 방식을 생각할 수 있습니다. 실제 선환불 여부와 배송비 차감 규정은 쇼핑몰 정책에 맞게 먼저 확인해야 합니다.',
        relatedDesigns: [
          { id: 'ly-activity-timeline', reason: '반품 접수, 수거 지시, 기사 집하 완료, 창고 입고, 검수 중/보류, 환불 완료로 이어지는 역물류 진행 단계를 보여줄 때 참고할 수 있습니다.' },
          { id: 'ly-expandable-data-rows', reason: '창고 반품 검수 목록에서 반품 건을 펼쳐 품목별 신청 사유, 검수 등급(양품/격리/불량), 구성품 확인 내역과 배송비 차감액을 확인할 때 참고할 수 있습니다.' },
        ],
        promptSnippet: '반품 회수 송장 발행, 수거 지연·철회 처리, 창고 입고 검수(Grading)와 양품/불량 재고 분리 및 환불 정산 흐름을 설계해 줘. 먼저 자동 수거 및 직접 발송 지원 여부, 반품 철회 가능 시점과 수거 지연 대응, 창고 입고 검수 등급과 판매 가능 재고 반영 시점, 사유별 반품 배송비(편도/왕복) 차감 규칙, 구성품 누락·훼손 시 검수 보류 절차를 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 반품 접수·수거 지시·집하 완료·수거 지연·반품 철회·창고 입고·검수 완료/보류 상태 전이.\n2. 창고 검수 전 대기 재고와 검수 후 양품(판매 가능)·리퍼 대기·불량 폐기 재고의 분리 규칙.\n3. 귀책 사유 및 무료배송 기준 변동에 따른 반품 운임 계산과 환불 차감 방식.\n4. 구성품 누락·상품 훼손·사유 불일치 발견 시 검수 보류 안내 및 후속 처리 흐름.\n5. 반품 신청 및 예상 환불액 확인, 회수 추적/철회 화면, 창고 입고 검수 화면의 연결.\n반품 신청이나 집하만으로 실물 검수 없이 판매 가능 재고를 즉시 증가시키지 말고, 예시 정책과 디자인 데모를 실제 택배사 반품 연동으로 간주하지 말아 줘.',
      },
      en: {
        domain: 'Logistics, Delivery & Fulfillment',
        title: 'Reverse-logistics return labels, pickup tracking, warehouse grading and restock separation',
        summary: 'Track carrier return pickups or drop-offs, grade returned items at the warehouse before restocking sellable inventory, and settle return shipping fees by fault reason.',
        overview: 'Reverse logistics is more complex than outbound shipping in reverse. Return pickups can stall, buyers may change their mind and cancel the return before handoff, and returned parcels often arrive opened, missing accessories or damaged. Never add returned units back to sellable stock upon return request; wait until warehouse receiving grades the item into sellable restock versus quarantine, and calculate return shipping fee deductions accurately. These concepts are design references, not a fixed carrier return contract.',
        concepts: [
          { name: 'Automated carrier pickup versus customer drop-off tracking', description: 'Support scheduled carrier pickups alongside customer drop-off or self-ship tracking numbers, and manage states across pickup requested, picked up, delayed, withdrawn and received at warehouse.' },
          { name: 'Warehouse receiving inspection (Grading) and quarantine stock', description: 'Keep returned units out of sellable stock until inspected, then route graded items into sellable inventory, refurbishment/repack quarantine or defective scrap locations.' },
          { name: 'Fault-based return shipping fee calculation', description: 'Waive return shipping fees for merchant fault (defective or wrong item) while deducting one-way or round-trip shipping fees for buyer-remorse returns that break free-shipping thresholds.' },
          { name: 'Inspection holds for missing accessories or condition mismatches', description: 'Place a return on inspection hold when gifts, accessories or tags are missing or when a buyer-remorse item was claimed as defective, and notify the customer before finalizing the refund.' },
        ],
        workflow: [
          { name: 'Select return items, reason, pickup method and preview net refund', description: 'Collect item quantities, return reasons and pickup/drop-off preferences while showing estimated return shipping deductions and net refund amounts.' },
          { name: 'Issue return labels, monitor stalled pickups and handle withdrawals', description: 'Dispatch carrier pickup requests or provide drop-off labels, allow return withdrawal only before carrier custody, and support re-booking if pickup stalls.' },
          { name: 'Scan inbound returns at the warehouse and grade item condition', description: 'Match the inbound parcel to the return order, inspect item condition and accessories, and move units into sellable restock or quarantined locations accordingly.' },
          { name: 'Reconcile fee adjustments, resolve holds and finalize refund', description: 'Recalculate return shipping fees if the verified condition contradicts the claimed reason, resolve any missing-item holds, and trigger the final refund.' },
        ],
        pitfalls: [
          { name: 'Incrementing sellable inventory as soon as a return is requested or scanned by the courier', description: 'Restocking before physical warehouse inspection causes opened, damaged or swapped items to be sold to the next buyer.' },
          { name: 'Placing uninspected or defective returns into active pick bins', description: 'Without logical and physical quarantine locations, warehouse pickers will accidentally pull defective returns to fulfill new orders.' },
          { name: 'Allowing instant return withdrawal after the parcel is already handed to the courier', description: 'If carrier scan sync lags and the buyer cancels the return in the app after handing over the box, the warehouse receives an unlinked parcel.' },
        ],
        questions: [
          'Are returns collected via automated carrier pickup, customer parcel drop-off, or self-shipped tracking entry?',
          'Is the refund triggered on first carrier scan (early refund) or only after warehouse receiving and grading?',
          'When a partial buyer-remorse return drops the kept order below the free-shipping threshold, is the initial outbound shipping fee also deducted?',
          'What happens during warehouse grading if promotional gifts or accessories are missing or the item shows heavy wear?',
          'Into which inventory buckets (sellable restock, repack quarantine, defective scrap) are inspected returns routed?',
        ],
        example: 'Example: a store might book automated carrier pickups, allow return withdrawal only prior to pickup scan, hold returned stock in a receiving buffer until graded as Grade-A sellable vs quarantine, deduct round-trip shipping when a remorse return breaks the free-shipping threshold, and place an inspection hold if accessories are missing. Confirm refund timing and fee deduction rules first.',
        relatedDesigns: [
          { id: 'ly-activity-timeline', reason: 'A reference for tracking the reverse-logistics journey from return request and carrier pickup through warehouse inspection and refund completion.' },
          { id: 'ly-expandable-data-rows', reason: 'A reference for expanding an inbound return row in the warehouse console to record per-item grading results, missing accessories and fee adjustments.' },
        ],
        promptSnippet: 'Help design reverse-logistics return label issuance, pickup tracking, warehouse receiving grading, restock separation and return-fee settlement. First confirm supported pickup/drop-off methods, return withdrawal cutoffs and stalled-pickup handling, warehouse grading buckets and when sellable stock increments, return shipping fee deduction rules by reason, and inspection-hold procedures for missing parts or damage. Do not assume undecided rules.\nBased on the answers, describe:\n1. State transitions across return requested, pickup scheduled, in transit, pickup delayed, withdrawn, received, inspection hold and completed.\n2. Inventory separation between inbound receiving buffers, sellable restock, repack quarantine and defective scrap.\n3. Return shipping fee calculation across merchant fault, buyer remorse and broken free-shipping thresholds.\n4. Handling inspection mismatches (missing accessories, false defect claims) before releasing the final refund.\n5. How the customer return portal, pickup tracker and warehouse grading console connect.\nDo not add returned items back to sellable inventory before physical grading, and do not mistake example policies or design demos for real carrier or WMS integrations.',
      },
    },
    sources: [
      { title: 'Shopify Help Center — Creating and processing returns and restocking', url: 'https://help.shopify.com/en/manual/orders/manage-returns' },
      { title: 'NIST / APICS Supply Chain — Reverse Logistics and Quarantine Inventory Practices', url: 'https://www.ascm.org/learning-development/certifications-credentials/cpim/' },
    ],
  },
];
