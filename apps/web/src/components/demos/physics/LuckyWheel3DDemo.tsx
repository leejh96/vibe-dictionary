import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

const SLOTS = [
  { key: 'demo.wheel.slot.gem', color: '#ef4444', icon: '💎' },
  { key: 'demo.wheel.slot.coins', color: '#f59e0b', icon: '💰' },
  { key: 'demo.wheel.slot.jackpot', color: '#8b5cf6', icon: '🎰' },
  { key: 'demo.wheel.slot.ticket', color: '#10b981', icon: '🎫' },
  { key: 'demo.wheel.slot.chest', color: '#3b82f6', icon: '📦' },
  { key: 'demo.wheel.slot.double', color: '#ec4899', icon: '⚡' },
  { key: 'demo.wheel.slot.exp', color: '#06b6d4', icon: '⭐' },
  { key: 'demo.wheel.slot.lucky', color: '#84cc16', icon: '🎁' },
] as const;

type SlotItem = (typeof SLOTS)[number];

export function LuckyWheel3DDemo() {
  const { t } = useLocale();
  const id = useId();
  const [rotation, setRotation] = useState(270); // Initially Jackpot (slot 2) at top
  const [selectedSlot, setSelectedSlot] = useState(2);
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasLanded, setHasLanded] = useState(false);
  const isSpinningRef = useRef(false);
  const spinTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const popTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSpin = useCallback(() => {
    if (isSpinningRef.current) return;
    isSpinningRef.current = true;
    setIsSpinning(true);
    setHasLanded(false);

    // Pick a new slot
    const nextSlot = (selectedSlot + Math.floor(Math.random() * 5) + 2) % 8;

    // Calculate rotation to place nextSlot at top pointer (0 deg)
    setRotation(prev => {
      const currentNorm = prev % 360;
      const targetNorm = (360 - nextSlot * 45) % 360;
      const delta = (targetNorm - currentNorm + 360) % 360;
      // Add 4 full spins (1440 deg)
      return prev + 1440 + delta;
    });

    if (spinTimerRef.current) clearTimeout(spinTimerRef.current);
    if (popTimerRef.current) clearTimeout(popTimerRef.current);

    spinTimerRef.current = setTimeout(() => {
      isSpinningRef.current = false;
      setIsSpinning(false);
      setSelectedSlot(nextSlot);
      setHasLanded(true);

      popTimerRef.current = setTimeout(() => {
        setHasLanded(false);
      }, 3000);
    }, 2400);
  }, [selectedSlot]);

  useEffect(() => {
    return () => {
      if (spinTimerRef.current) clearTimeout(spinTimerRef.current);
      if (popTimerRef.current) clearTimeout(popTimerRef.current);
    };
  }, []);

  const slotData: SlotItem = SLOTS[selectedSlot] ?? SLOTS[0];
  const isJackpot = selectedSlot === 2;
  const rewardName = t(slotData.key);
  const resultText = isJackpot
    ? t('demo.wheel.jackpot')
    : t('demo.wheel.reward', { name: rewardName });

  const statusMessage = isSpinning
    ? t('demo.wheel.spinning')
    : hasLanded
      ? resultText
      : `🎯 ${t('demo.wheel.spin')}`;

  return (
    <button
      id={id}
      type="button"
      className="lw-scene-container"
      aria-label={t('demo.wheel.scene')}
      data-demo-control
      onClick={handleSpin}
      disabled={isSpinning}
    >
      {/* 3D Casino Table Mat Ambient Glow & Floor Shadow */}
      <span className="lw-ambient-glow" aria-hidden="true" />
      <span className={`lw-shadow ${isSpinning ? 'lw-shadow-spinning' : ''}`} aria-hidden="true" />

      {/* 3D Perspective Roulette Stage */}
      <span className="lw-stage">
        {/* Top Indicator / Elastic Flapper Peg */}
        <span className={`lw-pointer ${isSpinning ? 'lw-pointer-ticking' : ''}`} aria-hidden="true">
          <span className="lw-pointer-bracket" />
          <span className="lw-pointer-pin" />
          <span className="lw-pointer-shadow" />
        </span>

        {/* 3D Cylindrical Wheel Turntable Assembly */}
        <span className="lw-wheel-assembly">
          {/* 3D Cylindrical Edge/Plinth Depth underneath */}
          <span className="lw-wheel-depth" aria-hidden="true" />

          {/* Rotating Disc */}
          <span
            className="lw-wheel-disc"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? 'transform 2.4s cubic-bezier(0.12, 0.86, 0.2, 1)' : 'none',
            }}
          >
            {/* Outer Gold Rim with Studs */}
            <span className="lw-wheel-rim" aria-hidden="true">
              {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
                <span
                  key={deg}
                  className="lw-rim-stud"
                  style={{ transform: `rotate(${deg}deg) translateY(-59px)` }}
                />
              ))}
            </span>

            {/* SVG 8 Wedges with distinct vibrant casino gradients */}
            <svg className="lw-wheel-svg" viewBox="0 0 100 100" aria-hidden="true">
              {SLOTS.map((slot, i) => {
                const startAngle = (i * 45 - 22.5) * (Math.PI / 180);
                const endAngle = ((i + 1) * 45 - 22.5) * (Math.PI / 180);
                const x1 = 50 + 50 * Math.sin(startAngle);
                const y1 = 50 - 50 * Math.cos(startAngle);
                const x2 = 50 + 50 * Math.sin(endAngle);
                const y2 = 50 - 50 * Math.cos(endAngle);
                const pathD = `M 50 50 L ${x1.toFixed(2)} ${y1.toFixed(2)} A 50 50 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;

                return (
                  <path
                    key={slot.key}
                    d={pathD}
                    fill={slot.color}
                    stroke="#ffffff"
                    strokeWidth="0.8"
                    opacity={!isSpinning && i === selectedSlot ? 1 : 0.88}
                  />
                );
              })}
            </svg>

            {/* Slot Icons positioned at radial points */}
            <span className="lw-slot-icons" aria-hidden="true">
              {SLOTS.map((slot, i) => {
                const angle = i * 45;
                return (
                  <span
                    key={slot.key}
                    className="lw-slot-icon-item"
                    style={{
                      transform: `rotate(${angle}deg) translateY(-37px) rotate(${-angle}deg)`,
                    }}
                  >
                    {slot.icon}
                  </span>
                );
              })}
            </span>

            {/* 3D Raised Center Dome Button */}
            <span className="lw-center-hub">
              <span className="lw-center-glow" />
              <span className="lw-center-cap" aria-hidden="true">
                <span className="lw-center-text">
                  {isSpinning ? '•••' : t('demo.wheel.spinAction')}
                </span>
              </span>
            </span>
          </span>
        </span>
      </span>

      {/* Floating Result Badge */}
      <span className="lw-status-container">
        <span
          className={`lw-status-chip ${hasLanded ? 'lw-status-chip-landed' : ''} ${isJackpot && hasLanded ? 'lw-status-chip-jackpot' : ''}`}
          aria-live="polite"
        >
          {statusMessage}
        </span>
      </span>
    </button>
  );
}
