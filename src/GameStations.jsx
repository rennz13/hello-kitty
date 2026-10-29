import { useId } from 'react'
﻿function Station({name, onPlay, children}) {
  return <g className="game-station" role="button" tabIndex={0} aria-label={`Play ${name}`} onClick={() => onPlay?.(name)} onKeyDown={event => {
    if(event.key === 'Enter' || event.key === ' ') {event.preventDefault(); onPlay?.(name)}
  }}><title>Tap to play {name}</title>{children}</g>
}
export function ArcadeStation({onPlay}) {
  const cabinetId=useId().replaceAll(':','')
  return <Station name="Catch the Hearts" onPlay={onPlay}>
    <ellipse cx="115" cy="281" rx="91" ry="6" fill="#aeb3d2" opacity=".16" stroke="none"/>
    <defs><linearGradient id={cabinetId} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#e8d9f3"/><stop offset="1" stopColor="#c6b8e0"/></linearGradient></defs>
    <path d="M49 69H179L199 272H28Z" fill={`url(#${cabinetId})`} stroke="#b5a6cc" strokeWidth="3"/>
    <path d="M54 73H174M34 264H192" stroke="#f4ebfc" strokeWidth="2"/>
    <path d="M46 113L34 256M182 113L194 256" stroke="#c2add6" strokeWidth="2"/>
    {[0,1,2,3,4].map(i=><g key={i} className="arcade-cabinet-lights" style={{animationDelay:`${i*-.4}s`}}><circle cx={47-i*1.6} cy={125+i*20} r="2" fill="#fff3c6" stroke="none"/><circle cx={181+i*1.6} cy={125+i*20} r="2" fill="#fff3c6" stroke="none"/></g>)}
    <rect x="49" y="80" width="129" height="24" rx="8" fill="#fff7e8" stroke="#d9c6a7"/>
    <text x="114" y="96" textAnchor="middle" fontSize="9" fontFamily="sans-serif" letterSpacing="1.5" fill="#a68aaf" stroke="none">HEART CATCH</text>
    <rect x="58" y="115" width="112" height="80" rx="12" fill="#f5f9ff" stroke="#bca8cf" strokeWidth="2"/>
    <path d="M65 181Q89 159 116 181Q142 161 163 181V187H65Z" fill="#e8e2f4" stroke="none"/>
    <path d="M66 123H96L66 149Z" fill="#fff" stroke="none" opacity=".6"/>
    <g className="arcade-preview-heart"><path d="M113 140Q95 118 91 137Q87 148 113 165Q139 148 135 137Q131 118 113 140Z" fill="#e7bcd8" stroke="#c99abd" strokeWidth="1"/></g>
    <path d="M91 177H135L130 186H96Z" fill="#e4d0b4" stroke="#c8b18f" strokeWidth="1"/>
    <path d="M47 216H180" stroke="#b1b6d6" strokeWidth="7"/>
    <path d="M75 213V201" stroke="#b1a1c1" strokeWidth="3"/><circle cx="75" cy="199" r="7" fill="#efcfdf" stroke="#b9a3c5"/>
    <circle cx="145" cy="207" r="5" fill="#e9d6a5"/><circle cx="164" cy="207" r="5" fill="#c6ded4"/>
    <rect x="89" y="236" width="51" height="12" rx="4" fill="#bfb3d3"/>
    <path d="M99 241H130" stroke="#eee3f7" strokeWidth="2"/>
    <path d="M59 256H76M151 256H168" stroke="#baa7ce" strokeWidth="2" strokeDasharray="1 3"/>
    <circle cx="113" cy="213" r="2" fill="#f8edf7" stroke="none"/>
    <rect className="station-focus" x="26" y="67" width="175" height="207" rx="15" fill="transparent" stroke="none"/>
  </Station>
}
export function ToyGameStations({onPlay}) {
  return <>
    <Station name="Memory Match" onPlay={onPlay}>
      <rect x="29" y="55" width="180" height="119" rx="16" fill="#ddd5ec" stroke="#c4b4d5" strokeWidth="2"/>
      <path d="M39 61H197" stroke="#fff5fd" strokeWidth="2"/>
      <path d="M37 184V210M203 184V210" stroke="#c0aec5" strokeWidth="4"/>
      <rect x="26" y="177" width="188" height="13" rx="5" fill="#fff5e4" stroke="#d4bda0"/>
      {['heart','star','star','heart'].map((symbol,i)=><g key={i} transform={`translate(${42+i%2*85} ${63+Math.floor(i/2)*56}) rotate(${i%2 ? 5 : -5} 32 24)`}><g className="station-card-idle" style={{animationDelay:`${i*-.7}s`}}>
        <rect width="66" height="48" rx="9" fill={i%2 ? '#f8e7ef' : '#e9dff5'} stroke="#c4adce" strokeWidth="2"/>
        <rect x="5" y="5" width="56" height="38" rx="6" fill="#fffaf5" stroke="#e3d3e8" strokeWidth="1"/>
        {symbol==='heart'?<path d="M33 21Q22 9 20 19Q18 26 33 35Q48 26 46 19Q44 9 33 21Z" fill="#e2b9d3" stroke="none"/>:<path d="m33 12 4 8 9 2-7 6 2 9-8-5-8 5 2-9-7-6 9-2Z" fill="#e7d5aa" stroke="none"/>}
        <path d="M9 9H29" stroke="#fff" opacity=".7" strokeWidth="2"/>
      </g></g>)}
      <text x="120" y="202" textAnchor="middle" fontSize="9" fontFamily="sans-serif" letterSpacing="1.3" fill="#a18aa8" stroke="none">MEMORY MATCH</text>
      <rect className="station-focus" x="26" y="58" width="188" height="154" rx="14" fill="transparent" stroke="none"/>
    </Station>
    <Station name="Kitty Snake" onPlay={onPlay}>
      <ellipse cx="123" cy="286" rx="81" ry="4" fill="#bda8ac" stroke="none" opacity=".15"/>
      <path d="M54 241Q62 208 121 211Q180 209 188 241" stroke="#cbb293" strokeWidth="5"/>
      <path d="M45 241H198L185 282H58Z" fill="#f0dfbe" stroke="#cbb293" strokeWidth="2"/>
      <path d="M57 253H187M61 266H184M78 244V278M104 244V279M132 244V279M159 244V279" stroke="#dbc6a6" strokeWidth="1"/>
      {[80,121,163].map((x,i)=><g key={x} className="berry-station-fruit" style={{animationDelay:`${i*-.5}s`}}><path d={`M${x-15} 232Q${x} 221 ${x+15} 232Q${x+13} 245 ${x} 252Q${x-13} 245 ${x-15} 232Z`} fill="#edb9d2" stroke="#c99dbb"/><path d={`M${x-11} 230L${x-5} 223L${x} 228L${x+6} 223L${x+11} 230Z`} fill="#bfd7bc" stroke="#a4bfa2"/><path d={`M${x-5} 235V237M${x+5} 235V237M${x} 243V245`} stroke="#fff7df" strokeWidth="2"/></g>)}
      <path d="M112 213L112 205L118 208Q122 206 126 208L132 205V213Q139 224 122 227Q106 224 112 213Z" fill="#fffdfa" stroke="#b9a3c2"/><circle cx="117" cy="217" r="1" fill="#77657d" stroke="none"/><circle cx="127" cy="217" r="1" fill="#77657d" stroke="none"/><rect x="66" y="257" width="111" height="17" rx="6" fill="#fff8e8" stroke="none"/>
      <path d="M51 245H191" stroke="#fff8e9" strokeWidth="2"/>
      <text x="121" y="269" textAnchor="middle" fontSize="8" fontFamily="sans-serif" letterSpacing=".5" fill="#ab8d9e" stroke="none">KITTY SNAKE</text>
      <rect className="station-focus" x="42" y="210" width="159" height="75" rx="15" fill="transparent" stroke="none"/>
    </Station>
  </>
}

export function PlayroomDecor() {
  return <div className="playroom-decor" aria-hidden="true">
    <svg className="playroom-cloud-sign" viewBox="0 0 240 160" fill="none"><g strokeLinecap="round" strokeLinejoin="round">
      <path d="M52 32V57M188 32V57" stroke="#c0b1d0" strokeWidth="1.5"/>
      <path d="M28 104Q16 72 49 72Q55 44 84 62Q103 32 130 57Q162 44 175 70Q211 57 215 89Q231 110 204 117H47Q25 116 28 104Z" fill="#fff9ed" stroke="#e3d2b7" strokeWidth="2"/>
      <path d="M51 83Q71 63 85 78M139 73Q163 59 176 81" stroke="#fffef7" strokeWidth="3"/>
      <text x="120" y="92" textAnchor="middle" fontFamily="Georgia,serif" fontSize="15" fill="#ad91bb" stroke="none">little joy club</text>
      <path d="M102 102H137" stroke="#e3c4d8" strokeWidth="2"/>
      <path d="m37 27 3 7 8 1-6 5 1 8-6-4-7 4 2-8-6-5 8-1Z" fill="#ead6a7" stroke="none"/>
      <path d="m204 39 3 7 8 1-6 5 1 8-6-4-7 4 2-8-6-5 8-1Z" fill="#e2bfdb" stroke="none"/>
    </g></svg>
    <div className="playroom-rug"><span>?</span></div>
    <div className="playroom-light-beam"/>
  </div>
}
