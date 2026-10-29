import { useEffect, useReducer, useRef, useState } from 'react'
import { Food } from './Food'
import { createMemoryGame, memoryReducer } from './memoryLogic'

function Bow(){return <svg viewBox="0 0 80 70" aria-hidden="true"><path d="M35 27Q7 2 9 27Q1 56 35 43Q67 66 71 37Q76 7 45 27Z" fill="#e6bcda" stroke="#bd97bc" strokeWidth="2"/><path d="M16 25L33 33M16 43L33 37M47 33L64 25M47 38L63 44" stroke="#fff1fb" strokeWidth="3"/><ellipse cx="40" cy="35" rx="11" ry="13" fill="#efcfe4" stroke="#bd97bc" strokeWidth="2"/></svg>}
function CardArt({symbol}) {
  if(symbol==='bow')return <Bow/>
  if(symbol==='strawberry'||symbol==='cupcake')return <Food type={symbol==='strawberry'?'Strawberry':'Cupcake'}/>
  return <svg viewBox="0 0 80 70" aria-hidden="true">{symbol==='kitty'?<g stroke="#ac99b3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 23L15 9L31 20Q41 17 50 20L65 9V25Q78 38 66 52Q39 67 15 52Q2 38 15 23Z" fill="#fffdf7"/><path d="M13 34L4 31M11 41H1M14 48L5 53M68 34L77 31M70 41H79M67 48L76 53"/><ellipse cx="28" cy="38" rx="2.4" ry="3.5" fill="#756579" stroke="none"/><ellipse cx="53" cy="38" rx="2.4" ry="3.5" fill="#756579" stroke="none"/><ellipse cx="40" cy="45" rx="4" ry="2.5" fill="#eedaa0" stroke="none"/><path d="M58 19Q44 5 43 18Q41 30 57 25Q70 34 73 23Q75 10 61 18Z" fill="#dfb8d8"/><circle cx="58" cy="22" r="5" fill="#edcce3"/></g>:symbol==='moon'?<><path d="M46 7A28 28 0 1 0 68 49Q28 52 46 7Z" fill="#f3e1ab" stroke="#cfbc8e" strokeWidth="2"/><path d="m61 10 3 7 8 1-6 5 1 8-6-4-7 4 2-8-6-5 8-1Z" fill="#d9c6eb"/></>:<g stroke="#bca4c9" strokeWidth="1.5"><path d="M40 43V66M40 58Q21 43 19 55Q25 65 40 61" fill="#c4dbbf" stroke="#a5bca0"/>{[0,60,120,180,240,300].map(angle=><ellipse key={angle} cx="40" cy="21" rx="10" ry="15" fill="#e8d4ef" transform={`rotate(${angle} 40 33)`}/>)}<circle cx="40" cy="33" r="11" fill="#f8e8b8" stroke="#d9c697"/></g>}</svg>
}
const labels={kitty:'Kitty',bow:'Pastel bow',strawberry:'Strawberry',moon:'Moon',flower:'Little flower',cupcake:'Cupcake'}
export function MemoryMatch({onClaim,audio}) {
  const [state,dispatch]=useReducer(memoryReducer,undefined,createMemoryGame)
  const [started,setStarted]=useState(null), [seconds,setSeconds]=useState(0)
  const claimed=useRef(false),firstCard=useRef(null)
  const won=state.matched.length===state.cards.length
  const matchedPair=state.flipped.length===2&&state.cards[state.flipped[0]].symbol===state.cards[state.flipped[1]].symbol
  useEffect(()=>{firstCard.current?.focus()},[])
  useEffect(()=>{
    if(state.flipped.length!==2)return
    audio?.current?.play(matchedPair ? 'reward' : 'click')
    const timer=setTimeout(()=>dispatch({type:'resolve'}),matchedPair?650:1000)
    return()=>clearTimeout(timer)
  },[state.flipped,matchedPair,audio])
  useEffect(()=>{
    if(started===null||won)return
    const timer=setInterval(()=>setSeconds(Math.floor((Date.now()-started)/1000)),250)
    return()=>clearInterval(timer)
  },[started,won])
  function flip(index){if(started===null)setStarted(Date.now());dispatch({type:'flip',index})}
  function restart(){dispatch({type:'reset',state:createMemoryGame()});setStarted(null);setSeconds(0);claimed.current=false;requestAnimationFrame(()=>firstCard.current?.focus())}
  const pairs=state.matched.length/2
  const time=`${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`
  return <div className="memory-game">
    <div className="memory-eyebrow">THE LITTLE KEEPSAKE COLLECTION</div>
    <h2>Memory Match</h2><p className="memory-intro">A little focus. A little magic. Find the six lovely pairs.</p>
    <div className="memory-stats"><div><small>PAIRS FOUND</small><b>{pairs}<em> / 6</em></b></div><div><small>MOVES</small><b>{state.moves}</b></div><div><small>PLAY TIME</small><b>{time}</b></div></div>
    <div className="memory-pair-progress" aria-label={`${pairs} of 6 pairs found`}>{Array.from({length:6},(_,i)=><span key={i} className={i<pairs?'pair-lit':''}>♡</span>)}</div>
    <div className="memory-playmat">
      <span className="memory-mat-star mat-star-one" aria-hidden="true">✧</span><span className="memory-mat-star mat-star-two" aria-hidden="true">✧</span>
      <div className="memory-grid" role="group" aria-label="Memory cards">{state.cards.map((card,index)=>{
        const matched=state.matched.includes(index),revealed=matched||state.flipped.includes(index)
        return <button ref={index===0?firstCard:undefined} key={card.id} className={`memory-card ${revealed?'card-revealed':''} ${matched?'card-matched':''}`} aria-label={matched?`${labels[card.symbol]}, matched`:revealed?labels[card.symbol]:`Reveal card ${index+1}`} aria-pressed={revealed} disabled={matched||state.flipped.includes(index)||state.flipped.length===2} onClick={()=>flip(index)}>
          <span className="memory-card-inner"><span className="memory-card-back" aria-hidden="true"><i/><Bow/><small>little lovely</small></span><span className={`memory-card-front card-art-${card.symbol}`} aria-hidden="true"><CardArt symbol={card.symbol}/><small>{labels[card.symbol]}</small>{matched&&<span className="memory-match-check">✓</span>}</span></span>
        </button>
      })}</div>
    </div>
    <p className="memory-feedback" role="status">{won?'Every little lovely has found its friend!':state.flipped.length===2?matchedPair?'A lovely match! ♡':'Almost! Remember those little faces.':state.flipped.length===1?'Who is hiding its matching friend?':'Turn two cards and find their matching friends.'}</p>
    {won&&<div className="memory-win"><span aria-hidden="true">✧ ♡ ✧</span><h3>Perfect little pairs!</h3><p>{state.moves} moves · {time} · 30 coins earned</p><button className="memory-claim" onClick={()=>{if(claimed.current)return;claimed.current=true;onClaim()}}>Collect 30 coins ✧</button></div>}
    <div className="memory-footer"><button onClick={restart}>↻ {won?'Play again':'Shuffle & restart'}</button><span>{won?'A lovely memory to keep.':'No rush. Enjoy every little discovery.'}</span></div>
  </div>
}
