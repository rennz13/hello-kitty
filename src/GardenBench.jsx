import { KittyCharacter } from './KittyCharacter'
import { useEffect, useState } from 'react'
const sweetWords = [
  'I love you, bby. Even an ordinary day feels special with you.',
  'I missed you today. Come sit a little closer.',
  'These flowers are for you, bby. I wanted to make you smile.',
  'Shilla, you are my favorite part of the day.',
  'I wish I could hold your hand a little longer.',
  'I love your smile, especially when I am the reason for it.',
  'No matter how busy the day gets, I still think of you.',
  'I am happy right here, bby. I have you beside me.',
  'If today was hard, let me keep you company for a while.',
  'I would choose this little bench with you over anywhere else.',
  'I love you for all the little things that make you, you.',
  'Stay a little longer, bby. I am not ready to miss you yet.',
]

function randomSweetMessage(previous) {
  const offset = 1 + Math.floor(Math.random() * (sweetWords.length - 1))
  return (previous + offset) % sweetWords.length
}

export function GardenBench({seated,onSit,visible,flowersGiven,onFlowers}) {
  const [message,setMessage]=useState(()=>Math.floor(Math.random()*sweetWords.length))
  useEffect(()=>{if(!visible)return;const timer=setInterval(()=>setMessage(randomSweetMessage),6500);return()=>clearInterval(timer)},[visible])
  function talk(event){event?.stopPropagation();setMessage(randomSweetMessage)}
  return <div className="garden-bench-area">
    {visible&&<div className="boy-kitty-speech" key={message} role="status">{sweetWords[message]}<span aria-hidden="true">♡</span></div>}
    <svg viewBox="0 0 260 260" fill="none">
      {flowersGiven && seated && <g className="garden-couple-hearts" fill="#e0b7d5" stroke="none" opacity=".45"><path d="M120 87Q81 36 73 72Q66 98 120 132Q174 98 167 72Q159 36 120 87Z"/><path d="M70 59Q53 39 48 55Q45 67 70 81Q95 67 92 55Q87 39 70 59Z"/><path d="M195 65Q178 45 173 61Q170 73 195 87Q220 73 217 61Q212 45 195 65Z"/></g>}
      <ellipse cx="132" cy="236" rx="116" ry="8" fill="#9fb792" opacity=".16"/>
      <g className="garden-bench-control" role="button" tabIndex={0} aria-pressed={seated} aria-label={seated?'Leave the garden bench':'Sit beside boy Kitty on the bench'} onClick={onSit} onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();onSit?.()}}}>
        <title>{seated?'Tap to leave the bench':'Tap to sit beside him'}</title>
        <g stroke="#c5ae91" strokeWidth="3" strokeLinejoin="round"><path d="M38 196V235M222 196V235M26 143V199M234 143V199"/>
          <rect x="25" y="145" width="210" height="17" rx="4" fill="#f6e6c6"/><rect x="25" y="167" width="210" height="16" rx="4" fill="#f0dcba"/>
          <path d="M13 192H247V207H13Z" fill="#f5e3bf"/><path d="M20 195H240" stroke="#fff4d6" strokeWidth="2"/>
        </g>
        <circle data-garden-bench="true" cx="66" cy="221" r="1" fill="none" stroke="none"/>
        <rect className="garden-bench-focus" x="9" y="140" width="242" height="100" rx="12" fill="transparent" stroke="none"/>
      </g>
      <g className="boy-kitty-control" role="button" tabIndex={0} aria-label="Hear a sweet message from boy Kitty" onClick={talk} onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();talk(event)}}}>
        <title>Tap for a little sweet message</title>
        <g className="garden-boy-kitty" stroke="#9f8da6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <svg x="104" y="59" width="166" height="183" viewBox="0 0 300 330" aria-hidden="true"><KittyCharacter boy seated bow="#c4d9e9" dress="#c4d9e9" name="Boy Kitty"/></svg>
          {!flowersGiven && <g transform="translate(13 0)"><g className="boy-flower-bouquet"><path d="M146 187L137 160M146 187L151 153M146 187L162 162" stroke="#adc59e" strokeWidth="2"/>
            <path d="M129 172L148 193L167 173L147 183Z" fill="#fff0d5" stroke="#d3bda0"/>
            <path d="M139 187Q129 179 130 188Q133 195 143 191Q157 199 156 189Q153 180 146 187Z" fill="#e4bfd9" stroke="#c3a3c7" strokeWidth="1"/>
            {[[137,159],[151,153],[163,162]].map(([x,y],i)=><g key={i} transform={`translate(${x} ${y})`} fill={i%2?'#e2d0ef':'#f2c8dc'} stroke="#c4aacb" strokeWidth=".7">{[0,72,144,216,288].map(a=><ellipse key={a} cx="0" cy="-5" rx="3.5" ry="5" transform={`rotate(${a})`}/>)}<circle r="3" fill="#f7e9b6" stroke="none"/></g>)}
          </g></g>}
        </g>
        <rect className="boy-kitty-focus" x="116" y="73" width="143" height="151" rx="30" fill="transparent" stroke="none"/>
      </g>
      {!flowersGiven && <g className="garden-flower-gift" role="button" tabIndex={0} aria-label="Receive the bouquet from boy Kitty" onClick={event=>{event.stopPropagation();onFlowers?.()}} onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();event.stopPropagation();onFlowers?.()}}}><title>Tap the flowers for a little love story</title><rect className="flower-gift-focus" x="137" y="140" width="48" height="61" rx="14" fill="transparent" stroke="none"/></g>}
    </svg>
  </div>
}
