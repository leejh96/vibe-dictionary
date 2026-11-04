import { useEffect, useId, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';
import { useDemoSample } from '../../../hooks/useDemoAutoplay';

const useSvgId = () => `sp${useId().replace(/:/g, '')}`;

export function AiStreamingDemo() {
  const { t } = useLocale();
  const fullText = t('demo.starter.aiStreaming.text');
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (charIndex >= fullText.length) return;
    const timer = setTimeout(() => {
      setCharIndex(i => i + 1);
    }, 45);
    return () => clearTimeout(timer);
  }, [charIndex, fullText.length]);

  const handleRestart = () => {
    setCharIndex(0);
  };

  const displayedText = fullText.slice(0, charIndex);

  return (
    <div className="sp-demo">
      <button
        type="button"
        className="sp-art sp-streaming-box"
        onClick={handleRestart}
        role="status"
        aria-live="polite"
        title={t('demo.starter.aiStreaming.replay')}
      >
        <div className="sp-streaming-header">
          <span className="sp-streaming-badge">
            <span className="sp-streaming-dot" aria-hidden="true" />
            {t('demo.starter.aiStreaming.status')}
          </span>
          <span className="sp-streaming-footer">
            {t('demo.starter.aiStreaming.replay')} ↺
          </span>
        </div>
        <div className="sp-streaming-body">
          {displayedText}
          <span className="sp-streaming-cursor" aria-hidden="true" />
        </div>
      </button>
    </div>
  );
}

const PARTICLE_COUNT = 8;
const PARTICLE_COLORS = ['#f43f5e', '#38bdf8', '#a855f7', '#fbbf24'];
const PARTICLES = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
  const angle = (i * 360) / PARTICLE_COUNT;
  const rad = (angle * Math.PI) / 180;
  const dist = 32;
  return {
    id: i,
    color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
    dx: `${Math.round(Math.cos(rad) * dist)}px`,
    dy: `${Math.round(Math.sin(rad) * dist)}px`,
  };
});

export function ParticleBurstDemo() {
  const { t } = useLocale();
  const [active, setActive] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [count, setCount] = useState(128);

  const handleClick = () => {
    const nextActive = !active;
    setActive(nextActive);
    setCount(c => (nextActive ? c + 1 : c - 1));

    if (nextActive) {
      setAnimating(true);
      setTimeout(() => setAnimating(false), 500);
    }
  };

  return (
    <div className="sp-demo">
      <div className="sp-art sp-burst-box">
        <button
          type="button"
          className="sp-burst-btn"
          data-active={active}
          data-animating={animating}
          aria-pressed={active}
          aria-label={active ? t('demo.starter.particleBurst.liked') : t('demo.starter.particleBurst.like')}
          onClick={handleClick}
        >
          <div className="sp-burst-icon-wrap" aria-hidden="true">
            <div className="sp-burst-shockwave" />
            <div className="sp-burst-particles">
              {PARTICLES.map(p => (
                <span
                  key={p.id}
                  className="sp-burst-particle"
                  style={
                    {
                      backgroundColor: p.color,
                      '--dx': p.dx,
                      '--dy': p.dy,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
            <svg className="sp-burst-heart" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <span className="sp-burst-count">{count}</span>
        </button>
      </div>
    </div>
  );
}

export function AmbientAuroraDemo() {
  const { t } = useLocale();
  const filterId = useSvgId();
  const [phase] = useDemoSample(0, value => value);

  const p = phase * Math.PI * 2;
  const b1X = 100 + Math.cos(p) * 35;
  const b1Y = 70 + Math.sin(p) * 22;
  const b2X = 180 + Math.sin(p * 1.3) * 32;
  const b2Y = 80 + Math.cos(p * 1.3) * 25;
  const b3X = 140 + Math.cos(p * 0.8) * 28;
  const b3Y = 85 + Math.sin(p * 0.8) * 18;

  return (
    <div className="sp-demo">
      <div
        className="sp-art sp-aurora-box"
        role="img"
        aria-label={`${t('demo.starter.aurora.badge')} - ${t('demo.starter.aurora.subtitle')}`}
      >
        <svg
          viewBox="0 0 280 150"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          <defs>
            <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="22" />
            </filter>
          </defs>
          <g filter={`url(#${filterId})`}>
            {/* Violet Blob */}
            <ellipse cx={b1X} cy={b1Y} rx="65" ry="48" fill="#8b5cf6" opacity="0.8" />
            {/* Cyan Blob */}
            <ellipse cx={b2X} cy={b2Y} rx="60" ry="52" fill="#06b6d4" opacity="0.75" />
            {/* Coral Pink Blob */}
            <ellipse cx={b3X} cy={b3Y} rx="54" ry="44" fill="#f43f5e" opacity="0.7" />
          </g>
        </svg>

        <div className="sp-aurora-content">
          <span className="sp-aurora-glass-badge">
            {t('demo.starter.aurora.badge')}
          </span>
          <span className="sp-aurora-hint">
            {t('demo.starter.aurora.subtitle')}
          </span>
        </div>
      </div>
    </div>
  );
}

export function BottomSheetDemo() {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);

  return (
    <div className="sp-demo">
      <div
        className="sp-art sp-sheet-stage"
        data-open={open}
        onKeyDown={e => {
          if (e.key === 'Escape' && open) setOpen(false);
        }}
      >
        <div
          className="sp-sheet-backdrop"
          onClick={() => setOpen(false)}
          data-demo-control="true"
          aria-hidden="true"
        />

        <div
          className="sp-sheet-panel"
          role="dialog"
          aria-modal={open}
          aria-label={t('demo.starter.bottomSheet.title')}
        >
          <button
            type="button"
            className="sp-sheet-handle-btn"
            onClick={() => setOpen(v => !v)}
            aria-expanded={open}
            aria-label={t('demo.starter.bottomSheet.peekHandle')}
          >
            <span className="sp-sheet-handle-bar" />
          </button>

          <div className="sp-sheet-content">
            <span className="sp-sheet-title">
              {t('demo.starter.bottomSheet.title')}
            </span>

            <div className="sp-sheet-menu">
              <button
                type="button"
                className="sp-sheet-item"
                onClick={() => setOpen(false)}
              >
                {t('demo.starter.bottomSheet.share')}
              </button>
              <button
                type="button"
                className="sp-sheet-item"
                onClick={() => setOpen(false)}
              >
                {t('demo.starter.bottomSheet.save')}
              </button>
            </div>

            <button
              type="button"
              className="sp-sheet-close-btn"
              onClick={() => setOpen(false)}
            >
              {t('demo.starter.bottomSheet.close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SwipeToConfirmDemo() {
  const { t } = useLocale();
  const [confirmed, setConfirmed] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);

  const handleKnobClick = () => {
    if (confirmed) {
      setConfirmed(false);
      setDragProgress(0);
    } else {
      setConfirmed(true);
      setDragProgress(100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'Enter') {
      setConfirmed(true);
      setDragProgress(100);
    } else if (e.key === 'ArrowLeft') {
      setConfirmed(false);
      setDragProgress(0);
    }
  };

  const trackWidth = 228;
  const knobWidth = 40;
  const maxTravel = trackWidth - knobWidth - 8;
  const currentLeft = (dragProgress / 100) * maxTravel;

  return (
    <div className="sp-demo">
      <div className="sp-art sp-swipe-stage">
        <div
          className="sp-swipe-track"
          data-confirmed={confirmed}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={dragProgress}
          aria-label={confirmed ? t('demo.starter.swipeConfirm.success') : t('demo.starter.swipeConfirm.idle')}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <div
            className="sp-swipe-fill"
            style={{ width: `${dragProgress}%` }}
          />

          <span className="sp-swipe-label">
            {confirmed
              ? t('demo.starter.swipeConfirm.success')
              : t('demo.starter.swipeConfirm.idle')}
          </span>

          <button
            type="button"
            className="sp-swipe-knob"
            onClick={handleKnobClick}
            style={{ transform: `translateX(${currentLeft}px)` }}
            aria-label={confirmed ? t('demo.starter.swipeConfirm.reset') : t('demo.starter.swipeConfirm.idle')}
          >
            {confirmed ? (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

const CLI_COMMANDS = {
  npm: 'npx create-vibe-app@latest',
  pnpm: 'pnpm dlx create-vibe-app@latest',
  yarn: 'yarn dlx create-vibe-app@latest',
  bun: 'bunx create-vibe-app@latest',
} as const;

export function CliCommandSwitcherDemo() {
  const { t } = useLocale();
  const [activeTab, setActiveTab] = useState<'npm' | 'pnpm' | 'yarn' | 'bun'>('npm');
  const [copied, setCopied] = useState(false);

  const command = CLI_COMMANDS[activeTab];

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(command).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="sp-demo">
      <div className="sp-art sp-cli-box">
        <div className="sp-cli-header">
          <div className="sp-cli-tabs" role="tablist">
            {(['npm', 'pnpm', 'yarn', 'bun'] as const).map(tab => (
              <button
                key={tab}
                type="button"
                className="sp-cli-tab"
                data-active={activeTab === tab}
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="sp-cli-copy-btn"
            data-copied={copied}
            onClick={handleCopy}
            aria-label={t('demo.starter.cli.copy')}
          >
            {copied ? (
              <>
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {t('demo.starter.cli.copied')}
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                {t('demo.starter.cli.copy')}
              </>
            )}
          </button>
        </div>

        <div className="sp-cli-body">
          <span className="sp-cli-prompt">$</span>
          <span>{command}</span>
        </div>
      </div>
    </div>
  );
}

export function InteractiveKbdDemo() {
  const { t } = useLocale();
  const [cmdPressed, setCmdPressed] = useState(false);
  const [kPressed, setKPressed] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const triggerFeedback = () => {
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 800);
  };

  const handleCmdClick = () => {
    setCmdPressed(true);
    triggerFeedback();
    setTimeout(() => setCmdPressed(false), 200);
  };

  const handleKClick = () => {
    setKPressed(true);
    triggerFeedback();
    setTimeout(() => setKPressed(false), 200);
  };

  return (
    <div className="sp-demo">
      <div className="sp-art sp-kbd-box">
        <div className="sp-kbd-keys">
          <button
            type="button"
            className="sp-kbd-key"
            data-pressed={cmdPressed}
            onClick={handleCmdClick}
            aria-label={t('demo.starter.kbd.cmd')}
          >
            <kbd>{t('demo.starter.kbd.cmd')}</kbd>
          </button>

          <span className="text-xs font-bold text-slate-400">+</span>

          <button
            type="button"
            className="sp-kbd-key"
            data-pressed={kPressed}
            onClick={handleKClick}
            aria-label={t('demo.starter.kbd.k')}
          >
            <kbd>{t('demo.starter.kbd.k')}</kbd>
          </button>
        </div>

        <div className="sp-kbd-feedback">
          {showFeedback ? t('demo.starter.kbd.action') : t('demo.starter.kbd.hint')}
        </div>
      </div>
    </div>
  );
}

export function TearOffCouponDemo() {
  const { t } = useLocale();
  const [torn, setTorn] = useState(false);

  const handleToggle = () => {
    setTorn(v => !v);
  };

  return (
    <div className="sp-demo">
      <div className="sp-art sp-coupon-stage">
        <div className="sp-coupon-wrap" data-torn={torn}>
          <div className="sp-coupon-main">
            <span className="sp-coupon-discount">
              {t('demo.starter.coupon.discount')}
            </span>
            <span className="sp-coupon-desc">
              {t('demo.starter.coupon.desc')}
            </span>

            <span className="sp-coupon-notch-top" />
            <span className="sp-coupon-notch-bottom" />

            <div className="sp-coupon-stamp" aria-hidden="true">
              {t('demo.starter.coupon.claimed')}
            </div>
          </div>

          <div className="sp-coupon-stub">
            <button
              type="button"
              className="sp-coupon-btn"
              onClick={handleToggle}
              aria-label={torn ? t('demo.starter.coupon.claimed') : t('demo.starter.coupon.claim')}
            >
              {torn ? t('demo.starter.coupon.claimed') : t('demo.starter.coupon.claim')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FileDropzoneDemo() {
  const { t } = useLocale();
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success'>('idle');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === 'uploading') {
      timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setStatus('success');
            return 100;
          }
          return prev + 25;
        });
      }, 180);
    }
    return () => clearInterval(timer);
  }, [status]);

  const handleClick = () => {
    if (status === 'idle') {
      setStatus('uploading');
      setProgress(0);
    } else if (status === 'success') {
      setStatus('idle');
      setProgress(0);
    }
  };

  return (
    <div className="sp-demo">
      <div className="sp-art sp-dropzone-stage">
        <button
          type="button"
          className="sp-dropzone-box"
          data-status={status}
          onClick={handleClick}
          aria-label={
            status === 'idle'
              ? t('demo.starter.dropzone.idle')
              : status === 'uploading'
              ? t('demo.starter.dropzone.uploading')
              : t('demo.starter.dropzone.success')
          }
        >
          {status === 'idle' && (
            <div className="sp-dropzone-idle">
              <svg viewBox="0 0 24 24" className="sp-dropzone-cloud-icon" aria-hidden="true">
                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
              </svg>
              <span className="sp-dropzone-title">{t('demo.starter.dropzone.idle')}</span>
              <span className="sp-dropzone-hint">{t('demo.starter.dropzone.hint')}</span>
            </div>
          )}

          {status === 'uploading' && (
            <div className="sp-dropzone-progress-view">
              <div className="sp-dropzone-file-info">
                <svg viewBox="0 0 24 24" className="sp-dropzone-file-icon" aria-hidden="true">
                  <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                </svg>
                <div className="sp-dropzone-file-meta">
                  <span className="sp-dropzone-filename">{t('demo.starter.dropzone.fileName')}</span>
                  <span className="sp-dropzone-filesize">{t('demo.starter.dropzone.fileSize')}</span>
                </div>
                <span className="sp-dropzone-pct">{progress}%</span>
              </div>
              <div className="sp-dropzone-bar-track">
                <div className="sp-dropzone-bar-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          {status === 'success' && (
            <div className="sp-dropzone-success-view">
              <div className="sp-dropzone-check-circle">
                <svg viewBox="0 0 24 24" className="sp-dropzone-check-svg" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span className="sp-dropzone-success-title">{t('demo.starter.dropzone.success')}</span>
              <span className="sp-dropzone-reset-hint">{t('demo.starter.dropzone.reset')}</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

export function LiquidSegmentedDemo() {
  const { t } = useLocale();
  const [active, setActive] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  const tabs = [
    { id: 'daily', label: t('demo.starter.segment.daily') },
    { id: 'weekly', label: t('demo.starter.segment.weekly') },
    { id: 'monthly', label: t('demo.starter.segment.monthly') },
  ] as const;

  const activeIndex = tabs.findIndex(tab => tab.id === active);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      const next = (activeIndex + 1) % tabs.length;
      setActive(tabs[next].id);
    } else if (e.key === 'ArrowLeft') {
      const prev = (activeIndex - 1 + tabs.length) % tabs.length;
      setActive(tabs[prev].id);
    }
  };

  return (
    <div className="sp-demo">
      <div className="sp-art sp-segment-stage">
        <div
          className="sp-segment-track"
          role="tablist"
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <div
            className="sp-segment-pill"
            style={{ transform: `translateX(${activeIndex * 100}%)` }}
          />
          {tabs.map(tab => (
            <button
              key={tab.id}
              type="button"
              className="sp-segment-tab"
              data-active={active === tab.id}
              role="tab"
              aria-selected={active === tab.id}
              onClick={() => setActive(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BankCard3dDemo() {
  const { t } = useLocale();
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="sp-demo">
      <div className="sp-art sp-bankcard-stage">
        <div className="sp-bankcard-scene">
          <div className="sp-bankcard-flipper" data-flipped={flipped}>
            {/* Front */}
            <div className="sp-bankcard-face sp-bankcard-front">
              <div className="sp-bankcard-top">
                <div className="sp-bankcard-chip" />
                <span className="sp-bankcard-brand">{t('demo.starter.bankCard.brand')}</span>
              </div>
              <div className="sp-bankcard-number">
                {t('demo.starter.bankCard.number')}
              </div>
              <div className="sp-bankcard-bottom">
                <div className="sp-bankcard-holder">
                  <span className="sp-bankcard-lbl">{t('demo.starter.bankCard.holderLabel')}</span>
                  <span className="sp-bankcard-val">{t('demo.starter.bankCard.holder')}</span>
                </div>
                <div className="sp-bankcard-expires">
                  <span className="sp-bankcard-lbl">{t('demo.starter.bankCard.expiresLabel')}</span>
                  <span className="sp-bankcard-val">{t('demo.starter.bankCard.expires')}</span>
                </div>
              </div>
            </div>

            {/* Back */}
            <div className="sp-bankcard-face sp-bankcard-back">
              <div className="sp-bankcard-strip" />
              <div className="sp-bankcard-cvc-row">
                <div className="sp-bankcard-sign-panel">{t('demo.starter.bankCard.signText')}</div>
                <div className="sp-bankcard-cvc-box">{t('demo.starter.bankCard.cvcValue')}</div>
              </div>
              <div className="sp-bankcard-back-hint">
                {t('demo.starter.bankCard.cvcLabel')}
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="sp-bankcard-flip-btn"
          onClick={() => setFlipped(v => !v)}
          aria-label={flipped ? t('demo.starter.bankCard.flipFront') : t('demo.starter.bankCard.flipBack')}
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
          </svg>
          {flipped ? t('demo.starter.bankCard.flipFront') : t('demo.starter.bankCard.flipBack')}
        </button>
      </div>
    </div>
  );
}

const WAVEFORM_HEIGHTS = [8, 14, 22, 12, 18, 26, 16, 28, 20, 10, 16, 24, 18, 12, 14, 22, 14, 8, 16, 10];

export function VoiceNoteWaveformDemo() {
  const { t } = useLocale();
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(35);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (playing) {
      timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setPlaying(false);
            return 0;
          }
          return prev + 5;
        });
      }, 200);
    }
    return () => clearInterval(timer);
  }, [playing]);

  const handleBarClick = (index: number) => {
    const newPct = Math.round(((index + 1) / WAVEFORM_HEIGHTS.length) * 100);
    setProgress(newPct);
  };

  return (
    <div className="sp-demo">
      <div className="sp-art sp-voice-stage">
        <div className="sp-voice-card">
          <button
            type="button"
            className="sp-voice-play-btn"
            onClick={() => setPlaying(v => !v)}
            aria-label={playing ? t('demo.starter.voice.pause') : t('demo.starter.voice.play')}
          >
            {playing ? (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </button>

          <div
            className="sp-voice-wave-bars"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            {WAVEFORM_HEIGHTS.map((height, i) => {
              const barPct = ((i + 1) / WAVEFORM_HEIGHTS.length) * 100;
              const isFilled = progress >= barPct;
              return (
                <button
                  key={i}
                  type="button"
                  className="sp-voice-bar-btn"
                  onClick={() => handleBarClick(i)}
                  aria-label={`${i + 1}`}
                  style={{ height: `${height}px` }}
                  data-filled={isFilled}
                />
              );
            })}
          </div>

          <span className="sp-voice-time">
            {t('demo.starter.voice.duration')}
          </span>
        </div>
      </div>
    </div>
  );
}
