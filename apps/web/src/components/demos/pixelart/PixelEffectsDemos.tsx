import { useState, useRef, useEffect, useMemo, useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';
import { usePixelAnimation } from './usePixelAnimation';

/* ============================================================================
 * 17. 정수 그리드 폭발 (px-integer-grid-explosion)
 * ============================================================================ */
export function PixelIntegerGridExplosionDemo() {
  const { t } = useLocale();
  // 대표 폭발 프레임(2: 최대 화염구)으로 시작! (요구사항 3)
  const [frame, setFrame] = useState(2);
  const [isExploding, setIsExploding] = useState(false);
  const [screenShake, setScreenShake] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId();

  const detonate = () => {
    setFrame(0);
    setIsExploding(true);
  };

  usePixelAnimation(
    () => {
      setFrame((prev) => {
        if (prev < 5) {
          return prev + 1;
        }
        setIsExploding(false);
        return 5;
      });
    },
    isExploding ? 85 : null,
    containerRef
  );

  const shakeOffset = isExploding && screenShake && frame > 0 && frame < 4 ? (frame % 2 === 0 ? 3 : -3) : 0;

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demo.additions.pixelart.explosionArtwork')}
      >
        <rect width="264" height="144" fill="#090a14" />

        {/* 32x32 폭발 무대 (중앙 x=132, y=72) */}
        <g transform={`translate(${132 + shakeOffset}, ${72 + shakeOffset})`} aria-hidden="true">
          {/* Frame 0: 중심 백열 섬광 점과 십자 섬광 */}
          {frame === 0 && (
            <g>
              <rect x="-4" y="-4" width="8" height="8" fill="#ffffff" />
              <rect x="-10" y="-1.5" width="20" height="3" fill="#fef08a" />
              <rect x="-1.5" y="-10" width="3" height="20" fill="#fef08a" />
              <rect x="-18" y="-1" width="36" height="2" fill="#f97316" />
              <rect x="-1" y="-18" width="2" height="36" fill="#f97316" />
            </g>
          )}

          {/* Frame 1: 팽창하는 화염 핵과 톱니 */}
          {frame === 1 && (
            <g>
              <polygon points="-16,0 0,-16 16,0 0,16" fill="#ea580c" />
              <rect x="-10" y="-10" width="20" height="20" fill="#facc15" />
              <rect x="-5" y="-5" width="10" height="10" fill="#ffffff" />
              <rect x="-14" y="-14" width="4" height="4" fill="#f97316" />
              <rect x="10" y="-14" width="4" height="4" fill="#f97316" />
              <rect x="-14" y="10" width="4" height="4" fill="#f97316" />
              <rect x="10" y="10" width="4" height="4" fill="#f97316" />
            </g>
          )}

          {/* Frame 2: 최대 크기 화염구 폭발 (대표 화면) */}
          {frame === 2 && (
            <g>
              <circle cx="0" cy="0" r="32" fill="#b91c1c" />
              <circle cx="0" cy="0" r="24" fill="#ea580c" />
              <circle cx="0" cy="0" r="16" fill="#facc15" />
              <circle cx="0" cy="0" r="8" fill="#ffffff" />

              {/* 사방으로 뿜어지는 정수 화염 톱니 파편 */}
              {[-28, 24].map((px) =>
                [-28, 24].map((py) => (
                  <rect key={`${px}-${py}`} x={px} y={py} width="5" height="5" fill="#facc15" />
                ))
              )}
              <rect x="-36" y="-3" width="6" height="6" fill="#f97316" />
              <rect x="30" y="-3" width="6" height="6" fill="#f97316" />
              <rect x="-3" y="-36" width="6" height="6" fill="#f97316" />
              <rect x="-3" y="30" width="6" height="6" fill="#f97316" />
            </g>
          )}

          {/* Frame 3: 연기 포켓 형성과 파편 분해 */}
          {frame === 3 && (
            <g>
              <circle cx="0" cy="0" r="36" fill="#334155" opacity="0.8" />
              <circle cx="-12" cy="-8" r="14" fill="#ea580c" />
              <circle cx="12" cy="8" r="16" fill="#f97316" />
              <circle cx="0" cy="0" r="10" fill="#1e293b" />
              {/* 흩어지는 1px 불똥 파티클 */}
              <rect x="-34" y="-12" width="3" height="3" fill="#fef08a" />
              <rect x="32" y="16" width="3" height="3" fill="#fef08a" />
              <rect x="-2" y="-38" width="4" height="4" fill="#ea580c" />
              <rect x="-22" y="28" width="3" height="3" fill="#ea580c" />
            </g>
          )}

          {/* Frame 4: 연기 도넛 링 팽창 */}
          {frame === 4 && (
            <g>
              <ellipse cx="0" cy="0" rx="42" ry="34" fill="none" stroke="#334155" strokeWidth="8" strokeDasharray="10 6" />
              <circle cx="-18" cy="-14" r="7" fill="#1e293b" />
              <circle cx="20" cy="14" r="9" fill="#1e293b" />
              <rect x="-38" y="24" width="3" height="3" fill="#f97316" />
              <rect x="36" y="-26" width="3" height="3" fill="#f97316" />
            </g>
          )}

          {/* Frame 5: 흩어지는 회색 재와 연기 점 */}
          {frame === 5 && (
            <g>
              <circle cx="-24" cy="-18" r="5" fill="#475569" opacity="0.5" />
              <circle cx="26" cy="20" r="6" fill="#475569" opacity="0.5" />
              <circle cx="16" cy="-26" r="4" fill="#64748b" opacity="0.4" />
              <circle cx="-20" cy="28" r="5" fill="#64748b" opacity="0.4" />
              <rect x="-6" y="-6" width="3" height="3" fill="#334155" opacity="0.4" />
            </g>
          )}
        </g>
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            onClick={detonate}
            className={`px-btn ${isExploding ? 'px-btn-active' : ''}`}
            aria-pressed={isExploding}
          >
            {t('demo.additions.pixelart.detonate')}
          </button>

          <button
            type="button"
            onClick={() => setScreenShake(!screenShake)}
            className="px-btn"
            aria-pressed={screenShake}
          >
            {screenShake ? t('demo.additions.pixelart.screenShakeOn') : t('demo.additions.pixelart.screenShakeOff')}
          </button>
        </div>

        <div className="px-slider-row">
          <label className="px-slider-label">
            <span className="px-slider-name">{t('demo.additions.pixelart.explosionFrame')}</span>
            <input
              type="range"
              min="0"
              max="5"
              step="1"
              value={frame}
              onChange={(e) => {
                setIsExploding(false);
                setFrame(e.currentTarget.valueAsNumber);
              }}
              className="px-slider"
              aria-label={t('demo.additions.pixelart.explosionFrame')}
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
 * 18. 잔상 슬래시 궤적 (px-slash-afterimage-trail)
 * ============================================================================ */
export function PixelSlashAfterimageTrailDemo() {
  const { t } = useLocale();
  const [trailCount, setTrailCount] = useState(4);
  const [angleMode, setAngleMode] = useState<'diagonal' | 'horizontal'>('diagonal');
  const [slashTrigger, setSlashTrigger] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!slashTrigger) return;
    const timer = setTimeout(() => setSlashTrigger(false), 300);
    return () => clearTimeout(timer);
  }, [slashTrigger]);

  const triggerSlash = () => {
    setSlashTrigger(true);
  };

  const isDiag = angleMode === 'diagonal';

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demo.additions.pixelart.slashArtwork')}
      >
        <rect width="264" height="144" fill="#090d16" />

        {/* 잔상 검격 궤적 무대 (x=132, y=72) */}
        <g
          transform={`translate(132, 72) rotate(${isDiag ? -20 : 0}) ${slashTrigger ? 'scale(1.15)' : 'scale(1)'}`}
          aria-hidden="true"
        >
          {/* 뒤쪽 잔상 픽셀 호선들 (감쇄 색상 띠) */}
          {Array.from({ length: trailCount }).map((_, i) => {
            const step = i + 1;
            const opacity = 0.9 - step * 0.18;
            const colors = ['#38bdf8', '#0284c7', '#1e40af', '#1e1b4b'];
            const color = colors[i] || '#0f172a';
            const yOffset = step * 6;

            return (
              <path
                key={i}
                d={`M-80 ${yOffset} Q0 ${-40 + yOffset} 80 ${yOffset}`}
                fill="none"
                stroke={color}
                strokeWidth={5 - step * 0.8}
                opacity={opacity}
                strokeDasharray="16 4"
              />
            );
          })}

          {/* 메인 칼날 백색 호선 */}
          <path
            d="M-84 0 Q0 -44 84 0"
            fill="none"
            stroke="#ffffff"
            strokeWidth="4"
          />

          {/* 선단 충격 스파크 픽셀 */}
          <polygon points="84,0 78,-6 88,-2" fill="#facc15" />
          <polygon points="-84,0 -78,-6 -88,-2" fill="#facc15" />
          <rect x="-10" y="-36" width="4" height="4" fill="#ffffff" />
          <rect x="20" y="-28" width="3" height="3" fill="#bae6fd" />
          <rect x="-30" y="-24" width="3" height="3" fill="#bae6fd" />
        </g>
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            onClick={triggerSlash}
            className={`px-btn ${slashTrigger ? 'px-btn-active' : ''}`}
            aria-pressed={slashTrigger}
          >
            {t('demo.additions.pixelart.slashTrigger')}
          </button>

          <button
            type="button"
            onClick={() => setAngleMode((m) => (m === 'diagonal' ? 'horizontal' : 'diagonal'))}
            className="px-btn"
            aria-pressed={angleMode === 'horizontal'}
          >
            {angleMode === 'diagonal' ? t('demo.additions.pixelart.slashAngleDiag') : t('demo.additions.pixelart.slashAngleHoriz')}
          </button>
        </div>

        <div className="px-slider-row">
          <label className="px-slider-label">
            <span className="px-slider-name">{t('demo.additions.pixelart.trailCount')}</span>
            <input
              type="range"
              min="1"
              max="4"
              step="1"
              value={trailCount}
              onChange={(e) => setTrailCount(e.currentTarget.valueAsNumber)}
              className="px-slider"
              aria-label={t('demo.additions.pixelart.trailCount')}
              aria-controls={id}
            />
            <span className="px-slider-val">{trailCount}</span>
          </label>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 19. 흐르는 보석 반짝임 (px-sparkle-gemstone-shine)
 * ============================================================================ */
export function PixelSparkleGemstoneShineDemo() {
  const { t } = useLocale();
  const [sweepPos, setSweepPos] = useState(20);
  const [gemColor, setGemColor] = useState<'ruby' | 'emerald' | 'sapphire'>('ruby');
  const [isSparkling, setIsSparkling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId();

  const palettes = {
    ruby:     { base: '#991b1b', light: '#ef4444', mid: '#b91c1c', high: '#fca5a5' },
    emerald:  { base: '#065f46', light: '#10b981', mid: '#059669', high: '#a7f3d0' },
    sapphire: { base: '#1e3a8a', light: '#38bdf8', mid: '#2563eb', high: '#bae6fd' },
  };

  const pal = palettes[gemColor];
  const outline = '-36,-12 0,-36 36,-12 30,28 0,40 -30,28';

  useEffect(() => {
    if (!isSparkling) return;
    const timer = setTimeout(() => setIsSparkling(false), 500);
    return () => clearTimeout(timer);
  }, [isSparkling]);

  const triggerTwinkle = () => {
    setIsSparkling(true);
  };

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demo.additions.pixelart.gemstoneArtwork')}
      >
        <defs>
          {/* 보석 단일 외곽 윤곽을 재사용한 클리핑 마스크: 광택선이 보석 외부로 침범하지 않음 */}
          <clipPath id={`gem-clip-${id}`}>
            <polygon points={outline} />
          </clipPath>
        </defs>

        <rect width="264" height="144" fill="#090d16" />

        <g transform="translate(132, 64)" aria-hidden="true">
          {/* 바닥 그림자 */}
          <ellipse cx="0" cy="42" rx="36" ry="7" fill="#000000" opacity="0.6" />

          {/* 보석 패싯 (Facet) 분할 다각형 */}
          <polygon points={outline} fill={pal.base} stroke="#0f172a" strokeWidth="2" />
          {/* 상단 패싯 */}
          <polygon points="-24,-12 0,-26 24,-12 0,-4" fill={pal.light} />
          {/* 좌측 패싯 */}
          <polygon points="-36,-12 0,-36 -24,-12" fill={pal.mid} />
          <polygon points="-36,-12 -24,-12 0,-4 -30,28" fill={pal.base} />
          {/* 우측 패싯 */}
          <polygon points="36,-12 0,-36 24,-12" fill={pal.light} />
          <polygon points="36,-12 24,-12 0,-4 30,28" fill={pal.mid} />
          {/* 하단 중심 패싯 */}
          <polygon points="-30,28 0,-4 30,28 0,40" fill={pal.mid} />

          {/* 대각선 광택 띠: instance별 clipPath로 보석 내부에서만 선명히 이동 (외곽 침범 차단) */}
          <g clipPath={`url(#gem-clip-${id})`}>
            <g transform={`translate(${sweepPos - 20}, ${sweepPos - 20})`}>
              <line x1="-60" y1="60" x2="60" y2="-60" stroke="#ffffff" strokeWidth="3" opacity="0.75" />
              <line x1="-58" y1="62" x2="62" y2="-58" stroke={pal.high} strokeWidth="2" opacity="0.5" />
            </g>
          </g>

          {/* 정점 4갈래 십자 별 반짝임 (트윙클 격발 시) */}
          {isSparkling && (
            <g transform="translate(18, -20)">
              <polygon points="0,-16 3,-3 16,0 3,3 0,16 -3,3 -16,0 -3,-3" fill="#ffffff" />
              <polygon points="0,-10 2,-2 10,0 2,2 0,10 -2,2 -10,0 -2,-2" fill={pal.high} />
              <circle cx="0" cy="0" r="2" fill="#ffffff" />
            </g>
          )}
        </g>
      </svg>

      <div className="px-ctrl-bar">
        {/* 행 1: 단발 액션 버튼 (토글이 아니므로 aria-pressed 제외, 명확한 한영 액션 라벨) */}
        <div className="px-btn-row">
          <button
            type="button"
            onClick={triggerTwinkle}
            className="px-btn"
          >
            {t('demo.additions.pixelart.twinkle')}
          </button>
        </div>

        {/* 행 2: 보석 색상 3개 동등 선택 버튼 (동일한 너비·높이) */}
        <div className="px-btn-row">
          <button
            type="button"
            onClick={() => setGemColor('ruby')}
            className={`px-btn ${gemColor === 'ruby' ? 'px-btn-active' : ''}`}
            aria-pressed={gemColor === 'ruby'}
          >
            {t('demo.additions.pixelart.gemRuby')}
          </button>

          <button
            type="button"
            onClick={() => setGemColor('emerald')}
            className={`px-btn ${gemColor === 'emerald' ? 'px-btn-active' : ''}`}
            aria-pressed={gemColor === 'emerald'}
          >
            {t('demo.additions.pixelart.gemEmerald')}
          </button>

          <button
            type="button"
            onClick={() => setGemColor('sapphire')}
            className={`px-btn ${gemColor === 'sapphire' ? 'px-btn-active' : ''}`}
            aria-pressed={gemColor === 'sapphire'}
          >
            {t('demo.additions.pixelart.gemSapphire')}
          </button>
        </div>

        {/* 행 3: 광택 위치 슬라이더 (독립적인 수치 제어) */}
        <div className="px-slider-row">
          <label className="px-slider-label">
            <span className="px-slider-name">{t('demo.additions.pixelart.sweepPosition')}</span>
            <input
              type="range"
              min="0"
              max="40"
              step="1"
              value={sweepPos}
              onChange={(e) => setSweepPos(e.currentTarget.valueAsNumber)}
              className="px-slider"
              aria-label={t('demo.additions.pixelart.sweepPosition')}
              aria-controls={id}
            />
            <span className="px-slider-val">{sweepPos}</span>
          </label>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 20. 단계별 모자이크 장면 전환 (px-mosaic-pixel-wipe-transition)
 * ============================================================================ */

/**
 * 원본 장면(1px)과 모자이크 단계(2px~32px) 모두에 공용으로 사용되는 단일 정수 픽셀 소스.
 * x: 0 ~ 263, y: 0 ~ 143
 */
function getScenePixel(x: number, y: number, isSceneB: boolean): string {
  if (!isSceneB) {
    // [장면 A: 맑은 날 성채 초원]
    // 1. 초원 지면 및 꽃밭
    if (y >= 88) {
      if (y < 92) return '#86efac'; // 잔디 상단 하이라이트 경계선
      if (x >= 62 && x <= 67 && y >= 106 && y <= 111) return '#facc15'; // 노란 들꽃
      if (x >= 182 && x <= 187 && y >= 116 && y <= 121) return '#f43f5e'; // 붉은 들꽃
      return '#22c55e'; // 메인 초원
    }

    // 2. 성채 좌측 탑 (x: 76 ~ 114)
    if (x >= 76 && x <= 114) {
      // 깃대와 깃발 (y: 16 ~ 24)
      if (y >= 16 && y < 24) {
        if (x >= 94 && x <= 96) return '#475569'; // 깃대
        if (x >= 96 && x <= 104 && y <= 21) return '#ef4444'; // 붉은 깃발
      }
      // 삼각 첨탑 지붕 (y: 24 ~ 44, 중심 x=95)
      if (y >= 24 && y < 44) {
        if (Math.abs(x - 95) <= Math.round((y - 24) * 0.95)) return '#64748b';
      }
      // 탑 사각 본체 (y: 44 ~ 88)
      if (x >= 80 && x <= 110 && y >= 44) {
        if (x >= 91 && x <= 98 && y >= 52 && y <= 63) return '#0f172a'; // 창문
        return '#94a3b8'; // 탑 석조 벽체
      }
    }

    // 3. 성채 우측 탑 (x: 150 ~ 188)
    if (x >= 150 && x <= 188) {
      // 깃대와 깃발
      if (y >= 16 && y < 24) {
        if (x >= 168 && x <= 170) return '#475569'; // 깃대
        if (x >= 170 && x <= 178 && y <= 21) return '#ef4444'; // 붉은 깃발
      }
      // 삼각 첨탑 지붕 (y: 24 ~ 44, 중심 x=169)
      if (y >= 24 && y < 44) {
        if (Math.abs(x - 169) <= Math.round((y - 24) * 0.95)) return '#64748b';
      }
      // 탑 사각 본체 (y: 44 ~ 88)
      if (x >= 154 && x <= 184 && y >= 44) {
        if (x >= 165 && x <= 172 && y >= 52 && y <= 63) return '#0f172a'; // 창문
        return '#94a3b8'; // 탑 석조 벽체
      }
    }

    // 4. 중앙 성벽 및 성문 (x: 110 ~ 154, y: 54 ~ 88)
    if (x >= 110 && x < 154 && y >= 54) {
      if (x >= 126 && x <= 137 && y >= 68) return '#475569'; // 아치형 성문
      return '#cbd5e1'; // 밝은 성벽
    }

    // 5. 뭉게구름 (x: 36 ~ 72, y: 16 ~ 32)
    if ((x >= 36 && x <= 72 && y >= 20 && y <= 32) || (x >= 44 && x <= 64 && y >= 16 && y <= 24)) {
      return '#ffffff';
    }

    // 6. 태양 (중심 x: 210, y: 30, 반경 14)
    const dxSun = x - 210;
    const dySun = y - 30;
    if (dxSun * dxSun + dySun * dySun <= 14 * 14) {
      return '#fde047';
    }

    // 7. 하늘 배경
    return '#38bdf8';
  } else {
    // [장면 B: 달밤 수정 동굴]
    // 1. 지하 호수 수면 및 반사광 (y >= 124)
    if (y >= 124) {
      if (y <= 125) return '#67e8f9'; // 수면 반사선
      return '#1e1b4b'; // 심해 호수
    }

    // 2. 발광 버섯 (x: 102 ~ 110, y: 108 ~ 120)
    if (x >= 102 && x <= 110 && y >= 108 && y < 124) {
      const dxM = x - 106;
      const dyM = y - 112;
      if (dxM * dxM + dyM * dyM <= 16) return '#67e8f9'; // 버섯 갓
      if (x >= 104 && x <= 107 && y >= 114) return '#22d3ee'; // 버섯 기둥
    }

    // 3. 천장 석순/종유석 (y <= 52)
    if (y <= 52) {
      if (Math.abs(x - 45) <= Math.max(0, (46 - y) * 0.35)) return '#334155';
      if (Math.abs(x - 135) <= Math.max(0, (36 - y) * 0.45)) return '#334155';
      if (Math.abs(x - 215) <= Math.max(0, (52 - y) * 0.32)) return '#334155';
    }

    // 4. 발광 청록 수정 기둥 (x: 70 ~ 96, y: 72 ~ 143)
    if (x >= 70 && x <= 96 && y >= 72) {
      const topDist = y - 72;
      if (x >= 82 - Math.floor((topDist * 12) / 72) && x <= 82 + Math.floor((topDist * 14) / 72)) {
        if (x >= 80 && x <= 82 && y >= 88 && y <= 94) return '#ffffff'; // 하이라이트
        if (x >= 82) return '#0284c7'; // 청록 음영면
        return '#38bdf8'; // 청록 주체면
      }
    }

    // 5. 발광 자수정 기둥 (x: 160 ~ 188, y: 80 ~ 143)
    if (x >= 160 && x <= 188 && y >= 80) {
      const topDist = y - 80;
      if (x >= 174 - Math.floor((topDist * 14) / 64) && x <= 174 + Math.floor((topDist * 14) / 64)) {
        if (x >= 172 && x <= 174 && y >= 94 && y <= 100) return '#ffffff'; // 하이라이트
        if (x >= 174) return '#7e22ce'; // 자주 음영면
        return '#c084fc'; // 자주 주체면
      }
    }

    // 6. 동굴 암벽 배경
    return '#0f172a';
  }
}

/**
 * 정수 픽셀 소스를 가로 런(Run) 단위로 압축하여 색상별 <path>로 묶어 생성하는 고성능 양자화 렌더러.
 * 프레임당 DOM 노드가 수천 개 생기지 않고 색상별 소수(10~15개) 경로로 렌더링.
 */
function computeMosaicPaths(blockSize: number, isB: boolean) {
  const cols = Math.ceil(264 / blockSize);
  const rows = Math.ceil(144 / blockSize);
  const pathMap: Record<string, string> = {};

  for (let r = 0; r < rows; r++) {
    const y = r * blockSize;
    const h = Math.min(blockSize, 144 - y);
    const sampleY = Math.min(143, y + Math.floor(h / 2));

    let runColor = '';
    let runStartCol = 0;
    let runLen = 0;

    for (let c = 0; c < cols; c++) {
      const x = c * blockSize;
      const w = Math.min(blockSize, 264 - x);
      const sampleX = Math.min(263, x + Math.floor(w / 2));
      const color = getScenePixel(sampleX, sampleY, isB);

      if (color === runColor) {
        runLen++;
      } else {
        if (runLen > 0) {
          const rx = runStartCol * blockSize;
          const rw = Math.min(runLen * blockSize, 264 - rx);
          pathMap[runColor] = (pathMap[runColor] || '') + `M${rx} ${y}h${rw}v${h}h${-rw}z`;
        }
        runColor = color;
        runStartCol = c;
        runLen = 1;
      }
    }

    if (runLen > 0) {
      const rx = runStartCol * blockSize;
      const rw = Math.min(runLen * blockSize, 264 - rx);
      pathMap[runColor] = (pathMap[runColor] || '') + `M${rx} ${y}h${rw}v${h}h${-rw}z`;
    }
  }

  // 거대 블록(8px 이상) 시 모자이크 윤곽선 1개 경로 생성
  let gridPath = '';
  if (blockSize >= 8) {
    for (let c = 1; c < cols; c++) {
      const gx = c * blockSize;
      if (gx < 264) gridPath += `M${gx} 0v144`;
    }
    for (let r = 1; r < rows; r++) {
      const gy = r * blockSize;
      if (gy < 144) gridPath += `M0 ${gy}h264`;
    }
  }

  const paths = Object.entries(pathMap).map(([color, d]) => ({ color, d }));
  return { paths, gridPath };
}

export function PixelMosaicPixelWipeTransitionDemo() {
  const { t } = useLocale();
  const [step, setStep] = useState(0); // 0 (Scene A) ~ 5 (Giant 32px Blocks) ~ 10 (Scene B)
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId();

  usePixelAnimation(
    () => {
      setStep((prev) => {
        if (prev < 10) return prev + 1;
        setIsTransitioning(false);
        return 10;
      });
    },
    isTransitioning ? 75 : null,
    containerRef
  );

  const playTransition = () => {
    setStep(0);
    setIsTransitioning(true);
  };

  // 10단계에 따른 실제 정수 블록 크기 양자화
  const blockSizes = [1, 2, 4, 8, 16, 32, 16, 8, 4, 2, 1];
  const currentBlockSize = blockSizes[step];
  const isSceneB = step >= 5;

  const { paths, gridPath } = useMemo(
    () => computeMosaicPaths(currentBlockSize, isSceneB),
    [currentBlockSize, isSceneB]
  );

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demo.additions.pixelart.mosaicArtwork')}
      >
        <g aria-hidden="true">
          {paths.map(({ color, d }) => (
            <path key={color} d={d} fill={color} />
          ))}
          {gridPath && (
            <path d={gridPath} stroke="#000000" strokeWidth="0.75" opacity="0.3" fill="none" />
          )}
        </g>
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            onClick={playTransition}
            className={`px-btn ${isTransitioning ? 'px-btn-active' : ''}`}
            aria-pressed={isTransitioning}
          >
            {t('demo.additions.pixelart.playTransition')}
          </button>

          <button
            type="button"
            onClick={() => setStep((s) => (s >= 5 ? 0 : 10))}
            className="px-btn"
            aria-pressed={isSceneB}
          >
            {isSceneB ? t('demo.additions.pixelart.sceneB') : t('demo.additions.pixelart.sceneA')}
          </button>
        </div>

        <div className="px-slider-row">
          <label className="px-slider-label">
            <span className="px-slider-name">{t('demo.additions.pixelart.transitionStep')}</span>
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={step}
              onChange={(e) => {
                setIsTransitioning(false);
                setStep(e.currentTarget.valueAsNumber);
              }}
              className="px-slider"
              aria-label={t('demo.additions.pixelart.transitionStep')}
              aria-controls={id}
            />
            <span className="px-slider-val">{step}</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export const PIXEL_EFFECTS_DEMOS = {
  'px-integer-grid-explosion': PixelIntegerGridExplosionDemo,
  'px-slash-afterimage-trail': PixelSlashAfterimageTrailDemo,
  'px-sparkle-gemstone-shine': PixelSparkleGemstoneShineDemo,
  'px-mosaic-pixel-wipe-transition': PixelMosaicPixelWipeTransitionDemo,
};
