import React from 'react';
import styled from 'styled-components';

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
  width: 550px;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export default instrumentRow;