import { useDemoPulse } from '../../../hooks/useDemoAutoplay';
import { useLocale } from '../../../i18n/LocaleContext';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

const FACE_ROTATIONS: Record<number, { x: number; y: number }> = {
  1: { x: 90, y: 0 },
  2: { x: 180, y: 0 },
  3: { x: 90, y: -90 },
  4: { x: 90, y: 90 },
  5: { x: 0, y: 0 },
  6: { x: 90, y: 180 },
};

type TileNameKey =
  | 'demo.marble.tile.start'
  | 'demo.marble.tile.seoul'
  | 'demo.marble.tile.tokyo'
  | 'demo.marble.tile.chance'
  | 'demo.marble.tile.paris'
  | 'demo.marble.tile.island'
  | 'demo.marble.tile.newyork'
  | 'demo.marble.tile.tax'
  | 'demo.marble.tile.london'
  | 'demo.marble.tile.tour';

interface TileConfig {
  id: string;
  nameKey: TileNameKey;
  type: 'start' | 'city' | 'chance' | 'island' | 'tax' | 'tour';
  color?: string;
}

const TILES: TileConfig[] = [
  { id: 'start', nameKey: 'demo.marble.tile.start', type: 'start' },
  { id: 'seoul', nameKey: 'demo.marble.tile.seoul', type: 'city', color: '#3b82f6' },
  { id: 'tokyo', nameKey: 'demo.marble.tile.tokyo', type: 'city', color: '#f59e0b' },
  { id: 'chance', nameKey: 'demo.marble.tile.chance', type: 'chance' },
  { id: 'paris', nameKey: 'demo.marble.tile.paris', type: 'city', color: '#8b5cf6' },
  { id: 'island', nameKey: 'demo.marble.tile.island', type: 'island' },
  { id: 'newyork', nameKey: 'demo.marble.tile.newyork', type: 'city', color: '#10b981' },
  { id: 'tax', nameKey: 'demo.marble.tile.tax', type: 'tax' },
  { id: 'london', nameKey: 'demo.marble.tile.london', type: 'city', color: '#ec4899' },
  { id: 'tour', nameKey: 'demo.marble.tile.tour', type: 'tour' },
];

function MiniDice({ value, isRolling, spin }: { value: number; isRolling: boolean; spin: number }) {
  const targetRotation = FACE_ROTATIONS[value] || FACE_ROTATIONS[1];
  const rotX = targetRotation.x + spin * 720;
  const rotY = targetRotation.y + spin * 1080;

  return (
    <span className={`mb-dice-stage ${isRolling ? 'mb-dice-stage-rolling' : ''}`}>
      <span className="mb-dice-shadow" aria-hidden="true" />
      <span
        className="mb-dice-cube"
        style={{ transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)` }}
      >
        {/* Face 1 */}
        <span className="mb-dice-face mb-face-1" aria-hidden="true">
          <span className="mb-dice-pip mb-dice-pip-red mb-pip-2-2" />
        </span>
        {/* Face 2 */}
        <span className="mb-dice-face mb-face-2" aria-hidden="true">
          <span className="mb-dice-pip mb-pip-1-1" />
          <span className="mb-dice-pip mb-pip-3-3" />
        </span>
        {/* Face 3 */}
        <span className="mb-dice-face mb-face-3" aria-hidden="true">
          <span className="mb-dice-pip mb-pip-1-1" />
          <span className="mb-dice-pip mb-pip-2-2" />
          <span className="mb-dice-pip mb-pip-3-3" />
        </span>
        {/* Face 4 */}
        <span className="mb-dice-face mb-face-4" aria-hidden="true">
          <span className="mb-dice-pip mb-pip-1-1" />
          <span className="mb-dice-pip mb-pip-1-3" />
          <span className="mb-dice-pip mb-pip-3-1" />
          <span className="mb-dice-pip mb-pip-3-3" />
        </span>
        {/* Face 5 */}
        <span className="mb-dice-face mb-face-5" aria-hidden="true">
          <span className="mb-dice-pip mb-pip-1-1" />
          <span className="mb-dice-pip mb-pip-1-3" />
          <span className="mb-dice-pip mb-pip-2-2" />
          <span className="mb-dice-pip mb-pip-3-1" />
          <span className="mb-dice-pip mb-pip-3-3" />
        </span>
        {/* Face 6 */}
        <span className="mb-dice-face mb-face-6" aria-hidden="true">
          <span className="mb-dice-pip mb-pip-1-1" />
          <span className="mb-dice-pip mb-pip-1-3" />
          <span className="mb-dice-pip mb-pip-2-1" />
          <span className="mb-dice-pip mb-pip-2-3" />
          <span className="mb-dice-pip mb-pip-3-1" />
          <span className="mb-dice-pip mb-pip-3-3" />
        </span>
      </span>
    </span>
  );
}

export function MarbleBoardDemo() {
  const { t } = useLocale();
  const id = useId();

  const [gaugePower, setGaugePower] = useState(50);
  const [dice1, setDice1] = useState(3);
  const [dice2, setDice2] = useState(3);
  const [spin, setSpin] = useState(0);

  const [pawnPos, setPawnPos] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  const [isDouble, setIsDouble] = useState(false);
  const [showStamp, setShowStamp] = useState(false);
  const [showChance, setShowChance] = useState(false);
  const [showCoins, setShowCoins] = useState(false);
  const [cityLevels, setCityLevels] = useState<Record<number, number>>({});

  const [statusMessage, setStatusMessage] = useState('');

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  useEffect(() => clearAllTimers, [clearAllTimers]);

  // Handle dice roll triggered by gauge timing click
  const handleRoll = useCallback(() => {
    if (isRolling || isMoving) return;

    // Calculate timing power from oscillating phase
    const phase = (Date.now() % 1400) / 1400;
    const power = Math.round(20 + 75 * Math.abs(Math.sin(phase * Math.PI)));
    setGaugePower(power);

    setIsRolling(true);
    setIsDouble(false);
    setShowStamp(false);
    setShowChance(false);
    setShowCoins(false);
    setSpin(prev => prev + 1);

    // Determine target dice rolls based on gauge power
    let d1: number;
    let d2: number;

    if (power > 70) {
      // High gauge: higher dice (4~6 each)
      d1 = Math.floor(Math.random() * 3) + 4;
      d2 = Math.floor(Math.random() * 3) + 4;
    } else if (power < 35) {
      // Low gauge: lower dice (1~3 each)
      d1 = Math.floor(Math.random() * 3) + 1;
      d2 = Math.floor(Math.random() * 3) + 1;
    } else {
      // Mid gauge: balanced with boosted double chance
      if (Math.random() > 0.45) {
        const val = Math.floor(Math.random() * 6) + 1;
        d1 = val;
        d2 = val;
      } else {
        d1 = Math.floor(Math.random() * 6) + 1;
        d2 = Math.floor(Math.random() * 6) + 1;
      }
    }

    setDice1(d1);
    setDice2(d2);

    const total = d1 + d2;
    const doubleAchieved = d1 === d2;

    // Phase 1: Dice rolling tumble (750ms)
    const t1 = setTimeout(() => {
      setIsRolling(false);
      if (doubleAchieved) {
        setIsDouble(true);
      }
      setStatusMessage(t('demo.marble.total', { val1: d1, val2: d2, total }));

      // Phase 2: Pawn hops step by step along board tiles
      setIsMoving(true);
      let stepCount = 0;

      const hopInterval = setInterval(() => {
        stepCount += 1;
        setPawnPos(prev => (prev + 1) % TILES.length);

        if (stepCount >= total) {
          clearInterval(hopInterval);
          setIsMoving(false);

          const finalPos = (pawnPos + total) % TILES.length;
          const landedTile = TILES[finalPos];

          // Phase 3: Trigger tile-specific game FX
          if (landedTile.type === 'city') {
            setShowStamp(true);
            setCityLevels(prev => ({
              ...prev,
              [finalPos]: ((prev[finalPos] || 0) % 3) + 1,
            }));
            const isLandmark = (cityLevels[finalPos] || 0) >= 2;
            setStatusMessage(t(isLandmark ? 'demo.marble.landmark' : 'demo.marble.acquired'));
          } else if (landedTile.type === 'chance') {
            setShowChance(true);
            setStatusMessage(t('demo.marble.chanceEffect'));
          } else if (landedTile.type === 'tax') {
            setShowCoins(true);
            setStatusMessage(t('demo.marble.toll'));
          } else if (landedTile.type === 'start') {
            setStatusMessage(t('demo.marble.start'));
          }
        }
      }, 160);

      timersRef.current.push(hopInterval as unknown as ReturnType<typeof setTimeout>);
    }, 750);

    timersRef.current.push(t1);
  }, [isRolling, isMoving, pawnPos, cityLevels, t]);

  useDemoPulse(handleRoll);

  return (
    <button
      id={id}
      type="button"
      className="mb-board-container"
      role="region"
      aria-label={t('demo.marble.scene')}
      data-demo-control
      onClick={handleRoll}
      disabled={isRolling || isMoving}
    >
      {/* 4x3 Perimeter Track Grid */}
      <div className="mb-grid-track">
        {TILES.map((tile, idx) => {
          const isPawnHere = pawnPos === idx;
          const level = cityLevels[idx] || 0;

          return (
            <div
              key={tile.id}
              className={`mb-tile mb-tile-${idx} mb-tile-${tile.type} ${isPawnHere ? 'mb-tile-current' : ''}`}
            >
              {/* Tile header bar / color strip */}
              {tile.color && (
                <span className="mb-tile-color-bar" style={{ backgroundColor: tile.color }} />
              )}

              {/* Landmark 3D rise icon */}
              {level > 0 && (
                <span className="mb-tile-building" aria-hidden="true">
                  {level === 3 ? '🏰' : level === 2 ? '🏢' : '🏠'}
                </span>
              )}

              {/* Tile Name */}
              <span className="mb-tile-name">{t(tile.nameKey)}</span>

              {/* Active Pawn with Hop Animation */}
              {isPawnHere && (
                <span className={`mb-pawn ${isMoving ? 'mb-pawn-hop' : ''}`} aria-hidden="true">
                  <span className="mb-pawn-head">👑</span>
                  <span className="mb-pawn-shadow" />
                </span>
              )}
            </div>
          );
        })}

        {/* Center Arena */}
        <div className="mb-center-arena">
          {/* 1. Oscillating Power Gauge */}
          <div className="mb-gauge-wrapper">
            <span className="mb-gauge-track">
              <span
                className="mb-gauge-bar"
                style={{ width: `${isRolling ? gaugePower : 65}%` }}
              />
              <span
                className="mb-gauge-pin"
                style={{ left: `${isRolling ? gaugePower : 65}%` }}
              />
            </span>
            <span className="mb-gauge-label">
              {isRolling
                ? t('demo.marble.gauge', { power: gaugePower })
                : isMoving
                ? t('demo.marble.rolling')
                : t('demo.marble.roll')}
            </span>
          </div>

          {/* 2. Dual 3D Isometric Top-Down Dice Stage */}
          <div className="mb-dual-dice-stage">
            <MiniDice value={dice1} isRolling={isRolling} spin={spin} />
            <MiniDice value={dice2} isRolling={isRolling} spin={spin} />
          </div>

          {/* 3. Event / Status Message Chip */}
          <div className="mb-status-chip">
            <span className="mb-status-text" aria-live="polite">
              {statusMessage || t('demo.marble.roll')}
            </span>
          </div>

          {/* 4. DOUBLE! Banner Overlay */}
          {isDouble && (
            <div className="mb-double-banner" aria-hidden="true">
              <span className="mb-double-text">{t('demo.marble.doubleBanner')}</span>
            </div>
          )}

          {/* 5. ACQUIRED! Rubber Stamp Overlay */}
          {showStamp && (
            <div className="mb-stamp-overlay" aria-hidden="true">
              <span className="mb-stamp-seal">{t('demo.marble.acquired')}</span>
            </div>
          )}

          {/* 6. Golden Chance Card 3D Flip Modal */}
          {showChance && (
            <div className="mb-chance-modal" aria-hidden="true">
              <div className="mb-chance-card">
                <span className="mb-chance-icon">🃏</span>
                <span className="mb-chance-title">{t('demo.marble.chance')}</span>
                <span className="mb-chance-body">{t('demo.marble.chanceEffect')}</span>
              </div>
            </div>
          )}

          {/* 7. Coin Fountain Particle FX */}
          {showCoins && (
            <div className="mb-coin-fountain" aria-hidden="true">
              <span className="mb-coin mb-coin-1">🪙</span>
              <span className="mb-coin mb-coin-2">🪙</span>
              <span className="mb-coin mb-coin-3">🪙</span>
              <span className="mb-coin mb-coin-4">🪙</span>
              <span className="mb-coin mb-coin-5">🪙</span>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
