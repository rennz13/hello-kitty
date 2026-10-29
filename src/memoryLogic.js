export const MEMORY_SYMBOLS = ['kitty','bow','strawberry','moon','flower','cupcake']
export function createMemoryGame(random = Math.random) {
  const cards=MEMORY_SYMBOLS.flatMap(symbol=>[symbol,symbol]).map((symbol,id)=>({symbol,id}))
  for(let i=cards.length-1;i>0;i--){const j=Math.min(i,Math.floor(random()*(i+1)));[cards[i],cards[j]]=[cards[j],cards[i]]}
  return {cards,flipped:[],matched:[],moves:0}
}
export function memoryReducer(state, action) {
  if(action.type==='reset')return action.state
  if(action.type==='flip'){
    const {index}=action
    if(!state.cards[index]||state.flipped.length>=2||state.flipped.includes(index)||state.matched.includes(index))return state
    return {...state,flipped:[...state.flipped,index],moves:state.moves+(state.flipped.length===1?1:0)}
  }
  if(action.type==='resolve'&&state.flipped.length===2){
    const [a,b]=state.flipped
    return {...state,flipped:[],matched:state.cards[a].symbol===state.cards[b].symbol?[...state.matched,a,b]:state.matched}
  }
  return state
}
