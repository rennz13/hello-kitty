import { useId } from 'react'

export function CozyBed({sleeping, onToggle, foreground = false}) {
  const quiltId = useId().replaceAll(':', '')
  return <g className="cozy-bed-toggle" role="button" tabIndex={0} aria-pressed={sleeping} aria-label={sleeping ? 'Wake Kitty up' : 'Put Kitty to sleep in bed'} onClick={onToggle} onKeyDown={event => {
    if (event.key === 'Enter' || event.key === ' ') {event.preventDefault(); onToggle?.()}
  }}>
    <title>{sleeping ? 'Tap to wake Kitty' : 'Tap for a cozy little nap'}</title>
    <defs><linearGradient id={quiltId} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#f2e5f6"/><stop offset="1" stopColor="#d7c1e6"/></linearGradient></defs>
    {!foreground && <>
      <ellipse cx="122" cy="282" rx="107" ry="8" fill="#aa8fbb" opacity=".15" stroke="none"/>
      <path d="M24 269V181Q24 161 43 161H207Q222 161 222 181V269Z" fill="#cfb9df" stroke="#b69bc7" strokeWidth="2.5"/>
      <path d="M34 181Q34 169 46 169H202Q213 169 213 181" fill="none" stroke="#f4e9fa" strokeWidth="2"/>
      <path d="M56 170L80 184L104 170M145 170L169 184L193 170" fill="none" stroke="#c1a6d0" strokeWidth="1" opacity=".6"/>
      <circle cx="80" cy="180" r="2.5" fill="#e9d8f2" stroke="#bda0cc" strokeWidth="1"/>
      <circle cx="169" cy="180" r="2.5" fill="#e9d8f2" stroke="#bda0cc" strokeWidth="1"/>
      <path d="M33 267V281M211 267V281" stroke="#af95bf" strokeWidth="6"/>
      <rect x="29" y="201" width="189" height="61" rx="12" fill="#fff8fc" stroke="#d3bddc"/>
      <g fill="#fffbf5" stroke="#c7afd2" strokeWidth="1.8"><rect x="41" y="181" width="68" height="32" rx="13"/><rect x="140" y="181" width="68" height="32" rx="13"/></g>
      <path d="M47 187Q75 179 102 187M147 187Q173 179 201 187" stroke="#eee3f2" strokeWidth="1.5"/>
      <path d="M49 206H100M149 206H200" stroke="#e4d1e8" strokeDasharray="1 3" strokeWidth="1"/>
      <path d="M72 194Q65 188 64 194Q63 198 72 203Q81 198 80 194Q79 188 72 194Z" fill="#ecdae7" stroke="none"/>
      <path d="m175 191 2 4 5 1-4 3 1 5-4-2-4 2 1-5-4-3 5-1Z" fill="#eddfba" stroke="none"/>
      <circle data-bed-corner="true" cx="166" cy="239" r="1" fill="none" stroke="none"/>
      <circle data-bed-seat="true" cx="122" cy="237" r="1" fill="none" stroke="none"/>
    </>}
    <path d="M28 218Q124 211 219 218V251Q219 266 204 266H44Q28 266 28 251Z" fill={`url(#${quiltId})`} stroke="#bca2ce" strokeWidth="2"/>
    <path d="M29 220Q124 212 218 220V229Q124 221 29 229Z" fill="#fff9fd" stroke="#dac9e5" strokeWidth="1"/>
    <path d="M35 231V250Q35 259 44 259M211 231V250" fill="none" stroke="#f8effc" strokeWidth="2"/>
    <path d="M43 238H205M43 253H205" stroke="#e5d5ed" strokeWidth="1.5"/>
    <path d="M63 230V260M104 228V261M145 228V261M186 230V260" stroke="#eee2f4" strokeWidth="1"/>
    {[68,124,180].map((x,i)=><path key={x} d={`m${x} ${238+i%2*5} 3 6 7 1-5 4 1 7-6-3-6 3 1-7-5-4 7-1Z`} fill="#fff1c9" stroke="#e1cfa3" strokeWidth=".6"/>)}
    <path d="M36 260H211" stroke="#f9f0ff" strokeDasharray="2 3" strokeWidth="1.5"/>
    <rect className="bed-focus-ring" x="21" y={foreground ? 215 : 158} width="204" height={foreground ? 57 : 125} rx="15" fill="transparent" stroke="none"/>
  </g>
}
