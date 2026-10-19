import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function TreasureChest3DDemo() {
  const { t } = useLocale();
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleToggle = useCallback(() => {
    if (isOpening) return;
    if (isOpen) {
      setIsOpen(false);
      setIsOpening(false);
      if (timerRef.current) clearTimeout(timerRef.current);
    } else {
      setIsOpening(true);
      setIsOpen(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setIsOpening(false);
      }, 500);
    }
  }, [isOpen, isOpening]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <button
      id={id}
      type="button"
      className="tc-scene-container"
      aria-label={t('demo.chest.scene')}
      data-demo-control
      onClick={handleToggle}
    >
      {/* Background ambient radial glow */}
      <span className={`tc-ambient-glow ${isOpen ? 'tc-ambient-glow-open' : ''}`} aria-hidden="true" />

      {/* Dynamic contact shadow under chest */}
      <span className={`tc-shadow ${isOpen ? 'tc-shadow-open' : ''}`} aria-hidden="true" />

      {/* 3D Isometric Chest Assembly */}
      <span className={`tc-stage ${isOpen ? 'tc-stage-open' : ''} ${isOpening ? 'tc-stage-opening' : ''}`}>
        <span className="tc-chest">
          {/* God rays beam burst radiating outward from inside */}
          <span className={`tc-god-rays ${isOpen ? 'tc-god-rays-active' : ''}`} aria-hidden="true" />

          {/* Levitating legendary gem loot */}
          <span className={`tc-gem-wrapper ${isOpen ? 'tc-gem-active' : ''}`} aria-hidden="true">
            <span className="tc-gem-halo" />
            <svg
              className="tc-gem-svg"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id={`${id}-gem-top`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c4b5fd" />
                  <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
                <linearGradient id={`${id}-gem-mid`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#4338ca" />
                </linearGradient>
                <linearGradient id={`${id}-gem-bot`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#312e81" />
                </linearGradient>
              </defs>
              <polygon points="14,14 34,14 42,22 6,22" fill={`url(#${id}-gem-top)`} />
              <polygon points="14,14 24,22 6,22" fill="#ddd6fe" opacity="0.85" />
              <polygon points="34,14 24,22 42,22" fill="#7c3aed" opacity="0.8" />
              <polygon points="6,22 42,22 24,44" fill={`url(#${id}-gem-mid)`} />
              <polygon points="6,22 24,44 18,22" fill="#4338ca" opacity="0.7" />
              <polygon points="42,22 24,44 30,22" fill={`url(#${id}-gem-bot)`} opacity="0.9" />
              <circle cx="20" cy="20" r="2.5" fill="#ffffff" opacity="0.9" />
              <circle cx="28" cy="26" r="1.5" fill="#ffffff" opacity="0.8" />
            </svg>
            <span className="tc-sparkle tc-sp-1">✦</span>
            <span className="tc-sparkle tc-sp-2">★</span>
            <span className="tc-sparkle tc-sp-3">✦</span>
          </span>

          {/* 3D Chest Base Box */}
          <span className="tc-box-base">
            {/* Front Wall */}
            <span className="tc-face tc-base-front">
              <span className="tc-plank tc-plank-1" />
              <span className="tc-plank tc-plank-2" />
              <span className="tc-strap tc-strap-left" />
              <span className="tc-strap tc-strap-right" />
              <span className="tc-bracket tc-bracket-tl" />
              <span className="tc-bracket tc-bracket-bl" />
              <span className="tc-bracket tc-bracket-tr" />
              <span className="tc-bracket tc-bracket-br" />
              <span className="tc-lock-plate">
                <span className="tc-lock-keyhole" />
              </span>
            </span>

            {/* Left Wall */}
            <span className="tc-face tc-base-left">
              <span className="tc-strap tc-strap-mid" />
              <span className="tc-handle-mount">
                <span className="tc-handle-ring" />
              </span>
            </span>

            {/* Right Wall */}
            <span className="tc-face tc-base-right">
              <span className="tc-strap tc-strap-mid" />
            </span>

            {/* Back Wall */}
            <span className="tc-face tc-base-back">
              <span className="tc-strap tc-strap-left" />
              <span className="tc-strap tc-strap-right" />
            </span>

            {/* Bottom Floor */}
            <span className="tc-face tc-base-bottom" />

            {/* Interior Solid Walls (Visible when open looking inside) */}
            <span className="tc-face tc-base-inner-back" />
            <span className="tc-face tc-base-inner-left" />
            <span className="tc-face tc-base-inner-right" />
            <span className="tc-face tc-base-rim" />

            {/* Interior Velvet Cavity with Gold Coins (Visible when open) */}
            <span className={`tc-interior-cavity ${isOpen ? 'tc-interior-open' : ''}`}>
              <span className="tc-interior-velvet" />
              <span className="tc-gold-pile">
                <span className="tc-coin c-1" />
                <span className="tc-coin c-2" />
                <span className="tc-coin c-3" />
                <span className="tc-coin c-4" />
                <span className="tc-coin c-5" />
                <span className="tc-gem-ruby" />
                <span className="tc-gem-emerald" />
              </span>
            </span>
          </span>

          {/* 3D Chest Lid Assembly (Pivots along Rear Top Hinge) */}
          <span className={`tc-lid-assembly tc-lid-pivot ${isOpen ? 'tc-lid-open' : ''}`}>
            {/* Lid Front Wall */}
            <span className="tc-face tc-lid-front">
              <span className="tc-strap tc-strap-left" />
              <span className="tc-strap tc-strap-right" />
              <span className="tc-bracket tc-bracket-tl" />
              <span className="tc-bracket tc-bracket-tr" />
              <span className="tc-clasp-latch" />
            </span>

            {/* Lid Top Curved Roof */}
            <span className="tc-face tc-lid-top">
              <span className="tc-strap tc-strap-left" />
              <span className="tc-strap tc-strap-right" />
              <span className="tc-lid-ridge" />
            </span>

            {/* Lid Left Vault Cap */}
            <span className="tc-face tc-lid-left">
              <span className="tc-strap tc-strap-mid" />
            </span>

            {/* Lid Right Vault Cap */}
            <span className="tc-face tc-lid-right">
              <span className="tc-strap tc-strap-mid" />
            </span>

            {/* Lid Back Wall (Hinged side) */}
            <span className="tc-face tc-lid-back">
              <span className="tc-hinge tc-hinge-left" />
              <span className="tc-hinge tc-hinge-right" />
            </span>

            {/* Lid Hollow Inside Walls & Rim Frame */}
            <span className="tc-face tc-lid-rim" />
            <span className="tc-face tc-lid-inner-left" />
            <span className="tc-face tc-lid-inner-right" />
            <span className="tc-face tc-lid-inner-front" />
            <span className="tc-face tc-lid-inner-back" />

            {/* Lid Underside (Velvet lining exposed when open) */}
            <span className="tc-face tc-lid-under">
              <span className="tc-lid-under-velvet" />
              <span className="tc-lid-under-trim" />
            </span>
          </span>
        </span>
      </span>

      {/* Floating Interactive Status Badge */}
      <span className="tc-status-container">
        <span className={`tc-status-chip ${isOpen ? 'tc-status-chip-open' : ''}`}>
          {isOpening
            ? t('demo.chest.opening')
            : isOpen
              ? `💎 ${t('demo.chest.legendaryLoot')}`
              : `📦 ${t('demo.chest.open')}`}
        </span>
      </span>
    </button>
  );
}
