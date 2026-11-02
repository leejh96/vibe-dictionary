import type { DomainKnowledge } from '../domain-knowledge';

export const COMMERCE_KNOWLEDGE: DomainKnowledge[] = [{
  id: 'commerce-order-inventory-and-refund',
  aliases: {
    ko: ['쇼핑몰', '온라인 스토어', '이커머스', '장바구니 결제', '주문 관리', '취소 환불'],
    en: ['online store', 'ecommerce store', 'shopping cart checkout', 'order management', 'refund workflow'],
  },
  useCases: {
    ko: ['장바구니·주문·결제가 있는 쇼핑몰을 만들 때', '재고 확인·차감·품절 복구 시점을 정할 때', '결제 승인과 출고·배송 상태를 구분할 때', '주문 취소·반품·부분 환불 규칙을 설계할 때'],
    en: ['Building an online store with cart, checkout and orders', 'Deciding when inventory is checked, reserved, deducted and restored', 'Separating payment authorization from fulfillment and shipping states', 'Designing order cancellation, return and partial-refund rules'],
  },
  keywords: {
    ko: ['커머스', '쇼핑몰', '주문', '장바구니', '재고', '재고 차감', '품절', '결제', '출고', '배송', '취소', '반품', '환불', '부분 환불', '금액 계산'],
    en: ['commerce', 'ecommerce', 'order', 'cart', 'checkout', 'inventory', 'stock', 'out of stock', 'payment', 'fulfillment', 'shipping', 'cancellation', 'return', 'refund', 'ecommerce refund', 'partial refund'],
  },
  text: {
    ko: {
      domain: '커머스',
      title: '주문·재고·결제와 취소·환불 상태',
      summary: '장바구니 담기와 주문 확정을 구분하고, 재고·결제·배송·환불 상태를 나누어 연결합니다.',
      overview: '상품을 장바구니에 담는 것과 실제 주문이 확정되는 것은 다릅니다. 결제 완료 여부, 재고 확보 시점, 출고·배송 진행, 취소·반품·환불 처리를 하나의 상태값으로 묶으면 부분 취소나 결제 실패 복구가 어려워집니다. 아래 개념은 커머스 흐름을 설계하기 위한 참고이며 특정 상점의 수수료나 교환·환불 규정을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '장바구니와 주문서 고정', description: '장바구니는 수량과 구성을 바꾸는 단계이고, 주문 생성은 결제 대상 품목·수량·가격·할인 조건을 특정 시점 기준으로 고정하는 단계입니다.' },
        { name: '재고 확보와 복구 시점', description: '주문서 작성·결제 시도·결제 완료 중 언제 재고를 차감하거나 선점할지 정합니다. 결제 실패·시간 초과·취소 시 차감한 재고를 언제 복구할지도 함께 정의해야 합니다.' },
        { name: '결제 상태와 주문 상태 분리', description: '결제 대기·승인·실패·환불 같은 결제 상태와 상품 준비·출고·배송 완료 같은 이행 상태를 구분합니다. 결제가 완료되어도 출고 전후에 따라 가능한 취소가 달라집니다.' },
        { name: '취소·반품·교환과 부분 처리', description: '출고 전 주문 취소와 수령 후 반품·교환은 조건과 절차가 다릅니다. 여러 품목 중 일부만 취소하거나 환불할 때 배송비와 할인 금액을 어떻게 다시 계산할지 정해야 합니다.' },
        { name: '금액 구성과 증빙 기록', description: '상품가·할인·배송비·세금·실결제액을 구분해 기록합니다. 상품 가격이 나중에 바뀌어도 이미 접수된 주문의 결제·환불 기준 금액은 보존되어야 합니다.' },
      ],
      workflow: [
        { name: '장바구니에서 주문 조건 검증하기', description: '결제 단계로 넘어갈 때 판매 가능 여부, 최소·최대 구매 수량, 배송 가능 지역과 현재 가격·할인 적용 결과를 확인합니다.' },
        { name: '결제 시도와 재고 처리 연결하기', description: '결제 요청 중 중복 결제를 막고, 승인 성공·실패·지연에 따라 주문 상태와 재고 선점 또는 차감을 일관되게 갱신합니다.' },
        { name: '출고·배송 단계에 맞춰 가능한 행동 안내하기', description: '출고 전에는 즉시 취소 요청이 가능한지, 출고 후에는 반품 접수로 전환되는지 구분해 구매자와 운영자에게 보여 줍니다.' },
        { name: '취소·반품 검수와 환불 결과 연결하기', description: '반품 접수·회수 확인·환불 완료를 구분하고, 환불 금액·차감 배송비·재고 복구 여부를 확정해 안내합니다.' },
      ],
      pitfalls: [
        { name: '장바구니 가격을 그대로 결제 확정으로 믿기', description: '장바구니에 담아 둔 사이 가격·할인·재고가 바뀔 수 있습니다. 주문 생성과 결제 승인 시점에 재검증하고 변경 사항을 알리세요.' },
        { name: '결제·배송·환불을 단일 상태로 덮어쓰기', description: '일부 품목만 환불하거나 배송 중 반품이 접수되면 단일 상태로는 표현하기 어렵습니다. 주문 전체 요약과 품목별 이행·환불 상태를 구분하세요.' },
        { name: '결제 응답 지연이나 중복 클릭을 무시하기', description: '네트워크 지연 시 재시도로 중복 청구가 발생하거나, 결제는 성공했는데 주문 화면만 실패로 보일 수 있습니다. 멱등 처리와 최종 상태 확인 경로를 준비하세요.' },
      ],
      questions: [
        '재고는 주문서 생성·결제 진행·결제 완료 중 언제 선점하거나 차감하며, 미결제 주문은 얼마 뒤 만료하나요?',
        '상품 가격·쿠폰·배송비 조건이 결제 직전에 바뀌면 주문을 차단하나요, 변경된 금액을 다시 확인받나요?',
        '여러 상품을 한 번에 주문할 때 품목별 부분 출고·부분 취소·부분 환불을 허용하나요?',
        '출고 전 취소와 출고 후 반품은 각각 누가 승인하며, 배송비와 할인 금액은 어떻게 정산하나요?',
        '반품 완료 시 재고를 자동으로 판매 가능 수량에 복구하나요, 검수 후 수동 반영하나요?',
        '결제 승인 지연·실패·중복 요청이 발생했을 때 구매자와 운영자에게 어떤 상태와 재시도 방법을 보여 주나요?',
      ],
      example: '예시: 의류 상점에서 결제 완료 시 재고를 차감하고, 출고 전에는 구매자가 직접 취소할 수 있게 두며, 출고 후에는 반품 접수와 회수 검수를 거쳐 환불을 진행하도록 구성할 수 있습니다. 실제 재고 선점 시간·부분 취소 허용 여부·배송비 차감 규칙은 상점 운영 방식에 맞게 먼저 확인해야 합니다.',
      relatedDesigns: [
        { id: 'linked-form-error-summary', reason: '주문서·배송지 입력에서 누락되거나 잘못된 항목을 상단 요약으로 모으고 해당 입력 칸으로 연결하는 표현에 참고할 수 있습니다. 실제 주문 생성과 결제 검증은 별도로 구현해야 합니다.' },
        { id: 'ly-expandable-data-rows', reason: '주문 목록에서 요약 행 아래로 품목·배송·환불 내역을 펼쳐 확인하는 데이터뷰 표현에 참고할 수 있습니다. 실제 주문 조회와 환불 처리는 구현하지 않습니다.' },
      ],
      promptSnippet: '커머스의 장바구니·주문·결제·배송·취소·환불 흐름을 설계해 줘. 먼저 재고 차감·복구 시점, 가격·할인·배송비 계산 기준, 품목별 부분 취소·부분 환불 허용 여부, 출고 전후 취소·반품 정책을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 구매자와 운영자가 각 단계에서 볼 정보와 가능한 행동.\n2. 주문 상태, 결제 상태, 출고·배송 상태, 취소·환불 상태의 구분과 전환 조건.\n3. 품목 가격·할인·배송비·환불 금액의 계산 및 보존 기준.\n4. 품절·결제 실패·응답 지연·중복 요청 시 데이터 최종 상태와 사용자 안내.\n5. 장바구니·주문서·주문 상세·취소/반품 신청 화면과 상태 표시·오류 안내의 연결.\n장바구니 담기를 재고 확보나 결제 완료로 간주하지 말고, 예시 정책과 디자인 데모를 실제 결제·재고 시스템으로 간주하지 말아 줘.',
    },
    en: {
      domain: 'Commerce',
      title: 'Order, inventory, payment and cancellation or refund states',
      summary: 'Separate cart edits from confirmed orders, and connect inventory, payment, fulfillment and refund states.',
      overview: 'Adding an item to a cart is different from confirming an order. Combining payment status, stock reservation, shipping progress and refunds into a single status field makes partial cancellations and payment recovery difficult. These concepts are design references for commerce flows, not default fee, return or refund policies for a specific store.',
      concepts: [
        { name: 'Cart versus order snapshot', description: 'A cart lets buyers adjust items and quantities, while order creation snapshots the items, quantities, prices and discounts to be paid.' },
        { name: 'Inventory reservation and restoration', description: 'Decide whether stock is reserved or deducted at checkout start, payment attempt or payment completion, and when stock returns after failure, timeout or cancellation.' },
        { name: 'Separate payment and fulfillment states', description: 'Distinguish payment states such as pending, authorized, failed and refunded from fulfillment states such as preparing, shipped and delivered.' },
        { name: 'Cancellations, returns and partial handling', description: 'Pre-shipment cancellation and post-delivery returns follow different rules. Define how shipping fees and discounts are recalculated for partial cancellations or refunds.' },
        { name: 'Price breakdown and audit records', description: 'Record item price, discounts, shipping, tax and net paid amounts separately so later catalog price changes do not alter existing order records.' },
      ],
      workflow: [
        { name: 'Validate order terms at checkout', description: 'Check availability, quantity limits, shipping eligibility and current pricing or discounts before starting payment.' },
        { name: 'Coordinate payment attempts and stock', description: 'Prevent duplicate charges during payment requests and update order and stock states consistently across success, failure and delayed confirmation.' },
        { name: 'Match available actions to fulfillment progress', description: 'Show buyers and operators whether an order can be canceled immediately before shipment or must go through a return request afterwards.' },
        { name: 'Connect return inspection to refund outcomes', description: 'Separate return request, item receipt and refund completion, and explain final refund amounts, fee deductions and stock restoration.' },
      ],
      pitfalls: [
        { name: 'Trusting cart prices as final without rechecking', description: 'Prices, promotions or stock can change while items sit in a cart. Revalidate at order creation and payment authorization, and explain any changes.' },
        { name: 'Collapsing payment, shipping and refunds into one status', description: 'Partial refunds or returns during delivery cannot be represented cleanly by a single status. Separate order summary from line-item fulfillment and refund states.' },
        { name: 'Ignoring delayed payment webhooks or duplicate clicks', description: 'Network delays can cause duplicate charges or orders that succeeded in payment but look failed on screen. Plan idempotent handling and status recovery.' },
      ],
      questions: [
        'When is inventory reserved or deducted—at checkout, payment attempt or payment completion—and when do unpaid orders expire?',
        'If item price, coupon eligibility or shipping cost changes right before payment, is checkout blocked or reconfirmed?',
        'For multi-item orders, are partial shipments, partial cancellations and partial refunds allowed per line item?',
        'Who approves pre-shipment cancellations versus post-shipment returns, and how are shipping fees and discounts adjusted?',
        'Does returned stock automatically return to sellable inventory or require manual inspection first?',
        'When payment confirmation is delayed, fails or is submitted twice, what final state and retry path are shown to buyers and operators?',
      ],
      example: 'Example: an apparel store could deduct stock upon payment completion, allow self-service cancellation before shipment, and switch to return requests with inspection after shipment. Confirm actual stock hold durations, partial-refund rules and shipping-fee deductions for the store before adopting this setup.',
      relatedDesigns: [
        { id: 'linked-form-error-summary', reason: 'A reference for summarizing missing or invalid checkout and shipping fields and moving focus to each input. Real order creation and payment verification need separate implementation.' },
        { id: 'ly-expandable-data-rows', reason: 'A reference for expanding an order row to inspect line items, shipping and refund details. It does not implement order retrieval or refund processing.' },
      ],
      promptSnippet: 'Help design a commerce cart, order, payment, fulfillment and refund workflow. First confirm stock deduction and restoration timing, price/discount/shipping calculation rules, partial cancellation or refund support, and pre- versus post-shipment policies. Do not assume undecided rules.\nBased on the answers, describe:\n1. Information and actions available to buyers and operators at each stage.\n2. Distinct order, payment, fulfillment/shipping and cancellation/refund states and transitions.\n3. Calculation and snapshot rules for item prices, discounts, shipping fees and refund amounts.\n4. Final data states and user guidance for stockouts, payment failures, delayed confirmations and duplicate requests.\n5. How cart, checkout, order detail and cancellation/return screens connect to status badges and error summaries.\nDo not treat adding to cart as reserving stock or completing payment, and do not mistake example policies or design demos for real payment or inventory systems.',
    },
  },
  sources: [
    { title: 'Stripe Docs — Payment methods and payment flows', url: 'https://docs.stripe.com/payments/payment-methods/overview' },
    { title: 'Shopify Help Center — Managing orders and refunds', url: 'https://help.shopify.com/en/manual/orders/manage-orders' },
  ],
}, {
  id: 'commerce-coupon-promotion-and-stacking',
  aliases: {
    ko: ['쿠폰 프로모션 설계', '할인 중복 적용 순서', '최소 주문 금액 조건', '부분 취소 시 쿠폰 복원', '장바구니 할인 배분'],
    en: ['coupon and promotion rules', 'discount stacking order', 'minimum order threshold', 'partial cancel coupon restoration', 'line-item discount allocation'],
  },
  useCases: {
    ko: ['즉시 할인·상품 쿠폰·장바구니 쿠폰·배송비 쿠폰의 적용 순서를 정할 때', '최소 주문 금액과 최대 할인 한도 및 제외 상품을 검증할 때', '여러 상품에 적용된 장바구니 쿠폰 할인액을 품목별로 안분할 때', '주문 전체 취소·부분 취소·결제 실패 시 쿠폰 복원 여부를 설계할 때'],
    en: ['Defining application order across item sales, item coupons, cart coupons and shipping discounts', 'Validating minimum order thresholds, maximum discount caps and excluded items', 'Prorating a cart-level discount across individual line items', 'Deciding when coupons are restored after payment failure, full cancellation or partial cancellation'],
  },
  keywords: {
    ko: ['쿠폰', '프로모션', '중복 할인', '적용 순서', '최소 주문 금액', '최대 할인 한도', '할인 안분', '쿠폰 복원', '프로모션 코드'],
    en: ['coupon', 'promotion', 'discount stacking', 'calculation order', 'minimum order amount', 'discount cap', 'discount allocation', 'coupon restoration', 'promo code'],
  },
  text: {
    ko: {
      domain: '커머스',
      title: '쿠폰·프로모션 중복 적용 순서·최소 주문 금액과 부분 취소 복원',
      summary: '할인 적용 순서와 품목별 할인액 안분 기준을 정하고, 부분 취소 시 환불액 재계산과 쿠폰 복원 조건을 연결합니다.',
      overview: '정률 할인(%)과 정액 할인(원), 상품 쿠폰과 장바구니 쿠폰이 함께 쓰일 때는 무엇을 먼저 깎는지에 따라 최종 결제 금액이 달라집니다. 또한 장바구니 전체에 걸린 쿠폰을 품목별로 나누어 기록해 두지 않으면, 나중에 한 품목만 취소했을 때 얼마를 돌려줘야 하는지 계산할 수 없습니다. 아래 내용은 쿠폰·프로모션 설계를 위한 참고이며 특정 상점의 할인율을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '할인 종류와 적용 우선순위', description: '기본 행사가, 상품 단위 쿠폰, 장바구니 쿠폰, 배송비 쿠폰, 적립금 사용의 적용 순서와 중복 가능 조합을 명확히 정의합니다.' },
        { name: '최소 주문 금액·최대 할인액·제외 품목', description: '최소 주문 금액 기준이 할인 전 상품가 합계인지 선행 할인 후 금액인지 정하고, 정률 쿠폰의 최대 할인 한도와 적용 제외 카테고리를 검증합니다.' },
        { name: '장바구니 할인액의 품목별 안분(Allocation)', description: '장바구니 전체 할인액을 각 품목 가격 비율대로 나누어 기록하고, 나누어떨어지지 않는 1원 단위 끝전(잔여 금액)을 어느 품목에 붙일지 정합니다.' },
        { name: '결제 실패·취소·부분 취소 시 쿠폰 복원', description: '결제 실패나 전체 취소 시 사용한 쿠폰을 다시 쓸 수 있게 복원할지, 부분 취소로 최소 주문 금액이 깨질 때 나머지 품목 할인을 유지할지 회수할지 정합니다.' },
      ],
      workflow: [
        { name: '적용 가능 쿠폰 조회와 제외 사유 표시하기', description: '보유 쿠폰 중 현재 주문에 쓸 수 있는 쿠폰과 최소 금액 미달·중복 불가·유효기간 만료로 선택할 수 없는 이유를 구분해 보여 줍니다.' },
        { name: '합의된 순서로 할인액과 끝전 계산하기', description: '상품 할인 → 장바구니 할인 → 배송비 할인 등 정해진 순서로 차감하고 품목별 안분 할인액을 주문서에 고정합니다.' },
        { name: '결제 진행 중 쿠폰 선점과 중복 사용 차단하기', description: '동일한 1회용 쿠폰을 두 개의 결제창에서 동시에 쓰지 못하도록 선점하고, 결제 실패 시 선점을 해제합니다.' },
        { name: '취소·반품 시 환불액 정산과 쿠폰 상태 갱신하기', description: '전체 취소·부분 취소 조건에 따라 품목별 실결제액 기준으로 환불액을 계산하고, 쿠폰 유효기간이 남아 있으면 복원 규칙을 적용합니다.' },
      ],
      pitfalls: [
        { name: '적용 순서를 정하지 않아 정률·정액 조합마다 결제액이 흔들리기', description: '10% 쿠폰과 3,000원 쿠폰은 적용 순서에 따라 결제액이 달라집니다. 계산 순서와 반올림·버림 기준을 한 가지로 고정하세요.' },
        { name: '품목별 안분 없이 주문 총액에서만 쿠폰 금액을 빼기', description: '2개 상품에 5,000원 장바구니 쿠폰을 쓰고 1개만 반품할 때 품목별 할인 배분 기록이 없으면 환불액이 음수가 되거나 과다 환불될 수 있습니다.' },
        { name: '부분 취소로 최소 주문 금액 미달이 되는 경계를 놓치기', description: '5만 원 이상 1만 원 할인 쿠폰을 쓰기 위해 상품을 추가 결제한 뒤 일부만 즉시 취소하는 경우 할인 회수 여부를 먼저 정해야 합니다.' },
      ],
      questions: [
        '상품 할인·상품 쿠폰·장바구니 쿠폰·배송비 쿠폰·적립금은 어떤 순서로 적용하며, 어디까지 중복을 허용하나요?',
        '쿠폰의 최소 주문 금액은 기본 판매가 기준인가요, 앞선 할인이 적용된 후 금액 기준인가요?',
        '장바구니 전체 할인액을 여러 품목에 나눌 때 비율 계산과 1원 단위 단수 처리는 어떻게 하나요?',
        '주문 일부 품목만 취소해 최소 주문 금액 조건이 깨지면 할인액을 차감하고 환불하나요, 안분된 실결제액대로 환불하나요?',
        '결제 실패·출고 전 전체 취소·반품 완료 시 사용한 쿠폰은 다시 복원되나요, 복원 시 유효기간이 지났으면 어떻게 하나요?',
      ],
      example: '예시: 상품 쿠폰을 먼저 적용한 금액이 5만 원 이상일 때 장바구니 쿠폰을 허용하고, 장바구니 할인액은 품목 결제 비중대로 나눈 뒤 끝전은 마지막 품목에 더하며, 결제 실패나 출고 전 전체 취소 시에는 유효기간 내 쿠폰을 자동 복원하도록 구성할 수 있습니다. 이는 참고 예시이며 실제 할인·복원 규칙은 별도로 확정해야 합니다.',
      relatedDesigns: [
        { id: 'ly-expandable-data-rows', reason: '주문서나 주문 상세에서 품목별 정가·상품 할인·장바구니 쿠폰 안분액·실결제액을 펼쳐 확인하는 표현에 참고할 수 있습니다. 실제 할인 계산과 환불 정산은 별도로 구현해야 합니다.' },
        { id: 'dismissible-inline-banner', reason: '최소 주문 금액까지 남은 금액이나 중복 적용 제한 사유를 장바구니 안에 안내하는 표현에 참고할 수 있습니다. 실제 쿠폰 자격 검증은 포함하지 않습니다.' },
      ],
      promptSnippet: '커머스의 쿠폰·프로모션 중복 적용 순서, 최소 주문 금액 검증 및 부분 취소 복원 흐름을 설계해 줘. 먼저 할인 종류별 적용 순서와 중복 가능 조합, 최소 주문 금액 기준, 장바구니 할인의 품목별 안분 및 단수 처리, 부분 취소 시 최소 금액 미달 정산, 쿠폰 복원 조건을 질문하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 쿠폰·프로모션 종류별 적용 조건, 제외 대상, 중복 가능 여부와 계산 순서.\n2. 장바구니 할인액의 품목별 안분 계산식과 단수(끝전) 배분 규칙.\n3. 결제 시도 시 1회용 쿠폰 선점과 결제 실패·시간 초과 시 해제 방식.\n4. 전체 취소·부분 취소·반품 시 환불 금액 재계산과 쿠폰 복원 여부(유효기간 만료 포함).\n5. 쿠폰 선택 모달·적용 불가 사유 안내·주문서 할인 내역 화면과 디자인 선택 이유.\n예시 정책을 확정 요구사항으로 쓰지 말고, 디자인 데모와 실제 할인 계산·쿠폰 원장 시스템을 구분해 줘.',
    },
    en: {
      domain: 'Commerce',
      title: 'Coupon stacking order, minimum order thresholds and partial-cancel restoration',
      summary: 'Define discount application order, prorate cart discounts across line items and handle partial-cancel recalculation and coupon recovery.',
      overview: 'When percentage discounts, fixed-amount coupons, item promotions and shipping discounts interact, changing the evaluation order changes the final total. Furthermore, if a cart-level discount is not allocated across individual line items at checkout, a partial cancellation or return cannot determine how much to refund per item. The concepts below are design references, not default promotion policies.',
      concepts: [
        { name: 'Discount types and stacking precedence', description: 'Define which promotions can combine and the exact evaluation order across sale prices, item coupons, cart coupons, shipping discounts and reward credits.' },
        { name: 'Minimum spend, maximum caps and exclusions', description: 'Clarify whether minimum order thresholds are checked before or after earlier discounts, and enforce maximum discount caps and excluded categories.' },
        { name: 'Line-item allocation and rounding remainders', description: 'Prorate cart-level discounts across eligible line items by price share and specify which line absorbs any 1-cent or 1-won rounding remainder.' },
        { name: 'Coupon restoration and partial-cancel clawbacks', description: 'Decide when single-use coupons return to the buyer’s wallet after payment failure or full cancellation, and how refunds behave when a partial cancel drops the order below the minimum spend.' },
      ],
      workflow: [
        { name: 'Surface eligible coupons and ineligible reasons', description: 'Separate usable coupons from unavailable ones, stating clearly whether a coupon is blocked by minimum spend, excluded items, stacking rules or expiry.' },
        { name: 'Compute discounts in fixed precedence and snapshot allocations', description: 'Apply discounts in the agreed order and record each line item’s allocated discount and net payable amount on the order snapshot.' },
        { name: 'Lock single-use coupons during checkout', description: 'Prevent the same single-use coupon from being redeemed across two concurrent checkout sessions, releasing the lock if payment fails.' },
        { name: 'Settle partial refunds and coupon recovery', description: 'Calculate refunds from line-item allocations or threshold recalculation rules, and restore coupons when policy and expiration dates allow.' },
      ],
      pitfalls: [
        { name: 'Leaving percentage and fixed discount order ambiguous', description: 'Applying 10% off before a fixed coupon yields a different total than applying it after. Lock both the precedence and rounding rule.' },
        { name: 'Subtracting cart coupons only from the order grand total', description: 'Without per-line discount allocation, refunding one item from a multi-item discounted order can over-refund or leave negative balances.' },
        { name: 'Overlooking partial cancellations that break minimum order thresholds', description: 'Decide upfront whether canceling filler items forfeits the cart discount on the remaining items or refunds strictly by prorated net price.' },
      ],
      questions: [
        'In what order are item discounts, item coupons, cart coupons, shipping discounts and credits applied, and which combinations can stack?',
        'Is a coupon’s minimum order amount evaluated against original item prices or the subtotal after item-level discounts?',
        'How are cart-level discounts prorated across line items, and how are rounding remainders assigned?',
        'If a partial cancellation or return drops the remaining order below the coupon’s minimum spend, is the discount revoked from the refund?',
        'Under what conditions (payment failure, pre-shipment cancel, return) is a redeemed coupon restored, and what happens if it has since expired?',
      ],
      example: 'Example: a store could apply item coupons first, allow one cart coupon if the post-item-discount subtotal is at least $50, allocate the cart discount proportionally across items with any rounding remainder on the last item, and restore single-use coupons only on payment failure or full pre-shipment cancellation before expiration. This is a reference example, not an established policy.',
      relatedDesigns: [
        { id: 'ly-expandable-data-rows', reason: 'A reference for expanding an order row to inspect per-item base price, allocated coupon discount and net paid amount. Real discount calculation and refund logic need separate implementation.' },
        { id: 'dismissible-inline-banner', reason: 'A reference for showing how much more spend is needed to unlock a coupon or why stacking was blocked. Real promotion eligibility checks are not included.' },
      ],
      promptSnippet: 'Help design a commerce coupon, promotion stacking, line-item discount allocation and partial-cancel restoration workflow. First ask about discount precedence and stacking combinations, minimum spend evaluation basis, cart-discount proration and rounding remainders, partial-cancel threshold recalculation, and coupon restoration rules. Do not assume undecided rules.\nBased on the answers, describe:\n1. Discount types, eligibility checks, stacking rules and deterministic calculation order.\n2. Formula for prorating cart discounts across line items and assigning rounding remainders.\n3. Checkout reservation of single-use coupons and release on payment failure or timeout.\n4. Refund calculation and coupon recovery across full cancellations, partial cancellations and expired coupons.\n5. Coupon selector, ineligible reason notices and checkout discount breakdown UI with reasons for the design choices.\nDo not turn example policies into confirmed requirements, and distinguish design demos from a real promotion and ledger engine.',
    },
  },
  sources: [
    { title: 'Shopify Help Center — Combining discounts', url: 'https://help.shopify.com/en/manual/discounts/combining-discounts' },
    { title: 'Stripe Docs — Coupons and promotion codes', url: 'https://docs.stripe.com/billing/subscriptions/coupons' },
  ],
}, {
  id: 'commerce-product-option-sku-and-pricing',
  aliases: {
    ko: ['상품 다중 옵션 조합', '옵션별 추가 금액과 재고', '단품 SKU 매핑', '일시 품절과 판매 중단', '필수 옵션과 추가 구성 상품'],
    en: ['multi-option SKU variants', 'variant price deltas', 'option combination stockout', 'discontinued variant state', 'product add-on options'],
  },
  useCases: {
    ko: ['색상·사이즈처럼 2~3단계 옵션을 조합해 단품(SKU)을 선택할 때', '옵션 조합마다 다른 추가 금액(+/-)과 잔여 수량을 연결할 때', '일시 품절(재입고 예정)과 판매 중단·단종 옵션을 구분해 표시할 때', '필수 선택 옵션과 선택형 추가 구성(Add-on)·각인 문구 입력을 함께 다룰 때'],
    en: ['Combining multi-axis options such as color and size into specific SKUs', 'Connecting per-variant price deltas and stock counts to the selected combination', 'Distinguishing temporary stockouts from discontinued or hidden variants', 'Combining required variant axes with optional add-ons or custom engraving inputs'],
  },
  keywords: {
    ko: ['상품 옵션', '옵션 조합', '단품', 'SKU', '추가 금액', '옵션 품절', '재입고 알림', '판매 중단', '추가 구성품'],
    en: ['product variant', 'option combination', 'SKU', 'price delta', 'out of stock', 'back-in-stock alert', 'discontinued', 'add-on item', 'quantity stepper'],
  },
  text: {
    ko: {
      domain: '커머스',
      title: '다중 옵션 조합(SKU)·추가 금액·품절 표시와 판매 중단',
      summary: '옵션 축을 조합해 실제 단품(SKU)과 가격·재고를 특정하고, 일시 품절과 단종·장바구니 옵션 변동을 연결합니다.',
      overview: '상품 상세 화면의 대표 가격은 시작 가격일 뿐이며, 실제 재고 차감과 결제는 색상·사이즈 등 모든 필수 옵션이 결정된 단품(SKU) 단위로 일어납니다. 상위 옵션을 고르기 전에 하위 옵션의 품절 여부를 어떻게 보여 줄지, 이미 장바구니에 담긴 옵션이 나중에 품절되거나 가격이 바뀌면 어떻게 막을지 정해야 합니다. 아래 내용은 상품 옵션·SKU 설계를 위한 참고이며 특정 상점의 옵션 구성을 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '옵션 축(Option Axis)과 단품(SKU) 매핑', description: '사용자가 고르는 옵션 값의 조합(예: 블랙 + L)을 실제 재고와 바코드·가격을 가진 고유 단품(SKU) 식별자에 1:1로 연결합니다.' },
        { name: '대표 가격·옵션 추가금·수량별 합계', description: '상품 기본가에서 특정 SKU의 추가 금액을 더한 단가를 계산하고, 선택한 수량과 추가 구성품 금액을 합산해 결제 예정 금액을 표시합니다.' },
        { name: '일시 품절(Out of Stock)과 판매 중단(Discontinued)', description: '곧 재입고될 수 있어 품절 표시·재입고 알림 신청을 남기는 일시 품절과, 아예 선택 목록에서 빼거나 단종으로 안내하는 판매 중단을 구분합니다.' },
        { name: '필수 조합 옵션과 선택형 추가 구성·문구 입력', description: '본품 SKU를 결정하는 필수 옵션과 별도 재고를 가지는 추가 구성품(액세서리 등) 및 주문 제작 문구 입력을 분리합니다.' },
      ],
      workflow: [
        { name: '옵션 선택 순서에 따라 유효한 조합 좁히기', description: '첫 번째 옵션을 고르면 조합 가능한 하위 옵션의 품절 여부·추가 금액·남은 수량을 갱신해 보여 줍니다.' },
        { name: '선택된 SKU 목록과 수량·합계 구성하기', description: '완성된 옵션 조합을 선택 목록에 추가하고, 이미 담긴 동일 SKU를 다시 고르면 행을 중복 생성하는 대신 수량을 합산할지 안내합니다.' },
        { name: '품절·최대 구매 수량 초과 즉시 제어하기', description: '잔여 재고나 1인당 구매 제한 수량을 넘겨 담으려 할 때 가능한 최대 수량과 제한 사유를 표시합니다.' },
        { name: '장바구니 보관 중 옵션 가격·판매 상태 변경 검증하기', description: '장바구니에 담아 둔 사이 해당 SKU가 품절·판매 중단되거나 추가 금액이 바뀌면 결제 진행 전에 변경 내역을 알리고 선택을 갱신합니다.' },
      ],
      pitfalls: [
        { name: '옵션 문자열만 저장하고 고유 SKU ID 없이 주문 받기', description: '옵션 이름("블랙/L")을 나중에 수정했을 때 기존 주문과 재고 연결이 끊어지지 않도록 불변 SKU 식별자를 기준으로 저장하세요.' },
        { name: '모든 하위 옵션을 다 눌러 봐야만 품절인지 알 수 있게 만들기', description: '특정 색상의 모든 사이즈가 품절인데 색상 선택 단계에서 아무 표시가 없으면 헛클릭이 반복됩니다. 조합별 가용 상태를 미리 계산해 표시하세요.' },
        { name: '맞춤 각인 문구가 다른 두 상품을 같은 SKU라고 수량만 합치기', description: '같은 반지 사이즈라도 각인 문구가 다르면 별도 주문 행으로 분리해야 출고 사고가 나지 않습니다.' },
      ],
      questions: [
        '옵션은 최대 몇 단계 조합까지 지원하며, 상위 옵션 선택 전에도 품절된 조합을 미리 비활성화해 보여 주나요?',
        '옵션 조합마다 추가 금액이나 할인가가 달라질 때 상품 목록과 상세 화면의 대표 가격은 무엇을 기준으로 표시하나요?',
        '일시 품절된 옵션과 영구 판매 중단된 옵션은 화면 노출과 재입고 알림 신청에서 어떻게 다르게 다루나요?',
        '본품 필수 옵션 외에 선택형 추가 구성품이나 각인·요청 문구 입력이 있으며, 반품·품절 시 본품과 함께 묶여 처리되나요?',
        '장바구니에 담아 둔 옵션이 결제 전에 품절되거나 추가 금액이 바뀌면 장바구니에서 어떻게 표시하고 차단하나요?',
      ],
      example: '예시: 색상·사이즈 2단계 옵션을 모두 고르면 해당 SKU가 수량 조절 행으로 추가되고, 전 사이즈가 품절된 색상은 "(품절)" 표시와 함께 재입고 알림 버튼을 열며, 장바구니에 담긴 뒤 판매 중단된 SKU는 결제 대상에서 자동 제외하고 안내 배지를 띄우도록 구성할 수 있습니다. 이는 참고 예시이며 실제 옵션·재고 정책은 별도로 확정해야 합니다.',
      relatedDesigns: [
        { id: 'native-quantity-stepper', reason: '선택한 옵션 단품(SKU)의 구매 수량을 최소·최대 재고 범위 안에서 증감하는 표현에 참고할 수 있습니다. 실제 SKU 재고 선점과 합계 계산은 별도로 구현해야 합니다.' },
        { id: 'faceted-filter-chips', reason: '색상·사이즈 같은 옵션 칩을 선택하고 조합 가능 상태를 표시하는 UI에 참고할 수 있습니다. 실제 SKU 매핑과 품절 판정은 포함하지 않습니다.' },
      ],
      promptSnippet: '커머스의 다중 옵션 조합(SKU)·추가 금액·품절 표시 및 판매 중단 흐름을 설계해 줘. 먼저 옵션 단계 수와 SKU 매핑 구조, 대표 가격 및 옵션별 추가 금액 표시 기준, 일시 품절 vs 판매 중단 처리, 추가 구성품·주문제작 문구 분리 여부, 장바구니 내 옵션 상태 변경 시 검증 규칙을 질문하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 옵션 축 조합에서 고유 SKU·단가·잔여 수량으로 이어지는 데이터 구조.\n2. 상위 옵션 선택에 따른 하위 옵션 가용성(정상·잔여 소량·일시 품절·판매 중단) 표시 규칙.\n3. 동일 SKU 중복 선택 및 맞춤 문구 입력 시 주문 행 분리·합산 기준.\n4. 장바구니 보관 중 SKU 품절·단종·가격 변경·최대 수량 초과 발생 시 차단과 사용자 안내.\n5. 옵션 선택기·선택된 단품 수량 조절 행·품절/재입고 알림 화면과 디자인 선택 이유.\n옵션 텍스트만으로 재고를 관리하지 말고, 디자인 데모와 실제 SKU 재고·가격 검증 시스템을 구분해 줘.',
    },
    en: {
      domain: 'Commerce',
      title: 'Multi-option SKU variants, price deltas, stockouts and discontinuation',
      summary: 'Map multi-axis product options to concrete SKUs, variant pricing and stock states across product pages and carts.',
      overview: 'A headline product price is only a starting point when inventory, barcode tracking and pricing live on specific SKU variants (such as Color + Size). A store needs clear rules for how unavailable combinations appear before every axis is picked, how temporary stockouts differ from discontinued variants, and what happens when a variant in a shopper’s cart changes price or sells out before checkout. The concepts below are design references, not default catalog rules.',
      concepts: [
        { name: 'Option axes versus concrete SKU mapping', description: 'Map each valid combination of option values (such as Black + Large) to an immutable SKU identifier that holds its own inventory and price.' },
        { name: 'Base price, variant price deltas and line totals', description: 'Combine base price and variant price adjustments with quantity and optional add-on items to show an accurate payable total.' },
        { name: 'Temporary stockout versus discontinued variant', description: 'Distinguish out-of-stock variants that stay visible for back-in-stock alerts from discontinued variants that are hidden or permanently disabled.' },
        { name: 'Required variant axes versus add-ons and personalization', description: 'Separate core options that select the base SKU from optional accessory add-ons and per-item custom text (such as engraving).' },
      ],
      workflow: [
        { name: 'Update combination availability as options are picked', description: 'As the shopper selects an option axis, reflect stock status, remaining quantity badges and price deltas on the remaining axes.' },
        { name: 'Build selected SKU rows and manage quantities', description: 'Add completed SKU selections to a summary list, merging quantities when the exact same SKU and customization are chosen twice.' },
        { name: 'Enforce stock caps and per-buyer quantity limits', description: 'Prevent shoppers from stepping quantity past available stock or per-order limits, explaining the cap clearly.' },
        { name: 'Revalidate cart variants before checkout', description: 'If a carted SKU becomes out of stock, discontinued or repriced before checkout, flag the affected row and block payment until resolved.' },
      ],
      pitfalls: [
        { name: 'Storing only display option strings instead of an immutable SKU ID', description: 'Renaming "Navy" to "Midnight Blue" should not break historical orders or stock lookups. Reference the underlying SKU ID.' },
        { name: 'Forcing users to click every combination to discover everything is sold out', description: 'If every size in a color is out of stock, mark that color as sold out upfront rather than only after the second click.' },
        { name: 'Merging two personalized items with different custom text into one quantity row', description: 'Two rings of the same size with different engraving strings must remain distinct line items for fulfillment.' },
      ],
      questions: [
        'How many option axes can a product have, and how are sold-out combinations indicated before all axes are selected?',
        'When variants have different prices, how is the headline price shown on list cards and before a variant is chosen?',
        'How do temporarily out-of-stock variants differ from discontinued variants in exposure and back-in-stock notifications?',
        'Are optional add-on items or custom text inputs supported, and can add-ons be bought or returned independently of the main SKU?',
        'If a variant sitting in a cart changes price, sells out or is discontinued, how is the cart updated before payment?',
      ],
      example: 'Example: a store could map Color and Size selections to a concrete SKU, show "(Sold out)" and a back-in-stock alert button on depleted combinations, keep engraved items as separate line rows even when the SKU matches, and block checkout with an inline warning if a carted SKU becomes discontinued. This is a reference example, not an established policy.',
      relatedDesigns: [
        { id: 'native-quantity-stepper', reason: 'A reference for stepping a selected SKU’s quantity within minimum and maximum stock bounds. Real stock reservation and pricing calculations need separate implementation.' },
        { id: 'faceted-filter-chips', reason: 'A reference for option chips that represent selectable attributes such as color or size. Real SKU resolution and stock checks are not included.' },
      ],
      promptSnippet: 'Help design multi-option product variants (SKUs), price deltas, stockout states and cart revalidation. First ask about option axis depth and SKU mapping, headline price versus variant price delta display, temporary stockout versus discontinued behavior, add-on items or custom text inputs, and cart revalidation when a variant changes state. Do not assume undecided rules.\nBased on the answers, describe:\n1. Data structure linking option axes to immutable SKUs, price deltas and stock counts.\n2. Availability states (in stock, low stock, out of stock, discontinued) across option selectors.\n3. Line-item merging versus splitting when identical SKUs or custom personalization strings are added.\n4. Cart and checkout handling when a selected SKU sells out, is discontinued or changes price.\n5. Variant selector, selected SKU quantity rows and stockout/alert UI with reasons for the design choices.\nDo not track inventory by mutable option labels alone, and distinguish design demos from real SKU catalog and inventory systems.',
    },
  },
  sources: [
    { title: 'Shopify Help Center — Adding variants to products', url: 'https://help.shopify.com/en/manual/products/variants/add-variants' },
    { title: 'Google Search Central — Product variant structured data', url: 'https://developers.google.com/search/docs/appearance/structured-data/product-variants' },
  ],
}, {
  id: 'commerce-review-verification-and-reward',
  aliases: {
    ko: ['실구매자 리뷰 작성 자격', '구매 확정과 리뷰 적립금', '포토 리뷰 보상과 환불 회수', '리뷰 수정 기한과 블라인드', '단종 옵션 리뷰 표시'],
    en: ['verified buyer review rules', 'post-purchase review rewards', 'photo review points and clawback', 'review edit window and moderation', 'variant label on reviews'],
  },
  useCases: {
    ko: ['단순 방문자와 배송 완료·구매 확정된 실구매자의 리뷰 작성 자격을 구분할 때', '일반 텍스트 리뷰·포토 리뷰·한달 사용 리뷰별 작성 기한과 적립금 지급 조건을 정할 때', '리뷰 적립금을 받은 뒤 반품·환불할 때 지급된 포인트를 회수·차감할 때', '리뷰 수정·삭제 허용 범위와 신고·블라인드 및 판매자 답글을 설계할 때'],
    en: ['Restricting review creation to verified buyers after delivery or purchase confirmation', 'Setting submission windows and reward tiers for text, photo and follow-up reviews', 'Clawing back or deducting review reward points when an order is later returned or refunded', 'Designing review edit/delete limits, moderation hiding and seller replies'],
  },
  keywords: {
    ko: ['구매 후기', '실구매자 리뷰', '구매 확정', '리뷰 적립금', '포토 리뷰', '포인트 회수', '리뷰 기한', '판매자 답글', '리뷰 블라인드'],
    en: ['product review', 'verified purchase', 'purchase confirmation', 'review reward points', 'photo review', 'point clawback', 'review window', 'seller reply', 'review moderation'],
  },
  text: {
    ko: {
      domain: '커머스',
      title: '실구매자 리뷰 작성 자격·수정 기한·적립금 지급과 환불 시 회수',
      summary: '구매 확정 단위별 리뷰 자격과 적립금 지급을 연결하고, 반품·환불 시 포인트 회수와 리뷰 노출 상태를 다룹니다.',
      overview: '커머스 리뷰는 구매 전환에 직접 영향을 주므로 실제 상품을 받아 본 주문 건에 한해 작성 자격을 부여하고, 주문한 옵션 정보를 함께 표시해야 신뢰할 수 있습니다. 특히 리뷰 작성 보상으로 적립금을 지급하는 서비스라면, 적립금을 받은 뒤 상품을 반품하거나 이미 쓴 포인트를 어떻게 정산할지까지 함께 설계해야 악용과 분쟁을 막을 수 있습니다. 아래 내용은 리뷰·보상 설계를 위한 참고이며 특정 상점의 적립금 액수를 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '실구매 검증과 작성 단위', description: '상품 페이지 열람자가 아니라 배송 완료 또는 구매 확정된 주문 품목(주문 행)당 1회 작성 자격을 부여하고, 구매한 옵션명을 리뷰에 연결합니다.' },
        { name: '리뷰 유형·작성 기한과 적립금 차등 지급', description: '구매 확정 후 작성 가능 기한(예: 30일)과 글자 수·사진 첨부 여부에 따른 일반/포토 리뷰 적립금 지급 시점(즉시 vs 검수 후)을 정의합니다.' },
        { name: '반품·취소 시 리뷰 처리와 보상 회수(Clawback)', description: '리뷰 작성 후 예외적 반품·환불이 승인되면 작성된 리뷰를 숨김/삭제할지, 지급했던 적립금을 회수하거나 이미 사용한 경우 환불액에서 차감할지 정합니다.' },
        { name: '수정·삭제 제한과 운영 블라인드·판매자 답글', description: '적립금 수령 후 리뷰를 삭제하거나 사진을 지우는 행동을 제한하고, 광고·욕설 신고에 따른 임시 숨김과 판매자 공식 답글을 관리합니다.' },
      ],
      workflow: [
        { name: '주문 품목 상태에 따라 리뷰 작성 자격 열기', description: '배송 완료·구매 확정된 품목에 작성 가능 기한과 예상 적립금을 표시하고, 기한 만료나 취소 품목은 작성을 막습니다.' },
        { name: '리뷰 필수 요건 검증 후 등록·보상 연결하기', description: '별점·본문 길이·실제 이미지 첨부 조건을 확인해 저장하고, 정책에 따라 즉시 또는 검수 후 적립금을 지급합니다.' },
        { name: '수정·삭제 및 판매자 답글·신고 처리하기', description: '보상 지급 전후에 따라 수정·삭제 가능 범위를 안내하고, 부적절한 리뷰는 사유와 함께 숨김 처리합니다.' },
        { name: '환불 발생 시 리뷰 상태와 적립금 정산하기', description: '반품·환불 확정 시 해당 주문 행에 연결된 리뷰 노출 상태와 지급 적립금 회수(또는 환불금 차감)를 함께 처리합니다.' },
      ],
      pitfalls: [
        { name: '상품 단위로만 1회 제한을 걸어 재구매 고객의 리뷰나 다중 옵션 리뷰를 막기', description: '자격을 "회원+상품"으로만 묶으면 같은 상품을 다시 사거나 다른 옵션으로 함께 산 경우 리뷰를 남길 수 없습니다. "주문 품목 행" 단위로 자격을 관리하세요.' },
        { name: '포토 리뷰 적립금을 받은 직후 사진만 지우거나 반품해도 포인트를 그대로 두기', description: '보상 기준을 충족해 지급된 포인트는 사진 삭제 제한이나 반품 시 회수·환불액 차감 규칙이 함께 있어야 악용을 막을 수 있습니다.' },
        { name: '옵션이 단종되었을 때 기존 리뷰까지 함께 숨겨 버리기', description: '특정 색상 옵션이 품절·단종되어도 상품 자체의 품질 후기는 여전히 유효합니다. 리뷰에 구매 당시 옵션명을 남기되 상품 리뷰 목록은 유지하세요.' },
      ],
      questions: [
        '리뷰 작성은 배송 완료 시점부터 가능한가요, 구매 확정 후에만 가능한가요? 작성 가능 기한은 며칠인가요?',
        '같은 상품을 여러 번 구매하거나 한 주문에서 다른 옵션으로 2개 사면 각각 리뷰와 적립금을 받을 수 있나요?',
        '일반 리뷰·포토 리뷰·추가 사용 리뷰의 적립금 지급 기준은 무엇이며, 등록 즉시 지급하나요 검수 후 지급하나요?',
        '리뷰 적립금을 받은 뒤 리뷰를 수정·삭제할 수 있나요? 예외 반품·환불 시 이미 지급(또는 사용)한 적립금은 어떻게 회수하나요?',
        '부적절한 리뷰 신고나 블라인드 처리 기준은 무엇이며, 판매자 답글 작성·수정 권한은 어떻게 두나요?',
      ],
      example: '예시: 구매 확정 후 30일 이내에 주문 품목당 1회 리뷰를 작성할 수 있고, 50자 이상 및 사진 첨부 시 포토 적립금을 지급하되 적립금 지급 후에는 삭제와 사진 제거를 제한하며, 이후 반품이 승인되면 리뷰를 비노출로 전환하고 지급 적립금을 회수(부족 시 환불금에서 차감)하도록 구성할 수 있습니다. 이는 참고 예시이며 실제 보상·회수 규칙은 별도로 확정해야 합니다.',
      relatedDesigns: [
        { id: 'character-budget-feedback', reason: '적립금 지급 기준이 되는 최소 글자 수 충족 여부와 최대 입력 한도를 안내하는 표현에 참고할 수 있습니다. 실제 리뷰 저장과 포인트 지급은 별도로 구현해야 합니다.' },
        { id: 'native-file-attachment', reason: '포토 리뷰 작성 시 이미지 파일 형식·용량·개수를 확인해 첨부하는 UI에 참고할 수 있습니다. 실제 파일 업로드와 검수는 포함하지 않습니다.' },
      ],
      promptSnippet: '커머스의 실구매자 리뷰 작성 자격·수정 기한·적립금 지급 및 환불 시 회수 흐름을 설계해 줘. 먼저 작성 자격 시점(배송 완료 vs 구매 확정)과 작성 기한, 재구매·다중 옵션 구매 시 작성/보상 단위, 일반/포토 리뷰 적립금 지급 및 수정·삭제 제한, 반품·환불 시 적립금 회수(또는 환불액 차감)와 블라인드 정책을 질문하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 주문 품목 행 단위의 리뷰 자격 상태(작성 전·작성 가능·기한 만료·작성 완료·반품 무효화).\n2. 텍스트·포토·한달 사용 리뷰의 요건 검증과 적립금 지급 시점(즉시/검수 후).\n3. 적립금 수령 후 리뷰 수정·사진 삭제·글 삭제 제한 규칙.\n4. 반품·환불 승인 시 기존 리뷰 노출 처리와 미사용/기사용 적립금 회수 정산 방식.\n5. 작성 가능 리뷰 목록·리뷰 작성 폼·상품 상세 리뷰 필터(옵션별/포토만)·판매자 답글 화면과 디자인 선택 이유.\n예시 정책을 확정 요구사항으로 쓰지 말고, 디자인 데모와 실제 구매 검증·포인트 원장 시스템을 구분해 줘.',
    },
    en: {
      domain: 'Commerce',
      title: 'Verified-buyer reviews, edit windows, reward points and refund clawbacks',
      summary: 'Tie review eligibility to fulfilled order lines, and connect review reward points with edit limits and refund clawbacks.',
      overview: 'Shopper trust depends on knowing whether a review came from a verified purchase and which variant the buyer actually received. When a store also grants reward points for text or photo reviews, the workflow must define submission windows, restrictions on deleting photos after claiming points, and how rewards are clawed back if the item is later returned. The concepts below are design references, not default loyalty policies.',
      concepts: [
        { name: 'Order-line verification and variant snapshot', description: 'Grant review eligibility per fulfilled or confirmed order line item rather than open page access, and attach the purchased variant label to the review.' },
        { name: 'Submission windows and tiered review rewards', description: 'Define how many days after delivery or confirmation a buyer can post a review, the criteria for text versus photo rewards, and whether points issue immediately or after review.' },
        { name: 'Return/refund handling and point clawbacks', description: 'Specify what happens to an existing review and its granted reward points when an order line is returned or refunded, including when the buyer already spent those points.' },
        { name: 'Edit/delete restrictions, moderation and seller replies', description: 'Restrict removing photos or deleting reviews after rewards are claimed, and separate moderation hiding from official seller replies.' },
      ],
      workflow: [
        { name: 'Open review eligibility per confirmed order line', description: 'Show eligible items, deadline dates and reward criteria in the buyer’s order history while blocking canceled or expired items.' },
        { name: 'Validate review criteria and grant rewards', description: 'Check rating, minimum text length and photo attachments on submission, then issue or queue reward points according to policy.' },
        { name: 'Enforce edit rules, moderation states and seller replies', description: 'Explain whether edits or deletions are allowed after reward payout, and handle reported reviews and seller responses cleanly.' },
        { name: 'Reconcile reviews and points on return or refund', description: 'When a return is approved after a review was posted, update review exposure and reclaim granted points or deduct spent points from the refund.' },
      ],
      pitfalls: [
        { name: 'Keying review limits only by user + product instead of order line', description: 'Blocking repeat buyers or multi-variant orders from reviewing each fulfilled purchase frustrates loyal customers. Track eligibility per order line.' },
        { name: 'Allowing buyers to delete photos or refund items while keeping photo review points', description: 'If points are granted for a photo review, prevent stripping the photo below the reward threshold and define refund clawback rules.' },
        { name: 'Hiding past reviews when a single color or size variant is discontinued', description: 'Keep historical reviews visible with their purchased variant badge even if that specific SKU is later sold out or discontinued.' },
      ],
      questions: [
        'Does review eligibility open upon delivery or only after purchase confirmation, and how many days does the window stay open?',
        'Can repeat purchases or multiple variants in the same order each submit a review and earn reward points?',
        'What are the criteria for text, photo or follow-up review rewards, and are points granted immediately or after verification?',
        'Can a review be edited or deleted after reward points are paid, and how are granted or already-spent points handled if the item is returned?',
        'Under what rules are reviews hidden by moderation, and how do seller replies work?',
      ],
      example: 'Example: a store could allow one review per confirmed order line within 30 days, grant bonus points for 50+ characters with a photo, lock deletion and photo removal once points are paid, and upon an approved return hide the review and reclaim the points (or deduct spent points from the refund amount). This is a reference example, not an established policy.',
      relatedDesigns: [
        { id: 'character-budget-feedback', reason: 'A reference for showing minimum length progress for reward eligibility alongside maximum character limits. Real review submission and point issuance need separate implementation.' },
        { id: 'native-file-attachment', reason: 'A reference for attaching and validating review photos before submission. Real media upload and moderation are not included.' },
      ],
      promptSnippet: 'Help design a commerce verified-buyer review, edit window, reward point and refund clawback workflow. First ask about eligibility timing (delivery vs purchase confirmation) and submission window, repeat-purchase or multi-variant reward rules, text/photo reward criteria and payout timing, post-reward edit/delete restrictions, and return/refund point clawback and moderation policies. Do not assume undecided rules.\nBased on the answers, describe:\n1. Order-line review states (ineligible, eligible, expired, submitted, invalidated by return).\n2. Validation and reward payout rules for text, photo and follow-up reviews.\n3. Edit, photo-removal and deletion restrictions before versus after reward points are granted.\n4. Review exposure updates and point recovery (including already-spent points) when an item is returned or refunded.\n5. Eligible-review list, review composer, product review filters (by variant/photo) and seller reply UI with reasons for the design choices.\nDo not turn example policies into confirmed requirements, and distinguish design demos from real purchase verification and loyalty ledger systems.',
    },
  },
  sources: [
    { title: 'Federal Trade Commission (FTC) — Soliciting and Paying for Online Reviews', url: 'https://www.ftc.gov/business-guidance/resources/soliciting-paying-online-reviews-guide-marketers' },
    { title: 'Google Search Central — Review snippet structured data', url: 'https://developers.google.com/search/docs/appearance/structured-data/review-snippet' },
  ],
}, {
  id: 'commerce-exchange-return-pickup-and-inspection',
  aliases: {
    ko: ['교환 반품 수거와 검수', '반품 귀책 사유와 배송비 차감', '교환 재출고와 반품 전환', '입고 검수 보류 판정', '자동 수거와 직접 발송 반품'],
    en: ['exchange and return pickup', 'return inspection grading', 'buyer vs seller fault return fee', 'exchange reshipment and stockout fallback', 'return carrier pickup workflow'],
  },
  useCases: {
    ko: ['구매자가 단순 변심과 상품 불량·오배송 중 사유를 골라 교환·반품을 접수할 때', '자동 수거 지시와 구매자 직접 발송을 구분하고 회수 운송장을 추적할 때', '입고 후 검수 판정(양품·불량 확인·구성품 누락 보류)에 따라 후속 처리를 나눌 때', '교환 재출고 시 재고가 품절되었거나 왕복 배송비를 정산해야 할 때'],
    en: ['Accepting exchange or return requests with buyer-remorse versus defective/wrong-item reasons', 'Distinguishing automated carrier pickup from buyer self-return tracking', 'Routing returned items through warehouse inspection (approved, rejected/held, damaged)', 'Handling exchange reshipment, replacement stockouts and return shipping fee deductions'],
  },
  keywords: {
    ko: ['교환', '반품', '회수 지시', '입고 검수', '검수 보류', '귀책 사유', '반품 배송비', '교환 재출고', '반품 전환'],
    en: ['exchange', 'return pickup', 'warehouse inspection', 'inspection hold', 'return reason', 'return shipping fee', 'reshipment', 'refund conversion', 'RMA'],
  },
  text: {
    ko: {
      domain: '커머스',
      title: '교환·반품 수거 지시·검수 판정·교환 재출고와 배송비 차감',
      summary: '반품·교환 사유와 수거 방식을 구분하고, 입고 검수 판정에 따른 재출고·환불 전환·배송비 정산을 연결합니다.',
      overview: '배송이 완료된 상품의 반품과 교환은 온라인 버튼 클릭만으로 끝나지 않고 실물 회수와 입고 검수를 거칩니다. 구매자 변심인지 상품 불량·오배송인지에 따라 왕복 배송비 부담 주체가 달라지며, 교환 상품을 검수하는 사이 새 상품 재고가 품절되면 반품·환불로 전환해야 할 수도 있습니다. 아래 내용은 교환·반품 물류 및 정산 흐름 설계를 위한 참고이며 특정 상점의 반품 기간이나 배송비를 기본값으로 정하지 않습니다.',
      concepts: [
        { name: '귀책 사유(변심 vs 불량·오배송)와 증빙', description: '단순 변심·사이즈 착오와 파손·불량·오배송을 구분하고, 불량·오배송 접수 시 사진 첨부와 검수 후 귀책 사유 정정 규칙을 정의합니다.' },
        { name: '회수 방식(자동 수거 vs 직접 발송)', description: '지정 택배사로 자동 수거를 지시하는 방식과 구매자가 직접 발송하고 반송장 번호를 입력하는 방식을 구분해 회수 상태를 추적합니다.' },
        { name: '입고 검수 판정(승인·보류·거부)', description: '회수된 상품의 택 제거·사용 흔적·구성품 누락·실제 불량 여부를 확인해 정상 승인, 비용 추가 확인 보류, 반품 거부(재반송)로 나눕니다.' },
        { name: '교환 재출고·품절 시 환불 전환과 배송비 정산', description: '교환 승인 시 대체 상품을 재출고하되 재고 부족 시 환불 전환을 안내하고, 반품 배송비를 환불액에서 차감할지 별도 결제받을지 정합니다.' },
      ],
      workflow: [
        { name: '사유·수량·회수 방법과 예상 배송비 확인하기', description: '신청 단계에서 대상 품목·수량, 사유, 수거지 주소, 예상 반품/교환 배송비 부담 주체와 정산 방식을 명확히 보여 줍니다.' },
        { name: '수거 진행과 입고 대기 상태 추적하기', description: '접수 완료 → 수거 지시 → 회수 중 → 입고 완료 → 검수 중 단계를 표시하고, 직접 발송 시 반송장 입력을 받습니다.' },
        { name: '검수 판정과 귀책 사유 확정하기', description: '입고 상품을 검수해 승인·보류·거부를 기록하고, 불량 신청 건이 실제 정상 상품으로 확인되면 배송비 부담 변경을 안내합니다.' },
        { name: '환불 정산 또는 교환 재출고 마무리하기', description: '반품은 차감 배송비를 반영해 환불을 완료하고, 교환은 새 운송장으로 재출고하거나 재고 부족 시 반품 전환 동의를 받습니다.' },
      ],
      pitfalls: [
        { name: '교환 신청 접수 시점에 대체 상품 재고를 확인·선점하지 않기', description: '회수와 검수에 며칠이 걸리는 동안 교환할 옵션이 품절되면 회수 후에도 새 상품을 보낼 수 없습니다. 재고 선점 시점이나 품절 시 전환 규칙을 정하세요.' },
        { name: '초기 무료배송 주문을 일부 반품할 때 왕복·편도 배송비 기준을 혼동하기', description: '무료배송 조건을 채웠던 주문에서 일부만 반품해 남은 금액이 무료배송 기준 미만이 되면 초기 배송비까지 차감하는지 편도만 차감하는지 명확히 계산해야 합니다.' },
        { name: '검수 보류(구성품 누락·훼손) 상태 없이 승인/거부만 두기', description: '사은품 누락이나 배송비 미입금처럼 보완 후 처리가 가능한 경우를 위해 검수 보류 상태와 구매자 안내 경로를 별도로 두세요.' },
      ],
      questions: [
        '교환·반품 신청 가능 기간은 수령 후 며칠이며, 어떤 품목(개봉 상품·주문제작 등)은 신청이 제한되나요?',
        '회수는 지정 택배사 자동 수거로 진행하나요, 구매자가 직접 발송하고 운송장을 입력하는 방식도 허용하나요?',
        '단순 변심과 불량·오배송일 때 반품·교환 배송비는 얼마이며, 환불금 차감과 별도 결제 중 무엇을 쓰나요?',
        '초기 무료배송 주문에서 일부 품목만 변심 반품해 무료배송 기준 아래로 내려가면 배송비를 어떻게 계산하나요?',
        '입고 검수 중 구성품 누락·훼손이 발견되거나 교환할 새 상품 재고가 품절되면 어떤 상태와 안내로 전환하나요?',
      ],
      example: '예시: 수령 후 7일 이내 신청 시 지정 택배사 자동 수거를 접수하고, 입고 검수에서 이상이 없으면 변심 반품은 환불액에서 반품 배송비를 차감해 환불하며, 교환은 신청 즉시 대체 SKU 1개를 임시 선점하되 검수 중 재고 불량 등으로 출고가 불가능하면 구매자 확인 후 전액 환불로 전환하도록 구성할 수 있습니다. 이는 참고 예시이며 실제 물류·배송비 규칙은 별도로 확정해야 합니다.',
      relatedDesigns: [
        { id: 'ly-activity-timeline', reason: '교환·반품 접수부터 수거 지시, 회수 중, 입고 검수, 재출고 또는 환불 완료까지의 진행 이력을 시간순으로 보여 주는 표현에 참고할 수 있습니다. 실제 택배사 연동과 정산은 별도로 구현해야 합니다.' },
        { id: 'native-file-attachment', reason: '파손·불량·오배송 사유로 교환·반품을 신청할 때 증빙 사진을 첨부하는 화면에 참고할 수 있습니다. 실제 파일 저장과 검수 판정은 포함하지 않습니다.' },
      ],
      promptSnippet: '커머스의 교환·반품 수거 지시·검수 판정·교환 재출고 및 배송비 차감 흐름을 설계해 줘. 먼저 신청 기한과 제한 품목, 귀책 사유(변심 vs 불량·오배송) 및 증빙 기준, 자동 수거 vs 직접 발송 방식, 입고 검수 판정(승인·보류·거부), 반품/교환 배송비 계산(부분 반품 시 무료배송 기준 미달 포함)과 교환 재고 품절 시 처리 규칙을 질문하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 교환·반품 접수부터 수거·입고·검수(승인/보류/거부)·재출고 또는 환불 완료까지의 상태 전환.\n2. 귀책 사유 변경 및 전체/부분 반품 조건에 따른 배송비 차감·추가 결제 계산 규칙.\n3. 교환 신청 시 대체 SKU 재고 확보 시점과 품절 시 반품(환불) 전환 절차.\n4. 수거 지연·구성품 누락 보류·검수 거부(재반송) 발생 시 사용자 안내와 운영자 처리 행동.\n5. 교환/반품 신청 폼·회수/검수 진행 타임라인·정산 예정 내역 화면과 디자인 선택 이유.\n신청 접수를 곧바로 환불 완료나 재고 복구로 간주하지 말고, 디자인 데모와 실제 회수 물류·검수·정산 시스템을 구분해 줘.',
    },
    en: {
      domain: 'Commerce',
      title: 'Exchange and return pickup, inspection grading, reshipment and fee deduction',
      summary: 'Connect return reasons and carrier pickup tracking with warehouse inspection outcomes, exchange reshipment and return-fee deductions.',
      overview: 'Post-delivery returns and exchanges involve physical item recovery and warehouse inspection before a refund is released or a replacement ships. Responsibility for return shipping fees depends on whether the return is buyer remorse or a defective/wrong item, and an exchange can stall if replacement stock runs out while the original item is in transit. The concepts below are design references, not default return policies.',
      concepts: [
        { name: 'Return reason classification and evidence', description: 'Distinguish buyer remorse or size changes from damaged, defective or wrong items, requiring photo evidence for fault claims and allowing adjustment after physical inspection.' },
        { name: 'Automated carrier pickup versus self-ship return', description: 'Track whether the store dispatches a return pickup automatically or the buyer ships the parcel back and submits a return tracking number.' },
        { name: 'Inspection grading (approved, on hold, rejected)', description: 'Separate warehouse receipt from inspection outcomes: approved for restock/refund, held for missing accessories or unpaid fees, or rejected and shipped back to the buyer.' },
        { name: 'Exchange reshipment, stockout fallback and fee settlement', description: 'Coordinate when replacement SKU stock is reserved, how an exchange converts to a refund if replacement stock is unavailable, and whether return fees are deducted from the refund or charged separately.' },
      ],
      workflow: [
        { name: 'Confirm items, reason, pickup method and estimated fees', description: 'Show eligible items, return versus exchange choice, pickup address and expected shipping fee deductions before the request is submitted.' },
        { name: 'Track return transit and warehouse receipt', description: 'Display progress across requested, pickup scheduled, in return transit, received at warehouse and under inspection.' },
        { name: 'Record inspection outcome and final fault attribution', description: 'Grade the returned item, notify the buyer if inspection changes fault attribution or places the return on hold, and update sellable inventory only when approved.' },
        { name: 'Complete refund deduction or exchange reshipment', description: 'Release the net refund after any agreed fee deductions, or ship the replacement SKU with its own tracking number (falling back to a refund if out of stock).' },
      ],
      pitfalls: [
        { name: 'Waiting until return inspection finishes to check replacement stock for an exchange', description: 'If the requested replacement size sells out while the return parcel is in transit, the exchange cannot be fulfilled. Define whether exchanges hold replacement stock upfront or offer a refund conversion.' },
        { name: 'Ambiguous return fee math when a partial return breaks free-shipping thresholds', description: 'If an order qualified for free initial shipping and a buyer returns part of it for remorse, clarify whether only return shipping or also initial outbound shipping is deducted.' },
        { name: 'Having no inspection-hold state for missing freebies or accessories', description: 'Provide an explicit on-hold state with buyer notification rather than forcing operators to immediately approve or reject incomplete returns.' },
      ],
      questions: [
        'How many days after delivery can buyers request a return or exchange, and which items are non-returnable?',
        'Does the store schedule automated carrier pickup, allow buyer self-return with tracking input, or both?',
        'How are return or exchange shipping fees calculated for buyer remorse versus defective items, and are fees deducted from the refund or paid upfront?',
        'When a partial remorse return drops an originally free-shipping order below the free-shipping threshold, how are outbound and return fees adjusted?',
        'What happens if inspection finds wear or missing parts, or if the replacement SKU for an exchange is out of stock?',
      ],
      example: 'Example: a store could accept return or exchange requests within 7 days of delivery, schedule automated pickup, hold 1 replacement SKU during an exchange, deduct return shipping from the refund for buyer-remorse returns after inspection approval, and place returns on hold with a buyer notice if accessories are missing. This is a reference example, not an established policy.',
      relatedDesigns: [
        { id: 'ly-activity-timeline', reason: 'A reference for showing the step-by-step timeline from return request and carrier pickup to warehouse inspection and refund or reshipment. Real carrier tracking and settlement need separate implementation.' },
        { id: 'native-file-attachment', reason: 'A reference for uploading photos of damaged or wrong items when submitting a claim. Real file persistence and inspection review are not included.' },
      ],
      promptSnippet: 'Help design a commerce exchange and return pickup, warehouse inspection, reshipment and fee-deduction workflow. First ask about return windows and ineligible items, buyer-remorse versus defect/wrong-item rules, automated pickup versus self-ship tracking, inspection outcomes (approved, on hold, rejected), return fee deduction math (including partial returns on free-shipping orders), and exchange stock reservation or refund fallback. Do not assume undecided rules.\nBased on the answers, describe:\n1. States across return/exchange request, pickup/return transit, warehouse receipt, inspection (approved/hold/rejected) and final refund or reshipment.\n2. Shipping fee calculation and deduction rules across fault types and full versus partial returns.\n3. Replacement SKU reservation timing for exchanges and fallback to refund when stock is unavailable.\n4. Handling of delayed pickups, inspection holds for missing parts and rejected returns.\n5. Return/exchange request form, progress timeline and fee breakdown UI with reasons for the design choices.\nDo not treat submitting a return request as an completed refund or instant restock, and distinguish design demos from real logistics, inspection and settlement systems.',
    },
  },
  sources: [
    { title: 'Shopify Help Center — Creating and processing returns and exchanges', url: 'https://help.shopify.com/en/manual/orders/manage-orders/return-items' },
    { title: 'Stripe Docs — Refund and cancel payments', url: 'https://docs.stripe.com/refunds' },
  ],
}];
