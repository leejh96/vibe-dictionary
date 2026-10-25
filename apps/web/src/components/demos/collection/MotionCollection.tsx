import { useId, useMemo } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';
import { useDemoNumber } from '../../../hooks/useDemoAutoplay';
import { Art, Landscape, Stage, palette } from './shared';

const tau = Math.PI * 2;
const points = (count: number, sample: (t: number, i: number) => [number,number]) => Array.from({length:count},(_,i)=>sample(i/(count-1),i).join(',')).join(' ');

export function SpirographCurve() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1);
  const curve=points(501,(v)=>{const a=v*tau*5;return [140+43*Math.cos(a)+(18+12*p)*Math.cos(a*3.4),80+43*Math.sin(a)-(18+12*p)*Math.sin(a*3.4)];});
  return <Stage label={t('demo.collection.spirograph')} className="cx-night"><Art><polyline points={curve} fill="none" stroke="#c4b5fd" strokeWidth="1.3" /><circle cx="140" cy="80" r="3" fill="#bef264" /></Art></Stage>;
}
export function LissajousRibbon() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1); const id=useId();
  return <Stage label={t('demo.collection.lissajous')} className="cx-night"><Art><defs><linearGradient id={id}><stop stopColor="#67e8f9"/><stop offset="1" stopColor="#fb7185"/></linearGradient></defs><polyline points={points(240,v=>[140+110*Math.sin(v*tau*3+p*Math.PI),80+57*Math.sin(v*tau*2)])} stroke={`url(#${id})`} fill="none" strokeWidth="3" /></Art></Stage>;
}
export function EccentricRingPoster() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1);
  return <Stage label={t('demo.collection.eccentricRings')} className="cx-paper"><Art>{Array.from({length:11},(_,i)=><circle key={i} cx={110+i*(3+2*p)} cy="80" r={65-i*5.4} fill="none" stroke={i%2?'#b45053':'#583948'} strokeWidth="2" />)}<path d="M220 30v100M210 120h20" stroke="#b45053" /></Art></Stage>;
}
export function TriangulatedMesh() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1); const cx=105+p*65,cy=65+p*30;
  const boundary=[[20,20],[140,12],[260,25],[268,140],[140,150],[15,135]];
  return <Stage label={t('demo.collection.triangleMesh')}><Art>{boundary.map(([x,y],i)=><polygon key={i} points={`${cx},${cy} ${x},${y} ${boundary[(i+1)%6].join(',')}`} fill={palette[i%5]} />)}<circle cx={cx} cy={cy} r="4" fill="white" /></Art></Stage>;
}
export function RecursiveCircleBloom() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1);
  return <Stage label={t('demo.collection.circleBloom')} className="cx-night"><Art><g transform={`translate(140 80) rotate(${p*60})`}><circle r="62" fill="none" stroke="#c4b5fd" />{Array.from({length:6},(_,i)=><g key={i} transform={`rotate(${i*60}) translate(39 0)`}><circle r="23" fill="none" stroke="#67e8f9" />{Array.from({length:3},(_,j)=><circle key={j} cx={13*Math.cos(j*tau/3)} cy={13*Math.sin(j*tau/3)} r="9" fill="#bef26433" stroke="#bef264" strokeWidth=".8" />)}</g>)}</g></Art></Stage>;
}

export function CausticLightBands() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1); const id=useId();
  return <Stage label={t('demo.collection.caustic')} className="cx-night"><Art><defs><filter id={id}><feGaussianBlur stdDeviation="1.2" /></filter></defs><rect width="280" height="160" fill="#07546a" /><g filter={`url(#${id})`}>{Array.from({length:9},(_,i)=><path key={i} d={`M-20 ${i*22-18} Q70 ${i*19+55*p} 140 ${i*21-28}T300 ${i*20+10}`} fill="none" stroke="#a5fff2" opacity={.25+i*.055} strokeWidth={2+Math.sin(i+p*6)*1.3} />)}{Array.from({length:6},(_,i)=><path key={i} d={`M${i*65-20} -10Q${i*40+50*p} 80 ${i*60+20} 170`} fill="none" stroke="#a5fff2" opacity=".28" strokeWidth="3" />)}</g></Art></Stage>;
}
export function DappledLeafShadow() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1); const id=useId();
  return <Stage label={t('demo.collection.leafShadow')} className="cx-paper"><Art><defs><filter id={id}><feGaussianBlur stdDeviation="3" /></filter></defs><rect width="280" height="160" fill="#f5dbac" /><g filter={`url(#${id})`} fill="#584d3e" opacity=".38" transform={`rotate(${-8+p*16} 140 80)`}><path d="M30 180Q120 90 245 -10" stroke="#584d3e" strokeWidth="7" />{Array.from({length:9},(_,i)=><ellipse key={i} cx={55+i*22} cy={145-i*18} rx="30" ry="10" transform={`rotate(${i%2?35:-45} ${55+i*22} ${145-i*18})`} />)}</g><rect x="85" y="44" width="110" height="72" rx="4" fill="#fff" opacity=".4" /></Art></Stage>;
}
export function PlasmaContourField() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1);
  return <Stage label={t('demo.collection.plasmaContours')} className="cx-night"><Art>{Array.from({length:17},(_,i)=><polyline key={i} points={points(65,v=>{const x=v*300-10;return [x,i*12-20+14*Math.sin(v*tau+p*4+i*.23)+9*Math.sin(v*tau*2-i*.3)];})} fill="none" stroke={palette[i%5]} strokeWidth="2" opacity=".8" />)}</Art></Stage>;
}
export function InterferenceLattice() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1); const id=useId();
  return <Stage label={t('demo.collection.interferenceLattice')} className="cx-night"><Art><defs><pattern id={id} width="13" height="13" patternUnits="userSpaceOnUse"><path d="M0 0H13M0 0V13" stroke="#67e8f9" opacity=".65" /></pattern></defs><rect width="280" height="160" fill={`url(#${id})`} /><rect x="-50" y="-80" width="380" height="320" fill={`url(#${id})`} transform={`rotate(${2+p*13} 140 80)`} /></Art></Stage>;
}
export function StarTunnel() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1);
  return <Stage label={t('demo.collection.starTunnel')} className="cx-night"><Art>{Array.from({length:48},(_,i)=>{const a=i*2.39996,r=8+((i*17)%60)*(1+p*2),tail=3+p*13;return <path key={i} d={`M${140+Math.cos(a)*r} ${80+Math.sin(a)*r*.65}l${Math.cos(a)*tail} ${Math.sin(a)*tail*.65}`} stroke={palette[i%5]} opacity={.35+(i%5)*.13} strokeWidth={1+p} />;})}<circle cx="140" cy="80" r="5" fill="#fff" opacity=".5" /></Art></Stage>;
}

export function CoupledPendulumBeat() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1); const time=p*14; const a=.45*Math.cos(time)*Math.cos(time*.18),b=.45*Math.sin(time)*Math.sin(time*.18);
  return <Stage label={t('demo.collection.coupledPendulum')}><Art><path d="M40 22H240" stroke="#8b7cbf" strokeWidth="4" />{[a,b].map((angle,i)=><g key={i}><path d={`M${90+i*100} 24L${90+i*100+Math.sin(angle)*92} ${24+Math.cos(angle)*92}`} stroke="#8b7cbf" strokeWidth="2" /><circle cx={90+i*100+Math.sin(angle)*92} cy={24+Math.cos(angle)*92} r="13" fill={palette[i]} /></g>)}<path d={`M${90+Math.sin(a)*45} ${24+Math.cos(a)*45} L${190+Math.sin(b)*45} ${24+Math.cos(b)*45}`} stroke="#a78bfa" strokeWidth="3" strokeDasharray="3 3" /></Art></Stage>;
}
const gearPoints=(teeth:number,r:number)=>Array.from({length:teeth*4},(_,i)=>{const a=i/(teeth*4)*tau,rr=i%4<2?r+4:r-4;return `${Math.cos(a)*rr},${Math.sin(a)*rr}`;}).join(' ');
export function MeshingGears() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1);
  return <Stage label={t('demo.collection.meshingGears')}><Art><g transform={`translate(104 80) rotate(${p*180})`}><polygon points={gearPoints(16,48)} fill="#9e88d5" /><circle r="16" fill="#f1f0fa" /><circle cx="29" r="5" fill="#fff" /></g><g transform={`translate(176 80) rotate(${-p*360+11.25})`}><polygon points={gearPoints(8,24)} fill="#fb7185" /><circle r="8" fill="#f1f0fa" /><circle cx="15" r="3" fill="#fff" /></g></Art></Stage>;
}
export function HangingCatenary() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1); const a=55+p*120;
  const chain=points(65,v=>{const x=(v-.5)*200;return [140+x,25+a*(Math.cosh(100/a)-Math.cosh(x/a))];});
  return <Stage label={t('demo.collection.catenary')}><Art><path d="M40 20V150M240 20V150" stroke="#8b7cbf44" /><polyline points={chain} fill="none" stroke="#b45309" strokeWidth="5" strokeLinecap="round" strokeDasharray="1 6" /><circle cx="40" cy="25" r="6" fill="#8b5cf6" /><circle cx="240" cy="25" r="6" fill="#8b5cf6" /></Art></Stage>;
}
export function BuoyancyBalance() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1); const fraction=.25+.55*p,y=86-48*(1-fraction);
  return <Stage label={t('demo.collection.buoyancy')}><Art><rect x="20" y="86" width="240" height="66" rx="4" fill="#67e8f950" /><rect x="116" y={y} width="48" height="48" rx="4" fill="#b8865f" stroke="#7e523b" strokeWidth="2" /><path d="M20 86H260" stroke="#06b6d4" strokeWidth="2" /><path d={`M140 ${y+24}v-24m-5 5 5-5 5 5M140 ${y+24}v24m-5-5 5 5 5-5`} stroke="#f43f5e" strokeWidth="2" fill="none" /><text x="140" y="145" textAnchor="middle" fontSize="11" fill="currentColor">{t('demo.collection.submerged',{percent:Math.round(fraction*100)})}</text></Art></Stage>;
}
export function EllipticOrbit() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1); const e=.65,M=p*tau; let E=M; for(let i=0;i<6;i++)E-=(E-e*Math.sin(E)-M)/(1-e*Math.cos(E));
  return <Stage label={t('demo.collection.ellipticOrbit')} className="cx-night"><Art><ellipse cx="140" cy="80" rx="105" ry={105*Math.sqrt(1-e*e)*.68} fill="none" stroke="#a78bfa" strokeDasharray="3 5" /><circle cx={140-105*e} cy="80" r="12" fill="#fbbf24" /><path d={`M${140-105*e} 80L${140-105*Math.cos(E)} ${80+105*Math.sqrt(1-e*e)*.68*Math.sin(E)}`} stroke="#fbbf2455" /><circle cx={140-105*Math.cos(E)} cy={80+105*Math.sqrt(1-e*e)*.68*Math.sin(E)} r="7" fill="#67e8f9" /></Art></Stage>;
}

export function FoldedTypeAccordion() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1); const word=t('demo.collection.foldWord');
  return <Stage label={t('demo.collection.foldedType')}><div className="cx-center" style={{ perspective:500 }}><div className="cx-row" style={{ gap:0 }}>{[...word].map((letter,i)=><span key={i} style={{ display:'inline-block',fontSize:40,fontWeight:900,background:i%2?'#a995d0':'#d4c6ef',color:'#302342',padding:'12px 4px',transform:`rotateY(${(i%2?1:-1)*p*55}deg)`,marginLeft:i?-p*8:0 }}>{letter}</span>)}</div></div></Stage>;
}
export function PinwheelGlyphs() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1);
  return <Stage label={t('demo.collection.pinwheelType')} className="cx-night"><Art><g transform={`rotate(${p*180} 140 80)`}>{Array.from({length:6},(_,i)=><text key={i} x="140" y="38" textAnchor="middle" fill={palette[i%5]} fontWeight="900" fontSize="38" transform={`rotate(${i*60} 140 80)`}>{t('demo.collection.pinwheelGlyph')}</text>)}</g><circle cx="140" cy="80" r="8" fill="#fff" /></Art></Stage>;
}
export function PendulumGlyphs() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1);
  return <Stage label={t('demo.collection.pendulumType')}><Art><path d="M30 20H250" stroke="#8b7cbf66" />{[...t('demo.collection.swingWord')].map((letter,i)=><g key={i} transform={`rotate(${Math.sin(p*tau+i*.5)*22} ${55+i*42} 20)`}><path d={`M${55+i*42} 20v65`} stroke="#8b7cbf" /><text x={55+i*42} y="113" textAnchor="middle" fill={palette[i%5]} stroke="#554470" strokeWidth=".5" fontSize="35" fontWeight="900">{letter}</text></g>)}</Art></Stage>;
}
export function ElasticTracking() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1);
  return <Stage label={t('demo.collection.elasticTracking')}><Art>{[...t('demo.collection.trackWord')].map((letter,i)=><text key={i} x={140+(i-2)*(30+p*18)} y={92+Math.sin(p*Math.PI+i*.7)*5} textAnchor="middle" fontSize="36" fontWeight="900" fill="#a78bfa">{letter}</text>)}<path d={`M${70-30*p} 112H${210+30*p}`} stroke="#fb7185" strokeWidth="3" /></Art></Stage>;
}
export function TypeTunnel() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1);
  return <Stage label={t('demo.collection.typeTunnel')} className="cx-night"><Art>{Array.from({length:7},(_,i)=>{const s=.22+i*.17+p*.12;return <text key={i} x="0" y="15" textAnchor="middle" fontSize="48" fontWeight="900" fill="none" stroke={palette[i%5]} strokeWidth={.7+i*.22} opacity={.14+i*.14} transform={`translate(140 80) scale(${s})`}>{t('demo.collection.echoWord')}</text>;})}</Art></Stage>;
}

export function SplitDiopterShot() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1); const id=useId();
  return <Stage label={t('demo.collection.splitDiopter')} className="cx-night"><Art><defs><filter id={id}><feGaussianBlur stdDeviation={2+p*3} /></filter></defs><g filter={`url(#${id})`}><Landscape variant={1} /></g><rect x="38" y="35" width="45" height="110" rx="7" fill="#fb7185" /><path d="M50 48v70" stroke="#fecdd3" strokeWidth="4" /><g transform="translate(190 45)"><rect width="22" height="40" fill="#bef264" /><path d="M5 10h12M5 20h12M5 30h12" stroke="#466326" /></g><path d="M140 0v160" stroke="#ffffff44" strokeDasharray="2 6" /></Art></Stage>;
}
export function CraneArcShot() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1);
  return <Stage label={t('demo.collection.craneArc')} className="cx-night"><Art><g transform={`translate(${p*-20} ${p*28}) scale(${1+p*.18})`}><rect x="-20" y="-45" width="320" height="50" fill="#fbcba7" /><Landscape /></g><g transform={`translate(${p*-65} ${p*45})`}><rect x="5" y="25" width="34" height="140" fill="#282842" /><path d="M0 90H280" stroke="#fff" opacity=".12" /></g><path d="M210 26Q242 30 250 60" stroke="#fff" opacity=".6" fill="none" /></Art></Stage>;
}
export function HandheldDrift() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1); const x=Math.sin(p*19)*3+Math.sin(p*37)*1.5,y=Math.cos(p*13)*2;
  return <Stage label={t('demo.collection.handheld')} className="cx-night"><Art><g transform={`translate(${x} ${y}) rotate(${Math.sin(p*17)*1.2} 140 80) translate(-8 -5) scale(1.06)`}><Landscape variant={1} /></g><path d="M20 35V20h15M245 20h15v15M20 125v15h15M245 140h15v-15" stroke="#fff" fill="none" /></Art></Stage>;
}
export function WhipPanShot() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1); const id=useId(); const q=Math.min(1,Math.max(0,(p-.35)/.3));
  return <Stage label={t('demo.collection.whipPan')} className="cx-night"><Art><defs><filter id={id}><feGaussianBlur stdDeviation={`${Math.sin(q*Math.PI)*10} 0`} /></filter></defs><g filter={`url(#${id})`} transform={`translate(${-q*280} 0)`}><Landscape /><g transform="translate(280 0)"><Landscape variant={1} /></g></g></Art></Stage>;
}
export function WindowDollyThrough() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1);
  return <Stage label={t('demo.collection.windowDolly')} className="cx-night"><Art><g transform={`translate(140 80) scale(${1+p*.12}) translate(-140 -80)`}><Landscape variant={1} /></g><g transform={`translate(140 80) scale(${1+p*2}) translate(-140 -80)`} fill="#22263d"><rect width="280" height="20"/><rect y="140" width="280" height="20"/><rect width="55" height="160"/><rect x="225" width="55" height="160"/><rect x={136-p*110} width="8" height="160"/><rect x={136+p*110} width="8" height="160"/><rect y={76-p*65} width="280" height="8"/><rect y={76+p*65} width="280" height="8"/></g></Art></Stage>;
}

export function PixelMosaicTransition() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1); const size=8+Math.round(p*8)*4; const rects=useMemo(()=>Array.from({length:Math.ceil(160/size)},(_,y)=>Array.from({length:Math.ceil(280/size)},(_,x)=>{const cx=(x+.5)*size,cy=(y+.5)*size;const color=(cx-205)**2+(cy-40)**2<24**2?'#fff3b0':cy>130?'#eaa879':cy>140-Math.max(0,75-Math.abs(cx-90))?'#784957':'#fbcba7';return <rect key={`${x}-${y}`} x={x*size} y={y*size} width={size+.2} height={size+.2} fill={color} />;})),[size]);
  return <Stage label={t('demo.collection.pixelMosaic')}><Art>{rects}</Art></Stage>;
}
export function ScanlineDisplacement() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1); const id=useId();
  return <Stage label={t('demo.collection.scanlineDisplace')} className="cx-night"><Art><defs>{Array.from({length:8},(_,i)=><clipPath key={i} id={`${id}-${i}`}><rect y={i*20} width="280" height="20" /></clipPath>)}</defs>{Array.from({length:8},(_,i)=><g key={i} clipPath={`url(#${id}-${i})`}><g transform={`translate(${Math.sin(i*9+p*12)*p*24} 0)`}><Landscape variant={1}/></g></g>)}</Art></Stage>;
}
export function InkBlotReveal() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1); const id=useId();
  return <Stage label={t('demo.collection.inkBlot')}><Art><defs><mask id={id}><rect width="280" height="160" fill="black" />{Array.from({length:9},(_,i)=><circle key={i} cx={140+Math.cos(i*2.4)*65} cy={80+Math.sin(i*2.4)*35} r={p*(80+(i%3)*20)} fill="white" />)}</mask></defs><rect width="280" height="160" fill="#e9e2f0" /><g mask={`url(#${id})`}><Landscape /></g></Art></Stage>;
}
export function FilmBurnFlash() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1); const id=useId();
  return <Stage label={t('demo.collection.filmBurn')} className="cx-night"><Art><defs><radialGradient id={id}><stop stopColor="#fff9ce" /><stop offset=".35" stopColor="#fbbf24"/><stop offset=".65" stopColor="#ef4444" stopOpacity=".7"/><stop offset="1" stopColor="#ef4444" stopOpacity="0"/></radialGradient></defs><Landscape /><ellipse cx={-60+p*400} cy="80" rx="135" ry="160" fill={`url(#${id})`} style={{ mixBlendMode:'screen' }} /></Art></Stage>;
}
export function ExposureEcho() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1);
  return <Stage label={t('demo.collection.exposureEcho')} className="cx-night"><Art>{Array.from({length:7},(_,i)=>{const x=40+(p*180-i*14),y=80+Math.sin((p-i*.06)*tau)*35;return <circle key={i} cx={x} cy={y} r={18-i*.6} fill={palette[i%5]} opacity={1-i*.13} />;})}</Art></Stage>;
}

export const MOTION_COLLECTION_DEMOS = {
  'mg-spirograph-hypotrochoid':SpirographCurve, 'mg-lissajous-ribbon':LissajousRibbon, 'mg-eccentric-ring-poster':EccentricRingPoster, 'mg-triangulated-color-mesh':TriangulatedMesh, 'mg-recursive-circle-bloom':RecursiveCircleBloom,
  'mg-caustic-light-bands':CausticLightBands, 'mg-dappled-leaf-shadow':DappledLeafShadow, 'mg-plasma-contour-field':PlasmaContourField, 'mg-interference-line-lattice':InterferenceLattice, 'mg-radial-star-tunnel':StarTunnel,
  'mg-coupled-pendulum-beat':CoupledPendulumBeat, 'mg-meshing-ratio-gears':MeshingGears, 'mg-hanging-catenary-chain':HangingCatenary, 'mg-buoyancy-depth-balance':BuoyancyBalance, 'mg-kepler-elliptic-orbit':EllipticOrbit,
  'mg-folded-type-accordion':FoldedTypeAccordion, 'mg-pinwheel-glyphs':PinwheelGlyphs, 'mg-pendulum-glyphs':PendulumGlyphs, 'mg-elastic-tracking-type':ElasticTracking, 'mg-outline-type-tunnel':TypeTunnel,
  'mg-split-diopter-shot':SplitDiopterShot, 'mg-crane-arc-shot':CraneArcShot, 'mg-handheld-camera-drift':HandheldDrift, 'mg-whip-pan-shot':WhipPanShot, 'mg-window-dolly-through':WindowDollyThrough,
  'mg-pixel-mosaic-transition':PixelMosaicTransition, 'mg-scanline-displacement':ScanlineDisplacement, 'mg-ink-blot-reveal':InkBlotReveal, 'mg-film-burn-flash':FilmBurnFlash, 'mg-multiple-exposure-echo':ExposureEcho,
};
