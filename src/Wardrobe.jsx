import { useState } from 'react'
export const WARDROBE_COLORS = [
  {name:'Baby pink',value:'#f5a9ce'}, {name:'Lavender',value:'#c9b6e4'},
  {name:'Mint',value:'#b7d9cd'}, {name:'Sky blue',value:'#c1d9ed'},
  {name:'Buttercream',value:'#f4e2a9'}, {name:'Peach',value:'#f4d0bd'},
  {name:'Periwinkle',value:'#c8cef0'}, {name:'Lilac',value:'#e3c8e8'},
  {name:'Soft cream',value:'#f6ecd8'}, {name:'Blush',value:'#f2c9db'},
]
export function OutfitPreview({kind,color}) {
  return <svg viewBox="0 0 70 70" aria-hidden="true">{kind==='ribbon'?<g stroke="#bba1bf" strokeWidth="1.8" strokeLinejoin="round"><path d="M30 27Q3 3 6 30Q3 56 30 44Q58 61 64 35Q70 4 41 27Z" fill={color}/><path d="M14 25L29 32M14 43L29 37M42 32L57 24M42 38L57 45" stroke="#fff7fd" strokeWidth="2"/><ellipse cx="35" cy="35" rx="10" ry="12" fill={color}/></g>:<g stroke="#bba1bf" strokeWidth="1.7" strokeLinejoin="round"><path d="M23 10L11 22L20 30L15 59Q35 67 55 59L50 30L59 22L47 10L35 16Z" fill={color}/><path d="M24 11L35 25L46 11" fill="#fffaf4"/><path d="M20 55Q35 60 50 55" stroke="#fffaf4" strokeWidth="3"/><path d="M27 35Q25 45 25 50M43 35Q45 45 45 50" stroke="#fffaf4" opacity=".6"/><circle cx="35" cy="32" r="2" fill="#fff8e9" stroke="none"/></g>}</svg>
}
export function Wardrobe({state,onChoose}) {
  const [kind,setKind]=useState('ribbon')
  const selected=kind==='ribbon'?state.bow:state.dress
  const owned=kind==='ribbon'?state.owned:state.ownedDresses
  const price=0
  return <div className="wardrobe-picker">
    <div className="wardrobe-tabs" role="group" aria-label="Clothing category"><button className={kind==='ribbon'?'wardrobe-tab-selected':''} aria-pressed={kind==='ribbon'} onClick={()=>setKind('ribbon')}>Ribbons</button><button className={kind==='dress'?'wardrobe-tab-selected':''} aria-pressed={kind==='dress'} onClick={()=>setKind('dress')}>Dresses</button></div>
    <p className="wardrobe-note">Mix a ribbon and dress in your favorite soft colors.</p>
    <div className="wardrobe-color-grid">{WARDROBE_COLORS.map(color=>{
      const unlocked=true,wearing=selected===color.value
      return <button key={color.value} className={`wardrobe-color ${wearing?'outfit-selected':''}`} aria-pressed={wearing} aria-label={`${color.name} ${kind}, ${wearing?'wearing':unlocked?'wear':`${price} coins`}`} onClick={()=>onChoose(kind,color.value)}><OutfitPreview kind={kind} color={color.value}/><b>{color.name}</b><small>{wearing?'Wearing \u2713':unlocked?'Wear it':`\u2727 ${price}`}</small></button>
    })}</div>
  </div>
}
export function DressRack({onChoose,selected}) {
  const colors=WARDROBE_COLORS
  return <>
    <path d="M17 197V67Q17 58 27 58H213Q223 58 223 67V197" fill="#fbf2fa" stroke="#d0b7d9" strokeWidth="2"/>
    <path d="M23 71H217V187H23Z" fill="#f4e8f5" stroke="none"/>
    <path d="M30 78V183M70 78V183M110 78V183M150 78V183M190 78V183" stroke="#fff8fc" strokeWidth="1" opacity=".6"/>
    <path d="M20 275V64H220V275M13 64H227M21 126H219" stroke="#c7b3ce" strokeWidth="6"/><path d="M18 61H222M24 123H216" stroke="#f9effb" strokeWidth="2"/>{colors.map((color,i)=><g className="dress-rack-choice" role="button" tabIndex={0} aria-label={`Choose ${color.name} dress`} aria-pressed={selected===color.value} key={color.value} onClick={()=>onChoose?.('dress',color.value)} onKeyDown={event=>{
    if(event.key==='Enter'||event.key===' '){event.preventDefault();onChoose?.('dress',color.value)}
  }}><title>{color.name} dress</title><g transform={`translate(${30+i%5*40} ${71+Math.floor(i/5)*60}) scale(1 .5)`}><path d="M10 0V16L-3 25H23L10 16" stroke="#b7a4be" strokeWidth="1.5"/><path d="M2 25L-6 55L3 61L-2 101H23L18 61L27 55L18 25L10 30Z" fill={color.value} stroke="#bba5c6" strokeWidth="1.6"/><path d="M3 27L10 41L17 27" fill="#fffaf4" stroke="#dac7d8" strokeWidth="1"/><path d="M3 66Q10 72 18 66" stroke="#fffaf4" strokeWidth="1.8"/><path d="M2 95H20" stroke="#fff9f5" strokeWidth="2"/><circle cx="10" cy="50" r="1.6" fill="#fff8e2" stroke="none"/><rect className="rack-choice-focus" x="-8" y="23" width="37" height="83" rx="6" fill="transparent" stroke="none"/></g></g>)}</>
}
