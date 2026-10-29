import { useEffect, useRef, useState } from 'react'
import { KittyCharacter } from './KittyCharacter'
import { Bouquet } from './Bouquet'

const timeline=[
  {at:0,phase:'hello',speaker:'Rence',text:'Bby, I picked these for you. I wanted to make you smile.'},
  {at:2200,phase:'approach',speaker:'Rence',text:'Bby, I picked these for you. I wanted to make you smile.'},
  {at:3300,phase:'kneel',speaker:'Rence',text:'You make even the smallest moments feel special.'},
  {at:4300,phase:'offer',speaker:'Rence',text:'You make even the smallest moments feel special.'},
  {at:6800,phase:'receive',speaker:'Shilla',text:'They are lovely, bby. Thank you for thinking of me.'},
  {at:9200,phase:'rise',speaker:'Shilla',text:'They are lovely, bby. Thank you for thinking of me.'},
  {at:10300,phase:'hug',speaker:'Rence',text:'Come here. I missed holding you.'},
  {at:13000,phase:'kiss',speaker:'Shilla',text:'I missed you too. I love you.'},
  {at:14600,phase:'together',speaker:'Rence',text:'I love you, bby. Right here is where I want to be.'},
  {at:17200,phase:'closing',speaker:'Rence',text:'I love you, bby. Right here is where I want to be.'},
]
const chapters=['hello','offer','receive','hug','kiss','together']
export function FlowerStory({bow,dress,onFinish}) {
  const [scene,setScene]=useState(timeline[0])
  const finished=useRef(false),finishRef=useRef(onFinish),movieRef=useRef(null)
  finishRef.current=onFinish
  function finish(){if(finished.current)return;finished.current=true;finishRef.current()}
  useEffect(()=>{
    movieRef.current?.focus()
    const timers=timeline.slice(1).map(next=>setTimeout(()=>setScene(next),next.at))
    timers.push(setTimeout(()=>{if(!finished.current){finished.current=true;finishRef.current()}},17900))
    return()=>timers.forEach(clearTimeout)
  },[])
  const kneeling=['kneel','offer','receive'].includes(scene.phase)
  const close=['hug','kiss','together','closing'].includes(scene.phase)
  const received=['receive','rise','hug','kiss','together','closing'].includes(scene.phase)
  return <div ref={movieRef} tabIndex={-1} className={`flower-story refined-flower-story story-${scene.phase} ${close?'story-close':''} ${kneeling?'story-kneeling':''} ${received?'story-gift-received':''}`} role="dialog" aria-modal="true" aria-label="A little flower story" onKeyDown={event=>{if(event.key==='Escape'){event.preventDefault();finish()}}}>
    <div className="flower-story-sky"/><div className="flower-story-sun"/><div className="flower-story-hill hill-back"/><div className="flower-story-hill hill-front"/>
    <div className="story-ground-path"/>
    <svg className="story-garden-details" viewBox="0 0 900 500" preserveAspectRatio="none" aria-hidden="true"><g stroke="#b0c29e" strokeWidth="2">{[70,155,745,830].map((x,i)=><g key={x} transform={`translate(${x} ${410+i%2*14})`}><path d="M0 25V0M0 14Q-18 3-15 16Q-7 24 0 19" fill="#bdd5ae"/><g fill={i%2?'#ead3ec':'#f2c9dd'} stroke="#ceb1cd" strokeWidth=".7">{[0,72,144,216,288].map(a=><ellipse key={a} cx="0" cy="-7" rx="5" ry="7" transform={`rotate(${a})`}/>)}<circle r="4" fill="#f8e9b9" stroke="none"/></g></g>)}</g></svg>
    <div className="flower-story-hearts" aria-hidden="true">{Array.from({length:7},(_,i)=><span key={i} style={{left:`${12+i*12}%`,animationDelay:`${i*-.6}s`}}>♡</span>)}</div>
    <span className="story-film-label">A LITTLE MOMENT, JUST FOR YOU</span>
    <div className={`flower-story-caption ${scene.speaker==='Shilla'?'story-girl-speaking':'story-boy-speaking'}`} key={scene.text} role="status"><small>{scene.speaker}</small><p>{scene.text}</p></div>
    <div className="story-characters">
      <div className="story-girl"><i className="story-contact-shadow"/><div className="story-girl-pose"><KittyCharacter bow={bow} dress={dress} gaze="right" happy={received} name="Shilla"/></div></div>
      <div className="story-boy"><i className="story-contact-shadow"/><div className="story-boy-standing"><KittyCharacter boy bow="#c4d9e9" dress="#c4d9e9" gaze="left" happy={close} name="Rence"/></div><div className="story-boy-kneeling" aria-hidden="true"><KittyCharacter boy bow="#c4d9e9" dress="#c4d9e9" gaze="left" kneeling name="Rence"/></div></div>
      <div className="story-bouquet"><Bouquet/></div>
      <svg className={`story-hug-arms ${close?'hug-visible':''}`} viewBox="0 0 140 70" aria-hidden="true"><path d="M10 10Q66 65 127 20Q133 14 126 9Q119 6 115 13Q70 40 26 3" fill="#fffefa" stroke="#9f8aa7" strokeWidth="2.5" strokeLinejoin="round"/><path d="M128 45Q75 70 19 38Q12 33 16 27Q22 22 28 29Q80 53 117 35" fill="#fffefa" stroke="#9f8aa7" strokeWidth="2.5"/></svg>
      {scene.phase==='kiss'&&<div className="story-kiss" aria-label="A gentle cheek kiss"><span>♡</span><i>✧</i></div>}
    </div>
    <div className="flower-story-progress" aria-hidden="true">{chapters.map(phase=><i key={phase} className={timeline.find(item=>item.phase===phase).at<=scene.at?'story-step-filled':''}/>)}</div>
    <button className="flower-story-skip" onClick={finish}>Skip scene →</button>
  </div>
}
