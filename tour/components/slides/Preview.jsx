import React from 'react';
import path from 'path';
import Slide from '../Slide';

const description = `
`;

function Preview()
{
  return (
    <Slide
      inverted
      fromColor="#5691c8"
      toColor="#457fca"
      heading='Preview'
      description='Preview Description'
      imgSrc={path.resolve(__dirname, './imgs/Preview.svg')}
      imgSize="520px"
    />
  );
}

export default Preview;
