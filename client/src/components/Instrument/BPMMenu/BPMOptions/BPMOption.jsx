import React from 'react';
import styled from 'styled-components';
import { device } from '../../../../../public/assets/sizes';

const bpmOption = props => (
  <BPMOption
    onClick={props.onClick}
    selected={props.bpmInMS === props.currentBPM}>
    {props.bpmDisplay}
  </BPMOption>
);

const BPMOption = styled.button`
  height: 23px;
  width: 42px;
  font-family: Muli, sans-serif;
  color: ${props => props.selected ? 'black' : 'white'};
  background: ${props => props.selected ? '#f28c26' : 'linear-gradient(145deg, #1e1e1e, #191919)'};
  border-radius: 11px;
  box-shadow:  5px 5px 10px #151515,
             -5px -5px 10px #232323;
  margin-left: 20px;
  margin-bottom: 5px;
  &:hover {
    background: #f28c26;
    color: black;
  }
  cursor: pointer;
  @media ${device.mobileS} {
    height: 35px;
    width: 75px;
    font-size: 20px;
  }
`;

export default bpmOption;