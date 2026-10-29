import { useId } from 'react'

export function ReadingNook({active, onToggle, stage = 'idle'}) {
  const lightId = useId().replaceAll(':', '')
  return <g className={`reading-nook ${active ? 'lamp-lit' : ''}`} data-reading-stage={active ? stage : 'idle'}>
    <defs><radialGradient id={lightId}><stop stopColor="#fff0b9" stopOpacity=".6"/><stop offset="1" stopColor="#fff0b9" stopOpacity="0"/></radialGradient></defs>
    <ellipse className="reading-lamp-glow" cx="130" cy="217" rx="135" ry="110" fill={`url(#${lightId})`} stroke="none"/>
    <path d="M31 242H151M46 242V281M134 242V281" stroke="#c7acc4" strokeWidth="5"/>
    <path d="M38 246H144" stroke="#eee0ec" strokeWidth="2"/>
    <circle data-reading-seat="true" cx="207" cy="276" r="1" fill="none" stroke="none"/>
    <g className={`reading-chair ${active && stage === 'reading' ? 'reading-chair-active' : ''} ${active && stage === 'settling' ? 'reading-chair-settling' : ''}`} transform="translate(172 210)"><g className="reading-chair-rocker">
      <ellipse cx="34" cy="80" rx="45" ry="5" fill="#bca4c5" opacity=".15" stroke="none"/>
      <path d="M10 59L7 74M59 59L62 74M-7 72Q35 88 78 72" stroke="#bba4bf" strokeWidth="4"/>
      <rect x="4" y="0" width="61" height="58" rx="19" fill="#d9c4e4" stroke="#baa2c8"/>
      <rect x="12" y="8" width="45" height="33" rx="12" fill="#ecdef3" stroke="#d1b9df"/>
      <path d="M20 13Q33 8 49 13" stroke="#fff3fc" strokeWidth="2"/>
      <path d="M19 34H50" stroke="#d4bde0" strokeDasharray="1 3" strokeWidth="1"/>
      <path d="M34 21Q27 14 26 21Q25 26 34 31Q43 26 42 21Q41 14 34 21Z" fill="#d7bedf" stroke="none"/>
      <rect x="7" y="39" width="57" height="24" rx="10" fill="#e5d3ee"/>
      <path d="M14 44H57" stroke="#f7edfd" strokeWidth="2"/>
      <rect x="-4" y="29" width="16" height="31" rx="7" fill="#d0b7dd"/>
      <rect x="57" y="29" width="16" height="31" rx="7" fill="#d0b7dd"/>
    </g></g>
    <g className="reading-lamp-toggle" role="button" tabIndex={0} aria-pressed={active} aria-label={active ? 'Turn off reading lamp and put book away' : 'Turn on lamp and read in the rocking chair'} onClick={onToggle} onKeyDown={event => {
      if(event.key === 'Enter' || event.key === ' ') {event.preventDefault(); onToggle?.()}
    }}>
      <title>{active ? 'Tap to finish reading' : 'Tap the lamp for a cozy story'}</title>
      <path d="M83 242V194" stroke="#c0a9b9" strokeWidth="5"/>
      <ellipse cx="83" cy="239" rx="17" ry="3" fill="#e3d2dc" stroke="#c5acbd"/>
      <path d="M48 195L61 155H104L118 195Z" fill={active ? '#fff0bc' : '#ede0c5'} stroke="#d5c3aa" strokeWidth="2.5"/>
      <path d="M65 158L58 190M78 158L76 190M92 158L99 190" stroke="#fff5d9" strokeWidth="1.5" opacity=".65"/>
      <path d="M56 190H109" stroke={active ? '#fff9df' : '#f9f0dc'} strokeWidth="3"/>
      <path d="M81 155V145"/><circle cx="82" cy="148" r="4" fill="#e5cba2"/>
      <rect className="reading-lamp-focus" x="44" y="140" width="78" height="105" rx="12" fill="transparent" stroke="none"/>
    </g>
    <g transform="translate(111 230)"><g className={`table-story-book ${active && stage === 'pickup' ? 'book-taking-flight' : ''} ${active && stage === 'reading' ? 'book-in-paws' : ''}`}>
      <rect width="30" height="11" rx="2" fill="#d3bce5" stroke="#b59bc5"/>
      <path d="M4 4H29V9H4" fill="#fff5df" stroke="#dfd0b2" strokeWidth="1"/>
      <path d="M4 0V11" stroke="#b59bc5"/>
      <path d="M16 3V10L19 8L22 10V3" fill="#e9c6da" stroke="none"/>
    </g></g>
  </g>
}
