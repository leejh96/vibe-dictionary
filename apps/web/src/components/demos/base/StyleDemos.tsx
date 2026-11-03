import { useDemoToggle } from '../../../hooks/useDemoAutoplay';
import { useLocale } from '../../../i18n/LocaleContext';
import React, { useState } from 'react';



/* ============================================================================
 * DOMAIN 4: 디자인 스타일 & 테마 데모 (16종)
 * ============================================================================ */

/* 1. 네오 브루탈리즘 (Neo-Brutalism) */
export const StNeoBrutalismDemo: React.FC = () => {
  const { t } = useLocale();
  const [pressed, setPressed] = useDemoToggle(false);
  return (
    <div className="w-full h-40 flex items-center justify-center bg-amber-300/95 select-none">
      <button
        onClick={() => setPressed(!pressed)}
        style={{
          boxShadow: pressed ? '1px 1px 0px #000' : '5px 5px 0px #000',
          transform: pressed ? 'translate(4px, 4px)' : 'translate(0px, 0px)',
        }}
        className="px-5 py-2.5 bg-pink-400 border-[3px] border-black text-black font-black text-xs tracking-wide transition-all duration-100"
      >{t("sample.stNeoBrutalism.neoBrutalClick")}</button>
    </div>
  );
};


/* 2. 리퀴드 아크릴 글래스 (Liquid Acrylic Glass) */
export const StLiquidAcrylicDemo: React.FC = () => {
  const { t } = useLocale();
  return (
    <div className="relative w-full h-40 flex items-center justify-center overflow-hidden select-none">
      <div className="w-24 h-24 rounded-full bg-fuchsia-500/70 blur-xl absolute -left-2 animate-aurora-1" />
      <div className="w-24 h-24 rounded-full bg-cyan-400/70 blur-xl absolute right-2 animate-aurora-2" />
      <div className="relative z-10 w-52 h-24 rounded-2xl bg-linear-to-b from-white/20 to-white/5 backdrop-blur-xl border border-white/30 shadow-2xl p-3.5 flex flex-col justify-between">
        <span className="text-[10px] font-mono text-white/90">{t("sample.stLiquidAcrylic.liquidAcrylic")}</span>
        <span className="text-xs font-extrabold text-white">{t("demo.luminousTranslucentAcrylic")}</span>
      </div>
    </div>
  );
};


/* 3. 리니어풍 다크 미니멀 (Linear-Style Dark Minimal) */
export const StLinearDarkMinimalDemo: React.FC = () => {
  const { t } = useLocale();
  return (
    <div className="w-full h-40 flex items-center justify-center bg-[#090A0F] px-6 pt-5 select-none">
      <div className="relative w-full h-24 rounded-xl bg-[#12131A] border border-white/10 p-3.5 flex flex-col justify-between overflow-hidden">
        <div className="pointer-events-none absolute top-0 left-6 right-6 h-px bg-linear-to-r from-transparent via-indigo-400/80 to-transparent" />
        <span className="text-[10px] font-mono text-slate-400">{t("sample.stLinearDarkMinimal.hairline")}</span>
        <span className="text-xs font-bold bg-linear-to-r from-white to-slate-400 bg-clip-text text-transparent">{t("sample.stLinearDarkMinimal.linearPrecisionDarkUi")}</span>
      </div>
    </div>
  );
};


/* 4. 매트 필름 그레인 텍스처 (Matte Film Grain) */
export const StMatteFilmGrainDemo: React.FC = () => {
  const { t } = useLocale();
  return (
    <div className="relative w-full h-40 flex items-center justify-center bg-stone-900 overflow-hidden select-none">
      <div
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.13) 0.75px, transparent 0), radial-gradient(rgba(254,243,199,0.1) 0.75px, transparent 0), radial-gradient(rgba(0,0,0,0.28) 0.85px, transparent 0)',
          backgroundSize: '4px 4px, 5px 5px, 3px 3px', backgroundPosition: '0 0, 2px 1px, 1px 2px',
        }}
        className="pointer-events-none absolute inset-0 opacity-60"
      />
      <div className="relative z-10 px-5 py-3 rounded-xl bg-stone-800/90 border border-stone-600/50 text-center">
        <span className="text-[10px] font-mono text-amber-200/80">{t("sample.stMatteFilmGrain.analogFilmGrain")}</span>
        <p className="text-xs font-bold text-stone-100 mt-0.5">{t("demo.aSubtleMatteGrainTexture")}</p>
      </div>
    </div>
  );
};


/* 5. 뉴모피즘 소프트 엠보싱 (Neumorphism Soft UI) */
export const StNeumorphismSoftDemo: React.FC = () => {
  const { t } = useLocale();
  const [inset, setInset] = useDemoToggle(false);
  return (
    <div className="w-full h-40 flex items-center justify-center bg-slate-800 select-none">
      <button
        onClick={() => setInset(!inset)}
        style={{
          boxShadow: inset
            ? 'inset 5px 5px 10px #0f172a, inset -5px -5px 10px #334155'
            : '6px 6px 12px #0f172a, -6px -6px 12px #334155',
        }}
        className="px-6 py-3 rounded-2xl bg-slate-800 text-xs font-extrabold text-slate-200 transition-all"
      >
        {inset ? t("demo.insetSurfaceClick") : t("demo.raisedSurfaceClick")}
      </button>
    </div>
  );
};


/* 6. 클레이모피즘 3D 점토 (Claymorphism 3D) */
export const StClaymorphism3DDemo: React.FC = () => {
  const { t } = useLocale();
  const [bounce, setBounce] = useDemoToggle(false);
  return (
    <div className="w-full h-40 flex items-center justify-center select-none">
      <div data-demo-control
        role="button" tabIndex={0} onClick={() => setBounce(!bounce)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setBounce(!bounce); } }}
        style={{
          boxShadow:
            '0 12px 20px rgba(0,0,0,0.45), inset -6px -6px 12px rgba(79,70,229,0.7), inset 6px 6px 12px rgba(255,255,255,0.45)',
        }}
        className={`px-6 py-3.5 rounded-[24px] bg-indigo-400 text-slate-950 font-black text-xs cursor-pointer transition-transform ${
          bounce ? 'scale-95' : 'hover:scale-105'
        }`}
      >{t("demo.aSoftPuffy3dClayCard")}</div>
    </div>
  );
};


/* 7. 스큐어모피즘 리얼 촉감 스위치 (Tactile Skeuomorphism) */
export const StSkeuomorphismTactileDemo: React.FC = () => {
  const { t } = useLocale();
  const [on, setOn] = useDemoToggle(true);
  return (
    <div className="w-full h-40 flex items-center justify-center select-none">
      <button
        onClick={() => setOn(!on)}
        style={{
          boxShadow: on
            ? 'inset 0 2px 5px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.15)'
            : '0 6px 10px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.35)',
        }}
        className={`px-6 py-3 rounded-xl border border-slate-700 bg-linear-to-b from-slate-700 to-slate-900 flex items-center gap-2.5 transition-all ${
          on ? 'translate-y-0.5' : ''
        }`}
      >
        <span
          className={`w-2.5 h-2.5 rounded-full ${
            on
              ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
              : 'bg-slate-600'
          }`}
        />
        <span className="text-xs font-mono font-bold text-slate-200">
          {on ? t("sample.stSkeuomorphismTactile.hardwareOn") : t("sample.stSkeuomorphismTactile.hardwareOff")}
        </span>
      </button>
    </div>
  );
};


/* 8. 페이퍼 컷아웃 레이어 (Paper Cutout Collage) */
export const StPaperCutoutLayerDemo: React.FC = () => {
  const { t } = useLocale();
  return (
    <div className="w-full h-40 flex items-center justify-center pt-3 select-none">
      <div className="relative w-48 h-24 flex items-center justify-center">
        <div className="absolute inset-0 rounded-xl bg-amber-400 rotate-[-4deg] shadow-md" />
        <div className="absolute inset-0 rounded-xl bg-rose-500 rotate-3 shadow-md" />
        <div className="relative z-10 w-full h-full rounded-xl bg-slate-900 border-2 border-white/80 flex flex-col items-center justify-center shadow-lg">
          <span className="text-xs font-black text-white">{t("sample.stPaperCutoutLayer.paperCutout")}</span>
          <span className="text-[10px] text-amber-300">{t("demo.layersOfCutPaper")}</span>
        </div>
      </div>
    </div>
  );
};


/* 9. 8비트 픽셀 아케이드 레트로 (8-Bit Pixel Retro) */
export const St8BitPixelRetroDemo: React.FC = () => {
  const { t } = useLocale();
  const [coins, setCoins] = useState(99);
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center bg-slate-950 select-none">
      <button
        onClick={() => setCoins((c) => c + 1)}
        style={{ boxShadow: '4px 4px 0px #1e1b4b' }}
        className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-400 border-2 border-white text-slate-950 font-mono font-black text-xs active:translate-y-0.5"
      ><svg viewBox="0 0 8 8" aria-hidden="true" className="w-3.5 h-3.5 shrink-0" shapeRendering="crispEdges"><path d="M2 0h4v1h1v1h1v4H7v1H6v1H2V7H1V6H0V2h1V1h1V0z" fill="#f59e0b" /><path d="M3 2h2v4H3V2z" fill="#fef3c7" /></svg><span>{t("sample.st8BitPixelRetro.insertCoin")}{coins}</span>
      </button>
    </div>
  );
};


/* 10. 윈도우95 클래식 데스크탑 (Win95 Classic OS) */
export const StWin95RetroOsDemo: React.FC = () => {
  const { t } = useLocale();
  return (
    <div className="w-full h-40 flex items-center justify-center bg-[#008080] px-6 pt-4 select-none">
      <div
        style={{
          borderTop: '2px solid #ffffff',
          borderLeft: '2px solid #ffffff',
          borderRight: '2px solid #000000',
          borderBottom: '2px solid #000000',
        }}
        className="w-56 bg-[#c0c0c0] p-1 text-black"
      >
        <div className="bg-[#000080] text-white px-2 py-0.5 text-[10px] font-bold flex items-center justify-between">
          <span>{t("sample.stWin95RetroOs.vibe95Exe")}</span>
          <span className="bg-[#c0c0c0] text-black px-1 font-mono text-[9px]">×</span>
        </div>
        <div className="p-2.5 text-center">
          <p className="text-[11px] font-bold">{t("sample.stWin95RetroOs.classic3dBevelWindow")}</p>
        </div>
      </div>
    </div>
  );
};


/* 11. CRT 브라운관 그린 터미널 (CRT Scanline Terminal) */
export const StCrtScanlineTerminalDemo: React.FC = () => {
  const { t } = useLocale();
  return (
    <div className="relative w-full h-40 flex flex-col items-center justify-center bg-[#041208] overflow-hidden select-none">
      <div
        style={{
          background:
            'repeating-linear-gradient(0deg, rgba(0,0,0,0.38) 0px, rgba(0,0,0,0.38) 1px, transparent 1px, transparent 3px)',
        }}
        className="pointer-events-none absolute inset-0 z-10"
      />
      <div className="font-mono text-xs font-bold text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]">
        {t("sample.stCrtScanlineTerminal.gtSystemReady")}
      </div>
    </div>
  );
};


/* 12. 신스웨이브 선셋 그리드 (Synthwave 80s Grid) */
export const StSynthwaveSunsetGridDemo: React.FC = () => {
  const { t } = useLocale();
  return (
    <div className="relative w-full h-40 flex flex-col items-center justify-end overflow-hidden bg-linear-to-b from-[#1a052e] via-[#3b0764] to-[#be185d] select-none pb-3">
      <div className="w-10 h-10 rounded-full bg-linear-to-b from-amber-300 to-rose-500 mb-1.5 shadow-[0_0_20px_#f43f5e]" />
      <div
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(244,114,182,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(244,114,182,0.4) 1px, transparent 1px)',
          backgroundSize: '16px 10px',
          transform: 'perspective(120px) rotateX(55deg)',
        }}
        className="w-full h-12 border-t border-pink-400"
      />
      <span className="relative z-10 text-[10px] font-mono font-black tracking-widest text-cyan-300">{t("sample.stSynthwaveSunsetGrid.synthwave1984")}</span>
    </div>
  );
};


/* 13. SF 사이버네틱 HUD 프레임 (Sci-Fi Chamfered HUD) */
export const StScifiHudChamferDemo: React.FC = () => {
  const { t } = useLocale();
  const chamferClip =
    'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)';
  return (
    <div className="w-full h-40 flex items-center justify-center px-6 pt-4 select-none">
      <div
        style={{ clipPath: chamferClip }}
        className="w-56 h-24 p-[1.5px] bg-cyan-400/80 shadow-[0_0_16px_rgba(34,211,238,0.25)]"
      >
        <div
          style={{ clipPath: chamferClip }}
          className="w-full h-full bg-slate-950/90 p-3.5 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-[9px] font-mono text-cyan-300">
            <span>{t("sample.stScifiHudChamfer.sysHud45Chamfer")}</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />{t("sample.stScifiHudChamfer.online")}</span>
          </div>
          <div className="text-xs font-black tracking-wider text-white">{t("sample.stScifiHudChamfer.tacticalFrameUi")}</div>
        </div>
      </div>
    </div>
  );
};


/* 14. 엔지니어링 블루프린트 도면 (Architectural Blueprint) */
export const StArchitectBlueprintDemo: React.FC = () => {
  const { t } = useLocale();
  return (
    <div
      style={{
        backgroundImage:
          'linear-gradient(rgba(56,189,248,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.18) 1px, transparent 1px)',
        backgroundSize: '14px 14px',
      }}
      className="w-full h-40 flex items-center justify-center bg-[#0a2540] px-6 select-none"
    >
      <div className="relative border border-dashed border-sky-300/80 px-5 py-3 text-center">
        <span className="absolute -top-2 left-2 bg-[#0a2540] px-1 text-[9px] font-mono text-sky-300">{t("sample.stArchitectBlueprint.dimensions")}</span>
        <p className="font-mono text-xs font-bold text-white">{t("sample.stArchitectBlueprint.cadBlueprint")}</p>
      </div>
    </div>
  );
};


/* 15. 스위스 국제 타이포그래피 그리드 (Swiss International Grid) */
export const StSwissEditorialGridDemo: React.FC = () => {
  const { t } = useLocale();
  return (
    <div className="w-full h-40 flex items-center justify-center bg-stone-100 text-stone-950 px-6 pt-6 select-none">
      <div className="w-full h-24 border-2 border-stone-950 grid grid-cols-3">
        <div className="border-r-2 border-stone-950 bg-red-600 text-white p-2 flex flex-col justify-between">
          <span className="text-[9px] font-mono font-bold">01</span>
          <span className="text-sm font-black">{t("sample.stSwissEditorialGrid.swiss")}</span>
        </div>
        <div className="col-span-2 p-2 flex flex-col justify-between">
          <span className="text-[9px] font-mono uppercase tracking-widest">{t("sample.stSwissEditorialGrid.gridSystem1957")}</span>
          <p className="text-xs font-black leading-tight break-keep">{t("demo.exposedGridLinesAndBoldTypography")}</p>
        </div>
      </div>
    </div>
  );
};


/* 16. 코믹스 팝아트 망점 (Comic Halftone Pop-Art) */
export const StComicHalftonePopDemo: React.FC = () => {
  const { t } = useLocale();
  const [bang, setBang] = useDemoToggle(false);
  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setBang(!bang)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setBang(!bang); } }}
      style={{
        backgroundImage: 'radial-gradient(#f43f5e 1.5px, transparent 1.5px)',
        backgroundSize: '8px 8px',
      }}
      className="w-full h-40 flex items-center justify-center bg-amber-300 cursor-pointer select-none"
    >
      <div
        style={{ boxShadow: '5px 5px 0px #000' }}
        className={`px-5 py-2 bg-white border-[3px] border-black text-black font-black text-sm transition-transform ${
          bang ? 'rotate-3 scale-110' : '-rotate-3'
        }`}
      >
        {bang ? t("sample.stComicHalftonePop.pow") : t("demo.bamClick")}
      </div>
    </div>
  );
};


/* [스타일 +1] 홀로그래픽 포일 이리데슨트 (Holographic Foil Iridescent Style) */
export const StHolographicFoilCardDemo: React.FC = () => {
  const { t } = useLocale();
  const [angle, setAngle] = useState(125);

  return (
    <div data-demo-control
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        setAngle(Math.round(90 + pct * 140));
      }}
      role="button" tabIndex={0} onClick={() => setAngle((a) => (a + 45) % 360)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setAngle((a) => (a + 45) % 360); } }}
      className="w-full h-40 flex items-center justify-center pt-5 px-5 cursor-pointer select-none"
    >
      <div
        style={{
          backgroundImage: `linear-gradient(${angle}deg, #ff0080 0%, #7928ca 28%, #00e5ff 58%, #00ff88 85%, #fde047 100%)`,
        }}
        className="relative w-full max-w-[205px] h-24 rounded-2xl p-[1.5px] shadow-[0_0_24px_rgba(0,229,255,0.25)] transition-all duration-200 overflow-hidden"
      >
        <div
          style={{
            backgroundImage: `linear-gradient(${angle}deg, rgba(255,0,128,0.32), rgba(0,229,255,0.32), rgba(0,255,136,0.28), rgba(253,224,71,0.32))`,
          }}
          className="w-full h-full rounded-[14px] bg-slate-950/80 backdrop-blur-md p-3 flex flex-col justify-between relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="px-1.5 py-0.5 rounded-sm bg-white/15 border border-white/30 text-[8px] font-black text-white tracking-wider">{t("sample.stHolographicFoilCard.holoFoil")}</span>
            <span className="text-[9px] font-mono text-cyan-200">{t("sample.stHolographicFoilCard.edition")}</span>
          </div>
          <div>
            <div className="text-xs font-black text-white drop-shadow-sm">{t("sample.stHolographicFoilCard.iridescentPrism")}</div>
          </div>
        </div>
      </div>
    </div>
  );
};


/* [스타일 +2] 서멀 영수증 & 바코드 티켓 (Thermal Receipt & Barcode Ticket) */
export const StReceiptThermalMonoDemo: React.FC = () => {
  const { t } = useLocale();
  const [stamped, setStamped] = useDemoToggle(true);
  const bars = [2, 1, 3, 1, 2, 1, 4, 1, 2, 2, 1, 3, 1, 2, 1, 3, 2, 1];

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setStamped((s) => !s)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setStamped((s) => !s); } }}
      className="w-full h-40 flex items-center justify-center pt-5 px-5 cursor-pointer select-none"
    >
      <div className="relative w-full max-w-[195px] bg-[#faf8f5] text-zinc-900 rounded-xs px-3 py-2 font-mono shadow-lg border-y-2 border-dashed border-zinc-400">
        <div className="flex items-center justify-between text-[9px] font-bold border-b border-dashed border-zinc-400 pb-1">
          <span>{t("sample.stReceiptThermalMono.vibeMart042")}</span>
          <span>2026-10-17</span>
        </div>
        <div className="py-1 space-y-0.5 text-[9px]">
          <div className="flex justify-between">
            <span>{t("sample.stReceiptThermalMono.uiItem")}</span>
            <span className="font-bold">$24.00</span>
          </div>
          <div className="flex justify-between text-zinc-600">
            <span>{t("sample.stReceiptThermalMono.motionItem")}</span>
            <span className="font-bold">$18.00</span>
          </div>
        </div>
        {/* 바코드 영역 */}
        <div className="pt-1 border-t border-dashed border-zinc-400 flex items-center justify-between">
          <div className="flex items-center gap-[1.5px] h-3.5">
            {bars.map((w, i) => (
              <span
                key={i}
                style={{ width: `${w * 1.5}px` }}
                className="h-full bg-[#18181b] inline-block"
              />
            ))}
          </div>
          <span
            className={`px-1 py-0.5 text-[8px] font-black border ${
              stamped ? 'border-rose-600 text-rose-600 -rotate-6' : 'border-zinc-500 text-zinc-500'
            } transition-transform`}
          >
            {stamped ? t("sample.stReceiptThermalMono.paid") : t("sample.stReceiptThermalMono.receipt")}
          </span>
        </div>
      </div>
    </div>
  );
};


/* [스타일 +3] Y2K 애시드 크롬 & 파스텔 윈도우 (Y2K Metallic Chrome & Pastel UI) */
export const StVaporwaveY2kChromeDemo: React.FC = () => {
  const { t } = useLocale();
  const [liked, setLiked] = useState(true);

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setLiked((l) => !l)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLiked((l) => !l); } }}
      className="w-full h-40 flex items-center justify-center pt-5 px-5 cursor-pointer select-none"
    >
      <div className="w-full max-w-[205px] rounded-xl border-2 border-white bg-linear-to-br from-pink-200 via-fuchsia-100 to-sky-200 p-2 shadow-[0_4px_16px_rgba(244,114,182,0.35)] text-slate-900">
        {/* Y2K 메탈릭 크롬 상단 바 */}
        <div
          style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #cbd5e1 48%, #64748b 52%, #f1f5f9 100%)',
          }}
          className="rounded-lg px-2 py-0.5 border border-slate-400 flex items-center justify-between text-[9px] font-black text-slate-800 mb-1.5"
        >
          <span>{t("sample.stVaporwaveY2kChrome.cyberGirl2000Exe")}</span>
          <span className="text-pink-600">♥</span>
        </div>

        <div className="flex items-center justify-between px-1 py-1">
          <div>
            <div className="text-[11px] font-black tracking-tight text-fuchsia-900">{t("sample.stVaporwaveY2kChrome.aestheticChrome")}</div>
            <div className="text-[9px] font-semibold text-sky-800">{t("sample.stVaporwaveY2kChrome.track01BubblegumPop")}</div>
          </div>
          <span
            style={{
              background: 'linear-gradient(180deg, #f8fafc 0%, #94a3b8 50%, #e2e8f0 100%)',
            }}
            className="px-2 py-1 rounded-full border border-slate-500 text-[9px] font-black text-slate-900 shadow-xs"
          >
            {liked ? t("sample.stVaporwaveY2kChrome.play") : t("sample.stVaporwaveY2kChrome.cue")}
          </span>
        </div>
      </div>
    </div>
  );
};


/* [스타일 +4] 사이버펑크 하이볼티지 네온 (Cyberpunk High-Voltage Neon UI) */
export const StCyberpunkNeonGlitchDemo: React.FC = () => {
  const { t } = useLocale();
  const [overdrive, setOverdrive] = useDemoToggle(true);

  return (
    <div data-demo-control
      role="button" tabIndex={0} onClick={() => setOverdrive((o) => !o)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOverdrive((o) => !o); } }}
      className="w-full h-40 flex items-center justify-center pt-5 px-5 cursor-pointer select-none"
    >
      <div
        style={{
          clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
        }}
        className="w-full max-w-[205px] bg-[#facc15] text-zinc-950 p-2.5 relative shadow-[0_0_20px_rgba(250,204,21,0.3)] border-l-4 border-cyan-400"
      >
        <div className="flex items-center justify-between mb-1">
          <span className="bg-zinc-950 text-[#00f0ff] text-[8px] font-mono font-black px-1.5 py-0.5 tracking-wider">{t("sample.stCyberpunkNeonGlitch.nc2077Sys")}</span>
          <span className="text-[8px] font-mono font-black text-zinc-900">{t("sample.stCyberpunkNeonGlitch.voltage994v")}</span>
        </div>

        <div className="text-xs font-black tracking-tight uppercase leading-tight">
          {overdrive ? t("sample.stCyberpunkNeonGlitch.neonOverdrive") : t("sample.stCyberpunkNeonGlitch.breachProtocol")}
        </div>

        {/* 하단 해저드 스트라이프 바 */}
        <div
          style={{
            backgroundImage:
              'repeating-linear-gradient(-45deg, #09090b 0px, #09090b 5px, #facc15 5px, #facc15 10px)',
          }}
          className="mt-2 h-2 w-full rounded-xs border border-zinc-950"
        />
      </div>
    </div>
  );
};
