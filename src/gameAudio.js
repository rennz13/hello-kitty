import { useEffect, useRef } from 'react'

// An original music-box waltz, synthesized locally with no downloads.
const melody = [76,79,84,83,79,76,74,77,81,79,77,74,72,76,79,84,83,79,77,76,74,71,74,79,76,79,84,88,86,84,83,79,81,84,89,88,84,81,79,76,77,81,86,84,83,79,76,72]
const chords = [[48,55,60,64],[45,52,57,60],[53,60,65,69],[43,50,55,59]]

export class KittyAudio {
  constructor() { this.context = null; this.enabled = false; this.timer = null; this.step = 0; this.sleeping = false; this.lastEffect = -1 }
  async enable() {
    const Audio = window.AudioContext || window.webkitAudioContext
    if (!Audio) return
    try {
      this.context ||= new Audio()
      if (!this.master) {
        this.master = this.context.createGain()
        this.master.gain.value = 0.65
        const limiter = this.context.createDynamicsCompressor()
        this.master.connect(limiter)
        limiter.connect(this.context.destination)
      }
      this.enabled = true
      await this.context.resume()
      if (!this.enabled) return
      this.next = this.context.currentTime + 0.06
      clearInterval(this.timer)
      this.timer = setInterval(() => this.schedule(), 80)
      this.schedule()
    } catch { this.enabled = false }
  }
  disable() {
    this.enabled = false
    clearInterval(this.timer)
    this.timer = null
    if (this.context && this.context.state !== 'closed') this.context.suspend().catch(() => {})
  }
  tone(note, time, duration = 0.35, volume = 0.06, type = 'sine', slide) {
    const ctx = this.context
    const oscillator = ctx.createOscillator(), gain = ctx.createGain()
    oscillator.type = type
    const frequency = 440 * 2 ** ((note - 69) / 12)
    oscillator.frequency.setValueAtTime(frequency, time)
    if (slide) oscillator.frequency.exponentialRampToValueAtTime(frequency * slide, time + duration)
    gain.gain.setValueAtTime(0, time)
    gain.gain.linearRampToValueAtTime(volume, time + 0.012)
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration)
    oscillator.connect(gain); gain.connect(this.master)
    oscillator.start(time); oscillator.stop(time + duration + 0.02)
    oscillator.onended = () => { oscillator.disconnect(); gain.disconnect() }
  }
  schedule() {
    if (!this.enabled || this.context.state !== 'running') return
    const ctx = this.context
    if (this.next < ctx.currentTime) this.next = ctx.currentTime + 0.04
    while (this.next < ctx.currentTime + 0.25) {
      const i = this.step % melody.length
      const chord = chords[Math.floor(i / 12) % 4]
      const softness = this.sleeping ? 0.45 : 1
      this.tone(melody[i], this.next, 1.1, 0.045 * softness)
      this.tone(melody[i] + 12, this.next, 0.45, 0.009 * softness)
      this.tone(chord[i % 3 + 1], this.next, 0.65, 0.018 * softness, 'triangle')
      if (i % 3 === 0) this.tone(chord[0], this.next, 1.3, 0.035 * softness)
      this.next += this.sleeping ? 0.48 : 0.36
      this.step++
    }
  }
  noise(duration = 0.6) {
    const ctx = this.context, length = Math.ceil(ctx.sampleRate * duration)
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1
    const source = ctx.createBufferSource(), filter = ctx.createBiquadFilter(), gain = ctx.createGain()
    source.buffer = buffer; filter.type = 'lowpass'; filter.frequency.value = 1800
    const now = ctx.currentTime
    gain.gain.setValueAtTime(0, now); gain.gain.linearRampToValueAtTime(0.045, now + 0.08); gain.gain.linearRampToValueAtTime(0, now + duration)
    source.connect(filter); filter.connect(gain); gain.connect(this.master)
    source.start(); source.onended = () => { source.disconnect(); filter.disconnect(); gain.disconnect() }
  }
  play(kind = 'click') {
    if (!this.enabled || this.context?.state !== 'running') return
    const now = this.context.currentTime
    if (kind !== 'bite' && now - this.lastEffect < 0.065) return
    this.lastEffect = now
    if (kind === 'bite') {
      // Two soft little chomps followed by a happy music-box sparkle.
      this.tone(65, now, 0.09, 0.075, 'triangle', 0.65)
      this.tone(69, now + 0.11, 0.1, 0.06, 'triangle', 0.7)
      this.tone(88, now + 0.2, 0.25, 0.045)
      this.tone(96, now + 0.28, 0.3, 0.025)
      return
    }
    const phrases = {
      click: [84], pet: [79,84,88], room: [72,79,84], wash: [84,89,91,96],
      eat: [67,72,76], dress: [84,88,91,96], sleep: [79,76,72],
      reward: [72,76,79,84,88,91,96], flower: [76,79,84,88,91],
      alarm: [88,81,88,81], cook: [72,76,79], game: [79,84,86],
    }
    if (kind === 'wash' || kind === 'cook') this.noise(kind === 'wash' ? 1.2 : 0.45)
    const notes = phrases[kind] || phrases.click
    notes.forEach((note, i) => this.tone(note, now + i * 0.085, kind === 'click' ? 0.1 : 0.32, 0.065, 'sine', kind === 'wash' ? 1.3 : undefined))
  }
  async close() { this.disable(); if (this.context) await this.context.close().catch(() => {}) }
}

export function useGameAudio({ muted, sleep, room, showerRunning, vanityPhase, cookingStage, kitchenDestination, alarmPhase, readingStage, flowersReceived, game }) {
  const audioRef = useRef(null)
  useEffect(() => {
    const engine = new KittyAudio()
    audioRef.current = engine
    return () => { audioRef.current = null; engine.close() }
  }, [])
  useEffect(() => {
    const engine = audioRef.current
    const update = () => {
      if (muted || document.hidden) engine.disable()
      else engine.enable()
    }
    update()
    document.addEventListener('visibilitychange', update)
    return () => { document.removeEventListener('visibilitychange', update); engine.disable() }
  }, [muted])
  useEffect(() => { audioRef.current.sleeping = sleep; if (sleep) audioRef.current.play('sleep') }, [sleep])
  useEffect(() => { audioRef.current.play('room') }, [room])
  useEffect(() => {
    if (!showerRunning && vanityPhase !== 'wash') return
    const engine = audioRef.current
    engine.play('wash')
    const timer = setInterval(() => engine.play('wash'), 1800)
    return () => clearInterval(timer)
  }, [showerRunning, vanityPhase])
  useEffect(() => { if (kitchenDestination === 'stove') audioRef.current.play('cook') }, [cookingStage, kitchenDestination])
  useEffect(() => { if (alarmPhase === 'ringing') audioRef.current.play('alarm') }, [alarmPhase])
  useEffect(() => { if (readingStage === 'reading') audioRef.current.play('sleep') }, [readingStage])
  useEffect(() => { if (flowersReceived) audioRef.current.play('flower') }, [flowersReceived])
  useEffect(() => { if (game) audioRef.current.play('game') }, [game])
  return audioRef
}

export function interactionSound(event, audio) {
  const target = event.target.closest('button, [role="button"]')
  if (!target || target.disabled || target.closest('.header-tools')) return
  if (target.closest('.food-tray-actions')) return
  const label = `${target.getAttribute('aria-label') || ''} ${target.textContent || ''} ${target.getAttribute('class') || ''}`.toLowerCase()
  const kind = /claim|reward|earned/.test(label) ? 'reward'
    : /flower|bouquet|rence/.test(label) ? 'flower'
    : /pet |kitty-pet/.test(label) ? 'pet'
    : /wash|bath|shower|duck|soap/.test(label) ? 'wash'
    : /dress|ribbon|outfit|mirror/.test(label) ? 'dress'
    : /food|milk|cookie|cake|apple|strawberry/.test(label) ? 'eat'
    : /sleep|bed|lamp|book/.test(label) ? 'sleep'
    : /cook|stove|counter/.test(label) ? 'cook' : 'click'
  audio?.play(kind)
}
