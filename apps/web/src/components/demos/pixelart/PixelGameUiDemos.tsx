import { useState, useRef, useEffect, useId, type KeyboardEvent } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';
import { useDemoAutoplayRunning } from '../../../hooks/useDemoAutoplay';
import { usePixelAnimation } from './usePixelAnimation';

/* ============================================================================
 * 13. 하트와 실드 체력 HUD (px-hud-health-shield-bar)
 * ============================================================================ */
export function PixelHudHealthShieldBarDemo() {
  const { t } = useLocale();
  const isAllowed = useDemoAutoplayRunning();
  const [health, setHealth] = useState(8); // 총 10 (하트 5개 x 2반칸)
  const [shield, setShield] = useState(4); // 총 4개 마름모 실드
  const [feedback, setFeedback] = useState<{ value: number | 'shield' } | null>(null);
  const [shake, setShake] = useState(false);
  const id = useId();

  useEffect(() => {
    if (!shake) return;
    if (!isAllowed) {
      setShake(false);
      return;
    }
    const timer = setTimeout(() => setShake(false), 200);
    return () => clearTimeout(timer);
  }, [shake, isAllowed]);

  // 피드백 제거 타이머: 새 이벤트 발생 시 타이머 재설정 및 언마운트 cleanup
  useEffect(() => {
    if (!feedback) return;
    const timer = setTimeout(() => setFeedback(null), 900);
    return () => clearTimeout(timer);
  }, [feedback]);

  const takeDamage = (amount: number) => {
    if (isAllowed) {
      setShake(true);
    }

    setFeedback({ value: -amount });

    // 실드 먼저 소모 후 체력 소모
    const shieldDmg = Math.min(shield, Math.floor(amount / 20));
    const healthDmg = Math.ceil((amount - shieldDmg * 20) / 10);

    setShield((s) => Math.max(0, s - shieldDmg));
    setHealth((h) => Math.max(1, h - healthDmg));
  };

  const heal = (amount: number) => {
    setFeedback({ value: amount });
    setHealth((h) => Math.min(10, h + 3));
  };

  const rechargeShield = () => {
    setFeedback({ value: 'shield' });
    setShield(4);
  };

  const isLowHealth = health <= 3;

  return (
    <div className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demo.additions.pixelart.hudArtwork')}
      >
        <rect width="264" height="144" fill="#090d16" />

        {/* 저체력 위험 붉은 비네트 경고 */}
        {isLowHealth && (
          <rect
            width="264"
            height="144"
            fill="none"
            stroke="#ef4444"
            strokeWidth="6"
            opacity="0.6"
            className="animate-pulse"
          />
        )}

        {/* 상단 고정 전용 위치 피드백 수치 (두 줄의 하트·실드·캐릭터, 프레임과 분리) */}
        {feedback && (
          <text
            x="132"
            y="18"
            fill={feedback.value === 'shield' ? '#38bdf8' : feedback.value < 0 ? '#f43f5e' : '#22c55e'}
            fontSize="14"
            fontWeight="900"
            fontFamily="monospace"
            textAnchor="middle"
            dominantBaseline="central"
          >
            {feedback.value === 'shield'
              ? t('demo.additions.pixelart.shieldRecharge')
              : feedback.value > 0 ? `+${feedback.value}` : feedback.value}
          </text>
        )}

        {/* HUD 상태창 무대 (피격 시 shake) */}
        <g
          transform={`translate(${shake ? 134 : 132}, 68)`}
          aria-hidden="true"
        >
          {/* HUD 베이스 패널 */}
          <rect x="-114" y="-40" width="228" height="80" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />

          {/* 좌측: 플레이어 아바타 배지 (LV.07) */}
          <g transform="translate(-86, 0)">
            <rect x="-20" y="-24" width="40" height="48" rx="4" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
            {/* 픽셀 얼굴 실루엣 */}
            <rect x="-12" y="-16" width="24" height="24" fill="#38bdf8" />
            <rect x="-8" y="-12" width="4" height="4" fill="#ffffff" />
            <rect x="4" y="-12" width="4" height="4" fill="#ffffff" />
            {/* 레벨 텍스트 바 */}
            <rect x="-16" y="14" width="32" height="6" fill="#fbbf24" />
          </g>

          {/* 우측 상단: 5개 분할 하트 (Heart Row - 중심 x=12, 간격 step=26 정렬) */}
          <g transform="translate(12, -18)">
            {[0, 1, 2, 3, 4].map((i) => {
              const heartValue = health - i * 2;
              const isFull = heartValue >= 2;
              const isHalf = heartValue === 1;

              return (
                <g key={i} transform={`translate(${(i - 2) * 26}, 0)`}>
                  {/* 빈 하트 바탕 */}
                  <path
                    d="M-8 -6 L-4 -10 L0 -6 L4 -10 L8 -6 L8 0 L0 8 L-8 0 Z"
                    fill="#334155"
                    stroke="#0f172a"
                    strokeWidth="1.5"
                  />
                  {/* 꽉 찬 하트 */}
                  {isFull && (
                    <path
                      d="M-8 -6 L-4 -10 L0 -6 L4 -10 L8 -6 L8 0 L0 8 L-8 0 Z"
                      fill="#ef4444"
                    />
                  )}
                  {/* 반쪽 하트 */}
                  {isHalf && (
                    <path
                      d="M-8 -6 L-4 -10 L0 -6 L0 8 L-8 0 Z"
                      fill="#ef4444"
                    />
                  )}
                  {/* 하이라이트 도트 */}
                  {(isFull || isHalf) && <rect x="-5" y="-7" width="2" height="2" fill="#ffffff" />}
                </g>
              );
            })}
          </g>

          {/* 우측 하단: 4개 다이아몬드 보호막 (Shield Pips - 중심 x=12, 간격 step=26 일치) */}
          <g transform="translate(12, 12)">
            {[0, 1, 2, 3].map((i) => {
              const isCharged = shield > i;
              return (
                <g key={i} transform={`translate(${(i - 1.5) * 26}, 0)`}>
                  <polygon
                    points="0,-8 8,0 0,8 -8,0"
                    fill={isCharged ? '#0284c7' : '#1e293b'}
                    stroke={isCharged ? '#38bdf8' : '#475569'}
                    strokeWidth="1.5"
                  />
                  {isCharged && <polygon points="0,-4 4,0 0,4 -4,0" fill="#bae6fd" />}
                </g>
              );
            })}
          </g>
        </g>
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            onClick={() => takeDamage(25)}
            className="px-btn"
          >
            {t('demo.additions.pixelart.damage25')}
          </button>

          <button
            type="button"
            onClick={() => takeDamage(50)}
            className="px-btn"
          >
            {t('demo.additions.pixelart.damage50')}
          </button>
        </div>

        <div className="px-btn-row">
          <button
            type="button"
            onClick={() => heal(35)}
            className="px-btn"
          >
            {t('demo.additions.pixelart.heal35')}
          </button>

          <button
            type="button"
            onClick={rechargeShield}
            className="px-btn"
          >
            {t('demo.additions.pixelart.shieldRecharge')}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 14. 인벤토리 칸 선택기 (px-inventory-grid-selector)
 * ============================================================================ */
export function PixelInventoryGridSelectorDemo() {
  const { t } = useLocale();
  const [selectedSlot, setSelectedSlot] = useState(0);
  const slotRefs = useRef<(SVGGElement | null)[]>([]);
  const id = useId();

  // 12칸 인벤토리 데이터 (4열 x 3행): 단순 원이 아닌 오리지널 픽셀 스프라이트!
  const items = [
    { type: 'ore' },
    { type: 'potion' },
    { type: 'key' },
    { type: 'chest' },
    null, null, null, null, null, null, null, null,
  ];

  const getItemName = (type: string) => {
    if (type === 'ore') return t('demo.additions.pixelart.itemOre');
    if (type === 'potion') return t('demo.additions.pixelart.itemPotion');
    if (type === 'key') return t('demo.additions.pixelart.itemKey');
    if (type === 'chest') return t('demo.additions.pixelart.itemChest');
    return '';
  };

  const getItemDesc = (type: string) => {
    if (type === 'ore') return t('demo.additions.pixelart.itemOreDesc');
    if (type === 'potion') return t('demo.additions.pixelart.itemPotionDesc');
    if (type === 'key') return t('demo.additions.pixelart.itemKeyDesc');
    if (type === 'chest') return t('demo.additions.pixelart.itemChestDesc');
    return '';
  };

  // 각 아이템의 실제 점유 바운드(occupied bounds) 중심 앵커
  // ore: [1..15, 1..15] -> (8, 8)
  // potion: [1..15, 1..16] -> (8, 8.5)
  // key: [1.5..10.5, 1.5..15.5] -> (6, 8.5) (16x16 캔버스 중심이 아니므로 앵커로 보정)
  // chest: [1..15, 1..15] -> (8, 8)
  const ITEM_ANCHORS: Record<string, { cx: number; cy: number }> = {
    ore: { cx: 8, cy: 8 },
    potion: { cx: 8, cy: 8.5 },
    key: { cx: 6, cy: 8.5 },
    chest: { cx: 8, cy: 8 },
  };

  const currentItem = items[selectedSlot];

  // 16x16 오리지널 픽셀 스프라이트 렌더러
  const renderItemSprite = (type: string, scale = 1) => {
    if (type === 'ore') {
      return (
        <g transform={`scale(${scale})`}>
          <polygon points="8,1 15,6 12,15 3,14 1,7" fill="#0284c7" stroke="#0369a1" strokeWidth="0.75" />
          <polygon points="8,1 15,6 9,9" fill="#38bdf8" />
          <polygon points="8,1 9,9 1,7" fill="#bae6fd" />
          <polygon points="9,9 12,15 3,14" fill="#0284c7" />
          <rect x="5" y="4" width="2" height="2" fill="#ffffff" />
        </g>
      );
    }
    if (type === 'potion') {
      return (
        <g transform={`scale(${scale})`}>
          <rect x="6" y="1" width="4" height="2" fill="#b45309" />
          <path d="M5 3 H11 V6 H13 L15 13 C15 15 13 16 8 16 C3 16 1 15 1 13 L3 6 H5 Z" fill="#991b1b" stroke="#450a0a" strokeWidth="0.75" />
          <path d="M3 11 Q8 9 13 11 L13 14 C13 15 11 15 8 15 C5 15 3 15 3 14 Z" fill="#ef4444" />
          <rect x="4" y="6" width="1.5" height="4" fill="#ffffff" opacity="0.6" />
        </g>
      );
    }
    if (type === 'key') {
      return (
        <g transform={`scale(${scale})`}>
          <circle cx="6" cy="6" r="4.5" fill="#facc15" stroke="#78350f" strokeWidth="0.75" />
          <circle cx="6" cy="6" r="2" fill="#090d16" />
          <rect x="5" y="10" width="2" height="5" fill="#facc15" />
          <rect x="7" y="12" width="2" height="1.5" fill="#facc15" />
          <rect x="7" y="14" width="2" height="1.5" fill="#facc15" />
          <rect x="5" y="4" width="1.5" height="1.5" fill="#ffffff" />
        </g>
      );
    }
    if (type === 'chest') {
      return (
        <g transform={`scale(${scale})`}>
          <path d="M1 5 C1 2 4 1 8 1 C12 1 15 2 15 5 V15 H1 Z" fill="#78350f" stroke="#291404" strokeWidth="0.75" />
          <rect x="4" y="2" width="2" height="13" fill="#475569" />
          <rect x="10" y="2" width="2" height="13" fill="#475569" />
          <rect x="6.5" y="7" width="3" height="4" fill="#facc15" />
          <rect x="7.5" y="9" width="1" height="1" fill="#090d16" />
        </g>
      );
    }
    return null;
  };

  // 4x3 인벤토리 그리드 키보드 이동: 로빙 tabindex와 실제 SVG 컨트롤 focus() 연동
  const handleKeyDown = (e: KeyboardEvent, index: number) => {
    const col = index % 4;
    const row = Math.floor(index / 4);
    let nextIndex: number;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextIndex = row * 4 + ((col + 1) % 4);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      nextIndex = row * 4 + ((col - 1 + 4) % 4);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = ((row + 1) % 3) * 4 + col;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = ((row - 1 + 3) % 3) * 4 + col;
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedSlot(index);
      return;
    } else {
      return;
    }

    setSelectedSlot(nextIndex);
    slotRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="group"
        aria-label={t('demo.additions.pixelart.inventoryArtwork')}
      >
        <rect width="264" height="144" fill="#090d16" aria-hidden="true" />

        {/* 좌측: 4열 x 3행 가방 슬롯 (단일 규격 산출: x=12, y=12, 폭 148, 높이 120, 슬롯 간격 32) */}
        <g transform="translate(12, 12)">
          <rect width="148" height="120" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="2" aria-hidden="true" />

          {Array.from({ length: 12 }).map((_, i) => {
            const col = i % 4;
            const row = Math.floor(i / 4);
            const x = 12 + col * 32;
            const y = 14 + row * 32;
            const isSelected = selectedSlot === i;
            const item = items[i];

            const slotLabel = t('demo.additions.pixelart.itemSlot', {
              index: i + 1,
              name: item ? getItemName(item.type) : t('demo.additions.pixelart.emptySlot'),
            });

            return (
              <g
                key={i}
                ref={(el) => {
                  slotRefs.current[i] = el;
                }}
                data-demo-control
                role="button"
                tabIndex={isSelected ? 0 : -1}
                aria-label={slotLabel}
                aria-pressed={isSelected}
                onClick={() => {
                  setSelectedSlot(i);
                  slotRefs.current[i]?.focus();
                }}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="px-cell-btn"
              >
                {/* 슬롯 베벨 사각형 (28x28, 간격 4, 피치 32) */}
                <rect x={x} y={y} width="28" height="28" rx="3" fill="#0f172a" stroke="#475569" strokeWidth="1" aria-hidden="true" />

                {/* 슬롯 내부 아이템: occupied bounds 중심을 슬롯 중심(x+14, y+14)에 정확히 일치 */}
                {item && (
                  <g
                    transform={`translate(${x + 14 - ITEM_ANCHORS[item.type].cx}, ${y + 14 - ITEM_ANCHORS[item.type].cy})`}
                    aria-hidden="true"
                  >
                    {renderItemSprite(item.type, 1)}
                  </g>
                )}

                {/* 선택 커서 모서리 골드 브래킷 [ ] (셀 안쪽 inset 2px로 셀 폭·간격 유지) */}
                {isSelected && (
                  <g stroke="#facc15" strokeWidth="2" fill="none" aria-hidden="true">
                    <path d={`M${x + 2} ${y + 8} V${y + 2} H${x + 8}`} />
                    <path d={`M${x + 26} ${y + 8} V${y + 2} H${x + 20}`} />
                    <path d={`M${x + 2} ${y + 20} V${y + 26} H${x + 8}`} />
                    <path d={`M${x + 26} ${y + 20} V${y + 26} H${x + 20}`} />
                  </g>
                )}
              </g>
            );
          })}
        </g>

        {/* 우측: 상세 정보창 (단일 규격 산출: x=170, y=12, 폭 82, 높이 120 - 좌측 패널과 밑선·높이 완전 일치) */}
        <g transform="translate(170, 12)" aria-hidden="true">
          <rect width="82" height="120" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />

          {currentItem ? (
            <g transform="translate(41, 28)">
              {/* 확대된 2x 아이템 스프라이트 (occupied bounds 중심을 (0,0)에 일치) */}
              <g transform={`translate(${-ITEM_ANCHORS[currentItem.type].cx * 2}, ${-ITEM_ANCHORS[currentItem.type].cy * 2})`}>
                {renderItemSprite(currentItem.type, 2)}
              </g>

              {/* 아이템 이름 텍스트 */}
              <text
                x="0"
                y="30"
                fill="#facc15"
                fontSize="11"
                fontWeight="bold"
                textAnchor="middle"
              >
                {getItemName(currentItem.type)}
              </text>

              {/* 속성 배지 박스 */}
              <rect x="-36" y="40" width="72" height="20" rx="3" fill="#0f172a" stroke="#334155" strokeWidth="1" />
              <text
                x="0"
                y="54"
                fill="#38bdf8"
                fontSize="9"
                fontWeight="bold"
                textAnchor="middle"
              >
                {getItemDesc(currentItem.type)}
              </text>
            </g>
          ) : (
            <g transform="translate(41, 60)">
              <text
                x="0"
                y="0"
                fill="#64748b"
                fontSize="11"
                fontWeight="bold"
                textAnchor="middle"
              >
                {t('demo.additions.pixelart.emptySlot')}
              </text>
            </g>
          )}
        </g>
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            onClick={() => setSelectedSlot((s) => (s + 1) % 12)}
            className="px-btn"
          >
            {t('demo.additions.pixelart.nextSlot')}
          </button>

          <button
            type="button"
            onClick={() => setSelectedSlot(0)}
            className="px-btn"
          >
            {t('demo.additions.pixelart.firstSlot')}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 15. 픽셀 RPG 대화창 (px-rpg-dialog-typewriter)
 * ============================================================================ */
const DIALOG_SCRIPT_KEYS = [
  'demo.additions.pixelart.dialog1',
  'demo.additions.pixelart.dialog2',
  'demo.additions.pixelart.dialog3',
] as const;

export function PixelRpgDialogTypewriterDemo() {
  const { t } = useLocale();
  const isAllowed = useDemoAutoplayRunning();
  const [dialogIdx, setDialogIdx] = useState(0);
  const [displayedChars, setDisplayedChars] = useState(0);
  const [typewriter, setTypewriter] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentScript = t(DIALOG_SCRIPT_KEYS[dialogIdx]);
  const typewriterActive = typewriter && isAllowed;
  const shownChars = typewriterActive ? displayedChars : currentScript.length;
  const isTyping = typewriterActive && shownChars < currentScript.length;
  const mouthOpen = isTyping && shownChars % 2 === 1;

  usePixelAnimation(
    () => setDisplayedChars((prev) => Math.min(currentScript.length, prev + 1)),
    isTyping ? 60 : null,
    containerRef
  );

  const advance = () => {
    setDialogIdx((prev) => (prev + 1) % DIALOG_SCRIPT_KEYS.length);
    setDisplayedChars(0);
  };

  const toggleTypewriter = () => {
    setTypewriter((prev) => !prev);
    setDisplayedChars(0);
  };

  return (
    <div ref={containerRef} className="px-demo-container">
      <div className="px-dialog-frame">
        <svg className="px-dialog-portrait" viewBox="0 0 52 52" aria-hidden="true">
          <g transform="translate(0, 9)">
            <circle cx="26" cy="22" r="14" fill="#fed7aa" />
            <path d="M14 26 Q26 48 38 26 Z" fill="#f1f5f9" />
            <rect x="19" y="18" width="3" height="3" fill="#0f172a" />
            <rect x="30" y="18" width="3" height="3" fill="#0f172a" />
            <rect x="24" y="26" width="4" height={mouthOpen ? 4 : 2} fill="#991b1b" />
            <polygon points="12,14 26,-4 40,14" fill="#6366f1" />
            <rect x="10" y="12" width="32" height="3" fill="#818cf8" />
          </g>
        </svg>
        <div className="px-dialog-content">
          <strong className="px-dialog-speaker">{t('demo.additions.pixelart.speakerName')}</strong>
          <p className="px-dialog-line">
            <span className="sr-only">{currentScript}</span>
            <span aria-hidden="true">
              {currentScript.slice(0, shownChars)}
              <span className="invisible">{currentScript.slice(shownChars)}</span>
            </span>
          </p>
        </div>
      </div>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button type="button" onClick={advance} className="px-btn gap-1">
            {t('demo.additions.pixelart.nextDialog')}
            <svg viewBox="0 0 10 8" width="10" height="8" aria-hidden="true">
              <path d="M1 2h8L5 7z" fill="currentColor" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setDisplayedChars(0)}
            disabled={!typewriterActive}
            className="px-btn px-dialog-action"
          >
            {t('demo.additions.pixelart.replayDialog')}
          </button>
        </div>
        <div className="px-btn-row">
          <button
            type="button"
            onClick={toggleTypewriter}
            disabled={!isAllowed}
            aria-pressed={typewriterActive}
            className={`px-btn px-dialog-action ${typewriterActive ? 'px-btn-active' : ''}`}
          >
            {t('demo.additions.pixelart.typewriterEffect')}
            <span aria-hidden="true">
              {typewriterActive ? t('demo.additions.pixelart.typewriterOn') : t('demo.additions.pixelart.typewriterOff')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 16. 상태 반응 픽셀 미니맵 (px-minimap-radar)
 * ============================================================================ */
export function PixelMinimapRadarDemo() {
  const { t } = useLocale();
  const [player, setPlayer] = useState({ x: 12, y: 12 });
  const [fogActive, setFogActive] = useState(true);
  const [pingActive, setPingActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!pingActive) return;
    const timer = setTimeout(() => {
      setPingActive(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [pingActive]);

  const move = (dx: number, dy: number) => {
    setPlayer((prev) => ({
      x: Math.max(3, Math.min(20, prev.x + dx)),
      y: Math.max(3, Math.min(20, prev.y + dy)),
    }));
  };

  // 소나 핑 트리거 (1회 펄스 후 effect cleanup 타이머로 자동 종료)
  const triggerPing = () => {
    setPingActive(true);
  };

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demo.additions.pixelart.minimapArtwork')}
      >
        <rect width="264" height="144" fill="#090d16" />

        {/* 24x24 던전 레이더 맵 (중앙 x=132, y=14, 크기 116x116) */}
        <g transform="translate(74, 14)" aria-hidden="true">
          {/* 미니맵 프레임 */}
          <rect width="116" height="116" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />

          {/* 던전 외곽 벽체 및 복도 통로 디테일 */}
          <rect x="12" y="12" width="92" height="6" fill="#475569" />
          <rect x="12" y="12" width="6" height="92" fill="#475569" />
          <rect x="98" y="12" width="6" height="92" fill="#475569" />
          <rect x="12" y="98" width="92" height="6" fill="#475569" />

          {/* 내부 격실 벽체 (방 4개와 십자 복도) */}
          <rect x="18" y="48" width="34" height="6" fill="#334155" />
          <rect x="64" y="48" width="34" height="6" fill="#334155" />
          <rect x="48" y="18" width="6" height="30" fill="#334155" />
          <rect x="48" y="68" width="6" height="30" fill="#334155" />

          {/* 던전 입구 포탈 랜드마크 */}
          <rect x="14" y="20" width="8" height="8" fill="#38bdf8" opacity="0.6" />
          <rect x="16" y="22" width="4" height="4" fill="#ffffff" />

          {/* 보물상자 점 (금빛 픽셀) */}
          <rect x="80" y="26" width="6" height="6" fill="#facc15" />
          <rect x="82" y="28" width="2" height="2" fill="#0f172a" />

          {/* 적 몬스터 블립 (적색 픽셀) */}
          <rect x="28" y="74" width="6" height="6" fill="#ef4444" />

          {/* 전장의 안개 오버레이 */}
          {fogActive && (
            <g>
              <rect width="116" height="116" fill="#000000" opacity="0.88" mask={`url(#fog-mask-${id})`} />
              <mask id={`fog-mask-${id}`}>
                <rect width="116" height="116" fill="#ffffff" />
                {/* 플레이어 시야 원 */}
                <circle cx={player.x * 4.8} cy={player.y * 4.8} r="30" fill="#000000" />
              </mask>
            </g>
          )}

          {/* 레이더 소나 핑 (단발성 펄스, 모션 감소 대응) */}
          {pingActive && (
            <circle
              cx={player.x * 4.8}
              cy={player.y * 4.8}
              r="36"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
              className="animate-ping motion-reduce:animate-none"
            />
          )}

          {/* 플레이어 마커 및 시야 원뿔 */}
          <circle cx={player.x * 4.8} cy={player.y * 4.8} r="4" fill="#facc15" stroke="#090d16" strokeWidth="1" />
          <polygon
            points={`${player.x * 4.8},${player.y * 4.8} ${player.x * 4.8 - 12},${player.y * 4.8 - 18} ${player.x * 4.8 + 12},${player.y * 4.8 - 18}`}
            fill="#facc15"
            opacity="0.35"
          />
        </g>
      </svg>

      <div className="px-ctrl-bar">
        {/* 방향 버튼 그룹: 4방향을 하나의 독립된 조작 그룹으로 분리 */}
        <div className="px-btn-row">
          <button type="button" onClick={() => move(0, -2)} className="px-btn" aria-label={t('demo.additions.pixelart.moveUp')}>▲</button>
          <button type="button" onClick={() => move(0, 2)} className="px-btn" aria-label={t('demo.additions.pixelart.moveDown')}>▼</button>
          <button type="button" onClick={() => move(-2, 0)} className="px-btn" aria-label={t('demo.additions.pixelart.moveLeft')}>◄</button>
          <button type="button" onClick={() => move(2, 0)} className="px-btn" aria-label={t('demo.additions.pixelart.moveRight')}>►</button>
        </div>

        {/* 기능 버튼 그룹: 안개 토글 및 레이더 핑 */}
        <div className="px-btn-row">
          <button
            type="button"
            onClick={() => setFogActive(!fogActive)}
            className={`px-btn ${fogActive ? 'px-btn-active' : ''}`}
            aria-pressed={fogActive}
          >
            {fogActive ? t('demo.additions.pixelart.fogOn') : t('demo.additions.pixelart.fogOff')}
          </button>

          <button
            type="button"
            onClick={triggerPing}
            className={`px-btn ${pingActive ? 'px-btn-active' : ''}`}
            aria-pressed={pingActive}
          >
            {t('demo.additions.pixelart.radarPing')}
          </button>
        </div>
      </div>
    </div>
  );
}

export const PIXEL_GAME_UI_DEMOS = {
  'px-hud-health-shield-bar': PixelHudHealthShieldBarDemo,
  'px-inventory-grid-selector': PixelInventoryGridSelectorDemo,
  'px-rpg-dialog-typewriter': PixelRpgDialogTypewriterDemo,
  'px-minimap-radar': PixelMinimapRadarDemo,
};
