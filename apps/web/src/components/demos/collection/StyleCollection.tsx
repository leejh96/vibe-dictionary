import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';
import { useDemoNumber } from '../../../hooks/useDemoAutoplay';
import { Art, Stage } from './shared';

export function BauhausComposition() {
  const { t }=useLocale();
  return <Stage label={t('demo.collection.bauhaus')} className="cx-paper"><Art><rect x="20" y="15" width="75" height="130" fill="#df443b"/><circle cx="158" cy="78" r="62" fill="#e8b83e"/><path d="M135 140 210 20 270 140Z" fill="#2e5b94"/><path d="M20 110H260M20 117H260M20 124H260" stroke="#29262a" strokeWidth="2"/><circle cx="227" cy="36" r="17" fill="#29262a"/></Art></Stage>;
}
export function OversizedMonochrome() {
  const { t }=useLocale();
  return <Stage label={t('demo.collection.oversizedMono')} style={{ background:'#e9e9e5',color:'#202022' }}><div style={{ display:'flex',justifyContent:'space-between',fontSize:9,borderBottom:'1px solid #202022',paddingBottom:8 }}><span>{t('demo.collection.formStudy')}</span><span>№ 03</span></div><div style={{ fontSize:75,lineHeight:.85,fontWeight:950,letterSpacing:'-.09em',padding:'16px 0',overflow:'hidden' }}>{t('demo.collection.formWord')}</div><span style={{ fontSize:10 }}>{t('demo.collection.lessMore')}</span></Stage>;
}
export function RadialGradientEditorial() {
  const { t }=useLocale();
  return <Stage label={t('demo.collection.radialEditorial')} style={{ background:'radial-gradient(ellipse at 75% 45%,#ffc9a8 0,#e3bdf9 33%,#dee9f2 65%,#f2f5ee)',color:'#353244' }}><span style={{ fontSize:9,letterSpacing:3 }}>{t('demo.collection.newPerspective')}</span><h4 style={{ font:'italic 37px/1.05 Georgia,serif',maxWidth:180,margin:'18px 0 10px' }}>{t('demo.collection.softFocus')}</h4><div style={{ width:45,height:1,background:'currentColor' }}/></Stage>;
}
export function MonolineIconSet() {
  const { t }=useLocale();
  return <Stage label={t('demo.collection.monolineIcons')}><Art><g fill="none" stroke="#9d7be8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><g transform="translate(20 30)"><rect x="0" y="10" width="65" height="65" rx="14"/><path d="M15 10V0h35v10M18 37h29M18 47h20"/></g><g transform="translate(108 30)"><path d="M0 40 32 8 64 40M10 30v50h44V30M24 80V55h16v25"/></g><g transform="translate(200 40)"><circle cx="28" cy="28" r="27"/><path d="m48 48 18 18M28 13v30M13 28h30"/></g></g></Art></Stage>;
}
export function GrainSphereStudy() {
  const { t }=useLocale(); const id=useId();
  return <Stage label={t('demo.collection.grainSpheres')} className="cx-paper"><Art><defs><radialGradient id={`${id}-light`} cx=".28" cy=".2"><stop stopColor="#fff2b3"/><stop offset=".45" stopColor="#f7a480"/><stop offset="1" stopColor="#884a83"/></radialGradient><filter id={`${id}-grain`}><feTurbulence type="fractalNoise" baseFrequency=".65" numOctaves="2" seed="7" result="noise"/><feComposite in="noise" in2="SourceGraphic" operator="in" result="clipped"/><feBlend in="SourceGraphic" in2="clipped" mode="soft-light"/></filter></defs><ellipse cx="146" cy="138" rx="72" ry="10" fill="#664b6a" opacity=".15"/><circle cx="131" cy="79" r="58" fill={`url(#${id}-light)`} filter={`url(#${id}-grain)`}/><circle cx="203" cy="113" r="24" fill={`url(#${id}-light)`} filter={`url(#${id}-grain)`}/></Art></Stage>;
}

export function CorkGranuleSurface() {
  const { t }=useLocale(); const id=useId();
  return <Stage label={t('demo.collection.cork')}><Art><defs><pattern id={id} width="50" height="40" patternUnits="userSpaceOnUse"><rect width="50" height="40" fill="#bc8b58"/>{Array.from({length:13},(_,i)=><ellipse key={i} cx={(i*17)%50} cy={(i*13)%40} rx={2+i%4} ry={1+i%3} transform={`rotate(${i*37} ${(i*17)%50} ${(i*13)%40})`} fill={['#875d39','#d4a873','#a97444'][i%3]}/>)}</pattern></defs><rect width="280" height="160" rx="12" fill={`url(#${id})`}/><rect x="72" y="34" width="136" height="95" rx="2" fill="#fff6dc" transform="rotate(-7 140 80)"/><circle cx="140" cy="37" r="6" fill="#c23f4d"/><text x="140" y="86" textAnchor="middle" fill="#785736" fontFamily="serif" fontSize="23">{t('demo.collection.notesWord')}</text></Art></Stage>;
}
export function DenimStitchSurface() {
  const { t }=useLocale(); const id=useId();
  return <Stage label={t('demo.collection.denim')}><Art><defs><pattern id={id} width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#365a83"/><path d="M-2 6 6-2M0 8 8 0" stroke="#8fa9bc" opacity=".4" strokeWidth="1.5"/></pattern></defs><rect width="280" height="160" rx="12" fill={`url(#${id})`}/><path d="M78 28H202V111L140 142 78 111Z" fill="#294e78" stroke="#1c3e60" strokeWidth="3"/><path d="M85 35H195V106L140 134 85 106ZM89 39H191V103L140 128 89 103Z" fill="none" stroke="#dfb67a" strokeWidth="1.5" strokeDasharray="4 3"/><circle cx="86" cy="36" r="3" fill="#dca866"/><circle cx="194" cy="36" r="3" fill="#dca866"/></Art></Stage>;
}
export function VelvetSheen() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1);
  return <Stage label={t('demo.collection.velvet')} style={{ background:'#30193e',color:'#f6dcff' }}><div style={{ height:145,borderRadius:12,background:`linear-gradient(${65+p*55}deg,#2b1237 8%,#582650 30%,#be6d9a 46%,#6f355d 53%,#31132e 78%)`,boxShadow:'inset 0 0 30px #170c2780',display:'grid',placeItems:'center' }}><span style={{ font:'italic 30px Georgia,serif',opacity:.7 }}>{t('demo.collection.velvetWord')}</span></div></Stage>;
}
export function RubberGripSurface() {
  const { t }=useLocale(); const id=useId();
  return <Stage label={t('demo.collection.rubber')} className="cx-night"><Art><defs><radialGradient id={`${id}-dot`} cx=".3" cy=".2"><stop stopColor="#657079"/><stop offset=".7" stopColor="#353d43"/><stop offset="1" stopColor="#1c2227"/></radialGradient><pattern id={`${id}-grid`} width="20" height="20" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill="#252c32"/><circle cx="10" cy="11" r="6" fill="#10161b"/><circle cx="10" cy="9" r="6" fill={`url(#${id}-dot)`}/></pattern></defs><rect x="20" y="8" width="240" height="144" rx="20" fill={`url(#${id}-grid)`} stroke="#616a74" strokeWidth="2"/></Art></Stage>;
}
export function EmbossedPaperSeal() {
  const { t }=useLocale();
  return <Stage label={t('demo.collection.embossSeal')} style={{ background:'#e9e3d5',color:'#d0c9b8' }}><div className="cx-center"><div style={{ width:128,height:128,borderRadius:'50%',border:'2px solid #e3ddce',boxShadow:'3px 3px 7px #bab3a5,-3px -3px 7px #fff9ed,inset 1px 1px 2px #fff9ed,inset -1px -1px 2px #bab3a5',display:'grid',placeItems:'center' }}><span style={{ font:'900 55px Georgia,serif',textShadow:'1px 2px 1px #fff9ed,-1px -2px 1px #b6ae9d' }}>{t('demo.collection.sealGlyph')}</span></div></div></Stage>;
}

export function LetterpressPoster() {
  const { t }=useLocale();
  return <Stage label={t('demo.collection.letterpress')} style={{ background:'#dfcba9',color:'#844c43' }}><div className="cx-center" style={{ textAlign:'center' }}><div><span style={{ display:'block',fontSize:9,letterSpacing:4 }}>{t('demo.collection.printHouse')}</span><strong style={{ display:'block',font:'900 48px/.95 Georgia,serif',letterSpacing:-3,margin:'10px 0',textShadow:'0 2px 1px #fff1d6,0 -1px 1px #5a332f' }}>{t('demo.collection.pressWord')}</strong><span style={{ borderTop:'2px solid currentColor',paddingTop:5,fontSize:10 }}>{t('demo.collection.handPrinted')}</span></div></div></Stage>;
}
export function NewspaperColumns() {
  const { t }=useLocale();
  return <Stage label={t('demo.collection.newspaper')} style={{ background:'#eae4d5',color:'#383530' }}><h4 style={{ font:'900 29px Georgia,serif',borderBottom:'3px double #383530',margin:'0 0 8px',textAlign:'center' }}>{t('demo.collection.dailyWord')}</h4><div style={{ columnCount:3,columnWidth:68,columnGap:10,columnRule:'1px solid #aaa18f',font:'10px/1.45 Georgia,serif',textAlign:'justify',hyphens:'auto' }}>{t('demo.collection.newspaperCopy')}</div></Stage>;
}
export function AtomicMidcentury() {
  const { t }=useLocale();
  return <Stage label={t('demo.collection.atomic')} style={{ background:'#d7ded5',color:'#244f55' }}><Art><g stroke="#344b4b" strokeWidth="2">{Array.from({length:10},(_,i)=>{const a=i*Math.PI/5;return <path key={i} d={`M140 80L${140+Math.cos(a)*(50+i%3*10)} ${80+Math.sin(a)*(50+i%3*10)}`}/>;})}</g>{Array.from({length:10},(_,i)=>{const a=i*Math.PI/5;return <circle key={i} cx={140+Math.cos(a)*(50+i%3*10)} cy={80+Math.sin(a)*(50+i%3*10)} r={i%2?8:5} fill={i%2?'#e48153':'#346c70'}/>;})}<ellipse cx="140" cy="80" rx="27" ry="18" fill="#e8bc54" transform="rotate(-25 140 80)"/></Art></Stage>;
}
export function DotMatrixPaper() {
  const { t }=useLocale(); const id=useId();
  return <Stage label={t('demo.collection.dotMatrix')} style={{ background:'#dcdad0' }}><Art><defs><pattern id={id} width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="#364034"/></pattern></defs><rect width="280" height="160" fill="#faf7e8"/>{Array.from({length:7},(_,i)=><g key={i}><circle cx="9" cy={13+i*22} r="4" fill="#dcdad0"/><circle cx="271" cy={13+i*22} r="4" fill="#dcdad0"/></g>)}<path d="M20 0v160M260 0v160" stroke="#b0b9a3" strokeDasharray="3 3"/><text x="140" y="94" textAnchor="middle" fontFamily="monospace" fontWeight="900" fontSize="52" fill={`url(#${id})`}>{t('demo.collection.printWord')}</text></Art></Stage>;
}
export function PostageStamp() {
  const { t }=useLocale();
  return <Stage label={t('demo.collection.postage')} style={{ background:'#bcad96' }}><Art><g transform="rotate(-7 140 80)"><rect x="63" y="8" width="154" height="144" fill="#fff7df"/>{Array.from({length:10},(_,i)=><g key={i}><circle cx={69+i*16} cy="8" r="4" fill="#bcad96"/><circle cx={69+i*16} cy="152" r="4" fill="#bcad96"/><circle cx="63" cy={15+i*15} r="4" fill="#bcad96"/><circle cx="217" cy={15+i*15} r="4" fill="#bcad96"/></g>)}<rect x="74" y="19" width="132" height="122" fill="#3d6d6d"/><circle cx="140" cy="68" r="29" fill="#e4bd74"/><path d="M80 125 120 72 158 125 180 92 201 125" fill="#c8d2af"/><text x="191" y="39" textAnchor="end" fontSize="13" fill="#fff7df">35</text></g><g transform="rotate(15 204 95)" fill="none" stroke="#3b3a34" opacity=".6"><circle cx="209" cy="88" r="30"/><circle cx="209" cy="88" r="25"/><path d="M200 76h80M200 85h80M200 94h80"/></g></Art></Stage>;
}

export function OscilloscopeTrace() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1); const id=useId(); const path=Array.from({length:160},(_,i)=>`${10+i*1.65},${80+32*Math.sin(i*.12+p*6)+10*Math.sin(i*.31-p*4)}`).join(' ');
  return <Stage label={t('demo.collection.oscilloscope')} className="cx-night"><Art><defs><pattern id={id} width="20" height="20" patternUnits="userSpaceOnUse"><path d="M0 0H20M0 0V20" stroke="#47a76a" opacity=".2"/></pattern></defs><rect width="280" height="160" fill="#09261b"/><rect width="280" height="160" fill={`url(#${id})`}/><polyline points={path} fill="none" stroke="#5cff9a" strokeWidth="7" opacity=".12"/><polyline points={path} fill="none" stroke="#a1ffc0" strokeWidth="1.5"/></Art></Stage>;
}
export function WireframeSphere() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1);
  return <Stage label={t('demo.collection.wireSphere')} className="cx-night"><Art><g fill="none" stroke="#67e8f9" strokeWidth="1" transform={`rotate(${p*30} 140 80)`}><circle cx="140" cy="80" r="66"/>{Array.from({length:7},(_,i)=><ellipse key={i} cx="140" cy="80" rx={Math.max(1,Math.abs(Math.cos(i*Math.PI/7+p*Math.PI))*66)} ry="66" opacity=".6"/>)}{[-.7,-.35,0,.35,.7].map(y=><ellipse key={y} cx="140" cy={80+y*66} rx={66*Math.sqrt(1-y*y)} ry={10*Math.sqrt(1-y*y)} opacity=".5"/>)}</g></Art></Stage>;
}
export function FingerprintScanner() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1); const id=useId();
  return <Stage label={t('demo.collection.fingerprint')} className="cx-night"><Art><defs><clipPath id={id}><rect x="70" y="12" width="140" height="136" rx="45"/></clipPath></defs><g clipPath={`url(#${id})`} fill="none" stroke="#57b4b9" strokeWidth="2">{Array.from({length:12},(_,i)=><path key={i} d={`M${75+i*5} 160 C${45+i*6} ${65+i*3} ${82+i*4} ${7+i*5} 140 ${10+i*5} S${245-i*6} ${65+i*4} ${205-i*5} 150`}/>)}</g><rect x="62" y={15+p*125} width="156" height="3" fill="#bef264"/><rect x="62" y={15+p*125-12} width="156" height="12" fill="#bef264" opacity=".1"/><path d="M54 38V10h28M198 10h28v28M54 122v28h28M198 150h28v-28" stroke="#67e8f9" fill="none"/></Art></Stage>;
}
export function ConstellationAtlas() {
  const { t }=useLocale(); const id=useId(); const stars=[[65,55],[105,32],[147,68],[190,42],[221,102],[174,130],[122,108],[65,55]];
  return <Stage label={t('demo.collection.starAtlas')} className="cx-night"><Art><defs><pattern id={id} width="28" height="28" patternUnits="userSpaceOnUse"><path d="M0 0H28M0 0V28" stroke="#8b9fb6" opacity=".12"/></pattern></defs><rect width="280" height="160" fill={`url(#${id})`}/><ellipse cx="140" cy="80" rx="110" ry="65" fill="none" stroke="#8b9fb6" opacity=".35"/><polyline points={stars.map(p=>p.join(',')).join(' ')} fill="none" stroke="#a8c9e8" strokeWidth="1"/>{stars.slice(0,-1).map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r={i%2?2:4} fill="#f3dfab"/><circle cx={x} cy={y} r="9" fill="none" stroke="#f3dfab" opacity=".2"/></g>)}<text x="14" y="150" fill="#9db7cf" fontSize="9">{t('demo.collection.atlasLabel')}</text></Art></Stage>;
}
const HEX_LATTICE_CELLS=Array.from({length:15},(_,i)=>{const x=47+i%5*45+(Math.floor(i/5)%2)*22,y=38+Math.floor(i/5)*39;return {x,y,points:Array.from({length:6},(_,j)=>`${x+24*Math.cos(j*Math.PI/3+Math.PI/6)},${y+24*Math.sin(j*Math.PI/3+Math.PI/6)}`).join(' ')};});
export function HexStatusLattice() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1); const active=Math.min(14,Math.floor(p*15));
  return <Stage label={t('demo.collection.hexLattice')} className="cx-night"><Art>{HEX_LATTICE_CELLS.map(({x,y,points},i)=><g key={i}><polygon points={points} fill={i===active?'#67e8f933':'none'} stroke={i===active?'#bef264':'#467d8b'} strokeWidth={i===active?2:1}/><circle cx={x} cy={y} r={i===active?5:2} fill={i===active?'#bef264':'#467d8b'}/></g>)}</Art></Stage>;
}

export const STYLE_COLLECTION_DEMOS = {
  'st-bauhaus-primary-composition':BauhausComposition, 'st-oversized-monochrome-type':OversizedMonochrome, 'st-radial-gradient-editorial':RadialGradientEditorial, 'st-monoline-icon-language':MonolineIconSet, 'st-grain-shaded-spheres':GrainSphereStudy,
  'st-cork-granule-surface':CorkGranuleSurface, 'st-denim-double-stitch':DenimStitchSurface, 'st-velvet-directional-sheen':VelvetSheen, 'st-rubber-dot-grip':RubberGripSurface, 'st-embossed-paper-seal':EmbossedPaperSeal,
  'st-letterpress-ink-imprint':LetterpressPoster, 'st-newspaper-column-layout':NewspaperColumns, 'st-midcentury-atomic-starburst':AtomicMidcentury, 'st-dot-matrix-tractor-paper':DotMatrixPaper, 'st-perforated-postage-stamp':PostageStamp,
  'st-oscilloscope-phosphor-trace':OscilloscopeTrace, 'st-wireframe-sphere-grid':WireframeSphere, 'st-fingerprint-scan-interface':FingerprintScanner, 'st-constellation-star-atlas':ConstellationAtlas, 'st-hex-status-lattice':HexStatusLattice,
};
