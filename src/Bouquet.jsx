export function BouquetArt(){return <g strokeLinecap="round" strokeLinejoin="round">
  <path d="M40 72L20 25M40 72L40 15M40 72L61 27" stroke="#a6c299" strokeWidth="3"/>
  <path d="M40 57Q14 40 18 54Q25 65 40 62M40 53Q67 39 62 54Q53 64 40 61" fill="#bfd8b1" stroke="#a6c299" strokeWidth="1.2"/>
  <path d="M11 46L40 88L70 46L40 65Z" fill="#fff0d7" stroke="#d4bea2" strokeWidth="1.5"/>
  <path d="M19 49L40 80L61 49" fill="none" stroke="#f6dfc5" strokeWidth="2"/>
  {[[20,25],[40,15],[61,27],[40,39]].map(([x,y],i)=><g key={i} transform={`translate(${x} ${y})`} fill={i%2?'#dec8eb':'#f0c2d9'} stroke="#c6a8ce" strokeWidth=".8">{[0,72,144,216,288].map(a=><ellipse key={a} cx="0" cy="-7" rx="5.5" ry="8" transform={`rotate(${a})`}/>)}<circle r="4.5" fill="#f8e7b4" stroke="#ddc896"/></g>)}
  <path d="M34 73Q15 57 19 75Q23 88 37 80Q58 94 62 76Q65 59 45 73Z" fill="#e2bdd8" stroke="#bd98c3" strokeWidth="1.5"/><ellipse cx="40" cy="77" rx="7" ry="8" fill="#edcfe3" stroke="#bd98c3" strokeWidth="1.2"/>
</g>}
export function Bouquet(){return <svg viewBox="0 0 80 100" aria-hidden="true"><BouquetArt/></svg>}
