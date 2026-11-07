import { useId, useRef, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';
import { usePixelAnimation } from './usePixelAnimation';

// ============================================================================
// 1. px-teleport-dissolve-reform — Teleport Dissolve / Reform with Stable Mask
// ============================================================================
// 4x6 grid of 8x8 pixel cells (32x48 sprite) with deterministic thresholds 0..3
const BAYER_CELLS: ReadonlyArray<{ cx: number; cy: number; threshold: number }> = Array.from(
  { length: 24 },
  (_, idx) => {
    const col = idx % 4;
    const row = Math.floor(idx / 4);
    const threshold = (col * 3 + row * 5) % 4;
    return { cx: col * 8, cy: row * 8, threshold };
  }
);

export function TeleportDissolveReformDemo() {
  const { t } = useLocale();
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [tpState, setTpState] = useState<{ phase: number; warping: boolean; runKey: number }>({
    phase: 3,
    warping: false,
    runKey: 0,
  });

  const { phase, warping, runKey } = tpState;

  const isAllowed = usePixelAnimation(
    () => {
      setTpState((prev) => {
        const nextPhase = Math.min(8, prev.phase + 1);
        return {
          phase: nextPhase,
          warping: nextPhase < 8,
          runKey: prev.runKey,
        };
      });
    },
    warping ? 100 : null,
    containerRef,
    runKey
  );

  const triggerWarp = () => {
    setTpState((prev) => {
      if (!isAllowed) {
        return {
          phase: 8,
          warping: false,
          runKey: prev.runKey + 1,
        };
      }
      return {
        phase: 0,
        warping: true,
        runKey: prev.runKey + 1,
      };
    });
  };

  const swapPads = () => {
    setTpState((prev) => ({
      phase: prev.phase >= 4 ? 0 : 8,
      warping: false,
      runKey: prev.runKey,
    }));
  };

  const maskAId = `tp-mask-a-${id}`;
  const maskBId = `tp-mask-b-${id}`;
  const inTransit = phase > 0 && phase < 8;
  // Phases 0..3: dissolve on Pad A only; Phase 4: beam transit (no body on either pad); Phases 5..8: reform on Pad B only
  const cellsA = phase <= 3 ? BAYER_CELLS.filter((cell) => cell.threshold >= phase) : [];
  const cellsB = phase >= 5 ? BAYER_CELLS.filter((cell) => cell.threshold < phase - 4) : [];

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demos.pixelart.art.teleportDissolveReform')}
      >
        <defs>
          <mask id={maskAId} data-visible-cells={cellsA.length}>
            <rect width="264" height="144" fill="black" />
            {cellsA.map((cell, i) => (
              <rect
                key={i}
                x={52 + cell.cx}
                y={54 + cell.cy}
                width="8"
                height="8"
                fill="white"
              />
            ))}
          </mask>
          <mask id={maskBId} data-visible-cells={cellsB.length}>
            <rect width="264" height="144" fill="black" />
            {cellsB.map((cell, i) => (
              <rect
                key={i}
                x={180 + cell.cx}
                y={54 + cell.cy}
                width="8"
                height="8"
                fill="white"
              />
            ))}
          </mask>
        </defs>

        <rect width="264" height="144" fill="#080d1a" />
        <rect x="0" y="112" width="264" height="32" fill="#111827" />

        {/* Teleporter Pad A (Left) & Pad B (Right) */}
        <g>
          <rect x="42" y="106" width="52" height="8" fill="#1e293b" />
          <rect x="48" y="104" width="40" height="4" fill={phase <= 4 ? '#22d3ee' : '#334155'} />
          <rect x="170" y="106" width="52" height="8" fill="#1e293b" />
          <rect x="176" y="104" width="40" height="4" fill={phase >= 4 ? '#22d3ee' : '#334155'} />
        </g>

        {/* Vertical Warp Columns & Transit Particles during phase 1..7 */}
        {inTransit && (
          <g data-teleport-transit={phase === 4 ? 'beam-only' : 'partial'}>
            <rect x="56" y="16" width="24" height="88" fill="#06b6d4" opacity={phase <= 4 ? 0.3 : 0.14} />
            <rect x="184" y="16" width="24" height="88" fill="#06b6d4" opacity={phase >= 4 ? 0.3 : 0.14} />
            {phase === 4 && (
              <rect x="68" y="70" width="128" height="4" fill="#22d3ee" opacity="0.75" />
            )}
            {[0, 1, 2, 3].map((p) => (
              <rect
                key={p}
                x={84 + phase * 11 + p * 8}
                y={62 + (p % 2) * 14}
                width="6"
                height="4"
                fill="#67e8f9"
              />
            ))}
          </g>
        )}

        {/* Pad A Dissolving Sprite (visible only on phases 0..3) */}
        {cellsA.length > 0 && (
          <g mask={`url(#${maskAId})`} data-pad-sprite="A">
            <rect x="56" y="56" width="24" height="16" fill="#38bdf8" />
            <rect x="60" y="60" width="16" height="6" fill="#fef08a" />
            <rect x="52" y="72" width="32" height="20" fill="#0284c7" />
            <rect x="56" y="92" width="10" height="10" fill="#e0f2fe" />
            <rect x="70" y="92" width="10" height="10" fill="#e0f2fe" />
          </g>
        )}

        {/* Pad B Reforming Sprite (visible only on phases 5..8) */}
        {cellsB.length > 0 && (
          <g mask={`url(#${maskBId})`} data-pad-sprite="B">
            <rect x="184" y="56" width="24" height="16" fill="#38bdf8" />
            <rect x="188" y="60" width="16" height="6" fill="#fef08a" />
            <rect x="180" y="72" width="32" height="20" fill="#0284c7" />
            <rect x="184" y="92" width="10" height="10" fill="#e0f2fe" />
            <rect x="198" y="92" width="10" height="10" fill="#e0f2fe" />
          </g>
        )}
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            className={`px-btn ${warping && isAllowed ? 'px-btn-active' : ''}`}
            onClick={triggerWarp}
          >
            {t('demos.pixelart.teleport.trigger')}
          </button>
          <button type="button" className="px-btn" onClick={swapPads}>
            {t('demos.pixelart.teleport.swap')}
          </button>
        </div>
        <div className="px-slider-row">
          <label className="px-slider-label" htmlFor={`${id}-tp`}>
            <span className="px-slider-name">{t('demos.pixelart.teleport.phase')}</span>
            <input
              id={`${id}-tp`}
              type="range"
              className="px-slider"
              min={0}
              max={8}
              step={1}
              value={phase}
              aria-controls={id}
              onChange={(e) => {
                const val = Number(e.target.value);
                setTpState((prev) => ({
                  phase: val,
                  warping: false,
                  runKey: prev.runKey,
                }));
              }}
            />
            <span className="px-slider-val">{`${phase}/8`}</span>
          </label>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 2. px-stepped-lightning-chain — Stepped Orthogonal Lightning Chain
// ============================================================================
const LIGHTNING_SEGMENTS: ReadonlyArray<{
  s1: string;
  s2: string;
  s3: string;
}> = [
  {
    s1: '36,72 64,72 64,42 102,42',
    s2: '102,42 134,42 134,96 168,96',
    s3: '168,96 198,96 198,52 228,52',
  },
  {
    s1: '36,72 54,54 82,54 102,42',
    s2: '102,42 122,74 148,74 168,96',
    s3: '168,96 188,68 210,68 228,52',
  },
  {
    s1: '36,72 72,72 72,34 102,42',
    s2: '102,42 142,42 142,104 168,96',
    s3: '168,96 204,96 204,44 228,52',
  },
  {
    s1: '36,72 58,60 78,42 102,42',
    s2: '102,42 128,42 146,84 168,96',
    s3: '168,96 192,80 212,52 228,52',
  },
];

const CRYSTAL_NODES = [
  { x: 102, y: 42 },
  { x: 168, y: 96 },
  { x: 228, y: 52 },
] as const;

export function SteppedLightningChainDemo() {
  const { t } = useLocale();
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [targets, setTargets] = useState(3);
  const [pathIdx, setPathIdx] = useState(0);
  const [playing, setPlaying] = useState(true);

  const isAllowed = usePixelAnimation(
    () => {
      setPathIdx((prev) => (prev + 1) % 4);
    },
    playing ? 110 : null,
    containerRef
  );
  const activePlaying = playing && isAllowed;

  const seg = LIGHTNING_SEGMENTS[pathIdx] ?? LIGHTNING_SEGMENTS[0]!;
  const activePolylines = [
    seg.s1,
    ...(targets >= 2 ? [seg.s2] : []),
    ...(targets >= 3 ? [seg.s3] : []),
  ];

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demos.pixelart.art.steppedLightningChain')}
      >
        <rect width="264" height="144" fill="#070b16" />

        {/* Caster Arcane Staff on Left */}
        <rect x="28" y="68" width="6" height="56" fill="#78350f" />
        <rect x="24" y="60" width="14" height="14" fill="#0284c7" />
        <rect x="27" y="63" width="8" height="8" fill="#e0f2fe" />

        {/* Stepped Lightning Polylines (Outer Glow + White Core) */}
        {activePolylines.map((pts, idx) => (
          <g key={idx}>
            <polyline
              points={pts}
              fill="none"
              stroke="#06b6d4"
              strokeWidth="6"
              opacity="0.55"
            />
            <polyline
              points={pts}
              fill="none"
              stroke="#fef08a"
              strokeWidth="2"
            />
          </g>
        ))}

        {/* 3 Crystal Prism Nodes */}
        {CRYSTAL_NODES.map((node, idx) => {
          const isHit = idx < targets;
          return (
            <g key={idx}>
              {isHit && (
                <rect
                  x={node.x - 14 - (pathIdx % 2) * 2}
                  y={node.y - 14 - (pathIdx % 2) * 2}
                  width={28 + (pathIdx % 2) * 4}
                  height={28 + (pathIdx % 2) * 4}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2"
                />
              )}
              <rect
                x={node.x - 8}
                y={node.y - 12}
                width="16"
                height="24"
                fill={isHit ? '#22d3ee' : '#334155'}
              />
              <rect
                x={node.x - 4}
                y={node.y - 8}
                width="8"
                height="16"
                fill={isHit ? '#ffffff' : '#475569'}
              />
            </g>
          );
        })}
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            className={`px-btn ${activePlaying ? 'px-btn-active' : ''}`}
            aria-pressed={activePlaying}
            disabled={!isAllowed}
            onClick={() => setPlaying((p) => !p)}
          >
            {activePlaying ? t('demos.pixelart.lightning.pause') : t('demos.pixelart.lightning.play')}
          </button>
          <button
            type="button"
            className="px-btn"
            onClick={() => {
              setPlaying(false);
              setPathIdx((p) => (p + 1) % 4);
            }}
          >
            {t('demos.pixelart.lightning.step')}
          </button>
        </div>
        <div className="px-slider-row">
          <label className="px-slider-label" htmlFor={`${id}-targets`}>
            <span className="px-slider-name">{t('demos.pixelart.lightning.targets')}</span>
            <input
              id={`${id}-targets`}
              type="range"
              className="px-slider"
              min={1}
              max={3}
              step={1}
              value={targets}
              aria-controls={id}
              onChange={(e) => setTargets(Number(e.target.value))}
            />
            <span className="px-slider-val">{`${targets}/3`}</span>
          </label>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 3. px-directional-crt-glitch — Directional CRT Glitch & Chromatic Split
// ============================================================================
const SLICE_SIGNS = [1, -1, 2, -2, 1, -1] as const;

export function DirectionalCrtGlitchDemo() {
  const { t } = useLocale();
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [intensity, setIntensity] = useState(2);
  const [verticalAxis, setVerticalAxis] = useState(false);
  const [tick, setTick] = useState(0);
  const [playing, setPlaying] = useState(true);

  const isAllowed = usePixelAnimation(
    () => {
      setTick((prev) => (prev + 1) % 4);
    },
    playing && intensity > 0 ? 120 : null,
    containerRef
  );
  const activePlaying = playing && isAllowed && intensity > 0;

  const renderHologram = (tint: string) => (
    <g fill={tint}>
      <rect x="96" y="28" width="72" height="56" />
      <rect x="108" y="42" width="16" height="12" fill="#090d16" />
      <rect x="140" y="42" width="16" height="12" fill="#090d16" />
      <rect x="114" y="66" width="36" height="8" fill="#090d16" />
      <text x="132" y="106" fill={tint} fontSize="9" fontFamily="monospace" textAnchor="middle">
        {t('demos.pixelart.glitch.signal')}
      </text>
    </g>
  );

  const rgbSplit = intensity * 2;

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demos.pixelart.art.directionalCrtGlitch')}
      >
        <defs>
          {SLICE_SIGNS.map((_, idx) => (
            <clipPath key={idx} id={`crt-slice-${id}-${idx}`}>
              {verticalAxis ? (
                <rect x={idx * 44} y="0" width="44" height="144" />
              ) : (
                <rect x="0" y={idx * 24} width="264" height="24" />
              )}
            </clipPath>
          ))}
        </defs>

        <rect width="264" height="144" fill="#070b14" />

        {/* Chromatic Aberration Red & Cyan Ghost Channels */}
        {intensity > 0 && (
          <g opacity="0.55">
            <g
              transform={
                verticalAxis ? `translate(0, ${-rgbSplit})` : `translate(${-rgbSplit}, 0)`
              }
            >
              {renderHologram('#f43f5e')}
            </g>
            <g
              transform={
                verticalAxis ? `translate(0, ${rgbSplit})` : `translate(${rgbSplit}, 0)`
              }
            >
              {renderHologram('#22d3ee')}
            </g>
          </g>
        )}

        {/* 6 Clipped Glitch Slice Bands */}
        {SLICE_SIGNS.map((sign, idx) => {
          const shift = intensity * sign * ((tick + idx) % 2 === 0 ? 2 : -1);
          const transform = verticalAxis
            ? `translate(0, ${shift})`
            : `translate(${shift}, 0)`;
          return (
            <g key={idx} clipPath={`url(#crt-slice-${id}-${idx})`}>
              <g transform={transform}>{renderHologram('#38bdf8')}</g>
            </g>
          );
        })}

        {/* CRT Scanline Overlay */}
        <g fill="#020617" opacity="0.35">
          {Array.from({ length: 18 }, (_, i) => (
            <rect key={i} x="0" y={i * 8} width="264" height="2" />
          ))}
        </g>
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            className={`px-btn ${activePlaying ? 'px-btn-active' : ''}`}
            aria-pressed={activePlaying}
            disabled={!isAllowed || intensity === 0}
            onClick={() => setPlaying((p) => !p)}
          >
            {activePlaying ? t('demos.pixelart.glitch.pause') : t('demos.pixelart.glitch.play')}
          </button>
          <button
            type="button"
            className={`px-btn ${verticalAxis ? 'px-btn-active' : ''}`}
            aria-pressed={verticalAxis}
            onClick={() => setVerticalAxis((v) => !v)}
          >
            {verticalAxis ? t('demos.pixelart.glitch.axisV') : t('demos.pixelart.glitch.axisH')}
          </button>
        </div>
        <div className="px-slider-row">
          <label className="px-slider-label" htmlFor={`${id}-glitch`}>
            <span className="px-slider-name">{t('demos.pixelart.glitch.intensity')}</span>
            <input
              id={`${id}-glitch`}
              type="range"
              className="px-slider"
              min={0}
              max={4}
              step={1}
              value={intensity}
              aria-controls={id}
              onChange={(e) => setIntensity(Number(e.target.value))}
            />
            <span className="px-slider-val">{`${intensity}/4`}</span>
          </label>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 4. px-ground-shockwave-rings — Ground Shockwave Rings & Rock Heave
// ============================================================================
export function GroundShockwaveRingsDemo() {
  const { t } = useLocale();
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [slamState, setSlamState] = useState<{
    frame: number;
    slamming: boolean;
    runKey: number;
  }>({ frame: 3, slamming: false, runKey: 0 });
  const [rockHeave, setRockHeave] = useState(true);
  const { frame, slamming, runKey } = slamState;

  const isAllowed = usePixelAnimation(
    () => {
      setSlamState((prev) => {
        if (!prev.slamming) return prev;
        const nextFrame = Math.min(6, prev.frame + 1);
        return {
          ...prev,
          frame: nextFrame,
          slamming: nextFrame < 6,
        };
      });
    },
    slamming ? 90 : null,
    containerRef,
    runKey
  );

  const triggerSlam = () => {
    setSlamState((prev) => {
      if (!isAllowed) {
        return { frame: 6, slamming: false, runKey: prev.runKey + 1 };
      }
      return { frame: 0, slamming: true, runKey: prev.runKey + 1 };
    });
  };

  const outerRx = 14 + frame * 16;
  const outerRy = 4 + frame * 3;

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demos.pixelart.art.groundShockwaveRings')}
      >
        <rect width="264" height="144" fill="#130d18" />
        <rect x="0" y="96" width="264" height="48" fill="#271c30" />
        <rect x="0" y="96" width="264" height="3" fill="#473357" />

        {/* Sequentially Heaving Rock Pillars at ±32, ±64, ±96 */}
        {rockHeave &&
          [
            { offset: 32, minF: 1, maxF: 4, h: 18 },
            { offset: 64, minF: 2, maxF: 5, h: 24 },
            { offset: 96, minF: 3, maxF: 6, h: 20 },
          ].map((pair, idx) => {
            const active = frame >= pair.minF && frame <= pair.maxF;
            const liftH = active ? pair.h : 4;
            return (
              <g key={idx} fill={active ? '#f97316' : '#473357'}>
                <rect x={132 - pair.offset - 8} y={96 - liftH} width="14" height={liftH} />
                <rect x={132 + pair.offset - 6} y={96 - liftH} width="14" height={liftH} />
              </g>
            );
          })}

        {/* Expanding Stepped Pixel Shockwave Rings */}
        {frame < 6 && (
          <g>
            <rect
              x={132 - outerRx}
              y={102 - outerRy}
              width={outerRx * 2}
              height={outerRy * 2}
              fill="none"
              stroke="#f97316"
              strokeWidth="4"
            />
            <rect
              x={132 - Math.round(outerRx * 0.65)}
              y={102 - Math.round(outerRy * 0.65)}
              width={Math.round(outerRx * 1.3)}
              height={Math.round(outerRy * 1.3)}
              fill="none"
              stroke="#fef08a"
              strokeWidth="3"
            />
          </g>
        )}

        {/* Center Impact Warhammer on early frames */}
        <g transform={`translate(132, ${frame === 0 ? 52 : 68})`}>
          <rect x="-3" y="-32" width="6" height="32" fill="#78350f" />
          <rect x="-16" y="-8" width="32" height="16" fill="#94a3b8" />
          <rect x="-12" y="-4" width="24" height="6" fill="#fef08a" />
        </g>
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            className={`px-btn ${slamming ? 'px-btn-active' : ''}`}
            onClick={triggerSlam}
          >
            {t('demos.pixelart.shockwave.slam')}
          </button>
          <button
            type="button"
            className={`px-btn ${rockHeave ? 'px-btn-active' : ''}`}
            aria-pressed={rockHeave}
            onClick={() => setRockHeave((r) => !r)}
          >
            {rockHeave
              ? t('demos.pixelart.shockwave.rocksOn')
              : t('demos.pixelart.shockwave.rocksOff')}
          </button>
        </div>
        <div className="px-slider-row">
          <label className="px-slider-label" htmlFor={`${id}-shock`}>
            <span className="px-slider-name">{t('demos.pixelart.shockwave.frame')}</span>
            <input
              id={`${id}-shock`}
              type="range"
              className="px-slider"
              min={0}
              max={6}
              step={1}
              value={frame}
              aria-controls={id}
              onChange={(e) => {
                const nextFrame = Number(e.target.value);
                setSlamState((prev) => ({
                  ...prev,
                  frame: nextFrame,
                  slamming: false,
                }));
              }}
            />
            <span className="px-slider-val">{`${frame}/6`}</span>
          </label>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 5. px-ice-freeze-thaw-spread — Ice Freeze / Thaw Spread by Manhattan Distance
// ============================================================================
const ICE_GRID_CELLS: ReadonlyArray<{ r: number; c: number; dist: number }> = Array.from(
  { length: 45 },
  (_, idx) => {
    const c = idx % 9;
    const r = Math.floor(idx / 9);
    return { r, c, dist: Math.abs(c - 4) + Math.abs(r - 2) };
  }
);

export function IceFreezeThawSpreadDemo() {
  const { t } = useLocale();
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [iceState, setIceState] = useState<{
    radius: number;
    mode: 'idle' | 'freeze' | 'thaw';
    runKey: number;
  }>({ radius: 3, mode: 'idle', runKey: 0 });
  const { radius, mode, runKey } = iceState;

  const isAllowed = usePixelAnimation(
    () => {
      setIceState((prev) => {
        if (prev.mode === 'freeze') {
          const next = Math.min(5, prev.radius + 1);
          return {
            ...prev,
            radius: next,
            mode: next >= 5 ? 'idle' : 'freeze',
          };
        }
        if (prev.mode === 'thaw') {
          const next = Math.max(0, prev.radius - 1);
          return {
            ...prev,
            radius: next,
            mode: next <= 0 ? 'idle' : 'thaw',
          };
        }
        return prev;
      });
    },
    mode !== 'idle' ? 110 : null,
    containerRef,
    runKey
  );

  const startFreeze = () => {
    setIceState((prev) => {
      if (!isAllowed) {
        return { radius: 5, mode: 'idle', runKey: prev.runKey + 1 };
      }
      return {
        radius: prev.radius >= 5 ? 0 : prev.radius,
        mode: 'freeze',
        runKey: prev.runKey + 1,
      };
    });
  };

  const startThaw = () => {
    setIceState((prev) => {
      if (!isAllowed) {
        return { radius: 0, mode: 'idle', runKey: prev.runKey + 1 };
      }
      return {
        radius: prev.radius <= 0 ? 5 : prev.radius,
        mode: 'thaw',
        runKey: prev.runKey + 1,
      };
    });
  };

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demos.pixelart.art.iceFreezeThawSpread')}
      >
        <rect width="264" height="144" fill="#071120" />

        {ICE_GRID_CELLS.map((cell, idx) => {
          const tx = 24 + cell.c * 24;
          const ty = 12 + cell.r * 24;
          const isCenter = cell.c === 4 && cell.r === 2;
          const isFrozen = cell.dist < radius;
          const isWavefront = radius > 0 && cell.dist === radius;

          return (
            <g
              key={idx}
              data-cell-state={isWavefront ? 'wavefront' : isFrozen ? 'frozen' : 'liquid'}
            >
              {/* Tile Base */}
              <rect
                x={tx}
                y={ty}
                width="22"
                height="22"
                fill={isWavefront ? '#bae6fd' : isFrozen ? '#0284c7' : '#0f172a'}
              />
              {/* Stepped Octagonal Frost Plate vs Liquid Courtyard Basin */}
              {isFrozen || isWavefront ? (
                <g>
                  <rect
                    x={tx + 4}
                    y={ty + 2}
                    width="14"
                    height="18"
                    fill={isWavefront ? '#e0f2fe' : '#38bdf8'}
                  />
                  <rect
                    x={tx + 2}
                    y={ty + 4}
                    width="18"
                    height="14"
                    fill={isWavefront ? '#e0f2fe' : '#38bdf8'}
                  />
                  {/* Rising Ice Crystal Column / Spire */}
                  {!isCenter && (
                    <g data-ice-column={isWavefront ? 'crest' : 'frozen'}>
                      <rect
                        x={tx + 8}
                        y={ty + (isWavefront ? 2 : 5)}
                        width="6"
                        height={isWavefront ? 16 : 12}
                        fill={isWavefront ? '#ffffff' : '#bae6fd'}
                      />
                      <rect
                        x={tx + 10}
                        y={ty + (isWavefront ? 0 : 3)}
                        width="2"
                        height={isWavefront ? 18 : 14}
                        fill="#ffffff"
                      />
                    </g>
                  )}
                </g>
              ) : (
                <g>
                  <rect x={tx + 3} y={ty + 3} width="16" height="16" fill="#0369a1" />
                  <rect x={tx + 6} y={ty + 9} width="10" height="2" fill="#38bdf8" />
                </g>
              )}
            </g>
          );
        })}

        {/* Central Courtyard Stone Fountain at (c=4, r=2 -> tx=120, ty=60) */}
        <g data-ice-fountain="center" transform="translate(120, 60)">
          {/* Outer Octagonal Stone Basin */}
          <rect x="1" y="4" width="20" height="14" fill="#475569" />
          <rect x="4" y="1" width="14" height="20" fill="#475569" />
          <rect x="3" y="3" width="16" height="16" fill="#64748b" />
          {/* Inner Fountain Water / Ice Pool */}
          <rect
            x="5"
            y="5"
            width="12"
            height="12"
            fill={radius > 0 ? '#bae6fd' : '#0284c7'}
          />
          {/* Central Pedestal & Frozen/Flowing Spout */}
          <rect x="9" y="4" width="4" height="12" fill="#94a3b8" />
          <rect
            x="8"
            y="1"
            width="6"
            height="5"
            fill={radius > 0 ? '#ffffff' : '#38bdf8'}
          />
          <rect
            x="5"
            y="6"
            width="12"
            height="2"
            fill={radius > 0 ? '#e0f2fe' : '#7dd3fc'}
          />
        </g>
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            className={`px-btn ${mode === 'freeze' ? 'px-btn-active' : ''}`}
            onClick={startFreeze}
          >
            {t('demos.pixelart.ice.freeze')}
          </button>
          <button
            type="button"
            className={`px-btn ${mode === 'thaw' ? 'px-btn-active' : ''}`}
            onClick={startThaw}
          >
            {t('demos.pixelart.ice.thaw')}
          </button>
        </div>
        <div className="px-slider-row">
          <label className="px-slider-label" htmlFor={`${id}-frost`}>
            <span className="px-slider-name">{t('demos.pixelart.ice.radius')}</span>
            <input
              id={`${id}-frost`}
              type="range"
              className="px-slider"
              min={0}
              max={5}
              step={1}
              value={radius}
              aria-controls={id}
              onChange={(e) => {
                const nextRadius = Number(e.target.value);
                setIceState((prev) => ({
                  ...prev,
                  radius: nextRadius,
                  mode: 'idle',
                }));
              }}
            />
            <span className="px-slider-val">{`${radius}/5`}</span>
          </label>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 6. px-pixel-portal-swirl — Time-Bounded Pixel Portal Swirl (0..8)
// ============================================================================
const PORTAL_RADII = [10, 18, 26, 32, 34, 30, 22, 14, 0] as const;

const PORTAL_RUNE_SLOTS: ReadonlyArray<{ x: number; y: number }> = [
  { x: 83, y: 28 },
  { x: 83, y: 48 },
  { x: 83, y: 68 },
  { x: 83, y: 88 },
  { x: 175, y: 28 },
  { x: 175, y: 48 },
  { x: 175, y: 68 },
  { x: 175, y: 88 },
];

const SPIRAL_ARM_DIRS: ReadonlyArray<{ dx: number; dy: number; px: number; py: number }> = [
  { dx: 1, dy: 0, px: 0, py: 1 },
  { dx: 0, dy: 1, px: -1, py: 0 },
  { dx: -1, dy: 0, px: 0, py: -1 },
  { dx: 0, dy: -1, px: 1, py: 0 },
];

export function PixelPortalSwirlDemo() {
  const { t } = useLocale();
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [portalState, setPortalState] = useState<{
    step: number;
    cycling: boolean;
    runKey: number;
  }>({ step: 2, cycling: false, runKey: 0 });
  const [emeraldRift, setEmeraldRift] = useState(false);
  const { step, cycling, runKey } = portalState;

  const isAllowed = usePixelAnimation(
    () => {
      setPortalState((prev) => {
        if (!prev.cycling) return prev;
        const nextStep = Math.min(8, prev.step + 1);
        return {
          ...prev,
          step: nextStep,
          cycling: nextStep < 8,
        };
      });
    },
    cycling ? 120 : null,
    containerRef,
    runKey
  );

  const runLifecycle = () => {
    setPortalState((prev) => {
      if (!isAllowed) {
        return { step: 8, cycling: false, runKey: prev.runKey + 1 };
      }
      return { step: 0, cycling: true, runKey: prev.runKey + 1 };
    });
  };

  const radius = PORTAL_RADII[step] ?? 26;
  const activeRunes = Math.max(0, 8 - step);
  const outerColor = emeraldRift ? '#059669' : '#7e22ce';
  const midColor = emeraldRift ? '#10b981' : '#a855f7';
  const coreColor = emeraldRift ? '#99f6e4' : '#f5d0fe';

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demos.pixelart.art.pixelPortalSwirl')}
      >
        <rect width="264" height="144" fill="#090612" />

        {/* Ancient Obsidian Portal Archway */}
        <rect x="78" y="18" width="16" height="104" fill="#334155" />
        <rect x="170" y="18" width="16" height="104" fill="#334155" />
        <rect x="70" y="12" width="124" height="12" fill="#475569" />
        <rect x="64" y="122" width="136" height="12" fill="#1e293b" />

        {/* 8-Stage Archway Rune Timer Indicator (lit when idx < 8 - step) */}
        {PORTAL_RUNE_SLOTS.map((slot, idx) => {
          const lit = idx < activeRunes;
          return (
            <rect
              key={idx}
              data-portal-rune={idx}
              data-rune-lit={lit ? 'true' : 'false'}
              x={slot.x}
              y={slot.y}
              width="6"
              height="10"
              fill={lit ? coreColor : '#1e293b'}
            />
          );
        })}

        {/* Active Dimensional Vortex & 4-Arm Stepped Spiral Swirl (when radius > 0) */}
        {radius > 0 && (
          <g transform="translate(132, 70)">
            <rect
              x={-radius}
              y={-Math.round(radius * 1.15)}
              width={radius * 2}
              height={Math.round(radius * 2.3)}
              fill={outerColor}
            />
            <rect
              x={-Math.round(radius * 0.65)}
              y={-Math.round(radius * 0.78)}
              width={Math.round(radius * 1.3)}
              height={Math.round(radius * 1.56)}
              fill={midColor}
            />

            {/* 4 Stepped Spiral Vortex Arms Rotating with step */}
            {[0, 1, 2, 3].map((armIdx) => {
              const dir = SPIRAL_ARM_DIRS[(armIdx + step) % 4];
              const s1 = Math.max(4, Math.round(radius * 0.28));
              const s2 = Math.max(7, Math.round(radius * 0.56));
              const s3 = Math.max(10, Math.round(radius * 0.82));
              const b1 = Math.max(3, Math.round(radius * 0.2));
              const b2 = Math.max(6, Math.round(radius * 0.44));
              const d = [
                `M ${dir.dx * s1 - 2} ${dir.dy * s1 - 2} h4 v4 h-4 Z`,
                `M ${dir.dx * s2 + dir.px * b1 - 2} ${dir.dy * s2 + dir.py * b1 - 2} h5 v5 h-5 Z`,
                `M ${dir.dx * s3 + dir.px * b2 - 2} ${dir.dy * s3 + dir.py * b2 - 2} h4 v4 h-4 Z`,
              ].join(' ');
              return <path key={armIdx} data-portal-arm={armIdx} d={d} fill={coreColor} />;
            })}

            {/* Center Singularity Core */}
            <rect x="-4" y="-4" width="8" height="8" fill="#ffffff" />
          </g>
        )}

        {/* Residual Sealed Rift Singularity at Step 8 (Collapsed) */}
        {step === 8 && (
          <g fill={midColor} opacity="0.6">
            <rect x="129" y="67" width="6" height="6" />
          </g>
        )}
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            className={`px-btn ${cycling ? 'px-btn-active' : ''}`}
            onClick={runLifecycle}
          >
            {t('demos.pixelart.portal.open')}
          </button>
          <button
            type="button"
            className={`px-btn ${emeraldRift ? 'px-btn-active' : ''}`}
            aria-pressed={emeraldRift}
            onClick={() => setEmeraldRift((e) => !e)}
          >
            {emeraldRift ? t('demos.pixelart.portal.emerald') : t('demos.pixelart.portal.purple')}
          </button>
        </div>
        <div className="px-slider-row">
          <label className="px-slider-label" htmlFor={`${id}-portal`}>
            <span className="px-slider-name">{t('demos.pixelart.portal.step')}</span>
            <input
              id={`${id}-portal`}
              type="range"
              className="px-slider"
              min={0}
              max={8}
              step={1}
              value={step}
              aria-controls={id}
              onChange={(e) => {
                const nextStep = Number(e.target.value);
                setPortalState((prev) => ({
                  ...prev,
                  step: nextStep,
                  cycling: false,
                }));
              }}
            />
            <span className="px-slider-val">{`${step}/8`}</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export const PIXEL_EFFECTS_EXPANSION_DEMOS = {
  'px-teleport-dissolve-reform': TeleportDissolveReformDemo,
  'px-stepped-lightning-chain': SteppedLightningChainDemo,
  'px-directional-crt-glitch': DirectionalCrtGlitchDemo,
  'px-ground-shockwave-rings': GroundShockwaveRingsDemo,
  'px-ice-freeze-thaw-spread': IceFreezeThawSpreadDemo,
  'px-pixel-portal-swirl': PixelPortalSwirlDemo,
} as const;
