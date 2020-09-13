import React from 'react';
import styled from 'styled-components';
import { device } from '../../../public/assets/sizes';

import PlayController from './PlayPause/PlayController.jsx';
import PauseController from './PlayPause/PauseController.jsx';
import BPMSelector from './BPMSelector/BPMSelector.jsx';

const controllers = props => (
  <PlayPauseWrapper>
    <PlayController
      playing={props.playing}
      click={props.playArrangement}/>
    <PauseController
      playing={props.playing}
      click={props.stopArrangement}/>
    <BPMSelector
      showOptions={props.showBPM}
      toggleOptions={props.toggleBPMOptions}
      changeBPM={props.changeBPM}
      currentBPM={props.bpm}/>
  </PlayPauseWrapper>
);

const PlayPauseWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 50px;
  box-sizing: border-box;
  @media ${device.mobileS} {
    max-width: 1023px;
    flex-direction: row;
    width: 100%;
    height: auto;
    margin-top: 15px;
  };
  @media ${device.laptop} {
    flex-direction: column;
    width: 60px;
    height: 375px;
    margin-top: 0;
  }
`;

export default controllers;