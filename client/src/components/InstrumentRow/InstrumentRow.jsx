import React from 'react';
import styled from 'styled-components';
import { device } from '../../../public/assets/sizes';

import InstrumentPad from './InstrumentPad/InstrumentPad.jsx';

const instrumentRow = props => {
  const padCreator = Array(4).fill(0);

  return (
    <PadButtonRow>
      {padCreator.map((_, i) => {
        return <InstrumentPad
          key={i}
          col={i}
          oscillators={props.rowOscillators}
          removeOsc={() => props.removeOsc(props.rowID, i)}
          createOsc={() => props.createOsc(props.rowID, i)} />
      })}
    </PadButtonRow>
  );
};

const PadButtonRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  @media ${device.mobileS} {
    max-width: 539px;
    flex-direction: column;
    width: 25%;
    height: 100%;
  };
  @media ${device.laptop} {
    flex-direction: row;
    width: 550px;
    height: 80px;
  }
`;

export default instrumentRow;