import { useEffect, useRef, useState } from 'react'
import { Food } from './Food'

function Heart() {return <svg viewBox="0 0 60 60" aria-hidden="true"><path d="M30 16Q10-2 6 18Q1 34 30 53Q59 34 54 18Q50-2 30 16Z" fill="#efb5d5" stroke="#ce98bc" strokeWidth="2"/><path d="M13 20Q13 11 21 13" fill="none" stroke="#fff0fa" strokeWidth="4" strokeLinecap="round"/></svg>}
function Basket(){return <svg viewBox="0 0 100 80" aria-hidden="true"><path d="M18 35Q19 2 50 2Q81 2 82 35" fill="none" stroke="#c0a0c9" strokeWidth="7"/><path d="M8 32H92L81 73H19Z" fill="#e8d4ef" stroke="#baa0c5" strokeWidth="2.5"/><path d="M16 46H86M21 58H82M31 35L35 71M49 35V71M67 35L64 71" stroke="#d1b5dc" strokeWidth="2"/><rect x="4" y="29" width="92" height="10" rx="5" fill="#f8eafa" stroke="#c6a9d0" strokeWidth="2"/><path d="M50 47Q41 38 39 46Q37 52 50 60Q63 52 61 46Q59 38 50 47Z" fill="#fff4df" stroke="none"/></svg>}
export function CatchGame({name, onClaim}) {
  const strawberries = name === 'Strawberry Catch'
  const fieldRef = useRef(null)
  const basketRef = useRef(50)
  const scoreRef = useRef(0)
  const [basket, setBasket] = useState(50)
  const [round, setRound] = useState(0)
  const [frame, setFrame] = useState({x:50,y:-8,score:0,event:0,caught:false})
  const won = frame.score >= 10

  function moveBasket(value) {
    basketRef.current = Math.max(10, Math.min(90, value))
    setBasket(basketRef.current)
  }
  function restart() {scoreRef.current=0;moveBasket(50);setFrame({x:50,y:-8,score:0,event:0,caught:false});setRound(v=>v+1);fieldRef.current?.focus()}
  useEffect(() => {
    let raf, last, event = 0, caught = false
    let x = 15 + Math.random()*70, y = -8
    fieldRef.current?.focus()
    function tick(time) {
      const dt = last === undefined ? 0 : Math.min(.05,(time-last)/1000)
      last=time
      y += dt * (31 + scoreRef.current * 1.2)
      if (y >= 82) {
        caught = Math.abs(x-basketRef.current) < 12
        if (caught) scoreRef.current += 1
        event += 1
        x = 12 + Math.random()*76
        y = -8
      }
      setFrame({x,y,score:scoreRef.current,event,caught})
      if(scoreRef.current < 10) raf=requestAnimationFrame(tick)
    }
    raf=requestAnimationFrame(tick)
    return()=>cancelAnimationFrame(raf)
  },[round])
  function steer(event) {
    if(won)return
    const rect=event.currentTarget.getBoundingClientRect()
    moveBasket((event.clientX-rect.left)/rect.width*100)
  }
  return <div className={`catch-game ${strawberries ? 'catch-berry' : ''}`}>
    <div className="catch-eyebrow">{strawberries ? 'THE SWEET LITTLE ORCHARD' : 'A LITTLE SHOWER OF LOVE'}</div>
    <h2 id="catch-game-title">{name}</h2>
    <p className="catch-intro">{won ? 'You caught a pocketful of happiness!' : `Catch 10 ${strawberries ? 'strawberries' : 'hearts'} in your little basket.`}</p>
    <div className="catch-scoreboard"><span><b>{frame.score}</b> / 10 caught</span><span className="catch-reward">&#x2727; 30 coin reward</span></div>
    <div className="catch-progress" role="progressbar" aria-label="Catch progress" aria-valuemin={0} aria-valuemax={10} aria-valuenow={frame.score}><i style={{width:`${frame.score*10}%`}}/></div>
    <div ref={fieldRef} className="dream-catch-field" tabIndex={0} role="group" aria-label="Catch playground. Drag or use left and right arrow keys to move the basket." onPointerDown={event=>{event.currentTarget.setPointerCapture(event.pointerId);steer(event)}} onPointerMove={event=>{if(event.pointerType==='mouse'||event.buttons)steer(event)}} onKeyDown={event=>{
      if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();moveBasket(basketRef.current+(event.key==='ArrowLeft'?-6:6))}
    }}>
      <svg className="catch-landscape" viewBox="0 0 600 400" preserveAspectRatio="none" aria-hidden="true"><circle cx="494" cy="66" r="30" fill="#fff2cc"/><circle cx="494" cy="66" r="42" fill="#fff2cc" opacity=".18"/><g className="catch-cloud cloud-one" fill="#fffcf8"><path d="M34 83Q28 59 55 64Q67 37 87 62Q113 48 124 74Q145 72 145 85Z"/></g><g className="catch-cloud cloud-two" fill="#fffcf8"><path d="M327 140Q324 120 344 124Q352 104 370 121Q391 109 400 130Q418 129 420 141Z"/></g><path d="M0 314Q88 244 184 303Q299 247 404 298Q510 241 600 293V400H0Z" fill="#e3d6ed"/><path d="M0 356Q115 296 249 350Q392 303 600 338V400H0Z" fill={strawberries?'#d7e8d0':'#dce8e0'}/><path d="M0 383Q169 333 317 376Q490 337 600 366V400H0Z" fill="#f8eedf"/></svg>
      <div className="catch-sky-stars" aria-hidden="true">{Array.from({length:7},(_,i)=><i key={i} style={{left:`${8+i*14}%`,top:`${15+i%3*16}%`,animationDelay:`${i*-.6}s`}}/>)}</div>
      {!won && <div className="falling-treat" style={{left:`${frame.x}%`,top:`${frame.y}%`}}>{strawberries?<Food type="Strawberry"/>:<Heart/>}</div>}
      <div className="illustrated-basket" style={{left:`${basket}%`}}><div key={frame.event} className={frame.caught?'basket-caught':''}><Basket/></div></div>
      {frame.caught && <div key={frame.event} className="catch-pop" style={{left:`${basket}%`}} aria-hidden="true">+1 &#x2661;</div>}
      {won && <div className="catch-win"><span className="catch-win-icon" aria-hidden="true">&#x2727;</span><h3>Lovely catching!</h3><p>Ten little treasures, just for you.</p><div className="catch-win-confetti" aria-hidden="true">&#x2661; &#x2726; &#x2661; &#x2726;</div></div>}
    </div>
    <p className="catch-controls-hint">Drag across the sky, move your mouse, or use &#x2190; &#x2192;</p>
    <label className="catch-range-label">Move basket<input aria-label="Basket position" type="range" min="10" max="90" value={basket} disabled={won} onChange={event=>moveBasket(Number(event.target.value))}/></label>
    <div className="catch-game-footer"><button onClick={restart} className="catch-restart">&#x21BB; Play again</button>{won ? <button className="catch-claim" onClick={onClaim}>Collect 30 coins &#x2727;</button> : <span className="catch-gentle-note">Take your time. Every catch counts.</span>}</div>
    <span className="sr-only" role="status">{won?'You won! Collect your 30 coin reward.':`${frame.score} out of 10 caught`}</span>
  </div>
}
