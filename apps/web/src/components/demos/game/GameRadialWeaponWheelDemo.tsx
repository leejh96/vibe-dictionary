import { useRef, useState, type KeyboardEvent, type MouseEvent } from 'react';
import { Sword, Crosshair, Wand2, Shield, FlaskConical, Flame } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

const WHEEL_SLOTS = [
  { id: 1, key: 'demo.game.wheel.slot1', icon: Sword, color: '#6366f1' },
  { id: 2, key: 'demo.game.wheel.slot2', icon: Crosshair, color: '#10b981' },
  { id: 3, key: 'demo.game.wheel.slot3', icon: Wand2, color: '#8b5cf6' },
  { id: 4, key: 'demo.game.wheel.slot4', icon: Shield, color: '#0ea5e9' },
  { id: 5, key: 'demo.game.wheel.slot5', icon: FlaskConical, color: '#ec4899' },
  { id: 6, key: 'demo.game.wheel.slot6', icon: Flame, color: '#f59e0b' },
] as const;

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function sectorPath(cx: number, cy: number, rInner: number, rOuter: number, startAngle: number, endAngle: number) {
  const outerStart = polarToCartesian(cx, cy, rOuter, startAngle);
  const outerEnd = polarToCartesian(cx, cy, rOuter, endAngle);
  const innerEnd = polarToCartesian(cx, cy, rInner, endAngle);
  const innerStart = polarToCartesian(cx, cy, rInner, startAngle);
  return [
    `M ${outerStart.x.toFixed(2)} ${outerStart.y.toFixed(2)}`,
    `A ${rOuter} ${rOuter} 0 0 1 ${outerEnd.x.toFixed(2)} ${outerEnd.y.toFixed(2)}`,
    `L ${innerEnd.x.toFixed(2)} ${innerEnd.y.toFixed(2)}`,
    `A ${rInner} ${rInner} 0 0 0 ${innerStart.x.toFixed(2)} ${innerStart.y.toFixed(2)}`,
    'Z',
  ].join(' ');
}

export function GameRadialWeaponWheelDemo() {
  const { t } = useLocale();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const activeIndex = hoveredIndex ?? selectedIndex;
  const activeSlot = WHEEL_SLOTS[activeIndex];
  const ActiveIcon = activeSlot.icon;

  const getSectorFromPointer = (clientX: number, clientY: number, currentHovered: number | null): number | null => {
    const wheel = wheelRef.current;
    if (!wheel) return null;
    const rect = wheel.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return null;

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = clientX - cx;
    const dy = clientY - cy;
    const dist = Math.hypot(dx, dy);

    if (dist < 18 || dist > rect.width / 2 + 6) return null;

    const deg = ((Math.atan2(dy, dx) * 180) / Math.PI + 90 + 360) % 360;
    const rawIdx = Math.floor(deg / 60) % WHEEL_SLOTS.length;

    if (currentHovered !== null && rawIdx !== currentHovered) {
      const centerDeg = currentHovered * 60 + 30;
      const rawDiff = Math.abs(deg - centerDeg);
      const angularDiff = Math.min(rawDiff, 360 - rawDiff);
      if (angularDiff < 33) return currentHovered;
    }

    return rawIdx;
  };

  const handleWheelMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const next = getSectorFromPointer(e.clientX, e.clientY, hoveredIndex);
    if (next !== hoveredIndex) {
      setHoveredIndex(next);
    }
  };

  const handleWheelClick = (e: MouseEvent<HTMLDivElement>) => {
    const next = getSectorFromPointer(e.clientX, e.clientY, hoveredIndex);
    if (next !== null) {
      setSelectedIndex(next);
      setHoveredIndex(null);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setHoveredIndex(null);
      setSelectedIndex((prev) => (prev + 1) % WHEEL_SLOTS.length);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setHoveredIndex(null);
      setSelectedIndex((prev) => (prev - 1 + WHEEL_SLOTS.length) % WHEEL_SLOTS.length);
    }
  };

  return (
    <div className="w-full min-h-[180px] flex flex-col justify-center items-center pt-11 pb-3 px-3 sm:pt-12 sm:pb-4 sm:px-4 text-xs select-none">
      <div
        role="group"
        aria-label={t('demo.game.wheel.ariaLabel')}
        onKeyDown={handleKeyDown}
        className="w-full max-w-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-sm flex items-center justify-between gap-3"
      >
        {/* Radial SVG Wheel (fixed coordinate container prevents hover jitter) */}
        <div
          ref={wheelRef}
          data-radial-wheel="true"
          data-demo-control="true"
          onMouseMove={handleWheelMouseMove}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={handleWheelClick}
          className="relative w-[116px] h-[116px] shrink-0 cursor-pointer"
        >
          <svg viewBox="0 0 180 180" className="w-full h-full overflow-visible pointer-events-none" aria-hidden="true">
            {WHEEL_SLOTS.map((slot, idx) => {
              const startAngle = idx * 60 + 2;
              const endAngle = (idx + 1) * 60 - 2;
              const midAngle = idx * 60 + 30;
              const isActive = idx === activeIndex;
              const offset = isActive ? 6 : 0;
              const rad = ((midAngle - 90) * Math.PI) / 180;
              const dx = Math.cos(rad) * offset;
              const dy = Math.sin(rad) * offset;
              return (
                <g
                  key={slot.id}
                  style={{
                    transform: `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px)`,
                    transition: 'transform 150ms ease-out',
                  }}
                >
                  <path
                    d={sectorPath(90, 90, 38, 78, startAngle, endAngle)}
                    fill={isActive ? slot.color : 'currentColor'}
                    className={
                      isActive
                        ? 'opacity-95'
                        : 'text-slate-100 dark:text-slate-800 stroke-slate-300 dark:stroke-slate-700'
                    }
                    strokeWidth={1.5}
                  />
                </g>
              );
            })}
          </svg>

          {/* Fixed-Hitbox Accessibility Buttons (only visual icon shifts inside) */}
          {WHEEL_SLOTS.map((slot, idx) => {
            const Icon = slot.icon;
            const midAngle = idx * 60 + 30;
            const isActive = idx === activeIndex;
            const pos = polarToCartesian(58, 58, 37, midAngle);
            const rad = ((midAngle - 90) * Math.PI) / 180;
            const iconShift = isActive ? 3.5 : 0;
            const iconDx = Math.cos(rad) * iconShift;
            const iconDy = Math.sin(rad) * iconShift;
            return (
              <button
                key={slot.id}
                type="button"
                aria-label={t(slot.key)}
                aria-pressed={selectedIndex === idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex(idx);
                  setHoveredIndex(null);
                }}
                style={{ left: `${pos.x.toFixed(2)}px`, top: `${pos.y.toFixed(2)}px` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span
                  className="pointer-events-none flex items-center justify-center"
                  style={{
                    transform: `translate(${iconDx.toFixed(2)}px, ${iconDy.toFixed(2)}px)`,
                    transition: 'transform 150ms ease-out',
                  }}
                >
                  <Icon aria-hidden="true" className="w-3.5 h-3.5" />
                </span>
              </button>
            );
          })}

          {/* Center Hub */}
          <div className="pointer-events-none absolute inset-0 m-auto w-10 h-10 rounded-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col items-center justify-center">
            <ActiveIcon aria-hidden="true" className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>

        {/* Readout & Quick Buttons */}
        <div className="flex-1 min-w-0 flex flex-col gap-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-400 block">
              {t('demo.game.wheel.equipped')}
            </span>
            <p className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
              {activeSlot.id}. {t(activeSlot.key)}
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
              {t('demo.game.wheel.hint')}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-1">
            {WHEEL_SLOTS.map((slot, idx) => (
              <button
                key={slot.id}
                type="button"
                onClick={() => {
                  setSelectedIndex(idx);
                  setHoveredIndex(null);
                }}
                aria-pressed={selectedIndex === idx}
                className={`min-h-6 px-2 py-1 rounded-md text-[10px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedIndex === idx
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {t(slot.key)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
