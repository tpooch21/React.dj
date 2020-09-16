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
      currentBPM={props.bpm}
      reset={props.reset}/>
  </PlayPauseWrapper>
);

const PlayPauseWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  @media ${device.mobileS} {
    max-width: 1023px;
    flex-direction: row;
    width: 100%;
    height: auto;
    margin-top: 15px;
    margin-left: 0;
  };
  @media ${device.laptop} {
    flex-direction: column;
    width: auto;
    height: 375px;
    margin-top: 0;
    margin-left: 15px;
  }
`;

export default controllers;