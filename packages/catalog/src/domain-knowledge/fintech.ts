import type { DomainKnowledge } from '../domain-knowledge';

export const FINTECH_KNOWLEDGE: DomainKnowledge[] = [
  {
    id: 'fintech-wallet-ledger-idempotency-and-hold',
    aliases: {
      ko: ['예치금 포인트 지갑 원장', '복식 원장 설계', '출금 대기 잔액 선점', '이중 출금 방지 멱등성', '가용 잔액과 총잔액 분리'],
      en: ['wallet double-entry ledger', 'idempotent balance mutation', 'pending withdrawal hold', 'available versus total balance', 'prevent double spend'],
    },
    useCases: {
      ko: [
        '지갑 잔액을 단순 숫자 덮어쓰기 대신 추가 전용(Append-only) 원장 기록과 합산으로 관리할 때',
        '출금이나 결제 요청이 진행 중일 때 총잔액과 출금 가능 잔액(가용 잔액)을 분리해 이중 사용을 막을 때',
        '네트워크 재시도나 따닥 클릭으로 동일한 충전·차감 요청이 두 번 들어올 때 멱등성 키로 한 번만 반영할 때',
        '보류(Hold)된 출금이 최종 성공하면 확정 차감으로, 실패하면 가용 잔액 복구로 전이시킬 때',
      ],
      en: [
        'Tracking wallet balances through immutable double-entry ledger entries rather than overwriting a single balance column',
        'Separating total balance from available balance by placing a hold while a payout or purchase is in flight',
        'Deduplicating retried or double-clicked credit and debit requests using idempotency keys',
        'Releasing held funds back to available balance on failure or finalizing the debit upon settlement',
      ],
    },
    keywords: {
      ko: ['예치금 지갑', '포인트 원장', '복식 부기', '가용 잔액', '보류 금액', '잔액 선점', '멱등성 키', '이중 출금 방지', '동시성 제어'],
      en: ['digital wallet', 'double-entry ledger', 'available balance', 'held balance', 'funds hold', 'idempotency key', 'double spend prevention', 'atomic debit', 'ledger entry'],
    },
    text: {
      ko: {
        domain: '핀테크·송금·지갑',
        title: '예치금·포인트 지갑의 복식 원장·중복 요청 방지(멱등성)와 출금 대기 선점',
        summary: '지갑 잔액을 수정 불가능한 원장 항목으로 기록하고, 가용 잔액과 대기 선점액(Hold)을 분리하며 멱등성 키로 중복 차감을 차단합니다.',
        overview: '예치금·포인트·정산 지갑에서 현재 잔액을 숫자 컬럼 하나에 덧셈·뺄셈으로만 덮어쓰면, 왜 잔액이 줄었는지 추적할 수 없고 동시 요청 시 잔액이 음수가 되거나 두 번 출금되는 사고가 발생합니다. 모든 잔액 변동은 출발·도착 계정이 쌍을 이루는 추가 전용(Append-only) 원장으로 남기고, 외부 송금처럼 시간이 걸리는 작업은 가용 잔액을 먼저 선점(Hold)한 뒤 최종 결과에 따라 확정 또는 해제해야 합니다. 아래 개념은 지갑·원장 설계를 위한 참고이며 특정 회계 기준이나 금융 규제를 기본값으로 강제하지 않습니다.',
        concepts: [
          { name: '추가 전용 복식 원장(Double-Entry Ledger)', description: '잔액을 직접 수정하거나 기존 내역을 삭제하지 않고, 차변·대변(또는 출발·도착 계정)의 합이 0이 되는 불변 원장 행을 추가해 모든 변동의 전후 맥락을 보존합니다.' },
          { name: '총잔액(Total)·가용 잔액(Available)·보류 잔액(Held) 분리', description: '아직 외부 처리가 끝나지 않은 출금·결제 요청 금액은 보류(Hold) 상태로 분리해 가용 잔액에서 즉시 빼고, 완료되기 전까지 다른 요청이 그 돈을 또 쓰지 못하게 막습니다.' },
          { name: '멱등성 키(Idempotency Key)와 요청 본문 검증', description: '충전·차감·이체 요청마다 고유한 멱등성 키를 받아, 네트워크 재시도로 같은 키가 다시 들어오면 중복 실행하지 않고 최초 처리 결과를 그대로 반환합니다.' },
          { name: '동시 차감 직렬화와 음수 잔액 방지(Non-negative Guard)', description: '동시에 여러 출금 요청이 들어올 때 지갑 행 잠금이나 조건부 연산을 통해 가용 잔액이 요청 금액 이상일 때만 선점·차감이 성공하도록 보장합니다.' },
        ],
        workflow: [
          { name: '멱등성 키 확인 및 가용 잔액 잠금 검사하기', description: '요청의 멱등성 키로 기존 처리 여부를 먼저 확인하고, 신규 요청이면 해당 지갑을 잠근 뒤 가용 잔액이 충분한지 검사합니다.' },
          { name: '가용 잔액을 보류(Hold) 계정으로 선점 이동하기', description: '외부 출금이나 결제를 호출하기 전에 먼저 원장에 가용 잔액 차감·보류 잔액 증가 항목을 기록해 이중 사용을 차단합니다.' },
          { name: '외부 처리 결과에 따라 확정(Capture) 또는 해제(Release)하기', description: '외부 처리가 성공하면 보류 잔액을 최종 출금 완료로 이동하고, 실패하면 보류 잔액을 다시 가용 잔액으로 되돌리는 역분개(Reversal) 항목을 추가합니다.' },
          { name: '고객 화면에 가용 잔액과 대기 중 내역 구분 표시하기', description: '지갑 화면에 지금 바로 쓸 수 있는 가용 잔액과 출금·정산 대기 중인 보류 금액을 분리해 보여주고, 각 원장 내역의 상태를 안내합니다.' },
        ],
        pitfalls: [
          { name: '외부 출금 API 응답을 받은 뒤에야 지갑 잔액을 차감하기', description: '외부 호출이 진행되는 수 초 동안 가용 잔액을 먼저 선점(Hold)하지 않으면, 동시에 들어온 두 번째 요청도 잔액 검사를 통과해 이중 출금이 발생합니다.' },
          { name: '실패하거나 취소된 거래의 기존 원장 행을 UPDATE·DELETE로 지우기', description: '과거 원장 행을 수정하거나 삭제하면 감사 추적과 일마감 대사가 깨지므로, 취소·실패는 반드시 반대 방향의 새 원장 행(역분개)으로 기록해야 합니다.' },
          { name: '같은 멱등성 키에 다른 금액을 담아 보낸 요청을 검증 없이 통과시키기', description: '클라이언트가 실수로 멱등성 키를 재사용하면서 금액·수취인을 바꿨을 때는 이전 결과를 그대로 주지 말고 매개변수 불일치 오류로 거부해야 합니다.' },
        ],
        questions: [
          '지갑에서 관리하는 단위는 단일 통화 예치금인가요, 아니면 유상 충전금과 무상 적립 포인트를 분리해 차감 우선순위를 두나요?',
          '출금이나 결제 대기 중 선점(Hold)된 금액은 고객 화면에서 총잔액과 가용 잔액으로 어떻게 나누어 표시하나요?',
          '멱등성 키는 클라이언트가 생성해 전달하나요, 그리고 서버에서 멱등성 키를 얼마 동안 보관·검증하나요?',
          '보류(Hold) 상태로 멈춰 있는 미결 거래는 최대 얼마 후 자동 만료 또는 대사 점검 대상으로 전환하나요?',
          '환불이나 프로모션 회수로 인해 잔액이 부족해질 때 마이너스 잔액을 허용하나요, 차감을 차단하나요?',
        ],
        example: '예시: 유상 예치금과 무상 포인트를 별도 원장 계정으로 분리하고, 출금 요청 시 멱등성 키를 확인한 뒤 즉시 가용 잔액에서 출금 보류 계정으로 금액을 이동시키며, 외부 이체 실패 시 역분개 행을 추가해 가용 잔액을 복구하는 방식을 생각할 수 있습니다. 실제 차감 우선순위와 보류 만료 기준은 서비스 정책에 맞게 먼저 확인해야 합니다.',
        relatedDesigns: [
          { id: 'ly-sortable-data-table', reason: '지갑 원장 내역을 일시·유형(충전/보류/확정/복구)·변동 금액·변동 후 가용 잔액 순으로 정렬하고 확인하는 거래 내역 표에 참고할 수 있습니다.' },
          { id: 'inline-delete-confirmation', reason: '출금 신청 확정이나 보류 중인 요청 취소처럼 잔액 상태를 바꾸는 행동 전에 금액과 수수료를 다시 확인하는 표현에 참고할 수 있습니다.' },
        ],
        promptSnippet: '예치금·포인트 지갑의 추가 전용 복식 원장(Double-entry ledger), 멱등성 키 기반 중복 방지, 출금 대기 잔액 선점(Hold) 흐름을 설계해 줘. 먼저 지갑 계정 구분(유상 예치금/무상 포인트 등)과 차감 우선순위, 가용 잔액·보류 잔액 표시 방식, 멱등성 키 검증 및 보관 규칙, 보류 거래의 확정·복구 조건을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 가용(Available)·보류(Held)·외부 정산 계정 간의 추가 전용 복식 원장 기록 구조.\n2. 동시 요청 시 음수 잔액과 이중 출금을 막는 잠금 및 선점(Hold) 순서.\n3. 멱등성 키 중복 수신 시 동일 결과 반환 및 요청 본문 불일치 거부 규칙.\n4. 외부 처리 성공 시 확정(Capture)과 실패·타임아웃 시 역분개 복구(Release) 흐름.\n5. 지갑 잔액 요약(가용/대기), 출금·충전 실행, 원장 거래 내역 조회 화면의 연결.\n잔액 숫자 컬럼 하나만 덮어쓰거나 원장 행을 직접 삭제하는 방식을 가정하지 말고, 예시 정책과 디자인 데모를 실제 금융 원장·결제망 구현으로 간주하지 말아 줘.',
      },
      en: {
        domain: 'Fintech, Transfers & Wallet',
        title: 'Wallet double-entry ledgers, idempotency keys and pending withdrawal holds',
        summary: 'Record wallet movements in an append-only double-entry ledger, separate available balance from held funds, and block duplicate debits with idempotency keys.',
        overview: 'Updating a single mutable balance column with in-place additions and subtractions makes it impossible to audit balance history and leaves wallets vulnerable to race-condition double spends. Financial and loyalty wallets should record every movement as immutable double-entry ledger rows, place an immediate hold on available funds before calling external payout networks, and enforce idempotency keys on every mutation. These concepts are design references, not a substitute for regulated accounting or banking rules.',
        concepts: [
          { name: 'Append-only double-entry ledger', description: 'Never update or delete historical transaction rows; record every credit, debit, hold and release as balanced debit/credit entries across internal and external accounts.' },
          { name: 'Available, Held and Total balance separation', description: 'Move funds from the user’s available bucket into a pending-hold bucket before initiating an asynchronous withdrawal or purchase so concurrent requests cannot spend the same funds twice.' },
          { name: 'Idempotency keys with payload fingerprinting', description: 'Require a unique idempotency key per mutation request; return the stored result on network retries and reject requests that reuse a key with different parameters.' },
          { name: 'Serialized balance guards against negative balances', description: 'Acquire a row lock or enforce atomic conditional checks when placing a hold so concurrent requests cannot drive available balance below zero.' },
        ],
        workflow: [
          { name: 'Check idempotency key and lock available balance', description: 'Look up the idempotency key first; for new requests, lock the wallet sub-account and verify that available funds cover the requested amount plus fees.' },
          { name: 'Place an atomic hold before external network calls', description: 'Write ledger entries moving the amount from Available to Held and commit the hold before invoking any external payout or payment API.' },
          { name: 'Capture or release the hold via compensating entries', description: 'When settlement succeeds, move funds from Held to Settled; if the external call fails, append a reversal entry returning funds from Held to Available.' },
          { name: 'Display available versus pending funds clearly in the UI', description: 'Show users both their spendable available balance and any pending holds, along with a chronological ledger statement.' },
        ],
        pitfalls: [
          { name: 'Deducting wallet balance only after the external payout API returns', description: 'If available balance is not held before the network call, two parallel withdrawal requests will both pass the balance check and drain the wallet twice.' },
          { name: 'Deleting or updating ledger rows when a transaction fails or is canceled', description: 'Mutating historical ledger rows breaks auditability and reconciliation; always append a new reversal entry to undo a prior hold.' },
          { name: 'Returning a cached success when a client reuses an idempotency key with a new amount', description: 'Compare a hash of the request parameters alongside the idempotency key and return a conflict error if the payload changed.' },
        ],
        questions: [
          'Does the wallet hold a single balance bucket, or separate buckets (such as paid cash deposits versus promotional points) with a deduction order?',
          'How are total balance, available spendable balance and pending held amounts presented to the user?',
          'How are idempotency keys generated, and how long does the server retain them for deduplication?',
          'What happens if a pending hold remains unresolved past the expected settlement window?',
          'Can post-settlement refunds or clawbacks ever push a wallet into a negative balance, or are they blocked?',
        ],
        example: 'Example: a wallet could separate paid deposits from promotional credits, require a client-generated UUID idempotency key stored for 24 hours, atomically move requested withdrawal funds from Available to Held before calling the bank rail, and append a reversal entry if the transfer fails. Confirm bucket priority and hold timeout rules first.',
        relatedDesigns: [
          { id: 'ly-sortable-data-table', reason: 'A reference for displaying an immutable wallet statement with sortable timestamps, entry types (credit, hold, capture, release), amounts and running available balances.' },
          { id: 'inline-delete-confirmation', reason: 'A reference for confirming a payout submission or canceling a cancellable hold inline with clear amount and fee details.' },
        ],
        promptSnippet: 'Help design a digital wallet with an append-only double-entry ledger, idempotency protection and pending withdrawal holds. First confirm wallet sub-accounts (cash deposits vs promo points) and deduction order, how available versus held balances are shown, idempotency key retention and conflict rules, and how pending holds are captured or released. Do not assume undecided rules.\nBased on the answers, describe:\n1. The append-only double-entry ledger schema across Available, Held and Settlement accounts.\n2. Locking and pre-authorization hold steps that prevent race-condition double spends and negative balances.\n3. Idempotency key deduplication and parameter-mismatch rejection behavior.\n4. Capture entries on settlement success and compensating reversal entries on failure.\n5. How the balance summary card, withdrawal/top-up form and ledger statement table connect.\nDo not overwrite a single balance column in place or delete ledger rows, and do not mistake example policies or design demos for real banking or accounting infrastructure.',
      },
    },
    sources: [
      { title: 'Stripe Engineering — Designing Robust and Predictable APIs with Idempotency', url: 'https://stripe.com/blog/idempotency' },
      { title: 'Martin Fowler — Accounting Patterns (Double Entry & Posting Rules)', url: 'https://martinfowler.com/apsupp/accounting.pdf' },
    ],
  },
  {
    id: 'fintech-bank-transfer-pending-and-reconciliation',
    aliases: {
      ko: ['계좌 이체 송금 상태', '송금 처리 중 타임아웃', '불능 반송 처리', '원장 대사 불일치', '수취인 예금주 조회'],
      en: ['bank transfer settlement states', 'transfer timeout handling', 'return and rejection codes', 'ledger reconciliation mismatch', 'beneficiary account verification'],
    },
    useCases: {
      ko: [
        '송금 실행 전 수취 은행·계좌번호의 예금주 실명을 조회해 오송금을 예방할 때',
        '외부 이체망 응답이 지연되거나 타임아웃이 났을 때 즉시 실패로 단정하지 않고 처리 중(Pending)으로 두고 최종 결과를 조회할 때',
        '수취 계좌 해지·입금 한도 초과 등으로 사후 불능(반송) 통지가 왔을 때 원장을 역분개하고 고객에게 안내할 때',
        '내부 지갑 원장과 외부 은행·결제망의 일일 정산 내역을 대사(Reconciliation)해 누락·불일치 건을 찾을 때',
      ],
      en: [
        'Verifying the recipient account holder name before submitting a bank payout or peer transfer',
        'Keeping transfers in a pending state on network timeouts and querying the settlement status before retrying or refunding',
        'Handling asynchronous bank rejections or returns (such as closed accounts or limit blocks) with ledger reversals',
        'Reconciling internal ledger transactions against external bank settlement files to detect missing or mismatched records',
      ],
    },
    keywords: {
      ko: ['계좌 이체', '송금', '예금주 조회', '처리 지연', '타임아웃', '이체 불능', '자금 반송', '원장 대사', '정산 불일치'],
      en: ['bank transfer', 'payout', 'account name inquiry', 'pending settlement', 'network timeout', 'transfer rejection', 'returned funds', 'reconciliation', 'settlement mismatch'],
    },
    text: {
      ko: {
        domain: '핀테크·송금·지갑',
        title: '계좌 이체·송금의 접수·처리 중·불능 상태와 대사(Reconciliation) 불일치',
        summary: '수취 계좌 확인 후 이체를 접수하고, 통신 타임아웃 시 처리 중 상태로 두어 결과 조회로 확정하며, 사후 불능과 일일 대사 불일치를 처리합니다.',
        overview: '계좌 이체와 대외 송금은 외부 은행망·공동망을 거치기 때문에 요청 즉시 최종 성공 여부가 확정되지 않는 경우가 많습니다. 특히 이체 요청 중 응답 지연(타임아웃)이 발생했을 때 섣불리 실패로 처리하고 잔액을 돌려주거나 자동 재발송하면, 실제로는 첫 요청이 은행에서 성공해 자금이 두 번 나가는 치명적인 사고가 발생합니다. 타임아웃은 반드시 결과 미확정(처리 중) 상태로 두고 이체 결과 조회로 확정해야 하며, 일일 대사(Reconciliation)로 내부 원장과 대외 정산 파일을 맞춰야 합니다. 아래 개념은 송금·대사 설계를 위한 참고이며 특정 은행 전문 규격을 고정하지 않습니다.',
        concepts: [
          { name: '수취 계좌 예금주 확인(Pre-validation)과 점검 시간 대비', description: '출금 지시 전에 수취 은행 상태(자정 전후 은행 점검 시간 여부)와 계좌 유효성·예금주명을 먼저 조회해 잘못된 계좌로의 이체 시도를 줄입니다.' },
          { name: '타임아웃 시 처리 중(Pending) 격리와 단건 결과 조회', description: '이체 전문 전송 후 응답이 오지 않거나 지연되면 절대 즉시 실패·환급 처리하지 않고 처리 중 상태로 고정한 뒤, 원거래 고유번호로 은행 측 처리 결과를 조회해 확정합니다.' },
          { name: '즉시 거절과 사후 불능(자금 반송) 분리', description: '요청 시점에 바로 거부된 건과, 일단 접수되었으나 수취 은행 사유(계좌 해지, 압류, 입금 한도 초과 등)로 뒤늦게 불능·반송 통지가 오는 건의 복구 절차를 구분합니다.' },
          { name: '일일 원장 대사(Reconciliation)와 불일치 소명 큐', description: '내부 원장의 송금 완료·실패 내역과 외부 은행·중계기관의 정산 내역을 대조해 금액 불일치, 상태 불일치, 한쪽 누락 건을 검출하고 운영자 확인 큐로 분리합니다.' },
        ],
        workflow: [
          { name: '은행 점검 여부 및 수취 예금주명 확인하기', description: '송금 대상 은행이 점검 시간인지 확인하고, 예금주 조회를 통해 수취인 이름을 화면에 표시해 사용자가 최종 확인하게 합니다.' },
          { name: '보류 선점 후 이체 요청 전송 및 처리 중 상태 안내하기', description: '지갑 잔액을 선점(Hold)하고 고유 거래번호로 이체를 요청하며, 응답 지연 시 고객에게 중복 송금하지 말라는 안내와 함께 처리 중 상태를 표시합니다.' },
          { name: '결과 조회·웹훅으로 최종 완료 또는 불능 복구 확정하기', description: '이체 성공 확인 시 보류 잔액을 확정 차감하고, 거절 또는 사후 불능 확인 시 역분개로 가용 잔액을 복구하며 실패 사유와 수수료 반환 여부를 안내합니다.' },
          { name: '정산 파일 대사 실행 및 불일치 건 조치하기', description: '주기적으로 대외 정산 데이터와 내부 원장을 비교해 일치 건을 마감하고, 불일치 건은 원인(지연 반영, 누락, 수수료 차이)을 확인해 조정 분개를 기록합니다.' },
        ],
        pitfalls: [
          { name: '이체 API 타임아웃 발생 시 자동으로 새 거래번호를 따서 재요청하거나 즉시 잔액을 돌려주기', description: '은행에서는 이미 출금이 실행되었는데 타임아웃만 난 경우, 즉시 환급하거나 새 번호로 재전송하면 자금 이중 유출이 발생합니다.' },
          { name: '은행 정기·임시 점검 시간에 들어온 요청을 안내 없이 실패시켜 사용자 재시도를 유발하기', description: '점검 시간에는 해당 은행을 사전에 표시하고 예약 송금으로 받을지 점검 종료 후 시도하도록 안내할지 명확히 해야 합니다.' },
          { name: '내부 원장 상태만 믿고 외부 정산 내역과의 대사(Reconciliation)를 생략하기', description: '웹훅 유실이나 망 장애로 내부 상태와 실제 은행 출금 내역이 달라질 수 있으므로 정기 대사 없이는 자금 오차를 발견할 수 없습니다.' },
        ],
        questions: [
          '송금 실행 전에 수취 계좌 예금주 실명 조회가 필수인가요, 그리고 본인 명의 계좌로만 출금을 제한하나요?',
          '은행 점검 시간(자정 전후 등)에 송금을 요청하면 즉시 차단하고 안내하나요, 점검 종료 후 실행되는 예약 접수 기능을 두나요?',
          '외부 이체망 응답 타임아웃이 발생했을 때 몇 분 간격으로 결과 조회를 수행하며, 고객에게는 어떻게 안내하나요?',
          '이체 불능(사후 반송) 발생 시 이체 수수료도 함께 환급되나요, 그리고 고객에게 어떤 사유까지 노출하나요?',
          '내부 원장과 외부 기관 정산 내역의 대사(Reconciliation)는 어떤 주기로 수행하며, 불일치 발견 시 누구에게 알림을 보내나요?',
        ],
        example: '예시: 수취 예금주 조회 확인 후에만 송금 버튼을 활성화하고, 이체 응답이 10초 내 오지 않으면 처리 중 상태로 두어 고객의 중복 시도를 막은 채 단건 결과 조회로 성공·실패를 확정하며, 매일 새벽 전일 은행 정산 내역과 내부 원장을 대사해 불일치 건을 운영 큐에 올리는 방식을 생각할 수 있습니다. 실제 점검 시간 처리와 대사 주기는 연동 기관 규격에 맞게 먼저 확인해야 합니다.',
        relatedDesigns: [
          { id: 'ly-activity-timeline', reason: '송금 접수, 은행 처리 중(지연 안내), 수취 계좌 입금 완료 또는 불능 반송으로 인한 잔액 복구 단계를 시간순으로 명확히 보여줄 때 참고할 수 있습니다.' },
          { id: 'ly-expandable-data-rows', reason: '운영자 대사(Reconciliation) 화면에서 불일치 거래 행을 펼쳐 내부 원장 상태·금액과 외부 은행 정산 전문의 차이를 비교할 때 참고할 수 있습니다.' },
        ],
        promptSnippet: '계좌 이체·송금의 예금주 확인, 처리 중(타임아웃) 상태 관리, 사후 불능 복구와 원장 대사(Reconciliation) 흐름을 설계해 줘. 먼저 수취 예금주 조회 및 본인 계좌 제한 여부, 은행 점검 시간 대응 방식, 이체 타임아웃 시 결과 조회 주기와 안내 문구, 사후 불능 시 잔액·수수료 복구 규칙, 내부 원장과 외부 정산 데이터의 대사 주기를 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 예금주 확인 완료·이체 접수·처리 중(결과 미확정)·이체 완료·즉시 거절·사후 불능 반송 상태 전이.\n2. 통신 타임아웃 발생 시 즉시 환급·재전송을 금지하고 원거래 조회로 확정하는 안전 규칙.\n3. 은행 점검 시간 안내 및 사후 불능 통지 수신 시 원장 역분개(잔액·수수료 복구) 흐름.\n4. 내부 원장과 외부 정산 파일 대조(누락·금액 차이·상태 불일치 검출) 및 조정 절차.\n5. 수취 계좌 입력/예금주 확인, 송금 진행 현황 안내, 운영자 대사 불일치 관리 화면의 연결.\n이체 타임아웃을 즉시 실패로 간주해 잔액을 복구하지 말고, 예시 정책과 디자인 데모를 실제 금융결제원·은행 전문 연동으로 간주하지 말아 줘.',
      },
      en: {
        domain: 'Fintech, Transfers & Wallet',
        title: 'Bank transfer initiation, pending settlement, rejection codes and ledger reconciliation',
        summary: 'Verify recipient accounts before submission, isolate network timeouts in a pending state until status inquiry confirms the outcome, and reconcile internal ledgers against bank settlement files.',
        overview: 'Bank transfers and payouts cross external clearing rails where final settlement is not always instantaneous. Above all, a network timeout during transfer submission does not mean the transfer failed—releasing held funds or retrying with a new transaction ID on timeout risks sending money twice if the first call actually succeeded at the bank. Isolate timeouts in a pending state, resolve them via status inquiry, handle asynchronous bank returns, and run regular ledger reconciliation. These concepts are design references, not a specific clearinghouse protocol.',
        concepts: [
          { name: 'Pre-transfer beneficiary verification and maintenance windows', description: 'Verify the recipient bank status (including nightly bank maintenance windows) and confirm the account holder name before locking funds and submitting the payout.' },
          { name: 'Timeout isolation (Pending state) and status polling', description: 'When a transfer call times out or returns an indeterminate network error, keep the funds held in a Pending state and query the bank using the original transaction reference before deciding to complete or reverse.' },
          { name: 'Synchronous rejections versus asynchronous bank returns', description: 'Distinguish immediate validation rejections from transfers that were initially accepted by the rail but later returned due to a closed, frozen or limit-exceeded recipient account.' },
          { name: 'Automated ledger reconciliation and exception queues', description: 'Compare internal ledger records against external bank settlement statements on a schedule to flag missing entries, amount discrepancies or status mismatches for operator resolution.' },
        ],
        workflow: [
          { name: 'Check bank availability and verify recipient account holder', description: 'Warn users if the destination bank is in a scheduled maintenance window, and display the verified beneficiary name for explicit confirmation before submission.' },
          { name: 'Hold funds, submit transfer and guide pending timeouts safely', description: 'Place a wallet hold and submit the transfer with a unique reference; if the rail responds slowly, show a clear Pending status warning the user not to submit a duplicate transfer.' },
          { name: 'Confirm final settlement or reverse on rejection/return', description: 'Finalize the debit once settlement is confirmed, or append a reversal entry restoring principal (and applicable fees) if a status check or webhook reports a rejection or return.' },
          { name: 'Run settlement reconciliation and resolve exception items', description: 'Match internal transactions against external bank settlement files, mark matched rows as reconciled, and route mismatches to an exception review queue.' },
        ],
        pitfalls: [
          { name: 'Treating a transfer API timeout as a definite failure and immediately refunding or retrying with a new ID', description: 'If the bank processed the first request before the connection dropped, refunding the hold or sending a new transfer ID causes a double payout.' },
          { name: 'Failing silently during nightly bank maintenance windows', description: 'Without upfront bank maintenance detection, users repeatedly retry failed transfers around midnight; surface maintenance hours clearly or offer scheduled queueing.' },
          { name: 'Relying solely on real-time webhooks without batch settlement reconciliation', description: 'Dropped webhooks or delayed bank adjustments leave the internal ledger out of sync with actual cash movement unless caught by scheduled reconciliation.' },
        ],
        questions: [
          'Is beneficiary account-holder name verification mandatory before submitting a transfer, and are payouts restricted to same-name accounts?',
          'How should transfer requests submitted during a destination bank’s maintenance window be handled (blocked with notice vs queued)?',
          'When a transfer submission times out, what is the status inquiry schedule and what message is shown to the user?',
          'When a transfer is asynchronously returned by the recipient bank, are transfer fees refunded alongside the principal?',
          'How often does ledger reconciliation run against external settlement files, and how are mismatches resolved?',
        ],
        example: 'Example: a payout flow could require beneficiary name confirmation, place timeouts into a Pending state that blocks duplicate retries while polling the original transaction ID, restore both principal and fee via a reversal entry on bank return, and run a daily reconciliation job comparing internal ledger rows against the bank settlement file. Confirm rail timeout rules and reconciliation schedules first.',
        relatedDesigns: [
          { id: 'ly-activity-timeline', reason: 'A reference for showing the customer whether a transfer is initiated, pending bank confirmation, completed or returned with funds restored.' },
          { id: 'ly-expandable-data-rows', reason: 'A reference for inspecting reconciliation exception rows side by side with internal ledger fields and external settlement records.' },
        ],
        promptSnippet: 'Help design a bank transfer and payout workflow covering beneficiary verification, timeout handling, asynchronous returns and ledger reconciliation. First confirm beneficiary verification rules, bank maintenance-window handling, timeout status-inquiry intervals, fee refund policy on returned transfers, and reconciliation frequency. Do not assume undecided rules.\nBased on the answers, describe:\n1. State transitions across verified, initiated, pending confirmation, settled, rejected and asynchronously returned.\n2. Safety rules prohibiting immediate refunds or new-ID retries when a transfer call times out.\n3. Handling bank maintenance windows and ledger reversal entries when funds are returned.\n4. Matching internal ledger records against external settlement files and resolving reconciliation mismatches.\n5. How the recipient verification form, transfer status timeline and operator reconciliation console connect.\nNever treat an external transfer timeout as a confirmed failure, and do not mistake example policies or design demos for live banking rail integrations.',
      },
    },
    sources: [
      { title: 'Stripe Docs — Payouts life cycle, failures and returns', url: 'https://docs.stripe.com/payouts#payout-status' },
      { title: 'Modern Treasury Journal — Why Reconciliation Matters in Payment Operations', url: 'https://www.moderntreasury.com/journal/reconciliation' },
    ],
  },
  {
    id: 'fintech-fx-quote-expiration-and-slippage',
    aliases: {
      ko: ['환율 견적 유효시간', 'FX Quote 만료 재조회', '환전 수수료 스프레드 고지', '송금액 수취액 고정 기준', '환율 변동 재확인'],
      en: ['FX quote expiration window', 'locked exchange rate TTL', 're-quoting on expiry', 'fee and spread disclosure', 'send-amount versus receive-amount lock'],
    },
    useCases: {
      ko: [
        '실시간으로 변하는 환율·시세를 일정 시간(예: 30초~5분) 동안만 고정해 주는 견적(Quote)을 발급할 때',
        '사용자가 송금 확인을 누르기 전에 견적 유효 시간이 만료되었을 때 새 환율로 재조회하고 변경 금액 동의를 다시 받을 때',
        '보내는 금액(송금액)을 고정할지 상대방이 받는 금액(수취액)을 고정할지 선택하게 할 때',
        '적용 환율, 환전 스프레드, 송금 수수료, 예상 수취액을 계산서 형태로 투명하게 분리해 표시할 때',
      ],
      en: [
        'Issuing a time-bounded FX quote (with a unique quote ID and expiration timestamp) that locks an exchange rate briefly',
        'Prompting the user to review and accept a refreshed quote when the locked rate expires before confirmation',
        'Supporting both fixed send-amount (source-locked) and fixed receive-amount (target-locked) calculations',
        'Breaking down mid-market rate, FX spread, transfer fees and final net recipient amount clearly before execution',
      ],
    },
    keywords: {
      ko: ['환율 견적', 'FX Quote', '유효 시간', '카운트다운', '환율 재조회', '송금 수수료', '스프레드', '수취 금액 고정', '환율 변동 허용치'],
      en: ['fx quote', 'exchange rate lock', 'quote expiration', 'countdown timer', 'requote', 'transfer fee breakdown', 'fx spread', 'target amount lock', 'rate slippage'],
    },
    text: {
      ko: {
        domain: '핀테크·송금·지갑',
        title: '환율·시세 고정 견적(Quote) 유효 시간·만료 후 재조회와 수수료 고지',
        summary: '고정 환율과 수수료를 담은 견적(Quote ID)에 유효 시간을 부여하고, 만료 시 새 견적을 재확인받으며 송금액·수취액 고정 기준을 구분합니다.',
        overview: '해외 송금이나 다중 통화 환전에서는 사용자가 금액을 입력하는 동안에도 시장 환율이 계속 변합니다. 화면에 보여준 환율과 실제 결제 시점의 환율이 달라 분쟁이 생기는 것을 막으려면, 서버가 고유한 견적 번호(Quote ID)와 만료 시각(TTL)을 발급해 그 시간 동안은 해당 환율과 수취 금액을 보장해야 합니다. 반대로 만료 시각이 지난 뒤에는 임의로 바뀐 환율로 출금하지 않고 갱신된 견적을 보여준 뒤 다시 동의를 받아야 합니다. 아래 개념은 환율 견적·수수료 고지 설계를 위한 참고이며 특정 외환 규제를 기본값으로 가정하지 않습니다.',
        concepts: [
          { name: '견적 식별자(Quote ID)와 유효 시간(TTL)', description: '단순히 화면에 환율 숫자만 내려주지 않고, 통화 쌍·적용 환율·수수료·만료 시각이 묶인 서버 견적(Quote ID)을 발급해 실행 요청 시 그 ID로 검증합니다.' },
          { name: '송금액 고정(Source-locked) vs 수취액 고정(Target-locked)', description: '내가 지불할 원화 금액을 고정하고 외화 수취액을 계산할지, 상대방이 정확히 받아야 할 외화 금액(예: 학비·인보이스 금액)을 고정하고 필요한 지불액을 역산할지 구분합니다.' },
          { name: '견적 만료 후 자동 출금 차단과 재견적(Re-quote) 확인', description: '만료 시각이 지난 Quote ID로 실행 요청이 오면 거부하고, 갱신된 환율·수취액과 이전 견적 대비 변동폭을 보여준 뒤 사용자가 다시 확인 버튼을 누르게 합니다.' },
          { name: '수수료·환율 명세(Fee Breakdown) 투명 고지', description: '전체 지불액에서 고정 송금 수수료, 환전 수수료(또는 적용 환율), 실제 환전 대상 금액, 최종 수취액을 단계별로 분리해 표시합니다.' },
        ],
        workflow: [
          { name: '통화 쌍과 고정 기준(송금액/수취액) 입력받아 견적 발급하기', description: '출발·도착 통화와 금액, 고정 기준을 입력받아 서버에서 Quote ID, 적용 환율, 수수료 명세, 만료 시각을 생성해 반환합니다.' },
          { name: '남은 유효 시간 표시 및 수수료·수취액 명세 안내하기', description: '화면에 견적 유효 카운트다운과 함께 수수료 차감 후 환전 금액, 적용 환율, 상대방 최종 수취액을 명확히 보여줍니다.' },
          { name: '만료 전 확정 실행 또는 만료 시 새 견적 재동의 받기', description: '유효 시간 내에 확정하면 해당 Quote ID의 조건으로 잔액을 선점하고, 시간이 지났으면 새 Quote를 발급해 변동된 금액을 확인받습니다.' },
          { name: '확정된 견적 스냅샷을 거래 원장에 함께 보존하기', description: '실행이 완료되면 당시 적용된 Quote ID, 기준 환율, 수수료 내역을 원장 거래에 영구히 연결해 사후 조회와 영수증 발급에 사용합니다.' },
        ],
        pitfalls: [
          { name: '견적 만료 후 사용자 확인 없이 바뀐 시장 환율로 그대로 출금하기', description: '사용자가 확인한 금액보다 더 많은 돈이 빠져나가거나 수취액이 줄어들면 신뢰 문제와 민원이 발생하므로 만료 시 재확인을 거쳐야 합니다.' },
          { name: '클라이언트가 계산해서 보낸 환율·수취액을 서버에서 그대로 믿기', description: '클라이언트 요청 본문의 환율 값을 그대로 쓰면 조작 위험이 있으므로, 서버에 저장된 유효한 Quote ID를 조회해 금액을 검증해야 합니다.' },
          { name: '수수료가 송금액에서 차감되는지 별도로 추가 출금되는지 모호하게 표시하기', description: '인보이스 결제를 위해 정확한 외화 수취액이 필요한데 수수료가 수취액에서 깎여 들어가면 대금 미납이 발생하므로 고정 기준을 명확히 해야 합니다.' },
        ],
        questions: [
          '발급된 환율 견적(Quote)의 유효 시간(예: 30초, 1분, 5분)은 얼마이며, 화면에서 자동 갱신하나요 수동 재조회 버튼을 두나요?',
          '사용자가 보내는 금액 고정(Source-locked)과 상대방이 받는 금액 고정(Target-locked)을 모두 지원하나요?',
          '견적이 만료되어 새 환율을 조회했을 때 환율이 사용자에게 유리하게 바뀌었거나 미세한 범위 내일 때도 재동의를 받나요?',
          '송금 수수료는 입력한 송금액 안에서 차감되나요, 아니면 송금액 외에 추가로 합산되어 출금되나요?',
          '외환 시장 마감 시간이나 주말에는 가산 마진이 붙은 환율로 즉시 견적을 내주나요, 개장 후 처리로 안내하나요?',
        ],
        example: '예시: 사용자가 송금액 또는 수취액 중 하나를 고정해 입력하면 60초간 유효한 Quote ID와 수수료·수취액 명세를 발급하고, 60초가 지나 확정을 누르면 갱신된 환율과 수취액 차이를 비교해 보여준 뒤 재동의를 받아 실행하는 방식을 생각할 수 있습니다. 실제 견적 유효 시간과 수수료 구조는 외환 공급사 규격에 맞게 먼저 확인해야 합니다.',
        relatedDesigns: [
          { id: 'dismissible-inline-banner', reason: '고정된 환율 견적이 만료되어 새 환율로 갱신되었음을 알리고 이전 금액과의 차이를 확인하도록 강조할 때 참고할 수 있습니다.' },
          { id: 'billing-cycle-pricing-card', reason: '송금액, 고정 수수료, 환전 대상 금액, 적용 환율, 최종 수취액으로 이어지는 가격·수수료 계산 명세를 구조화해 보여줄 때 참고할 수 있습니다.' },
        ],
        promptSnippet: '해외 송금·환전의 환율 고정 견적(FX Quote) 유효 시간, 만료 후 재조회(Re-quote) 동의와 수수료 명세 고지 흐름을 설계해 줘. 먼저 견적 유효 시간(TTL)과 갱신 방식, 송금액 고정(Source-locked)과 수취액 고정(Target-locked) 지원 여부, 수수료 차감 방식(송금액 내 차감 vs 별도 가산), 견적 만료 시 재동의 기준을 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 통화 쌍·고정 기준·환율·수수료·만료 시각을 담는 서버 Quote ID 발급 및 상태(유효·사용됨·만료됨).\n2. 송금액 고정 시와 수취액 고정 시 각각의 수수료·환전액·최종 지불/수취액 계산 규칙.\n3. 유효 시간 내 확정 검증과 만료 후 실행 차단, 새 견적 발급 및 변동 금액 재동의 흐름.\n4. 거래 실행 시 적용된 Quote 스냅샷의 원장 및 영수증 보존 방식.\n5. 금액 입력·통화 전환, 수수료 명세 및 카운트다운 표시, 만료 재확인 화면의 연결.\n클라이언트가 보낸 환율 수치를 서버 검증 없이 신뢰하거나 만료된 견적을 동의 없이 변경 실행하지 말고, 예시 정책과 디자인 데모를 실제 외환 시세 연동으로 간주하지 말아 줘.',
      },
      en: {
        domain: 'Fintech, Transfers & Wallet',
        title: 'FX rate quote expiration windows, re-quoting on expiry and fee breakdown disclosure',
        summary: 'Issue server-signed FX quotes with an explicit expiration window, distinguish source-locked from target-locked calculations, and require user confirmation when an expired quote refreshes.',
        overview: 'Exchange rates move continuously while a user fills out a cross-border transfer or currency conversion form. To prevent surprise debits or short-paid invoices, issue a server-side Quote ID that locks the exchange rate, fee breakdown and exact payout amount for a short countdown window. If the countdown expires before the user confirms, reject the stale quote ID, fetch a fresh quote and ask the user to confirm the updated numbers. These concepts are design references, not a regulated foreign-exchange rulebook.',
        concepts: [
          { name: 'Server-issued Quote ID and expiration window (TTL)', description: 'Bind the currency pair, locked exchange rate, fee amounts, source/target totals and expiration timestamp to an immutable server Quote ID rather than trusting client-side rate math.' },
          { name: 'Source-locked (Send amount) versus Target-locked (Receive amount)', description: 'Allow users either to fix the exact amount they want to spend (calculating what the recipient gets) or to fix the exact amount the recipient must receive (calculating the required funding total).' },
          { name: 'Stale quote rejection and explicit re-quote confirmation', description: 'Block execution requests referencing an expired Quote ID, generate a fresh quote, highlight how the rate or total changed, and require explicit re-confirmation.' },
          { name: 'Transparent fee and conversion breakdown', description: 'Itemize the transfer fee, net amount converted, applied exchange rate and final recipient payout so users see exactly how their total is calculated.' },
        ],
        workflow: [
          { name: 'Calculate and issue a time-bounded FX quote', description: 'Accept the currency pair, amount and lock side (send vs receive), then return a Quote ID with itemized fees, locked rate and server expiration timestamp.' },
          { name: 'Render countdown timer and itemized fee breakdown', description: 'Show the remaining validity window alongside the step-by-step math from gross funding amount to net converted payout.' },
          { name: 'Execute against a valid Quote ID or prompt re-confirmation on expiry', description: 'Verify on the server that the Quote ID is still unconsumed and unexpired before holding funds; if expired, present the refreshed quote for user sign-off.' },
          { name: 'Persist the executed quote snapshot on the ledger record', description: 'Store the consumed Quote ID, locked rate and fee breakdown permanently with the transaction for audit trails and customer receipts.' },
        ],
        pitfalls: [
          { name: 'Silently executing at a new market rate after the displayed quote expired', description: 'Charging more or delivering less than the confirmed screen numbers without asking the user to approve the refreshed quote causes disputes and underpaid invoices.' },
          { name: 'Accepting exchange rates passed directly from the client request body', description: 'Always look up the authoritative Quote ID on the server so clients cannot tamper with rates or replay old favorable quotes.' },
          { name: 'Ambiguity over whether fees are deducted from the send amount or added on top', description: 'When paying an exact foreign invoice, deducting fees from the principal leaves the recipient short; make source-locked versus target-locked math explicit.' },
        ],
        questions: [
          'How long does an issued FX quote remain valid, and does the UI auto-refresh or wait for user confirmation upon expiry?',
          'Can users lock either the send amount (source-locked) or the exact recipient amount (target-locked)?',
          'When a quote expires, must the user always re-confirm, or is there a tolerance band if the rate moved in their favor?',
          'Are transfer fees deducted out of the entered send amount or added on top of it?',
          'How are quotes handled during weekend market closures (wider spread instant quote vs queued execution)?',
        ],
        example: 'Example: a transfer flow could let the user lock either the send or receive amount, issue a Quote ID valid for 60 seconds with a clear fee-and-rate breakdown, and if submitted after 60 seconds, pause to display the refreshed quote and amount difference before debiting the wallet. Confirm quote TTLs and fee deduction rules with the liquidity provider first.',
        relatedDesigns: [
          { id: 'dismissible-inline-banner', reason: 'A reference for alerting the user inline when their locked FX quote has expired and showing the difference in the refreshed quote.' },
          { id: 'billing-cycle-pricing-card', reason: 'A reference for structuring a clear breakdown of gross amount, transfer fee, converted principal, exchange rate and net recipient amount.' },
        ],
        promptSnippet: 'Help design an FX quote expiration, re-quoting and fee breakdown workflow for currency conversion or cross-border transfers. First confirm quote validity duration (TTL), support for source-locked (send amount) versus target-locked (receive amount) quotes, whether fees are deducted from or added to the input amount, and re-confirmation rules when a quote expires. Do not assume undecided rules.\nBased on the answers, describe:\n1. The server Quote ID lifecycle (active, consumed, expired) and stored rate/fee fields.\n2. Calculation formulas for source-locked versus target-locked quotes.\n3. Server-side expiration checks, stale-quote rejection and the user re-confirmation flow on refreshed quotes.\n4. Persisting the consumed quote snapshot onto the transaction ledger and receipt.\n5. How the currency calculator, fee breakdown breakdown, countdown timer and re-quote confirmation UI connect.\nNever trust client-supplied exchange rates or silently execute an expired quote at a worse rate, and do not mistake example policies or design demos for live FX liquidity integrations.',
      },
    },
    sources: [
      { title: 'Wise Platform Docs — Quotes and Fixed Target vs Source Amounts', url: 'https://docs.wise.com/api-docs/features/quotes' },
      { title: 'Stripe Docs — FX Quotes API and Rate Lock Expiration', url: 'https://docs.stripe.com/payments/currencies/localize-prices/fx-quotes-api' },
    ],
  },
  {
    id: 'fintech-limit-tier-kyc-and-aml-review',
    aliases: {
      ko: ['KYC 등급별 송금 한도', '일일 월간 출금 한도', '이상 거래 수동 심사 보류', '한도 상향 본인확인', '보류 건 한도 차감 복구'],
      en: ['KYC verification tiers', 'daily and per-transaction limits', 'compliance review hold', 'step-up verification for higher limits', 'rolling limit consumption'],
    },
    useCases: {
      ko: [
        '본인확인(KYC) 완료 단계에 따라 건당·일일·월간 보유 및 송금 한도를 차등 적용할 때',
        '송금액 입력 시 남은 일일 한도를 실시간으로 대조하고 한도 초과 시 상위 단계 인증(한도 상향) 경로를 안내할 때',
        '진행 중이거나 심사 보류 중인 거래도 일일 한도 사용량에 포함해 분할 우회 시도를 막을 때',
        '고액·비정상 패턴 거래가 수동 심사(보류) 상태로 들어갔을 때 사용자 안내 문구와 소명 자료 제출·반려 환급 흐름을 설계할 때',
      ],
      en: [
        'Applying tiered per-transaction, daily and monthly transfer limits based on a user’s completed KYC verification level',
        'Checking remaining limit headroom in real time and guiding users to step-up verification when they need higher limits',
        'Counting pending and review-held transactions toward limit usage so users cannot bypass caps with parallel requests',
        'Routing flagged transactions into a compliance review hold with clear user messaging, document requests or safe reversal on rejection',
      ],
    },
    keywords: {
      ko: ['KYC 등급', '본인확인 단계', '건당 한도', '일일 한도', '잔여 한도', '한도 상향', '이상 거래 탐지', '수동 심사 보류', '소명 자료'],
      en: ['kyc tier', 'verification level', 'transaction limit', 'daily limit', 'remaining limit', 'limit upgrade', 'compliance hold', 'manual review', 'supporting documents'],
    },
    text: {
      ko: {
        domain: '핀테크·송금·지갑',
        title: '본인확인(KYC) 등급별 건당/일일 한도와 이상 거래 보류(수동 심사) 안내',
        summary: '인증 등급별 건당·누적 한도를 대기 거래까지 포함해 계산하고, 이상 거래 보류 시 추가 소명 요청과 반려 시 한도·잔액 복구를 연결합니다.',
        overview: '송금·지갑 서비스에서는 사용자 인증 수준(휴대폰 확인, 신분증·계좌 인증, 추가 소득/법인 서류 확인 등)에 따라 건당·일일·월간 한도가 다르게 적용됩니다. 이때 완료된 거래만 한도에 합산하면 동시에 여러 건을 요청해 일일 한도를 넘기는 우회가 생길 수 있으므로 대기·심사 중인 금액도 한도 선점에 포함해야 합니다. 또한 이상 거래 탐지나 규제 심사로 거래가 보류되었을 때 내부 탐지 규칙은 노출하지 않으면서도 다음 행동(대기 또는 추가 서류 제출)을 명확히 안내해야 합니다. 아래 개념은 한도·심사 흐름 설계를 위한 참고이며 특정 국가의 법적 한도 금액을 기본값으로 정하지 않습니다.',
        concepts: [
          { name: '인증(KYC) 등급별 한도 매트릭스와 상향 경로', description: '미인증·기본 인증·강화 인증 등 단계별로 보유 한도와 건당·일일·월간 출금 한도를 정의하고, 한도 초과 시 어떤 인증을 추가하면 상향되는지 연결합니다.' },
          { name: '한도 산정 기준 시각과 대기 거래 선점 합산', description: '일일 한도가 자정(00:00) 기준인지 최근 24시간 롤링 기준인지 정하고, 완료된 거래뿐 아니라 현재 처리 중·심사 보류 중인 거래 금액도 사용 한도에 먼저 합산합니다.' },
          { name: '이상 거래 심사 보류(Compliance Hold)와 사유 비노출 안내', description: '심사 기준에 걸린 거래는 즉시 실행하지 않고 보류 상태로 두며, 내부 탐지 임계값이나 구체적 혐의 규칙을 노출하지 않는 중립적인 안내 문구와 예상 소요 시간을 표시합니다.' },
          { name: '추가 소명 요청(RFI)과 심사 반려 시 잔액·한도 복구', description: '심사 중 거래 목적이나 자금 출처 증빙이 필요하면 보완 제출 상태로 전환하고, 최종 반려·취소되면 선점했던 지갑 잔액과 일일 한도 사용량을 함께 복구합니다.' },
        ],
        workflow: [
          { name: '현재 등급의 잔여 한도 표시 및 입력 금액 사전 검증하기', description: '송금 화면에서 건당 한도와 오늘 남은 한도를 보여주고, 한도를 초과하면 금액 수정 또는 상위 KYC 인증 진행 경로를 안내합니다.' },
          { name: '거래 접수 시 잔액과 기간별 한도 사용량 동시 선점하기', description: '요청이 통과되면 지갑 가용 잔액과 함께 일일·월간 한도 사용량을 원자적으로 선점해 동시 분할 요청을 통한 한도 초과를 차단합니다.' },
          { name: '심사 보류 전환 및 추가 확인 서류 접수하기', description: '수동 심사가 필요한 거래는 심사 대기 상태로 안내하고, 추가 자료가 필요하면 지정된 기한 내에 서류나 답변을 제출받습니다.' },
          { name: '심사 승인 시 송금 재개 또는 반려 시 원상 복구하기', description: '심사 통과 시 보류된 송금을 정상 집행하고, 반려 또는 기한 만료 시 선점된 잔액과 한도를 해제한 뒤 고객에게 취소 사실을 알립니다.' },
        ],
        pitfalls: [
          { name: '최종 송금 완료된 건만 일일 한도에 합산해 동시 요청 우회를 허용하기', description: '처리 중이거나 심사 대기 중인 건을 한도 계산에서 빼면, 일일 한도만 한 거래를 동시에 여러 번 접수해 모두 통과시키는 허점이 생깁니다.' },
          { name: '거래가 보류·실패로 취소되었는데 차감된 일일 한도를 돌려주지 않기', description: '실제로 송금이 이루어지지 않고 반려·실패된 건까지 한도 사용량에 계속 남겨두면 사용자는 그날 정상적인 재시도조차 할 수 없게 됩니다.' },
          { name: '이상 거래 보류 화면에 내부 탐지 룰이나 점수를 그대로 노출하기', description: '어떤 조건(특정 금액 구간, 횟수 등) 때문에 심사에 걸렸는지 상세 룰을 화면에 알려주면 악성 사용자가 이를 피해 거래를 쪼개는 힌트가 됩니다.' },
        ],
        questions: [
          '사용자 인증(KYC) 등급은 몇 단계로 나뉘며, 각 단계별 건당·일일·월간 한도는 어떻게 되나요?',
          '일일·월간 한도는 달력 기준(자정·월초 초기화)인가요, 아니면 직전 24시간·30일 롤링 기준인가요?',
          '수수료는 일일 송금 한도 계산 금액에 포함되나요, 아니면 순수 송금 원금만 기준으로 계산하나요?',
          '거래가 수동 심사(보류) 상태로 들어갔을 때 사용자가 직접 취소할 수 있나요, 심사 완료 전에는 취소도 잠기나요?',
          '심사 중 추가 소명 자료(RFI) 제출 기한은 얼마이며, 기한 내 미제출 시 거래와 계정은 어떤 상태로 바뀌나요?',
        ],
        example: '예시: 기본 인증(일 200만 원)과 신분증·계좌 인증 완료(일 2,000만 원) 등급을 구분해 자정 기준으로 한도를 계산하되 처리 중·심사 대기 금액도 한도에 선점하고, 수동 심사 보류 시 내부 탐지 규칙 노출 없이 추가 확인 절차를 안내하며 반려 시 잔액과 일일 한도를 즉시 복구하는 방식을 생각할 수 있습니다. 실제 등급별 한도와 심사 중 취소 가능 여부는 규정 준수 정책에 맞게 먼저 확인해야 합니다.',
        relatedDesigns: [
          { id: 'onboarding-progress-checklist', reason: '한도 상향을 위해 필요한 본인확인 단계(휴대폰 확인, 신분증 제출, 계좌 인증 등)의 진행 상태와 완료 시 열리는 한도 혜택을 보여줄 때 참고할 수 있습니다.' },
          { id: 'dismissible-inline-banner', reason: '현재 남은 일일 한도가 부족해 상향 인증이 필요하거나, 거래가 추가 확인(수동 심사) 단계로 접수되었음을 안내할 때 참고할 수 있습니다.' },
        ],
        promptSnippet: '본인확인(KYC) 등급별 건당·일일·월간 한도 관리와 이상 거래 수동 심사 보류(Compliance Hold)·소명 흐름을 설계해 줘. 먼저 KYC 등급 단계와 등급별 한도, 한도 산정 기간 기준(자정 초기화 vs 롤링 시간) 및 수수료 포함 여부, 대기 중 거래의 한도 선점 규칙, 수동 심사 보류 시 안내 방식과 취소 가능 여부, 추가 소명(RFI) 및 반려 시 잔액·한도 복구 절차를 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. KYC 등급별 보유·건당·일일·월간 한도 구조와 상위 등급 인증 연결.\n2. 완료 건과 처리 중·심사 보류 건을 합산한 잔여 한도 선점 및 실패/반려 시 한도 복구 규칙.\n3. 수동 심사 보류 전환, 추가 소명 자료 요청(RFI)·제출, 승인 집행 또는 반려 취소 상태 전이.\n4. 내부 탐지 규칙을 노출하지 않는 사용자 안내 문구와 심사 중 취소 제어 원칙.\n5. 송금 한도 표시 및 상향 안내, 심사 대기/보완 제출 화면, 운영자 심사 큐 화면의 연결.\n최종 완료된 거래만 한도에 합산해 동시 요청 우회를 허용하거나 내부 이상 탐지 임계값을 화면에 노출하지 말고, 예시 정책과 디자인 데모를 실제 신원 확인·규제 심사 구현으로 간주하지 말아 줘.',
      },
      en: {
        domain: 'Fintech, Transfers & Wallet',
        title: 'KYC verification tiers, daily/per-transaction limits and compliance review holds',
        summary: 'Enforce tiered per-transaction and cumulative limits that count in-flight transfers, and route flagged transactions through compliance review holds without leaking internal detection rules.',
        overview: 'Wallets and transfer services apply different per-transaction, daily and monthly limits depending on which identity verification (KYC) tier an account has completed. To prevent users from bypassing daily caps with parallel requests, pending and review-held transfers must consume limit headroom immediately upon submission—and restore it if the transfer fails or is rejected. When a transfer enters a compliance review hold, guide the user clearly on expected timelines or document requests without exposing internal fraud thresholds. These concepts are design references, not legal compliance advice.',
        concepts: [
          { name: 'KYC verification tiers and step-up upgrade paths', description: 'Define per-transaction, daily and monthly limits for each verification tier (such as basic phone verification, ID + bank verification, enhanced verification) and show how completing the next step unlocks higher caps.' },
          { name: 'Calendar versus rolling windows and in-flight limit reservation', description: 'Specify whether daily limits reset at midnight or over a rolling 24-hour window, and reserve limit headroom for pending and review-held transactions alongside completed ones.' },
          { name: 'Compliance review holds and safe user messaging', description: 'Place flagged transfers into an under-review state while keeping funds and limit usage held, and display neutral status guidance without revealing internal risk scores or rule thresholds.' },
          { name: 'Requests for information (RFI) and rejection restoration', description: 'Allow compliance teams to request supporting documents within a deadline, resume execution upon approval, or release both held wallet funds and consumed limit headroom if rejected or canceled.' },
        ],
        workflow: [
          { name: 'Display remaining tier headroom and prompt step-up verification when exceeded', description: 'Show the user’s current per-transaction and remaining daily limit on the transfer form, and offer a direct path to upgrade KYC if the entered amount exceeds their tier.' },
          { name: 'Reserve both wallet funds and cumulative limit headroom atomically', description: 'Check and increment in-flight limit usage inside the same atomic guard as the wallet hold so concurrent requests cannot exceed the daily cap.' },
          { name: 'Route flagged transfers to review hold and collect RFI documents', description: 'Transition flagged transfers to Under Review, notify the user of expected review timing, and collect any requested supporting documents if an RFI is issued.' },
          { name: 'Release to settlement on approval or restore balance and limits on rejection', description: 'Forward approved transfers to the payout rail, or append reversal entries restoring both wallet available balance and daily/monthly limit headroom if rejected.' },
        ],
        pitfalls: [
          { name: 'Counting only settled transfers toward daily limits', description: 'If pending or review-held transfers do not reserve limit headroom immediately, a user can submit multiple parallel requests and exceed their daily cap.' },
          { name: 'Failing to restore daily limit headroom when a transfer fails or is rejected', description: 'If a failed bank transfer still consumes the user’s daily limit, they are blocked from making a legitimate retry with a corrected account number.' },
          { name: 'Exposing exact fraud rule triggers or risk scores in the customer UI', description: 'Telling a user the exact dollar threshold or velocity rule that triggered a review teaches bad actors how to structure transactions just below the radar.' },
        ],
        questions: [
          'What are the KYC verification tiers, and what per-transaction, daily and monthly limits apply to each tier?',
          'Do daily and monthly limits reset on a fixed calendar boundary or use a rolling 24-hour / 30-day window?',
          'Do transfer fees count toward the daily limit cap, or only the principal transfer amount?',
          'While a transfer is held for compliance review, can the user self-cancel it or is cancellation locked until review finishes?',
          'If additional supporting documents (RFI) are requested, what is the submission deadline and what happens on expiry?',
        ],
        example: 'Example: a service might enforce a Tier 1 daily cap and a higher Tier 2 cap resetting at midnight, reserve limit headroom as soon as a transfer enters Pending or Under Review, prompt for supporting documents within 72 hours when an RFI is needed without exposing risk rules, and restore both wallet balance and daily headroom if a transfer fails. Confirm regulatory tiers and review policies first.',
        relatedDesigns: [
          { id: 'onboarding-progress-checklist', reason: 'A reference for showing completed versus remaining identity verification steps and the limit tiers each step unlocks.' },
          { id: 'dismissible-inline-banner', reason: 'A reference for informing the user when an entered amount exceeds their current tier limit or when a transfer requires additional review.' },
        ],
        promptSnippet: 'Help design KYC tier-based transfer limits and compliance review hold workflows. First confirm KYC tiers and limit caps, calendar-reset versus rolling-window calculation, whether fees count toward limits, in-flight limit reservation rules, whether users can cancel review-held transfers, and RFI document collection and rejection restoration behavior. Do not assume undecided rules.\nBased on the answers, describe:\n1. The limit matrix across KYC tiers and step-up verification upgrade paths.\n2. Atomic reservation of daily/monthly limit headroom across pending, under-review and settled states, plus restoration on failure.\n3. Compliance review hold transitions, RFI document requests and approval versus rejection handling.\n4. Safe user-facing status messaging that does not leak internal detection thresholds.\n5. How the transfer form limit indicator, KYC upgrade checklist, RFI upload view and operator review queue connect.\nDo not count only settled transfers toward limits, do not expose internal fraud rules in the UI, and do not mistake example policies or design demos for real identity verification or AML systems.',
      },
    },
    sources: [
      { title: 'Stripe Docs — Identity Verification and Risk Review Flows', url: 'https://docs.stripe.com/identity' },
      { title: 'FINTRAC / FATF Guidance — Digital Identity and Tiered CDD Controls', url: 'https://www.fatf-gafi.org/en/publications/Fatfrecommendations/Guidance-on-digital-identity.html' },
    ],
  },
  {
    id: 'fintech-recurring-autodebit-mandate-and-insufficient-funds',
    aliases: {
      ko: ['자동이체 출금 동의', 'Mandate 해지 관리', '잔액 부족 재출금', '부분 출금 금지', '자동납부 사전 알림'],
      en: ['direct-debit mandate', 'autodebit authorization', 'insufficient-funds retry schedule', 'all-or-nothing atomic debit', 'pre-debit notification'],
    },
    useCases: {
      ko: [
        '정기 회비·월세·구독료 등을 위해 계좌나 지갑에서 주기적으로 출금하는 자동이체 동의(Mandate)를 등록·해지할 때',
        '출금 예정일 전에 예정 금액과 날짜를 사전 고지하고, 출금 처리 시작 후의 해지 요청 적용 시점을 구분할 때',
        '출금일에 잔액이 부족할 때 보유 잔액만 일부 빼가지 않고 전액 실패 처리(부분 출금 금지)한 뒤 지정된 재출금 일정에 따라 다시 시도할 때',
        '연속 잔액 부족으로 재출금까지 모두 실패했을 때 납부 미납 전환 및 자동이체 일시정지·해지 규칙을 적용할 때',
      ],
      en: [
        'Registering, pausing or revoking a recurring direct-debit mandate with clear authorization records',
        'Sending pre-debit notices ahead of the scheduled debit date and defining the cutoff before which a mandate edit or revocation stops the upcoming cycle',
        'Enforcing atomic full-amount debits (never draining a partial balance when funds are short) and scheduling bounded retry dates',
        'Transitioning to past-due status or suspending the mandate after consecutive insufficient-fund failures',
      ],
    },
    keywords: {
      ko: ['자동이체', '출금 동의', 'Mandate', '사전 출금 알림', '잔액 부족', '재출금 일정', '부분 출금 금지', '동의 해지 마감', '미납 전환'],
      en: ['direct debit', 'autodebit mandate', 'recurring transfer', 'pre-debit notice', 'insufficient funds', 'retry schedule', 'atomic full debit', 'mandate revocation cutoff', 'past due'],
    },
    text: {
      ko: {
        domain: '핀테크·송금·지갑',
        title: '자동이체 출금 동의(Mandate) 해지·잔액 부족 시 재출금과 부분 출금 금지',
        summary: '출금 동의(Mandate)의 활성·해지 마감 시점을 관리하고, 출금일 잔액 부족 시 부분 차감 없이 전액 실패 처리한 뒤 약정된 재출금 일정을 실행합니다.',
        overview: '자동이체·정기 출금은 사용자가 매번 버튼을 누르지 않아도 정해진 날짜에 자금이 빠져나가는 구조이므로, 유효한 출금 동의(Mandate) 관리와 사전 안내가 핵심입니다. 특히 10만 원을 출금해야 하는 날 계좌나 지갑에 3만 원만 있을 때 그 3만 원만 임의로 빼가면 정산이 꼬이고 약관 위반이 되기 쉬우므로 반드시 전액 출금 또는 전액 실패(All-or-nothing)로 처리해야 합니다. 또한 은행에 이미 출금 파일이 넘어간 뒤에 들어온 해지 요청이 당회차에 적용되는지 다음 회차부터 적용되는지 명확히 구분해야 합니다. 아래 개념은 자동이체·재출금 설계를 위한 참고이며 특정 결제망 약관을 기본값으로 강제하지 않습니다.',
        concepts: [
          { name: '출금 동의(Mandate) 수명주기와 회차별 마감 시각(Cutoff)', description: '동의 등록·활성·일시정지·해지 상태를 관리하고, 출금 예정일 며칠/몇 시간 전까지 해지·계좌 변경을 해야 이번 회차 출금이 멈추는지 마감 기준을 둡니다.' },
          { name: '전액 출금 원칙( 부분 출금 금지 )', description: '청구 금액보다 가용 잔액이 부족하면 보유 잔액 일부만 차감하지 않고 해당 시도를 잔액 부족 실패로 기록해 원금 정합성을 유지합니다.' },
          { name: '잔액 부족 재출금(Retry) 일정과 한도', description: '1차 출금이 잔액 부족으로 실패했을 때 즉시 무한 반복 호출하지 않고, 정해진 재시도 영업일(예: D+3, D+5)과 최대 횟수에 맞춰 재출금을 예약합니다.' },
          { name: '영구 거절 사유(계좌 해지·동의 철회)와 연속 실패 처리', description: '잔액 부족 같은 일시적 실패와 계좌 해지·동의 철회 같은 영구 실패를 구분해, 영구 실패 시에는 재출금을 즉시 중단하고 수단 변경을 요청합니다.' },
        ],
        workflow: [
          { name: '출금 한도·주기 확인 후 자동이체 동의(Mandate) 등록하기', description: '출금 계좌/지갑, 청구 기관, 주기, 최대 출금 한도를 고지하고 본인 확인을 거쳐 고유한 동의 번호(Mandate ID)를 발급합니다.' },
          { name: '출금 예정 사전 알림 발송 및 마감 전 변경·해지 반영하기', description: '출금일 전에 예정 금액과 일자를 안내하고, 출금 지시 마감(Cutoff) 이전의 해지·일시정지 요청은 이번 회차부터 즉시 반영합니다.' },
          { name: '전액 출금 실행 및 잔액 부족 시 재출금 예약하기', description: '유효한 Mandate ID를 확인해 전액 출금을 시도하고, 잔액 부족 시 부분 차감 없이 실패 기록 후 다음 재출금 예정일과 안내 알림을 생성합니다.' },
          { name: '재출금 최종 실패 시 미납 전환 및 직접 납부 연결하기', description: '약정된 재출금 횟수를 모두 소진하거나 영구 거절 코드가 오면 해당 회차를 미납으로 확정하고 사용자가 즉시 수동 납부하거나 계좌를 바꿀 수 있게 안내합니다.' },
        ],
        pitfalls: [
          { name: '잔액이 부족할 때 남아 있는 잔액만큼만 임의로 부분 출금하기', description: '별도 약정 없이 계좌에 남은 돈을 일부만 긁어가면 고객은 잔액이 0원이 되고도 미납 상태가 되어 큰 분쟁이 발생합니다.' },
          { name: '이미 출금 전문이 은행으로 넘어간 뒤 해지했는데 화면에 이번 달 출금이 안 된다고 안내하기', description: '마감 시각 이후의 해지는 다음 회차부터 적용된다는 사실을 명시하지 않으면 해지 완료 문구를 본 고객이 당일 출금을 오류로 오해합니다.' },
          { name: '계좌 해지나 동의 철회로 거절된 건에도 잔액 부족처럼 재출금을 계속 시도하기', description: '영구 거절 사유에도 재출금 배치를 계속 돌리면 불필요한 수수료와 기관 제재가 발생하므로 즉시 동의 상태를 비활성화해야 합니다.' },
        ],
        questions: [
          '출금 예정일 며칠 전에 고객에게 사전 출금 안내 알림을 보내나요?',
          '고객이 자동이체를 해지하거나 출금 계좌를 변경할 때, 당회차 출금을 막을 수 있는 마감 시점(Cutoff)은 언제인가요?',
          '출금일에 잔액이 부족할 때 재출금을 몇 회, 어떤 간격(예: 익영업일, 3영업일 후)으로 시도하나요?',
          '재출금 대기 중에 고객이 수동으로 즉시 납부하면 예약된 재출금 배치는 어떻게 취소되나요?',
          '연속 몇 회 출금 실패 시 자동이체 동의(Mandate) 자체를 일시정지하거나 해지 전환하나요?',
        ],
        example: '예시: 출금 3영업일 전에 예정 금액을 안내하고 출금 전일 18시 이전 해지 시 당회차 출금을 중단하며, 당일 잔액 부족 시 부분 출금 없이 전액 실패 처리 후 D+3 영업일에 1회만 재출금하고 그사이 수동 납부 완료 시 재출금 예약을 자동 취소하는 방식을 생각할 수 있습니다. 실제 마감 시각과 재출금 일정은 출금 기관 규정에 맞게 먼저 확인해야 합니다.',
        relatedDesigns: [
          { id: 'ly-activity-timeline', reason: '사전 출금 안내, 1차 출금 시도(잔액 부족 실패), 재출금 예정일 안내, 재출금 성공 또는 수동 납부 완료로 이어지는 회차별 이력을 보여줄 때 참고할 수 있습니다.' },
          { id: 'inline-delete-confirmation', reason: '자동이체 동의(Mandate)를 해지하거나 출금 계좌를 바꿀 때 이번 회차 적용 여부(마감 시각 기준)와 미납 주의사항을 재확인하는 표현에 참고할 수 있습니다.' },
        ],
        promptSnippet: '자동이체 출금 동의(Mandate) 등록·해지, 잔액 부족 시 재출금 일정과 부분 출금 금지 흐름을 설계해 줘. 먼저 사전 출금 알림 시점, 당회차 출금 중단이 가능한 해지·변경 마감 시점(Cutoff), 잔액 부족 시 재출금 횟수와 영업일 간격, 재출금 대기 중 수동 납부 시 중복 출금 방지 규칙, 영구 거절 코드 및 연속 실패 시 동의 상태 처리를 확인하고 미정인 규칙을 가정하지 말아 줘.\n확인한 내용을 바탕으로 다음을 정리해 줘.\n1. 출금 동의(Mandate) 상태(활성·일시정지·해지·실패 정지)와 회차별 출금 마감(Cutoff) 적용 기준.\n2. 잔액 부족 시 부분 차감을 금지하는 전액 출금(All-or-nothing) 원자성 규칙.\n3. 일시적 실패(잔액 부족)의 재출금 스케줄링과 영구 실패(계좌 해지·동의 철회)의 즉시 중단 분기.\n4. 재출금 대기 중 고객의 수동 즉시 납부 시 예약된 재출금 취소 및 이중 출금 차단 흐름.\n5. 자동이체 동의 관리, 회차별 출금·재출금 일정 안내, 해지/계좌 변경 및 수동 납부 화면의 연결.\n잔액이 부족할 때 가용 잔액 일부만 임의로 출금하거나 마감 이후 해지를 당회차 즉시 중단으로 안내하지 말고, 예시 정책과 디자인 데모를 실제 출금이체망(CMS/오픈뱅킹) 연동으로 간주하지 말아 줘.',
      },
      en: {
        domain: 'Fintech, Transfers & Wallet',
        title: 'Direct-debit mandates, insufficient-fund retries and atomic full-amount debiting',
        summary: 'Manage direct-debit mandate lifecycles and revocation cutoffs, enforce all-or-nothing full-amount debits when funds are short, and schedule bounded retries.',
        overview: 'Recurring direct debits pull funds on a schedule based on a stored customer authorization (Mandate). Two rules are critical: first, never partially drain whatever small balance happens to sit in the account when the full bill cannot be covered—debits must be atomic all-or-nothing; second, clearly distinguish whether a mandate cancellation happens before or after the current cycle’s bank submission cutoff so users know whether the upcoming debit will still occur. These concepts are design references, not a specific clearinghouse rulebook.',
        concepts: [
          { name: 'Mandate lifecycle and per-cycle submission cutoffs', description: 'Track mandate states (active, paused, revoked, invalidated) and define the exact cutoff timestamp before a scheduled debit date after which an in-flight batch can no longer be halted.' },
          { name: 'Atomic full-amount debiting (No partial sweep)', description: 'Require the full scheduled debit amount to succeed atomically; if available funds are short by even one unit, fail the attempt cleanly rather than taking a partial balance.' },
          { name: 'Bounded insufficient-funds retry schedule', description: 'Schedule automatic retries on specific future business days (such as D+3 or D+5) for temporary insufficient-funds failures instead of hammering the account continuously.' },
          { name: 'Permanent rejection codes versus temporary NSF failures', description: 'Distinguish temporary insufficient funds (NSF) from permanent bank rejections (closed account, revoked mandate) so permanent failures immediately suspend retries and prompt payment method replacement.' },
        ],
        workflow: [
          { name: 'Capture authorization and issue a Mandate ID', description: 'Present the debit schedule, maximum amount terms and account details, verify the account holder, and store an auditable Mandate ID.' },
          { name: 'Send pre-debit notices and enforce cutoff rules on edits/revocations', description: 'Notify the user ahead of the scheduled debit date, and clearly indicate when a cancellation or account change will take effect (current cycle vs next cycle).' },
          { name: 'Attempt atomic full debit and schedule bounded NSF retries', description: 'Verify the mandate is active, attempt the full debit amount, and on insufficient funds record the failure and schedule the next business-day retry with a customer notification.' },
          { name: 'Cancel pending retries on manual payment or transition to past-due', description: 'If the user pays the cycle manually while a retry is scheduled, cancel the pending retry job immediately; if all retries fail, mark the cycle past-due.' },
        ],
        pitfalls: [
          { name: 'Partially debiting whatever balance is available when funds are insufficient', description: 'Sweeping a partial balance leaves the customer with an empty account and an unpaid bill, violating standard direct-debit expectations.' },
          { name: 'Confirming a mandate cancellation without warning that an already submitted debit will still run', description: 'If the bank batch file was already sent before the user clicked cancel, tell them clearly that the current debit is already in flight and cancellation applies from the next cycle.' },
          { name: 'Retrying closed-account or revoked-mandate errors on the NSF schedule', description: 'Retrying permanent rejection codes wastes rail fees and triggers compliance penalties; halt retries immediately on permanent codes.' },
        ],
        questions: [
          'How many days before a scheduled debit is a pre-debit notification sent to the user?',
          'What is the exact cutoff time before the debit date for canceling or changing the funding account for the current cycle?',
          'When a debit fails due to insufficient funds, how many retries are attempted and on which business-day intervals?',
          'If a user manually pays an overdue or pending cycle, how is the scheduled automatic retry canceled to prevent a double debit?',
          'After how many consecutive failed cycles is the mandate automatically paused or terminated?',
        ],
        example: 'Example: a service could send a pre-debit notice 3 business days ahead, apply cancellations made before 6:00 PM on the prior business day to the current cycle, enforce all-or-nothing full debits with a single retry at D+3 business days on insufficient funds, and immediately cancel the retry if the user pays manually in the meantime. Confirm clearing rail cutoff times and retry rules first.',
        relatedDesigns: [
          { id: 'ly-activity-timeline', reason: 'A reference for showing the cycle timeline from pre-debit notice and initial insufficient-funds attempt to the scheduled retry date or manual payment completion.' },
          { id: 'inline-delete-confirmation', reason: 'A reference for confirming mandate revocation inline while explicitly stating whether the upcoming cycle has already passed the cutoff.' },
        ],
        promptSnippet: 'Help design a recurring direct-debit mandate, revocation cutoff and insufficient-funds retry workflow. First confirm pre-debit notice timing, the cutoff timestamp for stopping the current cycle’s debit, retry counts and business-day intervals for insufficient funds, cancellation of pending retries when paid manually, and handling of permanent rejection codes. Do not assume undecided rules.\nBased on the answers, describe:\n1. Mandate lifecycle states and cutoff rules separating current-cycle versus next-cycle changes.\n2. Atomic all-or-nothing full-amount debit enforcement prohibiting partial balance sweeps.\n3. Branching between temporary insufficient-funds retries and permanent rejection code suspension.\n4. Canceling scheduled retry jobs when a user settles the cycle manually.\n5. How the mandate settings view, upcoming debit/retry timeline, revocation confirmation and manual payment fallback connect.\nNever debit a partial balance on insufficient funds, and do not mistake example policies or design demos for live clearinghouse or open-banking integrations.',
      },
    },
    sources: [
      { title: 'Stripe Docs — SEPA and ACH Direct Debit Mandates and Retries', url: 'https://docs.stripe.com/payments/sepa-debit' },
      { title: 'GoCardless Developer Docs — Mandates, Cutoffs and Retry Timelines', url: 'https://developer.gocardless.com/getting-started/api/introduction/' },
    ],
  },
];
