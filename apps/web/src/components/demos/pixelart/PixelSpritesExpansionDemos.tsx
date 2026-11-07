import { useId, useRef, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';
import { usePixelAnimation } from './usePixelAnimation';

// ============================================================================
// 1. px-blacksmith-hammer-strike — Blacksmith Hammer Windup / Strike / Recovery
// ============================================================================
const SMITH_SPARKS: ReadonlyArray<ReadonlyArray<{ dx: number; dy: number; size: number }>> = [
  [],
  [
    { dx: -14, dy: -8, size: 3 },
    { dx: 12, dy: -10, size: 3 },
    { dx: -8, dy: -16, size: 2 },
    { dx: 16, dy: -4, size: 2 },
  ],
  [
    { dx: -26, dy: -18, size: 3 },
    { dx: -18, dy: -28, size: 2 },
    { dx: -10, dy: -12, size: 2 },
    { dx: 14, dy: -24, size: 3 },
    { dx: 24, dy: -14, size: 3 },
    { dx: 30, dy: -6, size: 2 },
    { dx: -22, dy: -6, size: 2 },
    { dx: 8, dy: -30, size: 2 },
  ],
  [
    { dx: -32, dy: -10, size: 2 },
    { dx: 28, dy: -8, size: 2 },
  ],
];

export function BlacksmithHammerStrikeDemo() {
  const { t } = useLocale();
  const id = useId();
  const [frame, setFrame] = useState(2);
  const [playing, setPlaying] = useState(true);
  const [runeHeat, setRuneHeat] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isAllowed = usePixelAnimation(
    () => {
      setFrame((prev) => (prev + 1) % 4);
    },
    playing ? 140 : null,
    containerRef
  );
  const activePlaying = playing && isAllowed;

  const poseLabels = [
    t('demos.pixelart.smith.pose0'),
    t('demos.pixelart.smith.pose1'),
    t('demos.pixelart.smith.pose2'),
    t('demos.pixelart.smith.pose3'),
  ];

  const coreColor = runeHeat ? '#e0f2fe' : '#fef08a';
  const midGlow = runeHeat ? '#38bdf8' : '#facc15';
  const outerGlow = runeHeat ? '#0284c7' : '#f97316';
  const emberColor = runeHeat ? '#06b6d4' : '#ea580c';

  const anvilShakeY = frame === 1 ? 2 : 0;
  const sparks = SMITH_SPARKS[frame] ?? [];

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demos.pixelart.art.blacksmithHammer')}
      >
        {/* Forge background & stone wall */}
        <rect width="264" height="144" fill="#120c1c" />
        <rect x="0" y="118" width="264" height="26" fill="#1e162b" />
        <rect x="0" y="118" width="264" height="2" fill="#332547" />

        {/* Background brick pattern */}
        <g fill="#1b1228">
          <rect x="16" y="18" width="24" height="10" />
          <rect x="44" y="18" width="24" height="10" />
          <rect x="28" y="32" width="24" height="10" />
          <rect x="200" y="20" width="24" height="10" />
          <rect x="228" y="20" width="20" height="10" />
          <rect x="212" y="34" width="24" height="10" />
        </g>

        {/* Left brick furnace & glowing hearth */}
        <rect x="14" y="42" width="58" height="76" fill="#271c36" />
        <rect x="10" y="38" width="66" height="6" fill="#3b2b52" />
        <rect x="22" y="64" width="42" height="54" fill="#09060e" />
        <rect
          x="26"
          y={frame === 2 ? 72 : 76}
          width="34"
          height={frame === 2 ? 38 : 34}
          fill={outerGlow}
          opacity={frame === 2 ? 0.95 : 0.75}
        />
        <rect
          x="32"
          y={frame === 2 ? 80 : 84}
          width="22"
          height="24"
          fill={midGlow}
        />
        <rect x="36" y="92" width="14" height="14" fill={coreColor} />
        <rect x="18" y="110" width="50" height="8" fill="#3b2b52" />

        {/* Weapon rack in background */}
        <rect x="86" y="26" width="44" height="4" fill="#332547" />
        <rect x="94" y="30" width="4" height="22" fill="#64748b" />
        <rect x="106" y="30" width="4" height="26" fill="#64748b" />
        <rect x="118" y="30" width="4" height="20" fill="#64748b" />

        {/* Anvil & oak stump */}
        <g transform={`translate(0, ${anvilShakeY})`}>
          {/* Oak base */}
          <rect x="108" y="102" width="40" height="16" fill="#5c3a21" />
          <rect x="112" y="102" width="8" height="16" fill="#7c4d2b" />
          <rect x="106" y="100" width="44" height="4" fill="#475569" />
          {/* Heavy iron anvil */}
          <rect x="114" y="88" width="28" height="12" fill="#334155" />
          <rect x="100" y="78" width="52" height="10" fill="#475569" />
          <rect x="92" y="80" width="8" height="6" fill="#64748b" />
          <rect x="100" y="76" width="52" height="3" fill="#94a3b8" />

          {/* Heated blade on anvil */}
          <rect x="104" y="72" width="34" height="4" fill={outerGlow} />
          <rect x="108" y="72" width="24" height="4" fill={midGlow} />
          <rect x="114" y="72" width="12" height="4" fill={coreColor} />
          {/* Tongs holding the blade from smith's left hand */}
          <rect x="138" y="73" width="18" height="2" fill="#94a3b8" />
        </g>

        {/* Impact flash ring on frame 1 & 2 */}
        {frame === 1 && (
          <g>
            <rect x="106" y="64" width="32" height="10" fill={coreColor} opacity="0.85" />
            <rect x="98" y="68" width="48" height="4" fill={midGlow} opacity="0.7" />
          </g>
        )}
        {frame === 2 && (
          <rect x="110" y="68" width="24" height="4" fill={coreColor} opacity="0.9" />
        )}

        {/* Radiating pixel sparks */}
        <g>
          {sparks.map((s, idx) => (
            <rect
              key={idx}
              x={122 + s.dx}
              y={72 + s.dy}
              width={s.size}
              height={s.size}
              fill={idx % 2 === 0 ? coreColor : midGlow}
            />
          ))}
        </g>

        {/* Blacksmith character sprite (right of anvil) */}
        <g transform={`translate(154, ${frame === 1 ? 46 : frame === 0 ? 42 : 44})`}>
          {/* Boots & legs */}
          <rect x="8" y="58" width="10" height="16" fill="#1e293b" />
          <rect x="24" y="58" width="10" height="16" fill="#1e293b" />
          <rect x="4" y="68" width="14" height="6" fill="#0f172a" />
          <rect x="22" y="68" width="14" height="6" fill="#0f172a" />

          {/* Leather smith apron & torso */}
          <rect x="6" y="24" width="30" height="36" fill="#7c2d12" />
          <rect x="10" y="28" width="22" height="30" fill="#9a3412" />
          <rect x="6" y="42" width="30" height="4" fill="#fbbf24" />

          {/* Muscular shoulders */}
          <rect x="2" y="22" width="10" height="12" fill="#d97706" />
          <rect x="30" y="22" width="10" height="12" fill="#d97706" />

          {/* Head, horned smith helm & beard */}
          <rect x="10" y="4" width="20" height="18" fill="#b45309" />
          <rect x="8" y="2" width="24" height="8" fill="#475569" />
          <rect x="12" y="0" width="16" height="4" fill="#64748b" />
          {/* Glowing forge visor eyes */}
          <rect x="12" y="10" width="6" height="3" fill={coreColor} />
          {/* Braided beard */}
          <rect x="8" y="14" width="18" height="12" fill="#d97706" />
          <rect x="10" y="26" width="12" height="6" fill="#b45309" />

          {/* Pose-specific Hammer & Right Arm */}
          {frame === 0 && (
            /* 0: High overhead windup */
            <g>
              <rect x="26" y="6" width="8" height="18" fill="#f59e0b" />
              <rect x="28" y="-18" width="4" height="26" fill="#78350f" />
              <rect x="18" y="-24" width="22" height="10" fill="#94a3b8" />
              <rect x="20" y="-22" width="18" height="4" fill="#cbd5e1" />
            </g>
          )}
          {frame === 1 && (
            /* 1: Downward strike impact + vertical motion smear */
            <g>
              {/* Smear trail */}
              <rect x="-28" y="-12" width="16" height="6" fill={midGlow} opacity="0.45" />
              <rect x="-34" y="0" width="12" height="16" fill="#cbd5e1" opacity="0.4" />
              {/* Arm extended forward */}
              <rect x="-10" y="20" width="18" height="8" fill="#f59e0b" />
              {/* Hammer handle & head striking anvil at x=-32, y=22 */}
              <rect x="-28" y="22" width="22" height="4" fill="#78350f" />
              <rect x="-40" y="14" width="16" height="12" fill="#e2e8f0" />
              <rect x="-38" y="16" width="12" height="4" fill={coreColor} />
            </g>
          )}
          {frame === 2 && (
            /* 2: Rebound recoil pose */
            <g>
              <rect x="-6" y="12" width="16" height="8" fill="#f59e0b" />
              <rect x="-22" y="4" width="20" height="4" fill="#78350f" />
              <rect x="-32" y="-4" width="16" height="12" fill="#94a3b8" />
              <rect x="-30" y="-2" width="12" height="4" fill={midGlow} />
            </g>
          )}
          {frame === 3 && (
            /* 3: Resting recovery pose */
            <g>
              <rect x="0" y="22" width="12" height="8" fill="#f59e0b" />
              <rect x="-14" y="16" width="18" height="4" fill="#78350f" />
              <rect x="-22" y="8" width="14" height="10" fill="#64748b" />
              <rect x="-20" y="10" width="10" height="4" fill="#94a3b8" />
            </g>
          )}
        </g>

        {/* Top-right HUD badge */}
        <rect x="176" y="10" width="78" height="18" fill="#09060e" stroke={emberColor} strokeWidth="1" />
        <text x="215" y="22" fill={coreColor} fontSize="8" fontFamily="monospace" textAnchor="middle">
          {poseLabels[frame]}
        </text>
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
            {activePlaying ? t('demos.pixelart.smith.pause') : t('demos.pixelart.smith.play')}
          </button>
          <button
            type="button"
            className={`px-btn ${runeHeat ? 'px-btn-active' : ''}`}
            aria-pressed={runeHeat}
            onClick={() => setRuneHeat((r) => !r)}
          >
            {runeHeat ? t('demos.pixelart.smith.heatRune') : t('demos.pixelart.smith.heatSteel')}
          </button>
        </div>
        <div className="px-slider-row">
          <label className="px-slider-label" htmlFor={`${id}-frame`}>
            <span className="px-slider-name">{t('demos.pixelart.smith.frame')}</span>
            <input
              id={`${id}-frame`}
              type="range"
              className="px-slider"
              min={0}
              max={3}
              step={1}
              value={frame}
              aria-controls={id}
              onChange={(e) => {
                setPlaying(false);
                setFrame(Number(e.target.value));
              }}
            />
            <span className="px-slider-val">{`#${frame + 1}/4`}</span>
          </label>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 2. px-jump-arc-poses — Jump Anticipation / Apex / Landing
// ============================================================================
const JUMP_ARC_X = [42, 86, 132, 178, 222] as const;
const JUMP_NORMAL_DY = [0, -22, -34, -22, 0] as const;
const JUMP_LUNAR_DY = [0, -30, -46, -30, 0] as const;
const JUMP_BBOX: ReadonlyArray<{ w: number; h: number }> = [
  { w: 18, h: 12 }, // 0: crouch squash
  { w: 12, h: 20 }, // 1: launch stretch
  { w: 15, h: 15 }, // 2: apex hang tuck
  { w: 13, h: 19 }, // 3: descent stretch
  { w: 19, h: 12 }, // 4: landing impact squash
];

export function JumpArcPosesDemo() {
  const { t } = useLocale();
  const id = useId();
  const [phase, setPhase] = useState(2);
  const [playing, setPlaying] = useState(true);
  const [lunarGravity, setLunarGravity] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isAllowed = usePixelAnimation(
    () => {
      setPhase((prev) => (prev + 1) % 5);
    },
    playing ? 160 : null,
    containerRef
  );
  const activePlaying = playing && isAllowed;

  const poseNames = [
    t('demos.pixelart.jump.pose0'),
    t('demos.pixelart.jump.pose1'),
    t('demos.pixelart.jump.pose2'),
    t('demos.pixelart.jump.pose3'),
    t('demos.pixelart.jump.pose4'),
  ];

  const dyTable = lunarGravity ? JUMP_LUNAR_DY : JUMP_NORMAL_DY;
  const groundY = 112;
  const activeX = JUMP_ARC_X[phase] ?? 132;
  const activeDy = dyTable[phase] ?? 0;
  const activeBox = JUMP_BBOX[phase] ?? { w: 15, h: 15 };
  const charLeft = Math.round(activeX - activeBox.w / 2);
  const charTop = groundY + activeDy - activeBox.h;

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demos.pixelart.art.jumpArcPoses')}
      >
        {/* Night courtyard sky */}
        <rect width="264" height="144" fill="#0b1120" />
        {/* Distant skyline towers */}
        <rect x="18" y="48" width="28" height="64" fill="#111c33" />
        <rect x="114" y="56" width="36" height="56" fill="#111c33" />
        <rect x="210" y="44" width="32" height="68" fill="#111c33" />

        {/* Stone platform floor */}
        <rect x="0" y={groundY} width="264" height="32" fill="#1e293b" />
        <rect x="0" y={groundY} width="264" height="4" fill="#475569" />
        <rect x="24" y="120" width="36" height="8" fill="#334155" />
        <rect x="112" y="120" width="40" height="8" fill="#334155" />
        <rect x="204" y="120" width="36" height="8" fill="#334155" />

        {/* Parabolic trajectory guide dots & ghost silhouettes */}
        {JUMP_ARC_X.map((gx, idx) => {
          const gy = groundY + (dyTable[idx] ?? 0) - 8;
          const gBox = JUMP_BBOX[idx] ?? { w: 15, h: 15 };
          const isCurrent = idx === phase;
          return (
            <g key={idx}>
              <rect
                x={gx - 2}
                y={gy - 2}
                width="4"
                height="4"
                fill={isCurrent ? '#38bdf8' : '#334155'}
              />
              {!isCurrent && (
                <rect
                  x={Math.round(gx - gBox.w / 2)}
                  y={groundY + (dyTable[idx] ?? 0) - gBox.h}
                  width={gBox.w}
                  height={gBox.h}
                  fill="#38bdf8"
                  opacity="0.16"
                />
              )}
            </g>
          );
        })}

        {/* Ground shadow directly under active X */}
        <rect
          x={activeX - (phase === 2 ? 5 : 9)}
          y={groundY + 2}
          width={phase === 2 ? 10 : 18}
          height="3"
          fill="#020617"
          opacity={phase === 2 ? 0.45 : 0.8}
        />

        {/* Phase 0 crouch compression lines */}
        {phase === 0 && (
          <g fill="#94a3b8">
            <rect x={activeX - 14} y={groundY - 4} width="4" height="4" />
            <rect x={activeX + 10} y={groundY - 4} width="4" height="4" />
          </g>
        )}

        {/* Phase 1 upward speed streaks */}
        {phase === 1 && (
          <g fill="#38bdf8" opacity="0.75">
            <rect x={activeX - 4} y={charTop + 22} width="2" height="10" />
            <rect x={activeX + 2} y={charTop + 24} width="2" height="12" />
          </g>
        )}

        {/* Phase 3 downward speed streaks */}
        {phase === 3 && (
          <g fill="#38bdf8" opacity="0.75">
            <rect x={activeX - 4} y={charTop - 12} width="2" height="10" />
            <rect x={activeX + 2} y={charTop - 14} width="2" height="12" />
          </g>
        )}

        {/* Phase 4 landing symmetrical dust puffs (6 particles) */}
        {phase === 4 && (
          <g fill="#cbd5e1">
            <rect x={activeX - 22} y={groundY - 6} width="4" height="4" />
            <rect x={activeX - 16} y={groundY - 10} width="3" height="3" />
            <rect x={activeX - 12} y={groundY - 4} width="3" height="3" />
            <rect x={activeX + 10} y={groundY - 4} width="3" height="3" />
            <rect x={activeX + 14} y={groundY - 10} width="3" height="3" />
            <rect x={activeX + 18} y={groundY - 6} width="4" height="4" />
          </g>
        )}

        {/* Active Runner Sprite with squash/stretch bounding box */}
        <g>
          {/* Trailing red scarf */}
          <rect
            x={charLeft - (phase === 2 ? 8 : 5)}
            y={charTop + (phase === 2 ? 4 : 6)}
            width={phase === 2 ? 8 : 5}
            height="4"
            fill="#f43f5e"
          />
          {/* Body silhouette */}
          <rect
            x={charLeft}
            y={charTop}
            width={activeBox.w}
            height={activeBox.h}
            fill="#0284c7"
          />
          {/* Highlight armor chest & head */}
          <rect
            x={charLeft + 2}
            y={charTop + 2}
            width={activeBox.w - 4}
            height={Math.max(4, Math.floor(activeBox.h / 2))}
            fill="#38bdf8"
          />
          {/* Visor eyes */}
          <rect
            x={charLeft + activeBox.w - 6}
            y={charTop + 3}
            width="4"
            height="3"
            fill="#fef08a"
          />
          {/* Boots */}
          <rect
            x={charLeft + 1}
            y={charTop + activeBox.h - 3}
            width="5"
            height="3"
            fill="#f43f5e"
          />
          <rect
            x={charLeft + activeBox.w - 6}
            y={charTop + activeBox.h - 3}
            width="5"
            height="3"
            fill="#f43f5e"
          />
        </g>

        {/* Top HUD readout */}
        <rect x="12" y="10" width="96" height="18" fill="#090d16" stroke="#38bdf8" strokeWidth="1" />
        <text x="60" y="22" fill="#e0f2fe" fontSize="8" fontFamily="monospace" textAnchor="middle">
          {poseNames[phase]}
        </text>
        <rect x="196" y="10" width="56" height="18" fill="#090d16" stroke="#475569" strokeWidth="1" />
        <text x="224" y="22" fill="#38bdf8" fontSize="8" fontFamily="monospace" textAnchor="middle">
          {`${activeBox.w}x${activeBox.h}`}
        </text>
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
            {activePlaying ? t('demos.pixelart.jump.pause') : t('demos.pixelart.jump.play')}
          </button>
          <button
            type="button"
            className={`px-btn ${lunarGravity ? 'px-btn-active' : ''}`}
            aria-pressed={lunarGravity}
            onClick={() => setLunarGravity((g) => !g)}
          >
            {lunarGravity ? t('demos.pixelart.jump.gravMoon') : t('demos.pixelart.jump.gravNormal')}
          </button>
        </div>
        <div className="px-slider-row">
          <label className="px-slider-label" htmlFor={`${id}-phase`}>
            <span className="px-slider-name">{t('demos.pixelart.jump.phase')}</span>
            <input
              id={`${id}-phase`}
              type="range"
              className="px-slider"
              min={0}
              max={4}
              step={1}
              value={phase}
              aria-controls={id}
              onChange={(e) => {
                setPlaying(false);
                setPhase(Number(e.target.value));
              }}
            />
            <span className="px-slider-val">{`#${phase + 1}/5`}</span>
          </label>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 3. px-dragon-wing-stroke — Dragon Wing Stroke & Counter-Bob
// ============================================================================
const DRAGON_BODY_DY = [2, -1, -4, 0] as const;
const DRAGON_SHADOW_W = [38, 32, 24, 34] as const;
const DRAGON_EMBERS: ReadonlyArray<{ x: number; y: number; size: number }> = [
  { x: 78, y: 84, size: 3 },
  { x: 94, y: 42, size: 2 },
  { x: 168, y: 46, size: 3 },
  { x: 184, y: 78, size: 2 },
  { x: 88, y: 98, size: 2 },
  { x: 174, y: 96, size: 3 },
  { x: 112, y: 32, size: 2 },
  { x: 152, y: 34, size: 2 },
];

export function DragonWingStrokeDemo() {
  const { t } = useLocale();
  const id = useId();
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [flameAura, setFlameAura] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const isAllowed = usePixelAnimation(
    () => {
      setFrame((prev) => (prev + 1) % 4);
    },
    playing ? 150 : null,
    containerRef
  );
  const activePlaying = playing && isAllowed;

  const bodyDy = DRAGON_BODY_DY[frame] ?? 0;
  const shadowW = DRAGON_SHADOW_W[frame] ?? 32;

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demos.pixelart.art.dragonWingStroke')}
      >
        {/* Volcanic sky & rocky ground */}
        <rect width="264" height="144" fill="#130b1c" />
        <polygon points="0,120 44,76 86,120" fill="#1e132b" />
        <polygon points="184,120 226,68 264,120" fill="#1e132b" />
        <rect x="0" y="116" width="264" height="28" fill="#231730" />
        <rect x="0" y="116" width="264" height="3" fill="#3b2651" />

        {/* Ground shadow scaling inversely with lift */}
        <rect
          x={132 - Math.floor(shadowW / 2)}
          y="124"
          width={shadowW}
          height="6"
          fill="#09050e"
          opacity="0.75"
        />

        {/* Flame aura particles */}
        {flameAura &&
          DRAGON_EMBERS.map((ember, idx) => {
            const lift = ((frame + idx) % 4) * 5;
            return (
              <rect
                key={idx}
                x={ember.x}
                y={ember.y - lift}
                width={ember.size}
                height={ember.size}
                fill={idx % 2 === 0 ? '#fde047' : '#f97316'}
              />
            );
          })}

        {/* Hovering Dragon Whelp Sprite */}
        <g transform={`translate(132, ${68 + bodyDy})`}>
          {/* Tail swaying opposite to body */}
          <rect x="-10" y="18" width="12" height="6" fill="#dc2626" />
          <rect x="-20" y={frame % 2 === 0 ? 22 : 18} width="12" height="6" fill="#b91c1c" />
          {flameAura && (
            <g>
              <rect x="-30" y={frame % 2 === 0 ? 20 : 16} width="10" height="8" fill="#f97316" />
              <rect x="-28" y={frame % 2 === 0 ? 22 : 18} width="6" height="4" fill="#fde047" />
            </g>
          )}

          {/* 4-Stage Wing Silhouettes */}
          {frame === 0 && (
            /* Frame 0: High V Upstroke */
            <g>
              {/* Left wing */}
              <rect x="-42" y="-32" width="30" height="10" fill="#991b1b" />
              <rect x="-36" y="-22" width="26" height="16" fill="#f97316" />
              {/* Right wing */}
              <rect x="12" y="-32" width="30" height="10" fill="#991b1b" />
              <rect x="10" y="-22" width="26" height="16" fill="#f97316" />
            </g>
          )}
          {frame === 1 && (
            /* Frame 1: Wide Power Sweep */
            <g>
              <rect x="-54" y="-8" width="42" height="8" fill="#b91c1c" />
              <rect x="-48" y="0" width="36" height="14" fill="#fb923c" />
              <rect x="12" y="-8" width="42" height="8" fill="#b91c1c" />
              <rect x="12" y="0" width="36" height="14" fill="#fb923c" />
            </g>
          )}
          {frame === 2 && (
            /* Frame 2: Deep Downstroke Wrap (Maximum Lift) */
            <g>
              <rect x="-38" y="6" width="28" height="22" fill="#991b1b" />
              <rect x="-32" y="10" width="22" height="18" fill="#f97316" />
              <rect x="10" y="6" width="28" height="22" fill="#991b1b" />
              <rect x="10" y="10" width="22" height="18" fill="#f97316" />
            </g>
          )}
          {frame === 3 && (
            /* Frame 3: Folded Recovery Stroke */
            <g>
              <rect x="-32" y="-16" width="22" height="20" fill="#7f1d1d" />
              <rect x="-26" y="-10" width="16" height="14" fill="#ea580c" />
              <rect x="10" y="-16" width="22" height="20" fill="#7f1d1d" />
              <rect x="10" y="-10" width="16" height="14" fill="#ea580c" />
            </g>
          )}

          {/* Dragon Torso & Armored Belly Scales */}
          <rect x="-14" y="-8" width="28" height="28" fill="#dc2626" />
          <rect x="-8" y="-2" width="16" height="20" fill="#fbbf24" />
          <rect x="-8" y="4" width="16" height="2" fill="#d97706" />
          <rect x="-8" y="10" width="16" height="2" fill="#d97706" />

          {/* Dragon Head, Horns & Glowing Eye */}
          <rect x="-12" y="-22" width="26" height="16" fill="#ef4444" />
          {/* Golden horns */}
          <rect x="-16" y="-30" width="6" height="10" fill="#fde047" />
          <rect x="8" y="-30" width="6" height="10" fill="#fde047" />
          {/* Snout & glowing eyes */}
          <rect x="6" y="-16" width="14" height="10" fill="#dc2626" />
          <rect x="2" y="-18" width="5" height="4" fill="#fef08a" />
          {/* Feet claws */}
          <rect x="-12" y="20" width="6" height="6" fill="#fde047" />
          <rect x="6" y="20" width="6" height="6" fill="#fde047" />
        </g>
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
            {activePlaying ? t('demos.pixelart.dragon.pause') : t('demos.pixelart.dragon.play')}
          </button>
          <button
            type="button"
            className={`px-btn ${flameAura ? 'px-btn-active' : ''}`}
            aria-pressed={flameAura}
            onClick={() => setFlameAura((a) => !a)}
          >
            {flameAura ? t('demos.pixelart.dragon.auraOn') : t('demos.pixelart.dragon.auraOff')}
          </button>
        </div>
        <div className="px-slider-row">
          <label className="px-slider-label" htmlFor={`${id}-frame`}>
            <span className="px-slider-name">{t('demos.pixelart.dragon.frame')}</span>
            <input
              id={`${id}-frame`}
              type="range"
              className="px-slider"
              min={0}
              max={3}
              step={1}
              value={frame}
              aria-controls={id}
              onChange={(e) => {
                setPlaying(false);
                setFrame(Number(e.target.value));
              }}
            />
            <span className="px-slider-val">{`#${frame + 1}/4`}</span>
          </label>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 4. px-slime-squash-stretch — Slime Squash & Stretch Volume Conservation
// ============================================================================
const SLIME_SEQUENCE = [-2, -1, 0, 1, 2, 1, 0, -1] as const;
const SLIME_SPECS: Record<number, { w: number; h: number; lift: number }> = {
  [-2]: { w: 60, h: 18, lift: 0 },
  [-1]: { w: 50, h: 24, lift: 0 },
  [0]: { w: 40, h: 30, lift: 0 },
  [1]: { w: 32, h: 38, lift: 8 },
  [2]: { w: 24, h: 48, lift: 18 },
};

export function SlimeSquashStretchDemo() {
  const { t } = useLocale();
  const id = useId();
  const [slimeState, setSlimeState] = useState<{ deform: number; seqIdx: number }>({
    deform: 0,
    seqIdx: 2,
  });
  const [playing, setPlaying] = useState(true);
  const [arcane, setArcane] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isAllowed = usePixelAnimation(
    () => {
      setSlimeState((prev) => {
        const nextIdx = (prev.seqIdx + 1) % SLIME_SEQUENCE.length;
        return {
          deform: SLIME_SEQUENCE[nextIdx] ?? 0,
          seqIdx: nextIdx,
        };
      });
    },
    playing ? 130 : null,
    containerRef
  );
  const activePlaying = playing && isAllowed;
  const { deform } = slimeState;

  const spec = SLIME_SPECS[deform] ?? { w: 40, h: 30, lift: 0 };
  const groundY = 114;
  const slimeLeft = Math.round(132 - spec.w / 2);
  const slimeTop = groundY - spec.lift - spec.h;

  const outerFill = arcane ? '#6b21a8' : '#065f46';
  const bodyFill = arcane ? '#a855f7' : '#10b981';
  const shineFill = arcane ? '#e9d5ff' : '#a7f3d0';
  const coreFill = arcane ? '#38bdf8' : '#fde047';

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demos.pixelart.art.slimeSquashStretch')}
      >
        {/* Dungeon stone room */}
        <rect width="264" height="144" fill="#0d1520" />
        <rect x="0" y={groundY} width="264" height="30" fill="#1e293b" />
        <rect x="0" y={groundY} width="264" height="3" fill="#475569" />

        {/* Height gauge ruler on left */}
        <g fill="#334155">
          <rect x="36" y="46" width="2" height="68" />
          <rect x="34" y="48" width="8" height="2" />
          <rect x="34" y="68" width="6" height="2" />
          <rect x="34" y="84" width="8" height="2" />
          <rect x="34" y="96" width="6" height="2" />
        </g>

        {/* Ground shadow under slime */}
        <rect
          x={132 - Math.round((spec.w + 6) / 2)}
          y={groundY + 3}
          width={spec.w + 6}
          height="5"
          fill="#020617"
          opacity={spec.lift > 0 ? 0.45 : 0.85}
        />

        {/* Splash droplets at extreme squash (-2) */}
        {deform === -2 && (
          <g fill={bodyFill}>
            <rect x={slimeLeft - 10} y={groundY - 12} width="4" height="4" />
            <rect x={slimeLeft - 16} y={groundY - 6} width="3" height="3" />
            <rect x={slimeLeft + spec.w + 6} y={groundY - 12} width="4" height="4" />
            <rect x={slimeLeft + spec.w + 13} y={groundY - 6} width="3" height="3" />
          </g>
        )}

        {/* Stepped Pixel Dome Slime Body */}
        <g>
          {/* Outer pixel outline & stepped dome crown */}
          <rect x={slimeLeft + 4} y={slimeTop} width={spec.w - 8} height={spec.h} fill={outerFill} />
          <rect x={slimeLeft} y={slimeTop + 4} width={spec.w} height={spec.h - 4} fill={outerFill} />
          {/* Inner translucent jelly fill */}
          <rect
            x={slimeLeft + 6}
            y={slimeTop + 2}
            width={spec.w - 12}
            height={spec.h - 4}
            fill={bodyFill}
          />
          <rect
            x={slimeLeft + 2}
            y={slimeTop + 6}
            width={spec.w - 4}
            height={spec.h - 8}
            fill={bodyFill}
          />
          {/* Floating internal nucleus star */}
          <rect
            x="128"
            y={slimeTop + Math.floor(spec.h * 0.42)}
            width="8"
            height="8"
            fill={coreFill}
          />
          <rect
            x="130"
            y={slimeTop + Math.floor(spec.h * 0.42) - 2}
            width="4"
            height="12"
            fill="#ffffff"
          />
          {/* Specular L-shaped highlight */}
          <rect x={slimeLeft + 6} y={slimeTop + 6} width="8" height="3" fill={shineFill} />
          <rect x={slimeLeft + 6} y={slimeTop + 6} width="3" height="8" fill={shineFill} />
          {/* Eyes */}
          <rect
            x="120"
            y={slimeTop + Math.floor(spec.h * 0.55)}
            width="4"
            height={deform === -2 ? 3 : 6}
            fill="#090d16"
          />
          <rect
            x="140"
            y={slimeTop + Math.floor(spec.h * 0.55)}
            width="4"
            height={deform === -2 ? 3 : 6}
            fill="#090d16"
          />
        </g>

        {/* Volume readout badge */}
        <rect x="184" y="12" width="68" height="18" fill="#090d16" stroke={bodyFill} strokeWidth="1" />
        <text x="218" y="24" fill={shineFill} fontSize="8" fontFamily="monospace" textAnchor="middle">
          {`${spec.w}x${spec.h}`}
        </text>
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
            {activePlaying ? t('demos.pixelart.slime.pause') : t('demos.pixelart.slime.play')}
          </button>
          <button
            type="button"
            className={`px-btn ${arcane ? 'px-btn-active' : ''}`}
            aria-pressed={arcane}
            onClick={() => setArcane((a) => !a)}
          >
            {arcane ? t('demos.pixelart.slime.arcane') : t('demos.pixelart.slime.emerald')}
          </button>
        </div>
        <div className="px-slider-row">
          <label className="px-slider-label" htmlFor={`${id}-deform`}>
            <span className="px-slider-name">{t('demos.pixelart.slime.deform')}</span>
            <input
              id={`${id}-deform`}
              type="range"
              className="px-slider"
              min={-2}
              max={2}
              step={1}
              value={deform}
              aria-controls={id}
              onChange={(e) => {
                const val = Number(e.target.value);
                setPlaying(false);
                const idx = SLIME_SEQUENCE.indexOf(val as -2 | -1 | 0 | 1 | 2);
                setSlimeState((prev) => ({
                  deform: val,
                  seqIdx: idx >= 0 ? idx : prev.seqIdx,
                }));
              }}
            />
            <span className="px-slider-val">{deform > 0 ? `+${deform}` : `${deform}`}</span>
          </label>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 5. px-modular-robot-loadout — Modular Robot Accessories & Paint Schemes
// ============================================================================
type RobotPaint = 'blue' | 'yellow' | 'crimson';

const ROBOT_PALETTES: Record<
  RobotPaint,
  { primary: string; secondary: string; trim: string; glow: string }
> = {
  blue: { primary: '#2563eb', secondary: '#1d4ed8', trim: '#93c5fd', glow: '#38bdf8' },
  yellow: { primary: '#eab308', secondary: '#ca8a04', trim: '#fef08a', glow: '#22d3ee' },
  crimson: { primary: '#dc2626', secondary: '#991b1b', trim: '#fca5a5', glow: '#facc15' },
};

export function ModularRobotLoadoutDemo() {
  const { t } = useLocale();
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [antenna, setAntenna] = useState(true);
  const [jetpack, setJetpack] = useState(true);
  const [plasmaArm, setPlasmaArm] = useState(false);
  const [paint, setPaint] = useState<RobotPaint>('blue');

  const pal = ROBOT_PALETTES[paint];
  const activeCount = Number(antenna) + Number(jetpack) + Number(plasmaArm);

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demos.pixelart.art.modularRobotLoadout')}
      >
        {/* Mech Hangar Bay Background */}
        <rect width="264" height="144" fill="#0b1120" />
        {/* Blueprint grid lines */}
        <g fill="#1e293b">
          <rect x="44" y="0" width="1" height="144" />
          <rect x="88" y="0" width="1" height="144" />
          <rect x="176" y="0" width="1" height="144" />
          <rect x="220" y="0" width="1" height="144" />
          <rect x="0" y="36" width="264" height="1" />
          <rect x="0" y="72" width="264" height="1" />
          <rect x="0" y="108" width="264" height="1" />
        </g>

        {/* Hangar hydraulic platform */}
        <rect x="78" y="118" width="108" height="10" fill="#334155" />
        <rect x="86" y="114" width="92" height="4" fill="#64748b" />
        <rect x="96" y="128" width="16" height="16" fill="#1e293b" />
        <rect x="152" y="128" width="16" height="16" fill="#1e293b" />

        {/* Back Socket (x-18): Jetpack Thrusters (behind chassis) */}
        {jetpack && (
          <g>
            <rect x="88" y="54" width="20" height="32" fill="#475569" />
            <rect x="92" y="58" width="12" height="22" fill={pal.secondary} />
            <rect x="90" y="86" width="14" height="6" fill="#1e293b" />
            {/* Dual cyan exhaust flames */}
            <rect x="92" y="92" width="10" height="14" fill="#06b6d4" />
            <rect x="94" y="92" width="6" height="8" fill="#e0f2fe" />
          </g>
        )}

        {/* Base Robot Chassis (anchored at center x=132) */}
        <g>
          {/* Legs & hydraulic feet */}
          <rect x="114" y="92" width="12" height="22" fill="#475569" />
          <rect x="138" y="92" width="12" height="22" fill="#475569" />
          <rect x="110" y="108" width="18" height="6" fill={pal.secondary} />
          <rect x="136" y="108" width="18" height="6" fill={pal.secondary} />

          {/* Left Arm (standard manipulator) */}
          <rect x="98" y="58" width="12" height="24" fill={pal.secondary} />
          <rect x="98" y="82" width="10" height="8" fill="#94a3b8" />

          {/* Torso Armor & Reactor Core */}
          <rect x="110" y="52" width="44" height="40" fill={pal.primary} />
          <rect x="114" y="56" width="36" height="32" fill={pal.secondary} />
          <rect x="114" y="56" width="36" height="4" fill={pal.trim} />
          {/* Chest core */}
          <rect x="124" y="66" width="16" height="14" fill="#0f172a" />
          <rect x="128" y="70" width="8" height="6" fill={pal.glow} />

          {/* Head Unit & Visor */}
          <rect x="116" y="30" width="32" height="22" fill={pal.primary} />
          <rect x="120" y="36" width="24" height="8" fill="#090d16" />
          <rect x="124" y="38" width="16" height="4" fill={pal.glow} />
        </g>

        {/* Head Socket (y-18): Radar Antenna Module */}
        {antenna && (
          <g>
            <rect x="130" y="14" width="4" height="16" fill="#94a3b8" />
            <rect x="122" y="16" width="20" height="4" fill={pal.trim} />
            <rect x="128" y="8" width="8" height="6" fill={pal.glow} />
            {/* Signal wave pixels */}
            <rect x="118" y="8" width="4" height="2" fill={pal.glow} />
            <rect x="142" y="8" width="4" height="2" fill={pal.glow} />
          </g>
        )}

        {/* Right Arm Socket (x+18): Standard Clamp vs Heavy Plasma Cannon */}
        {plasmaArm ? (
          <g>
            <rect x="154" y="54" width="18" height="16" fill={pal.secondary} />
            <rect x="168" y="56" width="32" height="14" fill="#334155" />
            <rect x="172" y="60" width="28" height="6" fill={pal.glow} />
            <rect x="200" y="54" width="8" height="18" fill="#e0f2fe" />
          </g>
        ) : (
          <g>
            <rect x="154" y="58" width="12" height="24" fill={pal.secondary} />
            <rect x="156" y="82" width="10" height="8" fill="#94a3b8" />
          </g>
        )}

        {/* Socket indicator badge */}
        <rect x="196" y="10" width="56" height="18" fill="#090d16" stroke={pal.glow} strokeWidth="1" />
        <text x="224" y="22" fill={pal.trim} fontSize="8" fontFamily="monospace" textAnchor="middle">
          {`${activeCount}/3`}
        </text>
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            className={`px-btn ${antenna ? 'px-btn-active' : ''}`}
            aria-pressed={antenna}
            onClick={() => setAntenna((v) => !v)}
          >
            {t('demos.pixelart.robot.antenna')}
          </button>
          <button
            type="button"
            className={`px-btn ${jetpack ? 'px-btn-active' : ''}`}
            aria-pressed={jetpack}
            onClick={() => setJetpack((v) => !v)}
          >
            {t('demos.pixelart.robot.jetpack')}
          </button>
          <button
            type="button"
            className={`px-btn ${plasmaArm ? 'px-btn-active' : ''}`}
            aria-pressed={plasmaArm}
            onClick={() => setPlasmaArm((v) => !v)}
          >
            {t('demos.pixelart.robot.plasma')}
          </button>
        </div>
        <div className="px-btn-row">
          <button
            type="button"
            className={`px-btn ${paint === 'blue' ? 'px-btn-active' : ''}`}
            aria-pressed={paint === 'blue'}
            onClick={() => setPaint('blue')}
          >
            {t('demos.pixelart.robot.paintBlue')}
          </button>
          <button
            type="button"
            className={`px-btn ${paint === 'yellow' ? 'px-btn-active' : ''}`}
            aria-pressed={paint === 'yellow'}
            onClick={() => setPaint('yellow')}
          >
            {t('demos.pixelart.robot.paintYellow')}
          </button>
          <button
            type="button"
            className={`px-btn ${paint === 'crimson' ? 'px-btn-active' : ''}`}
            aria-pressed={paint === 'crimson'}
            onClick={() => setPaint('crimson')}
          >
            {t('demos.pixelart.robot.paintRed')}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 6. px-directional-archer-draw — Directional Archer Draw & Release Frames
// ============================================================================
type ArcherAngle = 45 | 0 | -30;

const TARGET_COORDS: Record<ArcherAngle, { tx: number; ty: number; bowDy: number }> = {
  45: { tx: 136, ty: 18, bowDy: -4 },
  0: { tx: 222, ty: 72, bowDy: 0 },
  [-30]: { tx: 179, ty: 128, bowDy: 4 },
};

export function DirectionalArcherDrawDemo() {
  const { t } = useLocale();
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState<ArcherAngle>(0);
  const [drawStep, setDrawStep] = useState(2);

  const stepLabels = [
    t('demos.pixelart.archer.step0'),
    t('demos.pixelart.archer.step1'),
    t('demos.pixelart.archer.step2'),
    t('demos.pixelart.archer.step3'),
  ];

  const { tx, ty, bowDy } = TARGET_COORDS[angle];
  const pullPx = drawStep === 1 ? 4 : drawStep === 2 ? 8 : 0;
  const originX = 82;
  const originY = 72;

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demos.pixelart.art.directionalArcherDraw')}
      >
        {/* Night range backdrop */}
        <rect width="264" height="144" fill="#0c1322" />
        {/* Stone battlement tower on left */}
        <rect x="16" y="92" width="68" height="52" fill="#1e293b" />
        <rect x="14" y="88" width="72" height="6" fill="#475569" />
        <rect x="16" y="82" width="12" height="6" fill="#475569" />
        <rect x="44" y="82" width="12" height="6" fill="#475569" />
        <rect x="72" y="82" width="12" height="6" fill="#475569" />

        {/* Three target dummies matching true +45°, 0°, -30° vectors from (82, 72) */}
        {([45, 0, -30] as const).map((a) => {
          const target = TARGET_COORDS[a];
          const isSelected = a === angle;
          return (
            <g key={a}>
              <rect
                x={target.tx - 8}
                y={target.ty - 10}
                width="16"
                height="20"
                fill={isSelected ? '#b91c1c' : '#334155'}
              />
              <rect
                x={target.tx - 4}
                y={target.ty - 6}
                width="8"
                height="12"
                fill={isSelected ? '#fef08a' : '#64748b'}
              />
              <rect
                x={target.tx - 2}
                y={target.ty - 2}
                width="4"
                height="4"
                fill={isSelected ? '#ef4444' : '#1e293b'}
              />
              {/* Target reticle lock when selected and at full draw (step 2) */}
              {isSelected && drawStep === 2 && (
                <g fill="#22d3ee">
                  <rect x={target.tx - 12} y={target.ty - 14} width="6" height="2" />
                  <rect x={target.tx + 6} y={target.ty - 14} width="6" height="2" />
                  <rect x={target.tx - 12} y={target.ty + 12} width="6" height="2" />
                  <rect x={target.tx + 6} y={target.ty + 12} width="6" height="2" />
                </g>
              )}
            </g>
          );
        })}

        {/* Stepped aiming trajectory guide dots along selected angle */}
        {[1, 2, 3, 4, 5].map((step) => {
          const dotX = Math.round(originX + ((tx - originX) * step) / 6);
          const dotY = Math.round(originY + ((ty - originY) * step) / 6);
          return (
            <rect
              key={step}
              x={dotX - 1}
              y={dotY - 1}
              width="3"
              height="3"
              fill={drawStep >= 2 ? '#38bdf8' : '#334155'}
            />
          );
        })}

        {/* Ranger Sprite on Battlement */}
        <g transform="translate(46, 44)">
          {/* Boots & legs */}
          <rect x="8" y="34" width="6" height="10" fill="#14532d" />
          <rect x="18" y="34" width="6" height="10" fill="#14532d" />
          {/* Forest cloak & torso */}
          <rect
            x="2"
            y="16"
            width={drawStep === 3 ? 26 : 22}
            height="18"
            fill="#15803d"
          />
          <rect x="8" y="16" width="14" height="18" fill="#22c55e" />
          {/* Hooded head tilting with angle */}
          <rect
            x="8"
            y={angle === 45 ? 0 : angle === -30 ? 4 : 2}
            width="16"
            height="14"
            fill="#166534"
          />
          <rect
            x="18"
            y={angle === 45 ? 4 : angle === -30 ? 8 : 6}
            width="4"
            height="4"
            fill="#fde047"
          />

          {/* Stepped Recurve Bow, Bowstring & Nocked Arrow oriented by angle */}
          <g transform={`translate(28, ${16 + bowDy})`}>
            {angle === 0 && (
              <g data-aim-pose="level-0">
                <rect x="6" y="-14" width="4" height="28" fill="#d97706" />
                <rect x={6 - Math.floor(pullPx / 2)} y="-16" width="4" height="4" fill="#fbbf24" />
                <rect x={6 - Math.floor(pullPx / 2)} y="12" width="4" height="4" fill="#fbbf24" />
                <rect x={4 - pullPx} y="-12" width="2" height="24" fill="#e2e8f0" />
                {(drawStep === 1 || drawStep === 2) && (
                  <g data-nocked-arrow="0">
                    <rect x={4 - pullPx} y="-1" width="18" height="2" fill="#cbd5e1" />
                    <rect x={22 - pullPx} y="-2" width="4" height="4" fill="#38bdf8" />
                  </g>
                )}
              </g>
            )}
            {angle === 45 && (
              <g data-aim-pose="up-45">
                {/* Stepped diagonal bow limbs perpendicular to +45° */}
                <rect x="-2" y="-12" width="4" height="6" fill="#fbbf24" />
                <rect x="2" y="-8" width="4" height="8" fill="#d97706" />
                <rect x="6" y="-2" width="4" height="8" fill="#d97706" />
                <rect x="10" y="4" width="4" height="6" fill="#fbbf24" />
                {/* Stepped bowstring pulled down-left along +45° axis */}
                <rect x={-2 - Math.floor(pullPx / 2)} y={-6 + Math.floor(pullPx / 2)} width="2" height="10" fill="#e2e8f0" />
                <rect x={2 - Math.floor(pullPx / 2)} y={2 + Math.floor(pullPx / 2)} width="8" height="2" fill="#e2e8f0" />
                {/* Stepped +45° upward nocked arrow */}
                {(drawStep === 1 || drawStep === 2) && (
                  <g data-nocked-arrow="45">
                    {[0, 1, 2, 3, 4, 5].map((s) => (
                      <rect
                        key={s}
                        x={2 - Math.floor(pullPx / 2) + s * 2}
                        y={2 + Math.floor(pullPx / 2) - s * 2}
                        width="3"
                        height="3"
                        fill="#cbd5e1"
                      />
                    ))}
                    <rect
                      x={14 - Math.floor(pullPx / 2)}
                      y={-10 + Math.floor(pullPx / 2)}
                      width="4"
                      height="4"
                      fill="#38bdf8"
                    />
                  </g>
                )}
              </g>
            )}
            {angle === -30 && (
              <g data-aim-pose="down-30">
                {/* Stepped bow limbs tilted for -30° downward aim */}
                <rect x="10" y="-12" width="4" height="6" fill="#fbbf24" />
                <rect x="6" y="-6" width="4" height="8" fill="#d97706" />
                <rect x="4" y="2" width="4" height="8" fill="#d97706" />
                <rect x="0" y="8" width="4" height="6" fill="#fbbf24" />
                {/* Bowstring pulled up-left along -30° axis */}
                <rect x={4 - pullPx} y={-8 - Math.floor(pullPx / 3)} width="2" height="18" fill="#e2e8f0" />
                {/* Stepped -30° downward nocked arrow */}
                {(drawStep === 1 || drawStep === 2) && (
                  <g data-nocked-arrow="-30">
                    {[0, 1, 2, 3, 4, 5].map((s) => (
                      <rect
                        key={s}
                        x={4 - pullPx + s * 3}
                        y={-2 - Math.floor(pullPx / 3) + s * 2}
                        width="3"
                        height="2"
                        fill="#cbd5e1"
                      />
                    ))}
                    <rect
                      x={22 - pullPx}
                      y={10 - Math.floor(pullPx / 3)}
                      width="4"
                      height="4"
                      fill="#38bdf8"
                    />
                  </g>
                )}
              </g>
            )}
          </g>
        </g>

        {/* Released arrow streak & angled target impact on step 3 */}
        {drawStep === 3 && (
          <g data-released-angle={angle}>
            <line
              x1={originX}
              y1={originY}
              x2={tx}
              y2={ty}
              stroke="#38bdf8"
              strokeWidth="3"
            />
            {angle === 45 && (
              <g fill="#fef08a">
                <rect x={tx - 10} y={ty + 8} width="4" height="4" />
                <rect x={tx - 7} y={ty + 5} width="4" height="4" />
                <rect x={tx - 4} y={ty + 2} width="4" height="4" />
              </g>
            )}
            {angle === 0 && (
              <rect x={tx - 16} y={ty - 1} width="14" height="3" fill="#fef08a" />
            )}
            {angle === -30 && (
              <g fill="#fef08a">
                <rect x={tx - 12} y={ty - 8} width="4" height="3" />
                <rect x={tx - 8} y={ty - 6} width="4" height="3" />
                <rect x={tx - 4} y={ty - 4} width="4" height="3" />
              </g>
            )}
            <rect x={tx - 4} y={ty - 8} width="4" height="4" fill="#fef08a" />
            <rect x={tx - 4} y={ty + 4} width="4" height="4" fill="#fef08a" />
          </g>
        )}

        {/* Top-left HUD status */}
        <rect x="14" y="10" width="96" height="18" fill="#090d16" stroke="#22c55e" strokeWidth="1" />
        <text x="62" y="22" fill="#bbf7d0" fontSize="8" fontFamily="monospace" textAnchor="middle">
          {stepLabels[drawStep]}
        </text>
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            className={`px-btn ${angle === 45 ? 'px-btn-active' : ''}`}
            aria-pressed={angle === 45}
            onClick={() => setAngle(45)}
          >
            {t('demos.pixelart.archer.angleUp')}
          </button>
          <button
            type="button"
            className={`px-btn ${angle === 0 ? 'px-btn-active' : ''}`}
            aria-pressed={angle === 0}
            onClick={() => setAngle(0)}
          >
            {t('demos.pixelart.archer.angleMid')}
          </button>
          <button
            type="button"
            className={`px-btn ${angle === -30 ? 'px-btn-active' : ''}`}
            aria-pressed={angle === -30}
            onClick={() => setAngle(-30)}
          >
            {t('demos.pixelart.archer.angleDown')}
          </button>
        </div>
        <div className="px-slider-row">
          <label className="px-slider-label" htmlFor={`${id}-draw`}>
            <span className="px-slider-name">{t('demos.pixelart.archer.draw')}</span>
            <input
              id={`${id}-draw`}
              type="range"
              className="px-slider"
              min={0}
              max={3}
              step={1}
              value={drawStep}
              aria-controls={id}
              onChange={(e) => setDrawStep(Number(e.target.value))}
            />
            <span className="px-slider-val">{`#${drawStep + 1}/4`}</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export const PIXEL_SPRITES_EXPANSION_DEMOS = {
  'px-blacksmith-hammer-strike': BlacksmithHammerStrikeDemo,
  'px-jump-arc-poses': JumpArcPosesDemo,
  'px-dragon-wing-stroke': DragonWingStrokeDemo,
  'px-slime-squash-stretch': SlimeSquashStretchDemo,
  'px-modular-robot-loadout': ModularRobotLoadoutDemo,
  'px-directional-archer-draw': DirectionalArcherDrawDemo,
} as const;
