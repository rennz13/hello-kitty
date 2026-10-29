export const GRID = 14
export const DIRECTIONS = {up:{x:0,y:-1},down:{x:0,y:1},left:{x:-1,y:0},right:{x:1,y:0}}
export function newSnakeGame() {return {body:[{x:4,y:7}],berry:{x:9,y:7},direction:'right',score:0,status:'playing',reason:''}}
export function chooseBerry(body, random = Math.random) {
  const free=[]
  for(let y=0;y<GRID;y++)for(let x=0;x<GRID;x++)if(!body.some(part=>part.x===x&&part.y===y))free.push({x,y})
  return free.length ? free[Math.min(free.length-1,Math.floor(random()*free.length))] : null
}
export function stepSnake(state, requestedDirection, random = Math.random) {
  if(state.status!=='playing')return state
  const previous=DIRECTIONS[state.direction]
  const requested=DIRECTIONS[requestedDirection] || previous
  const reverse=state.body.length>1 && previous.x+requested.x===0 && previous.y+requested.y===0
  const direction=reverse ? state.direction : requestedDirection in DIRECTIONS ? requestedDirection : state.direction
  const delta=DIRECTIONS[direction]
  const head={x:state.body[0].x+delta.x,y:state.body[0].y+delta.y}
  if(head.x<0||head.y<0||head.x>=GRID||head.y>=GRID)return {...state,status:'over',reason:'A tiny garden fence! Let us try again.'}
  const ate=head.x===state.berry.x&&head.y===state.berry.y
  const occupied=ate ? state.body : state.body.slice(0,-1)
  if(occupied.some(part=>part.x===head.x&&part.y===head.y))return {...state,status:'over',reason:'Our little Kitty train got tangled!'}
  const body=[head,...state.body]
  if(!ate)body.pop()
  const berry=ate?chooseBerry(body,random):state.berry
  return {...state,body,berry,direction,score:state.score+(ate?1:0),status:berry?'playing':'won',reason:berry?'':'A whole garden full of Kitty friends!'}
}
