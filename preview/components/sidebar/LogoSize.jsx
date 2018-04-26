// Libs
import React from 'react';
import PropTypes from 'prop-types';
import { Section, Label, Range } from '../shared';

function LogoSize({ logoSize, handleInputChange })
{
  return (
    <Section>
      <Label>
        Logo&nbsp;Size
      </Label>
      <Range
        name="logoSize"
        type="range"
        min="5"
        max="50"
        step="2.5"
        value={logoSize}
        onChange={handleInputChange}
      />
    </Section>
  );
}

LogoSize.propTypes =
{
  logoSize: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired
};

export default LogoSize;
