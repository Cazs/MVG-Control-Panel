// Libs
import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../app/components/shared/Button';
import styled from 'styled-components';

const StickySection = styled.div`
  display: flex;
  position: sticky;
  bottom: 0;
  left: 0;
  z-index: 2;
  margin: -20px;
  padding-top: 10px;
`;

const ButtonsGroup = styled.div`
  width: 100%;
  align-self: flex-end;
  padding: 20px;
  background: #f9fafa;
  border-top: 1px solid #e0e1e1;
  > * {
    margin-bottom: 10px;
    &:last-child {
    margin-bottom: 0;
    }
 }
`;

function Actions({ saveConfigs, savePDF })
{
  return (
    <StickySection>
      <ButtonsGroup>
        <Button block primary onClick={savePDF}>
          Save PDF
        </Button>
        <Button block secondary onClick={saveConfigs}>
          Save Configs
        </Button>
      </ButtonsGroup>
    </StickySection>
  );
}

Actions.propTypes =
{
  saveConfigs: PropTypes.func.isRequired,
  savePDF: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default Actions;
