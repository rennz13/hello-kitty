import { useState } from 'react'
import { WARDROBE_COLORS } from './Wardrobe'

export function RibbonDrawer({selected,onChoose}) {
  const [open,setOpen]=useState(false)
  return <g className={`ribbon-drawer ${open?'ribbon-drawer-open':''}`}>
    <ellipse cx="120" cy="285" rx="107" ry="6" fill="#bba5c4" stroke="none" opacity=".15"/>
    <path d="M26 270V282M213 270V282" stroke="#baa1bb" strokeWidth="5"/>
    <rect x="15" y="191" width="211" height="84" rx="9" fill="#ead8e8" stroke="#c9acc9" strokeWidth="2"/>
    <rect x="22" y="201" width="197" height="65" rx="6" fill="#fdf3f9" stroke="#dac3db"/>
    {open && <g className="ribbon-drawer-contents">{WARDROBE_COLORS.map((color,index)=>{
      const x=24+index%5*39,y=204+Math.floor(index/5)*30
      const wearing=selected===color.value
      return <g key={color.value} transform={`translate(${x} ${y})`} className="drawer-ribbon-choice" role="button" tabIndex={0} aria-pressed={wearing} aria-label={`${color.name} ribbon, ${wearing?'wearing':'tap to wear'}`} onClick={()=>onChoose?.('ribbon',color.value)} onKeyDown={event=>{
        if(event.key==='Enter'||event.key===' '){event.preventDefault();onChoose?.('ribbon',color.value)}
      }}><title>{color.name}{wearing?' - wearing':' - tap to wear'}</title>
        <rect className="ribbon-choice-focus" width="36" height="27" rx="5" fill={wearing?'#ece0f5':'#fffaf5'} stroke={wearing?'#b79bc9':'#ecdfeb'} strokeWidth="1"/>
        <path d="M15 10Q1-1 4 12Q1 25 15 18Q30 28 33 14Q36 0 22 10Z" fill={color.value} stroke="#bba1bf" strokeWidth="1.2"/>
        <path d="M7 10L15 14M23 14L30 10" stroke="#fff8fc" strokeWidth="1.2"/>
        <ellipse cx="18" cy="14" rx="5" ry="6" fill={color.value} stroke="#bba1bf" strokeWidth="1"/>
      </g>
    })}</g>}
    <g className="ribbon-drawer-front drawer-toggle" role="button" tabIndex={0} aria-expanded={open} aria-label={open?'Close ribbon drawer':'Open ribbon drawer'} onClick={()=>setOpen(value=>!value)} onKeyDown={event=>{
      if(event.key==='Enter'||event.key===' '){event.preventDefault();setOpen(value=>!value)}
    }}><title>{open?'Tap to close ribbon drawer':'Tap to open ribbon drawer'}</title>
      <rect className="drawer-front-focus" x="18" y="198" width="205" height="73" rx="7" fill="#eddce9" stroke="#c9acc9" strokeWidth="2"/>
      <rect x="27" y="208" width="187" height="53" rx="5" fill="#f6e9f2" stroke="#dec6dc" strokeWidth="1.2"/>
      <path d="M32 213H208M32 256H208" stroke="#fff8fb" strokeWidth="1.3"/>
      <path d="M107 229H135" stroke="#c6ad87" strokeWidth="3.5"/>
      <circle cx="107" cy="229" r="2" fill="#e2d2ac" stroke="none"/><circle cx="135" cy="229" r="2" fill="#e2d2ac" stroke="none"/>
      <path d="M44 239L44 247M40 243H48M196 239V247M192 243H200" stroke="#dbc5df" strokeWidth="1"/>
      <text x="120" y="250" textAnchor="middle" fontFamily="Georgia,serif" fontSize="8" letterSpacing="1.5" fill="#b69abb" stroke="none">LITTLE RIBBONS</text>
    </g>
    <path d="M18 195H223" stroke="#fff8f3" strokeWidth="4"/>
  </g>
}
