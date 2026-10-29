import { OutsideAdventure } from './OutsideAdventure'
import { RibbonDrawer } from './RibbonDrawer'
import { DressRack } from './Wardrobe'
import { DressingMirror } from './DressingMirror'
import { ArcadeStation, PlayroomDecor, ToyGameStations } from './GameStations'
import { AlarmClock } from './AlarmClock'
import { CozyBed } from './CozyBed'
import { ReadingNook } from './ReadingNook'
import { useId, useState } from 'react'
import { Television } from './Television'
import { RoomIcon } from './RoomIcon'

const ink = '#b6a0b7'
function Art({children, side}) {
  return <svg className={`scene-art scene-art-${side}`} viewBox="0 0 240 300" preserveAspectRatio="xMidYMax meet" fill="none"><g stroke={ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{children}</g></svg>
}
function Plant({x=20,y=180}) { return <g transform={`translate(${x} ${y})`}><path d="M30 63V4" stroke="#a3baa5"/><path d="M30 32C-5 33 0 0 30 20C50-8 72 7 30 39M30 54C-1 59 3 30 30 43C61 21 67 49 30 54" fill="#bdd7be" stroke="#a3baa5"/><path d="M8 64H53L46 99H16Z" fill="#f4e7cf" stroke="#caba9f"/><path d="M10 72H51" stroke="#d7c6a6"/></g> }
function Window({moon=false}) {
  const [closed, setClosed] = useState(false)
  const patternId = useId().replaceAll(':', '')
  return <g className={`interactive-window ${closed ? 'curtains-closed' : ''}`}>
    <rect x="75" y="22" width="125" height="146" rx="58" fill={moon?'#d9d7ef':'#deedf5'} stroke="#fffaf6" strokeWidth="10"/>
    <path d="M137 27V168M78 103H196" stroke="#fffaf6" strokeWidth="5"/>
    {moon ? <path d="M166 51A22 22 0 1 0 179 85A24 24 0 0 1 166 51" fill="#fff2cb" stroke="none"/> : <><circle cx="163" cy="62" r="17" fill="#fff2ca" stroke="none"/><path d="M96 124Q100 108 115 116Q123 103 135 119Q151 111 157 127H96" fill="#fff" stroke="none"/></>}
    <defs><pattern id={patternId} width="16" height="150" patternUnits="userSpaceOnUse"><rect width="16" height="150" fill={moon?'#d7c4e7':'#f1d4e3'}/><path d="M2 0V150M14 0V150" stroke={moon?'#cbb6df':'#e5c2d7'} strokeWidth="2"/><path d="M6 0V150" stroke="#fff5fc" strokeWidth="2" opacity=".5"/></pattern></defs>
    <g className="curtain-cover curtain-cover-left"><path d="M63 18H138V163Q120 171 100 163Q82 170 63 162Z" fill={`url(#${patternId})`} stroke="#d4b9ce"/></g>
    <g className="curtain-cover curtain-cover-right"><path d="M137 18H212V162Q194 170 175 163Q156 171 137 163Z" fill={`url(#${patternId})`} stroke="#d4b9ce"/></g>
    <path d="M62 15Q40 68 63 162L88 162Q68 93 100 15M176 15Q206 76 185 162H212Q231 85 211 15" fill={moon?'#d7c4e7':'#f1d4e3'} stroke="#d4b9ce"/>
    <path d="M54 17H220" strokeWidth="5" stroke="#c3aac3"/>
    <g className="curtain-toggle" role="button" tabIndex={0} aria-label={closed ? 'Open curtains' : 'Close curtains'} aria-pressed={closed} onClick={() => setClosed(value => !value)} onKeyDown={event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setClosed(value => !value) }
    }}>
      <title>{closed ? 'Tap to open curtains' : 'Tap to close curtains'}</title>
      <rect className="curtain-hit-area" x="48" y="13" width="178" height="157" rx="10" fill="transparent" stroke="none"/>
    </g>
  </g>
}

function KitchenWallCabinet() {
  const [open, setOpen] = useState(false)
  function toggle() { setOpen(value => !value) }
  return <g className={`wall-cabinet ${open ? 'cabinet-open' : ''}`}>
    <rect x="25" y="49" width="155" height="100" rx="12" fill="#dfcfb0" stroke="#d6c7a6" strokeWidth="4"/>
    <rect x="32" y="56" width="141" height="86" rx="6" fill="#eee1c8" stroke="none"/>
    <g className="cabinet-dishes" strokeWidth="1.5">
      <path d="M34 98H171" stroke="#fff8e9" strokeWidth="5"/>
      <path d="M42 86H70Q68 96 56 96Q44 96 42 86Z" fill="#d6c7e9" stroke="#b9a4ce"/>
      <path d="M43 82H69M44 78H68" stroke="#e9ddf4" strokeWidth="3"/>
      <path d="M87 76H106V91Q96 100 87 91Z" fill="#f4cfe2" stroke="#c9a6bf"/><path d="M106 79Q119 76 114 87Q110 91 106 87" stroke="#c9a6bf"/>
      <path d="M133 75H151V91Q142 100 133 91Z" fill="#d4e5da" stroke="#a7c2af"/><path d="M151 78Q164 75 159 86Q155 90 151 86" stroke="#a7c2af"/>
      <rect x="42" y="112" width="27" height="25" rx="5" fill="#f7edcf" stroke="#cdbd96"/><path d="M43 113H68" stroke="#d4bfdc" strokeWidth="5"/>
      <circle cx="112" cy="120" r="17" fill="#fff8ed" stroke="#c7b6d7"/><circle cx="112" cy="120" r="11" stroke="#e3d5ec"/>
      <circle cx="143" cy="120" r="17" fill="#f5e5ef" stroke="#cdaec8"/><circle cx="143" cy="120" r="11" stroke="#e3cde0"/>
    </g>
    <g className="cabinet-door cabinet-door-left"><path d="M37 51H102V147H37Q27 147 27 137V61Q27 51 37 51Z" fill="#f8efdb" stroke="#d6c7a6" strokeWidth="2"/><rect x="35" y="60" width="59" height="78" rx="7" fill="none" stroke="#e6d7b9" strokeWidth="1.5"/><path d="M87 93V105" stroke="#c2ae88" strokeWidth="3"/><path d="M39 65H90" stroke="#fff9ea" strokeWidth="2"/></g>
    <g className="cabinet-door cabinet-door-right"><path d="M102 51H168Q178 51 178 61V137Q178 147 168 147H102Z" fill="#f8efdb" stroke="#d6c7a6" strokeWidth="2"/><rect x="110" y="60" width="59" height="78" rx="7" fill="none" stroke="#e6d7b9" strokeWidth="1.5"/><path d="M117 93V105" stroke="#c2ae88" strokeWidth="3"/><path d="M114 65H165" stroke="#fff9ea" strokeWidth="2"/></g>
    <g className="cabinet-toggle" role="button" tabIndex={0} aria-expanded={open} aria-label={open ? 'Close kitchen cabinet' : 'Open kitchen cabinet'} onClick={toggle} onKeyDown={event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggle() }
    }}>
      <title>{open ? 'Tap to close the cabinet' : 'Tap to open the cabinet'}</title>
      <rect className="cabinet-hit-area" x="23" y="47" width="159" height="104" rx="12" fill="transparent" stroke="none"/>
    </g>
  </g>
}

function Frame({symbol='heart'}){return <g transform="translate(55 35) rotate(-5 50 45)"><rect width="100" height="88" rx="10" fill="#fffaf1" stroke="#d9c3d3" strokeWidth="6"/><rect x="10" y="10" width="80" height="68" rx="4" fill="#f7e6f0" stroke="none"/>{symbol==='heart'?<path d="M50 62L29 43C13 22 49 18 50 35C58 14 87 29 71 44Z" fill="#e1b8d2" stroke="none"/>:<path d="m50 22 8 17 19 2-14 13 4 19-17-10-17 10 4-19-14-13 19-2Z" fill="#dfd1aa" stroke="none"/>}</g>}
function Shelves({shop=false}){return <><rect x="18" y="62" width="202" height="204" rx="14" fill={shop?'#e1ead5':'#f3e8d8'} stroke={shop?'#b9c9a9':'#d1bea5'} strokeWidth="4"/>{[127,195].map(y=><path key={y} d={`M22 ${y}H216`} stroke="#fffaf1" strokeWidth="7"/>)}<path d="M85 66V261M153 66V261" stroke="#cfccb9"/>{[0,1,2].map(i=><g key={i} transform={`translate(${35+i*67} 82)`}><rect width="31" height="31" rx="7" fill={['#e6c8df','#c9dbe9','#f2dfb7'][i]}/><path d="M15 1V30M0 10H31" stroke="#fffcf6" strokeWidth="4"/></g>)}<path d="M37 170Q36 149 55 150Q73 151 72 171Z" fill="#e4cde7"/><path d="M44 151L39 143M65 151L69 143"/><rect x="100" y="149" width="36" height="31" rx="7" fill="#e9d5bb"/><path d="M111 149V141H125V149"/><path d="M169 172L174 149H198L203 172Z" fill="#e4bad4"/><rect x="36" y="212" width="34" height="32" rx="5" fill="#cbded5"/><path d="M99 239V215H110V239M117 239V208H129V239" stroke="#c7b6dc" strokeWidth="7"/><circle cx="186" cy="228" r="17" fill="#f5dfb5"/><path d="m186 216 4 8 8 1-6 6 1 8-7-4-7 4 1-8-6-6 8-1Z" fill="#fffaf3" stroke="none"/></>}
function MediaCabinet() {
  const woodId = useId().replaceAll(':', '')
  return <><defs><linearGradient id={woodId} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#f9ebdc"/><stop offset="1" stopColor="#ead3be"/></linearGradient></defs>
    <ellipse cx="123" cy="282" rx="104" ry="7" fill="#bca8b7" opacity=".12" stroke="none"/>
    <path d="M40 266V280M206 266V280" stroke="#bca7ae" strokeWidth="6"/>
    <rect x="25" y="213" width="196" height="56" rx="8" fill={`url(#${woodId})`} stroke="#cab6a1" strokeWidth="2.5"/>
    <path d="M30 260H216" stroke="#e4d0ba" strokeWidth="2"/>
    <rect x="21" y="207" width="204" height="10" rx="4" fill="#fff1df" stroke="#cab6a1" strokeWidth="2.5"/>
    <path d="M31 211H215" stroke="#fffaf1" strokeWidth="2"/>
    <rect x="36" y="226" width="77" height="31" rx="5" fill="#fbf0e3" stroke="#cfb8b3" strokeWidth="1.8"/>
    <path d="M70 241H81" stroke="#c5ad87" strokeWidth="3"/>
    <path d="M45 233H103M45 250H103" stroke="#e9d9c5" strokeWidth="1"/>
    <path d="M31 264H214" stroke="#fff7ec" opacity=".6"/>
    <path d="M124 222V260" stroke="#d5bfac" strokeWidth="1.8"/>
    <rect x="139" y="228" width="67" height="8" rx="3" fill="#dfcadf" stroke="none"/>
    <rect x="145" y="241" width="55" height="8" rx="3" fill="#cfc4e0" stroke="none"/>
    <path d="M140 226H203M146 239H198" stroke="#fff9f7" strokeWidth="1.5" opacity=".7"/>
  </>
}

export function HomeTableForeground({radioPlaying = false, onRadioToggle}) {
  return <div className="home-table-foreground">
    <Art side="left"><MediaCabinet/>
   <g className={radioPlaying ? 'home-radio radio-playing home-scene-control' : 'home-radio home-scene-control'} role="button" tabIndex={0} aria-pressed={radioPlaying} aria-label={radioPlaying ? 'Stop radio' : 'Listen to radio'} onClick={onRadioToggle} onKeyDown={event => {
     if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onRadioToggle?.() }
   }}>
   <title>{radioPlaying ? 'Tap to stop the radio' : 'Tap to listen to the radio'}</title>
   <path d="M179 170L200 140" stroke="#b7a0bb" strokeWidth="3"/>
   <path d="M165 173V163Q165 155 174 155H193Q201 155 201 163V173" stroke="#b8a3c5" strokeWidth="3"/>
   <rect x="141" y="171" width="85" height="39" rx="10" fill="#e8c8dc" stroke="#c3a2bb"/>
   <circle cx="161" cy="190" r="12" fill="#fff4fa"/>
   <circle cx="161" cy="190" r="7" stroke="#d5b5ce" strokeDasharray="1 3"/>
   <path d="M148 177Q158 173 164 176" stroke="#fff4fb" strokeWidth="2"/>
   <path d="M194 181V187M199 180V187M204 181V187" stroke="#c2b38d" strokeWidth="1"/>
   <rect x="181" y="179" width="31" height="11" rx="3" fill="#f7f1dc"/>
   <path d="M186 184H206" stroke="#c5b9a0"/>
   <circle cx="187" cy="200" r="3" fill="#c4afcf"/>
   <circle cx="205" cy="200" r="3" fill="#c4afcf"/>
   <rect className="home-object-focus" x="138" y="166" width="91" height="47" rx="11" fill="transparent" stroke="none"/>
   </g>
   {radioPlaying && <g className="radio-music-notes" fill="#b19acb" stroke="none" fontSize="26">
     <text className="radio-note note-one" x="158" y="151">&#x266A;</text>
     <text className="radio-note note-two" x="197" y="139">&#x266B;</text>
     <text className="radio-note note-three" x="218" y="159">&#x266A;</text>
     <circle className="radio-on-light" cx="213" cy="175" r="3" fill="#c6e2c7"/>
   </g>}
    </Art>
  </div>
}

function BathroomMirror({active, onToggle}) {
  const mirrorId = useId().replaceAll(':', '')
  return <g className="vanity-toggle" role="button" tabIndex={0} aria-pressed={active} aria-label={active ? 'Finish washing and grooming' : 'Wash paws and tidy up at the mirror'} onClick={onToggle} onKeyDown={event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onToggle?.() }
  }}>
    <title>Tap the mirror to wash and tidy up</title>
    <defs><linearGradient id={mirrorId} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f4fbfb"/><stop offset=".5" stopColor="#d8ebee"/><stop offset="1" stopColor="#e6dff1"/></linearGradient></defs>
    <rect x="53" y="25" width="116" height="145" rx="55" fill="#eadfc6" stroke="#d2c5a8" strokeWidth="2"/>
    <rect x="58" y="30" width="106" height="135" rx="50" fill={`url(#${mirrorId})`} stroke="#fffefa" strokeWidth="6"/>
    <path d="M71 55Q75 39 91 38" stroke="#fff" strokeWidth="3" opacity=".8"/>
    <path d="M77 128L143 62M96 137L151 83" stroke="#f7ffff" strokeWidth="6"/>
    <rect className="vanity-focus-ring" x="53" y="25" width="116" height="145" rx="50" fill="transparent" stroke="none"/>
  </g>
}

export function BathroomVanity({phase, active, onToggle}) {
  const vanityId = useId().replaceAll(':', '')
  return <div className="bath-fixture-layer"><Art side="left">
    <g className={`vanity-toggle vanity-${phase}`} role="button" tabIndex={0} aria-pressed={active} aria-label={active ? 'Finish washing and grooming' : 'Wash paws and tidy up at the sink'} onClick={onToggle} onKeyDown={event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onToggle() }
    }}>
      <title>{active ? 'Tap to leave the sink' : 'Tap for washing and grooming'}</title>
      <defs><linearGradient id={vanityId} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#e2efe4"/><stop offset="1" stopColor="#c4dbce"/></linearGradient></defs>
      <ellipse cx="119" cy="281" rx="77" ry="7" fill="#aac8be" stroke="none" opacity=".15"/>
      <path d="M57 270V282M180 270V282" stroke="#b7aaa1" strokeWidth="5"/>
      <path d="M49 200V273Q118 282 188 273V200" fill={`url(#${vanityId})`} stroke="#aac8b7" strokeWidth="2.5"/>
      <rect x="59" y="209" width="50" height="52" rx="7" fill="#e2eee1" stroke="#bdd5c3" strokeWidth="1.5"/>
      <rect x="127" y="209" width="50" height="52" rx="7" fill="#e2eee1" stroke="#bdd5c3" strokeWidth="1.5"/>
      <path d="M118 204V271" stroke="#aac8b7"/>
      <path d="M101 228V242M135 228V242" stroke="#c5b28b" strokeWidth="3"/>
      <rect x="35" y="182" width="166" height="18" rx="8" fill="#fffefb"/>
      <ellipse cx="111" cy="186" rx="34" ry="5" fill="#e0f0ee" stroke="#c5dcd5"/>
      {active && phase === 'wash' && <g className="vanity-water" stroke="#b6dce2" strokeDasharray="3 4"><path d="M110 162V186M115 164V186"/></g>}
      <path d="M91 184V169Q91 154 111 154" stroke="#afbdc7" strokeWidth="6"/>
      <rect x="160" y="155" width="21" height="28" rx="5" fill="#d6c8e7" stroke="#bca7cb"/><path d="M170 155V149H182" stroke="#c2ae8f" strokeWidth="2.5"/>
      <path d="M164 166H177V176H164Z" fill="#fff8f1" stroke="none"/>
      <path d="M169 170Q166 166 165 170Q164 172 169 174Q175 172 173 170Q172 166 169 170" fill="#dcc5df" stroke="none"/>
      <g transform="translate(37 153)"><rect y="15" width="20" height="13" rx="4" fill="#faf2dd" stroke="#d7c6a5"/><path d="M10 15V0M10 9Q-4 8 1 0Q10-2 10 9M10 10Q24 3 21-1Q11-1 10 10" fill="#bdd8b9" stroke="#a3c09e" strokeWidth="1.5"/></g>
      {active && phase === 'wash' && <g className="vanity-soap" fill="#f4fffe" stroke="#c9e3df"><circle cx="95" cy="178" r="5"/><circle cx="118" cy="176" r="6"/><circle cx="128" cy="180" r="4"/></g>}
      {active && phase === 'tidy' && <g className="vanity-shine" fill="#cbb7df" stroke="none"><path d="m76 144 2 5 5 1-5 2-2 5-2-5-5-2 5-1Z"/><path d="m151 128 2 5 5 1-5 2-2 5-2-5-5-2 5-1Z"/></g>}
      <rect className="vanity-focus-ring" x="32" y="146" width="172" height="133" rx="12" fill="transparent" stroke="none"/>
    </g>
  </Art></div>
}

export function BathroomDuck({playing, onToggle}) {
  return <svg className={`bathroom-duck ${playing ? 'duck-playing' : ''}`} viewBox="0 0 100 100" fill="none">
    <circle data-duck-seat="true" cx="15" cy="90" r="1" fill="none" stroke="none"/>
    <g className="duck-toggle" role="button" tabIndex={0} aria-pressed={playing} aria-label={playing ? 'Finish playing with the rubber duck' : 'Play with the rubber duck'} onClick={onToggle} onKeyDown={event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onToggle() }
    }}>
      <title>{playing ? 'Tap to finish playing' : 'Tap to play with the little duck'}</title>
      <ellipse cx="65" cy="88" rx="29" ry="5" fill="#b0cbc4" opacity=".23"/>
      <g className="rubber-duck" stroke="#c9b47e" strokeWidth="1.6" strokeLinejoin="round">
        <path d="M40 68Q29 71 32 58Q42 63 46 60Q58 51 78 60Q95 68 87 80Q80 91 60 88Q39 87 40 68Z" fill="#f4e4ab"/>
        <circle cx="73" cy="49" r="16" fill="#fff0bb"/>
        <path d="M86 48Q105 49 89 57L84 56Z" fill="#ead1a7"/>
        <circle cx="78" cy="46" r="2" fill="#786876" stroke="none"/>
        <circle cx="83" cy="53" r="3" fill="#f0cbdc" stroke="none"/>
        <path d="M52 67Q68 58 72 72Q65 82 52 75" fill="#ead89b"/>
        <path d="M65 39Q69 35 73 36" stroke="#fff9df" strokeWidth="3"/>
      </g>
      {playing && <g className="duck-play-hearts" fill="#d6b8db" stroke="none"><path d="M48 37Q40 27 38 35Q36 41 47 48Q59 41 57 35Q55 27 48 37Z"/><text x="84" y="30" fontSize="10" fill="#b4a0c3">quack!</text></g>}
      <rect className="duck-focus-ring" x="27" y="27" width="72" height="67" rx="16" fill="transparent" stroke="none"/>
    </g>
  </svg>
}

export function BathShower({active, running, onToggle}) {
  const tubId = useId().replaceAll(':', '')
  return <div className="bath-fixture-layer"><Art side="right">
    <g className={`bath-shower-toggle ${running ? 'shower-running' : ''}`} role="button" tabIndex={0} aria-pressed={active} aria-label={active ? 'Stop shower and leave bath' : 'Give Kitty a shower'} onClick={onToggle} onKeyDown={event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onToggle() }
    }}>
      <title>{active ? 'Tap to finish bathing' : 'Tap to give Kitty a shower'}</title>
      <path d="M186 140V43Q186 23 166 23H143" stroke="#afc8c5" strokeWidth="7"/>
      <path d="M126 48Q126 27 143 27Q160 27 160 48Z" fill="#d6eae6"/>
      {running && <g className="shower-water" stroke="#b9e0e5" strokeWidth="2" strokeDasharray="3 8" strokeLinecap="round">{[128,136,144,152,160].map((x,i)=><path key={x} style={{animationDelay: `${i * -.12}s`}} d={`M${x} 57L${x+(i-2)*5} 177`}/>)}</g>}
      <defs><linearGradient id={tubId} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#fffefb"/><stop offset=".7" stopColor="#f3faf7"/><stop offset="1" stopColor="#dfede7"/></linearGradient></defs>
      <ellipse cx="123" cy="280" rx="89" ry="8" fill="#a9c6bf" stroke="none" opacity=".16"/>
      <path d="M28 204H217L198 248Q195 268 176 268H72Q55 268 49 251Z" fill={`url(#${tubId})`} stroke="#b7d1c7" strokeWidth="3"/>
      <path d="M43 216L56 249Q60 258 70 258" stroke="#fff" strokeWidth="4" opacity=".9"/>
      <path d="M198 216L190 246" stroke="#e1ede7" strokeWidth="2"/>
      {running && <ellipse className="bath-water-surface" cx="122" cy="190" rx="89" ry="9" fill="#d7f1ee" stroke="#bfdfd9"/>}
      <rect x="20" y="192" width="205" height="18" rx="9" fill="#fff"/>
      <path d="M63 266L58 279M188 266L194 279" strokeWidth="6"/>
      <g className="bath-bubbles">{[0,1,2,3,4].map(i=><circle key={i} style={{animationDelay: `${i * -.6}s`}} cx={50+i*33} cy={181-(i%2)*8} r={7+i%3*3} fill="#f4ffff" stroke="#c6e5e3"/>)}</g>
      <path d="M154 205V244Q172 250 193 244V205" fill="#e3d2ee" stroke="#c5acd3" strokeWidth="1.8"/>
      <path d="M160 211V239M187 211V239" stroke="#f6ecfb" strokeWidth="2"/>
      <path d="M159 239H188" stroke="#c5acd3" strokeDasharray="2 3" strokeWidth="1"/>
      <path d="M168 222Q157 213 160 224Q164 229 171 225Q181 232 183 222Q182 214 173 222Z" fill="#fff4fb" stroke="#c7accf" strokeWidth="1"/>
      <circle cx="172" cy="223" r="3" fill="#f4e6f8" stroke="#c7accf" strokeWidth="1"/>
      {running && <g className="shower-mist" fill="#fffdfb" stroke="none" opacity=".35"><ellipse cx="110" cy="137" rx="38" ry="16"/><ellipse cx="155" cy="158" rx="43" ry="15"/></g>}
      <rect className="shower-focus-ring" x="17" y="18" width="211" height="264" rx="16" fill="transparent" stroke="none"/>
    </g>
  </Art></div>
}

export function KitchenStove({busy, onToggle, stage = 'soup'}) {
  const stoveId = useId().replaceAll(':', '')
  return <div className="kitchen-counter-layer"><Art side="left">
    <g className={`kitchen-counter-toggle ${busy ? 'stove-cooking' : ''}`} data-stage={stage} role="button" tabIndex={0} aria-pressed={busy} aria-label={busy ? 'Finish cooking and leave pot' : 'Help Kitty cook at the pot'} onClick={onToggle} onKeyDown={event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onToggle() }
    }}>
      <title>{busy ? 'Tap to finish cooking' : 'Tap to help Kitty cook'}</title>
      <defs><linearGradient id={stoveId} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#ece4cc"/><stop offset="1" stopColor="#dcd3b7"/></linearGradient></defs>
      <ellipse cx="121" cy="282" rx="108" ry="6" fill="#c2ac8e" stroke="none" opacity=".13"/>
      <path d="M26 270V280M214 270V280" stroke="#c4ae93" strokeWidth="5"/>
      <rect x="12" y="202" width="216" height="73" rx="8" fill={`url(#${stoveId})`} stroke="#c7b892" strokeWidth="2.5"/>
      {[22,94,166].map(x=><g key={x}><rect x={x} y="214" width="52" height="49" rx="5" fill="#f1ead6" stroke="#d6c7a5" strokeWidth="1.4"/><path d={`M${x+19} 224H${x+34}`} stroke="#c1aa85" strokeWidth="3"/></g>)}
      <rect x="7" y="193" width="226" height="15" rx="6" fill="#fffaf0" stroke="#d7c6ac" strokeWidth="2"/>
      <path d="M17 197H222" stroke="#fff" strokeWidth="2"/>
      <ellipse cx="49" cy="191" rx="29" ry="4" fill="#cbc6b3" stroke="none"/>
      <rect x="25" y="166" width="47" height="27" rx="7" fill="#d6e5d4" stroke="#a7c3a8"/>
      <path d="M29 175H68M26 174H18V183H25M72 174H78V183H72" stroke="#a7c3a8" strokeWidth="2"/>
      <path d="M32 170V183" stroke="#eff7e8" strokeWidth="3"/>
      <path d="M33 164Q27 153 35 146M48 164Q43 151 50 143" stroke="#b8c7b1"/>
      <ellipse cx="188" cy="191" rx="23" ry="3" fill="#ead5bb" stroke="none"/>
      <circle cx="190" cy="181" r="10" fill="#e9c7dc" stroke="#c8a6c0"/>
      <path d="M189 171Q184 165 188 163M190 170Q198 163 201 169Q196 173 190 170" fill="#bfd6b7" stroke="#a8c09e"/>
      {busy && stage === 'side' && <g className="ingredient-prep">
        <rect x="154" y="184" width="61" height="8" rx="3" fill="#e5cba6" stroke="#cbb189"/>
        <g className="prep-ingredient"><circle cx="179" cy="180" r="6" fill="#bfd8ba" stroke="#9eb79b"/><circle cx="192" cy="180" r="5" fill="#f1dcae" stroke="#c9b58a"/></g>
        <path className="prep-utensil" d="M164 175L197 169" stroke="#c4a783" strokeWidth="4"/>
        <path d="m208 157 2 4 4 1-4 2-2 4-2-4-4-2 4-1Z" fill="#dbc2df" stroke="none"/>
      </g>}
      {busy && <>
        <g className="pot-steam" fill="none" stroke="#b3c7b4" strokeWidth="2"><path d="M34 160Q25 149 34 139"/><path d="M48 159Q40 145 48 133"/><path d="M61 159Q53 148 61 138"/></g>
        <g className="pot-spoon"><path d="M53 171L75 140" stroke="#c2a47d" strokeWidth="3"/><ellipse cx="76" cy="138" rx="4" ry="6" fill="#e5cda6" stroke="#c2a47d"/></g>
        <ellipse cx="49" cy="166" rx="21" ry="4" fill="#f7eccd" stroke="#adc4aa" strokeWidth="1.5"/>
      </>}
      <rect className="counter-focus-ring" x="5" y="158" width="230" height="125" rx="10" fill="transparent" stroke="none"/>
    </g>
  </Art></div>
}

export function KitchenCounter({busy, onToggle}) {
  const counterId = useId().replaceAll(':', '')
  return <div className="kitchen-counter-layer"><Art side="right">
    <g className="kitchen-counter-toggle" role="button" tabIndex={0} aria-pressed={busy} aria-label={busy ? 'Finish mixing and leave counter' : 'Help Kitty mix a treat at the kitchen counter'} onClick={onToggle} onKeyDown={event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onToggle() }
    }}>
      <title>{busy ? 'Tap to finish mixing' : 'Tap to help Kitty bake'}</title>
      <defs><linearGradient id={counterId} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#f4e5d6"/><stop offset="1" stopColor="#e5d0bd"/></linearGradient></defs>
      <ellipse cx="126" cy="283" rx="97" ry="6" fill="#c2ac8e" stroke="none" opacity=".13"/>
      <path d="M45 270V281M204 270V281" stroke="#c4ae93" strokeWidth="5"/>
      <rect x="33" y="206" width="184" height="73" rx="9" fill={`url(#${counterId})`} stroke="#ccb599" strokeWidth="2.5"/>
      <rect x="27" y="194" width="196" height="15" rx="6" fill="#fffcf3" stroke="#d7c6ac"/>
      <path d="M36 198H214" stroke="#fff" strokeWidth="2"/>
      <rect x="73" y="223" width="103" height="44" rx="7" fill="#d5c5dd" stroke="#b5a0c1"/>
      <rect x="82" y="232" width="85" height="27" rx="4" fill="#ece8ef" stroke="#c6b8d1" strokeWidth="1.5"/>
      <path d="M89 237H159" stroke="#fff8ff" opacity=".8"/>
      <path d="M92 227H157" stroke="#fdf7fa" strokeWidth="2.5"/>
      <circle cx="71" cy="215" r="3" fill="#f6edcd" stroke="#c6b28d"/><circle cx="100" cy="215" r="3" fill="#f6edcd" stroke="#c6b28d"/>
      <path d="M182 192V173Q182 160 194 160Q206 160 206 173" stroke="#baa6a7" strokeWidth="3"/><path d="M180 179H209" stroke="#e2c9ac" strokeWidth="5"/>
      <g transform="translate(37 165)"><rect width="23" height="27" rx="5" fill="#f6e8c8" stroke="#d2bd93"/><path d="M2 2H21" stroke="#d3c0df" strokeWidth="5"/><path d="M5 10H18V20H5Z" fill="#fffaf0" stroke="none"/><path d="M10 13V18M13 13V18" stroke="#cbb68d" strokeWidth="1"/></g>
      {busy && <g className="counter-baking">
        <g className="mixing-spoon"><path d="M123 180L108 151" stroke="#c4a783" strokeWidth="4"/><ellipse cx="107" cy="149" rx="4" ry="7" fill="#ead2b0" stroke="#c4a783"/></g>
        <path d="M86 175H146Q144 194 117 194Q91 194 86 175Z" fill="#e2cbe9" stroke="#bda2c7"/>
        <ellipse cx="116" cy="175" rx="30" ry="6" fill="#fff0d7" stroke="#bda2c7"/>
        <path className="mixing-swirl" d="M102 174Q110 170 122 174Q132 178 117 179" fill="none" stroke="#dbc29e" strokeWidth="1.5"/>
        <g className="baking-sparkles" fill="#d6bd8f" stroke="none"><path d="m74 152 2 5 5 1-5 2-2 5-2-5-5-2 5-1Z"/><circle cx="153" cy="160" r="2"/></g>
      </g>}
      <rect className="counter-focus-ring" x="23" y="188" width="204" height="96" rx="12" fill="transparent" stroke="none"/>
    </g>
  </Art></div>
}

function DressingRoomDecor() {
  return <div className="dressing-room-decor" aria-hidden="true">
    <svg className="atelier-wall-sign" viewBox="0 0 220 140" fill="none"><g strokeLinecap="round" strokeLinejoin="round">
      <path d="M64 17V36M158 17V36" stroke="#d1b6d2" strokeWidth="1.2"/>
      <rect x="30" y="33" width="160" height="74" rx="24" fill="#fff9ef" stroke="#e0cbb7" strokeWidth="2"/>
      <rect x="36" y="39" width="148" height="62" rx="19" stroke="#efdfd0"/>
      <path d="M104 56Q85 39 87 55Q85 73 104 64Q125 79 128 59Q131 41 112 55Z" fill="#dfc0df" stroke="#c6a8cc" strokeWidth="1.2"/><ellipse cx="108" cy="59" rx="6" ry="7" fill="#ead5ea" stroke="#c6a8cc" strokeWidth="1"/>
      <text x="110" y="88" textAnchor="middle" fontFamily="Georgia,serif" fontSize="13" fill="#ad8eb7" stroke="none">the little atelier</text>
    </g></svg>
    <div className="atelier-fitting-rug"><span>??</span></div>
    <div className="atelier-soft-light"/>
  </div>
}

function BedroomDreamDecor() {
  return <div className="bedroom-dream-decor" aria-hidden="true">
    <svg className="bedroom-star-mobile" viewBox="0 0 180 150" fill="none"><g strokeLinecap="round">
      <path d="M90 3V17M32 28Q90 5 148 28M39 26V61M90 16V83M141 26V57" stroke="#c6afd7" strokeWidth="1.4"/>
      <g className="bedroom-mobile-stars"><path d="m39 59 4 9 10 1-8 7 2 10-8-5-9 5 2-10-7-7 10-1Z" fill="#fff0c9" stroke="#dfcfa7"/>
      <path d="m141 54 4 9 10 1-8 7 2 10-8-5-9 5 2-10-7-7 10-1Z" fill="#e9cee2" stroke="#d1b2cc"/>
      <path d="M93 78A22 22 0 1 0 108 113Q82 114 93 78Z" fill="#fff2d1" stroke="#decea8"/>
      <circle cx="65" cy="106" r="2" fill="#d5bddd" stroke="none"/><circle cx="123" cy="95" r="2" fill="#e4d2af" stroke="none"/></g>
    </g></svg>
    <div className="bedroom-moonbeam"/>
    <div className="bedroom-soft-rug"><span>&#x263E;</span></div>
    <span className="bedroom-tiny-star tiny-star-a"/>
    <span className="bedroom-tiny-star tiny-star-b"/>
    <span className="bedroom-tiny-star tiny-star-c"/>
  </div>
}

function HomeLivingDecor() {
  return <div className="home-living-decor" aria-hidden="true">
    <svg className="home-keepsakes" viewBox="0 0 220 155" fill="none"><g strokeLinecap="round" strokeLinejoin="round">
      <rect x="71" y="6" width="76" height="70" rx="10" fill="#fff9ee" stroke="#d6bfcc" strokeWidth="3"/>
      <rect x="78" y="13" width="62" height="56" rx="6" fill="#f6e4ed"/>
      <path d="M109 37Q95 21 92 34Q88 44 109 57Q131 44 127 34Q124 21 109 37Z" fill="#ddb5ce"/>
      <path d="M37 108H184" stroke="#d7c2ad" strokeWidth="5"/>
      <path d="M55 110V119M168 110V119" stroke="#c8b09b" strokeWidth="3"/>
      <rect x="55" y="87" width="11" height="19" rx="2" fill="#dbcce8"/><rect x="68" y="82" width="11" height="24" rx="2" fill="#f0d5d6"/><rect x="82" y="89" width="11" height="17" rx="2" fill="#e6dbb9"/>
      <path d="M137 106L133 88H159L155 106Z" fill="#f1dfcb" stroke="#d4bfa5"/>
      <path d="M146 89V61M146 79Q126 71 131 64Q146 61 146 79M146 80Q164 65 167 73Q163 85 146 80" fill="#c6dac0" stroke="#a3bea0" strokeWidth="1.4"/>
    </g></svg>
    <div className="home-sunbeam"/>
    <div className="home-cozy-rug"><span>&#x2661;</span></div>
  </div>
}

function KitchenBakeryDecor() {
  return <div className="kitchen-bakery-decor" aria-hidden="true">
    <svg className="kitchen-wall-clock" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="41" fill="#f8e6ec" stroke="#d6bbcd" strokeWidth="4"/><circle cx="50" cy="50" r="33" fill="#fffaf0" stroke="#ebdcc9"/><path d="M50 23V27M50 73V77M23 50H27M73 50H77" stroke="#c9b38f" strokeWidth="3" strokeLinecap="round"/><path d="M50 32V50L63 57" stroke="#b39bb9" strokeWidth="3" strokeLinecap="round"/><circle cx="50" cy="50" r="3" fill="#d0b7d8"/></svg>
    <svg className="kitchen-herbs" viewBox="0 0 100 150" fill="none"><path d="M12 19H88" stroke="#c9b491" strokeWidth="4" strokeLinecap="round"/>{[27,53,79].map((x,i)=><g key={x}><path d={`M${x} 19V${48+i*8}`} stroke="#cbb995"/><path d={`M${x} 39V${82+i*8}`} stroke="#abc3a1" strokeWidth="2"/><path d={`M${x} 50q-22-8-12 14q11 6 12-7q18-18 15 4q-9 12-15 3M${x} 70q-17-4-10 12q11 9 10-5q18-13 11 6q-9 5-11-1`} fill="#c5d8b9" stroke="#abc3a1" strokeWidth="1"/></g>)}</svg>
    <div className="kitchen-runner"><span>&#x2661;</span></div>
  </div>
}

function BathroomSpaDecor() {
  return <div className="bath-spa-decor" aria-hidden="true">
    <svg className="spa-wall-shelf" viewBox="0 0 200 150" fill="none"><g strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 40H176" stroke="#d4c3aa" strokeWidth="6"/>
      <path d="M41 42V51M160 42V51" stroke="#c4b296" strokeWidth="3"/>
      <rect x="41" y="23" width="43" height="15" rx="6" fill="#e5d6ef" stroke="#cbb5d8"/>
      <path d="M49 28H76M49 33H76" stroke="#f7effc" strokeWidth="1.5"/>
      <rect x="99" y="14" width="20" height="24" rx="5" fill="#f6e6c7" stroke="#d4c19b"/>
      <path d="M106 14V8H117" stroke="#c4b18b" strokeWidth="2"/>
      <path d="M139 37L136 22H155L152 37Z" fill="#f3e2d7" stroke="#d3bfb6"/>
      <path d="M145 23V1M145 13Q130 8 133 1Q144-1 145 13M145 16Q162 7 159 2Q148 1 145 16" fill="#c1d9bb" stroke="#9fbd9b" strokeWidth="1.5"/>
      <path d="M40 74H162" stroke="#c4b38e" strokeWidth="4"/>
      <path d="M55 72V124Q78 132 101 124V72" fill="#f3e3ed" stroke="#d5bbd0" strokeWidth="1.8"/>
      <path d="M61 116H95" stroke="#ddc6d8" strokeDasharray="2 3" strokeWidth="2"/>
      <path d="M111 72V112Q131 120 151 112V72" fill="#e8dcf3" stroke="#cbb6db" strokeWidth="1.8"/>
      <path d="M117 105H145" stroke="#d1bde0" strokeDasharray="2 3" strokeWidth="2"/>
    </g></svg>
    <div className="spa-bathmat"><span>&#x2661;</span></div>
  </div>
}

export function BedBlanket({sleeping, onToggle}) {
  return <div className="bed-blanket-layer"><Art side="right"><CozyBed foreground sleeping={sleeping} onToggle={onToggle}/></Art></div>
}

export function RoomScenery({room, radioPlaying = false, tvPlaying = false, vanityActive = false, onVanityToggle, homeActivity = 'center', onHomeActivity, reading = false, readingStage = 'idle', onReadingToggle, sleeping = false, onBedToggle, alarmPhase = 'idle', onAlarmRing, onStartGame, mirrorActive = false, ribbonOwned = [], mirrorBow = '#f5a9ce', mirrorDress = '#f5a9ce', onChooseOutfit, onMirrorToggle, onOutsidePlay, outsideSeated = false, onOutsideBench, flowersGiven = false, onGiftComplete}) {
 const sofaId = useId().replaceAll(':', '')
 if(room === 'Outside')return <OutsideAdventure bow={mirrorBow} dress={mirrorDress} onPlay={onOutsidePlay} seated={outsideSeated} onBench={onOutsideBench} flowersGiven={flowersGiven} onGiftComplete={onGiftComplete}/>
 let left, right
 switch(room) {
 case 'Kitchen':
 left=<><KitchenWallCabinet/><circle data-kitchen-prep="true" cx="178" cy="208" r="1" fill="none" stroke="none"/><circle data-kitchen-stove="true" cx="92" cy="208" r="1" fill="none" stroke="none"/></>;
 right=<><Window/><circle data-kitchen-counter="true" cx="118" cy="210" r="1" fill="none" stroke="none"/></>;break
 case 'Bathroom':
 left=<><BathroomMirror active={vanityActive} onToggle={onVanityToggle}/><circle data-vanity-seat="true" cx="120" cy="201" r="1" fill="none" stroke="none"/></>;
 right=<circle data-bath-seat="true" cx="125" cy="224" r="1" fill="none" stroke="none"/>;break
 case 'Bedroom':
 left=<><Frame symbol="star"/><ReadingNook stage={readingStage} active={reading} onToggle={onReadingToggle}/></>;
 right=<><Window moon/>
   <g className="bedside-table" transform="translate(-24 -34)">
     <ellipse cx="-19" cy="281" rx="48" ry="5" fill="#b8a2c5" opacity=".14" stroke="none"/>
     <path d="M-55 258V279M17 258V279" stroke="#bda3bf" strokeWidth="4"/>
     <rect x="-61" y="226" width="84" height="40" rx="6" fill="#e8d5df" stroke="#c6aabb" strokeWidth="2"/>
     <rect x="-66" y="219" width="94" height="10" rx="4" fill="#fff4e8" stroke="#d5bfb5"/>
     <rect x="-52" y="236" width="66" height="21" rx="4" fill="#f5e6ec" stroke="#d6bbca" strokeWidth="1.3"/>
     <path d="M-24 246H-13" stroke="#c2a57f" strokeWidth="2.5"/>
     <path d="M-56 230H18" stroke="#fff5ef" strokeWidth="1.5"/>
     <path d="M-47 252H10" stroke="#e4cfdc" strokeWidth="1"/>
     <path d="M-52 261H14" stroke="#f9ebf2" strokeDasharray="2 3" strokeWidth="1"/>
     <g transform="translate(-60 155) scale(.62)"><Plant x={0} y={0}/></g>
     {(alarmPhase === 'throwing' || alarmPhase === 'landed') && <g className="alarm-landing-cushion"><ellipse cx="-39" cy="310" rx="32" ry="5" fill="#bca4c8" stroke="none" opacity=".15"/><rect x="-69" y="293" width="60" height="19" rx="10" fill="#e7d4ee" stroke="#c5a9d1"/><path d="M-61 301Q-39 295-17 301" stroke="#f9eefa" strokeWidth="1.5"/></g>}
     <AlarmClock phase={alarmPhase} onRing={onAlarmRing}/>
   </g>
   <CozyBed sleeping={sleeping} onToggle={onBedToggle}/></>;break
 case 'Games':
 left=<ArcadeStation onPlay={onStartGame}/>;
 right=<ToyGameStations onPlay={onStartGame}/>;break
 case 'Dress Up':
 left=<><DressRack onChoose={onChooseOutfit} selected={mirrorDress}/><RibbonDrawer selected={mirrorBow} owned={ribbonOwned} onChoose={onChooseOutfit}/></>;
 right=<DressingMirror active={mirrorActive} bow={mirrorBow} dress={mirrorDress} onToggle={onMirrorToggle}/>;break

 default:
 left=<>
   <circle data-tv-approach="true" cx="236" cy="250" r="1" fill="none" stroke="none"/>
   <circle data-tv-spot="true" cx="84" cy="245" r="1" fill="none" stroke="none"/>
   {/* Pastel television and a little radio on the media cabinet. */}
   <Television playing={tvPlaying} onToggle={() => onHomeActivity?.(1)}/>
   <circle data-chair-seat="true" cx="278" cy="277" r="1" fill="none" stroke="none"/>
   {/* A lavender reading chair beside the radio, with a clear gap from the cabinet. */}
   <g transform="translate(246 216)"><g className={radioPlaying ? 'home-chair chair-rocking' : 'home-chair'}>
     <ellipse cx="32" cy="76" rx="39" ry="7" fill="#cbb7ce" opacity=".18" stroke="none"/>
     <path d="M-5 72Q32 86 71 72" fill="none" stroke="#bca8bb" strokeWidth="4"/>
     <path d="M10 59L7 75M55 59L58 75" stroke="#bca8bb" strokeWidth="5"/>
     <rect x="4" y="0" width="58" height="56" rx="18" fill="#d9c8e7" stroke="#bba4ca"/>
     <rect x="12" y="8" width="42" height="33" rx="12" fill="#eadef2" stroke="#cbb6d8"/>
     <path d="M19 13Q32 7 47 13" stroke="#f6ebff" strokeWidth="2"/>
     <path d="M15 42H51" stroke="#f7effb" strokeDasharray="2 3" strokeWidth="1"/>
     <rect x="7" y="39" width="52" height="22" rx="9" fill="#e3d2ed" stroke="#bba4ca"/>
     <rect x="-3" y="28" width="15" height="30" rx="7" fill="#d0badd" stroke="#bba4ca"/>
     <rect x="53" y="28" width="15" height="30" rx="7" fill="#d0badd" stroke="#bba4ca"/>
     <rect x="21" y="21" width="25" height="21" rx="7" fill="#fff3df" stroke="#e1cdb3" transform="rotate(-8 33 31)"/>
   </g></g>
 </>;
 right=<><Window/>
   <circle data-sofa-seat="true" cx="120" cy="277" r="1" fill="none" stroke="none"/>
   <g className="home-scene-control sofa-control" role="button" tabIndex={0} aria-pressed={homeActivity === 'sofa'} aria-label={homeActivity === 'sofa' ? 'Leave sofa' : 'Sit on sofa'} onClick={() => onHomeActivity?.(0)} onKeyDown={event => {
     if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onHomeActivity?.(0) }
   }}>
   <title>{homeActivity === 'sofa' ? 'Tap to leave the sofa' : 'Tap to sit on the sofa'}</title>
   <defs><linearGradient id={sofaId} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#efd3e3"/><stop offset="1" stopColor="#d6aec8"/></linearGradient></defs>
   <ellipse cx="123" cy="289" rx="103" ry="7" fill="#baa0b3" opacity=".14" stroke="none"/>
   {/* Sofa bed with an extended mattress, pillows, and a lavender throw. */}
   <path d="M24 240V201Q24 182 44 182H197Q217 182 217 201V263H24Z" fill={`url(#${sofaId})`} stroke="#caa5c0" strokeWidth="3"/>
   <rect x="34" y="197" width="173" height="47" rx="13" fill="#f1d8e8"/>
   <path d="M121 202V235" stroke="#dfbfd3"/>
   <path d="M43 190H196" stroke="#fae8f1" strokeWidth="2"/>
   <path d="M55 217H187" stroke="#d8b4cc" strokeDasharray="2 6" strokeWidth="1"/>
   <circle cx="81" cy="211" r="2" fill="#d5adc6" stroke="none"/><circle cx="162" cy="211" r="2" fill="#d5adc6" stroke="none"/>
   <rect x="44" y="193" width="51" height="35" rx="11" fill="#fff7e6" transform="rotate(-8 70 210)"/>
   <rect x="148" y="193" width="51" height="35" rx="11" fill="#d8c6e8" transform="rotate(8 173 210)"/>
   <path d="M63 202Q54 193 53 201Q52 207 63 214Q74 207 73 201Q72 193 63 202Z" fill="#e4c5d3" stroke="none" transform="rotate(-8 63 204)"/>
   <path d="M159 202H186M158 209H187M157 216H188" stroke="#efe4f7" strokeWidth="1.3" transform="rotate(8 173 210)"/>
   <path d="M43 233H197L207 276H34Z" fill="#fff5fa" stroke="#d6b7cc"/>
   <path d="M36 264H204V280H36Z" fill="#ead0e1"/>
   <path d="M118 234H183L192 276H118Z" fill="#d9c9e9" stroke="#c6b3d8"/>
   <path d="M126 242H179M126 251H181M126 260H183" stroke="#eee4f5" strokeWidth="3"/>
   <path d="M124 269L124 279M134 270L134 280M144 270L144 280M154 270L154 280M164 270L164 280M174 270L174 280M184 270L185 280" stroke="#c9b2dd" strokeWidth="1.5"/>
   <path d="M25 219H47V258H25ZM194 219H220V258H194Z" fill="#d7b3cb"/>
   <path d="M42 281V290M199 281V290" stroke="#b69ab1" strokeWidth="5"/>
   <rect className="home-object-focus" x="20" y="179" width="204" height="114" rx="16" fill="transparent" stroke="none"/>
   </g>
 </>

 }
 return <div className="room-scenery" key={room}><div className="scene-glow"/>{room === 'Bathroom' && <BathroomSpaDecor/>}{room === 'Kitchen' && <KitchenBakeryDecor/>}{room === 'Home' && <HomeLivingDecor/>}{room === 'Bedroom' && <BedroomDreamDecor/>}{room === 'Games' && <PlayroomDecor/>}{room === 'Dress Up' && <DressingRoomDecor/>}<div className="scene-panelling"/><div className="scene-garland">{Array.from({length:9},(_,i)=><span key={i} style={{'--i':i}}/>)}</div><Art side="left">{left}</Art><Art side="right">{right}</Art><div className="scene-dust"><i/><i/><i/><i/></div><span className="scene-room-label"><RoomIcon name={room}/>{room==='Home'?'OUR HAPPY PLACE':room.toUpperCase()}</span></div>
}
