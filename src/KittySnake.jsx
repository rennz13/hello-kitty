import { memo, useEffect, useRef, useState } from 'react'
import { Food } from './Food'
import { DIRECTIONS, GRID, newSnakeGame, stepSnake } from './snakeLogic'

const MiniKitty = memo(function MiniKitty({leader, index}) {
  const colors=['#efbed7','#d8c5eb','#c7ddcf','#d0dfef']
  return <svg viewBox="0 0 60 60" aria-hidden="true"><path d="M10 22L10 7Q18 6 24 15Q30 12 37 15Q43 6 51 7L50 23Q59 33 52 44Q46 53 30 53Q12 53 7 43Q1 32 10 22Z" fill="#fffefa" stroke={leader?'#a18aa6':'#c4b1cb'} strokeWidth="2" strokeLinejoin="round"/><path d="M8 32L1 29M7 38H0M9 44L2 48M52 32L59 29M53 38H60M51 44L58 48" stroke="#b39db7" strokeWidth="1.5"/><ellipse cx="21" cy="33" rx="2" ry="3" fill="#6f6274"/><ellipse cx="40" cy="33" rx="2" ry="3" fill="#6f6274"/><ellipse cx="30" cy="39" rx="3" ry="2" fill="#ead49b"/><path d="M40 15Q30 4 29 14Q28 23 40 20Q51 28 53 17Q54 7 43 15Z" fill={colors[index%colors.length]} stroke="#c5a9c7" strokeWidth="1.5"/><circle cx="41" cy="17" r="4" fill={colors[index%colors.length]} stroke="#c5a9c7"/></svg>
})
function readBest(){try{return Number(localStorage.getItem('kitty-snake-best'))||0}catch{return 0}}
export function KittySnake({onClaim,audio}) {
  const [state,setState]=useState(newSnakeGame)
  const [paused,setPaused]=useState(false)
  const [motionBody,setMotionBody]=useState(()=>newSnakeGame().body)
  const [round,setRound]=useState(0)
  const [best,setBest]=useState(readBest)
  const boardRef=useRef(null), stateRef=useRef(state), queue=useRef([]), touch=useRef(null), claimed=useRef(false)
  const ended=state.status!=='playing'
  const reward=state.score*3
  function steer(direction) {
    if(ended||paused||queue.current.length>=2)return
    const previous=queue.current.at(-1)||stateRef.current.direction
    const a=DIRECTIONS[previous],b=DIRECTIONS[direction]
    if(stateRef.current.body.length>1 && a.x+b.x===0&&a.y+b.y===0)return
    if(previous!==direction)queue.current.push(direction)
  }
  useEffect(()=>{
    if(paused||ended)return
    let raf, started
    let from=stateRef.current.body
    let to=from
    let duration=Math.max(260,360-stateRef.current.score*3)
    const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches
    function animate(time) {
      if(started===undefined)started=time
      if(time-started>=duration) {
        const previous=stateRef.current
        const next=stepSnake(previous,queue.current.shift()||previous.direction)
        if(next.score > previous.score) audio?.current?.play('game')
        if(next.status !== 'playing') audio?.current?.play('sleep')
        stateRef.current=next
        setState(next)
        from=previous.body
        to=next.body
        started=time
        duration=Math.max(260,360-next.score*3)
        if(next.status!=='playing') {setMotionBody(next.body);return}
      }
      const progress=reducedMotion?1:Math.min(1,(time-started)/duration)
      setMotionBody(to.map((part,index)=>{
        const previous=from[index]||from[from.length-1]
        return {x:previous.x+(part.x-previous.x)*progress,y:previous.y+(part.y-previous.y)*progress}
      }))
      raf=requestAnimationFrame(animate)
    }
    raf=requestAnimationFrame(animate)
    return()=>cancelAnimationFrame(raf)
  },[paused,ended,round,audio])
  useEffect(()=>{
    if(state.score>best){setBest(state.score);try{localStorage.setItem('kitty-snake-best',String(state.score))}catch{/* Browser storage may be unavailable. */}}
  },[state.score,best])
  useEffect(()=>{boardRef.current?.focus()},[])
  useEffect(()=>{
    function autoPause(){if(document.hidden)setPaused(true)}
    document.addEventListener('visibilitychange',autoPause)
    return()=>document.removeEventListener('visibilitychange',autoPause)
  },[])
  function restart(){const next=newSnakeGame();audio?.current?.play('game');stateRef.current=next;queue.current=[];claimed.current=false;setState(next);setMotionBody(next.body);setRound(value=>value+1);setPaused(false);boardRef.current?.focus()}
  function claim(){if(claimed.current||!ended||!reward)return;claimed.current=true;onClaim(reward,state.score*5)}
  return <div className="kitty-snake-game">
    <div className="snake-eyebrow">THE STRAWBERRY GARDEN CLUB</div>
    <h2>Kitty Snake</h2><p className="snake-intro">One strawberry, one more Kitty. Grow your little parade!</p>
    <div className="snake-top-controls"><span className="snake-top-coins" aria-label={`${reward} coins earned`}>&#x2727; {reward} coins</span>
      <button onClick={restart} aria-label="New game" title="New game"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 10a9 9 0 1 1 2 8M3 4v6h6"/></svg></button>
      <button disabled={ended} onClick={()=>setPaused(value=>!value)} aria-label={paused?'Resume game':'Pause game'} title={paused?'Resume':'Pause'}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paused?<path d="m8 4 12 8-12 8Z"/>:<><path d="M7 5v14M17 5v14" strokeWidth="3"/></>}</svg></button>
    </div><div className="snake-stats"><div><small>STRAWBERRIES</small><b>{state.score}</b></div><div><small>KITTY FRIENDS</small><b>{state.body.length}</b></div><div><small>PERSONAL BEST</small><b>{best}</b></div></div>
    <div className="snake-garden-border"><div ref={boardRef} className="snake-board" tabIndex={0} role="group" aria-label="Kitty Snake garden. Use arrow keys or WASD. Swipe or use the direction controls on phones. Space pauses." onKeyDown={event=>{
      const keys={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',w:'up',s:'down',a:'left',d:'right'}
      const direction=keys[event.key]||keys[event.key.toLowerCase()]
      if(direction){event.preventDefault();if(!event.repeat)steer(direction)}
      if(event.code==='Space'&&!ended){event.preventDefault();setPaused(value=>!value)}
    }} onPointerDown={event=>{event.currentTarget.focus();event.currentTarget.setPointerCapture(event.pointerId);touch.current={x:event.clientX,y:event.clientY}}} onPointerMove={event=>{
      if(!touch.current)return
      const dx=event.clientX-touch.current.x,dy=event.clientY-touch.current.y
      if(Math.max(Math.abs(dx),Math.abs(dy))<12)return
      steer(Math.abs(dx)>Math.abs(dy)?dx>0?'right':'left':dy>0?'down':'up')
      touch.current={x:event.clientX,y:event.clientY}
    }} onPointerUp={()=>{touch.current=null}} onPointerCancel={()=>{touch.current=null}}>
      <div className="snake-garden-flowers" aria-hidden="true"><span>✿</span><span>✧</span><span>✿</span><span>✧</span></div>
      <svg className="snake-trail" viewBox={`0 0 ${GRID} ${GRID}`} aria-hidden="true"><polyline points={motionBody.map(p=>`${p.x+.5},${p.y+.5}`).join(' ')} fill="none" stroke="#dfcee8" strokeWidth=".38" strokeLinecap="round" strokeLinejoin="round"/></svg>
      {state.berry&&<div className="snake-berry" key={`${state.berry.x}-${state.berry.y}`} style={{width:`${100/GRID}%`,height:`${100/GRID}%`,left:`${state.berry.x*100/GRID}%`,top:`${state.berry.y*100/GRID}%`}}><Food type="Strawberry"/></div>}
      {motionBody.map((part,index)=><div key={index} className={`snake-kitty ${index===0?'snake-leader':''}`} style={{width:`${100/GRID}%`,height:`${100/GRID}%`,transform:`translate(${part.x*100}%,${part.y*100}%)`,zIndex:state.body.length-index}}><MiniKitty leader={index===0} index={index}/></div>)}
      {state.score>0&&!ended&&<span key={state.score} className="snake-yum" style={{left:`${state.body[0].x*100/GRID}%`,top:`${state.body[0].y*100/GRID}%`}}>+1 Kitty ♡</span>}
      {(ended||paused)&&<div className="snake-overlay"><span className="snake-overlay-icon">{ended?'୨୧':'☾'}</span><h3>{paused&&!ended?'A little breather':state.status==='won'?'A perfect Kitty parade!':'What a sweet adventure!'}</h3><p>{paused&&!ended?'Your garden will wait for you.':state.reason}</p>{ended?<span className="snake-earned">{state.score} strawberries · {reward} coins earned</span>:<button onClick={()=>{setPaused(false);boardRef.current?.focus()}}>Continue playing</button>}</div>}
    </div></div>
    <div className="snake-bottom"><div className="snake-dpad" role="group" aria-label="Direction controls">{[['up','↑'],['left','←'],['down','↓'],['right','→']].map(([direction,icon])=><button key={direction} className={`snake-go-${direction}`} aria-label={`Move ${direction}`} disabled={ended||paused} onPointerDown={event=>{event.preventDefault();steer(direction)}} onClick={event=>{if(event.detail===0)steer(direction)}}>{icon}</button>)}</div></div>
    {ended && reward > 0 && <div className="snake-footer"><button className="snake-collect" onClick={claim}>Collect {reward} coins &#x2727;</button></div>}
    <span className="sr-only" role="status">{ended?`Game ended. ${state.score} strawberries, ${reward} coins earned.`:`${state.score} strawberries. ${state.body.length} Kitty friends.`}</span>
  </div>
}
