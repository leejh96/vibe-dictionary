import { useState, useRef, useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';
import { usePixelAnimation } from './usePixelAnimation';

/* ============================================================================
 * 1. 달빛 아래 탐험가 걷기 (px-sprite-walk-cycle)
 * ============================================================================ */
export function PixelSpriteWalkCycleDemo() {
  const { t } = useLocale();
  const [frame, setFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [facingRight, setFacingRight] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId();

  usePixelAnimation(
    () => {
      setFrame((prev) => (prev + 1) % 6);
    },
    isPlaying ? 150 : null,
    containerRef
  );

  /* 6프레임 걷기 사이클: 몸통 골반 겹침(overlap) 유지, 지지발 바닥선(y=37) 일치, 보폭 몸통 내 제한 */
  const legOffsets = [
    { lX: -3, lL: 17, rX: 3, rL: 16, bY: 0, aX: 4, capeAngle: 0 },    // Frame 0: Contact 1 (왼발 지지 37, 오른발 36)
    { lX: -2, lL: 15, rX: 2, rL: 12, bY: 2, aX: 2, capeAngle: 3 },   // Frame 1: Down 1 (왼발 완전지지 37, 오른발 들림)
    { lX: 0, lL: 19, rX: -1, rL: 14, bY: -2, aX: 0, capeAngle: -2 }, // Frame 2: Passing 1 (왼발 지지 37, 오른발 통과)
    { lX: 3, lL: 16, rX: -3, rL: 17, bY: 0, aX: -4, capeAngle: 0 },  // Frame 3: Contact 2 (오른발 지지 37, 왼발 36)
    { lX: 2, lL: 12, rX: -2, rL: 15, bY: 2, aX: -2, capeAngle: 3 },  // Frame 4: Down 2 (오른발 완전지지 37, 왼발 들림)
    { lX: -1, lL: 14, rX: 0, rL: 19, bY: -2, aX: 0, capeAngle: -2 }, // Frame 5: Passing 2 (오른발 지지 37, 왼발 통과)
  ];

  const current = legOffsets[frame];

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demo.additions.pixelart.walkCycleArtwork')}
      >
        <rect width="264" height="144" fill="#080c18" />

        {/* 밤하늘 별과 초승달, 달빛 림라이트 */}
        <g aria-hidden="true">
          <circle cx="216" cy="30" r="18" fill="#fef08a" />
          <circle cx="210" cy="26" r="16" fill="#080c18" />
          {/* 달무리 픽셀 빛 */}
          <rect x="214" y="8" width="4" height="2" fill="#fef08a" opacity="0.5" />
          <rect x="238" y="28" width="2" height="4" fill="#fef08a" opacity="0.5" />

          {/* 픽셀 별들 */}
          <rect x="24" y="20" width="2" height="2" fill="#93c5fd" />
          <rect x="68" y="38" width="3" height="3" fill="#ffffff" />
          <rect x="110" y="18" width="2" height="2" fill="#bfdbfe" />
          <rect x="156" y="32" width="2" height="2" fill="#93c5fd" />
          <rect x="180" y="16" width="3" height="3" fill="#ffffff" />
          <rect x="250" y="52" width="2" height="2" fill="#bfdbfe" />

          {/* 원경 침엽수 숲 실루엣 (달빛 림 강조) */}
          <path
            d="M0 114 L20 82 L42 114 L68 76 L94 114 L126 84 L158 114 L192 78 L224 114 L264 86 L264 144 L0 144 Z"
            fill="#0f172a"
          />
          <path
            d="M20 82 L22 86 M68 76 L70 80 M126 84 L128 88 M192 78 L194 82"
            stroke="#38bdf8"
            strokeWidth="1.5"
            opacity="0.4"
          />

          {/* 지면 잔디 및 자갈 픽셀 */}
          <rect x="0" y="112" width="264" height="32" fill="#1e293b" />
          <rect x="0" y="112" width="264" height="2" fill="#38bdf8" opacity="0.6" />
          <rect x="16" y="118" width="6" height="2" fill="#0f172a" />
          <rect x="54" y="124" width="8" height="2" fill="#334155" />
          <rect x="100" y="120" width="5" height="2" fill="#0f172a" />
          <rect x="160" y="122" width="7" height="2" fill="#334155" />
          <rect x="220" y="116" width="6" height="2" fill="#0f172a" />
        </g>

        {/* 탐험가 캐릭터 (달빛과 망토 윤곽을 강화한 당당한 픽셀 탐험가) */}
        <g
          transform={`translate(132, 74) scale(${facingRight ? 1.25 : -1.25}, 1.25)`}
          aria-hidden="true"
        >
          {/* 발밑 그림자 */}
          <ellipse cx="0" cy="36" rx="16" ry="4" fill="#000000" opacity="0.5" />

          {/* 캐릭터 몸체 (현재 프레임 Y 바운스 및 망토 각도) */}
          <g transform={`translate(0, ${current.bY})`}>
            {/* 망토 뒷자락 (달빛 반사광 하늘색 림) */}
            <path
              d={`M-14 8 L${-18 - current.capeAngle} 24 L${-8 - current.capeAngle} 24 L-6 8 Z`}
              fill="#1e3a5f"
            />
            <path
              d={`M-14 8 L${-18 - current.capeAngle} 24`}
              stroke="#38bdf8"
              strokeWidth="1.5"
              opacity="0.7"
            />

            {/* 가죽 배낭 */}
            <rect x="-16" y="6" width="8" height="17" fill="#78350f" />
            <rect x="-16" y="6" width="8" height="3" fill="#b45309" />
            <rect x="-17" y="15" width="9" height="3" fill="#451a03" />

            {/* 몸통 자켓 및 벨트 버클 */}
            <rect x="-8" y="5" width="16" height="18" fill="#1e293b" />
            <rect x="-8" y="5" width="3" height="18" fill="#38bdf8" opacity="0.6" />
            <rect x="-8" y="15" width="16" height="4" fill="#0f172a" />
            <rect x="-2" y="15" width="4" height="4" fill="#facc15" />

            {/* 모자/후드 및 달빛 하이라이트 */}
            <rect x="-10" y="-15" width="20" height="11" fill="#0369a1" />
            <rect x="-13" y="-6" width="26" height="4" fill="#0284c7" />
            <rect x="-9" y="-17" width="16" height="3" fill="#7dd3fc" />

            {/* 얼굴과 결의에 찬 눈 */}
            <rect x="-4" y="-8" width="11" height="8" fill="#fed7aa" />
            <rect x="3" y="-6" width="2" height="2" fill="#0f172a" />
            <rect x="-4" y="-2" width="10" height="2" fill="#fdba74" />

            {/* 앞팔과 손 (스윙) */}
            <rect x={-current.aX - 3} y="7" width="5" height="11" fill="#0284c7" />
            <rect x={-current.aX - 3} y="16" width="5" height="5" fill="#fed7aa" />

            {/* 랜턴 지팡이 */}
            <rect x={current.aX + 8} y="-4" width="2" height="30" fill="#78350f" />
            <rect x={current.aX + 6} y="-2" width="7" height="9" fill="#facc15" />
            <rect x={current.aX + 7} y="0" width="5" height="5" fill="#ffffff" />
            {/* 랜턴 발광 픽셀 */}
            <rect x={current.aX + 5} y="1" width="1" height="3" fill="#fef08a" />
            <rect x={current.aX + 13} y="1" width="1" height="3" fill="#fef08a" />
          </g>

          {/* 왼다리 및 가죽 부츠 (몸통 골반 y=20+bY와 항상 겹침, 지지발 바닥선 y=37 일치) */}
          <rect x={-5 + current.lX} y={20 + current.bY} width="5" height={current.lL} fill="#0f172a" />
          <rect x={-6 + current.lX} y={20 + current.bY + current.lL - 4} width="7" height="4" fill="#451a03" />
          <rect x={-6 + current.lX} y={20 + current.bY + current.lL - 2} width="7" height="2" fill="#1c1917" />

          {/* 오른다리 및 가죽 부츠 */}
          <rect x={0 + current.rX} y={20 + current.bY} width="5" height={current.rL} fill="#1e293b" />
          <rect x={-1 + current.rX} y={20 + current.bY + current.rL - 4} width="7" height="4" fill="#78350f" />
          <rect x={-1 + current.rX} y={20 + current.bY + current.rL - 2} width="7" height="2" fill="#292524" />
        </g>
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-btn ${isPlaying ? 'px-btn-active' : ''}`}
            aria-pressed={isPlaying}
          >
            {isPlaying ? t('demo.additions.pixelart.pause') : t('demo.additions.pixelart.play')}
          </button>

          <button
            type="button"
            onClick={() => setFacingRight(!facingRight)}
            className="px-btn"
            aria-pressed={facingRight}
          >
            {facingRight ? t('demo.additions.pixelart.dirRight') : t('demo.additions.pixelart.dirLeft')}
          </button>
        </div>

        <div className="px-slider-row">
          <label className="px-slider-label">
            <span className="px-slider-name">{t('demo.additions.pixelart.walkFrame')}</span>
            <input
              type="range"
              min="0"
              max="5"
              step="1"
              value={frame}
              onChange={(e) => {
                setIsPlaying(false);
                setFrame(e.currentTarget.valueAsNumber);
              }}
              className="px-slider"
              aria-label={t('demo.additions.pixelart.walkFrame')}
              aria-controls={id}
            />
            <span className="px-slider-val">{frame}</span>
          </label>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 2. 일렁이는 불꽃 정령 (px-flame-spirit-idle)
 * ============================================================================ */
export function PixelFlameSpiritIdleDemo() {
  const { t } = useLocale();
  const [frame, setFrame] = useState(0);
  const [wind, setWind] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId();

  usePixelAnimation(
    () => {
      setFrame((prev) => (prev + 1) % 4);
    },
    isPlaying ? 130 : null,
    containerRef
  );

  // 바람 세기에 따른 불꽃 휨 오프셋
  const windOffset = (wind - 1) * 6;

  // 4프레임의 정교한 불꽃 코어 및 부유 애니메이션
  const flameShapes = [
    { topX: 0, topY: -34, midW: 28, midH: 34, coreW: 12, bobY: 0 },
    { topX: 3, topY: -38, midW: 30, midH: 32, coreW: 14, bobY: -3 },
    { topX: -2, topY: -35, midW: 29, midH: 35, coreW: 13, bobY: -1 },
    { topX: -4, topY: -32, midW: 27, midH: 33, coreW: 11, bobY: 2 },
  ];

  const current = flameShapes[frame];

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demo.additions.pixelart.flameArtwork')}
      >
        <rect width="264" height="144" fill="#0a0714" />

        {/* 제단과 마법진 배경 (불씨·링의 명암 강화) */}
        <g aria-hidden="true">
          {/* 바닥 제단 받침대 */}
          <ellipse cx="132" cy="120" rx="54" ry="14" fill="#181124" stroke="#4a2870" strokeWidth="2" />
          <ellipse cx="132" cy="120" rx="36" ry="9" fill="#2b1542" stroke="#6b21a8" strokeWidth="1" />
          <ellipse cx="132" cy="120" rx="18" ry="4.5" fill="#f97316" opacity="0.4" />

          {/* 마법진 룬 도트 */}
          <rect x="94" y="118" width="4" height="4" fill="#c084fc" />
          <rect x="166" y="118" width="4" height="4" fill="#c084fc" />
          <rect x="130" y="111" width="4" height="4" fill="#e879f9" />
          <rect x="130" y="125" width="4" height="4" fill="#e879f9" />

          {/* 회전하는 불씨 링 (3개 궤도 도트) */}
          <ellipse
            cx="132"
            cy={86 + current.bobY * 0.5}
            rx={32 + (frame % 2) * 2}
            ry={9}
            fill="none"
            stroke="#ea580c"
            strokeWidth="1.5"
            strokeDasharray="6 8"
            opacity="0.6"
          />
        </g>

        {/* 부유하는 불꽃 정령 */}
        <g
          transform={`translate(132, ${72 + current.bobY})`}
          aria-hidden="true"
        >
          {/* 외곽 심홍색 띠 */}
          <path
            d={`M${-current.midW / 2} 12 Q${current.topX + windOffset} ${current.topY} ${current.midW / 2} 12 Q0 28 ${-current.midW / 2} 12 Z`}
            fill="#b91c1c"
          />

          {/* 중간 주황/금빛 띠 */}
          <path
            d={`M${-current.midW / 2 + 4} 10 Q${current.topX + windOffset * 0.8} ${current.topY + 8} ${current.midW / 2 - 4} 10 Q0 22 ${-current.midW / 2 + 4} 10 Z`}
            fill="#f97316"
          />

          {/* 중심 백열 코어 */}
          <ellipse
            cx={windOffset * 0.4}
            cy="6"
            rx={current.coreW / 2}
            ry="11"
            fill="#fef08a"
          />
          <ellipse
            cx={windOffset * 0.4}
            cy="6"
            rx={current.coreW / 4}
            ry="6"
            fill="#ffffff"
          />

          {/* 정령의 귀여운 픽셀 눈동자 */}
          <g transform={`translate(${windOffset * 0.3}, 3)`}>
            <rect x="-5" y="-1" width="3" height="5" fill="#451a03" />
            <rect x="2" y="-1" width="3" height="5" fill="#451a03" />
            <rect x="-5" y="-1" width="1" height="2" fill="#ffffff" />
            <rect x="2" y="-1" width="1" height="2" fill="#ffffff" />
          </g>

          {/* 상승하는 정수 불똥 파티클 */}
          <rect
            x={-14 + ((frame * 7) % 28) + windOffset * 0.5}
            y={-18 - frame * 5}
            width="3"
            height="3"
            fill="#fef08a"
          />
          <rect
            x={10 - ((frame * 9) % 24) + windOffset * 0.6}
            y={-24 - frame * 6}
            width="2"
            height="2"
            fill="#f97316"
          />
          <rect
            x={-6 + ((frame * 11) % 18) + windOffset * 0.8}
            y={-34 - frame * 4}
            width="3"
            height="3"
            fill="#ef4444"
          />
        </g>
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-btn ${isPlaying ? 'px-btn-active' : ''}`}
            aria-pressed={isPlaying}
          >
            {isPlaying ? t('demo.additions.pixelart.pause') : t('demo.additions.pixelart.play')}
          </button>
        </div>

        <div className="px-slider-row">
          <label className="px-slider-label">
            <span className="px-slider-name">{t('demo.additions.pixelart.flameFrame')}</span>
            <input
              type="range"
              min="0"
              max="3"
              step="1"
              value={frame}
              onChange={(e) => {
                setIsPlaying(false);
                setFrame(e.currentTarget.valueAsNumber);
              }}
              className="px-slider"
              aria-label={t('demo.additions.pixelart.flameFrame')}
              aria-controls={id}
            />
            <span className="px-slider-val">{frame}</span>
          </label>
        </div>

        <div className="px-slider-row">
          <label className="px-slider-label">
            <span className="px-slider-name">{t('demo.additions.pixelart.flameWind')}</span>
            <input
              type="range"
              min="0"
              max="2"
              step="1"
              value={wind}
              onChange={(e) => setWind(e.currentTarget.valueAsNumber)}
              className="px-slider"
              aria-label={t('demo.additions.pixelart.flameWind')}
            />
            <span className="px-slider-val">{wind}</span>
          </label>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 3. 아이템 실루엣 세트 (px-item-silhouette-set)
 * ============================================================================ */
export function PixelItemSilhouetteSetDemo() {
  const { t } = useLocale();
  const [mode, setMode] = useState<'palette' | 'silhouette'>('palette');
  const id = useId();

  const isSil = mode === 'silhouette';

  return (
    <div className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demo.additions.pixelart.itemSilhouetteArtwork')}
      >
        <rect width="264" height="144" fill="#0f172a" />

        {/* 4개 아이템 전시대 받침대 */}
        <g transform="translate(18, 24)" aria-hidden="true">
          {[0, 1, 2, 3].map((idx) => {
            const bx = idx * 58;
            return (
              <g key={idx} transform={`translate(${bx}, 0)`}>
                {/* 24x24 베이스 그리드 및 목재 받침대 */}
                <rect x="4" y="66" width="46" height="18" rx="3" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                <rect x="7" y="69" width="40" height="4" fill="#475569" />

                {/* 24x24 영역 표시 테두리 */}
                <rect x="11" y="16" width="32" height="36" rx="4" fill="#090d16" stroke="#1e293b" strokeWidth="1" />
              </g>
            );
          })}

          {/* 1. 수정 원석 (Crystal Ore): 받침대 중심(27,34)에 점유 바운드(폭22,높이26) 정중앙 배치 */}
          <g transform="translate(16, 19)">
            {/* 1px 외곽선 */}
            <path
              d="M10 2 L22 8 L18 28 L4 26 L0 14 Z"
              fill={isSil ? '#000000' : '#0284c7'}
              stroke={isSil ? '#ffffff' : '#0369a1'}
              strokeWidth="1.5"
            />
            {!isSil && (
              <>
                <polygon points="10,2 22,8 14,18" fill="#38bdf8" />
                <polygon points="10,2 14,18 0,14" fill="#bae6fd" />
                <polygon points="14,18 18,28 4,26" fill="#0284c7" />
                <polygon points="14,18 4,26 0,14" fill="#0369a1" />
                <rect x="8" y="6" width="3" height="3" fill="#ffffff" />
              </>
            )}
          </g>

          {/* 2. 생명 물약 (Health Potion): 받침대 중심(85,34)에 정중앙 배치 */}
          <g transform="translate(74, 19)">
            {/* 코르크 마개 & 플라스크 병 윤곽 */}
            <path
              d="M8 2 H14 V6 H17 L22 22 C22 26 19 28 11 28 C3 28 0 26 0 22 L5 6 H8 Z"
              fill={isSil ? '#000000' : '#991b1b'}
              stroke={isSil ? '#ffffff' : '#450a0a'}
              strokeWidth="1.5"
            />
            {!isSil && (
              <>
                {/* 코르크 */}
                <rect x="8" y="2" width="6" height="4" fill="#b45309" />
                {/* 붉은 액체 */}
                <path d="M2 20 Q11 16 20 20 L21 23 C21 27 18 27 11 27 C4 27 1 27 1 23 Z" fill="#ef4444" />
                <path d="M4 22 Q11 19 18 22" stroke="#fca5a5" strokeWidth="1" fill="none" />
                {/* 유리 반사광 */}
                <rect x="4" y="10" width="2" height="10" fill="#ffffff" opacity="0.6" />
                <rect x="7" y="24" width="3" height="2" fill="#ffffff" />
              </>
            )}
          </g>

          {/* 3. 룬 열쇠 (Rune Key): 받침대 중심(143,34)에 점유 바운드(폭17,높이28) 정중앙 배치 */}
          <g transform="translate(134.5, 18)">
            {/* 고리 손잡이 & 톱니 */}
            <path
              d="M5 2 C11 2 17 6 17 12 C17 17 12 21 8 21 V26 H13 V28 H8 V30 H5 V19 C2 17 0 14 0 10 C0 5 4 2 5 2 Z"
              fill={isSil ? '#000000' : '#d97706'}
              stroke={isSil ? '#ffffff' : '#78350f'}
              strokeWidth="1.5"
            />
            {!isSil && (
              <>
                {/* 골드 손잡이 하이라이트 */}
                <circle cx="9" cy="10" r="5" fill="#facc15" />
                <circle cx="9" cy="10" r="2.5" fill="#090d16" />
                <rect x="6" y="20" width="2" height="10" fill="#fef08a" />
                <rect x="9" y="25" width="4" height="2" fill="#fbbf24" />
                <rect x="7" y="5" width="2" height="2" fill="#ffffff" />
              </>
            )}
          </g>

          {/* 4. 보물상자 (Treasure Chest): 받침대 중심(201,34)에 점유 바운드(폭22,높이26) 정중앙 배치 */}
          <g transform="translate(190, 21)">
            {/* 상자 실루엣 */}
            <path
              d="M0 8 C0 3 4 0 11 0 C18 0 22 3 22 8 V26 H0 Z"
              fill={isSil ? '#000000' : '#78350f'}
              stroke={isSil ? '#ffffff' : '#291404'}
              strokeWidth="1.5"
            />
            {!isSil && (
              <>
                {/* 뚜껑 아치 */}
                <path d="M1 9 C1 4 5 1 11 1 C17 1 21 4 21 9 Z" fill="#92400e" />
                {/* 철제 밴드 리벳 */}
                <rect x="4" y="1" width="3" height="25" fill="#475569" />
                <rect x="15" y="1" width="3" height="25" fill="#475569" />
                <rect x="5" y="3" width="1" height="1" fill="#cbd5e1" />
                <rect x="16" y="3" width="1" height="1" fill="#cbd5e1" />
                {/* 금빛 자물쇠 */}
                <rect x="9" y="9" width="4" height="6" fill="#facc15" />
                <rect x="10" y="12" width="2" height="2" fill="#0f172a" />
              </>
            )}
          </g>
        </g>
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            onClick={() => setMode('palette')}
            className={`px-btn ${mode === 'palette' ? 'px-btn-active' : ''}`}
            aria-pressed={mode === 'palette'}
          >
            {t('demo.additions.pixelart.modePalette')}
          </button>

          <button
            type="button"
            onClick={() => setMode('silhouette')}
            className={`px-btn ${mode === 'silhouette' ? 'px-btn-active' : ''}`}
            aria-pressed={mode === 'silhouette'}
          >
            {t('demo.additions.pixelart.modeSilhouette')}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 4. 3방향 캐릭터 포트레이트 (px-character-portrait-angles)
 * ============================================================================ */
export function PixelCharacterPortraitAnglesDemo() {
  const { t } = useLocale();
  const [angle, setAngle] = useState<'front' | 'quarter' | 'profile'>('quarter');
  const [expression, setExpression] = useState<'smile' | 'serious'>('smile');
  const id = useId();

  const isSmile = expression === 'smile';

  return (
    <div className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demo.additions.pixelart.portraitArtwork')}
      >
        <rect width="264" height="144" fill="#090d16" />

        {/* 대화창 액자 프레임 */}
        <g transform="translate(92, 14)" aria-hidden="true">
          <rect width="80" height="84" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
          <rect x="4" y="4" width="72" height="76" rx="4" fill="#0f172a" />

          {/* 48x48 픽셀 두상 포트레이트 (중앙 x=40, y=44) */}
          <g transform="translate(40, 44)">
            {/* 정면 (Front View) */}
            {angle === 'front' && (
              <g>
                {/* 투구/모자 */}
                <rect x="-18" y="-24" width="36" height="14" fill="#0284c7" />
                <rect x="-14" y="-28" width="28" height="6" fill="#38bdf8" />
                <rect x="-4" y="-30" width="8" height="4" fill="#facc15" />

                {/* 얼굴 피부 */}
                <rect x="-14" y="-12" width="28" height="22" fill="#fed7aa" />

                {/* 머리카락 클러스터 */}
                <rect x="-18" y="-14" width="5" height="18" fill="#78350f" />
                <rect x="13" y="-14" width="5" height="18" fill="#78350f" />

                {/* 눈동자 */}
                <rect x="-8" y="-6" width="4" height="4" fill="#0f172a" />
                <rect x="4" y="-6" width="4" height="4" fill="#0f172a" />
                <rect x="-8" y="-6" width="2" height="2" fill="#ffffff" />
                <rect x="4" y="-6" width="2" height="2" fill="#ffffff" />

                {/* 입 모양 (미소 / 결의) */}
                {isSmile ? (
                  <path d="M-4 4 Q0 8 4 4" stroke="#991b1b" strokeWidth="2" fill="none" />
                ) : (
                  <rect x="-4" y="4" width="8" height="2" fill="#991b1b" />
                )}

                {/* 흉갑 칼라 */}
                <polygon points="-16,10 0,18 16,10 14,24 -14,24" fill="#334155" />
              </g>
            )}

            {/* 반측면 (3/4 View) */}
            {angle === 'quarter' && (
              <g>
                {/* 투구 */}
                <rect x="-16" y="-24" width="34" height="14" fill="#0284c7" />
                <rect x="-12" y="-28" width="26" height="6" fill="#38bdf8" />
                <rect x="-2" y="-30" width="8" height="4" fill="#facc15" />

                {/* 얼굴 */}
                <rect x="-12" y="-12" width="26" height="22" fill="#fed7aa" />

                {/* 머리카락 */}
                <rect x="-16" y="-14" width="6" height="20" fill="#78350f" />
                <rect x="10" y="-14" width="4" height="14" fill="#78350f" />

                {/* 눈동자 (원근 차이) */}
                <rect x="-6" y="-6" width="4" height="4" fill="#0f172a" />
                <rect x="5" y="-6" width="3" height="4" fill="#0f172a" />
                <rect x="-6" y="-6" width="2" height="2" fill="#ffffff" />
                <rect x="5" y="-6" width="1" height="2" fill="#ffffff" />

                {/* 입 모양 */}
                {isSmile ? (
                  <path d="M-3 4 Q1 8 4 4" stroke="#991b1b" strokeWidth="2" fill="none" />
                ) : (
                  <rect x="-3" y="4" width="7" height="2" fill="#991b1b" />
                )}

                {/* 흉갑 */}
                <polygon points="-14,10 2,18 16,10 14,24 -14,24" fill="#334155" />
              </g>
            )}

            {/* 측면 (Profile View) */}
            {angle === 'profile' && (
              <g>
                {/* 투구 (front/quarter와 동일한 수직 상단 y=-30 기준 및 황금 깃 장식 일치) */}
                <rect x="-12" y="-24" width="28" height="14" fill="#0284c7" />
                <rect x="-8" y="-28" width="22" height="6" fill="#38bdf8" />
                <rect x="-4" y="-30" width="8" height="4" fill="#facc15" />

                {/* 얼굴 (코 윤곽 돌출) */}
                <rect x="-8" y="-12" width="20" height="22" fill="#fed7aa" />
                <rect x="10" y="-4" width="4" height="4" fill="#fed7aa" />

                {/* 머리카락 뒷머리 */}
                <rect x="-14" y="-14" width="8" height="24" fill="#78350f" />

                {/* 단일 눈 */}
                <rect x="4" y="-6" width="4" height="4" fill="#0f172a" />
                <rect x="4" y="-6" width="2" height="2" fill="#ffffff" />

                {/* 입 모양 */}
                {isSmile ? (
                  <path d="M4 4 Q8 7 8 3" stroke="#991b1b" strokeWidth="2" fill="none" />
                ) : (
                  <rect x="4" y="4" width="5" height="2" fill="#991b1b" />
                )}

                {/* 흉갑 */}
                <polygon points="-10,10 6,18 14,12 12,24 -10,24" fill="#334155" />
              </g>
            )}
          </g>
        </g>
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            onClick={() => setAngle('front')}
            className={`px-btn ${angle === 'front' ? 'px-btn-active' : ''}`}
            aria-pressed={angle === 'front'}
          >
            {t('demo.additions.pixelart.angleFront')}
          </button>

          <button
            type="button"
            onClick={() => setAngle('quarter')}
            className={`px-btn ${angle === 'quarter' ? 'px-btn-active' : ''}`}
            aria-pressed={angle === 'quarter'}
          >
            {t('demo.additions.pixelart.angleQuarter')}
          </button>

          <button
            type="button"
            onClick={() => setAngle('profile')}
            className={`px-btn ${angle === 'profile' ? 'px-btn-active' : ''}`}
            aria-pressed={angle === 'profile'}
          >
            {t('demo.additions.pixelart.angleProfile')}
          </button>
        </div>

        <div className="px-btn-row">
          <button
            type="button"
            onClick={() => setExpression((e) => (e === 'smile' ? 'serious' : 'smile'))}
            className="px-btn"
            aria-pressed={expression === 'smile'}
          >
            {expression === 'smile' ? t('demo.additions.pixelart.exprSmile') : t('demo.additions.pixelart.exprDetermined')}
          </button>
        </div>
      </div>
    </div>
  );
}

export const PIXEL_SPRITES_DEMOS = {
  'px-sprite-walk-cycle': PixelSpriteWalkCycleDemo,
  'px-flame-spirit-idle': PixelFlameSpiritIdleDemo,
  'px-item-silhouette-set': PixelItemSilhouetteSetDemo,
  'px-character-portrait-angles': PixelCharacterPortraitAnglesDemo,
};
