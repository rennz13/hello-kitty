import { useId } from 'react'

export function Television({playing, onToggle}) {
  const screenId = useId().replaceAll(':', '')
  return <g className={playing ? 'television tv-playing home-scene-control' : 'television home-scene-control'} role="button" tabIndex={0} aria-pressed={playing} aria-label={playing ? 'Stop watching TV' : 'Watch TV'} onClick={onToggle} onKeyDown={event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onToggle?.() }
  }}>
    <title>{playing ? 'Tap to stop watching TV' : 'Tap to watch TV'}</title>
    <path d="M79 154V164M62 166H98" stroke="#b7a0b9" strokeWidth="5"/>
    <rect x="15" y="66" width="139" height="88" rx="13" fill="#d9c7e7" stroke="#bca5cc" strokeWidth="3"/>
    <defs><clipPath id={screenId}><rect x="24" y="75" width="120" height="66" rx="8"/></clipPath></defs>
    <g clipPath={`url(#${screenId})`}>
      <rect x="24" y="75" width="120" height="66" fill={playing ? '#e5f0f6' : '#302d39'} stroke="none"/>
      {playing ? <g className="tv-show" stroke="none">
        <circle cx="119" cy="89" r="8" fill="#fff0c9"/>
        <g className="tv-cloud"><path d="M31 93Q31 86 38 88Q43 79 49 89Q58 85 60 94Z" fill="#fffdf9"/><path d="M89 102Q90 95 96 97Q100 90 105 97Q112 95 114 102Z" fill="#fffdf9"/></g>
        <path d="M24 123Q42 102 66 122Q98 100 144 123V143H24Z" fill="#c7dfce"/>
        <path d="M24 134Q58 115 85 135Q119 118 144 133V143H24Z" fill="#d5d0e8"/>
        <g className="tv-bunny" fill="#fffaf4" stroke="#bba8c2" strokeWidth="1">
          <ellipse cx="74" cy="125" rx="8" ry="9" fill="#ebcde1"/>
          <ellipse cx="69" cy="106" rx="3" ry="9" transform="rotate(-12 69 106)"/>
          <ellipse cx="78" cy="106" rx="3" ry="9" transform="rotate(12 78 106)"/>
          <ellipse cx="74" cy="115" rx="10" ry="8"/>
          <circle cx="71" cy="114" r="1" fill="#756579" stroke="none"/><circle cx="78" cy="114" r="1" fill="#756579" stroke="none"/>
          <path d="M72 118Q74 120 76 118" fill="none"/>
          <ellipse cx="69" cy="133" rx="4" ry="2"/><ellipse cx="80" cy="133" rx="4" ry="2"/>
        </g>
        <g fill="#fff4ca"><path className="tv-star" d="m111 116 2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1Z"/><circle cx="44" cy="128" r="2"/></g>
        <rect x="29" y="79" width="25" height="7" rx="3" fill="#fffaf4" opacity=".85"/>
        <text x="41" y="84" textAnchor="middle" fill="#9e85af" fontSize="4" fontFamily="sans-serif" letterSpacing=".7">BUNNY TV</text>
      </g> : <path d="M30 81H102L30 119Z" fill="#ffffff" opacity=".035" stroke="none"/>}
    </g>
    <rect x="24" y="75" width="120" height="66" rx="8" fill="none" stroke="#fffafc" strokeWidth="3"/>
    <circle cx="84" cy="148" r="2" fill={playing ? '#c6e2c7' : '#91829c'} stroke="none"/>
    <rect className="home-object-focus" x="13" y="64" width="143" height="104" rx="14" fill="transparent" stroke="none"/>
  </g>
}
