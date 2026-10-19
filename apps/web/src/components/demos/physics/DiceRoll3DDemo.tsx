import { useDemoPulse } from '../../../hooks/useDemoAutoplay';
import { useLocale } from '../../../i18n/LocaleContext';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Dices } from 'lucide-react';

const FACE_ROTATIONS: Record<number, { x: number; y: number }> = {
  1: { x: 0, y: 0 },
  2: { x: -90, y: 0 },
  3: { x: 0, y: -90 },
  4: { x: 0, y: 90 },
  5: { x: 90, y: 0 },
  6: { x: 0, y: 180 },
};

export function DiceRoll3DDemo() {
  const { t } = useLocale();
  const id = useId();
  const [value, setValue] = useState(6);
  const [isRolling, setIsRolling] = useState(false);
  const [hasLanded, setHasLanded] = useState(false);
  const [spin, setSpin] = useState(0);
  const rollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const popTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleRoll = useCallback(() => {
    if (isRolling) return;
    setIsRolling(true);
    setHasLanded(false);
    setSpin(prev => prev + 1);

    setValue(prev => {
      let next = Math.floor(Math.random() * 6) + 1;
      if (next === prev) next = (prev % 6) + 1;
      return next;
    });

    if (rollTimerRef.current) clearTimeout(rollTimerRef.current);
    if (popTimerRef.current) clearTimeout(popTimerRef.current);

    rollTimerRef.current = setTimeout(() => {
      setIsRolling(false);
      setHasLanded(true);
      popTimerRef.current = setTimeout(() => setHasLanded(false), 300);
    }, 850);
  }, [isRolling]);

  useDemoPulse(handleRoll);

  useEffect(() => {
    return () => {
      if (rollTimerRef.current) clearTimeout(rollTimerRef.current);
      if (popTimerRef.current) clearTimeout(popTimerRef.current);
    };
  }, []);

  const targetRotation = FACE_ROTATIONS[value] || FACE_ROTATIONS[1];
  const rotX = targetRotation.x + spin * 720;
  const rotY = targetRotation.y + spin * 1080;

  return (
    <div className="physics-demo">
      <div
        id={id}
        className="pd-scene pd-dice-scene-container"
        role="region"
        aria-label={t('demo.dice.scene')}
        data-demo-control
        onClick={handleRoll}
      >
        {/* Subtle arena felt / rolling mat */}
        <div className="pd-dice-mat" aria-hidden="true" />

        {/* Dynamic height-synchronized contact & ambient shadow */}
        <div className={`pd-dice-shadow ${isRolling ? 'pd-dice-shadow-rolling' : ''}`} aria-hidden="true" />

        {/* 3D isometric tilting stage with airborne leap animation */}
        <div className={`pd-dice-stage ${isRolling ? 'pd-dice-stage-rolling' : ''}`}>
          <div
            className="pd-dice-cube"
            style={{
              transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
            }}
          >
            {/* Face 1 (Crimson Red Pip) */}
            <div className="pd-dice-face pd-face-1" aria-hidden="true">
              <span className="pd-dice-pip pd-dice-pip-red pd-pip-2-2" />
            </div>

            {/* Face 2 */}
            <div className="pd-dice-face pd-face-2" aria-hidden="true">
              <span className="pd-dice-pip pd-pip-1-1" />
              <span className="pd-dice-pip pd-pip-3-3" />
            </div>

            {/* Face 3 */}
            <div className="pd-dice-face pd-face-3" aria-hidden="true">
              <span className="pd-dice-pip pd-pip-1-1" />
              <span className="pd-dice-pip pd-pip-2-2" />
              <span className="pd-dice-pip pd-pip-3-3" />
            </div>

            {/* Face 4 */}
            <div className="pd-dice-face pd-face-4" aria-hidden="true">
              <span className="pd-dice-pip pd-pip-1-1" />
              <span className="pd-dice-pip pd-pip-1-3" />
              <span className="pd-dice-pip pd-pip-3-1" />
              <span className="pd-dice-pip pd-pip-3-3" />
            </div>

            {/* Face 5 */}
            <div className="pd-dice-face pd-face-5" aria-hidden="true">
              <span className="pd-dice-pip pd-pip-1-1" />
              <span className="pd-dice-pip pd-pip-1-3" />
              <span className="pd-dice-pip pd-pip-2-2" />
              <span className="pd-dice-pip pd-pip-3-1" />
              <span className="pd-dice-pip pd-pip-3-3" />
            </div>

            {/* Face 6 */}
            <div className="pd-dice-face pd-face-6" aria-hidden="true">
              <span className="pd-dice-pip pd-pip-1-1" />
              <span className="pd-dice-pip pd-pip-1-3" />
              <span className="pd-dice-pip pd-pip-2-1" />
              <span className="pd-dice-pip pd-pip-2-3" />
              <span className="pd-dice-pip pd-pip-3-1" />
              <span className="pd-dice-pip pd-pip-3-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Control row with result chip and roll button */}
      <div className="pd-action-controls pd-dice-controls">
        <div className={`pd-dice-result-badge ${hasLanded ? 'pd-dice-result-pop' : ''}`}>
          <span className="pd-dice-result-text" aria-live="polite">
            🎲 {t('demo.dice.result', { value })}
          </span>
        </div>
        <button
          type="button"
          className="pd-dice-btn pd-action pd-compact-action"
          aria-label={t('demo.dice.roll')}
          aria-controls={id}
          onClick={handleRoll}
          disabled={isRolling}
        >
          <Dices size={16} className={isRolling ? 'animate-spin' : ''} aria-hidden="true" />
          {isRolling ? t('demo.dice.rolling') : t('demo.dice.roll')}
        </button>
      </div>
    </div>
  );
}
