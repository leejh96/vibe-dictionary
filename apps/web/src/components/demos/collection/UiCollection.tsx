import { useId, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';
import { Art, Landscape, Product, Range, Stage, Toggle, palette } from './shared';

export function PreviewLink() {
  const { t } = useLocale();
  return <Stage label={t('demo.collection.previewLink')}><div className="cx-center"><button type="button" className="cx-preview-link">{t('demo.collection.explore')}<svg viewBox="0 0 280 160" aria-hidden="true"><Landscape /></svg></button></div></Stage>;
}
export function WaveUnderline() {
  const { t } = useLocale();
  return <Stage label={t('demo.collection.waveUnderline')}><div className="cx-center"><button type="button" className="cx-hover-button cx-wave-hover">{t('demo.collection.explore')}</button></div></Stage>;
}
export function SplitCurtainHover() {
  const { t } = useLocale();
  return <Stage label={t('demo.collection.splitCurtainHover')}><div className="cx-center"><button type="button" className="cx-hover-button cx-split-hover"><span>{t('demo.collection.discover')}</span></button></div></Stage>;
}
export function ArrowConveyor() {
  const { t } = useLocale();
  return <Stage label={t('demo.collection.arrowConveyor')}><div className="cx-center"><button type="button" className="cx-hover-button cx-arrow-hover">{t('demo.collection.continue')}<span className="cx-arrow-window" aria-hidden="true"><i>↗</i><i>→</i></span></button></div></Stage>;
}
export function RadialInkHover() {
  const { t } = useLocale();
  return <Stage label={t('demo.collection.radialInkHover')}><div className="cx-center"><button type="button" className="cx-hover-button cx-ink-hover"><span>{t('demo.collection.discover')}</span></button></div></Stage>;
}

export function PunchTicket() {
  const { t } = useLocale();
  return <Stage label={t('demo.collection.punchTicket')}><div className="cx-punch-ticket"><div><span className="cx-small">{t('demo.collection.admit')}</span><strong style={{ display:'block',fontSize:28 }}>{t('demo.collection.studio')}</strong><span>{t('demo.collection.edition')}</span></div><div>{t('demo.collection.ticketNumber')}</div></div></Stage>;
}
export function BookCover() {
  const { t } = useLocale(); const [open,setOpen] = useState(false);
  return <Stage label={t('demo.collection.bookCover')}><div className="cx-book"><div className="cx-book-page">{t('demo.collection.bookPage')}</div><button type="button" className="cx-book-cover" data-open={open} aria-label={t('demo.collection.bookCover')} aria-pressed={open} onClick={()=>setOpen(!open)}>{t('demo.collection.fieldNotes')}</button></div><Toggle value={open} onChange={()=>setOpen(!open)} /></Stage>;
}
export function FanDeck() {
  const { t } = useLocale(); const [open,setOpen] = useState(false);
  return <Stage label={t('demo.collection.fanDeck')}><div className="cx-fan">{palette.slice(0,3).map((color,i)=><button key={color} type="button" style={{ background:color,transform:`rotate(${open?(i-1)*23:0}deg) translateY(${open?Math.abs(i-1)*-4:0}px)` }} aria-label={t('demo.collection.cardNumber',{number:i+1})} aria-pressed={open} onClick={()=>setOpen(!open)}>{i+1}</button>)}</div></Stage>;
}
export function ScratchCard() {
  const { t } = useLocale(); const [reveal,setReveal] = useState(0); const id=useId();
  return <Stage label={t('demo.collection.scratchCard')}><Art><defs><mask id={id}><rect width="280" height="160" fill="white" /><path d="M20 30 260 40 20 65 260 90 20 112 260 139" fill="none" stroke="black" strokeWidth="40" strokeLinecap="round" pathLength="100" opacity={reveal > 0 ? 1 : 0} strokeDasharray={`${reveal} 100`} /></mask></defs><rect width="280" height="160" rx="12" fill="#bef264" /><text x="140" y="93" textAnchor="middle" fontSize="38" fontWeight="900" fill="#253c24">{t('demo.collection.lucky')}</text><rect width="280" height="160" rx="12" fill="#a2a9b8" mask={`url(#${id})`} /></Art><Range value={reveal} onChange={setReveal} label={t('demo.collection.reveal')} /></Stage>;
}
export function ProductHotspots() {
  const { t } = useLocale(); const [selected,setSelected] = useState(0); const labels=['demo.collection.cap','demo.collection.label','demo.collection.body'] as const;
  return <Stage label={t('demo.collection.productHotspots')}><div className="cx-hotspot"><Art><Product /></Art>{[[54,18],[65,64],[37,88]].map(([x,y],i)=><button key={i} type="button" style={{ left:`${x}%`,top:y }} aria-label={t(labels[i])} aria-pressed={selected===i} onClick={()=>setSelected(i)}>{i+1}</button>)}<output>{t(labels[selected])}</output></div></Stage>;
}

export function CircleSceneSwitch() {
  const { t } = useLocale(); const [open,setOpen] = useState(false); const id=useId();
  return <Stage label={t('demo.collection.circleSceneSwitch')}><Art><defs><clipPath id={id}><circle cx="140" cy="80" r={open?170:0} style={{ transition:'r 600ms ease' }} /></clipPath></defs><Landscape /><g clipPath={`url(#${id})`}><Landscape variant={1} /></g></Art><Toggle value={open} onChange={()=>setOpen(!open)} /></Stage>;
}
export function DominoTiles() {
  const { t } = useLocale(); const [fallen,setFallen] = useState(false);
  return <Stage label={t('demo.collection.dominoTiles')}><div className="cx-row" style={{ height:130,alignItems:'end',justifyContent:'center',gap:15,paddingBottom:25 }}>{palette.map((color,i)=><i key={color} style={{ width:22,height:65,background:color,borderRadius:5,transformOrigin:'bottom right',transform:`rotate(${fallen?65:0}deg)`,transition:`transform 300ms ${i*100}ms ease-in` }} />)}</div><Toggle value={fallen} onChange={()=>setFallen(!fallen)} /></Stage>;
}
export function ZipperPanel() {
  const { t } = useLocale(); const [open,setOpen] = useState(false);
  return <Stage label={t('demo.collection.zipperPanel')}><div className="cx-center" style={{ position:'relative',overflow:'hidden',background:'#bef264',borderRadius:10,color:'#28352b' }}><strong className="cx-word">{t('demo.collection.openWord')}</strong>{[0,1].map(i=><div key={i} style={{ position:'absolute',inset:i?'0 0 0 50%':'0 50% 0 0',background:'#6650a1',borderRight:i?0:'5px dashed #e9d5ff',borderLeft:i?'5px dashed #e9d5ff':0,transform:`translateX(${open?(i?100:-100):0}%)`,transition:'transform .6s' }} />)}</div><Toggle value={open} onChange={()=>setOpen(!open)} /></Stage>;
}
export function CubePanelSwitch() {
  const { t } = useLocale(); const [open,setOpen] = useState(false);
  return <Stage label={t('demo.collection.cubePanelSwitch')}><div className="cx-center" style={{ perspective:500 }}><div className="cx-cube" style={{ transform:`translateZ(-55px) rotateY(${open?-90:0}deg)` }}><div className="cx-cube-face" style={{ transform:'translateZ(55px)' }}>{t('demo.collection.one')}</div><div className="cx-cube-face" style={{ transform:'rotateY(90deg) translateZ(55px)',background:'#bef264' }}>{t('demo.collection.two')}</div></div></div><Toggle value={open} onChange={()=>setOpen(!open)} /></Stage>;
}
export function StackGridTransition() {
  const { t } = useLocale(); const [open,setOpen] = useState(false);
  return <Stage label={t('demo.collection.stackGridTransition')}><div style={{ position:'relative',height:140 }}>{palette.slice(0,4).map((color,i)=><div key={color} style={{ position:'absolute',width:72,height:52,background:color,borderRadius:8,left:open?`calc(50% + ${(i%2)*80-76}px)`:`calc(50% - ${36-i*3}px)`,top:open?i<2?10:70:35-i*4,transform:`rotate(${open?0:i*5-7}deg)`,transition:'all .5s',border:'2px solid white' }} />)}</div><Toggle value={open} onChange={()=>setOpen(!open)} /></Stage>;
}

export function BalancedHeadline() {
  const { t } = useLocale(); const [width,setWidth] = useState(220);
  return <Stage label={t('demo.collection.balancedHeadline')}><h4 style={{ width,maxWidth:'100%',margin:'8px auto',fontSize:25,fontWeight:800,lineHeight:1.15,textWrap:'balance' }}>{t('demo.collection.headline')}</h4><Range min={130} max={270} value={width} onChange={setWidth} label={t('demo.collection.width')} /></Stage>;
}
export function RubyReading() {
  const { t } = useLocale();
  return <Stage label={t('demo.collection.rubyReading')}><div className="cx-center"><ruby style={{ fontSize:38,fontFamily:'Georgia,serif' }}>{t('demo.collection.rubyBase')}<rt style={{ fontSize:12,color:'#8b5cf6' }}>{t('demo.collection.rubyNote')}</rt></ruby></div></Stage>;
}
export function ProofreadingMarks() {
  const { t } = useLocale();
  return <Stage label={t('demo.collection.proofreadingMarks')}><div className="cx-center" style={{ fontSize:25,fontFamily:'Georgia,serif',textAlign:'center' }}><div><del style={{ color:'#d4466c',textDecorationThickness:2 }}>{t('demo.collection.draftWord')}</del><br/><ins style={{ textDecoration:'underline wavy #8b5cf6',textUnderlineOffset:8 }}>{t('demo.collection.finalWord')}</ins></div></div></Stage>;
}
export function InlineFootnote() {
  const { t } = useLocale(); const [open,setOpen] = useState(false); const id=useId();
  return <Stage label={t('demo.collection.inlineFootnote')}><p style={{ font: '18px/1.7 Georgia,serif',padding:8 }}>{t('demo.collection.footnoteText')}<button type="button" aria-expanded={open} aria-controls={id} aria-label={t('demo.collection.footnote')} onClick={()=>setOpen(!open)} style={{ verticalAlign:'super',fontSize:11,color:'#8b5cf6',padding:4 }}>1</button></p><div id={id} hidden={!open} className="cx-cell">{t('demo.collection.footnoteBody')}</div></Stage>;
}
export function VerticalEditorial() {
  const { t } = useLocale();
  return <Stage label={t('demo.collection.verticalEditorial')}><div className="cx-row" style={{ justifyContent:'center',gap:24,height:140 }}><span style={{ writingMode:'vertical-rl',fontSize:28,fontFamily:'Georgia,serif',letterSpacing:2,whiteSpace:'nowrap' }}>{t('demo.collection.verticalTitle')}</span><span style={{ writingMode:'vertical-rl',fontSize:12,letterSpacing:3,opacity:.65 }}>{t('demo.collection.verticalCaption')}</span><div style={{ width:55,height:100,borderRadius:'50% 50% 0 0',background:'linear-gradient(#fb7185,#c4b5fd)' }} /></div></Stage>;
}

export function PasswordChecklist() {
  const { t } = useLocale(); const [value,setValue] = useState(''); const rules=[value.length>=8,/[0-9]/.test(value),/[A-Z]/.test(value)]; const labels=['demo.collection.lengthRule','demo.collection.numberRule','demo.collection.capitalRule'] as const;
  return <Stage label={t('demo.collection.passwordChecklist')}><input type="password" className="cx-password" value={value} autoComplete="off" aria-label={t('demo.collection.samplePassword')} onChange={event=>setValue(event.target.value)} /><div className="cx-track" style={{ margin:'12px 0' }}><i style={{ width:`${rules.filter(Boolean).length/3*100}%` }} /></div>{rules.map((ok,i)=><div key={i} style={{ color:ok?'#16836b':undefined }}>{ok?'✓':'○'} {t(labels[i])}</div>)}</Stage>;
}
export function DirtySaveState() {
  const { t } = useLocale(); const [value,setValue] = useState(''); const [saved,setSaved] = useState(''); const dirty=value!==saved;
  return <Stage label={t('demo.collection.dirtySaveState')}><textarea className="cx-password" rows={3} value={value} aria-label={t('demo.collection.note')} onChange={event=>setValue(event.target.value)} /><div className="cx-row" style={{ justifyContent:'space-between' }}><span role="status">{t(dirty?'demo.collection.unsaved':'demo.collection.saved')}</span><button type="button" className="cx-action" disabled={!dirty} onClick={()=>setSaved(value)}>{t('demo.collection.save')}</button></div><p className="cx-small">{t('demo.collection.localOnly')}</p></Stage>;
}
export function ChunkProgress() {
  const { t } = useLocale(); const [count,setCount] = useState(0);
  return <Stage label={t('demo.collection.chunkProgress')}><div className="cx-row" style={{ margin:'24px 0 12px' }}>{Array.from({length:5},(_,i)=><div key={i} style={{ flex:1,height:30,borderRadius:6,background:count>i?'#8b5cf6':'#8b5cf622',transition:'background .25s' }} />)}</div><output aria-live="polite">{t('demo.collection.chunkCount',{count,total:5})}</output><button type="button" className="cx-action" onClick={()=>setCount(count===5?0:count+1)}>{t(count===5?'demo.collection.reset':'demo.collection.nextChunk')}</button></Stage>;
}
export function ReactionPicker() {
  const { t } = useLocale(); const [selected,setSelected] = useState<number|null>(null); const labels=['demo.collection.like','demo.collection.love','demo.collection.celebrate'] as const;
  return <Stage label={t('demo.collection.reactionPicker')}><div className="cx-center"><div className="cx-row">{['✦','♥','✺'].map((icon,i)=><button key={icon} type="button" className="cx-pill" style={{ fontSize:29,transform:`translateY(${selected===i?-8:0}px)`,transition:'transform .2s' }} aria-label={t(labels[i])} aria-pressed={selected===i} onClick={()=>setSelected(selected===i?null:i)}>{icon}</button>)}</div><output aria-live="polite">{t(selected===null?'demo.collection.chooseReaction':labels[selected])}</output></div></Stage>;
}
export function ConnectivityBanner() {
  const { t } = useLocale(); const [online,setOnline] = useState(true);
  return <Stage label={t('demo.collection.connectivityBanner')}><div className="cx-cell" role="status" style={{ background:online?'#10b98122':'#fb718522',borderLeft:`4px solid ${online?'#10b981':'#fb7185'}`,margin:'24px 0' }}>{t(online?'demo.collection.online':'demo.collection.offline')}</div><Toggle value={!online} onChange={()=>setOnline(!online)} /><p className="cx-small">{t('demo.collection.simulatedConnection')}</p></Stage>;
}

export function AvatarOverflow() {
  const { t } = useLocale(); const [open,setOpen] = useState(false);
  return <Stage label={t('demo.collection.avatarOverflow')}><div className="cx-row" style={{ justifyContent:'center',gap:0,margin:'20px 0' }}>{palette.slice(0,3).map((color,i)=><span key={color} style={{ display:'grid',placeItems:'center',border:'3px solid #fff',borderRadius:'50%',width:46,height:46,background:color,marginLeft:-8,color:'#34284e' }}>{i+1}</span>)}<button type="button" aria-expanded={open} aria-label={t('demo.collection.morePeople')} className="cx-pill" style={{ marginLeft:-6,zIndex:1 }} onClick={()=>setOpen(!open)}>+2</button></div>{open&&<div className="cx-cell">{t('demo.collection.additionalPeople')}</div>}</Stage>;
}
export function GroupedChat() {
  const { t } = useLocale();
  return <Stage label={t('demo.collection.groupedChat')}><div className="cx-col" style={{ gap:4 }}><span className="cx-small">{t('demo.collection.sender')}</span><div className="cx-chat">{t('demo.collection.chatFirst')}</div><div className="cx-chat">{t('demo.collection.chatSecond')}</div><div className="cx-chat" data-own="true">{t('demo.collection.chatReply')}</div><span className="cx-small" style={{ textAlign:'right' }}>{t('demo.collection.read')}</span></div></Stage>;
}
export function MilestoneRail() {
  const { t } = useLocale(); const [step,setStep] = useState(0); const labels=['demo.collection.plan','demo.collection.make','demo.collection.ship'] as const;
  return <Stage label={t('demo.collection.milestoneRail')}><div className="cx-row" style={{ marginTop:30,position:'relative',justifyContent:'space-between' }}><div style={{ position:'absolute',height:3,left:16,right:16,top:15,background:'#8b5cf633' }} /><div style={{ position:'absolute',height:3,left:16,width:`calc(${step*50}% - ${step*8}px)`,top:15,background:'#8b5cf6',transition:'width .3s' }} />{labels.map((key,i)=><button key={key} type="button" aria-current={step===i?'step':undefined} onClick={()=>setStep(i)} style={{ position:'relative',display:'grid',gap:8,justifyItems:'center',background:'transparent' }}><span style={{ display:'grid',placeItems:'center',width:32,height:32,borderRadius:'50%',background:i<=step?'#8b5cf6':'#ddd6fe',color:i<=step?'#fff':'#392459' }}>{i<step?'✓':i+1}</span>{t(key)}</button>)}</div><p style={{ textAlign:'center',marginTop:20 }}>{t(labels[step])}</p></Stage>;
}
export function MonthCalendar() {
  const { t } = useLocale();
  return <Stage label={t('demo.collection.monthCalendar')}><div className="cx-row" style={{ justifyContent:'space-between',marginBottom:8 }}><strong>{t('demo.collection.sampleMonth')}</strong><span className="cx-small">{t('demo.collection.calendarSample')}</span></div><div className="cx-calendar">{Array.from({length:35},(_,i)=><span key={i} style={{ background:i===17?'#8b5cf6':undefined,color:i===17?'#fff':undefined,opacity:i<2||i>31?.2:1 }}>{i<2||i>31?'·':i-1}</span>)}</div></Stage>;
}
export function PinnedPanelFooter() {
  const { t } = useLocale(); const [count,setCount] = useState(0);
  return <Stage label={t('demo.collection.pinnedPanelFooter')}><div style={{ display:'flex',flexDirection:'column',height:145,border:'1px solid #8b7cbf55',borderRadius:10,overflow:'hidden' }}><div style={{ overflowY:'auto',padding:10,flex:1,overscrollBehavior:'contain' }}>{Array.from({length:8},(_,i)=><p key={i} style={{ padding:'6px 0' }}>{t('demo.collection.itemNumber',{number:i+1})}</p>)}</div><div className="cx-row" style={{ padding:6,borderTop:'1px solid #8b7cbf55',justifyContent:'space-between' }}><output>{count}</output><button type="button" className="cx-pill" onClick={()=>setCount(count+1)}>{t('demo.collection.apply')}</button></div></div></Stage>;
}

export function RotaryDial() {
  const { t } = useLocale(); const [value,setValue] = useState(35);
  return <Stage label={t('demo.collection.rotaryDial')}><Art><circle cx="140" cy="80" r="60" fill="#8b5cf622" /><path d="M98 122 A60 60 0 1 1 182 122" fill="none" stroke="#a78bfa" strokeWidth="8" strokeLinecap="round" /><circle cx="140" cy="80" r="42" fill="#50446e" /><g transform={`rotate(${-135+value*2.7} 140 80)`}><path d="M140 48v12" stroke="white" strokeWidth="5" strokeLinecap="round" /></g><text x="140" y="88" textAnchor="middle" fill="white" fontSize="22">{value}</text></Art><Range value={value} onChange={setValue} label={t('demo.collection.level')} /></Stage>;
}
export function SentimentSegment() {
  const { t } = useLocale(); const [value,setValue] = useState(1); const id=useId(); const labels=['demo.collection.low','demo.collection.medium','demo.collection.high'] as const;
  return <Stage label={t('demo.collection.sentimentSegment')}><div className="cx-center"><div className="cx-radio-group">{labels.map((key,i)=><label key={key}><input type="radio" name={id} checked={value===i} onChange={()=>setValue(i)} /><span style={{ display:'block',fontSize:23,textAlign:'center' }}>{['☹','○','☺'][i]}</span>{t(key)}</label>)}</div></div></Stage>;
}
export function DurationSelect() {
  const { t } = useLocale(); const [minutes,setMinutes] = useState(15);
  return <Stage label={t('demo.collection.durationSelect')}><div className="cx-center"><output style={{ fontSize:46,fontVariantNumeric:'tabular-nums' }}>{String(Math.floor(minutes/60)).padStart(2,'0')}:{String(minutes%60).padStart(2,'0')}</output><label className="cx-row">{t('demo.collection.duration')}<select value={minutes} onChange={event=>setMinutes(Number(event.target.value))}>{[5,15,30,60,90].map(value=><option key={value} value={value}>{t('demo.collection.minutes',{count:value})}</option>)}</select></label></div></Stage>;
}
export function CoordinatePad() {
  const { t } = useLocale(); const [point,setPoint] = useState([50,50]);
  return <Stage label={t('demo.collection.coordinatePad')}><div className="cx-pad" role="group" aria-label={t('demo.collection.position')} onPointerDown={event=>{const rect=event.currentTarget.getBoundingClientRect();setPoint([Math.round((event.clientX-rect.left)/rect.width*100),Math.round((event.clientY-rect.top)/rect.height*100)]);}} data-demo-control><i style={{ left:`${point[0]}%`,top:`${point[1]}%` }} /></div><Range value={point[0]} onChange={x=>setPoint([x,point[1]])} label={t('demo.collection.horizontal')} /><Range value={point[1]} onChange={y=>setPoint([point[0],y])} label={t('demo.collection.vertical')} /></Stage>;
}
export function NumericScrubber() {
  const { t } = useLocale(); const [value,setValue] = useState(50); const [start,setStart] = useState<{x:number;value:number}|null>(null);
  return <Stage label={t('demo.collection.numericScrubber')}><div className="cx-center"><div role="slider" tabIndex={0} data-demo-control aria-label={t('demo.collection.value')} aria-valuemin={0} aria-valuemax={100} aria-valuenow={value} style={{ fontSize:48,fontVariantNumeric:'tabular-nums',cursor:'ew-resize',touchAction:'none',userSelect:'none' }} onPointerDown={event=>{event.currentTarget.setPointerCapture(event.pointerId);setStart({x:event.clientX,value});}} onPointerMove={event=>{if(start)setValue(Math.max(0,Math.min(100,Math.round(start.value+(event.clientX-start.x)/2))));}} onPointerUp={()=>setStart(null)} onPointerCancel={()=>setStart(null)} onLostPointerCapture={()=>setStart(null)} onKeyDown={event=>{const delta=event.key==='ArrowRight'||event.key==='ArrowUp'?1:event.key==='ArrowLeft'||event.key==='ArrowDown'?-1:0;if(delta||event.key==='Home'||event.key==='End'){event.preventDefault();setValue(event.key==='Home'?0:event.key==='End'?100:Math.max(0,Math.min(100,value+delta)));}}}>{value}</div><span className="cx-small">{t('demo.collection.scrubHint')}</span></div></Stage>;
}

export const UI_COLLECTION_DEMOS = {
  'hover-image-preview-link':PreviewLink, 'hover-wavy-underline':WaveUnderline, 'hover-split-curtain':SplitCurtainHover, 'hover-arrow-conveyor':ArrowConveyor, 'hover-radial-ink':RadialInkHover,
  'perforated-admission-ticket':PunchTicket, 'hinged-book-cover-card':BookCover, 'fan-spread-deck':FanDeck, 'scratch-mask-reveal-card':ScratchCard, 'product-hotspot-card':ProductHotspots,
  'circular-scene-switch':CircleSceneSwitch, 'domino-tile-transition':DominoTiles, 'zipper-panel-opening':ZipperPanel, 'cube-panel-switch':CubePanelSwitch, 'stack-to-grid-transition':StackGridTransition,
  'balanced-headline-wrap':BalancedHeadline, 'ruby-reading-annotation':RubyReading, 'proofreading-text-marks':ProofreadingMarks, 'inline-footnote-disclosure':InlineFootnote, 'vertical-editorial-type':VerticalEditorial,
  'password-rule-checklist':PasswordChecklist, 'dirty-note-save-state':DirtySaveState, 'chunked-progress-feedback':ChunkProgress, 'toggle-reaction-picker':ReactionPicker, 'simulated-connectivity-banner':ConnectivityBanner,
  'avatar-overflow-cluster':AvatarOverflow, 'grouped-chat-bubbles':GroupedChat, 'horizontal-milestone-rail':MilestoneRail, 'static-month-calendar':MonthCalendar, 'pinned-panel-action-footer':PinnedPanelFooter,
  'range-linked-rotary-dial':RotaryDial, 'sentiment-radio-segments':SentimentSegment, 'duration-preset-select':DurationSelect, 'two-axis-coordinate-pad':CoordinatePad, 'pointer-numeric-scrubber':NumericScrubber,
};
