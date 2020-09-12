import React from 'react';
import styled from 'styled-components';

const instrumentPad = props => {
  let button = <PadButtonEmpty onClick={props.createOsc} />;
  if (props.oscillators[props.col]) {
    button = <PadButtonFilled onClick={props.addOsc} />;
  }

  return button;
};

const PadButtonEmpty = styled.button`
  width: 65px;
  height: 65px;
  border-radius: 15px;
  background: ${props => props.selected ? '#f28c26' : 'linear-gradient(145deg, #1e1e1e, #191919)'};
  box-shadow:  6px 6px 12px #131313,
  -6px -6px 12px #252525;
  cursor: pointer;
`;

const PadButtonFilled = styled.button`
  width: 65px;
  height: 65px;
  border-radius: 15px;
  background: #f28c26;
  box-shadow:  6px 6px 12px #131313,
  -6px -6px 12px #252525;
  cursor: pointer;
`;

export default instrumentPad;