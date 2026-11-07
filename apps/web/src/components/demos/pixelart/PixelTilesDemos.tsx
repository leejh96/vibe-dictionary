import { useState, useRef, useId, type KeyboardEvent } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

/* ============================================================================
 * 9. 4방향 지형 오토타일 (px-autotile-terrain-bitmask)
 * ============================================================================ */
export function PixelAutotileTerrainBitmaskDemo() {
  const { t } = useLocale();
  // 5열 x 4행 타일 맵 (true = 잔디, false = 흙)
  const [grid, setGrid] = useState<boolean[]>([
    false, true,  true,  false, false,
    false, true,  true,  true,  false,
    false, false, true,  true,  false,
    false, false, false, false, false,
  ]);
  const [focusedCell, setFocusedCell] = useState(0);
  const cellRefs = useRef<(SVGGElement | null)[]>([]);
  const id = useId();

  const toggleCell = (index: number) => {
    setGrid((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const setIsland = () => {
    setGrid([
      false, false, false, false, false,
      false, true,  true,  false, false,
      false, true,  true,  false, false,
      false, false, false, false, false,
    ]);
  };

  const resetAll = () => {
    setGrid(new Array(20).fill(false));
  };

  // 4방향 이웃 비트마스크 계산 (N=1, E=2, S=4, W=8)
  const getMask = (x: number, y: number) => {
    let mask = 0;
    if (y > 0 && grid[(y - 1) * 5 + x]) mask |= 1;
    if (x < 4 && grid[y * 5 + (x + 1)]) mask |= 2;
    if (y < 3 && grid[(y + 1) * 5 + x]) mask |= 4;
    if (x > 0 && grid[y * 5 + (x - 1)]) mask |= 8;
    return mask;
  };

  // 키보드 방향키 이동 및 Enter/Space 선택 지원: 로빙 tabindex와 실제 SVG 컨트롤 focus() 연동
  const handleKeyDown = (e: KeyboardEvent, index: number) => {
    const col = index % 5;
    const row = Math.floor(index / 5);
    let nextIndex: number;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextIndex = row * 5 + ((col + 1) % 5);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      nextIndex = row * 5 + ((col - 1 + 5) % 5);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = ((row + 1) % 4) * 5 + col;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = ((row - 1 + 4) % 4) * 5 + col;
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleCell(index);
      return;
    } else {
      return;
    }

    setFocusedCell(nextIndex);
    cellRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="group"
        aria-label={t('demo.additions.pixelart.autotileArtwork')}
      >
        <rect width="264" height="144" fill="#1e293b" aria-hidden="true" />

        {/* 5x4 격자 렌더링 (각 셀 36x24 크기, 시작 x=42, y=24) */}
        <g transform="translate(42, 24)">
          {grid.map((isGrass, i) => {
            const col = i % 5;
            const row = Math.floor(i / 5);
            const x = col * 36;
            const y = row * 24;
            const mask = isGrass ? getMask(col, row) : 0;
            const isFocused = focusedCell === i;

            // 연결된 방향은 셀 경계 끝까지 잔디를 채워 흙 간격 없이 완전히 이어짐!
            const padT = (mask & 1) !== 0 ? 0 : 2;
            const padR = (mask & 2) !== 0 ? 0 : 2;
            const padB = (mask & 4) !== 0 ? 0 : 2;
            const padL = (mask & 8) !== 0 ? 0 : 2;

            const grassX = x + padL;
            const grassY = y + padT;
            const grassW = 36 - padL - padR;
            const grassH = 24 - padT - padB;

            const cellLabel = t('demo.additions.pixelart.tileCell', {
              row: row + 1,
              col: col + 1,
              type: isGrass ? t('demo.additions.pixelart.grass') : t('demo.additions.pixelart.dirt'),
            });

            return (
              <g
                key={i}
                ref={(el) => {
                  cellRefs.current[i] = el;
                }}
                data-demo-control
                role="button"
                tabIndex={isFocused ? 0 : -1}
                aria-label={cellLabel}
                aria-pressed={isGrass}
                onClick={() => {
                  setFocusedCell(i);
                  cellRefs.current[i]?.focus();
                  toggleCell(i);
                }}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="px-cell-btn"
              >
                {/* 흙 바탕 */}
                <rect x={x} y={y} width="36" height="24" fill="#78350f" stroke="#451a03" strokeWidth="0.75" aria-hidden="true" />
                <rect x={x + 6} y={y + 6} width="3" height="2" fill="#92400e" aria-hidden="true" />
                <rect x={x + 22} y={y + 16} width="4" height="2" fill="#581c87" opacity="0.3" aria-hidden="true" />

                {/* 잔디 타일: 연결된 방향은 틈새 없이 꽉 채움 */}
                {isGrass && (
                  <g aria-hidden="true">
                    {/* 잔디 본체 (시각적으로 이어진 영역) */}
                    <rect x={grassX} y={grassY} width={grassW} height={grassH} fill="#15803d" />

                    {/* 상단 하이라이트 (북쪽 연결 없을 때만) */}
                    {(mask & 1) === 0 && (
                      <rect x={grassX} y={grassY} width={grassW} height={4} fill="#22c55e" />
                    )}

                    {/* 가장자리 음영 경계 */}
                    {(mask & 1) === 0 && <rect x={grassX} y={grassY} width={grassW} height="2" fill="#166534" />}
                    {(mask & 4) === 0 && <rect x={grassX} y={grassY + grassH - 2} width={grassW} height="2" fill="#14532d" />}
                    {(mask & 8) === 0 && <rect x={grassX} y={grassY} width="2" height={grassH} fill="#166534" />}
                    {(mask & 2) === 0 && <rect x={grassX + grassW - 2} y={grassY} width="2" height={grassH} fill="#14532d" />}

                    {/* 꽃 도트 장식 */}
                    {i === 6 && <rect x={x + 16} y={y + 10} width="4" height="4" fill="#facc15" />}
                    {i === 7 && <rect x={x + 12} y={y + 12} width="3" height="3" fill="#f43f5e" />}
                  </g>
                )}

                {/* 키보드 포커스 링 */}
                {isFocused && (
                  <rect
                    x={x + 1}
                    y={y + 1}
                    width="34"
                    height="22"
                    fill="none"
                    stroke="#facc15"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                    aria-hidden="true"
                  />
                )}
              </g>
            );
          })}
        </g>
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            onClick={resetAll}
            className="px-btn"
          >
            {t('demo.additions.pixelart.resetGrid')}
          </button>

          <button
            type="button"
            onClick={setIsland}
            className="px-btn"
          >
            {t('demo.additions.pixelart.islandPreset')}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 10. 디더링 명암 램프 (px-dither-gradient-ramp)
 * ============================================================================ */
export function PixelDitherGradientRampDemo() {
  const { t } = useLocale();
  const [patternMode, setPatternMode] = useState<'bayer' | 'checker' | 'poster'>('bayer');
  const [lightOffset, setLightOffset] = useState(0);
  const id = useId();

  // 4단계 엄선 팔레트
  const C0 = '#0f172a'; // Deep Shadow
  const C1 = '#0369a1'; // Mid Shadow
  const C2 = '#38bdf8'; // Mid Highlight
  const C3 = '#f0f9ff'; // Specular White

  // 4x4 베이어 매트릭스 (0~15 정규화)
  const BAYER4 = [
    [0, 8, 2, 10],
    [12, 4, 14, 6],
    [3, 11, 1, 9],
    [15, 7, 13, 5],
  ];

  /*
   * 픽셀 구체 명암 계산 (구체 중심 132, 54 고정! 광원만 이동!)
   * DOM 절약을 위해 각 셀(2x2)의 색상을 패스로 묶어 생성.
   */
  const radius = 34;
  const sphereCenterX = 132;
  const sphereCenterY = 54;
  const lightX = sphereCenterX + lightOffset * 1.5;
  const lightY = sphereCenterY - 12;

  const pathC1: string[] = [];
  const pathC2: string[] = [];
  const pathC3: string[] = [];

  const cellSize = 3;
  for (let dy = -radius; dy <= radius; dy += cellSize) {
    for (let dx = -radius; dx <= radius; dx += cellSize) {
      const distFromCenter = Math.sqrt(dx * dx + dy * dy);
      if (distFromCenter <= radius) {
        const px = sphereCenterX + dx;
        const py = sphereCenterY + dy;

        // 광원과의 거리에 따른 밝기 (0: 어두움 ~ 1: 밝음)
        const distFromLight = Math.sqrt((px - lightX) * (px - lightX) + (py - lightY) * (py - lightY));
        const rawBrightness = Math.max(0, Math.min(1, 1 - distFromLight / (radius * 1.6)));

        // 패턴 모드에 따른 최종 색상 인덱스 (0, 1, 2, 3) 결정
        let colorIdx = 0;
        if (patternMode === 'poster') {
          if (rawBrightness > 0.75) colorIdx = 3;
          else if (rawBrightness > 0.45) colorIdx = 2;
          else if (rawBrightness > 0.2) colorIdx = 1;
        } else if (patternMode === 'checker') {
          // 2x2 체커보드 디더링
          const gridX = Math.floor(px / cellSize);
          const gridY = Math.floor(py / cellSize);
          const isCheck = (gridX + gridY) % 2 === 0;

          if (rawBrightness > 0.8) colorIdx = 3;
          else if (rawBrightness > 0.65) colorIdx = isCheck ? 3 : 2;
          else if (rawBrightness > 0.45) colorIdx = 2;
          else if (rawBrightness > 0.3) colorIdx = isCheck ? 2 : 1;
          else if (rawBrightness > 0.15) colorIdx = 1;
          else if (rawBrightness > 0.08) colorIdx = isCheck ? 1 : 0;
          else colorIdx = 0;
        } else {
          // 4x4 베이어 매트릭스 순서 디더링 (Bayer 4x4)
          const bx = Math.abs(Math.floor(px / cellSize)) % 4;
          const by = Math.abs(Math.floor(py / cellSize)) % 4;
          const threshold = BAYER4[by][bx] / 16; // 0 ~ 0.9375

          // 밝기 연속체를 3단계 밴드로 나누고, 경계 구간에서 베이어 매트릭스 임계값과 비교
          const scaled = rawBrightness * 3; // 0 ~ 3
          const baseBand = Math.floor(scaled); // 0, 1, 2
          const frac = scaled - baseBand;

          if (baseBand >= 3) {
            colorIdx = 3;
          } else {
            colorIdx = frac > threshold ? baseBand + 1 : baseBand;
          }
        }

        // 해당 색상 패스에 셀 추가
        const rectPath = `M${px} ${py}h${cellSize}v${cellSize}h-${cellSize}Z`;
        if (colorIdx === 1) pathC1.push(rectPath);
        else if (colorIdx === 2) pathC2.push(rectPath);
        else if (colorIdx === 3) pathC3.push(rectPath);
      }
    }
  }

  return (
    <div className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demo.additions.pixelart.ditherArtwork')}
      >
        <rect width="264" height="144" fill="#090d16" />

        {/* 3D 픽셀 구체 (구체는 중앙 132, 54 고정! 광원만 이동!) */}
        <g aria-hidden="true">
          {/* 바닥 그림자 */}
          <ellipse cx="132" cy="94" rx="36" ry="6" fill="#000000" opacity="0.6" />

          {/* 구체 베이스 (C0 어두운 바탕) */}
          <circle cx={sphereCenterX} cy={sphereCenterY} r={radius} fill={C0} />

          {/* 중간톤 1 (C1) 도트 패스 렌더링 */}
          {pathC1.length > 0 && <path d={pathC1.join(' ')} fill={C1} />}

          {/* 밝은톤 2 (C2) 도트 패스 렌더링 */}
          {pathC2.length > 0 && <path d={pathC2.join(' ')} fill={C2} />}

          {/* 하이라이트 (C3) 도트 패스 렌더링 */}
          {pathC3.length > 0 && <path d={pathC3.join(' ')} fill={C3} />}

          {/* 광원 위치 가이드 도트 */}
          <circle cx={lightX} cy={lightY} r="2" fill="#facc15" opacity="0.8" />
        </g>

        {/* 하단 수평 그라데이션 램프 바 (x=24, y=114, 폭 216, 높이 16) */}
        <g transform="translate(24, 114)" aria-hidden="true">
          <rect x="0" y="0" width="54" height="16" fill={C0} />
          <rect x="54" y="0" width="54" height="16" fill={C1} />
          <rect x="108" y="0" width="54" height="16" fill={C2} />
          <rect x="162" y="0" width="54" height="16" fill={C3} />

          {/* 램프 사이 디더링 경계 */}
          {patternMode !== 'poster' && (
            <>
              {/* C0와 C1 사이 */}
              {[0, 4, 8, 12].map((y) => (
                <g key={`d1-${y}`}>
                  <rect x="50" y={y} width="4" height="2" fill={C1} />
                  <rect x="54" y={y + 2} width="4" height="2" fill={C0} />
                </g>
              ))}
              {/* C1과 C2 사이 */}
              {[0, 4, 8, 12].map((y) => (
                <g key={`d2-${y}`}>
                  <rect x="104" y={y} width="4" height="2" fill={C2} />
                  <rect x="108" y={y + 2} width="4" height="2" fill={C1} />
                </g>
              ))}
              {/* C2와 C3 사이 */}
              {[0, 4, 8, 12].map((y) => (
                <g key={`d3-${y}`}>
                  <rect x="158" y={y} width="4" height="2" fill={C3} />
                  <rect x="162" y={y + 2} width="4" height="2" fill={C2} />
                </g>
              ))}
            </>
          )}

          {/* 외곽선 */}
          <rect x="0" y="0" width="216" height="16" fill="none" stroke="#475569" strokeWidth="1" />
        </g>
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            onClick={() => setPatternMode('bayer')}
            className={`px-btn ${patternMode === 'bayer' ? 'px-btn-active' : ''}`}
            aria-pressed={patternMode === 'bayer'}
          >
            {t('demo.additions.pixelart.patternBayer')}
          </button>

          <button
            type="button"
            onClick={() => setPatternMode('checker')}
            className={`px-btn ${patternMode === 'checker' ? 'px-btn-active' : ''}`}
            aria-pressed={patternMode === 'checker'}
          >
            {t('demo.additions.pixelart.patternChecker')}
          </button>

          <button
            type="button"
            onClick={() => setPatternMode('poster')}
            className={`px-btn ${patternMode === 'poster' ? 'px-btn-active' : ''}`}
            aria-pressed={patternMode === 'poster'}
          >
            {t('demo.additions.pixelart.patternPoster')}
          </button>
        </div>

        <div className="px-slider-row">
          <label className="px-slider-label">
            <span className="px-slider-name">{t('demo.additions.pixelart.lightAngle')}</span>
            <input
              type="range"
              min="-15"
              max="15"
              step="1"
              value={lightOffset}
              onChange={(e) => setLightOffset(e.currentTarget.valueAsNumber)}
              className="px-slider"
              aria-label={t('demo.additions.pixelart.lightAngle')}
              aria-controls={id}
            />
            <span className="px-slider-val">{lightOffset}</span>
          </label>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 11. 픽셀 반복 패턴 시밍 (px-seamless-pattern-repeat)
 * ============================================================================ */
export function PixelSeamlessPatternRepeatDemo() {
  const { t } = useLocale();
  const [highlightSeams, setHighlightSeams] = useState(true);
  const [offset, setOffset] = useState(0);
  const id = useId();

  // 40×36 논리 타일을 마스터와 반복 미리보기에 같은 비율로 그린다.
  const renderTile = (w: number) => {
    const scale = w / 40;
    return (
      <g>
        <rect x="0" y="0" width={w} height={11 * scale} fill="#334155" />
        <rect x="0" y={12 * scale} width={19 * scale} height={11 * scale} fill="#475569" />
        <rect x={20 * scale} y={12 * scale} width={20 * scale} height={11 * scale} fill="#334155" />
        <rect x="0" y={24 * scale} width={w} height={12 * scale} fill="#475569" />

        {/* 줄눈 선 */}
        <rect x="0" y={11 * scale} width={w} height={1 * scale} fill="#0f172a" />
        <rect x={19 * scale} y={11 * scale} width={1 * scale} height={13 * scale} fill="#0f172a" />
        <rect x="0" y={23 * scale} width={w} height={1 * scale} fill="#0f172a" />

        {/* 이끼 도트 */}
        <rect x={2 * scale} y={2 * scale} width={3 * scale} height={2 * scale} fill="#10b981" />
        <rect x={28 * scale} y={14 * scale} width={4 * scale} height={2 * scale} fill="#10b981" />
      </g>
    );
  };

  return (
    <div className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demo.additions.pixelart.seamArtwork')}
      >
        <defs>
          {/* 우측 3열x3행 타일링 영역 클리핑 마스크: 3*40=120, 3*36=108 규격에 정확히 일치 */}
          <clipPath id={`repeat-clip-${id}`}>
            <rect x="0" y="0" width="120" height="108" />
          </clipPath>
        </defs>

        <rect width="264" height="144" fill="#0f172a" />

        {/* 좌측: 40x36 논리 타일 2배 확대 마스터창 (80x72에 정확히 맞아 빈 줄 없음) */}
        <g transform="translate(16, 18)" aria-hidden="true">
          <rect width="84" height="76" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
          <g transform="translate(2, 2)">{renderTile(80)}</g>

          {/* 결합선 강조 테두리 */}
          {highlightSeams && (
            <rect width="84" height="76" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 2" />
          )}

          {/* 마스터 타일 캡션 배지 */}
          <rect x="0" y="82" width="84" height="16" rx="3" fill="#1e293b" />
          <rect x="18" y="87" width="48" height="6" fill="#38bdf8" />
        </g>

        {/* 우측: 3열x3행 반복 타일링 프리뷰 (폭 120, 높이 108 - offset=0에서 4px 여분 열 없이 꽉 참) */}
        <g transform="translate(116, 18)" aria-hidden="true">
          <g clipPath={`url(#repeat-clip-${id})`}>
            <rect width="120" height="108" fill="#1e293b" />
            {/* 오프셋 스크롤 적용 */}
            <g transform={`translate(${-(offset % 40)}, 0)`}>
              {[0, 1, 2, 3].map((gx) =>
                [0, 1, 2].map((gy) => {
                  const tx = gx * 40;
                  const ty = gy * 36;
                  return (
                    <g key={`${gx}-${gy}`} transform={`translate(${tx}, ${ty})`}>
                      {renderTile(40)}

                      {/* 이음매 경계 녹색 선 */}
                      {highlightSeams && (
                        <rect width="40" height="36" fill="none" stroke="#22c55e" strokeWidth="1" />
                      )}
                    </g>
                  );
                })
              )}
            </g>
          </g>
          {/* 마스크 클리핑 테두리 프레임 */}
          <rect width="120" height="108" fill="none" stroke="#64748b" strokeWidth="2" />
        </g>
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            onClick={() => setHighlightSeams(!highlightSeams)}
            className={`px-btn ${highlightSeams ? 'px-btn-active' : ''}`}
            aria-pressed={highlightSeams}
          >
            {highlightSeams ? t('demo.additions.pixelart.seamHighlightOn') : t('demo.additions.pixelart.seamHighlightOff')}
          </button>
        </div>

        <div className="px-slider-row">
          <label className="px-slider-label">
            <span className="px-slider-name">{t('demo.additions.pixelart.offsetShift')}</span>
            <input
              type="range"
              min="0"
              max="40"
              step="1"
              value={offset}
              onChange={(e) => setOffset(e.currentTarget.valueAsNumber)}
              className="px-slider"
              aria-label={t('demo.additions.pixelart.offsetShift')}
              aria-controls={id}
            />
            <span className="px-slider-val">
              {offset === 40 ? `${offset} (${t('demo.additions.pixelart.oneCycle')})` : offset}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 12. 팔레트 교체 텍스처 (px-palette-swap-texture)
 * ============================================================================ */
export function PixelPaletteSwapTextureDemo() {
  const { t } = useLocale();
  const [preset, setPreset] = useState<'forest' | 'magma' | 'frost' | 'void'>('forest');
  const id = useId();

  // 4종 5단계 인덱스 색상 룩업 테이블
  const palettes = {
    forest: ['#0f291e', '#166534', '#22c55e', '#86efac', '#fef08a'],
    magma:  ['#450a0a', '#991b1b', '#ea580c', '#facc15', '#ffffff'],
    frost:  ['#082f49', '#0284c7', '#38bdf8', '#bae6fd', '#ffffff'],
    void:   ['#180828', '#581c87', '#a855f7', '#e879f9', '#fdf4ff'],
  };

  const lut = palettes[preset];

  return (
    <div className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demo.additions.pixelart.paletteSwapArtwork')}
      >
        <rect width="264" height="144" fill="#090d16" />

        {/* 중앙: 기사 문장 방패 픽셀 텍스처 (x=132, y=68) */}
        <g transform="translate(132, 64)" aria-hidden="true">
          {/* 바닥 그림자 */}
          <ellipse cx="0" cy="42" rx="34" ry="6" fill="#000000" opacity="0.5" />

          {/* 방패 외곽 림 (LUT 0 & LUT 1) */}
          <path
            d="M-32 -36 H32 V4 C32 26 0 42 0 42 C0 42 -32 26 -32 4 Z"
            fill={lut[0]}
            stroke={lut[1]}
            strokeWidth="2"
          />

          {/* 방패 내부 본체 (LUT 1) */}
          <path
            d="M-28 -32 H28 V2 C28 22 0 36 0 36 C0 36 -28 22 -28 2 Z"
            fill={lut[1]}
          />

          {/* 십자 문장 엠블럼 (LUT 2 & LUT 3) */}
          <rect x="-6" y="-30" width="12" height="58" fill={lut[2]} />
          <rect x="-24" y="-12" width="48" height="12" fill={lut[2]} />
          <rect x="-4" y="-28" width="8" height="54" fill={lut[3]} />
          <rect x="-22" y="-10" width="44" height="8" fill={lut[3]} />

          {/* 중심 다이아몬드 보석 (LUT 4 하이라이트) */}
          <polygon points="0,-16 10,-6 0,4 -10,-6" fill={lut[4]} />
          <polygon points="0,-12 6,-6 0,0 -6,-6" fill="#ffffff" />

          {/* 4분면 텍스처 도트 패턴 */}
          <rect x="-18" y="-22" width="4" height="4" fill={lut[3]} />
          <rect x="14" y="-22" width="4" height="4" fill={lut[3]} />
          <rect x="-18" y="10" width="4" height="4" fill={lut[2]} />
          <rect x="14" y="10" width="4" height="4" fill={lut[2]} />
        </g>
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            onClick={() => setPreset('forest')}
            className={`px-btn ${preset === 'forest' ? 'px-btn-active' : ''}`}
            aria-pressed={preset === 'forest'}
          >
            {t('demo.additions.pixelart.paletteForest')}
          </button>

          <button
            type="button"
            onClick={() => setPreset('magma')}
            className={`px-btn ${preset === 'magma' ? 'px-btn-active' : ''}`}
            aria-pressed={preset === 'magma'}
          >
            {t('demo.additions.pixelart.paletteMagma')}
          </button>

          <button
            type="button"
            onClick={() => setPreset('frost')}
            className={`px-btn ${preset === 'frost' ? 'px-btn-active' : ''}`}
            aria-pressed={preset === 'frost'}
          >
            {t('demo.additions.pixelart.paletteFrost')}
          </button>

          <button
            type="button"
            onClick={() => setPreset('void')}
            className={`px-btn ${preset === 'void' ? 'px-btn-active' : ''}`}
            aria-pressed={preset === 'void'}
          >
            {t('demo.additions.pixelart.paletteVoid')}
          </button>
        </div>
      </div>
    </div>
  );
}

export const PIXEL_TILES_DEMOS = {
  'px-autotile-terrain-bitmask': PixelAutotileTerrainBitmaskDemo,
  'px-dither-gradient-ramp': PixelDitherGradientRampDemo,
  'px-seamless-pattern-repeat': PixelSeamlessPatternRepeatDemo,
  'px-palette-swap-texture': PixelPaletteSwapTextureDemo,
};
