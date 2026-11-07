import { useState, useRef, useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';
import { usePixelAnimation } from './usePixelAnimation';

/* ============================================================================
 * 5. 산맥 픽셀 파랄랙스 (px-parallax-mountain-depth)
 * ============================================================================ */
export function PixelParallaxMountainDepthDemo() {
  const { t } = useLocale();
  const [pan, setPan] = useState(50);
  const [isAutoPan, setIsAutoPan] = useState(false);
  const directionRef = useRef(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId();

  usePixelAnimation(
    () => {
      setPan((prev) => {
        if (prev >= 98) directionRef.current = -1;
        if (prev <= 2) directionRef.current = 1;
        return prev + directionRef.current * 2;
      });
    },
    isAutoPan ? 70 : null,
    containerRef
  );

  // 정수 픽셀 시차 오프셋 (Math.round 로 서브픽셀 흐림 방지)
  const layer0 = Math.round((pan - 50) * 0.1); // 달과 별 (원경)
  const layer1 = Math.round((pan - 50) * 0.3); // 원경 설산
  const layer2 = Math.round((pan - 50) * 0.6); // 중경 침엽수 숲
  const layer3 = Math.round((pan - 50) * 1.0); // 근경 바위/울타리

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demo.additions.pixelart.mountainArtwork')}
      >
        <rect width="264" height="144" fill="#090a18" />

        {/* 1층: 밤하늘 달과 별 (0.1배속) */}
        <g transform={`translate(${layer0}, 0)`} aria-hidden="true">
          <circle cx="216" cy="30" r="16" fill="#fef08a" />
          <circle cx="210" cy="26" r="14" fill="#090a18" />
          <rect x="24" y="18" width="2" height="2" fill="#93c5fd" />
          <rect x="72" y="36" width="3" height="3" fill="#ffffff" />
          <rect x="120" y="14" width="2" height="2" fill="#bae6fd" />
          <rect x="164" y="42" width="2" height="2" fill="#93c5fd" />
          <rect x="250" y="24" width="2" height="2" fill="#ffffff" />
        </g>

        {/* 2층: 원경 보라 설산 맥 (0.3배속) - 층별 픽셀 명암 디테일 */}
        <g transform={`translate(${layer1}, 0)`} aria-hidden="true">
          {/* 뒤쪽 능선 */}
          <path
            d="M-50 120 L10 58 L60 90 L110 50 L160 84 L210 44 L270 94 L320 120 V144 H-50 Z"
            fill="#312e81"
          />
          {/* 산봉우리 눈 덮인 만년설 픽셀 */}
          <polygon points="10,58 4,70 16,70" fill="#a5b4fc" />
          <rect x="8" y="70" width="4" height="4" fill="#818cf8" />
          <polygon points="110,50 100,64 120,64" fill="#a5b4fc" />
          <rect x="108" y="64" width="4" height="6" fill="#818cf8" />
          <polygon points="210,44 198,60 222,60" fill="#a5b4fc" />
          <rect x="208" y="60" width="4" height="6" fill="#818cf8" />
        </g>

        {/* 3층: 중경 짙은 침엽수 능선 (0.6배속) */}
        <g transform={`translate(${layer2}, 0)`} aria-hidden="true">
          <path
            d="M-50 126 L-20 90 L10 126 L40 84 L80 126 L120 80 L160 126 L200 86 L240 126 L280 82 L320 126 V144 H-50 Z"
            fill="#1e3a5f"
          />
          {/* 전나무 실루엣 팁 픽셀 */}
          {[-20, 40, 120, 200, 280].map((tx) => (
            <rect key={tx} x={tx - 1} y={80} width="2" height="6" fill="#38bdf8" opacity="0.4" />
          ))}
        </g>

        {/* 4층: 근경 울타리와 바위 지면 (1.0배속) */}
        <g transform={`translate(${layer3}, 0)`} aria-hidden="true">
          <rect x="-50" y="116" width="370" height="28" fill="#0b1120" />
          <rect x="-50" y="116" width="370" height="2" fill="#38bdf8" opacity="0.5" />

          {/* 나무 울타리 기둥과 가로대 */}
          {[-30, 15, 60, 105, 150, 195, 240, 285].map((x) => (
            <g key={x}>
              <rect x={x} y="104" width="4" height="16" fill="#78350f" />
              <rect x={x - 22} y="108" width="48" height="2" fill="#b45309" />
              <rect x={x - 22} y="114" width="48" height="2" fill="#451a03" />
            </g>
          ))}

          {/* 이끼 낀 픽셀 바위들 */}
          <rect x="36" y="112" width="18" height="10" rx="2" fill="#334155" />
          <rect x="38" y="112" width="6" height="3" fill="#10b981" />
          <rect x="176" y="110" width="24" height="12" rx="3" fill="#1e293b" />
          <rect x="180" y="110" width="8" height="3" fill="#10b981" />
        </g>
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            onClick={() => setIsAutoPan(!isAutoPan)}
            className={`px-btn ${isAutoPan ? 'px-btn-active' : ''}`}
            aria-pressed={isAutoPan}
          >
            {isAutoPan ? t('demo.additions.pixelart.autoPanOn') : t('demo.additions.pixelart.autoPanOff')}
          </button>
        </div>

        <div className="px-slider-row">
          <label className="px-slider-label">
            <span className="px-slider-name">{t('demo.additions.pixelart.cameraPan')}</span>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={pan}
              onChange={(e) => {
                setIsAutoPan(false);
                setPan(e.currentTarget.valueAsNumber);
              }}
              className="px-slider"
              aria-label={t('demo.additions.pixelart.cameraPan')}
              aria-controls={id}
            />
            <span className="px-slider-val">{pan}</span>
          </label>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 6. 석양과 강물 픽셀 반사 (px-sunset-river-reflection)
 * ============================================================================ */
export function PixelSunsetRiverReflectionDemo() {
  const { t } = useLocale();
  const [elevation, setElevation] = useState(40);
  const [isShimmering, setIsShimmering] = useState(false);
  const [shimmer, setShimmer] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId();

  usePixelAnimation(
    () => {
      setShimmer((prev) => (prev + 1) % 4);
    },
    isShimmering ? 120 : null,
    containerRef
  );

  // 태양 Y 위치 (elevation 0 = 수평선 72, elevation 100 = 하늘 위 28)
  const sunY = 72 - Math.round(elevation * 0.44);

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demo.additions.pixelart.sunsetArtwork')}
      >
        {/* 하늘 5단계 노을 디더 밴드 */}
        <g aria-hidden="true">
          <rect y="0" width="264" height="20" fill="#311042" />
          <rect y="20" width="264" height="18" fill="#581c87" />
          <rect y="38" width="264" height="16" fill="#831843" />
          <rect y="54" width="264" height="12" fill="#c2410c" />
          <rect y="66" width="264" height="10" fill="#f59e0b" />

          {/* 수평선 산 실루엣 */}
          <polygon points="0,76 40,68 80,76 130,64 180,76 220,66 264,76 264,80 0,80" fill="#2e1065" />
        </g>

        {/* 수평선 석양 태양 (글로우 림 포함) */}
        <g aria-hidden="true">
          <circle cx="132" cy={sunY} r="20" fill="#fde047" opacity="0.3" />
          <circle cx="132" cy={sunY} r="14" fill="#fbbf24" />
          <circle cx="132" cy={sunY} r="10" fill="#ffffff" />
        </g>

        {/* 하단 강물 수면과 태양 황금빛 픽셀 반사 궤적 */}
        <g aria-hidden="true">
          <rect y="76" width="264" height="68" fill="#1e1b4b" />

          {/* 수평선 가까운 수면 톤 */}
          <rect y="76" width="264" height="4" fill="#431407" />
          <rect y="80" width="264" height="8" fill="#312e81" />

          {/* 교차 주사선 반사 궤적 (태양 수직선 기준 x=132 중심) */}
          {[
            { y: 78, w: 16, h: 2, c: '#fef08a' },
            { y: 82, w: 26, h: 2, c: '#fde047' },
            { y: 86, w: 38, h: 2, c: '#fbbf24' },
            { y: 92, w: 52, h: 3, c: '#f97316' },
            { y: 98, w: 68, h: 3, c: '#ea580c' },
            { y: 106, w: 84, h: 4, c: '#c2410c' },
            { y: 114, w: 100, h: 4, c: '#9a3412' },
            { y: 124, w: 118, h: 5, c: '#7c2d12' },
            { y: 134, w: 136, h: 5, c: '#431407' },
          ].map((bar, i) => {
            const shift = isShimmering ? ((i + shimmer) % 2 === 0 ? 3 : -3) : 0;
            return (
              <g key={i}>
                <rect
                  x={132 - bar.w / 2 + shift}
                  y={bar.y}
                  width={bar.w}
                  height={bar.h}
                  fill={bar.c}
                />
                {/* 물결 반짝임 도트 */}
                <rect
                  x={132 - bar.w / 2 + shift - 4}
                  y={bar.y}
                  width="2"
                  height={bar.h}
                  fill="#ffffff"
                  opacity={isShimmering && (i + shimmer) % 2 === 0 ? 0.8 : 0.3}
                />
                <rect
                  x={132 + bar.w / 2 + shift + 2}
                  y={bar.y}
                  width="2"
                  height={bar.h}
                  fill="#ffffff"
                  opacity={isShimmering && (i + shimmer) % 2 !== 0 ? 0.8 : 0.3}
                />
              </g>
            );
          })}

          {/* 좌우 강변 갈대 실루엣 */}
          <path d="M0 144 L10 110 L16 144 L28 114 L34 144 Z" fill="#0f172a" />
          <path d="M264 144 L254 112 L248 144 L238 116 L232 144 Z" fill="#0f172a" />
        </g>
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            onClick={() => setIsShimmering(!isShimmering)}
            className={`px-btn ${isShimmering ? 'px-btn-active' : ''}`}
            aria-pressed={isShimmering}
          >
            {isShimmering ? t('demo.additions.pixelart.shimmerPlay') : t('demo.additions.pixelart.shimmerPause')}
          </button>
        </div>

        <div className="px-slider-row">
          <label className="px-slider-label">
            <span className="px-slider-name">{t('demo.additions.pixelart.sunElevation')}</span>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={elevation}
              onChange={(e) => setElevation(e.currentTarget.valueAsNumber)}
              className="px-slider"
              aria-label={t('demo.additions.pixelart.sunElevation')}
              aria-controls={id}
            />
            <span className="px-slider-val">{elevation}</span>
          </label>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 7. 비 내리는 네온 골목 (px-rainy-neon-alley)
 * ============================================================================ */
export function PixelRainyNeonAlleyDemo() {
  const { t } = useLocale();
  const [rainIntensity, setRainIntensity] = useState(1); // 0: 맑음, 1: 보통, 2: 폭우
  const [paletteMode, setPaletteMode] = useState<'cyan' | 'amber'>('cyan');
  const [isPlaying, setIsPlaying] = useState(false);
  const [tick, setTick] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId();

  usePixelAnimation(
    () => {
      setTick((prev) => (prev + 1) % 12);
    },
    isPlaying ? 90 : null,
    containerRef
  );

  const neonPrimary = paletteMode === 'cyan' ? '#06b6d4' : '#f59e0b';
  const neonSecondary = paletteMode === 'cyan' ? '#f43f5e' : '#10b981';
  // Math.random() 대신 결정론적 tick 시퀀스로 깜빡임 제어
  const isFlicker = isPlaying && (tick === 3 || tick === 7);

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demo.additions.pixelart.alleyArtwork')}
      >
        <rect width="264" height="144" fill="#080812" />

        {/* 건물 벽돌 텍스처와 실루엣 (간판, 배관, 창문) */}
        <g aria-hidden="true">
          {/* 좌측 건물 벽돌 */}
          <rect x="0" y="8" width="76" height="124" fill="#13141f" stroke="#090a14" strokeWidth="1" />
          {[18, 36, 54, 72, 90, 108].map((by) => (
            <line key={by} x1="0" y1={by} x2="76" y2={by} stroke="#1e1e2e" strokeWidth="1" strokeDasharray="6 4" />
          ))}

          {/* 창문 (노란 픽셀 조명) */}
          <rect x="14" y="22" width="14" height="18" fill="#fef08a" opacity="0.4" />
          <rect x="42" y="22" width="14" height="18" fill="#090a14" />
          <rect x="14" y="52" width="14" height="18" fill="#090a14" />
          <rect x="42" y="52" width="14" height="18" fill="#fef08a" opacity="0.6" />

          {/* 비상 탈출 사다리 */}
          <rect x="62" y="16" width="3" height="96" fill="#313244" />
          {[26, 42, 58, 74, 90, 106].map((y) => (
            <rect key={y} x="56" y={y} width="16" height="2" fill="#45475a" />
          ))}

          {/* 우측 건물 */}
          <rect x="190" y="14" width="74" height="118" fill="#13141f" stroke="#090a14" strokeWidth="1" />
          {[24, 44, 64, 84, 104].map((by) => (
            <line key={by} x1="190" y1={by} x2="264" y2={by} stroke="#1e1e2e" strokeWidth="1" strokeDasharray="8 4" />
          ))}
          <rect x="210" y="30" width="16" height="20" fill="#fef08a" opacity="0.5" />
          <rect x="236" y="30" width="16" height="20" fill="#090a14" />

          {/* 골목 전깃줄 */}
          <path d="M76 24 Q132 40 190 28" fill="none" stroke="#262638" strokeWidth="1.5" />
          <path d="M76 34 Q132 52 190 38" fill="none" stroke="#262638" strokeWidth="1" />
        </g>

        {/* 중앙 레트로 네온 간판 */}
        <g transform="translate(132, 38)" aria-hidden="true">
          <rect x="-42" y="-18" width="84" height="36" rx="4" fill="#0b0b14" stroke="#2b2d42" strokeWidth="2" />
          <rect
            x="-36"
            y="-12"
            width="72"
            height="24"
            rx="2"
            fill={isFlicker ? '#090a14' : neonPrimary}
            opacity={isFlicker ? 0.2 : 0.9}
          />
          {/* 네온 한글/영문 도트 텍스트 형상 */}
          <rect x="-28" y="-6" width="12" height="12" fill="#ffffff" />
          <rect x="-10" y="-6" width="12" height="12" fill="#ffffff" />
          <rect x="8" y="-6" width="12" height="12" fill="#ffffff" />
          <rect x="-24" y="-2" width="4" height="4" fill="#090a14" />
          <rect x="-6" y="-2" width="4" height="4" fill="#090a14" />
          <rect x="12" y="-2" width="4" height="4" fill="#090a14" />

          {/* 하단 보조 네온 바 */}
          <rect x="-24" y="24" width="48" height="8" rx="2" fill={neonSecondary} />
        </g>

        {/* 젖은 아스팔트 바닥과 네온 반사광 */}
        <g aria-hidden="true">
          <rect x="0" y="118" width="264" height="26" fill="#0d0e1a" />
          <ellipse cx="132" cy="128" rx="54" ry="10" fill={neonPrimary} opacity="0.3" />
          <ellipse cx="132" cy="132" rx="34" ry="5" fill={neonSecondary} opacity="0.25" />

          {/* 물웅덩이 픽셀 파문 고리 */}
          {rainIntensity > 0 && (
            <>
              <ellipse
                cx="96"
                cy="126"
                rx={(tick % 4 + 1) * 4}
                ry={(tick % 4 + 1) * 1.5}
                fill="none"
                stroke="#67e8f9"
                strokeWidth="1"
                opacity={1 - (tick % 4) * 0.25}
              />
              <ellipse
                cx="168"
                cy="132"
                rx={((tick + 2) % 4 + 1) * 4}
                ry={((tick + 2) % 4 + 1) * 1.5}
                fill="none"
                stroke="#f43f5e"
                strokeWidth="1"
                opacity={1 - ((tick + 2) % 4) * 0.25}
              />
            </>
          )}
        </g>

        {/* 사선 빗줄기 (65도 각도) */}
        {rainIntensity > 0 && (
          <g aria-hidden="true">
            {Array.from({ length: rainIntensity * 16 }).map((_, i) => {
              const x = (i * 19 + (isPlaying ? tick * 14 : 0)) % 264;
              const y = (i * 13 + (isPlaying ? tick * 22 : 0)) % 120;
              return (
                <line
                  key={i}
                  x1={x}
                  y1={y}
                  x2={x - 4}
                  y2={y + 8}
                  stroke="#93c5fd"
                  strokeWidth="1.2"
                  opacity={rainIntensity === 2 ? 0.75 : 0.45}
                />
              );
            })}
          </g>
        )}
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-btn ${isPlaying ? 'px-btn-active' : ''}`}
            aria-pressed={isPlaying}
          >
            {isPlaying ? t('demo.additions.pixelart.neonPlay') : t('demo.additions.pixelart.neonPause')}
          </button>

          <button
            type="button"
            onClick={() => setPaletteMode((m) => (m === 'cyan' ? 'amber' : 'cyan'))}
            className="px-btn"
            aria-pressed={paletteMode === 'amber'}
          >
            {paletteMode === 'cyan' ? t('demo.additions.pixelart.neonCyan') : t('demo.additions.pixelart.neonAmber')}
          </button>
        </div>

        <div className="px-slider-row">
          <label className="px-slider-label">
            <span className="px-slider-name">{t('demo.additions.pixelart.rainIntensity')}</span>
            <input
              type="range"
              min="0"
              max="2"
              step="1"
              value={rainIntensity}
              onChange={(e) => setRainIntensity(e.currentTarget.valueAsNumber)}
              className="px-slider"
              aria-label={t('demo.additions.pixelart.rainIntensity')}
              aria-controls={id}
            />
            <span className="px-slider-val">{rainIntensity}</span>
          </label>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 8. 아이소메트릭 테라스 성채 (px-isometric-terrace-citadel)
 * ============================================================================ */
export function PixelIsometricTerraceCitadelDemo() {
  const { t } = useLocale();
  const [activeTier, setActiveTier] = useState<1 | 2 | 3>(3);
  const [lightSide, setLightSide] = useState<'east' | 'west'>('east');
  const id = useId();

  // 조명 각도에 따른 면 색상 팔레트
  const topColor = '#a7f3d0';
  const leftColor = lightSide === 'east' ? '#34d399' : '#059669';
  const rightColor = lightSide === 'east' ? '#059669' : '#34d399';

  return (
    <div className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demo.additions.pixelart.citadelArtwork')}
      >
        <rect width="264" height="144" fill="#0a0f1d" />

        {/*
          성채 아이소메트릭 블록 렌더링 (2:1 비율: x±2w, y±w)
          중심 y를 50으로 배치하여 1층 바닥 하단이 y=140에 안착, viewBox(144) 밖으로 잘리지 않고 여백 완벽 보존!
        */}
        <g transform="translate(132, 50)" aria-hidden="true">
          {/* 1층: 기단 성벽 (Tier 1) - y=38 배치, 높이 52 -> 바닥 90 (전체 y=140) */}
          <g transform="translate(0, 38)">
            {/* 상단 다이아몬드 면 */}
            <polygon points="0,-24 56,4 0,32 -56,4" fill="#334155" stroke="#1e293b" strokeWidth="1" />
            {/* 좌측면 */}
            <polygon points="-56,4 0,32 0,52 -56,24" fill={leftColor} stroke="#047857" strokeWidth="1" />
            {/* 우측면 */}
            <polygon points="0,32 56,4 56,24 0,52" fill={rightColor} stroke="#047857" strokeWidth="1" />

            {/* 석조 성벽 줄눈 픽셀 디테일 */}
            <line x1="-28" y1="14" x2="-28" y2="38" stroke="#065f46" strokeWidth="1" />
            <line x1="28" y1="14" x2="28" y2="38" stroke="#065f46" strokeWidth="1" />
            <line x1="-56" y1="14" x2="0" y2="42" stroke="#065f46" strokeWidth="1" strokeDasharray="6 6" />
            <line x1="0" y1="42" x2="56" y2="14" stroke="#065f46" strokeWidth="1" strokeDasharray="6 6" />

            {/* 기단 진입 석조 계단 */}
            <polygon points="0,32 14,25 14,31 0,38" fill="#64748b" />
            <polygon points="0,38 14,31 14,37 0,44" fill="#475569" />
          </g>

          {/* 2층: 테라스 정원 (Tier 2) */}
          {activeTier >= 2 && (
            <g transform="translate(0, 18)">
              {/* 상단 정원 잔디면 */}
              <polygon points="0,-20 40,0 0,20 -40,0" fill={topColor} stroke="#6ee7b7" strokeWidth="1" />
              {/* 테라스 좌측 벽 */}
              <polygon points="-40,0 0,20 0,34 -40,14" fill={leftColor} stroke="#047857" strokeWidth="1" />
              {/* 테라스 우측 벽 */}
              <polygon points="0,20 40,0 40,14 0,34" fill={rightColor} stroke="#047857" strokeWidth="1" />

              {/* 테라스 꽃밭 픽셀 */}
              <rect x="-18" y="-6" width="3" height="3" fill="#f43f5e" />
              <rect x="-12" y="2" width="3" height="3" fill="#fbbf24" />
              <rect x="16" y="-4" width="3" height="3" fill="#38bdf8" />
              <rect x="10" y="4" width="3" height="3" fill="#c084fc" />

              {/* 중앙 분수대 */}
              <circle cx="0" cy="0" r="7" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
              <rect x="-1" y="-4" width="2" height="4" fill="#ffffff" />
            </g>
          )}

          {/* 3층: 탑루 성채 (Tier 3) */}
          {activeTier >= 3 && (
            <g transform="translate(0, -8)">
              {/* 탑 상단 지붕 */}
              <polygon points="0,-16 24,-4 0,8 -24,-4" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="1" />
              {/* 탑 좌측벽 */}
              <polygon points="-24,-4 0,8 0,26 -24,14" fill={leftColor} stroke="#047857" strokeWidth="1" />
              {/* 탑 우측벽 */}
              <polygon points="0,8 24,-4 24,14 0,26" fill={rightColor} stroke="#047857" strokeWidth="1" />

              {/* 성채 총안 흉벽 디테일 */}
              <rect x="-18" y="-12" width="5" height="5" fill="#1e293b" />
              <rect x="13" y="-12" width="5" height="5" fill="#1e293b" />

              {/* 픽셀 아치형 성문 */}
              <polygon points="-5,18 5,23 5,29 -5,24" fill="#090d16" />
              <rect x="-1" y="19" width="2" height="4" fill="#facc15" />
            </g>
          )}
        </g>
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            onClick={() => setActiveTier(1)}
            className={`px-btn ${activeTier === 1 ? 'px-btn-active' : ''}`}
            aria-pressed={activeTier === 1}
          >
            {t('demo.additions.pixelart.tier1')}
          </button>

          <button
            type="button"
            onClick={() => setActiveTier(2)}
            className={`px-btn ${activeTier === 2 ? 'px-btn-active' : ''}`}
            aria-pressed={activeTier === 2}
          >
            {t('demo.additions.pixelart.tier2')}
          </button>

          <button
            type="button"
            onClick={() => setActiveTier(3)}
            className={`px-btn ${activeTier === 3 ? 'px-btn-active' : ''}`}
            aria-pressed={activeTier === 3}
          >
            {t('demo.additions.pixelart.tier3')}
          </button>

          <button
            type="button"
            onClick={() => setLightSide((s) => (s === 'east' ? 'west' : 'east'))}
            className="px-btn"
            aria-pressed={lightSide === 'west'}
          >
            {lightSide === 'east' ? t('demo.additions.pixelart.lightEast') : t('demo.additions.pixelart.lightWest')}
          </button>
        </div>
      </div>
    </div>
  );
}

export const PIXEL_ENVIRONMENTS_DEMOS = {
  'px-parallax-mountain-depth': PixelParallaxMountainDepthDemo,
  'px-sunset-river-reflection': PixelSunsetRiverReflectionDemo,
  'px-rainy-neon-alley': PixelRainyNeonAlleyDemo,
  'px-isometric-terrace-citadel': PixelIsometricTerraceCitadelDemo,
};
