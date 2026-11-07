import { useId, useRef, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';
import { usePixelAnimation } from './usePixelAnimation';

// ============================================================================
// 1. px-quest-tracker-states — Quest Tracker States & Progress Bar
// ============================================================================
export function QuestTrackerStatesDemo() {
  const { t } = useLocale();
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [objectives, setObjectives] = useState<[boolean, boolean, boolean]>([true, true, false]);
  const [pinned, setPinned] = useState(true);

  const toggleObjective = (index: 0 | 1 | 2) => {
    setObjectives((prev) => {
      const next: [boolean, boolean, boolean] = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const completedCount = objectives.filter(Boolean).length;
  const allCleared = completedCount === 3;
  const objLabels = [
    t('demos.pixelart.quest.obj1'),
    t('demos.pixelart.quest.obj2'),
    t('demos.pixelart.quest.obj3'),
  ];

  const borderColor = allCleared ? '#4ade80' : pinned ? '#facc15' : '#475569';

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demos.pixelart.art.questTrackerStates')}
      >
        <rect width="264" height="144" fill="#0b1120" />

        {/* Main Quest Tracker HUD Window */}
        <rect
          x="18"
          y="12"
          width="228"
          height="120"
          fill="#111827"
          stroke={borderColor}
          strokeWidth="2"
        />
        {/* Header Bar */}
        <rect x="20" y="14" width="224" height="20" fill="#1e293b" />
        {/* Pin indicator icon */}
        <rect
          x="26"
          y="19"
          width="8"
          height="8"
          fill={pinned ? '#facc15' : '#64748b'}
        />
        <text x="40" y="27" fill="#f8fafc" fontSize="8" fontFamily="monospace">
          {t('demos.pixelart.quest.header')}
        </text>
        <text x="236" y="27" fill="#fde047" fontSize="8" fontFamily="monospace" textAnchor="end">
          {`${completedCount}/3`}
        </text>

        {/* Segmented Progress Bar */}
        <rect x="26" y="40" width="144" height="8" fill="#090d16" stroke="#334155" strokeWidth="1" />
        {[0, 1, 2].map((seg) => (
          <rect
            key={seg}
            x={28 + seg * 47}
            y="42"
            width="44"
            height="4"
            fill={seg < completedCount ? '#22c55e' : '#1e293b'}
          />
        ))}

        {/* 3 Objective Rows */}
        {([0, 1, 2] as const).map((idx) => {
          const done = objectives[idx];
          const rowY = 56 + idx * 22;
          return (
            <g key={idx}>
              <rect
                x="26"
                y={rowY}
                width="144"
                height="18"
                fill={done ? '#064e3b' : '#1e293b'}
                opacity={done ? 0.55 : 0.9}
              />
              {/* Pixel Checkbox */}
              <rect
                x="30"
                y={rowY + 4}
                width="10"
                height="10"
                fill={done ? '#22c55e' : '#090d16'}
                stroke={done ? '#86efac' : '#64748b'}
                strokeWidth="1"
              />
              {done && <rect x="33" y={rowY + 7} width="4" height="4" fill="#052e16" />}
              <text
                x="46"
                y={rowY + 12}
                fill={done ? '#86efac' : '#e2e8f0'}
                fontSize="8"
                fontFamily="monospace"
              >
                {objLabels[idx]}
              </text>
              {done && (
                <line
                  x1="46"
                  y1={rowY + 9}
                  x2="156"
                  y2={rowY + 9}
                  stroke="#4ade80"
                  strokeWidth="1"
                />
              )}
            </g>
          );
        })}

        {/* Right Reward Chest & Clear Banner */}
        <g transform="translate(182, 48)">
          <rect x="0" y="0" width="54" height="72" fill="#090d16" stroke="#334155" strokeWidth="1" />
          {/* Chest base */}
          <rect x="13" y="34" width="28" height="18" fill="#92400e" />
          <rect x="13" y="34" width="28" height="4" fill="#facc15" />
          {/* Chest lid (open with golden glow when allCleared) */}
          {allCleared ? (
            <g>
              <rect x="13" y="18" width="28" height="8" fill="#78350f" />
              <rect x="15" y="26" width="24" height="8" fill="#fef08a" />
              <rect x="23" y="12" width="8" height="6" fill="#38bdf8" />
            </g>
          ) : (
            <g>
              <rect x="13" y="24" width="28" height="10" fill="#b45309" />
              <rect x="24" y="31" width="6" height="6" fill="#facc15" />
            </g>
          )}
          <text
            x="27"
            y="64"
            fill={allCleared ? '#4ade80' : '#94a3b8'}
            fontSize="6"
            fontFamily="monospace"
            textAnchor="middle"
          >
            {allCleared ? t('demos.pixelart.quest.clear') : `${completedCount * 33}%`}
          </text>
        </g>
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            className={`px-btn ${objectives[0] ? 'px-btn-active' : ''}`}
            aria-pressed={objectives[0]}
            onClick={() => toggleObjective(0)}
          >
            {t('demos.pixelart.quest.obj1')}
          </button>
          <button
            type="button"
            className={`px-btn ${objectives[1] ? 'px-btn-active' : ''}`}
            aria-pressed={objectives[1]}
            onClick={() => toggleObjective(1)}
          >
            {t('demos.pixelart.quest.obj2')}
          </button>
          <button
            type="button"
            className={`px-btn ${objectives[2] ? 'px-btn-active' : ''}`}
            aria-pressed={objectives[2]}
            onClick={() => toggleObjective(2)}
          >
            {t('demos.pixelart.quest.obj3')}
          </button>
        </div>
        <div className="px-btn-row">
          <button
            type="button"
            className={`px-btn ${pinned ? 'px-btn-active' : ''}`}
            aria-pressed={pinned}
            onClick={() => setPinned((p) => !p)}
          >
            {pinned ? t('demos.pixelart.quest.pinOn') : t('demos.pixelart.quest.pinOff')}
          </button>
          <button
            type="button"
            className="px-btn"
            onClick={() => setObjectives([true, true, false])}
          >
            {t('demos.pixelart.quest.reset')}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 2. px-radial-spell-hotbar-cooldown — Radial Spell Hotbar Cooldown
// ============================================================================
const SLOT_KEYS = ['Q', 'W', 'E', 'R'] as const;
const SLOT_COLORS = ['#f97316', '#38bdf8', '#a855f7', '#facc15'] as const;
const SPELL_GLYPH_IDS = ['fireball', 'frost-lance', 'arcane-nova', 'thunder-strike'] as const;

function renderSpellGlyph(slotIdx: number, sx: number, sy: number, color: string) {
  if (slotIdx === 0) {
    // Q: Fireball (stepped flame crown + core)
    return (
      <g data-spell-glyph={SPELL_GLYPH_IDS[0]}>
        <path
          d={`M${sx + 21} ${sy + 9}h4v4h5v5h3v12h-4v4h-12v-4h-4v-12h3v-5h5v-4Z`}
          fill={color}
        />
        <rect x={sx + 18} y={sy + 20} width="10" height="10" fill="#fef08a" />
      </g>
    );
  }
  if (slotIdx === 1) {
    // W: Frost Lance (diamond ice crystal + cross)
    return (
      <g data-spell-glyph={SPELL_GLYPH_IDS[1]}>
        <path
          d={`M${sx + 21} ${sy + 8}h4v6h5v5h5v4h-5v5h-5v6h-4v-6h-5v-5h-5v-4h5v-5h5v-6Z`}
          fill={color}
        />
        <rect x={sx + 20} y={sy + 14} width="6" height="14" fill="#e0f2fe" />
        <rect x={sx + 16} y={sy + 18} width="14" height="6" fill="#e0f2fe" />
      </g>
    );
  }
  if (slotIdx === 2) {
    // E: Arcane Nova (crescent ring + arcane eye core)
    return (
      <g data-spell-glyph={SPELL_GLYPH_IDS[2]}>
        <path
          d={`M${sx + 15} ${sy + 10}h16v4h4v16h-4v4h-16v-4h-4v-16h4v-4Z`}
          fill={color}
        />
        <rect x={sx + 15} y={sy + 15} width="16" height="14" fill="#111827" />
        <rect x={sx + 19} y={sy + 18} width="8" height="8" fill="#f0abfc" />
      </g>
    );
  }
  // R: Thunder Strike (stepped zig-zag bolt)
  return (
    <g data-spell-glyph={SPELL_GLYPH_IDS[3]}>
      <path
        d={`M${sx + 24} ${sy + 8}h8v6h-4v6h6v5h-6v5h-4v6h-6v-6h4v-5h-6v-5h4v-6h4v-6Z`}
        fill={color}
      />
      <rect x={sx + 20} y={sy + 18} width="8" height="5" fill="#ffffff" />
    </g>
  );
}

function getRadialWedgePolygon(cx: number, cy: number, r: number, pct: number): string {
  if (pct <= 0) return '';
  if (pct >= 100) {
    return `${cx - r},${cy - r} ${cx + r},${cy - r} ${cx + r},${cy + r} ${cx - r},${cy + r}`;
  }
  const points: string[] = [`${cx},${cy}`];
  const steps = Math.max(2, Math.round((pct / 100) * 16));
  for (let i = 0; i <= steps; i++) {
    const ratio = (i / steps) * (pct / 100);
    const angle = -Math.PI / 2 + ratio * Math.PI * 2;
    const px = Math.round(cx + Math.cos(angle) * r * 1.45);
    const py = Math.round(cy + Math.sin(angle) * r * 1.45);
    points.push(`${px},${py}`);
  }
  return points.join(' ');
}

export function RadialSpellHotbarCooldownDemo() {
  const { t } = useLocale();
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedSlot, setSelectedSlot] = useState(1);
  const [hotbar, setHotbar] = useState<{
    cds: [number, number, number, number];
    running: [boolean, boolean, boolean, boolean];
  }>({
    cds: [0, 60, 30, 0],
    running: [false, false, false, false],
  });

  const anyRunning = hotbar.running.some(Boolean);
  const isAllowed = usePixelAnimation(
    () => {
      setHotbar((prev) => {
        const nextCds: [number, number, number, number] = [...prev.cds];
        const nextRunning: [boolean, boolean, boolean, boolean] = [...prev.running];
        for (let i = 0; i < 4; i++) {
          if (nextRunning[i]) {
            const nextVal = Math.max(0, nextCds[i]! - 10);
            nextCds[i] = nextVal;
            if (nextVal === 0) {
              nextRunning[i] = false;
            }
          }
        }
        return { cds: nextCds, running: nextRunning };
      });
    },
    anyRunning ? 120 : null,
    containerRef
  );

  const selectedCooldown = hotbar.cds[selectedSlot] ?? 0;
  const isSelectedSweeping = Boolean(hotbar.running[selectedSlot]) && isAllowed;

  const triggerCast = () => {
    setHotbar((prev) => {
      const nextCds: [number, number, number, number] = [...prev.cds];
      const nextRunning: [boolean, boolean, boolean, boolean] = [...prev.running];
      if (!isAllowed) {
        nextCds[selectedSlot] = prev.cds[selectedSlot] === 100 ? 0 : 100;
        nextRunning[selectedSlot] = false;
      } else {
        nextCds[selectedSlot] = 100;
        nextRunning[selectedSlot] = true;
      }
      return {
        cds: nextCds,
        running: nextRunning,
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
        aria-label={t('demos.pixelart.art.radialSpellHotbarCooldown')}
      >
        <defs>
          {[0, 1, 2, 3].map((idx) => (
            <clipPath key={idx} id={`hotbar-clip-${id}-${idx}`}>
              <rect x={28 + idx * 54} y="42" width="46" height="46" />
            </clipPath>
          ))}
        </defs>

        <rect width="264" height="144" fill="#090d16" />
        {/* Hotbar Backplate */}
        <rect x="18" y="32" width="228" height="76" fill="#1e293b" stroke="#475569" strokeWidth="2" />

        {[0, 1, 2, 3].map((idx) => {
          const sx = 28 + idx * 54;
          const sy = 42;
          const isSelected = idx === selectedSlot;
          const slotPct = hotbar.cds[idx] ?? 0;
          const isReady = slotPct === 0;
          const color = SLOT_COLORS[idx] ?? '#38bdf8';
          const wedgePoints = getRadialWedgePolygon(sx + 23, sy + 23, 24, slotPct);

          return (
            <g key={idx} data-slot-key={SLOT_KEYS[idx]} data-slot-cooldown={slotPct}>
              {/* Slot Frame */}
              <rect
                x={sx - 2}
                y={sy - 2}
                width="50"
                height="50"
                fill="#0f172a"
                stroke={isSelected && isReady ? '#fef08a' : isSelected ? '#38bdf8' : '#334155'}
                strokeWidth={isSelected ? 2 : 1}
              />

              {/* Distinct Spell Pixel Glyph inside slot */}
              <rect x={sx + 4} y={sy + 4} width="38" height="38" fill="#111827" />
              {renderSpellGlyph(idx, sx, sy, color)}

              {/* Radial Clockwise Cooldown Wedge Mask */}
              {slotPct > 0 && (
                <g clipPath={`url(#hotbar-clip-${id}-${idx})`}>
                  <polygon points={wedgePoints} fill="#020617" opacity="0.82" />
                </g>
              )}

              {/* Remaining Cooldown Percentage or Ready Text */}
              {slotPct > 0 ? (
                <text
                  x={sx + 23}
                  y={sy + 27}
                  fill="#fef08a"
                  fontSize="9"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  {`${slotPct}%`}
                </text>
              ) : (
                isSelected && (
                  <text
                    x={sx + 23}
                    y={sy + 60}
                    fill="#4ade80"
                    fontSize="7"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    {t('demos.pixelart.hotbar.ready')}
                  </text>
                )
              )}
            </g>
          );
        })}
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            className={`px-btn ${isSelectedSweeping ? 'px-btn-active' : ''}`}
            onClick={triggerCast}
          >
            {t('demos.pixelart.hotbar.cast')}
          </button>
          <button
            type="button"
            className="px-btn"
            onClick={() => setSelectedSlot((s) => (s + 1) % 4)}
          >
            {t('demos.pixelart.hotbar.nextSlot', { slot: SLOT_KEYS[selectedSlot] ?? 'W' })}
          </button>
        </div>
        <div className="px-slider-row">
          <label className="px-slider-label" htmlFor={`${id}-cd`}>
            <span className="px-slider-name">{t('demos.pixelart.hotbar.cooldown')}</span>
            <input
              id={`${id}-cd`}
              type="range"
              className="px-slider"
              min={0}
              max={100}
              step={10}
              value={selectedCooldown}
              aria-controls={id}
              onChange={(e) => {
                const val = Number(e.target.value);
                setHotbar((prev) => {
                  const nextCds: [number, number, number, number] = [...prev.cds];
                  const nextRunning: [boolean, boolean, boolean, boolean] = [...prev.running];
                  nextCds[selectedSlot] = val;
                  nextRunning[selectedSlot] = false;
                  return { cds: nextCds, running: nextRunning };
                });
              }}
            />
            <span className="px-slider-val">{`${selectedCooldown}%`}</span>
          </label>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 3. px-turn-order-timeline — Turn Order Timeline & Speed Haste
// ============================================================================
const TURN_ROSTER_IDS = ['rogue', 'hero', 'mage', 'boss'] as const;
type TurnUnitId = (typeof TURN_ROSTER_IDS)[number];

function getTurnUnitSpd(unitId: TurnUnitId, mageHaste: boolean): number {
  if (unitId === 'rogue') return 18;
  if (unitId === 'hero') return 16;
  if (unitId === 'mage') return mageHaste ? 22 : 14;
  return 11;
}

export function TurnOrderTimelineDemo() {
  const { t } = useLocale();
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [queue, setQueue] = useState<ReadonlyArray<TurnUnitId>>(TURN_ROSTER_IDS);
  const [mageHaste, setMageHaste] = useState(false);
  const [showSpd, setShowSpd] = useState(true);

  const unitById: Record<
    TurnUnitId,
    { id: TurnUnitId; label: string; spd: number; color: string; hasted: boolean }
  > = {
    rogue: {
      id: 'rogue',
      label: t('demos.pixelart.turn.unitRogue'),
      spd: 18,
      color: '#22c55e',
      hasted: false,
    },
    hero: {
      id: 'hero',
      label: t('demos.pixelart.turn.unitHero'),
      spd: 16,
      color: '#38bdf8',
      hasted: false,
    },
    mage: {
      id: 'mage',
      label: t('demos.pixelart.turn.unitMage'),
      spd: mageHaste ? 22 : 14,
      color: '#a855f7',
      hasted: mageHaste,
    },
    boss: {
      id: 'boss',
      label: t('demos.pixelart.turn.unitBoss'),
      spd: 11,
      color: '#ef4444',
      hasted: false,
    },
  };

  const ordered = queue.map((unitId) => unitById[unitId]);

  const handleNextTurn = () => {
    setQueue((prev) => {
      const [current, ...waiting] = prev;
      return current ? [...waiting, current] : TURN_ROSTER_IDS;
    });
  };

  const handleToggleHaste = () => {
    const nextHaste = !mageHaste;
    setMageHaste(nextHaste);
    setQueue((prev) => {
      const [current, ...waiting] = prev;
      if (!current) return TURN_ROSTER_IDS;
      const reprioritizedWaiting = [...waiting].sort(
        (a, b) => getTurnUnitSpd(b, nextHaste) - getTurnUnitSpd(a, nextHaste)
      );
      return [current, ...reprioritizedWaiting];
    });
  };

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demos.pixelart.art.turnOrderTimeline')}
      >
        <rect width="264" height="144" fill="#0b1120" />

        {/* Horizontal Timeline Rail */}
        <rect x="18" y="72" width="228" height="6" fill="#334155" />
        <polygon points="246,68 256,75 246,82" fill="#facc15" />

        {ordered.map((unit, slotIdx) => {
          const isCurrent = slotIdx === 0;
          const cardX = 22 + slotIdx * 56;
          const cardY = isCurrent ? 26 : 36;
          const cardH = isCurrent ? 84 : 68;

          return (
            <g key={unit.id} data-turn-slot={slotIdx} data-unit-id={unit.id}>
              <rect
                x={cardX}
                y={cardY}
                width="48"
                height={cardH}
                fill="#1e293b"
                stroke={isCurrent ? '#facc15' : unit.hasted ? '#22d3ee' : '#475569'}
                strokeWidth={isCurrent ? 2 : 1}
              />
              {/* Order index badge */}
              <rect
                x={cardX + 4}
                y={cardY + 4}
                width="16"
                height="12"
                fill={isCurrent ? '#facc15' : '#090d16'}
              />
              <text
                x={cardX + 12}
                y={cardY + 13}
                fill={isCurrent ? '#090d16' : '#94a3b8'}
                fontSize="8"
                fontFamily="monospace"
                textAnchor="middle"
              >
                {`#${slotIdx + 1}`}
              </text>

              {/* Haste Wing Indicator */}
              {unit.hasted && (
                <rect x={cardX + 28} y={cardY + 5} width="14" height="8" fill="#22d3ee" />
              )}

              {/* Unit Pixel Avatar */}
              <rect x={cardX + 12} y={cardY + 22} width="24" height="22" fill={unit.color} />
              <rect x={cardX + 16} y={cardY + 26} width="6" height="4" fill="#fef08a" />
              <rect x={cardX + 26} y={cardY + 26} width="6" height="4" fill="#fef08a" />

              {/* Unit Name */}
              <text
                x={cardX + 24}
                y={cardY + (isCurrent ? 56 : 52)}
                fill="#f8fafc"
                fontSize="7"
                fontFamily="monospace"
                textAnchor="middle"
              >
                {unit.label}
              </text>

              {/* SPD Value Badge */}
              {showSpd && (
                <text
                  x={cardX + 24}
                  y={cardY + (isCurrent ? cardH - 6 : 64)}
                  fill={unit.hasted ? '#22d3ee' : '#fde047'}
                  fontSize="8"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  {`${unit.spd}`}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            className="px-btn"
            onClick={handleNextTurn}
          >
            {t('demos.pixelart.turn.next')}
          </button>
          <button
            type="button"
            className={`px-btn ${mageHaste ? 'px-btn-active' : ''}`}
            aria-pressed={mageHaste}
            onClick={handleToggleHaste}
          >
            {mageHaste ? t('demos.pixelart.turn.hasteOn') : t('demos.pixelart.turn.hasteOff')}
          </button>
        </div>
        <div className="px-btn-row">
          <button
            type="button"
            className="px-btn"
            onClick={() => {
              setQueue(TURN_ROSTER_IDS);
              setMageHaste(false);
            }}
          >
            {t('demos.pixelart.turn.reset')}
          </button>
          <button
            type="button"
            className={`px-btn ${showSpd ? 'px-btn-active' : ''}`}
            aria-pressed={showSpd}
            onClick={() => setShowSpd((s) => !s)}
          >
            {showSpd ? t('demos.pixelart.turn.spdOn') : t('demos.pixelart.turn.spdOff')}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 4. px-branching-dialogue-choices — Branching Dialogue Choices & Affinity
// ============================================================================
const CHOICE_DELTAS = ['+15', '-5', '+25'] as const;
const CHOICE_COLORS = ['#f97316', '#a855f7', '#22c55e'] as const;

export function BranchingDialogueChoicesDemo() {
  const { t } = useLocale();
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [choice, setChoice] = useState<0 | 1 | 2>(0);
  const [confirmed, setConfirmed] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  const choiceLabels = [
    t('demos.pixelart.dialog.choice0'),
    t('demos.pixelart.dialog.choice1'),
    t('demos.pixelart.dialog.choice2'),
  ];
  const responseLines = [
    t('demos.pixelart.dialog.line0'),
    t('demos.pixelart.dialog.line1'),
    t('demos.pixelart.dialog.line2'),
  ];
  const routeTags = [
    t('demos.pixelart.dialog.tag0'),
    t('demos.pixelart.dialog.tag1'),
    t('demos.pixelart.dialog.tag2'),
  ];

  const accent = CHOICE_COLORS[choice];

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demos.pixelart.art.branchingDialogueChoices')}
      >
        <rect width="264" height="144" fill="#090d16" />

        {/* Top NPC Portrait & Instant Response Box */}
        <rect x="14" y="10" width="56" height="58" fill="#1e293b" stroke={accent} strokeWidth="2" />
        {/* NPC Warden Kael Pixel Portrait with expression changing per choice */}
        <rect x="26" y="20" width="32" height="32" fill="#475569" />
        <rect x="30" y="26" width="24" height="22" fill="#fcd34d" />
        {/* Eyes & Eyebrows per choice */}
        <rect x="34" y={choice === 1 ? 33 : 31} width="5" height="4" fill="#0f172a" />
        <rect x="45" y={choice === 1 ? 33 : 31} width="5" height="4" fill="#0f172a" />
        {/* Mouth expression */}
        <rect
          x="37"
          y="41"
          width="10"
          height={choice === 0 ? 4 : 2}
          fill={choice === 1 ? '#ef4444' : '#0f172a'}
        />
        {/* Affinity Delta Badge */}
        <rect x="20" y="52" width="44" height="12" fill="#090d16" />
        <text x="42" y="61" fill={accent} fontSize="8" fontFamily="monospace" textAnchor="middle">
          {CHOICE_DELTAS[choice]}
        </text>

        {/* NPC Dialogue Panel (No typewriter delay — full immediate text) */}
        <rect x="76" y="10" width="174" height="58" fill="#111827" stroke="#334155" strokeWidth="1" />
        <text x="84" y="23" fill="#fde047" fontSize="8" fontFamily="monospace">
          {t('demos.pixelart.dialog.npcName')}
        </text>
        <text x="84" y="38" fill="#e2e8f0" fontSize="7" fontFamily="monospace">
          {responseLines[choice]}
        </text>
        {showPreview && (
          <g>
            <rect x="84" y="46" width="156" height="16" fill="#1e293b" stroke={accent} strokeWidth="1" />
            <text x="90" y="57" fill={accent} fontSize="7" fontFamily="monospace">
              {routeTags[choice]}
            </text>
          </g>
        )}

        {/* 3 Interactive Choice Branch Bars */}
        {([0, 1, 2] as const).map((idx) => {
          const isSelected = idx === choice;
          const ry = 74 + idx * 20;
          return (
            <g key={idx}>
              <rect
                x="14"
                y={ry}
                width="236"
                height="17"
                fill={isSelected ? (confirmed ? '#064e3b' : '#1e293b') : '#0f172a'}
                stroke={isSelected ? accent : '#334155'}
                strokeWidth={isSelected ? 1.5 : 1}
              />
              {isSelected && (
                <polygon
                  points={`20,${ry + 5} 26,${ry + 8.5} 20,${ry + 12}`}
                  fill="#fde047"
                />
              )}
              <text
                x="32"
                y={ry + 11}
                fill={isSelected ? '#fef08a' : '#94a3b8'}
                fontSize="7.5"
                fontFamily="monospace"
              >
                {choiceLabels[idx]}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            className={`px-btn ${choice === 0 ? 'px-btn-active' : ''}`}
            aria-pressed={choice === 0}
            onClick={() => {
              setChoice(0);
              setConfirmed(false);
            }}
          >
            {t('demos.pixelart.dialog.choice0')}
          </button>
          <button
            type="button"
            className={`px-btn ${choice === 1 ? 'px-btn-active' : ''}`}
            aria-pressed={choice === 1}
            onClick={() => {
              setChoice(1);
              setConfirmed(false);
            }}
          >
            {t('demos.pixelart.dialog.choice1')}
          </button>
          <button
            type="button"
            className={`px-btn ${choice === 2 ? 'px-btn-active' : ''}`}
            aria-pressed={choice === 2}
            onClick={() => {
              setChoice(2);
              setConfirmed(false);
            }}
          >
            {t('demos.pixelart.dialog.choice2')}
          </button>
        </div>
        <div className="px-btn-row">
          <button
            type="button"
            className={`px-btn ${confirmed ? 'px-btn-active' : ''}`}
            aria-pressed={confirmed}
            onClick={() => setConfirmed((c) => !c)}
          >
            {confirmed ? t('demos.pixelart.dialog.reselect') : t('demos.pixelart.dialog.confirm')}
          </button>
          <button
            type="button"
            className={`px-btn ${showPreview ? 'px-btn-active' : ''}`}
            aria-pressed={showPreview}
            onClick={() => setShowPreview((p) => !p)}
          >
            {showPreview ? t('demos.pixelart.dialog.previewOn') : t('demos.pixelart.dialog.previewOff')}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 5. px-equipment-stat-comparison — Equipment Stat Comparison & Delta Bars
// ============================================================================
const BASE_WEAPON = { atk: 32, spd: 28, crit: 15 } as const;
const CANDIDATE_WEAPONS = [
  { atk: 46, spd: 22, crit: 30, color: '#facc15' }, // 0: Sunblade
  { atk: 26, spd: 44, crit: 45, color: '#a855f7' }, // 1: Shadow Dagger
  { atk: 58, spd: 12, crit: 20, color: '#ef4444' }, // 2: Titan Greatsword
] as const;

export function EquipmentStatComparisonDemo() {
  const { t } = useLocale();
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [candidate, setCandidate] = useState<0 | 1 | 2>(0);
  const [equippedIdx, setEquippedIdx] = useState<-1 | 0 | 1 | 2>(-1);

  const weaponNames = [
    t('demos.pixelart.equip.sunblade'),
    t('demos.pixelart.equip.dagger'),
    t('demos.pixelart.equip.greatsword'),
  ];

  const currentStats = equippedIdx === -1 ? BASE_WEAPON : CANDIDATE_WEAPONS[equippedIdx];
  const targetStats = CANDIDATE_WEAPONS[candidate];

  const rows = [
    { cur: currentStats.atk, next: targetStats.atk, iconColor: '#f97316' },
    { cur: currentStats.spd, next: targetStats.spd, iconColor: '#38bdf8' },
    { cur: currentStats.crit, next: targetStats.crit, iconColor: '#fde047' },
  ];

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demos.pixelart.art.equipmentStatComparison')}
      >
        <rect width="264" height="144" fill="#0b1120" />

        {/* Left Candidate Weapon Card */}
        <rect
          x="14"
          y="14"
          width="78"
          height="116"
          fill="#111827"
          stroke={targetStats.color}
          strokeWidth="2"
        />
        <rect x="24" y="24" width="58" height="54" fill="#1e293b" />
        {/* Distinct Pixel Weapon Sprite */}
        {candidate === 0 && (
          <g>
            <rect x="50" y="30" width="6" height="32" fill="#fef08a" />
            <rect x="44" y="58" width="18" height="4" fill="#f59e0b" />
            <rect x="51" y="62" width="4" height="10" fill="#78350f" />
          </g>
        )}
        {candidate === 1 && (
          <g>
            <rect x="48" y="36" width="8" height="22" fill="#c084fc" />
            <rect x="44" y="56" width="16" height="4" fill="#38bdf8" />
            <rect x="50" y="60" width="4" height="8" fill="#475569" />
          </g>
        )}
        {candidate === 2 && (
          <g>
            <rect x="46" y="26" width="14" height="36" fill="#ef4444" />
            <rect x="40" y="60" width="26" height="5" fill="#94a3b8" />
            <rect x="50" y="65" width="6" height="10" fill="#451a03" />
          </g>
        )}

        <text x="53" y="94" fill="#f8fafc" fontSize="7.5" fontFamily="monospace" textAnchor="middle">
          {weaponNames[candidate]}
        </text>
        <rect x="24" y="104" width="58" height="16" fill="#090d16" />
        <text
          x="53"
          y="115"
          fill={equippedIdx === candidate ? '#4ade80' : '#38bdf8'}
          fontSize="7.5"
          fontFamily="monospace"
          textAnchor="middle"
        >
          {equippedIdx === candidate
            ? t('demos.pixelart.equip.equipped')
            : t('demos.pixelart.equip.compare')}
        </text>

        {/* Right Stat Comparison Panel */}
        <rect x="98" y="14" width="152" height="116" fill="#111827" stroke="#334155" strokeWidth="2" />
        {rows.map((r, idx) => {
          const delta = r.next - r.cur;
          const ry = 26 + idx * 34;
          const deltaColor = delta > 0 ? '#4ade80' : delta < 0 ? '#f43f5e' : '#94a3b8';
          const deltaText = delta > 0 ? `+${delta}` : `${delta}`;

          return (
            <g key={idx}>
              {/* Stat Icon */}
              <rect x="108" y={ry} width="10" height="10" fill={r.iconColor} />
              {/* Value & Signed Delta */}
              <text x="124" y={ry + 9} fill="#e2e8f0" fontSize="8" fontFamily="monospace">
                {`${r.cur} -> ${r.next}`}
              </text>
              <text
                x="240"
                y={ry + 9}
                fill={deltaColor}
                fontSize="8.5"
                fontFamily="monospace"
                textAnchor="end"
              >
                {deltaText}
              </text>

              {/* Segmented Stat Bar */}
              <rect x="108" y={ry + 14} width="132" height="8" fill="#090d16" />
              <rect
                x="108"
                y={ry + 14}
                width={Math.min(132, r.cur * 2)}
                height="8"
                fill="#475569"
              />
              {delta > 0 && (
                <rect
                  x={108 + r.cur * 2}
                  y={ry + 14}
                  width={Math.min(132 - r.cur * 2, delta * 2)}
                  height="8"
                  fill="#22c55e"
                />
              )}
              {delta < 0 && (
                <rect
                  x={108 + r.next * 2}
                  y={ry + 14}
                  width={Math.abs(delta) * 2}
                  height="8"
                  fill="#f43f5e"
                />
              )}
            </g>
          );
        })}
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            className={`px-btn ${candidate === 0 ? 'px-btn-active' : ''}`}
            aria-pressed={candidate === 0}
            onClick={() => setCandidate(0)}
          >
            {t('demos.pixelart.equip.sunblade')}
          </button>
          <button
            type="button"
            className={`px-btn ${candidate === 1 ? 'px-btn-active' : ''}`}
            aria-pressed={candidate === 1}
            onClick={() => setCandidate(1)}
          >
            {t('demos.pixelart.equip.dagger')}
          </button>
          <button
            type="button"
            className={`px-btn ${candidate === 2 ? 'px-btn-active' : ''}`}
            aria-pressed={candidate === 2}
            onClick={() => setCandidate(2)}
          >
            {t('demos.pixelart.equip.greatsword')}
          </button>
        </div>
        <div className="px-btn-row">
          <button
            type="button"
            className={`px-btn ${equippedIdx === candidate ? 'px-btn-active' : ''}`}
            onClick={() => setEquippedIdx(candidate)}
          >
            {t('demos.pixelart.equip.apply')}
          </button>
          <button
            type="button"
            className="px-btn"
            onClick={() => setEquippedIdx(-1)}
          >
            {t('demos.pixelart.equip.restore')}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 6. px-collectible-badge-grid — Collectible Badge Unlock Grid (3x2)
// ============================================================================
const BADGE_COLORS = ['#f97316', '#38bdf8', '#4ade80', '#eab308', '#a855f7', '#f43f5e'] as const;
const BADGE_GLYPH_IDS = ['flame', 'trident', 'wing', 'shield', 'star', 'crown'] as const;

function renderBadgeGlyph(idx: number, x: number, y: number, color: string) {
  if (idx === 0) {
    // 0: Flame Herald
    return (
      <g data-badge-glyph={BADGE_GLYPH_IDS[0]}>
        <path
          d={`M${x + 16} ${y + 6}h4v4h4v6h2v10h-4v4h-12v-4h-4v-10h2v-6h4v-4Z`}
          fill={color}
        />
        <rect x={x + 14} y={y + 16} width="8" height="10" fill="#fef08a" />
      </g>
    );
  }
  if (idx === 1) {
    // 1: Abyss Trident
    return (
      <g data-badge-glyph={BADGE_GLYPH_IDS[1]}>
        <path
          d={`M${x + 8} ${y + 8}h4v10h4v-12h4v12h4v-10h4v14h-6v8h-8v-8h-6v-14Z`}
          fill={color}
        />
        <rect x={x + 16} y={y + 10} width="4" height="6" fill="#e0f2fe" />
      </g>
    );
  }
  if (idx === 2) {
    // 2: Skycrest Wing
    return (
      <g data-badge-glyph={BADGE_GLYPH_IDS[2]}>
        <path
          d={`M${x + 22} ${y + 6}h6v6h-4v6h-4v6h-4v6h-8v-6h4v-6h4v-6h6v-6Z`}
          fill={color}
        />
        <rect x={x + 16} y={y + 12} width="6" height="4" fill="#fef08a" />
      </g>
    );
  }
  if (idx === 3) {
    // 3: Iron Bastion Shield
    return (
      <g data-badge-glyph={BADGE_GLYPH_IDS[3]}>
        <path
          d={`M${x + 8} ${y + 7}h20v12h-3v6h-4v5h-6v-5h-4v-6h-3v-12Z`}
          fill={color}
        />
        <rect x={x + 16} y={y + 10} width="4" height="14" fill="#fef08a" />
        <rect x={x + 11} y={y + 14} width="14" height="4" fill="#fef08a" />
      </g>
    );
  }
  if (idx === 4) {
    // 4: Astral Star
    return (
      <g data-badge-glyph={BADGE_GLYPH_IDS[4]}>
        <path
          d={`M${x + 16} ${y + 6}h4v6h6v4h6v4h-6v4h-6v6h-4v-6h-6v-4h-6v-4h6v-4h6v-6Z`}
          fill={color}
        />
        <rect x={x + 15} y={y + 15} width="6" height="6" fill="#fef08a" />
      </g>
    );
  }
  // 5: Void Crown
  return (
    <g data-badge-glyph={BADGE_GLYPH_IDS[5]}>
      <path
        d={`M${x + 8} ${y + 10}h4v6h4v-8h4v8h4v-6h4v18h-20v-18Z`}
        fill={color}
      />
      <rect x={x + 10} y={y + 20} width="16" height="4" fill="#fef08a" />
    </g>
  );
}

function renderPadlockSilhouette(x: number, y: number) {
  return (
    <g data-badge-lock="padlock">
      <path d={`M${x + 12} ${y + 8}h12v8h-3v-5h-6v5h-3v-8Z`} fill="#64748b" />
      <rect x={x + 9} y={y + 16} width="18" height="13" fill="#475569" />
      <rect x={x + 9} y={y + 16} width="18" height="2" fill="#94a3b8" />
      <rect x={x + 16} y={y + 20} width="4" height="3" fill="#090d16" />
      <rect x={x + 17} y={y + 23} width="2" height="4" fill="#090d16" />
    </g>
  );
}

export function CollectibleBadgeGridDemo() {
  const { t } = useLocale();
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(0);
  const [unlocked, setUnlocked] = useState<ReadonlyArray<boolean>>([
    true,
    true,
    true,
    true,
    false,
    false,
  ]);

  const badgeNames = [
    t('demos.pixelart.badge.name0'),
    t('demos.pixelart.badge.name1'),
    t('demos.pixelart.badge.name2'),
    t('demos.pixelart.badge.name3'),
    t('demos.pixelart.badge.name4'),
    t('demos.pixelart.badge.name5'),
  ];

  const unlockedCount = unlocked.filter(Boolean).length;
  const isSelectedUnlocked = Boolean(unlocked[selected]);

  const toggleSelected = () => {
    setUnlocked((prev) => prev.map((v, idx) => (idx === selected ? !v : v)));
  };

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demos.pixelart.art.collectibleBadgeGrid')}
      >
        <rect width="264" height="144" fill="#090d16" />

        {/* 3x2 Collectible Badge Grid on Left */}
        {[0, 1, 2, 3, 4, 5].map((idx) => {
          const col = idx % 3;
          const row = Math.floor(idx / 3);
          const bx = 18 + col * 42;
          const by = 14 + row * 42;
          const isSel = idx === selected;
          const isOpen = Boolean(unlocked[idx]);
          const color = BADGE_COLORS[idx] ?? '#facc15';

          return (
            <g key={idx} data-badge-slot={idx} data-badge-unlocked={isOpen}>
              <rect
                x={bx}
                y={by}
                width="36"
                height="36"
                fill={isOpen ? '#1e293b' : '#0f172a'}
                stroke={isSel ? '#fef08a' : isOpen ? color : '#334155'}
                strokeWidth={isSel ? 2 : 1}
              />
              {isOpen ? renderBadgeGlyph(idx, bx, by, color) : renderPadlockSilhouette(bx, by)}
            </g>
          );
        })}

        {/* Right Zoomed Badge Inspector & Collection Rate */}
        <rect x="150" y="14" width="96" height="78" fill="#111827" stroke="#334155" strokeWidth="1" />
        <rect
          x="180"
          y="22"
          width="36"
          height="36"
          fill="#090d16"
          stroke={isSelectedUnlocked ? BADGE_COLORS[selected] : '#475569'}
          strokeWidth="2"
        />
        {isSelectedUnlocked
          ? renderBadgeGlyph(selected, 180, 22, BADGE_COLORS[selected] ?? '#facc15')
          : renderPadlockSilhouette(180, 22)}
        <text x="198" y="72" fill="#fde047" fontSize="8.5" fontFamily="monospace" textAnchor="middle">
          {`${unlockedCount}/6`}
        </text>
        <rect x="162" y="78" width="72" height="6" fill="#090d16" />
        <rect x="162" y="78" width={unlockedCount * 12} height="6" fill="#22c55e" />

        {/* Bottom Lore / Lock Status Banner */}
        <rect x="18" y="98" width="228" height="32" fill="#111827" stroke="#334155" strokeWidth="1" />
        <text
          x="132"
          y="118"
          fill={isSelectedUnlocked ? '#fef08a' : '#94a3b8'}
          fontSize="8"
          fontFamily="monospace"
          textAnchor="middle"
        >
          {isSelectedUnlocked ? badgeNames[selected] : t('demos.pixelart.badge.locked')}
        </text>
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            className="px-btn"
            onClick={() => setSelected((s) => (s + 1) % 6)}
          >
            {t('demos.pixelart.badge.next', { index: selected + 1 })}
          </button>
          <button
            type="button"
            className={`px-btn ${isSelectedUnlocked ? 'px-btn-active' : ''}`}
            aria-pressed={isSelectedUnlocked}
            onClick={toggleSelected}
          >
            {t('demos.pixelart.badge.toggle')}
          </button>
        </div>
        <div className="px-btn-row">
          <button
            type="button"
            className="px-btn"
            onClick={() => setUnlocked([true, true, true, true, true, true])}
          >
            {t('demos.pixelart.badge.unlockAll')}
          </button>
          <button
            type="button"
            className="px-btn"
            onClick={() => setUnlocked([true, true, true, true, false, false])}
          >
            {t('demos.pixelart.badge.reset')}
          </button>
        </div>
      </div>
    </div>
  );
}

export const PIXEL_GAME_UI_EXPANSION_DEMOS = {
  'px-quest-tracker-states': QuestTrackerStatesDemo,
  'px-radial-spell-hotbar-cooldown': RadialSpellHotbarCooldownDemo,
  'px-turn-order-timeline': TurnOrderTimelineDemo,
  'px-branching-dialogue-choices': BranchingDialogueChoicesDemo,
  'px-equipment-stat-comparison': EquipmentStatComparisonDemo,
  'px-collectible-badge-grid': CollectibleBadgeGridDemo,
} as const;
