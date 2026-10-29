import { useEffect, useId, useState } from 'react'
import { KittyCharacter } from './KittyCharacter'

export function DressingMirror({active, bow, dress, onToggle}) {
  const id=useId().replaceAll(':','')
  const [arrived,setArrived]=useState(false)
  useEffect(()=>{
    setArrived(false)
    if(!active)return
    const timer=setTimeout(()=>setArrived(true),window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:1150)
    return()=>clearTimeout(timer)
  },[active])
  return <g className={`dressing-mirror ${arrived?'mirror-in-use':''}`}>
    <defs><linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f1f3fb"/><stop offset=".5" stopColor="#e1e6f4"/><stop offset="1" stopColor="#f3e8f6"/></linearGradient><clipPath id={`${id}-clip`}><rect x="72" y="24" width="104" height="170" rx="50"/></clipPath></defs>
    <path d="M124 202V256M90 260H158" stroke="#c4afcf" strokeWidth="6"/>
    <ellipse cx="124" cy="293" rx="102" ry="6" fill="#b69ac0" stroke="none" opacity=".12"/>
    <rect x="30" y="258" width="188" height="22" rx="9" fill="#e6cfdf" stroke="#c3a4bf" strokeWidth="2"/>
    <path d="M39 263Q124 258 209 263" stroke="#fff1f7" strokeWidth="2"/>
    <path d="M40 274H208" stroke="#c9abc8" strokeDasharray="2 3" strokeWidth="1"/>
    <circle cx="77" cy="268" r="2" fill="#caa9c4" stroke="none"/><circle cx="124" cy="268" r="2" fill="#caa9c4" stroke="none"/><circle cx="171" cy="268" r="2" fill="#caa9c4" stroke="none"/><path d="M46 277V294M202 277V294" stroke="#bca9c2" strokeWidth="5"/>
    <rect x="62" y="14" width="124" height="190" rx="60" fill="#fff8e8" stroke="#d8c7ab" strokeWidth="1.8"/>
    <rect x="66" y="18" width="116" height="182" rx="56" fill="#f5eaf6" stroke="#e4d4e8" strokeWidth="1.5"/>
    <rect x="68" y="20" width="112" height="178" rx="54" fill={`url(#${id}-glass)`} stroke="#d6bedf" strokeWidth="8"/>
    <path d="M78 58Q82 31 108 28" stroke="#fffdf6" strokeWidth="2.5" opacity=".8"/>
    <g className="mirror-pearl-lights" fill="#fff8e4" stroke="#e4d4bd" strokeWidth=".8">{[[75,40],[66,77],[66,117],[75,164],[172,40],[182,77],[182,117],[172,164]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="3"/>)}</g>
    <g clipPath={`url(#${id}-clip)`}>
      <g className="mirror-kitty-reflection" opacity={arrived?.72:0}>
        <svg x="75" y="60" width="98" height="122" viewBox="0 0 300 330" aria-hidden="true"><KittyCharacter dress={dress} bow={bow} happy={false} fitting={arrived}/></svg>
      </g>
      <path d="M88 136L157 62M100 157L161 94" stroke="#fffaff" strokeWidth="7" opacity={arrived?.35:1}/>
    </g>
    {arrived&&<g className="mirror-admiring-sparkles" fill="#d9bfdf" stroke="none"><path d="m57 71 3 7 7 1-6 4 2 7-6-4-6 4 1-7-5-4 7-1Z"/><path d="m188 119 2 5 5 1-4 3 1 5-4-3-4 3 1-5-4-3 5-1Z"/></g>}
    <circle data-dress-mirror="true" cx="124" cy="266" r="1" fill="none" stroke="none"/>
    <g className="dress-mirror-toggle" role="button" tabIndex={0} aria-pressed={active} aria-label={active?'Finish using mirror':'Admire outfit in the mirror'} onClick={onToggle} onKeyDown={event=>{
      if(event.key==='Enter'||event.key===' '){event.preventDefault();onToggle?.()}
    }}><title>{active?'Tap to leave the mirror':'Tap to admire your outfit'}</title><rect className="dress-mirror-focus" x="63" y="16" width="122" height="188" rx="55" fill="transparent" stroke="none"/></g>
  </g>
}
