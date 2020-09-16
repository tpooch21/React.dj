import React from 'react';
import styled from 'styled-components';
import { device } from '../../../../public/assets/sizes';

const instrumentPad = props => {
  const currentPad = props.oscillators[props.col];

  let button = <PadButtonEmpty onClick={props.createOsc} />;

  // If currentPad has an oscillator (it's been selected), fill it
  if (currentPad && currentPad[0]) {
    button = <PadButtonFilled onClick={props.removeOsc} />;
  }

  return button;
};

const PadButtonEmpty = styled.button`
  border-radius: 15px;
  background: ${props => props.selected ? '#f28c26' : 'linear-gradient(145deg, #1e1e1e, #191919)'};
  box-shadow:  6px 6px 12px #131313,
  -6px -6px 12px #252525;
  border-color: #ccc;
  cursor: pointer;
  box-sizing: border-box;
  @media ${device.mobileS} {
    max-width: 1023px;
    height: 15%;
    width: 75%;
  };
  @media ${device.laptop} {
    width: 65px;
    height: 65px;
  }
  `;


const PadButtonFilled = styled.button`
  border-radius: 15px;
  background: #f28c26;
  box-shadow:  6px 6px 12px #131313,
  -6px -6px 12px #252525;
  border-color: #ccc;
  cursor: pointer;
  @media ${device.mobileS} {
    max-width: 1023px;
    height: 15%;
    width: 75%;
  };
  @media ${device.laptop} {
    width: 65px;
    height: 65px;
  }
`;

export default instrumentPad;