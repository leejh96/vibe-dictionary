import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';
import { useDemoNumber } from '../../../hooks/useDemoAutoplay';
import { Art, Landscape, Product, Stage, palette } from './shared';

export function SqueezeTubeShot() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1);
  return <Stage label={t('demo.collection.squeezeTube')} className="cx-paper"><Art><g transform={`translate(0 ${p*8})`}><path d={`M108 25H172L${169-p*10} 112H${111+p*10}Z`} fill="#a3bd9c"/><path d="M108 25h64" stroke="#66825c" strokeWidth="6"/><rect x="124" y="111" width="32" height="15" rx="3" fill="#e7e4d7"/><circle cx="140" cy="69" r="17" fill="#eef0d9"/><path d="M130 69h20M140 59v20" stroke="#78956a" strokeWidth="2"/></g><path d="M140 130Q180 127 177 143T116 144" fill="none" stroke="#c9bda6" strokeWidth="12" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-p} opacity={p > 0 ? 1 : 0}/><path d="M140 130Q180 127 177 143T116 144" fill="none" stroke="#fffaf0" strokeWidth="9" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-p} opacity={p > 0 ? 1 : 0}/></Art></Stage>;
}
export function SwatchFanReveal() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1);
  return <Stage label={t('demo.collection.swatchFan')}><Art>{palette.map((color,i)=><g key={color} transform={`rotate(${(i-2)*p*24} 140 135)`}><rect x="120" y="12" width="40" height="130" rx="5" fill="#fff8ee"/><rect x="124" y="16" width="32" height="90" rx="2" fill={color}/><circle cx="140" cy="132" r="4" fill="#6e6278"/></g>)}</Art></Stage>;
}
export function IngredientLevitation() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1);
  return <Stage label={t('demo.collection.ingredientFloat')} className="cx-paper"><Art><Product color="#c6d7a5"/>{Array.from({length:5},(_,i)=>{const a=i*Math.PI*2/5+p*.7,x=140+Math.cos(a)*87,y=78+Math.sin(a)*53;return <g key={i} transform={`translate(${x} ${y}) rotate(${i*40+p*30})`}>{i%2?<><circle r="13" fill="#eaaa50"/><circle r="9" fill="#ffe5a6"/><path d="M-9 0H9M0-9V9" stroke="#eaaa50"/></>:<path d="M-17 0Q0-22 17 0Q0 20-17 0Z" fill="#6f8b57"/>}</g>;})}</Art></Stage>;
}
export function PullTabCan() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1);
  return <Stage label={t('demo.collection.pullTabCan')} className="cx-night"><Art><rect x="102" y="45" width="76" height="101" rx="15" fill="#e99773"/><ellipse cx="140" cy="45" rx="38" ry="14" fill="#d6dde2"/><ellipse cx="140" cy="44" rx="30" ry="10" fill="#a5afb9"/><ellipse cx="140" cy="48" rx={5+p*7} ry={2+p*5} fill="#29333d"/><g transform={`translate(140 41) scale(1 ${1-.8*p}) rotate(${p*-20})`}><ellipse cy="-7" rx="9" ry="12" fill="#edf3f5"/><ellipse cy="-8" rx="4" ry="6" fill="#73818d"/></g><text x="140" y="104" textAnchor="middle" fill="#fff3de" fontWeight="900" fontSize="26">{t('demo.collection.fizzWord')}</text>{Array.from({length:5},(_,i)=><circle key={i} cx={123+i*9} cy={29-p*(15+i*3)} r={1+p*1.5} fill="#fff" opacity={p}/>)}</Art></Stage>;
}
export function PouchSealOpening() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1);
  return <Stage label={t('demo.collection.pouchOpening')} className="cx-paper"><Art><path d="M88 39H192L206 141Q140 157 74 141Z" fill="#bb9973"/><ellipse cx="140" cy="39" rx="52" ry={2+16*p} fill="#42362b"/><path d={`M88 ${39-16*p}Q140 ${35-16*p}192 ${39-16*p}`} stroke="#d5b692" strokeWidth="7" fill="none"/><path d={`M88 ${39+16*p}Q140 ${43+16*p}192 ${39+16*p}`} stroke="#dfc2a0" strokeWidth="7" fill="none"/><rect x="108" y="78" width="64" height="44" rx="3" fill="#f8f1dc"/><text x="140" y="104" textAnchor="middle" fontSize="14" fill="#746147">{t('demo.collection.freshWord')}</text></Art></Stage>;
}

export function DiagonalTypeConveyor() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1);
  return <Stage label={t('demo.collection.diagonalType')} className="cx-night"><div style={{ height:150,overflow:'hidden' }}><div style={{ transform:'rotate(-14deg) translateY(8px)',width:450,marginLeft:-80 }}>{[0,1,2].map(i=><div key={i} style={{ whiteSpace:'nowrap',fontSize:30,fontWeight:900,lineHeight:1.4,color:i===1?'#11182b':'#c4b5fd',background:i===1?'#bef264':'transparent',transform:`translateX(${(i%2?1:-1)*p*90}px)` }}>{t('demo.collection.moveRepeat')}</div>)}</div></div></Stage>;
}
export function PriceStrikeReplace() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1);
  return <Stage label={t('demo.collection.priceReplace')} className="cx-paper"><div className="cx-center"><div style={{ position:'relative',fontSize:32,color:'#8c7187' }}><span>{t('demo.collection.oldPrice')}</span><i style={{ position:'absolute',left:-8,top:'50%',height:4,width:`${Math.min(1,p*2)*110}%`,background:'#fb7185',transform:'rotate(-8deg)' }}/></div><strong style={{ fontSize:50,lineHeight:1,color:'#5b3580',opacity:Math.max(0,(p-.3)/.7),transform:`translateY(${(1-p)*12}px)` }}>{t('demo.collection.newPrice')}</strong></div></Stage>;
}
export function CircularWordBurst() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1);
  return <Stage label={t('demo.collection.wordBurst')} className="cx-night"><Art>{Array.from({length:8},(_,i)=>{const a=i*Math.PI/4;return <text key={i} x={140+Math.cos(a)*(18+p*68)} y={85+Math.sin(a)*(12+p*42)} fontSize={12+p*4} fontWeight="900" textAnchor="middle" fill={palette[i%5]} transform={`rotate(${i*45} ${140+Math.cos(a)*(18+p*68)} ${85+Math.sin(a)*(12+p*42)})`}>{t('demo.collection.newWord')}</text>;})}<circle cx="140" cy="80" r={8+p*7} fill="#bef264"/></Art></Stage>;
}
export function ElasticWordStamp() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1); const q=Math.min(1,p*2),bounce=Math.sin(q*Math.PI*3)*(1-q);
  return <Stage label={t('demo.collection.wordStamp')} className="cx-paper"><div className="cx-center"><div style={{ border:'4px solid #bd4a60',padding:'7px 11px',fontSize:23,fontWeight:900,color:'#bd4a60',transform:`rotate(-9deg) scale(${.65+q*.35+bounce*.12},${1.4-q*.4-bounce*.15})`,opacity:.2+q*.8 }}>{t('demo.collection.approvedWord')}</div></div></Stage>;
}
export function QuoteBracketReveal() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1);
  return <Stage label={t('demo.collection.quoteReveal')} className="cx-night"><div className="cx-center" style={{ position:'relative',padding:'0 24px' }}><span style={{ position:'absolute',left:4,top:18,font:'52px Georgia,serif',color:'#c4b5fd',transform:`translateX(${(1-p)*50}px)` }}>“</span><strong style={{ fontSize:19,lineHeight:1.2,textAlign:'center',maxWidth:150,opacity:p,clipPath:`inset(0 ${(1-p)*50}% 0 ${(1-p)*50}%)` }}>{t('demo.collection.quoteLine')}</strong><span style={{ position:'absolute',right:4,bottom:-2,font:'52px Georgia,serif',color:'#c4b5fd',transform:`translateX(${-(1-p)*50}px)` }}>”</span></div></Stage>;
}

export function SlopegraphReveal() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1); const before=[30,65,45],after=[72,44,57];
  return <Stage label={t('demo.collection.slopegraph')}><Art><path d="M48 20V136M232 20V136" stroke="#8b7cbf55"/>{before.map((value,i)=>{const x=48+184*p,y1=136-1.2*value,y=136-1.2*(value+(after[i]-value)*p);return <g key={i}><path d={`M48 ${y1}L${x} ${y}`} stroke={palette[i]} strokeWidth="3.5" strokeLinecap="round"/><circle cx="48" cy={y1} r="4.5" fill={palette[i]}/><circle cx={x} cy={y} r="4.5" fill={palette[i]}/><text x="38" y={y1+4} textAnchor="end" fontSize="12" fontWeight="700" fill="currentColor">{value}</text><text x={x+8} y={y+4} fontSize="12" fontWeight="700" fill="currentColor">{Math.round(value+(after[i]-value)*p)}</text></g>;})}<text x="48" y="152" textAnchor="middle" fontSize="11" fontWeight="600" fill="currentColor">{t('demo.collection.before')}</text><text x="232" y="152" textAnchor="middle" fontSize="11" fontWeight="600" fill="currentColor">{t('demo.collection.after')}</text></Art></Stage>;
}
export function WafflePercent() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1); const count=Math.round(68*p);
  return <Stage label={t('demo.collection.waffle')}><div className="cx-row" style={{ justifyContent:'center',gap:10 }}><div style={{ display:'grid',gridTemplateColumns:'repeat(10,9px)',gap:2 }}>{Array.from({length:100},(_,i)=><i key={i} style={{ height:9,borderRadius:2,background:i<count?'#8b5cf6':'#8b5cf61f' }}/>)}</div><div><strong style={{ fontSize:22 }}>{count}%</strong><div className="cx-small">{t('demo.collection.sampleShare')}</div></div></div></Stage>;
}
export function DivergingBars() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1); const values=[-45,62,-28,83];
  return <Stage label={t('demo.collection.divergingBars')}><Art><path d="M140 12V148" stroke="#8b7cbf"/>{values.map((value,i)=><g key={i}><rect x={value<0?140+value*p:140} y={18+i*32} width={Math.abs(value)*p} height="22" rx="4" fill={value<0?'#fb7185':'#8b5cf6'}/><text x={value<0?132+value*p:148+value*p} y={33+i*32} textAnchor={value<0?'end':'start'} fontSize="12" fontWeight="700" fill="currentColor">{Math.round(value*p)}</text></g>)}</Art></Stage>;
}
export function BulletTargetChart() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1);
  return <Stage label={t('demo.collection.bulletChart')}><Art><rect x="25" y="45" width="230" height="44" fill="#ede9fe"/><rect x="25" y="45" width="138" height="44" fill="#c4b5fd"/><rect x="25" y="45" width="92" height="44" fill="#a78bfa"/><rect x="25" y="58" width={230*.72*p} height="18" fill="#5b21b6"/><path d="M209 39v56" stroke="#f43f5e" strokeWidth="3"/><text x="25" y="118" fill="currentColor" fontSize="12">{t('demo.collection.actualValue',{value:Math.round(72*p)})}</text><text x="255" y="118" textAnchor="end" fill="currentColor" fontSize="12">{t('demo.collection.targetValue',{value:80})}</text></Art></Stage>;
}
export function PolarAreaChart() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1); const values=[80,45,65,30,95];
  return <Stage label={t('demo.collection.polarArea')}><Art>{[20,40,60].map(r=><circle key={r} cx="140" cy="80" r={r} fill="none" stroke="#8b7cbf33"/>)}{values.map((value,i)=>{const a=i*Math.PI*2/5-Math.PI/2,b=a+Math.PI*2/5-.07,r=65*Math.sqrt(value/100*p),x=140+r*Math.cos(a),y=80+r*Math.sin(a),x2=140+r*Math.cos(b),y2=80+r*Math.sin(b);return <path key={i} d={`M140 80L${x} ${y}A${r} ${r} 0 0 1 ${x2} ${y2}Z`} fill={palette[i]} opacity=".9"/>;})}<circle cx="140" cy="80" r="4" fill="#fff"/></Art><span className="cx-small">{t('demo.collection.areaValues')}</span></Stage>;
}

export function InterviewSplitScreen() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1); const active=p<.5?0:1;
  return <Stage label={t('demo.collection.interviewSplit')} className="cx-night"><div className="cx-row" style={{ gap:8 }}>{[0,1].map(i=><div key={i} style={{ position:'relative',width:'50%',height:140,borderRadius:8,background:i?'#534e79':'#2f6974',outline:active===i?'2px solid #bef264':undefined,overflow:'hidden' }}><div style={{ position:'absolute',width:35,height:35,borderRadius:'50%',background:'#e4b99b',top:26,left:'calc(50% - 17px)' }}/><div style={{ position:'absolute',width:78,height:80,borderRadius:'45% 45% 0 0',background:i?'#aa8dc2':'#78aeb1',top:62,left:'calc(50% - 39px)' }}/><span style={{ position:'absolute',bottom:6,left:6,right:6,fontSize:10,background:'#172036aa',padding:4,borderRadius:4 }}>{t(i?'demo.collection.guest':'demo.collection.host')}</span></div>)}</div></Stage>;
}
export function SafeFrameOverlay() {
  const { t }=useLocale();
  return <Stage label={t('demo.collection.safeFrames')} className="cx-night"><Art><Landscape variant={1}/><rect x="14" y="8" width="252" height="144" fill="none" stroke="#fff" strokeDasharray="4 3"/><rect x="28" y="16" width="224" height="128" fill="none" stroke="#bef264"/><path d="M135 80h10M140 75v10" stroke="#fff"/><rect x="60" y="112" width="160" height="22" fill="#172036aa"/><text x="140" y="127" textAnchor="middle" fill="#fff" fontSize="11">{t('demo.collection.safeCaption')}</text></Art></Stage>;
}
export function SportsScoreBug() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1); const score=Math.min(5,Math.floor(p*6));
  return <Stage label={t('demo.collection.scoreBug')} className="cx-night"><Art><rect width="280" height="160" fill="#27665b"/>{Array.from({length:5},(_,i)=><rect key={i} x={i*56} width="28" height="160" fill="#fff" opacity=".035"/>)}<path d="M140 0v160M15 15H265V145H15Z" stroke="#b4e2cb" opacity=".5" fill="none"/><circle cx="140" cy="80" r="28" fill="none" stroke="#b4e2cb" opacity=".5"/><rect x="21" y="14" width="238" height="34" rx="5" fill="#172036"/><rect x="102" y="14" width="76" height="34" fill="#bef264"/><text x="62" y="36" textAnchor="middle" fontSize="12" fill="#fff">{t('demo.collection.homeTeam')}</text><text x="140" y="37" textAnchor="middle" fontSize="21" fontWeight="900" fill="#172036">{score} : 2</text><text x="219" y="36" textAnchor="middle" fontSize="12" fill="#fff">{t('demo.collection.awayTeam')}</text><circle cx={70+p*140} cy={94+Math.sin(p*Math.PI)*20} r="5" fill="#fff"/></Art></Stage>;
}
export function ReplayStinger() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1); const x=-310+p*620;
  return <Stage label={t('demo.collection.replayStinger')} className="cx-night"><Art><Landscape variant={1}/><g transform={`translate(${x} 0) skewX(-15)`}><rect x="-10" width="310" height="160" fill="#bef264"/><rect x="-25" width="15" height="160" fill="#fff"/><text x="152" y="93" textAnchor="middle" fontSize="34" fontWeight="900" fill="#172036">{t('demo.collection.replayWord')}</text></g></Art></Stage>;
}
export function CountdownSlate() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1); const id=useId(); const count=Math.max(0,10-Math.floor(p*10));
  return <Stage label={t('demo.collection.countdownSlate')} style={{ background:'#d2d0c5',color:'#343436' }}><Art><defs><clipPath id={id}><circle cx="140" cy="80" r="64"/></clipPath></defs><path d="M0 80H280M140 0V160" stroke="#79796e"/><g clipPath={`url(#${id})`}><circle cx="140" cy="80" r="64" fill="#b9b9ae"/><path d={`M140 80L${140+90*Math.sin(p*Math.PI*2)} ${80-90*Math.cos(p*Math.PI*2)}`} stroke="#818176" strokeWidth="3"/></g><circle cx="140" cy="80" r="64" fill="none" stroke="#343436" strokeWidth="2"/><circle cx="140" cy="80" r="58" fill="none" stroke="#f1eee2"/><text x="140" y="101" textAnchor="middle" fontSize="62" fill="#343436" fontFamily="monospace">{count}</text></Art></Stage>;
}

export const VIDEO_COLLECTION_DEMOS = {
  'vd-squeeze-tube-dispense':SqueezeTubeShot, 'vd-color-swatch-fan-reveal':SwatchFanReveal, 'vd-floating-ingredient-packshot':IngredientLevitation, 'vd-pull-tab-can-opening':PullTabCan, 'vd-pouch-seal-opening':PouchSealOpening,
  'vd-diagonal-type-conveyor':DiagonalTypeConveyor, 'vd-price-strike-replacement':PriceStrikeReplace, 'vd-circular-word-burst':CircularWordBurst, 'vd-elastic-word-stamp':ElasticWordStamp, 'vd-quote-bracket-reveal':QuoteBracketReveal,
  'vd-slopegraph-paired-reveal':SlopegraphReveal, 'vd-waffle-percent-fill':WafflePercent, 'vd-diverging-bar-reveal':DivergingBars, 'vd-bullet-target-comparison':BulletTargetChart, 'vd-polar-area-reveal':PolarAreaChart,
  'vd-interview-split-screen':InterviewSplitScreen, 'vd-safe-frame-overlay':SafeFrameOverlay, 'vd-sports-score-bug':SportsScoreBug, 'vd-replay-stinger-panel':ReplayStinger, 'vd-countdown-film-slate':CountdownSlate,
};
