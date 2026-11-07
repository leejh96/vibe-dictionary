import { useId, useRef, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';
import { usePixelAnimation } from './usePixelAnimation';

// ============================================================================
// 1. px-snow-village-accumulation — Snow Village Density & Accumulation
// ============================================================================
const SNOW_FLAKES: ReadonlyArray<{ x: number; y: number; size: number; drift: number }> = Array.from(
  { length: 36 },
  (_, i) => ({
    x: (i * 29 + 11) % 252 + 6,
    y: (i * 19 + 7) % 120,
    size: i % 3 === 0 ? 3 : 2,
    drift: i % 2 === 0 ? 2 : -2,
  })
);

export function SnowVillageAccumulationDemo() {
  const { t } = useLocale();
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [snowLevel, setSnowLevel] = useState(2);
  const [tick, setTick] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [warmLights, setWarmLights] = useState(true);

  const isAllowed = usePixelAnimation(
    () => {
      setTick((prev) => (prev + 1) % 28);
    },
    playing && snowLevel > 0 ? 120 : null,
    containerRef
  );
  const activePlaying = playing && isAllowed && snowLevel > 0;

  const activeFlakes = SNOW_FLAKES.slice(0, snowLevel * 12);
  const roofCapH = snowLevel === 0 ? 0 : snowLevel === 1 ? 2 : snowLevel === 2 ? 5 : 8;
  const groundBankH = snowLevel * 3;
  const smokeStep = Math.floor(tick / 2) % 3;
  const snowPath = activeFlakes
    .map((flake) => {
      const fy = (flake.y + tick * 9) % 126;
      const fx = flake.x + (tick % 2 === 0 ? flake.drift : 0);
      return `M${fx} ${fy}h${flake.size}v${flake.size}h-${flake.size}Z`;
    })
    .join('');

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demos.pixelart.art.snowVillageAccumulation')}
      >
        {/* Winter night sky & distant hills */}
        <rect width="264" height="144" fill="#0b1528" />
        <polygon points="0,112 68,68 142,112" fill="#16243d" />
        <polygon points="118,112 198,62 264,112" fill="#132036" />

        {/* Ground base & rising snow accumulation bank */}
        <rect x="0" y="112" width="264" height="32" fill="#334155" />
        {snowLevel > 0 && (
          <g>
            <rect
              x="0"
              y={112 - groundBankH}
              width="264"
              height={groundBankH + 14}
              fill="#cbd5e1"
            />
            <rect
              x="0"
              y={112 - groundBankH}
              width="264"
              height={Math.max(2, groundBankH)}
              fill="#f8fafc"
            />
          </g>
        )}

        {/* Pine trees (left & center) with snow boughs */}
        <g>
          <rect x="20" y="96" width="6" height="16" fill="#451a03" />
          <polygon points="8,98 23,66 38,98" fill="#14532d" />
          <polygon points="11,84 23,56 35,84" fill="#166534" />
          {roofCapH > 0 && (
            <g fill="#f8fafc">
              <rect x="15" y="64" width="16" height={Math.min(4, roofCapH)} />
              <rect x="12" y="80" width="22" height={Math.min(5, roofCapH)} />
            </g>
          )}
        </g>

        {/* Left Timber Cabin */}
        <g>
          {/* Chimney & smoke */}
          <rect x="86" y="54" width="10" height="22" fill="#475569" />
          {warmLights && (
            <g fill="#94a3b8" opacity="0.7">
              <rect x={88 + (tick % 2) * 2} y={44 - smokeStep * 2} width="6" height="4" />
              <rect x={92 - (tick % 2) * 2} y={36 - smokeStep * 2} width="8" height="4" />
            </g>
          )}
          {/* Cabin walls */}
          <rect x="46" y="76" width="56" height="36" fill="#5c3a21" />
          <rect x="50" y="80" width="48" height="32" fill="#7c4d2b" />
          {/* Pitched roof */}
          <polygon points="40,78 74,54 108,78" fill="#334155" />
          {/* Roof snow cap */}
          {roofCapH > 0 && (
            <g fill="#f8fafc">
              <rect x="64" y={54 - Math.floor(roofCapH / 2)} width="20" height={roofCapH} />
              <rect x="52" y={62 - Math.floor(roofCapH / 2)} width="44" height={roofCapH} />
              <rect x="40" y={72 - Math.floor(roofCapH / 2)} width="68" height={roofCapH} />
            </g>
          )}
          {/* Cabin door & windows */}
          <rect x="54" y="92" width="12" height="20" fill="#3b2313" />
          <rect
            x="72"
            y="86"
            width="20"
            height="14"
            fill={warmLights ? '#fbbf24' : '#1e293b'}
          />
          {warmLights && <rect x="76" y="88" width="12" height="10" fill="#fef08a" />}
          {snowLevel >= 2 && (
            <rect x="70" y={100 - Math.min(4, snowLevel)} width="24" height={Math.min(4, snowLevel)} fill="#f8fafc" />
          )}
        </g>

        {/* Right Stone & Timber Lodge */}
        <g>
          <rect x="148" y="72" width="68" height="40" fill="#6b4423" />
          <polygon points="142,74 182,48 222,74" fill="#3b254a" />
          {roofCapH > 0 && (
            <g fill="#f8fafc">
              <rect x="170" y={48 - Math.floor(roofCapH / 2)} width="24" height={roofCapH} />
              <rect x="156" y={58 - Math.floor(roofCapH / 2)} width="52" height={roofCapH} />
              <rect x="142" y={68 - Math.floor(roofCapH / 2)} width="80" height={roofCapH} />
            </g>
          )}
          <rect
            x="158"
            y="84"
            width="18"
            height="14"
            fill={warmLights ? '#fbbf24' : '#1e293b'}
          />
          <rect
            x="188"
            y="84"
            width="18"
            height="14"
            fill={warmLights ? '#fbbf24' : '#1e293b'}
          />
          {warmLights && (
            <g fill="#fef08a">
              <rect x="162" y="86" width="10" height="10" />
              <rect x="192" y="86" width="10" height="10" />
            </g>
          )}
          {snowLevel >= 3 && (
            <g fill="#f8fafc">
              <rect x="156" y="96" width="22" height="4" />
              <rect x="186" y="96" width="22" height="4" />
            </g>
          )}
        </g>

        {/* Warm window bounce light on snow */}
        {warmLights && snowLevel > 0 && (
          <g fill="#fde047" opacity="0.35">
            <rect x="68" y="114" width="28" height="6" />
            <rect x="154" y="114" width="56" height="6" />
          </g>
        )}

        {/* Falling snowflakes (batched path with continuous 126px wrap) */}
        {snowPath && (
          <path d={snowPath} fill="#ffffff" data-snow-count={activeFlakes.length} />
        )}
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            className={`px-btn ${activePlaying ? 'px-btn-active' : ''}`}
            aria-pressed={activePlaying}
            disabled={!isAllowed || snowLevel === 0}
            onClick={() => setPlaying((p) => !p)}
          >
            {activePlaying ? t('demos.pixelart.snow.pause') : t('demos.pixelart.snow.play')}
          </button>
          <button
            type="button"
            className={`px-btn ${warmLights ? 'px-btn-active' : ''}`}
            aria-pressed={warmLights}
            onClick={() => setWarmLights((w) => !w)}
          >
            {warmLights ? t('demos.pixelart.snow.lightsOn') : t('demos.pixelart.snow.lightsOff')}
          </button>
        </div>
        <div className="px-slider-row">
          <label className="px-slider-label" htmlFor={`${id}-snow`}>
            <span className="px-slider-name">{t('demos.pixelart.snow.level')}</span>
            <input
              id={`${id}-snow`}
              type="range"
              className="px-slider"
              min={0}
              max={3}
              step={1}
              value={snowLevel}
              aria-controls={id}
              onChange={(e) => setSnowLevel(Number(e.target.value))}
            />
            <span className="px-slider-val">{`${snowLevel}/3`}</span>
          </label>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 2. px-aurora-tundra-bands — Aurora Tundra Band Shift
// ============================================================================
const AURORA_WAVE_LUT = [0, 3, 6, 8, 6, 3, 0, -3, -6, -8, -6, -3] as const;
const AURORA_COLS = Array.from({ length: 28 }, (_, i) => i);

export function AuroraTundraBandsDemo() {
  const { t } = useLocale();
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(3);
  const [playing, setPlaying] = useState(true);
  const [cyanBand, setCyanBand] = useState(false);

  const isAllowed = usePixelAnimation(
    () => {
      setPhase((prev) => (prev + 1) % 12);
    },
    playing ? 140 : null,
    containerRef
  );
  const activePlaying = playing && isAllowed;

  const crestColor = cyanBand ? '#f43f5e' : '#a855f7';
  const midColor = cyanBand ? '#06b6d4' : '#10b981';
  const fringeColor = cyanBand ? '#7dd3fc' : '#6ee7b7';

  let crestPath = '';
  let midPath = '';
  let fringePath = '';
  let reflectPath = '';
  for (const col of AURORA_COLS) {
    const lutIdx = (col + phase) % 12;
    const waveDy = AURORA_WAVE_LUT[lutIdx] ?? 0;
    const colX = 10 + col * 9;
    const topY = 22 + waveDy;
    const colH = 38 + ((col + phase) % 3) * 4;
    crestPath += `M${colX} ${topY}h6v10h-6Z`;
    midPath += `M${colX} ${topY + 10}h6v${colH - 18}h-6Z`;
    fringePath += `M${colX} ${topY + colH - 8}h6v8h-6Z`;
    if (col % 2 === 0) {
      reflectPath += `M${colX} ${116 + Math.floor(waveDy / 2)}h10v3h-10Z`;
    }
  }

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demos.pixelart.art.auroraTundraBands')}
      >
        {/* Arctic night sky */}
        <rect width="264" height="144" fill="#060b18" />

        {/* Crisp starfield pixels */}
        <g fill="#e2e8f0">
          <rect x="24" y="14" width="2" height="2" />
          <rect x="76" y="10" width="2" height="2" />
          <rect x="148" y="12" width="2" height="2" />
          <rect x="212" y="16" width="2" height="2" />
          <rect x="242" y="28" width="2" height="2" />
        </g>

        {/* 28 Vertical Aurora Curtain Columns batched by color band */}
        <g data-aurora-curtain="batched">
          <path d={crestPath} fill={crestColor} opacity="0.65" />
          <path d={midPath} fill={midColor} opacity="0.85" />
          <path d={fringePath} fill={fringeColor} />
        </g>

        {/* Jagged Tundra Glacier Silhouette */}
        <polygon
          points="0,106 32,82 64,98 104,74 144,96 188,78 228,94 264,84 264,108 0,108"
          fill="#0f172a"
        />
        <polygon
          points="32,82 46,96 24,96"
          fill="#1e293b"
        />
        <polygon
          points="104,74 122,96 92,96"
          fill="#1e293b"
        />
        <polygon
          points="188,78 206,96 176,96"
          fill="#1e293b"
        />

        {/* Frozen Fjord Lake & Mirrored Aurora Stripes */}
        <rect x="0" y="106" width="264" height="38" fill="#091526" />
        <rect x="0" y="106" width="264" height="2" fill="#334155" />
        <path d={reflectPath} fill={fringeColor} opacity="0.45" />
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            className={`px-btn ${activePlaying ? 'px-btn-active' : ''}`}
            aria-pressed={activePlaying}
            disabled={!isAllowed}
            onClick={() => setPlaying((p) => !p)}
          >
            {activePlaying ? t('demos.pixelart.aurora.pause') : t('demos.pixelart.aurora.play')}
          </button>
          <button
            type="button"
            className={`px-btn ${cyanBand ? 'px-btn-active' : ''}`}
            aria-pressed={cyanBand}
            onClick={() => setCyanBand((c) => !c)}
          >
            {cyanBand ? t('demos.pixelart.aurora.cyan') : t('demos.pixelart.aurora.emerald')}
          </button>
        </div>
        <div className="px-slider-row">
          <label className="px-slider-label" htmlFor={`${id}-phase`}>
            <span className="px-slider-name">{t('demos.pixelart.aurora.phase')}</span>
            <input
              id={`${id}-phase`}
              type="range"
              className="px-slider"
              min={0}
              max={11}
              step={1}
              value={phase}
              aria-controls={id}
              onChange={(e) => {
                setPlaying(false);
                setPhase(Number(e.target.value));
              }}
            />
            <span className="px-slider-val">{`#${phase + 1}/12`}</span>
          </label>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 3. px-underwater-ruin-caustics — Underwater Ruin Caustics
// ============================================================================
const RUIN_PILLARS = [
  { x: 42, y: 38, w: 24, h: 80 },
  { x: 118, y: 50, w: 28, h: 68 },
  { x: 194, y: 32, w: 24, h: 86 },
] as const;

export function UnderwaterRuinCausticsDemo() {
  const { t } = useLocale();
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [caustic, setCaustic] = useState(2);
  const [waveStep, setWaveStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [coralGlow, setCoralGlow] = useState(true);

  const isAllowed = usePixelAnimation(
    () => {
      setWaveStep((prev) => (prev + 1) % 6);
    },
    playing ? 150 : null,
    containerRef
  );
  const activePlaying = playing && isAllowed;

  const shiftX = (waveStep - 2) * 4;

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demos.pixelart.art.underwaterRuinCaustics')}
      >
        {/* Depth-graded ocean water */}
        <rect width="264" height="48" fill="#0c4a6e" />
        <rect y="48" width="264" height="52" fill="#082f49" />
        <rect y="100" width="264" height="44" fill="#051e30" />

        {/* Water surface shimmer crest */}
        <g fill="#7dd3fc">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect
              key={i}
              x={(i * 44 + waveStep * 6) % 248}
              y="6"
              width="28"
              height="3"
            />
          ))}
        </g>

        {/* Diagonal refracted sun shafts */}
        <g fill="#38bdf8" opacity={0.12 * caustic}>
          <polygon points={`${34 + shiftX},10 ${66 + shiftX},10 ${98 + shiftX},118 ${58 + shiftX},118`} />
          <polygon points={`${114 + shiftX},10 ${152 + shiftX},10 ${186 + shiftX},118 ${140 + shiftX},118`} />
          {caustic >= 2 && (
            <polygon points={`${188 + shiftX},10 ${218 + shiftX},10 ${248 + shiftX},118 ${212 + shiftX},118`} />
          )}
        </g>

        {/* Sunken Doric Pillars & Caustic Ribbons */}
        {RUIN_PILLARS.map((p, idx) => (
          <g key={idx}>
            <rect x={p.x - 4} y={p.y} width={p.w + 8} height="6" fill="#334155" />
            <rect x={p.x} y={p.y + 6} width={p.w} height={p.h - 6} fill="#1e293b" />
            <rect x={p.x + 4} y={p.y + 6} width="4" height={p.h - 6} fill="#475569" />
            {/* Moving caustic highlight bands across pillar */}
            {Array.from({ length: caustic * 2 }, (_, b) => {
              const bandY = p.y + 12 + ((b * 16 + waveStep * 5) % (p.h - 20));
              return (
                <rect
                  key={b}
                  x={p.x + 2}
                  y={bandY}
                  width={p.w - 4}
                  height="4"
                  fill="#67e8f9"
                  opacity={0.35 + caustic * 0.15}
                />
              );
            })}
          </g>
        ))}

        {/* Seabed sand & stone tiles */}
        <rect x="0" y="118" width="264" height="26" fill="#0f293a" />
        <rect x="0" y="118" width="264" height="3" fill="#22d3ee" opacity={0.25 * caustic} />

        {/* Bioluminescent Coral Reef */}
        <g>
          <rect x="18" y="106" width="14" height="12" fill={coralGlow ? '#f472b6' : '#334155'} />
          <rect x="22" y="102" width="6" height="6" fill={coralGlow ? '#fbcfe8' : '#475569'} />
          <rect x="84" y="108" width="18" height="10" fill={coralGlow ? '#22d3ee' : '#334155'} />
          <rect x="88" y="104" width="10" height="6" fill={coralGlow ? '#cffafe' : '#475569'} />
          <rect x="164" y="106" width="16" height="12" fill={coralGlow ? '#a3e635' : '#334155'} />
          <rect x="168" y="102" width="8" height="6" fill={coralGlow ? '#ecfccb' : '#475569'} />
        </g>

        {/* Rising pixel bubbles */}
        <g fill="#bae6fd">
          {[32, 96, 158, 228].map((bx, i) => {
            const by = 110 - ((waveStep * 14 + i * 23) % 92);
            return <rect key={i} x={bx} y={by} width="4" height="4" />;
          })}
        </g>
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            className={`px-btn ${activePlaying ? 'px-btn-active' : ''}`}
            aria-pressed={activePlaying}
            disabled={!isAllowed}
            onClick={() => setPlaying((p) => !p)}
          >
            {activePlaying ? t('demos.pixelart.ruin.pause') : t('demos.pixelart.ruin.play')}
          </button>
          <button
            type="button"
            className={`px-btn ${coralGlow ? 'px-btn-active' : ''}`}
            aria-pressed={coralGlow}
            onClick={() => setCoralGlow((c) => !c)}
          >
            {coralGlow ? t('demos.pixelart.ruin.coralOn') : t('demos.pixelart.ruin.coralOff')}
          </button>
        </div>
        <div className="px-slider-row">
          <label className="px-slider-label" htmlFor={`${id}-caustic`}>
            <span className="px-slider-name">{t('demos.pixelart.ruin.caustic')}</span>
            <input
              id={`${id}-caustic`}
              type="range"
              className="px-slider"
              min={1}
              max={3}
              step={1}
              value={caustic}
              aria-controls={id}
              onChange={(e) => setCaustic(Number(e.target.value))}
            />
            <span className="px-slider-val">{`${caustic}/3`}</span>
          </label>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 4. px-windmill-wheat-breeze — Windmill & Wheat Field Breeze
// ============================================================================
const WHEAT_COLS = Array.from({ length: 24 }, (_, i) => i);
const WIND_SWAY_PX = [0, 2, 5, 8] as const;
const WIND_INTERVAL_MS: Record<number, number | null> = {
  0: null,
  1: 200,
  2: 140,
  3: 90,
};

export function WindmillWheatBreezeDemo() {
  const { t } = useLocale();
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [wind, setWind] = useState(2);
  const [tick, setTick] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [duskSky, setDuskSky] = useState(false);

  const intervalMs = playing && wind > 0 ? (WIND_INTERVAL_MS[wind] ?? 140) : null;
  const isAllowed = usePixelAnimation(
    () => {
      setTick((prev) => (prev + 1) % 8);
    },
    intervalMs,
    containerRef
  );
  const activePlaying = playing && isAllowed && wind > 0;

  const bladePhase = tick % 4;
  const maxSway = WIND_SWAY_PX[wind] ?? 2;

  let lowerStemPath = '';
  let midStemPath = '';
  let earTipPath = '';
  for (const col of WHEAT_COLS) {
    const baseX = 10 + col * 10;
    const waveOffset = (col + tick) % 4 === 0 ? maxSway : Math.ceil(maxSway / 2);
    lowerStemPath += `M${baseX} 114h3v22h-3Z`;
    midStemPath += `M${baseX + Math.floor(waveOffset / 2)} 102h3v12h-3Z`;
    earTipPath += `M${baseX + waveOffset} 92h5v10h-5Z`;
  }

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demos.pixelart.art.windmillWheatBreeze')}
      >
        {/* Sky backdrop (Noon vs Golden Dusk) */}
        <rect width="264" height="96" fill={duskSky ? '#7c2d12' : '#0284c7'} />
        <rect y="54" width="264" height="44" fill={duskSky ? '#ea580c' : '#38bdf8'} />
        {/* Sun disk */}
        <rect
          x="44"
          y={duskSky ? 64 : 24}
          width="18"
          height="18"
          fill={duskSky ? '#fde047' : '#fef08a'}
        />

        {/* Rolling pastoral hills */}
        <polygon points="0,98 92,74 196,98" fill={duskSky ? '#3f6212' : '#15803d'} />
        <rect x="0" y="96" width="264" height="48" fill={duskSky ? '#365314' : '#166534'} />

        {/* Windmill Tower on Right Hill */}
        <g>
          <polygon points="168,102 176,42 204,42 212,102" fill="#78350f" />
          <polygon points="172,42 190,26 208,42" fill="#451a03" />
          <rect x="184" y="82" width="12" height="20" fill="#451a03" />
          <rect x="186" y="54" width="8" height="8" fill="#fef08a" />

          {/* Rotating 8-Position Quantized Pixel Sail Blades around hub (190, 48) */}
          {bladePhase === 0 && (
            /* Phase 0: Orthogonal Cross (+) */
            <g data-blade-phase="0">
              <rect x="188" y="10" width="4" height="76" fill="#e2e8f0" />
              <rect x="152" y="46" width="76" height="4" fill="#e2e8f0" />
              <rect x="192" y="12" width="8" height="26" fill="#facc15" />
              <rect x="180" y="58" width="8" height="26" fill="#facc15" />
              <rect x="154" y="38" width="26" height="8" fill="#facc15" />
              <rect x="200" y="50" width="26" height="8" fill="#facc15" />
            </g>
          )}
          {bladePhase === 1 && (
            /* Phase 1: Stepped 22.5° Clockwise Tilt */
            <g data-blade-phase="1">
              <path
                d="M196 12h4v16h-4v16h-4v8h-4v16h-4v16h-4v-16h4v-16h4v-8h4v-16h4Z M156 36h16v4h16v4h8v4h16v4h16v4h-16v-4h-16v-4h-8v-4h-16v-4h-16Z"
                fill="#e2e8f0"
              />
              <rect x="200" y="14" width="8" height="20" fill="#facc15" />
              <rect x="172" y="60" width="8" height="20" fill="#facc15" />
              <rect x="156" y="28" width="20" height="8" fill="#facc15" />
              <rect x="204" y="58" width="20" height="8" fill="#facc15" />
            </g>
          )}
          {bladePhase === 2 && (
            /* Phase 2: Stepped Diagonal Cross (X, 45°) */
            <g data-blade-phase="2">
              <line x1="164" y1="22" x2="216" y2="74" stroke="#e2e8f0" strokeWidth="4" />
              <line x1="216" y1="22" x2="164" y2="74" stroke="#e2e8f0" strokeWidth="4" />
              <rect x="166" y="20" width="12" height="8" fill="#facc15" />
              <rect x="202" y="68" width="12" height="8" fill="#facc15" />
              <rect x="202" y="20" width="12" height="8" fill="#facc15" />
              <rect x="166" y="68" width="12" height="8" fill="#facc15" />
            </g>
          )}
          {bladePhase === 3 && (
            /* Phase 3: Stepped 67.5° Clockwise Tilt */
            <g data-blade-phase="3">
              <path
                d="M180 12h4v16h4v16h4v8h4v16h4v16h-4v-16h-4v-16h-4v-8h-4v-16h-4Z M208 36h16v4h-16v4h-16v4h-8v4h-16v4h-16v-4h16v-4h16v-4h8v-4h16Z"
                fill="#e2e8f0"
              />
              <rect x="172" y="14" width="8" height="20" fill="#facc15" />
              <rect x="200" y="60" width="8" height="20" fill="#facc15" />
              <rect x="204" y="28" width="20" height="8" fill="#facc15" />
              <rect x="156" y="58" width="20" height="8" fill="#facc15" />
            </g>
          )}
          {/* Center Hub */}
          <rect x="186" y="44" width="8" height="8" fill="#f59e0b" />
        </g>

        {/* Golden Wheat Field Stalks batched by color */}
        <g data-wheat-field="batched">
          <path d={lowerStemPath} fill="#ca8a04" />
          <path d={midStemPath} fill="#eab308" />
          <path d={earTipPath} fill="#fde047" />
        </g>
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            className={`px-btn ${activePlaying ? 'px-btn-active' : ''}`}
            aria-pressed={activePlaying}
            disabled={!isAllowed || wind === 0}
            onClick={() => setPlaying((p) => !p)}
          >
            {activePlaying ? t('demos.pixelart.mill.pause') : t('demos.pixelart.mill.play')}
          </button>
          <button
            type="button"
            className={`px-btn ${duskSky ? 'px-btn-active' : ''}`}
            aria-pressed={duskSky}
            onClick={() => setDuskSky((d) => !d)}
          >
            {duskSky ? t('demos.pixelart.mill.dusk') : t('demos.pixelart.mill.noon')}
          </button>
        </div>
        <div className="px-slider-row">
          <label className="px-slider-label" htmlFor={`${id}-wind`}>
            <span className="px-slider-name">{t('demos.pixelart.mill.wind')}</span>
            <input
              id={`${id}-wind`}
              type="range"
              className="px-slider"
              min={0}
              max={3}
              step={1}
              value={wind}
              aria-controls={id}
              onChange={(e) => {
                const val = Number(e.target.value);
                setWind(val);
                if (val > 0) {
                  setTick((tVal) => (tVal + 1) % 8);
                }
              }}
            />
            <span className="px-slider-val">{`${wind}/3`}</span>
          </label>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 5. px-lava-channel-flow — Lava Channel Flow & Crust Drift
// ============================================================================
const CRUST_PLATES = [
  { baseX: 28, y: 102, w: 18, h: 6 },
  { baseX: 88, y: 112, w: 22, h: 7 },
  { baseX: 152, y: 104, w: 16, h: 6 },
  { baseX: 208, y: 116, w: 20, h: 6 },
  { baseX: 56, y: 122, w: 14, h: 5 },
  { baseX: 118, y: 98, w: 16, h: 5 },
  { baseX: 178, y: 120, w: 18, h: 6 },
  { baseX: 234, y: 106, w: 14, h: 5 },
] as const;

export function LavaChannelFlowDemo() {
  const { t } = useLocale();
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(2);
  const [playing, setPlaying] = useState(true);
  const [denseCrust, setDenseCrust] = useState(false);

  const isAllowed = usePixelAnimation(
    () => {
      setPhase((prev) => (prev + 1) % 6);
    },
    playing ? 130 : null,
    containerRef
  );
  const activePlaying = playing && isAllowed;

  const visiblePlates = denseCrust ? CRUST_PLATES : CRUST_PLATES.slice(0, 4);

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demos.pixelart.art.lavaChannelFlow')}
      >
        {/* Basalt cavern walls */}
        <rect width="264" height="144" fill="#140c17" />
        <polygon points="0,0 96,0 76,88 0,88" fill="#231629" />
        <polygon points="168,0 264,0 264,88 188,88" fill="#231629" />

        {/* Glowing wall fissures */}
        <g fill={phase % 2 === 0 ? '#f97316' : '#facc15'}>
          <rect x="28" y="34" width="16" height="3" />
          <rect x="40" y="37" width="3" height="14" />
          <rect x="212" y="28" width="18" height="3" />
          <rect x="212" y="31" width="3" height="16" />
        </g>

        {/* Lava waterfall cascade in center */}
        <rect x="104" y="18" width="56" height="72" fill="#b91c1c" />
        <rect x="112" y="18" width="40" height="72" fill="#ea580c" />
        <rect
          x={120 + (phase % 2) * 4}
          y="18"
          width="20"
          height="72"
          fill="#facc15"
        />
        <rect
          x="126"
          y={24 + phase * 8}
          width="8"
          height="18"
          fill="#fef08a"
        />

        {/* Lower Molten Lava River Channel */}
        <rect x="0" y="88" width="264" height="56" fill="#7f1d1d" />
        <rect x="0" y="94" width="264" height="42" fill="#dc2626" />
        <rect x="0" y="100" width="264" height="28" fill="#f97316" />

        {/* Phase-shifted white/yellow hot core ribbons */}
        {[0, 1, 2, 3].map((band) => {
          const bx = (band * 66 + phase * 11) % 244;
          return (
            <g key={band}>
              <rect x={bx} y="106" width="34" height="8" fill="#facc15" />
              <rect x={bx + 6} y="108" width="18" height="4" fill="#fef08a" />
            </g>
          );
        })}

        {/* Cooled drifting basalt crust islands */}
        {visiblePlates.map((p, idx) => {
          const px = (p.baseX + phase * 10) % 244;
          return (
            <g key={idx}>
              <rect x={px - 1} y={p.y - 1} width={p.w + 2} height={p.h + 2} fill="#facc15" />
              <rect x={px} y={p.y} width={p.w} height={p.h} fill="#1e1b24" />
            </g>
          );
        })}

        {/* Rising volcanic ash & sparks */}
        <g fill="#fef08a">
          <rect x="92" y={74 - phase * 7} width="3" height="3" />
          <rect x="144" y={66 - phase * 6} width="3" height="3" />
          <rect x="172" y={80 - phase * 8} width="2" height="2" />
        </g>
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            className={`px-btn ${activePlaying ? 'px-btn-active' : ''}`}
            aria-pressed={activePlaying}
            disabled={!isAllowed}
            onClick={() => setPlaying((p) => !p)}
          >
            {activePlaying ? t('demos.pixelart.lava.pause') : t('demos.pixelart.lava.play')}
          </button>
          <button
            type="button"
            className={`px-btn ${denseCrust ? 'px-btn-active' : ''}`}
            aria-pressed={denseCrust}
            onClick={() => setDenseCrust((d) => !d)}
          >
            {denseCrust ? t('demos.pixelart.lava.crustHigh') : t('demos.pixelart.lava.crustLow')}
          </button>
        </div>
        <div className="px-slider-row">
          <label className="px-slider-label" htmlFor={`${id}-lava`}>
            <span className="px-slider-name">{t('demos.pixelart.lava.phase')}</span>
            <input
              id={`${id}-lava`}
              type="range"
              className="px-slider"
              min={0}
              max={5}
              step={1}
              value={phase}
              aria-controls={id}
              onChange={(e) => {
                setPlaying(false);
                setPhase(Number(e.target.value));
              }}
            />
            <span className="px-slider-val">{`#${phase + 1}/6`}</span>
          </label>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 6. px-forest-canopy-shafts — Forest Canopy Light Shafts
// ============================================================================
const SHAFT_ORIGINS: Record<1 | 3 | 5, ReadonlyArray<number>> = {
  1: [124],
  3: [68, 124, 180],
  5: [38, 82, 124, 168, 212],
};

export function ForestCanopyShaftsDemo() {
  const { t } = useLocale();
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [shaftCount, setShaftCount] = useState<1 | 3 | 5>(3);
  const [sunAngle, setSunAngle] = useState(0);
  const [pollen, setPollen] = useState(true);

  const origins = SHAFT_ORIGINS[shaftCount];
  const floorOffset = Math.round(sunAngle * 1.6);

  return (
    <div ref={containerRef} className="px-demo-container">
      <svg
        id={id}
        className="px-art-svg"
        viewBox="0 0 264 144"
        role="img"
        aria-label={t('demos.pixelart.art.forestCanopyShafts')}
      >
        {/* Deep woodland backdrop & background tree trunks */}
        <rect width="264" height="144" fill="#071712" />
        <g fill="#0c241b">
          <rect x="22" y="18" width="16" height="102" />
          <rect x="86" y="18" width="14" height="102" />
          <rect x="166" y="18" width="16" height="102" />
          <rect x="224" y="18" width="18" height="102" />
        </g>

        {/* Forest floor & ancient mossy altar */}
        <rect x="0" y="116" width="264" height="28" fill="#0f291e" />
        <rect x="112" y="96" width="40" height="20" fill="#334155" />
        <rect x="116" y="88" width="32" height="8" fill="#475569" />
        <rect x="116" y="88" width="32" height="3" fill="#22c55e" />

        {/* Volumetric Sunbeam Shaft Polygons & Floor Light Pools */}
        {origins.map((topX, idx) => {
          const bottomX = topX + floorOffset;
          return (
            <g key={idx}>
              <polygon
                points={`${topX - 8},16 ${topX + 8},16 ${bottomX + 18},122 ${bottomX - 18},122`}
                fill="#fef08a"
                opacity="0.24"
              />
              <polygon
                points={`${topX - 4},16 ${topX + 4},16 ${bottomX + 9},122 ${bottomX - 9},122`}
                fill="#fef9c3"
                opacity="0.22"
              />
              {/* Bright floor light pool */}
              <rect
                x={bottomX - 18}
                y="118"
                width="36"
                height="6"
                fill="#86efac"
                opacity="0.65"
              />
              {/* Illuminated pollen motes inside shaft */}
              {pollen && (
                <g fill="#fef08a">
                  <rect x={Math.round((topX + bottomX) / 2) - 4} y="48" width="3" height="3" />
                  <rect x={Math.round((topX + bottomX) / 2) + 3} y="74" width="2" height="2" />
                  <rect x={bottomX - 2} y="98" width="3" height="3" />
                </g>
              )}
            </g>
          );
        })}

        {/* Upper Canopy Silhouette with Leaf Clusters */}
        <rect x="0" y="0" width="264" height="20" fill="#05110d" />
        <g fill="#0c291e">
          <rect x="0" y="14" width="32" height="12" />
          <rect x="46" y="14" width="24" height="10" />
          <rect x="94" y="14" width="22" height="12" />
          <rect x="142" y="14" width="26" height="10" />
          <rect x="194" y="14" width="24" height="12" />
          <rect x="234" y="14" width="30" height="12" />
        </g>
      </svg>

      <div className="px-ctrl-bar">
        <div className="px-btn-row">
          <button
            type="button"
            className={`px-btn ${shaftCount === 1 ? 'px-btn-active' : ''}`}
            aria-pressed={shaftCount === 1}
            onClick={() => setShaftCount(1)}
          >
            {t('demos.pixelart.forest.shafts1')}
          </button>
          <button
            type="button"
            className={`px-btn ${shaftCount === 3 ? 'px-btn-active' : ''}`}
            aria-pressed={shaftCount === 3}
            onClick={() => setShaftCount(3)}
          >
            {t('demos.pixelart.forest.shafts3')}
          </button>
          <button
            type="button"
            className={`px-btn ${shaftCount === 5 ? 'px-btn-active' : ''}`}
            aria-pressed={shaftCount === 5}
            onClick={() => setShaftCount(5)}
          >
            {t('demos.pixelart.forest.shafts5')}
          </button>
          <button
            type="button"
            className={`px-btn ${pollen ? 'px-btn-active' : ''}`}
            aria-pressed={pollen}
            onClick={() => setPollen((p) => !p)}
          >
            {t('demos.pixelart.forest.pollen')}
          </button>
        </div>
        <div className="px-slider-row">
          <label className="px-slider-label" htmlFor={`${id}-angle`}>
            <span className="px-slider-name">{t('demos.pixelart.forest.angle')}</span>
            <input
              id={`${id}-angle`}
              type="range"
              className="px-slider"
              min={-20}
              max={20}
              step={5}
              value={sunAngle}
              aria-controls={id}
              onChange={(e) => setSunAngle(Number(e.target.value))}
            />
            <span className="px-slider-val">{`${sunAngle}°`}</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export const PIXEL_ENVIRONMENTS_EXPANSION_DEMOS = {
  'px-snow-village-accumulation': SnowVillageAccumulationDemo,
  'px-aurora-tundra-bands': AuroraTundraBandsDemo,
  'px-underwater-ruin-caustics': UnderwaterRuinCausticsDemo,
  'px-windmill-wheat-breeze': WindmillWheatBreezeDemo,
  'px-lava-channel-flow': LavaChannelFlowDemo,
  'px-forest-canopy-shafts': ForestCanopyShaftsDemo,
} as const;
