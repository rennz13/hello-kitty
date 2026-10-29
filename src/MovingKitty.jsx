import { useEffect, useRef, useState } from 'react'
import { KittyCharacter } from './KittyCharacter'

export function MovingKitty({destination, bow, dress, sleeping, reaction, name, onPet, message, feedingPhase = 'idle', onCookingStageChange, bathing = false, vanityPhase = 'idle', onReadingStageChange, alarmUpset = false, alarmPhase = 'idle', sleepCorner = false, holdingFlowers = false}) {
  const petRef = useRef(null)
  const annoyedTimer = useRef(null)
  const touchTimer = useRef(null)
  const [readingStage, setReadingStage] = useState('idle')
  const [touchReaction, setTouchReaction] = useState('')
  const [annoyed, setAnnoyed] = useState(false)
  const previousDestination = useRef(destination)
  const [position, setPosition] = useState(null)
  const [cookingStage, setCookingStage] = useState('soup')
  const [tvStage, setTvStage] = useState('approach')
  const [walking, setWalking] = useState(false)
  const [speechVisible, setSpeechVisible] = useState(false)
  const previousSpeech = useRef({message, reaction, destination})
  const onSofa = destination === 'sofa'
  const onRadio = destination === 'radio'
  const onGardenBench = destination === 'garden-bench'
  const onDuck = destination === 'duck'
  const reading = destination === 'reading'
  const onTV = destination === 'tv'
  const atVanity = destination === 'vanity'
  const atMirror = destination === 'mirror'
  const inBed = destination === 'bed'
  const inBath = destination === 'shower'
  const onCounter = destination === 'counter' || destination === 'stove'
  const seated = onSofa || onRadio || onDuck || reading || onGardenBench

  useEffect(() => {
    setAnnoyed(false)
    setTouchReaction('')
    return () => { clearTimeout(annoyedTimer.current); clearTimeout(touchTimer.current) }
  }, [destination])

  function petKitty(event, keyboardPart) {
    const part = keyboardPart || event?.target?.closest('[data-pet-part]')?.dataset.petPart || 'head'
    const disturbed = onTV && !walking
    if (disturbed) {
      setAnnoyed(true)
      clearTimeout(annoyedTimer.current)
      annoyedTimer.current = setTimeout(() => setAnnoyed(false), 2400)
    }
    const canTouch = destination === 'center' && !walking && !sleeping
    if (canTouch) {
      setTouchReaction(part)
      clearTimeout(touchTimer.current)
      touchTimer.current = setTimeout(() => setTouchReaction(''), 2200)
    }
    onPet(disturbed, canTouch ? part : undefined)
  }

  useEffect(() => {
    const previous = previousSpeech.current
    if (previous.message === message && previous.reaction === reaction && previous.destination === destination) return
    previousSpeech.current = {message, reaction, destination}
    setSpeechVisible(true)
    const timer = setTimeout(() => setSpeechVisible(false), 4000)
    return () => clearTimeout(timer)
  }, [message, reaction, destination])

  useEffect(() => {
    const pet = petRef.current
    const room = pet.closest('.room')
    function measure() {
      if (!seated && !onTV && !onCounter && !inBath && !atVanity && !inBed && !atMirror) { setPosition(null); return }
      const seat = room.querySelector(onGardenBench ? '[data-garden-bench]' : atMirror ? '[data-dress-mirror]' : inBed ? (sleepCorner ? '[data-bed-corner]' : '[data-bed-seat]') : reading ? '[data-reading-seat]' : atVanity ? '[data-vanity-seat]' : onDuck ? '[data-duck-seat]' : inBath ? '[data-bath-seat]' : onCounter ? (destination === 'stove' ? (cookingStage === 'side' ? '[data-kitchen-prep]' : '[data-kitchen-stove]') : '[data-kitchen-counter]') : onTV ? (tvStage === 'approach' ? '[data-tv-approach]' : '[data-tv-spot]') : onRadio ? '[data-chair-seat]' : '[data-sofa-seat]')
      if (!seat) return
      const roomBox = room.getBoundingClientRect()
      const seatBox = seat.getBoundingClientRect()
      const furniture = seat.closest('svg').getBoundingClientRect()
      const width = Math.min(onGardenBench ? 205 : 150, furniture.width * (onGardenBench ? .64 : atMirror ? .58 : inBed ? .58 : reading ? .43 : onDuck ? .95 : onRadio ? .34 : inBath || atVanity ? .62 : onTV || onCounter ? .5 : .68))
      const center = seatBox.left + seatBox.width / 2 - roomBox.left - room.clientLeft
      const bubbleWidth = Math.min(210, Math.max(112, width * 1.15))
      const shift = Math.max(12 - center + bubbleWidth / 2, Math.min(0, room.clientWidth - 12 - center - bubbleWidth / 2))
      setPosition({
        '--speech-shift': `${shift}px`,
        left: `${seatBox.left + seatBox.width / 2 - roomBox.left - room.clientLeft}px`,
        bottom: `${roomBox.bottom - room.clientTop - (seatBox.top + seatBox.height / 2) - width * .11}px`,
        width: `${width}px`,
      })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(room)
    return () => observer.disconnect()
  }, [seated, onRadio, onTV, onCounter, tvStage, destination, cookingStage, inBath, onDuck, atVanity, reading, inBed, sleepCorner, atMirror, onGardenBench])

  useEffect(() => {
    if (previousDestination.current === destination) return
    previousDestination.current = destination
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setWalking(!reducedMotion)
    setTvStage(onTV && !reducedMotion ? 'approach' : 'screen')
    if (reducedMotion) return
    const routeTimer = onTV ? setTimeout(() => setTvStage('screen'), 1100) : null
    const timer = setTimeout(() => setWalking(false), onTV ? 2300 : 1150)
    return () => { clearTimeout(timer); clearTimeout(routeTimer) }
  }, [destination, onTV])

  useEffect(() => {
    setCookingStage('soup')
    onCookingStageChange?.('soup')
    if (destination !== 'stove' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let timer
    let cancelled = false
    const steps = [
      {stage: 'side', moving: true, delay: 1150},
      {stage: 'side', moving: false, delay: 2200},
      {stage: 'soup', moving: true, delay: 1150},
      {stage: 'soup', moving: false, delay: 3200},
    ]
    function next(index) {
      if (cancelled) return
      const step = steps[index]
      setCookingStage(step.stage)
      setWalking(step.moving)
      onCookingStageChange?.(step.moving ? 'walking' : step.stage)
      timer = setTimeout(() => next((index + 1) % steps.length), step.delay)
    }
    timer = setTimeout(() => next(0), 4300)
    return () => { cancelled = true; clearTimeout(timer) }
  }, [destination, onCookingStageChange])

  useEffect(() => {
    const timers = []
    function stage(value) {
      setReadingStage(value)
      onReadingStageChange?.(value)
    }
    if (!reading) { stage('idle'); return }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      stage('reading')
      return
    }
    stage('walking')
    timers.push(setTimeout(() => stage('settling'), 1150))
    timers.push(setTimeout(() => stage('pickup'), 1500))
    timers.push(setTimeout(() => stage('reading'), 2400))
    return () => timers.forEach(clearTimeout)
  }, [reading, onReadingStageChange])

  return <div ref={petRef} data-destination={destination} data-cooking-stage={cookingStage} data-reading-stage={readingStage} data-alarm-phase={alarmPhase} style={position || undefined} className={`kitty moving-kitty ${inBed && sleepCorner && sleeping ? 'kitty-corner-sleep' : ''} ${sleeping && !walking && feedingPhase === 'idle' ? 'sleeping' : ''} feeding-${feedingPhase} ${walking ? 'kitty-walking' : ''} ${seated && !walking ? 'kitty-seated' : ''} ${onRadio && !walking ? 'kitty-listening' : ''} ${onTV && !walking ? 'kitty-watching' : ''} ${atMirror && !walking ? 'kitty-mirror-admiring' : ''} ${onCounter && !walking ? 'kitty-working' : ''} ${bathing ? 'kitty-bathing' : ''} ${alarmUpset ? 'kitty-alarm-upset' : ''} ${onDuck && !walking ? 'kitty-duck-play' : ''} ${reading && readingStage === 'reading' ? 'kitty-reading' : ''} ${reading && readingStage === 'pickup' ? 'kitty-book-reaching' : ''} ${atVanity && !walking ? `kitty-vanity kitty-vanity-${vanityPhase}` : ''}`}>
    <div className={`speech following-speech ${speechVisible ? 'speech-visible' : 'speech-hidden'}`} role="status" aria-live="polite" aria-hidden={!speechVisible}>{message}<span aria-hidden="true">&#x2661;</span></div>
    {sleeping && !walking && <div className="kitty-sleep-cloud" aria-label="Sleeping peacefully"><span>z</span><span>z</span><span>Z</span></div>}
    <button className="kitty-pet-target" onClick={petKitty} onKeyDown={event => {
      const part = {h: 'hand', p: 'head', t: 'tummy', e: 'ear', l: 'tail'}[event.key.toLowerCase()]
      if (part && destination === 'center' && !sleeping) { event.preventDefault(); petKitty(event, part) }
    }} aria-keyshortcuts="H P T E L" aria-label={`Pet ${name || 'Kitty'}${onSofa ? ' on the sofa' : onRadio ? ' in the rocking chair' : ''}`}>
    <div className="kitty-travel-body">
      <div key={reaction} className={reaction && !touchReaction && feedingPhase === 'idle' && !seated && !onTV && !onCounter && !atVanity && !atMirror && !walking ? 'bounce' : ''}>
        <KittyCharacter holdingFlowers={holdingFlowers} dress={dress} fitting={atMirror && !walking} reading={reading && readingStage === 'reading'} bow={bow} sleeping={sleeping && !walking && feedingPhase === 'idle'} feedingPhase={feedingPhase} bathing={bathing} happy={reaction > 0} name={name} seated={seated && !walking} facingBack={(onTV || atMirror) && !walking} annoyed={annoyed && onTV && !walking} emotion={alarmUpset ? 'alarm' : feedingPhase === 'idle' ? touchReaction : ''} interactive={destination === 'center' && !walking && !sleeping}/>
      </div>
    </div>
    </button>
  </div>
}
