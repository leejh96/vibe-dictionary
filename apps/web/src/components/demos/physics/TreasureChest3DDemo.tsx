import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useDemoPulse } from '../../../hooks/useDemoAutoplay';
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

  useDemoPulse(handleToggle);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <button
      id={id}
      type="button"
      className="pd-scene tc-scene-container"
      aria-label={t('demo.chest.scene')}
      data-demo-control
      onClick={handleToggle}
    >
      {/* Background radial ambiance */}
      <span className={`tc-ambient-glow ${isOpen ? 'tc-ambient-glow-open' : ''}`} aria-hidden="true" />

      {/* Dynamic contact shadow under chest */}
      <span className={`tc-shadow ${isOpen ? 'tc-shadow-open' : ''}`} aria-hidden="true" />

      {/* 3D Isometric Chest Container */}
      <span className={`tc-stage ${isOpen ? 'tc-stage-open' : ''} ${isOpening ? 'tc-stage-opening' : ''}`}>
        <span className="tc-chest">
          {/* God rays beam burst radiating when open */}
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
              {/* Faceted Legendary Gem */}
              <defs>
                <linearGradient id={`${id}-gem-top`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
                <linearGradient id={`${id}-gem-mid`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#4338ca" />
                </linearGradient>
                <linearGradient id={`${id}-gem-bot`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4f46e5" />
                  <stop offset="100%" stopColor="#312e81" />
                </linearGradient>
              </defs>
              <polygon points="12,14 36,14 44,22 4,22" fill={`url(#${id}-gem-top)`} opacity="0.95" />
              <polygon points="12,14 20,22 4,22" fill="#c4b5fd" opacity="0.8" />
              <polygon points="36,14 28,22 44,22" fill="#7c3aed" opacity="0.75" />
              <polygon points="20,22 28,22 36,14 12,14" fill="#ddd6fe" opacity="0.9" />
              <polygon points="4,22 44,22 24,44" fill={`url(#${id}-gem-mid)`} />
              <polygon points="4,22 24,44 20,22" fill="#4338ca" opacity="0.6" />
              <polygon points="44,22 24,44 28,22" fill={`url(#${id}-gem-bot)`} opacity="0.85" />
              <polygon points="20,22 28,22 24,44" fill="#a5b4fc" opacity="0.9" />
              {/* Specular sparkle gleam */}
              <circle cx="21" cy="20" r="2" fill="#ffffff" opacity="0.9" />
              <circle cx="27" cy="26" r="1.5" fill="#ffffff" opacity="0.75" />
            </svg>
            {/* Ambient Sparkles */}
            <span className="tc-sparkle tc-sp-1">✦</span>
            <span className="tc-sparkle tc-sp-2">★</span>
            <span className="tc-sparkle tc-sp-3">✦</span>
          </span>

          {/* Chest Base Assembly */}
          <span className="tc-box tc-box-base">
            <span className="tc-face tc-base-front">
              <span className="tc-metal-trim tc-trim-left" />
              <span className="tc-metal-trim tc-trim-right" />
              <span className="tc-metal-lock">
                <span className="tc-lock-keyhole" />
              </span>
            </span>
            <span className="tc-face tc-base-back" />
            <span className="tc-face tc-base-left" />
            <span className="tc-face tc-base-right" />
            <span className="tc-face tc-base-bottom" />
            <span className="tc-interior-glow" />
          </span>

          {/* Chest Lid Assembly (3D Hinged on Back Top Edge) */}
          <span className={`tc-lid-pivot ${isOpen ? 'tc-lid-open' : ''}`}>
            <span className="tc-box tc-box-lid">
              <span className="tc-face tc-lid-front">
                <span className="tc-metal-trim tc-trim-left" />
                <span className="tc-metal-trim tc-trim-right" />
                <span className="tc-lid-clasp" />
              </span>
              <span className="tc-face tc-lid-top">
                <span className="tc-metal-trim tc-trim-left" />
                <span className="tc-metal-trim tc-trim-right" />
              </span>
              <span className="tc-face tc-lid-back" />
              <span className="tc-face tc-lid-left" />
              <span className="tc-face tc-lid-right" />
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
