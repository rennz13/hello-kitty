import { BouquetArt } from './Bouquet'
import { useId } from 'react'

export function KittyCharacter({bow, dress = bow, sleeping, happy, name, seated = false, facingBack = false, annoyed = false, emotion = '', interactive = false, feedingPhase = 'idle', bathing = false, reading = false, fitting = false, boy = false, holdingFlowers = false, kneeling = false, gaze = 'center'}) {
  const id = useId().replaceAll(':', '')
  const sensitiveTouch = emotion === 'ear' || emotion === 'tail' || emotion === 'alarm'
  if (facingBack) return <svg className={`kitty-illustration kitty-back-view ${fitting ? 'kitty-fitting' : ''}`} viewBox="0 0 300 330" role="img" aria-label={`${name || 'Kitty'} ${fitting ? 'checking the fit of her dress in the mirror' : 'facing the TV'}`}>
    <g stroke="#8a768a" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="117" cy="301" rx="27" ry="14" fill="#fffefa"/>
      <ellipse cx="183" cy="301" rx="27" ry="14" fill="#fffefa"/>
      <g className="kitty-back-arms" fill="#fffefa"><path className="kitty-fit-paw-left" d="M113 219Q91 221 80 241Q72 258 87 260L107 246"/><path className="kitty-fit-paw-right" d="M187 219Q209 221 220 241Q228 258 213 260L193 246"/></g>
      <g className="kitty-fit-skirt"><path d="M112 213Q150 204 188 213L202 289Q150 307 98 289Z" fill={dress}/>
      <path d="M150 220V287" stroke="#fff7fc" opacity=".6"/>
      <path d="M105 284Q150 299 196 284" stroke="#fff9fd" strokeWidth="4"/>
      <ellipse cx="150" cy="273" rx="12" ry="13" fill="#fffefa"/>
      <path d="M137 248Q113 231 117 251Q124 263 139 255Q161 269 169 252Q173 233 148 248Z" fill="#fff1f9" stroke="#c2a3bb"/>
      <ellipse cx="143" cy="252" rx="7" ry="8" fill="#fff9fc" stroke="#c2a3bb"/></g>
      <g className={`kitty-head ${annoyed ? 'kitty-looking-back' : ''}`} key={annoyed ? 'looking-back' : 'watching'}>
        <path d="M57 105L58 59Q58 51 67 53Q91 58 109 80Q149 69 190 80Q208 57 232 53Q241 51 241 61L242 106Q260 125 259 151Q259 183 229 200Q200 217 151 217Q103 217 73 202Q42 185 41 155Q39 126 57 105Z" fill="#fffefa" stroke="#746975" strokeWidth="3"/>
        <path d="M46 141L23 134M43 158H19M48 175L26 184M257 141L280 134M259 158H283M253 175L276 184" stroke="#746975"/>
        {annoyed && <g className="kitty-annoyed-face">
          <ellipse cx="102" cy="154" rx="5.5" ry="6" fill="#514653" stroke="none"/>
          <ellipse cx="199" cy="154" rx="5.5" ry="6" fill="#514653" stroke="none"/>
          <path d="M92 140L111 146M190 146L209 140" stroke="#756279" strokeWidth="3.5"/>
          <ellipse cx={gaze==='right'?153:gaze==='left'?147:150} cy="170" rx="8" ry="5.7" fill="#f4dc92" stroke="#b6a16d" strokeWidth="1.7"/>
          <path d="M228 106V113M234 112H228M240 106V113M234 119V113" fill="none" stroke="#b59ac6" strokeWidth="2.5"/>
        </g>}
        <g transform={annoyed ? undefined : 'translate(300 0) scale(-1 1)'}>
          <path d="M211 76Q184 52 180 69Q173 90 188 96Q201 100 211 86Q224 102 239 96Q254 90 248 70Q245 52 222 76Z" fill={bow} stroke="#ad8ba5"/>
          <ellipse cx="216" cy="82" rx="11" ry="12" fill={bow} stroke="#ad8ba5"/>
        </g>
      </g>
    </g>
  </svg>
  return <svg className={`kitty-illustration ${boy ? 'kitty-boy-character' : ''} touch-${emotion || 'idle'} ${fitting ? 'kitty-fitting' : ''} ${happy && !sleeping && !sensitiveTouch ? 'kitty-reacting' : ''}`} viewBox="0 0 300 330" role="img" aria-label={`${name || 'Hello Kitty'} with a pastel bow${sleeping ? ', sleeping peacefully' : ''}`}>
    <defs>
      <radialGradient id={`${id}-fur`} cx="38%" cy="25%" r="80%"><stop stopColor="#ffffff"/><stop offset=".8" stopColor="#fffefa"/><stop offset="1" stopColor="#f8f3f7"/></radialGradient>
      <linearGradient id={`${id}-dress`} x1="0" y1="0" x2=".8" y2="1"><stop stopColor="#ffffff"/><stop offset=".18" stopColor={dress}/><stop offset="1" stopColor={dress}/></linearGradient>
      <linearGradient id={`${id}-ribbon`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff2fb"/><stop offset=".45" stopColor={bow}/><stop offset="1" stopColor={bow}/></linearGradient>
      <radialGradient id={`${id}-blush`}><stop stopColor="#f1bedb" stopOpacity=".25"/><stop offset="1" stopColor="#f9deee" stopOpacity="0"/></radialGradient>
    </defs>
    <g stroke="#8a768a" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      {interactive && <path className="kitty-playful-tail" d="M194 280Q219 298 228 281Q235 267 222 266Q213 267 211 279" fill={`url(#${id}-fur)`}/>}
      {kneeling ? <g className="kitty-kneeling-body">
        <path d="M165 248L208 273Q219 288 202 292L158 275" fill="#c4d9e9"/>
        <path d="M113 251V286Q106 299 126 302H144V261" fill="#c4d9e9"/>
        <ellipse cx="124" cy="301" rx="23" ry="12" fill="#fffefa"/>
        <path d="M112 211Q150 201 188 211L198 263Q150 280 102 263Z" fill={dress}/>
        <path d="M127 213L150 231L174 213" fill="#fffaf0"/>
        <path className="story-offering-paw" d="M111 222Q84 218 77 236Q74 246 86 248L119 237" fill="#fffefa"/><path d="M188 222Q211 223 211 240Q210 251 194 245L178 236" fill="#fffefa"/>
      </g> : seated ? <g className="kitty-body kitty-sitting-body">
        {/* Connected shoulders, rounded lap, and paws resting independently. */}
        <ellipse cx="150" cy="287" rx="57" ry="7" fill="#bca0bc" opacity=".12" stroke="none"/>
        <path d="M111 211Q150 203 189 211L199 254Q199 274 150 278Q101 274 101 254Z" fill={`url(#${id}-dress)`}/>
        <path d="M126 214Q137 225 150 231Q163 225 174 214" fill="#fffdf7" stroke="#c9a9c5" strokeWidth="1.8"/>
        {boy && <><path d="M127 224V254M173 224V254" stroke="#a9c3d8" strokeWidth="4"/><rect x="135" y="239" width="30" height="20" rx="5" fill="#d9e6f1" stroke="#adc4d7" strokeWidth="1.5"/></>}
        <path d="M111 220Q91 222 93 239Q94 251 105 252Q117 252 120 240" fill={`url(#${id}-fur)`}/>
        <path d="M189 220Q209 222 207 239Q206 251 195 252Q183 252 180 240" fill={`url(#${id}-fur)`}/>
        <path d="M121 255Q150 268 179 255" fill="none" stroke="#fff8fd" strokeWidth="3"/>
        <path d="M133 250Q150 254 167 250" fill="none" stroke="#c9a9c5" strokeWidth="1.2" opacity=".5"/>
        <circle cx="150" cy="240" r="3" fill="#fff7e3" stroke="#d8bdd0" strokeWidth="1"/>
        <ellipse cx="119" cy="275" rx="23" ry="17" fill={`url(#${id}-fur)`} transform="rotate(-15 119 275)"/>
        <ellipse cx="181" cy="275" rx="23" ry="17" fill={`url(#${id}-fur)`} transform="rotate(15 181 275)"/>
        <path d="M107 279L109 284M115 281L116 286M185 281L184 286M193 279L191 284" stroke="#e6dbe4" strokeWidth="1.4"/>
      </g> : <>      <g className="kitty-body">
        <ellipse cx="117" cy="301" rx="28" ry="15" fill={`url(#${id}-fur)`}/>
        <ellipse cx="182" cy="301" rx="28" ry="15" fill={`url(#${id}-fur)`}/>
        <path className="kitty-paw-left" d="M112 218Q91 218 79 237Q69 251 80 260Q91 267 106 247" fill={`url(#${id}-fur)`}/>
        <path className="kitty-paw-right" d="M189 218Q210 219 221 239Q231 256 218 261Q206 267 195 248" fill={`url(#${id}-fur)`}/>
        <path d="M112 216Q150 202 188 216L204 290Q150 311 96 290Z" fill={`url(#${id}-dress)`}/>
        <path d="M125 215L150 235L174 215" fill="#fffdf7" stroke="#c9a9c5" strokeWidth="2"/>
        <path d="M114 248Q107 270 109 283M187 248Q194 270 191 283" stroke="#fff8fc" opacity=".55"/>
        <path d="M101 284Q150 300 199 284" stroke="#fff9fd" strokeWidth="4"/>
        <circle cx="150" cy="246" r="3" fill="#fff9ed" stroke="#d8bdd0" strokeWidth="1"/>
        <g transform="translate(136 260)" stroke="#d0b5ca" strokeWidth="1.2"><path d="M13 7Q-4-6 0 10Q2 22 14 14Q32 24 29 9Q27-4 16 7" fill="#fff2fa"/><ellipse cx="15" cy="11" rx="5" ry="6" fill="#fffdf7"/></g>
      </g></>}

      <g className="kitty-head">
        {/* Wide oval face, short rounded ears, and the classic simple features. */}
        <path d="M57 105L58 59Q58 51 67 53Q91 58 109 80Q149 69 190 80Q208 57 232 53Q241 51 241 61L242 106Q260 125 259 151Q259 183 229 200Q200 217 151 217Q103 217 73 202Q42 185 41 155Q39 126 57 105Z" fill={`url(#${id}-fur)`} stroke="#746975" strokeWidth="3"/>
        {boy && <path d="M134 77Q125 61 139 61Q149 63 148 75Q157 58 166 65L162 77" fill="#fffefa" stroke="#746975" strokeWidth="2.3"/>}
        <path d="M68 80L68 65Q82 69 94 82M205 82Q218 68 231 65L231 84" fill="#fceff5" stroke="none"/>
        <path d="M45 135L18 127M42 154L13 154M48 173L22 183M257 135L282 127M259 154L287 154M253 173L279 183" stroke="#746975" strokeWidth="3"/>
        <ellipse className="kitty-cheek" cx="83" cy="173" rx="17" ry="9" fill={`url(#${id}-blush)`} stroke="none"/>
        <ellipse className="kitty-cheek" cx="218" cy="173" rx="17" ry="9" fill={`url(#${id}-blush)`} stroke="none"/>
        {bathing || feedingPhase === 'chewing' || feedingPhase === 'savoring' ? <g fill="none" stroke="#756279" strokeWidth="3"><path d="M94 153Q102 143 110 153M191 153Q199 143 207 153"/></g> : sensitiveTouch ? <g className="kitty-sensitive-face">
          <ellipse cx="102" cy="154" rx="5.5" ry="6" fill="#514653" stroke="none"/>
          <ellipse cx="199" cy="154" rx="5.5" ry="6" fill="#514653" stroke="none"/>
          <path d="M91 140L112 147M189 147L210 140" fill="none" stroke="#756279" strokeWidth="3.5"/>
          <path d="M247 98V105M254 105H247M261 98V105M254 113V105" fill="none" stroke="#b59ac6" strokeWidth="2.5"/>
        </g> : emotion === 'head' ? <g fill="#d7a3c5" stroke="none">
          <path d="M102 149Q89 136 88 148Q87 155 102 165Q117 155 116 148Q115 136 102 149Z"/>
          <path d="M199 149Q186 136 185 148Q184 155 199 165Q214 155 213 148Q212 136 199 149Z"/>
        </g> : emotion === 'tummy' ? <g fill="none" stroke="#756279" strokeWidth="3"><path d="M94 155Q102 141 110 155M191 155Q199 141 207 155"/></g> : emotion === 'ear' ? <g fill="#514653" stroke="none"><ellipse cx="102" cy="151" rx="6" ry="10"/><ellipse cx="199" cy="151" rx="6" ry="10"/><text x="248" y="82" fill="#b59ac6" fontSize="28" fontFamily="sans-serif">?</text></g> : sleeping ? <g fill="none" stroke="#514b53" strokeWidth="3"><path d="M94 153Q102 162 110 153M191 153Q199 162 207 153"/></g> : <>
          <g className="kitty-open-eyes" transform={gaze==='right'?'translate(4 0)':gaze==='left'?'translate(-4 0)':undefined}><g className="kitty-blink" fill="#403b43" stroke="none"><ellipse cx="102" cy="153" rx="5.5" ry="7.5"/><ellipse cx="199" cy="153" rx="5.5" ry="7.5"/></g></g>
          {happy && <g className="kitty-happy-eyes" fill="none" stroke="#514b53" strokeWidth="3"><path d="M94 155Q102 144 110 155M191 155Q199 144 207 155"/></g>}
        </>}
        <ellipse cx="150" cy="170" rx="8" ry="5.7" fill="#f4dc92" stroke="#b6a16d" strokeWidth="1.7"/>
        {feedingPhase === 'open' && <g className="feeding-ready-sparkles" fill="#d8bfdf" stroke="none"><path d="m78 182 2 5 5 1-5 2-2 5-2-5-5-2 5-1Z"/><path d="m222 182 2 5 5 1-5 2-2 5-2-5-5-2 5-1Z"/></g>}
        <circle data-kitty-mouth="true" cx="150" cy="190" r="1" fill="none" stroke="none"/>
        {(feedingPhase === 'open' || feedingPhase === 'eating') && <g className="kitty-eating-mouth">
          <path d="M140 184Q150 181 160 184Q160 199 150 200Q140 199 140 184Z" fill="#8c718f" stroke="#aa8fac" strokeWidth="1.5"/>
          <path d="M144 195Q150 190 156 195Q154 199 150 199Q146 199 144 195Z" fill="#e9bdd6" stroke="none"/>
          <path d="M143 184Q150 182 157 184" fill="none" stroke="#fff0f7" strokeWidth="1" opacity=".65"/>
        </g>}
        {feedingPhase === 'chewing' && <g className="kitty-chewing-mouth" fill="none" stroke="#b098b6" strokeWidth="2"><path d="M143 189Q150 196 157 189"/><path d="M78 166Q73 174 79 180M222 166Q227 174 221 180" stroke="#e6c7db"/></g>}
        <g className="kitty-bow">
          <path d="M211 76Q184 52 180 69Q173 90 188 96Q201 100 211 86Q224 102 239 96Q254 90 248 70Q245 52 222 76Z" fill={`url(#${id}-ribbon)`} stroke="#ad8ba5" strokeWidth="2.6"/>
          <path d="M187 71Q193 73 205 80M188 89L204 84M225 80L241 71M226 85L240 90" fill="none" stroke="#fff5fb" strokeWidth="2" opacity=".6"/>
          <ellipse cx="216" cy="82" rx="11" ry="12" fill={bow} stroke="#ad8ba5" strokeWidth="2.4"/>
        </g>
      </g>
    </g>
    {feedingPhase === 'chewing' && <g className="feeding-bite-sparkles" fill="#dfc8a8" stroke="none"><circle cx="128" cy="190" r="2"/><circle cx="174" cy="193" r="2.5"/><circle cx="135" cy="205" r="1.5"/></g>}
    {feedingPhase === 'savoring' && <g className="feeding-yummy" fill="#bb94bd" fontFamily="Georgia, serif" textAnchor="middle"><text x="150" y="29" fontSize="18">Yummy!</text><path d="m243 114 3 6 6 1-5 4 1 7-5-3-6 3 1-7-4-4 6-1Z" fill="#e5cfa4"/></g>}
    {holdingFlowers && <g className="kitty-held-flowers" transform="translate(117 222) scale(.82)"><BouquetArt/></g>}
    {reading && <g className="kitty-reading-book" stroke="#baa0c9" strokeWidth="1.8" strokeLinejoin="round">
      <path d="M106 241Q126 230 150 241Q174 230 194 241L190 275Q169 266 150 279Q129 266 110 275Z" fill="#d8c3e8"/>
      <path d="M111 238Q129 232 150 243Q172 232 189 238L186 268Q169 263 150 275Q131 263 114 268Z" fill="#fff6df" stroke="#d4c5a7"/>
      <path className="reading-page" d="M150 243Q171 234 189 238L186 268Q167 263 150 275Z" fill="#fff9ec" stroke="#e4d5ba"/>
      <path d="M119 246L141 251M119 252L141 257M159 251L181 246M159 257L181 252" stroke="#dbccb4" strokeWidth="1.5"/>
      <path d="M150 244V275" stroke="#c7b69b"/>
      <ellipse cx="107" cy="254" rx="8" ry="11" fill="#fffefa" stroke="#8a768a"/>
      <ellipse cx="193" cy="254" rx="8" ry="11" fill="#fffefa" stroke="#8a768a"/>
    </g>}
    {interactive && <g className="kitty-touch-zones" fill="transparent" stroke="none" aria-hidden="true">
      <ellipse data-pet-part="head" cx="150" cy="149" rx="108" ry="68"><title>Pat Kitty's head</title></ellipse>
      <ellipse data-pet-part="hand" cx="88" cy="239" rx="24" ry="27"><title>Hold her paw</title></ellipse>
      <ellipse data-pet-part="hand" cx="214" cy="239" rx="24" ry="27"><title>Hold her paw</title></ellipse>
      <ellipse data-pet-part="tummy" cx="150" cy="263" rx="47" ry="36"><title>Tickle her tummy</title></ellipse>
      <ellipse data-pet-part="tail" cx="222" cy="281" rx="20" ry="18"><title>Touch her fluffy tail</title></ellipse>
      <path data-pet-part="ear" d="M52 53H112V101H52ZM189 53H245V101H189Z"><title>Touch her ears</title></path>
    </g>}
    {happy && !sleeping && !sensitiveTouch && <g className="kitty-love-particles" fill="#ddb7d5" stroke="#fff8fc" strokeWidth="1"><path className="kitty-heart heart-a" d="M43 99Q28 84 27 96Q26 104 43 116Q60 104 59 96Q58 84 43 99Z"/><path className="kitty-heart heart-b" d="M257 113Q244 100 243 111Q242 118 257 129Q272 118 271 111Q270 100 257 113Z"/><path className="kitty-heart heart-c" d="m153 23 3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1Z" fill="#e6d7ad"/></g>}
  </svg>
}
