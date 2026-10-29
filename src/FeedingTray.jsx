import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Food } from './Food'

const foods = ['Strawberry', 'Milk', 'Cupcake', 'Apple', 'Cookie', 'Cake', 'Ice cream']
export function FeedingTray({coins, onFeed, onPhaseChange}) {
  const [drag, setDrag] = useState(null)
  const current = useRef(null)
  const timer = useRef(null)

  useEffect(() => () => { clearTimeout(timer.current); onPhaseChange('idle') }, [onPhaseChange])

  function mouthPosition() {
    const target = document.querySelector('[data-kitty-mouth]')
    if (!target) return null
    const box = target.getBoundingClientRect()
    const pet = target.closest('svg').getBoundingClientRect()
    return {x: box.left + box.width / 2, y: box.top + box.height / 2, radius: Math.max(34, pet.width * .2)}
  }
  function nearMouth(x, y) {
    const mouth = mouthPosition()
    return mouth && Math.hypot(x - mouth.x, y - mouth.y) < mouth.radius
  }
  function update(value) { current.current = value; setDrag(value) }
  function cancel() {
    if (current.current?.swallowing) return
    const value = current.current
    if (value?.origin) {
      update({...value, x: value.origin.x, y: value.origin.y, returning: true})
      timer.current = setTimeout(() => { update(null); onPhaseChange('idle') }, 300)
    } else { update(null); onPhaseChange('idle') }
  }
  function swallow(value) {
    const mouth = mouthPosition()
    if (!mouth) { cancel(); return }
    clearTimeout(timer.current)
    onFeed(value.food, value.cost)
    onPhaseChange('eating')
    update({...value, x: mouth.x, y: mouth.y, swallowing: true})
    timer.current = setTimeout(() => {
      update(null)
      onPhaseChange('chewing')
      timer.current = setTimeout(() => onPhaseChange('idle'), 500)
    }, 220)
  }

  function begin(event, food, cost) {
    if (event.button !== 0 || coins < cost) return
    clearTimeout(timer.current)
    event.currentTarget.setPointerCapture(event.pointerId)
    const box = event.currentTarget.getBoundingClientRect()
    const lift = event.pointerType === 'touch' ? 34 : 0
    update({food, cost, x: event.clientX, y: event.clientY - lift, lift, startX: event.clientX, startY: event.clientY, origin: {x: box.left + box.width / 2, y: box.top + box.height / 2}, swallowing: false})
    onPhaseChange('ready')
  }
  function move(event) {
    const value = current.current
    if (!value || value.swallowing || value.returning) return
    update({...value, x: event.clientX, y: event.clientY - (value.lift || 0)})
    onPhaseChange(nearMouth(event.clientX, event.clientY - (value.lift || 0)) ? 'open' : 'ready')
  }
  function release(event) {
    const value = current.current
    if (!value || value.swallowing || value.returning) return
    if (nearMouth(value.x, value.y) || Math.hypot(event.clientX - value.startX, event.clientY - value.startY) < 10) swallow(value)
    else cancel()
  }
  return <div className="feeding-tray">

    <div className="actions food-tray-actions">{foods.map((food, index) => <button key={food} className={drag?.food === food ? 'food-picked' : ''} disabled={coins < 5 + index} style={{touchAction: 'none'}} onPointerDown={event => begin(event, food, 5 + index)} onPointerMove={move} onPointerUp={release} onPointerCancel={cancel} onClick={event => {
      // Enter/Space offers the same feeding animation without dragging.
      if (event.detail !== 0 || coins < 5 + index) return
      const box = event.currentTarget.getBoundingClientRect()
      const value = {food, cost: 5 + index, x: box.left + box.width / 2, y: box.top + box.height / 2}
      swallow(value)
    }} aria-label={`Feed Kitty ${food}, ${5 + index} coins`}><Food type={food}/>{food}<small>&#x2727; {5 + index}</small></button>)}</div>
    {drag && createPortal(<div className={`dragged-food ${drag.swallowing ? 'food-swallowing' : ''} ${drag.returning ? 'food-returning' : ''}`} style={{left: drag.x, top: drag.y}} aria-hidden="true"><Food type={drag.food}/>{!drag.swallowing && !drag.returning && <span className="food-drag-sparkle" aria-hidden="true">&#x2727;</span>}</div>, document.body)}
  </div>
}
