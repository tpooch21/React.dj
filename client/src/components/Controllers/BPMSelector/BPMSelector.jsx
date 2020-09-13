import React from 'react';
import styled from 'styled-components';
import { device } from '../../../../public/assets/sizes';

import Aux from '../../hoc/Aux.jsx';
import BPMMenu from './BPMMenu/BPMMenu.jsx';

const bpmSelector = props => (
  <Aux>
    <BPMButton
      clicked={props.showOptions}
      onClick={props.toggleOptions}>BPM</BPMButton>
    {props.showOptions &&
      <BPMMenu
        changeBPM={props.changeBPM}
        currentBPM={props.currentBPM}/>
    }
  </Aux>
);

// <BPMButton clicked={this.state.showBPM} onClick={this.toggleBPMOptions}>BPM</BPMButton>
// {this.state.showBPM &&
// <BPMMenu
//   changeBPM={this.changeBPM}
//   currentBPM={this.state.bpm} />
// }

const BPMButton = styled.button`
height: 25px;
font-family: inherit;
color: ${props => props.clicked ? '#f28c26' : 'white'};
border-radius: 11px;
background: linear-gradient(145deg, #1e1e1e, #191919);
box-shadow:  5px 5px 10px #151515,
           -5px -5px 10px #232323;
margin-left: 20px;
margin-bottom: 10px;
cursor: pointer;
box-sizing: border-box;
@media ${device.mobileS} {
  max-width: 1023px;
  height: 35px;
  width: 75px;
  font-size: 20px;
};
@media ${device.laptop} {
  height: 25px;
  line-height: 25px;
  font-size: 16px;
};
`;

export default bpmSelector;
