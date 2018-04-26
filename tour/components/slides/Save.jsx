import React from 'react';
import path from 'path';
import Slide from '../Slide';

function Save()
{
  return (
    <Slide
      fromColor="#FFD200"
      toColor="#F7971E"
      heading='Save'
      description='Description'
      imgSrc={path.resolve(__dirname, './imgs/Save.svg')}
      imgSize="460px"
    />
  );
}

export default Save;
