export function AlarmClock({phase = 'idle', onRing}) {
  return <g transform="translate(-3 195)" stroke="#b9a2c5" strokeWidth="1.6">
    <g className={`alarm-clock alarm-${phase}`} role="button" tabIndex={0} aria-label="Ring the alarm clock" aria-disabled={phase !== 'idle'} onClick={() => {if(phase === 'idle') onRing?.()}} onKeyDown={event => {
      if(event.key === 'Enter' || event.key === ' ') {event.preventDefault(); if(phase === 'idle') onRing?.()}
    }}>
      <title>Tap to ring the alarm clock</title>
      <path d="M-11 15L-15 23M11 15L15 23" strokeWidth="2.5"/>
      <path d="M-14-11L-20-16M14-11L20-16"/>
      <ellipse cx="-15" cy="-14" rx="8" ry="5" fill="#e2c8e7" transform="rotate(-25 -15 -14)"/>
      <ellipse cx="15" cy="-14" rx="8" ry="5" fill="#e2c8e7" transform="rotate(25 15 -14)"/>
      <circle r="18" fill="#dbc7e8"/><circle r="14" fill="#fff8e8" stroke="#d2bddb"/>
      <path d="M0-9V0L7 4" stroke="#ac91ba" strokeWidth="1.8"/>
      <path d="M0-12V-10M0 10V12M-12 0H-10M10 0H12" stroke="#ccb893" strokeWidth="1.5"/>
      <circle r="1.7" fill="#c5a9d5" stroke="none"/>
      {phase === 'ringing' && <g className="alarm-ring-lines" fill="none" stroke="#c4a7ce"><path d="M-27-13Q-34-4-27 5M27-13Q34-4 27 5M-33-17Q-42-4-33 9M33-17Q42-4 33 9"/></g>}
      <rect className="alarm-focus-ring" x="-25" y="-23" width="50" height="48" rx="12" fill="transparent" stroke="none"/>
    </g>
  </g>
}
