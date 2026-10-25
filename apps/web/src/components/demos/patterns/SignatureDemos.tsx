import { useId, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';
import { useDemoNumber, useDemoSample } from '../../../hooks/useDemoAutoplay';

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const round = (value: number) => Number(value.toFixed(2));
// SVG references stay unique per card instance; colons from useId are removed for url(#id).
const useSvgId = () => `sg${useId().replace(/:/g, '')}`;

export function EnvelopeInviteDemo() {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  return <div className="sg-demo"><div className="sg-art sg-envelope-stage">
    <button type="button" className="sg-envelope" data-open={open} aria-pressed={open} aria-label={t('demo.signature.envelope')}
      onClick={() => setOpen(value => !value)}>
      <span className="sg-env-back" aria-hidden="true" />
      <span className="sg-env-letter" aria-hidden="true">
        <span className="sg-env-title">{t('demo.signature.inviteTitle')}</span>
        <span className="sg-env-date">{t('demo.signature.inviteDate')}</span>
      </span>
      <span className="sg-env-pocket" aria-hidden="true" />
      <span className="sg-env-flap" aria-hidden="true" />
      <span className="sg-env-seal" aria-hidden="true" />
    </button>
  </div></div>;
}

const CAROUSEL_CARDS = 6;
const CAROUSEL_STEP = 360 / CAROUSEL_CARDS;
const CAROUSEL_RADIUS = 110;

export function CylinderCarouselDemo() {
  const { t } = useLocale();
  // turn keeps the travel direction, so 6→1 continues forward instead of spinning back.
  const [turn, setTurn] = useState(0);
  const active = ((turn % CAROUSEL_CARDS) + CAROUSEL_CARDS) % CAROUSEL_CARDS;
  return <div className="sg-demo"><div className="sg-art sg-carousel" role="group" aria-label={t('demo.signature.carousel')}>
    <div className="sg-carousel-scene" aria-hidden="true">
      <div className="sg-carousel-ring" style={{ transform: `translateZ(-${CAROUSEL_RADIUS}px) rotateY(${-turn * CAROUSEL_STEP}deg)` }}>
        {Array.from({ length: CAROUSEL_CARDS }, (_, i) => <div key={i} className={`sg-carousel-card sg-carousel-card-${i}`} data-active={i === active}
          style={{ transform: `rotateY(${i * CAROUSEL_STEP}deg) translateZ(${CAROUSEL_RADIUS}px)` }}>{i + 1}</div>)}
      </div>
    </div>
    <div className="sg-carousel-controls">
      <button type="button" aria-label={t('demo.signature.prev')} onClick={() => setTurn(value => value - 1)}>‹</button>
      <span aria-live="polite">{t('demo.signature.carouselStatus', { current: active + 1, total: CAROUSEL_CARDS })}</span>
      <button type="button" aria-label={t('demo.signature.next')} onClick={() => setTurn(value => value + 1)}>›</button>
    </div>
  </div></div>;
}

function wavePath(level: number, shift: number, amplitude: number, wavelength: number) {
  const y = (x: number) => round(level + amplitude * Math.sin((x / wavelength) * Math.PI * 2 + shift));
  let path = `M0 ${y(0)}`;
  for (let x = 4; x <= 120; x += 4) path += ` L${x} ${y(x)}`;
  return `${path} L120 120 L0 120 Z`;
}

// Fill for 6.4s, hold for 0.8s, drain for 0.8s. Five wave periods keep the 8s loop seamless.
export function sampleLiquid(phase: number) {
  const progress = phase < 0.8 ? phase / 0.8 * 100 : phase < 0.9 ? 100 : (1 - (phase - 0.9) / 0.1) * 100;
  return { progress: round(progress), wave: round(phase * 5 * Math.PI * 2) };
}

export function LiquidProgressDemo() {
  const { t } = useLocale();
  const id = useSvgId();
  const [{ progress, wave }] = useDemoSample(sampleLiquid(0), sampleLiquid);
  const level = 128 - progress * 1.36;
  const front = wavePath(level, wave, 5, 60);
  const back = wavePath(level - 3, -wave + 1.4, 4, 75);
  const value = Math.round(progress);
  const label = t('demo.signature.percent', { value });
  return <div className="sg-demo"><div className="sg-art sg-liquid-stage">
    <svg className="sg-liquid" viewBox="0 0 120 120" role="progressbar" aria-label={t('demo.signature.liquid')} aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
      <defs>
        <clipPath id={`${id}-orb`}><circle cx="60" cy="60" r="54" /></clipPath>
        <clipPath id={`${id}-water`}><path d={front} /></clipPath>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5eead4" /><stop offset="1" stopColor="#4f46e5" /></linearGradient>
      </defs>
      <circle className="sg-liquid-ring" cx="60" cy="60" r="58" />
      <g clipPath={`url(#${id}-orb)`}>
        <rect className="sg-liquid-empty" width="120" height="120" />
        <path d={back} fill="#818cf8" opacity=".45" />
        <path d={front} fill={`url(#${id}-fill)`} />
        <text className="sg-liquid-text" x="60" y="68" textAnchor="middle">{label}</text>
        <g clipPath={`url(#${id}-water)`}><text className="sg-liquid-text sg-liquid-text-inverse" x="60" y="68" textAnchor="middle" aria-hidden="true">{label}</text></g>
      </g>
    </svg>
  </div></div>;
}

const IMPACT = { x: 172, y: 68 };
const RIM = [[0, 0], [70, 0], [150, 0], [230, 0], [280, 0], [280, 62], [280, 150], [205, 150], [125, 150], [45, 150], [0, 150], [0, 72]];
const RING = [0.42, 0.5, 0.38, 0.47, 0.44, 0.36, 0.48, 0.4, 0.46, 0.37, 0.45, 0.41];

// Radial cracks from one impact point plus one concentric crack split the poster into 24 pieces.
export const SHARDS = RIM.flatMap(([x, y], i) => {
  const [nx, ny] = RIM[(i + 1) % RIM.length];
  const ring = (px: number, py: number, f: number) => [IMPACT.x + (px - IMPACT.x) * f, IMPACT.y + (py - IMPACT.y) * f];
  const a = ring(x, y, RING[i]);
  const b = ring(nx, ny, RING[(i + 1) % RING.length]);
  return [[[IMPACT.x, IMPACT.y], a, b], [a, [x, y], [nx, ny], b]];
}).map((points, i) => {
  const cx = points.reduce((sum, [x]) => sum + x, 0) / points.length;
  const cy = points.reduce((sum, [, y]) => sum + y, 0) / points.length;
  const dx = cx - IMPACT.x, dy = cy - IMPACT.y;
  const distance = Math.hypot(dx, dy) || 1;
  return {
    points: points.map(([x, y]) => `${round(x)},${round(y)}`).join(' '),
    cx: round(cx), cy: round(cy),
    ux: dx / distance, uy: dy / distance,
    reach: 30 + distance * 0.9,
    spin: ((i * 47) % 70) - 35,
  };
});

export function GlassShatterDemo() {
  const { t } = useLocale();
  const id = useSvgId();
  const [progress] = useDemoNumber(0, 0, 100);
  const crack = clamp(progress / 20);
  const flight = clamp((progress - 20) / 60);
  return <div className="sg-demo"><svg className="sg-art" viewBox="0 0 280 150" role="img" aria-label={t('demo.signature.shatter')}>
    <defs>
      <linearGradient id={`${id}-after`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fde68a" /><stop offset=".55" stopColor="#fb7185" /><stop offset="1" stopColor="#a855f7" /></linearGradient>
      <radialGradient id={`${id}-orb`} cx=".35" cy=".35"><stop offset="0" stopColor="#7dd3fc" /><stop offset="1" stopColor="#1d4ed8" /></radialGradient>
      <g id={`${id}-before`}>
        <rect width="280" height="150" fill="#0f172a" />
        <circle cx="70" cy="75" r="46" fill={`url(#${id}-orb)`} />
        <text x="196" y="86" textAnchor="middle" className="sg-shatter-word" fill="#e2e8f0">{t('demo.signature.before')}</text>
      </g>
      {SHARDS.map((shard, i) => <clipPath key={i} id={`${id}-s${i}`}><polygon points={shard.points} /></clipPath>)}
    </defs>
    <rect width="280" height="150" fill={`url(#${id}-after)`} />
    <text x="140" y="88" textAnchor="middle" className="sg-shatter-word" fill="#fff">{t('demo.signature.after')}</text>
    {SHARDS.map((shard, i) => {
      const x = round(shard.ux * shard.reach * flight);
      const y = round(shard.uy * shard.reach * flight + 70 * flight * flight);
      const opacity = round(1 - clamp((flight - 0.45) / 0.55));
      return <g key={i} transform={`translate(${x} ${y}) rotate(${round(shard.spin * flight)} ${shard.cx} ${shard.cy})`} opacity={opacity}>
        <g clipPath={`url(#${id}-s${i})`}><use href={`#${id}-before`} /></g>
        <polygon points={shard.points} fill="none" stroke="#fff" strokeWidth=".7" strokeOpacity={round(crack * 0.75)} />
      </g>;
    })}
    <circle cx={IMPACT.x} cy={IMPACT.y} r={round(2 + crack * 6)} fill="#fff" opacity={round(crack * (1 - flight) * 0.8)} />
  </svg></div>;
}

const DISK_RINGS = [
  { scale: 1, count: 28, speed: 2, size: 1.6, color: '#fdba74' },
  { scale: 0.82, count: 24, speed: 3, size: 1.35, color: '#fed7aa' },
  { scale: 0.66, count: 20, speed: 4, size: 1.1, color: '#fff7ed' },
];
const STARS = Array.from({ length: 30 }, (_, i) => ({ x: (i * 73 + 11) % 280, y: (i * 41 + 17) % 150, r: 0.4 + (i % 3) * 0.25 }));
const HOLE = { x: 140, y: 78 };

export function BlackHoleDemo() {
  const { t } = useLocale();
  const id = useSvgId();
  const [phase] = useDemoSample(0, value => value);
  const particles = DISK_RINGS.flatMap((ring, r) => Array.from({ length: ring.count }, (_, i) => {
    // Integer turns per 8s keep the loop seamless; inner rings orbit faster.
    const angle = ((i * 360) / ring.count + r * 7 + phase * 360 * ring.speed) * Math.PI / 180;
    const cos = Math.cos(angle), sin = Math.sin(angle);
    return { key: `${r}-${i}`, x: round(HOLE.x + 112 * ring.scale * cos), y: round(HOLE.y + 20 * ring.scale * sin), r: ring.size, color: ring.color,
      opacity: round(0.3 + 0.7 * (1 - cos) / 2), front: sin >= 0 };
  }));
  const dots = (front: boolean) => particles.filter(item => item.front === front)
    .map(item => <circle key={item.key} cx={item.x} cy={item.y} r={item.r} fill={item.color} opacity={item.opacity} />);
  return <div className="sg-demo"><svg className="sg-art" viewBox="0 0 280 150" role="img" aria-label={t('demo.signature.blackHole')}>
    <defs>
      <radialGradient id={`${id}-glow`}><stop offset="0" stopColor="#fb923c" stopOpacity=".45" /><stop offset="1" stopColor="#fb923c" stopOpacity="0" /></radialGradient>
      <linearGradient id={`${id}-band`} x1="0" x2="1"><stop offset="0" stopColor="#fff7ed" /><stop offset=".45" stopColor="#fb923c" /><stop offset="1" stopColor="#9a3412" /></linearGradient>
      <filter id={`${id}-blur`} x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="2.2" /></filter>
    </defs>
    <rect width="280" height="150" fill="#05010d" />
    {STARS.map((star, i) => <circle key={i} cx={star.x} cy={star.y} r={star.r} fill="#e0e7ff" opacity={round(0.25 + 0.5 * Math.abs(Math.sin(phase * Math.PI * 4 + i)))} />)}
    <ellipse cx={HOLE.x} cy={HOLE.y} rx="120" ry="60" fill={`url(#${id}-glow)`} />
    <path d={`M${HOLE.x - 112} ${HOLE.y} A112 20 0 0 1 ${HOLE.x + 112} ${HOLE.y}`} fill="none" stroke={`url(#${id}-band)`} strokeWidth="9" opacity=".55" filter={`url(#${id}-blur)`} />
    {dots(false)}
    <path d={`M${HOLE.x - 46} ${HOLE.y} A46 42 0 0 1 ${HOLE.x + 46} ${HOLE.y}`} fill="none" stroke={`url(#${id}-band)`} strokeWidth="6" opacity=".85" filter={`url(#${id}-blur)`} />
    <path d={`M${HOLE.x - 38} ${HOLE.y} A38 30 0 0 0 ${HOLE.x + 38} ${HOLE.y}`} fill="none" stroke="#fdba74" strokeWidth="1.5" opacity=".45" />
    <circle cx={HOLE.x} cy={HOLE.y} r="30" fill="#000" />
    <circle cx={HOLE.x} cy={HOLE.y} r="31.5" fill="none" stroke="#ffedd5" strokeWidth="1.2" opacity=".9" />
    <path d={`M${HOLE.x - 112} ${HOLE.y} A112 20 0 0 0 ${HOLE.x + 112} ${HOLE.y}`} fill="none" stroke={`url(#${id}-band)`} strokeWidth="9" opacity=".75" filter={`url(#${id}-blur)`} />
    {dots(true)}
  </svg></div>;
}

const ZOOM_RATIO = 0.56;
const ZOOM_STEPS = 4;
const ZOOM_PALETTE = ['#f97316', '#0ea5e9', '#a855f7', '#facc15'];

// Level n reaches level n-1's size, angle and color exactly when fraction hits 1.
export function zoomFrames(phase: number) {
  const travel = phase * ZOOM_STEPS;
  const step = Math.floor(travel) % ZOOM_STEPS;
  const fraction = travel - Math.floor(travel);
  return Array.from({ length: 8 }, (_, index) => {
    const level = index - 1;
    const depth = level - fraction;
    return { level, scale: round(ZOOM_RATIO ** depth), rotate: round(depth * 9),
      color: ZOOM_PALETTE[(level + step + ZOOM_STEPS) % ZOOM_STEPS], opacity: level === 6 ? round(fraction) : 1 };
  });
}

export function InfiniteZoomDemo() {
  const { t } = useLocale();
  const [phase] = useDemoSample(0, value => value);
  return <div className="sg-demo"><svg className="sg-art" viewBox="0 0 280 150" role="img" aria-label={t('demo.signature.zoom')}>
    {zoomFrames(phase).map(frame => <g key={frame.level} transform={`translate(140 75) rotate(${frame.rotate}) scale(${frame.scale})`} opacity={frame.opacity}>
      <rect x="-140" y="-75" width="280" height="150" rx="14" fill={frame.color} stroke="#fff" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      <circle cx="-104" cy="-46" r="12" fill="#fff" opacity=".55" />
    </g>)}
  </svg></div>;
}

const ENSO = { x: 128, y: 74, rx: 52, ry: 47, tilt: -12 };
const ensoPoint = (degrees: number) => {
  const a = degrees * Math.PI / 180, tilt = ENSO.tilt * Math.PI / 180;
  const x = ENSO.rx * Math.cos(a), y = ENSO.ry * Math.sin(a);
  return `${round(ENSO.x + x * Math.cos(tilt) - y * Math.sin(tilt))} ${round(ENSO.y + x * Math.sin(tilt) + y * Math.cos(tilt))}`;
};
const ENSO_PATH = `M${ensoPoint(200)} A${ENSO.rx} ${ENSO.ry} ${ENSO.tilt} 0 1 ${ensoPoint(360)} A${ENSO.rx} ${ENSO.ry} ${ENSO.tilt} 0 1 ${ensoPoint(520)}`;
const BRUSH_LAYERS = [{ width: 13, end: 0.82 }, { width: 8, end: 0.94 }, { width: 3.5, end: 1 }];

// Hold the finished artwork, fade it, draw the circle with ease-in-out, then press the seal.
export function sampleInk(phase: number) {
  if (phase < 0.12) return { draw: 1, seal: 1, opacity: 1 };
  if (phase < 0.24) return { draw: 1, seal: 1, opacity: round(1 - (phase - 0.12) / 0.12) };
  const draw = clamp((phase - 0.24) / 0.54);
  return { draw: round(draw * draw * (3 - 2 * draw)), seal: round(clamp((phase - 0.8) / 0.08)), opacity: 1 };
}

export function InkEnsoDemo() {
  const { t } = useLocale();
  const id = useSvgId();
  const [{ draw, seal, opacity }] = useDemoSample(sampleInk(0), sampleInk);
  const strokes = (width: number) => BRUSH_LAYERS.map(layer => {
    const visible = Math.min(draw, layer.end);
    return <path key={layer.end} d={ENSO_PATH} pathLength={1} fill="none" stroke="#111827" strokeWidth={layer.width + width} strokeLinecap="round"
      strokeDasharray={`${round(visible)} 2`} opacity={visible > 0 ? 1 : 0} />;
  });
  return <div className="sg-demo"><svg className="sg-art" viewBox="0 0 280 150" role="img" aria-label={t('demo.signature.ink')}>
    <defs>
      <filter id={`${id}-paper`}><feTurbulence type="fractalNoise" baseFrequency=".65" numOctaves="3" stitchTiles="stitch" /><feColorMatrix values="0 0 0 0 .45  0 0 0 0 .38  0 0 0 0 .28  0 0 0 .16 0" /></filter>
      <filter id={`${id}-brush`} x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" seed="3" result="noise" /><feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" /></filter>
      <filter id={`${id}-bleed`} x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="2.5" /></filter>
    </defs>
    <rect width="280" height="150" fill="#f2eadb" />
    <rect width="280" height="150" filter={`url(#${id}-paper)`} />
    <g opacity={opacity}>
      <g opacity=".18" filter={`url(#${id}-bleed)`}>{strokes(6)}</g>
      <g filter={`url(#${id}-brush)`}>{strokes(0)}</g>
      <g transform={`translate(214 112) scale(${round(1.4 - 0.4 * seal)})`} opacity={seal}>
        <rect x="-11" y="-11" width="22" height="22" rx="3" fill="#b91c1c" />
        <text y="5" textAnchor="middle" className="sg-ink-seal">{t('demo.signature.seal')}</text>
      </g>
    </g>
  </svg></div>;
}

const PEARL_STOPS = ['#f5d0fe', '#bae6fd', '#d9f99d', '#fef3c7', '#c7d2fe', '#fbcfe8'];
const BLOSSOMS = [{ x: 82, y: 60, s: 1 }, { x: 152, y: 42, s: 0.8 }, { x: 200, y: 98, s: 1.1 }];
const halfDisk = (x: number, y: number, r: number, angle: number) => {
  const dx = r * Math.cos(angle), dy = r * Math.sin(angle);
  return `M${round(x + dx)} ${round(y + dy)} A${round(r)} ${round(r)} 0 0 1 ${round(x - dx)} ${round(y - dy)} Z`;
};
// Each petal is two shell halves cut along its radial axis.
const PETALS = BLOSSOMS.flatMap((blossom, b) => Array.from({ length: 5 }, (_, i) => {
  const angle = (-90 + i * 72 + b * 20) * Math.PI / 180;
  const x = blossom.x + 10 * blossom.s * Math.cos(angle), y = blossom.y + 10 * blossom.s * Math.sin(angle);
  return [halfDisk(x, y, 8 * blossom.s, angle), halfDisk(x, y, 8 * blossom.s, angle + Math.PI)];
}).flat());
const branchPoint = (t: number) => [round((1 - t) ** 2 * 18 + 2 * (1 - t) * t * 120 + t * t * 250), round((1 - t) ** 2 * 140 + 2 * (1 - t) * t * 110 + t * t * 22)];
// Cut strips (kkeuneumjil) follow the branch with small gaps between pieces.
const STRIPS = Array.from({ length: 22 }, (_, i) => {
  const [x1, y1] = branchPoint(i / 22 + 0.008), [x2, y2] = branchPoint((i + 1) / 22 - 0.008);
  const length = Math.hypot(x2 - x1, y2 - y1) || 1;
  const nx = -(y2 - y1) / length * 1.7, ny = (x2 - x1) / length * 1.7;
  return [[x1 + nx, y1 + ny], [x2 + nx, y2 + ny], [x2 - nx, y2 - ny], [x1 - nx, y1 - ny]].map(([x, y]) => `${round(x)},${round(y)}`).join(' ');
});

export function PearlInlayDemo() {
  const { t } = useLocale();
  const id = useSvgId();
  const [light] = useDemoNumber(0, 0, 100);
  const angle = -40 + light * 0.8;
  const sheen = -60 + light * 4;
  return <div className="sg-demo"><svg className="sg-art" viewBox="0 0 280 150" role="img" aria-label={t('demo.signature.pearl')}>
    <defs>
      <radialGradient id={`${id}-lacquer`} cx=".4" cy=".3" r=".9"><stop offset="0" stopColor="#292524" /><stop offset="1" stopColor="#09090b" /></radialGradient>
      {[0, 1, 2].map(k => <linearGradient key={k} id={`${id}-shell${k}`} gradientTransform={`rotate(${round(angle + k * 55)} .5 .5)`}>
        {PEARL_STOPS.map((color, i) => <stop key={color} offset={i / (PEARL_STOPS.length - 1)} stopColor={color} />)}
      </linearGradient>)}
      <linearGradient id={`${id}-sheen`} x1="0" x2="1"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#fff" stopOpacity=".5" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
    </defs>
    <rect width="280" height="150" fill={`url(#${id}-lacquer)`} />
    <rect x="8" y="8" width="264" height="134" rx="6" fill="none" stroke="#a8842c" strokeWidth="1.2" />
    {STRIPS.map((points, i) => <polygon key={`strip-${i}`} points={points} fill={`url(#${id}-shell${i % 3})`} opacity=".92" />)}
    {PETALS.map((d, i) => <path key={`petal-${i}`} d={d} fill={`url(#${id}-shell${i % 3})`} opacity=".92" />)}
    {BLOSSOMS.map((blossom, i) => <circle key={`center-${i}`} cx={blossom.x} cy={blossom.y} r={round(3 * blossom.s)} fill="#d4af37" />)}
    <rect x={round(sheen)} y="-20" width="60" height="190" fill={`url(#${id}-sheen)`} opacity=".22" transform="skewX(-20)" />
  </svg></div>;
}

const THERMAL_STOPS: [number, string][] = [[0, '#ffffff'], [0.15, '#fff3a0'], [0.35, '#ffb000'], [0.55, '#ff4d00'], [0.75, '#b0006e'], [1, '#2a0c5c']];

export function ThermalViewDemo() {
  const { t } = useLocale();
  const id = useSvgId();
  const [progress] = useDemoNumber(0, 0, 100);
  const lift = Math.sin(progress / 100 * Math.PI);
  const hand = { x: round(110 + progress * 0.95), y: round(96 - lift * 24) };
  const temperature = (33.2 + lift * 1.6).toFixed(1);
  const steam = (k: number) => {
    const sway = round(4 * Math.sin(progress / 100 * Math.PI * 2 + k));
    const x = 50 + k * 10;
    return `M${x} 72 C${x + sway} 62 ${x - sway} 54 ${x} 44`;
  };
  return <div className="sg-demo"><svg className="sg-art" viewBox="0 0 280 150" role="img" aria-label={t('demo.signature.thermal')}>
    <defs>
      <linearGradient id={`${id}-cold`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0b0630" /><stop offset="1" stopColor="#3b0a63" /></linearGradient>
      <radialGradient id={`${id}-hot`}>{THERMAL_STOPS.map(([offset, color]) => <stop key={offset} offset={offset} stopColor={color} stopOpacity={offset === 1 ? 0 : 1} />)}</radialGradient>
      <radialGradient id={`${id}-warm`}>{THERMAL_STOPS.slice(1).map(([offset, color]) => <stop key={offset} offset={round((offset - 0.15) / 0.85)} stopColor={color} stopOpacity={offset === 1 ? 0 : 1} />)}</radialGradient>
      <linearGradient id={`${id}-scale`} x1="0" y1="0" x2="0" y2="1">{THERMAL_STOPS.map(([offset, color]) => <stop key={offset} offset={offset} stopColor={color} />)}</linearGradient>
      <filter id={`${id}-heat`} x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2.5" /></filter>
      <pattern id={`${id}-scan`} width="3" height="3" patternUnits="userSpaceOnUse"><rect width="3" height="1" fill="#000" opacity=".22" /></pattern>
    </defs>
    <rect width="280" height="150" fill={`url(#${id}-cold)`} />
    <rect y="124" width="280" height="26" fill="#6b0f5c" opacity=".7" />
    <g filter={`url(#${id}-heat)`}>
      {[0, 1, 2].map(k => <path key={k} d={steam(k)} fill="none" stroke="#ff7a00" strokeWidth="4" strokeLinecap="round" opacity=".55" />)}
      <path d="M78 88 C96 88 96 114 78 114" fill="none" stroke="#ff4d00" strokeWidth="5" />
      <rect x="38" y="76" width="42" height="48" rx="7" fill={`url(#${id}-hot)`} />
      <g transform={`translate(${hand.x} ${hand.y})`}>
        <ellipse rx="19" ry="23" fill={`url(#${id}-warm)`} />
        {[-12, -4, 4, 12].map((x, i) => <rect key={x} x={x - 4} y={-46 + Math.abs(i - 1.5) * 4} width="8" height="26" rx="4" fill={`url(#${id}-warm)`} />)}
        <rect x="14" y="-12" width="8" height="22" rx="4" fill={`url(#${id}-warm)`} transform="rotate(-38 18 0)" />
      </g>
    </g>
    <rect width="280" height="150" fill={`url(#${id}-scan)`} />
    <g transform={`translate(${hand.x} ${hand.y - 8})`} className="sg-thermal-hud">
      <circle r="9" fill="none" />
      <path d="M-15 0h-6M15 0h6M0 -15v-6M0 15v6" />
      <text x="14" y="-14">{t('demo.signature.temperature', { value: temperature })}</text>
    </g>
    <text x="12" y="18" className="sg-thermal-label">{t('demo.signature.thermalMode')}</text>
    <rect x="262" y="22" width="6" height="106" rx="2" fill={`url(#${id}-scale)`} />
    <text x="258" y="20" textAnchor="end" className="sg-thermal-label">{t('demo.signature.thermalMax')}</text>
    <text x="258" y="134" textAnchor="end" className="sg-thermal-label">{t('demo.signature.thermalMin')}</text>
  </svg></div>;
}

export function CrtPowerOffDemo() {
  const { t } = useLocale();
  const [progress] = useDemoNumber(0, 0, 100);
  const collapseY = clamp((progress - 30) / 25);
  const collapseX = clamp((progress - 55) / 20);
  const fade = clamp((progress - 75) / 25);
  const scaleY = round(1 - collapseY * 0.985);
  const scaleX = round(1 - collapseX * 0.97);
  return <div className="sg-demo"><div className="sg-art sg-crt-stage">
    <div className="sg-crt-body">
      <div className="sg-crt-screen" role="img" aria-label={t('demo.signature.crt')}>
        <div className="sg-crt-image" style={{ transform: `scale(${scaleX}, ${scaleY})`, filter: `brightness(${round(1 + collapseY * 1.6 + collapseX * 0.6)})`, opacity: round(1 - fade) }}>
          <span className="sg-crt-word">{t('demo.signature.onAir')}</span>
          <span className="sg-crt-flash" style={{ opacity: round(collapseY * 0.85) }} />
        </div>
        <span className="sg-crt-dot" style={{ opacity: round(collapseX * (1 - fade)), transform: `scale(${round(1 - fade * 0.8)})` }} />
        <span className="sg-crt-glass" />
      </div>
      <div className="sg-crt-panel" aria-hidden="true"><span /><span /><i /></div>
    </div>
  </div></div>;
}
