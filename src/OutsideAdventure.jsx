import { FlowerStory } from './FlowerStory'
import { GardenBench } from './GardenBench'
import { useEffect, useState } from 'react'
import { KittyCharacter } from './KittyCharacter'

export function OutsideAdventure({bow,dress,onPlay,seated,onBench,flowersGiven,onGiftComplete,onFlowersReturn}) {
  const [intro,setIntro]=useState(()=>!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [story,setStory]=useState(false)
  const [flutter,setFlutter]=useState(0)
  useEffect(()=>{if(!intro)return;const timer=setTimeout(()=>setIntro(false),3900);return()=>clearTimeout(timer)},[intro])
  return <div className="outside-adventure">
    <div className="garden-sun" aria-hidden="true"/>
    <div className="garden-petals" aria-hidden="true">{[0,1,2,3,4].map(i=><i key={i} style={{'--petal-index':i}}/>)}</div>
    <svg className="outside-landscape" viewBox="0 0 900 500" preserveAspectRatio="none" aria-hidden="true">
      
      <g className="outside-cloud" fill="#fffdf6"><path d="M65 149Q57 124 86 127Q95 98 120 123Q148 111 159 137Q183 134 185 152Z"/><path d="M455 185Q448 168 470 170Q482 147 500 169Q523 160 529 180H455Z"/></g>
      <path d="M0 303Q154 194 322 286Q469 212 632 286Q789 221 900 266V500H0Z" fill="#dcebd4"/>
      <path d="M0 352Q140 290 300 349Q470 275 642 333Q808 283 900 322V500H0Z" fill="#cee2c4"/>
      <path d="M395 500Q425 432 463 383Q495 344 555 331Q513 379 525 415Q541 462 575 500Z" fill="#f7e8cf"/>
      <path d="M0 426Q132 389 262 427Q346 443 404 500H0Z" fill="#e4edcf"/>
      <g stroke="#d7c5ad" strokeWidth="3" fill="#fff9e9"><path d="M11 331H321M11 360H321"/>{[20,62,104,146,188,230,272,314].map(x=><path key={x} d={`M${x} 382V314L${x+10} 303L${x+20} 314V382Z`}/>)}</g>
      <g transform="translate(73 207)" strokeLinejoin="round"><path d="M0 42L77-15L154 42" fill="#dbc8e4" stroke="#bda3c9" strokeWidth="4"/><path d="M14 43H139V171H14Z" fill="#fff3df" stroke="#d7c4a6" strokeWidth="3"/><path d="M62 171V96Q62 68 89 68Q116 68 116 96V171" fill="#dfc4d9" stroke="#c2a1ba" strokeWidth="3"/><circle cx="105" cy="125" r="4" fill="#c9ae84"/><rect x="28" y="68" width="24" height="34" rx="10" fill="#dcebf2" stroke="#d4bfa2" strokeWidth="3"/><path d="M40 69V101M28 86H52" stroke="#fffaf0" strokeWidth="2"/></g>
      <g transform="translate(755 229)" stroke="#a6bd9f" strokeWidth="3"><path d="M21 154V48" stroke="#bfaa8e" strokeWidth="9"/><ellipse cx="29" cy="25" rx="59" ry="55" fill="#bdd6b5"/><ellipse cx="-4" cy="52" rx="46" ry="42" fill="#c9dfbd"/><ellipse cx="63" cy="57" rx="44" ry="41" fill="#b7d0ad"/><path d="M20 106L-1 80M23 86L50 65" stroke="#c0b08d" strokeWidth="5"/><g fill="#f0ccde" stroke="#c7a4bc" strokeWidth="1.5">{[[8,12],[43,28],[72,60],[-15,56],[25,66]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="7"/>)}</g></g>
      {[55,275,690,830,335,602].map((x,i)=><g key={x} transform={`translate(${x} ${416+i%3*22})`}><path d="M0 15V-5M0 8Q-15-2-15 9Q-8 15 0 11" fill="#bfd8b2" stroke="#a5bd9b" strokeWidth="2"/><g fill={i%2?'#e4d1ed':'#f3cbdc'}>{[0,72,144,216,288].map(a=><ellipse key={a} cx="0" cy="-11" rx="5" ry="7" transform={`rotate(${a} 0 -5)`}/>)}</g><circle cy="-5" r="4" fill="#f6e8b7"/></g>)}
    </svg>
    <GardenBench seated={seated} onSit={onBench} visible={!intro && !story} flowersGiven={flowersGiven} onFlowers={()=>setStory(true)} onFlowersReturn={onFlowersReturn}/>
    <svg className="outside-butterfly-toy" viewBox="0 0 110 100" fill="none"><g className="outside-butterfly-control" role="button" tabIndex={0} aria-label="Play with the garden butterfly" onClick={()=>{setFlutter(v=>v+1);onPlay?.()}} onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();setFlutter(v=>v+1);onPlay?.()}}}><title>Tap the butterfly for a little garden joy</title><g key={flutter} className="garden-butterfly"><path className="butterfly-wing-left" d="M53 49Q4 4 17 46Q6 82 53 59Z" fill="#e6c8e8" stroke="#c0a2cc" strokeWidth="2"/><path className="butterfly-wing-right" d="M57 49Q106 4 93 46Q104 82 57 59Z" fill="#f0cddd" stroke="#c9a7bd" strokeWidth="2"/><path d="M55 40V65M55 41L48 31M55 41L62 31" stroke="#b09bbe" strokeWidth="3" strokeLinecap="round"/></g><rect className="butterfly-focus" x="5" y="18" width="100" height="65" rx="14" fill="transparent" stroke="none"/></g></svg>
    {story&&<FlowerStory bow={bow} dress={dress} onFinish={()=>{onGiftComplete?.();setStory(false)}}/>}
    {intro&&<div className="outside-intro" role="group" aria-label="Kitty walks outside into the garden">
      <div className="outside-intro-light"/>
      <div className="outside-porch-wall"/>
      <div className="outside-doorway"><div className="outside-opening-door"><span>♡</span><i/></div></div>
      <div className="outside-walking-kitty"><KittyCharacter bow={bow} dress={dress}/></div>
      <p className="outside-movie-caption">A little adventure awaits...</p>
      <button className="outside-skip" onClick={()=>setIntro(false)}>Skip &#x2192;</button>
    </div>}
  </div>
}
