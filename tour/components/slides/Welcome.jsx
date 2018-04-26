import React from 'react';
import path from 'path';
import Slide from '../Slide';

function Welcome()
{
  return (
    <Slide
      inverted
      fromColor="#CAD2E8"
      toColor="#6979A4"
      heading='Welcome'
      description='Insert Description Here'
      imgSrc={path.resolve(__dirname, './imgs/Welcome.svg')}
      imgSize="475px"
    />
  );
}

export default Welcome;
