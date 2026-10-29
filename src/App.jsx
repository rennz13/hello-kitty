import { useGameAudio, interactionSound } from './gameAudio'
import { useEffect, useRef, useState } from 'react'
import './App.css'
import { MemoryMatch } from './MemoryMatch'
import { KittySnake } from './KittySnake'
import { CatchGame } from './CatchGame'
import { FeedingTray } from './FeedingTray'
import { MovingKitty } from './MovingKitty'
import { BedBlanket, BathroomDuck, BathroomVanity, BathShower, HomeTableForeground, KitchenCounter, KitchenStove, RoomScenery } from './RoomScenery'
import { RoomIcon } from './RoomIcon'
const rooms = [['⌂','Home'],['♧','Kitchen'],['♧','Bathroom'],['☾','Bedroom'],['♧','Games'],['♧','Dress Up'],['♧','Outside']]
const roomThemes = {
  Home: {subtitle: 'A cozy corner, just for you two.', tag: 'COZY & HAPPY'},
  Kitchen: {subtitle: 'Fresh bakes and a little homemade happiness.', tag: 'FRESH & SWEET'},
  Bathroom: {subtitle: 'A little spa day, just for you.', tag: 'BUBBLY & FRESH'},
  Bedroom: {subtitle: 'Moonlight, cozy stories, and sweet dreams.', tag: 'SOFT & SLEEPY'},
  Games: {subtitle: 'Three little adventures. Tap a toy to play.', tag: 'PLAY & SPARKLE'},
  'Dress Up': {subtitle: 'A lilac dressing room for lovely bows.', tag: 'BOWS & BLOOMS'},
  Outside: {subtitle: 'Fresh air, little flowers, and a world to explore.', tag: 'LITTLE ADVENTURES'},
}
const tvInterruptedMessages = [
  'Hey! This is the best part!',
  'Shhh... I want to hear what happens next!',
  'Just a minute! My favorite character is talking.',
  'You made me miss it! No more pokes, please.',
  'Can cuddles wait until the show is over?',
  'Hmph! I am trying to watch my show.',
  'One little episode, then you have my attention!',
  'Not now! The bunny is about to hop!',
]
const fresh = {petName:'',flowersReceived:false,coins:5000,xp:0,stats:[85,92,78,90],bow:'#f5a9ce',owned:['#f5a9ce'],dress:'#f5a9ce',ownedDresses:['#f5a9ce'],decor:false,last:Date.now()}
function load(){try{const s=JSON.parse(localStorage.getItem('little-kitty'));if(!s || !Array.isArray(s.stats))return fresh;const hours=Math.min(48,(Date.now()-s.last)/3600000);return {...fresh,...s,dress:s.dress||s.bow||fresh.dress,ownedDresses:Array.isArray(s.ownedDresses)?s.ownedDresses:[s.dress||s.bow||fresh.dress],petName:typeof s.petName==='string'?s.petName.trim().slice(0,24):'',stats:s.stats.map(v=>Math.max(0,v-hours*2))}}catch{return fresh}}
function PetNameDialog({onSave}) {
  const dialogRef = useRef(null)
  const [name, setName] = useState('')
  const petName = name.trim().replace(/\s+/g, ' ')

  useEffect(() => {
    const dialog = dialogRef.current
    dialog.showModal()
    return () => dialog.close()
  }, [])

  function submit(event) {
    event.preventDefault()
    if (petName) onSave(petName)
  }

  return (
    <dialog ref={dialogRef} className="modal name-dialog" aria-labelledby="pet-name-title" aria-describedby="pet-name-description" onCancel={event => event.preventDefault()}>
      <form onSubmit={submit}>
        <span className="name-bow" aria-hidden="true">&#x0B68;&#x0B67;</span>
        <h2 id="pet-name-title">Enter a name for Hello Kitty</h2>
        <p id="pet-name-description">Give your little friend a name to make her feel at home.</p>
        <label htmlFor="pet-name">Pet name</label>
        <input id="pet-name" name="petName" type="text" value={name} onChange={event => setName(event.target.value)} placeholder="e.g. Mimi" maxLength={24} required autoComplete="off" enterKeyHint="done" />
        <small>Up to 24 characters. We'll remember her name for you.</small>
        <button type="submit" className="primary" disabled={!petName}>Save name &#x2661;</button>
      </form>
    </dialog>
  )
}
function App(){const [outsideDestination,setOutsideDestination]=useState('center');const [dressDestination,setDressDestination]=useState('center');const [sleepCorner,setSleepCorner]=useState(false);const [alarmRequest,setAlarmRequest]=useState(null);const [alarmPhase,setAlarmPhase]=useState('idle');const [readingStage,setReadingStage]=useState('idle');const [bedroomDestination,setBedroomDestination]=useState('center');const [vanityPhase,setVanityPhase]=useState('idle');const [bathDestination,setBathDestination]=useState('center');const [showerRunning,setShowerRunning]=useState(false);const [cookingStage,setCookingStage]=useState('soup');const [kitchenDestination,setKitchenDestination]=useState('center');const [feedingPhase,setFeedingPhase]=useState('idle');const lastTvMessage = useRef(-1);const [homeDestination,setHomeDestination]=useState('center');const [s,setS]=useState(load);const [room,setRoom]=useState('Home');const [message,setMessage]=useState('A little love makes a lovely day!');const [sleep,setSleep]=useState(false);const [reaction,setReaction]=useState(0);const [muted,setMuted]=useState(true);const [game,setGame]=useState(null);
useEffect(()=>{try{localStorage.setItem('little-kitty',JSON.stringify({...s,last:Date.now()}))}catch{/* Storage may be unavailable in private mode. */}},[s]);
useEffect(()=>{const id=setInterval(()=>setS(p=>({...p,stats:p.stats.map((v,i)=>Math.max(0,Math.min(100,v+(sleep&&i===2?5:-.15))))})),15000);return()=>clearInterval(id)},[sleep]);
const audio = useGameAudio({muted,sleep,room,showerRunning,vanityPhase,feedingPhase,cookingStage,kitchenDestination,alarmPhase,readingStage,flowersReceived:s.flowersReceived,game})
function sound(kind='click'){audio.current?.play(kind)}
function act(text,index=1,amount=8,cost=0){if(s.coins<cost){setMessage('A few more coins and it is yours!');return}sound();setS(p=>({...p,coins:p.coins-cost,xp:p.xp+5,stats:p.stats.map((v,i)=>i===index?Math.min(100,v+amount):v)}));setMessage(text);setReaction(v=>v+1)}
function start(name){setGame(name)}

const theme = roomThemes[room];

function petKitty(disturbed, part) {
  if (!disturbed) {
    const touchMessages = {
      head: ['Your head pats are my favorite!', 'Purr... I love you so much!', 'More gentle pats, please!'],
      hand: ['High five! You are my best friend!', 'A little wave, just for you!', 'Hold my paw? Let us be friends!'],
      tummy: ['Hee hee! That tickles!', 'My tummy is so ticklish!', 'Giggle, giggle! You found my tickle spot!'],
      ear: ['Hey! My ears are sensitive. Gentle, please!', 'Hmph! Head pats instead, please.', 'Careful with my little ears!'],
      tail: ['Hey! Please leave my little tail alone!', 'Hmph! My tail is a sensitive spot!', 'No tail touches! A gentle head pat, please.'],
    }
    const choices = touchMessages[part]
    act(sleep ? 'Dreaming of you...' : choices ? choices[Math.floor(Math.random() * choices.length)] : 'You make my heart so happy!', 1, part === 'ear' || part === 'tail' ? 0 : 8)
    return
  }
  // Pick a new response without repeating the previous interruption.
  const choices = tvInterruptedMessages.map((text, index) => ({text, index})).filter(item => item.index !== lastTvMessage.current)
  const choice = choices[Math.floor(Math.random() * choices.length)]
  lastTvMessage.current = choice.index
  act(choice.text, 1, 0)
}
useEffect(() => {
  setShowerRunning(false)
  if (room !== 'Bathroom' || bathDestination !== 'shower') return
  let washTimer
  const arrival = setTimeout(() => {
    setShowerRunning(true)
    washTimer = setInterval(() => setS(previous => ({...previous, stats: previous.stats.map((value,index) => index === 3 ? Math.min(100, value + 5) : value)})), 2000)
  }, 1200)
  return () => { clearTimeout(arrival); clearInterval(washTimer) }
}, [room, bathDestination])
useEffect(() => {
  setVanityPhase('idle')
  if (room !== 'Bathroom' || bathDestination !== 'vanity') return
  let cycle
  const arrival = setTimeout(() => {
    setVanityPhase('wash')
    cycle = setInterval(() => {
      setVanityPhase(previous => previous === 'wash' ? 'tidy' : 'wash')
      setS(previous => ({...previous, stats: previous.stats.map((value,index) => index === 3 ? Math.min(100,value + 3) : value)}))
    }, 3500)
  }, 1200)
  return () => { clearTimeout(arrival); clearInterval(cycle) }
}, [room, bathDestination])
function toggleVanity() {
  const leaving = bathDestination === 'vanity'
  setBathDestination(leaving ? 'center' : 'vanity')
  setSleep(false)
  setMessage(leaving ? 'All tidy! Time for a little play.' : 'Wash my paws, then make my bow look lovely!')
  sound()
}
function toggleShower() {
  const leaving = bathDestination === 'shower'
  setBathDestination(leaving ? 'center' : 'shower')
  setSleep(false)
  setShowerRunning(false)
  setMessage(leaving ? 'All fresh and fluffy! Thank you!' : 'A warm shower and a splash of bubbles!')
  sound()
}
function handleHomeActivity(index) {
  setSleep(false)
  if (index === 0) {
    const leaving = homeDestination === 'sofa'
    setHomeDestination(leaving ? 'center' : 'sofa')
    act(leaving ? 'All rested! Back to our cozy room.' : 'A comfy seat, just for me!', 2, leaving ? 0 : 10)
    return
  }
  if (index === 2) {
    const stopping = homeDestination === 'radio'
    setHomeDestination(stopping ? 'center' : 'radio')
    act(stopping ? 'That was lovely! Back to play.' : 'My cozy chair and my favorite tunes!', 1, stopping ? 0 : 8)
    return
  }
  if (index === 1) {
    const stopping = homeDestination === 'tv'
    setHomeDestination(stopping ? 'center' : 'tv')
    act(stopping ? 'That was fun! Time to stretch.' : 'Going past the radio to watch my favorite show!', 1, stopping ? 0 : 8)
    return
  }
  const reactions = ['Snuggled up on the sofa. So comfy!', 'My favorite show! Let’s watch together.', 'A little music makes my day!']
  act(reactions[index], index === 0 ? 2 : 1, index === 0 ? 10 : 8)
}
useEffect(() => {
  setAlarmPhase('idle')
  if (!alarmRequest || room !== 'Bedroom') return
  const timers = []
  setAlarmPhase('ringing')
  if (alarmRequest.angry) {
    timers.push(setTimeout(() => {setSleep(false);setAlarmPhase('waking');setMessage('Hmph! I was having such a lovely dream!')}, 450))
    timers.push(setTimeout(() => setAlarmPhase('throwing'), 1100))
    timers.push(setTimeout(() => {setAlarmPhase('landed');setMessage('Quiet, little clock! Five more minutes, please.')}, 2000))
    timers.push(setTimeout(() => {
      setAlarmPhase('idle')
      setSleepCorner(true)
      setSleep(true)
      setMessage('Curling up in my cozy corner... zzz.')
    }, 4600))
  } else {
    setMessage('Ding ding! A little reminder for a lovely day.')
    timers.push(setTimeout(() => setAlarmPhase('idle'), 1800))
  }
  return () => timers.forEach(clearTimeout)
}, [alarmRequest, room])
function ringAlarm() {
  if (alarmPhase !== 'idle') return
  setAlarmRequest({id: Date.now(), angry: sleep && bedroomDestination === 'bed'})
  sound()
}
function toggleBed() {
  setAlarmRequest(null)
  setSleepCorner(false)
  const waking = sleep && bedroomDestination === 'bed'
  setBedroomDestination(waking ? 'center' : 'bed')
  setSleep(!waking)
  setMessage(waking ? 'Good morning, sunshine!' : 'Snuggled in... sweet dreams!')
  sound()
}
function chooseOutfit(kind,color) {
  const key=kind==='ribbon'?'bow':'dress'
  const ownedKey=kind==='ribbon'?'owned':'ownedDresses'
  setS(previous=>({...previous,[key]:color,[ownedKey]:[...new Set([...previous[ownedKey],color])]}))
  setMessage(kind==='ribbon'?'A lovely ribbon for my little outfit!':'A new dress! Let me check the fit!')
  sound()
}
function claim(){sound('reward');setS(p=>({...p,coins:p.coins+30,xp:p.xp+25,stats:p.stats.map((v,i)=>i===1?Math.min(100,v+15):v)}));setGame(null);setMessage('Lovely playing! You earned 30 coins.');sound()}
return <main onClickCapture={event=>interactionSound(event,audio.current)} data-room={room}><header><div className="brand"><span className="brand-bow">୨୧</span><div><h1>my little kitty<span>YOUR LITTLE POCKET OF HAPPY</span></h1></div></div><div className="header-tools"><span className="save">♡ Progress saved automatically</span><button className="round" onClick={()=>{if(muted)audio.current?.enable();else audio.current?.disable();setMuted(!muted)}} aria-pressed={!muted} title={muted?'Turn on music & sounds':'Mute music & sounds'} aria-label={muted?'Turn on music and sound effects':'Mute music and sound effects'}>{muted?'♫̸':'♫'}</button></div></header><section className="topbar"><div className="level"><span className="level-badge">{1+Math.floor(s.xp/100)}</span><div><b className="pet-name" title={s.petName || 'Little sweetie'}>{s.petName || 'Little sweetie'}</b><small>Level {1+Math.floor(s.xp/100)} <span>{s.xp%100} / 100 XP</span></small><div className="track"><i style={{width:`${s.xp%100}%`}}/></div></div></div><div className="coins"><span>✧</span> {s.coins}<small>COINS</small></div></section><div className="game-layout"><aside><div className="panel-heading"><h2>A happy little life</h2><span>♡</span></div><p>A little care, a lot of love.</p><div className="stats">{['Hunger','Happiness','Energy','Cleanliness'].map((name,i)=><div className={'stat stat-'+i} key={name}><span className="stat-icon">{['♧','♡','☾','✧'][i]}</span><div><label>{name}<b>{Math.round(s.stats[i])}%</b></label><div className="track"><i style={{width:`${s.stats[i]}%`}}/></div></div></div>)}</div><div className="note"><span>✧</span><h3>Little moments, big love</h3><p>Feed, play, and spend a little time together. You're her favorite person.</p></div><div className="daily"><span>✿</span><div><b>Made for cozy days</b><small>Take it slow. Stay a little.</small></div></div></aside><section className="play-area"><div className={'room '+(sleep?'night':'')} data-room={room}><div className="room-title"><span><RoomIcon name={room}/></span><div><h2>{room==='Home'?'Home sweet home':room}</h2><p>{sleep?'Sweet dreams, little one.':theme.subtitle}</p></div><span className="room-tag">{sleep?'MOONLIGHT':theme.tag}</span></div><RoomScenery onFlowersReturn={()=>{
  setS(previous=>({...previous,flowersReceived:false}))
  setMessage('You can give me those lovely flowers again, bby.')
}} flowersGiven={s.flowersReceived} onGiftComplete={()=>{
  setS(previous=>({...previous,flowersReceived:true}))
  setOutsideDestination('garden-bench')
  setMessage('These flowers mean so much to me. I love you, bby.')
}} outsideSeated={outsideDestination === 'garden-bench'} onOutsideBench={()=>{
  const leaving=outsideDestination === 'garden-bench'
  setOutsideDestination(leaving?'center':'garden-bench')
  act(leaving?'Thank you for the lovely flowers!':'A cozy seat beside you... my heart is happy!',1,leaving?0:8)
}} onOutsidePlay={()=>act('A butterfly friend! The garden is so lovely.',1,8)} mirrorActive={room === 'Dress Up' && dressDestination === 'mirror'} ribbonOwned={s.owned} mirrorBow={s.bow} mirrorDress={s.dress} onChooseOutfit={chooseOutfit} onMirrorToggle={() => {
  const leaving = dressDestination === 'mirror'
  setDressDestination(leaving ? 'center' : 'mirror')
  setSleep(false)
  act(leaving ? 'All dressed up and ready to play!' : 'Mirror, mirror... I love my little bow!', 1, leaving ? 0 : 5)
}} onStartGame={start} alarmPhase={alarmPhase} onAlarmRing={ringAlarm} sleeping={sleep} onBedToggle={toggleBed} readingStage={readingStage} reading={room === 'Bedroom' && bedroomDestination === 'reading' && !sleep} onReadingToggle={() => {
  setAlarmRequest(null)
  setSleepCorner(false)
  const leaving = bedroomDestination === 'reading' && !sleep
  setBedroomDestination(leaving ? 'center' : 'reading')
  setSleep(false)
  act(leaving ? 'Bookmark in! Let us play again.' : 'A warm little light and a lovely story!', 1, leaving ? 0 : 5)
}} homeActivity={homeDestination} onHomeActivity={handleHomeActivity} vanityActive={bathDestination === 'vanity'} onVanityToggle={toggleVanity} room={room} tvPlaying={room === 'Home' && homeDestination === 'tv'} radioPlaying={room === 'Home' && homeDestination === 'radio'}/>{room === 'Bathroom' && <BathroomVanity active={bathDestination === 'vanity'} phase={vanityPhase} onToggle={toggleVanity}/>}{room === 'Bathroom' && <BathroomDuck playing={bathDestination === 'duck'} onToggle={() => {
  const leaving = bathDestination === 'duck'
  setBathDestination(leaving ? 'center' : 'duck')
  setSleep(false)
  setShowerRunning(false)
  act(leaving ? 'Bye, little duck! See you soon.' : 'Quack, quack! My little ducky friend!', 1, leaving ? 0 : 8)
}}/>}{room === 'Bathroom' && <BathShower active={bathDestination === 'shower'} running={showerRunning} onToggle={toggleShower}/>}{room === 'Kitchen' && <KitchenStove stage={cookingStage} busy={kitchenDestination === 'stove' && feedingPhase === 'idle'} onToggle={() => {
  if (feedingPhase !== 'idle') return
  const leaving = kitchenDestination === 'stove'
  setKitchenDestination(leaving ? 'center' : 'stove')
  setSleep(false)
  act(leaving ? 'Soup is looking lovely! Time for a break.' : 'Stir, stir! A cozy little soup is on the way.', 1, leaving ? 0 : 5)
}}/>}{room === 'Kitchen' && <KitchenCounter busy={kitchenDestination === 'counter' && feedingPhase === 'idle'} onToggle={() => {
  if (feedingPhase !== 'idle') return
  const leaving = kitchenDestination === 'counter'
  setKitchenDestination(leaving ? 'center' : 'counter')
  setSleep(false)
  act(leaving ? 'All mixed! Ready for a little treat?' : 'Mix, mix, mix! Making something lovely.', 1, leaving ? 0 : 5)
}}/>}{room === 'Home' && <HomeTableForeground onRadioToggle={() => handleHomeActivity(2)} radioPlaying={homeDestination === 'radio'}/>}{room==='Bedroom'&&<BedBlanket sleeping={sleep} onToggle={toggleBed}/>}<div className="rug"/><MovingKitty holdingFlowers={room === 'Outside' && s.flowersReceived} dress={s.dress} sleepCorner={sleepCorner} alarmUpset={room === 'Bedroom' && ['waking','throwing','landed'].includes(alarmPhase)} alarmPhase={alarmPhase} onReadingStageChange={setReadingStage} vanityPhase={vanityPhase} bathing={showerRunning} onCookingStageChange={setCookingStage} feedingPhase={room === 'Kitchen' ? feedingPhase : 'idle'} message={message} key={room} destination={room === 'Home' ? homeDestination : room === 'Kitchen' && feedingPhase === 'idle' ? kitchenDestination : room === 'Bathroom' ? bathDestination : room === 'Bedroom' ? bedroomDestination : room === 'Dress Up' ? dressDestination : room === 'Outside' ? outsideDestination : 'center'} bow={s.bow} sleeping={sleep} reaction={reaction} name={s.petName} onPet={petKitty}/>{s.decor && room === 'Home' && <div className="decoration">✿</div>}<span className="sparkle one">✧</span><span className="sparkle two">✧</span><div className="room-caption">♡ {sleep?'Resting and recharging':room === 'Bathroom' ? 'Tap the mirror, bathtub, or duck' : room === 'Kitchen' ? 'Tap the counters to cook, or drag a little treat' : room === 'Home' ? 'Tap the sofa, TV, or radio' : room === 'Bedroom' ? 'Tap the lamp for a story, or the bed for a dream' : room === 'Games' ? 'Tap the arcade, matching cards, or strawberry basket' : room === 'Dress Up' ? 'Tap a dress, the ribbon drawer, or the mirror' : room === 'Outside' ? 'Tap the bench to sit with Rence, or tap him for sweet words' : 'Tap Kitty for a little love'}</div></div>{room !== 'Home' && room !== 'Bathroom' && room !== 'Bedroom' && room !== 'Games' && room !== 'Dress Up' && room !== 'Outside' && <div className="action-panel"><div><h3>{room==='Home'?'A little love goes a long way':room==='Kitchen'?'Something sweet to eat':room==='Games'?'A little playtime':room==='Dress Up'?'Pretty in pastels':room==='Outside'?'Little lovely things':room==='Bathroom'?'Fresh as a daisy':'Time to dream'}</h3><p>{room==='Kitchen' ? 'Pick a little treat and bring it close.' : room==='Home'?'What shall we do together?':'Make yourself at home.'}</p></div><div className="actions">{room==='Home'?<><button onClick={()=>setRoom('Kitchen')}><span>♧</span>Feed me</button><button onClick={()=>setRoom('Games')}><span>♡</span>Let's play</button><button onClick={()=>{setSleep(!sleep);setRoom('Bedroom')}}><span>☾</span>Take a nap</button></>:room==='Kitchen'?<FeedingTray coins={s.coins} hunger={s.stats[0]} onPhaseChange={setFeedingPhase} onFeed={(food,cost)=>{setSleep(false);act(`Mmm, ${food.toLowerCase()}! So yummy.`,0,20,cost)}}/>:room==='Bathroom'?<><button onClick={()=>act('Bubbles, bubbles everywhere!',3,25)}>♧ Soap bubbles</button><button onClick={()=>act('Squeaky clean and oh so happy!',3,35)}>♧ Gentle shower</button></>:room==='Bedroom'?<button onClick={toggleBed}>☾ {sleep?'Wake up':'Snuggle into bed'}</button>:room==='Games'?['Catch the Hearts','Memory Match','Kitty Snake'].map(g=><button key={g} onClick={()=>start(g)}>♡ {g}</button>):room==='Dress Up'?null:null}</div></div>}</section></div><nav aria-label="Rooms" aria-describedby={sleep ? 'sleep-navigation-hint' : undefined}>{rooms.map(([,name])=><button key={name} disabled={sleep && room !== name} title={sleep && room !== name ? 'Tap the bed to wake Kitty before changing rooms' : name} className={room===name?'active':''} onClick={()=>{if(sleep) return;setRoom(name);setOutsideDestination('center');setDressDestination('center');setBedroomDestination('center');setBathDestination('center');setHomeDestination('center');setKitchenDestination('center');sound()}}><span><RoomIcon name={name}/></span>{name}{room===name&&<i/>}</button>)}</nav>{sleep && <p id="sleep-navigation-hint" className="sleep-navigation-hint" role="status">Kitty is sleeping. Tap the bed to wake her before changing rooms.</p>}<footer>Lovingly made for little moments of joy <span>✧</span> Everything is better with a bow.</footer>{!s.petName && <PetNameDialog onSave={petName => {
  setS(previous => ({...previous, petName}))
  setMessage(`${petName} is so happy to meet you!`)
}} />}{game&&<div className="modal-backdrop"><section className="modal catch-game-modal" role="dialog" aria-modal="true" aria-label={game}><button className="close" aria-label="Close game" onClick={()=>setGame(null)}>&#x00D7;</button>{game === 'Memory Match' ? <MemoryMatch audio={audio} onClaim={claim}/> : game === 'Kitty Snake' ? <KittySnake audio={audio} onClaim={(coins,xp)=>{setS(previous=>({...previous,coins:previous.coins+coins,xp:previous.xp+xp,stats:previous.stats.map((value,index)=>index===1?Math.min(100,value+10):value)}));setGame(null);setMessage('What a lovely little Kitty parade!');sound()}}/> : <CatchGame audio={audio} key={game} name={game} onClaim={claim}/>}</section></div>}</main>}
export default App
