import React from 'react'

const RightArrow = ({ nextSlide, coolButtons }) => (
    <div className={coolButtons ? 'right-arrow cool-buttons' : 'right-arrow'} onClick={nextSlide}>
      <img src="../static/images/slider/slider-right-arrow.svg"/>
    </div>
  )

export default RightArrow
