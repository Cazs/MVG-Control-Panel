import React from 'react'
import Dot from './dot'

const Dots = ({ index, images, dotClick, visible }) =>
{
  if(!visible) return null

  const dotsGroup = images.map((image, i) =>
  {
    const active = (i === index)
    return (
      <Dot
        key={i}
        id={i}
        active={active}
        dotClick={dotClick}
      />
    )
  })

  return (
    <div className="dots-container">
      { dotsGroup }
    </div>
  )
}

export default Dots
