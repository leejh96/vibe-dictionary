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
      }, 450);
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
            {/* Ambient Sparkles */}
            <span className="tc-sparkle tc-sp-1">✦</span>
            <span className="tc-sparkle tc-sp-2">★</span>
            <span className="tc-sparkle tc-sp-3">✦</span>
          </span>

          {/* SVG 3D Isometric Chest Graphics */}
          <svg
            className="tc-box-svg"
            viewBox="0 0 140 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              {/* Wood Gradients */}
              <linearGradient id={`${id}-wood-front`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#9a3412" />
                <stop offset="50%" stopColor="#7c2d12" />
                <stop offset="100%" stopColor="#431407" />
              </linearGradient>
              <linearGradient id={`${id}-wood-side`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#431407" />
                <stop offset="100%" stopColor="#1c0a03" />
              </linearGradient>
              <linearGradient id={`${id}-lid-wood`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#c2410c" />
                <stop offset="40%" stopColor="#9a3412" />
                <stop offset="100%" stopColor="#6c2409" />
              </linearGradient>
              {/* Gold Gradients */}
              <linearGradient id={`${id}-gold`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="45%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
              <linearGradient id={`${id}-gold-side`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>
              {/* Interior Treasure Pile Gradient */}
              <radialGradient id={`${id}-treasure`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="40%" stopColor="#f59e0b" />
                <stop offset="85%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#78350f" />
              </radialGradient>
            </defs>

            {/* --- Chest Base Assembly --- */}
            <g className="tc-base-group">
              {/* Left Side Wall (Isometric Depth) */}
              <polygon points="20,48 40,36 40,70 20,82" fill={`url(#${id}-wood-side)`} />
              {/* Left Metal Strap & Rivets */}
              <polygon points="28,43 32,41 32,74 28,77" fill={`url(#${id}-gold-side)`} />
              <circle cx="30" cy="48" r="1.2" fill="#fde047" />
              <circle cx="30" cy="68" r="1.2" fill="#fde047" />

              {/* Front Wall */}
              <polygon points="40,36 120,36 120,70 40,70" fill={`url(#${id}-wood-front)`} />

              {/* Front Wood Plank Dividing Grooves */}
              <line x1="40" y1="47" x2="120" y2="47" stroke="#270e01" strokeWidth="1" opacity="0.6" />
              <line x1="40" y1="58" x2="120" y2="58" stroke="#270e01" strokeWidth="1" opacity="0.6" />

              {/* Left Corner Metal Bracket */}
              <polygon points="40,36 46,36 46,70 40,70" fill={`url(#${id}-gold)`} />
              <polygon points="20,48 24,46 24,80 20,82" fill={`url(#${id}-gold-side)`} />
              <circle cx="43" cy="42" r="1.3" fill="#fef08a" />
              <circle cx="43" cy="64" r="1.3" fill="#fef08a" />

              {/* Right Corner Metal Bracket */}
              <polygon points="114,36 120,36 120,70 114,70" fill={`url(#${id}-gold)`} />
              <circle cx="117" cy="42" r="1.3" fill="#fef08a" />
              <circle cx="117" cy="64" r="1.3" fill="#fef08a" />

              {/* Middle Straps */}
              <polygon points="62,36 68,36 68,70 62,70" fill={`url(#${id}-gold)`} />
              <circle cx="65" cy="42" r="1.3" fill="#fef08a" />
              <circle cx="65" cy="64" r="1.3" fill="#fef08a" />

              <polygon points="92,36 98,36 98,70 92,70" fill={`url(#${id}-gold)`} />
              <circle cx="95" cy="42" r="1.3" fill="#fef08a" />
              <circle cx="95" cy="64" r="1.3" fill="#fef08a" />

              {/* Bottom Rim */}
              <polygon points="20,82 40,70 120,70 100,82" fill="#1c0a03" opacity="0.4" />

              {/* Interior Cavity & Glowing Gold Coins (Revealed when open) */}
              <g className={`tc-interior-cavity ${isOpen ? 'tc-interior-open' : ''}`}>
                {/* Velvet Interior Back/Bottom */}
                <polygon points="40,36 120,36 100,24 20,24" fill="#2e1065" />
                <polygon points="20,24 40,36 40,46 20,34" fill="#1e1b4b" />
                {/* Glowing Gold Coin & Jewel Pile */}
                <ellipse cx="70" cy="31" rx="36" ry="8" fill={`url(#${id}-treasure)`} />
                {/* Sparkling Coins */}
                <circle cx="58" cy="30" r="4.5" fill="#fef08a" stroke="#d97706" strokeWidth="0.8" />
                <circle cx="68" cy="28" r="4.5" fill="#fde047" stroke="#b45309" strokeWidth="0.8" />
                <circle cx="78" cy="31" r="5" fill="#fef08a" stroke="#d97706" strokeWidth="0.8" />
                <circle cx="88" cy="29" r="4" fill="#fde047" stroke="#b45309" strokeWidth="0.8" />
                <circle cx="63" cy="33" r="4.2" fill="#fef08a" stroke="#d97706" strokeWidth="0.8" />
                <circle cx="74" cy="33" r="4.8" fill="#fde047" stroke="#b45309" strokeWidth="0.8" />
                {/* Rubies & Gems nestled in gold */}
                <polygon points="70,26 73,28 70,30 67,28" fill="#ef4444" />
                <polygon points="82,27 85,29 82,31 79,29" fill="#3b82f6" />
                <polygon points="53,29 55,31 53,33 51,31" fill="#10b981" />
                {/* Golden Rim Highlight */}
                <polyline points="20,24 40,36 120,36" stroke="#fef08a" strokeWidth="1.5" />
              </g>

              {/* Front Lock Base Plate & Keyhole */}
              <rect x="73" y="42" width="14" height="15" rx="2" fill={`url(#${id}-gold)`} stroke="#78350f" strokeWidth="1" />
              <ellipse cx="80" cy="48" rx="2" ry="2.5" fill="#270e01" />
              <polygon points="79,48 81,48 81.5,53 78.5,53" fill="#270e01" />
            </g>

            {/* --- Chest Lid Assembly (Pivots Open around Top-Back Hinge) --- */}
            <g className={`tc-lid-pivot ${isOpen ? 'tc-lid-open' : ''}`}>
              {/* Underside of Lid (Visible when opened) */}
              <g className="tc-lid-inside">
                <polygon points="20,24 100,24 95,8 15,8" fill="#1e1b4b" />
                <polygon points="15,8 95,8 100,24 20,24" stroke="#d97706" strokeWidth="1.2" />
              </g>

              {/* Vaulted Lid Front Arch & Facets */}
              <path
                d="M 40,36 L 120,36 C 120,36 123,22 120,18 C 117,14 43,14 40,18 C 37,22 40,36 40,36 Z"
                fill={`url(#${id}-lid-wood)`}
              />

              {/* Curved Lid Left Side Vault */}
              <path
                d="M 20,48 L 40,36 C 40,36 37,22 40,18 C 43,14 23,26 20,30 C 17,34 20,48 20,48 Z"
                fill={`url(#${id}-wood-side)`}
              />

              {/* Lid Top Arc */}
              <polygon points="40,18 120,18 100,6 20,6" fill="#c2410c" opacity="0.9" />

              {/* Lid Gold Straps (Front, Left, and Top) */}
              {/* Left Rim */}
              <path
                d="M 40,36 L 46,36 C 46,36 48,22 46,18 L 40,18 C 37,22 40,36 40,36 Z"
                fill={`url(#${id}-gold)`}
              />
              {/* Right Rim */}
              <path
                d="M 114,36 L 120,36 C 120,36 123,22 120,18 L 114,18 C 114,22 114,36 114,36 Z"
                fill={`url(#${id}-gold)`}
              />
              {/* Center Left Strap */}
              <path
                d="M 62,36 L 68,36 C 68,36 70,22 68,18 L 62,18 C 62,22 62,36 62,36 Z"
                fill={`url(#${id}-gold)`}
              />
              {/* Center Right Strap */}
              <path
                d="M 92,36 L 98,36 C 98,36 100,22 98,18 L 92,18 C 92,22 92,36 92,36 Z"
                fill={`url(#${id}-gold)`}
              />

              {/* Lid Bottom Gold Trim Band */}
              <polygon points="40,34 120,34 120,37 40,37" fill={`url(#${id}-gold)`} />
              <polygon points="20,46 40,34 40,37 20,49" fill={`url(#${id}-gold-side)`} />

              {/* Rivets on Lid */}
              <circle cx="43" cy="27" r="1.3" fill="#fef08a" />
              <circle cx="65" cy="27" r="1.3" fill="#fef08a" />
              <circle cx="95" cy="27" r="1.3" fill="#fef08a" />
              <circle cx="117" cy="27" r="1.3" fill="#fef08a" />

              {/* Front Locking Clasp Latch (Overhangs onto base lock) */}
              <rect x="74" y="31" width="12" height="13" rx="2" fill={`url(#${id}-gold)`} stroke="#78350f" strokeWidth="0.8" />
              <circle cx="80" cy="37" r="2" fill="#78350f" />
            </g>
          </svg>
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
