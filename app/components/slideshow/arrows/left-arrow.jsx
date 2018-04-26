import React from 'react'

const LeftArrow = ({ prevSlide, coolButtons }) => (
    <div className={coolButtons ? 'left-arrow cool-buttons' : 'left-arrow'} onClick={prevSlide}>
      <img src="../static/images/slider/slider-left-arrow.svg" alt='left arrow' />
    </div>
  )

export default LeftArrow
