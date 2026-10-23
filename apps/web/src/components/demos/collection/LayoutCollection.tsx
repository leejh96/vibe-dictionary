import { useLayoutEffect, useRef, useState } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';
import { useDemoNumber } from '../../../hooks/useDemoAutoplay';
import { Art, Landscape, Range, Stage, palette } from './shared';

function usePreviewScroll(progress: number) {
  const ref=useRef<HTMLDivElement>(null);
  useLayoutEffect(()=>{const node=ref.current;if(node)node.scrollTop=progress*(node.scrollHeight-node.clientHeight);},[progress]);
  return ref;
}

export function CircularGallery() {
  const { t }=useLocale(); const [selected,setSelected]=useState(0);
  return <Stage label={t('demo.collection.circularGallery')}><div style={{ height:155,position:'relative' }}><div style={{ position:'absolute',left:'calc(50% - 28px)',top:50,width:56,height:56,borderRadius:'50%',background:palette[selected],display:'grid',placeItems:'center',fontSize:25,color:'#30243e' }}>{selected+1}</div>{palette.map((color,i)=>{const angle=i*Math.PI*2/5-Math.PI/2;return <button key={color} type="button" aria-label={t('demo.collection.itemNumber',{number:i+1})} aria-pressed={selected===i} onClick={()=>setSelected(i)} style={{ position:'absolute',left:`calc(50% + ${Math.cos(angle)*85-18}px)`,top:60+Math.sin(angle)*53,width:36,height:36,borderRadius:8,background:color,color:'#30243e',outline:selected===i?'2px solid #7c3aed':undefined,outlineOffset:3 }}>{i+1}</button>;})}</div></Stage>;
}
export function TriangleTessellation() {
  const { t }=useLocale();
  return <Stage label={t('demo.collection.triangleTessellation')}><Art>{Array.from({length:4},(_,row)=>Array.from({length:6},(_,col)=>{const x=20+col*40,y=10+row*35;return <g key={`${row}-${col}`}><polygon points={`${x},${y+35} ${x+20},${y} ${x+40},${y+35}`} fill={palette[(row+col)%5]} /><polygon points={`${x+20},${y} ${x+60},${y} ${x+40},${y+35}`} fill={palette[(row+col+2)%5]} /></g>;}))}</Art></Stage>;
}
export function JustifiedImageRows() {
  const { t }=useLocale();
  return <Stage label={t('demo.collection.justifiedRows')}><div className="cx-col" style={{ gap:5 }}>{[[1.6,1,1.3],[.8,1.8,1.3]].map((ratios,row)=><div key={row} className="cx-row" style={{ gap:5 }}>{ratios.map((ratio,i)=><div key={i} style={{ flex:ratio,minWidth:0,height:65,overflow:'hidden',borderRadius:5 }}><svg viewBox="0 0 280 160" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" aria-hidden="true"><Landscape variant={(i+row)%2}/></svg></div>)}</div>)}</div></Stage>;
}
export function OverlapEditorial() {
  const { t }=useLocale();
  return <Stage label={t('demo.collection.overlapEditorial')} className="cx-paper"><div style={{ display:'grid',gridTemplateColumns:'repeat(6,1fr)',gridTemplateRows:'30px 65px 45px' }}><div style={{ gridArea:'1/3/4/7',borderRadius:8,overflow:'hidden' }}><svg viewBox="0 0 280 160" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><Landscape/></svg></div><strong style={{ gridArea:'2/1/3/6',zIndex:1,font:'900 35px/.95 Georgia,serif',color:'#332739',textShadow:'0 1px #fff' }}>{t('demo.collection.quietPlaces')}</strong><span style={{ gridArea:'3/1/4/3',fontSize:10,alignSelf:'end' }}>{t('demo.collection.edition')}</span></div></Stage>;
}
export function AlternatingFeatureRows() {
  const { t }=useLocale(); const labels=['demo.collection.plan','demo.collection.make','demo.collection.ship'] as const;
  return <Stage label={t('demo.collection.alternatingFeatures')}><div className="cx-col" style={{ gap:5 }}>{labels.map((key,i)=><div key={key} className="cx-row" style={{ flexDirection:i%2?'row-reverse':'row',gap:12 }}><div style={{ width:75,height:40,borderRadius:7,background:palette[i],display:'grid',placeItems:'center',color:'#342447' }}>{['◒','✳','◈'][i]}</div><div style={{ flex:1 }}><strong>{t(key)}</strong><div style={{ width:'80%',height:4,marginTop:5,background:'#8b7cbf44',borderRadius:4 }}/></div></div>)}</div></Stage>;
}

export function PerspectiveCrawl() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1);
  return <Stage label={t('demo.collection.perspectiveCrawl')} className="cx-night"><div style={{ height:155,perspective:200,overflow:'hidden' }}><div style={{ transformOrigin:'50% 100%',transform:`rotateX(35deg) translateY(${70-p*210}px)`,textAlign:'center',color:'#fcd34d',fontWeight:800,fontSize:20,lineHeight:1.6 }}>{[0,1,2,3].map(i=><p key={i}>{t('demo.collection.crawlLine',{number:i+1})}</p>)}</div></div></Stage>;
}
export function StickyStackedCards() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1); const ref=usePreviewScroll(p);
  return <Stage label={t('demo.collection.stickyStack')}><div ref={ref} className="cx-scroll-window" tabIndex={0} aria-label={t('demo.collection.scrollingPreview')}>{palette.slice(0,3).map((color,i)=><div key={color} style={{ position:'sticky',top:i*7,margin:'0 5px 45px',height:108,borderRadius:10,padding:18,background:color,color:'#30243e',boxShadow:'0 -3px 10px #0002' }}><strong style={{ fontSize:24 }}>{t('demo.collection.chapterNumber',{number:i+1})}</strong><div className="cx-sample-lines" /></div>)}<div style={{ height:45 }}/></div></Stage>;
}
export function TimelineTrackScroll() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1);
  return <Stage label={t('demo.collection.timelineTrack')}><div style={{ overflow:'hidden',height:145 }}><div className="cx-row" style={{ width:600,transform:`translateX(${-p*340}px)`,gap:16,padding:'20px 8px' }}>{palette.map((color,i)=><div key={color} style={{ flex:'0 0 100px' }}><div style={{ borderBottom:'2px solid #a78bfa',paddingBottom:8 }}>{2022+i}</div><div style={{ background:color,color:'#322642',padding:10,marginTop:10,borderRadius:8 }}>{t('demo.collection.chapterNumber',{number:i+1})}</div></div>)}</div></div></Stage>;
}
export function FooterUncover() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1); const ref=usePreviewScroll(p);
  return <Stage label={t('demo.collection.footerUncover')}><div ref={ref} className="cx-scroll-window" style={{ background:'#5b3d88' }} tabIndex={0} aria-label={t('demo.collection.scrollingPreview')}><div style={{ position:'relative',zIndex:1,height:290,background:'#ddd6fe',color:'#332445',padding:18,borderRadius:'0 0 14px 14px',boxShadow:'0 8px 15px #0003' }}><strong>{t('demo.collection.readingPage')}</strong>{[0,1,2,3].map(i=><div key={i} className="cx-sample-lines" style={{ marginTop:15 }}/>)}</div><div style={{ position:'sticky',bottom:0,height:75,display:'grid',placeItems:'center',color:'#fff',fontWeight:800 }}>{t('demo.collection.endNote')}</div></div></Stage>;
}
export function ScrollPathDraw() {
  const { t }=useLocale(); const [p]=useDemoNumber(0,0,1); const ref=usePreviewScroll(p);
  return <Stage label={t('demo.collection.scrollPath')}><div className="cx-row"><svg viewBox="0 0 70 140" width="70" height="140" aria-hidden="true"><path d="M35 10C-5 35 75 55 35 80S10 115 35 130" fill="none" stroke="#8b5cf633" strokeWidth="5"/><path d="M35 10C-5 35 75 55 35 80S10 115 35 130" fill="none" stroke="#8b5cf6" strokeWidth="5" pathLength="1" strokeDasharray="1" strokeDashoffset={1-p} /></svg><div ref={ref} className="cx-scroll-window" style={{ flex:1 }} tabIndex={0} aria-label={t('demo.collection.scrollingPreview')}>{[0,1,2,3].map(i=><div key={i} className="cx-cell" style={{ margin:5,height:90 }}>{t('demo.collection.chapterNumber',{number:i+1})}<div className="cx-sample-lines" /></div>)}</div></div></Stage>;
}

export function DocumentMinimap() {
  const { t }=useLocale(); const [selected,setSelected]=useState(0);
  return <Stage label={t('demo.collection.documentMinimap')}><div className="cx-row" style={{ alignItems:'stretch' }}><div style={{ flex:1,height:140,overflow:'hidden',borderRadius:8 }}><div style={{ transform:`translateY(${-selected*140}px)`,transition:'transform .35s' }}>{palette.slice(0,3).map((color,i)=><div key={color} style={{ height:140,padding:16,background:color,color:'#312640' }}><strong>{t('demo.collection.chapterNumber',{number:i+1})}</strong><div className="cx-sample-lines" style={{ marginTop:15 }}/></div>)}</div></div><div className="cx-col" style={{ width:42 }}>{palette.slice(0,3).map((color,i)=><button key={color} type="button" aria-label={t('demo.collection.chapterNumber',{number:i+1})} aria-pressed={selected===i} onClick={()=>setSelected(i)} style={{ height:40,background:color,borderRadius:3,color:'#312640',outline:selected===i?'2px solid #7c3aed':undefined,outlineOffset:2 }}>{i+1}</button>)}</div></div></Stage>;
}
export function BreadcrumbOverflow() {
  const { t }=useLocale(); const [expanded,setExpanded]=useState(false); const [selected,setSelected]=useState(3); const keys=['demo.collection.home','demo.collection.projects','demo.collection.studio','demo.collection.assets'] as const;
  return <Stage label={t('demo.collection.breadcrumbOverflow')}><nav aria-label={t('demo.collection.breadcrumbOverflow')} className="cx-row" style={{ flexWrap:'wrap',marginTop:28,gap:4 }}><button type="button" className="cx-pill" onClick={()=>setSelected(0)}>{t(keys[0])}</button>{expanded?keys.slice(1,3).map((key,i)=><button key={key} type="button" className="cx-pill" onClick={()=>setSelected(i+1)}>{t(key)}</button>):<button type="button" className="cx-pill" aria-expanded={expanded} aria-label={t('demo.collection.showPath')} onClick={()=>setExpanded(true)}>…</button>}<button type="button" className="cx-pill" onClick={()=>setSelected(3)}>{t(keys[3])}</button></nav><output style={{ display:'block',marginTop:20,textAlign:'center' }}>{t(keys[selected])}</output>{expanded&&<button type="button" className="cx-action" onClick={()=>setExpanded(false)}>{t('demo.collection.collapse')}</button>}</Stage>;
}
export function FlyoutBranchMenu() {
  const { t }=useLocale(); const [open,setOpen]=useState(false); const [selected,setSelected]=useState(0); const keys=['demo.collection.images','demo.collection.documents'] as const;
  return <Stage label={t('demo.collection.flyoutBranch')}><div className="cx-row" style={{ marginTop:20,alignItems:'start',gap:5 }}><button type="button" className="cx-cell" style={{ width:'45%',textAlign:'left' }} aria-expanded={open} onClick={()=>setOpen(!open)}>{t('demo.collection.library')} →</button>{open&&<div className="cx-col cx-cell" style={{ flex:1,boxShadow:'0 5px 15px #0002' }}>{keys.map((key,i)=><button key={key} type="button" className="cx-pill" aria-pressed={selected===i} onClick={()=>setSelected(i)}>{t(key)}</button>)}</div>}</div><output style={{ display:'block',marginTop:20 }}>{t(keys[selected])}</output></Stage>;
}
export function VerticalJourneyRail() {
  const { t }=useLocale(); const [selected,setSelected]=useState(0); const keys=['demo.collection.start','demo.collection.explore','demo.collection.finish'] as const;
  return <Stage label={t('demo.collection.journeyRail')}><div className="cx-row"><div className="cx-col" style={{ borderLeft:'2px solid #a78bfa',paddingLeft:12 }}>{keys.map((key,i)=><button key={key} type="button" className="cx-pill" aria-current={selected===i?'step':undefined} aria-pressed={selected===i} onClick={()=>setSelected(i)}>{t(key)}</button>)}</div><div style={{ flex:1,textAlign:'center',fontSize:30 }}><span style={{ color:palette[selected] }}>{['◎','✦','⚑'][selected]}</span><div style={{ fontSize:12,color:'inherit' }}>{t(keys[selected])}</div></div></div></Stage>;
}
export function WorkspaceSwitcher() {
  const { t }=useLocale(); const [open,setOpen]=useState(false); const [selected,setSelected]=useState(0); const keys=['demo.collection.personal','demo.collection.studio','demo.collection.team'] as const;
  return <Stage label={t('demo.collection.workspaceSwitcher')}><button type="button" className="cx-pill" style={{ width:'100%',textAlign:'left' }} aria-expanded={open} onClick={()=>setOpen(!open)}>{t(keys[selected])} ▾</button>{open&&<div className="cx-col cx-cell" style={{ marginTop:6,gap:4 }}>{keys.map((key,i)=><button key={key} type="button" className="cx-pill" aria-pressed={selected===i} onClick={()=>{setSelected(i);setOpen(false);}}>{t(key)}</button>)}</div>}<div className="cx-sample-lines" style={{ marginTop:10 }}/></Stage>;
}

export function MultitrackTimeline() {
  const { t }=useLocale(); const [selected,setSelected]=useState(0); const keys=['demo.collection.videoTrack','demo.collection.titleTrack','demo.collection.audioTrack'] as const;
  return <Stage label={t('demo.collection.multitrack')}><div className="cx-col" style={{ gap:7 }}>{keys.map((key,i)=><div key={key} style={{ display:'grid',gridTemplateColumns:'50px 1fr',gap:7,alignItems:'center' }}><span className="cx-small">{t(key)}</span><div style={{ background:'#8b7cbf22',height:27,position:'relative',borderRadius:4 }}><button type="button" aria-label={t(key)} aria-pressed={selected===i} onClick={()=>setSelected(i)} style={{ position:'absolute',left:`${i*13}%`,width:`${85-i*18}%`,height:25,borderRadius:4,background:palette[i],color:'#30253f',outline:selected===i?'2px solid #7c3aed':undefined }}>{i+1}</button></div></div>)}</div><output className="cx-cell" style={{ display:'block',marginTop:12 }}>{t(keys[selected])} · {t('demo.collection.clipNumber',{number:selected+1})}</output></Stage>;
}
export function CollapsibleRunLog() {
  const { t }=useLocale(); const keys=['demo.collection.prepare','demo.collection.validate','demo.collection.complete'] as const;
  return <Stage label={t('demo.collection.runLog')} className="cx-night"><div className="cx-col" style={{ gap:5 }}>{keys.map((key,i)=><details key={key} className="cx-cell" open={i===0?true:undefined}><summary style={{ cursor:'pointer' }}>{t(key)} <span style={{ color:'#bef264' }}>✓</span></summary><div style={{ marginTop:5,fontFamily:'monospace',fontSize:10,opacity:.7 }}>{t('demo.collection.logDetail',{number:i+1})}</div></details>)}</div></Stage>;
}
export function ColumnVisibilityTable() {
  const { t }=useLocale(); const [showValue,setShowValue]=useState(true); const [showStatus,setShowStatus]=useState(true);
  return <Stage label={t('demo.collection.columnVisibility')}><div className="cx-row" style={{ fontSize:10,marginBottom:10 }}><label><input type="checkbox" checked={showValue} onChange={event=>setShowValue(event.target.checked)} /> {t('demo.collection.value')}</label><label><input type="checkbox" checked={showStatus} onChange={event=>setShowStatus(event.target.checked)} /> {t('demo.collection.status')}</label></div><table style={{ width:'100%',textAlign:'left',borderCollapse:'collapse' }}><thead><tr><th>{t('demo.collection.item')}</th>{showValue&&<th>{t('demo.collection.value')}</th>}{showStatus&&<th>{t('demo.collection.status')}</th>}</tr></thead><tbody>{[24,48,72].map((value,i)=><tr key={value} style={{ borderTop:'1px solid #8b7cbf33' }}><td style={{ padding:'6px 0' }}>{t('demo.collection.itemNumber',{number:i+1})}</td>{showValue&&<td>{value}</td>}{showStatus&&<td style={{ color:'#0d967c' }}>✓</td>}</tr>)}</tbody></table></Stage>;
}
export function CrossfilterBars() {
  const { t }=useLocale(); const [selected,setSelected]=useState<number|null>(null); const data=[34,67,48];
  return <Stage label={t('demo.collection.crossfilterBars')}><div className="cx-row" style={{ alignItems:'end',height:100,justifyContent:'center' }}>{data.map((value,i)=><button key={i} type="button" aria-label={t('demo.collection.categoryValue',{number:i+1,value})} aria-pressed={selected===i} onClick={()=>setSelected(selected===i?null:i)} style={{ height:value+15,width:48,borderRadius:'7px 7px 0 0',background:palette[i],color:'#30243c',opacity:selected===null||selected===i?1:.3 }}>{value}</button>)}</div><div className="cx-cell" style={{ marginTop:8,textAlign:'center' }}><output>{t('demo.collection.totalValue',{value:selected===null?data.reduce((a,b)=>a+b,0):data[selected]})}</output></div></Stage>;
}
const series=[25,42,31,61,46,80,52,69,35,55,76,45,64,88];
export function OverviewDetailChart() {
  const { t }=useLocale(); const [start,setStart]=useState(0); const values=series.slice(start,start+7);
  return <Stage label={t('demo.collection.overviewDetail')}><svg viewBox="0 0 280 130" width="100%" height="130" aria-hidden="true"><path d="M10 90H270" stroke="#8b7cbf55"/><polyline points={values.map((v,i)=>`${15+i*41},${95-v}`).join(' ')} fill="none" stroke="#8b5cf6" strokeWidth="3"/>{values.map((v,i)=><circle key={i} cx={15+i*41} cy={95-v} r="3" fill="#fb7185"/>)}<polyline points={series.map((v,i)=>`${10+i*20},${125-v*.2}`).join(' ')} fill="none" stroke="#8b7cbf"/><rect x={start*20+6} y="103" width="128" height="25" fill="#8b5cf622" stroke="#8b5cf6"/></svg><Range min={0} max={7} value={start} onChange={setStart} label={t('demo.collection.windowStart')}/><span className="cx-small">{t('demo.collection.windowRange',{start:start+1,end:start+7})}</span></Stage>;
}

export const LAYOUT_COLLECTION_DEMOS = {
  'ly-circular-thumbnail-gallery':CircularGallery, 'ly-triangle-tessellation-grid':TriangleTessellation, 'ly-justified-image-rows':JustifiedImageRows, 'ly-overlap-editorial-grid':OverlapEditorial, 'ly-alternating-feature-rows':AlternatingFeatureRows,
  'ly-perspective-text-crawl':PerspectiveCrawl, 'ly-sticky-stacked-cards':StickyStackedCards, 'ly-horizontal-timeline-track':TimelineTrackScroll, 'ly-footer-uncover-scroll':FooterUncover, 'ly-scroll-linked-path':ScrollPathDraw,
  'ly-document-minimap-navigation':DocumentMinimap, 'ly-collapsed-breadcrumb-path':BreadcrumbOverflow, 'ly-flyout-branch-menu':FlyoutBranchMenu, 'ly-vertical-journey-rail':VerticalJourneyRail, 'ly-workspace-switcher':WorkspaceSwitcher,
  'ly-multitrack-clip-timeline':MultitrackTimeline, 'ly-collapsible-run-log':CollapsibleRunLog, 'ly-column-visibility-table':ColumnVisibilityTable, 'ly-crossfilter-summary-bars':CrossfilterBars, 'ly-overview-detail-chart':OverviewDetailChart,
};
