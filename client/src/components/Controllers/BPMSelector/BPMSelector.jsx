import React from 'react';
import styled from 'styled-components';
import { device } from '../../../../public/assets/sizes';

import Aux from '../../hoc/Aux.jsx';
import BPMMenu from './BPMMenu/BPMMenu.jsx';

const bpmSelector = props => (
  <Aux>
    <BPMButton
      clicked={props.showOptions}
      onClick={props.toggleOptions}><span style={{height: '100%'}}>BPM</span></BPMButton>
    {props.showOptions ?
      <BPMMenu
        changeBPM={props.changeBPM}
        currentBPM={props.currentBPM}/>
    : <ResetButton onClick={props.reset}>Reset</ResetButton>}
  </Aux>
);

const BPMButton = styled.button`
  font-family: inherit;
  color: ${props => props.clicked ? '#f28c26' : 'white'};
  border-radius: 11px;
  background: linear-gradient(145deg, #1e1e1e, #191919);
  box-shadow:  5px 5px 10px #151515,
            -5px -5px 10px #232323;
  border-color: #ccc;
  margin-left: 20px;
  margin-bottom: 10px;
  cursor: pointer;
  box-sizing: border-box;
  @media ${device.mobileS} {
    max-width: 1023px;
    height: auto;
    width: 75px;
    font-size: 20px;
  };
  @media ${device.laptop} {
    height: auto;
    font-size: 16px;
  };
  `;

const ResetButton = styled.button`
  font-family: inherit;
  color: ${props => props.clicked ? '#f28c26' : 'white'};
  border-radius: 11px;
  background: linear-gradient(145deg, #1e1e1e, #191919);
  box-shadow:  5px 5px 10px #151515,
            -5px -5px 10px #232323;
  border-color: #ccc;
  margin-left: 20px;
  cursor: pointer;
  box-sizing: border-box;
  @media ${device.mobileS} {
    max-width: 1023px;
    height: auto;
    width: 75px;
    font-size: 20px;
  };
  @media ${device.laptop} {
    height: auto;
    font-size: 16px;
  };
`;

export default bpmSelector;
