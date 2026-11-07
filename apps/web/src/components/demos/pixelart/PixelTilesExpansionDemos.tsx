import { useId, useRef, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';
import { usePixelAnimation } from './usePixelAnimation';

// ============================================================================
// 1. px-dual-grid-shore-corners — Dual-Grid Shore Corners (4-Bit Autotile)
// ============================================================================
type ShorePreset = 'bay' | 'saddle' | 'atoll';

const SHORE_PRESETS: Record<ShorePreset, ReadonlyArray<ReadonlyArray<number>>> = {
  bay: [
    [1, 1, 1, 0],
    [1, 1, 1, 0],
    [1, 1, 0, 0],
    [1, 0, 0, 0],
  ],
  saddle: [
    [1, 0, 1, 0],
    [0, 1, 0, 1],
    [1, 0, 1, 0],
    [0, 1, 0, 1],
  ],
  atoll: [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
};

export function DualGridShoreCornersDemo() {
  const { t } = useLocale();
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [preset, setPreset] = useState<ShorePreset>('bay');
  const [showDualGrid, setShowDualGrid] = useState(true);
  const [foamPhase, setFoamPhase] = useState(0);

  const grid = SHORE_PRESETS[preset];
  const originX = 68;
  const originY = 8;
  const tileSize = 32;

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demos.pixelart.art.dualGridShoreCorners')}
      >
        {/* Deep Ocean Stage Backdrop */}
        <rect width="264" height="144" fill="#082f49" />

        {/* 4x4 Base Logical Terrain Cells (subtle backdrop) */}
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <rect
              key={`logic-${r}-${c}`}
              x={originX + c * tileSize}
              y={originY + r * tileSize}
              width={tileSize}
              height={tileSize}
              fill={cell === 1 ? '#14532d' : '#0c4a6e'}
              opacity="0.35"
            />
          ))
        )}

        {/* 3x3 Half-Tile Offset Dual-Grid Render Tiles */}
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => {
            const nw = grid[r]?.[c] ?? 0;
            const ne = grid[r]?.[c + 1] ?? 0;
            const se = grid[r + 1]?.[c + 1] ?? 0;
            const sw = grid[r + 1]?.[c] ?? 0;
            const mask = nw * 1 + ne * 2 + se * 4 + sw * 8;

            const rx = originX + 16 + c * tileSize;
            const ry = originY + 16 + r * tileSize;
            const half = 16;
            const isSaddle = mask === 5 || mask === 10;

            return (
              <g key={`render-${r}-${c}`} data-shore-mask={mask}>
                {/* Base water fill for render tile */}
                <rect x={rx} y={ry} width={tileSize} height={tileSize} fill="#0284c7" />

                {/* Joined Land Quadrants (seamless grass across connected land corners) */}
                {nw === 1 && (
                  <g data-quadrant="nw" data-land="1">
                    <rect x={rx} y={ry} width={half} height={half} fill="#22c55e" />
                    <rect x={rx + 4} y={ry + 4} width="3" height="3" fill="#166534" />
                    {ne === 0 && <rect x={rx + half - 3} y={ry} width="3" height={half} fill="#fde047" />}
                    {sw === 0 && <rect x={rx} y={ry + half - 3} width={half} height="3" fill="#fde047" />}
                    {ne === 1 && sw === 1 && se === 0 && (
                      <rect x={rx + half - 3} y={ry + half - 3} width="3" height="3" fill="#fde047" />
                    )}
                  </g>
                )}
                {ne === 1 && (
                  <g data-quadrant="ne" data-land="1">
                    <rect x={rx + half} y={ry} width={half} height={half} fill="#22c55e" />
                    <rect x={rx + half + 9} y={ry + 4} width="3" height="3" fill="#166534" />
                    {nw === 0 && <rect x={rx + half} y={ry} width="3" height={half} fill="#fde047" />}
                    {se === 0 && <rect x={rx + half} y={ry + half - 3} width={half} height="3" fill="#fde047" />}
                    {nw === 1 && se === 1 && sw === 0 && (
                      <rect x={rx + half} y={ry + half - 3} width="3" height="3" fill="#fde047" />
                    )}
                  </g>
                )}
                {se === 1 && (
                  <g data-quadrant="se" data-land="1">
                    <rect x={rx + half} y={ry + half} width={half} height={half} fill="#22c55e" />
                    <rect x={rx + half + 9} y={ry + half + 9} width="3" height="3" fill="#166534" />
                    {sw === 0 && <rect x={rx + half} y={ry + half} width="3" height={half} fill="#fde047" />}
                    {ne === 0 && <rect x={rx + half} y={ry + half} width={half} height="3" fill="#fde047" />}
                    {sw === 1 && ne === 1 && nw === 0 && (
                      <rect x={rx + half} y={ry + half} width="3" height="3" fill="#fde047" />
                    )}
                  </g>
                )}
                {sw === 1 && (
                  <g data-quadrant="sw" data-land="1">
                    <rect x={rx} y={ry + half} width={half} height={half} fill="#22c55e" />
                    <rect x={rx + 4} y={ry + half + 9} width="3" height="3" fill="#166534" />
                    {se === 0 && <rect x={rx + half - 3} y={ry + half} width="3" height={half} fill="#fde047" />}
                    {nw === 0 && <rect x={rx} y={ry + half} width={half} height="3" fill="#fde047" />}
                    {se === 1 && nw === 1 && ne === 0 && (
                      <rect x={rx + half - 3} y={ry + half} width="3" height="3" fill="#fde047" />
                    )}
                  </g>
                )}

                {/* Saddle diagonal bridge connector for ambiguous masks 5 & 10 */}
                {isSaddle && (
                  <g data-saddle-bridge={mask}>
                    <rect x={rx + 11} y={ry + 11} width="10" height="10" fill="#fde047" />
                    <rect x={rx + 13} y={ry + 13} width="6" height="6" fill="#22c55e" />
                  </g>
                )}

                {/* Animated sea foam only on water quadrants bordering land */}
                {mask > 0 && mask < 15 && (
                  <g fill="#e0f2fe">
                    {nw === 0 && (
                      <rect
                        x={rx + (foamPhase === 0 ? 4 : 6)}
                        y={ry + (foamPhase === 0 ? 6 : 4)}
                        width="6"
                        height="2"
                      />
                    )}
                    {ne === 0 && (
                      <rect
                        x={rx + half + (foamPhase === 0 ? 6 : 4)}
                        y={ry + (foamPhase === 0 ? 6 : 4)}
                        width="6"
                        height="2"
                      />
                    )}
                    {se === 0 && (
                      <rect
                        x={rx + half + (foamPhase === 0 ? 6 : 4)}
                        y={ry + half + (foamPhase === 0 ? 8 : 6)}
                        width="6"
                        height="2"
                      />
                    )}
                    {sw === 0 && (
                      <rect
                        x={rx + (foamPhase === 0 ? 4 : 6)}
                        y={ry + half + (foamPhase === 0 ? 8 : 6)}
                        width="6"
                        height="2"
                      />
                    )}
                  </g>
                )}

                {/* Dual-Grid Overlay Guides & 4-bit Mask Value */}
                {showDualGrid && (
                  <g>
                    <rect
                      x={rx}
                      y={ry}
                      width={tileSize}
                      height={tileSize}
                      fill="none"
                      stroke="#fde047"
                      strokeWidth="1"
                    />
                    <rect x={rx + 10} y={ry + 11} width="12" height="10" fill="#090d16" opacity="0.85" />
                    <text
                      x={rx + 16}
                      y={ry + 19}
                      fill="#fef08a"
                      fontSize="7"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      {`${mask}`}
                    </text>
                  </g>
                )}
              </g>
            );
          })
        )}

        {/* Logical vertex dots at corners */}
        {showDualGrid &&
          grid.map((row, r) =>
            row.map((cell, c) => (
              <rect
                key={`v-${r}-${c}`}
                x={originX + c * tileSize + 14}
                y={originY + r * tileSize + 14}
                width="4"
                height="4"
                fill={cell === 1 ? '#4ade80' : '#38bdf8'}
              />
            ))
          )}
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            className={`px-btn ${preset === 'bay' ? 'px-btn-active' : ''}`}
            aria-pressed={preset === 'bay'}
            onClick={() => setPreset('bay')}
          >
            {t('demos.pixelart.shore.bay')}
          </button>
          <button
            type="button"
            className={`px-btn ${preset === 'saddle' ? 'px-btn-active' : ''}`}
            aria-pressed={preset === 'saddle'}
            onClick={() => setPreset('saddle')}
          >
            {t('demos.pixelart.shore.saddle')}
          </button>
          <button
            type="button"
            className={`px-btn ${preset === 'atoll' ? 'px-btn-active' : ''}`}
            aria-pressed={preset === 'atoll'}
            onClick={() => setPreset('atoll')}
          >
            {t('demos.pixelart.shore.atoll')}
          </button>
        </div>
        <div className="px-btn-row">
          <button
            type="button"
            className={`px-btn ${showDualGrid ? 'px-btn-active' : ''}`}
            aria-pressed={showDualGrid}
            onClick={() => setShowDualGrid((g) => !g)}
          >
            {showDualGrid ? t('demos.pixelart.shore.guideOn') : t('demos.pixelart.shore.guideOff')}
          </button>
          <button
            type="button"
            className="px-btn"
            onClick={() => setFoamPhase((p) => (p + 1) % 2)}
          >
            {t('demos.pixelart.shore.foamStep')}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 2. px-wang-edge-color-tiles — Wang 4-Edge Color Matching
// ============================================================================
interface WangEdges {
  n: 0 | 1;
  e: 0 | 1;
  s: 0 | 1;
  w: 0 | 1;
}

export function WangEdgeColorTilesDemo() {
  const { t } = useLocale();
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [north, setNorth] = useState<0 | 1>(1);
  const [east, setEast] = useState<0 | 1>(1);
  const [southWestFlip, setSouthWestFlip] = useState(false);
  const [showGuide, setShowGuide] = useState(true);

  const south: 0 | 1 = southWestFlip ? 1 : 0;
  const west: 0 | 1 = southWestFlip ? 0 : 1;

  // Build 3x3 Wang tile matrix whose shared edges always match center (1,1)
  const tiles: ReadonlyArray<ReadonlyArray<WangEdges>> = [
    [
      { n: 0, e: north, s: west, w: 0 },
      { n: 1, e: north, s: north, w: north },
      { n: 0, e: 0, s: east, w: north },
    ],
    [
      { n: west, e: west, s: south, w: 1 },
      { n: north, e: east, s: south, w: west },
      { n: east, e: 1, s: south, w: east },
    ],
    [
      { n: south, e: south, s: 0, w: 0 },
      { n: south, e: south, s: 1, w: south },
      { n: south, e: 0, s: 0, w: south },
    ],
  ];

  const tileSize = 38;
  const startX = 75;
  const startY = 15;

  const edgeColor = (bit: 0 | 1) => (bit === 1 ? '#eab308' : '#0284c7');
  const edgeInner = (bit: 0 | 1) => (bit === 1 ? '#fef08a' : '#38bdf8');

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demos.pixelart.art.wangEdgeColorTiles')}
      >
        <rect width="264" height="144" fill="#0f172a" />

        {tiles.map((row, r) =>
          row.map((edges, c) => {
            const tx = startX + c * tileSize;
            const ty = startY + r * tileSize;
            const cx = tx + tileSize / 2;
            const cy = ty + tileSize / 2;
            const isCenter = r === 1 && c === 1;

            return (
              <g key={`${r}-${c}`}>
                {/* Base turf */}
                <rect x={tx} y={ty} width={tileSize} height={tileSize} fill="#14532d" />

                {/* 4 Triangular Wang Edge Wedges */}
                <polygon
                  points={`${tx},${ty} ${tx + tileSize},${ty} ${cx},${cy}`}
                  fill={edgeColor(edges.n)}
                  opacity="0.85"
                />
                <polygon
                  points={`${tx + tileSize},${ty} ${tx + tileSize},${ty + tileSize} ${cx},${cy}`}
                  fill={edgeColor(edges.e)}
                  opacity="0.85"
                />
                <polygon
                  points={`${tx + tileSize},${ty + tileSize} ${tx},${ty + tileSize} ${cx},${cy}`}
                  fill={edgeColor(edges.s)}
                  opacity="0.85"
                />
                <polygon
                  points={`${tx},${ty + tileSize} ${tx},${ty} ${cx},${cy}`}
                  fill={edgeColor(edges.w)}
                  opacity="0.85"
                />

                {/* Connected Road / Canal Strips across matching edges */}
                <rect x={cx - 4} y={ty} width="8" height="19" fill={edgeInner(edges.n)} />
                <rect x={cx} y={cy - 4} width="19" height="8" fill={edgeInner(edges.e)} />
                <rect x={cx - 4} y={cy} width="8" height="19" fill={edgeInner(edges.s)} />
                <rect x={tx} y={cy - 4} width="19" height="8" fill={edgeInner(edges.w)} />
                <rect x={cx - 5} y={cy - 5} width="10" height="10" fill="#f8fafc" />

                {/* Bowtie diagonal guides */}
                {showGuide && (
                  <g>
                    <line
                      x1={tx}
                      y1={ty}
                      x2={tx + tileSize}
                      y2={ty + tileSize}
                      stroke="#090d16"
                      strokeWidth="1"
                    />
                    <line
                      x1={tx + tileSize}
                      y1={ty}
                      x2={tx}
                      y2={ty + tileSize}
                      stroke="#090d16"
                      strokeWidth="1"
                    />
                  </g>
                )}

                {/* Highlight border on active center tile */}
                <rect
                  x={tx}
                  y={ty}
                  width={tileSize}
                  height={tileSize}
                  fill="none"
                  stroke={isCenter ? '#f43f5e' : '#1e293b'}
                  strokeWidth={isCenter ? 2 : 1}
                />
              </g>
            );
          })
        )}

        {/* Center tile 4-edge bit code readout */}
        <rect x="198" y="16" width="54" height="20" fill="#090d16" stroke="#f43f5e" strokeWidth="1" />
        <text x="225" y="29" fill="#fef08a" fontSize="8" fontFamily="monospace" textAnchor="middle">
          {`${north}${east}${south}${west}`}
        </text>
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            className={`px-btn ${north === 1 ? 'px-btn-active' : ''}`}
            aria-pressed={north === 1}
            onClick={() => setNorth((n) => (n === 1 ? 0 : 1))}
          >
            {t('demos.pixelart.wang.north')}
          </button>
          <button
            type="button"
            className={`px-btn ${east === 1 ? 'px-btn-active' : ''}`}
            aria-pressed={east === 1}
            onClick={() => setEast((e) => (e === 1 ? 0 : 1))}
          >
            {t('demos.pixelart.wang.east')}
          </button>
          <button
            type="button"
            className={`px-btn ${southWestFlip ? 'px-btn-active' : ''}`}
            aria-pressed={southWestFlip}
            onClick={() => setSouthWestFlip((f) => !f)}
          >
            {t('demos.pixelart.wang.southWest')}
          </button>
        </div>
        <div className="px-btn-row">
          <button
            type="button"
            className={`px-btn ${showGuide ? 'px-btn-active' : ''}`}
            aria-pressed={showGuide}
            onClick={() => setShowGuide((g) => !g)}
          >
            {showGuide ? t('demos.pixelart.wang.guideOn') : t('demos.pixelart.wang.guideOff')}
          </button>
          <button
            type="button"
            className="px-btn"
            onClick={() => {
              setNorth(1);
              setEast(1);
              setSouthWestFlip(false);
            }}
          >
            {t('demos.pixelart.wang.reset')}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 3. px-seeded-brick-variants — Seeded Brick Variants (Anti-Repetition)
// ============================================================================
const BRICK_ROWS = [0, 1, 2, 3, 4] as const;
const BRICK_COLS = [0, 1, 2, 3, 4, 5, 6, 7] as const;

export function SeededBrickVariantsDemo() {
  const { t } = useLocale();
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [seed, setSeed] = useState<1 | 2 | 3>(1);
  const [variantsOn, setVariantsOn] = useState(true);
  const [density, setDensity] = useState(50);

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demos.pixelart.art.seededBrickVariants')}
      >
        {/* Dark mortar background */}
        <rect width="264" height="144" fill="#0f172a" />

        {BRICK_ROWS.map((row) =>
          BRICK_COLS.map((col) => {
            const stagger = row % 2 === 1 ? 14 : 0;
            const bx = 12 + col * 28 + stagger;
            const by = 18 + row * 22;
            const mix =
              ((col + 1) * 73 + (row + 1) * 151 + seed * 197) ^
              (seed * 41 * (col + 3) + (row + 2) * 89);
            const hash = ((mix % 100) + 100) % 100;
            const isVariant = variantsOn && hash < density;
            const variantType = ((col + 2) * 29 + (row + 1) * 53 + seed * 71) % 3; // 0: Cracked, 1: Mossy, 2: Recessed dark

            const baseFill = !isVariant
              ? '#475569'
              : variantType === 2
              ? '#334155'
              : '#475569';

            return (
              <g
                key={`${row}-${col}`}
                data-brick-cell={`${row}-${col}`}
                data-brick-variant={isVariant ? variantType : 'plain'}
              >
                {/* Base brick body */}
                <rect x={bx} y={by} width="26" height="18" fill={baseFill} />
                {/* Top specular bevel */}
                <rect
                  x={bx}
                  y={by}
                  width="26"
                  height="3"
                  fill={isVariant && variantType === 2 ? '#475569' : '#64748b'}
                />

                {/* Variant 0: Stepped diagonal crack fissure */}
                {isVariant && variantType === 0 && (
                  <g fill="#0f172a">
                    <rect x={bx + 8} y={by + 3} width="3" height="5" />
                    <rect x={bx + 11} y={by + 8} width="3" height="5" />
                    <rect x={bx + 14} y={by + 13} width="3" height="4" />
                  </g>
                )}

                {/* Variant 1: Overgrown emerald dungeon moss */}
                {isVariant && variantType === 1 && (
                  <g>
                    <rect x={bx + 2} y={by} width="16" height="5" fill="#15803d" />
                    <rect x={bx + 4} y={by + 5} width="10" height="4" fill="#22c55e" />
                    <rect x={bx + 8} y={by + 9} width="4" height="3" fill="#4ade80" />
                  </g>
                )}

                {/* Variant 2: Weathered recessed pockmarks */}
                {isVariant && variantType === 2 && (
                  <g fill="#1e293b">
                    <rect x={bx + 4} y={by + 6} width="6" height="4" />
                    <rect x={bx + 15} y={by + 10} width="5" height="4" />
                  </g>
                )}
              </g>
            );
          })
        )}

        {/* Seed & density readout */}
        <rect x="192" y="4" width="60" height="14" fill="#090d16" stroke="#4ade80" strokeWidth="1" />
        <text x="222" y="14" fill="#86efac" fontSize="8" fontFamily="monospace" textAnchor="middle">
          {`#${seed}:${variantsOn ? density : 0}%`}
        </text>
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            className={`px-btn ${seed === 1 ? 'px-btn-active' : ''}`}
            aria-pressed={seed === 1}
            onClick={() => setSeed(1)}
          >
            {t('demos.pixelart.brick.seed1')}
          </button>
          <button
            type="button"
            className={`px-btn ${seed === 2 ? 'px-btn-active' : ''}`}
            aria-pressed={seed === 2}
            onClick={() => setSeed(2)}
          >
            {t('demos.pixelart.brick.seed2')}
          </button>
          <button
            type="button"
            className={`px-btn ${seed === 3 ? 'px-btn-active' : ''}`}
            aria-pressed={seed === 3}
            onClick={() => setSeed(3)}
          >
            {t('demos.pixelart.brick.seed3')}
          </button>
          <button
            type="button"
            className={`px-btn ${variantsOn ? 'px-btn-active' : ''}`}
            aria-pressed={variantsOn}
            onClick={() => setVariantsOn((v) => !v)}
          >
            {variantsOn ? t('demos.pixelart.brick.variantOn') : t('demos.pixelart.brick.variantOff')}
          </button>
        </div>
        <div className="px-slider-row">
          <label className="px-slider-label" htmlFor={`${id}-density`}>
            <span className="px-slider-name">{t('demos.pixelart.brick.density')}</span>
            <input
              id={`${id}-density`}
              type="range"
              className="px-slider"
              min={0}
              max={100}
              step={25}
              value={density}
              aria-controls={id}
              onChange={(e) => {
                setVariantsOn(true);
                setDensity(Number(e.target.value));
              }}
            />
            <span className="px-slider-val">{`${density}%`}</span>
          </label>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 4. px-nine-slice-pixel-frame — 9-Slice Pixel Frame Resize
// ============================================================================
export function NineSlicePixelFrameDemo() {
  const { t } = useLocale();
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<108 | 168 | 228>(168);
  const [height, setHeight] = useState(84);
  const [showGuide, setShowGuide] = useState(true);

  const corner = 12;
  const fx = Math.round(132 - width / 2);
  const fy = Math.round(72 - height / 2);
  const innerW = width - corner * 2;
  const innerH = height - corner * 2;

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demos.pixelart.art.nineSlicePixelFrame')}
      >
        <rect width="264" height="144" fill="#0b1120" />

        {/* Slice 5: Center Fill Panel */}
        <rect x={fx + corner} y={fy + corner} width={innerW} height={innerH} fill="#1e1b4b" />

        {/* Slices 2 & 8: Top & Bottom Horizontal Edge Bars */}
        <rect x={fx + corner} y={fy} width={innerW} height={corner} fill="#b45309" />
        <rect x={fx + corner} y={fy + 3} width={innerW} height="4" fill="#facc15" />
        <rect x={fx + corner} y={fy + height - corner} width={innerW} height={corner} fill="#b45309" />
        <rect x={fx + corner} y={fy + height - 7} width={innerW} height="4" fill="#facc15" />

        {/* Slices 4 & 6: Left & Right Vertical Edge Bars */}
        <rect x={fx} y={fy + corner} width={corner} height={innerH} fill="#b45309" />
        <rect x={fx + 3} y={fy + corner} width="4" height={innerH} fill="#facc15" />
        <rect x={fx + width - corner} y={fy + corner} width={corner} height={innerH} fill="#b45309" />
        <rect x={fx + width - 7} y={fy + corner} width="4" height={innerH} fill="#facc15" />

        {/* Slices 1, 3, 7, 9: Unscaled 12x12 Corner Ornaments */}
        {[
          { cx: fx, cy: fy },
          { cx: fx + width - corner, cy: fy },
          { cx: fx, cy: fy + height - corner },
          { cx: fx + width - corner, cy: fy + height - corner },
        ].map((c, idx) => (
          <g key={idx}>
            <rect x={c.cx} y={c.cy} width={corner} height={corner} fill="#78350f" />
            <rect x={c.cx + 2} y={c.cy + 2} width="8" height="8" fill="#facc15" />
            <rect x={c.cx + 4} y={c.cy + 4} width="4" height="4" fill="#38bdf8" />
          </g>
        ))}

        {/* Center text & dimensions */}
        <text x="132" y="69" fill="#fef08a" fontSize="8" fontFamily="monospace" textAnchor="middle">
          {t('demos.pixelart.slice.title')}
        </text>
        <text x="132" y="82" fill="#38bdf8" fontSize="8" fontFamily="monospace" textAnchor="middle">
          {`${width}x${height}`}
        </text>

        {/* 9-Slice Partition Cut Lines */}
        {showGuide && (
          <g stroke="#f43f5e" strokeWidth="1" strokeDasharray="3 2">
            <line x1={fx + corner} y1={fy - 6} x2={fx + corner} y2={fy + height + 6} />
            <line
              x1={fx + width - corner}
              y1={fy - 6}
              x2={fx + width - corner}
              y2={fy + height + 6}
            />
            <line x1={fx - 6} y1={fy + corner} x2={fx + width + 6} y2={fy + corner} />
            <line
              x1={fx - 6}
              y1={fy + height - corner}
              x2={fx + width + 6}
              y2={fy + height - corner}
            />
          </g>
        )}
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            className={`px-btn ${width === 108 ? 'px-btn-active' : ''}`}
            aria-pressed={width === 108}
            onClick={() => setWidth(108)}
          >
            {t('demos.pixelart.slice.w108')}
          </button>
          <button
            type="button"
            className={`px-btn ${width === 168 ? 'px-btn-active' : ''}`}
            aria-pressed={width === 168}
            onClick={() => setWidth(168)}
          >
            {t('demos.pixelart.slice.w168')}
          </button>
          <button
            type="button"
            className={`px-btn ${width === 228 ? 'px-btn-active' : ''}`}
            aria-pressed={width === 228}
            onClick={() => setWidth(228)}
          >
            {t('demos.pixelart.slice.w228')}
          </button>
          <button
            type="button"
            className={`px-btn ${showGuide ? 'px-btn-active' : ''}`}
            aria-pressed={showGuide}
            onClick={() => setShowGuide((g) => !g)}
          >
            {t('demos.pixelart.slice.guide')}
          </button>
        </div>
        <div className="px-slider-row">
          <label className="px-slider-label" htmlFor={`${id}-height`}>
            <span className="px-slider-name">{t('demos.pixelart.slice.height')}</span>
            <input
              id={`${id}-height`}
              type="range"
              className="px-slider"
              min={48}
              max={108}
              step={12}
              value={height}
              aria-controls={id}
              onChange={(e) => setHeight(Number(e.target.value))}
            />
            <span className="px-slider-val">{`${height}`}</span>
          </label>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 5. px-conveyor-elbow-orientation — Conveyor Elbow Orientation
// ============================================================================
type ElbowMode = 'rightDown' | 'downLeft' | 'straight';

const CONVEYOR_PATHS: Record<ElbowMode, ReadonlyArray<{ x: number; y: number }>> = {
  rightDown: [
    { x: 52, y: 56 },
    { x: 78, y: 56 },
    { x: 104, y: 56 },
    { x: 132, y: 56 },
    { x: 132, y: 74 },
    { x: 132, y: 92 },
    { x: 132, y: 108 },
    { x: 132, y: 120 },
  ],
  downLeft: [
    { x: 132, y: 16 },
    { x: 132, y: 36 },
    { x: 132, y: 56 },
    { x: 114, y: 56 },
    { x: 94, y: 56 },
    { x: 74, y: 56 },
    { x: 54, y: 56 },
    { x: 38, y: 56 },
  ],
  straight: [
    { x: 42, y: 56 },
    { x: 68, y: 56 },
    { x: 94, y: 56 },
    { x: 120, y: 56 },
    { x: 146, y: 56 },
    { x: 172, y: 56 },
    { x: 198, y: 56 },
    { x: 222, y: 56 },
  ],
};

export function ConveyorElbowOrientationDemo() {
  const { t } = useLocale();
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [elbow, setElbow] = useState<ElbowMode>('rightDown');
  const [reversed, setReversed] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [crateStep, setCrateStep] = useState(3);

  const isAllowed = usePixelAnimation(
    () => {
      setCrateStep((prev) => (reversed ? (prev + 7) % 8 : (prev + 1) % 8));
    },
    playing ? 140 : null,
    containerRef
  );
  const activePlaying = playing && isAllowed;

  const cycleElbow = () => {
    setElbow((prev) =>
      prev === 'rightDown' ? 'downLeft' : prev === 'downLeft' ? 'straight' : 'rightDown'
    );
  };

  const elbowLabel =
    elbow === 'rightDown'
      ? t('demos.pixelart.conveyor.elbowRD')
      : elbow === 'downLeft'
      ? t('demos.pixelart.conveyor.elbowDL')
      : t('demos.pixelart.conveyor.straight');

  const path = CONVEYOR_PATHS[elbow];
  const cratePos = path[crateStep] ?? { x: 132, y: 56 };

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demos.pixelart.art.conveyorElbowOrientation')}
      >
        <rect width="264" height="144" fill="#0f172a" />

        {/* Left Horizontal Track Segment (always active in rightDown, downLeft, straight) */}
        <g>
          <rect x="32" y="40" width="84" height="32" fill="#334155" />
          <rect x="32" y="40" width="84" height="4" fill="#facc15" />
          <rect x="32" y="68" width="84" height="4" fill="#facc15" />
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={38 + i * 20 + ((crateStep % 2) * 6)}
              y="46"
              width="6"
              height="20"
              fill="#64748b"
            />
          ))}
        </g>

        {/* Conditional Extra Segment based on Elbow Orientation */}
        {elbow === 'rightDown' && (
          <g>
            <rect x="116" y="72" width="32" height="60" fill="#334155" />
            <rect x="116" y="72" width="4" height="60" fill="#facc15" />
            <rect x="144" y="72" width="4" height="60" fill="#facc15" />
            {[0, 1, 2].map((i) => (
              <rect
                key={i}
                x="122"
                y={76 + i * 18 + ((crateStep % 2) * 5)}
                width="20"
                height="6"
                fill="#64748b"
              />
            ))}
          </g>
        )}
        {elbow === 'downLeft' && (
          <g>
            <rect x="116" y="8" width="32" height="32" fill="#334155" />
            <rect x="116" y="8" width="4" height="32" fill="#facc15" />
            <rect x="144" y="8" width="4" height="32" fill="#facc15" />
          </g>
        )}
        {elbow === 'straight' && (
          <g>
            <rect x="148" y="40" width="84" height="32" fill="#334155" />
            <rect x="148" y="40" width="84" height="4" fill="#facc15" />
            <rect x="148" y="68" width="84" height="4" fill="#facc15" />
            {[0, 1, 2, 3].map((i) => (
              <rect
                key={i}
                x={154 + i * 20 + ((crateStep % 2) * 6)}
                y="46"
                width="6"
                height="20"
                fill="#64748b"
              />
            ))}
          </g>
        )}

        {/* Center 32x32 Elbow / Junction Tile at (116, 40) */}
        <g>
          <rect x="116" y="40" width="32" height="32" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
          {/* Curved roller ribs inside elbow */}
          {elbow === 'rightDown' && (
            <g fill="#38bdf8">
              <rect x="122" y="46" width="16" height="4" />
              <rect x="134" y="50" width="4" height="16" />
            </g>
          )}
          {elbow === 'downLeft' && (
            <g fill="#38bdf8">
              <rect x="130" y="44" width="4" height="16" />
              <rect x="120" y="56" width="14" height="4" />
            </g>
          )}
          {elbow === 'straight' && (
            <rect x="120" y="54" width="24" height="4" fill="#38bdf8" />
          )}
        </g>

        {/* Moving Cargo Crate along active conveyor route */}
        <g transform={`translate(${cratePos.x - 10}, ${cratePos.y - 10})`}>
          <rect width="20" height="20" fill="#d97706" />
          <rect x="2" y="2" width="16" height="16" fill="#f59e0b" />
          <rect x="0" y="8" width="20" height="4" fill="#78350f" />
          <rect x="8" y="0" width="4" height="20" fill="#78350f" />
        </g>
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button type="button" className="px-btn px-btn-active" onClick={cycleElbow}>
            {elbowLabel}
          </button>
          <button
            type="button"
            className={`px-btn ${reversed ? 'px-btn-active' : ''}`}
            aria-pressed={reversed}
            onClick={() => setReversed((r) => !r)}
          >
            {t('demos.pixelart.conveyor.reverse')}
          </button>
          <button
            type="button"
            className={`px-btn ${activePlaying ? 'px-btn-active' : ''}`}
            aria-pressed={activePlaying}
            disabled={!isAllowed}
            onClick={() => setPlaying((p) => !p)}
          >
            {activePlaying ? t('demos.pixelart.conveyor.pause') : t('demos.pixelart.conveyor.play')}
          </button>
        </div>
        <div className="px-slider-row">
          <label className="px-slider-label" htmlFor={`${id}-step`}>
            <span className="px-slider-name">{t('demos.pixelart.conveyor.step')}</span>
            <input
              id={`${id}-step`}
              type="range"
              className="px-slider"
              min={0}
              max={7}
              step={1}
              value={crateStep}
              aria-controls={id}
              onChange={(e) => {
                setPlaying(false);
                setCrateStep(Number(e.target.value));
              }}
            />
            <span className="px-slider-val">{`#${crateStep + 1}/8`}</span>
          </label>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 6. px-one-way-platform-collision — One-Way Platform Collision Edge
// ============================================================================
type PlatformMode = 'upPass' | 'topLand' | 'downDrop';

const PLATFORM_TRAJECTORIES: Record<PlatformMode, ReadonlyArray<{ x: number; footY: number }>> = {
  upPass: [
    { x: 112, footY: 124 },
    { x: 118, footY: 102 },
    { x: 126, footY: 84 },
    { x: 134, footY: 66 },
    { x: 142, footY: 48 },
    { x: 150, footY: 36 },
  ],
  topLand: [
    { x: 96, footY: 38 },
    { x: 110, footY: 52 },
    { x: 122, footY: 66 },
    { x: 132, footY: 76 },
    { x: 144, footY: 76 },
    { x: 156, footY: 76 },
  ],
  downDrop: [
    { x: 118, footY: 76 },
    { x: 128, footY: 76 },
    { x: 132, footY: 84 },
    { x: 136, footY: 98 },
    { x: 140, footY: 112 },
    { x: 144, footY: 124 },
  ],
};

export function OneWayPlatformCollisionDemo() {
  const { t } = useLocale();
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<PlatformMode>('topLand');
  const [showHitbox, setShowHitbox] = useState(true);
  const [step, setStep] = useState(3);

  const points = PLATFORM_TRAJECTORIES[mode];
  const current = points[step] ?? { x: 132, footY: 76 };
  const isSolidActive = mode === 'topLand' || (mode === 'downDrop' && step < 2);

  const statusTag =
    mode === 'upPass'
      ? t('demos.pixelart.platform.passTag')
      : mode === 'topLand'
      ? t('demos.pixelart.platform.landTag')
      : t('demos.pixelart.platform.dropTag');

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demos.pixelart.art.oneWayPlatformCollision')}
      >
        <rect width="264" height="144" fill="#0b1120" />
        {/* Lower cavern floor */}
        <rect x="0" y="124" width="264" height="20" fill="#1e293b" />

        {/* One-Way Wooden Bridge Platform at y=76 */}
        <g>
          <rect x="64" y="76" width="136" height="10" fill="#78350f" />
          <rect x="64" y="76" width="136" height="4" fill="#d97706" />
          <rect x="76" y="86" width="8" height="38" fill="#451a03" />
          <rect x="180" y="86" width="8" height="38" fill="#451a03" />
        </g>

        {/* Trajectory Ghost Dots */}
        {points.map((pt, idx) => (
          <rect
            key={idx}
            x={pt.x - 2}
            y={pt.footY - 12}
            width="4"
            height="4"
            fill={idx === step ? '#fef08a' : '#475569'}
          />
        ))}

        {/* Character Sprite */}
        <g opacity={mode === 'upPass' && (step === 2 || step === 3) ? 0.65 : 1}>
          <rect x={current.x - 8} y={current.footY - 22} width="16" height="22" fill="#38bdf8" />
          <rect x={current.x - 5} y={current.footY - 19} width="10" height="8" fill="#e0f2fe" />
          {/* Foot sensor hitbox bar */}
          {showHitbox && (
            <rect
              x={current.x - 10}
              y={current.footY - 2}
              width="20"
              height="3"
              fill={isSolidActive ? '#4ade80' : '#f43f5e'}
            />
          )}
        </g>

        {/* One-Way Top Surface Collision Threshold Line (y=76) */}
        {showHitbox && (
          <line
            x1="60"
            y1="76"
            x2="204"
            y2="76"
            stroke={isSolidActive ? '#4ade80' : '#f59e0b'}
            strokeWidth="2"
            strokeDasharray={isSolidActive ? undefined : '4 3'}
          />
        )}

        {/* Mode status badge */}
        <rect x="164" y="10" width="88" height="18" fill="#090d16" stroke="#38bdf8" strokeWidth="1" />
        <text x="208" y="22" fill="#e0f2fe" fontSize="8" fontFamily="monospace" textAnchor="middle">
          {statusTag}
        </text>
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            className={`px-btn ${mode === 'upPass' ? 'px-btn-active' : ''}`}
            aria-pressed={mode === 'upPass'}
            onClick={() => setMode('upPass')}
          >
            {t('demos.pixelart.platform.upPass')}
          </button>
          <button
            type="button"
            className={`px-btn ${mode === 'topLand' ? 'px-btn-active' : ''}`}
            aria-pressed={mode === 'topLand'}
            onClick={() => setMode('topLand')}
          >
            {t('demos.pixelart.platform.topLand')}
          </button>
          <button
            type="button"
            className={`px-btn ${mode === 'downDrop' ? 'px-btn-active' : ''}`}
            aria-pressed={mode === 'downDrop'}
            onClick={() => setMode('downDrop')}
          >
            {t('demos.pixelart.platform.downDrop')}
          </button>
          <button
            type="button"
            className={`px-btn ${showHitbox ? 'px-btn-active' : ''}`}
            aria-pressed={showHitbox}
            onClick={() => setShowHitbox((h) => !h)}
          >
            {t('demos.pixelart.platform.hitbox')}
          </button>
        </div>
        <div className="px-slider-row">
          <label className="px-slider-label" htmlFor={`${id}-step`}>
            <span className="px-slider-name">{t('demos.pixelart.platform.step')}</span>
            <input
              id={`${id}-step`}
              type="range"
              className="px-slider"
              min={0}
              max={5}
              step={1}
              value={step}
              aria-controls={id}
              onChange={(e) => setStep(Number(e.target.value))}
            />
            <span className="px-slider-val">{`#${step + 1}/6`}</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export const PIXEL_TILES_EXPANSION_DEMOS = {
  'px-dual-grid-shore-corners': DualGridShoreCornersDemo,
  'px-wang-edge-color-tiles': WangEdgeColorTilesDemo,
  'px-seeded-brick-variants': SeededBrickVariantsDemo,
  'px-nine-slice-pixel-frame': NineSlicePixelFrameDemo,
  'px-conveyor-elbow-orientation': ConveyorElbowOrientationDemo,
  'px-one-way-platform-collision': OneWayPlatformCollisionDemo,
} as const;
