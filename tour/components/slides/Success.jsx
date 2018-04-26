import React from 'react';
import path from 'path';
import Slide from '../Slide';

function Success()
{
  return (
    <Slide
      fromColor="#FFFFFF"
      toColor="#ECE9E6"
      heading='Slides Success'
      description='Slides Description'
      imgSrc={path.resolve(__dirname, './imgs/Success.svg')}
      imgSize="425px"
    />
  );
}

export default Success;
