import React from 'react';
import path from 'path';
import Slide from '../Slide';

function Create()
{
  return (
    <Slide
      fromColor="#85E5A9"
      toColor="#26BB86"
      heading='Slide Heading'
      description='Slide Description'
      imgSrc={path.resolve(__dirname, './imgs/Create.svg')}
      imgSize="350px"
    />
  );
}

export default Create;
